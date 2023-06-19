/**
 * 说明：ThingJS QuickChart 图表对接数据
 * 备注：ThingJS QuickChart 是一款低代码平台内置的图表编辑器。
 *      该示例中提供两种方法实现 QuickChart 图表数据对接，方法如下：
 *          1. 静态数据对接;此方式需根据组件的静态json数据格式进行传值
 *          2. RestApi数据对接,接口需能正常访问,需注意返回数据层级
 *      QuickChart 中组件的获取，详情请参考：https://developer.thingjs.com/t-1967.html
 * 难度：★★☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

// 引入一键图表脚本
THING.Utils.dynamicLoad(['/static/ScenePreview/chart/PreviewChartControl.js',
    '/uploads/wechat/oLX7p00hGCLCwKMAaF8daQuCaQEM/file/数据对接/mock.js'//
], function () {
    // 创建图表
    const tjs_chart = new PreviewChartControl({
        url: '/api/chart/6375e81905108267c4a1b264',
        tag: '1',
        isLoad: true,  // 加载页，默认为true
        isApplyBackground: false,  // 是否应用图表背景，启用该参数会替换app.background的值，默认false
        autoResize: {  // 图表自适应
            enable: false,  // 自适应图表分辨率，默认为false
            orgin: 'center center'  // 自适应的基准点，第一个参数取值为:left、center、right，第二个参数取值为:top、center、bottom，默认值为“center center”
        },
        complete: function () {
            // 创建按钮
            new THING.widget.Button('随机静态数据', function () {
                // 更新组件数据，以文本组件的静态数据为例，需要在图表加载完成回调中使用
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "ctext1f66223152304bf1a86b987a1db2076a",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置
                        "value": [{  // 组件的数据格式，与QuickChart对接数据中的静态JSON数据格式一致
                            "value": Mock.mock({ "num": "@integer(1,100)" }).num//此处的返回值为1-100的随机数，mock详细语法可以在http://mockjs.com/examples.html#Number进行查看
                        }]
                    }
                });
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "ctextb70222614e824a3697225b56a435941f",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置
                        "value": [{  // 组件的数据格式，与QuickChart对接数据中的静态JSON数据格式一致
                            "value": Mock.mock({ "num": "@integer(1,100)" }).num//此处的返回值为1-100的随机数，mock详细语法可以在http://mockjs.com/examples.html#Number进行查看
                        }]

                    }
                });
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "ctextd95a2d4e35e8461d8fe22d3f035a2cde",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置
                        "value": [{  // 组件的数据格式，与QuickChart对接数据中的静态JSON数据格式一致
                            "value": Mock.mock({ "num": "@integer(1,100)" }).num//此处的返回值为1-100的随机数，mock详细语法可以在http://mockjs.com/examples.html#Number进行查看
                        }]
                    }
                });
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "ctext05759c3c099f4541afb274d5eb115ef8",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置
                        "value": [{  // 组件的数据格式，与QuickChart对接数据中的静态JSON数据格式一致
                            "value": Mock.mock({ "num": "@integer(1,100)" }).num//此处的返回值为1-100的随机数，mock详细语法可以在http://mockjs.com/examples.html#Number进行查看
                        }]

                    }
                });
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "ctext973cc5bf850f4e6082a76770cfea4b40",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置
                        "value": [{  // 组件的数据格式，与QuickChart对接数据中的静态JSON数据格式一致
                            "value": Mock.mock({ "num": "@integer(1,100)" }).num//此处的返回值为1-100的随机数，mock详细语法可以在http://mockjs.com/examples.html#Number进行查看
                        }]
                    }
                });
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "ctexte0a4dc86271147a5b8a6a426973b80dc",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置
                        "value": [{  // 组件的数据格式，与QuickChart对接数据中的静态JSON数据格式一致
                            "value": Mock.mock({ "num": "@integer(1,100)" }).num
                        }]

                    }
                });
                tjs_chart.updateDataSource({
                    "type": "json",  // 数据对接类型
                    "id": "cprogress198bbd5ac34a4bc087ea50bc87fc12f4",  // 组件id,详情参考第二步在QuickChart中获取组件id
                    "config": {  // 对接数据配置

                        "value": [
                            {
                                "progress": Mock.mock({ "num": "@integer(1,100)" }).num / 100,
                                "title": "病毒防范",
                                "value": Mock.mock({ "num": "@integer(1,100)" }).num
                            },
                            {
                                "progress": Mock.mock({ "num": "@integer(1,100)" }).num / 100,
                                "title": "入网检测",
                                "value": Mock.mock({ "num": "@integer(1,100)" }).num
                            }
                        ]
                    }
                });

            });

            // 创建按钮
            new THING.widget.Button('对接api数据', function () {
                // 更新组件数据，以文本组件的REST API为例，需要在图表加载完成回调中使用
                tjs_chart.updateDataSource({
                    "id": "ePieCicle5ba2ae3415934d0dbd82bf184d011f28",  // 组件id，可在QuickChart中复制获取组件id
                    "type": "api",  // 数据对接类型
                    "config": {  // 对接数据配置
                        "url": "https://getman.cn/mock/test",  // REST API 重定向接口数据url，与QuickChart中REST API对接数据中REST地址一栏对应
                        "condition": {  // REST API 重定向接口请求参数，与QuickChart中REST API对接数据中POST Condition一栏对应一栏对应
                            //"deptId": 202
                        },
                        "responseLevel": "",  // REST API 重定向接口数据返回层级，与QuickChart中REST API对接数据中REST返回层级一栏对应一栏对应
                        "refreshEnable": true,  // 是否自动刷新 默认为false
                        "refreshTime": 3,  // 自动刷新时间间隔，默认为0
                    }
                })
            });
            // 修改按钮样式
            $("#widget_root").css("z-index", "1000")
            $("#widget_root").css("top", "62px")
            $("#widget_root").css("left", "411px")
            $(".widget-button").css("border", "1px solid #0993d7")
            $(".widget-button").css("box-shadow", "inset 0 0 0 1px #0a1e27, 0 2px 21px 0 rgb(3 10 13)")
        }
    });
})

