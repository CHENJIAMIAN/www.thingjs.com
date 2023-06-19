/**
 * @version 2.0
 * @author ThingJS
 */
window.THING = THING;
const app = new THING.App();
window.app = app;
var image = new THING.ImageTexture([
        "/guide/official/images/cloudsky/posx.jpg",
        "/guide/official/images/cloudsky/negx.jpg",
        "/guide/official/images/cloudsky/posy.jpg",
        "/guide/official/images/cloudsky/negy.jpg",
        "/guide/official/images/cloudsky/posz.jpg",
        "/guide/official/images/cloudsky/negz.jpg",
]);

app.background = image;
app.envMap = image;

// 加载场景包
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-ZGC', { ignoreTheme: true, });
bundle.waitForComplete().then(() => {
        console.log(bundle.name);
        const campus = bundle.campuses[0];
});


const box = new THING.Box();

// 加载插件包应用到box上
const PluginBundle = app.loadBundle([
        '/guide/official/plugins/my-path-go-plugin',
], { object: box });

// 调用插件中的方法
PluginBundle.waitForComplete().then(() => {
        PluginBundle.plugin.printPosition();
});