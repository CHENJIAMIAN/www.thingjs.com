/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例介绍了线FeatureLayer的使用方法
 * 示例中所有整体修改的参数均可以在单个物体身上修改,出于篇幅考虑只写了一个
 */
// 创建一个地图
var app = new THING.App();
app.background = [0, 0, 0];

var map = new THING.EARTH.Map({
    attribution: "高德",
});
// 创建一个瓦片图层
var tileLayer1 = new THING.EARTH.TileLayer({
    name: "卫星影像图层",
    url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    style: {
        template: THING.EARTH.TileLayerEffect.DarkBlue
    }
});
// 将瓦片图添加到底图图层中
map.addLayer(tileLayer1);
// 摄影机飞到特定位置和角度
app.camera.earthFlyTo(
    {
        'time': 2000,
        'lonlat': [116.460550, 39.983355],
        'height': 6000,
        complete: function () {
            addLayer();
        }
    }
);

function addLayer() {
    var lineLayer = app.query('lineLayer')[0];
    if (!lineLayer) {
        $.ajax({
            type: 'GET',
            url: 'https://www.thingjs.com/uearth/uGeo/wangjingRoad.geojson',
            dataType: 'json',
            success: function (data) {
                lineLayer = new THING.EARTH.FeatureLayer({
                    name: 'lineLayer',
                    dataSource: data,
                    geoObjectType: 'GeoLine',
                    style: {
                        lineType: THING.EARTH.GeoLineType.Plane, // 片状线
                        url: 'https://www.thingjs.com/guide/image/uGeo/path.png', // 贴图路径
                        effect: true, // 是否开启发光特效
                        speed: 0.5, // 流动速度
                        width: 2 // 线的宽度
                    }
                });
                map.addLayer(lineLayer);
                lineLayer.on('click', function (e) {
                    // e.object可以获取到点击到的对象
                    console.log(e.object.userData.fclass);
                });

                new THING.widget.Button('整体修改线宽', function () {
                    if (lineLayer.style.width === 2) {
                        lineLayer.style.width = 5;
                    }else {
                        lineLayer.style.width = 2;
                    }
                });

                new THING.widget.Button('修改单个线宽', function () {
                    // 通过FeatureLayer实例的getItems()属性可以获取到图层中的所有对象
                    if (lineLayer.getItems()[0].style.width === 2) {
                        lineLayer.getItems()[0].style.width = 20;
                    } else {
                        lineLayer.getItems()[0].style.width = 2;
                    }
                });

                new THING.widget.Button('整体修改贴图', function () {
                    if (lineLayer.style.url === 'https://www.thingjs.com/guide/image/uGeo/path.png') {
                        lineLayer.style.url = 'https://www.thingjs.com/static/image/uGeo/building.png';
                    }else {
                        lineLayer.style.url = 'https://www.thingjs.com/guide/image/uGeo/path.png';
                    }
                });

                new THING.widget.Button('纯色渲染', function () {
                    lineLayer.style.url = null;// 去掉贴图效果
                    lineLayer.style.gradient = null;// 去掉渐变色效果
                });

                new THING.widget.Button('渐变色渲染', function () {
                    if (!lineLayer.style.gradient) {
                        lineLayer.style.gradient = { 0: 'rgb(255, 0, 0)', 0.5: 'rgb(0, 255, 0)', 1: 'rgb( 0, 0, 255)' };// 渐变色的色带
                    }else {
                        lineLayer.style.gradient = null;
                    }
                });

                new THING.widget.Button('整体修改颜色', function () {
                    if (THING.Utils.equalsColor(lineLayer.style.color, [1, 1, 1])) {
                        lineLayer.style.color = [0, 1, 0];
                    }else {
                        lineLayer.style.color = [1, 1, 1];
                    }
                });

                new THING.widget.Button('整体修改发光', function () {
                    lineLayer.style.effect = !lineLayer.style.effect;
                });

                new THING.widget.Button('整体修改流速', function () {
                    if (lineLayer.style.speed === 0.5) {
                        lineLayer.style.speed = 1;
                    }else {
                        lineLayer.style.speed = 0.5;
                    }
                });

                new THING.widget.Button('整体抬高', function () {
                    if (lineLayer.offsetHeight === 0) {
                        lineLayer.offsetHeight = 100;
                    }else {
                        lineLayer.offsetHeight = 0;
                    }
                });
            }
        });
    }
    else {
        lineLayer.visible = !lineLayer.visible;
    }
}