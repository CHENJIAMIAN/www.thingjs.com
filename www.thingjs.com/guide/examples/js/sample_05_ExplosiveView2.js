/**
 * 说明：物体爆炸图2（指多个物体模型拆解展开的效果）
 *       多个物体模型要做爆炸图，对整个场景进行展开，可以将模型进行移动、添加事件等操作。
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/a7e682f79247d9043d9ba283'
});

var app = THING.App.current;
var curPosition;  // 初始摄像机位置
var curTarget;  // 初始摄像机目标点
var pipeLineObj = [];  // 所有模型
var pipeLineObjPart = [];  // 分区模型
var pipPos1 = [];  // 所有模型初始位置
var pipPosCur = [];  // 所有模型当前展开位置
var scoolTop = 0;  // 表示滚轮上移
var scoolBehi = 0;  // 表示滚轮下移
var heightDistance = 0.1;  // 垂直展开总间距
var heightExpendDis = 0;  // 垂直展开间距
var speedExpend = 1;  // 垂直展开速度
var addExpendDis = 0.1;  // 增加height
var addExpendDisSpe = 1;  // 增加speed
var shiftState = false;  // 键盘shift键开关

// 场景加载完成后执行
app.on('load', function (ev) {
    initThingJsTip("按住【Shift+鼠标滚轮】可以调节模型展开距离！<br/>单次展开距离/速度可通过输入数值改变大小！");
    $('#all').css('left','350px');
    $('#all').css('top','14px');
    new THING.widget.Button('初始化', function () {
        resetOri();
    });
    app.camera.yAngleLimited = [15, 60];  // 俯仰角度限制
    curPosition = app.camera.position;
    curTarget = app.camera.target;
    create();
})

/**
 * 创建
 */
function create() {
    let pipObjOriScene = app.query('["addName"="newScene"]');  // 查询所有模型
    if (pipObjOriScene.length > 0) {
        for (let i = 0; i < pipObjOriScene.length; i++) {
            if (pipObjOriScene[i] != null) {
                pipeLineObj.push(pipObjOriScene[i]);
                pipPos1[pipObjOriScene[i].id] = pipObjOriScene[i].position;  // 原始位置赋值
                pipPosCur[pipObjOriScene[i].id] = pipPos1[pipObjOriScene[i].id];  // 当前位置赋值
            }
        }
    }
    let cpoysc = app.query('#copyScene');
    if (cpoysc.length <= 0) return;
    cpoysc[0].style.opacity = 0.2;
    app.camera.enableZoom = true;
    app.camera.enablePan = true;
    scoolExpandDistanceHtml();  // 滚轮展开显示界面
    scoolExpandTo();  // 滚轮展开
}

/**
 * 滚轮展开显示页面
 */
function scoolExpandDistanceHtml() {
    let viewHeight =
            `<div id="viewHeight" class="viewHeight">
            <div class="mbf-data">
                <div class="viewHeight-title">滑轮展开距离：</div>
                <input class="heightDistance" type="text" value="`+ heightExpendDis + `" min="0.1" style="width:57px;background-color: transparent;color: #ffffff;border-style: none; text-align: right;">
                <div class="height">m</div>
            </div>
            <div class="mbf-data">
                <div class="viewHeight-title">单次展开距离：</div>
                <input class="heightInput" type="text" value="`+ addExpendDis + `" min="0.1" style="width:57px;background-color: transparent;color: #ffffff;border-style: none; text-align: right;">
                <div class="height">m</div>
            </div>
            <div class="mbf-data">
                <div class="moveSpeed-title">单次展开速度：</div>
                <input class="speedInput" type="text" value="`+ addExpendDisSpe + `" min="0.1" style="width:57px;background-color: transparent;color: #ffffff;border-style: none; text-align: right;">
                <div class="speed">m/s</div>
            </div> 
        </div>`;
    $('#div2d').append($(viewHeight));
    $('head').append($(`
        <style>
            .viewHeight {
                position: absolute;
                top: 10px;
                right: 20px;
                max-width: 230px;
                font-family: Open Sans, sans-serif;
                font-size: 18px;
                line-height: 17px;
                color: #fff;
                background: #00000080;
                padding: 4px;
            }
            .viewHeight div {
                display: inline-block;
                height: 25px;
                line-height: 25px;
                margin: 0;
                padding: 0;
            }
            .viewHeight input {
                width: 57px;
                background-color: transparent;
                color: #ffffff;
                text-align: right;
                border: none;
                outline:medium;
            }
        </style>
    `));
}

