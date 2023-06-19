/**
 * 说明：利用快捷界面库 批量显示物体监控牌
 * 操作：点击按钮，查看功能
 * 难度：★★★☆☆
 */
var app = new THING.App({
    url: "models/silohouse",  // 场景地址
    skyBox: "Universal"  // 天空盒
});

var panelArr = [];  // 面板数组
var interval = null;  // 计时器
var siloHouse;  // 粮仓对象集合


// 场景已经加载完时，会触发load事件
app.on('load', function (ev) {
    new THING.widget.Button('显示顶牌', enableMonitor);
    new THING.widget.Button('重置', disableMonitor);

    initThingJsTip("利用快捷界面库，批量显示物体监控牌。点击按钮，控制是否请求监控数据以及面板显示、隐藏");
});

/**
 * 开启监控
 */
function enableMonitor() {
    if (panelArr.length === 0) {  // 当没有创建面板时
        siloHouse = app.query("[物体类型=粮仓]");  // 获取粮仓
        // 添加粮仓自定义属性monitorData，用来存储监控信息
        siloHouse.forEach(function (obj) {
            obj.monitorData = {};
        });

        createAllPanels();
    } else {
        showAllPanels(true);
    }

    // 请求数据
    update();
    // 每间隔3000毫秒刷新一次数据
    interval = setInterval(update, 3000);
}

/**
 * 关闭监控
 */
function disableMonitor() {
    // 停止update数据
    clearInterval(interval);
    if (panelArr.length > 0) {
        showAllPanels(false);
    }
}

/**
 * 遍历粮仓添加顶牌
 */
function createAllPanels() {
    siloHouse.forEach(function (obj, index) {
        panelArr.push(createPanel(obj));
    });
}

/**
 * 单个物体头顶监控面板
 */
function createPanel(obj) {
    // 创建widget (动态绑定数据用)
    var panel = new THING.widget.Panel({
        width: '150px',  // 设置面板宽度
        cornerType: 'polyline'  // 角标样式：没有角标 none，没有线的角标 noline ，折线角标 polyline

    })
    panel.addString(obj.monitorData, 'temper').caption('温度');
    panel.addString(obj.monitorData, 'humi').caption('湿度');

    // 创建UIAnchor面板
    var ui = app.create({
        type: 'UIAnchor',  // 类型		
        parent: obj,  // 父节点设置		
        element: panel.domElement,  // 要绑定的页面的 element 对象		
        localPosition: [0, 0, 0],  // 设置 localPosition 为[0, 0, 0]		
        pivotPixel: [-10, 248]  // 相对于Element左上角的偏移像素值
    });
    return panel;
}

/**
 * 显示隐藏 面板
 */
function showAllPanels(isShow) {
    panelArr.forEach(function (obj) {
        obj.visible = isShow;
    });
}

/**
 * ajax请求数据
 */
function update() {
    // ***如设置服务器的CORS，实现跨域访问。会更简单***
    // ***下例采用的不设置CORS的跨域实现方案***
    // 请求传入参数为 { "dataCount": len }
    // 服务器返回的数据格式为 callback({"state":"success","data":{temper: '21℃', humi: '22%', power: '10kWh'}})

    var len = siloHouse.length;  // 粮仓数量
    $.ajax({
        type: "get",
        url: "https://3dmmd.cn/monitoringData",
        data: { "dataCount": len },
        dataType: "jsonp",
        jsonpCallback: "callback",
        success: function (d) {
            // console.log(d);
            for (var i = 0; i < len; i++) {
                // 更新粮仓物体上的自定义属性monitorData相关信息
                siloHouse[i].monitorData.temper = d.data[i].temper;
                siloHouse[i].monitorData.humi = d.data[i].humi;
            }
        }
    });
}
