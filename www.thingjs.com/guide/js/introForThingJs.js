var countForStep = 0;
/**开始指引   移除妨碍指引的类，新增出现指引的类 */
function startGuide() {
  // var width_jzk = $(window).width();
  // console.log(width_jzk);
  // if(width_jzk == '1279'){
  //   console.log('sadas')
  //   $('.banner-info').css({'top':'49%'}); 
  // }
//判断是否处于150缩放比例
  var ratio = detectZoom()
  if(ratio == '150'){
    $('.banner-info').css({'top':'50%'}); 
  }

  //回到顶部
  //window.scrollTo(0,0)
  //$("body,html").animate({scrollTop:0},500)
  //document.body.scrollTop = document.documentElement.scrollTop = 0;
  //以一个隐藏的div来控制所有判断
  document.getElementById("startTeach").style.color = 'red';
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  $(".fix").css("position", 'absolute');
  $("#jiangzuokuntest").removeClass("swiper-container");
  $("#jiangzuokuntest").addClass("swiper-container-jiangzuokun");
  /**这是改变轮播的方法，停止轮播或者开启轮播 */
  changeAutoPlayFlag('end');
  setTimeout('stepOne()', 100);
}

function sdkFunc(eventName) {
  AnalysysAgent.track(eventName);
} 
/**第一步 */
function stepOne() {
  // 当用户处于150%的缩放界面时候显示出4步骤讲解。还得测测这个1280是不是笔记本的150%
  //对应的按钮
  $('.introjs-tooltiptext').css('width', '312px');
  $('.introjs-tooltiptext').css('height', '130px');
  var ourname = $.cookie('name');
  /**第一步判断用户是否登录，两种判断 */
  if (ourname) {
    document.getElementById("goToTheComponent").setAttribute("href", "?m=campus&intoTheGuide=yes");
    $('.introjs-arrow').css('left', '20%');
    $('#controlAlertForComponent').css('display', 'block');
    // 登录过的用户进入新手指引
    introJs().setOptions({
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //对应的数组，顺序出现每一步引导提示
      steps: [
        {
          //第一步引导
          //这个属性类似于jquery的选择器， 可以通过jquery选择器的方式来选择你需要选中的对象进行指引
          element: '.nlll',
          //这里是每个引导框具体的文字内容，中间可以编写HTML代码
          intro: '<div style="width:305px;height:130px;">您好，欢迎查看ThingJS新手引导教程！本教程将从四个方面为您介绍ThingJS基本使用方法。<br><br>请点击下一步开始查看吧！</div>',
          //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
          position: 'bottom'
        },
        {
          element: '.nlll',
          intro: '<div style="width:305px;height:130px;">在ThingJS完成一个3D可视化系统开发一般需要如下四个步骤，现在让我们一步步了解整个过程吧！<br><br>请点击下一步查看。</div>',
          position: 'bottom'
        },
        {
          //
          element: '.banner-child',
          intro: `<div style="width:300px;height:100px">现在让我们开始ThingJS应用第一步：3D场景搭建！<br><br>请您点击下一步。</div>`,
          position: 'bottom'
        },
        {
          //
          element: '#goToTheComponent',
          intro: `<div style="width:300px;height:140px">首先，您需要下载场景搭建工具CampusBuilder。<br><br>请到CampusBuilder页下载安装包。若已下载安装请点击跳过本节。
          </div>`,
          position: 'bottom'
        }
      ]
    }).oncomplete(function () {
      $("#navHeaderForTutorial").removeClass("slide-bottom");
      $(".fix").css("position", 'absolute');
      userHasLoginAndWantToGoStepTwo();
      //在这里要进入到第二步，中间加个提示，走到了第二步了！

    }).onexit(function () {
     // $('.banner-info').css({'top':'83%'});
      userHasLoginAndWantToGoStepTwo();
    }).start().onbeforechange(function (targetElement) {
      countForStep = countForStep + 1;
    }).onafterchange(function (targetElement) {});
  } else {
    //用户没有注册&登录：
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //hidePrev:true,
      //showButtons: false,
      //对应的数组，顺序出现每一步引导提示
      steps: [{
          //第一步引导
          //这个属性类似于jquery的选择器， 可以通过jquery选择器的方式来选择你需要选中的对象进行指引
          element: '.nlll',
          //这里是每个引导框具体的文字内容，中间可以编写HTML代码
          intro: '<div style="width:305px;height:130px;">您好，欢迎查看ThingJS新手引导教程！本教程将从四个方面为您介绍ThingJS基本使用方法。<br><br>请点击下一步开始查看吧！</div>',
          //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
          position: 'bottom'
        },
        {
          element: '.banner-inner',
          intro: '<div style="width:305px;height:130px;">在ThingJS完成一个3D可视化系统开发一般需要如下四个步骤，现在让我们一步步了解整个过程吧！<br><br>请点击下一步查看。</div>',
          position: 'bottom'
        },
        {
          //第5步引导
          element: '#nav-reg',
          intro: '在正式开始介绍前，如您未注册ThingJS账号，请先注册账号；如您已有账号，请点击下一步，进行登录。',
          position: 'bottom'
        },
        {
          //第5步引导
          element: '#login',
          intro: `请您登录。`,
          position: 'bottom'
        }
      ]
    }).oncomplete(function () {
     // $('.banner-info').css({'top':'83%'});
      //正常完成
      //点击完成按钮后执行的事件
      $("#navHeaderForTutorial").removeClass("slide-bottom");
      //$("#navHeaderForTutorial").removeClass("fix");    
      $(".fix").css("position", 'absolute');
      userHasLoginAndWantToGoStepTwo();
    }).onexit(function () {
      //$('.banner-info').css({'top':'83%'});
      $("#navHeaderForTutorial").removeClass("slide-bottom");
      $(".fix").css("position", 'absolute');
      userHasNotLoginAndWantToGoStepTwo();
    }).start();
  }
}

