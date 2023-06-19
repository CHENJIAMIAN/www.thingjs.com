/**
 * 说明：基本信息查询
 * 备注：
 *       1. 模糊查询房间。
 *       2. 点击导航按钮，选择起点与终点，开始导航。
 *       3. 导航的建筑需要有特定的搭建规则，详情请
 *          参考 https://developer.thingjs.com/forum.php?mod=viewthread&tid=626&highlight=导航
 * 难度：★★★☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/6a8b08ea8ac37ffacc9041f5',
    background: '#001326'
});

app.on(THING.EventType.Progress, function (ev) {
    /* 参数
     * {Number} progress 场景加载进度 （0~1）
     */
    var windowWidth = $(window).width();
    if (windowWidth <= 960) {
        //600
        let progress = (ev.progress) * 100 + 302;
        let progress1 = (ev.progress) * 100 + 565;
        let progress2 = (ev.progress) * 100 + 590;
        $(".progress").css("width", progress);
        $(".progress_astronauts").css("left", progress1);
        $(".progress_round").css("left", progress2);
    }else {
        let progress3 = (ev.progress) * 100 + 790;
        let progress4 = (ev.progress) * 100 + 1280;
        let progress5 = (ev.progress) * 100 + 1310;
        $(".progress").css("width", progress3);
        $(".progress_astronauts").css("left", progress4);
        $(".progress_round").css("left", progress5);
    }
});

loadingPage();
function loadingPage() {
    var template =
        `<div class="load_page">
            <div class="page_top">
                <img class="load_logo" src='/static/ScenePreview/loading/img/logo.png' alt="ThingJS logo">
                <p class="load_title">面向物联网的3D可视化开发平台</p>
            </div>
            <div class="load_bottom">
                <img class="progress_astronauts" src="/static/ScenePreview/loading/img/astronauts.png" alt="宇航员">
                <img class="progress_round" src="/static/ScenePreview/loading/img/round.png" alt="圆点">
                <div class="progress_bar"></div>
                <div class="progress"></div>
                <p class="loading" style="">loading...</p>
            </div>
            <div></div>
        </div>`;
    // 插入到 ThingJS 内置的 2D 界面 div 中
    $('#div2d').append($(template));
}

