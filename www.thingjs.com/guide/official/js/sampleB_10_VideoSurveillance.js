/**
 * @version 2.0
 * @author ThingJS
 * 说明：通过按钮 实现 视频 监控视频 的播放
 * 操作：点击按钮 播放视频 加载监控视频
 * 备注：
 *     1. 本例程的监控摄像头视频是利用官方视频流服务器ThingJS LiveServer转码实现的。
 *     2. ThingJS LiveServer提供了GB28181视频流转H5视频流功能，支持海康、大华 
 *        等各类厂家的GB28181标准监控摄像头的接入。
 * 难度：★★☆☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

const baseURL = "https://static.3dmomoda.com/skybox/708c1c85cf0f5c4531a6d0ab/";
const image = new THING.CubeTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);

app.envMap = image;
app.background = image;
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    initThingJsTip("平台支持mp4视频以及监控摄像头视频展示，监控摄像头视频可利用官方视频流服务器转码实现，点击左侧按钮查看视频效果，按钮再次点击后即可关闭弹窗");

    // 视频url地址
    var videoUrl = [
        'https://rtsp.cam.thingjs.com:9000/index.html?id=1',
        'https://3dmomoda-static.oss-cn-beijing.aliyuncs.com/client/智慧楼宇3D可视化管理系统-优锘科技-ThingJS物联网开发案例.mp4'
    ]
    var panel = null;
    var panel2 = null;
    // 打开mp4视频
    new THING.widget.Button('打开mp4视频', function () {

        if (panel) {
            panel.destroy();
            panel = null;
        } else {
            // 将视频页面作2D界面元素 通过快捷界面库 panel 的iframe组件进行添加
            panel = new THING.widget.Panel({
                titleText: "视频",
                dragable: true,
                hasTitle: true,
                width: "500px",
                closeIcon: true
            });
            var iframe = panel.addIframe({ url: videoUrl[1] }, 'url').caption("").setHeight('279px');
            panel.position = [80, 150];
            // 关闭 panel 时，移除嵌入视频的 iframe 页面
            panel.on("close", function () {
                // panel.remove(iframe);
                panel.destroy();
                panel = null;
            });
        }
    });
    // 将视频嵌入到3D场景中
    new THING.widget.Button('打开实时监控', function () {
        if (panel2) {
            panel2.destroy();
            panel2 = null;
        } else {
            // 将视频页面作2D界面元素 通过快捷界面库 panel 的iframe组件进行添加
            panel2 = new THING.widget.Panel({
                titleText: "视频",
                dragable: true,
                hasTitle: true,
                width: "500px",
                closeIcon: true
            });
            var iframe = panel2.addIframe({ url: videoUrl[0] }, 'url').caption("").setHeight('279px');
            panel2.position = [250, 150];
            // 关闭 panel 时，移除嵌入视频的 iframe 页面
            panel2.on("close", function () {
                // panel.remove(iframe);
                panel2.destroy();
                panel2 = null;
            });
        }
    });
})