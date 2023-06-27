var checkAuthPath='/api/sampleRequest';
var failTip = `
    <link rel="stylesheet" href="/guide/css/account.css" />
    <link rel="stylesheet" href="/guide/css/regfont/iconfont.css" />
    <script src="/guide/lib/base64.js"></script>
    <script src="/guide/lib/jquery.cookie.js"></script>
    <script src="/guide/lib/layui/layui.all.js"></script>
    <div class="openShare">
        <div class="open-content">
            <div class="open-banner">
                <img src="/guide/image/headLogo.png">
            </div>
            <div class="open-fail sampleOpen" style="box-shadow:0px -1px 20px rgba(16, 16, 15, 0.3)">
                <div class="sampleOpenHead">
                    <span class="fail-tip">ThingJS项目已升级安全机制，请到ThingJS网站为本项目“新建分享”或在下方输入项目创建者用户名、密码访问该项目。</span>
                </div>
                <div class="userContent">
                    <div class="userMsg">
                        <i class="iconfont iconLogin icon-denglu"></i>
                        <input class="input-content input-user" placeholder="用户名/手机/邮箱" type="text">
                    </div>
                    <div class="userMsg">
                        <i class="iconfont icon-dunpai1"></i>
                        <input class="input-content input-key" type="password" placeholder="输入密码" type="text">
                    </div>
                    
                    <span class="g-button-right" onclick="checkLink()">
                        <span class="text">登录</span>
                    </span>
                </div>
                
                <!--<a class="fail-back" href="https://www.thingjs.com/guide/?m=main" target="_blank">返回网站首页></a>-->
            </div>
        </div>
        <div class="open-footer">
            <div class="footer-content" xmlns="http://www.w3.org/1999/xhtml">
                ©2018 uinnova 
                <a class="b-lnk-gy" href="https://www.thingjs.com/guide/?m=sample" target="_blank">ThingJS平台</a>|
                <a class="b-lnk-gy" href="https://www.thingjs.com/guide/?m=campus" target="_blank">CampusBuilder 3D园区搭建</a>|
                <a class="b-lnk-gy" href="https://www.thingjs.com/guide/?m=city" target="_blank">CityBuilder 3D城市搭建</a>|
                <a class="b-lnk-gy" href="https://www.thingjs.com/guide/?m=mod" target="_blank">ThingDepot 3D模型库</a>|
                <a class="b-lnk-gy" href="https://www.thingjs.com/guide/?m=pano" target="_blank">ThingPano 3D全景图</a>|
                <a class="b-lnk-gy" href="http://help.thingjs.com/hc/request/new/" target="_blank">提交反馈</a>
            </div>
        </div>
    </div>
    <script>
        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                checkLink();
            }
        });
        function setCookie(name1, value, d, domain) {
            var Days = 1;
            if (d) Days = d;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        
            var hostName = window.location.hostname;
            if(hostName == "www.thingjs.com") {
                domain = ".thingjs.com";
            }else if(hostName == "www.3dmmd.cn") {
                domain = ".3dmmd.cn";
            }
        
            if(domain){
                document.cookie =name1 + "=" + escape(value) + ";domain="+domain+";expires=" + exp.toGMTString() + "; path=/;";
            }else{
                document.cookie = name1 + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
            }
        }
        function checkLink(){
            var user = encodeURIComponent($('.input-user').val());
            var key = encodeURIComponent($('.input-key').val());
            if(user.length==0 || key.length==0){
                layer.msg("用户名或密码错误",{offset:['42%','45.8%'],time:1500});
                return;
            }
            var data = {
                username : encodeBase64.base64encode(user),
                password : encodeBase64.base64encode(key)
            }
            $.ajax({
                url: "/mp/login_mmd",
                type: "post",
                data: {
                    data : encodeBase64.base64encode(JSON.stringify(data))
                },
                success: function (res) {
                    if (res.code == 200) {
                        var date = new Date();
                        date.setTime(date.getTime() - 10000);
                        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                        if (keys) {
                            for (var i = keys.length; i--;) {
                                document.cookie = keys[i] + "=; expires=" + date.toGMTString();
                                document.cookie = keys[i] + "=;domain=.thingjs.com;expires="+date.toGMTString()+";path=/";
                                document.cookie = keys[i] + "=;domain=.3dmmd.cn;expires="+date.toGMTString()+";path=/";
                                $.removeCookie(keys[i], { path: '/' });
                                $.removeCookie(keys[i]);
                            }
                        }
                        setCookie('role', res.role);
                        setCookie('token', res.token);
                        setCookie('name1', res.name1);
                        setCookie('openid', res.openid);
                        setCookie('id', res.id);
                        setCookie('accessToken', res.accessToken);
                        setCookie('dix_token', res.dix_token);
                        setCookie('dix_id', res.id);
                        setCookie("saveSetSwitch",0);
                        setCookie("mmdId",res.mmdId);
                        if (!res.headimgurl) {
                            setCookie('headimgurl', window.location.protocol + "//" + window.location.host + '/guide/image/tx.png');
                        } else {
                            if(window.location.protocol == "https:") {
                                if(res.headimgurl.indexOf("http:")==0) {
                                    res.headimgurl = "https" + res.headimgurl.substring(4);
                                }
                            }
                            setCookie('headimgurl', res.headimgurl);
                        }
                        window.location.reload();
                    }else{
                        layer.msg("用户名或密码错误",{offset:['45%','46.5%'],time:1500});
                    }
                }
            })
        }
    </script>`