/**用户没有登录还想跳过第一节进行下一节，所以我们得让他进行登录。 */
function userHasNotLoginAndWantToGoStepTwo() {
  var ourname = $.cookie('name');
  if (ourname) {} else {
    pleaseLogin();
  }
}

/**
 * 点击导航栏注册按钮后触发的事件：
 * 1.上一个提示框消失
 * 2.注册模态框出现
 * 3.点击注册
 */
function introTwo_reg() {
  introJs().exit();
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过注册",
    doneLabel: "进行登录",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      //该位置是点击注册触发的时事件，后期需要将该事件单独放出来，通过点击注册来触发
      element: '#navRegOrIndexAndPopUp',
      intro: '<div style="width:320px;height:100px;">ThingJS平台需要使用ThingJS账号来进行3D可视化系统开发，您也可以使用第三方登录或者是输入手机号来注册我们的ThingJS账号。</div>',
      position: 'right'
    }]
  }).onexit(function () {
    //非常规退出 、直接退出
    $("#navHeaderForTutorial").addClass("slide-bottom");
    $("#navHeaderForTutorial").addClass("fix");
    introTwo_login();
  }).start();
}


/***点击导航栏注册按钮的提示框的结束按钮所触发的事件
 * 跳过第二节，需要有多重判断，一：已经登录，那么直接进入第三节
 * 二：未登录，进入注册，
 * 三：未登录，但是有账号，不想注册，点击结束，进入登录
 * 四，什么都不想干，直接跳出去？（不让他这样，必须登录）
 */
function introTwo_login() {
  //新增用户从注册跳到登录
  introJs().exit();
  $('.login-reg-window').css('display', 'none');
  $('.login-window-in').css('display', 'block');
  /**以下样式用于从注册框变成登录框*/
  $('.login-window-header span').text("用户登录");
  $('.loginTitleSpan').text("用户名/手机/邮箱登录");
  $('.loginTitleDiv').css('margin-top', '16px');
  $('.regBoxPhone').css('display', 'none');
  $('.regPhoneNum').css('margin-bottom', '16px');
  $('.pay-mb').toggle();
  $('.iconLogin').removeClass('icon-19').addClass('icon-denglu');
  $('#login-reg-tel').attr('placeholder', '用户名/手机/邮箱');
  $('#login-reg-password').attr('placeholder', '密码');
  $('.reg-footer').css('display', 'none');
  $('#reg-btn').text("登录");
  introJs().setOptions({
    showButtons: false,
    exitOnEsc: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      //该位置是点击注册触发的时事件，后期需要将该事件单独放出来，通过点击注册来触发
      element: '#navRegOrIndexAndPopUp',
      intro: '<div style="width:204px;height:48px;">请您使用用户名/手机/邮箱或是QQ/微信进行登录。</div>',
      position: 'right'
    }]
  }).start();
}

/**
 * 用户注册成功后进行的操作。
 */
