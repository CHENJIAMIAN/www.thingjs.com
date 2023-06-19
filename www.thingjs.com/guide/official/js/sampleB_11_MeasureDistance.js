/**
 * @version 2.0
 * @author ThingJS
 * 说明：场景多点线段绘制并测距
 * 备注：单击鼠标左键添加点位，双击或单击鼠标右键结束
 * 难度：★★☆☆☆
 */

//  添加拖拽事件，拖拽结束会报错

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 加载场景并切换层级
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example");
bundle.waitForComplete().then(() => {
    const campus = bundle.campuses[0];
    if (campus) {
        // 加载样式文件
        THING.Utils.loadFile('/guide/examples/css/measure/panel.css', {
            load() {
                initThingJsTip("请单击【鼠标左键】添加点位，双击或单击【鼠标右键】结束！");

                // 设置摄像机位置
                app.camera.position = [0, 50, 50];
                // 设置摄像机目标点
                app.camera.target = [0, 0, 0];

                new InitConf();

            }
        })
    }
});
/**
 * 初始化类
 */
class InitConf {
    /**
     * 构造器
     */
    constructor() {
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.lineNum = 0;
        this.createHtml();
        this.iflag;
    }

    /**
     * 创建页面元素
     */
    createHtml() {
        var _this = this;
        // 测量详情界面
        let dataDetails =
            `<div id="dataDetails" class="tj-panel property-panel tj-has-title tj-sizable tj-property-panel tj-pinned" style="position: absolute; right: 10px; top: 130px; width: 315px; height: 416px; transform: none;">
                <div class="tj-close"></div>
                <div class="tj-title" style="cursor: move; user-select: none;">测量详情</div>
                <div class="tj-panel-body" style="padding-top: 0px;">
                    <div class="tj-panel-container tj-scroll-bar">
                        <table class="tj-table">
                            <div class="empty">暂无数据</div>
                        </table>
                    </div>
                </div>
            </div>`;
        $('#div2d').append(dataDetails);
        // 距离标识界面
        let marker =
            `<div id="marker" class="card" style="display: none;">
                <span class="text">总长 ： <span class="value" style ='color:#cf1b1b'>0</span>  米 <br>  单击继续,双击或右键结束</span>
            </div>`;
        $('#div3d').append(marker);
        // 鼠标滑入节点提示界面
        let pointMarker = `<div id="pointMarker" class="card-label" style="display: none;"><span class='text'>拖拽可调整位置</span></div>`;
        $('#div2d').append(pointMarker);
        _this.registerEvent();
    }

    /**
     * 注册事件
     */
    registerEvent() {
        var _this = this;
        // 注册测量详情界面关闭按钮点击事件
        $('#dataDetails .tj-close').on('click', function () {
            $('#dataDetails').css('display', 'none');
        });

        // 注册测量详情界面拖拽事件，设置可拖拽范围，不能超出屏幕
        $('#dataDetails .tj-title').on('mousedown', function (ev) {
            ev.preventDefault();
            var domEle = $('#dataDetails .tj-panel');
            var spacX = ev.pageX - domEle[0].offsetLeft;
            var spacY = ev.pageY - domEle[0].offsetTop;
            $(document).bind('mousemove', function (event) {
                var x = event.pageX - spacX;
                var y = event.pageY - spacY;
                if (event.pageX < 0 || event.pageX > $(window).width() || event.pageY < 0 || event.pageY > $(window).height()) {
                    $(document).unbind('mousemove');
                }
                if (x <= 0) x = 0;
                if (x > ($(window).width() - domEle.width())) {
                    x = $(window).width() - domEle.width();
                }
                if (y <= 0) y = 0;
                if (y > ($(window).height() - domEle.height())) {
                    y = $(window).height() - domEle.height();
                }
                domEle.css('left', x + 'px').css('top', y + 'px');
            });
        })
        $('#dataDetails .tj-title').on('mouseup', function () {
            $(document).unbind('mousemove');
        });

        // 注册单击事件，创建测距线段实例
        app.on(THING.EventType.Click, '*', function (e) {
            if (e.button == 0) {
                _this.lineNum++;
                let line = new DrawLine({
                    app: app,
                    modelNum: _this.lineNum,
                    currPosition: e.pickedPosition
                })
                app.pauseEvent(THING.EventType.Click, '*', '创建测距线');
            }
        }, "创建测距线");
    }
}

