
/**
 * 说明：场景显示顶牌
 *      在CampusBuilder中点击摆放的物体，点击设置按钮后选择编辑信息牌，选择顶牌并确定后，可在
 *      物体的自定义属性列表中修改顶牌的参数，保存场景后，在ThingJS场景预览时可显示设置的顶牌。
 * 备注：
 *       1. 请确保需要顶牌的物体自定义属性列表中包含该示例运行后顶牌信息详情面板中的属性。
 * 难度：★☆☆☆☆
 */

// 加载场景代码 
var app = new THING.App({
    url: 'https://www.thingjs.com/api/scene/790c29be8ff3ee2edaaced94'
});

// 引入资源文件
THING.Utils.dynamicLoad([
    '/guide/examples/lib/html2canvas/html2canvas.min.js',  // html2canvas脚本
    '/guide/examples/plugins/topcard/sceneTopCard.min.v0.1.2.js',  // 顶牌管理脚本
    '/uploads/wechat/5oiR5pyJ5pyA6ZW/55qE572R5ZCN5LiN5L+h5L2g5pWw5pWw/file/ScenePreview/AppPreview.js',  // 场景预览脚本
],
    function () {
        initThingJsTip("在CampusBuilder中为物体添加右侧列表中的自定义属性，场景预览时可显示物体顶牌");

        init(app, 'scene', null);  // 初始化预览脚本

        var sceneTopCardClass = null;  // 顶牌类
        var building = null;  // 被顶牌对象

        // 注册加载完成事件 
        app.on('load', function (ev) {
            if (typeof (SceneTopCard) != 'undefined') {
                sceneTopCardClass = new SceneTopCard(app);
            }
            // 获取被顶牌对象
            building = app.query('#building03')[0];

            new THING.widget.Button('创建顶牌', function () {
                if ($('#scene-card-' + building.id).length > 0) return;
                building.userData['title0'] = 'A'
                building.userData['title1'] = '103号楼'
                building.userData['title2'] = '花家地南街'
                building.userData['bbIdx'] = '1'
                building.userData['bbTag'] = '默认'
                building.userData['bb3d'] = 'false'
                building.userData['bbModel'] = 'always'
                building.userData['bbScaleW'] = '1'
                building.userData['bbScaleH'] = '1'
                sceneTopCardClass.create(building);
                initThingJsTip("在CampusBuilder中为物体添加右侧列表中的自定义属性，场景预览时可显示物体顶牌");
            });

            new THING.widget.Button('缩放顶牌', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    removeTopCard();
                    building.userData['bbScaleW'] = '0.6';
                    building.userData['bbScaleH'] = '0.6';
                    sceneTopCardClass.create(building);
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('更改样式', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    removeTopCard();
                    building.userData['bbIdx'] = '3';
                    sceneTopCardClass.create(building);
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('更改文本', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    removeTopCard();
                    building.userData['title0'] = 'C';
                    building.userData['title1'] = '105号楼';
                    sceneTopCardClass.create(building);
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('点击显示', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    removeTopCard();
                    building.userData['bbModel'] = 'click';
                    sceneTopCardClass.create(building);
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('悬浮显示', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    removeTopCard();
                    building.userData['bbModel'] = 'float';
                    sceneTopCardClass.create(building);
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('常显显示', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    removeTopCard();
                    building.userData['bbModel'] = 'always';
                    sceneTopCardClass.create(building);
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('模型化顶牌', function () {
                if ($('#tb-line' + building.id).length != 0) {
                    if (building.userData['bb3d'] != 'true') {
                        removeTopCard();
                        building.userData['bb3d'] = 'true';
                        building.userData['bbScaleW'] = '2'
                        building.userData['bbScaleH'] = '2'
                        sceneTopCardClass.create(building);
                    }
                } else {
                    initThingJsTip('请先创建顶牌')
                }
            })

            new THING.widget.Button('移除顶牌', function () {
                $('#tb-line' + building.id).remove();
                removeTopCard();
            })
        });

        /**
         * 移除顶牌
         */
        function removeTopCard() {
            if ($('#scene-card-' + building.id).length > 0) {
                $('#scene-card-' + building.id).remove();
            }
            if (building.children.length > 0) {
                building.children[0].destroy();
            }
            sceneTopCardClass.offEvent(building);
        }
    },
    true,  // 选填，是否带时间戳
    true  // 选填，是否按顺序下载
)