/**
 * 说明：创建粒子
 * 操作：点击按钮 创建对应粒子
 * 备注：平台默认提供四种粒子效果，通过官方提供的粒子编辑器进行制作
 * 难度：★★☆☆☆
 */

var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    skyBox: 'Night',
    env: 'Seaside',
});

// 注册场景加载完成后事件
app.on('load', function (ev) {
    initThingJsTip("平台默认提供四种粒子效果，通过官方提供的粒子编辑器进行制作，可点击按钮进行效果查看");

    new THING.widget.Button('创建火焰粒子', createFire);
    new THING.widget.Button('创建飘雪粒子', createSnow);
    new THING.widget.Button('创建喷水粒子', createWater);
    new THING.widget.Button('创建降雨粒子', createByParticle);
    new THING.widget.Button('重置', resetAll);
})

/**
 * 通过创建粒子实现火焰效果
 */
function createFire() {
    resetAll();
    // 创建粒子
    var particle = app.create({
        id: 'fire01',
        type: 'ParticleSystem',
        name: 'Fire',
        parent: app.query('car01')[0],
        url: 'https://model.3dmomoda.com/models/19061018snbajhvuzrheq9sbgwdoefuk/0/particles',
        localPosition: [0, 0, 0] // 设置粒子相对于父物体的位置
    });
}

/**
 * 通过创建粒子实现飘雪效果
 */
function createSnow() {
    resetAll();
    // 创建降雪效果
    var particleSnow = app.create({
        type: 'ParticleSystem',
        id: 'No1234567',
        name: 'Snow',
        url: 'https://model.3dmomoda.com/models/18112014q3t8aunaabahzxbxcochavap/0/particles',
        position: [0, 50, 0]
    });
}

/**
 * 通过创建粒子实现喷水效果
 */
function createWater() {
    resetAll();
    // 创建喷水效果
    var particle = app.create({
        id: 'water01',
        type: 'ParticleSystem',
        name: 'Water',
        url: 'https://model.3dmomoda.com/models/19081611ewlkh7xqy71uzixefob8uq1x/0/particles',
        position: [0, 0, 5]
    });
}

/**
 * 通过创建粒子实现降雨效果
 */
function createByParticle() {
    resetAll();
    // 创建粒子
    var particle = app.create({
        type: 'ParticleSystem',
        name: 'Rain',
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

}


/**
 * 清除降雨效果
 */
function resetAll() {
    // 获取当前已创建的粒子
    var particle = app.query('.ParticleSystem');
    // 判断当前有无创建的粒子
    if (particle) {
        // 存在，将已创建的粒子删除
        particle.destroy();
    }
}