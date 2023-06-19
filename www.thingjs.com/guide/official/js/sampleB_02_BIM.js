/**
* @version 2.0
* @author ThingJS
* 说明：创建森BIM转换的场景，url为园区地址
*      森BIM插件Revit是基于AutoDesk Revit进行的插件开发，能快速获取rvt文件中的模型数据，可以
*      通过简单的配置，确定导出的建筑结构、层级结构、以及设备/孪生体等需要管理的对象，简单配置
*      后一键导出TJS场景。
*      森BIM插件下载以及使用，详情请前往： http://www.thingjs.com/guide/bim/
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
var bundle = app.loadBundle('/guide/official/bundles/bim');

bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    initThingJsTip(`平台环境提供的森BIM工具可以快速转换BIM资源生成TJS场景，在在线开发上传后即可进行场景加载以及交互控制，可以点击左侧按钮进行体验`)
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [48.823864431786525, 63.43094245093802, -101.16528575073502],
        'target': [-42.195703656783714, 1.8237664041120496, -7.509875956438975],
        'time': 2000,
    });
    app.on(THING.EventType.RegisterLevelAction, '*', function (ev) {
        var actionQueue = ev.actionQueue;
        actionQueue.enable('hoverChild', false)
    });
    new THING.widget.Button('进入建筑层级', async function () {
        app.query('.Facade')[0].style.opacity = 1;
        app.query('.Facade')[0].off('update', null, '每帧改变透明度')
        await app.levelManager.change(app.query('.Campus')[0]);
        app.query('.Floor')[1].style.wireframe = false;
        app.query('.Room')[2].style.color = null;
        app.query('0915mm Diameter')[0].style.color = null;

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [6.801537309760459, 100.11371705454565, 52.93653969606309],
            'target': [-26.2788, 0.30479999999999974, 1.2704499999999985],
            'time': 2000,
            'complete': function () {
                initThingJsTip(`获取建筑对象并进入建筑层级`);
                app.levelManager.change(app.query('.Building')[0]);
            }
        });

    });

    new THING.widget.Button('进入楼层', async function () {
        reset();
        initThingJsTip(`切换到楼层并开启线框效果`);
        await app.levelManager.change(app.query('.Floor')[1])
        //给物体开启线框模式
        //父物体设置 style 不会遍历子物体，设置 style 只对自己生效
        app.query('.Floor')[1].traverse(obj => { obj.style.color = '#1684f5' })
        app.query('.Floor')[1].traverse(obj => { obj.style.wireframe = true })
        app.query('.Floor')[1].doors.style.color = '#1684f5';
        app.query('.Floor')[1].doors.style.wireframe = true;

    });

    new THING.widget.Button('进入房间', async function () {
        reset();
        initThingJsTip(`切换到房间并设置颜色`);
        await app.levelManager.change(app.query('.Room')[2], {
            complete: function () {
                // 摄像机飞行到某位置
                app.camera.flyTo({
                    'position': [-31.417745232727114, 14.061999999492638, -21.017156502887246],
                    'target': [-44.59912568839139, -3.478128291010285, -26.710011654438333],
                    'time': 2000,
                    'complete': function () {
                        app.query('.Room')[2].style.color = '#ff0000';
                    }
                });
            }
        });
    });

    new THING.widget.Button('获取物体', function (ev) {
        var curLevel = app.levelManager.current;
        reset();
        var curLevel = app.levelManager.current;
        initThingJsTip(`获取到桌子模型并设置颜色`);
        if (curLevel !== app.query('.Room')[2]) {
            app.levelManager.change(app.query('.Room')[2])
        }
        app.query('0915mm Diameter')[0].style.color = '#0000ff';
    });
    new THING.widget.Button('重置', function () {
        initThingJsTip(`平台环境提供的森BIM工具可以快速转换BIM资源生成TJS场景，在在线开发上传后即可进行场景加载以及交互控制，可以点击左侧按钮进行体验`)
        reset();
    });
    function reset() {
        app.query('.Facade')[0].style.opacity = 1;
        app.query('.Facade')[0].off('update', null, '每帧改变透明度')
        app.levelManager.change(app.query('.Campus')[0]);
        app.query('.Floor')[1].style.wireframe = false;
        app.query('.Room')[2].style.color = null;
        app.query('0915mm Diameter')[0].style.color = null;
        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [6.801537309760459, 100.11371705454565, 52.93653969606309],
            'target': [-26.2788, 0.30479999999999974, 1.2704499999999985],
            'time': 2000,
            'complete': function () {
            }
        })
    }
})