/**
 * 说明：园区效果模板相关操作
 * 功能：效果模板添加，效果模板切换，效果模板清除，效果模板使用前后对比
 * 操作：点击按钮，查看效果
 */
let ctrl = null; // 模板控制器
let campus = null; // 园区对象
let lighting = null; // 灯光效果
let postEffect = null; // 后期设置
let skyEffect = null; // 天空盒
let background = null; // 背景
let modelData = null; // 模板数据
let modelDataUrl = ''; // 模板路径
let tempData = null; // 临时模板数据，在关闭模板后，再次开启效果时调用
let tempUrl = ''; // 临时模板路径，在关闭模板后，再次开启效果时调用
let groundVisible = true; // 特效地面是否显示
let particleVisible = true; // 特效粒子是否显示
let complate = null;// 效果模板对比类
let ctrl_name = null; // 效果模板名称

const app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory', // 园区路径
});

// 设置app背景为黑色
app.background = [0, 0, 0];
// 引用效果模板组件脚本
THING.Utils.dynamicLoad([
    'https://www.thingjs.com/static/plugins/thing.effect.min/1.4.0/EffectThemeControl.min.js',
], function () {
    app.on('load', function (ev) {
        app.level.change(ev.campus);
        lighting = app.lighting;
        postEffect = app.postEffect;
        skyEffect = app.skyBox;
        background = app.background;
        //关闭，进到室内自动切换天空盒  
        app.level.options['autoChangeBackground'] = false;

        initThingJsTip('本例程展示了效果模板的添加、切换和清除的操作，实现了效果模板使用与未使用的对比，点击左侧按钮进行体验')
        $('#all').css('top', '120px')
        //初始化
        var control = new THING.EffectThemeControl();
        app.addControl(control, '效果模板控制器');
        complate = new EffectThemeComplate();
        //获取模板控制器
        ctrl = app.getControl('效果模板控制器');
        THING.widget.Button('添加效果模板', effectThemeInit);
        THING.widget.Button('切换效果模板', effectThemeChange);
        THING.widget.Button('清除效果模板', function () {
            initThingJsTip('清除场景效果模板，初始化场景的灯光效果')
            removeModel(); // 移除模板
            ctrl_name = null; // 清空效果模板名称
        });
        THING.widget.Button('使用前后对比', effectThemeComplate);
    })
})
//添加效果模板
function effectThemeInit() {
    initThingJsTip('添加效果模板，当前效果模板名称为：第七颗星')
    firstEffectTheme()
}
//初始效果模板的加载
function firstEffectTheme() {
    THING.Utils.dynamicLoad([
        'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/6605/14905/static/frame.js'
    ], () => {
        // 效果模板A，由于底层会对数据更改，数据入参需深拷贝，但最好是由底层对入参进行深拷贝处理
        modelData = data; // 模板数据
        tempData = data;// 模板数据
        modelDataUrl = 'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/6605/14905/static'
        tempUrl = 'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/6605/14905/static'; // 模板包地址
        removeModel(); // 移除模板
        initEffectThemeControl(modelData, modelDataUrl); // 
        ctrl_name = '第七颗星'
    })
}
//想要切换的效果模板的加载
function secondEffectTheme() {
    THING.Utils.dynamicLoad([
        'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/4100/9277/static/frame.js'
    ], () => {
        // 效果模板B
        modelData = data // 模板数据
        tempData = data;// 模板数据
        modelDataUrl = 'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/4100/9277/static'
        tempUrl = 'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/4100/9277/static'; // 模板包地址
        removeModel(); // 移除模板
        initEffectThemeControl(modelData, modelDataUrl); // 应用模板
        ctrl_name = '源'
    })
}
//效果模板切换
function effectThemeChange() {
    complate.reset()
    if (tempUrl == 'https://prs-file.oss-cn-beijing.aliyuncs.com/product/resource/6605/14905/static') {
        secondEffectTheme()
        initThingJsTip('切换效果模板，当前效果模板名称为：源')
    } else {
        firstEffectTheme()
        initThingJsTip('切换效果模板，当前效果模板名称为：第七颗星')
    }
}
// 模板数据注册和应用
function initEffectThemeControl(modelData, modelDataUrl) {
    complate.reset()

    //注册模板,data是模板数据。如果是本地效果模板包，必须填第三个参数，该参数是模板包相对于该片代码的路径
    ctrl.registerTheme('default_parkbusiness', modelData, modelDataUrl);
    //获取园区
    campus = app.query('.Campus')[0];
    //应用效果模板
    campus.applyTheme('default_parkbusiness');
    ctrl.applyEffectTheme('default_parkbusiness', campus);
    ctrl.applyThemeEnvironment('default_parkbusiness', campus);
}
// 效果模板销毁
function removeModel() {
    complate.reset()
    // 销毁效果模板
    if (THING.ThemeManager.findStyle('default_parkbusiness')) {
        ctrl.destroyEffectTheme('default_parkbusiness', campus);
        campus.applyTheme(null);
        // 清除全局参数背景和天空盒
        app.skyBox = null;
        app.background = null;
        globalEffectConfig(lighting, postEffect, skyEffect, background);
        THING.App.current.off(THING.EventType.EnterLevel, null, 'ThemeEnterLevelToUpdateEnv');
    }
}
// 开启和关闭模板效果
function showModel(boolean) {
    if (boolean) {
        // 开启
        modelData = tempData; // 模板数据
        modelDataUrl = tempUrl; // 模板路径
        initEffectThemeControl(modelData, modelDataUrl); // 引用模板
    } else {
        // 关闭
        removeModel(); // 销毁模板
        // 关闭效果模板后全局参数设置为默认的
        globalEffectConfig(lighting, postEffect, skyEffect, background);
    }
}

