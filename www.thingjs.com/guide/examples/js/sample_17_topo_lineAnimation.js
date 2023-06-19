/**
 * 说明：创建2d图表-连线动画示例
 *      1. 支持给连线添加流动动画
 *      2. 支持给连线添加飞线动画
 *      3. 支持给连线添加圆点动画
 * 操作：点击按钮查看对应效果
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
        popTip('点击左侧按钮，可查看视图中连线的流动动画、飞线动画和圆点动画的效果')
        new THING.widget.Button('流动动画', function () {
            popTip('连线动画切换为流动动画')
            graph.links.forEach(linkFlow)
        })

        new THING.widget.Button('飞线动画', function () {
            popTip('连线动画切换为飞线动画')
            graph.links.forEach(linkFly)
        })

        new THING.widget.Button('圆点动画', function () {
            popTip('连线动画切换为圆点动画')
            graph.links.forEach(linkDotRunning)
        })


        new THING.widget.Button('重置', function () {
            reset(graph)
            popTip('点击左侧按钮，可查看视图中连线的流动动画、飞线动画和圆点动画的效果')
        })
    })
})

/**
 * 执行流动动画
 */
function linkFlow(link) {
    link.flow({
        color: 'orange', // 流动颜色
        width: 5, // 流动粗细
        direction: 'forward', // 正向流动
        duration: 600
    })
}

/**
 * 执行飞线动画
 */
function linkFly(link) {
    // 以连线本身的颜色作为飞线起始端和结束端的颜色
    link.fly({
        gradient: {
            0: '#154D98',
            0.5: '#04EBFE',
            1: '#154D98'
        }, // 飞线渐变色
        direction: 'forward', // 正向运动
        duration: 1000
    })
}

/**
 * 执行圆点动画
 */
function linkDotRunning(link) {
    link.dotRunning({
        color: 'orange', // 圆点颜色
        size: 10, // 圆点大小
        direction: 'forward', // 正向运动
        duration: 2000
    })
}

/**
 * 恢复初始化
 */
function reset(graph) {
    graph.links.forEach(item => {
        item.stopFlow()
        item.stopFly()
        item.stopDotRunning()
    })
}

/**
 * 显示提示
 */
function popTip(text) {
    initThingJsTip(text)
    $(".alert").css({ display: 'block', background: 'buttonFace', border: '1px solid buttonFace' })
}
