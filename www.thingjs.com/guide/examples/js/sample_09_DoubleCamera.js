/**
 * 说明：双摄像机控件
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

// 引入文件
THING.Utils.dynamicLoad([
    '/static/ScenePreview/minorcamera/minorcamera.min.v0.1.1.js'  // 控件脚本
], function () {
    var control = null;  // 控件
    var car = null;  // 叉车

    // 场景加载完成后执行事件
    app.on('load', function () {
        // 查询“name”为“car01”的小车
        car = app.query('car01')[0];
        // 定义小车移动路径
        var path = [[0, 0, 3], [20, 0, 3], [20, 0, 10], [0, 0, 10], [0, 0, 3]];
        // 小车移动
        car.movePath({
            path: path,  // 移动路径
            speed: 2,  // 移动速度
            orientToPath: true,  // 是否沿路径方向移动
            smooth: false,  // 关闭平滑插值
            loopType: THING.LoopType.Repeat,  // 循环类型
            lerpType: THING.LerpType.Linear.None,  // 差值类型
            complete: function (ev) {
            }
        });
       
        new THING.widget.Button('添加摄像机控件', function () {
            addControl();
        });
        new THING.widget.Button('固定视角', function () {
            fixedCamera();
        });

        new THING.widget.Button('第一人称跟随物体', function () {
            firstCamera();
        });

        new THING.widget.Button('第三人称跟随物体', function () {
            thirdCamera();
        });

        new THING.widget.Button('移除控件', function () {
            removeControl();
        });
    });

    /**
     * 添加双摄像机控件
     */
    function addControl() {
        if(control)return;
        control = new MinorCameraControl({
            app: app,  // 传入app对象
            right: 0,  // 距右距离，以像素计
            top: 0,  // 距上距离，以像素计
            width: 200,  // 窗口宽度
            height: 200,  // 窗口高度
        });
        app.addControl(control);
    }

    /**
     * 固定视角
     */
    function fixedCamera() {
        // 注销第一人称副摄像机画面刷新事件
        app.off('update', null, 'firstCamera');
        // 注销第三人称副摄像机画面刷新事件
        app.off('update', null, 'thirdCamera');
        if (control == null) {
            addControl();
        }
        // 注册固定视角副摄像机画面刷新事件
        app.on('update', function () {
            // 设置摄像机位置，取固定位置
            control.setCameraPosition([28.354591242186167, 3.6100244746942476, 18.99536949056758]);
            // 设置摄像机看点，取固定位置
            control.setCameraTarget([2.319492214261753, 1.7164442497509529, -4.859959597017128]);
        }, 'fixedCamera');
    }

    /**
     * 第一人称跟随
     */
    function firstCamera() {
        // 注销固定视角副摄像机画面刷新事件
        app.off('update', null, 'fixedCamera');
        // 注销第三人称副摄像机画面刷新事件
        app.off('update', null, 'thirdCamera');
        if (control == null) {
            addControl();
        }
        // 注册第一人称副摄像机画面刷新事件
        app.on('update', function () {
            // 设置摄像机位置，取小车自身的相对位置
            control.setCameraPosition(car.selfToWorld([0, 2.5, 0.5]));
            // 设置摄像机看点，取小车自身的相对位置
            control.setCameraTarget(car.selfToWorld([0, 2.5, 3]));
        }, 'firstCamera');
    }

    /**
     * 第三人称跟随
     */
    function thirdCamera() {
        // 注销固定视角副摄像机画面刷新事件
        app.off('update', null, 'fixedCamera');
        // 注销第一人称副摄像机画面刷新事件
        app.off('update', null, 'firstCamera');
        if (control == null) {
            addControl();
        }
        // 注册第三人称副摄像机画面刷新事件
        app.on('update', function () {
            // 设置摄像机位置，取小车自身的相对位置
            control.setCameraPosition(car.selfToWorld([5, 5, -5]));
            // 设置摄像机看点，取小车自身的位置
            control.setCameraTarget(car.position);
        }, 'thirdCamera');
    }

    /**
     * 移除控件
     */
    function removeControl() {
        if (control != null) {
            app.off('update', null, 'fixedCamera');
            app.off('update', null, 'firstCamera');
            app.off('update', null, 'thirdCamera');
            app.removeControl(control);
            control = null;
        }
    }
});

// 创建提示
initThingJsTip(`该示例中提供了双摄像机的创建和控制方法，点击左侧按钮，查看效果`);