/**
 * 绘制测量线
 */
class DrawLine {
    /**
     * 构造器
     * @param {JSON} option - 构造参数
     */
    constructor(option) {
        this.opts = option;
        this.pointsArr = [this.opts.currPosition]; // 鼠标移动中坐标点的集合
        this.coordinatesArr = [this.opts.currPosition]; // 存储鼠标点击后坐标点的集合
        this.ePosition = null; // 存储触发事件后鼠标的位置
        this.lineCoor = [this.opts.currPosition]; // 存储当前两个坐标点
        this.disArr = []; // 存储所有坐标点与坐标点间的距离
        this.numIndex = 0; // 自增变量
        this.reSetDistance; // 存储两点间的距离
        this.lastStatus = false; // 判断是否绘制结束值为false为未结束true为结束
        this.pointsObjArr = [];
        this.rianleyDom = $('#marker'); // 跟随鼠标的提示
        this.pointCardDom = $('#pointMarker'); // 鼠标移动至节点的提示
        this.init(); // 初始化
        this.appClick(); // 调用方法

    }

    /**
     * 初始化创建起点
     */
    init() {
        var _this = this;
        let id = _this.opts.modelNum >= 10 ? _this.opts.modelNum : '0' + _this.opts.modelNum;
        _this.lineId = 'Line' + id;
        _this.template =
            `<div id="line` + _this.opts.modelNum + _this.numIndex + `" class="card-label card-line` + _this.opts.modelNum + `">
                <span class="text">
                    <span style="color:#f45905; border-right: 1px solid #ccc;margin-right: 5px">` + _this.lineId + `</span>
                    <span> 
                        <span style="color:#333"> 起点</span>
                        <img id="linePoints` + _this.opts.modelNum + _this.numIndex + `" src="/guide/examples/images/measure/remove.png">
                    </span>
                </span>
            </div>`;
        _this.boardId = 'line' + _this.opts.modelNum + _this.numIndex;
        _this.createPoint(_this.opts.currPosition);
        _this.createCard(_this.regionPoint);
        _this.pointsObj = {
            id: 'linePoints' + _this.opts.modelNum + _this.numIndex, // 起点顶牌span标签id
            parent: 'line' + _this.opts.modelNum + _this.numIndex, // 起点顶牌div标签id
            coor: _this.opts.currPosition, // 起点坐标
            distance: 0
        };
        _this.pointsObjArr.push(_this.pointsObj); // 将起点存储
        _this.cardClick();
    }

