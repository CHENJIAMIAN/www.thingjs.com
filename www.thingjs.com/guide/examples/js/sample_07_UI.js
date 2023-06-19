/**
 * 说明：展示平台内置界面
 * 功能：UI界面，Widget面板，UIAnchor，Panel面板，工具面板，Tab+表格，进度条，移除组件
 * 操作：点击按钮，查看效果
 * 难度：★★☆☆☆
 */
 var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',
    background: '#000000',
    env: 'Seaside',
});
var uiAnchorPanel;
app.on('load', function(ev) {
    app.level.change(ev.campus);
    new THING.widget.Button('创建UI界面', () => {
        reset();
        new CreateUI();
    });
    new THING.widget.Button('创建Widget面板', () => {
        reset();
        new CreateWidget();
    });
    new THING.widget.Button('创建UIAnchor', () => {
        reset();
        uiAnchorPanel = new CreateUIAnchor();
    });
    new THING.widget.Button('创建Panel面板', () => {
        reset();
        new CreatePanel();
    });
    new THING.widget.Button('创建工具面板', () => {
        reset();
        new CreateTool();
    });
    new THING.widget.Button('创建Tab+表格', () => {
        reset();
        new CreateTabTable();
    });
    new THING.widget.Button('创建进度条', () => {
        reset();
        new CreateSlider();
    });
    new THING.widget.Button('重置', () => {
        reset();
    });
    initThingJsTip("本例程展示了平台内置的界面，点击按钮，查看效果");
})

/**
 * 创建UI界面
 */
class CreateUI {
    constructor() {
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        var _this = this;
        var template =
            `<div class="uiPanel" style='position:absolute;right:20px;top:20px;padding: 8px;width:100px;text-align: center;background: rgba(0,0,0,0.5);'>
      <p id="p1" style='color:white'>Hello World!</p>
      <button id="uiBtn" style='margin:4px;padding:4px'>Into Level</button>
      </div>`;
        // 插入到 ThingJS 内置的 2D 界面 div 中
        $('#div2d').append($(template));

        $("#uiBtn").on('click', function() {
            _this.changeLevel();
        })

        _this.clickEvent();

        var tip = `利用模板字符串创建一个 2D 界面，并将其添加到页面中。<br>
              1.点击场景中的物体，页面中的文字显示所点击的物体名称<br>
              2.点击页面中的按钮，进入相应物体的层级，进入层级后，右键返回上一级`
        initThingJsTip(tip);
    }

    /**
     * 添加点击事件
     */
    clickEvent() {
        var _this = this;

        app.on(THING.EventType.SingleClick, function(ev) {
            if (ev.picked && ev.object) {
                var obj = ev.object;
                var name = obj.name;

                document.getElementById("p1").innerHTML = name;
            }
        })
    }

    /**
     * 进入指定层级
     */
    changeLevel() {
        var value = document.getElementById("p1").innerHTML;
        var obj = app.query(value)[0];
        if (obj) {
            app.level.change(obj);
        }
    }
}

/**
 * 创建Widget面板
 */
class CreateWidget {
    constructor() {
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        // 界面组件
        this.panel = new THING.widget.Panel({
            titleText: '我是标题', // 可通过font标签设置标题颜色 例如：'<font color="red">我是红色标题</font>'
            closeIcon: true, // 是否有关闭按钮
            dragable: true, // 是否可拖拽
            retractable: true, // 是否可收缩
            opacity: 0.9, // 设置透明度
            hasTitle: true, // 设置标题
            zIndex: 999 // 设置层级
        });

        // 面板定位
        // 左上角——TL/topleft，左下角——BL/bottomleft
        // 右上角——TR/topright，右下角——BR/bottomright
        this.panel.position = ['100%', 0];
        this.panel.positionOrigin = 'TR';

        this.addData();

        initThingJsTip('创建widget面板');
    }

