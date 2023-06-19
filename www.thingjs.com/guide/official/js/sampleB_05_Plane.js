/**
 * @version 2.0
 * @author ThingJS
 * 说明：创建平面类对象
 * 备注：
 *     1. 点击按钮，创建区域面，按下鼠标左键，拖动鼠标，即可创建圆形区域。
 *     2. 鼠标悬停在区域面上，当鼠标状态发生改变时，可拖拽或拉伸区域面。
 *     3. 点击按钮创建水面。
 * 难度：★★★☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();
var region01 = null;  // 圆形区域
var region02 = null;  // 方形区域
var region03 = null;  // 多边形区域
var center = null;  // 圆形区域中心
var radius = null;  // 圆形区域半径
var water = null;//圆形水面
var stretchState = false;  // 可拉伸状态
var heatMap = null;//热力图
var bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example");
bundle.waitForComplete().then(() => {
    registerEvent();
    const campus = bundle.campuses[0];
    if (campus) {
        app.levelManager.change(campus);
    }
});

new THING.widget.Button('拖拽创建圆形区域', function () {
    reset();
    initThingJsTip("按下鼠标左键，拖动鼠标，即可创建圆形区域");
    if (region01 != null) return;
    //app.camera.enableRotate = false;  // 关闭默认的旋转操作
    // 注册鼠标键按下事件，单击鼠标左键，拖拽创建圆形区域
    app.on('mousedown', function (ev) {
        if (ev.button == 0) {
            // 定义圆心的世界坐标
            center = getMousePos(ev.x, ev.y);
            // 注册鼠标移动事件
            app.on('mousemove', function (event) {
                var mousePos = getMousePos(event.x, event.y);
                // 定义半径
                radius = THING.Math.getDistance(center, mousePos);
                // 创建圆形区域
                createCircle();
            }, '鼠标移动事件');
        }
    }, '鼠标键按下事件');

    // 注册圆形区域创建完成鼠标键抬起事件
    app.on('mouseup', function (ev) {
        if (ev.button == 0) {
            app.off('mousedown', null, '鼠标键按下事件');
            app.off('mousemove', null, '鼠标移动事件');
            app.camera.enableRotate = true;  // 打开默认的旋转操作
            if (region01 != null) {
                region01.draggable = true;  // 开启拖拽
            }
        }
    }, '圆形区域创建完成鼠标键抬起');
})

/**
 * 鼠标拖动创建圆形区域
 */
function createCircle() {
    if (center == null) return;
    var points = [];
    // 根据圆形和半径计算坐标点
    for (var degree = 0, y = 0; degree <= 360; degree += 1) {
        var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
        var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
        var pos = THING.Math.addVector([x, y, z], center);
        points.push(pos);
    }
    // 销毁之前创建的圆形区域
    if (region01) {
        region01.destroy();
    }
    // 创建圆形区域
    region01 = new THING.PlaneRegion({
        points: points,  // 点坐标
        style: {
            regionColor: 'rgb(39,168,158)',  // 区域颜色
        },
    })
    region01.style.alwaysOnTop = false;  // 设置区域始终在最前端渲染显示
    initThingJsTip("此圆形可用鼠标拖拽和改变大小");
    var dragComponents = [];
    region01.addComponent(THING.EXTEND.DragComponent, 'drag', {
    });
    var drag = region01.drag;
    drag.enable = true;
    dragComponents.push(region01.drag);
}

/**
 * 获取鼠标位置转换后的世界坐标
 * @param {Number} screenX - 鼠标屏幕横坐标
 * @param {Number} screenY - 鼠标屏幕纵坐标
 */
function getMousePos(screenX, screenY) {
    var mousePos = THING.App.current.camera.screenToWorld([screenX, screenY]);
    if (region01) {
        mousePos[1] = region01.position[1];
    } else {
        mousePos[1] = 1;
    }
    return mousePos;
}
new THING.widget.Button('创建方形区域', function () {
    reset();
    initThingJsTip("方形区域创建完成");
    const points = [[0, 0.1, 0], [10, 0.1, 0], [10, 0.1, 10], [0, 0.1, 10]];
    region02 = new THING.PlaneRegion({
        points: points,
        position: [0, 0, 0],
        style: { color: '#9F35FF', outlineColor: "#9F35FF", opacity: 0.3, }
    })
    var dragComponents = [];
    region02.addComponent(THING.EXTEND.DragComponent, 'drag', {
    });
    var drag = region02.drag;
    drag.enable = true;
    dragComponents.push(region02.drag);
});