/**
 * 滚轮展开需要事件
 */
function scoolExpandTo() {
    app.on(THING.EventType.KeyDown, function (ev) {
        if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') {
            shiftState = true;  // 状态开关
        }
    }, '纵向按下Shift键');
    app.on(THING.EventType.KeyUp, function (ev) {
        if (ev.code == 'ShiftLeft' || ev.code == 'ShiftRight') {
            shiftState = false;
        }
    }, '纵向抬起Shift键');
    app.on(THING.EventType.MouseWheel, function (ev) {
        app.camera.enableRotate = true;
        if (shiftState == true) {
            app.camera.enableZoom = false;
            scoolBehi = 0;
            scoolTop = 0;
            if (ev.delta < 0) {  // 滚轮上移
                scoolTop = 1;
                heightDistance = parseFloat(addExpendDis);
                speedExpend = parseFloat(addExpendDisSpe);
                heightExpendDis += parseFloat(heightDistance);  // 展开总距离
                scoolWheelExpand(heightDistance, speedExpend);  // 滚轮移动
            } else if (ev.delta > 0) {  // 滚轮下移
                scoolBehi = 1;
                if (heightDistance > 0) {
                    heightDistance = parseFloat(addExpendDis);
                    speedExpend = parseFloat(addExpendDisSpe);
                    scoolWheelExpand(-(heightDistance), speedExpend);
                    heightExpendDis -= parseFloat(heightDistance);
                    if (heightExpendDis <= 0) {
                        heightExpendDis = 0;
                    }
                }
            }
            $('#viewHeight .heightDistance').val(parseFloat(heightExpendDis).toFixed(1));
        }
    }, '滑动滚轮改变间距')
    // 输入框限制输入只能输入数字，一个小数点
    $('#viewHeight .heightInput').on('input', function () {
        let setHeightVal = inputLimit($(this).val());
        $(this).val(setHeightVal);
    })
    $('#viewHeight .speedInput').on('input', function () {
        let setSpeedVal = inputLimit($(this).val());
        $(this).val(setSpeedVal);
    })
    // 输入框输入高度，按下回车进行赋值
    $('#viewHeight .heightInput').on('keydown', function (ev) {
        if (ev.keyCode == 13) {
            var height = $('#viewHeight .heightInput').val();
            if (height == '') {
                height = heightDistance;
            }
            height = parseFloat(height).toFixed(1);
            if (height < 0.1) {
                height = 0.1;
            }
            else if (height > 50) {
                height = 50.0;
            }
            addExpendDis = height;
            $('#viewHeight .heightInput').val(parseFloat(height).toFixed(1));
            $(this).blur();
        }
    })
    // 输入框输入速度，按下回车进行赋值
    $('#viewHeight .speedInput').on('keydown', function (ev) {
        if (ev.keyCode == 13) {
            var speed = $('#viewHeight .speedInput').val();
            if (speed == '') {
                speed = speedExpend;
            }
            speed = parseFloat(speed).toFixed(1);
            if (speed < 0.1) {
                speed = 0.1;
            } else if (speed > 50) {
                speed = 50.0;
            }
            addExpendDisSpe = speed;
            $('#viewHeight .speedInput').val(speed);
            $(this).blur();
        }
    })
    $('#viewHeight .speedInput').on('click', function () {
        $(this).select();
    })
    $('#viewHeight .heightInput').on('click', function () {
        $(this).select();
    })
    // 输入框输入高度，鼠标失去焦点进行赋值
    $('#viewHeight .heightInput').on('blur', function () {
        var height = $('#viewHeight .heightInput').val();
        if (height == '') {
            height = heightDistance;
        }
        height = parseFloat(height).toFixed(1);
        if (height < 0.1) {
            height = 0.1;
        } else if (height > 50) {
            height = 50.0;
        }
        addExpendDis = height;
        $('#viewHeight .heightInput').val(parseFloat(height).toFixed(1));
    })
    // 输入框输入速度，鼠标失去焦点进行赋值
    $('#viewHeight .speedInput').on('blur', function () {
        var speed = $('#viewHeight .speedInput').val();
        if (speed == '') {
            speed = speedExpend;
        }
        speed = parseFloat(speed).toFixed(1);
        if (speed < 0.1) {
            speed = 0.1;
        } else if (speed > 50) {
            speed = 50.0;
        }
        addExpendDisSpe = speed;
        $('#viewHeight .speedInput').val(speed);
    })

}

/**
 * 输入框限制条件
 */
