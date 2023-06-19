/**
 * @version 2.0
 * @author ThingJS
 * 说明：全局查询，根据 id 、name 、类型、属性、正则 等方式查询
 * 操作：点击按钮，弹出搜索框，可通过搜索框来查询到有 id、name、类型、属性、正则/car/的物体
 * 难度：★☆☆☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var campus;// 园区对象
var sel = [];
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
bundle.waitForComplete().then((ev) => {
    campus = app.query(".Campus")[0];  // 获取园区对象
    app.query('car01')[0].position = [-1.678, 0.02, 14.021];
    create_html();

    initThingJsTip("弹出搜索框，可通过搜索框来查询到有 id、name、类型、属性、正则/car/的物体");
    var buildings = campus.buildings;
    var things = campus.things;
    var sel = things.query(/a/);
    sel.push(buildings[0])
    sel.forEach(function (item) {
        create_html()
        create_element(item, "textAndPictureMarker");
        $('#' + item.id + ' .text').text("id：" + item.id);
        $('#' + item.id + ' .text1').text("name：" + item.name);
    })

    new THING.widget.Button('按 id 查询', function () {
        start();
        $('#searchText').attr('placeholder', '输入 id');
        $("#startnav").on('click', function () {
            var result1 = $("input[id='searchText']").val();
            var item = app.query('#' + result1)[0];
            $('.textAndPictureMarker').removeClass('moveAnimation');
            if (item) {
                $('#' + item.id).addClass('moveAnimation');
            } else {
                $("input[id='searchText']").val('');
            }
        });
    });

    new THING.widget.Button('按 name 查询', function () {
        start();
        $('#searchText').attr('placeholder', '输入 name');
        $("#startnav").on('click', function () {
            var result2 = $("input[id='searchText']").val();
            var item = app.query(result2)[0];
            $('.textAndPictureMarker').removeClass('moveAnimation');
            if (item) {
                $('#' + item.id).addClass('moveAnimation');
            } else {
                $("input[id='searchText']").val('');
            }
        });
    });

    new THING.widget.Button('按 name 正则查询', function () {
        start();
        $('#searchText').attr('placeholder', '输入 car');
        $("#startnav").on('click', function () {
            var result3 = $("input[id='searchText']").val();
            var reg = new RegExp(result3);
            // var reg = app.query(/car/)
            if (result3 == null) return;
            var item = app.query(reg);
            $('.textAndPictureMarker').removeClass('moveAnimation');
            item.forEach(function (obj) {
                $('#' + obj.id).addClass('moveAnimation');
            })
        });
    });

    new THING.widget.Button('按类型查询', function () {
        start();
        $('#searchText').attr('placeholder', '输入类型');
        $("#startnav").on('click', function () {
            var result4 = $("input[id='searchText']").val();
            $('.textAndPictureMarker').removeClass('moveAnimation');
            var item = sel.query('.' + result4);
            item.forEach(function (obj) {
                $('#' + obj.id).addClass('moveAnimation');
            })
        });
    });

    new THING.widget.Button('按属性查询', function () {
        reset();
        $("#search").css('display', 'none');
        $(".alert").css('display', 'block');
        initThingJsTip("搜索名字中包含 car 、并且属性字段 userData 中马力为40的物体顶牌跳跃");
        var item = app.query(/car/).query('[userData/power=40]');
        $('.textAndPictureMarker').removeClass('moveAnimation');
        item.forEach(function (obj) {
            $('#' + obj.id).addClass('moveAnimation');
        });
    });

    // 跳跃动画关闭
    new THING.widget.Button('重置', reset);
})

/**
 * 创建搜索框
 */
function start() {
    $(".alert").css('display', 'none');
    $('.marker').removeClass('moveAnimation');
    $("input[id='searchText']").val('');
    $(".search").remove();
    createSearch();
    $(".search").css('display', 'block');
}

/**
 * 搜索框html
 */
function createSearch() {
    if ($(".search").length) return
    let searchHtml =
        `<div class="search" style="position: absolute;padding-left: 10px;top: 60px;left: 50%;transform: translateX(-50%);font-size: 13px;height: auto;background: rgb(255, 255, 255);box-sizing: border-box;z-index: 999;border-radius: 4px;display:none;">
              <img src="/guide/examples/images/navigation/search.png"/ style="position: relative;width: 14px;height: 14px;top: 3px;box-sizing: border-box;">
              <input id="searchText" type="text" class="searchText" placeholder="搜索关键字" autocomplete="off" style="width: 140px;height: 32px;outline: none;border: none;margin: 0px 0px 0px 14px;font-size: 13px;appearance: none;">
              <button type="button" id="startnav" class="btn btn-default" style="display: inline-block;padding: 6px 12px;margin-bottom: 0px;font-size: 14px;font-weight: 400;line-height: 1.42857;text-align: center;white-space: nowrap;vertical-align: middle;touch-action: manipulation;cursor: pointer;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;outline: none;border-color: transparent;box-shadow:none;">
                  搜索
              </button>
          </div>`;
    $('#div2d').append($(searchHtml));
}



/**
 * 创建html
 */
function create_html() {
    var textAndPictureMarkerHtml =
        `<div id="textAndPictureMarker" class="marker" style="position: absolute;">
			<div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
				测试标签1
			</div>
            <div class="text1" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
				测试标签2
			</div>
			<div class="picture" style="height: 30px;width: 30px;margin: auto;">
				<img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
			</div>
		</div>`;
    $('head').append($(`
          <style>
              .scaleAnimation{
                  animation: scaleTo 0.3s infinite alternate;
              }
              @keyframes scaleTo {
                  from{-webkit-transform: scale(1);}
                  to{-webkit-transform: scale(1.3);}
              }
              .moveAnimation{
                  animation: moveTo 1s infinite;
              }
              @keyframes moveTo {
                  0% {
                      transform: translate3d(0, 0px, 0);
                  }
                  60% {
                      transform: translate3d(0, -50px, 0);
                  }
                  75% {
                      transform: translate3d(0, 10px, 0);
                  }
                  90% {
                      transform: translate3d(0, -10px, 0);
                  }
                  100% {
                      transform: none;
                  }
              }
          </style>
      `));
    $('#div3d').append($(textAndPictureMarkerHtml));
}


/**
 * 创建顶牌
 * @param {Object} obj - 创建顶牌的父物体
 * @param {String} cla - 创建顶牌的dom元素的class
 */
function createTopCard(obj) {
    obj.registerComponent(THING.DOM.CSS2DComponent, 'css');
    const css = obj.css;
    css.domElement = document.getElementById('textAndPictureMarker');
    css.domElement.setAttribute("id", obj.id);
    css.pivot = [0.5, 0];
    css.autoUpdateVisible = true;
    css.visible = true;
    css.factor = 0.05;
    return css;
}

/**
 * 恢复初始化
 */
function reset() {
    start();
    $(".search").remove();
}
/**
 * 创建顶牌界面
 * @param {Object} obj - 创建顶牌界面的父物体
 * @param {String} value - 创建顶牌界面的类型
 */

function create_element(obj) {
    let css = createTopCard(obj);
}