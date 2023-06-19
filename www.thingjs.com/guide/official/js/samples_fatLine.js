/**
 * @version 2.0
 * @author ThingJS
 */
const colorarr = [
	"#663399", // 紫
	"#6633ff", // 靛
	"#66ccff", // 蓝
	"#66ff33", // 绿
	"#ffff33", // 黄
	"#ff9933", // 橙
	"#ff3333", // 红
];

var app = new THING.App();
const baseURL = "/guide/official/images/Simple/";
const image = new THING.ImageTexture([
	baseURL + "posx.png",
	baseURL + "negx.png",
	baseURL + "posy.png",
	baseURL + "negy.png",
	baseURL + "posz.png",
	baseURL + "negz.png",
]);

app.envMap = image;
app.background = image;

// 像素粗线的配置信息
var config = {
	width: 1,
	cornerThreshold: 0.4,
};

// 生成等像素粗线
var lines = [];
for (var i = 0; i < 7; i++) {
	var line = new THING.FatLine({
		name: i,
		selfPoints: [
			[0, 0, 0],
			[20, 0, 0],
		],
		width: config.width,
		cornerThreshold: config.cornerThreshold,
		position: [0, i * 2, 0],
	});

	//设置等像素粗线的样式

	line.style.color = colorarr[i];
	line.style.effect.glow = true;

	lines.push(line);

	line.on("click", function (ev) {
		console.log(ev.object);
	});
}

// 加载和卸载方法
const funcs = {
	load: () => {
		lines.forEach((line) => {
			line.loadResource();
		});
	},
	unload: () => {
		lines.forEach((line) => {
			line.unloadResource();
		});
	},
};

const gui = new dat.GUI();
gui.add(funcs, "load");
gui.add(funcs, "unload");

let start = 1;
const end = 15;
let flag = true;
let temp = 1;
let tolalTime = 0;
app.on("update", (time) => {
	if (start < end && flag) {
		start += 0.1;
		if (start >= end) flag = false;
	}
	else if (start >= 1 && !flag) {
		start -= 0.1;
		if (start <= 1) flag = true;
	}

	lines.forEach((line) => {
		line.width = start;
	});
});

app.camera.fit();