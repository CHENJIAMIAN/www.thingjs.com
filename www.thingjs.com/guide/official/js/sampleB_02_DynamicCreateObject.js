/**
 * @version 2.0
 * @author ThingJS
 */

const app = new THING.App();
app.background = '#000000';
var cabinetSelector = null;
// 请求书籍数据的url
var url = 'https://www.thingjs.com/static/data/books.json';
// 书籍的物体面板
var panel;
var curBookObj = null;
// 加载场景
const bundle = app.loadBundle("/guide/official/bundles/scene-bundle-example", { ignoreTheme: true });
bundle.waitForComplete().then((ev) => {
    const campus = bundle.campuses[0];
    if (campus) {
        app.on(THING.EventType.RegisterLevelAction, '*', function (ev) {
            var actionQueue = ev.actionQueue;
            actionQueue.enable('hoverBrother', false)
        });

        cabinetSelector = app.query('cabinetB4')[0];
        // 点击按钮到目标书柜
        new THING.widget.Button('目标书柜', function () {
            app.levelManager.change(cabinetSelector);
        });

        // 进入物体层级效果
        cabinetSelector.on(THING.EventType.AfterEnterLevel, function (ev) {
            // 当前进入层级的物体(书柜)
            var object = ev.object;
            // 上一层级的物体
            var preObject = app.levelManager.current.parent;
            // 如果当前层级物体的父亲是上一层级（即正向进入）
            if (object.parent === preObject) {
                console.log("从楼层进入了书柜");
                object.playAnimation('OpenDoor');
                // 如果书柜没有创建书籍 则请求数据 创建书籍
                if (!object._isAlreadyCreateBooks) {
                    getBooksData(object);
                }
            }
        }, 'customEnter');

        // 设置退出层级效果
        cabinetSelector.on(THING.EventType.AfterLeaveLevel, function (ev) {
            // 退出层级的物体（书柜）
            var object = ev.object;
            let timer = setTimeout(function () {
                clearTimeout(timer);
                // 退出后的层级物体
                var curObject = app.levelManager.current;
                console.log('curObject', app.levelManager.current.type)
                // 如果所退出层级物体的父亲是 退出后的层级（即正向退出）
                if (object.parent === app.levelManager.current) {
                    console.log("退出书柜进入楼层");
                    object.playAnimation('CloseDoor');
                    destroyBooks();
                    object._isAlreadyCreateBooks = false;
                }
            }, 500)
        }, 'customLeave');
    }
})

/**
 * 获取JSON数据
 */
function getBooksData(obj) {
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: function (data) {
            createBooks(data, obj);
        }
    });
}

/**
 * 创建书籍
 */
function createBooks(data, parent) {
    var books = data.books;
    var cabinetInfo = data.cabinetInfo;
    var cabinetInfoOffsetX = cabinetInfo.offsetX;
    var cabinetInfoOffsetY = cabinetInfo.offsetY;

    // 按书架每一层 整理数据
    // 结果形如
    /*
        {
        "1":[{"name":"C++","row":1,"column":1,"width":10},{"name":"Java","row":1,"column":2,"width":14},......],
        "2":[{"name":"js","row":2,"column":1,"width":5},......],
        "3":[{"name":"js","row":3,"column":1,"width":5},......]
        }
    */
    var booksMap = processData(books);
    for (var row in booksMap) {
        var arr = booksMap[row];
        var offsetX = 0;
        var sum = 0;

        for (var i = 0; i < arr.length; i++) {
            var book = arr[i];
            var name = book.name;
            var row = book.row;
            var width = book.width / 100;
            sum += width;
            offsetX = sum - width / 2;
            // 创建Box 模拟书籍 (书籍的父亲是书柜 并根据相对坐标创建)
            var objBook = new THING.Box(width, 0.2, 0.15, {
                parent: parent,
                pivot: [0.5, 0],
                localPosition: [offsetX - cabinetInfoOffsetX[row - 1], cabinetInfoOffsetY[row - 1], 0]
            });
            objBook.userData['书名'] = name;
            objBook.userData['物体类型'] = '书';
            objBook.style.color = THING.Math.randomColor();

            objBook.on('click', function (ev) {
                var book = ev.object;
                if (curBookObj == null) {
                    curBookObj = book;
                    // 创建物体面板
                    createPanel(book);
                } else {
                    // 删除物体面板
                    destroyPanel();
                    createPanel(book);
                }
            })
        }
    }

    parent._isAlreadyCreateBooks = true;
}

/**
 * 销毁书籍
 */
function destroyBooks() {
    var books = app.query('["userData/物体类型"="书"]');
    books.destroy();
    destroyPanel();
}

app.on('click', function (ev) {
    if (!ev.picked || curBookObj != null) {
        curBookObj = null;
        destroyPanel();
    }
}, '单击其他清空选择集');

/**
 * 创建书籍顶牌
 */
function createPanel(obj) {
    if (panel) return;
    panel = new THING.widget.Panel({
        titleText: '基本信息',
        hasTitle: true,
        position: [5, 50]
    });
    panel.addString(obj.userData, "书名").caption("书名");
}

/**
 * 删除面板
 */
function destroyPanel() {
    if (panel) {
        panel.destroy();
        panel = null;
    }
}

/**
 * 数据处理
 */
function processData(books) {
    var booksMap = {};
    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        // 按每一行 整理数据
        var row = book.row;
        if (!booksMap[row]) {
            booksMap[row] = [];
        }
        booksMap[row].push(book);
    }
    return booksMap;
}

// 创建提示
initThingJsTip("本例程展示动态创建柜子中的书籍对象，点击左侧按钮进入书柜并进行书籍的动态创建，创建完成后可以点击书籍展示对应数据信息，退出层级操作时销毁书籍。");