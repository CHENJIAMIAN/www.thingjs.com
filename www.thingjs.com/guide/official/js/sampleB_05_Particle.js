/**
 * @version 2.0
 * @author ThingJS
 * 说明：创建粒子
 * 操作：点击按钮 创建对应粒子
 * 备注：平台默认提供四种粒子效果，通过官方提供的粒子编辑器进行制作
 * 难度：★★☆☆☆
*/

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
var particleFire = null;
var particleRain = null;
var particleSnow = null;
var particleWater = null;

bundle.waitForComplete().then(() => {
    new THING.widget.Button('创建火焰粒子', createFire);
    new THING.widget.Button('创建飘雪粒子', createSnow);
    new THING.widget.Button('创建喷水粒子', createWater);
    new THING.widget.Button('创建降雨粒子', createByParticle);
    new THING.widget.Button('重置', resetAll);
    app.lighting = {
        mainLight: {
            intensity: 0
        }
    };
    initThingJsTip("平台默认提供四种粒子效果，通过官方提供的粒子编辑器进行制作，可点击按钮进行效果查看");
})


/**
 * 通过创建粒子实现火焰效果
 */
function createFire() {
    if (!particleFire) {
        resetAll()
        // 创建粒子
        particleFire = new THING.ParticleSystem({
            id: 'fire01',
            type: 'ParticleSystem',
            name: 'Fire',
            parent: app.query('car01')[0],
            url: 'https://model.3dmomoda.com/models/19061018snbajhvuzrheq9sbgwdoefuk/0/particles',
            localPosition: [0, 0, 0], // 设置粒子相对于父物体的位置
            complete: function () {
            }
        });
    } else {
        resetAll();
        var part = app.query('#fire01')[0];
        if (part) {
            // 存在，将已创建的粒子隐藏
            part.visible = true;
        }
    }
}

/**
 * 通过创建粒子实现飘雪效果
 */
function createSnow() {
    if (!particleSnow) {
        resetAll()
        // 创建降雪效果
        particleSnow = new THING.ParticleSystem({
            type: 'ParticleSystem',
            id: 'No1234567',
            name: 'Snow',
            url: 'https://model.3dmomoda.com/models/18112014q3t8aunaabahzxbxcochavap/0/particles',
            position: [0, 50, 0]
        });
    } else {
        resetAll();
        var part = app.query('#No1234567')[0];
        if (part) {
            // 存在，将已创建的粒子隐藏
            part.visible = true;
        }
    }
}

/**
 * 通过创建粒子实现喷水效果
 */
function createWater() {
    if (!particleWater) {
        resetAll()
        // 创建喷水效果
        particleWater = new THING.ParticleSystem({
            id: 'water01',
            type: 'ParticleSystem',
            name: 'Water',
            url: 'https://model.3dmomoda.com/models/19081611ewlkh7xqy71uzixefob8uq1x/0/particles',
            position: [0, 0, 5]
        });
    } else {
        resetAll();
        var part = app.query('#water01')[0];
        if (part) {
            // 存在，将已创建的粒子隐藏
            part.visible = true;
        }
    }
}

/**
 * 通过创建粒子实现降雨效果
 */
function createByParticle() {
    if (!particleRain) {
        resetAll()
        // 创建粒子
        particleRain = new THING.ParticleSystem({
            type: 'ParticleSystem',
            name: 'Rain',
            id: 'rain01',
            url: 'https://model.3dmomoda.com/models/18112113d4jcj4xcoyxecxehf3zodmvp/0/particles',
            position: [0, 300, 0],
            complete: function (ev) {
                ev.object.scale = [10, 10, 10];
            }
        });
        // 设置粒子最大密度
        particle.setGroupAttribute('maxParticleCount', 1000);
        // 设置粒子最小密度
        particle.setParticleAttribute('particleCount', 500);
    } else {
        resetAll();
        var part = app.query('#rain01')[0];
        if (part) {
            // 存在，将已创建的粒子隐藏
            part.visible = true;
        }
    }
}

/**
 * 清除降雨效果
 */
function resetAll() {
    // 获取当前已创建的粒子
    var particle = app.query('.ParticleSystem');
    if (particle) {
        // 存在，将已创建的粒子隐藏
        particle.visible = false;
    }
}