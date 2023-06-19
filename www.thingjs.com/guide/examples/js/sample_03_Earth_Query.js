/**
 * 说明：查询地球上的对象
 * 备注：通过CityBuilder进行搭建的3d城市有两种方法可以生成脚本，方法如下：
 *          1. 在CityBuilder编辑环境中直接进入下一步开发，会自动生成脚本；
 *          2. 在线开发中打开地图面板，双击某个地图即可快速生成地图项目脚本。
 */

var app = new THING.App();
app.background = [0, 0, 0];
var map;
// 引用地图组件脚本
THING.Utils.dynamicLoad(["https://www.thingjs.com/uearth/uearth.min.js"], function () {
    app.create({
        type: "Map",
        // 地图场景名：map_113
        url: "https://www.thingjs.com/citybuilder_console/mapProject/config/T1RJek9EST1DaXR5QnVpbGRlckAyMDE5",
        complete: function (event) {
            console.log(event.object.userLayers); // 打印当前图层
            initThingJsTip("地图项目中的对象可以通过图层名称，建筑类型等查询到，可以点击左侧按钮进行体验");

            // 在地球上查询可以用app.query也可以用map.query 如果是查询图层内的物体 可以用layer.query
            map = event.object;

            var geoPoint = map.query(".FeatureLayer")[2]; // 根据物体的type查询
            var primaryLayer = map.query("朝阳_绿地")[0]; // 根据名称查询图层对象 名称是在CityBuilder中配置的图层的名称
            var buildings = map.query("[height>100]"); // 根据物体userData中的属性查询物体 查询height>200的建筑 前提是物体的userData有height字段
            // var building = map.query('居民楼')[0];  //根据名称查询物体

            new THING.widget.Button("根据类型查询", function () {
                reset();

                geoPoint.renderer.imageUrl =
                    "https://www.thingjs.com/guide/image/uGeo/path.png";
                geoPoint.renderer.width = 10;
                geoPoint.renderer.speed = 2;
                initThingJsTip("查询图层类型为 FeatureLayer 的对象，设置图层贴图");
            });
            new THING.widget.Button("查询图层", function () {
                reset();

                primaryLayer.renderer.color = "#132603";
                initThingJsTip("查询图层名称为 朝阳_绿地 的对象，设置图层颜色");
            });

            new THING.widget.Button("根据属性查询建筑", function () {
                reset();

                buildings.forEach(function (v) {
                    v.renderer.type = "image";
                    v.renderer.imageUrl = [
                        "https://www.thingjs.com/uearth/uGeo/building_top.png",
                        "https://www.thingjs.com/uearth/uGeo/building.png",
                    ];
                    v.renderer.textureWrap = CMAP.TextureWrapMode.Stretch; // 贴图循环方式为拉伸
                });
                initThingJsTip("查询 height>100 的建筑对象，给物体设置贴图");
            });

            new THING.widget.Button("重置", function () {
                reset();
            });

            /**
             * 重置
             */
            function reset() {
                geoPoint.renderer.imageUrl =
                    "https://www.thingjs.com/citybuilder_console/upload/lineIcons/3d/lightFlow_strip02.png";
                geoPoint.renderer.width = 3;
                geoPoint.renderer.speed = 0.4;
                primaryLayer.renderer.color = "#046c0e";
                buildings.forEach(function (v) {
                    v.renderer.type = "vector";
                    v.renderer.imageUrl = null;
                });
                initThingJsTip("地图项目中的对象可以通过图层名称，建筑类型等查询到，可以点击左侧按钮进行体验");
            }
        },
    });
}
);
