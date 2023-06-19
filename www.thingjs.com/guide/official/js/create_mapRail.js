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
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
});
// 将瓦片图添加到底图图层中
map.addLayer(tileLayer1);

app.camera.earthFlyTo({
	lonlat: [116.3902759552002, 39.92428465665397],
	height: 2000,
});

// 创建一个 ThingLayer
var boundaryLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(boundaryLayer);

// 飞到地理位置和高度
app.camera.earthFlyTo({
	lonlat: [116.38778377765706, 39.9160429810813],
	height: 275873,
	time: 2000,
	complete: function () {
		createBoundary()
	}
});
var createBoundary = function () {
	$.ajax({
		type: 'GET',
		url: 'https://www.thingjs.com/uearth/uGeo/boundary.geojson',
		dataType: 'json',
		success: function (data) {
			createBoundaries(data);
		}
	});
};

function createBoundaries(data) {
	var cnt = data.features.length;
	console.log('共 ' + cnt + '个围栏');

	for (var i = 0; i < cnt; i += 1) {
		var feature = data.features[i];
		// 创建围栏对象
		var boundary = new THING.EARTH.GeoBoundary({
			name: 'boundary' + i,
			coordinates: feature.geometry.coordinates, // 传入围栏坐标
			userData: feature.properties,
			extrudeHeight: 10000, // 围栏拔起高度为10000米
			style: {
				opacity: 0.7, // 围栏透明度0.7
				alphaMap: {
					url: 'https://www.thingjs.com/uearth/res/uvMap71.png', // 设置围栏的透明贴图
					speed: [1, 0] // 透明贴图的流动速度 x方向为1 y方向为0
				},
				url: 'https://www.thingjs.com/uearth/uGeo/building.png', // 设置围栏的贴图
				speed: [0, 1]  // 围栏贴图的流动速度 x方向为0 y方向为1 向上流动
			},
		});
		boundaryLayer.add(boundary);
	}
	app.on('click', '.GeoBoundary', function (ev) {
		var obj = ev.object;

		console.log('围栏name ' + obj.userData.name);
	});
}	
