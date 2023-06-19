/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
window.app = app;

const baseURL = '/guide/official/images/bluesky/';
const image = new THING.ImageTexture([
	baseURL + 'posx.jpg', baseURL + 'negx.jpg',
	baseURL + 'posy.jpg', baseURL + 'negy.jpg',
	baseURL + 'posz.jpg', baseURL + 'negz.jpg'
]);

// 设置背景以及反射图
app.envMap = image;
app.background = image;

// 加载场景
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", { ignoreTheme: true });
bundle.waitForComplete().then(() => {
	console.log(bundle.name);
	const campus = bundle.campuses[0];

	if (campus) {
		app.levelManager.change(campus);
		const car = app.query('car01')[0];
		keyCodeEvent(car);
	}
});

// 绑定键盘事件
function keyCodeEvent(car) {
	car.on(THING.EventType.KeyPress, function (ev) {
		switch (ev.code) {              // WASD控制小车移动
			case 'KeyA':
				car.translate([-0.5, 0, 0]);
				break;
			case 'KeyD':
				car.translate([0.5, 0, 0]);
				break;
			case 'KeyW':
				car.translate([0, 0, 0.5]);
				break;
			case 'KeyS':
				car.translate([0, 0, -0.5]);
				break;
		}
	});
	app.on(THING.EventType.KeyDown, function (ev) {
		if (ev.code === 'Space') {      // 按下空格键切换 2D/3D 视图
			if (app.camera.viewModeType === THING.ViewModeType.Top) {
				app.camera.viewModeType = null;
			}
			else {
				app.camera.viewModeType = THING.ViewModeType.Top;
			}
		}
	});
}