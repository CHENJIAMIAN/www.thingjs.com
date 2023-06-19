/**
* @version 2.0
* @author ThingJS
 * 说明：鼠标点击事件示例
 * 操作：点击左侧按钮，开启鼠标事件
 * 难度：★☆☆☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var campus;// 园区对象
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then((ev) => {
    initThingJsTip("点击左侧按钮，开启单击、双击、滑过、拖拽事件");

    campus = app.query(".Campus")[0];  // 获取园区对象
    new THING.widget.Button('开启单击事件', function () {
        var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
        if (posInfo[0].value == "开启单击事件") {
            reset();

            initThingJsTip("单击鼠标左键，设置小车位置");
            var mouseDownPos = null;
            // 右键按下记录下当前位置
            app.on('mousedown', function (event) {
                if (event.button == 0) { mouseDownPos = [event.x, event.y]; }
            });

            // click时，小于4像素执行才执行
            app.on('click', function (event) {

                if (event.button == 0) {
                    if (THING.Math.getDistance(mouseDownPos, [event.x, event.y]) < 4) {
                        app.query('car01')[0].position = event.pickedPosition;
                    }
                }
            }, 'tagA');
            posInfo[0].value = "关闭单击事件";
        }
        else if (posInfo[0].value == "关闭单击事件") {
            app.off('click', 'tagA');
            app.query("car01")[0].position = [21.352, 0.01, 8.716];
            posInfo[0].value = "开启单击事件";
        }
    });

    new THING.widget.Button('开启双击事件', function () {
        var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
        if (posInfo[1].value == "开启双击事件") {
            reset();

            initThingJsTip("鼠标左键双击物体，设置物体顶牌");
            var arr1 = campus.things
            var objs = arr1.query(/a/);  // 选择室外所有物体 + 所有建筑
            objs.push(app.query('.Building')[0])
            objs.on('dblclick', function (ev) {
                var obj = ev.object;
                // e.button 0 为左键 2为右键
                if (ev.button != 0) { return; }
                if (obj.id == 1) return;
                var item = app.query('#' + obj.id)[0];
                create_html()
                create_element(item, "textAndPictureMarker");
                $('#' + item.id + ' .text').text("name：" + item.name);
            }, 'tagA');
            posInfo[1].value = "关闭双击事件";
        }
        else if (posInfo[1].value == "关闭双击事件") {
            app.off('dblclick', 'tagA');
            $(".marker").remove();  // 移除标注
            posInfo[1].value = "开启双击事件";
        }
    });

    new THING.widget.Button('开启滑过事件', function () {
        var arr1 = campus.things
        var objs = arr1.query(/a/);  // 选择室外所有物体 + 所有建筑
        objs.push(app.query('.Building')[0])
        var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
        // 鼠标滑过事件/取消滑过事件切换
        if (posInfo[2].value == "开启滑过事件") {
            reset();

            initThingJsTip("鼠标滑入物体时，物体颜色变红");
            // 改变颜色
            objs.on('mouseenter', function (ev) {
                ev.object.style.color = '#ff0000';
            }, "tagA");

            // 还原颜色
            objs.on('mouseleave', function (ev) {
                ev.object.style.color = null;
            }, "tagA");
            posInfo[2].value = "关闭滑过事件";
        }
        else if (posInfo[2].value == "关闭滑过事件") {
            objs.on('mouseenter', function (ev) {
                ev.object.style.color = null;
            }, "tagA");

            objs.on('mouseleave', function (ev) {
                ev.object.style.color = null;
            }, "tagA");
            posInfo[2].value = "开启滑过事件";
        }
    });

    var objs1 = app.query(/car/);  // 所有名称里包含 car 字段的物体
    new THING.widget.Button('开启拖拽事件', function () {
        var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
        // 开启拖拽/关闭拖拽
        if (posInfo[3].value == "开启拖拽事件") {
            reset();

            initThingJsTip("有绿色勾边的物体可进行拖拽");
            // 设置物体可拖拽（默认物体不可拖拽）
            var dragComponents = [];
            objs1.forEach(car => {
                car.style.outlineColor = '#00ff00';
                car.addComponent(THING.EXTEND.DragComponent, 'drag', {
                    outlineColor: '#00ff00'
                });
                var drag = car.drag;
                drag.enable = true;
                dragComponents.push(car.drag);
            })
            posInfo[3].value = "关闭拖拽事件";
        }
        else if (posInfo[3].value == "关闭拖拽事件") {
            objs1.forEach(car => {
                car.style.outlineColor = null;
                var drag = car.drag;
                drag.enable = false;
            })
            posInfo[3].value = "开启拖拽事件";
        }
    });

    // 监听拖拽相关事件
    // 开始拖拽
    objs1.on('dragstart', function (ev) {});

    // 拖拽中
    objs1.on('drag', function (ev) {
        objs1.forEach(car => {
            car.style.color = null;
        })
    });

    // 结束拖拽
    objs1.on('dragend', function (ev) {
        objs1.forEach(car => {
            car.style.outlineColor = '#00ff00';
        })
    });

    new THING.widget.Button('重置', reset);
})

/**
 * 单击事件
 */
