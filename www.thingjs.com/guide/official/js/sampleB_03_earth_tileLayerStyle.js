/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：设置地图底图颜色以及底图滤镜
 * 备注：CMap中的颜色rgb取值范围为0-255
 * 难度：★☆☆☆☆
 */

 var app = new THING.App();
 // 设置app背景为黑色
 app.background = [0, 0, 0];
 
 // 创建一个地球     
 var map = new THING.EARTH.Map({
     atmosphere: true, // 显示/隐藏 大气层 默认显示
     style: {
         atmosphere: true, // 显示/隐藏 大气层 默认显示
         night: true, // 开启/关闭 白天黑夜效果 默认开启
     },
     attribution: "amap", // 右下角地图版权信息
 });
 // 创建一个瓦片图层
 var tileLayer = new THING.EARTH.TileLayer({
     name: "tileLayer",
     url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
 });
 // 向地球添加一个瓦片图图层
 map.addLayer(tileLayer);
 
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
     var color = tileLayer.style.customColor;  // 此处获取的颜色是16进制
     tileLayer.style.customColor = 'rgb(' + state + ',' + color[1] + ',' + color[2]+ ')'
 });
 
 
 gg.on('change', function (state) {
     var color = tileLayer.style.customColor;  // 此处获取的颜色是16进制
     tileLayer.style.customColor ='rgb(' + color[0] + ',' + state + ',' + color[2]+ ')'
 });
 
 bb.on('change', function (state) {
     var color = tileLayer.style.customColor;  // 此处获取的颜色是16进制
     tileLayer.style.customColor = 'rgb(' + color[0] + ',' + color[1] + ',' +state + ')'
 });
 
 var brightness = panel.add(dataObj, '亮度').min(0).max(5.0).step(0.1).isChangeValue(true);
 var contrast = panel.add(dataObj, '对比度').min(0).max(5.0).step(0.1).isChangeValue(true);
 var saturation = panel.add(dataObj, '饱和度').min(0).max(5.0).step(0.1).isChangeValue(true);
 var hue = panel.add(dataObj, '色调').min(0).max(5.0).step(0.1).caption('色调（默认值 0）').isChangeValue(true);
 var gamma = panel.add(dataObj, 'gamma').min(0).max(5.0).step(0.1).isChangeValue(true);
 
 brightness.on('change', function (state) {
     tileLayer.style.brightness = state;  // 设置瓦片图的 亮度
 });
 
 contrast.on('change', function (state) {
     tileLayer.style.contrast = state;  // 设置瓦片图的 对比度
 });
 
 saturation.on('change', function (state) {
     tileLayer.style.saturation = state;  // 设置瓦片图的 饱和度
 });
 
 hue.on('change', function (state) {
     tileLayer.style.hue = state;  // 设置瓦片图的 色调
 });
 
 gamma.on('change', function (state) {
     tileLayer.style.gamma = state;  // 设置瓦片图的 gamma
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
         tileLayer.style.template = THING.EARTH.TileLayerStyle.DARKBLUE;
     } else if (value === '墨绿') {
         tileLayer.style.template = THING.EARTH.TileLayerStyle.DARKGREEN;
     } else if (value === '自定义') {
         tileLayer.style.template = THING.EARTH.TileLayerStyle.CUSTOMCOLOR;
         panelCustomColor.visible = true;
         panelCustomColor.position = [0, 520];
     } else {
         tileLayer.style.template = THING.EARTH.TileLayerStyle.NORMAL;
     }
 });
 
 $('.ThingJS_wrap').css('width', '85%');
 
 // 创建提示
 initThingJsTip("拖动左侧面板的滑块，设置地球底图效果");