new THING.widget.Button('创建自定义形状', function () {
    reset();
    app.camera.flyTo({
        'position': [16.97195910659162, 17.497451919064215, 25.683221946146112],
        'target': [3.780320881388722, -0.24198804170325114, -3.8694427798779767],
        'time': 1000,
        'complete': function () {
            const points = [[10, 0.1, -10], [8, 0.1, -1], [0, 0.1, 7], [-5, 0.1, -5]];
            initThingJsTip("自定义形状创建完成");
            region03 = new THING.PlaneRegion({
                points: points,
                position: [0, 0, 0],
                style: { color: 'rgb(227,82,27)', outlineColor: "rgb(227,82,27)", opacity: 0.5, }
            })
        }
    });
});

new THING.widget.Button('创建圆形水面', function () {
    reset();
    var radius = 8;// 圆半径
    var center = [0, 0.1, 0]; // 圆心世界坐标
    // 根据圆形和半径计算坐标点
    var points = [];
    for (var degree = 0, y = 0; degree <= 360; degree += 10) {
        var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
        var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
        var pos = THING.Math.addVector([x, y, z], center);
        points.push(pos);
    }
    water = new THING.Water({
        points: points,
        flowSpeed: [1, 1],
        waterColor: '#60FFFF', // 颜色
        waterScale: 4 // 波纹系数
    });
    initThingJsTip("圆形水面创建完成");
});

new THING.widget.Button('创建热力图', function () {
    reset();
    var param = {
        localPosition: [5.5, 18, -23],
        type: "mosaic", //  "heatmap" or "mosaic" or "3Dheatmap"
        width: 48, // 宽度 单位米
        height: 19, // 长度 单位米
        minValue: 20,
        maxValue: 27,
        radius: 4, // 单个点的热力影响半径
        alpha: false, // 未插值区域是否透明（默认为 false ）
        blur: 0.8, 
        alpha: false, 
        mapSize: 1, 
        gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' } // (Optional) Color gradient, the color value can be set to a color value that can be recognized by css
    };

    /*
    * @class Heatmap
    * 热力图
    * @memberof THING
    * @extends THING.BaseObject
    * @example */
    // creat heatmap
    heatMap = new THING.EXTEND.HeatmapLayer(param);

    heatMap.setData([
        [-20, 0, THING.Math.randomFloat(24.0, 28.0)],
        [-20, 10, THING.Math.randomFloat(24.0, 28.0)],
        [-20, -5, THING.Math.randomFloat(24.0, 28.0)],
        [20, 5, THING.Math.randomFloat(24.0, 28.0)],
        [0, 0, THING.Math.randomFloat(24.0, 28.0)],
        [0, 10, THING.Math.randomFloat(24.0, 28.0)],
        [10, 10, THING.Math.randomFloat(24.0, 28.0)],
        [10. - 5, THING.Math.randomFloat(24.0, 28.0)],
        [3, -4, THING.Math.randomFloat(24.0, 28.0)],
        [6, -10, THING.Math.randomFloat(24.0, 28.0)],
        [4, 0, THING.Math.randomFloat(24.0, 28.0)],
        [8, 2, THING.Math.randomFloat(24.0, 28.0)],
        [16, 4, THING.Math.randomFloat(24.0, 28.0)],
        [31, 6, THING.Math.randomFloat(24.0, 28.0)]
    ]);
});

new THING.widget.Button('图片+canvas平面', function () {
    reset();
    // 摄像机飞行到某位置
    var car01 = app.query('car01')[0];
    app.camera.flyTo({
        'position': [23.749655426492204, 5.0102315440539815, 17.39584652593136],
        'target': [19.467431425145197, 2.029607812363532, 5.083938918992484],
        'time': 1000,
        'complete': function () {
            imageMarker = app.query('imageMarker3')[0];
            if (imageMarker) return;
            var imgUrl = 'https://www.thingjs.com/static/images/monitorPanel3.png';
            var imgWidth = 512;
            var imgHeight = 329;
            var img = new Image(imgWidth, imgHeight);
            img.crossOrigin = "Anonymous";
            img.src = imgUrl;
            img.onload = function () {
                var canvas = createCanvas({ image: img, text: 10, imgWidth, imgHeight });  //-----------------------问题 加载图片时生效，重绘时有找不到回调函数会报错
                var newImg = new Image(canvas.width, canvas.height);
                newImg.src = canvas.toDataURL("image/png");
                var image = new THING.ImageTexture({ resource: newImg })
                imageMarker3 = new THING.Marker({
                    name: "imageMarker3",
                    parent: car01,
                    localPosition: [0, 4, 0],
                    scale: [2, 2, 2],
                    width: imgWidth * 0.006,
                    height: imgHeight * 0.006,
                    style: {
                        image
                    }
                })
                imageMarker3.renderType = THING.RenderType.Plane    // 以面形式渲染
                // 存储原始图片 用于重绘
                imageMarker3['origialImg'] = img;
                // 存储 canvas 用于重绘
                imageMarker3['myCanvas'] = canvas;
            };
            initThingJsTip("图片+canvas创建完成");
        }
    })
})