function getQueryString(name1) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name1 + "=([^\&\?]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

var name1 = getQueryString("name1");
// thingjs1.0
// var name_m = getQueryString("m");
// var name_m = 'examples/js/sample_027_Iframe3D.js'
// var name_m = 'examples/js/sample_02_BIM.js'
// var name_m = 'examples/js/sample_02_SceneDynamicLoad.js'

// thingjs2.0
var name_m = 'official/js/basic_helloworld.js'

if (name_m) {
    name1 = name_m;
    // name1 = name1.substr(0, name1.lastIndexOf('/')) + name1.substr(name1.lastIndexOf('/')).replace(/01/g, '%').replace(/02/g, '0');
}

if (name1) {
    var file = name1.substring(name1.lastIndexOf("/") + 1, name1.lastIndexOf(".js"));
    var filenameArr = file.split('.');
    var thingPath = 'thing.min.js'
    var nameArr = name1.split("/");
    // if (filenameArr.length > 2) {
    //     var version = file.substring(file.indexOf('.') + 1);
    // }
    var ifSample = 0;
    var thisPath = name1;
    
    if (nameArr[2] == 'package' || nameArr[1] == 'p') {
        checkAuthPath='/api/processReques';
        ifSample = 3;
        if (nameArr[1] == 'p') thisPath = "/uploads/package/" + thisPath.substring(3);
    }else if (nameArr[0] != "examples"){
        if(nameArr[0] == 'official'){
            thisPath = thisPath;
        }else if (nameArr[1] != "uploads") {
            thisPath = "/uploads/wechat/" + thisPath;
        }
    }
    // getUserUid
    var thisAuthorUid = getUserUidByPath(thisPath);
    setCookie('authorUid', thisAuthorUid);

    $.ajax({
        url: '/api/getFileVersion?thisJsName=' + filenameArr[0] + '&ifSample=' + ifSample + '&filePath=' + thisPath,
        type: 'get',
        async: false,
        success: function(result){
            // console.log(result);
            if(result && result.code && result.code == '200'){
                if(result.message != '') {
                    thingPath = "thing-" + result.message + ".min.js";
                }
            }
        }
    })
    
    if (nameArr[2] == 'package' || nameArr[1] == 'p') {
        $('style').append(`#div3d #dataAttribution{display:none;}`);
        var prj_id = nameArr[nameArr.length - 2];
    
        if (nameArr[1] == 'p') name1 = "/uploads/package/" + name1.substring(3);
        var baseThing = '/static/historyVersion/';

        var findThingPath = name1.substring(0,name1.lastIndexOf('/')) + "/" + thingPath;
        thingPath = baseThing + thingPath;
        
        $.ajax({
            url: "/api/queryPrjThing",
            type: 'get',
            dataType: 'json',
            data: {
                path: findThingPath
            },
            async:false,
            success: function(queryData){
                if(queryData.code && queryData.code == 200){
                    thingPath = findThingPath;
                }
            }
        })
        
        $.ajax({
            type: "GET",
            url: window.location.protocol + "//" + window.location.host + "/api/prj_query",
            data: { prj_id: prj_id },
            async: !1,
            success: function (t) {
                if(t.canOnLoad){
                    if(t.canOnLoad == 'no'){
                        $("#content").hide();
                        document.write(failTip);
                        document.close();
                        return;
                    }
                }
                t.code == 200 ? name1
                    && (document.write("<script type='text/javascript' src='" + thingPath + "'><\/script>"),
                        document.write("<script type='text/javascript'>THING.__auth_server_URL__='"+checkAuthPath+"';<\/script>"),
                        document.write("<script type='text/javascript' src='/static/release/thing.widget.min.js'><\/script>"),
                        document.write("<script src='" + name1 + "'><\/script>")) : alert("项目已到期，请到控制台续费", "error", "renewal")
            }
        })
    } else {
        if (nameArr[0] != "examples"){
            // eg:'official/js/basic_helloworld.js'
            var userId = '';
            if(nameArr[0] == 'official'){
                userId = nameArr[0];
                name1 =  name1;
            }else if (nameArr[1] != "uploads") {
                userId = nameArr[0];
                name1 = "/uploads/wechat/" + name1;
            }else{
                userId = nameArr[3];
            }

            onLoadChtIframe(userId,name1.substring(name1.lastIndexOf('/')+1),true,true);
            // $.ajax({
            //     type: "GET",
            //     url: window.location.protocol + "//" + window.location.host + "/api/CheckUserId",
            //     data: { userId: userId , projectJs: name1},
            //     async: false,
            //     success: function (t) {
            //         if(t.state){
            //             onLoadChtIframe(userId,name1.substring(name1.lastIndexOf('/')+1),t.nerVer,t.newEarth);
            //         }else{
            //             // alert("该项目分享已失效。可联系项目作者重新设置项目分享！", "error", "renewal");
            //             $("#content").hide();
                        
            //             document.write(failTip);
            //             document.close();
            //         }
            //     },
            //     error: function(error){
            //         console.log(error);
            //     }
            // });
        }else{
            onLoadSceneJson();
        } 
    }
}

