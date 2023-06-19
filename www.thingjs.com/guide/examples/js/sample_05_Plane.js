/**
 * 说明：创建平面类对象
 * 备注：
 *     1. 点击按钮，创建区域面，按下鼠标左键，拖动鼠标，即可创建圆形区域。
 *     2. 鼠标悬停在区域面上，当鼠标状态发生改变时，可拖拽或拉伸区域面。
 *     3. 点击按钮创建水面。
 * 难度：★★★☆☆
 */
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',  // 场景地址
});

var region01 = null;  // 圆形区域
var region02 = null;  // 方形区域
var region03 = null;  // 多边形区域
var center = null;  // 圆形区域中心
var radius = null;  // 圆形区域半径
var stretchState = false;  // 可拉伸状态

// 场景加载完成事件
app.on('load', function () {
    initThingJsTip("创建平面类对象，点击左侧按钮进行体验");
    // // 设置摄像机的俯仰视角范围
    // app.camera.xAngleLimitRange = [0, 90];

    new THING.widget.Button('拖拽创建圆形区域', function () {
        reset();

        initThingJsTip("按下鼠标左键，拖动鼠标，即可创建圆形区域");
        if (region01 != null) return;

        app.camera.enableRotate = false;  // 关闭默认的旋转操作

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
                app.camera.enableRotate = true;  // 打开默认的旋转操作
                if (region01 != null) {
                    region01.draggable = true;  // 开启拖拽
                }

            }
        }, '圆形区域创建完成鼠标键抬起');
    })

    new THING.widget.Button('创建方形区域', function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [18.300843890069757, 19.78590968577275, 30.49813314612654],
            'target': [2.6002728973213447, -1.8819604471439006, -0.4500030037375401],
            'time': 1000,
            'complete': function () {
                // 构成多边形的点（取世界坐标系下的坐标）
                var points = [[0, 0, 0], [10, 0, 0], [10, 0, 10], [0, 0, 10]];
                if (region02 != null) return;
                // 创建方形区域
                region02 = app.create({
                    type: 'PolygonRegion',
                    id: 'polygonRegion02',
                    name: 'plane02',
                    points: points,  // 传入世界坐标系下点坐标
                    style: {
                        regionColor: '#9F35FF',  // 区域颜色
                        lineColor: '#9F35FF',  // 边框颜色
                        regionOpacity: 0.3  // 不透明度 (默认是 0.5 半透明)
                    },
                    complete: function () {
                        initThingJsTip("方形区域创建完成");
                    }
                })
                region02.draggable = true;  // 开启拖拽
            }
        });
    })

    new THING.widget.Button('创建自定义形状', function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [16.97195910659162, 17.497451919064215, 25.683221946146112],
            'target': [3.780320881388722, -0.24198804170325114, -3.8694427798779767],
            'time': 1000,
            'complete': function () {
                // 构成多边形的点（取世界坐标系下的坐标）
                var points = [[10, 0, -10], [8, 0, -1], [0, 0, 7], [-5, 0, -5]];
                if (region03 != null) return;
                // 创建多边形区域
                region03 = app.create({
                    type: 'PolygonRegion',
                    id: 'polygonRegion03',
                    name: 'plane03',
                    points: points,  // 传入世界坐标系下点坐标
                    style: {
                        regionColor: 'rgb(227,82,27)',  // 区域颜色
                        lineColor: 'rgb(227,82,27)',  // 边框颜色
                        regionOpacity: 0.5  // 不透明度 (默认是 0.5 半透明)
                    },
                    complete: function () {
                        initThingJsTip("自定义形状创建完成");
                    }
                })
                region03.draggable = true;  // 开启拖拽
            }
        });
    })

    new THING.widget.Button('创建圆形水面', function () {
        reset();
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [24.836428542576513, 8.32237489092122, 19.25231543612012],
            'target': [19.532402752587526, 1.1897924591116247, 7.369932581634628],
            'time': 1000,
            'complete': function () {
                if (app.query('#water02')[0]) return;

                var radius = 8;// 圆半径
                var car = app.query('car01')[0].position;
                var center = [car[0], car[1] + 0.05, car[2]]; // 圆心世界坐标
                // 根据圆形和半径计算坐标点
                var points = [];
                for (var degree = 0, y = 0; degree <= 360; degree += 10) {
                    var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
                    var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
                    var pos = THING.Math.addVector([x, y, z], center);
                    points.push(pos);
                }

                // 创建水面
                var water = app.create({
                    type: 'Water',
                    id: 'water02',
                    name: 'plane04',
                    points: points, // 点坐标
                    style: {
                        waterColor: '#60FFFF', // 颜色
                        waterScale: 4, // 波纹系数
                        flowXDirection: 1, // 水平流速
                        flowYDirection: 2, // 垂直流速
                    },
                    complete: function () {
                        initThingJsTip("圆形水面创建完成");
                    }
                })
            }
        });
    })

    new THING.widget.Button('创建热力图', function () {
        reset();
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [28.26117899056287, 42.61157378109168, 6.906080630138749],
            'target': [10.835308853683246, 18.396166919277572, -16.862868558512464],
            'time': 1000,
            'complete': function () {
                // 创建热图（马赛克效果）
                var heatMap02 = app.create({
                    parent: app.query('107')[0],
                    localPosition: [6.5, 18, -4],
                    type: "Heatmap",
                    name: 'plane05',
                    width: 50, // 宽度 单位米
                    height: 19, // 长度 单位米
                    minValue: 20,
                    maxValue: 27,
                    radius: 4, // 单个点的热力影响半径
                    alpha: false, // 未插值区域是否透明（默认为 false ）
                    mosaic: true, // 是否使用马赛克效果
                    mosaicSize: 2, // 马赛克 大小
                    complete: function () {
                        initThingJsTip("热力图创建完成");
                    }
                });
                heatMap02.rotateX(90);

                // 更新热图数值
                setInterval(function () {
                    // 数据格式为
                    // [x坐标,y坐标,热力值]
                    // 坐标系以热力图平面中心为原点
                    var data = [
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
                    ];
                    heatMap02.setData(data);
                }, 1000);
            }
        });
    })

    new THING.widget.Button('图片+canvas平面', function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [22.335653894309278, 5.155895069440069, 15.148935195397332],
            'target': [19.3477382155826, 1.1894365589949085, 7.083212489415142],
            'time': 1000,
            'complete': function () {
                var plane = app.query('#myPlane01')[0];
                if (plane) return;

                var car = app.query('car01')[0];

                var imgUrl = 'https://www.thingjs.com/static/images/monitorPanel3.png';
                var imgWidth = 512;
                var imgHeight = 329;
                var img = new Image(imgWidth, imgHeight);
                img.crossOrigin = "Anonymous";
                img.src = imgUrl;
                img.onload = function () {
                    var canvas = createCanvas({ image: img, text: 10, imgWidth, imgHeight });
                    var newImg = new Image(canvas.width, canvas.height);
                    newImg.src = canvas.toDataURL("image/png");

                    var plane = app.create({
                        type: 'Plane',
                        id: 'myPlane01',
                        name: 'myplane01',
                        width: imgWidth * 0.004,
                        height: imgHeight * 0.004,
                        parent: car,
                        localPosition: [0, 4, 0],
                        style: {
                            image: newImg,
                            opacity: 0.9,
                            color: '#ffffff'
                        },
                        complete: function () {
                            initThingJsTip("图片+canvas面板绘制完成");
                        }
                    });
                    // 存储原始图片 用于重绘
                    plane['origialImg'] = img;
                    // 存储 canvas 用于重绘
                    plane['myCanvas'] = canvas;
                };
            }
        });



    })

    new THING.widget.Button('重置', function () {
        reset1();
    })

    registerEvent();  // 注册事件
})

