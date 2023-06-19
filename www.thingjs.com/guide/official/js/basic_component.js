/**
 * @version 2.0
 * @author ThingJS
 */


 var app = new THING.App();
 // My component and lifecycle callback
 // 自定义组件及生命周期回调方法
 class MyRotator extends THING.Component {
 
	 onAwake(param) {
		 if (param && param['speed'] != undefined) { this.speed = param['speed']; }
	 }
 
	 onStart() {
		 this.object.style.color = THING.Math.randomFromArray([
			 'skyblue', 'lightgreen', 'orange', 'yellow', 'pink',
		 ]);
	 }
 
	 onUpdate(deltaTime) {
		 this.object.rotateY(this.speed * deltaTime);
	 }
 
 }
 
 // 创建一些盒子并挂载组件
 let i = 0;
 for (var y = -2; y < 2; y++) {
	 for (var x = -2; x < 2; x++) {
		 const box = new THING.Box({
			 name: i++,
			 position: [x * 2.5, 0, y * 2.5],
		 });
		 box.addComponent(MyRotator, 'rotator', { speed: THING.Math.randomInt(15, 50) });
	 }
 }
 