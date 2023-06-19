/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例介绍了通过CityBuilder转出的url创建的地图如何进行二次开发
 */
var app = new THING.App();
app.background = [0, 0, 0];
  
new THING.EARTH.Map({
	type: "Map",
	// CityBuilder转出的url
	url: "https://www.thingjs.com/citybuilder_console/mapProject/config/TVRFNE9UZz1DaXR5QnVpbGRlckAyMDE5",
	complete: function (event) {
		// 在这里编写业务代码
		var map = event.object;
		// 获取项目中的业务图层
		var userLayers = map.userLayers;
		var buildingLayer = app.query("building")[0];
		buildingLayer.on(THING.EventType.DBLClick, function (e) {
			let obj = e.object;
			app.camera.earthFlyTo({
				target: obj,
			});
		});

		var toolbarWidth = 250;
		var toolbar = new THING.widget.Panel({
			hasTitle: true, // 是否有标题
			titleText: "图层列表",
			width: toolbarWidth,
		});
		let clientWidth = app.container.clientWidth;
		toolbar.position = [clientWidth - toolbarWidth - 10, 10];
		userLayers.forEach(function (layer) {
			var button = toolbar
				.addBoolean({ open: true }, "open")
				.caption(layer.name); // 绑定回调
			button.on("change", function (ev) {
				layer.visible = ev;
			});
		});

		// 先根据名称查询图层对象 名称是在CityBuilder中配置的图层的名称
		var primaryRoadLayer = app.query("primary")[0];
		var originWidth = primaryRoadLayer.style.width;
		new THING.widget.Button("修改线宽度", function () {
			if (primaryRoadLayer.style.width === originWidth) {
				primaryRoadLayer.style.width = 8;
			}
			else {
				primaryRoadLayer.style.width = originWidth;
			}
		});
		// 根据名称查询图层对象
		var bankLayer = app.query("bank")[0];
		var originSize = bankLayer.style.size;
		new THING.widget.Button("修改点尺寸", function () {
			if (bankLayer.style.size === originSize) {
				// 修改整个图层对象的尺寸
				bankLayer.style.size = 30;
			}
			else {
				bankLayer.style.size = originSize;
			}
		});
		// 根据名称查询图层对象
		var buildingLayer = app.query("building")[0];
		var originHeight = buildingLayer.getItems()[0].extrudeHeight;
		new THING.widget.Button("修改建筑高度", function () {
			// 修改第一个对象的高度
			if (buildingLayer.getItems()[0].extrudeHeight === originHeight) {
				buildingLayer.getItems()[0].extrudeHeight = 500;
			}
			else {
				buildingLayer.getItems()[0].extrudeHeight = originHeight;
			}
		});
	},
});
