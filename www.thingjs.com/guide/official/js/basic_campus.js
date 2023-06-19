/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
window.app = app;

// 加载场景包，并在创建campus成功时切换层级
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-ZGC');
bundle.waitForComplete().then(() => {
	console.log(bundle.name);
	const campus = bundle.campuses[0];
	if (campus) {
		app.levelManager.changeAsync(campus);
	}
});
