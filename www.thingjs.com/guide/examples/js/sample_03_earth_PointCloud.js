/**
 * 说明：ThingJS平台已支持加载加载点云数据
 */

var app = new THING.App();
app.background = [0, 0, 0];
var map;

THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    map = app.create({
        type: 'Map',
        atmosphere: true,
        fog: true,
        style: {
            night: true
        }
    });
    //添加一个瓦片图层
    var tileLayer = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        maximumLevel: 16,
    });
    map.add(tileLayer);

    // 将瓦片图层添加到map中
    map.addLayer(tileLayer);
   
     /**
     * 注意：目前ThingJS平台支持laz格式的点云数据
     */

    // 添加一个3dtiles的点云图层,url是一个3dtiles服务地址
    var tile3dLayer = app.create({
        type: 'Tile3dLayer',
        name: 'tile3dLayer',
        url: 'https://cdn.thingjs.com/3dtiles/%E7%82%B9%E4%BA%91%E6%A0%B7%E4%BE%8B%E6%95%B0%E6%8D%AE/tileset.json',
        offsetHeight: -1100,
        complete: function () {
            // 飞到点云图层
            tile3dLayer.flyToLayer();
        }
    });
    map.addLayer(tile3dLayer);
        
});