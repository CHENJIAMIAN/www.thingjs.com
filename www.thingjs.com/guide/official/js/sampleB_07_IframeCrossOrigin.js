/**
 * @version 2.0
 * @author ThingJS
 * 说明：iframe引用上传到网站的 同域 的页面 函数传参相互调用
 * 操作：3D场景中单击物体 将物体name传给页面
 *      页面中单击按钮 进入相应物体的层级，进入层级后 右键返回上一级
 * 难度：★★☆☆☆
 */

const app = new THING.App();
app.background = '#000000';

// 加载场景
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example", { ignoreTheme: true });
bundle.waitForComplete().then((ev) => {
    const campus = bundle.campuses[0];
    if (campus) {
        app.levelManager.change(campus);
    }
    var build = app.query('.Building');
    build.on('click', (ev) => {
        console.log(ev.target.name)
        var name = ev.target.name;
        mess(name)
    }, { useCapture: true })
    var floor = app.query('.Floor');
    floor.on('click', (ev) => {
        console.log(ev.target.name)
        var name = ev.target.name;
        mess(name)
    }, { useCapture: true })
    var thing = app.query('.Thing');
    thing.on('click', function (ev) {
        if (ev.object) {
            var obj = ev.object;
            var name = obj.name;
            mess(name)
        }
    })
    function mess(name) {
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
    initThingJsTip("本例程展示了网站中上传的页面资源与ThingJS在线开发环境属于同域时，函数之间传参相互调用<br>点击园区中可拾取的对象后，点击Into Level按钮进入对应层级");
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

// 接收iframe页面传送的数据
window.addEventListener('message', function (e) {
    var data = e.data;
    var funcName = data.funcName;
    var param = data.param;
    window[funcName](param.name);
})

function changeLevel(value) {
    var obj = app.query(value)[0];
    if (obj) {
        app.levelManager.change(obj);
    }
}