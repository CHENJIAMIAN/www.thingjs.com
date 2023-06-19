/**
 * 说明：设置地图底图颜色以及底图滤镜
 * 备注：CMap中的颜色rgb取值范围为0-255
 * 难度：★☆☆☆☆
 */

var app = new THING.App();
app.background = [0, 0, 0];  // 设置地图背景为黑色

THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    // 创建一个地图
    var map = app.create({
        type: 'Map',
        style: {
            night: false  // 关闭白天黑夜的特效
        },
        attribution: '高德'
    });

    // 创建一个瓦片图层
    var tileLayer1 = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    });
    map.addLayer(tileLayer1);  // 将瓦片图添加到地图中

    // 创建一个配置界面组件
    var panel = new THING.widget.Panel({
        titleText: '颜色校正',
        hasTitle: true
    });

    var panelCustomColor = new THING.widget.Panel({
        titleText: '自定义滤镜颜色',
        hasTitle: true,
        position: [320, 0]
    });
    panelCustomColor.visible = false;

    var dataObj = {
        '亮度': 1.0,
        '对比度': 1.0,
        '饱和度': 1.0,
        '色调': 0,
        'gamma': 1.0,
        '滤镜': '默认',
        '颜色值:r': 255,
        '颜色值:g': 255,
        '颜色值:b': 255,
    };

    var rr = panelCustomColor.add(dataObj, '颜色值:r').min(0).max(255).isChangeValue(true);
    var gg = panelCustomColor.add(dataObj, '颜色值:g').min(0).max(255).isChangeValue(true);
    var bb = panelCustomColor.add(dataObj, '颜色值:b').min(0).max(255).isChangeValue(true);

    rr.on('change', function (state) {
        var color = tileLayer1.style.customColor;  // 此处获取的颜色是16进制
        color = hexToRgb(color);  // 16进制颜色转为[r,g,b]格式
        tileLayer1.style.customColor = [state, color[1], color[2]];  // 设置瓦片图滤镜颜色
    });

    gg.on('change', function (state) {
        var color = tileLayer1.style.customColor;
        color = hexToRgb(color);
        tileLayer1.style.customColor = [color[0], state, color[2]];
    });

    bb.on('change', function (state) {
        var color = tileLayer1.style.customColor;
        color = hexToRgb(color);
        tileLayer1.style.customColor = [color[0], color[1], state];
    });

    var brightness = panel.add(dataObj, '亮度').min(0).max(5.0).step(0.1).isChangeValue(true);
    var contrast = panel.add(dataObj, '对比度').min(0).max(5.0).step(0.1).isChangeValue(true);
    var saturation = panel.add(dataObj, '饱和度').min(0).max(5.0).step(0.1).isChangeValue(true);
    var hue = panel.add(dataObj, '色调').min(0).max(5.0).step(0.1).caption('色调（默认值 0）').isChangeValue(true);
    var gamma = panel.add(dataObj, 'gamma').min(0).max(5.0).step(0.1).isChangeValue(true);

    brightness.on('change', function (state) {
        tileLayer1.style.brightness = state;  // 设置瓦片图的 亮度
    });

    contrast.on('change', function (state) {
        tileLayer1.style.contrast = state;  // 设置瓦片图的 对比度
    });

    saturation.on('change', function (state) {
        tileLayer1.style.saturation = state;  // 设置瓦片图的 饱和度
    });

    hue.on('change', function (state) {
        tileLayer1.style.hue = state;  // 设置瓦片图的 色调
    });

    gamma.on('change', function (state) {
        tileLayer1.style.gamma = state;  // 设置瓦片图的 gamma
    });

    var panelTemplate = new THING.widget.Panel({
        titleText: '滤镜模板',
        hasTitle: true,
        position: [0, 370]
    });

    var t = panelTemplate.addRadio(dataObj, '滤镜', ['默认', '深蓝', '墨绿', '自定义']);
    t.on('change', function (value) {
        panelCustomColor.visible = false;
        if (value === '深蓝') {
            tileLayer1.style.template = CMAP.TileLayerStyle.DARKBLUE;
        } else if (value === '墨绿') {
            tileLayer1.style.template = CMAP.TileLayerStyle.DARKGREEN;
        } else if (value === '自定义') {
            tileLayer1.style.template = CMAP.TileLayerStyle.CUSTOMCOLOR;
            panelCustomColor.visible = true;
            panelCustomColor.position = [0, 520];
        } else {
            tileLayer1.style.template = CMAP.TileLayerStyle.NORMAL;
        }
    });

    $('.ThingJS_wrap').css('width', '85%');
});

/**
 * 16进制颜色转[r,g,b]格式颜色
 */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ]
}

// 创建提示
initThingJsTip("拖动左侧面板的滑块，设置地球底图效果");