/**
 * @version 2.0
 * @author ThingJS
 * 说明：创建App，加载场景包
 * 难度：★☆☆☆☆
 */

//version 2.0 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
window.app = app;

// 创建天空盒
var cubeTexture = new THING.CubeTexture([
    'https://www.thingjs.com/static/skyboxes/BlueSky/posx.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negx.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posy.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negy.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posz.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negz.jpg'
]);
app.background = cubeTexture; // 设置背景资源贴图资源
app.envMap = cubeTexture; // 设置环境图样式

// 加载场景包
var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/silohouse');
var panelArr = [];  // 面板数组
var interval = null;  // 计时器
var siloHouse;  // 粮仓对象集合

bundle.waitForComplete().then(() => {
    new THING.widget.Button('显示顶牌', enableMonitor);
    new THING.widget.Button('重置', disableMonitor);
    initThingJsTip("利用快捷界面库，批量显示物体监控牌。点击按钮，控制是否请求监控数据以及面板显示、隐藏");
})

/**
 * 开启监控
 */
function enableMonitor() {
    if (panelArr.length === 0) {  // 当没有创建面板时
        siloHouse = app.query("[userData/物体类型=粮仓]");  // 获取粮仓
        // 添加粮仓自定义属性monitorData，用来存储监控信息
        siloHouse.forEach(function (obj) {
            obj.monitorData = {};
        });
        createAllPanels();
    } else {
        clearInterval(interval);
    }

    // 请求数据
    update();
    // // 每间隔3000毫秒刷新一次数据
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
        width: '200px',  // 设置面板宽度
        cornerType: 'polyline',  // 角标样式：没有角标 none，没有线的角标 noline ，折线角标 polyline
        visible: true,
        name: 'Panel'
    })
    panel.addString(obj.monitorData, 'temper').caption('温度');
    panel.addString(obj.monitorData, 'humi').caption('湿度');
    obj.registerComponent(THING.DOM.CSS3DComponent, 'css');
    const css = obj.css;
    css.domElement = panel.domElement;
    css.pivot = [0, -0.5];  // 获取/设置基于左下角的轴心点位置（百分比），默认为：[0.5, 0.5]（中心位置）
    css.factor = 0.18;  // 获取/设置 DOM 元素缩放比例,默认为：1 / 30
    return panel;
}

/**
 * 显示隐藏 面板
 */
function showAllPanels(isShow) {
    if (!isShow) {
        $('.ThingJS_wrap').remove();
        panelArr = [];
    }
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