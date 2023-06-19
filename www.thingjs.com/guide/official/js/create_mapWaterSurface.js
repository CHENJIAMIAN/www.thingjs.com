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
var waterLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(waterLayer);

// 飞到地理位置和高度
app.camera.earthFlyTo({
	lonlat: [116.38778377765706, 39.9160429810813],
	height: 2000,
	time: 2000,
	complete: function () {
		createWater()
	}
});
var createWater = function () {
	$.ajax({
		type: 'GET',
		url: 'https://www.thingjs.com/uearth/res/water.geojson',
		dataType: 'json',
		success: function (data) {
			createWaters(data);
		}
	});
};

function createWaters(data) {
	var cnt = data.features.length;
	console.log('共 ' + cnt + '个水面');

	for (var i = 0; i < cnt; i += 1) {
		var feature = data.features[i];

		var water = new THING.EARTH.GeoWater({
			name: 'water' + i,
			coordinates: feature.geometry.coordinates,
			userData: feature.properties,
			style: {
				color: [0, 0.1, 0.5],
				opacity: 1,
				normalMap: {
					url: 'https://www.thingjs.com/uearth/res/waternormals.jpg',
					speed: [1, 0]
				},
				envMap: {
					url: ['https://www.thingjs.com/uearth/res/BlueSky/posx.jpg',
						'https://www.thingjs.com/uearth/res/BlueSky/negx.jpg',
						'https://www.thingjs.com/uearth/res/BlueSky/posy.jpg',
						'https://www.thingjs.com/uearth/res/BlueSky/negy.jpg',
						'https://www.thingjs.com/uearth/res/BlueSky/posz.jpg',
						'https://www.thingjs.com/uearth/res/BlueSky/negz.jpg'],
					intensity: 1.0,
				},
				waveAmplitude: 1.0,
				twistAmplitude: 1.0
			},
		});
		waterLayer.add(water);
	}
	app.on('click', '.GeoWater', function (ev) {
		var obj = ev.object;

		console.log('水面id ' + obj.userData.id);
	});
}	