// 场景效果，ThingJS版本为1.2.7.14及以上使用此字符串
var themeStr = "{\"version\":\"1.5.0\",\"background\":\"#001326\",\"skybox\":\"None\",\"fog\":{\"type\":\"None\",\"color\":\"#808080\",\"near\":0.1,\"far\":100},\"postEffects\":{\"glow\":{\"strength\":0.28,\"radius\":0.51}},\"class\":{\"Facade\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FacadeMain\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Ground\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":false,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorFloor\":{\"colormap\":{\"0\":\"#183f5c\",\"1\":\"#183f5c\"},\"opacity\":0.65,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorCeiling\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorRoof\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"FloorManualWall\":{\"colormap\":{\"1\":\"#175E93\",\"0.61\":\"#183F5C\"},\"opacity\":0.6,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Door\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Objects\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#0f8bff\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Thing\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#175E93\",\"1\":\"#175e93\",\"0.76\":\"#063799\",\"0.45\":\"#006bce\",\"0.23\":\"#0767bf\"},\"opacity\":0.67,\"wireframe\":{\"enable\":false,\"color\":\"#217cd1\",\"glow\":false,\"opacity\":0.85},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.76,\"roughness\":0.41000000000000003},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Tree\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#040a26\",\"0.99\":\"#135e1f\",\"0.36\":\"#2fb8d6\",\"0.66\":\"#128cd1\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":1,\"glow\":true,\"wireframe\":{\"enable\":false,\"color\":\"#26e2d7\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"}},\"resourcePrefix\":\"\",\"enviroment\":\"https://www.thingjs.com/static/images/reflect1.jpg\"}";
// ThingJS版本为1.2.7.13及之前的版本使用此字符串
// var themeStr = "{\"version\":\"1.2.1\",\"background\":\"#001326\",\"skybox\":\"None\",\"fog\":{\"type\":\"None\",\"color\":\"#808080\",\"near\":0.1,\"far\":100},\"postEffects\":{\"glow\":{\"strength\":0.28,\"radius\":0.51}},\"class\":{\"Facade\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Facade-主建筑\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":true,\"wireframe\":{\"enable\":true,\"color\":\"#217cd1\",\"glow\":true,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Ground\":{\"enable\":false,\"useColormap\":true,\"colormap\":{\"0\":\"#041026\",\"1\":\"#0e0b93\",\"0.72\":\"#1a4aa8\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.9,\"glow\":false,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--floor\":{\"colormap\":{\"0\":\"#183f5c\",\"1\":\"#183f5c\"},\"opacity\":0.65,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--ceiling\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--roof\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0,\"wireframe\":{\"enable\":false,\"color\":\"#0f8bff\",\"glow\":false,\"opacity\":0},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":false,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor--manualWall\":{\"colormap\":{\"1\":\"#175E93\",\"0.61\":\"#183F5C\"},\"opacity\":0.6,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":false,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Door\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#34CED5\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Floor\":{\"colormap\":{\"1\":\"#0844dd\",\"0.61\":\"#031d7a\"},\"opacity\":0.3,\"wireframe\":{\"enable\":true,\"color\":\"#0f8bff\",\"glow\":true,\"opacity\":0.78},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":true,\"metalness\":0.63,\"roughness\":0.46},\"enable\":true,\"useColormap\":true,\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Thing\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#175E93\",\"1\":\"#175e93\",\"0.76\":\"#063799\",\"0.45\":\"#006bce\",\"0.23\":\"#0767bf\"},\"opacity\":0.67,\"wireframe\":{\"enable\":false,\"color\":\"#217cd1\",\"glow\":false,\"opacity\":0.85},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.76,\"roughness\":0.41000000000000003},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Thing-树\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#040a26\",\"0.99\":\"#135e1f\",\"0.36\":\"#2fb8d6\",\"0.66\":\"#128cd1\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":1,\"glow\":true,\"wireframe\":{\"enable\":false,\"color\":\"#26e2d7\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Region\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0.08\":\"#0b142b\",\"0.21\":\"#114f40\",\"0.3\":\"#2555b2\",\"0.44\":\"#31a4d6\",\"0.59\":\"#0e285b\"},\"opacity\":1,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"glow\":false,\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"},\"Fence\":{\"enable\":true,\"useColormap\":true,\"colormap\":{\"0\":\"#064896\",\"0.68\":\"#24d8f2\",\"0.41\":\"#348aef\"},\"useScrollTex\":false,\"scrollColor\":\"#ffffff\",\"opacity\":0.8,\"glow\":false,\"wireframe\":{\"enable\":false,\"color\":\"#ffffff\",\"glow\":false,\"opacity\":0.99},\"reflection\":{\"enable\":false,\"metalness\":0.6,\"roughness\":0.2},\"scrollTex\":\"https://www.thingjs.com/static/images/scroll.jpg\"}},\"resourcePrefix\":\"\",\"enviroment\":\"https://www.thingjs.com/static/images/reflect1.jpg\"}";
var theme = JSON.parse(themeStr);
THING.ThemeManager.register('theme', theme);
app.root.applyTheme('theme');
app.applyThemeEnvironment('theme');

var navi = null;  // 导航对象
var clickCount = 0;  // 点击次数
var building = null;  // 导航建筑
var startObject = null;  // 起点所在的房间
var searchResult = [];  // 搜索集
var tempTopCard = null;  // 点击房间列表，对应房间显示顶牌
var rooms = null;  // 所有房间
var chartletData = null;  // 当前场景需要的贴图数据

// 请求贴图数据文件
$.getJSON('/guide/examples/json/mark/data.json', function (result) {
    chartletData = result;
})

// 引入文件
THING.Utils.dynamicLoad([
    '/static/ScenePreview/navigation/navigation.min.v0.1.1.js',  // 导航脚本
    '/guide/examples/css/navigation/search.css',  // 搜索框样式
    '/static/ScenePreview/loading/loading.css'  // 加载页面样式

],
    function () {
        app.on('load', function (ev) {
            setTimeout(function(){
                $(".load_page").css('display','none');
                createHtml();
            },1500);
            // 修改进入层级背景设置
            app.on(THING.EventType.EnterLevel, '*', function (ev) {
                app.skyBox = null;
                app.background = '#001326';
            }, 'customLevelSetBackground');
            // 设置开启层级切换后默认勾边样式
            app.level.options.outlineColor = null;
            // 停止进入物体层级的默认背景设置
            app.pauseEvent(THING.EventType.EnterLevel, '*', THING.EventTag.LevelSetBackground);
            // 设置摄像机俯仰角度范围[最小值, 最大值]
            app.camera.xAngleLimitRange = [0, 90];

            // 房间贴图
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
                    // 设置不可拾取
                    plane.pickable = false;
                }
            }

            // 设定拾取的返回集，此处设置只拾取房间
            app.picker.pickedResultFunc = function (obj) {
                if (obj instanceof THING.Room) {
                    return obj;
                }
                return null;
            }

            // 查询所有房间
            rooms = app.query('.Room');
            // 获取导航建筑
            building = ev.campus.buildings[0];
            // 隐藏建筑外立面
            if (building.facades) {
                building.facades.visible = false;
            }
            // 显示建筑楼层
            building.floors.visible = true;
            // 楼层展开
            building.expandFloors({
                'time': 1000,
                'distance': 10,
                'horzMode': false,
                'hideRoof': true,
                'complete': function () {
                    let floors = building.floors;
                    if (floors.length >= 1) {
                        for (let i = 1; i < floors.length; i++) {
                            floors[i].visible = false;
                        }
                    }
                    // 楼层隐藏所有屋顶
                    floors[0].showAllRoofs(false);
                    app.camera.flyTo({
                        object: floors[0],
                        xAngle: 60,
                        yAngle: 90,
                        radiusFactor: 0.8,
                        time: 1000,
                        lerpType: null,
                        complete: function () {
                            // createHtml();
                            createNavi();
                            registerEvent();
                            resultPoint();
                        }
                    });
                }
            });
        })
    },
    true,
    true
)

