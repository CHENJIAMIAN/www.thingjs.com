/**
 * @version 2.0
 * @author ThingJS
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
window.app = app;

// 加载场景包，并在创建campus成功时切换层级
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then((ev) => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    app.levelManager.change(campus); // 开启层级切换

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
   // // 重置
        // reset();

        initThingJsTip("修改默认进入层级飞行响应，双击进入建筑层级，展开楼层");

        // 进入建筑摊开楼层
        app.on(THING.EventType.AfterEnterLevel, '.Building', function (ev) {
            var previous = ev.previous;  // 上一层级

            ev.current.expandFloors({
                'time': 1000,
                'complete': function () {
                    console.log('ExpandFloor complete ');
                }
            });
        },'customEnterBuildingOperations');
       

        //  退出建筑关闭摊开的楼层
        app.on(THING.EventType.AfterLeaveLevel, '.Building', function (ev) {
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
    app.on(THING.EventType.AfterEnterLevel, '.Thing', function (ev) {
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
    

    // 修改退出层级场景响应
    app.on(THING.EventType.AfterLeaveLevel, '.Thing', function (ev) {
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
    // // 重置
    // reset();

    initThingJsTip("修改默认进入层级背景，进入楼层层级，修改背景");

    // 进入楼层设置背景
    app.on(THING.EventType.AfterEnterLevel, '.Floor', function (ev) {
        var prev = ev.prev;  // 上一层级
           if ( prev instanceof THING.Building) {
           app.background = '/uploads/wechat/emhhbmd4aWFuZw==/file/img/bg_grid.png';
        };
        
    }, 'setFloorBackground');
  
    // 退出楼层设置背景
    app.on(THING.EventType.AfterLeaveLevel, '.Floor', function (ev) {
        app.background = null;
        var current = ev.current;  // 当前层级

        // 从楼层退出到建筑时
        if (current instanceof THING.Campus) {
            app.background = null;
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

    // app.resumeEvent(THING.EventType.LeaveLevel, '.Campus', THING.EventTag.LevelSceneOperations);
    // app.resumeEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelSetBackground);
    // app.resumeEvent(THING.EventType.EnterLevel, '.Floor', THING.EventTag.LevelSetBackground);
    // app.resumeEvent(THING.EventType.EnterLevel, '.Thing', THING.EventTag.LevelSceneOperations);

    app.off(THING.EventType.AfterEnterLevel, '.Building', 'customEnterBuildingOperations');
    app.off(THING.EventType.AfterLeaveLevel, '.Building', 'customLeaveBuildingOperations');
    app.off(THING.EventType.AfterEnterLevel, '.Floor', 'setFloorBackground');
    app.off(THING.EventType.AfterLeaveLevel, '.Floor', 'customLeaveFloorOperations');
    app.off(THING.EventType.AfterEnterLevel, '.Thing', 'customEnterThingOperations');
    app.off(THING.EventType.AfterLeaveLevel, '.Thing', 'customLeaveThingOperations');

    var curLevel = app.levelManager.current;  // 当前层级
    app.background = null;

    if (curLevel instanceof THING.Building) {
        curLevel.unexpandFloors({
            'time': 500,
            'complete': function () {
                console.log('Unexpand complete ');
            }
        });
    }
     const campus = bundle.campuses[0];
    app.levelManager.change(campus);
}