/**
 * 说明：物体爆炸图（指一个物体模型拆解展开的效果）
 *       一个物体模型要做爆炸图，可在3dmax建模时根据爆炸图拆分需要，定义并命名各子对象（或叫子
 *       模型、子节点）。这些子对象在ThingJS在线开发中可作为模型子节点来控制，这些子节点可像单
 *       独模型对象物体一样进行移动、添加事件等操作。
 * 备注：
 *       1. 标准ThingJS体系模型出于互动模型性能考虑，都要求在模型上传前做塌陷。经塌陷的模型不
 *          会再有子节点保留（融合掉细节，故性能较高）。因此只有确有类似上述分项控制模型局部要
 *          求的模型才应该保留子对象信息（不做塌陷），虽然这样模型性能较差，但确实是特殊需要。
 *       2. 拆分后模型子节点如果有多材质或点数超过上限在在线开发中会进行拆分，例如：3dmax命名
 *          一个子节点名字为“box”，由于该子节点使用了多种材质，该子节点在在线开发中会被命名成
 *          组，组内会被拆分并命名为“box_0”，“box_1”等对象。
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/406e419fae9000a47a4a8899'
});

// 发电机模型节点数据
var nodeObjData = {
    '1': { name: '机座', offset: [0, 0, -1] },
    '2': { name: '保护装置', offset: [0, -1, 0] },
    '3': { name: '电瓶', offset: [0, -1, 0] },
    '4': { name: '排气口', offset: [0, 0, 1] },
    '5_0': { name: '过滤器', offset: [0, 0, 1] },
    '5_1': { name: '过滤网', offset: [0.5, 0, 1] },
    '6': { name: '供给装置', offset: [0, 0, 1] },
    '7': { name: '烟囱', offset: [-1, 0, 0] },
    '8': { name: '发电机' },
    '9': { name: '控制器', offset: [0, 1, 0] }
}

var nodeJsonData = null;  // 发电机模型节点对象
var generatorObj = null;  // 发电机对象
var expandState = false;  // 发电机展开状态
var expandCount = 0;  // 发电机展开次数

// 场景加载完成后执行
app.on('load', function (ev) {
    initThingJsTip("物体爆炸图，指一个物体模型拆解展开的效果。一个物体模型要做爆炸图，可在3dmax建模时根据爆炸图拆分需要，定义并命名各子对象（或叫子模型、子节点）。这些子对象在ThingJS在线开发中可作为模型子节点来控制，这些子节点可像单独模型对象物体一样进行移动、添加事件等操作。"); 
    generatorObj = app.query('#generator')[0];  // 查询发电机对象
    nodeJsonData = getNode(generatorObj);  // 获取发电机模型节点对象

    // 创建测试按钮
    new THING.widget.Button('展开', expandObj);
    new THING.widget.Button('还原', unexpandObj);
    new THING.widget.Button('顶牌显示', createAllPanel);
    new THING.widget.Button('顶牌隐藏', hiddenAllPanel);

    // 设置摄像机位置和目标点
    app.camera.position = [8.607320990228896, 4.659529165486485, 2.463883920016444];
    app.camera.target = [5.457047915958038, 2.0011500043525103, -3.0191956945367244];


})

/**
 * 显示所有顶牌
 */
function createAllPanel() {
    for (let key in nodeObjData) {
        nodeJsonData[key].name = nodeObjData[key].name;
        createPanel(nodeJsonData[key]);
    }
}

/**
 * 隐藏所有顶牌
 */
function hiddenAllPanel() {
    for (let key in nodeObjData) {
        hiddenPanel(nodeJsonData[key]);
    }
}

/**
 * 展开物体
 */
function expandObj() {
    // 防止发电机在执行一次展开过程中多次点击
    if (expandState) {
        return;
    }
    expandState = true;
    expandCount++;
    for (let key in nodeObjData) {
        // 各子节点进行偏移
        objOffset(nodeJsonData[key], nodeObjData[key].offset);
    }
}

/**
 * 还原物体
 */
function unexpandObj() {
    // 展开次数为0，代表未展开
    if (expandCount == 0) return;
    for (let key in nodeObjData) {
        if (nodeObjData[key].offset) {
            // 计算还原时子节点需要进行的偏移量，数值为 -1 * 展开次数 * nodeObjData中定义的该子节点对应的偏移量
            let offsetValue = [-1 * expandCount * nodeObjData[key].offset[0], -1 * expandCount * nodeObjData[key].offset[1], -1 * expandCount * nodeObjData[key].offset[2]]
            objOffset(nodeJsonData[key], offsetValue);
        }
    }
    expandCount = 0;
}

/**
 * 获取节点对象
 */
function getNode(obj) {
    let nodeJson = {};
    // obj.subNodes 即可获取到一个物体的所有子节点
    for (let i = 0; i < obj.subNodes.length; i++) {
        let subnode = obj.subNodes[i];
        // 获取物体子节点对象中node属性的type值，只有当type值为Mesh时，才能对物体添加事件
        let type = subnode.node.type;
        if (type == 'Mesh') {
            nodeJson[subnode.name] = subnode;
        }
    }
    return nodeJson;
}

/**
 * 物体偏移
 */
function objOffset(obj, value) {
    if (!value) return;
    // 物体移动
    obj.moveTo({
        offsetPosition: value,  // 自身坐标系下的相对位置
        time: 500,  // 移动完成需要的时间
        complete: function () {
            expandState = false;
        }
    });
}

/**
 * 创建面板
 */
function createPanel(obj) {
    // 判断是否已经创建过面板，如果已创建，显示，否则创建面板
    var panel = obj.getAttribute('panel');
    if (panel != null) {
        panel.visible = true;
        return;
    }
    // 创建panel
    panel = new THING.widget.Panel({
        width: '100px',  // 设置面板宽度
        cornerType: 'polyline'  // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
    })
    panel.addString(obj, 'name').caption('');  // 绑定物体身上相应的属性数据
    // 创建UIAnchor面板
    var uiAnchor = app.create({
        type: 'UIAnchor',  // 类型
        parent: obj,  // 设置父物体
        element: panel.domElement,  // 要绑定的dom元素对象
        localPosition: [0, 0, 0],  // 设置 localPosition 为 [0, 0, 0]
        pivotPixel: [-16, 109]  // 相对于面板左上角的偏移像素值，当前用值是角标的中心点
    });
    // 更改面板文本样式
    $('.ThingJS_wrap .main .ThingJS_UI .ThingJS_string-value').css('text-align', 'center');
    obj.setAttribute('panel', uiAnchor);
}

/**
 * 隐藏面板
 */
function hiddenPanel(obj) {
    var panel = obj.getAttribute('panel');
    if (panel != null) {
        panel.visible = false;  // 设置面板隐藏
    }
}
