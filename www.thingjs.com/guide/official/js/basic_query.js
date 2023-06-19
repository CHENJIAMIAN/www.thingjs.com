/**
 * @version 2.0
 * @author ThingJS
 */

// 创建app，默认绑定到 'div3d' DIV 元素

var app = new THING.App();

// 创建一些盒子
let i = 0;
for (var x = -2; x < 2; x++) {
	const box = new THING.Box({
		name: i++,
		position: [x * 2.5, 0, 0],
	});
	box.index = i;
}

// 根据name查询
app.query('1')[0].style.color = 'red'

// 根据属性查询范围内的物体
app.query('[index>2]').style.color = 'skyblue'