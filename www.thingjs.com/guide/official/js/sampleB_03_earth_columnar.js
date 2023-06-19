/**
 * @version 2.0
 * @version earth
 * @author ThingJS
*/ 
 var app = new THING.App();
 // 设置app背景为黑色
 app.background = [0, 0, 0];
 
 var newarr = [];
 var newarr2 = [];
 var arr = [[116.38354176726432, 40.17230758201418, -34.176742266863585], [125.36484652840801, 43.85123241155942, -22.210576059296727], [111.73006345418827, 41.533512267545674, -768.456456639804], [117.74427506291795, 36.22790911048895, -647.7772903181612], [117.1936862781809, 31.46460459607162, -212.50968686211854], [102.82901964710327, 30.598154315755497, -927.4132056906819], [113.51511337775963, 23.719122209054227, -722.9707848932594], [109.7174908692081, 19.354031669764606, -418.8127407776192], [86.10563638513531, 39.95871168942373, -808.8531697271392]]
 var arr2 = [[123.34748648283116, 41.71879570402351, -31.36280483752489], [126.97682348674348, 46.1620431499386, -190.1125242281705], [115.27934574773056, 38.419578025490544, -682.8319045007229], [112.11932802650686, 37.24020770907718, -564.6503884224221], [108.95936809194295, 34.3385397326527, -541.0341800330207], [111.67090473964048, 27.727275612998096, -969.6346012260765], [90.44658124999674, 30.703494880274516, -883.0296831913292]]
 var colorMapping = {
     0: "#004FEA",
     0.24: "#004FEA",
     0.241: "#00B3B3",
     0.5: "#00B3B3",
     0.501: "#00B3B3",
     0.74: "#00B450",
     0.741: "#EAC700",
     1: "#EAC700"
 };
 // 创建一个地球     
 var map = new THING.EARTH.Map({
     type: "Map",
     // CityBuilder转出的url
     url: "https://www.thingjs.com/citybuilder_console/mapProject/config/TVRFek5ETXdDaXR5QnVpbGRlckAyMDE5",
     complete: function (event) {
         for (var i = 0; i < arr.length; i++) {
             var coordinates = createCoordinates(arr[i], 15);
             createPoint(coordinates, colorMapping);
         }
         for (var i = 0; i < arr2.length; i++) {
             var coordinates = createCoordinates(arr2[i], 15);
             createPoint(coordinates, colorMapping);
         }
     }
 });
 
 function createCoordinates(point, n) {
     var coordinates = [];
     for (var i = 0; i < n; i++) {
         var xy = [point[0] + 0.3 * Math.cos(2 * Math.PI * i / n), point[1] + 0.3 * Math.sin(2 * Math.PI * i / n) * 0.75];
         coordinates.push(xy);
     }
 
     return coordinates;
 }
 
 // 创建一个 ThingLayer
 var thingLayer = new THING.EARTH.ThingLayer({
     name: "thingLayer01",
 });
 // 将ThingLayer添加到地图中
 map.addLayer(thingLayer);
 /**
  * 创建地理多边形
  */
 function createPoint(coordinates, colorMapping) {
     var geoPolygon =
         new THING.EARTH.GeoPolygon({
             type: 'GeoPolygon',
             name: '多边形_纯色',
             coordinates: coordinates, // 支持Polygon和MultiPolygon,格式可参考geoJson规范
             extrudeHeight: 300000, //拉伸高度100m
             style: {
                 type: 'vector', // 纯色填充
                 color: "#EAC700", // 面填充颜色
                 lights: false,//默认为true，受光照影响，为false不受光照影响
                 gradient: colorMapping,
             }
         });
     thingLayer.add(geoPolygon);
 }
 
 // 创建提示
 initThingJsTip(`通过绘制地理多边形创建不同分段色指的柱状体`);