/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

// 创建一个模型对象，传入url
const entity = new THING.Entity({
	url: 'https://model.3dmomoda.com/models/fea1e799ff4c4ec595fde2f76df12e15/0/gltf'
});

// 设置摄像机位置
app.camera.position = [-4, 3, 5];

//设置摄像机飞行的目的地、朝向、以及所需时间
app.camera.flyTo({
	'position': [2, 5, 6],
	'target': [0, 0, 0],
	'time': 1000
});
