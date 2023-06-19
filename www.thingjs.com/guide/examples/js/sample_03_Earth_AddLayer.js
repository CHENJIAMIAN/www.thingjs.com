/**
 * 说明：创建不同样式的 GeoPoint 地理点
 *      创建不同样式的 GeoLine 地理线
 *      创建不同样式的 GeoODLine 简单OD线 贴地曲线
 *      创建 GeoFlyLine 地理飞线(3D抬高)
 * 备注：以百分比表示界面轴心位置 [0,0] 代表界面左上；[1,1] 代表界面右下 默认[0.5,1]
 *      设置GeoPoint下方中点作为轴心点，这样设置可以让轴心点钉在所设置的position上
 *      仅针对type为image和vector的GeoPoint生效
 * 操作：点击按钮
 * 难度：★☆☆☆☆
 */

var app = new THING.App();
app.background = [0, 0, 0];
var createPoint;
var createSymbol;
var createModel;
var createGeoLine;
var createGeoLine1;
var createGeoLine2;
var createGeODLine;
var createGeODLine1;
var createGeODLine2;
var createGeoFlyLine;
var geoPolygon;

/**
 * 初始摄像机视角
 */
function geoLine1() {
    app.camera.earthFlyTo({
        time: 2000,
        lonlat: [116.40283488036437, 39.89788101373266],
        height: 3618.3299,
        heading: -3.77,
        pitch: 27.164,
    });
}

/**
 * 创建GeoLine摄像机视角
 */
function geoPolygon1() {
    app.camera.earthFlyTo({
        time: 2000,
        lonlat: [116.38835932654891, 39.90555222011491],
        height: 2882.43,
        heading: 2.4993754584633288,
        pitch: 34.20,
    });
}

/**
 * 创建GeoODLine 简单OD线 贴地曲线摄像机视角
 */
function geoODLine1() {
    app.camera.earthFlyTo({
        time: 2000,
        lonlat: [116.29911506825253, 38.4680817013982],
        height: 721333.2,
        heading: -0.492,
        pitch: 68.468,
    });
}

/**
 * 创建GeoFlyLine 地理飞线(3D抬高)摄像机视角
 */
function geoFlyLine() {
    app.camera.earthFlyTo({
        time: 2000,
        lonlat: [116.29922085916095, 38.46809974069013],
        height: 258316.76,
        heading: 95.787,
        pitch: 16.392,
    });
}

