/**
 * @version 2.0
 * @author ThingJS
 */

// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

// 创建两个物体
const sphere = new THING.Sphere(1, { position: [-3, 0, 0] });
const box = new THING.Box(3, 3, 3, { position: [3, 0, 0] });

box.style = {
	color: '#FEF5AC',
	outlineColor: '#25316D'
};

// 旋转立方体
box.on('update', function(ev) {
	ev.object.rotateY(0.5);
});

// 为这些物体添加鼠标事件

box.on('mouseenter', function(ev) {
	ev.object.style.outlineColor = 'white';
});
box.on('mouseleave', function(ev) {
	ev.object.style.outlineColor = '#25316D';
});

let tag = true;
sphere.on('click', function (ev) {
	ev.object.style.color = tag ? '#FFCACA' : '#B1E1FF';
	tag = !tag;
});