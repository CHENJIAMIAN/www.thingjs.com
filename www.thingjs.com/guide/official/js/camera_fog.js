/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
window.app = app;

// 加载场景并切换层级
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", { ignoreTheme: true });
bundle.waitForComplete().then(() => {
	console.log(bundle.name);
	const campus = bundle.campuses[0];

	if (campus) {
		app.levelManager.change(campus);
	}
});

// 设置摄像机雾的一些参数
app.camera.fog.enable = true;
app.camera.fog.far = 300;
app.camera.fog.color = 'white';