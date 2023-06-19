/**
 * @version 2.0
 * @author ThingJS
 */

//  未完成原因：部分涉及第三方控件，控件暂时无法支持  完成度占比90%

document.title = 'Demo-粮仓管理';

/**
 * 仓库封装类
 */
function SiloHouse(obj) {
    this.name = obj.id;
    this.obj = obj;
    obj.siloHouse = this;
    this.height = obj.bounding.boundingBox.size[1];
    this.roof = obj.promoteNode('gaizi_0')
    this.roof.initPos = this.roof.position; // 保存盖子的初始位置
    this.temper = this.humi = this.power = this.store = "";
    this.info = null;
    this.heatMap = null;
    this.panel = null;
    this.ui = null;
    this.setupEvents();
    this.simulateData();
}
// 几个粮仓的静态变量
SiloHouse.current = null;       // 正在选中的粮仓
SiloHouse.currentOpen = null;   // 正在打开的粮仓
SiloHouse.summeryPanel = null;  // 注意统计信息只有一个面板，是静态变量

// 选择
SiloHouse.prototype.select = function () {
    this.obj.style.outlineColor = 0x0000FF;
    this.showSummery(true);
}

SiloHouse.prototype.unselect = function () {
    this.obj.style.outlineColor = null;
    this.showSummery(false);
}

// 屋顶
SiloHouse.prototype.openRoof = function () {
    this.roof.initPos = this.roof.position; // 保存盖子的初始位置
    //var pos = this.obj.upPosition(80);
    var pos = THING.Math.addVector(this.roof.position, [0, 30, 0])
    this.roof.moveTo(pos, { 'time': 300, 'orientToPath': false });
}

SiloHouse.prototype.resetRoof = function () {
    var pos = this.roof.initPos;
    this.roof.moveTo(pos, { 'time': 300, 'orientToPath': false });
    this.destroyHeatmap(); // 关闭房顶要确认云图删除
}

// 事件
SiloHouse.prototype.setupEvents = function (obj) {
    var that = this;
    var obj = this.obj;

    // 单击
    this.roof.on('click', function () {
        if (SiloHouse.current)
            SiloHouse.current.unselect();
        SiloHouse.current = that;
        SiloHouse.current.select();
    });

    // 双击
    this.roof.on('dblclick', function () {
        if (SiloHouse.currentOpen == that)
            return;

        // 取消选中的
        if (SiloHouse.current) {
            SiloHouse.current.unselect();
            SiloHouse.current = null;
        }

        // 取消上一次打开的
        if (SiloHouse.currentOpen)
            SiloHouse.currentOpen.resetRoof();
        SiloHouse.currentOpen = that;

        // 打开屋顶
        that.openRoof();

        // 摄像机跳转
        var obj = SiloHouse.currentOpen.obj;
        app.camera.flyTo({//飞到
            offset: [0, 70, -30],
            target: obj,
            time: 1000,	// 耗时毫秒
            complete: function () {
                if (toolBar.data.cloud == true)
                    SiloHouse.currentOpen.createHeatmap();
            }
        });
    });
}

// 模拟数据
SiloHouse.prototype.simulateData = function (obj) {
    var that = this;
    this.info = {
        "基本信息": {
            "品种": Math.ceil(Math.random() * 2) == 1 ? "小麦" : "玉米",
            "库存数量": Math.ceil(Math.random() * 9000) + "",
            "报关员": Math.ceil(Math.random() * 2) == 1 ? "张三" : "李四",
            "入库时间": Math.ceil(Math.random() * 2) == 1 ? "11:24" : "19:02",
            "用电量": Math.ceil(Math.random() * 100) + "",
            "单仓核算": "无"
        },
        "粮情信息": {
            "仓房温度": Math.ceil(Math.random() * 27 + 25) + "",
            "粮食温度": Math.ceil(Math.random() * 25 + 20) + "",
        },
        "报警信息": {
            "火灾": "无",
            "虫害": "无"
        }
    };

    // 模拟间隔刷新的数据
    var simuTime = Math.ceil(1000 + Math.random() * 1000);
    setInterval(function () {
        that.temper = Math.ceil(20 + Math.random() * 10) + "℃"; // 温度
        that.humi = Math.ceil(30 + Math.random() * 10) + "%"; // 湿度
        that.power = Math.ceil(Math.random() * 20) + "kWh"; // 能耗
    }, simuTime);

}

