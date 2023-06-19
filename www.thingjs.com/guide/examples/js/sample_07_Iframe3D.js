/**
 * 说明：示例用于演示 ThingJS 项目发布后，以 iframe 的方式嵌入到用户系统页面中的应用场景
 * 注意：由于ThingJS在线环境与用户系统页面是跨域关系，因此需使用 HTML5 提供的 postMessage 
 *      接口进行与iframe页面间的数据通信，以下代码仅包含3D部分，完整示例代码以及项目效果 请点击
 *      http://www.thingjs.com/static/iframe/index.html 进行查看。
 *     代码摘录如下
 *     ...
			window.onload = function () {
					createTree();
			}
	
			function createTree() {
					$.ajax({
							type: "get",
							url: "./data/tree.json",
							dataType: "json",
							success: function (d) {
									$('#objectTree').tree({
											data: d,
											onClick: function (node, checked) {
													var id = node.id;
													callFuncInThingJS('changeLevel', id)
											}
									})
							}
					});
			}
	
			function callFuncInThingJS(funcName, data) {
					var iframe = $('#myIframe')[0];
	
					var message = {
							'funcName': funcName,// 所要调用ThingJS页面里的函数名
							'param': data
					}
					iframe.contentWindow.postMessage(message, '*');
			}
	
			function upDataInfo(param) {
					var infoText = $('#infoText')[0];
					infoText.innerText = param.info;
	
					var node = $('#objectTree').tree('find', param.id);
					$('#objectTree').tree('expandTo', node.target).tree('select', node.target);
			}
	
			// 接收ThingJS页面传送的数据
			window.addEventListener('message', function (e) {
				var data = e.data;
					var funcName = data.funcName;
					var param = data.param;
					if (window[funcName]) window[funcName](param);
			});
 *       
 * 
 * 难度：★★★★☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

app.on('load', function(ev) {
    var campus = ev.campus;
    // 开启系统层级
    app.level.change(campus);
    initThingJsTip("本例程用于演示 ThingJS 项目发布后，以 iframe 的方式嵌入到用户系统页面中的应用场景，由于ThingJS在线环境与用户系统页面是跨域关系，因此需使用 HTML5 提供的 postMessage 接口进行与iframe页面间的数据通信<br>完整示例代码以及项目效果 请前往 http://www.thingjs.com/static/iframe/index.html 进行查看。");
});

app.on(THING.EventType.LevelChange, function(ev) {
    var obj = ev.object;
    var name = obj.name;
    var type = obj.type;
    var id = obj.id;
    var info = "进入 " + type + " (" + name + ")";
    // 调用 用户主页面的 upDateInfo 方法
    callFuncInMain('upDataInfo', { info, id });
})

function callFuncInMain(funcName, data) {
    var message = {
        'funcName': funcName, // 所要调用父页面里的函数名
        'param': data
    }
    // 向父窗体(用户主页面)发送消息
    // 第一个参数是具体的信息内容，
    // 第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为*，表示不限制域名，向所有窗口发送
    window.parent.postMessage(message, '*');
}

function changeLevel(id) {
    var obj = app.query('#' + id)[0];
    if (obj) {
        app.level.change(obj);
    }
}
// 监听用户页面传回的数据 并调用 ThingJS 页面方法
window.addEventListener('message', function(e) {
    var data = e.data;
    var funcName = data.funcName;
    var param = data.param;
    // 调用 ThingJS 页面方法
    window[funcName](param);
});