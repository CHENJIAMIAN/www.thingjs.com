/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();
window.app = app;

//加载场景包
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", { ignoreTheme: true });
bundle.waitForComplete().then(() => {
	console.log(bundle.name);

	const campus = bundle.campuses[0];

	if (campus) {
		app.levelManager.changeAsync(campus);
		initConfig();
	}
});


//设置gui
function initConfig() {
	let result;
	// 创建按钮
	new THING.widget.Button('ID为6555', function () {
		result = app.query('#6555')[0];
		result.style.outlineColor = [0, 1, 1];
	});

	// 创建按钮
	new THING.widget.Button('name为car01', function () {
		result = app.query('car01')[0];
		result.style.outlineColor = [0, 1, 0];
	});

	// 创建按钮
	new THING.widget.Button('类型为Facade', function () {
		result = app.query('.Facade')[0];
		result.style.outlineColor = [1, 1, 0];
	});

	// 创建按钮
	new THING.widget.Button('马力为40的车', function () {
		result = app.query('[userData/power=40]');
		result.forEach(obj => {
			obj.style.outlineColor = [1, 0, 1];
		});
	});
}

