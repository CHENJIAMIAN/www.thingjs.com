/**
 * 说明：创建电子围栏，当目标进入电子围栏，进行告警提示
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/959fde4e708e02c3982dcb96',
    background: '#001326'
});

// 场景效果，ThingJS版本为1.2.7.14及以上使用此字符串
var themeStr = "{\"version\":\"1.5.0\",\"background\":\"#001326\",\"skybox\":\"None\",\"fog\":{\"type\":\"None\",\"color\":\"#808080\",\"near\":0.1,\"far\":100},\"postEffects\":{\"glow\":{\"strength\":0.28,\"radius\":0.51}},\"class\":{\"Facade\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FacadeMain\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Ground\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":false,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorFloor\":{\"colormap\":{\"0\":\"#183f5c\",\"1\":\"#183f5c\"},\"opacity\":0.65,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorCeiling\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorRoof\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorManualWall\":{\"colormap\":{\"1\":\"#175E93\",\"0.61\":\"#183F5C\"},\"opacity\":0.6,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Door\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Objects\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#0f8bff\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Thing\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#175E93\",\"1\":\"#175e93\",\"0.76\":\"#063799\",\"0.45\":\"#006bce\",\"0.23\":\"#0767bf\"},\"opacity\":0.67,\"wireframe\":{\"enable\":false,\"color\":\"#217cd1\",\"glow\":false,\"opacity\":0.85},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.76,\"roughness\":0.41000000000000003},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Tree\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#040a26\",\"0.99\":\"#135e1f\",\"0.36\":\"#2fb8d6\",\"0.66\":\"#128cd1\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":1,\"glow\":true,\"wireframe\":{\"enable\":false,\"color\":\"#26e2d7\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"}},\"resourcePrefix\":\"\",\"enviroment\":\"https://www.thingjs.com/static/images/reflect1.jpg\"}";
// ThingJS版本为1.2.7.13及之前的版本使用此字符串
// var themeStr = "{\"version\":\"1.2.1\",\"background\":\"#001326\",\"skybox\":\"None\",\"fog\":{\"type\":\"None\",\"color\":\"#808080\",\"near\":0.1,\"far\":100},\"postEffects\":{\"glow\":{\"strength\":0.28,\"radius\":0.51}},\"class\":{\"Facade\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Facade-主建筑\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Ground\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":false,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--floor\":{\"colormap\":{\"0\":\"#183f5c\",\"1\":\"#183f5c\"},\"opacity\":0.65,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--ceiling\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--roof\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--manualWall\":{\"colormap\":{\"1\":\"#175E93\",\"0.61\":\"#183F5C\"},\"opacity\":0.6,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Door\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#0f8bff\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Thing\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#175E93\",\"1\":\"#175e93\",\"0.76\":\"#063799\",\"0.45\":\"#006bce\",\"0.23\":\"#0767bf\"},\"opacity\":0.67,\"wireframe\":{\"enable\":false,\"color\":\"#217cd1\",\"glow\":false,\"opacity\":0.85},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.76,\"roughness\":0.41000000000000003},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Thing-树\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#040a26\",\"0.99\":\"#135e1f\",\"0.36\":\"#2fb8d6\",\"0.66\":\"#128cd1\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":1,\"glow\":true,\"wireframe\":{\"enable\":false,\"color\":\"#26e2d7\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Region\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0.08\":\"#0b142b\",\"0.21\":\"#114f40\",\"0.3\":\"#2555b2\",\"0.44\":\"#31a4d6\",\"0.59\":\"#0e285b\"},\"opacity\":1,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Fence\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#064896\",\"0.68\":\"#24d8f2\",\"0.41\":\"#348aef\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.8,\"glow\":false,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"}},\"resourcePrefix\":\"\",\"enviroment\":\"https://www.thingjs.com/static/images/reflect1.jpg\"}";
var theme = JSON.parse(themeStr);
THING.ThemeManager.register('theme', theme);
app.root.applyTheme('theme');
app.applyThemeEnvironment('theme');

// 获取当前场景需要的贴图数据
var chartletData = null;
$.getJSON('/guide/examples/json/mark/data.json', function (result) {
    chartletData = result;
})

// 加载完成事件 
app.on('load', function (ev) {
    // 修改进入层级背景设置
    app.on(THING.EventType.EnterLevel, '*', function (ev) {
        app.skyBox = null;
        app.background = '#001326';
        app.query('#worker')[0].visible = false;
    }, 'customLevelSetBackground');
    //  停止进入物体层级的默认背景设置
    app.pauseEvent(THING.EventType.EnterLevel, '*', THING.EventTag.LevelSetBackground);

    // 查询所有楼层
    var floors = app.query('.Floor');
    // 切换至楼层层级
    app.level.change(floors[0], { jumping: true });
    // 设置开启层级切换后默认勾边颜色
    app.level.options.outlineColor = null;
    // 设置摄像机俯仰角度范围[最小值, 最大值]
    app.camera.xAngleLimitRange = [0, 90];
    // 设置摄像机视角
    app.camera.flyTo({
        object: floors[0],
        xAngle: 60,
        yAngle: 90,
        radiusFactor: 0.8,
        time: 1000,
        lerpType: null
    });

    // 创建房间贴图
    var info = chartletData.data.info;
    for (let i = 0; i < info.length; i++) {
        var parent = app.query("#" + info[i].id)[0];
        var localPositon = info[i].localposition;
        var type = info[i].type;
        if (type == "pictureMarker") {
            // 创建贴图
            var plane = app.create({
                type: 'Marker',
                parent: parent,
                localPosition: localPositon,
                useSpriteMaterial: false,
                url: info[i].url,
                size: info[i].size
            });
            // 平面旋转
            plane.rotateX(-90);
            plane.rotateZ(info[i].angleZ);
        }
    }

    var polygonMarker = null;
    var marker1 = null;
    var people = null;
    var points = null;

    // 添加电子围栏
    new THING.widget.Button('添加电子围栏', function () {
        // 构成多边形的点（取世界坐标系下的坐标）
        points = [
            [81, 0.5, 63],
            [81, 0.5, 52],
            [72, 0.5, 52],
            [72, 0.5, 63]
        ];
        if (polygonMarker) { return; }
        // 创建电子围栏（区域）
        polygonMarker = app.create({
            type: 'PolygonRegion',
            points: points, // 传入世界坐标系下点坐标
            style: {
                regionOpacity: .6,
                regionColor: '#3CF9DF', // 区域颜色
                lineColor: '#3CF9DF' // 线框颜色
            }
        });
        // 设置永远在最上层显示
        polygonMarker.style.alwaysOnTop = false;
    })

    // 添加图片标注
    new THING.widget.Button('添加图片标注', function () {
        var coord = [83, 0.5, 61];
        if (marker1) { return; }
        // 创建目标点(marker)
        marker1 = app.create({
            type: "Marker",
            id: "marker1",
            url: "/guide/examples/images/navigation/user.png",
            position: coord,
            size: 1
        })
    })

    var point = [
        [81, 63],
        [81, 52],
        [72, 52],
        [72, 63]
    ];
    // 移动图片标注
    new THING.widget.Button('移动图片标注', function () {
        var markerEndPoint = [68, 0.5, 55];
        if (marker1 != null) {
            var moveState = marker1.getAttribute('moveState');
            if (moveState == 'complete') {
                marker1.off('update', null, '监控图片标注');
                return;
            }
            // 目标点移动
            marker1.moveTo({
                position: markerEndPoint, // 移动到终点位置
                time: 2 * 1000,
                orientToPath: true, // 沿路径方向
                complete: function (ev) {
                    marker1.off('update', null, '监控图片标注');
                    $('.warninfo1').css('display', 'none');
                    $('.warninfo2').css('display', 'block');
                    $('.warninfo3').css('display', 'none');
                    marker1.setAttribute('moveState', 'complete');
                }
            })
        }
        if (points != null) {
            // 监控图片标注是否进入电子围栏区域
            if (marker1 != null) {
                marker1.on('update', function () {
                    if (polygonMarker != null) {
                        var intoPolygonMarker = isInPolygon([marker1.position[0], marker1.position[2]], point);
                        if (intoPolygonMarker) {
                            polygonMarker.regionColor = '#a94442';
                            polygonMarker.lineColor = '#a94442'
                            $('.warninfo1').css('display', 'block');
                            $('.warninfo2').css('display', 'none');
                            $('.warninfo3').css('display', 'none');
                        } else {
                            polygonMarker.regionColor = '#3CF9DF';
                            polygonMarker.lineColor = '#3CF9DF'
                            $('.warninfo1').css('display', 'none');
                            $('.warninfo2').css('display', 'none');
                            $('.warninfo3').css('display', 'block');
                        }
                    }
                }, '监控图片标注')
            }
        }
    })

    // 添加模型标注
    new THING.widget.Button('添加模型标注', function () {
        //创建目标点(Obj)
        people = app.query('#worker')[0];
        people.position = [83, 0.1, 56];
        people.visible = true;
        people.scale = [1.5, 1.5, 1.5];
    })

    // 移动模型标注
    new THING.widget.Button('移动模型标注', function () {
        var objEndPoint = [70, 0.1, 60];
        if (people != null) {
            var moveState = people.getAttribute('moveState');
            if (moveState == 'complete') {
                people.off('update', null, '监控图片标注');
                return;
            }
            // 播放模型动画
            people.playAnimation({
                name: '走',
                speed: 1,
                loopType: THING.LoopType.Repeat,
            });
            // 模型移动
            people.moveTo({
                position: objEndPoint, // 移动到终点位置
                orientToPath: true, // 沿路径方向
                time: 8 * 1000,
                complete: function (ev) {
                    people.stopAnimation('走');
                    people.off('update', null, '监控模型标注');
                    $('.warninfo1').css('display', 'none');
                    $('.warninfo2').css('display', 'block');
                    $('.warninfo3').css('display', 'none');
                    people.setAttribute('moveState', 'complete');
                }
            })
        }
        if (points != null) {
            // 监控模型标注是否进入电子围栏区域
            if (people != null) {
                people.on('update', function () {
                    if (polygonMarker != null) {
                        var intoPolygonMarker = isInPolygon([people.position[0], people.position[2]], point);
                        if (intoPolygonMarker) {
                            polygonMarker.regionColor = '#a94442';
                            polygonMarker.lineColor = '#a94442'
                            $('.warninfo1').css('display', 'block');
                            $('.warninfo2').css('display', 'none');
                            $('.warninfo3').css('display', 'none');
                        } else {
                            polygonMarker.regionColor = '#3CF9DF';
                            polygonMarker.lineColor = '#3CF9DF'
                            $('.warninfo1').css('display', 'none');
                            $('.warninfo2').css('display', 'none');
                            $('.warninfo3').css('display', 'block');
                        }
                    }
                }, '监控模型标注')
            }
        }
    })

    // 重置
    new THING.widget.Button('重置', function () {
        if (polygonMarker) {
            polygonMarker.destroy();
            polygonMarker = null;
        }
        if (marker1) {
            marker1.destroy();
            marker1 = null;
        }
        if (people) {
            people.visible = false;
            people.setAttribute('moveState', null);
        }
        $('.warninfo1').css('display', 'none');
        $('.warninfo2').css('display', 'none');
        $('.warninfo3').css('display', 'block');
    })

    createTip(); // 创建提示面板
});

/**
 * 创建提示面板
 */
