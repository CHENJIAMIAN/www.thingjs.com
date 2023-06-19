/**
 * 该示例是一个综合性的例子 主要介绍了如何从CityBuilder转出的地球项目获取图层,控制图层显隐,在地球上创建ThingLayer,FeatureLayer和园区
 */
var app = new THING.App();
app.background = [0, 0, 0];

// 引用地图组件脚本
THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
  app.create({
    type: 'Map',
    //CityBuilder转出的url
    url: 'https://www.thingjs.com/citybuilder_console/mapProject/config/TXpBME56RT1DaXR5QnVpbGRlckAyMDE5',
    complete: function (event) {
      //在这里编写业务代码
      const map = event.object;
      // 地图注册点击事件
      map.on('click', function (ev) {
        console.clear();

        // 获取鼠标点击处的经纬度
        var lonlat = ev.coordinates;
        console.log(lonlat);
        // 将经纬度坐标转为三维坐标，第二个参数代表离地高度
        var worldPos = CMAP.Util.convertLonlatToWorld(lonlat, 0);
        console.log(worldPos);
        // 根据经纬度和方位角计算物体在地球上的旋转信息，第二个参数为方位角 默认0
        var angles = CMAP.Util.getAnglesFromLonlat(lonlat, 0);
        console.log(angles);
      });
      //获取项目中的业务图层
      const userLayers = map.userLayers;
      //根据名称查询图层对象 名称是在CityBuilder中配置的图层的名称
      const buildingLayer = app.query('building')[0];
      new THING.widget.Button('显示隐藏建筑图层', function () {
        buildingLayer.visible = !buildingLayer.visible;
      });
      // 创建一个 ThingLayer
      var thingLayer = app.create({
        type: 'ThingLayer',
        name: 'thingLayer01'
      });
      // 将ThingLayer添加到地图中
      map.addLayer(thingLayer);
      $.ajax({
        type: 'GET',
        url: 'https://www.thingjs.com/uearth/res/huajiadi_point.geojson',
        dataType: 'json',
        success: function (data) {
          // 遍历geojson中的数据
          for (var i = 0; i < data.features.length; i++) {
            // 根据geojson中每条记录中的geometry.coordinates和properties创建GeoPoint
            // 注意,这里直接传经纬度即可,经度在前纬度在后
            var geoPoint = app.create({
              type: 'GeoPoint',
              name: 'geoPoint' + i,
              coordinates: data.features[i].geometry.coordinates,
              userData: data.features[i].properties,
              renderer: {
                type: 'image', // image代表创建图片类型的点
                url: 'https://www.thingjs.com/uearth/uGeo/pop.png', // 图片的url
                size: 5  // 尺寸
              },
              label :{
                text:'{{name}}',
                offset:[0,50],
                fontColor:[255,255,255],
                fontSize:20
              }
            });
          }
        }
      });
      //通过FeatureLayer创建绿地
      $.ajax({
        type: 'GET',
        url: 'https://www.thingjs.com/uearth/res/wangjing_green.geojson',
        dataType: 'json',
        success: function (data) {
          const polygonLayer = app.create({
            type: 'FeatureLayer',
            name: 'polygonLayer',
            dataSource: data,
            geometryType: 'GeoPolygon',
            height: 0, // 拔起的高度 单位米
            renderer:
              {
                'type': 'vector', // 纯色填充
                'color': [0, 100, 0],//填充色
                'opacity': 0.3,//透明度
              }
          });
          polygonLayer.on('click',function (ev) {
            console.log(ev.object.name);
          });
          map.addLayer(polygonLayer);
        }
      });

      // 园区的经纬度坐标(GCJ_02坐标系)
      var sceneLonlat = [116.46831761393855, 39.98748940212428];
      // 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
      var position = CMAP.Util.convertLonlatToWorld(sceneLonlat, 0.5);
      // 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
      var angles = CMAP.Util.getAnglesFromLonlat(sceneLonlat, 220);
      //添加一个场景到地球上
      const campus = app.create({
        type: 'Campus',
        name: '工厂',
        url: 'https://www.thingjs.com/static/models/storehouse', // 园区地址
        position: position, // 位置
        angles: angles, // 旋转
        scale:[2,2,2] //缩放倍数
      });
      new THING.widget.Button('飞到园区', function () {
        app.camera.flyTo({
          object:campus,
          isEarth:true
        });
      });
    }
  });
});