var g;
g || (g = typeof Module !== 'undefined' ? Module : {});
var aa = Object.assign({}, g), ba = [], ca = "./this.program", da = (a,b)=>{
    throw b;
}
, q = "", ea;
q = self.location.href;
q = 0 !== q.indexOf("blob:") ? q.substr(0, q.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
ea = a=>{
    var b = new XMLHttpRequest;
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response)
}
;
var fa = g.print || console.log.bind(console)
  , w = g.printErr || console.warn.bind(console);
Object.assign(g, aa);
aa = null;
g.arguments && (ba = g.arguments);
g.thisProgram && (ca = g.thisProgram);
g.quit && (da = g.quit);
var ha;
g.wasmBinary && (ha = g.wasmBinary);
var noExitRuntime = g.noExitRuntime || !0;
"object" != typeof WebAssembly && x("no native wasm support detected");
var ia, y = !1, ja, z, B, C, ka, D, E, la, ma;
function na() {
    var a = ia.buffer;
    g.HEAP8 = z = new Int8Array(a);
    g.HEAP16 = C = new Int16Array(a);
    g.HEAP32 = D = new Int32Array(a);
    g.HEAPU8 = B = new Uint8Array(a);
    g.HEAPU16 = ka = new Uint16Array(a);
    g.HEAPU32 = E = new Uint32Array(a);
    g.HEAPF32 = la = new Float32Array(a);
    g.HEAPF64 = ma = new Float64Array(a)
}
var oa, pa = [], qa = [], ra = [], sa = [], ta = !1;
function ua() {
    var a = g.preRun.shift();
    pa.unshift(a)
}
var F = 0
  , va = null
  , wa = null;
function x(a) {
    if (g.onAbort)
        g.onAbort(a);
    a = "Aborted(" + a + ")";
    w(a);
    y = !0;
    ja = 1;
    throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
}
function xa(a) {
    return a.startsWith("data:application/octet-stream;base64,")
}
var G;
G = "thing.wasm.worker.wasm";
if (!xa(G)) {
    var ya = G;
    G = g.locateFile ? g.locateFile(ya, q) : q + ya
}
function za(a) {
    try {
        if (a == G && ha)
            return new Uint8Array(ha);
        if (ea)
            return ea(a);
        throw "both async and sync fetching of the wasm failed";
    } catch (b) {
        x(b)
    }
}
function Aa(a) {
    return ha || "function" != typeof fetch ? Promise.resolve().then(function() {
        return za(a)
    }) : fetch(a, {
        credentials: "same-origin"
    }).then(function(b) {
        if (!b.ok)
            throw "failed to load wasm binary file at '" + a + "'";
        return b.arrayBuffer()
    }).catch(function() {
        return za(a)
    })
}
function Ba(a, b, c) {
    return Aa(a).then(function(d) {
        return WebAssembly.instantiate(d, b)
    }).then(function(d) {
        return d
    }).then(c, function(d) {
        w("failed to asynchronously prepare wasm: " + d);
        x(d)
    })
}
function Ca(a, b) {
    var c = G;
    ha || "function" != typeof WebAssembly.instantiateStreaming || xa(c) || "function" != typeof fetch ? Ba(c, a, b) : fetch(c, {
        credentials: "same-origin"
    }).then(function(d) {
        return WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
            w("wasm streaming compile failed: " + e);
            w("falling back to ArrayBuffer instantiation");
            return Ba(c, a, b)
        })
    })
}
function Da(a) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + a + ")";
    this.status = a
}
function Ea(a) {
    for (; 0 < a.length; )
        a.shift()(g)
}
var Fa = {};
function Ga(a) {
    for (; a.length; ) {
        var b = a.pop();
        a.pop()(b)
    }
}
function Ha(a) {
    return this.fromWireType(D[a >> 2])
}
var H = {}
  , I = {}
  , Ia = {};
function Ja(a) {
    if (void 0 === a)
        return "_unknown";
    a = a.replace(/[^a-zA-Z0-9_]/g, "$");
    var b = a.charCodeAt(0);
    return 48 <= b && 57 >= b ? "_" + a : a
}
function Ka(a, b) {
    a = Ja(a);
    return {
        [a]: function() {
            return b.apply(this, arguments)
        }
    }[a]
}
function La(a) {
    var b = Error
      , c = Ka(a, function(d) {
        this.name = a;
        this.message = d;
        d = Error(d).stack;
        void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""))
    });
    c.prototype = Object.create(b.prototype);
    c.prototype.constructor = c;
    c.prototype.toString = function() {
        return void 0 === this.message ? this.name : this.name + ": " + this.message
    }
    ;
    return c
}
var Ma = void 0;
function Na(a) {
    throw new Ma(a);
}
function J(a, b, c) {
    function d(k) {
        k = c(k);
        k.length !== a.length && Na("Mismatched type converter count");
        for (var m = 0; m < a.length; ++m)
            K(a[m], k[m])
    }
    a.forEach(function(k) {
        Ia[k] = b
    });
    var e = Array(b.length)
      , f = []
      , l = 0;
    b.forEach((k,m)=>{
        I.hasOwnProperty(k) ? e[m] = I[k] : (f.push(k),
        H.hasOwnProperty(k) || (H[k] = []),
        H[k].push(()=>{
            e[m] = I[k];
            ++l;
            l === f.length && d(e)
        }
        ))
    }
    );
    0 === f.length && d(e)
}
function Oa(a) {
    switch (a) {
    case 1:
        return 0;
    case 2:
        return 1;
    case 4:
        return 2;
    case 8:
        return 3;
    default:
        throw new TypeError("Unknown type size: " + a);
    }
}
var Pa = void 0;
function M(a) {
    for (var b = ""; B[a]; )
        b += Pa[B[a++]];
    return b
}
var N = void 0;
function P(a) {
    throw new N(a);
}
function K(a, b, c={}) {
    if (!("argPackAdvance"in b))
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var d = b.name;
    a || P('type "' + d + '" must have a positive integer typeid pointer');
    if (I.hasOwnProperty(a)) {
        if (c.kb)
            return;
        P("Cannot register type '" + d + "' twice")
    }
    I[a] = b;
    delete Ia[a];
    H.hasOwnProperty(a) && (b = H[a],
    delete H[a],
    b.forEach(e=>e()))
}
function Qa(a) {
    P(a.oa.ra.pa.name + " instance already deleted")
}
var Ra = !1;
function Sa() {}
function Ta(a) {
    --a.count.value;
    0 === a.count.value && (a.ta ? a.va.ya(a.ta) : a.ra.pa.ya(a.qa))
}
function Ua(a, b, c) {
    if (b === c)
        return a;
    if (void 0 === c.wa)
        return null;
    a = Ua(a, b, c.wa);
    return null === a ? null : c.bb(a)
}
var Va = {}
  , Wa = [];
function Xa() {
    for (; Wa.length; ) {
        var a = Wa.pop();
        a.oa.Ea = !1;
        a["delete"]()
    }
}
var Ya = void 0
  , Za = {};
