/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 该示例介绍了通过CityBuilder转出的url创建的地图如何进行二次开发
 */

// 地图资源点击事件存在bug

var app = new THING.App();
app.background = [0, 0, 0];
new THING.EARTH.Map({
    type: "Map",
    url: "https://www.thingjs.com/citybuilder_console/mapProject/config/TXpBME56RT1DaXR5QnVpbGRlckAyMDE5",
    complete: function (event) {
        var map = event.object;
        map.on('click', function (ev) {
            console.clear();

            // 获取鼠标点击处的经纬度
            var lonlat = ev.coordinates;
            // 将经纬度坐标转为三维坐标，第二个参数代表离地高度
            var worldPos = THING.EARTH.Utils.convertLonlatToWorld(lonlat, 0);
            // 根据经纬度和方位角计算物体在地球上的旋转信息，第二个参数为方位角 默认0
            var angles = THING.EARTH.Utils.getAnglesFromLonlat(lonlat, 0);
        });
        //获取项目中的业务图层
        const userLayers = map.userLayers;
        //根据名称查询图层对象 名称是在CityBuilder中配置的图层的名称
        const buildingLayer = app.query('building')[0];
        new THING.widget.Button('显示隐藏建筑图层', function () {
            buildingLayer.visible = !buildingLayer.visible;
        });
        // 创建一个 ThingLayer
        var thingLayer = new THING.EARTH.ThingLayer({
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
                    var geoPoint = new THING.EARTH.GeoPoint({
                        name: 'geoPoint' + i,
                        coordinates: data.features[i].geometry.coordinates,
                        userData: data.features[i].properties,
                        renderer: {
                            type: 'image', // image代表创建图片类型的点
                            url: 'https://www.thingjs.com/uearth/uGeo/pop.png', // 图片的url
                            size: 5  // 尺寸
                        },
                        label: {
                            text: '{{name}}',
                            offset: [0, 50],
                            fontColor: [255, 255, 255],
                            fontSize: 20
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
                const polygonLayer = new THING.EARTH.FeatureLayer({
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
                polygonLayer.on('click', function (ev) {
                    console.log(ev.object.name);
                });
                map.addLayer(polygonLayer);
            }
        });

        // 园区的经纬度坐标(GCJ_02坐标系)
        var sceneLonlat = [116.46831761393855, 39.98748940212428];
        // 将园区的经纬度坐标转为三维坐标,第二个参数代表离地高度
        var position = THING.EARTH.Utils.convertLonlatToWorld(sceneLonlat, 0.5);
        // // 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
        var angles = THING.EARTH.Utils.getAnglesFromLonlat(sceneLonlat, 220);
        //添加一个场景到地球上
        // 创建Campus
        const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example", {
            position: position, // 位置
            angles: angles, // 旋转
            ignoreTheme: true,
        });
        new THING.widget.Button('飞到园区', function () {
            // 相机飞到指定的地理位置和指定高度 地球上使用flyTo需要加isEarth参数
            app.camera.earthFlyTo({
                lonlat: sceneLonlat,
                height: 200,
                time: 3000,
                complete: function () {

                },
            });
        });
    },
});
