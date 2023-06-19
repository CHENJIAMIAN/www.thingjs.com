/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例展示了创建不同样式的 GeoPoint
 */
var app = new THING.App();
app.background = [0, 0, 0];
       
// 创建一个地图
var map = new THING.EARTH.Map({
	attribution: "高德",
});
// 创建一个瓦片图层
var tileLayer1 = new THING.EARTH.TileLayer({
	name: "卫星影像图层",
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
});
// 将瓦片图添加到底图图层中
map.addLayer(tileLayer1);
app.camera.earthFlyTo({
	lonlat: [116.39147758483887, 39.90483120567556],
	height: 5000,
});

// 创建一个 ThingLayer
var thingLayer = new THING.EARTH.ThingLayer({
	name: "thingLayer01",
});
// 将ThingLayer添加到地图中
map.addLayer(thingLayer);

new THING.widget.Button("图标(像素大小)", function () {
	var geoPoint = thingLayer.query("王府井地铁站")[0];
	if (!geoPoint) {
		geoPoint = new THING.EARTH.GeoPoint({
			name: "王府井地铁站",
			userData: { 类别: "地铁站", 线路: "一号线" },
			coordinates: [116.4052963256836, 39.90654306772361],
			style: {
				pointType: THING.EARTH.SymbolType.Image, // 代表使用图片
				url: "https://www.thingjs.com/static/image/train_station.png", // 图片 url
				size: 16, // 缩放比例
			},
		});
		thingLayer.add(geoPoint); // 将一个点加到ThingLayer中
	}
	else {
		geoPoint.visible = !geoPoint.visible;
	}
});
new THING.widget.Button("调整轴心点", function () {
	var geoPoint = thingLayer.query("王府井地铁站")[0];
	if (geoPoint) {
		if (geoPoint.pivot[0] === 0.5 && geoPoint.pivot[1] === 0) {
			geoPoint.pivot = [0.5, 0.5];
		}
		else {
			geoPoint.pivot = [0.5, 0];
		}
	}
});
new THING.widget.Button("图标(近大远小)", function () {
	var geoPoint = thingLayer.query("前门地铁站")[0];
	if (!geoPoint) {
		geoPoint = new THING.EARTH.GeoPoint({
			name: "前门地铁站",
			userData: { 类别: "地铁站", 线路: "二号线" },
			coordinates: [116.39167070388794, 39.89878996608077],
			style: {
				pointType: THING.EARTH.SymbolType.Image, // 代表使用图片
				url: "https://www.thingjs.com/static/image/train_station.png", // 图片 url
				size: 50, // 缩放比例 当 keepSize 为 false 时 单位为 米
				keepSize: false, // 图标近大远小
			},
		});
		thingLayer.add(geoPoint); // 将一个点加到ThingLayer中
	}
	else {
		geoPoint.visible = !geoPoint.visible;
	}
});

new THING.widget.Button("符号(像素大小)", function () {
	var geoPoint = thingLayer.query("国家大剧院")[0];
	if (!geoPoint) {
		geoPoint = new THING.EARTH.GeoPoint({
			type: "GeoPoint",
			name: "国家大剧院",
			userData: { 类别: "剧院" },
			coordinates: [116.38353824615479, 39.903308600125236],
			style: {
				pointType: THING.EARTH.SymbolType.Vector, // Vector 代表使用内置矢量符号
				vectorType: THING.EARTH.VectorType.Circle, // 矢量符号形状 Circle(圆形),Triangle(三角形),Rectangle(正方形),Cross(十字)
				color: [1, 0, 0], // 矢量符号填充色
				opacity: 0.5, // 符号不透明度
				lineColor: [1, 1, 0], // 描边颜色
				lineOpacity: 0.8, // 描边透明度
				lineWidth: 2, // 描边宽度
				size: 10, // 缩放比例
			},
		});
		thingLayer.add(geoPoint); // 将一个点加到ThingLayer中
	}
	else {
		geoPoint.visible = !geoPoint.visible;
	}
});
new THING.widget.Button("符号(近大远小)", function () {
	var geoPoint = thingLayer.query("中国国家博物馆")[0];
	if (!geoPoint) {
		geoPoint = new THING.EARTH.GeoPoint({
			name: "中国国家博物馆",
			userData: { 类别: "博物馆" },
			coordinates: [116.39587640762329, 39.90353082034139],
			style: {
				pointType: THING.EARTH.SymbolType.Vector, // Vector 代表使用内置矢量符号
				vectorType: THING.EARTH.VectorType.Triangle, // 矢量符号形状 Circle(圆形),Triangle(三角形),Rectangle(正方形),Cross(十字)
				color: [1, 0, 0], // 矢量符号填充色
				opacity: 0.5, // 符号不透明度
				lineColor: [1, 1, 0], // 描边颜色
				lineOpacity: 0.8, // 描边透明度
				lineWidth: 2, // 描边宽度
				keepSize: false, // 符号近大远小
				size: 50, // 符号尺寸 单位米
			},
		});
		thingLayer.add(geoPoint); // 将一个点加到ThingLayer中
	}
	else {
		geoPoint.visible = !geoPoint.visible;
	}
});

new THING.widget.Button("模型", function () {
	var geoPoint = thingLayer.query("救护车")[0];
	if (!geoPoint) {
		geoPoint = new THING.EARTH.GeoPoint({
			name: "救护车",
			userData: { 类别: "车" },
			coordinates: [116.38434827327728, 39.90610070362458],
			azimuth: 90, // 模型旋转角度
			style: {
				pointType: THING.EARTH.SymbolType.Model, // model 代表使用模型
				url: "https://model.3dmomoda.com/models/4385928f07b24d77a523641fe584aa8d/0/gltf/", // 模型地址
				size: 50, // 缩放比例
			},
		});
		thingLayer.add(geoPoint); // 将一个点加到ThingLayer中
	}
	else {
		geoPoint.visible = !geoPoint.visible;
	}
});