    /**
     * 注册事件
     */
    appClick() {
        var _this = this;

        // 点击左键添加节点右键结束绘制
        _this.opts.app.on('click', function (e) {
            if (e.button == 0) {
                if (e.pickedPosition == undefined) return;
                _this.numIndex++;
                _this.ePosition = e.pickedPosition;
                _this.createPoint(_this.ePosition);
                _this.coordinatesArr.push(_this.ePosition);
                _this.lineCoor.push(_this.ePosition);
                _this.createLine(_this.coordinatesArr);
                _this.getDistance();
                _this.template =
                    `<div id="line` + _this.opts.modelNum + _this.numIndex + `" class="card-label card-line` + _this.opts.modelNum + `">
                        <span class="text">`;
                if (_this.lineDistanceAll != null) {
                    _this.template += _this.lineDistanceAll + `米`;
                } else {
                    _this.template += `<span style="color:#f45905; border-right: 1px solid #ccc;margin-right: 5px">` + _this.lineId + `</span> 起点`
                }
                _this.template +=
                    `</span>
                    <span><img id="linePoints` + _this.opts.modelNum + _this.numIndex + `" src="/guide/examples/images/measure/remove.png"></span> 
                    </div>`;
                _this.boardId = 'line' + _this.opts.modelNum + _this.numIndex;
                _this.createCard(_this.regionPoint);
                if (_this.lineDistance != undefined) {
                    _this.pointsObj = {
                        id: 'linePoints' + _this.opts.modelNum + _this.numIndex,
                        parent: 'line' + _this.opts.modelNum + _this.numIndex,
                        coor: _this.ePosition,
                        distance: _this.lineDistance
                    }
                } else {
                    return;
                }

                _this.pointsObjArr.push(_this.pointsObj);
                _this.cardClick();
            } else {
                if (_this.coordinatesArr.length < 2) {
                    _this.destroyAll();
                    _this.rianleyDom.css('display', 'none');
                    return;
                };
                _this.end();
            }
            _this.rianleyDom.css('display', 'none');
        }, '点击');

        // 鼠标移动持续绘制测量线段
        _this.opts.app.on('mousemove', function (e) {
            if (e.pickedPosition != undefined) {
                _this.ePosition = e.pickedPosition;
                _this.pointsArr = [..._this.coordinatesArr, _this.ePosition];
                _this.createLine(_this.pointsArr);
                if (_this.line) {
                    _this.line.style.color = '#f88020';
                }
                if (_this.pointsArr.length >= 2) {
                    _this.moveDistance = THING.MathUtils.getDistance(_this.pointsArr[_this.pointsArr.length - 1], _this.pointsArr[_this.pointsArr.length - 2]);
                    let countNum = 0;
                    if (_this.disArr.length > 0) {
                        _this.disArr.forEach(v => {
                            countNum += parseFloat(v);
                        });
                    }
                    countNum = 1 * parseFloat(countNum).toFixed(2) + 1 * parseFloat(_this.moveDistance).toFixed(2);
                    _this.rianleyDom.find('span.value').text(countNum.toFixed(2));
                    let obj = e.object;
                    _this.rianleyDom.css({
                        'display': 'block',
                        'left': e.x + 10 + 'px',
                        'top': e.y + 'px'
                    });
                }
            }
        }, '移动');

        // 结束绘制当前测量线段
        _this.opts.app.on('dblclick', function (ev) {
            if (_this.coordinatesArr.length < 2) {
                _this.destroyAll();
                _this.rianleyDom.css('display', 'none');
                return;
            };
            _this.end();
        }, '双击');
    }

    /**
     * 创建节点
     * @param {Array} ePosition - 坐标点
     */
    createPoint(ePosition) {
        var _this = this;
        _this.regionPoint = new THING.Sphere({
            id: 'linePoints' + _this.opts.modelNum + _this.numIndex,
            name: 'linePoints' + _this.opts.modelNum,
            position: ePosition, // 球体坐标
            alwaysOnTop: true,
            style: {
                color: '#c10000',
                roughness: 50,
                opacity: 0.8
            }
        });
        _this.regionPoint.radius = 0.4;
    }

    /**
     * 创建线段
     * @param {Array} coordinates - 所有鼠标点击后的坐标点集合
     */
    createLine(coordinates) {
        let id = this.opts.modelNum >= 10 ? this.opts.modelNum : '0' + this.opts.modelNum;
        if (this.line) {
            this.line.destroy();
        }
        this.lineId = 'Line' + id;
        this.line = new THING.PolygonLine({
            name: 'line',
            id: 'Line' + id,
            radius: 0.05,
            points: coordinates,
            alwaysOnTop: true,
            style: {
                color: '#f45905',
                roughness: 5,
                opacity: 0.9
            }
        });

    }

    /**
     * 计算两个坐标点间的距离
     */
    getDistance() {
        if (this.lineCoor.length < 2) return;
        if (this.coordinatesArr.length > 2) {
            this.lineCoor.shift();
        }
        this.lineDistance = THING.MathUtils.getDistance(this.lineCoor[0], this.lineCoor[1]);
        this.lineDistance = this.lineDistance.toFixed(2);
        this.disArr.push(this.lineDistance);
        let countNum = 0;
        this.disArr.forEach(v => {
            countNum += parseFloat(v);
        });
        this.lineDistanceAll = countNum.toFixed(2);
    }

    /**
     * 创建节点顶牌
     * @param {Object} parent - 顶牌父物体
     */
    createCard(parent) {
        $('#div3d').append(this.template);
        this.imgElem = document.getElementById('linePoints' + this.opts.modelNum + this.numIndex);
        parent.registerComponent(THING.DOM.CSS2DComponent, 'css');
        const css = parent.css;
        css.domElement = document.getElementById(this.boardId);
        css.pivot = [0, 1];
        css.localPosition = [0.4, 0.3, 0.4];
        css.autoUpdateVisible = true;
        css.visible = true;
    }

