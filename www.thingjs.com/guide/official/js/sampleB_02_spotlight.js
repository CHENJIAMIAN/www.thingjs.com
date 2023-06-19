/**
 *@version 2.0
 * @author ThingJS
 * 说明：创建聚光灯
 *      通过 app.create 生成聚光灯，具体参数调节
 *      按住'shift' 聚光灯可以追踪鼠标位置(开启'跟随物体'后失效)
 * 备注：场景中聚光灯数量过多会影响渲染性能
 * 难度：★☆☆☆☆
*/

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then(() => {
    console.log(bundle.name);
    app.lighting = {
        mainLight: {
            intensity: 0
        }
    };
    // 获取场景内id为'car01' 和 'car02' 的叉车
    car1 = app.query('car01')[0];
    car2 = app.query('car02')[0];

    // 参数1: 在car2上方5米创建一个聚光灯
    // 参数2: 初始target设置为car1的位置
    createSpotLight(THING.Math.addVector(car2.position, [0, 5, 0]), car1.position);

    // 创建一个圆形路径
    var path = [];
    var radius = 6;
    for (var degree = 0; degree <= 360; degree += 10) {
        var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
        var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
        path.push(THING.Math.addVector(car1.position, [x, 0, z]));
    }
    // 让 car1 沿圆形路径运动
    car1.movePath(path, {
        orientToPath: true, // 物体移动时沿向路径方向
        time: 10 * 1000,
        loopType: THING.LoopType.Repeat // 循环类型
    });

    initThingJsTip("左侧面板可对灯光参数进行调整。按住 shift 键，聚光灯可追踪鼠标位置");
    $(".warninfo3").css("left", "55%");
})
var baseURL = "/guide/official/images/bluesky/";

const image = new THING.ImageTexture([
    baseURL + "posx.jpg",
    baseURL + "negx.jpg",
    baseURL + "posy.jpg",
    baseURL + "negy.jpg",
    baseURL + "posz.jpg",
    baseURL + "negz.jpg",
]);

// 设置环境图和背景图
app.envMap = image;
app.background = image;

// 参数
var dataObj = {
    'type': 'SpotLight',
    'lightAngle': 30,
    'intensity': 1,
    'penumbra': 0.5,
    'castShadow': false,
    'position': null,
    'height': 0,
    'color': 0xFFFFFF,
    'distance': null,
    'target': null,
    'helper.visible': true,
    'follow': true,
};
// 叉车
let car1;
let car2;
// 当前灯光
let curLight;
let curLightPosition;
// 创建聚光灯方法
function createSpotLight(position, target) {
    dataObj['lightAngle'] = 30;
    dataObj['intensity'] = 0.5;
    dataObj['penumbra'] = 0.5;
    dataObj['castShadow'] = false;
    dataObj['position'] = position;
    dataObj['distance'] = 25;
    dataObj['color'] = 0xFFFFFF;
    dataObj['helper.visible'] = true;
    dataObj['follow'] = true;
    //创建聚光灯
    var spotLight = new THING.SpotLight(dataObj);
    curLight = spotLight;
    curLightPosition = spotLight.position;
    createSpotLightControlPanel(spotLight);
    curLight.helper.visible = true;
    curLight.lookAt(car1, {
        always: true
    });
}

/**
 * 灯光控制面板
 */
function createSpotLightControlPanel() {
    var panel = new THING.widget.Panel({
        isDrag: true,
        titleText: "灯光参数调整",
        width: '260px',
        hasTitle: true
    });
    // 设置 panel 位置    
    panel.position = [10, 35];
    panel.addNumberSlider(dataObj, 'lightAngle').caption('灯光角度').step(1).min(0).max(180).isChangeValue(true).on('change', function (value) {
        curLight.angle = value;
    });
    panel.addNumberSlider(dataObj, 'intensity').caption('亮度').step(0.01).min(0).max(1).isChangeValue(true).on('change', function (value) {
        curLight.intensity = value;
    });
    panel.addNumberSlider(dataObj, 'penumbra').caption('半影').step(0.01).min(0).max(1).isChangeValue(true).on('change', function (value) {
        curLight.penumbra = value;
    });
    panel.addNumberSlider(dataObj, 'distance').caption('距离').step(0.1).min(0.1).max(200).isChangeValue(true).on('change', function (value) {
        curLight.distance = value;
    });
    panel.addNumberSlider(dataObj, 'height').caption('高度').step(0.1).min(0).max(200).isChangeValue(true).on('change', function (value) {
        curLight.position = [curLightPosition[0], curLightPosition[1] + value, curLightPosition[2]];
    });
    panel.addBoolean(dataObj, 'castShadow').caption('影子').on('change', function (value) {
        curLight.castShadow = value;
    });
    panel.addBoolean(dataObj, 'helper.visible').caption('辅助线').on('change', function (value) {
        curLight.helper.visible = value;

    });
    panel.addBoolean(dataObj, 'follow').caption('跟随物体').on('change', function (value) {
        if (value) {
            curLight.lookAt(car1, {
                always: true
            });
        } else {
            curLight.lookAt(null);
        }
    });
    panel.addColor(dataObj, 'color').caption('颜色').on('change', function (value) {
        curLight.color = value;
        curLight.helper.color = value;
        console.log(curLight.color)
    });

}
/**
 * 注册鼠标移动事件,检查是否按下'shift'键, 按下设置聚光灯跟随鼠标位置
 */
app.on('mousemove', function (ev) {
    if (!curLight) {
        return;
    }

    if (!ev.shiftKey) {
        return;
    }
    var pickedPosition = ev.pickedPosition;
    if (pickedPosition) {
        curLight.lookAt(pickedPosition, {
            always: true
        });
    }
})