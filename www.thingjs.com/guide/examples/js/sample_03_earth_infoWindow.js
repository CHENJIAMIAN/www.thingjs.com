/**
 * 说明：地图上创建信息面板
 * 功能：
 *      1.设置信息框显示方式：常显，悬浮显示，点击显示
 *      2.自定义信息框
 * 操作：点击按钮，查看效果
 * 备注：
 *      1.GeoPolygon GeoBuilding也支持InfoWindow
 *      2.该示例用到的数据地址为:https://www.thingjs.com/uearth/uEarthjs/temp_resource/shenzhen-poi.geojson
 */
var app = new THING.App();
app.background = [0, 0, 0];  // 设置背景颜色
// 引用地图组件脚本
THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    var map = app.create({
        type: 'Map',
        attribution: '高德',
        style: {
            night: false
        }
    });
    // 创建一个瓦片图层
    var tileLayer1 = app.create({
        type: 'TileLayer',
        name: 'tileLayer1',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    });
    map.addLayer(tileLayer1);  // 将瓦片图添加到地图中

    // 飞到数据所在区域
    app.camera.flyToGeoPosition({
        time: 2000,
        lonlat: [113.935, 22.5256],
        height: 2000,
        heading: 0,
        tilt: 60
    });

    // 创建一个点图层
    var pointLayer = app.create({
        type: 'ThingLayer',
        name: 'pointLayer'
    });
    map.addLayer(pointLayer);  // 将图层添加到地图中

    $.ajax({
        type: 'GET',
        url: 'https://www.thingjs.com/uearth/uEarthjs/temp_resource/shenzhen-poi.geojson',
        dataType: 'json',
        success: function (data) {
            // 遍历geojson中的数据
            // 根据geojson中每条记录中的geometry.coordinates和properties创建GeoPoint
            // 注意，这里直接传经纬度即可，经度在前纬度在后
            new THING.widget.Button('点击弹窗', function () {
                reset();
                initThingJsTip("点击图标，显示弹窗");
                data.features.forEach(function (item) {
                    var geoPoint = app.create({
                        type: 'GeoPoint',
                        name: 'geoPoint0',
                        coordinates: item.geometry.coordinates,
                        userData: item.properties,
                        renderer: {
                            type: 'image',  // image代表创建图片类型的点
                            url: 'image/uGeo/pop.png',  // 图片的url
                            size: 5   // 尺寸
                        },
                        infoWindow: {
                            title: '标题1',
                            displayMode: CMAP.DisplayMode.Click,  // 点击显示
                            type: CMAP.InfoWindowType.Standard,  // 标准indoWindow
                            style: CMAP.InfoWindowStyle.Default,  // 默认样式 黑色
                            pivot: [0.5, 1.3],  // 界面的轴心，以百分比表示界面轴心位置。[0,0] 代表界面左上；[1,1] 代表界面右下 pivot可大于1用于像素级的偏移
                            fieldData: [{
                                field: 'name',
                                alias: '名称'
                            }]
                        },
                    });
                    pointLayer.add(geoPoint);
                })
            });

            //自定义html里的{{name}}和{{en}}代表物体身上userData下的name和en属性的值
            new THING.widget.Button('点击弹窗(自定义)', function () {
                reset();
                initThingJsTip("点击图标，显示自定义弹窗");
                var infoWindowHtml = `<div style="width: 474px">
                          <div style="float: left;height: 74px; width: 474px; background: url(\'http://www.thingjs.com/uearth/uEarthjs/temp_resource/billboard_white.png\')">
                              <div style="position: absolute; line-height:15px;top: 11px; bottom: 0px; left: 16px; color: white;">
                                  <span style="font-size: 14px;color:#1f3a54">{{name}}</span><br/>
                                  <span style="font-size: 12px;color:#1f3a54;opacity:0.6">{{en}}</span>
                              </div>
                          </div>
                      </div>`;
                data.features.forEach(function (item) {
                    var geoPoint = app.create({
                        type: 'GeoPoint',
                        name: 'geoPoint0',
                        coordinates: item.geometry.coordinates,
                        userData: item.properties,
                        renderer: {
                            type: 'image',  // image代表创建图片类型的点
                            url: 'image/uGeo/pop.png',  // 图片的url
                            size: 5  // 尺寸
                        },
                        infoWindow: {
                            displayMode: CMAP.DisplayMode.Click,  // 点击显示
                            type: CMAP.InfoWindowType.Custom,  // 自定义InfoWindow
                            customHtml: infoWindowHtml
                        },
                    });
                    pointLayer.add(geoPoint);
                })
            });

            new THING.widget.Button('悬浮弹窗', function () {
                reset();
                initThingJsTip("鼠标移入图标，出现弹窗");
                data.features.forEach(function (item) {
                    var geoPoint = app.create({
                        type: 'GeoPoint',
                        name: 'geoPoint0',
                        coordinates: item.geometry.coordinates,
                        userData: item.properties,
                        renderer: {
                            type: 'image',  // image代表创建图片类型的点
                            url: 'image/uGeo/pop.png',  // 图片的url
                            size: 5  // 尺寸
                        },
                        infoWindow: {
                            title: '标题2',
                            displayMode: CMAP.DisplayMode.MouseEnter,  // 悬浮显示
                            type: CMAP.InfoWindowType.Standard,  // 标准indoWindow
                            style: CMAP.InfoWindowStyle.White,  // 白色
                            pivot: [1, 1],  // 界面的轴心，以百分比表示界面轴心位置。[0,0] 代表界面左上；[1,1] 代表界面右下
                            offset: [0, 50, 0],  // 偏移量 单位米 y代表上下方向
                            fieldData: [{
                                field: 'name',
                                alias: '名称'
                            }]
                        },
                    });
                    pointLayer.add(geoPoint);
                })
            });

            new THING.widget.Button('常显', function () {
                reset();
                initThingJsTip("创建常显弹窗");
                data.features.forEach(function (item) {
                    var geoPoint = app.create({
                        type: 'GeoPoint',
                        name: 'geoPoint0',
                        coordinates: item.geometry.coordinates,
                        userData: item.properties,
                        renderer: {
                            type: 'image',  // image代表创建图片类型的点
                            url: 'image/uGeo/pop.png',  // 图片的url
                            size: 5  // 尺寸
                        },
                        infoWindow: {
                            title: '标题3',
                            displayMode: CMAP.DisplayMode.Always,  // 常显
                            type: CMAP.InfoWindowType.Standard,  // 标准indoWindow
                            style: CMAP.InfoWindowStyle.Blue,  // 蓝色
                            pivot: [0, 1],  // 界面的轴心，以百分比表示界面轴心位置。[0,0] 代表界面左上；[1,1] 代表界面右下
                            offset: [0, 50, 0],
                            fieldData: [{
                                field: 'name',
                                alias: '名称'
                            }]
                        },
                    });
                    pointLayer.add(geoPoint);
                })
            });

            new THING.widget.Button('重置', function () {
                reset();
            })

            /**
             * 重置
             */
            function reset() {
                initThingJsTip("本例程展示了如何在地图上创建信息面板并设置显示方式，点击按钮，查看效果");
                app.query(".GeoPoint").forEach(item => item.destroy());
            }
        }
    });

    // 创建提示
    initThingJsTip("本例程展示了如何在地图上创建信息面板并设置显示方式，点击按钮，查看效果");
});