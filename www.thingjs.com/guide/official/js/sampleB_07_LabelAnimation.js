/**
 * @version 2.0
 * @author ThingJS
 * 说明：标注动画
 * 操作：点击按钮，播放/停止标注动画
 * 难度：★★☆☆☆
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
app.background = '#001326';

// 获取当前场景需要的贴图数据
var chartletData = null;
$.getJSON('/guide/examples/json/mark/data.json', function (result) {
    chartletData = result;
})

const bundle = app.loadBundle("https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/daohang", { ignoreTheme: true });
bundle.waitForComplete().then(() => {
    initThingJsTip("ThingJS支持针对创建的标注添加动画效果，点击左侧按钮体验效果");
    const campus = bundle.campuses[0];
    app.on(THING.EventType.AfterEnterLevel, '*', function (ev) {
        app.skyBox = null;
        app.background = '#001326';
        app.query('#worker')[0].visible = false;
    }, 'customLevelSetBackground');
    //  停止进入物体层级的默认背景设置
    // app.pauseEvent(THING.EventType.AfterEnterLevel, '*', THING.EventTag.LevelSetBackground);

    // 查询所有楼层
    var floors = app.query('.Floor');
    // 切换至楼层层级
    app.levelManager.changeAsync(floors[0], { jumping: true });
    // 设置开启层级切换后默认勾边颜色
    var roomObjs = app.query('.Room').add(campus.things);
    app.on(THING.EventType.RegisterLevelAction, '*', function (ev) {
        var actionQueue = ev.actionQueue;
        actionQueue.enable('hoverChild', false)
    });
    // // 设置摄像机俯仰角度范围[最小值, 最大值]
    app.camera.xAngleLimitRange = [0, 90];
    // // 设置摄像机视角
    app.camera.flyTo({
        'target': floors[0],
        'xAngle': 60,
        'yAngle': 90,
        'radiusFactor': 0.8,
        'time': 1000,
        'lerpType': null
    });

    // 创建房间贴图
    var info = chartletData.data.info;
    for (let i = 0; i < info.length; i++) {
        var parent = app.query("#" + info[i].id)[0];
        var localPositon = info[i].localposition;
        var type = info[i].type;
        if (type == "pictureMarker") {
            // 创建贴图
            var plane = new THING.Marker({
                name: 'plane',
                localPosition: [0, parent.boundingBox.size[1], 0],
                parent: parent,
                style: { image: new THING.ImageTexture('https://www.thingjs.com' + info[i].url) },
                pivot: [0.5, 0.5],
                renderType: THING.RenderType.Plane,
            })
            plane.scale = [4, 4, 4];
            // 平面旋转
            // plane.rotation = 0.5;
            plane.rotateX(-90);
            plane.rotateZ(info[i].angleZ);
        }
    }
    // 创建文字+图片标注
    var box01 = new THING.Box(1, 1, 1, {
        name: 'box01',
        position: [60, 3, 70],
        style: {
            opacity: 0,
        }
    });
    createElement(box01, "textAndPictureMarker");

    // 创建普通图片标注
    var box02 = new THING.Box(1, 1, 1, {
        name: 'box02',
        position: [75, 3, 57],
        style: {
            opacity: 0,
        }
    });
    createElement(box02, "pictureMarker");
    // 创建文字标注
    var box03 = new THING.Box(1, 1, 1, {
        name: 'box03',
        position: [82, 3, 46],
        style: {
            opacity: 0,
        }
    });
    createElement(box03, "textMarker");
    // 跳跃动画
    new THING.widget.Button('跳跃动画开启', function () {
        // 获取按钮value值，进行改变
        var posInfo = document.querySelectorAll("#widget_root input");
        if (posInfo[1].value == "闪烁动画关闭") {
            posInfo[1].value = "闪烁动画开启";
        }
        if (posInfo[2].value == "关闭发光") {
            posInfo[2].value = "图片标注发光";
        }

        // 如果闪烁动画/图片标注发光开启中，先关闭闪烁动画/图片标注发光，再开启跳跃动画
        $('#textAndPictureMarker').removeClass('scaleAnimation');
        $('#pictureMarker').removeClass('scaleAnimation');
        $('#textMarker').removeClass('scaleAnimation');
        $('#box').css('display', 'none');

        // // 跳跃动画开启/关闭
        if (posInfo[0].value == "跳跃动画开启") {
            $('#textAndPictureMarker').addClass('moveAnimation');
            $('#pictureMarker').addClass('moveAnimation');
            $('#textMarker').addClass('moveAnimation');
            posInfo[0].value = "跳跃动画关闭";
        } else {
            $('#textAndPictureMarker').removeClass('moveAnimation');
            $('#pictureMarker').removeClass('moveAnimation');
            $('#textMarker').removeClass('moveAnimation');
            posInfo[0].value = "跳跃动画开启";
        }
    })
    // 闪烁动画
    new THING.widget.Button('闪烁动画开启', function () {
        // 获取按钮value值，进行改变
        var posInfo = document.querySelectorAll("#widget_root input");
        if (posInfo[0].value == "跳跃动画关闭") {
            posInfo[0].value = "跳跃动画开启";
        }
        if (posInfo[2].value == "关闭发光") {
            posInfo[2].value = "图片标注发光";
        }

        // 如果跳跃动画/图片标注发光开启中，先关闭跳跃动画/图片标注发光，再开启闪烁动画
        $('#textAndPictureMarker').removeClass('moveAnimation');
        $('#pictureMarker').removeClass('moveAnimation');
        $('#textMarker').removeClass('moveAnimation');
        $('#box').css('display', 'none');

        // 闪烁动画开启/关闭
        if (posInfo[1].value == "闪烁动画开启") {
            $('#textAndPictureMarker').addClass('scaleAnimation');
            $('#pictureMarker').addClass('scaleAnimation');
            $('#textMarker').addClass('scaleAnimation');
            posInfo[1].value = "闪烁动画关闭";
        } else {
            $('#textAndPictureMarker').removeClass('scaleAnimation');
            $('#pictureMarker').removeClass('scaleAnimation');
            $('#textMarker').removeClass('scaleAnimation');
            posInfo[1].value = "闪烁动画开启";
        }
    })

    // 图片发光
    new THING.widget.Button('图片标注发光', function () {
        var posInfo = document.querySelectorAll("#widget_root input");
        if (posInfo[0].value == "跳跃动画关闭") {
            posInfo[0].value = "跳跃动画开启";
        }
        if (posInfo[1].value == "闪烁动画关闭") {
            posInfo[1].value = "闪烁动画开启";
        }

        // 如果闪烁动画/跳跃动画发光开启中，先关闭闪烁动画/跳跃动画发光，再开启图片标注发光
        $('#textAndPictureMarker').removeClass('scaleAnimation');
        $('#pictureMarker').removeClass('scaleAnimation');
        $('#textMarker').removeClass('scaleAnimation');
        $('#textAndPictureMarker').removeClass('moveAnimation');
        $('#pictureMarker').removeClass('moveAnimation');
        $('#textMarker').removeClass('moveAnimation');

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
function createElement(obj, value) {
    if (value == "textAndPictureMarker") {
        var textAndPictureMarkerHtml =
            `<div id="textAndPictureMarker" style="position: absolute;">
                <div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white 0px 2px, white 2px 0px, white -2px 0px, white 0px -2px, white -1.4px -1.4px, white 1.4px 1.4px, white 1.4px -1.4px, white -1.4px 1.4px;margin-bottom: 5px;">
                    文字+图片标注
                </div>
                <div class="picture" style="height: 30px;width: 30px;margin: auto;">
                    <img src="https://www.thingjs.com/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
                </div>
            </div>`;
        $('#div3d').append($(textAndPictureMarkerHtml));
    } else if (value == "pictureMarker") {
        var pictureMarkerHtml =
            `<div id="pictureMarker" style="position: absolute;">
                <div id="box" style="display:none;position: absolute;height: 40px;width: 40px;z-index:-1"></div>
                <div class="picture" style="height: 30px;width: 30px;">
                    <img src="https://www.thingjs.com/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
                </div>
            </div>`;
        $('#div3d').append($(pictureMarkerHtml));
    } else if (value == "textMarker") {
        var textMarkerHtml =
            `<div id="textMarker" style="position: absolute;">
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
    createUIAnchor(obj, value);
}
/**
 * 创建UIAnchor界面
 * @param {String} value - 界面类型
 */
function createUIAnchor(obj, value) {
    obj.addComponent(THING.DOM.CSS2DComponent, 'css');
    const css = obj.css;
    css.pivot = [0.5, 0];
    css.domElement = document.getElementById(value);
    css.autoUpdateVisible = true;
    css.visible = true;
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
    Circle.prototype.radiu = function () {
        radius += 0.5; // 每一帧半径增加0.5
        if (this.radius > 25) {
            radius = 0;
        };
    };
    // 绘制圆形的方法
    Circle.prototype.paint = function () {
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
    var render = function () {
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
    setInterval(function () {
        render();
    }, 20);
}