/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:42:26
 * @LastEditTime: 2021-11-26 16:49:52
 * @LastEditors: Please set LastEditors
 */
var app, skyEffect, postEffect, effect;
var _manageSamplePoint = null;
var _themeStyle = 'vs-dark';
var oldOutline; // 场景信息勾边对象
var oldOutlineVisible; // 场景信息勾边对象显隐状态
var oldFlyTo; // 场景信息定位对象
var oldFlyToVisible; // 场景信息定位对象显隐状态
var sceneCameraPosition; // 场景信息摄像机镜头位置
var sceneCameraTarget; // 场景信息摄像机目标点位置
var sceneLevelCurrent; // 场景信息当前层级
var LIMIT = 8; //多文件打开数量限制
var jsnums; //项目个数限制
var thumbState = true;//面板中图钉的状态
var storeThumbState = true;//面板中图钉的状态
var teamInfo = {//协作项目文件状态
    otherOccupyFile:null,
    selfOccupyFile:null,
    selfleaderTeamProList:[]
}
var layout={
    nav:{
        visible:true,
        width:'300px',
        height: '100%',
        top: '',
        left: '0px',
    },
    sample:{
        visible:true,
        width: 'calc(100% - 300px)',
        height: '100%',
        top: '',
        left: '300px',
        content:{
            middle:{
                visible:true,
                width:'50%',
                height: '60px',
                top: '0px',
                left: '0px',
            },
            editor:{
                visible:true,
                width:'50%',
                height: 'calc(100% - 96px)',
                top: '60px',
                left: '',
            },
            browser:{
                visible:true,
                width:'50%',
                height: '100%',
                top: '',
                left: '',
                content:{
                    iframe:{
                        visible:true,
                        width:'100%',
                        height:'calc(85% - 30px + 1px)',
                        top: '',
                        left: '',
                        newWindow:false
                    },
                    log:{
                        visible:true,
                        width:'100%',
                        height:'15%',
                        top: '',
                        left: '',
                        bottom:'',
                        newLogWindow:false
                    }
                }
            },
            editorvs:{
                visible:true
            }
        }
    }
};
const THINGJSSAMPLE={
    samSearchRefresh(e, type) {
        let SearchRefreshType = type ? +type : $(".content-nav .tab .tab-ul .active").attr('data-index');
        var event = e || window.event;
        event.stopPropagation();
        var _this=this;
        var prevload=new Promise(function (resolve, reject) {
            $('.sam-search .refresh').removeClass('gira');
            var load=document.createElement('div');
            $('body.template-demos').append($(load));
            $(load).css({
                'position':'fixed',
                'top':'0',
                'left':'0',
                'width':'100%',
                'height':'100%',
                'background':'rgba(0, 0, 0, 0.26)',
                'z-index':'121'
            }).html('<img src="/guide/image/loading2.gif" style="position: relative; top: 46%; left: 45%; width: 50px; height: 50px;">');
        $('.sam-search .refresh').addClass('gira');
            resolve(load);
        });
        var loadXhr = new Promise(function (resolve, reject) {
            if (SearchRefreshType == 0) { // 如果为官方
                const API_URL = '/guide/examples/examples.js';
                const DOM_ID = '#list0';
                _this.samSearchRefreshApi(API_URL, DOM_ID);
            } else if (SearchRefreshType == 2) { // 如果为v2.0
                const API_URL = '/guide/official/examples.js';
                const DOM_ID = '#list2';
                _this.samSearchRefreshApi(API_URL, DOM_ID);
            } else if (SearchRefreshType == 1) { 
                // 刷新项目库
                _this.domyfile().then(res=>{
                    if ($('#bfilen').data('url')) { // 如果有打开的项目，刷新打开的项目
                        // refreshSpecFile(); 
                        loadOpen($('#bfilen'), $('#bfilen').data('nameBefore'), $('#bfilen').data('url'), '', false) // 加载本项目
                        $('ul>li.lifileResoure.lifile[data-url="'+$('#bfilen').data('url')+'"]').addClass('active');
                    }
                })
            }
            resolve(true);
        });
        prevload.then(load=>{
            loadXhr.then(res=>{
                setTimeout(() => $('.sam-search .refresh').removeClass('gira'), 1000);
                setTimeout(() => $(load).remove(), 1000);
            }).catch(e=>{
                setTimeout(() => $('.sam-search .refresh').removeClass('gira'), 1000);
                setTimeout(() => $(load).remove(), 1000);
            })
        });
    },
    // 刷新请求目录数据
    samSearchRefreshApi(url, id) {
        var _this = this;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            async: false,
            success: function (res) {
                if (res) {
                    let pattern = new RegExp(/\[(.|\n|\r)*?\s+\]/g);
                    let data = eval("(" + res.match(pattern)[0] + ")")
                    let ul_list = template('demos_temp1', {
                        data
                    });
                    $(id).html(ul_list);
                    _this.sampleSecondlevel();
                }
            },
            error: function (e) {
                console.log(e, "请求e")
            }
        })
    },
    // 在线开发目录二级菜单初始化
    sampleSecondlevel() {
        var oul = document.getElementById('list0');
        var oH4 = oul.getElementsByClassName('p-title');
        var aul = oul.getElementsByTagName('ul');
        var aulList = [];
        for (var i = 0, oh4Len = oH4.length; i < oh4Len; i++) {
            aulList.push(aul[i]);
            oH4[i].index = i;
            oH4[i].onclick = function () {
                var _this = this.index;
                // console.log(_this);
                for (var h = 0; h < aulList.length; h++) {
                    if (h != _this) {
                        // aulList[h].style.display = 'none';
                        // $(aulList[h]).slideUp();
                        // oH4[h].className = 'p-title';
                    } else {
                        //如果当前的ul是关闭的，则展开，否则关闭
                        if (this.className == 'p-title') {
                            if (oH4[_this].id == 'jzk_vip') {
                                if (!isLogin('enter', 'openMenu')) return;
                                if (!checkUserAuth()) return newAlert('“VIP专栏”仅对VIP用户开放', 'warning');
                            }
                            // aul[_this].style.display = 'block';
                            $(aulList[h]).slideDown();
                            oH4[_this].className = 'p-title active';
                            // if (_this < 12) {
                            //     $(oul).scrollTop(46 * (_this - 3));
                            // } else {
                            //     $(oul).scrollTop(46 * (_this + 1));
                            // }
                        } else {
                            // aul[_this].style.display = 'none';
                            $(aul[_this]).slideUp();
                            oH4[_this].className = 'p-title';
                        }
                    }
                }
            }
        }
        var oul1 = document.getElementById('list2');
        var oH41 = oul1.getElementsByClassName('p-title');
        var aul1 = oul1.getElementsByTagName('ul');
        var aulList1 = [];
        for (var i = 0, oh4Len1 = oH41.length; i < oh4Len1; i++) {
            aulList1.push(aul1[i]);
            oH41[i].index = i;
            oH41[i].onclick = function () {
                var _this = this.index;
                // console.log(_this);
                for (var h = 0; h < aulList1.length; h++) {
                    if (h != _this) {
                        // aulList[h].style.display = 'none';
                        // $(aulList[h]).slideUp();
                        // oH4[h].className = 'p-title';
                    } else {
                        //如果当前的ul是关闭的，则展开，否则关闭
                        if (this.className == 'p-title') {
                            $(aulList1[h]).slideDown();
                            oH41[_this].className = 'p-title active';
                        } else {
                            $(aul1[_this]).slideUp();
                            oH41[_this].className = 'p-title';
                        }
                    }
                }
            }
        }
    },
    // 获取我的项目
    domyfile(){
        var file = new Promise(function (resolve, reject) {
            var uname = getUserName('name');
            if(uname) {
                $.ajax({
                    url: "/api/files",
                    dataType: "json",
                    type: "get",
                    async: false,
                    success: function (data) {
                        data = data.fileAllMenu;
                        $('#list1').html("");
                        myfilename = {
                            fileName: [],
                            ProName: [],
                            resourceDir: [],
                            teamName:[],
                            pdtlist:[],
                            prolist:[]
                        };
                        if (data.length == 0) initSam();
                        data.forEach(v => {
                            if (v.isPro) {
                                myfilename.prolist.push(v);
                            } else {
                                myfilename.pdtlist.push(v);
}
                            myfilename.resourceDir.push(v.name);
                        });
                        myfilename.prolist.sort(sortProjectTime);
                        typeinit();
                        initFileTrash();
                        initTeamProject();
                        var quickdtData=checkQuickDt();
                        myfilename.quickdtData=quickdtData;
                        var decorData = checkDecor();
                        myfilename.decorData=decorData;
                        let proNum = pdtNum = 0;
                        proNum=myfilename.prolist.length;
                        pdtNum=myfilename.pdtlist.length;
                        for (var i = 0; i < myfilename.pdtlist.length; i++) {
                            var item=myfilename.pdtlist[i];
                            var filesname = item.pname||item.name;
                            myfilename.fileName.push(filesname);
                            // 1 项目名称 2 项目地址 3 版本 4 是否公开 5 项目（3协作开发 ）6 “0” 7 文件最后保存时间 8 quickDt项目 9 配饰项目
                            if(item.pname||item.modifytime||item.leaderid) {
                                // 协作项目
                                myfileinit(item.pname, item.path, "", 0, 3, 0,item.modifytime, quickdtData, '', decorData)
                            } else {
                                myfileinit(filesname, item.url, item.version, item.isOpen, 0, 0, item.time, quickdtData, '', decorData);
                            }
                        }
                        for (var i = 0; i < myfilename.prolist.length; i++) {
                            var item=myfilename.prolist[i];
                            var filesname = item.pname||item.name;
                            myfilename.ProName.push(filesname);
                            myfileinit(filesname, item.url, item.version, item.isOpen, 1, 0, item.time, quickdtData, '', decorData);                    
                        }
                        if ($('#bfilen').is(':visible') && $('#gf').is(':hidden')) {
                            reloadIframe();
                        }
                        $('#list1 .proLi .proTitle').append("<label class='_num'>(" + proNum + ")</label>");
                        if($('#list1 .pdtLi .pdtTitle i.icon.previewProduct').length) {
                            $('#list1 .pdtLi .pdtTitle i.icon.previewProduct').before("<label class='_num aa'>(" + (pdtNum) + ")</label>");
                        } else {
                            $('#list1 .pdtLi .pdtTitle').append("<label class='_num'>(" + (pdtNum ) + ")</label>");
                        }
                        initTrashNum();
                        resourceSize();
                    }
                }) 
            }
            resolve(true);
        });
        return file;
    }
}
const PERMISSIONCONFIG={
    data:{
        "\u79bb\u7ebf\u90e8\u7f72\uff08\u6c38\u4e45\uff09\u6253\u5305\u6388\u6743":false,
        "\u0043\u0061\u006d\u0070\u0075\u0073\u0042\u0075\u0069\u006c\u0064\u0065\u0072\u005f\u004f\u006e\u006c\u0069\u006e\u0065\u6388\u6743":false,
        "\u0051\u0043\u0068\u0061\u0072\u0074\u5185\u6d4b\u7248":false,
        "\u0061\u0070\u0069\u5185\u6d4b":false,
        "\u0062\u0075\u0069\u006c\u0064\u0065\u0072\u0050\u0072\u006f":false,
        "\u4e0b\u8f7d\u79bb\u7ebf\u90e8\u7f72\u5305":false,
        "\u4e0b\u8f7d\u9879\u76ee\u79bb\u7ebf\u5f00\u53d1\u5305":false,
        "\u521b\u5efa\u6807\u8bb0\u9879\u76ee":false,
        "\u5783\u573e\u7bb1":false,
        "\u68ee\u5927\u5c4f\u56fe\u8868":false,
        "\u7c92\u5b50\u6388\u6743":false,
        "\u89e3\u9664\u6587\u4ef6\u4e0a\u4f20\u7c7b\u578b\u9650\u5236":false,
        "\u8d44\u6e90\u5bfc\u5165\u5bfc\u51fa":false,
        "\u8fc7\u573a\u52a8\u753b\u9875\u7b7e\u6388\u6743":false,
        "\u9884\u89c8\u005f\u0056\u0049\u0050":false,
        "\u9884\u89c8\u6307\u5b9a\u7248\u672c":false,
        "\u9884\u89c8\u8d44\u6e90\u6a21\u677f":false
    },
    check:false,
    getPermission(type){
        if(type) {
            if(this.check) {
                if(this.data[type]) return this.data[type];
            } else {
                if(getCookie('mmdId')) {
                    this.initPermission(getCookie('mmdId'),type);
                }
            }
        }
        return false;
    },
    initPermission(mmdid,type) {
        var _this=this;
        if(!mmdid) return false;
        var keys=Object.keys(this.data);
        var data={
            mmdId:mmdid,
            role:keys.join(',')
        }
        if(_this.check) return _this.data[type];
        $.ajax({
            url:'/api/sample/hasRole',
            type:'post',
            async:false,
            data:data,
            success:function(res) {
                if(res&&res.state) {
                    _this.data=res.data;
                }
                _this.check=true;
                if(type&&_this.data[type]) return _this.data[type];
            }
        })
    }
};
// $('.pf-alt').html('')
const DOCUMENT = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>3D场景</title>
    <style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden;
        position: relative;
    }

    html,
    body {
        height: 100%;
    }

    #ifIdOut {
        width:100%;
        height:100%;
    }
    </style>
</head>
<body>
<script id="default">
function ltrim(str) {
    return window.opener.ltrim(str);
}
function f2() {
    window.opener.f2();
}
if (window.opener) {
    if(!document.getElementById('run-script')){
        var text = window.opener.f2()
        var script = document.createElement('script');
        // script.innerHTML = text;
        script.innerHTML = setTimeout(function () {
            text
        }, 0);
        document.body.appendChild(script);
    }
}
window.onbeforeunload = function (e) {
    // 　　var e = window.event||e;
    // 　　e.returnValue=("确定离开当前页面吗？");
    if (window.opener) {
        window.opener.outFloat();
    }
}
window.onload = function () {
    if (window.opener) {
        window.opener.enterFloat();
        window.opener.app = app;
    }
}
if (document.body.offsetWidth < 1096) {
    var panelPos = [10, 90];
    var panelPosStep = 80;
} else {
    var panelPos = [5, 45];
    var panelPosStep = 40;
}
</script>
</body>
</html>`;

const CHECKSCENEPREVIEW = {
    checkSceneByUrl(data,previewid) {
        var _this = this;
        var func = new Promise(function (resolve, reject) {
            try {
                if(!data&&previewid) {
                    data={
                        previewid:previewid
                    }
                }
                fetch('/api/sample/checkSceneByUrl', {
                        method: "post",
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                            'token': getCookie('token'),
                            'uid': decodeURI(getCookie('openid'))
                        }
                    }).then(res => res.json())
                    .then(res => {
                        if (res.state) {
                            var back = res.content;
                            console.log(back)
                            if(previewid) {
                                if(back.path) data.url=back.path;
                                if(back.thiscbcode) data.thiscbcode=back.thiscbcode;
                                if(back.name) data.name=back.name;
                            }
                            try {
                                var type = back.data.state;
                                let thisUrl = location.protocol + '//www.thingjs.com/campusbuilder/';
                                switch (type) {
                                    case 'OPEN_DIRECTLY':
                                        window.open(thisUrl, data.thiscbcode);
                                        resolve({
                                            success: 1,
                                            type: type
                                        });
                                        break;
                                    case 'CONFIRM_EDIT':
                                        if (back.data.content) {
                                            var fn = function () {                                              
                                                if(data.thiscbcode) {
                                                    swal_close();
                                                    window.open(thisUrl, data.thiscbcode);
                                                } else {
                                                    _this.createSceneByMmdUrl(data);
                                                    swal_close();
                                                }
                                            }
                                            newConfirm(back.data.content, [back.data.okText||'确认', '取消'], [fn, swal_close]);
                                        } else {
                                            if (data.thiscbcode) {
                                                window.open(thisUrl, data.thiscbcode);
                                            } else {
                                                newAlert(back.data.content || '该场景暂不支持在online编辑', 'warning');
                                            }
                                        }
                                        return resolve({
                                            success: 1,
                                            type: type
                                        });
                                        break;
                                    case 'CONFIRM_PREVIEW':
                                        if (data.thiscbcode) {
                                            var fn = function () {
                                                _this.encodeScene(data, data.thiscbcode);
                                                swal_close();
                                            }
                                            newConfirm(back.data.content, [back.data.okText || '确认', '取消'], [fn, swal_close]);
                                        } else {
                                            // _this.createSceneByMmdUrl(data,1);
                                            newAlert(back.data.content || '该场景暂不支持在online编辑', 'warning');
                                        }
                                        return resolve({
                                            success: 1,
                                            type: type
                                        });
                                        break;
                                    case 'NOT_SUPPORTED':
                                        newAlert(back.data.content || '该场景暂不支持在online编辑', 'warning');
                                        return resolve({
                                            success: 1,
                                            type: type
                                        });
                                        // 不支持
                                        break;
                                    default:
                                        // 不支持
                                        newAlert(back.data.content || '该场景暂不支持在online编辑', 'warning');
                                        return resolve({
                                            success: 0,
                                            message: (back.data.content || '该场景暂不支持在online编辑')
                                        });
                                        break;
                                }
                            } catch (error) {
                                console.log(error);
                                return resolve({
                                    success: 0,
                                    message: res.content.message
                                });
                            }
                        } else {
                            newAlert(res.message || res.msg || res.content.msg || res.content.message, 'warning');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        resolve({
                            success: 0,
                            message: err.message
                        });
                    });
            } catch (error) {
                resolve({
                    success: 0,
                    message: error.message
                });
            }
        });
        return func;
    },
    createSceneByMmdUrl(data, type) {
        var func = new Promise(function (resolve, reject) {
            let thisUrl = location.protocol + '//www.thingjs.com/campusbuilder/';
            if (!getCookie('token') || !getCookie('openid')) {
                newAlert('用户信息获取失败', 'warning');
                return resolve({
                    success: 0
                });
            }
            if (type) data.opentype = type;
            fetch('/api/sample/createSceneByMmdUrl', {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'token': getCookie('token'),
                    'uid': decodeURI(getCookie('openid')),
                }
            }).then(res => res.json()).then(res => {
                if (res.state && (res.content && res.content.data && res.content.data.code) || res.data) {
                    if (type) {
                        window.open(res.data);
                        return resolve({
                            success: 1
                        });
                    } else {
                        window.open(thisUrl, res.content.data.code);
                        return resolve({
                            success: 1
                        });
                    }
                } else {
                    newAlert('副本创建失败', 'warning');
                    return resolve({
                        success: 0
                    });
                }
            }).catch(err => {
                console.log(err);
                return resolve({
                    success: 0
                });
            });
        });
        return func;
    },
    encodeScene(data, code) {
        var func = new Promise(function (resolve, reject) {
            if (!getCookie('token') || !getCookie('openid')) {
                return newAlert('用户信息获取失败', 'warning');
            }
            fetch('/api/sample/encodeScene?code=' + code, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'token': getCookie('token'),
                    'uid': decodeURI(getCookie('openid')),
                }
            }).then(res => res.json()).then(res => {
                if (res.success && res.data) {
                    window.open(res.data);
                    return resolve({
                        success: 1
                    });
                } else {
                    newAlert(res.msg || '场景加密失败', 'warning');
                    return resolve({
                        success: 0
                    });
                }

            }).catch(err => {
                console.log(err);
                newAlert('请求错误', 'warning');
                return resolve({
                    success: 0
                });
            });
        });
        return func;
    }
};

/**
 * function point
 */

var _manageSamplePoint = null;
var ul_list = template('demos_temp', list_config);
$('#list0').html(ul_list);
var ul_list1 = template('demos_temp1', list_config2);
$('#list2').html(ul_list1);


function initSam() {
    // 获取在线编辑示例个数
    function getNum(dom) {
        return $(dom).find('ul.item li.item-li').length;
    }
    if (getUserName('name')) {
        $('#tab_mylist').children().show();
        $('#tab_list span').html('(' + getNum($('#list0')) + ')');
        $('#tab_list1 span').html('(' + getNum($('#list2')) + ')');
        if (myfilename) {
            var mylistNum = myfilename.pdtlist.length +  myfilename.prolist.length;
            $('#tab_mylist span').html('(' + mylistNum + ')');
        }
        //getNum($('#list1'));
    } else {
        $('#tab_mylist').children().hide();
        $('#tab_list span').html('(' + getNum($('#list0')) + ')');
        $('#tab_list1 span').html('(' + getNum($('#list2')) + ')');
    }
}
//初始化编辑器
init_editor();

/******************************************************
 *  编辑器代码
 * 
 *******************************************************/
var monacoEditor = null;
var monacoModel = null;
var monacoEditorData = null;
var monacoModelData = null;

function init_editor() {
    // 设置js编辑器
    require.config({
        paths: {
            'vs': './lib/monaco-editor/min/vs'
        }
    });
    require.config({
        'vs/nls': {
            availableLanguages: {
                '*': 'zh-cn'
            }
        }
    });

    require(['vs/editor/editor.main'], () => {
        $.get('./dts/thingjs.d.ts', function (data) {
            monaco.languages.typescript.javascriptDefaults.addExtraLib(data);
        }, 'text');
        monacoEditor = monaco.editor.create(document.getElementById('editor'), {
            // autoIndent: true,
            value: '',
            language: 'javascript',
            contextmenu: true,
            theme: 'vs-dark',
            automaticLayout: true
        });
        // // addCustomContextMenu(monacoEditor);
        monacoModel = monacoEditor.getModel();
        // changeMonacoEditor('javascript','');
        monaco.editor.defineTheme('myCustomTheme', {
            base: 'vs-dark', // can also be vs-dark or hc-black
            inherit: true, // can also be false to completely replace the builtin rules
            rules: [{
                token: 'thingjs.thing',
                foreground: 'FF7F00',
                fontStyle: 'bold',
            }]
        });

        // monaco.editor.IContextKey.get();
        monacoEditorData = monaco.editor.create(document.getElementById('editor_data'), {
            // autoIndent: true,
            value: '',
            language: 'json',
            contextmenu: true,
            theme: 'myCustomTheme',
            automaticLayout: true
        })
        //monacoModelData = monacoEditorData.getModel();

        if (js_url_cache) {
            manage(js_url_cache, monacoEditor, 'flagJs');
            js_url_cache = null;
        }

        if (_manageSamplePoint) {
            _manageSamplePoint.next();
            _manageSamplePoint = null;
            //f1();
        }
        monacoEditor.onDidChangeModelContent((e) => {
            if (loginTime !== new Date().Format('yyyy-MM-dd') && $('.setting2 .filen').is(':visible')) {
                newAlert('登录已过期，请重新登录！', 'error', null, null, null, 'timeout');
            } else {
                if(!IFSHOWLOGIN) isLogin('change');
            }
            clearInterval(setId);
            // .cht文件不保存
            if (!$('.setting2 .filen-active').hasClass('filen') && $('.setting2 #bfilen').is(':visible') && $('.setting2 .filen-active').attr('data-name').split('.').pop() == 'cht') return;
            if ($('.setting2 .filen').is(':visible') && !e.isFlush) $('.filen-active .filen-edit').show();
            // if ($('.filen').hasClass('filen-active')) {
                autosave();
            // }
        });
        monacoEditor.onContextMenu ((e) => {
            changeContext();
        })
    });
}

var js_url_cache = null;
var data_cache = {
    flagCss: null,
    flagHtml: null
};
/**
 * 在当前光标插入代码
 * @param {*} editor
 * @param {*} text
 */
function insertTextToEditor(editor, text) {
    var p = editor.getPosition();
    if(p.column>1){
        text = "\r" + text +"\r"
    }
    editor.executeEdits("", [{
        range: new monaco.Range(p.lineNumber,
            p.column,
            p.lineNumber,
            p.column),
        text: text
    }]);
};
/**
 * 替换选中部分的代码
 * @param {*} text 
 */
function replaceTextToEditor1(text) {
    if (monacoEditor) {
        let selection = monacoEditor.getSelection();
        let range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn)
        let id = { major: 1, minor: 1 }
        let op = { identifier: id, range: range, text: text, forceMoveMarkers: true }
        monacoEditor.executeEdits(this.root, [op])
        monacoEditor.focus()
    }
}
function replaceTextToEditor(text,num,type) {
    if (monacoEditor) {
        text='\n'+text+'\n';
        var selection = monacoEditor.getSelection();
        var range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn);
        let id = { major: 1, minor: 1 }
        let op = { identifier: id, range: range, text: text, forceMoveMarkers: true }
        monacoEditor.executeEdits(this.root, [op])
        monacoEditor.focus()
    }
}
/**
 * 根据指定行号折叠代码
 * @param {*} editor
 * @param {*} foldRanges 指定折叠行号 [{start: 1, end: 10}, ...]
 */
function foldCode(editor, foldRanges) {
    var foldArray = [];
    if (Object.prototype.toString.call(foldRanges) === '[object Array]') {
        for (var i = 0; i < foldRanges.length; i++) {
            var curFoldData = foldRanges[i];
            foldArray.push({
                start: curFoldData.start,
                end: curFoldData.end,
                kind: monaco.languages.FoldingRangeKind.Region
            });
        }
        if (foldArray.length > 0) {
            monaco.languages.registerFoldingRangeProvider("javascript", {
                provideFoldingRanges: function (model, context, token) {
                    return foldArray;
                }
            });
            editor.trigger('fold', 'editor.foldAllMarkerRegions');
        }
    }
}

/**
 * 设置editor中内容并根据行号折叠代码
 * @param {*} editor
 * @param {*} codeText
 * @param {*} foldRanges [{start: 1, end: 10}, ...]
 */
function setValueWithAutoFold(editor, codeText, foldRanges) {
    var model = editor.getModel();
    model.setValue(codeText);
    foldCode(editor, foldRanges);
}
//###########################################################################

function create_page(tp, txt,isOthURL,logH) {
    var c=`<script src="/dist/cb_loader.js"></script>`;
    var earth='';
    var pattern = /\bversion 2.0\b/g;
    var pattern1 = /\bversion earth\b/g;
    if(pattern.test(txt)){ 
        tp='thing.umd.min.js'; 
        showEditScene(false);
        c='';
        if(pattern1.test(txt)){
            earth=`<script src="/static/historyVersion/thing.earth.umd.min.js"></script>`;
        }else{
            earth='';
        }
    } else {
        showEditScene(true);
    }
    let r =
        `<!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <!-- //不缓存 -->
        <META HTTP-EQUIV="pragma" CONTENT="no-cache">
        <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
        <META HTTP-EQUIV="expires" CONTENT="0">
        <title>Editor</title>
        <style type="text/css" media="screen">
            * {
                margin: 0;
                padding: 0;
            }
            body {
                overflow: hidden;
                position: relative;
            }
            html,
            body {
                height: 100%;
                background: #fff;
            }
            #content {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: stretch;
                flex-wrap:wrap;
                overflow: hidden;
            }
            #div3d {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #c0c0c0;
                z-index: 1;
                flex: auto;
            }
            #div3d .div3d-error {
                font-size: 35px;
                color: #660000;
                position: absolute;
                top: 42%;
                left: 0;
                right: 0;
                z-index: 0;
                text-align: center;
                display: none;
            }
            #div2d {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height:100%;
            }
            #div2d > div{
                z-index: 2;
            }
            #div2d > div .ThingJS_nav-vertical{
                overflow: auto;
                max-height: 100%;
            }
            #div2d > div .ThingJS_nav-vertical::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            #div2d > div .ThingJS_nav-vertical::-webkit-scrollbar-thumb {
                -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.35);
                background: #c3c3c3;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 3px;
            }
            #content .ThingJS-Banner-top {
                width: 100%;
                height: 50px;
                z-index: 10002;
            }
            #content .ThingJS-Banner-left {
                width: 60px;
                z-index: 10001;
            }
            #content.ThingJS-top .ThingJS-Banner-left {
                height: calc(100% - 50px);
            }
            #content.ThingJS-top #div3d {
                width: 100%;
                height: calc(100% - 50px);
            }
            #content.ThingJS-top #div2d {
                top: 50px;
                height: calc(100% - 50px);
            }
            #content.ThingJS-left #div2d {
                left: 60px;
                width: calc(100% - 60px);
            }
            #content.ThingJS-left #div3d {
                width: calc(100% - 60px);
            }
            #content.ThingJS-top .ThingJS_Banner-top{
                flex-shrink: 1;
                flex-direction: row;
                flex-wrap: nowrap;
                display: flex;
            }
            #content.ThingJS-top .ThingJS_Banner-top.ThingJS_nav-vertical .menu1{
                min-width: 150px;
                overflow: visible;
            }
            #content.ThingJS-top .ThingJS_nav-vertical .menu1 .menu1:last-child{
                overflow: hidden;
            }
        </style>
        <!-- <link rel="stylesheet" type="text/css" href="/guide/lib/icon.css"> -->
        <script type="text/javascript" src="/guide/lib/jquery-3.2.1.js"></script>
        <script type="text/javascript" src="/guide/lib/system.js"></script>
        <script type="text/javascript" src="/guide/lib/loader.js"></script>
        <script src="/static/historyVersion/` + tp + `"></script>
        <!-- <script src="/dist/thing.js"></script> -->
        `+c+`
        `+earth+`
        <script src="/dist/thingjs_tip.js"></script>
        <!--<script src="/dist/thingjs.min.js" type="text/javascript" charset="utf-8"></script> 如果是网上，则没有这个文件，就不会被覆盖 -->
        <script src="/static/release/thing.widget.min.js" type="text/javascript" charset="utf-8"></script>
        <!--<script src="/dist/thing.widget.min.js" type="text/javascript" charset="utf-8"></script> -->
        <!--<script src="https://www.thingjs.com/static/release/thing.widget.viewer.js" type="text/javascript" charset="utf-8"></script> -->
        <script src="/guide/js/thing.widget.ex.js" type="text/javascript" charset="utf-8"></script><!-- 这个可以一直加这，有临时的代码需要执行 -->
        <script src="/guide/lib/screenlog_new.js"></script>
    </head>
    <body>
        <div id="content">
            <div id="ThingJS-banner-top"></div>
            <div id="ThingJS-banner-left"></div>
            <div id="div3d"><p class="div3d-error">脚本加载错误</p></div>
            <div id="div2d" class="div2d"></div>
            <div id="widget_root" style="position: absolute; top: 0px; z-index: 10;"></div>
            <!-- <input style="position: absolute;top: -100px;" type="text" id="inp" readonly="readonly"> -->
        </div>
        <script>screenLog.init('','`+logH+`');</script>
        <script id="default">
            if (window.opener) {
                if(!document.getElementById('run-script')){
                    var text = window.opener.f2()
                    var script = document.createElement('script');
                    script.innerHTML = text;
                    document.body.appendChild(script);
                }
            }
            window.onbeforeunload = function (e) {
                // 　　var e = window.event||e;
                // 　　e.returnValue=("确定离开当前页面吗？");
                if (window.opener) {
                    window.opener.outFloat();
                }
            }
            window.onload = function () {
                if(parent.isLogin) {
                    if(parent.isLogin&&!parent.isLogin('enter','loadIframe')) {
                        $('#div3d').html('<p class="div3d-error">'+(parent.loginTime?'登录已过期':'账号未登录')+'</p>');
                        $('#div3d .div3d-error').show();
                        return;
                    }
                    parent.isLogin('load');
                }
                if (window.opener) {
                    window.opener.enterFloat();
                }
                if (parent.ltrim) {
                    if(parent.ltrim(parent.f2()).length > 0) {
                        $('#div3d .div3d-error').html('脚本加载错误');
                    } else {
                        $('#div3d .div3d-error').html('请开始编写您的代码');
                    }
                }
            }

            $('#div3d').mouseup(function () {
                $('#inp').focus();
            });
            setTimeout(function() {
                if (THING.App.current == undefined) {
                    $('#div3d .div3d-error').show();
                }
            }, 3000);
            if (document.body.offsetWidth < 1096) {
                var panelPos = [10, 90];
                var panelPosStep = 80;
            } else {
                var panelPos = [5, 45];
                var panelPosStep = 40;
            }
            THING.__auth_server_URL__='/api/sampleRequest';
            `+(!c?'screenLog.log("ThingJS: "+THING.VERSION);':'')+`
            `+(isOthURL?"screenLog.log('当前项目中引用了其他用户场景')":'')+`
        </script>
        <script id="run-script">` + txt + `</script>
    </body>
    </html>`
    return r;
}


// 获取标签
var btn = document.getElementById('btn');

function f2() {
    if ($('#bfilen').text() !== '' && $('#bfilen').is(':visible') && !$('.setting2 li.filen-active').children('#bfilen').length) {
        var text;
        var url=getUrl($('#bfilen').data('url').substring(1));
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'text',
            async: false,
            success: function (data) {
                text = data;
            }
        })
        return text;
    }
    try {        
        var text = monacoModel.getValue();
        if (!text) {
            return;
        }
        return text;
    } catch (error) {
        return;
    }
}

function ltrim(str) {
    if (str == undefined) return '';
    var res = str.replace(/[ ]/g, "");
    res = res.replace(/[\r\n]/g, "");
    return res;
}

// 注册提交代码事件
btn.onclick = reloadIframe;

var captureSaveTime = null;

function reloadIframe(h,type) {
    if($('#moveclose-dialog .panelModel .panelBody .preview-panel').is(':visible')) {
        $('#moveclose-dialog .panelModel .panelBody .preview-panel').hide()
    }
    if (getCookie("debugSwitch") == 0) {
        debugSwitchFalse();
        return;
    }
    // if(getCookie("saveSetSwitch")==0 || getCookie("saveSetSwitch")==undefined) return;
    var version = '';
    
    if ($('#bfilen').text() != '') {
        $.ajax({
            url: '/api/getFileVersion?thisJsName=' + $('#bfilen').data('nameBefore'),
            type: 'get',
            async: false,
            success: function(result){
                // console.log(result);
                if(result && result.code && result.code == '200'){
                    version = result.message;
                }
            }
        })
    }
    // console.log(version);
    var text = f2();
    text=hasOtherUrl(text).content;
    // console.log(text);
    var isOthURL=!hasOtherUrl(text).state;
    if ($('.select-box .selected').is(':visible') && $('.select-box .selected').data('version') == '最新版') {
        text = text + `
        $(".select-box .selected",parent.document).html('' + THING.VERSION +'('+'最新版)');
        $(".select-box .selected",parent.document).data('newVersion',THING.VERSION);`;
    }
    if ($("#secnePosManager").children(".move").attr("data-state") == "on") {
        text = text + `\nparent.app = THING.App.current;parent.app.completeCallback=parent.toogleNoClick(parent.document.getElementById('secnePosManager'));`;
    } else {
        // text = text + '\nparent.app = THING.App.current;\nparent.skyEffect = effect;\nparent.postEffect = effectConfig';
        text = text + `\nparent.app = THING.App.current;`;
        // skyEffect = document.getElementById('ifId').contentWindow.effect;
        // postEffect = document.getElementById('ifId').contentWindow.effectConfig;"
    }

    if ($('#bfilen').text() != '' && $('#gf').is(':hidden')) {
        if (!captureSaveTime) {
            text = text + `if(THING.App.current) THING.App.current.on('load', function(){setTimeout(function(){parent.appOnLoadSet()}, 3000)});`;
        } else {
            var saveTime = new Date();
            if (Date.parse(saveTime) - Date.parse(captureSaveTime) > 60 * 1000) {
                text = text + `if(THING.App.current) THING.App.current.on('load',function(){setTimeout(function(){parent.appOnLoadSet()}, 3000)});`;
            }
        }
    }

    text = `//@ sourceURL=debug.js?`+Math.round(Math.random()*100)+`\n` + text;
    var thingPath = 'thing.min.js';
    if (version && version!='' && version!='最新版'&& version!=undefined && version!='undefined') {
        thingPath = "thing-" + (version) + ".min.js";
    }
    var content = create_page(thingPath, text,isOthURL,(layout&&layout.sample&&layout.sample.content&&layout.sample.content.browser&&layout.sample.content.browser.content&&layout.sample.content.browser.content.log&&layout.sample.content.browser.content.log.height!='15%'?layout.sample.content.browser.content.log.height:'15%'));
    if (newWindow) {
        newWindow.app = null;
        var doc = newWindow.document;
        doc.write(DOCUMENT);
        doc.close();
        var ifrs = document.createElement("iframe");
        ifrs.setAttribute("frameborder", "0");
        ifrs.setAttribute("id", "ifIdOut");
        ifrs.style.height=h+'px';
        //document.getElementsByClassName("content-browser").appendChild(ifr);
        $(doc.body).append(ifrs);
        var ifrws = (ifrs.contentWindow) ? ifrs.contentWindow : (ifrs.contentDocument.document) ? ifrs.contentDocument.document : ifrs.contentDocument;
        ifrws.document.open();
        ifrws.document.write(content);
        ifrws.document.close();
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            if(type) getOrSaveDevLayout(1,4);
        }
    } else {
        // var h=$('.content-browser #ifId')[0].offsetHeight-1; 
        if($('#ifId[data-layout="iframe"').length&&$('#ifId[data-layout="iframe"]:visible').length&&$('.content-browser:visible').length&&$('.browser-header:visible').length&&$('.screen').length) {
            h=$('.content-browser').height()-$('.content-browser .browser-header')[0].offsetHeight-$('.content-browser .screen').first().height();
        }
        // if(layout&&layout.sample&&layout.sample.content&&layout.sample.content.browser&&layout.sample.content.browser.content&&layout.sample.content.browser.content.iframe&&layout.sample.content.browser.content.iframe.height!='calc(85% - 30px + 1px)') h=layout.sample.content.browser.content.iframe.height;
    
        if(!!newLogwindow) {
            var ifrs = document.getElementById("ifId");
            var ifrws = (ifrs.contentWindow) ? ifrs.contentWindow : (ifrs.contentDocument.document) ? ifrs.contentDocument.document : ifrs.contentDocument;
            ifrws.document.open();
            ifrws.document.write(content);
            ifrws.document.close();
            // 如果用户开启了保存开发布局
            if(getCookie('saveLayoutSwitch') === '1'){
                if(type) getOrSaveDevLayout(1,4);
            }
            return;
        };
        //var d = document.getElementById('ifId').contentWindow.document;
        if (document.getElementById('ifId') && document.getElementById('ifId').contentWindow) {
            document.getElementById('ifId').contentWindow.app = null;
        }
        //reloadBody(d, text);
        var ifr;
        if($('.content-browser #ifId').length&&1==2){
            ifr=$('.content-browser #ifId')[0];
            if(h) ifr.style.height=typeof(h)=='string'?h:(h+'px');
            ifr.setAttribute("frameborder", "0");
            // ifr.setAttribute("src", "/guide/dialog/loadApp.html?n="+Math.ceil(Math.random()*1000));
            ifr.setAttribute("id", "ifId");
            ifr.setAttribute("data-layout", "iframe");
            ifr.setAttribute("allowfullscreen", "true");
            try {
                var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
                // ifrw.document.open();
                try {
                    ifrw.document.clear();
                } catch (error) {}
                ifr.onload=function(){
                    ifr.contentWindow.postMessage({content:content},'*');
                }
                // ifrw.postMessage({content:content},'*');
                // ifrw.document.close();
            } catch (error) {
                console.log(error);
            }
        } else {
            ifr = document.createElement("iframe");
            if(h) ifr.style.height=typeof(h)=='string'?h:(h+'px');
            ifr.setAttribute("frameborder", "0");
            ifr.setAttribute("id", "ifId");
            // ifr.setAttribute("src", "/guide/dialog/loadApp.html?n="+Math.ceil(Math.random()*1000));
            ifr.setAttribute("data-layout", "iframe");
            ifr.setAttribute("allowfullscreen", "true");
            $('.content-browser #ifId').remove();
            $('.content-browser').append(ifr);
            var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
            ifrw.document.open();
            ifrw.document.write(content);
            // try {
            //     ifrw.document.clear();
            // } catch (error) {}
            // ifr.onload=function(){
            //     ifr.contentWindow.postMessage({content:content},'*');
            // }
            ifrw.document.close();
        }
        // var h=$('.content-browser #ifId').height();
        // $('.content-browser #ifId').remove();
        //document.getElementsByClassName("content-browser").appendChild(ifr);
        // $('.content-browser').append(ifr);
       
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            if(type) getOrSaveDevLayout(1,4);
        }
    }
}



// 监听浏览器窗口变化，动态改变3d块的高度，解决3d块和log块之间白色间距问题
$(window).resize(function(){
    let contentSampleHeight = $('.wrapper-sam.sam-new .content #content_sample')[0].offsetHeight;
    try {
        $('#ifId').height(contentSampleHeight - $('.screen')[0].offsetHeight);
    } catch (error) {
        $('#ifId').height(contentSampleHeight - 107);
    }
})

function appOnLoadSet(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj) {
    try {
        if (document.getElementById("ifId") && document.getElementById("ifId").contentWindow.document.getElementById("captureImg")) {
            document.getElementById("ifId").contentWindow.document.getElementById("captureImg").remove();
        }
        if (!($('#bfilen').text() != '' && $('#gf').is(':hidden'))) return;
        if (getCookie("debugSwitch") == null || getCookie("debugSwitch") == 1) {
            var iframeI = document.getElementById("ifId");
            var iframeContent = iframeI.contentWindow.document.getElementById("content");
            var iframeDiv3d = iframeI.contentWindow.document.getElementById("div3d");
            var tdimg = app.captureScreenshotToImage(800, 450, 'png', 0.5);
            var captureImgData = null;
            if ($(iframeContent).find("iframe").length > 0) {
                captureImgData = tdimg;
                uploadFileCapture(captureImgData);
                if (filename) {
                    uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj)
                }
            } else {
                if ($(iframeContent).width() < 800) {
                    $(iframeContent).css({
                        'width': '800px'
                    });
                }
                if ($(iframeContent).height() < 450) {
                    $(iframeContent).css({
                        'height': '450px'
                    })
                }
                try {
                    if($(tdimg).length) {
                        tdimg=$(tdimg).attr('src');
                    }
                } catch (error) {};
                $(iframeDiv3d).append($(`<img id="captureImg" style="position:absolute;top:0;z-index:-1" src="` + tdimg + `">`));
                try {
                    html2canvas(iframeContent, {
                        scale: 1,
                        allowTaint: false,
                        useCORS: false,
                        width: 800,
                        height: 450,
                        ignoreElement: [iframeDiv3d, $(iframeContent).find(".ThingJS_iframe")],
                        logging: false
                    }).then(function (canvas) {
                        var html_canvas = canvas.toDataURL();
                        captureImgData = html_canvas;
                        // $(iframeContent).css({'overflow':'hiden','width': '100%','height': '84%'});
                        // iframeI.contentWindow.document.getElementById("captureImg").remove();
                        uploadFileCapture(captureImgData);
                        if (filename) {
                            uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj)
                        }
                        $(iframeContent).css({
                            'width': '100%',
                            'height': '100%'
                        })
                    }).catch(e=>{
                        console.warn(e);
                        if (filename) {
                            uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj)
                        }
                        $(iframeContent).css({
                            'width': '100%',
                            'height': '100%'
                        })
                    });
                } catch (error) {
                    if (filename) {
                        uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj)
                    }
                    $(iframeContent).css({
                        'width': '100%',
                        'height': '100%'
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        if (document.getElementById("ifId") && document.getElementById("ifId").contentWindow.document.getElementById("captureImg")) {
            document.getElementById("ifId").contentWindow.document.getElementById("captureImg").remove();
        }
        $(iframeContent).css({
            'width': '100%',
            'height': '100%'
        })
        if (filename) {
            uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj)
        }
    }
}


function imageCompress(fileUrl, callback) {
    try {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            var targetWidth = this.width,
                targetHeight = this.height;

            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            // data 是压缩后图片的 base64 编码
            var data = canvas.toDataURL('image/jpeg', 0.7);
            // 通过回调方法获得
            callback(data);
        }
        img.src = fileUrl;
    } catch (e) {
        console.log("压缩失败 --> " + e);
    }
}

function uploadFileCapture(captureImgData) {
    //if(!$('.filen').hasClass('filen-active')) return;
    var filename = $('#bfilen').text().split('.')[0];
    var fileJust = filename;
    if (!(filename != '' && $('#gf').is(':hidden'))) return;
    var version = getVersionStr($('#bfilen').data('version'));
    filename += version;
    var data = {
        captureImgData: captureImgData.substring(22),
        captureName: filename,
        isPro: $('#bfilen').data('isPro')
    }
    $.ajax({
        url: "/api/uploadFileCapture",
        data: JSON.stringify(data),
        type: "Post",
        async: false,
        cache: false, //上传文件无需缓存
        processData: false, //用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (result) {
            if (result.code == 200) {
                captureSaveTime = new Date();
                if (document.getElementById("ifId") && document.getElementById("ifId").contentWindow.document.getElementById("captureImg")) {
                    document.getElementById("ifId").contentWindow.document.getElementById("captureImg").remove();
                }
                $('#bfilen').data('capture', '1')
            }
        }
    })
}

function reloadBody(d, text) {
    //body全部更新
    var b = d.body;
    var c = $(b).children();
    for (var i = 0; i < c.length; i++) {
        var item = $(c[i]);
        if (item.attr('id') == 'content') {
            var sign =
                `<div id="ThingJS-banner-top"></div>
                <div id="ThingJS-banner-left"></div>
                <div id="div3d"></div>
                <div id="div2d" class="div2d"></div>`
            item.html($(sign));
        } else if (item.attr('id') == 'default' || item.attr('id') == "run-script") {
            //
        } else if (item.hasClass('screen')) {
            item.html('');
        } else {
            item.remove();
        }
    }
    b.removeChild(d.getElementById('run-script'));
    var script = d.createElement('script');
    script.setAttribute("id", "run-script")
    script.setAttribute("role", 'reload')
    script.innerHTML = text;
    if (d.body) {
        d.body.appendChild(script);
    }

}

var newWindow;
var newLogwindow;
// 在线开发浮动窗口
$('.float').click(function () {
    $(this).parents('.icon_tip').next().next('iframe').height('');
    $(this).parents('.icon_tip').next().next('iframe').next('.screen').height(''+layout.sample.content.browser.content.log.height+'');
    $(this).parents('.icon_tip').css('bottom', ''+layout.sample.content.browser.content.log.height+'12px');
    if(newWindow==null) {
        newWindow = window.open('', '', "width=500,height=480,screenX=100,screenY=50");
        reloadIframe(null,'save');
        enterFloat();
    }
});

// 退出浮动窗口
function outFloat() {
    $('#content_sample #editor').css({
        'width': '50%'
    });
    $('#content_sample .content-middle').css({
        'width': '50%'
    });
    $('#content_sample .content-browser').css({
        'width': '50%',
        'display': 'block'
    })
    if (newWindow) {
        //newWindow.app.resize();
        // setTimeout(() => {
            $(".layout_sample .layout_sample_ul .con_item input#flex-switch-infoMy[type='checkbox']").prop('checked',false)
            $(".layout_sample .layout_sample_ul .con_item input#flex-switch-infoGW[type='checkbox']").prop('checked',false)
            $(".layout_sample .layout_sample_ul .con_item input#flex-switch-infoD[type='checkbox']").prop('checked',true)
            newWindow = null;
            reloadIframe(null,'save');
        // }, 0);
    }
}
// 开启浮动窗口
function enterFloat() {
    $('#content_sample #editor').css({
        'width': '100%'
    });
    $('#content_sample .content-middle').css({
        'width': '100%'
    });
    $('#content_sample .content-browser').css({
        'width': '0',
        'display': 'none'
    });
}
// 日志窗口浮动
function outLogFloat() {
    // console.log("日志窗口浮动")
    $('#content_sample .content-browser').removeClass('hidelog');
    if (newLogwindow) {
        $('#content_sample .content-browser>.screen .screenContent').html($(newLogwindow.document.body).find('.screen .screenContent').html());
        newLogwindow = null;
        $('#content_sample .content-browser>.screen').show();
        layout.sample.content.browser.content.log.visible=true;
        reloadIframe(null,'save');
        if(logFloat) {
            logFloat=false;
        }
        setTimeout(()=>{ 
            // 如果用户开启了保存开发布局
            if(getCookie('saveLayoutSwitch') === '1'){
                getOrSaveDevLayout(1,4);
            }
        },0)
        // reloadIframe();
    }
}
function enterLogFloat() {
    $('#content_sample .content-browser').addClass('hidelog');
    $('#content_sample .content-browser>.screen').hide();
    var html=$('#content_sample .content-browser>.screen .screenContent').html();
    if(newLogwindow) {
        // console.log(JSON.stringify(layout))
        let logH = layout&&layout.sample&&layout.sample.content&&layout.sample.content.browser&&layout.sample.content.browser.content&&layout.sample.content.browser.content.log&&layout.sample.content.browser.content.log.height!='15%'?layout.sample.content.browser.content.log.height:'15%';
        // console.log(logH)
        newLogwindow.document.write(`<title>日志信息<\/title><style>*{ margin:0;padding:0} .screenContent{height: calc(100% - 30px) !important;}<\/style><body><script type='text/javascript' src='/guide/lib/jquery-3.2.1.js'><\/script><script src='/guide/lib/screenlog_new.js'><\/script><script>screenLog.init('','`+logH+`');<\/script><script>$('.screen .screenContent')[0].innerHTML='`+html+`';<\/script><\/body>`)
        newLogwindow.window.onbeforeunload=function(){
            outLogFloat();
        }        
        if(!logFloat) {
            // 如果用户开启了保存开发布局
            if(getCookie('saveLayoutSwitch') === '1'){
                getOrSaveDevLayout(1,4);
            }
        }
    }
}
// 在线开发窗口拖动
$(window).resize(function () {
    if ($('.content-nav').hasClass('content-nav-quan')) return;
    if (newWindow) return;
    if (getCookie("debugSwitch") == 0) {
        debugSwitchFalse();
        return;
    }
    $('#content_sample #editor').css({
        'width': '50%'
    });
    $('#content_sample .content-middle').css({
        'width': '50%'
    });
    $('#content_sample .content-browser').css({
        'width': '50%'
    });
});

var defaultWidth = $('#editor').width() * 2;
$('.content-browser .drag').mousedown(function (e) {
    if (getCookie("debugSwitch") == 0) return;
    $('.sambg').show();
    var ew = $('#content_sample #editor').width();
    var bw = $('#content_sample .content-browser').width();
    var spacX = e.pageX;
    $(document).bind("mousemove", function (ev) {
        var ev = ev || window.event;
        var x = ev.pageX - spacX;
        // var _x = x / defaultWidth * 100;
        if (ew + x >= 0 && bw - x >= 0) {
            $('#content_sample #editor').css({
                'width': ew + x + 'px'
            });
            $('.editor_img').width($("#editor").width())
            $('#content_sample .content-middle').css({
                'width': ew + x + 'px'
            });
            $('#content_sample .content-browser').css({
                'width': bw - x + 'px'
            });
        }
    });
});
$('.content-browser .drag').on('mousemove', function () {
    if (getCookie("debugSwitch") == 0) {
        debugSwitchFalse();
        $('.content-browser .drag').css({
            'cursor': 'not-allowed'
        });
        $('.content-browser .drag').attr('title', '请到设置中开启调试');
    } else {
        $('.content-browser .drag').css({
            'cursor': 'ew-resize'
        });
        $('.content-browser .drag').attr('title', '左右拖动')
    }
})

$(document).mouseup(function (e) {
    e=e||window.event;
    $(this).unbind("mousemove");
    $('.sambg').hide();
    $('.content-nav .nav_drag').removeClass('show_nav_drag');
    let target=e.target;
    if($(target).hasClass('nav_drag')||$(target).parents('.nav_drag').length||$(target).hasClass('sambg')||$(target).hasClass('screenresize')) {
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            getOrSaveDevLayout(1,4);
        }
    }
});

let timer = null;
function searchFunc(layout,layoutTime = 5000) {
    timer && clearTimeout(timer);
    timer = setTimeout(function() {
        if($('.wrapper-sam.sam-new').children('.content').first().hasClass('quanpingIframe')) return;
        $.ajax({
            url:'/api/saveDevLayout',
            type:'post',
            data:JSON.stringify(layout),
            async:true,
            headers: { "Content-type": "application/json;charset='UTF-8'"},
            success:function(res) {
                if(res.code==200) {
                    // console.log("布局保存成功")
                    // 如果值为4的话，那么布局保存锚点跳转到我的布局
                    if(layout.sample.layoutSelect === 4){
                        // console.log("值为4,那么布局保存锚点跳转到我的布局")
                        $(".layout_sample .layout_sample_ul .con_item input#flex-switch-infoMy[type='checkbox']").prop('checked',true)
                        $(".layout_sample .layout_sample_ul .con_item input#flex-switch-infoGW[type='checkbox']").prop('checked',false)
                        $(".layout_sample .layout_sample_ul .con_item input#flex-switch-infoD[type='checkbox']").prop('checked',false)
                    }
                } else {
                    console.log(res.msg)
                }
            },
            error:function(e) {
                console.log(e);
            }
        })
    }, layoutTime);
}
// 保存在线开发当前布局（type —— 是否保存）（layoutSelectNum —— 官方布局的数值）（layoutData —— 官方布局选中覆盖）
function getOrSaveDevLayout(type,layoutSelectNum,layoutData){
    const cookieNum=Number(getCookie('saveLayoutSwitch'));
    if(type) {
        if(!cookieNum)return;
        // 保存
        // 左侧菜单
        layout.nav.visible=$(".content-nav:visible").length?true:false; // 状态
        layout.nav.width=$(".content-nav")[0].style.width||layout.nav.width; // 宽度
        layout.nav.left=$(".content-nav")[0].style.left||layout.nav.left; // 是否收起
        // 保存左侧菜单搜索框状态
        // layout.nav.switch = $('#list1').css('display') == 'none' ? 'official' : 'my' // 判断在官方还是我的 官方 - true，我的 - false
        // layout.nav.samSearchVal = $('.sam-search input').val().trim() // 保存搜索中的文字

        // 编译器
        layout.sample.visible=$("#content_sample:visible").length?true:false; // 状态(包含3Diframe)
        layout.sample.width=$("#content_sample")[0].style.width||layout.sample.width; // 宽度
        layout.sample.left=$("#content_sample")[0].style.left||layout.sample.left; // 距离左边的距离(根据左侧菜单来改变)

        // 编译器功能列表(无用)
        layout.sample.content.middle.visible=$(".content-middle:visible").length?true:false; // 状态
        const m=$(".content-middle").width()/$("#content_sample").width(); // 编译器功能列表 和 编译器 的比例
        layout.sample.content.middle.width=(m*100+'%')||layout.sample.content.middle.width; // 宽度


        // 保存功能栏是否展开 和 位置
        // if(settingContent){
        //     console.log(settingContent,"settingContent")
        //     layout.sample.content.middle.settingContent = settingContent
        //     layout.sample.content.middle.position = {
        //                                                 "top":$("#moveclose-dialog").css('top'),
        //                                                 "left":$("#moveclose-dialog").css('left')
        //                                             }
        //     console.log(layout.sample.content.middle.position)
        // }else{
        //     layout.sample.content.middle.settingContent = ''
        //     layout.sample.content.middle.position = {"top":0,"left":0}
        // }

        // 代码编辑区域
        layout.sample.content.editor.visible=$(".editor:visible").length?true:false; // 状态
        const e=$(".editor").width()/$("#content_sample").width(); // 比例
        layout.sample.content.editor.width=(e*100+'%')||layout.sample.content.editor.width; // 宽度

        // 3D区域
        layout.sample.content.browser.visible=$(".content-browser:visible").length?true:false; // 状态(有问题，永远没有display)
        const b=$(".content-browser").width()/$("#content_sample").width(); // 比例
        layout.sample.content.browser.width=(b*100+'%')||layout.sample.content.browser.width; // 宽度

        // 预览区是否显示
        layout.sample.content.browser.content.iframe.visible=$("#ifId:visible").length?true:false; 
        
        // 日志区域
        layout.sample.content.browser.content.log.visible=$("#content_sample .content-browser>.screen:visible").length?true:false; // 状态
        layout.sample.content.browser.content.log.width='100%';  // 宽度为100%，不会出现其它情况
        // $("#content_sample .content-browser>.screen").length
        // ?($("#content_sample .content-browser>.screen")[0].style.width
        // ||layout.sample.content.browser.content.log.width)
        // :layout.sample.content.browser.content.log.width;

        

        // 风格改变(白色界面)
        layout.sample.content.editorvs.visible=$("#editor>.monaco-editor").hasClass('vs-dark')?true:false; // 状态 true为黑色
        

        // 日志窗口状态
        layout.sample.quanpingLog = $('.content.clearfix').is('.quanpingLog')?true:false // (经排查没有找到作用点)
        let h = null;
        if($("#content_sample .content-browser>.screen").length) {
            if($("#content_sample .content-browser>.screen")[0].style.height.indexOf('%')!=-1) { // 如果日志存在
                h=Number($("#content_sample .content-browser>.screen")[0].style.height.replace('%','')/100);
            } else {                                                                             // 没有
                h=Number($("#content_sample .content-browser>.screen")[0].style.height.replace('px',''))/$("#content_sample .content-browser").height();
            }
        } else {
            h=0.15;
        }
        // 计算日志的高度
        layout.sample.content.browser.content.log.height=(h*100+'%')||layout.sample.content.browser.content.log.height;
        layout.sample.content.browser.content.iframe.height=('calc('+(1-h)*100+'%  - 30px + 1px)')||layout.sample.content.browser.content.iframe.height;

        
        if(newWindow!=''&&newWindow!=null) {
            layout.sample.content.browser.content.iframe.newWindow=true;
        } else {
            layout.sample.content.browser.content.iframe.newWindow=false;
        }
        if(newLogwindow!=''&&newLogwindow!=null) {
            layout.sample.content.browser.content.log.newLogWindow=true;
        } else {
            layout.sample.content.browser.content.log.newLogWindow=false;
        }

        if(layoutData) layout=layoutData; // 选中官方布局时，覆盖

        // 找到官方布局保存
        layout.sample.layoutSelect = layoutSelectNum? layoutSelectNum :0
        setCookie('layoutSelect',layoutSelectNum);
        
        // 如果layoutSelect（官方布局为4）表示用户自定义，需要延迟五秒保存
        if(layout.sample.layoutSelect && layout.sample.layoutSelect === 4){
            searchFunc(layout)
        }else{
            searchFunc(layout,0)
        }
    } else {
        // 初始化界面，获取布局信息
        $.ajax({
            url:'/api/getDevLayout',
            type:'get',
            success:function(res) {
                if(res.code==200) {
                    if(res.data) {
                        var data=res.data;
                        if(data.saveLayout)  {
                            if(data.nav) layout.nav=data.nav;
                            if(data.sample) layout.sample=data.sample;
                            setCookie('saveLayoutSwitch',1);
                        } else {
                            setCookie('saveLayoutSwitch',0);
                            resetLayout(null,false); // 如果保存布局没有开启，初始化默认布局
                            return;
                        }

                        // 判断是否是官方布局
                        if(data.layoutSelect == 1){
                            setCookie('layoutSelect',1);
                            resetLayout(null,true);
                        }else if(data.layoutSelect == 3){
                            setCookie('layoutSelect',3);
                            resetLayout(null,false);
                        }else{
                            setCookie('layoutSelect',4);
                            resetLayout(null);
                        }
                    }
                } else {
                    console.log(res.msg);           
                }
            },
            error:function(e) {
                console.log(e);
            }
        })
    }
    
}

// 更改当前布局
function resetLayout(layouts,isChange=false,isNewIframe=false) {
    // return;
    // console.log(layout,"进入页面变更layout")
    if(layouts) layout=layouts;
    // $('#moveclose-dialog').css({top:'26px',right:'66px'})
    // 如果用户点击基础布局的情况下，把3d框显示出来
    if(isChange){
        if(defaultrelod&&typeof(defaultrelod)=='function') {
            defaultrelod();
        }
    }

    // 左侧菜单
    if(layout.nav) {
        if(layout.nav.width!='300px'||isChange) {
            $('[data-layout="nav"]').css('width',layout.nav.width);
        }
        if(layout.nav.left||isChange) {
            $('[data-layout="nav"]').css('left',layout.nav.left);
        }
        if(!layout.nav.visible) {
            $('[data-layout="nav"]').css('display','none');
            $('.sam-new .content.clearfix').addClass('hidemenu');
            $('.suojin').attr('src', '../../guide/image/sjy.png');
            suojinStatus = false;
        }
        // if(layout.nav.switch == 'my'){ // 判断在官方还是我的 官方 - true，我的 - false
        //     tab_change(1);
        //     if(!thumbState) $('.panelModel').hide();
        //     if(!thumbState) $('.panelHeader .close').trigger('click');
        //     if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
        //     if(!storeThumbState) $('#moveclose-dialog_store .panelHeader .close').trigger('click');
        // }
        // if(layout.nav.samSearchVal){ 
        //     $('.sam-search input').val(layout.nav.samSearchVal) // 搜索中的文字
        //     console.log(layout.nav.samSearchVal,"layout.nav.samSearchVal")
        //     setTimeout(() => {
        //         samSearch(layout.nav.samSearchVal)
        //     }, 100);
        // }
        setCookie('switchmenu', layout.nav.visible?1:0);
    }

    // 编译器
    if(layout.sample){
        if(layout.sample.width!='calc(100% - 200px)'||isChange){
            let sampleWidth = `calc(100% - ${layout.nav.width})`
            $('#content_sample').css({"width":sampleWidth});
        }
        if(!layout.sample.visible) {
            $('[data-layout="sample"]').css('display','none');
        }
        if(layout.sample.left!='200px'||isChange){
            $('[data-layout="sample"]').css('left',layout.sample.left);
        }

        // 编译器功能列表
        if(layout.sample.content.middle){
            if(layout.sample.content.middle.width!='50%'||isChange){
                $('[data-layout="middle"]').css('width',layout.sample.content.middle.width);
            }
            if(!layout.sample.content.middle.visible) {
                $('[data-layout="middle"]').css('display','none');
            }


            // console.log(layout.sample.content.middle.position.top,layout.sample.content.middle.position.left)
            // setTimeout(() => {
            //     if(layout.sample.content.middle.position.top != 0){
            //         console.log(layout.sample.content.middle.position.top,layout.sample.content.middle.position.left,111)
            //             $("#moveclose-dialog").css('top',layout.sample.content.middle.position.top),
            //             $("#moveclose-dialog").css('left',layout.sample.content.middle.position.left)
            //         }
            // }, 0);
            // setTimeout(() => {
            //     if(layout.sample.content.middle.settingContent){
            //         clickTool(layout.sample.content.middle.settingContent)
            //     }
            // }, 0);
        }

        // 代码编辑区域
        if(layout.sample.content.editor){
            if(layout.sample.content.editor.width!='50%'){
                $('[data-layout="editor"]').css('width',layout.sample.content.editor.width);
            }
            if(!layout.sample.content.editor.visible) {
                $('[data-layout="editor"]').css('display','none');
            }
        }

        // 3D区域
        if(layout.sample.content.browser){
            if(layout.sample.content.browser.width!='50%'||isChange){
                $('[data-layout="browser"]').css('width',layout.sample.content.browser.width);
            }
            if(!layout.sample.content.browser.visible) {
                $('[data-layout="browser"]').css('display','none');
            }
            if(layout.sample.content.browser.content.iframe.height!='calc(85% - 30px + 1px)'||isChange){
                $('[data-layout="iframe"]').css('height',layout.sample.content.browser.content.iframe.height);
            }
            if(!layout.sample.content.browser.content.iframe.visible) {
                $('[data-layout="iframe"]').css('display','none');
            }
            if(layout.sample.content.browser.content.log.height!='15%'||isChange){
                $('[data-layout="log"]').css('height',layout.sample.content.browser.content.log.height);                
                var bottom="calc("+layout.sample.content.browser.content.log.height+" + 12px)";
                $('.content-browser').find('.icon_tip').css('bottom',bottom);
                if(Number(layout.sample.content.browser.content.log.height.replace('%',''))>=93) $('.content-browser').find('.icon_tip').hide();
            }
            if(layout.sample.content.browser.content.log||isChange) {               
                setCookie('switchlog', layout.sample.content.browser.content.log.visible ? 1 : 0);
                layout.sample.content.browser.content.log.visible ? $('#content_sample .content-browser').removeClass('hidelog') : $('#content_sample .content-browser').addClass('hidelog');
                layout.sample.content.browser.content.log.visible ? $('#content_sample .content-browser .screen').first().show() : $('#content_sample .content-browser .screen').first().hide();
            }
            if(layout.sample.content.browser.content.iframe||isChange) {
                setCookie('debugSwitch', (layout.sample.content.browser.visible&&layout.sample.content.browser.width!='0%'&&layout.sample.content.browser.content.iframe.visible) ? 1 : 0);
                if(!layout.sample.content.browser.content.iframe.visible) {
                    if(typeof(debugSwitchFalse)=='function') debugSwitchFalse();
                    if(typeof(is3D)=='function') is3D();
                }
            }

            // 3d预览窗口
            if(layout.sample.content.browser.content.iframe.newWindow&&!isNewIframe){
                if(newWindow){
                    newWindow=null;
                }

                try {
                    $('.float').trigger('click');
                } catch(e) {
                    // console.log(0,newWindow==null)
                    // 如果用户浏览器拦截弹窗，那么会弹出询问窗口
                    if(newWindow == null) {
                        var f1=function(){
                            swal_close();
                            $('.float').trigger('click');
                        }
                        newConfirm('弹窗已被浏览器拦截，点击允许弹出',['弹出','关闭'],[f1,swal_close])
                    }
                }
            }
            // 日志窗口展开和收回状态
            if(layout.sample.quanpingLog){
                $('.content.clearfix').addClass('quanpingLog')
            }
            if(isChange&&layout.sample.content.browser.content.iframe&&layout.sample.content.browser.content.iframe.visible) {
                $('.content-browser .float').show();
                $('.content-browser .quanping').show(); 
                setTimeout(()=>{
                    reloadIframe()
                },0)
            }
            // 日志预览窗口
            if(layout.sample.content.browser.content.log.newLogWindow){
                setCookie('switchlog',1);
                if(newLogwindow){
                    newLogwindow=null;
                }
                try {
                    var top = window.screen.availHeight - window.document.body.offsetHeight + 66;
                    var left = window.document.body.offsetWidth / 2;
                    window.newLogwindow = window.open('', '', "width=500,height=480,screenX=" + left + ",screenY=" + top);
                    logFloat=true;
                    window.enterLogFloat();
                    if(newLogwindow == null) {
                        var f1=function(){
                            swal_close();
                            var top = window.screen.availHeight - window.document.body.offsetHeight + 66;
                            var left = window.document.body.offsetWidth / 2;
                            window.newLogwindow = window.open('', '', "width=500,height=480,screenX=" + left + ",screenY=" + top);
                            logFloat=true;
                            window.enterLogFloat();
                        }
                        newConfirm('日志弹窗已被浏览器拦截，点击允许弹出',['弹出','关闭'],[f1,swal_close])
                    }
                } catch(e) {
                    // 如果用户浏览器拦截弹窗，那么会弹出询问窗口
                    if(newLogwindow == null) {
                        var f1=function(){
                            swal_close();
                            var top = window.screen.availHeight - window.document.body.offsetHeight + 66;
                            var left = window.document.body.offsetWidth / 2;
                            window.newLogwindow = window.open('', '', "width=500,height=480,screenX=" + left + ",screenY=" + top);
                            logFloat=true;
                            window.enterLogFloat();
                        }
                        newConfirm('日志弹窗已被浏览器拦截，点击允许弹出',['弹出','关闭'],[f1,swal_close])
                    }
                }
            }

            if(!layout.sample.content.editorvs.visible){
                setTimeout(() => {
                    monaco.editor.defineTheme('myCustomTheme', {
                        base: 'vs',
                        inherit: true,
                        rules: [{
                            token: 'thingjs.thing',
                            foreground: 'FF7F00',
                            fontStyle: 'bold',
                        }]
                    });
                    if ($('.sam_menu li.menu_item[data-menu="view"]').children('.con_list').length) {
                        setTheme();
                    }
                    _hmt_maidian('在线开发页面', '快捷键', _themeStyle === 'vs-dark' ? '黑底风格' : '白底风格');
                    _themeStyle === 'vs-dark' ? $('.theme').children('.iconfont').addClass('selected') : $('.theme').children(
                        '.iconfont').removeClass('selected');
                    // 初始化
                    _themeStyle='vs'
                }, 500);
            }
        }
    }
}
var logFloat=false;
$('.content-nav .nav_drag').mousedown(function (e) {
    if (getCookie("debugSwitch") == 0) return;
    $('.content-nav .nav_drag').addClass('show_nav_drag');
    // $('.sambg').show();
    var ew = $('.content-nav').width();
    var bw = $('#content_sample').width();
    // var dw=$('#content_sample #editor').width();
    // var mw=$('#content_sample .content-middle').width();
    // var rw=$('#content_sample .content-browser').width();
    var spacX = e.pageX;
    $(document).bind("mousemove", function (ev) {
        var ev = ev || window.event;
        var x = ev.pageX - spacX; 
        var newX; 
        if('#tab_list1'){
            newX=300;
        }else{
            newX=185;
        }       
        if(ew + x <=newX ||ew + x>=950) return;
        if (ew + x >= 0 && bw - x >= 0) {
            $('.content-nav').css({
                'width': ew + x + 'px'
            });
            $('#content_sample').css({
                'left': ew + x + 'px',
                'width': bw - x + 1 + 'px'
            });
            if($('.wrapper-sam .content .content-browser').is(':visible')) {
                $('#content_sample #editor').css({'width': ""});
                $('#content_sample .content-middle').css({'width': ""});
                $('#content_sample .content-browser').css({'width': ""});
            } else {}
            $('.editor_img').width($("#editor").width())
        }
    });
});
$('.content-nav .drag').on('mousemove', function () {
    if (getCookie("debugSwitch") == 0) {
        debugSwitchFalse();
        $('.content-nav .nav_drag').css({
            'cursor': 'not-allowed'
        });
        $('.content-nav .nav_drag').attr('title', '请到设置中开启调试');
    } else {
        $('.content-nav .nav_drag').css({
            'cursor': 'ew-resize'
        });
        $('.content-nav .nav_drag').attr('title', '左右拖动')
    }
})
window.onresize=function(){
    if($('.content-nav:visible').length) {
        var width=$('.content-nav:visible')[0].offsetWidth;
        $('#content_sample').css('width',"calc(100% - "+width+"px)");
        $('#content_sample').css('left',width+'px');
    }
    if($('#ifId[data-layout="iframe"').length&&$('#ifId[data-layout="iframe"]:visible').length&&$('.content-browser:visible').length&&$('.browser-header:visible').length&&$('.screen').length) {
        var h=$('.content-browser').height()-$('.content-browser .browser-header')[0].offsetHeight-$('.content-browser .screen').first().height();
        $('#ifId[data-layout="iframe"]:visible').height(h)
    }
}
// 在线编辑浏览器全屏
$('.quanping').click(function () {
    if(!thumbState) $('.panelModel').hide();
    if(!thumbState)  $('.panelHeader .close').trigger('click');
    if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
    if(!storeThumbState)  $('#moveclose-dialog_store .panelHeader .close').trigger('click');
    // suojinStatus = true;
    // $('.suojin').attr('src', '../../guide/image/sjz.png');
    F = '860';
    if ($(this).hasClass('tuichu')) {
        $('.content-nav').animate({
            'left': '0px'
        });
        $('.content-nav').removeClass('content-nav-quan');
        $('#content_sample').css({
            'left': $('.content-nav:visible').css('width'),
            'width': 'calc(100% - '+$('.content-nav').css('width')+')',
            'height': ''
        });
        $('.content-middle').css({
            'width': '50%',
            'display': 'block'
        });
        $('#content_sample #editor').css({
            'width': '50%',
            'display': 'block'
        });
        $('.content-browser').css('width', '50%');
        $('.float').show();
        $('.wrapper-sam.sam-new').children('.content').first().removeClass('quanpingIframe');
        // $('#ifId').css('height', '');
        if($('.screen').length) $('.screen')[0].style.zIndex = '99';
        $(this).attr('title', '全屏');
        $(this).removeClass('tuichu');
        $('.icon_tip').removeClass('tuichu_icon');
        $('.browser-header').show();
        $('.sam_header').show();
        // $('.right_bottom_corner.QQ.WX.kaifaBtn').show();
    } else {
        $('.content-nav').addClass('content-nav-quan');
        $('#content_sample').css({
            'left': 0,
            'width': '100%',
            'height': 'calc(100%)'
        });
        $('.content-middle').css({
            'width': '0%',
            'display': 'none'
        });
        $('.content-browser').css('width', '100%');
        $('.float').hide();
        if(!thumbState) $('.panelModel').hide();
        if(!thumbState)  $('.panelHeader .close').trigger('click');
        if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
        if(!storeThumbState)  $('#moveclose-dialog_store .panelHeader .close').trigger('click');
        // $('#ifId').css('height', '100%');
        $('.wrapper-sam.sam-new').children('.content').first().addClass('quanpingIframe');
        if($('.screen').length) $('.screen')[0].style.zIndex = '-1';
        $(this).attr('title', '退出全屏');
        $('.right_bottom_corner.QQ.WX.kaifaBtn').hide();
        $(this).addClass('tuichu');
        $('.icon_tip').addClass('tuichu_icon');
        $('.browser-header').hide();
        $('.sam_header').hide();
    }
});

var isBlock = false;
var cursorColumn = 0;
function codeBlock(code, dialogType, isVip) {
    if(!isLogin('enter','codeBlock')) return;
    // if(isVip){
    //     blockMyCustomer(code);
    //     return;
    // }
    insertTextToEditor(monacoEditor, code);
    if(!thumbState)  $('.panelHeader .close').trigger('click');
    if(!storeThumbState)  $('#moveclose-dialog_store .panelHeader .close').trigger('click');
}

// function blockMyCustomer(value){
//     var reData = {
//         'codeKey': value
//     }
//     $.ajax({
//         url: '/api/getCode',
//         type: 'post',
//         ContentType: 'application/json',
//         dataType: 'json',
//         data: reData,
//         cache: false,
//         success: function (result) {
//             if(result && result.code){
//                 if(result.code == 200){
//                     value = result.data;
//                     insertTextToEditor(monacoEditor, value);
//                     if(!thumbState)  $('.panelHeader .close').trigger('click');
//                 }else if(result.code == 500){
//                     newAlert('“快捷代码VIP部分”仅对VIP用户开放','warning');
//                 }else if(result.code == 501){
//                     newAlert('请求失败!','warning');
//                 }
//             }else{
//                 newAlert('请求失败!','warning');
//             }
//         },
//         error: function(err){
//             console.log(err)
//             newAlert('请求失败!','warning');
//         }
//     })
// }

// 代码块-获取模型-
function getModel(id) {
    var str = $('#me02Se01Th01').html();
    var modelUrl = $('#' + id).html();
    var result = str.replace('modelUrl', "'" + modelUrl + "'");
    return result;
}

// 编辑器设置
$('.editor-setting .set-p').click(function () {
    $('.editor-setting .setting').toggle();
});
// 编辑器设置项点击
$('.editor-setting .setting .set-li').click(function () {
    $('.editor-setting .setting').hide();
});

// 二级菜单
var oul = document.getElementById('list0');
var oH4 = oul.getElementsByClassName('p-title');
var aul = oul.getElementsByTagName('ul');
var aulList = [];
for (var i = 0, oh4Len = oH4.length; i < oh4Len; i++) {
    aulList.push(aul[i]);
    oH4[i].index = i;
    oH4[i].onclick = function () {
        var _this = this.index;
        // console.log(_this);
        for (var h = 0; h < aulList.length; h++) {
            if (h != _this) {
                // aulList[h].style.display = 'none';
                // $(aulList[h]).slideUp();
                // oH4[h].className = 'p-title';
            } else {
                //如果当前的ul是关闭的，则展开，否则关闭
                if (this.className == 'p-title') {
                    if(oH4[_this].id=='jzk_vip') {
                        if(!isLogin('enter','openMenu')) return;
                        if (!checkUserAuth()) return newAlert('“VIP专栏”仅对VIP用户开放','warning');
                    }
                    // aul[_this].style.display = 'block';
                    $(aulList[h]).slideDown();
                    oH4[_this].className = 'p-title active';
                    // if (_this < 12) {
                    //     $(oul).scrollTop(46 * (_this - 3));
                    // } else {
                    //     $(oul).scrollTop(46 * (_this + 1));
                    // }
                } else {
                    // aul[_this].style.display = 'none';
                    $(aul[_this]).slideUp();
                    oH4[_this].className = 'p-title';
                }
            }
        }
    }
}
var oul1 = document.getElementById('list2');
var oH41 = oul1.getElementsByClassName('p-title');
var aul1 = oul1.getElementsByTagName('ul');
var aulList1 = [];
for (var i = 0, oh4Len1 = oH41.length; i < oh4Len1; i++) {
    aulList1.push(aul1[i]);
    oH41[i].index = i;
    oH41[i].onclick = function () {
        var _this = this.index;
        // console.log(_this);
        for (var h = 0; h < aulList1.length; h++) {
            if (h != _this) {
                // aulList[h].style.display = 'none';
                // $(aulList[h]).slideUp();
                // oH4[h].className = 'p-title';
            } else {
                //如果当前的ul是关闭的，则展开，否则关闭
                if (this.className == 'p-title') {
                    $(aulList1[h]).slideDown();
                    oH41[_this].className = 'p-title active';
                } else {
                    $(aul1[_this]).slideUp();
                    oH41[_this].className = 'p-title';
                }
            }
        }
    }
}
var liObj = $('.item-li');
var f = {
    flagJs: false,
    flagHtml: false,
    flagCss: false
}

function manageSample(target, name, urlHtml, urlCss,version=1) {
    if($(target).attr('data-vip')&&$(target).attr('data-vip').length) {
        if(!isLogin('enter','openSampleLi')) return;
        if (!checkUserAuth()) return newAlert('“VIP专栏”仅对VIP用户开放','warning');
    }
    if(isLoginOther) {loginOutTime();}
    if ($('#bfilen').attr('type') == 'new' && $('#bfilen').is(':visible')) {
        saveCursorPosition();
        var f1 = function () {
            upload_publish();
            var jishi = setInterval(function () {
                if ($('#content_section .hint').is(':visible')) {
                    clearInterval(jishi);
                    f2();
                }
            }, 100);
        };
        var f2 = function () {
            const CSTR = 'sample';
            var url = null;
            //处理url
            if(version==1){
                if (name.slice(0, CSTR.length) == CSTR) {
                    url = name + '.js';
                } else if (name.match(/^[a-zA-Z]*$/) != null) {
                    url = '../../../demos/' + name + '/js/' + name + '.js';
                } else {
                    url = name;
                }
            }else{
                url = name + '.js';
            }
            
            _manageSamplePoint = manageSamplePoint(target, url,version);
            if (monacoEditor)
                _manageSamplePoint.next();

            if(!thumbState) $('.panelModel').hide();
            if(!thumbState)  $('.panelHeader .close').trigger('click');
            if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
            if(!storeThumbState)  $('#moveclose-dialog_store .panelHeader .close').trigger('click');
            
            swal_close();
        }
        var exTitle=$(target).html().trim().split('<img')[0].trim();
        newConfirm('您正要打开官方示例“'+exTitle+'”，当前项目尚未保存，是否保存新项目？', ['保存', '取消'], [f1, f2]);
        return;
    }
    if ($('#bfilen').is(':visible')) {
        saveCursorPosition();
        var num = parseInt(Math.random() * 1000);
        const CSTR = 'sample';
        var url = null;
        if(version==1){
            if (name.slice(0, CSTR.length) == CSTR) {
                url = path + '/guide/examples/js/' + name + '.js';
            } else if (name.match(/^[a-zA-Z]*$/) != null) {
                url = path + '/demos/' + name + '/js/' + name + '.js';
            } else {
                url = path + '/' + name;
            }
        }else{
            url = path + '/guide/official/js/' + name + '.js';
        }
        //处理url
        var pathArr = ['官方', $(target).text().trim(), $(target).text().trim() + '.js'];
        if ($('.setting2').find("li.reference_li[data-realPath='" + url + "']").length) {
            $('.setting2').find("li.filen-active").removeClass('filen-active');
            $('.setting2').find("li.reference_li[data-realPath='" + url + "']").addClass('filen-active');
        } else if ($('.setting2 li').length >= LIMIT) {
            newAlert('最多可打开同时' + LIMIT + '个文件！', 'warning');
            return;
        }
        addReference($(target).text().trim() + '.js', url + '?n=' + num, pathArr, url, $(target));
        setCursorPosition();
        return;
    }
    // 多文档编辑
    //if (ff) addMultifile($(target).html(), $(target).attr('id'));
    const CSTR = 'sample';
    var url = null;
    //处理url
    if(version==1){
        if (name.slice(0, CSTR.length) == CSTR) {
            url = name + '.js';
        } else if (name.match(/^[a-zA-Z]*$/) != null) {
            url = '../../../demos/' + name + '/js/' + name + '.js';
        } else {
            url = name;
        }
    }else{
        url = name + '.js';
    }
    
    _manageSamplePoint = manageSamplePoint(target, url,version);
    if (monacoEditor)
        _manageSamplePoint.next();

    if(!thumbState) $('.panelModel').hide();
    if(!thumbState) $('.panelHeader .close').trigger('click');
    if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
    if(!storeThumbState) $('#moveclose-dialog_store .panelHeader .close').trigger('click');
    
};

function* manageSamplePoint(target, url,version=1) {
    if(!getQueryString('g')==1) {
        if(!thumbState) $('.panelModel').hide();
        if(!thumbState)  $('.panelHeader .close').trigger('click');
        if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
        if(!storeThumbState) $('#moveclose-dialog_store .panelHeader .close').trigger('click');
    }
    if (target == 1) {
        tab_change(1);
        $('#gf').hide();
        $('.filen').show();
        if (!isLogin('tab_change')) {
            $('#gf').show();
            $('.filen').hide();
            tab_change(0);
            manageSample($('#sample_01_Hello'), 'sample_01_Hello');
            return;
        }
        if (getQueryString("f")) {
            $('#gf').show();
            $('.filen').hide();
            var fileN = decodeURI(getQueryString("f"));
            $('#list1 li[data-name="' + fileN + '"] i.icon-file').trigger('click', 'f');
            $('#list1 li ul p.pro_main[data-name="' + fileN + '"]').trigger('click');
            if (getCookie("debugSwitch") == 0) {
                debugSwitchFalse();
            }
            // var isPro = $(".lifileResoure[data-name='" + fileN + "']").data('isPro') == 1;
            // var url = './uploads/wechat/' + getCookie('openid') + '/' + (+isPro ? 'project/' : '') + fileN + '.js';
            // $('.setting2 li #bfilen').data({
            //     nameBefore:fileN,
            //     url:url
            // })
            $('.bg-upload.sceneUpload.fileUpload').hide();
            $('.add_file_li').remove();
            // loadOpen(null,fileN,url)
            reloadIframe();
        } else if (getQueryString("i") || getQueryString("o")) {
            monacoModel.setValue(app_code);
            if (getCookie("debugSwitch") == 0) {
                debugSwitchFalse();
            } else {
                reloadIframe();
            }
            $('#bfilen').text('Untitled.js').attr('type', 'new');
            typeinit('new');
            // $('#list1 .curLi .curList .newProduct.newlifile .dirList .pro_name').text('Untitled.js');
            setUrl(null, []);
            $('.wrapper-sam .content .editor').css({
                'height': 'calc(100% - 96px)',
                'top': '60px'
            });
            $('.wrapper-sam .content .content-middle .editor-setting').css({
                'height': '60px'
            });
        } else if (getQueryString("cbuilder")) {
            $('#gf').show();
            $('.filen').hide();
            manageSample($('#sample_01_Hello'), 'sample_01_Hello');
        }
    } else {
        var _this = target;
        if ($('.filen-active .filen-edit').is(':visible')) {
            ifLeaveThisPage($(_this));
            return;
        }
        var num = parseInt(Math.random() * 1000)
        var ttt = url.split(/[.\/]/);
        $('#gf').data('name', ttt[ttt.length - 2]);
        if(version==1){
            if (url && url.indexOf('./examples/js/') != 0){
                url = './examples/js/' + url + '?n=' + num;
            }
        }else{
            url = './official/js/' + url + '?n=' + num; 
        }
        
            
        // if (url && url.indexOf('./examples/js/') == 0)
        //     url = './official/js/' + url + '?n=' + num;
        // 设置高亮
        if ($(_this).length) {
            for (var j = 0, len = liObj.length; j < len; j++) {
                $(liObj[j]).removeClass('active');
            }
            $(_this).addClass('active');
            $('#gf').html("<i class='filen-edit' style='margin: 4px 5px 0px -5px;display: none;float: left;'>*</i>" + $(_this).text() + '.js');
            setUrl(_this, $(_this).text());
            if (!$(_this).parent('.item').siblings('.p-title').hasClass('active')) {
                $(_this).parent('.item').siblings('.p-title').trigger('click');
            }
        }
        // vip专栏判断
        if(typeof(target)=='object'&&getQueryString('c')&&target[0]&&target[0].nodeType==1) {
            if($(target).parents('li').find('p#jzk_vip.p-title').length) {
                if(isLogin()&&(!checkUserAuth())){
                    $('#gf').show();
                    $('.filen').hide();
                    $('.filen-active .filen-edit').hide();
                    $('.setting2 .filen-close').remove();
                    $('.wrapper-sam .content .editor').css({
                        'height': 'calc(100% - 96px)',
                        'top': '60px'
                    });
                    $('.wrapper-sam .content .content-middle .editor-setting').css({
                        'height': '60px'
                    });
                    newAlert("您当前预览的官方示例仅对VIP用户开放，请升级后使用",'warning');
                    reloadIframe();
                    return;
                }
            }
        }
        // 请求文件
        if (monacoEditor) {
            manage(url, monacoEditor, 'flagJs');
        } else {
            js_url_cache = url;
        }

        $('#gf').show();
        $('.filen').hide();
        $('.filen-active .filen-edit').hide();
        $('.setting2 .filen-close').remove();
        $('.wrapper-sam .content .editor').css({
            'height': 'calc(100% - 96px)',
            'top': '60px'
        });
        $('.wrapper-sam .content .content-middle .editor-setting').css({
            'height': '60px'
        });
        $('.auto').hide();
        clearInterval(setId);
        closeMyFile();
        //切换资源页面
        if ($('.files-menu').length == 1) {
            createFileMenu();
        }
        // $('.btn-version').text('最新版');
        // if ($('.data-push').css('visibility') !== 'hidden') {
        //     $('.data-push').slideUp();
        // }
    }
};

function manage(url, editor, flags) {
    if(!isLogin('enter','openLi')) {
        reloadIframe();
        return;
    }
    $.ajax({
        url: getUrl(url),
        type: 'get',
        dataType: 'text',
        async: false,
        success: function (htmlData) {
            if (editor) {
                if (editor.getModel()._languageIdentifier.language != 'javascript') {
                    editor.getModel().setValue('');
                    monaco.editor.setModelLanguage(monacoModel, 'javascript')
                }
                editor.getModel().setValue(htmlData);
                editor.setScrollPosition({
                    scrollTop: 0
                });
                monacoEditor.focus();
                var a = htmlData.match(/\n/g);
                if (a && a.length < 33) {
                    editor.setPosition({
                        lineNumber: 1000,
                        column: 1
                    })
                }
            } else {
                data_cache[flags] = htmlData;
            }

            f[flags] = true;
            // 重新加载iframe页面
            if (f.flagJs) {
                f.flagJs = false;
                f.flagHtml = false;
                f.flagCss = false;
            }
        }
    })
    if (getCookie("debugSwitch") == 0) {
        debugSwitchFalse();
    } else {
        reloadIframe();
    }
}

var myfilename = {
    fileName: [],
    ProName: [],
    resourceDir: [],
    teamName:[],
    pdtlist:[],
    prolist:[],
    quickdtData:[]
};

function getVersionStr(version) {
    if (!version) return '';
    if (String(version).indexOf('.') < 0) {
        return ''
    } else {
        return '.' + version;
    }
}
/** 处于指引状态下，屏蔽保存按钮变成点击后进入下一环节 */
function upload_publish(arg, obj) {
    if (document.getElementById("startTeach").style.color == 'rgb(102, 102, 102)') {
        //处于引导状态则什么也不干
    } else {
        if (!isLogin('save')) {
            return;
        }
        if($('.setting2').is(':hidden')) return;
        if ($('.setting2 #gf').is(':hidden') && $('.setting2 .filen').is(':hidden')) {
            newAlert('项目未打开，请打开或新建一个项目', 'warning');
            return;
        }
        // .cht文件不保存
        if ($('.setting2 .filen-active').length) {
            if (!$('.setting2 .filen-active').hasClass('filen') && $('.setting2 #bfilen').is(':visible') && $('.setting2 .filen-active').attr('data-name').split('.').pop() == 'cht') return;
        }
        
        if (!$('.setting2 #gf').is(':visible') && !$('.setting2 #bfilen').is(':visible')) {
            CreateCode(this);
            upload_publish();
            // newAlert('项目未打开，请打开或新建一个项目','warning');
            return;
        }
        if ($('.setting2 .filen-active').hasClass('reference_li')) return;
        var current_ext='';
        try {
            current_ext= $('.setting2 .filen-active').attr('data-url').split('.').pop();
            if(current_ext&&IGMORE_TYPE.indexOf(current_ext)!=-1) return;
        } catch (error) {}
        if ($('.setting2 .filen-active').is(':visible') && !$('.setting2 .filen-active').hasClass('filen') && $('#bfilen').attr('type') != 'new') {
            if (!$('.setting2 .filen-active').data('url')) return; 
            var teamLeaderId = getLeaderid();
            if(teamLeaderId && controlSave("teamLeader",null,arg)) return;
            if($(".curList .teamleader.active").length && controlSave("teamMember",null,arg))return;
            $.ajax({
                url: '/api/saveResource',
                type: 'post',
                data: {
                    content: JSON.stringify(monacoModel.getValue()),
                    file: $('.filen-active').data('url').substring($('.filen-active').data('url').indexOf('file/') + 4),
                    leaderid:teamLeaderId
                },
                success: function (data) {
                    if (data.code == 200) {
                        hintShow('保存成功');
                        $('.filen-active .filen-edit').hide();
                        if (data.message && data.message == 'versionError!'){
                            newAlert('ThingJS包（thing.min.js）版本号无效', 'warning');
                        }
                    } else if (data.state == 500||data.code == 500) {
                        newAlert(data.message + '!', 'error');
                    }
                }
            })
            return;
        }
        if (!$('.filen').hasClass('filen-active') && $('.filen').is(':visible')) return;
        var filename = $('#bfilen').text().split('.')[0];
        var fileJust = filename;
        var nameBefore = $('#bfilen').data('nameBefore');
        var nameBeforeJust = nameBefore;
        if (filename != '' && $('#gf').is(':hidden')) {
            if ($('#bfilen').attr('type') == 'new') {
                if ((myfilename.fileName.length + myfilename.ProName.length) >= jsnums) {
                    newAlert('最多保存' + jsnums + '个文件！', 'warning');
                    return;
                }
                closeMyFile();
                fileNamedDialog({}, (val, isOpen) => {
                    $('#gf').hide();
                    $('#bfilen').text(val + '.js').attr('type', '');
                    if($('#bfilen').is(':visible')) $('.filen').addClass('filen-active');
                    $('.filen').show();
                    setUrl(null, [val, val + '.js'])
                    $('#bfilen').data('isOpen', isOpen);
                    obj ? upload_publish('saveNew', obj) : upload_publish(arg);
                    $('.tab-li').each(function (index, e) {
                        if ($(this).hasClass('active')) {
                            if (index == 0 || index!=$('.tab-li').length-1) {
                                $(this).removeClass('active');
                                $('#tab_mylist').addClass('active');
                                $('ul.list').hide();
                                $('#list1').show();
                            }
                        }
                    })
                });
                return;
            }
            if (filename != nameBefore && nameBefore != '') {
                myfilename.fileName.find(function (value, index, arr) {
                    if (value == nameBefore) arr.splice(index, 1, filename)
                })
                myfilename.resourceDir.find(function (value, index, arr) {
                    if (value == nameBefore) arr.splice(index, 1, filename)
                })
            } else if (nameBefore == '') {
                if (myfilename.fileName.indexOf(filename) == -1) {
                    myfilename.fileName.unshift(filename);
                    myfilename.pdtlist.unshift(data);
                }
            }
            var version = getVersionStr($('#bfilen').data('version'));
            var versionChange = '';
            if ($('.select-box .selected').is(':visible')) {
                // versionChange = getVersionStr($('.select-box .selected').data('version'));
                versionChange = '';
            } else {
                versionChange = version;
            }
            if (filename == nameBefore && versionChange == version) {
                nameBefore = '';
            }
            if (nameBefore != '') {
                nameBefore += version;
            }

            filename += versionChange;
            var browseType = window.location.protocol;
            browseType = browseType.substring(0,browseType.length-1);

            //当前thing版本、uearth版本
            // var tVer = '';
            // // var uVer = '';
            // if(document.getElementById('ifId') &&
            //    document.getElementById('ifId').contentWindow
            //    ) {
            //     if(document.getElementById('ifId').contentWindow.THING &&
            //        document.getElementById('ifId').contentWindow.THING.VERSION) {
            //         tVer = document.getElementById('ifId').contentWindow.THING.VERSION;
            //     }
            //     // if(document.getElementById('ifId').contentWindow.CMAP &&
            //     //    document.getElementById('ifId').contentWindow.CMAP.VERSION) {
            //     //     uVer = document.getElementById('ifId').contentWindow.CMAP.VERSION;
            //     // }
            // }
            var data = {
                name: filename,
                content: JSON.stringify(monacoModel.getValue()),
                nameBefore: nameBefore,
                isOpen: $('#bfilen').data('isOpen'),
                isPro: $('#bfilen').data('isPro'),
                browseType: browseType
            }
            if (!app && (getCookie("debugSwitch") == null || getCookie("debugSwitch") == 1)) {
                if ($('#ifId') && $('#ifId')[0] && $('#ifId')[0].contentWindow && $('#ifId')[0].contentWindow.THING && $('#ifId')[0].contentWindow.THING.App && $('#ifId')[0].contentWindow.THING.App.current) {
                    app = $('#ifId')[0].contentWindow.THING.App.current;
                }
            }
            if (!$('#bfilen').data('capture') && (getCookie("debugSwitch") == null || getCookie("debugSwitch") == 1) && app) {
                appOnLoadSet(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj);
            } else {
                uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj)
            }

        } else if ($('#bfilen').is(':hidden') || filename == '') {
            if ((myfilename.fileName.length + myfilename.ProName.length) >= jsnums) {
                newAlert('最多保存' + jsnums + '个文件！', 'warning');
                return;
            }
            closeMyFile();
            fileNamedDialog({}, (val, isOpen) => {
                $('#gf').hide();
                $('#bfilen').text(val + '.js').attr('type', '');
                if($('#bfilen').is(':visible')) $('.filen').addClass('filen-active');
                $('.filen').show();
                setUrl(null, [val, val + '.js'])
                $('#bfilen').data('isOpen', isOpen);
                obj ? upload_publish('saveNew', obj) : upload_publish(arg);
                $('.tab-li').each(function (index, e) {
                    if ($(this).hasClass('active')) {
                        if (index == 0 || index!=$('.tab-li').length-1) {
                            $(this).removeClass('active');
                            $('#tab_mylist').addClass('active');
                            $('ul.list').hide();
                            $('#list1').show();
                        }
                    }
                })
            });
        }
    }
}

function uploadJs(data, arg, fileJust, versionChange, filename, nameBeforeJust, obj) {
    var teamLeaderId = ""
    if($(".curList .team.active").length){
        teamLeaderId=decodeURIComponent(getLeaderid());
        // teamLeaderId = $(".curList .team.active").attr("data-url");  
        // teamLeaderId = teamLeaderId.split("/wechat/")[1].split("/")[0]; 
        data.leaderid = teamLeaderId;
        if ( controlSave("teamMember","mainFile",arg) ) return;
    }
    if( $(".curList .teamleader.active").length && controlSave("teamLeader","mainFile",arg) ) return;
    if(teamLeaderId!=getCookie("openid", true)&&$(".curList .team.active").length) {
        var jsUrl = $(".curList .team.active").data("url");
        try {
            var index=jsUrl.indexOf('/uploads/wechat/'+teamLeaderId+'/project/');
            if(index!=-1&&index<2) {
                var newData=Object.assign({},data);
                newData.isPro=1;
            } 
        } catch (error) {}
    }
    $.ajax({
        url: "/api/upload",
        data: JSON.stringify(newData?newData:data),
        type: "Post",
        dataType: "json",
        async: false,
        cache: false, //上传文件无需缓存
        processData: false, //用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (result) {
            if (result.state == 'ok') {
                var currenttime = getNowFormatDate();
                if (result.message == null) {
                    if(result.chartData == null || result.chartData.length == 0) {
                        hintShow('保存成功');
                    } else {
                        if(result.chartData.length > 1) {
                            hintShow('保存成功！项目中应用图表模板已保存至我的图表-“'+ result.chartData[0] +'”等。');
                        } else {
                            hintShow('保存成功！项目中应用图表模板已保存至我的图表-“'+ result.chartData[0] +'”。');
                        }
                    }
                }
                
                $('.filen-active .filen-edit').hide();
                clearInterval(setId);
                if (arg == 'autosave') {
                    $('.setting1 .auto').html('自动保存于' + currenttime).show().addClass('auto-save');
                } else {
                    $('.setting1 .auto').html('保存于' + currenttime).show().addClass('auto-save');
                    // autosave();
                }
                if (data.isPro&&data.isPro==1) {
                    var order=myfilename.ProName.indexOf(data.name);
                    myfilename.ProName.splice(order, 1);
                    myfilename.ProName.unshift(data.name);
                    myfilename.prolist.splice(myfilename.prolist.indexOf(myfilename.prolist.find(function(v,i){ return i === order; })), 1);
                    myfilename.prolist.unshift(data);
                } else {
                    if (obj) {
                    } else {
                        var order=myfilename.fileName.indexOf(data.name);
                        myfilename.fileName.splice(order, 1);
                        myfilename.fileName.unshift(data.name);
                        myfilename.pdtlist.splice(myfilename.pdtlist.indexOf(myfilename.pdtlist.find(function(v,i){ return i === order; })), 1);
                        myfilename.pdtlist.unshift(data);
                    }
                }
                if (myfilename.resourceDir.indexOf(data.name) !== -1) {
                    myfilename.resourceDir.splice(myfilename.resourceDir.indexOf(data.name), 1);
                    myfilename.resourceDir.unshift(data.name);
                }
                setTimeout(function () {
                    $('.setting1 .auto').removeClass('auto-save');
                }, 500);
                $('#bfilen').data('nameBefore', fileJust);
                $('#bfilen').data('version', versionChange.substring(1));
                $('#bfilen').data('time', new Date());
                //版本记录
                if(arg=='version') {
                    $.ajax({
                        url: '/api/changeVersion?type=0&ver=' + 
                            $('.select-box .selected').data('version') + '&thisJsName=' + $('#bfilen').data('nameBefore'),
                        type: 'get',
                        success : function(resData) {
                        }
                    })
                }
                var url = $('#bfilen').data('url');
                if (url != '') {
                    $('#bfilen').data('url', url.substring(0, url.lastIndexOf('/') + 1) + filename + '.js')
                } else {
                    $('#bfilen').data('url', './uploads/wechat/' + getCookie("openid", true) + '/' + filename + '.js')
                    $('#list1 li.pdtLi .pdtTitle label._num').html('(' + myfilename.fileName.length + myfilename.teamName + ')');
                    resourceSize();
                }
                if ($('#list1 li[data-name="' + nameBeforeJust + '"]').length >= 1) {
                    $('#list1 li[data-name="' + nameBeforeJust + '"]').remove();
                }
                addLiFile(fileJust, $('#bfilen').data('url'), $('#bfilen').data('version'), $('#bfilen').data('isOpen'), $('#bfilen').data('isPro'), 1, $('#bfilen').data('time'),null,myfilename.quickdtData,'',myfilename.decorData)
                if (obj && $(".lifileResoure.lifile[data-name='" + fileJust + "']").length) {
                    $(".lifileResoure.lifile[data-name='" + fileJust + "']").removeClass('active');
                }
                if ($('#bfilen').is(':visible')) {
                    if (fileJust == $('#bfilen').data('nameBefore')) {
                        clickIconFile($('#list1 li[data-name="' + $('#bfilen').data('nameBefore') + '"]').children('.icon-file'));
                    }
                }
                if (arg == 'autosave') {
                    // return;
                } else if (arg == 'rename') {
                    $('.wrapper-sam .content .editor').css({
                        'height': 'calc(100% - 96px)',
                        'top': '60px'
                    });
                    $('.wrapper-sam .content .content-middle .editor-setting').css({
                        'height': '60px'
                    });
                    $('.setting2 .filen-close').remove();
                    $('.filen').addClass('filen-active');
                }
                if (getCookie("saveSetSwitch") == 1 || arg == "version") {
                    reloadIframe();
                }
            } else if (result.state == 'fail') {
                newAlert(result.message +'！', 'error');
                if($('.curList').find('.newProduct.newlifile').length) {
                    $('#bfilen').text('Untitled.js').attr('type','new');
                    setUrl(null,[]);
                    myfilename.fileName.shift();
                    myfilename.pdtlist.shift();
                } else if(!$('.curList').children().length) {
                    $('.setting2 .filen').hide();
                    $('#list0 .item-li.active').trigger('click');
                    myfilename.fileName.shift();
                } else {
                    console.log(result.message);
                }
                return;
                // myfilename.fileName.find(function (value, index, arr) {
                //     if (value == fileJust) arr.splice(index, 1, nameBeforeJust)
                // });
            }
            if (arg == 'saveNew' && obj) {
                $('#bfilen').text(obj.data.nameBefore + '.js').attr('type', '');
                $('#bfilen').data(obj.data);
                loadOpen($('#bfilen'), obj.data.nameBefore, obj.data.url);
                if (!$(obj.item).hasClass('pro_main')) {
                    var name = $(obj.item).data('name');
                    var url = $(obj.item).data('url');
                    setUrl($(obj.item), name);
                    addMultifile(name, url, $(obj.item));
                }
            }
            if ($('#bfilen').is(':visible')) {
                moveLiFile($('#list1 li.lifileResoure.lifile[data-name="' + $('#bfilen').data('nameBefore') + '"]'));
            };
        }
    });
}

// 获取当前时间
function getNowFormatDate() {
    if(new Date().Format) {
        var time=new Date().Format('hh:mm:ss');
        if(time.indexOf('NaN')<0) return time;
    }
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = hours + seperator2 + minutes + seperator2 + seconds;
    return currentdate;
}

var setId = null;
// 自动保存
function autosave() {
    var uname = getUserName('name');
    if (uname && $('#gf').is(':hidden')) {
        clearInterval(setId);
        setId = setInterval(function () {
            if($(".filen-active .filen-edit").length && $(".filen-active .filen-edit").css('display') != 'none') upload_publish('autosave');
        }, 900000);
    }
}
//初始化垃圾箱
function initFileTrash() {
    myfileinit("垃圾箱", "", "", 1, 2, 0, "2017-01-01");
}
function initTrashNum() {
    if(!getCookie('mmdId')) return;
    if (PERMISSIONCONFIG.getPermission('垃圾箱')) {
        $.ajax({
            url: "/api/getTrashNum",
            dataType: "json",
            type: "get",
            success: function (data) {
                if (data.code == 200) {
                    if ($('#list1 .lifileResoure.lifile.trash ._name ._num').length == 0) {
                        $('#list1 .lifileResoure.lifile.trash ._name').append("<label class='_num'>(" + data.message + ")</label>");
                    } else {
                        $('#list1 .lifileResoure.lifile.trash ._name ._num').html("(" + data.message + ")");
                    }
                }
            },
            error: function () {
                if ($('#list1 .lifileResoure.lifile.trash ._name ._num').length == 0) {
                    $('#list1 .lifileResoure.lifile.trash ._name').append("<label class='_num'>(" + 0 + ")</label>");
                } else {
                    $('#list1 .lifileResoure.lifile.trash ._name ._num').html("(" + 0 + ")");
                }
            }
        })
    } else {
        $('.trash').remove();
    }
    // $.ajax({
    //     url: '/api/hasRole',
    //     type: 'post',
    //     headers: {
    //         Authorization: 'Bearer ' + getCookie('accessToken'),
    //     },
    //     data: {
    //         "mmdId": getCookie('mmdId'),
    //         "roleName": decodeURIComponent('垃圾箱')
    //     },
    //     dataType: 'json',
    //     success: function (data) {   
    //         if (data.success != true) {
    //             $('.trash').remove();
    //             return;
    //         }else{
    //             $.ajax({
    //                 url: "/api/getTrashNum",
    //                 dataType: "json",
    //                 type: "get",
    //                 success: function (data) {
    //                     if (data.code == 200) {
    //                         if ($('#list1 .lifileResoure.lifile.trash ._name ._num').length == 0) {
    //                             $('#list1 .lifileResoure.lifile.trash ._name').append("<label class='_num'>(" + data.message + ")</label>");
    //                         } else {
    //                             $('#list1 .lifileResoure.lifile.trash ._name ._num').html("(" + data.message + ")");
    //                         }
    //                     }
    //                 },
    //                 error: function () {
    //                     if ($('#list1 .lifileResoure.lifile.trash ._name ._num').length == 0) {
    //                         $('#list1 .lifileResoure.lifile.trash ._name').append("<label class='_num'>(" + 0 + ")</label>");
    //                     } else {
    //                         $('#list1 .lifileResoure.lifile.trash ._name ._num').html("(" + 0 + ")");
    //                     }
    //                 }
    //             })
    //         }
    //     }
    // })
}
// 我的文件
function domyfile(){
    var uname = getUserName('name');
    if(uname) {
        $.ajax({
            url: "/api/files",
            dataType: "json",
            type: "get",
            async: false,
            success: function (data) {
                data = data.fileAllMenu;
                $('#list1').html("");
                myfilename = {
                    fileName: [],
                    ProName: [],
                    resourceDir: [],
                    teamName:[],
                    pdtlist:[],
                    prolist:[]
                };
                if (data.length == 0) initSam();
                data.forEach(v => {
                    if (v.isPro) {
                        myfilename.prolist.push(v);
                    } else {
                        myfilename.pdtlist.push(v);
                    }
                    myfilename.resourceDir.push(v.name);
                });
                myfilename.prolist.sort(sortProjectTime);
                typeinit();
                // $.ajax({
                //     url: '/api/resourceList?dir=&ifSample=true',
                //     type: 'get',
                //     dataType: 'json',
                //     async: false,
                //     success: function (data) {
                //         data = data.fileAllMenu;
                //         if (data.length > 0) {
                //             for (var i = 0; i < data.length; i++) {
                //                 if (data[i].hasC != 0) {
                //                     myfilename.resourceDir.push(data[i].name)
                //                 }
                //             }
                //         }
                //     }
                // })
                initFileTrash();
                initTeamProject();
                var quickdtData=checkQuickDt();
                myfilename.quickdtData=quickdtData;
                var decorData = checkDecor();
                myfilename.decorData=decorData;
                let proNum = pdtNum = 0;
                proNum=myfilename.prolist.length;
                pdtNum=myfilename.pdtlist.length;
                for (var i = 0; i < myfilename.pdtlist.length; i++) {
                    var item=myfilename.pdtlist[i];
                    var filesname = item.pname||item.name;
                    myfilename.fileName.push(filesname);
                    // 1 项目名称 2 项目地址 3 版本 4 是否公开 5 项目（3协作开发 ）6 “0” 7 文件最后保存时间 8 quickDt项目 9 配饰项目
                    if(item.pname||item.modifytime||item.leaderid) {
                        // 协作项目
                        myfileinit(item.pname, item.path, "", 0, 3, 0,item.modifytime, quickdtData, '', decorData)
                    } else {
                        myfileinit(filesname, item.url, item.version, item.isOpen, 0, 0, item.time, quickdtData, '', decorData);
                    }                    
                }
                for (var i = 0; i < myfilename.prolist.length; i++) {
                    var item=myfilename.prolist[i];
                    var filesname = item.pname||item.name;
                    myfilename.ProName.push(filesname);
                    myfileinit(filesname, item.url, item.version, item.isOpen, 1, 0, item.time);                    
                }
                if ($('#bfilen').is(':visible') && $('#gf').is(':hidden')) {
                    reloadIframe();
                }
                $('#list1 .proLi .proTitle').append("<label class='_num'>(" + proNum + ")</label>");
                if($('#list1 .pdtLi .pdtTitle i.icon.previewProduct').length) {
                    $('#list1 .pdtLi .pdtTitle i.icon.previewProduct').before("<label class='_num aa'>(" + (pdtNum) + ")</label>");
                } else {
                    $('#list1 .pdtLi .pdtTitle').append("<label class='_num'>(" + (pdtNum ) + ")</label>");
                }
                initTrashNum();
                resourceSize();
            }
        }) 
    }
}
//匹配是否为quickDt项目
function checkQuickDt() {
    var list;
    $.ajax({
        url:'/api/sample/checkAllQdt',
        type:'get',
        async: false,
        success:function(data){
            try {
                if(data &&data.data && data.data.path&& data.data.id){
                    list = data.data;
                }
            } catch (e) {
                console.log(e);
            }      
        }
    });
    return list;
}

// 获取所有的配饰项目
function checkDecor(){
    var decor_list;
    $.ajax({
        url:'/api/sample/checkAllDecor',
        type:'get',
        async: false,
        success:function(data){
            try {
                if(data &&data.data && data.data.path&& data.data.id){
                    decor_list = data.data;
                }
            } catch (e) {
                console.log(e);
            }      
        }
    });
    return decor_list;
}

function resourceSize(){
    $.ajax({
        url:'/api/getUserProjectSize',
        type:'get',
        success:function(data){
            var size = data/1024/1024;
            if($(".pdtTitle .leftProjectSize").length == 0){
                $('#list1 .pdtLi .pdtTitle ._num').after("<label class='leftProjectSize' style='font-size: 12px;margin-left: 5px;'>(" + Math.round(size) + "M)</label>")
            }else{
                $('#list1 .pdtLi .pdtTitle .leftProjectSize').text('('+Math.round(size)+'M)');
            }
            
        }
    });
}
function ifLeaveThisPage(sureLeave) {
    checkLoginForSample().then(data=>{
        if(data) {
            saveCursorPosition();
            var cur_name = $('.setting2 .filen-active').children('#bfilen').length ? $('#bfilen').data('nameBefore') : $('.setting2 .filen-active').children('p').text();
            // 项目主文件未保存
            if ($('.setting2 .filen-active').children('#bfilen').length) {
                var f1 = function () {
                    // 保存切换至其他文件
                    upload_publish();
                    f3();
                    $('.setting2 .filen-edit').hide();
                };
                var f2 = function () {
                    // 不保存切换至其他文件
                    $('.setting2 .filen-edit').hide();
                    f3();
                };
                var f3 = function () {
                    $('.setting2 .filen-active').removeClass('filen-active');
                    $(sureLeave).parents('#list1').length ? $(sureLeave).addClass('active') : $(sureLeave).parent().hasClass('setting2') ? $(sureLeave).addClass('filen-active') : $(sureLeave).parent('li').addClass('filen-active');
                    if ($(sureLeave).hasClass('close-btn')) {
                        tabPage($(sureLeave).parent());
                    } else {
                        tabPage();
                    }
                    swal_close();
                };
                newConfirm('项目主文件“' + cur_name + '”未保存，您是否要切换到其他文件？', ['保存', '不保存', '取消'], [f1, f2]);
                return;
            }

            var f0 = function () {
                var Item = ($(sureLeave).hasClass('filen-close') || $(sureLeave).children('#bfilen').length) ? $(sureLeave) : $(sureLeave).parents('.filen-close');
                var isClose = $(sureLeave).hasClass('close-btn');
                if (isClose) {
                    var loadItem = $(sureLeave).parent('li').next('li').length ? $(sureLeave).parent('li').next('li') : $(sureLeave).parent('li').prev('li').length ? $(sureLeave).parent('li').prev('li') : $('#bfilen').parent('li');
                    var closePath = $(sureLeave).parent('li').attr('data-url');
                    $("#list1 .lifile.active[data-url='" + closePath + "']").removeClass('active');
                    $(sureLeave).parent('li').remove();
                    $(loadItem).addClass('filen-active');
                } else {
                    $('.setting2 .filen-active').removeClass('filen-active').children('.filen-edit').hide();
                    $(Item).addClass('filen-active');
                }
                if (Item.length) {
                    getNextPage();
                } else {
                    var name = $(sureLeave).attr('data-name');
                    var url = $(sureLeave).attr('data-url');
                    var arr = url.split('/').slice(5);
                    addReference(name, url, arr, url, $(sureLeave));
                }
                swal_close();
            };
            var f1 = function () {
                $('#bfilen').attr('type', '');
                saveCurPage({
                    content: JSON.stringify(monacoModel.getValue()),
                    file: $('.filen-active').data('url').substring($('.filen-active').data('url').indexOf('file/') + 4)
                })
                f0();
            };
            var f2 = function () {
                $('#bfilen').attr('type', '');
                f0();
            };
            var f3 = function () {
                clearInterval(setId);
                swal_close();
            }
            newConfirm('文件“' + cur_name + '”未保存，您是否要离开此页面？', ['保存', '不保存', '取消'], [f1, f2, f3]);
        }
    });
}

window.onbeforeunload = function () {
    if ($('.setting2 .filen-active .filen-edit').is(':visible')) {
        var cur_name = $('.setting2 .filen-active .filen-edit').parent('li').hasClass('filen') ? $('#bfilen').data('nameBefore') : $('.setting2 .filen-active .filen-edit').parent('li').children('p').text();
        //ifLeaveThisPage($(this));
        window.event.returnValue = $('.setting2 .filen-active .filen-edit').parent('li').hasClass('filen') ? "项目主文件“" + cur_name + "”未保存，是否确认离开?" : "文件“" + cur_name + "”未保存，是否确认离开?";
        return window.event.returnValue
    };
}

function typeinit(type) {
    if (type) {
        var text = $('.setting2 #bfilen').text();
        if ($('#list1 .curLi .curList').children().length <= 0) {
            var newFile = `<li class="newProduct newlifile active" onclick='triggerNew()'>
                <i class="iconfont icon-file active"></i>
                <span class="_name">新建项目</span>
                <ul class="dirList">
                    <p class="pro_main main_file">
                        <span class="pro_name">` + text + `</span>
                    </p>
                </ul>
            </li>`;
            $('#list1 .curLi .curList').append(newFile);
            $('.curTitle').addClass('active');
            $('.curList').slideDown();
        }
        if ($('#list1 .pdtLi').length) {
            if ($('.pdtTitle').hasClass('active')) {
                $('.pdtTitle').trigger('click');
            }
        }
        return;
    }
    if ($('#list1 .curLi').length <= 0) {
        $('#list1').append("<li class='curLi'><p class='curTitle'>当前项目 <i class='iconfont icon-shuaxin' title='刷新' style='display:none'></i></p><ul class='curList' style='display:none;'></ul></li>");
        $('.curTitle').on('click', function (event) {
            var event = event || window.event;
            if ($(event.target).hasClass('icon-shuaxin')) return;
            if ($('.curTitle').hasClass('active')) {
                $('.curTitle').removeClass('active');
                $('.curList').slideUp();
            } else {
                $('.curTitle').addClass('active');
                if ($('.curList').children().length) {
                    $('.curList').slideDown();
                }
            }
            // return false;
        })
    }
    if ($('#list1 .list1_2').length <= 0) {
        $('#list1').append("<li class='list1_2' style='margin-top:30px;'></li>");
        if ($('#list1 .pdtLi').length <= 0) {
            // $('#list1 .list1_2').append("<li class='pdtLi'><p class='pdtTitle'>项目库</p><ul class='pdtList'></ul></li>");
            $('#list1 .list1_2').append("<li class='pdtLi'><p class='pdtTitle'>项目库<i title='打开面板' class='icon previewProduct iconfont icon-tabtubiao' style='display:none;' onclick='iframeProduct()'></i></p><ul class='pdtList'></ul></li>");
            $('.pdtTitle').on('click', function (event) {
                if ($('.pdtTitle').hasClass('active')) {
                    $('.pdtTitle').removeClass('active');
                    $('.pdtList').slideUp();
                } else {
                    $('.pdtTitle').addClass('active');
                    if ($('.pdtList').children().length) {
                        $('.pdtList').slideDown();
                    }
                }
                return false;
            })
            $('.pdtTitle').trigger('click');
        }
        if ($('#list1 .proLi').length <= 0) {
            proTitle = $("<li class='proLi'><p class='proTitle'>已在线部署项目</p><ul class='proList' style='display:none'></ul></li>");
            if ($('#list1 .trash').length) {
                $('#list1 .trash').before(proTitle);
            } else {
                $('#list1 .list1_2').append(proTitle);
            }
            $('.proTitle').on('click', function (event) {
                if ($('.proTitle').hasClass('active')) {
                    $('.proTitle').removeClass('active');
                    $('.proList').slideUp();
                } else {
                    $('.proTitle').addClass('active');
                    if ($('.proList').children().length) {
                        $('.proList').slideDown();
                    }
                }
                return false;
            })
        }
    }
}

function triggerNew(e) {
    var e = e || window.event;
    // e.stopPropagation();
    if ($(e.target).parents('.dirList').length) return;
    var t = e.target;
    if ($(t).hasClass('_name')) t = $(t).parent();
    if ($(t).hasClass('active')) {
        $('.newProduct.newlifile,.newProduct.newlifile .iconfont.icon-file').removeClass('active');
        $('.newProduct.newlifile .dirList').slideUp();
    } else {
        $('.newProduct.newlifile,.newProduct.newlifile .iconfont.icon-file').addClass('active');
        $('.newProduct.newlifile .dirList').slideDown();
    }
}

function myfileinit(name, url, version, isOpen, isPro, add, time, quickdtData,isQuickDT,decorData) {
    if ($('#bfilen').is(':hidden')) {
        closeMyFile();
    }
    addLiFile(name, url, version, isOpen, isPro, add, time, null, quickdtData,isQuickDT,decorData);
}

function addLiFile(name, url, version, isOpen, isPro, add, time,isExitedOpening,quickdtData,isQuickDT,decorData, isCopyDecor = false) {
    var li = document.createElement('li');
    li.className = 'lifile';
    $(li).attr('data-name', name);
    var liText = $('<span class="_name" title="' + name + '">' + name + '</span>')
    // $(li).append(liText).append($('<label class="add iconfont"></label>'));
    $(li).append(liText);
    // if (myfilename.resourceDir.indexOf(name) >= 0) {
    if (name == "垃圾箱" && url == '') {
        li.className = 'lifileResoure lifile trash';
    }else if(isPro == 3){
        $(li).attr('data-url', url);
        li.className = 'lifileResoure lifile team';
    }else {
        $(li).attr('data-url', url);
        li.className = 'lifileResoure lifile';
        if(teamInfo.selfleaderTeamProList.indexOf(name) != -1){
            li.className = 'lifileResoure lifile teamleader';
        }
    }
    var liC = $('<i class="iconfont icon-file" title="展开项目资源"></i>');
    if(isPro == 3 || teamInfo.selfleaderTeamProList.indexOf(name) != -1){
        liC = $('<i class="iconfont icon-xiezuo teamIcon" title="协作开发"></i><i class="iconfont icon-file" title="展开项目资源"></i>');
    } 
    $(li).prepend(liC)
    // }
    if (isOpen == 0) {
        var lockImg = $('<i title="私有项目" class="iconfont icon-suo siyou"></i>');
        $(li).append(lockImg);
    }
    $(li).attr('isOpen', isOpen);
    $(li).data('isPro', isPro);
    var isOpen = Number($(li).attr('isOpen'));
    // quickdt项目
    var qtPath=[], qtIdList=[], quickDT;
    if(quickdtData){
        qtPath = quickdtData.path;
        qtPath = qtPath.split(',');
        qtIdList = quickdtData.id;
        qtIdList = qtIdList.split(',');
    }
    if(qtPath.indexOf(url)!= -1||isQuickDT){
        quickDT = true;
    }else {
        quickDT = false;
    }
    var quickdtI = $('<i title="QuickDT" class="qt"></i>');
    if (quickDT) {
        // 他人给的协作项目
        if(isPro == 3){
            li.className = 'lifileResoure lifile team teamQuickDT';
        }else if(teamInfo.selfleaderTeamProList.indexOf(name) != -1){
            li.className = 'lifileResoure lifile teamleader teamQuickDT';
        }else {
            $(li).children().first().before(quickdtI);
        }
    }
    $(li).attr('quickDT', quickDT);
    // 配饰项目
    var decorPath=[], decorIdList=[], decor;
    if(decorData){
        decorPath = decorData.path;
        decorPath = decorPath.split(',');
        decorIdList = decorData.id;
        decorIdList = decorIdList.split(',');
    }
    if(decorPath.indexOf(url)!= -1 || isCopyDecor){
        decor = true;
    }else {
        decor = false;
    }
    var decorI = $('<i title="decor" class="decor"></i>');
    if (decor) {
        // 他人给的协作项目
        if(isPro == 3){
            li.className = 'lifileResoure lifile team teamDecor';
        }else if(teamInfo.selfleaderTeamProList.indexOf(name) != -1){
            li.className = 'lifileResoure lifile teamleader teamDecor';
        }else {
            $(li).children().first().before(decorI);
        }
    }
    $(li).attr('decor', decor);
    //单击
    $(li).on('click', '.pro_main,.lifile,.pro_char', function (e) {
        clickLiFile(e, li, name, url, version, isOpen, isPro, add, time);
    })
    $(li).on('contextmenu', function (e) {
        if ($(this).parents(".trash").length) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        clickContextMenu(e, li, name, url, version, isOpen, isPro, add, time, qtIdList, qtPath);
    })
    var dateNow = new Date();
    var dateTime = new Date(time);
    var timeLiColor = "#757575";
    var timeLiVis = dateTime.Format('M/d');
    var isCurday = false;
    if (dateTime.getDate() == dateNow.getDate() && dateTime.getMonth() == dateNow.getMonth() && dateTime.getFullYear() == dateNow.getFullYear()) {
        timeLiVis = dateTime.Format('hh:mm');
        isCurday = true;
        timeLiColor = "#ccc";
    } else if (dateTime.getFullYear() != dateNow.getFullYear()) {
        timeLiVis = dateTime.Format('yy/M/d')
    }
    if (isPro == 1) {
        var timeLi = $('<div class="op_icons" style="display:none;position:absolute;right:10px;top:1px">' +
            '<span class="new_file" title="新建文件" style="display:inline-block;vertical-align:top;width:22px;" onclick="newPageFile(event,this)"></span>' +
            '<span class="upload_file" title="上传文件" style="display:inline-block;vertical-align:top;width:22px;" onclick="uploadPageFile(event,this)"></span>' +
            // '<span class="new_dir" title="新建目录" style="display:inline-block;vertical-align:top;width:22px;" onclick="newPageFile(event,this)"></span>' +
            '</div><div class="file_change_time" style="color:' +
            timeLiColor + ';position:absolute;right:15px;top:1px;" title="' +
            new Date(time).Format('yyyy-MM-dd hh:mm:ss') + '">' + timeLiVis + '</div>');
        $(li).append(timeLi)
        if(myfilename.ProName.indexOf(name)<=0) {
            $('.proList').prepend($(li));
        } else if($('.proList').children().eq(myfilename.ProName.indexOf(name)).length){            
            $('.proList').children().eq(myfilename.ProName.indexOf(name)).before($(li));
        } else {
            $('.proList').append($(li));
        }
    } else if (isPro == 2) {
        var timeLi = $('<div class="op_icons" style="display:none;position:absolute;right:10px;top:1px">' +
            '</div><div class="file_change_time" style="color:' +
            timeLiColor + ';position:absolute;right:15px;top:1px;" title="' +
            new Date(time).Format('yyyy-MM-dd hh:mm:ss') + '"></div>');
        $(li).append(timeLi);
        $(li).data({
            nameBefore: name,
            url: url,
            isOpen: isOpen,
            isPro: isPro,
            version: version,
            time: time,
            capture: 0
        });
        $('#list1 .list1_2').append(li);
    } else if( isPro == 3 ){//协作开发
        var timeLi = $('<div class="op_icons team_icons" style="display:none;position:absolute;right:10px;top:1px">' +
            '<span class="new_file" title="新建文件" style="display:inline-block;vertical-align:top;width:22px;cursor: pointer;" onclick="newPageFile(event,this)"></span>' +
            '<span class="upload_file" title="上传文件" style="display:inline-block;vertical-align:top;width:22px;cursor: pointer;" onclick="uploadPageFile(event,this)"></span>' +
            // '<span class="new_dir" title="新建目录" style="display:inline-block;vertical-align:top;width:22px;" onclick="newPageFile(event,this)"></span>' +
            '</div><div class="file_change_time" style="color:' +
            timeLiColor + ';position:absolute;right:15px;top:1px;" title="' +
            new Date(time).Format('yyyy-MM-dd hh:mm:ss') + '">' + timeLiVis + '</div>');
        $(li).append(timeLi);
        
        $(li).data({
            nameBefore: name,
            url: url,
            isOpen: isOpen,
            isPro: isPro,
            version: version,
            time: time,
            capture: 0
        });
        if (myfilename.fileName.indexOf(name) == 0) {
            $('#list1 .list1_2 .pdtLi .pdtList').prepend(li);
        } else {
            $('#list1 .list1_2 .pdtLi .pdtList').append(li);
        }
    } else {
        var timeLi = $('<div class="op_icons" style="display:none;position:absolute;right:10px;top:1px">' +
            '<span class="new_file" title="新建文件" style="display:inline-block;vertical-align:top;width:22px;cursor: pointer;" onclick="newPageFile(event,this)"></span>' +
            '<span class="upload_file" title="上传文件" style="display:inline-block;vertical-align:top;width:22px;cursor: pointer;" onclick="uploadPageFile(event,this)"></span>' +
            // '<span class="new_dir" title="新建目录" style="display:inline-block;vertical-align:top;width:22px;" onclick="newPageFile(event,this)"></span>' +
            '</div><div class="file_change_time" style="color:' +
            timeLiColor + ';position:absolute;right:15px;top:1px;" title="' +
            new Date(time).Format('yyyy-MM-dd hh:mm:ss') + '">' + timeLiVis + '</div>');
        $(li).append(timeLi);
        $(li).data({
            nameBefore: name,
            url: url,
            isOpen: isOpen,
            isPro: isPro,
            version: version,
            time: time,
            capture: 0
        });
        if(add) {
            if(isExitedOpening&&myfilename.fileName.indexOf(name)!=0) {
                $('#list1 .list1_2 .pdtLi .pdtList').children().eq(myfilename.fileName.indexOf(name)).before(li);
            } else {
                $('#list1 .list1_2 .pdtLi .pdtList').prepend(li);
            }
        } else {
            if (myfilename.fileName.indexOf(name) == 0) {
                $('#list1 .list1_2 .pdtLi .pdtList').prepend(li);           
            } else {
                $('#list1 .list1_2 .pdtLi .pdtList').append(li);
            }
        }                
    }
    if (isCurday) {
        $(li).attr('data-curDay', 1);
    }
    initSam();
    if (add) {
        $(li).addClass('active').siblings().removeClass('active');
    }
    $(li).mouseover(function (e) {
        var event = e || window.event;
        var _this = event.target;
        if($(_this).hasClass('trash') || $(_this).parents('.lifile').hasClass('trash')) return;
        if($(_this).parents('.dirList').length>0 || $(_this).hasClass('trash')){
            $(_this).parents('.lifile.lifileResoure').css({'background':'none'})
        }
        if($(_this).parents('.dirList').length==0){
            if($(_this).hasClass('.lifile.lifileResoure')){
                $(_this).css({'background':'#2a2d2e'})
            }else{
                $(_this).parents('.lifile.lifileResoure').css({'background':'#2a2d2e'})
            }
        }
        if(!$(this).parents('.curList').length) return;
        $(this).find(".file_change_time").hide();
        $(this).find(".op_icons").show();
    })
    $(li).mouseout(function (e) {
        var event = e || window.event;
        var _this = event.target;
        if($(_this).hasClass('trash') || $(_this).parents('.lifile').hasClass('trash')) return;
        if($(_this).parents('.dirList').length>0){
            $(_this).parents('.lifile.lifileResoure').css({'background':''})
        }
        if($(_this).parents('.dirList').length==0){
            if($(_this).hasClass('.lifile.lifileResoure')){
                $(_this).css({'background':''})
            }else{
                $(_this).parents('.lifile.lifileResoure').css({'background':''})
            }
        }
        if(!$(this).parents('.curList').length) return;
        $(this).find(".file_change_time").show();
        $(this).find(".op_icons").hide();
    })
}

/*文件列表li元素点击事件*/
function clickLiFile(e, li, name, url, version, isOpen, isPro, add, time, isCurPro) {
    // 如果为协作项目，则不可下载
    setTimeout(()=>{
        if($('.curList .lifileResoure').hasClass('team')){
            $('.down-item').hide()
        }else{
            $('.down-item').show()
        }
    }, 1000);
    var event = e || window.event;
    var _this = event.target;

    if ($(_this).parents(".trash").length) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    if ($(event.target).hasClass('rename_file_input')) return;
    if ($(event.target).hasClass('pro_name')) {
        $('.list .lifileAct').removeClass('lifileAct');
        $('.list .lifileActNow').removeClass('lifileActNow');
        $(event.target).parent('.pro_main').addClass('lifileAct');
        event.stopPropagation();
    }
    hideContextMenu();
    $('.rename_file_input').remove();
    $('#list1 .sel').removeClass('sel');
    // 新建项目保存
    if ($('#bfilen').attr('type') == 'new') {
        var data = {
            nameBefore: name,
            url: url,
            isOpen: isOpen,
            isPro: isPro,
            version: version,
            time: time,
            capture: 0
        }
        var f1 = function () {
            if ($(event.target).hasClass('pro_name') || $(event.target).hasClass('pro_main')) {
                var item = $(event.target).hasClass('pro_name') ? $(event.target).parent('.pro_main') : $(event.target);
            } else {
                var item = $(event.target).hasClass('lifile') ? $(event.target) : $(event.target).parent('.lifile');
            }
            var obj = {
                item: item,
                data: data
            }
            // 保存打开
            upload_publish(null, obj);
            // swal_close();
        };
        var f2 = function () {
            // 不保存打开
            if ($(event.target).hasClass('pro_name') || $(event.target).hasClass('pro_main')) {
                var item = $(event.target).hasClass('pro_name') ? $(event.target).parent('.pro_main') : $(event.target);
                $('#bfilen').text($(item).data('name') + '.js').attr('type', '').next('.filen-edit').hide();
                $('#bfilen').data(data);
                loadOpen($('#bfilen'), data.nameBefore, data.url);
            } else {
                $('#bfilen').data(data).text(data.nameBefore + '.js').attr('type', '').next('.filen-edit').hide();
                var item = $(event.target).hasClass('lifile') ? $(event.target) : $(event.target).parent('.lifile');
                var name = $(item).data('name');
                var url = $(item).data('url');
                if (CANEDIT_TYPE.indexOf(name.substring(name.lastIndexOf('.') + 1).toLocaleLowerCase()) == -1) {
                    setUrl(null, [data.nameBefore,data.nameBefore+'.js']);
                } else {
                    setUrl($(item), name);
                }
                addMultifile(name, url, $(item));
                moveLiFile($(item).parents('li.lifileResoure.lifile'));
            }
            swal_close();
        }
        newConfirm('您正要打开“'+name+'”项目，当前项目尚未保存，是否保存新项目？', ['保存', '取消'], [f1, f2]);
        return;
    }
    if ($('#bfilen').is(':visible')) {
        saveCursorPosition();
        if ($(_this).hasClass('pro_main') || $(_this).hasClass('pro_name')) {
            $('#bfilen').attr('type', '');
            var proItem = $(_this).hasClass('pro_main') ? $(_this) : $(_this).parent('.pro_main');
            var path = name + '/' + get_name(proItem);
            if ($('#bfilen').text() == get_name(proItem)) {
                if(url!=$('#bfilen').data('url')) {
                    addReference(get_name(proItem), '/' + url, [name, get_name(proItem)], url, $(proItem));
                    $(proItem).parents('li.lifileResoure.lifile').addClass('active');
                    setUrl(null, [name, get_name(proItem)]);
                    return;
                }
                if (!$('#bfilen').parent().hasClass('filen-active')) {
                    if ($('.setting2 .filen-edit').is(':visible')) {
                        var cur_name = $('.setting2 .filen-edit:visible').parent('li').hasClass('filen') ? name : $('.setting2 .filen-edit:visible').parent('li').children('p').text();
                        var f1 = function () {
                            upload_publish();
                            $('#bfilen').data({
                                nameBefore: name,
                                url: url,
                                isOpen: isOpen,
                                isPro: isPro,
                                version: version,
                                time: time,
                                capture: 0
                            });
                            $('.setting2 .filen-edit').hide();
                            loadOpen($('#bfilen'), name, url, 0);
                            if (!$('.setting2 .filen-edit:visible').parent('li').hasClass('filen')) $(".setting2 li.filen-active").not('.filen').removeClass('filen-active');
                            f3();
                        };
                        var f2 = function () {
                            $('#bfilen').data({
                                nameBefore: name,
                                url: url,
                                isOpen: isOpen,
                                isPro: isPro,
                                version: version,
                                time: time,
                                capture: 0
                            });
                            $('.setting2 .filen-edit').hide();
                            loadOpen($('#bfilen'), name, url);
                            f3();
                        };
                        var f3 = function () {
                            swal_close();
                        };
                        newConfirm($('.setting2 .filen-edit:visible').parent('li').hasClass('filen') ? '项目主文件“' + cur_name + '”尚未保存，您是否要切换至其他文件？' : '文件“' + cur_name + '”尚未保存，您是否要切换至其他文件？', ['保存', '不保存', '取消'], [f1, f2, f3]);
                        return;
                    }
                    $('#bfilen').data({
                        nameBefore: name,
                        url: url,
                        isOpen: isOpen,
                        isPro: isPro,
                        version: version,
                        time: time,
                        capture: 0
                    });
                    loadOpen($('#bfilen'), name, url);
                } else {
                    $('#bfilen').data({
                        nameBefore: name,
                        url: url,
                        isOpen: isOpen,
                        isPro: isPro,
                        version: version,
                        time: time,
                        capture: 0
                    });
                    loadOpen($('#bfilen'), name, url);
                }
                $('.setting2').find("li.filen-active").removeClass('filen-active');
                $('.setting2').find("li.filen").addClass('filen-active');
                setUrl(null, [name, get_name(proItem)]);
                setCursorPosition();
            } else if ($('.setting2').find("li.reference_li[data-path='" + path + "']").length) {
                addReference(get_name(proItem), '/' + url, [name, get_name(proItem)], url, $(proItem));
                $('.setting2').find("li.filen-active").removeClass('filen-active');
                $('.setting2').find("li.reference_li[data-path='" + path + "']").addClass('filen-active');
                setCursorPosition();
            } else if ($('.setting2 li').length >= LIMIT) {
                newAlert('最多可打开同时' + LIMIT + '个文件！', 'warning');
                return;
            } else {
                addReference(get_name(proItem), '/' + url, [name, get_name(proItem)], url, $(proItem));
                $(proItem).parents('li.lifileResoure.lifile').addClass('active');
                setUrl(null, [name, get_name(proItem)]);
            }
        }
        return;
    }
    setUrl($(_this).attr('data-name') ? $(_this) : $(_this).parent(), ($(_this).attr('data-name') ? $(_this).attr('data-name') : $(_this).parent().attr('data-name')) + '.js');
    $('.setting2 .filen').show();
    var span = $(_this).parents('li.lifileResoure.lifile').children('span').first();
    if ($('.filen-active .filen-edit').is(':visible')) {
        ifLeaveThisPage($(span));
        return;
    }
    if ($('#bfilen').data('nameBefore') == name) {
        if (!$('.filen').hasClass('filen-active')) {
            $('.setting2 .filen-active').removeClass('filen-active');
            $('.filen').addClass('filen-active');
            $.ajax({
                url: getUrl("../" + url),
                dataType: "text",
                type: "get",
                async: false,
                success: function (data) {
                    if (monacoModel._languageIdentifier.language != 'javascript') {
                        monacoModel.setValue('');
                        monaco.editor.setModelLanguage(monacoModel, 'javascript')
                    }
                    monacoModel.setValue(data);
                    monacoEditor.setScrollPosition({
                        scrollTop: 0
                    });
                    monacoEditor.focus();
                    $('.filen-active .filen-edit').hide();
                    $(event.target).parents('li.lifileResoure').addClass('active');
                    tip_main($(span).parent('.lifileResoure').children('.dirList').children('.pro_main'));
                    clearInterval(setId);
                    checkIfOldUearth(data);
                }
            })
        } else {
            if ($(event.target).hasClass('pro_main') || $(event.target).parent().hasClass('pro_main')) {
                $('.setting2 .filen.filen-active').show();
                $('#gf').hide();
                getNextPage();
                $(event.target).parents('li.lifileResoure').addClass('active');
                tip_main($(event.target).parents('.lifileResoure').children('.dirList').children('.pro_main'));
                moveLiFile(li);
                reloadIframe();
                return;
            }
        }
        return;
    }
    $('.wrapper-sam .content .editor').css({
        'height': 'calc(100% - 96px)',
        'top': '60px'
    });
    $('.wrapper-sam .content .content-middle .editor-setting').css({
        'height': '60px'
    });
    $('.setting2 .filen-close').remove();
    $('.filen').addClass('filen-active');
    $('#bfilen').data({
        nameBefore: name,
        url: url,
        isOpen: isOpen,
        isPro: isPro,
        version: version,
        time: time,
        capture: 0
    });

    $('.auto').hide();
    $('#gf').hide();
    $('.filen').show();

    var versionList = getVerList();
    if (version) {
        if (versionList.indexOf(version) < 0) {
            newAlert('该文件使用的版本' + version + '已失效！', 'warning');
            // $('#bfilen').data('version', '')
        }
    }

    $('.filen #bfilen').text($(span).attr('title') + '.js');
    var clickLi = $(span).parent('.lifile');
    $('.lifile').each(function (i, e) {
        $(e).removeClass('active');
        clickLi.addClass('active');
    })

    clearInterval(setId);
    // autosave();
    // console.log(getUrl("../" + url));
    if (!$('.filen').hasClass('filen-noSet')) {
        $.ajax({
            url: getUrl("../" + url),
            dataType: "text",
            type: "get",
            async: false,
            success: function (data) {
                if (monacoModel._languageIdentifier.language != 'javascript') {
                    monacoModel.setValue('');
                    monaco.editor.setModelLanguage(monacoModel, 'javascript')
                }
                monacoModel.setValue(data);
                monacoEditor.setScrollPosition({
                    scrollTop: 0
                });
                monacoEditor.focus();
                if (getCookie("debugSwitch") == null || getCookie("debugSwitch") == 1) {
                    reloadIframe();
                }
                $('.filen-active .filen-edit').hide();
                tip_main($(span).parent('.lifileResoure').children('.dirList').children('.pro_main'));
                moveLiFile(li);
                clearInterval(setId);
                checkIfOldUearth(data);
            }
        })
    }

    if ($('.files-menu').length == 1) {
        createFileMenu()
    }
}
//chart右键菜单
function chartContextMenu(name) {
    var token = window.localStorage.getItem("token");
    if(!token){
        let rData = {
            openid: decodeURIComponent(getCookie("openid"))
        }
        $.ajax({
            url: path + '/chart/udatav/login',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(rData),
            contentType: "application/json;charset=utf-8",
            async: false,
            complete: function(e){
                if(e && e.getResponseHeader('token')){
                    token = e.getResponseHeader('token');
                    window.localStorage.setItem('token', token);
                    chartContextMenu(name);
                    return;
                }
            }
        })
    }
    $(".openchart .delete-item").attr("data-id", "");
    $(".openchart .delete-item").attr("data-name", "");
    $(".openchart .preview-item").attr("data-id", "");
    var namejs = name + ".js";
    $(".openchart .edit-item").attr("data-name", namejs);
    $(".openchart .reset-item").attr("data-name", namejs);
    var getOpenid = decodeURIComponent(getCookie("openid"));
    var data = {
        "openid": getOpenid,
        "name": namejs
    };
    $(".openchart .edit-item").attr("data-name", namejs);
    $.ajax({
        url: path + '/chart/udatav/getSceneByOpenidAndName',        
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json", //必须有 
        success: function (result1) {
            if (result1 && result1.code == 200) {
                var anoData = {
                    "openid": getOpenid,
                    "name": namejs + '_modify'
                }
                $.ajax({
                    url: path + '/chart/udatav/getSceneByOpenidAndName',
                    type: 'post',
                    data: JSON.stringify(anoData),
                    contentType: "application/json", //必须有 
                    success: function (result2) {
                        if(result2 && result2.code == 200){
                            if(result1.data.length > 0){
                                var chartId = result1.data[0].id;
                                $(".openchart .edit-item").attr("data-id", chartId);
                                $(".openchart .reset-item").attr("data-id", chartId);
                                $(".openchart .delete-item").attr("data-id", chartId);
                                $(".openchart .delete-item").attr("data-name", name);
                                $(".openchart .preview-item").attr("data-id", chartId);
                                if(result2.data.length > 0){
                                    for(var i = 0; i < result2.data.length; i++){
                                        var pid = result2.data[i].id;
                                        $.ajax({
                                            url: path + '/chart/udatav/deletescene',
                                            type: 'post',
                                            headers: {
                                                "Content-Type": "text/plain",
                                                "token": token
                                            },
                                            data: pid,
                                            success: function (result) {
                                            },
                                            error: function (err) {
                                                console.log(err);
                                            }
                                        })
                                    }
                                }
                            }else{
                                var cid = result2.data[result2.data.length - 1].id;
                                $(".openchart .edit-item").attr("data-id", cid);
                                $(".openchart .reset-item").attr("data-id", cid);
                                $(".openchart .delete-item").attr("data-id", cid);
                                $(".openchart .delete-item").attr("data-name", name);
                                $(".openchart .preview-item").attr("data-id", cid);
                                var reData = {
                                    "id": cid,
                                    "name": namejs
                                };
                                $.ajax({
                                    url: path + '/chart/udatav/renameById',
                                    type: 'post',
                                    headers: {
                                        "token": token
                                    },
                                    data: JSON.stringify(reData),
                                    contentType: "application/json;charset=utf-8", //必须有 
                                    success: function (result) {
                                        for(var i = 0; i < result2.data.length - 1; i++){
                                            var pid = result2.data[i].id;
                                            $.ajax({
                                                url: path + '/chart/udatav/deletescene',
                                                type: 'post',
                                                headers: {
                                                    "Content-Type": "text/plain",
                                                    "token": token
                                                },
                                                data: pid,
                                                success: function (result) {
                                                },
                                                error: function (err) {
                                                    console.log(err);
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            }
        }
    })
}
//.map文件右键菜单
function mapContextMenu(name) {
    $(".openmap .edit-item").attr("data-id", "");
    $(".openmap .edit-item").attr("data-jsid", "");
    $(".openmap .edit-item").attr("data-name", "");
    var data = {
        "projectName": name
    };
    $.ajax({
        url: path + '/api/getMapId',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (result) {
            if (result && result.code == 200 && (result.mapId||result.jsId)) {
                var mapId = result.mapId;
                var jsId = result.jsId;
                $(".openmap .edit-item").attr("data-id", mapId);
                $(".openmap .edit-item").attr("data-jsid", jsId);
                $(".openmap .edit-item").attr("data-name", name);
            }
        }
    })
}
/*文件列表li元素右键菜单*/
function clickContextMenu(e, li, name, url, version, isOpen, isPro, add, time, qtIdList, qtPath) {
    var e = e || window.event;
    e.preventDefault();
    $('#list1').find('.sel').removeClass('sel');
    var elem = $(e.target).hasClass('lifile') || $(e.target).hasClass('pro_main') || $(e.target).hasClass('dirLiTitle') || $(e.target).hasClass('char_file') ? $(e.target) : $(e.target).parent();
    $(elem).addClass('sel');
    const parentJqDom = elem;
    const bimProcessStatus = parentJqDom.attr('data-bim-status');
    let urlIsDate = $(elem).attr('data-url');
    if(urlIsDate&&urlIsDate.includes('.')) {
        $('.rename .item.edit-item-isshow').hide();
    }else{
        $('.rename .item.edit-item-isshow').show();
    }
    if($(li).attr('decor') === "true"){
        $('.setOpen .item.is-sign-y').show();
        $('.setOpen .item.is-sign-n').hide();
    }else{
        $('.setOpen .item.is-sign-n').show();
        $('.setOpen .item.is-sign-y').hide();
    }
    $('.rename .team-item').data('');
    if ($(li).hasClass('team') || $(li).hasClass('teamleader')) {
        if ($(elem).hasClass('dirLiTitle')) {
            $('.rename .team-item').hide();
        } else {
            $('.rename .team-item').show();
            try {
                if ($(elem).data('url')) {
                    var _url = $(elem).data('url');
                    var _type = _url.split('.').pop().toLocaleLowerCase();
                    var _acceptArr = ['js', 'javascript', 'map', 'cht', 'cps', 'geojson', 'json', 'css', 'html'];
                    if (_acceptArr.indexOf(_type) != -1) {
                        if ($(elem).hasClass('selfOccupy')) {
                            // 本人占用
                            $('.rename .team-item .team_item_ul .team_item_li[value="into"],.rename .team-item .team_item_ul .team_item_li[value="cancel"]').hide();
                            $('.rename .team-item .team_item_ul .team_item_li[value="out"]').show();
                            $('.rename .team-item').show().data({
                                url: _url,
                                item: $(elem)[0],
                                li: li,
                                editStatus: 2
                            });
                        } else if ($(elem).hasClass('teamOccupy')) {
                            // 他人占用
                            if ($(li).hasClass('teamleader')) {
                                $('.rename .team-item .team_item_ul .team_item_li[value="into"],.rename .team-item .team_item_ul .team_item_li[value="out"]').hide();
                                $('.rename .team-item .team_item_ul .team_item_li[value="cancel"]').show();
                                $('.rename .team-item').show().data({
                                    url: _url,
                                    item: $(elem)[0],
                                    li: li,
                                    editStatus: 3
                                });
                            } else {
                                $('.rename .team-item').hide();
                            }
                        } else {
                            // 无人占用
                            $('.rename .team-item .team_item_ul .team_item_li[value="out"],.rename .team-item .team_item_ul .team_item_li[value="cancel"]').hide();
                            $('.rename .team-item .team_item_ul .team_item_li[value="into"]').show();
                            $('.rename .team-item').show().data({
                                url: _url,
                                item: $(elem)[0],
                                li: li,
                                editStatus: 1
                            });
                        }
                    } else {
                        $('.rename .team-item').hide();
                    }
                } else {
                    $('.rename .team-item').hide();
                }
            } catch (error) {
                $('.rename .team-item').hide();
            }
        }
    } else {
        $('.rename .team-item').hide();
    }
    if ($(elem).parents(".trash").length) {
        showRecoveryMenu(elem, e);
    } else if ($(elem).children('._name').length && $(elem).hasClass('lifileResoure')) {
        let data = {
            nameBefore: name,
            url: url,
            isOpen: Number($(li).attr('isOpen')),
            isPro: isPro,
            version: version,
            time: time,
            capture: 0
        }
        hideContextMenu('.setOpen');
        $('.rename_file_input').remove();
        $('.setOpen .item.item-sign-project').hide();
        if ($(li).parents('.curList').length) {
            $('.setOpen .item.open-item').hide();
            $('.setOpen .item.zedit-item').show();
            $('.setOpen .item.item-sign-project').hide();
            if(!$(li).hasClass('team')) {
                $('.setOpen .item.code-item').show().data(data);
                $('.setOpen .item.share-item').show().data(data);
                $('.setOpen .item.deploy-item,.setOpen .item.share-item').show();
                $('.setOpen .item.deploy-item .deploy-item_ul .deploy_item').show().data(data);
                $('.setOpen .item.item-sign-project').show();
            } else {
                $('.setOpen .item.code-item').hide().data(data);
                $('.setOpen .item.share-item').hide().data(data);
                $('.setOpen .item.deploy-item,.setOpen .item.share-item').hide();
                $('.setOpen .item.deploy-item .deploy-item_ul .deploy_item').hide().data(data);
            }
        }
        if (!$(li).parents('.curList').length) {
            $('.setOpen .item.open-item').show().data(data);
            $('.setOpen .item.code-item').hide();
            $('.setOpen .item.deploy-item,.setOpen .item.share-item').hide();
            $('.setOpen .item.zedit-item').hide();
        }
  
        if ($(li).parents('.curList').length) {
            $('.setOpen .item.qdt-item').hide().data('qdt_id','');
            let index = qtPath.findIndex(item=> item === $(li).attr('data-url'));
            if(index!=-1 && qtIdList) {
                $('.setOpen .item.qdt-item').show().data('qdt_id',qtIdList[index]);
            } else {
                $('.setOpen .item.qdt-item').hide().data('qdt_id','');
            }
            // if(isPro!=-1) {
            //     $.ajax({
            //         url: '/api/sample/checkQdt?path='+encodeURIComponent(data.url.trim()),
            //         type: 'get',
            //         saync:false,
            //         complete:function(res) {
            //             res=res.responseJSON;
            //             if(res.state&&res.content) {
            //                 $('.setOpen .item.qdt-item').show().data('qdt_id',res.content);
            //             } else {
            //                 $('.setOpen .item.qdt-item').hide().data('qdt_id','');
            //             }
            //         }
            //     })
            // }
            $('.setOpen .item.open-item').hide();
            $('.setOpen .item.cps-item').show();
            if (isPro!=1){
                $('.setOpen .item.copy-item').show().data(data);
            } else {
                $('.setOpen .item.copy-item').hide();
            }
            // if($(li).parents('.curList').find('i.iconfont.icon-xiezuo.teamIcon').length){
            //     $.ajax({
            //         url:'/api/getCpoySceneAuth?mmdid='+getCookie('mmdId'),
            //         type:'get',
            //         success:function(res) {
            //             if(res.code==200&&res.state) {
            //                 $('.setOpen .item.scenecopy-item').show();
            //             }
            //         }
            //     })
                
            // }
        }
        if (!$(li).parents('.curList').length) {
            $('.setOpen .item.open-item').show().data(data);
            $('.setOpen .item.cps-item,.setOpen .item.qdt-item').hide();
            if(!$(li).parents('.proList').length) {
                $('.setOpen .item.copy-item').show().data(data);;
            } else {
                $('.setOpen .item.copy-item').hide().removeData();
            }
            // $('.setOpen .item.scenecopy-item').hide();
        }
        

        if ($(li).parents('.curList').length && $(elem).hasClass('team') ){
            $('.setOpen .item.edit-item').show();
        }else{
            $('.setOpen .item.edit-item').hide();
        }
        if($(elem).hasClass('team')){
            $('.setOpen .item.cps-item').hide();
            // $('.setOpen .item.open-item').hide();
            $(".setOpen hr.zedit-item").first().hide();
            $(".setOpen .organize-item").hide();
            $('.setOpen .item.siyou-item').data({
                name: $(elem).attr('data-name'),
                isOpen: $(elem).attr('isOpen'),
                url: url,
                team:true
            });
        }else{
            $(".setOpen hr.zedit-item").first().show();
            $(".setOpen .organize-item").show().data(data);
            // if(isPro==1) {
            //     $(".setOpen .organize-item").hide();
            //     if($(li).parents('.curList').length) {
            //         $(".setOpen .zedit-item").show();
            //     } else {
            //         $(".setOpen .zedit-item").hide();
            //     }
            // } else {
            //     if($(li).parents('.curList').length) {
            //         $(".setOpen .zedit-item").show();
            //     } else {
            //         $(".setOpen .zedit-item").hide();
            //     }
            //     $(".setOpen .organize-item").show().data(data);
            // }
            $('.setOpen .item.siyou-item').data({
                name: $(elem).attr('data-name'),
                isOpen: $(elem).attr('isOpen'),
                url: url,
                team:false
            });
        }
        ($(li).parents('.curList').length || $(li).parents('.proList').length || $(li).hasClass('team') || $(li).hasClass('teamleader')) ? $('.setOpen .item.del-item').hide().data({
            li: null,
            nameBefore: null,
            url: null,
            isOpen: null,
            isPro: null,
            time: null,
            capture: null,
            version: null
        }): $('.setOpen .item.del-item').show().data(data).data({
            li: li
        });
        $(elem).attr('isOpen') == '1' ? $('.setOpen .item.siyou-item').text("设为私有") : $('.setOpen .item.siyou-item').text("设为公开");
        $.ajax({
            // url: path+'/uinapi/user/hasRole',
            url: '/api/getAuthOfflineRole',
            type: 'get',
            headers: {
                Authorization: 'Bearer ' + $.cookie('accessToken'),
            },
            dataType: 'json',
            success: function (data) {
                if(data && data.success){
                    $('.setOpen .offDev-item').removeClass('item-disabled');
                }
            },
            error:function(e){
                console.log(e)
                if(e.status==401) {
                    clearAllCookie();
                    loginwindowon();
                }
            }
        })
    } else if ($(elem).hasClass('pro_main')) {
        let data = {
            nameBefore: name,
            url: url,
            isOpen: Number($(li).attr('isOpen')),
            isPro: isPro,
            version: version,
            time: time,
            capture: 0
        }
        if ($(elem).parent('.curList').length) $(elem).removeClass('sel');
        $('.newPro .item.open-item,.setOpen .item.code-item,.setOpen .item.deploy-item .deploy-item_ul .deploy_item,.setOpen .item.share-item').data(data);
        hideContextMenu('.newPro');
        $('.rename_file_input').remove();
    } else if (bimProcessStatus) {
        //bim code
        let detailStr = '';
        if (bimProcessStatus !== 'success') {
            $('.bim .use-item').addClass('disabled');
            $('.bim .preview-item').addClass('disabled');
            if (bimProcessStatus === 'process') {
                detailStr = ' (转换中)';
            } else if (bimProcessStatus === 'error') {
                detailStr = ' (转换失败)';
            }
            detailForBIMli(parentJqDom);
        } else {
            const bimUrl = parentJqDom.attr('data-bim-url');
            $('.bim .preview-item').removeClass('disabled').attr('data-bim-url', bimUrl);
            $('.bim .use-item').data('url', bimUrl).removeClass('disabled');
        }
        $('.bim .use-item span[name="detail"]').text(detailStr);
        $('.bim .preview-item span[name="detail"]').text(detailStr);
        var _target = $(elem).children('._name')[0];
        const url = parentJqDom.attr('data-url');
        var filePath = '/' + url.split("/").slice(url.split("/").indexOf('file') + 1).join("/");
        var isdirectory = $(_target).parent().attr('isdirectory');
        const data = {
            filePath: filePath,
            isDirectory: isdirectory,
            item: $(_target)
        }
        var e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        var top = e.pageY;
        if (top + $('.bim').height() > $('html').height()) top = top - $('.bim').height();
        var left = e.pageX;
        $('.bim .item.rename-item,.bim .item.del-item').data(data);
        hideContextMenu('.bim');
        $('.rename_file_input').remove();
        $('.bim').css({
            top: top + 'px',
            left: left + 'px'
        }).show();
    } else if ($(elem).attr('data-chartname')) {
        if (!$(elem).parents('.curList').length) return;
        var char_name = $(elem).children('.char_name')[0];
        $('#list1 .sel').removeClass('sel');
        $(char_name).parent('.pro_char').addClass('sel');
        var name = $(char_name).text().replace(".cht", ".js");
        var id = $(char_name).attr("data-id");
        $('.openchart').find(".edit-item").attr({
            "data-name": name
        });
        $('.openchart').find(".preview-item").attr({
            "data-id": id
        });
        e.preventDefault();
        e.stopPropagation();
        var top = e.pageY;
        if (top + $('.openchart').height() > $('html').height()) top = top - $('.openchart').height();
        var left = e.pageX;
        hideContextMenu('.openchart');
        $('.openchart').css({
            top: top + 'px',
            left: left + 'px'
        }).show();
    } else if (!$(elem).hasClass('op_icons')) {
        // 文件夹
        var url = $(elem).attr('data-url');
        var filePath = '/' + url.split("/").slice(url.split("/").indexOf('file') + 1).join("/");
        var isdirectory = $(elem).attr('isdirectory');
        if($('.rename .item.dir-item').length){            
            $('.rename .item.dir-item').addClass('hide-dir-item');
            if($(elem).parents('.curList').length&&isdirectory == '1') $('.rename .item.dir-item').removeClass('hide-dir-item');
        }
        let data = {
            filePath: filePath,
            isDirectory: isdirectory,
            item: $(elem).children('span')
        }
        var e = e || window.event;
        var target = ($(elem).children('._dirname').length ? $(elem).children('._dirname') : $(elem).children('._name'))[0];
        e.preventDefault();
        e.stopPropagation();
        var top = e.pageY;
        if (top + $('.rename').height() > $('html').height()) top = top - $('.rename').height();
        var left = e.pageX;
        $('.rename .item.rename-item,.rename .item.del-item,.rename .item.down-item,.rename .item.view-properties').data(data);
        if($(elem).parents(".team").length || $(elem).parents(".teamleader").length){
            $('.rename .item.rename-item').hide();
        } else {
            $('.rename .item.rename-item').show();
        }
        // 是否允许下载
        if($(elem).parents(".team").length){
            $('.rename .item.down-item').hide();
        }else{
            $('.rename .item.down-item').show();
        }

        $('.rename .item.use-item').data('url', url);
        $('.rename .item.use-item').data('longurl', $(elem).data('longurl'));
        $('.rename .item.use-item').data('isdirectory', isdirectory);

        if (isdirectory !== '1') $('.rename .item.use-item').removeClass('disabled');
        
        hideContextMenu('.rename');
        $('.rename_file_input').remove();
        if ($(elem).attr('data-name')) {
            if ($(elem).attr('data-name').indexOf(".cht") != -1) {
                hideContextMenu('.openchart');
                if (!$(elem).parents('.curList').length) return;
                var name = $(elem).attr('data-name').split(".cht")[0];
                var top = e.pageY;
                if (top + $('.openchart').height() > $('html').height()) top = top - $('.openchart').height();
                $('.openchart').css({
                    top: top + 'px',
                    left: left + 'px'
                }).show();
                chartContextMenu(name);
                return;
            } else if ($(elem).attr('data-name').indexOf(".map") != -1) {
                hideContextMenu('.openmap');
                if (!$(elem).parents('.curList').length) return;
                var name = $(elem).attr('data-name').split(".map")[0];
                var top = e.pageY;
                if (top + $('.openmap').height() > $('html').height()) top = top - $('.openmap').height();
                $('.openmap').css({
                    top: top + 'px',
                    left: left + 'px'
                }).show();
                mapContextMenu(name);
                return;
            } else if($(elem).attr('data-name').indexOf(".cps") != -1) {
                hideContextMenu();        
                return;
            }
        }
        if($(elem).parents('.curLi').length) {
            $('.rename').css({
                top: top + 'px',
                left: left + 'px'
            }).show();
        } else {
            $('.rename').hide();
        }
    } else {
        // console.log(elem)
    }
}
var queryFileData;

function uploadPageFile(event, _this) {
    var event = event || window.event;
    event.stopPropagation();
    // if (!event.toElement) return;
    if (!($('.setting2 li #bfilen').is(':visible') && $('.setting2 li #bfilen').data('nameBefore') == $(_this).parents('.lifileResoure').children('._name').text())) {
        newAlert('项目“' + $(_this).parents('li.lifileResoure.lifile').attr('data-name') + '”未打开，不可上传文件！', 'warning')
        return;
    }
    if(!getlifileActParent()) {        
        var dirEle = $(_this).parents("li.lifileResoure").find(".dirList");
        var lifileEle = $(_this).parents("li.lifileResoure");
        if (!dirEle.length) {
            dirEle = $('<ul class="dirList"></ul>');
            lifileEle.append(dirEle);
        }
        queryFileData = {
            menuNow: '/' + $(_this).parents(".lifile").attr('data-name'),
            type: "上传文件",
            self: dirEle,
            nameBefore: lifileEle.find('.pro_main').data('name'),
            url: lifileEle.data('url'),
            isOpen: lifileEle.data('isOpen'),
            isPro: lifileEle.data('isPro'),
            version: lifileEle.data('version'),
            time: lifileEle.data('time'),
            capture: 0
        }
        showUploadPanel('file')
    } else {
        uploadFileTo(getlifileActParent(),'file');
    }
    // domyfile()
}

function newFileInput(dirEle, lifileEle) {
    if ($(".add_file_li").length) {
        return;
    }
    if (!(dirEle && dirEle.length)) {
        if (lifileEle.find(".iconfont.icon-file").length) { //是否存在资源
            clickIconFile(lifileEle.find(".iconfont.icon-file"));
            dirEle = lifileEle.find(".dirList");
        } else {
            dirEle = $('<ul class="dirList"></ul>');
            lifileEle.append(dirEle);
        }
    }
    var li = '<li class="add_file_li"><input class="add_file_input" type="text" autofocus="autofocus"></li>';
    setTimeout(() => {
        $('.add_file_input').focus();
    }, 200);
    // dirEle.prepend(li);
    $(dirEle).find('.pro_main').after(li)
    $(".add_file_input").blur(function () {
        sureFilename("blur", this);
    });
    $(".add_file_input").keyup(function (e) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            sureFilename("keyup", this);
        }
    });

    function sureFilename(type, self) {
        var regArr = ['js', 'json', 'html', 'css'];
        if ($(".add_file_input").val() && $(".add_file_input").val().trim().indexOf('.') == 0) {
            newAlert("文件名不能为空！", 'error');
            return;
        }
        if ($(".add_file_input").val() == $(self).parents(".lifile").attr("data-name") + ".js") {
            newAlert("新建文件名称不能与项目主文件一致！", 'error');
        } else if ($(".add_file_input").val() && $(".add_file_input").val().indexOf('.') != -1) {
            var houzhui = ($(".add_file_input").val().split('.')[$(".add_file_input").val().split('.').length - 1]).toLocaleLowerCase()
            if (regArr.indexOf(houzhui) == -1) {
                newAlert("此处仅允许新建js、css、html、json格式的文件！", 'error');
                return;
            }
            var nameStr=$(".add_file_input").val();
            if (nameStr&&nameStr.substr(0,nameStr.lastIndexOf('.')).length > 16) return newAlert("文件名称不能超过16个字符！", 'error');
            var path = '/' + $(self).parents(".lifile").attr('data-name');
            var filename = $(".add_file_input").val();
            newResourseFile(path, filename, dirEle);
        } else if ($(".add_file_input").val() && $(".add_file_input").val().indexOf('.') == -1) {
            newAlert("请输入扩展名！", 'error');
        } else if ($(".add_file_input").val() == "" && type == "blur") {
            $(".add_file_li").remove();
        } else if ($(".add_file_input").val() == "" && type == "keyup") {
            return;
        }
    }
}

function newPageFile(event, _this) {
    var event = event || window.event;
    event.stopPropagation();
    // if (!event.toElement) return;
    if (!($('.setting2 li #bfilen').is(':visible') && $('.setting2 li #bfilen').data('nameBefore') == $(_this).parents('.lifileResoure').children('._name').text())) {
        newAlert('项目“' + $(_this).parents('li.lifileResoure.lifile').attr('data-name') + '”未打开，不可新建文件！', 'warning')
        return;
    }
    var lifileEle = $(_this).parents("li.lifileResoure");
    var dirEle = $(_this).parents("li.lifileResoure").find(".dirList").eq(0);
    if(!getlifileActParent()) return newFileInput(dirEle, lifileEle);
    return newFileTo(getlifileActParent());
}
// 关闭项目及参考文件
function closeAll(e) {
    var event = e || window.event;
    event.stopPropagation();
    if ($(".add_file_li").length) $(".add_file_li").remove();
    if ($('#bfilen').attr('type') == 'new') {
        var f1 = function () {
            upload_publish();
            $('.setting2 .filen-close').remove();
            $('.setting2 .filen .filen-edit').hide();
            $('#list0 .item-li.active').removeClass('active');
            $('#list1 .lifile.active,#list1 .pro_main.active,#list1 .pro_char.char_file.active').removeClass('active');
            reloadIframe();
            // swal_close();
            initCursor();
        };
        var f2 = function () {
            $('#bfilen').attr('type', '');
            $('.setting2 .filen-close').remove();
            $('.setting2 .filen,.setting2 .filen .filen-edit').hide();
            $('#list0 .item-li.active').removeClass('active');
            $('#list1 .lifile.active,#list1 .pro_main.active,#list1 .pro_char.char_file.active').removeClass('active');
            monacoModel.setValue('');
            reloadIframe();
            swal_close();
            moveLiFile();
        };
        newConfirm('是否保存为新项目？', ['保存', '取消'], [f1, f2]);
    } else if ($('#bfilen').next('.filen-edit').is(':visible')) {
        var cur_name = $('#bfilen').data('nameBefore');
        var f1 = function () {
            upload_publish();
            setTimeout(() => {
                f2();
            }, 200);
        };
        var f2 = function () {
            monacoModel.setValue('');
            reloadIframe();
            $('#bfilen').attr('type', '');
            $('.setting2 .filen-close').remove();
            $('.setting2 .filen,.setting2 .filen .filen-edit').hide();
            $('#list0 .item-li.active').removeClass('active');
            $('#list1 .lifile.active,#list1 .pro_main.active,#list1 .pro_char.char_file.active').removeClass('active');
            tip_main();
            initCursor();
            swal_close();
            moveLiFile();
        };
        newConfirm('“项目' + cur_name + '”主文件未保存，您是否确认离开？', ['保存', '不保存', '取消'], [f1, f2, swal_close]);
    } else {
        var cur_name = $('#bfilen').data('nameBefore');
        var f1 = function () {
            $('#bfilen').attr('type', '');
            $('.setting2 .filen-close').remove();
            $('.setting2 .filen,.setting2 .filen .filen-edit').hide();
            $('#list0 .item-li.active').removeClass('active');
            $('#list1 .lifile.active,#list1 .pro_main.active,#list1 .pro_char.char_file.active').removeClass('active');
            tip_main();
            monacoModel.setValue('');
            initCursor();
            setUrl(null, []);
            reloadIframe();
            swal_close();
            moveLiFile();
        };
        newConfirm('退出项目主文件“' + cur_name + '”，项目及其参考文件将一同被关闭，您是否确认关闭？', ['确认', '取消'], [f1, swal_close]);
    }
}
// 读取下一个或前一个页签
function getNextPage() {
    if ($('.setting2 .filen-active').length) {
        if ($('.setting2 .filen-active').hasClass('filen')) {
            var url = '../' + $('#bfilen').data('url');
        } else {
            var url = $('.setting2 .filen-active').attr('data-url').indexOf(path) != -1 ? $('.setting2 .filen-active').attr('data-url') : path + $('.setting2 .filen-active').attr('data-url');
        }
    } else {
        return;
    }
    $.ajax({
        url: getUrl(url),
        dataType: "text",
        type: "get",
        async: false,
        success: function (data) {
            var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (f.split('?n=').length > 1) f = f.split('?n=')[0];
            if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
            if (f == 'cps' || f == 'geojson') f = 'json';
            if (monacoModel._languageIdentifier.language != f) {
                monacoModel.setValue('');
                monaco.editor.setModelLanguage(monacoModel, f)
            }
            monacoModel.setValue(data);
            monacoEditor.setScrollPosition({
                scrollTop: 0
            });
            monacoEditor.focus();
            $('.filen-active .filen-edit').hide();
            $('.filen').removeClass('filen-noSet');
        }
    })
}
// 保存当前页签
function saveCurPage(data) {
    var teamLeaderId = getLeaderid();
    if(teamLeaderId && controlSave("teamLeader")) return;
    if($(".curList .teamleader.active").length && controlSave("teamMember"))return;    
    if(isLoginOther) return;
    data.leaderid = teamLeaderId;
    $.ajax({
        url: '/api/saveResource',
        type: 'post',
        data: data,
        success: function (data) {
            if (data.code == 200) {
                hintShow('保存成功');
                $('.filen-active .filen-edit').hide();
            } else if (data.state == 500||data.code == 500) {
                newAlert(data.message + '！', 'error');
            }
        }
    })
    return;
}
// 切换页签
function tabPage(item) {
    if (item) {
        if ($(item).next('li').length) {
            var li = $(item).next('li');
        } else {
            var li = $(item).prev('li').length ? $(item).prev('li') : $(".setting2 #bfilen").parent("li");
        }
        var url = $(li).children('#bfilen').length ? $('.setting2 #bfilen').data('url') : $(li).attr('data-url');
        if ($(item).attr('data-realpath')) {
            $("#list0").find("li.active#" + $(item).attr('data-realpath').split('/').pop().split('.js').join('') + "").removeClass('active');
        }else{
            $("#list2").find("li.active#" + $(item).attr('data-realpath').split('/').pop().split('.js').join('') + "").removeClass('active');
        }
        if ($(item).attr('data-url')) {
            if ($("#list1").find(".lifile.active[data-url='" + $(item).attr('data-url') + "']").length) {
                $("#list1").find(".lifile.active[data-url='" + $(item).attr('data-url') + "']").removeClass('active');
            } else {
                $("#list1 .pro_main[data-url='" + $(item).children('p').text() + "']").removeClass('active').parents('.lifileResoure.active').removeClass('active');
            }
        }
        if ($(li).children('#bfilen').length) url = '/' + url;
        $(item).remove();
        var reqUrl=getUrl(encodeURI(url));
        if(reqUrl.indexOf('.')==0) reqUrl.replace('.','');
        if(reqUrl.indexOf('https://www.thingjs.com./')==0) reqUrl=reqUrl.replace('https://www.thingjs.com./','https://www.thingjs.com/');
        if(reqUrl.indexOf('http://www.thingjs.com./')==0) reqUrl=reqUrl.replace('http://www.thingjs.com./','http://www.thingjs.com/');
        $.ajax({
            url: reqUrl,
            dataType: "text",
            type: "get",
            async: false,
            success: function (data) {
                var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
                if (f.split('?n=').length > 1) f = f.split('?n=')[0];
                if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
                if (f == 'cps' || f == 'geojson') f = 'json';
                if (monacoModel._languageIdentifier.language != f) {
                    monacoModel.setValue('');
                    monaco.editor.setModelLanguage(monacoModel, f)
                }
                monacoModel.setValue(data);
                monacoEditor.setScrollPosition({
                    scrollTop: 0
                });
                monacoEditor.focus();
                $('.filen-active .filen-edit').hide();
                $('.filen').removeClass('filen-noSet');
                $(li).addClass('filen-active');
            }
        })
        return;
    }
    var url = $('.setting2 .filen-active').children('#bfilen').length ? $('.setting2 #bfilen').data('url') : $('.setting2 .filen-active').attr('data-url');
    if (url) {
        var reqUrl=getUrl(encodeURI(url));
        if(reqUrl.indexOf('.')==0) reqUrl=reqUrl.replace('.','');
        if(reqUrl.indexOf('https://www.thingjs.com./')==0) reqUrl=reqUrl.replace('https://www.thingjs.com./','https://www.thingjs.com/');
        if(reqUrl.indexOf('http://www.thingjs.com./')==0) reqUrl=reqUrl.replace('http://www.thingjs.com./','http://www.thingjs.com/');
        $.ajax({
            url: reqUrl,
            dataType: "text",
            type: "get",
            async: false,
            success: function (data) {
                var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
                if (f.split('?n=').length > 1) f = f.split('?n=')[0];
                if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
                if (f == 'cps' || f == 'geojson') f = 'json';
                if (monacoModel._languageIdentifier.language != f) {
                    monacoModel.setValue('');
                    monaco.editor.setModelLanguage(monacoModel, f)
                }
                monacoModel.setValue(data);
                monacoEditor.setScrollPosition({
                    scrollTop: 0
                });
                monacoEditor.focus();
                $('.filen-active .filen-edit').hide();
                $('.filen').removeClass('filen-noSet');
            }
        })
    } else {
        getNextPage();
    }
}
// 移动项目
function moveLiFile(li,path,filename,ispdtTitle) {
    if($(li).hasClass('openning')) return;
    $('#list1 .list1_2 li ul li.openning').remove();
    if ($('.curList').children().length) {
        $('.curList').children().each(function (i) {
            if ($(this).hasClass('newProduct')) {
                $(this).remove();
            } else {
                if ($(this).data('isPro') && $(this).data('isPro')!= 3) {
                    var index = myfilename.ProName.indexOf($(this).attr('data-name'));
                    if ($('#list1 .proLi .proList').children().eq(index).length) {
                        $('#list1 .proLi .proList').children().eq(index).before(this);
                    } else {
                        $('#list1 .proLi .proList').append(this);
                    }
                } else {
                    var index = myfilename.fileName.indexOf($(this).attr('data-name'));
                    if ($('#list1 .pdtLi .pdtList').children().eq(index).length) {
                        $('#list1 .pdtLi .pdtList').children().eq(index).before(this);
                    } else {
                        $('#list1 .pdtLi .pdtList').append(this);
                    }
                }
                if ($(this).children('.dirList').is(':visible')) $(this).trigger('click', 'move');
            }
        })
        $('.curTitle .icon-shuaxin').hide();
    }
    if (li) {
        var newLi=$(li).clone(false);
        $(newLi).prop('class',$(newLi).addClass('openning').prop('class'));
        $(li).before($(newLi));
        $('#list1 .curLi .curList').append(li);
        $('.curTitle').addClass('active');
        $('.curList').slideDown();
        $('.curTitle .icon-shuaxin').show();
    } else {
        $('.curTitle').removeClass('active');
        $('.curList').slideUp();
    }
    if (!$(li).children('.icon-file').hasClass('active')) $(li).trigger('click', 'f');
    if(ispdtTitle){
        if ($('.pdtTitle').hasClass('active')) {
            if ($('#bfilen').is(':visible')) {
                $('.pdtTitle').trigger('click');
            }
        } else {
            if ($('#bfilen').is(':hidden')) {
                $('.pdtTitle').trigger('click');
            }
        }
    }
    if ($('.proTitle').hasClass('active')) {
        $('.proTitle').trigger('click');
    }
    if ($('.lifileResoure.lifile.trash .iconfont.icon-file').hasClass('active')) {
        $('.lifileResoure.lifile.trash').trigger('click', 'f');
    }
    $('.pdtTitle ._num').html('(' + $('.pdtList').children('.lifileResoure.lifile').length + ')');
    $('.proTitle ._num').html('(' + $('.proList').children('.lifileResoure.lifile').length + ')');
    $('.sam-search input').val('');
    recoverSearch();
    resourceSize();
}

function debugSwitchFalse() {
    $('#content_sample #editor').css({
        'width': '100%'
    });
    $('#content_sample .content-middle').css({
        'width': '100%'
    });
    $('#content_sample .content-browser').css({
        'width': '0%',
        'display': 'none'
    });
    $('.content-browser #ifId').remove();
    $('.content-browser .float').hide();
    $('.content-browser .quanping').hide();     
    
}

function debugSwitchTrue() {  
    if(layout.sample.content.browser&&layout.sample.content.browser.width!='50%'&&layout.sample.content.browser.width!='0%'){
        
        $('#content_sample .content-browser').css({
            'display': 'block',
            'width': layout.sample.content.browser.width
        });
    } else {
        $('#content_sample .content-browser').css({
            'display': 'block',
            'width': '50%'
        });
    }
    if(layout.sample.content.editor&&layout.sample.content.editor.width!='50%'&&layout.sample.content.editor.width!='0%'){
        // console.log(layout.sample.content.editor.width,111)
        $('#content_sample #editor').css({
            'display': 'block',
            'width': '50%'
        });
    } else {
        // console.log(layout.sample.content.editor.width,222)
        $('#content_sample #editor').css({
            'display': 'block',
            'width': layout.sample.content.editor.width
        });
    }
    if(layout.sample.content.middle&&layout.sample.content.middle.width!='50%'&&layout.sample.content.middle.width!='0%'&&layout.sample.content.editor.width!='100%'){
        $('#content_sample .content-middle').css({
            'display': 'block',
            'width': layout.sample.content.middle.width
        });
    } else {       
        $('#content_sample .content-middle').css({
            'display': 'block',
            'width': '50%'
        });
    }
    var iframeH=$('.content-browser').height()-$('.content-browser .browser-header')[0].offsetHeight-$('.content-browser .screen').first().height();
    reloadIframe(iframeH<0?0:iframeH);
    $('.content-browser .float').show();
    $('.content-browser .quanping').show();
    // 如果用户开启了保存开发布局
    if(getCookie('saveLayoutSwitch') === '1'){
        getOrSaveDevLayout(1,4);
    }
}

function filerename(t) {
    var liOpen = $('#list1 li[class="lifileResoure lifile active"][data-name="' + $(t).data('nameBefore') + '"]');
    // var liResOpen = $('#list1 li[class="lifileResoure lifile active"]');
    // if (liOpen.length >= 0 && liResOpen.length == 1) liOpen = liResOpen;
    // if (liOpen.length == 1 && liOpen.children("span").text() == $('#bfilen').text().split('.')[0] && liOpen.data('isPro')==1) return;
    if (liOpen.data('isPro') == 1) return;
    if (!$(t).parent('li').hasClass('filen-active')) return;
    fileNamedDialog({}, (val, isOpen) => {
        $('#bfilen').text(val + '.js');
        $('#bfilen').data('isOpen', isOpen);
        upload_publish('rename');
        setUrl($('#bfilen'), val, 'rename');
    });
}

/**
 * 校验文件名
 * @author tx
 * @param {*} nameStr
 */
function verifyName(nameStr) {
    var index = myfilename.fileName.indexOf(nameStr);
    var index1 = myfilename.ProName.indexOf(nameStr);
    var nameBefore = $('#bfilen').data('nameBefore');
    if (nameStr.length > 24) {
        throw ('项目脚本命名不能超过24个字符');
    }
    if ((index !== -1 && nameStr !== nameBefore) || (index1 !== -1 && nameStr !== nameBefore)) {
        throw ('项目脚本命名已存在');
    }
    if (!nameStr) {
        throw ('项目脚本命名不能为空');
    }
    var p = /[ ！\.\\\/:*?"（）？|<>&%=,@#'·!{}`~;-]/m;
    if (p.test(nameStr)) {
        throw ('项目脚本命名不能包含特殊字符 如.\\:*?"<>&%=,@#·!{}`~;-|（）');
    }
    if (nameStr == '垃圾箱') {
        throw ('项目脚本命名不能为“垃圾箱”');
    }

    return;
};
/**
 * 文件名填写dialog
 * @param config {*}
 * @param callback {function} callback
 * @author tx
 */
function fileNamedDialog(config, callback) {
    var date = new Date().Format('yy/MM/dd');
    var n = parseStr($('#list1').find("li.lifileResoure[data-curDay='1']").length);
    var setName = str32ToBit(getCookie('mmdId')) + date.split('/').join('') + n;
    if ($('#bfilen').data('isOpen') == 1) {
        var defaultHtml = '<div class="panel-radio" style="position: relative;left: 1%;min-width: 324px;margin: 7px auto 7px;color:#ccc"><span>公开<input type="radio" name="isOpen" value="1" checked="checked" onchange="onClickRadio(this)" style="margin: 7px 7px 0 4px;"><label></label></span>' +
            '<span>私有<input type="radio" name="isOpen" value="0" onchange="onClickRadio(this)" style="margin: 7px 7px 0 4px;"><label></label></span></div>'
    } else {
        var defaultHtml = '<div class="panel-radio" style="position: relative;left: 1%;min-width: 324px;margin: 7px auto 7px;color:#ccc"><span>公开<input type="radio" name="isOpen" value="1" onchange="onClickRadio(this)" style="margin: 7px 7px 0 4px;"><label></label></span>' +
            '<span>私有<input type="radio" name="isOpen" value="0" onchange="onClickRadio(this)" checked="checked" style="margin: 7px 7px 0 4px;"><label></label></span></div>'
    }
    let defaultConfig = {
        title: '保存项目',
        input: 'text',
        inputValue: setName,
        html: defaultHtml,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        preConfirm: (val) => {
            try {
                verifyName(val)
            } catch (e) {
                swal.showValidationError(`错误提示: ${e}`);
            }
        }
    };

    Object.assign(defaultConfig, config);
    swal(defaultConfig).then((result) => {
        if (result.value) {
            var flag=false;
            $.ajax({
                url: '/api/User_info',
                type: 'get',
                async:false,
                success: function (data) {       
                    if(data.permission == "free"){
                        var arr=0;
                        var arr1=0;
                        arr=$('.pdtList>li[isopen=0]').length+$('.proList>li[isopen=0]').length;
                        arr1=$('.pdtList>li.team[isopen=0] .icon-xiezuo').length;
                        if((arr-arr1)>60){
                            newAlert('免费用户最多保存60个私有项目', 'warning'); 
                            flag=false;     
                        }else{
                            flag=true;  
                        }
                    }else{
                        flag=true;
                    }
                }
            })
            if(flag!=true){
                return;
            }
            callback(result.value, $('input[name="isOpen"]:checked').val());
        }
    });
    $('.swal2-container').addClass('newalert');
    $('.swal2-container #swal2-content').after(`<span class='tip' style='color:#ccc'>项目名称：</span>`);
};

function onClickRadio(_this) {
    // $(_this).parent().css({
    //     'color': '#ff7f00'
    // })
    // $(_this).parent().siblings().css({
    //     'color': '#ccc'
    // })
}
//判断新建项目未保存
function newProjectIsSave(t, v, n){
    if ($('#bfilen').attr('type') == 'new') {       
        var f1 = function () {
            upload_publish();
        };
        var f2 = function () {
            swal_close();
            buildNew(t, v, n,true);
        }
        newConfirm('新建项目尚未保存，是否要保存新项目？', ['保存', '取消'], [f1, f2]);
    }
}
//新建项目
function newProject(t, v, n, onOff){
    if( !onOff && $('#bfilen').attr('type') == 'new'){
        newProjectIsSave(t, v, n);
        return;
    }
    if ($('#bfilen').is(':visible') && $('#bfilen').attr('type') != 'new') {
       
        if ($('.setting2 li .filen-edit').is(':visible')) {
            var isPro_main = $('.setting2 li .filen-edit:visible').parent().children('#bfilen').length;
            var cur_name = $('.setting2 li .filen-edit:visible').parent().children().first().text();
            var f1 = function () {
                $('#bfilen').attr('type', '');
                upload_publish();
                setTimeout(function () {
                    f2();
                }, 200);
            };
            var f2 = function () {
                $('.setting2 li .filen-edit:visible').hide();
                $('#list1 li.lifileResoure.lifile.active,#list0 li.item-li.active').removeClass('active');
                $('.setting2 li.filen').children('#bfilen').attr('type', 'new');
                $('.setting2 li.filen-close').remove();
                buildNew(t, v, n);
                swal_close();
            };
            newConfirm('项目' + (isPro_main ? '主文件“' : '文件“') + cur_name + '”未保存，您是否要新建项目？', ['保存', '不保存', '取消'], [f1, f2, swal_close])
            return;
        }
        var cur_name = $('#bfilen').data('nameBefore');
        var f1 = function () {
            $('#bfilen').attr('type') == 'new' ? upload_publish() : buildNew(t, v, n);
            $('#bfilen').next().hide();
            if ($('#bfilen').attr('type') != 'new') swal_close();
        };
        var f2 = function () {
            if (($('#bfilen').attr('type') == 'new')) buildNew(t, v, n);
            $('#bfilen').next().hide();
            swal_close();
        };
        newConfirm($('#bfilen').attr('type') == 'new' ? '当前项目未保存，您是否要保存为新项目？' : '您是否要关闭项目“' + cur_name + '”，然后新建项目？', ['确定', '取消'], [f1, f2]);
    } else if( $('#bfilen').attr('type') != 'new' ) {
        buildNew(t, v, n);
    }
}
/**
 * 使用swal 命名文件
 * @param {*} evt
 */
function newfile(evt) {
    if (!isLogin('save')) {
        return;
    }
    if ((myfilename.fileName.length + myfilename.ProName.length) >= jsnums) {
        newAlert('最多保存' + jsnums + '个文件！', 'warning');
        return;
    }
    if ($('#bfilen').is(':visible')) {
        if ($('.setting2 li .filen-edit').is(':visible')) {
            var isPro_main = $('.setting2 li .filen-edit:visible').parent().children('#bfilen').length;
            var cur_name = $('.setting2 li .filen-edit:visible').parent().children().first().text();
            var f1 = function () {
                upload_publish();
                setTimeout(function () {
                    f2();
                }, 200);
            };
            var f2 = function () {
                $('.setting2 li .filen-edit:visible').hide();
                $('#list1 li.lifileResoure.lifile.active,#list0 li.item-li.active').removeClass('active');
                $('.setting2 li.filen').children('#bfilen').attr('type', 'new');
                $('.setting2 li.filen-close').remove();
                setPanelModel($('.btn-yq'), '#moveclose-dialog', '园区', 'scenes', true);
                swal_close();
            };
            newConfirm('项目' + (isPro_main ? '主文件“' : '文件“') + cur_name + '”未保存，您是否要新建项目？', ['保存', '不保存', '取消'], [f1, f2, swal_close])
            return;
        }
        var cur_name = $('#bfilen').data('nameBefore');
        var f1 = function () {
            $('#bfilen').attr('type') == 'new' ? upload_publish() : setPanelModel($('.btn-yq'), '#moveclose-dialog', '园区', 'scenes', true);
            $('#bfilen').next().hide();
            if ($('#bfilen').attr('type') != 'new') swal_close();
        };
        var f2 = function () {
            if (($('#bfilen').attr('type') == 'new')) setPanelModel($('.btn-yq'), '#moveclose-dialog', '园区', 'scenes', true);
            $('#bfilen').next().hide();
            swal_close();
        };
        newConfirm($('#bfilen').attr('type') == 'new' ? '当前项目未保存，您是否要保存为新项目？' : '您是否要关闭项目“' + cur_name + '”，然后新建项目？', ['确定', '取消'], [f1, f2]);
    } else {
        setTimeout(()=>{setPanelModel($('.btn-yq'), '#moveclose-dialog', '园区', 'scenes', true);},1000)
        // setPanelModel($('.btn-yq'), '#moveclose-dialog', '园区', 'scenes', true);
    }
    var oEvent = evt || event;
    //阻止事件冒泡和默认行为
    oEvent.cancelBubble = true;
    oEvent.stopPropagation();
    oEvent.preventDefault();
    return false;
}

function loadScene() {
    CreProductList('/api/scenefiles', '.self_cre');
    CreProductList('./demo.json', '.demoList');
    CreProductList('./scenes.json', '.officialList');
    pannelShow();
}
// tab切换官方和我的
$('.tab-li').click(function () {
    var index = $(this).attr('data-index');
    tab_change(index);
    if(!thumbState) $('.panelModel').hide();
    if(!thumbState) $('.panelHeader .close').trigger('click');
    if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
    if(!storeThumbState) $('#moveclose-dialog_store .panelHeader .close').trigger('click');
});

function tab_change(i) {
    $('.tab-li').removeClass('active');
    if (i == 0) {
        $('#tab_list').addClass('active');
        if ($('.filen').is(':visible') && !$('.reference_li').length) {
            $('#list0 li').each(function (i, e) {
                if ($(e).hasClass('active')) {
                    $(e).removeClass('active');
                }
            })
        }
    } else if(i==2){
        $('#tab_list1').addClass('active');
    } else {
        $('#tab_mylist').addClass('active');
    }
    $('ul.list').hide();
    $('#list' + i).show();
}

// 关闭提示
$('.hint .close').click(function () {
    $('.hint').slideUp();
});

// 提示信息
function hintShow(text) {
    $('#content_section .hint .text').html(text);
    $('#content_section .hint').slideDown();
    setTimeout(function () {
        $('#content_section .hint').slideUp();
    }, 2000);
}


// 计算模型库位置
function setModelPos() {
    var domEle = $('.model-library');
    var y = parseInt(domEle.css('top'));
    if (y < 0) y = 0;
    if (y > $(window).height() - domEle.height()) {
        y = $(window).height() - domEle.height();
    }
    domEle.css('top', y + 'px');
}

// 阻止冒泡
function stopPropagation(ev) {
    var oEvent = ev || event;
    oEvent.cancelBubble = true;
    oEvent.stopPropagation();
}

// 在线编辑示例搜索
$('.sam-search span').click(function () {
    var text = $('.sam-search input').val().trim();
    if (text.length > 0) {
        samSearch(text);
    } else {
        recoverSearch();
    }
});
// $('.sam-search input').bind('input propertychange change', function (event) {
//     var text = $(this).val().trim();
//     if (text.length > 0) {
//         samSearch(text);
//     } else {
//         recoverSearch();
//     }
// });
$('.sam-search input').keypress(function (e) {
    var code = e.charCode || e.keyCode;
    if (code == 13) {
        var text = $(this).val().trim();
        if (text.length > 0) {
            samSearch(text);
        } else {
            recoverSearch();
        }
    }
});

function recoverSearch() {
    $('#list0 .item-li').css('display', 'block');
    $('#list0 .item-li').parent().css('display', 'none');
    $($('#list0 .item-li').parent()[0]).css('display', 'block');
    $('#list0 .item-li').parent().parent().css('display', 'block');
    
    $('#list2 .item-li').css('display', 'block');
    $('#list2 .item-li').parent().css('display', 'none');
    $($('#list2 .item-li').parent()[0]).css('display', 'block');
    $('#list2 .item-li').parent().parent().css('display', 'block');

    $('#list1 .lifile').css('display', 'block');
    $('.sam-search p').css('display', 'none');
    $('#list0 li').each(function (i, e) {
        if ($(this).find('.p-title').hasClass('active')) {
            $(this).find('.item').css('display', 'block')
        }
    })
    $('#list2 li').each(function (i, e) {
        if ($(this).find('.p-title').hasClass('active')) {
            $(this).find('.item').css('display', 'block')
        }
    })
    $('#list2 li').each(function (i, e) {
        if ($(this).find('.p-title').hasClass('active')) {
            $(this).find('.item').css('display', 'block')
        }
    })
    $('#list1 .lifile[data-name="垃圾箱"]>ul.dirList.myTrash>li').css('display', '');
}

function samSearch(text) {
    $('#list0 .item').css('display', 'none');
    $('#list0 .item-li').removeClass('highlight');
    $('#list2 .item').css('display', 'none');
    $('#list2 .item-li').removeClass('highlight');
    $('#list1 .lifile').removeClass('highlight');
    $('.sam-search p').css('display', 'none');
    var res = false;
    var newLiObj = [];
    if ($('#list1').css('display') == 'none') {
        //官方
        $('#list0 .item-li').each(function (ind, item) {
            // 有new图片的时候
            // if ($(item).html().indexOf(text) != -1 || $(item).attr('data-key').indexOf(text) != -1) {            
            if ($(item).text().indexOf(text) != -1 || $(item).attr('data-key').indexOf(text) != -1) {
                res = true;
                newLiObj.push($(this));
            }
            $('#list0 .item-li').css('display', 'none');
            $('#list0 .item-li').parent().parent().css('display', 'none');
            var l = newLiObj.length;
            for (var i = 0; i < l; i++) {
                newLiObj[i].css('display', 'block');
                newLiObj[i].parent().css('display', 'block');
                newLiObj[i].parent().parent().css('display', 'block');
            }
        });
        $('#list2 .item-li').each(function (ind, item) {
            // 有new图片的时候
            // if ($(item).html().indexOf(text) != -1 || $(item).attr('data-key').indexOf(text) != -1) {            
            if ($(item).text().indexOf(text) != -1 || $(item).attr('data-key').indexOf(text) != -1) {
                res = true;
                newLiObj.push($(this));
            }
            $('#list2 .item-li').css('display', 'none');
            $('#list2 .item-li').parent().parent().css('display', 'none');
            var l = newLiObj.length;
            for (var i = 0; i < l; i++) {
                newLiObj[i].css('display', 'block');
                newLiObj[i].parent().css('display', 'block');
                newLiObj[i].parent().parent().css('display', 'block');
            }
        });
    } else {
        // 我的
        $('#list1 .lifile').each(function (ind, item) {
            try {
                var name=$(item).data('name').toString();
            } catch (error) {
                var name=''+$(item).data('name')+'';
            }
            if (name.indexOf(text) != -1) {
                res = true;
                // $(this).addClass('highlight');
                newLiObj.push($(this));
            }
            $('#list1 .lifile:not([data-name="垃圾箱"])').css('display', 'none');
            for (var i = 0; i < newLiObj.length; i++) {
                newLiObj[i].css('display', 'block');
            }
        });
        // 垃圾箱
        $('#list1 .lifile[data-name="垃圾箱"]>ul.dirList.myTrash>li').each((i,item)=>{
            if($(item).hasClass('lifile')) {
                if($(item).prop('title').indexOf(text)!=-1) {
                    $(item).css('display', '');
                } else {
                    $(item).css('display', 'none');
                }
            } else {
                if($(item).children('p').prop('title').indexOf(text)!=-1) {
                    $(item).css('display', '');
                } else {
                    $(item).css('display', 'none');
                }
            }
        })
    }
    if (!res) {
        $('.sam-search p').css('display', 'block');
    }
}

if (getQueryString("g") == 1) {
    isLogin();
    newfile();
}
//发布项目
/** 增加对于发布项目的引导判断，指引方法，当处于引导状态下，屏蔽此按钮。*/
function releasePro(checkType,msg) {
    if($(".curList .teamleader.active").length || $(".curList .team.active").length){
        newAlert('协作开发项目不支持在线部署','warning');
        return;
    }
    if (document.getElementById("startTeach").style.color == 'rgb(102, 102, 102)') {
        //处于引导状态则什么也不干
        //console.log('处于引导状态则什么也不干');
    } else {
        // var liOpen = $('#list1 li[class="lifile active"]');
        // var liResOpen = $('#list1 li[class="lifileResoure lifile active"]');
        // if (liOpen.length >= 0 && liResOpen.length == 1) liOpen = liResOpen;
        // if (liOpen.length == 1 && liOpen.children("span").text() == $('#bfilen').text().split('.')[0] && liOpen.parent('.proList').length > 0) {
        var liOpen = $('#list1 li[class="lifileResoure lifile active"][data-name="' + $('#bfilen').data('nameBefore') + '"]');
        if (liOpen.data('isPro') == 1) {
            var dataR = null;
            $.ajax({
                url: "/api/pac_upd?subject=ThingJS_Update&jsname=" + $('#bfilen').data('nameBefore') + "&ifUpd=0",
                type: 'get',
                async: false,
                success: function (data) {
                    if (data.code == 500) {
                        subject = 'ThingJS_Renewal';
                        prj_id = data.prj_id;
                        $.ajax({
                            url: window.location.protocol + "//" + window.location.host + '/guide/html/pay.html',
                            type: 'get',
                            dataType: 'html',
                            success: function (htmlData) {
                                if ($('body').find($('.pay-window-in')).length == 0) {
                                    $('body').append("<div class='pay-mb' style='background: rgba(0,0,0,0.5);z-index: 2001;display:none' id='pay-mb-out'><div class='pay-window-in'></div></div>");
                                }
                                $('.pay-window-in').show();
                                $('.pay-window-in').html(htmlData);
                            }
                        });
                    } else {
                        dataR = data.message;
                    }
                }
            })
            if (!dataR) return;
            // alert('该项目已在线部署，请点击菜单【项目】下的【项目更新】更新该项目！');
            // setPanelModel($(".btn-pro"), "#moveclose-dialog", "预览项目", "playShow", true);
            // return;
        }
        if ($('.filen').is(':visible') &&
            $('#bfilen').data('nameBefore').length > 0 &&
            $('.filen-active .filen-edit').is(':hidden')) {
            var endTime = '',
                startTime = '';
            $.ajax({
                url: '/api/user_query/project',
                type: 'post',
                data: JSON.stringify({
                    where: {
                        prj_jsname: $('#bfilen').data('nameBefore')
                    }
                }),
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                async: false,
                success: function (message) {
                    if (message.rows.length > 0) {
                        endTime = new Date(message.rows[message.rows.length - 1].prj_end).Format('yyyy-MM-dd hh:mm:ss');
                    }
                }
            })
            var num = 1 , price = 2888,priceType="ThingJS_Package",title="在线部署",imgsrc = window.location.protocol + "//" + window.location.host + '/static/payment/createPay/images/zxbs_nian.png';
            if(checkType == "releasePro_Q"){
                num = 3;
                price = 988;
                priceType="ThingJS_Package_Q";
                title="在线部署（季）";
				imgsrc = window.location.protocol + "//" + window.location.host + '/static/payment/createPay/images/zxbs_ji.png';
            }
            subject = 'ThingJS_Package';
            jsname = $('#bfilen').data('nameBefore');
            var userId = $.cookie('mmdId');
            var data = {
                'title': title,
                'imgsrc': imgsrc,
                'describe':'<span class="_title">'+title+'<br><br>有效期：' + getNowFormatDatepay(endTime, 0) + " - " + getNowFormatDatepay(endTime, num,-1) +  "。<br/><br/><span ng-show='!publicPay'>付款后即时生效。</span><span ng-show='publicPay'>付款后60天内可申请开具发票，逾期不再开具。</span>",
                'price': price,
                'id': userId,
                'type': priceType,
                'sceneId': $('#bfilen').data('nameBefore'),
                'step':msg?msg.step:'',
                'paySource': window.location.href,
            }
            layer.open({
                type: 2,
                title: false,
                closeBtn: 0,
                area: ['585px', '568px'],
                // content: ['http://127.0.0.1/guide/createPay/payment.html?type='+priceType+'&userId=' + userId, 'no'],
                content: ['https://www.thingjs.com/static/payment/createPay/payment.html?type='+priceType+'&userId=' + userId, 'no'],
                skin: 'buyModelDiv',
                success: function () {
                    document.getElementsByClassName('buyModelDiv')[0].children[0].children[0].contentWindow.postMessage(data, '*');
                }
            });
            window.addEventListener('message', function (event) {
                if(event.data&&event.data.type&&event.data.type=="newStyle") {
                    $(".buyModelDiv").css({"border-radius":"8px","background-color": "transparent"});
                    $(".buyModelDiv iframe").css("border-radius","8px");
                }
                if (event.data == 'closeWin') {
                    layer.closeAll();
                    window.location.reload();
                }
                if (event.data == 'close') {
                    layer.closeAll();
                }
            });
        } else {
            newAlert('请先保存文件！', 'warning');
        }
    }
}
/**
 * 增加对于新手指引判断，用户处于新手指引中，点击按钮不生效
 */
$('#content_sample .btn-pro').on('click', function (ev) {
    if (document.getElementById("startTeach").style.color == 'rgb(102, 102, 102)') {
        //处于引导状态则什么也不干
    } else {
        releaseProject();
    }
})
/**
 * 增加对于新手指引判断，用户处于新手指引中，点击按钮不生效
 */
$('#content_sample .btn-qr').click(function (ev) {
    if (document.getElementById("startTeach").style.color == 'rgb(102, 102, 102)') {
        //处于引导状态则什么也不干
    } else {
        var ev = window.event || ev;
        stopPropagation(ev);
        showShare();
        // if ($('.filen').text().length > 0 &&
        //     $('.filen-active .filen-edit').is(':hidden') || $('#gf').is(':visible')) {
        //     setPanelModel($(this), "#moveclose-dialog", "分享项目", "playShow", true);
        // } else {
        //     alert('请先保存文件');
    }
})
$('#content_sample .btn-share').click(function (ev) {
    if (document.getElementById("startTeach").style.color == 'rgb(102, 102, 102)') {
    } else {
        var ev = window.event || ev;
        // 阻止冒泡
        stopPropagation(ev);
        quickShare();
    }
})
$('#content_sample .btn-down').click(function (ev) {
    var ev = window.event || ev;
    stopPropagation(ev);
    if (document.getElementById("startTeach").style.color == 'rgb(102, 102, 102)') {
    } else {
        if(!isLogin('enter','showreleaseProject')) return;
        $.ajax({
            url:'/api/getOllineAuth',
            type:'get',
            success:function(res) {
                if(res.code==200) {
                    var liOpen = $('#list1 li[class="lifile active"]');
                    var liResOpen = $('#list1 li[class="lifileResoure lifile active"]');
                    if (liOpen.length >= 0 && liResOpen.length == 1) liOpen = liResOpen;
                    if ($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li')) {
                        var subject = 'ThingJS_Package';
                        var jsname = $('#bfilen').data('nameBefore');
                        if(!$("#deploy_box").length){
                            var div=`<div id="deploy_box" style="z-index:116;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.2);position: fixed;top: 0px;left: 0px;display:none;"> 
                                <iframe id="deploy_iframe" style="width:1090px;height:477px; position: fixed;
                                top: 50%; left: 50%; transform: translate(-475px,-238px); background: none; border-radius: 3px; overflow:hidden; display:none;" onload="loadOfflineIframe(this)" scrolling = " no " src="" frameborder="0"></iframe> 
                            </div>`;
                            $('body').append(div);
                        }
                        $("#deploy_box").show(); 
                        $("#deploy_box").append(`<img class="loadingDeploy" src="/guide/image/loading2.gif" style="position: relative;top: calc(50% - 25px);left: calc(50% - 25px);width:50px;height:50px;">`);
                        $("#deploy_iframe").css({'width': '1090px','height': '477px','transform': 'translate(-475px,-238px)'});
                        $("#deploy_iframe").attr("src",window.location.protocol + "//" + window.location.host + '/admin/#/Deploy?name='+jsname+'&n='+Math.ceil(Math.random()*1000));
                    }else{
                        newAlert('请先保存文件1111','warning');
                        // 未打开项目
                        if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0)) {
                            newAlert('请先打开您需要离线部署的项目','warning');
                        }
                        // 打开项目但未保存文件
                        if (!$('.filen-active .filen-edit').is(':hidden')) {
                            newAlert('请先保存文件','warning');
                        }
                    }
                } else {
                    alert("请先升级为商业开发者！","warning")
                }
            },error:function(err) {
                alert("请先升级为商业开发者！","warning")
            }
        })
        // if(!checkUserAuth()) {return newAlert("请先升级为商业开发者！","warning")};
    }
})
// //场景信息
// $('#content_sample .btn-scene').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($('.btn-cjxx'), "#moveclose-dialog", "场景", "sceneInfo", true);
// });

// //资源
// $('#content_sample .btn-resource').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "资源", "resource", true);
// });

// //代码块
// $('#content_sample .btn-code').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "代码块", "code", true);
// });

// //拾取场景坐标
// $('#content_sample .btn-scene-position').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "", "scenePosition", true);
// });

// //场景效果模板
// $('#content_sample .btn-light-templ').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "", "lightTempl", true);
// });

// //场景效果
// $('#content_sample .btn-light-info').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "", "lightInfo", true);
// });
// //工具
// $('#content_sample .btn-tools').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "工具", "tools", true);
// });
// //场景
// $('#content_sample .btn-cj').click(function (ev) {
//     stopPropagation(ev);
//     if (getCookie("role") != 'free' && getCookie("role") != 'developer') {
//         pannelClose();
//         loginwindowon();
//         return;
//     }
//     setPanelModel($(this), "#moveclose-dialog", "场景", "scenes", true);
// });
// // 设置
// $('#content_sample .btn-settings').click(function (ev) {
//     stopPropagation(ev);
//     setPanelModel($(this), "#moveclose-dialog", "设置", "setting", true);
// });

//获取版本列表
function getVerList() {
    var ver = null;
    $.ajax({
        url: path + '/api/getthingver',
        type: 'get',
        async: false,
        success: function (version) {
            ver = version;
        }
    })
    return ver;
}

// 添加多文件编辑tab
function addMultifile(name, url, item) {
    if ($('.setting2 li .filen-edit').is(':visible')) {
        var li = $('.setting2 li .filen-edit:visible').parent('li');
        var cur_name = $(li).children().first().text();
        var f1 = function () {
            var obj = {
                fn: insertMultifile,
                data: {
                    name: name,
                    url: url
                }
            };
            saveEditPage(li, obj, 'insertMultifile', item);
            swal_close();
        };
        var f2 = function () {
            $('.setting2 li .filen-edit').hide();
            insertMultifile(name, url, item);
            swal_close();
        };
        newConfirm($(li).hasClass('filen') ? '项目主文件“' + cur_name + '”未保存，您是否要切换到其他文件？' : '文件“' + cur_name + '”未保存，您是否要切换到其他文件？', ['保存', '不保存', '取消'], [f1, f2, swal_close]);
        return;
    }
    insertMultifile(name, url, item);
}
// 插入项目文件
function insertMultifile(name, url, item) {
    if(CANEDIT_TYPE.indexOf(url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase())==-1) {
        $(item).addClass('active');
        $(item).addClass('lifileAct');
        return;
    }
    
    $.ajax({
        url: getUrl(url),
        dataType: "text",
        type: "get",
        async: false,
        success: function (data) {
            var lis = $('.setting2').find('li');
            for (var i = 0; i < lis.length; i++) {
                $(lis[i]).removeClass('filen-active');
            }
            var li = `<li class="filen-close filen-active" data-url="` + url + `" data-name="` + name + `">
                        <p class='pagetips' style="display: inline-block;">` + name + `</p>
                        <span class="filen-edit">*</span>
                        <p class="close-btn"></p>
                        <i class="dixian"></i>
                    </li>`
            $('.setting2').append($(li));
            // 新增图片格式预览
            let nameType = name.split('.').pop()
            if(nameType === 'jpg' || nameType === 'jpeg' || nameType === 'png' ||  nameType === 'gif'|| nameType === 'ico'){
                $('.rename .item.previewImage-item').hide().data('url', '');
                previewImage(url)
                return false;
            }else{
                $('.editor_img').hide()
            }
            if(nameType === 'mp4' || nameType === 'mp3'){
                previewImage(url)
            }
            if(nameType=='svg') {
                previewImage(url,data);
            }
            var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (lis.length > 2) {
                // $('.wrapper-sam .content .editor').css({'height':'calc(100% - 60px)','top':'60px'});
                // $('.wrapper-sam .content .content-middle .editor-setting').css({'height':'60px'});
            }
            if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
            if (f == 'cps' || f == 'geojson') f = 'json';
            if (monacoModel._languageIdentifier.language != f) {
                monacoModel.setValue('');
                monaco.editor.setModelLanguage(monacoModel, f)
            }
            monacoModel.setValue(data);
            setCursorPosition();
            monacoEditor.setScrollPosition({
                scrollTop: 0
            });
            monacoEditor.focus();
            $('.filen-active .filen-edit').hide();
            $('.filen').removeClass('filen-noSet');
            $(item).addClass('active');
            setScrollLeft();
            if (!$('#list1 .curLi .curList').children().length) moveLiFile($("#list1 li.lifileResoure[data-name='" + $('.setting2 .filen #bfilen').data('nameBefore') + "']"));
            // monacoEditor.onDidChangeModelContent((e) => {
            //     $('.filen-active .filen-edit').show();
            // });
        }
    })
}
// 参考文档添加tab
function addReference(name, url, arr, realPath, item) {
    var arr = arr || [];
    var realPath = realPath || '';
    var isExted = $('.setting2').find("li.reference_li[data-realPath='" + realPath + "']").length ? true : false;
    if (realPath == "/guide/static/chart.js") {
        isExted = $('.setting2').find("li.reference_li[data-name='" + name + "']").length ? true : false;
    }
    if ($('.setting2 li .filen-edit').is(':visible')) {
        var li = $('.setting2 li .filen-edit:visible').parent('li');
        var cur_name = $(li).hasClass('filen') ? $('#bfilen').data('nameBefore') : get_name($(li).children('p'));
        var f1 = function () {
            var obj = {
                fn: isExted ? getReference : insertReference,
                data: {
                    name: name,
                    url: url,
                    arr: arr,
                    realPath: realPath
                }
            };
            saveEditPage(li, obj, isExted ? 'getReference' : 'insertReference', item);
            setUrl(null, arr);
            swal_close();
        };
        var f2 = function () {
            $('.setting2 li .filen-edit').hide();
            if (isExted) {
                $('.setting2').find("li.filen-active").removeClass('filen-active');
                $('.setting2').find("li.reference_li[data-realPath='" + realPath + "']").addClass('filen-active');
            }
            isExted ? getReference(url, item) : insertReference(name, url, arr, realPath, item);
            setUrl(null, arr);
            swal_close();
        };
        newConfirm($(li).hasClass('filen') ? '“' + cur_name + '”项目主文件未保存，您是否要切换到其他文件？' : '文件“' + cur_name + '”未保存，您是否要切换到其他文件？', ['保存', '不保存', '取消'], [f1, f2, swal_close]);
        return;
    }
    isExted ? getReference(url, item) : insertReference(name, url, arr, realPath, item);
    setUrl(null, arr);
}
// 插入参考页签
function insertReference(name, url, arr, realPath, item) {
    $.ajax({
        url: getUrl(url),
        dataType: "text",
        type: "get",
        async: false,
        success: function (data) {
            var lis = $('.setting2').find('li');
            for (var i = 0; i < lis.length; i++) {
                $(lis[i]).removeClass('filen-active');
            }
            var li = `<li class="filen-close reference_li filen-active" data-url="` + url + `" data-path="` + arr.join('/') + `" data-realPath="` + realPath + `" data-name="` + name + `">
                        <p class='pagetips' style="display: inline-block;">` + name + `</p>
                        <p class="close-btn"></p>
                        <i class="dixian"></i>
                    </li>`
            $('.setting2').append($(li));

            // 新增图片格式预览
            let nameType = name.split('.').pop()

            if(nameType === 'jpg' || nameType === 'jpeg' || nameType === 'png' ||  nameType === 'gif'|| nameType === 'ico'){
                $('.rename .item.previewImage-item').hide().data('url', '');
                previewImage(url)
                return false;
            }else{
                $('.editor_img').hide()
            }
            if(nameType === 'mp4' || nameType === 'mp3'){
                previewImage(url)
            }
            if(nameType=='svg') {
                previewImage(url,data);
            }

            var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (f.split('?n=').length > 1) f = f.split('?n=')[0];
            if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
            if (f == 'cps' || f == 'geojson') f = 'json';
            if (monacoModel._languageIdentifier.language != f) {
                monacoModel.setValue('');
                monaco.editor.setModelLanguage(monacoModel, f)
            }
            monacoModel.setValue(data);
            monacoEditor.setScrollPosition({
                scrollTop: 0
            });
            setCursorPosition();
            monacoEditor.focus();
            $('.filen-active .filen-edit').hide();
            $('.filen').removeClass('filen-noSet');
            $(item).hasClass('pro_main') ? $(item).parents('.lifileResoure.lifile').addClass('active') : $(item).addClass('active');
            setScrollLeft();
        }
    })
}

function getReference(url, item) {
    $.ajax({
        url: getUrl(url),
        dataType: "text",
        type: "get",
        async: false,
        success: function (data) {
            var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
            if (f == 'cps' || f == 'geojson') f = 'json';
            if (f.split('?n=').length > 1) f = f.split('?n=')[0];
            if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
            if (f == 'cps' || f == 'geojson') f = 'json';
            if (monacoModel._languageIdentifier.language != f) {
                monacoModel.setValue('');
                monaco.editor.setModelLanguage(monacoModel, f)
            }
            monacoModel.setValue(data);
            monacoEditor.setScrollPosition({
                scrollTop: 0
            });
            monacoEditor.focus();
            setCursorPosition();
            $('.filen-active .filen-edit').hide();
            $('.filen').removeClass('filen-noSet');
            // $(item).addClass('active');
            if ($(item).parents('#list0').length) {
                let CSTR = 'sample';
                if(version==1){
                    if ($(item).attr('id').slice(0, CSTR.length) == CSTR) {
                        dataUrl = path + '/guide/examples/js/' + $(item).attr('id') + '.js';
                    } else if ($(item).attr('id').match(/^[a-zA-Z]*$/) != null) {
                        dataUrl = path + '/demos/' + $(item).attr('id') + '/js/' + $(item).attr('id') + '.js';
                    } else {
                        dataUrl = path + '/' + $(item).attr('id');
                    }
                }
                setScrollLeft($(".setting2 li[data-realpath='" + dataUrl + "']"));
            }else if ($(item).parents('#list2').length) {
                    dataUrl = path + '/guide/official/js/' + $(item).attr('id') + '.js';
                setScrollLeft($(".setting2 li[data-realpath='" + dataUrl + "']"));
            }
        }
    })
}

function saveEditPage(li, obj, type, item) {
    if ($(li).hasClass('filen')) {
        upload_publish();
    } else {
        $('#bfilen').attr('type', '');
        saveCurPage({
            content: JSON.stringify(monacoModel.getValue()),
            file: $('.filen-active').data('url').substring($('.filen-active').data('url').indexOf('file/') + 4)
        })
    }
    if (type == 'getReference') {
        $('.setting2').find("li.filen-active").removeClass('filen-active');
        $('.setting2').find("li.reference_li[data-realPath='" + obj.data.realPath + "']").addClass('filen-active');
    }
    type == 'insertReference' ? obj.fn(obj.data.name, obj.data.url, obj.data.arr, obj.data.realPath, item) : type == 'getReference' ? obj.fn(obj.data.url) : obj.fn(obj.data.name, obj.data.url, item);
    $(item).addClass('active');
    $('.setting2 li .filen-edit').hide();
}
$('.setting2').on('click', 'li', function (event) {
    event.stopPropagation();
    saveCursorPosition();
    if ($(this).hasClass('filen-active')) {
        var t = this;
        var url = $(t).data('url');
        if ($(t).hasClass('filen')) {
            if ($('#bfilen').data('url')) {
                url = $('#bfilen').data('url').substring(1);
            }
        }
        var setUrlArr = url.split('/').slice(4);
        if (url == "/guide/static/chart.js") {
            setUrl(null, []);
        } else if (setUrlArr.indexOf('file') !== -1) {
            setUrlArr = setUrlArr.splice(1);
        } else {
            setUrlArr.unshift(setUrlArr[0].split('.').slice(0, setUrlArr[0].split('.').length - 1).join('.'))
        }
        if ($(t).hasClass('reference_li')) {
            setUrl(null, $(t).attr('data-path').split('/'));
        } else if ($(t).children('#bfilen').length) {
            var arr = [$(t).children('#bfilen').text().substr(0, $(t).children('#bfilen').text().length - 3), $(t).children('#bfilen').text()];
            setUrl(null, arr);
        } else {
            setUrl(null, setUrlArr);
        }
    }
    if ($('.filen-active .filen-edit').is(':visible')) {
        ifLeaveThisPage($(this));
        return;
    }
    manageMultifile(this);
});

// 多文件编辑
function manageMultifile(t) {
    if(isLoginOther) {loginOutTime();}
    var url = $(t).data('url');
    if ($(t).hasClass('filen')) {
        if ($('#bfilen').data('url')) {
            url = $('#bfilen').data('url').substring(1);
        }
    }
    $.ajax({
        url: getUrl(url),
        dataType: "text",
        type: "get",
        async: false,
        success: function (data) {
            var f = url.substring(url.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (f.split('?n=').length > 1) f = f.split('?n=')[0];
            if (f == 'js' || f == 'cht' || f == 'map') f = 'javascript';
            if (f == 'cps' || f == 'geojson') f = 'json';
            if (monacoModel._languageIdentifier.language != f) {
                monacoModel.setValue('');
                monaco.editor.setModelLanguage(monacoModel, f)
            }
            monacoModel.setValue(data);
            monacoEditor.setScrollPosition({
                scrollTop: 0
            });
            monacoEditor.focus();
            var setUrlArr = url.split('/').slice(4);
            if (url == "/guide/static/chart.js") {
                setUrl(null, []);
            } else if (setUrlArr.indexOf('file') !== -1) {
                setUrlArr = setUrlArr.splice(1);
            } else {
                setUrlArr.unshift(setUrlArr[0].split('.').slice(0, setUrlArr[0].split('.').length - 1).join('.'))
            }
            if ($(t).hasClass('reference_li')) {
                setUrl(null, $(t).attr('data-path').split('/'));
            } else if ($(t).children('#bfilen').length) {
                var arr = [$(t).children('#bfilen').text().substr(0, $(t).children('#bfilen').text().length - 3), $(t).children('#bfilen').text()];
                setUrl(null, arr);
            } else {
                setUrl(null, setUrlArr);
            }
            var lis = $('.setting2').find('li');

            for (var i = 0; i < lis.length; i++) {
                $(lis[i]).removeClass('filen-active');
                $(lis[i]).children('.filen-edit').hide();
            }
            
            // 切换时新增图片格式预览
            let nameType = url.split('.').pop();
            if(nameType === 'jpg' || nameType === 'jpeg' || nameType === 'png' ||  nameType === 'gif'||  nameType === 'ico'){
                previewImage(url)
                $('.editor_img').show();
            }else{
                $('.editor_img').hide();
            }
            if(nameType === 'mp4' || nameType === 'mp3'){
                previewImage(url);
            }
            if(nameType=='svg') {
                previewImage(url,data);
            }
            $(t).addClass('filen-active');
            $('.filen-active .filen-edit').hide();
            setScrollLeft(t);
            setCursorPosition();
            //改变激活状态
            setActiveState();
            return;
        },
        error: function (e) {
            if(e.status==404) return newAlert('文件已被删除，请刷新页面！');
            newAlert('文件错误，请刷新页面！')
        }
    })
}
// 多文件关闭
$('.setting2').on('click', '.close-btn', function (event) {
    event.stopPropagation();
    if ($(this).parents(".filen-close").attr("data-url") == "/guide/static/chart.js") {
        $("#list1").find(".pro_char.active[data-chartname='" + $(this).parent(".filen-close ").attr('data-name') + "']").removeClass('active');
    }
    // 图片预览关闭
    let nameType = $(this).parents(".filen-close").attr("data-url").split('.').pop()
    if(nameType === 'jpg' || nameType === 'jpeg' || nameType === 'png' ||  nameType === 'gif'||  nameType === 'ico'){
        preViewClose()
    }
    
    if ($('.filen-active .filen-edit').is(':visible')) {
        ifLeaveThisPage($(this));
        return;
    }
    closeMultifile(this);
});

function closeMultifile(target) {
    var li = $(target).parent();
    if (li.next().length > 0 && li.next().prop("tagName") == 'LI') {
        li.next().trigger('click');
    } else if (li.prev().length > 0 && li.prev().prop("tagName") == 'LI') {
        li.prev().trigger('click');
    } else {
        $('#bfilen').parent().trigger('click');
    }
    if ($('.setting2').find('li').length <= 3) {
        $('.wrapper-sam .content .editor').css({
            'height': 'calc(100% - 96px)',
            'top': '60px'
        });
        $('.wrapper-sam .content .content-middle .editor-setting').css({
            'height': '60px'
        });
    }
    if ($(li).hasClass('reference_li')) {
        var removeActiveElement = $(li).attr('data-url').indexOf(path) == 0 ? $('#list0 li.item-li.active#' + $(li).attr('data-url').split('?n=')[0].split('/').pop().split('.')[0]) : $(li).attr('data-url').split('/').splice(5).length > 1 ? $(li).attr('data-url').split('/').splice(5)[0] == 'project' ? $("#list1 li.lifileResoure.lifile.active[data-name='" + $(li).attr('data-url').split('/').pop().split('.')[0] + "']") : $("#list1 .dirList .lifile.active[data-url='" + $(li).attr('data-url') + "']") : $("#list1 li.lifileResoure.lifile.active[data-name='" + $(li).attr('data-url').split('/').pop().split('.')[0] + "']");
        // console.log(removeActiveElement)
        $(removeActiveElement).removeClass('active');
    }
    li.remove();
    var activeArr = $('#list1 .lifile[data-name="' + $('#bfilen').data('nameBefore') + '"]').find('.active');
    for (var i = 0; i < activeArr.length; i++) {
        if ($(activeArr[i]).data('url') == li.data('url'))
            $(activeArr[i]).removeClass('active');
    }
    //$('.setting2').children('.filen').length==1?$('.setting2').css({'padding-right':'4px'}):$('.setting2').css({'padding-right':'0'})
}

function closeMyFile() {
    if ($('#bfilen').text() != 'Untitled.js') $('#bfilen').text('');
    $('#bfilen').data({
        nameBefore: '',
        url: '',
        isOpen: '',
        isPro: '',
        version: '',
        capture: 0
    });
}

function createDirList(dir, route, textIndentNum, isTrash, upath,teamLeaderId) {
    if (!route) {
        route = dir;
        if (textIndentNum) {
            var dirTitle = $("<ul class='dirList'></ul>")
        } else {
            var dirTitle = $("<ul class='dirList myTrash'></ul>")
        }
        if ((textIndentNum == null || textIndentNum == 1) && !isTrash) {
            var oP = `<p class='pro_main' data-name='` + dir + `' data-url='` + dir + '.js' + `'><span class='pro_name'>` + (dir + '.js') + `</span></p>`
             
            if(teamLeaderId){
                var url = './uploads/wechat/'+teamLeaderId+'/'+dir + '.js';                
            }else if(teamInfo.selfleaderTeamProList.indexOf(dir) != -1){
                var url = './uploads/wechat/'+decodeURIComponent( getCookie("openid") )+'/'+dir + '.js';
            }
            if(teamLeaderId || teamInfo.selfleaderTeamProList.indexOf(dir) != -1){
                for(var j = 0; j < teamInfo.otherOccupyFile.length; j++){
                    if(teamInfo.otherOccupyFile[j].fpath == url){  
                        var imgSrc = 'url('+teamInfo.otherOccupyFile[j].imgurl+')';
                        var uname = teamInfo.otherOccupyFile[j].uname;
                        var nameTip = '“'+uname+'”' +'正在编辑';
                        oP = `<p class='teamOccupy pro_main' data-name='` + dir + `' data-url='` + dir + '.js' + `'><span class='headImg' title='`+nameTip+`' style='background-image:`+imgSrc+`'></span><span class='pro_name'>` + (dir + '.js') + `</span></p>`
                    }
                }
                for(var j = 0; j < teamInfo.selfOccupyFile.length; j++){
                    if(teamInfo.selfOccupyFile[j].fpath == url){
                        var imgSrc = 'url('+teamInfo.selfOccupyFile[j].imgurl+')';
                        var uname = teamInfo.selfOccupyFile[j].uname;
                        var nameTip = '我正在编辑';
                        oP = `<p class='selfOccupy pro_main' data-name='` + dir + `' data-url='` + dir + '.js' + `'><span class='headImg' title='`+nameTip+`' style='background-image:`+imgSrc+`'></span><span class='pro_name'>` + (dir + '.js') + `</span></p>`
                    }
                }
            }
            $(dirTitle).append(oP);
            if ($('.setting2 li #bfilen').is(':visible') && $('.setting2 li #bfilen').text() == (dir + '.js')) {
                $(dirTitle).children('.pro_main').addClass('main_file');
            }
        }
        createResourceDir(dirTitle, dir, isTrash,teamLeaderId)
    } else {
        var fileDir = dir;
        var fileTitle;
        var state;
        var ftitle;
        var oid = decodeURIComponent(getCookie("openid")) + '/file/';
        if (trashFile[fileDir]) {
            fileTitle = fileDir;
            state = trashFile[fileDir].state;
            var srcPath = trashFile[fileDir].spath;
            fileDir = trashFile[fileDir].fname;
            srcPath = srcPath.split(oid);
            ftitle = srcPath[1];
        }else{
            if(upath){
                var uindex = upath.indexOf('垃圾箱/');
                if(uindex != -1){
                    var childpath = upath.split('垃圾箱/').pop();
                    childpath = childpath.split('/');
                    var tempValue = '';
                    for(var i = 0, j = childpath.length; i < j; i++){
                        if(i == 0){
                            var fDir = childpath[0];
                            if(trashFile[fDir]){
                                var spath = trashFile[fDir].spath;
                                spath = spath.split(oid);
                                tempValue += spath[1];
                            }
                        }else{
                            tempValue += '/' + childpath[i];
                        }
                    }
                    ftitle = tempValue;
                }else{
                    ftitle = fileDir;
                }
            }else{
                ftitle = fileDir;
            }
        }
        var dirTitle = $("<li class='dirLi' style='text-indent: 22px'><p trash-state='"+ state +"' data-longurl='" + upath + "'  data-url='" + route + "' class='dirLiTitle' " + (fileTitle ? "data-title='" + fileTitle + "'" : '') + " title='" + ftitle + "'><span class='_dirname'>" + fileDir + "</span></p><ul class='dirList' style='display:none'></ul></li>");
        dirTitle.children('.dirLiTitle').on('click', function (e) {
            var event = e || window.event;
            if ($(event.target).hasClass('rename_file_input')) return;
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                dirTitle.children('.dirList').slideUp();
            } else {
                $(this).addClass('active');
                dirTitle.children('.dirList').slideDown();
            }
            // createResourceDir(dirTitle.children('.dirLiTitle'), route)
            createResourceDir(dirTitle.children('.dirLiTitle'), dirTitle.children('.dirLiTitle').attr('data-url'), isTrash,teamLeaderId)
        })
    }    
    return dirTitle;
}

//修改文件时间并排序
function modifyFileTime(data) {
    for (var i = 0; i < data.length; i++) {
        var name = data[i].name;
        if(trashFile[name] && trashFile[name].ftime){
            data[i].time = trashFile[name].ftime;
        }else{
            data.splice(i,1);
        }
    }
    data.sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
    });
    return data;
}

function detailForBIMli(liObj) {
    let name = liObj.attr('data-name');
    let url = liObj.attr('data-url');
    // url = escape(url);
    if (name && url) {
        let nameArray = name.split('.');
        const suffix = nameArray[nameArray.length - 1].toLowerCase();
        if (['rvt', 'ifc'].indexOf(suffix) !== -1) {
            liObj.attr('data-bim-status', 'process');
            $.ajax({
                url: url,
                dataType: 'text',
                type: 'get',
                async: false,
                success: (res) => {
                    try {
                        const obj = JSON.parse(res);
                        liObj.attr('data-bim-unique-id', obj.uniqueId);
                        liObj.attr('data-bim-status', obj.status);
                        if (obj.status === 'success') {
                            liObj.attr('data-bim-url', obj.url);
                        } else if (obj.status === 'process') {
                            let bimGetStatusUrl = '/bim/api/upload/v1/status/' + obj.uniqueId;
                            $.ajax({
                                type: 'GET',
                                url: bimGetStatusUrl,
                                headers: {
                                    Authorization: 'Bearer ' + $.cookie('accessToken'),
                                },
                                success: (res) => {
                                    if (!res.error) {
                                        if (!res.data.error) {
                                            const bimStatus = res.data.status;
                                            const resourceUrl = res.data.url;
                                            if (bimStatus == 1) {
                                                liObj.attr('data-bim-url', resourceUrl);
                                                liObj.attr('data-bim-status', 'success');
                                            } else if (bimStatus != 0) {
                                                liObj.attr('data-bim-status', 'error');
                                            }
                                        }
                                    } else {
                                        liObj.attr('data-bim-status', 'error');
                                    }
                                }
                            });
                        }
                    } catch (e) {
    
                    }
                }
            });
        }
    }
}

function createResourceDir(Title, dir, isTrash,teamLeaderId) {
    if (Title.data('load')) return;
    var url = '/api/getResourceList?dir=/' + dir;
    if(teamLeaderId){
        url = '/api/getResourceList?dir=/' + dir +"&leaderid="+encodeURIComponent(teamLeaderId);
    }
    if (isTrash) {
        url = '/api/TrashList?dir=/' + dir;
    }
    var text = $('.sam-search input').val().trim();
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            data = data.fileAllMenu;
            Title.data('load', true);
            if (dir == "垃圾箱" && data.length > 0 && isTrash) {
                data = modifyFileTime(data);
            }
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var name = data[i].name;
                    var durl = data[i].url;
                    var url = durl.substring(1);
                    var timeLabel = lifile_time(data[i].time);
                    var isDirectory = data[i].isDirectory;
                    if (data[i].isDirectory == '1') {
                        
                        var route = dir + '/' + name;
                        var resourceDir = createDirList(name, route, 0, isTrash, durl,teamLeaderId);
                        $(resourceDir).children().first('.dirLiTitle').append(timeLabel).attr('isDirectory', isDirectory);
                        var a = dir.split('/');
                        var percent = isTrash ? (a.length - 1 > 0) ? (11 + 8 * (a.length - 2)) : (11 + 8 * (a.length - 1)) : (11 + 8 * (a.length - 1));
                        resourceDir.css({
                            'text-indent': isTrash ? (a.length - 1 > 0) ? ((percent )*2+'px') : '15px' : ((percent )*2+'px')
                        });
                        var maxWidth = 'calc(' + (100 - percent + '%') + ' - 65px)';
                        $(resourceDir).find('span').css({
                            'max-width': maxWidth
                        });
                        if (a.length > 1) {
                            Title.siblings('.dirList').append(resourceDir);
                        } else {
                            Title.append(resourceDir);
                        }
                        if(isTrash) {
                           // console.log(resourceDir)
                        }
                        if(isTrash&&text&&name.indexOf(text)<0) {
                            $(resourceDir).css('display','none');
                        }
                    } else {
                        var filename = name;
                        var state;
                        var ftitle;
                        var oid = decodeURIComponent(getCookie("openid")) + '/file/';
                        if (trashFile[name]) {
                            filename = trashFile[name].fname;
                            state = trashFile[name].state;
                            var srcPath = trashFile[name].spath;
                            srcPath = srcPath.split(oid);
                            ftitle = srcPath[1];
                        }else{
                            var uindex = durl.indexOf('trash/');
                            if(uindex != -1){
                                var cpath = durl.split('trash/垃圾箱/')[1];
                                cpath = cpath.split('/');
                                var tValue = '';
                                for(var l = 0, j = cpath.length; l < j; l++){
                                    if(l == 0){
                                        var fDir = cpath[0];
                                        if(trashFile[fDir]){
                                            var spath = trashFile[fDir].spath;
                                            spath = spath.split(oid);
                                            tValue += spath[1];
                                        }
                                    }else{
                                        tValue += '/' + cpath[l];
                                    }
                                }
                                ftitle = tValue;
                            }else{
                                ftitle = filename;
                            }
                        }
                        
                        var li = $('<li class="lifile" trash-state="'+ state +'" title="' + ftitle + '" data-name="' + name + '" isDirectory="' + isDirectory + '" data-url="' + url + '"><span class="_name" title="' + ftitle + '">' + filename + '</span>' + timeLabel + '</li>');
                        for(var j = 0; j < teamInfo.otherOccupyFile.length; j++){
                            if(teamInfo.otherOccupyFile[j].fpath == url){
                                var imgSrc = "url("+teamInfo.otherOccupyFile[j].imgurl+")";
                                var uname = teamInfo.otherOccupyFile[j].uname;
                                var nameTip = '“'+uname+'”' +'正在编辑';
                                li = $('<li class="teamOccupy lifile" trash-state="'+ state +'" title="' + filename + '" data-name="' + name + '" isDirectory="' + isDirectory + '" data-url="' + url + '"><span class="headImg" title="'+nameTip+'" style="background-image:'+imgSrc+'"></span><span class="_name" title="' + name + '">' + filename + '</span>' + timeLabel + '</li>');
                            }
                        }
                        for(var j = 0; j < teamInfo.selfOccupyFile.length; j++){
                            if(teamInfo.selfOccupyFile[j].fpath == url){
                                var imgSrc = "url("+teamInfo.selfOccupyFile[j].imgurl+")";
                                var uname = teamInfo.selfOccupyFile[j].uname;
                                var nameTip = '我正在编辑';
                                li = $('<li class="selfOccupy lifile" trash-state="'+ state +'" title="' + filename + '" data-name="' + name + '" isDirectory="' + isDirectory + '" data-url="' + url + '"><span class="headImg" title="'+nameTip+'" style="background-image:'+imgSrc+'"></span><span class="_name" title="' + name + '">' + filename + '</span>' + timeLabel + '</li>');
                            }
                        }

                        if ($(".setting2 li[data-url='" + url + "']").length) $(li).addClass('active');
                        var a = dir.split('/');
                        var percent = isTrash ? (a.length - 1 > 0) ? (11 + 8 * (a.length - 2)) : (11 + 8 * (a.length - 1)) : (11 + 8 * (a.length - 1));
                        li.css({
                            'text-indent': isTrash ? (a.length - 1 > 0) ? ((percent)*2+'px') : '15px' : (percent *2+'px')
                        });
                        var maxWidth = 'calc(' + (100 - percent + '%') + ' - 65px)';
                        $(li).find('.headImg').css({
                            'left': (percent-2)*1.8+"px"
                        });
                        $(li).find('span').css({
                            'max-width': maxWidth
                        });
                        if(isTrash&&text&&filename.indexOf(text)<0) {
                            $(li).css('display','none');
                        }
                        if (a.length > 1) {
                            Title.siblings('.dirList').append(li);
                        } else {
                            Title.append(li);
                        }
                        detailForBIMli(li);
                    }
                }
            }
        }
    })
}
$('#list1').on("click", ".dirList .lifile", function (e) {
    var event = e || window.event;    
    if(isLoginOther) {loginOutTime();}
    if ($(event.target).hasClass('rename_file_input')) return;
    if ($('#bfilen').attr('type') == 'new') return;
    var lifTime = new Date();
    if ($(this).data('clicktime')) {
        if (Date.parse(lifTime) - Date.parse($(this).data('clicktime')) < 10) {
            return;
        }
    }
    $(this).data('clicktime', lifTime);
    var name = $(this).data('name');
    var url = $(this).data('url');
    if (CANEDIT_TYPE.indexOf(name.substring(name.lastIndexOf('.') + 1).toLocaleLowerCase()) < 0) {
        // codeBlock("'/" + encodeURI(url.substring(1)) + "'");
        return;
    }
    if ($('.filen-active .filen-edit').is(':visible')) {
        var p_name = get_name($(this).parents('.dirList').find('.pro_main'));
        if (p_name != $('#bfilen').text()) {
            ifLeaveThisPage($(this));
            return;
        }
    }
    //多文档编辑
    if (!$(this).parents('.lifileResoure').hasClass('active')) {
        $('.filen').addClass('filen-noSet');
        $(this).parents('.lifileResoure').children('span').trigger('click');
    }
    var setLis = $('.setting2 li[data-url="' + url + '"]').length;
    if (setLis == 1) {
        $('.setting2 li[data-url="' + url + '"]').trigger('click');
    } else if (setLis > 1) {
        return;
    } else {
        if ($('.setting2 li').length >= LIMIT) {
            newAlert('最多可打开同时' + LIMIT + '个文件！', 'warning');
            return;
        }
        if ($('#bfilen').is(':visible') && get_name($(this).parents('.lifileResoure').find('.pro_main')) !== $('#bfilen').text()) {
            addReference(name, url, url.split('/').slice(5), url, $(this));
        } else if ($('#bfilen').is(':visible')&&$(this).parents('.lifileResoure').data('url')!=$('#bfilen').data('url')) {
            addReference(name, url, url.split('/').slice(5), url, $(this));
        } else {
            setUrl($(this), name);
            addMultifile(name, url, $(this));
        }
        return;
    }
    $(this).addClass('active');
})

function deleteChtFile(ele) {
    var token = window.localStorage.getItem("token");
    var pid = $(ele).attr("data-id");
    var pname = $(ele).attr("data-name");
    var chtData = {
        projectName: pname,
        ext: '.cht'
    }
    $.ajax({
        url: '/api/deleteSpecialFile',
        type: 'post',
        data: JSON.stringify(chtData),
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        async: false,
        cache: false,
        processData: false,
        success: function (result) {
            if (result.code == 200) {
                var domc = $('.dirList li.lifile');
                var domd = $('#content_sample .setting2 li');
                if(domd != undefined){
                    for(var k = 0, l = domd.length; k < l; k++){
                        let cname = domd[k].dataset.name;
                        if (cname == pname + '.cht') {
                            domd[k].remove();
                            break;
                        }
                    }
                }
                if(domc != undefined){
                    for (var i = 0, j = domc.length; i < j; i++) {
                        let cname = domc[i].dataset.name;
                        if (cname == pname + '.cht') {
                            domc[i].remove();
                            swal_close();
                            // newAlert('删除成功！', 'success', null, null, 'false');
                            break;
                        }
                    }
                }
                $.ajax({
                    url: path + '/chart/udatav/deletescene',
                    type: 'post',
                    headers: {
                        "Content-Type": "text/plain",
                        "token": token
                    },
                    data: pid,
                    async: false,
                    success: function (result) {
                        if (result && result.code == 200) {
                            console.log('图表已删除');
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        newAlert('删除失败！', 'warning')
                    }
                })
            }
        },
        error: function (err) {
            console.log(err);
            newAlert('删除失败！', 'warning')
        }
    })
}
function checkChtFile(ele) {
    var name = ele.siblings("._name").text();
    var namejs = name + ".js";
    var data = {
        "openid": decodeURIComponent(getCookie("openid")),
        "name": namejs
    };
    $.ajax({
        url: path + '/chart/udatav/getSceneByOpenidAndName',
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (result) {
            if (result && result.code == 200 && result.data.length > 0) {
                var chtData = {
                    "id": result.data[0].id,
                    "projectName": name,
                    "ext": ".cht",
                    "content": '\/*\n*\n* 说明：本文件为ThingJS图表编辑标志文件。有本文件存在，表示进行过图表编辑且保存过内容。\n* 提示：本文件暂不含实际内容，编辑无效。\n* 操作：".cht"文件右键菜单，可选择编辑或预览图表。\n*\n*\/'
                }
                $.ajax({
                    url: '/api/createSpecialFile',
                    type: 'post',
                    data: chtData,
                    dataType: 'json',
                    success: function (result) {}
                })
            }
        }
    })
}

function getCharBuilder(ele) {
    var name = ele.siblings("._name").text();
    var namejs = name + ".js";
    var data = {
        "openid": decodeURIComponent(getCookie("openid")),
        "name": namejs
    };
    $.ajax({
        url: path + '/chart/udatav/getSceneByOpenidAndName',
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json", //必须有 
        success: function (result) {
            if (result && result.code == 200 && result.data.length > 0) {
                if (ele.siblings('.dirList').find(".pro_char").length) {
                    ele.siblings('.dirList').find(".pro_char label").remove();
                    var eleTime = lifile_time(result.data[0].modifyTime);
                    ele.siblings('.dirList').find(".pro_char .char_name").after(eleTime);
                    return;
                } else if (ele.siblings('.dirList').find(".lifile[data-name*='.cht']").length) {
                    return;
                }
                var eleTime = lifile_time(result.data[0].modifyTime);
                var previewId = result.data[0].id;
                var namechar = name + ".cht"
                var eleChar = '<p class="pro_char char_file" data-name="' + name + '" data-chartname="' + namechar + '" data-url="">\
                    <span class="char_name" data-id="' + previewId + '">' + namechar + '</span>' + eleTime + '\
                </p>'
                ele.siblings('.dirList').find(".pro_main").after(eleChar);
                $(eleChar).find(".char_name").after(lifile_time(result.data.modifyTime));
            }
        }
    })
}
//进入citybuilder编辑
function editMap(ele) {
    if ($(ele).attr("data-id") || $(ele).attr("data-jsid")) {
        var id = $(ele).attr("data-id");
        var name = $(ele).attr("data-name");
        var jsId = $(ele).attr("data-jsid");
        var mapLink = path + "/citybuilder/#/projectAlter?type=js&id=" + id + "&pname=" + name;
        if(jsId){
            mapLink = path + "/citybuilder/#/projectAlter?type=js&jsId=" + jsId + "&id=" + id + "&pname=" + name;
        }
        window.open(mapLink);
    }
}
//进入chartBuilder编辑
function editChart(ele) {
    var id = $(ele).attr("data-id");
    // var chartLink = "https://www.thingjs.com/chart/editor/" + id + "?isThingJSScene=true";
    var chartLink = path + "/chart/editor/" + id + "?isThingJSScene=true";
    window.open(chartLink)
    
}
//重置chart
function resetChart(ele){
    var dname = $(ele).attr("data-name");
    var proName = $('#bfilen').text();
    if($('#bfilen').is(':hidden')){
        newAlert("请先打开将要“重置图表”的项目！", 'warning');
    }else{
        if(dname != proName){
            newAlert("请先打开将要“重置图表”的项目！", 'warning');
        }else{
            showChartPanel2();
        }
    }
    // var sureReset = function(){
    //     swal_close();
    //     showChartPanel2();
    // }
    // newConfirm('本项目已带图表，重新选择图表模板会覆盖原有图表设置。您确定要重新选择图表模板吗？', ['确定', '取消'], [sureReset, null]);
}
//删除chart
function deleteChart(ele) {
    var sureDelete = function () {
        deleteChtFile(ele);
    }
    newConfirm('您确定要删除该图表吗？', ['确定', '取消'], [sureDelete, null]);
}
//进入chartBuilder预览
function previewChart(ele) {
    var id = $(ele).attr("data-id");
    if (id) {
        var path = "https://www.thingjs.com"
        var chartLink = path + "/chart/publish/" + id;
        window.open(chartLink)
    }
}

function previewBIM(ele) {
    if ($(ele).hasClass('disabled')) {
        return;
    }
    const url = $(ele).attr('data-bim-url');
    const fullUrl = window.location.origin + '/bim/preview/index.html#' + url;
    window.open(fullUrl);
}

$('#list1').on('click', '.pro_char', function (e) {
    var chartname = $(this).find(".char_name").text();
    var name = $(this).attr("data-name");
    var jsname = $(this).attr("data-name") + ".js";
    if ($(".pro_main.main_file").length == 0 || $(this).prev().hasClass("main_file")) { //添加主文件
        var isExted = $('.setting2').find("li.filen-close[data-name='" + chartname + "']").length ? true : false;
        if (isExted) {
            $('.setting2').find("li.filen-close[data-name='" + chartname + "']").trigger('click');
        } else {
            if ($('.setting2 li').length >= LIMIT) {
                newAlert('最多可打开同时' + LIMIT + '个文件！', 'warning');
                return;
            }
            addMultifile(chartname, '/guide/static/chart.js', $(this));
        }
    } else {
        //添加参考文件
        var setLis = $('.setting2 li[data-name="' + chartname + '"]').length;
        if (setLis == 1) {
            $('.setting2 li[data-name="' + chartname + '"]').trigger('click');
        } else if (setLis > 1) {
            return;
        } else {
            if ($('.setting2 li').length >= LIMIT) {
                newAlert('最多可打开同时' + LIMIT + '个文件！', 'warning');
                return;
            }
            addReference(chartname, '/guide/static/chart.js', [name, jsname], '/guide/static/chart.js', $(this));
            return;
        }
    }
    $(this).addClass('active');
})

function newChart() {
    //校验
    if (!getCookie('openid')) {
        loginwindowon();
        return;
    }
    // if(!checkUserAuth("chart")){
    //     newAlert("“导入图表”功能仅对VIP（商业开发者）开放，请升级后使用")
    //     return;
    // }
    var lifileList = $('.curList .dirList .lifile');
    for(var i = 0, j = lifileList.length; i < j; i++){
        var dname = lifileList[i].dataset.name
        if(dname != undefined && dname.split('.')[1] == 'cht'){
            var surenewChart = function(){
                swal_close();
                showChartPanel2();
            }
            surenewChart();
            // newConfirm('本项目已带图表，重新选择图表模板会覆盖原有图表设置。您确定要重新选择图表模板吗？', ['确定', '取消'], [surenewChart, null]);
            return;
        }
    }
    showChartPanel2();
}
// 显示chart面板
function showChartPanel(projectName) {
    var projectName = '' || projectName;
    if (projectName == '' || projectName == undefined) return;
    var tempMsg = createcgaetTemp(projectName);
    if (tempMsg == '') {
        $(".creChart,.pay-mb").show();
    } else {
        newAlert(tempMsg);
    }
}
function showChartPanel2(){
    // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '图表资源') {
    //     $('.panelModel').slideUp();
    // } else {
        setPanelModel($('.btn-cb'), "#moveclose-dialog", "大屏", "chart", true);
    // }
    _hmt_maidian('在线开发页面', '快捷键', '图表资源');
}
// 关闭chart面板
function closeChartPanel() {
    $(".creChart,.pay-mb").hide();
}
// 创建chart面板
function createcgaetTemp(projectName) {
    let msg = '';
    let data = [];
    let para = {
        status: -1,
        filter: {
            definition: 0
        }
    };
    $.ajax({
        // url: path + '/chart/udatav/getSceneTemplateListByParams',
        url: 'https://www.thingjs.com/chart/udatav/getSceneTemplateListByParams',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(para),
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.code == 200) {
                data = data.data;
            }
            $('.creChart .chartMain .templates').html(template('chartTemplate', {
                list: data,
                projectName: projectName
            }));
        },
        error: function () {
            msg = '图表模板正在维护中';
        }
    })
    return msg;
}
// chart跳转
function creChart(projectName, id) {
    var token = window.localStorage.getItem("token");
    // 通过模板创建场景
    var data = {
        "openid": decodeURIComponent(getCookie("openid")),
        "name": projectName
    };
    $.ajax({
        url: path + '/chart/udatav/getSceneByOpenidAndName',
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json", //必须有 
        success: function (result) {
            if (result && result.code == 200) {
                if(result.data.length > 0){
                    var cid = result.data[0].id;
                    var cdata = {
                        "id": cid,
                        "name": projectName + '_modify'
                    };
                    $.ajax({
                        url: path + '/chart/udatav/renameById',
                        type: 'post',
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify(cdata),
                        contentType: "application/json;charset=utf-8", //必须有 
                        success: function (result) {
                            if (result && result.code == 200) {
                                if (id) {
                                    url = path + '/chart/editor/new/frommode/' + id + '?projectName=' + projectName;
                                } else { //空白场景
                                    url = path + '/chart/editor/new?projectName=' + projectName;
                                }
                                window.open(decodeURI(url));
                            }
                        }
                    })
                }else{
                    if (id) {
                        url = path + '/chart/editor/new/frommode/' + id + '?projectName=' + projectName;
                    } else { //空白场景
                        url = path + '/chart/editor/new?projectName=' + projectName;
                    }
                    window.open(decodeURI(url));
                }
            }
        }
    })
}

function clickIconFile(ele) {
    var teamLeaderId = "";
    //协作项目    
    if(ele.parent('.lifileResoure ').hasClass('team')){
        teamLeaderId = getUidByPath(ele.parent('.team').attr("data-url"));
    }
    if (ele.hasClass('active')) {
        ele.removeClass('active');
        ele.siblings('.dirList').slideUp();
    } else {
        ele.addClass('active');
        if (ele.siblings('ul').length <= 0) {
            var textIndentNum = null;
            if (ele.parent('.lifileResoure')[0].style.textIndent) textIndentNum = 1;
            ele.parent('.lifileResoure').append(createDirList(ele.parent('.lifileResoure').attr('data-name'), null, textIndentNum, ele.parent('.lifileResoure ').hasClass('trash'),null,teamLeaderId));
            var dataTime = ele.parent('.lifileResoure').children('.file_change_time').attr('title');
            var timeLiVis = ele.parent('.lifileResoure').children('.file_change_time').text();
            var timeLabel = `<label class="file_time" title="` + dataTime + `">` + timeLiVis + `</label>`;
            ele.parent('.lifileResoure').find('.pro_main').append(timeLabel);
        } else {
            ele.siblings('.dirList').slideDown();
            $(this).parents('.lifileResoure ').addClass('active')
        }
    }
}
//获取垃圾箱内文件真实名字
var trashFile = {};
function getRealFileName() {
    $.ajax({
        url: '/api/getRealFileName',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (result) {
            if (result && result.message == "ok") {
                trashFile = result.data;
            }
        }
    })
}
$('#list1').on('click', 'li.lifileResoure.lifile', function (e, type) {
    var event = e || window.event;
    event.stopPropagation();
    if ($(this).hasClass("trash")) {
        $('.trashRecovery').hide();
        if ($('#list1').find('.sel').length) {
            $('#list1').find('.sel').removeClass('sel');
        }
        getRealFileName();
    }
    var ele = $(this).children('.icon-file');
    if ($(event.target).find('.rename_file_input').length) return;
    if ($(event.target).parents('.dirList').length || $(event.target).parents('.op_icons').length || (!event.originalEvent && !type) || (!$(this).parents('.curList').length && !event.originalEvent && type !== 'f' && !!type)) return;
    clickIconFile(ele);
    hideContextMenu();
    $('#list1 .sel').removeClass('sel');
    $('.rename_file_input').remove();
})
// 2.0权限读取
function showVersion2(type) {
    if(type){
        $('#tab_list1').css("display","none");
        $('#tab_list1').remove()
        $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:50% !important");
        $('.wrapper-sam.sam-new .content .content-nav').css("min-width","300px");
        $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
        $('.wrapper-sam .content #content_sample').css("left","300px");
        return
    }
    if (PERMISSIONCONFIG.getPermission('api内测')) {
        if ($('#tab_list1').length) {
            $('#tab_list1').html(` <p>v2.0</p>
                <span>(`+$('#list2').find('.item-li').length+`)</span>`);
            $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:33.3% !important");
            $('.wrapper-sam.sam-new .content .content-nav').css("cssText","min-width:300px !important");
            $('.wrapper-sam.sam-new .content .content-nav').css("cssText","width:300px !important");
            $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
            $('.wrapper-sam .content #content_sample').css("left","300px");
            var li=$('#tab_list1');
        } else {
            var li=`<li id="tab_list1" class="tab-li" data-index="2">
                    <p>v2.0</p>
                    <span>(`+$('#list2').find('.item-li').length+`)</span>
                </li>`;
                $('#tab_list').after(li);
                $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:33.3% !important");
                $('.wrapper-sam.sam-new .content .content-nav').css("cssText","min-width:300px !important");
                $('.wrapper-sam.sam-new .content .content-nav').css("cssText","width:300px !important");
                $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
                $('.wrapper-sam .content #content_sample').css("left","300px");
        }
        setTimeout(()=>{
            $('#tab_list1').off('click');
            $('#tab_list1').on('click',function () {
                var index = $(this).attr('data-index');
                tab_change(index);
                if(!thumbState) $('.panelModel').hide();
                if(!thumbState) $('.panelHeader .close').trigger('click');
                if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
                if(!storeThumbState) $('#moveclose-dialog_store .panelHeader .close').trigger('click');
            });/*  */
        },0);
    } else {
        $('#tab_list1').remove();
        $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:50% !important");
        $('.wrapper-sam.sam-new .content .content-nav').css("min-width","300px");
        $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
        $('.wrapper-sam .content #content_sample').css("left","300px");
    }
    // $.ajax({
    //     url: '/api/hasRole',
    //     type: 'post',
    //     headers: {
    //         Authorization: 'Bearer ' + getCookie('accessToken'),
    //     },
    //     data: {
    //         "mmdId": getCookie('mmdId'),
    //         "roleName": "api内测"
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         if (data.success == true) {
    //             if ($('#tab_list1').length) {
    //                 $('#tab_list1').html(` <p>v2.0</p>
    //                     <span>(`+$('#list2').find('.item-li').length+`)</span>`);
    //                 $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:33.3% !important");
    //                 $('.wrapper-sam.sam-new .content .content-nav').css("cssText","min-width:300px !important");
    //                 $('.wrapper-sam.sam-new .content .content-nav').css("cssText","width:300px !important");
    //                 $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
    //                 $('.wrapper-sam .content #content_sample').css("left","300px");
    //                 var li=$('#tab_list1');
    //             } else {
    //                 var li=`<li id="tab_list1" class="tab-li" data-index="2">
    //                         <p>v2.0</p>
    //                         <span>(`+$('#list2').find('.item-li').length+`)</span>
    //                     </li>`;
    //                     $('#tab_list').after(li);
    //                     $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:33.3% !important");
    //                     $('.wrapper-sam.sam-new .content .content-nav').css("cssText","min-width:300px !important");
    //                     $('.wrapper-sam.sam-new .content .content-nav').css("cssText","width:300px !important");
    //                     $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
    //                     $('.wrapper-sam .content #content_sample').css("left","300px");
    //             }
    //             setTimeout(()=>{
    //                 $('#tab_list1').off('click');
    //                 $('#tab_list1').on('click',function () {
    //                     var index = $(this).attr('data-index');
    //                     tab_change(index);
    //                     if(!thumbState) $('.panelModel').hide();
    //                     if(!thumbState) $('.panelHeader .close').trigger('click');
    //                     if(!storeThumbState) $('#moveclose-dialog_store .panelModel').hide();
    //                     if(!storeThumbState) $('#moveclose-dialog_store .panelHeader .close').trigger('click');
    //                 });/*  */
    //             },0);
    //         } else {
    //             $('#tab_list1').remove();
    //             $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:50% !important");
    //             $('.wrapper-sam.sam-new .content .content-nav').css("min-width","300px");
    //             $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
    //             $('.wrapper-sam .content #content_sample').css("left","300px");
    //         }
    //     },error:function(){
    //         $('#tab_list1').remove();
    //         $('.wrapper-sam.sam-new .content .content-nav .tab .tab-ul .tab-li').css("cssText","width:50% !important");
    //         $('.wrapper-sam.sam-new .content .content-nav').css("min-width","300px");
    //         $('.wrapper-sam .content #content_sample').css("width","calc(100% - 300px)");
    //         $('.wrapper-sam .content #content_sample').css("left","300px");
    //     }
    // })
}
async function initSample() {
    $("#wapNav,.logouttwo").remove();
    var code=getQueryString('code');
    var timestamp= getQueryString('timestamp');
    $('.sam-search p.refresh').off('click').on('click',function(e){
        THINGJSSAMPLE.samSearchRefresh(e);
    });
    if (code && timestamp) {
        function loading(){
            SSOLOGIN.clearCookie();
            $.ajax({
                type: 'post',
                url: '/api/getUserForPaas/userLogin',
                data: {
                    code: code,
                    timestamp: timestamp
                },
                success: function (res) {
                    if (res.state && res.content) {
                        // clearAllCookie();
                        SSOLOGIN.clearCookie();
                        setCookie('accessToken', res.content.access_token);
                        setCookie('SameSite', 'None');
                        getTokenByAccess(res.content.access_token);
                        setTimeout(() => {
                            var f=getQueryString('f');
                            window.location.href = '/guide/?m=sample'+(f?('&f='+f):'');
                        }, 0)
                    } else {
                        var errorData = res;
                        try {
                            errorData = JSON.stringify(errorData);
                        } catch (error) {
                            errorData = {
                                state: false,
                                message: '请求错误',
                                errorCode: res.errorCode
                            }
                            errorData = JSON.stringify(errorData);
                        }
                        window.location.href = '/guide/?m=sample';
                        // alert(errorData.message||'请求错误','warning');
                    }
                }
            })
        }
        if(typeof(SSOLOGIN)=='object'&&typeof(SSOLOGIN.loginByUser)!='undefined') {
            var f=getQueryString('f');
            SSOLOGIN.loginByUser('/guide/?m=sample'+(f?('&f='+f):'')).then(result=>{
                if(result!='fail') {
                    return;
                }
                loading();
            }).catch(e=>{
                console.log(e);
                loading();
            })
        }
        return;
    }
    isLogin();
    var name = getUserName('name');
    if(getCookie('mmdId')) PERMISSIONCONFIG.initPermission(getCookie('mmdId'));
    domyfile();
    initSam();
    // 初始化
    setCookie('switchlog', 1);
    setCookie('switchmenu', 1);
    setCookie('debugSwitch', 1);
    $('.editScene').html('');
    $("#navbarHeader #login").on('click', function () {
        if ($(this).attr('data-log') === '-1') {
           SSOLOGIN.login('init');
        }
    })
    $('#nav-reg').off('cliick').on("click", function (e) {
        var event=e||window.event;
        event.stopPropagation();
        event.preventDefault();
        SSOLOGIN.register('init');
    });
    $('#logout').click(function () {
        SSOLOGIN.logout();
        indexlogininit();
    });
    $('.sam_menu .menu_item[data-menu="file"] .con_list .con_item[onclick="createSignProject()"]').remove();
    if (!name) {
        //退出
        $('#login').show();
        $('#login').html('登录').attr('data-log', '-1');
        $('.vipLi .login-name').attr('data-log', '-1');
        $('#msg').hide();
        $('#emailIcon').hide();
        $('#emailLetter').hide();
        $('#headimg').hide();
        $('.vipLi').hide();
        $('#login').removeClass("login-active")
        $(".vip").css({
            "display": "none"
        });
        $('#developer').hide();
        $('#nav-reg').show();
        $("#recharge").hide();
        $("#modelSer").show();
        $("#development").show();
        showVersion2(1);
        showRendering(1);
        // todo: 初始化布局
    } else {
        //登录
        ORIGINOPENID=getCookie('openid');
        $('.vipLi .login-name').html(name).attr('data-log', '1');
        $('#login').html(name).attr('data-log', '1');
        if (getCookie('userNick') != null) {
            $("#login").html(decodeURI(decodeURI(getCookie('userNick'))));
        }
        $('#login').addClass("login-active")
        $('#msg').show();
        if (getCookie('role') != 'admin') $("#informBell").show();
        $('#emailIcon').show();
        $('.vipLi').show();
        $('#headimg').show();
        $('#headimg').css({
            'background-image': 'url(' + headimgurl + ')'
        });
        $('#nav-reg').hide();
        if (getCookie("role") == 'developer') {
            $(".vip").css({
                "display": "inline"
            });
            $('#developer').hide();
        } else {
            $(".vip").css({
                "display": "none"
            });
            if (getCookie("role") == 'free') {
                $('#developer').show();
            }
        }
        $("#recharge").show();
        $("#modelSer").show();
        $("#development").show();
        if(getQueryString("cityBuilder")=='true') {
            setTimeout(function(){
                // showIframeLoad('地图正在加载中...');
                largePanel(null,'地图','createProject')
            },100);
        }

        if(window.name=='项目'||window.name=='园区'||window.name=='园区-全景图'||window.name=='我的订单'||window.name=='个人信息'||window.name=='系统消息'){
            setTimeout(function(){
                largePanel(null,window.name);
                window.name='';
            },100);
        }
        singiRole();      
        showVersion2();
        showRendering();
    }
    
    $("#msg").click(function () {
        var openid = getCookie("openid");
        if (!openid) {
            clearAllCookie();
            window.location.href = document.location.origin;
        } else {
            var path = window.location.protocol + "//" + window.location.host;
            if (getCookie("role") == 'admin') {
                if (getCookie("type") == '1') {
                    $(this).attr("href", "/admin/#/UserList")
                    window.open(path + "/admin/#/UserList");
                } else if (getCookie("type") == '2') {
                    window.open(path + "/admin/#/State");
                }
            } else if (getCookie("openid")) {
                if(getQueryString('m')=='sample') return largePanel(null,'项目');
                window.open(path + "/admin/#/myProduct");
            }
        }
    })
    $('#logout').click(function () {
        clearAllCookie();
        indexlogininit();
    });    
    // 如果用户开启了保存开发布局
    if(getCookie('saveLayoutSwitch') === '1'){
        getOrSaveDevLayout();
    }
}
$('.sam_menu li.menu_item').each(function (i) {
    if ($(this).attr('data-menu')) {
        setMenu(this, $(this).attr('data-menu'));
        $(this).mouseover(function (e) {
            if ($(e.target).hasClass('menu_item')||$(e.target).parent().hasClass('menu_item')) {
                var _this=$(e.target).hasClass('menu_item')?$(e.target):$(e.target).parent();
                setMenu(_this, $(_this).attr('data-menu'));
            }
            hideAltMenu();
        })
    }
})
// 设置菜单选选项
function setMenu(dom, type) {
    if (type !== 'code' && $(dom).children('.con_list').length) return;
    var menuUrl = 'menu/' + type + '.html';
    if (type == 'code') menuUrl = "/guide/cn/" + type + ".html";
    $.ajax({
        url: menuUrl,
        type: 'get',
        dataType: 'html',
        success: function (data) {
            if (type === 'code') {
                $(dom).children().not('.tip').remove();
                var con_list = document.createElement('div');
                $(con_list).addClass('con_list').append($(data));
                $(dom).append($(con_list));
            } else {
                $(dom).append($(data));
            }
            if(type=='setting') showRendering();
            // $(dom).children('.con_list').children().bind('click', function (e) {
            //     e.stopPropagation(e);
            //     $(dom).children().not('.tip').remove();
            // })
        }
    })
}
// 关闭该页面
function closeSample(e) {
    var cur_name = $(".setting2 .filen-edit:visible").parent('li').hasClass('filen') ? $(".setting2 #bfilen").text() : $(".setting2 .filen-edit:visible").parent('li').children('p').text();
    if ($(".setting2 .filen-edit").is(':visible')) {
        var f1 = function () {
            upload_publish();
            setTimeout(function () {
                swal_close()
                window.close();
            }, 1000);
        };
        var f2 = function () {
            swal_close()
            window.close();
        };
        newConfirm(($(".setting2 .filen-edit:visible").parent('li').hasClass('filen') ? '项目主文件' : '文件') + '“' + cur_name + '”未保存，您是否要离开？', ['保存', '不保存', '取消'], [f1, f2, swal_close]);
    } else {
        var f1 = function () {
            swal_close();
            window.close();
        };
        newConfirm('您是否要离开此页面？', ['确认', '取消'], [f1, swal_close]);
    }
}
// 快捷键设置
document.onkeydown = function (event) {
    var e = event || window.event;
    //菜单隐藏
    hideAltMenu();
    hideContextMenu();
    if (e.keyCode == 13 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+enter
        reloadIframe();
        return false;
    }
    if (e.keyCode == 82 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+r
        if($('.icon_tip').hasClass('tuichu_icon')) {
            e.preventDefault();
            e.returnValue = false;
            return false;
        }
        reloadIframe();
        e.preventDefault();
        e.returnValue = false;
        return false;
    }
    
    if (e.keyCode == 83 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+s
        e.stopPropagation();
        e.preventDefault();
        upload_publish();
        e.returnValue = false;
        return false;
    }
    if (e.keyCode == 27) {
        $('.login-window').hide();
        $('#pay-mb-out').hide();
        return false;
    }
    if (e.keyCode == 80 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+p
        CreateCode();
        e.preventDefault();
        e.returnValue = false;
        return false;
    }
    // 模型资源
    if (e.keyCode == 77 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+m
        stopPropagation(e);
        // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '界面资源') {
        //     $('.panelModel').slideUp();
        // } else {
        setPanelModel($('.btn-mx'), "#moveclose-dialog", "模型", "model-library", true);
        // }
        _hmt_maidian('在线开发页面', '快捷键', '模型');
        return false;
    }
    // 场景资源
    if (e.keyCode == 74 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+j
        stopPropagation(e);
        // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '园区资源') {
        //     $('.panelModel').slideUp();
        // } else {
        setPanelModel($('.btn-yq'), "#moveclose-dialog", "园区", "scenes", true);
        // }
        _hmt_maidian('在线开发页面', '快捷键', '园区');
        return false;
    }
    // 大屏资源
    if (e.keyCode == 66 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+B
        if(!$('.btn-cb').length) return false;
        stopPropagation(e);
        // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '图表资源') {
        //     $('.panelModel').slideUp();
        // } else {
        newChart();
        // }
        _hmt_maidian('在线开发页面', '快捷键', '图表资源');
        return false;
    }
    // 效果模板资源
    if (e.keyCode == 69 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+E
        stopPropagation(e);
        setPanelModel($('.btn-ziyuan'), "#moveclose-dialog", "效果模板", "source", true);
        _hmt_maidian('在线开发页面', '资源', '效果模板');
        return false;
    }
    // 配饰资源
    if (e.keyCode == 68 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+D
        stopPropagation(e);
        setPanelModel($('.btn-tkh'), "#moveclose-dialog", "天空盒", "skybox", true);
        _hmt_maidian('在线开发页面', '资源', '天空盒');
        return false;
    }
     // 贴图资源
     if (e.keyCode == 81 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+Q
        if(!$('.btn-tt').length) return false;
        stopPropagation(e);
        setPanelModel($('.btn-tt'), "#moveclose-dialog", "贴图", "ui-texture", true);
        _hmt_maidian('在线开发页面', '快捷键', '贴图');
        return false;
    }

    // 动态背景资源
    if (e.keyCode == 73 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+i
        if(!$('.btn-bk').length) return false;
        stopPropagation(e);
        // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '动态背景') {
        //     $('.panelModel').slideUp();
        // } else {
        setPanelModel($('.btn-bk'), "#moveclose-dialog", "动态背景", "dynBackground", true);
        // }
        _hmt_maidian('在线开发页面', '快捷键', '动态背景');
        return false;
    }
    // 界面资源
    if (e.keyCode == 85 && e.ctrlKe&!e.shiftKey&!e.altKey) { // ctrl+u
        if(!$('.btn-jm').length) return false;
        stopPropagation(e);
        // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '界面资源') {
        //     $('.panelModel').slideUp();
        // } else {
        setPanelModel($('.btn-jm'), "#moveclose-dialog", "界面", "ui-library", true);
        // }
        _hmt_maidian('在线开发页面', '快捷键', '界面');
        return false;
    }
    // 地图资源
    if (e.keyCode == 75 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+k
        stopPropagation(e);
        // if ($('#moveclose-dialog .panelModel').is(':visible') && $('.panelTitle').text().trim() === '地图资源') {
        //     $('.panelModel').slideUp();
        // } else {
        if (!getCookie('openid')) {
            loginwindowon();
            return;
        }
        setPanelModel($('.setting1 .btn-city'), "#moveclose-dialog", "地图", "city", true);
        // }
        _hmt_maidian('在线开发页面', '快捷键', '地图');
        return false;
    }
    // 音乐
    if (e.keyCode == 76 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+L
        stopPropagation(e);
        setPanelModel($('.btn-yy'), "#moveclose-dialog", "音乐", "customMusic", true);
        _hmt_maidian('在线开发页面', '资源', '音乐');
        return false;
    }
    // 我的项目
    if (e.keyCode == 68 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+D
        stopPropagation(e);
        if (!getCookie('openid')) {
            loginwindowon();
            return;
        }
        largePanel(null,'项目')
        _hmt_maidian('在线开发页面', '快捷键', '我的项目');
        return false;
    }
    // // 我的地图
    // if (e.keyCode == 76 && e.ctrlKey) { // ctrl+L
    //     stopPropagation(e);
    //     if (!getCookie('openid')) {
    //         loginwindowon();
    //         return;
    //     }
    //     largePanel(null,'地图')
    //     _hmt_maidian('在线开发页面', '快捷键', '我的地图');
    //     return false;
    // }
    // 我的资源
    if (e.keyCode == 79 && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+O
        stopPropagation(e);
        if (!getCookie('openid')) {
            loginwindowon();
            return;
        }
        largePanel(null,'园区')
        _hmt_maidian('在线开发页面', '快捷键', '我的资源');
        return false;
    }
    // 日志
    if ((e.keyCode == 49 || e.keyCode == 97) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+1
        if (!getCookie('switchlog')) {
            setCookie('switchlog', 1);
            $('#content_sample .content-browser').removeClass('hidelog');
            $('#content_sample .content-browser .screen').first().show()
        }
        var c_showlog = Number(getCookie('switchlog'));
        setCookie('switchlog', c_showlog ? 0 : 1);
        !c_showlog ? $('#content_sample .content-browser').removeClass('hidelog') : $('#content_sample .content-browser').addClass('hidelog');
        !c_showlog ? $('#content_sample .content-browser .screen').first().show() : $('#content_sample .content-browser .screen').first().hide();
        if ($('.sam_menu li.menu_item[data-menu="view"]').children('.con_list').length) {
            showlog();
        }
        _hmt_maidian('在线开发页面', '快捷键', !c_showlog ? '显示日志' : '关闭日志');
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            getOrSaveDevLayout(1,4);
        }
        return false;
    }
    // 目录
    if ((e.keyCode == 50 || e.keyCode == 98) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+2
        if (!getCookie('switchmenu')) {
            setCookie('switchmenu', 1);
        }
        if ($('.sam_menu li.menu_item[data-menu="view"]').children('.con_list').length) {
            showmenu('menutab');
        } else {
            // 如果用户开启了保存开发布局
            if(getCookie('saveLayoutSwitch') === '1'){
                getOrSaveDevLayout(1,4);
            }
        }
        var c_showmenu = Number(getCookie('showmenu'));
        _hmt_maidian('在线开发页面', '快捷键', !c_showmenu ? '显示目录' : '关闭目录');
        return false;
    }
    // 3D
    if ((e.keyCode == 51 || e.keyCode == 99) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+3
        if (!getCookie('debugSwitch')) {
            setCookie('debugSwitch', 1);
        }
        
        var show3D = Number(getCookie('debugSwitch'));
        setCookie('debugSwitch', show3D ? 0 : 1);
        !show3D ? debugSwitchTrue() : debugSwitchFalse();
        if ($('.sam_menu li.menu_item[data-menu="view"]').children('.con_list').length) {
            is3D();
        }
        if($('#moveclose-dialog .panelModel .panelBody .m-setting .linerow #switch').length) {
            $('#moveclose-dialog .panelModel .panelBody .m-setting .linerow #switch').prop("checked",!show3D?true:false);
        }
        _hmt_maidian('在线开发页面', '快捷键', !show3D ? '启用3D' : '关闭3D');
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            getOrSaveDevLayout(1,4);
        }
        return false;
    }
    // 白底风格
    if ((e.keyCode == 52 || e.keyCode == 100) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+4
        _themeStyle = _themeStyle === 'vs-dark' ? 'vs' : 'vs-dark';
        monaco.editor.defineTheme('myCustomTheme', {
            base: _themeStyle,
            inherit: true,
            rules: [{
                token: 'thingjs.thing',
                foreground: 'FF7F00',
                fontStyle: 'bold',
            }]
        });
        if ($('.sam_menu li.menu_item[data-menu="view"]').children('.con_list').length) {
            setTheme();
        }
        _hmt_maidian('在线开发页面', '快捷键', _themeStyle === 'vs-dark' ? '黑底风格' : '白底风格');
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            getOrSaveDevLayout(1);
        }
        return false;
    }
    // 场景信息
    if ((e.keyCode == 57 || e.keyCode == 105) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+9
        // if ($('.panelModel').is(':visible') && $('.panelTitle').text().trim() === '场景') {
        //     $('.panelModel').slideUp();
        //     return;
        // }
        stopPropagation(e);
        $(this).parents('.menu_item').children().not('.tip').remove();
        setPanelModel($('.btn-cjxx'), "#moveclose-dialog", "场景信息", "sceneInfo", true);
        _hmt_maidian('在线开发页面', '快捷键', '场景信息');
        return false;
    }
    // 场景效果
    if ((e.keyCode == 56 || e.keyCode == 104) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+8
        // if ($('.panelModel').is(':visible') && $('.panelTitle').text().trim() === '场景效果') {
        //     $('.panelModel').slideUp();
        //     return;
        // }
        stopPropagation(e);
        setPanelModel($('.btn-cjxg'), "#moveclose-dialog", "场景效果", "lightInfo", true);
        _hmt_maidian('在线开发页面', '快捷键', '场景效果');
        return false;
    }
    // 拾取坐标
    if ((e.keyCode == 55 || e.keyCode == 103) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+7
        if ($('.panelModel').is(':visible') && $('.panelTitle').text().trim() === '拾取场景坐标') {
            $('.panelModel').slideUp();
            return;
        }
        stopPropagation(e);
        setPanelModel(null, "#moveclose-dialog", "拾取场景坐标", "scenePosition", true);
        _hmt_maidian('在线开发页面', '快捷键', '拾取坐标');
        return false;
    }
    // if ((e.keyCode == 54 || e.keyCode == 102) && e.ctrlKey) { // ctrl+6
    //     if ($('.panelModel').is(':visible') && $('.panelTitle').text().trim() === '自定义模型信息') {
    //         $('.panelModel').slideUp();
    //         return;
    //     }
    //     stopPropagation(e);
    //     setPanelModel(null, "#moveclose-dialog", "自定义模型信息", "customModel", true);
    //     _hmt_maidian('在线开发页面', '快捷键', '自定义模型');
    //     return false;
    // }
    if ((e.keyCode == 53 || e.keyCode == 101) && e.ctrlKey&!e.shiftKey&!e.altKey) { // ctrl+5
        if ($('.panelModel').is(':visible') && $('.panelTitle').text().trim() === '设置') {
            $('.panelModel').slideUp();
            return;
        }
        stopPropagation(e);
        setPanelModel(null, "#moveclose-dialog", "设置", "setting", true);
        _hmt_maidian('在线开发页面', '快捷键', '设置');
        return false;
    }
    //菜单快捷键设置 （ALT）
    if (e.keyCode == 70 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+F 文件菜单
        altMenuShow('file');
        return false;
    }
    if (e.keyCode == 67 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+C 快捷代码菜单
        altMenuShow('code');
        return false;
    }
    if (e.keyCode == 82 && e.altKey&e.shiftKey&!e.ctrlKey) { //ctrl+shift+R 空间
        setPanelModel_1($('.btn-store'), "#moveclose-dialog_store", "空间统计", "store", true);
        return false;
    }
    if (e.keyCode == 69 && e.altKey&e.shiftKey&!e.ctrlKey) { //alt+shift+E 私有数量
        setPanelModel_1($('.btn-scene-space'),"#moveclose-dialog_scene-space","私有数量", "sceneSpace", true);
        return false;
    }
    if (e.keyCode == 82 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+R 资源菜单
        altMenuShow('source');
        return false;
    }
    if (e.keyCode == 84 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+T 工具菜单
        altMenuShow('setting');
        return false;
    }
    if (e.keyCode == 80 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+P 项目菜单
        altMenuShow('project');
        return false;
    }
    if (e.keyCode == 86 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+V 视图菜单
        altMenuShow('view');
        return false;
    }
    if (e.keyCode == 72 && e.altKey&!e.shiftKey&!e.ctrlKey) { //alt+H 帮助菜单
        altMenuShow('help');
        return false;
    }
}

// 路径拼接
function setUrl(dom, name, type) {
    if(!isLogin('enter','setUrl')) return;
    $('.sam_header #proj').html('');
    var span = document.createElement('span');
    if (dom) {
        if ($(dom).parents('#list0').length) {
            $(span).append('<span>' + name + '</span>').addClass('url').append("<hr><span>" + name + ".js</span>");
        } else if ($(dom).parents('#list2').length) {
            $(span).append('<span>' + name + '</span>').addClass('url').append("<hr><span>" + name + ".js</span>");
        } else if ($(dom).is($('#bfilen')) && type == 'rename') {
            $(span).append('<span>' + name + '</span>').addClass('url').append("<hr><span>" + name + ".js</span>");
        } else {
            if ($(dom).parent().parent().hasClass('lifileResoure')) {
                $(span).append('<span>' + $(dom).parent().parent().attr('data-name') + '</span>');
                $(span).addClass('url').append("<hr><span>" + name + "</span>");
            } else {
                $(span).append('<span>' + $(dom).parents('.lifileResoure').attr('data-name') + '</span>');
                if ($(dom).parents('.dirList').parents('.dirLi').length > 0) {
                    $(dom).parents('.dirList').parents('.dirLi').each(function (i) {
                        $(span).append("<hr><span>" + get_name($(this).children('.dirLiTitle')) + "</span>");
                    })
                }
                $(span).addClass('url').append("<hr><span>" + name + "</span>");
            }
        }
    } else {
        $(span).addClass('url');
        name.forEach((v, i) => {
            $(span).append((i ? "<hr><span>" + v + "</span>" : "<span>" + v + "</span>"));
        });
    }
    $('.sam_header #proj').append($(span));
    var url = $('.sam_header #proj .url').html().replace(/<span>/g, "").replace(/<\/span>/g, "").replace(/<hr>/g, " - ");
    url.length ? $('.sam_header #proj .url').attr('title', url) : $('.sam_header #proj .url').removeAttr('title');
}
//缩进图标切换
var suojinStatus = true;
//缩进前代码框的宽度
let w = $('#editor').width();
var F;
$('.suojinBox').click(function (e, type) {
    // let newW = $('#editor').width();
    if (suojinStatus == true) {
        // if (w != newW) {
        //     var editorW = $('#editor').width() + 200;
        //     $('#editor').css('width', editorW);
        //     $('.content-middle').css('width', editorW);
        //     console.log('1')
        // }
        // console.log('2')
        $('.sam-new .content.clearfix').addClass('hidemenu');
        $('.iframePanel:visible').css({'left':0});
        $('.content-nav').animate({
            'left': '-'+$('.content-nav').css('width')
        });
        $('#content_sample').animate({
            'left': '0px'
        }).css({
            'width': '100%'
        });
        var editorW = $('#content_sample').width() - $('.content-browser').width();
        $('#editor').css('width', editorW);
        $('.content-middle').css('width', editorW);
        $('.suojin').attr('src', '../../guide/image/sjy.png')
        suojinStatus = false;
        //缩进后代码框的宽度
        // F = $('#editor').width();
        // console.log('f='+F)
    } else if (suojinStatus == false) {
        //点击还原时的代码框宽度
        // if (F != $('.content-browser').width()) {
        //     var editorWidth = $('#editor').width() - 200 + 'px'
        //     $('#editor').css('width', editorWidth);
        //     $('.content-middle').css('width', editorWidth);
        // }
        $('.sam-new .content.clearfix').removeClass('hidemenu').children('.content-nav').css('display','');
        $('.iframePanel:visible').css({'left':$('.content-nav').css('width')});
        let newWidth = 'calc(100% - '+$('.content-nav').css('width')+')';
        $('.content-nav').animate({
            'left': '0px',
            'width': $('.content-nav').css('width')
        });
        $('#content_sample').animate({
            'left': $('.content-nav').css('width')
        }).css({
            'width': newWidth
        })
        var editorW = $('#content_sample').width() - $('.content-browser').width();
        $('#editor').css('width', editorW);
        $('.content-middle').css('width', editorW);
        $('.suojin').attr('src', '../../guide/image/sjz.png')
        suojinStatus = true;
    }
    setCookie('switchmenu', suojinStatus ? 1 : 0);
    if ($('.sam_menu li.menu_item[data-menu="view"]').children('.con_list').length && !type) {
        showmenu();
    }
    setTimeout(()=>{
        // 如果用户开启了保存开发布局
        if(getCookie('saveLayoutSwitch') === '1'){
            getOrSaveDevLayout(1,4);
        }
    },1001)
})
var str = window.location.href.substring(window.location.href.length - 4);
if (str == '&a=1') {
    newfile();
}
initSample();

function showShare() {
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var ifSample = 0;
    var shareName = null;
    var prjurl = null;
    if(!$('.setting2 #gf').is(':visible')) {
        // 未保存文件
        if (!$('.filen-active .filen-edit').is(':hidden')) {
            newAlert('请先保存文件','warning');
            return;
        }
        // 未打开项目时
        if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
            newAlert('请先打开项目再做分享','warning');
            return;
        }
        // 新建未保存
        if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
            newAlert('新建项目尚未保存','warning');
            return;
        }
    }
    if ($('.filen').text().length > 0 &&
        !$('#gf').is(':visible') && $('#bfilen').attr('type') != 'new') {
        shareName = $("#bfilen").data("nameBefore")
        prjurl = $('#bfilen').data('url');
        if ($("#bfilen").data("isOpen") == 1) {
            //公开项目
            ifSample = 2;
        }
        if ($('.filen').text().length > 0 && $('#bfilen').data('isPro') == 1) {
            //托管项目
            //托管私有
            ifSample = 3;
            if ($("#bfilen").data("isOpen") == 1) {
                //托管公开
                ifSample = 4;
            }
        }
    } else if ($('#gf').is(':visible')) {
        ifSample = 1;
        //官方项目
        var Sam = 'sample';
        shareName = $('#list0 .item .active').text();
        var versionTwoArr=['basic','geometry','object','event','marker','camera','component','stage','eometry','samples','earth','create','riversurface','sampleB','FeatureLayer','information','load','map','marker'];
        if(versionTwoArr.includes($('#gf').data('name').split('_').shift())){
            shareName = $('#list2 .item .active').text();
            prjurl = encodeAno(path + "/guide/sampleindex.html?m=official/js/" + $('#gf').data('name') + ".js");
        }else if ($('#gf').data('name').slice(0, Sam.length) == Sam) {
            prjurl = encodeAno(path + "/guide/sampleindex.html?m=examples/js/" + $('#gf').data('name') + ".js");
        } else {
            prjurl = encodeAno(path + '/demos/menu.html?name=' + $('#gf').data('name'));
        }
        
    } else {
        newAlert('请先保存文件！', 'warning');
        return;
    }
    $('.btn-qr').addClass('active');
    showShareProjectPanel(shareName, prjurl, null, ifSample)
}
document.onclick = function (evt) {
    var e = evt || window.event;
    e.stopPropagation();
    hideContextMenu();
    hideAltMenu();
    if ($('.rename_file_input').length) {
        if (!$(e.target).hasClass('rename_file_input')) $('.rename_file_input').remove();
    }
    if (!$(e.target).hasClass('add_file_input') && $('.add_file_input').is(':visible') 
    && $(e.target).parents('#content').length&&!$(e.target).parents('.con_list').length
    && !$(e.target).hasClass('newfile-item') && !$(e.target).parent().hasClass('newfile-item')) {
        $('.add_file_li').remove();
    }
    if ($('#list1').find('.sel').length) {
        $('#list1').find('.sel').removeClass('sel');
    }
    setActiveState();
}
// 右键菜单 -> 打开新项目
document.oncontextmenu = function (evt) {
    var e = evt || window.event;
    e.preventDefault();
    e.stopPropagation();
    hideAltMenu();
    var isMenu = $(e.target).parents('.content-nav').length;
    if (isMenu) {
        if ($(e.target).parent().hasClass('pro_main') || $(e.target).hasClass('pro_main')) {
            var item = $(e.target).hasClass('pro_main') ? $(e.target).children('.pro_name') : $(e.target).parent('.pro_main').children('.pro_name');
            if (!$(item).parents('.curList').length) {
                // var elem = item[0];
                // var top = e.pageY;
                // if (top + $('.newPro').height() > $('html').height()) top = top - $('.newPro').height();
                // var left = e.pageX;
                // var url = './uploads/wechat/' + getCookie('openid') + '/' + ($(item).parents('li.lifileResoure.lifile').data('isPro') == 1 ? 'project/' : '') + $(item).parent('.pro_main').attr('data-url');
                // if($(item).parents('li.lifileResoure.lifile').hasClass('team')) {
                //     var leaderid = getUidByPath($(item).parents('li.lifileResoure.lifile').attr('data-url'));
                //     url = './uploads/wechat/' + leaderid + '/' +($(item).parents('li.lifileResoure.lifile').attr('data-url').indexOf('uploads/wechat/' + leaderid+'/project/')!=-1? 'project/': '')+ ($(item).parents('li.lifileResoure.lifile').data('isPro') == 1 ? 'project/' : '') + $(item).parent('.pro_main').attr('data-url');
                // }
                // $('.newPro .open-item').attr('data-url', url).attr('data-name', $(item).parent('.pro_main').attr('data-name'));
                // hideContextMenu('.newPro');
                // $('.rename_file_input').remove();
                // $('.newPro').css({
                //     top: top + 'px',
                //     left: left + 'px'
                // }).show();
            } else {
                $('#list1 .sel').removeClass('sel');
            }
        } else if ($(e.target).hasClass('lifile') && !$(e.target).hasClass('trash') || $(e.target).parent().hasClass('lifile') && !$(e.target).parent().hasClass('trash')) {
            var item = $(e.target).hasClass('lifile') ? $(e.target).children('._name') : $(e.target).parent().children('._name');
            var url = './uploads/wechat/' + getCookie('openid') + '/' + ($(item).parents('li.lifileResoure.lifile').data('isPro') == 1 ? 'project/' : '') + $(item).parent('').attr('data-name') + '.js';
            if($(item).parents('li.lifileResoure.lifile').hasClass('team')) {
                var leaderid = getUidByPath($(item).parents('li.lifileResoure.lifile').attr('data-url'));
                url = './uploads/wechat/' + leaderid + '/' +($(item).parents('li.lifileResoure.lifile').attr('data-url').indexOf('uploads/wechat/' + leaderid+'/project/')!=-1? 'project/' : '')+ ($(item).parents('li.lifileResoure.lifile').data('isPro') == 1 ? 'project/' : '') + $(item).parent('').attr('data-name') + '.js';
            }
            if($(item).hasClass('openning')||$(item).parents('.openning').length) {
                $('.setOpen .cps-item,.setOpen .open-item').hide();
                var dom=$(item).parents('.openning')?$(item).parents('.openning'):$(item);
                $(dom).attr('isOpen') == '0' ? $('.setOpen .item.siyou-item').text("设为公开") : $('.setOpen .item.siyou-item').text("设为私有");
                $('.setOpen .item.siyou-item').data('isOpen',$(dom).attr('isOpen') == '1'?1:0);
            }
            $('.rename_file_input').remove();
            if(!$(item).parents('.curLi').length) {
                $('.setOpen li.zedit-item,.setOpen li.share-item,.setOpen li.deploy-item,.setOpen li.code-item,.setOpen li.del-item+hr').hide();
                if($(item).parents('.lifileResoure.openning').length) {
                    $('.setOpen li.del-item').hide();
                }
            }
            $('.setOpen li.del-item').data('nameBefore',$(item).attr('title'));
            hideContextMenu('.setOpen');
            $('.setOpen .siyou-item').attr('data-url', url).attr('data-name', $(item).parent('.pro_main').attr('data-name'))
            $('.setOpen .siyou-item').data('url', url);
            $('.setOpen .organize-item').attr('data-url', url).attr('data-name', $(item).parent('.pro_main').attr('data-name'))
            var elem = item[0];
            var top = e.pageY;
            if (top + $('.setOpen').height() > $('html').height()) top = top - $('.setOpen').height();
            var left = e.pageX;
            $('.setOpen').css({
                top: top + 'px',
                left: left + 'px'
            }).show();
        } else {
            hideContextMenu();
            if ($('#list1').find('.sel').length) {
                $('#list1').find('.sel').removeClass('sel');
            }
        }
    } else {
        hideContextMenu();
    }
}
// 打开本项目
function openPro(item, evt) {
    if(isLoginOther) {loginOutTime();}
    var e = evt || window.event;
    e.stopPropagation();
    if ($(item).parents('.setOpen').length) $('.setOpen').hide();
    $('.newPro').hide();
    if ($('#list1').find('.sel').length) {
        $('#list1').find('.sel').removeClass('sel');
    }
    var name = $(item).attr('data-name') || $(item).data('nameBefore');

    // 如果为协作项目，则不可下载
    setTimeout(()=>{
        if($('.curList .lifileResoure').hasClass('team')){
                        $('.down-item').hide()
        }else{
            $('.down-item').show()        }
    }, 1000);
    
    
    // 是否存在已打开项目
    if ($('#bfilen').is(':visible')) {
        if ($('#bfilen').attr('type') == 'new') {
            // 新建项目保存
            var f1 = function () {
                if (!$(".lifileResoure.lifile[data-name='" + name + "']").find('.pro_main').length) {
                    $(".lifileResoure.lifile[data-name='" + name + "']").trigger('click', 'f');
                    $(".lifileResoure.lifile[data-name='" + name + "']").removeClass('active').children('.iconfont.icon-file.active').removeClass('active');
                    $(".lifileResoure.lifile[data-name='" + name + "']").children('.dirList').first().hide();
                }
                var obj = {
                    item: $(".lifileResoure.lifile[data-name='" + name + "']").find('.pro_main'),
                    data: $(item).data()
                }
                upload_publish(null, obj);
                initCursor();
                // swal_close();
            };
            var f2 = function () {
                // 不保存打开
                initCursor();
                loadOpen(item, name, $(item).data('url'));
                swal_close();
                $('#bfilen').attr('type', '');
            };
            newConfirm('您正要打开“'+name+'”项目，当前项目尚未保存，是否保存新项目？', ['保存', '取消'], [f1, f2]);
            return;
        }
        var cur_name = $('#bfilen').data('nameBefore');
        // 当前已打开项目与右键打开项目相同
        if ($('#bfilen').text() == name + '.js') {
            if ($('#bfilen').data('url')==$(item).data('url')) {
                var pro_li = $('#list1 li.lifileResoure.lifile.active .pro_main.main_file[data-name="' + name + '"]');
                $(pro_li).trigger('click');
                return;
            }
        }
        var f1 = function () {
            upload_publish();
            $('#bfilen').attr('type', '');
            $('.setting2 .filen-close').remove();
            $('.setting2 .filen .filen-edit').hide();
            setTimeout(function () {
                $('#list0 .item-li.active').removeClass('active');
                $('#list1 .lifile.active,#list1 .pro_main.active,#list1 .pro_char.char_file.active').removeClass('active');
                loadOpen(item, name, $(item).data('url'));
            }, 500);
            swal_close();
        };
        var f2 = function () {
            $('#bfilen').attr('type', '');
            $('.setting2 .filen-close').remove();
            $('.setting2 .filen .filen-edit').hide();
            $('#list0 .item-li.active').removeClass('active');
            $('#list1 .lifile.active,#list1 .pro_main.active,#list1 .pro_char.char_file.active').removeClass('active');
            initCursor();
            loadOpen(item, name, $(item).data('url'));
            swal_close();
        };
        var f3 = function () {
            swal_close();
        }
        if ($('.setting2 li .filen-edit').is(':visible')) {
            var current_name = $('#bfilen').next('.filen-edit').is(':visible') ? $('#bfilen').data('nameBefore') : $('.setting2 li .filen-edit:visible').parent().children('p').text();
            var tips = $('#bfilen').next('.filen-edit').is(':visible') ? '项目主文件“' + current_name + '”未保存，确认打开新项目吗？' : '文件“' + current_name + '”未保存，确认打开新项目吗？';
            var btnArr = $('.setting2 li .filen-edit').is(':visible') ? ['保存', '不保存', '取消'] : ['确认', '取消'];
            var fnArr = $('.setting2 li .filen-edit').is(':visible') ? [f1, f2, swal_close] : [f2, swal_close];
            newConfirm(tips, btnArr, fnArr);
        } else {
            f2();
        }
        initCursor();
        setCursorPosition();
        return;
    }
    initCursor();
    loadOpen(item, name, $(item).data('url'));
    setCursorPosition();
}
// 加载本项目
function loadOpen(item, name, url, removeActive, isApi = true, ispdtTitle = true) {
    if(isApi){
        var arr = [name, name + '.js'];
        setUrl(null, arr);
        if (removeActive != 0) $('.setting2 li.filen-active').removeClass('filen-active');
        $('#bfilen').text(name + '.js').parent('.filen').addClass('filen-active').show();
        $('#gf').hide();
        if (item) $('#bfilen').data($(item).data());
        if(!$("#list1 .pro_main[data-name='" + name + "']").length) {
            // var li = $("#list1 .lifileResoure.lifile[data-url='"+url+"'][data-name='"+name+"']");
            // console.log(li);
        }
        if($("#list1 .pro_main[data-name='" + name + "']").length>1) {
            if(!$("#list1 .lifileResoure.lifile[data-url='"+url+"'] .pro_main[data-name='" + name + "']").length) return;
            var li = $("#list1 .lifileResoure.lifile[data-url='"+url+"']");
            tip_main($("#list1 .lifileResoure.lifile[data-url='"+url+"'] .pro_main[data-name='" + name + "']"));
        } else {
            var li = $("#list1 .pro_main[data-name='" + name + "']").parents('.lifileResoure.lifile');
            tip_main($("#list1 .pro_main[data-name='" + name + "']"));
        }
        $.ajax({
            url: getUrl("../" + url),
            dataType: "text",
            type: "get",
            async: false,
            success: function (data) {
                if (monacoModel._languageIdentifier.language != 'javascript') {
                    monacoModel.setValue('');
                    monaco.editor.setModelLanguage(monacoModel, 'javascript')
                }
                monacoModel.setValue(data);
                monacoEditor.setScrollPosition({
                    scrollTop: 0
                });
                monacoEditor.focus();
                if (getCookie("debugSwitch") == null || getCookie("debugSwitch") == 1) {
                    if (!$(item).hasClass('main_file')) reloadIframe();
                }
                $('.filen-active .filen-edit').hide();
                clearInterval(setId);
                if(li&&li.length) {
                    $(li).addClass('active');
                    setScrollLeft(li);
                } else {
                    $("#list1 .lifileResoure.lifile[data-url='"+url+"'][data-name='"+name+"']").addClass('active');
                    setScrollLeft($("#list1 .lifileResoure.lifile[data-url='"+url+"'][data-name='"+name+"']"));
                }
                setCursorPosition();
                if(li&&li.length) {
                    moveLiFile(li,null,null,ispdtTitle)
                } else {
                    moveLiFile($("#list1 .lifileResoure.lifile[data-url='"+url+"'][data-name='"+name+"']"),null,null,ispdtTitle)
                }
                setTimeout(() => {
                    checkIfOldUearth(data);
                }, 500);
                
            }
        });
    }else {
        if(li&&li.length) {
            moveLiFile(li,null,null,ispdtTitle)
        } else {
            moveLiFile($("#list1 .lifileResoure.lifile[data-url='"+url+"'][data-name='"+name+"']"),null,null,ispdtTitle)
        }
    }
    if(arr&&arr[1]) {
    var cdata = {
        "openid": decodeURIComponent(getCookie("openid")),
        "name": arr[1]
    };
    $.ajax({
        url: path + '/chart/udatav/getSceneByOpenidAndName',
        type: 'post',
        data: JSON.stringify(cdata),
        contentType: "application/json", //必须有 
        success: function (result) {
            if (result && result.code == 200 && result.data.length > 0) {
                chartId = result.data[0].id;
                $(".curList li.lifileResoure").attr("data-id", chartId);
            }
        }
    })
}
}
// 重命名
function rename(item, e) {
    var e = e || window.event;
    e.stopPropagation();
    $('.rename').hide();
    if ($('#list1').find('.sel').length) {
        $('#list1').find('.sel').removeClass('sel');
    }
    var left = $(item).data('item')[0].getBoundingClientRect().left - 5;
    var width = 'calc(100% - ' + left + 'px)';
    var data = $(item).data();
    if($('.lifileResoure.lifile.active').attr('decor') == 'true') {
        var dataFile = [];
        if(data){
            dataFile = data.filePath.split('/');
            if(dataFile.length === 3 && dataFile[1] == dataFile[2]){
                newAlert('当前文件夹是核心文件夹，不允许重命名！');
                return; 
            }
        }
    }
    if($(item).data('item').parent().attr('data-name')){
        $(item).data('item').after(`<input class="rename_file_input" onkeyup="changeName(this)" style='left:` + left + `px;width:` + width + `' type="text"  value="` + $(item).data('item').parent().attr('data-name') + `">`);
    }else {
        $(item).data('item').after(`<input class="rename_file_input" onkeyup="changeName(this)" style='left:` + left + `px;width:` + width + `' type="text"  value="` + $(item).data('item').parent().attr('title') + `">`);
    }
    let el=$('.rename_file_input')[0];
    el.focus();
    $('.rename_file_input').append("<style>.rename_file_input::selection{ background:#448aff }</style>");
    el.setSelectionRange(0,el.value.indexOf("."));
    $('.rename_file_input').data(data);
}
// 重命名输入框
function changeName(item, e) {
    var e = e || window.event;
    e.stopPropagation();
    if (e.keyCode == 13) {
        var value = $(item).val();
        var msg = verifyFileName(value, $(item).data('isDirectory'));
        if (msg !== '') {
            newAlert(msg + '！', 'error');
            return;
        } else if ($(item).parent().prev('.pro_main').length) {
            if ($(item).parent().prev('.pro_main').children('.pro_name').text() == value) {
                newAlert('文件名称不能与项目主文件一致！', 'error');
                return;
            }
        }
        var file = $(item).data('filePath');
        var isDirectory = $(item).data('isDirectory');
        var arr = file.split('/');
        arr.pop();
        arr.push(value);
        var rename = arr.join('/');
        let para = {
            file: $(item).data('filePath'),
            rename: rename,
            isDirectory: isDirectory
        }
        let renameSuffix = rename.substring(rename.lastIndexOf('.'),rename.length+1);
        function rechristen() {
            $.ajax({
                url: '/api/saveResource',
                type: 'post',
                data: JSON.stringify(para),
                type: 'post',
                dataType: 'json',
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.message == 'ok') {
                        // newAlert("修改成功！", 'success');
                        $(item).data('item').text(value);
                        changeItem($(item).data(), value);
                        $('.rename_file_input').remove();
                    } else {
                        error_tip = result.message;
                        if (result.message == '文件重名' && isDirectory == 1) error_tip = '文件夹重名';
                        newAlert(error_tip + '！', 'warning');
                    }
                }
            })
        }
        // if(UPLOAD_TYPE.indexOf(renameSuffix) > -1){
            rechristen();
        // }else {
        //     // newConfirm('是否修改文件扩展名？<br/><span style="font-size: 12px;margin-top: 6px;">注：修改文件扩展名可能导致文件不可用</span>', ['是', '否'], [rechristen, swal_close]);
        //     newAlert('文件格式错误！', 'error');
        // }
        
    }
}
// 重命名判断
function verifyFileName(nameStr, isDirectory) {
    if (isDirectory == 1) {
        var alertTitle = "文件夹";
    } else {
        var alertTitle = "文件";
    }
    if(isDirectory==1) {
        if (nameStr.length > 16) {
            return alertTitle+'名称不能超过16个字符';
        }
    } else {
        if (nameStr.substr(0,nameStr.lastIndexOf('.')).length > 16) {
            return alertTitle+'名称不能超过16个字符';
        }
    }
    if (!nameStr) {
        return alertTitle + '名称不能为空';
    }
    var p = /[ \\\\/:*?"<>|']/m;
    if (p.test(nameStr)) {
        return alertTitle + '命名不能包含字符“ \\/:*?"<>|”';
    }
    return '';
}

function changeItem(obj, val) {
    var item = obj.item;
    var parentDom = $(obj.item).parent();
    var oldUrl = $(parentDom).attr('data-url');
    var arr = oldUrl.split('/');
    arr.pop();
    arr.push(val);
    var url = arr.join('/');
    if ($(item).hasClass('_name')) {
        $(item).attr('title', val);
        $(parentDom).attr('data-name', val).attr('data-url', url);
        $(parentDom).data('name', val);
    } else if ($(item).hasClass('_dirname')) {
        $(parentDom).attr('title', val).attr('data-url', url);
        if ($(parentDom).parent('li').children('.dirList').children().length) {
            setchildernPath(val, $(parentDom).parent('li').children('.dirList').children(), 1);
        }
    }
    $(parentDom).data('url', url).attr('isdirectory', setDirectory(url, val, obj.isDirectory));
    if ($(".setting2 li[data-url='" + oldUrl + "']").length) {
        if ($(".setting2 li[data-url='" + oldUrl + "']").attr('data-path')) {
            var arr = obj.filePath.split('/').splice(0, obj.filePath.split('/').length - 1);
            arr.push(val);
            if (arr[0] == '') arr.shift();
            $(".setting2 li[data-url='" + oldUrl + "']").attr('data-path', arr.join('/'));
        }
        if ($(".setting2 li[data-url='" + oldUrl + "']").attr('data-realpath')) $(".setting2 li[data-url='" + oldUrl + "']").attr('data-realpath', url);
        $(".setting2 li[data-url='" + oldUrl + "']").attr('data-url', url).attr('data-name', val).data('url', url).children('p').first().text(val);
        if ($(".setting2 li[data-url='" + url + "']").hasClass('filen-active')) $(".setting2 li[data-url='" + url + "']").trigger('click');
    } else if ($(parentDom).parent().find('.lifile.active').length) {
        if ($(parentDom).parent().find(".lifile.active[data-url='" + $(".setting2 li.filen-active").attr('data-url') + "']").length) {
            $(".setting2 li.filen-active").trigger('click');
        }
    }
}

function setDirectory(url, val, isDirectory) {
    var dir = url.split('/').slice(5).slice(0, url.split('/').slice(5).length - 1).join('/');
    if (isDirectory == '1') return isDirectory;
    $.ajax({
        url: '/api/getResourceList?dir=/' + dir,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            var arr = data.fileAllMenu.filter(v => v.name == val);
            isDirectory = arr[0].isDirectory;
        }
    })
    return isDirectory;
}

function setchildernPath(val, arrItem, n) {
    arrItem.each(function (i) {
        if ($(this).hasClass('dirLi')) {
            var arr = $(this).children('.dirLiTitle').attr('data-url').split('/');
            var preArr = arr.slice(0, arr.length - n);
            var nextArr = arr.slice(arr.length - n);
            preArr.pop();
            preArr.push(val);
            var url = preArr.concat(nextArr).join('/');
            $(this).children('.dirLiTitle').attr('data-url', url).data('url', url);
            if ($(this).children('.dirList').children().length) {
                return setchildernPath(val, $(this).children('.dirList').children(), n + 1)
            }
        } else {
            var arr = $(this).attr('data-url').split('/');
            var preArr = arr.slice(0, arr.length - n);
            var nextArr = arr.slice(arr.length - n);
            preArr.pop();
            preArr.push(val);
            var url = preArr.concat(nextArr).join('/');
            if ($(this).hasClass('active')) {
                $(".setting2 li[data-url='" + $(this).attr('data-url') + "']").attr('data-url', url).data('url', url);
            }
            $(this).attr('data-url', url).data('url', url);
        }
    })
}
//文件引入
function useFile(item, e) {
    var e = e || window.event;
    e.stopPropagation();
    $('.rename').hide();
    if ($('#list1').find('.sel').length) {
        $('#list1').find('.sel').removeClass('sel');
    }
    // if ($(item).hasClass('disabled')) return;
    if($(item).data('isdirectory') === '1'){
        let longurl = $(item).data('longurl').slice(1,$(item).data('longurl').length)
        codeBlock("'" + longurl + "'", 'fileresource');
    }else{
        codeBlock("'" + $(item).data('url') + "'", 'fileresource');
    }
}
// 删除资源文件
function delFile(item, e) {
    var e = e || window.event;
    e.stopPropagation();
    $('.rename').hide();
    if ($('#list1').find('.sel').length) {
        $('#list1').find('.sel').removeClass('sel');
    }
    if($('.lifileResoure.lifile.active').attr('decor') == 'true') {
        var dataFile = [];
        if($(item).data()){
            dataFile = $(item).data().filePath.split('/');
            if(dataFile[1] == dataFile[2]){
                newAlert('当前文件夹是核心文件夹，不允许删除！');
                return; 
            }
        }
    }
    if ($(item).hasClass('disabled')) return;
    var teamLeaderId=decodeURIComponent(getLeaderid());
    if(teamLeaderId!=getCookie("openid", true)&&$(item).parents('.lifileResoure').find('.teamIcon').length) {
        return newAlert('协作项目不允许删除文件或文件', 'error', null, null, 'false');
    }
    _delFile($(item));
}

function openTrash() {
    getRealFileName();
    var ele = $(".trash").children('.icon-file');
    clickIconFile(ele);
    hideContextMenu();
    $('#list1 .sel').removeClass('sel');
    $('.rename_file_input').remove();
}

function reloadTrash() {
    initTrashNum();
    $(".trash>.dirList").remove();
    $('.trashRecovery').hide();
    if ($(".trash>.iconfont").hasClass("active")) {
        $(".trash>.iconfont").removeClass("active");
        openTrash();
    }
}

function _delFile(_this) {
    var cur_name = $(_this).data('item').text();
    var f2 = function () {
        swal_close();
    };
    if ($(_this).data('item').parent().hasClass('active') || $(_this).data('item').parent().parent().children('.dirList').find('li.lifile.active').length) {
        var urlArr = [];
        if ($(_this).data('item').parent().hasClass('dirLiTitle')) {
            if ($(_this).data('item').parents('li').first().find('li.active').length) {
                var name = '';
                $(_this).data('item').parents('li').first().find('li.active').each(function () {
                    urlArr.push($(this).attr('data-url'));
                    name = name + '“' + $(this).attr('data-name') + '”、';
                })
                name = name.substring(0, name.length - 1);
                var msg = '文件夹“' + cur_name + '”下的子文件' + name + '已打开，您是否确认删除文件夹及其子文件？';
            } else {
                var msg = '删除文件夹“' + cur_name + '”将一同删除文件夹及其子文件，您是否确认删除？';
            }
        } else {
            var msg = '文件“' + cur_name + '”已打开，您是否确认删除？';
            urlArr.push($(_this).data('item').parent().attr('data-url'))
        }
        var removeFn = function () {
            if (urlArr.length) {
                var nextLi;
                for (var j = 0; j < urlArr.length; j++) {
                    nextLi = nextActive($(".setting2 li[data-url='" + urlArr[j] + "']"), urlArr, 'next');
                    if (nextLi) break;
                }
                var li = $(".setting2").find(nextLi).length ? nextLi : $('.setting2 li.filen');
                if (!$(li).hasClass('filen-active')) {
                    $(li).trigger('click');
                }
                urlArr.forEach((v) => {
                    $(".setting2 li[data-url='" + v + "']").remove();
                });
            }
        }
        var f1 = function () {
            if($(_this).data('item').parents('.lifileResoure.lifile.team').length) {
                var leaderid=getUidByPath($(_this).data('item').parents('.lifileResoure.lifile.team').attr('data-url'));
            }
            var para = {
                file: [$(_this).data('filePath')],
                leaderid:leaderid?leaderid:''
            };
            $.ajax({
                url: '/api/delResourceFile',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(para),
                cache: false,
                processData: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if(data.code==500||data.code=='500') {
                        return newAlert((data.msg||data.message||'删除失败'), 'error', null, null, 'false');
                    }
                    if (data.code == "200") {
                        swal_close();
                        if($(_this).data('isDirectory') == 1) {
                            var delDom='*[data-url="'+$(_this).data('item').parents('li').first().children().first().attr('data-url')+'"][class="'+$(_this).data('item').parents('li').first().children().first().prop('class')+'"][isdirectory="'+$(_this).data('item').parents('li').first().children().first().attr('isdirectory')+'"][trash-state="'+$(_this).data('item').parents('li').first().children().first().attr('trash-state')+'"]';
                            $(_this).data('item').parents('li').first().remove();
                            $(delDom).parents('li').first().remove();
                            newAlert('删除成功！', 'success', null, null, 'false');
                        } else {
                            var delDom='*[data-url="'+$(_this).data('item').parents('li').first().attr('data-url')+'"][class="'+$(_this).data('item').parents('li').first().prop('class')+'"][isdirectory="'+$(_this).data('item').parents('li').first().attr('isdirectory')+'"][trash-state="'+$(_this).data('item').parents('li').first().attr('trash-state')+'"]';
                            $(_this).data('item').parents('li').first().remove();
                            $(delDom).remove();
                            newAlert('删除成功！', 'success', null, null, 'false');
                        }
                        reloadTrash();
                    }
                }
            });
            removeFn();
        }
    } else {
        var msg = $(_this).data('isDirectory') == 1 ? '删除文件夹“' + cur_name + '”将一同删除文件夹及其子文件，您是否确认删除？' : '确认删除文件“' + cur_name + '”？';
        if($(_this).data('item').parents('.lifileResoure.lifile.team').length) {
            var leaderid=getUidByPath($(_this).data('item').parents('.lifileResoure.lifile.team').attr('data-url'));
        }
        var f1 = function () {
            var para = {
                file: [$(_this).data('filePath')],
                leaderid:leaderid?leaderid:''
            };
            $.ajax({
                url: '/api/delResourceFile',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(para),
                cache: false,
                processData: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if(data.code==500||data.code=='500') {
                        return newAlert((data.msg||data.message||'删除失败'), 'error', null, null, 'false');
                    }
                    if (data.code == "200") {
                        swal_close();
                        if($(_this).data('isDirectory') == 1) {
                            var delDom='*[data-url="'+$(_this).data('item').parents('li').first().children().first().attr('data-url')+'"][class="'+$(_this).data('item').parents('li').first().children().first().prop('class')+'"][isdirectory="'+$(_this).data('item').parents('li').first().children().first().attr('isdirectory')+'"][trash-state="'+$(_this).data('item').parents('li').first().children().first().attr('trash-state')+'"]';
                            $(_this).data('item').parents('li').first().remove();
                            $(delDom).parents('li').first().remove();
                            newAlert('删除成功！', 'success', null, null, 'false');
                        } else {
                            var delDom='*[data-url="'+$(_this).data('item').parents('li').first().attr('data-url')+'"][class="'+$(_this).data('item').parents('li').first().prop('class')+'"][isdirectory="'+$(_this).data('item').parents('li').first().attr('isdirectory')+'"][trash-state="'+$(_this).data('item').parents('li').first().attr('trash-state')+'"]';
                            $(_this).data('item').parents('li').first().remove();
                            $(delDom).remove();
                            newAlert('删除成功！', 'success', null, null, 'false');
                        }                                         
                        reloadTrash()
                    }
                }
            });
        }
    }
    newConfirm(msg, ['确认', '取消'], [f1, f2]);
}

// 下载资源
function downloadResource(event){
    // <form action="/api/downloadResource" method="post"><input type="text" name="type" value="2"/><input type="text" name="fileName" value="/4opa2203221/33"/></form>
    let fileName = $(event).data('item').parent().attr('data-url');
    if(fileName.indexOf('file') != -1){
        fileName = '/'+fileName.split("/").slice(fileName.split("/").indexOf('file')+1).join("/");
    }
    let fileNameStr = '“' + fileName.substring(fileName.lastIndexOf('/')+1) + '”';
    let url = '/api/downloadResource';
    let fileForm = `<form action="`+url+`" method="post">` +  // action请求路径及推送方法
                `<input type="text" name="type" value="`+2+`"/>` + // 文件类型
                `<input type="text" name="fileName" value="/`+ fileName +`"/>`;
    fileForm += `</form>`;
    let f1=function(){
        $(fileForm).appendTo('body').submit().remove();
        f2();
    };
    let f2=function(){
        swal_close();
    };
    newConfirm('是否下载资源' + fileNameStr+'？',['下载','取消'],[f1,f2],true);
}

// 查看文件属性
function properties(event){
    let fileName = $(event).data('item').parent().attr('data-url');
    fileName = '/'+fileName.split("/").slice(fileName.split("/").indexOf('file')+1).join("/");
    // fileNameStr =  fileName.split('.',fileName.length,'')
    let data = {
        dir:fileName
    }
    
    $.ajax({
        url: '/api/getSampleInfoList',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data.code == "200") {
                const isDirectory = data.fileAllMenu[0].isDirectory;
                const fileTime = data.fileAllMenu[0].time;
                const foleSize = data.fileAllMenu[0].size;

                let type = isDirectory==1?'文件夹':isDirectory==2?'图片':isDirectory==3?'文本':isDirectory==4?'项目文件夹':'未知类型'
                let size = (foleSize/1024/1024).toFixed(0)>0?(foleSize/1024/1024).toFixed(2)+'MB':(foleSize/1024).toFixed(2)+'KB';
                let time = (fileTime ? !fileTime || fileTime == '' ? '' : new Date(fileTime).Format('yyyy-MM-dd hh:mm:ss'): '');
                
                let alertContent = 
                `
                    <div>
                        <ul>
                            <li style = "margin-top: 16px;"><span>类型</span><span style = "margin-left: 45px;">${type}</span></li>
                            <li style = "margin-top: 16px;"><span>名称</span><span style = "margin-left: 45px;">${data.fileAllMenu[0].name}</span></li>
                            <li style = "margin-top: 16px;"><span>大小</span><span style = "margin-left: 45px;">${size}</span></li>
                            <li style = "margin-top: 16px;"><span>修改时间</span><span style = "margin-left: 17px;">${time}</span></li>
                        </ul>
                    </div>
                `
                let typeName = '文件属性'
                if(type == '文本'){
                    typeName = '文件属性'
                }else{
                    typeName = '文件夹属性'
                }
                newAlert(alertContent,'success',typeName,'','','','attribute');
            }
        }
    });
}

// 项目私有状态切换
function tabIspen(item, e) {
    var e = e || window.event;
    e.stopPropagation();
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    if( $(item).data("team") ){
        newAlert("协作项目不可设为公开！", "warning")
        return;
    }
    $('.setOpen').hide();
    // if($('#list1').find('.sel').length) {
    //     $('#list1').find('.sel').removeClass('sel');
    // }
    var f1 = function () {
        _setIsOpen($(item));
        // f2();
    };
    var f2 = function () {
        swal_close();
    };
    if (Number($(item).data('isOpen'))) {
        f1();
    } else {
        newConfirm('您希望把项目设为“公开列表”吗？设置公开项目后，原私有项目共享链接将失效。', ['确定', '取消'], [f1, f2]);
    }
}

function _setIsOpen(_this) {
    var file = $(_this).data('name');
    var filepath = $(_this).data('url');
    var beforeIsOpen = $(_this).data('isOpen');
    var isOpen = beforeIsOpen == "1" ? 0 : 1;
    if(isOpen == 0){
        var flag=false;
        $.ajax({
            url: '/api/User_info',
            type: 'get',
            async:false,
            success: function (data) {       
                if(data.permission == "free"){
                    var arr=0;
                    var arr1=0;
                    arr=$('.pdtList>li[isopen=0]').length+$('.proList>li[isopen=0]').length;
                    arr1=$('.pdtList>li.team[isopen=0] .icon-xiezuo').length;
                    if((arr-arr1)>60){
                        newAlert('免费用户最多保存60个私有项目', 'warning'); 
                        flag=false;     
                    }else{
                        flag=true;  
                    }
                }else{
                    flag=true;
                }
            }
        })
        if(flag!=true){
            return;
        }
    }
    var li = $("#list1 .lifileResoure.lifile[data-name='" + file + "']");
    $.ajax({
        type: 'get',
        url: '/api/setOpen?file=' + file + '&filepath=' + encodeURIComponent(filepath) + '&isOpen=' + isOpen + '&beforeIsOpen=' + beforeIsOpen,
        dataType: 'json',
        success: function (data) {
            if (data) {
                // newAlert('修改成功！', 'success');
                $(li).attr('isOpen', isOpen);
                if ($('#bfilen').is(':visible') && $('#bfilen').data('nameBefore') == $(li).attr('data-name')) {
                    $('#bfilen').data('isOpen', isOpen)
                }
                if (isOpen) {
                    $(li).find('i.siyou').remove();
                } else {
                    var sisuo = `<i title="私有项目" class="iconfont icon-suo siyou"></i>`;
                    $(li).children('span').after(sisuo);
                }
            }
        }
    })
    swal_close();
}
// 标记主文件
function tip_main(elem) {
    $('#list1 .pro_main.main_file').removeClass('main_file');
    if (elem) $(elem).addClass('main_file')
    // 暂时把图片弹框隐藏
    $('.editor_img').hide()
}
// 地址判断
function getUrl(url) {
    var regUrl = /(http|ftp|https||www):\/\/[\w\-_]+([\w\-_]+)+([\w\-,@?^=%&:/~#]*[\w\-?^=%&/~#])?/;
    if (!regUrl.test(url)) {
        if (url.split('./examples/js').length > 1) {
            url = path + '/guide/' + url.replace('./examples/', 'examples/');
        } else if(url.split('./official/js').length > 1){
            url = path + '/guide/' + url.replace('./official/', 'official/');
        }else {
            url = path + url.replace('..', '').replace('/./uploads', '/uploads');
        }
    }
    var r = (Math.random().toLocaleString())*1000;
    if(url&&url.indexOf('./uploads/wechat')==0) url=url.replace('.','');
    if(url&&url.indexOf('../uploads/wechat')==0) url=url.replace('.','');
    if(url.indexOf('https://www.thingjs.com./')==0) url=url.replace('https://www.thingjs.com./','https://www.thingjs.com/');
    if(url.indexOf('http://www.thingjs.com./')==0) url=url.replace('http://www.thingjs.com./','http://www.thingjs.com/');
    return url.indexOf('?n=')!=-1?url:url + '?n=' + r;
}

function initCursor() {
    $('.setting2 li.filen.filen-active').removeAttr('curPos');
}
// 保存光标位置及滚动位置
function saveCursorPosition() {
    var elem = $('.setting2 li.filen-active');
    var curPos = {
        column: monacoEditor.getPosition().column,
        lineNumber: monacoEditor.getPosition().lineNumber,
        top: monacoEditor.getScrollTop(),
        left: monacoEditor.getScrollLeft(),
    };
    $(elem).attr('curPos', JSON.stringify(curPos));
}
// 设置光标位置及滚动位置
function setCursorPosition() {
    var elem = $('.setting2 li.filen-active');
    var curPos = {
        column: $(elem).attr('curPos') ?
            JSON.parse($(elem).attr('curPos')).column : monacoEditor.getVisibleRanges()[0].endLineNumber < 33 ?
            1 : 1,
        lineNumber: $(elem).attr('curPos') ?
            JSON.parse($(elem).attr('curPos')).lineNumber : monacoEditor.getVisibleRanges()[0].endLineNumber < 33 ?
            monacoEditor.getVisibleRanges()[0].endLineNumber : 1,
        top: $(elem).attr('curPos') ? JSON.parse($(elem).attr('curPos')).top : 0,
        left: $(elem).attr('curPos') ? JSON.parse($(elem).attr('curPos')).left : 0,
    };
    monacoEditor.setPosition({
        column: curPos.column,
        lineNumber: curPos.lineNumber
    });
    monacoEditor.setScrollLeft(curPos.left);
    monacoEditor.setScrollTop(curPos.top);
    monacoEditor.focus();
}
// 充值
function recharge() {
    var index = layer.open({
        type: 2,
        move: false,
        title: false,
        closeBtn: 0,
        scrollbar: false,
        area: ['535px', '416px'],
        resize: false,
        content: ['https://www.thingjs.com/static/payment/createPay/payRecharge.html?userId=' + $.cookie('mmdId'), 'no'],
        skin: 'buyRecharge',
        success:function(){
            document.getElementsByClassName('buyRecharge')[0].querySelector('.layui-layer-content').children[0].contentWindow.postMessage({paySource:location.href}, '*');
        }
    });
    window.addEventListener('message', function (event) {
        if(event.data&&event.data.type&&event.data.type=="newStyle") {
            $(".buyRecharge").css({'border-radius':'8px','backgroundColor':'rgba(0,0,0,0)'});
            $(".buyRecharge iframe").css({'border-radius':'8px','backgroundColor':'rgba(0,0,0,0)'});
        }
        if (event.data == 'closeRecharge') {
            layer.close(index);
        }
    });
}

function lifile_time(time) {
    var dateNow = new Date();
    var dateTime = new Date(time);
    var timeLiVis = dateTime.Format('M/d');
    if (dateTime.getDate() == dateNow.getDate() && dateTime.getMonth() == dateNow.getMonth() && dateTime.getFullYear() == dateNow.getFullYear()) {
        timeLiVis = dateTime.Format('hh:mm');
        // timeLiColor = "#ccc";
    } else if (dateTime.getFullYear() != dateNow.getFullYear()) {
        timeLiVis = dateTime.Format('yy/M/d')
    }
    return `<label class="file_time" title="` + dateTime.Format('yyyy-MM-dd hh:mm:ss') + `">` + timeLiVis + `</label>`;
}

function get_name(elem) {
    if ($(elem).parents('.setting2').length) {
        return $(elem).parents('li').attr('data-name');
    }
    if($(elem).find(".headImg").length){        
        return $(elem).find(".pro_name").text();
    }
    return $(elem).children().length ? $(elem).children().first().text() : $(elem).text();
}

function setScrollLeft(item) {
    $('.setting2').scrollLeft(item ? $(item)[0].offsetLeft - 30 : $('.setting2 li').last()[0].offsetLeft)
}

function getNowFormatDatepay(endTime, next,day) {
    var date;
    var _index = endTime.indexOf("1970");
    if (endTime && _index != 0) {
        date = new Date(endTime);
    } else {
        date = new Date();
    }
    if(next > 1){
        date.toLocaleString(date.setMonth(date.getMonth() + next));
    }else{
        date.toLocaleString(date.setFullYear(date.getFullYear() + next));
    }
    
    date.setDate(date.getDate()+(day||0));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var currentdate = year + '年' + month + '月' + strDate + '日';
    return currentdate;
}

function nextActive(el, arr, type) {
    if ($(el).next('li').length && type == 'next') {
        var next = $(el).next('li');
        if (arr.indexOf($(next).attr('data-url')) == -1) {
            return next;
        } else {
            nextActive(next, arr, 'next');
        }
    } else if ($(el).prev('li').length && type == 'prev') {
        var prev = $(el).prev('li');
        if (arr.indexOf($(prev).attr('data-url')) == -1) {
            return prev;
        } else {
            nextActive(prev, arr, 'prev');
        }
    } else {
        return $('.setting2 li.filen');
    }
}

function enableCharts() {
    if (getCookie("role") == 'developer') {
        $(".import-charts").show();
    }
}
enableCharts();

function showRecoveryMenu(_this, e) {
    // var _target = $(_this).children('._name').length ? $(_this).children('._name')[0] : $(_this).children('._dirname')[0];
    // if ($(_target).parent("p").length) {
    //     _this = $(_target).parent("p");
    // } else {
    //     _this = $(_target);
    // }
    //$('#list1 .sel').removeClass('sel');
    // $(_target).parent().addClass('sel');
    var durl = $(_this).attr("data-url");
    if(durl == null || durl == undefined){
        console.log("找不到文件");
        return;
    }
    durl = durl.split('/');
    var dtitle = $(_this).attr("data-title");
    var fid = '';
    var status = 0;
    if(dtitle != undefined && dtitle != null){
        fid = durl[durl.length - 1];
        status = 1;
    }else if($(_this).parent().hasClass('myTrash')){
        fid = durl[durl.length - 1];
        status = 1;
    }else{
        for(var i = 0, j = durl.length; i < j; i++){
            if(durl[i] == '垃圾箱'){
                fid = durl[i + 1];
                status = 0;
                break;
            }
        }
    }
    var tstate;
    var cName;
    var pName = '';
    if(status == 1){
        tstate = $(_this).attr("trash-state");
        cName = $(_this).attr("title");
    }else if(status == 0){
        var jqdom = $('.trash').find("p[data-url='垃圾箱/" + fid + "']")
        tstate = jqdom.attr("trash-state");
        if(tstate == "2"){
            cName = jqdom.attr("title");
        }else{
            cName = $(_this).attr("title");
            pName = jqdom.attr("title");
        }
    }
    if(fid != ''){
        $('.trashRecovery').find(".recovery-item").attr({
            "data-fid": fid,
            "data-status": status,
            "trash-state": tstate,
            "title-name": cName,
            'pro-title': pName
        });
        e.preventDefault();
        e.stopPropagation();
        var top = e.pageY;
        if (top + $('.trashRecovery').height() > $('html').height()) top = top - $('.trashRecovery').height();
        var left = e.pageX;
        hideContextMenu('.trashRecovery');
        $('.trashRecovery').css({
            top: top + 'px',
            left: left + 'px'
        }).show();
    }
}
//恢復垃圾箱的文件
function recoveryFile(ele) {
    $(".trashRecovery").hide();
    var dstatus = $(ele).attr("data-status");
    var traState = $(ele).attr("trash-state");
    var msg;
    if(traState == 2){
        if(dstatus == 0){
            msg = "恢复当前文件将会恢复该文件所属项目，您确定要恢复当前文件吗？"
        }else{
            msg = "您确定要恢复当前项目吗？"
        }
    }else{
        msg = "您确认要恢复当前文件吗？"
    }
    
    var f2 = function () {
        swal_close();
    }
    var f1 = function () {
        var dfid = $(ele).attr("data-fid");
        var titleName = $(ele).attr("title-name");
        // 恢复项目
        if(traState == 2){
            var data = {
                "fid": dfid
            };
            $.ajax({
                url: '/api/files?find=' + titleName+'&type=recovery',
                type: 'get',
                dataType: 'json',
                async: false,
                success: function (result) {
                    if(result && result.fileAllMenu.length){
                        newAlert("项目已存在，无法恢复！", "warning")
                    }else{
                        $.ajax({
                            url: "/api/recoveryProject",
                            data: JSON.stringify(data),
                            type: "Post",
                            dataType: "json",
                            cache: false,
                            processData: false, //用于对data参数进行序列化处理 这里必须false
                            contentType: false, //必须
                            success: function (result1) {
                                if(result1 && result1.code == 200){
                                    newAlert('项目“' + result1.data.fname + '”已成功恢复，请刷新页面！', 'success');
                                    addScreenLog('项目“' + result1.data.fname + '”已成功恢复，请刷新页面！');
                                    if($(".trash ").find("p[data-title='" + dfid + "']").length) {
                                        $(".trash ").find("p[data-title='" + dfid + "']").parent("li").remove();
                                    }
                                    initTrashNum();
                                    var chartId = result1.data.chartId;
                                    if(chartId != null && chartId != ''){
                                        var reData = {
                                            "id": chartId,
                                            "name": titleName + '.js'
                                        };
                                        var token = window.localStorage.getItem("token");
                                        $.ajax({
                                            url: path+'/udatav/renameById',
                                            type: 'post',
                                            headers: {
                                                "token": token
                                            },
                                            data: JSON.stringify(reData),
                                            contentType: "application/json;charset=utf-8", //必须有 
                                            success: function (result2) {
                                            }
                                        })
                                    }
                                }else if(result1 && result1.code && result1.code == 500){
                                    newAlert("项目资源空间不足，项目恢复失败！", "warning");
                                }else{
                                    newAlert('项目“' + titleName + '”恢复失败！', 'warning');
                                }
                            },
                            error: function(err){
                                console.log(err);
                                newAlert('项目“' + titleName + '”恢复失败！', 'warning');
                            }
                        });
                    }
                }
            });
        }else if(traState == 0 || traState == 1){
            var proTitleName = $(ele).attr("pro-title");
            var data = {
                "fid": dfid,
                "titleName": titleName,
                "proTitleName": proTitleName
            };
            $.ajax({
                url: "/api/recoveryFile",
                data: JSON.stringify(data),
                type: "Post",
                dataType: "json",
                cache: false,
                processData: false, //用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须
                success: function (result) {
                    if (result.code == 200) {
                        if(result.data){
                            var finame = result.data.fileName;
                            var liFile = $(".trash").find("li[title='" + titleName + "'][data-name='" + finame + "']");
                            if (liFile.length) {
                                liFile.remove();
                            }else{
                                var dirP = $(".trash").find("p[data-title='" + dfid + "']");
                                if(dirP.length) {
                                    var dirChild = $(dirP[0]).parent("li").find("p[title='" + titleName + "']");
                                    if(dirChild.length){
                                        dirChild.parent("li").remove();
                                    }
                                }
                            }
                            var pname = result.data.pname;
                            if ($("li[data-name='" + pname + "']").length) {
                                $("li[data-name='" + pname + "']").find(".dirList").remove();
                                var ele = $("li[data-name='" + pname + "']").find(".iconfont");
                                if (ele.hasClass("active")) {
                                    ele.removeClass("active");
                                    openProject(ele);
                                    var arr=result.data.spath.split('/uploads/wechat/' + getCookie("openid")+'/file/').pop();
                                    var newArr=arr.split('/');
                                    newArr.pop();
                                    newAlert('文件“' + result.data.fname + '”已成功恢复至项目“' + pname + '”下', 'success');
                                    addScreenLog('文件“' + result.data.fname + '”已成功恢复至项目“' + pname + '”下，路径为：“' + result.data.relPath + '”');
                                    openFile(newArr.join('/'),result.data.fname);
                                }else{
                                    newAlert('文件“' + result.data.fname + '”已成功恢复至项目“' + pname + '”下', 'success');
                                    addScreenLog('文件“' + result.data.fname + '”已成功恢复至项目“' + pname + '”下，路径为：“' + result.data.relPath + '”');
                                }
                            }
                        }
                        initTrashNum();
                    }else if(result.code == 201){
                        newAlert("目标文件已存在，无法恢复！", "warning");
                        addScreenLog('目标文件已存在，无法恢复！路径为：“' + titleName + '”。');
                    }else if(result.code == 211){
                        newAlert("文件所属原项目“" + result.data.pname + "”已删除，请先恢复项目“" + result.data.pname + "”！", "warning");
                        addScreenLog('文件所属原项目“' + result.data.pname + '”已删除，请先恢复项目“' + result.data.pname + '”。');
                    }else if(result.code == 202){
                        if(result.data){
                            newAlert("文件所属原项目“" + result.data.pname + "”已删除，请先恢复项目“" + result.data.pname + "”！", "warning");
                            addScreenLog('文件所属原项目“' + result.data.pname + '”已删除，请先恢复项目“' + result.data.pname + '”。');
                        }
                    }else if(result.code == 500){
                        newAlert("项目资源空间不足，文件恢复失败！", "warning");
                    }
                },
                error: function(err){
                    console.log(err);
                    newAlert("文件恢复失败！", "warning");
                    addScreenLog('文件恢复失败！');
                }
            });
        }
    }
    newConfirm(msg, ['确认', '取消'], [f1, f2]);
}

// 在线开发控制台打印输出内容
function addScreenLog(msg){
    var ele = '';
    var ce = $('.screen .screenContent').children();
    if(ce.length % 2 == 0){
        ele += '<div class="screen" style="line-height: 17px; min-height: 17px; padding: 0px 5px 0px 17px; word-break: break-all; color: lightgreen;"> ' + msg + '</div>'
    }else{
        ele += '<div class="screen" style="line-height: 17px; min-height: 17px; padding: 0px 5px 0px 17px; word-break: break-all; background: rgba(255, 255, 255, 0.1); color: lightgreen;"> ' + msg + '</div>';
    }
    $('.screen .screenContent').append($(ele));
    $('.screen .screenContent').scrollTop($('.screen .screenContent')[0].scrollHeight);
}

function openProject(ele) {
    clickIconFile(ele);
    hideContextMenu();
    $('#list1 .sel').removeClass('sel');
    $('.rename_file_input').remove();
}

// 删除项目
function delPro(el, e) {
    var e = e || window.event;
    e.stopPropagation();
    $('.setOpen').hide();
    if($(el).data('li')&&($($(el).data('li')).hasClass('team')||$($(el).data('li')).hasClass('teamleader'))) {
        newAlert('协作项目不可删除！', 'error');
        return;
    }
    if ($(el).data('isPro')) {
        newAlert('已在线部署项目不可删除！', 'error');
        return;
    }
    _delPro(el);
}

function _delPro(el) {
    var name = $(el).data('nameBefore');
    var isActive = $($(el).data('li')).hasClass('active') || $($(el).data('li')).children('.dirList').find('li.lifile.active').length;
    if (isActive) {
        var activeArr = [];
        if ($($(el).data('li')).hasClass('active')) {
            if ($(".setting2 li.filen-close[data-path='" + ($($(el).data('li')).attr('data-name') + '/' + $($(el).data('li')).attr('data-name') + '.js') + "']").length) activeArr.push($(".setting2 li.filen-close[data-path='" + ($($(el).data('li')).attr('data-name') + '/' + $($(el).data('li')).attr('data-name') + '.js') + "']")[0]);
        }
        if ($($(el).data('li')).children('.dirList').find('li.lifile.active').length) {
            $($(el).data('li')).children('.dirList').find('li.lifile.active').each(function (i) {
                if ($(".setting2 li.filen-close[data-realpath='" + $(this).attr('data-url') + "']").length) activeArr.push($(".setting2 li.filen-close[data-realpath='" + $(this).attr('data-url') + "']")[0]);
            })
        }
    }
    var f1 = function () {
        let para = {
            file: ['/' + name],
            projectName: name + '.js',
            status: 2,
            leaderid:getLeaderid()
        };
        $.ajax({
            url: '/api/delResourceFile',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(para),
            cache: false,
            processData: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                swal_close();
                if(data.code==500||data.code=='500') {
                    return newAlert((data.msg||data.message||'删除失败'), 'error', null, null, 'false');
                }
                // newAlert('删除成功！', 'success', null, null, 'false');
                var delOrder=myfilename.fileName.indexOf(name);
                myfilename.fileName.splice(delOrder, 1);
                myfilename.pdtlist.splice(myfilename.pdtlist.indexOf(myfilename.pdtlist.find(function(v,i){ return i ==delOrder; })), 1);
                if (isActive) {
                    if (activeArr.length) {
                        var nextLi;
                        for (var j = 0; j < activeArr.length; j++) {
                            nextLi = nextActive(activeArr[j], activeArr, 'next');
                            if (nextLi) break;
                        }
                        var li = $(".setting2").find(nextLi).length ? nextLi : $('.setting2 li.filen');
                        if (!$(li).hasClass('filen-active')) {
                            $(li).trigger('click');
                        }
                        activeArr.forEach((v) => {
                            $(v).remove();
                        });
                    }
                }
                $(el).data('li').remove();
                reloadTrash();
                $('#list1 .list1_2 .pdtLi .pdtTitle ._num').html('(' + (myfilename.pdtlist.length) +')');
                $('#tab_mylist span').html('(' + (myfilename.pdtlist.length +  myfilename.prolist.length) + ')');
                resourceSize();
            },
            error: function (result) {
                console.log(result);
                newAlert('删除失败！', 'error');
            }
        })
    };
    var f2 = function () {
        swal_close();
        $('.setOpen .item.del-item').data({
            li: null,
            nameBefore: null,
            url: null,
            isOpen: null,
            isPro: null,
            time: null,
            capture: null,
            version: null
        });
    };
    newConfirm(isActive ? '项目“' + name + '”下的页面资源已被打开，您是否确认删除该项目（删除项目将一同删除该项目下的页面资源）？' : '您是否确认删除项目“' + name + '”（删除项目将一同删除该项目下的页面资源）？', ['确认', '取消'], [f1, swal_close]);
}

function hideContextMenu(name) {
    $('.setOpen,.newPro,.rename,.bim,.openchart,.trashRecovery,.openmap,.opennew').not(name).hide();
}

//刷新cht文件
$('#list1').on('click', 'li.curLi .curTitle .icon-shuaxin', function (e, type) {
    var event = e || window.event;
    event.stopPropagation();
    $('li.curLi .curTitle .icon-shuaxin').addClass('gira');
    $('li.curLi .curTitle .icon-shuaxin').addClass('gira');
    $('li.curLi .curTitle .icon-shuaxin').addClass('gira');
    setTimeout(() => {
        $('li.curLi .curTitle .icon-shuaxin').removeClass('gira');
    }, 1000);
    refreshSpecFile(event);
})
async function refreshSpecFile(e) {
    var ele = $('.curList').find('.lifile .icon-file');
    //判断cht、map文件是否已经存在
    var name = ele.siblings("._name").text();
    var chtL = $('#list1 .curList .lifile[data-name$=".cht"]');
    var mapL = $('#list1 .curList .lifile[data-name$=".map"]');
    var teamLeaderId = getLeaderid();
    $.ajax({
        url: '/api/files?find=' + name +'&leaderid='+teamLeaderId,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            var fileData = data.fileAllMenu;
            if (fileData.length > 0) {
                var file = fileData.find((element) => (element.name.length == name.length));
                if(teamLeaderId) {
                    // 刷新当前打开的协作项目
                    getTeamOccupyFile(false);
                }
                if (file) {
                    var isExitedOpening=$('#list1 li.openning[data-name="' + name + '"]').length;
                    $('#list1 li[data-name="' + name + '"]').remove();
                    addLiFile(name, $('#bfilen').data('url'), $('#bfilen').data('version'), $('#bfilen').data('isOpen'), $('#bfilen').data('isPro'), 1, file.time,isExitedOpening,myfilename.quickdtData,'',myfilename.decorData);
                    if ($('#bfilen').is(':visible')) {
                        moveLiFile($('#list1 li.lifileResoure.lifile[data-name="' + $('#bfilen').data('nameBefore') + '"]'));
                    };
                }
            }
        }
    })
}
// 新建地图
function mapList() {
    // if ($('#bfilen').is(":visible")) {
    //     setPanelModel($(this), "#moveclose-dialog", "地图资源", "city", true);
    // } else {
    //     newAlert("请先保存文件！", 'warning');
    // }
    if($('#login').attr('data-log')=='-1'||getCookie("token")==null||getCookie("token")==''||getCookie("openid")==null||getCookie("openid")==''||getUserName('name')==null||getUserName('name')==''){
        loginwindowon();
        return false;
    }
    setPanelModel($('.setting1 .btn-city'), "#moveclose-dialog", "地图", "city", true);
}

//列表激活状态
$('.list').on('click', '.pro_main,.lifile,.pro_char,.item-li,.p-title,.newProduct', function (e,type) {
    var event = e || window.event;
    var _this = event.target;
    // if ($(_this).parents(".trash").length) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     return;
    // }
    // if ($(_this).hasClass('rename_file_input')) return;
    // if ($(_this).hasClass('pro_name')) {
    //     event.stopPropagation();
    // }
    if($(_this).hasClass('trash')||$(_this).parent().hasClass('trash')||$(_this).parent().hasClass('_name')){
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    if($(_this).hasClass('blingbling')||$(_this).parent().hasClass('blingbling')){
        removeBling(true);
    }
    $('.list .lifileAct').removeClass('lifileAct');
    $('.list .lifileActNow').removeClass('lifileActNow');
    if($(_this).hasClass('lifile') || $(_this).hasClass('pro_main') || $(_this).hasClass('dirLiTitle') 
        || $(_this).hasClass('item-li') || $(_this).hasClass('newProduct')){
        $(_this).addClass('lifileAct');
    }else if($(_this).hasClass('dirLi')){
        $(_this).children('.dirLiTitle').addClass('lifileAct');
    }else if($(_this).hasClass('pro_name')){
        $(_this).parent('.pro_main').addClass('lifileAct');
    }else if($(_this).hasClass('_dirname')){
        $(_this).parent('.dirLiTitle').addClass('lifileAct');
    }else{
        $(_this).parent('li.lifile').addClass('lifileAct');
    }
    if(type=='f'){
        event.preventDefault();
    }
    
    event.stopPropagation();
    hideContextMenu();
})

function setActiveState(){
    $('.list .lifileAct').removeClass('lifileAct');
    $('.list .lifileActNow').removeClass('lifileActNow');
    if($('.setting2 .filen-active') && $('.setting2 .filen-active').is(':visible')){
        if($('.setting2 .filen-active').hasClass('filen')){
            $('.pro_main.main_file').addClass('lifileActNow');
        }else if($('.setting2 .filen-active').attr('data-path')
            && $('.setting2 .filen-active').attr('data-path').indexOf('官方')==0){
            var liActiveNow = $('.setting2 .filen-active').attr('data-realpath');
            liActiveNow = liActiveNow.substring(liActiveNow.lastIndexOf('/')+1,liActiveNow.lastIndexOf('.js'));
            $('.list .item-li[id="' + liActiveNow + '"]').addClass('lifileActNow');
        }else{
            var liActiveNow = $('.setting2 .filen-active').attr('data-url');
            if(liActiveNow.indexOf('/file/')<0){
                liActiveNow = liActiveNow.substring(liActiveNow.lastIndexOf('/')+1);
            }
            if($('.list .lifile[data-url="'+ liActiveNow +'"]').length>0){
                $('.list .lifile[data-url="'+ liActiveNow +'"]').addClass('lifileActNow');
            }else{
                $('.list .pro_main[data-url="'+ liActiveNow +'"]').addClass('lifileActNow');
            }
        }
    }else{
        $('#list0 .item-li.active').addClass('lifileActNow');
    }
}
//空白区域右键菜单
$('#list1').on('contextmenu',function(e){
    var event = e || window.event;
    var _this = event.target;
    if($('.add_file_li').length) $('.add_file_li').remove();
    hideAltMenu();
    if ($(_this).parent(".content-nav").length==0) {
        // e.preventDefault();
        // e.stopPropagation();
        return;
    }
    e.preventDefault();
    e.stopPropagation();

    var left = e.pageX;
    var top = e.pageY;
    if (top + $('.opennew').height() > $('html').height()) top = top - $('.opennew').height();
    $('.opennew').css({
        top: top + 'px',
        left: left + 'px'
    }).show();
    hideContextMenu('.opennew');
})
//右键菜单-新建文件
function newOneFile(){  
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    if(!isLogin('enter','newOneFile')) return;      
    if(!($('.setting2 li #bfilen').is(':visible'))) {
        newAlert('项目未打开，不可新建文件！','warning')
        return;
    } else {
        var lifileEle=$("#list1 li.lifileResoure.lifile[data-name='"+$('.setting2 li #bfilen').data('nameBefore')+"']");
    }
    if (!$('.filen-active .filen-edit').is(':hidden')) {
        newAlert('请先保存文件','warning');
            return;
    }
    if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
        newAlert('新建项目尚未保存','warning');
        return;
    }
    tab_change(1);
    // var lifileEle;
    // if($("#list1>.lifile.active").length){//判断是否有项目打开
    //     lifileEle = $("#list1>.lifile.active");
    // }else if($("#list1>.lifile").length){//项目未打开
    //     lifileEle = $("#list1>.lifile").eq(0);
    // }
    if(lifileEle.length){
        newOneFileInput(lifileEle);
    }
}
function newOneFileInput(lifileEle){
    if(lifileEle.find(".iconfont.icon-file.active").length){//判断项目资源是否打开
        // var dirEle = lifileEle.find(".dirList").eq(0);
        // newFileInput(dirEle);
    }else{//项目打开，资源文件未打开
        iconEle = lifileEle.find(".iconfont.icon-file");
        if(iconEle.length){//存在资源文件
            clickIconFile(iconEle);
        }
    }
    var dirEle = lifileEle.find(".dirList").eq(0);
    if(!getlifileActParent()) return newFileInput(dirEle,lifileEle);
    return newFileTo(getlifileActParent());
}

//右键菜单-上传文件
function openUploadPageFile(){
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    if(!($('.setting2 li #bfilen').is(':visible'))) {
        $.ajax({
            url:'/api/sample/getIsRoleFileUploadType',
            type:'get',
            async:false,
            success:function(res) {
                if(res.code == 500){
                    newAlert('项目未打开，不可上传文件！','warning')
                    return;
                }
            },error:function(err) {
                console.log(err);
            }
        })
    } else {
        var lifileEle=$("#list1 li.lifileResoure.lifile[data-name='"+$('.setting2 li #bfilen').data('nameBefore')+"']");
        var dom=getlifileActParent();
    }
    if (!$('.filen-active .filen-edit').is(':hidden')) {
        newAlert('请先保存文件','warning');
            return;
    }
    if(!($('.setting2 li #bfilen').is(':visible'))) {
        newAlert('项目未打开，不可上传文件！','warning');
        return;
    }
    if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
        newAlert('新建项目尚未保存','warning');
        return;
    }
    tab_change(1);
    if(lifileEle.length>0){
        if(dom) {
            uploadFileTo(dom,'file');
        } else {
            $(lifileEle.find('.upload_file')).trigger('click','1')
        }
    }
}
// 右键菜单-新建目录
function newDirectory(dom){
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    if($('.add_file_li').length) $('.add_file_li').remove();
    if(!($('.setting2 li #bfilen').is(':visible'))) {
        newAlert('项目未打开，不可新建目录！','warning');
        return;
    }
    if (!$('.filen-active .filen-edit').is(':hidden')) {
        newAlert('请先保存文件','warning');
            return;
    }
    if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
        newAlert('新建项目尚未保存','warning');
        return;
    }
    else if (dom||getlifileActParent()) {
        var dom=dom||getlifileActParent();
        if($(dom).attr('data-url')){
            var pathUrl=$(dom).attr('data-url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
            var parentTitle=dom;
        } else if($(dom).hasClass('dirLi')) {
            var pathUrl=$(dom).children('.dirLiTitle').attr('data-url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
            var parentTitle=$(dom).children('.dirLiTitle');
        } else if($(dom).parent().children('.use-item').length) {    
            var pathUrl=$(dom).parent().children('.use-item').data('url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
            var parentTitle=$('.curList .dirLi .dirLiTitle[data-url="'+$(dom).parent().children('.use-item').data('url')+'"]');
        }
        var width = 'calc('+(100-(11 + 8 * (pathUrl.split('/').length-1)))+'% - 15px)';        
        var parentDom=$(parentTitle).next('.dirList');
        
        var li = '<li class="add_file_li" style="margin-left:-4px"><i style="position: relative;left: 0;" class="icon iconfont newDirectoryicon"></i><input class="add_file_input add_directory_input" style="width:'+width+'" type="text" autofocus="autofocus"></li>';
        if(!$(parentTitle).hasClass('active')) {
            $(parentTitle).trigger('click');
        }
        $(parentDom).prepend($(li));
        $(".add_directory_input").focus();
        $(".add_directory_input").blur(function () {
            sureDirname("blur", this,parentDom,'newDir');
        });
        $(".add_directory_input").keyup(function (e) {
            var evt = window.event || e;
            if (evt.keyCode == 13) {
                sureDirname("keyup", this,parentDom,'newDir');
            }
        });
    } else {
        var lifileEle=$("#list1 li.lifileResoure.lifile[data-name='"+$('.setting2 li #bfilen').data('nameBefore')+"']");
        var li = '<li class="add_file_li" style="margin-left:-1px"><i class="icon iconfont newDirectoryicon"></i><input class="add_file_input add_directory_input" type="text" autofocus="autofocus"></li>';
        $(lifileEle).find('.pro_main').after($(li));
        $(".add_directory_input").focus();
        $(".add_directory_input").blur(function () {
            sureDirname("blur", this,lifileEle,'newDir');
        });
        $(".add_directory_input").keyup(function (e) {
            var evt = window.event || e;
            if (evt.keyCode == 13) {
                sureDirname("keyup", this,lifileEle,'newDir');
            }
        });
    }
}
// 确认文件夹名称
function sureDirname(type, self,parent,type) {
    if($(parent).hasClass('lifileResoure lifile')) {        
        var pathUrl=$('.setting2 li #bfilen').data('nameBefore');
    }
    if($(parent).hasClass('dirList')) {
        var pathUrl=$(parent).prev('.dirLiTitle').data('url');
    }
    var addDirName=$(self).val().trim();
    $.ajax({
        url:'/api/getResourceList?dir=/'+pathUrl,
        type:'get',
        async:false,
        success:function(res) {
            if(!addDirName.length) return $(".add_file_li").remove();
            if(type=='newDir') {                
                if(res.allLength) {                
                    for(var i=0;i<res.fileAllMenu.length;i++) {
                        if(res.fileAllMenu[i].isDirectory==1&&res.fileAllMenu[i].name==addDirName) {                        
                            newAlert("目录名称已存在！", 'error');
                            return;
                        }
                    }                
                }
                if(addDirName.indexOf('.')!=-1) return newAlert("目录名不允许带加后缀！", 'error');                
                return creatNewDir(addDirName,pathUrl,parent);
                } else if(type=='newFile') {
                    if(res.allLength) {                
                        for(var i=0;i<res.fileAllMenu.length;i++) {
                            if(res.fileAllMenu[i].isDirectory!=1&&res.fileAllMenu[i].name==addDirName) {                        
                                newAlert("文件已存在！", 'error');
                                return;
                            }
                        }                
                    }
                    var regArr = ['js', 'json', 'html', 'css'];
                    if ($(".add_file_input").val() && $(".add_file_input").val().indexOf('.') == -1) return newAlert("请输入扩展名！", 'error');
                    if ($(".add_file_input").val() && $(".add_file_input").val().indexOf('.') != -1) {
                        var houzhui = ($(".add_file_input").val().split('.')[$(".add_file_input").val().split('.').length - 1]).toLocaleLowerCase()
                        if (regArr.indexOf(houzhui) == -1) {
                            newAlert("此处仅允许新建js、css、html、json格式的文件！", 'error');
                            return;
                        }
                    }
                    var nameStr=$(".add_file_input").val();
                    if (nameStr&&nameStr.substr(0,nameStr.lastIndexOf('.')).length > 16) return newAlert("文件名称不能超过16个字符！", 'error');
                    newResourseFile('/'+pathUrl+'/',addDirName,parent,'newfileto');
                }
        },
        err:function(err) {
            console.log(err)
        }
    })
}
function getLeaderid(){
    var teamLeaderId = ""
    if($(".curList .team.active").length){
        teamLeaderId = getUidByPath($(".curList .team.active").attr("data-url"));
    } else if($(".curList .teamleader.active").length){
        teamLeaderId = getUidByPath($(".curList .teamleader.active").attr("data-url"));
    }
    return teamLeaderId;
}
// 创建文件夹
function creatNewDir(name,path,dom) {
    var teamLeaderId = getLeaderid();
    var createPath=encodeURIComponent('/'+path+'/'+name);
    $(".add_file_li").remove();
    $.ajax({
        url:'/api/creNewDir?dir='+createPath+"&leaderid="+teamLeaderId,
        type:'GET',
        async:false,
        success:function(res) {
            if(res.code==200) {
                // newAlert('目录创建成功！', 'success', null, null, 'false');
                $('#list1 li.curLi .iconfont.icon-shuaxin').trigger('click');
                openFile(path);
                return;
            }
            return newAlert(res.message+'！','error');
        },
        err:function(err) {
            console.log(err)
        }
    })
}
// function addLiDir(name,path,dom,time){
//     var percent = 11 + 8 * (path.replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"").split('/').length - 1);    
//     var maxWidth = 'calc(' + (100 - percent + '%') + ' - 65px)';
//     var li=$(`<li class="dirLi" style="text-indent: `+percent+`%">
//     <p trash-state="undefined" data-url="`+path+'/'+name+`" class="dirLiTitle" title="`+name+`" isdirectory="1">
//     <span class="_dirname" style="max-width: `+maxWidth+`;">`+name+`</span>`+lifile_time(time)+`
//     </p>
//     <ul class="dirList" style="display:none"></ul></li>`);
//     li.children('.dirLiTitle').on('click', function (e) {
//         var event = e || window.event;
//         if ($(event.target).hasClass('rename_file_input')) return;
//         if ($(this).hasClass('active')) {
//             $(this).removeClass('active');
//             li.children('.dirList').slideUp();
//         } else {
//             $(this).addClass('active');
//             li.children('.dirList').slideDown();
//         }
//     })
//     if($(dom).hasClass('lifileResoure lifile')) {
//         $(dom).find('.pro_main').after($(li));
//     }
// }

// 文件夹新建文件
function newFileTo(dom) {
    if($(dom).attr('data-url')){
        var pathUrl=$(dom).attr('data-url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
        var parentTitle=dom;
    } else if($(dom).hasClass('dirLi')) {
        var pathUrl=$(dom).children('.dirLiTitle').attr('data-url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
        var parentTitle=$(dom).children('.dirLiTitle');
    } else if($(dom).parent().children('.use-item').length) {
        var pathUrl=$(dom).parent().children('.use-item').data('url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
        var parentTitle=$('.curList .dirLi .dirLiTitle[data-url="'+$(dom).parent().children('.use-item').data('url')+'"]');
    }
    var width = 'calc('+(100-(11 + 8 * (pathUrl.split('/').length-1)))+'% - 15px)';    
    var parentDom=$(parentTitle).next('.dirList');
    var li = '<li class="add_file_li"><input class="add_file_input" style="margin-left:12px;width:'+width+'" type="text" autofocus="autofocus"></li>';
    if(!$(parentTitle).hasClass('active')) {
        $(parentTitle).trigger('click');
    }
    $(parentDom).prepend($(li));
    $(".add_file_input").focus();
    $(".add_file_input").blur(function () {
        sureDirname("blur", this,parentDom,'newFile');
    });
    $(".add_file_input").keyup(function (e) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            sureDirname("keyup", this,parentDom,'newFile');
        }
    });
}
// 文件夹上传文件/上传文件夹
function uploadFileTo(dom,type) {
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    if($(dom).attr('data-url')){
        var pathUrl=$(dom).attr('data-url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
    } else if($(dom).hasClass('dirLi')) {
        var pathUrl=$(dom).children('.dirLiTitle').attr('data-url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
    }  else if($(dom).parent().children('.use-item').data('url')) {
        var pathUrl=$(dom).parent().children('.use-item').data('url').replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
    }else{
        if(!($('.setting2 li #bfilen').is(':visible'))) {
            newAlert('项目未打开，不可上传文件夹！','warning')
            return;
        } else if (!$('.filen-active .filen-edit').is(':hidden')) {
            newAlert('请先保存文件','warning');
                return;
        }else if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
            newAlert('新建项目尚未保存','warning');
            return;
        } else {
            let resulturl = $('#bfilen').text();
            let result = resulturl.substring(0,resulturl.length-3);
            var pathUrl=result.replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
        }
    }
    let para = {
        filePath:'/'+pathUrl,
        refreshDir:function(){
            $('#list1 li.curLi .iconfont.icon-shuaxin').trigger('click');
            openFile(pathUrl);
        }
    }
    showUploadPanel(type,para);
}
// 获取选中文件路径
function getlifileActParent(){
    if($('.curList .lifileAct').length) {
        var lifileAct=$('.curList .lifileAct');
        var dom;
        if($(lifileAct).hasClass('lifileResoure')&&$(lifileAct).hasClass('lifile')) {
            dom=$(lifileAct);
        } else if($(lifileAct).hasClass('pro_main')&&$(lifileAct).hasClass('main_file')) {
            dom=$(lifileAct).parent().parent();
        } else if($(lifileAct).hasClass('lifile')&&$(lifileAct).parent().parent().hasClass('lifileResoure')&&$(lifileAct).parent().parent().hasClass('lifile')){
            dom=$(lifileAct).parent().parent();
        } else if($(lifileAct).hasClass('dirLiTitle')){
            dom=$(lifileAct);
        }else if($(lifileAct).parent().parent().hasClass('dirLi')){
            dom=$(lifileAct).parent().parent().children('.dirLiTitle').first();
        } else {
            dom=$(lifileAct);
        }
        if($(dom).hasClass('lifileResoure lifile')) return false;
        return dom;
    }
    return false;
}
// 展开项目对应文件
function openFile(path,name) {
    var path=decodeURIComponent(path).replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
    var arr=path.split('/');
    if(arr.length>1) {
        var url='';
        arr.forEach((v,index)=>{
            url=(url+'/'+v).replace(/^\/+|\/+$/g,"").replace(/^\s+|\s+$/g,"");
            $('.dirLiTitle[data-url="'+url+'"]').trigger('click');
        })
        // $('.lifileResoure.lifile.active .dirLiTitle[data-url="'+path+'"]').addClass('lifileAct');
        var dom=$('.lifileResoure.lifile.active .dirLiTitle[data-url="'+path+'"]').next('.dirList').first().children().first();
        var parentDom=$('.lifileResoure.lifile.active .dirLiTitle[data-url="'+path+'"]').next('.dirList').first();
    } else {
        // $('.lifileResoure.lifile.active[data-name="'+path+'"]').addClass('lifileAct');
        var dom=$('.lifileResoure.lifile.active[data-name="'+path+'"]').children('.dirList').first().children('.pro_main').next();
        var parentDom=$('.lifileResoure.lifile.active[data-name="'+path+'"]').children('.dirList').first();
    }
    if(name) {
        // 文件
        if(name.indexOf('.')!=-1) {
            var li=$(parentDom.find('li.lifile[title="'+name+'"]').first());
        } else {
            // 文件夹
            var li=$(parentDom.find('.dirLi p.dirLiTitle[title="'+name+'"]').first());
        }
        dom=li;
    }
    $(dom).hasClass('dirLi')?$(dom).children('.dirLiTitle').first().addClass('lifileAct'):$(dom).addClass('lifileAct');
}
function editShowScene() {
    var scenePath = "";
    if(!app) return;
    if (app.sceneURL) {
        if (app.sceneURL.indexOf('http://') != -1 || app.sceneURL.indexOf('https://') != -1) {
            scenePath = app.sceneURL;
            if(scenePath.indexOf('https://nova.uino.cn/model/tj')==0||scenePath.indexOf('http://nova.uino.cn/model/tj')==0) return newAlert("该场景为MAX插件上传的场景，森园区暂不支持编辑");
            // var url = location.protocol + '//www.thingjs.com/cb/?n=&s=' + scenePath;
            if(scenePath.indexOf('www.thingjs.com')!=-1) {
                scenePath='./'+scenePath.split('www.thingjs.com/').pop();
                CHECKSCENEPREVIEW.checkSceneByUrl({url:scenePath,name:scenePath.split('/').pop()}).then(res=>{
                    console.log(res);
                });
            } else {
                newAlert("森园区暂不支持编辑该场景");
            }
        } else if (app.sceneURL) {
            var sceneCode = app.sceneURL.split('/api/scene/').pop();
            CHECKSCENEPREVIEW.checkSceneByUrl(null,sceneCode).then(res=>{
                console.log(res);
            });
        } else {
            newAlert("没有检测到当前脚本加载的场景");
        }
    } else if (app.uEarth && app.uEarth._originUrl) {
        var encodePath = app.uEarth._originUrl;
        $.ajax({
            url: '/api/getMapUrl?encodePath=' + encodePath,
            typr: 'get',
            success: function (data) {
                if (data.state) {
                    var resource_id=data.url.split('/').pop().split('?id=').pop();
                    var url = 'https://city.thingjs.com/theme/' + resource_id;
                    window.open(url);
                } else {
                    newAlert(data.msg);
                }
            }, error: function (err) {
                newAlert("没有检测到当前脚本加载的场景");
            }
        })
    } else {
        newAlert("没有检测到当前脚本加载的场景");
    }
}
//新增toolbar功能
function clickTool(type,_this){
    if(!type) return;
    switch (type) {
        case 'btn-kjdm':
            setPanelModel($(_this), "#moveclose-dialog", "快捷代码", "code1", true);
            $('#moveclose-dialog').css({ "right": "0px"})
            break;
        case 'btn-mx':
            setPanelModel($(_this), "#moveclose-dialog", "模型", "model-library", true);
            break;
        case 'btn-yq':
            if (!getCookie('openid')) {
                loginwindowon();
                return;
            }
            setPanelModel($(_this), "#moveclose-dialog", "园区", "scenes", true);
            break;
        case 'btn-city':
            if (!getCookie('openid')) {
                loginwindowon();
                return;
            }
            setPanelModel($(_this), "#moveclose-dialog", "地图", "city", true)
            break;
        case 'btn-cb':
            newChart();
            break;
        case 'btn-jm':
            setPanelModel($(_this), "#moveclose-dialog", "界面", "ui-library", true);
            break;
        case 'btn-bk':
            setPanelModel($(_this), "#moveclose-dialog", "动态背景", "dynBackground", true);
            break;
        case 'btn-tt':
            setPanelModel($(_this), "#moveclose-dialog", "贴图", "ui-texture", true);
            break;
        case 'btn-cjxx':
            setPanelModel($(_this), "#moveclose-dialog", "场景信息", "sceneInfo", true);
            break;
        case 'btn-cjxg':
            setPanelModel($(_this), "#moveclose-dialog", "场景效果", "lightInfo", true);
            break;
        case 'btn-lizi':
            setPanelModel($(_this), "#moveclose-dialog", "粒子", "particle", true);
            break;
        case 'btn-store':
            setPanelModel_1($(_this),"#moveclose-dialog_store","空间统计", "store", true);
            break;
        case 'btn-scene-space':
            setPanelModel_1($(_this),"#moveclose-dialog_scene-space","私有数量", "sceneSpace", true);
            break;         
        case 'btn-yy':
            setPanelModel($(_this), "#moveclose-dialog", "音乐", "customMusic", true);
            break;
        case 'btn-tkh':
            setPanelModel($(_this), "#moveclose-dialog", "天空盒", "skybox", true);
            break;  
        case 'btn-ziyuan':
            setPanelModel($(_this), "#moveclose-dialog", "效果模板", "source", true);
            break; 
        case 'btn-decor':
            setPanelModel($(_this), "#moveclose-dialog", "标记", "decor", true);
            break; 
        case 'btn-monet':
            setPanelModel($(_this), "#moveclose-dialog", "拓扑图", "monet", true);
            break;    
        case 'btn-gcdh':
            setPanelModel($(_this), "#moveclose-dialog", "过场动画", "loadingAnimation", true);
            break;
        case 'btn-senChart':
            setPanelModel($(_this), "#moveclose-dialog", "图表", "senChart", true);
            break;
        default:
            break;
    }
}

//快捷键 控制菜单显示
function altMenuShow(type){
    if(!type) return;
    $('.menu_item[data-menu="' + type + '"]').addClass('over');
}
//控制菜单隐藏
function hideAltMenu(){
    $('.menu_item').removeClass('over');
    $('ul.panelMenu').hide();
}
//管理项目组
var organizProPath = ""
function organizePro(_this){
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    if(!checkUserAuth()){
        newAlert("“管理项目组”功能仅对VIP（商业开发者）开放，请升级后使用")
        return;
    }
    organizProPath = $(_this).data("url");
    showOrganizeProjectPanel(organizProPath);
}
// 我的项目面板 
function iframeProduct(e){
    var event=e||window.event;
    event.stopPropagation();
    // return;
    $(event.target).toggleClass('loadIframe');
    if($(event.target).hasClass('loadIframe')) {
        if($('.iframePanel').is(':visible'))  {
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
            $('.iframePanel').hide();
        }
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        showIframeLoad('项目正在加载中...');
        $('.icon.previewProduct.iconfont.icon-tabtubiao').attr('title','关闭面板');
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/Product?sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
    } else {
        closeIframePanel();
        closeIframeLoad();
    }
}
function hideheader(iframe,type){
    $(iframe.contentWindow.document).find('html head').append(`<link onload='window.parent.iframePanelLoaded()' rel="stylesheet" href="../guide/css/dark-theme.css">`);
    $(iframe.contentWindow.document).find('body.template-demos').addClass('template-sample');
    if(type) {
        $(iframe.contentWindow.document).find('body').addClass('template-sample-map');
    }
}
function iframePanelLoaded(msg){
    closeIframeLoad();
    $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':116});
    if($('.wrapper-sam.sam-new .content .content-nav:visible')&&!$('.wrapper-sam.sam-new .content.clearfix').hasClass('hidemenu')) {
        $('.iframePanel').css({'width':'calc(100% - '+$('.wrapper-sam.sam-new .content .content-nav').css('width')+')'});
    } else {
        $('.iframePanel').css({'width':''});
    }
    $('.iframePanel').css({'left':''}).show().animate({'left':$('.wrapper-sam.sam-new .content.clearfix').hasClass('hidemenu')?0:$('.wrapper-sam.sam-new .content .content-nav').css('width')},1000);
    $('.iframePanel iframe#iframeBody').show();
    setTimeout(function(){
        $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        if(msg||($('.iframePanel iframe#iframeBody').length && $('.iframePanel iframe#iframeBody').attr('src') && $('.iframePanel iframe#iframeBody').attr('src').indexOf('?createProject=')!=-1)) {
            showIframeMengban(true);
            if($('.iframePanel iframe#iframeBody')[0].contentWindow&&$('.iframePanel iframe#iframeBody')[0].contentWindow.document) {
                $($('.iframePanel iframe#iframeBody')[0].contentWindow.document).find('body').find('.icon.uinnova.CiBzidingyi').first().trigger('click');
            }
        } else {
            showIframeMengban(false);
        }
    },1000);
    // console.timeEnd();
}
function closeIframePanel(){
    // if($('.sam_header.fix .hidehead').is(':visible')) return;
    $('.iframePanel,.iframePanel iframe#iframeBody').hide();
    $('.iframePanel iframe#iframeBody').remove();
    $('.iframePanel').css({'left':''});
    $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
    $('.icon.previewProduct.iconfont.icon-tabtubiao').removeClass('loadIframe');
    $('.icon.previewProduct.iconfont.icon-tabtubiao').attr('title','打开面板');
    closeIframeLoad();
    showIframeMengban(false);
}
function showIframeMengban(boolean) {
    if(boolean) {
        $('.sam_header.fix .hidehead,.wrapper-sam.sam-new .content .content-nav .hide-nav').show();
        $('.iframePanel').addClass('hideiframe')
    } else {
        $('.sam_header.fix .hidehead,.wrapper-sam.sam-new .content .content-nav .hide-nav').hide();
        $('.iframePanel').removeClass('hideiframe')
    }
}
// 刷新项目库
function refreshMyfile(name,obj){
    domyfile();
    if($('#bfilen').text().length&&$('#bfilen').is(':visible')) {
        moveLiFile($("#list1 .lifileResoure.lifile[data-name='" + $('#bfilen').text().replace('.js','') + "']"));
    }
}
// 显示加载中面板
function showIframeLoad(text,style){
    if(!text) {
        text = '面板正在加载中...';
    }
    if(style) {
        $('.iframeload_bg').css(style);
        $('.hidehead').css(style);
    }else {
        $('.iframeload_bg').css({width:'calc(100%)' , height:'calc(100%)' , left: 0});
    }
    $('.iframeload_bg .load_tips').text(text);
    
    $('.hidehead').css('display','block');
    $('.iframeload_bg').css('display','block');
}
// 关闭加载中面板
function closeIframeLoad(){
    $('.iframeload_bg').hide();
    $('.hidehead').hide();
}
// 面板关闭Btn显/隐
function tabPanelclose(show){
    var show=show||false;
    show?$('.iframePanel .close').show():$('.iframePanel .close').hide();
}
function largePanel(dom,type,msg) {
    if(isLoginOther) {loginOutTime();}
    var type=$(dom).data('type')||type;
    if(!isLogin('enter','largePanel')) return;
    if(type=='园区'||type=='园区-全景图') {
        showIframeLoad('全景图资源正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/Scene?sampleIframe=true`+(type=='园区-全景图'?'&type=1':'')+`&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
        return;  
    }
    if(type=='地图') {
        clickTool('btn-city',this);
        return;
        showIframeLoad('地图面板正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        // $('.iframePanel').append(`<iframe id="iframeBody" onload="iframePanelLoaded('`+(msg?msg:'')+`')" src="http://localhost:8081/#/`+(msg?'?createProject='+msg:'')+`" scrolling="no" frameborder="0"></iframe>`);
        // console.time();
        $('.iframePanel').append(`<iframe id="iframeBody" onload="iframePanelLoaded('`+(msg?msg:'')+`')" src="`+path+`/citybuilder/#/`+(msg?'?createProject='+msg:'')+`" scrolling="no" frameborder="0"></iframe>`);
        window.addEventListener('message', function(ev) {
            if(ev.data=='open') {
                tabPanelclose(false);
            } else if(ev.data=='close') {
                tabPanelclose(true);
            } else if(ev.data='loadDark') {
                if($('#moveclose-dialog .panelModel .panelBody .cityBg:visible').length) return;
                if($('.iframePanel iframe#iframeBody:visible').length) {
                    if(ev.data=='mengban') {
                        showIframeMengban(true);
                    } else if(ev.data='mengban_close') {
                        showIframeMengban(false);
                    }
                    return;
                }
            } else if(ev.data=='mengban') {
                showIframeMengban(true);
            }
        })
        return;
    }
    if(type=='粒子') {
        showIframeLoad('粒子正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }        
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="`+path+`/guide/?m=particle" scrolling="no" frameborder="0"></iframe>`);
        return;
    }
    if(type=='项目') {
        return;
        showIframeLoad('项目面板正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }        
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="`+path+`/admin/#/Product?sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`"></iframe>`);
        return;
    }
    if(type=='我的订单') {
        showIframeLoad('我的订单正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/User_Ticket?sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
        return;
    }
    if(type=='我的合同') {
        showIframeLoad('我的合同正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/User_Contract?sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
        return;
    }
    if(type=='个人信息') {
        showIframeLoad('个人信息正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/User_Msg?sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
        return;
    }
    if(type=='系统消息') {
        showIframeLoad('系统消息正在加载中...');
        if($('.iframePanel iframe#iframeBody').length) {
            $('.iframePanel iframe#iframeBody').remove();
            $('.iframePanel').css({'left':''});
            $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
        }
        $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/sysInfo?sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
        return;
    }
}
function loadOfflineIframe(dom){
    $('.loadingDeploy').remove();
    if(dom) {
        var src=$(dom).attr('src');
        var ifserver=src.indexOf('ifServer=3')!=-1;
        // if(ifserver) return;
        $(dom.contentWindow.document).find('html head').append(`<link rel="stylesheet" href="../guide/css/dark-theme.css">`);
        $(dom.contentWindow.document).find('body.template-demos').addClass('template-sample');
    }
}
//协作开发右键菜单
function changeContext(){
    if( $(".curList .team.active").length || $(".curList .teamleader.active").length){
        var fpath = $(".setting2 .filen-active").attr("data-url");
        if( !fpath ){
            var path = "";
            if($(".curList .team.active").length){
                path = $(".curList .team.active").data("url");
            }else{
                path = $(".curList .teamleader.active").data("url");
            }
            fpath = path;
        }
        var content = "协作开发-进入编辑"
        
        if( teamInfo.selfOccupyFile && teamInfo.selfOccupyFile.length){
            for(var i = 0; i < teamInfo.selfOccupyFile.length; i++){
                if(teamInfo.selfOccupyFile[i].fpath == fpath){
                    content = "协作开发-退出编辑"
                }
            }
        }
        var html='<li class="action-item disabled" role="presentation"><a class="action-label icon separator disabled" role="presentation"></a></li><li class="action-item" role="presentation"><a class="action-menu-item" role="menuitem" tabindex="0"><span class="action-label team" onclick="editTeamFile()">'+content+'</span></a></li>'  
        if( teamInfo.otherOccupyFile && teamInfo.otherOccupyFile.length && $(".curList .teamleader.active").length){
            for(var i = 0; i < teamInfo.otherOccupyFile.length; i++){
                if( teamInfo.otherOccupyFile[i].fpath == fpath){
                    var uname = teamInfo.otherOccupyFile[i].uname;
                    uname=encodeURIComponent(uname);
                    html +='<li class="action-item" role="presentation"><a class="action-menu-item" role="menuitem" tabindex="0"><span class="action-label team" onclick=forceCancelEdit(\"'+uname+'\")>协作开发-强制退出编辑</span></a></li>'
                }
            }
        }
        $(".monaco-menu ul").append(html);
    }
}
//文件编辑状态发生变化，改变左侧列表显示
function changeTeamFileState(fpath,editState,mainFile,isProLeader,pname){
    if(editState){//文件占用成功
        var nameTip = "我正在编辑"
        var imgSrc = "";
        for(var j = 0; j < teamInfo.selfOccupyFile.length; j++){
            if(teamInfo.selfOccupyFile[j].fpath == fpath){
                imgSrc =  "url("+teamInfo.selfOccupyFile[j].imgurl+")";
            }
        }
        var oHeadImg = $('<span class="headImg" title="'+nameTip+'" style="background-image:'+imgSrc+'"></span>');
        if(mainFile){//主文件处理
            if(isProLeader){
                $(".lifile[data-name='"+pname+"']").find(".pro_main").addClass("selfOccupy").prepend(oHeadImg);
                if(!$(".lifile[data-name='"+pname+"']").hasClass('teamleader')) $(".lifile[data-name='"+pname+"']").addClass('teamleader');
                if(!$(".lifile[data-name='"+pname+"']").find('.iconfont.icon-xiezuo.teamIcon').length) $(".lifile[data-name='"+pname+"']").find('.iconfont.icon-file.active').before(`<i class="iconfont icon-xiezuo teamIcon" title="协作开发"></i>`);
            }else{
                $(".lifile[data-url='"+fpath+"']").find(".pro_main").addClass("selfOccupy").prepend(oHeadImg);
            }
        }else{//资源文件处理
            var len = fpath.split('/').length-6;
            var percent = 11 + 8 * (len - 1)
            oHeadImg.css({'left': (percent-2)*1.8+"px"});
            $(".lifile[data-url='"+fpath+"']").addClass("selfOccupy").prepend(oHeadImg);
        }
        
    }else{//取消占用
        if(mainFile){
            if(isProLeader){
                $(".lifile[data-name='"+pname+"']").find(".pro_main").removeClass("selfOccupy").find(".headImg").remove();
            }else{
                $(".lifile[data-url='"+fpath+"']").find(".pro_main").removeClass("selfOccupy").find(".headImg").remove();
            }            
        }else{
            $(".lifile[data-url='"+fpath+"']").removeClass("selfOccupy").find(".headImg").remove();
        }
             
    }
}      
//编辑协作项目
function editTeamFile(isSave,fileInfo){
    if(fileInfo && fileInfo.fpath){
        var fpath = fileInfo.fpath;
        var path = fileInfo.path;
        var pname = fileInfo.pname;
        var mainFile = fileInfo.mainFile;
        var isProLeader = fileInfo.isProLeader;
    }else{
        var fpath = $(".setting2 .filen-active").attr("data-url");
        var path = "";
        var pname = "";
        var mainFile = false;//是否为主文件
        var isProLeader = false;//是否为协作项目领导者
        if($(".curList .team.active").length){
            path = $(".curList .team.active").data("url");
            pname = $(".curList .team.active").attr("data-name");
        }else if( $(".curList .teamleader.active").length ){
            isProLeader = true;
            path = $(".curList .teamleader.active").data("url");
            pname = $(".curList .teamleader.active").attr("data-name");        
        }else{
            return;
        }
        if(!fpath){
            mainFile = true;
            fpath = path;
        }
    }
    
    //改变协作项目的编辑状态
    $.ajax({
        url:'/api/changeTeamFileEditState',
        type:'POST',
        async:true,
        data:{
            fpath:fpath,
            path:path,
            pname:pname
        },
        success:function(res) {
            if(res && res.code == 200){
                getTeamOccupyFile(false);
                if((!isSave) && !(fileInfo && fileInfo.fpath) ){//保存时进入编辑状态 间隔一段时间不操作 不弹出
                    newAlert(res.message,'warning');
                }else if(isSave){//保存时改变状态，同时保存文件
                    upload_publish();
                }
                if(res.state == 1){//进入文件编辑状态
                    changeTeamFileState(fpath,true,mainFile,isProLeader,pname);
                }else if(res.state == 2){   
                    changeTeamFileState(fpath,false,mainFile,isProLeader,pname);
                }
            }
        },
        err:function(err) {
            console.log(err)
        }
    })
}
//获取当前的fpath

function getCurrentFpath(){
    var obj = {};
    var fpath;
    var path;
    var mainFile = false;

    fpath = $(".setting2 .filen-active").attr("data-url");  
    if( $(".curList .team.active").length ){
        path = $(".curList .team.active").data("url");
        pname = $(".curList .team.active").attr("data-name");
    }else{
        path = $(".curList .teamleader.active").data("url");
        pname = $(".curList .teamleader.active").attr("data-name");
    }
    
    if(!fpath){
        fpath = path;
        mainFile = true;
    }
    obj.fpath = fpath;
    obj.path = path;
    obj.pname = pname;
    obj.mainFile = mainFile;
    return obj;
}
//强制取消他人编辑协作项目文件
var fcState = {};
function forceCancelEdit(uname){
    var fpath = $(".setting2 .filen-active").attr("data-url");
    var mainFile = false;//是否为主文件
    var isProLeader = true;
    uname=decodeURIComponent(uname);
    var path = $(".curList .teamleader.active").data("url");
    var pname = $(".curList .teamleader.active").attr("data-name"); 
    
    if(!fpath){
        mainFile = true;
        fpath = path;
    }
    if(fcState[fpath] && fcState[fpath].timer){
        newAlert(fcState[fpath].text,'warning');
        return;
    }else{
        fcState[fpath] = {}
    }
    var f1 = function(arg){
        //强制取消协作项目的编辑状态
        var tempstate = 2;
        if(arg) tempstate = arg;
        $.ajax({
            url:'/api/forceCancelEditState',
            type:'POST',
            async:true,            
            data:{
                fpath:fpath,
                path:path,
                tempstate:tempstate
            },
            success:function(res) {                
                if(res && res.code == 200){
                    if(res.state == 2){//等待文件占用,间隔时间后文件占用
                        clearInterval(fcState[fpath].timer);
                        fcState[fpath].timer = setInterval(()=>{
                            time--;
                            fcState[fpath].text = time+"秒钟后将取消“"+uname+"”的编辑状态 ! ";
                            if($(".swal2-content .msg").text().indexOf("秒钟后将取消") != -1 && getCurrentFpath().fpath == fpath){                                
                                $(".swal2-content .msg").text( fcState[fpath].text )
                            }
                            if(time <= 0){
                                clearInterval(fcState[fpath].timer);
                                fcState[fpath].timer=null;
                                f1(1);
                            }                            
                        },1000)   
                        var time = 30;        
                        newAlert("30秒钟后将取消“"+uname+"”的编辑状态",'warning');     
                                
                    }else if(res.state == 1){
                        newAlert("取消占用成功",'success');                      
                    }else if(res.state == 0){
                        newAlert("取消占用成功",'success');
                    }
                    if(res.state != 2){
                        if(mainFile){ 
                            $(".lifile[data-name='"+pname+"']").find(".pro_main").removeClass("teamOccupy").find(".headImg").remove();         
                        }else{
                            $(".lifile[data-url='"+fpath+"']").removeClass("teamOccupy").find(".headImg").remove();
                        }
                        getTeamOccupyFile(false);
                    }
                    
                }
            },
            err:function(err) {
                console.log(err)
            }            
        })
        swal_close();
    }
    var f2 = function(){
        swal_close();
    }
    newConfirm('“'+uname+'”正在编辑中，您确定要强制取消“'+uname+'”的编辑状态吗？', ['确认', '取消'], [f1, f2]);
}
//初始化自己创建的协作项目
function initSelfTeamProject(){
    $.ajax({
        url:"/api/getSelfTeamProjectList",
        dataType:"json",
        async:false,
        type:"get",
        success:function(data){
            if(data && data.code == 200 && data.data.length){
                teamInfo.selfleaderTeamProList = data.data;
                for(var i = 0; i < $(".pdtList>li").length;i++ ){     
                   if( data.data.indexOf($(".pdtList>li").eq(i).attr("data-name")) != -1){     
                        $(".pdtList>li").eq(i).addClass("teamleader");
                        $(".pdtList>li").eq(i).prepend('<i class="iconfont icon-xiezuo teamIcon" title="协作开发"></i>');                         
                   }
               }
            }
        }
    })
}
//获取用户协作项目下被占用的文件
function getTeamOccupyFile(async){
    $.ajax({
        url: "/api/getTeamOccupyFile",
        dataType: "json",
        async: async,
        type: "get",
        success: function (res) {
             if(res && res.code == 200){
                teamInfo.otherOccupyFile = res.data.otherOccupyFile;
                teamInfo.selfOccupyFile = res.data.selfOccupyFile;
                teamInfo.selfleaderTeamProList = res.data.selfleaderTeamProList||[];
             }
        }
    })
}
function initTeamProject(){   
    $.ajax({
        url: "/api/getTeamProjectList",
        dataType: "json",
        type: "get",
        async: false,
        success: function (data) {
            if(data && data.code == 200){
                var list = data.data;
                myfilename.pdtlist=myfilename.pdtlist.concat(list);
                myfilename.pdtlist.sort(sortProjectTime);
                for(var i = 0; i < list.length; i++){                    
                    //1 项目名称 2 项目地址 3 版本 4 是否公开 5 项目（3协作开发 ）6 “0” 7 文件最后保存时间 
                    // myfileinit(list[i].pname, list[i].path, "", 0, 3, 0, list[i].modifytime);
                    myfilename.teamName.push(list[i].pname);
                }
                getTeamOccupyFile(true);
            }            
            initSelfTeamProject();
        }
    })
}
function sortProjectTime(x, y) {
    var prevTime = new Date(x.modifytime || x.time).getTime() ? new Date(x.modifytime || x.time).getTime() : 0;
    var nextTime = new Date(y.modifytime || y.time).getTime() ? new Date(y.modifytime || y.time).getTime() : 0;
    return -(prevTime - nextTime);
}
//固定时间不保存协作项目后，自动取消项目协作
var teamtimer = {};
function autoCancelTeamEdit(fileInfo){
    var fpath = fileInfo.fpath;
    clearTimeout( teamtimer[fpath] );
    teamtimer[fpath] = setTimeout(() => {
        for(var i = 0; i < teamInfo.selfOccupyFile.length; i++){
            if(teamInfo.selfOccupyFile[i].fpath == fpath){//当项目还处于占用状态时，取消占用
                editTeamFile(false,fileInfo)
            }
        }
    }, 6000);
}
//取消文件的占用状态样式
function cancelEditStyle(mainFile,fpath,pname){
    if(mainFile){ 
        $(".lifile[data-name='"+pname+"']").find(".pro_main").removeClass("selfOccupy").find(".headImg").remove();         
        $(".lifile[data-name='"+pname+"']").find(".pro_main").removeClass("otherOccupy").find(".headImg").remove(); 
    }else{
        $(".lifile[data-url='"+fpath+"']").removeClass("selfOccupy").find(".headImg").remove();
        $(".lifile[data-url='"+fpath+"']").removeClass("otherOccupy").find(".headImg").remove();
    }
}

//协作开发，控制保存
function controlSave(member,type,savetype){
    var fpath;
    var uid=getCookie("openid", true);
    uid=decodeURIComponent(uid);
    if( type != "mainFile"){
        fpath = $(".setting2 .filen-active").attr("data-url");
    }
    var path;
    if( $(".curList .team.active").length ){
        path = $(".curList .team.active").data("url");
        pname = $(".curList .team.active").attr("data-name");
    }else{
        path = $(".curList .teamleader.active").data("url");
        pname = $(".curList .teamleader.active").attr("data-name");
    }
    mainFile = false;
    if(!fpath){
        fpath = path;
        mainFile = true;
    }
    var isProLeader = false;
    if(member == "teamLeader"){
        isProLeader = true;
    }
    teamLeaderId=decodeURIComponent(getLeaderid());
    if(teamLeaderId!=uid) isProLeader=false; 
    var fileInfo = {
        "fpath":fpath,
        "path":path,
        "pname":pname,
        "mainFile":mainFile,
        "isProLeader":isProLeader,
        "leaderid":getLeaderid()
    }
    var isControl = true;
    $.ajax({
        url:'/api/getTeamOneFileState',
        type:'POST',
        async:false,
        data:{
            fpath:fpath,
            fileInfo:JSON.stringify(fileInfo)
        },
        success:function(res) {
             if(res && res.code == 200 && (res.enableEdit||(res.data && res.data.length == 0))){
                if(!res.data.length || (res.data.length && res.data[0].state ==  0) ){
                    var f1 = function(){
                        editTeamFile(true);
                        swal_close();
                        isControl=true;
                    }
                    var f2 = function(){
                        swal_close();
                    }                    
                    newConfirm('进入“协作项目”编辑状态才允许保存文件，您确认要进入并且保存文件吗？', ['确认', '取消'], [f1, f2]);
                 }else if(res.data.length && res.data[0].state){
                    if(uid!=res.data[0].occupierid) {                        
                        if(fileInfo.leaderid==uid) {
                            // 协作项目管理员
                            isControl = false;
                        } else {
                            newAlert("“"+res.data[0].uname+"”正在编辑中,您不可编辑",'warning');
                            isControl=true;
                        }
                    } else {
                        isControl = false;
                    }                     
                 } else {
                    isControl = false;
                 }
                // autoCancelTeamEdit(fileInfo);
                // if(res.enableEdit == 2){
                //     getTeamOccupyFile(false);
                //     newAlert("您已经被强制取消了该文件的编辑状态",'warning');
                //     cancelEditStyle(mainFile,fpath,pname);
                // }
             }else{
                 if(res.code==500&&res.message) {
                    newAlert(res.message,'warning');
                    return;
                 }
                 if(savetype != "autosave"){
                    if(!res.data.length || (res.data.length && res.data[0].state ==  0) ){
                        var f1 = function(){
                            editTeamFile(true);
                            swal_close();
                        }
                        var f2 = function(){
                            swal_close();
                        }
                        cancelEditStyle(mainFile,fpath,pname);                     
                        newConfirm('进入“协作项目”编辑状态才允许保存文件，您确认要进入并且保存文件吗？', ['确认', '取消'], [f1, f2]);
                     }else if(res.data.length && res.data[0].state){
                        if(fileInfo.leaderid==uid) {
                            // 协作项目管理员
                            isControl = false;
                        } else {
                            newAlert("“"+res.data[0].uname+"”正在编辑中,您不可编辑",'warning');
                        }
                        // changeTeamFileState(fpath,false,mainFile,isProLeader,pname);
                     }
                 }
             }
        },
        err:function(err) {
            console.log(err)
        }
    })
    return isControl;
}
function creatCps(ele){
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var cpsName = $($(ele).siblings('.siyou-item')).data('name');
    $.ajax({
        url:'/api/uploadCpsFile?name=' + cpsName,
        type: 'get',
        success: function(data){
            if(data.code && data.code==201 && data.message){
                newAlert(data.message);
            }else if(data.code && data.code==200){
                refreshSpecFile();
            }
        }
    })
}

//复制项目
function copyProject(ele,name,url,_this){
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var copyName='';
    if ((myfilename.fileName.length + myfilename.ProName.length-myfilename.teamName.length) >= jsnums) {
        newAlert('最多保存' + jsnums + '个文件！', 'warning');
        return;
    }
    if(ele) {
        name=$(ele).data('nameBefore');url=$(ele).data('url');
        if(myfilename.teamName.length&&$(ele).data('nameBefore')&&myfilename.teamName.indexOf($(ele).data('nameBefore'))!=-1) {
            if($('.lifileResoure.lifile[data-url="'+url+'"]').length&&$('.lifileResoure.lifile[data-url="'+url+'"]').hasClass('team')){                
                return newAlert('项协作项目不允许复制', 'warning');
            }
        }
    }
    var _arr=(myfilename.ProName||[]).concat(myfilename.fileName||[]);
    copyName=createProjectName(name,_arr);
    $.ajax({
        url : '/api/getFileCanName',
        type : 'get',
        data : {
            confirmPath : url
        },
        async : false,
        success: function (d){
            if(d.code && d.code == 200 && d.message) {
                // console.log(copyName,d.message)
                // copyName = d.message;
            }
        }
    })
    
    var defaultHtml = '<div class="panel-radio" style="position: relative;left: 1%;min-width: 310px;margin: 7px auto 7px;color:#ccc"></div>'

    let defaultConfig = {
        title: '复制项目',
        input: 'text',
        inputValue: copyName,
        html: defaultHtml,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        preConfirm: (val) => {
            try {
                verifyName(val);
                if(val==$('#bfilen').data('nameBefore')){
                    swal.showValidationError(`错误提示:项目脚本命名已存在 `);
                }
            } catch (e) {
                swal.showValidationError(`错误提示: ${e}`);
            }
        }
    };

    swal(defaultConfig).then((result) => {
        if (result.value) {
            showIframeLoad('项目复制中...',{width:'calc(100%)',height:'calc(100%)',left:'0px'});
            $.ajax({
                url: '/api/copyProject',
                type: 'get',
                data: {
                    from :url,
                    nameNeed : result.value,
                },
                success: function(data){
                    $.ajax({
                        url: '/api/files?find=' + result.value,
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        success: function (dataMsg) {
                            var fileData = dataMsg.fileAllMenu;
                            if (fileData.length > 0) {
                                var file = fileData.find((element) => (element.name.length == result.value.length));
                                if (file) {
                                    $('#list1 li[data-name="' + result.value + '"]').remove();
                                    myfilename.fileName.unshift(result.value);
                                    myfilename.pdtlist.unshift(file);
                                    if(file.isDecor === 1){
                                        const isCopyDecor = true;
                                        addLiFile(result.value, file.url, file.version, file.isOpen,file.isPro, 1, file.time, null, null, null, null, isCopyDecor);
                                    } else {
                                        addLiFile(result.value, file.url, file.version, file.isOpen,file.isPro, 1, file.time);
                                    }
                                    if(!$('.pdtTitle').hasClass('active')){
                                        $('.pdtTitle').addClass('active');
                                        if ($('.pdtList').children().length) {
                                            $('.pdtList').slideDown();
                                        }
                                    }
                                    $('#list1 li[data-name="' + result.value + '"]').addClass('blingbling');
                                    
                                    if(data.message && data.message!='ok'){
                                        newAlert(data.message,'warning',null,removeBling);
                                    }else{
                                        removeBling();
                                    }
                                    closeIframeLoad();
                                    newmessage('复制成功！','success');
                                    if(_this&&_this.getFile) {
                                        _this.getFile();
                                    }
                                }
                            }else{
                                if(data.message && data.message!='ok'){
                                    newAlert(data.message,'warning');
                                }else{
                                    newAlert('项目复制失败！', 'error');
                                }
                                closeIframeLoad();
                            }
                        }
                    })
                },
                error: function(err){
                    newAlert('项目复制失败！', 'error');
                    closeIframeLoad();
                }
            })
        }
    });
    $('.swal2-container').addClass('newalert');
    $('.swal2-container #swal2-content').after(`<span class='tip' style='color:#ccc'>复制项目名：</span>`);
    $('.swal2-input').css({'width':'calc(100% - 90px)'});
}
// QuickDt打开项目
function openProjectByQdt(ele) {
    if($(ele).data('qdt_id')) {
        window.open('https://www.thingjs.com/pre/qdt/'+$(ele).data('qdt_id'));
    } else {
        newAlert('QuickDt打开失败');
    }
}

function removeBling(rightNow){
    if(!rightNow){
        setTimeout(function(){
            $('#list1 .blingbling').removeClass('blingbling');
        },3000)
    }else{
        $('#list1 .blingbling').removeClass('blingbling');
    }
}
// 非本人场景判断
function hasOtherUrl(str) {
    var state=true;
    if(!str) return  {content:"",state:state};
    var regUrl=/['"]\/api\/scene\/(\S*)['"]/gi;
    var sceneUrl=str.match(regUrl); //上传场景
    var data=str;
    if(sceneUrl) {
        for(var i=0;i<sceneUrl.length;i++) {
            str.replace(regUrl, function (match, capture) {
                // data = data.replace(match, "'/api/scene/"+decodeSceneUrl(capture).scenePath+"'");
                if(state&&!$('#list1 .curLi .curList .lifileResoure.lifile').length&&($('#list1 .curLi .curList .lifileResoure.lifile').hasClass('teamleader')||$('#list1 .curLi .curList .lifileResoure.lifile').hasClass('team'))) state=getCookie('mmdId')==decodeSceneUrl(capture).authorID?true:false;
            });
        }
        return {
            content:data,
            state:state
        };
    } else {
        if($('#list1 .curLi .curList .lifileResoure.lifile').length) {
            if($('#list1 .curLi .curList .lifileResoure.lifile').hasClass('teamleader')||$('#list1 .curLi .curList .lifileResoure.lifile').hasClass('team')) return {content:data,state:state};
        }
        // var regJS=/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g; //多行注释
        // var resJS1=/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g; //单行注释
        // str=str.replace(resJS1,'').replace(regJS,'\n').replace(/\n\r/g,'');
        var sceneUrl1=str.match(/\/uploads\/wechat\/(\S*)\/scene/g); //上传场景
        var sceneUrl2=str.match(/\/client\/ThingJS\/(\S*)\//g); //同步场景
        if(sceneUrl1) {
            for(var i=0;i<sceneUrl1.length;i++) {
                if(sceneUrl1[i].match(/\/uploads\/wechat\/(\S*)\/scene/)) {
                    if(sceneUrl1[i].match(/\/uploads\/wechat\/(\S*)\/scene/)[1]!=getCookie('openid')&&sceneUrl1[i].match(/\/uploads\/wechat\/(\S*)\/scene/)[1].indexOf(getCookie('openid')+'/file/')==-1) return {content:data,state:false};
                }
            }
        }
        if(sceneUrl2) {
            for(var i=0;i<sceneUrl2.length;i++) {
                if(sceneUrl2[i].match(/\/client\/ThingJS\/(\S*)\//)) {
                    if(sceneUrl2[i].match(/\/client\/ThingJS\/(\S*)\//)[1]!=getCookie('mmdId')) return {content:data,state:false};
                }
            }
        } 
        return {
            content:str,
            state:true
        };
    }
}

//签到权限验证
function singiRole(){
    $('#content_sample .content-browser .browser-header .editScene').html(`<div style="margin-right: 7px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #ffffff;
        background-color: #ec7600;
        width: 70px;
        height: 23px;
        font-size: 12px;
        line-height: 12px;
        padding: 6px;
        border-radius: 2px;
        margin-top: 3px;"  onclick="editShowScene()">编辑场景</div>`);
}
// 判断是否显示编辑场景
function showEditScene(type){
    if(type&&$('#content_sample .content-browser .browser-header .editScene').children('div').length) {
        $('#content_sample .content-browser .browser-header .editScene').show();
    } else {
        $('#content_sample .content-browser .browser-header .editScene').hide();
    }
}
// 校验当前项目是否含有旧版uearth引入路径
function checkIfOldUearth(thisData){
    if(!thisData) return false;
    var reg = /(['"])http[s]*:.*uearth.min.js(['"])/g;
    var selfReg = /http[s]*:.*uearth.min.v*.*.js/g;
    var selfRes = thisData.match(selfReg);
    if(selfRes) {
        return false;
    }
    var res = thisData.match(reg);
    function updateF1(){
        var thisNewVersion = getLatestUearthVersion();

        if(!res || !res[0]) {
            swal_close();
            return;
        }
        thisData = thisData.replace(/(['"])http[s]*:.*uearth.min.js(['"])/g, "/*" + res[0] + "*/\n    " + "'" + path + "/uearth/history/"+thisNewVersion + "'");
        monacoModel.setValue(thisData);
        swal_close();
    }
    function updateF2(){
        swal_close();
    }
    if(res){
        newConfirm('uearth.min.js版本管理方式已升级为明确声明包版本号方式。您是否要自动更新当前项目uearth包为最新版本？<br><br>注：若不自动更新，也可自行到菜单“工具-设置-uearth库版本”中选择需引入的版本号。', 
        ['确认更新', '取消'], [updateF1, updateF2],null,'388.37');

    }
    return false;
}
// 复制场景面板
function copyScene(_this) {
    var url=$('#bfilen').data('url');
    // var mmdId = getCookie("mmdId");
    // var openID = getCookie("openid");
    // var data;
    // // if(type == 'scene') {
    // //     var sceneUrl = $(".preview-tools").attr('data-url');
    // //     var sceneName = $(".preview-tools").attr('data-name');;
    // //     data = {
    // //         type: 'scene',
    // //         sceneUrl: sceneUrl,
    // //         name: sceneName,
    // //         mmdId: mmdId,
    // //         openId:openID
    // //     }
    // // } else if (type == 'map') {
    // //     var id=$(".preview-tools").attr("data-id"),mapName = $('.card.current-item').attr("data-name");
    // //     data = {
    // //         type: 'map',
    // //         code: id,
    // //         name: mapName,
    // //         mmdId: mmdId,
    // //         openId:openID
    // //     }
    // // }
    $.ajax({
        type: "GET",
        url: path + "/guide/dialog/copySceneToUser.html",
        dataType: "html",
        async: false,
        success: function (bodyHtml) {
            $(".organizeProject").html(bodyHtml);
            initMemberList(url);
        }
    })
}
//通过路径获取用户uid
function getUidByPath(userPath){
    var fromUid = '';
    if(userPath.indexOf('/') == 0) {
        userPath = '.' + userPath;
    }
    var pathArr = userPath.split('/');

    if(userPath.indexOf('/uploads/wechat/')>0){
        if(pathArr.length==5){
            fromUid = pathArr[3];
        }else{
            var endIndex = pathArr.length - 1;
            if(pathArr[endIndex - 1] == 'project'){
                endIndex = pathArr.length - 2;
            }
            for(let i = 3;i<endIndex;i++){
                if(fromUid.length>0){
                    fromUid = fromUid + '/';
                }
                fromUid = fromUid + pathArr[i];
            }
        }
    }else if(userPath.indexOf('/uploads/package/')>0){
        if(pathArr.length==6){
            fromUid = pathArr[3];
        }else{
            var endIndex = pathArr.length - 2;
            
            for(let i = 3;i<endIndex;i++){
                if(fromUid.length>0){
                    fromUid = fromUid + '/';
                }
                fromUid = fromUid + pathArr[i];
            }
        }
    }
    
    return decodeURIComponent(fromUid);
}
// 快捷分享
function quickShare(){
    if (!getCookie('token')) {
        loginwindowon();
        return;
    }
    if(!$('.setting2 #gf').is(':visible')) {
        // 未打开项目
        if (!($('.filen').is(':visible'))) {
            newAlert('请先打开项目再做分享','warning');
            return;
        }
        // 打开项目但未保存文件
        if (!$('.filen-active .filen-edit').is(':hidden')) {
            newAlert('请先保存文件','warning');
                return;
        }

        // 新建项目但是没有保存项目
        if (!($('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active .filen-edit').is(':hidden') || $('.filen').is(':visible') && $('#bfilen').data('nameBefore').length > 0 && $('.filen-active').hasClass('reference_li'))) {
            newAlert('新建项目尚未保存','warning');
            return;
        }
    }
    
    var ifSample = 0;
    var shareName = null;
    var prjurl = null;
    if ($('.filen').text().length > 0 &&
        !$('#gf').is(':visible') && $('#bfilen').attr('type') != 'new') {
        shareName = $("#bfilen").data("nameBefore")
        prjurl = $('#bfilen').data('url');
        if ($("#bfilen").data("isOpen") == 1) {
            //公开项目
            ifSample = 2;
        }
        if ($('.filen').text().length > 0 && $('#bfilen').data('isPro') == 1) {
            //托管项目
            //托管私有
            ifSample = 3;
            if ($("#bfilen").data("isOpen") == 1) {
                //托管公开
                ifSample = 4;
            }
        }
    } else if ($('#gf').is(':visible')) {
        ifSample = 1;
        //官方项目
        var Sam = 'sample';
        shareName = $('#list0 .item .active').text();
        var versionTwoArr=['basic','geometry','object','event','marker','camera','component','stage','eometry','samples','earth','create','riversurface','sampleB','FeatureLayer','information','load','map','marker'];
        if(versionTwoArr.includes($('#gf').data('name').split('_').shift())){
            shareName = $('#list2 .item .active').text();
            prjurl = encodeAno(path + "/guide/sampleindex.html?m=official/js/" + $('#gf').data('name') + ".js");
        }else if ($('#gf').data('name').slice(0, Sam.length) == Sam) {
            prjurl = encodeAno(path + "/guide/sampleindex.html?m=examples/js/" + $('#gf').data('name') + ".js");
        }  else {
            prjurl = encodeAno(path + '/demos/menu.html?name=' + $('#gf').data('name'));
        }
    } else {
        newAlert('请先保存文件！', 'warning');
        return;
    }
    if(ifSample==1) {
        var fn=function (){
            window.open(prjurl);
            swal_close();
        }
        newAlert(`
        <div style = "width: 95%">
            <p>
                您已生成了一个快捷分享，该分享链接24小时有效。若希望生成更长久的分享链接，
                请到菜单“项目-分享设置”中设置。
            </p>
            <br/>
            <p class = "sample-test-content-text">
                链接：<a style="color:rgb(204, 204, 204)" onMouseOver="this.style.backgroundColor='#ff7f00',this.style.color='#fff'" onMouseOut="this.style.backgroundColor='transparent',this.style.color='rgb(204, 204, 204)'" href = '${prjurl}' target="_blank">${prjurl}</a>
                <input class="share-url-copy" value="` + prjurl + `" style = "position:absolute;z-index:-100;opacity: 0;">
                <span class="text" style = "height: 22px;line-height: 11px;padding: 5px 4px 6px 4px;margin: 0;" onclick="copyLinks(this)" title="复制">
                    <i class="iconfont icon-caozuo_fuzhi"></i>
                </span>
            </p>
        </div>
        `,
         'warning',
         '温馨提示',fn,null,null,'shari');
        // window.open(prjurl);
    } else if(ifSample == 0 || ifSample == 3) {
        $.ajax({
            url:'/api/getUserProjectLink',
            type: 'get',
            data: {
                projectName : shareName,
                ifSample : ifSample,
                leaderid:getLeaderid(),
                projectJs:$("#bfilen").data('url')
            },
            dataType: 'json',
            success: function(data){
                if(data.code && data.code==200 && data.data && data.data.length>0&&!data.data[0].key){
                    var shareobj=data.data[0];
                    $.ajax({
                        url:'/api/checkIframe?link='+shareobj.projectLink+'&ifSample='+ifSample,
                        type:'get',
                        success:function(res) {
                            if(res.code==200) {
                                openQuickShare(shareobj,ifSample);
                            } else {                                
                                $.ajax({
                                    url:'/api/checkLinkData?link='+shareobj.projectLink+'&ifSample='+ifSample,
                                    type:'get',
                                    success:function(res) {
                                        if(res.code==200) {
                                            openQuickShare(shareobj,ifSample);
                                        } else {
                                            createQuickShqre(shareName,prjurl,ifSample);
                                        }
                                    }
                                })
                            }
                        }
                    })
                }else{
                    createQuickShqre(shareName,prjurl,ifSample);
                }
            }
        })
    } else if(ifSample == 2 ||ifSample == 4){
        $.ajax({
            url: '/api/user_query/projectList',
            type: 'post',
            data: JSON.stringify({
                where : {
                    projectJs : prjurl
                }
            }),
            dataType: 'json',
            contentType:"application/json;charset=utf-8",
            success: function(data){
                if(data.rows.length>0){
                    var shareobj=data.rows[0];
                    $.ajax({
                        url:'/api/checkIframe?link='+shareobj.link+'&ifSample='+ifSample,
                        type:'get',
                        success:function(res) {
                            if(res.code==200) {
                                openQuickShare(shareobj,ifSample);
                            } else {                                
                                $.ajax({
                                    url:'/api/checkLinkData?link='+shareobj.link+'&ifSample='+ifSample,
                                    type:'get',
                                    success:function(res) {
                                        if(res.code==200) {
                                            openQuickShare(shareobj,ifSample);
                                        } else {
                                            createQuickShqre(shareName,prjurl,ifSample);
                                        }
                                    }
                                })
                            }
                        }
                    })
                } else {
                    createQuickShqre(shareName,prjurl,ifSample);
                }
            }
        })
    }
}
// 创建有效期1天无访问码的新链接
function createQuickShqre(shareProjectName,shareProjectUrl,thisSample){
    $.ajax({
        url: '/api/createLink',
        type:'get',
        data: {
            prjName: shareProjectName,
            prjUrl: shareProjectUrl,
            prjVal: 1,
            hasKey: 0,
            ifSample: thisSample,
            quickShare:1,
            leaderid:getLeaderid()
        },
        dataType : 'json',
        success: function(data){
            if(data.code && data.code==200){
                openQuickShare({projectLink:data.projectLink},thisSample);
            }
        }
    })
}
// 打开分享地址
function openQuickShare(data,thisSample){
    var projectLink;
    //初始化链接
    if(thisSample == 0) {
        projectLink = path + "/s/" + (data.projectLink||data.link);
    }else if(thisSample == 1){
        projectLink = (data.projectLink||data.link);
    }else if(thisSample == 2){
        projectLink = path + "/pp/" + (data.projectLink||data.link);
    }else if(thisSample == 3){
        projectLink = path + "/p/" + (data.projectLink||data.link);
    }else if(thisSample == 4){
        projectLink = path + "/p/" + (data.projectLink||data.link);
    }
    var paramsUrl = "";
    var encipher = true;
    if(data.startParams){
        if( encipher ){
            paramsUrl = '?params=' + encipherParamQuickShare(data.startParams)
        }else{
            var startPatams = JSON.parse(data.startParams);
            for(item in startPatams){
                if(paramsUrl){
                    paramsUrl = paramsUrl + '&' + item + '=' + startPatams[item];
                }else{
                    paramsUrl = '?' + item + '=' + startPatams[item];
                }
            }
        }
    }
    if(paramsUrl){
        projectLink = projectLink + paramsUrl;
    }
    // if(projectLink) window.open(projectLink);
    if(projectLink){
        var fn=function (){
            window.open(projectLink);
            swal_close();
        }
        // msg 提示信息   type 提示类型   title 提示头部信息
        newAlert(`<div style = "width: 95%">
                    <p>
                        您已生成了一个快捷分享，该分享链接24小时有效。若希望生成更长久的分享链接，
                        请到菜单“项目-分享设置”中设置。
                    </p>
                    <br/>
                    <p class = "sample-test-content-text">
                        链接：<a style="color:rgb(204, 204, 204)" onMouseOver="this.style.backgroundColor='#ff7f00',this.style.color='#fff'" onMouseOut="this.style.backgroundColor='transparent',this.style.color='rgb(204, 204, 204)'" href = '${projectLink}' target="_blank">${projectLink}</a>
                        <input class="share-url-copy" value="` + projectLink + `" style = "position:absolute;z-index:-100;opacity: 0;">
                        <span class="text" style = "height: 22px;line-height: 11px;padding: 5px 4px 6px 4px;margin: 0;" onclick="copyLinks(this)" title="复制">
                            <i class="iconfont icon-caozuo_fuzhi"></i>
                        </span>
                    </p>
                </div>`,
                'warning',
                '温馨提示',fn,null,null,'shari');
    }
    
}

//参数加密
function encipherParamQuickShare(param){
    var startParams = "";
    $.ajax({
        url: '/api/createString',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType:"application/json;charset=utf-8",
        async: false,
        success: function(data){
           if(data.code == 200){
                startParams = data.data;
           }
        }
    })
    return startParams;
}

//检查项目名称重新命名 如果重名后面加（*）* => 1\2\3
function createProjectName(n, list) {
    function check(name) {
        let n = name.match(/[^\.]*/)[0];
        return function (a) {
            return a.indexOf(n) == 0;
        }
    }
    list = list.filter(check(n));
    let on = n.match(/([^\.]*)(.*)/);
    if (on.length != 3) {
        console.log('文件名不带后缀:' + n);
        return '';
    }
    // 重名文件最多10000个
    for (let i = 1; i < 10000; i++) {
        let nn = on[1] + '(' + String(i) + ')';
        if (!list.find((element) => (element == nn + on[2])))
            return nn + on[2];
    }
    console.log('项目数量过多错误');
    return ''
}
async function previewImage(url,data=null) {
    // var url=$(dom).data('url');
    //显示title
    // var title=$(dom).data('url').match('[^/]+(?!.*/)');
    $('.editor_img').remove();
    var editorWidth=$("#editor").width();
    let nameType = url.split('.').pop()
    if(url && (nameType === 'jpg' || nameType === 'jpeg' || nameType === 'png' ||  nameType === 'gif' || nameType === 'ico')) {
        if(nameType === 'ico'){
            var img=`<div class='editor_img' style='position: absolute;display: flex;height: calc(100% - 96px);background-color: rgb(30, 30, 30);top: 59px;width:`+editorWidth+`px';>
                <div style='background-color: #c6c6c6b5;display: flex;flex-direction: column;position: relative;margin: auto;max-width: 100%;max-height: 100%;overflow: auto;box-shadow: 0 2px 8px #000;'>
                    <div style='max-height: calc(100% - 20px);'>
                    <img src='`+(decodeURIComponent(path+url)+'?'+Math.round(Math.random()*100))+`'/>
                    </div>
                </div>
            </div>`;
        }else{
            var img=`<div class='editor_img' style='position: absolute;display: flex;height: calc(100% - 96px);background-color: rgb(30, 30, 30);top: 59px;width:`+editorWidth+`px';>
                <div style='background-color: #c6c6c6b5;display: flex;flex-direction: column;position: relative;margin: auto;max-width: 100%;max-height: 100%;overflow: auto;box-shadow: 0 2px 8px #000;'>
                    <div style='max-height: calc(100% - 20px);'>
                    <img src='`+(decodeURIComponent(path+url)+'?'+Math.round(Math.random()*100))+`' style = "display:none"/>
                    </div>
                </div>
            </div>`;
        }
        await $('body #editor').after($(img));
        $('body .editor_img img')[0].onload=function(){
            let imgWhidth = $('body .editor_img img').width()
            let imgHeight = $('body .editor_img img').height()
            if(imgWhidth >= imgHeight){
                $('body .editor_img img').css('min-width','320px')
                $('body .editor_img img').css('max-height','350px')
                $('body .editor_img img').show()
            }else{
                if(imgHeight > 780){
                    $('body .editor_img img').css('max-height','780px')
                    $('body .editor_img img').css('max-width','auto')
                    $('body .editor_img img').show()
                }else{
                    $('body .editor_img img').css('min-width','320px')
                    $('body .editor_img img').css('max-height','auto')
                    $('body .editor_img img').show()
                }
            }
        }
        return
    }
    if(url && nameType === 'mp4'){
        var img=`<div class='editor_img' style='position: absolute;display: flex;height: calc(100% - 96px);background-color: rgb(30, 30, 30);top: 59px;width:`+editorWidth+`px';>
            <div style='background-color: #c6c6c6b5;display: flex;flex-direction: column;position: relative;margin: auto;max-width: 80%;max-height: 100%;overflow: auto;box-shadow: 0 2px 8px #000;'>
                <div style='max-height: calc(100% - 20px);'>
                <video style = "width: 100%;" preload="" muted="" controls="">
                    <source src="`+(decodeURIComponent(path+url)+'?'+Math.round(Math.random()*100))+`" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                </div>
            </div>
        </div>`;
        $('body #editor').after($(img));
        return
    }
    if(url && nameType === 'mp3'){
        var img=`<div class='editor_img' style='position: absolute;display: flex;height: calc(100% - 96px);background-color: rgb(30, 30, 30);top: 59px;width:`+editorWidth+`px';>
            <div style='display: flex;flex-direction: column;position: relative;margin: auto;max-width: 80%;max-height: 100%;overflow: auto;'>
                <div style='max-height: calc(100% - 20px);'>
                <audio controls>
                    <source src="`+(decodeURIComponent(path+url)+'?'+Math.round(Math.random()*100))+`" type="audio/ogg">
                    Your browser does not support the video tag.
                </video>
                </div>
            </div>
        </div>`;
        $('body #editor').after($(img));
        return
    }
    if(url&&nameType=='svg'&&data) {
        var img=`<div class='editor_img' style='position: absolute;display: flex;height: calc(100% - 96px);background-color: rgb(30, 30, 30);top: 59px;width:`+editorWidth+`px';>
            <div style='background-color: #c6c6c6b5;display: flex;flex-direction: column;position: relative;margin: auto;max-width: 80%;max-height: 100%;overflow: auto;box-shadow: 0 2px 8px #000;'>
                <div style='max-height: calc(100% - 20px);'>`+data+`
                </div>
            </div>
        </div>`;
        $('body #editor').after($(img));
        return
    }
}
function preViewClose(){
    $('.editor_img').remove();
}
const checkLoginForSample=()=>{
    var p = new Promise(function (resolve, reject) {
        var login=false;
        if(getCookie('token')&&getCookie('openid')) {
            $.ajax({
                url: "/api/sample/User_info",
                type: "GET",
                processData: false,
                contentType: false,
                async: false,
                success: function (result) {
                    var time = new Date().Format('yyyy-MM-dd');
                    if (result == '用户不存在'||(result.code&&result==500)) {
                    } else {
                        if(result.client_id&&result.client_id=='rootcloud') {
                            $('.setting1_1').children().not('.btn-mx,.btn-yq,.btn-city').remove();
                        }
                        if(result.permission == 'developer') {
                            $(".user_msg .m-avataruploader-imagewrapper").addClass('bordervip');
                            $('#headimg').addClass('bordervip');
                            $('#headimgs').addClass('bordervip');
                        }
                        if(result.isVipPro) {
                            $('.vip').addClass('svip');
                            $(".user_msg .m-avataruploader-imagewrapper").addClass('svip');
                            $('#headimg').addClass('svip');
                            $('#headimgs').addClass('svip');
                        }
                        if (typeof(time)!='undefined'&&new Date(result.lastlogin).Format('yyyy-MM-dd') == time) {
                            login=true;
                            if(!result.permission == getCookie('role')) {
                                setCookie('role',result.permission); 
                            }
                            if (result.token != getCookie('token')) {
                                setCookie('token',result.token);                            
                            }
                        }
                    }
                },
                error: function (result) {}
            });
        }
        if(!login) {
            let closeLogin=()=>new Promise(function (resolve, reject) {
                fadeOut();loginclose();
                resolve();
            });
            closeLogin().then(()=>{
                var f1 = function () {
                    swal_close();
                    clearAllCookie();
                    loginwindowon();
                };
                newConfirm('登录已过期，是否重新登录？', ['确认', '取消'], [f1, swal_close]);
            });
        }
        resolve(login);
    });
    return p;
}
const getCodeHistory = function (dom){
    if(!getCookie('openid') || !getCookie('token') || !getCookie('mmdId')) {
        clearAllCookie();
        loginwindowon();
        return;
    }
    var data=$(dom).data();
    if(getCookie('role')!='developer') {
        return alert('代码历史仅对VIP用户开放');
    }
    if(data&&data.url&&data.nameBefore&&getCookie('openid')) {
        var uid=encodeURIComponent(getUidByPath(data.url));
        var openid=getCookie('openid');
        try {
            openid=decodeURIComponent(openid);
            uid=decodeURIComponent(uid);
        } catch (error) {}
        if(uid==openid&&getCookie('role')=='developer') {
            showIframeLoad('代码历史正在加载中...');
            if($('.iframePanel iframe#iframeBody').length) {
                $('.iframePanel iframe#iframeBody').remove();
                $('.iframePanel').css({'left':''});
                $('.wrapper-sam.sam-new .content .content-nav').css({'z-index':''});
            }
            $('.iframePanel').append(`<iframe id="iframeBody" onload='hideheader(this)' src="/admin/#/Code?jsname=`+data.nameBefore+`&isPro=`+$($(dom)).data('isPro')+`&version=`+$($(dom)).data('version')+`&sampleIframe=true&n=`+ parseInt(Math.random() * 1000)+`" scrolling="no" frameborder="0"></iframe>`);
            return;
        } else {
            if(getCookie('role')!='developer') {
                return alert('代码历史仅对VIP用户开放');
            }
            if(uid!=openid) {
                return alert('协作项目不允许查看代码历史');
            }
        }
    }
}
const deposit=function(name,url,isPro,type) {
    // isPro => 1 已部署 0 未部署
    var qrcodeUrl=null;
    if(!url&&url.indexOf('http')==0) {
        qrcodeUrl=this.path.substr(0,path.length) + url;
    }
    if(isPro){
        getProject(name,qrcodeUrl||url,type);
      return;
    }
    getPayhtml(type,'jsname',name,qrcodeUrl||url);
    $("#pay-mb-out").show();
};
//获取托管项目
const getProject=function(name,url,type) {
    var formCustom={};
    var qrcodeUrl=null;
    if(!url&&url.indexOf('http')==0) {
        qrcodeUrl=this.path.substr(0,path.length) + url;
    }
    url=qrcodeUrl||url;
    $.ajax({
        url: '/api/user_query/project',
        type: 'post',
        data: JSON.stringify({
            where : {
                prj_jsname:name
            }
        }),
        dataType: 'json',
        contentType:"application/json;charset=utf-8",
        success: function(res){
            if(res.count == 0) {
                getPayhtml(type,'jsname',name,url);
                return;
            }
            formCustom = res.rows[0];
            formCustom.lines=res.rows[0].lines;
            formCustom.prj_time=new Date(res.rows[0].prj_time).Format('yyyy-MM-dd hh:mm:ss');
            formCustom.prj_end=new Date(res.rows[0].prj_end).Format('yyyy-MM-dd hh:mm:ss');
            formCustom.qrcodeUrl= path.substr(0,_self.path.length-1) + url;
            let f1=function(){
                    if (formCustom.prj_jsname && formCustom.qrcodeUrl) {
                        getPayhtml(type||'ThingJS_Package','jsname',formCustom.prj_jsname,formCustom.qrcodeUrl);
                        $("#pay-mb-out").show();
                        return
                    } else {
                        newAlert('请求失败')
                    }
            };
            let f2=function(){
                swal_close();
            };
            newInfos('<p style="margin-bottom:10px;display:flex;"><span style="vertical-align: middle;float: left;font-size: 12px;color: #c6c6c6;line-height: 1;padding: 10px 12px 10px 0;box-sizing: border-box;width:70px;text-align:left;">ID</span><input type="text" style="border: 1px solid #4d5153;background-color: #1c1f20;-webkit-text-fill-color: #c6c6c6;display: inline-block;width: 340px;height: 32px;line-height: 1.5;padding: 4px 7px;font-size: 12px;border-radius: 4px;position: relative;cursor: text;" readonly placeholder='+ formCustom.prj_id+'></p><p style="margin-bottom:10px;display:flex;"><span style="vertical-align: middle;float: left;font-size: 12px;color: #c6c6c6;line-height: 1;padding: 10px 12px 10px 0;box-sizing: border-box;width:70px;">名称</span><input type="text" style="border: 1px solid #4d5153;background-color: #1c1f20;-webkit-text-fill-color: #c6c6c6;display: inline-block;width: 340px;height: 32px;line-height: 1.5;padding: 4px 7px;font-size: 12px;border-radius: 4px;position: relative;cursor: text;" readonly placeholder='+formCustom.prj_jsname+'></p><p style="margin-bottom:10px;display:flex;"><span style="vertical-align: middle;float: left;font-size: 12px;color: #c6c6c6;line-height: 1;padding: 10px 12px 10px 0;box-sizing: border-box;width:70px;text-align:left;">打包时间</span><input type="text" style="border: 1px solid #4d5153;background-color: #1c1f20;-webkit-text-fill-color: #c6c6c6;display: inline-block;width: 340px;height: 32px;line-height: 1.5;padding: 4px 7px;font-size: 12px;border-radius: 4px;position: relative;cursor: text;" readonly placeholder="'+formCustom.prj_time+'"></p><p style="display:flex;"><span style="vertical-align: middle;float: left;font-size: 12px;color: #c6c6c6;line-height: 1;padding: 10px 12px 10px 0;box-sizing: border-box;width:70px;">有效期</span><input type="text" style="border: 1px solid #4d5153;background-color: #1c1f20;-webkit-text-fill-color: #c6c6c6;display: inline-block;width: 340px;height: 32px;line-height: 1.5;padding: 4px 7px;font-size: 12px;border-radius: 4px;position: relative;cursor: text;" readonly placeholder="'+formCustom.prj_end+'"></p>',['续费','取消'],[f1,f2],'attribute');
        },
        error:function(err){
            getError(err.response.status);
        } 
    })
  }
// 调用支付页面
const getPayhtml=function(subject,key,value,qrcodeUrl){
    var endTime = '';
    $.ajax({
        url: '/api/user_query/project',
        type: 'post',
        data: JSON.stringify({
            where : {
                prj_jsname:value
            }
        }),
        dataType: 'json',
        contentType:"application/json;charset=utf-8",
        async: false,
        success: function(message){
            if(message.rows.length>0){
                endTime = new Date(message.rows[message.rows.length-1].prj_end).Format('yyyy-MM-dd hh:mm:ss');
            }
        }
    })
    var userId =$.cookie('mmdId');
    var data = {
        'title':'在线部署',
        'imgsrc':window.location.protocol + "//" +'www.thingjs.com/static/payment/createPay/images/zxbs_nian.png',
        'describe':'<span class="_title">在线部署有效期：</span><br/><br/>'+getNowFormatDateForDeploy(endTime,0)+' - '+getNowFormatDateForDeploy(endTime,1,-1)+"。",
        'price':2888,
        'id':userId,
        'type':subject,
        'sceneId':value,
        'paySource': window.location.href,
    }
    if(subject == "ThingJS_Package_Q"){
      data.title = "在线部署（季）";
      data.imgsrc=window.location.protocol + "//" + 'www.thingjs.com/static/payment/createPay/images/zxbs_ji.png',
      data.describe = '<span class="_title">在线部署有效期：</span><br/><br/>'+getNowFormatDateForDeploy(endTime,0)+' - '+getNowFormatDateForDeploy(endTime,0.3,-1)+"。";
      data.price = 988;
    }
    layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        area: ['585px', '568px'],
        // content: ['../../../guide/0726/payment.html?type=ThingJS_Package&userId='+userId,'no'],
        content: ['https://www.thingjs.com/static/payment/createPay/payment.html?type='+subject+'&userId='+userId,'no'],
        skin: 'buyModelDiv',
        success:function(){
            document.getElementsByClassName('buyModelDiv')[0].children[0].children[0].contentWindow.postMessage(data,'*');
        }
    });
    window.addEventListener('message',function(event){
      if(event.data&&event.data.type&&event.data.type=="newStyle") {
          $(".buyModelDiv").css({"border-radius":"8px","background-color": "transparent"});
          $(".buyModelDiv iframe").css("border-radius","8px");
      }
        if (event.data == 'closeWin') {
            $('#pay-mb-out').hide();
            window.location.reload();
            window.parent.postMessage({
              auth: '购买在线部署成功',
              titleName: '在线部署'
            },'*');
        }
        if (event.data == 'close') {
          $('#pay-mb-out').hide();
            layer.closeAll();
        }
    });
  }
const getNowFormatDateForDeploy=function (endTime,next,day) {
    var date;
    var _index = endTime.indexOf("1970");
    if(endTime && _index!=0){
      date = new Date(endTime);
    }else{
      date = new Date();
    }  
    if(next<1){
      date.toLocaleString(date.setMonth(date.getMonth()+ (next*10)));
    }else{
      date.toLocaleString(date.setFullYear(date.getFullYear()+next));
    }
    
    date.setDate(date.getDate()+(day||0));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate(); 

    var currentdate = year +'年'+ month+'月'+ strDate+'日';
    return currentdate;
  }
function confirmOffline(){
    var liOpen = $('#list1 li[class="lifile active"]');
    var liResOpen = $('#list1 li[class="lifileResoure lifile active"]');
    if (liOpen.length >= 0 && liResOpen.length == 1) liOpen = liResOpen;
    if ($('.filen').is(':visible') &&
        $('#bfilen').data('nameBefore').length > 0 &&
        $('.filen-active .filen-edit').is(':hidden')) {
            subject = 'ThingJS_Package';
            jsname = $('#bfilen').data('nameBefore');
            $("#deploy_box").show(); 
            $("#deploy_box").append(`<img class="loadingDeploy" src="/guide/image/loading2.gif" style="position: relative;top: calc(50% - 25px);left: calc(50% - 25px);width:50px;height:50px;">`);
            $("#deploy_iframe").css({'width': '1090px','height': '477px','transform': 'translate(-475px,-238px)','position': 'fixed',
            'top': '50%', 'left': '50%' });
            $("#deploy_iframe").attr("src",window.location.protocol + "//" + window.location.host + '/admin/#/Deploy?name='+jsname+'&n='+Math.ceil(Math.random()*1000));
        }else{
            newAlert('请先保存文件','warning');
        }
}
function releaseProjectNew(dom,ifServer,ele){
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var checkValue = $(dom).attr('value');
    var data=$(dom).data();
    $("#release_page").remove();
    var uid=encodeURIComponent(getUidByPath(data.url));
    var openid=getCookie('openid');
    try {
        openid=decodeURIComponent(openid);
        uid=decodeURIComponent(uid);
    } catch (error) {}
    if(uid!=openid){
        return alert('协作项目不允许使用该功能');
    }
    // if (ifServer!=3&&(!$('.filen').is(':visible') ||
    //     $('#bfilen').data('nameBefore').length <= 0 ||!$('.filen-active .filen-edit').is(':hidden'))) newAlert('请先保存文件！', 'warning');
    if(checkValue == "在线部署"){
        // releasePro();
        // var msg = {title:'在线部署'};
        // camInfoServer("releasePro",msg);
        if($(".curList .teamleader.active").length || $(".curList .team.active").length){
            newAlert('协作开发项目不支持在线部署','warning');
            return;
        }
        deposit(data.nameBefore,data.url,data.isPro,'ThingJS_Package')
    }else if(checkValue == "在线部署季"){
        // var msg = {title:'在线部署（季）'};
        // camInfoServer("releasePro_Q",msg);
        deposit(data.nameBefore,data.url,data.isPro,'ThingJS_Package_Q')
    }else if(checkValue == "离线部署"){
        if(ifServer==3){
            //校验权限
            if (PERMISSIONCONFIG.getPermission('下载项目离线开发包')) {
                confirmOfflineDev(ele);
            } else {
                alert("该功能仅对离线开发包正式用户有效！","warning");
                return;
            }
            // $.ajax({
            //     // url:'/api/hasRole',
            //     url: '/api/getAuthOfflineRole',
            //     // url: 'https://www.thingjs.com/uinapi/user/hasRole',
            //     type: 'get',
            //     headers: {
            //         Authorization: 'Bearer ' + $.cookie('accessToken'),
            //     },
            //     data:{
            //         "mmdId":getCookie('mmdId'),
            //         "roleName":"下载项目离线开发包"
            //     },
            //     dataType: 'json',
            //     success: function (data) {
            //         if(data && data.success){
            //             confirmOfflineDev(ele);
            //         }else{
            //             alert("该功能仅对离线开发包正式用户有效！","warning");
            //             return;
            //         }
            //     },error:function(e) {
            //         if(e.status==401) {
            //             clearAllCookie();
            //             loginwindowon();
            //         }
            //     }
            // })
            return;
        }
        $.ajax({
            url:'/api/getOllineAuth',
            type:'get',
            success:function(res) {
                if(res.code==200) {
                    // confirmOffline(); 
                    $('#content_sample .btn-down').trigger('click');
                } else {
                    alert("请先升级为商业开发者！","warning");
                }
            },error:function(err) {
                alert("请先升级为商业开发者！","warning");
            }
        })
        // if( getCookie("role") =='developer' ){//是vip 
        //     confirmOffline(); 
        // }else{ 
        //     // alert('请购买VIP获取离线试用\n或直接联系客服了解离线正式版价格');
        //     // 如果是离线部署用户也可打包
        //     $.ajax({
        //         // url: path+'/uinapi/user/hasRole',
        //         url: 'https://www.thingjs.com/uinapi/user/hasRole',
        //         type: 'post',
        //         headers: {
        //             Authorization: 'Bearer ' + $.cookie('accessToken'),
        //         },
        //         data:{
        //             "mmdId":getCookie('mmdId'),
        //             "roleName":"离线部署（永久）打包授权"
        //         },
        //         dataType: 'json',
        //         async:false,
        //         success: function (data) {
        //             if(data && data.success){
        //                 confirmOffline();
        //                 return;
        //             }else{
        //                 alert("请先升级为商业开发者！","warning")
        //             }
        //         },
        //         error:function(e){
        //             if(e.status==401) {
        //                 clearAllCookie();
        //                 loginwindowon();
        //                 return;
        //             }
        //             alert("请先升级为商业开发者！","warning")
        //         }
        //     })
        // }
    }
}
function confirmOfflineDev(ele){
    var subject = 'ThingJS_Package';
    var jsname = $($(ele).siblings('.siyou-item')).data('name');
    if(!jsname) return;
    $("#deploy_box").show(); 
    $("#deploy_box").append(`<img class="loadingDeploy" src="/guide/image/loading2.gif" style="position: relative;top: calc(50% - 25px);left: calc(50% - 25px);width:50px;height:50px;">`);
    // $("#deploy_iframe").css({'width': '1090px','height': '477px','transform': 'translate(-290px,-200px)'});
    $("#deploy_iframe").css({'width': '1030px','height': '477px','transform': 'translate(-475px,-238px)'});
    $("#deploy_iframe").attr("src",window.location.protocol + "//" + window.location.host + '/admin/#/Deploy?name='+jsname + '&ifServer=3+&n='+Math.ceil(Math.random()*1000));
}

function showRendering(type){
    if(type){
        $(".con_list.tool .cloudRendering").hide();
        return;
    }
    if(!$(".con_list.tool .cloudRendering").length) return;
    if(!getCookie('mmdId')) return;
    if (PERMISSIONCONFIG.getPermission('api内测')) {
        $(".con_list.tool .cloudRendering").css('display','flex');
    } else {
        $(".con_list.tool .cloudRendering").hide();
    }
    if(PERMISSIONCONFIG.getPermission('创建标记项目')) {
        var html=`<li class="con_item" onclick="createSignProject()"><span class="con_name">新建标记项目</span></li>`;
        $('.sam_menu .menu_item[data-menu="file"] .con_list .con_item[onclick="createSignProject()"]').remove();
        $('.sam_menu .menu_item[data-menu="file"] .con_list .con_item:first').after(html);
    }
    // $.ajax({
    //     url:'/api/hasRole',
    //     type: 'post',
    //     headers: {
    //         Authorization: 'Bearer ' + $.cookie('accessToken'),
    //         },
    //     data:{
    //         "mmdId":getCookie('mmdId'),
    //         "roleName":"api内测"
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         try {
    //             if(data && data.success){
    //                 $(".con_list.tool .cloudRendering").css('display','flex');
    //             }else{
    //                 $(".con_list.tool .cloudRendering").hide();
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },error:function(e) {
    //         if(e.status==401) {
    //             clearAllCookie();
    //             loginwindowon();
    //             return;
    //         }
    //         $(".con_list.tool .cloudRendering").hide();
    //     }
    // })
}
// 协作项目文件编辑占用状态
const setEditStatus=(item,editStatus)=>{
    try {      
        if($(item).parents('.rename .team-item').length) {
            let _data=$(item).parents('.rename .team-item').data();
            // 1进入编辑，2退出编辑，3解除占用
            if(editStatus&&_data.editStatus&&editStatus==_data.editStatus) {
                let path=$(_data.li).data('url');
                let pname=$(_data.li).data('name');
                let fpath=_data.url;
                let mainFile = false;//是否为主文件
                let isProLeader = false;//是否为协作项目领导者
                if($(_data.li).hasClass('teamleader')) isProLeader=true;
                if(fpath == path) mainFile=true;
                let _errorMsg='文件占用失败';
                let _title='是否进入编辑？'
                if(editStatus==2) {
                    _errorMsg='文件占用状态解除失败';
                    _title='是否退出编辑？'
                }
                if(editStatus==3) {
                    _errorMsg='文件占用状态解除失败';
                    _title='是否解除文件占用？'
                }
                if(editStatus==1||editStatus==2) {
                    var f1=function(){
                        swal_close();
                        let _url='/api/changeTeamFileEditState';
                        let _editData={
                            fpath:fpath,
                            path:path,
                            pname:pname
                        };
                        // 进入编辑|退出编辑
                        fetch(_url, {
                            method: "post",
                            body: JSON.stringify(_editData)
                        }).then(res => res.json())
                        .then(res => {
                            if(res.code==200) {
                                getTeamOccupyFile(false);                            
                                if(res.state == 1){//进入文件占用状态
                                    changeTeamFileState(fpath,true,mainFile,isProLeader,pname);
                                }else if(res.state == 2){   
                                    // 退出文件占用状态
                                    changeTeamFileState(fpath,false,mainFile,isProLeader,pname);
                                }
                            } else {
                                alert(res.message||_errorMsg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                    newConfirm(_title,['确定','取消'],[f1,swal_close]);
                    
                } else if(editStatus==3&&isProLeader) {
                    var f1=function(){
                        swal_close();
                        let tempstate = 2;
                        if($(_data.item).hasClass('teamOccupy')) tempstate=1;
                        let _editData={
                            fpath:fpath,
                            path:path,
                            tempstate:tempstate
                        };
                        let _url='/api/forceCancelEditState';
                        fetch(_url, {
                            method: "post",
                            body: JSON.stringify(_editData)
                        }).then(res => res.json())
                        .then(res => {
                            if(res.code==200) {
                                getTeamOccupyFile(false);                            
                                // 退出文件占用状态
                                changeTeamFileState(fpath,false,mainFile,isProLeader,pname);
                            } else {
                                alert(res.message||_errorMsg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                    newConfirm(_title,['确定','取消'],[f1,swal_close]);
                } else {}
            }   
        }  
    } catch (error) {
        console.log(error);
    }
}