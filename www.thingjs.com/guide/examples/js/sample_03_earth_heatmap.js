/**
 * 说明：在地球上添加热力图图层
 */
 var app = new THING.App();
 app.background = [0, 0, 0];
 
 // 引用地图组件脚本
 THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
 
     var map = app.create({
         type: 'Map',
         style: {
             night: false
         },
         attribution: '高德'
     });
 
     var tileLayer1 = app.create({
         type: 'TileLayer',
         id: 'tileLayer1',
         url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
     });
     map.baseLayers.add(tileLayer1);
     drawGeoHeatMap();
 
     var gradientObj = {
         '常规': { 0: 'rgb(0,0,255)', 0.33: 'rgb(0,255,0)', 0.66: 'rgb(255,255,0)', 1.0: 'rgb(255,0,0)' }
         , '黄色': { 0: 'rgb(255,237,160)', 0.33: 'rgb(254,217,118)', 0.66: 'rgb(227,26,28)', 1.0: 'rgb(189,0,38)' }
         , '蓝色': { 0: 'rgb(8,104,172)', 0.33: 'rgb(67,162,202)', 0.66: 'rgb(100,200,200)', 1.0: 'rgb(186,228,188)' }
     };
     var panel = new THING.widget.Panel({
         titleText: '热力图设置',
         hasTitle: true,
         width: 250
     });
 
     var config = {
         mosaic: false,
         needsUpdate: true,
         mosaicSize: 5,
         radius: 11,
         minOpacity: 0.2,
         maxOpacity: 0.8,
         gradient: '常规',
     };
 
     panel.addBoolean(config, 'mosaic').caption('开启马赛克').onChange(v => {
         app.query('.HeatMapLayer')[0].renderer.mosaic = v;
     });
     panel.addBoolean(config, 'needsUpdate').caption('随相机变化更新').onChange(v => {
         app.query('.HeatMapLayer')[0].needsUpdate = v;
     });
     panel.addNumberSlider(config, 'radius').caption('热度半径').min(1).max(50).isChangeValue(true).on('change', function (v) {
         app.query('.HeatMapLayer')[0].renderer.radius = v;
     });
     panel.addNumberSlider(config, 'minOpacity').caption('最小值透明度').step(0.01).min(0).max(1.0).isChangeValue(true).on('change', function (v) {
         app.query('.HeatMapLayer')[0].renderer.minOpacity = v;
     });
     panel.addNumberSlider(config, 'maxOpacity').caption('最大值透明度').step(0.01).min(0).max(1.0).isChangeValue(true).on('change', function (v) {
         app.query('.HeatMapLayer')[0].renderer.maxOpacity = v;
     });
     panel.addRadio(config, 'gradient', ['常规', '黄色', '蓝色']).on('change', function (v) {
         app.query('.HeatMapLayer')[0].renderer.gradient = gradientObj[v];
     });
 
     //创建热力图 数据源的格式与FeatureLayer相同
     //valueField代表用来生成热力图使用的权重字段,不传的话所有点的权重相同,如果传则从数据的properties中读取该字段的值作为权重值
     function drawGeoHeatMap() {
         $.ajax({
             type: 'GET',
             url: 'https://www.thingjs.com/uearth/res/beijing-POIs-3211.geojson',
             dataType: 'json',
             success: function (data) {
 
                 // 摄像机飞行到某位置
                 app.camera.flyTo({
                     'position': [2180781.194387175, 4091480.6054394436, 4392164.618219831],
                     'target': [2175757.1660447326, 4092209.551760269, 4381641.899891754],
                     'time': 2000,
                     'complete': function () {
                         var layer = app.create({
                             type: 'HeatMapLayer',
                             dataSource: data, //数据源 geojson格式
                             needsUpdate: config.needsUpdate, //是否随相机的变化重新绘制热力图
                             renderer: {
                                 radius: config.radius, // 影响半径
                                 minOpacity: config.minOpacity,//最小值的透明度
                                 maxOpacity: config.maxOpacity,//最大值的透明度
                                 mosaic: config.mosaic,//是否使用马赛克效果
                                 mosaicSize: config.mosaicSize,//马赛克效果的像素值
                                 gradient: gradientObj[config.gradient] //色带
                             },
                         });
                         map.addLayer(layer);
                     }
                 });
             }
         });
     }
     
     // 创建提示
     initThingJsTip("地图中可以添加热力图图层，左侧面板可对热力图各种参数进行调整");
     $(".warninfo3").css("left", "55%");
 });