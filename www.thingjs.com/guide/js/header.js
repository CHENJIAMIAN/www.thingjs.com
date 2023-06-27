const COOKIE_LIST = ['role', 'token', 'name', 'openid', 'id', 'accessToken', 'dix_token', 'dix_id', 'mmdId', 'particleRole', 'headimgurl', 'userNick', 'tel', 'email', 'type', 'sceneOid', 'sceneMid', 'user_id','client_id','debugSwitch','switchmenu','switchlog','layoutSelect','ssoAccessToken','refreshToken','SameSite','Secure','thingJsAccessToken','JSESSIONID','dcvRole','sketchUser','musics','thingJsToken','skyboxes','popUp','sso_token','refresh_token'];
const MMDUserAPIUrl = "https://www.thingjs.com/uinoUser";
const SERVERPATH = location.host.indexOf('www.3dmmd.cn')==-1&&(location.host == 'store.thingjs.com' || location.host == 'store.thingjs.com:3000' || location.port != ''||location.pathname.indexOf('/thingjs-x/')!=-1) ? 'https://www.thingjs.com' : '';
var CLIENTID="";
var userpath;
var headimgurl;
var loginTime;
var tid2 = null;
var timeS = 59;
var timeR = null;
var timeS1 = 59;
var timeR1 = null;
var timeoutid = null;
var storage = window.localStorage;
var flag = storage.flag;
//记录打开登录框来源信息
var loginSource = '';
// 配置弹窗样式
try {
    layer.config({
        path: window.location.protocol+'://'+window.location.host+'/guide/lib/layui/', //全局配置样式
        extend: '../../newStyle.css'
    });
} catch (e) {
    console.warn(e);
}
$(function () {
    init();
    //顶导用户名样式
    var flagLogin = $("#login").html();
    if (flagLogin == "登录") {
        $("#login").css("color", "#fff");
    } else {
        if((location.search =="" || location.search == '?m=main'|| location.search == '?m=mainNew'|| location.search == '?m=city2') && (location.pathname=='/guide/' || location.pathname=='/guide/main/')){
            $("#login").css("color", "#fff");
            $("#sub-site-nav .nav-link > a").css("color", "#fff");
        }else {
            $("#login").css("color", "#000");
        }
        $("#login").css("line-height", "28px!important");
    }
    if (SERVERPATH) {
        if(typeof(initEject)!='undefined') initEject();
    } else {
        isLogin();
    }
});
$(".campusLi").mouseover(function () {
    $(".campusUl").css("display", "block");
});
//协议弹窗
var agreedAgr1 = false;
var agreedAgr2 = false;
function openService() {
    var width = '750px';
    var height = '600px';
    var ismove = false;
    var couldClose = false;
    var timeStart = 5;
    var timeEnd;
    if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    width = '380px';
    // width = '7.2rem';
    height = '420px';
    }
    layer.open({
        type: 2,
        move: false,
        title: false,
        closeBtn: 0,
        shade:0,
        // scrollbar: false,
        area: [width, height],
        resize: false,
        btn: '同意协议 ( 5s )',
        btnAlign: 'c',
        content:['https://www.thingjs.com/guide/html/agreements/protocal_new.html'],
        skin: 'pageClass',
        success: function () {
            // $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').attr('disabled', true);
            $(".layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn").addClass('active-style');
            $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').css('opacity', '.35').css('cursor', 'no-drop');
            timeEnd = setInterval(function () {
                if (timeStart > 0) {
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').text('同意协议 ( 5s )');
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').text('同意协议 ( '+timeStart+'s )');
                    timeStart--;
                } else {
                    clearInterval(timeEnd);
                    $(".layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn").removeClass('active-style');
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').text('同意协议');
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn').addClass('active-N');
                    couldClose =true;
                }
            }, 1000)
            window.addEventListener ('message', function(event) {
                if(event.data&&event.data=="close") {
                    clearInterval(timeEnd);
                    layer.closeAll();
                }
                },true);
            },
            btn1:function(){
                if(!couldClose) {
                    return
                }
                agreedAgr1 = true;
                checkagreed();
                layer.closeAll();
            },
            cancel: function(){
                layer.closeAll();
            }
    });
}
function openPrivacy() {
    var width = '750px';
    var height = '600px';
    var couldClose = false;
    var timeStart = 5;
    var timeEnd;
    if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    width = '380px';
    // width = '7.2rem';
    height = '420px';
    }
    layer.open({
        type: 2,
        move: false,
        title: false,
        closeBtn: 0,
        shade:0,
        // scrollbar: false,
        area: [width, height],
        resize: false,
        btn: '同意协议 ( 5s )',
        btnAlign: 'c',
        content:['https://www.thingjs.com/guide/html/agreements/serve_new.html'],
        skin: 'pageClass',
        success: function () {
            $(".layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn").addClass('active-style');
            $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').css('opacity', '.35').css('cursor', 'no-drop');
            timeEnd = setInterval(function () {
                if (timeStart > 0) {
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').text('同意协议 ( 5s )');
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').text('同意协议 ( '+timeStart+'s )');
                    timeStart--;
                } else {
                    clearInterval(timeEnd);
                    $(".layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn").removeClass('active-style');
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn0').text('同意协议');
                    $('.layui-layer.layui-layer-iframe.layui-layer-border.pageClass .layui-layer-btn').addClass('active-N');
                    couldClose =true;
                }
            }, 1000)
            window.addEventListener ('message', function(event) {
                clearInterval(timeEnd);
                if(event.data&&event.data=="close") {
                    layer.closeAll();
                }
            },true);
            },
            btn1:function(){
                if(!couldClose) {
                    return
                }
                agreedAgr2 = true;
                checkagreed();
                layer.closeAll();
            },
            cancel: function(){
                layer.closeAll();
            }
    });
}
function checkagreed() {
    var isCheckedAgr = $("#checkCircle:checked").length?true:false;
    if(isCheckedAgr ) {
    return;
    }else {
    if(agreedAgr1&&agreedAgr2) {
        $("#checkCircle").prop('checked',true)
        }
    }
}
function checkAgr() {
    var isCheckedAgr = $("#checkCircle:checked").length?true:false;
    if(!isCheckedAgr) {
        agreedAgr1 = false;
        agreedAgr2 = false;
    }
}
/**2019-6-18 修改
* 修改鼠标进入/离开导航栏中产品的事件
* 新增一个判断方法，使得在新手教程下屏蔽其中不需要的方法
*/
$(".campusLi").mouseout(function () {
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
    } else {
        $('.campusUl').css('display', 'none');
    }
});
function getQueryString(name) {
    var result = window.location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    if (result[1].indexOf("#") > 0) {
        result[1] = result[1].substring(0, result[1].indexOf("#"));
    }
    return result[1];
}
function getUserName(name) {
    if (!name) return null;
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var arr1, reg1 = new RegExp("(^| )" + 'openid' + "=([^;]*)(;|$)");
    var arr2, reg2 = new RegExp("(^| )" + 'headimgurl' + "=([^;]*)(;|$)");
    if (arr1 = document.cookie.match(reg1)) {
        if (arr = document.cookie.match(reg)) {
            userpath = '/uploads/wechat/' + unescape(arr1[2]);
            if (arr2 = document.cookie.match(reg2)) {
                headimgurl = unescape(arr2[2])
                //return Base64.decode(unescape(arr[2]));
                var returnName = '';
                try {
                    returnName = decodeURI(arr[2]);
                } catch (error) {
                    return arr[2];
                }
                try {
                    var returnName2 = decodeURI(returnName);
                } catch (error) {
                    return returnName;
                }
                return returnName2;
            }
        } else
            return null;
    } else {
        if (arr = document.cookie.match(reg)) {
            userpath = '/uploads/moni/' + unescape(arr[2]);
            return unescape(arr[2]);
        } else
            return null;
    }
}
// 获取当前日期
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function init() {
    try {
        delThingJsAccessToken();
    } catch (error) {
        console.log(error);
        const delThingJsAccessToken = function(){
            if(getCookie&&getCookie('thingJsAccessToken')&&setCookie) {
                setCookie('thingJsAccessToken', '');
            }
        }
        delThingJsAccessToken();
    }
    
    if (!SERVERPATH) {
        if (getQueryString("m")) {
            if (getQueryString("m") == 'sample' || getQueryString("m") == 'sample_old') {
                var opencodeid = getQueryString("c");
                var secneurl = parseSecneUrl(decodeURIComponent(getQueryString("i")));
                var fileNa = getQueryString("f");
                var projectUrl = getQueryString("o");
                var cityUrl = getQueryString("cbuilder");
                var style = getQueryString("style");
                if (opencodeid) {
                    var u = null;
                    // ***一下要求例子必须以sample_的命名 ***
                    if (opencodeid.slice(0, 7) == 'sample_') {
                        u = './examples/js/' + opencodeid + '.js';
                    } else {
                        u = '../../../demos/' + opencodeid + '/js/' + opencodeid + '.js';
                    }

                    onMenu('sample', u, '#' + opencodeid);
                } else if (secneurl) {
                    if (secneurl == '0') {
                        app_code = '';
                    } else {
                        if (style == 'TechBlue') {
                            var sky = "BlueSky";
                            if (getQueryString("sky")) sky = getQueryString("sky");
                            app_code = '\/\/加载场景代码\nvar app = new THING.App({ \n    \/\/ 场景地址\n    "url": "'
                                + secneurl
                                + '",\n    \/\/背景设置\n    "skyBox" : "' + sky +
                                '",\n    \/\/科幻风格\n    "complete" :function(){ \n        app.root.campuses[0].changeStyle("TechBlue");\n    }\n});';
                        } else {
                            var sky = "BlueSky";
                            if (getQueryString("sky")) sky = getQueryString("sky");
                            app_code = '\/\/加载场景代码\nvar app = new THING.App({ \n    \/\/ 场景地址\n    "url": "'
                                + secneurl
                                + '",\n    \/\/背景设置\n    "skyBox" : "' + sky +
                                '"\n});';
                        }
                    }
                    onMenu('sample', './examples/js/sample_01_Hello.js', 1);
                } else if (fileNa) {
                    var filePath = '/uploads/wechat/' + getUserName('openid') + '/' + fileNa + '.js';
                    onMenu('sample', path + filePath, 1);
                } else if (cityUrl) {
                    cityUrl = '/guide/?m=sample&cbuilder=myProduct'
                    onMenu('sample', path + cityUrl, 1);
                } else if (projectUrl) {
                    if (projectUrl.indexOf("./uploads") == 0) {
                        projectUrl = "." + projectUrl
                    }
                    $.ajax({
                        url: projectUrl,
                        type: 'get',
                        dataType: 'text',
                        success: function (data) {
                            app_code = data;
                            onMenu('sample', './examples/js/sample_01_Hello.js', 1);
                        }
                    })
                } else {
                    onMenu(getQueryString("m"), './examples/js/sample_01_Hello.js');
                }
            } else {
                onMenu(getQueryString("m"));
            }

        } else if (window.location.pathname != '/' && window.location.pathname != '/guide/') {
            var pathname = window.location.pathname;
            pathname = pathname.indexOf("guide/speedCityDetailPages")>-1?"/guide/speedCityDetailPages/":pathname;
            switch (pathname) {
                case "/guide/aboutUs/":
                    onMenu('aboutUs');
                    break;
                case "/guide/price/":
                    onMenu('price');
                    break;
                case "/guide/granary/":
                    onMenu('granary');
                    break;
                case "/guide/port/":
                    onMenu('port');
                    break;
                case "/guide/safety/":
                    onMenu('safety');
                    break;
                case "/guide/fire/":
                    onMenu('fire');
                    break;
                case "/guide/building/":
                    onMenu('building');
                    break;
                case "/guide/pano/":
                    onMenu('pano');
                    break;
                case "/guide/speedcityshow/":
                    onMenu('speedcityshow');
                    break;
                case "/guide/mod/":
                    onMenu('mod');
                    break;
                case "/guide/city/":
                    onMenu('city');
                    break;
                case "/guide/campus/":
                    onMenu('campus');
                    break;
                case "/guide/platform/":
                    onMenu('thingjsPlatform');
                    break;
                case "/guide/main":
                    onMenu('main');
                    break;
                case "/guide/tutorial/":
                    onMenu('tutorial');
                    break;
                case "/guide/speedCityDetailPages/":
                    speed_initSDK()
                    break;
                case "/guide/store/":
                    onMenu('store');
                    break;
                case "/guide/store2/":
                    onMenu('store2');
                break;
                case "/guide/partners/":
                    onMenu('partners');
                    break;
                case "/guide/signupentry/":
                    onMenu('signupentry');
                    break;
                case "/guide/wisdomScenarioVDC/":
                    onMenu('wisdomScenarioVDC');
                    break;
                case "/guide/thingjsvideo/":
                    onMenu('thingjsvideo');
                    break;
                case "/guide/modeldetail/":
                    onMenu('modeldetail');
                    break;
                default:
                    onMenu('main');
                    break;
            }
        } else if (window.location.pathname.indexOf("admin") == -1) {
            onMenu('main');
        }
    }
    // /guide/html/speedCityDetailPages/生成的页面加上单独埋点方法
    function speed_initSDK () {
        window.AnalysysAgent.init({
            appkey: "36a2d06e80f2df66", //APPKEY
            debugMode: 0,
            uploadURL: 'https://www.thingjs.com/argo',
            visitorConfigURL: 'https://www.thingjs.com/argo', // 可视化
            /**如无自定义配置，则与uploadURL相同**/
            autoHeatmap: true, // 点击位置热图、点击元素热图
            autoWebstay: true,
            autoTrack: false, // 全埋点
            encryptType: 1, // 默认不加密0 加密1，2
            sendType:"post", // 接口上传日志
            // SDKFileDirectory: '../sdk/',       //可视化模块SDK与热图模块SDK存放目录
            autoClickBlackList: function () { //设置全埋点统计黑名单 页面地址`url`内包含'?m=sample'的页面不进行事件采集
                var url = window.location.href
                if (url.indexOf('?m=sample') > -1) {
                    return true
                }
                return false
            },
            heatMapBlackList: function () { // 设置热图黑名单 true 不进行采集; false 采集
                var url = window.location.href;
                var num = url.indexOf('://');
                var urlName = url.slice(num);
                if (urlName == '://www.thingjs.com/guide/' || urlName == '://www.thingjs.com/guide/?m=main' || urlName == '://www.thingjs.com/guide/price') {
                    return false
                }
                if (url.indexOf('/guide/?hmsr=') > -1) { // 外部链接访问
                    return false
                }
                return true
            }
        })
        window.AnalysysAgent && window.AnalysysAgent.profileSetOnce('isregistered', '否'); //默认未注册
        window.AnalysysAgent && window.AnalysysAgent.profileSet('last_access_time', new Date().Format('yyyy-MM-dd hh:mm:ss')); // 最近一次访问时间
    }
    $("#msg").click(function () {
        var openid = getCookie("openid");
        if (!openid) {
            clearAllCookie();
            window.location.href = document.location.origin;
        } else {
            if (getCookie("role") == 'admin') {
                if (getCookie("type") == '1') {
                    $(this).attr("href", "../admin/#/UserList")
                } else if (getCookie("type") == '2') {
                    $(this).attr("href", "../admin/#/State")
                }
            } else if (getCookie("openid")) {
                if (!SERVERPATH) {
                    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
                        $(this).attr("href", "../admin/#/myScene?intoTheGuide=yes");
                    } else {
                        if (getQueryString('m') == 'sample') return largePanel(null, '项目');
                        $(this).attr("href", "../admin/#/myProduct");
                    }
                } else {
                    window.open('https://www.thingjs.com/admin/#/myProduct');
                }
            }
        }
    })
    $("#sub-site-nav .nav-menu").each(function (i) {
        $(this).children(".dropdown-toggle").click(function () {
            if ($('html').width() <= 1024) {
                window.location.href = window.location.origin + window.location.pathname + $(this).attr("href");
            }
        });
        $(this).children(".dropdown-toggle").dblclick(function () {
            window.location.href = window.location.origin + window.location.pathname + $(this).attr("href");
        });
    })

    var name = getUserName('name');
    if (!name) {
        $('#dcvBtn').hide();
        setCookie("dcvRole", false);
        setCookie('popUp', false);
        $('#login').show();
        $('#login').html('登录').attr('data-log', '-1');
        $('.vipLi').hide();
        $('.vipLi .login-name').attr('data-log', '-1');
        $('.logouttwo .login-name').attr('data-log', '-1');
        $('#login').removeClass("login-active");
        $('.nav-login-two').show();
        $('#nav-reg').show();
    } else {
        if (getQueryString("back")) {
            if(getQueryString("back").indexOf('?')!='-1'){
                window.location.href = getQueryString("back")+'&token='+getCookie('token');
            }else{
                window.location.href = getQueryString("back")+'?token='+getCookie('token');
            }
            return;
        }
        if(getQueryString("return_to")) {
            var url=decodeURIComponent(getQueryString("return_to"));
            if(url.indexOf('thingjs.kf5.com')!=-1||url.indexOf('help.thingjs.com')!=-1) {
                return checkLogin(url);
            }
        }
        $('#login').html(name).attr('data-log', '1');
        $('.vipLi .login-name').html(name).attr('data-log', '1');
        $('.logouttwo .login-name').html(name).attr('data-log', '1');
        $('#login').addClass("login-active");
        $('#login').show();
        $('#msg').show();
        $('.nav-login-two').hide();
        if (getCookie('role') !== 'admin') {
            $('#informBell').show();
        } else {
            $('#informBell').hide();
        }
        $('.vipLi').show();
        $('#headimg').show();
        $('#headimgs').show();
        headimgurl=headimgurl||decodeURIComponent(
            getCookie('headimgurl'));
        try {
            headimgurl=decodeURIComponent(headimgurl);
        } catch (error) {};
        if (headimgurl.substring(0, 4) != 'http') {
            $('#headimg').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
        } else {
            $('#headimg').css({
                'background-image': 'url(' + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + headimgurl + ')'
            });
        }
        reloadHeader();
        $("#recharge").css("display", "block");
        $("#modelSer").css("display", "block");
        $("#development").css("display", "block");

        $('#nav-reg').hide();
        if (window.location.pathname != '/admin/' && !SERVERPATH) getMaxNum();
        if (getCookie("role") == 'developer') {
            $(".vip").css({
                "display": "inline"
            });
            $('#developer').hide();
        } else {
            $(".vip").css({
                "display": "none"
            });
            if (getCookie("role") == 'free') { $('#developer').css("display", "block"); }
        }
        if (!(window.location.pathname&&window.location.pathname == '/admin/')) confirmOrder();
    }
    // 是否显示课堂
    var mName = getQueryString('m');
    if (window.location.pathname != '/admin/' && window.location.pathname == '/guide/' && (mName == 'main' || mName == 'demo' || mName == '')) {
        $(".right_bottom_corner.QQ").show();
    } else {
        if(mName=='main'||mName=="") {
            $(".right_bottom_corner.QQ").show();
        } else {
            $(".right_bottom_corner.QQ").hide();
        }
    }
}
function indexlogininit(type,isVipPro,r) {
    loginTime = new Date().Format('yyyy-MM-dd');
    var name = getUserName('name');
    if (!name) {
        //退出
        $('#login').show();
        $('#login').html('登录').attr('data-log', '-1');
        $('.vipLi .login-name').attr('data-log', '-1');
        $('.logouttwo .login-name').attr('data-log', '-1');
        $('#msg').hide();
        $('#emailIcon').hide();
        $('#emailLetter').hide();
        $('#headimg').hide();
        $('#headimgs').hide();
        $('.vipLi').hide();
        $('#login').removeClass("login-active")
        $('.nav-login-two').show();
        $(".vip").css({
            "display": "none"
        });
        $('#developer').hide();
        $('#recharge').hide();
        $('#modelSer').hide();
        $('#development').hide();
        if (SERVERPATH) {
            window.location.href = window.location.protocol + "//" + window.location.host + '/projects';
        } else if (type != 'stopCurrentPage') {
            if(location.pathname&&(location.pathname.indexOf('/user/')!=-1||location.pathname.indexOf('/admin/')!=-1)) {
                window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname;
            } else {
                location.reload();
            }
        }
        $('#nav-reg').show();
        if(type&&type=='logout') return;
    } else {
        //登录
        agreedAgr1 = false;
        agreedAgr2 = false;
        $('#login').html(name).attr('data-log', '1');
        $('.vipLi .login-name').html(name).attr('data-log', '1');
        $('.logouttwo .login-name').html(name).attr('data-log', '1');
        $('#login').addClass("login-active")
        $('#msg').show();
        $('.nav-login-two').hide();
        if (getCookie('role') != 'admin') $("#informBell").show();
        $('#emailIcon').show();
        $('.vipLi').show();
        $('#headimg').show();
        $('#headimgs').show();
        headimgurl=headimgurl||decodeURIComponent(getCookie('headimgurl'));
        try {
            headimgurl=decodeURIComponent(headimgurl);
        } catch (error) {};
        if (headimgurl.substring(0, 4) != 'http') {
            $('#headimg').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
        } else {
            $('#headimg').css({
                'background-image': 'url(' + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + headimgurl + ')'
            });
        }
        reloadHeader();
        $("#recharge").css("display", "block");
        $("#modelSer").css("display", "block");
        $("#development").css("display", "block");

        $('#nav-reg').hide();
        if (getCookie("role") == 'developer') {
            $(".vip").css({
                "display": "inline"
            });
            $('#developer').hide();
            $('.vipLi .vip,.vipLi #headimg,#headimgs').addClass('bordervip');
            if(isVipPro) $('.vipLi .vip,.vipLi .bordervip,#headimgs.bordervip').addClass('svip');
        } else {
            $(".vip").css({
                "display": "none"
            });
            if (getCookie("role") == 'free') { $('#developer').css("display", "block"); }
        }
        // IOT页面登录，判断按钮状态
        if(typeof(IOTUserIslogin)!='undefined'){
            IOTUserIslogin();
        }
        // 校园场景大赛
        if(typeof(getStatus)!='undefined'){
            getStatus();
        }
        if(getQueryString("return_to")) {
            var url=decodeURIComponent(getQueryString("return_to"));
            if(url.indexOf('thingjs.kf5.com')!=-1||url.indexOf('help.thingjs.com')!=-1) {
                return checkLogin(url);
            }
        }
        if(getQueryString("u") === "myContract") {
            openContract()
        }
        // thingjs开发训练营报名判断
        if(typeof(isDtState)!='undefined'){
            isDtState();
        }
    }

    if (!SERVERPATH) {
        //在线调试页
        if (getQueryString("m") == 'sample' || getQueryString("m") == 'sample_old') {
            if(r) {
                if($('.content-nav .tab-ul #tab_mylist p:visible').length&&$('.content-nav .tab-ul #tab_mylist').hasClass('tab-li active')) {
                    return;
                }
            }
            try {
                if (typeof(enableCharts)!='undefined'&&enableCharts) {enableCharts()};
            } catch (error) {}
            var panelType = "";
            if ($("#moveclose-dialog .panelModel").is(":visible")) {
                panelType = $("#moveclose-dialog .panelModel .panelHeader .panelTitle").text();
                if(panelType=="模型"&&getModels){
                    if (getModels) getModels(queryData, server);
                }
                // if (typeof (bigType) !== 'undefined') {
                //     if (bigType === 'personal') {
                //         if (getCustomModel) getCustomModel(customN, count, curNum, keyword);
                //     }
                // }
            } else if ($("#moveclose-dialog_store .panelModel").is(":visible")) {
                panelType = $("#moveclose-dialog_store .panelModel .panelHeader .panelTitle").text();
                if (panelType == '资源空间' && setPanelModel_1) {
                    setPanelModel_1('', "#moveclose-dialog_store", "资源空间", "store", true);
                }
            }
            try {
                if (!sampleTimeout && type != 'stopCurrentPage') domyfile();
                if (getQueryString("cbuilder")) tab_change(1);

                if ($('.setting2 #gf').is(':visible')) {
                    $('#list0').find('.item-li.active.lifileActNow').trigger('click');
                } else if ($('.setting2 .filen').is(':visible')) {
                    $('.setting2 .filen').trigger('click');
                }
                if($('#pay-mb-out:visible').length) $('#pay-mb-out').css({zIndex:'',display:''});
            } catch (error) {}
        }
        if (getQueryString("m") === 'model') {
            if (queryData.bigType === 'personal') {
                var small_variety = template('small-variety_3dMax');
                $('.small-variety-ul').html(small_variety);
            }
            if (getNewModels) getNewModels(queryData, server);
        }
        switch (loginSource) {
            case 'modelServer':
                modelServer(true);
                break
            case 'devServer':
                devServer(true)
                break;
            case 'companyServer':
                setCookie("checkSign", true);
                camInfoServer(camInfoType,camInfoMsg);
                break;
            case 'companyServerFirst':
                camInfoServer("companyServerFirst");
                break;
            default:
                if(type!='refreshToken') {
                    showSigninPage("from_login");
                    confirmOrder();
                }
                break;
        }
        loginSource = ''
    }
}