function userRegAndNeedlogin() {
  //新增用户从注册跳到登录
  introJs().exit();
  $('.login-reg-window').css('display', 'none');
  $('.login-window-in').css('display', 'block');
  /**以下样式用于从注册框变成登录框*/
  $('.login-window-header span').text("用户登录");
  $('.loginTitleSpan').text("用户名/手机/邮箱登录");
  $('.loginTitleDiv').css('margin-top', '16px');
  $('.regBoxPhone').css('display', 'none');
  $('.regPhoneNum').css('margin-bottom', '16px');
  $('.pay-mb').toggle();
  $('.iconLogin').removeClass('icon-19').addClass('icon-denglu');
  $('#login-reg-tel').attr('placeholder', '用户名/手机/邮箱');
  $('#login-reg-password').attr('placeholder', '密码');
  $('.reg-footer').css('display', 'none');
  $('#reg-btn').text("登录");
  $('#loginOtherDiv').css('display', 'none');
  introJs().setOptions({
    showButtons: false,
    exitOnEsc: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      //该位置是点击注册触发的时事件，后期需要将该事件单独放出来，通过点击注册来触发
      element: '#navRegOrIndexAndPopUp',
      intro: '<div style="width:204px;height:48px;">请您使用注册好的账号密码登录。</div>',
      position: 'right'
    }]
  }).start();
}


function introTwo_plus() {
  //用户没有注册&登录：
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  //$("#navHeaderForTutorial").removeClass("fix");     
  $(".fix").css("position", 'absolute');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //hidePrev:true,
    //showButtons: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
        //第5步引导
        element: '#nav-reg',
        intro: '您还未登录！如您没有账号，请点击注册，如您已有账号，请点击下一步，进行登录。',
        position: 'left'
      },
      {
        //第5步引导
        element: '#login',
        intro: '请您点击登录！若不登录将无法进行后续操作',
        position: 'left'
      }
    ]
  }).oncomplete(function () {
    //正常完成
    //点击完成按钮后执行的事件
    introThree();
  }).onexit(function () {
    $("#navHeaderForTutorial").removeClass("slide-bottom");
    $(".fix").css("position", 'absolute');
    introThree();
  }).start();
}


/**下载CampusBuilder */
function introThree() {
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  $(".fix").css("position", 'absolute');
  $('#controlAlertForComponent').css('display', 'block');
  //进入下载页面
  document.getElementById("goToTheComponent").setAttribute("href", "?m=campus&intoTheGuide=yes");
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      //
      element: '.banner-child',
      intro: `<div style="width:300px;height:100px">现在让我们开始ThingJS应用第一步：3D场景搭建！<br><br>请您点击下一步。</div>`,
      position: 'bottom'
    }, {
      //
      element: '#goToTheComponent',
      intro: `<div style="width:300px;height:140px">首先，您需要下载场景搭建工具CampusBuilder。<br><br>请到CampusBuilder页下载安装包。若已下载安装请点击跳过本节。
        </div>`,
      position: 'bottom'
    }]
  }).onexit(function () {
    introFive();
  }).start();
}

function introThree_add() {
  introJs().exit(); //退出
  document.getElementById("goToTheComponent").setAttribute("href", "?m=campus&intoTheGuide=yes");
  $('.campusUl').css('display', 'block');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    hideNext: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      //该位置是点击注册触发的时事件，后期需要将该事件单独放出来，通过点击注册来触发
      element: '#goToTheComponent',
      intro: `<div style="height:100px;width:300px;">请您点击CampusBuilder进入到下载页面。<br><br>若您已下载，请点击跳过本节</div>`,
      position: 'buttom'
    }]
  }).onexit(function () {
    $('.campusUl').css('display', 'none');
    //introFour();
    introFive();
  }).start();
}






/**
 * 通过控制台进入到在线开发中
 * 2.应用开发：当用户登录后，点击新手教程
 */
function introFive() {
  var ourname = $.cookie('name');
  if (!ourname) {
    //如果用户没有登录
    //alert('请您登录在进行该操作');
    introJs().exit();
    introTwo_plus();
  } else {
    $("#jiangzuokuntest").removeClass("swiper-container");
    $("#jiangzuokuntest").addClass("swiper-container-jiangzuokun");
    $("#navbarHeader").css('diplay', 'block');
    document.getElementById("onlineDevelopment").setAttribute("href", "?m=sample&intoTheGuide=yes");
    $("#navHeaderForTutorial").removeClass("slide-bottom");
    ////$("#navHeaderForTutorial").removeClass("fix");    
    $(".fix").css("position", 'absolute');
    $('.userInfoBox').show();
    changeAutoPlayFlag('end');
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //showButtons: false,
      //对应的数组，顺序出现每一步引导提示
      steps: [{
        element: '#yingyongkaifa',
        intro: `<div style="width:305px;height:120px;">您已了解ThingJS平台应用第一阶段“场景搭建”，现在让我们开始第二阶段“应用开发”的学习吧！<br><br>请点击下一步。</div>`,
        position: 'top'
      }, {
        element: '#msg',
        intro: '“应用开发”可从个人账户的“控制台”开始。',
        position: 'left'
      }]
    }).oncomplete(function () {
      window.location.href = '/?m=sample&intoTheGuide=yes';
    }).onexit(function () {
      //非常规退出 、直接退出
      window.location.href = '../admin/#/myScene?intoTheGuide=yes';
    }).start();
  }
}

