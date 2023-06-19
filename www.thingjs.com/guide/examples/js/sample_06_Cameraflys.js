/**
 * 说明：控制摄像机
 * 功能：摄像机位置，摄像机飞行，聚焦物体，飞行到物体，环绕飞行，摄像机跟随
 * 难度：★★★☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    skyBox: 'Night',
    env: 'Seaside',
});
// 定义全局变量
var car;
var car02
// 加载场景后执行
app.on('load', function () {
    // 通过 name 查询到场景中的车
    car = app.query('car01')[0];
    car02 = app.query('car02')[0];
    initThingJsTip("摄像机，如同大家拍照时使用的相机，用来确定观察 3D 场景的视角。</br>点击左侧按钮，体验设置场景视角，控制视角飞行效果");

    new THING.widget.Button('直接设置', set_camera);
    new THING.widget.Button('聚焦物体', fit_camera);
    new THING.widget.Button('飞到位置', flytoPos);
    new THING.widget.Button('环绕物体', rotate_around_obj);
    new THING.widget.Button('飞到物体左侧', flytoLeft);
    new THING.widget.Button('摄像机跟随物体', follow);
    new THING.widget.Button('跟随停止', followStop);
    new THING.widget.Button('重置', resetFly);
})
/**
 * 直接设置
 */
function set_camera() {
    initThingJsTip('直接设置摄像机的 position 和 target 属性控制相机位置');
    // 设置摄像机位置和目标点
    // 可利用 代码块——>摄像机——>设置位置快捷设置视角，也可以通过 app.camera.log() 获取
    app.camera.position = [-35.22051687793129, 53.18080934656332, 45.681456895731266];
    app.camera.target = [-2.945566289024588, 5.527822798932595, -11.021841570308316];
}

/**
 * 聚焦物体
 */
function fit_camera() {
    initThingJsTip('摄像机镜头“聚焦”到叉车，此时 ThingJS 会计算出该对象的“最佳看点”，从而“自适应”该对象来设置摄像机位置');
    app.camera.fit(car02);
}

/**
 * 飞到位置
 */
function flytoPos() {
    initThingJsTip('设置摄像机从当前位置，飞行到将要设置的位置');
    // 可直接利用 代码块——>摄像机——>飞到位置
    app.camera.flyTo({
        'position': [-9.31507492453225, 38.45386120167032, 49.00948473033884],
        'target': [3.2145825289759062, 5.6950465199837375, -17.48975213256405],
        'time': 1000,
        'complete': function () {
        }
    });
}

/**
 * 环绕物体，围绕car在5秒内旋转360度
 */
function rotate_around_obj() {
    reset();
    initThingJsTip('设置摄像机绕车辆旋转360度');
    // 设置摄像机位置和目标点
    app.camera.position = [27.896481963404188, 10.436433735762211, 15.260481901440052];
    app.camera.target = [21.352, 1.1811385844099112, 8.715999938035866];

    app.camera.rotateAround({
        object: car,
        yRotateAngle: 360,
        time: 5000,
    });
}

/**
 * 飞到物体左侧
 * 可调节 xAngle、yAngle 设置相对飞行目标的摄像机位置
 * 可根据 radiusFactor 设置相对飞行目标的距离（物体包围盒半径倍数）
 */
function flytoLeft() {
    reset();
    initThingJsTip('设置摄像机飞到物体左侧');
    app.camera.flyTo({
        object: car02,
        xAngle: 0,  // 绕物体自身X轴旋转角度
        yAngle: 90,  // 绕物体自身Y轴旋转角度
        radiusFactor: 2,  // 物体包围盒半径的倍数
        time: 1 * 1000,
        complete: function () {
        }
    });
}

/**
 * 摄像机跟随
 */
function follow() {
    initThingJsTip('设置摄像机跟随小车')
    // 世界坐标系下坐标点构成的数组 关于坐标的获取 可利用「工具」——>「拾取场景坐标」
    // 拐角处多取一个点，用于转向插值计算时更平滑
    var path = [[0, 0, 0], [2, 0, 0], [20, 0, 0], [20, 0, 2], [20, 0, 10], [18, 0, 10], [0, 0, 10], [0, 0, 8], [0, 0, 0]];
    car.position = path[0];
    car.movePath({
        path: path,
        orientToPath: true,
        loopType: THING.LoopType.Repeat,
        time: 10 * 1000
    })
    // 每一帧设置摄像机位置和目标点
    car.on('update', function () {
        // 摄像机位置为移动小车后上方
        // 为了便于计算，这里用了坐标转换，将相对于小车的位置转换为世界坐标
        app.camera.position = car.selfToWorld([0, 5, -10]);
        // 摄像机目标点为移动小车的坐标
        app.camera.target = car.position;
    }, '自定义摄像机跟随');
}

/**
 * 摄像机跟随停止
 */
function followStop() {
    initThingJsTip('设置摄像机停止跟随小车')
    car.off('update', null, '自定义摄像机跟随');
}

/**
 * 重置
 */
function reset() {
    app.camera.stopFlying();
    app.camera.stopRotateAround();
    car.stopMoving();
    car.position = [18.9440002, 0.009999999999999787, 6.7690000999999995];
    car.angles = [0, 0, 0];
    followStop();
    initThingJsTip('摄像机，如同大家拍照时使用的相机，用来确定观察 3D 场景的视角。</br>点击左侧按钮，体验设置场景视角，控制视角飞行效果')
}

/**
 * 初始摄像机视角
 */
function resetFly() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.67799999999998, 61.72399999999999],
        'target': [1.646, 7.891, 4.445],
        'time': 1000,
        'complete': function () {
            reset();
        }
    });
}