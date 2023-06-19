/**
* @version 2.0
* @author ThingJS
 * 说明：
 *       1. 将场景中对象展示到界面上。
 *       2. Campus默认显现，界面选择框第一次被选择隐藏后，再次选择显现。
 *       3. 将场景中对象展示到界面上。
 * 操作：
 *       1. 点击按钮创建父子树(再次点击 控制 显隐)。
 *       2. 点击界面上选择框。
 * 难度：★★☆☆☆
 */

//创建app，默认绑定到 'div3d' DIV 元素
const app = new THING.App();

// 引入jquery.easyui插件
THING.Utils.loadFile(['/guide/lib/jquery.easyui.min.js',
    '/guide/lib/default/easyui.css'], {
    load: function () {
        var panel =
            `<div class="easyui-panel" style="display:none;padding:5px; width: 220px;height: auto;margin-top: 10px;margin-left: 10px; position: absolute; top: 0px; right: 0; z-index: 1;background-color: white">
            <ul id="objectTree" class="easyui-tree"></ul>
        </div>`
        $('#div2d').append($(panel));
    }
})

var bundle = app.loadBundle('/guide/official/bundles/scene-bundle-example');
// 定义父子树的显示状态
var objectTreeState = true;
bundle.waitForComplete().then((ev) => {
    initThingJsTip("父子树：在 ThingJS 加载园区后，自动创建了由 campus，building，floor，room 和一些在模模搭中添加的Thing类物体。这些物体不是独立散落在场景中的，他们会相互关联，形成一棵树的结构。</br>点击左侧按钮，创建父子树，展示场景层级");

    app.camera.position = [45.620884740847416, 39.1713011011022, 57.12763372644285];
    app.camera.target = [1.7703319346792363, 4.877514886137977, -2.025030535593601];
    $("#objectTree").html('');
    $(".easyui-panel").hide();
    var buildings = app.query('.Building');
    // 创建父子树
    new THING.widget.Button('创建父子树', function () {
        // 提示内容修改
        initThingJsTip("点击右侧界面选择框，控制对应内容显隐");

        $('#objectTree').parent().show();
        console.log(getRootData(app.root))
        $('#objectTree').tree({
            data: getRootData(app.root),
            checkbox: true,
            cascadeCheck: false,
            onCheck: function (node, checked) {
                if (app.query('#' + node.id)[0]) {
                    app.query('#' + node.id).renderable = checked;
                    if ((app.query('#' + node.id)[0].type) == "Campus") {
                        changeBuilding(app.query('#' + node.id)[0].buildings);
                    }
                    if ((app.query('#' + node.id)[0].type) == "Building") {
                        if (app.query('#' + node.id)[0].facades[0]) {
                            app.query('#' + node.id)[0].floors.renderable = false;
                        }
                    }
                } else {
                    bundle.root.visible = checked;
                }
            },
            onClick: function (node, checked) {
                var id = node.id;
                var obj = app.query('#' + id)[0];
                if (obj) {
                    app.levelManager.change(obj);
                }
            }
        })
    });

    new THING.widget.Button('重置', function () {
        app.query("*").renderable = true;
        app.query("*").style.opacity = 1;
        app.levelManager.change(ev.campus);
        app.camera.position = [45.620884740847416, 39.1713011011022, 57.12763372644285];
        app.camera.target = [1.7703319346792363, 4.877514886137977, -2.025030535593601];
        buildings.forEach(function (item) {
            if (item.facades[0]) {
                item.floors.renderable = false;
            }
        })
        $("#objectTree").html('');
        $(".easyui-panel").hide();

        initThingJsTip("父子树：在 ThingJS 加载园区后，自动创建了由 campus，building，floor，room 和一些在模模搭中添加的Thing类物体。这些物体不是独立散落在场景中的，他们会相互关联，形成一棵树的结构。</br>点击左侧按钮，创建父子树，展示场景层级");
    })
})

/**
 * 根节点信息
 * @param {Object} root - root类
 */
function getRootData(root) {
    var data = [];
    data.push(getSceneRoot(root));
    return data;
}

/**
 * 根节点信息
 * @param {Object} root - root类
 */
function getSceneRoot(root) {
    var data = {
        id: root.id,
        checked: true,
        state: 'open',
        text: 'root',
    };
    data["children"] = [];
    bundle.campuses.forEach(function (campus) {
        data["children"].push(getCampusData(campus));
    });
    return data;
}

/**
 * 根节点信息由建筑和室外物体组成
 * @param {Object} campus - 园区类
 */
function getCampusData(campus) {
    var data = {
        id: campus.id,
        checked: true,
        state: 'open',
        text: campus.type + ' (' + campus.id + ')'
    };
    data["children"] = [];
    campus.buildings.forEach(function (building) {
        data["children"].push(getBuildingData(building));
    });
    var arr1 = campus.things
    var arr = arr1.query(/a/);
    arr.forEach(function (thing) {
        data["children"].push(getThingData(thing));
    });
    return data;
}

/**
 * 收集建筑信息
 * @param {Object} building - 建筑对象
 */
function getBuildingData(building) {
    var data = {
        id: building.id,
        checked: true,
        state: 'open',
        text: building.type + ' (' + building.id + ')'
    };
    data["children"] = [];
    building.floors.forEach(function (floor) {
        data["children"].push(getFloorData(floor));
    });
    return data;
}

/**
 * 收集楼层信息
 * @param {Object} floor - 楼层对象
 */
function getFloorData(floor) {
    var data = {
        id: floor.id,
        checked: true,
        state: 'open',
        text: floor.type + ' (level:' + floor.levelNumber + ')'
    };
    data["children"] = [];
    var sel = floor.things;
    sel.query(/binet/).forEach(function (thing) {
        data["children"].push(getThingData(thing));
    });
    return data;
}

/**
 * 建筑对象
 * @param {Object} thing - 物对象
 */
function getThingData(thing) {
    return {
        id: thing.id,
        checked: true,
        text: thing.type + ' (' + thing.name + ')'
    };
}

/**
 * Building内部建筑隐藏(无外立面不隐藏内部建筑)
 * @param {Object} building - 建筑对象集合
 */
function changeBuilding(building) {
    for (let i = 0; i < building.length; i++) {
        if (building[i].facades[0]) {
            building[i].floors.renderable = false;
        }

    }
}