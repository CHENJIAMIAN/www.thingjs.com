/**
 * @version 2.0
 * @author ThingJS
 * 说明：创建标注
 * 操作：点击按钮，创建标注
 * 难度：★★☆☆☆
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 获取当前场景需要的贴图数据
var chartletData = null;
$.getJSON('/guide/examples/json/mark/data.json', function (result) {
    chartletData = result;
})

// 加载场景并切换层级
const bundle = app.loadBundle("https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/marker");
bundle.waitForComplete().then(() => {
    const campus = bundle.campuses[0];
    app.on(THING.EventType.AfterEnterLevel, '*', function (ev) {
        app.skyBox = null;
        app.background = '#001326';
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
                localPosition: [0, 1, 0],
                parent: parent,
                style: { image: new THING.ImageTexture('https://www.thingjs.com' + info[i].url) },
                pivot: [0.5, 0.5],
                scale: [4, 4, 4],
                renderType: THING.RenderType.Plane,
            })
            // 平面旋转
            plane.rotateX(-90);
            plane.rotateZ(info[i].angleZ);
        }
    }
    if (campus) {
        // app.levelManager.change(campus);
        initConfig();
    }
});

// 场景加载完成事件
function initConfig() {
    // 添加纯文本标注
    new THING.widget.Button('纯文本标注', function () {
        removeMark();
        var box = new THING.Box(1, 1, 1, {
            name: 'box01',
            position: [82, -0.5, 60],
            style: {
                opacity: 0,
            }
        });
        if ($('#textMarker').length > 0) {
            $('#textMarker').css('display', 'block');
        } else {
            create_html(box, "textMarker");
        }
    })

    // 更新文本标注内容
    new THING.widget.Button('更新文本标注内容', function () {
        if ($('#textMarker').length > 0) {
            $('#textMarker .text').html('ThingJS文字标注');
        } else {
        }
    })

    // 更新文字位置
    new THING.widget.Button('更新文字位置', function () {
        var box = app.query('box01')[0];
        if (box) {
            box.moveTo([70, -0.5, 51], {
                time: 2 * 1000,
                orientToPath: true,
                lerpType: null, // 插值类型，默认为线性插值 
            });
        }
    })

    // 添加图片加文字标注
    new THING.widget.Button('图片加文字标注', function () {
        removeMark();
        var box = new THING.Box(1, 1, 1, {
            name: 'box02',
            position: [85, 2, 60],
            style: {
                opacity: 0,
            }
        });
        if ($('#textAndPictureMarker').length > 0) {
            $('#textAndPictureMarker').css('display', 'block')
        } else {
            create_html(box, "textAndPictureMarker");
        }
    })

    // 添加普通图片标注
    new THING.widget.Button('普通图片标注', function () {
        removeMark();
        // 创建图片标注
        var box = new THING.Box(1, 1, 1, {
            name: 'box03',
            position: [78, 2, 57],
            style: {
                opacity: 0,
            }
        });
        if ($('#pictureMarker').length > 0) {
            $('#pictureMarker').css('display', 'block')
        } else {
            create_html(box, "pictureMarker");
        }
    })

    // 添加带角度的图片标注
    new THING.widget.Button('带角度的图片标注', function () {
        removeMark();
        // 创建图片标注
        var box = new THING.Box(1, 1, 1, {
            name: 'box04',
            position: [78, 2, 57],
            style: {
                opacity: 0,
            }
        });
        if ($('#pictureMarker').length > 0) {
            $('#pictureMarker').css('display', 'block');
        } else {
            create_html(box, "pictureMarker");
        }
        $('#pictureMarker').addClass('rotateAnimation');
    })

    // 添加定位标注
    new THING.widget.Button('定位标注', function () {
        removeMark();
        var box = new THING.Box(1, 1, 1, {
            name: 'box05',
            position: [80, -0.5, 60],
            style: {
                opacity: 0,
            }
        });
        var marker = new THING.Marker({
            name: 'marker',
            parent: box,
            localPosition: [0, 1, 0],
            scale: [1.5, 1.5, 1.5],
            style: { image: new THING.ImageTexture("/guide/examples/images/navigation/navigation.png") },
            useSpriteMaterial: false
        })
        marker.rotateX(90);
    })

    // 更新定位标注
    new THING.widget.Button('更新定位标注', function () {
        var box = app.query('box05')[0];
        if (box) {
            box.moveTo([70, -0.5, 51], {
                time: 2 * 1000,
                orientToPath: true,
                lerpType: null, // 插值类型 默认为线性插值 
            });
        }
    })

    // 动态添加图片标注
    new THING.widget.Button('动态添加图片标注', function () {
        removeMark();
        let id = 0;
        let image = new THING.ImageTexture("/guide/examples/images/navigation/pointer.png");
        // 鼠标单击事件，动态添加图片标注
        app.on('click', function (ev) {
            id++;
            if (ev.pickedPosition) {
                var box = new THING.Box(1, 1, 1, {
                    name: 'box' + id,
                    position: ev.pickedPosition,
                    style: {
                        opacity: 0,
                    }
                });
                var marker = new THING.Marker({
                    name: "marker" + id,
                    parent: box,
                    scale: [1.1, 1.1, 1.1],
                    localPosition: [0, 1, 0],
                    alwaysOnTop: true,
                    style: { 
                        image: image
                    }
                });
            }
        }, '动态添加图片标注');
    })

    var marker01 = null;
    var marker02 = null;
    var time = 0;
    // 气泡标注
    new THING.widget.Button('气泡标注', function () {
        removeMark();
        // 创建普通图片标注
        if (marker01 == null) {
            marker01 = new THING.Marker({
                name: "marker01",
                style: { image: new THING.ImageTexture("/guide/examples/images/navigation/pointer.png") },
                position: [80, 3, 70],
                scale: [1.1, 1.1, 1.1],
            })
        }
        // 顶牌可拖拽
        marker01.addComponent(THING.EXTEND.DragComponent, 'drag', {
            outlineColor: "rgba(255,255,255,0)"
        });
        marker01.drag.enable = true;

        // 判断自定义popMarker是否存在，存在即显示，不存在即创建；
        if ($("#popMarker").length > 0) {
            $("#popMarker").css('display', 'block');
        } else {
            create_html(marker01, "popMarker");
        }

        // marker01添加鼠标滑过事件、点击事件、鼠标按下/抬起事件、拖拽事件
        marker01.on('click', function () {
            // 点击图片标注，popMarker显隐
            var popMarker = $("#popMarker")[0];
            if (popMarker) {
                if ($("#popMarker").css('opacity') == '0') {
                    $("#popMarker").css('opacity', '1');
                } else {
                    $("#popMarker").css('opacity', '0');
                }
            }
        }, '鼠标点击事件');
        marker01.on('mouseenter', function (ev) {
            app.resumeEvent('mousemove', null, '获取鼠标位置');
            // 实时获取鼠标位置
            app.on('mousemove', function (event) {
                if ($("#promptMarker").length > 0) {
                    $("#promptMarker").css('display', 'block');
                } else {
                    create_html(marker01, "promptMarker");
                }
                var width = parseFloat($("#promptMarker").css('width'));
                $("#promptMarker").css('left', event.x - width);
                $("#promptMarker").css('top', event.y);
            }, '获取鼠标位置');
            $(document.body).css('cursor', 'pointer');
        }, '鼠标滑过提示顶牌显示');
        marker01.on('mouseleave', function (ev) {
            // 鼠标移走顶牌隐藏
            $(document.body).css('cursor', 'default');
            app.pauseEvent('mousemove', null, '获取鼠标位置');;
            $("#promptMarker").css('display', 'none');
        }, '鼠标移走提示顶牌隐藏');
        marker01.on('mousedown', function (ev) {
            // 获取鼠标按下时间，时长2s时，图片标注进行一次缩放
            app.on('update', function () {
                time += 1;
                var time1 = time.toFixed(0);
                // 1秒=12帧
                if (time1 == '24') {
                    marker01.scaleTo([1.5, 1.5, 1.5], {
                        time: 200, // 动画时间
                        complete: function () {
                            marker01.scaleTo([1, 1, 1], {
                                time: 200, // 动画时间
                            })
                        }
                    })
                }
            }, '鼠标按下时长')
        }, '鼠标长按进行缩放');
        marker01.on('mouseup', function (ev) {
            app.off('update', null, '鼠标按下时长');
            time = 0;
        })

        // 关闭自定义popMarker标注
        $('#popMarker .myPopClose').on('click', function () {
            $("#popMarker").css('opacity', '0');
        })

        // 创建文字+顶牌
        if (marker02 == null) {
            marker02 = new THING.Marker({
                name: "marker02",
                style: { image: new THING.ImageTexture("/guide/examples/images/navigation/pointer.png") },
                position: [63, 3, 44],
                scale: [1.1, 1.1, 1.1],
            })
        }

        if ($("#controlPopmarker").length > 0) {
            $("#controlPopmarker").css('display', 'block');
        } else {
            create_html(marker02, "controlPopmarker");
        }
    })

    // 清除标注
    new THING.widget.Button('清除标注', removeMark);

    /**
     * 清除标注
     */
    function removeMark() {

        // 移除创建的name为marker的标注
        var marker = app.query(/marker/);
        if (marker) {
            marker.destroy();
        }
        marker01 = null;
        marker02 = null;
        // 移除创建的box类型
        var box = app.query('.Box');
        if (box) {
            box.destroy();
        }
        // 移除动态添加图片标注事件
        app.off('click', null, '动态添加图片标注');
    }
}

