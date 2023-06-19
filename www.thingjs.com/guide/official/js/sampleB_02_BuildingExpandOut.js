/**
* @version 2.0
* @author ThingJS
* 说明：展示建筑结构
* 功能：获取园区中的建筑（buildings）、物体（things）、地面（ground），设置外立面的显示隐藏
* 操作：点击按钮，查看功能
*/

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var campus;// 园区对象
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    // 创建提示
    initThingJsTip("点击按钮，可获取园区中的建筑（buildings）、物体（things）、地面（ground），设置建筑外立面显示隐藏");
    create_html()

    campus = app.query(".Campus")[0];  // 获取园区对象
    new THING.widget.Button("获取buildings", function () {
        // 初始化设置
        reset();
        const buildings = campus.buildings; // 获取园区下的所有建筑，返回为 Selector 结构
        buildings.forEach(function (item) {
            create_html()
            create_element(item, "textAndPictureMarker");
            $('#' + item.id + ' .text').text(item.name);
        })
    })

    new THING.widget.Button("获取things", function () {
        // 初始化设置
        reset();
        // 获取园区下的所有 Thing 类物体，返回为 Selector 结构
        var things = campus.things;
        var sel = things.query(/a/);
        sel.forEach(function (item) {
            create_html();
            create_element(item, "textAndPictureMarker");
            $('#' + item.id + ' .text').text(item.name);
        })
        var gate = app.query('#Gate')[0]
        create_html();
        create_element(gate, "textAndPictureMarker");
        $('#' + gate.id + ' .text').text(gate.id);
    })

    new THING.widget.Button("获取ground", function () {
        // 初始化设置
        reset()
        var ground = campus.ground;  // 获取园区下的 ground
        create_html()
        create_element(ground, "textAndPictureMarker");
        $('.text').text('ground');
    })

    new THING.widget.Button("隐藏外立面", function () {
        // 初始化设置
        reset(true);
        var build = app.query('107')[0];  // 获取园区中的建筑
        if ($("input[value='隐藏外立面']").length) {
            $("input[value='隐藏外立面']").val('显示外立面');

            build.facades.renderable = false;  // 隐藏外立面
            build.floors.renderable = true;  // 显示楼层
        } else {
            $("input[value='显示外立面']").val('隐藏外立面');
            build.facades.renderable = true;  // 显示外立面
            build.floors.renderable = false;  // 隐藏楼层
        }
    })

    new THING.widget.Button("重置", function () {
        // 初始化设置
        reset();
    })

    /**
     * 恢复初始化
     */
    function reset(flag) {
        $(".marker").remove();  // 移除标注

        if (flag) return;
        $("input[value='显示外立面']").val('隐藏外立面');

        var build = app.query('107')[0];  // 获取园区中的建筑
        build.facades.renderable = true;  // 显示外立面
        build.floors.renderable = false;  // 隐藏楼层

        create_html()
        // 创建提示
        initThingJsTip("点击按钮，可获取园区中的建筑（buildings）、物体（things）、地面（ground），设置建筑外立面显示隐藏");
    }
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

/**
 * 创建顶牌界面
 * @param {Object} obj - 创建顶牌界面的父物体
 * @param {String} value - 创建顶牌界面的类型
 */
function create_element(obj) {
    let css = createTopCard(obj);
}