function click() {
    reset();

    initThingJsTip("单击鼠标左键，设置小车位置");
    var mouseDownPos = null;
    // 右键按下记录下当前位置
    app.on('mousedown', function (event) {
        if (event.button == 0) { mouseDownPos = [event.x, event.y]; }
    });
    // click时，小于4像素执行才执行
    app.on('click', function (event) {
        if (event.button == 0) {
            if (event.picked && THING.Math.getDistance(mouseDownPos, [event.x, event.y]) < 4) {
                app.query('car01')[0].position = event.pickedPosition;
            }
        }
    });
}

/**
 * 双击事件
 */
function db() {
    reset();

    initThingJsTip("鼠标左键双击物体，物体顶牌");
    app.on('dblclick', function (ev) {
        var obj = ev.object;
        // e.button 0 为左键 2为右键
        if (!ev.picked || ev.button != 0) { return; }
        if (obj.id == 1) return;
        if (ev.picked) {
            var item = app.query('#' + obj.id)[0];
            ui = app.create({
                type: 'UIAnchor',
                parent: item,
                element: createElement(item),
                localPosition: [0, 2, 0],
                pivot: [0.5, 1] //  [0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
            });
            $('#' + item.id + " .text").text("name：" + item.name);
        }
    });
}

/**
 * 重置
 */
function reset() {
    initThingJsTip("点击左侧按钮，开启鼠标单击、双击、滑过、拖拽事件");
    var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
    app.query("car01")[0].position = [21.352, 0.01, 8.716];
    app.query("car02")[0].position = [24.101, 0.01, 8.896];
    app.query("car03")[0].position = [8.369, 0.01, 14.5];
    var objs = app.query(/car/);;  // 获取所有 Thing 物体
    var obj1 = app.query('.Building').add(campus.things);  //获取园区的所有物体
    app.off('click', 'tagA');
    posInfo[0].value = "开启单击事件";
    app.off('dblclick', 'tagA');
    posInfo[1].value = "开启双击事件";
    $(".marker").remove();  // 移除标注
    create_html();

    if (posInfo[2].value = "关闭滑过事件") {
        // 改变颜色
        obj1.on('mouseenter', function (ev) {
            ev.object.style.color = null;
        });
        posInfo[2].value = "开启滑过事件";
    }

    if (posInfo[3].value == "关闭拖拽事件") {
        objs.draggable = false;
        objs.style.outlineColor = null;
        posInfo[3].value = "开启拖拽事件";
    }
}

/**
 * 创建html
 */
function create_html() {
    var textAndPictureMarkerHtml =
        `<div id="textAndPictureMarker" class="marker" style="position: absolute;">
			<div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
				building
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

/**
 * 创建顶牌界面
 * @param {Object} obj - 创建顶牌界面的父物体
 * @param {String} value - 创建顶牌界面的类型
 */
function create_element(obj) {
    let css = createTopCard(obj);

}