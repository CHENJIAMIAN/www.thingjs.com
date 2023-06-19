/**
 * 说明：标注动画
 * 操作：点击按钮，播放/停止标注动画
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: '/api/scene/6a8b08ea8ac37ffacc9041f5',
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
$.getJSON('/guide/examples/json/mark/data.json', function(result) {
    chartletData = result;
})

// 场景加载完成事件 
app.on('load', function(ev) {
    initThingJsTip("ThingJS支持针对创建的标注添加动画效果，点击左侧按钮体验效果");
    // 修改进入层级背景设置
    app.on(THING.EventType.EnterLevel, '*', function(ev) {
        app.skyBox = null;
        app.background = '#001326';
    }, 'customLevelSetBackground');
    // 停止进入物体层级的默认背景设置
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

    // 创建文字+图片标注
    createElement("textAndPictureMarker");
    // 创建普通图片标注
    createElement("pictureMarker");
    // 创建文字标注
    createElement("textMarker");

    // 跳跃动画
    new THING.widget.Button('跳跃动画开启', function() {
        // 获取按钮value值，进行改变
        var posInfo = document.querySelectorAll("#widget_root input");
        if (posInfo[1].value == "闪烁动画关闭") {
            posInfo[1].value = "闪烁动画开启";
        }
        if (posInfo[2].value == "关闭发光") {
            posInfo[2].value = "图片标注发光";
        }

        // 如果闪烁动画/图片标注发光开启中，先关闭闪烁动画/图片标注发光，再开启跳跃动画
        $('.textAndPictureMarker').removeClass('scaleAnimation');
        $('.pictureMarker').removeClass('scaleAnimation');
        $('.textMarker').removeClass('scaleAnimation');
        $('#box').css('display', 'none');

        // 跳跃动画开启/关闭
        if (posInfo[0].value == "跳跃动画开启") {
            $('.textAndPictureMarker').addClass('moveAnimation');
            $('.pictureMarker').addClass('moveAnimation');
            $('.textMarker').addClass('moveAnimation');
            posInfo[0].value = "跳跃动画关闭";
        } else {
            $('.textAndPictureMarker').removeClass('moveAnimation');
            $('.pictureMarker').removeClass('moveAnimation');
            $('.textMarker').removeClass('moveAnimation');
            posInfo[0].value = "跳跃动画开启";
        }
    })

    // 闪烁动画
    new THING.widget.Button('闪烁动画开启', function() {
        // 获取按钮value值，进行改变
        var posInfo = document.querySelectorAll("#widget_root input");
        if (posInfo[0].value == "跳跃动画关闭") {
            posInfo[0].value = "跳跃动画开启";
        }
        if (posInfo[2].value == "关闭发光") {
            posInfo[2].value = "图片标注发光";
        }

        // 如果跳跃动画/图片标注发光开启中，先关闭跳跃动画/图片标注发光，再开启闪烁动画
        $('.textAndPictureMarker').removeClass('moveAnimation');
        $('.pictureMarker').removeClass('moveAnimation');
        $('.textMarker').removeClass('moveAnimation');
        $('#box').css('display', 'none');

        // 闪烁动画开启/关闭
        if (posInfo[1].value == "闪烁动画开启") {
            $('.textAndPictureMarker').addClass('scaleAnimation');
            $('.pictureMarker').addClass('scaleAnimation');
            $('.textMarker').addClass('scaleAnimation');
            posInfo[1].value = "闪烁动画关闭";
        } else {
            $('.textAndPictureMarker').removeClass('scaleAnimation');
            $('.pictureMarker').removeClass('scaleAnimation');
            $('.textMarker').removeClass('scaleAnimation');
            posInfo[1].value = "闪烁动画开启";
        }
    })

    // 图片发光
    new THING.widget.Button('图片标注发光', function() {
        var posInfo = document.querySelectorAll("#widget_root input");
        if (posInfo[0].value == "跳跃动画关闭") {
            posInfo[0].value = "跳跃动画开启";
        }
        if (posInfo[1].value == "闪烁动画关闭") {
            posInfo[1].value = "闪烁动画开启";
        }

        // 如果闪烁动画/跳跃动画发光开启中，先关闭闪烁动画/跳跃动画发光，再开启图片标注发光
        $('.textAndPictureMarker').removeClass('scaleAnimation');
        $('.pictureMarker').removeClass('scaleAnimation');
        $('.textMarker').removeClass('scaleAnimation');
        $('.textAndPictureMarker').removeClass('moveAnimation');
        $('.pictureMarker').removeClass('moveAnimation');
        $('.textMarker').removeClass('moveAnimation');

        // 图片标注发光开启/关闭
        if (posInfo[2].value == "图片标注发光") {
            $('#box').css('top', '-25px');
            $('#box').css('left', '-25px');
            $('#box').css('display', 'block');
            posInfo[2].value = "关闭发光";
        } else {
            $('#box').css('display', 'none');
            posInfo[2].value = "图片标注发光";
        }
    })
    createCanvas(); // 创建圆形扩散效果
});

/**
 * 创建页面元素
 * @param {String} value - 页面元素类型
 */
