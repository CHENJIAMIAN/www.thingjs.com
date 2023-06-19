/**
 * @version 2.0
 * @author ThingJS
 */
window.THING = THING;
const app = new THING.App();
app.camera.position = [100, 100, 100];

const baseURL = "/guide/official/images/bluesky/";
const skybox = new THING.ImageTexture([
	baseURL + "posx.jpg",
	baseURL + "negx.jpg",
	baseURL + "posy.jpg",
	baseURL + "negy.jpg",
	baseURL + "posz.jpg",
	baseURL + "negz.jpg",
]);

// 设置环境图和背景图
app.envMap = skybox;
app.background = skybox;

const image = new THING.ImageTexture(
	"https://static.3dmomoda.com/textures/g3l0bxdba7gig6avn1pet21ndyap8onh.jpg"
);

image.waitForComplete().then(() => {
	const plane = new THING.Plane(1000, 1000, {
		position: [0, 0, 0],
		style: { image: image },
	});
});

var car;

// 加载预制件包
const bundle = app.loadBundle("/guide/official/prefabs/car-random-driving");
bundle.waitForComplete().then(() => {
	for (let i = 0; i < 500; i++) {
		let x = Math.random() * 600 - 300;
		let y = 0;
		let z = Math.random() * 360 - 180;

		car = bundle.prefab.createObject({
			name: "prefabDrivingCar" + '_' + i,
			position: [x, y, z],
		});
	}
});

console.log('ok');
