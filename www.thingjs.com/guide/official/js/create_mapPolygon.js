/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例展示了创建不同样式的 GeoPolygon
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
// 将瓦片图添加到底图图层中
map.addLayer(tileLayer1);

app.camera.earthFlyTo({
	lonlat: [116.3902759552002, 39.92428465665397],
	height: 2000,
});

// 创建一个 ThingLayer
var thingLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(thingLayer);

new THING.widget.Button("纯色填充", function () {
	var geoPolygon = thingLayer.query("多边形_纯色")[0];
	if (!geoPolygon) {
		geoPolygon = new THING.EARTH.GeoPolygon({
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
				color: [0, 1, 0], // 面填充颜色
				opacity: 0.8, // 填充不透明度
				outline: {
					color: [1, 1, 0], // 边框色
					width: 2, // 边框宽度
				}
			},
		});
		thingLayer.add(geoPolygon);
	}
	else {
		geoPolygon.visible = !geoPolygon.visible;
	}
});

new THING.widget.Button("贴图填充", function () {
	var geoPolygon = thingLayer.query("多边形_贴图")[0];
	if (!geoPolygon) {
		geoPolygon = new THING.EARTH.GeoPolygon({
			name: "多边形_贴图",
			coordinates: [
				[
					[116.39652013778687, 39.921882076026726],
					[116.40259265899658, 39.921882076026726],
					[116.40259265899658, 39.92695043511577],
					[116.39652013778687, 39.92695043511577],
					[116.39652013778687, 39.921882076026726],
				],
			], // 支持Polygon和MultiPolygon,格式可参考geoJson规范
			style: {
				url: "https://www.thingjs.com/static/images/blue.png",
				outline: {
					color: [1, 1, 0], // 边框色
					width: 2, // 边框宽度
				}
			},
		});
		thingLayer.add(geoPolygon);
	}
	else {
		geoPolygon.visible = !geoPolygon.visible;
	}
});
new THING.widget.Button('根据extrudeHeight', function () {
	var geoPolygon = thingLayer.query('多边形01')[0];
	if (!geoPolygon) {
		geoPolygon = new THING.EARTH.GeoPolygon({
			name: '多边形01',
			extrudeHeight: 100,
			coordinates: [[
				[116.38774394989012, 39.936703608137295],
				[116.38801217079163, 39.931997270172746],
				[116.39319419860838, 39.93214537664713],
				[116.3927972316742, 39.93680233903546],
				[116.38774394989012, 39.936703608137295]
			]], // 支持Polygon和MultiPolygon,格式可参考geoJson规范
			style: {
				color: [1, 0, 0], // 面填充颜色
				opacity: 0.8, // 填充不透明度
				outline: {
					color: [1, 1, 0], // 边框色
					width: 2, // 边框宽度
				}
			}
		});
		thingLayer.add(geoPolygon);
	}
	else {
		geoPolygon.visible = !geoPolygon.visible;
	}
});

new THING.widget.Button('根据userData字段', function () {
	var geoPolygon = thingLayer.query('多边形02')[0];
	if (!geoPolygon) {
		geoPolygon = new THING.EARTH.GeoPolygon({
			name: '多边形02',
			userData: { '高度': 150 },
			coordinates: [[
				[116.39652013778687, 39.931882076026726],
				[116.40259265899658, 39.931882076026726],
				[116.40259265899658, 39.93695043511577],
				[116.39652013778687, 39.93695043511577],
				[116.39652013778687, 39.931882076026726]
			]], // 支持Polygon和MultiPolygon,格式可参考geoJson规范
			style: {
				color: [1, 0, 0], // 面填充颜色
				opacity: 0.8, // 填充不透明度
				outline: {
					color: [1, 1, 0], // 边框色
					width: 2, // 边框宽度
				},
				extrudeField: '高度'
			}
		});
		thingLayer.add(geoPolygon);
	}
	else {
		geoPolygon.visible = !geoPolygon.visible;
	}
});


new THING.widget.Button('拔高倍数', function () {
	var geoPolygon = thingLayer.query('多边形03')[0];
	if (!geoPolygon) {
		geoPolygon = new THING.EARTH.GeoPolygon({
			name: '多边形03',
			coordinates: [[
				[116.39495780181885, 39.91080942453449],
				[116.40068700027466, 39.91080942453449],
				[116.40068700027466, 39.91587823312308],
				[116.39495780181885, 39.91587823312308],
				[116.39495780181885, 39.91080942453449]
			]], // 支持Polygon和MultiPolygon,格式可参考geoJson规范
			userData: { '高度': 150 },
			style: {
				color: [1, 0, 0], // 面填充颜色
				opacity: 0.8, // 填充不透明度
				outline: {
					color: [1, 1, 0], // 边框色
					width: 2, // 边框宽度
				},
				extrudeField: '高度', // 设置拔高字段
				extrudeFactor: 2 // 设置高度拔高倍数 默认是1
			}
		});
		thingLayer.add(geoPolygon);
	}
	else {
		geoPolygon.visible = !geoPolygon.visible;
	}
});	