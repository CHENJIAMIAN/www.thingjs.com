/**
 * 说明：地球底图切换及叠加
 * 功能：点击按钮，切换地球底图、叠加其他底图
 */
var app = new THING.App();
app.background = [0, 0, 0];  // 设置地图背景为黑色

var mapConfig = {
    '高德': {
        '影像': 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        '街道': 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
    },
}

THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    // 创建一个地图
    var map = app.create({
        type: 'Map',
        style: {
            night: false,  // 关闭白天黑夜的特效
            fog: false
        },
        attribution: '高德'
    });

    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [2219105.364983514, 4103105.960052545, 4470107.405066424],
        'target': [2179559.223093986, 4084643.384325496, 4386809.092713278],
        'time': 2000,
    });
    // 创建一个瓦片图层
    var tileLayer1 = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    });
    // 将瓦片图添加到地图中
    map.addLayer(tileLayer1);

    // 创建提示
    initThingJsTip("底图用于位置参考，在此基础上添加其他的点、线、面、体、栅格图层以表达业务的特定信息，一般使用卫星影像或城市街道作为常规底图。<br>点击按钮，切换地图底图");

    new THING.widget.Button('底图叠加', function () {
        var labelLayer = map.getLayerByName('地图标注图层')[0];
        if (!labelLayer) {
            // 新创建一个瓦片图层
            var labelLayer = app.create({
                type: 'TileLayer',
                name: '地图标注图层',
                url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
            });
            map.addLayer(labelLayer);  // 将瓦片图添加到地图中
        }
    });

    new THING.widget.Button('高德 街道', function () {
        change('高德', '街道');
    });

    new THING.widget.Button('重置', function () {
        change('高德', '影像');

        var labelLayer = map.getLayerByName('地图标注图层')[0];
        if (labelLayer) {
            map.removeLayer(labelLayer);  // 删除注记图层
        }
    });

    /**
     * 切换底图
     */
    function change(str1, str2) {
        initThingJsTip("底图用于位置参考，在此基础上添加其他的点、线、面、体、栅格图层以表达业务的特定信息，一般使用卫星影像或城市街道作为常规底图。<br>点击按钮，切换地图底图");
        tileLayer1.url = mapConfig[str1][str2];  // 切换底图
        map.attribution = str1;  // 设置地图版权信息
    }
});