/**
 * 说明：创建2d图表-修改连线属性示例
 *      1. 支持修改线的样式
 *      2. 支持修改线上label的文本样式
 *      3. 支持控制线的显隐状态
 * 操作：点击按钮，查看对应修改线属性的效果
 * 难度：★☆☆☆☆
 */

// 引用拓扑组件脚本
THING.Utils.dynamicLoad(['https://topo.thingjs.com/topo-static/js/thing.diagram.min.js'], function () {
    // 初始化拓扑场景
    const graph = new THING.DIAGRAM.Graph({
        container: 'div2d', // 容器元素 id
        url: '/diagrams/37c1dcf438a352a2' // 拓扑场景资源路径
    })
    // 视图加载完成
    graph.on('load', () => {
        popTip('点击左侧按钮，可查看视图中的连线样式和连线上文本样式的变化')
        new THING.widget.Button('修改线的样式', function () {
            popTip('连线样式变为蓝色加粗')
            setTimeout(() => {
                // 修改所有连线的样式
                setLinkStyle(graph.links, true)
            }, 300)
        })

        new THING.widget.Button('修改文本样式', function () {
            popTip('连线文本变为红色斜体')
            setTimeout(() => {
                // 修改所有连线的文本样式
                setFontStyle(graph.links, true)
            }, 300)
        })

        new THING.widget.Button('隐藏', function () {
            popTip('连线隐藏')
            // 获取连线
            const link = graph.query('#link1')[0]
            focusOnLink(graph, link, () => {
                link.visible = false
            })
        })

        new THING.widget.Button('重置', function () {
            reset(graph)
            popTip('点击左侧按钮，可查看视图中的连线样式和连线上文本样式的变化')
        })
    })
})

/**
 * 修改连线样式
 */
function setLinkStyle(links, highlight) {
    const highlightStyle = {
        stroke: 'blue', // 连线颜色
        strokeWidth: 5, // 连线粗细
        opacity: 0.7 // 透明度
    }
    const defaultStyle = {
        stroke: '#000',
        strokeWidth: 2,
        opacity: 1
    }
    const style = highlight ? highlightStyle : defaultStyle
    links.forEach(item => {
        item.style = style
    })
}

/**
 * 修改连线的文本样式
 */
function setFontStyle(links, highlight) {
    const highlightStyle = {
        fontColor: 'red', // 文本颜色
        fontStyle: 'italic', // 文本斜体
        fontWeight: 'bold', // 文本粗体
        isUnderline: true // 文本下划线
    }
    const defaultStyle = {
        fontColor: '#000',
        fontStyle: 'normal',
        fontWeight: 'normal',
        isUnderline: false
    }
    const style = highlight ? highlightStyle : defaultStyle
    links.forEach(item => {
        item.style = style
    })
}

/**
 * 恢复初始化
 */
function reset(graph) {
    $(".alert").css('display', 'none')
    $('#rect').remove()
    setLinkStyle(graph.links)
    setFontStyle(graph.links)
    graph.links.forEach(item => {
        item.visible = true
    })
    graph.resetZoom()
}

/**
 * 聚焦连线
 */
function focusOnLink(graph, link, callback) {
    const source = link.getSource()
    const target = link.getTarget()
    const nodes = [source, target]
    const x1Arr = nodes.map(item => item.position[0])
    const y1Arr = nodes.map(item => item.position[1])
    const x2Arr = nodes.map(item => item.position[0] + item.width)
    const y2Arr = nodes.map(item => item.position[1] + item.height)
    const x1 = Math.min(...x1Arr)
    const y1 = Math.min(...y1Arr)
    const x2 = Math.max(...x2Arr)
    const y2 = Math.max(...y2Arr)

    const rect = {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1
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


        