// 如果通过外部链接进来查看合同
if(location.hostname=='test-thingjs.3dlink.cn'||location.hostname=='www.thingjs.com') {
    if(getQueryString('u')&&getQueryString('u')=='myContract') {
        var openid = getCookie("openid");
        if (!openid) {
            loginwindowon();
            clearAllCookie();
        }
    }
}

function openInform(informId) {
    location.href = SERVERPATH + '/admin/#/sysMsg';
}

function loginwindowon(type, tri) {
    // SSOLOGIN.login(); // 触发登录
    // return 

    if(!$('.login-window:visible').length) {
        try {
            if (typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {AnalysysAgent.track('loginOrReg');}
        } catch (error) {}
    }
    loginclose();

    $('.wxLogin-win span.close.iconfont.icon-close').hide();
    $('.login-window').show().removeClass('fadeOut fadeOutReg').addClass('fadeIn');
    $('.other-login').css('margin-top', '15px');
    $('.pay-mb').show();
    SSOLOGIN.login();
    
    if (type) {
        if (type == 'wid') {
            var e = {
                target: $('.img-pho')
            }
            imgPhoClick(e);
            $('.wxlogin1').trigger('click');
            $('.wxLogin-win span.close.iconfont.icon-close').show();
            $('.img-weixin').hide();
            $('.img-win').hide();
        } else if (type == 'uname') {
            $('.img-win').trigger('click');
            $('.img-wx').hide();
        } else if (type == 'help') {
            window.location.href = "http://help.thingjs.com/hc/"
        }
        $('.login-window-header span').text('账号绑定');
        $('.poptip').hide();
    }
    // if (tri) {
    //     if (tri == "2") {
    //         SERVERPATH ? loginRegOn() : navRegOn();
    //     } else if (tri == "3") {
    //         loginForgetOn();
    //     }
    // }
}

function loginwindowhide() {
    $('.login-window').hide();
    $('.pay-mb').hide();
}
$('.vipLi, .vip').mouseover(function (e) {
    // console.log('in')
    if ($(this).attr('data-log') == '-1') {
        loginwindowon();
        //loginqr();
    } else {
        $('.userInfoBox').show();
    }
})
$('.vipLi, .vip').mouseout(
    function (e) {
        // console.log('out')
        if ($(this).attr('data-log') == '-1') {
            loginwindowhide();
            //loginqr();
        } else {
            if (SERVERPATH || document.getElementById("startTeach") && document.getElementById("startTeach").style.color !== 'red') {
                $('.userInfoBox').hide();
            }
        }
    }
)
$('.nav-login[data-log="-1"],.nav-login-two[data-log="-1"]').off('cliick').on("click", function (e) {
    var event=e||window.event;
    event.stopPropagation();
    event.preventDefault();
    SSOLOGIN.login('init');
});
$('#nav-reg').off('cliick').on("click", function (e) {
    var event=e||window.event;
    event.stopPropagation();
    event.preventDefault();
    SSOLOGIN.register('init');
});
//登录成功回调
function loginBack(res){
    try {
        SSOLOGIN.loginBack(res);
        if (res && res.code == 200) {
            if(getQueryString("return_to")) {
                var url=decodeURIComponent(getQueryString("return_to"));
                if(url.indexOf('thingjs.kf5.com')!=-1||url.indexOf('help.thingjs.com')!=-1) {
                    return checkLogin(url);
                }
            }
            if ((window.location.hostname == 'www.thingjs.com' || window.location.hostname == '127.0.0.1') && window.location.pathname.indexOf('/guide/check/') != -1) {
                if (typeof (accountAccess) != 'undefined') accountAccess();
            }

            if (!SERVERPATH && (!(CLIENTID && CLIENTID == 'rootcloud'))) {
                if (!res.mmdId) return;
                try {
                    if (PERMISSIONCONFIG.getPermission('粒子授权')) {
                        setCookie("particleRole", true);
                    } else {
                        setCookie("particleRole", false);
                    }
                    if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
                } catch (error) {};
                // $.ajax({
                //     url: SERVERPATH + '/api/hasRole',
                //     type: 'post',
                //     headers: {
                //         Authorization: 'Bearer ' + getCookie('accessToken'),
                //     },
                //     data: {
                //         "mmdId": res.mmdId,
                //         "roleName": "粒子授权"
                //     },
                //     dataType: 'json',
                //     success: function (data) {
                //         if (data && data.success) {
                //             setCookie("particleRole", true);
                //         } else {
                //             setCookie("particleRole", false);
                //         }
                //         if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
                //     }
                // });
                if (checkUserAuth && checkUserAuth()) {
                    setCookie("musics", true);
                    setCookie("skyboxes", true);
                } else {
                    setCookie("musics", false);
                    setCookie("skyboxes", false);
                }
            }

            if (typeof (showVersion2) != 'undefined') {
                showVersion2();
                showRendering();
            }

            // 判断是否是QDT的demo链接
            if (window.location.href.indexOf('/pre/') != -1 && getQueryString('env') == 'demo') {
                return window.location.reload();
            }

            indexlogininit(null,res.isVipPro,1);
            if (getQueryString("g") == 1 && !$('.filen-edit').is(':visible')) {
                $('.btn-yq.btn').trigger('click');
            }

            if (getQueryString("m") == 'sample') {
                if (ORIGINOPENID && ORIGINOPENID != res.openid) {
                    var reloadSample = function () {
                        // location.reload();
                    }
                    newAlert('登录成功（当前账号与与上次登录账号不同，将重新刷新当前页面）', 'success', '', reloadSample, 'false');
                    return;
                } else {
                    ORIGINOPENID = res.openid;
                }
                $(".login-close").show();
                if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '页面资源') {
                    createFileMenu();
                }
                if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '场景资源') {
                    createMenuScene();
                }
                if (getCookie("role") == 'developer') {
                    $(".btn-tb").show();
                }
                if (getQueryString("f") || getQueryString("i") || getQueryString("o")) {
                    if (sampleType !== 'tab_change') return;
                    tab_change(1);
                    $('#gf').hide();
                    $('.filen').show();
                    if (getQueryString("f")) {
                        $('#gf').show();
                        $('.filen').hide();
                        var fileN = decodeURI(getQueryString("f"));
                        $('#list1 li[data-name="' + fileN + '"] i.icon-file').trigger('click', 'f');
                        $('#list1 li ul p.pro_main[data-name="' + fileN + '"]').trigger('click');
                        if (getCookie("debugSwitch") == 0) {
                            debugSwitchFalse();
                        }
                        $('.bg-upload.sceneUpload.fileUpload').hide();
                        $('.add_file_li').remove();
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
                        setUrl(null, []);
                    }
                }
                if (getQueryString('cityBuilder') == 'true') {
                    largePanel(null, '地图', 'createProject');
                }
            }
            if (flag == true) {
                checkHelpLogin(flag);
            }
            if (window.location.pathname === '/admin/') {
                if (getQueryString('m') == 'sample') return largePanel(null, '项目');
                if (window.parent.location.search == '?m=sample') {
                    var iframeBody = $(window.parent.document).find('#iframeBody')[0];
                    if (iframeBody) {
                        if (window.location.hash.indexOf('#/User_Msg?sampleIframe=true') != -1) {
                            return window.parent.largePanel(null, '个人信息');
                        }
                        if (window.location.hash.indexOf('#/Scene?sampleIframe=true') != -1) {
                            return window.parent.largePanel(null, '园区');
                        }
                        if (window.location.hash.indexOf('#/User_Ticket?sampleIframe=true') != -1) {
                            return window.parent.largePanel(null, '我的订单');
                        }
                        if (window.location.hash.indexOf('#/User_Contract?sampleIframe=true') != -1) {
                            return window.parent.largePanel(null, '我的合同');
                        }
                        if (window.location.hash.indexOf('#/Product?sampleIframe=true') != -1) {
                            return window.parent.largePanel(null, '项目');
                        }
                    }
                }
                window.location.href = window.location.origin + '/' + 'admin/#/myProduct';
            }
            if (getQueryString("back")) {
                if (getQueryString("back").indexOf('?') != '-1') {
                    window.location.href = getQueryString("back") + '&token=' + res.token;
                } else {
                    window.location.href = getQueryString("back") + '?token=' + res.token;
                }
                return;
            }
            if (getQueryString("return_to")) {
                var url = decodeURIComponent(getQueryString("return_to"));
                if (url.indexOf('thingjs.kf5.com') != -1 || url.indexOf('help.thingjs.com') != -1) {
                    return checkLogin(url);
                }
            }
            checkNavColor();
            switch (loginSource) {
                case 'modelServer':
                    modelServer(true)
                    break
                case 'devServer':
                    devServer(true)
                    break;
                default:
                    break
            }
            loginSource = '';
            camInfoType = '';
            if(location.host=='store.thingjs.com') {
                confirmOrder();
            }
        } 
    } catch (error) {
        console.log(error);
    }
}
  
$('#logout').click(function () {
    $('.vipLi').hide();
    $("#recharge").hide();
    $("#development").show();
    $("#modelSer").show();
    SSOLOGIN.logout();
    // clearAllCookie();
    indexlogininit('logout');
    // 埋点 用户退出
    if (typeof(AnalysysAgent)!='undefined') {AnalysysAgent.track('user_dropout');}
});
$('#logouttwo').click(function () {
    $('.vipLi').hide();
    $("#recharge").hide();
    $("#development").show();
    $("#modelSer").show();
    $('#logouttwo').hide();
    SSOLOGIN.logout();
    // clearAllCookie();
    indexlogininit('logout');
    // 埋点 用户退出
    if (typeof(AnalysysAgent)!='undefined') {AnalysysAgent.track('user_dropout');}
});

window.onclick = function () {
    $('#sub-site-nav').removeClass('navbar-nav-show');
}

// 移动端菜单按钮
$('.navbar-toggler').click(function (ev) {
    var oEvent = ev || event;
    oEvent.cancelBubble = true;
    oEvent.stopPropagation();
    $('#sub-site-nav').toggleClass('navbar-nav-show');
});


// 21年4.23新改动移动端抽屉式按钮
// 展开
function wapNavPut(){
    $('.wap-nav-put').toggle();
    $('.wap-nav-on').toggle();
    $('.wap-nav-drawer').css('transform','translateX(0)');
    $('#bg-shadow1').css('display','block');

    $('.logouttwo').css('transform','translateY(-100%)');
    $('#bg-shadow2').css('display','none');
}
// 收起
function wapNavOn(){
    $('.wap-nav-put').toggle();
    $('.wap-nav-on').toggle();
    $('.wap-nav-drawer').css('transform','translateX(-100%)');
    $('#bg-shadow1').css('display','none');
}

//登陆
function loginqr() {
    var AppID = 'wx22c16866ca548e70';
    var redirect = 'https://www.thingjs.com/mp';
    var obj = new WxLogin({
        id: "login_container",
        appid: AppID,
        scope: "snsapi_login",
        redirect_uri: redirect,
        //state: "STATE",
    });
}

function getCookie(name, decode) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        if (decode) {
            return decodeURIComponent(arr[2]);
        } else {
            return (arr[2]);
        }
    } else
        return null;
}

function clearAllCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    if(name) {
        document.cookie = name + "=; expires=" + date.toGMTString();
        document.cookie = name + "=;domain=.thingjs.com;expires=" + date.toGMTString() + ";path=/";
        document.cookie = name + "=;domain=.test-thingjs.3dlink.cn;expires=" + date.toGMTString() + ";path=/";
        document.cookie = name + "=;domain=.3dlink.cn;expires=" + date.toGMTString() + ";path=/";
        document.cookie = name + "=;domain=.3dmmd.cn;expires=" + date.toGMTString() + ";path=/";
        $.removeCookie(name, { path: '/' });
        $.removeCookie(name);
        return;
    }
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    var id = getCookie('id');
    var mmdId = getCookie('mmdId');
    // loginout_mmd(id, mmdId);
    if (keys) {
        for (var i = keys.length; i--;) {
            if (COOKIE_LIST.indexOf(keys[i]) >= 0) {
                document.cookie = keys[i] + "=; expires=" + date.toGMTString();
                document.cookie = keys[i] + "=;domain=.thingjs.com;expires=" + date.toGMTString() + ";path=/";
                document.cookie = keys[i] + "=;domain=.test-thingjs.3dlink.cn;expires=" + date.toGMTString() + ";path=/";
                document.cookie = keys[i] + "=;domain=.3dlink.cn;expires=" + date.toGMTString() + ";path=/";
                document.cookie = keys[i] + "=;domain=.3dmmd.cn;expires=" + date.toGMTString() + ";path=/";
                $.removeCookie(keys[i], { path: '/' });
                $.removeCookie(keys[i]);
            }
        }
    }
    SSOLOGIN.clearCookie();
}
// function loginout_mmd(id, mmdId) {
//     window.localStorage.removeItem('LOGINTIMEOUT');
//     $('body span.setTimeSpan').remove();
//     isLoginOther = false;
//     if (id != null && mmdId != null) {
//         try {
//             var url='https://sso.thingjs.com/logout';
//             $.ajax({
//                 url: url,
//                 type: 'post',
//                 data:{
//                     access_token:getCookie('accessToken'),
//                     redirect_uri:location.href
//                 },
//                 success: function (res) {
//                 },error:function(e){
//                     console.log(e);
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//         }
//         try {
//             $.ajax({
//                 url: SERVERPATH + '/mp/loginout_mmd?id=' + id + '&mmdId=' + mmdId,
//                 type: 'get',
//                 success: function (data) {
//                     if (data.code == 200) {
//                         console.log(data.message);
//                     }
//                 }
//             })
            
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     // 埋点
//     // AnalysysAgent.reset()
// }

/**
*当处于指引状态下，用户点击×按钮（退出按钮）无效
*/
function fadeOut() {
    $("#checkCircle").prop('checked',false)
    agreedAgr1 = false;
    agreedAgr2 = false;

    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        //如果处于指引状态，则啥也不能干，不在则正常运行
    } else if(window.location.href.indexOf('/pre/') != -1 && getQueryString('env') == 'demo'){
        if($('.form-box.password-login').css('display') != 'none'){
            return layer.msg("QuickDT需要登录才可访问", { offset: ['45%', '44.5%'], time: 1500 });
        }
    } else {
        if ($(".login-window").is(':visible')) {
            if ($(".login-window").hasClass('login-reg-over')) {
                $(".login-window").addClass('fadeOutReg');
            } else {
                $(".login-window").addClass('fadeOut');
            }
            $(".login-window").removeClass('fadeIn fadeInReg');
        }
    }
}
function userCfadeIn() {
    $(".user-complete-window").addClass('fadeInC');
    $(".user-complete-window").removeClass('fadeOutC');
}
function userCfadeOut() {
    if ($(".user-complete-window").is(':visible')) {
        $(".user-complete-window").addClass('fadeOutC');
        $(".user-complete-window").removeClass('fadeInC');
    }
}
function loginclose() {
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        //当处于指引状态，则不让登录关闭
    } else {
        if (!SERVERPATH && $('.forgetTel').hasClass('layui-this')) {
            $('.forgetEmail').trigger('click')
        }
        forgetwindowdone();
        regwindowdone();

        $('.forget-window').hide();
        $('.login-form-box').show();
        $('.login-window').removeClass('forgetClass').css({ 'height': '358px', 'width': '380px' });

        // 判断是否是QDT的demo链接 不隐藏蒙版
        if(window.location.href.indexOf('/pre/') != -1 && getQueryString('env') == 'demo'){
        }else{
            $('.pay-mb').hide();
        }
        $('.error-hint-box').hide();
        $(".verifica-code-login").hide();
        $(".password-login").show();
        $('.tologin-tittle div').eq(0).addClass('login-tab').siblings().removeClass('login-tab');
        $('.pay-mb').css('z-index','800')
    }
}

function setCookie(name, value, d, domain) {
    var Days = 2;
    if (d) Days = d;
    var exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.setTime(setTamp());

    var hostname = window.location.hostname;
    if(hostname=='test-thingjs.3dlink.cn') {
        domain = ".3dlink.cn";
    } else {
        if (hostname == (SERVERPATH ? "store.thingjs.com" : "www.thingjs.com")) {
            if(!domain) domain = ".thingjs.com";
        } else if (hostname == "www.3dmmd.cn") {
            if(!domain) domain = ".3dmmd.cn";
        } else if(window.location.hostname.indexOf('thingjs.com')==0){
            if(!domain) domain = ".thingjs.com";
        }
    }
    if (domain) {
        document.cookie = name + "=" + escape(value) + ";domain=" + domain + ";expires=" + exp.toGMTString() + "; path=/;";
    } else {
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
    }
}
function setTamp() {
    var curDate = new Date();
    //当前时间戳
    var curTamp = curDate.getTime();
    //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
    //当日已经过去的时间（毫秒）
    var passedTamp = curTamp - curWeeHours;
    //当日剩余时间
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    if(leftTamp<0) {
        curWeeHours = new Date(new Date(curDate).Format('yyyy/MM/dd')).getTime() - 1;
        passedTamp = curTamp - curWeeHours;
        leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    }
    return leftTamp + curTamp;
}
$(document).keyup(function (event) {
    if (event.keyCode == 13 && $("#login-btn,#login-btn-thingx").is(':visible')) {
        $("#login-btn,#login-btn-thingx").trigger("click");
    }
});
$('.login-window').on('click', '#login-btn', function () {
    $('.login-tip').text("");
    var username = encodeURIComponent($("#username").val());
    var password = encodeURIComponent($("#password").val());
    if (username.length == 0 || password.length == 0) {
        $("div[data-error=username]").show();
        $("div[data-error=password]").show();
    } else {
        $("div[data-error=username]").hide();
        $("div[data-error=password]").hide();
        var login_mmd_url = "/mp/login_mmd";
        if ($('.login-window-header span').text() == '账号绑定') {
            login_mmd_url = "/mp/login_mmd?binding=b";
        }
        var data = {
            username: encodeBase64.base64encode(username),
            password: encodeBase64.base64encode(password)
        }
        $('.vip.svip').removeClass('svip');
        $(".user_msg .m-avataruploader-imagewrapper.svip").removeClass('svip');
        $('#headimg.svip').removeClass('svip');
        $('#headimgs.svip').removeClass('svip');
        document.getElementById("login-btn").innerHTML="<div class="+'waiting'+" >登录中 <div class="+'loadcircle'+"></div> </div>";
        document.getElementById("login-btn").style.opacity="0.5";
        $.ajax({
            url: SERVERPATH + login_mmd_url,
            type: "post",
            data: {
                data: encodeBase64.base64encode(JSON.stringify(data))
            },
            success: function (res) {
                document.getElementById("login-btn").innerHTML="立即登录";
                document.getElementById("login-btn").style.opacity="1";
                if (res.code == 200) {
                    let loginOutNum = localStorage.getItem("loginOutNum") // 检索
                    let loginOutTime = localStorage.getItem("loginOutTime") // 检索
                    if(loginOutNum && loginOutNum >= 5 && loginOutTime > new Date().getTime()){
                        let djsTime = loginOutTime - new Date().getTime();
                        let minutes = parseInt((djsTime % (1000 * 60 * 60)) / (1000 * 60));
                        let seconds = parseInt((djsTime % (1000 * 60)) / 1000);
                        seconds = seconds < 10 && seconds >= 1 ? ('0' + seconds) : seconds;
                        layer.msg(minutes +'分' + seconds + "秒后可重新登录", { offset: ['45%', '45.2%'], time: 1500 });
                        return false;
                    }else{
                        localStorage.removeItem("loginOutTime");
                        localStorage.removeItem("loginOutNum");
                    }

                    if(res.permission == "developer"){
                      $('.user_msg .m-avataruploader-imagewrapper').addClass('bordervip');
                      $('#headimg').addClass('bordervip');
                      $('#headimgs').addClass('bordervip');
                    }
                    if(res.isVipPro){
                      $('.vip').addClass('svip');
                      $(".user_msg .m-avataruploader-imagewrapper").addClass('svip');
                      $('#headimg').addClass('svip');
                      $('#headimgs').addClass('svip');
                    }
                    // 手机端登录
                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})};
                    clearAllCookie();
                    setCookie('role', res.role);
                    setCookie('token', res.token);
                    setCookie('accessToken', res.accessToken);
                    setCookie('SameSite', 'None');
                    setCookie('Secure', true);
                    setCookie('id', res.id);
                    setCookie("mmdId", res.mmdId);
                    setCookie("JSESSIONID",res.JSESSIONID);

                    var setiframe = document.createElement("iframe");
                    setiframe.setAttribute("src","https://sso.thingjs.com/getcookie?JSESSIONID="+res.JSESSIONID);
                    setiframe.setAttribute("style","display:none");
                    document.body.insertBefore(setiframe,document.body.lastChild);

                    logingoon(res);
                    $('.nav-login-two').hide()
                    $('.pay-mb').css('z-index','800')
                    // loginContinue(res);
                    if (typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {
                        // 埋点_账号关联
                        AnalysysAgent.alias(res.mmdId + '');
                        // 埋点 用户登录成功
                        AnalysysAgent.track('user_login_success');
                    }
                    // 登陆成功后判断用户手机号注册状态
                    $.ajax({
                        url: SERVERPATH + '/api/isUserPhoneRegisterMultiple',
                        type: 'get',
                        data: {
                            userPhone: res.phone
                        },
                        success: function (res) {
                            // console.log(res);
                        },
                        error: function (res) {
                            console.log(res,"error");
                        }
                    })
                } else if (res.code == 201) {
                    setCookie('id', res.id);
                    setCookie('accessToken', res.accessToken);
                    setCookie('SameSite', 'None');
                    setCookie('Secure', true);
                    alert('绑定成功', 'sucsure');
                    if ($('#ifBindUN').is(':visible')) {
                        $('#ifBindUN').html(res.uname + ' <span class="bindButton"</span>')
                    }
                    loginwindowhide();
                    checkNavColor();
                    // window.location.reload();
                    //window.location.href = 'http://' + window.location.host + "/guide/?"+window.location.search;
                } else if (res.code == 205) {
                    var fn = function () {
                        window.localStorage.removeItem('LOGINTIMEOUT');
                        $('body span.setTimeSpan').remove();
                        if (typeof (isLoginOther) == 'boolean') isLoginOther = false;
                        if (swal_close) swal_close();
                        $.ajax({
                            url: SERVERPATH + login_mmd_url,
                            type: "post",
                            data: {
                                data: encodeBase64.base64encode(JSON.stringify(data)),
                                isOver: true
                            },
                            success: function (res) {
                                if (res.code == 200) {
                                    // 手机端登录
                                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})};
                                    clearAllCookie();
                                    setCookie('role', res.role);
                                    setCookie('token', res.token);
                                    setCookie('accessToken', res.accessToken);
                                    setCookie('SameSite', 'None');
                                    setCookie('Secure', true);
                                    setCookie('id', res.id);
                                    setCookie("mmdId", res.mmdId);
                                    setCookie("JSESSIONID",res.JSESSIONID);
                                    var setiframe = document.createElement("iframe");
                                    setiframe.setAttribute("src","https://sso.thingjs.com/getcookie?JSESSIONID="+res.JSESSIONID);
                                    setiframe.setAttribute("style","display:none");
                                    document.body.insertBefore(setiframe,document.body.lastChild);
                                    // var haveOne = res.haveOne ? res.haveOne : '';
                                    // setCookie('haveOne', haveOne);
                                    // if (!res.phoneVerify) {
                                    //     loginwindowhide();
                                    //     if (SERVERPATH && loginSuccessCallback) {
                                    //         window.localStorage.setItem('showCaminfo', 'showCaminfo');
                                    //         loginSuccessCallback();
                                    //     } else {
                                    //         // camInfoServer();
                                    //     }
                                    //     window.localStorage.setItem('loginMessage', JSON.stringify(res));
                                    //     return
                                    // }
                                    logingoon(res, 1);
                                }
                            }
                        })
                    }
                    coverLogin(fn, res);
                } else {
                    if (res.message) {
                        layer.msg(res.message);
                    } else {
                        let loginOutNum = localStorage.getItem("loginOutNum") // 检索
                        let loginOutTime = localStorage.getItem("loginOutTime") // 检索
                        let OutTime = 300 * 1000 + new Date().getTime(); // 过期时间

                        if(!loginOutNum || !loginOutTime){
                            localStorage.setItem("loginOutNum", 1);// 存储
                            localStorage.setItem("loginOutTime", OutTime);// 存储
                        }

                        if(loginOutTime && loginOutNum >= 5){ OutTime = loginOutTime }

                        if(loginOutTime && loginOutTime < new Date().getTime()){
                            localStorage.removeItem("loginOutTime");
                            localStorage.removeItem("loginOutNum");
                            layer.msg("用户名或密码错误", { offset: ['45%', '46.5%'], time: 1500 });
                            return false
                        }

                        if(loginOutNum && loginOutNum < 5){
                            let numberLoginOutNum = Number(loginOutNum)
                            numberLoginOutNum++
                            localStorage.setItem("loginOutNum", numberLoginOutNum);// 存储
                            localStorage.setItem("loginOutTime", OutTime);// 存储
                        }else if(loginOutNum && loginOutNum >= 5){
                            let djsTime = OutTime - new Date().getTime();
                            let minutes = parseInt((djsTime % (1000 * 60 * 60)) / (1000 * 60));
                            let seconds = parseInt((djsTime % (1000 * 60)) / 1000);
                            // minutes = minutes < 10 ? ('0' + minutes) : minutes;
                            seconds = seconds < 10 && seconds >= 1 ? ('0' + seconds) : seconds;
                            layer.msg(minutes +'分' + seconds + "秒后可重新登录", { offset: ['45%', '45.2%'], time: 1500 });
                            return false;
                        }

                        layer.msg("用户名或密码错误", { offset: ['45%', '46.5%'], time: 1500 });
                    }
                }
            }
        })
    }

})