    /**
     * 节点顶牌点击事件
     */
    cardClick() {
        var _this = this;
        _this.imgElem.onclick = function (ev) {
            ev.stopPropagation(); // 阻止事件冒泡
            if (this.id == _this.pointsObjArr[0].id) {
                // 点击删除起点
                if (_this.coordinatesArr.length < 3) {
                    _this.destroyAll();
                    _this.rianleyDom.css('display', 'none');
                    return;
                };
                _this.opts.app.query('#' + this.id).destroy();
                _this.removePanel();
                _this.pointsObjArr.shift();
                _this.coordinatesArr.shift();
                _this.createLine(_this.coordinatesArr);
                _this.disArr.shift();
                _this.changeText();
                let nodeId = _this.pointsObjArr[0].parent;
                $('#' + nodeId + ' .text').html(`<span style="color:#f45905;border-right: 1px solid #ccc;margin-right: 5px">` + _this.lineId + ` </span> 起点`);
                _this.changeVal();
                _this.panelText();
            } else if (this.id == _this.pointsObjArr[_this.pointsObjArr.length - 1].id) {
                // 点击删除终点
                if (_this.coordinatesArr.length < 3) {
                    _this.destroyAll();
                    _this.rianleyDom.css('display', 'none');
                    return;
                };

                _this.opts.app.query('#' + this.id).destroy();

                _this.removePanel();
                _this.pointsObjArr.pop();
                _this.coordinatesArr.pop();
                _this.createLine(_this.coordinatesArr);
                _this.disArr.pop();
                _this.lastStatus = false;
                _this.changeText();
                _this.panelText();
            } else {
                // 点击删除节点
                this.remove();
                _this.opts.app.query('#' + this.id).destroy();
                let id = this.id;
                let k0;
                let s = _this.pointsObjArr.find((v, k) => {
                    k0 = k;
                    return v.id == id;
                });
                _this.removePanel();
                _this.coordinatesArr.splice(k0, 1);
                _this.pointsObjArr.splice(k0, 1);
                _this.createLine(_this.coordinatesArr);
                _this.reSetDistance = THING.MathUtils.getDistance(_this.coordinatesArr[k0 - 1], _this.coordinatesArr[k0]);
                _this.reSetDistance = _this.reSetDistance.toFixed(2);
                _this.pointsObjArr[k0].distance = _this.reSetDistance;
                _this.disArr.splice(k0 - 1, 2, _this.reSetDistance);
                _this.changeVal();
                if (_this.lastStatus) {
                    _this.changeText();
                }
                _this.panelText();
            }
        }

        $('.card-label').on('click', function (ev) {
            ev.stopPropagation();
        });
    }