/**该方法暂时未使用 此方法为直接从主页进入到在线开发(即不进入控制台，直接进入在线开发。) */
function introFive_addOne() {
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  $(".fix").css("position", 'absolute');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "结束",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
        element: '#div5',
        intro: '让我们开始在线编辑场景吧！',
        position: 'top'
      },
      {

        element: '#onlineDevelopment',
        intro: '请点击在线开发，ThingJS为您提供了在线3D可视化应用开发及运营平台，让你开发3d项目更迅捷，更方便，更简单！',
        position: 'bottom'
      }
    ]
  }).oncomplete(function () {
    //正常完成
    //点击完成按钮后执行的事件
    introSix();
  }).onexit(function () {
    //非常规退出 、直接退出
    introSix();
  }).onchange(function () {
    //点击上/下一步
  }).start();
}

/**
 * 通过鼠标放置在登录头像上，进入控制台来在线开发
 */


/**进入到后台选择场景这一个位置 */
function chooseSense() {
  $('#showDevelopBtn').addClass('screenshot-tools-guide');
  $('#showDevelopBtn').removeClass('screenshot-tools');
  if (!$("#senceNum").length > 0) {
    introJs().exit();
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //showButtons: false,
      //对应的数组，顺序出现每一步引导提示
      steps: [{
        element: '.null',
        intro: '<div style="width:320px;height:80px">您还未创建任何场景！请使用<font style="font-size:14px;">CampusBuilder</font>搭一个场景，或者点击跳过本节进入到在线开发，学习如何使用我们的在线开发工具。',
        position: 'left'
      }]
    }).onexit(function () {
      window.location.href = '../guide/?m=sample&intoTheGuide=yes';
    }).start();
  } else {
    $('.card').addClass('optionSence');
    $('.card').addClass('optionSence');
    $('.card_option.option2.introjs-showElement').css('display', 'block');
    introJs().exit();
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //showButtons: false,
      //对应的数组，顺序出现每一步引导提示
      steps: [{
        element: '.null',
        intro: `<div style="width:320px;height:190px;">
              在控制台中有您的项目、资源、订单等信息，您在“场景搭建”过程中利用<font style="font-size:14px">CampusBuilder</font>客户端搭好的场景都将会自动同步到“我的场景”中，您可从“我的场景”列表选择一个3D场景开始3D可视化应用的开发进程。<br><br>请点击下一步。</div>`,
        position: 'right'
      }, {
        element: '.data-prev',
        intro: `<div style="width:320px;height:95px;">点每个场景的“开发”按钮进入“在线开发”过程。<br><br>请点击此按钮。</div>`,

        position: 'bottom'
      }]
    }).onexit(function () {
      //非常规退出 、直接退出
      window.location.href = '../guide/?m=sample&intoTheGuide=yes';
    }).oncomplete(function () {
      window.location.href = '../guide/?m=sample&intoTheGuide=yes';
    }).start();
  }
}

/**点击操作场景 */
function clickOptionSense() {
  introJs().exit();
  /**调用指引的点击事件 */
  introJs().exit();
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "结束",
    showButtons: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      element: '.card_option_menu',
      intro: '请您点击编辑项目。',
      position: 'left'
    }]
  }).onexit(function () {
    //非常规退出 、直接退出
  }).start();
}

/**
 * 用户在指引状态下进入到在线开发页面下触发的事件
 * 在线开发步骤修改，通过控制台进入到在线开发中去：
 * 鼠标放置到用户上，出现控制台，点击控制台，进入到项目
 * 点击操作，选择编辑场景，会自动进入到在线开发，进入在线开发的引导
 * 进入到在线开发页面后的步骤
 */