function $a(a, b) {
    for (void 0 === b && P("ptr should not be undefined"); a.wa; )
        b = a.Ha(b),
        a = a.wa;
    return Za[b]
}
function ab(a, b) {
    b.ra && b.qa || Na("makeClassHandle requires ptr and ptrType");
    !!b.va !== !!b.ta && Na("Both smartPtrType and smartPtr must be specified");
    b.count = {
        value: 1
    };
    return bb(Object.create(a, {
        oa: {
            value: b
        }
    }))
}
function bb(a) {
    if ("undefined" === typeof FinalizationRegistry)
        return bb = b=>b,
        a;
    Ra = new FinalizationRegistry(b=>{
        Ta(b.oa)
    }
    );
    bb = b=>{
        var c = b.oa;
        c.ta && Ra.register(b, {
            oa: c
        }, b);
        return b
    }
    ;
    Sa = b=>{
        Ra.unregister(b)
    }
    ;
    return bb(a)
}
function Q() {}
function cb(a, b, c) {
    if (void 0 === a[b].sa) {
        var d = a[b];
        a[b] = function() {
            a[b].sa.hasOwnProperty(arguments.length) || P("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].sa + ")!");
            return a[b].sa[arguments.length].apply(this, arguments)
        }
        ;
        a[b].sa = [];
        a[b].sa[d.Da] = d
    }
}
function db(a, b) {
    g.hasOwnProperty(a) ? (P("Cannot register public name '" + a + "' twice"),
    cb(g, a, a),
    g.hasOwnProperty(void 0) && P("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"),
    g[a].sa[void 0] = b) : g[a] = b
}
function eb(a, b, c, d, e, f, l, k) {
    this.name = a;
    this.constructor = b;
    this.Fa = c;
    this.ya = d;
    this.wa = e;
    this.eb = f;
    this.Ha = l;
    this.bb = k;
    this.nb = []
}
function fb(a, b, c) {
    for (; b !== c; )
        b.Ha || P("Expected null or instance of " + c.name + ", got an instance of " + b.name),
        a = b.Ha(a),
        b = b.wa;
    return a
}
function gb(a, b) {
    if (null === b)
        return this.Pa && P("null is not a valid " + this.name),
        0;
    b.oa || P('Cannot pass "' + hb(b) + '" as a ' + this.name);
    b.oa.qa || P("Cannot pass deleted object as a pointer of type " + this.name);
    return fb(b.oa.qa, b.oa.ra.pa, this.pa)
}
function ib(a, b) {
    if (null === b) {
        this.Pa && P("null is not a valid " + this.name);
        if (this.Ka) {
            var c = this.Qa();
            null !== a && a.push(this.ya, c);
            return c
        }
        return 0
    }
    b.oa || P('Cannot pass "' + hb(b) + '" as a ' + this.name);
    b.oa.qa || P("Cannot pass deleted object as a pointer of type " + this.name);
    !this.Ja && b.oa.ra.Ja && P("Cannot convert argument of type " + (b.oa.va ? b.oa.va.name : b.oa.ra.name) + " to parameter type " + this.name);
    c = fb(b.oa.qa, b.oa.ra.pa, this.pa);
    if (this.Ka)
        switch (void 0 === b.oa.ta && P("Passing raw pointer to smart pointer is illegal"),
        this.vb) {
        case 0:
            b.oa.va === this ? c = b.oa.ta : P("Cannot convert argument of type " + (b.oa.va ? b.oa.va.name : b.oa.ra.name) + " to parameter type " + this.name);
            break;
        case 1:
            c = b.oa.ta;
            break;
        case 2:
            if (b.oa.va === this)
                c = b.oa.ta;
            else {
                var d = b.clone();
                c = this.qb(c, R(function() {
                    d["delete"]()
                }));
                null !== a && a.push(this.ya, c)
            }
            break;
        default:
            P("Unsupporting sharing policy")
        }
    return c
}
function jb(a, b) {
    if (null === b)
        return this.Pa && P("null is not a valid " + this.name),
        0;
    b.oa || P('Cannot pass "' + hb(b) + '" as a ' + this.name);
    b.oa.qa || P("Cannot pass deleted object as a pointer of type " + this.name);
    b.oa.ra.Ja && P("Cannot convert argument of type " + b.oa.ra.name + " to parameter type " + this.name);
    return fb(b.oa.qa, b.oa.ra.pa, this.pa)
}
function S(a, b, c, d) {
    this.name = a;
    this.pa = b;
    this.Pa = c;
    this.Ja = d;
    this.Ka = !1;
    this.ya = this.qb = this.Qa = this.Za = this.vb = this.mb = void 0;
    void 0 !== b.wa ? this.toWireType = ib : (this.toWireType = d ? gb : jb,
    this.ua = null)
}
function kb(a, b) {
    g.hasOwnProperty(a) || Na("Replacing nonexistant public symbol");
    g[a] = b;
    g[a].Da = void 0
}
var lb = [];
function mb(a) {
    var b = lb[a];
    b || (a >= lb.length && (lb.length = a + 1),
    lb[a] = b = oa.get(a));
    return b
}
function nb(a, b) {
    var c = [];
    return function() {
        c.length = 0;
        Object.assign(c, arguments);
        if (a.includes("j")) {
            var d = g["dynCall_" + a];
            d = c && c.length ? d.apply(null, [b].concat(c)) : d.call(null, b)
        } else
            d = mb(b).apply(null, c);
        return d
    }
}
function T(a, b) {
    a = M(a);
    var c = a.includes("j") ? nb(a, b) : mb(b);
    "function" != typeof c && P("unknown function pointer with signature " + a + ": " + b);
    return c
}
var ob = void 0;
function pb(a) {
    a = qb(a);
    var b = M(a);
    U(a);
    return b
}
function rb(a, b) {
    function c(f) {
        e[f] || I[f] || (Ia[f] ? Ia[f].forEach(c) : (d.push(f),
        e[f] = !0))
    }
    var d = []
      , e = {};
    b.forEach(c);
    throw new ob(a + ": " + d.map(pb).join([", "]));
}
function sb(a) {
    var b = Function;
    if (!(b instanceof Function))
        throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
    var c = Ka(b.name || "unknownFunctionName", function() {});
    c.prototype = b.prototype;
    c = new c;
    a = b.apply(c, a);
    return a instanceof Object ? a : c
}
function tb(a, b, c, d, e, f) {
    var l = b.length;
    2 > l && P("argTypes array size mismatch! Must at least get return value and 'this' types!");
    var k = null !== b[1] && null !== c
      , m = !1;
    for (c = 1; c < b.length; ++c)
        if (null !== b[c] && void 0 === b[c].ua) {
            m = !0;
            break
        }
    var n = "void" !== b[0].name
      , p = ""
      , t = "";
    for (c = 0; c < l - 2; ++c)
        p += (0 !== c ? ", " : "") + "arg" + c,
        t += (0 !== c ? ", " : "") + "arg" + c + "Wired";
    a = "return function " + Ja(a) + "(" + p + ") {\nif (arguments.length !== " + (l - 2) + ") {\nthrowBindingError('function " + a + " called with ' + arguments.length + ' arguments, expected " + (l - 2) + " args!');\n}\n";
    m && (a += "var destructors = [];\n");
    var v = m ? "destructors" : "null";
    p = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
    d = [P, d, e, Ga, b[0], b[1]];
    k && (a += "var thisWired = classParam.toWireType(" + v + ", this);\n");
    for (c = 0; c < l - 2; ++c)
        a += "var arg" + c + "Wired = argType" + c + ".toWireType(" + v + ", arg" + c + "); // " + b[c + 2].name + "\n",
        p.push("argType" + c),
        d.push(b[c + 2]);
    k && (t = "thisWired" + (0 < t.length ? ", " : "") + t);
    a += (n || f ? "var rv = " : "") + "invoker(fn" + (0 < t.length ? ", " : "") + t + ");\n";
    if (m)
        a += "runDestructors(destructors);\n";
    else
        for (c = k ? 1 : 2; c < b.length; ++c)
            f = 1 === c ? "thisWired" : "arg" + (c - 2) + "Wired",
            null !== b[c].ua && (a += f + "_dtor(" + f + "); // " + b[c].name + "\n",
            p.push(f + "_dtor"),
            d.push(b[c].ua));
    n && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
    p.push(a + "}\n");
    return sb(p).apply(null, d)
}
function ub(a, b) {
    for (var c = [], d = 0; d < a; d++)
        c.push(E[b + 4 * d >> 2]);
    return c
}
var V = new function() {
    this.za = [void 0];
    this.Xa = [];
    this.get = function(a) {
        return this.za[a]
    }
    ;
    this.pb = function(a) {
        let b = this.Xa.pop() || this.za.length;
        this.za[b] = a;
        return b
    }
    ;
    this.rb = function(a) {
        this.za[a] = void 0;
        this.Xa.push(a)
    }
}
;
function vb(a) {
    a >= V.Ya && 0 === --V.get(a).$a && V.rb(a)
}
var W = a=>{
    a || P("Cannot use deleted val. handle = " + a);
    return V.get(a).value
}
  , R = a=>{
    switch (a) {
    case void 0:
        return 1;
    case null:
        return 2;
    case !0:
        return 3;
    case !1:
        return 4;
    default:
        return V.pb({
            $a: 1,
            value: a
        })
    }
}
;
function wb(a, b, c) {
    switch (b) {
    case 0:
        return function(d) {
            return this.fromWireType((c ? z : B)[d])
        }
        ;
    case 1:
        return function(d) {
            return this.fromWireType((c ? C : ka)[d >> 1])
        }
        ;
    case 2:
        return function(d) {
            return this.fromWireType((c ? D : E)[d >> 2])
        }
        ;
    default:
        throw new TypeError("Unknown integer type: " + a);
    }
}
function xb(a, b) {
    var c = I[a];
    void 0 === c && P(b + " has unknown type " + pb(a));
    return c
}
function hb(a) {
    if (null === a)
        return "null";
    var b = typeof a;
    return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
}
function yb(a, b) {
    switch (b) {
    case 2:
        return function(c) {
            return this.fromWireType(la[c >> 2])
        }
        ;
    case 3:
        return function(c) {
            return this.fromWireType(ma[c >> 3])
        }
        ;
    default:
        throw new TypeError("Unknown float type: " + a);
    }
}
function zb(a, b, c) {
    switch (b) {
    case 0:
        return c ? function(d) {
            return z[d]
        }
        : function(d) {
            return B[d]
        }
        ;
    case 1:
        return c ? function(d) {
            return C[d >> 1]
        }
        : function(d) {
            return ka[d >> 1]
        }
        ;
    case 2:
        return c ? function(d) {
            return D[d >> 2]
        }
        : function(d) {
            return E[d >> 2]
        }
        ;
    default:
        throw new TypeError("Unknown integer type: " + a);
    }
}
function Ab(a, b, c, d) {
    if (0 < d) {
        d = c + d - 1;
        for (var e = 0; e < a.length; ++e) {
            var f = a.charCodeAt(e);
            if (55296 <= f && 57343 >= f) {
                var l = a.charCodeAt(++e);
                f = 65536 + ((f & 1023) << 10) | l & 1023
            }
            if (127 >= f) {
                if (c >= d)
                    break;
                b[c++] = f
            } else {
                if (2047 >= f) {
                    if (c + 1 >= d)
                        break;
                    b[c++] = 192 | f >> 6
                } else {
                    if (65535 >= f) {
                        if (c + 2 >= d)
                            break;
                        b[c++] = 224 | f >> 12
                    } else {
                        if (c + 3 >= d)
                            break;
                        b[c++] = 240 | f >> 18;
                        b[c++] = 128 | f >> 12 & 63
                    }
                    b[c++] = 128 | f >> 6 & 63
                }
                b[c++] = 128 | f & 63
            }
        }
        b[c] = 0
    }
}
function Bb(a) {
    for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4,
        ++c) : b += 3
    }
    return b
}
var Cb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function X(a, b, c) {
    var d = b + c;
    for (c = b; a[c] && !(c >= d); )
        ++c;
    if (16 < c - b && a.buffer && Cb)
        return Cb.decode(a.subarray(b, c));
    for (d = ""; b < c; ) {
        var e = a[b++];
        if (e & 128) {
            var f = a[b++] & 63;
            if (192 == (e & 224))
                d += String.fromCharCode((e & 31) << 6 | f);
            else {
                var l = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | l : (e & 7) << 18 | f << 12 | l << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536,
                d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023))
            }
        } else
            d += String.fromCharCode(e)
    }
    return d
}
var Db = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
function Eb(a, b) {
    var c = a >> 1;
    for (var d = c + b / 2; !(c >= d) && ka[c]; )
        ++c;
    c <<= 1;
    if (32 < c - a && Db)
        return Db.decode(B.subarray(a, c));
    c = "";
    for (d = 0; !(d >= b / 2); ++d) {
        var e = C[a + 2 * d >> 1];
        if (0 == e)
            break;
        c += String.fromCharCode(e)
    }
    return c
}
function Fb(a, b, c) {
    void 0 === c && (c = 2147483647);
    if (2 > c)
        return 0;
    c -= 2;
    var d = b;
    c = c < 2 * a.length ? c / 2 : a.length;
    for (var e = 0; e < c; ++e)
        C[b >> 1] = a.charCodeAt(e),
        b += 2;
    C[b >> 1] = 0;
    return b - d
}
function Gb(a) {
    return 2 * a.length
}
function Hb(a, b) {
    for (var c = 0, d = ""; !(c >= b / 4); ) {
        var e = D[a + 4 * c >> 2];
        if (0 == e)
            break;
        ++c;
        65536 <= e ? (e -= 65536,
        d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e)
    }
    return d
}
function Ib(a, b, c) {
    void 0 === c && (c = 2147483647);
    if (4 > c)
        return 0;
    var d = b;
    c = d + c - 4;
    for (var e = 0; e < a.length; ++e) {
        var f = a.charCodeAt(e);
        if (55296 <= f && 57343 >= f) {
            var l = a.charCodeAt(++e);
            f = 65536 + ((f & 1023) << 10) | l & 1023
        }
        D[b >> 2] = f;
        b += 4;
        if (b + 4 > c)
            break
    }
    D[b >> 2] = 0;
    return b - d
}
function Jb(a) {
    for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4
    }
    return b
}
function Kb(a, b) {
    for (var c = Array(a), d = 0; d < a; ++d)
        c[d] = xb(E[b + 4 * d >> 2], "parameter " + d);
    return c
}
var Lb = {};
function Mb(a) {
    var b = Lb[a];
    return void 0 === b ? M(a) : b
}
var Nb = [];
function Ob() {
    return "object" == typeof globalThis ? globalThis : Function("return this")()
}
function Pb(a) {
    var b = Nb.length;
    Nb.push(a);
    return b
}
var Qb = [];
function Rb(a) {
    for (var b = "", c = 0; c < a; ++c)
        b += (0 !== c ? ", " : "") + "arg" + c;
    var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
    for (c = 0; c < a; ++c)
        d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
    return (new Function("requireRegisteredType","Module","valueToHandle","getMemory",d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n")))(xb, g, R, ()=>E)
}
var Sb = {};
function Tb(a) {
    return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
}
var Ub = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
  , Vb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function Wb(a) {
    return (Tb(a.getFullYear()) ? Ub : Vb)[a.getMonth()] + a.getDate() - 1
}
function Xb(a) {
    var b = Bb(a) + 1
      , c = Yb(b);
    c && Ab(a, B, c, b);
    return c
}
function Zb(a, b) {
    $b = a;
    ac = b;
    if (bc)
        if (cc || (cc = !0),
        0 == a)
            Y = function() {
                var d = Math.max(0, dc + b - ec()) | 0;
                setTimeout(fc, d)
            }
            ;
        else if (1 == a)
            Y = function() {
                gc(fc)
            }
            ;
        else if (2 == a) {
            if ("undefined" == typeof setImmediate) {
                var c = [];
                addEventListener("message", d=>{
                    if ("setimmediate" === d.data || "setimmediate" === d.data.target)
                        d.stopPropagation(),
                        c.shift()()
                }
                , !0);
                setImmediate = function(d) {
                    c.push(d);
                    void 0 === g.setImmediates && (g.setImmediates = []);
                    g.setImmediates.push(d);
                    postMessage({
                        target: "setimmediate"
                    })
                }
            }
            Y = function() {
                setImmediate(fc)
            }
        }
}
var ec;
ec = ()=>performance.now();
function hc(a, b, c, d, e) {
    !bc || x("emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    bc = a;
    ic = d;
    var f = Z;
    cc = !1;
    fc = function() {
        if (!y)
            if (0 < jc.length) {
                var l = Date.now()
                  , k = jc.shift();
                k.Oa(k.Na);
                if (kc) {
                    var m = kc
                      , n = 0 == m % 1 ? m - 1 : Math.floor(m);
                    kc = k.Cb ? n : (8 * m + (n + .5)) / 9
                }
                fa('main loop blocker "' + k.name + '" took ' + (Date.now() - l) + " ms");
                g.setStatus && (l = g.statusMessage || "Please wait...",
                k = kc,
                m = lc.Eb,
                k ? k < m ? g.setStatus(l + " (" + (m - k) + "/" + m + ")") : g.setStatus(l) : g.setStatus(""));
                f < Z || setTimeout(fc, 0)
            } else
                f < Z || (mc = mc + 1 | 0,
                1 == $b && 1 < ac && 0 != mc % ac ? Y() : (0 == $b && (dc = ec()),
                y || g.preMainLoop && !1 === g.preMainLoop() || (nc(a),
                g.postMainLoop && g.postMainLoop()),
                f < Z || ("object" == typeof SDL && SDL.audio && SDL.audio.ob && SDL.audio.ob(),
                Y())))
    }
    ;
    e || (b && 0 < b ? Zb(0, 1E3 / b) : Zb(1, 1),
    Y());
    if (c)
        throw "unwind";
}
function oc(a) {
    a instanceof Da || "unwind" == a || da(1, a)
}
function pc(a) {
    ja = ja = a;
    if (!noExitRuntime) {
        if (g.onExit)
            g.onExit(a);
        y = !0
    }
    da(a, new Da(a))
}
function nc(a) {
    if (!y)
        try {
            if (a(),
            !noExitRuntime)
                try {
                    pc(ja)
                } catch (b) {
                    oc(b)
                }
        } catch (b) {
            oc(b)
        }
}
function qc(a) {
    setTimeout(function() {
        nc(a)
    }, 1E4)
}
function rc(a) {
    uc || (uc = {});
    uc[a] || (uc[a] = 1,
    w(a))
}
var uc, cc = !1, Y = null, Z = 0, bc = null, ic = 0, $b = 0, ac = 0, mc = 0, jc = [];
function vc() {
    Z++;
    var a = $b
      , b = ac
      , c = bc;
    bc = null;
    hc(c, 0, !1, ic, !0);
    Zb(a, b);
    Y()
}
var lc = {}, dc, fc, kc, wc = !1, xc = !1, yc = [], zc = [];
function Ac() {
    function a() {
        xc = document.pointerLockElement === g.canvas || document.mozPointerLockElement === g.canvas || document.webkitPointerLockElement === g.canvas || document.msPointerLockElement === g.canvas
    }
    g.preloadPlugins || (g.preloadPlugins = []);
    if (!Bc) {
        Bc = !0;
        try {
            Cc = !0
        } catch (c) {
            Cc = !1,
            w("warning: no blob constructor, cannot create blobs with mimetypes")
        }
        Dc = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Cc ? null : w("warning: no BlobBuilder");
        Ec = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0;
        g.Wa || "undefined" != typeof Ec || (w("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."),
        g.Wa = !0);
        g.preloadPlugins.push({
            canHandle: function(c) {
                return !g.Wa && /\.(jpg|jpeg|png|bmp)$/i.test(c)
            },
            handle: function(c, d, e, f) {
                var l = null;
                if (Cc)
                    try {
                        l = new Blob([c],{
                            type: Fc(d)
                        }),
                        l.size !== c.length && (l = new Blob([(new Uint8Array(c)).buffer],{
                            type: Fc(d)
                        }))
                    } catch (n) {
                        rc("Blob constructor present but fails: " + n + "; falling back to blob builder")
                    }
                l || (l = new Dc,
                l.append((new Uint8Array(c)).buffer),
                l = l.getBlob());
                var k = Ec.createObjectURL(l)
                  , m = new Image;
                m.onload = ()=>{
                    m.complete || x("Image " + d + " could not be decoded");
                    var n = document.createElement("canvas");
                    n.width = m.width;
                    n.height = m.height;
                    n.getContext("2d").drawImage(m, 0, 0);
                    Ec.revokeObjectURL(k);
                    e && e(c)
                }
                ;
                m.onerror = ()=>{
                    fa("Image " + k + " could not be decoded");
                    f && f()
                }
                ;
                m.src = k
            }
        });
        g.preloadPlugins.push({
            canHandle: function(c) {
                return !g.Hb && c.substr(-4)in {
                    ".ogg": 1,
                    ".wav": 1,
                    ".mp3": 1
                }
            },
            handle: function(c, d, e, f) {
                function l() {
                    m || (m = !0,
                    e && e(c))
                }
                function k() {
                    m || (m = !0,
                    new Audio,
                    f && f())
                }
                var m = !1;
                if (Cc) {
                    try {
                        var n = new Blob([c],{
                            type: Fc(d)
                        })
                    } catch (t) {
                        return k()
                    }
                    n = Ec.createObjectURL(n);
                    var p = new Audio;
                    p.addEventListener("canplaythrough", ()=>l(p), !1);
                    p.onerror = function() {
                        if (!m) {
                            w("warning: browser could not fully decode audio " + d + ", trying slower base64 approach");
                            for (var t = "", v = 0, h = 0, r = 0; r < c.length; r++)
                                for (v = v << 8 | c[r],
                                h += 8; 6 <= h; ) {
                                    var u = v >> h - 6 & 63;
                                    h -= 6;
                                    t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u]
                                }
                            2 == h ? (t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(v & 3) << 4],
                            t += "==") : 4 == h && (t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(v & 15) << 2],
                            t += "=");
                            p.src = "data:audio/x-" + d.substr(-3) + ";base64," + t;
                            l(p)
                        }
                    }
                    ;
                    p.src = n;
                    qc(function() {
                        l(p)
                    })
                } else
                    return k()
            }
        });
        var b = g.canvas;
        b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || (()=>{}
        ),
        b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || (()=>{}
        ),
        b.exitPointerLock = b.exitPointerLock.bind(document),
        document.addEventListener("pointerlockchange", a, !1),
        document.addEventListener("mozpointerlockchange", a, !1),
        document.addEventListener("webkitpointerlockchange", a, !1),
        document.addEventListener("mspointerlockchange", a, !1),
        g.elementPointerLock && b.addEventListener("click", c=>{
            !xc && g.canvas.requestPointerLock && (g.canvas.requestPointerLock(),
            c.preventDefault())
        }
        , !1))
    }
}
function Gc(a, b, c, d) {
    if (b && g.Ta && a == g.canvas)
        return g.Ta;
    var e;
    if (b) {
        var f = {
            antialias: !1,
            alpha: !1,
            Fb: 1
        };
        if (d)
            for (var l in d)
                f[l] = d[l];
        if ("undefined" != typeof GL && (e = GL.Db(a, f)))
            var k = GL.getContext(e).Bb
    } else
        k = a.getContext("2d");
    if (!k)
        return null;
    c && (b || "undefined" == typeof GLctx || x("cannot set in module if GLctx is used, but we are a non-GL context that would replace it"),
    g.Ta = k,
    b && GL.Gb(e),
    g.Jb = b,
    yc.forEach(function(m) {
        m()
    }),
    Ac());
    return k
}
var Hc = !1
  , Ic = void 0
  , Jc = void 0;
