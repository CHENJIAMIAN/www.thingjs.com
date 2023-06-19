/**
 * @version 2.0
 * @author ThingJS
 * 说明：摄像机自由飞行
 * 操作：鼠标按住左键拖拽方向 键盘 W A S D 控制飞行 Q E 控制升降
 * 难度：★★☆☆☆
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

// 加载场景包
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example', {
    position: [0, 0, 0],
    ignoreTheme: false
});
bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    app.focus();
    new THING.widget.Button('添加控件', add_control);
    new THING.widget.Button('删除控件', remove_control);
});

/**
 * 添加控件
 */
var component = null;
function add_control() {
    if (!component) {
        component = new THING.EXTEND.FreeControlComponent({ time: 2000 });
        app.root.addComponent(component, 'objControl');
        app.root.objControl.setAttachCamera(app.camera);//设置操控的相机对象

        initThingJsTip("控件添加成功！<br>键盘 W A S D 控制飞行， Q E 控制升降");
    }
}

/**
 * 删除控件
 */
function remove_control() {
    if (component) {
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [36.013, 42.67799999999998, 61.72399999999999],
            'target': [1.646, 7.891, 4.445],
            'time': 1000,
            'complete': function () {
                app.root.removeComponent('objControl');
                component = null;
                initThingJsTip("本例程展示了平台内置的键盘控制摄像机交互的控件，添加控件后可以通过键盘 W A S D 控制飞行， Q E 控制升降，点击左侧按钮进行体验");
            }
        });
    }
}