/**
 * @version 2.0
 * @author ThingJS
 */
//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

document.title = 'Demo-建筑监控';

const baseURL = "https://static.3dmomoda.com/skybox/1d5ad8e9f580675ee5e7c7f7/";
const image = new THING.CubeTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);

app.envMap = image;
app.background = image;

// 加载场景后执行
var building = null;
var mainPanle;

var bundle = app.loadBundle('https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/uinnova');
bundle.waitForComplete().then(() => {
    building = app.query(".Building")[0];
    mainPanle = new MainPanel(app);// 界面的类
    setupNavpanel();
    app.levelManager.change(app.query('.Campus')[0])
})
// 注册 进入室外 事件
app.on('afterEnterOutdoorsLevel', function (ev) {
    building.facades[0].visible = true;  // 显示外立面

    var pos = building.position;
    app.camera.flyTo({
        position: [pos[0] + 3, pos[1] + 43.21, pos[2] + 80],
        target: pos,
        time: 1200
    });
});

// 注册 进入建筑 事件
app.on('afterEnterBuildingLevel', function (ev) {
    building.facades[0].visible = false; // 隐藏外立面
});

// 注册 进入楼层 事件
app.on('afterEnterFloorLevel', function (ev) {
    building.facades[0].visible = false; // 隐藏外立面
    var num = ev.state.floor.indexOfBuilding;
    var pos = building.position;
    app.camera.flyTo({
        position: [pos[0] - 3, pos[1] + 20.28 + (num - 1) * 2.5, pos[2] + 56],
        target: [pos[0], pos[1] + (num - 1) * 6, pos[2] + 15.76],
        time: 1200
    });
});

function initCSS(url) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    var heads = document.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(link);
    else
        document.documentElement.appendChild(link);
}

// 给导航面板添加点击事件
function setupNavpanel() {
    var navPanel = mainPanle.createNavPanel();
    navPanel.on('click', function (obj, target) { // 绑定 导航树 事件
        navPanel.highLight(target);
        if (obj == '全景') {
            app.levelManager.change(app.query('.Campus')[0])
        } else {
            if (obj.name.indexOf('层') > -1) {
                var num = obj.name.substring(0, 1);
                var floor = building.floors.objects[num];
                // navPanel.pathHighLight('全景.建筑.' + num + '层');
                app.levelManager.change(floor)
            } else {
                // navPanel.pathHighLight('全景.' + obj.name);
                app.levelManager.change(app.query('.Campus')[0])
            }
        }
    })
}
class MainPanel {
    constructor(app) {
        this.app = app;
        this.nav_tree = {   // 导航树对象
            buildings: [{ name: "建筑", floors: [{ name: "1层", }, { name: "2层", }, { name: "3层", }, { name: "4层", }, { name: "5层", }] }],
            outdoor: { name: '室外' }
        }

        this.toolBar = null;
        this.toolImgs = {};
        this.isExpandBuilding = false;

        this.createUIOnObjs();        // 创建 gui 面板
        this.createToolsPanel();

        this.building = app.query(".Building")[0];
    }

    // 创建导航面板
    createNavPanel() {
        var main_panel = new THING.widget.NavPanel();
        main_panel.setPosition(0, null, null, 0);  // 设置面板 位置 (left/bottom/right/top)
        main_panel.addAppTree('全景', this.nav_tree); // 创建导航树
        return main_panel;
    }

    // 创建工具面板
    createToolsPanel() {
        var that = this;
        var baseURL = "https://www.thingjs.com/static/images/uBuilding/";
        this.toolBar = THING.widget.ToolBar({ width: '164px', media: true });
        this.toolBar.data = { xfsx: false, pyfj: false, xfs: false, enterBuilding: false, expandBuilding: false };
        this.toolBar.setPosition({ right: 0, top: 60 });
        this.toolImgs.img0 = this.toolBar.addImageBoolean(this.toolBar.data, 'xfsx').name('消防水箱').imgUrl(baseURL + 'xfsx.png');
        this.toolImgs.img1 = this.toolBar.addImageBoolean(this.toolBar.data, 'pyfj').name('排烟风机').imgUrl(baseURL + 'pyfj.png');
        this.toolImgs.img2 = this.toolBar.addImageBoolean(this.toolBar.data, 'xfs').name('消防栓').imgUrl(baseURL + 'xfs.png');
        this.toolImgs.img3 = this.toolBar.addImageBoolean(this.toolBar.data, 'enterBuilding').name('进入建筑').imgUrl(baseURL + 'jz.png');
        this.toolImgs.img4 = this.toolBar.addImageBoolean(this.toolBar.data, 'expandBuilding').name('楼层展开').imgUrl(baseURL + 'zk.png');

        this.toolImgs.img0.on('change', function (boolValue) { that.onChangeImageButton('xfsx', boolValue); });
        this.toolImgs.img1.on('change', function (boolValue) { that.onChangeImageButton('pyfj', boolValue); });
        this.toolImgs.img2.on('change', function (boolValue) { that.onChangeImageButton('xfs', boolValue); });
        this.toolImgs.img3.on('change', function (boolValue) { that.onChangeImageButton('enterBuilding', boolValue); });
        this.toolImgs.img4.on('change', function (boolValue) { that.onChangeImageButton('expandBuilding', boolValue); });
    }

