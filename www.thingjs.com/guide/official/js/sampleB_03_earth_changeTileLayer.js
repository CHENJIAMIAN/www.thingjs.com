/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：地球底图切换及叠加
 * 功能：点击按钮，切换地球底图、叠加其他底图
 * 难度：★☆☆☆☆
 */

 var app = new THING.App();
 // 设置app背景为黑色
 app.background = [0, 0, 0];
 
 var mapConfig = {
     '高德': {
         '影像': 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
         '街道': 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
     },
     'GeoQ': {
         '基础': 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
         '魅蓝': 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
         '暖色': 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
         '灰色': 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}'
     },
     'OSM': {
         '街道': 'https://{a,b,c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
     },
 }
 
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
 // 摄像机飞行到某位置
 app.camera.flyTo({
     'position': [2219105.364983514, 4103105.960052545, 4470107.405066424],
     'target': [2179559.223093986, 4084643.384325496, 4386809.092713278],
     'time': 2000,
 });
 
 // 创建提示
 initThingJsTip("底图用于位置参考，在此基础上添加其他的点、线、面、体、栅格图层以表达业务的特定信息，一般使用卫星影像或城市街道作为常规底图。<br>点击按钮，切换地图底图");
 
 new THING.widget.Button('底图叠加', function () {
     var labelLayer = map.getLayerByName('地图标注图层')[0];
     if (!labelLayer) {
         // 新创建一个瓦片图层
         var labelLayer = new THING.EARTH.TileLayer({
             name: '地图标注图层',
             url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
         });
         map.addLayer(labelLayer);  // 将瓦片图添加到地图中
     }
 });
 
 new THING.widget.Button('高德 街道', function () {
     change('高德', '街道');
 });
 
 new THING.widget.Button('GeoQ 基础', function () {
     change('GeoQ', '基础');
 });
 
 new THING.widget.Button('GeoQ 魅蓝', function () {
     change('GeoQ', '魅蓝');
 });
 
 new THING.widget.Button('GeoQ 暖色', function () {
     change('GeoQ', '暖色');
 });
 
 new THING.widget.Button('GeoQ 灰色', function () {
     change('GeoQ', '灰色');
 });
 
 new THING.widget.Button('OSM 街道', function () {
     change('OSM', '街道');
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
     tileLayer.url = mapConfig[str1][str2];  // 切换底图
     map.attribution = str1;  // 设置地图版权信息
 }
 