new THING.widget.Button('重置', function () {
    reset1();
});

function reset() {
    if (region01 != null) {
        region01.destroy();
        region01 = null
    }
    if (region02 != null) {
        region02.destroy();
        region02 = null
    }
    if (region03 != null) {
        region03.destroy();
        region03 = null
    }
    if (water != null) {
        water.destroy();
    }
    if (heatMap != null) {
        heatMap.destroy();
        heatMap = null;
    }
    app.query('.Marker').destroy();
}

function reset1() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.597999999999985, 61.72399999999999],
        'target': [1.646, 7.811, 4.445],
        'time': 1000,
        'complete': function () {
            reset();
        }
    });
    initThingJsTip("创建平面类对象，点击左侧按钮进行体验");
}

function createCanvas(param) {
    var canvas = param.canvas;
    var image = param.image;
    var text = param.text;

    if (!param.canvas) {
        canvas = document.createElement("canvas");
        canvas.width = param.imgWidth;
        canvas.height = param.imgHeight;
    }
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "80px sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText('温度：', 50, canvas.height / 2);
    ctx.fillText(text, 270, canvas.height / 2);
    ctx.fillText('℃', 380, canvas.height / 2);

    return canvas;
}

function registerEvent() {
    // 注册鼠标划入区域事件
    app.on('mouseenter', '.PolygonRegion', function (ev) {
        $(document.body).css('cursor', 'grab');
        // 关闭默认的旋转操作
        // app.camera.enableRotate = false;
        if (ev.object.id == 'polygonRegion01') {
            app.on('mousemove', function (event) {
                // 获取当前鼠标的世界坐标
                var mousePos = getMousePos(event.x, event.y);
                var distance = THING.Math.getDistance(center, mousePos);
                if (distance >= radius - 1) {
                    $(document.body).css('cursor', 'w-resize');
                    stretchState = true;
                } else {
                    $(document.body).css('cursor', 'grab');
                    stretchState = false;
                }
            }, '监听鼠标位置事件');
        }
        // 注册鼠标划入区域后鼠标键按下事件
        app.on('mousedown', function (ev) {
            if (ev.button == 0) {
                app.pauseEvent('mousemove', null, '监听鼠标位置事件');
                app.pauseEvent('mouseenter', '.PolygonRegion', '鼠标划入区域事件');
                if (stretchState == true) {
                    $(document.body).css('cursor', 'w-resize');
                    app.on('mousemove', function (event) {
                        // 获取当前鼠标的世界坐标
                        var mousePos = getMousePos(event.x, event.y);
                        // 定义半径
                        radius = THING.Math.getDistance(center, mousePos);
                        // 创建圆形区域
                        createCircle();
                    }, '圆形区域拉伸事件');
                } else {
                    $(document.body).css('cursor', 'grabbing');
                }
            }
        }, '鼠标划入区域后鼠标键按下事件');

        // 注册鼠标划入区域后鼠标键抬起事件
        app.on('mouseup', function (ev) {
            if (ev.button == 0) {
                app.resumeEvent('mousemove', null, '监听鼠标位置事件');
                app.resumeEvent('mouseenter', '.PolygonRegion', '鼠标划入区域事件');
                if (stretchState == true) {
                    app.off('mousemove', null, '圆形区域拉伸事件');
                    $(document.body).css('cursor', 'default');
                } else {
                    $(document.body).css('cursor', 'grab');
                }
            }
        }, '鼠标划入区域后鼠标键抬起事件');
    }, '鼠标划入区域事件');

    // 注册鼠标划出区域事件
    app.on('mouseleave', '.PolygonRegion', function () {
        // 注销鼠标划入区域后鼠标键按下事件
        app.off('mousedown', null, '鼠标划入区域后鼠标键按下事件');
        // 注销鼠标划入区域后鼠标键抬起事件
        app.off('mouseup', null, '鼠标划入区域后鼠标键抬起事件');
        app.off('mousemove', null, '监听鼠标位置事件');
        $(document.body).css('cursor', 'default');
        // 开启默认的旋转操作
        //app.camera.enableRotate = true;
    }, '鼠标划出区域事件');
    // 注册拖拽结束事件
    app.on('dragend', '.PolygonRegion', function (ev) {
        if (ev.object.id == 'polygonRegion01') {
            center = region01.position;
        }
    }, '拖拽结束事件')
}