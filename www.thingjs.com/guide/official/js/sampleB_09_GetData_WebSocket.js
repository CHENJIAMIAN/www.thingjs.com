/**
 * @version 2.0
 * @author ThingJS
 * 说明：为模拟通过WebSocket的方式对接数据
 * 备注：WebSocket 是 HTML5 一种新的协议，实现了浏览器与服务器之间的全双工通信。其本质是先通过 
 *      HTTP/HTTPS 协议进行握手后创建一个用于交换数据的 TCP 连接，服务端与客户端通过此 TCP 连
 *      接进行数据的双向实时传输，直到有一方主动发送关闭连接请求或出现网络错误才会关闭连接。
 *      WebSocket 最大的优点在，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信
 *      息，真正实现了数据的实时双向通信。并且 WebSocket 通信不受同源策略的限制，即不存在跨域
 *      问题。
 * 功能：模拟通过WebSocket的方式对接数并将数据挂接到物体（car01）身上，当温度>20℃时 car01变红
 * 难度：★★☆☆☆
 */


//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

const baseURL = "https://www.thingjs.com/static/skyboxes/Seaside/";
const image = new THING.CubeTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);

// 设置环境图和背景图
app.envMap = image;
app.background = '#000000';

var timer; // 定时器
var webSocket;

THING.Utils.loadFile('/guide/examples/css/measure/panel.css',
    {
        load: function () {
            // 加载场景代码 
            var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');

            // 加载场景后执行
            bundle.waitForComplete().then(() => {
                var car = app.query('car01')[0];
                // 物体身上创建monitorData对象 用于存储动态监控数据
                car.monitorData = {
                    '温度': ''
                };

                new THING.widget.Button('开启读取', function () {
                    updateData(car);

                    // 摄像机飞行到某位置
                    app.camera.flyTo({
                        'position': [50.00333914719489, 21.747771367094018, 35.16550370725474],
                        'target': [12.071590067214768, 1.9553381388502726, -5.857819062456373],
                        'time': 1000,
                        'complete': function () {
                        }
                    });
                });

                new THING.widget.Button('关闭读取', function () {
                    stopUpdate();

                    // 摄像机飞行到某位置
                    app.camera.flyTo({
                        'position': [36.013, 42.67799999999998, 61.72399999999999],
                        'target': [1.646, 7.891, 4.445],
                        'time': 1000,
                        'complete': function () {
                        }
                    });
                });

                createHtml();
                initThingJsTip("WebSocket 实现了数据的实时双向通信。且通信不受同源策略的限制，不存在跨域问题。<br>点击【开启读取】进行数据读取，读取到的数据将在数据详情面板进行显示，当温度值大于20℃时，车辆设置红色效果，点击【关闭读取】停止数据读取！");
            })
        }
    });

// 创建html界面
function createHtml() {
	// 数据详情界面
	let dataDetails =
		`<div id="dataDetails" class="tj-panel property-panel tj-has-title tj-sizable tj-property-panel tj-pinned" style="position: absolute; right: 10px; top: 220px; width: 315px; height: 416px; transform: none;">
				<div class="tj-close"></div>
				<div class="tj-title" style="cursor: move; user-select: none;">数据详情</div>
				<div class="tj-panel-body" style="padding-top: 0px;">
					<div class="tj-panel-container tj-scroll-bar">
						<table class="tj-table">
							<div class="empty">暂无数据</div>
						</table>
					</div>
				</div>
			</div>`;
	$('#div2d').append(dataDetails);
	// 点击按钮关闭面板
	$('#dataDetails .tj-close').on('click', function () {
		$('#dataDetails').css('display', 'none');
	});
}

/**
 * 数据对接
 */
function updateData(obj) {

	// 对接自有websoket服务器
	if (!webSocket) {

		// 如果 ThingJS 网站是 https 则对应 wss
		// 如果 ThingJS 网站是 http 则对应 ws 即可
		webSocket = new WebSocket('wss://3dmmd.cn/wss');
		// 建立 websocket 连接成功触发事件
		webSocket.onopen = function () {
			console.log("websoket服务器连接成功...");
		};

		// 接收服务端数据时触发事件
		webSocket.onmessage = function (evt) {
			var data = evt.data;
			nowDatetime();
			if (($('.empty').length)) {
				$('.empty').remove();
			}
			if (!($('.tj-group').length)) {
				let tbody = `<tbody class="tj-group" id="tb-line"></tbody>`;
				$('.tj-table').prepend(tbody);
			}
			let tr =
				`<tr class="tj-group-content">
					<td class="tj-key">` + dateString + `</td>
					<td class="tj-value">` + data + `℃</td>
				</tr>`;
			$('.tj-group').prepend(tr);
			// 设置物体身上的监控数据
			obj.setAttribute("monitorData/温度", data);
			changeColor(obj);
		};

		webSocket.onclose = function (evt) {
			console.log("websoket关闭...");
			webSocket = null;
		}
	}
}

/**
 * 关闭数据请求
 */
function stopUpdate() {
	// 关闭连接
	webSocket.close();
}

/**
 * 取得系统日期
 */
function nowDatetime() {
	var date = new Date();
	var hours = (date.getHours()) > 9 ? (date.getHours()) : "0" + (date.getHours());
	var minutes = (date.getMinutes()) > 9 ? (date.getMinutes()) : "0" + (date.getMinutes());
	var seconds = (date.getSeconds()) > 9 ? (date.getSeconds()) : "0" + (date.getSeconds());
	dateString =
		hours + ":" +
		minutes + ":" +
		seconds;
	return dateString;
}

/**
 * 当车辆的温度值超过20时，更改小车颜色
 */
function changeColor(obj) {
	var value = obj.getAttribute("monitorData/温度");
	if (value > 20) {
		obj.style.color = 'rgb(255,0,0)';
	} else {
		obj.style.color = null;
	}
}