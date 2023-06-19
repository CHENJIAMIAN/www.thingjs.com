/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：该示例将介绍在如何在地图上加载地形图层
 * 难度：★☆☆☆☆
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
     maximumLevel: 16
 });
 // 将瓦片图层添加到map中
 map.addLayer(tileLayer);
 
 var huashanCoordinate = [115.62977157704358, 39.984093329774836];
 // 相机飞到指定的地理位置和指定高度 地球上使用flyTo需要加isEarth参数
 app.camera.earthFlyTo({
     lonlat: huashanCoordinate,
     height: 5500,
     time: 3000,
     complete: function () {
         // 创建一个ThingLayer,并添加到地图
         var thingLayer = new THING.EARTH.ThingLayer({
             name: "thingLayer01"
         });
         map.addLayer(thingLayer);
         map.terrain.url = 'http://data.marsgis.cn/terrain';
         // 创建点位geopoint，并添加到ThingLayer图层中
         var geoPoint = new THING.EARTH.GeoPoint({
             name: 'huanshan',
             userData: { '海拔': '1524米' },
             coordinates: huashanCoordinate,
             offsetHeight: 1524,
             style: {
                 pointType: THING.EARTH.SymbolType.Image, // 代表使用图片
                 url: '/uploads/wechat/oLX7p07Bs5EghI-6lQ5kWZjOIAAA/file/地形测试/dixing.png', // 图片 url
                 size: 5  // 图片缩放比例
             },
             complete: function () {
 
             }
         });
         // 添加到ThingLayer中
         thingLayer.add(geoPoint);
     }
 });
 