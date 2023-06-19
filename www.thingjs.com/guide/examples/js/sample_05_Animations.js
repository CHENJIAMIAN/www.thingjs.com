/**
 * 说明：模型对象动画控制
 * 操作：点击按钮，对车辆物体进行动画控制。  
 * 备注：很多模型在制作阶段就内置了动画，这个时候我们可以通过官方提供的 API 调用播放这些动画，
 *      需要注意的是，如果是动态创建的物体，由于模型加载是异步的，则必须在模型加载完成后才能
 *      调用动画。
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

var car;
var line;
var position;

// 加载完成事件 
app.on('load', function (ev) {
    var campus = ev.campus;
    car = app.query('car01')[0];
    position = car.position;
    reset();
    new THING.widget.Button('移动到某位置', moveToPosition);
    new THING.widget.Button('沿路径移动', movePath);
    new THING.widget.Button('旋转动画', rotateTo);
    new THING.widget.Button('缩放动画', scaleTo);
    new THING.widget.Button('模型动画', playAnim);
    new THING.widget.Button('重置', reset1);
});

/**
 * 车辆对象移动到仓库门口
 */
function moveToPosition() {
    reset();
    initThingJsTip(`车辆对象移动到指定世界位置`);

    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [29.681976391283694, 23.301731356596463, 33.03639656157911],
        'target': [3.985432119055727, -0.32106667647900844, -2.963507585545312],
        'time': 1000,
        'complete': function () {
            car.rotateTo({
                'angles': [0, -90, 0],
                'time': 1000,
                'complete': function () {
                    car.moveTo({
                        position: [-8.967, 0.02, -2.714], // 移动到世界位置
                        // offsetPosition: [0, 0, -10], // 相对自身 向后移动到 10m 处
                        time: 2 * 1000,
                        orientToPath: true,
                        // lerpType:null, // 插值类型 默认为线性插值
                    });
                }
            });
        }
    });
}

/**
 * 车辆对象沿路径移动
 */
function movePath() {
    reset();
    initThingJsTip(`车辆对象沿指定路径移动`);
    var path = [[0, 0.1, 0], [20, 0.1, 0], [20, 0.1, 10], [0, 0.1, 10]];
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [23.1645716575457, 16.633119178889253, 27.822416122408022],
        'target': [9.184719979236963, -1.253695540054237, 0.36757610238525573],
        'time': 1000,
        'complete': function () {
            // 创建轨迹线
            line = app.create({
                type: 'Line',
                // color: 0x00FF00, // 轨迹线颜色
                dotSize: 2, // 轨迹点的大小
                dotColor: 0xFF0000, // 轨迹点的颜色
                points: path,
                complete: function () {
                    car.movePath({
                        orientToPath: true, // 物体移动时沿向路径方向
                        path: path, // 路径坐标点数组
                        time: 5 * 1000, // 路径总时间 毫秒
                        delayTime: 1000, // 延时 1s 执行
                        lerpType: null, // 插值类型（默认为线性插值）此处设置为不插值
                    });
                }
            })
        }
    });



}

/**
 * 车辆对象绕 Y 轴旋转 90 度
 */
function rotateTo() {
    reset();
    initThingJsTip(`车辆对象绕 Y 轴旋转 90 度`);

    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [26.85675939198844, 13.541343076335506, 25.898646337842216],
        'target': [19.56465992574354, 1.0443250252125487, 6.377139897683393],
        'time': 1000,
        'complete': function () {
            car.rotateTo({
                angles: [0, 90, 0],
                time: 2000,
                lerpType: THING.LerpType.Quadratic.In, // 速度插值
            })
        }
    });
}

/**
 * 车辆缩放动画
 */
function scaleTo() {
    reset();
    initThingJsTip(`车辆对象循环缩放`);
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [26.85675939198844, 13.541343076335506, 25.898646337842216],
        'target': [19.56465992574354, 1.0443250252125487, 6.377139897683393],
        'time': 1000,
        'complete': function () {
            car.scaleTo({
                scale: [1.5, 1.5, 1.5], // 缩放倍数
                time: 1000, // 动画时间
                loopType: THING.LoopType.PingPong, // 循环类型 设置循环后 无回调函数
            })
        }
    })
}

/**
 * 车辆对象往复循环播放动画
 */
function playAnim() {
    reset();
    initThingJsTip(`车辆对象往复循环播放动画（_起_）`);
    // 飞行到某物体 设置飞行时间 和 飞行结束后的回调
    app.camera.flyTo({
        object: car,
        time: 1500,
        complete: function () {
            THING.Utils.log('finish')
            car.playAnimation({
                name: '_起_',
                // 循环类型
                // THING.LoopType.Repeat 不断循环
                // THING.LoopType.No 不循环
                loopType: THING.LoopType.PingPong, // 往复循环
            });
        }
    });
}

/**
 * 重置
 */
function reset() {
    car.stopMoving();
    car.stopRotating();
    car.position = position;
    car.angles = [0, 0, 0];
    car.scale = [1, 1, 1];
    car.stopScaling();
    car.stopAnimation();
    app.camera.stopFlying();
    if (line) {
        line.destroy();
        line = null;
    }

    // 创建提示
    initThingJsTip(`点击左侧按钮，可以对查询到的对象进行连续运动控制以及动画控制（部分模型在制作阶段就内置了动画，可以通过脚本直接控制模型动画播放）`);
}

function reset1() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.597999999999985, 61.72399999999999],
        'target': [1.646, 7.811, 4.445],
        'time': 1000,
        'complete': function () {
            reset();
        }
    });
    
}