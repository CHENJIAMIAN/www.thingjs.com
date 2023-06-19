/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：该示例将介绍在地球上相机使用的常用方法
 */

var app = new THING.App();
app.background = [0, 0, 0];
// 新建一个地图      
var map = new THING.EARTH.Map({
    style: {
        night: false,
    },
    attribution: "高德",
    maximumLevel: 18
});

// 新建一个瓦片图层
var tileLayer = new THING.EARTH.TileLayer({
    name: "tileLayer1",
    url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    maximumLevel: 18
});
// 将瓦片图层添加到map中
map.addLayer(tileLayer);

// 园区的经纬度坐标(GCJ_02坐标系)
var sceneLonlat = [116.4641, 39.98606];
// 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
var position = THING.EARTH.Utils.convertLonlatToWorld(sceneLonlat, 0.5);
// 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
var angles = THING.EARTH.Utils.getAnglesFromLonlat(sceneLonlat, 220);
// 相机飞到指定的地理位置和指定高度 地球上使用flyTo需要加isEarth参数
app.camera.earthFlyTo({
    time: 3000, // 飞行时间 ms
    lonlat: sceneLonlat, // 要飞到的目标点的经纬度
    height: 150, // 摄像机离地高度
    heading: 0, // 水平角(方位角) 单位度
    pitch: 45, // 垂直角(俯仰角) 单位度
    complete: function () {
        // 创建Campus
        const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", {
            position: position, // 位置
            angles: angles, // 旋转
            ignoreTheme: true,
        });
        initThingJsTip("本例程展示了地图摄像机的交互控制，地图交互默认为左键移动，右键旋转。与园区中不同的是地图上使用经纬度控制相机位置，在使用时需要注意。点击按钮，查看效果");

        bundle.waitForComplete().then((ev) => {
            if (ev.bundle) {
                const campus = bundle.campuses[0];
                // app.levelManager.change(campus);
            }
            // 添加Button
            let car = app.query("car01")[0];

            new THING.widget.Button("水平旋转", function () {
                reset();
                initThingJsTip("设置摄像机水平旋转");
                app.camera.earthFlyRotateBySpeed({
                    angle: 360,
                    time: 2000,
                });
            });

            new THING.widget.Button("飞到物体", function () {
                reset();
                initThingJsTip("设置摄像机飞到物体");
                app.camera.flyTo({
                    target: car, // 飞行到的对象
                    time: 3000, // 飞行时间
                });
            });

            new THING.widget.Button("限制俯仰范围", function () {
                reset();
                initThingJsTip("设置摄像机俯仰角度范围[10, 40]，按住鼠标右键上下移动查看效果");
                app.camera.vertAngleLimit = [10, 40]; // 设置摄像机俯仰角度范围[最小值, 最大值]
            });

            new THING.widget.Button("限制相机距离", function () {
                reset();
                initThingJsTip("设置摄像机距离范围,可以通过鼠标滚轮滚动查看效果");
                app.camera.distanceLimited = [30, 200]; // 设置摄像机水平角度范围[最小值, 最大值]
            });

            new THING.widget.Button('重置', function () {
                reset();
                initThingJsTip("本例程展示了地图摄像机的交互控制，地图交互默认为左键移动，右键旋转。与园区中不同的是地图上使用经纬度控制相机位置，在使用时需要注意。点击按钮，查看效果");
            });
        });
    },
});

/**
 * 重置
 */
function reset() {
    app.camera.stopEarthFly(); // 停止水平旋转
    app.camera.distanceLimited = [0, 1e10]; // 设置摄像机水平角度范围[最小值, 最大值]                        
    app.camera.xAngleLimitRange = [0, 90]; // 设置摄像机俯仰角度范围[最小值, 最大值]
    app.camera.earthFlyTo({
        heading: 0,
        height: 150.0017638336867,
        lonlat: [116.46410000000002, 39.98606000000001, 0],
        pitch: 44.99999999976709,
        time: 0
    });
}