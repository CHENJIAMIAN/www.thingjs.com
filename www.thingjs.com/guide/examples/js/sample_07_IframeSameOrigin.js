/**
 * 说明：iframe引用上传到网站的 同域 的页面 函数传参相互调用
 * 操作：3D场景中单击物体 将物体name传给页面
 *      页面中单击按钮 进入相应物体的层级，进入层级后 右键返回上一级
 * 难度：★★☆☆☆
 */
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    background: '#000000',
    env: 'Seaside',
});

app.on('load', function (ev) {
	app.level.change(ev.campus);
	initThingJsTip("本例程展示了网站中上传的页面资源与ThingJS在线开发环境属于同域时，函数之间传参相互调用<br>点击园区中可拾取的对象后，点击Into Level按钮进入对应层级");
})
// 界面组件
var panel = new THING.widget.Panel();

// 创建数据对象
var dataObj = {
	iframe: '/uploads/wechat/emhhbmd4aWFuZw==/file/iframe01/index.html '
};

// 上传到网站的页面 与 网站  同域
// https://www.thingjs.com/uploads/wechat/emhhbmd4aWFuZw==/file/iframe01/index.html
var iframe = panel.addIframe(dataObj, 'iframe').caption('iframe');

iframe.setHeight('100px');
$(".ThingJS_wrap").css("width", "60%");
var iframeDom = iframe.domElement.getElementsByTagName('iframe')[0];

// 设置iframe滚动条
// iframeDom.scrolling = "auto";

app.on(THING.EventType.SingleClick, function (ev) {
	if (ev.picked && ev.object) {
		var obj = ev.object;
		var name = obj.name;

		// 调用同域的iframe页面内的方法 ChangeText
		iframeDom.contentWindow.changeText(name);
	}
})

// 点击iframe页面中的按钮 调用此函数
function changeLevel(value) {
	var obj = app.query(value)[0];
	if (obj) {
		app.level.change(obj);
	}
}