$('.login-window').on('focus', '.login-input-cont', function () {
    $(this).parent('.login-input').addClass('login-focu-input');
    $('.login-tip').text('');
})

$('.login-window').on('blur', '.login-input-cont', function () {
    $(this).parent('.login-input').removeClass('login-focu-input');
})

$('.img-pho,.wx-login').on('click', imgPhoClick)

function checkNavColor() {    
    if(location.host=='test-thingjs.3dlink.cn'||location.host=='www.thingjs.com') {
        if((location.search =="" || location.search == '?m=main'|| location.search == '?m=mainNew') && (location.pathname=='/guide/' || location.pathname=='/guide/main/')){
            $("#login").css("color", "#fff");
            return;
        }
    }
    var colorFlag = $('.swiper-slide-active').attr('data-swiper-slide-index');
    switch (colorFlag) {
        case '0':
        case '1':
        case '3':
        case '4':
            $('.login-active').css('color', '#000')
            break;
        case '2':
            $('.login-active').css('color', '#fff')
            break;
        default:
    }
    var addFlag = window.location.search;
    if (addFlag != '' || addFlag != '?m=main') {
        $('.login-active').css('color', '#000')
    }
    if (addFlag == '?m=price') {
        $('.login-active').css('color', '#fff')
    }
}

function imgPhoClick(e) {

    var tg = e.target;
    if ($(tg).hasClass('img-wx')) {
        $(tg).addClass('img-win').removeClass('img-wx');
        $('.poptip .poptip-content').html("<i class='iconfont icon-dunpai'></i>账号登录");
        $('.login-window-header span').text('微信登录');
        forgetwindowdone();//忘记密码框
        $('.login-window-in').hide();
        $('.wxlogin').show();
        $('.login-footer').hide();
        if (!tid2) tid2 = getLoginQR();
    } else {
        $(tg).addClass('img-wx').removeClass('img-win');
        $('.poptip .poptip-content').html("<i class='iconfont icon-dunpai'></i>微信登录");
        $('.login-window-header span').text('账号登录');
        forgetwindowdone();
        $('.login-window-in').show();
        $('.wxlogin').hide();
        $('.login-footer').show();
    }
}

//忘记密码
// $('.login-window').on('click', '#login-forget', loginForgetOn)
function loginForgetOn() {
    return;
    // 生成图形验证码
    checkGraphicalCaptcha('captcha-email','forgetinp-emailreg-img',false);

    $(".forget-window").show();
    $(".login-form-box").hide();
    $(".login-window").addClass("forgetClass").css({ 'width': '400px', 'height': '450px' });
    $('.error-hint-box').hide();
    //忘记密码-邮箱验证码初始化
    $('#getForgetNum').unbind('click').bind('click', forget_tel_send)
    $('#getForgetNum').css('cursor', 'pointer').css('background', '#ff8700')

    $('#username').val('')
    $('#password').val('')

    $('#loginOtherDiv').hide();
    $('.other-login').hide();
    $('.loginTitleDiv').hide();
    $('.login-other').css('bottom', '0');
    $('.login-window-in').hide();
    $('.login-forget-window').show();
    $('.forget-tel-window').show();
    $('.login-footer #login-forget').hide();
    $('.login-window-header span').text("找回密码");
    $('.login-other').hide();
    $('#login-fas').show();
    $('#login-fas').css('right', '0');
    $('.login-other').text('还没有优锘账户？');
    $('.login-footer #login-reg').text("立即注册");
}

$('.login-window').on('focus', '#forgetinp', function () {
    $(this).parent('.forget-input').addClass('forget-focu-input');
    $('.forget-tip').text('');
})

$('.login-window').on('blur', '#forgetinp', function () {
    forgetemail($('#forgetinp').val());
})

async function sendemail() {
    var res;
    if(login_code == undefined){
        res = false;
    }else {
        res = await login_captcha.check_code(login_code);
    }
    if (!res) {
        $('div[data-error="forgetTel-img"]').show();
        return
    }
    // getRegCode('',verifyCode)
    forgetSecByPhone();
}

async function forgetemail(mailtxt, send) {
    // var res = verifyCode1.validate(document.getElementById("forgetinp-telreg-img-email").value);
    var res;
    if(login_code == undefined){
        res = false;
    }else {
        res = await login_captcha.check_code(login_code);
    }
    if (!res) {
        $('div[data-error="forgetTel-img"]').show();
        return
    }
    var mailtxt = $('#forgetinp-email').val();
    var mailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (mailtxt.length == 0) {
        $('.forget-tip').text('邮箱格式错误');
        // getRegCode('',verifyCode1)
    } else if (!mailreg.test(mailtxt)) {
        $('.forget-tip').text('邮箱格式错误');
        // getRegCode('',verifyCode1)
    } else if (res == false) {
        $('.forget-pic-tip').text('验证码错误');
        $('.forget-pic-tip').css('top', '7px').css('right', '142px').css('width', '26%');
        $('.forget-pic-tip').show();
        $('.cuowu2').css('left', '96px');
        $('.cuowu2').show();

    } else {
        $(this).parent('.forget-input').removeClass('forget-focu-input');
        $('.forget-tip').text('');
        $('.forget-pic-tip').hide();
        layer.msg('请求已发送', { offset: ['40%', '48%'] })
        //getRegCode('',verifyCode1)
        $.ajax({
            url: "https://sso.thingjs.com/uinapi/register/forgetPassword",
            type: 'get',
            data: {
                email: mailtxt
            },
            success: function (res) {
                if (res.code == '0') {
                } else {
                    // getRegCode('',verifyCode1)
                    layer.msg(res.msg, { offset: ['40%', '48.2%'] })

                }
            },
            error: function (res) {
                layer.msg(res.msg, { offset: ['40%', '48.2%'] })
            }
        })

    }
}


function forgetwindowdone() {
    $('.login-reg-window').find('.reg-false').removeClass('reg-false');
    $('.login-reg-window').find('.reg-right').removeClass('reg-right');
    $('.login-reg-window').find('.reg-input-tip').text('');
    $('.login-reg-window .login-reg-item input').val('');

    $('.forget-tel-window').find('.reg-false').removeClass('reg-false');
    $('.forget-tel-window').find('.reg-right').removeClass('reg-right');
    $('.forget-tel-window').find('.forget-focu-input').removeClass('forget-focu-input');
    $('.forget-tel-window').find('.forget-input-tip').text('');
    $('.forget-tel-window input').val('');

    $('.forget-email-window').find('.forget-tip').text('');
    $('.forget-email-window input').val('');
    clearInterval(timeR);
    $('.forget-send-outh').text('获取验证码');
    $('.forget-send-outh').removeClass('forget-send-outh-false');

    $('.login-forget-window').hide();
    $('.login-other').hide();
    $('.login-footer #login-forget').show();
    $('.login-footer #login-reg').text("免费注册");
    $('.forget-email-window').show();
    $('.forget-tel-window').hide();
    $('.login-window').removeClass('login-forget-tel');
    $(".reg-footer input").attr("checked", true);
}

//注册账号
// $('.login-window').on('click', '#login-reg', loginRegOn)

function loginRegOn() {
    return;
    $('.other-login').css('display', 'block');
    $('.loginTitleDiv').css('display', 'block');
    $('.login-window-in').hide();
    $('.login-forget-window').hide();
    $('.login-footer #login-forget').hide();
    $('.login-footer #login-reg').hide();
    $('.poptip').hide();
    $('.img-pho').hide();
    $('.login-window-header span').text("新用户注册");
    $('.login-other').show();
    $('.login-other').text('已有账号？');
    $('#login-fas').show();
    $('#login-fas').css('right', '0px');
    $('.login-reg-window').show();
    $('.login-window').removeClass('fadeOut fadeOutReg');
    if (!$('.login-window').hasClass('fadeIn') && !$('.login-window').is(':visible')) $('.login-window').addClass('fadeInReg');
    $('.login-window').removeClass('login-forget-tel').addClass('login-reg-over');
    $('.forget-email-window').show();
    $('.forget-tel-window').hide();
    $(".reg-footer input").attr("checked", true);
    $('#loginOtherDiv').css('display', 'none');
    $('.other-login').css('margin-top', '14px')

    $('.other-login').css('margin-bottom', '0');

    $(".loginMethod li").eq(0).show();
    $(".loginMethod li").eq(3).show();

    if (!verifyCode_tel) {
        var options = {
            id: "v_container_tel",
            canvasId: "verifyCode_tel",
            height: 40,
            code: ""
        }
        var verifyCode_tel = new GVerify(options);
        // getRegCode('#verifyCode_tel',verifyCode_tel)
    }

    if ($("#reg-btn,#reg-btn-thingx").attr("regtype") == "phone") {
        $('.loginTitleSpan').text('手机号注册');
        getRegCode('',verifyCode_tel)
    } else if ($("#reg-btn,#reg-btn-thingx").attr("regtype") == "email") {
        $('.loginTitleSpan').text('邮箱注册');
        getRegCode('',verifyCode_email)
    }

    $("#getPhoneRegNum,#getEmailRegNum").addClass("noEvents").css("background-color", "rgb(153, 153, 153)");
    $("#reg-btn,#reg-btn-thingx").addClass("noEvents").css("background-color", "rgb(153, 153, 153)");
    $("input[data-name=phonePsw],input[data-name=emailPsw]").attr('readonly', true);
    $("input[data-name=phoneCode],input[data-name=emailCode]").attr('readonly', true);

}
//验证码登录 对接新的验证码
// const captchaElement = document.querySelector('#captcha');
// const login_captcha = new captcha.Captcha(captchaElement, {width:130,height:60,is_click_refresh: true, length:4,complexity:1 ,dark_mode:false});
// const codeElement = document.querySelector('#reg-telreg-img');
// let login_code;
// codeElement.oninput = async function(e) {
//     // 判断图形验证码输入是否正确
//     // console.log(1111)
//     login_code = e.target.value;
//     await login_captcha.check_code(login_code);
// }

// //邮箱找回密码 对接新的验证码
// const captchaElement2 = document.querySelector('#captcha-email');
// const login_captcha2 = new captcha.Captcha(captchaElement2, {width:130,height:60,is_click_refresh: true, length:4,complexity:1 ,dark_mode:false});
// const codeElement2 = document.querySelector('#forgetinp-emailreg-img');
// let login_code2;
// codeElement2.oninput = async function(e) {
//     // console.log(2222)
//     login_code2 = e.target.value;
//     await login_captcha2.check_code(login_code2);
// }

// // 手机号找回密码 对接新的验证码
// const captchaElement3 = document.querySelector('#captcha-phone');
// const login_captcha3 = new captcha.Captcha(captchaElement3, {width:130,height:60,is_click_refresh: true, length:4,complexity:1 ,dark_mode:false});
// const codeElement3 = document.querySelector('#forgetinp-telreg-img');
// let login_code3;
// codeElement3.oninput = async function(e) {
//     // console.log(33333)
//     login_code3 = e.target.value;
//     await login_captcha3.check_code(login_code3);
// }

//对接新的验证码
let login_captcha = null;
let login_code = null;
function checkGraphicalCaptcha($captcha, $regTelregImg,$isPersonal){
    let width = 130;
    let height = 60;
    const captchaElement = document.querySelector('#'+$captcha);
    login_captcha = new captcha.Captcha(captchaElement, {width:width,height:height,is_click_refresh: true, length:4,complexity:1 ,dark_mode:$isPersonal});
    const codeElement = document.querySelector('#'+$regTelregImg);
    // let login_code;
    codeElement.oninput = async function(e) {
        login_code = e.target.value;
        await login_captcha.check_code(login_code);
    }
}


$('#get_phone_code').unbind('click').bind('click', refresh_auth_img)
async function refresh_auth_img() {
    // var res = verifyCode_tel.validateForCheck(document.getElementById("reg-telreg-img").value);
    var res = await login_captcha.check_code(login_code);
    if (!res) {
        layer.msg("图形校验码错误！");
        return;
    }
    if ($('#login-reg-tel').val().length == 0) {
        layer.msg('请填写手机号');
    } else {
        $('#get_phone_code').unbind('click')
        $('#get_phone_code').css('cursor', 'default').css('color', '#999')
        $('#get_phone_code').val('60s后重新获取');
        $('#get_phone_code').addClass('reg-auth-img-false');
        timeS = 59;
        timeR = setInterval(function () {
            if (timeS > 0) {
                $('#get_phone_code').val(timeS + 's后重新获取'); ``
                timeS--;
            } else {
                clearInterval(timeR);
                $('#get_phone_code').val('获取验证码');
                $('#get_phone_code').removeClass('reg-auth-img-false');
                $('#get_phone_code').unbind('click').bind('click', refresh_auth_img)
                $('#get_phone_code').css({ 'cursor': 'pointer', 'color': '#ff6600' });
            }
        }, 1000)
        // 加密
        // let cookieCode = getCookie("CHECKREGCODE") || document.getElementById("reg-telreg-img").value;
        $.ajax({
            url: SERVERPATH+"/api/getPhoneVCodeByQ?phoneNumber=" + $('#login-reg-tel').val() +'&code='+ login_code+'&token='+ login_captcha.token,
            type: "get",
            success: function (res) {
                if (res.code == '0') {
                    layer.msg(res.msg);
                } else if (res.code == '500') {
                    layer.msg(res.msg);
                    $('#login-reg-tel').addClass('reg-false');
                }
            }
        })
    }
}

var logouttwoToggle = false;
function audittojjles(){
    let auditmmdId = getCookie("mmdId");
    logouttwoToggle = !logouttwoToggle;
    if(auditmmdId){
        if(logouttwoToggle){
            $('.logouttwo').css('transform','translateY(0)');
            $('#bg-shadow2').css('display','block');


            $('.wap-nav-put').show();
            $('.wap-nav-on').hide();
            $('.wap-nav-drawer').css('transform','translateX(-100%)');
            $('#bg-shadow1').css('display','none');
        }else{
            $('.logouttwo').css('transform','translateY(-100%)');
            $('#bg-shadow2').css('display','none');
        }
    }
}

// 点击移动端菜单遮罩时菜单隐藏
$('#bg-shadow1').on('click',function(){
    wapNavOn()
})
// 点击移动端菜单遮罩时菜单隐藏
$('#bg-shadow2').on('click',function(){
    audittojjles()
})

$('#getEmailRegNum').unbind('click').bind('click', refresh_auth_emailNum);
function refresh_auth_emailNum() {
    var res = verifyCode_email.validateForCheck(document.getElementById("reg-emailreg-img").value);
    if (!res) {
        layer.msg("图形校验码错误！");
        return;
    }
    if ($('#login-reg-email').val().length == 0) {
        layer.msg('请填写邮箱');
    } else {
        if ($('#login-reg-email').length) {
            if ($('#login-reg-email').val().indexOf('sharklasers.com') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.info') != '-1' ||
                $('#login-reg-email').val().indexOf('grr.la') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.biz') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.de') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.net') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.org') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamailblock.com') != '-1' ||
                $('#login-reg-email').val().indexOf('pokemail.net') != '-1' ||
                $('#login-reg-email').val().indexOf('spam4.me') != '-1' ||
                $('#login-reg-email').val().indexOf('027168.com') != '-1' ||
                $('#login-reg-email').val().indexOf('meantinc.com') != '-1' ||
                $('#login-reg-email').val().indexOf('mailcatch.com') != '-1' ||
                $('#login-reg-email').val().indexOf('besttempmail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('liaohigh.com') != '-1' ||
                $('#login-reg-email').val().indexOf('powerencry.com') != '-1' ||
                $('#login-reg-email').val().indexOf('unicodeworld.com') != '-1' ||
                $('#login-reg-email').val().indexOf('groupbuff.com') != '-1' ||
                $('#login-reg-email').val().indexOf('itiomail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('classesmail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('fft-mail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('mailboxt.com') != '-1') {
                layer.msg("获取验证码失败");
                $('#login-reg-email').addClass('reg-false');
                $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700');
                return;
            }
        }
        $.ajax({
            url: "https://sso.thingjs.com/uinapi/register/emailCode?email=" + $('#login-reg-email').val(),
            type: "get",
            success: function (res) {
                if (res.success) {
                    layer.msg("发送验证码成功");
                } else {
                    layer.msg(res.msg);
                    clearInterval(timeR1);
                    $('#getEmailRegNum').text('获取验证码');
                    $('#getEmailRegNum').removeClass('reg-auth-img-false');
                    $('#getEmailRegNum').unbind('click').bind('click', refresh_auth_emailNum)
                    $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700')
                    $('#login-reg-email').addClass('reg-false');
                }
            },
            error: function (res) {
                layer.msg("获取验证码失败");
                $('#login-reg-email').addClass('reg-false');
                $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700');
            }
        })

        $('#getEmailRegNum').unbind('click')
        $('#getEmailRegNum').css('cursor', 'default').css('background', '#999')
        $('#getEmailRegNum').text('60s后重新获取');
        $('#getEmailRegNum').addClass('reg-auth-img-false');

        timeS1 = 59;
        timeR1 = setInterval(function () {
            if (timeS1 > 0) {
                $('#getEmailRegNum').text(timeS1 + 's后重新获取');
                timeS1--;
            } else {
                clearInterval(timeR1);
                $('#getEmailRegNum').text('获取验证码');
                $('#getEmailRegNum').removeClass('reg-auth-img-false');
                $('#getEmailRegNum').unbind('click').bind('click', refresh_auth_emailNum);
                $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700')
            }
        }, 1000)

    }
}

//注册检测
$('.login-window').on('blur', '.tologin-input input', function () {
    var inputid = $(this).attr('id');
    var text = $(this).val();
    switch (inputid) {
        case 'login-reg-email':  //邮箱验证
            var mailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (text.length == 0) {
                $('#reg-tip-email').text('邮箱格式错误');
                $('.cuowu1').show();
                $('#reg-tip-email').show();
            } else if (!mailreg.test(text)) {
                $('#reg-tip-email').text('邮箱格式错误');
                $('.cuowu1').show();
                $('#reg-tip-email').show();
            } else {
                $('.cuowu1').hide();
                $('#reg-tip-email').hide();
            }
            break;
        case 'login-reg-username':   //用户名验证
            var unreg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if (text.length == 0) {
                $('#reg-tip-tel').text('请填写信息');
                inputfalse($(this));
            } else if (!unreg.test(text)) {
                $('#reg-tip-tel').text('用户名为2-12位字符');
                inputfalse($(this));
            } else {
                regEmailOrUsername(text, $(this), 0)
            }
            break;
        case 'login-reg-tel': //电话验证
            if (text.length == 0) {
                $('div[data-error="phone"]').show();
                $('div[data-error="phone"] span').text('手机号格式错误');
            } else {
                var isMob = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!isMob.test(text)) {
                    inputfalse($(this));
                    $('div[data-error="phone"]').show();
                    $('div[data-error="phone"] span').text('手机号格式错误');
                } else {
                    inputtrue($(this));
                    $('div[data-error="phone"]').hide();
                }
            };
            break;
        case 'login-reg-password':  //密码验证
            if (text.length < 6 || text.length > 18) {
                $('.cuowu1').show();
                $('#reg-tip-pass').text('密码格式错误');
                $('#reg-tip-pass').show();
                inputfalse($(this));
            } else if (text.length == 0) {
                $('.cuowu1').show();
                $('#reg-tip-pass').text('请输入密码');
                $('#reg-tip-pass').show();
                inputfalse($(this));
            } else {
                inputtrue($(this));
                $('#reg-tip-pass').text('').hide();
                $('.cuowu3').hide();
            }
            break;
        case 'login-reg-repassword': //再次输入密码验证
            if (text.length == 0) {
                $('#reg-tip-tel')('请输入密码');
                inputfalse($(this));
            } else if (text == $('#login-reg-password').val()) {
                inputtrue($(this));
                $('#reg-tip-pass').text('').hide();
                $('.cuowu3').hide();
            } else {
                layer.msg('两次输入密码不一致');
                inputfalse($(this));
            }
            break;
        case 'login-reg-auth':  //验证码验证
            if (text.length < 6) {
                $('div[data-error="phoneVe"]').show();
                $('div[data-error="phoneVe"] span').text('验证码错误');
                inputfalse($('#login-reg-auth'));
            } else if (text.length == 0) {
                $('div[data-error="phoneVe"]').show();
                $('div[data-error="phoneVe"] span').text('请输入验证码');
                inputfalse($('#login-reg-auth'));
            } else {
                $.ajax({
                    url: "https://sso.thingjs.com/uinapi/register/isPhoneVCodeValid?phoneNumber=" + $('#login-reg-tel').val() + "&vcode=" + $('#login-reg-auth').val(),
                    type: "get",
                    success: function (res) {
                        if (res.code == '0') {
                            inputtrue($('#login-reg-auth'));
                        } else {
                            inputfalse($('#login-reg-auth'));
                        }
                    }
                });
                $('div[data-error="phoneVe"]').hide();
            }
            break;
        default: break;
    }
})

$('.login-window').on('click', '.forget-change-mob', function () {

    $('.forget-email-window').hide();
    $('.forget-tel-window').show();
    $('.login-window').addClass('login-forget-tel');
    $('.login-forget-window').css('margin-top', '0px');
    $('.login-other').css('bottom', '28px');
})

//忘记密码-手机-检测
$('.login-window').on('blur', '.forget-tel-window input', function () {
    var inputid = $(this).attr('id');
    var text = $(this).val();
    switch (inputid) {
        case 'forgetinp-tel': //电话验证
            if (text.length == 0) {
                $('div[data-error="forgetTel"]').show();
                inputfalse($(this));
            } else {
                var isMob = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!isMob.test(text)) {
                    $('div[data-error="forgetTel"]').show();
                    inputfalse($(this));
                } else {
                    $('div[data-error="forgetTel"]').hide();
                    inputtrue($(this));
                }
            };
            break;

        case 'forgetinp-telsec':  //密码验证
            if (text.length < 6 || text.length > 18) {
                $('div[data-error="forgetTel-pwd"]').show();
                inputfalse($(this));
            } else {
                $('div[data-error="forgetTel-pwd"]').hide();
                inputtrue($(this));
            }
            break;
        case 'forgetinp-telsec-again': //再次输入密码验证
            if (text.length == 0) {
                $('div[data-error="forgetTel-pwd1"]').show();
                inputfalse($(this));
            } else if (text == $('#forgetinp-telsec').val()) {
                inputtrue($(this));
                $('div[data-error="forgetTel-pwd1"]').show();
            } else {
                $('div[data-error="forgetTel-pwd"]').hide();
                inputfalse($(this));
            }
            break;
        case 'forgetinp-telreg':  //验证码验证
            if (text.length < 6 && text.length > 0) {
                $('div[data-error="forgetTel-code"]').show();
            } else if (text.length == 0) {
                $('div[data-error="forgetTel-code"]').show();
            } else {
                $.ajax({
                    url: "https://sso.thingjs.com/uinapi/register/isPhoneVCodeValid?phoneNumber=" + $('#forgetinp-tel').val() + "&vcode=" + $('#forgetinp-telreg').val(),
                    type: "get",
                    success: function (res) {
                        if (res.code == '0') {
                            inputtrue($('#forgetinp-telreg'));
                        } else {

                            inputfalse($('#forgetinp-telreg'));
                        }
                        $('div[data-error="forgetTel-code"]').hide();
                    }
                });
            }
            break;


        case 'forgetinp-email': //邮箱验证
            if (text.length == 0) {
                $('div[data-error="forgetEmail"]').show();
                inputfalse($(this));
            } else {
                var mailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                // var isMob = ^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$;
                if (!mailreg.test(text)) {
                    $('div[data-error="forgetEmail"]').show();
                    inputfalse($(this));
                } else {
                    $('div[data-error="forgetEmail"]').hide();
                    inputtrue($(this));
                }
            };
            break;

        case 'forgetinp-telsec-email':  //密码验证
            if (text.length < 6 || text.length > 18) {
                $('div[data-error="forgetEmail-pwd"]').show();
                inputfalse($(this));
            } else {
                $('div[data-error="forgetEmail-pwd"]').hide();
                inputtrue($(this));
            }
            break;
        case 'forgetinp-telsec-again-email': //再次输入密码验证
            if (text.length == 0) {
                $('div[data-error="forgetEmail-pwd1"]').show();
                inputfalse($(this));
            } else if (text == $('#forgetinp-telsec-email').val()) {
                inputtrue($(this));
                $('div[data-error="forgetEmail-pwd1"]').hide();
            } else {
                $('div[data-error="forgetEmail-pwd1"]').show();
                inputfalse($(this));
            }
            break;
        case 'forgetinp-telreg-email':  //验证码验证
            if (text.length < 6 && text.length > 0) {
                $('div[data-error="forgetEmail-code"]').show();
                // $('.forget-yzm-tip').text('验证码错误');
                // $('.forget-yzm-tip').css('top','24px').css('right','142px').css('width','26%');
                // $('.forget-yzm-tip').show();
                // $('.cuowu3').css('top','26px')
                // $('.cuowu3').show();
            } else if (text.length == 6) {
                $('div[data-error="forgetEmail-code"]').hide();
                // $('.forget-yzm-tip').hide();
                // $('.cuowu3').hide();
            }
            break;
        default: break;
    }
})

