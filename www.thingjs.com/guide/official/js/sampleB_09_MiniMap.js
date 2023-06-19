/**
 * 说明：小地图控件
 * 难度：★★☆☆☆
 * @version 2.0
 * @author ThingJS
 */

var app = new THING.App();
var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example', {
    external: {
        buildingShowObjects: true,
        ignoreTheme: true
    }
});

// 园区加载完毕    
bundle.waitForComplete().then(() => {
    const campus = bundle.campuses[0];
    if (campus) {
        app.levelManager.changeAsync(campus);

        app.root.addComponent(THING.EXTEND.MinimapComponent, 'minimap', {
            size: [200, 200],
            layout: ["Right", "Bottom"], // 小地图的布局
        });

        let minimap = null;

        new THING.widget.Button('open', function () {
            minimap = app.root.minimap;
            if (!minimap.enable)
                minimap.enable = true;
        });

        new THING.widget.Button('size', function () {
            minimap.size = [300, 300]
        });

        new THING.widget.Button('layout', function () {
            minimap.layout = ["Left", "Bottom"]
        });

        new THING.widget.Button('close', function () {
            if (minimap.enable)
                minimap.enable = false;
        });
    }
});