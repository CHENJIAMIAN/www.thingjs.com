/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();

const boxes = [];
for (let i = -2; i < 3; i++) {
	const color = THING.Math.randomFromArray([
		'red', 'green', 'orange', 'yellow', 'gray'
	]);
	const box = new THING.Box({
		position: [i * 2.5, 0, 0],
		style: { color: color }
	});
	if (i % 2 == 0) {
		boxes.push(box);
	}
}

// 创建按钮
new THING.widget.Button('开启事件', function () {
	boxes.forEach(box => {
		box.on('update', function () {
			box.style.opacity = 0.5 + 0.5 * Math.sin(2 * app.elapsedTime);
			box.rotateY(5);
		}, 'rotate')
	})
});

// 创建按钮
new THING.widget.Button('关闭事件', function () {
	boxes.forEach(box => {
		box.off('update', 'rotate');
	})
});