function createTip() {
    var html =
        `<div class="fencing" style="width:200px;position: absolute;top: 50px;left: 50%;transform: translateX(-50%);z-index: 999;">
            <div class="alert alert-danger warninfo1" role="alert" style="padding: 15px;margin-bottom: 20px;color: #a94442;background-color: #f2dede;border-color: #ebccd1;border-radius: 4px;display:none;">目标已进入围栏</div>
            <div class="alert alert-info warninfo2" role="alert" style="padding: 15px;margin-bottom: 20px;color: #31708f;background-color: #d9edf7;border-color: #bce8f1;border-radius: 4px;display:none;">到达目的地</div>
            <div class="alert alert-warning warninfo3" role="alert" style="padding: 15px;margin-bottom: 20px;color: #8a6d3b;background-color: #fcf8e3;border-color: #faebcc;border-radius: 4px;">目标未进入围栏</div>

            <div onclick="fenClose()" style="cursor: pointer;position: absolute;top: -7px;right: -8px;width: 16px;height: 16px;border-radius: 50%;background-color: #777777;border: 3px solid #ffffff;">
            <div style="position: absolute;width: 10px;height: 2px;background-color: #fff;transform: rotate(45deg);top: 7px;left: 3px;"></div>
            <div style="position: absolute;width: 10px;height: 2px;background-color: #fff;transform: rotate(-45deg);top: 7px;left: 3px;"></div>
        </div>
    </div>`;
    $('#div2d').append($(html));
}

/**
 * 关闭提示面板
 */
function fenClose() {
    $(".fencing").hide();
}
/**
 * 检测目标点是否进入电子围栏区域
 * @param {Array} checkPoint - 校验坐标
 * @param {Array} polygonPoints - 形成电子围栏的坐标
 * @returns {Boolean} true 或 false
 * @description 此方法仅判断处于同一个平面的目标点是否在区域内（只判断坐标x和z值），
 *     不考虑两者当前离地高度（坐标的y值）
 */
function isInPolygon(checkPoint, polygonPoints) {
    var counter = 0;
    var i;
    var xinters;
    var p1, p2;
    var pointCount = polygonPoints.length;
    p1 = polygonPoints[0];
    for (i = 1; i <= pointCount; i++) {
        p2 = polygonPoints[i % pointCount];
        if (checkPoint[0] > Math.min(p1[0], p2[0]) && checkPoint[0] <= Math.max(p1[0], p2[0])) {
            if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
                if (p1[0] != p2[0]) {
                    xinters = (checkPoint[0] - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1];
                    if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                        counter++;
                    }
                }
            }
        }
        p1 = p2;
    }
    if (counter % 2 == 0) {
        return false;
    } else {
        return true;
    }
}