/**
 * 说明：该示例将介绍在如何在地图上加载地形图层
 * 注意：由于地形服务原因，该示例需要在http状态下加载
 */

var app = new THING.App();
app.background = [0, 0, 0];

// 引用地图组件脚本
THING.Utils.dynamicLoad(['http://www.thingjs.com/uearth/uearth.min.js'], function () {
    // 新建一个地图
    var map = app.create({
        type: 'Map',
        style: {
            night: false
        },
        attribution: 'Google'
    });

    // 创建瓦片图层，并添加到地图
    var tileLayer = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        url: 'http://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    });

    // 创建地形图层，并添加到地图
    var terrainLayer = app.create({
        type: 'TerrainLayer',
        name: '地形',
        url: 'http://data.marsgis.cn/terrain'  // 地形服务url 支持terrain格式的切片地形服务
    });
    map.addLayer(tileLayer);
    map.addLayer(terrainLayer);

    // 创建一个ThingLayer,并添加到地图
    var thingLayer = app.create({
        type: "ThingLayer",
        name: "thingLayer01"
    });
    map.addLayer(thingLayer);

    // 创建点位geopoint，并添加到ThingLayer图层中
    var huashanCoordinate = [115.62977157704358, 39.984093329774836];

    var geoPoint = app.create({
        type: 'GeoPoint',
        name: 'huanshan',
        userData: { '海拔': '1524米' },
        coordinates: huashanCoordinate,
        offsetHeight: 1524,
        renderer: {
            type: 'image', // image 代表创建图片类型的点
            url: '/uploads/wechat/oLX7p07Bs5EghI-6lQ5kWZjOIAAA/file/地形测试/dixing.png', // 图片 url
            size: 5  // 图片缩放比例
        },
        complete: function () {
            app.camera.earthFlyTo({ // 控制摄像头飞到点击对应的视角
                speed: 3,
                lonlat: huashanCoordinate,
                height: 5500,
                pitch: 22,
                complete: function () {
                }
            });
        }
    });
    // 添加到ThingLayer中
    thingLayer.add(geoPoint);
    // 创建提示
    initThingJsTip("在地图上加载地形图层");
});