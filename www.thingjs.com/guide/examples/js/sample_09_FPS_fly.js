/**
 * 说明：摄像机自由飞行
 * 操作：鼠标按住左键拖拽方向 键盘 W A S D 控制飞行 Q E 控制升降
 * 难度：★★☆☆☆
 */
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    background: '#000000',
    env: 'Seaside',
});

// 加载场景后执行
app.on('load', function () {
    // 创建提示
    initThingJsTip("本例程展示了平台内置的键盘控制摄像机交互的控件，添加控件后可以通过键盘 W A S D 控制飞行， Q E 控制升降，点击左侧按钮进行体验")
    // 创建按钮
    new THING.widget.Button('添加控件', add_control);
    new THING.widget.Button('删除控件', remove_control);
});

/**
 * 添加控件
 */
var ctrl = null;
function add_control() {
    if (!ctrl) {
        ctrl = app.addControl(new THING.FlyControl());

        initThingJsTip("控件添加成功！<br>键盘 W A S D 控制飞行， Q E 控制升降");
    }
}

/**
 * 删除控件
 */
function remove_control() {
    if (ctrl) {
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [36.013, 42.67799999999998, 61.72399999999999],
            'target': [1.646, 7.891, 4.445],
            'time': 1000,
            'complete': function () {
                app.removeControl(ctrl);
                ctrl = null;
                initThingJsTip("本例程展示了平台内置的键盘控制摄像机交互的控件，添加控件后可以通过键盘 W A S D 控制飞行， Q E 控制升降，点击左侧按钮进行体验");
            }
        });
    }
}