/**
 * 创建搜索框及楼层切换面板
 */
function createHtml() {
    let searchHtml =
        `<div class="search">
            <img src="/guide/examples/images/navigation/search.png"/>
            <input id="searchText" type="text" class="searchText" placeholder="搜索关键字"> |
            <button type="button" id="startnav" class="btn btn-default" style="border: none">
                <img src="/guide/examples/images/navigation/mark-01.png" style="width: 12px;" />
                导航
            </button>
        </div>
        <div id="shopSearch" class="layer list" >
            <ul>
            </ul>
        </div>
        <div id="router" class="layer router" >
                <div class="routerInput">
                    <img src="/guide/examples/images/navigation/flag.png" style="width: 12px;">
                    <input id="startText" class="routerText" type="" name="" placeholder="点击园区可选择起点" readonly="">
                </div>
                <div class="routerInput">
                    <img src="/guide/examples/images/navigation/flag.png" style="width: 12px;">
                    <input id="endText" class="routerText" type="" name="" placeholder="点击园区可选择终点" readonly="">
                </div>
                <div id="navigation" class="navigation">
                    <button type="button" id="navTo" class="btn btn-default" onclick="startNavi1()">
                        <img src="/guide/examples/images/navigation/back.png" >
                        导航
                    </button>
                </div>
        </div>`;
    $('#div2d').append($(searchHtml));

    let htmlFloor =
        `<style>
            .floors-ctrl{
                width: 42px; 
                position: absolute; 
                background-color: white; 
                box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 3px; 
                border-radius: 2px; 
                z-index: 1; 
                top: 20px; 
                right: 10px;
            }
            .layer-floors hr{
                height: 1px; border-top: 1px solid rgba(153, 153, 153, 0.45); border-right: none; border-bottom: none; border-left: none; border-image: initial; width: 60%; margin: 0px 20%;
            }
            .layer-floor{
                display: inline-block; 
                text-align: center; 
                width: 42px; 
                height: 42px; 
                line-height: 42px; 
                margin: 0px; 
                cursor: pointer; 
                font-size: 0.8em; 
                font-weight: bold; 
                color: rgb(102, 102, 102);
            }
            .layer-floor.active{
                color: rgb(30, 130, 250);
            }
        </style>
        <div class="floors-ctrl">
            <div class="floor-state" id="floorWrap" style="padding: 10px; cursor: pointer;">
                <img class="layer-img" src="/guide/examples/images/navigation/layer.png" style="width: 22px; height: 22px;">
            </div>
            <div class="layer-floors">
                <label class="layer-floor">
                    <span>F3</span>
                </label>
                <hr>
                <label class="layer-floor">
                    <span>F2</span>
                </label>
                <hr>
                <label class="layer-floor active">
                    <span>F1</span>
                </label>
            </div>
        </div>`;
    $('#div2d').append($(htmlFloor));
}

/**
 * 注册事件
 */
