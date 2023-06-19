/**
 * 说明：创建2d图表-节点动画示例一
 *      1. 支持给节点增加闪烁动画，如案例所示给暖气包增加闪烁动画
 *      2. 支持设置节点的颜色变化，如案例所示：当蒸汽压力大于10时出现颜色变化
 *      3. 支持隐藏节点，如案例所示隐藏蒸汽涡轮机
 *      4. 支持设置节点的缩放比例，如案例所示火焰的缩放比例改为0.5
 * 操作：点击按钮查看对应的效果
 * 难度：★☆☆☆☆
 */

// 引用拓扑组件脚本
THING.Utils.dynamicLoad(['https://topo.thingjs.com/topo-static/js/thing.diagram.min.js'], function () {
    // 初始化拓扑场景
    const graph = new THING.DIAGRAM.Graph({
        container: 'div2d', // 容器元素 id
        url: '/diagrams/7744412865e3143c' // 拓扑场景资源路径
    })
    // 视图加载完成
    graph.on('load', () => {
        popTip('点击左侧按钮，可查看节点的闪烁动画、颜色变化、节点隐藏、节点缩放的效果')
        new THING.widget.Button('闪烁动画', function () {
            popTip('蒸汽包节点闪烁')
            const node = graph.query('蒸汽包')[0]
            focusOnObject(graph, node, () => {
                // 蒸汽包闪烁
                node.flicker({
                    color: 'red',
                    blur: 20
                })
            })
        });

        new THING.widget.Button('颜色变化', function () {
            popTip('蒸汽包的蒸汽压力变为10，并出现颜色变化告警')
            const steamPressure = graph.query('#蒸汽压力值')[0]
            focusOnObject(graph, steamPressure, () => {
                const pressureValue = 10
                const alarmColor = '#c92d39'
                // 蒸汽压力颜色变化
                steamPressure.label = String(pressureValue)
                steamPressure.style.fontColor = 'white'
                steamPressure.animate({ fill: alarmColor })

            })
        });

        new THING.widget.Button('隐藏', function () {
            popTip('隐藏蒸汽涡轮机');
            const node = graph.query('蒸汽涡轮机')[0]
            // 淡出隐藏节点
            node.fadeOut()
        });

        new THING.widget.Button('缩放比例', function () {
            popTip('火焰的缩放比例改为0.5')
            // 使火焰节点缩放变化
            const node = graph.query('#fire-1')[0]
            focusOnObject(graph, node, () => {
                node.animate({ scale: 0.5 })
            })
        });

        new THING.widget.Button('重置', function () {
            reset(graph)
            popTip('点击左侧按钮，可查看节点的闪烁动画、颜色变化、节点隐藏、节点缩放的效果')
        });
    });
})

/**
 * 恢复初始化
 */
function reset(graph) {
    $('.alert').css('display', 'none');
    $('#rect').remove()
    const node1 = graph.query('#蒸汽压力值')[0]
    node1.label = '3.86'
    node1.style.fill = '#f0f2f5'
    node1.style.fontColor = '#000'
    const node2 = graph.query('蒸汽涡轮机')[0]
    node2.visible = true
    const node3 = graph.query('#fire-1')[0]
    node3.scale = 1
    graph.nodes.forEach(item => {
        item.stopFlicker()
    })
    graph.resetZoom()
}

/**
 * 聚焦节点
 */
function focusOnObject(graph, object, callback) {
    // 聚焦到节点区域时保留一定边距
    const padding = 50
    const rect = {
        x: object.position[0] - padding,
        y: object.position[1] - padding,
        width: object.width + padding * 2,
        height: object.height + padding * 2
    }
    // 创建矩形
    createRect(rect)
    // 显示红色矩形框并执行回调
    $('#rect').animate({opacity: 1}, 300, callback)

    function createRect (rect) {
        $('#rect').remove()
        const topLeft = graph.transformPosToViewport([rect.x, rect.y])
        const bottomRight = graph.transformPosToViewport([rect.x + rect.width, rect.y + rect.height])
        const left = topLeft[0]
        const top = topLeft[1]
        const right = bottomRight[0]
        const bottom = bottomRight[1]
        const width = right - left
        const height = bottom - top
        const divTemplate =
            `<div id="rect" style="opacity: 0;position: absolute;left: ${left}px;top: ${top}px;width: ${width}px;height: ${height}px;background: transparent;border: 2px solid red;z-index: 999;border-radius: 0px;display: block;"></div>`
        $('#div2d').append($(divTemplate))
    }
}

/**
 * 显示提示
 */
function popTip(text) {
    initThingJsTip(text);
    $(".alert").css({ display: 'block', background: 'buttonFace', border: '1px solid buttonFace' });
}

