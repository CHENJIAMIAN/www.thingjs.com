/**
 * @version 2.0
 * @author ThingJS
 * 说明：第一人称行走
 * 操作：鼠标按住左键拖拽方向 键盘W A S D 控制行走 空格 跳起
 * 难度：★★☆☆☆
 */

//面板控制的开启碰撞检测等参数没有提供
//插件卸载后无法再次安装

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

var dataObj = {
    isFPP: true,
    useCollision: false,
    useGravity: true,
    moveSpeed: 0.02, // 行走速度
    turnSpeed: 0.25, // 右键旋转速度
    gravity: 29.8, // 物体重量
    viewHeight: 1.8, // 人高度
    jumpSpeed: 10, // 按空格键 跳跃的速度
    //enableKeyRotate: false, // 默认不开启键盘控制旋转
    //useCollision: false, // 默认不开启碰撞检测
    useGravity: true // 默认开启重力
};
var gui = null;
// 加载场景包，并在创建campus成功时切换层级
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    var PluginBundle;
    // 创建提示
    initThingJsTip("本例程展示了平台内置的第一人称行走控件，添加控件后通过键盘W A S D 控制行走，空格 控制跳起，Shift加速，V切换第一/三人称视角。点击左侧按钮进行体验")
})

new THING.widget.Button('添加控件', function () {
    //加载插件
    PluginBundle = app.loadBundle([
        'guide/official/fpsController',
    ]);
    // 调用插件中的方法
    PluginBundle.waitForComplete().then(() => {

        gui = new THING.widget.Panel({ 'titleText': '第一人称行走', 'hasTitle': true });

        gui.position = [10, 200];

        gui.addBoolean(dataObj, 'lightAngle').caption('键盘控制旋转').on('change', function (value) {

        });

        gui.addBoolean(dataObj, 'useCollision').caption('碰撞检测').on('change', function (value) {

        });
        gui.addBoolean(dataObj, 'useGravity').caption('重力检测').on('change', function (value) {

        });
        gui.addNumberSlider(dataObj, 'gravity').caption('重力').step(1).min(0).max(30).isChangeValue(true).on('change', function (value) {

        });
        gui.addNumberSlider(dataObj, 'jumpSpeed').caption('跳起速度').step(1).min(0).max(30).isChangeValue(true).on('change', function (value) {

        });
    });

});
new THING.widget.Button('重置', function () {
    remove_control()
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.01300049999998, 42.678001399999985, 61.723998999999985],
        'target': [1.646, 7.8909998, 4.4450002],
        'time': 2000,
        'complete': function () {
        }
    });
    PluginBundle.plugin.uninstall()

});

/**
 * 删除控件
 */
function remove_control() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.67799999999998, 61.72399999999999],
        'target': [1.646, 7.891, 4.445],
        'time': 1000,
        'complete': function () {
            gui.destroy();
        }
    });
}
