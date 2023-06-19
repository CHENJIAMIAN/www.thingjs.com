/**
 * 说明：摄像机操作控制
 * 功能：
 *      1.2D/3D 切换
 *      2.摄像机水平、垂直移动
 *      3.摄像机前后推进
 *      4.摄像机旋转
 *      5.鼠标控制摄像机旋转、平移、缩放
 *      6.限制摄像机俯仰、水平范围
 * 难度：★★☆☆☆
 */

var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    skyBox: 'Night',
    env: 'Seaside',
});

// 加载完成事件 
app.on('load', function (ev) {
    initThingJsTip("本例程展示了摄像机交互控制，点击按钮，查看效果");

    // 2D/3D 切换
    new THING.widget.Button('2D/3D 切换', function () {
        var viewMode = app.camera.viewMode;
        if (viewMode == "normal") {
            initThingJsTip("已切换至2D视图");
            app.camera.viewMode = THING.CameraView.TopView;  // 切换为2D视图
        } else {
            initThingJsTip("已切换至3D视图");
            app.camera.viewMode = THING.CameraView.Normal;  // 默认为3D视图
        }
    });

    // 摄像机移动
    new THING.widget.Button('摄像机移动', function () {
        initThingJsTip("摄像机向右水平移动5m");
        app.camera.move(5, 0);  // 设置移动距离(水平移动, 垂直移动)，正负代表方向
    });

    // 摄像机推进
    new THING.widget.Button('摄像机推进', function () {
        initThingJsTip("摄像机向前推进10m");
        app.camera.zoom(10);  // 设置推进距离，正负代表方向
    });

    // 摄像机旋转
    new THING.widget.Button('摄像机旋转', function () {
        initThingJsTip("摄像机同时环绕 Y 轴、X 轴旋转10度");
        app.camera.rotateAround({
            target: app.camera.target,
            yRotateAngle: 10,  // 环绕Y轴旋转角度(俯仰面（竖直面）内的角度)
            xRotateAngle: 10,  // 环绕X轴旋转角度(方位面（水平面）内的角度)
            time: 1000  // 环绕飞行的时间
        });
    });

    // 禁用/启用 左键旋转
    new THING.widget.Button('禁用旋转', function () {
        initThingJsTip("禁用鼠标左键旋转");
        app.camera.enableRotate = false;  // 禁用旋转
    });

    // 禁用/启用 右键平移
    new THING.widget.Button('禁用平移', function () {
        initThingJsTip("禁用鼠标右键平移");
        app.camera.enablePan = false;  // 禁用平移
    });

    // 禁用/启用 滚轮缩放
    new THING.widget.Button('禁用缩放', function () {
        initThingJsTip("禁用鼠标滚轮缩放");
        app.camera.enableZoom = false;  // 禁用缩放
    });

    // 限制摄像机俯仰范围
    new THING.widget.Button('限制俯仰范围', function () {
        reset();

        initThingJsTip("设置摄像机俯仰角度范围[0, 90]，上下移动鼠标查看效果");
        app.camera.xAngleLimitRange = [0, 90];  // 设置摄像机俯仰角度范围[最小值, 最大值]
    });

    // 限制摄像机水平范围
    new THING.widget.Button('限制水平范围', function () {
        reset();

        initThingJsTip("设置摄像机水平角度范围[30, 60]，左右移动鼠标查看效果");
        app.camera.yAngleLimitRange = [30, 60];  // 设置摄像机水平角度范围[最小值, 最大值]
    });

    // 重置
    new THING.widget.Button('重置', function () {
        resetFly();
    });
});

/**
 * 重置
 */
function reset() {
    initThingJsTip("本例程展示了摄像机交互控制，点击按钮，查看效果");
    app.camera.viewMode = THING.CameraView.Normal;  // 默认为3D视图
    app.camera.enableRotate = true;  // 启用旋转
    app.camera.enablePan = true;  // 启用平移
    app.camera.enableZoom = true;  // 启用缩放
    app.camera.xAngleLimitRange = [-90, 90];  // 设置摄像机俯仰角度范围[最小值, 最大值]
    app.camera.yAngleLimitRange = [-360, 360];  // 设置摄像机水平角度范围[最小值, 最大值]
}
/**
 * 重置摄像机视角
 */
function resetFly() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.67799999999998, 61.72399999999999],
        'target': [1.646, 7.891, 4.445],
        'time': 1000,
        'complete': function () {
            reset()
        }
    });
}