$('.login-window').on('focus', '.forget-tel-window input', function () {
    $(this).addClass('forget-focu-input');
})
$('#getForgetNum').on('click', forget_tel_send)
async function forget_tel_send() {
    // var res = verifyCode.validate(document.getElementById("forgetinp-telreg-img").value);
    var res;
    if(login_code == undefined){
        res = false;
    }else {
        res = await login_captcha.check_code(login_code);
    }
    if ($('#forgetinp-tel').val().length == 0) {
        $('div[data-error="forgetTel"]').show();
        // $('.forget-tel-tip').text('手机号格式错误');
        // $('.forget-tel-tip').css('top','7px').css('right','4px').css('width','33%');
        // $('.forget-tel-tip').show();
        // $('.cuowu1').show();
    } else if (res == false) {
        // layer.msg('图形验证码输入错误');
        $('div[data-error="forgetTel-img"]').show();
        // $('.forget-pic-tip').text('图形验证码错误');
        // $('.forget-pic-tip').css('top','7px').css('right','142px').css('width','33%');
        // $('.forget-pic-tip').show();
        // $('.cuowu2').show();
        return;
    } else {
        $('#getForgetNum').unbind('click')
        $('.forget-pic-tip').text('');
        $('.forget-pic-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-pic-tip').hide();
        $('.cuowu2').hide();
        $('#getForgetNum').text('60s后重新获取');
        $('#getForgetNum').addClass('forget-send-outh-false');
        $('#getForgetNum').css('cursor', 'default').css('background', '#999');
        timeS = 59;
        timeR = setInterval(function () {
            if (timeS > 0) {
                $('#getForgetNum').text(timeS + 's后重新获取');
                timeS--;
            } else {
                clearInterval(timeR);
                $('#getForgetNum').text('获取验证码');
                $('#getForgetNum').removeClass('forget-send-outh-false');
                $('#getForgetNum').css('background', '#ff8700').css('cursor', 'pointer');
                $('#getForgetNum').bind('click', forget_tel_send);
            }
        }, 1000)
        sendPhoneCode(login_code,login_captcha.token,$('#forgetinp-tel').val());
    }
}

function sendPhoneCode(login_code,token,phone) {
    $.ajax({
        url: SERVERPATH+"/api/sso/send_vcode?code=" + login_code +'&token='+ token+'&phone='+ phone,
        type: "get",
        success: function (res) {
            // console.log(res,"res");
            if (res.code == '200') {
                layer.msg(res.message);
            } else if (res.code == '500') {
                clearInterval(timeR);
                // if(res.message == '5分钟内不允许重复发送验证码'){
                    layer.msg(res.message);
                // }else {
                //     layer.msg('该手机号未注册');
                // }
                if($('#forgetinp-tel')){
                    $('#forgetinp-tel').addClass('reg-false');
                    // $('#getForgetNum').bind('click',forget_tel_send)
                    $('#getForgetNum').css('background', '#999');
                }else {
                    console.log(1);
                    clearInterval(timeR);
                    $('#getVerificaPhone').text('获取验证码');
                    $('#getVerificaPhone').unbind('click').bind('click',getPhoneNum).css('background','').css('color','').css('border','').css('cursor','');
                }
            }
        }
    })
}

function b64Encode(str) {
    return btoa((str));
}

  function b64Decode(str) {
    return decodeURIComponent(atob(str));
  }
//邮箱获取验证码
async function getEmailNum() {
//    console.log("邮箱获取验证码")
    var emailCheck;
    if(login_code == undefined){
        emailCheck = false;
    }else {
        emailCheck = await login_captcha.check_code(login_code);
    }
    if (!emailCheck) {
        $('.forget-pic-tip').text('图形验证码错误');
        $('.forget-pic-tip').css('top', '7px').css('right', '142px').css('width', '33%');
        $('.forget-pic-tip').show();
        $('.cuowu2').show();
        return;
    } else {
        $('.forget-pic-tip').text('').hide();
        $('.cuowu2').hide();
    }

    var email = $('#forgetinp-email').val();
    var token = 'Bearer ' + getCookie('accessToken');
    var mailreg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");

    if (email == '') {
        $('.forget-tel-tip').text('邮箱格式错误');
        $('.forget-tel-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-tel-tip').show();
        $('.cuowu1').show();
        return false;
    } else if (!mailreg.test(email)) {
        $('.forget-tel-tip').text('邮箱格式错误');
        $('.forget-tel-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-tel-tip').show();
        $('.cuowu1').show();
        return false;
    } else {
        // layer.msg('验证码已发送');
        $('#getVerificaEmail').unbind('click')
        $('#getVerificaEmail').addClass('forget-send-outh-false');
        $('#getVerificaEmail').css('cursor', 'default').css('background', '#999');
        timeD = 59;
        timeT = setInterval(function () {
            if (timeD > 0) {
                $('#getVerificaEmail').text('60s后重新获取');
                $('#getVerificaEmail').text(timeD + 's后重新获取');
                timeD--;
            } else {
                clearInterval(timeT);
                $('#getVerificaEmail').text('获取验证码');
                $('#getVerificaEmail').removeClass('forget-send-outh-false');
                $('#getVerificaEmail').css('background', '#ff8700').css('cursor', 'pointer');
                $('#getVerificaEmail').bind('click', getEmailNum);
            }
        }, 1000)
        $.ajax({
            url: SERVERPATH+"/api/sso/send_email_vcode?code=" + login_code +'&token='+ login_captcha.token+'&email='+ email,
            type: "get",
            success: function (res) {
                if (res.code == '200') {
                    layer.msg(res.message);
                } else if (res.code == '500') {
                    layer.msg(res.message);
                    clearInterval(timeT);
                    $('#getVerificaEmail').text('获取验证码');
                    $('#getVerificaEmail').unbind('click').bind('click', getEmailNum);
                    $('#getVerificaEmail').css('background','#ff8000').css('color','#fff').css('border','0').css('cursor','pointer')
                    // $('#login-reg-tel').addClass('reg-false');
                }
            },error:function(e) {
                if(e.status==401) {
                    clearAllCookie();
                    loginwindowon();
                    return;
                }
            }
        })
    }
}
$('#getVerificaEmail').on('click', getEmailNum)
//忘记密码通过手机找回密码
function forgetSecByPhone() {
    var canreg = true;
    if (canreg) {
        var data = {
            phone: $('#forgetinp-tel').val(),
            code: $('#forgetinp-telreg').val(),
            pwd: $('#forgetinp-telsec-again').val(),
        };
        $.ajax({
            url: SERVERPATH+'/api/sso/reset_password_by_vcode',
            type: "post",
            data: data,
            success: function (res) {
                if (res.code == '200') {
                    layer.msg('密码修改成功', { time: 1500 });
                    loginclose();
                    $("#login").trigger("click");
                } else {
                //     if (res.msg == '手机号格式不正确') {
                //         res.msg = '手机号格式错误'
                //     }
                    layer.msg('密码修改失败,' + res.message);
                }
            }
        })
    } else return;
}
//忘记密码通过邮箱找回密码
async function forgetSecByEmail() {
    // var emailCheck = forgetEmail.validate(document.getElementById("forgetinp-emailreg-img").value);
    var emailCheck = await login_captcha.check_code(login_code)
    if (!emailCheck) {
        $('div[data-error="forgetEmail-img"]').show();
        return;
    }
    var email = $('#forgetinp-email').val();
    var code = $('#forgetinp-telreg-email').val();
    var psw = $('#forgetinp-telsec-again-email').val();
    var opsw = $('#forgetinp-telsec-email').val();
    var mailreg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");

    if (email == '') {
        $('.forget-email-tip').text('邮箱格式错误');
        $('.forget-email-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-email-tip').show();
        $('.cuowu1').show();
        return;
    } else if (!mailreg.test(email)) {
        $('.forget-email-tip').text('邮箱格式错误');
        $('.forget-email-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-email-tip').show();
        $('.cuowu1').show();
        return;
    } else if (code == '') {
        $('.forget-yzm-tip').text('验证码错误');
        $('.forget-yzm-tip').css('top', '23px').css('right', '142px').css('width', '26%');
        $('.forget-yzm-tip').show();
        $('.cuowu3').css('top', '25px')
        $('.cuowu3').show();
        return;
    } else if (psw == '' || psw.length < 6 || psw.length > 18 || psw != opsw) {
        return;
    } else if (opsw == '') {
        return;
    } else {
        var data = {
            email: email,
            code: code,
            pwd: psw,
        };
        $.ajax({
            url: SERVERPATH+'/api/sso/reset_password_by_email',
            type: "post",
            data: data,
            success: function (res) {
                if (res.code == '200') {
                    layer.msg('密码修改成功', { time: 1500 });
                    loginclose();
                    $("#login").trigger("click");
                } else {
                //     if (res.msg == '手机号格式不正确') {
                //         res.msg = '手机号格式错误'
                //     }
                    layer.msg(res.message);
                    // console.log('res: ', res);
                    // layer.msg('密码修改失败,' + res.msg);
                }
            }
        })
    }


}
function regEmailOrUsername(vle, th, type) {
    if (type == '1') {
        var checkURL = 'https://sso.thingjs.com/uinapi/register/checkEmail?email=' + vle;
    } else {
        var checkURL = 'https://sso.thingjs.com/uinapi/register/checkUsername?username=' + vle;
    }
    $.ajax({
        url: checkURL,
        type: 'get',
        success: function (res) {
            if (res.code == '500') {
                if (type == '1') {
                    $('#reg-tip-email').text('邮箱已被注册');
                } else {
                    $('#reg-tip-uname').text('该用户名已存在');
                }
                inputfalse(th);
            } else if (res.code == '0') {
                if (type == '1') {
                    $('#reg-tip-email').text('');
                } else {
                    $('#reg-tip-uname').text('');
                }
                inputtrue(th);
            }
        },
        error: function (res) {
            if (type == '1') {
                $('#reg-tip-email').text('邮箱已被注册');
            } else {
                $('#reg-tip-uname').text('该用户名已存在');
            }
            inputfalse(th);
        }
    })
}

function inputfalse(i) {
    i.addClass('reg-false');
    i.removeClass('reg-right reg-focu-input');
}

function inputtrue(i) {
    i.addClass('reg-right');
    i.removeClass('reg-false reg-focu-input');
}

function regwindowdone() {
    clearInterval(timeR);
    $('.reg-auth-img').text('获取验证码');
    $('.reg-auth-img').removeClass('reg-auth-img-false');
    $('.login-window').removeClass('login-reg-over');
    $('.login-footer #login-forget').show();
    $('.login-footer #login-reg').show();
    $('#login-fas').hide();
    $('.login-reg-window').hide();
    $('.poptip').show();
    $('.img-pho').show();
}

$('.login-window').on('focus', '.reg-input input', function () {
    $(this).addClass('reg-focu-input');
    $(this).removeClass('reg-right reg-false');
})

$('.login-window').on('blur', '.reg-input input', function () {
    $(this).removeClass('reg-focu-input');
})

// $('.login-window').on('click', '#login-fas', function () {
//     $(".forget-window").hide();
//     $(".login-form-box").show();
//     $(".login-window").removeClass("forgetClass").css({ 'width': '380px', 'height': '358px' });
//     $('.error-hint-box').hide();
//     //注册验证码
//     $('#getPhoneRegNum').unbind('click').bind('click', refresh_auth_img)
//     $('#getPhoneRegNum').css('cursor', 'pointer').css('background', '#ff8700')

//     var type = null;
//     if ($.cookie('openid')) type = 'uname';
//     loginwindowon(type);
// })

$('.login-window').on('click', '.reg-footer input', function () {
    if ($(".reg-footer input").attr("checked")) {
        $(".reg-footer input").removeProp("checked");
    } else {
        $(".reg-footer input").prop("checked", true);
    }
})

$(".switch-login-box").on('click', function () {
    
    $('.error-hint-box').hide();

    // 生成图形验证码
    checkGraphicalCaptcha('captcha','reg-telreg-img',false);

    $(this).addClass('login-tab').siblings().removeClass('login-tab');
    if ($(this).attr('tab-index') == '0') {
        $(".verifica-code-login").show();
        $(".password-login").hide();
        $(".login-window").css("height", "418px");
        // login_captcha.refresh();
    } else {
        $(".verifica-code-login").hide();
        $(".password-login").show();
        $(".login-window").css("height", "358px");
    }

})

//注册
$('.login-window').on('click', "#reg-btn", function () {
    var phone = $('#login-reg-tel').val();
    var phoneCode = $('#phone-code').val();
    var login_mmd_url = "/mp/login_thingjs";
    document.getElementById("reg-btn").innerHTML="注册中...";
    document.getElementById("reg-btn").style.opacity="0.5";
    $.ajax({
        url: SERVERPATH + login_mmd_url,
        type: "post",
        data: {
            data: JSON.stringify({
                phone: phone,
                phoneCode: phoneCode
            })
        },
        success: function (res) {
            document.getElementById("reg-btn").innerHTML="登录/注册";
            document.getElementById("reg-btn").style.opacity="1";
            if (res.code == 200) {
                clearAllCookie();
                setCookie('role', res.role);
                setCookie('token', res.token);
                setCookie('accessToken', res.accessToken);
                setCookie('SameSite', 'None');
                setCookie('Secure', true);
                setCookie('id', res.id);
                setCookie('name', res.name);
                setCookie('openid', res.openid);
                if(res.login_times == 1){
                    loginSource = 'companyServerFirst';
                    // 手机端注册
                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})};
                }
                logingoon(res);
                if (window.AnalysysAgent && SERVERPATH) {
                    // 埋点_账号关联
                    window.AnalysysAgent && window.AnalysysAgent.alias(res.mmdId + '');
                    // 埋点 用户登录成功
                    window.AnalysysAgent && window.AnalysysAgent.track('user_login_success');
                }
            } else if (res.code == 205) {
                var fn = function () {
                    window.localStorage.removeItem('LOGINTIMEOUT');
                    $('body span.setTimeSpan').remove();
                    if (typeof (isLoginOther) == 'boolean') isLoginOther = false;
                    if (swal_close) swal_close();
                    $.ajax({
                        url: SERVERPATH + login_mmd_url,
                        type: "post",
                        data: {
                            data: JSON.stringify({
                                phone: phone,
                                phoneCode: phoneCode
                            }),
                            isOver: true
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                clearAllCookie();
                                setCookie('role', res.role);
                                setCookie('token', res.token);
                                setCookie('accessToken', res.accessToken);
                                setCookie('SameSite', 'None');
                                setCookie('Secure', true);
                                setCookie('id', res.id);
                                setCookie('name', res.name);
                                setCookie('openid', res.openid);
                                if(res.login_times == 1){
                                    loginSource = 'companyServerFirst';
                                    // 手机端注册
                                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})}
                                }
                                logingoon(res, 1);
                            } else {
                                layer.msg("验证码错误", { offset: ['45%', '46.5%'], time: 1500 });
                            }
                        }
                    });
                }
                coverLogin(fn, res);
            } else {
                layer.msg(res.message||res.msg||"验证码错误", { offset:'auto', time: 1500 });
            }
            agreedAgr1 = false;
            agreedAgr2 = false;
        }
    });
})

function emailRegister() {
    var res = verifyCode_email.validate(document.getElementById("reg-emailreg-img").value);
    getRegCode('',verifyCode_email)
    if (!res) return;
    var data = {
        email: $('#login-reg-email').val(),
        username: $('#login-reg-email').val(),
        emailCode: $('#emailRegister .login-reg-auth').val(),
        password: $('#emailRegister .login-reg-password').val(),
    };

    $.ajax({
        url: "https://sso.thingjs.com/uinapi/register/emailRegister",
        type: 'post',
        dataType: 'json',
        data: data,
        success: function (res) {
            if (res.success) {
                alert('注册成功', 'sucsure');
                $("#login-fas").trigger("click");
                $.ajax({
                    url: 'https://sso.thingjs.com/uinapi/register/images',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        image: getHeadImg(data.username),
                        username: data.username
                    }
                })
            } else {
                layer.msg('注册失败，' + res.msg);
            }
        }
    })
}

function phoneRegister() {
    var res = verifyCode_tel.validate(document.getElementById("reg-telreg-img").value);
    getRegCode('',verifyCode_tel)
    if (!res) return;
    var emailRollA = emailAdd();
    var canreg = true;
    var data = {
        email: emailRollA,
        username: $('#login-reg-tel').val(),
        password: $('#phoneRegister .login-reg-password').val(),
        company: $('#login-reg-company').val(),
        phone: $('#login-reg-tel').val(),
        phoneCode: $('#phoneRegister .login-reg-auth').val()
    };

    if (canreg) {
        $.ajax({
            url: "https://sso.thingjs.com/uinapi/register/register",
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                if (res.code == "0") {
                    //jiangzuokun  新增对于注册的判断，当用户处于指引情况下注册，并且成功会进入对应的登录指引。
                    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
                        layer.msg('注册成功');
                        setTimeout('userRegAndNeedlogin()', 200);
                    } else {
                        alert('注册成功', 'sucsure');
                    }
                    $("#login-fas").trigger("click");
                    $.ajax({
                        url: 'https://sso.thingjs.com/uinapi/register/images',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            image: getHeadImg(data.phone),
                            username: data.username
                        }
                    })

                } else {
                    layer.msg('注册失败，' + res.msg);
                }
            }
        })
    } else return;
}
//服务条款
$('.login-window').on('click', '.reg-footer span', function () {
    $('.reg-col').show();
    $('.reg-col-close').on('click', function () {
        $('.reg-col').hide();
    })
    $('#reg-col-suc').on('click', function () {
        $('.reg-col').hide();
        $(".reg-footer input").prop("checked", true);
    })
})

// $('#nav-reg').on('click', navRegOn);
//注册框

function emailAdd() {
    var emailRoll;
    $.ajax({
        url: 'https://sso.thingjs.com/uinapi/register/randomEmail',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (res) {
            if (res.success == true) {
                emailRoll = res.data

            }
        }
    })

    return emailRoll;
}

function navRegOn() {
    return;
    if(!$('.login-window:visible').length) {
        if (typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {AnalysysAgent.track('loginOrReg');}
    }
    $('.login-window').removeClass('fadeOut fadeOutReg fadeIn');
    $('.login-window').addClass('fadeIn');

    // 生成图形验证码
    // getRegCode();

    loginwindowon();

    // 添加延时函数，当点击导航栏中的注册时调用introTow_reg方法，跟踪并且显示用户注册指引。
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        setTimeout("introTwo_reg()", 500);
    }
    $('.tologin-tittle div').eq(1).addClass('login-tab').siblings().removeClass('login-tab');
    $(".verifica-code-login").show();
    $(".password-login").hide();
    $(".login-window").css("height", "418px");
}

