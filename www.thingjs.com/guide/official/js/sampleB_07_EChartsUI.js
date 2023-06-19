/**
 * @version 2.0
 * @author ThingJS
 * 说明：ECharts 整合例子
 * 操作：点击图表，触发场景信息变化
 * 交互图表：当前车位状态、车牌信息、车辆类型
 * 难度：★★★☆☆
 */

const app = new THING.App();
app.background = '#000000';

THING.Utils.loadFile([
    '/guide/lib/echarts.min.js',  // 剖切盒脚本
], { load: loadFileCallBack })

// 资源加载_完成回调
async function loadFileCallBack() {

    // 加载场景
    const bundle = app.loadBundle("https://www.thingjs.com/uploads/wechat/5qmY5a2Q6YWx/file/测试2_0/factory-echarts", { ignoreTheme: true });
    bundle.waitForComplete().then(() => {
        initThingJsTip("本例程展示了Echarts图表与ThingJS的交互，点击图表“当前车位状态”、“车牌信息”、“车辆类型”，查看效果");
        ThingjsUtil.createButton('创建图表', createEchartsStart)
    })

    // 点击创建图表事件
    function createEchartsStart() {
        if ($(".chart").length) return

        // 创建对应图表
        createEChartMain("当前车位状态");
        createEChartMain("车辆类型");
        createEChartMain("上周车位占用情况");
        createEChartMain("显示车牌信息");
    }

    // 界面动态添加图表主入口
    function createEChartMain(name) {

        // 图表创建挂载逻辑
        function main(name) {
            /**
             * 界面动态添加图表逻辑
             *  1. 创建div
             *  2. 获取图表配置
             *  3. echart挂载在创建的dom上
             *  4. 将 dom 添加到 app (界面)上
            */
            var option
            var dom

            dom = EchartsUtil.createDom(name) // 1.
            option = Config.echartsOptions(name); // 2.
            charts = EchartsUtil.initChart(option, dom, echartsClickFunc); // 3.
            app.container.appendChild(dom);  // 4.
        }

        switch (name) {
            case "当前车位状态":
                main('车位状态');
                break;
            case "车辆类型":
                main("车辆类型");
                break;
            case "上周车位占用情况":
                main("车位占用情况");
                break;
            case "显示车牌信息":
                main("车牌信息");
                break;
        }
    }
}

// ============= 事件响应 =============
var timer
function echartsClickFunc(name, params) {
    reset()
    // 根据鼠标点击时的参数，控制场景中物体变化
    if (name == "空置车位") {
        ThingjsUtil.setThingOutline("空置车位", "#4a8cff");

    } else if (name == "占用车位") {
        ThingjsUtil.setThingOutline("占用车位", "#ff6c00");

    } else if (name.indexOf("车") != -1) {
        ThingjsUtil.setThingflicker(new RegExp(name));

    } else if (name == "京") {
        ThingjsUtil.createUIAnchor('[userData/area=京]')

    } else if (name == "津") {
        ThingjsUtil.createUIAnchor('[userData/area=津]')

    } else if (name == "冀") {
        ThingjsUtil.createUIAnchor('[userData/area=冀]')

    } else if (name == "辽") {
        ThingjsUtil.createUIAnchor('[userData/area=辽]')
    }

    // 场景中信息显示5s后消失
    timer = setTimeout(function () {
        reset()
    }, 5000)
}
function reset() {
    clearTimeout(timer);
    ThingjsUtil.setThingOutline(".Thing", null);
    ThingjsUtil.setThingStyle(/车/, { opacity: 1.0, color: null });
    ThingjsUtil.clearUIAnchorArr();
}


// ============= 配置类 =============
/**
 * Class Config
 * * 说明: 存放静态配置
 * 
 * echartsOptions(name)
 * * 说明: 获取图表的option
 * * @param {String}（可选） 车位状态/车牌信息/车位占用情况/车辆类型
 * * @return {Object} 图表的option
 * * @example 
 *           var option = Config.echartsOptions("车位状态")
 * 
 * */