// 全局效果配置参数
function globalEffectConfig(config, effectConfig, skyBox, background) {
    app.lighting = config; // 灯光效果
    app.postEffect = effectConfig; // 后期设置
    app.skyBox = skyBox; // 天空盒
    app.background = background; // 背景
}
// 效果模板对比
function effectThemeComplate() {
    if (!ctrl_name) {
        initThingJsTip('当前园区场景尚未存在效果模板')
        //return;
    } else {
        initThingJsTip('园区场景使用效果模板和未使用效果模板进行对比')
        removeModel(); // 移除模板
        globalEffectConfig(lighting, postEffect, skyEffect, background);
        let ctrl_url = THING.ThemeManager.findStyle('default_parkbusiness').resourcePrefix + '/frame.js'
        complate.createCampus02(ctrl_url, ctrl_name);
    }
}
//重置
function reset() {
    removeModel()
    globalEffectConfig(lighting, postEffect, skyEffect, background);
}
//效果模板对比
class EffectThemeComplate {
    constructor() {
        this.init()
    }
    init() {
        this.app2 = null;//
        this.win_width;//当前屏幕宽度
        this.win_height;//当前屏幕高度
        this.win_diff;
        this.win_name;//当前效果模板名称
    }
    createCampus02(ctrl_url, ctrl_name) {
        let _this = this;
        _this.win_name = ctrl_name;
        let campusurl = app.query('.Campus')[0].url;
        //记录底部3d渲染区域的大小
        let width = $('#div3d').children('div').eq(1).children('div').eq(0).width();
        let height = $('#div3d').children('div').eq(1).children('div').eq(0).height();
        $('#content').append(`<div id="contentbox" style="position: absolute;width: ` + width / 2 + `px;height: 100%;right: 0;overflow: hidden;top: 0;"></div>`)
        // 创建按钮
        //new THING.widget.Button('添加场景', function () {
        if ($('#div3d2').length) return;
        // 实际运行时 需要将div3d2 的样式 top值改至合适位置
        $('#contentbox').append(`<div id="div3d2" style="position:absolute;right:0;z-index:10;width:` + width + `px;height:` + height + `px;border:0px solid #FFF;"></div>`);
        _this.win_height = height;
        _this.win_width = width;
        //创建Thing  
        _this.app2 = new THING.App({
            'el': 'div3d2',
            url: campusurl,
            skyBox: null
        });
        _this.app2.on('load', function (ev2) {
            $('#div3d2').css({
                'position': 'absolute',
                'right': 0
            });
            $('#div3d2').css('left', '');

            _this.app2.background = '#000000';
            _this.app2.on(THING.EventType.EnterLevel, function () {
                _this.app2.skyBox = null;
                _this.app2.background = '#000000';
            });
            _this.app2.level.change(ev2.campus)

            _this.createLine()
            _this.moveLine()

            //初始化
            var control = new THING.EffectThemeControl();
            _this.app2.addControl(control, '效果模板控制器');
            //获取模板控制器
            var ctrl = _this.app2.getControl('效果模板控制器');
            //注册模板,data是模板数据。如果是本地效果模板包，必须填第三个参数，该参数是模板包相对于该片代码的路径
            ctrl.registerTheme('default_parkbusiness', data, ctrl_url.substr(0, 79));
            //获取园区
            let c = _this.app2.query('.Campus')[0];
            //应用效果模板
            c.applyTheme('default_parkbusiness');
            ctrl.applyEffectTheme('default_parkbusiness', c);
            ctrl.applyThemeEnvironment('default_parkbusiness', c);
            //  获取当前层级
            //app.level.current
            if (_this.app2.level.current.name != app.level.current.name) {
                _this.app2.level.change(_this.app2.query(object.name)[0])
            }
            if (app.camera.position != _this.app2.camera.position || app.camera.target != _this.app2.camera.target) {
                _this.app2.camera.position = app.camera.position;
                _this.app2.camera.target = app.camera.target;
            }


            //事件监听

            //  层级变化
            // {String} ev.level 当前层级标识枚举值 可通过 THING.LevelType 获取枚举值，如建筑层级标识为 THING.LevelType.Building
            // {THING.BaseObject} ev.object 当前层级对象（将要进入的层级对象）
            // {THING.BaseObject} ev.current 当前层级对象（将要进入的层级对象）
            // {THING.BaseObject} ev.previous 上一层级对象（离开的层级对象）
            app.on(THING.EventType.LevelChange, function (ev) {
                var object = ev.current;
                if (app.level.current.name == _this.app2.level.current.name) return;
                _this.app2.level.change(_this.app2.query(object.name)[0])
            });
            _this.app2.on(THING.EventType.LevelChange, function (ev) {
                var object = ev.current;
                if (app.level.current.name == _this.app2.level.current.name) return;
                app.level.change(app.query(object.name)[0])
            });

            //摄像机变化
            app.on(THING.EventType.CameraChange, function (ev) {
                let position = ev.position;
                let target = ev.target;
                if (position == _this.app2.camera.position && target == _this.app2.camera.target) return;
                _this.app2.camera.position = position;
                _this.app2.camera.target = target;
            });
            _this.app2.on(THING.EventType.CameraChange, function (ev) {
                let position = ev.position;
                let target = ev.target;
                if (position == app.camera.position && target == app.camera.target) return;
                app.camera.position = position;
                app.camera.target = target;
            });

            //窗口大小变化
            app.on(THING.EventType.Resize, function (ev) {
                let con_width = $('#content').width();
                $('#div3d2').width(ev.size[0])
                $('#div3d2').height(ev.size[1])
                let width = $('#contentbox').width();
                width = width * con_width / _this.win_width;
                $('#contentbox').width(width + 'px');
                $('#mouse_line')[0].style.right = (width - 18) + 'px';
                $('#text_html')[0].style.right = (width - 121) + 'px';
                $('#theme_name')[0].style.right = (width - 121) + 'px';
                _this.win_width = con_width;
            })

        })
    }