function createElement(value) {
    if (value == "textAndPictureMarker") {
        var textAndPictureMarkerHtml =
            `<div class="textAndPictureMarker" style="position: absolute;">
                <div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white 0px 2px, white 2px 0px, white -2px 0px, white 0px -2px, white -1.4px -1.4px, white 1.4px 1.4px, white 1.4px -1.4px, white -1.4px 1.4px;margin-bottom: 5px;">
                    文字+图片标注
                </div>
                <div class="picture" style="height: 30px;width: 30px;margin: auto;">
                    <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
                </div>
            </div>`;
        $('#div3d').append($(textAndPictureMarkerHtml));
    } else if (value == "pictureMarker") {
        var pictureMarkerHtml =
            `<div class="pictureMarker" style="position: absolute;">
                <div id="box" style="display:none;position: absolute;height: 40px;width: 40px;z-index:-1"></div>
                <div class="picture" style="height: 30px;width: 30px;">
                    <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
                </div>
            </div>`;
        $('#div3d').append($(pictureMarkerHtml));
    } else if (value == "textMarker") {
        var textMarkerHtml =
            `<div class="textMarker" style="position: absolute;">
                <div class="text" style="color: #000000;font-size: 12px;text-shadow: white 0px 2px, white 2px 0px, white -2px 0px, white 0px -2px, white -1.4px -1.4px, white 1.4px 1.4px, white 1.4px -1.4px, white -1.4px 1.4px;">
                    测试标签
                </div>
            </div>`;
        $('#div3d').append($(textMarkerHtml));
    }
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
    createUIAnchor(value);
}

/**
 * 创建UIAnchor界面
 * @param {String} value - 界面类型
 */
function createUIAnchor(value) {
    let anchorCreateJson = {
        type: "UIAnchor",
        element: $(".textAndPictureMarker")[0],
        parent: app.query('#108')[0],
        position: [-5, 2, -20],
        pivotPixel: [parseFloat($(".textAndPictureMarker").css("width")) / 2, parseFloat($(".textAndPictureMarker").css("height"))]
    }
    if (value == "textAndPictureMarker") {
        anchorCreateJson.element = $(".textAndPictureMarker")[0];
        anchorCreateJson.position = [60, 3, 70];
        anchorCreateJson.pivotPixel = [parseFloat($(".textAndPictureMarker").css("width")) / 2, parseFloat($(".textAndPictureMarker").css("height"))];
    } else if (value == "pictureMarker") {
        anchorCreateJson.element = $(".pictureMarker")[0];
        anchorCreateJson.position = [75, 3, 57];
        anchorCreateJson.pivotPixel = [parseFloat($(".pictureMarker").css("width")) / 2, parseFloat($(".pictureMarker").css("height"))];
    } else if (value == "textMarker") {
        anchorCreateJson.element = $(".textMarker")[0];
        anchorCreateJson.position = [82, 3, 46];
        anchorCreateJson.pivotPixel = [parseFloat($(".textMarker").css("width")) / 2, parseFloat($(".textMarker").css("height"))]
    }
    let tempTopCard = app.create(anchorCreateJson); // 创建顶牌
    tempTopCard.visible = true; // 设置初始顶牌状态
}

/**
 * 创建圆形扩散效果
 */
function createCanvas() {
    var canvasList = document.getElementById('box');
    var canvas = document.createElement('canvas');
    canvasList.appendChild(canvas);
    canvas.width = 80;
    canvas.height = 80;
    var context = canvas.getContext("2d");
    var width = 80,
        height = 80;
    var arr = [];
    arr.push({
        x: parseInt(canvas.width / 2),
        y: parseInt(canvas.height / 2)
    });

    // 创建构造函数Circle
    function Circle(x, y, radius) {
        this.xx = x; // 在画布内随机生成x值
        this.yy = y;
        this.radius = radius;
    };
    Circle.prototype.radiu = function() {
        radius += 0.5; // 每一帧半径增加0.5
        if (this.radius > 25) {
            radius = 0;
        };
    };
    // 绘制圆形的方法
    Circle.prototype.paint = function() {
        context.beginPath();
        context.arc(this.xx, this.yy, this.radius, 0, Math.PI * 2);
        context.closePath();
        context.lineWidth = 2; // 线条宽度
        context.strokeStyle = 'rgba(255,255,255,1)'; // 颜色
        context.stroke();
    };

    var newfun = null;
    var radius = 0;

    function createCircles() {
        for (var j = 0; j < arr.length; j++) {
            newfun = new Circle(arr[j].x, arr[j].y, radius); //调用构造函数
            newfun.paint();
        };
        newfun.radiu();
    };

    // 创建临时canvas 
    var backCanvas = document.createElement('canvas'),
        backCtx = backCanvas.getContext('2d');
    backCanvas.width = width;
    backCanvas.height = height;
    // 设置主canvas的绘制透明度
    context.globalAlpha = 0.95;
    // 显示即将绘制的图像，忽略临时canvas中已存在的图像
    backCtx.globalCompositeOperation = 'copy';
    var render = function() {
        // 先将主canvas的图像缓存到临时canvas中
        backCtx.drawImage(canvas, 0, 0, width, height);
        // 清除主canvas上的图像
        context.clearRect(0, 0, width, height);
        // 在主canvas上画新圆
        createCircles();
        // 等新圆画完后，再把临时canvas的图像绘制回主canvas中
        context.drawImage(backCanvas, 0, 0, width, height);
    };
    // 刷新计时器
    setInterval(function() {
        render();
    }, 20);
}