//  头顶界面
SiloHouse.prototype.createUI = function (width) {
    width = width || 150;
    // 创建widget (动态绑定数据用)
    var panel = new THING.widget.Panel({
        template: 'default',
        cornerType: 's2c5',
        width: width.toString() + "px",
        isClose: false,
        opacity: 0.8,
        media: true
    });
    this.panel = panel;

    // 创建UIAnchor面板
    this.obj.registerComponent(THING.DOM.CSS3DComponent, 'css');

    // Create label
    const ui = this.obj.css;
    ui.factor = 0.15
    ui.pivot = [0, -1];
    ui.domElement = panel.domElement,
        ui.autoUpdateVisible = true;
    ui.visible = true;
    ui.offset = [0, this.height, 0]

    this.ui = ui;
    return panel;
}

SiloHouse.prototype.showUI = function (uiName, boolValue) {
    if (this.panel || this.ui)
        this.hideUI();

    if (boolValue) {
        if (uiName == 'number') {
            this.createUI().add(this.obj, 'id').caption('编号');
        } else if (uiName == 'temper') {
            this.createUI().add(this, uiName).caption('温度');
        } else if (uiName == 'humi') {
            this.createUI().add(this, uiName).caption('湿度');
        } else if (uiName == 'power') {
            this.createUI(150).add(this, uiName).caption('能耗');
        }
    }
}

SiloHouse.prototype.hideUI = function () {

    if (this.panel) {
        $(".ThingJS_Panel").remove(); // 移除面板
        this.panel = null;
    }
    if (this.ui) {
        $(".uiPanel").remove(); // 移除UI界面
        this.ui = null;
    }
}

//  云图相关
SiloHouse.prototype.createHeatmap = function () {

    var param = {
        localPosition: [5.5, 18, -23],
        type: "heatmap", //  "heatmap" or "mosaic" or "3Dheatmap"
        width: this.obj.boundingBox.size[0],//30,
        height: this.obj.boundingBox.size[2],
        minValue: 15,
        maxValue: 45,
        radius: 5,
        alpha: false, // 未插值区域是否透明（默认为 false ）
        //blur: 0.8, 
        mapSize: 246,
        gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' } // (Optional) Color gradient, the color value can be set to a color value that can be recognized by css
    };

    /*
    * @class Heatmap
    * 热力图
    * @memberof THING
    * @extends THING.BaseObject
    * @example */
    // creat heatmap
    this.heatMap = new THING.EXTEND.HeatmapLayer(param);
    let points = [];
    let count = 50;
    for (var i = 0; i < count; i++) {
        // positions
        var x = THING.Math.randomFloat(-80, 20)
        var y = THING.Math.randomFloat(0, 3);
        var z = THING.Math.randomFloat(-40, 85);
        points[i] = [x, y, z];
    }
    this.heatMap.setData(points);
    const gui = new dat.GUI();
    this.heatMap.position = [this.obj.position[0], this.obj.position[1] + 12, this.obj.position[2]];
}

SiloHouse.prototype.destroyHeatmap = function () {
    if (!this.heatMap)
        return;
    this.heatMap.destroy();
    this.heatMap = null;
}

// 统计信息 (处理全局唯一一个面板)
SiloHouse.prototype.showSummery = function (boolValue) {
    if (SiloHouse.summeryPanel) {
        SiloHouse.summeryPanel.destroy();
        SiloHouse.summeryPanel = null;
    }

    if (boolValue) {
        SiloHouse.summeryPanel = new THING.widget.Panel({
            template: 'default',
            name: this.name,
            isClose: true,
            isDrag: true,
            isRetract: true,
            hasTitle: true,
            width: "325px",
            media: true
        });
        SiloHouse.summeryPanel.setZIndex(999999);//设置ui排序
        SiloHouse.summeryPanel.addTab(this.info);
        SiloHouse.summeryPanel.setPosition({ left: 300, top: 50 });
    }
}

// ----------------------------------------------------------------------------
// 摄像头封装类
function VideoCamera(obj) {
    this.obj = obj;
    this.videoFrame = null;
    var that = this;
    this.marker = new THING.Marker({
        type: "Marker",
        offset: [0, 3.5, 0],
        localPosition: [0, 0, 0],
        parent: obj,
        scale: [15, 15, 15],
        pivot: [0.5, 0],
        style: { image: new THING.ImageTexture("https://www.thingjs.com/static/images/sliohouse/videocamera3.png") }
    })
    this.marker.visible = false;
    this.marker.on('click', function () {
        that.showVideoFrame();
    });
}

