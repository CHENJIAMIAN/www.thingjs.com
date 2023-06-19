/**
 * 说明：利用快捷界面库，显示单个物体的相关数据信息
 * 操作：单击粮仓
 * 难度：★★★☆☆
 */
var app = new THING.App({
	url: "models/silohouse",
	skyBox: "Universal"
});

var interval = null;  // 计时器
var panel = null;  // 统计面板

app.on('load', function () {
    initThingJsTip("利用快捷界面库，显示单个物体的相关数据信息。单击粮仓，查看效果");

	var selector = app.query("[物体类型=粮仓]");  // 获取粮仓集合

	// 添加粮仓自定义属性monitorData，用来存储监控信息
	selector.forEach(function (obj) {
		obj.monitorData = {};
	});

	// 单击粮仓 设置选择集
	selector.on('singleclick', function (ev) {
		var object = ev.object;

        // 如果当前点击的物体在选择集中 则不再添加
		if (app.selection.has(object)) return;

		app.selection.clear();
		app.selection.select(object);
	});


	app.on('singleclick', function (ev) {
		// 单击没有点击到物体 或 单击的物体不属于粮仓对象
		if (!ev.picked || !selector.has(ev.object)) {
			app.selection.clear();
		}
	}, '单击非粮仓清空选择集');

	// 当粮仓被加入到选择集后
	selector.on(THING.EventType.Select, function (ev) {
		var object = ev.object;
		object.style.outlineColor = 0x0000FF;

		// 更新数据
		update(object);
		interval = setInterval(function () {
			update(object);
		}, 2000);

		// 创建物体面板
		createPanel(object);
	});

	// 当粮仓从选择集中清除时
	selector.on(THING.EventType.Deselect, function (ev) {
		var object = ev.object;
        object.style.outlineColor = null;  // 清除勾边

		// 停止更新数据
		clearInterval(interval);
        // 清楚物体面板
		destroyPanel();
		
		
	});
});

/**
 * ajax请求数据
 */
function update(obj) {
	// ***如设置服务器的CORS，实现跨域访问。会更简单***
	// ***下例采用的不设置CORS的跨域实现方案***
	// 请求传入参数为 { "id": id }
	// 服务器返回的数据格式为 callback({"state":"success","data":{"id":"4967","temper":"15℃","humi":"59%","power":"20kWh"}})

	$.ajax({
		type: "get",
		url: "https://3dmmd.cn/monitoringData",
		data: { "id": obj.id },
		dataType: "jsonp",
		jsonpCallback: "callback",
		success: function (d) {
			obj.monitorData['能耗'] = d.data.power;
			obj.monitorData['仓房温度'] = d.data.temper;
			obj.monitorData['粮食湿度'] = d.data.humi;
		}
	});
}


/**
 * 创建面板
 */
function createPanel(obj) {
	if (panel) return;

	// 统计信息
	var info = {
		"基本信息": {
		},
		"粮情信息": {
		}
	}

	info["基本信息"]["仓库ID"] = obj.id;

	panel = new THING.widget.Panel({
		hasTitle: true,
		titleText: obj.name,
		dragable: true,
		retractable: true,
		width: "229px",
	});
	// addTab添加tab面板
	panel.addTab(info);

	panel.addString(obj.monitorData, "能耗").caption("能耗").link("基本信息");
	panel.addString(obj.monitorData, "仓房温度").caption("仓房温度").link("粮情信息");
	panel.addString(obj.monitorData, "粮食湿度").caption("粮食湿度").link("粮情信息");

	panel.position = [0, 0];
}

/**
 * 删除面板
 */
function destroyPanel() {
	if (panel) {
		panel.destroy();
		panel = null;
	}
}