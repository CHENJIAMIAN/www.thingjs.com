/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();

window.app = app;
app.background = "#010113";

const arr = [];

for (let i = 0; i < 50; i++) {
	let array =  [Math.random(), Math.random(), Math.random()];
	arr.push(array);
}

// 创建很多盒子
for (var i = 0; i < 20000; i++) {
	var box = new THING.Box({
		name: i,
		localPosition: THING.Math.randomVector([-20, -20, -20], [20, 20, 20]),
		style: {
			color: THING.Math.randomFromArray(arr),
		}
	});
}

app.camera.fit();

// 开启批量渲染
app.query('*').makeInstancedDrawing();