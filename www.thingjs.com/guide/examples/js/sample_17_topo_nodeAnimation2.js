/**
 * 说明：创建2d图表-节点动画示例二
 *      1. 支持节点旋转，并且支持设置旋转速度，如案例中可以设置回流泵的转速
 *      2. 支持节点移动，如案例中的小车移动
 *      3. 支持节点进度填充，如案例中液位填充
 *      4. 支持水位节点的水位变化，如案例中可以设置清水箱的水位
 * 操作：点击按钮，调整旋转/水位，查看效果
 * 难度：★☆☆☆☆
 */

// 引用拓扑组件脚本
THING.Utils.dynamicLoad(['https://topo.thingjs.com/topo-static/js/thing.diagram.min.js'], function () {
    // 初始化拓扑场景
    const graph = new THING.DIAGRAM.Graph({
        container: 'div2d', // 容器元素 id
        url: '/diagrams/3a7587c0688b3fce?page=c1kx95ke' // 拓扑场景资源路径
    })
    // 视图加载完成
    graph.on('load', () => {
        popTip('点击左侧按钮，可查看节点旋转、节点移动、节点填充和水位变化的效果')
        new THING.widget.Button('旋转', function () {
            popTip('设置转速，使回流泵以目标速度旋转')
            // 初始以转速2旋转
            const initialSpeed = 2
            onSpeedChange(initialSpeed, graph)
            // 创建转速滑块
            const slider = createSpeedSlider()
            // 监听转速变化
            slider.on('change', value => {
                onSpeedChange(value, graph)
            })
            // 聚焦到风扇
            const node = graph.query('风扇组')[0]
            focusOnObject(graph, node, { padding: '100' })
        })

        new THING.widget.Button('移动', function () {
            popTip('小车移动')
            const node = graph.query('小车')[0]
            // 聚焦到小车
            focusOnObject(graph, node, {
                padding: '30 30 20 260',
                callback: () => {
                    // 小车移动时使管道线消失
                    const pipe = graph.query('小车管道')[0]
                    pipe.hide()
                    // 移动小车
                    moveObject(node)
                }
            })
        })

        new THING.widget.Button('水位变化', function () {
            // 提示语
            popTip('设置水位，使清水箱的水位变至目标值，液位值节点填充至目标值')
            const water = graph.query('清水箱')[0]
            const bar = graph.query('#液位-8')[0]
            // 创建水位滑块
            const slider = createWaterSlider()
            // 监听水位变化
            slider.on('change', value => {
                if (water.isAnimating) return
                // 水位动画
                animateWater(water, value)
                // 更新液位节点文本
                bar.label = value.toString()
                // 液位节点进度填充
                setProgress(bar, value)
            })
            focusOnObject(graph, water,  { padding: '270 50 30 50' })
        })

        new THING.widget.Button('重置', function () {
            reset(graph)
            popTip('点击左侧按钮，可查看节点旋转、节点移动、节点填充和水位变化的效果')
        })
    })
})

// 创建转速数字滑块
function createSpeedSlider() {
    const panel = createSliderPanel({
        titleText: '设置转速',
        width: '180px',
        position: [140, 5]
    })
    // NumberSlider类型数据绑定
    const slider = panel.addNumberSlider({ speed: 2 }, 'speed')
        .step(1)
        .min(1)
        .max(4)
        .caption('转速')
        .isChangeValue(true)
        .show(true)
    return slider
}

// 创建水位数字滑块
function createWaterSlider() {
    const panel = createSliderPanel({
        titleText: '设置水位',
        position: [140, 97]
    })
    // NumberSlider类型数据绑定
    const slider = panel.addNumberSlider({ waterVolume: 65 }, 'waterVolume')
        .step(1)
        .min(0)
        .max(100)
        .caption('水位')
        .isChangeValue(true)
        .show(true)
    return slider
}

// 创建面板
function createSliderPanel(option) {
    const panel = new THING.widget.Panel({
        width: '200px',
        hasTitle: true,
        visible: true,
        dragable: true,
        ...option
    })
    return panel
};

// 设置转速后进行旋转
function onSpeedChange(speed, graph) {
    // 修改转速文字
    const speedText = graph.query('转速')[0]
    speedText.label = speed
    // 使风扇旋转
    const fans = graph.query('风扇')
    fans.forEach(item => {
        // 停止上一个动画
        item.stopAnimate()
        if (speed === 0) return
        // 执行旋转动画
        rotateLoop(item, speed)
    })

    // 旋转动画
    function rotateLoop(node, speed) {
        const targetAngle = node.angle + 360 // 旋转360度
        const option = {
            duration: getRotateDuration(speed),
            easing: 'EaseLinear', // 匀速旋转
            runCount: Infinity, // 无限循环
            cosmetic: true // 结束时恢复原始角度
        }
        node.animate({ angle: targetAngle }, option)
    }
    // 根据转速获取旋转动画时长
    function getRotateDuration(speed) {
        const speedConfig = {
            1: 1000,
            2: 800,
            3: 500,
            4: 300
        }
        return speedConfig[speed]
    }
}

// 移动对象
function moveObject(node) {
    node.initialPosition = [node.position[0], node.position[1]]
    const x = node.position[0] - 250
    const y = node.position[1]
    const position = [x, y]
    // 移动
    node.moveTo(position, {
        duration: 1500,
        easing: 'EaseInOutQuad' // 缓冲运动
    })
}

// 执行水位变化动画
function animateWater(node, value) {
    node.animate({ waterVolume: value }, {
        duration: 1000,
        easing: 'EaseLinear' // 匀速变化
    })
}

// 执行进度填充动画
function setProgress(node, value) {
    node.progress({
        progressValue: value, // 目标进度值
        progressColor: '#8dd9ff', // 进度填充颜色
        progressDirection: 'right', // 从左至右进行填充
        duration: 1000,
        easing: 'EaseLinear' // 匀速变化
    })
}

function reset(graph) {
    $(".alert").css('display', 'none');
    $(".panel").remove()
    $('#rect').remove()
    // 初始化风扇旋转
    const initialSpeed = 0
    onSpeedChange(0, graph)
    const node1 = graph.query('小车')[0]
    node1.stopMoving()
    if (node1.initialPosition) {
        node1.position = node1.initialPosition
    }
    const node2 = graph.query('清水箱')[0]
    node2.waterVolume = 65
    const node3 = graph.query('#液位-8')[0]
    node3.label = '65'
    node3.progress({
        progressValue: 0,
        progressDirection: 'right',
        duration: 10
    })
    const pipe = graph.query('小车管道')[0]
    pipe.visible = true
    graph.resetZoom()
}

/**
 * 聚焦节点
 */
function focusOnObject(graph, object, options = {}) {
    const { padding = '50', callback } = options
    const paddingArray = padding.split(' ')
    const paddingTop = Number(paddingArray[0])
    const paddingRight = isNaN(paddingArray[1]) ? paddingTop : Number(paddingArray[1])
    const paddingBottom = isNaN(paddingArray[2]) ? paddingTop : Number(paddingArray[2])
    const paddingLeft = isNaN(paddingArray[3]) ? paddingRight : Number(paddingArray[3])
    // 聚焦到节点区域时保留一定边距
    const rect = {
        x: object.position[0] - paddingLeft,
        y: object.position[1] - paddingTop,
        width: object.width + paddingLeft + paddingRight,
        height: object.height + paddingTop + paddingBottom
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

function popTip(text) {
    initThingJsTip(text)
    $(".alert").css({ display: 'block', background: 'buttonFace', border: '1px solid buttonFace' })
}
