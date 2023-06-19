/**
 * 说明：创建标注
 * 操作：点击按钮，创建标注
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/6a8b08ea8ac37ffacc9041f5',
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
    initThingJsTip("ThingJS支持添加标注（文本标注，图片标注，定位标注，气泡标注等效果），点击左侧按钮体验效果");
    //  修改进入层级背景设置
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

    // 添加纯文本标注
    new THING.widget.Button('纯文本标注', function() {
        removeMark();
        var box = app.create({
            type: 'Box',
            name: 'box01',
            width: 1.0, // 宽度 
            height: 1.0, // 高度 
            depth: 1.0, // 深度 
            position: [82, -0.5, 60],
            style: {
                opacity: 0,
            }
        });
        if ($('.textMarker').length > 0) {
            $('.textMarker').css('display', 'block')
        } else {
            createElement(box, "textMarker");
        }
    })

    // 更新文本标注内容
    new THING.widget.Button('更新文本标注内容', function() {
        if ($('.textMarker').length > 0) {
            $('.textMarker .text').html('ThingJS文字标注');
        }
    })

    // 更新文字位置
    new THING.widget.Button('更新文字位置', function() {
        var box = app.query('.Box')[0];
        if (box) {
            box.moveTo({
                position: [70, -0.5, 51], // 移动到世界位置
                time: 2 * 1000,
                orientToPath: true,
                lerpType: null, // 插值类型，默认为线性插值 
            });
        }
    })

    // 添加图片加文字标注
    new THING.widget.Button('图片加文字标注', function() {
        removeMark();
        if ($('.textAndPictureMarker').length > 0) {
            $('.textAndPictureMarker').css('display', 'block')
        } else {
            createElement(null, "textAndPictureMarker");
        }
    })

    // 添加普通图片标注
    new THING.widget.Button('普通图片标注', function() {
        removeMark();
        // 创建图片标注
        if ($('.pictureMarker').length > 0) {
            $('.pictureMarker').css('display', 'block')
        } else {
            createElement(null, "pictureMarker");
        }
    })

    // 添加带角度的图片标注
    new THING.widget.Button('带角度的图片标注', function() {
        removeMark();
        // 创建图片标注
        if ($('.pictureMarker').length > 0) {
            $('.pictureMarker').css('display', 'block');
        } else {
            createElement(null, "pictureMarker");
        }
        $('.pictureMarker').addClass('rotateAnimation');
    })

    // 添加定位标注
    new THING.widget.Button('定位标注', function() {
        removeMark();
        var box = app.create({
            type: 'Box',
            width: 1.0, // 宽度 
            height: 1.0, // 高度 
            depth: 1.0, // 深度 
            position: [80, -0.5, 60],
            style: {
                opacity: 0,
            }
        });
        var marker = app.create({
            type: "Marker",
            name: "pictureMarker",
            parent: box,
            url: "/guide/examples/images/navigation/navigation.png",
            localPosition: [0, 0.1, 0],
            size: 1.5,
            useSpriteMaterial: false
        })
        marker.rotateX(90);
    })

    // 更新定位标注
    new THING.widget.Button('更新定位标注', function() {
        var box = app.query('.Box')[0];
        if (box) {
            box.moveTo({
                position: [70, -0.5, 51], // 移动到世界位置
                time: 2 * 1000,
                orientToPath: true,
                lerpType: null, // 插值类型 默认为线性插值 
            });
        }
    })

    // 动态添加图片标注
    new THING.widget.Button('动态添加图片标注', function() {
        removeMark();
        // 鼠标单击事件，动态添加图片标注
        app.on('click', function(ev) {
            if (ev.picked) {
                app.create({
                    type: 'Marker',
                    name: "marker",
                    url: "/guide/examples/images/navigation/pointer.png",
                    size: 1.1,
                    position: ev.pickedPosition,
                    keepSize: true,
                    pivot: [0.5, 1],
                    style: {
                        alwaysOnTop: true
                    }
                });
            }
        }, '动态添加图片标注');
    })

    var marker01 = null;
    var marker02 = null;
    var time = 0;
    // 气泡标注
    new THING.widget.Button('气泡标注', function() {
        removeMark();
        // 创建普通图片标注
        if (marker01 == null) {
            marker01 = app.create({
                type: "Marker",
                name: "marker01",
                url: "/guide/examples/images/navigation/pointer.png",
                position: [80, 3, 70],
                size: 1.1
            })
        }
        // 顶牌可拖拽
        marker01.draggable = true;
        // 判断自定义popMarker是否存在，存在即显示，不存在即创建；
        if ($("#popMarkerTo" + marker01.id).length > 0) {
            $("#popMarkerTo" + marker01.id).css('display', 'block');
        } else {
            createElement(marker01, "popMarker");
        }

        // marker01添加鼠标滑过事件、点击事件、鼠标按下/抬起事件、拖拽事件
        marker01.on('click', function() {
            // 点击图片标注，popMarker显隐
            var popMarker = marker01.getAttribute("popMarker");
            if (popMarker) {
                popMarker.visible = !popMarker.visible;
            }
        }, '鼠标点击事件').on('mouseenter', function(ev) {
            app.resumeEvent('mousemove', null, '获取鼠标位置')
            // 实时获取鼠标位置
            app.on('mousemove', function(event) {
                if ($("#promptMarkerTo" + marker01.id).length > 0) {
                    $("#promptMarkerTo" + marker01.id).css('display', 'block');
                } else {
                    createElement(marker01, "promptMarker");
                }
                var width = parseFloat($("#promptMarkerTo" + marker01.id).css('width'))
                $("#promptMarkerTo" + marker01.id).css('left', event.x - width);
                $("#promptMarkerTo" + marker01.id).css('top', event.y);
            }, '获取鼠标位置')
            $(document.body).css('cursor', 'pointer');
        }, '鼠标滑过提示顶牌显示').on('mouseleave', function(ev) {
            // 鼠标移走顶牌隐藏
            $(document.body).css('cursor', 'default');
            app.pauseEvent('mousemove', null, '获取鼠标位置')
            $("#promptMarkerTo" + marker01.id).css('display', 'none');
        }, '鼠标移走提示顶牌隐藏').on(THING.EventType.MouseDown, function(ev) {
            // 获取鼠标按下时间，时长2s时，图片标注进行一次缩放
            app.on('update', function() {
                time += 1;
                var time1 = time.toFixed(0);
                // 1秒=12帧
                if (time1 == '24') {
                    marker01.scaleTo({
                        scale: [1.5, 1.5, 1.5], // 缩放倍数
                        time: 200, // 动画时间
                        complete: function() {
                            marker01.scaleTo({
                                scale: [1, 1, 1], // 缩放倍数
                                time: 200, // 动画时间
                            })
                        }
                    })
                }
            }, '鼠标按下时长')
        }, '鼠标长按进行缩放').on(THING.EventType.MouseUp, function(ev) {
            app.off('update', null, '鼠标按下时长');
            time = 0;
        })

        // 关闭自定义popMarker标注
        $('#popMarkerTo' + marker01.id + ' .myPopClose').on('click', function() {
            $("#popMarkerTo" + marker01.id).css('display', 'none');
        })

        // 创建文字+顶牌
        if (marker02 == null) {
            marker02 = app.create({
                type: "Marker",
                name: "marker02",
                url: "/guide/examples/images/navigation/pointer.png",
                position: [63, 3, 44],
                size: 1.1,
                keepSize: true // 保持像素大小
            })
        }
        if ($("#controlPopmarker" + marker02.id).length > 0) {
            $("#controlPopmarker" + marker02.id).css('display', 'block');
        } else {
            createElement(marker02, "control-popmarker");
        }
        // 关闭标注
        $('#controlPopmarker' + marker02.id + ' .close').on('click', function() {
            $("#controlPopmarker" + marker02.id).css('display', 'none');
        })
    })

    // 清除标注
    new THING.widget.Button('清除标注', removeMark);

    /**
     * 清除标注
     */
    function removeMark() {
        // 清除纯文本标注
        $('.textMarker').remove();
        // 清除图片加文本标注
        $('.textAndPictureMarker').remove();
        // 清除图片标注
        $('.pictureMarker').remove();
        // 移除marker
        var marker = app.query(/marker/);
        if (marker) {
            marker.destroy();
        }
        marker01 = null;
        marker02 = null;
        // 移除box
        var box = app.query('.Box');
        if (box) {
            box.destroy();
        }
        // 移除动态添加图片标注事件
        app.off('click', null, '动态添加图片标注')
    }
})

