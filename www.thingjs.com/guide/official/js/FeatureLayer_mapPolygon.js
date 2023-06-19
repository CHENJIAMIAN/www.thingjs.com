/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例介绍了多边形FeatureLayer的使用方法
 * 示例中所有整体修改的参数均可以在单个物体身上修改,出于篇幅考虑只写了一个
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
app.camera.earthFlyTo(
	{
		'time': 2000,
		'lonlat': [116.6861, 39.5734],
		'height': 200000,
		complete: function () {
			addLayer();
		}
	}
);
function addLayer() {
	new THING.widget.Button('创建面图层', function () {
		var polygonLayer = app.query('polygonLayer')[0];
		if (!polygonLayer) {
			$.ajax({
				type: 'GET',
				url: 'https://www.thingjs.com/uearth/uGeo/boundary.geojson',
				dataType: 'json',
				success: function (data) {
					polygonLayer = new THING.EARTH.FeatureLayer({
						name: 'polygonLayer',
						dataSource: data,
						geoObjectType: 'GeoPolygon',
						extrudeHeight: 10000, // 拔起的高度 单位米
						style:
							{
								opacity: 0.3, // 透明度
								url: ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building_top.png'],
								outline: {
									width: 2, // 边框宽度
									color: [1, 0.25, 0.15] // 边框色
								}
							}
					});
					map.addLayer(polygonLayer);
					polygonLayer.on('click', function (e) {
						// e.object可以获取到点击到的对象
						console.log(e.object.userData.name);
					});
					new THING.widget.Button('整体修改边线宽度', function () {
						if (polygonLayer.style.outline.width === 2) {
							polygonLayer.style.outline.width = 5;
						}
						else {
							polygonLayer.style.outline.width = 2;
						}
					});
					new THING.widget.Button('修改单个线宽度', function () {
						// 通过FeatureLayer实例的getItems()属性可以获取到图层中的所有对象
						if (polygonLayer.getItems()[0].style.outline.width === 2) {
							polygonLayer.getItems()[0].style.outline.width = 5;
						}
						else {
							polygonLayer.getItems()[0].style.outline.width = 2;
						}
					});

					new THING.widget.Button('整体修改贴图', function () {
						if (polygonLayer.style.url && polygonLayer.style.url[0] !== 'https://www.thingjs.com/uearth/uGeo/building_top.png') {
							polygonLayer.style.url = ['https://www.thingjs.com/uearth/uGeo/building_top.png'];
						}
						else {
							polygonLayer.style.url = ['https://www.thingjs.com/uearth/uGeo/building.png'];
						}
					});
					new THING.widget.Button('纯色渲染', function () {
						polygonLayer.style.url = null;// 去掉贴图效果
						polygonLayer.style.gradient = null;// 去掉渐变色效果
					});
					new THING.widget.Button('渐变色渲染', function () {
						if (!polygonLayer.style.gradient) {
							polygonLayer.style.gradient = { 0: 'rgb(255, 0, 0)', 0.5: 'rgb(0, 255, 0)', 1: 'rgb( 0, 0, 255)' };// 渐变色的色带 多边形设置渐变色 影响侧面
						}
						else {
							polygonLayer.style.gradient = null; // 取消渐变色
						}
					});
					new THING.widget.Button('整体修改填充颜色', function () {
						if (!THING.Utils.equalsColor(polygonLayer.style.color, [0, 1, 0])) {
							polygonLayer.style.color = [0, 1, 0];
						}
						else {
							polygonLayer.style.color = [1, 1, 1];
						}
					});
					new THING.widget.Button('整体修改边框发光', function () {
						polygonLayer.style.outline.effect = !polygonLayer.style.outline.effect;
					});
					new THING.widget.Button('整体修改边框颜色', function () {
						if (!THING.Utils.equalsColor(polygonLayer.style.outline.color, [0, 1, 0])) {
							// 得到的color都是16进制的格式
							polygonLayer.style.outline.color = [0, 1, 0];
						}
						else {
							polygonLayer.style.outline.color = [1, 0.25, 0.15];
						}
					});
					new THING.widget.Button('整体修改高度', function () {
						// 修改图层中所有对象的拉伸高度
						if (polygonLayer.extrudeHeight === 10000) {
							polygonLayer.extrudeHeight = 5000;
						}
						else {
							polygonLayer.extrudeHeight = 10000;
						}
					});
					new THING.widget.Button('整体抬高', function () {
						if (polygonLayer.offsetHeight === 0) {
							polygonLayer.offsetHeight = 10000;
						}
						else {
							polygonLayer.offsetHeight = 0;
						}
					});
				}
			});
		}
		else {
			polygonLayer.visible = !polygonLayer.visible;
		}
	});
}
