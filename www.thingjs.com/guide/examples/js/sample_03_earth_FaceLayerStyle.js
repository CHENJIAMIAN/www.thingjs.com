/**
 * 说明：面FeatureLayer的使用方法
 * 功能：修改面图层的类型、形状、贴图、边框颜色、宽度、发光
 * 备注：示例中所有整体修改的参数均可以在单个物体身上修改
 * 操作：点击按钮
 */

var app = new THING.App();
app.background = [0, 0, 0];

// 引用地图组件脚本
THING.Utils.dynamicLoad(["https://www.thingjs.com/uearth/uearth.min.js"], function () {
    // 创建一个地图
    var map = app.create({
        type: "Map",
        attribution: "高德",
        style: {
            night: false,
        }
    });

    // 创建一个瓦片图层
    var tileLayer1 = app.create({
        type: "TileLayer",
        name: "卫星影像图层",
        url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        style: {
            template: CMAP.TileLayerStyle.DARKBLUE
        }
    });

    // 将瓦片图添加到底图图层中
    map.addLayer(tileLayer1);

    // 摄像机飞到特定位置和角度
    app.camera.earthFlyTo({
        time: 2000,
        lonlat: [116.6861, 39.5734],
        height: 200000,
        complete: function () {
            addLayer();
        },
    });

    /**
     * 创建图层并修改样式
     */
    function addLayer() {
        var polygonLayer = app.query("polygonLayer")[0];
        if (!polygonLayer) {
            $.ajax({
                type: "GET",
                url: "https://www.thingjs.com/uearth/uGeo/boundary.geojson",
                dataType: "json",
                success: function (data) {
                    polygonLayer = app.create({
                        type: "FeatureLayer",
                        name: "polygonLayer",
                        dataSource: data,
                        geometryType: "GeoPolygon",
                        height: 10000, // 拔起的高度 单位米
                        renderer: {
                            type: "vector", // 纯色填充
                            color: [255, 38, 64], // 填充色
                            opacity: 0.5, // 透明度
                            outlineWidth: 5, // 边框宽度
                            outlineColor: [255, 64, 38], // 边框色
                        },
                    });
                    map.addLayer(polygonLayer);

                    polygonLayer.on("click", function (e) {
                        // e.object可以获取到点击到的对象
                        console.log(e.object.userData.name);
                    });
                    new THING.widget.Button("修改边线宽度", function () {
                        if (polygonLayer.renderer.outlineWidth === 5) {
                            polygonLayer.renderer.outlineWidth = 10;
                        } else {
                            polygonLayer.renderer.outlineWidth = 5;
                        }
                        initThingJsTip("修改边线宽度为" + polygonLayer.renderer.outlineWidth);
                        // 单个图层对象
                        // polygonLayer.objects[0]
                    });

                    new THING.widget.Button("修改填充颜色", function () {
                        if (polygonLayer.renderer.type === "vector") {
                            // 得到的color都是16进制的格式
                            if (polygonLayer.renderer.color !== "#00ff00") {
                                polygonLayer.renderer.color = [0, 255, 0];
                            } else {
                                polygonLayer.renderer.color = [255, 38, 64];
                            }
                            initThingJsTip("填充颜色" + polygonLayer.renderer.color);
                        } else {
                            initThingJsTip("vector类型才可以修改颜色，点击按钮【修改类型】");
                        }
                    });

                    new THING.widget.Button("修改类型", function () {
                        if (polygonLayer.renderer.type === "image") {
                            initThingJsTip("类型修改为vector");
                            polygonLayer.renderer.type = "vector";
                        } else {
                            // 贴图形式需指定imageUrl
                            polygonLayer.renderer.imageUrl = "https://www.thingjs.com/uearth/uGeo/building.png";
                            polygonLayer.renderer.type = "image";
                        }
                        initThingJsTip("类型修改为" + polygonLayer.renderer.type);
                    });

                    new THING.widget.Button("修改贴图", function () {
                        if (polygonLayer.renderer.type === "image") {
                            initThingJsTip("当前为类型image类型可修改贴图");
                            if (polygonLayer.renderer.imageUrl === "https://www.thingjs.com/uearth/uGeo/building_top.png") {
                                polygonLayer.renderer.imageUrl = "https://www.thingjs.com/uearth/uGeo/building.png";
                            } else {
                                polygonLayer.renderer.imageUrl = "https://www.thingjs.com/uearth/uGeo/building_top.png";
                            }
                        } else {
                            initThingJsTip("当前为类型vector不可修改贴图");
                        }

                    });

                    new THING.widget.Button("修改边框发光", function () {
                        initThingJsTip("修改边框发光");
                        polygonLayer.renderer.outlineEffect = !polygonLayer.renderer.outlineEffect;
                    });

                    new THING.widget.Button("修改边框颜色", function () {
                        if (polygonLayer.renderer.outlineColor !== "#00ff00") {
                            // 得到的color都是16进制的格式
                            polygonLayer.renderer.outlineColor = [0, 255, 0];
                        } else {
                            polygonLayer.renderer.outlineColor = [255, 255, 59];
                        }
                        initThingJsTip("修改边框颜色为" + polygonLayer.renderer.outlineColor);
                    });

                    new THING.widget.Button("修改高度", function () {
                        // 修改图层中所有对象的拉伸高度
                        if (polygonLayer.height === 10000) {
                            polygonLayer.height = 5000;
                        } else {
                            polygonLayer.height = 10000;
                        }
                        initThingJsTip("修改高度为" + polygonLayer.height);
                    });

                    new THING.widget.Button("整体抬高", function () {
                        if (polygonLayer.offsetHeight === 0) {
                            polygonLayer.offsetHeight = 10000;
                        } else {
                            polygonLayer.offsetHeight = 0;
                        }
                        initThingJsTip("整体抬高" + polygonLayer.offsetHeight);
                    });

                    new THING.widget.Button("重置", function () {
                        initThingJsTip("本例程介绍了面FeatureLayer的使用方法，可设置面图层类型、颜色、边框等。点击按钮，查看效果");
                        polygonLayer.renderer.type = "vector";
                        polygonLayer.height = 10000;
                        polygonLayer.offsetHeight = 0;
                        polygonLayer.renderer.opacity = 0.5;
                        polygonLayer.renderer.outlineWidth = 5;
                        polygonLayer.renderer.outlineColor = [255, 64, 38, 1];
                        polygonLayer.renderer.color = [255, 38, 64];
                        polygonLayer.renderer.outlineEffect = false;
                    });
                },
            });
        }
    }
}
);

// 创建提示
initThingJsTip("本例程介绍了面FeatureLayer的使用方法，可设置面图层类型、颜色、边框等。点击按钮，查看效果");