/**
 * 说明：创建系统通栏
 * 操作：点击按钮，创建通栏
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

app.on('load', function () {
    new THING.widget.Button('创建上通栏', createTop);
    new THING.widget.Button('创建左侧通栏', createLeft);

    initThingJsTip("点击按钮，创建通栏面板");
})

var baseURL = "https://www.thingjs.com/static/images/sliohouse/";  // 引入图片文件
// 数据对象 为通栏中的按钮绑定数据用
var dataObj = {
    warehouseCode: false,
    temperature: false,
    humidity: false,
    statistics: false,
    status: false,
    orientation: false,
    cerealsReserve: false,
    video: true,
    cloud: true
};

/**
 * 创建上通栏
 */
function createTop() {
    // 创建一个上通栏
    var banner_top = THING.widget.Banner();

    // 向上通栏中添加按钮
    var img0 = banner_top.addImageBoolean(dataObj, 'warehouseCode').caption('仓库编号').imgUrl(baseURL + 'warehouse_code.png');;
    var img1 = banner_top.addImageBoolean(dataObj, 'temperature').caption('温度检测').imgUrl(baseURL + 'temperature.png');
    var img2 = banner_top.addImageBoolean(dataObj, 'humidity').caption('湿度检测').imgUrl(baseURL + 'humidity.png');
    var img3 = banner_top.addImageBoolean(dataObj, 'statistics').caption('能耗统计').imgUrl(baseURL + 'statistics.png');
    var img4 = banner_top.addImageBoolean(dataObj, 'status').caption('保粮状态').imgUrl(baseURL + 'cereals_reserves.png');

    // 为按钮绑定事件
    img0.on('change', function (value) {
        console.log(value)
    })
    img1.on('change', function (value) {
        console.log(value)
    })
    img2.on('change', function (value) {
        console.log(value)
    })

    $("#widget_root").css("top", "55px");
}

/**
 * 创建左侧通栏
 */
function createLeft() {
    // 创建一个左侧通栏
    var banner_left = THING.widget.Banner({
        column: 'left' // 通栏类型： top 为上通栏(默认)， left 为左通栏
    });

    // 向左侧通栏中添加按钮
    var img5 = banner_left.addImageBoolean(dataObj, 'orientation').caption('人车定位').imgUrl(baseURL + 'orientation.png');
    var img6 = banner_left.addImageBoolean(dataObj, 'cerealsReserve').caption('粮食储存').imgUrl(baseURL + 'cereals_reserves.png');
    var img7 = banner_left.addImageBoolean(dataObj, 'video').caption('视屏监控').imgUrl(baseURL + 'video.png');
    var img8 = banner_left.addImageBoolean(dataObj, 'cloud').caption('温度云图').imgUrl(baseURL + 'cloud.png');;

    $("#widget_root").css("left", "65px");
}