function Kc(a, b) {
    function c() {
        wc = !1;
        var f = d.parentNode;
        (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === f ? (d.exitFullscreen = Lc,
        Ic && d.requestPointerLock(),
        wc = !0,
        Jc ? ("undefined" != typeof SDL && (D[SDL.screen >> 2] = E[SDL.screen >> 2] | 8388608),
        Mc(g.canvas),
        Nc()) : Mc(d)) : (f.parentNode.insertBefore(d, f),
        f.parentNode.removeChild(f),
        Jc ? ("undefined" != typeof SDL && (D[SDL.screen >> 2] = E[SDL.screen >> 2] & -8388609),
        Mc(g.canvas),
        Nc()) : Mc(d));
        if (g.onFullScreen)
            g.onFullScreen(wc);
        if (g.onFullscreen)
            g.onFullscreen(wc)
    }
    Ic = a;
    Jc = b;
    "undefined" == typeof Ic && (Ic = !0);
    "undefined" == typeof Jc && (Jc = !1);
    var d = g.canvas;
    Hc || (Hc = !0,
    document.addEventListener("fullscreenchange", c, !1),
    document.addEventListener("mozfullscreenchange", c, !1),
    document.addEventListener("webkitfullscreenchange", c, !1),
    document.addEventListener("MSFullscreenChange", c, !1));
    var e = document.createElement("div");
    d.parentNode.insertBefore(e, d);
    e.appendChild(d);
    e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || (e.webkitRequestFullscreen ? ()=>e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (e.webkitRequestFullScreen ? ()=>e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null);
    e.requestFullscreen()
}
function Lc() {
    if (!wc)
        return !1;
    (document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}
    ).apply(document, []);
    return !0
}
var Oc = 0;
function gc(a) {
    if ("function" == typeof requestAnimationFrame)
        requestAnimationFrame(a);
    else {
        var b = Date.now();
        if (0 === Oc)
            Oc = b + 1E3 / 60;
        else
            for (; b + 2 >= Oc; )
                Oc += 1E3 / 60;
        setTimeout(a, Math.max(Oc - b, 0))
    }
}
function Fc(a) {
    return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg"
    }[a.substr(a.lastIndexOf(".") + 1)]
}
var Pc = [];
function Nc() {
    var a = g.canvas;
    Pc.forEach(function(b) {
        b(a.width, a.height)
    })
}
function Mc(a, b, c) {
    b && c ? (a.Ab = b,
    a.jb = c) : (b = a.Ab,
    c = a.jb);
    var d = b
      , e = c;
    g.forcedAspectRatio && 0 < g.forcedAspectRatio && (d / e < g.forcedAspectRatio ? d = Math.round(e * g.forcedAspectRatio) : e = Math.round(d / g.forcedAspectRatio));
    if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
        var f = Math.min(screen.width / d, screen.height / e);
        d = Math.round(d * f);
        e = Math.round(e * f)
    }
    Jc ? (a.width != d && (a.width = d),
    a.height != e && (a.height = e),
    "undefined" != typeof a.style && (a.style.removeProperty("width"),
    a.style.removeProperty("height"))) : (a.width != b && (a.width = b),
    a.height != c && (a.height = c),
    "undefined" != typeof a.style && (d != b || e != c ? (a.style.setProperty("width", d + "px", "important"),
    a.style.setProperty("height", e + "px", "important")) : (a.style.removeProperty("width"),
    a.style.removeProperty("height"))))
}
var Bc, Cc, Dc, Ec, Qc = {};
function Rc() {
    if (!Sc) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
            _: ca || "./this.program"
        }, b;
        for (b in Qc)
            void 0 === Qc[b] ? delete a[b] : a[b] = Qc[b];
        var c = [];
        for (b in a)
            c.push(b + "=" + a[b]);
        Sc = c
    }
    return Sc
}
var Sc, Tc = [null, [], []];
function Uc() {
    if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues)
        return a=>crypto.getRandomValues(a);
    x("initRandomDevice")
}
function Vc(a) {
    return (Vc = Uc())(a)
}
var Wc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  , Xc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Yc(a) {
    var b = Array(Bb(a) + 1);
    Ab(a, b, 0, b.length);
    return b
}
function Zc(a, b, c, d) {
    function e(h, r, u) {
        for (h = "number" == typeof h ? h.toString() : h || ""; h.length < r; )
            h = u[0] + h;
        return h
    }
    function f(h, r) {
        return e(h, r, "0")
    }
    function l(h, r) {
        function u(O) {
            return 0 > O ? -1 : 0 < O ? 1 : 0
        }
        var A;
        0 === (A = u(h.getFullYear() - r.getFullYear())) && 0 === (A = u(h.getMonth() - r.getMonth())) && (A = u(h.getDate() - r.getDate()));
        return A
    }
    function k(h) {
        switch (h.getDay()) {
        case 0:
            return new Date(h.getFullYear() - 1,11,29);
        case 1:
            return h;
        case 2:
            return new Date(h.getFullYear(),0,3);
        case 3:
            return new Date(h.getFullYear(),0,2);
        case 4:
            return new Date(h.getFullYear(),0,1);
        case 5:
            return new Date(h.getFullYear() - 1,11,31);
        case 6:
            return new Date(h.getFullYear() - 1,11,30)
        }
    }
    function m(h) {
        var r = h.Ba;
        for (h = new Date((new Date(h.Ca + 1900,0,1)).getTime()); 0 < r; ) {
            var u = h.getMonth()
              , A = (Tb(h.getFullYear()) ? Wc : Xc)[u];
            if (r > A - h.getDate())
                r -= A - h.getDate() + 1,
                h.setDate(1),
                11 > u ? h.setMonth(u + 1) : (h.setMonth(0),
                h.setFullYear(h.getFullYear() + 1));
            else {
                h.setDate(h.getDate() + r);
                break
            }
        }
        u = new Date(h.getFullYear() + 1,0,4);
        r = k(new Date(h.getFullYear(),0,4));
        u = k(u);
        return 0 >= l(r, h) ? 0 >= l(u, h) ? h.getFullYear() + 1 : h.getFullYear() : h.getFullYear() - 1
    }
    var n = D[d + 40 >> 2];
    d = {
        yb: D[d >> 2],
        xb: D[d + 4 >> 2],
        La: D[d + 8 >> 2],
        Ra: D[d + 12 >> 2],
        Ma: D[d + 16 >> 2],
        Ca: D[d + 20 >> 2],
        xa: D[d + 24 >> 2],
        Ba: D[d + 28 >> 2],
        Ib: D[d + 32 >> 2],
        wb: D[d + 36 >> 2],
        zb: n ? n ? X(B, n) : "" : ""
    };
    c = c ? X(B, c) : "";
    n = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
    };
    for (var p in n)
        c = c.replace(new RegExp(p,"g"), n[p]);
    var t = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
      , v = "January February March April May June July August September October November December".split(" ");
    n = {
        "%a": function(h) {
            return t[h.xa].substring(0, 3)
        },
        "%A": function(h) {
            return t[h.xa]
        },
        "%b": function(h) {
            return v[h.Ma].substring(0, 3)
        },
        "%B": function(h) {
            return v[h.Ma]
        },
        "%C": function(h) {
            return f((h.Ca + 1900) / 100 | 0, 2)
        },
        "%d": function(h) {
            return f(h.Ra, 2)
        },
        "%e": function(h) {
            return e(h.Ra, 2, " ")
        },
        "%g": function(h) {
            return m(h).toString().substring(2)
        },
        "%G": function(h) {
            return m(h)
        },
        "%H": function(h) {
            return f(h.La, 2)
        },
        "%I": function(h) {
            h = h.La;
            0 == h ? h = 12 : 12 < h && (h -= 12);
            return f(h, 2)
        },
        "%j": function(h) {
            for (var r = 0, u = 0; u <= h.Ma - 1; r += (Tb(h.Ca + 1900) ? Wc : Xc)[u++])
                ;
            return f(h.Ra + r, 3)
        },
        "%m": function(h) {
            return f(h.Ma + 1, 2)
        },
        "%M": function(h) {
            return f(h.xb, 2)
        },
        "%n": function() {
            return "\n"
        },
        "%p": function(h) {
            return 0 <= h.La && 12 > h.La ? "AM" : "PM"
        },
        "%S": function(h) {
            return f(h.yb, 2)
        },
        "%t": function() {
            return "\t"
        },
        "%u": function(h) {
            return h.xa || 7
        },
        "%U": function(h) {
            return f(Math.floor((h.Ba + 7 - h.xa) / 7), 2)
        },
        "%V": function(h) {
            var r = Math.floor((h.Ba + 7 - (h.xa + 6) % 7) / 7);
            2 >= (h.xa + 371 - h.Ba - 2) % 7 && r++;
            if (r)
                53 == r && (u = (h.xa + 371 - h.Ba) % 7,
                4 == u || 3 == u && Tb(h.Ca) || (r = 1));
            else {
                r = 52;
                var u = (h.xa + 7 - h.Ba - 1) % 7;
                (4 == u || 5 == u && Tb(h.Ca % 400 - 1)) && r++
            }
            return f(r, 2)
        },
        "%w": function(h) {
            return h.xa
        },
        "%W": function(h) {
            return f(Math.floor((h.Ba + 7 - (h.xa + 6) % 7) / 7), 2)
        },
        "%y": function(h) {
            return (h.Ca + 1900).toString().substring(2)
        },
        "%Y": function(h) {
            return h.Ca + 1900
        },
        "%z": function(h) {
            h = h.wb;
            var r = 0 <= h;
            h = Math.abs(h) / 60;
            return (r ? "+" : "-") + String("0000" + (h / 60 * 100 + h % 60)).slice(-4)
        },
        "%Z": function(h) {
            return h.zb
        },
        "%%": function() {
            return "%"
        }
    };
    c = c.replace(/%%/g, "\x00\x00");
    for (p in n)
        c.includes(p) && (c = c.replace(new RegExp(p,"g"), n[p](d)));
    c = c.replace(/\0\0/g, "%");
    p = Yc(c);
    if (p.length > b)
        return 0;
    z.set(p, a);
    return p.length - 1
}
Ma = g.InternalError = La("InternalError");
for (var $c = Array(256), ad = 0; 256 > ad; ++ad)
    $c[ad] = String.fromCharCode(ad);
