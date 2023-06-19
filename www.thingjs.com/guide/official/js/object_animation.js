/**
 * @version 2.0
 * @author ThingJS
 */
// 创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();
app.camera.position = [15, 12, 15];

// 创建带动画的物体
const obj = new THING.Entity({
        url: 'https://model.3dmomoda.com/models/4212ba61a02c4dac8286f3fbe71cfa6e/0/gltf/',
        complete: function () {
                // 播放动画
                let animName = obj.animations[0].name;
                obj.playAnimation({
                        name: animName,
                        loopType: THING.LoopType.Repeat
                });
        }
});