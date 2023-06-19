/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例主要展示了地图底图滤镜以及地图切换功能
 * 注：CMap中的颜色rgb取值范围为0-255
 */
var app = new THING.App();
// 设置地图背景为黑色
app.background = [0, 0, 0];
      
var map = new THING.EARTH.Map({
	style: {
		night: false,
	},
	attribution: "高德",
	maximumLevel: 18,
});

// 新建一个瓦片图层
var tileLayer1 = new THING.EARTH.TileLayer({
	name: "tileLayer1",
	url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
	maximumLevel: 18,
});
// 将瓦片图层添加到map中
map.addLayer(tileLayer1);
// 设置瓦片图层的样式为CUSTOMCOLOR,这样的话可以设置地图的滤镜
tileLayer1.style.template = 'CustomColor';

// 创建一个配置界面组件
var panel = new THING.widget.Panel({
	titleText: "地球效果",
	hasTitle: true,
});
var dataObj = {
	"颜色值:r": 255,
	"颜色值:g": 255,
	"颜色值:b": 255,
	"亮度:": 1.0,
	radio: "影像",
};
var rr = panel.add(dataObj, "颜色值:r").min(0).max(255).isChangeValue(true);
var gg = panel.add(dataObj, "颜色值:g").min(0).max(255).isChangeValue(true);
var bb = panel.add(dataObj, "颜色值:b").min(0).max(255).isChangeValue(true);
var brightness = panel
	.add(dataObj, "亮度:")
	.min(0)
	.max(5.0)
	.step(0.1)
	.isChangeValue(true);
var radio = panel.addRadio(dataObj, "radio", ["影像", "街道"]);
rr.on("change", function (state) {
	var color = tileLayer1.style.customColor;
	// 设置瓦片图滤镜颜色
	tileLayer1.style.customColor = [state / 255, color[1], color[2]];
});
gg.on("change", function (state) {
	var color = tileLayer1.style.customColor;
	tileLayer1.style.customColor = [color[0], state / 255, color[2]];
});
bb.on("change", function (state) {
	var color = tileLayer1.style.customColor;
	tileLayer1.style.customColor = [color[0], color[1], state / 255];
});
brightness.on("change", function (state) {
	// 设置瓦片图的亮度
	tileLayer1.style.brightness = state;
});
radio.on("change", function (state) {
	if (state === "影像") {
		tileLayer1.url =
		"https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
	}
	else if (state === "街道") {
		tileLayer1.url = "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}";
	}
});	
