/**
 * 说明：剖切面
 * 操作：
 *       1. 点击显示/隐藏剖切面。
 *       2. 拖拽剖切面，可对选定的对象进行剖切。
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/612295eeb12ce31c334210e1'
});

var building = null; // 剖切建筑对象
var isShow = false; // 当前是否开启了剖切盒
var cuttingArrow = null; // 剖切面方向箭头
var cuttingPlane = null; // 剖切面
var cuttingBoxOptions = {
    initPos: null, // 剖切面和方向箭头的初始位置
    planeWidth: 0, // 剖切面宽度
    planeHeight: 0, // 剖切面高度
    currentHeight: 0, // 剖切面当前高度
    minHeight: 0, // 剖切面可移动的最小高度
    maxHeight: 10 // 剖切面可移动的最大高度
}
var mouseOptions = {
    mouseY: null // 鼠标移动的纵向距离
};

// 加载完成事件
app.on('load', function(ev) {
    init();
    new THING.widget.Button('显示/隐藏剖切面', function() {
        if (isShow == false) {
            cuttingArrow.visible = true;
        } else {
            cuttingArrow.visible = false;
        }
        isShow = !isShow;
    })

    new THING.widget.Button('重置', function() {
        reset();
    })
});

/**
 * 初始化
 */
function init() {
    // 设置摄像机位置
    app.camera.position = [37.958474718130375, 27.255865639067196, 38.96902499236722];
    // 设置摄像机目标点
    app.camera.target = [6.984652814581285, -0.21721015307283464, -0.3424517719423009];

    // 获取要进行剖切的建筑，能查询到的对象均可
    building = app.query('#107')[0];
    // 设置进行剖切的建筑不可拾取
    building.pickable = false;
    // 设置进行剖切的建筑内部楼层
    building.floors.visible = true;
    // 获取剖切对象包围盒
    let boundingBox = building.boundingBox;
    let boundingBoxCenter = boundingBox.center;
    let boundingBoxMax = boundingBox.max;
    let boundingBoxMin = boundingBox.min;
    // 剖切面的宽高
    cuttingBoxOptions.planeWidth = boundingBoxMax[0] - boundingBoxMin[0];
    cuttingBoxOptions.planeHeight = boundingBoxMax[2] - boundingBoxMin[2];
    // 剖切面的初始位置，为防止撕面现象，将y值增加0.02
    cuttingBoxOptions.initPos = [boundingBoxCenter[0], boundingBoxMax[1] + 0.02, boundingBoxCenter[2]];
    cuttingBoxOptions.currentHeight = cuttingBoxOptions.maxHeight = boundingBoxMax[1] + 0.02;
    cuttingBoxOptions.minHeight = boundingBoxMin[1] - 0.02;
    // 初始剖切
    building.setClippingPlanes({
        height: cuttingBoxOptions.currentHeight, // 剖切高度
        direction: [0, -1, 0] // 剖切方向
    });
    create(); // 创建剖切面和方向箭头
}

/**
 * 创建方向箭头和剖切面
 */
function create() {
    if (cuttingArrow == null) {
        // 为解决箭头模型加载慢，在场景中防止了一个id为arrow的箭头模型
        let objectArr = app.query('#arrow');
        if (objectArr.length > 0) {
            cuttingArrow = objectArr[0];
            cuttingArrow.position = cuttingBoxOptions.initPos;
            registerEvent();
        } else {
            // 如果场景中未找到方向箭头，创建方向箭头
            cuttingArrow = app.create({
                type: 'Thing', // 类型
                id: 'arrow', // id
                url: '/api/models/5ff9ae7331e742d0bf572be34e86f651/0/gltf/', // 模型地址
                position: cuttingBoxOptions.initPos, // 位置
                complete: function() {
                    registerEvent();
                }
            });
        }
        cuttingArrow.visible = false;
    }

    if (cuttingPlane == null) {
        // 创建剖切面
        cuttingPlane = app.create({
            type: 'Plane', // 类型
            id: 'plane', // id
            width: cuttingBoxOptions.planeWidth, // 宽度
            height: cuttingBoxOptions.planeHeight, // 高度
            parent: cuttingArrow, // 设置父物体为创建的方向箭头
            style: {
                color: '#11DAB7', // 颜色
                opacity: 0.2, // 透明度
                doubleSide: true, // 双面渲染
                boundingBox: true, // 包围盒
                boundingBoxColor: '#11DAB7' // 包围盒颜色
            }
        })
        cuttingPlane.rotateX(-90); // 绕X轴旋转-90°
        cuttingPlane.pickable = false; // 设置不可拾取
        cuttingPlane.inheritPickable = false; // 设置拾取状态不受父物体影响
        cuttingPlane.inheritScale = false; // 设置缩放不受父物体影响
    }
}

