/**
 * 说明：创建全景图播放器，并实现相关功能
 * 功能：
 *      1.创建全景图播放器
 *      2.全景图加载模型
 *      3.园区模型与全景图联动
 *      4.开启、暂停巡游
 * 操作：点击按钮，查看效果
 */
var carModel; // 车模型对象
// 加载全景图插件
THING.Utils.dynamicLoad('/panooss/pano/js/thing.pano.min.js', function () {
    // 创建App
    var app = new THING.App({
        url: "models/uinnova",
        "skyBox": "BlueSky"
    });

    // 设置全景图数据
    var panoData = {
        "config": {
            "panos": [{
                "panoID": "PUBLIC/a15355465645611000",
                "title": "开始",
                "correction": "0",
                "startH": "-180",
                "startV": "0",
                "hotspots": [{
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611001",
                    "h": "180",
                    "v": "0"
                }],
                "position": {
                    "parent": "Ground",
                    'position': [-10.4, 0, 27.9]
                }
            }, {
                "panoID": "PUBLIC/a15355465645611001",
                "title": "门口1",
                "correction": "0",
                "startH": "0",
                "hotspots": [{
                    "nextPanoID": "PUBLIC/a15355465645611000",
                    "h": "0",
                    "v": "0"
                }, {
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611002",
                    "h": "180",
                    "v": "0"
                }],
                "position": {
                    "parent": "Ground",
                    "position": [-16.3, 0, 27.9]
                }

            }, {
                "panoID": "PUBLIC/a15355465645611002",
                "title": "门口2",
                "correction": "0",
                "startH": "0",
                "hotspots": [{
                    "nextPanoID": "PUBLIC/a15355465645611001",
                    "h": "0",
                    "v": "0"
                }, {
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611003",
                    "h": "180",
                    "v": "0"
                }],
                "position": {
                    "parent": "Ground",
                    "position": [-23.6, 0, 27.9]
                }

            }, {
                "panoID": "PUBLIC/a15355465645611003",
                "title": "门口拐弯",
                "correction": "0",
                "startH": "0",
                "hotspots": [{
                    "nextPanoID": "PUBLIC/a15355465645611002",
                    "h": "0",
                    "v": "0"
                }, {
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611004",
                    "h": "-90",
                    "v": "0"
                }],
                "position": {
                    "parent": "Ground",
                    "position": [-27.6, 0, 27.9]
                }

            }, {
                "panoID": "PUBLIC/a15355465645611004",
                "title": "入门口",
                "correction": "0",
                "startH": "0",
                "hotspots": [{
                    "nextPanoID": "PUBLIC/a15355465645611003",
                    "h": "90",
                    "v": "0"
                }, {
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611005",
                    "h": "180",
                    "v": "0"
                }],
                "position": {
                    "parent": "Ground",
                    "position": [-27.6, 0, 23.1]
                }

            }, {
                "panoID": "PUBLIC/a15355465645611005",
                "title": "进入门口",
                "correction": "0",
                "startH": "0",
                "hotspots": [{
                    "nextPanoID": "PUBLIC/a15355465645611004",
                    "h": "0",
                    "v": "0"
                }, {
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611006",
                    "h": "-90",
                    "v": "10"
                }],
                "position": {
                    "parent": "4",
                    "position": [-30, 0, 23.1]
                }

            }, {
                "panoID": "PUBLIC/a15355465645611006",
                "title": "进入门口上台阶",
                "correction": "0",
                "startH": "0",
                "hotspots": [{
                    "nextPanoID": "PUBLIC/a15355465645611005",
                    "h": "90",
                    "v": "0"
                }, {
                    "name": "spot1",
                    "nextPanoID": "PUBLIC/a15355465645611006",
                    "h": "-90",
                    "v": "0"
                }],
                "position": {
                    "parent": "4",
                    "position": [-30, 0.91, 17.4]
                }

            }],
            "tours": [{
                "panoID": "PUBLIC/a15355465645611000",
                "h": 180,
                "v": 0
            },
            {
                "panoID": "PUBLIC/a15355465645611001",
                "h": 180,
                "v": 0
            },
            {
                "panoID": "PUBLIC/a15355465645611002",
                "h": 180,
                "v": 0
            },
            {
                "panoID": "PUBLIC/a15355465645611003",
                "h": "-90",
                "v": "0"
            },
            {
                "panoID": "PUBLIC/a15355465645611004",
                "h": "180",
                "v": "0"
            },
            {
                "panoID": "PUBLIC/a15355465645611005",
                "h": "-90",
                "v": "10"
            },
            {
                "panoID": "PUBLIC/a15355465645611006",
                "h": "-90",
                "v": "0"
            }
            ]
        }
    }


    var peopleModel; // 人物模型对象
    var curPanoConfig; // 当前全景图信息
    var points = []; // 点信息
    var isPoint = false;
    var modelUrl = "https://model.3dmomoda.cn/models/2F0966317E574844A97FB29A5DF8E8CA/0/gltf";

    app.on('load', function (ev) {
        // // 设置摄像机位置和目标点
        // app.camera.position = [2.2170353929778983, 29.43479240648847, 29.877308616134822];
        // app.camera.target = [-30.103770156671388, -0.2326902914939683, 21.11110887804857];
        app.camera.flyTo({
            position: [2.2170353929778983, 29.43479240648847, 29.877308616134822],
            target: [-30.103770156671388, -0.2326902914939683, 21.11110887804857],
            time: 2000
        })

        createPlayer();

        initThingJsTip(`本例程展示了全景图的创建、巡游及与园区内模型联动等功能<br>
                  1.点击地面上的图标，全景图播放器中的图片，跟随小人运动路径改变<br>
                  2.点击全景图播放器中的热点，小人跟随热点切换运动`);

    });

    /**
     * 创建按钮
     */
    function createTourButton() {
        THING.widget.Button('加载模型', function () {
            initThingJsTip('园区加载模型后，全景图内会同步加载模型，移动模型，全景图内的模型位置也对应改变');
            createModel();
        });

        THING.widget.Button('开启巡游', function () {
            initThingJsTip('开启巡游后，全景图会按照配置的全景图数据进行巡游，小人也会跟随移动；<br>暂停后，停止巡游');
            THING.PanoManager.startTour();
        })

        THING.widget.Button('暂停巡游', function () {
            initThingJsTip('开启巡游后，全景图会按照配置的全景图数据进行巡游，小人也会跟随移动；<br>暂停后，停止巡游');
            THING.PanoManager.stopTour();
        });
    }

    /**
     * 创建全景图播放器
     */
    function createPlayer() {
        THING.PanoManager.createPlayer(panoData, {
            fullscreen: false, // 是否全屏
            location: "right-center", // 悬浮框所在位置
            offsetX: 0, // 相对于location的X轴偏移
            offsetY: 0 // 相对于location的Y轴偏移
        }, {
            panoID: panoData.config.panos[0].panoID, // 初始打开的全景图
            h: 180, // 打开全景图的初始视角h
            v: 0 // 打开全景图的初始视角v
        }, null, function () {
            createTourButton();
            createPoints();
        });

        // 全景图播放器中全景图切换事件
        app.on(THING.PanoEvent.PanoChange, function (event) {
            var panoID = event.panoID; // 当前打开的全景图ID
            var panoObj = app.query("[panoID=" + panoID + "]")[0]; // 当前打开的全景图ID
            if (isPoint && panoObj) {
                var panos = app.query("[panoObj=1]");
                moveToNext(panoObj.position);
                // if(carModel){
                //     console.log('1111');
                //     reComputePosition(panoObj.position, carModel.position, carModel.angles);
                // }
            }

            curPanoConfig = event.pano;

            if (!carModel) return;
            reComputePosition(curPanoConfig.position, carModel.position, carModel.angles);
        });
    }

    /**
     * 加载模型
     * 园区创建模型后，全景图也会加载模型
     * 移动模型，全景图内的模型位置也对应改变
     */
    function createModel() {
        // 创建Thing
        carModel = app.create({
            type: 'Thing',
            name: 'car',
            url: modelUrl, // 模型地址
            position: [-25, 0, 30],
            angles: [0, 90, 0], // 旋转
            complete: function (ev) {
                ev.object.style.renderOrder = 1;
                // 添加到全景图中
                var pano3DObjProperties =
                    THING.PanoManager.compute3DObjectProperties(panoData.config.panos[0].position.position, ev.object.position, ev.object.angles);
                THING.PanoManager.create3DObject("pano3DObj", modelUrl, false, pano3DObjProperties);
            }
        });
        carModel.draggable = true; // 设置模型可拖拽
        carModel.on('drag', function (ev) {
            if (!ev.picked) return;

            var pickPos = ev.pickedPosition; // 获取当前拾取坐标
            ev.object.position = pickPos; // 设置模型位置
            reComputePosition(curPanoConfig.position.position, ev.object.position, ev.object.angles);
        });
    }

    /**
     * 创建点
     */
    function createPoints() {
        createPersonModel();

        isPoint = true;
        var tours = panoData.config.tours;
        var panos = panoData.config.panos;

        for (var i in tours) {
            var panoID = tours[i].panoID;
            for (var j in panos) {
                var scene = panos[j];
                if (scene.panoID == panoID) {
                    var p = scene.position;

                    var marker = app.create({
                        type: "Marker",
                        position: p.position,
                        size: 10,
                        parent: app.query(p.parent)[0],
                        url: "https://www.thingjs.com/static/images/marker02.png",
                    });
                    marker.style.opacity = 1.0;
                    // 设置永远显示在最上层
                    // marker.style.alwaysOnTop = true;
                    marker.style.renderOrder = 10;
                    marker.rotateY(scene.correction);
                    marker['panoObj'] = 1;
                    marker['panoID'] = panoID;
                    marker['panoTitle'] = scene.title;
                    points.push([p.position[0], p.position[1] + 0.1, p.position[2]]);
                    marker.on(THING.EventType.SingleClick, function (ev) {
                        // 切换加载指定全景图
                        THING.PanoManager.changePano(ev.object.panoID);
                    })
                }
            }
        }
        createRoute();
    }

    /**
     * 根据全景图数据在场景中创建点和路径线
     */
    function createRoute() {
        var line = app.query("panoLine");
        if (line[0]) line[0].destroy();
        var line2 = app.create({
            type: 'RouteLine',
            name: "panoLine",
            points: points,
            image: 'https://www.thingjs.com/static/images/line01.png' // 线路中的纹理资源
        });
        // 启用 UV 动画
        line2.scrollUV = true;
        line2.style.renderOrder = 9;
    }

    /**
     * 创建人物模型
     */
    function createPersonModel() {
        peopleModel = app.create({
            type: 'Thing',
            url: 'https://model.3dmomoda.cn/models/0bcba8ca78734b64a3dae3eb699a913c/0/gltf/',
            position: [-10.4, 0, 27.9],
            complete: function () {
                peopleModel.playAnimation({ name: '_defaultAnim_', loop: true });
            }
        });
        peopleModel.rotateY(-90.0);
    }

    /**
     * 控制人物移动
     */
    function moveToNext(p) {
        peopleModel.playAnimation({ name: '跑步', loop: true });
        peopleModel.style.opacity = 1.0;
        peopleModel.style.outlineColor = "#FF0000";
        peopleModel.moveTo({
            "position": p,
            "time": 1500,
            "orientToPath": true,
            "lerp": false,
            "complete": function () {
                peopleModel.playAnimation({ name: '_defaultAnim_', loop: true });
            }
        });
    }

    /**
     * 计算全景图中模型位置
     */
    function reComputePosition(panoPosition, modelPosition, modelAngles) {
        console.log(panoPosition.position);
        console.log(modelPosition);
        var pano3DObjProperties = THING.PanoManager.compute3DObjectProperties(panoPosition.position, modelPosition, modelAngles);
        console.log(pano3DObjProperties);
        THING.PanoManager.set3DObjectProperties("pano3DObj", pano3DObjProperties);
    }
})