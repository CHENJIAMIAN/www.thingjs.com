/**
 * 说明：设置断点，辅助在线调试，ThingJS提供两种页面调试方法：
 *      1.和普通页面调试方法一样，直接打开F12在Sources里找到debug.js文件，在里面打断点进行调试；
 *      2.在代码里加入 “debugger” 关键字进行调试。
 * 操作：操作过程如下：
 *      1.在代码中加入 “debugger” 关键字；
 *      2.F12 打开后台；
 *      3.点击按钮运行代码；
 *      4.在控制台中查看断点位置。
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

// 加载场景后执行
app.on('load', function () {
    new THING.widget.Button('创建盒子', test_create_box);
});

/**
 * 添加按钮点击事件
*/
function test_create_box() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [13.387755902351577, 15.071091117119966, 24.252787493082046],
        'target': [-1.7380765465794725, 0.45861953018781015, -1.7875178625757955],
        'time': 1000,
        'complete': function () {
            debugger;  // 按下F12键，会在这里断点
            // 创建Box
            var box = app.create({
                type: 'Box',
                position: [0, 1, 0],
            });

        }
    });
}

// 创建提示
initThingJsTip(`ThingJS 支持设置断点，辅助在线调试，提供以下两种页面调试方法：<br>
    1.打开F12在Sources里找到debug.js文件，在里面打断点进行调试；<br>
    2.在代码里加入 “debugger” 关键字进行调试。<br>
    <br>
    打开F12后，点击创建盒子查看效果`);