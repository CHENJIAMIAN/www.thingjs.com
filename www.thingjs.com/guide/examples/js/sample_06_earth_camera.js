/**
 * 说明：地球上摄像机常用方法
 * 功能：
 *      1.飞到物体
 *      2.摄像机水平旋转、停止
 *      3.限制俯仰范围
 *      4.限制摄像机距离
 *      5.取消摄像机限制
 * 难度：★★☆☆☆
 */
var app = new THING.App();
app.background = [0, 0, 0];

// 引用地图组件脚本
THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function() {
    // 新建一个地图
    var map = app.create({
        type: 'Map',
        style: {
            night: false
        },
        attribution: '高德'
    });

    // 新建一个瓦片图层
    var tileLayer = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        maximumLevel: 18,
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    });
    // 将瓦片图层添加到map中
    map.addLayer(tileLayer);
    // 园区的经纬度坐标(GCJ_02坐标系)
    var sceneLonlat = [116.4641, 39.98606];
    // 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
    var position = CMAP.Util.convertLonlatToWorld(sceneLonlat, 0.5);
    // 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
    var angles = CMAP.Util.getAnglesFromLonlat(sceneLonlat, 220);
    // 摄像机飞到指定的地理位置和指定高度
    app.camera.earthFlyTo({
        time: 3000, // 飞行时间 ms
        lonlat: sceneLonlat, // 要飞到的目标点的经纬度
        height: 200, // 摄像机离地高度
        heading: 0, // 水平角(方位角) 单位度
        pitch: 45, // 垂直角(俯仰角) 单位度
        complete: function() {
            // 创建Campus
            var campus = app.create({
                type: 'Campus',
                name: '建筑',
                url: 'https://www.thingjs.com/static/models/storehouse', // 园区地址
                position: position, // 位置
                angles: angles, // 旋转
                complete: function() { // 创建成功以后执行函数
                    initThingJsTip("本例程展示了地图摄像机的交互控制，地图交互默认为左键移动，右键旋转。与园区中不同的是地图上使用经纬度控制相机位置，在使用时需要注意。点击按钮，查看效果");
                    // 加载场景后执行
                    app.level.change(campus);
                    // 添加Button
                    let car = app.query('car01')[0];

                    // 旋转
                    new THING.widget.Button('水平旋转', function() {
                        initThingJsTip("设置摄像机水平旋转");
                        reset();

                        //地球上使用rotateAround需要加isEarth参数
                        app.camera.rotateAround({
                            target: app.camera.target,
                            isEarth: true,
                            yRotateAngle: 360,
                            time: 5000
                        });
                    });

                    new THING.widget.Button('飞到物体', function() {
                        initThingJsTip("设置摄像机飞到物体");
                        reset();

                        app.camera.flyTo({
                            object: car, // 飞行到的对象
                            time: 3000, //飞行时间
                            isEarth: true //地球上使用flyTo需要加isEarth参数
                        });
                    });

                    new THING.widget.Button('限制俯仰范围', function() {
                        initThingJsTip("设置摄像机俯仰角度范围[10, 40]，按住鼠标右键上下移动查看效果");
                        reset();

                        app.camera.xAngleLimitRange = [10, 40]; // 设置摄像机俯仰角度范围[最小值, 最大值]
                    });

                    new THING.widget.Button('设置摄像机距离', function() {
                        initThingJsTip("设置摄像机距离范围,可以通过鼠标滚轮滚动查看效果");
                        reset();

                        app.camera.distanceLimited = [30, 200]; // 设置摄像机距离范围
                    });

                    new THING.widget.Button('重置', function() {
                        reset()

                        initThingJsTip("本例程展示了地图摄像机的交互控制，地图交互默认为左键移动，右键旋转。与园区中不同的是地图上使用经纬度控制相机位置，在使用时需要注意。点击按钮，查看效果");
                    });

                }
            });
        }
    });
});

/**
 * 重置
 */
function reset() {
    // 设置摄像机位置和目标点
    app.camera.position = [2177786.3907650434, 4098473.8561936556, 4374825.365330011];
    app.camera.target = [2177757.9857225236, 4098500.159908491, 4374763.90281313];
    app.camera.stopRotateAround({ isEarth: true }); //地球上使用stopRotateAround需要加isEarth参数
    app.camera.stopFlying();
    app.camera.distanceLimited = [0, 1e10]; // 设置摄像机水平角度范围[最小值, 最大值]                        
    app.camera.xAngleLimitRange = [0, 90]; // 设置摄像机俯仰角度范围[最小值, 最大值]
}