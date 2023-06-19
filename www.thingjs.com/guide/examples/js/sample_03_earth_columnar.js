var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];
var newarr = [];
var newarr2 = [];
var arr = [
    [2165655.1396114295, 4114352.0966101163, 4365832.415936076],
    [2662057.5622300194, 4418588.240325375, 3750750.348959174],
    [1767421.0596036618, 4228474.383904113, 4434558.528500963],
    [2394868.6435673204, 3769006.698589486, 4553000.555517837],
    [2486086.5614174376, 3329024.786824286, 4838712.726484586],
    [1218816.9869283293, 3246017.2371543637, 5352094.171977467],
    [2329539.893699594, 2565281.065092118, 5353712.6602103505],
    [2030091.0181420585, 2113557.693443252, 5664375.176012668],
    [-331990.1761847738, 4095658.023244825, 4876877.566923073]
];
var arr2 = [
    [2616998.3939855373, 4244380.281059966, 3976812.7153125475],
    [2657034.0993919773, 4600324.120928961, 3528972.4762104847],
    [2133668.39296656, 3962963.9461863646, 4518025.034522062],
    [1911719.0939941471, 3859355.61517046, 4703444.055135107],
    [1710907.0406027823, 3597407.209459497, 4980305.344902273],
    [2084471.9009466884, 2966999.365445058, 5245799.075529899],
    [42737.188761066296, 3256126.370391139, 5483013.354519836],
]
var colorMapping = {
    0: "#004FEA",
    0.24: "#004FEA",
    0.241: "#00B3B3",
    0.5: "#00B3B3",
    0.501: "#00B450",
    0.74: "#00B450",
    0.741: "#EAC700",
    1: "#EAC700"
};

// 引用地图组件脚本
THING.Utils.dynamicLoad(["https://www.thingjs.com/uearth/uearth.min.js"], function () {
    app.create({
        type: "Map",
        url: "https://www.thingjs.com/citybuilder_console/mapProject/config/TVRFek5ETXdDaXR5QnVpbGRlckAyMDE5",
        complete: function (event) {
            for (var i = 0; i < arr.length; i++) {
                newarr.push(CMAP.Util.convertWorldToLonlat(arr[i]))
            }
            for (var i = 0; i < arr2.length; i++) {
                newarr2.push(CMAP.Util.convertWorldToLonlat(arr2[i]))
            }
            for (var i = 0; i < newarr.length; i++) {
                var coordinates = createCoordinates(newarr[i], 15);
                createPoint(coordinates, colorMapping);
            }
            for (var i = 0; i < newarr2.length; i++) {
                var coordinates = createCoordinates(newarr2[i], 15);
                createPoint(coordinates, colorMapping);
            }
        }
    });
});

function createCoordinates(point, n) {
    var coordinates = [];
    for (var i = 0; i < n; i++) {
        var xy = [point[0] + 0.3 * Math.cos(2 * Math.PI * i / n), point[1] + 0.3 * Math.sin(2 * Math.PI * i / n) * 0.75];
        coordinates.push(xy);
    }
    return coordinates;
}

/**
 * 创建地理多边形
 */
function createPoint(coordinates, colorMapping) {
    var geoPolygon = app.create({
        type: 'GeoPolygon',
        name: '多边形_纯色',
        coordinates:coordinates, // 支持Polygon和MultiPolygon,格式可参考geoJson规范
        extrudeHeight: 300000, //拉伸高度100m
        renderer: {
            type: 'vector', // 纯色填充
            color: "#EAC700", // 面填充颜色
            lights: false,//默认为true，受光照影响，为false不受光照影响
            colorMapping:colorMapping,
        }
    });
}

// 创建提示
initThingJsTip(`通过绘制地理多边形创建不同分段色指的柱状体`);