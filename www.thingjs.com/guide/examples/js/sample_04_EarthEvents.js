/**
 * 说明：在地图上给图层添加事件
 * 操作：点击按钮
 */
var app = new THING.App();
app.background = [0, 0, 0];  // 设置app背景为黑色

// 引用地图组件脚本
THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    // 创建一个地球
    var map = app.create({
        type: "Map",
        atmosphere: true,  // 显示/隐藏 大气层 默认显示
        style: {
            night: true,  // 开启/关闭 白天黑夜效果 默认开启
            fog: false,  // 开启/关闭 雾效 默认关闭
        },
        attribution: "高德",  // 右下角地图版权信息
    });

    // 创建一个瓦片图层
    var tileLayer = app.create({
        type: "TileLayer",
        name: "tileLayer1",
        maximumLevel: 18,
        url:
            "https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        style: {
            template: CMAP.TileLayerStyle.DARKBLUE,
        },
    });
    var buildingLayer;  // 建筑图层

    map.addLayer(tileLayer);  // 向地球添加一个瓦片图图层

    // 摄像机飞行到某位置
    app.camera.earthFlyTo({
        time: 2000,
        lonlat: [116.4488, 39.9187],
        height: 3000,
        complete: function () {
            // 添加建筑图层
            $.ajax({
                type: "GET",
                url: "https://www.thingjs.com/uearth/uGeo/chaoyang_building.geojson",
                dataType: "json",
                success: function (data) {
                    buildingLayer = app.create({
                        type: "FeatureLayer",
                        name: "buildingLayer",
                        dataSource: data,
                        geometryType: "GeoBuilding",
                        extrudeField: "height",
                        renderer: {
                            type: "image",
                            imageUrl: [
                                "https://www.thingjs.com/uearth/uGeo/building_top.png",
                                "https://www.thingjs.com/uearth/uGeo/building.png",
                            ],  // 楼宇顶部贴图和侧边贴图
                            textureWrap: CMAP.TextureWrapMode.Stretch,  // 贴图循环方式为拉伸
                        },
                    });
                    // 图层添加到Map
                    map.addLayer(buildingLayer);

                    new THING.widget.Button("地图添加事件", function () {
                        reset();

                        initThingJsTip("给地图图层添加点击事件，鼠标左键单击任意位置，获取位置信息<span></span>");

                        // 地图注册点击事件
                        map.on("click", function (ev) {
                            // 获取鼠标点击处的经纬度
                            var lonlat = ev.coordinates;
                            // 将经纬度坐标转为三维坐标，第二个参数代表离地高度
                            var worldPos = CMAP.Util.convertLonlatToWorld(lonlat, 0);
                            // 根据经纬度和方位角计算物体在地球上的旋转信息，第二个参数为方位角 默认0
                            var angles = CMAP.Util.getAnglesFromLonlat(lonlat, 0);

                            initThingJsTip("给地图图层添加点击事件，鼠标左键单击任意位置，获取位置信息<span><br><br>经纬度：[ " + lonlat + " ]</span>");
                        });
                    });

                    new THING.widget.Button("图层添加事件", function () {
                        reset();

                        initThingJsTip("给建筑图层添加点击事件，点击建筑，展示建筑信息<br><span></span>");

                        // 图层添加点击事件
                        buildingLayer.on("click", function (e) {
                            app.query(".GeoBuilding").style.outlineColor = null;
                            e.object.style.outlineColor = "red";

                            initThingJsTip("给建筑图层添加点击事件，点击建筑，展示建筑信息<br><span></span><br>建筑名：" + e.object.name + "<br>建筑高度：" + e.object.userData.height + "米");
                        });
                    });

                    new THING.widget.Button("重置", function () {
                        reset();
                    });
                },
            });

            /**
             * 重置
             * 卸载鼠标事件
             */
            function reset() {
                initThingJsTip("本例程展示了在地图上如何给图层添加事件，点击按钮，查看效果");

                app.query(".GeoBuilding").style.outlineColor = null;
                map.off("click");
                if (!buildingLayer) return;
                buildingLayer.off("click");
            }
        },
    });
}
);

// 创建提示
initThingJsTip("本例程展示了在地图上如何给图层添加事件，点击按钮，查看效果");