/**
 * 说明：展示楼层中的内部结构
 * 功能：展示楼层内的Thing物体、门、墙、misc、地板、屋顶、房间面积
 * 备注：楼层下，只有在CampusBuilder中编辑了UserID、Name或自定义属性的物体（摆放的模型），
 *       才能在 ThingJS 中创建为 Thing 对象，否则将合并到楼层的 misc 中，无法单独进行管理。
 * 操作：点击按钮
 */

// 加载场景代码
var app = new THING.App({
    // 场景地址
    "url": "https://www.thingjs.com/./uploads/wechat/emhhbmd4aWFuZw==/scene/建筑测试03"
});

// 加载场景
app.on('load', function (ev) {
    var campus = ev.campus; // 获取园区对象
    var floor = app.query('.Floor')[0]; // 获取楼层对象
    app.level.change(floor); // 开启层级切换
    new THING.widget.Button('获取墙', getWall); // 获取楼层中的墙
    new THING.widget.Button('获取门', getDoor); // 获取楼层中的门
    new THING.widget.Button('获取 Thing', getThing); // 获取Thing类物体，包含门
    new THING.widget.Button('获取 Misc', getMisc); // 获取楼层中的misc类物体
    new THING.widget.Button('获取楼层地板', getFloor); // 获取楼层地板
    new THING.widget.Button('获取楼层屋顶', getFloorRoof); // 获取楼层屋顶  
    new THING.widget.Button('获取房间面积', getRoomArea); // 获取房间面积
    new THING.widget.Button('重置', init); // 恢复初始化设置

    $("input[type='button']").hide(); // 隐藏按钮
})

/**
 * 获取当前楼层的Thing类物体
 */
function getThing() {
    // 初始化设置
    init();

    initThingJsTip("搭建园区时，设置了 ID、name、自定义属性的模型，在 ThingJS 中均为 Thing 类物体");

    var floor = app.level.current; // 当前楼层
    var things = floor.things; // 楼层内Thing类物体
    things.forEach(function (item) {
        // 创建标注
        createUIAnchor('ui', item);
    })
}

/**
 * 获取当前楼层中的门
 */
function getDoor() {
    // 初始化设置
    init();

    initThingJsTip("获取楼层中的门。设置了 ID、name、自定义属性的门模型，才可以被获取");

    var floor = app.level.current; // 当前楼层
    var doors = floor.doors; // 楼层中的门
    doors.forEach(function (item) {
        // 创建标注
        createUIAnchor('ui', item);
    })
}

/**
 * 获取当前楼层中的墙
 */
function getWall() {
    // 初始化设置
    init();

    initThingJsTip("设置墙的颜色为黄色");

    var floor = app.level.current; // 当前楼层
    var wall = floor.wall; // 楼层中的墙
    wall.style.color = '#ffff00'; // 设置墙的颜色
}

/**
 * 获取当前楼层misc类物体
 * 楼层下，只有在CampusBuilder中编辑了UserID、Name或自定义属性的物体（摆放的模型），
 * 才能在 ThingJS 中创建为 Thing 对象，否则将合并到楼层的 misc 中，无法单独进行管理。
 */
function getMisc() {
    // 初始化设置
    init();

    initThingJsTip("园区搭建时，没有设置 ID、name、自定义属性的模型，都将合并到楼层的 Misc 中，无法单独进行管理");
    var floor = app.level.current; // 当前楼层
    var misc = floor.misc; // 楼层内misc类物体
    misc.style.outlineColor = '#0000ff'; // 设置misc类物体的颜色
}

/**
 * 获取当前楼层的地板
 */
function getFloor() {
    // 初始化设置
    init();

    initThingJsTip("楼层地板不包含本楼层下独立管理的房间地板");
    var floor = app.level.current; // 当前楼层
    var plan = floor.plan; // 楼层地板
    plan.style.color = '#ffff00'; // 设置地板颜色

    //添加标注
    createUIAnchor('text', plan, '楼层地板');
}

/**
 * 获取当前楼层的屋顶
 */
