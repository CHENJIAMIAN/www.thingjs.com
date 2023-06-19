/**
 * 说明：第一人称行走
 * 操作：鼠标按住左键拖拽方向 键盘W A S D 控制行走 空格 跳起
 * 难度：★★☆☆☆
 */

var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    skyBox: 'Night',
    env: 'Seaside',
});

// 加载场景后执行
app.on('load', function () {
    // 创建提示
    initThingJsTip("本例程展示了平台内置的第一人称行走控件，添加控件后通过键盘W A S D 控制行走，空格 控制跳起，点击左侧按钮进行体验")
    // 创建按钮
    new THING.widget.Button('添加控件', add_control);
    new THING.widget.Button('重置', remove_control);
});

/**
 * 添加控件
 */
var ctrl = null;
var gui = null;

function add_control() {
    if (ctrl) {
        return;
    }
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [2.8321649862532032, 1.800003570690751, 19.142406079541555],
        'target': [8.238903690935196, 1.4337976272817292, 14.458302731727938],
        'time': 1000,
        'complete': function () {
            ctrl = app.addControl(
                new THING.WalkControl({
                    // 参数可以动态修改
                    walkSpeed: 0.02, // 行走速度
                    turnSpeed: 0.25, // 右键旋转速度
                    gravity: 29.8, // 物体重量
                    eyeHeight: 1.8, // 人高度
                    jumpSpeed: 10, // 按空格键 跳跃的速度
                    enableKeyRotate: false, // 默认不开启键盘控制旋转
                    useCollision: false, // 默认不开启碰撞检测
                    useGravity: true // 默认开启重力
                })
            );
            // GUI
            gui = new THING.widget.Panel({ 'titleText': '第一人称行走', 'hasTitle': true });

            gui.position = [10, 200];

            gui.addBoolean(ctrl, 'enableKeyRotate').caption('键盘控制旋转');
            gui.addBoolean(ctrl, 'useCollision').caption('碰撞检测');
            gui.addBoolean(ctrl, 'useGravity').caption('重力检测');

            gui.addNumberSlider(ctrl, 'gravity').caption('重力').step(1).min(0).max(50).isChangeValue(true);
            gui.addNumberSlider(ctrl, 'jumpSpeed').caption('跳起速度').step(1).min(0).max(30).isChangeValue(true);
        }
    });
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
                gui.destroy();
            }
        });
    }
}