/**
 * @version 2.0
 * @author ThingJS
 * 说明：设置天空盒背景、背景色、图片背景
 * 功能：点击按钮、更换背景
 * 备注：天空盒其实就是将一个立方体展开，然后在六个面上贴上对应的贴图，在实际
 *      的渲染中，将这个立方体始终罩在场景摄像机的周围，让场景摄像机始终处于
 *      这个立方体的中心位置，然后根据视线与立方体的交点的坐标，来确定究竟要
 *      在哪一个面上进行纹理采样。
 * 难度：★☆☆☆☆
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

// 加载场景包，并在创建campus成功时切换层级
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    if (campus) {
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [14.929613003036518, 26.939904587373245, 67.14964454354718],
            'target': [2.1474740033704594, 17.384929223259824, 10.177959375514941],
            'time': 2000
        });
    }
})

// 设置天空盒（目前仅能使用系统内置天空盒效果）
new THING.widget.Button('蓝天', function () {
    var imageTexture = new THING.ImageTexture([
        'https://www.thingjs.com/static/skyboxes/BlueSky/posx.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negx.jpg',
        'https://www.thingjs.com/static/skyboxes/BlueSky/posy.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negy.jpg',
        'https://www.thingjs.com/static/skyboxes/BlueSky/posz.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negz.jpg'
    ]);
    app.background = imageTexture;
    app.envMap = imageTexture;
});

new THING.widget.Button('银河', function () {
    var imageTexture = new THING.ImageTexture([
        'https://www.thingjs.com/static/skyboxes/MilkyWay/posx.jpg', 'https://www.thingjs.com/static/skyboxes/MilkyWay/negx.jpg',
        'https://www.thingjs.com/static/skyboxes/MilkyWay/posy.jpg', 'https://www.thingjs.com/static/skyboxes/MilkyWay/negy.jpg',
        'https://www.thingjs.com/static/skyboxes/MilkyWay/posz.jpg', 'https://www.thingjs.com/static/skyboxes/MilkyWay/negz.jpg'
    ]);
    app.background = imageTexture;
    app.envMap = imageTexture;
});

new THING.widget.Button('黑夜', function () {
    var imageTexture = new THING.ImageTexture([
        'https://www.thingjs.com/static/skyboxes/Night/posx.jpg', 'https://www.thingjs.com/static/skyboxes/Night/negx.jpg',
        'https://www.thingjs.com/static/skyboxes/Night/posy.jpg', 'https://www.thingjs.com/static/skyboxes/Night/negy.jpg',
        'https://www.thingjs.com/static/skyboxes/Night/posz.jpg', 'https://www.thingjs.com/static/skyboxes/Night/negz.jpg'
    ]);
    app.background = imageTexture;
    app.envMap = imageTexture;
});

new THING.widget.Button('多云', function () {
    var imageTexture = new THING.ImageTexture([
        'https://www.thingjs.com/static/skyboxes/CloudySky/posx.jpg', 'https://www.thingjs.com/static/skyboxes/CloudySky/negx.jpg',
        'https://www.thingjs.com/static/skyboxes/CloudySky/posy.jpg', 'https://www.thingjs.com/static/skyboxes/CloudySky/negy.jpg',
        'https://www.thingjs.com/static/skyboxes/CloudySky/posz.jpg', 'https://www.thingjs.com/static/skyboxes/CloudySky/negz.jpg'
    ]);
    app.background = imageTexture;
    app.envMap = imageTexture;
});

new THING.widget.Button('灰白', function () {
    var imageTexture = new THING.ImageTexture([
        'https://www.thingjs.com/static/skyboxes/White/posx.jpg', 'https://www.thingjs.com/static/skyboxes/White/negx.jpg',
        'https://www.thingjs.com/static/skyboxes/White/posy.jpg', 'https://www.thingjs.com/static/skyboxes/White/negy.jpg',
        'https://www.thingjs.com/static/skyboxes/White/posz.jpg', 'https://www.thingjs.com/static/skyboxes/White/negz.jpg'
    ]);
    app.background = imageTexture;
    app.envMap = imageTexture;
});

new THING.widget.Button('暗黑', function () {

    var imageTexture = new THING.ImageTexture([
        'https://www.thingjs.com/static/skyboxes/Dark/posx.jpg', 'https://www.thingjs.com/static/skyboxes/Dark/negx.jpg',
        'https://www.thingjs.com/static/skyboxes/Dark/posy.jpg', 'https://www.thingjs.com/static/skyboxes/Dark/negy.jpg',
        'https://www.thingjs.com/static/skyboxes/Dark/posz.jpg', 'https://www.thingjs.com/static/skyboxes/Dark/negz.jpg'
    ]);
    app.background = imageTexture;
    app.envMap = imageTexture;
});

// 背景色颜色可使用十六进制颜色或rgb字符串
new THING.widget.Button('设置背景色1', function () {
    app.background = '#0a3d62';
})

new THING.widget.Button('设置背景色2', function () {
    app.background = 'rgb(68,114,196)';
})

// 图片可在资源、页面资源上传
// 上传完成后，点击需要使用的图片，即可在代码编辑器中出现图片url地址
// 也可直接使用能访问的网络图片url
new THING.widget.Button('设置背景图片1', function () {
    app.background = 'https://www.thingjs.com/static/images/background_img_01.png';
})

new THING.widget.Button('设置背景图片2', function () {
    app.background = 'https://www.thingjs.com/static/images/background_img_02.png';
})

// 清除背景效果
new THING.widget.Button('清除背景', function () {
    app.skyBox = null;
    app.background = null;
    app.envMap = null;
})