    /**
     * 节点拖拽事件
     * @param {Object} regionPoint - 当前绑定鼠标按下事件的节点
     */
    initDrag(regionPoint) {
        var _this = this;
        this.regionPoint = regionPoint;
        _this.dragId = this.regionPoint.id;
        _this.dragIndex;
        _this.pointsObjArr.forEach((v, k) => {
            if (v.id == _this.dragId) {
                _this.dragIndex = k;
            }
        });
        _this.opts.app.camera.enableRotate = false;
        console.log(this.regionPoint.type)
        console.log(_this.opts.app)
        this.regionPoint.addComponent(THING.EXTEND.DragComponent, 'drag', {
            outlineColor: "#ff0000",
        });

        var drag = this.regionPoint.drag;
        drag.enable = true;
        drag.dragStartFlag = true;

        let i = 0;

        // 鼠标移动判断节点的当前坐标改变测量线段和测量信息
        if (drag.dragStartFlag == true) {
            _this.opts.app.on('mouseenter', function () {
                _this.opts.app.on('mousemove', function () {
                    if (_this.dragIndex != undefined) {

                        i++;
                        _this.iflag = i;

                        let position = _this.regionPoint.position;
                        _this.coordinatesArr[_this.dragIndex] = position;
                        _this.pointsObjArr[_this.dragIndex].coor = position;
                        _this.createLine(_this.coordinatesArr); // 重新计算当前测量线段
                        if (_this.dragIndex > 0) {
                            let d = THING.MathUtils.getDistance(_this.coordinatesArr[_this.dragIndex], _this.coordinatesArr[_this.dragIndex - 1]);
                            _this.pointsObjArr[_this.dragIndex].distance = d;
                            _this.disArr[_this.dragIndex - 1] = d;
                        }
                        if (_this.dragIndex < _this.pointsObjArr.length - 1) {
                            let d = THING.MathUtils.getDistance(_this.coordinatesArr[_this.dragIndex + 1], _this.coordinatesArr[_this.dragIndex]);
                            _this.pointsObjArr[_this.dragIndex + 1].distance = d;
                            _this.disArr[_this.dragIndex] = d;
                        }
                        _this.changeVal(); // 更新节点顶牌数据
                        _this.changeText(); // 更新测量面板数据

                        // _this.removePanel();
                        // _this.panelText();
                    }
                }, '拖动节点');
            }, '可以拖动')
        }

        setTimeout(() => {
            if (_this.iflag == i) {
                console.log('11111')
                if (_this.regionPoint) {
                    _this.regionPoint.style.color = '#ff0000';
                }
                _this.opts.app.off('mousemove', null, '拖动节点');
                $('#div3d').css('cursor', 'default');
                _this.regionPoint.enable = false;
                _this.removePanel();
                _this.panelText();
                $('#polygonRegion' + this.opts.modelNum).children('span').text('占地面积: ' + this.areaNum.toFixed(2) + ' 平方米')
                _this.opts.app.camera.enableRotate = true;
            }
        }, 800)

        app.on('click', (ev) => {
            if (ev.button == 2 && drag.dragStartFlag == true) {
                if (_this.regionPoint) {
                    _this.regionPoint.style.color = '#ff0000';
                }
                _this.opts.app.off('mousemove', null, '拖动节点');
                _this.opts.app.off('mouseenter', null, '可以拖动');
                $('#div3d').css('cursor', 'default');
                _this.regionPoint.enable = false;
                _this.removePanel();
                _this.panelText();
                _this.opts.app.camera.enableRotate = true;
            }
        })

        // 拖拽结束
        if (drag.dragStartFlag == true) {
            _this.opts.app.on('mouseleave', function () {
                if (_this.regionPoint) {
                    _this.regionPoint.style.color = '#ff0000';
                }
                _this.opts.app.off('mousemove', null, '拖动节点');
                //_this.opts.app.off('mouseenter', null, '可以拖动');
                $('#div3d').css('cursor', 'default');
                _this.regionPoint.enable = false;
                _this.removePanel();
                _this.panelText();
                _this.opts.app.camera.enableRotate = true;
                //_this.opts.app.off('mousemove', null, '拖动节点');
            }, '结束拖动');
        }
    }

    /**
     * 更新终点顶牌内容
     */
    changeText() {
        var _this = this;
        let nodeId = _this.pointsObjArr[_this.pointsObjArr.length - 1].parent;
        _this.countNum = 0;
        _this.disArr.forEach(v => {
            _this.countNum += parseFloat(v);
        });
        _this.countNum = _this.countNum.toFixed(2);
        $('#' + nodeId + ' .text').text('共' + _this.countNum + ' 米');
        //出错
        if (!_this.lastStatus) {
            $('#' + nodeId).append(`<span><img class="destory" src="/guide/examples/images/measure/destroy.png"></span>`);
            $('.card-line' + _this.opts.modelNum + ' .destory').on('click', function (ev) {
                ev.stopPropagation();
                _this.destroyAll();
            })
        }
        _this.lastStatus = true;
    }

    /**
     * 为测量面板增加tbody标签存储当前测量信息
     */
    createPanel() {
        if ($('.empty')) {
            $('.empty').remove();
        }
        let tbody = `<tbody class="tj-group" id="tb-line` + this.opts.modelNum + `"></tbody>`;
        $('.tj-table').prepend(tbody);
        this.table = $('#tb-line' + this.opts.modelNum);
    }