    /**
     * 绑定数据
     */
    addData() {
        var _this = this;
        // 创建数据对象
        var dataObj = {
            pressure: '0.14MPa',
            temperature: '21°C',
            checkbox: { '设备1': false, '设备2': false, '设备3': true, '设备4': true },
            radio: '摄像头01',
            open: true,
            height: 10,
            iframe: 'https://www.thingjs.com/guide/'
        };

        // 加载字符型组件
        var press = _this.panel.addString(dataObj, 'pressure').caption('水压').isChangeValue(true);
        // 可通过font标签设置 组件caption颜色
        var water = _this.panel.addString(dataObj, 'temperature').caption('<font color="red">水温</font>').isChangeValue(true);
        // 加载复选框组件
        var check = _this.panel.addCheckbox(dataObj, 'checkbox').caption({ "设备2": "设备2(rename)" });
        // 复选框需逐个添加change事件
        check[0].on('change', function(ev) {
            console.log(ev);
        });
        check[1].on('change', function(ev) {
            console.log(ev);
        })
        // 加载单选框组件
        var radio = _this.panel.addRadio(dataObj, 'radio', ['摄像头01', '摄像头02']);
        radio.on('change', function(ev) {
            console.log(ev);
        })
        // 加载开关组件（适用于Boolean类型数据）
        var open1 = _this.panel.addBoolean(dataObj, 'open').caption('开关01');
        open1.on('change', function(ev) {
            console.log(ev);
        })
        // 加载数字组件
        var height = _this.panel.addNumber(dataObj, 'height').caption('高度');
        // 加载iframe组件
        var iframe = _this.panel.addIframe(dataObj, 'iframe').caption('视频');
        // 设置iframe高度
        iframe.setHeight("250px");

        // 组件可通过 remove 移除
        // _this.panel.remove(height);
    }
}

/**
 * 创建 UIAnchor
 */
class CreateUIAnchor {
    constructor() {
        this.ui = null;
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        var _this = this;
        var template =
            `<div class="sign" id="board" style="font-size: 12px;width: 120px;text-align: center;background-color: rgba(0, 0, 0, .6);border: 3px solid #eeeeee;border-radius: 8px;color: #eee;position: absolute;top: 0;left: 0;z-index: 10;display: none;">
    <div class="s1" style="margin: 5px 0px 5px 0px;line-height: 32px;overflow: hidden;">
      <span class="span-l icon" style="float: left;width: 30px;height: 30px;background:url(https://www.thingjs.com/static/images/example/hydrant.png) no-repeat center;margin: 1px 1px 1px 5px;"></span>
      <span class="span-l font" style="float: left;margin: 0px 0px 0px 3px;">物体</span>
      <span class="span-r point" style="float: right;width: 12px;height: 12px;background-color: #18EB20;border-radius: 50%;margin: 10px 5px 10px 0px;"></span>
    </div>
    <div class="s2" style="margin: 5px 0px 10px 0px;line-height: 18px;font-size: 10px;overflow: hidden;">
      <span class="span-l font1" style="float: left;margin: 0px 10px 0px 10px;">数值</span>
      <span class="span-l font2" style="float: left;width: 70px;background-color: #2480E3;">0.14MPa</span>
    </div>
    <div class="point-top" style="position: absolute;top: -7px;right: -7px;background-color: #3F6781;width: 10px;height: 10px;border: 3px solid #eee;border-radius: 50%;"></div>
  </div>`
        $('#div3d').append($(template));

        this.test_create_ui();

        initThingJsTip('创建界面元素，作为UIAnchor连接到物体上，使其能跟随物体');
    }

    /**
     * 创建UIAnchor
     */
    test_create_ui() {
        var _this = this;
        _this.ui = app.create({
            type: 'UIAnchor',
            parent: app.query('car02')[0],
            element: _this.create_element(),
            localPosition: [0, 2, 0],
            pivot: [0.5, 1] //  [0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
        });
    }

    /**
     * 创建dom元素
     */
    create_element() {
        var srcElem = document.getElementById('board');
        var newElem = srcElem.cloneNode(true);
        newElem.style.display = "block";
        app.domElement.insertBefore(newElem, srcElem);
        return newElem;
    }
}

/**
 * 创建Panel面板
 */
