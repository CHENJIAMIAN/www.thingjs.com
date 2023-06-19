/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

// 创建盒子
const box = new THING.Box(3, 3, 3);

// 创建标记并设置一些参数信息
const marker = new THING.Marker({
	name: 'Marker01',
	localPosition: [0, box.boundingBox.size[1] / 2, 0],
	parent: box,
	style: { image: new THING.ImageTexture('/guide/official/images/alarm_build.png') },
	pivot: [0.5, 0]
})

// 设置标记缩放动画
marker.scaleTo([2, 2, 2], {
	time: 2 * 1000,
	loopType: THING.LoopType.PingPong,
});
