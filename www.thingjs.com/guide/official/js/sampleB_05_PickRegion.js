/**
 * @version 2.0
 * @author ThingJS
 * 说明：框选拾取物体, 按住 Shift 启动框选功能
 */

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

THING.Utils.loadFile(['/guide/examples/css/measure/panel.css',], {
    load: function () {
        var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
        bundle.waitForComplete().then(() => {
            console.log(bundle.name);
            initThingJsTip("平台提供框选控件功能，按住 Shift + 鼠标左键进行框选操作，框选结束后，右侧界面会打印框选到的物体名称信息，再次按住 Shift + 鼠标左键可重新进行框选操作"); // 创建提示界面
            createHtml();
            var campus = app.query(".Campus")[0];  // 获取园区对象
            app.camera.enableRotate = false;  // 禁用旋转
            app.focus();  // 使3D场景获得焦点
            // 设置框选候选集合，所有Thing类物体可被框选
            var gate = app.query('#Gate')[0]
            gate.name = 'Gate'
            var things = campus.things;
            var candidates = things.query(/a/);
            candidates.push(app.query('CabinetB0')[0])
            app.root.addComponent(THING.EXTEND.RectangleSelectComponent, 'rectangleSelect', {
                candidates: candidates,
                drawer: new THING.EXTEND.RectangleSelectDrawer(),
                onClear: (ev) => {
                    ev.candidates.style.outlineColor = null;
                },
                onStart: (ev) => {
                    console.clear();
                    console.log('开始框选');
                    // 关闭摄像机默认交互
                    app.camera.enable = false;
                    // 清除候选集中的物体勾边
                    ev.candidates.style.outlineColor = null;
                },
                onSelecting: (ev) => {
                    ev.selectedObjects.style.outlineColor = 0xFF0000;
                },
                onEnd: (ev) => {
                    // 恢复摄像机默认交互
                    app.camera.enable = true;
                    ev.candidates.style.outlineColor = null
                    console.log('结束框选');
                }
            });
        })
    }
})


app.on('keydown', function (ev) {
    if (app.root.rectangleSelect.started) {
        return;
    }

    if (ev.keyCode == THING.KeyCodeType.Shift) {
        reset();
        app.root.rectangleSelect.start();
    }
});

app.on('keyup', function (ev) {
    if (!app.root.rectangleSelect.started) {
        return;
    }

    if (ev.keyCode == THING.KeyCodeType.Shift) {
        app.root.rectangleSelect.end();
        printInformation();
    }
});

// 打印框选物体信息
function printInformation() {
    // 获取框选的物体集合（Selector）
    var objs = app.root.rectangleSelect.selectedObjects
    objs.forEach(function (obj) {
        if (($('.empty').length)) {
            $('.empty').remove();
        }
        if (!($('.tj-group').length)) {
            let tbody = `<tbody class="tj-group" id="tb-line"></tbody>`;
            $('.tj-table').prepend(tbody);
        }
        let tr =
            `<tr class="tj-group-content">
                 <td class="tj-value">` + obj.name + `</td>
             </tr>`;
        $('.tj-group').prepend(tr);
    })
    // 清空框选物体集合
    objs.clear();
}

// 清空界面数据
function reset() {
    if (($('.tj-group').length)) {
        $('.tj-group').remove();
    }
    let tr =
        `<div class="empty">暂无数据</div>`;
    $('.tj-table').prepend(tr);
}


function createHtml() {
    // 数据详情界面
    let dataDetails =
        `<div id="dataDetails" class="tj-panel property-panel tj-has-title tj-sizable tj-property-panel tj-pinned" style="position: absolute; right: 10px; top: 220px; width: 257px; height: 416px; transform: none;">
             <div class="tj-close"></div>
             <div class="tj-title" style="cursor: move; user-select: none;">数据详情</div>
             <div class="tj-panel-body" style="padding-top: 0px;">
                 <div class="tj-panel-container tj-scroll-bar">
                     <table class="tj-table">
                         <div class="empty">暂无数据</div>
                     </table>
                 </div>
             </div>
         </div>`;
    $('#div2d').append(dataDetails);
    // 点击按钮关闭面板
    $('#dataDetails .tj-close').on('click', function () {
        $('#dataDetails').css('display', 'none');
    });
}