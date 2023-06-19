/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 */
 var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];

var map = new THING.EARTH.Map({
    type: "Map",
    // CityBuilder转出的url
    url: "https://www.thingjs.com/citybuilder_console/mapProject/config/TVRRek5qZ3pDaXR5QnVpbGRlckAyMDE5",
    complete: function (event) {
        var building = app.query(/建筑/)[0].data.features;
        var points1 = app.query(/旅游/)[0].data.features;
        var points2 = app.query(/医疗服务/)[0].data.features
        var points3 = app.query(/大型购物广场/)[0].data.features;
        var newPoints2 = points2.filter((i, index) => index % 10 == 0);
        createBuilding(building, 'building')
        createMeshLine(points1, "#FF9933FF");
        createMeshLine(newPoints2, "#FF00FFFF");
        createMeshLine(points3, "#00CCFFFF");
    },
});

var thingLayer = new THING.EARTH.ThingLayer({
    name: "thingLayer01",
});
map.addLayer(thingLayer);

/**
 * 创建GeoBuilding
 */
function createBuilding(building, name) {
    building.map(item => {
        var coordinates = item.geometry.coordinates;
        var height = item.properties.height;
        var building = new THING.EARTH.GeoBuilding({
            name: name,
            coordinates: coordinates,
            extrudeHeight: height,
            style: {
                color: '#3D3F46',// 面填充颜色
                opacity: 1, // 填充不透明度
            }
        });
        thingLayer.add(building);
    })
}

/**
 * 创建GeoLine
 */
function createMeshLine(points, color) {
    points.map(item => {
        var height = Math.random() * 2000 + 3000;
        var geoLine = new THING.EARTH.GeoLine({
            name: color,
            coordinates: [item.geometry.coordinates, item.geometry.coordinates],
            heights: [0, height * 0.1],
            style: {
                lineType: THING.EARTH.GeoLineType.Line,
                gradient: {
                    0: "#00000000",
                    0.7: "#33333300",
                    0.8: "#333333FF",
                    1: color,
                },
                speed: 0.4
            },
        });
        thingLayer.add(geoLine);
    })
}

// 创建提示
initThingJsTip(`通过创建GeoLine（地理线）添加烟花图效果`);