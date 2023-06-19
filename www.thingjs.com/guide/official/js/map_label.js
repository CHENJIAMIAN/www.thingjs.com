/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 */

/** 创建应用 */
var app = new THING.App({});
      
/** 创建地球 */
var map = new THING.EARTH.Map({
	// TODO: Add custom initial parameters.
});

/** 创建影像图层 */
var tileLayer = new THING.EARTH.TileLayer({
	name: "tileLayer",
	url: "http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}",
	maximumLevel: 18
});
map.baseLayers.add(tileLayer);

var pointLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});

function createMarker() {
	$.ajax({
		type: "GET",
		url: "https://www.thingjs.com/uearth/res/testPoint.geojson",
		dataType: "json",
		success: function (data) {
			for (var i = 0; i < data.features.length; i += 1) {
				var geoPoint = new THING.EARTH.GeoPoint({
					coordinates: data.features[i].geometry.coordinates,
					name: "geoPoint" + i,
					userData: data.features[i].properties,
					style: {
						pointType: THING.EARTH.SymbolType.Image,
						url: "https://www.thingjs.com/static/image/uGeo/pop.png",
						size: 5,
					},
					// 设置Label
					label: {
						text: "{{NAME}}", // 标注内容为userData上NAME字段的属性值
						pivot: [0.5, 0], // 轴心点 下中
						style: {
							offset: [0, 50], // 设置向上偏移 使Label与GeoPoint的图片不重叠
							fontColor: [1, 0, 0], // 标注颜色
							fontSize: 12, // 字号
							dropShadow: true, // 使用阴影效果
							dropShadowColor: [0, 0, 0] // 设置阴影颜色
						}
					}
				});
				pointLayer.add(geoPoint);
			}
		}
	});
	map.addLayer(pointLayer);
}

app.camera.earthFlyTo({
	lonlat: [116.45857189724276, 39.977635606171894],
	height: 3999.615531087853,
	heading: -2.1394086924036437,
	pitch: 41.07112571777157,
	time: 30,
	complete: function () {
		createMarker();
	},
});