function goBackLogin() {
    $('.login-form-box').show();
    $('.wxLogin-win').hide();

    if ($('.login-tab').attr('tab-index') == '1') {
        $('.login-window').removeClass('forgetClass').css('height', '358px');
    } else {
        $('.login-window').removeClass('forgetClass').css('height', '418px');
    }
}
function getLoginQR() {
    $('.wxLogin-win').show();
    $('.login-window').addClass('forgetClass').css('height', '385px');
    $('.login-form-box').hide();
    var id = null;
    $.ajax({
        type: "GET",
        url: SERVERPATH + "/api/wloginid",
        dataType: "text",
        //jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        contentType: "text/html; charset=utf-8",
        async: false,
        success: function (data) {
            id = data;
        }
    });
    var url = 'https://open.weixin.qq.com/connect/qrcode/' + id;
    // window.location.href = url
    $('.wxlogin2').html("<img onclick='goBackLogin()' class='img-weixin' style='position: absolute;top: 25px;right: 40px; width:32px; cursor:pointer ' src='https://www.thingjs.com/guide/image/wincom.png'><img style='margin-left: 10px; margin-top: 12px;' src='" + url + "' width='280px' height='280px'><div><span style='display: block;text-align: center;'>请使用微信扫描二维码登录</span></div>");
    var t = Date.parse(new Date());
    function _gettoken(t) {
        var check = 'https://long.open.weixin.qq.com/connect/l/qrconnect?uuid=' + id + (t ? "&last=" + t : "");
        $.ajax({
            type: "GET",
            url: check,
            dataType: "script",
            cache: false,
            timeout: 0,//1700, //超时时间设置，单位毫秒
            success: function () { //请求成功的回调函数
                var c = window.wx_errcode;
                switch (c) {
                    case 405:
                        // 这里写登录刷新
                        var login_wx_url = "/api/wxlogin?code=" + window.wx_code;
                        if ($('.login-window-header span').text() == '账号绑定') {
                            login_wx_url = "/api/wxlogin" + "?binding=b" + "&code=" + window.wx_code
                        }
                        $.ajax({
                            type: "GET",
                            url: SERVERPATH + login_wx_url,
                            success: function (res) {
                                if (res.code == 200) {
                                    clearAllCookie();
                                    setCookie('role', res.role);
                                    setCookie('token', res.token);
                                    setCookie('accessToken', res.accessToken);
                                    setCookie('SameSite', 'None');
                                    setCookie('Secure', true);
                                    setCookie('id', res.id);
                                    setCookie("mmdId", res.mmdId);

                                    if(res.login_times == 1){
                                        loginSource = 'companyServerFirst';
                                    }
                                    logingoon(res);
                                } else if (res.code == 202) {
                                    if (window.location.protocol == "https:") {
                                        if (res.headimgurl.indexOf("http:") == 0) {
                                            res.headimgurl = "https" + res.headimgurl.substring(4);
                                        }
                                    }
                                    setCookie('headimgurl', res.headimgurl);
                                    if (headimgurl.substring(0, 4) != 'http') {
                                        $('#headimg').css({
                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                        });
                                        $('#headimgs').css({
                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                        });
                                    } else {
                                        $('#headimg').css({
                                            'background-image': 'url(' + headimgurl + ')'
                                        });
                                        $('#headimgs').css({
                                            'background-image': 'url(' + headimgurl + ')'
                                        });
                                        reloadHeader();
                                    }
                                    $("img[data-type='imgurl']").attr('src', res.headimgurl + '?v=' + Math.random());
                                    $("[data-type='nick']").html(res.nick + '（' + res.wid + '）');
                                    $(".item-btn-edit.nick").html('更换微信');
                                    alert('绑定成功', 'sucsure');
                                    // if($('#ifBindWX').is(':visible')){
                                    //     $('#ifBindWX').html(res.nick + ' <span class="bindButton" onclick=loginwindowon("wid")>换绑</span>')
                                    // }
                                    loginwindowhide();
                                } else if (res.code == 500 && $('.login-window-header span').text() == '账号绑定') {
                                    alert(res.message, 'warning');
                                    loginwindowhide();
                                } else if (res.code == 205) {
                                    var userInfo = JSON.stringify(res.data);
                                    var fn = function () {
                                        window.localStorage.removeItem('LOGINTIMEOUT');
                                        $('body span.setTimeSpan').remove();
                                        if (tyoeof(isLoginOther) == 'boolean') isLoginOther = false;
                                        if (swal_close) swal_close();
                                        $.ajax({
                                            type: "GET",
                                            url: SERVERPATH + login_wx_url + '&isOver=true' + '&userInfo=' + userInfo,
                                            success: function (res) {
                                                if (res.code == 200) {
                                                    clearAllCookie();
                                                    setCookie('role', res.role);
                                                    setCookie('token', res.token);
                                                    setCookie('accessToken', res.accessToken);
                                                    setCookie('SameSite', 'None');
                                                    setCookie('Secure', true);
                                                    setCookie('id', res.id);
                                                    setCookie("mmdId", res.mmdId);
                                                    // var haveOne = res.haveOne ? res.haveOne : '';
                                                    // setCookie('haveOne', haveOne);

                                                    // if (!res.phoneVerify) {
                                                    //     loginwindowhide();
                                                    //     if (SERVERPATH) {
                                                    //         window.localStorage.setItem('showCaminfo', 'showCaminfo');
                                                    //         loginSuccessCallback();
                                                    //     } else {
                                                    //         // camInfoServer();
                                                    //     }
                                                    //     window.localStorage.setItem('loginMessage', JSON.stringify(res));
                                                    //     return
                                                    // }
                                                    logingoon(res, 1);
                                                } else if (res.code == 202) {
                                                    if (window.location.protocol == "https:") {
                                                        if (res.headimgurl.indexOf("http:") == 0) {
                                                            res.headimgurl = "https" + res.headimgurl.substring(4);
                                                        }
                                                    }
                                                    setCookie('headimgurl', res.headimgurl);
                                                    if (headimgurl.substring(0, 4) != 'http') {
                                                        $('#headimg').css({
                                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                                        });
                                                        $('#headimgs').css({
                                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                                        });
                                                    } else {
                                                        $('#headimg').css({
                                                            'background-image': 'url(' + headimgurl + ')'
                                                        });
                                                        $('#headimgs').css({
                                                            'background-image': 'url(' + headimgurl + ')'
                                                        });
                                                        reloadHeader();
                                                    }
                                                    $("img[data-type='imgurl']").attr('src', res.headimgurl + '?v=' + Math.random());
                                                    $("[data-type='nick']").html(res.nick + '（' + res.wid + '）');
                                                    $(".item-btn-edit.nick").html('更换微信');
                                                    alert('绑定成功', 'sucsure');
                                                    // if($('#ifBindWX').is(':visible')){
                                                    //     $('#ifBindWX').html(res.nick + ' <span class="bindButton" onclick=loginwindowon("wid")>换绑</span>')
                                                    // }
                                                    loginwindowhide();
                                                } else if (res.code == 500 && $('.login-window-header span').text() == '账号绑定') {
                                                    alert(res.message, 'warning');
                                                    loginwindowhide();
                                                } else {
                                                    alert(res.message, 'warning');
                                                }
                                                if (timeoutid) {
                                                    clearTimeout(timeoutid);
                                                    timeoutid = null;
                                                }
                                            }
                                        })
                                    }
                                    coverLogin(fn, res);
                                } else {
                                    alert(res.message, 'warning');
                                }
                                if (timeoutid) {
                                    clearTimeout(timeoutid);
                                    timeoutid = null;
                                }
                            }
                        })
                        break;
                    case 404:
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(_gettoken, 100, c);
                        break;
                    case 403:
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(_gettoken, 2e3, c);
                        break;
                    case 402:
                    case 500:
                        //console.error(500);
                        break;
                    case 408:
                        if (timeoutid) {
                            clearTimeout(timeoutid);
                            timeoutid = null
                        };
                        if (!$('.img-pho').hasClass('img-wx')) {
                            timeoutid = setTimeout(_gettoken, 700);
                        } else {
                            if (tid2) {
                                clearTimeout(timeoutid);
                                timeoutid = null;
                                tid2 = null;
                            }
                        }
                }
            },
            error: function (r, text, e) {
                if (timeoutid) clearTimeout(timeoutid);
                timeoutid = setTimeout(_gettoken, 1500, 408);
            }
        });
    }
    if (timeoutid) clearTimeout(timeoutid);
    timeoutid = setTimeout(_gettoken, 100);
    return timeoutid;
}
// 帮助中心
const OPENHELP=(url,_url)=>{
    var iWidth = 350;                          //弹出窗口的宽度;
    var iHeight = 478;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 80;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 + 696;
    if(_url) {
        var _open= window.open(_url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
        setTimeout(()=>{
            _open.location.href=url;
        //     window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
            storage.setItem("flag", 'false');
        },1000);
    } else {
        window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
    }
}
function addKf5Sample(url) {
    var openid = getCookie("openid");
    if (!openid) {
        loginwindowon();
        clearAllCookie();
        return;
    }
    try {
        if(url&&url.indexOf('thingjs.kf5.com')!=-1) {
            url.replaceAll('thingjs.kf5.com','help.thingjs.com');
        }
    } catch (error) {}
    var iWidth = 350;                          //弹出窗口的宽度;
    var iHeight = 478;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 80;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 + 696;
    window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
}
// kf5
function addKf5(url) {
    var openid = getCookie("openid");
    if (!openid) {
        loginwindowon();
        clearAllCookie();
        return
    }
    try {
        if(url&&url.indexOf('thingjs.kf5.com')!=-1) {
            url.replaceAll('thingjs.kf5.com','help.thingjs.com');
        }
    } catch (error) {}
    storage.setItem("flag", 'true');
    var userId = getUserName('id');
    var iWidth = 350;                          //弹出窗口的宽度;
    var iHeight = 478;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 80;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 + 696;
    var base='';
    if(location.hostname!='www.thingjs.com'&&location.hostname!='test-thingjs.3dlink.cn') {
        base=location.origin+'/static/';
    } else {
        base=location.origin+'/guide/';
    }
    var help=window.open(base+'help.html?userId='+(userId||'')+'&n='+Math.ceil(1000*Math.random()), '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
    help.onload=function(){
        help.postMessage({url:url,souece:location.host,type:'1'},'*');
    }
}
function addWeiXin(url) {
    var openid = getCookie("openid");
    if (!openid) {
        loginwindowon();
        clearAllCookie();
        return
    }
    window.open(url);
}
function addQQ(url) {
    var iWidth = 720;                          //弹出窗口的宽度;
    var iHeight = 600;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url+"?idkey=6469ad973d51c06fdc1f92232873e6c18dddb701a1f0dbc2dece2ad9d901f5c3", '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function checkLogin(url='') {
        storage.setItem("flag", 'true');
        var userId = getUserName('id');
        if(!userId) return SSOLOGIN.login();
        // var token = 'Bearer ' + getCookie('token');    
        try {
            if(url&&url.indexOf('thingjs.kf5.com')!=-1) {
                url.replaceAll('thingjs.kf5.com','help.thingjs.com');
            }
        } catch (error) {}
        if (userId == null) {
            $('.login-window').addClass('fadeIn');
            $('.login-window').show().removeClass('fadeOut fadeOutReg');
            $('.other-login').css('margin-top', '30px');
        } else {
            var iframe=document.createElement('iframe');
            iframe.style.position='absolute';
            iframe.style.zIndex=-1;
            iframe.style.display='none';
            var base='';
            if(location.hostname!='www.thingjs.com'&&location.hostname!='test-thingjs.3dlink.cn') {
                base=location.origin+'/static/';
            } else {
                base=location.origin+'/guide/';
            }
            iframe.setAttribute('src',base+'help.html?userId='+(userId||'')+'&n='+Math.ceil(1000*Math.random()));
            iframe.onload=function(){
                iframe.contentWindow.postMessage({url:url,souece:location.host,type:'2'},'*');
            }
            window.removeEventListener('message', loadhelp ,true);
            window.addEventListener('message', loadhelp ,true);
            function loadhelp(e) {
                if(e.data&&e.data.type=='2') {
                    var data=e.data;
                    if(data.url) {
                        location.href=data.url;
                    }
                }
            }
            $('body').append($(iframe));
            storage.setItem("flag", 'false');
        }
}
function dcvFile() {
    storage.setItem("flag", 'true');
    var userId = getUserName('id');
    if (userId == null) {
        $('.login-window').addClass('fadeIn');
        $('.login-window').show().removeClass('fadeOut fadeOutReg');
        $('.other-login').css('margin-top', '30px');
    } else {
        window.location.href = "https://www.thingjs.com/guide/dcv_api";
    }
}

function checkHelpLogin(flag) {
    var userId = getUserName('id');
    // var token = 'Bearer ' + getCookie('accessToken');
    if (flag == 'true') {
        $.ajax({
            url: 'https://sso.thingjs.com/uinapi/register/kf5?userId=' + userId,
            type: 'get',
            dataType: 'json',
            // headers: { 'Authorization': token },
            success: function (res) {
                // console.log(res.data);
                if (res.status == '0') {
                    window.location.href = res.data;
                }
            },error:function(e) {
                if(e.status==401) {
                    clearAllCookie();
                    loginwindowon();
                    return;
                }
            }
        });
        storage.setItem("flag", 'false');
    }
}

//获取内网ip
var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
var RTCPeerUserIP = '';
if (RTCPeerConnection) (function () {
    var rtc = new RTCPeerConnection({ iceServers: [] });
    if (1 || window.mozRTCPeerConnection) {
        rtc.createDataChannel('', { reliable: false });
    };

    rtc.onicecandidate = function (evt) {
        if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
    };
    rtc.createOffer(function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
    }, function (e) { console.warn("offer failed", e); });

    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;
    function updateDisplay(newAddr) {
        if (newAddr in addrs) return;
        else addrs[newAddr] = true;
        var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
        for (var i = 0; i < displayAddrs.length; i++) {
            if (displayAddrs[i].length > 16) {
                displayAddrs.splice(i, 1);
                i--;
            }
        }
        RTCPeerUserIP = displayAddrs[0];      //打印出内网ip
    }

    function grepSDP(sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line, index, arr) {
            if (~line.indexOf("a=candidate")) {
                var parts = line.split(' '),
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host') updateDisplay(addr);
            } else if (~line.indexOf("c=")) {
                var parts = line.split(' '),
                    addr = parts[2];
                updateDisplay(addr);
            }
        });
    }
})();

// 验证码
if (window.location.pathname !== '/admin/') {
    try {
        var verifyCode = new GVerify("v_container");
        // 手机号找回 看不清
        $('.changeVerify').on('click', function () {
            getRegCode('.changeVerify',verifyCode)
        })
        // 手机号找回
        var optionsphone = {
            id: "verifyCanvas",
            canvasId: "verifyCanvas",
            code: ""
        }
        var verifyCanvas = new GVerify(optionsphone);
        // 手机号找回
        $('#verifyCanvas').on('click', function () {
            // console.log(123)
            getRegCode('.verifyCanvas',verifyCanvas)
            $('div[data-error="phoneVe"]').hide();
        })
        

        // 邮箱找回
        var options_forget = {
            id: "forget-email",
            canvasId: "forget_email",
            code: ""
        }
        var forgetEmail = new GVerify(options_forget);
        // 点击码本身
        $('#forget-email, .forgetEmail').on('click', function () {
            getRegCode('.changeVerify_forEmail',forgetEmail)
        })
        // 邮箱找回 看不清
        $('.changeVerify_forEmail').on('click', function () {
            getRegCode('.changeVerify_forEmail',forgetEmail)
        })

        // 短信登录
        var options = {
            id: "v_container_tel",
            canvasId: "verifyCode_tel",
            code: ""
        }
        var verifyCode_tel = new GVerify(options);
        // 点击码本身
        $('#v_container_tel').on('click', function () {
            getRegCode('.changeVerify_tel',verifyCode_tel)
            $('div[data-error="phoneVe"]').hide();
        })
        // 短信登录 看不清
        $('.changeVerify_tel').on('click', function () {
            getRegCode('.changeVerify_tel',verifyCode_tel)
            $('div[data-error="phoneVe"]').hide();
        })
    }catch(err){
        // console.log(err);
    }
}
function qqlogin(userinfo, type) {
    var url = 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101582476&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.thingjs.com%2Fmp%2Fqq';
    if (userinfo && type) {
        $.ajax({
            url: SERVERPATH + '/mp/qqlogin',
            type: 'post',
            data: { "isOver": true, "userinfo": JSON.stringify(userinfo) },
            success: function (data) {
                if (data.code == 200) {
                    var res = data.data;
                    clearAllCookie();
                    setCookie('role', res.role);
                    setCookie('token', res.token);
                    setCookie('accessToken', res.accessToken);
                    setCookie('SameSite', 'None');
                    setCookie('Secure', true);
                    setCookie('id', res.id);
                    // if(res.login_times == 1){
                    //     loginSource = 'companyServerFirst';
                    // }
                    logingoon(res, 1);
                    return;
                }
                console.log(data);
            },
            error: function (err) {
                console.log(err);
                return;
            }
        })
        return;
    }
    if (SERVERPATH) {
        if(window.location.pathname=='/thingjs-x/') {
            url = url + '&state=4'
        } else if (window.location.protocol == "http:") {
            url = url + '&state=2'
        } else if (window.location.protocol == "https:") {
            url = url + '&state=3'
        }
    } else {
        if (window.location.protocol == "https:") {
            url = url + '&state=1'
        }
    }
    var iWidth = 734;                          //弹出窗口的宽度;
    var iHeight = 386;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 40;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');

    $(".other-login .loginMethod li div").css("borderColor", "#bae2f6");
    $(".other-login .loginMethod li").eq(1).siblings().find("div").css("borderColor", "#ffffff");
}

function emailLogin() {
    $("#emailRegister").show();
    $("#phoneRegister").hide();
    $('.loginTitleSpan').text('邮箱注册');
    $("#reg-btn,#reg-btn-thingx").attr("regType", "email");

    $(".other-login .loginMethod li div").eq(3).css("borderColor", "#ffdfcf");
    $(".other-login .loginMethod li").eq(3).siblings().find("div").css("borderColor", "#ffffff");
    if (!verifyCode_email.validate(document.getElementById("reg-emailreg-img").value)) {
        $("#reg-btn,#reg-btn-thingx").addClass("noEvents").css("background-color", "rgb(153,153,153)");
        $("#getEmailRegNum").css("background-color", "rgb(153,153,153)");
    } else {
        $("#reg-btn,#reg-btn-thingx").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
    }
}
function phoneLogin() {
    $("#emailRegister").hide();
    $("#phoneRegister").show();
    $('.loginTitleSpan').text('手机号注册');
    $("#reg-btn,#reg-btn-thingx").attr("regType", "phone");
    $('.login-window').css('height', '430px');

    $(".other-login .loginMethod li div").eq(0).css("borderColor", "#ffdfcf");
    $(".other-login .loginMethod li").eq(0).siblings().find("div").css("borderColor", "#ffffff");

    if (!verifyCode_tel.validate(document.getElementById("reg-telreg-img").value)) {
        $("#reg-btn,#reg-btn-thingx").addClass("noEvents").css("background-color", "rgb(153,153,153)");
    } else {
        $("#reg-btn,#reg-btn-thingx").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
    }
}

function receiveMessage(event) {
    //event.origin是指发送的消息源，一定要进行验证！！！
    //if (event.origin !== ) return;
    //event.data是发送过来的消息。
    //event.source是指子窗口，主动向子窗口发送消息可以用popup
    //postMessage有两个参数，消息和自己的源(例如http://www.baidu.com)，自己的源应该和目标源相同。否则发送会失败。
    try {
        if (event.data.auth == '购买在线部署成功') {
            window.AnalysysAgent && window.AnalysysAgent.track('pay_button_success',{
                'buyPackageName': event.data.titleName,     // 购买的类型
                'PaymentType': '在线部署',                  // 付费类型
                'price': '2888',                            // 金额
                'unit': '个/年'                             // 单位
            })
            window.AnalysysAgent && window.AnalysysAgent.profileSet('PaymentType_deploy', '在线部署'+'(个/年)');
            return;
        }
        // 现在这个没用了 event.data.auth不叫购买_成功
        if (event.data.auth == '购买_成功') {
            window.AnalysysAgent && window.AnalysysAgent.track('pay_button_success',{
                'buyPackageName': event.data.content.type,     // 购买的类型
                'PaymentType': event.data.content.type,        // 付费类型
                'pirce': event.data.content.pirce + '',
                'unit': '个'
            })
            return;
        }
        var edata = decodeURIComponent(event.data);
        var res = JSON.parse(decodeURI(edata));
        if (!res.auth || res.auth != "thingjsLoginMessage") return;
        if (res.code == 202) {
            if (window.location.protocol == "https:") {
                if (res.headimgurl.indexOf("http:") == 0) {
                    res.headimgurl = "https" + res.headimgurl.substring(4);
                }
            }
            setCookie('headimgurl', res.headimgurl);
            $('#headimg').css({
                'background-image': 'url(' + SERVERPATH + res.headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + SERVERPATH + res.headimgurl + ')'
            });
            reloadHeader();
            $("img[data-type='imgurl']").attr('src', res.headimgurl + '?v=' + Math.random());
            $("[data-type='qqnick']").html(res.nick + '（' + res.qqid + '）');
            alert('绑定成功', 'sucsure');
            loginwindowhide();
            return;
        } else if (res.code == 500) {
            // console.log('500')
            alert(res.message, 'warning');
            loginwindowhide();
            return;
        } else if (res.code == 205) {
            var fn = function () {
                window.localStorage.removeItem('LOGINTIMEOUT');
                $('body span.setTimeSpan').remove();
                if (typeof (isLoginOther) == 'boolean') isLoginOther = false;
                if (swal_close) swal_close();
                qqlogin(res.data, 1);
            }
            coverLogin(fn, res);
            return;
        }
    } catch (error) {
        return;
    }
    clearAllCookie();
    setCookie('role', res.role);
    setCookie('token', res.token);
    setCookie('accessToken', res.accessToken);
    setCookie('SameSite', 'None');
    setCookie('Secure', true);
    setCookie('id', res.id);
    setCookie("mmdId", res.mmdId);
    // var haveOne = res.haveOne ? res.haveOne : '';
    // setCookie('haveOne', haveOne);
    // if(!res.phoneVerify){
    //     loginwindowhide();
    //     camInfoServer();
    //     window.localStorage.setItem('loginMessage', JSON.stringify(res));
    //     return
    // }
    if(res.login_times == 1){
        loginSource = 'companyServerFirst';
    }
    logingoon(res, "QQ");
}

//添加消息接收函数
window.addEventListener("message", receiveMessage, false);
function getHeadImg(name) {
    // let hash = crypto.createHash('md5')
    // hash.update(userNick); // 传入用户名
    var hash = md5(name);
    var data = new Identicon(hash, 420).toString();
    // let imgData = new Identicon(hash.digest('hex')).toString()
    let imgUrl = 'data:image/png;base64,' + data // 这就是头像的base64码
    return imgUrl;
}
function encodeAno(a) {
    if (a.indexOf('/client/ThingJS/') >= 0) {
        return a;
    }
    a = encodeURI(a);
    return a.substr(0, a.lastIndexOf('/')) + a.substr(a.lastIndexOf('/')).replace(/0/g, '02').replace(/%/g, '01');
}

layui.use('element', function () {
    var element = layui.element;

    //一些事件监听

    element.on('tab(docDemoTabBrief)', function (data) {
        $('.forget-input-tip').hide();
        $('.icon-cuowu').hide();

    });
});
$('.forgetTel').on('click', function () {
    // 生成图形验证码
    checkGraphicalCaptcha('captcha-phone','forgetinp-telreg-img',false)
    // getRegCode('.forgetTel',verifyCode)
    $('.error-hint-box').hide();
    // login_captcha.refresh();
})
$('.forgetEmail').on('click', function () {
    $('.error-hint-box').hide();
    login_captcha.refresh();
})
if (getCookie('userNick') != null) {
    $("#login").html(decodeURI(decodeURI(getCookie('userNick'))));
}

