/**
 * 说明：创建森BIM转换的场景，url为园区地址
 *      森BIM插件Revit是基于AutoDesk Revit进行的插件开发，能快速获取rvt文件中的模型数据，可以
 *      通过简单的配置，确定导出的建筑结构、层级结构、以及设备/机电/孪生体等需要管理的对象，简单配置
 *      后一键导出TJS场景。
 *      森BIM插件下载以及使用，详情请前往： http://www.thingjs.com/guide/bim/
 * 难度：★★☆☆☆
 */
// 所有园区
let allCampuses = [];
// 所有机电
let allMeps = [];
// 最后选择的孪生体
let lastSelectThings = [];
// 按钮控件 进入房间
let roomToEnter = null;
// 按钮控件 进入楼层
let floorToEnter = null;
// 按钮控件 进入建筑
let buildingToEnter = null;
// 按钮控件 获取物体
let thingToEnter = null;

// 加载场景代码 
let app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/0776bd36c1d8808e420cf4b1',
    background: '#000000',
    env: 'Seaside',
    // 设置场景不做batch
    enableBatchMaxPlacement: false
});

/**
 * 名称：BIM黑金
 * 说明：此效果模板适用于园区
 */

// 引用效果模板组件脚本
THING.Utils.dynamicLoad([
    'https://www.thingjs.com/static/plugins/thing.effect.min/1.5.6/EffectThemeControl.min.js',
    'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/7581/16543/static/frame.js'
], function () {
    app.on('load', function (ev) {
        initThingJsTip(`平台环境提供的森BIM工具可以快速转换BIM资源生成TJS场景，在在线开发上传后即可进行场景加载以及交互控制，可以点击左侧按钮进行体验`)
        // 获取所有园区
        allCampuses = app.root.campuses.toArray();
        roomToEnter = app.query('.Room').toArray().find(it => it.name === '房间 154');
        floorToEnter = app.query('.Floor').toArray().find(it => it.name === 'Level 1');
        buildingToEnter = app.query('.Building').toArray().find(it => it.name === '机电Demo');
        thingToEnter = app.query('0915mm Diameter')[0];
        // 获取所有机电
        getAllMep();
        setMainTypeShow('arch');
        setCameraBestInfo();
        //  停止进入层级的默认飞行行为
        app.pauseEvent(THING.EventType.EnterLevel, '.Campus', THING.EventTag.LevelFly);
        //  摄像机飞行到某位置
        app.camera.flyTo({
            'position': [38.44299499528401, 40.0141884753723, -34.188410511570815],
            'target': [-37.814563748117294, 6.3904873970453995, 11.745014469570556],
            'time': 2000,
            'complete': function () {
            }
        })
        app.level.change(ev.campus);
        //关闭，进到室内自动切换天空盒  
        app.level.options['autoChangeBackground'] = false;
        //初始化
        var control = new THING.EffectThemeControl();
        app.addControl(control, '效果模板控制器');
        //获取模板控制器
        var ctrl = app.getControl('效果模板控制器');
        //注册模板,data是模板数据。如果是本地效果模板包，必须填第三个参数，该参数是模板包相对于该片代码的路径
        ctrl.registerTheme('default_parkbusiness', data, 'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/7581/16543/static');
        //获取园区
        c = app.query('.Campus')[0];
        //应用效果模板
        c.applyTheme('default_parkbusiness');
        ctrl.applyEffectTheme('default_parkbusiness', c);
        ctrl.applyThemeEnvironment('default_parkbusiness', c);

        new THING.widget.Button('进入建筑层级', async () => {
            await setMainTypeShow('arch');
            initThingJsTip(`获取建筑对象并进入建筑层级`);
            app.level.change(buildingToEnter);
        });

        new THING.widget.Button('进入楼层', async () => {
            await setMainTypeShow('arch');
            initThingJsTip(`切换到楼层并开启线框效果`);
            app.level.change(floorToEnter, { jumping: true });
            // 摄像机飞行到某位置
            app.camera.flyTo({
                'position': [28.873321214308884, 54.180388984495146, -31.854726543970596],
                'target': [-18.994640677101582, 6.631135857146454, -1.9675829225681503],
                'time': 2000,
                'complete': function () {
                    //给物体开启线框模式
                    floorToEnter.style.color = '#1684f5';
                    floorToEnter.style.wireframe = true;
                }
            });
        });

        new THING.widget.Button('进入房间', async () => {
            await setMainTypeShow('arch');
            initThingJsTip(`切换到房间并设置颜色`);
            app.level.change(roomToEnter, { jumping: true });
            // 摄像机飞行到某位置
            app.camera.flyTo({
                object: roomToEnter,
                time: 2000,
                complete: function () {
                    roomToEnter.style.color = '#ff0000';
                }
            });
        });

        new THING.widget.Button('获取物体', async () => {
            await setMainTypeShow('arch');
            if (!roomToEnter || !thingToEnter) {
                return;
            }
            initThingJsTip(`获取到桌子模型并设置颜色`);
            app.level.change(thingToEnter, { jumping: true });

            // 摄像机飞行到某位置
            app.camera.flyTo({
                'position': [-50.618417040271794, 7.009530779443943, -29.29445019074536],
                'target': [-52.65216440270425, 5.029847369566303, -30.249711380924506],
                'time': 2000,
                'complete': function () {
                    thingToEnter.style.color = '#ff0000';
                }
            });
        });
        new THING.widget.Button('机电系统', function () {
              mepShow()
              initThingJsTip(`获取到机电系统并设置展示效果`);
        });
        new THING.widget.Button('重置', function () {
            setMainTypeShow('arch');
            setCameraBestInfo();
            initThingJsTip(`平台环境提供的森BIM工具可以快速转换BIM资源生成TJS场景，在在线开发上传后即可进行场景加载以及交互控制，可以点击左侧按钮进行体验`);
        });
    });
})