VideoCamera.prototype.showUI = function (boolValue) {
    this.marker.visible = boolValue;
}

VideoCamera.prototype.showVideoFrame = function () {
    if (this.videoFrame) {
        this.videoFrame.destroy();
        this.videoFrame = null;
    }
    this.videoFrame = new THING.widget.Panel({
        template: 'default',
        name: this.obj.name,
        isClose: true,
        isDrag: true,
        hasTitle: true,
        width: "450px",
        media: true
    });
    var ui2data = { iframe: true };
    var videoUrlList = ["https://gctxyc.liveplay.myqcloud.com/gc/ljgcdyhxgjt_1/index.m3u8?contentid=2820180516001", "http://gcdnc.v.dwion.com/gc/ljgcwglytylxs_1/index.m3u8?contentid=2820180516001", "https://gctxyc.liveplay.myqcloud.com/gc/hswlf_1/index.m3u8?contentid=2820180516001"];//大研花巷观景,万古楼遥望玉龙雪山,黄山卧云峰
    this.videoFrame.addIframe(ui2data, 'iframe').name("　").iframeUrl('https://www.thingjs.com/demos/player/player.html?url=' + videoUrlList[parseInt((videoUrlList.length) * Math.random())]).setHeight('321px');
    //  this.videoFrame.setPosition({ left: app.domElement.offsetWidth - this.videoFrame.domElement.offsetWidth - 100, top: 100 });// ui位置默认在 右上角   
    this.videoFrame.setZIndex(999999);

    var that = this;
    this.videoFrame.on('close', function () {
        if (that.videoFrame) {
            that.videoFrame.destroy();
            that.videoFrame = null;
        }
    });
}

// ----------------------------------------------------------------------------
// 卡车封装类
function Truck(obj) {
    this.obj = obj;
    this.info = { "车牌": "京A12345", "公司": "北京优锘科技股份有限公司", "状态": "出库", "仓房": "1号", "状态": "过磅" };
}

