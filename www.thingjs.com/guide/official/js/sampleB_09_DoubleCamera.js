
/**
* @version 2.0
* @author ThingJS
* 说明：双摄像机控件
* 难度：★★☆☆☆
*/

// 当前问题：多摄影机添加fit聚焦组件后，无法删除

const app = new THING.App();
var cameras = [];
var camera;
var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/ThingJS示例场景2.0', {
    external: { buildingShowObjects: true }, //设置在建筑层级是否显示室内物体
    assets: true, //是否加载资源
    ignoreTheme: true,  //是否忽略科幻
    position: [0, 0, 0],
});

bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    const car = app.query('car01')[0];
    // 定义小车移动路径
    var path = [[0, 0, 3], [20, 0, 3], [20, 0, 10], [0, 0, 10], [0, 0, 3]];
    // 小车移动
    car.movePath(path, {
        time: 10 * 1000,
        loopType: THING.LoopType.Repeat,  // 循环类型
        lerpType: THING.LerpType.Linear.None,  // 差值类型
        next: function (ev) {
            // 获取相对下一个目标点位的旋转值
            var quaternion = THING.Math.getQuatFromTarget(ev.from, ev.to, [0, 1, 0]);

            // 在 1 秒内将物体转向到目标点位
            ev.object.lerp.to({
                to: {
                    quaternion,
                },
                time: 1000,
            });
        }
    });
});

new THING.widget.Button('添加多摄像机', function () {
    if (cameras.length > 0) {
        cameras[0].visible = true;
    }
    else {
        function resetCameraPosition() {
            cameras[0].viewModeType = THING.ViewModeType.Top;
        }
        const top = 0;
        const width = 300;
        const height = 300;
        const left = 1600;
        var viewports = [
            [left, top, width, height],
            [app.size[0] - width, top, width, height],
            [app.size[0] - width, app.size[1] - height, width, height],
            [0, app.size[1] - height, width, height],
        ];

        for (var i = 0; i < 1; i++) {
            camera = new THING.Camera();
            camera.enableViewport = true;
            camera.enable = false; // 禁用鼠标控制摄像机
            camera.viewport = viewports[i];
            camera.projectionType = THING.ProjectionType.Orthographic;
            camera.postEffect.FXAA.enable = true;
            camera.postEffect.MSAA.enable = true;
            cameras.push(camera);
        }
        resetCameraPosition();
    }
});

new THING.widget.Button('移除多摄像机', function () {
    if (cameras.length > 0) {
        cameras[0].removeComponent('follower')
        cameras[0].destroy();
        cameras = [];
    }
    else return
});

new THING.widget.Button('固定视角', function () {
    cameras[0].removeComponent('follower')
});

new THING.widget.Button('跟随视角', function () {
    const car = app.query('car01')[0]
    cameras[0].fit(car)
    let component = new THING.EXTEND.FollowerComponent();
    cameras[0].fit(car)
    cameras[0].addComponent(component, 'follower');
    // 设置相机跟随小车
    cameras[0].follower.start(car);
});