THING.Utils.dynamicLoad(
    "https://www.thingjs.com/uearth/uearth.min.js",
    function () {
        // 创建一个地图
        var map = app.create({
            type: "Map",
            attribution: "高德",
            style: {
                night: false,
            },
        });
        // 创建一个瓦片图层 添加到地图中
        var tileLayer1 = app.create({
            type: "TileLayer",
            name: "卫星影像图层",
            // 高德 GCJ02 卫星影像服务
            url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            style: {
                template: CMAP.TileLayerStyle.DARKBLUE, // 设置瓦片图层滤镜为 深蓝滤镜
            },
        });

        map.addLayer(tileLayer1);

        // 创建一个 ThingLayer
        var thingLayer = app.create({
            type: "ThingLayer",
            name: "thingLayer01",
        });

        // 将ThingLayer添加到地图中
        map.addLayer(thingLayer);

        geoLine1();
        reset();

        new THING.widget.Button("创建点图标", function () {
            reset();

            initThingJsTip("创建点图标");
            createPoint = thingLayer.query("王府井地铁站")[0];
            if (!createPoint) {
                createPoint = app.create({
                    type: "GeoPoint",
                    name: "王府井地铁站",
                    userData: { "类别": "地铁站", "线路": "一号线" },
                    coordinates: [116.4052963256836, 39.90654306772361],
                    renderer: {
                        type: "image", // image 代表使用图片
                        url: "https://www.thingjs.com/static/image/train_station.png", // 图片 url
                        size: 16, // 缩放比例
                        //keepSize: false // 图标近大远小
                    },
                });
                thingLayer.add(createPoint); // 将一个点加到ThingLayer中
            } else {
                createPoint.visible = !createPoint.visible;
            }
        });

        new THING.widget.Button("调整轴心点", function () {
            if (createPoint) {
                initThingJsTip("调整点图标的轴心点，以百分比表示界面轴心位置 [0,0] 代表界面左上；[1,1] 代表界面右下 默认[0.5,1]，针对type为image和vector的GeoPoint生效");
                if (createPoint.pivot[0] === 0.5 && createPoint.pivot[1] === 0.5) {
                    createPoint.pivot = [0.5, 1];
                } else {
                    createPoint.pivot = [0.5, 0.5];
                }
            } else {
                initThingJsTip("请先点击按钮【创建点图标】");
            }
        });

        new THING.widget.Button("创建符号", function () {
            reset();

            initThingJsTip("创建符号");
            createSymbol = thingLayer.query("国家大剧院")[0];
            if (!createSymbol) {
                createSymbol = app.create({
                    type: "GeoPoint",
                    name: "国家大剧院",
                    userData: { "类别": "剧院" },
                    coordinates: [116.38353824615479, 39.903308600125236],
                    renderer: {
                        type: "vector", // vector 代表使用内置矢量符号
                        vectorType: "circle", // 矢量符号形状 circle(圆形),triangle(三角形),rectangle(正方形),cross(十字)
                        color: [255, 0, 0], // 矢量符号填充色
                        opacity: 0.5, // 符号不透明度
                        lineColor: [255, 255, 0], // 描边颜色
                        lineOpacity: 0.8, // 描边透明度
                        lineWidth: 2, // 描边宽度
                        size: 10, // 缩放比例
                        //keepSize: false, // 符号近大远小
                    },
                });
                thingLayer.add(createSymbol); // 将一个点加到ThingLayer中
            } else {
                createSymbol.visible = !createSymbol.visible;
            }
        });

        new THING.widget.Button("创建模型", function () {
            reset();

            initThingJsTip("创建救护车模型（地图上可以通过脚本动态创建GeoPoint模型，也支持Thing类模型动态创建）");
            createModel = thingLayer.query("救护车")[0];
            if (!createModel) {
                createModel = app.create({
                    type: "GeoPoint",
                    name: "救护车",
                    userData: { "类别": "车" },
                    coordinates: [116.38407244649, 39.90704121937225],
                    modelAngle: 90, // 模型旋转角度
                    renderer: {
                        type: "model", // model 代表使用模型
                        url: "https://model.3dmomoda.com/models/4385928f07b24d77a523641fe584aa8d/0/gltf/", // 模型地址
                        size: 100, // 缩放比例
                    },
                });
                thingLayer.add(createModel); // 将一个点加到ThingLayer中
            } else {
                createModel.visible = !createModel.visible;
            }
        });

        new THING.widget.Button("创建地理多边形", function () {
            reset();
            initThingJsTip("创建地理多边形");
            geoPolygon1();
            geoPolygon = thingLayer.query("多边形_纯色")[0];
            if (!geoPolygon) {
                geoPolygon = app.create({
                    type: "GeoPolygon",
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
                    renderer: {
                        type: "vector", // GeoPolygon渲染类型 支持纯色(vector)和贴图(image)两种类型
                        color: [0, 255, 0], // 面填充颜色, type是vector时生效
                        opacity: 0.8, // 填充不透明度
                        outlineColor: [255, 255, 0], // 边框色
                        outlineWidth: 2, // 边框宽度
                        // outlineOpacity: 0.4, // 边框不透明度
                        // outlineSpeed: 1,// 边框流动速度
                        // outlineEffect: true // 边框发光效果
                    },
                });
                thingLayer.add(geoPolygon);
            } else {
                geoPolygon.visible = !geoPolygon.visible;
            }
        });

        new THING.widget.Button("创建地理像素线", function () {
            reset();

            initThingJsTip("创建地理像素线");
            geoPolygon1();
            createGeoLine = thingLayer.query("像素线")[0];
            if (!createGeoLine) {
                createGeoLine = app.create({
                    type: "GeoLine",
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
                    renderer: {
                        type: "vector", //GeoLine渲染类型 支持纯色(vector)和贴图(image)两种类型
                        lineType: "Line", // 可以是Line Plane Pipe Route
                        color: [255, 0, 0], // 线的颜色, type是vector时生效
                        // opacity:0.2 ,// 设置不透明度 默认是1
                        // speed: 1 ,// 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
                        // effect: true,  // 线发光效果 默认为 false 不开启
                        // imageUrl: './image/line.png',  // 线的贴图url，type是image时生效
                        // width: 10, //只在线类型为Plane,Pipe下生效，代表线的宽度
                        // numPass: 1, //通道数,在贴图时贴图叠加的次数，次数越多颜色越亮,type是image时生效
                        // speed: 0,  //线贴图流动速度,默认是0，不流动 speed可以大于0也可以小于0，代表流动方向
                        // growSpeed: 0, //线生长速度,默认是0，不生长，lineType是Line,Plane时生效
                        // growLoop: true //线生长是否循环，默认是true，lineType是Line,Plane时生效
                    },
                });
                thingLayer.add(createGeoLine); // 添加到ThingLayer中
            } else {
                createGeoLine.visible = !createGeoLine.visible;
            }
        });

        new THING.widget.Button("创建地理管状线", function () {
            reset();

            initThingJsTip("创建地理管状线");
            geoPolygon1();
            createGeoLine1 = thingLayer.query("管状线")[0];
            if (!createGeoLine1) {
                createGeoLine1 = app.create({
                    type: "GeoLine",
                    name: "管状线",
                    coordinates: [
                        [116.36808335781097, 39.90487231918103],
                        [116.37653768062592, 39.90484351388183],
                        [116.38541042804717, 39.90509864611045],
                        [116.3970512151718, 39.905497802691166],
                        [116.40042006969452, 39.905604792719636],
                        [116.40524268150331, 39.90575293248321],
                        [116.41170680522919, 39.90592987678102],
                    ],
                    renderer: {
                        type: "vector", // 代表纯色渲染
                        lineType: "Pipe",
                        color: [0, 0, 255],
                        width: 10, // 设置管线半径 单位米
                        // opacity: 0.2, // 设置不透明度 默认是1
                        // effect: true // 线发光效果 默认为 false 不开启
                    },
                });
                thingLayer.add(createGeoLine1); // 添加到ThingLayer中
            } else {
                createGeoLine1.visible = !createGeoLine1.visible;
            }
        });

        new THING.widget.Button("创建地理片状线", function () {
            reset();

            initThingJsTip("创建地理片状线");
            geoPolygon1();
            createGeoLine2 = thingLayer.query("片状线")[0];
            if (!createGeoLine2) {
                createGeoLine2 = app.create({
                    type: "GeoLine",
                    name: "片状线",
                    coordinates: [
                        [116.36808335781097, 39.90387231918103],
                        [116.37653768062592, 39.90384351388183],
                        [116.38541042804717, 39.904098646110455],
                        [116.3970512151718, 39.90449780269117],
                        [116.40042006969452, 39.90460479271964],
                        [116.40524268150331, 39.90475293248321],
                        [116.41170680522919, 39.904929876781026],
                    ],
                    renderer: {
                        type: "vector", // 代表纯色渲染
                        lineType: "Plane",
                        color: [0, 255, 0],
                        width: 10, // 设置线宽 单位像素
                        // opacity: 0.2,// 设置不透明度 默认是1
                        // speed: 1 ,// 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
                        // effect: true // 线发光效果 默认为 false 不开启
                    },
                });
                thingLayer.add(createGeoLine2); // 添加到ThingLayer中
            } else {
                createGeoLine2.visible = !createGeoLine2.visible;
            }
        });

        var startPos = [116.39139175415039, 39.906082185995366]; // 起始坐标点

        new THING.widget.Button("创建贴地像素曲线", function () {
            reset();

            initThingJsTip("创建贴地像素曲线");
            geoODLine1();
            createGeODLine = thingLayer.query("北京-济南")[0];
            if (!createGeODLine) {
                createGeODLine = app.create({
                    type: "GeoODLine",
                    name: "北京-济南",
                    coordinates: [
                        startPos,
                        [117.1142578125, 36.63316209558658], //注：起止线的坐标只可以有两个点
                    ],
                    renderer: {
                        type: "vector", // 代表纯色渲染
                        lineType: "Line",
                        color: [255, 0, 0],
                        speed: 100, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
                        // opacity:0.2 ,// 设置不透明度 默认是1
                        // effect: true // 线发光效果 默认为 false 不开启
                    },
                });
                thingLayer.add(createGeODLine); // 添加到ThingLayer中
            } else {
                createGeODLine.visible = !createGeODLine.visible;
            }
        });

        new THING.widget.Button("创建贴地管状曲线", function () {
            reset();

            initThingJsTip("创建贴地管状曲线");
            geoODLine1();
            createGeODLine1 = thingLayer.query("北京-杭州")[0];
            if (!createGeODLine1) {
                createGeODLine1 = app.create({
                    type: "GeoODLine",
                    name: "北京-杭州",
                    coordinates: [startPos, [116.073184001734, 36.72844783091905]],
                    renderer: {
                        type: "vector", // 代表纯色渲染
                        lineType: "Pipe",
                        color: [255, 0, 0],
                        width: 1000, // 设置管线半径 单位米
                        // opacity:0.2 , // 设置不透明度 默认是1
                        // effect: true // 线发光效果 默认为 false 不开启
                    },
                });
                thingLayer.add(createGeODLine1); // 添加到ThingLayer中
            } else {
                createGeODLine1.visible = !createGeODLine1.visible;
            }
        });

        new THING.widget.Button("创建贴地片状曲线", function () {
            reset();

            initThingJsTip("创建贴地片状曲线");
            geoODLine1();
            createGeODLine2 = thingLayer.query("北京-郑州")[0];
            if (!createGeODLine2) {
                createGeODLine2 = app.create({
                    type: "GeoODLine",
                    name: "北京-郑州",
                    coordinates: [startPos, [115.21890146374763, 37.976147286786166]],
                    renderer: {
                        type: "vector", // 代表纯色渲染
                        lineType: "Plane",
                        color: [255, 0, 0],
                        width: 2, // 设置线宽 单位像素
                        speed: 100, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
                        // opacity: 0.2,// 设置不透明度 默认是1
                        // effect: true // 线发光效果 默认为 false 不开启
                    },
                });
                thingLayer.add(createGeODLine2); // 添加到ThingLayer中
            } else {
                createGeODLine2.visible = !createGeODLine2.visible;
            }
        });

        new THING.widget.Button("创建地理飞线", function () {
            reset();

            initThingJsTip("创建地理飞线");
            geoFlyLine();
            createGeoFlyLine = thingLayer.query("geoFlyLine")[0];
            if (!createGeoFlyLine) {
                createGeoFlyLine = app.create({
                    type: 'GeoFlyLine',
                    id: 'geoFlyLine',
                    name: 'geoFlyLine',
                    coordinates: [[117.1142578125, 36.63316209558658], [116.4408, 39.9613]],//注 飞线的坐标只可以有两个点
                    renderer: {
                        type: 'vector', //GeoFlyLine渲染类型 支持纯色(vector)和贴图(image)两种模式
                        lineType: 'Line', //可以是Line Plane Pipe
                        // imageUrl: './image/line.png',//线的贴图url
                        color: [255, 255, 255], //线的颜色,如果设置此项，imageUrl会失效
                        effect: true, //是否开启发光特效
                        width: 10, //只在线类型为Plane,Pipe下生效,代表线的宽度
                        speed: 0  //线贴图流动速度,默认是0,不流动 speed可以大于0也可以小于0，代表流动方向
                    }
                });
                thingLayer.add(createGeoFlyLine); // 添加到ThingLayer中
            } else {
                createGeoFlyLine.visible = !createGeoFlyLine.visible;
            }
        });
        // 创建按钮
        new THING.widget.Button("重置", reset);
    }
);

/**
 * 重置
 */
function reset() {
    geoLine1();
    if (createPoint) {
        createPoint.destroy();
        createPoint = "";
    }
    if (createSymbol) createSymbol.destroy();
    if (createModel) createModel.destroy();
    if (createGeoLine) createGeoLine.destroy();
    if (createGeoLine1) createGeoLine1.destroy();
    if (createGeoLine2) createGeoLine2.destroy();
    if (createGeODLine) createGeODLine.destroy();
    if (createGeODLine1) createGeODLine1.destroy();
    if (createGeODLine2) createGeODLine2.destroy();
    if (createGeoFlyLine) createGeoFlyLine.destroy();
    if (geoPolygon) geoPolygon.destroy();

    initThingJsTip("点击按钮创建 GeoPoint 地理点、 GeoLine 地理线、 GeoODLine 简单OD线 贴地曲线、GeoPolygon 地理多边形、GeoFlyLine 地理飞线(3D抬高)");
}