/**
 * 注册事件
 */
function registerEvent() {
    // 注册鼠标划入区域事件
    app.on('mouseenter', '.PolygonRegion', function (ev) {
        $(document.body).css('cursor', 'grab');
        // 关闭默认的旋转操作
        app.camera.enableRotate = false;
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
        app.camera.enableRotate = true;
    }, '鼠标划出区域事件');

    // 注册拖拽结束事件
    app.on('dragend', '.PolygonRegion', function (ev) {
        if (ev.object.id == 'polygonRegion01') {
            center = region01.position;
        }
    }, '拖拽结束事件')
}

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
    region01 = app.create({
        type: 'PolygonRegion',
        id: 'polygonRegion01',
        name: 'plane01',
        points: points,  // 点坐标
        style: {
            regionColor: 'rgb(39,168,158)',  // 区域颜色
        },
    })
    region01.style.alwaysOnTop = false;  // 设置区域始终在最前端渲染显示
    initThingJsTip("此圆形可用鼠标拖拽和改变大小");
}

/**
 * 获取鼠标位置转换后的世界坐标
 * @param {Number} screenX - 鼠标屏幕横坐标
 * @param {Number} screenY - 鼠标屏幕纵坐标
 */
function getMousePos(screenX, screenY) {
    var mousePos = app.camera.screenToWorld(screenX, screenY);
    if (region01) {
        mousePos[1] = region01.position[1];
    } else {
        mousePos[1] = 1;
    }
    return mousePos;
}

/**
 * 重置
 */
function reset() {
    var plane = app.query(/plane/);
    if (plane.length > 0) {
        plane.destroyAll();
        region01 = null;
        region02 = null;
        region03 = null;
    }
    center = null;
    radius = null;
    app.off('mouseup', null, '圆形区域创建完成鼠标键抬起');
    app.off('mousedown', null, '鼠标键按下事件');
    app.off('mousemove', null, '鼠标移动事件');
    app.camera.enableRotate = true;
    $(document.body).css('cursor', 'default');
    app.query('.Water').destroyAll();
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
/**
 * 绘制canvas面板
 */
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