    /**
     * 增添测量信息
     */
    panelText() {
        let th = `<tr class="tj-group-title"><td colspan="2"><i class="tj-icon"></i>ID :  ` + this.line.id + `</td></tr>`;
        this.table.prepend(th);
        this.dataObj = {
            text: [],
        };
        this.pointsObjArr.forEach((v, k) => {
            let a = v.coor.map(val => val.toFixed(3));
            this.dataObj = {
                text: '[' + a + ']'
            };
            let t;
            switch (true) {
                case k == 0:
                    t = '起点  ';
                    break;
                case 0 < k && k < this.pointsObjArr.length - 1:
                    t = '节点' + (1 * k);
                    break;
                case k == this.pointsObjArr.length - 1:
                    t = '终点  ';
                    break;
            }
            let tr =
                `<tr class="tj-group-content">
                    <td class="tj-key">` + t + `</td>
                    <td class="tj-value">` + this.dataObj.text + `</td>
                </tr>`;
            this.table.append(tr);
        })
        this.d = {
            text: this.countNum + ' 米'
        }
        let tr =
            `<tr class="tj-group-content">
                <td class="tj-key color">总长度 </td>
                <td class="tj-value">` + this.d.text + `</td>
            </tr>`
        this.table.append(tr);
    }

    /**
     * 移除为app绑定的事件
     */
    appOff() {
        this.opts.app.off('click', null, '点击');
        this.opts.app.off('mousemove', null, '移动');
        this.opts.app.off('dblclick', null, '双击');
    }

    /**
     * 销毁测量实例
     */
    destroyAll() {
        if (this.line) {
            this.line.destroy();
        }
        $('.card-line' + this.opts.modelNum).remove();
        this.opts.app.query('linePoints' + this.opts.modelNum).destroy();
        this.coordinatesArr = [];
        this.pointsArr = [];
        this.disArr = [];
        this.lineCoor = [];
        this.pointsObjArr = [];
        if (this.table) {
            this.removePanel();
            this.table.remove();
            if ($('.tj-table').html() == false) {
                $('.tj-table').append(`<div class="empty">暂无数据</div>`);
            }
        }
    }

    /**
     * 结束绘制
     */
    end() {
        var _this = this;
        _this.rianleyDom.css('display', 'none');
        _this.changeText();
        _this.appOff();
        _this.createLine(_this.coordinatesArr);
        $('.card-line' + _this.opts.modelNum).css('pointer-events', 'auto');
        _this.createPanel();
        _this.panelText();

        _this.pointEvent();
        setTimeout(() => {
            let p = app.query('linePoints' + _this.opts.modelNum);
            // 为节点绑定鼠标按下事件开启拖拽
            p.on(THING.EventType.MouseDown, function (e) {
                if (e.object) {
                    _this.initDrag(e.object);
                    _this.pointCardDom.css('display', 'none');
                }
            })
            _this.opts.app.resumeEvent(THING.EventType.Click, '*', '创建测距线');
        }, 500)
    }

    /**
     * 鼠标移入节点显示可拖拽提示
     */
    pointEvent() {
        var _this = this;
        let p = app.query('linePoints' + this.opts.modelNum);

        // 移入节点显示可拖拽提示信息
        p.on('MouseEnter', function (ev) {
            _this.currPoint = ev.object;
            _this.currPoint.style.outlineColor = '#fc8621';
            $('#div3d').css('cursor', 'pointer');
            _this.pointCardDom.css({
                'display': 'block',
                'left': ev.x + 5 + 'px',
                'top': ev.y + 10 + 'px'
            });
        })

        // 移出节点隐藏可拖拽提示信息
        p.on('MouseLeave', function (ev) {
            _this.currPoint.style.outlineColor = null;
            $('#div3d').css('cursor', 'default');
            _this.pointCardDom.css('display', 'none');
        })
    }

    /**
     * 改变顶牌内容
     */
    changeVal() {
        let count = 0;
        this.pointsObjArr.forEach((v, k) => {
            if (k > 0 && k < this.pointsObjArr.length - 1) {
                count = parseFloat(v.distance) + 1 * count;
                count = count.toFixed(2);
                let nodeId = v.parent;
                $('#' + nodeId + ' .text').text(count + '米');
            }
        })
    }

    /**
     * 删除测量数据
     */
    removePanel() {
        this.table.find('tr').remove();
    }
}