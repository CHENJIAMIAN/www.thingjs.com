/**
 * @version 2.0
 * @author ThingJS
 * 说明：分享
 * 难度：★☆☆☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

const baseURL = "https://www.thingjs.com/static/skyboxes/Seaside/";
const image = new THING.CubeTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);

// 设置环境图和背景图
app.envMap = image;
app.background = '#000000';
THING.Utils.loadFile(['/static/ScenePreview/share/offShare.js'], {
    load: function () {
        // 加载场景代码 
        var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');

        // 加载场景后执行
        bundle.waitForComplete().then(() => {
            // 创建按钮
            new THING.widget.Button('分享', share);
        })

        // 分享
        function share() {
            // 分享功能用到的参数
            let params = {
                img: '',  // 分享缩略图的url，需要浏览器能访问到
                desc: 'ThingJS 演示',  // 评论
                summary: 'ThingJS 演示'  // 描述
            }
            // 初始化
            offShare.init(params);
            // 显示面板，调用前请先初始化
            // offShare.show();
            // 关闭面板，调用前请先初始化
            // offShare.close();

        }
    }
});

// 创建提示
initThingJsTip("本例程展示了分享控件，添加控件后可以点击微信，微博，qq，复制链接或者复制iframe方式进行分享，点击左侧按钮进行体验");