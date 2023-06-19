/**
 * @version 2.0
 * @author ThingJS
 */
const app = new THING.App();
window.app = app;
var marker;
const baseURL = "/guide/official/images/bluesky/";
const image = new THING.ImageTexture([
	baseURL + "posx.jpg",
	baseURL + "negx.jpg",
	baseURL + "posy.jpg",
	baseURL + "negy.jpg",
	baseURL + "posz.jpg",
	baseURL + "negz.jpg",
]);
const baseURL2 = "/guide/official/images/cloudsky/";
const image2 = new THING.ImageTexture([
	baseURL2 + "posx.jpg",
	baseURL2 + "negx.jpg",
	baseURL2 + "posy.jpg",
	baseURL2 + "negy.jpg",
	baseURL2 + "posz.jpg",
	baseURL2 + "negz.jpg",
]);

app.envMap = image2;
app.background = image2;

app.camera.postEffect.enable = true;
app.camera.postEffect.screenSpaceReflection.enable = true;
app.camera.postEffect.colorCorrection.enable = true;
app.camera.postEffect.vignette.enable = true;
//   app.camera.postEffect.film.enable = true;


var cameras = [];

// 设置不同摄像机的视角
function resetCameraPosition() {
	cameras[0].viewModeType = THING.ViewModeType.Top;
	cameras[1].viewModeType = THING.ViewModeType.Bottom;
	cameras[2].viewModeType = THING.ViewModeType.Front;
	cameras[3].viewModeType = THING.ViewModeType.Back;
}

const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-factory5", { ignoreTheme: true });
bundle.waitForComplete().then(() => {
	const campus = bundle.campuses[0];
	const top = 15;
	const width = 128;
	const height = 128;

	var viewports = [
		[0, top, width, height],
		[app.size[0] - width, top, width, height],
		[app.size[0] - width, app.size[1] - height, width, height],
		[0, app.size[1] - height, width, height],
	];

	// 设置不同摄像机的各自参数
	for (var i = 0; i < 4; i++) {
		var camera = new THING.Camera();
		camera.enableViewport = true;
		camera.viewport = viewports[i];

		camera.background = THING.Math.randomFromArray([image, image2]);
		camera.projectionType = THING.ProjectionType.Perspective;

		camera.postEffect.FXAA.enable = true;
		camera.postEffect.MSAA.enable = true;

		cameras.push(camera);
	}

	resetCameraPosition();

	app.camera.projectionType = THING.ProjectionType.Perspective;
	app.camera.viewModeType = THING.ViewModeType.Top;

	app.camera.enableRotate = false;
	app.camera.enablePan = false;
});