Truck.prototype.createUI = function (width) {
    // 创建widget (动态绑定数据用)
    var panel = new THING.widget.Panel({
        cornerType: 'polyline',
        width: "350px",
        isClose: false,
        opacity: 0.8,
        media: true
    });
    for (var key in this.info)
        panel.add(this.info, key);
    this.panel = panel;

    // 创建obj ui (跟随物体用)
    this.obj.registerComponent(THING.DOM.CSS3DComponent, 'css');
    const ui = this.obj.css;
    ui.factor = 0.2
    ui.pivot = [0, -0.2];
    ui.domElement = this.panel.domElement,
        ui.autoUpdateVisible = true;
    ui.visible = true;
    this.ui = ui;
    return this.panel;
}
Truck.prototype.showUI = function (boolValue) {
    if (this.ui || this.panel)
        this.hideUI();
    if (boolValue)
        this.createUI();
}
Truck.prototype.hideUI = function (width) {
    if (this.panel) {
        $(".ThingJS_Panel").remove(); // 移除面板
        this.panel = null;
    }
    if (this.ui) {
        $(".uiPanel").remove(); // 移除UI界面
        this.ui = null;
    }
}
//-----------------------------------------------------------------------------
// 应用入口
var toolBarState = true;
var startFps = false;
var fpsControl = null;
const app = new THING.App();
const baseURL = "https://static.3dmomoda.com/skybox/1d5ad8e9f580675ee5e7c7f7/";
const image = new THING.ImageTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);
app.envMap = image;
app.background = image;
THING.Utils.loadFile([
    'https://www.thingjs.com/uploads/wechat/380701/file/2/thing.compatible.umd.minV1.0.0.js',
], {
    load: function () {
        THING.COMPATIBLE.enableCompatible(true)
        // 加载场景包
        var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/silohouse');
        // 加载场景后执行
        bundle.waitForComplete().then(() => {
            const campus = bundle.campuses[0];
            var floor = app.query('.Floor')[0]; // 获取楼层对象
            app.levelManager.change(floor); // 开启层级切换
            app.camera.position = [98.5, 176.3, 218.5];
            app.camera.target = [19.7, -47.8, -22.5];
            init();
            init_gui();
        });
    }
})
var siloHouseList = [];
var videoCameraList = [];
var truckList = [];
function init() {
    // 摄像机
    app.camera.flyTo({
        time: 1500,
        position: [-182.16900300883736, 53.24677728392183, 72.21965470775368],
        target: [-68.1412926741533, -18.16319203074775, -23.30416731768694]
    });
    // 设置效果
    app.camera.postEffect.enable = true;
    app.camera.postEffect.colorCorrection = ({
        enable: true,
        brightness: 0,
        contrast: 1.15,
        exposure: 0,
        gamma: 1,
        saturation: 1.3
    })
    app.camera.postEffect.FXAA.enable = true;
    app.camera.postEffect.screenSpaceAmbientOcclusion.enable = false;

    app.scene.ambientLight.intensity = 0.4;
    app.scene.ambientLight.color = '#FFFFFF';
    app.scene.mainLight.shadow = true;
    app.scene.mainLight.intensity = 0.6;
    app.scene.mainLight.color = '#FFFFFF';
    app.scene.mainLight.alpha = 45;
    app.scene.mainLight.beta = 0;

    // 粮仓
    app.query('["userData/物体类型"="粮仓"]').forEach(function (obj) {
        var siloHouse = new SiloHouse(obj);
        siloHouseList.push(siloHouse);
    });


    // 摄像头
    app.query('["userData/物体类型"="摄像头"]').forEach(function (obj) {
        videoCameraList.push(new VideoCamera(obj));
    });

    //卡车 
    create_truck();
    app.query('["userData/物体类型"="卡车"]').forEach(function (obj) {
        var truck = new Truck(obj)
        truckList.push(truck);
    });

    // ----------------------------------------------------------------------------------
    // 单击 如果没拾取到，则取消上次选择的粮仓

    app.on('singleclick', function (event) {
        if (event.object == null || event.object.getAttribute("userData/物体类型") != '粮仓') {
            if (SiloHouse.current) {
                SiloHouse.current.unselect();
                SiloHouse.current = null;
            }
        }
    });

    // 双击 如果没pick到，则取消上次打开的粮仓  
    app.on('dblclick', function (event) {
        if (event.object == null || event.object.getAttribute("userData/物体类型") != '粮仓') {
            if (SiloHouse.currentOpen) {
                SiloHouse.currentOpen.resetRoof();
                SiloHouse.currentOpen = null;
            }
        }
    });

    // 右键 则取消上次打开的粮仓 
    var mouseDownPos = null;
    app.on('mousedown', function (event) {
        if (event.button == 2)
            mouseDownPos = [event.x, event.y];
    });
    app.on('click', function (event) {
        if (event.button == 2 && THING.Math.getDistance(mouseDownPos, [event.x, event.y]) < 4) { // 小于4像素执行click事件
            if (SiloHouse.currentOpen) {
                SiloHouse.currentOpen.resetRoof();
                SiloHouse.currentOpen = null;
            }
        }
    });

    // 屏蔽鼠标右键系统菜单
    document.body.oncontextmenu = function (evt) {
        evt = evt || event;
        evt.returnValue = false;
        return false;
    };
    /*
    // 第一人称
    fpsControl = new THING.WalkControl({
        enableKeyRotate: true, walkSpeed: 0.02, turnSpeed: 0.25, gravity: 29.8, eyeHeight: 1.6, jumpSpeed: 10
    });
    */
}

// ----------------------------------------------------------------------------------
// 定位相关，演示只创建一个卡车
var positionList = [];// 人车定位相关
var truckInfo = { "车牌": "京A12345", "公司": "北京优锘科技股份有限公司", "状态": "出库", "仓房": "1号", "状态": "过磅" };
var wayPointList = ["#L109", "#L110", "#L104", "#L103", "#L102", "#L108", "#L109", "#L118", "#L119", "#L112", "#L111", "#L117", "#L118"];
function create_truck() {
    // 生成path，从场景中物体取得位置
    var path = [];
    for (var i = 0; i < wayPointList.length; i++) {
        var pObj = app.query(wayPointList[i])[0];
        if (!pObj)
            continue;
        path.push(pObj.position);
    }
    // 创建卡车并行走路径
    truck = new THING.Entity({
        // 参数传入模型的url
        name: '卡车',
        url: 'https://www.thingjs.com/static/models/truck',
        name: "truck"
    });

    truck.movePath(path, {
        time: 50 * 1000,
        next: function (ev) {
            // 获取相对下一个目标点位的旋转值
            var quaternion = THING.Math.getQuatFromTarget(ev.to, ev.from, [0, 1, 0]);
            // 在 1 秒内将物体转向到目标点位
            ev.object.lerp.to({
                to: {
                    quaternion,
                },
                time: 100,
            });
        },
        loopType: THING.LoopType.Repeat,
    })

    truck.setAttribute("userData/物体类型", '卡车')
}