/**
 * 注册事件
 */
function registerEvent() {
    if (cuttingArrow == null) return;
    // 鼠标划入方向箭头事件
    cuttingArrow.on('mouseenter', function() {
        $(document.body).css('cursor', 'grab');
        cuttingPlane.style.opacity = 0.5;
        cuttingArrow.scale = [1.5, 1.5, 1.5];
    }, '鼠标滑入方向箭头');

    // 鼠标移出方向箭头事件
    cuttingArrow.on('mouseleave', function() {
        $(document.body).css('cursor', 'default');
        cuttingPlane.style.opacity = 0.2;
        cuttingArrow.scale = [1, 1, 1];
    }, '鼠标滑出方向箭头');

    // 方向箭头绑定鼠标左键按下事件
    cuttingArrow.on('mousedown', function(ev) {
        if (ev.button == 0) {
            $(document.body).css('cursor', 'grabbing');
            app.camera.enableRotate = false; // 关闭摄像机默认旋转事件
            mouseOptions.mouseY = ev.clientY;
            let regionPosY = 0; // 记录鼠标移动过程中每次距离的差值
            // 全局绑定鼠标移动事件
            $(document).on('mousemove', function(ev) {
                let arrowPos = cuttingArrow.position; // 箭头位置
                regionPosY = (ev.clientY - mouseOptions.mouseY) * -0.06559600243077846;
                let h = cuttingBoxOptions.currentHeight + regionPosY;
                mouseOptions.mouseY = ev.clientY; // 记录此时的鼠标屏幕坐标的纵坐标
                if (h <= cuttingBoxOptions.minHeight) {
                    cuttingBoxOptions.currentHeight = cuttingBoxOptions.minHeight;
                } else if (h >= cuttingBoxOptions.maxHeight) {
                    cuttingBoxOptions.currentHeight = cuttingBoxOptions.maxHeight;
                } else {
                    cuttingBoxOptions.currentHeight = h;
                }
                // 设置箭头位置
                cuttingArrow.position = [arrowPos[0], cuttingBoxOptions.currentHeight, arrowPos[2]];
                // 进行剖切
                building.setClippingPlanes({
                    height: cuttingBoxOptions.currentHeight, // 剖切高度
                    direction: [0, -1, 0] // 剖切方向
                });
            })
        }
    }, '方向箭头鼠标左键按下');

    // 全局绑定鼠标抬起事件
    $(document).on('mouseup', function() {
        app.camera.enableRotate = true; // 开启摄像机默认旋转事件
        $(document).unbind('mousemove'); // 解绑鼠标移动事件
        $(document.body).css('cursor', 'default'); // 设置鼠标样式
    })
}

/**
 * 重置
 */
function reset() {
    // 清除剖切
    building.clearClippingPlanes();
    isShow = false;
    cuttingBoxOptions.currentHeight = cuttingBoxOptions.maxHeight;
    cuttingPlane.visible = false;
    cuttingArrow.visible = false;
    // 摄像机飞到初始视角
    app.camera.flyTo({
        position: [37.958474718130375, 27.255865639067196, 38.96902499236722],
        target: [6.984652814581285, -0.21721015307283464, -0.3424517719423009],
        time: 500
    });

}

// 创建提示
initThingJsTip("本例程展示了剖切面功能，添加左侧按钮显示剖切面，拖拽剖切面顶部白色模型，可对选定的对象进行剖切。");