/**
 * 创建页面元素
 * @param {Object} obj - 创建页面元素的物体
 * @param {String} value - 创建页面元素的类型
 */
function createElement(obj, value) {
    if (value == "textMarker") {
        var textMarkerHtml =
            `<div class="textMarker" id="textMarkerTo` + obj.id + `" style="position: absolute;">
			    <div class="text" style="color: #ff0000;font-size: 12px;text-shadow: #ffff00  0px 2px, #ffff00  2px 0px, #ffff00  -2px 0px, #ffff00  0px -2px, #ffff00  -1.4px -1.4px, #ffff00  1.4px 1.4px, #ffff00  1.4px -1.4px, #ffff00  -1.4px 1.4px;">
				    测试标签
			    </div>
		    </div>`;
        $('#div3d').append($(textMarkerHtml));
        obj.setAttribute('textMarkerID', $(textMarkerHtml).attr('id'));
    } else if (value == "pictureMarker") {
        var pictureMarkerHtml =
            `<div class="pictureMarker" style="position: absolute;">
			    <div class="picture" style="height: 30px;width: 30px;">
				    <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
			    </div>
		    </div>`;
        $('#div3d').append($(pictureMarkerHtml));
    } else if (value == "textAndPictureMarker") {
        var textAndPictureMarkerHtml =
            `<div class="textAndPictureMarker" style="position: absolute;">
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
            `<div class="popMarker" id="popMarkerTo` + obj.id + `" style="font-size: 14px;width: 210px;text-align: left;background-color: rgba(0, 0, 0, .9);border: 2px solid #eeeeee;border-radius: 8px;color: #eee;position: absolute;">
                <div class="s1" style="margin: 5px 10px;line-height: 20px;overflow: hidden;">
                    <h3>自定义样式popMarker</h3>
                </div>
                <div class="s2" style="margin: 5px 10px 10px 10px;line-height: 18px;font-size: 12px;overflow: hidden;">
                    <pS>点击下方图片标注切换显示隐藏；长按图片标注可以拖动</p>
                </div>
                <div class="myPopClose" style="position: absolute;top: -6px;right: -6px;background-color: #3F6781;width: 8px;height: 8px;border: 2px solid #eee;border-radius: 50%;cursor: pointer"></div>
            </div>`;
        $('#div3d').append($(popMarkerHtml));
        obj.setAttribute('popMarkerID', $(popMarkerHtml).attr('id'));
    } else if (value == "control-popmarker") {
        var controlPopmarkerHtml =
            `<div class="popMarker" id="popMarkerTo` + obj.id + `" style="font-size: 14px;width: 210px;text-align: left;background-color: rgba(0, 0, 0, .9);border: 2px solid #eeeeee;border-radius: 8px;color: #eee;position: absolute;">
                <div class="s1" style="margin: 15px 10px;line-height: 20px;overflow: hidden;">
                    <a target="_bank" style="color:#ffffff" href="https://www.thingjs.com/guide/">ThingJS官方网站</a>
                </div>
                <div class="myPopClose" style="position: absolute;top: -6px;right: -6px;background-color: #3F6781;width: 8px;height: 8px;border: 2px solid #eee;border-radius: 50%;"></div>
            </div>`;
        $('#div3d').append($(controlPopmarkerHtml));
        obj.setAttribute('controlPopmarkerID', $(controlPopmarkerHtml).attr('id'));
    } else if (value == "promptMarker") {
        var promptMarkerHtml =
            `<div class="promptMarker" id="promptMarkerTo` + obj.id + `" style="position: absolute;left: 100px;top: 100px;pointer-events: none;">
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
    createUIAnchor(obj, value);
    registerEvent(obj, value);
}

/**
 * 创建UIAnchor界面
 * @param {Object} obj - 创建界面的父物体
 * @param {String} value - 创建界面的类型
 */
function createUIAnchor(obj, value) {
    // 创建界面的json数据
    let anchorCreateJson = {
        type: "UIAnchor",
        element: $(".pictureMarker")[0],
        position: [0, 1, -10],
        parent: app.query('#108')[0],
        pivotPixel: [parseFloat($(".textAndPictureMarker").css("width")) / 2, parseFloat($(".textAndPictureMarker").css("height"))]
    }
    if (value == "textAndPictureMarker") {
        anchorCreateJson.element = $(".textAndPictureMarker")[0];
        anchorCreateJson.position = [85, 2, 60];
        anchorCreateJson.pivotPixel = [parseFloat($(".textAndPictureMarker").css("width")) / 2, parseFloat($(".textAndPictureMarker").css("height"))];
        let tempTopCard = app.create(anchorCreateJson); // 创建顶牌
        tempTopCard.visible = true; // 设置初始顶牌状态
    } else if (value == "pictureMarker") {
        anchorCreateJson.element = $(".pictureMarker")[0];
        anchorCreateJson.position = [78, 2, 57];
        anchorCreateJson.pivotPixel = [parseFloat($(".pictureMarker").css("width")) / 2, parseFloat($(".pictureMarker").css("height"))];
        let tempTopCard = app.create(anchorCreateJson); // 创建顶牌
        tempTopCard.visible = true; // 设置初始顶牌状态
    } else if (value == "textMarker") {
        let objTopCardEleID = obj.getAttribute("textMarkerID");
        let anchorCreateJson = {
            type: "UIAnchor",
            parent: obj,
            element: $("#" + objTopCardEleID)[0],
            localPosition: [0, 1.5, 0],
            pivotPixel: [parseFloat($("#" + objTopCardEleID).css("width")) / 2, parseFloat($("#" + objTopCardEleID).css("height"))]
        }
        let tempTopCard = app.create(anchorCreateJson); // 创建顶牌
        tempTopCard.visible = true; // 设置初始顶牌状态
    } else if (value == "popMarker") {
        let objTopCardEleID = obj.getAttribute("popMarkerID");
        let anchorCreateJson = {
            type: "UIAnchor",
            parent: obj,
            element: $("#" + objTopCardEleID)[0],
            localPosition: [0, 1.5, 0],
            pivotPixel: [parseFloat($("#" + objTopCardEleID).css("width")) / 2, parseFloat($("#" + objTopCardEleID).css("height"))]
        }
        let tempTopCard = app.create(anchorCreateJson); // 创建顶牌
        tempTopCard.visible = false; // 设置初始顶牌状态
        obj.setAttribute("popMarker", tempTopCard); // 给当前物体绑定对应的顶牌对象
    } else if (value == "control-popmarker") {
        let objTopCardEleID = obj.getAttribute("controlPopmarkerID");
        let anchorCreateJson = {
            type: "UIAnchor",
            parent: obj,
            element: $("#" + objTopCardEleID)[0],
            localPosition: [0, 2, 0],
            pivotPixel: [parseFloat($("#" + objTopCardEleID).css("width")) / 2, parseFloat($("#" + objTopCardEleID).css("height"))]
        }
        let tempTopCard = app.create(anchorCreateJson); // 创建顶牌
        tempTopCard.visible = false; // 设置初始顶牌状态
        obj.setAttribute("controlPopmarker", tempTopCard); // 给当前物体绑定对应的顶牌对象
    } else {
        return;
    }
}

/**
 * 标注注册事件
 * @param {Object} obj - 标注的父物体
 * @param {String} value - 标注的类型
 */
function registerEvent(obj, value) {
    if (value == "popMarker") {
        let tempTopCard = obj.getAttribute("popMarker");
        let isVisible = obj.visible;
        if (isVisible == true) {
            tempTopCard.visible = true;
        }
    } else if (value == "control-popmarker") {
        let tempTopCard = obj.getAttribute("controlPopmarker");
        let isVisible = obj.visible;
        if (isVisible == true) {
            tempTopCard.visible = true;
        }
    } else {
        return;
    }
}