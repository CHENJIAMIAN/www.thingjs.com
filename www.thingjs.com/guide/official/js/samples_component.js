/**
 * @version 2.0
 * @author ThingJS
 */

 const app = new THING.App();

 const baseURL = "/guide/official/images/Simple/";
 const image = new THING.ImageTexture([
	 baseURL + "posx.png",
	 baseURL + "negx.png",
	 baseURL + "posy.png",
	 baseURL + "negy.png",
	 baseURL + "posz.png",
	 baseURL + "negz.png",
 ]);
 
 // 设置环境图和背景图
 app.envMap = image;
 app.background = image;
 
 // 自定义旋转组件
 class MyRotator extends THING.Component {
 
	 onAwake(param) {
		 if (param.speed) {
			 this.speed = param.speed;
		 }
	 }
 
	 onStart(param) {
		 const data = param["data"];
		 console.log(data);
		 if (!this.speed) {
			 this.speed = 10;
		 }
		 console.log("start!!! --- MyRotator");
	 }
 
	 onUpdate(deltaTime) {
		 this.object.rotateY(this.speed * deltaTime);
	 }
 
 }
 
 const astronaut = new THING.Entity({
	 url: "https://model.3dmomoda.com/models/7bfb3321557a40fead822d7285ac5324/0/gltf",
	 complete: function (ev) {
		 let animName = astronaut.animations[0].name;
		 astronaut.playAnimation({
			 name: animName,
			 loopType: THING.LoopType.Repeat,
		 });
	 },
 });
 
 // 添加组件到物体
 // astronaut.addComponent(MyRotator,'rotator',{speed: 100});
 
 window.astronaut = astronaut;
 window.MyRotator = MyRotator;