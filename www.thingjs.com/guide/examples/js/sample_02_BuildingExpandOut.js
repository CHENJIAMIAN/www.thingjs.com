/**
 * 说明：展示建筑结构
 * 功能：获取园区中的建筑（buildings）、物体（things）、地面（ground），设置外立面的显示隐藏
 * 操作：点击按钮，查看功能
 */
 var campus;// 园区对象

 // 加载场景代码 
 var app = new THING.App({
     url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
     background: '#000000',
     env: 'Seaside',
 });
 
 app.on('load', function (ev) {
     // 创建提示
     initThingJsTip("点击按钮，可获取园区中的建筑（buildings）、物体（things）、地面（ground），设置建筑外立面显示隐藏");
     createHtml();
 
     campus = app.query(".Campus")[0];  // 获取园区对象
     new THING.widget.Button("获取buildings", function () {
         // 初始化设置
         reset();
 
         var buildings = campus.buildings; // 获取园区下的所有建筑，返回为 Selector 结构
         buildings.forEach(function (item) {
             // 创建标注
             var ui = app.create({
                 type: 'UIAnchor',
                 parent: item,
                 element: createElement(item.id), // 此参数填写要添加的Dom元素
                 localPosition: [0, 1, 0],
                 pivot: [0.5, 1] //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
             });
             $('#' + item.id + ' .text').text(item.name);
         })
     })
 
     new THING.widget.Button("获取things", function () {
         // 初始化设置
         reset();
 
         // 获取园区下的所有 Thing 类物体，返回为 Selector 结构
         var things = campus.things;
         things.forEach(function (item) {
             // 创建标注
             var ui = app.create({
                 type: 'UIAnchor',
                 parent: item,
                 element: createElement(item.id), // 此参数填写要添加的Dom元素
                 localPosition: [0, 1, 0],
                 pivot: [0.5, 1] //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
             });
             $('#' + item.id + ' .text').text(item.name);
         })
     })
 
     new THING.widget.Button("获取ground", function () {
         // 初始化设置
         reset()
 
         var ground = campus.ground;  // 获取园区下的 ground
         // 创建标注
         var ui = app.create({
             type: 'UIAnchor',
             element: createElement(ground.id), // 此参数填写要添加的Dom元素
             position: [1.725, 0.02, 5.151],
             pivot: [0.5, 1] //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
         });
         $('#' + ground.id + ' .text').text('ground');
     })
 
     new THING.widget.Button("隐藏外立面", function () {
         // 初始化设置
         reset(true);
         var build = app.query('107')[0];  // 获取园区中的建筑
 
         if ($("input[value='隐藏外立面']").length) {
             $("input[value='隐藏外立面']").val('显示外立面');
 
             build.facade.visible = false;  // 隐藏外立面
             build.floors.visible = true;  // 显示楼层
         } else {
             $("input[value='显示外立面']").val('隐藏外立面');
 
             build.facade.visible = true;  // 显示外立面
             build.floors.visible = false;  // 隐藏楼层
         }
     })
 
     new THING.widget.Button("重置", function () {
         // 初始化设置
         reset();
     })
 
     /**
      * 恢复初始化
      */
     function reset(flag) {
         $(".marker").remove();  // 移除标注
 
         if (flag) return;
         $("input[value='显示外立面']").val('隐藏外立面');
 
         var build = app.query('107')[0];  // 获取园区中的建筑
         build.facade.visible = true;  // 显示外立面
         build.floors.visible = false;  // 隐藏楼层
 
         createHtml();
         // 创建提示
         initThingJsTip("点击按钮，可获取园区中的建筑（buildings）、物体（things）、地面（ground），设置建筑外立面显示隐藏");
     }
 })
 
 /**
  * 创建html
  */
 function createHtml() {
     var html =
         `<div id="board" class="marker" style="position: absolute;">
               <div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
               </div>
               <div class="picture" style="height: 30px;width: 30px;margin: auto;">
                   <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
               </div>
           </div>`;
     $('#div3d').append($(html));
 }
 
 /**
  * 创建元素
  */
 function createElement(id) {
     var srcElem = document.getElementById('board');
     var newElem = srcElem.cloneNode(true);
     newElem.style.display = "block";
     newElem.setAttribute("id", id);
     app.domElement.insertBefore(newElem, srcElem);
     return newElem;
 }