
/**
* @version 2.0
* @author ThingJS
 * 说明：视频融合示例
 * 操作：场景加载万层后会切换到指定楼层，点击不同按钮，可查看不同区域的视频监控投影
*/

//在墙壁上的投影有一侧存在闪烁现象，问题已反馈，等回复  完成度80%


const app = new THING.App();

app.camera.fog.enable = true;
app.camera.fog.color = [0.5019607843137255, 0.5019607843137255, 0.5019607843137255];

app.camera.position = [50, 50, 50];

// 用于记录 自动巡视 的视点
var views = [
    { 'name': 'cam1', 'stoptime': 12.5 * 1000 },
    { 'name': 'cam2', 'stoptime': 13 * 1000 },
    { 'name': 'cam3', 'stoptime': 9 * 1000 },
    { 'name': 'cam4', 'stoptime': 7 * 1000 },
];
// 自动巡视 当前视点下标
var viewStep = 0;
// 自动巡视 计时器
var timer;

var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/uinnova');
bundle.waitForComplete().then((ev) => {
    console.log(bundle.name);
    const campus = bundle.campuses[0];
    const ground = campus.ground;
    const buildings = campus.buildings[0];
    var floor = app.query("[uuid=149588]")[0];
    console.log(ground)
    app.levelManager.change(campus); // 开启层级切换
    // 进入楼层时 创建摄像头
    floor.on(THING.EventType.AfterEnterLevel, function (ev) {
        createUI();
        // 开启自动巡视
        startAutoFly();
    });

    // 离开楼层时 销毁摄像头
    floor.on(THING.EventType.AfterLeaveLevel, function (ev) {
        destroyProjector(ev.object);
        $('#widget_root').remove()
    });
    app.levelManager.change(floor);
})

/**
* 创建视频投影
*/
function createProjector(floor) {
    var projector01 = new THING.EXTEND.Decal();
    projector01.name = 'cam1'
    projector01.position = [-40.4, 10.2, 0.5];
    projector01.angles = [10, -95, 10, "YXZ"];
    projector01.rotateX(-9)
    projector01.rotateY(7)
    projector01.parent = floor
    projector01.debug = false;

    projector01.setReceiveObjects(app.query('.Thing' || "[uuid=149588]"));
    projector01.far = 25;
    projector01.fov = 35;
    var video1 = new THING.VideoTexture({ url: "https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/50.mp4" });
    //设置video标签
    projector01.image = video1

    projector01.projectionType = 'Perspective';
    projector01.opacity = 1;
    projector01.occlusion = {//是否使用遮挡剔除。
        enable: true,
        bias: -0.0004
    }
    projector01.barrelCorrection = {//启用/禁用畸变矫正。
        enable: true,
        barrelS: 1
    }

    var projector02 = new THING.EXTEND.Decal();
    projector02.name = 'cam2'
    projector02.position = [-24.517463441837673, 10.5, 8.092980045657695];
    projector02.angles = [-20, 74, 20, "YXZ"];
    projector02.rotateX(-10)
    projector02.rotateY(10)
    projector02.parent = floor
    projector02.debug = false;

    projector02.setReceiveObjects(app.query('.Thing' || "[uuid=149588]"));
    projector02.far = 25;
    projector02.fov = 35;
    var video2 = new THING.VideoTexture({ url: "https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/46.mp4" });
    //设置video标签
    projector02.image = video2

    projector02.projectionType = 'Perspective';
    projector02.opacity = 1;
    projector02.occlusion = {//是否使用遮挡剔除。
        enable: true,
        bias: -0.0004
    }
    projector02.barrelCorrection = {//启用/禁用畸变矫正。
        enable: false,
        barrelS: 1
    }

    var projector03 = new THING.EXTEND.Decal();
    projector03.name = 'cam3'
    projector03.position = [-49.62416953172898, 10.5, 9.5];
    projector03.angles = [-20, -19, 0, "YXZ"];
    projector03.parent = floor
    projector03.debug = false;

    projector03.setReceiveObjects(app.query('.Thing' || "[uuid=149588]"));
    projector03.far = 25;
    projector03.fov = 35;
    var video3 = new THING.VideoTexture({ url: "https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/42.mp4" });
    //设置video标签
    projector03.image = video3

    projector03.projectionType = 'Perspective';
    projector03.opacity = 1;
    projector03.occlusion = {//是否使用遮挡剔除。
        enable: true,
        bias: -0.0004
    }
    projector03.barrelCorrection = {//启用/禁用畸变矫正。
        enable: false,
        barrelS: 1
    }

    var projector04 = new THING.EXTEND.Decal();
    projector04.name = 'cam4'
    projector04.position = [-47, 10, 3.707088590951954];
    projector04.angles = [-19, 70, 20, "YXZ"];
    projector04.parent = floor
    projector04.debug = false;

    projector04.setReceiveObjects(app.query('.Thing' || "[uuid=149588]"));
    projector04.far = 25;
    projector04.fov = 35;
    var video4 = new THING.VideoTexture({ url: "https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/41.mp4" });
    //设置video标签
    projector04.image = video4

    projector04.projectionType = 'Perspective';
    projector04.opacity = 1;
    projector04.occlusion = {//是否使用遮挡剔除。
        enable: true,
        bias: -0.0004
    }
    projector04.barrelCorrection = {//启用/禁用畸变矫正。
        enable: true,
        barrelS: 1
    }
}

/**
* 删除视频投影
*/
function destroyProjector(floor) {
    var projectors = app.query(".Decal");
    projectors.destroy()
}

/**
* 飞到指定的摄像头
*/
function flyToCam(name, func) {
    var obj = app.query(name)[0];
    if (!obj) return;

    var pos = obj.selfToWorld([0, 1, 0.5]);
    app.camera.flyTo({
        position: pos,
        target: obj.selfToWorld([0, 0, -10]),
        time: 1200,
        complete: function () {
            func && func();
        }
    });
}

function flyToCamByView(viewStep) {
    var name = views[viewStep].name;
    var stoptime = views[viewStep].stoptime;
    flyToCam(name, function () {
        timer = setTimeout(function () {
            viewStep++;
            if (viewStep >= views.length) {
                viewStep = 0;
            }
            flyToCamByView(viewStep)
        }, stoptime)
    })
}

/**
 * 开始自动飞行
 */
function startAutoFly() {
    var floor = app.query("[uuid=149588]")[0];
    // 重置播放状态 从头开始
    stopAutoFly();
    destroyProjector(floor);
    createProjector(floor);
    viewStep = 0;

    flyToCamByView(viewStep);
}

/**
 * 停止自动飞行
 */
function stopAutoFly() {
    if (timer) { clearTimeout(timer); }
}

/**
 * 创建界面
 */
function createUI() {
    new THING.widget.Button('视角1：楼梯入口', function () {
        flyToCam("cam1");
        stopAutoFly();
    })
    new THING.widget.Button('视角2：工作区域', function () {
        flyToCam("cam2");
        stopAutoFly();
    });
    new THING.widget.Button('视角3：门厅区域', function () {
        flyToCam("cam3");
        stopAutoFly();
    });
    new THING.widget.Button('视角4：电梯入口', function () {
        flyToCam("cam4");
        stopAutoFly();
    });
}