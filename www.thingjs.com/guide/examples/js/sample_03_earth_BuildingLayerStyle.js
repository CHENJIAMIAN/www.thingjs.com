/**
 * 说明：
 *       1. 该示例介绍了建筑FeatureLayer的使用方法。
 *       2. 示例中所有修改的参数均可以在单个物体身上修改,出于篇幅考虑只写了一个。
 * 操作：点击按钮修改建筑图层样式。 
 */
var app = new THING.App();
app.background = [0, 0, 0];

// 引用地图组件脚本
THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    // 创建一个地图
    var map = app.create({
        type: 'Map',
        attribution: '高德',
        style: {
            fog: true,
            night: false
        }
    });
    // 创建一个瓦片图层
    var tileLayer1 = app.create({
        type: 'TileLayer',
        name: '卫星影像图层',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        style: {
            template: CMAP.TileLayerStyle.DARKBLUE
        }
    });
    // 将瓦片图添加到底图图层中
    map.addLayer(tileLayer1);
    // 摄像机飞到特定位置和角度
    app.camera.earthFlyTo(
        {
            'time': 2000,
            lonlat: [116.4488, 39.9187],
            height: 4000,
            complete: function () {
                addLayer();
            }
        }
    );
    function addLayer() {
        var buildingLayer = app.query('buildingLayer')[0];
        if (!buildingLayer) {
            $.ajax({
                type: 'GET',
                url: 'https://www.thingjs.com/uearth/uGeo/chaoyang_building.geojson',
                dataType: 'json',
                success: function (data) {
                    buildingLayer = app.create({
                        type: 'FeatureLayer',
                        name: 'buildingLayer',
                        dataSource: data,
                        geometryType: 'GeoBuilding',
                        extrudeField: 'height',
                        renderer: {
                            type: 'image',
                            imageUrl: ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'],  // 楼宇顶部贴图和侧边贴图
                            textureWrap: CMAP.TextureWrapMode.Stretch  // 贴图循环方式为拉伸
                        }
                    });
                    // 图层添加到Map
                    map.addLayer(buildingLayer);
                    // 添加默认提示
                    initThingJsTip("点击左侧按钮修改建筑图层样式");

                    new THING.widget.Button('修改拉伸倍数', function () {
                        if (buildingLayer.extrudeFactor === 1) {
                            buildingLayer.extrudeFactor = 2;
                            initThingJsTip("建筑已被拉伸至两倍，再次点击可恢复默认");
                        } else {
                            buildingLayer.extrudeFactor = 1;
                            initThingJsTip("建筑拉伸倍数已恢复至默认状态");
                        }
                    });

                    new THING.widget.Button('修改贴图方式', function () {
                        // CMAP.TextureWrapMode.Stretch 拉伸 CMAP.TextureWrapMode.RepeatY y轴(上下方向)平铺
                        if (buildingLayer.renderer.textureWrap === CMAP.TextureWrapMode.Stretch) {
                            buildingLayer.renderer.textureWrap = CMAP.TextureWrapMode.RepeatY;
                            initThingJsTip("建筑贴图方式已被修改，再次点击可恢复默认");
                        } else {
                            buildingLayer.renderer.textureWrap = CMAP.TextureWrapMode.Stretch;
                            initThingJsTip("建筑贴图方式已恢复至默认状态");
                        }
                    });

                    new THING.widget.Button('修改贴图', function () {
                        if (buildingLayer.renderer.type === 'image') {
                            // 贴图可以是两个元素的数组，分别代表顶面和侧面的贴图，也可以是一个元素的数组、顶面和侧面都使用这一个贴图
                            if (buildingLayer.renderer.imageUrl.toString() === ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'].toString()) {
                                buildingLayer.renderer.imageUrl = ['https://www.thingjs.com/uearth/uGeo/building.png', 'https://www.thingjs.com/uearth/uGeo/building_top.png'];
                                initThingJsTip("建筑贴图已被修改，再次点击可恢复默认");
                            } else {
                                buildingLayer.renderer.imageUrl = ['https://www.thingjs.com/uearth/uGeo/building_top.png', 'https://www.thingjs.com/uearth/uGeo/building.png'];
                                initThingJsTip("建筑贴图已恢复至默认状态");
                            }
                        } else {
                            initThingJsTip("image 类型才可以修改贴图");
                        }
                    });

                    new THING.widget.Button('修改类型', function () {
                        if (buildingLayer.renderer.type === 'image') {
                            // 使用颜色渲染建筑
                            buildingLayer.renderer.type = 'vector';
                            // 建筑的颜色
                            buildingLayer.renderer.color = '#95a5a6';
                            initThingJsTip("建筑类型已修改为 vector");
                        } else {
                            // 切回贴图模式,由于renderer中已经有imageUrl属性,因此不需要重复设置
                            buildingLayer.renderer.type = 'image';
                            initThingJsTip("建筑类型已修改为 image");
                        }
                    });

                    new THING.widget.Button('修改颜色', function () {
                        if (buildingLayer.renderer.type === 'vector') {
                            console.log(buildingLayer.renderer.color)
                            // 得到的color都是16进制的格式
                            if (buildingLayer.renderer.color === '#95a5a6') {
                                buildingLayer.renderer.color = '#153E81';
                                initThingJsTip("建筑颜色已被修改，再次点击可恢复默认");
                            } else {
                                buildingLayer.renderer.color = '#95a5a6';
                                initThingJsTip("建筑颜色已恢复至默认状态");
                            }
                        } else {
                            initThingJsTip("vector 类型才可以修改颜色");
                        }
                    });

                    new THING.widget.Button('叠加特效', function () {
                        buildingLayer.renderer.blending = !buildingLayer.renderer.blending;
                        initThingJsTip("建筑设置叠加特效，再次点击可恢复默认");
                    });

                    new THING.widget.Button('抬高', function () {
                        if (buildingLayer.offsetHeight === 0) {
                            buildingLayer.offsetHeight = 100;
                            initThingJsTip("建筑离地高度已被修改，再次点击可恢复默认");
                        } else {
                            buildingLayer.offsetHeight = 0;
                            initThingJsTip("建筑离地高度已恢复至默认状态");
                        }
                    });
                }
            });
        }
    }
});