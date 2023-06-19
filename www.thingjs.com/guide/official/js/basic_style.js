/**
 * @version 2.0
 * @author ThingJS
 */

// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

// 创建一个盒子
const box = new THING.Box(5, 5, 5);

// 设置盒子的样式
box.style = {
	color: '#FEF5AC',
	outlineColor: '#25316D'
};
