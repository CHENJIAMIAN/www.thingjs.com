/**
 * 说明：点FeatureLayer的使用方法
 * 功能：修改点图层的尺寸、图片、类型、形状、颜色等
 * 备注：示例中所有整体修改的参数均可以在单个物体身上修改
 * 操作：点击按钮
 */
 var app = new THING.App();
 app.background = [0, 0, 0];  // 设置背景颜色
 var pointLayer;
 // 引用地图组件脚本
 THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
         // 创建一个地图
         var map = app.create({
             type: 'Map',
             attribution: '高德',
             style: {
                 night: false
             }
         });
         // 创建一个瓦片图层
         var tileLayer1 = app.create({
             type: 'TileLayer',
             name: '卫星影像图层',
             url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
         });
 
         map.addLayer(tileLayer1);  // 将瓦片图添加到底图图层中
 
         // 摄像机飞到特定位置和角度
         app.camera.earthFlyTo({
             'time': 2000,
             'lonlat': [116.4424, 39.9201],  // 经纬度
             'height': 5000,
             complete: function () {
             }
         });
 
         // 定义波纹
         var infoWindowHtml = `<div class="water"><div style="display:none" class="point"></div> </div>`;
         $('head').append($(`
                      <style>
                        .water{
                           width: 30px;
                           height: 30px;
                           position: relative;
                        }
                        .water .point{
                           position: absolute;
                           border-radius: 50%;
                           animation: border 3.5s linear infinite;
                        }
 
                        @keyframes border{
                           from {
                             width: 0;
                             height: 0;
                             top: 50%;
                             left: 50%;
                             background-color: rgba(237,80,40,1);
                           }
                           to {
                             width: 100%;
                             height: 100%;
                             top: 0;
                             left: 0;
                             background-color: rgba(237,80,40,0);
                           }
                        }
                      </style>
         `));
 
         $.ajax({
             type: 'GET',
             url: 'https://www.thingjs.com/uearth/uGeo/sample_point.geojson',
             dataType: 'json',
             success: function (data) {
                 // 创建 FeatureLayer 图层
                 pointLayer = app.create({
                     type: 'FeatureLayer',
                     name: 'pointLayer',
                     dataSource: data,  // 数据，目前只支持geojson
                     geometryType: 'GeoPoint',  // 数据类型，目前支持 GeoPoint GeoLine GeoPolygon GeoHeatMap和GeoBuilding
                     renderer: {
                         type: 'image',  // image代表创建图片类型的点
                         url: 'https://www.thingjs.com/static/image/train_station.png',  // 图片的url
                         size: 5  // 尺寸
                     },
                     infoWindow: {
                         displayMode: CMAP.DisplayMode.Always,  // 常显
                         type: CMAP.InfoWindowType.Custom,  // 自定义InfoWindow
                         customHtml: infoWindowHtml
                     },
                 });
                 map.addLayer(pointLayer);
 
                 pointLayer.on('click', function (e) {
                     // e.object可以获取到点击到的对象
                     initThingJsTip(e.object.userData.NAME);
                 });
                 new THING.widget.Button('修改尺寸', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.size === 5) {
                             pointLayer.renderer.size = 8;
                         } else {
                             pointLayer.renderer.size = 5;
                         }
                         // 通过FeatureLayer实例的objects属性可以获取到图层中的所有对象
                         // pointLayer.objects[0]
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('修改图片', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.type === 'image') {
                             if (pointLayer.renderer.url === 'https://www.thingjs.com/static/image/train_station.png') {
                                 pointLayer.renderer.url = 'https://www.thingjs.com/static/image/uGeo/pop.png';
                             } else {
                                 pointLayer.renderer.url = 'https://www.thingjs.com/static/image/train_station.png';
                             }
                         } else {
                             initThingJsTip('image类型才可以修改图片url，点击按钮【修改类型】');
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('修改类型', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.type === 'image') {
                             // 设置矢量渲染方式,默认填充色为白色,这里设置成红色
                             pointLayer.renderer.color = [255, 0, 0];
                             pointLayer.renderer.type = 'vector';
                             initThingJsTip('修改类型为 vector');
                         } else {
                             pointLayer.renderer.type = 'image';
                             initThingJsTip('修改类型为 image');
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('修改填充颜色', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.type === 'vector') {
                             // 得到的color都是16进制的格式
                             if (pointLayer.renderer.color === '#ff0000') {
                                 pointLayer.renderer.color = [0, 255, 0];
                             } else {
                                 pointLayer.renderer.color = [255, 0, 0];
                             }
                         } else {
                             initThingJsTip('vector类型才可以修改填充颜色，点击按钮【修改类型】');
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('修改边框颜色', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.type === 'vector') {
                             // 得到的color都是16进制的格式
                             if (pointLayer.renderer.lineColor === '#ffffff') {
                                 pointLayer.renderer.lineColor = [0, 0, 255];
                             } else {
                                 pointLayer.renderer.lineColor = [255, 255, 255];
                             }
                         } else {
                             initThingJsTip('vector类型才可以修改边框颜色，点击按钮【修改类型】');
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('修改形状', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.type === 'vector') {
                             // vectorType 支持circle,triangle,rectangle,cross
                             if (pointLayer.renderer.vectorType === 'circle') {
                                 pointLayer.renderer.vectorType = 'triangle';
                             } else {
                                 pointLayer.renderer.vectorType = 'circle';
                             }
                         } else {
                             initThingJsTip('vector类型才可以修改形状，点击按钮【修改类型】');
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('旋转点', function () {
                     if ($('.point').css('display') == 'none') {
                         if (pointLayer.renderer.rotateSpeed === 0) {
                             pointLayer.renderer.rotateSpeed = 0.5;  // 设置旋转速度
                         } else {
                             pointLayer.renderer.rotateSpeed = 0;
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('点标注', function () {
                     if ($('.point').css('display') == 'none') {
                         if (!pointLayer.label) {
                             // 图层标注信息 属性可参考LayerLabel类
                             pointLayer.label = {
                                 text: '{{NAME}}',
                                 offset: [0, 20],
                                 fontColor: [255, 255, 255],
                                 fontSize: 20
                             };
                         } else {
                             pointLayer.label.visible = !pointLayer.label.visible;
                             document.getElementsByClassName
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 // 波纹开启状态定义
                 new THING.widget.Button('波纹', function () {
                     if ($('.point').css('display') == 'none') {
                         $('.point').css('display', 'block');  // 设置波纹开启
                         pointLayer.renderer.size = 0;
                         if (pointLayer.label) {
                             if (pointLayer.label.visible == true) {
                                 pointLayer.label.visible = false;
                             }
                         }
                     } else {
                         $('.point').css('display', 'none');  // 设置波纹关闭
                         pointLayer.renderer.size = 5;
                     }
                 });
 
                 new THING.widget.Button('抬高点', function () {
                     if ($('.point').css('display') == 'none') {
                         if (document.getElementsByClassName('water')) {
                             let water = document.getElementsByClassName('water');
                             water.visible = false
                         }
                         if (pointLayer.offsetHeight === 0) {
                             pointLayer.offsetHeight = 100;  // 设置离地高度 单位米
                         } else {
                             pointLayer.offsetHeight = 0;
                         }
                     } else {
                         initThingJsTip('波纹效果关闭后，才可以操作其它效果，点击按钮【波纹】');
                     }
                 });
 
                 new THING.widget.Button('重置', function () {
                     initThingJsTip("鼠标单击标注，显示点信息");  // 创建提示界面
                     $('.point').css('display', 'none');
                     pointLayer.renderer.size = 5;
                     pointLayer.renderer.url = 'https://www.thingjs.com/static/image/train_station.png';
                     pointLayer.renderer.type = 'image';
                     pointLayer.renderer.color = [255, 0, 0];
                     pointLayer.renderer.lineColor = [255, 255, 255];
                     pointLayer.renderer.vectorType = 'circle';
                     pointLayer.renderer.rotateSpeed = 0;
                     if(pointLayer.label){
                         pointLayer.label.visible = false;
                     }
                     pointLayer.offsetHeight = 0;
                 });
             }
         });
     });
 
 // 创建提示
 initThingJsTip("鼠标单击标注，显示点信息");