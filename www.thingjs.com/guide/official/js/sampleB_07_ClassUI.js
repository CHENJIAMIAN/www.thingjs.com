/**
 * @version 2.0
 * @author ThingJS
 * 说明：标记，物体顶图标，可以传入canvas写文字
 * 操作：点击标记100 改变值
 * 难度：★★☆☆☆
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 加载场景并切换层级
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example");
bundle.waitForComplete().then(() => {
    const campus = bundle.campuses[0];
    if (campus) {
        app.levelManager.change(campus);
        initConfig();
    }
});

// 计时器
var timer;
function initConfig() {
    initThingJsTip("平台提供了文本类和Marker类型的标注，点击左侧按钮查看标注效果");
    let car01 = app.query('car01')[0];
    let car02 = app.query('car02')[0];
    let building107 = app.query('107')[0];
    let imageMarker3;
    car01.on('click', function (ev) {
        if (imageMarker3) {
            updateImage(imageMarker3);
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
                var imageMarker1 = new THING.Marker({
                    name: 'imageMarker1',
                    parent: car01,
                    localPosition: [0, car01.boundingBox.size[1], 0],
                    pivot: [0.5, 0],
                    scale: [2, 2, 2],
                    style: { image: new THING.ImageTexture("https://www.thingjs.com/static/images/warning1.png") }
                }).on('click', function (ev) {
                    ev.object.style.image = new THING.ImageTexture("https://www.thingjs.com/static/images/warning.png");
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
                var image = new THING.ImageTexture({ resource: createTextCanvas('100') })
                var imageMarker2 = new THING.Marker({
                    name: "imageMarker2",
                    parent: car02,
                    localPosition: [0, 5, 0],
                    scale: [2, 2, 2],
                    style: {
                        image: image
                    }
                }).on('click', function (ev) {
                    var txt = THING.Math.randomInt(1, 99);
                    ev.object.style.image = new THING.ImageTexture({ resource: createTextCanvas(txt, ev.object.style.image.resource) });
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
                // 以建筑为父物体创建文字标签

                var textLable = new THING.Label({          // 文字标签
                    name: 'textLable',
                    parent: building107,
                    localPosition: [5, 20, 5],
                    fontText: '生产厂房',
                    fontSize: 25,
                    fontColor: '#ff0000',
                });
                textLable.renderType = THING.RenderType.Plane	// 以面形式渲染
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
                imageMarker = app.query('imageMarker3')[0];
                if (imageMarker) return;
                var imgUrl = 'https://www.thingjs.com/static/images/monitorPanel3.png';
                var imgWidth = 512;
                var imgHeight = 329;
                var img = new Image(imgWidth, imgHeight);
                img.crossOrigin = "Anonymous";
                img.src = imgUrl;
                img.onload = function () {
                    var canvas = createCanvas({ image: img, text: 10, imgWidth, imgHeight });
                    imageMarker3 = new THING.Marker({
                        name: "imageMarker3",
                        parent: car01,
                        localPosition: [0, 4, 0],
                        scale: [2, 2, 2],
                        // width: imgWidth * 0.006,
                        // height: imgHeight * 0.006,
                        style: {
                            image: new THING.ImageTexture({ resource: canvas }),
                            opacity: 0.9,
                            color: '#ffffff'
                        }
                    })
                    imageMarker3.renderType = THING.RenderType.Plane	// 以面形式渲染
                    // 存储原始图片 用于重绘
                    imageMarker3['origialImg'] = img;
                    // 存储 canvas 用于重绘
                    imageMarker3['myCanvas'] = canvas;

                };
                initThingJsTip("图片+canvas创建完成，点击小车可刷新面板上的数据");
            }
        })

    })

    new THING.widget.Button('重置', function () {
        flyEnd();
        initThingJsTip("平台提供了文本类和Marker类型的标注，点击左侧按钮查看标注效果");
    })
}

function reset() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    // 查询创建类型并销毁
    app.query('.Label').destroy();
    app.query('.Marker').destroy();
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
 * 创建canvas文本内容
 */
function createTextCanvas(text, canvas) {
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
 * 创建canvas图片加文本内容
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
 * 更新canvas内容
 */
function updateImage(imageMarker3) {
    if (!timer) {
        timer = setInterval(() => {
            var canvas = createCanvas({ image: imageMarker3.origialImg, text: THING.Math.randomInt(0, 38), canvas: imageMarker3.myCanvas });
            imageMarker3.style.image = new THING.ImageTexture({ resource: canvas });
        }, 1000)
    }
}

