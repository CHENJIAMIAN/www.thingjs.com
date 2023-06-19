/**
* @version 2.0
* @author ThingJS
* 说明：动态创建线
* 备注：设置UV曲线时：
*      1.在CampusBuilder中，选择功能->曲线,添加一条曲线
*      2.选择一张图片，刷到曲线中。
*      3.点击曲线属性，选择流动动画开启
*      4.使用scrollUV属性开启UV动画, scrollSpeed控制速度，正负为正反方向
* 难度：★☆☆☆☆
*/

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 创建天空盒
var cubeTexture = new THING.CubeTexture([
    'https://www.thingjs.com/static/skyboxes/BlueSky/posx.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negx.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posy.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negy.jpg',
    'https://www.thingjs.com/static/skyboxes/BlueSky/posz.jpg', 'https://www.thingjs.com/static/skyboxes/BlueSky/negz.jpg'
]);
app.background = cubeTexture; // 设置背景资源贴图资源
app.envMap = cubeTexture; // 设置环境图样式

// 加载场景包
var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/line');
// 创建提示
bundle.waitForComplete().then(() => {
    const campus = bundle.campuses[0];
    if (campus) {
        app.levelManager.change(campus);
    }
});

var line = null;
var line1 = null;
var line2;
new THING.widget.Button('创建线', createLine);
new THING.widget.Button('创建管线', function () {
    reset();
    var things = app.query('.Building')[0];
    things.showAllRoofs(false);
    initThingJsTip("创建动态管线");//[10.298, 3, -6.635],[-8.702, 3, -6.635],  [-8.702, 3, 3.365], [-5.702, 3, 3.365], [-5.702, 3, 1.3650000000000002]
    app.query('.Building').style.opacity = 0.4;
    var pos = [[10.298, 4, -6.635], [-8.702, 4, -6.635], [-8.702, 4, 3.365], [-5.702, 4, 3.365], [-5.702, 4, 1.365]];
    // 创建管线
    line1 = new THING.PolygonLine({
        type: 'PolygonLine',
        points: pos,
        radius: 0.15,
        style: {
            image: new THING.ImageTexture('https://www.thingjs.com/static/images/poly_line_01.png'),
            // 管线中的纹理资源
        }

    });
    line1.on('update', function (ev) {
        line1.style.uv.offset[0] = line1.style.uv.offset[0] - ev.deltaTime
    }, 'tagb')
    line1.addComponent(new THING.EXTEND.LineGrowthComponent(), 'lineGrowth');
    line1.getComponentByName('lineGrowth').play({
        time: 8000,
    });
});

new THING.widget.Button('UV曲线', function () {
    reset();
    var a = app.query('.RouteLine')[0];
    initThingJsTip("开启UV动画（UV曲线在 CampusBuilder 功能->曲线->曲线中创建，创建后选择一张图片设置曲线贴图）");
    line2 = app.query('.RouteLine')[0];
    line2.on('update', function (ev) {
        line2.style.uv.offset[1] = line2.style.uv.offset[1] - ev.deltaTime
    }, 'taga')
});

new THING.widget.Button('重置', reset);

/**
 * 创建轨迹线
 */
function createLine() {
    reset();
    initThingJsTip("创建动态轨迹线");

    var things = app.query('.Building')[0];
    things.showAllRoofs(false);
    // 创建一个路径
    var points = [];
    var z = 9.684;
    var x = -4.318;
    var y = 0.1;
    var flag = true;
    timer = setInterval(function () {
        points.push([x, y, z]);
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
        // 创建轨迹线
        line = new THING.PixelLine({
            points: points,
            style: { color: [0, 0, 1] }
        })
    }, 100);
}

/**
 * 重置
 */
function reset() {
    var things = app.query('.Building')[0];
    things.showAllRoofs(true);
    initThingJsTip("点击按钮，创建轨迹线、管线、UV 曲线");
    if (line) {
        clearInterval(timer);
        var lines = app.query(".PixelLine");
        lines.forEach(line => {
            line.destroy();
            //line = null;
        })
        line = null;
    }
    if (line1) {
        line1.off('update', 'tagb');
        var lines = app.query(".PolygonLine");
        lines.forEach(line => {
            line.destroy();
            //line = null;
        })
    }
    app.query('.Building').style.opacity = 1;
    if (line2) {
        line2.off('update', 'taga');
    }
}