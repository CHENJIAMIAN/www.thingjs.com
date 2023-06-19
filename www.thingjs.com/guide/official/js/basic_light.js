/**
 * @version 2.0
 * @author ThingJS
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 创建一个球体
const sphere = new THING.Sphere(5,{
    widthSegments:64,
    heightSegments:64
})

sphere.style.color = 'skyblue';

const plane = new THING.Plane(50, 50, {
    position: [0, -6, 0],
});

// 创建关闭主光源按钮
new THING.widget.Button('关闭主光源', function() {
    app.scene.mainLight.intensity = 0
});

// 创建打开主光源按钮
new THING.widget.Button('打开主光源', function() {
    app.scene.mainLight.intensity = 0.5
});

// 创建聚光灯
const spotlight = new THING.SpotLight({
    position: [-25, 5, 0],
});
// 设置聚光灯的属性
spotlight.enableShadow = true;
spotlight.lookAt([0, 5, 0], {always: true});
spotlight.color = 'yellow';

// 创建关闭聚光灯按钮
new THING.widget.Button('关闭聚光灯', function() {
    spotlight.intensity = 0
});
// 创建打开主光源按钮
new THING.widget.Button('打开聚光灯', function() {
    spotlight.intensity = 0.5
});