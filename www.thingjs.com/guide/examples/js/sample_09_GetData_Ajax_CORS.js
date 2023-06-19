/**
 * 说明：通过CORS解决跨域问题
 * 备注：CORS 是一个 W3C 标准，全称是 “跨域资源共享”（Cross-origin resource sharing）。它允
 *      许浏览器向跨域的服务器，发出 XMLHttpRequest 请求，从而解决了 Ajax 跨域请求数据的问题。
 *      对于前端而言，整个 CORS 通信过程，由浏览器自动完成。对于开发者来说，前端代码与普通 Ajax
 *      代码完全一样。实现 CORS 的关键是后端，需在服务端设置 response 响应头（header）的 
 *      Access-Control-Allow-Origin 属性就可以开启 CORS。该属性表示哪些域名可以访问资源，如果
 *      设置通配符则表示所有网站都可以访问资源
 * 功能：通过ajax方式读取数据并将数据挂接到物体（car01）身上，当温度>22℃时 car01变红
 * 难度：★★☆☆☆
 */

var app; // App对象
var timer; // 定时器
var dateString; // 当前时间

// 引入样式文件
THING.Utils.dynamicLoad(['/guide/examples/css/measure/panel.css'], function () {
	// 加载场景代码 
	app = new THING.App({
		url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
		background: '#000000',
		env: 'Seaside',
	});

	app.on('load', function () {

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
		//  创建提示
		initThingJsTip("CORS是一个 W3C 标准。它允许浏览器向跨域的服务器，发出 XMLHttpRequest 请求，从而解决了 Ajax 跨域请求数据的问题。整个 CORS 通信过程，由浏览器自动完成。<br>点击【开启读取】进行数据读取，读取到的数据将在数据详情面板进行显示，当温度值大于22℃时，车辆设置红色效果，点击【关闭读取】停止数据读取！");
	})
})

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

/** ******************* 以下为ajax数据对接 ********************/
// 服务器程序端 通过设置 Access-Control-Allow-Origin 解决跨域问题
// 更多关于 CORS "跨域资源共享"（Cross-origin resource sharing）的技术细节 请自行搜索
// 请求传入参数为 { "id": id }
// 服务器返回的数据格式为 {"state":"success","data":{"id":"4967","temper":"15℃","humi":"59%","power":"20kWh"}}
function updateData(obj) {
	// 如果 ThingJS 网站是 https ，则接口对应 https 请求
	// 如果 ThingJS 网站是 http ，则接口对应 http 请求
	$.ajax({
		type: "get",
		url: "https://3dmmd.cn/getMonitorDataById",
		data: { "id": obj.id },
		dataType: "json", // 返回的数据类型 json
		success: function (d) {
			var temper = d.data.temper;
			nowDatetime();
			// 设置物体身上的监控数据
			obj.setAttribute("monitorData/温度", temper);

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
					   <td class="tj-value">` + temper + `</td>
				   </tr>`;
			$('.tj-group').prepend(tr);

			changeColor(obj);

			// 每隔5s 请求一次数据
			timer = setTimeout(function () {
				updateData(obj)
			}, 5000);
		}
	});
}

/**
 * 停止数据请求
 */
function stopUpdate() {
	clearTimeout(timer);
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
 * 当车辆的温度值超过22时，更改小车颜色
 */
function changeColor(obj) {
	var temper = obj.getAttribute("monitorData/温度");
	var value = temper.substr(0, temper.indexOf("℃"));
	if (value > 22) {
		obj.style.color = 'rgb(255,0,0)';
	} else {
		obj.style.color = null;
	}
}