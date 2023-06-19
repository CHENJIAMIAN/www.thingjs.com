/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();
window.app = app;

// 设置摄像机参数
app.camera.position = [-20, 9, 0];
app.camera.postEffect.screenSpaceReflection.enable = true;

const baseURL = '/guide/official/images/Dark/';
const image = new THING.ImageTexture([
	baseURL + 'posx.png', baseURL + 'negx.png',
	baseURL + 'posy.png', baseURL + 'negy.png',
	baseURL + 'posz.png', baseURL + 'negz.png'
]);

// 设置背景及反射图
app.envMap = image;
app.background = image;

// 添加一个聚光灯
var spotLight1 = new THING.SpotLight();
spotLight1.position = [-20, 5, 0];
spotLight1.enableShadow = true;
spotLight1.shadowQuality = THING.ShadowQualityType.Ultra;
spotLight1.lookAt([0, 5, 0], { always: true });

const box = new THING.Box({ position: [0, 0.65, 0] });

// 加载舞台模型
const stage = new THING.Entity({
	url: '/guide/official/models/gltf/Stage/Stage.gltf',
});

// 加载宇航员模型
const astronaut = new THING.Entity({
	url: 'https://model.3dmomoda.com/models/7bfb3321557a40fead822d7285ac5324/0/gltf',
	angles: [0, -90, 0],
	position: [-10, 0.15, 0],
	scale: [2, 2, 2],
	complete: function () {
		// 宇航员模型播放动画
		let animName = astronaut.animations[0].name;
		astronaut.playAnimation({
			name: animName,
			loopType: THING.LoopType.Repeat
		});
	}
})
