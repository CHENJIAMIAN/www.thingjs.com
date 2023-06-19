/**
 * @version 2.0
 * @author ThingJS
 * 说明：创建App，url为园区地址（可选）
 *      使用App创建打开的三维空间我们称之为“场景”（scene）。场景包含地球、园区、模型等。
 *      创建App时，传入的url就是园区的地址，不传url则创建一个空的场景。园区可在CampusBuilder
 *      中创建编辑，有两种方法可以将园区添加到线上资源面板，方法如下：
 *          1. 园区保存后，会自动同步到网页同一账号下
 *          2. 园区保存后，导出tjs文件，在园区资源面板上传
 *      上面两种方式生成的园区资源均可在资源面板中双击自动生成脚本
 * 难度：★☆☆☆☆
 */

//version 2.0 创建app，默认绑定到 'div3d' DIV 元素
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
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');

// 创建提示
initThingJsTip(`使用 App 创建的三维空间称之为“场景”。有两种方法可以将客户端保存的园区添加到园区资源面板：<br>
    1. 园区保存后，会自动同步到网页同一账号下;<br>
    2. 园区保存后导出tjs文件，在园区资源面板上传。<br>`);