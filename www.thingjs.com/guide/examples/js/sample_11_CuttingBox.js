/**
 * 说明：剖切盒
 * 操作：
 *       1. 点击显示/隐藏剖切盒。
 *       2. 拖拽剖切盒的每个剖切面，可对选定的对象进行剖切。
 * 备注：
 *       1. 请确保需要顶牌的物体自定义属性列表中包含该示例运行后顶牌信息详情面板中的属性。
 *       2. 请确保ThingJS版本为1.2.7.13及以上。
 * 难度：★☆☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'models/uinnova',
    skyBox: 'BlueSky'
});

// 引入资源文件
THING.Utils.dynamicLoad([
    '/guide/examples/plugins/cuttingbox/cuttingBox.min.v0.1.0.js',  // 剖切盒脚本
],
    function () {
        // 加载完成事件 
        app.on('load', function (ev) {
            // 设置摄像机位置和目标点
            app.camera.position = [12.381987189259789, 35.70039578315924, 90.09563419485903];
            app.camera.target = [-31.69618343165883, 4.873235854917229, 14.203971365975518];

            // 获取剖切对象，此处选取场景中的建筑
            var obj = app.query('.Building')[0];
            obj.pickable = false;  // 设置建筑不可被拾取
            obj.floors.visible = true;  // 设置建筑的楼层显示
            obj.renderOrder = 10;  // 设置建筑的渲染顺序
            // 初始化剖切盒类
            var cutBoxClass = new CuttingBox({
                object: obj
            })
            // 剖切面显示或隐藏状态
            var state = true;  

            new THING.widget.Button('显示/隐藏剖切盒', function () {
                app.query('["物体类型"= "消防水箱"]').visible = false;  // 剖切时隐藏消防水箱
                app.query('["物体类型"= "排烟风机"]').visible = false;  // 剖切时隐藏排烟风机
                cutBoxClass.showOrHiddenArrow(state);  // 显示/隐藏剖切盒
                state = !state;
            })

            new THING.widget.Button('重置', function () {
                // 摄像机飞行到某位置
                app.camera.flyTo({
                    'position': [12.381987189259789, 35.70039578315924, 90.09563419485903],
                    'target': [-31.69618343165883, 4.873235854917229, 14.203971365975518],
                    'time': 1500,
                    'complete': function () {}
                });

                app.query('["物体类型"= "消防水箱"]').visible = true;  // 重置时显示消防水箱
                app.query('["物体类型"= "排烟风机"]').visible = true;  // 重置时显示排烟风机

                cutBoxClass.resetClippingPlane();  // 重置剖切盒
            })
        });
    },
    true,  // 选填，是否带时间戳
    true  // 选填，是否按顺序下载
)

// 创建提示
initThingJsTip("本例程展示了剖切盒功能，添加左侧按钮点击显示剖切盒，拖拽剖切盒的每个剖切面对应白色模型，可对选定的对象进行剖切。");