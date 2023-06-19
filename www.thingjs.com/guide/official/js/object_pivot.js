/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

app.camera.position = [30, 30, 30];     // 设置摄像机位置

// 创建两个盒子
const bigBox = new THING.Box(7, 7, 7, { style: { opacity: 0.2 }});
const smallBox = new THING.Box(5, 5, 5, { position: [5, 10, 5], });

bigBox.pivot = [0.5, 0.5, 0.5];
bigBox.position = smallBox.orientedBox.getLayoutPosition([1, 1, 1]); // 设置大盒子的位置

const pivots = [                                                     // 轴心点数组
	[0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0],
	[1, 0, 1], [1, 1, 0], [1, 1, 1], [0, 0, 0]
];

// 定时改变大盒子的轴心点
setInterval(() => {
	bigBox.pivot = THING.Math.randomFromArray(pivots);
}, 1000);