/**
 * 创建页面元素
 * @param {Object} obj - 创建页面元素的物体
 * @param {String} value - 创建页面元素的类型
 */
var textMarkerHtml
function create_html(obj, value) {
    if (value == "textMarker") {
        textMarkerHtml =
            `<div id="textMarker"  style="position: absolute;">
			    <div class="text" style="color: #ff0000;font-size: 12px;text-shadow: #ffff00  0px 2px, #ffff00  2px 0px, #ffff00  -2px 0px, #ffff00  0px -2px, #ffff00  -1.4px -1.4px, #ffff00  1.4px 1.4px, #ffff00  1.4px -1.4px, #ffff00  -1.4px 1.4px;">
				    测试标签
			    </div>
		    </div>`;
        $('#div3d').append($(textMarkerHtml));
    } else if (value == "pictureMarker") {
        var pictureMarkerHtml =
            `<div id="pictureMarker" style="position: absolute;">
			    <div class="picture" style="height: 30px;width: 30px;">
				    <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
			    </div>
		    </div>`;
        $('#div3d').append($(pictureMarkerHtml));
    } else if (value == "textAndPictureMarker") {
        var textAndPictureMarkerHtml =
            `<div id="textAndPictureMarker" style="position: absolute;">
			<div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
				测试标签2
			</div>
			<div class="picture" style="height: 30px;width: 30px;margin: auto;">
				<img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
			</div>
		</div>`;
        $('#div3d').append($(textAndPictureMarkerHtml));
    } else if (value == "popMarker") {
        var popMarkerHtml =
            `<div id="popMarker" style="font-size: 14px;width: 210px;text-align: left;background-color: rgba(0, 0, 0, .9);border: 2px solid #eeeeee;border-radius: 8px;color: #eee;position: absolute;">
                <div class="s1" style="margin: 5px 10px;line-height: 20px;overflow: hidden;">
                    <h3>自定义样式popMarker</h3>
                </div>
                <div class="s2" style="margin: 5px 10px 10px 10px;line-height: 18px;font-size: 12px;overflow: hidden;">
                    <pS>点击下方图片标注切换显示隐藏；长按图片标注可以拖动</p>
                </div>
                <div class="myPopClose" style="position: absolute;top: -6px;right: -6px;background-color: #3F6781;width: 8px;height: 8px;border: 2px solid #eee;border-radius: 50%;cursor: pointer"></div>
            </div>`;
        $('#div3d').append($(popMarkerHtml));
    } else if (value == "controlPopmarker") {
        var controlPopmarkerHtml =
            `<div id="controlPopmarker" style="font-size: 14px;width: 210px;text-align: left;background-color: rgba(0, 0, 0, .9);border: 2px solid #eeeeee;border-radius: 8px;color: #eee;position: absolute;">
                <div class="s1" style="margin: 15px 10px;line-height: 20px;overflow: hidden;">
                    <a target="_bank" style="color:#ffffff" href="https://www.thingjs.com/guide/">ThingJS官方网站</a>
                </div>
                <div class="myPopClose" style="position: absolute;top: -6px;right: -6px;background-color: #3F6781;width: 8px;height: 8px;border: 2px solid #eee;border-radius: 50%;"></div>
            </div>`;
        $('#div3d').append($(controlPopmarkerHtml));
    } else if (value == "promptMarker") {
        var promptMarkerHtml =
            `<div id="promptMarker" style="position: absolute;left: 100px;top: 100px;pointer-events: none;">
			    <div class="prompt" style="background-color: rgba(0,0,0,0.5); color: #FFFFFF;padding: 2px;">
				    长按拖动，点击显示气泡标注
			    </div>
		    </div>`
        $('#div2d').append($(promptMarkerHtml));
    }
    $('head').append($(`
        <style>
            .rotateAnimation{
                animation: rotateTo 1s infinite normal ;
            }
            @keyframes rotateTo{
                from{transform:rotateY(0deg);}
                to{transform:rotateY(180deg);}
            }
        </style>
    `));
    create_element(obj, value);
}

/**
 * 创建顶牌界面
 * @param {Object} obj - 创建顶牌界面的父物体
 * @param {String} value - 创建顶牌界面的类型
 */
function create_element(obj, value) {
    if (value == "textAndPictureMarker") {
        let css = createTopCard(obj, value);
    } else if (value == "pictureMarker") {
        let css = createTopCard(obj, value);
    } else if (value == "textMarker") {
        let css = createTopCard(obj, value);
    } else if (value == "popMarker") {
        let css = createTopCard(obj, value);
        css.pivot = [0.5, -0.2];
    } else if (value == "controlPopmarker") {
        let css = createTopCard(obj, value);
        css.pivot = [0.5, -0.4];
    } else {
        return;
    }
}

/**
 * 创建顶牌
 * @param {Object} obj - 创建顶牌的父物体
 * @param {String} id - 创建顶牌的dom元素的id
 */
function createTopCard(obj, id) {
    obj.addComponent(THING.DOM.CSS2DComponent, 'css');
    const css = obj.css;
    css.domElement = document.getElementById(id);
    css.pivot = [0.5, 0];
    css.autoUpdateVisible = true;
    css.visible = true;
    css.factor = 0.05;
    return css;
}