function introFive_add() {
  //console.log('mmmmmmmmmmmmmm');
  $("#startTeach").css('color', '#666666');
  //由于在线开发代码是模拟的html，所以在此我需要微调左边导航栏的样式以达到导航显示的作用
  $(".content-nav").css("position", 'relative');
  $("#jzk_sample_01_Box").css('display', 'none');
  $('#jzk_开始').removeClass('active');
  $("#jzk_sample_07_TextRegion").css('display', 'block');
  $("#jzk_sample_07_TextRegion").css('background-color', '#111212');
  $("#sample_07_Marker").css('background-color', '#111212');

  $("#jzk_sample_10_GetData_JSONP").css('display', 'block');
  $("#jzk_sample_10_GetData_JSONP").css('background-color', '#111212');
  /**
 * test20190801:
 * 尝试让div始终滚动至最底层
 */
var dirs = document.getElementById('list0');
dirs.scrollTop = dirs.scrollHeight

$('#list0').css('overflow','hidden')
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "结束本节",
    doneLabel: "结束本节",
    exitOnEsc: true,
    //对应的数组，顺序出现每一步引导提示
    steps: [

      {
        //引导左侧导航栏
        element: '.null',
        intro: `<div style="width:320px;height:105px;">欢迎您来到ThingJS“在线开发”环境！<br><br>在本环节，我们希望您能够通过点击下一步，了解ThingJS平台在线开发的基本使用方法。</div>`,
        position: 'bottom'
      }, {
        //引导左侧导航栏
        element: '#tab_list',
        intro: '<div style="width:320px;height:124px;">您可通过官方例程查看ThingJS基本功能的例子，您可以学习了解各项基本原理，并在需要时引用修改相关例子为您所用。<br><br>请点击下一步继续学习。</div>',
        position: 'right'
      },
      {
        //引导左侧导航栏
        element: '#sample_07_Marker',
        intro: `<div style="width:320px;height:124px;">举例：在官方例程里有诸如Marker标记之类的示例，当您需要实现这类功能时在官方例程中寻找。<br><br>请点击下一步继续学习本节。</div>`,
        position: 'right'
      },
      {

        element: '.btn-bc.btn',
        intro: `<div style="width:320px;height:125px;">这是“保存”按钮，您在实际开发中可点击此处来保存代码，也可使用Ctrl + S快捷键来保存项目。<br><br>请点击下一步继续学习本节。
        </div>`,
        position: 'bottom'
      },
      {

        element: '#btn.btn-zx',
        intro: '<div style="width:320px;height:125px;">这是“执行程序”按钮，您在开发中可点击此处来执行代码，您也可以使用Ctrl + r/Enter来执行项目。<br><br>请点击下一步学习下一节。</div>',
        position: 'bottom'
      }, {
        element: '.null',
        intro: `<div style="width:320px;height:115px;">恭喜您初步了解“应用开发”过程，现在让我们开始进行ThingJS应用开发第三步“数据对接”的学习吧！<br><br>请点击下一步继续学习本节。</div>`,
        position: 'bottom'
      },
      //第三节数据对接的引导
      {
        //引导左侧导航栏
        element: '#jzk_sample_10_GetData_JSONP',
        intro: '<div style="width:320px;height:100px;">请点击这四个中的任意一个官方示例来查看数据对接。<br><br>点击后请点击下一步继续学习本节。</div>',
        position: 'right'
      },
      // {
      //   element: '#content',
      //   intro: '<div style="width:320px;height:100px;">右侧就是我们程序运行后的结果，您可以仔细查看该场景，或者运行其他官方示例。<br><br>请点击下一步学习下一节。</div>',
      //   position: 'right'
      // },
      {
        element: '.null',
        intro: `<div style="width:320px;height:190px;">恭喜您初步了解“数据对接”过程。<br><br>接下来我们介绍一下第四步“在线部署”。“在线部署”分：日常的项目访问方法“项目分享”和正式的“在线部署”两部分！<br><br>请点击下一步了解。</div>`,
        position: 'bottom'
      },
      {
        element: '.btn-qr',
        intro: `<div style="width:320px;height:93px;">这是“项目分享”按钮，您在开发中可点击此处即可选择项目访问的方法。<br><br>请点击下一步。</div>`,
        position: 'bottom'
      },
      // {
      //   element: '#moveclose-dialog',
      //   intro: `<div style="width:320px;height:103px;">您可选择这三种中的任意一种来访问使用您的项目。<br><br>请点击下一步。</div>`,
      //   position: 'right'
      // },
      // //新增修改场景
      //  {

      //   element: '.sharePanel',
      //   intro: '<div style="width:320px;height:76px;"> 最后让我们来学习如何在线部署吧！！！<br><br>请您点击下一步继续学习本节。</div>',
      //   position: 'bottom'
      // }, 
      {
        element: '.btn-pro.btn',
        intro: '<div style="width:320px;height:92px;">此处是正式“在线部署”所在，点击此按钮，即可正式部署您的项目。<br><br>欢迎您在正式在线部署时使用。</div>',
        position: 'bottom'
      }, {
        element: '.null',
        intro: `恭喜您完成了新手教程！`,
        position: 'left'
      }
    ]
  }).oncomplete(function () {
    
    //console.log('aaaaaaaaa');
    window.location.href = '/guide/?m=sample';
    introJs().exit();
  }).onexit(function () {
    //console.log('zzzzzzzzzzzzzz');
    window.location.href = '/guide/?m=sample';
    introJs().exit();
  }).start();
}


