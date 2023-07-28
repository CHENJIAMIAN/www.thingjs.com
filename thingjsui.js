/* 
const t = new THING.UI(document.getElementById("run-seabed"), {});
const e = new THING.UI("#canvas-container", {}, {
    theme: {
        ruler: {
            color: "#121314",
            width: 21,
            lineStyle: {
                color: "#D73232",
                width: 1,
                lineStyle: {
                    activeColor: "#ED9692"
                },
                tick: {
                    lineLong: 16,
                    lineShort: 4
                }
            },
            tick: {
                textFont: "10px sans-serif",
                textColor: "rgba(255, 255, 255, 0.3)",
                lineWidth: 1,
                lineColor: "rgba(255, 255, 255, 0.16)"
            },
            iconColor: "rgb(255, 255, 255, 0.8)"
        }
    }
})
//    

s = new THING.UI.DefaultContainer(a/* UI.Layer */, {
    id: "3DContainer",
    style: {
        width: i.canvas.width,
        height: i.canvas.height,
        left: 0,
        top: 0
    },
    zDown: !1
})
// 
const n = "layer-id-" + a
const s = new THING.UI.Layer(i.canvas, {
    id: t || n,
    name: e || "page",
    style: {
        width: i.canvas.width,
        height: i.canvas.height,
        left: 0,
        top: 0
    }
});
s.lock = !0;
// 

const a = window.ui.layers.find(e => "3DLayer" !== e.id);
new THING.UI.Container(a, e)
*/
const baseType = Math.random().toString(36).substr(-8);
let baseId = Math.round(100 * Math.random());
function getUID(e="ui") {
    return e = e + "-" + (baseType + baseId),
    baseId++,
    e
}
function getElement(e) {
    return !!e && (e instanceof HTMLElement ? e : document.querySelector(e))
}
function createElement(e="div") {
    return document.createElement(e)
}
function createElementWithAttr(e="div", t={}, i={}) {
    var n, o, r = document.createElement(e), s = (e = Object.keys(t),
    Object.keys(i));
    for (n of e)
        r.style[n] = t[n];
    for (o of s)
        r.dataset[o] = i[o];
    return r
}
function mount(e, t, i) {
    var n = "before" === i || "after" === i ? t.el : t.contentEl;
    unmount(e),
    mountElement(e.el, n || t.el, i),
    e._isMounted = !0
}
function mountElement(e, t, i) {
    "before" === i ? t.parentNode.insertBefore(e, t) : "after" === i ? (i = t.nextSibling) ? mountElement(e, i, "before") : mountElement(e, t.parentNode) : t.appendChild(e)
}
function unmount(e) {
    e.el && e.el.parentNode && e.el.parentNode.removeChild(e.el),
    e._isMounted = !1
}
function updateStyle(e) {
    var t = e.style.getDirtyStyleList();
    return t.forEach((t=>{
        e.el.style[t.name] = t.value
    }
    )),
    t
}
const LAYOUT_MAP = {
    UI: "UI",
    CANVAS: "Canvas",
    LAYER: "Layer",
    GROUP: "Group",
    CONTAINER: "Container",
    DEFAULTCONTAINER: "DefaultContainer"
}
  , defaultConfig = {
    [LAYOUT_MAP.UI]: {
        type: LAYOUT_MAP.UI,
        theme: {
            ui: {
                background: "#fff"
            },
            mask: {
                background: "transparent",
                opacity: 1,
                defaultContainer: {}
            },
            ruler: {
                border: "1px solid #000000",
                color: "#565656",
                width: 21,
                lineStyle: {
                    color: "#EAB2B3",
                    activeColor: "#ED9692",
                    width: 1
                },
                tick: {
                    textFont: "9px sans-serif",
                    textColor: "#fff",
                    lineWidth: 1,
                    lineColor: "#fff",
                    lineLong: 16,
                    lineShort: 4
                },
                iconColor: "#c1c1c1",
                icon: {
                    color: "#c1c1c1",
                    borderStyle: "solid",
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "#000000"
                }
            },
            alignmentLines: {
                color: "#ff3366",
                width: 1,
                distanceStyle: {
                    color: "#CCFF99",
                    width: 1
                }
            },
            bound: {
                rectColor: "#007AFF",
                rectStyle: "solid",
                handleColor: "#007AFF",
                labelColor: "#FFFFFF",
                labelBackground: "#007AFF",
                container: {},
                group: {},
                layer: {},
                multSelect: {}
            },
            watermark: {
                src: ""
            }
        },
        inStack: !0
    },
    [LAYOUT_MAP.CANVAS]: {
        type: LAYOUT_MAP.CANVAS,
        inStack: !0,
        isLock: !0
    },
    [LAYOUT_MAP.LAYER]: {
        type: LAYOUT_MAP.LAYER,
        inStack: !0,
        isLock: !0
    },
    [LAYOUT_MAP.GROUP]: {
        type: LAYOUT_MAP.GROUP,
        inStack: !0,
        isLock: !1
    },
    [LAYOUT_MAP.CONTAINER]: {
        type: LAYOUT_MAP.CONTAINER,
        inStack: !0,
        isLock: !1
    }
}
  , defaultOption = {
    [LAYOUT_MAP.CANVAS]: {
        baseOption: {
            ignoreRendering: !1,
            style: {
                position: "relative",
                width: 1920,
                height: 1080,
                backgroundColor: "black",
                transformOrigin: "0 0"
            }
        }
    },
    [LAYOUT_MAP.LAYER]: {
        baseOption: {
            ignoreRendering: !1,
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: 1e3,
                height: 1e3
            }
        }
    },
    [LAYOUT_MAP.GROUP]: {
        baseOption: {}
    },
    [LAYOUT_MAP.CONTAINER]: {
        baseOption: {
            ignoreRendering: !1,
            penetrateOnplay: !1,
            style: {
                position: "absolute",
                top: 30,
                left: 30,
                width: 200,
                height: 200
            }
        }
    }
}
  , COMMAND_TYPE = {
    MOVE: "Move",
    STYLE: "Style",
    ATTRIBUTE: "Attribute",
    CREATEGROUP: "CreateGroup",
    UNGROUP: "UnGroup",
    UNGRAPHOBJECT: "UnGraphObject",
    CREATEGRAPHOBJECT: "CreateGraphObject",
    UNGRAPGOBJECT: "UnGraphObject",
    DRAG: "Drag",
    ALIGN: "Align",
    ROTATE: "Rotate"
}
  , CANVAS_SCALE_MODE = {
    SCROLL: 0,
    SCALEALL: 1,
    SCALEWIDTH: 2,
    SCALEHEIGHT: 3,
    FLOWHEIGHT: 4
}
  , CANVAS_MODE = {
    PLAY: 0,
    EDIT: 1
}
  , MASK_STYLE = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}
  , CURSOR_STYLE = ["ns-resize", "ns-resize", "ew-resize", "ew-resize", "nwse-resize", "nesw-resize", "nesw-resize", "nwse-resize"]
  , TRANSITIONTYPE = {
    ENTER: "enter",
    LEAVE: "leave"
}
  , EVENT_KEY = {
    DOWN: "down",
    MOVE: "move",
    UP: "up"
}
  , EVENT_CHECK = {
    CANDOWN: "canDown",
    CANMOVE: "canMove",
    CANUP: "canUp",
    ISSTOP: "isStopPropagation",
    ISPREVENT: "isPreventDefault"
};
function confirmArr(e) {
    return Array.isArray(e) && 0 < e.length
}
function isType(e, t) {
    return Object.prototype.toString.call(e).includes(t)
}
function isDef(e) {
    return null != e
}
function isUnDef(e) {
    return null == e
}
function isNumber(e) {
    return "number" == typeof e && !isNaN(e)
}
function hasOwn(e, t) {
    return Reflect.has(e, t)
}
function isPlainObject(e) {
    return isType(e, "Object")
}
function merge(...e) {
    let t = e.shift();
    isPlainObject(t) || (t = {});
    for (const i of e)
        if (isPlainObject(i))
            for (const e in i)
                i.hasOwnProperty(e) && (t[e] = mergeCore(t[e], clone(i[e])));
    return t
}
function mergeCore(e, t) {
    if (!isPlainObject(e) || !isPlainObject(t))
        return t;
    for (const i in t)
        t.hasOwnProperty(i) && (e[i] = mergeCore(e[i], t[i]));
    return e
}
function clone(e, t) {
    if (!isPlainObject(e))
        return e;
    t = t || [];
    var i = Array.isArray(e) ? [] : {}
      , n = find(t, e);
    if (n)
        return n.target;
    t.push({
        source: e,
        target: i
    });
    for (const n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (isPlainObject(e[n]) ? i[n] = clone(e[n], t) : i[n] = e[n]);
    return i
}
function find(e, t) {
    for (const i of e)
        if (i.source === t)
            return i;
    return null
}
function findIndex(e, t) {
    return e.findIndex((e=>e.data === t))
}
function initialCapital(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}
const isMac = -1 < window.navigator.userAgent.indexOf("Mac OS X");
function getSvg(e, t, i) {
    return isDef(t) && isDef(i) ? `url(data:image/svg+xml;base64,${btoa(decodeURIComponent(encodeURIComponent(e)))}\n    ) ${t} ${i},default` : `url(data:image/svg+xml;base64,${btoa(decodeURIComponent(encodeURIComponent(e)))}\n    )`
}
function checkMouseBtnType(e, t) {
    switch (t) {
    case "left":
        return 1 === e.buttons;
    case "right":
        return 2 === e.buttons;
    case "center":
        return 4 === e.buttons
    }
}
function getMouseBtnType(e) {
    switch (isType(e, "Number") ? e : e.buttons) {
    case 1:
        return "left";
    case 2:
        return "right";
    case 4:
        return "center";
    case 0:
        return ""
    }
}
function checkRegExp(e, t) {
    return !isUnDef(e) && !isUnDef(t) && new RegExp(e).test(t)
}
function bind(e, t, i, n=null) {
    isUnDef(e) || (isDef(n) ? e.addEventListener(t, i, n) : e.addEventListener(t, i))
}
function unbind(e, t, i) {
    e && e.removeEventListener(t, i)
}
function getStorage(e) {
    return window.localStorage.getItem(e)
}
const dateStyle = {
    info: "background:#606060;color:#fff;",
    warn: "background:#E9A400;color:#fff;",
    error: "background:#EC3941;color:#fff;"
};
function logStyle(e) {
    return [dateStyle[e], "background:#1375B2;color:#fff;"]
}
function date() {
    var e = new Date;
    return e.toLocaleDateString() + " " + e.toLocaleTimeString()
}
class Log$1 {
    info(...e) {
        this._recordLog("info", ...e)
    }
    warn(...e) {
        this._recordLog("warn", ...e)
    }
    error(...e) {
        this._recordLog("error", ...e)
    }
    _recordLog(e, ...t) {
        window.console[e](`%c [THING.UI ${e}] %c ${date()} `, ...logStyle(e), ...t)
    }
    memory() {
        var e, t, i, n = window.performance.memory;
        n && (e = e=>e / 1024 / 1024 + "M",
        ({jsHeapSizeLimit: n, totalJSHeapSize: t, usedJSHeapSize: i} = n),
        console.table({
            max: e(n),
            has: e(t),
            used: e(i)
        }))
    }
}
var log = new Log$1;
const _getType = e=>"ui" === (e = e.toLowerCase()) ? e : e + "s"
  , displayables = new Map;
class Data {
    constructor() {
        this.init(),
        this.nameMapping = new Map
    }
    init() {
        Object.keys(LAYOUT_MAP).forEach((e=>{
            displayables.set(_getType(e), new Set)
        }
        ))
    }
    add(e) {
        var t = _getType(e.type);
        displayables.get(t).add(e),
        this.setName(e)
    }
    remove(e) {
        var t = _getType(e.type);
        (t = displayables.get(t)).size && (t.has(e) && t.delete(e),
        e.name) && (t = this.getByName(e.name)).splice(t.indexOf(e), 1)
    }
    setName(e) {
        var t = e.name;
        t && (this.nameMapping.has(t) || this.nameMapping.set(t, []),
        (t = this.nameMapping.get(e.name)).find((t=>t.id === e.id)) || t.push(e))
    }
    clear() {
        this.nameMapping.clear(),
        this.init()
    }
    getByName(e) {
        return this.nameMapping.get(e)
    }
    getByType(e) {
        return displayables.get(e)
    }
}
class Node$1 {
    constructor(e) {
        this.data = e,
        this.parent = null,
        this.children = []
    }
}
const idMapping = new Map;
class Tree {
    constructor() {
        return this._root = null,
        this.idMapping = idMapping,
        Tree.instance || (Tree.instance = this),
        Tree.instance
    }
    add(e, t) {
        var i = new Node$1(e);
        idMapping.set(e.id, i),
        null === this._root ? this._root = i : (e = this.getNodeById(t.id),
        (i.parent = e).children.push(i))
    }
    remove(e) {
        var t = this.getNodeById(e.parent.id)
          , i = findIndex(t.children, e);
        if (i < 0)
            throw new Error("要删除节点不存在");
        return t.children.splice(i, 1),
        idMapping.delete(e.id),
        !0
    }
    edit(e, t) {
        var i = this.getNodeById(t.parent.id)
          , n = findIndex(i.children, t);
        switch (e) {
        case "prev":
            return n <= 0 ? null : i.children[n - 1];
        case "next":
            return n < 0 || i.children.length === n + 1 ? null : i.children[n + 1];
        default:
            throw new Error("此操作无效")
        }
    }
    move(e, t, i) {
        var n = this.getNodeById(t.parent.id);
        let o = null;
        var r = this.getNodeById(e.parent.id)
          , s = findIndex(r.children, e)
          , a = this.getNodeById(e.id);
        switch (i) {
        case "before":
            r.children.splice(s, 1),
            a.data.parent = n.data,
            a.parent = n,
            o = findIndex(n.children, t),
            n.children.splice(o, 0, a);
            break;
        case "after":
            r.children.splice(s, 1),
            a.data.parent = n.data,
            a.parent = n,
            o = findIndex(n.children, t),
            n.children.splice(o + 1, 0, a);
            break;
        default:
            var l = this.getNodeById(t.id);
            r.children.splice(s, 1),
            a.data.parent = l.data,
            (a.parent = l).children.push(a)
        }
    }
    clear() {
        this._root = null,
        idMapping.clear()
    }
    hasNodeById(e) {
        return idMapping.has(e)
    }
    getNodeById(e) {
        return idMapping.get(e)
    }
}
class DB {
    constructor() {
        this.data = new Data,
        this.tree = new Tree,
        this.selects = new Set
    }
}
var db = new DB;
const stacks = new WeakMap;
class Stack {
    constructor() {
        return stacks.set(this, []),
        Stack.instance || (Stack.instance = this),
        Stack.instance
    }
    push(e) {
        this.get().push(e)
    }
    pop() {
        return this.get().pop()
    }
    shift() {
        this.get().shift()
    }
    peek() {
        var e = this.get();
        return e[e.length - 1]
    }
    size() {
        return this.get().length || 0
    }
    isEmpty() {
        return !this.size()
    }
    clear() {
        stacks.set(this, [])
    }
    print() {
        return Array.from(this.get().values())
    }
    get() {
        return stacks.get(this)
    }
    set(e) {
        stacks.set(this, e)
    }
}
const Attribute = e=>{
    const t = e[0];
    let i = e[1];
    return {
        type: "Attribute",
        redo(e, n) {
            i = attr("Redo", i, t),
            e && e.apply(n, [i])
        },
        undo(e, n) {
            i = attr("Undo", i, t),
            e && e.apply(n, [i])
        }
    }
}
;
function attr(e, t, i) {
    return getStorage("printStackLog") && log.info(`[${e} Attribute]: ${i.id}撤销` + ("show" === t ? "“隐藏”" : "“显示”")),
    "show" === t ? (i.visible = !1,
    i._setVisible(!1),
    selector.clear(),
    "hidden") : (i.visible = !0,
    i._setVisible(!0),
    selector.select(i),
    "show")
}
const Drag = e=>{
    const t = selector.getContainers()
      , i = selector.getSelectElements()
      , n = t.map((e=>e.bound.record))
      , o = [];
    return {
        type: "Drag",
        redo(e) {
            getStorage("printStackLog") && log.info(`[Redo Drag]: ${t.map((e=>e.id))}恢复“拖拽”`),
            selector.select(i),
            t.forEach(((e,t)=>{
                e.setBound(o[t])
            }
            )),
            selector.select(i),
            e && e(this.type, i, t)
        },
        undo(e) {
            getStorage("printStackLog") && log.info(`[Undo Drag]: ${t.map((e=>e.id))}撤销“拖拽”`),
            selector.select(i),
            t.forEach(((e,t)=>{
                o[t] = clone(e.bound),
                e.setBound(n[t])
            }
            )),
            selector.select(i),
            e && e(this.type, i, t)
        }
    }
}
  , Align$1 = e=>{
    const t = e[0].map((e=>"Group" === e.type ? e.containers : e)).flat(1 / 0)
      , i = t.map((e=>e.bound.record))
      , n = [];
    return {
        type: "Align",
        redo(e) {
            getStorage("printStackLog") && log.info(`[Redo Align]: ${t.map((e=>e.id))}恢复“对齐”`),
            t.forEach(((e,t)=>{
                e.setBound(n[t])
            }
            )),
            e && e(this.type, t)
        },
        undo(e) {
            getStorage("printStackLog") && log.info(`[Undo Align]: ${t.map((e=>e.id))}撤销“对齐”`),
            t.forEach(((e,t)=>{
                n[t] = clone(e.bound),
                e.setBound(i[t])
            }
            )),
            e && e(this.type, t)
        }
    }
}
  , Rotate = e=>{
    const t = e[0].map((e=>"Group" === e.type ? e.containers : e)).flat(1 / 0)
      , i = t.map((e=>e.bound.record))
      , n = [];
    return {
        type: "Rotate",
        redo(e) {
            getStorage("printStackLog") && log.info(`[Redo Rotate]: ${t.map((e=>e.id))}恢复“旋转”`),
            t.forEach(((e,t)=>{
                e.setBound(n[t])
            }
            )),
            selector.select(t),
            e && e(this.type, t)
        },
        undo(e) {
            getStorage("printStackLog") && log.info(`[Undo Rotate]: ${t.map((e=>e.id))}撤销“旋转”`),
            t.forEach(((e,t)=>{
                n[t] = clone(e.bound),
                e.setBound(i[t])
            }
            )),
            selector.select(t),
            e && e(this.type, t)
        }
    }
}
  , cache = {
    [COMMAND_TYPE.CREATEGRAPHOBJECT]: "",
    [COMMAND_TYPE.UNGRAPHOBJECT]: "",
    [COMMAND_TYPE.MOVE]: "",
    [COMMAND_TYPE.STYLE]: "",
    [COMMAND_TYPE.ATTRIBUTE]: Attribute,
    [COMMAND_TYPE.CREATEGROUP]: "",
    [COMMAND_TYPE.UNGROUP]: "",
    [COMMAND_TYPE.DRAG]: Drag,
    [COMMAND_TYPE.ALIGN]: Align$1,
    [COMMAND_TYPE.ROTATE]: Rotate
};
class GenerateExecution {
    constructor() {
        this.commands = null,
        this.cache = cache,
        this.init()
    }
    init() {
        this.commands = this.initCommands()
    }
    initCommands() {
        const e = {};
        return Object.values(COMMAND_TYPE).forEach((t=>{
            e[t] = commandFn(t)
        }
        )),
        e
    }
    addCommandType(e) {
        var t;
        return !(!e || !isType(e, "String") || (t = e.toUpperCase(),
        !isUnDef(COMMAND_TYPE[t])) || (COMMAND_TYPE[t] = e,
        this.cache[e] = "",
        this.commands[e] = commandFn(e),
        0))
    }
}
function commandFn(e) {
    return t=>{
        if (isUnDef(cache[e]))
            throw Error(`[Error UndoRedo]: ${e}操作类型未定义`);
        if ("" !== cache[e])
            return cache[e](t);
        {
            t[0] = t[0] || {};
            const {undo: i, redo: n, param: o} = t[0];
            return {
                type: e,
                redo(t, i) {
                    getStorage("printStackLog") && log.info(`[Redo ${e}]`),
                    n && n(...o),
                    t && t.apply(i, [e, ...o])
                },
                undo(t, n) {
                    getStorage("printStackLog") && log.info(`[Undo ${e}]`),
                    i && i(...o),
                    t && t.apply(n, [e, ...o])
                },
                destroy() {
                    o && o[0] && o[0]._destroyTruthy && o[0]._destroyTruthy()
                }
            }
        }
    }
}
var generateExecution = new GenerateExecution;
class Command {
    constructor() {
        this.stack = new Stack,
        this.position = -1,
        this.maximum = 100,
        this.commands = generateExecution.commands
    }
    setMaximum(e) {
        return !(!isType(e, "Number") || e === this.maximum || (this.maximum = e,
        0))
    }
    execute(e, ...t) {
        var i, n;
        return !!this.commands[e] && !!(i = this.commands[e](t)) && (-1 <= this.position && this.position < this.stack.size() - 1 && this._clearRedo(),
        this.stack.size() >= this.maximum && ("UnGraphObject" !== (n = this.stack.get()[0]).type && "UnGroup" !== n.type || n.destroy(),
        this.stack.shift(),
        this.position--),
        i.store = this.store,
        this.stack.push(i),
        this.position++,
        getStorage("printStackLog") && log.info(`[execute ${e}]`, -1 < e.indexOf("Create") ? t[0].id || t[0].param[0].id : t),
        !0)
    }
    undo(e, t) {
        return 0 <= this.position && (this.get().undo(e, t),
        this.position--,
        !0)
    }
    redo(e, t) {
        return this.position < this.stack.size() - 1 && (this.position++,
        this.get().redo(e, t),
        !0)
    }
    canRedo() {
        return this.position < this.stack.size() - 1
    }
    canUndo() {
        return 0 <= this.position
    }
    clear() {
        this.stack.clear(),
        this.position = -1
    }
    get() {
        return this.stack.get()[this.position]
    }
    _clearRedo() {
        var e = this.stack.get().slice(0, this.position + 1);
        for (const e of this.stack.get().slice(this.position - this.stack.size() + 1).reverse())
            "CreateGraphObject" !== e.type && "CreateGroup" !== e.type || e.destroy();
        this.stack.set(e)
    }
}
var command = new Command;
function mergeOption(e, t={}, i={}) {
    return merge({}, defaultOption[e], {
        config: defaultConfig[e]
    }, {
        baseOption: t,
        config: i
    })
}
function _applyMixin(e, t) {
    t = t.prototype || t,
    Object.getOwnPropertyNames(t).forEach((i=>{
        "constructor" !== i && (e.prototype[i] = t[i])
    }
    ))
}
function applyMixins(e, t) {
    Array.isArray(t) ? t.forEach((t=>{
        _applyMixin(e, t)
    }
    )) : _applyMixin(e, t)
}
class LayoutManager {
    constructor() {
        this.layoutMap = new Map
    }
    register(e, t) {
        return 2 !== arguments.length ? log.warn("注册需要的参数不对") : this.layoutMap.has(e) ? log.warn(e + " 已经存在，无法注册") : (this.layoutMap.set(e, t),
        !0)
    }
    mixin(e, t) {
        this.layoutMap.forEach(((i,n)=>{
            n.toUpperCase() === e.toUpperCase() && applyMixins(i, t)
        }
        ))
    }
    createLayout(e, t, i, n={}) {
        if (this.layoutMap.has(t))
            return t === LAYOUT_MAP.GROUP && (n.isAlone = !0),
            this.layoutMap.get(t).factoryConfig(e, i, n);
        throw new Error(t + " 还未注册，需要先注册后才能使用")
    }
    parseLayout(e, t, i) {
        const n = this.createLayout(e, t.type, t.option, i);
        return t.children && t.children.forEach((e=>{
            this.parseLayout(n, e, {
                inStack: !1
            })
        }
        )),
        n
    }
    checkLayoutType(e, t) {
        return isType(t, "Array") ? t.some((t=>!isUnDef(t = this.layoutMap.get(t)) && e instanceof t)) : !isUnDef(t = this.layoutMap.get(t)) && e instanceof t
    }
}
var layoutManager = new LayoutManager;
class Hook {
    constructor(e, t) {
        this.instance = e,
        this.hooks = t;
        for (const e of this.hooks)
            this[e + "List"] = []
    }
    tap(e, t) {
        return !!this.getIncludes(e) && ("function" == typeof t && (this[e + "List"] || (this[e + "List"] = []),
        this[e + "List"].push(t.bind(this.instance, {
            instance: this.instance
        }))),
        !0)
    }
    call(e, ...t) {
        if (!this.getIncludes(e))
            return log.warn(e + " hook has not been registered"),
            !1;
        for (const i of this[e + "List"])
            try {
                i(...t)
            } catch (t) {
                log.error(`Error in ${e} hook:`, t)
            }
        return !0
    }
    register(e, t) {
        if ("object" == typeof e && null !== e)
            for (const t in e)
                this.register(t, e[t]);
        else
            this.getIncludes(e) ? log.warn(e + " hook has been registered") : this.hooks.push(e),
            this.tap(e, t)
    }
    unregister(e) {
        var t = this.getIndexOf(e);
        if (-1 === t)
            throw new Error("this hook has been registered");
        delete this[e + "List"],
        this.hooks.splice(t, 1)
    }
    destroy() {
        this.hooks.forEach((e=>delete this[e + "List"])),
        this.hooks = []
    }
    getIncludes(e) {
        return !!this.hooks.includes(e)
    }
    getIndexOf(e) {
        return this.hooks.indexOf(e)
    }
}
const allowTypes = ["ui", "canvas", "layer", "group", "container"];
class Module {
    constructor(e) {
        this.instance = e,
        this.cache = {},
        Object.entries(e).forEach((([e,t])=>{
            allowTypes.includes(e) && (this.cache[e] || (this.cache[e] = {}),
            Object.entries(t).forEach((([t,i])=>{
                if ("function" == typeof i) {
                    let n = this.cache[e][t];
                    n || (this.cache[e][t] = n = new Set),
                    n.add(i)
                }
            }
            )))
        }
        ))
    }
    inject(e, t) {
        const i = this.cache[t.toLowerCase()];
        i && Object.keys(i).forEach((t=>{
            i[t].forEach((i=>{
                e.tap(t, i)
            }
            ))
        }
        ))
    }
}
class ModuleManager {
    constructor() {
        this.modules = new Map
    }
    mixin(e) {
        Object.entries(e).forEach((([e,t])=>{
            allowTypes.includes(e) && layoutManager.mixin(e, t)
        }
        ))
    }
    register(e) {
        if (!this.modules.has(e)) {
            let t = e;
            "function" == typeof (t = "function" == typeof e ? e(UI) : t).setup && (t.setup(UI),
            delete t.setup),
            this.modules.set(e, new Module(t))
        }
    }
    remove(e) {
        this.modules.delete(e)
    }
    inject(e, t) {
        this.modules.forEach((i=>i.inject(e, t)))
    }
}
var mm = new ModuleManager;
const hooks = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeToJSON", "beforeDestroy", "destroyed", "beforeParseJSON", "afterParseJSON"];
function createLifeCycle(e) {
    var t = new Hook(e,hooks);
    return mm.inject(t, e.type || e.constructor.name),
    t
}
const commandAPI = {
    create(e, t, i) {
        commandAPI._create(e, t),
        i && store$1.execute(COMMAND_TYPE.CREATEGROUP, {
            undo: commandAPI._unCreate,
            redo: commandAPI._create,
            param: [e, t]
        })
    },
    destroy(e) {
        var t = store$1.getAllElementsByEL(e);
        commandAPI._destroy(e, t),
        store$1.execute(COMMAND_TYPE.UNGROUP, {
            undo: commandAPI._undestroy,
            redo: commandAPI._destroy,
            param: [e, t]
        })
    },
    dismiss(e) {
        var t = e.children;
        commandAPI._dismiss(e, t),
        store$1.execute(COMMAND_TYPE.UNGROUP, {
            undo: commandAPI._undismiss,
            redo: commandAPI._dismiss,
            param: [e, t]
        })
    },
    graph(e, t) {
        t && store$1.execute(COMMAND_TYPE.CREATEGRAPHOBJECT, {
            undo: commandAPI._unGraph,
            redo: commandAPI._graph,
            param: [e]
        }),
        commandAPI._graph_init(e)
    },
    unGraph(e) {
        var t = store$1.getAllElementsByEL(e);
        commandAPI._unGraph(e, t),
        store$1.execute(COMMAND_TYPE.UNGRAPHOBJECT, {
            undo: commandAPI._graph,
            redo: commandAPI._unGraph,
            param: [e, t]
        })
    },
    move(e, t, i) {
        commandAPI._move(e, t, i),
        store$1.execute(COMMAND_TYPE.MOVE, {
            undo: commandAPI._moveBack,
            redo: commandAPI._move,
            param: [e, t, i]
        })
    },
    drag(e) {
        store$1.execute(COMMAND_TYPE.DRAG, e)
    },
    align(e) {
        store$1.execute(COMMAND_TYPE.ALIGN, e)
    },
    rotate(e) {
        store$1.execute(COMMAND_TYPE.ROTATE, e)
    },
    attribute(e, t) {
        store$1.execute(COMMAND_TYPE.ATTRIBUTE, e, t)
    },
    _create(e, t) {
        store$1.init(e),
        store$1._move(e, t[0], "before"),
        t.forEach((t=>moveToTarget(t, e)))
    },
    _unCreate(e, t) {
        store$1._moveBack(t),
        store$1._remove(e),
        selector.clear()
    },
    _graph(e, t) {
        store$1.init(e),
        t && t.forEach((e=>store$1.init(e))),
        e.doMount()
    },
    _graph_init(e) {
        store$1.init(e),
        e.initMount()
    },
    _unGraph(e, t) {
        e.doUnmount(),
        store$1._remove(e),
        t && store$1._removeData(t)
    },
    _destroy(e, t) {
        selector.clear(),
        e.unmount(),
        store$1._remove(e),
        t && store$1._removeData(t)
    },
    _undestroy(e, t) {
        store$1._removeback(e),
        t.forEach((e=>store$1.init(e))),
        e.mount(),
        selector.select(e)
    },
    _dismiss(e, t) {
        store$1._move(t, e, "before"),
        store$1._remove(e),
        t.forEach((e=>e._setVisible(e.visible))),
        selector.clear()
    },
    _undismiss(e, t) {
        store$1._removeback(e),
        store$1._moveBack(t),
        selector.select(e)
    },
    _move(e, t, i) {
        moveToTarget(e, t, i)
    },
    _moveBack(e) {
        store$1._moveBack(e)
    }
}
  , {ENTER: ENTER$2, LEAVE: LEAVE$2} = TRANSITIONTYPE;
class TransAnimation {
    constructor() {
        this.ui = null,
        this.target = null,
        this.type = "",
        this.resolve = null,
        this.animations = new Map,
        this.cbMap = new Map
    }
    get root() {
        return this.ui
    }
    set root(e) {
        this.ui || (this.ui = e)
    }
    execute(e, t, i=null) {
        if (!this.root.isPlayMode() || !t || !t.length)
            return !1;
        let n = !1;
        if (t && t.length) {
            i && this.root.animation._registerCallback(i, e);
            try {
                t.forEach((t=>{
                    t.reduce(((t,i)=>t.run(i, null, e)), this.root.animation)
                }
                )),
                n = !0
            } catch (t) {
                n = !1,
                console.error(t)
            }
        }
        return n
    }
    dispense(e, t, i, n) {
        switch (this.target = e,
        this.type = t,
        this.resolve = i,
        n && this.cbMap.set(e, n),
        t) {
        case ENTER$2:
            this.show();
            break;
        case LEAVE$2:
            this.hidden()
        }
    }
    async show() {
        var e, {target: t, type: i, resolve: n} = this;
        checkLayoutType(t, LAYOUT_MAP.CONTAINER) ? (e = this.getExecuteFn(t, null, {
            type: i,
            resolve: n
        }),
        t._visible = !0,
        e() || (t._setVisible(!0),
        n(t))) : (checkLayoutType(t, LAYOUT_MAP.GROUP) || checkLayoutType(t, LAYOUT_MAP.LAYER)) && (t._visible = !0,
        t._setVisible(!0),
        this.root.isPlayMode() && await Promise.all(this.getPromiseList(t, i)),
        n(t))
    }
    async hidden() {
        var {target: e, type: t, resolve: i} = this;
        if (checkLayoutType(e, LAYOUT_MAP.CONTAINER)) {
            var n = this.getExecuteFn(e, null, {
                type: t,
                resolve: i
            });
            e._visible = !1,
            n() || (e.__setVisible(!1),
            i(e))
        } else if (checkLayoutType(e, LAYOUT_MAP.GROUP) || checkLayoutType(e, LAYOUT_MAP.LAYER)) {
            if (e._visible = !1,
            this.root.isPlayMode()) {
                let i = [];
                await Promise.all(this.getPromiseList(e, t, (e=>{
                    i.push(e)
                }
                ))),
                e.__setVisible(!1),
                this.cbMap.get(e) && this.cbMap.get(e)(i),
                this.cbMap.delete(e),
                i = []
            } else
                e.__setVisible(!1);
            i(e)
        }
    }
    getExecuteFn(e, t, i) {
        var n = new Function("","return false");
        if (this.getCtVisible(e)) {
            if (isDef(t))
                return ({animation: t, cb: o} = t),
                this.execute.bind(this, e, t, o);
            if (isDef(i)) {
                var {type: t, resolve: o, fn: i} = i;
                if (!this.root.isPlayMode())
                    return n;
                var r = this.animations.get(e);
                return r ? (this.root.animation._end(e),
                i && i(e),
                i = r.animation[t],
                this.execute.bind(this, e, i, e._animationEndCb.bind(e, o))) : n
            }
        }
        return n
    }
    convert(e, t) {
        if (t = t || e,
        checkLayoutType(e.parent, LAYOUT_MAP.GROUP))
            return this.convert(e.parent, t);
        if (checkLayoutType(e, LAYOUT_MAP.GROUP)) {
            if (e.animation && Object.keys(e.animation).length)
                return e.animation
        } else if (t.animation && Object.keys(t.animation).length)
            return t.animation;
        return null
    }
    getPromiseList(e, t, i) {
        return e.containers ? e.containers.map((async e=>await this.asyncExecute(e, t, i))) : []
    }
    asyncExecute(e, t, i) {
        return new Promise((n=>{
            this.getExecuteFn(e, null, {
                type: t,
                resolve: n,
                fn: i
            })() || n(this)
        }
        ))
    }
    getCtVisible(e, t) {
        return t = t || e,
        checkLayoutType(e.parent, LAYOUT_MAP.GROUP) ? !!e.parent.visible && this.getCtVisible(e.parent, t) : t.visible
    }
    clear() {
        this.animations.clear()
    }
}
var transAnimation = new TransAnimation;
const {ENTER: ENTER$1, LEAVE: LEAVE$1} = TRANSITIONTYPE;
class Displayable {
    constructor(e, t) {
        if (!e)
            throw new Error("parent 参数不能为空");
        this.type = t.config.type,
        this.lifeCycle = createLifeCycle(this),
        this.lifeCycle.call("beforeCreate"),
        this.parent = e,
        this.config = t.config,
        this.options = t.baseOption,
        this.id = null,
        this.root = store$1.getUI(),
        this.isLock = null,
        this.selectLock = null,
        this.animation = t.baseOption.animation || null,
        this._name = null,
        this.visible = null,
        this._visible = null
    }
    get isSelected() {
        return store$1.getSelectElements().includes(this)
    }
    get children() {
        return store$1.getChildren(this)
    }
    get lock() {
        return !!this.isLock
    }
    set lock(e) {
        e !== this.isLock && (this.isLock = e,
        this._changeLock())
    }
    get name() {
        return this._name
    }
    set name(e) {
        this._name = "" + e,
        store$1.setName(this)
    }
    init() {
        var e = this.options;
        if (e.id) {
            if (store$1.getElementById(e.id))
                throw new Error(e.id + " 编号已经被使用");
            this.id = e.id
        } else
            this.id = getId(this.type.toLowerCase() || "ui");
        this.name = e.name || "",
        this.visible = this._visible = !hasOwn(e, "visible") || e.visible,
        this.isLock = (hasOwn(e, "isLock") ? e : this.config).isLock,
        this.selectLock = !1,
        this.lifeCycle.call("created")
    }
    setAnimation(e, t) {
        [ENTER$1, LEAVE$1].includes(e) && (this.animation = {
            ...this.animation
        },
        this.animation[e] = t,
        this._updateAnimation(e))
    }
    show() {
        return new Promise((e=>{
            this.visible = !0,
            transAnimation.dispense(this, ENTER$1, e),
            commandAPI.attribute(this, "show")
        }
        ))
    }
    hidden() {
        return new Promise((e=>{
            this.unselect(),
            transAnimation.dispense(this, LEAVE$1, e, this._hiddenCB),
            commandAPI.attribute(this, "hidden")
        }
        ))
    }
    setVisible(e) {
        this._visible = e,
        this.__setVisible(e)
    }
    __setVisible(e) {
        this.visible = e,
        this._setVisible(e)
    }
    update() {}
    prev() {
        return store$1.prev(this)
    }
    next() {
        return store$1.next(this)
    }
    select() {
        return !this.selectLock && !this.isSelected && this.root.selector.select(this)
    }
    unselect() {
        return !(this.selectLock || !this.isSelected) && this.root.selector.unselect(this)
    }
    zIndexUp() {
        this.style.zIndex = 1
    }
    zIndexDown() {
        this.style.zIndex = ""
    }
    toJSON() {
        var e = this.type
          , t = {
            id: this.id,
            name: this.name,
            isLock: this.isLock,
            visible: this.visible
        }
          , i = (isDef(this.penetrateOnplay) && (t.penetrateOnplay = this.penetrateOnplay),
        isDef(this.ignoreRendering) && (t.ignoreRendering = this.ignoreRendering),
        isDef(this.animation) && (t.animation = this.animation),
        this.children.map((e=>e.toJSON())));
        this.style && (t.style = this.style.getValue(),
        delete t.style.display,
        delete t.style.zIndex),
        this.adapter && isType(this.adapter.toJSON, "Function") && (t.adapter = this.adapter.toJSON()),
        e = {
            type: e,
            option: t
        };
        return i && (e.children = i),
        this.lifeCycle.call("beforeToJSON", e),
        e
    }
    destroy() {
        this.unselect()
    }
    _hiddenCB() {}
    _setVisible(e=!0) {
        return this.style.display = e ? "" : "none",
        e
    }
    _destroyTruthy() {
        this.lifeCycle.call("beforeDestroy");
        for (const e of this.children)
            e._destroyTruthy();
        return this.unselect(),
        this._destroyEvent(),
        store$1.getElementById(this.id) === this && store$1._remove(this),
        this._clearCache(this),
        !0
    }
    _clearCache(e) {
        unmount(e),
        e.el && (e.el = null),
        e.parent = null,
        e.style && e.style.destroy(),
        this.lifeCycle.call("destroyed"),
        e.lifeCycle.destroy()
    }
    _updateAnimation(e) {
        var t = transAnimation.animations.get(this);
        if (t) {
            const i = transAnimation.convert(this);
            t.animation = i,
            t.run[e] = ()=>{
                transAnimation.execute(this, i[e])
            }
        }
    }
    _changeLock() {
        this.root && (this.isLock ? this.root._setOperatHandlerDisplay({
            resize: !1,
            rotate: !1
        }) : this.root._setOperatHandlerDisplay({
            resize: !0,
            rotate: !0
        }))
    }
    _initEvent() {}
    _destroyEvent() {}
}
function getId(e) {
    var t = getUID(e);
    return store$1.getElementById(t) ? getId(e) : t
}
function checkLayoutType(e, t) {
    return layoutManager.checkLayoutType(e, t)
}
function recordBound(e=[]) {
    e.forEach((e=>{
        checkLayoutType(e, LAYOUT_MAP.GROUP) ? recordBound(e.children) : e.bound.record = e.bound.plain()
    }
    ))
}
function getParentLayer(e) {
    return e instanceof Displayable ? checkLayoutType(e, LAYOUT_MAP.LAYER) ? e : getParentLayer(e.parent) : null
}
function getElementParent(e) {
    return checkLayoutType(e, LAYOUT_MAP.GROUP) ? getElementParent(e.parent) : e
}
function getParentGroupOptionList(e, t) {
    let i = [];
    return checkLayoutType(e, LAYOUT_MAP.GROUP) && i.push(e[t]),
    checkLayoutType(e.parent, LAYOUT_MAP.GROUP) ? i.concat(getParentGroupOptionList(e.parent, t)) : i
}
function setContainerDisplay(e) {
    return e.visible && getParentGroupOptionList(e.parent, "visible").every((e=>!!e))
}
function sortLayerChildren(e) {
    if (e.length < 2)
        return e;
    const t = getLayerFlatChildren(getParentLayer(e[0]));
    return e.sort(((e,i)=>t.indexOf(e) - t.indexOf(i)))
}
function getLayerFlatChildren(e) {
    const t = [];
    return function e(i) {
        i.children && i.children.forEach((i=>{
            t.push(i),
            e(i)
        }
        ))
    }(e),
    t
}
function moveToTarget(e, t, i) {
    if (i && "before" !== i && "after" !== i)
        return log.warn("type 参数异常");
    if (!(t instanceof Displayable))
        throw Error(`目标类型错误: ${t}不是一个可视化元素的实例`);
    let n = e
      , o = t
      , r = i;
    var s;
    checkLayoutType(t, LAYOUT_MAP.GROUP) && (s = findInsertPosition(t, i),
    o = s[0],
    r = s[1]),
    n = isType(n = checkLayoutType(e, LAYOUT_MAP.GROUP) ? "after" === r ? e.containers.slice(0).reverse() : e.containers : n, "Array") ? n : [n],
    (e = isType(e, "Array") ? e : [e]).forEach((e=>{
        store$1._move(e, t, i)
    }
    )),
    n.forEach((e=>{
        e._setVisible(e.visible),
        e.id !== o.id && (mount(e, {
            el: !r && checkLayoutType(o, LAYOUT_MAP.LAYER) ? o.contentEl : o.el
        }, r),
        checkLayoutType(e, LAYOUT_MAP.CONTAINER)) && e.updateLocation()
    }
    ))
}
function checkLock(e=[]) {
    return e.every((e=>e.isLock))
}
function getRootGroup(e) {
    return checkLayoutType(e.parent, LAYOUT_MAP.GROUP) ? getRootGroup(e.parent) : e
}
function getLayerParentId(e) {
    return checkLayoutType(e.parent, LAYOUT_MAP.LAYER) ? e.parent.id : checkLayoutType(e.parent, LAYOUT_MAP.GROUP) ? getLayerParentId(e.parent) : e.id
}
function findInsertPosition(e, t) {
    var i = e.containers
      , n = e.next();
    let o, r;
    if (i.length)
        switch (r = t) {
        case "before":
            o = i.slice(0)[0];
            break;
        case "after":
            o = i.slice(-1)[0];
            break;
        default:
            o = i.slice(-1)[0],
            r = "after"
        }
    else if (n) {
        if (checkLayoutType(n, LAYOUT_MAP.GROUP))
            return findInsertPosition(n, "before");
        o = n,
        r = "before"
    } else
        o = e.getParentLayer(),
        r = "";
    return [o, r]
}
function rotateIcon() {
    return getSvg('<svg width="16px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>toolbar_xz</title>\n    <defs>\n        <filter id="filter-1">\n            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.043137 0 0 0 0 0.443137 0 0 0 0 0.901961 0 0 0 1.000000 0"></feColorMatrix>\n        </filter>\n    </defs>\n    <g id="editor" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="title-close" transform="translate(-1303.000000, -410.000000)">\n            <g transform="translate(1302.998014, 409.998014)" id="toolbar_xz">\n                <rect id="rect" x="0.0148202467" y="0.00198554907" width="16" height="16"></rect>\n                <path d="M15.7293922,5.93143319 C16.285859,8.00819582 15.983898,10.1769077 14.9301888,12.0019855 C14.6684184,12.455385 14.363472,12.8814174 14.0201308,13.2740063 L15.7086046,12.8194026 L16.0585571,14.1254431 L12.7934557,15.0003244 C12.4688679,15.0872975 12.1361367,14.9226324 12.0023882,14.6259135 L11.9654592,14.5222804 L11.0905779,11.257179 L12.3966185,10.9072265 L12.840996,12.561793 C13.19294,12.187523 13.5012471,11.7727599 13.7592249,11.3259292 C14.6354102,9.80833161 14.8860513,8.00820448 14.4233516,6.2813857 C13.4730905,2.73496316 9.82780824,0.630358437 6.2813857,1.58061949 C2.73496316,2.53088055 0.630358435,6.17616286 1.58061949,9.7225854 C1.80974321,10.5776868 2.19919885,11.3636877 2.72612438,12.0498464 C3.25774419,12.7421177 3.9219886,13.3227173 4.67804189,13.7592248 C5.33958849,14.1411689 6.06152982,14.407079 6.81138501,14.5441342 L7.13436583,14.5949458 L6.95736646,15.9354232 C5.91550503,15.7978537 4.91108799,15.4550593 4.00198558,14.9301887 C3.09288309,14.4053182 2.29380597,13.7068647 1.65373654,12.873371 C1.01902772,12.0468578 0.549907173,11.1000769 0.274578937,10.0725379 C-0.868955554,5.80480909 1.66370439,1.41811342 5.93143319,0.274578939 C10.199162,-0.868955553 14.5858577,1.66370437 15.7293922,5.93143319 Z" id="shapes-combine" fill="#007aff" fill-rule="nonzero"></path>\n            </g>\n        </g>\n    </g>\n</svg>')
}
function isMultiSelect() {
    var e = selector.getSelectElements();
    return e && 1 < e.length
}
class Storage {
    init(e) {
        db.tree.add(e, e.parent),
        db.data.add(e),
        checkLayoutType(e, LAYOUT_MAP.UI) && (this.inStack = e.config.inStack)
    }
    execute(e, ...t) {
        this.inStack && command.execute(e, ...t)
    }
    _get(e) {
        let t;
        switch (e) {
        case "tree":
            t = db.tree;
            break;
        case "stack":
            t = command.stack.get()
        }
        return t
    }
    _removeData(e) {
        (Array.isArray(e) ? e : [e]).forEach((e=>db.data.remove(e)))
    }
    _remove(e) {
        (Array.isArray(e) ? e : [e]).forEach((e=>{
            e.sublingNode = e.sublingNode || [],
            e.sublingNode.push(e.next()),
            db.tree.remove(e),
            db.data.remove(e)
        }
        ))
    }
    _removeback(e) {
        db.tree.add(e, e.parent),
        db.data.add(e);
        var t = e.sublingNode && e.sublingNode.pop();
        t && db.tree.move(e, t, "before")
    }
    _move(e, t, i) {
        (e = isType(e, "Array") ? e : [e]).forEach((e=>{
            this.moveBack || (e.sublingNode = e.sublingNode || [],
            e.fromNode = e.fromNode || [],
            e.sublingNode.push(e.next()),
            e.fromNode.push(e.parent)),
            db.tree.move(e, t, i)
        }
        ))
    }
    _moveBack(e) {
        (e = isType(e, "Array") ? e : [e]).slice(0).reverse().forEach((e=>{
            var t = e.sublingNode.pop()
              , i = e.fromNode.pop();
            this.moveBack = !0,
            e.sublingNode && t ? moveToTarget(e, t, "before") : moveToTarget(e, i),
            this.moveBack = !1
        }
        ))
    }
    prev(e) {
        return db.tree.edit("prev", e) ? db.tree.edit("prev", e).data : null
    }
    next(e) {
        return db.tree.edit("next", e) ? db.tree.edit("next", e).data : null
    }
    getUI() {
        return Array.from(db.data.getByType("ui"))[0]
    }
    getCanvas() {
        return Array.from(db.data.getByType("canvass"))
    }
    getLayers() {
        return Array.from(db.data.getByType("layers"))
    }
    getGroups() {
        return Array.from(db.data.getByType("groups"))
    }
    getContainers() {
        return Array.from(db.data.getByType("containers"))
    }
    getElementById(e) {
        return this.hasElementById(e) ? db.tree.getNodeById(e).data : null
    }
    hasElementById(e) {
        return db.tree.hasNodeById(e)
    }
    getElementsByName(e) {
        return db.data.getByName(e)
    }
    getAllElements() {
        return [...this.getLayers(), ...this.getGroups(), ...this.getContainers()]
    }
    getChildren(e) {
        return this.hasElementById(e.id) ? db.tree.getNodeById(e.id).children.map((e=>e.data)) : []
    }
    deepListByType(e, t, i=[]) {
        return e.forEach((e=>{
            t && e.type !== LAYOUT_MAP[t] || i.push(e),
            (e = this.getChildren(e)) && e.length && this.deepListByType(e, t, i)
        }
        )),
        i
    }
    getContainersByEl(e) {
        return this.deepListByType(this.getChildren(e), "CONTAINER")
    }
    getGroupsByEL(e) {
        return this.deepListByType(this.getChildren(e), "GROUP")
    }
    getAllElementsByEL(e) {
        return this.deepListByType(this.getChildren(e))
    }
    select(e) {
        this.isSelect(e) || db.selects.add(e)
    }
    unSelect(e) {
        this.isSelect(e) && db.selects.delete(e)
    }
    getSelectElements() {
        return Array.from(db.selects)
    }
    getSelectCtGroups() {
        return Array.from(db.selects).filter((e=>checkLayoutType(e, LAYOUT_MAP.CONTAINER) || checkLayoutType(e, LAYOUT_MAP.GROUP)))
    }
    isSelect(e) {
        return db.selects.has(e)
    }
    setName(e) {
        db.data.setName(e)
    }
    destroy() {
        db.tree.clear(),
        db.data.clear(),
        this.clearStack(),
        this.clearSelect()
    }
    clearStack() {
        command.stack.clear(),
        command.position = -1
    }
    clearSelect() {
        db.selects.clear()
    }
}
const store = new Storage;
command.store = store;
var store$1 = store;
class BoundingRect {
    constructor(e, t, i=0, n=0, o={
        left: 0,
        top: 0
    }, r=0) {
        this.top = isNumber(t) ? t : 0,
        this.left = isNumber(e) ? e : 0,
        this.width = i,
        this.height = n,
        this.offset = o,
        this.angle = r,
        this.record = this.plain()
    }
    static create(e, t, i) {
        return new BoundingRect(e.left,e.top,e.width,e.height,t,i)
    }
    clone() {
        return new BoundingRect(this.left,this.top,this.width,this.height,this.offset,this.angle)
    }
    setData(e) {
        Object.keys(e).forEach((t=>{
            var i = e[t];
            this.hasOwnProperty(t) && isNumber(i) && (this[t] = Math.round(i))
        }
        ))
    }
    union(e, t) {
        var i, n, o, r;
        e instanceof BoundingRect && (({top: i, left: n, right: o, bottom: r} = t ? this.plainReal() : this.plain()),
        t = t ? e.plainReal() : e.plain(),
        0 === i && 0 === n && 0 === o && 0 === r ? this.setData(t) : (this.top = Math.min(t.top, i),
        this.left = Math.min(t.left, n),
        this.width = Math.max(t.right, o) - this.left,
        this.height = Math.max(t.bottom, r) - this.top,
        this.angle = 0))
    }
    setOffset(e, t) {
        isNumber(e) || (e = 0),
        isNumber(t) || (t = 0),
        this.offset = {
            left: e,
            top: t
        }
    }
    plain() {
        return {
            top: this.top,
            left: this.left,
            right: this.left + this.width,
            bottom: this.top + this.height,
            width: this.width,
            height: this.height,
            angle: this.angle
        }
    }
    plainReal() {
        var e, t = isNumber((e = this.offset).top) ? this.top + e.top : 0;
        return {
            top: t,
            left: e = isNumber(e.left) ? this.left + e.left : 0,
            right: e + this.width,
            bottom: t + this.height,
            width: this.width,
            height: this.height,
            angle: this.angle
        }
    }
}
class Group extends Displayable {
    static factory(e, t) {
        return new Group(e,t)
    }
    static factoryConfig(e, t, i) {
        return new Group(e,t,i)
    }
    constructor(e, t, i={}) {
        if (i.isAlone) {
            if (!e || !checkLayoutType(e, [LAYOUT_MAP.LAYER, LAYOUT_MAP.GROUP]))
                throw new Error("编组创建的参数必须是图层或者编组");
            super(e, mergeOption(LAYOUT_MAP.GROUP, t, i)),
            this.init(),
            store$1.init(this)
        } else {
            if (!(e = isType(e, "Array") ? e : e ? [e] : []).length)
                throw new Error("编组创建的参数必须有值");
            let n = null
              , o = null;
            for (const t of e = Array.from(new Set(e))) {
                if (!checkLayoutType(t, [LAYOUT_MAP.GROUP, LAYOUT_MAP.CONTAINER]))
                    throw new Error("编组对象必须是编组或者容器");
                if (null === n)
                    n = t.parent.id,
                    o = t.id;
                else if (t.parent.id !== n)
                    throw new Error(`不允许元素跨层级编组：${t.id}和 ${o}不在同一级`)
            }
            super((e = sortLayerChildren(e))[0].parent, mergeOption(LAYOUT_MAP.GROUP, t, i)),
            this.init(),
            commandAPI.create(this, e, this.config.inStack)
        }
    }
    get bound() {
        var {left: e, top: t} = this.getParentLayer().bound;
        return unionBound(this.children, {
            x: e,
            y: t
        })
    }
    get groups() {
        return store$1.getGroupsByEL(this)
    }
    get containers() {
        return store$1.getContainersByEl(this)
    }
    init() {
        super.init(),
        this._showCts = []
    }
    mount() {
        if (!this.parent)
            return !1;
        let e = this.parent
          , t = null;
        var i;
        checkLayoutType(e, LAYOUT_MAP.GROUP) && ((i = this.next()) ? (e = i,
        t = "before") : e = getElementParent(e)),
        this.lifeCycle.call("beforeMount"),
        this._isMounted = !0,
        this.groups.forEach((e=>e._isMounted = !0)),
        this.containers.forEach((i=>{
            i.isMounted && mount(i, e, t)
        }
        )),
        this.lifeCycle.call("mounted")
    }
    unmount() {
        this._isMounted = !1,
        this.groups.forEach((e=>e._isMounted = !1)),
        this.containers.forEach((e=>{
            unmount(e)
        }
        ))
    }
    add(e) {
        if (!(e = isType(e, "Array") ? e : e ? [e] : []).length)
            return !1;
        for (const t of e = Array.from(new Set(e)))
            if (!checkLayoutType(t, [LAYOUT_MAP.GROUP, LAYOUT_MAP.CONTAINER]) || t.parent === this || t === this)
                throw new Error("target 参数必须是同一个图层的其他编组或者容器，并且父节点不能是自己");
        return commandAPI.move(e, this),
        !0
    }
    moveToTarget(e, t) {
        return t || checkLayoutType(e, [LAYOUT_MAP.LAYER, LAYOUT_MAP.GROUP]) || e === this ? t && !checkLayoutType(e, [LAYOUT_MAP.CONTAINER, LAYOUT_MAP.GROUP]) && e !== this ? log.warn("编组只能移动到容器或者其他编组旁边") : (commandAPI.move(this, e, t),
        this.root.operation.repaint(),
        !0) : log.warn("编组只能移动到图层或者其他编组里面")
    }
    zIndexUp() {
        this.containers.forEach((e=>{
            e.style.zIndex = 1
        }
        ))
    }
    zIndexDown() {
        this.containers.forEach((e=>{
            e.style.zIndex = ""
        }
        ))
    }
    async show() {
        if (this._visible)
            return this;
        this.root.emit("beforeShow", this);
        var e = await super.show();
        return this.root.emit("afterShow", this),
        e
    }
    async hidden() {
        if (!this._visible)
            return this;
        this.root.emit("beforeHidden", this);
        var e = await super.hidden();
        return this.root.emit("afterHidden", this),
        e
    }
    move(e, t) {
        this.containers.forEach((i=>i.move(e, t)))
    }
    getParentLayer() {
        return getParentLayer(this.parent)
    }
    destroy() {
        this.lifeCycle.call("beforeDestroy"),
        commandAPI.destroy(this),
        this.lifeCycle.call("destroyed")
    }
    dismiss() {
        commandAPI.dismiss(this)
    }
    _hiddenCB(e) {
        e.forEach((e=>e.setVisible(!0)))
    }
    _setVisible() {
        this.containers.forEach((e=>e._setVisible()))
    }
}
function unionBound(e, t) {
    const i = new BoundingRect;
    return i.setOffset(t.x, t.y),
    e.length && e.forEach((e=>i.union(e.bound))),
    i.angle = 0,
    i
}
class Selector {
    constructor() {
        this.isMultSelect = !1,
        this.selectLayerId = "",
        this.record = ["auto"]
    }
    get root() {
        return store$1.getUI()
    }
    get last() {
        var e = this.getSelectElements()
          , t = e.length;
        return e.length ? e[t - 1] : null
    }
    select(e) {
        return !(!this.root || !e || !(e = isType(e, "Array") ? e : [e]).length || ((e = this._select(e)).length && this.root.emit("select", e),
        (this.record.length || e.length) && this.root.emit("selectElements", this.getSelectElements()),
        this.record = e,
        0))
    }
    _select(e) {
        const t = this.root.config.notSelectLayer;
        return this.isMultSelect || this.clear(),
        e.map((e=>{
            var i, {selectLayerId: n, selfLayer: o} = this._getLayerInfo(e);
            return this.selectLayerId && n !== this.selectLayerId && (i = db.tree.getNodeById(this.selectLayerId)) && (!t || o) && i.data.zIndexDown(),
            this.selectLayerId = n,
            e.zDown || e.zIndexUp(),
            o && t ? null : (store$1.select(e),
            e)
        }
        )).filter(Boolean)
    }
    _getLayerInfo(e) {
        switch (e.type) {
        case LAYOUT_MAP.LAYER:
            return {
                selectLayerId: e.id,
                selfLayer: !0
            };
        case LAYOUT_MAP.CONTAINER:
        case LAYOUT_MAP.GROUP:
            return {
                selectLayerId: getParentLayer(e).id,
                selfLayer: !1
            };
        default:
            return {
                selectLayerId: "",
                selfLayer: !1
            }
        }
    }
    unselect(e) {
        var t;
        return !!this.root && (t = this.getSelectElements(),
        (e = isType(e, "Array") ? e : [e]).forEach((e=>{
            store$1.unSelect(e)
        }
        )),
        this.zIndexDown(e),
        this.root.emit("unselect", e),
        0 < t.length && this.root.emit("selectElements", this.getSelectElements()),
        !0)
    }
    zIndexDown(e) {
        e.forEach((e=>{
            e.type === LAYOUT_MAP.LAYER && this.selectLayerId === e.id || e.zIndexDown()
        }
        ))
    }
    clear() {
        var e = this.getSelectElements();
        e.forEach((e=>e.zIndexDown())),
        store$1.clearSelect(),
        this.root.emit("unselect", e);
        let t = ()=>"";
        return e.length ? ()=>{
            this.record = [],
            this.root.emit("selectElements", this.getSelectElements())
        }
        : t
    }
    delete(e) {
        if (!(e = switchElements.call(this, e)))
            return !1;
        e.forEach((e=>{
            store$1.unSelect(e),
            e.destroy()
        }
        )),
        this.root.emit("delete")
    }
    getSelectElements() {
        return store$1.getSelectElements()
    }
    getContainers() {
        return unrepeatContainers(this.getSelectElements())
    }
    getGroups() {
        return unrepeatGroups(this.getSelectElements())
    }
    getLayers() {
        return this.getSelectElements().filter((e=>checkLayoutType(e, LAYOUT_MAP.LAYER)))
    }
    enableMultSelect() {
        this.isMultSelect = !0
    }
    disableMultSelect() {
        this.isMultSelect = !1
    }
    move(e, t) {
        this.getContainers().forEach((i=>i.move(e, t)))
    }
    createGroup(e) {
        return (e = switchElements.call(this, e)) ? (e = new Group(e),
        this.clear(),
        store$1.select(e),
        this.root.emit("select", e),
        e) : null
    }
    cancelGroup(e) {
        (e = switchElements.call(this, e)) && e.forEach((e=>{
            checkLayoutType(e, LAYOUT_MAP.GROUP) && (e.zIndexDown(),
            e.dismiss())
        }
        ))
    }
}
function unrepeatContainers(e=[], t=[]) {
    return e.forEach((e=>{
        checkLayoutType(e, LAYOUT_MAP.CONTAINER) && !t.includes(e) && t.push(e),
        checkLayoutType(e, LAYOUT_MAP.GROUP) && unrepeatContainers(store$1.getContainersByEl(e), t)
    }
    )),
    t
}
function unrepeatGroups(e=[], t=[]) {
    return e.forEach((e=>{
        checkLayoutType(e, LAYOUT_MAP.GROUP) && (t.includes(e) || t.push(e),
        unrepeatGroups(store$1.getGroupsByEL(e), t))
    }
    )),
    t
}
function switchElements(e) {
    var t;
    return isUnDef(e) ? (t = this.getSelectElements()).length ? t : null : isType(e, "Array") ? void 0 : [e]
}
var selector = new Selector;
const ALPHA = 3;
class TextEditor {
    constructor() {
        this.target = null,
        this.isInEdit = !1,
        this.isOutEdit = !1,
        this._textEditAbout = null,
        this._handlerState = null,
        this._textBUStyle = Object.create(null),
        this._blur = null,
        this._leave = null
    }
    openTextEdit(e) {
        e.textEditState = !0
    }
    closeTextEdit(e) {
        e.textEditState = !1
    }
    readyTextEdit(e, t) {
        e.textEditState && !this.isInEdit && (this.target = e,
        this._textEditAbout = Object.create(null),
        this._textEditAbout.contentValue = t)
    }
    enterTextEdit(e) {
        var t;
        isUnDef(e = this._checkBeforeEdit(e)) || (e.maskEl.style.display = "none",
        (t = e.app.dom) && (this.matchDom(t, e),
        this.isInEdit) && (e.root.emit("inTextEdit"),
        e.root.closeRegionSelect(),
        this._handlerState = e.root.getOperatHandlerDisState(),
        e.root._setOperatHandlerDisplay({
            resize: !1,
            rotate: !1,
            sizeLabel: !1
        }, !0)))
    }
    matchDom(e, t) {
        Array.from(e.children).forEach((e=>{
            var i;
            this.isInEdit || (e.children && e.children.length ? this.matchDom(e, t) : isDef(e.textContent) && this._textEditAbout && e.textContent.trim() === this._textEditAbout.contentValue.trim() && (i = e.cloneNode(!0),
            e.parentElement.appendChild(i),
            this._blur = blur.bind(this),
            this._leave = leave.bind(this, i),
            bind(t.el, "mouseleave", this._leave),
            this.setTextAboutStyle(i, e, t),
            i.setAttribute("contenteditable", !0),
            this._textEditAbout.selfEl = e,
            ((this._textEditAbout.cloneEl = i).firstChild ? setRange : setEmptyRange)(i),
            this.isInEdit = !0))
        }
        ))
    }
    setTextAboutStyle(e, t, i) {
        let n;
        this._textBUStyle.textStyle = {
            display: t.style.display || "",
            "-webkit-line-clamp": t.style["-webkit-line-clamp"] || "",
            "-webkit-box-orient": t.style["-webkit-box-orient"] || ""
        },
        Object.assign(t.style, {
            display: "none"
        }),
        t = e.parentElement,
        this._textBUStyle.parentStyle = {
            whiteSpace: t.style.whiteSpace || "",
            textOverflow: t.style.textOverflow || "",
            overflow: t.style.overflow || "",
            wordBreak: t.style.wordBreak || ""
        },
        Object.assign(t.style, {
            whiteSpace: "unset",
            textOverflow: "unset",
            overflow: "unset",
            wordBreak: "break-word"
        });
        t = e.style.color;
        var {maxHeight: t, maxWidth: i} = (n = t && "transparent" !== t && "0" !== getRgbaNum(t, ALPHA) ? "auto" : "white",
        getMaxHW(i));
        Object.assign(e.style, {
            whiteSpace: "pre-wrap",
            textOverflow: "unset",
            overflow: "hidden",
            wordBreak: "break-word",
            outline: "none",
            pointerEvents: "all",
            cursor: "text",
            animation: "",
            caretColor: n,
            "-webkit-line-clamp": "",
            padding: "0 2px",
            maxHeight: t + "px",
            maxWidth: i + "px",
            minWidth: "2px"
        })
    }
    exitTextEdit() {
        var e, t, i, n = this._checkAfterEdit();
        isUnDef(n) ? this.isOutEdit = !1 : (n.root.openRegionSelect(),
        ({resizeDis: t, rotateDis: i, sizeLabelDis: e} = this._handlerState),
        n.root._setOperatHandlerDisplay({
            resize: t,
            rotate: i,
            sizeLabel: e
        }, !1),
        this.resetStyle(n),
        (t = this._textEditAbout.cloneEl) && (i = getTextContent(t),
        unbind(t, "blur", this._blur),
        unbind(n.el, "mouseleave", this._leave),
        t.remove(),
        n.root.emit("afterTextEdit", i, n)),
        this.reset())
    }
    resetStyle(e) {
        e.maskEl.style.display = "",
        e = this._textEditAbout.selfEl,
        this._textBUStyle.textStyle && Object.assign(e.style, this._textBUStyle.textStyle),
        this._textBUStyle.parentStyle && Object.assign(e.parentElement.style, this._textBUStyle.parentStyle)
    }
    reset() {
        this.target = null,
        this.isInEdit = !1,
        this.isOutEdit = !1,
        this._textEditAbout = null,
        this._handlerState = null,
        this._blur = null,
        this._leave = null,
        this._textBUStyle = Object.create(null)
    }
    _checkBeforeEdit(e) {
        var t = selector.getSelectElements();
        return 1 < t.length ? null : (e && e.select(),
        (e = e || this.target || t[0]) && e.textEditState && !this.isInEdit && e.isSelected ? (e.root.emit("beforeTextEdit", e),
        e) : null)
    }
    _checkAfterEdit() {
        if (this.isOutEdit)
            return null;
        this.isOutEdit = !0;
        var e = this.target;
        return e && e.textEditState && this.isInEdit ? e : null
    }
}
var textEditor = new TextEditor;
function getTextContent(e) {
    let t = "";
    var i = e.childNodes;
    for (let e, n = 0; e = i && i[n]; n++)
        3 === e.nodeType ? t += getTextValue(e) : 1 === e.nodeType ? t += getDivValue(e) : t += e.innerText;
    return t.endsWith("\n") && "\n\n" !== t.slice(-2) ? t.slice(0, t.length - 1) : t
}
function getTextValue(e) {
    var t = e.nodeValue;
    return t ? e.nextSibling && 3 !== e.nextSibling.nodeType ? t + "\n" : t : ""
}
function getDivValue(e) {
    var t = e.innerText;
    return t ? t.endsWith("\n") && !e.nextSibling ? t.slice(0, t.length - 1) : t.endsWith("\n") || !e.nextSibling ? t : t + "\n" : ""
}
function setEmptyRange(e) {
    e.style.width || (e.style.minWidth = "2px"),
    e.innerHTML = "&nbsp",
    setRange(e),
    e.innerHTML = ""
}
function setRange(e) {
    var t = document.createRange();
    (e = (t.selectNodeContents(e),
    document.getSelection())).removeAllRanges(),
    e.addRange(t)
}
function blur() {
    this.exitTextEdit()
}
function leave(e) {
    bind(e, "blur", this._blur)
}
function getRgbaNum(e, t) {
    return /^rgba\(/.test(e) ? e.match(/(\d(\.\d+)?)+/g)[t] : null
}
function getMaxHW(e) {
    var t = e.root.canvas.getZoom()
      , {top: i, left: n, width: o, height: r} = e.bound.plainReal()
      , {width: s, height: a} = e.root.bound
      , s = s / t
      , a = a / t
      , {top: l, left: c} = e.root.el.getBoundingClientRect()
      , {top: e, left: h} = e.root.canvas.el.getBoundingClientRect()
      , l = (e = (e - l) / t + i,
    (h - c) / t + n);
    return {
        maxHeight: 0 < a - e ? Math.floor(a - e) : r,
        maxWidth: 0 < s - l ? Math.floor(s - l) : o
    }
}
class NextTick {
    constructor() {
        this.microCaches = [],
        this.pending = !1
    }
    _flushMicroQueue() {
        for (this.pending = !1; this.microCaches.length; )
            this.microCaches.shift()()
    }
    call(e, t) {
        let i;
        return this.microCaches.push((()=>{
            try {
                e ? e.call(t) : i(t)
            } catch (e) {
                log.warn(e)
            }
        }
        )),
        this.pending || (this.pending = !0,
        Promise.resolve().then(this._flushMicroQueue.bind(this))),
        e ? i : new Promise((e=>{
            i = e
        }
        ))
    }
}
var nextTick = new NextTick;
class EventEmitter {
    constructor() {
        this.eventTypes = {},
        this.eventFns = {}
    }
    on(e, t, i=this) {
        return this.hasType(e) || (this.eventTypes[e] = e,
        this.eventFns[e] = []),
        this.eventFns[e].push([t, i]),
        this
    }
    once(e, t, i) {
        const n = (...o)=>{
            this.off(e, n),
            t.apply(i, o)
        }
        ;
        return n.fn = t,
        this.on(e, n),
        this
    }
    off(e, t, i) {
        if (e || t) {
            if (this.hasType(e))
                if (t) {
                    var n, o, r = this.eventFns[e];
                    let s = r.length;
                    for (; -1 < s; )
                        r[s] ? ([n,o] = r[s],
                        n !== t && n.fn !== t || i && o !== i || r.splice(s, 1),
                        s--) : s--
                } else
                    this.eventFns[e] = []
        } else
            this.destroyEvents();
        return this
    }
    emit(e, ...t) {
        if (this.hasType(e) && (e = this.eventFns[e]) && e.length)
            for (const o of [...e]) {
                var [i,n] = o;
                i.apply(n, t)
            }
        return this
    }
    destroyEvents() {
        this.eventTypes = {},
        this.eventFns = {}
    }
    hasType(e) {
        return this.eventTypes[e] === e
    }
}
class ElementMove {
    constructor(e, t) {
        this.instance = e,
        this.mouseMoveInfo = t
    }
    elementMove() {
        var {left: e, top: t} = this.instance.bound.record;
        this.instance.setBound({
            left: e + this.mouseMoveInfo.x,
            top: t + this.mouseMoveInfo.y
        })
    }
}
class GraphEvent {
    constructor() {
        this.instance = null,
        this.target = null
    }
    init(e) {
        this.instance = e,
        this.moveModule = new ElementMove
    }
    mouseOverEvent(e) {
        (e = getRootGroup(e)).isSelected || this.instance.emit("graphMouseover", e.bound.plainReal(), e)
    }
    mouseMoveEvent(e, t) {
        e.isSelected || (checkLayoutType(getRootGroup(e), LAYOUT_MAP.GROUP) && (t.ctrlKey || t.metaKey) ? e.showPreSelector() : e.hiddenPreSelector())
    }
    mouseOutEvent(e) {
        e.hiddenPreSelector(),
        this.instance.emit("graphMouseout")
    }
}
var graphEvent = new GraphEvent;
class Sequence {
    constructor() {
        this.totalTick = [],
        this.totalCallbacks = [],
        this.callbacks = [],
        this.ticks = [],
        this._ticks = [],
        this._tier = 0,
        this._callback = null,
        this._ranTicks = []
    }
    addTicks(e, t, i) {
        confirmArr(e) && (this._ticks = e,
        this._tier = t,
        this._callback = i,
        this.add())
    }
    add() {
        this.ticks.length ? this.handleRunningTicks() : this.handleTotalTick()
    }
    handleRunningTicks() {
        var {_ticks: e, _tier: t, _callback: i} = this;
        1 === t || this.isEveryInfinite(e) ? (this.ticks.push(e),
        this.callbacks.push(i),
        this.totalTick.push([]),
        this.totalCallbacks.push([])) : 1 < t && this.handleTotalTick()
    }
    handleTotalTick() {
        var {_ticks: e, _tier: t, _callback: i} = this;
        1 === t ? (this.totalTick.push([e]),
        this.totalCallbacks.push([i])) : this.totalTick.length && (this.totalTick[this.totalTick.length - 1].push(e),
        this.totalCallbacks[this.totalCallbacks.length - 1].push(i))
    }
    isFinish() {
        return this.totalTick.flat().length < 1 && this.ticks.flat().filter((e=>isDef(e))).length < 1
    }
    getCurrentTicks() {
        var e = this.isEveryInfinite()
          , t = this.getRunEndTicks();
        return !this.ticks.length || t.length || e ? (this.totalTick.length && (this.ticks.length ? t.forEach((e=>{
            this.totalTick[e] && (this.ticks[e] = this.totalTick[e].shift(),
            this.callbacks[e] = this.totalCallbacks[e].shift())
        }
        )) : this.totalTick.forEach(((e,t)=>{
            this.ticks.push(e.shift()),
            this.totalCallbacks[t] && this.callbacks.push(this.totalCallbacks[t].shift())
        }
        ))),
        this._filterSameAnimation()) : this._filterSameAnimation(),
        this.ticks
    }
    isEveryInfinite(e) {
        return (e = e || this.ticks.flat().filter((e=>isDef(e)))).length && e.every((e=>e.infinite))
    }
    getRunEndTicks() {
        const e = [];
        return this.ticks.forEach(((t,i)=>{
            t && t.every((e=>isUnDef(e))) && e.push(i)
        }
        )),
        e
    }
    endAnimation() {
        this.ticks.forEach((e=>{
            e && e.forEach((e=>{
                isDef(e) && e._after(!0)
            }
            ))
        }
        )),
        this._ranTicks.forEach((e=>{
            e._after(!0)
        }
        )),
        this.totalTick = [],
        this.ticks = [],
        this.totalCallbacks = [],
        this.callbacks = [],
        this._ranTicks = [],
        this._ticks = [],
        this._tier = 0,
        this._callback = null
    }
    _recordRanTick(e) {
        this._ranTicks.push(e)
    }
    _endAnimation(e) {
        let t = !1;
        return this.ticks.forEach((i=>{
            i && i.forEach((i=>{
                isDef(i) && i.target.id === e.id && (t = !0,
                i._after(!0))
            }
            ))
        }
        )),
        this._ranTicks.forEach((t=>{
            t.target.id === e.id && t._after(!0)
        }
        )),
        this.totalTick = this.totalTick.filter((t=>t[0] && t[0][0].target.id !== e.id)),
        this.ticks = this.ticks.filter((t=>t && t[0] && t[0].target.id !== e.id)),
        this._ranTicks = [],
        t
    }
    _filterSameAnimation() {
        this.ticks.length && this.ticks.reduce(((e,t,i,n)=>(e && t && e.concat(t).reduce(((e,t,o)=>(e && t && e.type === t.type && e.target === t.target && (n[i - 1][o - 1] = null),
        t))),
        t)))
    }
}
const DEFAULTLIST = {
    fromTop: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[1] : i,
    {
        translate: [0, (e.bottom - t.top) / i]
    }),
    fromLeft: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[0] : i,
    {
        translate: [(e.right - t.left) / i, 0]
    }),
    fromRight: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[0] : i,
    {
        translate: [(-t.right + e.left) / i, 0]
    }),
    fromBottom: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[1] : i,
    {
        translate: [0, (-t.bottom + e.top) / i]
    }),
    toTop: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[1] : i,
    {
        translate: [0, (-e.bottom + t.top) / i]
    }),
    toLeft: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[0] : i,
    {
        translate: [(-e.right + t.left) / i, 0]
    }),
    toRight: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[0] : i,
    {
        translate: [(t.right - e.left) / i, 0]
    }),
    toBottom: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[1] : i,
    {
        translate: [0, (t.bottom - e.top) / i]
    })
}
  , DEFAULTFLYLIST = {
    fromFlyTop: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[1] : i,
    {
        translate: [0, (e.bottom - t.top) / i]
    }),
    fromFlyLeft: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[0] : i,
    {
        translate: [(e.right - t.left) / i, 0]
    }),
    fromFlyRight: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[0] : i,
    {
        translate: [(-t.right + e.left) / i, 0]
    }),
    fromFlyBottom: ({t: e, c: t, r: i})=>(i = isType(i, "Array") ? i[1] : i,
    {
        translate: [0, (-t.bottom + e.top) / i]
    }),
    toFlyTop: ({b: e, r: t})=>(isType(t, "Array") && t[1],
    {
        translate: [0, -e.height]
    }),
    toFlyLeft: ({b: e, r: t})=>(isType(t, "Array") && t[0],
    {
        translate: [-e.width, 0]
    }),
    toFlyRight: ({b: e, r: t})=>(isType(t, "Array") && t[0],
    {
        translate: [e.width, 0]
    }),
    toFlyBottom: ({b: e, r: t})=>(isType(t, "Array") && t[1],
    {
        translate: [0, e.height]
    })
}
  , scaleInFn = ({s: e})=>({
    scale: e
})
  , DEFAULTSCALELIST = {
    fromZoomInVer: scaleInFn,
    fromZoomInHor: scaleInFn,
    fromZoomIn: scaleInFn,
    fromZoomOutVer: scaleInFn,
    fromZoomOutHor: scaleInFn,
    fromZoomOut: scaleInFn,
    toZoomInVer: ({s: e})=>({
        scale: [e[0], 1.5 * e[1]]
    }),
    toZoomInHor: ({s: e})=>({
        scale: [1.5 * e[0], e[1]]
    }),
    toZoomIn: ({s: e})=>({
        scale: [1.5 * e[0], 1.5 * e[1]]
    }),
    toZoomOutVer: ({s: e})=>({
        scale: [e[0], .5 * e[1]]
    }),
    toZoomOutHor: ({s: e})=>({
        scale: [.5 * e[0], e[1]]
    }),
    toZoomOut: ({s: e})=>({
        scale: [.5 * e[0], .5 * e[1]]
    })
}
  , DEFAULTFADELIST = {
    fadeOut: e=>({
        opacity: 0
    }),
    fadeIn: e=>({
        opacity: e.style.opacity || 1
    })
}
  , ANIMATELIST = {
    ...DEFAULTLIST,
    ...DEFAULTFLYLIST,
    ...DEFAULTSCALELIST,
    ...DEFAULTFADELIST
};
class SceneTransition {
    constructor() {
        this.param = {},
        this.typeCache = null,
        this.defaultTypes = Object.keys(DEFAULTLIST).concat(Object.keys(DEFAULTFLYLIST)).concat(Object.keys(DEFAULTSCALELIST)).concat(Object.keys(DEFAULTFADELIST))
    }
    animator(e) {
        return this._dealAnimation(e),
        {
            ...e,
            animation: this.param,
            typeCache: this.typeCache
        }
    }
    registAnimation({name: e, animation: t}) {
        return this._isDefaultType(e) || ["fadeIn", "fadeOut"].includes(e) ? (log.warn(`Warn Animation: custom type '${e}' can not be one of ${this.defaultTypes},fadeIn,fadeOut`),
        !1) : (isType(e, "String") && isType(t, "Function") && (ANIMATELIST[e] = t),
        !0)
    }
    _getTranslate(e, t) {
        var i, n;
        return checkRegExp("^toFly.*$", t) ? this._getFlyToExecution(e, t) : checkRegExp("^(fromZoom)|(toZoom).*$", t) ? this._getZoomExecution(e, t) : checkRegExp("^fade.*$", t) ? this._getFadeExecution(e, t) : (i = e.el.getBoundingClientRect(),
        n = e.root.canvas.el.getBoundingClientRect(),
        e = e.root.canvas.getZoom(!0),
        ANIMATELIST[t]({
            t: i,
            c: n,
            r: e
        }))
    }
    _getFlyToExecution(e, t) {
        var i = e.bound;
        e = e.root.canvas.getZoom(!0);
        return ANIMATELIST[t]({
            b: i,
            r: e
        })
    }
    _getZoomExecution(e, t) {
        return e = e.style.scale || [1, 1],
        ANIMATELIST[t]({
            s: e
        })
    }
    _getFadeExecution(e, t) {
        return ANIMATELIST[t](e)
    }
    _dealAnimation(e) {
        var {target: t, animation: i} = e;
        if (isType(i, "Array"))
            return i.map((t=>{
                this._dealAnimation({
                    ...e,
                    animation: t
                })
            }
            )),
            !0;
        if (isType(i, "Object") && (this._isDefaultType(i.type) ? this.param = {
            ...this.param,
            ...i.animation
        } : this.param = {
            ...this.param,
            ...i
        }),
        this._isDefaultType(i))
            return this.param = {
                ...this.param,
                ...this._getTranslate(t, i)
            },
            this.typeCache = i,
            !0;
        if (Object.keys(ANIMATELIST).includes(i)) {
            try {
                isType(ANIMATELIST[i](t), "Object") && (this.param = {
                    ...this.param,
                    ...ANIMATELIST[i](t)
                })
            } catch (t) {
                log.error(t)
            }
            return !0
        }
        return isType(i, "String") && !Object.keys(ANIMATELIST).includes(i) && log.warn(`Warn Animation: '${i}' type has not been registered`),
        {}
    }
    _isDefaultType(e) {
        return this.defaultTypes.includes(e)
    }
}
class Tick {
    constructor(e) {
        this.typeCache = e.typeCache,
        this.type = e.type,
        this.value = e.endValue,
        this.target = e.target,
        this.callback = e.callback,
        this.duration = e.duration || 0,
        this.delay = e.delay || 0,
        this.infinite = e.infinite || !1,
        this.easingType = e.easing || "linear",
        this.animation = e.animation,
        this.startTime = 0,
        this.endTime = 0,
        this.doneTime = 0,
        this.doingTime = 0,
        this.startValue = null,
        this.currentValue = null,
        this.endValue = null,
        this.isResume = !1,
        this.stopped = !1,
        this.ended = !1,
        this.record = {
            delay: this.delay
        },
        this.easing = {
            linear: (e,t,i,n)=>i * (e / n) + t,
            easeOut: (e,t,i,n)=>-i * (Math.pow(e / n - 1, 4) - 1) + t
        },
        this.defaultValue = {
            translate: [0, 0],
            scale: [1, 1],
            skew: [0, 0],
            opacity: 1,
            rotate: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        }
    }
    init() {
        if (!this.stopped) {
            this.startTime = this.startTime || this._getNow();
            var e = this._getNow();
            if (e === this.startTime && this._before(),
            this._getNow() - this.startTime < this.delay)
                return !0;
            if (!((this.endTime || this.startTime + this.duration + this.delay) < e))
                return this._run(),
                !0;
            this.ended = !0,
            this._after(),
            this.infinite && (this.startTime = 0,
            this.endTime = 0,
            this.delay = this.record.delay,
            this.isResume = !1),
            this.callback && isType(this.callback, "Function") && this.callback(this.target)
        }
        return !1
    }
    pause() {
        this.stopped = !0,
        this.doneTime = this._getNow() - this.startTime - this.delay
    }
    resume() {
        return !(!this.stopped || (this.isResume = !0,
        this.record.delay = this.delay,
        this.delay = 0,
        this.startTime = this._getNow(),
        this.endTime = this.duration - this.doneTime + this._getNow(),
        this.stopped = !1))
    }
    _before() {
        this.target.__setVisible(!0);
        var e = this.typeCache;
        e && (checkRegExp("^toZoom.*$", e) ? this.target.style.transformOrigin = "top left" : checkRegExp("^(from)|(fadeIn).*$", e) && ("translate" === this.type && (this._setFromFlyValue(),
        e = this._getValue(this.type),
        this.target.style.translate = [-this.value[0] + e[0], -this.value[1] + e[1]]),
        "scale" === this.type && this._setFromZoomValue(),
        "opacity" === this.type) && (this.target.style.opacity = 0))
    }
    _after(e=!1) {
        this.target.style[this.type] = this.endValue;
        var t = this.typeCache;
        t && (checkRegExp("^fromZoom.*$", t) ? this.target.style.transformOrigin = "" : checkRegExp("^(to)|(fadeOut).*$", t) && (e || this.target.__setVisible(!1),
        "translate" === this.type && (this.target.style.translate = this.startValue),
        "opacity" === this.type && (this.target.style.opacity = this.startValue),
        "scale" === this.type) && (this.target.style.scale = this.startValue,
        this.target.style.transformOrigin = ""))
    }
    _run() {
        if (!this.target)
            return !1;
        this.startValue = this.startValue || this._getValue(this.type),
        this.endValue = this.endValue || this._getEndValue(this.value);
        var e = this._getNow();
        return this.isResume ? this.doingTime = e - this.startTime + this.doneTime : this.doingTime = e - this.startTime - this.delay,
        this.currentValue = isType(this.endValue, "Array") ? this.endValue.map(((e,t)=>this.easing[this.easingType](this.doingTime, this.startValue[t], e - this.startValue[t], this.duration))) : this.easing[this.easingType](this.doingTime, this.startValue, this.endValue - this.startValue, this.duration),
        this.target.style[this.type] = this.currentValue,
        !0
    }
    _getValue(e) {
        var t = this.target.style[this.type];
        return isDef(t) ? t : this.defaultValue[e]
    }
    _getEndValue(e) {
        var t = {
            "[object Array]": e,
            "[object String]": [Number(e), Number(e)],
            "[object Number]": [e, e]
        };
        let i = e;
        return ["translate", "scale", "skew"].includes(this.type) && (i = t[Object.prototype.toString.call(e)]),
        "translate" === this.type ? i.map(((e,t)=>e + this.startValue[t])) : i
    }
    _getNow() {
        return Date.now()
    }
    _setFromFlyValue() {
        if (checkRegExp("^fromFly.*$", this.typeCache)) {
            var e = this.target.style.width
              , t = this.target.style.height;
            switch (this.typeCache) {
            case "fromFlyTop":
                this.value = [0, t];
                break;
            case "fromFlyBottom":
                this.value = [0, -t];
                break;
            case "fromFlyLeft":
                this.value = [e, 0];
                break;
            case "fromFlyRight":
                this.value = [-e, 0]
            }
        }
    }
    _setFromZoomValue() {
        var e = this.typeCache;
        if (checkRegExp("^fromZoom.*$", e)) {
            var t = this._getValue(this.type);
            let i = [];
            switch (e) {
            case "fromZoomInVer":
                i = [1, .5];
                break;
            case "fromZoomInHor":
                i = [.5, 1];
                break;
            case "fromZoomIn":
                i = [.5, .5];
                break;
            case "fromZoomOutVer":
                i = [1, 1.5];
                break;
            case "fromZoomOutHor":
                i = [1.5, 1];
                break;
            case "fromZoomOut":
                i = [1.5, 1.5]
            }
            this.target.style.transformOrigin = "top left",
            this.target.style.scale = [i[0] * t[0], i[1] * t[1]]
        }
    }
}
class Animator {
    constructor(e, t) {
        this.opts = e,
        this.target = t,
        this.tweens = [],
        this.init()
    }
    init() {
        isType(this.opts, "Array") ? this.opts.forEach((e=>{
            this._dealTarget(e)
        }
        )) : this._dealTarget(this.opts)
    }
    _dealTarget(e) {
        let t = e.target;
        isUnDef(t) && (t = this.target,
        e[t] = this.target),
        confirmArr(t) ? t.forEach((t=>{
            this._dealGroup(t, e)
        }
        )) : this._dealGroup(t, e)
    }
    _dealGroup(e, t) {
        checkLayoutType(e, LAYOUT_MAP.GROUP) ? e.containers.forEach((e=>{
            this._dealAnimation({
                ...t,
                target: e
            })
        }
        )) : this._dealAnimation({
            ...t,
            target: e
        })
    }
    _dealAnimation(e) {
        isType(e.animation, "Object") ? this._createTick(e) : this._createTick((new SceneTransition).animator(e))
    }
    _createTick(e) {
        const t = Object.keys(e.animation);
        t.forEach(((i,n)=>{
            this.tweens = [...this.tweens, new Tick({
                ...e,
                type: i,
                endValue: e.animation[i],
                callback: n === t.length - 1 ? e.callback : null
            })]
        }
        ))
    }
}
class AnimatorManager {
    constructor(e, t) {
        this.sequence = t || new Sequence,
        this._running = e || !1,
        this._tier = 1,
        this._instance = null,
        this._callbacks = []
    }
    run(e, t, i) {
        return this.sequence.addTicks(new Animator(e,i).tweens, this._tier, t),
        this._startLoop(),
        this.initRunner(),
        this._instance
    }
    initRunner() {
        this._instance = new AnimatorManager(this._running,this.sequence),
        this._instance._tier = this._tier + 1,
        this._instance._callbacks = this._callbacks
    }
    end() {
        if (!this._running)
            return !1;
        this._running = !1,
        this._callbacks = [],
        this.sequence.endAnimation()
    }
    pause() {
        if (isUnDef(this.ticks))
            return !1;
        this._running = !1,
        this.ticks.flat().forEach((e=>e && e.pause()))
    }
    resume() {
        if (isUnDef(this.ticks))
            return !1;
        this.ticks.flat().forEach((e=>e && e.resume())),
        this._startLoop()
    }
    getCallback() {
        return this.sequence.totalCallbacks
    }
    register({name: e, animation: t}) {
        (new SceneTransition).registAnimation({
            name: e,
            animation: t
        })
    }
    _startLoop() {
        if (this._running)
            return !1;
        const e = this;
        return e._running = !0,
        window.requestAnimationFrame((function t() {
            e._running && (window.requestAnimationFrame(t),
            e._flush())
        }
        )),
        !0
    }
    _flush() {
        const e = this.sequence.callbacks;
        if (this.ticks = this.sequence.getCurrentTicks(),
        this.ticks.forEach(((t,i)=>{
            t && t.forEach(((n,o)=>{
                !isDef(n) || n.init() || n.infinite || (this.sequence._recordRanTick(n),
                t.splice(o, 1, null)),
                t.every((e=>isUnDef(e))) && (e[i] && isType(e[i], "Function") && e[i](),
                e[i] = null)
            }
            ))
        }
        )),
        this.sequence.isFinish()) {
            this._running = !1;
            var t = this._callbacks.length;
            for (let e = 0; e < t; e++) {
                var [i,,] = this._callbacks.shift();
                isType(i, "Function") && i()
            }
        }
    }
    _registerCallback(e, t) {
        isType(e, "Function") && this._callbacks.push([e.bind(e = t || this), e])
    }
    _destroyCallback() {
        this._callbacks = []
    }
    _end(e) {
        return !!this._running && (this._callbacks.length && (this._callbacks = this._callbacks.filter((([,t])=>t && t.id !== e.id))),
        this.sequence._endAnimation(e))
    }
}
var version = "0.1.113";
class Align {
    constructor() {}
    top(e) {
        e = this._getEls(e);
        var t = this._getBoundaryVal("top", e);
        isType(t, "Null") || this._render("top", e, t)
    }
    bottom(e) {
        e = this._getEls(e);
        var t = this._getBoundaryVal("bottom", e);
        isType(t, "Null") || this._render("bottom", e, t)
    }
    left(e) {
        e = this._getEls(e);
        var t = this._getBoundaryVal("left", e);
        isType(t, "Null") || this._render("left", e, t)
    }
    right(e) {
        e = this._getEls(e);
        var t = this._getBoundaryVal("right", e);
        isType(t, "Null") || this._render("right", e, t)
    }
    horizal(e) {
        e = this._getEls(e);
        var t = this._getBoundaryVal("horizal", e);
        isType(t, "Null") || this._render("horizal", e, t)
    }
    vertical(e) {
        e = this._getEls(e);
        var t = this._getBoundaryVal("vertical", e);
        isType(t, "Null") || this._render("vertical", e, t)
    }
    _render(e, t, i) {
        t.forEach((t=>{
            var n, o = t.bound.plainReal()[e];
            if (!o || o - i)
                switch (e) {
                case "top":
                case "bottom":
                    t.move(0, i - o);
                    break;
                case "left":
                case "right":
                    t.move(i - o, 0);
                    break;
                case "vertical":
                    checkLayoutType(t, [LAYOUT_MAP.GROUP]) ? (n = this._getBoundaryVal("vertical", [t]),
                    t.move(0, i - n)) : t.move(0, i - t.height / 2 - t.bound.plainReal().top);
                    break;
                case "horizal":
                    checkLayoutType(t, [LAYOUT_MAP.GROUP]) ? (n = this._getBoundaryVal("horizal", [t]),
                    t.move(i - n, 0)) : t.move(i - t.width / 2 - t.bound.plainReal().left, 0)
                }
        }
        ))
    }
    _getBoundaryVal(e, t) {
        var i = t.reduce(((t,i)=>{
            var n = i.bound.plainReal();
            switch (e) {
            case "vertical":
                t[0].push(n.top),
                t[1].push(n.bottom);
                break;
            case "horizal":
                t[0].push(n.left),
                t[1].push(n.right);
                break;
            default:
                t.push(n[e])
            }
            return t
        }
        ), "vertical" === e || "horizal" === e ? [[], []] : []);
        if ("vertical" === e || "horizal" === e) {
            if (!i[0].length || !i[1].length)
                return null
        } else if (!i.length)
            return null;
        switch (e) {
        case "top":
        case "left":
            return Math.min(...i);
        case "bottom":
        case "right":
            return Math.max(...i);
        case "vertical":
        case "horizal":
            return (Math.min(...i[0]) + Math.max(...i[1])) / 2;
        default:
            return null
        }
    }
    _getEls(e) {
        return e || selector.getSelectElements()
    }
}
var align = new Align;
const {DOWN: DOWN, MOVE: MOVE, UP: UP} = EVENT_KEY
  , {CANDOWN: CANDOWN$2, CANMOVE: CANMOVE$2, CANUP: CANUP$2, ISSTOP: ISSTOP$1, ISPREVENT: ISPREVENT} = EVENT_CHECK
  , TYPE_CHECK = {
    [DOWN]: CANDOWN$2,
    [MOVE]: CANMOVE$2,
    [UP]: CANUP$2
};
class MoveManager {
    constructor() {
        this.moveItem = null,
        this.mouseDownHandle = mouseDownEvent.bind(this),
        this.mouseMoveHandle = mouseMoveEvent.bind(this),
        this.mouseUpHandle = mouseUpEvent.bind(this),
        this.mapFns = new Map,
        this.mapChecks = new Map,
        this.buttons = 0
    }
    initEvent() {
        bind(document, "mousemove", this.mouseMoveHandle),
        bind(document, "mouseup", this.mouseUpHandle)
    }
    add(e, t={}, i=this) {
        if (!e)
            return !1;
        this.had(e, "Fns") || (this.mapFns.set(e, {
            self: e,
            ctx: i,
            down: [],
            move: [],
            up: []
        }),
        this.addEvent(e));
        var {down: i, move: t, up: n} = t;
        i && this.mapFns.get(e).down.push(i),
        t && this.mapFns.get(e).move.push(t),
        n && this.mapFns.get(e).up.push(n)
    }
    addEventChecks(e, t={}) {
        var i;
        e && !this.had(e, "Checks") && (i = {
            self: e,
            [ISSTOP$1]: null,
            [CANDOWN$2]: null,
            [CANMOVE$2]: null,
            [CANUP$2]: null
        },
        this.mapChecks.set(e, i),
        this.mapChecks.get(e)[ISSTOP$1] = t[ISSTOP$1],
        this.mapChecks.get(e)[CANDOWN$2] = t[CANDOWN$2],
        this.mapChecks.get(e)[CANMOVE$2] = t[CANMOVE$2],
        this.mapChecks.get(e)[CANUP$2] = t[CANUP$2])
    }
    addEvent(e) {
        bind(e, "mousedown", this.mouseDownHandle)
    }
    remove(e) {
        e && this.mapFns.get(e) && (this.destroyEvent(e),
        this.mapFns.delete(e),
        this.mapChecks.delete(e))
    }
    destroyEvent(e) {
        e && unbind(e, "mousedown", this.mouseDownHandle)
    }
    destroy() {
        this.mapFns.forEach((e=>{
            this.destroyEvent(e.self)
        }
        )),
        unbind(document, "mousemove", this.mouseMoveHandle),
        unbind(document, "mouseup", this.mouseUpHandle),
        this.mapFns.clear(),
        this.mapChecks.clear(),
        this.moveItem = null
    }
    had(e, t) {
        return !!this["map" + t].get(e)
    }
    getHandles(e) {
        return Object.assign({}, this.mapFns.get(e), this.mapChecks.get(e))
    }
    execute(e, t) {
        const i = this.moveItem;
        if (i) {
            var {stopProp: n, preventDeft: o} = this.getPropDeft(i, e);
            if (n && e.stopPropagation(),
            o && e.preventDefault(),
            !i[TYPE_CHECK[t]] || i[TYPE_CHECK[t]](e)) {
                const o = getMouseBtnType(this.buttons);
                if (n = i[t])
                    try {
                        isType(n, "Function") ? n(e) : isType(n, "Array") ? n.forEach((t=>{
                            isType(t, "Function") && t(e),
                            isType(t, "Object") && (isType(t[o], "Function") && t[o].call(i.context, e),
                            isType(t.default, "Function")) && t.default.call(i.context, e)
                        }
                        )) : isType(n, "Object") && (isType(n[o], "Function") && n[o].call(i.context, e),
                        isType(n.default, "Function")) && n.default.call(i.context, e)
                    } catch (t) {
                        log.error(t)
                    }
            }
        }
    }
    getPropDeft(e, t) {
        var i = e[ISSTOP$1];
        let n, o;
        return n = isType(i, "Boolean") ? i : !isType(i, "Function") || i(t),
        o = isType(i = e[ISPREVENT], "Boolean") ? i : !!isType(i, "Function") && i(t),
        {
            stopProp: n,
            preventDeft: o
        }
    }
}
var moveManager = new MoveManager;
function mouseDownEvent(e) {
    this.moveItem && e.buttons !== this.buttons || (this.moveItem = this.getHandles(e.currentTarget),
    this.buttons = e.buttons,
    this.execute(e, DOWN))
}
function mouseMoveEvent(e) {
    this.execute(e, MOVE)
}
function mouseUpEvent(e) {
    0 < e.buttons || (this.execute(e, UP),
    this.moveItem = null,
    this.buttons = 0)
}
class ElementRotate {
    constructor(e, t) {
        this.instance = e,
        this.mouseRoate = t
    }
    elementRotate() {
        let e = this.instance.bound.record.angle + this.mouseRoate;
        180 < e && (e -= 360),
        e < -180 && (e = 360 + e),
        this.instance.setBound({
            angle: e
        })
    }
}
const {ISSTOP: ISSTOP, CANDOWN: CANDOWN$1, CANMOVE: CANMOVE$1, CANUP: CANUP$1} = EVENT_CHECK;
class BaseGraph {
    constructor() {
        this.elements = null
    }
    getMoveType(e) {
        return this.elements = this._checkBeforeMove(e),
        isUnDef(this.elements) ? "regionSelect" : "move"
    }
    checkBeforeMove() {
        var e;
        return !(e = (e = selector.getLayers()).length ? e : selector.getContainers()).length || checkLock(e) ? null : e
    }
    addEventChecks(e) {
        moveManager.addEventChecks(e.el, this.checkBeforeDoEvent(e))
    }
    checkBeforeDoEvent(e) {
        return {
            [CANDOWN$1]: t=>this.canDown(e, t),
            [CANMOVE$1]: t=>this.canMove(e, t),
            [CANUP$1]: t=>this.needUp(e),
            [ISSTOP]: t=>this.checkPropagation(t, e)
        }
    }
    reset() {
        this.elements = null
    }
    remove(e) {
        moveManager.remove(e.el)
    }
    checkPropagation(e, t) {
        return !checkMouseBtnType(e, "right") || this.ui.rightMoveCanvasLock.defaultCtLock && checkLayoutType(t, LAYOUT_MAP.DEFAULTCONTAINER) || t.previewModeState
    }
    canDown(e, t) {
        return e.eventActive && checkMouseBtnType(t, "left") && !this.isInEditing(e)
    }
    canMove(e, t) {
        return this.canDown(e, t)
    }
    needUp(e) {
        return e.eventActive && !this.isInEditing(e)
    }
    isInEditing(e) {
        return textEditor.isInEdit && textEditor.target && textEditor.target.id === e.id
    }
    _checkBeforeMove(e) {
        return !0 === e.shiftKey ? (selector.clear(),
        null) : this.checkBeforeMove()
    }
}
class Rotator extends BaseGraph {
    constructor() {
        super(),
        this.tag = !1,
        this.pointA = null,
        this.pointB = {
            x: 0,
            y: 0
        },
        this.pointC = {
            x: 0,
            y: 0
        },
        this.allAngle = 0
    }
    init({ui: e}) {
        this.ui = e,
        this.rotateModule = new ElementRotate
    }
    addEventHandle(e) {
        this.initRotateEvent(e)
    }
    initRotateEvent(e) {
        e.el.firstElementChild && moveManager.add(e.el.firstElementChild, {
            down: t=>{
                this.initDownRotate(t),
                this.handler = e,
                recordBound(selector.getSelectElements())
            }
            ,
            move: e=>{
                this.rotateEvent(e)
            }
            ,
            up: e=>{
                this.upEvent(e)
            }
        })
    }
    initDownRotate(e) {
        var t = selector.getContainers()
          , {top: i, left: n} = (t = (this.pointA = t.map((e=>{
            var {width: t, height: i, left: n, top: o} = e.bound.plainReal();
            return {
                id: e.id,
                x: n + t / 2,
                y: o + i / 2
            }
        }
        )),
        this.ui.canvas.getZoom()),
        this.ui.canvas.el.getBoundingClientRect());
        this.pointB.x = (e.clientX - n) / t,
        this.pointB.y = (e.clientY - i) / t
    }
    rotateEvent(e) {
        var t, i, n, o = this.checkBeforeMove();
        if (null === o)
            return this.reset(),
            !1;
        e && (e.preventDefault(),
        e.stopPropagation(),
        t = this.ui.canvas.getZoom(),
        ({top: i, left: n} = this.ui.canvas.el.getBoundingClientRect()),
        this.pointC.x = (e.clientX - n) / t,
        this.pointC.y = (e.clientY - i) / t,
        this.tag = !0,
        this.rotate(o),
        this.ui.emit("graphRotating"))
    }
    rotate(e) {
        e.forEach((e=>this._rotate(e)))
    }
    _rotate(e) {
        var t, i = {}, n = {}, o = this.pointA.find((t=>t.id === e.id));
        o && (i.X = this.pointB.x - o.x,
        i.Y = this.pointB.y - o.y,
        n.X = this.pointC.x - o.x,
        n.Y = this.pointC.y - o.y,
        i = i.X * n.Y - i.Y * n.X,
        n = Math.sqrt(Math.pow(o.x - this.pointB.x, 2) + Math.pow(o.y - this.pointB.y, 2)),
        o = Math.sqrt(Math.pow(o.x - this.pointC.x, 2) + Math.pow(o.y - this.pointC.y, 2)),
        t = Math.sqrt(Math.pow(this.pointB.x - this.pointC.x, 2) + Math.pow(this.pointB.y - this.pointC.y, 2)),
        t = (Math.pow(n, 2) + Math.pow(o, 2) - Math.pow(t, 2)) / (2 * n * o),
        n = Math.round(180 * Math.acos(t) / Math.PI),
        this.allAngle = i < 0 ? -n : n,
        this.rotateModule.instance = e,
        this.rotateModule.mouseRoate = this.allAngle,
        this.rotateModule.elementRotate())
    }
    upEvent() {
        if (!this.tag)
            return this.reset(),
            !1;
        this.ui.emit("graphRotateEnd", selector.getSelectElements())
    }
    reset() {
        this.tag = !1,
        this.pointA = null,
        this.pointB.x = 0,
        this.pointB.y = 0,
        this.pointC.x = 0,
        this.pointC.y = 0,
        this.allAngle = 0
    }
}
var rotator = new Rotator;
class Scale {
    constructor(e) {
        this.instance = e,
        this.boundInfo = {},
        this.resInfo = null
    }
    resizeHandler() {
        checkLayoutType(this.instance, LAYOUT_MAP.CONTAINER) ? this.doResize() : checkLayoutType(this.instance, LAYOUT_MAP.LAYER) && (this.doResize(),
        this.instance.getContainers().forEach((e=>{
            this.doResize(e)
        }
        )))
    }
    doResize(e) {
        e = e || this.instance;
        var {width: t, height: i} = e.bound.plainReal()
          , {width: t=t, height: i=i} = this.resInfo
          , {mathHeight: n, mathWidth: o, mathTop: r, mathLeft: s} = this.calculateSizePosition();
        !e.isLock && 0 < t && 0 < i && e.setBound({
            height: n,
            width: o,
            top: r,
            left: s
        })
    }
    calculateSizePosition() {
        var {height: e, width: t} = this.boundInfo.rootBound
          , {width: i, height: n, x: o, y: r} = this.resInfo
          , n = n / e
          , e = i / t
          , {relativeTop: i, offsetTop: t, relativeLeft: s, offsetLeft: a} = this.boundInfo.ctBound
          , l = this.instance.bound.record;
        return {
            mathHeight: Math.floor(l.height * n),
            mathWidth: Math.floor(l.width * e),
            mathTop: Math.floor(i * n + r - t),
            mathLeft: Math.floor(s * e + o - a)
        }
    }
}
class Bound {
    constructor() {
        this.rootBound = null,
        this.ctsBound = new Map
    }
    init(e) {
        this.ui = e
    }
    initBoundInfo(e) {
        if (!e)
            return !1;
        const {top: t, left: i} = this.rootBound = this.ui.getBoundRect();
        e.forEach((e=>{
            var {top: n, left: o} = e.bound.plainReal()
              , {top: r, left: s} = e.bound.offset;
            this.ctsBound.set(e.id, {
                relativeTop: n - t,
                relativeLeft: o - i,
                offsetTop: r,
                offsetLeft: s
            })
        }
        ))
    }
    upEvent() {
        this.rootBound = null,
        this.ctsBound = new Map
    }
}
var bound = new Bound;
const INDEX = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
};
class Resizer extends BaseGraph {
    constructor() {
        super(),
        this.clickPoint = null,
        this.symmetricPoint = null,
        this.centerPosition = null,
        this.handler = null,
        this.elements = null,
        this.angle = 0,
        this.mouseMoveInfo = {
            x: 0,
            y: 0
        },
        this._mouseMoveInfo = {
            x: 0,
            y: 0
        },
        this.x = 0,
        this.y = 0,
        this.offset = {
            x: 0,
            y: 0
        },
        this.handler = null,
        this.sizePositionInfo = null,
        this.canMoveX = !0,
        this.canMoveY = !0,
        this.after = !1
    }
    init({ui: e}) {
        this.ui = e,
        this.scaleModule = new Scale,
        bound.init(e)
    }
    addEventHandle(e) {
        this.initResizeEvent(e)
    }
    initResizeEvent(e) {
        moveManager.add(e.el, {
            down: t=>{
                this.doDown(t, e)
            }
            ,
            move: e=>{
                this.doMove(e)
            }
            ,
            up: e=>{
                this.upEvent(e)
            }
        })
    }
    doDown(e, t) {
        if (e.stopPropagation(),
        this.x = e.clientX,
        this.y = e.clientY,
        this.handler = t,
        recordBound(selector.getSelectElements()),
        isUnDef(e = this.elements = this.checkBeforeMove()))
            return this.reset(),
            !1;
        bound.initBoundInfo(e);
        var {top: t, left: e, width: i, height: n, angle: o} = bound.rootBound
          , o = (this.angle = o,
        this.centerPosition = {
            x: e + i / 2,
            y: t + n / 2
        });
        this.clickPoint = this.getClickPoint(o),
        this.symmetricPoint = {
            x: o.x - (this.clickPoint.x - o.x),
            y: o.y - (this.clickPoint.y - o.y)
        }
    }
    doMove(e) {
        var t = this.elements;
        if (isUnDef(t))
            return this.reset(),
            !1;
        this.after || this.ui.emit("graphResizeStart", {
            elements: t
        }),
        this.after = !0,
        e && (e.preventDefault(),
        e.stopPropagation(),
        i = this.ui.canvas.getZoom(),
        this._mouseMoveInfo.y += (e.clientY - this.y) / i,
        this._mouseMoveInfo.x += (e.clientX - this.x) / i,
        this.canMoveX && (this.mouseMoveInfo.x = this._mouseMoveInfo.x),
        this.canMoveY && (this.mouseMoveInfo.y = this._mouseMoveInfo.y),
        this.x = e.clientX,
        this.y = e.clientY);
        var i = this.getRelativePosition(this.x, this.y);
        e || (i.x += this.offset.x,
        i.y += this.offset.y),
        this.sizePositionInfo = this.calculateSizeAndPos(this.angle, i, {
            symmetricPoint: this.symmetricPoint
        }),
        this.resize(t, this.sizePositionInfo),
        this.ui.emit("graphResizing", {
            event: e,
            elements: t,
            handler: this.handler
        })
    }
    resize(e, t) {
        if (t) {
            const i = this.handler.index;
            e.forEach((e=>this._scale(e, i, t)))
        }
    }
    upEvent() {
        this.ui.emit("graphResizeEnd"),
        bound.upEvent(),
        this.reset()
    }
    _scale(e, t, i) {
        this.scaleModule.instance = e,
        this.scaleModule.index = t,
        this.scaleModule.boundInfo.rootBound = bound.rootBound,
        this.scaleModule.boundInfo.ctBound = bound.ctsBound.get(e.id),
        this.scaleModule.resInfo = i,
        this.scaleModule.resizeHandler()
    }
    reset() {
        super.reset(),
        this.clickPoint = null,
        this.symmetricPoint = null,
        this.centerPosition = null,
        this.handler = null,
        this.elements = null,
        this.angle = 0,
        this.mouseMoveInfo.x = 0,
        this.mouseMoveInfo.y = 0,
        this._mouseMoveInfo.x = 0,
        this._mouseMoveInfo.y = 0,
        this.x = 0,
        this.y = 0,
        this.sizePositionInfo = null,
        this.after = !1
    }
    getClickPoint(e) {
        var {top: t, left: i, width: n, height: o, angle: r} = bound.rootBound;
        let s;
        switch (this.handler.index) {
        case 0:
            s = {
                x: i + n / 2,
                y: t
            };
            break;
        case 1:
            s = {
                x: i + n / 2,
                y: t + o
            };
            break;
        case 2:
            s = {
                x: i,
                y: t + o / 2
            };
            break;
        case 3:
            s = {
                x: i + n,
                y: t + o / 2
            };
            break;
        case 4:
            s = {
                x: i,
                y: t
            };
            break;
        case 5:
            s = {
                x: i + n,
                y: t
            };
            break;
        case 6:
            s = {
                x: i,
                y: t + o
            };
            break;
        case 7:
            s = {
                x: i + n,
                y: t + o
            }
        }
        return r ? this.calculateRotatedPointCoordinate(s, e, r) : s
    }
    getRelativePosition(e, t) {
        var i = this.ui.canvas.getZoom()
          , {top: n, left: o} = this.ui.canvas.el.getBoundingClientRect();
        return {
            x: (e - o) / i,
            y: (t - n) / i
        }
    }
    calculateAxisRotatedPoint(e, t) {
        return t = this.angleToRadian(t),
        {
            x: e.x * Math.cos(t) - e.y * Math.sin(t),
            y: e.y * Math.cos(t) + e.x * Math.sin(t)
        }
    }
    restAxisPoint(e, t) {
        return e = this.calculateAxisRotatedPoint(e, -t),
        {
            x: this.centerPosition.x + e.x,
            y: this.centerPosition.y - e.y
        }
    }
    calculateRotatedPointCoordinate(e, t, i) {
        return i = this.angleToRadian(i),
        {
            x: (e.x - t.x) * Math.cos(i) - (e.y - t.y) * Math.sin(i) + t.x,
            y: (e.x - t.x) * Math.sin(i) + (e.y - t.y) * Math.cos(i) + t.y
        }
    }
    angleToRadian(e) {
        return e * Math.PI / 180
    }
    calculateSizeAndPos(e, t, i) {
        i = i.symmetricPoint;
        var n = this.getCenterPoint(t, i)
          , o = this.calculateRotatedPointCoordinate(i, n, -e)
          , r = this.handler.index;
        if (Object.values(INDEX).includes(r)) {
            const i = {
                curPositon: t,
                newSymmetricPoint: o
            };
            if (r = this.calculatePoint(i, e, r))
                return r
        } else if (i = this.calculateRotatedPointCoordinate(t, n, -e),
        r = Math.abs(i.x - o.x),
        t = Math.abs(o.y - i.y),
        0 < r && 0 < t)
            return {
                width: r,
                height: t,
                x: Math.min(i.x, o.x),
                y: Math.min(i.y, o.y)
            };
        return null
    }
    getCenterPoint(e, t) {
        return {
            x: e.x + (t.x - e.x) / 2,
            y: e.y + (t.y - e.y) / 2
        }
    }
    calculatePoint(e, t, i) {
        switch (i) {
        case INDEX.TOP:
        case INDEX.BOTTOM:
            return this.calculateYPoint(e, t, i);
        case INDEX.RIGHT:
        case INDEX.LEFT:
            return this.calculateXPoint(e, t, i)
        }
    }
    calculateYPoint(e, t, i) {
        var {curPositon: e, newSymmetricPoint: n} = e
          , {width: o, height: r} = bound.rootBound;
        e = {
            x: e.x - this.centerPosition.x,
            y: this.centerPosition.y - e.y
        },
        e = {
            x: 0,
            y: this.calculateAxisRotatedPoint(e, t).y
        };
        let s, a;
        if (i === INDEX.TOP) {
            if (s = {
                x: 0,
                y: -r / 2
            },
            e.y <= s.y)
                return null;
            a = e.y + r / 2
        } else if (i === INDEX.BOTTOM) {
            if (s = {
                x: 0,
                y: r / 2
            },
            e.y >= s.y)
                return null;
            a = r / 2 - e.y
        }
        r = this.getCenterPoint(e, s),
        e = this.restAxisPoint(e, t);
        var r = this.restAxisPoint(r, t)
          , l = this.calculateRotatedPointCoordinate(e, r, -t);
        let c;
        switch (i) {
        case INDEX.TOP:
            c = Math.min(l.y, n.y);
            break;
        case INDEX.BOTTOM:
            c = l.y - a
        }
        return {
            width: o,
            height: a,
            x: l.x - o / 2,
            y: c
        }
    }
    calculateXPoint(e, t, i) {
        var {curPositon: e, newSymmetricPoint: n} = e
          , {width: o, height: r} = bound.rootBound;
        e = {
            x: e.x - this.centerPosition.x,
            y: this.centerPosition.y - e.y
        },
        e = {
            x: this.calculateAxisRotatedPoint(e, t).x,
            y: 0
        };
        let s, a;
        if (i === INDEX.RIGHT) {
            if (s = {
                x: -o / 2,
                y: 0
            },
            e.x <= s.x)
                return null;
            a = e.x + o / 2
        } else if (i === INDEX.LEFT) {
            if (s = {
                x: o / 2,
                y: 0
            },
            e.x >= s.x)
                return null;
            a = o / 2 - e.x
        }
        o = this.getCenterPoint(e, s),
        e = this.restAxisPoint(e, t);
        var o = this.restAxisPoint(o, t)
          , l = this.calculateRotatedPointCoordinate(e, o, -t);
        let c;
        switch (i) {
        case INDEX.RIGHT:
            c = l.x - a;
            break;
        case INDEX.LEFT:
            c = Math.min(l.x, n.x)
        }
        return {
            width: a,
            height: r,
            x: c,
            y: l.y - r / 2
        }
    }
}
var resizer = new Resizer;
class CalculateSelect {
    constructor() {
        this.context = null,
        this.boxHeight = 0,
        this.boxWidth = 0,
        this.boxLeft = 0,
        this.boxTop = 0
    }
    setInfo(e) {
        var {context: e, width: t, height: i, top: n, left: o} = e;
        this.context = e,
        this.boxHeight = i,
        this.boxWidth = t,
        this.boxLeft = o,
        this.boxTop = n
    }
    calculateSelect(e, t, i) {
        e.forEach((e=>{
            var {left: n, top: o, width: r, height: s} = e.bound.plainReal()
              , a = Math.max(n + r, this.boxLeft + this.boxWidth)
              , n = Math.min(n, this.boxLeft)
              , l = Math.max(o + s, this.boxTop + this.boxHeight)
              , o = Math.min(o, this.boxTop);
            a - n <= r + this.boxWidth && l - o <= s + this.boxHeight ? isType(t, "Function") && t.call(this.context || this, e) : isType(i, "Function") && i.call(this.context || this, e)
        }
        ))
    }
    reset() {
        this.context = null,
        this.boxHeight = 0,
        this.boxWidth = 0,
        this.boxLeft = 0,
        this.boxTop = 0
    }
}
class RegionSelector extends BaseGraph {
    constructor() {
        super(),
        this.tag = !1,
        this.box = null,
        this.x = 0,
        this.y = 0,
        this.start_left = 0,
        this.start_top = 0,
        this.moveInfo = {
            x: 0,
            y: 0
        },
        this.can = !1,
        this.realEls = [],
        this.preselectEls = [],
        this.after = !1,
        this.moveType = null
    }
    init({ui: e, canvas: t}) {
        this.ui = e,
        this.canvas = t,
        this.initBox(),
        this.cs = new CalculateSelect
    }
    addEventHandle(e) {
        this.initRegionSelectEvent(e)
    }
    initRegionSelectEvent(e) {
        moveManager.add(e.el, {
            down: e=>{
                this.beforeRegionSelect(e)
            }
            ,
            move: t=>{
                this.moveType || (this.moveType = this.getMoveType(t)),
                "regionSelect" === this.moveType && this.regionSelect(e, t)
            }
            ,
            up: e=>{
                this.upEvent(e)
            }
        })
    }
    checkBeforeRegionSelect(e) {
        return !(!e || e.previewModeState || this.ui.insidePreview || this.ui.regionSelectLock || this.ui.tempRegionSelectLock)
    }
    initBox() {
        var e = createElement();
        e.dataset.id = "regionSelector",
        e.style.display = "none",
        e.style.zIndex = 999,
        e.style.width = "0px",
        e.style.height = "0px",
        e.style.position = "absolute",
        e.style.top = 0,
        e.style.left = 0,
        e.style.backgroundColor = "rgb(0, 122, 255, 0.1)",
        this.box = e,
        this.canvas.el.appendChild(this.box)
    }
    getCanvasBound() {
        var {left: e, top: t} = this.canvas.el.getBoundingClientRect();
        return {
            left: e,
            top: t
        }
    }
    beforeRegionSelect(e) {
        var t = this.ui
          , i = t.layers.find((e=>e.id === selector.selectLayerId))
          , n = i ? i.containers : null;
        i = i ? i.groups : null,
        this.initDownpoints(e),
        e = n || t.containers;
        this.can = !0,
        !e.length || checkLock(e) ? this.can = !1 : (n = i || t.groups,
        this.realEls = e.filter((e=>!checkLayoutType(e.parent, LAYOUT_MAP.GROUP))).concat(n.filter((e=>!checkLayoutType(e.parent, LAYOUT_MAP.GROUP)))))
    }
    initDownpoints(e) {
        var t = this.canvas.getZoom()
          , {left: i, top: n} = (this.x = e.clientX,
        this.y = e.clientY,
        this.getCanvasBound());
        this.start_top = (e.clientY - n) / t,
        this.start_left = (e.clientX - i) / t
    }
    regionSelect(e, t) {
        if (!t || !this.can)
            return !1;
        (checkLayoutType(e, LAYOUT_MAP.LAYER) || e.isLock) && e.unselect(),
        t.preventDefault(),
        t.stopPropagation(),
        this.after || this.ui.emit("graphRegionSelectStart"),
        this.after = !0,
        this.box.style.border || (this.box.style.border = "2px solid rgb(0, 122, 255)"),
        "block" !== this.box.style.display && (this.box.style.display = "block");
        e = t.clientX,
        t = t.clientY;
        var i = this.canvas.getZoom()
          , n = (this.moveInfo.y += (t - this.y) / i,
        this.moveInfo.x += (e - this.x) / i,
        Math.abs(this.moveInfo.y))
          , o = Math.abs(this.moveInfo.x)
          , {left: r, top: s} = (this.box.style.height = n + "px",
        this.box.style.width = o + "px",
        this.getCanvasBound())
          , r = (e - r) / i
          , s = Math.min((t - s) / i, this.start_top);
        i = Math.min(r, this.start_left);
        this.box.style.top = s + "px",
        this.box.style.left = i + "px",
        this.tag = !0,
        this.can && (this.cs.setInfo({
            context: this,
            width: o,
            height: n,
            top: s,
            left: i
        }),
        this.cs.calculateSelect(this.realEls, this.preselect, this.unpreselect)),
        this.x = e,
        this.y = t,
        this.ui.emit("graphRegionSelecting")
    }
    upEvent() {
        this.tag ? (this.select(),
        this.ui.emit("graphRegionSelectEnd", selector.getSelectElements()),
        selector.disableMultSelect(),
        this.destroy()) : this.reset()
    }
    preselect(e) {
        selector.enableMultSelect(),
        e.isLock || !e.visible || e.isSelected || this._preselect(e)
    }
    unpreselect(e) {
        this._unpreselect(e)
    }
    select() {
        this.preselectEls.length && selector.select(this.preselectEls)
    }
    handlePreselect() {
        var e = this.canvas.operation
          , t = e.boundRectUnion(this.preselectEls)
          , i = e.selectType()
          , n = this.canvas.getZoom();
        e.showRect(t, n, i, !0),
        e.hideSubRect(),
        e.showResize(t, n, i, {
            showRotateTag: !1,
            showResizeTag: !0,
            preselectionTag: !0
        })
    }
    showSelectRect() {
        this.canvas.showSelectRect(this.preselectEls)
    }
    hiddenSelectRect(e) {
        this.canvas.hiddenSelectRect(e)
    }
    canDown(e, t) {
        return super.canDown(e, t) && this.checkBeforeRegionSelect(e)
    }
    canMove(e, t) {
        return this.canDown(e, t)
    }
    reset() {
        super.reset(),
        this.x = 0,
        this.y = 0,
        this.start_left = 0,
        this.start_top = 0,
        this.moveInfo.x = 0,
        this.moveInfo.y = 0,
        this.cs.reset(),
        this.preselectEls = [],
        this.realEls = [],
        this.after = !1,
        this.tag = !1,
        this.moveType = null
    }
    destroy() {
        this.box.style.display = "none",
        this.box.style.width = "0px",
        this.box.style.height = "0px",
        this.box.style.top = 0,
        this.box.style.left = 0,
        this.box.style.border = "",
        this.reset()
    }
    _preselect(e) {
        this.preselectEls.includes(e) || this.preselectEls.push(e),
        this.handlePreselect(),
        this.showSelectRect()
    }
    _unpreselect(e) {
        var t;
        this.preselectEls.length ? (-1 !== (t = this.preselectEls.findIndex((t=>t.id === e.id))) && (this.preselectEls.splice(t, 1),
        this.hiddenSelectRect([e])),
        this.handlePreselect()) : this.canvas.operation.elhidden()
    }
}
var regionSelector = new RegionSelector;
class ShareData {
    constructor() {
        this.x = 0,
        this.y = 0
    }
    reset() {
        this.x = 0,
        this.y = 0
    }
}
var shareData = new ShareData;
const MOUSETYPE = {
    DOWN: "mousedown",
    DBLCLICK: "dblclick"
}
  , DBLCLICKAREA = 4;
class SelectDown extends BaseGraph {
    constructor() {
        super(),
        this.target = null,
        this.timestamp = null,
        this.timeout = 280,
        this.clickType = null,
        this.point = {
            x: 0,
            y: 0
        }
    }
    init({ui: e}) {
        this.ui = e
    }
    addEventHandle(e) {
        this.initSelectEvent(e)
    }
    initSelectEvent(e) {
        moveManager.add(e.el, {
            down: t=>{
                this.mousedownEvent(t, e)
            }
            ,
            up: e=>{
                this.upEvent(e)
            }
        })
    }
    executeSelect(e, t) {
        !1 === e.shiftKey && selector.isMultSelect && selector.disableMultSelect(),
        this.target = t,
        this.beforeSelect(e)
    }
    getRealSelect(e) {
        return this.getCtInnerGroup(e) || (!e.isSelected && checkLayoutType(e.parent, LAYOUT_MAP.GROUP) ? this.getRealSelect(e.parent) : e)
    }
    getDBSelect(e) {
        var t = e.parent;
        return e.isSelected || !checkLayoutType(t, LAYOUT_MAP.GROUP) || t.isSelected ? (t.isSelected && t.unselect(),
        e) : this.getDBSelect(t)
    }
    getPenetrateSelect(e) {
        var t = e.parent;
        return e.hiddenPreSelector && e.hiddenPreSelector(),
        t.isSelected && t.unselect(),
        e
    }
    select(e) {
        let t = null;
        (t = e.preSelected ? this.getPenetrateSelect(e) : this.clickType === MOUSETYPE.DBLCLICK ? this.getDBSelect(e) : this.getRealSelect(e)).isSelected ? selector.isMultSelect && t.unselect() : t.select()
    }
    getCtInnerGroup(e) {
        var t, i = this.ui.selector.getSelectElements()[0];
        return !!isInnerGroup(i, e) && (t = {
            curTarget: i,
            nextTarget: e
        },
        e.parent.id === i.parent.id || handleInclude(t, "nextParentIncludeCurTarget") ? e : !!handleInclude(t, "curParentIncludeNextTarget") && getRealInnerGroup(e, i.parent))
    }
    beforeSelect(e) {
        this.target && !this.checkMultiMove(e) && this.select(this.target),
        shareData.x = e.clientX,
        shareData.y = e.clientY,
        recordBound(selector.getSelectElements())
    }
    mousedownEvent(e, t) {
        var i, n = new Date;
        isUnDef(this.timestamp) || n.getTime() - this.timestamp > this.timeout ? (this.timestamp = n.getTime(),
        this.clickType = MOUSETYPE.DOWN,
        this.executeSelect(e, t),
        this.setMousePoint(e)) : (({x: n, y: i} = this.point),
        Math.abs(n - e.clientX) > DBLCLICKAREA || Math.abs(i - e.clientY) > DBLCLICKAREA ? (this.clickType = MOUSETYPE.DOWN,
        this.executeSelect(e, t)) : (this.clickType = MOUSETYPE.DBLCLICK,
        this.dblclickEvent(e, t)),
        this.resetMouseDown())
    }
    resetMouseDown() {
        this.timestamp = null,
        this.point.x = 0,
        this.point.y = 0
    }
    setMousePoint(e) {
        this.point.x = e.clientX,
        this.point.y = e.clientY
    }
    dblclickEvent(e, t) {
        this.indblclick ? this.indblclick = !1 : t.isSelected && "dblclick" === e.type ? (!selector.isMultSelect && isMultiSelect() && (selector.clear(),
        this.select(t)),
        t.textEditState && textEditor.enterTextEdit(t)) : !t.isSelected && checkLayoutType(t.parent, LAYOUT_MAP.GROUP) && (this.indblclick = !0,
        this.select(t),
        this.clickType = null)
    }
    checkMultiMove(e) {
        return checkLayoutType(this.target, LAYOUT_MAP.LAYER) ? multiSelectMove.checkMove(e) : checkLayoutType(this.target, LAYOUT_MAP.CONTAINER) ? this.target.isLock && multiSelectMove.checkMove(e) : void 0
    }
    upEvent() {
        this.reset()
    }
    canMove(e, t) {
        return this.canDown(e, t) && this.clickType === MOUSETYPE.DOWN
    }
    reset() {
        shareData.x = 0,
        shareData.y = 0,
        this.target = null
    }
}
var selectDown = new SelectDown;
function isInnerGroup(e, t) {
    return e && !t.isSelected && checkLayoutType(e.parent, LAYOUT_MAP.GROUP) && checkLayoutType(t.parent, LAYOUT_MAP.GROUP)
}
function getRealInnerGroup(e, t) {
    return function e(i) {
        return !!checkLayoutType(i.parent, LAYOUT_MAP.GROUP) && (i.parent.id === t.id ? i : e(i.parent))
    }(e)
}
function handleInclude(e, t) {
    var {curTarget: i, nextTarget: n} = e;
    let o, r;
    switch (t) {
    case "curParentIncludeNextTarget":
        o = i,
        r = n;
        break;
    case "nextParentIncludeCurTarget":
        o = n,
        r = i
    }
    return o.parent.children.find((e=>e.id === r.parent.id || includeChild(e, r.parent.id)))
}
function includeChild(e, t) {
    let i = !1;
    return checkLayoutType(e, LAYOUT_MAP.GROUP) ? !!e.children.find((e=>e.id === t || includeChild(e, t))) : i
}
class MultiSelectMove {
    constructor() {
        this.boundRange = {},
        this.moving = !1
    }
    init({canvas: e, operation: t}) {
        this.canvas = e,
        this.operation = t
    }
    setRange() {
        if (!this.operation)
            return !1;
        var e = this.operation.getSelectBoundRect();
        e && Object.assign(this.boundRange, e)
    }
    initPoint(e) {
        selectDown.executeSelect(e)
    }
    move(e) {
        movement.doMove(e)
    }
    getMousePoint(e) {
        var t = this.canvas.getZoom()
          , {left: i, top: n} = this.getCanvasBound()
          , n = (e.clientY - n) / t;
        return {
            x: (e.clientX - i) / t,
            y: n
        }
    }
    checkMove(e) {
        var t = store$1.getSelectCtGroups();
        if (Object.keys(this.boundRange).length <= 0 || !t.length)
            this.reset();
        else {
            var {x: t, y: e} = this.getMousePoint(e)
              , {top: i, bottom: n, left: o, right: r} = this.boundRange;
            if (i <= e && e <= n && o <= t && t <= r)
                return this.moving = !0;
            this.moving = !1
        }
        return !1
    }
    getCanvasBound() {
        var {left: e, top: t} = this.canvas.el.getBoundingClientRect();
        return {
            left: e,
            top: t
        }
    }
    reset() {
        this.boundRange = {},
        this.moving = !1
    }
    upEvent() {
        if (!this.moving)
            return !1;
        movement.upEvent()
    }
}
var multiSelectMove = new MultiSelectMove;
class Movement extends BaseGraph {
    constructor() {
        super(),
        this.tag = !1,
        this.mouseMoveInfo = {
            x: 0,
            y: 0
        },
        this._mouseMoveInfo = {
            x: 0,
            y: 0
        },
        this.canMoveX = !0,
        this.canMoveY = !0,
        this.moveType = null,
        this.after = !1
    }
    init({ui: e}) {
        this.ui = e,
        this.moveModule = new ElementMove
    }
    addEventHandle(e) {
        this.initMoveEvent(e)
    }
    initMoveEvent(e) {
        moveManager.add(e.el, {
            move: e=>{
                this.moveType || (this.moveType = this.getMoveType(e)),
                "move" === this.moveType && this.doMove(e)
            }
            ,
            up: e=>{
                this.upEvent(e)
            }
        })
    }
    move(e) {
        e.forEach((e=>this._move(e)))
    }
    moveKeyEvent(e, t, i) {
        var n = this.elements || (this.elements = this.checkBeforeMove());
        null === n ? this.reset() : (this.after || this.ui.emit("graphMoveStart", {
            elements: n
        }),
        this.after = !0,
        this.tag || (recordBound(selector.getSelectElements()),
        this.tag = !0),
        this.mouseMoveInfo.x += t,
        this.mouseMoveInfo.y += i,
        this.move(n),
        this.ui.emit("graphMoving", {
            event: e,
            elements: n,
            isKeyMove: !0,
            moving: !0
        }))
    }
    upEvent() {
        this.tag && (multiSelectMove.reset(),
        this.ui.emit("graphMoveEnd", selector.getSelectElements(), !1)),
        this.reset()
    }
    doMove(e) {
        var t, i = this.elements || (this.elements = this.checkBeforeMove());
        isUnDef(i) ? this.reset() : (this.after || this.ui.emit("graphMoveStart", {
            elements: i
        }),
        this.after = !0,
        e && (e.preventDefault(),
        e.stopPropagation(),
        t = this.ui.canvas.getZoom(),
        this._mouseMoveInfo.y += (e.clientY - shareData.y) / t,
        this._mouseMoveInfo.x += (e.clientX - shareData.x) / t,
        this.canMoveX && (this.mouseMoveInfo.x = this._mouseMoveInfo.x),
        this.canMoveY && (this.mouseMoveInfo.y = this._mouseMoveInfo.y),
        shareData.x = e.clientX,
        shareData.y = e.clientY),
        this.tag = !0,
        this.move(i),
        this.ui.emit("graphMoving", {
            event: e,
            elements: i,
            moving: !0
        }))
    }
    _move(e) {
        this.moveModule.instance = e,
        this.moveModule.mouseMoveInfo = this.mouseMoveInfo,
        this.moveModule.elementMove()
    }
    reset() {
        super.reset(),
        this.tag = !1,
        this.moveType = null,
        this.mouseMoveInfo.x = 0,
        this.mouseMoveInfo.y = 0,
        this._mouseMoveInfo.x = 0,
        this._mouseMoveInfo.y = 0,
        this.after = !1
    }
}
var movement = new Movement;
class HandlerManager {
    constructor() {
        this.rotator = rotator,
        this.regionSelector = regionSelector,
        this.movement = movement,
        this.selectDown = selectDown,
        this.resizer = resizer
    }
    init(e, t) {
        isType(e, "Array") ? e.forEach((e=>{
            this[e].init(t)
        }
        )) : this[e].init(t)
    }
    initEvent(e, t) {
        isType(e, "Array") ? e.forEach((e=>{
            this[e].addEventChecks(t),
            this[e].addEventHandle(t)
        }
        )) : (this[e].addEventChecks(t),
        this[e].addEventHandle(t))
    }
    remove(e) {
        moveManager.remove(e.el)
    }
    destroy() {
        moveManager.destroy()
    }
}
var handlerManager = new HandlerManager;
const {CANDOWN: CANDOWN, CANMOVE: CANMOVE, CANUP: CANUP} = EVENT_CHECK;
let boundInfo = {
    top: null,
    left: null,
    width: null,
    height: null
};
class UIEvent {
    initUIEvent() {
        this.on("graphMoveEnd", (e=>{
            commandAPI.drag(e),
            this.setBoundRange()
        }
        )).on("graphResizeEnd", (e=>{
            commandAPI.drag(e),
            this.setBoundRange()
        }
        )).on("graphRotateEnd", (e=>{
            commandAPI.rotate(e)
        }
        )).on("select", (e=>{
            this.setBoundRange()
        }
        )).on("unselect", (e=>{
            textEditor.exitTextEdit(e)
        }
        )),
        moveManager.initEvent(),
        this.initEventChecks(),
        this.initMouseEvent(),
        this._resizeEvent = this.innerResize.bind(this),
        this._contextmenuEvent = this.contextmenuEvent.bind(this),
        this._scrollEvent = this._updateBound.bind(this),
        bind(window, "resize", this._resizeEvent),
        bind(window, "scroll", this._scrollEvent),
        bind(document, "contextmenu", this._contextmenuEvent)
    }
    initMouseEvent() {
        moveManager.add(this.el, {
            down: {
                left: this.fnMaps.get("downLeft"),
                right: this.fnMaps.get("downRight")
            },
            move: {
                left: this.fnMaps.get("moveLeft"),
                right: this.fnMaps.get("moveRight")
            },
            up: {
                left: this.fnMaps.get("upLeft"),
                right: this.fnMaps.get("upRight"),
                default: this.fnMaps.get("upDefault")
            }
        }, this)
    }
    initEventChecks() {
        moveManager.addEventChecks(this.el, this.checkBeforeDoEvent())
    }
    innerResize() {
        this.isPlayMode() ? this._resizePlay() : this.resizeLock || this._resizeEdit()
    }
    contextmenuEvent(e) {
        e.preventDefault()
    }
    updateBound(e) {
        e && isType(e, "Object") ? Object.assign(boundInfo, e) : boundInfo = {
            top: null,
            left: null,
            width: null,
            height: null
        },
        this._updateBound(e)
    }
    _updateBound({top: e, left: t, width: i, height: n}={}) {
        let[o,r,s,a] = [e, t, i, n];
        Object.keys(boundInfo) && ([o,r,s,a] = Object.values(boundInfo));
        var {top: e, left: t, width: i, height: n} = this.bound
          , {top: l, left: c, width: h, height: u} = this.el.getBoundingClientRect()
          , l = isDef(o) ? o : Math.round(l)
          , c = isDef(r) ? r : Math.round(c)
          , h = isDef(s) ? s : Math.round(h)
          , u = isDef(a) ? a : Math.round(u);
        e === l && t === c || this.bound.setData({
            top: l,
            left: c
        }),
        i === h && n === u || this.bound.setData({
            width: h,
            height: u
        })
    }
    setBoundRange() {
        multiSelectMove.setRange()
    }
    eventMaps() {
        var e = new Map;
        return e.set("downLeft", (e=>{
            multiSelectMove.checkMove(e) ? multiSelectMove.initPoint(e) : (this.clickLeft(e),
            regionSelector.beforeRegionSelect(e),
            this.tagObj.canRegionSelect = !0)
        }
        )),
        e.set("downRight", (e=>{
            this.canvas.lockBrowserEvent("contextmenu")
        }
        )),
        e.set("moveLeft", (e=>{
            !this.tagObj.regionselect && this.spaceDown ? (this.canvasMoveBySpace = !0,
            this.moveCanvasBySpace(e)) : multiSelectMove.moving ? multiSelectMove.move(e) : this.tagObj.canRegionSelect && (this.tagObj.regionselect = !0,
            regionSelector.moveType = "regionSelect",
            regionSelector.regionSelect(this, e))
        }
        )),
        e.set("moveRight", (e=>{
            this.canvas._beginMove(),
            this.tagObj.canvasMoveByRight = !0,
            document.body.style.cursor || (document.body.style.cursor = "pointer"),
            this.toMoveCanvas(e)
        }
        )),
        e.set("upLeft", (e=>{
            this.canvasMoveBySpace ? this.moveCanvasBySpaceEnd() : (multiSelectMove.upEvent(),
            this.tagObj.regionselect && regionSelector.upEvent()),
            this.tagObj.regionselect = !1,
            this.tagObj.canRegionSelect = !1,
            this.canvasMoveBySpace = !1
        }
        )),
        e.set("upRight", (e=>{
            this.tagObj.canvasMoveByRight ? (document.body.style.cursor = "",
            this.emit("moveCanvasEnd", {})) : (isMac && this.canvas.emit("contextmenu"),
            this.canvas.unlockBrowserEvent("contextmenu")),
            this.tagObj.canvasMoveByRight = !1,
            this.canvas._endMove()
        }
        )),
        e.set("upDefault", (e=>{
            this.tagObj.regionselect = !1,
            this.tagObj.canRegionSelect = !1,
            this.canvasMoveBySpace = !1
        }
        )),
        e
    }
    clickLeft(e) {
        this.el !== e.target || this.getInsidePreview() || this.selector.clear()()
    }
    getInsidePreview() {
        return this.insidePreview
    }
    checkBeforeDoEvent() {
        return {
            [CANDOWN]: e=>this.canDown(e),
            [CANMOVE]: e=>this.canMove(e),
            [CANUP]: e=>this.needUp(e)
        }
    }
    canDown(e) {
        return !this.spaceDown && !(checkMouseBtnType(e, "left") && this.isPlayMode() || this.cannotRegionSelect())
    }
    canMove(e) {
        return !(checkMouseBtnType(e, "right") && this.spaceDown || checkMouseBtnType(e, "left") && this.isPlayMode() && !this.spaceDown || this.cannotRegionSelect())
    }
    needUp(e) {
        return !(checkMouseBtnType(e, "left") && !this.canvasMoveBySpace && this.isPlayMode())
    }
    cannotRegionSelect() {
        return this.insidePreview || this.regionSelectLock || this.tempRegionSelectLock
    }
    removeUIEvent() {
        unbind(window, "resize", this._resizeEvent),
        unbind(window, "scroll", this._scrollEvent),
        unbind(document, "contextmenu", this._contextmenuEvent)
    }
}
const SCROLL_PARAM = {
    enable: !0,
    resize: !0,
    immediate: !0
};
class UI extends EventEmitter {
    constructor(e, t={}, i={}) {
        if (!(e = getElement(e)))
            throw new Error("无效dom");
        super(),
        this.type = LAYOUT_MAP.UI,
        this.lifeCycle = createLifeCycle(this),
        this.lifeCycle.call("beforeCreate"),
        this.id = getUID("ui"),
        this.rootEl = e,
        this.parentEl = null,
        this.el = null,
        this.options = clone(t),
        this.config = merge(defaultConfig[LAYOUT_MAP.UI], i),
        this.bound = null,
        this.nextTick = null,
        this.canvasMode = null,
        this.CANVASMODE = null,
        this.canvas = null,
        this.selector = null,
        this.animation = null,
        this.align = null,
        this.insidePreview = null,
        this.spaceDown = !1,
        this.canvasMoveBySpace = !1,
        this.tempRegionSelectLock = !1,
        this.store = store$1,
        this.regionSelectLock = !1,
        this.rightMoveCanvasLock = {
            defaultCtLock: !0
        },
        this.resizeLock = !1,
        this.alignmentLineBase = "layer",
        this.tagObj = {},
        this.lifeCycle.call("created"),
        this.init()
    }
    get layers() {
        return store$1.getLayers()
    }
    get groups() {
        return store$1.getGroups()
    }
    get containers() {
        return store$1.getContainers()
    }
    get operation() {
        return this.canvas ? this.canvas.operation : null
    }
    init() {
        this.id = getUID("ui"),
        this.parentEl = createElement(),
        this.parentEl.style.cssText = "position: relative; width: 100%; height: 100%;",
        this.el = createElement(),
        this.el.dataset.id = this.id,
        this.el.style.cssText = "position: absolute; width: 100%; height: 100%; overflow: hidden; background: " + this.config.theme.ui.background,
        this.lifeCycle.call("beforeMount"),
        this.parentEl.appendChild(this.el),
        this.rootEl.appendChild(this.parentEl),
        this.bound = this.createBound(),
        store$1.init(this),
        this.nextTick = nextTick.call.bind(nextTick),
        handlerManager.init(["selectDown", "movement", "resizer", "rotator"], {
            ui: this
        }),
        graphEvent.init(this),
        this.canvasMode = CANVAS_MODE.EDIT,
        this.CANVASMODE = CANVAS_MODE,
        this.canvas = layoutManager.createLayout(this, LAYOUT_MAP.CANVAS, this.options),
        this.selector = selector,
        this.animation = new AnimatorManager,
        (transAnimation.root = this).transAnimation = transAnimation,
        this.fnMaps = this.eventMaps(),
        this.initUIEvent(),
        this.lifeCycle.call("mounted")
    }
    closeRegionSelect() {
        this.regionSelectLock = !0
    }
    openRegionSelect() {
        this.regionSelectLock = !1
    }
    moveCanvasBySpace(e) {
        document.body.style.cursor || (document.body.style.cursor = "pointer"),
        this.toMoveCanvas(e)
    }
    moveCanvasBySpaceEnd() {
        document.body.style.cursor && (document.body.style.cursor = ""),
        this.tempRegionSelectLock = !1,
        this.emit("moveCanvasEnd", {})
    }
    toMoveCanvas(e) {
        e.target !== this.canvas.contentEl && (this.canvas.move(e.movementX, e.movementY),
        this.nextTick((()=>{
            this.emit("moveCanvas", this)
        }
        )))
    }
    query(e) {
        let t = this.executeQuery(e);
        return Array.isArray(t) ? t.filter((e=>!0 === e._isMounted)) : t && (!0 === t._isMounted || "Group" === t.type && !1 !== t._isMounted) ? t : null
    }
    executeQuery(e) {
        if (!e)
            return store$1.getAllElements();
        if (e instanceof RegExp)
            return store$1.getAllElements().filter((t=>e.test(t.name)));
        var t = e.substring(0, 1);
        if ("#" === t)
            return store$1.getElementById(e.substring(1));
        if ("." !== t)
            return store$1.getElementsByName(e);
        switch (e.substring(1)) {
        case LAYOUT_MAP.CANVAS:
            return store$1.getCanvas()[0];
        case LAYOUT_MAP.LAYER:
            return store$1.getLayers();
        case LAYOUT_MAP.GROUP:
            return store$1.getGroups();
        case LAYOUT_MAP.CONTAINER:
            return store$1.getContainers();
        default:
            return null
        }
    }
    toJSON() {
        if (!this.canvas)
            return "";
        const e = {};
        var t = this.canvas.toJSON()
          , i = (n = this.ruler ? this.ruler.exportLineInfo() : null) ? n.lines : null
          , n = n ? n.hideAllLine : null;
        i && i.length && (t.lines = i,
        t.hideAllLine = n),
        i = {
            version: 1,
            scene: t,
            userData: e
        };
        return function t(i) {
            var n = i.option.adapter;
            n && (e[i.option.id] = n,
            i.option.adapter = n.type || "ConchAdapter"),
            i.children && i.children.forEach((e=>{
                t(e)
            }
            ))
        }(t),
        JSON.stringify(i)
    }
    parseJSON(e) {
        return new Promise(((t,i)=>{
            this.doParse(e, t, i)
        }
        ))
    }
    doParse(e, t, i) {
        if (this.isPlayMode())
            return i("预览模式下，无法使用"),
            !1;
        if (!e)
            return i("参数不能为空"),
            !1;
        if (isType(e, "String"))
            try {
                e = window.JSON.parse(e)
            } catch (t) {
                return i(e + " 数据不符合要求"),
                !1
            }
        if (!isType(e, "Object") || !e.scene)
            return i(e + " 数据不符合要求"),
            !1;
        nextTick.microCaches = [],
        this.lifeCycle.call("beforeParseJSON", e, t, i),
        function t(i) {
            i.option.adapter && (i.option.adapter = e.userData[i.option.id]),
            i.children && i.children.forEach((e=>{
                t(e)
            }
            ))
        }(i = (e = clone(e)).scene);
        const n = {};
        return this.canvas && (this.canvas.layers.forEach((e=>e.isDefaultLayer && (n[e.id] = e.dom))),
        this.canvas.destroy()),
        this.canvas = layoutManager.parseLayout(this, i, {
            inStack: !1
        }),
        this.ruler && i.lines && this.ruler.parseRulerLines(e),
        this.canvas.layers.forEach((e=>{
            var t = n[e.id];
            e.isDefaultLayer && t && (e.dom.parentNode.insertBefore(t, e.dom.parentNode.childNodes[1]),
            e.dom.parentNode.removeChild(e.dom),
            e.dom = t)
        }
        )),
        !isUnDef(e.userData) && Object.keys(e.userData).length || t(this),
        this.lifeCycle.call("afterParseJSON"),
        !0
    }
    play(e) {
        if (!this.canvas)
            return log.warn("进入预览模式需要画布"),
            !1;
        if (this.isPlayMode())
            return log.warn("已经进入预览模式"),
            !0;
        this.canvasMode = CANVAS_MODE.PLAY,
        this.selector.clear();
        var t = this.canvas.updateMode();
        return isType(e, "Function") && e((()=>{
            var e = transAnimation.animations;
            e && e.size && e.forEach((e=>{
                var {context: e, run: {enter: t}} = e;
                isType(t, "Function") && t.apply(e)
            }
            ))
        }
        )),
        t
    }
    edit() {
        return this.canvas ? this.canvasMode === CANVAS_MODE.EDIT ? (log.warn("已经进入编辑模式"),
        !0) : (this.canvasMode = CANVAS_MODE.EDIT,
        this.canvas.updateMode()) : (log.warn("进入编辑模式需要画布"),
        !1)
    }
    enterInsidePreview(e) {
        return !(this.canvasMode === this.CANVASMODE.PLAY || this.insidePreview || !e || !hasOwn(e, "_enterPreview") || (e.zDown && e.zIndexUp(),
        !e._enterPreview()) || (this.insidePreview = e,
        this.emit("enterInsidePreview", this.insidePreview),
        0))
    }
    exitInsidePreview(e) {
        return !(!this.insidePreview || e && e !== this.insidePreview || !this.insidePreview._exitPreview() || (this.insidePreview = null,
        this.emit("exitInsidePreview"),
        0))
    }
    exitTextEdit() {
        textEditor.exitTextEdit()
    }
    enterTextEdit(e) {
        textEditor.enterTextEdit(e)
    }
    getScaleMode() {
        return this.canvas && this.canvas.scaleMode
    }
    setScaleMode(e) {
        var t;
        return this.isPlayMode() ? log.warn("预览模式下，无法设置画布缩放模式") : (this.canvas && e !== this.canvas.scaleMode && (t = Object.entries(CANVAS_SCALE_MODE).find((t=>t[1] === e))) && (this.canvas.scaleMode = CANVAS_SCALE_MODE[t[0]]),
        !0)
    }
    resize() {
        this.isPlayMode() ? this._resizePlay() : this._resizeEdit()
    }
    createBound() {
        return BoundingRect.create(this.el.getBoundingClientRect())
    }
    setResizeLock(e) {
        this.resizeLock !== e && (this.resizeLock = e)
    }
    alignTo(e, t) {
        return !!["top", "bottom", "left", "right", "vertical", "horizal"].includes(e) && (!!isType(t, "Array") && (recordBound(t),
        e = align[e](t),
        commandAPI.align(t),
        e))
    }
    registerCommandType(e) {
        return generateExecution.addCommandType(e)
    }
    setOperatHandlerDisplay(e) {
        this.canvas && this.canvas.setOperatHandlerDisplay(e)
    }
    getOperatHandlerDisState() {
        if (this.canvas)
            return this.canvas.getOperatHandlerDisState()
    }
    resetHandlerDisplay() {
        this.canvas && this.canvas.resetHandlerDisplay()
    }
    getBoundRect() {
        return this.canvas ? this.canvas.getBoundRect() : null
    }
    destroy() {
        this.lifeCycle.call("beforeDestroy"),
        moveManager.destroy(),
        this.removeUIEvent(),
        super.destroyEvents(),
        this.bound = null,
        transAnimation.clear(),
        this.canvas && this.canvas.destroy(),
        store$1.destroy(),
        this.canvasMode = null,
        this.rootEl.removeChild(this.parentEl),
        this.parentEl = null,
        this.lifeCycle.call("destroyed"),
        this.lifeCycle.destroy()
    }
    undo(e, t) {
        return command.undo(e, t)
    }
    canUndo() {
        return command.canUndo()
    }
    canRedo() {
        return command.canRedo()
    }
    redo(e, t) {
        return command.redo(e, t)
    }
    commandClear() {
        command.clear()
    }
    isPlayMode() {
        return this.canvasMode === CANVAS_MODE.PLAY
    }
    setAlignmentLineBase(e) {
        this.alignmentLineBase = e
    }
    scrollToCenter({enable: e=!0, resize: t=!0, immediate: i=!0}=SCROLL_PARAM) {
        this.canvas.scaleMode === CANVAS_SCALE_MODE.SCROLL && e ? (this.scrollFn = e=>{
            var t, i, n, {width: o, height: r} = this.el.getBoundingClientRect(), s = this.canvas.width, a = this.canvas.height;
            s < o && a < r ? (t = (r - a) / 2,
            i = (o - s) / 2,
            (n = this.canvas.style).position = "absolute",
            n.top = t + "px",
            n.left = i + "px",
            n.transformOrigin = "0px 0px") : this.el.scrollTo({
                top: (a - r) / 2,
                left: (s - o) / 2,
                behavior: "smooth"
            })
        }
        ,
        t && bind(window, "resize", this.scrollFn),
        i && this.scrollFn()) : t && unbind(window, "resize", this.scrollFn)
    }
    _resizePlay() {
        this.bound = this.createBound(),
        this.canvas.updateMode()
    }
    _resizeEdit() {
        this.bound = this.createBound(),
        this.canvas && this.canvas.zoomAvailCenter()
    }
    _setOperatHandlerDisplay(e, t) {
        this.canvas && this.canvas._setOperatHandlerDisplay(e, t)
    }
    _downSpace() {
        this.spaceDown = !0
    }
    _upSpace() {
        this.spaceDown = !1,
        this.canvasMoveBySpace && (this.canvasMoveBySpace = !1,
        this.moveCanvasBySpaceEnd())
    }
}
UI.version = version,
applyMixins(UI, [UIEvent]);
var conchLifeCycle = {
    ui: {
        beforeParseJSON({instance: e}, t, i) {
            if (t.userData) {
                let n = 0;
                const o = Object.keys(t.userData).length;
                e.on("collectCompComplete", (()=>{
                    ++n === o && (e.off("collectCompComplete"),
                    "function" == typeof i) && i(e)
                }
                ))
            }
        }
    },
    container: {
        mounted({instance: e}) {
            e && (e.adapter || e._initAdapterData) && e.root.emit("beforeComponentComplete", e)
        }
    }
};
class Queue {
    constructor() {
        this.taskCaches = [],
        this.has = {},
        this.waiting = !1,
        this.flushing = !1
    }
    _flushCaches() {
        var e;
        for (this.flushing = !0; this.taskCaches.length; )
            e = this.taskCaches.shift(),
            this.has[e.id] = void 0,
            e.run();
        this._resetState()
    }
    _resetState() {
        this.taskCaches.length = 0,
        this.has = {},
        this.waiting = this.flushing = !1
    }
    addTask(e) {
        var t = e.id;
        void 0 === this.has[t] ? (this.has[t] = e.instance,
        this.flushing || this.taskCaches.push(e),
        this.waiting || (this.waiting = !0,
        nextTick.call(this._flushCaches.bind(this)))) : this.has[t] !== e.instance && (this.has[t] = e.instance,
        t = this.taskCaches.findIndex((t=>t.id === e.id)),
        this.taskCaches.splice(t, 1),
        this.taskCaches.push(e))
    }
    destroy() {
        this._resetState()
    }
}
var queue = new Queue;
const STYLELIST = ["position", "top", "left", "width", "height", "transform", "transformOrigin", "filter", "right", "bottom", "outline", "backgroundImage", "backgroundColor", "background", "backgroundPosition", "flex", "padding", "margin", "display", "border", "opacity", "zIndex", "pointerEvents", "cursor", "flexDirection", "justifyContent", "alignItems", "backgroundRepeat", "backgroundSize", "backdropFilter", "boxSizing", "userSelect", "overflow"];
function setTransform(e) {
    return function(t) {
        this._setTransform(e, t)
    }
}
function setDistance(e, t) {
    return function(i) {
        this._setDistance(e, t, i)
    }
}
const rotate3dMap = {
    rotateX: setTransform("rotateX"),
    rotateY: setTransform("rotateY"),
    rotateZ: setTransform("rotateZ")
}
  , styleFnMap = {
    translate: setTransform("translate"),
    scale: setTransform("scale"),
    skew: setTransform("skew"),
    rotate: setTransform("rotate"),
    matrix: setTransform("matrix"),
    ...rotate3dMap
}
  , combineStyle = [["padding", "margin"], ["Top", "Right", "Bottom", "Left"]]
  , getPx = (combineStyle[0].forEach((e=>{
    combineStyle[1].forEach(((t,i)=>styleFnMap[e + t] = setDistance(e, i)))
}
)),
e=>/px|%/.test(e) ? e : e + "px")
  , getDeg = e=>/deg/.test(e) ? e : e + "deg"
  , getUrl = e=>/url/.test(e) ? e : `url(${e})`
  , isArray = e=>isType(e, "Array")
  , isNumberNaN = e=>!Number.isNaN(Number(e))
  , join = (e,t)=>e.join(t)
  , replace = (e,t)=>isArray(e) ? e.filter((e=>isDef(e))).map((e=>t(e))) : t(e)
  , handler = {
    backgroundImage: e=>getUrl(e),
    width: e=>isNumberNaN(e) ? getPx(e) : e,
    height: e=>isNumberNaN(e) ? getPx(e) : e,
    margin: e=>isArray(e) ? join(replace(e, getPx), " ") : e,
    padding: e=>isArray(e) ? join(replace(e, getPx), " ") : e,
    top: e=>isNumber(e) ? getPx(e) : e,
    left: e=>isNumber(e) ? getPx(e) : e,
    right: e=>isNumber(e) ? getPx(e) : e,
    bottom: e=>isNumber(e) ? getPx(e) : e
};
class Style {
    constructor(e) {
        return this.parent = e,
        this.layout = this.parent.layout,
        this._style = {},
        this.dirtyMap = {},
        new Proxy(this,{
            get(e, t, i) {
                return -1 !== STYLELIST.indexOf(t) || Reflect.has(styleFnMap, t) ? e._style[t] : Reflect.get(e, t, i)
            },
            set(e, t, i, n) {
                return -1 !== STYLELIST.indexOf(t) ? (e._setStyle(t, i),
                !0) : styleFnMap[t] ? (styleFnMap[t].call(e, i),
                !0) : Reflect.set(e, t, i, n)
            }
        })
    }
    static factory(e) {
        return new Style(e)
    }
    setOption(e) {
        return !!isType(e, "Object") && (Object.keys(e).forEach((t=>{
            this[t] = e[t]
        }
        )),
        !0)
    }
    getValue(e) {
        var t;
        return void 0 === e ? {
            ...this._style
        } : (t = this._style[e],
        e in handler ? handler[e](t) : "transform" === e ? this._getTransformStyleValue() : isArray(t) ? join(t, " ") : t)
    }
    _getTransformStyleValue() {
        var {translate: e, scale: t, rotate: i, rotateX: n, rotateY: o, rotateZ: r, skew: s, matrix: a} = this._style
          , l = "";
        return (l += (isArray(e) ? `translate(${join(replace(e, getPx), ",")}) ` : "") + (isArray(t) ? `scale(${join(t, ",")}) ` : "") + (isDef(i) ? `rotate(${replace(i, getDeg)}) ` : "") + (isDef(n) ? `rotateX(${replace(n, getDeg)}) ` : "") + (isDef(o) ? `rotateY(${replace(o, getDeg)}) ` : "") + (isDef(r) ? `rotateZ(${replace(r, getDeg)}) ` : "") + (isArray(s) ? `skew(${join(replace(s, getDeg), ",")}) ` : "") + (isArray(a) ? `matrix(${join(a, ",")}) ` : "")) || this._style.transform
    }
    getDirtyStyleList() {
        var e = [];
        for (const i in this.dirtyMap) {
            var t = this.getValue(i);
            null != t && this.dirtyMap[i] && (e.push({
                name: i,
                value: t
            }),
            this.dirtyMap[i] = !1)
        }
        return e
    }
    _setStyle(e, t) {
        isType(t, "Object") ? this._style[t.name] = t.value : this._style[e] = t,
        this.dirtyMap[e] = !0,
        this.parent.dirty = !0,
        queue.addTask({
            id: this.parent.id,
            instance: this.parent,
            run: this.parent._updateStyle.bind(this.parent)
        })
    }
    _setDistance(e, t, i) {
        if ("margin" === e || "padding" === e) {
            let n = this[e];
            (n = isType(n, "Array") ? n : [0, 0, 0, 0])[t] = i,
            this._setStyle(e, n)
        }
    }
    _setTransform(e, t) {
        t = ["translate", "scale", "skew"].includes(e) ? this.formatValue(t) : t,
        this._setStyle("transform", {
            name: e,
            value: t
        })
    }
    formatValue(e) {
        let t = "";
        return isType(e, "Number") && (t = [e, e]),
        isType(e, "Array") && isType(e[0], "Number") && isType(e[1], "Number") ? [e[0], e[1]] : t
    }
    destroy() {
        this._style = {},
        this.dirtyMap = {}
    }
    set dirty(e) {
        this.parent.dirty = e
    }
    get dirty() {
        return this.parent.dirty
    }
}
const eventList = ["click", "dblclick", "wheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu", "mouseover"]
  , blockList = {};
class DomEvent {
    initDomEvent() {
        this.eventBind = {},
        this._eventFns = {},
        this.event = new EventEmitter
    }
    on(e, t, i) {
        return this._hasType(e) && (this.event.on(e, t, i),
        this._addListener(e, i)),
        this
    }
    once(e, t, i) {
        if (this._hasType(e)) {
            const n = (...o)=>{
                this.off(e, n),
                t.apply(i, o)
            }
            ;
            this.on(e, n)
        }
        return this
    }
    off(e, t) {
        return e || t ? this._hasType(e) && (this.event.off(e, t),
        this._removeListener(e)) : this.destroyEvent(),
        this
    }
    emit(e, t) {
        e.type ? (t && !1 === t.preventDefault && e.preventDefault(),
        t && !1 === t.stopPropagation && e.stopPropagation(),
        blockList[e.type] ? (Array.isArray(blockList[e.type]) || (blockList[e.type] = []),
        blockList[e.type].push([this, e])) : this.event.emit(e.type, e)) : Array.isArray(blockList[e]) && blockList[e].forEach((([t,i],n)=>{
            t.event.emit(e, i)
        }
        ))
    }
    lockBrowserEvent(e) {
        if (!this._hasType(e))
            return this;
        blockList[e] = !0
    }
    unlockBrowserEvent(e) {
        if (!this._hasType(e))
            return this;
        blockList[e] = null
    }
    destroyEvent() {
        this.event.destroyEvents();
        for (const e in this.eventBind)
            this._removeListener(e);
        return this
    }
    _emit(e, t) {
        this.emit(t, e)
    }
    _addListener(e, t) {
        this.eventBind[e] || (this.eventBind[e] = !0,
        t = this._emit.bind(this, t),
        bind(this.el, e, t),
        this._eventFns[e] = t)
    }
    _removeListener(e) {
        !this.eventBind[e] || this.event.eventFns[e] && this.event.eventFns[e].length || (unbind(this.el, e, this._eventFns[e]),
        delete this.eventBind[e],
        delete this._eventFns[e])
    }
    _hasType(e) {
        return !!eventList.includes(e)
    }
}
var dep = new EventEmitter;
class EventManager {
    initElementEvent(e) {
        var t = this.getType(e.type);
        this[`init ${t}Event`] && this[`init ${t}Event`].call(e)
    }
    removeElementEvent(e) {
        var t = this.getType(e.type);
        this[`remove ${t}Event`] && this[`remove ${t}Event`].call(e)
    }
    registerDep(e) {
        var t = this.getType(e.type);
        this[`register ${t}Dep`] && this[`register ${t}Dep`].call(e)
    }
    removeDep(e) {
        var t = this.getType(e.type);
        this[`remove ${t}Dep`] && this[`remove ${t}Dep`].call(e)
    }
    initCanvasEvent() {
        this.on("mousedown", (e=>{
            checkMouseBtnType(e, "left") && !multiSelectMove.checkMove(e) && this.root.selector.clear()
        }
        )),
        this.root.on("select", (()=>{
            this.showSelectRect()
        }
        )).on("unselect", (e=>{
            this.hiddenSelectRect(e)
        }
        ))
    }
    initLayerEvent() {
        mutualInitEvent.call(this)
    }
    initContainerEvent() {
        mutualInitEvent.call(this),
        this.on("dblclick", this._dblclickFn, this),
        this.on("mouseover", showBound, this),
        this.on("mouseout", hideBound, this),
        this.on("mousemove", preSelector, this),
        checkLayoutType(this, LAYOUT_MAP.DEFAULTCONTAINER) && (this.root.on("canvasMode", this._canvasModeFn, this),
        this.root.on("beforeCanvasMode", this._beforeCanvasModeFn, this))
    }
    registerLayerDep() {
        dep.on("canvasModeChange", this.changeEventByMode, this)
    }
    registerContainerDep() {
        dep.on("canvasModeChange", this.changeEventByMode, this)
    }
    removeCanvasEvent() {
        this.off("mousedown")
    }
    removeLayerEvent() {
        mutualRemoveEvent.call(this)
    }
    removeContainerEvent() {
        mutualRemoveEvent.call(this),
        this.off("dblclick", this._dblclickFn),
        this.off("mouseover", showBound, this),
        this.off("mouseout", hideBound, this),
        this.off("mousemove", preSelector, this)
    }
    removeCanvasDep() {
        dep.off("canvasModeChange")
    }
    removeLayerDep() {
        mutualRemoveDep.call(this)
    }
    removeContainerDep() {
        mutualRemoveDep.call(this)
    }
    getType(e) {
        return initialCapital(e)
    }
}
function mutualInitEvent() {
    this.eventActive = !0,
    handlerManager.initEvent(["selectDown", "movement", "regionSelector"], this),
    this.on("dblclick", dblclickEvent, this)
}
function mutualRemoveEvent() {
    this.eventActive = !1,
    handlerManager.remove(this),
    this.off("dblclick", dblclickEvent, this)
}
function mutualRemoveDep() {
    dep.off("canvasModeChange", this.changeEventByMode, this)
}
function showBound(e) {
    multiSelectMove.moving || (e.stopPropagation(),
    this.eventActive && graphEvent.mouseOverEvent(this))
}
function preSelector(e) {
    this.eventActive && graphEvent.mouseMoveEvent(this, e)
}
function hideBound(e) {
    e.stopPropagation(),
    this.eventActive && graphEvent.mouseOutEvent(this)
}
function dblclickEvent(e) {
    e.stopPropagation(),
    this.eventActive && selectDown.dblclickEvent(e, this)
}
class AdapterManager {
    constructor() {
        this._map = new Map
    }
    getBaseAdapter() {
        return this._map.has("BaseAdapter") ? this._map.get("BaseAdapter") : (log.warn("BaseAdapter还没有注册"),
        null)
    }
    register(e, t) {
        if (this._map.has(e))
            log.warn("重复注册" + e);
        else {
            if (!t.factory)
                throw new Error("注册的对象缺失factory静态方法");
            this._map.set(e, t)
        }
    }
    creatComponent(e, t, i, n) {
        if (!this._map.has(e))
            return log.warn(e + "尚未注册，请检查参数"),
            !1;
        try {
            return this._map.get(e).factory(e, t, i, n)
        } catch (t) {
            log.warn(`创建 ${e}出错` + t)
        }
    }
}
var adapterManager = new AdapterManager;
const {ENTER: ENTER, LEAVE: LEAVE} = TRANSITIONTYPE;
class GraphObject extends Displayable {
    constructor(e, t) {
        super(e, t),
        this.el = null,
        this.style = null,
        this.adapter = null,
        this.bound = null,
        this.isMounted = null,
        this.eventActive = null,
        this.maskStyle = null,
        this.maskDefaultEnable = !0,
        this.domFnEvents = [],
        this.eventManager = null,
        this._mountInfo = null,
        this._moveInfo = null,
        this._initAdapterData = null
    }
    get left() {
        return parseInt(this.style.left)
    }
    get top() {
        return parseInt(this.style.top)
    }
    get height() {
        return parseInt(this.style.height)
    }
    get width() {
        return parseInt(this.style.width)
    }
    get translate() {
        return this.style.translate || [0, 0]
    }
    get rotate() {
        return this.style.rotate || 0
    }
    get scale() {
        return this.style.scale || [1, 1]
    }
    set left(e) {
        setBoundEvent.call(this, {
            left: e
        })
    }
    set top(e) {
        setBoundEvent.call(this, {
            top: e
        })
    }
    set height(e) {
        setBoundEvent.call(this, {
            height: e
        })
    }
    set width(e) {
        setBoundEvent.call(this, {
            width: e
        })
    }
    get app() {
        return this.adapter && this.adapter.componentInstance
    }
    get ignoreRendering() {
        return this._ignoreRendering
    }
    set ignoreRendering(e) {
        e !== this._ignoreRendering && (this._ignoreRendering = e)
    }
    init() {
        super.init(),
        this._ignoreRendering = this.options.ignoreRendering,
        this.el = createElement(),
        this.el.dataset.id = this.id,
        this.contentEl = createElement(),
        this.contentEl.style.cssText = "position: relative; width: 100%; height: 100%; zIndex: 0;",
        this.maskStyle || (this.maskStyle = clone(MASK_STYLE)),
        this.maskEl = createElementWithAttr("div", this.maskStyle, {
            id: "mask"
        }),
        this.el.appendChild(this.contentEl),
        this.maskDefaultEnable && this._initMask(),
        this.style = Style.factory(this),
        this.setStyle(),
        this.options.animation && (this.animation = this.options.animation),
        this.isMounted = !1,
        this._mountInfo = null,
        this._moveInfo = null,
        this.eventActive = !0;
        var {left: e, top: t, width: i, height: n, rotate: o} = this.boundingRect();
        this.bound = new BoundingRect(e,t,i,n,{
            left: 0,
            top: 0
        },o),
        this._initAdapterData = this.options.adapter,
        checkLayoutType(this, LAYOUT_MAP.CONTAINER) && this.initBoundOffset(),
        this.initDomEvent(),
        this.eventManager = new EventManager,
        this.registerDep(),
        this._initEvent(),
        commandAPI.graph(this, this.config.inStack)
    }
    initMount() {
        this.ignoreRendering || this.doMount()
    }
    mount() {
        this.ignoreRendering = !1,
        this.doMount()
    }
    doMount() {
        if (!this.isMounted) {
            var e = this._mountInfo;
            let t, i = getElementParent(this.parent);
            e && (i = e.target,
            t = e.type),
            this.lifeCycle.call("beforeMount"),
            mount(this, i, t),
            this._mount && this._mount(),
            this.isMounted = !0,
            this._mountInfo = null,
            this.lifeCycle.call("mounted"),
            this.initAdapter(),
            this.collectAnimation()
        }
    }
    initAdapter() {
        this.root.nextTick((()=>{
            var e;
            this._initAdapterData && (e = this._initAdapterData,
            this.adapter = adapterManager.creatComponent(e.type, e.name, this, e),
            this.adapter._initComponent(e.option)),
            delete this._initAdapterData
        }
        ))
    }
    collectAnimation() {
        var e = transAnimation.convert(this);
        if (!isUnDef(e)) {
            var t = {};
            if (e[ENTER] && e[ENTER].length) {
                const i = transAnimation.getExecuteFn(this, {
                    animation: e[ENTER]
                });
                t.enter = ()=>{
                    i()
                }
            }
            if (e[LEAVE] && e[LEAVE].length) {
                const i = transAnimation.getExecuteFn(this, {
                    animation: e[LEAVE]
                });
                t.leave = ()=>{
                    i()
                }
            }
            transAnimation.animations.set(this, {
                context: this,
                animation: e,
                run: t
            })
        }
    }
    registerDep() {
        this.eventManager.registerDep(this)
    }
    unmount() {
        this.ignoreRendering = !0;
        var e = (e = transAnimation.animations.get(this)) ? e.animation[type] : null;
        transAnimation.execute(this, e, this._animationEndCb) || this.doUnmount()
    }
    doUnmount() {
        if (this.isMounted) {
            let e = this.el.nextSibling
              , t = "before";
            e || (e = this.el.parentNode,
            t = null),
            this._mountInfo = {
                target: {
                    el: e
                },
                type: t
            },
            unmount(this),
            this.isMounted = !1
        }
    }
    async show() {
        if (this._visible)
            return this;
        this.root.emit("beforeShow", this);
        var e = await super.show();
        return this.root.emit("afterShow", this),
        e
    }
    async hidden() {
        if (!this._visible)
            return this;
        this.root.emit("beforeHidden", this);
        var e = await super.hidden();
        return this.root.emit("afterHidden", this),
        e
    }
    setBound(e) {
        var t, i, n, o, r;
        this.isLock || (this.bound.setData(e),
        ({left: e, top: t, width: i, height: n} = this.bound),
        ({width: o, height: r} = this.style.getValue()),
        this.style.setOption({
            left: e - this.translate[0],
            top: t - this.translate[1],
            width: i,
            height: n
        }),
        o === i && r === n) || this._adapterResize()
    }
    move(e, t) {
        var {left: i, top: n} = this.bound;
        setBoundEvent.call(this, {
            left: i + e,
            top: n + t
        })
    }
    boundingRect() {
        return {
            left: this.left + this.translate[0],
            top: this.top + this.translate[1],
            width: this.width * this.scale[0],
            height: this.height * this.scale[1],
            rotate: this.rotate
        }
    }
    setStyle() {
        this.options.style && (this.style.setOption(this.options.style),
        this._setVisible(this.visible))
    }
    destroy() {
        this.lifeCycle.call("beforeDestroy"),
        super.destroy(),
        this._moveInfo = null,
        this.destroyDep(),
        commandAPI.unGraph(this),
        this.lifeCycle.call("destroyed")
    }
    destroyDep() {
        this.eventManager.removeDep(this)
    }
    _animationEndCb() {
        this.doUnmount()
    }
    _updateStyle() {
        this.el && (this.lifeCycle.call("beforeUpdate"),
        updateStyle(this),
        this.lifeCycle.call("updated"))
    }
    _adapterResize() {
        this.adapter && this.root.nextTick((()=>{
            this.adapter.resize()
        }
        ))
    }
    _destroyTruthy() {
        this._moveInfo = null,
        this.off(),
        super._destroyTruthy()
    }
    _initEvent() {
        this.eventManager.initElementEvent(this)
    }
    _startEvent() {
        return this.eventActive = !0
    }
    _pauseEvent() {
        return !(this.eventActive = !1)
    }
    _initMask() {
        return !this.maskEl.parentNode && (this.el.appendChild(this.maskEl),
        !0)
    }
    _destroyMask() {
        return !!this.maskEl.parentNode && (this.el.removeChild(this.maskEl),
        !0)
    }
    _destroyEvent() {
        this.eventManager.removeElementEvent(this)
    }
}
function setBoundEvent(e) {
    this.setBound(e),
    this.root.emit("graphBoundChange", this)
}
applyMixins(GraphObject, [DomEvent]);
class Base {
    constructor() {
        this.el = null,
        this.subEl = null,
        this.visible = !1,
        this.type = null
    }
    init(e, t, i) {
        this.el = createElement(),
        this.type = this.el.dataset.id = e,
        Object.assign(this.el.style, t),
        0 === i && this.createRotateDom(t),
        this.visible = !0
    }
    createRotateDom(e) {
        e = parseFloat(e.width);
        var t = ((t = createElement()).dataset.type = "rotate",
        this.subEl = t,
        {
            width: "16px",
            height: "16px",
            position: "absolute",
            cursor: "pointer",
            top: "-21px",
            left: -(8 - e / 2) + "px",
            backgroundImage: rotateIcon(),
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            pointerEvents: "all"
        });
        this.setRotateStyle(t),
        this.el.appendChild(this.subEl)
    }
    setStyle(e) {
        isPlainObject(e) && Object.assign(this.el.style, e)
    }
    setRotateStyle(e) {
        isPlainObject(e) && Object.assign(this.subEl.style, e)
    }
    destroy() {
        unmount(this),
        this.el = null,
        this.type = null,
        this.visible = !1,
        this.config = null
    }
    isRotate(e) {
        var t = store$1.getSelectElements();
        return !t.length || !(!e || t.find((t=>t.id === e))) || !("Group" === t[0].type || 1 < t.length)
    }
}
class Rect extends Base {
    constructor(e, t) {
        super(),
        this.config = t,
        this.init(e)
    }
    init(e) {
        var {rectColor: t, rectStyle: i} = this.config.theme;
        super.init(e, {
            display: "none",
            top: "0px",
            left: "0px",
            width: "0px",
            height: "0px",
            zIndex: "20",
            border: `1px ${t} ` + i,
            boxSizing: "border-box",
            position: "absolute",
            pointerEvents: "none"
        })
    }
    show(e, t, i, n) {
        var o, {top: e, left: r, width: s, height: a, angle: l} = e;
        s <= 0 && a <= 0 ? this.hidden() : (({rectColor: i, rectStyle: o} = {
            ...this.config.theme,
            ...this.config.theme[i]
        }),
        this.setStyle({
            top: e + "px",
            left: r + "px",
            width: s + "px",
            height: a + "px",
            border: 1 / t + `px ${i} ` + o,
            display: "block",
            transform: n && l ? `rotate(${l}deg)` : ""
        }),
        this.visible = !0)
    }
    rectShow(e, t, i, n) {
        var o = e.angle;
        n = !(!n || !o) && this.isRotate();
        this.show(e, t, i, n)
    }
    subRectShow(e, t, i, n) {
        var o = !!(o = e.angle) && this.isRotate(n);
        this.show(e, t, i, o)
    }
    hidden() {
        this.visible && this.setStyle({
            display: "none"
        }),
        this.visible = !1
    }
    scale(e) {
        this.visible && this.setStyle({
            borderWidth: 1 / e + "px"
        })
    }
}
class Resize extends Base {
    constructor(e, t) {
        super(),
        this.index = e,
        this.visible = !1,
        this.config = t,
        this.size = 10,
        this.isShowResize = !0,
        this.isShowFirstResize = !0,
        this.isShowRotate = !0,
        this.important = {
            resize: 0,
            rotate: 0
        },
        this.handleColor = t.theme.handleColor,
        this.init()
    }
    init() {
        super.init("resize" + this.index, {
            display: "none",
            top: "0px",
            left: "0px",
            width: this.size + "px",
            height: this.size + "px",
            borderRadius: this.size / 2 + "px",
            backgroundColor: this.config.theme.handleColor,
            position: "absolute",
            zIndex: "21",
            pointerEvents: "all",
            cursor: CURSOR_STYLE[this.index]
        }, this.index),
        this.initDomEvent(),
        initEvent.call(this)
    }
    contain(e, t) {
        var {top: i, left: n, right: o, bottom: r} = this.el.getBoundingClientRect();
        return n < e && i < t && e < o && t < r ? this : null
    }
    show(e, t, i, n, o) {
        n = {
            ...this.config.theme,
            ...this.config.theme[n]
        }.handleColor;
        var {showRotateTag: o, showResizeTag: r, preselectionTag: s=!1} = o
          , r = (this.handleColor = n,
        this.important.resize ? this.isShowResize : r);
        this.setStyle({
            display: r ? "block" : "none",
            top: t - this.size / 2 + "px",
            left: e - this.size / 2 + "px",
            transform: `scale(${1 / i})`,
            backgroundColor: this.isShowFirstResize ? n : "transparent",
            pointerEvents: this.isShowFirstResize ? "all" : "none"
        }),
        this.visible = !0,
        0 < this.index || (this.important.rotate ? !s && this.isRotate() && this.isShowRotate ? this.subEl.style.display = "block" : this.subEl.style.display = "none" : o && this.isRotate() ? this.subEl.style.display = "block" : this.subEl.style.display = "none")
    }
    setResizeDisplay(e, t) {
        isDef(t) && (this.important = t),
        0 === this.index ? (this.isShowFirstResize = e,
        this.setStyle({
            backgroundColor: e ? this.handleColor : "transparent",
            pointerEvents: e ? "all" : "none"
        }),
        e && this.setStyle({
            display: "block"
        })) : (this.isShowResize = e,
        this.setStyle({
            display: e ? "block" : "none"
        }))
    }
    setRotateDisplay(e, t) {
        isDef(t) && (this.important = t),
        this.isShowRotate = e,
        this.setRotateStyle({
            display: e ? "block" : "none"
        })
    }
    hidden() {
        this.visible && this.setStyle({
            top: "0px",
            left: "0px",
            display: "none"
        }),
        this.visible = !1
    }
    scale(e) {
        this.visible && this.setStyle({
            transform: `scale(${1 / e})`
        })
    }
    destroy() {
        this.off("mousedown"),
        handlerManager.remove(this),
        super.destroy()
    }
    _setResizeDisplay(e) {
        0 === this.index ? (this.setStyle({
            backgroundColor: e ? this.handleColor : "transparent",
            pointerEvents: e ? "all" : "none"
        }),
        e && this.setStyle({
            display: "block"
        })) : this.setStyle({
            display: e ? "block" : "none"
        })
    }
    _setRotateDisplay(e) {
        this.setRotateStyle({
            display: e && this.isRotate() ? "block" : "none"
        })
    }
}
function initEvent() {
    resizer.initResizeEvent(this),
    rotator.initRotateEvent(this)
}
applyMixins(Resize, [DomEvent]);
class SizeLabel extends Base {
    constructor(e) {
        super(),
        this.config = e,
        this.isShowSizeLabel = !0,
        this.init()
    }
    init() {
        var {labelColor: e, labelBackground: t} = this.config.theme;
        super.init("SizeLabel", {
            top: "0px",
            left: "0px",
            zIndex: 21,
            padding: "0 4px",
            fontSize: "12px",
            color: e,
            lineHeight: "20px",
            userSelect: "none",
            borderRadius: "2px",
            position: "absolute",
            transformOrigin: "left",
            backgroundColor: t,
            display: "none"
        })
    }
    show(e, t, i, n, o) {
        var {labelColor: o, labelBackground: r} = {
            ...this.config.theme,
            ...this.config.theme[o]
        };
        this.setStyle({
            top: t - 10 + "px",
            left: e + 15 + "px",
            color: o,
            backgroundColor: r,
            display: this.isShowSizeLabel ? "inline-block" : "none",
            transform: `scale(${1 / n})`,
            whiteSpace: "nowrap"
        }),
        this.el.innerText = i,
        this.visible = !0
    }
    hidden() {
        this.visible && this.setStyle({
            top: "0px",
            left: "0px",
            display: "none"
        }),
        this.visible = !1
    }
    setSizeLabelDisplay(e) {
        this.isShowSizeLabel !== e && (this.isShowSizeLabel = e,
        this.setStyle({
            display: e ? "inline-block" : "none"
        }))
    }
    scale(e) {
        this.visible && this.setStyle({
            transform: `scale(${1 / e})`
        })
    }
}
class SelectRect extends Base {
    constructor(e, t) {
        super(),
        this.target = e,
        this.config = t,
        this.init()
    }
    init() {
        this.el = createElement(),
        this.initStyle(),
        this.visible = !0
    }
    initStyle(e={}) {
        var t, i, n, o, r, s, a;
        this.target && this.config && (({rectColor: t, rectStyle: i} = this.config.theme),
        ({top: a, left: n, width: o, height: r, angle: s} = this.target.bound.plainReal()),
        a = {
            top: a + "px",
            left: n + "px",
            width: o + "px",
            height: r + "px",
            zIndex: "20",
            border: 1 / this.target.root.canvas.getZoom() + `px ${t} ` + i,
            boxSizing: "border-box",
            position: "absolute",
            pointerEvents: "none",
            transform: `rotate(${s}deg)`
        },
        Object.assign(a, e),
        this.setStyle(a))
    }
    show() {
        this.initStyle({
            display: "block"
        }),
        this.visible = !0
    }
    hidden() {
        this.visible && (this.setStyle({
            display: "none"
        }),
        this.visible = !1)
    }
    scale(e) {
        this.visible && this.setStyle({
            borderWidth: 1 / e + "px"
        })
    }
    destroy() {
        super.destroy(),
        this.target = null
    }
}
class Operation {
    constructor() {
        this.parent = null,
        this.el = createElement(),
        this.el.dataset.id = "operation",
        this.el.style.cssText = "position:absolute;top:0;left:0;width:inherit;pointer-events:none;",
        this.inited = !1,
        this.resizes = null,
        this.rect = null,
        this.subRect = null,
        this.sizeLabel = null,
        this.alignmentLineManager = null,
        this.preMultSelect = !1,
        this.important = {
            resize: 0,
            rotate: 0
        },
        this.selectRects = {},
        this.config = null,
        this._important = null,
        this._moving = !1
    }
    init(e) {
        if (!this.inited) {
            this.parent = e;
            var t = this.config = {
                theme: e.root.config.theme.bound
            };
            this.rect = new Rect("rect",t),
            mount(this.rect, this),
            this.subRect = new Rect("subRect",t),
            mount(this.subRect, this),
            this.resizes = [];
            for (let e = 0; e < 8; e++) {
                var i = new Resize(e,t);
                mount(i, this.rect),
                this.resizes.push(i)
            }
            this.sizeLabel = new SizeLabel(t),
            mount(this.sizeLabel, this.rect),
            mount(this, {
                contentEl: e.el
            }),
            this.initEvent(),
            this.inited = !0
        }
    }
    initEvent() {
        var e = this.parent.root;
        e.on("graphBoundChange", syncBound, this),
        e.on("select", this.repaint, this),
        e.on("unselect", this.repaint, this),
        e.on("delete", this.repaint, this),
        e.on("graphMoving", this.hidden, this),
        e.on("graphResizing", this.repaintResizing, this),
        e.on("graphResizeEnd", this._showSelectRect, this),
        e.on("graphRotating", this.repaint, this),
        e.on("graphMoveEnd", this.repaint, this),
        e.on("canvasZoom", this.scale, this),
        e.on("moveLayer", updateLayerOffset, this),
        e.on("graphMouseover", this.showSubRect, this),
        e.on("graphMouseout", this.hideSubRect, this)
    }
    destroyEvent() {
        var e = this.parent.root;
        e.off("graphBoundChange", syncBound, this),
        e.off("delete", this.repaint, this),
        e.off("select", this.repaint, this),
        e.off("unselect", this.repaint, this),
        e.off("graphMoving", this.hidden, this),
        e.off("graphResizing", this.repaintResizing, this),
        e.off("graphResizeEnd", this._showSelectRect, this),
        e.off("graphRotating", this.repaint, this),
        e.off("graphMoveEnd", this.repaint, this),
        e.off("canvasZoom", this.scale, this),
        e.off("moveLayer", updateLayerOffset, this),
        e.off("graphMouseover", this.showSubRect, this),
        e.off("graphMouseout", this.hideSubRect, this)
    }
    destroy() {
        unmount(this),
        this.el = null,
        this.destroyEvent(),
        this.parent = null,
        this.resizes.forEach((e=>e.destroy())),
        this.rect.destroy(),
        this.subRect.destroy(),
        this.sizeLabel.destroy(),
        this.rect = null,
        this.subRect = null,
        this.resizes = null,
        this.sizeLabel = null,
        this.alignmentLineManager = null,
        this.preMultSelect = null,
        this.selectRects = {},
        this.config = null
    }
    show(e) {
        var t, i, n, o = this.getSelectBoundRect();
        o && (t = this.parent.getZoom(),
        i = this.selectType(),
        ({showResizeTag: e, showRotateTag: n} = (this.showRect(o, t, i),
        this.hideSubRect(),
        this._getShowTag(e))),
        this.showResize(o, t, i, {
            showRotateTag: n,
            showResizeTag: e
        }))
    }
    showRect(e, t, i, n) {
        var o = !0;
        n && this.preMultSelect && (o = !1),
        this.rect.rectShow(e, t, i, o)
    }
    showResize(e, t, i, n) {
        const o = store$1.getSelectElements().find((e=>checkLayoutType(e, LAYOUT_MAP.LAYER)));
        var {width: e, height: r} = e;
        const s = [{
            top: 0,
            left: e / 2
        }, {
            top: r,
            left: e / 2
        }, {
            top: r / 2,
            left: 0
        }, {
            top: r / 2,
            left: e
        }, {
            top: 0,
            left: 0
        }, {
            top: 0,
            left: e
        }, {
            top: r,
            left: 0
        }, {
            top: r,
            left: e
        }];
        this.resizes.forEach(((e,r)=>{
            o ? e.hidden() : e.show(s[r].left, s[r].top, t, i, n)
        }
        )),
        this.sizeLabel.show(s[3].left, s[3].top, Math.round(e) + " × " + Math.round(r), t, i)
    }
    setHandlerDisplay(e, t) {
        const {rotate: i, resize: n, sizeLabel: o} = e;
        isDef(n) && (this.important.resize = t,
        this.resizes.forEach((e=>e.setResizeDisplay(n, this.important)))),
        isDef(i) && (this.important.rotate = t,
        e = this.resizes[0]) && e.setRotateDisplay(i, this.important),
        isDef(o) && this.sizeLabel.setSizeLabelDisplay(o)
    }
    getHandlerDisState() {
        let e = !0
          , t = !0
          , i = !0;
        return isDef(this.resizes) && (e = this.resizes.every((e=>e.isShowResize)),
        t = this.resizes[0].isShowRotate),
        isDef(this.sizeLabel) && (i = this.sizeLabel.isShowSizeLabel),
        {
            resizeDis: e,
            rotateDis: t,
            sizeLabelDis: i
        }
    }
    resetHandlerDisplay() {
        isDef(this.resizes) && (this.important.resize = 0,
        this.important.rotate = 0,
        this.resizes.forEach((e=>e.setResizeDisplay(!0, this.important))),
        this.resizes[0].setRotateDisplay(!0, this.important)),
        isDef(this.sizeLabel) && this.sizeLabel.setSizeLabelDisplay(!0)
    }
    hidden({moving: e}={}) {
        this.visible && (this.elhidden(),
        this.visible = !1,
        isDef(e)) && (this._moving = e)
    }
    elhidden() {
        this.rect.hidden(),
        this.resizes.forEach((e=>e.hidden())),
        this.sizeLabel.hidden(),
        this.hideSubRect(),
        this._hiddenSelectRect()
    }
    showSubRect(e, t) {
        var i;
        this._moving || (i = this.parent.getZoom(),
        this.subRect.subRectShow(e, i, this.selectType([t]), t.id))
    }
    hideSubRect() {
        this.subRect.hidden()
    }
    scale(e=1) {
        this.rect.scale(e),
        this.subRect.scale(e),
        this.resizes.forEach((t=>t.scale(e))),
        this.sizeLabel.scale(e),
        this.selectRectScale(e)
    }
    setStyle(e) {
        e.rect && this.rect.setStyle(e.rect),
        e.resize && this.resizes.forEach((t=>t.setStyle(e.resize))),
        e.label && this.sizeLabel.setStyle(e.label)
    }
    contain(e, t) {
        return this.resizes.find((i=>i.contain(e, t))) || null
    }
    repaint(e, t) {
        isDef(t) && (this._moving = t),
        this.doRepaint(e, this._showSelectRect)
    }
    repaintResizing(e) {
        this.doRepaint(e, this._hiddenSelectRect)
    }
    doRepaint(e, t) {
        store$1.getSelectElements().length ? (this.show(e),
        t && t.call(this),
        this.visible = !0) : this.hidden()
    }
    getSelectBoundRect() {
        var e = store$1.getSelectElements();
        return e.length ? this.boundRectUnion(e) : null
    }
    boundRectUnion(e) {
        const t = new BoundingRect;
        return e.forEach((e=>t.union(e.bound, !0))),
        t.plain()
    }
    selectType(e=store$1.getSelectElements()) {
        return 1 === e.length ? e[0].constructor.name.toLowerCase() : 1 < e.length ? "multSelect" : void 0
    }
    showSelectRect(e) {
        e.forEach((e=>{
            checkLayoutType(e, LAYOUT_MAP.LAYER) || this.selectRects[e.id] || (this.selectRects[e.id] = new SelectRect(e,this.config),
            mount(this.selectRects[e.id], this))
        }
        ))
    }
    hiddenSelectRect(e) {
        e.forEach((e=>{
            checkLayoutType(e, LAYOUT_MAP.LAYER) || (this.selectRects[e.id] && this.selectRects[e.id].destroy(),
            delete this.selectRects[e.id])
        }
        )),
        this.hasMultEls() || Object.keys(this.selectRects).forEach((e=>{
            this.selectRects[e].destroy(),
            delete this.selectRects[e]
        }
        ))
    }
    selectRectScale(e) {
        Object.values(this.selectRects).forEach((t=>{
            t.scale(e)
        }
        ))
    }
    hasMultEls() {
        var e = store$1.getSelectCtGroups();
        return e && 1 < e.length
    }
    setPreMult(e) {
        1 < (e = e || store$1.getSelectCtGroups()).length ? this.preMultSelect = !0 : 1 === e.length ? this.preMultSelect = checkLayoutType(e[0], LAYOUT_MAP.GROUP) : this.preMultSelect = !1
    }
    _showSelectRect() {
        this.hasMultEls() && Object.values(this.selectRects).forEach((e=>{
            e.show()
        }
        ))
    }
    _hiddenSelectRect() {
        Object.values(this.selectRects).forEach((e=>{
            e.hidden()
        }
        ))
    }
    _getShowTag(e) {
        return e ? 1 < e.length || 1 < store$1.getSelectElements().length ? {
            showResizeTag: !0,
            showRotateTag: !1
        } : checkLayoutType(e[0], LAYOUT_MAP.LAYER) || checkLayoutType(e[0], LAYOUT_MAP.GROUP) && checkLock(e[0].containers) || checkLayoutType(e[0], LAYOUT_MAP.CONTAINER) && e[0].lock ? {
            showResizeTag: !1,
            showRotateTag: !1
        } : {
            showResizeTag: !0,
            showRotateTag: !0
        } : {
            showResizeTag: !0,
            showRotateTag: !0
        }
    }
    _setHandlerDisplay(e, t) {
        !0 === t ? (this._important = this.important,
        this.important = {
            resize: 0,
            rotate: 0
        }) : !1 === t && (this._important && (this.important = this._important),
        this._important = null);
        const {rotate: i, resize: n, sizeLabel: o} = e;
        isDef(n) && 0 === this.important.resize && this.resizes.forEach((e=>e._setResizeDisplay(n))),
        isDef(i) && 0 === this.important.rotate && (t = this.resizes[0]) && t._setRotateDisplay(i),
        isDef(o) && this.sizeLabel.setSizeLabelDisplay(o)
    }
}
function syncBound() {
    this.visible && this.repaint()
}
function updateLayerOffset({layers: e=[]}) {
    e.forEach((e=>e.containers.forEach((t=>t.updateBoundRef(e.left, e.top)))))
}
class ScaleManage {
    constructor(e) {
        this.instance = e,
        this.el = this.instance.el,
        this.ratio = null,
        this.rootCenter = null,
        this.center = null,
        this.location = [],
        this.instance.style.transformOrigin = "0 0",
        this.lock = !1,
        this._keydown = this.keydown.bind(this),
        this._keyup = this.keyup.bind(this),
        this.wheelEvent = this.wheelEvent.bind(this),
        bind(this.instance.el.parentNode, "wheel", this.wheelEvent),
        bind(document, "keydown", this._keydown),
        bind(document, "keyup", this._keyup),
        this.zoomAvailCenter()
    }
    zoomAvailCenter() {
        var e = this.instance
          , t = [((t = e.root.bound).width - .2 * t.width) / e.width, (t.height - .2 * t.height) / e.height];
        return this.rootCenter = [e.root.bound.width / 2, e.root.bound.height / 2],
        this.setZoom(window.Math.min(...t))
    }
    wheelEvent(e) {
        if (e.preventDefault(),
        this.lock)
            return !1;
        !isMac || this.canMacOSZoomCanvas ? this._doZoom(e) : this._doPan(e)
    }
    _doPan(e) {
        var t = -e.deltaY * this.ratio;
        e = -e.deltaX * this.ratio;
        this.move(e, t),
        this.instance.root.nextTick((()=>{
            this.instance.root.emit("moveCanvas")
        }
        ))
    }
    _doZoom(e) {
        let t = this.getZoom();
        0 < e.deltaY ? t -= .02 : t += .02,
        this._setZoom(t),
        this.updateCenter({
            left: e.clientX,
            top: e.clientY
        })
    }
    keydown(e) {
        "Control" !== e.key && "Meta" !== e.key || (this.canMacOSZoomCanvas = !0)
    }
    keyup() {
        this.canMacOSZoomCanvas = !1
    }
    setCenter(e) {
        return e && (this.rootCenter = e),
        this.updateCenter()
    }
    getCenter() {
        return this.rootCenter
    }
    setZoom(e) {
        return this._setZoom(e),
        this.updateCenter()
    }
    _setZoom(e) {
        e = Number(parseFloat(e).toFixed(2)),
        this.ratio = e = e <= .15 || 4 < e ? e <= .15 ? .15 : 4 : e
    }
    getZoom() {
        return this.ratio
    }
    move(e, t) {
        this.location[0] += e,
        this.location[1] += t,
        this.updateStyle()
    }
    updateCenter(e) {
        var t, i, n = this.instance, o = this.ratio;
        let r;
        return r = e ? (n.root._updateBound(),
        t = n.root.bound,
        i = n.el.getBoundingClientRect(),
        [e.left - n.width * o * ((e.left - i.left) / i.width) - t.left, e.top - n.height * o * ((e.top - i.top) / i.height) - t.top]) : [this.rootCenter[0] - n.width * o / 2, this.rootCenter[1] - n.height * o / 2],
        this.location = this.center = r,
        this.updateStyle(),
        this.instance.root.nextTick((()=>{
            this.instance && this.instance.root && this.instance.root.emit("canvasZoom", this.getZoom())
        }
        )),
        !0
    }
    updateStyle() {
        var e = this.location.join("px, ") + "px";
        this.instance.style.transform = `translate(${e}) scale(${this.ratio})`
    }
    destroy() {
        unbind(this.instance.el.parentNode, "wheel", this.wheelEvent),
        unbind(document, "keydown", this._keydown),
        unbind(document, "keyup", this._keyup),
        this.instance = null,
        this.el = null,
        this.ratio = null,
        this.center = null,
        this.rootCenter = null
    }
}
class Canvas extends GraphObject {
    static factory(e, t) {
        return new Canvas(e,t)
    }
    static factoryConfig(e, t, i) {
        return new Canvas(e,t,i)
    }
    constructor(e, t, i) {
        if (!e || !checkLayoutType(e, LAYOUT_MAP.UI))
            throw new Error(`parent参数必须是 ${LAYOUT_MAP.UI}实例`);
        super(e, mergeOption(LAYOUT_MAP.CANVAS, t, i)),
        this.scaleMode = hasOwn(this.options, "scaleMode") ? this.options.scaleMode : CANVAS_SCALE_MODE.SCALEALL,
        this.maskDefaultEnable = !1,
        this.maskStyle = merge(clone(MASK_STYLE), {
            zIndex: 2
        }),
        this.init()
    }
    get layers() {
        return store$1.getLayers()
    }
    get groups() {
        return store$1.getGroups()
    }
    get containers() {
        return store$1.getContainers()
    }
    init() {
        super.init(),
        initOperation.call(this),
        handlerManager.init("regionSelector", {
            ui: this.root,
            canvas: this
        }),
        multiSelectMove.init({
            canvas: this,
            operation: this.operation
        }),
        this.canvasManage = new ScaleManage(this)
    }
    move(e, t) {
        this.canvasManage && this.canvasManage.move(e, t)
    }
    clear() {
        this.children.forEach((e=>{
            e.destroy()
        }
        ))
    }
    setCenter(e) {
        return this.root.canvasMode === CANVAS_MODE.PLAY ? log.warn("预览模式下，无法设置中间坐标值") : isType(e, "Array") ? this.canvasManage.setCenter(e) : log.warn(e + " 必须是数组类型")
    }
    getCenter() {
        if (this.root.canvasMode === CANVAS_MODE.PLAY)
            throw new Error("预览模式下，无法获取中间坐标值");
        return this.canvasManage.getCenter()
    }
    setZoom(e) {
        return this.root.canvasMode === CANVAS_MODE.PLAY ? log.warn("预览模式下，无法设置缩放比例") : this.canvasManage.setZoom(e)
    }
    getZoom(e) {
        if (this.root.canvasMode !== CANVAS_MODE.PLAY)
            return this._getZoom();
        var t = this.rect;
        if (e && t)
            switch (this.scaleMode) {
            case CANVAS_SCALE_MODE.SCROLL:
                return [1, 1];
            case CANVAS_SCALE_MODE.SCALEALL:
                return t;
            case CANVAS_SCALE_MODE.SCALEWIDTH:
                return [t[0], t[0]];
            case CANVAS_SCALE_MODE.SCALEHEIGHT:
                return [t[1], t[1]]
            }
        return log.warn("预览模式下，无法获取缩放比例")
    }
    zoomAvailCenter() {
        return this.root.canvasMode === CANVAS_MODE.PLAY ? log.warn("预览模式下，缩放画布到可视区域位置") : this.canvasManage.zoomAvailCenter()
    }
    getZoomState() {
        return this.canvasManage.lock
    }
    setZoomState(e) {
        e !== this.canvasManage.lock && (this.canvasManage.lock = e)
    }
    toJSON() {
        var e = super.toJSON();
        return e.option.scaleMode = this.scaleMode,
        delete e.option.style.transform,
        e
    }
    showSelectRect(e) {
        this.operation && (e = e || this.root.selector.getSelectElements()) && 1 < e.length && this.operation.showSelectRect(e)
    }
    hiddenSelectRect(e) {
        this.operation && e && e.length && this.operation.hiddenSelectRect(e)
    }
    updateMode() {
        var e = this.style
          , t = this.scaleMode;
        if (this.root.emit("beforeCanvasMode", this.root.canvasMode),
        this.root.canvasMode === CANVAS_MODE.PLAY)
            if (this.canvasManage && (this.canvasManage.destroy(),
            this.canvasManage = null),
            dep.emit("canvasModeChange"),
            t === CANVAS_SCALE_MODE.SCROLL)
                this.root.el.style.overflow = "auto",
                e.transform = "";
            else {
                var i = this.root.el.getBoundingClientRect()
                  , n = [i.width / this.width, i.height / this.height];
                switch (this.rect = n,
                t) {
                case CANVAS_SCALE_MODE.SCALEALL:
                    e.transform = `scale(${n.join(", ")})`,
                    this.root.el.style.overflow = "hidden";
                    break;
                case CANVAS_SCALE_MODE.SCALEWIDTH:
                    e.top = "50%",
                    e.left = 0,
                    e.transform = `scale(${n[0]}) translateY(-50%)`,
                    e.transformOrigin = "0px 0px",
                    this.root.el.style.overflow = "hidden";
                    break;
                case CANVAS_SCALE_MODE.SCALEHEIGHT:
                    e.top = "0",
                    e.left = "50%",
                    e.transform = `scale(${n[1]}) translateX(-50%)`,
                    e.transformOrigin = "0px 0px",
                    this.root.el.style.overflow = "hidden";
                    break;
                case CANVAS_SCALE_MODE.FLOWHEIGHT:
                    e.top = "0",
                    e.left = "0",
                    e.transform = `scale(${n[0]})`,
                    e.transformOrigin = "0px 0px",
                    e.overflow = "hidden",
                    this.root.el.style.overflow = ""
                }
            }
        else
            e.top = "",
            e.left = "",
            e.transform = "",
            e.overflow = "",
            this.canvasManage = new ScaleManage(this),
            dep.emit("canvasModeChange", !0);
        return canvasModeEvent.call(this, this.root.canvasMode),
        this.root.nextTick((()=>{
            this.root.emit("canvasMode", this.root.canvasMode)
        }
        )),
        !0
    }
    setOperatHandlerDisplay(e) {
        this.operation && this.operation.setHandlerDisplay(e, 1)
    }
    getOperatHandlerDisState() {
        if (this.operation)
            return this.operation.getHandlerDisState()
    }
    resetHandlerDisplay() {
        if (this.operation)
            return this.operation.resetHandlerDisplay()
    }
    getBoundRect() {
        return this.operation ? this.operation.getSelectBoundRect() : null
    }
    destroy() {
        return queue.destroy(),
        destroyOperation.call(this),
        this.scaleMode = null,
        this.canvasManage && (this.canvasManage.destroy(),
        this.canvasManage = null),
        this.destroyDep(),
        store$1.clearStack(),
        super._destroyTruthy(),
        this.root && (this.root.canvas = null,
        this.root.transAnimation.clear(),
        this.root = null),
        !0
    }
    destroyDep() {
        this.eventManager.removeDep(this)
    }
    _getZoom() {
        return this.canvasManage.getZoom()
    }
    _setOperatHandlerDisplay(e, t) {
        this.operation && this.operation._setHandlerDisplay(e, t)
    }
    _beginMove() {
        this._initMask()
    }
    _endMove() {
        this._destroyMask()
    }
}
function initOperation() {
    this.operation || (this.operation = new Operation,
    this.operation.init(this))
}
function destroyOperation() {
    this.operation && this.operation.destroy(),
    this.operation = null
}
function canvasModeEvent(e) {
    CANVAS_MODE.PLAY === e ? (destroyOperation.call(this),
    regionSelector.destroy()) : CANVAS_MODE.EDIT === e && initOperation.call(this)
}
class Layer extends GraphObject {
    static factory(e, t) {
        return new Layer(e,t)
    }
    static factoryConfig(e, t, i) {
        return new Layer(e,t,i)
    }
    constructor(e, t, i) {
        if (!e || !checkLayoutType(e, LAYOUT_MAP.CANVAS))
            throw new Error(`parent参数必须是 ${LAYOUT_MAP.CANVAS}实例`);
        super(e, mergeOption(LAYOUT_MAP.LAYER, t, i)),
        this.maskDefaultEnable = !1,
        this._showCts = [],
        this.init()
    }
    get groups() {
        return store$1.getGroupsByEL(this)
    }
    get containers() {
        return store$1.getContainersByEl(this)
    }
    changeEventByMode(e) {
        e ? (this._initEvent(),
        this.style.pointerEvents = "all") : (this._destroyEvent(),
        this.style.pointerEvents = "none")
    }
    moveToTarget(e, t) {
        return t && checkLayoutType(e, LAYOUT_MAP.LAYER) && e !== this ? (commandAPI.move(this, e, t),
        this.root.operation.repaint(),
        !0) : log.warn("图层移动只能以其他图层为目标，不能移动到内部")
    }
    unmount() {
        super.unmount(),
        this.containers.forEach((e=>{
            e._isMounted = !1
        }
        ))
    }
    setBound(e) {
        super.setBound(e),
        (isNumber(e.left) || isNumber(e.right)) && this.updateOffset()
    }
    updateOffset() {
        this.isLock || this.root.emit("moveLayer", {
            layers: [this]
        })
    }
    _hiddenCB(e) {
        e.forEach((e=>e.setVisible(!0)))
    }
    _setVisible(e) {
        super._setVisible(e),
        e && this.containers.forEach((e=>e.adapterResize()))
    }
    _mount() {
        this.containers.forEach((e=>{
            e._isMounted = !0
        }
        ))
    }
}
let maskDom = null;
const defaultDashBorder = "position: absolute; top: 0; right: 0; width: 100%; height: 100%; border: 1px dashed #027AFF; box-sizing: border-box; pointer-events: none;";
class Container extends GraphObject {
    static factory(e, t) {
        return new Container(e,t)
    }
    static factoryConfig(e, t, i) {
        return new Container(e,t,i)
    }
    constructor(e, t, i) {
        if (!e || !checkLayoutType(e, [LAYOUT_MAP.LAYER, LAYOUT_MAP.GROUP]))
            throw new Error(`parent参数必须是 ${LAYOUT_MAP.LAYER}或者 ${LAYOUT_MAP.GROUP}实例`);
        super(e, mergeOption(LAYOUT_MAP.CONTAINER, t, i)),
        this.previewModeState = null,
        this.previewModeLock = null,
        this.controlDashByApi = null,
        this.dashBorderDom = null,
        this.penetrateOnplay = this.options.penetrateOnplay,
        this.preSelected = !1,
        this.emptyStyle = !1,
        this.init()
    }
    init() {
        super.init(),
        this.contentEl.style.transform = "translate(0)",
        this.previewModeState = !1,
        this.previewModeLock = !0
    }
    openTextEdit() {
        textEditor.openTextEdit(this)
    }
    closeTextEdit() {
        textEditor.closeTextEdit(this)
    }
    readyTextEdit(e) {
        textEditor.readyTextEdit(this, e)
    }
    getTextEditState() {
        return textEditor.isInEdit
    }
    setStyle() {
        var e, t;
        this.options.style && (e = this.options.style,
        t = this.options.style.userSelect || "none",
        Object.assign(e, {
            userSelect: t
        }),
        this.style.setOption(e),
        this._setVisible(this.visible))
    }
    changeEventByMode(e) {
        e ? (this._initEvent(),
        this.contentEl.style.pointerEvents = "none") : (this._destroyEvent(),
        this.penetrateOnplay ? this.contentEl.style.pointerEvents = "none" : this.contentEl.style.pointerEvents = "all")
    }
    createMask() {
        var e = this.root.config.theme.mask;
        return createElementWithAttr("div", {
            ...MASK_STYLE,
            background: e.background,
            opacity: e.opacity
        }, {
            id: "previewMask"
        })
    }
    moveToTarget(e, t) {
        return t && !checkLayoutType(e, [LAYOUT_MAP.GROUP, LAYOUT_MAP.CONTAINER]) && e !== this ? log.warn("容器只能移动到编组或者其他容器旁边") : t || checkLayoutType(e, [LAYOUT_MAP.LAYER, LAYOUT_MAP.GROUP]) ? (commandAPI.move(this, e, t),
        this.root.operation.repaint(),
        !0) : log.warn("容器只能移动到图层或者编组里面")
    }
    setRotate(e) {
        if (isUnDef(e))
            return !1;
        this.setBound({
            angle: e
        }),
        this.root.emit("graphBoundChange", this)
    }
    setBound(e) {
        this.isLock || (super.setBound(e),
        isDef(e = e.angle) && this.style.setOption({
            rotate: e
        }))
    }
    getParentLayer() {
        return getParentLayer(this.parent)
    }
    initBoundOffset() {
        var e = this.getParentLayer();
        this.bound.setOffset(e.left, e.top)
    }
    updateLocation() {
        var e = this.getParentLayer(this);
        this.top = this.bound.plainReal().top - e.top,
        this.left = this.bound.plainReal().left - e.left,
        this.updateBoundRef()
    }
    updateBoundRef(e, t) {
        var i = this.getParentLayer();
        isDef(e) || (e = i.left),
        isDef(t) || (t = i.top),
        this.bound.setOffset(e, t)
    }
    adapterResize() {
        this.app && this._adapterResize()
    }
    loadEmptyStyle() {
        !this.controlDashByApi && this.el && (this._validEmpty() ? (this.emptyStyle = !0,
        this._addDashBorder()) : (this.emptyStyle = !1,
        this._removeDashBorder()))
    }
    showDash(e) {
        this.controlDashByApi = "show",
        this._addDashBorder(e)
    }
    hiddenDash() {
        this._removeDashBorder(),
        this.controlDashByApi = "hidden"
    }
    showPreSelector() {
        this.preSelected = !0,
        this.root.on("canvasZoom", this._scale, this);
        var e = this.root.canvas.getZoom();
        this.emptyStyle ? this._updateDashBorder({
            border: 1 / e + "px dashed #027AFF"
        }) : this.showDash({
            border: 2 / e + "px dashed #027AFF"
        })
    }
    hiddenPreSelector() {
        this.emptyStyle ? this._updateDashBorder() : this.hiddenDash(),
        this.preSelected = !1,
        this.root.off("canvasZoom", this._scale, this)
    }
    toJSON() {
        var e = super.toJSON();
        return delete e.children,
        e
    }
    _scale(e=1) {
        this.dashBorderDom && (this.dashBorderDom.style.border = this.emptyStyle ? 1 / e + "px dashed #027AFF" : 2 / e + "px dashed #027AFF")
    }
    _animationEndCb(e) {
        e && e(this)
    }
    _updateStyle() {
        super._updateStyle(),
        this.loadEmptyStyle()
    }
    _setVisible() {
        var e = setContainerDisplay(this);
        return super._setVisible(e),
        this.adapterResize(),
        e
    }
    _addDashBorder(e={}) {
        var t;
        return !this.dashBorderDom && "hidden" !== this.controlDashByApi && (t = createElement(),
        this.dashBorderDom = t,
        this._updateDashBorder(e),
        this.el.appendChild(t),
        this.root.on("canvasMode", this._showDashByCanvasMode, this),
        !0)
    }
    _updateDashBorder(e={}) {
        if (!this.dashBorderDom)
            return !1;
        if (Object.keys(e).length) {
            let t = defaultDashBorder;
            for (const i in e)
                Object.hasOwn(e, i) && (t += `${i}:${e[i]};`);
            this.dashBorderDom.style = t
        } else
            this.dashBorderDom.style = defaultDashBorder;
        return !0
    }
    _removeDashBorder() {
        return !!this.dashBorderDom && (this.el.removeChild(this.dashBorderDom),
        this.dashBorderDom = null,
        this.root.off("canvasMode", this._showDashByCanvasMode, this),
        !0)
    }
    _showDashByCanvasMode(e) {
        this.root.CANVASMODE.PLAY === e ? this.dashBorderDom.style.display = "none" : this.root.CANVASMODE.EDIT === e && (this.dashBorderDom.style.display = "block")
    }
    _dblclickFn() {
        this._canEnterPreview() && (this.zDown && this.zIndexUp(),
        this.root.enterInsidePreview(this))
    }
    _canEnterPreview() {
        return !this.previewModeState && !checkLayoutType(this.parent, LAYOUT_MAP.GROUP) && !this.textEditState
    }
    _destroyTruthy() {
        maskDom && 1 === this.root.containers.length && (maskDom.remove(),
        maskDom = null),
        this.adapter && this.adapter.destroy(),
        super._destroyTruthy()
    }
    _validEmpty() {
        var {backgroundColor: e, backgroundImage: t, opacity: i} = this.el.style
          , n = this.root.canvasMode === CANVAS_MODE.EDIT
          , o = !!this._initAdapterData || !!this.adapter;
        return n && !o && (!t || "initial" === t) && (!e || "rgba(0, 0, 0, 0)" === e || "transparent" === e || e && "0" === i)
    }
    _enterPreview() {
        return !this.previewModeLock && (maskDom = this.createMask(),
        log.info("进入预览模式"),
        this.select(),
        this.root.canvas.el.appendChild(maskDom),
        this._pauseEvent(),
        this.root.canvas._destroyEvent(),
        this.root.canvas.setZoomState(!0),
        this._destroyMask(),
        this.selectLock = !0,
        this.previewModeState = !0)
    }
    _exitPreview() {
        return log.info("退出预览模式"),
        this.root.canvas.el.removeChild(maskDom),
        this._startEvent(),
        this.root.canvas._initEvent(),
        this.root.canvas.setZoomState(!1),
        this._initMask(),
        this.selectLock = !1,
        this.previewModeState = !1,
        this.zDown && this.zIndexDown(),
        !0
    }
}
class DefaultContainer extends Container {
    static factory(e, t) {
        return new DefaultContainer(e,t)
    }
    static factoryConfig(e, t, i) {
        return new DefaultContainer(e,t,i)
    }
    constructor(e, t, i) {
        super(e, t, i),
        this.isDefaultContainer = !0,
        this.zDown = t.zDown,
        this.penetrateOnplay = !1
    }
    init() {
        this.config.isLock = !1,
        super.init(),
        this.previewModeLock = !1,
        this.dom = this.contentEl
    }
    changeEventByMode(e) {
        e ? this._initEvent() : this._destroyEvent(),
        this.contentEl.style.pointerEvents = "all"
    }
    createMask() {
        var e = this.root.config.theme.mask;
        return createElementWithAttr("div", {
            ...MASK_STYLE,
            background: e.defaultContainer.background || e.background,
            opacity: e.defaultContainer.opacity || e.opacity
        }, {
            id: "previewMask"
        })
    }
    loadEmptyStyle() {
        return !1
    }
    showDash() {
        return !1
    }
    hiddenDash() {
        return !1
    }
    toJSON() {
        var e = super.toJSON();
        return e.type = "DefaultContainer",
        e
    }
    _updateStyle() {
        super._updateStyle()
    }
    _destroyTruthy() {
        this.root.off("canvasMode", this._canvasModeFn),
        this.root.off("beforeCanvasMode", this._beforeCanvasModeFn),
        super._destroyTruthy()
    }
    _beforeCanvasModeFn(e) {
        this.root.CANVASMODE.PLAY === e && this.previewModeState && this.root.exitInsidePreview()
    }
    _canvasModeFn(e) {
        this.root.CANVASMODE.PLAY === e ? this._destroyMask() : this.root.CANVASMODE.EDIT === e && this._initMask()
    }
}
class Adapter {
    constructor(e, t, i={}) {
        return e instanceof Container ? (this.adapter = adapterManager.creatComponent(t.type, t.name, e, i),
        this.adapter._resolve = null,
        this.adapter.mounted = function() {
            return new Promise((e=>{
                this._resolve ? e() : this._resolve = e
            }
            ))
        }
        ,
        e.root.nextTick((()=>{
            this.adapter._initComponent(t.opts)
        }
        )),
        e.adapter = this.adapter,
        this.adapter) : (log.warn("请传入正确父节点"),
        null)
    }
}
window.THING ? window.THING.UI = UI : log.warn("请引入 ThingJS 后使用"),
layoutManager.register(LAYOUT_MAP.UI, UI),
layoutManager.register(LAYOUT_MAP.CANVAS, Canvas),
layoutManager.register(LAYOUT_MAP.LAYER, Layer),
layoutManager.register(LAYOUT_MAP.GROUP, Group),
layoutManager.register(LAYOUT_MAP.CONTAINER, Container),
layoutManager.register(LAYOUT_MAP.DEFAULTCONTAINER, DefaultContainer),
UI.Layer = function(...e) {
    return Layer.factory(...e)
}
,
UI.Group = function(...e) {
    return Group.factory(...e)
}
,
UI.Container = function(...e) {
    return Container.factory(...e)
}
,
UI.DefaultContainer = function(...e) {
    return DefaultContainer.factory(...e)
}
,
UI.ScaleManage = function(...e) {
    return new ScaleManage(...e)
}
,
UI.use = mm.register.bind(mm),
UI.mixin = mm.mixin.bind(mm),
UI.adapterManager = adapterManager,
UI.Adapter = Adapter,
UI.use(conchLifeCycle),
UI.STATIC = {
    CANVAS_MODE: CANVAS_MODE,
    CANVAS_SCALE_MODE: CANVAS_SCALE_MODE
};
class BaseAdapter {
    static factory(e, t, i, n) {}
    constructor(e, t, i, n={}) {
        this.parent = i,
        this.name = t,
        this.type = e,
        this.componentInstance = null,
        this.config = n,
        this.dom = null,
        this.complete = !1,
        this.initDom()
    }
    beforeMount() {}
    mounted() {
        this.complete = !0
    }
    beforeUpdate() {}
    updated() {}
    beforeDestroy() {}
    destroyed() {}
    initDom() {
        var e = createElement();
        e.style.width = this.parent.width + "px",
        e.style.height = this.parent.height + "px",
        this.dom = e
    }
    init(e) {
        this.beforeMount(),
        this._initComponent(e),
        this.mounted()
    }
    update() {
        this.beforeUpdate(),
        this._updateComponent(),
        this.updated()
    }
    setConfig(e, t) {
        t ? this.config[t] = e : this.config = e
    }
    getConfig(e) {
        return e ? this.config[e] : this.config
    }
    getComponentInstance() {
        return this.componentInstance
    }
    destroy() {
        this.beforeDestroy(),
        this._destroyComponent(),
        this.destroyed()
    }
    resize() {
        var e = this.parent.width
          , t = this.parent.height;
        this.parent.contentEl.style.width = e + "px",
        this.parent.contentEl.style.height = t + "px",
        this.dom.style.width = e + "px",
        this.dom.style.height = t + "px",
        this.complete && this.componentInstance && this.componentInstance.resize && this.componentInstance.resize()
    }
    toJSON() {}
    _initComponent(e) {}
    _updateComponent() {}
    _destroyComponent() {
        this.parent.loadEmptyStyle && this.parent.loadEmptyStyle()
    }
    _componentComplete() {
        this.parent.loadEmptyStyle && this.parent.loadEmptyStyle(),
        this.parent.root.emit("componentComplete", {
            parent: this.parent,
            adapter: this
        }),
        this.parent.root.emit("collectCompComplete")
    }
}
let conch;
class ConchAdapter extends BaseAdapter {
    static factory(e, t, i, n) {
        if (conch || ConchAdapter._loadConch(),
        conch && conch[t])
            return new ConchAdapter(e,t,i,n);
        throw new Error(`Conch没有加载或Conch中没有ID为 ${t}的组件`)
    }
    static _loadConch() {
        return window.conch ? conch = window.conch : (log.warn("请先加载spray-conch，否则组件将无法使用"),
        !1)
    }
    constructor(e, t, i, n) {
        super(e, t, i, n)
    }
    setOption(e) {
        e && (this.config.opts = e,
        this.componentInstance) && this.componentInstance.setOption(this.config.opts)
    }
    setData(e) {
        this.config.data = e,
        this.componentInstance && this.componentInstance.setData(this.config.data)
    }
    toJSON() {
        this.config.type = this.type,
        this.config.name = this.name;
        var e = this.componentInstance;
        if (e)
            if (isType(e.toJSON, "Function")) {
                var t = e.toJSON();
                for (const e in t)
                    t[e] && (this.config[e] = t[e])
            } else
                this.oldtoJSON(e);
        return this.config
    }
    oldtoJSON(e) {
        "echarts" === e.type && e.config ? this.config.opts = e.config : this.config.opts = e.opts
    }
    async _initComponent(e) {
        if (this.config.option = merge({
            prefix: "/s-static"
        }, e || {}),
        ConchAdapter._loadConch(),
        !conch[this.name])
            throw new Error(`组件 ${this.name}未检测到，请先到spray-conch中下载对应的组件包`);
        this.parent.contentEl && this.parent.contentEl.appendChild(this.dom);
        try {
            var t = {
                theme: this.config.theme,
                padding: this.config.padding
            };
            this.parent && !this.componentInstance && this.dom && (this.componentInstance = new conch[this.name](this.dom,{
                config: t,
                ...this.config.option
            })),
            this.componentInstance && (this.componentInstance.parent = this.parent),
            await this.componentInstance.render(),
            this._resolve ? "function" == typeof this._resolve && this._resolve() : this._resolve = !0
        } catch (e) {
            this.error = e
        }
        try {
            Reflect.has(this.config, "data") && this.setData(this.config.data),
            Reflect.has(this.config, "opts") && this.setOption(this.config.opts)
        } catch (e) {
            log.warn(e)
        }
        return this.complete = !0,
        this.parent.root.config.enableContainerPreview && (this.parent.previewModeLock = !1),
        this._componentComplete(),
        !0
    }
    _updateComponent() {
        this.complete = !1,
        this.componentInstance && this._initComponent(),
        this.complete = !0
    }
    _destroyComponent() {
        this.componentInstance && this.componentInstance.destroy(),
        this.config = null,
        this.dom && this.parent.contentEl && this.parent.contentEl.removeChild(this.dom),
        this.parent.adapter = null,
        this.parent.previewModeLock = !0,
        this.parent = null
    }
}
class AlignmentLines {
    constructor(e) {
        this.lines = e ? setLines(e) : null
    }
    update(e) {
        e && (this.lines = setLines(e))
    }
    calcNearLine(e={}) {
        if (!this.lines || !this.lines.v || !this.lines.h)
            return null;
        var t = [...this.lines.v, ...this.lines.h];
        const i = {
            v: [],
            h: []
        };
        return t.forEach((t=>{
            var n;
            t.type.includes("v") ? (n = findLine(t, e.v)) && i.v.push({
                val: Math.abs(Math.round(n.pos) - Math.round(t.pos)),
                from: t,
                ...n
            }) : (n = findLine(t, e.h)) && i.h.push({
                val: Math.abs(Math.round(n.pos) - Math.round(t.pos)),
                from: t,
                ...n
            })
        }
        )),
        {
            vLines: getShowLines(i.v),
            hLines: getShowLines(i.h),
            vLinesAll: i.v,
            hLinesAll: i.h
        }
    }
}
function setLines(e) {
    var {left: t, top: i, width: n, height: o} = e;
    return {
        v: [{
            type: "vl",
            pos: t,
            start: i,
            end: i + o,
            displayable: e
        }, {
            type: "vm",
            pos: t + n / 2,
            start: i,
            end: i + o,
            displayable: e
        }, {
            type: "vr",
            pos: t + n,
            start: i,
            end: i + o,
            displayable: e
        }],
        h: [{
            type: "ht",
            pos: i,
            start: t,
            end: t + n,
            displayable: e
        }, {
            type: "hm",
            pos: i + o / 2,
            start: t,
            end: t + n,
            displayable: e
        }, {
            type: "hb",
            pos: i + o,
            start: t,
            end: t + n,
            displayable: e
        }]
    }
}
function findLine(e, t=[]) {
    if (t.length <= 0)
        return null;
    let i = 0
      , n = t.length - 1;
    for (; i <= n; ) {
        var o = Math.round(n - (n - i) / 2);
        if (Math.round(e.pos) < Math.round(t[o].pos))
            n = o - 1;
        else {
            if (!(Math.round(e.pos) > Math.round(t[o].pos)))
                return t[o];
            i = o + 1
        }
    }
    return i > n ? i >= t.length ? t[n] : n < 0 ? t[0] : Math.abs(Math.round(t[n].pos) - Math.round(e.pos)) < Math.abs(Math.round(t[i].pos) - Math.round(e.pos)) ? t[n] : t[i] : void 0
}
function getShowLines(e) {
    return e.sort(((e,t)=>e.val - t.val)),
    e.filter(((e,t)=>0 === t || 0 === e.val))
}
class Line extends Base {
    constructor(e, t) {
        super();
        e = e.config.theme.alignmentLines;
        this.index = t,
        this.realWidth = e.width,
        this.realHeight = e.width,
        this.color = e.color,
        this.visible = !1,
        this.isAdsorbed = !1,
        this.adsorbMovement = 0,
        this.init()
    }
    init() {
        this.initStyle = {
            display: "none",
            top: "0px",
            left: "0px",
            width: this.realWidth + "px",
            height: this.realHeight + "px",
            backgroundColor: this.color,
            position: "absolute",
            pointerEvents: "all"
        },
        super.init("alignment-line" + this.index, this.initStyle)
    }
    resetStyle() {
        this.setStyle(this.initStyle)
    }
    show(e) {
        e.display = "block",
        this.setStyle(e),
        this.visible = !0
    }
    hidden() {
        this.visible && this.setStyle({
            top: "0px",
            left: "0px",
            display: "none"
        }),
        this.visible = !1
    }
}
const rulerBreakAdsorb = 2
  , alignBreakAdsorb = 0;
class Adsorb {
    constructor() {
        this.adsorbDistance = 4,
        this.adsorbed = [0, 0],
        this.rulerAdsorbed = [0, 0],
        this.ratio = 1
    }
    setOffset(e={}) {
        e.top && (setMouseMoveInfo({
            x: 0,
            y: e.top
        }),
        this.rulerAdsorbed[1] = 1),
        e.left && (setMouseMoveInfo({
            x: e.left,
            y: 0
        }),
        this.rulerAdsorbed[0] = 1)
    }
    execute() {
        1 === this.rulerAdsorbed[0] && (movement.doMove(),
        movement.canMoveX = !1,
        this.rulerAdsorbed[0] = 0),
        1 === this.rulerAdsorbed[1] && (movement.doMove(),
        movement.canMoveY = !1,
        this.rulerAdsorbed[1] = 0),
        this.isBreakAdsorb(rulerBreakAdsorb)
    }
    setAlignment(e, t=[]) {
        t.forEach((t=>{
            "left" === t.type && 0 === this.adsorbed[0] && (setMouseMoveInfo({
                x: t.offset,
                y: 0
            }, e),
            this.adsorbed[0] = 1),
            "top" === t.type && 0 === this.adsorbed[1] && (setMouseMoveInfo({
                x: 0,
                y: t.offset
            }, e),
            this.adsorbed[1] = 1)
        }
        ))
    }
    executeAlignment(e) {
        var t = !1
          , i = getInstance(e);
        return 1 === this.adsorbed[0] && (t = !0,
        i.doMove(),
        i.canMoveX = !1,
        this.adsorbed[0] = 0),
        1 === this.adsorbed[1] && (t = !0,
        i.doMove(),
        i.canMoveY = !1,
        this.adsorbed[1] = 0),
        this.isBreakAdsorb(alignBreakAdsorb, e),
        t
    }
    isBreakAdsorb(e, t="move") {
        t = getInstance(t);
        var {mouseMoveInfo: i, _mouseMoveInfo: n} = getMouseMoveInfo(t);
        Math.abs(n.x - i.x) > e && (t.canMoveX = !0),
        Math.abs(n.y - i.y) > e && (t.canMoveY = !0)
    }
    destroy() {
        this.adsorbDistance = null
    }
    resetAdsorbMovement() {
        this.adsorbed = [0, 0]
    }
    resetCanmove(e) {
        (e = getInstance(e)).canMoveX = !0,
        e.canMoveY = !0
    }
}
function getMouseMoveInfo(e) {
    return {
        mouseMoveInfo: {
            x: e.mouseMoveInfo.x,
            y: e.mouseMoveInfo.y
        },
        _mouseMoveInfo: {
            x: e._mouseMoveInfo.x,
            y: e._mouseMoveInfo.y
        }
    }
}
function setMouseMoveInfo({x: e, y: t}, i="move") {
    switch (i) {
    case "move":
        movement.mouseMoveInfo.x += e,
        movement.mouseMoveInfo.y += t;
        break;
    case "resize":
        resizer.offset.x = e,
        resizer.offset.y = t
    }
}
function getInstance(e) {
    switch (e) {
    case "move":
        return movement;
    case "resize":
        return resizer
    }
}
const defaultStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    backgroundColor: "#CCFF99"
};
class DistanceLine {
    constructor(e, t) {
        var {alignmentLines: i} = e.root.config.theme;
        this.parent = e,
        this.index = t,
        this.el = null,
        this.toolTip = null,
        this.leftSide = null,
        this.rightSide = null,
        this.index = t,
        this.isShow = !1,
        this.realWidth = i.distanceStyle.width,
        this.realHeight = i.distanceStyle.width,
        defaultStyle.backgroundColor = i.distanceStyle.color,
        this.toolTipWidth = 40,
        this.toolTipHeight = 20,
        this.sideWidth = 2,
        this.sideHeight = 2,
        this.sideShowSize = 8,
        this.init(t)
    }
    init(e) {
        this.el = createElement(),
        this.toolTip = createElement(),
        this.leftSide = createElement(),
        this.rightSide = createElement(),
        this.el.dataset.id = "distance-line" + e,
        this.toolTip.dataset.id = "tip" + e,
        this.leftSide.dataset.id = "left-side" + e,
        this.rightSide.dataset.id = "right-side" + e,
        this.initStyle(),
        this.el.appendChild(this.toolTip),
        this.el.appendChild(this.leftSide),
        this.el.appendChild(this.rightSide),
        this.parent.el.appendChild(this.el)
    }
    initStyle() {
        Object.assign(this.el.style, defaultStyle, {
            display: "none",
            width: this.realWidth + "px",
            height: this.realHeight + "px",
            zIndex: 20
        }),
        Object.assign(this.toolTip.style, defaultStyle, {
            display: "block",
            width: this.toolTipWidth + "px",
            height: this.toolTipHeight + "px",
            color: "#333",
            lineHeight: this.toolTipHeight + "px",
            textAlign: "center"
        }),
        Object.assign(this.leftSide.style, defaultStyle, {
            display: "block",
            width: this.sideWidth + "px",
            height: this.sideHeight + "px"
        }),
        Object.assign(this.rightSide.style, defaultStyle, {
            display: "block",
            width: this.sideWidth + "px",
            height: this.sideHeight + "px"
        })
    }
    resetStyle() {
        this.initStyle(),
        this.isShow = !1
    }
    show(e, t, i=1) {
        if (e)
            switch (this.isShow = !0,
            t) {
            case 0:
                Object.assign(this.el.style, {
                    display: "block",
                    left: e.pos + ("vl" === e.from.type ? -1 : 0) + "px",
                    top: e.from.start - e.distance + "px",
                    height: e.distance + "px",
                    transform: `scaleX(${1 / i})`
                }),
                this.showTipY(e, i),
                this.showSideY(e);
                break;
            case 1:
                Object.assign(this.el.style, {
                    display: "block",
                    left: e.pos + ("vl" === e.from.type ? -1 : 0) + "px",
                    top: e.from.end + "px",
                    height: e.distance + "px",
                    transform: `scaleX(${1 / i})`
                }),
                this.showTipY(e, i),
                this.showSideY(e);
                break;
            case 2:
                Object.assign(this.el.style, {
                    display: "block",
                    left: e.from.start - e.distance + "px",
                    top: e.pos + ("ht" === e.from.type ? -1 : 0) + "px",
                    width: e.distance + "px",
                    transform: `scaleY(${1 / i})`
                }),
                this.showTipX(e, i),
                this.showSideX(e);
                break;
            case 3:
                Object.assign(this.el.style, {
                    display: "block",
                    left: e.from.end + "px",
                    top: e.pos + ("ht" === e.from.type ? -1 : 0) + "px",
                    width: e.distance + "px",
                    transform: `scaleY(${1 / i})`
                }),
                this.showTipX(e, i),
                this.showSideX(e)
            }
    }
    showTipX(e, t) {
        this.toolTip.innerText = e.distance,
        Object.assign(this.toolTip.style, {
            left: e.distance / 2 - 20 + "px",
            transform: `scaleX(${1 / t})`
        })
    }
    showTipY(e, t) {
        this.toolTip.innerText = e.distance,
        Object.assign(this.toolTip.style, {
            top: e.distance / 2 - 10 + "px",
            transform: `scaleY(${1 / t})`
        })
    }
    showSideX(e) {
        Object.assign(this.leftSide.style, {
            height: this.sideShowSize + "px",
            transform: "translate(0, -50%)"
        }),
        Object.assign(this.rightSide.style, {
            height: this.sideShowSize + "'px",
            transform: `translate(${e.distance - this.sideWidth}px, -50%)`
        })
    }
    showSideY(e) {
        Object.assign(this.leftSide.style, {
            width: this.sideShowSize + "px",
            transform: "translate(-50%, 0)"
        }),
        Object.assign(this.rightSide.style, {
            width: this.sideShowSize + "px",
            transform: `translate(-50%, ${e.distance - this.sideHeight}px)`
        })
    }
}
class DistanceTip {
    constructor(e) {
        this.parent = e,
        this.left = [],
        this.right = [],
        this.top = [],
        this.bottom = [],
        this.compareLines = this._compareLines(),
        this.ratio = 1
    }
    show(e) {
        this.init(),
        this.setLines(e),
        this.showLines()
    }
    init() {
        this.left = [],
        this.right = [],
        this.top = [],
        this.bottom = []
    }
    setLines(e=[]) {
        const t = {
            ht: 0,
            hm: 1,
            hb: 2
        }
          , i = {
            vl: 0,
            vm: 1,
            vr: 2
        };
        e.forEach((e=>{
            var n = e.from.type;
            n.includes("v") ? (e.start < e.from.start && (this.top[i[n]] = this._setDistanceItem({
                target: this.top[i[n]],
                line: e,
                index: 0
            })),
            e.end > e.from.end && (this.bottom[i[n]] = this._setDistanceItem({
                target: this.bottom[i[n]],
                line: e,
                index: 1
            }))) : (e.start < e.from.start && (this.left[t[n]] = this._setDistanceItem({
                target: this.left[t[n]],
                line: e,
                index: 2
            })),
            e.end > e.from.end && (this.right[t[n]] = this._setDistanceItem({
                target: this.right[t[n]],
                line: e,
                index: 3
            })))
        }
        ))
    }
    showLines() {
        var e = this.parent.distanceLines;
        const t = [this.top, this.bottom, this.left, this.right];
        e.forEach(((e,i)=>{
            e.resetStyle();
            var n = this._getLine(t[i], i);
            e.show(n, i, this.ratio)
        }
        ))
    }
    hideLines() {
        this.parent.distanceLines.forEach((e=>{
            e.resetStyle()
        }
        ))
    }
    _getLine(e, t) {
        return e.forEach((e=>{
            e.distance = Math.round(Math.abs(this.compareLines.get(t)(e)))
        }
        )),
        e.sort(((e,t)=>e.distance - t.distance))[0]
    }
    _compareLines() {
        var e = new Map;
        return e.set(0, compareLinesLT),
        e.set(1, compareLinesRB),
        e.set(2, compareLinesLT),
        e.set(3, compareLinesRB),
        e
    }
    _setDistanceItem(e={}) {
        var {target: e, index: t, line: i} = e;
        return e && Math.abs(this.compareLines.get(t)(e)) <= Math.abs(this.compareLines.get(t)(i)) ? e : i
    }
}
function compareLinesLT(e) {
    return e.end >= e.from.start ? e.from.start - e.start : e.from.start - e.end
}
function compareLinesRB(e) {
    return e.start <= e.from.end ? e.from.end - e.end : e.from.end - e.start
}
const handlerFnArr = [[0], [1], [2], [3], [0, 2], [0, 3], [1, 2], [1, 3]];
class AlignmentLinesManager {
    constructor() {
        this.parent = null,
        this.el = createElement(),
        this.el.dataset.id = "alignment",
        this.el.style.cssText = "position:absolute;top:0;left:0;z-index:21;",
        this.lineEntities = null,
        this.graphLinesData = {},
        this.graphLayerIds = {},
        this.alignmentLines = null,
        this.updated = !1,
        this.lineSelect = null,
        this.adsorb = null,
        this.adsorbLinesInfo = null,
        this.distanceLines = null,
        this.distanceTip = null
    }
    init(e, t) {
        if (!this.parent) {
            this.parent = t,
            this.root = e,
            mount(this, {
                contentEl: t.el
            }),
            this.lineEntities = [];
            for (let t = 0; t < 6; t++) {
                var i = new Line(e,t);
                mount(i, this),
                this.lineEntities.push(i)
            }
            this.distanceLines = [];
            for (let e = 0; e < 4; e++)
                this.distanceLines.push(new DistanceLine(this,e));
            this.alignmentLines = {
                v: [],
                h: []
            },
            this.updated = !1,
            this.lineSelect = new AlignmentLines,
            this.adsorb = new Adsorb,
            this.distanceTip = new DistanceTip(this),
            this.initEvent(),
            this.resetStore()
        }
    }
    disable() {
        this.destroyEvent(),
        this.enable = !1,
        this.lineEntities && this.lineEntities.forEach((e=>e.destroy())),
        unmount(this),
        this.lineEntities = null,
        this.lineSelect = null,
        this.adsorb = null,
        this.adsorbLinesInfo = null,
        this.parent = null,
        this.root = null,
        this.distanceLines = null,
        this.distanceTip = null
    }
    destroy() {
        this.disable(),
        this.el = null,
        this.graphLinesData = null,
        this.graphLayerIds = null
    }
    initEvent() {
        var e = this.root;
        e.on("select", this.resetStore, this),
        e.on("graphMoveEnd", this.hidden, this),
        e.on("graphResizeEnd", this.hidden, this)
    }
    destroyEvent() {
        var e = this.root;
        e && (e.off("select", this.resetStore, this),
        e.off("graphMoveEnd", this.hidden, this),
        e.off("graphResizeEnd", this.hidden, this))
    }
    addLine(e, t, i) {
        e && i && (this.updated = !1,
        this.graphLinesData[e] = i,
        this.graphLayerIds[e] = t)
    }
    removeLine(e) {
        e && (this.updated = !1,
        e in this.graphLinesData && delete this.graphLinesData[e],
        e in this.graphLayerIds) && delete this.graphLayerIds[e]
    }
    resetStore() {
        var e = selector.getContainers();
        if (!(e.length <= 0)) {
            let s;
            if ("layer" !== this.root.alignmentLineBase || (s = getLayerId(e))) {
                var t, i = this.root.operation, n = (this.lineSelect.update(i.getSelectBoundRect()),
                getIds(e)), {graphLinesData: o, alignmentLines: r} = (this.alignmentLines = {
                    v: [],
                    h: []
                },
                this);
                for (const e in o)
                    this.canAddLine(n, e, s) && (t = o[e],
                    r.v = [...r.v, ...t.lines.v],
                    r.h = [...r.h, ...t.lines.h]);
                r.v = this.union(r.v),
                r.h = this.union(r.h),
                this.updated = !0,
                this.adsorb.resetAdsorbMovement()
            }
        }
    }
    union(e=[]) {
        const t = {};
        return e.forEach((e=>{
            var i, n;
            t[e.pos] ? (i = [(n = t[e.pos]).start, n.end, e.start, e.end].sort(((e,t)=>e - t)),
            n = [...this.getBefore(n), ...this.getBefore(e)],
            t[e.pos] = {
                ...e,
                start: i[0],
                end: i[3],
                isCombine: !0,
                before: n
            }) : t[e.pos] = e
        }
        )),
        Object.values(t).sort(((e,t)=>e.pos - t.pos))
    }
    getBefore(e={}) {
        var t = e.before;
        return !t || t.length < 1 ? [e] : [...t]
    }
    repaint({event: e, handler: t}, i="move") {
        var n, o;
        this.updated && !selector.getLayers().length && (n = selector.getContainers(),
        this.parent ? (o = (o = this.root.operation).getSelectBoundRect()) && (this.lineSelect.update(o),
        this.updateContainerAlignmentLines(n),
        e) && (!(o = this.showLine(i, t, e).info).length || [37, 38, 39, 40].includes(e.keyCode) ? clearStopMove.call(this, i) : executeAdsorb.call(this, o, i, t)) : this.updateContainerAlignmentLines(n))
    }
    updateContainerAlignmentLines(e=[]) {
        e.forEach((e=>{
            e.alignmentLines && e.alignmentLines.update(e.bound.plainReal())
        }
        ))
    }
    showLine(e="move", t=null, i={}) {
        var n = this.lineSelect.calcNearLine(this.alignmentLines);
        const o = this.parent.getZoom()
          , r = []
          , s = [];
        if (Array.isArray(n.vLines) && Array.isArray(n.hLines)) {
            const a = [...n.vLines, ...n.hLines]
              , l = [...n.vLinesAll, ...n.hLinesAll]
              , c = [37, 38, 39, 40];
            this.lineEntities.forEach(((n,h)=>{
                h = ("move" === e ? a : l)[h],
                n.resetStyle(),
                !h || h.val > this.adsorb.adsorbDistance / o || "resize" === e && h.from.type.includes("m") || c.includes(i.keyCode) && 0 !== h.val ? n.hidden() : (n.show(getLineStyle(h, o)),
                r.push(h),
                "move" === e && s.push(getMoveInfo(h)),
                "resize" === e && s.push(getResizeInfo(h, t)))
            }
            )),
            this.distanceTip.ratio = o,
            this.distanceTip.show(r)
        }
        return {
            lines: r,
            info: s
        }
    }
    hidden() {
        this.lineEntities && this.lineEntities.forEach((e=>{
            e.resetStyle()
        }
        )),
        this.distanceTip.hideLines(),
        this.adsorb.resetAdsorbMovement()
    }
    canAddLine(e, t, i) {
        return e = e.includes(t),
        t = "canvas" === this.root.alignmentLineBase || this.graphLayerIds[t] === i,
        !e && t
    }
}
function clearStopMove(e) {
    this.adsorb.resetCanmove(e)
}
function executeAdsorb(e, t, i) {
    this.adsorb.ratio = this.parent.getZoom(),
    this.adsorb.setAlignment(t, e),
    this.adsorb.executeAlignment(t) && this.showLine(t, i)
}
function getIds(e) {
    return e.map ? e.map((e=>e.id)) : []
}
function getLineStyle(e, t) {
    var i = [e.start, e.end, e.from.start, e.from.end].sort(((e,t)=>e - t));
    return e.type.includes("v") ? {
        top: i[0] + "px",
        left: e.pos + ("vl" === e.from.type ? -1 : 0) + "px",
        transform: `scaleX(${1 / t})`,
        height: Math.abs(i[3] - i[0]) + "px"
    } : {
        top: e.pos + ("ht" === e.from.type ? -1 : 0) + "px",
        left: i[0] + "px",
        transform: `scaleY(${1 / t})`,
        width: Math.abs(i[3] - i[0]) + "px"
    }
}
function getMoveInfo(e) {
    var {pos: e, from: t, type: i} = e;
    e = Math.round(e) - Math.round(t.pos);
    return i.includes("v") ? {
        offset: e,
        type: "left"
    } : i.includes("h") ? {
        offset: e,
        type: "top"
    } : {}
}
function getResizeInfo(e, t) {
    const i = ["ht", "hb", "vl", "vr"];
    t = handlerFnArr[t.index].map((e=>i[e]));
    var {pos: e, from: n, type: o} = e;
    e = Math.round(e) - Math.round(n.pos);
    if (n && n.type && !n.type.includes("m")) {
        if (o.includes("v") && t.includes(n.type))
            return {
                offset: e,
                type: "left"
            };
        if (o.includes("h") && t.includes(n.type))
            return {
                offset: e,
                type: "top"
            }
    }
    return {}
}
function getLayerId(e) {
    var t = new Set;
    for (let i, n = 0; i = e[n]; n++) {
        if (1 < t.size)
            return null;
        t.add(getLayerParentId(i))
    }
    return Array.from(t)[0]
}
const alignmentLinesManager = new AlignmentLinesManager
  , alignmentLines = {
    setup(e) {
        e.mixin({
            ui: {
                enableAlignment: enableAlignment,
                disableAlignment: disableAlignment
            }
        })
    },
    container: {
        beforeMount() {
            var e = new AlignmentLines(this.bound.plainReal());
            alignmentLinesManager.addLine(this.id, getLayerParentId(this), e),
            this.alignmentLines = e
        },
        beforeDestroy() {
            alignmentLinesManager.removeLine(this.id),
            this.alignmentLines = null
        }
    },
    ui: {
        beforeMount() {
            this.on("graphMoving", repaintMove),
            this.on("graphResizing", repaintResize),
            this.on("moveLayer", updateAfterMoveLayer),
            this.on("canvasMode", playDisplayAlignment, this)
        },
        beforeDestroy() {
            this.off("graphMoving", repaintMove),
            this.off("graphResizing", repaintResize),
            this.off("canvasMode", playDisplayAlignment, this)
        }
    },
    canvas: {
        mounted() {
            alignmentLinesManager.init(this.root, this)
        },
        beforeDestroy() {
            alignmentLinesManager.disable()
        }
    }
};
function enableAlignment() {
    alignmentLinesManager.init(this, this.canvas)
}
function disableAlignment() {
    alignmentLinesManager.disable()
}
function repaintMove(e) {
    alignmentLinesManager.repaint(e, "move")
}
function repaintResize(e) {
    alignmentLinesManager.repaint(e, "resize")
}
function updateAfterMoveLayer({layers: e}) {
    e && e.length && e.forEach((e=>alignmentLinesManager.updateContainerAlignmentLines(e.containers)))
}
function playDisplayAlignment(e) {
    this.CANVASMODE.PLAY === e ? this.disableAlignment() : this.CANVASMODE.EDIT === e && this.enableAlignment()
}
class CreateEl {
    constructor(e) {
        var {ruler: t} = e.config.theme;
        this.background = t.color,
        this.depth = t.width,
        this.lineColor = t.lineStyle.color,
        this.lineWidth = t.lineStyle.width,
        this.crossLine = t.border,
        this.iconBorderWidth = t.icon.borderWidth,
        this.iconBorderStyle = t.icon.borderStyle,
        this.iconBorderColor = t.icon.borderColor,
        this.iconColor = t.iconColor || t.icon.color,
        this.rulerLineWidth = 5,
        this.svgShowLine = '<svg t="1635145517567" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6078" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><path d="M512 344c-92.64 0-168 75.36-168 168s75.36 168 168 168 168-75.36 168-168-75.36-168-168-168z m0 272a104 104 0 1 1 104-104 104.11 104.11 0 0 1-104 104z m312.36-284.89c-43.68-34.92-90.48-62.9-139.1-83.16-57.67-24-116-36.23-173.26-36.23S396.39 224 338.66 248.25c-48.54 20.38-95.33 48.51-139.07 83.62-46.75 37.53-77 72.54-94.15 95.3C79.61 461.47 66.51 490 66.51 512s13.1 50.53 38.93 84.83c17.15 22.76 47.4 57.77 94.15 95.3 43.74 35.11 90.53 63.24 139.07 83.62 57.73 24.24 116 36.53 173.34 36.53s115.59-12.19 173.26-36.23c48.62-20.26 95.42-48.24 139.1-83.16C888.48 641.64 957.49 563.17 957.49 512s-69.01-129.64-133.13-180.89z m41.36 230.3c-21.37 28-51 57.48-83.39 83.14C733.39 683.29 633.2 748.28 512 748.28c-120.49 0-220.6-65-269.55-103.83-32.32-25.6-62-55.12-83.59-83.11s-27.78-45.11-28.33-49.34c0.55-4.23 6.63-21.2 28.33-49.34s51.27-57.51 83.59-83.11C291.4 340.77 391.51 275.72 512 275.72c121.2 0 221.39 65 270.33 103.73 32.41 25.66 62 55.18 83.39 83.14C887.43 491 893.13 508 893.48 512c-0.35 4-6.05 21-27.76 49.41z" fill="currentColor" p-id="6079"></path></svg>',
        this.svgHideLine = '<svg t="1635143522523" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5772" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><path d="M824.36 331.11A615.73 615.73 0 0 0 774.27 295l124.48-124.49a32 32 0 0 0-45.25-45.26l-137 137q-15.5-7.7-31.24-14.25c-57.67-24-116-36.23-173.26-36.23S396.39 224 338.66 248.25c-48.54 20.38-95.33 48.51-139.07 83.62-46.75 37.53-77 72.54-94.15 95.3C79.61 461.47 66.51 490 66.51 512s13.1 50.53 38.93 84.83c17.15 22.76 47.4 57.77 94.15 95.3a621.85 621.85 0 0 0 50.48 36.55L125.25 853.5a32 32 0 0 0 45.26 45.25L307.7 761.56q15.35 7.61 31 14.19c57.73 24.24 116 36.53 173.34 36.53s115.59-12.19 173.26-36.23c48.62-20.26 95.42-48.24 139.1-83.16C888.48 641.64 957.49 563.17 957.49 512s-69.01-129.64-133.13-180.89zM242.45 644.45c-32.32-25.6-62-55.12-83.59-83.11s-27.78-45.11-28.33-49.34c0.55-4.23 6.63-21.2 28.33-49.34s51.27-57.51 83.59-83.11C291.4 340.77 391.51 275.72 512 275.72c58 0 111.25 14.91 156.33 34.69L606 372.79A167 167 0 0 0 512 344c-92.64 0-168 75.36-168 168a167 167 0 0 0 28.79 94l-76.24 76.24a548.79 548.79 0 0 1-54.1-37.79zM616 512a104 104 0 0 1-151.34 92.59l139.93-139.93A103.42 103.42 0 0 1 616 512z m-208 0a104 104 0 0 1 151.34-92.59L419.41 559.34A103.42 103.42 0 0 1 408 512z m457.72 49.41c-21.37 28-51 57.48-83.39 83.14C733.39 683.29 633.2 748.28 512 748.28c-57.88 0-111-15-156.11-34.91l62.16-62.16A167 167 0 0 0 512 680c92.64 0 168-75.36 168-168a167 167 0 0 0-28.79-93.95l76.56-76.57a545.78 545.78 0 0 1 54.56 38c32.41 25.66 62 55.18 83.39 83.14C887.43 491 893.13 508 893.48 512c-0.35 4-6.05 21-27.76 49.41z" fill="currentColor" p-id="5773"></path></svg>',
        this.createRuler(e)
    }
    createDom(e) {
        var t = e.canvas ? createElement(e.canvas) : createElement();
        return t.dataset.id = e.id,
        t.style.cssText = e.style,
        e.title && (t.title = e.title),
        mount({
            el: t
        }, e.parent),
        t
    }
    createRuler(e) {
        this.ruler = this.createDom({
            id: "ruler",
            style: "position: absolute;\n              top: 0;\n              left: 0;\n              width:100%;",
            parent: e
        }),
        this.createRulerFill(),
        this.createRulerTop(),
        this.createRulerLeft(),
        this.createCount(),
        this.createExpectionLine()
    }
    createRulerTop() {
        this.rulerTop = this.createDom({
            id: "ruler-top",
            style: `position: absolute;\n              top: 0;\n              left: 0;\n              width: 30000px;\n              height: ${this.depth}px;\n              margin-left: ${this.depth}px;\n              background: ${this.background};\n              overflow: hidden;\n              z-index: 500;\n              border-bottom: ${this.crossLine};\n              box-sizing: border-box;`,
            parent: {
                el: this.ruler
            }
        }),
        this.createTopBoard(),
        this.createTopCanvas()
    }
    createTopBoard() {
        this.rulerTopBoard = this.createDom({
            id: "ruler-top-board",
            style: "position: absolute;",
            parent: {
                el: this.rulerTop
            }
        })
    }
    createTopCanvas() {
        this.rulerTopCanvas = this.createDom({
            canvas: "canvas",
            id: "ruler-top-canvas",
            style: "display: inline-block;\n              vertical-align: baseline;",
            parent: {
                el: this.rulerTopBoard
            }
        }),
        this.rulerTopCanvas.width = 8e3,
        this.rulerTopCanvas.height = this.depth
    }
    createTopLine(e=0) {
        return e = this.createDom({
            id: "ruler-top-line",
            title: "双击删除参考线",
            style: `width: ${this.rulerLineWidth}px;\n              height: 100vh;\n              background-color: transparent;\n              position: absolute;\n              cursor: col-resize;\n              z-index: 510;\n              transform: translateX(${e});\n              `,
            parent: {
                el: this.ruler
            }
        }),
        this.createTopLineItem(e),
        e
    }
    createTopLineItem(e) {
        this.createDom({
            id: "ruler-top-line-item",
            style: `border-left: ${this.lineWidth}px solid ${this.lineColor};\n              height: 100%;\n              margin-left: 0px`,
            parent: {
                el: e
            }
        })
    }
    createRulerLeft() {
        var e = "rotate(90deg) translateX(0px)"
          , t = "0 100% 0";
        this.rulerLeft = this.createDom({
            id: "ruler-left",
            style: `position: absolute;\n              top: 0;\n              left: 0;\n              width: 30000px;\n              height: ${this.depth}px;\n              background: ${this.background};\n              border-top: ${this.crossLine};\n              box-sizing: border-box;\n              overflow: hidden;\n              transform: ${e};\n              transform-origin: ${t};\n              -moz-transform: ${e};\n              -moz-transform-origin: ${t};\n              -webkit-transform: ${e};\n              -webkit-transform-origin: ${t};\n              z-index: 500;`,
            parent: {
                el: this.ruler
            }
        }),
        this.createLeftBoard(),
        this.createLeftCanvas()
    }
    createLeftBoard() {
        this.rulerLeftBoard = this.createDom({
            id: "ruler-left-board",
            style: "position: absolute;",
            parent: {
                el: this.rulerLeft
            }
        })
    }
    createLeftCanvas() {
        this.rulerLeftCanvas = this.createDom({
            canvas: "canvas",
            id: "ruler-left-canvas",
            style: "display: inline-block;\n              vertical-align: baseline;",
            parent: {
                el: this.rulerLeftBoard
            }
        }),
        this.rulerLeftCanvas.width = 8e3,
        this.rulerLeftCanvas.height = this.depth
    }
    createLeftLine(e) {
        return e = this.createDom({
            id: "ruler-left-line",
            title: "双击删除参考线",
            style: `width: 100%;\n              height: ${this.rulerLineWidth}px;\n              background-color: transparent;\n              position: absolute;\n              cursor: row-resize;\n              z-index: 500;\n              transform: translateY(${e})`,
            parent: {
                el: this.ruler
            }
        }),
        this.createLeftLineItem(e),
        e
    }
    createLeftLineItem(e) {
        this.createDom({
            id: "ruler-left-line-item",
            style: `border-top: ${this.lineWidth}px solid ${this.lineColor};\n              width: 100%;\n              margin-top: 0px`,
            parent: {
                el: e
            }
        })
    }
    createCount() {
        this.rulerCount = this.createDom({
            id: "ruler-count",
            style: `position: absolute;\n              top: ${this.depth + 2}px;\n              left: ${this.depth + 2}px;\n              z-index: 500;\n              padding: 0 5px;\n              min-width: 10px;\n              height: 20px;\n              background-color: #777;\n              color: azure;\n              font-size:14px;\n              user-select: none;\n              display: none;`,
            parent: {
                el: this.ruler
            }
        })
    }
    createExpectionLine() {
        this.createExpectionTopLine(),
        this.createExpectionLeftLine()
    }
    createExpectionTopLine() {
        this.expectionTopLine = this.createDom({
            id: "expection-top-line",
            style: `border-left: 1px dashed ${this.lineColor};\n              height: 100vh;\n              position: absolute;\n              left: 0px;\n              topo: 0px;\n              z-index: 510;\n              pointer-events: none;\n              display: none;\n              `,
            parent: {
                el: this.ruler
            }
        })
    }
    createExpectionLeftLine() {
        this.expectionLeftLine = this.createDom({
            id: "expection-left-line",
            style: `border-top: 1px dashed ${this.lineColor};\n              width: 100%;\n              position: absolute;\n              top: 0px;\n              left: 0px;\n              z-index: 510;\n              pointer-events: none;\n              display: none;\n              `,
            parent: {
                el: this.ruler
            }
        })
    }
    createRulerFill() {
        var e = this.guideLine = createElement("div");
        e.id = "ruler-fill",
        e.style = `\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: ${this.depth}px;\n      height: ${this.depth}px;\n      background: ${this.background};\n      z-index: 600;\n      color: ${this.iconColor};\n      cursor: pointer;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-color: ${this.iconBorderColor};\n      border-style: ${this.iconBorderStyle};\n      border-width: ${this.iconBorderWidth};\n      box-sizing: border-box;`,
        e.innerHTML = this.svgShowLine,
        this.ruler.appendChild(e)
    }
}
const rulerMap = {
    top: (e,t,i,n)=>({
        line: [[e, 0], [e, t]],
        text: [i, n, t]
    }),
    left: (e,t,i,n,o)=>({
        line: [[e, o - t], [e, o]],
        text: [i, n, o - t]
    })
}
  , lineStyle = {
    top: "left",
    left: "top"
}
  , setLineOffset = {
    top: e=>`translateY(${e})`,
    left: e=>`translateX(${e})`
};
class RulerCanvas {
    constructor(e) {
        e = e.config.theme.ruler;
        this.config = {
            rulerWidth: 0,
            interval: 10,
            distance: 0,
            rulerCont: {},
            rulerDistance: 0,
            defaultDial: 1e3,
            textFont: e.tick.textFont,
            textColor: e.tick.textColor,
            lineWidth: e.tick.lineWidth,
            lineColor: e.tick.lineColor,
            lineLong: e.tick.lineLong,
            lineShort: e.tick.lineShort,
            rulerDepth: e.width,
            rulerLineActiveColor: e.lineStyle.activeColor,
            rulerLineColor: e.lineStyle.color
        },
        this.adsorb = !1,
        this.targetSite = {},
        this.adsorbDistance = 15,
        this.events = {},
        this.bindEvents()
    }
    createDial(e, t) {
        this._setInterval(e);
        e = Number((e * this.config.interval).toFixed(2));
        var i = parseFloat(e)
          , n = (e = this.rulerCanvas).getContext("2d")
          , o = (this.handleFuzzy(e, n),
        n.clearRect(0, 0, e.width, e.height),
        this.config.rulerWidth)
          , r = this.config.rulerDepth
          , s = this.config.lineLong
          , a = this.config.lineShort;
        for (let e = 0; e < o; e += 10) {
            var l = e * i
              , c = e * this.config.interval - this.config.defaultDial
              , h = l + i / 2
              , {line: c, text: h} = rulerMap[t](l, s, c, h, r);
            this.fillText(n, h, t),
            this.drawLine(n, c);
            for (let e = 1; e < 10; e += 1) {
                var u = l + e * i;
                u = rulerMap[t](u, a, void 0, void 0, r).line;
                this.drawLine(n, u)
            }
        }
    }
    handleFuzzy(e, t) {
        var i = this.getPixelRatio(t);
        e.style.width = this.config.rulerWidth + "px",
        e.style.height = this.config.rulerDepth + "px",
        e.width = this.config.rulerWidth * i,
        e.height = this.config.rulerDepth * i,
        t.scale(i, i)
    }
    getPixelRatio(e) {
        return e = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1,
        (window.devicePixelRatio || 1) / e
    }
    fillText(e, t, i) {
        e.font = this.config.textFont,
        e.fillStyle = this.config.textColor,
        "left" === i ? (i = e.measureText(t[0]).width,
        e.save(),
        e.translate(t[1] + i, t[2]),
        e.rotate(180 * Math.PI / 180),
        e.fillText(t[0], 0, 0),
        e.restore()) : e.fillText(t[0], t[1], t[2])
    }
    drawLine(e, t) {
        e.beginPath(),
        e.moveTo(t[0][0], t[0][1]),
        e.lineTo(t[1][0], t[1][1]),
        e.lineWidth = this.config.lineWidth,
        e.strokeStyle = this.config.lineColor,
        e.stroke()
    }
    _setInterval(e) {
        return !(isUnDef(e) || !isType(e, "Number")) && (1.3 < (e = Number(e.toFixed(2))) ? (this.config.interval = 2,
        !0) : 1 < e && e <= 1.3 ? (this.config.interval = 5,
        !0) : .5 < e && e <= 1 ? (this.config.interval = 10,
        !0) : .2 < e && e <= .5 ? (this.config.interval = 20,
        !0) : .15 < e && e <= .2 ? (this.config.interval = 50,
        !0) : e <= .15 ? (this.config.interval = 100,
        !0) : void 0)
    }
    unmount(e) {
        unmount({
            el: e
        })
    }
    bindEvents() {
        ["addRulerLine", "showRulerCount", "hideRulerCount", "removeRulerLine", "dragRulerLine"].forEach((e=>this.events[e] = this[e].bind(this)))
    }
    startRuler(e, t) {
        this.zoom = t || this.zoom,
        this.config.distance = e || this.config.distance,
        this.config.rulerWidth = Math.max(parseInt(this.rulerCanvas.height), parseInt(this.rulerCanvas.width)) + this.config.defaultDial,
        this.scaleDial(this.config.distance),
        this.addEvent()
    }
    addEvent() {
        var e = this.rulerDistance;
        bind(e, "click", this.events.addRulerLine),
        bind(e, "mousemove", this.events.showRulerCount),
        bind(e, "mouseleave", this.events.hideRulerCount)
    }
    removeEvent() {
        var e = this.rulerDistance;
        unbind(e, "click", this.events.addRulerLine),
        unbind(e, "mousemove", this.events.showRulerCount),
        unbind(e, "mouseleave", this.events.hideRulerCount)
    }
    addRulerLine(e, t) {
        e.stopPropagation();
        e = lineStyle[t];
        var i = this.config.rulerCont[e];
        (t = this.els[`create ${initialCapital(t)}Line`](i)).dataset.cont = this.config.rulerCont.cont,
        t.style.transform = setLineOffset[e](i),
        t.style.display = this.ruler.hideAllLine ? "none" : "block",
        this.bindLineEvents(t),
        this.root.emit("rulerChange", this.getRulerLines())
    }
    parseRulerLine(e, t) {
        var i = lineStyle[e];
        (e = this.els[`create ${initialCapital(e)}Line`]()).dataset.cont = t,
        e.style.transform = setLineOffset[i](t),
        e.style.display = this.ruler.hideAllLine ? "none" : "block",
        this.bindLineEvents(e)
    }
    destroyRulerLine(e) {
        this.rulerCountStatus(!1),
        this.unmount(e),
        this.removeLineEvents(e)
    }
    bindLineEvents(e) {
        bind(e, "dblclick", this.events.removeRulerLine),
        bind(e, "mousedown", this.events.dragRulerLine),
        bind(e, "mousemove", this.events.showRulerCount),
        bind(e, "mouseleave", this.events.hideRulerCount)
    }
    removeRulerLine(e) {
        e.stopPropagation(),
        e = e.currentTarget,
        this.rulerCountStatus(!1),
        this.unmount(e),
        this.removeLineEvents(e),
        this.root.emit("rulerChange", this.getRulerLines())
    }
    removeLineEvents(e) {
        unbind(e, "dblclick", this.events.removeRulerLine),
        unbind(e, "mousedown", this.events.dragRulerLine),
        unbind(e, "mousemove", this.events.showRulerCount),
        unbind(e, "mouseleave", this.events.hideRulerCount)
    }
    dragRulerLine(e, t="left") {
        var i = !1;
        unbind(this.rulerDistance, "mousemove", this.events.showRulerCount),
        unbind(this.rulerDistance, "mouseleave", this.events.hideRulerCount),
        e.stopPropagation();
        const n = e.currentTarget;
        unbind(n, "mousemove", this.events.showRulerCount),
        unbind(n, "mouseleave", this.events.hideRulerCount),
        document.onmousemove = e=>{
            e.stopPropagation(),
            document.body.style.cursor = "col-resize";
            var o = "left" === t ? "clientX" : "clientY"
              , r = this.uiSite()
              , s = e[o];
            n[o] = s,
            n.style.transform = setLineOffset[t](s - r[t] + "px"),
            n.dataset.cont = parseInt((s - this.els.depth - this.config.distance - r[t]) / this.zoom),
            this.showRulerCount(e, t),
            i = i || !0
        }
        ,
        document.onmouseup = e=>{
            e.stopPropagation(),
            i && this.root.emit("rulerChange", this.getRulerLines()),
            i = !1,
            document.body.style.cursor = "",
            document.onmousemove = null,
            document.onmouseup = null,
            bind(this.rulerDistance, "mousemove", this.events.showRulerCount),
            bind(this.rulerDistance, "mouseleave", this.events.hideRulerCount),
            bind(n, "mousemove", this.events.showRulerCount),
            bind(n, "mouseleave", this.events.hideRulerCount)
        }
    }
    getDial(e, t) {
        return this.zoom = e,
        this.config.distance = parseInt(t),
        e = parseInt(this.config.defaultDial * this.zoom - this.config.distance),
        this.config.rulerDistance = 0 - e + "px",
        this.config.rulerDistance
    }
    setLineDial(e, t) {
        this.root.nextTick((()=>{
            this.getRulerLines(t).forEach((i=>{
                var n = this.config.rulerDepth
                  , o = i.dataset.cont;
                i.style.transform = setLineOffset[lineStyle[t]](o * this.zoom + e + n + "px")
            }
            ))
        }
        ))
    }
    uiSite() {
        let e = 0;
        return this.root._updateBound && this.root._updateBound(),
        this.root.ruler ? this.root.ruler.getBound(this.root) : e
    }
    showRulerCount(e, t="left") {
        e.stopPropagation();
        var i = e.target === this.rulerCanvas
          , n = (this.rulerCountStatus(!0),
        i && this.expectionLineStatus(!0),
        "left" === t ? e.clientX : e.clientY)
          , o = e.target.parentElement
          , r = (e = e.toElement,
        this.uiSite());
        o && o.getAttribute("data-cont") || e && e.getAttribute("data-cont") ? this.config.rulerCont.cont = o.getAttribute("data-cont") || e.getAttribute("data-cont") : this.config.rulerCont.cont = parseInt((n - this.els.depth - this.config.distance - r[t]) / this.zoom),
        this.config.rulerCont[t] = n - r[t] + "px",
        this.rulerCount.innerHTML = "" + this.config.rulerCont.cont,
        this.rulerCount.style[t] = this.config.rulerCont[t],
        i && (this.expectionLine.style[t] = n - r[t] + "px")
    }
    hideRulerCount(e) {
        e.stopPropagation(),
        this.rulerCountStatus(!1),
        this.expectionLineStatus(!1),
        this.rulerCount.style.left = this.els.depth + 2 + "px",
        this.rulerCount.style.top = this.els.depth + 2 + "px",
        this.expectionLine.style.top = "0px",
        this.expectionLine.style.left = "0px"
    }
    rulerCountStatus(e) {
        this.rulerCount.style.display = e ? "" : "none"
    }
    expectionLineStatus(e) {
        this.expectionLine.style.display = e ? "" : "none"
    }
    getRulerLines(e) {
        var t;
        return e ? _getRulerLines(e) : (e = _getRulerLines("top"),
        t = _getRulerLines("left"),
        [...e, ...t])
    }
    setRulerLineStyle(e, t, i) {
        const n = this.adsorbDistance;
        e.forEach((e=>{
            var o = Number(e.dataset.cont);
            o > i - n && o < i + n ? (e.children[0].style[t] = this.config.rulerLineActiveColor,
            e.dataset.adsorb = !0) : (e.children[0].style[t] = this.config.rulerLineColor,
            e.dataset.adsorb = !1)
        }
        ))
    }
    restoreLine(e, t) {
        e.forEach((e=>e.children[0].style[t] = this.config.rulerLineColor))
    }
}
function _getRulerLines(e) {
    return document.querySelectorAll(`[data-id=ruler-${e}-line]`)
}
class RulerTop extends RulerCanvas {
    constructor(e, t, i) {
        super(e),
        this.root = e,
        this.els = t,
        this.rulerDistance = t.rulerTop,
        this.rulerCanvas = t.rulerTopCanvas,
        this.rulerBoard = t.rulerTopBoard,
        this.rulerCount = t.rulerCount,
        this.expectionLine = t.expectionTopLine,
        this.zoom = i.zoom,
        this.ruler = i,
        this.startRuler()
    }
    scaleDial(e, t) {
        this.createDial(e, "top"),
        this.moveDial(e, t)
    }
    moveDial(e, t) {
        e = this.getDial(e, t),
        this.rulerBoard.style.transform = `translateX(${e})`,
        this.setLineDial(t, "top")
    }
    startRuler(e, t) {
        super.startRuler(e, t)
    }
    addRulerLine(e) {
        super.addRulerLine(e, "top")
    }
    doAdsorb(e) {
        var t = this.getRulerLines("top");
        return this.setRulerLineStyle(t, "border-left-color", parseInt(e)),
        t
    }
    unAdsorb() {
        var e = this.getRulerLines("top");
        this.adsorb = !1,
        this.restoreLine(e, "border-left-color")
    }
}
class RulerLeft extends RulerCanvas {
    constructor(e, t, i) {
        super(e),
        this.root = e,
        this.els = t,
        this.rulerDistance = t.rulerLeft,
        this.rulerCanvas = t.rulerLeftCanvas,
        this.rulerBoard = t.rulerLeftBoard,
        this.rulerCount = t.rulerCount,
        this.expectionLine = t.expectionLeftLine,
        this.zoom = i.zoom,
        this.ruler = i,
        this.startRuler()
    }
    scaleDial(e, t) {
        this.createDial(e, "left"),
        this.moveDial(e, t)
    }
    moveDial(e, t) {
        e = this.getDial(e, t),
        this.rulerBoard.style.transform = `translateX(${e})`,
        this.setLineDial(t, "left")
    }
    startRuler(e, t) {
        super.startRuler(e, t)
    }
    dragRulerLine(e) {
        super.dragRulerLine(e, "top")
    }
    showRulerCount(e) {
        super.showRulerCount(e, "top")
    }
    addRulerLine(e) {
        super.addRulerLine(e, "left")
    }
    doAdsorb(e) {
        var t = this.getRulerLines("left");
        return this.setRulerLineStyle(t, "border-top-color", parseInt(e)),
        t
    }
    unAdsorb() {
        var e = this.getRulerLines("left");
        this.adsorb = !1,
        this.restoreLine(e, "border-top-color")
    }
}
class Ruler {
    constructor(e) {
        var {ruler: t} = e.config.theme;
        return this.depth = t.width,
        this.parent = e,
        this.zoom = this.parent.canvas.getZoom(),
        this.hideAllLine = !1,
        this.render(),
        this._guideLine = this.guideLine.bind(this, this._elObject),
        this.bindEvent(),
        this.getInstance()
    }
    getInstance() {
        return Ruler.instance || (Ruler.instance = this),
        Ruler.instance
    }
    render() {
        this._elObject = new CreateEl(this.parent),
        this.rulerTop = new RulerTop(this.parent,this._elObject,this),
        this.rulerLeft = new RulerLeft(this.parent,this._elObject,this),
        this.adsorb = new Adsorb
    }
    bindEvent() {
        this.parent.on("canvasZoom", this.doCanvasZoom, this),
        this.parent.on("graphMoving", this.doGraphMoving, this),
        this.parent.on("graphMoveEnd", this.doGraphMoveEnd, this),
        this.parent.on("moveCanvas", this.doMoveCanvas, this),
        bind(this._elObject.guideLine, "click", this._guideLine)
    }
    destroyEvent() {
        this.parent.off("canvasZoom", this.doCanvasZoom, this),
        this.parent.off("graphMoving", this.doGraphMoving, this),
        this.parent.off("graphMoveEnd", this.doGraphMoveEnd, this),
        this.parent.off("moveCanvas", this.doMoveCanvas, this),
        unbind(this._elObject.guideLine, "click", this._guideLine)
    }
    guideLine(e) {
        var t = document.querySelectorAll("div[data-id=ruler] > div[data-id^='ruler'][data-id$='-line']");
        this.hideAllLine ? (t.forEach((e=>e.style.display = "block")),
        this.hideAllLine = !1,
        e.guideLine.innerHTML = e.svgShowLine) : (t.forEach((e=>e.style.display = "none")),
        this.hideAllLine = !0,
        e.guideLine.innerHTML = e.svgHideLine),
        this.parent.emit("rulerChange", this.getAllLines())
    }
    getAllLines() {
        return this.rulerTop.getRulerLines()
    }
    doMoveCanvas() {
        var e = this.getBound(this.parent.canvas)
          , t = this.getBound(this.parent);
        e && this.setRulerMove(e.left - t.left - this.depth, e.top - t.top - this.depth, this.zoom)
    }
    resize() {
        this.parent._updateBound(),
        this.doMoveCanvas()
    }
    doCanvasZoom(e) {
        this.zoom = e || this.zoom;
        e = this.getBound(this.parent.canvas);
        var t = this.getBound(this.parent);
        e && this.setRulerScale(e.left - t.left - this.depth, e.top - t.top - this.depth, this.zoom)
    }
    doGraphMoving({event: e, elements: t=null, isKeyMove: i=!1}) {
        e && t && !i && t.forEach(((e,t)=>{
            var {left: e, top: i, isGroup: n} = this.getBound(e);
            n && 0 < t || (n = this.rulerTop.doAdsorb(e),
            t = this.rulerLeft.doAdsorb(i),
            this.isAdsord({
                left: e,
                top: i,
                topLines: n,
                leftLines: t
            }))
        }
        ))
    }
    doGraphMoveEnd(e) {
        e && e.forEach((()=>{
            this.rulerTop.unAdsorb(),
            this.rulerLeft.unAdsorb()
        }
        ))
    }
    getBound(e) {
        var t, i;
        return "Canvas" === e.type ? (({left: t, top: i} = e.el.getBoundingClientRect()),
        {
            left: t,
            top: i
        }) : e.parent && "Group" === e.parent.type ? (({left: t, top: i} = e.parent.bound.plainReal()),
        {
            left: t,
            top: i,
            isGroup: !0
        }) : (({left: t, top: i} = e.bound.plainReal()),
        {
            left: t,
            top: i
        })
    }
    setRulerMove(e, t, i) {
        this.rulerTop.moveDial(i, e),
        this.rulerLeft.moveDial(i, t)
    }
    setRulerScale(e, t, i) {
        cancelAnimationFrame(this.__requestAnimationFrameId),
        this.__requestAnimationFrameId = requestAnimationFrame((()=>{
            this.rulerTop.scaleDial(i, e),
            this.rulerLeft.scaleDial(i, t)
        }
        ))
    }
    isAdsord({left: e, top: t, topLines: i, leftLines: n}) {
        const o = {};
        i.forEach((t=>{
            "true" === t.dataset.adsorb && (o.left = Number(t.dataset.cont) - e)
        }
        )),
        n.forEach((e=>{
            "true" === e.dataset.adsorb && (o.top = Number(e.dataset.cont) - t)
        }
        )),
        i = {
            left: o.left,
            top: o.top
        },
        this.adsorb.setOffset(i),
        this.adsorb.execute()
    }
    disable() {
        document.querySelector("[data-id=ruler]") && (this.destroyEvent(),
        this.rulerTop.removeEvent(),
        this.rulerLeft.removeEvent(),
        this.parent.el.removeChild(this._elObject.ruler))
    }
    enable() {
        document.querySelector("[data-id=ruler]") || (this.parent.el.appendChild(this._elObject.ruler),
        this.rulerTop.addEvent(),
        this.rulerLeft.addEvent(),
        this.bindEvent(),
        this.doCanvasZoom())
    }
    destroy() {
        this.disable(),
        this.zoom = null,
        this.parent = null,
        this._elObject = null,
        this.rulerTop = null,
        this.rulerLeft = null,
        this.adsorb = null
    }
    parseRulerLines(e) {
        this.getAllLines().forEach((e=>{
            this["ruler" + initialCapital(e.getAttribute("data-id").split("-")[1])].destroyRulerLine(e)
        }
        )),
        e.scene.lines.forEach((e=>{
            var t = e.option.type;
            e = e.option.cont;
            this["ruler" + initialCapital(t)].parseRulerLine(t, e)
        }
        )),
        this.hideAllLine !== e.scene.hideAllLine && this.guideLine(this._elObject)
    }
    getTopAndLeftLines() {
        return {
            topLines: this.rulerTop.getRulerLines("top"),
            leftLines: this.rulerLeft.getRulerLines("left")
        }
    }
    exportLineInfo() {
        var {topLines: e, leftLines: t} = this.getTopAndLeftLines()
          , i = {};
        const n = [];
        return e.length && e.forEach((e=>{
            n.push({
                type: "RulerTopLine",
                option: {
                    type: "top",
                    cont: e.dataset.cont
                }
            })
        }
        )),
        t.length && t.forEach((e=>{
            n.push({
                type: "RulerLeftLine",
                option: {
                    type: "left",
                    cont: e.dataset.cont
                }
            })
        }
        )),
        i.lines = n,
        i.hideAllLine = this.hideAllLine,
        i
    }
}
const rulerModule = {
    ui: {
        mounted() {
            this.ruler = new Ruler(this),
            this.on("canvasMode", playMode, this)
        },
        beforeDestroy() {
            this.off("canvasMode", playMode, this),
            this.ruler.destroy()
        }
    }
};
function playMode(e) {
    this.CANVASMODE.PLAY === e ? this.ruler.disable() : this.CANVASMODE.EDIT === e && this.ruler.enable()
}
const getBlueprintNode = e=>{
    if (THING && THING.CODELESS && THING.CODELESS.BaseNode) {
        class t extends THING.CODELESS.BaseNode {
            constructor() {
                super()
            }
            isEntrance() {
                return !0
            }
            onExecute(t, i, n) {
                e.onExecute(t, i, n, this)
            }
            onStop() {
                e.onStop(this)
            }
        }
        return t.config = {
            name: e.name,
            id: e.id,
            group: "THING-UI",
            inputs: [{
                name: "显示",
                type: "exec"
            }, {
                name: "隐藏",
                type: "exec"
            }, {
                name: "数据",
                type: "any"
            }],
            outputs: []
        },
        t
    }
    return log.warn("请先加载蓝图类"),
    null
}
;
function toBlueprintNode() {
    return getBlueprintNode(this)
}
function onExecute(e, t, i, n) {
    "显示" === (n = n.curExecName) ? this.show() : "隐藏" === n && this.hidden()
}
function onStop() {}
const bluePrintNodeModule = {
    setup(e) {
        e.mixin({
            container: {
                toBlueprintNode: toBlueprintNode,
                onExecute: onExecute,
                onStop: onStop
            },
            group: {
                toBlueprintNode: toBlueprintNode,
                onExecute: onExecute,
                onStop: onStop
            },
            layer: {
                toBlueprintNode: toBlueprintNode,
                onExecute: onExecute,
                onStop: onStop
            }
        })
    }
}
  , defaultFilters = {
    brightness: 1,
    contrast: 1,
    hueRotate: 0,
    opacity: 1,
    saturate: 1
};
class Filter {
    constructor(e, t) {
        this.parent = e,
        this.filters = null,
        t && (this.filters = clone(defaultFilters),
        this.update(t))
    }
    update(e) {
        if (!isType(e, "Object"))
            return !1;
        if (!this.filters)
            return log.warn("滤镜被清空了，请先重置后在设置新值"),
            !1;
        for (const t in e)
            e.hasOwnProperty(t) && this._setData(t, e[t]);
        return this.updateStyle()
    }
    getData() {
        return clone(this.filters)
    }
    setData(e, t) {
        return this.filters ? !!this._setData(e, t) && this.updateStyle() : (log.warn("滤镜被清空了，请先重置后在设置新值"),
        !1)
    }
    _setData(e, t) {
        return !(!hasOwn(this.filters, e) || this.filters[e] === t || !isType(t, "Number") || (this.filters[e] = t,
        0))
    }
    reset() {
        return this.filters = clone(defaultFilters),
        this.updateStyle()
    }
    toJSON() {
        return this.getData()
    }
    clear() {
        return this.filters = null,
        this.updateStyle()
    }
    updateStyle() {
        var e = this.filters;
        let t = "";
        return e && (t = `hue-rotate(${e.hueRotate}deg) contrast(${100 * e.contrast}%) opacity(${100 * e.opacity}%) saturate(${100 * e.saturate}%) brightness(${100 * e.brightness}%)`),
        this.parent.style.filter = t,
        !0
    }
    destroy() {
        return this.clear(),
        !(this.parent = null)
    }
}
const filterModule = {
    setup(e) {
        e.mixin({
            canvas: {
                enableFilter() {
                    return this.filter.reset()
                },
                getFilter() {
                    return this.filter.getData()
                },
                setFilter(e, t) {
                    return this.filter.setData(e, t)
                },
                updateFilter(e) {
                    return this.filter.update(e)
                },
                resetFilter() {
                    return this.filter.reset()
                },
                clearFiler() {
                    return this.filter.clear()
                }
            }
        })
    },
    canvas: {
        beforeMount() {
            this.filter = new Filter(this,this.options.filters)
        },
        beforeToJSON(e, t) {
            var i = this.filter.toJSON();
            i && (t.option.filters = i),
            delete t.option.style.filter
        },
        beforeDestroy() {
            this.filter.destroy()
        },
        destroyed() {
            this.filter = null
        }
    }
}
  , events = ["keydown", "keyup", "click", "mouseover", "contextmenu"];
class KeyMap {
    constructor(e) {
        this.parent = e,
        this._keyMap = new Map,
        this._keyDownEvent = this.keyDownEvent.bind(this),
        this.init()
    }
    init() {
        events.forEach((e=>{
            bind(document, e, this._keyDownEvent)
        }
        ))
    }
    register(e) {
        var t = e.code;
        this._keyMap.set(t, e)
    }
    _reset(e) {
        "click" !== e.type && "contextmenu" !== e.type && "Escape" !== e.code || !1 !== e.shiftKey || (t = this._keyMap.get("Shift") && this._keyMap.get("Shift").fn || {}).up && t.up(e);
        var t = isMac ? e.ctrlKey || e.metaKey : e.ctrlKey;
        "mouseover" === e.type && !1 === t && (t = this._keyMap.get("Control") && this._keyMap.get("Control").fn || {}).up && t.up(e)
    }
    keyDownEvent(e) {
        var t;
        this._reset(e),
        document.activeElement !== document.body && "Escape" !== e.code || (t = this.collect(e)) && (this._keyMap.has(t) || this._isMacResult(t)) && (e.preventDefault(),
        this.run(e, t))
    }
    _isMacResult(e) {
        return isMac && "Control+contextmenu" === e
    }
    collect(e) {
        var t = [];
        return "Shift" === e.key || "Control" === e.key || "Meta" === e.key || "Alt" === e.key ? t.push("Meta" === e.key && isMac ? "Control" : e.key) : (e.metaKey && t.push("Control"),
        e.ctrlKey && t.push("Control"),
        e.altKey && t.push("Alt"),
        e.shiftKey && t.push("Shift"),
        e.code ? t.push(e.code) : t.push(e.type)),
        t.join("+")
    }
    run(e, t) {
        if (this._keyMap.has(t)) {
            var i = this._keyMap.get(t).fn;
            if ("function" == typeof i)
                "keyup" !== e.type && i(e);
            else
                switch (e.type) {
                case "keydown":
                    i.down && i.down(e);
                    break;
                case "keyup":
                    i.up && i.up(e)
                }
        }
    }
    clear() {
        events.forEach((e=>{
            unbind(document, e, this._keyDownEvent)
        }
        )),
        this._keyMap.clear()
    }
}
let keyMap = null;
const keyMove = (e,t)=>({
    down: i=>{
        movement.moveKeyEvent(i, e, t)
    }
    ,
    up: ()=>{
        movement.upEvent()
    }
})
  , KeyMapMoudle = {
    setup(e) {
        e.mixin({
            ui: {
                keyMap: keyMap
            }
        })
    },
    ui: {
        beforeMount() {
            this.keyMap = new KeyMap(this),
            this.keyMap.register({
                name: "编组选中对象",
                code: "Control+KeyG",
                fn: ()=>{
                    this.selector.createGroup()
                }
            }),
            this.keyMap.register({
                name: "取消编组",
                code: "Control+Shift+KeyG",
                fn: ()=>{
                    this.selector.cancelGroup()
                }
            }),
            this.keyMap.register({
                name: "删除选中对象",
                code: "Delete",
                fn: ()=>{
                    this.selector.delete()
                }
            }),
            this.keyMap.register({
                name: "重做",
                code: "Control+KeyY",
                fn: ()=>{
                    this.redo()
                }
            }),
            this.keyMap.register({
                name: "取消",
                code: "Control+KeyZ",
                fn: ()=>{
                    this.undo()
                }
            }),
            this.keyMap.register({
                name: "取消",
                code: "Escape",
                fn: ()=>{
                    this.edit(),
                    this.exitInsidePreview(),
                    this.exitTextEdit()
                }
            }),
            this.keyMap.register({
                name: "向上移动1px",
                code: "ArrowUp",
                fn: keyMove(0, -1)
            }),
            this.keyMap.register({
                name: "向下移动1px",
                code: "ArrowDown",
                fn: keyMove(0, 1)
            }),
            this.keyMap.register({
                name: "向左移动1px",
                code: "ArrowLeft",
                fn: keyMove(-1, 0)
            }),
            this.keyMap.register({
                name: "向右移动1px",
                code: "ArrowRight",
                fn: keyMove(1, 0)
            }),
            this.keyMap.register({
                name: "向上移动10px",
                code: "Shift+ArrowUp",
                fn: keyMove(0, -10)
            }),
            this.keyMap.register({
                name: "向下移动10px",
                code: "Shift+ArrowDown",
                fn: keyMove(0, 10)
            }),
            this.keyMap.register({
                name: "向左移动10px",
                code: "Shift+ArrowLeft",
                fn: keyMove(-10, 0)
            }),
            this.keyMap.register({
                name: "向右移动10px",
                code: "Shift+ArrowRight",
                fn: keyMove(10, 0)
            }),
            this.keyMap.register({
                name: "画布移动",
                code: "Space",
                fn: {
                    down: e=>{
                        this._downSpace(e),
                        this.canvas._beginMove()
                    }
                    ,
                    up: e=>{
                        this._upSpace(e),
                        this.canvas._endMove()
                    }
                }
            }),
            this.keyMap.register({
                name: "多选模式",
                code: "Shift",
                fn: {
                    down: ()=>{
                        this.selector.enableMultSelect()
                    }
                    ,
                    up: ()=>{
                        this.selector.disableMultSelect()
                    }
                }
            }),
            this.keyMap.register({
                name: "编辑文本内容",
                code: "Enter",
                fn: ()=>{
                    this.enterTextEdit()
                }
            })
        },
        beforeDestroy() {
            this.keyMap.clear()
        }
    }
}
  , levelMap = {
    0: ["error", "warn", "info"],
    1: ["error", "warn"],
    2: ["error"]
};
class Log {
    constructor(e={}) {
        this.maxLog = e.maxLog || 100,
        this.printDate = Boolean(e.printDate) || !0,
        this.printOnBrowser = Boolean(e.printOnBrowser) || !0,
        this.level = isNumber(e.level) || 0,
        this._logRange = {},
        this._logStore = []
    }
    getLog() {
        return this._logStore.join("")
    }
    clearLog() {
        this._logStore = []
    }
    setLevel(e) {
        if (!Object.keys(levelMap).map((e=>Number(e))).includes(e))
            throw new Error("日志级别配置错误！");
        this.level = e
    }
    downloadLog() {
        var e = this.getLog()
          , t = (e = new Blob([e],{
            type: "data:text/plain;charset=utf-8"
        }),
        createElement("a"));
        t.href = window.URL.createObjectURL(e),
        t.target = "_blank",
        t.download = `THING.UI-${this.level}-log.txt`,
        document.body.appendChild(t),
        t.click(),
        document.body.removeChild(t),
        window.URL.revokeObjectURL(t.href)
    }
    record(e, t, ...i) {
        if (!levelMap[this.level].includes(e))
            return !1;
        this._logStore.length >= this.maxLog && this._logStore.shift(),
        this.printOnBrowser && log[e](...i);
        var n = "";
        n = (n += this.printDate ? `[THING.UI ${e}] ${this._date()} ` : `[THING.UI ${e}] `) + i.map((e=>JSON.stringify(e))).join(" ");
        return this._logStore.push(n += "\n"),
        this._logRange[t] = new Date,
        !0
    }
    output(e) {
        return new Date - this._logRange[e]
    }
    _date() {
        var e = new Date;
        return e.toLocaleDateString() + " " + e.toLocaleTimeString()
    }
}
const instance = new Log;
var index = {
    instance: instance,
    canvas: {
        beforeMount() {
            instance.record("info", this.id, `画布 ${this.id}被挂载`)
        },
        mounted() {
            instance.record("info", this.id, `画布 ${this.id}结束挂载，耗时` + instance.output(this.id))
        }
    },
    container: {
        beforeMount() {
            instance.record("info", this.id, `容器 ${this.id}被挂载`)
        },
        mounted() {
            instance.record("info", this.id, `容器 ${this.id}结束挂载，耗时` + instance.output(this.id))
        }
    },
    layer: {
        beforeMount() {
            instance.record("info", this.id, `图层 ${this.id}被挂载`)
        },
        mounted() {
            instance.record("info", this.id, `图层 ${this.id}结束挂载，耗时` + instance.output(this.id))
        }
    },
    group: {
        beforeMount() {
            instance.record("info", this.id, `编组 ${this.id}被挂载`)
        },
        mounted() {
            instance.record("info", this.id, `编组 ${this.id}结束挂载，耗时` + instance.output(this.id))
        }
    }
}
  , extendStatics = function(e, t) {
    return (extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }instanceof Array ? function(e, t) {
        e.__proto__ = t
    }
    : function(e, t) {
        for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
    }
    ))(e, t)
};
function __extends(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    function i() {
        this.constructor = e
    }
    extendStatics(e, t),
    e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
    new i)
}
var __assign = function() {
    return (__assign = Object.assign || function(e) {
        for (var t, i = 1, n = arguments.length; i < n; i++)
            for (var o in t = arguments[i])
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
    }
    ).apply(this, arguments)
};
function __awaiter(e, t, i, n) {
    return new (i = i || Promise)((function(o, r) {
        function s(e) {
            try {
                l(n.next(e))
            } catch (e) {
                r(e)
            }
        }
        function a(e) {
            try {
                l(n.throw(e))
            } catch (e) {
                r(e)
            }
        }
        function l(e) {
            var t;
            e.done ? o(e.value) : ((t = e.value)instanceof i ? t : new i((function(e) {
                e(t)
            }
            ))).then(s, a)
        }
        l((n = n.apply(e, t || [])).next())
    }
    ))
}
function __generator(e, t) {
    var i, n, o, r = {
        label: 0,
        sent: function() {
            if (1 & o[0])
                throw o[1];
            return o[1]
        },
        trys: [],
        ops: []
    }, s = {
        next: a(0),
        throw: a(1),
        return: a(2)
    };
    return "function" == typeof Symbol && (s[Symbol.iterator] = function() {
        return this
    }
    ),
    s;
    function a(s) {
        return function(a) {
            var l = [s, a];
            if (i)
                throw new TypeError("Generator is already executing.");
            for (; r; )
                try {
                    if (i = 1,
                    n && (o = 2 & l[0] ? n.return : l[0] ? n.throw || ((o = n.return) && o.call(n),
                    0) : n.next) && !(o = o.call(n, l[1])).done)
                        return o;
                    switch (n = 0,
                    (l = o ? [2 & l[0], o.value] : l)[0]) {
                    case 0:
                    case 1:
                        o = l;
                        break;
                    case 4:
                        return r.label++,
                        {
                            value: l[1],
                            done: !1
                        };
                    case 5:
                        r.label++,
                        n = l[1],
                        l = [0];
                        continue;
                    case 7:
                        l = r.ops.pop(),
                        r.trys.pop();
                        continue;
                    default:
                        if (!(o = 0 < (o = r.trys).length && o[o.length - 1]) && (6 === l[0] || 2 === l[0])) {
                            r = 0;
                            continue
                        }
                        if (3 === l[0] && (!o || l[1] > o[0] && l[1] < o[3]))
                            r.label = l[1];
                        else if (6 === l[0] && r.label < o[1])
                            r.label = o[1],
                            o = l;
                        else {
                            if (!(o && r.label < o[2])) {
                                o[2] && r.ops.pop(),
                                r.trys.pop();
                                continue
                            }
                            r.label = o[2],
                            r.ops.push(l)
                        }
                    }
                    l = t.call(e, r)
                } catch (a) {
                    l = [6, a],
                    n = 0
                } finally {
                    i = o = 0
                }
            if (5 & l[0])
                throw l[1];
            return {
                value: l[0] ? l[1] : void 0,
                done: !0
            }
        }
    }
}
function __spreadArray(e, t, i) {
    if (i || 2 === arguments.length)
        for (var n, o = 0, r = t.length; o < r; o++)
            !n && o in t || ((n = n || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
    return e.concat(n || t)
}
for (var Bounds = function() {
    function e(e, t, i, n) {
        this.left = e,
        this.top = t,
        this.width = i,
        this.height = n
    }
    return e.prototype.add = function(t, i, n, o) {
        return new e(this.left + t,this.top + i,this.width + n,this.height + o)
    }
    ,
    e.fromClientRect = function(t, i) {
        return new e(i.left + t.windowBounds.left,i.top + t.windowBounds.top,i.width,i.height)
    }
    ,
    e.fromDOMRectList = function(t, i) {
        return i = Array.from(i).find((function(e) {
            return 0 !== e.width
        }
        )),
        i ? new e(i.left + t.windowBounds.left,i.top + t.windowBounds.top,i.width,i.height) : e.EMPTY
    }
    ,
    e.EMPTY = new e(0,0,0,0),
    e
}(), parseBounds = function(e, t) {
    return Bounds.fromClientRect(e, t.getBoundingClientRect())
}, parseDocumentSize = function(e) {
    var t, i = e.body;
    e = e.documentElement;
    if (i && e)
        return t = Math.max(Math.max(i.scrollWidth, e.scrollWidth), Math.max(i.offsetWidth, e.offsetWidth), Math.max(i.clientWidth, e.clientWidth)),
        i = Math.max(Math.max(i.scrollHeight, e.scrollHeight), Math.max(i.offsetHeight, e.offsetHeight), Math.max(i.clientHeight, e.clientHeight)),
        new Bounds(0,0,t,i);
    throw new Error("Unable to get document size")
}, toCodePoints$1 = function(e) {
    for (var t = [], i = 0, n = e.length; i < n; ) {
        var o, r = e.charCodeAt(i++);
        55296 <= r && r <= 56319 && i < n ? 56320 == (64512 & (o = e.charCodeAt(i++))) ? t.push(((1023 & r) << 10) + (1023 & o) + 65536) : (t.push(r),
        i--) : t.push(r)
    }
    return t
}, fromCodePoint$1 = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    if (String.fromCodePoint)
        return String.fromCodePoint.apply(String, e);
    var i = e.length;
    if (!i)
        return "";
    for (var n = [], o = -1, r = ""; ++o < i; ) {
        var s = e[o];
        s <= 65535 ? n.push(s) : n.push(55296 + ((s -= 65536) >> 10), s % 1024 + 56320),
        (o + 1 === i || 16384 < n.length) && (r += String.fromCharCode.apply(String, n),
        n.length = 0)
    }
    return r
}, chars$2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$2 = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i$2 = 0; i$2 < chars$2.length; i$2++)
    lookup$2[chars$2.charCodeAt(i$2)] = i$2;
for (var chars$1$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$1$1 = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++)
    lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
for (var decode$1 = function(e) {
    for (var t, i, n, o, r = .75 * e.length, s = e.length, a = 0, l = (r = ("=" === e[e.length - 1] && (r--,
    "=" === e[e.length - 2]) && r--,
    new ("undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? ArrayBuffer : Array)(r)),
    Array.isArray(r) ? r : new Uint8Array(r)), c = 0; c < s; c += 4)
        t = lookup$1$1[e.charCodeAt(c)],
        i = lookup$1$1[e.charCodeAt(c + 1)],
        n = lookup$1$1[e.charCodeAt(c + 2)],
        o = lookup$1$1[e.charCodeAt(c + 3)],
        l[a++] = t << 2 | i >> 4,
        l[a++] = (15 & i) << 4 | n >> 2,
        l[a++] = (3 & n) << 6 | 63 & o;
    return r
}, polyUint16Array$1 = function(e) {
    for (var t = e.length, i = [], n = 0; n < t; n += 2)
        i.push(e[n + 1] << 8 | e[n]);
    return i
}, polyUint32Array$1 = function(e) {
    for (var t = e.length, i = [], n = 0; n < t; n += 4)
        i.push(e[n + 3] << 24 | e[n + 2] << 16 | e[n + 1] << 8 | e[n]);
    return i
}, UTRIE2_SHIFT_2$1 = 5, UTRIE2_SHIFT_1$1 = 11, UTRIE2_INDEX_SHIFT$1 = 2, UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1, UTRIE2_LSCP_INDEX_2_OFFSET$1 = 65536 >> UTRIE2_SHIFT_2$1, UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1, UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1, UTRIE2_LSCP_INDEX_2_LENGTH$1 = 1024 >> UTRIE2_SHIFT_2$1, UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1, UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1, UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 32, UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1, UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 65536 >> UTRIE2_SHIFT_1$1, UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1, UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1, slice16$1 = function(e, t, i) {
    return e.slice ? e.slice(t, i) : new Uint16Array(Array.prototype.slice.call(e, t, i))
}, slice32$1 = function(e, t, i) {
    return e.slice ? e.slice(t, i) : new Uint32Array(Array.prototype.slice.call(e, t, i))
}, createTrieFromBase64$1 = function(e, t) {
    e = decode$1(e);
    var i = Array.isArray(e) ? polyUint32Array$1(e) : new Uint32Array(e)
      , n = (e = Array.isArray(e) ? polyUint16Array$1(e) : new Uint16Array(e),
    slice16$1(e, 12, i[4] / 2));
    e = 2 === i[5] ? slice16$1(e, (24 + i[4]) / 2) : slice32$1(i, Math.ceil((24 + i[4]) / 4));
    return new Trie$1(i[0],i[1],i[2],i[3],n,e)
}, Trie$1 = function() {
    function e(e, t, i, n, o, r) {
        this.initialValue = e,
        this.errorValue = t,
        this.highStart = i,
        this.highValueIndex = n,
        this.index = o,
        this.data = r
    }
    return e.prototype.get = function(e) {
        var t;
        if (0 <= e) {
            if (e < 55296 || 56319 < e && e <= 65535)
                return t = this.index[e >> UTRIE2_SHIFT_2$1],
                this.data[t = (t << UTRIE2_INDEX_SHIFT$1) + (e & UTRIE2_DATA_MASK$1)];
            if (e <= 65535)
                return t = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + (e - 55296 >> UTRIE2_SHIFT_2$1)],
                this.data[t = (t << UTRIE2_INDEX_SHIFT$1) + (e & UTRIE2_DATA_MASK$1)];
            if (e < this.highStart)
                return t = this.index[t = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (e >> UTRIE2_SHIFT_1$1)],
                t = this.index[t += e >> UTRIE2_SHIFT_2$1 & UTRIE2_INDEX_2_MASK$1],
                this.data[t = (t << UTRIE2_INDEX_SHIFT$1) + (e & UTRIE2_DATA_MASK$1)];
            if (e <= 1114111)
                return this.data[this.highValueIndex]
        }
        return this.errorValue
    }
    ,
    e
}(), chars$3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$3 = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i$3 = 0; i$3 < chars$3.length; i$3++)
    lookup$3[chars$3.charCodeAt(i$3)] = i$3;
var base64$1 = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA=="
  , LETTER_NUMBER_MODIFIER = 50
  , BK = 1
  , CR$1 = 2
  , LF$1 = 3
  , CM = 4
  , NL = 5
  , WJ = 7
  , ZW = 8
  , GL = 9
  , SP = 10
  , ZWJ$1 = 11
  , B2 = 12
  , BA = 13
  , BB = 14
  , HY = 15
  , CB = 16
  , CL = 17
  , CP = 18
  , EX = 19
  , IN = 20
  , NS = 21
  , OP = 22
  , QU = 23
  , IS = 24
  , NU = 25
  , PO = 26
  , PR = 27
  , SY = 28
  , AI = 29
  , AL = 30
  , CJ = 31
  , EB = 32
  , EM = 33
  , H2 = 34
  , H3 = 35
  , HL = 36
  , ID = 37
  , JL = 38
  , JV = 39
  , JT = 40
  , RI$1 = 41
  , SA = 42
  , XX = 43
  , ea_OP = [9001, 65288]
  , BREAK_MANDATORY = "!"
  , BREAK_NOT_ALLOWED$1 = "×"
  , BREAK_ALLOWED$1 = "÷"
  , UnicodeTrie$1 = createTrieFromBase64$1(base64$1)
  , ALPHABETICS = [AL, HL]
  , HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL]
  , SPACE$1 = [SP, ZW]
  , PREFIX_POSTFIX = [PR, PO]
  , LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1)
  , KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3]
  , HYPHEN = [HY, BA]
  , codePointsToCharacterClasses = function(e, t) {
    void 0 === t && (t = "strict");
    var i = []
      , n = []
      , o = [];
    return e.forEach((function(e, r) {
        var s = UnicodeTrie$1.get(e);
        return LETTER_NUMBER_MODIFIER < s ? (o.push(!0),
        s -= LETTER_NUMBER_MODIFIER) : o.push(!1),
        -1 !== ["normal", "auto", "loose"].indexOf(t) && -1 !== [8208, 8211, 12316, 12448].indexOf(e) ? (n.push(r),
        i.push(CB)) : s !== CM && s !== ZWJ$1 ? (n.push(r),
        s === CJ ? i.push("strict" === t ? NS : ID) : s === SA || s === AI ? i.push(AL) : s === XX ? i.push(131072 <= e && e <= 196605 || 196608 <= e && e <= 262141 ? ID : AL) : void i.push(s)) : 0 !== r && -1 === LINE_BREAKS.indexOf(e = i[r - 1]) ? (n.push(n[r - 1]),
        i.push(e)) : (n.push(r),
        i.push(AL))
    }
    )),
    [n, i, o]
}
  , isAdjacentWithSpaceIgnored = function(e, t, i, n) {
    var o = n[i];
    if (Array.isArray(e) ? -1 !== e.indexOf(o) : e === o)
        for (var r = i; r <= n.length; ) {
            if ((a = n[++r]) === t)
                return !0;
            if (a !== SP)
                break
        }
    if (o === SP)
        for (r = i; 0 < r; ) {
            var s = n[--r];
            if (Array.isArray(e) ? -1 !== e.indexOf(s) : e === s)
                for (var a, l = i; l <= n.length; ) {
                    if ((a = n[++l]) === t)
                        return !0;
                    if (a !== SP)
                        break
                }
            if (s !== SP)
                break
        }
    return !1
}
  , previousNonSpaceClassType = function(e, t) {
    for (var i = e; 0 <= i; ) {
        var n = t[i];
        if (n !== SP)
            return n;
        i--
    }
    return 0
}
  , _lineBreakAtIndex = function(e, t, i, n, o) {
    if (0 === i[n])
        return BREAK_NOT_ALLOWED$1;
    if (n -= 1,
    Array.isArray(o) && !0 === o[n])
        return BREAK_NOT_ALLOWED$1;
    o = n - 1;
    var r = 1 + n
      , s = t[n]
      , a = 0 <= o ? t[o] : 0
      , l = t[r];
    if (s === CR$1 && l === LF$1)
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== HARD_LINE_BREAKS.indexOf(s))
        return BREAK_MANDATORY;
    if (-1 !== HARD_LINE_BREAKS.indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== SPACE$1.indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (previousNonSpaceClassType(n, t) === ZW)
        return BREAK_ALLOWED$1;
    if (UnicodeTrie$1.get(e[n]) === ZWJ$1)
        return BREAK_NOT_ALLOWED$1;
    if ((s === EB || s === EM) && UnicodeTrie$1.get(e[r]) === ZWJ$1)
        return BREAK_NOT_ALLOWED$1;
    if (s === WJ || l === WJ)
        return BREAK_NOT_ALLOWED$1;
    if (s === GL)
        return BREAK_NOT_ALLOWED$1;
    if (-1 === [SP, BA, HY].indexOf(s) && l === GL)
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== [CL, CP, EX, IS, SY].indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (previousNonSpaceClassType(n, t) === OP)
        return BREAK_NOT_ALLOWED$1;
    if (isAdjacentWithSpaceIgnored(QU, OP, n, t))
        return BREAK_NOT_ALLOWED$1;
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, n, t))
        return BREAK_NOT_ALLOWED$1;
    if (isAdjacentWithSpaceIgnored(B2, B2, n, t))
        return BREAK_NOT_ALLOWED$1;
    if (s === SP)
        return BREAK_ALLOWED$1;
    if (s === QU || l === QU)
        return BREAK_NOT_ALLOWED$1;
    if (l === CB || s === CB)
        return BREAK_ALLOWED$1;
    if (-1 !== [BA, HY, NS].indexOf(l) || s === BB)
        return BREAK_NOT_ALLOWED$1;
    if (a === HL && -1 !== HYPHEN.indexOf(s))
        return BREAK_NOT_ALLOWED$1;
    if (s === SY && l === HL)
        return BREAK_NOT_ALLOWED$1;
    if (l === IN)
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== ALPHABETICS.indexOf(l) && s === NU || -1 !== ALPHABETICS.indexOf(s) && l === NU)
        return BREAK_NOT_ALLOWED$1;
    if (s === PR && -1 !== [ID, EB, EM].indexOf(l) || -1 !== [ID, EB, EM].indexOf(s) && l === PO)
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== ALPHABETICS.indexOf(s) && -1 !== PREFIX_POSTFIX.indexOf(l) || -1 !== PREFIX_POSTFIX.indexOf(s) && -1 !== ALPHABETICS.indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== [PR, PO].indexOf(s) && (l === NU || -1 !== [OP, HY].indexOf(l) && t[1 + r] === NU) || -1 !== [OP, HY].indexOf(s) && l === NU || s === NU && -1 !== [NU, SY, IS].indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== [NU, SY, IS, CL, CP].indexOf(l))
        for (var c = n; 0 <= c; ) {
            if ((h = t[c]) === NU)
                return BREAK_NOT_ALLOWED$1;
            if (-1 === [SY, IS].indexOf(h))
                break;
            c--
        }
    if (-1 !== [PR, PO].indexOf(l)) {
        var h;
        for (c = -1 !== [CL, CP].indexOf(s) ? o : n; 0 <= c; ) {
            if ((h = t[c]) === NU)
                return BREAK_NOT_ALLOWED$1;
            if (-1 === [SY, IS].indexOf(h))
                break;
            c--
        }
    }
    if (JL === s && -1 !== [JL, JV, H2, H3].indexOf(l) || -1 !== [JV, H2].indexOf(s) && -1 !== [JV, JT].indexOf(l) || -1 !== [JT, H3].indexOf(s) && l === JT)
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== KOREAN_SYLLABLE_BLOCK.indexOf(s) && -1 !== [IN, PO].indexOf(l) || -1 !== KOREAN_SYLLABLE_BLOCK.indexOf(l) && s === PR)
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== ALPHABETICS.indexOf(s) && -1 !== ALPHABETICS.indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (s === IS && -1 !== ALPHABETICS.indexOf(l))
        return BREAK_NOT_ALLOWED$1;
    if (-1 !== ALPHABETICS.concat(NU).indexOf(s) && l === OP && -1 === ea_OP.indexOf(e[r]) || -1 !== ALPHABETICS.concat(NU).indexOf(l) && s === CP)
        return BREAK_NOT_ALLOWED$1;
    if (s === RI$1 && l === RI$1) {
        for (var u = i[n], d = 1; 0 < u && t[--u] === RI$1; )
            d++;
        if (d % 2 != 0)
            return BREAK_NOT_ALLOWED$1
    }
    return s === EB && l === EM ? BREAK_NOT_ALLOWED$1 : BREAK_ALLOWED$1
}
  , cssFormattedClasses = function(e, t) {
    var i = (o = codePointsToCharacterClasses(e, (t = t || {
        lineBreak: "normal",
        wordBreak: "normal"
    }).lineBreak))[0]
      , n = o[1]
      , o = o[2];
    "break-all" !== t.wordBreak && "break-word" !== t.wordBreak || (n = n.map((function(e) {
        return -1 !== [NU, AL, SA].indexOf(e) ? ID : e
    }
    ))),
    t = "keep-all" === t.wordBreak ? o.map((function(t, i) {
        return t && 19968 <= e[i] && e[i] <= 40959
    }
    )) : void 0;
    return [i, n, t]
}
  , Break = function() {
    function e(e, t, i, n) {
        this.codePoints = e,
        this.required = t === BREAK_MANDATORY,
        this.start = i,
        this.end = n
    }
    return e.prototype.slice = function() {
        return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end))
    }
    ,
    e
}()
  , LineBreaker = function(e, t) {
    var i = toCodePoints$1(e)
      , n = (e = cssFormattedClasses(i, t))[0]
      , o = e[1]
      , r = e[2]
      , s = i.length
      , a = 0
      , l = 0;
    return {
        next: function() {
            if (s <= l)
                return {
                    done: !0,
                    value: null
                };
            for (var e, t = BREAK_NOT_ALLOWED$1; l < s && (t = _lineBreakAtIndex(i, o, n, ++l, r)) === BREAK_NOT_ALLOWED$1; )
                ;
            return t !== BREAK_NOT_ALLOWED$1 || l === s ? (e = new Break(i,t,a,l),
            a = l,
            {
                value: e,
                done: !1
            }) : {
                done: !0,
                value: null
            }
        }
    }
}
  , FLAG_UNRESTRICTED = 1
  , FLAG_ID = 2
  , FLAG_INTEGER = 4
  , FLAG_NUMBER = 8
  , LINE_FEED = 10
  , SOLIDUS = 47
  , REVERSE_SOLIDUS = 92
  , CHARACTER_TABULATION = 9
  , SPACE = 32
  , QUOTATION_MARK = 34
  , EQUALS_SIGN = 61
  , NUMBER_SIGN = 35
  , DOLLAR_SIGN = 36
  , PERCENTAGE_SIGN = 37
  , APOSTROPHE = 39
  , LEFT_PARENTHESIS = 40
  , RIGHT_PARENTHESIS = 41
  , LOW_LINE = 95
  , HYPHEN_MINUS = 45
  , EXCLAMATION_MARK = 33
  , LESS_THAN_SIGN = 60
  , GREATER_THAN_SIGN = 62
  , COMMERCIAL_AT = 64
  , LEFT_SQUARE_BRACKET = 91
  , RIGHT_SQUARE_BRACKET = 93
  , CIRCUMFLEX_ACCENT = 61
  , LEFT_CURLY_BRACKET = 123
  , QUESTION_MARK = 63
  , RIGHT_CURLY_BRACKET = 125
  , VERTICAL_LINE = 124
  , TILDE = 126
  , CONTROL = 128
  , REPLACEMENT_CHARACTER = 65533
  , ASTERISK = 42
  , PLUS_SIGN = 43
  , COMMA = 44
  , COLON = 58
  , SEMICOLON = 59
  , FULL_STOP = 46
  , NULL = 0
  , BACKSPACE = 8
  , LINE_TABULATION = 11
  , SHIFT_OUT = 14
  , INFORMATION_SEPARATOR_ONE = 31
  , DELETE = 127
  , EOF = -1
  , ZERO = 48
  , a = 97
  , e = 101
  , f = 102
  , u = 117
  , z = 122
  , A = 65
  , E = 69
  , F = 70
  , U = 85
  , Z = 90
  , isDigit = function(e) {
    return ZERO <= e && e <= 57
}
  , isSurrogateCodePoint = function(e) {
    return 55296 <= e && e <= 57343
}
  , isHex = function(e) {
    return isDigit(e) || A <= e && e <= F || a <= e && e <= f
}
  , isLowerCaseLetter = function(e) {
    return a <= e && e <= z
}
  , isUpperCaseLetter = function(e) {
    return A <= e && e <= Z
}
  , isLetter = function(e) {
    return isLowerCaseLetter(e) || isUpperCaseLetter(e)
}
  , isNonASCIICodePoint = function(e) {
    return CONTROL <= e
}
  , isWhiteSpace = function(e) {
    return e === LINE_FEED || e === CHARACTER_TABULATION || e === SPACE
}
  , isNameStartCodePoint = function(e) {
    return isLetter(e) || isNonASCIICodePoint(e) || e === LOW_LINE
}
  , isNameCodePoint = function(e) {
    return isNameStartCodePoint(e) || isDigit(e) || e === HYPHEN_MINUS
}
  , isNonPrintableCodePoint = function(e) {
    return NULL <= e && e <= BACKSPACE || e === LINE_TABULATION || SHIFT_OUT <= e && e <= INFORMATION_SEPARATOR_ONE || e === DELETE
}
  , isValidEscape = function(e, t) {
    return e === REVERSE_SOLIDUS && t !== LINE_FEED
}
  , isIdentifierStart = function(e, t, i) {
    return e === HYPHEN_MINUS ? isNameStartCodePoint(t) || isValidEscape(t, i) : !!isNameStartCodePoint(e) || !(e !== REVERSE_SOLIDUS || !isValidEscape(e, t))
}
  , isNumberStart = function(e, t, i) {
    return e === PLUS_SIGN || e === HYPHEN_MINUS ? !!isDigit(t) || t === FULL_STOP && isDigit(i) : isDigit(e === FULL_STOP ? t : e)
}
  , stringToNumber = function(t) {
    for (var i = 0, n = 1, o = (t[i] !== PLUS_SIGN && t[i] !== HYPHEN_MINUS || (t[i] === HYPHEN_MINUS && (n = -1),
    i++),
    []); isDigit(t[i]); )
        o.push(t[i++]);
    for (var r = o.length ? parseInt(fromCodePoint$1.apply(void 0, o), 10) : 0, s = (t[i] === FULL_STOP && i++,
    []); isDigit(t[i]); )
        s.push(t[i++]);
    for (var a = s.length, l = a ? parseInt(fromCodePoint$1.apply(void 0, s), 10) : 0, c = (t[i] !== E && t[i] !== e || i++,
    1), h = (t[i] !== PLUS_SIGN && t[i] !== HYPHEN_MINUS || (t[i] === HYPHEN_MINUS && (c = -1),
    i++),
    []); isDigit(t[i]); )
        h.push(t[i++]);
    var u = h.length ? parseInt(fromCodePoint$1.apply(void 0, h), 10) : 0;
    return n * (r + l * Math.pow(10, -a)) * Math.pow(10, c * u)
}
  , LEFT_PARENTHESIS_TOKEN = {
    type: 2
}
  , RIGHT_PARENTHESIS_TOKEN = {
    type: 3
}
  , COMMA_TOKEN = {
    type: 4
}
  , SUFFIX_MATCH_TOKEN = {
    type: 13
}
  , PREFIX_MATCH_TOKEN = {
    type: 8
}
  , COLUMN_TOKEN = {
    type: 21
}
  , DASH_MATCH_TOKEN = {
    type: 9
}
  , INCLUDE_MATCH_TOKEN = {
    type: 10
}
  , LEFT_CURLY_BRACKET_TOKEN = {
    type: 11
}
  , RIGHT_CURLY_BRACKET_TOKEN = {
    type: 12
}
  , SUBSTRING_MATCH_TOKEN = {
    type: 14
}
  , BAD_URL_TOKEN = {
    type: 23
}
  , BAD_STRING_TOKEN = {
    type: 1
}
  , CDO_TOKEN = {
    type: 25
}
  , CDC_TOKEN = {
    type: 24
}
  , COLON_TOKEN = {
    type: 26
}
  , SEMICOLON_TOKEN = {
    type: 27
}
  , LEFT_SQUARE_BRACKET_TOKEN = {
    type: 28
}
  , RIGHT_SQUARE_BRACKET_TOKEN = {
    type: 29
}
  , WHITESPACE_TOKEN = {
    type: 31
}
  , EOF_TOKEN = {
    type: 32
}
  , Tokenizer = function() {
    function t() {
        this._value = []
    }
    return t.prototype.write = function(e) {
        this._value = this._value.concat(toCodePoints$1(e))
    }
    ,
    t.prototype.read = function() {
        for (var e = [], t = this.consumeToken(); t !== EOF_TOKEN; )
            e.push(t),
            t = this.consumeToken();
        return e
    }
    ,
    t.prototype.consumeToken = function() {
        var e = this.consumeCodePoint();
        switch (e) {
        case QUOTATION_MARK:
            return this.consumeStringToken(QUOTATION_MARK);
        case NUMBER_SIGN:
            var t = this.peekCodePoint(0)
              , i = this.peekCodePoint(1)
              , n = this.peekCodePoint(2);
            if (isNameCodePoint(t) || isValidEscape(i, n))
                return t = isIdentifierStart(t, i, n) ? FLAG_ID : FLAG_UNRESTRICTED,
                {
                    type: 5,
                    value: this.consumeName(),
                    flags: t
                };
            break;
        case DOLLAR_SIGN:
            if (this.peekCodePoint(0) === EQUALS_SIGN)
                return this.consumeCodePoint(),
                SUFFIX_MATCH_TOKEN;
            break;
        case APOSTROPHE:
            return this.consumeStringToken(APOSTROPHE);
        case LEFT_PARENTHESIS:
            return LEFT_PARENTHESIS_TOKEN;
        case RIGHT_PARENTHESIS:
            return RIGHT_PARENTHESIS_TOKEN;
        case ASTERISK:
            if (this.peekCodePoint(0) === EQUALS_SIGN)
                return this.consumeCodePoint(),
                SUBSTRING_MATCH_TOKEN;
            break;
        case PLUS_SIGN:
            if (isNumberStart(e, this.peekCodePoint(0), this.peekCodePoint(1)))
                return this.reconsumeCodePoint(e),
                this.consumeNumericToken();
            break;
        case COMMA:
            return COMMA_TOKEN;
        case HYPHEN_MINUS:
            if (i = e,
            n = this.peekCodePoint(0),
            t = this.peekCodePoint(1),
            isNumberStart(i, n, t))
                return this.reconsumeCodePoint(e),
                this.consumeNumericToken();
            if (isIdentifierStart(i, n, t))
                return this.reconsumeCodePoint(e),
                this.consumeIdentLikeToken();
            if (n === HYPHEN_MINUS && t === GREATER_THAN_SIGN)
                return this.consumeCodePoint(),
                this.consumeCodePoint(),
                CDC_TOKEN;
            break;
        case FULL_STOP:
            if (isNumberStart(e, this.peekCodePoint(0), this.peekCodePoint(1)))
                return this.reconsumeCodePoint(e),
                this.consumeNumericToken();
            break;
        case SOLIDUS:
            if (this.peekCodePoint(0) === ASTERISK)
                for (this.consumeCodePoint(); ; ) {
                    var o = this.consumeCodePoint();
                    if (o === ASTERISK && (o = this.consumeCodePoint()) === SOLIDUS)
                        return this.consumeToken();
                    if (o === EOF)
                        return this.consumeToken()
                }
            break;
        case COLON:
            return COLON_TOKEN;
        case SEMICOLON:
            return SEMICOLON_TOKEN;
        case LESS_THAN_SIGN:
            if (this.peekCodePoint(0) === EXCLAMATION_MARK && this.peekCodePoint(1) === HYPHEN_MINUS && this.peekCodePoint(2) === HYPHEN_MINUS)
                return this.consumeCodePoint(),
                this.consumeCodePoint(),
                CDO_TOKEN;
            break;
        case COMMERCIAL_AT:
            if (i = this.peekCodePoint(0),
            n = this.peekCodePoint(1),
            t = this.peekCodePoint(2),
            isIdentifierStart(i, n, t))
                return {
                    type: 7,
                    value: this.consumeName()
                };
            break;
        case LEFT_SQUARE_BRACKET:
            return LEFT_SQUARE_BRACKET_TOKEN;
        case REVERSE_SOLIDUS:
            if (isValidEscape(e, this.peekCodePoint(0)))
                return this.reconsumeCodePoint(e),
                this.consumeIdentLikeToken();
            break;
        case RIGHT_SQUARE_BRACKET:
            return RIGHT_SQUARE_BRACKET_TOKEN;
        case CIRCUMFLEX_ACCENT:
            if (this.peekCodePoint(0) === EQUALS_SIGN)
                return this.consumeCodePoint(),
                PREFIX_MATCH_TOKEN;
            break;
        case LEFT_CURLY_BRACKET:
            return LEFT_CURLY_BRACKET_TOKEN;
        case RIGHT_CURLY_BRACKET:
            return RIGHT_CURLY_BRACKET_TOKEN;
        case u:
        case U:
            return i = this.peekCodePoint(0),
            n = this.peekCodePoint(1),
            i !== PLUS_SIGN || !isHex(n) && n !== QUESTION_MARK || (this.consumeCodePoint(),
            this.consumeUnicodeRangeToken()),
            this.reconsumeCodePoint(e),
            this.consumeIdentLikeToken();
        case VERTICAL_LINE:
            if (this.peekCodePoint(0) === EQUALS_SIGN)
                return this.consumeCodePoint(),
                DASH_MATCH_TOKEN;
            if (this.peekCodePoint(0) === VERTICAL_LINE)
                return this.consumeCodePoint(),
                COLUMN_TOKEN;
            break;
        case TILDE:
            if (this.peekCodePoint(0) === EQUALS_SIGN)
                return this.consumeCodePoint(),
                INCLUDE_MATCH_TOKEN;
            break;
        case EOF:
            return EOF_TOKEN
        }
        return isWhiteSpace(e) ? (this.consumeWhiteSpace(),
        WHITESPACE_TOKEN) : isDigit(e) ? (this.reconsumeCodePoint(e),
        this.consumeNumericToken()) : isNameStartCodePoint(e) ? (this.reconsumeCodePoint(e),
        this.consumeIdentLikeToken()) : {
            type: 6,
            value: fromCodePoint$1(e)
        }
    }
    ,
    t.prototype.consumeCodePoint = function() {
        var e = this._value.shift();
        return void 0 === e ? -1 : e
    }
    ,
    t.prototype.reconsumeCodePoint = function(e) {
        this._value.unshift(e)
    }
    ,
    t.prototype.peekCodePoint = function(e) {
        return e >= this._value.length ? -1 : this._value[e]
    }
    ,
    t.prototype.consumeUnicodeRangeToken = function() {
        for (var e = [], t = this.consumeCodePoint(); isHex(t) && e.length < 6; )
            e.push(t),
            t = this.consumeCodePoint();
        for (var i = !1; t === QUESTION_MARK && e.length < 6; )
            e.push(t),
            t = this.consumeCodePoint(),
            i = !0;
        if (i)
            return {
                type: 30,
                start: parseInt(fromCodePoint$1.apply(void 0, e.map((function(e) {
                    return e === QUESTION_MARK ? ZERO : e
                }
                ))), 16),
                end: parseInt(fromCodePoint$1.apply(void 0, e.map((function(e) {
                    return e === QUESTION_MARK ? F : e
                }
                ))), 16)
            };
        var n = parseInt(fromCodePoint$1.apply(void 0, e), 16);
        if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
            this.consumeCodePoint();
            t = this.consumeCodePoint();
            for (var o = []; isHex(t) && o.length < 6; )
                o.push(t),
                t = this.consumeCodePoint();
            return {
                type: 30,
                start: n,
                end: parseInt(fromCodePoint$1.apply(void 0, o), 16)
            }
        }
        return {
            type: 30,
            start: n,
            end: n
        }
    }
    ,
    t.prototype.consumeIdentLikeToken = function() {
        var e = this.consumeName();
        return "url" === e.toLowerCase() && this.peekCodePoint(0) === LEFT_PARENTHESIS ? (this.consumeCodePoint(),
        this.consumeUrlToken()) : this.peekCodePoint(0) === LEFT_PARENTHESIS ? (this.consumeCodePoint(),
        {
            type: 19,
            value: e
        }) : {
            type: 20,
            value: e
        }
    }
    ,
    t.prototype.consumeUrlToken = function() {
        var e = [];
        if (this.consumeWhiteSpace(),
        this.peekCodePoint(0) === EOF)
            return {
                type: 22,
                value: ""
            };
        var t = this.peekCodePoint(0);
        if (t === APOSTROPHE || t === QUOTATION_MARK)
            return 0 === (t = this.consumeStringToken(this.consumeCodePoint())).type && (this.consumeWhiteSpace(),
            this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) ? (this.consumeCodePoint(),
            {
                type: 22,
                value: t.value
            }) : (this.consumeBadUrlRemnants(),
            BAD_URL_TOKEN);
        for (; ; ) {
            var i = this.consumeCodePoint();
            if (i === EOF || i === RIGHT_PARENTHESIS)
                return {
                    type: 22,
                    value: fromCodePoint$1.apply(void 0, e)
                };
            if (isWhiteSpace(i))
                return this.consumeWhiteSpace(),
                this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS ? (this.consumeCodePoint(),
                {
                    type: 22,
                    value: fromCodePoint$1.apply(void 0, e)
                }) : (this.consumeBadUrlRemnants(),
                BAD_URL_TOKEN);
            if (i === QUOTATION_MARK || i === APOSTROPHE || i === LEFT_PARENTHESIS || isNonPrintableCodePoint(i))
                return this.consumeBadUrlRemnants(),
                BAD_URL_TOKEN;
            if (i === REVERSE_SOLIDUS) {
                if (!isValidEscape(i, this.peekCodePoint(0)))
                    return this.consumeBadUrlRemnants(),
                    BAD_URL_TOKEN;
                e.push(this.consumeEscapedCodePoint())
            } else
                e.push(i)
        }
    }
    ,
    t.prototype.consumeWhiteSpace = function() {
        for (; isWhiteSpace(this.peekCodePoint(0)); )
            this.consumeCodePoint()
    }
    ,
    t.prototype.consumeBadUrlRemnants = function() {
        for (; ; ) {
            var e = this.consumeCodePoint();
            if (e === RIGHT_PARENTHESIS || e === EOF)
                return;
            isValidEscape(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint()
        }
    }
    ,
    t.prototype.consumeStringSlice = function(e) {
        for (var t = ""; 0 < e; ) {
            var i = Math.min(5e4, e);
            t += fromCodePoint$1.apply(void 0, this._value.splice(0, i)),
            e -= i
        }
        return this._value.shift(),
        t
    }
    ,
    t.prototype.consumeStringToken = function(e) {
        for (var t = "", i = 0; ; ) {
            var n, o = this._value[i];
            if (o === EOF || void 0 === o || o === e)
                return {
                    type: 0,
                    value: t += this.consumeStringSlice(i)
                };
            if (o === LINE_FEED)
                return this._value.splice(0, i),
                BAD_STRING_TOKEN;
            o === REVERSE_SOLIDUS && (n = this._value[i + 1]) !== EOF && void 0 !== n && (n === LINE_FEED ? (t += this.consumeStringSlice(i),
            i = -1,
            this._value.shift()) : isValidEscape(o, n) && (t = (t += this.consumeStringSlice(i)) + fromCodePoint$1(this.consumeEscapedCodePoint()),
            i = -1)),
            i++
        }
    }
    ,
    t.prototype.consumeNumber = function() {
        var t = []
          , i = FLAG_INTEGER;
        for ((n = this.peekCodePoint(0)) !== PLUS_SIGN && n !== HYPHEN_MINUS || t.push(this.consumeCodePoint()); isDigit(this.peekCodePoint(0)); )
            t.push(this.consumeCodePoint());
        var n = this.peekCodePoint(0)
          , o = this.peekCodePoint(1);
        if (n === FULL_STOP && isDigit(o))
            for (t.push(this.consumeCodePoint(), this.consumeCodePoint()),
            i = FLAG_NUMBER; isDigit(this.peekCodePoint(0)); )
                t.push(this.consumeCodePoint());
        n = this.peekCodePoint(0);
        o = this.peekCodePoint(1);
        var r = this.peekCodePoint(2);
        if ((n === E || n === e) && ((o === PLUS_SIGN || o === HYPHEN_MINUS) && isDigit(r) || isDigit(o)))
            for (t.push(this.consumeCodePoint(), this.consumeCodePoint()),
            i = FLAG_NUMBER; isDigit(this.peekCodePoint(0)); )
                t.push(this.consumeCodePoint());
        return [stringToNumber(t), i]
    }
    ,
    t.prototype.consumeNumericToken = function() {
        var e = (t = this.consumeNumber())[0]
          , t = t[1]
          , i = this.peekCodePoint(0)
          , n = this.peekCodePoint(1)
          , o = this.peekCodePoint(2);
        return isIdentifierStart(i, n, o) ? {
            type: 15,
            number: e,
            flags: t,
            unit: this.consumeName()
        } : i === PERCENTAGE_SIGN ? (this.consumeCodePoint(),
        {
            type: 16,
            number: e,
            flags: t
        }) : {
            type: 17,
            number: e,
            flags: t
        }
    }
    ,
    t.prototype.consumeEscapedCodePoint = function() {
        var e = this.consumeCodePoint();
        if (isHex(e)) {
            for (var t = fromCodePoint$1(e); isHex(this.peekCodePoint(0)) && t.length < 6; )
                t += fromCodePoint$1(this.consumeCodePoint());
            isWhiteSpace(this.peekCodePoint(0)) && this.consumeCodePoint();
            var i = parseInt(t, 16);
            return 0 === i || isSurrogateCodePoint(i) || 1114111 < i ? REPLACEMENT_CHARACTER : i
        }
        return e === EOF ? REPLACEMENT_CHARACTER : e
    }
    ,
    t.prototype.consumeName = function() {
        for (var e = ""; ; ) {
            var t = this.consumeCodePoint();
            if (isNameCodePoint(t))
                e += fromCodePoint$1(t);
            else {
                if (!isValidEscape(t, this.peekCodePoint(0)))
                    return this.reconsumeCodePoint(t),
                    e;
                e += fromCodePoint$1(this.consumeEscapedCodePoint())
            }
        }
    }
    ,
    t
}()
  , Parser = function() {
    function e(e) {
        this._tokens = e
    }
    return e.create = function(t) {
        var i = new Tokenizer;
        return i.write(t),
        new e(i.read())
    }
    ,
    e.parseValue = function(t) {
        return e.create(t).parseComponentValue()
    }
    ,
    e.parseValues = function(t) {
        return e.create(t).parseComponentValues()
    }
    ,
    e.prototype.parseComponentValue = function() {
        for (var e = this.consumeToken(); 31 === e.type; )
            e = this.consumeToken();
        if (32 === e.type)
            throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
        this.reconsumeToken(e);
        for (var t = this.consumeComponentValue(); 31 === (e = this.consumeToken()).type; )
            ;
        if (32 === e.type)
            return t;
        throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")
    }
    ,
    e.prototype.parseComponentValues = function() {
        for (var e = []; ; ) {
            var t = this.consumeComponentValue();
            if (32 === t.type)
                return e;
            e.push(t),
            e.push()
        }
    }
    ,
    e.prototype.consumeComponentValue = function() {
        var e = this.consumeToken();
        switch (e.type) {
        case 11:
        case 28:
        case 2:
            return this.consumeSimpleBlock(e.type);
        case 19:
            return this.consumeFunction(e)
        }
        return e
    }
    ,
    e.prototype.consumeSimpleBlock = function(e) {
        for (var t = {
            type: e,
            values: []
        }, i = this.consumeToken(); ; ) {
            if (32 === i.type || isEndingTokenFor(i, e))
                return t;
            this.reconsumeToken(i),
            t.values.push(this.consumeComponentValue()),
            i = this.consumeToken()
        }
    }
    ,
    e.prototype.consumeFunction = function(e) {
        for (var t = {
            name: e.value,
            values: [],
            type: 18
        }; ; ) {
            var i = this.consumeToken();
            if (32 === i.type || 3 === i.type)
                return t;
            this.reconsumeToken(i),
            t.values.push(this.consumeComponentValue())
        }
    }
    ,
    e.prototype.consumeToken = function() {
        var e = this._tokens.shift();
        return void 0 === e ? EOF_TOKEN : e
    }
    ,
    e.prototype.reconsumeToken = function(e) {
        this._tokens.unshift(e)
    }
    ,
    e
}()
  , isDimensionToken = function(e) {
    return 15 === e.type
}
  , isNumberToken = function(e) {
    return 17 === e.type
}
  , isIdentToken = function(e) {
    return 20 === e.type
}
  , isStringToken = function(e) {
    return 0 === e.type
}
  , isIdentWithValue = function(e, t) {
    return isIdentToken(e) && e.value === t
}
  , nonWhiteSpace = function(e) {
    return 31 !== e.type
}
  , nonFunctionArgSeparator = function(e) {
    return 31 !== e.type && 4 !== e.type
}
  , parseFunctionArgs = function(e) {
    var t = []
      , i = [];
    return e.forEach((function(e) {
        if (4 === e.type) {
            if (0 === i.length)
                throw new Error("Error parsing function args, zero tokens for arg");
            t.push(i),
            i = []
        } else
            31 !== e.type && i.push(e)
    }
    )),
    i.length && t.push(i),
    t
}
  , isEndingTokenFor = function(e, t) {
    return 11 === t && 12 === e.type || 28 === t && 29 === e.type || 2 === t && 3 === e.type
}
  , isLength = function(e) {
    return 17 === e.type || 15 === e.type
}
  , isLengthPercentage = function(e) {
    return 16 === e.type || isLength(e)
}
  , parseLengthPercentageTuple = function(e) {
    return 1 < e.length ? [e[0], e[1]] : [e[0]]
}
  , ZERO_LENGTH = {
    type: 17,
    number: 0,
    flags: FLAG_INTEGER
}
  , FIFTY_PERCENT = {
    type: 16,
    number: 50,
    flags: FLAG_INTEGER
}
  , HUNDRED_PERCENT = {
    type: 16,
    number: 100,
    flags: FLAG_INTEGER
}
  , getAbsoluteValueForTuple = function(e, t, i) {
    var n = e[0];
    e = e[1];
    return [getAbsoluteValue(n, t), getAbsoluteValue(void 0 !== e ? e : n, i)]
}
  , getAbsoluteValue = function(e, t) {
    if (16 === e.type)
        return e.number / 100 * t;
    if (isDimensionToken(e))
        switch (e.unit) {
        case "rem":
        case "em":
            return 16 * e.number;
        default:
            return e.number
        }
    return e.number
}
  , DEG = "deg"
  , GRAD = "grad"
  , RAD = "rad"
  , TURN = "turn"
  , angle = {
    name: "angle",
    parse: function(e, t) {
        if (15 === t.type)
            switch (t.unit) {
            case DEG:
                return Math.PI * t.number / 180;
            case GRAD:
                return Math.PI / 200 * t.number;
            case RAD:
                return t.number;
            case TURN:
                return 2 * Math.PI * t.number
            }
        throw new Error("Unsupported angle type")
    }
}
  , isAngle = function(e) {
    return 15 === e.type && (e.unit === DEG || e.unit === GRAD || e.unit === RAD || e.unit === TURN)
}
  , parseNamedSide = function(e) {
    switch (e.filter(isIdentToken).map((function(e) {
        return e.value
    }
    )).join(" ")) {
    case "to bottom right":
    case "to right bottom":
    case "left top":
    case "top left":
        return [ZERO_LENGTH, ZERO_LENGTH];
    case "to top":
    case "bottom":
        return deg(0);
    case "to bottom left":
    case "to left bottom":
    case "right top":
    case "top right":
        return [ZERO_LENGTH, HUNDRED_PERCENT];
    case "to right":
    case "left":
        return deg(90);
    case "to top left":
    case "to left top":
    case "right bottom":
    case "bottom right":
        return [HUNDRED_PERCENT, HUNDRED_PERCENT];
    case "to bottom":
    case "top":
        return deg(180);
    case "to top right":
    case "to right top":
    case "left bottom":
    case "bottom left":
        return [HUNDRED_PERCENT, ZERO_LENGTH];
    case "to left":
    case "right":
        return deg(270)
    }
    return 0
}
  , deg = function(e) {
    return Math.PI * e / 180
}
  , color$1 = {
    name: "color",
    parse: function(e, t) {
        if (18 === t.type) {
            var i = SUPPORTED_COLOR_FUNCTIONS[t.name];
            if (void 0 === i)
                throw new Error('Attempting to parse an unsupported color function "' + t.name + '"');
            return i(e, t.values)
        }
        if (5 === t.type) {
            var n, o, r, s;
            if (3 === t.value.length)
                return n = t.value.substring(0, 1),
                o = t.value.substring(1, 2),
                r = t.value.substring(2, 3),
                pack(parseInt(n + n, 16), parseInt(o + o, 16), parseInt(r + r, 16), 1);
            if (4 === t.value.length)
                return n = t.value.substring(0, 1),
                o = t.value.substring(1, 2),
                r = t.value.substring(2, 3),
                s = t.value.substring(3, 4),
                pack(parseInt(n + n, 16), parseInt(o + o, 16), parseInt(r + r, 16), parseInt(s + s, 16) / 255);
            if (6 === t.value.length)
                return n = t.value.substring(0, 2),
                o = t.value.substring(2, 4),
                r = t.value.substring(4, 6),
                pack(parseInt(n, 16), parseInt(o, 16), parseInt(r, 16), 1);
            if (8 === t.value.length)
                return n = t.value.substring(0, 2),
                o = t.value.substring(2, 4),
                r = t.value.substring(4, 6),
                s = t.value.substring(6, 8),
                pack(parseInt(n, 16), parseInt(o, 16), parseInt(r, 16), parseInt(s, 16) / 255)
        }
        return 20 === t.type && void 0 !== (i = COLORS[t.value.toUpperCase()]) ? i : COLORS.TRANSPARENT
    }
}
  , isTransparent = function(e) {
    return 0 == (255 & e)
}
  , asString = function(e) {
    var t = 255 & e
      , i = 255 & e >> 8
      , n = 255 & e >> 16;
    e = 255 & e >> 24;
    return t < 255 ? "rgba(" + e + "," + n + "," + i + "," + t / 255 + ")" : "rgb(" + e + "," + n + "," + i + ")"
}
  , pack = function(e, t, i, n) {
    return (e << 24 | t << 16 | i << 8 | Math.round(255 * n) << 0) >>> 0
}
  , getTokenColorValue = function(e, t) {
    var i;
    return 17 === e.type ? e.number : 16 === e.type ? (i = 3 === t ? 1 : 255,
    3 === t ? e.number / 100 * i : Math.round(e.number / 100 * i)) : 0
}
  , rgb = function(e, t) {
    var i, n, o;
    return 3 === (t = t.filter(nonFunctionArgSeparator)).length ? (i = (o = t.map(getTokenColorValue))[0],
    n = o[1],
    o = o[2],
    pack(i, n, o, 1)) : 4 === t.length ? (i = (t = t.map(getTokenColorValue))[0],
    n = t[1],
    o = t[2],
    t = t[3],
    pack(i, n, o, t)) : 0
};
function hue2rgb(e, t, i) {
    return i < 0 && (i += 1),
    1 <= i && --i,
    i < 1 / 6 ? (t - e) * i * 6 + e : i < .5 ? t : i < 2 / 3 ? 6 * (t - e) * (2 / 3 - i) + e : e
}
var hsl = function(e, t) {
    var i, n = (t = t.filter(nonFunctionArgSeparator))[0], o = t[1], r = t[2];
    t = t[3],
    e = (17 === n.type ? deg(n.number) : angle.parse(e, n)) / (2 * Math.PI),
    n = isLengthPercentage(o) ? o.number / 100 : 0,
    o = isLengthPercentage(r) ? r.number / 100 : 0,
    r = void 0 !== t && isLengthPercentage(t) ? getAbsoluteValue(t, 1) : 1;
    return 0 == n ? pack(255 * o, 255 * o, 255 * o, 1) : (n = hue2rgb(o = 2 * o - (t = o <= .5 ? o * (1 + n) : o + n - o * n), t, e + 1 / 3),
    i = hue2rgb(o, t, e),
    o = hue2rgb(o, t, e - 1 / 3),
    pack(255 * n, 255 * i, 255 * o, r))
}
  , SUPPORTED_COLOR_FUNCTIONS = {
    hsl: hsl,
    hsla: hsl,
    rgb: rgb,
    rgba: rgb
}
  , parseColor = function(e, t) {
    return color$1.parse(e, Parser.create(t).parseComponentValue())
}
  , COLORS = {
    ALICEBLUE: 4042850303,
    ANTIQUEWHITE: 4209760255,
    AQUA: 16777215,
    AQUAMARINE: 2147472639,
    AZURE: 4043309055,
    BEIGE: 4126530815,
    BISQUE: 4293182719,
    BLACK: 255,
    BLANCHEDALMOND: 4293643775,
    BLUE: 65535,
    BLUEVIOLET: 2318131967,
    BROWN: 2771004159,
    BURLYWOOD: 3736635391,
    CADETBLUE: 1604231423,
    CHARTREUSE: 2147418367,
    CHOCOLATE: 3530104575,
    CORAL: 4286533887,
    CORNFLOWERBLUE: 1687547391,
    CORNSILK: 4294499583,
    CRIMSON: 3692313855,
    CYAN: 16777215,
    DARKBLUE: 35839,
    DARKCYAN: 9145343,
    DARKGOLDENROD: 3095837695,
    DARKGRAY: 2846468607,
    DARKGREEN: 6553855,
    DARKGREY: 2846468607,
    DARKKHAKI: 3182914559,
    DARKMAGENTA: 2332068863,
    DARKOLIVEGREEN: 1433087999,
    DARKORANGE: 4287365375,
    DARKORCHID: 2570243327,
    DARKRED: 2332033279,
    DARKSALMON: 3918953215,
    DARKSEAGREEN: 2411499519,
    DARKSLATEBLUE: 1211993087,
    DARKSLATEGRAY: 793726975,
    DARKSLATEGREY: 793726975,
    DARKTURQUOISE: 13554175,
    DARKVIOLET: 2483082239,
    DEEPPINK: 4279538687,
    DEEPSKYBLUE: 12582911,
    DIMGRAY: 1768516095,
    DIMGREY: 1768516095,
    DODGERBLUE: 512819199,
    FIREBRICK: 2988581631,
    FLORALWHITE: 4294635775,
    FORESTGREEN: 579543807,
    FUCHSIA: 4278255615,
    GAINSBORO: 3705462015,
    GHOSTWHITE: 4177068031,
    GOLD: 4292280575,
    GOLDENROD: 3668254975,
    GRAY: 2155905279,
    GREEN: 8388863,
    GREENYELLOW: 2919182335,
    GREY: 2155905279,
    HONEYDEW: 4043305215,
    HOTPINK: 4285117695,
    INDIANRED: 3445382399,
    INDIGO: 1258324735,
    IVORY: 4294963455,
    KHAKI: 4041641215,
    LAVENDER: 3873897215,
    LAVENDERBLUSH: 4293981695,
    LAWNGREEN: 2096890111,
    LEMONCHIFFON: 4294626815,
    LIGHTBLUE: 2916673279,
    LIGHTCORAL: 4034953471,
    LIGHTCYAN: 3774873599,
    LIGHTGOLDENRODYELLOW: 4210742015,
    LIGHTGRAY: 3553874943,
    LIGHTGREEN: 2431553791,
    LIGHTGREY: 3553874943,
    LIGHTPINK: 4290167295,
    LIGHTSALMON: 4288707327,
    LIGHTSEAGREEN: 548580095,
    LIGHTSKYBLUE: 2278488831,
    LIGHTSLATEGRAY: 2005441023,
    LIGHTSLATEGREY: 2005441023,
    LIGHTSTEELBLUE: 2965692159,
    LIGHTYELLOW: 4294959359,
    LIME: 16711935,
    LIMEGREEN: 852308735,
    LINEN: 4210091775,
    MAGENTA: 4278255615,
    MAROON: 2147483903,
    MEDIUMAQUAMARINE: 1724754687,
    MEDIUMBLUE: 52735,
    MEDIUMORCHID: 3126187007,
    MEDIUMPURPLE: 2473647103,
    MEDIUMSEAGREEN: 1018393087,
    MEDIUMSLATEBLUE: 2070474495,
    MEDIUMSPRINGGREEN: 16423679,
    MEDIUMTURQUOISE: 1221709055,
    MEDIUMVIOLETRED: 3340076543,
    MIDNIGHTBLUE: 421097727,
    MINTCREAM: 4127193855,
    MISTYROSE: 4293190143,
    MOCCASIN: 4293178879,
    NAVAJOWHITE: 4292783615,
    NAVY: 33023,
    OLDLACE: 4260751103,
    OLIVE: 2155872511,
    OLIVEDRAB: 1804477439,
    ORANGE: 4289003775,
    ORANGERED: 4282712319,
    ORCHID: 3664828159,
    PALEGOLDENROD: 4008225535,
    PALEGREEN: 2566625535,
    PALETURQUOISE: 2951671551,
    PALEVIOLETRED: 3681588223,
    PAPAYAWHIP: 4293907967,
    PEACHPUFF: 4292524543,
    PERU: 3448061951,
    PINK: 4290825215,
    PLUM: 3718307327,
    POWDERBLUE: 2967529215,
    PURPLE: 2147516671,
    REBECCAPURPLE: 1714657791,
    RED: 4278190335,
    ROSYBROWN: 3163525119,
    ROYALBLUE: 1097458175,
    SADDLEBROWN: 2336560127,
    SALMON: 4202722047,
    SANDYBROWN: 4104413439,
    SEAGREEN: 780883967,
    SEASHELL: 4294307583,
    SIENNA: 2689740287,
    SILVER: 3233857791,
    SKYBLUE: 2278484991,
    SLATEBLUE: 1784335871,
    SLATEGRAY: 1887473919,
    SLATEGREY: 1887473919,
    SNOW: 4294638335,
    SPRINGGREEN: 16744447,
    STEELBLUE: 1182971135,
    TAN: 3535047935,
    TEAL: 8421631,
    THISTLE: 3636451583,
    TOMATO: 4284696575,
    TRANSPARENT: 0,
    TURQUOISE: 1088475391,
    VIOLET: 4001558271,
    WHEAT: 4125012991,
    WHITE: 4294967295,
    WHITESMOKE: 4126537215,
    YELLOW: 4294902015,
    YELLOWGREEN: 2597139199
}
  , backgroundClip = {
    name: "background-clip",
    initialValue: "border-box",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return t.map((function(e) {
            if (isIdentToken(e))
                switch (e.value) {
                case "padding-box":
                    return 1;
                case "content-box":
                    return 2
                }
            return 0
        }
        ))
    }
}
  , backgroundColor = {
    name: "background-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color"
}
  , parseColorStop = function(e, t) {
    return e = color$1.parse(e, t[0]),
    (t = t[1]) && isLengthPercentage(t) ? {
        color: e,
        stop: t
    } : {
        color: e,
        stop: null
    }
}
  , processColorStops = function(e, t) {
    for (var i = e[0], n = e[e.length - 1], o = (null === i.stop && (i.stop = ZERO_LENGTH),
    null === n.stop && (n.stop = HUNDRED_PERCENT),
    []), r = 0, s = 0; s < e.length; s++) {
        var a = e[s].stop;
        null !== a ? (a = getAbsoluteValue(a, t),
        o.push(r < a ? a : r),
        r = a) : o.push(null)
    }
    var l = null;
    for (s = 0; s < o.length; s++) {
        var c = o[s];
        if (null === c)
            null === l && (l = s);
        else if (null !== l) {
            for (var h = s - l, u = (c - o[l - 1]) / (1 + h), d = 1; d <= h; d++)
                o[l + d - 1] = u * d;
            l = null
        }
    }
    return e.map((function(e, i) {
        return {
            color: e.color,
            stop: Math.max(Math.min(1, o[i] / t), 0)
        }
    }
    ))
}
  , getAngleFromCorner = function(e, t, i) {
    var n = t / 2
      , o = i / 2;
    t = getAbsoluteValue(e[0], t) - n,
    n = o - getAbsoluteValue(e[1], i);
    return (Math.atan2(n, t) + 2 * Math.PI) % (2 * Math.PI)
}
  , calculateGradientDirection = function(e, t, i) {
    e = "number" == typeof e ? e : getAngleFromCorner(e, t, i);
    var n = Math.abs(t * Math.sin(e)) + Math.abs(i * Math.cos(e))
      , o = (t = t / 2,
    i = i / 2,
    n / 2)
      , r = Math.sin(e - Math.PI / 2) * o;
    return [n, t - (e = Math.cos(e - Math.PI / 2) * o), t + e, i - r, i + r]
}
  , distance = function(e, t) {
    return Math.sqrt(e * e + t * t)
}
  , findCorner = function(e, t, i, n, o) {
    return [[0, 0], [0, t], [e, 0], [e, t]].reduce((function(e, t) {
        var r = t[0]
          , s = t[1];
        r = distance(i - r, n - s);
        return (o ? r < e.optimumDistance : r > e.optimumDistance) ? {
            optimumCorner: t,
            optimumDistance: r
        } : e
    }
    ), {
        optimumDistance: o ? 1 / 0 : -1 / 0,
        optimumCorner: null
    }).optimumCorner
}
  , calculateRadius = function(e, t, i, n, o) {
    var r, s, a, l, c = 0, h = 0;
    switch (e.size) {
    case 0:
        0 === e.shape ? c = h = Math.min(Math.abs(t), Math.abs(t - n), Math.abs(i), Math.abs(i - o)) : 1 === e.shape && (c = Math.min(Math.abs(t), Math.abs(t - n)),
        h = Math.min(Math.abs(i), Math.abs(i - o)));
        break;
    case 2:
        0 === e.shape ? c = h = Math.min(distance(t, i), distance(t, i - o), distance(t - n, i), distance(t - n, i - o)) : 1 === e.shape && (r = Math.min(Math.abs(i), Math.abs(i - o)) / Math.min(Math.abs(t), Math.abs(t - n)),
        a = (l = findCorner(n, o, t, i, !0))[0],
        l = l[1],
        h = r * (c = distance(a - t, (l - i) / r)));
        break;
    case 1:
        0 === e.shape ? c = h = Math.max(Math.abs(t), Math.abs(t - n), Math.abs(i), Math.abs(i - o)) : 1 === e.shape && (c = Math.max(Math.abs(t), Math.abs(t - n)),
        h = Math.max(Math.abs(i), Math.abs(i - o)));
        break;
    case 3:
        0 === e.shape ? c = h = Math.max(distance(t, i), distance(t, i - o), distance(t - n, i), distance(t - n, i - o)) : 1 === e.shape && (r = Math.max(Math.abs(i), Math.abs(i - o)) / Math.max(Math.abs(t), Math.abs(t - n)),
        a = (s = findCorner(n, o, t, i, !1))[0],
        l = s[1],
        h = r * (c = distance(a - t, (l - i) / r)))
    }
    return Array.isArray(e.size) && (c = getAbsoluteValue(e.size[0], n),
    h = 2 === e.size.length ? getAbsoluteValue(e.size[1], o) : c),
    [c, h]
}
  , linearGradient = function(e, t) {
    var i = deg(180)
      , n = [];
    return parseFunctionArgs(t).forEach((function(t, o) {
        if (0 === o) {
            if (20 === (o = t[0]).type && "to" === o.value)
                return void (i = parseNamedSide(t));
            if (isAngle(o))
                return void (i = angle.parse(e, o))
        }
        o = parseColorStop(e, t),
        n.push(o)
    }
    )),
    {
        angle: i,
        stops: n,
        type: 1
    }
}
  , prefixLinearGradient = function(e, t) {
    var i = deg(180)
      , n = [];
    return parseFunctionArgs(t).forEach((function(t, o) {
        if (0 === o) {
            if (20 === (o = t[0]).type && -1 !== ["top", "left", "right", "bottom"].indexOf(o.value))
                return void (i = parseNamedSide(t));
            if (isAngle(o))
                return void (i = (angle.parse(e, o) + deg(270)) % deg(360))
        }
        o = parseColorStop(e, t),
        n.push(o)
    }
    )),
    {
        angle: i,
        stops: n,
        type: 1
    }
}
  , webkitGradient = function(e, t) {
    var i = deg(180)
      , n = []
      , o = 1;
    return parseFunctionArgs(t).forEach((function(t, i) {
        var r;
        t = t[0];
        if (0 === i) {
            if (isIdentToken(t) && "linear" === t.value)
                return void (o = 1);
            if (isIdentToken(t) && "radial" === t.value)
                return void (o = 2)
        }
        18 === t.type && ("from" === t.name ? (r = color$1.parse(e, t.values[0]),
        n.push({
            stop: ZERO_LENGTH,
            color: r
        })) : "to" === t.name ? (r = color$1.parse(e, t.values[0]),
        n.push({
            stop: HUNDRED_PERCENT,
            color: r
        })) : "color-stop" === t.name && 2 === (i = t.values.filter(nonFunctionArgSeparator)).length && (r = color$1.parse(e, i[1]),
        t = i[0],
        isNumberToken(t)) && n.push({
            stop: {
                type: 16,
                number: 100 * t.number,
                flags: t.flags
            },
            color: r
        }))
    }
    )),
    1 === o ? {
        angle: (i + deg(180)) % deg(360),
        stops: n,
        type: o
    } : {
        size: 3,
        shape: 0,
        stops: n,
        position: [],
        type: o
    }
}
  , CLOSEST_SIDE = "closest-side"
  , FARTHEST_SIDE = "farthest-side"
  , CLOSEST_CORNER = "closest-corner"
  , FARTHEST_CORNER = "farthest-corner"
  , CIRCLE = "circle"
  , ELLIPSE = "ellipse"
  , COVER = "cover"
  , CONTAIN = "contain"
  , radialGradient = function(e, t) {
    var i = 0
      , n = 3
      , o = []
      , r = [];
    return parseFunctionArgs(t).forEach((function(t, s) {
        var a, l = !0;
        0 === s && (a = !1,
        l = t.reduce((function(e, t) {
            if (a)
                if (isIdentToken(t))
                    switch (t.value) {
                    case "center":
                        return r.push(FIFTY_PERCENT),
                        e;
                    case "top":
                    case "left":
                        return r.push(ZERO_LENGTH),
                        e;
                    case "right":
                    case "bottom":
                        return r.push(HUNDRED_PERCENT),
                        e
                    }
                else
                    (isLengthPercentage(t) || isLength(t)) && r.push(t);
            else if (isIdentToken(t))
                switch (t.value) {
                case CIRCLE:
                    return i = 0,
                    !1;
                case ELLIPSE:
                    return !(i = 1);
                case "at":
                    return !(a = !0);
                case CLOSEST_SIDE:
                    return n = 0,
                    !1;
                case COVER:
                case FARTHEST_SIDE:
                    return !(n = 1);
                case CONTAIN:
                case CLOSEST_CORNER:
                    return !(n = 2);
                case FARTHEST_CORNER:
                    return !(n = 3)
                }
            else if (isLength(t) || isLengthPercentage(t))
                return (n = Array.isArray(n) ? n : []).push(t),
                !1;
            return e
        }
        ), l)),
        l && (s = parseColorStop(e, t),
        o.push(s))
    }
    )),
    {
        size: n,
        shape: i,
        stops: o,
        position: r,
        type: 2
    }
}
  , prefixRadialGradient = function(e, t) {
    var i = 0
      , n = 3
      , o = []
      , r = [];
    return parseFunctionArgs(t).forEach((function(t, s) {
        var a = !0;
        0 === s ? a = t.reduce((function(e, t) {
            if (isIdentToken(t))
                switch (t.value) {
                case "center":
                    return r.push(FIFTY_PERCENT),
                    !1;
                case "top":
                case "left":
                    return r.push(ZERO_LENGTH),
                    !1;
                case "right":
                case "bottom":
                    return r.push(HUNDRED_PERCENT),
                    !1
                }
            else if (isLengthPercentage(t) || isLength(t))
                return r.push(t),
                !1;
            return e
        }
        ), a) : 1 === s && (a = t.reduce((function(e, t) {
            if (isIdentToken(t))
                switch (t.value) {
                case CIRCLE:
                    return i = 0,
                    !1;
                case ELLIPSE:
                    return !(i = 1);
                case CONTAIN:
                case CLOSEST_SIDE:
                    return n = 0,
                    !1;
                case FARTHEST_SIDE:
                    return !(n = 1);
                case CLOSEST_CORNER:
                    return !(n = 2);
                case COVER:
                case FARTHEST_CORNER:
                    return !(n = 3)
                }
            else if (isLength(t) || isLengthPercentage(t))
                return (n = Array.isArray(n) ? n : []).push(t),
                !1;
            return e
        }
        ), a)),
        a && (s = parseColorStop(e, t),
        o.push(s))
    }
    )),
    {
        size: n,
        shape: i,
        stops: o,
        position: r,
        type: 2
    }
}
  , isLinearGradient = function(e) {
    return 1 === e.type
}
  , isRadialGradient = function(e) {
    return 2 === e.type
}
  , image = {
    name: "image",
    parse: function(e, t) {
        if (22 === t.type)
            return i = {
                url: t.value,
                type: 0
            },
            e.cache.addImage(t.value),
            i;
        if (18 !== t.type)
            throw new Error("Unsupported image type " + t.type);
        var i = SUPPORTED_IMAGE_FUNCTIONS[t.name];
        if (void 0 === i)
            throw new Error('Attempting to parse an unsupported image function "' + t.name + '"');
        return i(e, t.values)
    }
};
function isSupportedImage(e) {
    return !(20 === e.type && "none" === e.value || 18 === e.type && !SUPPORTED_IMAGE_FUNCTIONS[e.name])
}
for (var SUPPORTED_IMAGE_FUNCTIONS = {
    "linear-gradient": linearGradient,
    "-moz-linear-gradient": prefixLinearGradient,
    "-ms-linear-gradient": prefixLinearGradient,
    "-o-linear-gradient": prefixLinearGradient,
    "-webkit-linear-gradient": prefixLinearGradient,
    "radial-gradient": radialGradient,
    "-moz-radial-gradient": prefixRadialGradient,
    "-ms-radial-gradient": prefixRadialGradient,
    "-o-radial-gradient": prefixRadialGradient,
    "-webkit-radial-gradient": prefixRadialGradient,
    "-webkit-gradient": webkitGradient
}, backgroundImage = {
    name: "background-image",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function(e, t) {
        var i;
        return 0 === t.length || 20 === (i = t[0]).type && "none" === i.value ? [] : t.filter((function(e) {
            return nonFunctionArgSeparator(e) && isSupportedImage(e)
        }
        )).map((function(t) {
            return image.parse(e, t)
        }
        ))
    }
}, backgroundOrigin = {
    name: "background-origin",
    initialValue: "border-box",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return t.map((function(e) {
            if (isIdentToken(e))
                switch (e.value) {
                case "padding-box":
                    return 1;
                case "content-box":
                    return 2
                }
            return 0
        }
        ))
    }
}, backgroundPosition = {
    name: "background-position",
    initialValue: "0% 0%",
    type: 1,
    prefix: !1,
    parse: function(e, t) {
        return parseFunctionArgs(t).map((function(e) {
            return e.filter(isLengthPercentage)
        }
        )).map(parseLengthPercentageTuple)
    }
}, backgroundRepeat = {
    name: "background-repeat",
    initialValue: "repeat",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return parseFunctionArgs(t).map((function(e) {
            return e.filter(isIdentToken).map((function(e) {
                return e.value
            }
            )).join(" ")
        }
        )).map(parseBackgroundRepeat)
    }
}, parseBackgroundRepeat = function(e) {
    switch (e) {
    case "no-repeat":
        return 1;
    case "repeat-x":
    case "repeat no-repeat":
        return 2;
    case "repeat-y":
    case "no-repeat repeat":
        return 3;
    default:
        return 0
    }
}, BACKGROUND_SIZE, backgroundSize = (function(e) {
    e.AUTO = "auto",
    e.CONTAIN = "contain",
    e.COVER = "cover"
}(BACKGROUND_SIZE = BACKGROUND_SIZE || {}),
{
    name: "background-size",
    initialValue: "0",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return parseFunctionArgs(t).map((function(e) {
            return e.filter(isBackgroundSizeInfoToken)
        }
        ))
    }
}), isBackgroundSizeInfoToken = function(e) {
    return isIdentToken(e) || isLengthPercentage(e)
}, borderColorForSide = function(e) {
    return {
        name: "border-" + e + "-color",
        initialValue: "transparent",
        prefix: !1,
        type: 3,
        format: "color"
    }
}, borderTopColor = borderColorForSide("top"), borderRightColor = borderColorForSide("right"), borderBottomColor = borderColorForSide("bottom"), borderLeftColor = borderColorForSide("left"), borderRadiusForSide = function(e) {
    return {
        name: "border-radius-" + e,
        initialValue: "0 0",
        prefix: !1,
        type: 1,
        parse: function(e, t) {
            return parseLengthPercentageTuple(t.filter(isLengthPercentage))
        }
    }
}, borderTopLeftRadius = borderRadiusForSide("top-left"), borderTopRightRadius = borderRadiusForSide("top-right"), borderBottomRightRadius = borderRadiusForSide("bottom-right"), borderBottomLeftRadius = borderRadiusForSide("bottom-left"), borderStyleForSide = function(e) {
    return {
        name: "border-" + e + "-style",
        initialValue: "solid",
        prefix: !1,
        type: 2,
        parse: function(e, t) {
            switch (t) {
            case "none":
                return 0;
            case "dashed":
                return 2;
            case "dotted":
                return 3;
            case "double":
                return 4
            }
            return 1
        }
    }
}, borderTopStyle = borderStyleForSide("top"), borderRightStyle = borderStyleForSide("right"), borderBottomStyle = borderStyleForSide("bottom"), borderLeftStyle = borderStyleForSide("left"), borderWidthForSide = function(e) {
    return {
        name: "border-" + e + "-width",
        initialValue: "0",
        type: 0,
        prefix: !1,
        parse: function(e, t) {
            return isDimensionToken(t) ? t.number : 0
        }
    }
}, borderTopWidth = borderWidthForSide("top"), borderRightWidth = borderWidthForSide("right"), borderBottomWidth = borderWidthForSide("bottom"), borderLeftWidth = borderWidthForSide("left"), color = {
    name: "color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color"
}, direction = {
    name: "direction",
    initialValue: "ltr",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        return "rtl" !== t ? 0 : 1
    }
}, display = {
    name: "display",
    initialValue: "inline-block",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return t.filter(isIdentToken).reduce((function(e, t) {
            return e | parseDisplayValue(t.value)
        }
        ), 0)
    }
}, parseDisplayValue = function(e) {
    switch (e) {
    case "block":
    case "-webkit-box":
        return 2;
    case "inline":
        return 4;
    case "run-in":
        return 8;
    case "flow":
        return 16;
    case "flow-root":
        return 32;
    case "table":
        return 64;
    case "flex":
    case "-webkit-flex":
        return 128;
    case "grid":
    case "-ms-grid":
        return 256;
    case "ruby":
        return 512;
    case "subgrid":
        return 1024;
    case "list-item":
        return 2048;
    case "table-row-group":
        return 4096;
    case "table-header-group":
        return 8192;
    case "table-footer-group":
        return 16384;
    case "table-row":
        return 32768;
    case "table-cell":
        return 65536;
    case "table-column-group":
        return 131072;
    case "table-column":
        return 262144;
    case "table-caption":
        return 524288;
    case "ruby-base":
        return 1048576;
    case "ruby-text":
        return 2097152;
    case "ruby-base-container":
        return 4194304;
    case "ruby-text-container":
        return 8388608;
    case "contents":
        return 16777216;
    case "inline-block":
        return 33554432;
    case "inline-list-item":
        return 67108864;
    case "inline-table":
        return 134217728;
    case "inline-flex":
        return 268435456;
    case "inline-grid":
        return 536870912
    }
    return 0
}, float = {
    name: "float",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "left":
            return 1;
        case "right":
            return 2;
        case "inline-start":
            return 3;
        case "inline-end":
            return 4
        }
        return 0
    }
}, letterSpacing = {
    name: "letter-spacing",
    initialValue: "0",
    prefix: !1,
    type: 0,
    parse: function(e, t) {
        return 20 === t.type && "normal" === t.value || 17 !== t.type && 15 !== t.type ? 0 : t.number
    }
}, LINE_BREAK, lineBreak = (function(e) {
    e.NORMAL = "normal",
    e.STRICT = "strict"
}(LINE_BREAK = LINE_BREAK || {}),
{
    name: "line-break",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        return "strict" !== t ? LINE_BREAK.NORMAL : LINE_BREAK.STRICT
    }
}), lineHeight = {
    name: "line-height",
    initialValue: "normal",
    prefix: !1,
    type: 4
}, computeLineHeight = function(e, t) {
    return isIdentToken(e) && "normal" === e.value ? 1.2 * t : 17 === e.type ? t * e.number : isLengthPercentage(e) ? getAbsoluteValue(e, t) : t
}, listStyleImage = {
    name: "list-style-image",
    initialValue: "none",
    type: 0,
    prefix: !1,
    parse: function(e, t) {
        return 20 === t.type && "none" === t.value ? null : image.parse(e, t)
    }
}, listStylePosition = {
    name: "list-style-position",
    initialValue: "outside",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        return "inside" !== t ? 1 : 0
    }
}, listStyleType = {
    name: "list-style-type",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "disc":
            return 0;
        case "circle":
            return 1;
        case "square":
            return 2;
        case "decimal":
            return 3;
        case "cjk-decimal":
            return 4;
        case "decimal-leading-zero":
            return 5;
        case "lower-roman":
            return 6;
        case "upper-roman":
            return 7;
        case "lower-greek":
            return 8;
        case "lower-alpha":
            return 9;
        case "upper-alpha":
            return 10;
        case "arabic-indic":
            return 11;
        case "armenian":
            return 12;
        case "bengali":
            return 13;
        case "cambodian":
            return 14;
        case "cjk-earthly-branch":
            return 15;
        case "cjk-heavenly-stem":
            return 16;
        case "cjk-ideographic":
            return 17;
        case "devanagari":
            return 18;
        case "ethiopic-numeric":
            return 19;
        case "georgian":
            return 20;
        case "gujarati":
            return 21;
        case "gurmukhi":
        case "hebrew":
            return 22;
        case "hiragana":
            return 23;
        case "hiragana-iroha":
            return 24;
        case "japanese-formal":
            return 25;
        case "japanese-informal":
            return 26;
        case "kannada":
            return 27;
        case "katakana":
            return 28;
        case "katakana-iroha":
            return 29;
        case "khmer":
            return 30;
        case "korean-hangul-formal":
            return 31;
        case "korean-hanja-formal":
            return 32;
        case "korean-hanja-informal":
            return 33;
        case "lao":
            return 34;
        case "lower-armenian":
            return 35;
        case "malayalam":
            return 36;
        case "mongolian":
            return 37;
        case "myanmar":
            return 38;
        case "oriya":
            return 39;
        case "persian":
            return 40;
        case "simp-chinese-formal":
            return 41;
        case "simp-chinese-informal":
            return 42;
        case "tamil":
            return 43;
        case "telugu":
            return 44;
        case "thai":
            return 45;
        case "tibetan":
            return 46;
        case "trad-chinese-formal":
            return 47;
        case "trad-chinese-informal":
            return 48;
        case "upper-armenian":
            return 49;
        case "disclosure-open":
            return 50;
        case "disclosure-closed":
            return 51;
        default:
            return -1
        }
    }
}, marginForSide = function(e) {
    return {
        name: "margin-" + e,
        initialValue: "0",
        prefix: !1,
        type: 4
    }
}, marginTop = marginForSide("top"), marginRight = marginForSide("right"), marginBottom = marginForSide("bottom"), marginLeft = marginForSide("left"), overflow = {
    name: "overflow",
    initialValue: "visible",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return t.filter(isIdentToken).map((function(e) {
            switch (e.value) {
            case "hidden":
                return 1;
            case "scroll":
                return 2;
            case "clip":
                return 3;
            case "auto":
                return 4;
            default:
                return 0
            }
        }
        ))
    }
}, overflowWrap = {
    name: "overflow-wrap",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        return "break-word" !== t ? "normal" : "break-word"
    }
}, paddingForSide = function(e) {
    return {
        name: "padding-" + e,
        initialValue: "0",
        prefix: !1,
        type: 3,
        format: "length-percentage"
    }
}, paddingTop = paddingForSide("top"), paddingRight = paddingForSide("right"), paddingBottom = paddingForSide("bottom"), paddingLeft = paddingForSide("left"), textAlign = {
    name: "text-align",
    initialValue: "left",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "right":
            return 2;
        case "center":
        case "justify":
            return 1;
        default:
            return 0
        }
    }
}, position = {
    name: "position",
    initialValue: "static",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "relative":
            return 1;
        case "absolute":
            return 2;
        case "fixed":
            return 3;
        case "sticky":
            return 4
        }
        return 0
    }
}, textShadow = {
    name: "text-shadow",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function(e, t) {
        return 1 === t.length && isIdentWithValue(t[0], "none") ? [] : parseFunctionArgs(t).map((function(t) {
            for (var i = {
                color: COLORS.TRANSPARENT,
                offsetX: ZERO_LENGTH,
                offsetY: ZERO_LENGTH,
                blur: ZERO_LENGTH
            }, n = 0, o = 0; o < t.length; o++) {
                var r = t[o];
                isLength(r) ? (0 === n ? i.offsetX = r : 1 === n ? i.offsetY = r : i.blur = r,
                n++) : i.color = color$1.parse(e, r)
            }
            return i
        }
        ))
    }
}, textTransform = {
    name: "text-transform",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "uppercase":
            return 2;
        case "lowercase":
            return 1;
        case "capitalize":
            return 3
        }
        return 0
    }
}, transform$1 = {
    name: "transform",
    initialValue: "none",
    prefix: !0,
    type: 0,
    parse: function(e, t) {
        if (20 === t.type && "none" === t.value)
            return null;
        if (18 !== t.type)
            return null;
        var i = SUPPORTED_TRANSFORM_FUNCTIONS[t.name];
        if (void 0 === i)
            throw new Error('Attempting to parse an unsupported transform function "' + t.name + '"');
        return i(t.values)
    }
}, matrix = function(e) {
    return 6 === (e = e.filter((function(e) {
        return 17 === e.type
    }
    )).map((function(e) {
        return e.number
    }
    ))).length ? e : null
}, matrix3d = function(e) {
    var t = (e = e.filter((function(e) {
        return 17 === e.type
    }
    )).map((function(e) {
        return e.number
    }
    )))[0]
      , i = e[1]
      , n = (e[2],
    e[3],
    e[4])
      , o = e[5]
      , r = (e[6],
    e[7],
    e[8],
    e[9],
    e[10],
    e[11],
    e[12])
      , s = e[13];
    return e[14],
    e[15],
    16 === e.length ? [t, i, n, o, r, s] : null
}, SUPPORTED_TRANSFORM_FUNCTIONS = {
    matrix: matrix,
    matrix3d: matrix3d
}, DEFAULT_VALUE = {
    type: 16,
    number: 50,
    flags: FLAG_INTEGER
}, DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE], transformOrigin = {
    name: "transform-origin",
    initialValue: "50% 50%",
    prefix: !0,
    type: 1,
    parse: function(e, t) {
        return 2 !== (t = t.filter(isLengthPercentage)).length ? DEFAULT : [t[0], t[1]]
    }
}, visibility = {
    name: "visible",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "hidden":
            return 1;
        case "collapse":
            return 2;
        default:
            return 0
        }
    }
}, WORD_BREAK, wordBreak = (function(e) {
    e.NORMAL = "normal",
    e.BREAK_ALL = "break-all",
    e.KEEP_ALL = "keep-all"
}(WORD_BREAK = WORD_BREAK || {}),
{
    name: "word-break",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "break-all":
            return WORD_BREAK.BREAK_ALL;
        case "keep-all":
            return WORD_BREAK.KEEP_ALL;
        default:
            return WORD_BREAK.NORMAL
        }
    }
}), zIndex = {
    name: "z-index",
    initialValue: "auto",
    prefix: !1,
    type: 0,
    parse: function(e, t) {
        if (20 === t.type)
            return {
                auto: !0,
                order: 0
            };
        if (isNumberToken(t))
            return {
                auto: !1,
                order: t.number
            };
        throw new Error("Invalid z-index number parsed")
    }
}, time = {
    name: "time",
    parse: function(e, t) {
        if (15 === t.type)
            switch (t.unit.toLowerCase()) {
            case "s":
                return 1e3 * t.number;
            case "ms":
                return t.number
            }
        throw new Error("Unsupported time type")
    }
}, opacity = {
    name: "opacity",
    initialValue: "1",
    type: 0,
    prefix: !1,
    parse: function(e, t) {
        return isNumberToken(t) ? t.number : 1
    }
}, textDecorationColor = {
    name: "text-decoration-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color"
}, textDecorationLine = {
    name: "text-decoration-line",
    initialValue: "none",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return t.filter(isIdentToken).map((function(e) {
            switch (e.value) {
            case "underline":
                return 1;
            case "overline":
                return 2;
            case "line-through":
                return 3;
            case "none":
                return 4
            }
            return 0
        }
        )).filter((function(e) {
            return 0 !== e
        }
        ))
    }
}, fontFamily = {
    name: "font-family",
    initialValue: "",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        var i = []
          , n = [];
        return t.forEach((function(e) {
            switch (e.type) {
            case 20:
            case 0:
                i.push(e.value);
                break;
            case 17:
                i.push(e.number.toString());
                break;
            case 4:
                n.push(i.join(" ")),
                i.length = 0
            }
        }
        )),
        i.length && n.push(i.join(" ")),
        n.map((function(e) {
            return -1 === e.indexOf(" ") ? e : "'" + e + "'"
        }
        ))
    }
}, fontSize = {
    name: "font-size",
    initialValue: "0",
    prefix: !1,
    type: 3,
    format: "length"
}, fontWeight = {
    name: "font-weight",
    initialValue: "normal",
    type: 0,
    prefix: !1,
    parse: function(e, t) {
        return isNumberToken(t) ? t.number : isIdentToken(t) && "bold" === t.value ? 700 : 400
    }
}, fontVariant = {
    name: "font-variant",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function(e, t) {
        return t.filter(isIdentToken).map((function(e) {
            return e.value
        }
        ))
    }
}, fontStyle = {
    name: "font-style",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
        switch (t) {
        case "oblique":
            return "oblique";
        case "italic":
            return "italic";
        default:
            return "normal"
        }
    }
}, contains = function(e, t) {
    return 0 != (e & t)
}, content = {
    name: "content",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function(e, t) {
        var i;
        return 0 === t.length || 20 === (i = t[0]).type && "none" === i.value ? [] : t
    }
}, counterIncrement = {
    name: "counter-increment",
    initialValue: "none",
    prefix: !0,
    type: 1,
    parse: function(e, t) {
        if (0 === t.length)
            return null;
        var i = t[0];
        if (20 === i.type && "none" === i.value)
            return null;
        for (var n = [], o = t.filter(nonWhiteSpace), r = 0; r < o.length; r++) {
            var s = o[r]
              , a = o[r + 1];
            20 === s.type && (a = a && isNumberToken(a) ? a.number : 1,
            n.push({
                counter: s.value,
                increment: a
            }))
        }
        return n
    }
}, counterReset = {
    name: "counter-reset",
    initialValue: "none",
    prefix: !0,
    type: 1,
    parse: function(e, t) {
        if (0 === t.length)
            return [];
        for (var i = [], n = t.filter(nonWhiteSpace), o = 0; o < n.length; o++) {
            var r = n[o]
              , s = n[o + 1];
            isIdentToken(r) && "none" !== r.value && (s = s && isNumberToken(s) ? s.number : 0,
            i.push({
                counter: r.value,
                reset: s
            }))
        }
        return i
    }
}, duration = {
    name: "duration",
    initialValue: "0s",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        return t.filter(isDimensionToken).map((function(t) {
            return time.parse(e, t)
        }
        ))
    }
}, quotes = {
    name: "quotes",
    initialValue: "none",
    prefix: !0,
    type: 1,
    parse: function(e, t) {
        if (0 === t.length)
            return null;
        var i = t[0];
        if (20 === i.type && "none" === i.value)
            return null;
        var n = []
          , o = t.filter(isStringToken);
        if (o.length % 2 != 0)
            return null;
        for (var r = 0; r < o.length; r += 2) {
            var s = o[r].value
              , a = o[r + 1].value;
            n.push({
                open: s,
                close: a
            })
        }
        return n
    }
}, getQuote = function(e, t, i) {
    return e && (t = e[Math.min(t, e.length - 1)]) ? i ? t.open : t.close : ""
}, boxShadow = {
    name: "box-shadow",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function(e, t) {
        return 1 === t.length && isIdentWithValue(t[0], "none") ? [] : parseFunctionArgs(t).map((function(t) {
            for (var i = {
                color: 255,
                offsetX: ZERO_LENGTH,
                offsetY: ZERO_LENGTH,
                blur: ZERO_LENGTH,
                spread: ZERO_LENGTH,
                inset: !1
            }, n = 0, o = 0; o < t.length; o++) {
                var r = t[o];
                isIdentWithValue(r, "inset") ? i.inset = !0 : isLength(r) ? (0 === n ? i.offsetX = r : 1 === n ? i.offsetY = r : 2 === n ? i.blur = r : i.spread = r,
                n++) : i.color = color$1.parse(e, r)
            }
            return i
        }
        ))
    }
}, paintOrder = {
    name: "paint-order",
    initialValue: "normal",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
        var i = [];
        return t.filter(isIdentToken).forEach((function(e) {
            switch (e.value) {
            case "stroke":
                i.push(1);
                break;
            case "fill":
                i.push(0);
                break;
            case "markers":
                i.push(2)
            }
        }
        )),
        [0, 1, 2].forEach((function(e) {
            -1 === i.indexOf(e) && i.push(e)
        }
        )),
        i
    }
}, webkitTextStrokeColor = {
    name: "-webkit-text-stroke-color",
    initialValue: "currentcolor",
    prefix: !1,
    type: 3,
    format: "color"
}, webkitTextStrokeWidth = {
    name: "-webkit-text-stroke-width",
    initialValue: "0",
    type: 0,
    prefix: !1,
    parse: function(e, t) {
        return isDimensionToken(t) ? t.number : 0
    }
}, CSSParsedDeclaration = function() {
    function e(e, t) {
        this.animationDuration = parse(e, duration, t.animationDuration),
        this.backgroundClip = parse(e, backgroundClip, t.backgroundClip),
        this.backgroundColor = parse(e, backgroundColor, t.backgroundColor),
        this.backgroundImage = parse(e, backgroundImage, t.backgroundImage),
        this.backgroundOrigin = parse(e, backgroundOrigin, t.backgroundOrigin),
        this.backgroundPosition = parse(e, backgroundPosition, t.backgroundPosition),
        this.backgroundRepeat = parse(e, backgroundRepeat, t.backgroundRepeat),
        this.backgroundSize = parse(e, backgroundSize, t.backgroundSize),
        this.borderTopColor = parse(e, borderTopColor, t.borderTopColor),
        this.borderRightColor = parse(e, borderRightColor, t.borderRightColor),
        this.borderBottomColor = parse(e, borderBottomColor, t.borderBottomColor),
        this.borderLeftColor = parse(e, borderLeftColor, t.borderLeftColor),
        this.borderTopLeftRadius = parse(e, borderTopLeftRadius, t.borderTopLeftRadius),
        this.borderTopRightRadius = parse(e, borderTopRightRadius, t.borderTopRightRadius),
        this.borderBottomRightRadius = parse(e, borderBottomRightRadius, t.borderBottomRightRadius),
        this.borderBottomLeftRadius = parse(e, borderBottomLeftRadius, t.borderBottomLeftRadius),
        this.borderTopStyle = parse(e, borderTopStyle, t.borderTopStyle),
        this.borderRightStyle = parse(e, borderRightStyle, t.borderRightStyle),
        this.borderBottomStyle = parse(e, borderBottomStyle, t.borderBottomStyle),
        this.borderLeftStyle = parse(e, borderLeftStyle, t.borderLeftStyle),
        this.borderTopWidth = parse(e, borderTopWidth, t.borderTopWidth),
        this.borderRightWidth = parse(e, borderRightWidth, t.borderRightWidth),
        this.borderBottomWidth = parse(e, borderBottomWidth, t.borderBottomWidth),
        this.borderLeftWidth = parse(e, borderLeftWidth, t.borderLeftWidth),
        this.boxShadow = parse(e, boxShadow, t.boxShadow),
        this.color = parse(e, color, t.color),
        this.direction = parse(e, direction, t.direction),
        this.display = parse(e, display, t.display),
        this.float = parse(e, float, t.cssFloat),
        this.fontFamily = parse(e, fontFamily, t.fontFamily),
        this.fontSize = parse(e, fontSize, t.fontSize),
        this.fontStyle = parse(e, fontStyle, t.fontStyle),
        this.fontVariant = parse(e, fontVariant, t.fontVariant),
        this.fontWeight = parse(e, fontWeight, t.fontWeight),
        this.letterSpacing = parse(e, letterSpacing, t.letterSpacing),
        this.lineBreak = parse(e, lineBreak, t.lineBreak),
        this.lineHeight = parse(e, lineHeight, t.lineHeight),
        this.listStyleImage = parse(e, listStyleImage, t.listStyleImage),
        this.listStylePosition = parse(e, listStylePosition, t.listStylePosition),
        this.listStyleType = parse(e, listStyleType, t.listStyleType),
        this.marginTop = parse(e, marginTop, t.marginTop),
        this.marginRight = parse(e, marginRight, t.marginRight),
        this.marginBottom = parse(e, marginBottom, t.marginBottom),
        this.marginLeft = parse(e, marginLeft, t.marginLeft),
        this.opacity = parse(e, opacity, t.opacity);
        var i = parse(e, overflow, t.overflow);
        this.overflowX = i[0],
        this.overflowY = i[1 < i.length ? 1 : 0],
        this.overflowWrap = parse(e, overflowWrap, t.overflowWrap),
        this.paddingTop = parse(e, paddingTop, t.paddingTop),
        this.paddingRight = parse(e, paddingRight, t.paddingRight),
        this.paddingBottom = parse(e, paddingBottom, t.paddingBottom),
        this.paddingLeft = parse(e, paddingLeft, t.paddingLeft),
        this.paintOrder = parse(e, paintOrder, t.paintOrder),
        this.position = parse(e, position, t.position),
        this.textAlign = parse(e, textAlign, t.textAlign),
        this.textDecorationColor = parse(e, textDecorationColor, null != (i = t.textDecorationColor) ? i : t.color),
        this.textDecorationLine = parse(e, textDecorationLine, null != (i = t.textDecorationLine) ? i : t.textDecoration),
        this.textShadow = parse(e, textShadow, t.textShadow),
        this.textTransform = parse(e, textTransform, t.textTransform),
        this.transform = parse(e, transform$1, t.transform),
        this.transformOrigin = parse(e, transformOrigin, t.transformOrigin),
        this.visibility = parse(e, visibility, t.visibility),
        this.webkitTextStrokeColor = parse(e, webkitTextStrokeColor, t.webkitTextStrokeColor),
        this.webkitTextStrokeWidth = parse(e, webkitTextStrokeWidth, t.webkitTextStrokeWidth),
        this.wordBreak = parse(e, wordBreak, t.wordBreak),
        this.zIndex = parse(e, zIndex, t.zIndex)
    }
    return e.prototype.isVisible = function() {
        return 0 < this.display && 0 < this.opacity && 0 === this.visibility
    }
    ,
    e.prototype.isTransparent = function() {
        return isTransparent(this.backgroundColor)
    }
    ,
    e.prototype.isTransformed = function() {
        return null !== this.transform
    }
    ,
    e.prototype.isPositioned = function() {
        return 0 !== this.position
    }
    ,
    e.prototype.isPositionedWithZIndex = function() {
        return this.isPositioned() && !this.zIndex.auto
    }
    ,
    e.prototype.isFloating = function() {
        return 0 !== this.float
    }
    ,
    e.prototype.isInlineLevel = function() {
        return contains(this.display, 4) || contains(this.display, 33554432) || contains(this.display, 268435456) || contains(this.display, 536870912) || contains(this.display, 67108864) || contains(this.display, 134217728)
    }
    ,
    e
}(), CSSParsedPseudoDeclaration = function(e, t) {
    this.content = parse(e, content, t.content),
    this.quotes = parse(e, quotes, t.quotes)
}, CSSParsedCounterDeclaration = function(e, t) {
    this.counterIncrement = parse(e, counterIncrement, t.counterIncrement),
    this.counterReset = parse(e, counterReset, t.counterReset)
}, parse = function(e, t, i) {
    var n = new Tokenizer
      , o = (i = null != i ? i.toString() : t.initialValue,
    n.write(i),
    new Parser(n.read()));
    switch (t.type) {
    case 2:
        var r = o.parseComponentValue();
        return t.parse(e, isIdentToken(r) ? r.value : t.initialValue);
    case 0:
        return t.parse(e, o.parseComponentValue());
    case 1:
        return t.parse(e, o.parseComponentValues());
    case 4:
        return o.parseComponentValue();
    case 3:
        switch (t.format) {
        case "angle":
            return angle.parse(e, o.parseComponentValue());
        case "color":
            return color$1.parse(e, o.parseComponentValue());
        case "image":
            return image.parse(e, o.parseComponentValue());
        case "length":
            var s = o.parseComponentValue();
            return isLength(s) ? s : ZERO_LENGTH;
        case "length-percentage":
            return s = o.parseComponentValue(),
            isLengthPercentage(s) ? s : ZERO_LENGTH;
        case "time":
            return time.parse(e, o.parseComponentValue())
        }
    }
}, elementDebuggerAttribute = "data-html2canvas-debug", getElementDebugType = function(e) {
    switch (e.getAttribute(elementDebuggerAttribute)) {
    case "all":
        return 1;
    case "clone":
        return 2;
    case "parse":
        return 3;
    case "render":
        return 4;
    default:
        return 0
    }
}, isDebugging = function(e, t) {
    return 1 === (e = getElementDebugType(e)) || t === e
}, ElementContainer = function(e, t) {
    this.context = e,
    this.textNodes = [],
    this.elements = [],
    this.flags = 0,
    isDebugging(t, 3),
    this.styles = new CSSParsedDeclaration(e,window.getComputedStyle(t, null)),
    isHTMLElementNode(t) && (this.styles.animationDuration.some((function(e) {
        return 0 < e
    }
    )) && (t.style.animationDuration = "0s"),
    null !== this.styles.transform) && (t.style.transform = "none"),
    this.bounds = parseBounds(this.context, t),
    isDebugging(t, 4) && (this.flags |= 16)
}, base64 = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$1 = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i$1 = 0; i$1 < chars$1.length; i$1++)
    lookup$1[chars$1.charCodeAt(i$1)] = i$1;
for (var decode = function(e) {
    for (var t, i, n, o, r = .75 * e.length, s = e.length, a = 0, l = (r = ("=" === e[e.length - 1] && (r--,
    "=" === e[e.length - 2]) && r--,
    new ("undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? ArrayBuffer : Array)(r)),
    Array.isArray(r) ? r : new Uint8Array(r)), c = 0; c < s; c += 4)
        t = lookup$1[e.charCodeAt(c)],
        i = lookup$1[e.charCodeAt(c + 1)],
        n = lookup$1[e.charCodeAt(c + 2)],
        o = lookup$1[e.charCodeAt(c + 3)],
        l[a++] = t << 2 | i >> 4,
        l[a++] = (15 & i) << 4 | n >> 2,
        l[a++] = (3 & n) << 6 | 63 & o;
    return r
}, polyUint16Array = function(e) {
    for (var t = e.length, i = [], n = 0; n < t; n += 2)
        i.push(e[n + 1] << 8 | e[n]);
    return i
}, polyUint32Array = function(e) {
    for (var t = e.length, i = [], n = 0; n < t; n += 4)
        i.push(e[n + 3] << 24 | e[n + 2] << 16 | e[n + 1] << 8 | e[n]);
    return i
}, UTRIE2_SHIFT_2 = 5, UTRIE2_SHIFT_1 = 11, UTRIE2_INDEX_SHIFT = 2, UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2, UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> UTRIE2_SHIFT_2, UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2, UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1, UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> UTRIE2_SHIFT_2, UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH, UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH, UTRIE2_UTF8_2B_INDEX_2_LENGTH = 32, UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH, UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> UTRIE2_SHIFT_1, UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2, UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1, slice16 = function(e, t, i) {
    return e.slice ? e.slice(t, i) : new Uint16Array(Array.prototype.slice.call(e, t, i))
}, slice32 = function(e, t, i) {
    return e.slice ? e.slice(t, i) : new Uint32Array(Array.prototype.slice.call(e, t, i))
}, createTrieFromBase64 = function(e, t) {
    e = decode(e);
    var i = Array.isArray(e) ? polyUint32Array(e) : new Uint32Array(e)
      , n = (e = Array.isArray(e) ? polyUint16Array(e) : new Uint16Array(e),
    slice16(e, 12, i[4] / 2));
    e = 2 === i[5] ? slice16(e, (24 + i[4]) / 2) : slice32(i, Math.ceil((24 + i[4]) / 4));
    return new Trie(i[0],i[1],i[2],i[3],n,e)
}, Trie = function() {
    function e(e, t, i, n, o, r) {
        this.initialValue = e,
        this.errorValue = t,
        this.highStart = i,
        this.highValueIndex = n,
        this.index = o,
        this.data = r
    }
    return e.prototype.get = function(e) {
        var t;
        if (0 <= e) {
            if (e < 55296 || 56319 < e && e <= 65535)
                return t = this.index[e >> UTRIE2_SHIFT_2],
                this.data[t = (t << UTRIE2_INDEX_SHIFT) + (e & UTRIE2_DATA_MASK)];
            if (e <= 65535)
                return t = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (e - 55296 >> UTRIE2_SHIFT_2)],
                this.data[t = (t << UTRIE2_INDEX_SHIFT) + (e & UTRIE2_DATA_MASK)];
            if (e < this.highStart)
                return t = this.index[t = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (e >> UTRIE2_SHIFT_1)],
                t = this.index[t += e >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK],
                this.data[t = (t << UTRIE2_INDEX_SHIFT) + (e & UTRIE2_DATA_MASK)];
            if (e <= 1114111)
                return this.data[this.highValueIndex]
        }
        return this.errorValue
    }
    ,
    e
}(), chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), i = 0; i < chars.length; i++)
    lookup[chars.charCodeAt(i)] = i;
var Prepend = 1, CR = 2, LF = 3, Control = 4, Extend = 5, SpacingMark = 7, L = 8, V = 9, T = 10, LV = 11, LVT = 12, ZWJ = 13, Extended_Pictographic = 14, RI = 15, toCodePoints = function(e) {
    for (var t = [], i = 0, n = e.length; i < n; ) {
        var o, r = e.charCodeAt(i++);
        55296 <= r && r <= 56319 && i < n ? 56320 == (64512 & (o = e.charCodeAt(i++))) ? t.push(((1023 & r) << 10) + (1023 & o) + 65536) : (t.push(r),
        i--) : t.push(r)
    }
    return t
}, fromCodePoint = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    if (String.fromCodePoint)
        return String.fromCodePoint.apply(String, e);
    var i = e.length;
    if (!i)
        return "";
    for (var n = [], o = -1, r = ""; ++o < i; ) {
        var s = e[o];
        s <= 65535 ? n.push(s) : n.push(55296 + ((s -= 65536) >> 10), s % 1024 + 56320),
        (o + 1 === i || 16384 < n.length) && (r += String.fromCharCode.apply(String, n),
        n.length = 0)
    }
    return r
}, UnicodeTrie = createTrieFromBase64(base64), BREAK_NOT_ALLOWED = "×", BREAK_ALLOWED = "÷", codePointToClass = function(e) {
    return UnicodeTrie.get(e)
}, _graphemeBreakAtIndex = function(e, t, i) {
    var n = i - 2
      , o = t[n]
      , r = t[i - 1];
    i = t[i];
    if (r === CR && i === LF)
        return BREAK_NOT_ALLOWED;
    if (r !== CR && r !== LF && r !== Control && i !== CR && i !== LF && i !== Control) {
        if (r === L && -1 !== [L, V, LV, LVT].indexOf(i))
            return BREAK_NOT_ALLOWED;
        if (!(r !== LV && r !== V || i !== V && i !== T))
            return BREAK_NOT_ALLOWED;
        if ((r === LVT || r === T) && i === T)
            return BREAK_NOT_ALLOWED;
        if (i === ZWJ || i === Extend)
            return BREAK_NOT_ALLOWED;
        if (i === SpacingMark)
            return BREAK_NOT_ALLOWED;
        if (r === Prepend)
            return BREAK_NOT_ALLOWED;
        if (r === ZWJ && i === Extended_Pictographic) {
            for (; o === Extend; )
                o = t[--n];
            if (o === Extended_Pictographic)
                return BREAK_NOT_ALLOWED
        }
        if (r === RI && i === RI) {
            for (var s = 0; o === RI; )
                s++,
                o = t[--n];
            if (s % 2 == 0)
                return BREAK_NOT_ALLOWED
        }
    }
    return BREAK_ALLOWED
}, GraphemeBreaker = function(e) {
    var t = toCodePoints(e)
      , i = t.length
      , n = 0
      , o = 0
      , r = t.map(codePointToClass);
    return {
        next: function() {
            if (i <= n)
                return {
                    done: !0,
                    value: null
                };
            for (var e, s = BREAK_NOT_ALLOWED; n < i && (s = _graphemeBreakAtIndex(t, r, ++n)) === BREAK_NOT_ALLOWED; )
                ;
            return s !== BREAK_NOT_ALLOWED || n === i ? (e = fromCodePoint.apply(null, t.slice(o, n)),
            o = n,
            {
                value: e,
                done: !1
            }) : {
                done: !0,
                value: null
            }
        }
    }
}, splitGraphemes = function(e) {
    for (var t, i = GraphemeBreaker(e), n = []; !(t = i.next()).done; )
        t.value && n.push(t.value.slice());
    return n
}, testRangeBounds = function(e) {
    if (e.createRange && (i = e.createRange()).getBoundingClientRect) {
        var t = e.createElement("boundtest")
          , i = (t.style.height = "123px",
        t.style.display = "block",
        e.body.appendChild(t),
        i.selectNode(t),
        i.getBoundingClientRect());
        i = Math.round(i.height);
        if (e.body.removeChild(t),
        123 === i)
            return !0
    }
    return !1
}, testIOSLineBreak = function(e) {
    var t = e.createElement("boundtest")
      , i = (t.style.width = "50px",
    t.style.display = "block",
    t.style.fontSize = "12px",
    t.style.letterSpacing = "0px",
    t.style.wordSpacing = "0px",
    e.body.appendChild(t),
    e.createRange())
      , n = (t.innerHTML = "function" == typeof "".repeat ? "&#128104;".repeat(10) : "",
    t.firstChild)
      , o = toCodePoints$1(n.data).map((function(e) {
        return fromCodePoint$1(e)
    }
    ))
      , r = 0
      , s = {};
    o = o.every((function(e, t) {
        i.setStart(n, r),
        i.setEnd(n, r + e.length);
        var o = i.getBoundingClientRect();
        r += e.length,
        e = o.x > s.x || o.y > s.y;
        return s = o,
        0 === t || e
    }
    ));
    return e.body.removeChild(t),
    o
}, testCORS = function() {
    return void 0 !== (new Image).crossOrigin
}, testResponseType = function() {
    return "string" == typeof (new XMLHttpRequest).responseType
}, testSVG = function(e) {
    var t = new Image
      , i = (e = e.createElement("canvas")).getContext("2d");
    if (!i)
        return !1;
    t.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
        i.drawImage(t, 0, 0),
        e.toDataURL()
    } catch (e) {
        return !1
    }
    return !0
}, isGreenPixel = function(e) {
    return 0 === e[0] && 255 === e[1] && 0 === e[2] && 255 === e[3]
}, testForeignObject = function(e) {
    var t = e.createElement("canvas")
      , i = 100
      , n = (t.width = i,
    t.height = i,
    t.getContext("2d"));
    if (!n)
        return Promise.reject(!1);
    n.fillStyle = "rgb(0, 255, 0)",
    n.fillRect(0, 0, i, i);
    var o = new Image
      , r = t.toDataURL();
    o.src = r,
    t = createForeignObjectSVG(i, i, 0, 0, o);
    return n.fillStyle = "red",
    n.fillRect(0, 0, i, i),
    loadSerializedSVG$1(t).then((function(t) {
        n.drawImage(t, 0, 0);
        t = n.getImageData(0, 0, i, i).data;
        var o = (n.fillStyle = "red",
        n.fillRect(0, 0, i, i),
        e.createElement("div"));
        return o.style.backgroundImage = "url(" + r + ")",
        o.style.height = "100px",
        isGreenPixel(t) ? loadSerializedSVG$1(createForeignObjectSVG(i, i, 0, 0, o)) : Promise.reject(!1)
    }
    )).then((function(e) {
        return n.drawImage(e, 0, 0),
        isGreenPixel(n.getImageData(0, 0, i, i).data)
    }
    )).catch((function() {
        return !1
    }
    ))
}, createForeignObjectSVG = function(e, t, i, n, o) {
    var r = "http://www.w3.org/2000/svg"
      , s = document.createElementNS(r, "svg");
    r = document.createElementNS(r, "foreignObject");
    return s.setAttributeNS(null, "width", e.toString()),
    s.setAttributeNS(null, "height", t.toString()),
    r.setAttributeNS(null, "width", "100%"),
    r.setAttributeNS(null, "height", "100%"),
    r.setAttributeNS(null, "x", i.toString()),
    r.setAttributeNS(null, "y", n.toString()),
    r.setAttributeNS(null, "externalResourcesRequired", "true"),
    s.appendChild(r),
    r.appendChild(o),
    s
}, loadSerializedSVG$1 = function(e) {
    return new Promise((function(t, i) {
        var n = new Image;
        n.onload = function() {
            return t(n)
        }
        ,
        n.onerror = i,
        n.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent((new XMLSerializer).serializeToString(e))
    }
    ))
}, FEATURES = {
    get SUPPORT_RANGE_BOUNDS() {
        var e = testRangeBounds(document);
        return Object.defineProperty(FEATURES, "SUPPORT_RANGE_BOUNDS", {
            value: e
        }),
        e
    },
    get SUPPORT_WORD_BREAKING() {
        var e = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
        return Object.defineProperty(FEATURES, "SUPPORT_WORD_BREAKING", {
            value: e
        }),
        e
    },
    get SUPPORT_SVG_DRAWING() {
        var e = testSVG(document);
        return Object.defineProperty(FEATURES, "SUPPORT_SVG_DRAWING", {
            value: e
        }),
        e
    },
    get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var e = "function" == typeof Array.from && "function" == typeof window.fetch ? testForeignObject(document) : Promise.resolve(!1);
        return Object.defineProperty(FEATURES, "SUPPORT_FOREIGNOBJECT_DRAWING", {
            value: e
        }),
        e
    },
    get SUPPORT_CORS_IMAGES() {
        var e = testCORS();
        return Object.defineProperty(FEATURES, "SUPPORT_CORS_IMAGES", {
            value: e
        }),
        e
    },
    get SUPPORT_RESPONSE_TYPE() {
        var e = testResponseType();
        return Object.defineProperty(FEATURES, "SUPPORT_RESPONSE_TYPE", {
            value: e
        }),
        e
    },
    get SUPPORT_CORS_XHR() {
        var e = "withCredentials"in new XMLHttpRequest;
        return Object.defineProperty(FEATURES, "SUPPORT_CORS_XHR", {
            value: e
        }),
        e
    },
    get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
        var e = !("undefined" == typeof Intl || !Intl.Segmenter);
        return Object.defineProperty(FEATURES, "SUPPORT_NATIVE_TEXT_SEGMENTATION", {
            value: e
        }),
        e
    }
}, TextBounds = function(e, t) {
    this.text = e,
    this.bounds = t
}, parseTextBounds = function(e, t, i, n) {
    t = breakText(t, i);
    var o = []
      , r = 0;
    return t.forEach((function(t) {
        var s, a, l;
        i.textDecorationLine.length || 0 < t.trim().length ? FEATURES.SUPPORT_RANGE_BOUNDS ? 1 < (s = createRange(n, r, t.length).getClientRects()).length ? (l = segmentGraphemes(t),
        a = 0,
        l.forEach((function(t) {
            o.push(new TextBounds(t,Bounds.fromDOMRectList(e, createRange(n, a + r, t.length).getClientRects()))),
            a += t.length
        }
        ))) : o.push(new TextBounds(t,Bounds.fromDOMRectList(e, s))) : (l = n.splitText(t.length),
        o.push(new TextBounds(t,getWrapperBounds(e, n))),
        n = l) : FEATURES.SUPPORT_RANGE_BOUNDS || (n = n.splitText(t.length)),
        r += t.length
    }
    )),
    o
}, getWrapperBounds = function(e, t) {
    if (i = t.ownerDocument) {
        var i, n = ((i = i.createElement("html2canvaswrapper")).appendChild(t.cloneNode(!0)),
        t.parentNode);
        if (n)
            return n.replaceChild(i, t),
            t = parseBounds(e, i),
            i.firstChild && n.replaceChild(i.firstChild, i),
            t
    }
    return Bounds.EMPTY
}, createRange = function(e, t, i) {
    var n = e.ownerDocument;
    if (n)
        return (n = n.createRange()).setStart(e, t),
        n.setEnd(e, t + i),
        n;
    throw new Error("Node has no owner document")
}, segmentGraphemes = function(e) {
    var t;
    return FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION ? (t = new Intl.Segmenter(void 0,{
        granularity: "grapheme"
    }),
    Array.from(t.segment(e)).map((function(e) {
        return e.segment
    }
    ))) : splitGraphemes(e)
}, segmentWords = function(e, t) {
    var i;
    return FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION ? (i = new Intl.Segmenter(void 0,{
        granularity: "word"
    }),
    Array.from(i.segment(e)).map((function(e) {
        return e.segment
    }
    ))) : breakWords(e, t)
}, breakText = function(e, t) {
    return 0 !== t.letterSpacing ? segmentGraphemes(e) : segmentWords(e, t)
}, wordSeparators = [32, 160, 4961, 65792, 65793, 4153, 4241], breakWords = function(e, t) {
    for (var i, n = LineBreaker(e, {
        lineBreak: t.lineBreak,
        wordBreak: "break-word" === t.overflowWrap ? "break-word" : t.wordBreak
    }), o = []; !(i = n.next()).done; )
        !function() {
            var e, t;
            i.value && (e = i.value.slice(),
            e = toCodePoints$1(e),
            t = "",
            e.forEach((function(e) {
                -1 === wordSeparators.indexOf(e) ? t += fromCodePoint$1(e) : (t.length && o.push(t),
                o.push(fromCodePoint$1(e)),
                t = "")
            }
            )),
            t.length) && o.push(t)
        }();
    return o
}, TextContainer = function(e, t, i) {
    this.text = transform(t.data, i.textTransform),
    this.textBounds = parseTextBounds(e, this.text, i, t)
}, transform = function(e, t) {
    switch (t) {
    case 1:
        return e.toLowerCase();
    case 3:
        return e.replace(CAPITALIZE, capitalize);
    case 2:
        return e.toUpperCase();
    default:
        return e
    }
}, CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g, capitalize = function(e, t, i) {
    return 0 < e.length ? t + i.toUpperCase() : e
}, ImageElementContainer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this).src = i.currentSrc || i.src,
        t.intrinsicWidth = i.naturalWidth,
        t.intrinsicHeight = i.naturalHeight,
        t.context.cache.addImage(t.src),
        t
    }
    return __extends(t, e),
    t
}(ElementContainer), CanvasElementContainer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this).canvas = i,
        t.intrinsicWidth = i.width,
        t.intrinsicHeight = i.height,
        t
    }
    return __extends(t, e),
    t
}(ElementContainer), SVGElementContainer = function(e) {
    function t(t, i) {
        var n = e.call(this, t, i) || this
          , o = new XMLSerializer;
        t = parseBounds(t, i);
        return i.setAttribute("width", t.width + "px"),
        i.setAttribute("height", t.height + "px"),
        n.svg = "data:image/svg+xml," + encodeURIComponent(o.serializeToString(i)),
        n.intrinsicWidth = i.width.baseVal.value,
        n.intrinsicHeight = i.height.baseVal.value,
        n.context.cache.addImage(n.svg),
        n
    }
    return __extends(t, e),
    t
}(ElementContainer), LIElementContainer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this).value = i.value,
        t
    }
    return __extends(t, e),
    t
}(ElementContainer), OLElementContainer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this).start = i.start,
        t.reversed = "boolean" == typeof i.reversed && !0 === i.reversed,
        t
    }
    return __extends(t, e),
    t
}(ElementContainer), CHECKBOX_BORDER_RADIUS = [{
    type: 15,
    flags: 0,
    unit: "px",
    number: 3
}], RADIO_BORDER_RADIUS = [{
    type: 16,
    flags: 0,
    number: 50
}], reformatInputBounds = function(e) {
    return e.width > e.height ? new Bounds(e.left + (e.width - e.height) / 2,e.top,e.height,e.height) : e.width < e.height ? new Bounds(e.left,e.top + (e.height - e.width) / 2,e.width,e.width) : e
}, getInputValue = function(e) {
    var t = e.type === PASSWORD ? new Array(e.value.length + 1).join("•") : e.value;
    return 0 === t.length ? e.placeholder || "" : t
}, CHECKBOX = "checkbox", RADIO = "radio", PASSWORD = "password", INPUT_COLOR = 707406591, InputElementContainer = function(e) {
    function t(t, i) {
        var n = e.call(this, t, i) || this;
        switch (n.type = i.type.toLowerCase(),
        n.checked = i.checked,
        n.value = getInputValue(i),
        n.type !== CHECKBOX && n.type !== RADIO || (n.styles.backgroundColor = 3739148031,
        n.styles.borderTopColor = n.styles.borderRightColor = n.styles.borderBottomColor = n.styles.borderLeftColor = 2779096575,
        n.styles.borderTopWidth = n.styles.borderRightWidth = n.styles.borderBottomWidth = n.styles.borderLeftWidth = 1,
        n.styles.borderTopStyle = n.styles.borderRightStyle = n.styles.borderBottomStyle = n.styles.borderLeftStyle = 1,
        n.styles.backgroundClip = [0],
        n.styles.backgroundOrigin = [0],
        n.bounds = reformatInputBounds(n.bounds)),
        n.type) {
        case CHECKBOX:
            n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
            break;
        case RADIO:
            n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS
        }
        return n
    }
    return __extends(t, e),
    t
}(ElementContainer), SelectElementContainer = function(e) {
    function t(t, i) {
        return t = e.call(this, t, i) || this,
        i = i.options[i.selectedIndex || 0],
        t.value = i && i.text || "",
        t
    }
    return __extends(t, e),
    t
}(ElementContainer), TextareaElementContainer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this).value = i.value,
        t
    }
    return __extends(t, e),
    t
}(ElementContainer), IFrameElementContainer = function(e) {
    function t(t, i) {
        var n, o, r = e.call(this, t, i) || this;
        r.src = i.src,
        r.width = parseInt(i.width, 10) || 0,
        r.height = parseInt(i.height, 10) || 0,
        r.backgroundColor = r.styles.backgroundColor;
        try {
            i.contentWindow && i.contentWindow.document && i.contentWindow.document.documentElement && (r.tree = parseTree(t, i.contentWindow.document.documentElement),
            n = i.contentWindow.document.documentElement ? parseColor(t, getComputedStyle(i.contentWindow.document.documentElement).backgroundColor) : COLORS.TRANSPARENT,
            o = i.contentWindow.document.body ? parseColor(t, getComputedStyle(i.contentWindow.document.body).backgroundColor) : COLORS.TRANSPARENT,
            r.backgroundColor = isTransparent(n) ? isTransparent(o) ? r.styles.backgroundColor : o : n)
        } catch (t) {}
        return r
    }
    return __extends(t, e),
    t
}(ElementContainer), LIST_OWNERS = ["OL", "UL", "MENU"], parseNodeTree = function(e, t, i, n) {
    for (var o = t.firstChild; o; o = s) {
        var r, s = o.nextSibling;
        isTextNode(o) && 0 < o.data.trim().length ? i.textNodes.push(new TextContainer(e,o,i.styles)) : isElementNode(o) && (isSlotElement(o) && o.assignedNodes ? o.assignedNodes().forEach((function(t) {
            return parseNodeTree(e, t, i, n)
        }
        )) : (r = createContainer(e, o)).styles.isVisible() && (createsRealStackingContext(o, r, n) ? r.flags |= 4 : createsStackingContext(r.styles) && (r.flags |= 2),
        -1 !== LIST_OWNERS.indexOf(o.tagName) && (r.flags |= 8),
        i.elements.push(r),
        o.slot,
        o.shadowRoot ? parseNodeTree(e, o.shadowRoot, r, n) : isTextareaElement(o) || isSVGElement(o) || isSelectElement(o) || parseNodeTree(e, o, r, n)))
    }
}, createContainer = function(e, t) {
    return new (isImageElement(t) ? ImageElementContainer : isCanvasElement(t) ? CanvasElementContainer : isSVGElement(t) ? SVGElementContainer : isLIElement(t) ? LIElementContainer : isOLElement(t) ? OLElementContainer : isInputElement(t) ? InputElementContainer : isSelectElement(t) ? SelectElementContainer : isTextareaElement(t) ? TextareaElementContainer : isIFrameElement(t) ? IFrameElementContainer : ElementContainer)(e,t)
}, parseTree = function(e, t) {
    var i = createContainer(e, t);
    return i.flags |= 4,
    parseNodeTree(e, t, i, i),
    i
}, createsRealStackingContext = function(e, t, i) {
    return t.styles.isPositionedWithZIndex() || t.styles.opacity < 1 || t.styles.isTransformed() || isBodyElement(e) && i.styles.isTransparent()
}, createsStackingContext = function(e) {
    return e.isPositioned() || e.isFloating()
}, isTextNode = function(e) {
    return e.nodeType === Node.TEXT_NODE
}, isElementNode = function(e) {
    return e.nodeType === Node.ELEMENT_NODE
}, isHTMLElementNode = function(e) {
    return isElementNode(e) && void 0 !== e.style && !isSVGElementNode(e)
}, isSVGElementNode = function(e) {
    return "object" == typeof e.className
}, isLIElement = function(e) {
    return "LI" === e.tagName
}, isOLElement = function(e) {
    return "OL" === e.tagName
}, isInputElement = function(e) {
    return "INPUT" === e.tagName
}, isHTMLElement = function(e) {
    return "HTML" === e.tagName
}, isSVGElement = function(e) {
    return "svg" === e.tagName
}, isBodyElement = function(e) {
    return "BODY" === e.tagName
}, isCanvasElement = function(e) {
    return "CANVAS" === e.tagName
}, isVideoElement = function(e) {
    return "VIDEO" === e.tagName
}, isImageElement = function(e) {
    return "IMG" === e.tagName
}, isIFrameElement = function(e) {
    return "IFRAME" === e.tagName
}, isStyleElement = function(e) {
    return "STYLE" === e.tagName
}, isScriptElement = function(e) {
    return "SCRIPT" === e.tagName
}, isTextareaElement = function(e) {
    return "TEXTAREA" === e.tagName
}, isSelectElement = function(e) {
    return "SELECT" === e.tagName
}, isSlotElement = function(e) {
    return "SLOT" === e.tagName
}, isCustomElement = function(e) {
    return 0 < e.tagName.indexOf("-")
}, CounterState = function() {
    function e() {
        this.counters = {}
    }
    return e.prototype.getCounterValue = function(e) {
        return (e = this.counters[e]) && e.length ? e[e.length - 1] : 1
    }
    ,
    e.prototype.getCounterValues = function(e) {
        return (e = this.counters[e]) || []
    }
    ,
    e.prototype.pop = function(e) {
        var t = this;
        e.forEach((function(e) {
            return t.counters[e].pop()
        }
        ))
    }
    ,
    e.prototype.parse = function(e) {
        var t = this
          , i = e.counterIncrement
          , n = (e = e.counterReset,
        !0)
          , o = (null !== i && i.forEach((function(e) {
            var i = t.counters[e.counter];
            i && 0 !== e.increment && (n = !1,
            i.length || i.push(1),
            i[Math.max(0, i.length - 1)] += e.increment)
        }
        )),
        []);
        return n && e.forEach((function(e) {
            var i = t.counters[e.counter];
            o.push(e.counter),
            (i = i || (t.counters[e.counter] = [])).push(e.reset)
        }
        )),
        o
    }
    ,
    e
}(), ROMAN_UPPER = {
    integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
}, ARMENIAN = {
    integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"]
}, HEBREW = {
    integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"]
}, GEORGIAN = {
    integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"]
}, createAdditiveCounter = function(e, t, i, n, o, r) {
    return e < t || i < e ? createCounterText(e, o, 0 < r.length) : n.integers.reduce((function(t, i, o) {
        for (; i <= e; )
            e -= i,
            t += n.values[o];
        return t
    }
    ), "") + r
}, createCounterStyleWithSymbolResolver = function(e, t, i, n) {
    for (var o = ""; i || e--,
    o = n(e) + o,
    t <= (e /= t) * t; )
        ;
    return o
}, createCounterStyleFromRange = function(e, t, i, n, o) {
    var r = i - t + 1;
    return (e < 0 ? "-" : "") + (createCounterStyleWithSymbolResolver(Math.abs(e), r, n, (function(e) {
        return fromCodePoint$1(Math.floor(e % r) + t)
    }
    )) + o)
}, createCounterStyleFromSymbols = function(e, t, i) {
    void 0 === i && (i = ". ");
    var n = t.length;
    return createCounterStyleWithSymbolResolver(Math.abs(e), n, !1, (function(e) {
        return t[Math.floor(e % n)]
    }
    )) + i
}, CJK_ZEROS = 1, CJK_TEN_COEFFICIENTS = 2, CJK_TEN_HIGH_COEFFICIENTS = 4, CJK_HUNDRED_COEFFICIENTS = 8, createCJKCounter = function(e, t, i, n, o, r) {
    if (e < -9999 || 9999 < e)
        return createCounterText(e, 4, 0 < o.length);
    var s = Math.abs(e)
      , a = o;
    if (0 === s)
        return t[0] + a;
    for (var l = 0; 0 < s && l <= 4; l++) {
        var c = s % 10;
        0 == c && contains(r, CJK_ZEROS) && "" !== a ? a = t[c] + a : 1 < c || 1 == c && 0 === l || 1 == c && 1 === l && contains(r, CJK_TEN_COEFFICIENTS) || 1 == c && 1 === l && contains(r, CJK_TEN_HIGH_COEFFICIENTS) && 100 < e || 1 == c && 1 < l && contains(r, CJK_HUNDRED_COEFFICIENTS) ? a = t[c] + (0 < l ? i[l - 1] : "") + a : 1 == c && 0 < l && (a = i[l - 1] + a),
        s = Math.floor(s / 10)
    }
    return (e < 0 ? n : "") + a
}, CHINESE_INFORMAL_MULTIPLIERS = "十百千萬", CHINESE_FORMAL_MULTIPLIERS = "拾佰仟萬", JAPANESE_NEGATIVE = "マイナス", KOREAN_NEGATIVE = "마이너스", createCounterText = function(e, t, i) {
    var n = i ? ". " : ""
      , o = i ? "、" : ""
      , r = i ? ", " : ""
      , s = i ? " " : "";
    switch (t) {
    case 0:
        return "•" + s;
    case 1:
        return "◦" + s;
    case 2:
        return "◾" + s;
    case 5:
        var a = createCounterStyleFromRange(e, 48, 57, !0, n);
        return a.length < 4 ? "0" + a : a;
    case 4:
        return createCounterStyleFromSymbols(e, "〇一二三四五六七八九", o);
    case 6:
        return createAdditiveCounter(e, 1, 3999, ROMAN_UPPER, 3, n).toLowerCase();
    case 7:
        return createAdditiveCounter(e, 1, 3999, ROMAN_UPPER, 3, n);
    case 8:
        return createCounterStyleFromRange(e, 945, 969, !1, n);
    case 9:
        return createCounterStyleFromRange(e, 97, 122, !1, n);
    case 10:
        return createCounterStyleFromRange(e, 65, 90, !1, n);
    case 11:
        return createCounterStyleFromRange(e, 1632, 1641, !0, n);
    case 12:
    case 49:
        return createAdditiveCounter(e, 1, 9999, ARMENIAN, 3, n);
    case 35:
        return createAdditiveCounter(e, 1, 9999, ARMENIAN, 3, n).toLowerCase();
    case 13:
        return createCounterStyleFromRange(e, 2534, 2543, !0, n);
    case 14:
    case 30:
        return createCounterStyleFromRange(e, 6112, 6121, !0, n);
    case 15:
        return createCounterStyleFromSymbols(e, "子丑寅卯辰巳午未申酉戌亥", o);
    case 16:
        return createCounterStyleFromSymbols(e, "甲乙丙丁戊己庚辛壬癸", o);
    case 17:
    case 48:
        return createCJKCounter(e, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "負", o, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 47:
        return createCJKCounter(e, "零壹貳參肆伍陸柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "負", o, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 42:
        return createCJKCounter(e, "零一二三四五六七八九", CHINESE_INFORMAL_MULTIPLIERS, "负", o, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 41:
        return createCJKCounter(e, "零壹贰叁肆伍陆柒捌玖", CHINESE_FORMAL_MULTIPLIERS, "负", o, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
    case 26:
        return createCJKCounter(e, "〇一二三四五六七八九", "十百千万", JAPANESE_NEGATIVE, o, 0);
    case 25:
        return createCJKCounter(e, "零壱弐参四伍六七八九", "拾百千万", JAPANESE_NEGATIVE, o, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
    case 31:
        return createCJKCounter(e, "영일이삼사오육칠팔구", "십백천만", KOREAN_NEGATIVE, r, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
    case 33:
        return createCJKCounter(e, "零一二三四五六七八九", "十百千萬", KOREAN_NEGATIVE, r, 0);
    case 32:
        return createCJKCounter(e, "零壹貳參四五六七八九", "拾百千", KOREAN_NEGATIVE, r, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
    case 18:
        return createCounterStyleFromRange(e, 2406, 2415, !0, n);
    case 20:
        return createAdditiveCounter(e, 1, 19999, GEORGIAN, 3, n);
    case 21:
        return createCounterStyleFromRange(e, 2790, 2799, !0, n);
    case 22:
        return createCounterStyleFromRange(e, 2662, 2671, !0, n);
    case 22:
        return createAdditiveCounter(e, 1, 10999, HEBREW, 3, n);
    case 23:
        return createCounterStyleFromSymbols(e, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
    case 24:
        return createCounterStyleFromSymbols(e, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
    case 27:
        return createCounterStyleFromRange(e, 3302, 3311, !0, n);
    case 28:
        return createCounterStyleFromSymbols(e, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", o);
    case 29:
        return createCounterStyleFromSymbols(e, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", o);
    case 34:
        return createCounterStyleFromRange(e, 3792, 3801, !0, n);
    case 37:
        return createCounterStyleFromRange(e, 6160, 6169, !0, n);
    case 38:
        return createCounterStyleFromRange(e, 4160, 4169, !0, n);
    case 39:
        return createCounterStyleFromRange(e, 2918, 2927, !0, n);
    case 40:
        return createCounterStyleFromRange(e, 1776, 1785, !0, n);
    case 43:
        return createCounterStyleFromRange(e, 3046, 3055, !0, n);
    case 44:
        return createCounterStyleFromRange(e, 3174, 3183, !0, n);
    case 45:
        return createCounterStyleFromRange(e, 3664, 3673, !0, n);
    case 46:
        return createCounterStyleFromRange(e, 3872, 3881, !0, n);
    default:
        return createCounterStyleFromRange(e, 48, 57, !0, n)
    }
}, IGNORE_ATTRIBUTE = "data-html2canvas-ignore", DocumentCloner = function() {
    function e(e, t, i) {
        if (this.context = e,
        this.options = i,
        this.scrolledElements = [],
        this.referenceElement = t,
        this.counters = new CounterState,
        this.quoteDepth = 0,
        !t.ownerDocument)
            throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(t.ownerDocument.documentElement, !1)
    }
    return e.prototype.toIFrame = function(e, t) {
        var i, n, o, r, s = this, a = createIFrameContainer(e, t);
        return a.contentWindow ? (i = e.defaultView.pageXOffset,
        e = e.defaultView.pageYOffset,
        n = a.contentWindow,
        o = n.document,
        r = iframeLoader(a).then((function() {
            return __awaiter(s, void 0, void 0, (function() {
                var e, i;
                return __generator(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return this.scrolledElements.forEach(restoreNodeScroll),
                        n && (n.scrollTo(t.left, t.top),
                        !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || n.scrollY === t.top && n.scrollX === t.left || (this.context.logger.warn("Unable to restore scroll position for cloned document"),
                        this.context.windowBounds = this.context.windowBounds.add(n.scrollX - t.left, n.scrollY - t.top, 0, 0))),
                        e = this.options.onclone,
                        void 0 === (i = this.clonedReferenceElement) ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : o.fonts && o.fonts.ready ? [4, o.fonts.ready] : [3, 2];
                    case 1:
                        r.sent(),
                        r.label = 2;
                    case 2:
                        return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, imagesReady(o)] : [3, 4];
                    case 3:
                        r.sent(),
                        r.label = 4;
                    case 4:
                        return "function" == typeof e ? [2, Promise.resolve().then((function() {
                            return e(o, i)
                        }
                        )).then((function() {
                            return a
                        }
                        ))] : [2, a]
                    }
                }
                ))
            }
            ))
        }
        )),
        o.open(),
        o.write(serializeDoctype(document.doctype) + "<html></html>"),
        restoreOwnerScroll(this.referenceElement.ownerDocument, i, e),
        o.replaceChild(o.adoptNode(this.documentElement), o.documentElement),
        o.close(),
        r) : Promise.reject("Unable to find iframe window")
    }
    ,
    e.prototype.createElementClone = function(e) {
        var t;
        return isDebugging(e, 2),
        isCanvasElement(e) ? this.createCanvasClone(e) : isVideoElement(e) ? this.createVideoClone(e) : isStyleElement(e) ? this.createStyleClone(e) : (t = e.cloneNode(!1),
        isImageElement(t) && (isImageElement(e) && e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc,
        t.srcset = ""),
        "lazy" === t.loading) && (t.loading = "eager"),
        isCustomElement(t) ? this.createCustomElementClone(t) : t)
    }
    ,
    e.prototype.createCustomElementClone = function(e) {
        var t = document.createElement("html2canvascustomelement");
        return copyCSSStyles(e.style, t),
        t
    }
    ,
    e.prototype.createStyleClone = function(e) {
        try {
            var t, i, n = e.sheet;
            if (n && n.cssRules)
                return t = [].slice.call(n.cssRules, 0).reduce((function(e, t) {
                    return t && "string" == typeof t.cssText ? e + t.cssText : e
                }
                ), ""),
                (i = e.cloneNode(!1)).textContent = t,
                i
        } catch (e) {
            if (this.context.logger.error("Unable to access cssRules property", e),
            "SecurityError" !== e.name)
                throw e
        }
        return e.cloneNode(!1)
    }
    ,
    e.prototype.createCanvasClone = function(e) {
        var t;
        if (this.options.inlineImages && e.ownerDocument) {
            var i = e.ownerDocument.createElement("img");
            try {
                return i.src = e.toDataURL(),
                i
            } catch (t) {
                this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e)
            }
        }
        i = e.cloneNode(!1);
        try {
            i.width = e.width,
            i.height = e.height;
            var n, o, r = e.getContext("2d"), s = i.getContext("2d");
            s && (!this.options.allowTaint && r ? s.putImageData(r.getImageData(0, 0, e.width, e.height), 0, 0) : ((n = null != (t = e.getContext("webgl2")) ? t : e.getContext("webgl")) && !1 === (null == (o = n.getContextAttributes()) ? void 0 : o.preserveDrawingBuffer) && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e),
            s.drawImage(e, 0, 0)))
        } catch (t) {
            this.context.logger.info("Unable to clone canvas as it is tainted", e)
        }
        return i
    }
    ,
    e.prototype.createVideoClone = function(e) {
        var t = e.ownerDocument.createElement("canvas")
          , i = (t.width = e.offsetWidth,
        t.height = e.offsetHeight,
        t.getContext("2d"));
        try {
            return i && (i.drawImage(e, 0, 0, t.width, t.height),
            this.options.allowTaint || i.getImageData(0, 0, t.width, t.height)),
            t
        } catch (t) {
            this.context.logger.info("Unable to clone video as it is tainted", e)
        }
        return (i = e.ownerDocument.createElement("canvas")).width = e.offsetWidth,
        i.height = e.offsetHeight,
        i
    }
    ,
    e.prototype.appendChildNode = function(e, t, i) {
        isElementNode(t) && (isScriptElement(t) || t.hasAttribute(IGNORE_ATTRIBUTE) || "function" == typeof this.options.ignoreElements && this.options.ignoreElements(t)) || this.options.copyStyles && isElementNode(t) && isStyleElement(t) || e.appendChild(this.cloneNode(t, i))
    }
    ,
    e.prototype.cloneChildNodes = function(e, t, i) {
        for (var n, o = this, r = (e.shadowRoot || e).firstChild; r; r = r.nextSibling)
            isElementNode(r) && isSlotElement(r) && "function" == typeof r.assignedNodes ? (n = r.assignedNodes()).length && n.forEach((function(e) {
                return o.appendChildNode(t, e, i)
            }
            )) : this.appendChildNode(t, r, i)
    }
    ,
    e.prototype.cloneNode = function(e, t) {
        var i, n, o, r, s;
        return isTextNode(e) ? document.createTextNode(e.data) : e.ownerDocument && (o = e.ownerDocument.defaultView) && isElementNode(e) && (isHTMLElementNode(e) || isSVGElementNode(e)) ? ((i = this.createElementClone(e)).style.transitionProperty = "none",
        n = o.getComputedStyle(e),
        s = o.getComputedStyle(e, ":before"),
        o = o.getComputedStyle(e, ":after"),
        this.referenceElement === e && isHTMLElementNode(i) && (this.clonedReferenceElement = i),
        isBodyElement(i) && createPseudoHideStyles(i),
        r = this.counters.parse(new CSSParsedCounterDeclaration(this.context,n)),
        s = this.resolvePseudoContent(e, i, s, PseudoElementType.BEFORE),
        isCustomElement(e) && (t = !0),
        isVideoElement(e) || this.cloneChildNodes(e, i, t),
        s && i.insertBefore(s, i.firstChild),
        (s = this.resolvePseudoContent(e, i, o, PseudoElementType.AFTER)) && i.appendChild(s),
        this.counters.pop(r),
        (n && (this.options.copyStyles || isSVGElementNode(e)) && !isIFrameElement(e) || t) && copyCSSStyles(n, i),
        0 === e.scrollTop && 0 === e.scrollLeft || this.scrolledElements.push([i, e.scrollLeft, e.scrollTop]),
        (isTextareaElement(e) || isSelectElement(e)) && (isTextareaElement(i) || isSelectElement(i)) && (i.value = e.value),
        i) : e.cloneNode(!1)
    }
    ,
    e.prototype.resolvePseudoContent = function(e, t, i, n) {
        var o = this;
        if (i) {
            var r, s, a = i.content, l = t.ownerDocument;
            if (l && a && "none" !== a && "-moz-alt-content" !== a && "none" !== i.display)
                return this.counters.parse(new CSSParsedCounterDeclaration(this.context,i)),
                r = new CSSParsedPseudoDeclaration(this.context,i),
                s = l.createElement("html2canvaspseudoelement"),
                copyCSSStyles(i, s),
                r.content.forEach((function(t) {
                    if (0 === t.type)
                        s.appendChild(l.createTextNode(t.value));
                    else if (22 === t.type) {
                        var i = l.createElement("img");
                        i.src = t.value,
                        i.style.opacity = "1",
                        s.appendChild(i)
                    } else if (18 === t.type) {
                        var n, a, c, h;
                        "attr" === t.name ? (i = t.values.filter(isIdentToken)).length && s.appendChild(l.createTextNode(e.getAttribute(i[0].value) || "")) : "counter" === t.name ? (c = (i = t.values.filter(nonFunctionArgSeparator))[0],
                        h = i[1],
                        c && isIdentToken(c) && (i = o.counters.getCounterValue(c.value),
                        n = h && isIdentToken(h) ? listStyleType.parse(o.context, h.value) : 3,
                        s.appendChild(l.createTextNode(createCounterText(i, n, !1))))) : "counters" === t.name && (c = (i = t.values.filter(nonFunctionArgSeparator))[0],
                        n = i[1],
                        h = i[2],
                        c) && isIdentToken(c) && (i = o.counters.getCounterValues(c.value),
                        a = h && isIdentToken(h) ? listStyleType.parse(o.context, h.value) : 3,
                        c = n && 0 === n.type ? n.value : "",
                        h = i.map((function(e) {
                            return createCounterText(e, a, !1)
                        }
                        )).join(c),
                        s.appendChild(l.createTextNode(h)))
                    } else if (20 === t.type)
                        switch (t.value) {
                        case "open-quote":
                            s.appendChild(l.createTextNode(getQuote(r.quotes, o.quoteDepth++, !0)));
                            break;
                        case "close-quote":
                            s.appendChild(l.createTextNode(getQuote(r.quotes, --o.quoteDepth, !1)));
                            break;
                        default:
                            s.appendChild(l.createTextNode(t.value))
                        }
                }
                )),
                s.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER,
                a = n === PseudoElementType.BEFORE ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER,
                isSVGElementNode(t) ? t.className.baseValue += a : t.className += a,
                s
        }
    }
    ,
    e.destroy = function(e) {
        return !!e.parentNode && (e.parentNode.removeChild(e),
        !0)
    }
    ,
    e
}(), PseudoElementType, createIFrameContainer = (function(e) {
    e[e.BEFORE = 0] = "BEFORE",
    e[e.AFTER = 1] = "AFTER"
}(PseudoElementType = PseudoElementType || {}),
function(e, t) {
    var i = e.createElement("iframe");
    return i.className = "html2canvas-container",
    i.style.visibility = "hidden",
    i.style.position = "fixed",
    i.style.left = "-10000px",
    i.style.top = "0px",
    i.style.border = "0",
    i.width = t.width.toString(),
    i.height = t.height.toString(),
    i.scrolling = "no",
    i.setAttribute(IGNORE_ATTRIBUTE, "true"),
    e.body.appendChild(i),
    i
}
), imageReady = function(e) {
    return new Promise((function(t) {
        !e.complete && e.src ? (e.onload = t,
        e.onerror = t) : t()
    }
    ))
}, imagesReady = function(e) {
    return Promise.all([].slice.call(e.images, 0).map(imageReady))
}, iframeLoader = function(e) {
    return new Promise((function(t, i) {
        var n = e.contentWindow;
        if (!n)
            return i("No window assigned for iframe");
        var o = n.document;
        n.onload = e.onload = function() {
            n.onload = e.onload = null;
            var i = setInterval((function() {
                0 < o.body.childNodes.length && "complete" === o.readyState && (clearInterval(i),
                t(e))
            }
            ), 50)
        }
    }
    ))
}, ignoredStyleProperties = ["all", "d", "content"], copyCSSStyles = function(e, t) {
    for (var i = e.length - 1; 0 <= i; i--) {
        var n = e.item(i);
        -1 === ignoredStyleProperties.indexOf(n) && t.style.setProperty(n, e.getPropertyValue(n))
    }
    return t
}, serializeDoctype = function(e) {
    var t = "";
    return e && (t += "<!DOCTYPE ",
    e.name && (t += e.name),
    e.internalSubset && (t += e.internalSubset),
    e.publicId && (t += '"' + e.publicId + '"'),
    e.systemId && (t += '"' + e.systemId + '"'),
    t += ">"),
    t
}, restoreOwnerScroll = function(e, t, i) {
    e && e.defaultView && (t !== e.defaultView.pageXOffset || i !== e.defaultView.pageYOffset) && e.defaultView.scrollTo(t, i)
}, restoreNodeScroll = function(e) {
    var t = e[0]
      , i = e[1];
    e = e[2];
    t.scrollLeft = i,
    t.scrollTop = e
}, PSEUDO_BEFORE = ":before", PSEUDO_AFTER = ":after", PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}', createPseudoHideStyles = function(e) {
    createStyles(e, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE)
}, createStyles = function(e, t) {
    var i = e.ownerDocument;
    i && ((i = i.createElement("style")).textContent = t,
    e.appendChild(i))
}, CacheStorage = function() {
    function e() {}
    return e.getOrigin = function(t) {
        var i = e._link;
        return i ? (i.href = t,
        i.href = i.href,
        i.protocol + i.hostname + i.port) : "about:blank"
    }
    ,
    e.isSameOrigin = function(t) {
        return e.getOrigin(t) === e._origin
    }
    ,
    e.setContext = function(t) {
        e._link = t.document.createElement("a"),
        e._origin = e.getOrigin(t.location.href)
    }
    ,
    e._origin = "about:blank",
    e
}(), Cache = function() {
    function e(e, t) {
        this.context = e,
        this._options = t,
        this._cache = {}
    }
    return e.prototype.addImage = function(e) {
        var t = Promise.resolve();
        return this.has(e) || (isBlobImage(e) || isRenderable(e)) && (this._cache[e] = this.loadImage(e)).catch((function() {}
        )),
        t
    }
    ,
    e.prototype.match = function(e) {
        return this._cache[e]
    }
    ,
    e.prototype.loadImage = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var t, i, n, o, r = this;
            return __generator(this, (function(s) {
                switch (s.label) {
                case 0:
                    return t = CacheStorage.isSameOrigin(e),
                    i = !isInlineImage(e) && !0 === this._options.useCORS && FEATURES.SUPPORT_CORS_IMAGES && !t,
                    n = !isInlineImage(e) && !t && !isBlobImage(e) && "string" == typeof this._options.proxy && FEATURES.SUPPORT_CORS_XHR && !i,
                    t || !1 !== this._options.allowTaint || isInlineImage(e) || isBlobImage(e) || n || i ? (o = e,
                    n ? [4, this.proxy(o)] : [3, 2]) : [2];
                case 1:
                    o = s.sent(),
                    s.label = 2;
                case 2:
                    return this.context.logger.debug("Added image " + e.substring(0, 256)),
                    [4, new Promise((function(e, t) {
                        var n = new Image;
                        n.onload = function() {
                            return e(n)
                        }
                        ,
                        n.onerror = t,
                        (isInlineBase64Image(o) || i) && (n.crossOrigin = "anonymous"),
                        n.src = o,
                        !0 === n.complete && setTimeout((function() {
                            return e(n)
                        }
                        ), 500),
                        0 < r._options.imageTimeout && setTimeout((function() {
                            return t("Timed out (" + r._options.imageTimeout + "ms) loading image")
                        }
                        ), r._options.imageTimeout)
                    }
                    ))];
                case 3:
                    return [2, s.sent()]
                }
            }
            ))
        }
        ))
    }
    ,
    e.prototype.has = function(e) {
        return void 0 !== this._cache[e]
    }
    ,
    e.prototype.keys = function() {
        return Promise.resolve(Object.keys(this._cache))
    }
    ,
    e.prototype.proxy = function(e) {
        var t, i = this, n = this._options.proxy;
        if (n)
            return t = e.substring(0, 256),
            new Promise((function(o, r) {
                var s, a = FEATURES.SUPPORT_RESPONSE_TYPE ? "blob" : "text", l = new XMLHttpRequest, c = (l.onload = function() {
                    var e;
                    200 === l.status ? "text" == a ? o(l.response) : ((e = new FileReader).addEventListener("load", (function() {
                        return o(e.result)
                    }
                    ), !1),
                    e.addEventListener("error", (function(e) {
                        return r(e)
                    }
                    ), !1),
                    e.readAsDataURL(l.response)) : r("Failed to proxy resource " + t + " with status code " + l.status)
                }
                ,
                l.onerror = r,
                -1 < n.indexOf("?") ? "&" : "?");
                l.open("GET", n + c + "url=" + encodeURIComponent(e) + "&responseType=" + a),
                "text" != a && l instanceof XMLHttpRequest && (l.responseType = a),
                i._options.imageTimeout && (s = i._options.imageTimeout,
                l.timeout = s,
                l.ontimeout = function() {
                    return r("Timed out (" + s + "ms) proxying " + t)
                }
                ),
                l.send()
            }
            ));
        throw new Error("No proxy defined")
    }
    ,
    e
}(), INLINE_SVG = /^data:image\/svg\+xml/i, INLINE_BASE64 = /^data:image\/.*;base64,/i, INLINE_IMG = /^data:image\/.*/i, isRenderable = function(e) {
    return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(e)
}, isInlineImage = function(e) {
    return INLINE_IMG.test(e)
}, isInlineBase64Image = function(e) {
    return INLINE_BASE64.test(e)
}, isBlobImage = function(e) {
    return "blob" === e.substr(0, 4)
}, isSVG = function(e) {
    return "svg" === e.substr(-3).toLowerCase() || INLINE_SVG.test(e)
}, Vector = function() {
    function e(e, t) {
        this.type = 0,
        this.x = e,
        this.y = t
    }
    return e.prototype.add = function(t, i) {
        return new e(this.x + t,this.y + i)
    }
    ,
    e
}(), lerp = function(e, t, i) {
    return new Vector(e.x + (t.x - e.x) * i,e.y + (t.y - e.y) * i)
}, BezierCurve = function() {
    function e(e, t, i, n) {
        this.type = 1,
        this.start = e,
        this.startControl = t,
        this.endControl = i,
        this.end = n
    }
    return e.prototype.subdivide = function(t, i) {
        var n = lerp(this.start, this.startControl, t)
          , o = lerp(this.startControl, this.endControl, t)
          , r = lerp(this.endControl, this.end, t)
          , s = lerp(n, o, t);
        o = lerp(o, r, t),
        t = lerp(s, o, t);
        return i ? new e(this.start,n,s,t) : new e(t,o,r,this.end)
    }
    ,
    e.prototype.add = function(t, i) {
        return new e(this.start.add(t, i),this.startControl.add(t, i),this.endControl.add(t, i),this.end.add(t, i))
    }
    ,
    e.prototype.reverse = function() {
        return new e(this.end,this.endControl,this.startControl,this.start)
    }
    ,
    e
}(), isBezierCurve = function(e) {
    return 1 === e.type
}, BoundCurves = function(e) {
    var t = e.styles
      , i = e.bounds
      , n = (o = getAbsoluteValueForTuple(t.borderTopLeftRadius, i.width, i.height))[0]
      , o = o[1]
      , r = (s = getAbsoluteValueForTuple(t.borderTopRightRadius, i.width, i.height))[0]
      , s = s[1]
      , a = (l = getAbsoluteValueForTuple(t.borderBottomRightRadius, i.width, i.height))[0]
      , l = l[1]
      , c = (h = getAbsoluteValueForTuple(t.borderBottomLeftRadius, i.width, i.height))[0]
      , h = h[1];
    (u = []).push((n + r) / i.width),
    u.push((c + a) / i.width),
    u.push((o + h) / i.height),
    u.push((s + l) / i.height),
    1 < (u = Math.max.apply(Math, u)) && (n /= u,
    o /= u,
    r /= u,
    s /= u,
    a /= u,
    l /= u,
    c /= u,
    h /= u);
    var u = i.width - r
      , d = i.height - l
      , p = i.width - a
      , g = i.height - h
      , f = t.borderTopWidth
      , A = t.borderRightWidth
      , m = t.borderBottomWidth
      , v = t.borderLeftWidth
      , _ = getAbsoluteValue(t.paddingTop, e.bounds.width)
      , b = getAbsoluteValue(t.paddingRight, e.bounds.width)
      , y = getAbsoluteValue(t.paddingBottom, e.bounds.width);
    t = getAbsoluteValue(t.paddingLeft, e.bounds.width);
    this.topLeftBorderDoubleOuterBox = 0 < n || 0 < o ? getCurvePoints(i.left + v / 3, i.top + f / 3, n - v / 3, o - f / 3, CORNER.TOP_LEFT) : new Vector(i.left + v / 3,i.top + f / 3),
    this.topRightBorderDoubleOuterBox = 0 < n || 0 < o ? getCurvePoints(i.left + u, i.top + f / 3, r - A / 3, s - f / 3, CORNER.TOP_RIGHT) : new Vector(i.left + i.width - A / 3,i.top + f / 3),
    this.bottomRightBorderDoubleOuterBox = 0 < a || 0 < l ? getCurvePoints(i.left + p, i.top + d, a - A / 3, l - m / 3, CORNER.BOTTOM_RIGHT) : new Vector(i.left + i.width - A / 3,i.top + i.height - m / 3),
    this.bottomLeftBorderDoubleOuterBox = 0 < c || 0 < h ? getCurvePoints(i.left + v / 3, i.top + g, c - v / 3, h - m / 3, CORNER.BOTTOM_LEFT) : new Vector(i.left + v / 3,i.top + i.height - m / 3),
    this.topLeftBorderDoubleInnerBox = 0 < n || 0 < o ? getCurvePoints(i.left + 2 * v / 3, i.top + 2 * f / 3, n - 2 * v / 3, o - 2 * f / 3, CORNER.TOP_LEFT) : new Vector(i.left + 2 * v / 3,i.top + 2 * f / 3),
    this.topRightBorderDoubleInnerBox = 0 < n || 0 < o ? getCurvePoints(i.left + u, i.top + 2 * f / 3, r - 2 * A / 3, s - 2 * f / 3, CORNER.TOP_RIGHT) : new Vector(i.left + i.width - 2 * A / 3,i.top + 2 * f / 3),
    this.bottomRightBorderDoubleInnerBox = 0 < a || 0 < l ? getCurvePoints(i.left + p, i.top + d, a - 2 * A / 3, l - 2 * m / 3, CORNER.BOTTOM_RIGHT) : new Vector(i.left + i.width - 2 * A / 3,i.top + i.height - 2 * m / 3),
    this.bottomLeftBorderDoubleInnerBox = 0 < c || 0 < h ? getCurvePoints(i.left + 2 * v / 3, i.top + g, c - 2 * v / 3, h - 2 * m / 3, CORNER.BOTTOM_LEFT) : new Vector(i.left + 2 * v / 3,i.top + i.height - 2 * m / 3),
    this.topLeftBorderStroke = 0 < n || 0 < o ? getCurvePoints(i.left + v / 2, i.top + f / 2, n - v / 2, o - f / 2, CORNER.TOP_LEFT) : new Vector(i.left + v / 2,i.top + f / 2),
    this.topRightBorderStroke = 0 < n || 0 < o ? getCurvePoints(i.left + u, i.top + f / 2, r - A / 2, s - f / 2, CORNER.TOP_RIGHT) : new Vector(i.left + i.width - A / 2,i.top + f / 2),
    this.bottomRightBorderStroke = 0 < a || 0 < l ? getCurvePoints(i.left + p, i.top + d, a - A / 2, l - m / 2, CORNER.BOTTOM_RIGHT) : new Vector(i.left + i.width - A / 2,i.top + i.height - m / 2),
    this.bottomLeftBorderStroke = 0 < c || 0 < h ? getCurvePoints(i.left + v / 2, i.top + g, c - v / 2, h - m / 2, CORNER.BOTTOM_LEFT) : new Vector(i.left + v / 2,i.top + i.height - m / 2),
    this.topLeftBorderBox = 0 < n || 0 < o ? getCurvePoints(i.left, i.top, n, o, CORNER.TOP_LEFT) : new Vector(i.left,i.top),
    this.topRightBorderBox = 0 < r || 0 < s ? getCurvePoints(i.left + u, i.top, r, s, CORNER.TOP_RIGHT) : new Vector(i.left + i.width,i.top),
    this.bottomRightBorderBox = 0 < a || 0 < l ? getCurvePoints(i.left + p, i.top + d, a, l, CORNER.BOTTOM_RIGHT) : new Vector(i.left + i.width,i.top + i.height),
    this.bottomLeftBorderBox = 0 < c || 0 < h ? getCurvePoints(i.left, i.top + g, c, h, CORNER.BOTTOM_LEFT) : new Vector(i.left,i.top + i.height),
    this.topLeftPaddingBox = 0 < n || 0 < o ? getCurvePoints(i.left + v, i.top + f, Math.max(0, n - v), Math.max(0, o - f), CORNER.TOP_LEFT) : new Vector(i.left + v,i.top + f),
    this.topRightPaddingBox = 0 < r || 0 < s ? getCurvePoints(i.left + Math.min(u, i.width - A), i.top + f, u > i.width + A ? 0 : Math.max(0, r - A), Math.max(0, s - f), CORNER.TOP_RIGHT) : new Vector(i.left + i.width - A,i.top + f),
    this.bottomRightPaddingBox = 0 < a || 0 < l ? getCurvePoints(i.left + Math.min(p, i.width - v), i.top + Math.min(d, i.height - m), Math.max(0, a - A), Math.max(0, l - m), CORNER.BOTTOM_RIGHT) : new Vector(i.left + i.width - A,i.top + i.height - m),
    this.bottomLeftPaddingBox = 0 < c || 0 < h ? getCurvePoints(i.left + v, i.top + Math.min(g, i.height - m), Math.max(0, c - v), Math.max(0, h - m), CORNER.BOTTOM_LEFT) : new Vector(i.left + v,i.top + i.height - m),
    this.topLeftContentBox = 0 < n || 0 < o ? getCurvePoints(i.left + v + t, i.top + f + _, Math.max(0, n - (v + t)), Math.max(0, o - (f + _)), CORNER.TOP_LEFT) : new Vector(i.left + v + t,i.top + f + _),
    this.topRightContentBox = 0 < r || 0 < s ? getCurvePoints(i.left + Math.min(u, i.width + v + t), i.top + f + _, u > i.width + v + t ? 0 : r - v + t, s - (f + _), CORNER.TOP_RIGHT) : new Vector(i.left + i.width - (A + b),i.top + f + _),
    this.bottomRightContentBox = 0 < a || 0 < l ? getCurvePoints(i.left + Math.min(p, i.width - (v + t)), i.top + Math.min(d, i.height + f + _), Math.max(0, a - (A + b)), l - (m + y), CORNER.BOTTOM_RIGHT) : new Vector(i.left + i.width - (A + b),i.top + i.height - (m + y)),
    this.bottomLeftContentBox = 0 < c || 0 < h ? getCurvePoints(i.left + v + t, i.top + g, Math.max(0, c - (v + t)), h - (m + y), CORNER.BOTTOM_LEFT) : new Vector(i.left + v + t,i.top + i.height - (m + y))
}, CORNER, getCurvePoints = (function(e) {
    e[e.TOP_LEFT = 0] = "TOP_LEFT",
    e[e.TOP_RIGHT = 1] = "TOP_RIGHT",
    e[e.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT",
    e[e.BOTTOM_LEFT = 3] = "BOTTOM_LEFT"
}(CORNER = CORNER || {}),
function(e, t, i, n, o) {
    var r = (Math.sqrt(2) - 1) / 3 * 4
      , s = i * r
      , a = n * r
      , l = e + i
      , c = t + n;
    switch (o) {
    case CORNER.TOP_LEFT:
        return new BezierCurve(new Vector(e,c),new Vector(e,c - a),new Vector(l - s,t),new Vector(l,t));
    case CORNER.TOP_RIGHT:
        return new BezierCurve(new Vector(e,t),new Vector(e + s,t),new Vector(l,c - a),new Vector(l,c));
    case CORNER.BOTTOM_RIGHT:
        return new BezierCurve(new Vector(l,t),new Vector(l,t + a),new Vector(e + s,c),new Vector(e,c));
    default:
        return CORNER.BOTTOM_LEFT,
        new BezierCurve(new Vector(l,c),new Vector(l - s,c),new Vector(e,t + a),new Vector(e,t))
    }
}
), calculateBorderBoxPath = function(e) {
    return [e.topLeftBorderBox, e.topRightBorderBox, e.bottomRightBorderBox, e.bottomLeftBorderBox]
}, calculateContentBoxPath = function(e) {
    return [e.topLeftContentBox, e.topRightContentBox, e.bottomRightContentBox, e.bottomLeftContentBox]
}, calculatePaddingBoxPath = function(e) {
    return [e.topLeftPaddingBox, e.topRightPaddingBox, e.bottomRightPaddingBox, e.bottomLeftPaddingBox]
}, TransformEffect = function(e, t, i) {
    this.offsetX = e,
    this.offsetY = t,
    this.matrix = i,
    this.type = 0,
    this.target = 6
}, ClipEffect = function(e, t) {
    this.path = e,
    this.target = t,
    this.type = 1
}, OpacityEffect = function(e) {
    this.opacity = e,
    this.type = 2,
    this.target = 6
}, isTransformEffect = function(e) {
    return 0 === e.type
}, isClipEffect = function(e) {
    return 1 === e.type
}, isOpacityEffect = function(e) {
    return 2 === e.type
}, equalPath = function(e, t) {
    return e.length === t.length && e.some((function(e, i) {
        return e === t[i]
    }
    ))
}, transformPath = function(e, t, i, n, o) {
    return e.map((function(e, r) {
        switch (r) {
        case 0:
            return e.add(t, i);
        case 1:
            return e.add(t + n, i);
        case 2:
            return e.add(t + n, i + o);
        case 3:
            return e.add(t, i + o)
        }
        return e
    }
    ))
}, StackingContext = function(e) {
    this.element = e,
    this.inlineLevel = [],
    this.nonInlineLevel = [],
    this.negativeZIndex = [],
    this.zeroOrAutoZIndexOrTransformedOrOpacity = [],
    this.positiveZIndex = [],
    this.nonPositionedFloats = [],
    this.nonPositionedInlineLevel = []
}, ElementPaint = function() {
    function e(e, t) {
        var i;
        this.container = e,
        this.parent = t,
        this.effects = [],
        this.curves = new BoundCurves(this.container),
        this.container.styles.opacity < 1 && this.effects.push(new OpacityEffect(this.container.styles.opacity)),
        null !== this.container.styles.transform && (e = this.container.bounds.left + this.container.styles.transformOrigin[0].number,
        t = this.container.bounds.top + this.container.styles.transformOrigin[1].number,
        i = this.container.styles.transform,
        this.effects.push(new TransformEffect(e,t,i))),
        0 !== this.container.styles.overflowX && (e = calculateBorderBoxPath(this.curves),
        t = calculatePaddingBoxPath(this.curves),
        equalPath(e, t) ? this.effects.push(new ClipEffect(e,6)) : (this.effects.push(new ClipEffect(e,2)),
        this.effects.push(new ClipEffect(t,4))))
    }
    return e.prototype.getEffects = function(e) {
        for (var t = -1 === [2, 3].indexOf(this.container.styles.position), i = this.parent, n = this.effects.slice(0); i; ) {
            var o, r, s = i.effects.filter((function(e) {
                return !isClipEffect(e)
            }
            ));
            t || 0 !== i.container.styles.position || !i.parent ? (n.unshift.apply(n, s),
            t = -1 === [2, 3].indexOf(i.container.styles.position),
            0 !== i.container.styles.overflowX && (o = calculateBorderBoxPath(i.curves),
            r = calculatePaddingBoxPath(i.curves),
            equalPath(o, r) || n.unshift(new ClipEffect(r,6)))) : n.unshift.apply(n, s),
            i = i.parent
        }
        return n.filter((function(t) {
            return contains(t.target, e)
        }
        ))
    }
    ,
    e
}(), parseStackTree = function(e, t, i, n) {
    e.container.elements.forEach((function(o) {
        var r, s, a, l, c = contains(o.flags, 4), h = contains(o.flags, 2), u = new ElementPaint(o,e), d = (contains(o.styles.display, 2048) && n.push(u),
        contains(o.flags, 8) ? [] : n);
        c || h ? (h = c || o.styles.isPositioned() ? i : t,
        r = new StackingContext(u),
        o.styles.isPositioned() || o.styles.opacity < 1 || o.styles.isTransformed() ? (s = o.styles.zIndex.order) < 0 ? (a = 0,
        h.negativeZIndex.some((function(e, t) {
            return s > e.element.container.styles.zIndex.order ? (a = t,
            !1) : 0 < a
        }
        )),
        h.negativeZIndex.splice(a, 0, r)) : 0 < s ? (l = 0,
        h.positiveZIndex.some((function(e, t) {
            return s >= e.element.container.styles.zIndex.order ? (l = t + 1,
            !1) : 0 < l
        }
        )),
        h.positiveZIndex.splice(l, 0, r)) : h.zeroOrAutoZIndexOrTransformedOrOpacity.push(r) : (o.styles.isFloating() ? h.nonPositionedFloats : h.nonPositionedInlineLevel).push(r),
        parseStackTree(u, r, c ? r : i, d)) : ((o.styles.isInlineLevel() ? t.inlineLevel : t.nonInlineLevel).push(u),
        parseStackTree(u, t, i, d)),
        contains(o.flags, 8) && processListItems(o, d)
    }
    ))
}, processListItems = function(e, t) {
    for (var i = e instanceof OLElementContainer ? e.start : 1, n = e instanceof OLElementContainer && e.reversed, o = 0; o < t.length; o++) {
        var r = t[o];
        r.container instanceof LIElementContainer && "number" == typeof r.container.value && 0 !== r.container.value && (i = r.container.value),
        r.listValue = createCounterText(i, r.container.styles.listStyleType, !0),
        i += n ? -1 : 1
    }
}, parseStackingContexts = function(e) {
    e = new ElementPaint(e,null);
    var t = new StackingContext(e)
      , i = [];
    return parseStackTree(e, t, t, i),
    processListItems(e.container, i),
    t
}, parsePathForBorder = function(e, t) {
    switch (t) {
    case 0:
        return createPathFromCurves(e.topLeftBorderBox, e.topLeftPaddingBox, e.topRightBorderBox, e.topRightPaddingBox);
    case 1:
        return createPathFromCurves(e.topRightBorderBox, e.topRightPaddingBox, e.bottomRightBorderBox, e.bottomRightPaddingBox);
    case 2:
        return createPathFromCurves(e.bottomRightBorderBox, e.bottomRightPaddingBox, e.bottomLeftBorderBox, e.bottomLeftPaddingBox);
    default:
        return createPathFromCurves(e.bottomLeftBorderBox, e.bottomLeftPaddingBox, e.topLeftBorderBox, e.topLeftPaddingBox)
    }
}, parsePathForBorderDoubleOuter = function(e, t) {
    switch (t) {
    case 0:
        return createPathFromCurves(e.topLeftBorderBox, e.topLeftBorderDoubleOuterBox, e.topRightBorderBox, e.topRightBorderDoubleOuterBox);
    case 1:
        return createPathFromCurves(e.topRightBorderBox, e.topRightBorderDoubleOuterBox, e.bottomRightBorderBox, e.bottomRightBorderDoubleOuterBox);
    case 2:
        return createPathFromCurves(e.bottomRightBorderBox, e.bottomRightBorderDoubleOuterBox, e.bottomLeftBorderBox, e.bottomLeftBorderDoubleOuterBox);
    default:
        return createPathFromCurves(e.bottomLeftBorderBox, e.bottomLeftBorderDoubleOuterBox, e.topLeftBorderBox, e.topLeftBorderDoubleOuterBox)
    }
}, parsePathForBorderDoubleInner = function(e, t) {
    switch (t) {
    case 0:
        return createPathFromCurves(e.topLeftBorderDoubleInnerBox, e.topLeftPaddingBox, e.topRightBorderDoubleInnerBox, e.topRightPaddingBox);
    case 1:
        return createPathFromCurves(e.topRightBorderDoubleInnerBox, e.topRightPaddingBox, e.bottomRightBorderDoubleInnerBox, e.bottomRightPaddingBox);
    case 2:
        return createPathFromCurves(e.bottomRightBorderDoubleInnerBox, e.bottomRightPaddingBox, e.bottomLeftBorderDoubleInnerBox, e.bottomLeftPaddingBox);
    default:
        return createPathFromCurves(e.bottomLeftBorderDoubleInnerBox, e.bottomLeftPaddingBox, e.topLeftBorderDoubleInnerBox, e.topLeftPaddingBox)
    }
}, parsePathForBorderStroke = function(e, t) {
    switch (t) {
    case 0:
        return createStrokePathFromCurves(e.topLeftBorderStroke, e.topRightBorderStroke);
    case 1:
        return createStrokePathFromCurves(e.topRightBorderStroke, e.bottomRightBorderStroke);
    case 2:
        return createStrokePathFromCurves(e.bottomRightBorderStroke, e.bottomLeftBorderStroke);
    default:
        return createStrokePathFromCurves(e.bottomLeftBorderStroke, e.topLeftBorderStroke)
    }
}, createStrokePathFromCurves = function(e, t) {
    var i = [];
    return isBezierCurve(e) ? i.push(e.subdivide(.5, !1)) : i.push(e),
    isBezierCurve(t) ? i.push(t.subdivide(.5, !0)) : i.push(t),
    i
}, createPathFromCurves = function(e, t, i, n) {
    var o = [];
    return isBezierCurve(e) ? o.push(e.subdivide(.5, !1)) : o.push(e),
    isBezierCurve(i) ? o.push(i.subdivide(.5, !0)) : o.push(i),
    isBezierCurve(n) ? o.push(n.subdivide(.5, !0).reverse()) : o.push(n),
    isBezierCurve(t) ? o.push(t.subdivide(.5, !1).reverse()) : o.push(t),
    o
}, paddingBox = function(e) {
    var t = e.bounds;
    e = e.styles;
    return t.add(e.borderLeftWidth, e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth), -(e.borderTopWidth + e.borderBottomWidth))
}, contentBox = function(e) {
    var t = e.styles
      , i = (e = e.bounds,
    getAbsoluteValue(t.paddingLeft, e.width))
      , n = getAbsoluteValue(t.paddingRight, e.width)
      , o = getAbsoluteValue(t.paddingTop, e.width)
      , r = getAbsoluteValue(t.paddingBottom, e.width);
    return e.add(i + t.borderLeftWidth, o + t.borderTopWidth, -(t.borderRightWidth + t.borderLeftWidth + i + n), -(t.borderTopWidth + t.borderBottomWidth + o + r))
}, calculateBackgroundPositioningArea = function(e, t) {
    return 0 === e ? t.bounds : (2 === e ? contentBox : paddingBox)(t)
}, calculateBackgroundPaintingArea = function(e, t) {
    return 0 === e ? t.bounds : (2 === e ? contentBox : paddingBox)(t)
}, calculateBackgroundRendering = function(e, t, i) {
    var n = calculateBackgroundPositioningArea(getBackgroundValueForIndex(e.styles.backgroundOrigin, t), e)
      , o = calculateBackgroundPaintingArea(getBackgroundValueForIndex(e.styles.backgroundClip, t), e)
      , r = (i = calculateBackgroundSize(getBackgroundValueForIndex(e.styles.backgroundSize, t), i, n))[0]
      , s = i[1]
      , a = getAbsoluteValueForTuple(getBackgroundValueForIndex(e.styles.backgroundPosition, t), n.width - r, n.height - s);
    return [calculateBackgroundRepeatPath(getBackgroundValueForIndex(e.styles.backgroundRepeat, t), a, i, n, o), Math.round(n.left + a[0]), Math.round(n.top + a[1]), r, s]
}, isAuto = function(e) {
    return isIdentToken(e) && e.value === BACKGROUND_SIZE.AUTO
}, hasIntrinsicValue = function(e) {
    return "number" == typeof e
}, calculateBackgroundSize = function(e, t, i) {
    var n = t[0]
      , o = t[1]
      , r = (t = t[2],
    e[0]);
    e = e[1];
    if (!r)
        return [0, 0];
    if (isLengthPercentage(r) && e && isLengthPercentage(e))
        return [getAbsoluteValue(r, i.width), getAbsoluteValue(e, i.height)];
    var s = hasIntrinsicValue(t);
    if (isIdentToken(r) && (r.value === BACKGROUND_SIZE.CONTAIN || r.value === BACKGROUND_SIZE.COVER))
        return hasIntrinsicValue(t) ? i.width / i.height < t != (r.value === BACKGROUND_SIZE.COVER) ? [i.width, i.width / t] : [i.height * t, i.height] : [i.width, i.height];
    var a = hasIntrinsicValue(n)
      , l = hasIntrinsicValue(o)
      , c = a || l;
    if (isAuto(r) && (!e || isAuto(e)))
        return a && l ? [n, o] : s || c ? c && s ? [a ? n : o * t, l ? o : n / t] : [a ? n : i.width, l ? o : i.height] : [i.width, i.height];
    if (s)
        return s = c = 0,
        isLengthPercentage(r) ? c = getAbsoluteValue(r, i.width) : isLengthPercentage(e) && (s = getAbsoluteValue(e, i.height)),
        isAuto(r) ? c = s * t : e && !isAuto(e) || (s = c / t),
        [c, s];
    if (t = null,
    c = null,
    isLengthPercentage(r) ? t = getAbsoluteValue(r, i.width) : e && isLengthPercentage(e) && (c = getAbsoluteValue(e, i.height)),
    null !== (t = null !== (c = null === t || e && !isAuto(e) ? c : a && l ? t / n * o : i.height) && isAuto(r) ? a && l ? c / o * n : i.width : t) && null !== c)
        return [t, c];
    throw new Error("Unable to calculate background-size for element")
}, getBackgroundValueForIndex = function(e, t) {
    return void 0 === (t = e[t]) ? e[0] : t
}, calculateBackgroundRepeatPath = function(e, t, i, n, o) {
    var r = t[0]
      , s = t[1]
      , a = i[0]
      , l = i[1];
    switch (e) {
    case 2:
        return [new Vector(Math.round(n.left),Math.round(n.top + s)), new Vector(Math.round(n.left + n.width),Math.round(n.top + s)), new Vector(Math.round(n.left + n.width),Math.round(l + n.top + s)), new Vector(Math.round(n.left),Math.round(l + n.top + s))];
    case 3:
        return [new Vector(Math.round(n.left + r),Math.round(n.top)), new Vector(Math.round(n.left + r + a),Math.round(n.top)), new Vector(Math.round(n.left + r + a),Math.round(n.height + n.top)), new Vector(Math.round(n.left + r),Math.round(n.height + n.top))];
    case 1:
        return [new Vector(Math.round(n.left + r),Math.round(n.top + s)), new Vector(Math.round(n.left + r + a),Math.round(n.top + s)), new Vector(Math.round(n.left + r + a),Math.round(n.top + s + l)), new Vector(Math.round(n.left + r),Math.round(n.top + s + l))];
    default:
        return [new Vector(Math.round(o.left),Math.round(o.top)), new Vector(Math.round(o.left + o.width),Math.round(o.top)), new Vector(Math.round(o.left + o.width),Math.round(o.height + o.top)), new Vector(Math.round(o.left),Math.round(o.height + o.top))]
    }
}, SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", SAMPLE_TEXT = "Hidden Text", FontMetrics = function() {
    function e(e) {
        this._data = {},
        this._document = e
    }
    return e.prototype.parseMetrics = function(e, t) {
        var i = this._document.createElement("div")
          , n = this._document.createElement("img")
          , o = this._document.createElement("span")
          , r = this._document.body;
        i.style.visibility = "hidden",
        i.style.fontFamily = e,
        i.style.fontSize = t,
        i.style.margin = "0",
        i.style.padding = "0",
        i.style.whiteSpace = "nowrap",
        r.appendChild(i),
        n.src = SMALL_IMAGE,
        n.width = 1,
        n.height = 1,
        n.style.margin = "0",
        n.style.padding = "0",
        n.style.verticalAlign = "baseline",
        o.style.fontFamily = e,
        o.style.fontSize = t,
        o.style.margin = "0",
        o.style.padding = "0",
        o.appendChild(this._document.createTextNode(SAMPLE_TEXT)),
        i.appendChild(o),
        i.appendChild(n),
        e = n.offsetTop - o.offsetTop + 2,
        i.removeChild(o),
        i.appendChild(this._document.createTextNode(SAMPLE_TEXT)),
        i.style.lineHeight = "normal",
        n.style.verticalAlign = "super",
        t = n.offsetTop - i.offsetTop + 2;
        return r.removeChild(i),
        {
            baseline: e,
            middle: t
        }
    }
    ,
    e.prototype.getMetrics = function(e, t) {
        var i = e + " " + t;
        return void 0 === this._data[i] && (this._data[i] = this.parseMetrics(e, t)),
        this._data[i]
    }
    ,
    e
}(), Renderer = function(e, t) {
    this.context = e,
    this.options = t
}, MASK_OFFSET = 1e4, CanvasRenderer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this)._activeEffects = [],
        t.canvas = i.canvas || document.createElement("canvas"),
        t.ctx = t.canvas.getContext("2d"),
        i.canvas || (t.canvas.width = Math.floor(i.width * i.scale),
        t.canvas.height = Math.floor(i.height * i.scale),
        t.canvas.style.width = i.width + "px",
        t.canvas.style.height = i.height + "px"),
        t.fontMetrics = new FontMetrics(document),
        t.ctx.scale(t.options.scale, t.options.scale),
        t.ctx.translate(-i.x, -i.y),
        t.ctx.textBaseline = "bottom",
        t._activeEffects = [],
        t.context.logger.debug("Canvas renderer initialized (" + i.width + "x" + i.height + ") with scale " + i.scale),
        t
    }
    return __extends(t, e),
    t.prototype.applyEffects = function(e) {
        for (var t = this; this._activeEffects.length; )
            this.popEffect();
        e.forEach((function(e) {
            return t.applyEffect(e)
        }
        ))
    }
    ,
    t.prototype.applyEffect = function(e) {
        this.ctx.save(),
        isOpacityEffect(e) && (this.ctx.globalAlpha = e.opacity),
        isTransformEffect(e) && (this.ctx.translate(e.offsetX, e.offsetY),
        this.ctx.transform(e.matrix[0], e.matrix[1], e.matrix[2], e.matrix[3], e.matrix[4], e.matrix[5]),
        this.ctx.translate(-e.offsetX, -e.offsetY)),
        isClipEffect(e) && (this.path(e.path),
        this.ctx.clip()),
        this._activeEffects.push(e)
    }
    ,
    t.prototype.popEffect = function() {
        this._activeEffects.pop(),
        this.ctx.restore()
    }
    ,
    t.prototype.renderStack = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            return __generator(this, (function(t) {
                switch (t.label) {
                case 0:
                    return e.element.container.styles.isVisible() ? [4, this.renderStackContent(e)] : [3, 2];
                case 1:
                    t.sent(),
                    t.label = 2;
                case 2:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderNode = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            return __generator(this, (function(t) {
                switch (t.label) {
                case 0:
                    return contains(e.container.flags, 16),
                    e.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(e)] : [3, 3];
                case 1:
                    return t.sent(),
                    [4, this.renderNodeContent(e)];
                case 2:
                    t.sent(),
                    t.label = 3;
                case 3:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderTextWithLetterSpacing = function(e, t, i) {
        var n = this;
        0 === t ? this.ctx.fillText(e.text, e.bounds.left, e.bounds.top + i) : segmentGraphemes(e.text).reduce((function(t, o) {
            return n.ctx.fillText(o, t, e.bounds.top + i),
            t + n.ctx.measureText(o).width
        }
        ), e.bounds.left)
    }
    ,
    t.prototype.createFontStyle = function(e) {
        var t = e.fontVariant.filter((function(e) {
            return "normal" === e || "small-caps" === e
        }
        )).join("")
          , i = fixIOSSystemFonts(e.fontFamily).join(", ")
          , n = isDimensionToken(e.fontSize) ? "" + e.fontSize.number + e.fontSize.unit : e.fontSize.number + "px";
        return [[e.fontStyle, t, e.fontWeight, n, i].join(" "), i, n]
    }
    ,
    t.prototype.renderTextNode = function(e, t) {
        return __awaiter(this, void 0, void 0, (function() {
            var i, n, o, r, s, a, l = this;
            return __generator(this, (function(c) {
                return n = this.createFontStyle(t),
                o = n[0],
                i = n[1],
                n = n[2],
                this.ctx.font = o,
                this.ctx.direction = 1 === t.direction ? "rtl" : "ltr",
                this.ctx.textAlign = "left",
                this.ctx.textBaseline = "alphabetic",
                o = this.fontMetrics.getMetrics(i, n),
                r = o.baseline,
                s = o.middle,
                a = t.paintOrder,
                e.textBounds.forEach((function(e) {
                    a.forEach((function(i) {
                        switch (i) {
                        case 0:
                            l.ctx.fillStyle = asString(t.color),
                            l.renderTextWithLetterSpacing(e, t.letterSpacing, r);
                            var n = t.textShadow;
                            n.length && e.text.trim().length && (n.slice(0).reverse().forEach((function(i) {
                                l.ctx.shadowColor = asString(i.color),
                                l.ctx.shadowOffsetX = i.offsetX.number * l.options.scale,
                                l.ctx.shadowOffsetY = i.offsetY.number * l.options.scale,
                                l.ctx.shadowBlur = i.blur.number,
                                l.renderTextWithLetterSpacing(e, t.letterSpacing, r)
                            }
                            )),
                            l.ctx.shadowColor = "",
                            l.ctx.shadowOffsetX = 0,
                            l.ctx.shadowOffsetY = 0,
                            l.ctx.shadowBlur = 0),
                            t.textDecorationLine.length && (l.ctx.fillStyle = asString(t.textDecorationColor || t.color),
                            t.textDecorationLine.forEach((function(t) {
                                switch (t) {
                                case 1:
                                    l.ctx.fillRect(e.bounds.left, Math.round(e.bounds.top + r), e.bounds.width, 1);
                                    break;
                                case 2:
                                    l.ctx.fillRect(e.bounds.left, Math.round(e.bounds.top), e.bounds.width, 1);
                                    break;
                                case 3:
                                    l.ctx.fillRect(e.bounds.left, Math.ceil(e.bounds.top + s), e.bounds.width, 1)
                                }
                            }
                            )));
                            break;
                        case 1:
                            t.webkitTextStrokeWidth && e.text.trim().length && (l.ctx.strokeStyle = asString(t.webkitTextStrokeColor),
                            l.ctx.lineWidth = t.webkitTextStrokeWidth,
                            l.ctx.lineJoin = window.chrome ? "miter" : "round",
                            l.ctx.strokeText(e.text, e.bounds.left, e.bounds.top + r)),
                            l.ctx.strokeStyle = "",
                            l.ctx.lineWidth = 0,
                            l.ctx.lineJoin = "miter"
                        }
                    }
                    ))
                }
                )),
                [2]
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderReplacedElement = function(e, t, i) {
        var n;
        i && 0 < e.intrinsicWidth && 0 < e.intrinsicHeight && (n = contentBox(e),
        t = calculatePaddingBoxPath(t),
        this.path(t),
        this.ctx.save(),
        this.ctx.clip(),
        this.ctx.drawImage(i, 0, 0, e.intrinsicWidth, e.intrinsicHeight, n.left, n.top, n.width, n.height),
        this.ctx.restore())
    }
    ,
    t.prototype.renderNodeContent = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var i, n, o, r, s, a, l, c, h, u, d, p, g;
            return __generator(this, (function(f) {
                switch (f.label) {
                case 0:
                    this.applyEffects(e.getEffects(4)),
                    i = e.container,
                    n = e.curves,
                    o = i.styles,
                    r = 0,
                    s = i.textNodes,
                    f.label = 1;
                case 1:
                    return r < s.length ? (a = s[r],
                    [4, this.renderTextNode(a, o)]) : [3, 4];
                case 2:
                    f.sent(),
                    f.label = 3;
                case 3:
                    return r++,
                    [3, 1];
                case 4:
                    if (!(i instanceof ImageElementContainer))
                        return [3, 8];
                    f.label = 5;
                case 5:
                    return f.trys.push([5, 7, , 8]),
                    [4, this.context.cache.match(i.src)];
                case 6:
                    return u = f.sent(),
                    this.renderReplacedElement(i, n, u),
                    [3, 8];
                case 7:
                    return f.sent(),
                    this.context.logger.error("Error loading image " + i.src),
                    [3, 8];
                case 8:
                    if (i instanceof CanvasElementContainer && this.renderReplacedElement(i, n, i.canvas),
                    !(i instanceof SVGElementContainer))
                        return [3, 12];
                    f.label = 9;
                case 9:
                    return f.trys.push([9, 11, , 12]),
                    [4, this.context.cache.match(i.svg)];
                case 10:
                    return u = f.sent(),
                    this.renderReplacedElement(i, n, u),
                    [3, 12];
                case 11:
                    return f.sent(),
                    this.context.logger.error("Error loading svg " + i.svg.substring(0, 255)),
                    [3, 12];
                case 12:
                    return i instanceof IFrameElementContainer && i.tree ? [4, new t(this.context,{
                        scale: this.options.scale,
                        backgroundColor: i.backgroundColor,
                        x: 0,
                        y: 0,
                        width: i.width,
                        height: i.height
                    }).render(i.tree)] : [3, 14];
                case 13:
                    a = f.sent(),
                    i.width && i.height && this.ctx.drawImage(a, 0, 0, i.width, i.height, i.bounds.left, i.bounds.top, i.bounds.width, i.bounds.height),
                    f.label = 14;
                case 14:
                    if (i instanceof InputElementContainer && (l = Math.min(i.bounds.width, i.bounds.height),
                    i.type === CHECKBOX ? i.checked && (this.ctx.save(),
                    this.path([new Vector(i.bounds.left + .39363 * l,i.bounds.top + .79 * l), new Vector(i.bounds.left + .16 * l,i.bounds.top + .5549 * l), new Vector(i.bounds.left + .27347 * l,i.bounds.top + .44071 * l), new Vector(i.bounds.left + .39694 * l,i.bounds.top + .5649 * l), new Vector(i.bounds.left + .72983 * l,i.bounds.top + .23 * l), new Vector(i.bounds.left + .84 * l,i.bounds.top + .34085 * l), new Vector(i.bounds.left + .39363 * l,i.bounds.top + .79 * l)]),
                    this.ctx.fillStyle = asString(INPUT_COLOR),
                    this.ctx.fill(),
                    this.ctx.restore()) : i.type === RADIO && i.checked && (this.ctx.save(),
                    this.ctx.beginPath(),
                    this.ctx.arc(i.bounds.left + l / 2, i.bounds.top + l / 2, l / 4, 0, 2 * Math.PI, !0),
                    this.ctx.fillStyle = asString(INPUT_COLOR),
                    this.ctx.fill(),
                    this.ctx.restore())),
                    isTextInputElement(i) && i.value.length) {
                        switch (l = this.createFontStyle(o),
                        p = l[0],
                        d = l[1],
                        d = this.fontMetrics.getMetrics(p, d).baseline,
                        this.ctx.font = p,
                        this.ctx.fillStyle = asString(o.color),
                        this.ctx.textBaseline = "alphabetic",
                        this.ctx.textAlign = canvasTextAlign(i.styles.textAlign),
                        g = contentBox(i),
                        c = 0,
                        i.styles.textAlign) {
                        case 1:
                            c += g.width / 2;
                            break;
                        case 2:
                            c += g.width
                        }
                        h = g.add(c, 0, 0, -g.height / 2 + 1),
                        this.ctx.save(),
                        this.path([new Vector(g.left,g.top), new Vector(g.left + g.width,g.top), new Vector(g.left + g.width,g.top + g.height), new Vector(g.left,g.top + g.height)]),
                        this.ctx.clip(),
                        this.renderTextWithLetterSpacing(new TextBounds(i.value,h), o.letterSpacing, d),
                        this.ctx.restore(),
                        this.ctx.textBaseline = "alphabetic",
                        this.ctx.textAlign = "left"
                    }
                    if (!contains(i.styles.display, 2048))
                        return [3, 20];
                    if (null === i.styles.listStyleImage)
                        return [3, 19];
                    if (0 !== (h = i.styles.listStyleImage).type)
                        return [3, 18];
                    u = void 0,
                    d = h.url,
                    f.label = 15;
                case 15:
                    return f.trys.push([15, 17, , 18]),
                    [4, this.context.cache.match(d)];
                case 16:
                    return u = f.sent(),
                    this.ctx.drawImage(u, i.bounds.left - (u.width + 10), i.bounds.top),
                    [3, 18];
                case 17:
                    return f.sent(),
                    this.context.logger.error("Error loading list-style-image " + d),
                    [3, 18];
                case 18:
                    return [3, 20];
                case 19:
                    e.listValue && -1 !== i.styles.listStyleType && (p = this.createFontStyle(o)[0],
                    this.ctx.font = p,
                    this.ctx.fillStyle = asString(o.color),
                    this.ctx.textBaseline = "middle",
                    this.ctx.textAlign = "right",
                    g = new Bounds(i.bounds.left,i.bounds.top + getAbsoluteValue(i.styles.paddingTop, i.bounds.width),i.bounds.width,computeLineHeight(o.lineHeight, o.fontSize.number) / 2 + 1),
                    this.renderTextWithLetterSpacing(new TextBounds(e.listValue,g), o.letterSpacing, computeLineHeight(o.lineHeight, o.fontSize.number) / 2 + 2),
                    this.ctx.textBaseline = "bottom",
                    this.ctx.textAlign = "left"),
                    f.label = 20;
                case 20:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderStackContent = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var t, i, n, o, r, s, a, l, c, h, u, d, p, g, f;
            return __generator(this, (function(A) {
                switch (A.label) {
                case 0:
                    return contains(e.element.container.flags, 16),
                    [4, this.renderNodeBackgroundAndBorders(e.element)];
                case 1:
                    A.sent(),
                    t = 0,
                    i = e.negativeZIndex,
                    A.label = 2;
                case 2:
                    return t < i.length ? (f = i[t],
                    [4, this.renderStack(f)]) : [3, 5];
                case 3:
                    A.sent(),
                    A.label = 4;
                case 4:
                    return t++,
                    [3, 2];
                case 5:
                    return [4, this.renderNodeContent(e.element)];
                case 6:
                    A.sent(),
                    n = 0,
                    o = e.nonInlineLevel,
                    A.label = 7;
                case 7:
                    return n < o.length ? (f = o[n],
                    [4, this.renderNode(f)]) : [3, 10];
                case 8:
                    A.sent(),
                    A.label = 9;
                case 9:
                    return n++,
                    [3, 7];
                case 10:
                    r = 0,
                    s = e.nonPositionedFloats,
                    A.label = 11;
                case 11:
                    return r < s.length ? (f = s[r],
                    [4, this.renderStack(f)]) : [3, 14];
                case 12:
                    A.sent(),
                    A.label = 13;
                case 13:
                    return r++,
                    [3, 11];
                case 14:
                    a = 0,
                    l = e.nonPositionedInlineLevel,
                    A.label = 15;
                case 15:
                    return a < l.length ? (f = l[a],
                    [4, this.renderStack(f)]) : [3, 18];
                case 16:
                    A.sent(),
                    A.label = 17;
                case 17:
                    return a++,
                    [3, 15];
                case 18:
                    c = 0,
                    h = e.inlineLevel,
                    A.label = 19;
                case 19:
                    return c < h.length ? (f = h[c],
                    [4, this.renderNode(f)]) : [3, 22];
                case 20:
                    A.sent(),
                    A.label = 21;
                case 21:
                    return c++,
                    [3, 19];
                case 22:
                    u = 0,
                    d = e.zeroOrAutoZIndexOrTransformedOrOpacity,
                    A.label = 23;
                case 23:
                    return u < d.length ? (f = d[u],
                    [4, this.renderStack(f)]) : [3, 26];
                case 24:
                    A.sent(),
                    A.label = 25;
                case 25:
                    return u++,
                    [3, 23];
                case 26:
                    p = 0,
                    g = e.positiveZIndex,
                    A.label = 27;
                case 27:
                    return p < g.length ? (f = g[p],
                    [4, this.renderStack(f)]) : [3, 30];
                case 28:
                    A.sent(),
                    A.label = 29;
                case 29:
                    return p++,
                    [3, 27];
                case 30:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.mask = function(e) {
        this.ctx.beginPath(),
        this.ctx.moveTo(0, 0),
        this.ctx.lineTo(this.canvas.width, 0),
        this.ctx.lineTo(this.canvas.width, this.canvas.height),
        this.ctx.lineTo(0, this.canvas.height),
        this.ctx.lineTo(0, 0),
        this.formatPath(e.slice(0).reverse()),
        this.ctx.closePath()
    }
    ,
    t.prototype.path = function(e) {
        this.ctx.beginPath(),
        this.formatPath(e),
        this.ctx.closePath()
    }
    ,
    t.prototype.formatPath = function(e) {
        var t = this;
        e.forEach((function(e, i) {
            var n = isBezierCurve(e) ? e.start : e;
            0 === i ? t.ctx.moveTo(n.x, n.y) : t.ctx.lineTo(n.x, n.y),
            isBezierCurve(e) && t.ctx.bezierCurveTo(e.startControl.x, e.startControl.y, e.endControl.x, e.endControl.y, e.end.x, e.end.y)
        }
        ))
    }
    ,
    t.prototype.renderRepeat = function(e, t, i, n) {
        this.path(e),
        this.ctx.fillStyle = t,
        this.ctx.translate(i, n),
        this.ctx.fill(),
        this.ctx.translate(-i, -n)
    }
    ,
    t.prototype.resizeImage = function(e, t, i) {
        var n;
        return e.width === t && e.height === i ? e : ((n = (null != (n = this.canvas.ownerDocument) ? n : document).createElement("canvas")).width = Math.max(1, t),
        n.height = Math.max(1, i),
        n.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, t, i),
        n)
    }
    ,
    t.prototype.renderBackgroundImage = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var t, i, n, o, r, s;
            return __generator(this, (function(a) {
                switch (a.label) {
                case 0:
                    t = e.styles.backgroundImage.length - 1,
                    i = function(i) {
                        var o, r, s, a, l, c, h, u, d, p, g, f, A, m, v, _, b, y, C, w, S;
                        return __generator(this, (function(x) {
                            switch (x.label) {
                            case 0:
                                if (0 !== i.type)
                                    return [3, 5];
                                o = void 0,
                                r = i.url,
                                x.label = 1;
                            case 1:
                                return x.trys.push([1, 3, , 4]),
                                [4, n.context.cache.match(r)];
                            case 2:
                                return o = x.sent(),
                                [3, 4];
                            case 3:
                                return x.sent(),
                                n.context.logger.error("Error loading background-image " + r),
                                [3, 4];
                            case 4:
                                return o && (p = calculateBackgroundRendering(e, t, [o.width, o.height, o.width / o.height]),
                                c = p[0],
                                f = p[1],
                                A = p[2],
                                d = p[3],
                                p = p[4],
                                a = n.ctx.createPattern(n.resizeImage(o, d, p), "repeat"),
                                n.renderRepeat(c, a, f, A)),
                                [3, 6];
                            case 5:
                                isLinearGradient(i) ? (g = calculateBackgroundRendering(e, t, [null, null, null]),
                                c = g[0],
                                f = g[1],
                                A = g[2],
                                d = g[3],
                                p = g[4],
                                g = calculateGradientDirection(i.angle, d, p),
                                m = g[0],
                                l = g[1],
                                u = g[2],
                                h = g[3],
                                g = g[4],
                                (_ = document.createElement("canvas")).width = d,
                                _.height = p,
                                v = _.getContext("2d"),
                                s = v.createLinearGradient(l, h, u, g),
                                processColorStops(i.stops, m).forEach((function(e) {
                                    return s.addColorStop(e.stop, asString(e.color))
                                }
                                )),
                                v.fillStyle = s,
                                v.fillRect(0, 0, d, p),
                                0 < d && 0 < p && (a = n.ctx.createPattern(_, "repeat"),
                                n.renderRepeat(c, a, f, A))) : isRadialGradient(i) && (l = calculateBackgroundRendering(e, t, [null, null, null]),
                                c = l[0],
                                h = l[1],
                                u = l[2],
                                d = l[3],
                                p = l[4],
                                g = 0 === i.position.length ? [FIFTY_PERCENT] : i.position,
                                f = getAbsoluteValue(g[0], d),
                                A = getAbsoluteValue(g[g.length - 1], p),
                                m = calculateRadius(i, f, A, d, p),
                                v = m[0],
                                _ = m[1],
                                0 < v) && 0 < _ && (b = n.ctx.createRadialGradient(h + f, u + A, 0, h + f, u + A, v),
                                processColorStops(i.stops, 2 * v).forEach((function(e) {
                                    return b.addColorStop(e.stop, asString(e.color))
                                }
                                )),
                                n.path(c),
                                n.ctx.fillStyle = b,
                                v !== _ ? (y = e.bounds.left + .5 * e.bounds.width,
                                C = e.bounds.top + .5 * e.bounds.height,
                                S = 1 / (w = _ / v),
                                n.ctx.save(),
                                n.ctx.translate(y, C),
                                n.ctx.transform(1, 0, 0, w, 0, 0),
                                n.ctx.translate(-y, -C),
                                n.ctx.fillRect(h, S * (u - C) + C, d, p * S),
                                n.ctx.restore()) : n.ctx.fill()),
                                x.label = 6;
                            case 6:
                                return t--,
                                [2]
                            }
                        }
                        ))
                    }
                    ,
                    n = this,
                    o = 0,
                    r = e.styles.backgroundImage.slice(0).reverse(),
                    a.label = 1;
                case 1:
                    return o < r.length ? (s = r[o],
                    [5, i(s)]) : [3, 4];
                case 2:
                    a.sent(),
                    a.label = 3;
                case 3:
                    return o++,
                    [3, 1];
                case 4:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderSolidBorder = function(e, t, i) {
        return __awaiter(this, void 0, void 0, (function() {
            return __generator(this, (function(n) {
                return this.path(parsePathForBorder(i, t)),
                this.ctx.fillStyle = asString(e),
                this.ctx.fill(),
                [2]
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderDoubleBorder = function(e, t, i, n) {
        return __awaiter(this, void 0, void 0, (function() {
            var o;
            return __generator(this, (function(r) {
                switch (r.label) {
                case 0:
                    return t < 3 ? [4, this.renderSolidBorder(e, i, n)] : [3, 2];
                case 1:
                    return r.sent(),
                    [2];
                case 2:
                    return o = parsePathForBorderDoubleOuter(n, i),
                    this.path(o),
                    this.ctx.fillStyle = asString(e),
                    this.ctx.fill(),
                    o = parsePathForBorderDoubleInner(n, i),
                    this.path(o),
                    this.ctx.fill(),
                    [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderNodeBackgroundAndBorders = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var t, i, n, o, r, s, a, l, c = this;
            return __generator(this, (function(h) {
                switch (h.label) {
                case 0:
                    return this.applyEffects(e.getEffects(2)),
                    t = e.container.styles,
                    i = !isTransparent(t.backgroundColor) || t.backgroundImage.length,
                    n = [{
                        style: t.borderTopStyle,
                        color: t.borderTopColor,
                        width: t.borderTopWidth
                    }, {
                        style: t.borderRightStyle,
                        color: t.borderRightColor,
                        width: t.borderRightWidth
                    }, {
                        style: t.borderBottomStyle,
                        color: t.borderBottomColor,
                        width: t.borderBottomWidth
                    }, {
                        style: t.borderLeftStyle,
                        color: t.borderLeftColor,
                        width: t.borderLeftWidth
                    }],
                    o = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(t.backgroundClip, 0), e.curves),
                    i || t.boxShadow.length ? (this.ctx.save(),
                    this.path(o),
                    this.ctx.clip(),
                    isTransparent(t.backgroundColor) || (this.ctx.fillStyle = asString(t.backgroundColor),
                    this.ctx.fill()),
                    [4, this.renderBackgroundImage(e.container)]) : [3, 2];
                case 1:
                    h.sent(),
                    this.ctx.restore(),
                    t.boxShadow.slice(0).reverse().forEach((function(t) {
                        c.ctx.save();
                        var i = calculateBorderBoxPath(e.curves)
                          , n = t.inset ? 0 : MASK_OFFSET
                          , o = transformPath(i, -n + (t.inset ? 1 : -1) * t.spread.number, (t.inset ? 1 : -1) * t.spread.number, t.spread.number * (t.inset ? -2 : 2), t.spread.number * (t.inset ? -2 : 2));
                        t.inset ? (c.path(i),
                        c.ctx.clip(),
                        c.mask(o)) : (c.mask(i),
                        c.ctx.clip(),
                        c.path(o)),
                        c.ctx.shadowOffsetX = t.offsetX.number + n,
                        c.ctx.shadowOffsetY = t.offsetY.number,
                        c.ctx.shadowColor = asString(t.color),
                        c.ctx.shadowBlur = t.blur.number,
                        c.ctx.fillStyle = t.inset ? asString(t.color) : "rgba(0,0,0,1)",
                        c.ctx.fill(),
                        c.ctx.restore()
                    }
                    )),
                    h.label = 2;
                case 2:
                    s = r = 0,
                    a = n,
                    h.label = 3;
                case 3:
                    return s < a.length ? 0 !== (l = a[s]).style && !isTransparent(l.color) && 0 < l.width ? 2 !== l.style ? [3, 5] : [4, this.renderDashedDottedBorder(l.color, l.width, r, e.curves, 2)] : [3, 11] : [3, 13];
                case 4:
                    return h.sent(),
                    [3, 11];
                case 5:
                    return 3 !== l.style ? [3, 7] : [4, this.renderDashedDottedBorder(l.color, l.width, r, e.curves, 3)];
                case 6:
                    return h.sent(),
                    [3, 11];
                case 7:
                    return 4 !== l.style ? [3, 9] : [4, this.renderDoubleBorder(l.color, l.width, r, e.curves)];
                case 8:
                    return h.sent(),
                    [3, 11];
                case 9:
                    return [4, this.renderSolidBorder(l.color, r, e.curves)];
                case 10:
                    h.sent(),
                    h.label = 11;
                case 11:
                    r++,
                    h.label = 12;
                case 12:
                    return s++,
                    [3, 3];
                case 13:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    ,
    t.prototype.renderDashedDottedBorder = function(e, t, i, n, o) {
        return __awaiter(this, void 0, void 0, (function() {
            var r, s, a, l, c, h, u, d, p, g, f;
            return __generator(this, (function(A) {
                return this.ctx.save(),
                c = parsePathForBorderStroke(n, i),
                r = parsePathForBorder(n, i),
                2 === o && (this.path(r),
                this.ctx.clip()),
                p = (isBezierCurve(r[0]) ? (s = r[0].start.x,
                r[0].start) : (s = r[0].x,
                r[0])).y,
                l = (isBezierCurve(r[1]) ? (a = r[1].end.x,
                r[1].end) : (a = r[1].x,
                r[1])).y,
                p = 0 === i || 2 === i ? Math.abs(s - a) : Math.abs(p - l),
                this.ctx.beginPath(),
                3 === o ? this.formatPath(c) : this.formatPath(r.slice(0, 2)),
                l = t < 3 ? 3 * t : 2 * t,
                c = t < 3 ? 2 * t : t,
                3 === o && (c = l = t),
                h = !0,
                p <= 2 * l ? h = !1 : p <= 2 * l + c ? (l *= u = p / (2 * l + c),
                c *= u) : (u = Math.floor((p + c) / (l + c)),
                d = (p - u * l) / (u - 1),
                c = (p = (p - (u + 1) * l) / u) <= 0 || Math.abs(c - d) < Math.abs(c - p) ? d : p),
                h && (3 === o ? this.ctx.setLineDash([0, l + c]) : this.ctx.setLineDash([l, c])),
                3 === o ? (this.ctx.lineCap = "round",
                this.ctx.lineWidth = t) : this.ctx.lineWidth = 2 * t + 1.1,
                this.ctx.strokeStyle = asString(e),
                this.ctx.stroke(),
                this.ctx.setLineDash([]),
                2 === o && (isBezierCurve(r[0]) && (g = r[3],
                f = r[0],
                this.ctx.beginPath(),
                this.formatPath([new Vector(g.end.x,g.end.y), new Vector(f.start.x,f.start.y)]),
                this.ctx.stroke()),
                isBezierCurve(r[1])) && (g = r[1],
                f = r[2],
                this.ctx.beginPath(),
                this.formatPath([new Vector(g.end.x,g.end.y), new Vector(f.start.x,f.start.y)]),
                this.ctx.stroke()),
                this.ctx.restore(),
                [2]
            }
            ))
        }
        ))
    }
    ,
    t.prototype.render = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var t;
            return __generator(this, (function(i) {
                switch (i.label) {
                case 0:
                    return this.options.backgroundColor && (this.ctx.fillStyle = asString(this.options.backgroundColor),
                    this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)),
                    t = parseStackingContexts(e),
                    [4, this.renderStack(t)];
                case 1:
                    return i.sent(),
                    this.applyEffects([]),
                    [2, this.canvas]
                }
            }
            ))
        }
        ))
    }
    ,
    t
}(Renderer), isTextInputElement = function(e) {
    return e instanceof TextareaElementContainer || e instanceof SelectElementContainer || e instanceof InputElementContainer && e.type !== RADIO && e.type !== CHECKBOX
}, calculateBackgroundCurvedPaintingArea = function(e, t) {
    switch (e) {
    case 0:
        return calculateBorderBoxPath(t);
    case 2:
        return calculateContentBoxPath(t);
    default:
        return calculatePaddingBoxPath(t)
    }
}, canvasTextAlign = function(e) {
    switch (e) {
    case 1:
        return "center";
    case 2:
        return "right";
    default:
        return "left"
    }
}, iOSBrokenFonts = ["-apple-system", "system-ui"], fixIOSSystemFonts = function(e) {
    return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? e.filter((function(e) {
        return -1 === iOSBrokenFonts.indexOf(e)
    }
    )) : e
}, ForeignObjectRenderer = function(e) {
    function t(t, i) {
        return (t = e.call(this, t, i) || this).canvas = i.canvas || document.createElement("canvas"),
        t.ctx = t.canvas.getContext("2d"),
        t.options = i,
        t.canvas.width = Math.floor(i.width * i.scale),
        t.canvas.height = Math.floor(i.height * i.scale),
        t.canvas.style.width = i.width + "px",
        t.canvas.style.height = i.height + "px",
        t.ctx.scale(t.options.scale, t.options.scale),
        t.ctx.translate(-i.x, -i.y),
        t.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + i.width + "x" + i.height + " at " + i.x + "," + i.y + ") with scale " + i.scale),
        t
    }
    return __extends(t, e),
    t.prototype.render = function(e) {
        return __awaiter(this, void 0, void 0, (function() {
            var t;
            return __generator(this, (function(i) {
                switch (i.label) {
                case 0:
                    return t = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, e),
                    [4, loadSerializedSVG(t)];
                case 1:
                    return t = i.sent(),
                    this.options.backgroundColor && (this.ctx.fillStyle = asString(this.options.backgroundColor),
                    this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)),
                    this.ctx.drawImage(t, -this.options.x * this.options.scale, -this.options.y * this.options.scale),
                    [2, this.canvas]
                }
            }
            ))
        }
        ))
    }
    ,
    t
}(Renderer), loadSerializedSVG = function(e) {
    return new Promise((function(t, i) {
        var n = new Image;
        n.onload = function() {
            t(n)
        }
        ,
        n.onerror = i,
        n.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent((new XMLSerializer).serializeToString(e))
    }
    ))
}, Logger = function() {
    function e(e) {
        var t = e.id;
        e = e.enabled;
        this.id = t,
        this.enabled = e,
        this.start = Date.now()
    }
    return e.prototype.debug = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.debug ? console.debug.apply(console, __spreadArray([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e))
    }
    ,
    e.prototype.getTime = function() {
        return Date.now() - this.start
    }
    ,
    e.prototype.info = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        this.enabled && "undefined" != typeof window && window.console && "function" == typeof console.info && console.info.apply(console, __spreadArray([this.id, this.getTime() + "ms"], e))
    }
    ,
    e.prototype.warn = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.warn ? console.warn.apply(console, __spreadArray([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e))
    }
    ,
    e.prototype.error = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        this.enabled && ("undefined" != typeof window && window.console && "function" == typeof console.error ? console.error.apply(console, __spreadArray([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e))
    }
    ,
    e.instances = {},
    e
}(), Context = function() {
    function e(t, i) {
        this.windowBounds = i,
        this.instanceName = "#" + e.instanceCount++,
        this.logger = new Logger({
            id: this.instanceName,
            enabled: t.logging
        }),
        this.cache = null != (i = t.cache) ? i : new Cache(this,t)
    }
    return e.instanceCount = 1,
    e
}(), html2canvas = function(e, t) {
    return renderElement(e, t = void 0 === t ? {} : t)
}, renderElement = ("undefined" != typeof window && CacheStorage.setContext(window),
function(e, t) {
    return __awaiter(void 0, void 0, void 0, (function() {
        var i, n, o, r, s, a, l, c, h, u, d, p, g, f, A, m;
        return __generator(this, (function(v) {
            switch (v.label) {
            case 0:
                if (!e || "object" != typeof e)
                    return [2, Promise.reject("Invalid element provided as first argument")];
                if (!(g = e.ownerDocument))
                    throw new Error("Element is not attached to a Document");
                if (i = g.defaultView)
                    return f = {
                        allowTaint: null != (f = t.allowTaint) && f,
                        imageTimeout: null != (f = t.imageTimeout) ? f : 15e3,
                        proxy: t.proxy,
                        useCORS: null != (f = t.useCORS) && f
                    },
                    u = __assign({
                        logging: null == (u = t.logging) || u,
                        cache: t.cache
                    }, f),
                    f = {
                        windowWidth: null != (f = t.windowWidth) ? f : i.innerWidth,
                        windowHeight: null != (f = t.windowHeight) ? f : i.innerHeight,
                        scrollX: null != (f = t.scrollX) ? f : i.pageXOffset,
                        scrollY: null != (f = t.scrollY) ? f : i.pageYOffset
                    },
                    f = new Bounds(f.scrollX,f.scrollY,f.windowWidth,f.windowHeight),
                    u = new Context(u,f),
                    d = null != (d = t.foreignObjectRendering) && d,
                    p = {
                        allowTaint: null != (p = t.allowTaint) && p,
                        onclone: t.onclone,
                        ignoreElements: t.ignoreElements,
                        inlineImages: d,
                        copyStyles: d
                    },
                    u.logger.debug("Starting document clone with size " + f.width + "x" + f.height + " scrolled to " + -f.left + "," + -f.top),
                    p = new DocumentCloner(u,e,p),
                    (n = p.clonedReferenceElement) ? [4, p.toIFrame(g, f)] : [2, Promise.reject("Unable to find element in cloned iframe")];
                throw new Error("Document is not attached to a Window");
            case 1:
                return o = v.sent(),
                p = isBodyElement(n) || isHTMLElement(n) ? parseDocumentSize(n.ownerDocument) : parseBounds(u, n),
                r = p.width,
                s = p.height,
                a = p.left,
                l = p.top,
                c = parseBackgroundColor(u, n, t.backgroundColor),
                A = {
                    canvas: t.canvas,
                    backgroundColor: c,
                    scale: null != (f = null != (g = t.scale) ? g : i.devicePixelRatio) ? f : 1,
                    x: (null != (A = t.x) ? A : 0) + a,
                    y: (null != (A = t.y) ? A : 0) + l,
                    width: null != (A = t.width) ? A : Math.ceil(r),
                    height: null != (A = t.height) ? A : Math.ceil(s)
                },
                d ? (u.logger.debug("Document cloned, using foreign object rendering"),
                [4, new ForeignObjectRenderer(u,A).render(n)]) : [3, 3];
            case 2:
                return h = v.sent(),
                [3, 5];
            case 3:
                return u.logger.debug("Document cloned, element located at " + a + "," + l + " with size " + r + "x" + s + " using computed rendering"),
                u.logger.debug("Starting DOM parsing"),
                m = parseTree(u, n),
                c === m.styles.backgroundColor && (m.styles.backgroundColor = COLORS.TRANSPARENT),
                u.logger.debug("Starting renderer for element at " + A.x + "," + A.y + " with size " + A.width + "x" + A.height),
                [4, new CanvasRenderer(u,A).render(m)];
            case 4:
                h = v.sent(),
                v.label = 5;
            case 5:
                return null != (m = t.removeContainer) && !m || DocumentCloner.destroy(o) || u.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore"),
                u.logger.debug("Finished rendering"),
                [2, h]
            }
        }
        ))
    }
    ))
}
), parseBackgroundColor = function(e, t, i) {
    var n = t.ownerDocument
      , o = n.documentElement ? parseColor(e, getComputedStyle(n.documentElement).backgroundColor) : COLORS.TRANSPARENT
      , r = n.body ? parseColor(e, getComputedStyle(n.body).backgroundColor) : COLORS.TRANSPARENT;
    e = "string" == typeof i ? parseColor(e, i) : null === i ? COLORS.TRANSPARENT : 4294967295;
    return t === n.documentElement ? isTransparent(o) ? isTransparent(r) ? e : r : o : e
};
const snapshotModule = {
    setup(e) {
        e.mixin({
            ui: {
                async getSnapshot(e, t) {
                    t = t || {};
                    var i = (e = e || this.canvas.el).getBoundingClientRect().width
                      , n = e.getBoundingClientRect().height;
                    return (await html2canvas(e, {
                        width: i,
                        height: n,
                        allowTaint: !0,
                        taintTest: !1,
                        useCORS: !0,
                        logging: !1,
                        ...t,
                        scrollY: 0,
                        scrollX: 0
                    })).toDataURL("image/png", 1)
                }
            }
        })
    }
}
  , styleArr = ["width", "height", "backgroundColor", "backgroundImage", "backgroundSize", "opacity"]
  , makeMap = e=>{
    const t = {};
    return e.forEach((e=>{
        t[e] = !0
    }
    )),
    t
}
  , hasStyleMap = makeMap(styleArr);
class SprayToUI {
    constructor() {
        this.canvasSize = {
            width: null,
            height: null
        },
        this.groupMap = {},
        this.userData = {}
    }
    transform(e) {
        if (isType(e, "String"))
            try {
                e = JSON.parse(e)
            } catch (e) {
                return log.warn("定义文件异常"),
                !1
            }
        if (!isType(e, "Object"))
            return log.warn("定义文件不符合要求"),
            !1;
        e = clone(e);
        var t = this.toCanvas(e);
        this.toConch(e.conchOptions, e.dataOptions),
        e = this.userData;
        return this.canvasSize.width = null,
        this.canvasSize.height = null,
        this.groupMap = {},
        {
            scene: t,
            userData: e,
            version: 1
        }
    }
    toCanvas(e) {
        var t, i = {
            type: "Canvas"
        };
        return "Canvas" === e.type && (t = i.option = this.toOptions(e.option),
        this.canvasSize.width = t.style.width,
        this.canvasSize.height = t.style.height,
        delete t.style.top,
        delete t.style.left,
        isType(e.children, "Array") && (i.children = e.children.map((e=>this.toLayer(e)))),
        this.toThingJs(i)),
        i
    }
    toThingJs(e) {
        if (!e.children)
            return !1;
        let t = []
          , i = (e.children.forEach(((i,n)=>{
            "ThingJSAdapter" === i.option.adapter && t.push({
                index: n,
                thingJSContainer: i,
                prev: getLayer(e, n, -1),
                next: getLayer(e, n, 1)
            })
        }
        )),
        t.length - 1);
        for (; 0 <= i; i--) {
            var n = t[i]
              , o = (e.children.splice(n.index, 1),
            merge(n.thingJSContainer, {
                type: "DefaultContainer",
                option: {
                    adapter: null
                }
            }));
            n.prev ? n.prev.children.push(o) : n.next ? n.next.children.splice(0, 0, o) : e.children.push({
                type: "Layer",
                option: {
                    id: "layer-" + o.option.id,
                    lock: !0,
                    name: "",
                    style: {
                        width: 0,
                        height: 0,
                        top: 0,
                        left: 0
                    }
                },
                children: [o]
            })
        }
    }
    toLayer(e) {
        const t = {
            type: "Layer"
        };
        var i, n;
        return "Layer" !== e.type ? null : (hasOwn(n = (i = t.option = this.toOptions(e.option)).style, "backgroundColor") || hasOwn(n, "backgroundImage") || "ThingJSAdapter" === i.adapter ? (hasOwn(n, "width") && "inherit" !== n.width || (n.width = this.canvasSize.width),
        hasOwn(n, "height") && "inherit" !== n.height || (n.height = this.canvasSize.height)) : (n.width = 0,
        n.height = 0),
        hasOwn(n, "top") || (n.top = 0),
        hasOwn(n, "left") || (n.left = 0),
        isType(e.children, "Array") && e.children.forEach((e=>{
            t.children = this.toFree(e)
        }
        )),
        t)
    }
    toFree(e) {
        let t;
        return "Free" === e.type ? this.toChildren(e.children) : t
    }
    toChildren(e) {
        const t = [];
        return isType(e, "Array") && e.forEach((e=>{
            let i;
            "Group" === e.type && (i = this.toGroup(e)),
            (i = "FreeContainer" === e.type ? this.toContainer(e) : i) && (e.option.groupId ? this.groupMap[e.option.groupId].children : t).push(i)
        }
        )),
        t
    }
    toGroup(e) {
        var t = e.option.id;
        e = {
            type: "Group",
            option: {
                id: t,
                name: e.option.name
            },
            children: []
        };
        return this.groupMap[t] = e
    }
    toContainer(e) {
        return {
            type: "Container",
            option: this.toOptions(e.option)
        }
    }
    toOptions(e) {
        var t, i, n = {
            id: e.id,
            name: e.name,
            lock: !0
        };
        return e.sceneAnimator && (n.animation = {},
        t = e.sceneAnimator.enter,
        i = e.sceneAnimator.leave,
        t && (n.animation.enter = [t.name, t.duration]),
        i) && (n.animation.leave = [i.name, i.duration]),
        e.style && (n.style = this.toStyle(e.style),
        n.style.top = e.top || 0,
        n.style.left = e.left || 0),
        e.adapter && e.adapter.type && (n.adapter = this.toAdapter(e.adapter, e.id)),
        n
    }
    toAdapter(e, t) {
        let i = {};
        return "ConchAdapter" === e.type && (i = {
            type: "ConchAdapter",
            name: e.name,
            option: e.option
        }),
        "ThingJSAdapter" !== e.type && (this.userData[t] = i),
        e.type
    }
    toStyle(e) {
        const t = {};
        return Object.entries(e).forEach((e=>{
            hasStyleMap[e[0]] && (t[e[0]] = e[1])
        }
        )),
        t
    }
    toConch(e={}, t={}) {
        Object.entries(e).forEach((e=>{
            var t = this.userData[e[0]];
            if (t && "ConchAdapter" === t.type)
                try {
                    t.opts = JSON.parse(e[1])
                } catch (t) {
                    log.warn(e[0] + " 的数据异常")
                }
        }
        )),
        Object.entries(t).forEach((e=>{
            var t = this.userData[e[0]];
            if (t && "ConchAdapter" === t.type)
                try {
                    t.data = JSON.parse(e[1].staticData)
                } catch (t) {
                    log.warn(e[0] + " 的数据异常")
                }
        }
        ))
    }
}
function getLayer(e, t, i) {
    return function t(n) {
        var o = e.children[n];
        if (o)
            return "ThingJSAdapter" !== o.option.adapter ? o : t(n + i)
    }(t + i)
}
const sprayToUI = new SprayToUI
  , sprayToUIModule = {
    setup(e) {
        e.mixin({
            ui: {
                sprayToUI(e) {
                    return sprayToUI.transform(e)
                }
            }
        })
    },
    ui: {
        beforeParseJSON(e, t) {
            var i;
            t.version || (i = clone(t),
            i = this.sprayToUI(i),
            emptyObject(t),
            merge(t, i))
        }
    }
};
function emptyObject(e) {
    var t;
    for (t of Object.keys(e))
        delete e[t];
    return !0
}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function transformValue(value, params) {
    if (value) {
        let result = defaultTagRE.exec(value);
        for (; result; ) {
            let[e,t] = result;
            const i = params[t.trim()];
            i && (value = value.replace(e, i)),
            result = defaultTagRE.exec(value)
        }
        return eval(value)
    }
}
const templateParser = {
    setup(e) {
        e.mixin({
            layer: {
                parserTemplate(t) {
                    if (Array.isArray(t) && 0 < t.length) {
                        var {width: i, height: n} = this;
                        const o = {
                            width: i,
                            height: n
                        };
                        return t.map((t=>{
                            var i = transformValue(t.width, o) || 0
                              , n = transformValue(t.height, o) || 0
                              , r = transformValue(t.top, o) || 0
                              , s = transformValue(t.left, o) || 0;
                            return new e.Container(this,{
                                name: t.name || "",
                                style: {
                                    top: r,
                                    left: s,
                                    width: i,
                                    height: n
                                }
                            })
                        }
                        ))
                    }
                }
            }
        })
    }
};
class Watermark {
    constructor(e, t) {
        if (this.pNode = "string" == typeof e ? document.getElementById(e) : e,
        "object" != typeof this.pNode)
            throw new Error(`未找到dom: ${e} 节点`);
        if (1 !== this.pNode.nodeType)
            throw new Error("dom 节点非 Element节点");
        this.watermarkUrl = t,
        this.markNode = document.createElement("div"),
        this.bgImg = new Image,
        this.bgImg.src = t,
        this.bgImg.onerror = e=>{
            console.error("水印图片资源错误", e),
            this.remove()
        }
        ,
        this.observerMap = new Map
    }
    add() {
        return this.__addMarker(),
        this.__addBrothersObserver(),
        this.__addMarkerObserver(),
        this.__addPNodeObserver(),
        this
    }
    remove() {
        for (const e of this.observerMap.values())
            e && e.disconnect();
        return this.__removeMarker(),
        this
    }
    __observerReset(e=(()=>{}
    ), {observer: t, node: i, options: n}) {
        t.disconnect(),
        e(),
        t.observe(i, n)
    }
    __resetPNodeStyle() {
        var e;
        "static" === getComputedStyle(this.pNode).position && (e = this.pNode.getAttribute("style"),
        this.pNode.setAttribute("style", "position:relative;" + (e || "")))
    }
    __resetMarkStyle() {
        var e = this.__getMarkIndex(this.pNode);
        this.markNode.setAttribute("style", `position:absolute !important;\n      left:0 !important;\n      right:0 !important;\n      top:0 !important;\n      bottom:0 !important;\n      pointer-events:none;\n      z-index:${e} !important;\n      background:url("${this.watermarkUrl}") !important;\n      `)
    }
    __addMarker() {
        this.__resetPNodeStyle(),
        this.__resetMarkStyle(),
        this.pNode.appendChild(this.markNode)
    }
    __removeMarker() {
        this.pNode.contains(this.markNode) && this.pNode.removeChild(this.markNode)
    }
    __addMarkerObserver() {
        var e = this.markNode;
        this.__addNodeObserver({
            node: e,
            options: {
                childList: !0,
                attributes: !0,
                subtree: !0,
                attributesOldValue: !0,
                characterData: !0,
                characterDataOldValue: !0
            },
            callback: {
                conditionExp: e=>"attributes" === e.type && "style" === e.attributeName,
                reset: ()=>this.__resetMarkStyle()
            }
        })
    }
    __addPNodeObserver() {
        const e = this.pNode;
        this.__addNodeObserver({
            node: e,
            options: {
                childList: !0
            },
            callback: {
                conditionExp: e=>"childList" === e.type,
                reset: ()=>{
                    this.pNode.contains(this.markNode) ? this.__resetMarkStyle() : e.appendChild(this.markNode)
                }
            }
        })
    }
    __addBrothersObserver() {
        var e = {
            attributes: !0,
            attributeFilter: ["style"]
        };
        for (const t of this.pNode.children)
            t !== this.markNode && this.__addNodeObserver({
                node: t,
                options: e,
                callback: {
                    conditionExp: e=>"attributes" === e.type && "style" === e.attributeName,
                    reset: ()=>this.__resetMarkStyle()
                }
            })
    }
    __addNodeObserver({node: e, options: t, callback: {conditionExp: i, reset: n}}) {
        var o = new MutationObserver((o=>{
            o = o[0],
            i(o) && this.__observerReset(n, {
                observer: this.observerMap.get(e),
                node: e,
                options: t
            })
        }
        ));
        this.observerMap.set(e, o),
        o.observe(e, t)
    }
    __getMarkIndex(e) {
        var t, i = [1];
        for (const n of e.children)
            n !== this.markNode && (t = getComputedStyle(n).zIndex,
            i.push(Number(t)));
        return Math.max(...i.filter(Boolean)) + 1
    }
}
var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='481px' height='323px' viewBox='0 0 481 323' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e6%b0%b4%e5%8d%b0%3c/title%3e %3cdefs%3e %3cpath d='M9.4901397%2c61.3055244 L9.4901397%2c46.6537786 L14.3797419%2c46.6537786 L14.3797419%2c44.4296482 L2.00927364%2c44.4296482 L2.00927364%2c46.6537786 L6.87634313%2c46.6537786 L6.87634313%2c61.3055244 L9.4901397%2c61.3055244 Z M19.5848023%2c61.3055244 L19.5848023%2c52.3631443 C20.6889061%2c51.2396145 21.4775516%2c50.6434559 22.6267208%2c50.6434559 C24.0913482%2c50.6434559 24.7222646%2c51.5147647 24.7222646%2c53.6930368 L24.7222646%2c61.3055244 L27.3135284%2c61.3055244 L27.3135284%2c53.3720282 C27.3135284%2c50.1619431 26.1418265%2c48.3734671 23.5054972%2c48.3734671 C21.8155425%2c48.3734671 20.5762424%2c49.3135634 19.4946714%2c50.3683057 L19.5848023%2c47.8690251 L19.5848023%2c43.0309682 L17.0160712%2c43.0309682 L17.0160712%2c61.3055244 L19.5848023%2c61.3055244 Z M32.2932616%2c46.3327701 C33.2396362%2c46.3327701 33.9606835%2c45.690753 33.9606835%2c44.7735859 C33.9606835%2c43.8334895 33.2396362%2c43.2144016 32.2932616%2c43.2144016 C31.3468869%2c43.2144016 30.6483723%2c43.8334895 30.6483723%2c44.7735859 C30.6483723%2c45.690753 31.3468869%2c46.3327701 32.2932616%2c46.3327701 Z M33.5776271%2c61.3055244 L33.5776271%2c48.6944756 L31.008896%2c48.6944756 L31.008896%2c61.3055244 L33.5776271%2c61.3055244 Z M40.0445204%2c61.3055244 L40.0445204%2c52.3631443 C41.1486241%2c51.2396145 41.9372696%2c50.6434559 43.0864388%2c50.6434559 C44.5510662%2c50.6434559 45.1819826%2c51.5147647 45.1819826%2c53.6930368 L45.1819826%2c61.3055244 L47.7732464%2c61.3055244 L47.7732464%2c53.3720282 C47.7732464%2c50.1619431 46.6015445%2c48.3734671 43.9652152%2c48.3734671 C42.2752605%2c48.3734671 41.0134277%2c49.3135634 39.8642585%2c50.4370932 L39.7966603%2c50.4370932 L39.5938658%2c48.6944756 L37.4757892%2c48.6944756 L37.4757892%2c61.3055244 L40.0445204%2c61.3055244 Z M55.7723653%2c66.9690318 C59.7381256%2c66.9690318 62.2617913%2c64.9971223 62.2617913%2c62.5666293 C62.2617913%2c60.4112864 60.7295657%2c59.4941192 57.8003109%2c59.4941192 L55.5245053%2c59.4941192 C53.9472142%2c59.4941192 53.4514942%2c59.0126064 53.4514942%2c58.2559435 C53.4514942%2c57.6597848 53.7218869%2c57.292918 54.1274761%2c56.9260511 C54.6682616%2c57.1782721 55.299178%2c57.3158471 55.8624962%2c57.3158471 C58.45376%2c57.3158471 60.5042384%2c55.7337337 60.5042384%2c52.9822322 C60.5042384%2c52.0192066 60.1662475%2c51.170827 59.6930601%2c50.666385 L62.0589967%2c50.666385 L62.0589967%2c48.6944756 L57.6651145%2c48.6944756 C57.1919272%2c48.5110421 56.5610108%2c48.3734671 55.8624962%2c48.3734671 C53.2937651%2c48.3734671 51.0630249%2c50.0472972 51.0630249%2c52.9134446 C51.0630249%2c54.4038413 51.8516704%2c55.5961587 52.6853814%2c56.2611049 L52.6853814%2c56.3528216 C52.0093995%2c56.8572636 51.3108849%2c57.7056432 51.3108849%2c58.6915979 C51.3108849%2c59.723411 51.806605%2c60.3883572 52.4375214%2c60.7781533 L52.4375214%2c60.8927992 C51.2883522%2c61.6036037 50.634903%2c62.5895585 50.634903%2c63.6443007 C50.634903%2c65.845502 52.798045%2c66.9690318 55.7723653%2c66.9690318 Z M55.8624962%2c55.6190879 C54.5781306%2c55.6190879 53.5190924%2c54.5872748 53.5190924%2c52.9134446 C53.5190924%2c51.1937562 54.5555979%2c50.2307306 55.8624962%2c50.2307306 C57.1693945%2c50.2307306 58.2059%2c51.2166854 58.2059%2c52.9134446 C58.2059%2c54.5872748 57.1468618%2c55.6190879 55.8624962%2c55.6190879 Z M56.1554217%2c65.2264141 C54.1049433%2c65.2264141 52.8431105%2c64.4926804 52.8431105%2c63.2545047 C52.8431105%2c62.6124877 53.1585687%2c61.9704706 53.9021488%2c61.4201703 C54.4204015%2c61.5348162 54.9837198%2c61.6036037 55.5695707%2c61.6036037 L57.4397872%2c61.6036037 C58.9494801%2c61.6036037 59.7606583%2c61.9246123 59.7606583%2c62.9793545 C59.7606583%2c64.1487427 58.3185637%2c65.2264141 56.1554217%2c65.2264141 Z M68.0752354%2c61.6036037 C71.4551447%2c61.6036037 72.8972394%2c59.1731107 72.8972394%2c56.146459 L72.8972394%2c44.4296482 L70.2834428%2c44.4296482 L70.2834428%2c55.894238 C70.2834428%2c58.3705894 69.4497318%2c59.2877566 67.7823099%2c59.2877566 C66.7007389%2c59.2877566 65.7994297%2c58.7603855 65.1009151%2c57.4534222 L63.2757641%2c58.8062438 C64.3122696%2c60.6635074 65.8444952%2c61.6036037 68.0752354%2c61.6036037 Z M81.910331%2c61.6036037 C85.5381004%2c61.6036037 87.7463079%2c59.4024025 87.7463079%2c56.6967593 C87.7463079%2c54.2204079 86.3267459%2c52.9822322 84.3663985%2c52.1338525 L82.0905929%2c51.1478978 C80.7386291%2c50.5975975 79.4091981%2c50.0472972 79.4091981%2c48.6027589 C79.4091981%2c47.2499373 80.5133018%2c46.4244868 82.2032565%2c46.4244868 C83.6678839%2c46.4244868 84.8170531%2c46.9977163 85.8535586%2c47.9378127 L87.2280551%2c46.2410534 C85.9662223%2c44.9340901 84.1410712%2c44.1086396 82.2032565%2c44.1086396 C79.0486744%2c44.1086396 76.7503361%2c46.1034783 76.7503361%2c48.7632631 C76.7503361%2c51.2166854 78.5304217%2c52.5007194 80.1302454%2c53.1885948 L82.4285838%2c54.1974787 C83.9608094%2c54.8853541 85.0874458%2c55.3668669 85.0874458%2c56.9031219 C85.0874458%2c58.3247311 83.9608094%2c59.2877566 81.9553965%2c59.2877566 C80.3555727%2c59.2877566 78.7332162%2c58.5081645 77.5389816%2c57.292918 L76.006756%2c59.1272523 C77.5164489%2c60.6864366 79.6345254%2c61.6036037 81.910331%2c61.6036037 Z M101.491273%2c61.6036037 C104.285331%2c61.6036037 106.831529%2c59.1272523 106.831529%2c54.7936374 C106.831529%2c50.918606 105.051444%2c48.3734671 101.919394%2c48.3734671 C100.612496%2c48.3734671 99.2830652%2c49.0842716 98.2240269%2c50.024368 L98.2916251%2c47.8690251 L98.2916251%2c43.0309682 L95.722894%2c43.0309682 L95.722894%2c61.3055244 L97.7508396%2c61.3055244 L97.9986996%2c59.9985612 L98.0662978%2c59.9985612 C99.1253361%2c61.0303743 100.364636%2c61.6036037 101.491273%2c61.6036037 Z M100.995553%2c59.4253317 C100.22944%2c59.4253317 99.2379997%2c59.1272523 98.2916251%2c58.2788727 L98.2916251%2c52.1109234 C99.3281306%2c51.0791103 100.274505%2c50.5746683 101.243413%2c50.5746683 C103.316424%2c50.5746683 104.150135%2c52.2026401 104.150135%2c54.8394957 C104.150135%2c57.7973599 102.798171%2c59.4253317 100.995553%2c59.4253317 Z M110.459299%2c66.5792357 C113.073095%2c66.5792357 114.379994%2c64.7678305 115.348901%2c62.0621873 L119.900512%2c48.6944756 L117.376847%2c48.6944756 L115.393966%2c55.1834334 L114.425059%2c58.7374563 L114.312395%2c58.7374563 C113.929339%2c57.5680681 113.546283%2c56.3069632 113.185759%2c55.1834334 L110.887421%2c48.6944756 L108.228559%2c48.6944756 L113.140694%2c61.2138077 L112.892834%2c62.0851165 C112.442179%2c63.4379381 111.653533%2c64.446822 110.30157%2c64.446822 C110.064976%2c64.446822 109.803033%2c64.3823337 109.591789%2c64.3210698 L109.400261%2c64.2633886 L109.400261%2c64.2633886 L108.904541%2c66.3270148 C109.332662%2c66.487519 109.828382%2c66.5792357 110.459299%2c66.5792357 Z M133.532813%2c61.6036037 C137.205648%2c61.6036037 139.684248%2c59.5629068 139.684248%2c54.0599036 L139.684248%2c44.4296482 L137.160583%2c44.4296482 L137.160583%2c54.2433371 C137.160583%2c58.0495809 135.628357%2c59.2877566 133.532813%2c59.2877566 C131.459802%2c59.2877566 129.972642%2c58.0495809 129.972642%2c54.2433371 L129.972642%2c44.4296482 L127.358846%2c44.4296482 L127.358846%2c54.0599036 C127.358846%2c59.5629068 129.859979%2c61.6036037 133.532813%2c61.6036037 Z M146.579264%2c61.3055244 L146.579264%2c44.4296482 L143.965467%2c44.4296482 L143.965467%2c61.3055244 L146.579264%2c61.3055244 Z M153.40668%2c61.3055244 L153.40668%2c53.3490991 C153.40668%2c51.5147647 153.203886%2c49.5657844 153.06869%2c47.8231668 L153.181353%2c47.8231668 L154.916373%2c51.3542604 L160.414359%2c61.3055244 L163.095754%2c61.3055244 L163.095754%2c44.4296482 L160.617154%2c44.4296482 L160.617154%2c52.2943568 C160.617154%2c54.1286912 160.819948%2c56.1693882 160.955145%2c57.9120058 L160.842481%2c57.9120058 L159.107461%2c54.3350538 L153.609475%2c44.4296482 L150.92808%2c44.4296482 L150.92808%2c61.3055244 L153.40668%2c61.3055244 Z M173.776268%2c61.6036037 C178.034953%2c61.6036037 181.009274%2c58.2330143 181.009274%2c52.7987988 C181.009274%2c47.3645832 178.034953%2c44.1086396 173.776268%2c44.1086396 C169.517582%2c44.1086396 166.565794%2c47.3645832 166.565794%2c52.7987988 C166.565794%2c58.2330143 169.517582%2c61.6036037 173.776268%2c61.6036037 Z M173.776268%2c59.2877566 C171.027275%2c59.2877566 169.247189%2c56.7655468 169.247189%2c52.7987988 C169.247189%2c48.8320507 171.027275%2c46.4244868 173.776268%2c46.4244868 C176.525261%2c46.4244868 178.327879%2c48.8320507 178.327879%2c52.7987988 C178.327879%2c56.7655468 176.525261%2c59.2877566 173.776268%2c59.2877566 Z' id='path-1'%3e%3c/path%3e %3cfilter x='-1.4%25' y='-14.6%25' width='105.6%25' height='137.6%25' filterUnits='objectBoundingBox' id='filter-2'%3e %3cfeOffset dx='3' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'%3e%3c/feOffset%3e %3cfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'%3e%3c/feGaussianBlur%3e %3cfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' type='matrix' in='shadowBlurOuter1'%3e%3c/feColorMatrix%3e %3c/filter%3e %3c/defs%3e %3cg id='%e6%b0%b4%e5%8d%b0' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='%e7%bc%96%e7%bb%84' transform='translate(150.000000%2c 107.000000)'%3e %3crect id='%e7%9f%a9%e5%bd%a2' x='0' y='0' width='182' height='109.716125'%3e%3c/rect%3e %3cg id='ThingJSbyUINO' opacity='0.05' fill-rule='nonzero' transform='translate(91.509274%2c 55.000000) rotate(-30.000000) translate(-91.509274%2c -55.000000) '%3e %3cuse fill='black' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3e%3c/use%3e %3cuse fill='white' xlink:href='%23path-1'%3e%3c/use%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";
let watermarkInst = null;
const watermarkModule = {
    ui: {
        mounted() {
            try {
                var e, t;
                void 0 !== this.isRootUI && !this.isRootUI || (e = this.el,
                t = this.config?.theme?.watermark?.src || img,
                (watermarkInst = new Watermark(e,t)).add())
            } catch (e) {
                console.error("水印添加失败", e)
            }
        },
        beforeDestroy() {
            try {
                (void 0 === this.isRootUI || this.isRootUI) && watermarkInst && watermarkInst.remove()
            } catch (e) {
                console.error("水印移除失败", e)
            }
        }
    }
};
UI.adapterManager.register("BaseAdapter", BaseAdapter),
UI.adapterManager.register("ConchAdapter", ConchAdapter)
