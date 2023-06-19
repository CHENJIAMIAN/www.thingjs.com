/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素

const app = new THING.App();

app.camera.position = [10,20,30];

// 创建像素线
const Pixelline = new THING.PixelLine({
	name: 'Pixelline',
	selfPoints: [[-3, -3, 0], [-7, -3, 0], [-7, 3, 0], [-3, 3, 0]],
	style: { color: [1, 0.6, 0] }
});

// 创建路线
const Routeline = new THING.RouteLine({
	name: 'Routeline',
	selfPoints: [[0, -2, 0], [3, 0, 0], [0, 5, 0], [3, 5, 0]],
	style: { color: [0, 0.7, 1], sideType: THING.SideType.Double }
});

// 创建多边形线
const Polygonline = new THING.PolygonLine({
	name: 'Polygonline',
	selfPoints: [[9, -4, 0], [6, 0, 0], [7, 4, 0]],
	style: { color: [0.5, 0.64, 0.5], sideType: THING.SideType.Double }
});