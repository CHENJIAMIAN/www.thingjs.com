/**
 * 说明：标记，物体顶图标，可以传入canvas写文字
 * 操作：点击标记100 改变值
 * 文档：ThingJS教程——>界面——>3D界面
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

// 计时器
var timer;
app.on('load', function (ev) {
    initThingJsTip("平台提供了文本类和Marker类型的标注，点击左侧按钮查看标注效果");
    var car = app.query('car01')[0];
    var planePlane;
    car.on('click', function (ev) {
        if(planePlane){
            updateImage(planePlane);
        }
    });
    new THING.widget.Button('创建图片标注', function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [30.56467325522445, 14.496776597864274, 22.296798882885025],
            'target': [15.915606278219057, -0.33131700731180225, -2.118596914708344],
            'time': 1000,
            'complete': function () {
                var marker1 = app.create({
                    type: "Marker",
                    url: "https://www.thingjs.com/static/images/warning1.png",
                    parent: app.query('car01')[0],
                    localPosition: [0, 2, 0],
                    size: 4
                }).on('click', function () {
                    marker1.url = "https://www.thingjs.com/static/images/warning.png"

                });
                initThingJsTip("图片标注创建完成，点击图片标注可切换标注图片");
            }
        });
    });

    new THING.widget.Button('创建canvas标注', function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [34.53187883059296, 12.218156869514887, 23.521957411710165],
            'target': [19.43912871552986, -3.0590421368778564, -1.6329188894129507],
            'time': 1000,
            'complete': function () {
                // 通过Canvas绘制“图片”
                var marker2 = app.create({
                    type: "Marker",
                    parent: app.query('car02')[0],
                    localPosition: [0, 2, 0],
                    size: 3,
                    canvas: createTextCanvas('100'),
                }).on('click', function (ev) {
                    var txt = Math.floor(Math.random() * 100);
                    ev.object.canvas = createTextCanvas(txt, ev.object.canvas)
                });
                initThingJsTip("canvas标注创建完成，点击canvas标注可切换标注内容");
            }
        });
    })
    new THING.widget.Button('创建文本标注', function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [17.501824618886488, 20.996325335828924, 20.714582567020486],
            'target': [6.958538485470589, 13.568464019603335, -14.33920092314307],
            'time': 1000,
            'complete': function () {
                // 以建筑为父物体创建3D文本
                var building = app.query('107')[0];
                var textRegion03 = app.create({
                    type: 'TextRegion',
                    parent: building,
                    localPosition: [5, 20, 5],
                    text: '生产厂房',
                    style: {
                        fontColor: '#ff0000', // 文本颜色 支持16进制颜色 和 rgb颜色
                        fontSize: 32, // 文本字号大小
                    }
                });
                // 绕文本自身X轴旋转
                // textRegion03.rotateX(-90);
                initThingJsTip("文本标注创建完成");
            }
        });
    })

    new THING.widget.Button('创建图片+canvas', function () {
        reset();
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [23.749655426492204, 5.0102315440539815, 17.39584652593136],
            'target': [19.467431425145197, 2.029607812363532, 5.083938918992484],
            'time': 1000,
            'complete': function () {
                plane = app.query('#myPlane01')[0];
                if (plane) return;

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

                    planePlane = app.create({
                        type: 'Plane',
                        id: 'myPlane01',
                        width: imgWidth * 0.006,
                        height: imgHeight * 0.006,
                        parent: car,
                        localPosition: [0, 4, 0],
                        style: {
                            image: newImg,
                            opacity: 0.9,
                            color: '#ffffff'
                        }
                    });
                    // 存储原始图片 用于重绘
                    planePlane['origialImg'] = img;
                    // 存储 canvas 用于重绘
                    planePlane['myCanvas'] = canvas;

                };
                initThingJsTip("图片+canvas创建完成，点击小车可刷新面板上的数据");
            }
        })

    })

    new THING.widget.Button('重置', function () {
        flyEnd();
        initThingJsTip("平台提供了文本类和Marker类型的标注，点击左侧按钮查看标注效果");
    })
})

function reset() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    // 根据TextRegion类查询得到所有文本 并删除
    app.query('.TextRegion').destroyAll();
    app.query('.Marker').destroyAll();
    app.query('.Plane').destroyAll();
}

/**
 * 设置重置时候的视角
 */
function flyEnd() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.597999999999985, 61.72399999999999],
        'target': [1.646, 7.811, 4.445],
        'time': 1000,
        'complete': function () {
            reset();
        }
    });
}

/**
 * 创建canvas内容
 */
function createTextCanvas(text, canvas) {
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
    }
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(32, 32, 256)";
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 32, 32);
    return canvas;
}

/**
 * 创建canvas内容
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

/**
 * 创建canvas内容
 */
function updateImage(planePlane) {
    if (!timer) {
        timer = setInterval(() => {
            var canvas = createCanvas({ image: planePlane['origialImg'], text: THING.Math.randomInt(0, 38), canvas: planePlane.myCanvas });
            var newImg = new Image(canvas.width, canvas.height);
            newImg.src = canvas.toDataURL("image/png");
            planePlane.style.image = newImg;
        }, 1000)
    }
}