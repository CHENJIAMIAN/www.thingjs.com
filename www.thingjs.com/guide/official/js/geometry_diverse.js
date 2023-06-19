/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

//设置摄像机位置
app.camera.position = [0, 10, 40];

// 创建多种几何体
const box = new THING.Box(2, 2, 2, { position: [-12, 0, 0], style: { color: [1, 0, 0] }});

const cylinder = new THING.EXTEND.Cylinder({ position: [-8, 0, 0], style: { color: [1, 0.64, 0] }});

const torus = new THING.EXTEND.Torus({ position: [-4, 0, 0], style: { color: [1, 1, 0] }});

const cone = new THING.EXTEND.Cylinder({ radiusTop: 0, position: [0, 0, 0], style: { color: [1, 0.64, 0] }});

const circle = new THING.EXTEND.Circle({  position: [4, 0, 0], style: { color: [0, 0, 1] }});

const capsule = new THING.EXTEND.Capsule({  position: [8, 0, 0], style: { color: [0, 1, 1] }});

const sphere = new THING.Sphere(0.5, { position: [12, 0, 0], style: { color: [1, 0, 1] }});