//充值
function recharge() {
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        window.location.href = document.location.origin;
    } else {
        var index = layer.open({
            type: 2,
            move: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            area: ['535px', '416px'],
            resize: false,
            skin: 'buyRecharge',
            content: ['https://www.thingjs.com/static/payment/createPay/payRecharge.html?userId=' + $.cookie('mmdId'), 'no'],
            // content: ['http://127.0.0.1/static/payment/createPay/payRecharge.html?theme=black&userId=' + $.cookie('mmdId'), 'no'],
            success: function (index) {
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
}
function updatepriceVIP(){
    // window.open(path+'/guide/?m=price','sample');
    window.open('https://www.thingjs.com/guide/price/','sample')
};


//升级VIP
function updateVIP(flag,msg){
    if(flag){
        var msg = {title:'开通VIP'}
        camInfoServer('fromVIPServer',msg);
        return
    }
    var endTime = '';
    $.ajax({
        url: SERVERPATH+'/api/User_info'+(SERVERPATH?'?token='+$.cookie('token'):''),
        type: 'get',
        async: false,
        success: function (data) {
            var user = {};
            user = data;
            endTime = new Date(user.vip_end);
            endTime.setDate(endTime.getDate() + 1);
            endTime = new Date(endTime).Format('yyyy-MM-dd hh:mm:ss');

            var currentTime = new Date().Format('yyyy-MM-dd hh:mm:ss');;
            if(endTime<currentTime) endTime = '';
        }
    })

    var userId = $.cookie('mmdId');
    var result = {
        'title': '开通VIP',
        'imgsrc': (SERVERPATH?SERVERPATH:window.location.protocol + "//" + window.location.host) +
            '/static/payment/createPay/images/zxkfvip_nian.png',
        'describe': '<span class="_title">购买VIP（商业开发者)：</span><br/><br/>有效期：' + getNowFormatDatevip(endTime, 0) + ' - ' + getNowFormatDatevip(endTime, 1,-1) + "。<br/><br/><span ng-show='!publicPay'>付款后VIP（商业开发者）即时生效。</span><span ng-show='publicPay'>请在对公付款后及时与平台客服联系。谢谢！</span>",
        'price': 2998,
        'id': userId,
        'type': "ThingJS_VIP",
        'step':msg.step,
        'paySource':window.location.href
    }
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        window.location.href = document.location.origin;
    } else {
        layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            area: ['585px', '568px'],
            content: ['https://www.thingjs.com/static/payment/createPay/payment.html?type=ThingJS_VIP&userId=' + userId,  'no'],
            skin: 'buyModelDiv',
            success: function () {
                document.getElementsByClassName('buyModelDiv')[0].querySelector('.layui-layer-content').children[0].contentWindow.postMessage(result, '*');
            }
        });
        window.removeEventListener('message', myStyle ,true);
        window.addEventListener('message', myStyle ,true);
        function myStyle (event) {
            if(event.data&&event.data.type&&event.data.type=="newStyle") {
                $(".buyModelDiv").css({"border-radius":"8px","background-color": "transparent"});
                $(".buyModelDiv iframe").css("border-radius","8px");
            }
        }
        createListener();
    }
}
// 弹窗关闭事件
function createListener () {
    function myFunc (event) {
            if (event.data == 'closeWin') { // 验证 测试一下 用不用加remove
                // clearAllCookie();
                window.location.href = document.location.origin;
            }
            if (event.data == 'close') {
                layer.closeAll();
                // 埋点 支付页面关闭事件
                // AnalysysAgent.track('pay_close')
                window.removeEventListener('message', myFunc ,true);
            }
            if (event.data.auth == '购买成功') {
                if (event.data.titleName == '开通VIP') {
                    window.AnalysysAgent && window.AnalysysAgent.track('pay_button_success',{
                        'buyPackageName': event.data.titleName,     // 购买的类型
                        'PaymentType': '在线开发',                  // 付费类型
                        'price': 5998 + '', // 金额
                        'unit': '个/年'                            // 单位
                    })
                    window.AnalysysAgent && window.AnalysysAgent.profileSet('PaymentType_development', '在线开发'+'(个/年)');
                }
            }
    }
    window.removeEventListener('message', myFunc ,true)
    window.addEventListener('message', myFunc ,true)
}
function getNowFormatDatevip(endTime, next,day) {
    var date;
    var _index = endTime.indexOf("1970");
    if (endTime && _index != 0) {
        date = new Date(endTime);
    } else {
        date = new Date();
    }
    if(next<1){
        date.toLocaleString(date.setMonth(date.getMonth() + next*10));
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
//申请建模
var popOpening = true;
function modelServer(flag,info) {
    var height = (info && info.toolInfo)?'551px':'658px';
    var openid = getCookie("openid");
    if (!openid) {
        loginSource = ''
        loginwindowon();
        clearAllCookie();
    } else {
        if(flag){
            var msg = {title:'申请建模'}
            camInfoServer('fromModelServer',msg);
            popOpening = true;
            return
        }
        get_mmd_idByToken().then(res=>{
            if(res) {                
                info.currentUrl = window.location.href
                var index = layer.open({
                    type: 2,
                    move: false,
                    title: false,
                    closeBtn: 0,
                    scrollbar: false,
                    area: ['658px', height],
                    resize: false,
                    skin: 'applySkin',
                    content: [location.protocol + '//store.thingjs.com/modelsever?userId=' + $.cookie('mmdId'), 'no'],
                    success: function () {
                        document.getElementsByClassName('applySkin')[0].children[0].children[0].contentWindow.postMessage({showModel:'showModel',info:info,mmdId:$.cookie('mmdId')}, '*');
                    }
                });
                window.addEventListener('message', function (event) {
                    if (event.data == 'close') {
                        layer.close(index);
                    }
                });
            } else {
                loginSource = 'modelServer'
                loginwindowon();
                clearAllCookie();
            }
        });
    }
}
//申请开发
function devServer(flag,info) {
    var openid = getCookie("openid");

    if (!openid) {
        loginSource = 'devServer'
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    } else {
        if(flag){
            var msg = {title:'请求协助',class:'devBlue'}
            camInfoServer('fromdevServer',msg);
            popOpening = true;
            return
        }
        get_mmd_idByToken().then(res=>{
            if(res) {
                info.currentUrl = window.location.href
                var index = layer.open({
                    type: 2,
                    move: false,
                    title: false,
                    closeBtn: 0,
                    scrollbar: false,
                    area: ['658px', '658px'],
                    resize: false,
                    skin: 'applySkin',
                    content: [location.protocol + '//store.thingjs.com/devsever?userId=' + $.cookie('mmdId'), 'no'],
                    success: function () {
                        document.getElementsByClassName('applySkin')[0].children[0].children[0].contentWindow.postMessage({showdev:'showdev',info:info}, '*');
                    }
                });
                window.addEventListener('message', function (event) {
                    if (event.data == 'close') {
                        layer.close(index);
                    }
                });
            } else {
                loginSource = 'devServer'
                loginwindowon();
                clearAllCookie();
            }
        });
    }
}
//企业信息补全
var camInfoType = '';
var camInfoMsg = '';
function camInfoServer(type,msg) {
    try {
        delThingJsAccessToken();
    } catch (error) {
        console.log(error);
        const delThingJsAccessToken = function(){
            if(getCookie&&getCookie('thingJsAccessToken')&&setCookie) {
                setCookie('thingJsAccessToken', '');
            }
        }
        delThingJsAccessToken();
    }
    var openid = getCookie("openid");
    var token = getCookie("token");
    $('.vip.svip').removeClass('svip');
    $(".user_msg .m-avataruploader-imagewrapper.svip").removeClass('svip');
    $('#headimg.svip').removeClass('svip');
    $('#headimgs.svip').removeClass('svip');
    if (!openid || !token) {
        loginSource = 'companyServer';
        camInfoType = type;
        camInfoMsg = msg;
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    }else{
        $.ajax({
            url: SERVERPATH + '/api/User_info',
            type: 'get',
            success: function (data) {
                var openPage = '';
                if(data.permission == "developer"){
                  $('.user_msg .m-avataruploader-imagewrapper').addClass('bordervip');
                  $('#headimg').addClass('bordervip');
                  $('#headimgs').addClass('bordervip');
                }
                if(data.isVipPro) {
                    $('.vip').addClass('svip');
                    $(".user_msg .m-avataruploader-imagewrapper").addClass('svip');
                    $('#headimg').addClass('svip');
                    $('#headimgs').addClass('svip');
                }
                if(data.mmdId) setCookie('mmdId',data.mmdId);
                if(!data.phoneVerify) openPage = 'phone';
                if(!data.office || !data.company || !data.namebyCam) openPage = openPage?openPage+'.info':'info';

                if(openPage){//缺
                    if (type) data.type = type;
                    data.msg = {pages:openPage,currentUrl:window.location.href}
                    if (msg) Object.assign(data.msg, msg);
                    
                    // var url = 'http://127.0.0.1:8080/campanysever';
                    var url = location.protocol + '//store.thingjs.com/campanysever';

                    var height = '398px';
                    if(openPage.indexOf('phone')>-1) height = '398px';
                    if(type == "companyServerFirst"){
                        data.msg = {title:'注册',titleTip:'请填写您的完整信息，谢谢！',pages:openPage,currentUrl:window.location.href}
                    } 

                    var index = layer.open({
                        type: 2,
                        move: false,
                        title: false,
                        closeBtn: 0,
                        fixed: false,
                        scrollbar: false,
                        area: ['540px', height],
                        resize: false,
                        skin: 'caminfoSkin',
                        content: [url, 'no'],
                        isOutAnim: false,
                        success:function(){
                            document.getElementsByClassName('caminfoSkin')[0].children[0].children[0].contentWindow.postMessage({openCampanyPanel:data}, '*');
                            $('.layui-layer').css("background-color","rgba(0,0,0,0)");
                            $('.layui-layer').css("box-shadow","none");
                        }
                    });
                    function companyFun(event) {
                        $('.caminfoSkin').children().children('iframe').css("height",height);
                        // $('.caminfoSkin').css("width","757px");
                        if (event.data == 'closePanel') {
                            layer.close(index);
                            window.removeEventListener('message', companyFun ,true);
                            var loginGo = window.localStorage.getItem('signal');
                            if (loginGo) {
                                var loginMessage = window.localStorage.getItem('loginMessage');
                                loginContinue(JSON.parse(loginMessage));
                            }
                            window.localStorage.removeItem('signal');
                            window.localStorage.removeItem('loginMessage');

                        } else if(event.data == 'addMoreStyle'){
                            $('.caminfoSkin').children().children('iframe').css("height","573px");
                            $('.caminfoSkin').css({"width":"757px","overflow": "visible"});
                        } else if(event.data == 'closeMoreStyle') {
                            $('.caminfoSkin').children().children('iframe').css("height",height+'px');
                            $('.caminfoSkin').css({"width":"540px","overflow": "visible"});
                        } else if (event.data == 'buy') {
                            showPayment(subject);
                        } else if (event.data == 'document') {
                            if (subject == "RTSP") { window.open("https://thingjs-static.oss-cn-beijing.aliyuncs.com/doc/LiveServer%20RTSP%20%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6%20Rev.2.2.pdf"); }
                            else { window.open("https://thingjs-static.oss-cn-beijing.aliyuncs.com/doc/LiveServer%20GB_T28181%20%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6%20Rev.2.2.pdf"); }
                        } else if (event.data == "releasePro") {
                            releasePro();
                        } else if (event.data.type == "next") {
                            layer.style(index, { height: '398px' });
                        } else if(event.data.to){
                            var from = event.data.to;
                            if(from == "fromModelServer"){
                                modelServer(false,event.data);
                            }else if(from == "fromdevServer"){
                                devServer(false,event.data);
                            }else if(from == "buy"){
                                subject = subject?subject:event.data.subject;
                                if(subject == "SellProject"){
                                    sell(false,event.data);
                                    return
                                } else if(subject == "ThingJS_DT") {
                                    trainingCamp(false,subject);
                                    return;
                                }
                                showPayment(false,event.data);
                            }else if (from == 'document') {
                                if (event.data.subject == "RTSP") { window.open("https://thingjs-static.oss-cn-beijing.aliyuncs.com/doc/LiveServer%20RTSP%20%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6%20Rev.2.2.pdf"); }
                                else { window.open("https://thingjs-static.oss-cn-beijing.aliyuncs.com/doc/LiveServer%20GB_T28181%20%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6%20Rev.2.2.pdf"); }
                            }else if (from.indexOf("releasePro")>-1) {
                                releasePro(from,event.data);
                            }else if(type == "expand"){
                                expand(false,event.data);
                            }else if(from == "fromVIPServer"){//来自首页、在线开发
                                updateVIP(false,event.data);
                                return;
                            }else if(from == "view"){
                                var funcName = event.data.subject;
                                window[funcName](false,event.data.toolInfo);
                                // visualization(false,event.data.toolInfo)
                            }else if(type == "courseDetail"){
                                courseDetail(false)
                            }else if(type == "courseDetail_model"){
                                courseDetail_model(false)
                            }else if(type == "trainingCamp"){
                                trainingCamp(false)
                            }else if(type == "apply"){
                                apply(false)
                            }else if(type == "IncourseDetail"){//物联网banner
                                IncourseDetail(false)
                            }else if(type == "powerPopQRCode"){
                                powerPopQRCode(false)
                            } 
                        }
                        if (event.data.type == "showDialog") { 
                            document.getElementsByClassName('caminfoSkin')[0].children[0].children[0].contentWindow.postMessage("showDialog", '*');
                            // layer.iframeAuto(index);
                            var width = event.data.width ? event.data.width : '396px';
                            layer.style(index, { width: width, height: event.data.height });
                            // $(".caminfoSkin").css({ top: '50%', left: '50%', transform: "translate(-50%,-50%)", "-webkit-transform": "translate(-50%,-50%)" });
                        }
                        if (event.data.signal) {//刷新可能有问题
                            window.localStorage.setItem('signal', true);
                        }
                    }
                    window.removeEventListener('message', companyFun ,true);
                    window.addEventListener('message', companyFun ,true);
                }else{//不缺
                    var isCheck = getCookie("checkSign");
                    if (type == "buy" && msg) {
                        if(msg.subject == "ThingJS_VIP_no"){//来自首页、在线开发
                            updateVIP(false);
                            return;
                        } else if(msg.subject == "SellProject"){
                            sell(false,msg)
                            // buyProject(msg)
                        }else if(msg.subject == "specialSellProject"){
                            specialsell(false,msg)
                        } else if(msg.subject == "ThingJS_DT") {
                            trainingCamp(false,msg.subject);
                        }else{
                            showPayment(false,msg);
                        }
                    } else if (type == 'document') {
                        if (msg.subject == "RTSP") { window.open("https://thingjs-static.oss-cn-beijing.aliyuncs.com/doc/LiveServer%20RTSP%20%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6%20Rev.2.2.pdf"); }
                        else { window.open("https://thingjs-static.oss-cn-beijing.aliyuncs.com/doc/LiveServer%20GB_T28181%20%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6%20Rev.2.2.pdf"); }
                        if(isCheck) {
                            showSigninPage("from_login");
                            confirmOrder();
                        }
                    } else if (type == "releasePro" || type == "releasePro_Q") {
                        releasePro(type);
                    } else if(type == "fromModelServer" ){
                        if(popOpening) {
                            popOpening = false;
                            modelServer(false,msg);
                        }else {
                            return;
                        }
                    } else if(type == "fromdevServer"){
                        if(popOpening) {
                            popOpening = false;
                            devServer(false,msg);
                        }else {
                            return;
                        }
                    } else if(type == "expand"){
                        expand(false);
                    } else if(type == "fromVIPServer"){
                        updateVIP(false,msg)
                    } else if(type == "view"){
                        if(isCheck) {
                            showSigninPage("from_login");
                            confirmOrder();
                        }
                        var funcName = msg.subject;
                        window[funcName](false,msg.toolInfo);
                        // visualization(false,msg.toolInfo)
                    }else if(type == "imagination"){
                        signUp(false,msg)
                    }else if(type == "imaginationVideo"){
                        seeVideo(false,msg)
                    }else if(type == "imaginationWap"){
                        signUpWap(false,msg)
                    }else if(type == "imaginationVideoWap"){
                        seeVideoWap(false,msg)
                    }else if(type == "courseDetail"){
                        courseDetail(false)
                    }else if(type == "courseDetail_model"){
                        courseDetail_model(false)    
                    }else if(type == "apply"){
                        apply(false)
                    }else if(type == "IncourseDetail"){
                        IncourseDetail(false)
                    }else if(type == "powerPopQRCode"){
                        powerPopQRCode(false)
                    } 
                    setCookie("checkSign","");
                }
                // 埋点
                if (type === undefined) {
                    // 设置用户属性
                    var userProperties = {
                        'userNick': data.userNick,
                        'namebyCam': data.namebyCam,
                        'company': data.company,
                        'office': data.office,
                        'phoneVerify': data.phoneVerify,
                        'registered_time': new Date(data.first_login).Format('yyyy-MM-dd hh:mm:ss'),
                        'sex': data.sex,
                        'isregistered': '是',
                    }
                    var mmdId_ = data.mmdId
                    data.vip_end === null ? '' : userProperties['vip_end'] = data.vip_end;
                    if(data.company) {
                        $.ajax({
                            url: SERVERPATH + '/api/queryCompanyAddress',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                companyName: data.company
                            },
                            success: function (data) {
                                var data_ = data[0]
                                var allinfo =  $.parseJSON(data_.allinfo)
                                try {
                                    if ( allinfo.Scope ) {
                                        var industry_ =  allinfo.Scope.split('、', 3)
                                        userProperties['industry'] = industry_.toString() + '...';
                                    }
                                } catch (e) {
                                    // console.log(e);
                                }
                                userProperties['province'] = data_.province;
                                userProperties['city'] = data_.city;
                                userProperties['city_s'] = data_.city_s; // 区
                                window.AnalysysAgent && window.AnalysysAgent.alias(mmdId_ + '')
                                window.AnalysysAgent && window.AnalysysAgent.profileSet(userProperties);

                            }
                        })
                    }
                    // 账号关联
                    if(typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {
                        AnalysysAgent.alias(data.mmdId + '')
                        AnalysysAgent.profileSet(userProperties);
                    }

                    // 注册事件
                    if (data.login_times === 1) {
                        if(typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {
                            AnalysysAgent.track('user_registered', { '$signup_time': new Date().toLocaleDateString() })
                            AnalysysAgent.profileSet('$signup_time', new Date().toLocaleDateString());
                        }
                    }
                }
            }
        });
    }
}
//查询个人信息 为了埋点
function camInfoServerToAnalysysAgent() {
    $('.vip.svip').removeClass('svip');
    $(".user_msg .m-avataruploader-imagewrapper.svip").removeClass('svip');
    $('#headimg.svip').removeClass('svip');
    $('#headimgs.svip').removeClass('svip');
    $.ajax({
      url: SERVERPATH + "/api/User_info",
      type: "get",
      success: function(data) {
        // 埋点
        if (window.AnalysysAgent && data) {
          // 设置用户属性
          var userProperties = {
            userNick: data.userNick,
            namebyCam: data.namebyCam,
            company: data.company,
            office: data.office,
            phoneVerify: data.phoneVerify,
            registered_time: new Date(data.first_login).Format(
              "yyyy-MM-dd hh:mm:ss"
            ),
            sex: data.sex,
            isregistered: "是"
          };
          var mmdId_ = data.mmdId;
          data.vip_end === null ? "" : (userProperties["vip_end"] = data.vip_end);
          if(data.permission == "developer"){
            $('.user_msg .m-avataruploader-imagewrapper').addClass('bordervip');
            $('#headimg').addClass('bordervip');
            $('#headimgs').addClass('bordervip');
          }
          if(data.isVipPro) {
            $('.vip').addClass('svip');
            $(".user_msg .m-avataruploader-imagewrapper").addClass('svip');
            $('#headimg').addClass('svip');
            $('#headimgs').addClass('svip');
          }
          if (data.company) {
            $.ajax({
              url: SERVERPATH + "/api/queryCompanyAddress",
              type: "post",
              dataType: "json",
              data: {
                companyName: data.company
              },
              success: function(data) {
                var data_ = data[0];
                var allinfo = $.parseJSON(data_.allinfo);
                try {
                  if (allinfo.Scope) {
                    var industry_ = allinfo.Scope.split("、", 3);
                    userProperties["industry"] = industry_.toString() + "...";
                  }
                } catch (e) {
                  // console.log(e);
                }
                userProperties["province"] = data_.province;
                userProperties["city"] = data_.city;
                userProperties["city_s"] = data_.city_s; // 区
                window.AnalysysAgent && window.AnalysysAgent.alias(mmdId_ + "");
                window.AnalysysAgent && window.AnalysysAgent.profileSet(userProperties);
              }
            });
          }
          // 账号关联
          if (typeof AnalysysAgent != "undefined" ) {
            AnalysysAgent.alias(data.mmdId + "");
            AnalysysAgent.profileSet(userProperties);
          } 
  
          // 注册事件
          if (data.login_times === 1) {
            if (typeof AnalysysAgent != "undefined") {
              AnalysysAgent.track("user_registered", {
                $signup_time: new Date().toLocaleDateString()
              });
              AnalysysAgent.profileSet(
                "$signup_time",
                new Date().toLocaleDateString()
              );
            }
          }
        }
      }
    });
  }
// 跳转
function openProduct() {
    if (getQueryString('m') == 'sample') return largePanel(null, '项目');
    window.open(SERVERPATH + '/guide/?m=sample', '项目');
}
function openScene() {
    if (getQueryString('m') == 'sample') return largePanel(null, '园区');
    window.open(SERVERPATH + '/guide/?m=sample', '园区');
}
// 我的订单
function openTicket() {
    var bigPageSize = true;
    var bigSizeWidth = '';
    var frameID;
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var isSample = getQueryString('m') == 'sample';
    var skin = '';
    var content = '';
    var url='/admin';
    if(location.hostname!='www.thingjs.com'&&location.hostname!='test-thingjs.3dlink.cn') {
        url='https://www.thingjs.com/admin';
    }
    if(isSample) {
        skin = 'myOrderBlack'
        content = url+'/#/User_Ticket?sampleIframe=true&n=249&theme=black';
    }else {
        skin = 'myOrder'
        content =url+'/#/User_Ticket?sampleIframe=true&n=249';
    }
    var index = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        area: [ '100%', '100vh'],
        scrollbar: false,
        move: false,
        content: [content],
        skin: skin,
        success: function (layero) {
            // var frameID = "#"+$(layero).attr('id');
            var frameID = "#"+layero.find('iframe')[0].id;
            bigSizeWidth = $(frameID).width();
            $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").mouseover(function () {
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").attr("src","/guide/image/whchuangkouhuanyuan.png");
            })
            $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").mouseout(function () {
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").attr("src","https://store.thingjs.com/static/img/%E6%9C%80%E5%B0%8F%E5%8C%96.png");
            })
            $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").mouseover(function () {
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").attr("src","/guide/image/whchuangkouzuidahua.png")
            })
            $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").mouseout(function () {
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").attr("src","https://store.thingjs.com/static/img/%E6%9C%80%E5%A4%A7%E5%8C%96.png")
            })
            if (isSample) {
                // $(frameID).contents().find(".ivu-tabs-content").css('overflow','auto')
                // $(frameID).contents().find("layui-layer-setwin a").append(`<div class="closeBtn">×</div>`);
                // $(frameID).contents().find("layui-layer-setwin a").remove();
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").attr("src","/guide/image/chuangkouhuanyuan.png");
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").attr("src","/guide/image/chuangkouzuidahua.png");
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").mouseover(function () {
                    $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").attr("src","/guide/image/bhchuangkouhuanyuan.png")
                })
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").mouseout(function () {
                    $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").attr("src","/guide/image/chuangkouhuanyuan.png")
                })
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").mouseover(function () {
                    $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").attr("src","/guide/image/bhchuangkouzuidahua.png")
                })
                $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").mouseout(function () {
                    $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgB").attr("src","/guide/image/chuangkouzuidahua.png")
                })
                $(frameID).contents().find("section").css('padding','0px')

            }
            $(frameID).contents().find("#navHeader").hide();
            $("#content").css({"top":"0px","height": "100%"});
            $(frameID).contents().find("#content").css({"top":"0px","height": "100%"});
            // $(frameID).contents().find(".ivu-tabs-content").css({"height":"calc(100vh - 138px)","overflow": "auto"})
            $(frameID).contents().find("#content").css('overflow','hidden');
        }
    });
    window.addEventListener('message', function (event) {
        if(isSample) {
            $(frameID).contents().find(".myTicketTaborderTitle .myTicketTabChange .changeImgA").attr("src","/guide/image/chuangkouhuanyuan.png")
        }
        if (event.data&&event.data=="close") {
            layer.close(index);
        }else if(event.data&&event.data=='changeSize') {
            var newWidth = '';
            var newHeight = '';
            var newTop = '';
            var newLeft = '';
            if(bigPageSize) {
                newWidth = '996px';
                newHeight = '642px';
                newTop = 'calc(50% - 321px)';
                newLeft = 'calc(50% - 498px)';
            }else if(!bigPageSize) {
                newWidth ='100%';
                newHeight = '100vh';
                newTop = '0px';
                newLeft = '0px';
            }
            layer.style(index,{
                width:newWidth,
                height:newHeight,
                top: newTop,
                left: newLeft,
                content: [content],
                skin: skin,
            })
            if(!bigPageSize) {
                if(isSample) {
                    $('.myOrderBlack iframe').css("height","100vh");
                    $('.myOrderBlack').css("width","100%");
                }else {
                    $('.myOrder iframe').css("height","100vh");
                    $('.myOrder').css("width","100%");
                }
            }
            bigPageSize = !bigPageSize;

        }
    });
}
// 我的合同
function openContract() {
    var bigPageSize = true;
    var bigSizeWidth = '';
    var frameID;
    if(!getCookie('token') || !getCookie('sso_token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var isSample = getQueryString('m') == 'sample';
    var skin = '';
    var content = '';
    var n=Math.ceil(1000*Math.random());
    var url='/admin';
    if(location.hostname!='www.thingjs.com'&&location.hostname!='test-thingjs.3dlink.cn') {
        url='https://www.thingjs.com/admin';
    }
    if(isSample) {
        skin = 'myContract_b'
        content = url+'/#/User_Contract?sampleIframe=true&n='+n+'&theme=black'
    }else {
        skin = 'myContract_w'
        content = '/#/User_Contract?sampleIframe=true&n='+n+'';
    }
    var index = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        area: [ '100%', '100vh'],
        scrollbar: false,
        move: false,
        content: [content],
        skin: skin,
        success: function (layero) {
            var frameID = "#"+$(layero).attr('id');
            bigSizeWidth = $(frameID).width();

            $(frameID).contents().find(".myContractTabcloseSetwin").mouseover(function () {
                $(frameID).contents().find(".myContractTabcloseSetwin").css('color','#858585');
            })
            $(frameID).contents().find(".myContractTabcloseSetwin").mouseout(function () {
                $(frameID).contents().find(".myContractTabcloseSetwin").css('color','#333');
            })
            $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").mouseover(function () {
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").attr("src","/guide/image/whchuangkouhuanyuan.png");
            })
            $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").mouseout(function () {
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").attr("src","https://store.thingjs.com/static/img/%E6%9C%80%E5%B0%8F%E5%8C%96.png");
            })
            $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").mouseover(function () {
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").attr("src","/guide/image/whchuangkouzuidahua.png")
            })
            $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").mouseout(function () {
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").attr("src","https://store.thingjs.com/static/img/%E6%9C%80%E5%A4%A7%E5%8C%96.png")
            })
            if (isSample) {
                $(frameID).contents().find(".ivu-tabs-content").css('overflow','auto')
                // $(frameID).contents().find("layui-layer-setwin a").append(`<div class="closeBtn">×</div>`); /guide/image/chuangkouhuanyuan.png
                // $(frameID).contents().find("layui-layer-setwin a").remove();
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").attr("src","/guide/image/chuangkouhuanyuan.png");
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").attr("src","/guide/image/chuangkouzuidahua.png");
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").mouseover(function () {
                    $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").attr("src","/guide/image/bhchuangkouhuanyuan.png")
                })
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").mouseout(function () {
                    $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").attr("src","/guide/image/chuangkouhuanyuan.png")
                })
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").mouseover(function () {
                    $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").attr("src","/guide/image/bhchuangkouzuidahua.png")
                })
                $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").mouseout(function () {
                    $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgB").attr("src","/guide/image/chuangkouzuidahua.png")
                })
                $(frameID).contents().find("section").css('padding','0px')
            }
            $(frameID).contents().find("#navHeader").hide()
            $(frameID).contents().find("#content").css({"top":"0px","height": "100%"});
            $(frameID).contents().find(".ivu-tabs-content").css({"height":"calc(100vh - 138px)","overflow": "auto"})
            $(frameID).contents().find("#content").css('overflow','hidden');

            // 我的合同弹唱创建完成后弹出协议框
            // 判断是否已经同意协议  api/User_info
            $.ajax({
                url: SERVERPATH + "/api/User_info",
                type: "get",
                success: function(data) {
                    if (!(data&&data.thingjs_x_status&&(data.thingjs_x_status.indexOf("time")!=-1)&&(data.thingjs_x_status.indexOf("IPAdress")!=-1)&&(data.thingjs_x_status.indexOf("IPMac")!=-1))){
                        openMyprotocal();
                    }
                }
            })
            
        }
    });
    window.removeEventListener('message', ifCMessage ,true);
    window.addEventListener('message', ifCMessage ,true);

    function ifCMessage(e){
        if(isSample) {
            $(frameID).contents().find(".myContractTaborderTitle .myContractTabChange .changeImgA").attr("src","/guide/image/chuangkouhuanyuan.png")
        }
        if (e&&e.data&&e.data=='close') {
            layer.close(index);
        }else if(e&&e.data&&e.data=='changeSize') {
            var newWidth = '';
            var newHeight = '';
            var newTop = '';
            var newLeft = '';
            if(bigPageSize) {
                newWidth = '996px';
                newHeight = '642px';
                newTop = 'calc(50% - 321px)';
                newLeft = 'calc(50% - 498px)';
            }else if(!bigPageSize) {
                newWidth ='100%';
                newHeight = '100vh';
                newTop = '0px';
                newLeft = '0px';
            }
            layer.style(index,{
                width:newWidth,
                height:newHeight,
                top: newTop,
                left: newLeft,
                content: [content],
                skin: skin,
            })
            if(!bigPageSize) {
                if(isSample) {
                    $('.myContract_b iframe').css("height","100vh");
                    $('.myContract_b').css("width","100%");
                }else {
                    $('.myContract_w iframe').css("height","100vh");
                    $('.myContract_w').css("width","100%");
                }
            }
            bigPageSize = !bigPageSize;
        }
    }
}

