/**
 * 说明：创建2d图表-鼠标事件示例
 *      1.支持监听左键单击事件，按需配置动作，如案例中的节点翻转
 *      2. 支持监听左键双击事件，按需配置动作，如案例中的聚焦到该节点
 *      3.支持监听鼠标移入移出事件，按需配置动作，如案例中移入时节点闪烁，移出时节点恢复正常
 * 操作：点击按钮开启事件，按照听不提示查看对应效果
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
        popTip('点击左侧按钮，开启鼠标左键单击、鼠标左键双击和鼠标滑过事件')
        new THING.widget.Button('开启左键单击事件', function () {
            reset(graph)
            popTip('点击开关，切换开关状态')
            let state = true
            const nodes = graph.query('开关')
            // 监听点击事件
            nodes.on('click', e => {
                state = !state
                const object = e.object
                const pipe = graph.query(`[userData/开关=${object.id}]`)[0]
                // 根据开关状态，设置开关图片翻转以及管道流动效果
                if (state) {
                    object.flip = 'none'
                    pipe.flow({ color: '#f57373', width: 8 })
                } else {
                    object.flip = 'horizontal'
                    pipe.stopFlow()
                }
            })
            focusOnObject(graph, nodes[0])
        })

        new THING.widget.Button('开启左键双击事件', function () {
            reset(graph)
            popTip('双击任意节点，当前视口聚焦至该节点')
            // 监听双击事件
            graph.on('dblclick', e => {
                const object = e.object
                if (isLink(object)) return
                // 聚焦至节点
                zoomToObject(graph, object)
            })
        })

        new THING.widget.Button('开启鼠标滑过事件', function () {
            reset(graph)
            popTip('鼠标移入节点时，节点闪烁')
            const nodes = graph.nodes
            // 监听鼠标移入/移出，进行节点闪烁/停止闪烁
            nodes.forEach(node => {
                node.on('mouseenter', e => {
                    node.flicker()
                })
                node.on('mouseleave', e => {
                    node.stopFlicker()
                })
            })
        })

        new THING.widget.Button('重置', function () {
            reset(graph)
            popTip('点击左侧按钮，开启鼠标左键单击、鼠标左键双击和鼠标滑过事件')
        })
    })
})

/**
 * 恢复初始化
 */
function reset(graph) {
    $('.alert').css('display', 'none')
    $('#rect').remove()
    graph.nodes.forEach(item => {
        item.stopFlicker()
        item.off('mouseenter')
        item.off('mouseleave')
    })
    const nodes = graph.query('开关')
    nodes[0].flip = 'none'
    const pipe = graph.query(`[userData/开关=${nodes[0].id}]`)[0]
    pipe.flow({ color: '#f57373', width: 8 })
    nodes.off('click')
    graph.off('dblclick')
    graph.resetZoom()
}

/**
 * 缩放到某个节点
 */
function zoomToObject(graph, object) {
    // 聚焦到节点区域时保留一定边距
    const padding = 200
    const rect = {
        x: object.position[0] - padding,
        y: object.position[1] - padding,
        width: object.width + padding * 2,
        height: object.height + padding * 2
    }
    // 执行缩放
    graph.zoomToRect(rect.x, rect.y, rect.width, rect.height)
}

/**
 * 聚焦节点
 */
function focusOnObject(graph, object, callback) {
    // 聚焦到节点区域时保留一定边距
    const padding = 40
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
            `<div id="rect" style="opacity: 0;position: absolute;left: ${left}px;top: ${top}px;width: ${width}px;height: ${height}px;background: transparent;border: 2px solid red;z-index: 999;border-radius: 0px;display: block; pointer-events: none;"></div>`
        $('#div2d').append($(divTemplate))
    }
}

/**
 * 判断对象是否是连线
 */
function isLink(object) {
    return object && object.type === 'link'
}

/**
 * 显示提示
 */
function popTip(text) {
    initThingJsTip(text)
    $(".alert").css({ display: 'block', background: 'buttonFace', border: '1px solid buttonFace' })
}
