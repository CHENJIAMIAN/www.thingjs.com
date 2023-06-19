/**
 * 说明：内嵌页面（ WebView ）
 * 操作：点击按钮，查看效果
 * 难度：★★☆☆☆
 */
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    background: '#000000',
    env: 'Seaside',
});

var webView01 = null;
var webView02 = null;
var webView03 = null;

// 加载场景后执行
app.on('load', function () {

    initThingJsTip("使用 WebView 物体，可以将其他网站或者页面的内容嵌到 3D 中，点击按钮，查看效果");

    createWebView();

    new THING.widget.Button('更新位置', function () {
        webView02.moveTo({
            position: [-5, 0.5, -5],
            time: 1000,
            orientToPath: false, // 朝向目标方向
        });
    })

    new THING.widget.Button('更改src', function () {
        if (!webView01) return;
        webView01.url = 'https://support.thingjs.com/';
    })

    new THING.widget.Button('移除WebView', function () {
        if (webView01) {
            webView01.destroy();
            webView01 = null;
        }
    })

    new THING.widget.Button('移除所有', function () {
        app.query('.WebView').destroy();
        webView01 = null;
        webView02 = null;
        webView03 = null;
    })

    new THING.widget.Button('重置', function () {
        createWebView();
        webView02.position = [0, 0.5, 5];
        webView01.url = 'https://study.thingjs.com/';
    })
});

/**
 * 创建内嵌页面
 */
function createWebView() {
    if (webView01 == null) {
        webView01 = app.create({
            type: 'WebView',
            url: 'https://study.thingjs.com/',
            position: [9, 23, -14],
            width: 1920 * 0.01, // 3D 中实际宽度 单位 米
            height: 1080 * 0.01, // 3D 中实际高度 单位 米
            domWidth: 1920, // 页面宽度 单位 px
            domHeight: 1080 // 页面高度 单位 px
        });
    }
    if (webView02 == null) {
        webView02 = app.create({
            type: 'WebView',
            url: 'https://www.thingjs.com',
            position: [0, 0.5, 5],
            width: 1920 * 0.01, // 3D 中实际宽度 单位 米
            height: 1080 * 0.01, // 3D 中实际高度 单位 米
            domWidth: 1920, // 页面高度 单位 px
            domHeight: 1080 // 页面高度 单位 px
        });
        webView02.rotateX(-90);
        webView02.pickable = false; // 设置页面不可拾取交互
    }
    if (webView03 == null) {
        // 以小车为父物体创建 WebView
        var car01 = app.query('car01')[0];
        webView03 = app.create({
            type: 'WebView',
            url: 'https://www.thingjs.com/static/pages/page02/index.html?name=' + car01.name,
            parent: car01, // 父物体
            localPosition: [0, 4.5, -1], // 父物体坐标系下相对坐标位置
            width: 462 * 0.008, // 3D 中实际宽度 单位 米
            height: 296 * 0.008, // 3D 中实际高度 单位 米
            domWidth: 462, // 页面宽度 单位 px
            domHeight: 296 // 页面高度 单位 px
        });
        webView03.rotateX(-30);
        webView03.pickable = false; // 设置页面不可拾取交互
    }
}