function getFloorRoof() {
    // 初始化设置
    init();

    initThingJsTip("楼层屋顶不包含本楼层下独立管理的房间屋顶");
    var floor = app.level.current; // 当前楼层
    var roof = floor.roof; // 楼层屋顶
    roof.style.opacity = 0.8; // 设置屋顶透明度
    roof.style.color = '#0000ff'; // 设置屋顶颜色
    roof.visible = true;

    //添加标注
    createUIAnchor('text', roof, '楼层屋顶');
}

/**
 * 获取楼层内房间面积
 */
function getRoomArea() {
    // 初始化设置
    init();

    var floor = app.level.current; // 当前楼层
    var textRegions = app.query('.TextRegion'); // 获取TextRegion类
    var rooms = floor.rooms; // 楼层的房间
    rooms.forEach(function (room) {
        room.roof.visible = true; // 显示房间屋顶
        room.roof.style.opacity = 0.8; // 设置透明度
        room.roof.style.color = '#0000ff'; // 设置颜色

        var area = room.area.toFixed(2); // 获取房间面积 保留小数点后两位
        //添加标注
        createUIAnchor('text', room, area + '平方米');

        initThingJsTip("展示房间面积");
    })
}

/**
 * 初始化设置
 */
function init() {
    var floor = app.level.current; // 当前楼层
    floor.wall.style.color = null; // 设置墙体颜色
    floor.misc.style.outlineColor = null; // 设置misc类物体颜色
    floor.plan.style.color = null; // 设置楼层地板颜色
    floor.roof.style.color = null; // 设置楼层屋顶颜色
    floor.roof.visible = false; // 设置楼层屋顶隐藏

    floor.rooms.forEach(function (room) {
        room.roof.visible = false; // 设置楼层房间隐藏
        room.roof.style.color = null; // 设置楼层房间屋顶颜色
        room.plan.style.color = null; // 设置楼层房间地板颜色
    })

    app.query('.TextRegion').destroyAll(); // 获取TextRegion类

    $(".marker").remove(); // 移除标注

    // 创建元素
    createHtml();

    initThingJsTip("点击左侧按钮，查看具体效果");
}

/**
 * 创建html
 */
function createHtml() {
    var html =
        `<div id="board" class="marker" style="position: absolute;">
                <div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
                </div>
                <div class="picture" style="height: 30px;width: 30px;margin: auto;">
                    <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
                </div>
            </div>`;
    $('#div3d').append($(html));
}

/**
 * 创建元素
 */
function createElement(id) {
    var srcElem = document.getElementById('board');
    var newElem = srcElem.cloneNode(true);
    newElem.style.display = "block";
    newElem.setAttribute("id", id);
    app.domElement.insertBefore(newElem, srcElem);
    return newElem;
}

/**
 * 生成一个新面板
 */
function createUIAnchor(type, obj, value) {
    if (type == 'ui') {
        // 创建UIAnchor
        var ui = app.create({
            type: 'UIAnchor',
            parent: obj,
            element: createElement(obj.id), // 此参数填写要添加的Dom元素
            localPosition: [0, 1, 0],
            pivot: [0.5, 1] //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
        });
        if (!value) value = obj.name;
        $('#' + obj.id + ' .text').text(value);

    } else if (type == 'text') {
        // 创建文本
        var areaTxt = app.create({
            type: 'TextRegion',
            id: 'areaTxt_' + obj.id,
            parent: obj,
            localPosition: [0, 3.8, 0],
            text: value,
            inheritStyle: false,
            style: {
                fontColor: '#ff0000',
                fontSize: 20, // 文本字号大小
            }
        });
        areaTxt.rotateX(-90); // 旋转文本
    }
}

// 监听进入楼层事件
app.on(THING.EventType.EnterLevel, '.Floor', function (ev) {
    init();
    if (ev.current.name == '办公楼一层') {
        $("input[type='button']").show();
    } else {
        $("input[type='button']").hide();
    }
}, '进入楼层显示面板')

// 监听退出楼层事件
app.on(THING.EventType.LeaveLevel, '.Floor', function (ev) {
    init();
    $("input[type='button']").hide();
}, '退出楼层隐藏面板')