class Config {
    // 返回图表的option
    static echartsOptions(name) {
        var option = {};
        switch (name) {
            case '车位状态':
                option = showParkingInfo()
                break;
            case '车辆类型':
                option = showTypeInfo()
                break;
            case '车位占用情况':
                option = occupyPark()
                break;
            case '车牌信息':
                option = showLicenseInfo()
                break;
        }

        return option;

        /**
         * 车位状态 option
         */
        function showParkingInfo() {
            var parkingTotalNum = 16;
            var emptyNum = 3;
            var option = {
                title: { text: '当前车位状态', x: 'center', textStyle: { color: '#cccccc' } },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    top: 60,
                    x: 'left',
                    data: ['占用车位', '空置车位'],
                    textStyle: {
                        color: '#cccccc'
                    }
                },
                calculable: true,
                series: [{
                    name: '车位',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: parkingTotalNum - emptyNum, name: '占用车位', itemStyle: { color: "#ff6c00" } },
                        { value: emptyNum, name: '空置车位', itemStyle: { color: "#4a8cff" } }
                    ]
                }]
            };
            return option
        }

        /**
         * 车辆类型 option
         */
        function showTypeInfo() {
            var dataAxis = ["跑车", "轿车", "皮卡车", "面包车", "出租车"];
            var data = [3, 6, 1, 1, 2];
            var yMax = 7;
            var dataShadow = [];

            for (var i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }

            var option = {
                title: { text: '车辆类型', x: 'center', textStyle: { color: '#cccccc' } },
                xAxis: {
                    data: dataAxis,
                    axisLabel: {
                        inside: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },
                dataZoom: [{
                    type: 'inside'
                }],
                series: [{ // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: { color: 'rgba(0,0,0,0.05)' }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ]
                            )
                        }
                    },
                    data: data
                }
                ]
            };
            return option
        }

        /**
         * 车位占用情况 option
         */
        function occupyPark() {
            var option = {
                title: { text: '上周车位占用情况', x: 'center', textStyle: { color: '#cccccc' } },
                tooltip: {
                    trigger: 'axis'
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisLabel: {
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                }],
                series: [{
                    name: '占用车位',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: { color: "#4a8cff" },
                            areaStyle: { type: 'default', color: "#4a8cff" }
                        }
                    },
                    data: [15, 14, 15, 15, 12, 6, 5]
                }]
            };
            return option
        }

        /**
         * 车牌信息 option
         */
        function showLicenseInfo() {
            var len_jing = app.query('[area=京]').length; // 查询area=京的车辆
            var len_jin = app.query('[area=津]').length; // 查询area=津的车辆
            var len_ji = app.query('[area=冀]').length; // 查询area=冀的车辆
            var len_liao = app.query('[area=辽]').length; // 查询area=辽的车辆

            var option = {
                title: { text: '车牌信息', x: 'center', textStyle: { color: '#cccccc' } },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['京', '津', '冀', '辽'],
                    textStyle: {
                        color: '#cccccc'
                    }
                },
                series: [{
                    name: '牌照',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: len_jing, name: '京' },
                        { value: len_jin, name: '津' },
                        { value: len_ji, name: '冀' },
                        { value: len_liao, name: '辽' },
                    ]
                }]
            };
            return option
        }
    }
}

// ============= 工具类 =============
/**
 * EchartsUtil
 * * 说明: Echarts挂载、 Dom创建相关
 * 
 * initChart(option, dom, clickFunc)
 * * 说明: dom上挂载echart
 * * @param {Object} echarts的options配置对象
 * * @param {Dom} dom对象
 * * @param {Function} 可选 点击事件回调
 * * @return {Echart} echart对象
 * 
 * createDom(type)  
 * * 说明: 创建dom 
 * * @param {String}（可选） 车位状态/车牌信息/车位占用情况/车辆类型
 * * @return {Dom} 创建的dom
 * * @example 
 *           var dom = EchartsUtil.createDom("车位状态")
 * 
 * echartClick(echarts, cb)
 * * 说明: 给echart添加单机交互事件
 * * @param {Echarts} echarts 对象;
 * * @param {Function(params.name, params)} 回调函数 
 *                               params是点击位置信息参数
 * * @return  void           
 * * @example 
 *           var cb = function(name, params) {
 *              if (name == "空置车位") {
 *                app.query("空置车位").style.outlineColor = "#000";
 *              }
 *           }
 *           EchartsUtil.echartClick(myEcharts, cb)
 * 
 * */
class EchartsUtil {
    // dom上挂载echart
    static initChart(option, bottomDom, clickFunc) {
        var Echarts = window.echarts.init(bottomDom);
        Echarts.setOption(option);
        if (echartsClickFunc) {
            EchartsUtil.echartClick(Echarts, echartsClickFunc)
        }
        return Echarts
    }

