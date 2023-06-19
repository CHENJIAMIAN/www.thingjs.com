/**
 * 说明：该例子展示了如何在CMAP组件中使用导航功能
 * 备注：
 *       1. 我们在这个例子中使用了高德地图导航服务,其路径规划结果的坐标系是
 *          GCJ02坐标系,因此我们使用的底图也是GCJ02坐标系的谷歌影像该例子中
 *          使用的key是免费版本,有次数限制,仅供此demo使用,如有需要请自行申请。
 *       2. https://lbs.amap.com/api/webservice/guide/create-project/get-key
 *       3. 高德地图路径规划服务API :
 *          https://lbs.amap.com/api/webservice/guide/api/direction
 * 操作：点击左侧选择起点按钮,在地图上单击作为起点,再点击选择终点按钮,
 *      在地图上单击作为终点,右侧可以切换交通方式
 */
var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];

// 高德地图key,免费版本有次数限制，此处仅供demo使用，如有需要请自行到高德地图网站申请商业版key
var amapKey = '5791cdaf02f4d44fd979a9f89739d06c';

THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
    var startCoord, endCoord;
    var map = app.create({
        type: 'Map',
        attribution: '高德'
    });
    var tileLayer1 = app.create({
        type: 'TileLayer',
        id: 'tileLayer1',
        url: 'https://webst0{1,2,3,4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    });
    map.addLayer(tileLayer1);

    // 创建一个图层展示起点终点的图标以及导航结果
    var thingLayer = app.create({
        type: 'ThingLayer',
        name: 'thingLayer'
    });
    map.addLayer(thingLayer);
    // 飞到地图上某一个位置
    app.camera.earthFlyTo({
        lonlat: [116.4365, 39.97479],
        height: 6000,
        complete: function () {
            createUI();
        }
    });


    var selectStart = false;  // 是否点击选择起点按钮
    var selectEnd = false;  // 是否点击选择终点按钮
    var radio;  // 导航方式选择的UI

    /**
     * @param orgin 起点坐标
     * @param destination 终点坐标
     * @param transport 交通方式
     */
    function nav(origin, destination, transport) {
        // 先清除导航结果
        thingLayer.query('.GeoLine').destroy();
        // 构建查询url,不同出行方式构建url的方式不同,具体请参考高德路径规划api
        var navUrl = '?origin=' + origin + '&destination=' + destination + '&key=' + amapKey;
        var drivingUrl = 'https://restapi.amap.com/v3/direction/driving';
        var bicyclingUrl = 'https://restapi.amap.com/v4/direction/bicycling';
        var walkingUrl = 'https://restapi.amap.com/v3/direction/walking';
        if (transport === '驾车') {
            navUrl = drivingUrl + navUrl;
        } else if (transport === '骑行') {
            navUrl = bicyclingUrl + navUrl;
        } else if (transport === '步行') {
            navUrl = walkingUrl + navUrl;
        }

        // 请求高德地图导航服务
        $.ajax({
            type: 'GET',
            url: navUrl,
            dataType: 'json',
            success: function (data) {
                // 先判断是否成功
                if (data.status === '1' || data.errcode === 0) {
                    var path;
                    // 不同交通方式返回接口结构不同，具体请参考高德路径规划api
                    if (transport !== '骑行') {
                        path = data.route.paths[0];
                    } else {
                        path = data.data.paths[0];
                    }
                    var distance = path.distance;
                    var duration = path.duration;
                    var steps = path.steps;
                    var coordinates = [];
                    for (var i = 0; i < steps.length; i++) {
                        var polyline = steps[i].polyline;
                        var coords = polyline.split(';');
                        for (var j = 0; j < coords.length; j++) {
                            var coord = coords[j].split(',');
                            coordinates.push([parseFloat(coord[0]), parseFloat(coord[1])]);
                        }
                    }
                    // 将路径规划结果创建一个GeoLine对象,并添加到图层
                    var road = app.create({
                        type: 'GeoLine',
                        name: 'road' + i,
                        coordinates: coordinates,
                        renderer: {
                            type: 'image',
                            lineType: 'Plane',
                            color: [255, 0, 0],
                            imageUrl: 'https://www.thingjs.com/uearth/uGeo/path.png',
                            // numPass: 6,
                            width: 6,
                            effect: true,
                            speed: 0.1
                        }
                    });
                    thingLayer.add(road);
                    // 飞到GeoLine对象
                    app.camera.earthFlyTo({
                        object: road
                    });
                }
            }
        });
    }

    // 给地图添加点击事件,点击地图时选择起点或终点,并在地图上添加一个GeoPoint
    map.on('click', function (e) {
        if (selectStart) {
            startCoord = e.coordinates.toString();
            selectStart = false;
            document.body.style.cursor = 'default';
            var geoPoint = app.create({
                type: 'GeoPoint',
                name: 'startPoint',
                coordinates: e.coordinates,
                renderer: {
                    type: 'image',
                    url: 'https://www.thingjs.com/uearth/uGeo/start.png',
                    size: 3
                }
            });
            thingLayer.add(geoPoint);
        }
        if (selectEnd) {
            endCoord = e.coordinates.toString();
            selectEnd = false;
            document.body.style.cursor = 'default';
            var geoPoint = app.create({
                type: 'GeoPoint',
                name: 'endPoint',
                coordinates: e.coordinates,
                renderer: {
                    type: 'image',
                    url: 'https://www.thingjs.com/uearth/uGeo/end.png',
                    size: 3
                }
            });
            thingLayer.add(geoPoint);
            if (startCoord !== undefined && endCoord !== undefined) {
                // 获取当前radio选中的值
                var transport = radio.getValue();
                nav(startCoord, endCoord, transport);
            }
        }
    });

    // 创建UI界面
    function createUI() {
        // 创建选择起点按钮
        new THING.widget.Button('选择起点', function () {
            selectStart = true;
            document.body.style.cursor = 'pointer';
            thingLayer.query('.GeoPoint').destroy();
            thingLayer.query('.GeoLine').destroy();
        });
        // 创建选择终点按钮
        new THING.widget.Button('选择终点', function () {
            if (selectStart) {
                return;
            }
            selectEnd = true;
            document.body.style.cursor = 'pointer';
        });
        // 创建一个配置界面组件
        var panel = new THING.widget.Panel({
            titleText: '交通方式',
            hasTitle: true,
            width: 150

        });
        panel.positionOrigin = 'TR';  // top-right
        panel.position = ['100%', 0];
        // 添加单选框组件
        radio = panel.addRadio({ 'radio': '驾车' }, 'radio', ['驾车', '骑行', '步行']);
        // 监听单选框选项改变的事件
        radio.on('change', function (ev) {
            nav(startCoord, endCoord, ev)
        })
    }
});

// 创建提示
initThingJsTip("点击左侧按钮后，在地图点击选择起点和终点，</br>选择完毕后，地图上会自动开启路径导航。</br>点击右侧选择框切换交通方式，重新规划路线。");