function onLoadChtIframe(openid,namejs,nerVer=false,newEarth=false){
    var data = {
        "openid": openid,
        "name1": namejs
    };
    var urls ='http';
    if(window.location.origin.indexOf('https')>=0){
        urls = 'https';
    }
    onLoadSceneJson(nerVer,newEarth)
    // $.ajax({
    //     url: urls + '://www.thingjs.com/chart/udatav/getSceneByOpenidAndName',
    //     type: 'post',
    //     data: JSON.stringify(data),
    //     async: false,
    //     contentType: "application/json", //必须有 
    //     success: function (result) {
    //         if (result && result.code == 200 && result.data.length > 0) {
    //             chartId = result.data[0].id;
    //             var iframeHtml1 = `\<\!DOCTYPE html\> \<html lang=\"zh\"\ style="height:100%">\<head\> \<meta charset=\"UTF-8\"\> \<meta name1=\"description\" content=\"面向物联网的3D可视化开发平台.基于WebGL兼容各种浏览器及移动设备.零门槛、高效率、低成本开发各类3D应用\" \/\>\<meta name1=\"keywords\" content=\"ThingJS, Threejs Three 3D 三维 物联网 开发 优锘 开发平台\" \/\>\<meta name1=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\"\>
    //             \<title\>ThingJS演示\<\/title\>\<body\ style="margin:0;padding:0;height:100%"><iframe frameborder='0' style='width:100%;height:100%;display:block;position: absolute;top: 0;' src='`;
    //             var iframeHtml2 = "'></iframe>\</body\>";
    //             var ifR = iframeHtml1 + urls +'://www.thingjs.com/chart/publish/'+ chartId + iframeHtml2;
    //             document.write(ifR);
    //             document.close();
    //         }else{
    //             onLoadSceneJson(nerVer,newEarth)
    //         }       
    //     },
    //     error: function (err){
    //         onLoadSceneJson(nerVer,newEarth)
    //     }
    // })
}
function onLoadSceneJson(nerVer=false,newEarth=false){
    if(window.location.href.indexOf('?m=official/js/')==-1){
        // thingjs2.0
        if(nerVer) {
            if(newEarth) {
                document.write(`<script src="/static/historyVersion/thing.umd.min.js"></script>
                <script src="/static/historyVersion/thing.earth.umd.min.js"></script>
                <script type="text/javascript">THING.__auth_server_URL__='`+checkAuthPath+`';</script>
                <script type="text/javascript" src="/static/release/thing.widget.min.js"></script>
                <script src="`+ name1 + `"></script>`);
            } else {
                document.write(`<script src="/static/historyVersion/thing.umd.min.js"></script>
                <script type="text/javascript">THING.__auth_server_URL__='`+checkAuthPath+`';</script>
                <script type="text/javascript" src="/static/release/thing.widget.min.js"></script>
                <script src="`+ name1 + `"></script>`);
            }
        } else {
            // 执行了这里
            document.write(`
            <script src="/static/historyVersion/`+ 'thing.min.deuglify.not.thing.js' + `"></script>
            <script src="/static/historyVersion/`+ 'thing.min.deuglify.thing.js' + `"></script>
            <script type="text/javascript">THING.__auth_server_URL__='`+checkAuthPath+`';</script>
            <script type="text/javascript" src="/static/release/thing.widget.min.js"></script>
            <script src="`+ name1 + `"></script>`);
        }
    } else {
        document.write(`<script src="/static/historyVersion/thing.umd.min.js"></script>`+(newEarth?`<script src="/static/historyVersion/thing.earth.umd.min.js"></script>`:``)+`
        <script type="text/javascript">THING.__auth_server_URL__='`+checkAuthPath+`';</script>
        <script type="text/javascript" src="/static/release/thing.widget.min.js"></script>
        <script src="`+ name1 + `"></script>`);
    }
    if (name1.indexOf('/package/') < 0) {
        document.write(`<script>setInterval(function() {document.title = "ThingJS 演示"},2000);</script>`)
    }
    $.ajax({
        type: "POST",
        url: window.location.protocol + "//" + window.location.host + "/api/updatePageView",
        data: { projectJs: "." + name1 }
    })
}

function setCookie(name1, value, d, domain) {
    var Days = 2;
    if (d) Days = d;
    var exp = new Date();
    exp.setTime(setTamp());

    var hostName = window.location.hostname;
    if(hostName == "www.thingjs.com") {
        domain = ".thingjs.com";
    }else if(hostName == "www.3dmmd.cn") {
        domain = ".3dmmd.cn";
    }

    if(domain){
        document.cookie =name1 + "=" + escape(value) + ";domain="+domain+";expires=" + exp.toGMTString() + "; path=/;";
    }else{
        document.cookie = name1 + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
    }
}

function setTamp(){
    var curDate = new Date(); 
    //当前时间戳
    var curTamp = curDate.getTime(); 
    //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1; 
    //当日已经过去的时间（毫秒）
    var passedTamp = curTamp - curWeeHours; 
    //当日剩余时间
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    return leftTamp + curTamp;
}

function getUserUidByPath(userPath){
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
            for(var i = 3;i<endIndex;i++){
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
            for(var i = 3;i<endIndex;i++){
                if(fromUid.length>0){
                    fromUid = fromUid + '/';
                }
                fromUid = fromUid + pathArr[i];
            }
        }
    }
    
    return fromUid;
}