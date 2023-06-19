/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：该示例将介绍在地球上相机使用的常用方法
 */
var app = new THING.App();
app.background = [0, 0, 0];
// 新建一个地图      
var map = new THING.EARTH.Map({
	style: {
		night: false,
	},
	attribution: "高德",
	maximumLevel: 18
});

// 新建一个瓦片图层
var tileLayer = new THING.EARTH.TileLayer({
	name: "tileLayer1",
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
	maximumLevel: 18
});
// 将瓦片图层添加到map中
map.addLayer(tileLayer);
// 园区的经纬度坐标(GCJ_02坐标系)
var sceneLonlat = [116.4641, 39.98606];
// 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
var position = THING.EARTH.Utils.convertLonlatToWorld(sceneLonlat, 0.5);
// 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
var angles = THING.EARTH.Utils.getAnglesFromLonlat(sceneLonlat, 220);

// 相机飞到指定的地理位置和指定高度 地球上使用flyTo需要加isEarth参数
app.camera.earthFlyTo({
	lonlat: sceneLonlat,
	height: 200,
	time: 3000,
	complete: function () {
		// 创建Campus
		const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", {
			position: position, // 位置
			angles: angles, // 旋转
			ignoreTheme: true,
		});
		bundle.waitForComplete().then((ev) => {
			if (ev.bundle) {
				const campus = bundle.campuses[0];
				app.levelManager.change(campus);
			}
			// 添加Button
			let car = app.query("car01")[0];
			new THING.widget.Button("看物体", function () {
				app.camera.target = car.position;
				app.camera.lookAt(car);
			});
			new THING.widget.Button("水平旋转", function () {
				app.camera.earthFlyRotateBySpeed({
					angle: 360,
					time: 2000,
				});
			});
			new THING.widget.Button("停止水平旋转", function () {
				app.camera.stopEarthFly();
			});
			new THING.widget.Button("限制俯仰范围", function () {
				// 设置摄像机俯仰角度范围[最小值, 最大值]
				app.camera.vertAngleLimit = [10, 40];
			});
			new THING.widget.Button("取消限制俯仰范围", function () {
				// 设置摄像机俯仰角度范围[最小值, 最大值]
				app.camera.vertAngleLimit = [0, 90];
			});
			new THING.widget.Button("相机y轴旋转", function () {
				app.camera.rotateY(30);
			});
			new THING.widget.Button("限制相机距离", function () {
				// 设置摄像机水平角度范围[最小值, 最大值]
				app.camera.distanceLimited = [30, 200];
			});
			new THING.widget.Button("取消限制相机距离", function () {
				// 设置摄像机水平角度范围[最小值, 最大值]
				app.camera.distanceLimited = [0, 1e10];
			});
			new THING.widget.Button("飞到物体", function () {
				app.camera.flyTo({
					target: car, // 飞行到的对象
					time: 3000, // 飞行时间
				});
			});
		});
	},
});


