/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素

var app = new THING.App();

app.background = [0, 0, 0]

// 创建点
for (let i = 0; i < 2000; i++) {
	//创建不同位置的点
	const points = new THING.Points({
		points: [THING.Math.randomVector([-200, -200, -200], [200, 200, 200])],
	});

	//点的大小
	points.size = THING.Math.randomFloat(1.5, 5);
	points.style.color = THING.Math.randomColor();
}

