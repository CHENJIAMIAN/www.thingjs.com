/**
 * 说明：视频融合示例
 * 操作：场景加载万层后会切换到指定楼层，点击不同按钮，可查看不同区域的视频监控投影
 */

// 加载视频融合所需要的js库
THING.Utils.dynamicLoad(['https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/js/thing.projector.min.js'], function() {
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

    // 加载场景
    var app = new THING.App({
        type: 'Campus',
        url: 'models/uinnova',
        complete: () => {
            initThingJsTip("视频融合是通过对监控视频数据流提取视频帧，并将其投射到三维空间场景里。点击左侧不同按钮，可查看不同区域的视频监控投影（默认为楼梯入口区域的视频监控投影，当前无点击按钮操作时，会自动切换区域）");

            var floor = app.query("#149588")[0];

            // 进入楼层时 创建摄像头
            floor.on(THING.EventType.EnterLevel, function(ev) {
                createUI();
                // 开启自动巡视
                startAutoFly();
            });

            // 离开楼层时 销毁摄像头
            floor.on(THING.EventType.LeaveLevel, function(ev) {
                destroyProjector(ev.object);
            });
            app.level.change(floor);
        }
    });

    /**
     * 动态创建video标签，如果是要视频直播流，可自行解决，获取到video标签后传递给ThingJS
     */
    function getVideoElement(url) {
        var video = document.createElement("video");
        video.src = url;
        video.autoplay = true;
        video.muted = true;
        video.loop = "loop";
        video.preload = "auto";
        video.crossOrigin = 'anonymous';
        video.addEventListener("canplay", function() {
            video.play();
        });
        return video;
    }

    /**
     * 创建视频投影
     */
    function createProjector(floor) {
        var projector01 = app.create({
            name: "cam1",
            type: 'Projector',
            position: [-40, 10.5, 0.5],
            angles: [-16, -95, 0, "YXZ"],
            parent: floor
        });
        projector01.setReceiveObjects([floor]);
        projector01.far = 25;
        projector01.fov = 35;
        var video1 = getVideoElement("https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/50.mp4");
        //设置video标签
        projector01.setVideoElement(video1);

        var projector02 = app.create({
            name: "cam2",
            type: 'Projector',
            position: [-24.517463441837673, 10.5, 8.092980045657695],
            angles: [-20, 84, 0, "YXZ"],
            parent: floor
        });
        projector02.setReceiveObjects([floor]);
        projector02.far = 25;
        projector02.fov = 35;
        var video2 = getVideoElement("https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/46.mp4");
        //设置video标签
        projector02.setVideoElement(video2);

        var projector03 = app.create({
            name: "cam3",
            type: 'Projector',
            position: [-49.62416953172898, 10.5, 9.5],
            angles: [-20, -19, 0, "YXZ"],
            parent: floor
        });
        projector03.setReceiveObjects([floor]);
        projector03.far = 10;
        projector03.fov = 40;
        var video3 = getVideoElement("https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/42.mp4");
        //设置video标签
        projector03.setVideoElement(video3);

        var projector04 = app.create({
            name: "cam4",
            type: 'Projector',
            position: [-45.493776992797855, 10, 3.707088590951954],
            angles: [-19, 70, 0, "YXZ"],
            parent: floor
        });
        projector04.setReceiveObjects([floor]);
        projector04.far = 25;
        projector04.fov = 45;
        var video4 = getVideoElement("https://uinnova-pano.oss-cn-beijing.aliyuncs.com/projector/resource/41.mp4");
        //设置video标签
        projector04.setVideoElement(video4);
    }

    /**
     * 删除视频投影
     */
    function destroyProjector(floor) {
        var projectors = floor.query(".Projector");
        for (var i = 0; i < projectors.length; i++) {
            projectors[i].destroy();
        }
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
            complete: function() {
                func && func();
            }
        });
    }

    function flyToCamByView(viewStep) {
        var name = views[viewStep].name;
        var stoptime = views[viewStep].stoptime;
        flyToCam(name, function() {
            timer = setTimeout(function() {
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
        var floor = app.query("#149588")[0];
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
        THING.widget.Button('视角1：楼梯入口', function() {
            flyToCam("cam1");
            stopAutoFly();
        })
        THING.widget.Button('视角2：工作区域', function() {
            flyToCam("cam2");
            stopAutoFly();
        });
        THING.widget.Button('视角3：门厅区域', function() {
            flyToCam("cam3");
            stopAutoFly();
        });
        THING.widget.Button('视角4：电梯入口', function() {
            flyToCam("cam4");
            stopAutoFly();
        });
    }
});