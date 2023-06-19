/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

const obj = new THING.Entity({
	url: 'https://model.3dmomoda.com/models/4212ba61a02c4dac8286f3fbe71cfa6e/0/gltf/'
});

obj.waitForComplete();

app.on('keydown', function (ev) {
	if (ev.keyCode == THING.KeyCodeType.Space) {
		app.camera.viewModeType = THING.Math.randomFromObject(THING.ViewModeType);
	}
	else if (ev.keyCode == THING.KeyCodeType.Escape) {
		app.camera.viewModeType = null;
	}
})

//使用空格键切换摄像机视角