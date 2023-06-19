/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：该示例将䄦在地球上使用热力图
 */
var app = new THING.App();
app.background = [0, 0, 0];

var map = new THING.EARTH.Map({
	attribution: "高德",
});
// 创建一个瓦片图层
var tileLayer1 = new THING.EARTH.TileLayer({
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}"
});
// 将瓦片图添加到底图图层中
map.addLayer(tileLayer1);
drawGeoHeatMap();

var gradientObj = {
	'常规': {
		0: "rgb(0,0,255)",
		0.33: "rgb(0,255,0)",
		0.66: "rgb(255,255,0)",
		1.0: "rgb(255,0,0)",
	},
	'黄色': {
		0: "rgb(255,237,160)",
		0.33: "rgb(254,217,118)",
		0.66: "rgb(227,26,28)",
		1.0: "rgb(189,0,38)",
	},
	'蓝色': {
		0: "rgb(8,104,172)",
		0.33: "rgb(67,162,202)",
		0.66: "rgb(100,200,200)",
		1.0: "rgb(186,228,188)",
	},
};
var panel = new THING.widget.Panel({
	titleText: "热力图设置",
	hasTitle: true,
	width: 250,
});
var config = {
	mosaic: false,
	needsUpdate: true,
	mosaicSize: 5,
	radius: 20,
	opacity: 0.8,
	gradient: "常规",
};
panel.addBoolean(config, "mosaic")
	.caption("开启马赛克")
	.onChange((v) => {
		app.query(".HeatmapLayer")[0].style.mosaic = v;
	});
panel.addNumberSlider(config, "mosaicSize")
	.caption("马赛克尺寸")
	.min(1)
	.max(20)
	.isChangeValue(true)
	.on("change", function (v) {
		app.query(".HeatmapLayer")[0].style.mosaicSize = v;
	});
panel.addBoolean(config, "needsUpdate")
	.caption("随相机变化更新")
	.onChange((v) => {
		app.query(".HeatmapLayer")[0].needsUpdate = v;
	});
panel.addNumberSlider(config, "radius")
	.caption("热度半径")
	.min(1)
	.max(50)
	.isChangeValue(true)
	.on("change", function (v) {
		app.query(".HeatmapLayer")[0].style.radius = v;
	});
panel.addNumberSlider(config, "opacity")
	.caption("透明度")
	.step(0.01)
	.min(0)
	.max(1.0)
	.isChangeValue(true)
	.on("change", function (v) {
		app.query(".HeatmapLayer")[0].style.opacity = v;
	});
panel
	.addRadio(config, "gradient", ["常规", "黄色", "蓝色"])
	.on("change", function (v) {
		app.query(".HeatmapLayer")[0].style.gradient = gradientObj[v];
	});
// 创建热力图 数据源的格式与FeatureLayer相同
// valueField代表用来生成热力图使用的权重字段,不传的话所有点的权重相同,如果传则从数据的properties中读取该字段的值作为权重值
function drawGeoHeatMap() {
	$.ajax({
		type: "GET",
		url: "https://www.thingjs.com/uearth/res/beijing-POIs-3211.geojson",
		dataType: "json",
		success: function (data) {
			app.camera.earthFlyTo({
				time: 2000,
				lonlat: [116.44474497103292, 39.9118522313402],
				height: 5000,
				pitch: 80,
				complete: function () {
					var layer = new THING.EARTH.HeatmapLayer({
						dataSource: data, // 数据源 geojson格式
						needsUpdate: config.needsUpdate, // 是否随相机的变化重新绘制热力图
						style: {
							radius: config.radius, // 影响半径
							minOpacity: config.minOpacity, // 最小值的透明度
							maxOpacity: config.maxOpacity, // 最大值的透明度
							mosaic: config.mosaic, // 是否使用马赛克效果
							mosaicSize: config.mosaicSize, // 马赛克效果的像素值
							gradient: gradientObj[config.gradient], // 色带
						},
					});
					map.addLayer(layer);
				},
			});
		},
	});
}