/**
 * @version 2.0
 * @author ThingJS
 * 说明：引用 js、css 资源
 * 	    默认js脚本和css样式会带上时间戳，且按urls数组中的顺序加载平台资源上传可点击查看
 *      链接 https://developer.thingjs.com/forum.php?mod=viewthread&tid=455
 *      示例中twitter-bootstrap, moment均为外部资源，因网络原因拷贝到了thingjs网站目录
 * 难度：★★☆☆☆
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

THING.Utils.loadFile([
    '/static/vendor/twitter-bootstrap/3.3.7/css/bootstrap.min.css',
    '/static/vendor/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
    '/static/vendor/moment/moment.js'], {
        load: function () {
            var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
            bundle.waitForComplete().then(() => {
                console.log(bundle.name);
               var btn = createButton();
                //  页面元素点击事件
                btn.on('click', function () {
                    // 使用 moment 库获取当前时间
                    var now = moment().format('YYYY-MM-DD HH:mm:ss');
                    console.log(now);
                })
            })
        }
    })
    
// 创建页面元素并添加到div2d中
function createButton() {
    // 使用 bootstrap 样式
    var template =
        `<button class="btn btn-default" type="button" style="position:absolute;left:20px;top:20px;z-index:2">当前时间</button>`;
    var btn = $('#div2d').append($(template));
    return btn;
}