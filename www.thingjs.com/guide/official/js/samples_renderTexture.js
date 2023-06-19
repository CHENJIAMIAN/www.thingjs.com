/**
 * @version 2.0
 * @author ThingJS
 */
var app = new THING.App();

const image = new THING.ImageTexture([
	"/guide/official/images/cloudsky/posx.jpg",
	"/guide/official/images/cloudsky/negx.jpg",
	"/guide/official/images/cloudsky/posy.jpg",
	"/guide/official/images/cloudsky/negy.jpg",
	"/guide/official/images/cloudsky/posz.jpg",
	"/guide/official/images/cloudsky/negz.jpg",
]);
app.background = image;
app.envMap = image;

// 创建渲染纹理
var renderTexture = new THING.RenderTexture({
	size: app.size,
});

var box = new THING.Box(5, 5, 5, {
	style: {
		color: [0.7, 0.7, 0.7],
		metalness: 0.2,
		roughness: 0.2,
	},
});

const astronaut = new THING.Entity({
	url: "https://model.3dmomoda.com/models/7bfb3321557a40fead822d7285ac5324/0/gltf",
	position: [-10, 0.15, 0],
	scale: [2, 2, 2],
	complete: function (ev) {
		let animName = astronaut.animations[0].name;
		astronaut.playAnimation({
			name: animName,
			loopType: THING.LoopType.Repeat,
		});
	},
});

// 将渲染纹理设置到box的样式上
box.style.image = renderTexture;

var camera = new THING.Camera();
camera.background = image;
camera.renderTexture = renderTexture;

camera.on("update", function (ev) {
	camera.position = app.camera.position;
	camera.target = app.camera.target;
});