class CreatePanel {
    constructor() {
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        var obj = app.query('car01')[0];
        // 创建widget (绑定数据用)
        var panel = new THING.widget.Panel({
            // 设置面板宽度
            width: '150px',
            // cornerType 角标样式
            // 没有角标 none ，没有线的角标 noline ，折线角标 polyline
            cornerType: 'polyline'

        })

        // 绑定物体身上相应的属性数据
        panel.addString(obj, 'name').caption('名称');
        panel.addString(obj.userData, 'power').caption('马力');

        // 创建UIAnchor面板
        var uiAnchor = app.create({
            // 类型
            type: 'UIAnchor',
            // 父节点设置
            parent: obj,
            // 要绑定的页面的 element 对象
            element: panel.domElement,
            // 设置 localPosition 为 [0, 0, 0]
            localPosition: [0, 0, 0],
            // 相对于Element左上角的偏移像素值
            pivotPixel: [-16, 109] // 当前用值是角标的中心点
        });

        initThingJsTip('用快捷界面库 给物体添加UIAnchor');
    }
}

/**
 * 创建工具条面板
 */
class CreateTool {
    constructor() {
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        // 创建工具条
        // 可添加 captionPos 参数：设置 caption 显示方式设置为鼠标 hover 后显示
        this.toolbar = new THING.widget.Panel({ width: '165px' });
        this.toolbar.position = ['100%', 0];
        this.toolbar.positionOrigin = "TR";

        this.addData();

        initThingJsTip('Widget工具面板');
    }

    /**
     * 绑定数据
     */
    addData() {
        // 引入图片文件
        var baseURL = "https://www.thingjs.com/static/images/sliohouse/";
        // 数据对象
        var dataObj = {
            warehouseCode: true,
            temperature: false,
            humidity: false,
            statistics: false,
            status: false,
            insect: false,
            cerealsReserve: false,
            video: false,
            cloud: true,
            orientation: false
        }

        var button0 = this.toolbar.addImageBoolean(dataObj, 'warehouseCode').caption('仓库编号').imgUrl(baseURL + 'warehouse_code.png'); // 可通过font标签 设置caption颜色
        var button1 = this.toolbar.addImageBoolean(dataObj, 'temperature').caption('<font color="red">温度检测</font>').imgUrl(baseURL + 'temperature.png');
        var button2 = this.toolbar.addImageBoolean(dataObj, 'humidity').caption('湿度检测').imgUrl(baseURL + 'humidity.png');
        var button3 = this.toolbar.addImageBoolean(dataObj, 'statistics').caption('能耗统计').imgUrl(baseURL + 'statistics.png');
        var button4 = this.toolbar.addImageBoolean(dataObj, 'status').caption('保粮状态').imgUrl(baseURL + 'cereals_reserves.png');
        var button5 = this.toolbar.addImageBoolean(dataObj, 'cerealsReserve').caption('视屏监控').imgUrl(baseURL + 'video.png');
        // 绑定回调
        button0.on('change', function(ev) {
            // 返回boolean值
            console.log(ev);

            var car = app.query('car01')[0];
            car.visible = ev;
        });
    }
}

/**
 * 创建Tab面板+表格
 */
class CreateTabTable {
    constructor() {
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        // Tab面板 + 表格
        this.panel01 = THING.widget.Panel({
            titleText: 'Tab+表格',
            width: '330px',
            hasTitle: true
        });
        this.panel01.position = ['100%', 10];
        this.panel01.positionOrigin = 'TR';

        this.addData();

        initThingJsTip('创建Tab 面板 + 表格');
    }

