/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例展示了 GeoPoint 点沿由经纬度数组构成的路径移动
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
	maximumLevel: 18,
});
// 将瓦片图添加到底图图层中
map.addLayer(tileLayer1);

// 路径经纬度坐标
var path = [
	[116.46603015576281, 39.98443685973798],
	[116.46329469778172, 39.986264159547844],
	[116.46387774012193, 39.986624547178785],
	[116.46445007937758, 39.98704249256912],
	[116.46573916862171, 39.98826643347378],
	[116.46894491629857, 39.986131603427026],
	[116.4673591500939, 39.984667996688316],
	[116.46709441434483, 39.98452887243426],
	[116.46694466899635, 39.9844922354609],
	[116.4665676292619, 39.98441092276541],
	[116.46624139551393, 39.98436853584131],
	[116.46608630742746, 39.98441206368394],
	[116.46603015576281, 39.98443685973798],
];
// 轨迹中心点
var centerLonlat = THING.EARTH.Utils.getCenterCoordinates(path);
app.camera.earthFlyTo({
	lonlat: centerLonlat,
	height: 800,
	complete: () => {
		// 创建一个 ThingLayer
		var thingLayer = new THING.EARTH.ThingLayer({
			name: "thingLayer01",
		});
		// 将ThingLayer添加到地图中
		map.addLayer(thingLayer);

		// 创建一个车
		var geoPoint = new THING.EARTH.GeoPoint({
			name: "救护车",
			userData: { 类别: "车" },
			coordinates: path[0],
			azimuth: 45, // 模型旋转角度
			style: {
				pointType: THING.EARTH.SymbolType.Model, // 代表创建模型点
				url: "https://model.3dmomoda.com/models/4385928f07b24d77a523641fe584aa8d/0/gltf/", // 模型地址
				size: 5, // 缩放比例
			},
		});
		thingLayer.add(geoPoint);

		new THING.widget.Button("沿路径移动", function () {
			geoPoint.moveGeoPath(
				path,
				{
					time: 10 * 1000,
					loopType: THING.LoopType.Repeat,
				});
		});

		new THING.widget.Button("显示/隐藏 路径", function () {
			var geoLine = thingLayer.query("路径")[0];
			if (!geoLine) {
				// 创建路径
				geoLine = new THING.EARTH.GeoLine({
					name: "路径",
					coordinates: path, // 经纬度坐标
					style: {
						lineType: THING.EARTH.GeoLineType.Plane,
						url: "https://www.thingjs.com/guide/image/uGeo/path.png",
						speed: 0.5,
						effect: true,
					},
				});
				thingLayer.add(geoLine); // 添加到ThingLayer中
			}
			else {
				geoLine.visible = !geoLine.visible;
			}
		});

		var box = new THING.Box();
		box.scale = [20, 20, 20];
		new THING.widget.Button("摄像机跟随物体", function () {
			// 每一帧设置摄像机位置 和 目标点
			geoPoint.on(
				"update",
				function () {
					// 摄像机位置为 移动小车后上方
					// 为了便于计算 这里用了坐标转换 将相对于小车的位置 转换为 世界坐标
					app.camera.position = geoPoint.selfToWorld([0, 300, -300]);
					app.camera.target = geoPoint.position;
					// // 更新相机的up值 为当前位置到球心的方向的单位向量
					const cameraUp = THING.Math.normalizeVector(app.camera.position);
					// // 摄像机目标点为 移动小车的坐标
					app.camera.lookAt(app.camera.target, { up: cameraUp });
				},
				"自定义摄影机跟随"
			);
		});
		new THING.widget.Button("停止", function () {
			geoPoint.off("update", null, "自定义摄影机跟随");
		});
	},
});
