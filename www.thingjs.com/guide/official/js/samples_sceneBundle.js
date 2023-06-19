/**
 * @version 2.0
 * @author ThingJS
 */

 const app = new THING.App();
 window.app = app;
 
 // 性能检测插件
 const div3d = document.getElementById('div3d');
 
 // 加载场景包
 var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-ZGC');
 bundle.waitForComplete().then(() => {
	 console.log(bundle.name);
	 const campus = bundle.campuses[0];
	 if (campus) {
		 app.levelManager.changeAsync(campus);
	 }
 });
 
 
 var image = new THING.ImageTexture([
	 "/guide/official/images/bluesky/posx.jpg",
	 "/guide/official/images/bluesky/negx.jpg",
	 "/guide/official/images/bluesky/posy.jpg",
	 "/guide/official/images/bluesky/negy.jpg",
	 "/guide/official/images/bluesky/posz.jpg",
	 "/guide/official/images/bluesky/negz.jpg",
 ]);
 
 // app.background = image;
 app.envMap = image;
 
 // 设置渲染品质
 function setRenderQuality(quality) {
	 const postEffect = app.camera.postEffect;
	 postEffect.enable = true;
 
	 postEffect.MSAA.enable = (quality !== 'Low');
 
	 postEffect.FXAA.enable = (quality === 'Low');
 
	 postEffect.bloom.enable = (quality !== 'Low');
	 postEffect.bloom.strength = 0.23;
	 postEffect.bloom.radius = 0.84;
 
 
	 postEffect.screenSpaceAmbientOcclusion.enable = (quality === 'High');
	 postEffect.screenSpaceAmbientOcclusion.radius = 0.74;
	 postEffect.screenSpaceAmbientOcclusion.intensity = 0.5;
	 postEffect.screenSpaceAmbientOcclusion.quality = quality;
 
	 postEffect.colorCorrection.enable = (quality === 'High');
	 postEffect.colorCorrection.contrast = 1.1;
	 postEffect.colorCorrection.gamma = 0.8;
	 postEffect.colorCorrection.saturation = 1.1;
 
	 postEffect.screenSpaceReflection.enable = (quality === 'High');
	 postEffect.screenSpaceReflection.maxRayDistance = 209;
	 postEffect.screenSpaceReflection.pixelStride = 12;
	 postEffect.screenSpaceReflection.minGlossiness = 0.84;
 
	 postEffect.vignette.enable = (quality !== 'Low');
	 postEffect.vignette.type = 'blur';
	 postEffect.vignette.offset = 0.8;
 
	 postEffect.chromaticAberration.enable = (quality !== 'Low');
	 postEffect.chromaticAberration.chromaFactor = 0.0045;
 
	 const mapSize = ({ 'High': 2048, 'Medium': 1024, 'Low': 512 })[quality];
	 app.scene.mainLight.shadowQuality = mapSize;
	 app.camera.postEffect = postEffect;
 }
 
 // 创建按钮
 new THING.widget.Button('Low', function () {
	 setRenderQuality('Low')
	 app.on('update', () => {
		 // 创建提示
		 initThingJsTip(`当期帧率为：` + app.timer.fpsCounter);
 
	 })
 });
 
 // 创建按钮
 new THING.widget.Button('Medium', function () {
	 setRenderQuality('Medium')
	 app.on('update', () => {
		 // 创建提示
		 initThingJsTip(`当期帧率为：` + app.timer.fpsCounter);
 
	 })
 });
 
 // 创建按钮
 new THING.widget.Button('High', function () {
	 setRenderQuality('High')
	 app.on('update', () => {
		 // 创建提示
		 initThingJsTip(`当期帧率为：` + app.timer.fpsCounter);
 
	 })
 });