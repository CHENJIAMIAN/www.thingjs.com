/**
 * @version 2.0
 * @author ThingJS
 * 说明：设置断点，辅助在线调试，ThingJS提供两种页面调试方法：
 *      1.和普通页面调试方法一样，直接打开F12在Sources里找到debug.js文件，在里面打断点进行调试；
 *      2.在代码里加入 “debugger” 关键字进行调试。
 * 操作：操作过程如下：
 *      1.在代码中加入 “debugger” 关键字；
 *      2.F12 打开后台；
 *      3.点击按钮运行代码；
 *      4.在控制台中查看断点位置。
 */

// 加载场景，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 创建天空盒
var cubeTexture = new THING.CubeTexture([
    'https://www.thingjs.com/static/skyboxes/BlueSky/posx.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negx.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posy.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negy.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posz.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negz.jpg'
]);
app.background = cubeTexture; // 设置背景资源贴图资源
app.envMap = cubeTexture; // 设置环境图样式

var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');

bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    new THING.widget.Button('创建盒子', test_create_box);
});

// 添加按钮点击事件并创建box
function test_create_box() {
    // 设置摄像机飞行的目的地、朝向、以及所需时间
    app.camera.flyTo({
        'position': [13.387755902351577, 15.071091117119966, 24.252787493082046],
        'target': [-1.7380765465794725, 0.45861953018781015, -1.7875178625757955],
        'time': 1000,
        'complete': function () {
            debugger;  // 按下F12键，会在这里断点
            // 创建一个宽度为1，高度为1，深度为1的box
            const box = new THING.Box(1, 1, 1);
        }
    });
}