/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
var app = new THING.App();

var textLabelPlane = new THING.Label({          // 文字标签
	fontText: '文字标签 ',
	fontColor: [0, 0.5, 0.7],
	position: [0, 15, 0],
});
textLabelPlane.renderType = THING.RenderType.Plane	// 以面形式渲染

var textLabelSprite = new THING.Label({         // 文字标签默认以精灵模式渲染
	fontText: '文字标签 ',
	fontSize: 25
});

var richTextLabel = new THING.Label({           // 填充的文字标签
	fontText: `
    <p>文字1
        <span style="color: #E36C09;">文字2</span>
        <span style="font-size: 20px;">文字3
        <span style="font-size: 30px; color: #974806;">文字4</span>
        </span>
    </p>`,
	fontColor: THING.Math.randomFromArray(['red', 'green', 'orange']),
	richText: true,
	position: [0, -15, 0]
});

app.camera.position = [30, 30, 30];