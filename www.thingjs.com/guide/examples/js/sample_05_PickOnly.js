/**
 * 说明：鼠标拾取透明建筑内的物体
 * 难度：★★★☆☆
 */
// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});
app.on('load', function(ev) {
    app.level.change(ev.campus);
    initThingJsTip("建筑内部的物体在园区层级下默认是无法进行拾取的，但是我们提供了暂停园区层级的默认选择的方法，可以通过自定义事件实现对透明建筑内部的 Thing 类物体的拾取操作");
})

//  修改进入层级选择设置
// {String} ev.level 当前层级标识枚举值 可通过 THING.LevelType 获取枚举值，如建筑层级标识为 THING.LevelType.Building
// {THING.BaseObject} ev.object 当前层级对象（将要进入的层级对象）
// {THING.BaseObject} ev.current 当前层级对象（将要进入的层级对象）
// {THING.BaseObject} ev.previous 上一层级对象（离开的层级对象）
app.on(THING.EventType.EnterLevel, '.Campus', function(ev) {
    app.picker.pickedResultFunc = function(obj) {
        if (obj instanceof THING.Thing) {
            return obj;
        }
        return null;
    }
}, 'customLevelPickedResultFunc');
// 暂停园区层级的默认选择行为
app.pauseEvent(THING.EventType.EnterLevel, '.Campus', THING.EventTag.LevelPickedResultFunc);

app.on(THING.EventType.EnterLevel, '.Campus', function() {
    var build = app.buildings[0];
    build.floors.visible = true;
    build.floors[0].things.inheritStyle = false;
    build.style.opacity = 0.2;
    build.pickable = false;
    build.floors.forEach(function(floor) {
        floor.pickable = false;
    })
    build.floors[0].things.forEach(function(thing) {
        thing.pickable = true;
    })
})