/**3.数据对接 与应用开发类似 */
function introSixPre() {
  //由于在线开发代码是模拟的html，所以在此我需要微调左边导航栏的样式以达到导航显示的作用
  $(".content-nav").css("position", 'relative');
  $('#list0').css('background-color', '#111212');
  $("#jzk_sample_01_Box").css('display', 'none');
  $("#jzk_sample_07_TextRegion").css('display', 'none');
  $("#jzk_sample_10_GetData_JSONP").css('display', 'block');
  $("#jzk_sample_10_GetData_JSONP").css('background-color', '#111212');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
        element: '.null',
        intro: `<div style="width:320px;height:100px;">恭喜您完成了对于应用开发的学习，现在让我们开始进行倒数第二节数据对接的学习吧！<br><br>请您点击下一步继续学习本节。</div>`,
        position: 'bottom'
      },
      {
        //引导左侧导航栏
        element: '#jzk_sample_10_GetData_JSONP',
        intro: '<div style="width:320px;height:100px;">请您点击这四个中的任意一个官方示例来查看数据对接。<br><br>点击后请您点击下一步继续学习本节。</div>',
        position: 'right'
      },
      {
        element: '#btn.btn-zx',
        intro: '<div style="width:320px;height:84px;">请您点击此处运行此程序。<br><br>点击后请您点击下一步继续学习本节。</div>',
        position: 'bottom'
      },
      {
        element: '#content',
        intro: '<div style="width:320px;height:100px;">右侧就是我们程序运行后的结果，您可以仔细查看该场景，或者运行其他官方示例。<br><br>请您点击跳过本节学习下一节。</div>',
        position: 'right'
      }
    ]
  }).oncomplete(function () {
    introSix();
  }).onexit(function () {
    introSix();
  }).onchange(function () {
    //点击上/下一步
  }).start();
}

/**在线部署 */
function introSix() {
  $('.screen').addClass('setZIndex');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //对应的数组，顺序出现每一步引导提示
    steps: [{

      element: '.null',
      intro: '<div style="width:320px;height:76px;"> 最后让我们来学习如何在线部署吧！！！<br><br>请您点击下一步继续学习本节。</div>',
      position: 'bottom'
    }, {
      element: '.btn-pro.btn',
      intro: '<div style="width:320px;height:76px;"> 点击此按钮，即可部署您的项目。<br><br>请您点击下一步继续学习本节。</div>',
      position: 'bottom'
    }, {
      element: '.null',
      intro: `恭喜您完成了新手教程！`,
      position: 'left'
    }]
  }).oncomplete(function () {
    //正常完成
    //点击完成按钮后执行的事件
    //introSeven();
    introJs().exit();
  }).onexit(function () {
    introJs().exit();
  }).onchange(function () {
    //点击上/下一步
  }).start();
}


/**
 * 用于引导页面判断是否登录了
 * 当没有登录，且跳过注册（不想注册）的时候，弹出登录框，必须让你登录
 */
function determineLogin() {
  if (document.getElementById("startTeach").style.color == 'red') {
    var ourname = $.cookie('name');
    if (ourname) {
      introJs().exit();
      fadeOut();
    } else {
      $('#navRegOrIndexAndPopUp').removeClass('fadeOutReg');
      $('#navRegOrIndexAndPopUp').css('display', 'block');
      $('#navRegOrIndexAndPopUp').addClass('fadeIn');
      //introTwo_login();
    }
  }
}

/**
 * 让登录注册模态框消失
 */
function fadeOut() {
  if ($(".login-window").is(':visible')) {
    if ($(".login-window").hasClass('login-reg-over')) {
      $(".login-window").addClass('fadeOutReg');
    } else {
      $(".login-window").addClass('fadeOut');
    }
    $(".login-window").removeClass('fadeIn fadeInReg');
  }
}


function setTimeoutForTest() {
  if (document.getElementById("startTeach").style.color == 'red') {
    $('.swal2-popup.swal2-modal.swal2-show').removeClass('swal2-modal');
    setTimeout('testForSaveProject()', 1000);
  }
}
/**新增鼠标点击保存按钮进入下一步，当用户点击保存后，进入到下一步，执行运行代码 */
function testForSaveProject() {
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      element: '#btn.btn-zx',
      intro: '请点击此处尝试运行项目。',
      position: 'right'
    }]
  }).onexit(function () {
    //非常规退出 、直接退出
  }).start();
}



