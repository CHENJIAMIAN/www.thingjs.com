/**
 * @version 2.0
 * @author ThingJS
 * 说明：iframe引用上传到网站的 同域 的页面 函数传参相互调用
 * 操作：3D场景中单击物体 将物体name传给页面
 *      页面中单击按钮 进入相应物体的层级，进入层级后 右键返回上一级
 * 难度：★★☆☆☆
 */

 const app = new THING.App();
 app.background = '#000000';
 
 // 加载场景
 const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example", { ignoreTheme: true });
 bundle.waitForComplete().then((ev) => {
     const campus = bundle.campuses[0];
     if (campus) {
         app.levelManager.change(campus);
     }
 
     var build = app.query('.Building');
     build.on('click', (ev) => {
         console.log(ev.target.name)
         var name = ev.target.name;
         iframeDom.contentWindow.changeText(ev.target.name);
     }, { useCapture: true })

     var floor = app.query('.Floor');
     floor.on('click', (ev) => {
         console.log(ev.target.name)
         var name = ev.target.name;
         iframeDom.contentWindow.changeText(ev.target.name);
     }, { useCapture: true })

     var thing = app.query('.Thing');
     thing.on('click', function (ev) {
         if (ev.object) {
             var obj = ev.object;
             var name = obj.name;
             console.log(name, "111")
             // 调用同域的iframe页面内的方法 ChangeText
             iframeDom.contentWindow.changeText(name);
         }
     })
     
     initThingJsTip("本例程展示了网站中上传的页面资源与ThingJS在线开发环境属于同域时，函数之间传参相互调用<br>点击园区中可拾取的对象后，点击Into Level按钮进入对应层级");
 })
 
 // 界面组件
 var panel = new THING.widget.Panel();
 
 // 创建数据对象
 var dataObj = {
     iframe: '/uploads/wechat/emhhbmd4aWFuZw==/file/iframe01/index.html '
 };
 
 var iframe = panel.addIframe(dataObj, 'iframe').caption('iframe');
 
 iframe.setHeight('100px');
 $(".ThingJS_wrap").css("width", "60%");
 var iframeDom = iframe.domElement.getElementsByTagName('iframe')[0];
 
 // 设置iframe滚动条
 // iframeDom.scrolling = "auto";
 function changeLevel(value) {
     var obj = app.query(value)[0];
     if (obj) {
         app.levelManager.change(obj);
     }
 }