Pa = $c;
N = g.BindingError = La("BindingError");
Q.prototype.isAliasOf = function(a) {
    if (!(this instanceof Q && a instanceof Q))
        return !1;
    var b = this.oa.ra.pa
      , c = this.oa.qa
      , d = a.oa.ra.pa;
    for (a = a.oa.qa; b.wa; )
        c = b.Ha(c),
        b = b.wa;
    for (; d.wa; )
        a = d.Ha(a),
        d = d.wa;
    return b === d && c === a
}
;
Q.prototype.clone = function() {
    this.oa.qa || Qa(this);
    if (this.oa.Ga)
        return this.oa.count.value += 1,
        this;
    var a = bb
      , b = Object
      , c = b.create
      , d = Object.getPrototypeOf(this)
      , e = this.oa;
    a = a(c.call(b, d, {
        oa: {
            value: {
                count: e.count,
                Ea: e.Ea,
                Ga: e.Ga,
                qa: e.qa,
                ra: e.ra,
                ta: e.ta,
                va: e.va
            }
        }
    }));
    a.oa.count.value += 1;
    a.oa.Ea = !1;
    return a
}
;
Q.prototype["delete"] = function() {
    this.oa.qa || Qa(this);
    this.oa.Ea && !this.oa.Ga && P("Object already scheduled for deletion");
    Sa(this);
    Ta(this.oa);
    this.oa.Ga || (this.oa.ta = void 0,
    this.oa.qa = void 0)
}
;
Q.prototype.isDeleted = function() {
    return !this.oa.qa
}
;
Q.prototype.deleteLater = function() {
    this.oa.qa || Qa(this);
    this.oa.Ea && !this.oa.Ga && P("Object already scheduled for deletion");
    Wa.push(this);
    1 === Wa.length && Ya && Ya(Xa);
    this.oa.Ea = !0;
    return this
}
;
g.getInheritedInstanceCount = function() {
    return Object.keys(Za).length
}
;
g.getLiveInheritedInstances = function() {
    var a = [], b;
    for (b in Za)
        Za.hasOwnProperty(b) && a.push(Za[b]);
    return a
}
;
g.flushPendingDeletes = Xa;
g.setDelayFunction = function(a) {
    Ya = a;
    Wa.length && Ya && Ya(Xa)
}
;
S.prototype.fb = function(a) {
    this.Za && (a = this.Za(a));
    return a
}
;
S.prototype.Ua = function(a) {
    this.ya && this.ya(a)
}
;
S.prototype.argPackAdvance = 8;
S.prototype.readValueFromPointer = Ha;
S.prototype.deleteObject = function(a) {
    if (null !== a)
        a["delete"]()
}
;
S.prototype.fromWireType = function(a) {
    function b() {
        return this.Ka ? ab(this.pa.Fa, {
            ra: this.mb,
            qa: c,
            va: this,
            ta: a
        }) : ab(this.pa.Fa, {
            ra: this,
            qa: a
        })
    }
    var c = this.fb(a);
    if (!c)
        return this.Ua(a),
        null;
    var d = $a(this.pa, c);
    if (void 0 !== d) {
        if (0 === d.oa.count.value)
            return d.oa.qa = c,
            d.oa.ta = a,
            d.clone();
        d = d.clone();
        this.Ua(a);
        return d
    }
    d = this.pa.eb(c);
    d = Va[d];
    if (!d)
        return b.call(this);
    d = this.Ja ? d.ab : d.pointerType;
    var e = Ua(c, this.pa, d.pa);
    return null === e ? b.call(this) : this.Ka ? ab(d.pa.Fa, {
        ra: d,
        qa: e,
        va: this,
        ta: a
    }) : ab(d.pa.Fa, {
        ra: d,
        qa: e
    })
}
;
ob = g.UnboundTypeError = La("UnboundTypeError");
V.za.push({
    value: void 0
}, {
    value: null
}, {
    value: !0
}, {
    value: !1
});
V.Ya = V.za.length;
g.count_emval_handles = function() {
    for (var a = 0, b = V.Ya; b < V.za.length; ++b)
        void 0 !== V.za[b] && ++a;
    return a
}
;
g.requestFullscreen = function(a, b) {
    Kc(a, b)
}
;
g.requestAnimationFrame = function(a) {
    gc(a)
}
;
g.setCanvasSize = function(a, b, c) {
    Mc(g.canvas, a, b);
    c || Nc()
}
;
g.pauseMainLoop = function() {
    Y = null;
    Z++
}
;
g.resumeMainLoop = function() {
    vc()
}
;
g.getUserMedia = function() {
    window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
    window.getUserMedia(void 0)
}
;
g.createContext = function(a, b, c, d) {
    return Gc(a, b, c, d)
}
;
var dd = {
    G: function(a) {
        var b = Fa[a];
        delete Fa[a];
        var c = b.Qa
          , d = b.ya
          , e = b.Va
          , f = e.map(l=>l.ib).concat(e.map(l=>l.tb));
        J([a], f, l=>{
            var k = {};
            e.forEach((m,n)=>{
                var p = l[n]
                  , t = m.gb
                  , v = m.hb
                  , h = l[n + e.length]
                  , r = m.sb
                  , u = m.ub;
                k[m.cb] = {
                    read: A=>p.fromWireType(t(v, A)),
                    write: (A,O)=>{
                        var L = [];
                        r(u, A, h.toWireType(L, O));
                        Ga(L)
                    }
                }
            }
            );
            return [{
                name: b.name,
                fromWireType: function(m) {
                    var n = {}, p;
                    for (p in k)
                        n[p] = k[p].read(m);
                    d(m);
                    return n
                },
                toWireType: function(m, n) {
                    for (var p in k)
                        if (!(p in n))
                            throw new TypeError('Missing field:  "' + p + '"');
                    var t = c();
                    for (p in k)
                        k[p].write(t, n[p]);
                    null !== m && m.push(d, t);
                    return t
                },
                argPackAdvance: 8,
                readValueFromPointer: Ha,
                ua: d
            }]
        }
        )
    },
    J: function() {},
    V: function(a, b, c, d, e) {
        var f = Oa(c);
        b = M(b);
        K(a, {
            name: b,
            fromWireType: function(l) {
                return !!l
            },
            toWireType: function(l, k) {
                return k ? d : e
            },
            argPackAdvance: 8,
            readValueFromPointer: function(l) {
                if (1 === c)
                    var k = z;
                else if (2 === c)
                    k = C;
                else if (4 === c)
                    k = D;
                else
                    throw new TypeError("Unknown boolean type size: " + b);
                return this.fromWireType(k[l >> f])
            },
            ua: null
        })
    },
    w: function(a, b, c, d, e, f, l, k, m, n, p, t, v) {
        p = M(p);
        f = T(e, f);
        k && (k = T(l, k));
        n && (n = T(m, n));
        v = T(t, v);
        var h = Ja(p);
        db(h, function() {
            rb("Cannot construct " + p + " due to unbound types", [d])
        });
        J([a, b, c], d ? [d] : [], function(r) {
            r = r[0];
            if (d) {
                var u = r.pa;
                var A = u.Fa
            } else
                A = Q.prototype;
            r = Ka(h, function() {
                if (Object.getPrototypeOf(this) !== O)
                    throw new N("Use 'new' to construct " + p);
                if (void 0 === L.Aa)
                    throw new N(p + " has no accessible constructor");
                var sc = L.Aa[arguments.length];
                if (void 0 === sc)
                    throw new N("Tried to invoke ctor of " + p + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(L.Aa).toString() + ") parameters instead!");
                return sc.apply(this, arguments)
            });
            var O = Object.create(A, {
                constructor: {
                    value: r
                }
            });
            r.prototype = O;
            var L = new eb(p,r,O,v,u,f,k,n);
            u = new S(p,L,!0,!1);
            A = new S(p + "*",L,!1,!1);
            var tc = new S(p + " const*",L,!1,!0);
            Va[a] = {
                pointerType: A,
                ab: tc
            };
            kb(h, r);
            return [u, A, tc]
        })
    },
    o: function(a, b, c, d, e, f, l, k) {
        var m = ub(c, d);
        b = M(b);
        f = T(e, f);
        J([], [a], function(n) {
            function p() {
                rb("Cannot call " + t + " due to unbound types", m)
            }
            n = n[0];
            var t = n.name + "." + b;
            b.startsWith("@@") && (b = Symbol[b.substring(2)]);
            var v = n.pa.constructor;
            void 0 === v[b] ? (p.Da = c - 1,
            v[b] = p) : (cb(v, b, t),
            v[b].sa[c - 1] = p);
            J([], m, function(h) {
                h = tb(t, [h[0], null].concat(h.slice(1)), null, f, l, k);
                void 0 === v[b].sa ? (h.Da = c - 1,
                v[b] = h) : v[b].sa[c - 1] = h;
                return []
            });
            return []
        })
    },
    A: function(a, b, c, d, e, f) {
        0 < b || x();
        var l = ub(b, c);
        e = T(d, e);
        J([], [a], function(k) {
            k = k[0];
            var m = "constructor " + k.name;
            void 0 === k.pa.Aa && (k.pa.Aa = []);
            if (void 0 !== k.pa.Aa[b - 1])
                throw new N("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + k.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
            k.pa.Aa[b - 1] = ()=>{
                rb("Cannot construct " + k.name + " due to unbound types", l)
            }
            ;
            J([], l, function(n) {
                n.splice(1, 0, null);
                k.pa.Aa[b - 1] = tb(m, n, null, e, f);
                return []
            });
            return []
        })
    },
    m: function(a, b, c, d, e, f, l, k, m) {
        var n = ub(c, d);
        b = M(b);
        f = T(e, f);
        J([], [a], function(p) {
            function t() {
                rb("Cannot call " + v + " due to unbound types", n)
            }
            p = p[0];
            var v = p.name + "." + b;
            b.startsWith("@@") && (b = Symbol[b.substring(2)]);
            k && p.pa.nb.push(b);
            var h = p.pa.Fa
              , r = h[b];
            void 0 === r || void 0 === r.sa && r.className !== p.name && r.Da === c - 2 ? (t.Da = c - 2,
            t.className = p.name,
            h[b] = t) : (cb(h, b, v),
            h[b].sa[c - 2] = t);
            J([], n, function(u) {
                u = tb(v, u, p, f, l, m);
                void 0 === h[b].sa ? (u.Da = c - 2,
                h[b] = u) : h[b].sa[c - 2] = u;
                return []
            });
            return []
        })
    },
    U: function(a, b) {
        b = M(b);
        K(a, {
            name: b,
            fromWireType: function(c) {
                var d = W(c);
                vb(c);
                return d
            },
            toWireType: function(c, d) {
                return R(d)
            },
            argPackAdvance: 8,
            readValueFromPointer: Ha,
            ua: null
        })
    },
    I: function(a, b, c, d) {
        function e() {}
        c = Oa(c);
        b = M(b);
        e.values = {};
        K(a, {
            name: b,
            constructor: e,
            fromWireType: function(f) {
                return this.constructor.values[f]
            },
            toWireType: function(f, l) {
                return l.value
            },
            argPackAdvance: 8,
            readValueFromPointer: wb(b, c, d),
            ua: null
        });
        db(b, e)
    },
    x: function(a, b, c) {
        var d = xb(a, "enum");
        b = M(b);
        a = d.constructor;
        d = Object.create(d.constructor.prototype, {
            value: {
                value: c
            },
            constructor: {
                value: Ka(d.name + "_" + b, function() {})
            }
        });
        a.values[c] = d;
        a[b] = d
    },
    E: function(a, b, c) {
        c = Oa(c);
        b = M(b);
        K(a, {
            name: b,
            fromWireType: function(d) {
                return d
            },
            toWireType: function(d, e) {
                return e
            },
            argPackAdvance: 8,
            readValueFromPointer: yb(b, c),
            ua: null
        })
    },
    l: function(a, b, c, d, e) {
        b = M(b);
        -1 === e && (e = 4294967295);
        e = Oa(c);
        var f = k=>k;
        if (0 === d) {
            var l = 32 - 8 * c;
            f = k=>k << l >>> l
        }
        c = b.includes("unsigned") ? function(k, m) {
            return m >>> 0
        }
        : function(k, m) {
            return m
        }
        ;
        K(a, {
            name: b,
            fromWireType: f,
            toWireType: c,
            argPackAdvance: 8,
            readValueFromPointer: zb(b, e, 0 !== d),
            ua: null
        })
    },
    f: function(a, b, c) {
        function d(f) {
            f >>= 2;
            var l = E;
            return new e(l.buffer,l[f + 1],l[f])
        }
        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = M(c);
        K(a, {
            name: c,
            fromWireType: d,
            argPackAdvance: 8,
            readValueFromPointer: d
        }, {
            kb: !0
        })
    },
    F: function(a, b) {
        b = M(b);
        var c = "std::string" === b;
        K(a, {
            name: b,
            fromWireType: function(d) {
                var e = E[d >> 2]
                  , f = d + 4;
                if (c)
                    for (var l = f, k = 0; k <= e; ++k) {
                        var m = f + k;
                        if (k == e || 0 == B[m]) {
                            l = l ? X(B, l, m - l) : "";
                            if (void 0 === n)
                                var n = l;
                            else
                                n += String.fromCharCode(0),
                                n += l;
                            l = m + 1
                        }
                    }
                else {
                    n = Array(e);
                    for (k = 0; k < e; ++k)
                        n[k] = String.fromCharCode(B[f + k]);
                    n = n.join("")
                }
                U(d);
                return n
            },
            toWireType: function(d, e) {
                e instanceof ArrayBuffer && (e = new Uint8Array(e));
                var f = "string" == typeof e;
                f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || P("Cannot pass non-string to std::string");
                var l = c && f ? Bb(e) : e.length;
                var k = Yb(4 + l + 1)
                  , m = k + 4;
                E[k >> 2] = l;
                if (c && f)
                    Ab(e, B, m, l + 1);
                else if (f)
                    for (f = 0; f < l; ++f) {
                        var n = e.charCodeAt(f);
                        255 < n && (U(m),
                        P("String has UTF-16 code units that do not fit in 8 bits"));
                        B[m + f] = n
                    }
                else
                    for (f = 0; f < l; ++f)
                        B[m + f] = e[f];
                null !== d && d.push(U, k);
                return k
            },
            argPackAdvance: 8,
            readValueFromPointer: Ha,
            ua: function(d) {
                U(d)
            }
        })
    },
    y: function(a, b, c) {
        c = M(c);
        if (2 === b) {
            var d = Eb;
            var e = Fb;
            var f = Gb;
            var l = ()=>ka;
            var k = 1
        } else
            4 === b && (d = Hb,
            e = Ib,
            f = Jb,
            l = ()=>E,
            k = 2);
        K(a, {
            name: c,
            fromWireType: function(m) {
                for (var n = E[m >> 2], p = l(), t, v = m + 4, h = 0; h <= n; ++h) {
                    var r = m + 4 + h * b;
                    if (h == n || 0 == p[r >> k])
                        v = d(v, r - v),
                        void 0 === t ? t = v : (t += String.fromCharCode(0),
                        t += v),
                        v = r + b
                }
                U(m);
                return t
            },
            toWireType: function(m, n) {
                "string" != typeof n && P("Cannot pass non-string to C++ string type " + c);
                var p = f(n)
                  , t = Yb(4 + p + b);
                E[t >> 2] = p >> k;
                e(n, t + 4, p + b);
                null !== m && m.push(U, t);
                return t
            },
            argPackAdvance: 8,
            readValueFromPointer: Ha,
            ua: function(m) {
                U(m)
            }
        })
    },
    H: function(a, b, c, d, e, f) {
        Fa[a] = {
            name: M(b),
            Qa: T(c, d),
            ya: T(e, f),
            Va: []
        }
    },
    r: function(a, b, c, d, e, f, l, k, m, n) {
        Fa[a].Va.push({
            cb: M(b),
            ib: c,
            gb: T(d, e),
            hb: f,
            tb: l,
            sb: T(k, m),
            ub: n
        })
    },
    W: function(a, b) {
        b = M(b);
        K(a, {
            lb: !0,
            name: b,
            argPackAdvance: 0,
            fromWireType: function() {},
            toWireType: function() {}
        })
    },
    k: function(a, b, c) {
        a = W(a);
        b = xb(b, "emval::as");
        var d = []
          , e = R(d);
        E[c >> 2] = e;
        return b.toWireType(d, a)
    },
    q: function(a, b, c, d) {
        a = W(a);
        c = Kb(b, c);
        for (var e = Array(b), f = 0; f < b; ++f) {
            var l = c[f];
            e[f] = l.readValueFromPointer(d);
            d += l.argPackAdvance
        }
        a = a.apply(void 0, e);
        return R(a)
    },
    z: function(a, b, c, d, e) {
        a = Nb[a];
        b = W(b);
        c = Mb(c);
        var f = [];
        E[d >> 2] = R(f);
        return a(b, c, f, e)
    },
    t: function(a, b, c, d) {
        a = Nb[a];
        b = W(b);
        c = Mb(c);
        a(b, c, null, d)
    },
    a: vb,
    c: function(a, b) {
        a = W(a);
        b = W(b);
        return a == b
    },
    p: function(a) {
        if (0 === a)
            return R(Ob());
        a = Mb(a);
        return R(Ob()[a])
    },
    n: function(a, b) {
        var c = Kb(a, b)
          , d = c[0];
        b = d.name + "_$" + c.slice(1).map(function(p) {
            return p.name
        }).join("_") + "$";
        var e = Qb[b];
        if (void 0 !== e)
            return e;
        e = ["retType"];
        for (var f = [d], l = "", k = 0; k < a - 1; ++k)
            l += (0 !== k ? ", " : "") + "arg" + k,
            e.push("argType" + k),
            f.push(c[1 + k]);
        var m = "return function " + Ja("methodCaller_" + b) + "(handle, name, destructors, args) {\n"
          , n = 0;
        for (k = 0; k < a - 1; ++k)
            m += "    var arg" + k + " = argType" + k + ".readValueFromPointer(args" + (n ? "+" + n : "") + ");\n",
            n += c[k + 1].argPackAdvance;
        m += "    var rv = handle[name](" + l + ");\n";
        for (k = 0; k < a - 1; ++k)
            c[k + 1].deleteObject && (m += "    argType" + k + ".deleteObject(arg" + k + ");\n");
        d.lb || (m += "    return retType.toWireType(destructors, rv);\n");
        e.push(m + "};\n");
        a = sb(e).apply(null, f);
        e = Pb(a);
        return Qb[b] = e
    },
    g: function(a, b) {
        a = W(a);
        b = W(b);
        return R(a[b])
    },
    d: function(a) {
        4 < a && (V.get(a).$a += 1)
    },
    s: function(a, b, c, d) {
        a = W(a);
        var e = Sb[b];
        e || (e = Rb(b),
        Sb[b] = e);
        return e(a, c, d)
    },
    e: function(a) {
        return R(Mb(a))
    },
    i: function(a) {
        var b = W(a);
        Ga(b);
        vb(a)
    },
    u: function(a, b, c) {
        a = W(a);
        b = W(b);
        c = W(c);
        a[b] = c
    },
    h: function(a, b) {
        a = xb(a, "_emval_take_value");
        a = a.readValueFromPointer(b);
        return R(a)
    },
    R: function(a, b) {
        a = new Date(1E3 * (E[a >> 2] + 4294967296 * D[a + 4 >> 2]));
        D[b >> 2] = a.getSeconds();
        D[b + 4 >> 2] = a.getMinutes();
        D[b + 8 >> 2] = a.getHours();
        D[b + 12 >> 2] = a.getDate();
        D[b + 16 >> 2] = a.getMonth();
        D[b + 20 >> 2] = a.getFullYear() - 1900;
        D[b + 24 >> 2] = a.getDay();
        D[b + 28 >> 2] = Wb(a) | 0;
        D[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
        var c = (new Date(a.getFullYear(),6,1)).getTimezoneOffset()
          , d = (new Date(a.getFullYear(),0,1)).getTimezoneOffset();
        D[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0
    },
    S: function(a) {
        var b = new Date(D[a + 20 >> 2] + 1900,D[a + 16 >> 2],D[a + 12 >> 2],D[a + 8 >> 2],D[a + 4 >> 2],D[a >> 2],0)
          , c = D[a + 32 >> 2]
          , d = b.getTimezoneOffset()
          , e = (new Date(b.getFullYear(),6,1)).getTimezoneOffset()
          , f = (new Date(b.getFullYear(),0,1)).getTimezoneOffset()
          , l = Math.min(f, e);
        0 > c ? D[a + 32 >> 2] = Number(e != f && l == d) : 0 < c != (l == d) && (e = Math.max(f, e),
        b.setTime(b.getTime() + 6E4 * ((0 < c ? l : e) - d)));
        D[a + 24 >> 2] = b.getDay();
        D[a + 28 >> 2] = Wb(b) | 0;
        D[a >> 2] = b.getSeconds();
        D[a + 4 >> 2] = b.getMinutes();
        D[a + 8 >> 2] = b.getHours();
        D[a + 12 >> 2] = b.getDate();
        D[a + 16 >> 2] = b.getMonth();
        D[a + 20 >> 2] = b.getYear();
        return b.getTime() / 1E3 | 0
    },
    P: function(a, b, c) {
        function d(m) {
            return (m = m.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? m[1] : "GMT"
        }
        var e = (new Date).getFullYear()
          , f = new Date(e,0,1)
          , l = new Date(e,6,1);
        e = f.getTimezoneOffset();
        var k = l.getTimezoneOffset();
        E[a >> 2] = 60 * Math.max(e, k);
        D[b >> 2] = Number(e != k);
        a = d(f);
        b = d(l);
        a = Xb(a);
        b = Xb(b);
        k < e ? (E[c >> 2] = a,
        E[c + 4 >> 2] = b) : (E[c >> 2] = b,
        E[c + 4 >> 2] = a)
    },
    b: function() {
        x("")
    },
    B: function(a, b, c, d, e, f) {
        b = b ? X(B, b) : "";
        a = zc[a];
        var l = -1;
        e && (l = a.Ia.length,
        a.Ia.push({
            Oa: mb(e),
            Na: f
        }),
        a.Sa++);
        b = {
            funcName: b,
            callbackId: l,
            data: c ? new Uint8Array(B.subarray(c, c + d)) : 0
        };
        c ? a.worker.postMessage(b, [b.data.buffer]) : a.worker.postMessage(b)
    },
    X: function(a) {
        a = a ? X(B, a) : "";
        var b = zc.length;
        a = {
            worker: new Worker(a),
            Ia: [],
            Sa: 0,
            buffer: 0,
            bufferSize: 0
        };
        a.worker.onmessage = function(c) {
            if (!y) {
                var d = zc[b];
                if (d) {
                    var e = c.data.callbackId
                      , f = d.Ia[e];
                    if (f)
                        if (c.data.finalResponse && (d.Sa--,
                        d.Ia[e] = null),
                        c = c.data.data) {
                            c.byteLength || (c = new Uint8Array(c));
                            if (!d.buffer || d.bufferSize < c.length)
                                d.buffer && U(d.buffer),
                                d.bufferSize = c.length,
                                d.buffer = Yb(c.length);
                            B.set(c, d.buffer);
                            f.Oa(d.buffer, c.length, f.Na)
                        } else
                            f.Oa(0, 0, f.Na)
                }
            }
        }
        ;
        zc.push(a);
        return b
    },
    C: function() {
        return Date.now()
    },
    D: function(a) {
        var b = zc[a];
        b.worker.terminate();
        b.buffer && U(b.buffer);
        zc[a] = null
    },
    T: function(a, b, c) {
        B.copyWithin(a, b, b + c)
    },
    _: function() {
        Y = null;
        Z++
    },
    O: function(a) {
        var b = B.length;
        a >>>= 0;
        if (2147483648 < a)
            return !1;
        for (var c = 1; 4 >= c; c *= 2) {
            var d = b * (1 + .2 / c);
            d = Math.min(d, a + 100663296);
            var e = Math
              , f = e.min;
            d = Math.max(a, d);
            d += (65536 - d % 65536) % 65536;
            a: {
                var l = ia.buffer;
                try {
                    ia.grow(f.call(e, 2147483648, d) - l.byteLength + 65535 >>> 16);
                    na();
                    var k = 1;
                    break a
                } catch (m) {}
                k = void 0
            }
            if (k)
                return !0
        }
        return !1
    },
    Z: function() {
        vc()
    },
    Y: function(a, b, c) {
        a = mb(a);
        hc(a, b, c)
    },
    v: function(a, b) {
        if (bd)
            throw "already responded with final response!";
        bd = !0;
        b = {
            callbackId: cd,
            finalResponse: !0,
            data: a ? new Uint8Array(B.subarray(a, a + b)) : 0
        };
        a ? postMessage(b, [b.data.buffer]) : postMessage(b)
    },
    j: function(a, b) {
        if (bd)
            throw "already responded with final response!";
        b = {
            callbackId: cd,
            finalResponse: !1,
            data: a ? new Uint8Array(B.subarray(a, a + b)) : 0
        };
        a ? postMessage(b, [b.data.buffer]) : postMessage(b)
    },
    M: function(a, b) {
        var c = 0;
        Rc().forEach(function(d, e) {
            var f = b + c;
            e = E[a + 4 * e >> 2] = f;
            for (f = 0; f < d.length; ++f)
                z[e++ >> 0] = d.charCodeAt(f);
            z[e >> 0] = 0;
            c += d.length + 1
        });
        return 0
    },
    N: function(a, b) {
        var c = Rc();
        E[a >> 2] = c.length;
        var d = 0;
        c.forEach(function(e) {
            d += e.length + 1
        });
        E[b >> 2] = d;
        return 0
    },
    Q: function(a, b, c, d) {
        for (var e = 0, f = 0; f < c; f++) {
            var l = E[b >> 2]
              , k = E[b + 4 >> 2];
            b += 8;
            for (var m = 0; m < k; m++) {
                var n = B[l + m]
                  , p = Tc[a];
                0 === n || 10 === n ? ((1 === a ? fa : w)(X(p, 0)),
                p.length = 0) : p.push(n)
            }
            e += k
        }
        E[d >> 2] = e;
        return 0
    },
    K: function(a, b) {
        Vc(B.subarray(a, a + b));
        return 0
    },
    L: function(a, b, c, d) {
        return Zc(a, b, c, d)
    }
};
(function() {
    function a(c) {
        c = c.exports;
        g.asm = c;
        ia = g.asm.$;
        na();
        oa = g.asm.ha;
        qa.unshift(g.asm.aa);
        F--;
        g.monitorRunDependencies && g.monitorRunDependencies(F);
        if (0 == F && (null !== va && (clearInterval(va),
        va = null),
        wa)) {
            var d = wa;
            wa = null;
            d()
        }
        return c
    }
    var b = {
        a: dd
    };
    F++;
    g.monitorRunDependencies && g.monitorRunDependencies(F);
    if (g.instantiateWasm)
        try {
            return g.instantiateWasm(b, a)
        } catch (c) {
            return w("Module.instantiateWasm callback failed with error: " + c),
            !1
        }
    Ca(b, function(c) {
        a(c.instance)
    });
    return {}
}
)();
function Yb() {
    return (Yb = g.asm.ba).apply(null, arguments)
}
function U() {
    return (U = g.asm.ca).apply(null, arguments)
}
var ed = g._main = function() {
    return (ed = g._main = g.asm.da).apply(null, arguments)
}
;
g._pushData = function() {
    return (g._pushData = g.asm.ea).apply(null, arguments)
}
;
var qb = g.___getTypeName = function() {
    return (qb = g.___getTypeName = g.asm.fa).apply(null, arguments)
}
;
g.__embind_initialize_bindings = function() {
    return (g.__embind_initialize_bindings = g.asm.ga).apply(null, arguments)
}
;
function fd() {
    return (fd = g.asm.ia).apply(null, arguments)
}
g.dynCall_viijj = function() {
    return (g.dynCall_viijj = g.asm.ja).apply(null, arguments)
}
;
g.dynCall_jiji = function() {
    return (g.dynCall_jiji = g.asm.ka).apply(null, arguments)
}
;
g.dynCall_iiiiij = function() {
    return (g.dynCall_iiiiij = g.asm.la).apply(null, arguments)
}
;
g.dynCall_iiiiijj = function() {
    return (g.dynCall_iiiiijj = g.asm.ma).apply(null, arguments)
}
;
g.dynCall_iiiiiijj = function() {
    return (g.dynCall_iiiiiijj = g.asm.na).apply(null, arguments)
}
;
g.out = fa;
var gd;
wa = function hd() {
    gd || jd();
    gd || (wa = hd)
}
;
function kd(a=[]) {
    var b = ed;
    a.unshift(ca);
    var c = a.length
      , d = fd(4 * (c + 1))
      , e = d >> 2;
    a.forEach(l=>{
        var k = D
          , m = e++
          , n = Bb(l) + 1
          , p = fd(n);
        Ab(l, B, p, n);
        k[m] = p
    }
    );
    D[e] = 0;
    try {
        var f = b(c, d);
        pc(f)
    } catch (l) {
        oc(l)
    }
}
function jd() {
    var a = ba;
    function b() {
        if (!gd && (gd = !0,
        g.calledRun = !0,
        !y)) {
            ta = !0;
            Ea(qa);
            Ea(ra);
            if (g.onRuntimeInitialized)
                g.onRuntimeInitialized();
            ld && kd(a);
            if (g.postRun)
                for ("function" == typeof g.postRun && (g.postRun = [g.postRun]); g.postRun.length; ) {
                    var c = g.postRun.shift();
                    sa.unshift(c)
                }
            Ea(sa)
        }
    }
    if (!(0 < F)) {
        if (g.preRun)
            for ("function" == typeof g.preRun && (g.preRun = [g.preRun]); g.preRun.length; )
                ua();
        Ea(pa);
        0 < F || (g.setStatus ? (g.setStatus("Running..."),
        setTimeout(function() {
            setTimeout(function() {
                g.setStatus("")
            }, 1);
            b()
        }, 1)) : b())
    }
}
if (g.preInit)
    for ("function" == typeof g.preInit && (g.preInit = [g.preInit]); 0 < g.preInit.length; )
        g.preInit.pop()();
var ld = !0;
g.noInitialRun && (ld = !1);
jd();
var bd = !1
  , cd = -1;
(function() {
    function a() {
        if (c && ta) {
            var f = c;
            c = null;
            f.forEach(function(l) {
                onmessage(l)
            })
        }
    }
    function b() {
        a();
        c && setTimeout(b, 100)
    }
    var c = null
      , d = 0
      , e = 0;
    onmessage = f=>{
        if (ta) {
            a();
            var l = g["_" + f.data.funcName];
            if (!l)
                throw "invalid worker function to call: " + f.data.funcName;
            var k = f.data.data;
            if (k) {
                k.byteLength || (k = new Uint8Array(k));
                if (!d || e < k.length)
                    d && U(d),
                    e = k.length,
                    d = Yb(k.length);
                B.set(k, d)
            }
            bd = !1;
            cd = f.data.callbackId;
            k ? l(d, k.length) : l(0, 0)
        } else
            c || (c = [],
            setTimeout(b, 100)),
            c.push(f)
    }
}
)();
