/**
 * @version 2.0
 * @author ThingJS
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

//创建立方体
const box = new THING.Box(2, 2, 2);

//创建物体变换组件并将组件添加到空对象上
const component = new THING.TransformControlComponent();
const emptyObject = new THING.BaseObject3D();
emptyObject.addComponent(component, 'dragAxis');

// 设置平移变换对象
emptyObject.dragAxis.setObjects([box]);

// 添加按钮
new THING.widget.Button('平移', function () {
  emptyObject.dragAxis.mode = 'translate';
});

new THING.widget.Button('旋转', function () {
  emptyObject.dragAxis.mode = 'angle';
});

new THING.widget.Button('缩放', function () {
  emptyObject.dragAxis.mode = 'scale';
});