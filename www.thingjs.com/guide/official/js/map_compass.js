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
	atmosphere: true, // 显示/隐藏 大气层 默认显示
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
// 添加指北针控件
const component = new THING.EXTEND.EarthCompassComponent({
	position: THING.EXTEND.CornerType.LeftTop, // 选填 默认值 RightBottom 可填写 RightTop LeftTop LeftBottom
	opacity: 0.5, // 不透明度
	'offset': [25, -25], // 选填 偏移值 x y
	image: 'https://www.thingjs.com/uearth/res/compass.png',
	// backgroundImage: "./img/compass_bg.png",
	size: 50, // 大小
});
app.root.addComponent(component, 'earthCompass');