    // 创建dom
    static createDom(type) {
        const dom = document.createElement('div'); // 创建背景 div
        // 设置背景div和图表div的样式
        if (type == "车位状态") {
            var backgroundStyle = 'position: absolute;top:145px;right:3px;height:300px;width:380px;background: rgba(22,24,63,0.3); border-radius:3px';
            var chartsStyle = 'position: absolute;top:10px;right:0px;width:360px;height:250px;margin:0 10px;';
        } else if (type == "车牌信息") {
            var backgroundStyle = 'position: absolute;top:451px;right:3px;height:300px;width:380px;background: rgba(22,24,63,0.3); border-radius:3px';
            var chartsStyle = 'position: absolute;top:10px;right:0px;width:360px;height:300px;margin:0 10px;';
        } else if (type == "车位占用情况") {
            var backgroundStyle = 'position: absolute;top:145px;left:3px;height:300px;width:380px;background: rgba(22,24,63,0.3); border-radius:3px';
            var chartsStyle = 'position: absolute;top:10px;right:0px;width:360px;height:300px;margin:0 10px;';
        } else if (type == "车辆类型") {
            var backgroundStyle = 'position: absolute;top:451px;left:3px;height:300px;width:380px;background: rgba(22,24,63,0.3); border-radius:3px';
            var chartsStyle = 'position: absolute;top:10px;right:0px;width:360px;height:300px;margin:0 10px;';
        }
        dom.setAttribute('style', backgroundStyle);
        dom.setAttribute('class', 'chart');
        return dom
    }

    static echartClick(echarts, cb) {
        // 图表交互 当点击图图表时触发，params是点击位置信息参数
        echarts.on('click', function (params) {
            cb(params.name, params)
        })
    }
}
/**
 * ThingjsUtil
 * * Thingjs 相关工具
 * 
 * createButton(name, clickFunc)
 * * 说明: 创建按钮
 * * @param {String} 按钮名字 
 * * @param {Function} 按钮点击的回调函数
 * * @return  void
 * * @example 
 *            var func = function () {
 *                  console.log('我被点击了')
 *            }
 *            ThingjsUtil.createButton('创建图表', func)
 *
 * */
class ThingjsUtil {
    static uiAnchorArr = []; // 存储所有UIAnchor
    // 创建按钮
    static createButton(name, clickFunc) {
        new THING.widget.Button(name, clickFunc)
    }
    /**
     * 取消所有物体钩边
     */
    static setThingOutline(name, color) {
        var things = app.query(name);
        if (!things) {
            console.error('没有查询到thing物体')
            return
        }
        things.style.outlineColor = color;
    }
    /**
     * 设置物体颜色
     */
    static setThingStyle(name, style) {
        if (!style) {
            style = { opacity: 1.0, color: null }
        }
        var things = app.query(name);
        if (!things) {
            console.error('没有查询到thing物体')
            return
        }
        things.style.opacity = style.opacity;
        things.style.color = style.color;
        things.off('update', null, '每帧改变透明度');
        return things
    }

    static setThingflicker(name) {
        var things = app.query(name);
        if (!things) {
            console.error('没有查询到thing物体')
            return
        }
        things.on('update', function (ev) {
            ev.object.style.opacity = 0.5 + 0.5 * Math.sin(5 * app.elapsedTime);
        }, '每帧改变透明度');
    }

    /**
     * 创建UIAnchor
     */
    static createUIAnchor(name) {
        // 创建widget (绑定数据用)
        var things = app.query(name);

        if (!things) {
            console.error('没有查询到thing物体')
            return
        }

        for (var i = 0; i < things.length; i++) {
            var thing = things[i]
            var panel = new THING.widget.Panel({
                width: '100px',
                cornerType: 'polyline',
                visible: true,
                name: 'Panel'
            })
            panel.addString(thing.userData, 'id').caption('');
            thing.registerComponent(THING.DOM.CSS3DComponent, 'css');

            const css = thing.css;
            css.domElement = panel.domElement
            css.pivot = [0, -0.5]
            css.zIndex = i;
            css.factor = 0.05;
        }
        return things;
    }

    static clearUIAnchorArr() {
        $('.ThingJS_wrap').remove();
    }
}