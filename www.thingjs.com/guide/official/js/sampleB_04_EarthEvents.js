/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：在地图上给图层添加事件
 * 操作：点击按钮
 */

 var app = new THING.App();
 app.background = [0, 0, 0];  // 设置app背景为黑色
 
 // 创建一个地球     
 var map = new THING.EARTH.Map({
     atmosphere: true, // 显示/隐藏 大气层 默认显示
     style: {
         atmosphere: true, // 显示/隐藏 大气层 默认显示
         night: true, // 开启/关闭 白天黑夜效果 默认开启
         fog: false,  // 开启/关闭 雾效 默认关闭
     },
     attribution: "高德", // 右下角地图版权信息
 });
 
 var buildingLayer;
 var tileLayer = new THING.EARTH.TileLayer({
     name: "tileLayer",
     maximumLevel: 18,
     url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
 });
 // 向地球添加一个瓦片图图层
 map.addLayer(tileLayer);
 
 tileLayer.style.template = 'CustomColor';
 tileLayer.style.customColor = [0, 0.25, 0.5]
 app.camera.earthFlyTo({
     time: 2000,
     lonlat: [116.4488, 39.9187],
     height: 3000,
     complete: function () {
         // 添加建筑图层
         $.ajax({
             type: "GET",
             url: "https://www.thingjs.com/uearth/uGeo/chaoyang_building.geojson",
             dataType: "json",
             success: function (data) {
                 buildingLayer = new THING.EARTH.FeatureLayer({
                     name: "buildingLayer",
                     dataSource: data,
                     geometryType: "GeoBuilding",
                     extrudeField: "height",
                     style: {
                         type: "image",
                         url: [
                             "https://www.thingjs.com/uearth/uGeo/building_top.png",
                             "https://www.thingjs.com/uearth/uGeo/building.png",
                         ],  // 楼宇顶部贴图和侧边贴图
                         textureWrap: THING.EARTH.TextureWrapMode.Stretch,  // 贴图循环方式为拉伸
                     },
                 });
                 // 图层添加到Map
                 map.addLayer(buildingLayer);
             },
         });
     }
 })
 
 new THING.widget.Button("地图添加事件", function () {
     reset();
     initThingJsTip("给地图图层添加点击事件，鼠标左键单击任意位置，获取位置信息<span></span>");
 
     // 地图注册点击事件
     map.on('click', function (ev) {
         // 获取鼠标点击处的经纬度
         var lonlat = ev.coordinates;
         // 将经纬度坐标转为三维坐标，第二个参数代表离地高度
         var worldPos = THING.EARTH.Utils.convertLonlatToWorld(lonlat, 0);
         // 根据经纬度和方位角计算物体在地球上的旋转信息，第二个参数为方位角 默认0
         var angles = THING.EARTH.Utils.getAnglesFromLonlat(lonlat, 0);
         initThingJsTip("给地图图层添加点击事件，鼠标左键单击任意位置，获取位置信息<span><br><br>经纬度：[ " + lonlat + " ]</span>");
     }, 'mapClick');
 });
 
 new THING.widget.Button("图层添加事件", function () {
     reset();
     initThingJsTip("给建筑图层添加点击事件，点击建筑，展示建筑信息<br><span></span>");
     // 图层添加点击事件
     app.query(".GeoBuilding").on("click", function (ev) {
         initThingJsTip("给建筑图层添加点击事件，点击建筑，展示建筑信息<br><span></span><br>建筑id：" + ev.object.id + "<br>建筑高度：" + ev.object.userData.height + "米");
     }, 'layerClick');
 });
 
 new THING.widget.Button("重置", function () {
     reset();
 });
 
 function reset() {
     initThingJsTip("本例程展示了在地图上如何给图层添加事件，点击按钮，查看效果");
     app.query(".GeoBuilding").style.outlineColor = null;
     map.off('click', 'mapClick');
     if (!buildingLayer) return;
     buildingLayer.off("click", 'layerClick');
 }