/**
 * 说明：框选拾取物体, 按住 Shift 启动框选功能
 */

// 引入样式文件
THING.Utils.dynamicLoad(['/guide/examples/css/measure/panel.css'], function () {
    var app = new THING.App({
        url: 'https://www.thingjs.com/static/models/factory',
        skyBox: 'Night',
        env: 'Seaside',
    });
    var control;

    app.on('load', function () {
        initThingJsTip("平台提供框选控件功能，按住 Shift + 鼠标左键进行框选操作，框选结束后，右侧界面会打印框选到的物体名称信息，再次按住 Shift + 鼠标左键可重新进行框选操作"); // 创建提示界面
        createHtml();
        var ground = app.query("9439");
        ground.pickable = false;
        app.camera.enableRotate = false;  // 禁用旋转
        app.focus();  // 使3D场景获得焦点
        // 设置框选候选集合，所有Thing类物体可被框选
        var candidates = app.query('.Thing').not(app.query(/cabinetB/));
        control = new THING.RectangleSelectControl(candidates, {
            // 开始框选时的回调处理
            start: function (ev) {
                console.clear();
                console.log('开始框选');
                // 关闭摄像机默认交互
                app.camera.inputEnabled = false;
                // 清除候选集中的物体勾边
                ev.candidates.style.outlineColor = null;
            },
            // 结束框选时的回调函数
            end: function () {
                // 恢复摄像机默认交互
                app.camera.inputEnabled = true;
                console.log('结束框选');
            },
            // 物体被选中的回调处理
            select: function (ev) {
                ev.object.style.outlineColor = 0xFF0000;
                ev.stopPropagation();  // 禁用默认选中效果
            },
            // 未被选中物体的回调处理
            deselect: function (ev) {
                ev.object.style.outlineColor = null;
            }
        });

        // Shift 按下启用框选功能
        app.on('keydown', function (ev) {
            if (ev.key === THING.KeyType.Shift) {
                if (app.hasControl('框选控件')) {
                    reset();
                    control.start();
                } else {
                    app.addControl(control, '框选控件');
                }
            }
        });

        // Shift 抬起结束框选操作（并打印信息）
        app.on('keyup', function (ev) {
            if (ev.key === THING.KeyType.Shift) {
                control.end();
                printInformation();
            }
        });
    });

    // 打印框选物体信息
    function printInformation() {
        // 获取框选的物体集合（Selector）
        var objs = control.objects;
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
        control.clear();
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

})

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