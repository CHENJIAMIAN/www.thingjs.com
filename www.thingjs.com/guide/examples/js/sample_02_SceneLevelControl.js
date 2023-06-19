/**
 * 说明：自定义层级切换效果
 * 功能：
 *      1.进入建筑层级摊开楼层
 *      2.进入楼层层级更换背景图
 *      3.双击物体，播放模型动画
 * 操作：点击按钮
 */
// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    skyBox: 'Night',
    env: 'Seaside',
});

// 初始化完成后开启场景层级
var campus;
app.on('load', function (ev) {
    campus = ev.campus;
    // 将层级切换到园区 开启场景层级
    app.level.change(ev.campus);
    initThingJsTip("本例程修改了原有进入层级的默认响应，自定义了新的层级响应。点击按钮，查看效果");
    new THING.widget.Button('修改层级飞行响应', setEnterFly);
    new THING.widget.Button('修改层级场景响应', setEnterLevel);
    new THING.widget.Button('修改层级背景', setEnterBack);
    new THING.widget.Button('重置', reset);
});

/**
 * 修改默认的层级飞行响应
 * 双击进入建筑层级，展开楼层
 * 退出建筑关闭摊开的楼层
 */
function setEnterFly() {
    // 重置
    reset();

    initThingJsTip("修改默认进入层级飞行响应，双击进入建筑层级，展开楼层");

    //  暂停默认退出园区行为
    app.pauseEvent(THING.EventType.LeaveLevel, '.Campus', THING.EventTag.LevelSceneOperations);

    // 进入建筑摊开楼层
    app.on(THING.EventType.EnterLevel, '.Building', function (ev) {
        var previous = ev.previous;  // 上一层级

        ev.current.expandFloors({
            'time': 1000,
            'complete': function () {
                console.log('ExpandFloor complete ');
            }
        });
    }, 'customEnterBuildingOperations');
    // 进入建筑保留天空盒
    app.pauseEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelSetBackground);

    //  退出建筑关闭摊开的楼层
    app.on(THING.EventType.LeaveLevel, '.Building', function (ev) {
        var current = ev.current;  // 当前层级

        ev.object.unexpandFloors({
            'time': 500,
            'complete': function () {
                console.log('Unexpand complete ');
            }
        });
    }, 'customLeaveBuildingOperations');
}

/**
 * 修改进入层级场景响应
 * @property {Object} ev 进入物体层级的辅助数据
 * @property {THING.BaseObject} ev.object 当前层级
 * @property {THING.BaseObject} ev.current 当前层级
 * @property {THING.BaseObject} ev.previous 上一层级
 */
function setEnterLevel() {
    // 重置
    reset();

    initThingJsTip("修改默认进入层级场景响应，双击飞到物体，其他物体渐隐（若物体存在动画，则播放动画）");

    // 修改进入层级场景响应
    app.on(THING.EventType.EnterLevel, '.Thing', function (ev) {
        var object = ev.object;

        // 其他物体渐隐
        var things = object.brothers.query('.Thing');
        things.fadeOut();

        // 尝试播放动画
        if (object.animationNames.length) {
            object.playAnimation({
                name: object.animationNames[0],
            });
        }
    }, 'customEnterThingOperations');
    // 停止进入物体层级的默认行为
    app.pauseEvent(THING.EventType.EnterLevel, '.Thing', THING.EventTag.LevelSceneOperations);

    // 修改退出层级场景响应
    app.on(THING.EventType.LeaveLevel, '.Thing', function (ev) {
        var object = ev.object;

        // 其他物体渐现
        var things = object.brothers.query('.Thing');
        things.fadeIn();

        // 反播动画
        if (object.animationNames.length) {
            object.playAnimation({
                name: object.animationNames[0],
                reverse: true
            });
        }
    }, 'customLeaveThingOperations');
}

/**
 * 进入楼层设置背景
 * 进入楼层层级，修改背景
 */
function setEnterBack() {
    // 重置
    reset();

    initThingJsTip("修改默认进入层级背景，进入楼层层级，修改背景");
    
    // 进入楼层设置背景
    app.on(THING.EventType.EnterLevel, '.Floor', function (ev) {
        var previous = ev.previous;  // 上一层级

        // 从建筑进入楼层时
        if (previous instanceof THING.Building) {
            app.background = '/uploads/wechat/emhhbmd4aWFuZw==/file/img/bg_grid.png';
        }
    }, 'setFloorBackground');
    // 停止进入楼层层级的默认行为
    app.pauseEvent(THING.EventType.EnterLevel, '.Floor', THING.EventTag.LevelSetBackground);

    // 退出楼层设置背景
    app.on(THING.EventType.LeaveLevel, '.Floor', function (ev) {
        var current = ev.current;  // 当前层级

        // 从楼层退出到建筑时
        if (current instanceof THING.Building) {
            app.background = null;
            app.skyBox = "Night";
        }
    }, 'customLeaveFloorOperations');
}

/**
 * 重置
 * app.resumeEvent 暂停事件
 * app.off 卸载事件
 */
function reset() {
    // 创建提示
    initThingJsTip('本例程修改了原有进入层级的默认响应，自定义了新的层级响应。点击按钮，查看效果');
    
    app.resumeEvent(THING.EventType.LeaveLevel, '.Campus', THING.EventTag.LevelSceneOperations);
    app.resumeEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelSetBackground);
    app.resumeEvent(THING.EventType.EnterLevel, '.Floor', THING.EventTag.LevelSetBackground);
    app.resumeEvent(THING.EventType.EnterLevel, '.Thing', THING.EventTag.LevelSceneOperations);

    app.off(THING.EventType.EnterLevel, '.Building', 'customEnterBuildingOperations');
    app.off(THING.EventType.LeaveLevel, '.Building', 'customLeaveBuildingOperations');
    app.off(THING.EventType.EnterLevel, '.Floor', 'setFloorBackground');
    app.off(THING.EventType.LeaveLevel, '.Floor', 'customLeaveFloorOperations');
    app.off(THING.EventType.EnterLevel, '.Thing', 'customEnterThingOperations');
    app.off(THING.EventType.LeaveLevel, '.Thing', 'customLeaveThingOperations');

    var curLevel = app.level.current;  // 当前层级

    app.skyBox = 'Night';  // 设置天空盒

    if (curLevel instanceof THING.Building) {
        curLevel.unexpandFloors({
            'time': 500,
            'complete': function () {
                console.log('Unexpand complete ');
            }
        });
    }
    app.level.change(campus);
}
