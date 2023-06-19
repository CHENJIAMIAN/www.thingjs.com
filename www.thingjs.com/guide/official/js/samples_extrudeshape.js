/**
 * @version 2.0
 * @author ThingJS
 */
var app = new THING.App();
app.background = "#010113";

// 生成随机挖洞信息
function randomHoles() {
	return [
		[

			[6, 0],
			[2.4270509831248424, 1.7633557568774194],
			[1.8541019662496847, 5.706339097770921],
			[-0.927050983124842, 2.853169548885461],
			[-4.854101966249684, 3.5267115137548393],
			[-3, 3.6739403974420594e-16],
			[-4.854101966249685, -3.5267115137548384],
			[-0.9270509831248427, -2.8531695488854605],
			[1.8541019662496834, -5.706339097770922],
			[2.427050983124842, -1.76335575687742],

		],
	];
}

// 生成随机点
function randomPoints() {
	return [
		[20, 0],
		[8.090169943749475, 5.877852522924732],
		[6.180339887498949, 19.02113032590307],
		[-3.0901699437494736, 9.510565162951536],
		[-16.180339887498945, 11.755705045849465],
		[-10, 1.2246467991473533e-15],
		[-16.18033988749895, -11.75570504584946],
		[-3.0901699437494754, -9.510565162951535],
		[6.180339887498945, -19.021130325903073],
		[8.090169943749473, -5.877852522924734],
	];
}

// 创建拉伸形状物体
var region = new THING.ExtrudeShape({
	selfPlaneHoles: randomHoles(),
	selfPlanePoints: randomPoints(),
});

// region.style.color = 'black';
var image = new THING.ImageTexture("official/images/star1.png");
image.wrapType = THING.ImageWrapType.Repeat;

region.style.image = image;
region.height = 2;


var region2 = new THING.ExtrudeShape({
	selfPlaneHoles: randomHoles(),
	selfPlanePoints: randomPoints(),
	height: 2,
	style: { image: image },
	scale: [0.2, 1, 0.2]
});


app.camera.position = [
	21.231611289387644, 32.189009574197655, 20.722099505729364,
];
app.camera.target = [
	2.0719399704460773, -2.360409037735611, 2.2657780489096906,
];
