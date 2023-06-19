/**
 * 说明：创建2d图表-画布操作示例
 *      1. 支持设置画布缩放
 *      2. 支持切换sheet页
 * 操作：点击按钮查看对应效果
 * 难度：★☆☆☆☆
 */

// 引用拓扑组件脚本
THING.Utils.dynamicLoad(['https://topo.thingjs.com/topo-static/js/thing.diagram.min.js'], function () {
    // 初始化拓扑场景
    const graph = new THING.DIAGRAM.Graph({
        container: 'div2d', // 容器元素 id
        url: '/diagrams/940145ae6454f266' // 拓扑场景资源路径
    })
    // 视图加载完成
    graph.on('load', () => {
        popTip('点击左侧按钮，可查看画布缩放和页面切换的效果')

        new THING.widget.Button('画布缩放', function () {
            if (!this.status) {
                popTip('画布缩放至原始大小1.5倍')
                // 画布缩放至原始大小0.5倍
                graph.zoomTo(1.5)
            } else {
                popTip('重置画布缩放')
                // 重置缩放
                graph.resetZoom()
            }
            this.status = !this.status
        })

        new THING.widget.Button('切换页面', function () {
            graph.resetZoom()
            $('.widget-button').not(this).prop('status', false)
            if (!this.status) {
                graph.resetZoom()
                popTip('画布切换至污水处理系统')
                const pageId = 'gpihgn34'
                graph.switchPage(pageId)
            } else {
                graph.resetZoom()
                popTip('画布切换至垃圾焚烧发电系统')
                const pageId = '3iamkhwq'
                graph.switchPage(pageId)
            }
            this.status = !this.status
        })

        new THING.widget.Button('重置', function () {
            reset(graph)
            popTip('点击左侧按钮，可查看画布缩放和页面切换的效果')
        })

        $('.widget-button').prop('status', false)
    })
})

function reset(graph) {
    $(".alert").css({ display: 'none'})
    $('.widget-button').prop('status', false)
    // 重置缩放
    graph.resetZoom()
    // 切换回初始页面
    const firstPageId = '3iamkhwq'
    graph.switchPage(firstPageId)
}

/**
 * 显示提示
 */
function popTip(text) {
    initThingJsTip(text)
    $(".alert").css({ display: 'block', background: 'buttonFace', border: '1px solid buttonFace' })
}