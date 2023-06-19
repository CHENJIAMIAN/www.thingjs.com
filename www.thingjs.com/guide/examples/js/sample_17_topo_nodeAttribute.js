/**
 * 说明：创建2d图表-修改节点属性示例
 *      1. 支持节点翻转，如案例所示垂直翻转蒸汽发生机图片
 *      2. 支持修改图片，如案例所示修改图片体现蒸汽包的告警状态
 *      3. 支持修改文字样式，如案例所示把所有的关键指标突出展示
 *      4. 支持GIF图片的播放和暂停，如一次燃烧炉中火焰的播放和暂停
 * 操作：点击按钮预览对应效果
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
        popTip('点击左侧按钮，可查看节点翻转、修改图片、修改文本样式、GIF播放与暂停的效果')
        new THING.widget.Button('节点翻转', function() {
            $(".alert").css('display', 'none')
            const node = graph.query('蒸汽发生机')[0]
            focusOnObject(graph, node, flipNode.bind(null, node, 'vertical'))
        })
        
        new THING.widget.Button('修改图片', function() {
            $(".alert").css('display', 'none')
            const node = graph.query('蒸汽发生机')[0]
            const imageUrl = 'https://topo.thingjs.com/rsm/20230508/cw4l9nlpn8z4kk3v-20230508.png'
            focusOnObject(graph, node, setImage.bind(null, node, imageUrl))
        })

        new THING.widget.Button('修改文本样式', function() {
            popTip('高亮显示所有表示数值的文本')
            const node = graph.query('蒸汽包-数值')[0]
            const nodes = graph.query('number')
            focusOnObject(graph, node, setFontStyle.bind(null, nodes, true))
        })
        
        new THING.widget.Button('GIF 暂停', function() {
            $(".alert").css('display', 'none')
            const node = graph.query('#fire-2')[0]
            focusOnObject(graph, node, pauseGif.bind(null, node))
        })

        new THING.widget.Button('GIF 播放', function() {
            $(".alert").css('display', 'none')
            const node = graph.query('#fire-2')[0]
            focusOnObject(graph, node, playGif.bind(null, node))
        })
        
        new THING.widget.Button('重置', function() {
            reset(graph)
            popTip('点击左侧按钮，可查看节点翻转、修改图片、修改文本样式、GIF播放与暂停的效果')
        })
    })
})

/**
 * 设置图片翻转
 */
function flipNode(node, flip) {
    node.flip = flip
}

/**
 * 修改图片
 */
function setImage(node, url) {
    node.image = url
}

/**
 * GIF 暂停
 */
function pauseGif(node) {
    node.pause()
}

/**
 * GIF 播放
 */
function playGif(node) {
    node.play()
}

/**
 * 设置文字样式
 */
function setFontStyle(nodes, highlight) {
    const highlightStyle = {
        fontColor: 'orange',
        fontStyle: 'italic',
        isUnderline: true
    }
    const defaultStyle = {
        fontColor: '#333',
        fontStyle: 'normal',
        isUnderline: false
    }
    const style = highlight ? highlightStyle : defaultStyle
    nodes.forEach(item => {
        item.style = style
    })
}

/**
 * 恢复初始化
 */
function reset(graph) {
    $('.alert').css('display', 'none')
    $('#rect').remove()
    const node1 = graph.query('蒸汽发生机')[0]
    flipNode(node1, 'none')
    const imageUrl = 'https://topo.thingjs.com/rsm/1664332404067/%E8%92%B8%E6%B1%BD%E5%8F%91%E7%94%9F%E6%9C%BA.svg'
    setImage(node1, imageUrl)
    const node2 = graph.query('#fire-2')[0]
    playGif(node2)
    const nodes = graph.query('number')
    setFontStyle(nodes)
    graph.resetZoom()
}

/**
 * 聚焦节点
 */
function focusOnObject(graph, object, callback) {
    // 聚焦到节点区域时保留一定边距
    const padding = 60
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
    initThingJsTip(text)
    $(".alert").css({ display: 'block', background: 'buttonFace', border: '1px solid buttonFace' })
}