/**
 * 获取所有机电孪生体
 */
function getAllMep() {
    allCampuses.forEach(campus => {
        // 获取所有建筑
        const buildings = campus.buildings.toArray();
        // 获取所有楼层
        const floors = buildings.map(building => building.floors.toArray()).flat();
        // 获取所有Thing
        const things = floors.map(floor => floor.things.toArray()).flat();
        // 获取机电孪生体
        const mepThings = things.filter(thing => thing.userData.CLSID === '机电系统');
        allMeps = allMeps.concat(mepThings);
    });
}


// 处理点击了机电节点
function mepShow() {
    let mepThings = allMeps;
    if (mepThings.length === 0) {
        return;
    }
    setMainTypeShow('mep', mepThings);
    // 获取飞到的孪生体
    let flyTarget = mepThings[0];
    console.log(mepThings)
    if (mepThings.length > 1) {
        let floorSet = new Set();
        mepThings.forEach(mep => floorSet.add(mep.parent));
        const floorArray = Array.from(floorSet.values());
        if (floorArray.length === 1) {
            flyTarget = floorArray[0];
        } else {
            let buildingSet = new Set();
            floorArray.forEach(floor => buildingSet.add(floor.parent));
            const buildingArray = Array.from(buildingSet.values());
            if (buildingArray.length === 1) {
                flyTarget = buildingArray[0];
            }
        }
    }
    //找到需要显示的父孪生体
    let parentToShow = flyTarget;
    if (flyTarget.type === 'Thing') {
        parentToShow = flyTarget.parent;
    }
    parentToShow.visible = true;
    THING.App.current.camera.flyTo(flyTarget);
}

/**
 * 设置主要显示的效果
 */
function setMainTypeShow(type = 'mep', meps = []) {
    let campuseOpacity = 1.0;
    let campuseVisible = true;
    let mepOpacity = 1.0;
    let mepOutlineColor = '#00ffff';
    if (type === 'arch') {
        campuseOpacity = 1.0;
        campuseVisible = true;
        mepOpacity = 0.1;
        mepOutlineColor = null;
    } else if (type === 'mep') {
        campuseOpacity = 0.1;
        campuseVisible = false;
        mepOpacity = 1.0;
        mepOutlineColor = '#00ffff';
    } else {
        return;
    }
    clearSelect();
    // 先隐藏所有机电孪生体
    allMeps.forEach(mep => {
        setDeselectEffect(mep);
        mep.visible = false;
    });
    // 设置园区显隐及样式
    allCampuses.forEach(campuse => {
        campuse.style.opacity = campuseOpacity;
        campuse.visible = campuseVisible;
        setDeselectEffect(campuse);
    });
    resetForEnterLevel();
    // 设置选择的机电孪生体显示及样式
    meps.forEach(mep => {
        mep.visible = true;
        mep.style.opacity = mepOpacity;
    });
    setSelectEffect(meps);
    return new Promise((resolve) => {
        // 回到园区
        app.level.change(allCampuses[0], {
            complete: () => {
                resolve(true);
            }
        });
    });
}

// 重置进入层级的一些效果
function resetForEnterLevel() {
    // 清除楼层效果
    if (floorToEnter) {
        floorToEnter.style.wireframe = false;
        floorToEnter.style.color = null;
    }
    // 清除楼房间效果
    if (roomToEnter) {
        roomToEnter.style.color = null;
    }
    // 清除设备效果
    if (thingToEnter) {
        thingToEnter.style.color = null;
    }
}
/**
 * 设置孪生体选中效果
 * @param {THING.BaseObject|Array<THING.BaseObject>} thing - 孪生体
 */
function setSelectEffect(things) {
    let finalThings = [];
    if (Array.isArray(things)) {
        finalThings = things;
    } else {
        finalThings = [things];
    }
    if (finalThings.length === 0) {
        return;
    }
    finalThings.forEach(thing => {
        thing.style.outlineColor = '#00ffff';
        thing.inheritStyle = false;
    });
    lastSelectThings = finalThings;
}

/**
 * 设置孪生体非选中效果
 * @param {THING.BaseObject|Array<THING.BaseObject>} thing - 孪生体
 */
function setDeselectEffect(things) {
    let finalThings = [];
    if (Array.isArray(things)) {
        finalThings = things;
    } else {
        finalThings = [things];
    }
    if (finalThings.length === 0) {
        return;
    }
    finalThings.forEach(thing => {
        thing.style.outlineColor = null;
        thing.inheritStyle = true;
    });
}

// 清空选择
function clearSelect() {
    setDeselectEffect(lastSelectThings);
    lastSelectThings = [];
}

// 设置摄像机最佳位置
function setCameraBestInfo() {
    app.camera.flyTo({
        position: [83.22891714137845, 82.51827274614821, 71.50806953488846],
        target: [-33.59148408351013, 14.1686293196705, -1.5083835512340025],
        time: 2000,
    })
}