function registerEvent() {
    // 单楼层与多楼层显示状态切换
    $('.floor-state').on('click', function () {
        if ($(this).hasClass('allLayers')) {
            $(this).removeClass('allLayers');
            $(this).find('.layer-img').attr('src', '/guide/examples/images/navigation/layer.png');
            let showFloor = $('.layer-floors .layer-floor.active span').text();
            building.floors.forEach(v => {
                if (v.name == showFloor) {
                    v.visible = true;
                    v.showAllRoofs(false);
                } else {
                    v.visible = false;
                }
            });
        } else {
            $(this).addClass('allLayers');
            $(this).find('.layer-img').attr('src', '/guide/examples/images/navigation/layers.png');
            building.floors.forEach(v => {
                v.visible = true;
                v.showAllRoofs(false);
            });
        };
    });

    // 楼层切换按钮点击事件
    $('.layer-floors label.layer-floor').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        } else {
            $(this).siblings('.layer-floor').removeClass('active');
            $(this).addClass('active');
            let floorName = $(this).find('span').text();
            if ($('.floor-state.allLayers').length <= 0) {
                building.floors.forEach(v => {
                    v.ceiling.visible = false;
                    if (v.name == floorName) {
                        v.visible = true;
                        v.showAllRoofs(false);
                    } else {
                        v.visible = false;
                    }
                });
            };
            app.camera.flyTo({
                object: app.query(floorName)[0],
                xAngle: 45,
                yAngle: 90,
                radiusFactor: 0.8,
                time: 1000,
                lerpType: null
            });
        }
    })

    // 场景添加点击事件，点击房间，选择导航起点与终点
    app.on('click', function (ev) {
        if (ev.picked && ev.button == 0 && ev.object != null && (ev.object.type == 'Ground' || ev.object.type == 'Room')) {
            if (clickCount == 2) {
                clearNavi();
                clickCount = 0;
            }
            if (clickCount == 0) {
                startObject = ev.object;
                // 设置导航起点
                navi.setStartPoint({
                    room: ev.object,  // 导航起点所属房间
                    position: ev.pickedPosition,  // 导航起点坐标
                    size: 2,  // 导航起点标识大小，默认为2
                    image: '/guide/examples/images/navigation/start.png'  // 导航起点标识图片地址
                })
                $('#startText').val(startObject.name);
            } else if (clickCount == 1) {
                // 设置导航终点
                navi.setEndPoint({
                    room: ev.object,  // 导航终点所属房间
                    position: ev.pickedPosition,  // 导航终点坐标
                    size: 2,  // 导航终点标识大小，默认为2
                    image: '/guide/examples/images/navigation/end.png'  // 导航终点标识图片地址
                })
                $('#endText').val(ev.object.name);
                if (startObject.parent.id != ev.object.parent.id) {
                    building.floors.forEach(v => {
                        v.visible = true;
                        v.showAllRoofs(false);
                    });
                }
                // 画出导航线
                navi.drawNaviLine();
            }
            clickCount++;
        }
    });

    var naviState = true;
    // 导航按钮注册事件
    $('#startnav').on('click', function () {
        if (naviState) {
            $('#router').css('display', 'block');
            $('#shopSearch').css('display', 'none');
        } else {
            $('#router').css('display', 'none');
        }
        naviState = !naviState;
    });

    // 搜索框注册事件
    $("#searchText").on('keyup', function (ev) {
        // 每搜索一次，结果集就清空一次
        if ($('#shopSearch li').length == 0) {
            addData();
        } else if ($('#shopSearch li').length > 0) {
            $('#shopSearch li').remove();
            searchResult = [];
            addData();
        }
    });
}

/**
 * 创建导航对象
 */
function createNavi() {
    if (navi == null) {
        navi = new Navigation({
            app: app,  // 传入app对象
            followAngle: false,  // 值为true是第一人称导航，为false是第三人称导航，默认为false
            // 导航点样式
            followAngleStyle: {
                speed: 5,  // 导航点移动速度，默认为0.8
                tip: true,  // 导航信息提示，默认为false
                element: 'naviTip'  // 当打开导航信息提示时，需传入dom标签id显示导航信息
            },
            // 导航线样式
            lineStyle: {
                width: 0.3,  // 线宽，默认为0.6
                image: '/guide/examples/images/navigation/line.png',  // 贴图地址
                imageRepeat: [0.3, 1],  // 贴图重复度，默认为[0.3, 1]
                scrollUV: true,  // 启动 UV 动画，默认为true
                imageScrollSpeed: 0.5,  // 设置 UV 动画播放速度，默认为0.5
                alwaysOnTop: false,  // 设置导航线始终在最前端渲染显示，默认为false
                renderOrder: -1000  // 设置渲染排序值，默认为0
            }
        });
    }
}

/**
 * 清除导航
 */
function clearNavi() {
    if (navi != null) {
        // 清除导航起点、导航终点、导航线
        navi.clearAll();
        $('#naviTip').html('暂无导航提示信息');
    }
}

