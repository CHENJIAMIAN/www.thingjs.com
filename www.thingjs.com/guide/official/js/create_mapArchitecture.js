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
var buildingLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(buildingLayer);

// 飞到地理位置和高度
app.camera.earthFlyTo({
	lonlat: [116.4488, 39.9187],
	height: 3000,
	time: 2000,
	complete: function () {
		createBuilding()
	}
});
var createBuilding = function () {
	$.ajax({
		type: 'GET',
		url: 'https://www.thingjs.com/uearth/uGeo/chaoyang_building.geojson',
		dataType: 'json',
		success: function (data) {
			createBuildings(data);
		}
	});
};

function createBuildings(data) {
	var cnt = data.features.length;
	console.log('共 ' + cnt + '个建筑');

	for (var i = 0; i < cnt; i += 1) {
		var feature = data.features[i];

		var building = new THING.EARTH.GeoBuilding({
			name: 'build' + i,
			coordinates: feature.geometry.coordinates,
			userData: feature.properties,
			height: feature.properties.height,
			style: {
				url: ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'], // 楼宇顶部贴图和侧边贴图
				blending: true // 贴图叠加混合
			}
		});
		buildingLayer.add(building);
	}
}

app.on('click', '.GeoBuilding', function (ev) {
	var obj = ev.object;
	var height = obj.userData.height;
	var district = obj.userData.district;

	console.log('建筑高度 ' + height + 'm 所属街道 ' + district);
})

