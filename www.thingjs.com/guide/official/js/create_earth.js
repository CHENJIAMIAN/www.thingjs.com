/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：该示例介绍如何创建一个简单的地球
 */
var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];

// 创建一个地球     
var map = new THING.EARTH.Map({
	style: {
		atmosphere: true, // 显示/隐藏 大气层 默认显示
		night: true, // 开启/关闭 白天黑夜效果 默认开启
	},
	attribution: "amap", // 右下角地图版权信息
});
// 创建一个瓦片图层
var tileLayer = new THING.EARTH.TileLayer({
	name: "tileLayer1",
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
});
// 向地球添加一个瓦片图图层
map.addLayer(tileLayer);

// 地图注册点击事件
map.on("click", function (ev) {
	console.clear();

	// 获取鼠标点击处的经纬度
	var lonlat = ev.coordinates;
	console.log(lonlat);
	// 将经纬度坐标转为三维坐标，第二个参数代表离地高度
	var worldPos = THING.EARTH.Utils.convertLonlatToWorld(lonlat, 0);
	console.log(worldPos);
	// 根据经纬度和方位角计算物体在地球上的旋转信息，第二个参数为方位角 默认0
	var angles = THING.EARTH.Utils.getAnglesFromLonlat(lonlat, 0);
	console.log(angles);
});
