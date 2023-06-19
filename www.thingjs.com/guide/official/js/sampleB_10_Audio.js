/**
 * @version 2.0
 * @author ThingJS
 * 说明：播放音频文件
 *      利用 HTML5 原生的 Audio 接口，播放音频文件
 *      关于 Audio 更多接口内容 请参看 http://www.w3school.com.cn/jsref/dom_obj_audio.asp
 *
 * 操作：点击按钮 开始/暂停 播放
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var audioUrl = 'https://www.thingjs.com/static/media/SuperMarioBros.mp3';
var audio;

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
// 加载场景
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    initThingJsTip("平台支持利用 HTML5 原生的 Audio 接口，播放音频文件，点击左侧按钮体验效果");

    THING.widget.Button('播放音频', function () {
        if (!audio) {
            audio = new Audio(audioUrl);
        }
        audio.play();
    })

    THING.widget.Button('暂停音频', function () {
        if (audio) {
            audio.pause();
        }
    })
})