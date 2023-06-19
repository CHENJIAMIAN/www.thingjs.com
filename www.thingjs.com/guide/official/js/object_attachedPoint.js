/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

const box = new THING.Box(6, 6, 6);

// 设置box的旋转和缩放
box.scaleTo([1.25, 1.25, 1.25], {
	loopType: THING.LoopType.PingPong,
	time: 2000
});
box.on('update', function(ev) {
	ev.object.rotateY(0.5);
});

// 为box添加一个单击事件，单机时会生成一个挂点物体
box.on('click', function (ev) {
	const point = new THING.AttachedPoint({
		parent: ev.object,
		position: ev.pickedPosition,
	});

	const littleBox = new THING.Box(1, 1, 1);
	littleBox.style.color = THING.Math.randomFromArray(['red', 'green', 'orange']);
	point.add(littleBox);
});
