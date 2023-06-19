/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 */
// 创建一个地图
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
// 摄影机飞到特定位置和角度
app.camera.earthFlyTo({
	time: 2000,
	lonlat: [116.4424, 39.9201],
	height: 5000,
	complete: function () {
		addLayer();
	},
});
function addLayer() {
	new THING.widget.Button("创建点图层", function () {
		var pointLayer = app.query("pointLayer")[0];
		if (!pointLayer) {
			$.ajax({
				type: "GET",
				url: "https://www.thingjs.com/uearth/uGeo/sample_point.geojson",
				dataType: "json",
				success: function (data) {
					pointLayer = new THING.EARTH.FeatureLayer({
						name: "pointLayer",
						dataSource: data,
						geoObjectType: "GeoPoint",
						style: {
							pointType: THING.EARTH.SymbolType.Image, // image代表创建图片类型的点
							url: "https://www.thingjs.com/static/image/train_station.png", // 图片的url
							size: 5, // 尺寸
						},
					});
					map.addLayer(pointLayer);
					pointLayer.on("click", function (e) {
						// e.object可以获取到点击到的对象
						console.log(e.object.userData.NAME);
					});
					new THING.widget.Button("整体修改尺寸", function () {
						if (pointLayer.style.size === 5) {
							pointLayer.style.size = 10;
						}
						else {
							pointLayer.style.size = 5;
						}
					});
					new THING.widget.Button("修改单个尺寸", function () {
						// 通过FeatureLayer实例的getItems()方法可以获取到图层中的所有对象
						if (pointLayer.getItems()[0].style.size === 5) {
							pointLayer.getItems()[0].style.size = 10;
						}
						else {
							pointLayer.getItems()[0].style.size = 5;
						}
					});
					new THING.widget.Button("整体修改图片", function () {
						if (pointLayer.style.pointType === THING.EARTH.SymbolType.Image) {
							if (
								pointLayer.style.url === "https://www.thingjs.com/static/image/train_station.png"
							) {
								pointLayer.style.url = "https://www.thingjs.com/static/image/uGeo/pop.png";
							}
							else {
								pointLayer.style.url = "https://www.thingjs.com/static/image/train_station.png";
							}
						}
						else {
							console.log("image类型才可以修改图片url");
						}
					});
					new THING.widget.Button("整体修改类型", function () {
						if (pointLayer.style.pointType === THING.EARTH.SymbolType.Image) {
							// 设置矢量渲染方式,默认填充色为白色,这里设置成红色
							pointLayer.style.color = [1, 0, 0];
							pointLayer.style.pointType = THING.EARTH.SymbolType.Vector;
						}
						else {
							pointLayer.style.color = [1, 1, 1];// 使用贴图 叠加色改为白色则可展示贴图本身的颜色
							pointLayer.style.pointType = THING.EARTH.SymbolType.Image;
						}
					});
					new THING.widget.Button("整体修改填充颜色", function () {
						// 得到的color都是16进制的格式
						if (!THING.Utils.equalsColor(pointLayer.style.color, [1, 0, 0])) {
							pointLayer.style.color = [1, 0, 0];
						}
						else {
							pointLayer.style.color = [1, 1, 1];
						}
					});
					new THING.widget.Button("整体修改边框颜色", function () {
						if (pointLayer.style.pointType === THING.EARTH.SymbolType.Vector) {
							// 得到的color都是16进制的格式
							if (!THING.Utils.equalsColor(pointLayer.style.lineColor, [0, 0, 1])) {
								pointLayer.style.lineColor = [0, 0, 1];
							}
							else {
								pointLayer.style.lineColor = [0, 1, 0];
							}
						}
						else {
							console.log("vector类型才可以修改边框颜色");
						}
					});
					new THING.widget.Button("整体修改形状", function () {
						if (pointLayer.style.pointType === THING.EARTH.SymbolType.Vector) {
							// vectorType 支持circle 圆形 triangle 三角形 rectangle 方形 cross 十字
							if (pointLayer.style.vectorType === THING.EARTH.VectorType.Circle) {
								pointLayer.style.vectorType = THING.EARTH.VectorType.Triangle;
							}
							else {
								pointLayer.style.vectorType = THING.EARTH.VectorType.Circle;
							}
						}
						else {
							console.log("vector类型才可以修改边框颜色");
						}
					});
					new THING.widget.Button("旋转点", function () {
						if (pointLayer.style.rotateSpeed === 0) {
							pointLayer.style.rotateSpeed = 0.5;
						}
						else {
							pointLayer.style.rotateSpeed = 0;
						}
					});
					new THING.widget.Button("点标注", function () {
						if (!pointLayer.label) {
							pointLayer.label = {
								text: "{{NAME}}",
								style: {
									offset: [0, 20],
									fontColor: [1, 1, 1],
									fontSize: 10,
								}
							};
						}
						else {
							pointLayer.label.visible = !pointLayer.label.visible;
						}
					});
					new THING.widget.Button("整体抬高", function () {
						if (pointLayer.offsetHeight === 0) {
							pointLayer.offsetHeight = 100;
						}
						else {
							pointLayer.offsetHeight = 0;
						}
					});
				},
			});
		}
		else {
			pointLayer.visible = !pointLayer.visible;
		}
	});
}
