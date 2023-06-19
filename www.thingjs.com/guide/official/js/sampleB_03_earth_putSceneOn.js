/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：动态创建地图，创建园区
 * 备注：该示例将一个园区放置在地球上，主要步骤是：
 *          1 根据园区的地理坐标计算园区在地球上的位置
 *          2 计算园区在地球上的旋转角度
 *          3 根据前两步结果将园区放置在地球上
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
     maximumLevel: 18
 });
 // 将瓦片图层添加到map中
 map.addLayer(tileLayer);

 // 园区的经纬度坐标(GCJ_02坐标系)
 var sceneLonlat = [116.495724, 39.977478];
 // 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
 var position = THING.EARTH.Utils.convertLonlatToWorld(sceneLonlat, 0.5);
 // 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
 var angles = THING.EARTH.Utils.getAnglesFromLonlat(sceneLonlat, 180);
 // 相机飞到指定的地理位置和指定高度 地球上使用flyTo需要加isEarth参数
 app.camera.earthFlyTo({
     lonlat: sceneLonlat,
     height: 200,
     time: 3000,
     complete: function () {
         // 创建Campus
         const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example", {
             position: position, // 位置
             angles: angles, // 旋转
             ignoreTheme: true,
         });
         bundle.waitForComplete().then((ev) => {
             if (ev.bundle.campuses && ev.bundle.campuses.length > 0) {
                 var campus = ev.bundle.campuses[0];
                 app.scene.root.setInstancedOffset(campus.position);
                 app.levelManager.change(campus);
             }
         });
     },
 });