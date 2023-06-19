/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例展示了创建不同样式的 GeoLine
 */
var app = new THING.App();
app.background = [0, 0, 0];
 
var map = new THING.EARTH.Map({
	attribution: "高德",
});
// 创建一个瓦片图层
var tileLayer1 = new THING.EARTH.TileLayer({
	name: "卫星影像图层",
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
	style: {
		template: THING.EARTH.TileLayerEffect.DarkBlue
	}
});
map.addLayer(tileLayer1);

app.camera.earthFlyTo({
	lonlat: [116.60015785684203, 33.083817045851475],
	height: 2515441.253252523,
	pitch: 82
});

// 创建一个 ThingLayer
var thingLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(thingLayer);
const lineUrl = 'https://www.thingjs.com/guide/image/uGeo/path.png';
var startPos = [116.39139175415039, 39.906082185995366];
new THING.widget.Button('像素线', function () {
	var geoFlyLine = thingLayer.query('北京-济南')[0];
	if (!geoFlyLine) {
		geoFlyLine = new THING.EARTH.GeoFlyLine({
			name: '北京-济南',
			coordinates: [
				startPos,
				[117.1142578125, 36.63316209558658]
			],
			style: {
				lineType: THING.EARTH.GeoLineType.Line,
				color: [1, 0, 0]
			}
		});
		thingLayer.add(geoFlyLine);// 添加到ThingLayer中
	}
	else {
		geoFlyLine.visible = !geoFlyLine.visible;
	}
});
new THING.widget.Button('像素线（贴图）', function () {
	var geoFlyLine = thingLayer.query('北京-南京')[0];
	if (!geoFlyLine) {
		geoFlyLine = new THING.EARTH.GeoFlyLine({
			name: '北京-南京',
			coordinates: [
				startPos,
				[118.76220703125001, 32.045332838858506]
			],
			style: {
				lineType: THING.EARTH.GeoLineType.Line,
				url: lineUrl,
				speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
				// effect: true // 线发光效果 默认为 false 不开启
			}
		});
		thingLayer.add(geoFlyLine);// 添加到ThingLayer中
	}
	else {
		geoFlyLine.visible = !geoFlyLine.visible;
	}
});
new THING.widget.Button('管状线', function () {
	var geoFlyLine = thingLayer.query('北京-杭州')[0];
	if (!geoFlyLine) {
		geoFlyLine = new THING.EARTH.GeoFlyLine({
			name: '北京-杭州',
			coordinates: [
				startPos,
				[120.21240234375001, 30.240086360983426]
			],
			style: {
				lineType: THING.EARTH.GeoLineType.Pipe,
				color: [1, 0, 0],
				width: 1000, // 设置管线半径 单位米
				// opacity:0.2 , // 设置不透明度 默认是1
				// effect: true // 线发光效果 默认为 false 不开启
			}
		});
		thingLayer.add(geoFlyLine);// 添加到ThingLayer中
	}
	else {
		geoFlyLine.visible = !geoFlyLine.visible;
	}
});
new THING.widget.Button('管状线（贴图）', function () {
	var geoFlyLine = thingLayer.query('北京-武汉')[0];
	if (!geoFlyLine) {
		geoFlyLine = new THING.EARTH.GeoFlyLine({
			name: '北京-武汉',
			coordinates: [
				startPos,
				[114.345703125, 30.56226095049944]
			],
			style: {
				lineType: THING.EARTH.GeoLineType.Pipe,
				url: lineUrl,
				speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
				// effect: true // 线发光效果 默认为 false 不开启
			}
		});
		thingLayer.add(geoFlyLine);// 添加到ThingLayer中
	}
	else {
		geoFlyLine.visible = !geoFlyLine.visible;
	}
});
new THING.widget.Button('片状线', function () {
	var geoFlyLine = thingLayer.query('北京-郑州')[0];
	if (!geoFlyLine) {
		geoFlyLine = new THING.EARTH.GeoFlyLine({
			name: '北京-郑州',
			coordinates: [
				startPos,
				[113.66455078125, 34.74161249883172]
			],
			style: {
				lineType: THING.EARTH.GeoLineType.Plane,
				color: [1, 0, 0],
				width: 2, // 设置线宽 单位像素
				// opacity: 0.2,// 设置不透明度 默认是1
				// effect: true // 线发光效果 默认为 false 不开启
			}
		});
		thingLayer.add(geoFlyLine);// 添加到ThingLayer中
	}
	else {
		geoFlyLine.visible = !geoFlyLine.visible;
	}
});
new THING.widget.Button('片状线（贴图）', function () {
	var geoFlyLine = thingLayer.query('片状线带贴图')[0];
	if (!geoFlyLine) {
		geoFlyLine = new THING.EARTH.GeoFlyLine({
			name: '片状线带贴图',
			coordinates: [
				startPos,
				[104.04052734375, 30.600093873550072]
			],
			style: {
				lineType: THING.EARTH.GeoLineType.Plane,
				url: lineUrl,
				width: 2, // 设置线宽 单位像素
				speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
				// effect: true // 线发光效果 默认为 false 不开启
			}
		});
		thingLayer.add(geoFlyLine);// 添加到ThingLayer中
	}
	else {
		geoFlyLine.visible = !geoFlyLine.visible;
	}
});

new THING.widget.Button('开启/关闭 发光', function () {
	var lines = thingLayer.children;
	var cnt = lines.length;
	for (var i = 0; i < cnt; i++) {
		var line = lines[i];
		line.style.effect = !line.style.effect;
	}
})		
