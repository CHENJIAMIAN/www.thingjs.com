/**
 * @version 2.0
 * @author ThingJS
 */
 window.THING = THING;
 const app = new THING.App();
 window.app = app;
 const baseURL = "/guide/official/images/bluesky/";
 const image = new THING.ImageTexture([
	 baseURL + "posx.jpg",
	 baseURL + "negx.jpg",
	 baseURL + "posy.jpg",
	 baseURL + "negy.jpg",
	 baseURL + "posz.jpg",
	 baseURL + "negz.jpg",
 ]);
 
 // 设置环境图和背景图
 app.envMap = image;
 app.background = image;
 
 const groundTex = new THING.ImageTexture(
	 "https://static.3dmomoda.com/textures/g3l0bxdba7gig6avn1pet21ndyap8onh.jpg"
 );
 window.groundTex = groundTex;
 
 const plane = new THING.Plane(1000, 1000, {
	 position: [0, 0, 0],
	 style: { image: groundTex },
 });
 
 for (var y = 0; y < 5; y++) {
	 for (var x = 0; x < 5; x++) {
		 const car = new THING.Entity({
			 url: 'https://www.thingjs.com/api/models/1CD4775B60F74443824D12BF0A4AF476/0/gltf/',
			 position: [x * 8, 0, y * 8]
		 });
 
		 car.waitForComplete().then(() => {
			 var target = THING.Math.randomVector2Range(-30, 30);
			 car.moveTo([target[0], 0, target[1]], {
				 loopType: THING.LoopType.PingPong,
				 time: 9 * 1000, // THING.Math.randomInt(2 * 1000, 10 * 1000),
			 });
 
			 var angles = THING.Math.randomFloat(10, 350);
			 car.rotateTo([0, angles, 0], {
				 loopType: THING.LoopType.PingPong,
				 time: 10 * 1000, // THING.Math.randomInt(2 * 1000, 10 * 1000),
			 });
 
			 car.userData.hitCount = 0;
 
			 // 获取小车的包围盒
			 const localBoundingBox = car.body.getLocalBoundingBox();
 
			 //设置碰撞检测参数
			 car.collider.enable = true;
			 car.collider.mode = THING.ColliderType.Box;
			 car.collider.offset = localBoundingBox.center;
			 car.collider.halfSize = localBoundingBox.halfSize;
			 car.collider.visible = false;
			 car.collider.addEventListener(THING.EventType.ColliderEnter, function (ev) {
				 ev.object.userData.hitCount++;
				 ev.object.style.outlineColor = 'red';
				 // ev.object.stopRotating();
				 // ev.object.stopMoving();
			 });
			 car.collider.addEventListener(THING.EventType.ColliderLeave, function (ev) {
				 ev.object.userData.hitCount--;
				 if (!ev.object.userData.hitCount) {
					 ev.object.style.outlineColor = null;
				 }
			 });
		 });
	 }
 }
 
 app.camera.position = [20, 20, 20];
 app.query('.Entity').makeInstancedDrawing();
 
 