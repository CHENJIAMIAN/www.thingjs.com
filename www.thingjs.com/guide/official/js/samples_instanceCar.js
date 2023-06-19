/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();
app.camera.position = [100, 100, 100];

var blueSky = new THING.ImageTexture([
	"/guide/official/images/bluesky/posx.jpg",
	"/guide/official/images/bluesky/negx.jpg",
	"/guide/official/images/bluesky/posy.jpg",
	"/guide/official/images/bluesky/negy.jpg",
	"/guide/official/images/bluesky/posz.jpg",
	"/guide/official/images/bluesky/negz.jpg",
]);

// 设置天空盒和环境图
app.background = blueSky;
app.envMap = blueSky;

const image = new THING.ImageTexture(
	"https://static.3dmomoda.com/textures/g3l0bxdba7gig6avn1pet21ndyap8onh.jpg"
);

setTimeout(() => {
	const plane = new THING.Plane(1000, 1000, {
		position: [0, 0, 0],
		style: { image: image },
	});
}, 3000)



const totalNum = 10000;
let carNum = 1000;

initContainers();
initCars();

// 开启批量渲染
app.query("*").makeInstancedDrawing();

// 初始化创建集装箱
function initContainers() {
	const dfcontainers = [];

	const urls = [
		"https://model.3dmomoda.com/models/98DEB861DA714DFC8776D4B937F368F7/0/gltf/",
		"https://model.3dmomoda.com/models/5FBC1646CF0A49F3AC6272635370D1F7/0/gltf/",
	];

	const distribution = [];
	let num = totalNum,
		_stack;
	while (num > 0) {
		if (num > 3) {
			_stack = Math.floor(Math.random() * 4);
			distribution.push(_stack);
			num -= _stack;
		}
		else {
			distribution.push(num);
			num = 0;
		}
	}

	const columnNum = 100;
	const columnGroupNum = 10;
	const rowGroupNum = 3;

	let containerCount = 0;

	distribution.forEach((num, index) => {
		for (let i = 0; i < num; i++) {
			let url = THING.Math.randomFromArray(urls);
			let column = index % columnNum,
				row = Math.floor(index / columnNum);
			let x = column * 5 + Math.floor(column / columnGroupNum) * 10 - 290;
			let y = i * 1.9;
			let z = row * 2.2 + Math.floor(row / rowGroupNum) * 10 - 180;

			const entity = new THING.Entity({
				url: url,
				name: "container" + containerCount++,
				position: [x, y, z],
			});
			dfcontainers.push(entity);
		}
	});

	dfcontainers.forEach((obj) => {
		obj.on("mouseenter", function (ev) {
			ev.object.style.color = "#888888";
			ev.object.scale = [1.4, 1.4, 1.4];
		});
		obj.on("mouseleave", function (ev) {
			ev.object.style.color = "#ffffff";
			ev.object.scale = [1, 1, 1];
		});
	});
}

// 初始化创建小车
function initCars() {
	const cars = [];

	let carCount = 0;

	for (let i = 0; i < carNum; i++) {
		let x = Math.random() * 600 - 300;
		let y = 0;
		let z = Math.random() * 360 - 180;

		const entity = new THING.Entity({
			url: "https://www.thingjs.com/api/models/1CD4775B60F74443824D12BF0A4AF476/0/gltf/",
			name: "car" + carCount++,
			position: [x, y, z],
		});

		cars.push(entity);
	}

	cars.forEach((obj) => {
		obj.on("mouseenter", function (ev) {
			ev.object.style.color = "#888888";
			ev.object.scale = [1.4, 1.4, 1.4];
		});
		obj.on("mouseleave", function (ev) {
			ev.object.style.color = "#ffffff";
			ev.object.scale = [1, 1, 1];
		});
	});

	const animations = new WeakMap();
	const baseSpeed = 0.2;
	const speeds = [baseSpeed, baseSpeed, baseSpeed, baseSpeed, 0];

	const rotations = [90, 0, -90, 180, null];

	const boundary = [-300, 300, -180, 180];

	app.on("update", function () {
		cars.forEach((child) => {
			let animation;
			if (!animations.has(child)) {
				const seed = Math.floor(Math.random() * speeds.length);
				animation = { speed: speeds[seed], frame: 60 * 3 * Math.random() };
				animations.set(child, animation);

				if (rotations[seed] !== null) {
					child.angles = [0, rotations[seed], 0];
				}
			}
			else {
				animation = animations.get(child);
			}

			child.translateZ(animation.speed);
			animation.frame--;

			if (animation.frame < 0) {
				animations.delete(child);
			}

			const position = child.localPosition;
			const angles = child.angles;
			if (position[0] > boundary[1] && angles[1] === 90) {
				child.angles = [0, -90, 0];
			}

			if (position[0] < boundary[0] && angles[1] === -90) {
				child.angles = [0, 90, 0];
			}

			if (position[2] > boundary[3] && angles[1] === 0) {
				child.angles = [0, 180, 0];
			}

			if (position[2] < boundary[2] && angles[1] === 180) {
				child.angles = [0, 0, 0];
			}
		});
	});
}