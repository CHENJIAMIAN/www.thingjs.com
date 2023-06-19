/**
 * @version 2.0
 * @author ThingJS
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

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 定义全局变量
var car;
var car02;
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    initThingJsTip("本例程展示了摄像机交互控制，点击按钮，查看效果");

    // 2D/3D 切换
    new THING.widget.Button('2D/3D 切换', function () {
        reset();
        var viewMode = app.camera.getViewModeType();
        if (viewMode == null) {
            initThingJsTip("已切换至2D视图");
            app.camera.setViewModeType("Top");  // 切换为2D视图
        } else {
            initThingJsTip("已切换至3D视图");
            app.camera.setViewModeType();  // 默认为3D视图
        }
    });

    // 摄像机移动
    new THING.widget.Button('摄像机移动', function () {
        reset();
        initThingJsTip("摄像机移动水平移动5m");
        app.camera.pan(5,0);  // 设置移动距离(水平移动, 垂直移动)，正负代表方向
    });

    // 摄像机推进
    new THING.widget.Button('摄像机推进', function () {
        reset();
        initThingJsTip("摄像机向前推进10m");
        app.camera.zoom(10);  // 设置推进距离，正负代表方向
    });

    // 摄像机旋转
    new THING.widget.Button('摄像机旋转', function () {
        reset();
        initThingJsTip("摄像机同时环绕 Y 轴、X 轴旋转10度");
        app.camera.rotateY(30);
        // app.camera.rotateOnAxis([1, 0, 0], 180);
    });

    // 禁用/启用 左键旋转
    new THING.widget.Button('禁用旋转', function () {
        reset();
        initThingJsTip("禁用鼠标左键旋转");
        app.camera.enableRotate = false;  // 禁用旋转
    });

    // 禁用/启用 右键平移
    new THING.widget.Button('禁用平移', function () {
        reset();
        initThingJsTip("禁用鼠标右键平移");
        app.camera.enablePan = false;  // 禁用平移
    });

    // 禁用/启用 滚轮缩放
    new THING.widget.Button('禁用缩放', function () {
        reset();
        initThingJsTip("禁用鼠标滚轮缩放");
        app.camera.enableZoom = false;  // 禁用缩放
    });

    // 限制摄像机俯仰范围
    new THING.widget.Button('限制俯仰范围', function () {
        reset();

        initThingJsTip("设置摄像机俯仰角度范围[0, 90]，上下移动鼠标查看效果");
        app.camera.vertAngleLimit = [10, 40];  // 设置摄像机俯仰角度范围[最小值, 最大值]
    });

    // 限制摄像机水平范围
    new THING.widget.Button('限制水平范围', function () {
        reset();

        initThingJsTip("设置摄像机水平角度范围[30, 60]，左右移动鼠标查看效果");
        app.camera.horzAngleLimit = [30, 60];  // 设置摄像机水平角度范围[最小值, 最大值]
    });

    // 重置
    new THING.widget.Button('重置', function () {
        resetFly();
    });
})


/**
 * 重置
 */
function reset() {
    initThingJsTip("本例程展示了摄像机交互控制，点击按钮，查看效果");
    app.camera.setViewModeType();  // 默认为3D视图
    app.camera.enableRotate = true;  // 启用旋转
    app.camera.enablePan = true;  // 启用平移
    app.camera.enableZoom = true;  // 启用缩放
    app.camera.vertAngleLimit = [0, 90];  // 设置摄像机俯仰角度范围[最小值, 最大值]
    app.camera.horzAngleLimit = [-360, 360];  // 设置摄像机水平角度范围[最小值, 最大值]
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