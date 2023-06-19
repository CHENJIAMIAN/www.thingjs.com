/**
 * 说明：
 *      1. 通过全局查询获取，根据 id 、name 、属性查询
 *      2. 通过对象的连接关系获取连线
 *      3. 通过线的连接关系获取节点
 * 操作：
 *      1. 点击按钮，弹出搜索框，可通过搜索框来查询到有 id、name、属性物体
 *      2. 点击按钮查询对象关联的连线
 *      3. 点击按钮查询连线的起始节点和目标节点
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
        popTip('弹出搜索框时，可通过搜索框来查询有id、name、属性的物体；通过节点获取与节点连接的关系线及与连线连接的节点。')

        new THING.widget.Button('按 id 查询', function () {
            reset(graph)
            graph.resetZoom()
            createSearch('输入id')
            // 高亮所有表示id的节点
            const idNodes = graph.query('[userData/type=id]')
            highlightText(idNodes)
            $('#searchBtn').on('click', function () {
                const id = $("input[id='searchText']").val()
                const object = graph.query('#' + id)[0]
                if (object) {
                    object.flicker({ color: '#3391F1' })
                } else {
                    $("input[id='searchText']").val('')
                }
            })
        })

        new THING.widget.Button('按名称查询', function () {
            reset(graph)
            graph.resetZoom()
            createSearch('输入名称')
            // 高亮所有表示name的节点
            const nameNodes = graph.query('[userData/type=name]')
            highlightText(nameNodes)
            $('#searchBtn').on('click', function () {
                const name = $("input[id='searchText']").val()
                const object = graph.query(name)[0]
                if (object) {
                    object.flicker({ color: '#3391F1' })
                } else {
                    $("input[id='searchText']").val('')
                }
            })
        })

        new THING.widget.Button('按属性查询', function () {
            reset(graph)
            graph.resetZoom()
            popTip('搜索属性字段 userData 中蒸汽温度为 266 的对象闪烁')
            const objects = graph.query('[userData/蒸汽温度=266]')
            objects.forEach(item => {
                item.flicker({ color: '#3391F1' })
            })
        })

        new THING.widget.Button('step5 的所有连线', function () {
            reset(graph)
            graph.resetZoom()
            const step5 = graph.query('#step5')[0]
            if (step5) {
                const allLinks = step5.getLinks()
                allLinks.forEach(item => {
                    item.flicker({ color: '#3391F1' })
                })
            }
        })

        new THING.widget.Button('step5 的所有入线', function () {
            reset(graph)
            graph.resetZoom()
            const step5 = graph.query('#step5')[0]
            if (step5) {
                const links = step5.getInLinks()
                links.forEach(item => {
                    item.flicker({ color: 'red' })
                })
            }
        })

        new THING.widget.Button('step5 的所有出线', function () {
            reset(graph)
            graph.resetZoom()
            const step5 = graph.query('#step5')[0]
            if (step5) {
                const links = step5.getOutLinks()
                links.forEach(item => {
                    item.flicker({ color: '#3391F1' })
                })
            }
        })

        new THING.widget.Button('获取连线起始节点', function () {
            reset(graph)
            popTip('获取蒸汽包到蒸汽涡轮机的管线的起始节点-蒸汽包')
            const link = graph.query('#link1')[0]
            // 获取连线起始节点
            const sourceNode = link.getSource()
            // 使起始节点闪烁
            sourceNode.flicker()
        })

        new THING.widget.Button('获取连线目标节点', function () {
            reset(graph)
            popTip('获取蒸汽包到蒸汽涡轮机的管线的目标节点-蒸汽涡轮机')
            const link = graph.query('#link1')[0]
            // 聚焦至连线
            // 获取连线目标节点
            const targetNode = link.getTarget()
            // 使目标节点闪烁
            targetNode.flicker()
        })

        new THING.widget.Button('重置', function () {
            reset(graph)
            graph.resetZoom()
            popTip('弹出搜索框时，可通过搜索框来查询有id、name、属性的物体；通过节点获取与节点连接的关系线及与连线连接的节点。')
        })
    })

    function clearAnimation() {
        const objects = graph.nodes.concat(graph.links)
        objects.forEach(item => {
            item.stopFlicker()
        })
    }
})

/**
 * 搜索框html
 */
function createSearch(placeholder) {
    if ($(".search").length) return
    let searchTemplate =
        `<div class="search" style="position: absolute;padding-left: 10px;top: 60px;left: 50%;transform: translateX(-50%);font-size: 13px;height: auto;background: rgb(255, 255, 255);border: 1px solid buttonFace;box-sizing: border-box;z-index: 999;border-radius: 4px;display:block;z-index: 999;">
            <img src="/guide/examples/images/navigation/search.png"/ style="position: relative;width: 14px;height: 14px;top: 3px;box-sizing: border-box;">
            <input id="searchText" type="text" class="searchText" placeholder=${placeholder} autocomplete="off" style="width: 140px;height: 32px;outline: none;border: none;margin: 0px 0px 0px 14px;font-size: 13px;appearance: none;">
            <button id="searchBtn" type="button" class="btn btn-default" style="display: inline-block;padding: 6px 12px;margin-bottom: 0px;color: #333;font-size: 14px;font-weight: 400;line-height: 1.42857;text-align: center;white-space: nowrap;vertical-align: middle;touch-action: manipulation;cursor: pointer;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 0 4px 4px 0;outline: none;border-color: transparent;box-shadow:none;">
                搜索
            </button>
        </div>`
    $('#div2d').append($(searchTemplate))
}

/**
 * 高亮节点文本
 */
function highlightText(nodes) {
    nodes.forEach(item => {
        item.originFontColor = item.style.fontColor
        item.style.fontColor = 'red'
    })
}

/**
 * 清除闪烁动画
 */
function clearAnimation(graph) {
    const objects = graph.nodes.concat(graph.links)
    objects.forEach(item => {
        item.stopFlicker()
    })
}

/**
 * 恢复初始化
 */
function reset(graph) {
    $(".search").remove()
    $(".alert").css('display', 'none')
    clearAnimation(graph)
    graph.nodes.forEach(item => {
        if (item.originFontColor) {
            item.style.fontColor = item.originFontColor
        }
    })
}

/**
 * 显示提示
 */
function popTip(text) {
    initThingJsTip(text)
    $(".alert").css({ display: 'block', border: '1px solid buttonFace' });
}