/**
 * 说明：通过动态加载场景 动态加载建筑里的楼层
 * 操作：双击建筑，动态加载场景
 */

var dataObj = { progress: 0 };  // 场景加载进度条数据对象
var loadingPanel;  // 进度条界面组件
var curCampus;

// 配置相应建筑的园区场景url
var campusUrl = [{
    name: "园区A",
    url: "https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%8A%A8%E6%80%81%E5%B1%82%E7%BA%A7%E5%A4%96%E7%AB%8B%E9%9D%A2"
}, {
    name: "园区B",
    url: "https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%9B%BE%E4%B9%A6%E9%A6%86%E5%A4%96"
}];
var buildingConfig = {
    '商业A楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%95%86%E4%B8%9AA%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '商业B楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%95%86%E4%B8%9AB%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '商业C楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%95%86%E4%B8%9AC%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '商业D楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%95%86%E4%B8%9AD%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '商业E楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%95%86%E4%B8%9AE%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '住宅A楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E4%BD%8F%E5%AE%85%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '住宅B楼': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E4%BD%8F%E5%AE%85%E6%A5%BC%E5%B1%82%E7%BA%A7',
    '图书馆': 'https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%95%86%E4%B8%9AC%E6%A5%BC%E5%B1%82%E7%BA%A7',
};

var app = new THING.App({
    "url": "https://www.thingjs.com/./uploads/wechat/oLX7p0wh7Ct3Y4sowypU5zinmUKY/scene/%E5%8A%A8%E6%80%81%E5%B1%82%E7%BA%A7%E5%A4%96%E7%AB%8B%E9%9D%A2",
    "skyBox": "Universal",
});

// 主场景加载完后 删掉楼层
app.on('load', function (ev) {
    curCampus = ev.campus;
    // 进入层级切换
    app.level.change(ev.campus);
    initThingJsTip("本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：园区A");
    // 园区加载完成后，将园区中建筑下的楼层删除（Floor）
    for (var i = 0; i < ev.buildings.length; i++) {
        ev.buildings[i].floors.destroy();
    }

    new THING.widget.Button('切换场景', changeScene);  // 切换场景

    createWidgets();
});

/**
 * 切换场景
 */
function changeScene() {
    var url = curCampus.url;  //　当前园区url

    // 动态创建园区
    if (url === campusUrl[0].url) {
        createCampus(campusUrl[1]);
    } else {
        createCampus(campusUrl[0]);
    }
}

/**
 * 创建园区
 */
function createCampus(obj) {
    app.create({
        type: "Campus",
        url: obj.url,
        position: [0, 0, 0],
        visible: false, // 创建园区过程中隐藏园区
        complete: function (ev) {
            initThingJsTip('本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：' + obj.name);
            curCampus.destroy();  // 新园区创建完成后删除之前的
            curCampus = ev.object;  // 将新园区赋给全局变量
            curCampus.fadeIn();  // 创建完成后显示（渐现）
            app.level.change(curCampus);  // 开启层级切换

            var building = app.query(".Building");  // 获取园区中的建筑
            // 园区加载完成后，将园区中建筑下的楼层删除（Floor）
            for (var i = 0; i < building.length; i++) {
                building[i].floors.destroy();
            }
        }
    });
}

/**
 * 卸载动态创建的园区
 */
app.on(THING.EventType.LeaveLevel, '.Building', function (ev) {
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
app.on(THING.EventType.EnterLevel, '.Building', function (ev) {
    var buildingMain = ev.object;  // 获取当前建筑对象
    var buildingName = buildingMain.name;  // 获取当前建筑名称

    var preObject = ev.previous;  // 上一层级的物体

    // 如果是从楼层退出 进入Building的 则不做操作
    if (preObject instanceof THING.Floor) return;

    initThingJsTip(buildingName + '正在加载！');

    loadingPanel.visible = true;

    // 暂停进入建筑时的默认飞行操作，等待楼层创建完成
    app.pauseEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelFly);
    // 暂停单击右键返回上一层级功能
    app.pauseEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation);

    // 动态创建园区
    var campusTmp = app.create({
        type: 'Campus',
        // 根据不同的建筑，传入园区相应的url
        url: buildingConfig[buildingName],
        // 在回调中，将动态创建的园区和园区下的建筑删除 只保留楼层 并添加到相应的建筑中
        complete: function () {
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

            // 恢复默认的进入建筑飞行操作
            app.resumeEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelFly);
            // 恢复单击右键返回上一层级功能
            app.resumeEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation);

            // 这一帧内 暂停自定义的 “进入建筑创建楼层” 响应
            app.pauseEventInFrame(THING.EventType.EnterLevel, '.Building', '进入建筑创建楼层');
            // 触发进入建筑的层级切换事件 从而触发内置响应
            buildingMain.trigger(THING.EventType.EnterLevel, ev);
            initThingJsTip(buildingName + '加载完成！');
        }
    });
}, '进入建筑创建楼层', 51);


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