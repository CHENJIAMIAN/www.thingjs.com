/**
 * 说明：ThingJS平台已全面支持倾斜摄影数据上图。本demo演示了倾斜摄影数据加载的效果。
 * 
 * 注意：目前ThingJS平台对倾斜摄影osgb数据支持，仅是以平台服务形式实现的。自行转换数据还未必能支持
 *      正常加载运行。因此，若您有倾斜摄影osgb数据需转换上图，可咨询客服了解平台提供的倾斜摄影osgb
 *      数据转换上图服务。
 * 
 * 难度：★☆☆☆☆
 */

var app = new THING.App({});
app.background = [0, 0, 0];
THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    var map = app.create({
        type: 'Map',
        atmosphere: true,
        fog: true,
        style: {
            night: true
        }
    });
    //添加一个瓦片图层
    var tileLayer1 = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        maximumLevel: 16,
    });
    map.baseLayers.add(tileLayer1);

    /**
     * 注意：目前ThingJS平台对倾斜摄影osgb数据支持，仅是以平台服务形式实现的。自行转换数据还未必能支持
     *      正常加载运行。因此，若您有倾斜摄影osgb数据需转换上图，可咨询客服了解平台提供的倾斜摄影osgb
     *      数据转换上图服务。
     */
    // 添加一个倾斜摄影图层,url是一个3dtiles服务地址
    var tile3dLayer = app.create({
        type: 'Tile3dLayer',
        name: 'tile3dLayer',
        url: '/static/tilesData/tilesJson/tileset.json',
        offsetHeight: 145,
        complete: function () {
            // 飞到倾斜摄影图层
            tile3dLayer.flyToLayer();
            // 打印倾斜摄影数据原点对应的经纬度
            console.info(tile3dLayer.centerCoordinates);
        }
    });
    map.addLayer(tile3dLayer);

});

// 创建提示
initThingJsTip(`倾斜摄影技术通过高效的数据采集设备及专业的数据处理流程生成的数据成果直观反映地物的外观、位置、高度等属性，为真实效果和测绘级精度提供保证，并且有效提升模型的生产效率`);