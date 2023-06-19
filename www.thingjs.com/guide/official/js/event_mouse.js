/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();
window.app = app;

const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", { ignoreTheme: true });
bundle.waitForComplete().then(() => {
	console.log(bundle.name);

	const campus = bundle.campuses[0];

	if (campus) {
		bindMouseEvent(campus);
	}
});

// 绑定鼠标事件
function bindMouseEvent(campus) {
	// 鼠标单机事件
	var mouseDownPos = null;
	app.on('mousedown', function (event) {
		if (event.button == 0) { mouseDownPos = [event.x, event.y]; }
	});
	app.on('click', function (event) {
		if (event.button == 0) {
			if (THING.Math.getDistance(mouseDownPos, [event.x, event.y]) < 4) {
				app.query('car01')[0].position = event.pickedPosition;
			}
		}
	});

	// 鼠标双击事件
	app.on('dblclick', function (ev) {
		var obj = ev.object;
		if (ev.button != 0) { return; }
		obj.style.outlineColor = THING.Math.randomFromArray(['red', 'green', 'blue']);
	});

	// 鼠标进入物体的事件
	var objs = app.query('.Facade').add(campus.things);

	objs.on('mouseenter', function (ev) {
		ev.object.style.edge.enable = true;
		ev.object.style.edge.color = '#00ffff';
	});

	objs.on('mouseleave', function (ev) {
		ev.object.style.edge.enable = false;
	});

	// 鼠标拖拽事件
	var cars = [app.query('car02')[0], app.query('car03')[0]];
	var dragComponents = [];
	cars.forEach(car => {
		car.addComponent(THING.EXTEND.DragComponent, 'drag', {
			outlineColor: "#ff0000"
		});
		var drag = car.drag;
		drag.enable = true;
		dragComponents.push(car.drag);
	})
}