function openMyprotocal(){
    var width = '520px';
    var height = '300px';
    var ismove = false;
    var couldClose1 = false;
    var timeStart = 10;
    var timeEnd;
    if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
    width = '380px';
    // width = '7.2rem';
    height = '300px';
    }
    var protocalLayer = layer.open({
        type: 1,
        move: false,
        title: false,
        closeBtn: false,
        // scrollbar: false,
        shade: 0.8,
        area: [width, height],
        resize: false,
        btn: ['关闭', '同意并继续 ( 10s )'],
        btnAlign: 'c',
        // content:['/guide/html/agreements/myContractProtocal.html'],
        content: 
        `
            <div>
                <div>
                    <div style="text-align: center;font-size: 20px;color: #000;font-family: sans-serif; margin-top: 20px;">
                        ThingJS网签合同用户须知
                    </div>
                </div>
                <div>
                    <div style="color:#333333; text-indent: 2em; width: 90%;margin: auto;margin-top: 20px;margin-bottom: 22px;font-size:15px; text-align: justify;">
                        ThingJS平台网签合同系统与“e签宝”合作，正式签署流程全程托管在“e签宝”平台。“e签宝”具有国相关部门颁发的电子合同经营许可和认证证书，签署过程中的数据安全由“e签宝”保障。
                    </div>
                    <div style="color:#333333; text-indent: 2em; width: 90%;margin: auto;margin-top: 15px;margin-bottom: 15px;font-size:15px; text-align: justify;">
                        你可以通过阅读完整的
                        <a style="color:rgb(57, 98, 235)" href="/guide/html/agreements/description.html" target="_blank">《电子合同法律有效性说明》</a>、
                        <a style="color:rgb(57, 98, 235)" href="/guide/html/agreements/certify.html" target="_blank">《ThingJS网签合同合作伙伴“e签宝”资质及证明》</a>、
                        <a style="color:rgb(57, 98, 235)" href="/guide/html/agreements/operationsGuide.html" target="_blank">《ThingJS网签合同新用户操作指引》</a>来了解详细信息。
                    </div>
                </div>
            </div>
        `,
        skin: 'pageClass-myContract',
        success: function () {
            // $('.layui-layer.layui-layer-page.layui-layer-border.pageClass-myContract .layui-layer-btn0').attr('disabled', true);
            $(".layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn").addClass('active-style');
            $('.layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn1').css('opacity', '.7').css('cursor', 'no-drop');
            timeEnd = setInterval(function () {
                if (timeStart > 0) {
                    $('.layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn1').text('同意并继续 ( 10s )');
                    $('.layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn1').text('同意并继续 ( '+timeStart+'s )');
                    timeStart--;
                } else {
                    clearInterval(timeEnd);
                    $('.layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn1').css('opacity', '1').css('cursor', 'pointer');
                    $(".layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn").removeClass('active-style');
                    $('.layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn1').text('同意并继续');
                    $('.layui-layer.layui-layer-page.pageClass-myContract .layui-layer-btn1').addClass('active-N');
                    couldClose1 = true;
                }
            }, 1000)
        },
        // 关闭按钮
        yes:function(){
            clearInterval(timeEnd);
            layer.closeAll();
        },
        // 同意协议按钮
        btn2:function(){
            
            // 关闭协议弹窗
            if(!couldClose1) {
                return false;
            } else{

                // 调用接口写入操作
                $.ajax({
                    url: SERVERPATH + "/api/getSignAgreeUserknow",
                    type: "get",
                    data: {
                      mmdId: getCookie('mmdId')
                    },
                    success: function(data) {
                        if (data&&data.code==200){
                        }
                    }
                })

                layer.close(protocalLayer);
                
            }
        }
    });
}


function openPer() {
    var width = '980px';
    var height = '769px';
    if(!getCookie('token') || !getCookie('mmdId')){
        loginwindowon();
        clearAllCookie();
        return;
    }
    var url='../../user/index.html';
    if(location.hostname!='www.thingjs.com'&&location.hostname!='test-thingjs.3dlink.cn') {
        url='https://www.thingjs.com/user/index.html';
    }
    var frameID = '';
    layer.closeAll();
    var index = layer.open({
        type: 2,
        title: '',
        // title: ['个人信息','font-size: 22px;text-align: center;height: 55px;line-height: 55px;'],
        move: false,
        closeBtn: 0,
        shade: 0.3,
        area: [width, height],
        resize: false,
        content:[url+'?n='+Math.ceil(1000*Math.random())],
        skin: 'personalInfo',
        success: function (layero) {
            frameID = "#"+layero.find('iframe').last()[0].id;
        }
    })
    window.removeEventListener('message', ifPMessageUser ,true);
    window.addEventListener('message', ifPMessageUser ,true);

    function ifPMessageUser(e){
        if(e&&e.data&&e.data.type=='close') {
            layer.close(index);
        }else if(e&&e.data&&e.data.type=='change_small') {
            $('.layui-layer.layui-layer-iframe.personalInfo').width(e.data.width);
            $('.layui-layer.layui-layer-iframe.personalInfo').height(e.data.height);
            $('.layui-layer.layui-layer-iframe.personalInfo').css('top','calc(50% - 384px)');
            $('.layui-layer.layui-layer-iframe.personalInfo').css('left','calc(50% - 498px)');
            $(frameID).height(e.data.height);
            $(frameID).contents().find('.m-accountinfo-body').css('width','100%');
        } else if(e&&e.data&&e.data.type=='change_big') {
            $('.layui-layer.layui-layer-iframe.personalInfo').width(document.body.clientWidth);
            $('.layui-layer.layui-layer-iframe.personalInfo').height(document.body.clientHeight);
            $('.layui-layer.layui-layer-iframe.personalInfo').css('top','0');
            $('.layui-layer.layui-layer-iframe.personalInfo').css('left','0');
            $(frameID).height(document.body.clientHeight);
            $(frameID).contents().find('.m-accountinfo-body').css('width','980px');
            $(frameID).contents().find('.m-accountinfo-body').css('margin','0 auto');
        }
    }

    if(window.location.search == '?m=sample'){
        $('.template-demos.template-sample').attr('data-theme','black');
        $('.layui-layer.layui-layer-iframe.personalInfo .layui-layer-title').css('background-color','#222');
        $('.layui-layer-title').css({'border-bottom':'1px solid #4d5153','color':'#fff'});
    }else {
        $('.template-demos.template-sample').attr('data-theme','white');
    }
    // if (getQueryString('m') == 'sample') return largePanel(null, '个人信息');
    // window.open(SERVERPATH + '/guide/?m=sample', '个人信息');
}
function openMsg() {
    if (getQueryString('m') == 'sample') return largePanel(null, '系统消息');
    window.open(SERVERPATH + '/guide/?m=sample', '系统信息');
}

//扩容
function expand(flag,msg) {
    if(flag){
        var msg = {title:'购买资源空间'}
        camInfoServer('expand',msg);
        return
    }
    var data = {
        'title': '购买资源空间',
        'imgsrc': window.location.protocol + "//" + window.location.host +
            '/static/payment/createPay/images/kfzykj.png',
        'describe': '<span class="_title">资源空间扩容1G/年</span><br/><br/>有效期：' + getExpandNowFormatDate('', 0) + ' - ' + getExpandNowFormatDate('', 1, -1)+'<br/><br/><span ng-show="!publicPay">付款后即时生效。</span><span ng-show="publicPay">请在对公付款后及时与平台客服联系。谢谢！</span>',
        'price': 99.9,
        'id': $.cookie('mmdId'),
        'type': "ThingJS_Expansion",
        'step':msg?msg.step:'',
        'paySource': window.location.href,
    }
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        window.location.href = document.location.origin;
    } else {
        if(!data.paySource) data.paySource=location.href;
        layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            area: ['585px', '568px'],
            content: ['https://www.thingjs.com/static/payment/createPay/payment.html?type=ThingJS_Expansion&userId=' + $.cookie('mmdId'), 'no'],
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
            if (event.data == 'close') {
                layer.closeAll();
            }
            if (event.data == 'closeWin') {
                if(initStore) initStore();
                layer.closeAll();
            }
        })
    }
}

function getExpandNowFormatDate(endTime, next, day) {
    var date;
    var _index = endTime.indexOf("1970");
    if (endTime && _index != 0) {
        date = new Date(endTime);
    } else {
        date = new Date();
    }
    date.toLocaleString(date.setFullYear(date.getFullYear() + next));
    date.setDate(date.getDate() + (day || 0));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var currentdate = year + '年' + month + '月' + strDate + '日';
    return currentdate;
}
function checkEmailCode() {
    var res_email = verifyCode_email.validateForCheck(document.getElementById("reg-emailreg-img").value);
    if (res_email) {
        $("#getEmailRegNum").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
        $("#reg-btn,#reg-btn-thingx").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
        $("input[data-name=emailPsw]").removeAttr('readonly');
        $("input[data-name=emailCode]").removeAttr('readonly');
        $('#reg-tip-imgE').text('').hide();
        $('#reg-tip-imgE + .cuowu2').hide();
    } else {
        $("#getEmailRegNum").addClass("noEvents").css("background-color", "rgb(153,153,153)");
        $("#reg-btn,#reg-btn-thingx").addClass("noEvents").css("background-color", "rgb(153,153,153)");
        $("input[data-name=emailPsw]").attr('readonly', true);
        $("input[data-name=emailCode]").attr('readonly', true);
        $('#reg-tip-imgE').text('验证码错误').show();
        $('#reg-tip-imgE + .cuowu2').show();
    }
}
async function checkPhoneNumber() {
    if ($('#login-reg-tel').val().length == 0 || $('#login-reg-tel').val().length < 11) {
        $('#bindPhone .telBox .error-hint-box').show();
    }else {
        $('#bindPhone .telBox .error-hint-box').hide();
    }
}

async function checkPhoneCode() {
    if(login_code == undefined){
        res_tel = false;
    }else {
        var isNone = $(".verificationCode #captcha .captcha-pass").css('display');
        if(isNone == 'none') {
            res_EM = false;
        }else {
            res_EM = true;
        }
    }
    if (res_tel) {
        $('#bindPhone .verificationCode .error-hint-box').hide();
    } else {
        $('#bindPhone .verificationCode .error-hint-box').show();
    }
}
async function emailCheckCode() {
    var res_EM ;
    if(login_code == undefined || login_code == 'null'){
        res_EM = false;
    }else {
        var isNone = $(".verificationCode #mailbox .captcha-pass").css('display');
        if(isNone == 'none') {
            res_EM = false;
        }else {
            res_EM = true;
        }
        
    }
    if (res_EM) {
        $('#bindEmail .verificationCode .error-hint-box').hide();
        // $('div[data-error="phoneVe"]').hide();
        // $("#get_phone_code").removeClass("noEvents").css("color", "rgb(255, 135, 0)");
        // $("#reg-btn,#reg-btn-thingx").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
        // setCookie('CHECKREGCODE', document.getElementById("reg-telreg-img").value);
    } else {
        $('#bindEmail .verificationCode .error-hint-box').show();
        // $('div[data-error="phoneVe"]').show();
        // $('div[data-error="phoneVe"] span').text('验证码错误');
        // $("#get_phone_code").addClass("noEvents").css("color", "rgb(153,153,153)");
        // $("#reg-btn,#reg-btn-thingx").addClass("noEvents").css("background-color", "rgb(153,153,153)");
    }
}
async function emailCheckImg(type) {
    var res;
    if (type == "tel") {
        //手机
        if(login_code == undefined){
            res = false;
    } else {
            res = await login_captcha.check_code(login_code);
    }
    } else {
        // 邮箱
        if(login_code == undefined){
            res = false;
        }else {
            res = await login_captcha.check_code(login_code);
        }
    }
    if (!res) {
        $('div[data-error="forgetEmail-img"]').show();
        return;
    } else {
        if (type == "tel") {
            setCookie('CHECKREGCODE', document.getElementById("forgetinp-telreg-img").value);
        } else {
            setCookie('CHECKREGCODE', document.getElementById("forgetinp-emailreg-img").value);
        }
        $('div[data-error="forgetEmail-img"]').hide();
    }
}

