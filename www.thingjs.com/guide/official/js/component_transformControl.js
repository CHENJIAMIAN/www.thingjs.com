/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

const box = new THING.Box(2, 2, 2);

const component = new THING.EXTEND.TransformControlComponent();
box.addComponent(component, 'dragAxis');

const transformation = ['translate', 'angle', 'scale']; // 变换的类型

new THING.widget.Button('translate', function () {
	box.dragAxis.mode = transformation[0];
});

new THING.widget.Button('angle', function() {
    box.dragAxis.mode = transformation[1];
});

new THING.widget.Button('scale', function() {
    box.dragAxis.mode = transformation[2];
});