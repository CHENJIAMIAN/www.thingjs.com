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
	lonlat: [116.38541042804717, 39.90609864611045],
	height: 1000,
});

// 创建一个 ThingLayer
var thingLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(thingLayer);
const lineUrl = 'https://www.thingjs.com/guide/image/uGeo/path.png';
new THING.widget.Button("像素线", function () {
	var geoLine = thingLayer.query("像素线")[0];
	if (!geoLine) {
		geoLine = new THING.EARTH.GeoLine({
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
				color: [1, 0, 0]
			},
		});
		thingLayer.add(geoLine); // 添加到ThingLayer中
	}
	else {
		geoLine.visible = !geoLine.visible;
	}
});
new THING.widget.Button("像素线（贴图）", function () {
	var geoLine = thingLayer.query("像素线带贴图")[0];
	if (!geoLine) {
		geoLine = new THING.EARTH.GeoLine({
			name: "像素线带贴图",
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
				url: lineUrl,
				speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
				// effect: true // 线发光效果 默认为 false 不开启
			},
		});
		thingLayer.add(geoLine); // 添加到ThingLayer中
	}
	else {
		geoLine.visible = !geoLine.visible;
	}
});
new THING.widget.Button("管状线", function () {
	var geoLine = thingLayer.query("管状线")[0];
	if (!geoLine) {
		geoLine = new THING.EARTH.GeoLine({
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
			style: {
				lineType: THING.EARTH.GeoLineType.Pipe,
				color: [0, 0, 1],
				width: 10, // 设置管线半径 单位米
				// opacity: 0.2, // 设置不透明度 默认是1
				// effect: true // 线发光效果 默认为 false 不开启
			},
		});
		thingLayer.add(geoLine); // 添加到ThingLayer中
	}
	else {
		geoLine.visible = !geoLine.visible;
	}
});
new THING.widget.Button("管状线（贴图）", function () {
	var geoLine = thingLayer.query("管状线带贴图")[0];
	if (!geoLine) {
		geoLine = new THING.EARTH.GeoLine({
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
				url: lineUrl,
				width: 10, // 设置管线半径 单位米
				speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
				// effect: true // 线发光效果 默认为 false 不开启
			},
		});
		thingLayer.add(geoLine); // 添加到ThingLayer中
	}
	else {
		geoLine.visible = !geoLine.visible;
	}
});
new THING.widget.Button("片状线", function () {
	var geoLine = thingLayer.query("片状线")[0];
	if (!geoLine) {
		geoLine = new THING.EARTH.GeoLine({
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
			style: {
				lineType: THING.EARTH.GeoLineType.Plane,
				color: [0, 1, 0],
				width: 10, // 设置线宽 单位像素
				// opacity: 0.2,// 设置不透明度 默认是1
			},
		});
		thingLayer.add(geoLine); // 添加到ThingLayer中
	}
	else {
		geoLine.visible = !geoLine.visible;
	}
});
new THING.widget.Button("片状线（贴图）", function () {
	var geoLine = thingLayer.query("片状线带贴图")[0];
	if (!geoLine) {
		geoLine = new THING.EARTH.GeoLine({
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
				url: lineUrl,
				width: 10, // 设置线宽 单位像素
				speed: 0.5, // 流动效果速度， 默认是0 不流动；speed 可正可负，正负代表流动方向
				// effect: true // 线发光效果 默认为 false 不开启
			},
		});
		thingLayer.add(geoLine); // 添加到ThingLayer中
	}
	else {
		geoLine.visible = !geoLine.visible;
	}
});

new THING.widget.Button("开启/关闭 发光", function () {
	var lines = thingLayer.children;
	var cnt = lines.length;
	for (var i = 0; i < cnt; i++) {
		var line = lines[i];
		line.style.effect = !line.style.effect;
	}
});	
