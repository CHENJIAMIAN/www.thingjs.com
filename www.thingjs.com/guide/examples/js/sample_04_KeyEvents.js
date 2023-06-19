/**
 * 说明：键盘相关事件示例
 * 操作：按下键盘 WASD 键，控制小车移动
 *       按下键盘 空格键，切换 2D/3D 视图
 * 难度：★★☆☆☆
 */
 var car;  // 小车
 var carPosition;  // 小车位置
 
 var app = new THING.App({
     url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
     skyBox: 'Night',
     env: 'Seaside',
 });
 
 app.on('load', function (ev) {
     app.focus();  // 使3D界面获得焦点
     car = app.query('car01')[0];
     carPosition = car.position;
 
     initThingJsTip("本例程演示了如何定义及卸载键盘事件<br>点击按钮，查看效果");
 });
 
 /**
  * 绑定键盘事件
  */
 new THING.widget.Button('绑定键盘事件', function () {
     initThingJsTip("按下键盘 W、A、S、D 键，控制小车移动；按下键盘空格键，切换 2D/3D 视图");
 
     // 给物体绑定键盘按键事件
     // 键盘按键一直被按下
     car.on(THING.EventType.KeyPress, function (ev) {
         switch (ev.code) {
             case 'KeyA':
                 car.translate([-0.5, 0, 0]);
                 break;
             case 'KeyD':
                 car.translate([0.5, 0, 0]);
                 break;
             case 'KeyW':
                 car.translate([0, 0, 0.5]);
                 break;
             case 'KeyS':
                 car.translate([0, 0, -0.5]);
                 break;
         }
     }, '键盘WASD')
 
     // 全局注册键盘按键按下
     app.on(THING.EventType.KeyDown, function (ev) {
         // 按下空格键切换 2D/3D 视图
         if (ev.code === 'Space') {
             if (app.camera.viewMode === THING.CameraView.TopView) {
                 app.camera.viewMode = THING.CameraView.Normal;
             } else {
                 app.camera.viewMode = THING.CameraView.TopView;
             }
         }
     }, '空格键');
 });
 
 /**
  * 移除键盘事件
  */
 new THING.widget.Button('重置', function () {
     initThingJsTip("本例程演示了如何定义及卸载键盘事件<br>点击按钮，查看效果");
 
     app.camera.viewMode = THING.CameraView.Normal;
     car.position = carPosition;
 
     app.off(THING.EventType.KeyDown, null, '空格键');
     car.on(THING.EventType.KeyPress, function (ev) {
         switch (ev.code) {
             case 'KeyA':
                 break;
             case 'KeyD':
                 break;
             case 'KeyW':
                 break;
             case 'KeyS':
                 break;
         }
     }, '键盘WASD');
 });
 