    //线框创建事件
    createLine() {
        let _this = this;
        //记录底部3d渲染区域的大小
        let width = $('#div3d').children('div').eq(1).children('div').eq(0).width();
        let height = $('#div3d').children('div').eq(1).children('div').eq(0).height();
        width = width / 2;
        let right = (width > 18) ? (width - 18) : (-17);
        let textright = (right == (-17)) ? (-120) : (width - 121)
        let html =
            `<div id="mouse_line" style="position: absolute;width:36px;height: 100%;z-index: 12;right: ` + right + `px;background:url('/uploads/wechat/oLX7p08F9tM3nicjM0YgUzYzIw50/file/效果模板示例/img/drag-line-w-h.png') 50% no-repeat;cursor: pointer;"></div>`
        $('#content').append($(html))
        let texthtml =
            `<div id="text_html" style="position:absolute;width:234px;height:50px;z-index:15;right: ` + textright + `px;font-size: 36px;font-weight: 600;color:#FFF;top:50px;">
                 <span>使用前</span>
                 <span>使用后</span>
             </div>`
        $('#content').append($(texthtml))
        let title =
            `<div id="theme_name" style="position:absolute;width:242px;height:50px;z-index:15;right: ` + textright + `px;font-size: 36px;font-weight: 600;color:#FFF;top:0px;text-align:center;">` + _this.win_name + `</div>`
        $('#content').append($(title))
    }
    //线框拖动事件
    moveLine() {
        let _this = this;
        //需要调整尺寸的div
        let c = document.getElementById('contentbox')
        let line = $('#mouse_line')
        const topText = document.querySelector('#text_html')
        const topBtn = document.querySelector('#mouse_line')
        const topBox = document.querySelector('#contentbox')
        const topName = document.querySelector('#theme_name')
        topBtn.addEventListener('mousedown', (event) => {
            document.onselectstart = function () { return false; }; //取消字段选择功能
            let startX = event.clientX;
            let width = topBox.offsetWidth
            const mousemove = (event) => {
                const diff = startX - event.clientX;
                _this.win_diff = diff;
                startX = event.clientX
                width = width + diff

                let right = (width > 18) ? (width - 36) : (-17);
                let textright = (right == (-17)) ? (-120) : (width - 139)
                topBox.style.width = (width - 18) + 'px'
                topBtn.style.right = right + 'px'
                topText.style.right = textright + 'px'
                topName.style.right = textright + 'px'
                _this.win_width = $('#content').width();
                if ($('#mouse_line')[0].style.right == '-17px') {
                    topBox.style.width = '0px';
                }
                if (parseInt($('#mouse_line')[0].style.right) >= ($('#content').width() - 45)) {
                    $('#mouse_line')[0].style.right = ($('#content').width() - 18) + 'px'
                    topBox.style.width = $('#content').width() + 'px'
                    topText.style.right = ($('#content').width() - 121) + 'px'
                    topName.style.right = ($('#content').width() - 121) + 'px'
                }

                const mouseup = () => {
                    window.removeEventListener('mousemove', mousemove)
                    window.removeEventListener('mouseup', mouseup)
                    document.onselectstart = function () { return true; }; //取消字段选择功能
                }
                window.addEventListener('mouseup', mouseup)
            }
            window.addEventListener('mousemove', mousemove)
        })

    }
    reset() {
        $('#contentbox').remove()
        $('#mouse_line').remove()
        $('#text_html').remove()
        $('#theme_name').remove()
    }
}