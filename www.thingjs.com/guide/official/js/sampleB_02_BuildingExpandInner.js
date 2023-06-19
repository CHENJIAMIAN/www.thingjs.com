/**
 * @version 2.0
 * @author ThingJS
 * 说明：展示楼层中的内部结构
 * 功能：展示楼层内的Thing物体、门、墙、地板、屋顶、房间面积
 * 操作：点击按钮
*/

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var textLabelPlane;
// 加载场景包，并在创建campus成功时切换层级
var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/indoor');
bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    var floor = app.query('.Floor')[0]; // 获取楼层对象
    app.levelManager.change(floor); // 开启层级切换
    // 获取楼层中的墙
    new THING.widget.Button('获取墙', function () {
        initThingJsTip("设置墙的颜色为黄色");
        var floor = app.levelManager.current; // 当前楼层
        var walls = floor.walls; // 楼层中的墙
        walls.style.color = '#ffff00'; // 设置墙的颜色
    });
    // 获取楼层中的门 
    new THING.widget.Button('获取门', function () {
        // 初始化设置
        init();
        initThingJsTip("获取楼层中的门。设置了 ID、name、自定义属性的门模型，才可以被获取");
        var floor = app.levelManager.current; // 当前楼层
        var doors = floor.doors; // 楼层中的门
        var arr = []
        arr.push(doors[0], doors[2], doors[4])
        arr.forEach(function (item) {
            // 创建标注
            create_html()
            create_element(item, "textAndPictureMarker");
            $('#' + item.id + ' .text').text(item.id);
        })
    });

    // 获取Thing类物体
    new THING.widget.Button('获取 Thing', function () {
        // 初始化设置
        init();
        initThingJsTip("搭建园区时，设置了 ID、name、自定义属性的模型，在 ThingJS 中均为 Thing 类物体");
        var floor = app.levelManager.current; // 当前楼层
        var things = floor.things; // 楼层内Thing类物体
        var arr = [];
        arr.push(things[0], things[1], things[2], things[3], things[5], things[7])
        arr.forEach(function (item) {
            // 创建标注
            create_html()
            create_element1(item, "textAndPictureMarker");
            $('#' + item.name + ' .text').text(item.name);
        })
        var doors = floor.doors; // 楼层中的门
        var arr1 = []
        arr1.push(doors[0], doors[2], doors[4])
        arr1.forEach(function (item) {
            // 创建标注
            create_html()
            create_element(item, "textAndPictureMarker");
            $('#' + item.id + ' .text').text(item.id);
        })
    });

    // 获取楼层地板
    new THING.widget.Button('获取楼层地板', function () {
        // 初始化设置
        init();
        initThingJsTip("楼层地板不包含本楼层下独立管理的房间地板");
        var floor = app.levelManager.current; // 当前楼层
        var slabs = floor.slabs; // 楼层地板
        var arr = [slabs[4], slabs[5]]
        console.log(arr.length)
        arr.forEach(function (item) {
            item.style.color = '#ffff00'; // 设置地板颜色
        })
        creat_text(arr[0], "楼层地板")

    });

    // 获取楼层屋顶
    new THING.widget.Button('获取楼层屋顶', function () {
        // 初始化设置
        init();
        initThingJsTip("楼层屋顶不包含本楼层下独立管理的房间屋顶");
        var floor = app.levelManager.current; // 当前楼层
        var roofs = floor.roofs; // 楼层屋顶
        var arr = [];
        arr.push(roofs[4], roofs[5]);
        arr.forEach(function (roof) {
            roof.style.opacity = 0.8; // 设置屋顶透明度
            roof.style.color = '#0000ff'; // 设置屋顶颜色
            roof.renderable = true;
        })
        creat_text(arr[0], "楼层屋顶")
    })

    // 获取房间面积
    new THING.widget.Button('获取房间面积', function () {
        // 初始化设置
        init();
        var floor = app.levelManager.current; // 当前楼层
        var rooms = floor.rooms; // 楼层的房间
        var arr = [];
        arr.push(rooms[0], rooms[1], rooms[2], rooms[3])
        arr.forEach(function (room) {
            room.roof.renderable = true; // 显示房间屋顶
            room.roof.style.opacity = 0.8; // 设置透明度
            room.roof.style.color = '#0000ff'; // 设置颜色
            var area = room.area.toFixed(2); // 获取房间面积 保留小数点后两位
            //添加标注
            creat_text(room.roof, area + "平方米")
            initThingJsTip("展示房间面积");
        })
    });
    new THING.widget.Button('重置', init); // 恢复初始化设置
})

/**
 * 创建html
 */
function create_html() {
    var textAndPictureMarkerHtml =
        `<div id="textAndPictureMarker" class="marker" style="position: absolute;">
			<div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
				测试标签2
			</div>
			<div class="picture" style="height: 30px;width: 30px;margin: auto;">
				<img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
			</div>
		</div>`;
    $('#div3d').append($(textAndPictureMarkerHtml));
}

/**
 * 创建顶牌
 * @param {Object} obj - 创建顶牌的父物体
 * @param {String} cla - 创建顶牌的dom元素的class
 */
function createTopCard(obj) {
    obj.registerComponent(THING.DOM.CSS2DComponent, 'css');
    const css = obj.css;
    css.domElement = document.getElementById('textAndPictureMarker');
    css.domElement.setAttribute("id", obj.id);
    css.pivot = [0.5, 0];
    css.autoUpdateVisible = true;
    css.visible = true;
    css.factor = 0.05;
    return css;
}
function createTopCard1(obj) {
    obj.registerComponent(THING.DOM.CSS2DComponent, 'css');
    const css = obj.css;
    css.domElement = document.getElementById('textAndPictureMarker');
    css.domElement.setAttribute("id", obj.name);
    css.pivot = [0.5, 0];
    css.autoUpdateVisible = true;
    css.visible = true;
    css.factor = 0.05;
    return css;
}

/**
 * 创建顶牌界面
 * @param {Object} obj - 创建顶牌界面的父物体
 * @param {String} value - 创建顶牌界面的类型
 */
function create_element(obj) {
    let css = createTopCard(obj);
}

function create_element1(obj) {
    let css = createTopCard1(obj);
}

/**
 * 初始化设置
 */
function init() {
    var floor = app.levelManager.current; // 当前楼层
    floor.walls.style.color = null; // 设置墙体颜色
    floor.slabs.style.color = null; // 设置楼层地板颜色
    floor.roofs.style.color = null; // 设置楼层屋顶颜色
    floor.roofs.renderable = false; // 设置楼层屋顶隐藏
    if (textLabelPlane) {
        textLabelPlane.destroy();
    }
    $(".marker").remove(); // 移除标注
    // 创建元素
    create_html();
    initThingJsTip("点击左侧按钮，查看具体效果");
}

function creat_text(obj, value) {
    textLabelPlane = new THING.Label({          // 文字标签
        fontText: value,
        fontColor: '#ff0000',
        fontSize: 15,
        parent: obj,
        localPosition: [0, 1, 0],
        text: value,
    });
    textLabelPlane.rotateX(-90);
    textLabelPlane.renderType = THING.RenderType.Plane	// 以面形式渲染
    console.log(111)
}