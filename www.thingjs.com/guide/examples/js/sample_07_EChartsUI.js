/**
 * 说明：ECharts 整合例子
 * 操作：点击图表，触发场景信息变化
 * 交互图表：当前车位状态、车牌信息、车辆类型
 * 难度：★★★☆☆
 */
// 动态引入ECharts.js
THING.Utils.dynamicLoad(['/guide/lib/echarts.min.js'], function () {

    // 加载场景代码 
    var app = new THING.App({
        url: '/api/scene/79b57763f86d7a451d71d18e',  // 场景地址
        background: '#000000',
        env: 'Seaside',
    });

    app.on('load', function (ev) {
        initThingJsTip("本例程展示了Echarts图表与ThingJS的交互，点击图表“当前车位状态”、“车牌信息”、“车辆类型”，查看效果");

        new THING.widget.Button('创建图表', function () {
            if (!$(".chart").length) {
                showParkingInfo(); // 车位信息
                showTypeInfo(); // 车辆类型信息
                showLicenseInfo(); // 车牌信息
                occupyPark(); // 车位占用
            }
        })
    })

    var timer = null;
    var uiAnchorArr = []; // 存储所有UIAnchor

    /**
     * 创建图表
     */
    function createChart(option, type) {
        var bottomBackground = document.createElement('div'); // 创建背景 div
        var bottomDom = document.createElement('div'); // 图表 div

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
        bottomBackground.setAttribute('style', backgroundStyle);
        bottomDom.setAttribute('style', chartsStyle);
        bottomBackground.setAttribute('class', 'chart');
        bottomDom.setAttribute('class', 'chart');

        // echarts 初始化
        var bottomCharts = window.echarts.init(bottomDom);
        bottomCharts.setOption(option);

        // 图表交互 当点击图图表时触发，params是点击位置信息参数
        bottomCharts.on('click', function (params) {
            clearTimeout(timer);
            cancelOutline();
            reset();
            clearUIAnchorArr();

            // 根据鼠标点击时的参数，控制场景中物体变化
            if (params.name == "空置车位") {
                app.query("空置车位").style.outlineColor = "#4a8cff";
            } else if (params.name == "占用车位") {
                app.query("占用车位").style.outlineColor = "#ff6c00";
            } else if (params.name.indexOf("车") != -1) {
                var reg = new RegExp(params.name);
                var cars = app.query(reg);
                flash(cars);
            } else if (params.name == "京") {
                var cars = app.query('[area=京]');
                for (var i = 0; i < cars.length; i++) {
                    createUIAnchor(cars[i]);
                }
            } else if (params.name == "津") {
                var cars = app.query('[area=津]');
                for (var i = 0; i < cars.length; i++) {
                    createUIAnchor(cars[i]);
                }
            } else if (params.name == "冀") {
                var cars = app.query('[area=冀]');
                for (var i = 0; i < cars.length; i++) {
                    createUIAnchor(cars[i]);
                }
            } else if (params.name == "辽") {
                var cars = app.query('[area=辽]');
                for (var i = 0; i < cars.length; i++) {
                    createUIAnchor(cars[i]);
                }
            }

            // 场景中信息显示5s后消失
            timer = setTimeout(function () {
                cancelOutline();
                reset();
                clearUIAnchorArr();
            }, 5000)
        });

        bottomBackground.appendChild(bottomDom);
        app.domElement.appendChild(bottomBackground); // 添加到app dom下
    }

    /**
     * 取消所有物体钩边
     */
    function cancelOutline() {
        app.query(".Thing").style.outlineColor = null;
    }

    /**
     * 设置闪烁
     */
    function flash(cars) {
        cars.on('update', function (ev) {
            ev.object.style.opacity = 0.5 + 0.5 * Math.sin(2 * app.elapsedTime / 200);
        }, '每帧改变透明度');
    }

    /**
     * 恢复设置
     */
    function reset() {
        var cars = app.query(/车/);
        cars.style.opacity = 1.0;
        cars.style.color = null;
        cars.off('update', null, '每帧改变透明度');
    }



    /**
     * 创建UIAnchor
     */
    function createUIAnchor(obj) {
        // 创建widget (绑定数据用)
        var panel = new THING.widget.Panel({
            width: '100px',
            cornerType: 'polyline'
        })
        panel.addString(obj.userData, 'id').caption('');

        var uiAnchor = app.create({
            type: 'UIAnchor',
            parent: obj,
            element: panel.domElement,
            localPosition: [0, 0, 0],
            pivot: [-0.1, 1.5]
        });
        uiAnchorArr.push(uiAnchor);
        return uiAnchor;
    }

    /**
     * 删除所有顶牌
     */
    function clearUIAnchorArr() {
        for (var i = 0; i < uiAnchorArr.length; i++) {
            uiAnchorArr[i].destroy();
        }
        uiAnchorArr = [];
    }

    /**
     * 当前停车位状态
     */
    function showParkingInfo() {
        var parkingTotalNum = 16;
        var emptyNum = 3;
        var parkOption = {
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
        createChart(parkOption, "车位状态");
    }

    /**
     * 车辆类型
     */
    function showTypeInfo() {
        var dataAxis = ["跑车", "轿车", "皮卡车", "面包车", "出租车"];
        var data = [3, 6, 1, 1, 2];
        var yMax = 7;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }

        var typeOption = {
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
        createChart(typeOption, "车辆类型");
    }

    /**
     * 显示车牌信息
     */
    function showLicenseInfo() {
        var len_jing = app.query('[area=京]').length; // 查询area=京的车辆
        var len_jin = app.query('[area=津]').length; // 查询area=津的车辆
        var len_ji = app.query('[area=冀]').length; // 查询area=冀的车辆
        var len_liao = app.query('[area=辽]').length; // 查询area=辽的车辆

        var licenseOption = {
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
        createChart(licenseOption, "车牌信息");
    }

    /**
     * 车位占用情况
     */
    function occupyPark() {
        var occupyOption = {
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
        createChart(occupyOption, "车位占用情况");
    }
})