    /**
     * 绑定数据
     */
    addData() {
        // 定义 Tab 面板标签页数据
        var tabData = {
            'Tab01': {},
            'Tab02': {},
            'Tab03': {}
        };
        // 定义各标签页中的 数据表格 数据
        var tablesData = {
            'Tab01': {
                props: ['名称', '参数', '时间', '状态'],
                items: [{
                        "名称": 'I1',
                        "参数": '120MP',
                        "时间": '2018.02.24',
                        '状态': '启用'
                    },
                    {
                        "名称": 'I2',
                        "参数": '120MP',
                        "时间": '2018.02.24',
                        '状态': '启用'
                    },
                    {
                        "名称": 'I3',
                        "参数": '120MP',
                        "时间": '2018.02.24',
                        '状态': '启用'
                    }
                ]
            },
            'Tab02': {
                props: ['名称2', '参数2', '时间2', '状态2'],
                items: [{
                        "名称2": 'I12',
                        "参数2": '120MP',
                        "时间2": '2018.02.24',
                        '状态2': '启用'
                    },
                    {
                        "名称2": 'I22',
                        "参数2": '120MP',
                        "时间2": '2018.02.24',
                        '状态2': '启用'
                    },
                    {
                        "名称2": 'I32',
                        "参数2": '120MP',
                        "时间2": '2018.02.24',
                        '状态2': '启用'
                    }
                ]
            },
            'Tab03': {
                props: ['名称3', '参数3', '时间3', '状态3'],
                items: [{
                        "名称3": 'I12',
                        "参数3": '120MP',
                        "时间3": '2018.02.24',
                        '状态3': '启用'
                    },
                    {
                        "名称3": 'I22',
                        "参数3": '120MP',
                        "时间3": '2018.02.24',
                        '状态3': '启用'
                    },
                    {
                        "名称3": 'I32',
                        "参数3": '120MP',
                        "时间3": '2018.02.24',
                        '状态3': '启用'
                    }
                ]
            },
        }

        var tab = this.panel01.addTab(tabData); // 向 Panel 中添加 Tab 标签页

        for (var key in tablesData) {
            this.panel01.addTable(tablesData[key]).link(key); // 通过 link 向 Tab 标签页中 关联表格
        }
    }
}

/**
 * 创建进度条
 */
class CreateSlider {
    constructor() {
        this.init();
    }

    /**
     * 初始化面板
     */
    init() {
        // 创建数值型进度条
        this.panel1 = new THING.widget.Panel({
            titleText: "数值型进度条",
            width: '300px',
            hasTitle: true
        });
        this.panel1.position = ['100%', 0];
        this.panel1.positionOrigin = "TR";

        // 添加导航型进度条
        this.panel2 = new THING.widget.Panel({
            titleText: "导航型进度条",
            width: '300px',
            hasTitle: true
        });

        // 面板定位
        this.panel2.position = ['100%', 300];
        this.panel2.positionOrigin = "TR";

        this.addData();

        initThingJsTip("Widget进度条");
    }

    /**
     * 绑定数据
     */
    addData() {
        var dataObj = {
            '海拔': 86,
            '气温': 0,
            '人口数量': 40,
            '人口比例': 40,
            'progress': 2,
        };
        this.panel1.addNumberSlider(dataObj, '海拔').step(1).min(0).max(123).isChangeValue(true);
        // isChangeValue 可与进度条交互滑动
        this.panel1.addNumberSlider(dataObj, '气温').step(1).min(-20).max(40).isChangeValue(true).on('change', function(value) {
            console.log('气温 ' + value);
        });
        this.panel1.addNumberSlider(dataObj, '人口数量').step(1).min(0).max(123).isChangeValue(true);
        // isPercentage 将绝对数值转为百分比
        this.panel1.addNumberSlider(dataObj, '人口比例').step(1).min(0).max(123).isChangeValue(true).isPercentage(true);
        this.panel2.addProgress(dataObj, 'progress', [
            { name: '2号楼', describe: '教学楼' },
            { name: '3号楼', describe: '实验楼' },
            { name: '5号楼', describe: '室内篮球场' },
            { name: '餐厅', describe: '五星级' },
            { name: '大讲堂', describe: '开讲了' }
        ]).on('change', function(id) {
            console.log(id);
        });
    }
}

/**
 * 重置
 */
function reset() {
    $(".ThingJS_wrap").remove(); // 移除面板
    $(".uiPanel").remove(); // 移除UI界面

    if (uiAnchorPanel && uiAnchorPanel.ui) {
        uiAnchorPanel.ui.destroy(); // 移除UIAnchor
        uiAnchorPanel.ui = null;
    }

    initThingJsTip("本例程展示了平台内置的界面，点击按钮，查看效果");
}