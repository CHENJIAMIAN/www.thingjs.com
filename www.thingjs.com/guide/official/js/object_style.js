/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();
app.camera.position = [0, 5, 10];

const baseURL = '/guide/official/images/bluesky/';
const image = new THING.ImageTexture([
	baseURL + 'posx.jpg', baseURL + 'negx.jpg',
	baseURL + 'posy.jpg', baseURL + 'negy.jpg',
	baseURL + 'posz.jpg', baseURL + 'negz.jpg'
]);

//设置全局反射图
app.envMap = image;

//创建一张纹理
const boxMap = new THING.ImageTexture('official/images/uv_grid_opengl.jpg')

//创建不同的样式数据
const planeStyle = {
	color: [0.3, 0.3, 0.3],
	metalness: 0.2,
	roughness: 0.1
}

const boxStyle = {
	edge: {
		enable: true,
		color: [0, 1, 1]
	},
	metalness: 0.7,
	roughness: 0.1
}

const boxStyle1 = {
	image: boxMap
}

const boxStyle2 = {
	wireframe: true,
	emissive: [1, 0, 0]
}

// 创建物体并应用样式
const plane = new THING.Plane(1000, 1000, {
	position: [0, -50, 0],
	style: planeStyle
});

const box = new THING.Box({
	position: [-3, 0, 0],
	style: boxStyle
})

const box1 = new THING.Box({
	position: [3, 0, 0],
	style: boxStyle1
});

box1.on('update', function () {
	box1.style.opacity = 0.5 + 0.5 * Math.sin(2 * app.elapsedTime);
});

const box2 = new THING.Box({ style: boxStyle2 });