    // 处理工具条按钮
    onChangeImageButton(key, boolValue) {
        var that = this;
        if (key == "enterBuilding") { // 进入建筑/室外
            this.resetExpand();
            var name = boolValue ? '返回室外' : '进入建筑';
            this.toolImgs.img3.name(name);
            if (boolValue)
                this.app.levelManager.change(app.query('.Building')[0]);
            else
                this.app.levelManager.change(app.query('.Campus')[0]);

        } else if (key == "expandBuilding") { // 楼层横向展开
            this.app.levelManager.change(app.query('.Building')[0]); // 进入建筑
            if (boolValue) {
                this.building.expandFloors({
                    'time': 1000,
                    'length': 10,
                    'horzMode': false,
                    'hideRoof': true,
                    'complete': function () { that.isExpandBuilding = true; }
                })
            } else {
                this.building.unexpandFloors({
                    'time': 500,
                    'complete': function () { that.isExpandBuilding = false; }
                })
            }

        } else {
            this.resetExpand();
            this.app.levelManager.change(app.query('.Campus')[0]);// 进入室外
            if (key == "xfsx") { // 消防水箱
                let objs = app.query('[userData/物体类型 = "消防水箱"]');
                objs.forEach(obj => {
                    obj.css.visible = boolValue;
                });
            } else if (key == "pyfj") { // 排烟风机
                let objs = app.query('[userData/物体类型 = "排烟风机"]');
                objs.forEach(obj => {
                    obj.css.visible = boolValue;
                });
            } else if (key == "xfs") { // 消防栓
                let objs = app.query('[userData/物体类型 = "消防栓"]');
                objs.forEach(obj => {
                    obj.css.visible = boolValue;
                });
            }
        }
    }

    // 展开的楼层收回去
    resetExpand() {
        var that = this;
        if (this.isExpandBuilding) {
            this.toolBar.data.expandBuilding = false;
            this.building.unexpandFloors({
                'time': 500,
                'complete': function () { that.isExpandBuilding = false; }
            })
        }
    }

    // 根据不同类型创建样式
    createPanels(type) {
        var obj = {};
        var that = this;
        var gui = new THING.widget.Panel({ width: '120px', name: type, opacity: 0.8, cornerType: 's2c5', width: '150px', hasTitle: true });
        gui.remember(obj);
        gui.show(false);
        switch (type) {
            case "消防栓":
                obj = { hydraulicPressure: '0.14MPa' };
                gui.add(obj, 'hydraulicPressure').name('水压');
                break;
            case "消防水箱":
                obj = { waterlevel: '2.5米' };
                gui.add(obj, 'waterlevel').name('水位');
                break;
            case "排烟风机":
                obj = { state: '开' };
                gui.add(obj, 'state').name('状态');
                break;
        }
        return gui;
    }

    // 为3d物体添加面板
    createUIOnObj(objs) {
        var that = this;
        objs.forEach(function (obj) {
            obj.registerComponent(THING.DOM.CSS3DComponent, 'css');
            const css = obj.css;
            css.domElement = that.createPanels(obj.userData['物体类型']).domElement;
            css.pivot = [0.5, 0];
            css.autoUpdateVisible = true;
            css.visible = false;
            css.offset = [0, 1, 0];
            css.factor = 0.05;
            return css;
        })
    }

    // 收集需要加面板的 obj 并为其添加面板
    createUIOnObjs() {
        let xfsArr = app.query('[userData/物体类型 = "消防栓"]');
        this.createUIOnObj(xfsArr);
        let xfsxArr = app.query('[userData/物体类型 = "消防水箱"]');
        this.createUIOnObj(xfsxArr);
        let pyfjArr = app.query('[userData/物体类型 = "排烟风机"]');
        this.createUIOnObj(pyfjArr);
    }
}