/**
 * 第一人称导航
 */
function startNavi1() {
    navi.followAngle = true;
    // 模拟导航
    navi.simulate();
    setTimeout($('.pictureMarker').removeClass('moveAnimation'), 10000);
}

/**
 * 搜索列表信息展示
 */
function addData() {
    let keyword = $('#searchText').val();
    var reg = new RegExp(keyword.trim() + '', 'i');
    var searchResultHtml = ``;
    $('#shopSearch').css('display', 'block');
    $('#router').css('display', 'none');
    if (keyword != '') {
        $('#shopSearch').css('visibility', 'visible');
        if (keyword.trim().length > 0) {
            for (var i = 0; i < rooms.length; i++) {
                if (rooms[i].name.match(reg)) {
                    searchResult.push(rooms[i]);
                }
            }
        }
    } else {
        $('#shopSearch').css('visibility', 'hidden');
    }
    for (var i in searchResult) {
        searchResultHtml += `<li data-fid="` + i + `" id = "` + i + `">`;
        searchResultHtml += `<img class="lockImg" src="/guide/examples/images/navigation/nailGrey.png" />`;
        searchResultHtml += `<span style="font-size:12px;">` + searchResult[i].floor.name + `</span>`;
        searchResultHtml += `<span class = "roomName">` + searchResult[i].name + `</span>`;
        searchResultHtml += `<span>` + searchResult[i].id + `</span>`;
        searchResultHtml += `</li>`;
    }
    $('#shopSearch ul').append($(searchResultHtml))
    //鼠标滑过事件
    $('#shopSearch li').on('mouseover', function () {
        $(this).children('img').attr('src', '/guide/examples/images/navigation/nailWhite.png')
        $(this).on('mouseout', function () {
            $(this).children('img').attr('src', '/guide/examples/images/navigation/nailGrey.png')
        })
    })
    resultPoint();
}

/**
 * 点击搜索结果列表中的项，跳转至对应房间
 */
function resultPoint() {
    $('#shopSearch li').on('click', function () {
        var roomName = $(this).children('span.roomName').text();
        $('#searchText').val(roomName);
        var roomObj = app.query(roomName)[0];
        if ($('.pictureMarker').length > 0) {
            $('.pictureMarker').remove();
        }
        createUiAnchor(roomObj);
        $('#shopSearch').css('display', 'none');
        var floorName = roomObj.floor.name;
        var layerFloors = $('.layer-floors label.layer-floor');
        for (var i = 0; i < layerFloors.length; i++) {
            var curI = layerFloors[i];
            var curIVal = $(curI).find('span').text();
            if (curIVal == floorName) {
                $(curI).trigger('click');
                break;
            }
        }
        app.camera.flyTo({
            object: roomObj,
            xAngle: 60,
            yAngle: 90,
            time: 1000,
        });
    });
}

/**
 * 创建顶牌
 * @param {Object} obj - 需要创建顶牌的对象
 */
function createUiAnchor(obj) {
    var pictureMarkerHtml =
        `<div class="pictureMarker" style="position: absolute;">
            <div id="box" style="display:none;position: absolute;height: 40px;width: 40px;z-index:-1"></div>
            <div class="picture" style="height: 30px;width: 30px;">
                <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
            </div>
        </div>`;
    $('#div3d').append($(pictureMarkerHtml));
    $('head').append($(`
        <style>
            .scaleAnimation{
                animation: scaleTo 0.3s infinite alternate;
            }
            @keyframes scaleTo {
                from{-webkit-transform: scale(1);}
                to{-webkit-transform: scale(1.3);}
            }
            .moveAnimation{
                animation: moveTo 1s infinite;
            }
            @keyframes moveTo {
                0% {
                    transform: translate3d(0, 0px, 0);
                }

                60% {
                    transform: translate3d(0, -50px, 0);
                }

                75% {
                    transform: translate3d(0, 10px, 0);
                }

                90% {
                    transform: translate3d(0, -10px, 0);
                }

                100% {
                    transform: none;
                }
            }
        </style>
    `));
    let anchorCreateJson = {
        type: "UIAnchor",
        element: $(".pictureMarker")[0],
        parent: obj,
        localPosition: [0, 2, 0],
        pivotPixel: [parseFloat($(".pictureMarker").css("width")) / 2, parseFloat($(".pictureMarker").css("height"))]
    }
    tempTopCard = app.create(anchorCreateJson);  // 创建顶牌
    tempTopCard.visible = true;  // 设置初始顶牌状态
    $('.pictureMarker').addClass('moveAnimation');
}