function userHasLoginAndWantToGoStepTwo() {

  $("#jiangzuokuntest").removeClass("swiper-container");
  $("#jiangzuokuntest").addClass("swiper-container-jiangzuokun");
  $("#navbarHeader").css('diplay', 'block');
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  ////$("#navHeaderForTutorial").removeClass("fix");    
  $(".fix").css("position", 'absolute');


  $('.userInfoBox').show();
  changeAutoPlayFlag('end');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      element: '#yingyongkaifa',
      intro: `<div style="width:305px;height:120px;">您已了解ThingJS平台应用第一阶段“场景搭建”，现在让我们开始第二阶段“应用开发”的学习吧！<br><br>请点击下一步。</div>`,
      position: 'top'
    }, {
      element: '#msg',
      intro: '“应用开发”可从个人账户的“控制台”开始。',
      position: 'left'
    }]
  }).oncomplete(function () {
    window.location.href = '/?m=sample&intoTheGuide=yes';
  }).onexit(function () {
    //非常规退出 、直接退出
    window.location.href = '../admin/#/myScene?intoTheGuide=yes';
    //introSix();
  }).start();

}

function introForOnlineProgramming() {
  introJs().exit();
  $("#userInfo").css('display', 'block');
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  //$("#navHeaderForTutorial").removeClass("fix");     
  $(".fix").css("position", 'absolute');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "结束",
    showButtons: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      element: '#msg',
      intro: '请您点击控制台。',
      position: 'bottom'
    }]
  }).onexit(function () {
    //非常规退出 、直接退出
  }).start();
}

/**进入到了CampusBuilder页面中 */
function introThree_addTwo() {
  $("#navHeaderForTutorial").addClass("slide-bottom");
  $("#navHeaderForTutorial").addClass("fix");
  $('#controlAlertForComponent').css('display', 'none');
  $("#controlTheBtnShow").removeClass("slide-right ");
  $('#downLoadNow').css({
    'background-color': '#2bbbd4',
    'border-radius': '25px'
  });
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //对应的数组，顺序出现每一步引导提示
    steps: [{
      //该位置是点击注册触发的时事件，后期需要将该事件单独放出来，通过点击注册来触发
      element: '#downLoadNow',
      intro: `<div style="width:260px;height:40px;" >点击下载CampusBuilder客户端安装包。`,
      position: 'right'
    }]
  }).onexit(function () {
    $("#controlTheBtnShow").addClass("slide-right");
    $('.campusUl').css('display', 'none');
    //introFour();
    window.location.href = '../guide/?m=main&intoTheGuide=yes&step=2';
    //introFive();
    //非常规退出 、直接退出

  }).start();
}


/**点击下载cb */
function introThree_addThree() {
  //移除CampusBuilder
  $("#controlTheBtnShow").removeClass("slide-right ");
  introJs().exit();
  document.getElementById("startTeach").style.color = 'red';
  introJs().exit(); //退出
  //$('.campusUl').css('display', 'block');
  var ratio = detectZoom()
  if(ratio == '150'){
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //对应的数组，顺序出现每一步引导提示
      steps: [{
        element: '.toolContainer',
        intro: '<div style="width:220px;height:100px"> 请您点击64位下载来下载我们的官方客户端安装包。<br><br>下载完成后请点击跳过本节。</div>',
        position: 'buttom'
      }]
    }).onexit(function () {
      $("#controlTheBtnShow").addClass("slide-right");
      $('.campusUl').css('display', 'none');
      //非常规退出 、直接退出
      $(".DwnSel").hide();
      window.location.href = '../guide/?m=main&intoTheGuide=yes&step=2';
    }).start();
  }else{
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //对应的数组，顺序出现每一步引导提示
      steps: [{
        element: '.toolContainer',
        intro: '<div style="width:320px;height:100px"> 请您点击64位下载来下载我们的官方客户端安装包。<br><br>下载完成后请点击跳过本节。</div>',
        position: 'right'
      }]
    }).onexit(function () {
      $("#controlTheBtnShow").addClass("slide-right");
      $('.campusUl').css('display', 'none');
      //非常规退出 、直接退出
      $(".DwnSel").hide();
      window.location.href = '../guide/?m=main&intoTheGuide=yes&step=2';
    }).start();
  }
  
}

