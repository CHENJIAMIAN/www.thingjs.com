/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

// 创建很多box
for (let i = 0; i < 5000; i++) {
	new THING.Box({
		position: THING.Math.randomVector([-20, -20, -20], [20, 20, 20]),
		style: { color: THING.Math.randomFromArray(
			['red', 'green', 'orange', 'yellow', 'gray']
		) }
	});
}

app.camera.position = [50, 50, 50];

// 全部物体开启批量渲染
app.query('*').makeInstancedDrawing();
