/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 * 说明：查询地球上的对象
 * 备注：通过CityBuilder进行搭建的3d城市有两种方法可以生成脚本，方法如下：
 *          1. 在CityBuilder编辑环境中直接进入下一步开发，会自动生成脚本；
 *          2. 在线开发中打开地图面板，双击某个地图即可快速生成地图项目脚本。
 */

// 部分图层样式修改方法不生效(建筑图层贴图不显示)

var app = new THING.App();
app.background = [0, 0, 0];

// 新建一个地图
var map = new THING.EARTH.Map({
    style: {
        night: false,
    },
    url: "https://www.thingjs.com/citybuilder_console/mapProject/config/T1RJek9EST1DaXR5QnVpbGRlckAyMDE5",
    attribution: "高德",
    maximumLevel: 18,
    complete: function (event) {
        // 在地球上查询可以用app.query也可以用map.query 如果是查询图层内的物体 可以用layer.query
        var geoPoint = map.query(".FeatureLayer")[1]; // 根据物体的type查询
        var primaryLayer = map.query("朝阳_绿地")[0]; // 根据名称查询图层对象 名称是在CityBuilder中配置的图层的名称
        var buildings = map.query("[userData/height>200]"); // 根据物体userData中的属性查询物体 查询height>200的建筑 前提是物体的userData有height字段

        new THING.widget.Button("根据类型查询", function () {
            reset();
            geoPoint.style.normalMap.url = "https://www.thingjs.com/builder/api-admin/upload/polygonIcons/systemIcons/water1.png";
            initThingJsTip("查询图层类型为 FeatureLayer 的对象，设置图层贴图");
        });
        new THING.widget.Button("查询图层", function () {
            reset();
            primaryLayer.style.color = "#132603";
            initThingJsTip("查询图层名称为 朝阳_绿地 的对象，设置图层颜色");
        });

        new THING.widget.Button("根据属性查询建筑", function () {
            reset();

            buildings.forEach(function (v) {
                v.style.color = "#95a5a6";
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
            geoPoint.style.normalMap.url = "https://www.thingjs.com/citybuilder_console/static/texture/waternormals.jpg";
            primaryLayer.style.color = "#046C0E";
            buildings.forEach(function (v) {
                v.style.color = "#95a5a6";
            });
            initThingJsTip("地图项目中的对象可以通过图层名称，建筑类型等查询到，可以点击左侧按钮进行体验");
        }
    }
})