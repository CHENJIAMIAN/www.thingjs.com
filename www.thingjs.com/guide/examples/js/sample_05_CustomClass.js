/**
 * 说明：注册自定义类，并创建自定义类物体，转换已存在物体
 * 操作：双击创建出来的红色指挥车，指挥车移动
 * 难度：★★★☆☆
 */

class Car extends THING.Thing {
    constructor(app) {
        super(app);
    }
    run() {
        this.moveTo({
            position: [0, 0, 0],
            orientToPath: true,
            lerpType: null,
            time: 2 * 1000,
            complete: function () {
                console.log("moveto completed");
            },
        });
    }
}

// 注册自定义类
// 第一个参数是为自定义类取的名称
// 第二个参数是 类 本身
THING.factory.registerClass("MyCar", Car);

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    background: '#000000',
    env: 'Seaside',
});

app.on("load", function () {
    // 创建提示
    initThingJsTip(`平台提供自定义类的方法，继承内部类，对 ThingJS 进行扩展和封装。用户定义并注册完自己的类后，自定义类常见的使用方式有以下两种：<br/>
      1. 创建自定义类的物体<br/>
      2. 转换已有物体的默认类型<br/>`);

    new THING.widget.Button("创建自定义类", function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [9.661735297604343, 20.239851904151216, 36.296330880860474],
            'target': [-2.9235701750059575, 0.9502000777153368, 6.992137404800771],
            'time': 1000,
            'complete': function () {
                // 使用自定义类，创建物体
                var car = app.create({
                    type: "MyCar", // 自定义注册类的名称
                    name: "GMC指挥车",
                    url: "https://model.3dmomoda.com/models/17fc17b416e94527bc607917fc8269a4/0/gltf/", // 模型地址
                    position: [-0.5, 0, 13.5],
                    complete: function () {
                        // 给自定义类物体注册双击事件
                        app.query(".MyCar")[0].on("dblclick", function (ev) {
                            var obj = ev.object;
                            // 调用定义的 run 方法
                            obj.run();
                        });
                        initThingJsTip("创建自定义类物体并给创建的自定义类物体添加了双击事件");
                    },
                });
            }
        });
    });

    new THING.widget.Button("转换自定义类", function () {
        reset();

        // 摄像机飞行到某位置
        app.camera.flyTo({
            'position': [29.662068889901576, 18.202362805073346, 31.49296655028952],
            'target': [14.79784952132856, -0.06205089884007746, 1.6711121481237954],
            'time': 1000,
            'complete': function () {
                // 查询 name 中带有 car 值的物体
                // 并转换为自定义的类
                var cars = app.query(/car/);
                cars.forEach(function (item) {
                    // 将查到的物体对象 转换成自定义的 Car 类
                    THING.Utils.convertObjectClass(item, "MyCar");
                });
                app.query(".MyCar").forEach(function (obj) {
                    obj.style.color = "#ff0000";
                });

                initThingJsTip(
                    "查询到所有名称包含‘car’的对象并转换类型为自定义的‘MyCar’，可以在场景信息列表进行查看"
                );
            }
        });
    });

    new THING.widget.Button("重置", function () {
        reset();

        initThingJsTip(`平台提供自定义类的方法，继承内部类，对 ThingJS 进行扩展和封装。用户定义并注册完自己的类后，自定义类常见的使用方式有以下两种：<br/>
                  1. 创建自定义类的物体<br/>
                  2. 转换已有物体的默认类型<br/>`);
    });
});

function reset() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [36.013, 42.67799999999998, 61.72399999999999],
        'target': [1.646, 7.891, 4.445],
        'time': 1000,
        'complete': function () {
            app.query(".MyCar").forEach(function (item) {
                // 将查到的物体对象 转换成自定义的 Car 类
                THING.Utils.convertObjectClass(item, "Thing");
                app.query(/car/).style.color = null;
            });
            app.query("GMC指挥车").destroy();
        }
    });
}