// ----------------------------------------------------------------------------
// 界面相关
var toolBar = null;
function init_gui() {//ui 初始化
    var baseURL = "https://www.thingjs.com/static/images/sliohouse/";
    toolBar = new THING.widget.Banner({ template: 'default', column: 'left' });
    toolBar.data = { number: false, temper: false, humi: false, power: false, store: false, video: false, cloud: false, location: false };
    var img0 = toolBar.addImageBoolean(toolBar.data, 'number').caption('仓库编号').imgUrl(baseURL + 'warehouse_code.png');
    var img1 = toolBar.addImageBoolean(toolBar.data, 'temper').caption('温度检测').imgUrl(baseURL + 'temperature.png');
    var img2 = toolBar.addImageBoolean(toolBar.data, 'humi').caption('湿度检测').imgUrl(baseURL + 'humidity.png');
    var img3 = toolBar.addImageBoolean(toolBar.data, 'power').caption('能耗统计').imgUrl(baseURL + 'statistics.png');
    var img4 = toolBar.addImageBoolean(toolBar.data, 'store').caption('粮食储量').imgUrl(baseURL + 'cereals_reserves.png');
    var img5 = toolBar.addImageBoolean(toolBar.data, 'video').caption('视频监控').imgUrl(baseURL + 'video.png');
    var img6 = toolBar.addImageBoolean(toolBar.data, 'cloud').caption('温度云图').imgUrl(baseURL + 'cloud.png');
    var img7 = toolBar.addImageBoolean(toolBar.data, 'location').caption('人车定位').imgUrl(baseURL + 'orientation.png');
    img0.on('change', function (boolValue) { onChangeImageButton('number', boolValue); });
    img1.on('change', function (boolValue) { onChangeImageButton('temper', boolValue); });
    img2.on('change', function (boolValue) { onChangeImageButton('humi', boolValue); });
    img3.on('change', function (boolValue) { onChangeImageButton('power', boolValue); });
    img4.on('change', function (boolValue) { onChangeImageButton('store', boolValue); });
    img5.on('change', function (boolValue) { onChangeImageButton('video', boolValue); });
    img6.on('change', function (boolValue) { onChangeImageButton('cloud', boolValue); });
    img7.on('change', function (boolValue) { onChangeImageButton('location', boolValue); });
}

// 处理工具条按钮
function onChangeImageButton(key, boolValue) {
    // 更新界面绑定对象，其中排除 云图 和 人车定位
    if (boolValue) {
        for (var elem in toolBar.data) {
            if (elem == "cloud" || elem == "location" || elem == key)
                continue;
            toolBar.data[elem] = false;
        }
    }

    // 分类别处理
    if (key == "cloud") { // 云图
        if (!boolValue) {
            if (SiloHouse.currentOpen)
                SiloHouse.currentOpen.destroyHeatmap();
        } else {
            if (SiloHouse.currentOpen && app.camera.flying == false)
                SiloHouse.currentOpen.createHeatmap();
        }
    } else if (key == "location") { // 人车定位
        truckList.forEach(function (tr) {
            tr.showUI(boolValue);
        });
    } else if (key == "video") { // 视频监控
        videoCameraList.forEach(function (vc) {
            vc.showUI(boolValue);
        });
    } else if (key == "store") { // 储量
        siloHouseList.forEach(function (siloHouse) {
            siloHouse.hideUI();
            siloHouse.obj.visible = !boolValue;
        });
    } else { // 其他粮仓UI显示
        siloHouseList.forEach(function (siloHouse) {
            siloHouse.showUI(key, boolValue);
        });
    }
}

function changeFPS(start) {
    if (start) {
        app.addControl(fpsControl);
    } else {
        app.removeControl(fpsControl);
    }
}