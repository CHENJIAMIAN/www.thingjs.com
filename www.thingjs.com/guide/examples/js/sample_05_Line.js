/**
 * 说明：动态创建线
 * 备注：设置UV曲线时：
 *      1.在CampusBuilder中，选择功能->曲线,添加一条曲线
 *      2.选择一张图片，刷到曲线中。
 *      3.点击曲线属性，选择流动动画开启
 *      4.使用scrollUV属性开启UV动画, scrollSpeed控制速度，正负为正反方向
 * 难度：★☆☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/b88ecfb351ea8313b9591bd0',
    'skyBox': 'BlueSky'
});

var line = null;
var line1 = null;
var line2;

app.on('load', function (ev) {
    campus = ev.campus;
    app.level.change(campus);
    var things = app.query('5')[0];
    things.showAllRoofs(false);

    initThingJsTip("点击按钮，创建轨迹线、管线、UV 曲线");
})

new THING.widget.Button('创建线', createLine);

new THING.widget.Button('创建管线', function () {
    reset();
    initThingJsTip("创建动态管线");//[10.298, 3, -6.635],[-8.702, 3, -6.635],  [-8.702, 3, 3.365], [-5.702, 3, 3.365], [-5.702, 3, 1.3650000000000002]
    app.query('.Building').style.opacity = 0.4;
    var pos = [[10.298, 3, -6.635], [-8.702, 3, -6.635], [-8.702, 3, 3.365], [-5.702, 3, 3.365], [-5.702, 3, 1.365]];
    // 创建管线
    line1 = app.create({
        type: 'PolygonLine',
        points: pos,
        width: 0.15,
        style: {
            image: 'https://www.thingjs.com/static/images/poly_line_01.png', // 管线中的纹理资源
        }
    });
    line1.scrollUV = true;
    app.query('.PolygonLine').style.alwaysOnTop = true;
    line1.play(
        {
            time: 8000
        }
    )
})

new THING.widget.Button('UV曲线', function () {
    reset();
    initThingJsTip("开启UV动画（UV曲线在 CampusBuilder 功能->曲线->曲线中创建，创建后选择一张图片设置曲线贴图）");
    line2 = app.query('CurveLine')[0];
    line2.scrollUV = true;
    line2.scrollSpeed = -30;
});

new THING.widget.Button('重置', reset);

/**
 * 创建轨迹线
 */
function createLine() {
    reset();
    initThingJsTip("创建动态轨迹线");
    var things = app.query('5')[0];
    things.showAllRoofs(false);

    var z = 9.684;
    var x = -4.318;
    var y = 0.1;
    var flag = true;

    // 创建轨迹线
    line = app.create({
        type: 'Line',
        // color: 0x00FF00, // 轨迹线颜色
        dotSize: 2, // 轨迹点的大小
        dotColor: 0xFF0000, // 轨迹点的颜色
  
    })
    timer = setInterval(function () {
        line.addPoint([x, y, z]);
        var points = line.points;
        if (points.length < 6) {
            z--;
        } else if (points.length < 16) {
            y += 0.33;
            z -= 0.5;
        } else if (points.length < 20) {
            z--;
        } else {
            x++;
        }
        if (points.length == 30) {
            clearInterval(timer);
        }
    
    }, 100);
}

/**
 * 重置
 */
function reset() {
    initThingJsTip("点击按钮，创建轨迹线、管线、UV 曲线");
    if (line) {
        clearInterval(timer);
        var lines = app.query(".Line");
        lines.forEach(function (item) {
            item.showLines(false);
            item.showPoints(false);
            item = null;
        })
        line = null;
    }
    if (line1) {
        var lines = app.query(".PolygonLine");
        lines.forEach(function (item) {
            item.destroy();
        })
    }
    app.query('.Building').style.opacity = 1;
    if (line2) {
        if (app.query('CurveLine')[0].scrollUV) {
            app.query('CurveLine')[0].scrollUV = false;
        }
    }
}