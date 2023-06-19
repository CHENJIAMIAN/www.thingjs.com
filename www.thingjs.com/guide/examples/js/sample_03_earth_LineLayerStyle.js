/**
 * 说明：修改线FeatureLayer的使用方法
 * 备注：示例中所有修改的参数均可以在单个物体身上修改,出于篇幅考虑只写了一个
 * 难度：★★☆☆☆
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
        },
    });
    // 创建一个瓦片图层
    var tileLayer1 = app.create({
        type: "TileLayer",
        name: "卫星影像图层",
        url: "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        style: {
            template: CMAP.TileLayerStyle.DARKBLUE, // 设置瓦片图层的样式为DARKBLUE
        },
    });
    // 将瓦片图添加到底图图层中
    map.addLayer(tileLayer1);

    // 摄像机飞行到某位置
    app.camera.flyTo({
        position: [2182239.4599693236, 4094671.06166381, 4381494.033699439],
        target: [2177632.6085063685, 4098068.082322953, 4375230.0756663885],
        time: 2000,
        complete: function () {
            addLayer();
        },
    });

    /**
     * 创建图层并修改样式
     */
    function addLayer() {
        var lineLayer = app.query("lineLayer")[0];
        if (!lineLayer) {
            $.ajax({
                type: "GET",
                url: "https://www.thingjs.com/uearth/uGeo/wangjingRoad.geojson",
                dataType: "json",
                success: function (data) {
                    lineLayer = app.create({
                        type: "FeatureLayer",
                        name: "lineLayer",
                        dataSource: data,
                        geometryType: "GeoLine",
                        renderer: {
                            type: "image", // 贴图材质
                            lineType: "Plane", // 片状线
                            imageUrl: "https://www.thingjs.com/guide/image/uGeo/path.png", // 贴图路径
                            effect: true, // 是否开启发光特效
                            speed: 0.5, // 流动速度
                            width: 2, // 线的宽度
                        },
                    });
                    map.addLayer(lineLayer);

                    new THING.widget.Button("修改线宽", function () {
                        initThingJsTip("修改线宽，再次点击可恢复默认");
                        if (lineLayer.renderer.width === 2) {
                            lineLayer.renderer.width = 5;
                        } else {
                            lineLayer.renderer.width = 2;
                        }
                    });

                    new THING.widget.Button("修改单个线宽", function () {
                        initThingJsTip("修改单个线宽，再次点击可恢复默认");
                        // 通过FeatureLayer实例的objects属性可以获取到图层中的所有对象
                        if (
                            lineLayer.objects[0].renderer.width === 2 ||
                            lineLayer.objects[0].renderer.width === 5
                        ) {
                            lineLayer.objects[0].renderer.width = 20;
                        } else {
                            lineLayer.objects[0].renderer.width = 2;
                        }
                    });

                    new THING.widget.Button("修改贴图", function () {
                        initThingJsTip("修改贴图");
                        if (lineLayer.renderer.type === "image") {
                            if (
                                lineLayer.renderer.imageUrl ===
                                "https://www.thingjs.com/guide/image/uGeo/path.png"
                            ) {
                                lineLayer.renderer.imageUrl =
                                    "https://www.thingjs.com/static/image/uGeo/building.png";
                            } else {
                                lineLayer.renderer.imageUrl =
                                    "https://www.thingjs.com/guide/image/uGeo/path.png";
                            }
                        } else {
                            initThingJsTip(
                                "image类型才可以修改贴图，点击按钮【修改类型】进行类型切换"
                            );
                        }
                    });

                    new THING.widget.Button("修改类型", function () {
                        initThingJsTip("修改类型");
                        if (lineLayer.renderer.type === "image") {
                            initThingJsTip("修改类型，当前类型vector");
                            // 设置颜色渲染需指定color属性
                            lineLayer.renderer.color = [255, 0, 0];
                            lineLayer.renderer.type = "vector";
                        } else {
                            initThingJsTip("修改类型，当前类型image");
                            lineLayer.renderer.type = "image";
                        }
                    });

                    new THING.widget.Button("修改颜色", function () {
                        if (lineLayer.renderer.type === "vector") {
                            initThingJsTip("修改颜色，当前类型 vector，再次点击可恢复默认");
                            // 得到的color都是16进制的格式
                            if (lineLayer.renderer.color === "#ff0000") {
                                lineLayer.renderer.color = [0, 255, 0];
                            } else {
                                lineLayer.renderer.color = [255, 0, 0];
                            }
                        } else {
                            initThingJsTip(
                                "vector类型才可以修改颜色，点击按钮【修改类型】进行类型切换"
                            );
                        }
                    });

                    new THING.widget.Button("修改发光", function () {
                        initThingJsTip("修改发光，再次点击可恢复默认");
                        lineLayer.renderer.effect = !lineLayer.renderer.effect;
                    });

                    new THING.widget.Button("修改流速", function () {
                        initThingJsTip("修改流速，再次点击可恢复默认");
                        if (lineLayer.renderer.speed === 0.5) {
                            lineLayer.renderer.speed = 1;
                        } else {
                            lineLayer.renderer.speed = 0.5;
                        }
                    });

                    new THING.widget.Button("抬高", function () {
                        initThingJsTip("抬高，当图层高度大于500的时候，恢复默认高度");
                        lineLayer.offsetHeight = lineLayer.offsetHeight + 100;
                        if (lineLayer.offsetHeight > 500) {
                            lineLayer.offsetHeight = 0;
                        }
                    });
                },
            });
        } else {
            lineLayer.visible = !lineLayer.visible;
        }
    }
}
);

// 创建提示
initThingJsTip("修改线图层的宽度、贴图、类型、颜色及发光等样式");
