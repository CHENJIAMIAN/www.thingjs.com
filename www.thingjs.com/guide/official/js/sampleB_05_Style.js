/**
 * @version 2.0
 * @author ThingJS
 * 说明：设置物体的各种效果
 * 操作：点击按钮
 * 难度：★☆☆☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
var car;  // 目标对象
var carPosition;  // 小车初始位置
var box;  // 盒子
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    car = app.query('car01')[0];
    carPosition = car.position;
    initThingJsTip("含有 id、name、自定义属性的物体，可以设置颜色、透明度等；点击左侧按钮设置效果。");
    new THING.widget.Button('设置透明', setOpacity);
    new THING.widget.Button('设置颜色', setColor);
    new THING.widget.Button('设置闪烁', flash);
    new THING.widget.Button('设置勾边', setOutLine);
    new THING.widget.Button('设置隐藏', setFadeOut);
    new THING.widget.Button('创建盒子', createBox);
    new THING.widget.Button('设置贴图', setChartlet);
    new THING.widget.Button('设置缩放', setScale);
    new THING.widget.Button('设置线框', setWireframe);
    new THING.widget.Button('开启编辑', buttonCheck);
    new THING.widget.Button('重置', reset);
})

/**
 * 设置物体观察视角
 */
function flyThing() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [25.40218059546043, 8.474031370793389, 16.794082746506664],
        'target': [16.96829000043112, -0.0629300203459491, 2.737434817019496],
        'time': 1000,
        'complete': function () {
        }
    });
}

/**
 * 设置重置视角
 */
function flyRepeat() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.67799999999998, 61.72399999999999],
        'target': [1.646, 7.891, 4.445],
        'time': 1000,
        'complete': function () {
        }
    });
}

/**
 * 设置透明
 */
function setOpacity() {
    reset();
    flyThing();
    var opacity = car.style.opacity;  // 0 为全透明 ，1 为不透明
    if(opacity == null || opacity > 0.8){
        car.style.opacity = 0.5;
    }else {
       car.style.opacity = null; 
    }
    initThingJsTip("设置小车透明");  // 设置提示
}

/**
 * 设置颜色
 */
function setColor() {
    reset();
    flyThing();
    var color = car.style.color;  // 读取的颜色是十六进制大写
    if(color == null || color != '#FF0000'){
        car.style.color = '#ff0000';
    }else {
       car.style.color = '#00ff00'; 
    }
    initThingJsTip("设置小车颜色");  // 设置提示
}

/**
 * 设置闪烁
 */
function flash() {
    reset();
    flyThing();
    car.on('update', function () {
        car.style.opacity = 0.5 + 0.5 * Math.sin(2 * app.elapsedTime);
    }, '每帧改变透明度');
    initThingJsTip("设置小车闪烁");  // 设置提示
}

/**
 * 设置勾边
 */
function setOutLine() {
    reset();
    flyThing();
    car.style.outlineColor = '#0000ff';  // 设置勾边颜色
    initThingJsTip("设置小车勾边");  // 设置提示
}

/**
 * 设置隐藏/显示
 */
function setFadeOut() {
    reset();
    flyThing();
    // 获取按钮value值，进行改变
    var posInfo = document.querySelectorAll("#widget_root input");
    if (posInfo[4].value == "设置隐藏") {
        car.visible = false;
        initThingJsTip("设置小车隐藏");  // 设置提示
        posInfo[4].value = "设置显示";
    } else {
        car.visible = true;
        initThingJsTip("设置小车显示");  // 设置提示
        posInfo[4].value = "设置隐藏";
    }
}

/**
 * 创建一个盒子
 */
function createBox() {
    reset();
    flyThing();
    //创建一张纹理
    const boxMap = new THING.ImageTexture('official/images/uv_grid_opengl.jpg');
    box = new THING.Box({
        position: [19, 0.9, 8.5],
        id: 'myBox01',
        style: {
            image: boxMap
        }
    });
    initThingJsTip("创建一个盒子");  // 设置提示
}

/**
 * 设置贴图
 */
function setChartlet() {
    var newImg = new THING.ImageTexture('https://www.thingjs.com/static/images/avatar.png');
    if (box) {
        flyThing();
        box.style.image = newImg;
        initThingJsTip("设置盒子贴图");  // 设置提示
    } else {
        reset();
        initThingJsTip("请先点击按钮【创建盒子】");  // 设置提示
    }
}

/**
 * 设置缩放
 */
function setScale() {
    reset();
    flyThing();
    car.scale = [2, 2, 2];
    initThingJsTip("设置小车缩放");
}

/**
 * 设置线框
 */
function setWireframe() {
    reset();
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [21.5764606421159, 3.7727809806993635, 10.90469612687383],
        'target': [19.110501332387525, 1.388455023993677, 7.0471525315806804],
        'time': 2000,
        'complete': function () {
            car.style.wireframe = true; //给物体开启线框模式
            initThingJsTip("设置小车开启线框模式");
        }
    });
}

/**
 * 物体编辑
 */
function buttonCheck() {
    reset("edit");

    initThingJsTip("拖动控制轴，移动小车位置");  // 设置提示
    flyThing();
    var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
    if (posInfo[9].value == "开启编辑") {
        car.pickable = false;  // 防止拖动过程中获取时间坐标的时候，对位置进行重复拾取
        const component = new THING.EXTEND.TransformControlComponent();
        car.addComponent(component, 'dragAxis');
        posInfo[9].value = "关闭编辑";
    } else {
        car.removeComponent('dragAxis');  // 移除控制轴
        car.position = carPosition;
        posInfo[9].value = "开启编辑";
    }
}

/**
 * 重置
 */
function reset(type) {
    flyRepeat();
    var posInfo = document.querySelectorAll("#widget_root input");  // 获取按钮value值，进行改变
    if (posInfo[4].value == "设置隐藏") {
        posInfo[4].value == "设置显示"
    }

    car.visible = true;
    car.position = carPosition;
    car.style.opacity = 1.0;
    car.style.color = null;
    car.style.outlineColor = null;
    car.style.boundingBox = false;
    car.style.wireframe = false; //给物体开启线框模式
    car.off('update', null, '每帧改变透明度');  // 卸载事件

    car.scale = [1, 1, 1];

    if (box) box.destroy();

    if (type == "edit") return;

    if (car.hasComponent('dragAxis')) {
        car.removeComponent('dragAxis');  // 移除控制轴
        posInfo[9].value = "开启编辑";
    }
    initThingJsTip("含有 id、name、自定义属性的物体，可以设置颜色、透明度等；点击左侧按钮设置效果。");
}