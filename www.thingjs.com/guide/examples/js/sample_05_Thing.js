/**
 * 说明：创建车辆模型和货物模型进行货物搬运
 * 备注：
 *       ThingJS其他类型模型创建可以参考 https://developer.thingjs.com/t-725.html
 * 难度：★★★☆☆
 */

 var truck = null;
 var car01 = null;
 var box1 = null;
 
 // 加载场景代码 
 var app = new THING.App({
     url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
     background: '#000000',
     env: 'Seaside',
 });
 
 // 注册场景加载完成后事件
 app.on('load', function (ev) {
     var campus = ev.campus;
     car01 = app.query('car01')[0];
     initThingJsTip("请点击创建车辆模型按钮");
 
     new THING.widget.Button('创建车辆模型', createTruck);
     new THING.widget.Button('创建货物模型', addparent);
     new THING.widget.Button('车辆运输货物', carryingobj);
     new THING.widget.Button('重置', reset);
 });
 
 /**
  * 通过脚本动态创建Thing类物体
  */
 function createTruck() {
     if (truck == null) {
         // 摄像机飞行到某位置
         app.camera.flyTo({
             'position': [3.4053415779315643, 3.0025132858167414, 12.761055343507902],
             'target': [-3.8607833660961233, 0.5239004615951229, 7.342725315539324],
             'time': 2000,
             'complete': function () {
             }
         });
         // 创建Thing
         truck = app.create({
             type: 'Thing',
             name: 'thing01',
             url: '/api/models/1B3D386AAB1A42518DD8DE202786EFEC/0/gltf/',
             id: 'truck',
             position: [-5, 0, 7],
             angle: 0,
             complete: function () {
                 initThingJsTip('创建车辆模型成功');
             }
         });
     } else {
         initThingJsTip("车辆模型已存在");
     }
 }
 
 /**
  * 通过脚本动态对象并指定父物体
  */
 function addparent() {
     if (box1 == null) {
         // 摄像机飞行到某位置
         app.camera.flyTo({
             'position': [25.097350857035014, 6.2637563528912095, 13.608571999162109],
             'target': [19.366173074426367, 1.015802426502126, 8.336841085180412],
             'time': 2000,
             'complete': function () {
             }
         });
         // 创建box1并添加父物体
         box1 = app.create({
             type: 'Box',
             id: 'Box01',
             name: 'thing02',
             position: [18.95, 0.84, 8],  // 世界坐标系下的绝对位置
             complete: function () {
                 initThingJsTip('创建货物模型成功');
             }
         });
     } else {
         initThingJsTip("货物模型已存在");
     }
     var a = car01.subNodes[11];
     a.add(box1);
 }
 
 /**
  * 车辆移动至带货物叉车位置
  */
 function carryingobj() {
 
     // 摄像机飞行到某位置
     app.camera.flyTo({
         'position': [34.77915888294282, 17.748276759983906, 22.08117013405239],
         'target': [18.426806778380662, 0.5593091225523125, 6.589739841342565],
         'time': 2000,
         'complete': function () {
         }
     });
 
     if (app.query(/thing/).length > 1) {
         app.query('car01')[0].stopMoving();
         app.query('car01')[0].stopAnimation();
         app.query('car01')[0].position = [18.95, 0.01, 6.77];
         app.query('car01')[0].angles = [0, 0, 0];
         car01.subNodes[11].add(box1);
         box1.localPosition = [0.005999711082200321, -0.8191431669860414, 0.2702712849746175];
         // 设置物体沿路径移动 
         truck.movePath({
             'path': [[-3.826, 0.02, 9.944], [-0.138, 0.02, 9.932], [20.19, 0.02, 11.16], [26.296, 0.02, 11.241]], // 路径点数组 
             'time': 2000, // 路径总时间，2秒 
             'orientToPath': true, // 物体移动时沿向路径方向 
             'orientToPathDegree': 0, // 沿向路径方向偏移一定角度 
             //'loopType': THING.LoopType.Repeat, //循环方式
             //结束时的回调 当且仅当没有循环时 才有回调
             'complete': function () {
                 carMove();
             }
         })
     } else {
         initThingJsTip('请先创建车辆和货物模型');
     }
 }
 
 /**
  * 叉车移动到车辆附近
  */
 function carMove() {
     initThingJsTip('车辆正在装载货物');
     car01.moveTo({
         position: [21.142, 0.02, 11.041],// 世界坐标系下的绝对位置
         time: 2 * 1000,
         orientToPath: true,// 物体移动时沿向路径方向
         complete: function () {
             carRotate();
         }
     });
 }
 
 /**
  * 叉车旋转角度
  */
 function carRotate() {
     car01.rotateTo({
         angles: [0, 90, 0],
         time: 2000,
         complete: function () {
             carPlay();
         }
     });
 }
 
 /**
  * 叉车开启动画，携带货物移动到车辆位置
  */
 function carPlay() {
     car01.playAnimation({
         name: '_起_',
         complete: function (ev) {
             car01.moveTo({
                 position: [22.789, 0, 11.3],// 世界坐标系下的绝对位置
                 time: 2 * 1000,
                 orientToPath: false,// 物体移动时沿向路径方向
                 complete: function () {
                     carMove2();
                 }
             });
         }
     })
 }
 
 /**
  * 叉车开启动画，放下货物返回初始位置，车辆携带货物返回
  */
 function carMove2() {
     car01.playAnimation('落');
     truck.add(box1);
     box1.localPosition = [0, 1.2, -1.5]
     car01.movePath({
         'path': [[22.128, 0, 10.881], [21.128, 0, 10.881], [20.128, 0, 10.881], [19.128, 0, 10.881], [18.95, 0.01, 6.77]],
         'time': 4000,
         'orientToPath': true,
         'orientToPathDegree': 0,
         'complete': function () {
             car01.position = [18.95, 0.01, 6.77];
             car01.angles = [0, 0, 0];
             truck.movePath({
                 'path': [[28.044, 0.02, 12.161], [28.074, 0.02, 6.034], [28.126, 0.02, 2.13], [27.075, 0.02, 0.793], [19.188, 0.02, -1.191], [-6.821, 0.02, -0.92], [-8.79, 0.02, 0.59], [-9.727, 0.02, 8.063]],
                 'time': 4000,
                 'orientToPath': true,
                 'orientToPathDegree': 10,
                 'complete': function () {
                     initThingJsTip('车辆运输货物完成');
                 }
             })
         }
     });
     initThingJsTip('车辆运输货物中');
 }
 
 /**
  * 清除自定义类对象设置的样式
  */
 function reset() {
     // 摄像机飞行到某位置
     app.camera.flyTo({
         'position': [36.013, 42.67799999999998, 61.72399999999999],
         'target': [1.646, 7.891, 4.445],
         'time': 2000,
         'complete': function () {
         }
     });
 
     car01.stopMoving();
     car01.stopAnimation();
     car01.position = [18.95, 0.01, 6.77];
     car01.angles = [0, 0, 0];
     // 移除场景中name中包含thing的对象
     var thingArr = app.query(/thing0/);
     thingArr.destroyAll();
     truck = null;
     box1 = null;
     initThingJsTip('请点击创建车辆模型按钮');
 }