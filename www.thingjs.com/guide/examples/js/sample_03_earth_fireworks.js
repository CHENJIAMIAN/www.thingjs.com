var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];

var thingLayer = app.create({
    type: "ThingLayer",
    name: "thingLayer01"
});

// 引用地图组件脚本
THING.Utils.dynamicLoad(["https://www.thingjs.com/uearth/uearth.min.js"], function () {
    const map = app.create({
        type: "Map",
        url: 'https://www.thingjs.com/citybuilder_console/mapProject/config/TVRFek5ETTRDaXR5QnVpbGRlckAyMDE5',
        complete: (event) => {
            var building = app.query('双阳区3D建筑')[0].data.features;
            var points1 = app.query('双阳区旅游')[0].data.features;
            var points2 = app.query('双阳区医疗服务')[0].data.features;
            var points3 = app.query('双阳区大型购物广场')[0].data.features;
            var newPoints2 = points2.filter((i, index) => index % 10 === 0);

            createBuilding(building, 'building');
            createMeshLine(points1, '#FF9933FF');
            createMeshLine(newPoints2, '#FF00FFFF');
            createMeshLine(points3, '#00CCFFFF');
        }
    });
    map.addLayer(thingLayer);
});

/**
  * 创建GeoBuilding
  */
function createBuilding(building, name) {
    building.map(item => {
        var coordinates = item.geometry.coordinates;
        var height = item.properties.height;
        var building = app.create({
            type: "GeoBuilding",
            name: name,
            coordinates, // 支持Polygon和MultiPolygon,格式可参考geoJson规范
            height: height,
            renderer: {
                type: 'vector',
                color: [61, 63, 70],// 面填充颜色
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
        var geoLine = app.create({
            type: 'GeoLine',
            name: color,
            coordinates: [item.geometry.coordinates, item.geometry.coordinates],
            heightArray: [0, height * 0.1],
            // userData: { 'name': '花家地南街' },
            renderer: {
                type: 'vector', //GeoLine渲染类型 支持纯色(vector)和贴图(image)两种模式
                lineType: 'Line', //可以是Line Plane Pipe Route
                // imageUrl: 'https://www.thingjs.com/citybuilder_console/upload/lineIcons/3d/lightFlow_strip05.png',//线的贴图url, type是image时生效
                // color: [255, 255, 255], //线的颜色, type是vector时生效
                colorMapping: {
                    0: "#00000000",
                    0.7: "#33333300",
                    0.8: "#333333FF",
                    1: color,
                },
                // effect: true, //是否开启发光特效
                // width: 10, //只在线类型为Plane,Pipe下生效,代表线的宽度
                // numPass: 0.5, // 通道数,在贴图时贴图叠加的次数,次数越多颜色越亮,type是image时生效
                speed: 0.4,  //线贴图流动速度,默认是0,不流动 speed可以大于0也可以小于0，代表流动方向
                // growSpeed: 0.4,  //线生长速度,默认是0,不生长，lineType是Line,Plane时生效
                // growLoop: true  //线生长是否循环，默认是true，lineType是Line,Plane时生效
            }
        });
        thingLayer.add(geoLine);
    })
}

// 创建提示
initThingJsTip(`通过创建GeoLine（地理线）添加烟花图效果`);