/**下载完CampusBuilder之后点击跳过本节回到的页面所调用的方法。 */
function thisisstepTwoWork() {

  //当处于150%缩放的时候让四个步骤上移
  var ratio = detectZoom()
  if(ratio == '150'){
    $('.banner-info').css({'top':'50%'}); 
  }
  var ourname = $.cookie('name');
  if (!ourname) {
    //如果用户没有登录
    //alert('请您登录在进行该操作');
    introJs().exit();
    introTwo_plus();
  } else {
    $("#jiangzuokuntest").removeClass("swiper-container");
    $("#jiangzuokuntest").addClass("swiper-container-jiangzuokun");
    $("#navbarHeader").css('diplay', 'block');
    document.getElementById("onlineDevelopment").setAttribute("href", "?m=sample&intoTheGuide=yes");
    $("#navHeaderForTutorial").removeClass("slide-bottom");
    ////$("#navHeaderForTutorial").removeClass("fix");
    $(".fix").css("position", 'absolute');
    $('.userInfoBox').show();
    changeAutoPlayFlag('end');
    introJs().setOptions({
      //对应的按钮?
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //showButtons: false,
      //对应的数组，顺序出现每一步引导提示
      steps: [{
        element: '#yingyongkaifa',
        intro: `<div style="width:305px;height:120px;">您已了解ThingJS平台应用第一阶段“场景搭建”，现在让我们开始第二阶段“应用开发”的学习吧！<br><br>请点击下一步。</div>`,
        position: 'top'
      }, {
        element: '#msg',
        intro: '“应用开发”可从个人账户的“控制台”开始。',
        position: 'left'
      }]
    }).oncomplete(function () {
      window.location.href = '/?m=sample&intoTheGuide=yes';
    }).onexit(function () {
      //非常规退出 、直接退出
      window.location.href = '../admin/#/myScene?intoTheGuide=yes';
    }).start();
  }
}

function pleaseLogin() {
  //用户没有注册&登录：
  $("#navHeaderForTutorial").removeClass("slide-bottom");
  //$("#navHeaderForTutorial").removeClass("fix");    
  $(".fix").css("position", 'absolute');
  introJs().setOptions({
    //对应的按钮
    prevLabel: "上一步",
    nextLabel: "下一步",
    skipLabel: "跳过本节",
    doneLabel: "跳过本节",
    //hidePrev:true,
    //showButtons: false,
    //对应的数组，顺序出现每一步引导提示
    steps: [{
        //第5步引导
        element: '#nav-reg',
        intro: '在结束第一阶段新手指引之前请您先注册登录，否则您无法进行下一阶段的学习，若您已有账号请点击下一步进行登录。',
        position: 'buttom'
      },
      {
        //第5步引导
        element: '#login',
        intro: `请您登录`,
        position: 'buttom'
      }
    ]
  }).oncomplete(function () {
    //正常完成
    //点击完成按钮后执行的事件
    introThree();
    //添加登錄出現的方法
    //introTwo_reg();
  }).onexit(function () {
    $("#navHeaderForTutorial").removeClass("slide-bottom");
    //$("#navHeaderForTutorial").removeClass("fix");    
    $(".fix").css("position", 'absolute');
    pleaseLogin();
    // introTwo_reg();
    //跳转页面后的跟随还有点难度，先进行在线开发的控制stepThree
    pleaseLogin();
  }).start();
}







function stepOne_Download() {
  if (countForStep == 2) {
    introJs().setOptions({
      //对应的按钮
      prevLabel: "上一步",
      nextLabel: "下一步",
      skipLabel: "跳过本节",
      doneLabel: "跳过本节",
      //hidePrev:true,
      //showButtons: false,
      //对应的数组，顺序出现每一步引导提示
      steps: [{
          //第一步引导
          //这个属性类似于jquery的选择器， 可以通过jquery选择器的方式来选择你需要选中的对象进行指引
          element: '.nlll',
          //这里是每个引导框具体的文字内容，中间可以编写HTML代码
          intro: '您好，欢迎您查看本教程！本教程将会从以下四个方面会为您介绍Thingjs的基本使用方法。请您点击下一步查看。',
          //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
          position: 'bottom'
        },
        {
          //第一步引导
          //这个属性类似于jquery的选择器， 可以通过jquery选择器的方式来选择你需要选中的对象进行指引
          element: '.banner-inner',
          //这里是每个引导框具体的文字内容，中间可以编写HTML代码
          intro: '本教程一共有以下四个步骤，现在让我们点击下一步进行搭建场景的学习吧！',
          //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
          position: 'bottom'
        },
        {
          //第5步引导
          element: '#nav-reg',
          intro: '请点击注册，如您已有账号，请您点击下一步，进行登录。',
          position: 'bottom'
        },
        {
          //第5步引导
          element: '#login',
          intro: `请您登录`,
          position: 'bottom'
        }
      ]
    }).start();

  } else {}
}


/**获取页面缩放值 */
function detectZoom() {
  var ratio = 0,
      screen = window.screen,
      ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
      ratio = Math.round(ratio * 100);
  }
  return ratio;
}
