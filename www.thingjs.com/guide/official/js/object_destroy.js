/**
 * @version 2.0
 * @author ThingJS
 */

// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

let box = null;

// 创建按钮
new THING.widget.Button('createBox', function () {
    if (box == null) {
        box = new THING.Box(3, 3, 3);
    }
});

// 创建按钮
new THING.widget.Button('destroyBox', function () {
    // 销毁box
    if (box != null) {
        box.destroy();
        box = null;
    }
});