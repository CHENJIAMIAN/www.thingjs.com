/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素

const app = new THING.App();

// 点数据
const points = [[0, 0, 0], [20, 0, 0], [20, 0, 20], [0, 0, 20]];

// 挖洞数据
const holes = [[[5, 5], [14, 3], [14, 7], [6, 7]]];

// 创建平面
const plane = new THING.PlaneRegion({
	selfPlaneHoles: holes,
	points: points,
	position: [0, 0, 0],
	style: { color: '#00FFB3' }
});

app.camera.fit(plane);