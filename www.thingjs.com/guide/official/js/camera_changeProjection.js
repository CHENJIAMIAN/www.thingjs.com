/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

const box = new THING.Box(6, 6, 6);
box.style.color = [0, 0.4, 0.7];

app.camera.position = [-5, 10, 20];

// 摄像机投影类型默认为透视投影
const projectionType = THING.ProjectionType;

// 创建按钮切换摄像机投影方式
new THING.widget.Button('设置投影', function () {
	if (app.camera.projectionType == projectionType.Orthographic) {
		app.camera.setProjectionType(projectionType.Perspective, 1000);
	}
	else {
		app.camera.setProjectionType(projectionType.Orthographic, 1000);
	}
});
