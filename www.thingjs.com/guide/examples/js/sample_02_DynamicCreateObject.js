/**
 * 说明：通过请求数据 动态创建柜子中的书
 */
var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/factory',  // 场景地址
    skyBox: 'Night',
    env: 'Seaside',
});
// 请求书籍数据的url
var url = 'https://www.thingjs.com/static/data/books.json';
// 书籍的物体面板
var panel;

app.on('load', function(ev) {
    // 开启层级切换
    app.level.change(ev.campus);
    // 获取目标书柜
    var cabinetSelector = app.query('cabinetB4')[0];
    // 点击按钮到目标书柜
    new THING.widget.Button('目标书柜', function() {
        app.level.change(cabinetSelector);
    });

    // 进入物体层级效果
    cabinetSelector.on(THING.EventType.EnterLevel, function(ev) {
        // 当前进入层级的物体(书柜)
        var object = ev.object;
        // 上一层级的物体
        var preObject = ev.previous;

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
    cabinetSelector.on(THING.EventType.LeaveLevel, function(ev) {
        // 退出层级的物体（书柜）
        var object = ev.object;
        // 退出后的层级物体
        var curObject = ev.current;
        // 如果所退出层级物体的父亲是 退出后的层级（即正向退出）
        if (object.parent === curObject) {
            console.log("退出书柜进入楼层");
            object.playAnimation('CloseDoor');
            destroyBooks();
            object._isAlreadyCreateBooks = false;
        }
    }, 'customLeave');
});

/**
 * 获取JSON数据
 */
function getBooksData(obj) {
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: function(data) {
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
            var objBook = app.create({
                type: 'Box',
                width: width, // 宽度 （书籍厚度）
                height: 0.2, // 高度
                depth: 0.15, // 深度
                center: 'Bottom', // 中心点
                parent: parent,
                localPosition: [offsetX - cabinetInfoOffsetX[row - 1], cabinetInfoOffsetY[row - 1], 0]
            });

            objBook.userData['书名'] = name;
            objBook.userData['物体类型'] = '书';
            objBook.style.color = THING.Math.randomColor();


            objBook.on(THING.EventType.SingleClick, function(ev) {
                // 如果单击获取的物体不在当前选择集中
                if (!app.selection.has(ev.object)) {
                    app.selection.clear();
                    app.selection.select(ev.object);
                }
            })
            objBook.on(THING.EventType.Select, function(ev) {
                var book = ev.object;
                // 创建物体面板
                createPanel(book);
            });

            objBook.on(THING.EventType.Deselect, function(ev) {
                // 删除物体面板
                destroyPanel();
            });
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

app.on(THING.EventType.SingleClick, function(ev) {
    if (!ev.picked || !app.selection.has(ev.object)) {
        app.selection.clear();
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