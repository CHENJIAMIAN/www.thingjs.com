/**
 * @version 2.0
 * @author ThingJS
 */
 var app = new THING.App();

 const image = new THING.ImageTexture([
	 '/guide/official/images/bluesky/posx.jpg', '/guide/official/images/bluesky/negx.jpg',
	 '/guide/official/images/bluesky/posy.jpg', '/guide/official/images/bluesky/negy.jpg',
	 '/guide/official/images/bluesky/posz.jpg', '/guide/official/images/bluesky/negz.jpg',
 ]);
 
 app.envMap = image;
 app.background = image;
 
 // 创建点
 function randomPoints() {
	 return [
		 [-10, 0, -10],
		 [10, 0, -10],
		 [10, 0, 10],
		 [-10, 0, 10],
	 ];
 }
 
 app.camera.position = [12.591084498682344, 3.9245163709760944, 6.145345302630289];
 app.camera.target = [0, 0, 0];
 
 var panel = new THING.widget.Panel({
	 titleText: "数值型进度条",
	 width: '400px',
	 hasTitle: true,
 
 });
 
 // NumberSlider类型数据绑定
 var dataObj = {
	 flowXSpeed: 1,
	 flowYSpeed: 1,
	 flowWeight: 0.5,
	 reflectDistortion: 2,
	 noiseTimeScale: 1,
 };
 panel.position = [10, 10];
 panel.addNumberSlider(dataObj, 'flowXSpeed').step(0.1).min(-10).max(10).isChangeValue(true).on('change', function (value) {
   water.flowXSpeed = value;
 });
 panel.addNumberSlider(dataObj, 'flowYSpeed').step(0.1).min(-10).max(10).isChangeValue(true).on('change', function (value) {
   water.flowYSpeed = value;
 });
 panel.addNumberSlider(dataObj, 'flowWeight').step(0.1).min(0).max(2).isChangeValue(true).on('change', function (value) {
   water.flowWeight = value;
 });
 panel.addNumberSlider(dataObj, 'reflectDistortion').step(0.1).min(0).max(10).isChangeValue(true).isPercentage(true).on('change', function (value) {
  water.reflectDistortion = value;
 });
 panel.addNumberSlider(dataObj, 'noiseTimeScale').step(0.1).min(0).max(10).isChangeValue(true).isPercentage(true).on('change', function (value) {
  water.noiseTimeScale = value;
 });
 
 
 // 创建水面
 var water = new THING.Water({
	 points: randomPoints(),
	 flowSpeed: [dataObj.flowXSpeed, dataObj.flowYSpeed],
 });