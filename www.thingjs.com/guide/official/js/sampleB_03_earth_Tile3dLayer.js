/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：ThingJS平台已全面支持倾斜摄影数据上图。本demo演示了倾斜摄影数据加载的效果。若您有倾斜摄
 *      影osgb数据需要转换上图，具体可咨询客服了解平台提供的倾斜摄影osgb数据转换上图服务。
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
 // 添加一个倾斜摄影图层,url是一个3dtiles服务地址
 var tile3dLayer = new THING.EARTH.Tile3DLayer({
     url: 'https://www.thingjs.com/static/tilesData/tilesJson/tileset.json',
     offsetHeight: 160,
     complete: function (ev) {
         ev.object.flyToLayer();
     }
 });
 map.addLayer(tile3dLayer);