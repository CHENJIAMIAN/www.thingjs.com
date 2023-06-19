/**
 * @version 2.0
 * @version earth
 * @author ThingJS
 */

const app = new THING.App();

let i = 0;
for (var y = -2; y < 3; y++) {
	for (var x = -2; x < 3; x++) {
		const color = THING.Math.randomFromArray([
			'red', 'green', 'orange', 'yellow', 'blue'
		]);

		const box = new THING.Box({
			name: i++,
			position: [x * 2.5, 0, y * 2.5],
			style: { color: color }
		});

		//为box添加一个标签
		let label = new THING.Label({
			parent: box,
			localPosition: [0, box.boundingBox.size[1], 0],
			fontText: 'Box' + '_' + i,
			fontSize: 26,
			fontColor: color,
			scaleFactor: 0.01
		});
	}
}