/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例介绍了建筑FeatureLayer的使用方法
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
		lonlat: [116.4488, 39.9187],
		height: 3000,
		complete: function () {
			addLayer();
		}
	}
);
function addLayer() {
	new THING.widget.Button('创建建筑图层', function () {
		var buildingLayer = app.query('buildingLayer')[0];
		if (!buildingLayer) {
			$.ajax({
				type: 'GET',
				url: 'https://www.thingjs.com/uearth/uGeo/chaoyang_building.geojson',
				dataType: 'json',
				success: function (data) {
					buildingLayer = new THING.EARTH.FeatureLayer({
						name: 'buildingLayer',
						dataSource: data,
						geoObjectType: 'GeoBuilding',
						extrudeField: 'height',
						style: {
							url: ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'], // 楼宇顶部贴图和侧边贴图
							textureWrap: THING.EARTH.TextureWrapMode.Stretch // 贴图循环方式为拉伸
						}
					});
					// 图层添加到Map
					map.addLayer(buildingLayer);
					// 图层添加点击事件
					buildingLayer.on('click', function (e) {
						// e.object可以获取到点击到的对象
						console.log(e.object.userData.height);
					});
					new THING.widget.Button('整体修改拉伸倍数', function () {
						if (buildingLayer.extrudeFactor === 1) {
							buildingLayer.extrudeFactor = 2;
						}
						else {
							buildingLayer.extrudeFactor = 1;
						}
					});
					new THING.widget.Button('单个修改拉伸倍数', function () {
						// 通过FeatureLayer实例的getItems()属性可以获取到图层中的所有对象
						if (buildingLayer.getItems()[0].extrudeFactor === 1) {
							buildingLayer.getItems()[0].extrudeFactor = 10;
						}
						else {
							buildingLayer.getItems()[0].extrudeFactor = 1;
						}
					});
					new THING.widget.Button('整体修改拉伸高度', function () {
						buildingLayer.extrudeHeight = 100;
					});
					new THING.widget.Button('整体修改贴图方式', function () {
						// THING.EARTH.TextureWrapMode.Stretch 拉伸 THING.EARTH.TextureWrapMode.RepeatY y轴(上下方向)平铺
						if (buildingLayer.style.textureWrap === THING.EARTH.TextureWrapMode.Stretch) {
							buildingLayer.style.textureWrap = THING.EARTH.TextureWrapMode.RepeatY;
						}
						else {
							buildingLayer.style.textureWrap = THING.EARTH.TextureWrapMode.Stretch;
						}
					});
					new THING.widget.Button('整体修改贴图', function () {
						// 贴图可以是两个元素的数组 分别代表顶面和侧面的贴图 也可以是一个元素的数组 顶面和侧面都使用这一个贴图
						if (buildingLayer.style.url && buildingLayer.style.url.toString() === ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'].toString()) {
							buildingLayer.style.url = ['https://www.thingjs.com/uearth/uGeo/building.png', 'https://www.thingjs.com/uearth/uGeo/building_top.png'];
						}
						else {
							buildingLayer.style.url = ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'];
						}
					});
					new THING.widget.Button('纯色渲染', function () {
						buildingLayer.style.url = null;// 去掉贴图效果
						buildingLayer.style.gradient = null;// 去掉渐变色效果
					});
					new THING.widget.Button('渐变色渲染', function () {
						if (!buildingLayer.style.gradient) {
							buildingLayer.style.gradient = { 0: 'rgb(255, 0, 0)', 0.5: 'rgb(0, 255, 0)', 1: 'rgb( 0, 0, 255)' };// 渐变色的色带 多边形设置渐变色 影响侧面
						}
						else {
							buildingLayer.style.gradient = null; // 取消渐变色
						}
					});
					new THING.widget.Button('整体修改颜色', function () {
						if (!THING.Utils.equalsColor(buildingLayer.style.color, [0.4, 0.4, 0.4])) {
							buildingLayer.style.color = [0.4, 0.4, 0.4];
						}
						else {
							buildingLayer.style.color = [1, 1, 1];
						}
					});
					new THING.widget.Button('叠加特效', function () {
						buildingLayer.style.blending = !buildingLayer.style.blending;
					});
					new THING.widget.Button('整体抬高', function () {
						if (buildingLayer.offsetHeight === 0) {
							buildingLayer.offsetHeight = 100;
						}
						else {
							buildingLayer.offsetHeight = 0;
						}
					});
				}
			});
		}
		else {
			buildingLayer.visible = !buildingLayer.visible;
		}
	});
}
