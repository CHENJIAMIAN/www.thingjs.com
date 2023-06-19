/**
 * @version 2.0
 * @author ThingJS
 * 说明：鼠标拾取透明建筑内的物体
 * 难度：★★★☆☆
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
window.app = app;
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example', {
    external: { buildingShowObjects: false }, //设置在建筑层级是否显示室内物体
    assets: true, //是否加载资源
    ignoreTheme: true  //是否忽略科幻
});

bundle.waitForComplete().then(() => {
    initThingJsTip("建筑内部的物体在园区层级下默认是无法进行拾取的，但是我们提供了暂停园区层级的默认选择的方法，可以通过自定义事件实现对透明建筑内部的 Thing 类物体的拾取操作");
    const campus = bundle.campuses[0];
    if (campus) {
        app.levelManager.changeAsync(campus);
    }
    // app.picker.enable = true;
})

app.on(THING.EventType.RegisterLevelAction, '.Campus', function (ev) {

    var effectAction = ev.actionQueue.getByName('effect');

    effectAction.onFilterObject = (obj) => {
        if (!obj.parents.find('.Building')) {
            return false;
        }
        return obj.isWall || obj.isSlab || obj.isFacade || obj.isWindow || obj.isDoor || obj.isCeiling || obj.isRoof;
    }

    effectAction.onApplyObject = (object, flag) => {
        object.visible = true;
        if (flag) {
            object.style.opacity = 0.2;
        }
    }

    var eventAction = ev.actionQueue.getByName('event');

    eventAction.onFilterObject = (object) => {
        const isThing = object.isThing;
        object.pickable = isThing;
        return isThing;
    }

    eventAction.onMapObject = (object) => {
        if (object.parents.find('.Misc || .Ground')) {
            return;
        }
        return object;
    }
});