/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

const obj = new THING.Entity({
	url: 'https://model.3dmomoda.com/models/fea1e799ff4c4ec595fde2f76df12e15/0/gltf',
	//完成时的回调
	complete : function(ev){
		const nodeNames = obj.body.nodeNames;               	// 子节点名

		nodeNames.forEach(name => {
			const subObject = obj.promoteNode(name);           	// 提升自身渲染节点为物体级别
		
			subObject.on('mouseenter', function (ev) {			// 添加一些事件监听
				ev.object.style.outlineColor = [0, 0.6, 0.4];
			});
			subObject.on('mouseleave', function (ev) {
				ev.object.style.outlineColor = null;
			});
			subObject.on('click', function (ev) {
				console.log(ev.object.name);
			});
		});
	}
});
