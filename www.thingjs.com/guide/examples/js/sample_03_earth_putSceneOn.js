/**
 * 说明：动态创建地图，创建园区
 * 备注：该示例将一个园区放置在地球上，主要步骤是：
 *          1 根据园区的地理坐标计算园区在地球上的位置
 *          2 计算园区在地球上的旋转角度
 *          3 根据前两部结果将园区放置在地球上
 */

var app = new THING.App();
app.background = [0, 0, 0];
var map;

THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    // 新建一个地图
    map = app.create({
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
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        maximumLevel: 16,
    });

    // 将瓦片图层添加到map中
    map.addLayer(tileLayer);
    initThingJsTip("ThingJS中支持动态创建地图，也支持在动态创建的地图上添加园区，点击按钮进行效果查看");
    // 创建按钮
    new THING.widget.Button('创建园区', function () {
        if (app.query(".Campus")[0]) return;

        // 园区的经纬度坐标(GCJ_02坐标系)
        var sceneLonlat = [115.9238, 40.5127];
        // 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
        var position = CMAP.Util.convertLonlatToWorld(sceneLonlat, 0.5)
        // 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
        var angles = CMAP.Util.getAnglesFromLonlat(sceneLonlat, 65);
        // 相机飞到指定的地理位置和指定高度
        app.camera.earthFlyTo({
            lonlat: sceneLonlat,
            height: 200,
            time: 3000,
            complete: function () {
                // 创建Campus
                var campus = app.create({
                    type: 'Campus',
                    name: '工厂',
                    url: 'https://www.thingjs.com/static/models/storehouse', // 园区地址
                    position: position, // 位置
                    angles: angles, // 旋转
                    complete: function () { // 创建成功以后执行函数
                        // 加载场景后执行
                        var building = campus.buildings[0];
                        // 启动层级控制
                        app.level.change(campus);
                    }
                });
            }
        });
    });
});