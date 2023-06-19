/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：创建不同样式的 GeoPoint 地理点
 *      创建不同样式的 GeoLine 地理线
 *      创建不同样式的 GeoODLine 简单OD线 贴地曲线
 *      创建 createGeo 地理飞线(3D抬高)
 * 备注：以百分比表示界面轴心位置 [0,0] 代表界面左上；[1,1] 代表界面右下 默认[0.5,1]
 *      设置GeoPoint下方中点作为轴心点，这样设置可以让轴心点钉在所设置的position上
 *      仅针对type为image和vector的GeoPoint生效
 * 操作：点击按钮
 * 难度：★☆☆☆☆
 */

 var app = new THING.App();
 app.background = [0, 0, 0];
 var createGeo='';
 
 /**
  * 初始摄像机视角
  */
 function geoLine1() {
     app.camera.earthFlyTo({
         lonlat: [116.39147758483887, 39.90483120567556],
         height: 5000,
     });
 }
 /**
  * 创建GeoPolygon摄像机视角
  */
 function geoPolygon() {
     app.camera.earthFlyTo({
         lonlat: [116.3902759552002, 39.92428465665397],
         height: 2000,
     });
 }
 
 /**
  * 创建GeoLine摄像机视角
  */
 function geoPolygon1() {
     app.camera.earthFlyTo({
         lonlat: [116.38541042804717, 39.90609864611045],
         height: 1000,
     });
 }
 
 /**
  * 创建GeoODLine 简单OD线 贴地曲线摄像机视角
  */
 function geoODLine1() {
     // 设置摄像机位置和目标点
     app.camera.position = [2536420.43709206, 4191758.665260809, 5137729.352879549];
     app.camera.target = [2212487.9715226237, 3967616.235780694, 4476803.283548883];
 }
 
 /**
  * 创建createGeo 地理飞线(3D抬高)
  */
 function createGeo() {
     // 设置摄像机位置和目标点
     app.camera.position = [2925661.084139668, 4160968.709119701, 4262340.530237667];
     app.camera.target = [2212487.9715226237, 3967616.235780694, 4476803.283548883];
 }
 // 创建一个地图
 var map = new THING.EARTH.Map({
     attribution: "高德",
 });
 // 创建一个瓦片图层
 var tileLayer1 = new THING.EARTH.TileLayer({
     name: "卫星影像图层",
     url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
 });
 // 将瓦片图添加到底图图层中
 map.addLayer(tileLayer1);
 
 // 创建一个 ThingLayer
 var thingLayer = new THING.EARTH.ThingLayer({
     name: "thingLayer01",
 });
 // 将ThingLayer添加到地图中
 map.addLayer(thingLayer);
 
 geoLine1();
 
 new THING.widget.Button("创建点图标", function () {
     geoLine1();
     reset();
     app.camera.earthFlyTo({
         lonlat: [116.39147758483887, 39.90483120567556],
         height: 5000,
     });
 
     initThingJsTip("创建点图标");
     createGeo = thingLayer.query("王府井地铁站")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoPoint({
             name: "王府井地铁站",
             userData: { 类别: "地铁站", 线路: "一号线" },
             coordinates: [116.4052963256836, 39.90654306772361],
             style: {
                 pointType: THING.EARTH.SymbolType.Image, // 代表使用图片
                 url: "https://www.thingjs.com/static/image/train_station.png", // 图片 url
                 size: 16, // 缩放比例
                 //keepSize: false // 图标近大远小
             },
         });
         thingLayer.add(createGeo); // 将一个点加到ThingLayer中
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button("调整轴心点", function () {
     geoLine1();
     createGeo = thingLayer.query("王府井地铁站")[0];
     if (createGeo) {
         initThingJsTip("调整点图标的轴心点，以百分比表示界面轴心位置 [0,0] 代表界面左上；[1,1] 代表界面右下 默认[0.5,1]，针对type为image和vector的GeoPoint生效");
         if (createGeo.pivot[0] === 0.5 && createGeo.pivot[1] === 0) {
             createGeo.pivot = [0.5, 0.5];
         }
         else {
             createGeo.pivot = [0.5, 0];
         }
     } else {
         initThingJsTip("请先点击按钮【创建点图标】");
     }
 });
 
 new THING.widget.Button("创建符号", function () {
     geoLine1();
     reset();
     initThingJsTip("创建符号");
     createGeo = thingLayer.query("国家大剧院")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoPoint({
             type: "GeoPoint",
             name: "国家大剧院",
             userData: { 类别: "剧院" },
             coordinates: [116.38353824615479, 39.903308600125236],
             style: {
                 pointType: THING.EARTH.SymbolType.Vector, // Vector 代表使用内置矢量符号
                 vectorType: THING.EARTH.VectorType.Circle, // 矢量符号形状 Circle(圆形),Triangle(三角形),Rectangle(正方形),Cross(十字)
                 color: [1, 0, 0], // 矢量符号填充色
                 opacity: 0.5, // 符号不透明度
                 lineColor: [1, 1, 0], // 描边颜色
                 lineOpacity: 0.8, // 描边透明度
                 lineWidth: 2, // 描边宽度
                 size: 10, // 缩放比例
             },
         });
         thingLayer.add(createGeo); // 将一个点加到ThingLayer中
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button("创建模型", function () {
     geoLine1();
     reset();
     initThingJsTip("创建救护车模型（地图上可以通过脚本动态创建GeoPoint模型，也支持Thing类模型动态创建）");
     createGeo = thingLayer.query("救护车")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoPoint({
             name: "救护车",
             userData: { 类别: "车" },
             coordinates: [116.38434827327728, 39.90610070362458],
             azimuth: 90, // 模型旋转角度
             style: {
                 pointType: THING.EARTH.SymbolType.Model, // model 代表使用模型
                 url: "https://model.3dmomoda.com/models/4385928f07b24d77a523641fe584aa8d/0/gltf/", // 模型地址
                 size: 50, // 缩放比例
             },
         });
         thingLayer.add(createGeo); // 将一个点加到ThingLayer中
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button("创建地理多边形", function () {
     reset();
     initThingJsTip("创建地理多边形");
     geoPolygon();
     createGeo = thingLayer.query("多边形_纯色")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoPolygon({
             name: "多边形_纯色",
             coordinates: [
                 [
                     [116.38774394989012, 39.926703608137295],
                     [116.38801217079163, 39.921997270172746],
                     [116.39319419860838, 39.92214537664713],
                     [116.3927972316742, 39.92680233903546],
                     [116.38774394989012, 39.926703608137295],
                 ],
             ], // 支持Polygon和MultiPolygon,格式可参考geoJson规范
             style: {
                 type: "vector", // GeoPolygon渲染类型 支持纯色(vector)和贴图(image)两种类型
                 color: [0, 255, 0], // 面填充颜色, type是vector时生效
                 opacity: 0.8, // 填充不透明度
                 outline: {
                     color: [1, 1, 0], // 边框色
                     width: 2, // 边框宽度
                 }
             },
         });
         thingLayer.add(createGeo);
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button("创建地理像素线", function () {
     reset();
     initThingJsTip("创建地理像素线");
     geoPolygon1();
     createGeo = thingLayer.query("像素线")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoLine({
             name: "像素线",
             coordinates: [
                 [116.36808335781097, 39.905372319181026],
                 [116.37653768062592, 39.905343513881824],
                 [116.38541042804717, 39.90559864611045],
                 [116.3970512151718, 39.90599780269116],
                 [116.40042006969452, 39.90610479271963],
                 [116.40524268150331, 39.906252932483206],
                 [116.41170680522919, 39.90642987678102],
             ],
             style: {
                 lineType: THING.EARTH.GeoLineType.Line,
                 url: 'https://www.thingjs.com/guide/image/uGeo/path.png',
                 speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
             },
         });
         thingLayer.add(createGeo); // 添加到ThingLayer中
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button("创建地理管状线", function () {
     reset();
     initThingJsTip("创建地理管状线");
     geoPolygon1();
     createGeo = thingLayer.query("管状线")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoLine({
             name: "管状线带贴图",
             coordinates: [
                 [116.36808335781097, 39.90437231918103],
                 [116.37653768062592, 39.90434351388183],
                 [116.38541042804717, 39.90459864611045],
                 [116.3970512151718, 39.90499780269116],
                 [116.40042006969452, 39.905104792719634],
                 [116.40524268150331, 39.90525293248321],
                 [116.41170680522919, 39.90542987678102],
             ],
             style: {
                 lineType: THING.EARTH.GeoLineType.Pipe,
                 url: 'https://www.thingjs.com/guide/image/uGeo/path.png',
                 width: 10, // 设置管线半径 单位米
                 speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
             },
         });
         thingLayer.add(createGeo); // 添加到ThingLayer中
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button("创建地理片状线", function () {
     reset();
 
     initThingJsTip("创建地理片状线");
     geoPolygon1();
     createGeo = thingLayer.query("片状线")[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoLine({
             name: "片状线带贴图",
             coordinates: [
                 [116.36808335781097, 39.90337231918103],
                 [116.37653768062592, 39.90334351388183],
                 [116.38541042804717, 39.90359864611045],
                 [116.3970512151718, 39.903997802691165],
                 [116.40042006969452, 39.904104792719636],
                 [116.40524268150331, 39.90425293248321],
                 [116.41170680522919, 39.90442987678102],
             ],
             style: {
                 lineType: THING.EARTH.GeoLineType.Plane,
                 url: 'https://www.thingjs.com/guide/image/uGeo/path.png',
                 width: 10, // 设置线宽 单位像素
                 speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
             },
         });
         thingLayer.add(createGeo); // 添加到ThingLayer中
     } else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 var startPos = [116.39139175415039, 39.906082185995366];
 new THING.widget.Button('像素线', function () {
     reset();
     createGeo = thingLayer.query('北京-济南')[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoLine({
             name: "像素线",
             coordinates: [
                 [116.36808335781097, 39.90587231918103],
                 [116.37653768062592, 39.90584351388183],
                 [116.38541042804717, 39.90609864611045],
                 [116.3970512151718, 39.90649780269116],
                 [116.40042006969452, 39.906604792719634],
                 [116.40524268150331, 39.90675293248321],
                 [116.41170680522919, 39.90692987678102],
             ],
             style: {
                 lineType: THING.EARTH.GeoLineType.Line,
                 color: [1, 0, 0],
                 url: 'https://www.thingjs.com/guide/image/uGeo/path.png',
                 speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
             },
         });
         thingLayer.add(createGeo);// 添加到ThingLayer中
     }
     else {
         createGeo.visible = !createGeo.visible;
     }
 });
 
 new THING.widget.Button('管状线', function () {
     reset();
     createGeo = thingLayer.query('北京-武汉')[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoLine({
             name: "管状线带贴图",
             coordinates: [
                 [116.36808335781097, 39.90437231918103],
                 [116.37653768062592, 39.90434351388183],
                 [116.38541042804717, 39.90459864611045],
                 [116.3970512151718, 39.90499780269116],
                 [116.40042006969452, 39.905104792719634],
                 [116.40524268150331, 39.90525293248321],
                 [116.41170680522919, 39.90542987678102],
             ],
             style: {
                 lineType: THING.EARTH.GeoLineType.Pipe,
                 url: 'https://www.thingjs.com/guide/image/uGeo/path.png',
                 width: 10, // 设置管线半径 单位米
                 speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
             },
         });
         thingLayer.add(createGeo);// 添加到ThingLayer中
     }
     else {
         createGeo.visible = !createGeo.visible;
     }
 });

 new THING.widget.Button('片状线', function () {
     reset();
     createGeo = thingLayer.query('北京-郑州')[0];
     if (!createGeo) {
         createGeo = new THING.EARTH.GeoLine({
             name: "片状线带贴图",
             coordinates: [
                 [116.36808335781097, 39.90337231918103],
                 [116.37653768062592, 39.90334351388183],
                 [116.38541042804717, 39.90359864611045],
                 [116.3970512151718, 39.903997802691165],
                 [116.40042006969452, 39.904104792719636],
                 [116.40524268150331, 39.90425293248321],
                 [116.41170680522919, 39.90442987678102],
             ],
             style: {
                 lineType: THING.EARTH.GeoLineType.Plane,
                 url: 'https://www.thingjs.com/guide/image/uGeo/path.png',
                 width: 10, // 设置线宽 单位像素
                 speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
             },
         });
         thingLayer.add(createGeo); // 添加到ThingLayer中
     }
     else {
         createGeo.visible = !createGeo.visible;
     }
 });

 new THING.widget.Button("重置", reset);
 
 /**
  * 重置
  */
 function reset() {
     geoLine1();
     if (createGeo) {
         createGeo.destroy();
         createGeo = "";
     }
     initThingJsTip("点击按钮创建 GeoPoint 地理点、 GeoLine 地理线、 GeoODLine 简单OD线 贴地曲线、GeoPolygon 地理多边形、GeoFlyLine 地理飞线(3D抬高)");
 }
 initThingJsTip("点击按钮创建 GeoPoint 地理点、 GeoLine 地理线、 GeoODLine 简单OD线 贴地曲线、GeoPolygon 地理多边形");