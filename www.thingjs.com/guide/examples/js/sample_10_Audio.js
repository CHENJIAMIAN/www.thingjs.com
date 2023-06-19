/**
 * 说明：播放音频文件
 *      利用 HTML5 原生的 Audio 接口，播放音频文件
 *      关于 Audio 更多接口内容 请参看 http://www.w3school.com.cn/jsref/dom_obj_audio.asp
 *
 * 操作：点击按钮 开始/暂停 播放
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    skyBox: 'Night',
    env: 'Seaside',
});

var audioUrl = 'https://www.thingjs.com/static/media/SuperMarioBros.mp3';
var audio;

// 注册场景加载完成后事件
app.on('load', function () {
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