/**
 * @version 2.0
 * @author ThingJS
 * 说明：通过 jsonp 解决跨域问题
 * 备注：JSONP 的基本原理就是利用 script 标签没有跨域限制的特点，通过 script 标签向服务器请求
 *      数据；服务器收到请求后，将数据放在一个指定名字的回调函数里返回给浏览器。JSONP 仅支持
 *       GET 请求
 * 功能：通过ajax方式读取数据并将数据挂接到物体（car01）身上，当温度>22℃时 car01变红
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

THING.Utils.loadFile('/guide/examples/css/measure/panel.css', {
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
            initThingJsTip("JSONP 的基本原理就是利用 script 标签没有跨域限制的特点，通过 script 标签向服务器请求数据；服务器收到请求后，将数据放在一个指定名字的回调函数里返回给浏览器。<br>点击【开启读取】进行数据读取，读取到的数据将在数据详情面板进行显示，当温度值大于22℃时，车辆设置红色效果，点击【关闭读取】停止数据读取！");
        })
    }
});

// 创建面板
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

/** **************请求数据 通过JSONP 解决跨域问题*************/
// 通过jsonp解决跨域问题（仅支持Get请求）
// 请求传入参数为 { "id": id }
// 服务器返回的数据格式为 callback({"state":"success","data":{"id":"4967","temper":"15℃","humi":"59%","power":"20kWh"}})
function updateData(obj) {
    // 如果 ThingJS 网站是 https ，则接口对应 https 请求
    // 如果 ThingJS 网站是 http ，则接口对应 http 请求
    $.ajax({
        type: "get",
        url: "https://3dmmd.cn/monitoringData",
        data: { "id": obj.id },
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        jsonpCallback: "callback", // 设置回调函数名 与返回数据的 函数名一致
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