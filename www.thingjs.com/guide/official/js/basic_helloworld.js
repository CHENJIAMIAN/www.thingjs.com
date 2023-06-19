/**
 * @version 2.0
 * @author ThingJS
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 创建一个box
const box = new THING.Box(5, 5, 5);

// 创建一个球体
const sphere = new THING.Sphere(1, { position: [-10, 0, 0] });