function loginContinue(res) {
    if (SERVERPATH) {
        // 资源中心
        $.post(location.protocol + '//store.thingjs.com/api/user/loginGoon?token=' + $.cookie('token'), { userid: res.mmdId, uid: res.openid }, function (result) {
            var data = JSON.parse(result);
            if (data.code == 200) {
                setCookie('openid', res.openid);
                setCookie('dix_token', res.dix_token);
                setCookie('dix_id', res.id);
                setCookie("saveSetSwitch", 0);
                setCookie("mmdId", res.mmdId);
                setCookie('name', res.name);
                if (!res.headimgurl) {
                    setCookie('headimgurl', 'https://www.thingjs.com/guide/image/tx.png');
                } else {
                    if (window.location.protocol == "https:") {
                        if (res.headimgurl.indexOf("http:") == 0) {
                            res.headimgurl = "https" + res.headimgurl.substring(4);
                        }
                    }
                    setCookie('headimgurl', res.headimgurl);
                }
                indexlogininit();
                loginwindowhide();
                if (flag == true) {
                    checkHelpLogin(flag);
                }
                if (window.location.pathname === '/admin/') {
                    window.location.href = 'https://www.thingjs.com/admin/#/myProduct'
                }
                if (getQueryString("back")) {
                    if(getQueryString("back").indexOf('?')!='-1'){
                        window.location.href = getQueryString("back")+'&token='+res.token;
                    }else{
                        window.location.href = getQueryString("back")+'?token='+res.token;
                    }
                    return;
                }
                if(getQueryString("return_to")) {
                    var url=decodeURIComponent(getQueryString("return_to"));
                    if(url.indexOf('thingjs.kf5.com')!=-1||url.indexOf('help.thingjs.com')!=-1) {
                        return checkLogin(url);
                    }
                }
                window.localStorage.setItem('showCaminfo', 'showCaminfo');
                if(typeof(loginSuccessCallback)!='undefined') loginSuccessCallback();

                $("#recharge").show();
                $("#development").show();
                $("#modelSer").show();
            }
        });
    } else {
        // ThingJS网站
        $.ajax({
            url: SERVERPATH + '/api/wxloginGoOn',
            type: 'post',
            dataType: 'json',
            data: {
                userid: res.mmdId,
                uid: res.openid
            },
            success: function (result) {
                if (result.code == 200) {
                    setCookie('role', res.role);
                    setCookie('token', res.token);
                    setCookie('name', res.name);
                    setCookie('openid', res.openid);
                    setCookie('id', res.id);
                    setCookie('accessToken', res.accessToken);
                    setCookie('SameSite', 'None');
                    setCookie('Secure', true);
                    setCookie('dix_token', res.dix_token);
                    setCookie('dix_id', res.id);
                    setCookie("saveSetSwitch", 0);
                    setCookie("mmdId", res.mmdId);
                    setCookie("client_id", res.client_id);
                    if(!(CLIENTID&&CLIENTID=='rootcloud')) {
                        if(!res.mmdId) return;
                        try {
                            if (PERMISSIONCONFIG.getPermission('粒子授权')) {
                                setCookie("particleRole", true);
                            } else {
                                setCookie("particleRole", false);
                            }
                            if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
                        } catch (error) {};
                        // $.ajax({
                        //     url: SERVERPATH + '/api/hasRole',
                        //     type: 'post',
                        //     headers: {
                        //         Authorization: 'Bearer ' + getCookie('accessToken'),
                        //     },
                        //     data:{
                        //         "mmdId":res.mmdId,
                        //         "roleName":"粒子授权"
                        //     },
                        //     dataType: 'json',
                        //     success: function (data) {                 
                        //         if(data && data.success){
                        //             setCookie("particleRole", true);
                        //         } else {
                        //             setCookie("particleRole", false);
                        //         }
                        //         if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
                        //     }
                        // });
                        $.ajax({
                            url: SERVERPATH + '/api/dcvRole',
                            type: 'post',
                            success: function (res) {
                                if (res.state) {
                                    $('#dcvBtn').show();
                                    setCookie("dcvRole", true);
                                } else {
                                    setCookie("dcvRole", false);
                                }
                            }
                        });
                        if(checkUserAuth&&checkUserAuth()) {
                            setCookie("musics", true);
                            setCookie("skyboxes", true);
                        } else {
                            setCookie("musics", false);
                            setCookie("skyboxes", false);
                        }
                    }
                    if (typeof (showVersion2) != 'undefined') {
                        showVersion2();
                        showRendering();
                    }
                    // $.ajax({
                    //     url: SERVERPATH + '/api/musicsRole',
                    //     type: 'post',
                    //     success: function (res) {
                    //         if (res.state) {
                    //             setCookie("musics", true);
                    //         } else {
                    //             setCookie("musics", false);
                    //         }
                    //         if (typeof (getMusicsAuth) != 'undefined') getMusicsAuth();
                    //     }
                    // });
                    // $.ajax({
                    //     url: SERVERPATH + '/api/skyboxRole',
                    //     type: 'post',
                    //     success: function (res) {
                    //         if (res.state) {
                    //             setCookie("skyboxes", true);
                    //         } else {
                    //             setCookie("skyboxes", false);
                    //         }
                    //         if (typeof (getSkyboxAuth) != 'undefined') getSkyboxAuth();
                    //     }
                    // });
                    if (!res.headimgurl) {
                        setCookie('headimgurl', path + '/guide/image/tx.png');
                        // 生成随机头像
                        // setCookie('headimgurl','suiji');

                    } else {
                        if (window.location.protocol == "https:") {
                            if (res.headimgurl.indexOf("http:") == 0) {
                                res.headimgurl = "https" + res.headimgurl.substring(4);
                            }
                        }
                        setCookie('headimgurl', res.headimgurl);
                    }
                    indexlogininit(null,null,1);
                    loginwindowhide();
                    // camInfoServer();
                    if (getQueryString("g") == 1 && !$('.filen-edit').is(':visible')) {
                        $('.btn-yq.btn').trigger('click');
                    }
                    if (getQueryString("m") == 'sample') {
                        if (ORIGINOPENID && ORIGINOPENID != res.openid) {
                            var reloadSample = function () {
                                location.reload();
                            }
                            newAlert('登录成功（当前账号与与上次登录账号不同，将重新刷新当前页面）', 'success', '', reloadSample, 'false');
                            return;
                        } else {
                            ORIGINOPENID = res.openid;
                        }
                        $(".login-close").show();
                        if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '页面资源') {
                            createFileMenu();
                        }
                        if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '场景资源') {
                            createMenuScene();
                        }
                        if (getCookie("role") == 'developer') {
                            $(".btn-tb").show();
                        }
                        if (getQueryString("f") || getQueryString("i") || getQueryString("o")) {
                            if (sampleType !== 'tab_change') return;
                            tab_change(1);
                            $('#gf').hide();
                            $('.filen').show();
                            if (getQueryString("f")) {
                                $('#gf').show();
                                $('.filen').hide();
                                var fileN = decodeURI(getQueryString("f"));
                                $('#list1 li[data-name="' + fileN + '"] i.icon-file').trigger('click', 'f');
                                $('#list1 li ul p.pro_main[data-name="' + fileN + '"]').trigger('click');
                                if (getCookie("debugSwitch") == 0) {
                                    debugSwitchFalse();
                                }
                                $('.bg-upload.sceneUpload.fileUpload').hide();
                                $('.add_file_li').remove();
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
                                setUrl(null, []);
                            }
                        }
                        if (getQueryString('cityBuilder') == 'true') {
                            largePanel(null, '地图', 'createProject');
                        }
                    }
                    if (flag == true) {
                        checkHelpLogin(flag);
                    }
                    if (window.location.pathname === '/admin/') {
                        if (getQueryString('m') == 'sample') return largePanel(null, '项目');
                        if(window.parent.location.search=='?m=sample') {
                            var iframeBody=$(window.parent.document).find('#iframeBody')[0];
                            if(iframeBody) {
                                if(window.location.hash.indexOf('#/User_Msg?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '个人信息');
                                }
                                if(window.location.hash.indexOf('#/Scene?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '园区');
                                }
                                if(window.location.hash.indexOf('#/User_Ticket?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '我的订单');
                                }
                                if(window.location.hash.indexOf('#/User_Contract?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '我的合同');
                                }
                                if(window.location.hash.indexOf('#/Product?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '项目');
                                }
                            }
                        }
                        window.location.href = window.location.origin + '/' + 'admin/#/myProduct';
                    }
                    if (getQueryString("back")) {
                        if(getQueryString("back").indexOf('?')!='-1'){
                            window.location.href = getQueryString("back")+'&token='+res.token;
                        }else{
                            window.location.href = getQueryString("back")+'?token='+res.token;
                        }
                        return;
                    }
                    if(getQueryString("return_to")) {
                        var url=decodeURIComponent(getQueryString("return_to"));
                        if(url.indexOf('thingjs.kf5.com')!=-1||url.indexOf('help.thingjs.com')!=-1) {
                            return checkLogin(url);
                        }
                    }
                    checkNavColor();
                    //帮助中心跳转
                    //  window.location.href = 'http://' + window.location.host + "/guide/?"+window.location.search;
                    // window.location.reload();
                    //新增引导功能 判断当前是否出于引导状态
                    if (document.getElementById("startTeach").style.color == 'red') {
                        //console.log('新增引导功能 判断当前是否出于引导状态，用于引导页面判断是否登录成功了，登录成功，则进入introThree的新手教程');
                        introJs().exit();
                        fadeOut();
                        introThree();
                    }
                    switch (loginSource) {
                        case 'modelServer':
                            modelServer(true)
                            break
                        case 'devServer':
                            devServer(true)
                            break;
                        default:
                            break
                    }
                    loginSource = '';
                    camInfoType = '';
                }
            }
        })
    }
}
function setPwdClose(type) {
    if (type) {
        $(".setPwdTip").hide();
        $(".pay-mb").hide();
    } else {
        $(".setPwd-win").hide();
        $(".pay-mb").hide();
    }
    clearAllCookie();
}

function setPwd() {
    var passwordOld = $('#pwdOld').val();
    var password = $('#pwdAgain').val();

    var psw = encodeBase64.base64encode(password).substring(5);
    var userId = getUserName('id');
    userId = $.cookie('id');
    var token = 'Bearer ' + getCookie('accessToken');
    var data = {
        userId: userId,
        newPwd: psw
    }
    if (password == '') {
        layer.msg("密码不允许为空");
        return false;
    } else if (password.length < 6 || password.length > 18) {
        layer.msg("密码格式错误");
    } else if (password != passwordOld) {
        layer.msg('两次输入密码不一致');
    } else {
        $.ajax({
            url: 'https://sso.thingjs.com/uinapi/user/updatePwd',
            type: 'post',
            dataType: 'json',
            data: data,
            headers: { 'Authorization': token },
            success: function (res) {
                if (res.status == '0') {
                    setPwdClose();
                    $(".setPwdTip").show();
                    $(".pay-mb").show();
                } else {
                    layer.msg('密码设置失败！');
                }
            },error:function(e) {
                if(e.status==401) {
                    clearAllCookie();
                    loginwindowon();
                    return;
                }
            }
        })
    }
}
function logingoonForThingX(res) {
    if (res.avatar) setCookie('headimgurl', res.avatar);
    if (res.user_id) setCookie('user_id', res.user_id);
    if (res.accessToken) setCookie('accessToken', res.accessToken);
    if (res.username) setCookie('name', res.username);
    setCookie('SameSite', 'None');
    setCookie('Secure', true);
    if (!res.avatar) {
        setCookie('headimgurl', res.avatar);
    } 
    indexlogininit();
    loginwindowhide();
}
function logingoon(res, type) {
    if (res.role) setCookie('role', res.role);
    if (res.token) setCookie('token', res.token);
    if (res.name) setCookie('name', res.name);
    setCookie('openid', res.openid);
    if (res.id) setCookie('id', res.id);
    if (res.accessToken) setCookie('accessToken', res.accessToken);
    setCookie('SameSite', 'None');
    setCookie('Secure', true);
    setCookie('dix_token', res.dix_token);
    setCookie('dix_id', res.id);
    setCookie("saveSetSwitch", 0);
    setCookie("mmdId", res.mmdId);
    setCookie('name', res.name);
    setCookie("client_id", res.client_id);
    if (type == "QQ") {
        setCookie('name', encodeURI(res.name));
    }        
    if((window.location.hostname=='www.thingjs.com'||window.location.hostname=='127.0.0.1')&&window.location.pathname.indexOf('/guide/check/')!=-1) {
        if(typeof(accountAccess)!='undefined') accountAccess();
    }

    if (!SERVERPATH&&(!(CLIENTID&&CLIENTID=='rootcloud'))) {
        if(!res.mmdId) return;
        try {
            if (PERMISSIONCONFIG.getPermission('粒子授权')) {
                setCookie("particleRole", true);
            } else {
                setCookie("particleRole", false);
            }
            if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
        } catch (error) {};
        // $.ajax({
        //     url: SERVERPATH + '/api/hasRole',
        //     type: 'post',
        //     headers: {
        //         Authorization: 'Bearer ' + getCookie('accessToken'),
        //     },
        //     data:{
        //         "mmdId":res.mmdId,
        //         "roleName":"粒子授权"
        //     },
        //     dataType: 'json',
        //     success: function (data) {                 
        //         if(data && data.success){
        //             setCookie("particleRole", true);
        //         } else {
        //             setCookie("particleRole", false);
        //         }
        //         if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
        //     }
        // });
        $.ajax({
            url: SERVERPATH + '/api/dcvRole',
            type: 'post',
            success: function (res) {
                if (res.state) {
                    $('#dcvBtn').show();
                    setCookie("dcvRole", true);
                } else {
                    setCookie("dcvRole", false);
                }
            }
        });
        if(checkUserAuth&&checkUserAuth()) {
            setCookie("musics", true);
            setCookie("skyboxes", true);
        } else {
            setCookie("musics", false);
            setCookie("skyboxes", false);
        }
        // $.ajax({
        //     url: SERVERPATH + '/api/musicsRole',
        //     type: 'post',
        //     success: function (res) {
        //         if (res.state) {
        //             setCookie("musics", true);
        //         } else {
        //             setCookie("musics", false);
        //         }
        //         if (typeof (getMusicsAuth) != 'undefined') getMusicsAuth();
        //     }
        // });
        // $.ajax({
        //     url: SERVERPATH + '/api/skyboxRole',
        //     type: 'post',
        //     success: function (res) {
        //         if (res.state) {
        //             setCookie("skyboxes", true);
        //         } else {
        //             setCookie("skyboxes", false);
        //         }
        //         if (typeof (getSkyboxAuth) != 'undefined') getSkyboxAuth();
        //     }
        // });
    }
    if (typeof (showVersion2) != 'undefined') {
        showVersion2();
        showRendering();
    }
    if (!res.headimgurl) {
        setCookie('headimgurl', SERVERPATH + '/guide/image/tx.png');
    } else {
        if (window.location.protocol == "https:") {
            if (res.headimgurl.indexOf("http:") == 0) {
                res.headimgurl = "https" + res.headimgurl.substring(4);
            }
        }
        setCookie('headimgurl', res.headimgurl);
    }
    // 判断是否是QDT的demo链接
    if(window.location.href.indexOf('/pre/') != -1 && getQueryString('env') == 'demo'){
        return window.location.reload();
    }
    
    indexlogininit(type,null,1);
    loginwindowhide();
    if (!SERVERPATH) {
        camInfoServerToAnalysysAgent()
        if (getQueryString("g") == 1 && !$('.filen-edit').is(':visible')) {
            $('.btn-yq.btn').trigger('click');
        }
        if (getQueryString("m") == 'sample') {
            if (ORIGINOPENID && ORIGINOPENID != res.openid) {
                var reloadSample = function () {
                    location.reload();
                }
                newAlert('登录成功（当前账号与与上次登录账号不同，将重新刷新当前页面）', 'success', '', reloadSample, 'false');
                return;
            } else {
                ORIGINOPENID = res.openid;
                try {
                    if(typeof(singiRole)!='undefined'&&singiRole) singiRole();
                    if(typeof(sourceRoles)!='undefined'&&sourceRoles) sourceRoles();
                } catch (error) {}
            }
            if(typeof(getOrSaveDevLayout)!='undefined'&&getOrSaveDevLayout) getOrSaveDevLayout();
            $(".login-close").show();
            if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '页面资源') {
                createFileMenu();
            }
            if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '场景资源') {
                createMenuScene();
            }
            if (getCookie("role") == 'developer') {
                $(".btn-tb").show();
            }
            if (getQueryString("f") || getQueryString("i") || getQueryString("o")) {
                if (sampleType !== 'tab_change') return;
                tab_change(1);
                $('#gf').hide();
                $('.filen').show();
                if (getQueryString("f")) {
                    $('#gf').show();
                    $('.filen').hide();
                    var fileN = decodeURI(getQueryString("f"));
                    $('#list1 li[data-name="' + fileN + '"] i.icon-file').trigger('click', 'f');
                    $('#list1 li ul p.pro_main[data-name="' + fileN + '"]').trigger('click');
                    if (getCookie("debugSwitch") == 0) {
                        debugSwitchFalse();
                    }
                    $('.bg-upload.sceneUpload.fileUpload').hide();
                    $('.add_file_li').remove();
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
                    setUrl(null, []);
                }
            }
            if (getQueryString('cityBuilder') == 'true') {
                largePanel(null, '地图', 'createProject');
            }
        }
        if (window.location.pathname === '/admin/') {
            if (getQueryString('m') == 'sample') return largePanel(null, '项目');
            if(window.parent.location.search=='?m=sample') {
                var iframeBody=$(window.parent.document).find('#iframeBody')[0];
                if(iframeBody) {
                    if(window.location.hash.indexOf('#/User_Msg?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '个人信息');
                    }
                    if(window.location.hash.indexOf('#/Scene?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '园区');
                    }
                    if(window.location.hash.indexOf('#/User_Ticket?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '我的订单');
                    }
                    if(window.location.hash.indexOf('#/Product?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '项目');
                    }
                }
            }
            if(top.location.search=='?m=sample'&&window.location.hash.indexOf('#/Deploy')!=-1) {
                return;
            }
            window.location.href = window.location.origin + '/' + 'admin/#/myProduct';
        }
        checkNavColor();
        //帮助中心跳转
        if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
            //console.log('新增引导功能 判断当前是否出于引导状态，用于引导页面判断是否登录成功了，登录成功，则进入introThree的新手教程');
            introJs().exit();
            fadeOut();
            introThree();
        }
        switch (loginSource) {
            case 'modelServer':
                modelServer(true)
                break
            case 'devServer':
                devServer(true)
                break;
            case 'companyServer':
                camInfoServer(camInfoType);
                break;
            case 'companyServerFirst':
                camInfoServer("companyServerFirst");
                break;
            default:
                break
        }
        loginSource = ''
    } else if (location.host == 'store.thingjs.com') {
        // 资源中心登录 __ 用于埋点
        camInfoServerToAnalysysAgent()
    }

    if (flag == true) {
        checkHelpLogin(flag);
    }
    if (getQueryString("back")) {
        if(getQueryString("back").indexOf('?')!='-1'){
            window.location.href = getQueryString("back")+'&token='+res.token;
        }else{
            window.location.href = getQueryString("back")+'?token='+res.token;
        }
        return;
    };    
    if(getQueryString("return_to")) {
        var url=decodeURIComponent(getQueryString("return_to"));
        if(url.indexOf('thingjs.kf5.com')!=-1||url.indexOf('help.thingjs.com')!=-1) {
            return checkLogin(url);
        }
    }
    if (SERVERPATH) {
        if(loginSource) window.localStorage.setItem('loginSource', loginSource);
        if(typeof(loginSuccessCallback)!='undefined') loginSuccessCallback();
        $("#recharge").show();
        $("#development").show();
        $("#modelSer").show();
        loginSource = '';
    }
}
if (SERVERPATH) checkHelpLogin(flag);

//显示签到页
var signinData;
function showSigninPage(flag){
    var openid = getCookie("openid");
    if (!openid) {
        // loginSource = 'modelServer'/*  */
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    }else{
        $.ajax({
            url:'/api/signin',
            type: 'post',
            async:false,
            data:{
                sign:0
            },
            success: function (data) {
                if(data.code == 200){
                    signinData = data.msg;
                    signinData.from = flag;
                }
            }
        })
        if(flag=="from_login" && signinData && signinData.todaySign) return;
        $.ajax({
            url: '/guide/dialog/signin.html',
            dataType: 'html',
            success: function (htmlData) {
                $(".bg-upload").show();
                $(".signinBox").append($(htmlData)).show();;
            }
        })
    }
}

//vip功能校验
function checkUserAuth(type){
    var checkData = false;
    $.ajax({
        url: '/api/getUserAuth'+(type?"?type="+type:""),
        type: 'get',
        async: false,
        success: function(data){
            if(data && data.code && data.code == 200){
                checkData = true;
            }else {
                checkData = false;
            }
        },error: function() {
            checkData = false;
        }
    })
    return checkData;
}
function reloadHeader() {
    if(typeof(querySketchUser)=='function') {
        querySketchUser();
    }
    if(typeof(WSVDCLoginJudge)=='function'&&(getQueryString("m")=='wisdomScenarioVDC'||location.pathname.split('/').pop()=='wisdomScenarioVDC')) {
        WSVDCLoginJudge();
    }
}
$(function(){
    iswisdomScenarioVDC = window.location.href.indexOf('wisdomScenarioVDC'); 
    issample = window.location.href.indexOf('sample');
    if(iswisdomScenarioVDC == -1 && issample == -1){
        // var _localStorage = window.localStorage;
        // if(!_localStorage){
        //     return false;
        // }
        // getPopUp()
        // showQuestionnairePage()
    }
})
// 弹窗页面
function showQuestionnairePage(){
    return;
    let localData = window.localStorage.getItem("keyPopUp")
    console.log(localData)
    let localDataObj = JSON.parse(localData);
    // 判断检测有localStorage
    if(!localDataObj || localDataObj.versionNo == "Questionnaire"){
        $.ajax({
            // url: window.location.protocol+'//www.thingjs.com/guide/dialog/questionnaire.html',
            url: 'http://192.168.10.48/guide/dialog/questionnaire.html',
            dataType: 'html',
            success: function (htmlData) {
                if($('.introjs-overlay:visible').length) $('.introjs-exitbutton').trigger('click');
                $(".bg-upload").show();
                $(".questionnaire").show();
                $(".questionnaire_content").show();
                $("body").append($(htmlData))
            }
        })
        setPopUp('Questionnaire')
        var exp = new Date().setTime(setTamp());
        window.localStorage.setItem("keyPopUpto", JSON.stringify({time: exp}));
    }
}
// 通过改变localStorage的value值来判断当天是否还要弹出
const setPopUp = (valuePopUP) => {
    window.localStorage.setItem("keyPopUp", JSON.stringify({ versionNo: valuePopUP}));
};
// 对比时间，判断数据是否过期
const getPopUp = () => {
    const localData = window.localStorage.getItem("keyPopUpto");
    if(localData) {
        const localDataObj = JSON.parse(localData);
        const nowTime = new Date().getTime();
        if (nowTime > localDataObj.time) {
            console.log("数据已过期");
            //删除
            window.localStorage.removeItem("keyPopUp");
            return false;
        }
    }
};

const userLoginState = (type) => {
    let thisToken = getCookie("token");
    let thisAccessToken = getCookie("accessToken");
    // let state = false;
    // if(thisToken){
    //     state = true;
    // }else if(!thisToken && !thisAccessToken){
    //     // loginwindowon();
    //     state = false;
    // }else 
    if(type&&thisAccessToken) {
        // 论坛登录刷新token
        getTokenByAccess(thisAccessToken,type);
        return;
    }
    if(!thisToken && thisAccessToken){
        getTokenByAccess(thisAccessToken);
    } else if(thisToken && thisAccessToken) {
        // getTokenByAccess(thisAccessToken);
    }
}

const getTokenByAccess = (thisAccessToken,type) => {
    $.ajax({
        url:'/api/getUserInfoByAccess',
        type:'get',
        success:function(resData){
            if(resData.code == 200){
                setCookie('role', resData.role);
                setCookie('token', resData.token);
                setCookie('id', resData.id);
                setCookie("mmdId", resData.mmdId);
                setCookie("accessToken",thisAccessToken);
                setCookie('SameSite', 'None');
                setCookie('Secure', true);
                logingoon(resData,type)
            }
        }
    })
}
const delThingJsAccessToken=function(){
    if(getCookie&&getCookie('thingJsAccessToken')&&setCookie) {
        setCookie('thingJsAccessToken', '');
    }
}
userLoginState();
function detectInput(inputVal,title){
    inputVal=inputVal||''; 
    let reg=/[\\\/：:？*?"<>|!！]/m;
    if(reg.test(inputVal)){
        return title+'不能包含特殊字符 如\\\/:*?"<>|';
    }
    return '';
}
function getTimesDetail(type) {
    $.ajax({
        url:'/api/getDownTimes?type='+type,
        type:'get',
        success:function(res){
            if(res.code==200) {
                list=res.data||[]; 
                var resultP = `<p>暂无记录</p>`;
                var tr = '';
                var page = `<ul class="pageContent">
                    <li class="fleft">共 <span class="totalNum">0</span> 条</li>
                    <li class="icon iconfont icon-left-line disabled"></li> 
                    <li class="fleft pageNum active">0 / 0</li>
                    <li class="icon iconfont icon-right-line disabled"></li> 
                    <li class="fleft">跳至 <input type="text" autocomplete="off" disabled> 页</li>
                </ul>`;
                var pageSize=3;
                var _arr=split_array(list,pageSize);
                var current=0;
                if (list.length&&_arr.length) {
                    current=1;
                    resultP = '';
                    for (let i in list) {
                        let item = list[i];
                        var info='';
                        if(item.usetimes>=item.times) {
                            info='打包次数等于在总次数';
                        } else {
                            if(type=='B'&&!item.isVip) {
                                if(item.usetimes>=item.times) {
                                   info='vip到期';
                                }
                            } else if(new Date(item.endtime).getTime()<=new Date().getTime()){
                                info='超出有效期';
                            } 
                        }
                        tr += `<tr `+(i>=3?"style='display:none'":"")+`><td>` + (Number(i) + 1)+ `</td><td>` + item.usetimes + `</td><td>` + item.times + `</td><td>` + item.source + `</td><td>` + item.endtime + `</td><td>`+(item.usetimes>=item.times?('<span class="disabled">已失效'+(info?('<r>'+info+'</r>'):'')+'</span>'):'<span>有效</span>')+`</td></tr>`;
                    }
                    var page=`<ul class="pageContent">
                    <li class="fleft">共 <span class="totalNum">`+list.length+`</span> 条</li>
                    <li class="icon iconfont icon-left-line `+(_arr.length>1&&current>1?'':'disabled')+`"></li> 
                    <li class="fleft pageNum active">`+current+` / `+_arr.length+`</li>
                    <li class="icon iconfont icon-right-line `+(_arr.length>1&&current<_arr.length?'':'disabled')+`"></li> 
                    <li class="fleft">跳至 <input type="number" autocomplete="off" value="`+current+`"> 页</li>
                    </ul>`;
                }
                layer.open({
                    type: 1,
                    title: type=='A'?'永久部署打包次数':'临时部署打包次数',
                    skin: 'packageTimesList',
                    area: ['550px', '310px'],
                    btn: ['确认'],
                    content: `<div class="times_content">
                                <div>
                                    <table>
                                        <tr><th>序号</th><th>已使用次数</th><th>总次数</th><th>来源</th><th>有效期</th><th>状态</th></tr>`+ tr + `
                                    </table>
                                </div>`+ resultP + page + `</div>`
            
                })
                $('.packageTimesList .times_content .pageContent li:nth-child(2)').click(function(e) {
                    if($(this).hasClass('disabled')) return;
                    current--;
                    if(current<=1) current=1;
                    if(current>=_arr.length) current=_arr.length;
                    resetContent(Number(current),_arr,pageSize,list.length,_arr.length);
                })
                $('.packageTimesList .times_content .pageContent li:nth-child(4)').click(function(e) {
                    if($(this).hasClass('disabled')) return;
                    current++;
                    if(current<=1) current=1;
                    if(current>=_arr.length) current=_arr.length;
                    resetContent(Number(current),_arr,pageSize,list.length,_arr.length);
                })
                $('.packageTimesList .times_content .pageContent li:last-child input').keydown(function(e) {
                    current=Number($(this).val());
                    if(current<=1) current=1;
                    if(current>=_arr.length) current=_arr.length;
                    resetContent(Number(current),_arr,pageSize,list.length,_arr.length);
                })
                function resetContent(current,arr,pageSize,total,totalPage){
                    $('.packageTimesList .times_content div table tbody tr:not(:first-child)').hide();
                    for (var i=0;i<arr[current-1].length;i++) {
                        var order=i+1+Number(pageSize*(current-1));
                        $('.packageTimesList .times_content div table tbody tr').eq(order).show();
                    }
                    $('.packageTimesList .times_content .pageContent li.pageNum').html(current+` / `+totalPage);
                    $('.packageTimesList .times_content .pageContent li input').val(current);
                    if((totalPage>1&&current>1)) {
                        $('.packageTimesList .times_content .pageContent li.icon-left-line').removeClass('disabled');
                    } else {
                        $('.packageTimesList .times_content .pageContent li.icon-left-line').addClass('disabled');
                    }
                    if(totalPage>1&&current<totalPage) {
                        $('.packageTimesList .times_content .pageContent li.icon-right-line').removeClass('disabled');
                    } else {
                        $('.packageTimesList .times_content .pageContent li.icon-right-line').addClass('disabled');
                    }
                }
            } else {
                console.log(res)
                alert(res.msg||'列表读取失败','error');
            }
        },error:function(e){
            console.log(e);
            alert('列表获取失败','error');
        }
    })
}

// 随机生成校验码
// function randomString() {
//     const len = 4;
//     let $chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefhijkmnprstuvwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,I1****/
//     let maxPos = $chars.length;
//     let pwd = '';
// 　　for (i = 0; i < len; i++) {
// 　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
// 　　}
// 　　return pwd;
// }

// // 注册图形校验码
// const getRegCode=()=>{
//     if(!$('#testCode').length)  $('#v_container_tel').append(`<span onclick="getRegCode()" id="testCode" style="position:absolute;top:50%;left:50%;z-index:10">
//                                                                     <img />
//                                                                     <span class='refresh' style="line-height: 40px;color: #999;cursor: pointer;margin-left: 3px;">
//                                                                         看不清?
//                                                                     </span>
//                                                                 </span>`);
//     $.ajax({
//         url:'/api/getVCode',
//         type:'get',
//         async:false,
//         headers:{
//             'Content-Type': 'image/bmp'
//         },
//         success:function(res){
//             if(res.state){ 
//                 // 后台响应
//                 var imageBuffer=res.data;
//                 let bytes = new Uint8Array(imageBuffer.data);
//                 let data = "";
//                 let len = bytes.byteLength;
//                 for (let i = 0; i < len; i++) {
//                 　　data += String.fromCharCode(bytes[i]);
//                 }
//                 $('#v_container_tel img').attr('src',"data:image/png;base64," + window.btoa(data));

//                 setCookie('vcode', res.vcode);
//             }else{
//                 // 不响应的情况

//             }
//             // if(res.content) {
//             //     $('#testCode svg').remove();
//             //     $('#testCode .refresh').before($(res.content))
//             // }
//         }
//     })
// }
// // 注册图形校验码
function getRegCode(className, verifyCode){
    console.log(className)
    $.ajax({
        url:SERVERPATH+'/api/getVCode',
        type:'get',
        async:false,
        headers:{
            'Content-Type': 'text/html; charset=utf-8'
        },
        
        success:function(res){
            if(res.state){ 
                // 后台响应
                verifyCode.refresh(res.code)
            }else{
                // 不响应的情况
                console.log("获取验证码失败！")
            }
        }
    })
}

// 加密字符串
function securityCode(cookieCode){
    try{
        let c=String.fromCharCode(cookieCode.charCodeAt(0)+cookieCode.length);
        for(let i=1;i<cookieCode.length;i++){
            c+=String.fromCharCode(cookieCode.charCodeAt(i)+cookieCode.charCodeAt(i-1));
        }
        return c;
    }catch(err){
        console.log(err)
        return '';
    }
}
const get_mmd_idByToken =function (type){
    return new Promise((resolve, reject)=>{
        if($.cookie('mmdId')) {
            return resolve($.cookie('mmdId'));
        } else if ($.cookie('token')) {
            fetch('/api/User_info').then(res=>res.json()).then((data)=>{
                if(data.mmdId) {
                    setCookie('mmdId',data.mmdId);
                    return resolve($.cookie('mmdId'));
                } else {
                    return resolve('');
                }
            }).catch(err=>{
                console.log(err);
                return resolve('');
            })
        } else {
           return resolve('');
        }
    });
}

// setTimeout(() => {
//     try{
//         if(getCookie('token')&&location.host=='www.thingjs.com') {
//             getSignJurisdiction();
//         }
//     }catch(e){}
// }, 0)

// // 查询用户是否有电子合同列表信息
// function getSignJurisdiction(){
//     fetch('/api/getSignJurisdiction').then(res => res.json()).then((data)=>{
//         if(data) {
//             if(data.code == 200 && data.msg == 1){
//                 $(".nav-link .userInfoBox .my-eign").show()
//             }
//         }
//     }).catch(err=>{
//         console.log(err);
//     })
// }

// confirmOrder
function confirmOrder(data) {
    if(!getCookie('token')) return;
    if(data) {
        openNewRedmine(data,1);
    } else {
        var url='https://www.thingjs.com/api/order/checkOrder';
        if(location.hostname == 'www.thingjs.com' || location.hostname=='test-thingjs.3dlink.cn') {
            url = '/api/order/checkOrder';
        }
        fetch(url,{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ssoToken: getCookie('sso_token'),
                token: getCookie('token')
            })
          }).then(res => res.json()).then(res => {
            if (res.code && res.code == 200 && res.data) {
                openNewRedmine(res.data);
            } else {
            //   console.log(res);
            }
          }).catch(err => {
            console.log(err);
          });
    }
}
function openNewRedmine(data) {
    var _url  = 'https://www.thingjs.com/guide/orderreminder.html';
    if(location.pathname&&location.pathname.indexOf('/guide')==-1&&location.host!='store.thingjs.com'&&location.host!='store.thingjs.com:3000'){
        return;
    } else if(location.hostname == 'www.thingjs.com' || location.hostname=='test-thingjs.3dlink.cn') {
        _url = origin + '/guide/orderreminder.html';
    } else if(location.host=='store.thingjs.com'){
        _url='https://store.thingjs.com/static/orderreminder.html';
    } else if(location.host=='store.thingjs.com:3000'){
        _url='http://store.thingjs.com:3000/static/orderreminder.html';
    }
    var onePage = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        // area: ['700px', '432px'],
        area: ['700px','396px'],
        skin: 'orderRedmin',
        content: [_url+'?n='+Math.ceil(Math.random()*1000), 'no'],
        zIndex: 1200,
        success: function () {
            document.getElementsByClassName('orderRedmin')[0].querySelector('.layui-layer-content').children[0].contentWindow.postMessage(data, '*');
        }
    });
    window.removeEventListener('message', myFunc, true);
    window.addEventListener('message', myFunc, true);
    function myFunc(e) {
        try {
            if (e.data && e.data == 'closeOne') {
                layer.close(onePage);
            }
        } catch (e) {
            console.log(e);
        }
    }
}