/**
 * 说明：iframe引用跨域的页面 使用 H5的postMessage方法 进行 函数传参相互调用
 * 操作：3D场景中单击物体 将物体name传给页面，页面中单击按钮 进入相应物体的层级，
 * 进入层级后 右键返回上一级
 * 难度：★★★★☆
 */
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    background: '#000000',
    env: 'Seaside',
});

app.on('load', function(ev) {
    app.level.change(ev.campus);
    initThingJsTip(`对于跨域的 iframe 无法直接相互调用函数。我们可以利用 HTML5 提供的 postMessage 接口实现跨域 iframe 页面间的相互函数方法调用<br>点击园区中可拾取的对象后，点击面板上Into Level按钮进入对应层级`);
})
// 界面组件
var panel = new THING.widget.Panel();
// 创建数据对象
var dataObj = {
    iframe: 'https://3dmmd.cn/test/page01/index.html'
};

var iframe = panel.addIframe(dataObj, 'iframe').caption('iframe');
iframe.setHeight('100px');
$(".ThingJS_wrap").css("width", "60%");
var iframeDom = iframe.domElement.getElementsByTagName('iframe')[0];
// 设置iframe滚动条
// iframeDom.scrolling = "auto";

app.on(THING.EventType.SingleClick, function(ev) {
    if (ev.picked && ev.object) {
        var obj = ev.object;
        var name = obj.name;

        var message = {
            'funcName': 'changeText', // 所要调用iframe页面里的函数名
            'param': {
                'name': name
            }
        }
        // 向引用的iframe页面发送数据
        // 第一个参数是数据内容，
        // 第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为*，表示不限制域名，向所有窗口发送
        iframeDom.contentWindow.postMessage(message, '*');
    }
})

function changeLevel(value) {
    var obj = app.query(value)[0];
    if (obj) {
        app.level.change(obj);
    }
}
// 接收iframe页面传送的数据
window.addEventListener('message', function(e) {
    var data = e.data;
    var funcName = data.funcName;
    var param = data.param;
    window[funcName](param.name);
})