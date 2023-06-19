/**
 * @version 2.0
 * @author ThingJS
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

const positionArray = [[-3, 0, 0], [3, 0, 0]];										// 初始化位置坐标数组

for (let i = 0; i < 2; i++) {
	const box = new THING.Box({ position: positionArray[i] });

	box.angles = THING.Math.randomVector([-100, -100, -100], [100, 100, 100]);      // 设置box的角度

	box.scaleTo(THING.Math.randomVector([0.1, 0.1, 0.1], [5, 5, 5]), {              // 设置box缩放动画
		time: 5000,                                                                 // 设置一次动画完成时间
		loopType: THING.LoopType.PingPong,                                          // 设置动画播放类型
	});

	box.rotateTo([360, 360, 360], {                                                 // 设置box旋转动画
		time: 5000,                                                                 // 设置一次动画完成时间
		loopType: THING.LoopType.Repeat,                                            // 设置动画播放类型
	});

	if (i == 0) {
		const boundingBox = box.boundingBox;          // AABB包围盒

		const aabbBox = new THING.Box({
			position: boundingBox.center,
			style: { color: '#006666', opacity: 0.5 } 							// 设置包围盒的样式
		})

		aabbBox.on('update', () => {
			aabbBox.scale = [box.boundingBox.size[0], box.boundingBox.size[1], box.boundingBox.size[2]]
		})
	}
	else {
		const orientedBox = box.orientedBox;          // OBB包围盒

		box.add(new THING.Box(orientedBox.size[0], orientedBox.size[1], orientedBox.size[2], {
			scale: [box.scale[0] + 0.1, box.scale[1] + 0.1, box.scale[2] + 0.1],	// 设置包围盒大小使其在例子中能看出更好的效果
			angles: [orientedBox.angles[0], orientedBox.angles[1], orientedBox.angles[2]],
			position: orientedBox.center,
			style: { color: '#666600', opacity: 0.5 } 							// 设置包围盒的样式
		}));

	}
}