function inputLimit(value) {
    let str = value + '';
    return str.match(/\-?\d+\.?\d{0,9}/, '');
}

/**
 * 滚轮散开
 */
function scoolWheelExpand(num, speed) {
    for (let i = 0; i < pipeLineObj.length; i++) {
        if (pipeLineObj[i] != null) {
            let obj = pipeLineObj[i];
            let objArea = obj.userData['addArea'];  // 分区显示当前展开的方向
            let offs;
            let offset0;  // left
            let offset1;  // behind
            let offset2;  // top
            if (objArea == 'areaRight') {
                offs = 1;
            } else if (objArea == 'areaLeft') {
                offs = -1;
            } else if (objArea == 'areaMid') {
                offs = 0;
            } else if (objArea == null) {
                offs = 2;
            }
            let objLevel = obj.userData['addLevel'];  // 分层显示当前展开的高度
            let lev = objLevel.slice(3);
            if (lev && offs != 2) {
                offset0 = offs * num * lev;
                offset1 = num * lev;
                offset2 = -1 * num * lev;
                obj.userData['offset'] = [offset0, offset1, offset2];
                let val = [offset0, offset1, offset2];
                // 各模型进行偏移，下移过程判断离地距离
                if (scoolBehi == 1 && pipPos1[obj.id][1] < obj.position[1]) {
                    if (obj.position[1] - pipPos1[obj.id][1] > heightDistance * lev) {
                        scoolruleobjOffset(obj, val, speed);
                    } else {  // 距离小于当前单次展开距离，回到原位
                        if (obj.position[1] - pipPos1[obj.id][1] > 0) {
                            obj.moveTo({
                                position: [pipPos1[obj.id][0], pipPos1[obj.id][1], pipPos1[obj.id][2]],
                                time: 500,
                                complete: function () {
                                    pipPosCur[obj.id] = obj.position;
                                    heightExpendDis = 0;
                                    $('#viewHeight .heightDistance').val(parseFloat(heightExpendDis).toFixed(1));
                                    app.camera.enableZoom = true;
                                }
                            });
                        }
                    }
                } else if (scoolTop == 1) {  // 各模型进行偏移，上移过程
                    scoolruleobjOffset(obj, val, speed);
                }
            }
        }
    }
}

/**
* 滚轮移动
*/
function scoolruleobjOffset(obj, value, speed) {
    if (!value || obj == null) return;
    obj.style.opacity = 1;
    let dist = THING.Math.getDistance(obj.position, value);
    if (speed != null) {
        speedExpend = speed;
    }
    let prePos = obj.position;
    // 展开时间
    let tine = dist / speedExpend * 10;
    obj.moveTo({
        // offsetPosition: value,
        position: [obj.position[0] + value[0], obj.position[1] + value[1], obj.position[2] + value[2]],
        time: tine,  // 移动完成需要的时间
        complete: function () {
            pipPosCur[obj.id] = obj.position;
            app.camera.enableZoom = true;
            // 特殊判断，如模型到原始位置下面，则回到原位置
            if (pipPos1[obj.id][1] > obj.position[1]) {
                obj.moveTo({
                    position: [pipPos1[obj.id][0], pipPos1[obj.id][1], pipPos1[obj.id][2]],
                    time: 500,  // 移动完成需要的时间
                    complete: function () {
                        pipPosCur[obj.id] = obj.position;
                        heightExpendDis = 0;
                        $('#viewHeight .heightDistance').val(parseFloat(heightExpendDis).toFixed(1));
                        app.camera.enableZoom = true;
                    }
                });
            }
        }
    });
}

/**
* 初始化
*/
function resetOri() {
    app.camera.flyTo({
        position: curPosition,
        target: curTarget,
        time: 1000,
        complete: function () {
        }
    });
    heightDistance = 0.1;  // 垂直展开间距
    heightExpendDis = 0;  // 垂直展开间距
    speedExpend = 1;  // 垂直展开速度
    addExpendDis = 0.1;  // 增加height
    addExpendDisSpe = 1;  // 增加speed
    scoolBehi = 0;
    scoolTop = 0;
    app.camera.enableRotate = true;
    app.camera.enableZoom = true;
    $('#viewHeight .heightDistance').val(0);
    for (let i = 0; i < pipeLineObj.length; i++) {
        if (pipeLineObj[i] != null) {
            pipeLineObj[i].position = pipPos1[pipeLineObj[i].id];
            pipPosCur[pipeLineObj[i].id] = pipPos1[pipeLineObj[i].id];
        }
    }
}