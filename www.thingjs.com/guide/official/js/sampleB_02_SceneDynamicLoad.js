/**
 * @version 2.0
 * @author ThingJS
 * 说明：通过动态加载场景 动态加载建筑里的楼层
 * 操作：双击建筑，动态加载场景
 */

//园区destroy后，场景中没了，但bundle.campuses依然有场景参数

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 创建天空盒
var cubeTexture = new THING.CubeTexture([
    'https://www.thingjs.com/static/skyboxes/BlueSky/posx.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negx.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posy.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negy.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posz.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negz.jpg'
]);
app.background = cubeTexture; // 设置背景资源贴图资源
app.envMap = cubeTexture; // 设置环境图样式


var dataObj = { progress: 0 };  // 场景加载进度条数据对象
var loadingPanel;  // 进度条界面组件
var curBundle;
var bundle;

//配置相应建筑的园区场景url
var bundleUrl = [{
    name: "园区A",
    url: "https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/动态层级外立面"
}, {
    name: "园区B",
    url: "https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/图书馆外"
}];
var buildingConfig = {
    '商业A楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/商业A楼层级',
    '商业B楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/商业B楼层级',
    '商业C楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/商业C楼层级',
    '商业D楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/商业B楼层级',
    '商业E楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/商业E楼层级',
    '住宅A楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/住宅楼层级',
    '住宅B楼': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/住宅楼层级',
    '图书馆': 'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/商业C楼层级',
};
// 加载场景包
bundle = app.loadBundle(bundleUrl[0].url)//'https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/图书馆外');

bundle.waitForComplete().then((ev) => {
    curBundle = bundle.campuses[0]
    app.levelManager.change(bundle.campuses[0]);
    initThingJsTip("本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：园区A");
    // 园区加载完成后，将园区中建筑下的楼层删除（Floor）
    var length = bundle.campuses[0].buildings.length
    for (var i = 0; i < length; i++) {
        bundle.campuses[0].buildings[i].floors.destroy();
    }

    new THING.widget.Button('切换场景', changeScene);  // 切换场景

    //createWidgets();
})

/**
 * 切换场景
 */
function changeScene() {
    var url = bundle.url;

    //动态创建园区
    if (url === bundleUrl[0].url) {
        createCampus(bundleUrl[1]);
    } else {
        createCampus(bundleUrl[0]);
    }
}

/**
 * 创建园区
 */
function createCampus(obj) {
    bundle = app.loadBundle(obj.url)
    var url = bundle.url;  //　当前园区url
    bundle.waitForComplete().then((ev) => {
        initThingJsTip('本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：' + obj.name);
        curBundle.destroy();// 新园区创建完成后删除之前的

        curBundle = null;
        curBundle = bundle.campuses  // 将新园区赋给全局变量
        let a = curBundle.length;

        // bundle.campuses[1].fadeIn();  // 创建完成后显示（渐现）
        app.levelManager.change(curBundle);//bundle.campuses[1]);  // 开启层级切换

        var building = app.query(".Building");  // 获取园区中的建筑
        // 园区加载完成后，将园区中建筑下的楼层删除（Floor）
        for (var i = 0; i < building.length; i++) {
            building[i].floors.destroy();
        }
    })
}

/**
 * 卸载动态创建的园区
 */
app.on(THING.EventType.AfterLeaveLevel, '.Building', function (ev) {
    var current = ev.current;
    if (current.type == "Campus") {
        var building = ev.previous;  // 获取之前的层级
        if (!building) return;
        building._isAlreadyBuildedFloors = false;
        if (building.floors) building.floors.destroy();

        var url = curCampus.url;  //　当前园区url
        if (url === campusUrl[0].url) {
            initThingJsTip('本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：' + campusUrl[0].name);
        } else {
            initThingJsTip('本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：' + campusUrl[1].name);
        }
    }
}, '退出建筑时卸载建筑下的楼层');

// 进入建筑时 动态加载园区
app.on(THING.EventType.AfterEnterLevel, '.Building', function (ev) {
    var buildingMain = ev.object;  // 获取当前建筑对象
    var buildingName = buildingMain.name;  // 获取当前建筑名称

    var preObject = ev.previous;  // 上一层级的物体

    // 如果是从楼层退出 进入Building的 则不做操作
    if (preObject instanceof THING.Floor) return;

    initThingJsTip(buildingName + '正在加载！');

    loadingPanel.visible = true;

    // // 暂停进入建筑时的默认飞行操作，等待楼层创建完成
    // app.pauseEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelFly);
    // // 暂停单击右键返回上一层级功能
    // app.pauseEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation);

    // 动态创建园区
    bundle = app.loadBundle(buildingConfig[buildingName])
    var buildingTmp = campusTmp.buildings[0];
    buildingTmp.floors.forEach(function (floor) {
        buildingMain.add({
            object: floor,
            // 设置相对坐标，楼层相对于建筑的位置保持一致
            localPosition: floor.localPosition
        });
    })

    // 楼层添加后，删除园区以及内部的园区建筑
    buildingTmp.destroy();
    campusTmp.destroy();

    loadingPanel.visible = false;

    // // 恢复默认的进入建筑飞行操作
    // app.resumeEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelFly);
    // // 恢复单击右键返回上一层级功能
    // app.resumeEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation);

    // 这一帧内 暂停自定义的 “进入建筑创建楼层” 响应
    app.pauseEventInFrame(THING.EventType.AfterEnterLevel, '.Building', '进入建筑创建楼层');
    // 触发进入建筑的层级切换事件 从而触发内置响应
    buildingMain.trigger(THING.EventType.AfterEnterLevel, ev);
    initThingJsTip(buildingName + '加载完成！');
}, '进入建筑创建楼层', 51);

//不生效
app.on(THING.EventType.LoadCampusProgress, function (ev) {
    var value = ev.progress;
    dataObj.progress = value;
}, '加载场景进度');

/**
 * 创建进度条组件
 */
function createWidgets() {
    // 进度条界面组件
    loadingPanel = new THING.widget.Panel({
        titleText: '场景加载进度',
        opacity: 0.9, // 透明度
        hasTitle: true
    });

    // 设置进度条界面位置
    loadingPanel.positionOrigin = 'TR'// 基于界面右上角定位
    loadingPanel.position = ['100%', 0];

    loadingPanel.visible = false;

    loadingPanel.addNumberSlider(dataObj, 'progress').step(0.01).min(0).max(1).isPercentage(true);
}