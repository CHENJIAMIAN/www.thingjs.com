function(e) {
    var t = {};
    function i(r) {
        if (t[r])
            return t[r].exports;
        var n = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, i),
        n.l = !0,
        n.exports
    }
    i.m = e,
    i.c = t,
    i.d = function(e, t, r) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }
    ,
    i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(e, t) {
        if (1 & t && (e = i(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (i.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var n in e)
                i.d(r, n, function(t) {
                    return e[t]
                }
                .bind(null, n));
        return r
    }
    ,
    i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return i.d(t, "a", t),
        t
    }
    ,
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    i.p = "",
    i(i.s = 0)
}({
    "./node_modules/escodegen/escodegen.js": /*!*********************************************!*\
  !*** ./node_modules/escodegen/escodegen.js ***!
  \*********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        (function(e) {
            !function() {
                "use strict";
                var r, n, o, s, a, l, u, c, h, p, d, f, m, g, v, y, b, _, x, E, w, T, M, C, S, j;
                function P(e) {
                    return X.Statement.hasOwnProperty(e.type)
                }
                a = i(/*! estraverse */
                "./node_modules/estraverse/estraverse.js"),
                l = i(/*! esutils */
                "./node_modules/esutils/lib/utils.js"),
                r = a.Syntax,
                o = {
                    "||": (n = {
                        Sequence: 0,
                        Yield: 1,
                        Assignment: 1,
                        Conditional: 2,
                        ArrowFunction: 2,
                        LogicalOR: 3,
                        LogicalAND: 4,
                        BitwiseOR: 5,
                        BitwiseXOR: 6,
                        BitwiseAND: 7,
                        Equality: 8,
                        Relational: 9,
                        BitwiseSHIFT: 10,
                        Additive: 11,
                        Multiplicative: 12,
                        Await: 13,
                        Unary: 13,
                        Postfix: 14,
                        Call: 15,
                        New: 16,
                        TaggedTemplate: 17,
                        Member: 18,
                        Primary: 19
                    }).LogicalOR,
                    "&&": n.LogicalAND,
                    "|": n.BitwiseOR,
                    "^": n.BitwiseXOR,
                    "&": n.BitwiseAND,
                    "==": n.Equality,
                    "!=": n.Equality,
                    "===": n.Equality,
                    "!==": n.Equality,
                    is: n.Equality,
                    isnt: n.Equality,
                    "<": n.Relational,
                    ">": n.Relational,
                    "<=": n.Relational,
                    ">=": n.Relational,
                    in: n.Relational,
                    instanceof: n.Relational,
                    "<<": n.BitwiseSHIFT,
                    ">>": n.BitwiseSHIFT,
                    ">>>": n.BitwiseSHIFT,
                    "+": n.Additive,
                    "-": n.Additive,
                    "*": n.Multiplicative,
                    "%": n.Multiplicative,
                    "/": n.Multiplicative
                };
                function R(e, t) {
                    var i = "";
                    for (t |= 0; t > 0; t >>>= 1,
                    e += e)
                        1 & t && (i += e);
                    return i
                }
                function D(e) {
                    var t = e.length;
                    return t && l.code.isLineTerminator(e.charCodeAt(t - 1))
                }
                function A(e, t) {
                    var i;
                    for (i in t)
                        t.hasOwnProperty(i) && (e[i] = t[i]);
                    return e
                }
                function k(e, t) {
                    var i, r;
                    function n(e) {
                        return "object" == typeof e && e instanceof Object && !(e instanceof RegExp)
                    }
                    for (i in t)
                        t.hasOwnProperty(i) && (n(r = t[i]) ? n(e[i]) ? k(e[i], r) : e[i] = k({}, r) : e[i] = r);
                    return e
                }
                function O(e, t) {
                    return 8232 == (-2 & e) ? (t ? "u" : "\\u") + (8232 === e ? "2028" : "2029") : 10 === e || 13 === e ? (t ? "" : "\\") + (10 === e ? "n" : "r") : String.fromCharCode(e)
                }
                function B(e, t) {
                    var i;
                    return 8 === e ? "\\b" : 12 === e ? "\\f" : 9 === e ? "\\t" : (i = e.toString(16).toUpperCase(),
                    h || e > 255 ? "\\u" + "0000".slice(i.length) + i : 0 !== e || l.code.isDecimalDigit(t) ? 11 === e ? "\\x0B" : "\\x" + "00".slice(i.length) + i : "\\0")
                }
                function F(e) {
                    if (92 === e)
                        return "\\\\";
                    if (10 === e)
                        return "\\n";
                    if (13 === e)
                        return "\\r";
                    if (8232 === e)
                        return "\\u2028";
                    if (8233 === e)
                        return "\\u2029";
                    throw new Error("Incorrectly classified character")
                }
                function L(e, t) {
                    if (!T)
                        return Array.isArray(e) ? function e(t) {
                            var i, r, n, o = "";
                            for (i = 0,
                            r = t.length; i < r; ++i)
                                n = t[i],
                                o += Array.isArray(n) ? e(n) : n;
                            return o
                        }(e) : e;
                    if (null == t) {
                        if (e instanceof s)
                            return e;
                        t = {}
                    }
                    return null == t.loc ? new s(null,null,T,e,t.name || null) : new s(t.loc.start.line,t.loc.start.column,!0 === T ? t.loc.source || null : T,e,t.name || null)
                }
                function I() {
                    return v || " "
                }
                function N(e, t) {
                    var i, r, n, o;
                    return 0 === (i = L(e).toString()).length ? [t] : 0 === (r = L(t).toString()).length ? [e] : (n = i.charCodeAt(i.length - 1),
                    o = r.charCodeAt(0),
                    (43 === n || 45 === n) && n === o || l.code.isIdentifierPartES5(n) && l.code.isIdentifierPartES5(o) || 47 === n && 105 === o ? [e, I(), t] : l.code.isWhiteSpace(n) || l.code.isLineTerminator(n) || l.code.isWhiteSpace(o) || l.code.isLineTerminator(o) ? [e, t] : [e, v, t])
                }
                function H(e) {
                    return [u, e]
                }
                function U(e) {
                    var t;
                    t = u,
                    e(u += c),
                    u = t
                }
                function z(e, t) {
                    if ("Line" === e.type) {
                        if (D(e.value))
                            return "//" + e.value;
                        var i = "//" + e.value;
                        return C || (i += "\n"),
                        i
                    }
                    return E.format.indent.adjustMultilineComment && /[\n\r]/.test(e.value) ? function(e, t) {
                        var i, r, n, o, s, a, c, h;
                        for (i = e.split(/\r\n|[\r\n]/),
                        a = Number.MAX_VALUE,
                        r = 1,
                        n = i.length; r < n; ++r) {
                            for (o = i[r],
                            s = 0; s < o.length && l.code.isWhiteSpace(o.charCodeAt(s)); )
                                ++s;
                            a > s && (a = s)
                        }
                        for (void 0 !== t ? (c = u,
                        "*" === i[1][a] && (t += " "),
                        u = t) : (1 & a && --a,
                        c = u),
                        r = 1,
                        n = i.length; r < n; ++r)
                            h = L(H(i[r].slice(a))),
                            i[r] = T ? h.join("") : h;
                        return u = c,
                        i.join("\n")
                    }("/*" + e.value + "*/", t) : "/*" + e.value + "*/"
                }
                function V(e, t) {
                    var i, n, o, s, a, h, p, d, f, m, g, v;
                    if (e.leadingComments && e.leadingComments.length > 0) {
                        if (s = t,
                        C) {
                            for (t = [],
                            d = (o = e.leadingComments[0]).extendedRange,
                            f = o.range,
                            (v = ((g = M.substring(d[0], f[0])).match(/\n/g) || []).length) > 0 ? (t.push(R("\n", v)),
                            t.push(H(z(o)))) : (t.push(g),
                            t.push(z(o))),
                            m = f,
                            i = 1,
                            n = e.leadingComments.length; i < n; i++)
                                f = (o = e.leadingComments[i]).range,
                                v = (M.substring(m[1], f[0]).match(/\n/g) || []).length,
                                t.push(R("\n", v)),
                                t.push(H(z(o))),
                                m = f;
                            v = (M.substring(f[1], d[1]).match(/\n/g) || []).length,
                            t.push(R("\n", v))
                        } else
                            for (o = e.leadingComments[0],
                            t = [],
                            _ && e.type === r.Program && 0 === e.body.length && t.push("\n"),
                            t.push(z(o)),
                            D(L(t).toString()) || t.push("\n"),
                            i = 1,
                            n = e.leadingComments.length; i < n; ++i)
                                D(L(p = [z(o = e.leadingComments[i])]).toString()) || p.push("\n"),
                                t.push(H(p));
                        t.push(H(s))
                    }
                    if (e.trailingComments)
                        if (C)
                            d = (o = e.trailingComments[0]).extendedRange,
                            f = o.range,
                            (v = ((g = M.substring(d[0], f[0])).match(/\n/g) || []).length) > 0 ? (t.push(R("\n", v)),
                            t.push(H(z(o)))) : (t.push(g),
                            t.push(z(o)));
                        else
                            for (a = !D(L(t).toString()),
                            h = R(" ", function(e) {
                                var t;
                                for (t = e.length - 1; t >= 0 && !l.code.isLineTerminator(e.charCodeAt(t)); --t)
                                    ;
                                return e.length - 1 - t
                            }(L([u, t, c]).toString())),
                            i = 0,
                            n = e.trailingComments.length; i < n; ++i)
                                o = e.trailingComments[i],
                                a ? (t = 0 === i ? [t, c] : [t, h]).push(z(o, h)) : t = [t, H(z(o))],
                                i === n - 1 || D(L(t).toString()) || (t = [t, "\n"]);
                    return t
                }
                function W(e, t, i) {
                    var r, n = 0;
                    for (r = e; r < t; r++)
                        "\n" === M[r] && n++;
                    for (r = 1; r < n; r++)
                        i.push(g)
                }
                function G(e, t, i) {
                    return t < i ? ["(", e, ")"] : e
                }
                function q(e) {
                    var t, i, r;
                    for (t = 1,
                    i = (r = e.split(/\r\n|\n/)).length; t < i; t++)
                        r[t] = g + u + r[t];
                    return r
                }
                function X() {}
                function J(e) {
                    return L(e.name, e)
                }
                function Y(e, t) {
                    return e.async ? "async" + (t ? I() : v) : ""
                }
                function Q(e) {
                    return e.generator && !E.moz.starlessGenerator ? "*" + v : ""
                }
                function Z(e) {
                    var t = e.value
                      , i = "";
                    return t.async && (i += Y(t, !e.computed)),
                    t.generator && (i += Q(t) ? "*" : ""),
                    i
                }
                function K(e) {
                    var t;
                    if (t = new X,
                    P(e))
                        return t.generateStatement(e, 1);
                    if (function(e) {
                        return X.Expression.hasOwnProperty(e.type)
                    }(e))
                        return t.generateExpression(e, n.Sequence, 7);
                    throw new Error("Unknown node type: " + e.type)
                }
                X.prototype.maybeBlock = function(e, t) {
                    var i, n, o = this;
                    return n = !E.comment || !e.leadingComments,
                    e.type === r.BlockStatement && n ? [v, this.generateStatement(e, t)] : e.type === r.EmptyStatement && n ? ";" : (U((function() {
                        i = [g, H(o.generateStatement(e, t))]
                    }
                    )),
                    i)
                }
                ,
                X.prototype.maybeBlockSuffix = function(e, t) {
                    var i = D(L(t).toString());
                    return e.type !== r.BlockStatement || E.comment && e.leadingComments || i ? i ? [t, u] : [t, g, u] : [t, v]
                }
                ,
                X.prototype.generatePattern = function(e, t, i) {
                    return e.type === r.Identifier ? J(e) : this.generateExpression(e, t, i)
                }
                ,
                X.prototype.generateFunctionParams = function(e) {
                    var t, i, o, s;
                    if (s = !1,
                    e.type !== r.ArrowFunctionExpression || e.rest || e.defaults && 0 !== e.defaults.length || 1 !== e.params.length || e.params[0].type !== r.Identifier) {
                        for ((o = e.type === r.ArrowFunctionExpression ? [Y(e, !1)] : []).push("("),
                        e.defaults && (s = !0),
                        t = 0,
                        i = e.params.length; t < i; ++t)
                            s && e.defaults[t] ? o.push(this.generateAssignment(e.params[t], e.defaults[t], "=", n.Assignment, 7)) : o.push(this.generatePattern(e.params[t], n.Assignment, 7)),
                            t + 1 < i && o.push("," + v);
                        e.rest && (e.params.length && o.push("," + v),
                        o.push("..."),
                        o.push(J(e.rest))),
                        o.push(")")
                    } else
                        o = [Y(e, !0), J(e.params[0])];
                    return o
                }
                ,
                X.prototype.generateFunctionBody = function(e) {
                    var t, i;
                    return t = this.generateFunctionParams(e),
                    e.type === r.ArrowFunctionExpression && (t.push(v),
                    t.push("=>")),
                    e.expression ? (t.push(v),
                    "{" === (i = this.generateExpression(e.body, n.Assignment, 7)).toString().charAt(0) && (i = ["(", i, ")"]),
                    t.push(i)) : t.push(this.maybeBlock(e.body, 9)),
                    t
                }
                ,
                X.prototype.generateIterationForStatement = function(e, t, i) {
                    var o = ["for" + v + (t.await ? "await" + v : "") + "("]
                      , s = this;
                    return U((function() {
                        t.left.type === r.VariableDeclaration ? U((function() {
                            o.push(t.left.kind + I()),
                            o.push(s.generateStatement(t.left.declarations[0], 0))
                        }
                        )) : o.push(s.generateExpression(t.left, n.Call, 7)),
                        o = N(o, e),
                        o = [N(o, s.generateExpression(t.right, n.Assignment, 7)), ")"]
                    }
                    )),
                    o.push(this.maybeBlock(t.body, i)),
                    o
                }
                ,
                X.prototype.generatePropertyKey = function(e, t) {
                    var i = [];
                    return t && i.push("["),
                    i.push(this.generateExpression(e, n.Sequence, 7)),
                    t && i.push("]"),
                    i
                }
                ,
                X.prototype.generateAssignment = function(e, t, i, r, o) {
                    return n.Assignment < r && (o |= 1),
                    G([this.generateExpression(e, n.Call, o), v + i + v, this.generateExpression(t, n.Assignment, o)], n.Assignment, r)
                }
                ,
                X.prototype.semicolon = function(e) {
                    return !b && 32 & e ? "" : ";"
                }
                ,
                X.Statement = {
                    BlockStatement: function(e, t) {
                        var i, r, n = ["{", g], o = this;
                        return U((function() {
                            var s, a, l, u;
                            for (0 === e.body.length && C && (i = e.range)[1] - i[0] > 2 && ("\n" === (r = M.substring(i[0] + 1, i[1] - 1))[0] && (n = ["{"]),
                            n.push(r)),
                            u = 1,
                            8 & t && (u |= 16),
                            s = 0,
                            a = e.body.length; s < a; ++s)
                                C && (0 === s && (e.body[0].leadingComments && (i = e.body[0].leadingComments[0].extendedRange,
                                "\n" === (r = M.substring(i[0], i[1]))[0] && (n = ["{"])),
                                e.body[0].leadingComments || W(e.range[0], e.body[0].range[0], n)),
                                s > 0 && (e.body[s - 1].trailingComments || e.body[s].leadingComments || W(e.body[s - 1].range[1], e.body[s].range[0], n))),
                                s === a - 1 && (u |= 32),
                                l = e.body[s].leadingComments && C ? o.generateStatement(e.body[s], u) : H(o.generateStatement(e.body[s], u)),
                                n.push(l),
                                D(L(l).toString()) || C && s < a - 1 && e.body[s + 1].leadingComments || n.push(g),
                                C && s === a - 1 && (e.body[s].trailingComments || W(e.body[s].range[1], e.range[1], n))
                        }
                        )),
                        n.push(H("}")),
                        n
                    },
                    BreakStatement: function(e, t) {
                        return e.label ? "break " + e.label.name + this.semicolon(t) : "break" + this.semicolon(t)
                    },
                    ContinueStatement: function(e, t) {
                        return e.label ? "continue " + e.label.name + this.semicolon(t) : "continue" + this.semicolon(t)
                    },
                    ClassBody: function(e, t) {
                        var i = ["{", g]
                          , r = this;
                        return U((function(t) {
                            var o, s;
                            for (o = 0,
                            s = e.body.length; o < s; ++o)
                                i.push(t),
                                i.push(r.generateExpression(e.body[o], n.Sequence, 7)),
                                o + 1 < s && i.push(g)
                        }
                        )),
                        D(L(i).toString()) || i.push(g),
                        i.push(u),
                        i.push("}"),
                        i
                    },
                    ClassDeclaration: function(e, t) {
                        var i, r;
                        return i = ["class"],
                        e.id && (i = N(i, this.generateExpression(e.id, n.Sequence, 7))),
                        e.superClass && (r = N("extends", this.generateExpression(e.superClass, n.Assignment, 7)),
                        i = N(i, r)),
                        i.push(v),
                        i.push(this.generateStatement(e.body, 33)),
                        i
                    },
                    DirectiveStatement: function(e, t) {
                        return E.raw && e.raw ? e.raw + this.semicolon(t) : function(e) {
                            var t, i, r, n;
                            for (n = "double" === f ? '"' : "'",
                            t = 0,
                            i = e.length; t < i; ++t) {
                                if (39 === (r = e.charCodeAt(t))) {
                                    n = '"';
                                    break
                                }
                                if (34 === r) {
                                    n = "'";
                                    break
                                }
                                92 === r && ++t
                            }
                            return n + e + n
                        }(e.directive) + this.semicolon(t)
                    },
                    DoWhileStatement: function(e, t) {
                        var i = N("do", this.maybeBlock(e.body, 1));
                        return N(i = this.maybeBlockSuffix(e.body, i), ["while" + v + "(", this.generateExpression(e.test, n.Sequence, 7), ")" + this.semicolon(t)])
                    },
                    CatchClause: function(e, t) {
                        var i, r = this;
                        return U((function() {
                            var t;
                            i = ["catch" + v + "(", r.generateExpression(e.param, n.Sequence, 7), ")"],
                            e.guard && (t = r.generateExpression(e.guard, n.Sequence, 7),
                            i.splice(2, 0, " if ", t))
                        }
                        )),
                        i.push(this.maybeBlock(e.body, 1)),
                        i
                    },
                    DebuggerStatement: function(e, t) {
                        return "debugger" + this.semicolon(t)
                    },
                    EmptyStatement: function(e, t) {
                        return ";"
                    },
                    ExportDefaultDeclaration: function(e, t) {
                        var i, r = ["export"];
                        return i = 32 & t ? 33 : 1,
                        r = N(r, "default"),
                        P(e.declaration) ? N(r, this.generateStatement(e.declaration, i)) : N(r, this.generateExpression(e.declaration, n.Assignment, 7) + this.semicolon(t))
                    },
                    ExportNamedDeclaration: function(e, t) {
                        var i, o = ["export"], s = this;
                        return i = 32 & t ? 33 : 1,
                        e.declaration ? N(o, this.generateStatement(e.declaration, i)) : (e.specifiers && (0 === e.specifiers.length ? o = N(o, "{" + v + "}") : e.specifiers[0].type === r.ExportBatchSpecifier ? o = N(o, this.generateExpression(e.specifiers[0], n.Sequence, 7)) : (o = N(o, "{"),
                        U((function(t) {
                            var i, r;
                            for (o.push(g),
                            i = 0,
                            r = e.specifiers.length; i < r; ++i)
                                o.push(t),
                                o.push(s.generateExpression(e.specifiers[i], n.Sequence, 7)),
                                i + 1 < r && o.push("," + g)
                        }
                        )),
                        D(L(o).toString()) || o.push(g),
                        o.push(u + "}")),
                        e.source ? o = N(o, ["from" + v, this.generateExpression(e.source, n.Sequence, 7), this.semicolon(t)]) : o.push(this.semicolon(t))),
                        o)
                    },
                    ExportAllDeclaration: function(e, t) {
                        return ["export" + v, "*" + v, "from" + v, this.generateExpression(e.source, n.Sequence, 7), this.semicolon(t)]
                    },
                    ExpressionStatement: function(e, t) {
                        var i, o;
                        return 123 === (o = L(i = [this.generateExpression(e.expression, n.Sequence, 7)]).toString()).charCodeAt(0) || function(e) {
                            var t;
                            return "class" === e.slice(0, 5) && (123 === (t = e.charCodeAt(5)) || l.code.isWhiteSpace(t) || l.code.isLineTerminator(t))
                        }(o) || function(e) {
                            var t;
                            return "function" === e.slice(0, 8) && (40 === (t = e.charCodeAt(8)) || l.code.isWhiteSpace(t) || 42 === t || l.code.isLineTerminator(t))
                        }(o) || function(e) {
                            var t, i, r;
                            if ("async" !== e.slice(0, 5))
                                return !1;
                            if (!l.code.isWhiteSpace(e.charCodeAt(5)))
                                return !1;
                            for (i = 6,
                            r = e.length; i < r && l.code.isWhiteSpace(e.charCodeAt(i)); ++i)
                                ;
                            return i !== r && "function" === e.slice(i, i + 8) && (40 === (t = e.charCodeAt(i + 8)) || l.code.isWhiteSpace(t) || 42 === t || l.code.isLineTerminator(t))
                        }(o) || x && 16 & t && e.expression.type === r.Literal && "string" == typeof e.expression.value ? i = ["(", i, ")" + this.semicolon(t)] : i.push(this.semicolon(t)),
                        i
                    },
                    ImportDeclaration: function(e, t) {
                        var i, o, s = this;
                        return 0 === e.specifiers.length ? ["import", v, this.generateExpression(e.source, n.Sequence, 7), this.semicolon(t)] : (i = ["import"],
                        o = 0,
                        e.specifiers[o].type === r.ImportDefaultSpecifier && (i = N(i, [this.generateExpression(e.specifiers[o], n.Sequence, 7)]),
                        ++o),
                        e.specifiers[o] && (0 !== o && i.push(","),
                        e.specifiers[o].type === r.ImportNamespaceSpecifier ? i = N(i, [v, this.generateExpression(e.specifiers[o], n.Sequence, 7)]) : (i.push(v + "{"),
                        e.specifiers.length - o == 1 ? (i.push(v),
                        i.push(this.generateExpression(e.specifiers[o], n.Sequence, 7)),
                        i.push(v + "}" + v)) : (U((function(t) {
                            var r, a;
                            for (i.push(g),
                            r = o,
                            a = e.specifiers.length; r < a; ++r)
                                i.push(t),
                                i.push(s.generateExpression(e.specifiers[r], n.Sequence, 7)),
                                r + 1 < a && i.push("," + g)
                        }
                        )),
                        D(L(i).toString()) || i.push(g),
                        i.push(u + "}" + v)))),
                        i = N(i, ["from" + v, this.generateExpression(e.source, n.Sequence, 7), this.semicolon(t)]))
                    },
                    VariableDeclarator: function(e, t) {
                        var i = 1 & t ? 7 : 6;
                        return e.init ? [this.generateExpression(e.id, n.Assignment, i), v, "=", v, this.generateExpression(e.init, n.Assignment, i)] : this.generatePattern(e.id, n.Assignment, i)
                    },
                    VariableDeclaration: function(e, t) {
                        var i, r, n, o, s, a = this;
                        function l() {
                            for (o = e.declarations[0],
                            E.comment && o.leadingComments ? (i.push("\n"),
                            i.push(H(a.generateStatement(o, s)))) : (i.push(I()),
                            i.push(a.generateStatement(o, s))),
                            r = 1,
                            n = e.declarations.length; r < n; ++r)
                                o = e.declarations[r],
                                E.comment && o.leadingComments ? (i.push("," + g),
                                i.push(H(a.generateStatement(o, s)))) : (i.push("," + v),
                                i.push(a.generateStatement(o, s)))
                        }
                        return i = [e.kind],
                        s = 1 & t ? 1 : 0,
                        e.declarations.length > 1 ? U(l) : l(),
                        i.push(this.semicolon(t)),
                        i
                    },
                    ThrowStatement: function(e, t) {
                        return [N("throw", this.generateExpression(e.argument, n.Sequence, 7)), this.semicolon(t)]
                    },
                    TryStatement: function(e, t) {
                        var i, r, n, o;
                        if (i = ["try", this.maybeBlock(e.block, 1)],
                        i = this.maybeBlockSuffix(e.block, i),
                        e.handlers)
                            for (r = 0,
                            n = e.handlers.length; r < n; ++r)
                                i = N(i, this.generateStatement(e.handlers[r], 1)),
                                (e.finalizer || r + 1 !== n) && (i = this.maybeBlockSuffix(e.handlers[r].body, i));
                        else {
                            for (r = 0,
                            n = (o = e.guardedHandlers || []).length; r < n; ++r)
                                i = N(i, this.generateStatement(o[r], 1)),
                                (e.finalizer || r + 1 !== n) && (i = this.maybeBlockSuffix(o[r].body, i));
                            if (e.handler)
                                if (Array.isArray(e.handler))
                                    for (r = 0,
                                    n = e.handler.length; r < n; ++r)
                                        i = N(i, this.generateStatement(e.handler[r], 1)),
                                        (e.finalizer || r + 1 !== n) && (i = this.maybeBlockSuffix(e.handler[r].body, i));
                                else
                                    i = N(i, this.generateStatement(e.handler, 1)),
                                    e.finalizer && (i = this.maybeBlockSuffix(e.handler.body, i))
                        }
                        return e.finalizer && (i = N(i, ["finally", this.maybeBlock(e.finalizer, 1)])),
                        i
                    },
                    SwitchStatement: function(e, t) {
                        var i, r, o, s, a, l = this;
                        if (U((function() {
                            i = ["switch" + v + "(", l.generateExpression(e.discriminant, n.Sequence, 7), ")" + v + "{" + g]
                        }
                        )),
                        e.cases)
                            for (a = 1,
                            o = 0,
                            s = e.cases.length; o < s; ++o)
                                o === s - 1 && (a |= 32),
                                r = H(this.generateStatement(e.cases[o], a)),
                                i.push(r),
                                D(L(r).toString()) || i.push(g);
                        return i.push(H("}")),
                        i
                    },
                    SwitchCase: function(e, t) {
                        var i, o, s, a, l, u = this;
                        return U((function() {
                            for (i = e.test ? [N("case", u.generateExpression(e.test, n.Sequence, 7)), ":"] : ["default:"],
                            s = 0,
                            (a = e.consequent.length) && e.consequent[0].type === r.BlockStatement && (o = u.maybeBlock(e.consequent[0], 1),
                            i.push(o),
                            s = 1),
                            s === a || D(L(i).toString()) || i.push(g),
                            l = 1; s < a; ++s)
                                s === a - 1 && 32 & t && (l |= 32),
                                o = H(u.generateStatement(e.consequent[s], l)),
                                i.push(o),
                                s + 1 === a || D(L(o).toString()) || i.push(g)
                        }
                        )),
                        i
                    },
                    IfStatement: function(e, t) {
                        var i, o, s = this;
                        return U((function() {
                            i = ["if" + v + "(", s.generateExpression(e.test, n.Sequence, 7), ")"]
                        }
                        )),
                        o = 1,
                        32 & t && (o |= 32),
                        e.alternate ? (i.push(this.maybeBlock(e.consequent, 1)),
                        i = this.maybeBlockSuffix(e.consequent, i),
                        i = e.alternate.type === r.IfStatement ? N(i, ["else ", this.generateStatement(e.alternate, o)]) : N(i, N("else", this.maybeBlock(e.alternate, o)))) : i.push(this.maybeBlock(e.consequent, o)),
                        i
                    },
                    ForStatement: function(e, t) {
                        var i, o = this;
                        return U((function() {
                            i = ["for" + v + "("],
                            e.init ? e.init.type === r.VariableDeclaration ? i.push(o.generateStatement(e.init, 0)) : (i.push(o.generateExpression(e.init, n.Sequence, 6)),
                            i.push(";")) : i.push(";"),
                            e.test ? (i.push(v),
                            i.push(o.generateExpression(e.test, n.Sequence, 7)),
                            i.push(";")) : i.push(";"),
                            e.update ? (i.push(v),
                            i.push(o.generateExpression(e.update, n.Sequence, 7)),
                            i.push(")")) : i.push(")")
                        }
                        )),
                        i.push(this.maybeBlock(e.body, 32 & t ? 33 : 1)),
                        i
                    },
                    ForInStatement: function(e, t) {
                        return this.generateIterationForStatement("in", e, 32 & t ? 33 : 1)
                    },
                    ForOfStatement: function(e, t) {
                        return this.generateIterationForStatement("of", e, 32 & t ? 33 : 1)
                    },
                    LabeledStatement: function(e, t) {
                        return [e.label.name + ":", this.maybeBlock(e.body, 32 & t ? 33 : 1)]
                    },
                    Program: function(e, t) {
                        var i, r, n, o, s;
                        for (o = e.body.length,
                        i = [_ && o > 0 ? "\n" : ""],
                        s = 17,
                        n = 0; n < o; ++n)
                            _ || n !== o - 1 || (s |= 32),
                            C && (0 === n && (e.body[0].leadingComments || W(e.range[0], e.body[n].range[0], i)),
                            n > 0 && (e.body[n - 1].trailingComments || e.body[n].leadingComments || W(e.body[n - 1].range[1], e.body[n].range[0], i))),
                            r = H(this.generateStatement(e.body[n], s)),
                            i.push(r),
                            n + 1 < o && !D(L(r).toString()) && (C && e.body[n + 1].leadingComments || i.push(g)),
                            C && n === o - 1 && (e.body[n].trailingComments || W(e.body[n].range[1], e.range[1], i));
                        return i
                    },
                    FunctionDeclaration: function(e, t) {
                        return [Y(e, !0), "function", Q(e) || I(), e.id ? J(e.id) : "", this.generateFunctionBody(e)]
                    },
                    ReturnStatement: function(e, t) {
                        return e.argument ? [N("return", this.generateExpression(e.argument, n.Sequence, 7)), this.semicolon(t)] : ["return" + this.semicolon(t)]
                    },
                    WhileStatement: function(e, t) {
                        var i, r = this;
                        return U((function() {
                            i = ["while" + v + "(", r.generateExpression(e.test, n.Sequence, 7), ")"]
                        }
                        )),
                        i.push(this.maybeBlock(e.body, 32 & t ? 33 : 1)),
                        i
                    },
                    WithStatement: function(e, t) {
                        var i, r = this;
                        return U((function() {
                            i = ["with" + v + "(", r.generateExpression(e.object, n.Sequence, 7), ")"]
                        }
                        )),
                        i.push(this.maybeBlock(e.body, 32 & t ? 33 : 1)),
                        i
                    }
                },
                A(X.prototype, X.Statement),
                X.Expression = {
                    SequenceExpression: function(e, t, i) {
                        var r, o, s;
                        for (n.Sequence < t && (i |= 1),
                        r = [],
                        o = 0,
                        s = e.expressions.length; o < s; ++o)
                            r.push(this.generateExpression(e.expressions[o], n.Assignment, i)),
                            o + 1 < s && r.push("," + v);
                        return G(r, n.Sequence, t)
                    },
                    AssignmentExpression: function(e, t, i) {
                        return this.generateAssignment(e.left, e.right, e.operator, t, i)
                    },
                    ArrowFunctionExpression: function(e, t, i) {
                        return G(this.generateFunctionBody(e), n.ArrowFunction, t)
                    },
                    ConditionalExpression: function(e, t, i) {
                        return n.Conditional < t && (i |= 1),
                        G([this.generateExpression(e.test, n.LogicalOR, i), v + "?" + v, this.generateExpression(e.consequent, n.Assignment, i), v + ":" + v, this.generateExpression(e.alternate, n.Assignment, i)], n.Conditional, t)
                    },
                    LogicalExpression: function(e, t, i) {
                        return this.BinaryExpression(e, t, i)
                    },
                    BinaryExpression: function(e, t, i) {
                        var r, n, s, a;
                        return (n = o[e.operator]) < t && (i |= 1),
                        r = 47 === (a = (s = this.generateExpression(e.left, n, i)).toString()).charCodeAt(a.length - 1) && l.code.isIdentifierPartES5(e.operator.charCodeAt(0)) ? [s, I(), e.operator] : N(s, e.operator),
                        s = this.generateExpression(e.right, n + 1, i),
                        "/" === e.operator && "/" === s.toString().charAt(0) || "<" === e.operator.slice(-1) && "!--" === s.toString().slice(0, 3) ? (r.push(I()),
                        r.push(s)) : r = N(r, s),
                        "in" !== e.operator || 1 & i ? G(r, n, t) : ["(", r, ")"]
                    },
                    CallExpression: function(e, t, i) {
                        var r, o, s;
                        for ((r = [this.generateExpression(e.callee, n.Call, 3)]).push("("),
                        o = 0,
                        s = e.arguments.length; o < s; ++o)
                            r.push(this.generateExpression(e.arguments[o], n.Assignment, 7)),
                            o + 1 < s && r.push("," + v);
                        return r.push(")"),
                        2 & i ? G(r, n.Call, t) : ["(", r, ")"]
                    },
                    NewExpression: function(e, t, i) {
                        var r, o, s, a, l;
                        if (o = e.arguments.length,
                        l = 4 & i && !y && 0 === o ? 5 : 1,
                        r = N("new", this.generateExpression(e.callee, n.New, l)),
                        !(4 & i) || y || o > 0) {
                            for (r.push("("),
                            s = 0,
                            a = o; s < a; ++s)
                                r.push(this.generateExpression(e.arguments[s], n.Assignment, 7)),
                                s + 1 < a && r.push("," + v);
                            r.push(")")
                        }
                        return G(r, n.New, t)
                    },
                    MemberExpression: function(e, t, i) {
                        var o, s;
                        return o = [this.generateExpression(e.object, n.Call, 2 & i ? 3 : 1)],
                        e.computed ? (o.push("["),
                        o.push(this.generateExpression(e.property, n.Sequence, 2 & i ? 7 : 5)),
                        o.push("]")) : (e.object.type === r.Literal && "number" == typeof e.object.value && (s = L(o).toString()).indexOf(".") < 0 && !/[eExX]/.test(s) && l.code.isDecimalDigit(s.charCodeAt(s.length - 1)) && !(s.length >= 2 && 48 === s.charCodeAt(0)) && o.push(" "),
                        o.push("."),
                        o.push(J(e.property))),
                        G(o, n.Member, t)
                    },
                    MetaProperty: function(e, t, i) {
                        var r;
                        return (r = []).push("string" == typeof e.meta ? e.meta : J(e.meta)),
                        r.push("."),
                        r.push("string" == typeof e.property ? e.property : J(e.property)),
                        G(r, n.Member, t)
                    },
                    UnaryExpression: function(e, t, i) {
                        var r, o, s, a, u;
                        return o = this.generateExpression(e.argument, n.Unary, 7),
                        "" === v ? r = N(e.operator, o) : (r = [e.operator],
                        e.operator.length > 2 ? r = N(r, o) : (u = (a = L(r).toString()).charCodeAt(a.length - 1),
                        s = o.toString().charCodeAt(0),
                        (43 === u || 45 === u) && u === s || l.code.isIdentifierPartES5(u) && l.code.isIdentifierPartES5(s) ? (r.push(I()),
                        r.push(o)) : r.push(o))),
                        G(r, n.Unary, t)
                    },
                    YieldExpression: function(e, t, i) {
                        var r;
                        return r = e.delegate ? "yield*" : "yield",
                        e.argument && (r = N(r, this.generateExpression(e.argument, n.Yield, 7))),
                        G(r, n.Yield, t)
                    },
                    AwaitExpression: function(e, t, i) {
                        return G(N(e.all ? "await*" : "await", this.generateExpression(e.argument, n.Await, 7)), n.Await, t)
                    },
                    UpdateExpression: function(e, t, i) {
                        return e.prefix ? G([e.operator, this.generateExpression(e.argument, n.Unary, 7)], n.Unary, t) : G([this.generateExpression(e.argument, n.Postfix, 7), e.operator], n.Postfix, t)
                    },
                    FunctionExpression: function(e, t, i) {
                        var r = [Y(e, !0), "function"];
                        return e.id ? (r.push(Q(e) || I()),
                        r.push(J(e.id))) : r.push(Q(e) || v),
                        r.push(this.generateFunctionBody(e)),
                        r
                    },
                    ArrayPattern: function(e, t, i) {
                        return this.ArrayExpression(e, t, i, !0)
                    },
                    ArrayExpression: function(e, t, i, r) {
                        var o, s, a = this;
                        return e.elements.length ? (s = !r && e.elements.length > 1,
                        o = ["[", s ? g : ""],
                        U((function(t) {
                            var i, r;
                            for (i = 0,
                            r = e.elements.length; i < r; ++i)
                                e.elements[i] ? (o.push(s ? t : ""),
                                o.push(a.generateExpression(e.elements[i], n.Assignment, 7))) : (s && o.push(t),
                                i + 1 === r && o.push(",")),
                                i + 1 < r && o.push("," + (s ? g : v))
                        }
                        )),
                        s && !D(L(o).toString()) && o.push(g),
                        o.push(s ? u : ""),
                        o.push("]"),
                        o) : "[]"
                    },
                    RestElement: function(e, t, i) {
                        return "..." + this.generatePattern(e.argument)
                    },
                    ClassExpression: function(e, t, i) {
                        var r, o;
                        return r = ["class"],
                        e.id && (r = N(r, this.generateExpression(e.id, n.Sequence, 7))),
                        e.superClass && (o = N("extends", this.generateExpression(e.superClass, n.Assignment, 7)),
                        r = N(r, o)),
                        r.push(v),
                        r.push(this.generateStatement(e.body, 33)),
                        r
                    },
                    MethodDefinition: function(e, t, i) {
                        var r, n;
                        return r = e.static ? ["static" + v] : [],
                        n = "get" === e.kind || "set" === e.kind ? [N(e.kind, this.generatePropertyKey(e.key, e.computed)), this.generateFunctionBody(e.value)] : [Z(e), this.generatePropertyKey(e.key, e.computed), this.generateFunctionBody(e.value)],
                        N(r, n)
                    },
                    Property: function(e, t, i) {
                        return "get" === e.kind || "set" === e.kind ? [e.kind, I(), this.generatePropertyKey(e.key, e.computed), this.generateFunctionBody(e.value)] : e.shorthand ? "AssignmentPattern" === e.value.type ? this.AssignmentPattern(e.value, n.Sequence, 7) : this.generatePropertyKey(e.key, e.computed) : e.method ? [Z(e), this.generatePropertyKey(e.key, e.computed), this.generateFunctionBody(e.value)] : [this.generatePropertyKey(e.key, e.computed), ":" + v, this.generateExpression(e.value, n.Assignment, 7)]
                    },
                    ObjectExpression: function(e, t, i) {
                        var r, o, s, a, l = this;
                        return e.properties.length ? (r = e.properties.length > 1,
                        U((function() {
                            s = l.generateExpression(e.properties[0], n.Sequence, 7)
                        }
                        )),
                        r || (a = L(s).toString(),
                        /[\r\n]/g.test(a)) ? (U((function(t) {
                            var i, a;
                            if (o = ["{", g, t, s],
                            r)
                                for (o.push("," + g),
                                i = 1,
                                a = e.properties.length; i < a; ++i)
                                    o.push(t),
                                    o.push(l.generateExpression(e.properties[i], n.Sequence, 7)),
                                    i + 1 < a && o.push("," + g)
                        }
                        )),
                        D(L(o).toString()) || o.push(g),
                        o.push(u),
                        o.push("}"),
                        o) : ["{", v, s, v, "}"]) : "{}"
                    },
                    AssignmentPattern: function(e, t, i) {
                        return this.generateAssignment(e.left, e.right, "=", t, i)
                    },
                    ObjectPattern: function(e, t, i) {
                        var o, s, a, l, c = this;
                        if (!e.properties.length)
                            return "{}";
                        if (l = !1,
                        1 === e.properties.length)
                            e.properties[0].value.type !== r.Identifier && (l = !0);
                        else
                            for (s = 0,
                            a = e.properties.length; s < a; ++s)
                                if (!e.properties[s].shorthand) {
                                    l = !0;
                                    break
                                }
                        return o = ["{", l ? g : ""],
                        U((function(t) {
                            var i, r;
                            for (i = 0,
                            r = e.properties.length; i < r; ++i)
                                o.push(l ? t : ""),
                                o.push(c.generateExpression(e.properties[i], n.Sequence, 7)),
                                i + 1 < r && o.push("," + (l ? g : v))
                        }
                        )),
                        l && !D(L(o).toString()) && o.push(g),
                        o.push(l ? u : ""),
                        o.push("}"),
                        o
                    },
                    ThisExpression: function(e, t, i) {
                        return "this"
                    },
                    Super: function(e, t, i) {
                        return "super"
                    },
                    Identifier: function(e, t, i) {
                        return J(e)
                    },
                    ImportDefaultSpecifier: function(e, t, i) {
                        return J(e.id || e.local)
                    },
                    ImportNamespaceSpecifier: function(e, t, i) {
                        var r = ["*"]
                          , n = e.id || e.local;
                        return n && r.push(v + "as" + I() + J(n)),
                        r
                    },
                    ImportSpecifier: function(e, t, i) {
                        var r = e.imported
                          , n = [r.name]
                          , o = e.local;
                        return o && o.name !== r.name && n.push(I() + "as" + I() + J(o)),
                        n
                    },
                    ExportSpecifier: function(e, t, i) {
                        var r = e.local
                          , n = [r.name]
                          , o = e.exported;
                        return o && o.name !== r.name && n.push(I() + "as" + I() + J(o)),
                        n
                    },
                    Literal: function(e, t, i) {
                        var n;
                        if (e.hasOwnProperty("raw") && w && E.raw)
                            try {
                                if ((n = w(e.raw).body[0].expression).type === r.Literal && n.value === e.value)
                                    return e.raw
                            } catch (e) {}
                        return null === e.value ? "null" : "string" == typeof e.value ? function(e) {
                            var t, i, r, n, o, s = "", a = 0, u = 0;
                            for (t = 0,
                            i = e.length; t < i; ++t) {
                                if (39 === (r = e.charCodeAt(t)))
                                    ++a;
                                else if (34 === r)
                                    ++u;
                                else if (47 === r && h)
                                    s += "\\";
                                else {
                                    if (l.code.isLineTerminator(r) || 92 === r) {
                                        s += F(r);
                                        continue
                                    }
                                    if (!l.code.isIdentifierPartES5(r) && (h && r < 32 || !h && !m && (r < 32 || r > 126))) {
                                        s += B(r, e.charCodeAt(t + 1));
                                        continue
                                    }
                                }
                                s += String.fromCharCode(r)
                            }
                            if (o = (n = !("double" === f || "auto" === f && u < a)) ? "'" : '"',
                            !(n ? a : u))
                                return o + s + o;
                            for (e = s,
                            s = o,
                            t = 0,
                            i = e.length; t < i; ++t)
                                (39 === (r = e.charCodeAt(t)) && n || 34 === r && !n) && (s += "\\"),
                                s += String.fromCharCode(r);
                            return s + o
                        }(e.value) : "number" == typeof e.value ? function(e) {
                            var t, i, r, n, o;
                            if (e != e)
                                throw new Error("Numeric literal whose value is NaN");
                            if (e < 0 || 0 === e && 1 / e < 0)
                                throw new Error("Numeric literal whose value is negative");
                            if (e === 1 / 0)
                                return h ? "null" : p ? "1e400" : "1e+400";
                            if (t = "" + e,
                            !p || t.length < 3)
                                return t;
                            for (i = t.indexOf("."),
                            h || 48 !== t.charCodeAt(0) || 1 !== i || (i = 0,
                            t = t.slice(1)),
                            r = t,
                            t = t.replace("e+", "e"),
                            n = 0,
                            (o = r.indexOf("e")) > 0 && (n = +r.slice(o + 1),
                            r = r.slice(0, o)),
                            i >= 0 && (n -= r.length - i - 1,
                            r = +(r.slice(0, i) + r.slice(i + 1)) + ""),
                            o = 0; 48 === r.charCodeAt(r.length + o - 1); )
                                --o;
                            return 0 !== o && (n -= o,
                            r = r.slice(0, o)),
                            0 !== n && (r += "e" + n),
                            (r.length < t.length || d && e > 1e12 && Math.floor(e) === e && (r = "0x" + e.toString(16)).length < t.length) && +r === e && (t = r),
                            t
                        }(e.value) : "boolean" == typeof e.value ? e.value ? "true" : "false" : e.regex ? "/" + e.regex.pattern + "/" + e.regex.flags : function(e) {
                            var t, i, r, n, o, s, a, l;
                            if (i = e.toString(),
                            e.source) {
                                if (!(t = i.match(/\/([^/]*)$/)))
                                    return i;
                                for (r = t[1],
                                i = "",
                                a = !1,
                                l = !1,
                                n = 0,
                                o = e.source.length; n < o; ++n)
                                    s = e.source.charCodeAt(n),
                                    l ? (i += O(s, l),
                                    l = !1) : (a ? 93 === s && (a = !1) : 47 === s ? i += "\\" : 91 === s && (a = !0),
                                    i += O(s, l),
                                    l = 92 === s);
                                return "/" + i + "/" + r
                            }
                            return i
                        }(e.value)
                    },
                    GeneratorExpression: function(e, t, i) {
                        return this.ComprehensionExpression(e, t, i)
                    },
                    ComprehensionExpression: function(e, t, i) {
                        var o, s, a, l, u = this;
                        return o = e.type === r.GeneratorExpression ? ["("] : ["["],
                        E.moz.comprehensionExpressionStartsWithAssignment && (l = this.generateExpression(e.body, n.Assignment, 7),
                        o.push(l)),
                        e.blocks && U((function() {
                            for (s = 0,
                            a = e.blocks.length; s < a; ++s)
                                l = u.generateExpression(e.blocks[s], n.Sequence, 7),
                                s > 0 || E.moz.comprehensionExpressionStartsWithAssignment ? o = N(o, l) : o.push(l)
                        }
                        )),
                        e.filter && (o = N(o, "if" + v),
                        l = this.generateExpression(e.filter, n.Sequence, 7),
                        o = N(o, ["(", l, ")"])),
                        E.moz.comprehensionExpressionStartsWithAssignment || (l = this.generateExpression(e.body, n.Assignment, 7),
                        o = N(o, l)),
                        o.push(e.type === r.GeneratorExpression ? ")" : "]"),
                        o
                    },
                    ComprehensionBlock: function(e, t, i) {
                        var o;
                        return o = N(o = e.left.type === r.VariableDeclaration ? [e.left.kind, I(), this.generateStatement(e.left.declarations[0], 0)] : this.generateExpression(e.left, n.Call, 7), e.of ? "of" : "in"),
                        o = N(o, this.generateExpression(e.right, n.Sequence, 7)),
                        ["for" + v + "(", o, ")"]
                    },
                    SpreadElement: function(e, t, i) {
                        return ["...", this.generateExpression(e.argument, n.Assignment, 7)]
                    },
                    TaggedTemplateExpression: function(e, t, i) {
                        var r = 3;
                        return 2 & i || (r = 1),
                        G([this.generateExpression(e.tag, n.Call, r), this.generateExpression(e.quasi, n.Primary, 4)], n.TaggedTemplate, t)
                    },
                    TemplateElement: function(e, t, i) {
                        return e.value.raw
                    },
                    TemplateLiteral: function(e, t, i) {
                        var r, o, s;
                        for (r = ["`"],
                        o = 0,
                        s = e.quasis.length; o < s; ++o)
                            r.push(this.generateExpression(e.quasis[o], n.Primary, 7)),
                            o + 1 < s && (r.push("${" + v),
                            r.push(this.generateExpression(e.expressions[o], n.Sequence, 7)),
                            r.push(v + "}"));
                        return r.push("`"),
                        r
                    },
                    ModuleSpecifier: function(e, t, i) {
                        return this.Literal(e, t, i)
                    },
                    ImportExpression: function(e, t, i) {
                        return G(["import(", this.generateExpression(e.source, n.Assignment, 7), ")"], n.Call, t)
                    }
                },
                A(X.prototype, X.Expression),
                X.prototype.generateExpression = function(e, t, i) {
                    var o, s;
                    return s = e.type || r.Property,
                    E.verbatim && e.hasOwnProperty(E.verbatim) ? function(e, t) {
                        var i;
                        return L("string" == typeof (i = e[E.verbatim]) ? G(q(i), n.Sequence, t) : G(q(i.content), null != i.precedence ? i.precedence : n.Sequence, t), e)
                    }(e, t) : (o = this[s](e, t, i),
                    E.comment && (o = V(e, o)),
                    L(o, e))
                }
                ,
                X.prototype.generateStatement = function(e, t) {
                    var i, n;
                    return i = this[e.type](e, t),
                    E.comment && (i = V(e, i)),
                    n = L(i).toString(),
                    e.type !== r.Program || _ || "" !== g || "\n" !== n.charAt(n.length - 1) || (i = T ? L(i).replaceRight(/\s+$/, "") : n.replace(/\s+$/, "")),
                    L(i, e)
                }
                ,
                S = {
                    indent: {
                        style: "",
                        base: 0
                    },
                    renumber: !0,
                    hexadecimal: !0,
                    quotes: "auto",
                    escapeless: !0,
                    compact: !0,
                    parentheses: !1,
                    semicolons: !1
                },
                j = {
                    indent: {
                        style: "    ",
                        base: 0,
                        adjustMultilineComment: !1
                    },
                    newline: "\n",
                    space: " ",
                    json: !1,
                    renumber: !1,
                    hexadecimal: !1,
                    quotes: "single",
                    escapeless: !1,
                    compact: !1,
                    parentheses: !0,
                    semicolons: !0,
                    safeConcatenation: !1,
                    preserveBlankLines: !1
                },
                t.version = i(/*! ./package.json */
                "./node_modules/escodegen/package.json").version,
                t.generate = function(r, n) {
                    var o, a, l = {
                        indent: null,
                        base: null,
                        parse: null,
                        comment: !1,
                        format: {
                            indent: {
                                style: "    ",
                                base: 0,
                                adjustMultilineComment: !1
                            },
                            newline: "\n",
                            space: " ",
                            json: !1,
                            renumber: !1,
                            hexadecimal: !1,
                            quotes: "single",
                            escapeless: !1,
                            compact: !1,
                            parentheses: !0,
                            semicolons: !0,
                            safeConcatenation: !1,
                            preserveBlankLines: !1
                        },
                        moz: {
                            comprehensionExpressionStartsWithAssignment: !1,
                            starlessGenerator: !1
                        },
                        sourceMap: null,
                        sourceMapRoot: null,
                        sourceMapWithCode: !1,
                        directive: !1,
                        raw: !0,
                        verbatim: null,
                        sourceCode: null
                    };
                    return null != n ? ("string" == typeof n.indent && (l.format.indent.style = n.indent),
                    "number" == typeof n.base && (l.format.indent.base = n.base),
                    n = k(l, n),
                    c = n.format.indent.style,
                    u = "string" == typeof n.base ? n.base : R(c, n.format.indent.base)) : (c = (n = l).format.indent.style,
                    u = R(c, n.format.indent.base)),
                    h = n.format.json,
                    p = n.format.renumber,
                    d = !h && n.format.hexadecimal,
                    f = h ? "double" : n.format.quotes,
                    m = n.format.escapeless,
                    g = n.format.newline,
                    v = n.format.space,
                    n.format.compact && (g = v = c = u = ""),
                    y = n.format.parentheses,
                    b = n.format.semicolons,
                    _ = n.format.safeConcatenation,
                    x = n.directive,
                    w = h ? null : n.parse,
                    T = n.sourceMap,
                    M = n.sourceCode,
                    C = n.format.preserveBlankLines && null !== M,
                    E = n,
                    T && (s = t.browser ? e.sourceMap.SourceNode : i(/*! source-map */
                    "./node_modules/source-map/source-map.js").SourceNode),
                    o = K(r),
                    T ? (a = o.toStringWithSourceMap({
                        file: n.file,
                        sourceRoot: n.sourceMapRoot
                    }),
                    n.sourceContent && a.map.setSourceContent(n.sourceMap, n.sourceContent),
                    n.sourceMapWithCode ? a : a.map.toString()) : (a = {
                        code: o.toString(),
                        map: null
                    },
                    n.sourceMapWithCode ? a : a.code)
                }
                ,
                t.attachComments = a.attachComments,
                t.Precedence = k({}, n),
                t.browser = !1,
                t.FORMAT_MINIFY = S,
                t.FORMAT_DEFAULTS = j
            }()
        }
        ).call(this, i(/*! ./../webpack/buildin/global.js */
        "./node_modules/webpack/buildin/global.js"))
    },
    "./node_modules/escodegen/package.json": /*!*********************************************!*\
  !*** ./node_modules/escodegen/package.json ***!
  \*********************************************/
    /*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, bin, bugs, bundleDependencies, dependencies, deprecated, description, devDependencies, engines, files, homepage, license, main, maintainers, name, optionalDependencies, repository, scripts, version, default */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e) {
        e.exports = JSON.parse('{"_from":"escodegen","_id":"escodegen@1.12.0","_inBundle":false,"_integrity":"sha512-TuA+EhsanGcme5T3R0L80u4t8CpbXQjegRmf7+FPTJrtCTErXFeelblRgHQa1FofEzqYYJmJ/OqjTwREp9qgmg==","_location":"/escodegen","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"escodegen","name":"escodegen","escapedName":"escodegen","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/escodegen/-/escodegen-1.12.0.tgz","_shasum":"f763daf840af172bb3a2b6dd7219c0e17f7ff541","_spec":"escodegen","_where":"D:\\\\SourceCodes\\\\THING.EVAL","bin":{"esgenerate":"./bin/esgenerate.js","escodegen":"./bin/escodegen.js"},"bugs":{"url":"https://github.com/estools/escodegen/issues"},"bundleDependencies":false,"dependencies":{"esprima":"^3.1.3","estraverse":"^4.2.0","esutils":"^2.0.2","optionator":"^0.8.1","source-map":"~0.6.1"},"deprecated":false,"description":"ECMAScript code generator","devDependencies":{"acorn":"^4.0.4","bluebird":"^3.4.7","bower-registry-client":"^1.0.0","chai":"^3.5.0","commonjs-everywhere":"^0.9.7","gulp":"^3.8.10","gulp-eslint":"^3.0.1","gulp-mocha":"^3.0.1","semver":"^5.1.0"},"engines":{"node":">=4.0"},"files":["LICENSE.BSD","README.md","bin","escodegen.js","package.json"],"homepage":"http://github.com/estools/escodegen","license":"BSD-2-Clause","main":"escodegen.js","maintainers":[{"name":"Yusuke Suzuki","email":"utatane.tea@gmail.com","url":"http://github.com/Constellation"}],"name":"escodegen","optionalDependencies":{"source-map":"~0.6.1"},"repository":{"type":"git","url":"git+ssh://git@github.com/estools/escodegen.git"},"scripts":{"build":"cjsify -a path: tools/entry-point.js > escodegen.browser.js","build-min":"cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js","lint":"gulp lint","release":"node tools/release.js","test":"gulp travis","unit-test":"gulp test"},"version":"1.12.0"}')
    },
    "./node_modules/esprima/dist/esprima.js": /*!**********************************************!*\
  !*** ./node_modules/esprima/dist/esprima.js ***!
  \**********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r;
        r = function() {
            return function(e) {
                var t = {};
                function i(r) {
                    if (t[r])
                        return t[r].exports;
                    var n = t[r] = {
                        exports: {},
                        id: r,
                        loaded: !1
                    };
                    return e[r].call(n.exports, n, n.exports, i),
                    n.loaded = !0,
                    n.exports
                }
                return i.m = e,
                i.c = t,
                i.p = "",
                i(0)
            }([function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(1)
                  , n = i(3)
                  , o = i(8)
                  , s = i(15);
                function a(e, t, i) {
                    var s = null
                      , a = function(e, t) {
                        i && i(e, t),
                        s && s.visit(e, t)
                    }
                      , l = "function" == typeof i ? a : null
                      , u = !1;
                    if (t) {
                        u = "boolean" == typeof t.comment && t.comment;
                        var c = "boolean" == typeof t.attachComment && t.attachComment;
                        (u || c) && ((s = new r.CommentHandler).attach = c,
                        t.comment = !0,
                        l = a)
                    }
                    var h, p = !1;
                    t && "string" == typeof t.sourceType && (p = "module" === t.sourceType),
                    h = t && "boolean" == typeof t.jsx && t.jsx ? new n.JSXParser(e,t,l) : new o.Parser(e,t,l);
                    var d = p ? h.parseModule() : h.parseScript();
                    return u && s && (d.comments = s.comments),
                    h.config.tokens && (d.tokens = h.tokens),
                    h.config.tolerant && (d.errors = h.errorHandler.errors),
                    d
                }
                t.parse = a,
                t.parseModule = function(e, t, i) {
                    var r = t || {};
                    return r.sourceType = "module",
                    a(e, r, i)
                }
                ,
                t.parseScript = function(e, t, i) {
                    var r = t || {};
                    return r.sourceType = "script",
                    a(e, r, i)
                }
                ,
                t.tokenize = function(e, t, i) {
                    var r, n = new s.Tokenizer(e,t);
                    r = [];
                    try {
                        for (; ; ) {
                            var o = n.getNextToken();
                            if (!o)
                                break;
                            i && (o = i(o)),
                            r.push(o)
                        }
                    } catch (e) {
                        n.errorHandler.tolerate(e)
                    }
                    return n.errorHandler.tolerant && (r.errors = n.errors()),
                    r
                }
                ;
                var l = i(2);
                t.Syntax = l.Syntax,
                t.version = "4.0.1"
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(2)
                  , n = function() {
                    function e() {
                        this.attach = !1,
                        this.comments = [],
                        this.stack = [],
                        this.leading = [],
                        this.trailing = []
                    }
                    return e.prototype.insertInnerComments = function(e, t) {
                        if (e.type === r.Syntax.BlockStatement && 0 === e.body.length) {
                            for (var i = [], n = this.leading.length - 1; n >= 0; --n) {
                                var o = this.leading[n];
                                t.end.offset >= o.start && (i.unshift(o.comment),
                                this.leading.splice(n, 1),
                                this.trailing.splice(n, 1))
                            }
                            i.length && (e.innerComments = i)
                        }
                    }
                    ,
                    e.prototype.findTrailingComments = function(e) {
                        var t = [];
                        if (this.trailing.length > 0) {
                            for (var i = this.trailing.length - 1; i >= 0; --i) {
                                var r = this.trailing[i];
                                r.start >= e.end.offset && t.unshift(r.comment)
                            }
                            return this.trailing.length = 0,
                            t
                        }
                        var n = this.stack[this.stack.length - 1];
                        if (n && n.node.trailingComments) {
                            var o = n.node.trailingComments[0];
                            o && o.range[0] >= e.end.offset && (t = n.node.trailingComments,
                            delete n.node.trailingComments)
                        }
                        return t
                    }
                    ,
                    e.prototype.findLeadingComments = function(e) {
                        for (var t, i = []; this.stack.length > 0 && (o = this.stack[this.stack.length - 1]) && o.start >= e.start.offset; )
                            t = o.node,
                            this.stack.pop();
                        if (t) {
                            for (var r = (t.leadingComments ? t.leadingComments.length : 0) - 1; r >= 0; --r) {
                                var n = t.leadingComments[r];
                                n.range[1] <= e.start.offset && (i.unshift(n),
                                t.leadingComments.splice(r, 1))
                            }
                            return t.leadingComments && 0 === t.leadingComments.length && delete t.leadingComments,
                            i
                        }
                        for (r = this.leading.length - 1; r >= 0; --r) {
                            var o;
                            (o = this.leading[r]).start <= e.start.offset && (i.unshift(o.comment),
                            this.leading.splice(r, 1))
                        }
                        return i
                    }
                    ,
                    e.prototype.visitNode = function(e, t) {
                        if (!(e.type === r.Syntax.Program && e.body.length > 0)) {
                            this.insertInnerComments(e, t);
                            var i = this.findTrailingComments(t)
                              , n = this.findLeadingComments(t);
                            n.length > 0 && (e.leadingComments = n),
                            i.length > 0 && (e.trailingComments = i),
                            this.stack.push({
                                node: e,
                                start: t.start.offset
                            })
                        }
                    }
                    ,
                    e.prototype.visitComment = function(e, t) {
                        var i = "L" === e.type[0] ? "Line" : "Block"
                          , r = {
                            type: i,
                            value: e.value
                        };
                        if (e.range && (r.range = e.range),
                        e.loc && (r.loc = e.loc),
                        this.comments.push(r),
                        this.attach) {
                            var n = {
                                comment: {
                                    type: i,
                                    value: e.value,
                                    range: [t.start.offset, t.end.offset]
                                },
                                start: t.start.offset
                            };
                            e.loc && (n.comment.loc = e.loc),
                            e.type = i,
                            this.leading.push(n),
                            this.trailing.push(n)
                        }
                    }
                    ,
                    e.prototype.visit = function(e, t) {
                        "LineComment" === e.type || "BlockComment" === e.type ? this.visitComment(e, t) : this.attach && this.visitNode(e, t)
                    }
                    ,
                    e
                }();
                t.CommentHandler = n
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Syntax = {
                    AssignmentExpression: "AssignmentExpression",
                    AssignmentPattern: "AssignmentPattern",
                    ArrayExpression: "ArrayExpression",
                    ArrayPattern: "ArrayPattern",
                    ArrowFunctionExpression: "ArrowFunctionExpression",
                    AwaitExpression: "AwaitExpression",
                    BlockStatement: "BlockStatement",
                    BinaryExpression: "BinaryExpression",
                    BreakStatement: "BreakStatement",
                    CallExpression: "CallExpression",
                    CatchClause: "CatchClause",
                    ClassBody: "ClassBody",
                    ClassDeclaration: "ClassDeclaration",
                    ClassExpression: "ClassExpression",
                    ConditionalExpression: "ConditionalExpression",
                    ContinueStatement: "ContinueStatement",
                    DoWhileStatement: "DoWhileStatement",
                    DebuggerStatement: "DebuggerStatement",
                    EmptyStatement: "EmptyStatement",
                    ExportAllDeclaration: "ExportAllDeclaration",
                    ExportDefaultDeclaration: "ExportDefaultDeclaration",
                    ExportNamedDeclaration: "ExportNamedDeclaration",
                    ExportSpecifier: "ExportSpecifier",
                    ExpressionStatement: "ExpressionStatement",
                    ForStatement: "ForStatement",
                    ForOfStatement: "ForOfStatement",
                    ForInStatement: "ForInStatement",
                    FunctionDeclaration: "FunctionDeclaration",
                    FunctionExpression: "FunctionExpression",
                    Identifier: "Identifier",
                    IfStatement: "IfStatement",
                    ImportDeclaration: "ImportDeclaration",
                    ImportDefaultSpecifier: "ImportDefaultSpecifier",
                    ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
                    ImportSpecifier: "ImportSpecifier",
                    Literal: "Literal",
                    LabeledStatement: "LabeledStatement",
                    LogicalExpression: "LogicalExpression",
                    MemberExpression: "MemberExpression",
                    MetaProperty: "MetaProperty",
                    MethodDefinition: "MethodDefinition",
                    NewExpression: "NewExpression",
                    ObjectExpression: "ObjectExpression",
                    ObjectPattern: "ObjectPattern",
                    Program: "Program",
                    Property: "Property",
                    RestElement: "RestElement",
                    ReturnStatement: "ReturnStatement",
                    SequenceExpression: "SequenceExpression",
                    SpreadElement: "SpreadElement",
                    Super: "Super",
                    SwitchCase: "SwitchCase",
                    SwitchStatement: "SwitchStatement",
                    TaggedTemplateExpression: "TaggedTemplateExpression",
                    TemplateElement: "TemplateElement",
                    TemplateLiteral: "TemplateLiteral",
                    ThisExpression: "ThisExpression",
                    ThrowStatement: "ThrowStatement",
                    TryStatement: "TryStatement",
                    UnaryExpression: "UnaryExpression",
                    UpdateExpression: "UpdateExpression",
                    VariableDeclaration: "VariableDeclaration",
                    VariableDeclarator: "VariableDeclarator",
                    WhileStatement: "WhileStatement",
                    WithStatement: "WithStatement",
                    YieldExpression: "YieldExpression"
                }
            }
            , function(e, t, i) {
                "use strict";
                var r, n = this && this.__extends || (r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var i in t)
                        t.hasOwnProperty(i) && (e[i] = t[i])
                }
                ,
                function(e, t) {
                    function i() {
                        this.constructor = e
                    }
                    r(e, t),
                    e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
                    new i)
                }
                );
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = i(4)
                  , s = i(5)
                  , a = i(6)
                  , l = i(7)
                  , u = i(8)
                  , c = i(13)
                  , h = i(14);
                function p(e) {
                    var t;
                    switch (e.type) {
                    case a.JSXSyntax.JSXIdentifier:
                        t = e.name;
                        break;
                    case a.JSXSyntax.JSXNamespacedName:
                        var i = e;
                        t = p(i.namespace) + ":" + p(i.name);
                        break;
                    case a.JSXSyntax.JSXMemberExpression:
                        var r = e;
                        t = p(r.object) + "." + p(r.property)
                    }
                    return t
                }
                c.TokenName[100] = "JSXIdentifier",
                c.TokenName[101] = "JSXText";
                var d = function(e) {
                    function t(t, i, r) {
                        return e.call(this, t, i, r) || this
                    }
                    return n(t, e),
                    t.prototype.parsePrimaryExpression = function() {
                        return this.match("<") ? this.parseJSXRoot() : e.prototype.parsePrimaryExpression.call(this)
                    }
                    ,
                    t.prototype.startJSX = function() {
                        this.scanner.index = this.startMarker.index,
                        this.scanner.lineNumber = this.startMarker.line,
                        this.scanner.lineStart = this.startMarker.index - this.startMarker.column
                    }
                    ,
                    t.prototype.finishJSX = function() {
                        this.nextToken()
                    }
                    ,
                    t.prototype.reenterJSX = function() {
                        this.startJSX(),
                        this.expectJSX("}"),
                        this.config.tokens && this.tokens.pop()
                    }
                    ,
                    t.prototype.createJSXNode = function() {
                        return this.collectComments(),
                        {
                            index: this.scanner.index,
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        }
                    }
                    ,
                    t.prototype.createJSXChildNode = function() {
                        return {
                            index: this.scanner.index,
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        }
                    }
                    ,
                    t.prototype.scanXHTMLEntity = function(e) {
                        for (var t = "&", i = !0, r = !1, n = !1, s = !1; !this.scanner.eof() && i && !r; ) {
                            var a = this.scanner.source[this.scanner.index];
                            if (a === e)
                                break;
                            if (r = ";" === a,
                            t += a,
                            ++this.scanner.index,
                            !r)
                                switch (t.length) {
                                case 2:
                                    n = "#" === a;
                                    break;
                                case 3:
                                    n && (i = (s = "x" === a) || o.Character.isDecimalDigit(a.charCodeAt(0)),
                                    n = n && !s);
                                    break;
                                default:
                                    i = (i = i && !(n && !o.Character.isDecimalDigit(a.charCodeAt(0)))) && !(s && !o.Character.isHexDigit(a.charCodeAt(0)))
                                }
                        }
                        if (i && r && t.length > 2) {
                            var l = t.substr(1, t.length - 2);
                            n && l.length > 1 ? t = String.fromCharCode(parseInt(l.substr(1), 10)) : s && l.length > 2 ? t = String.fromCharCode(parseInt("0" + l.substr(1), 16)) : n || s || !h.XHTMLEntities[l] || (t = h.XHTMLEntities[l])
                        }
                        return t
                    }
                    ,
                    t.prototype.lexJSX = function() {
                        var e = this.scanner.source.charCodeAt(this.scanner.index);
                        if (60 === e || 62 === e || 47 === e || 58 === e || 61 === e || 123 === e || 125 === e)
                            return {
                                type: 7,
                                value: a = this.scanner.source[this.scanner.index++],
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: this.scanner.index - 1,
                                end: this.scanner.index
                            };
                        if (34 === e || 39 === e) {
                            for (var t = this.scanner.index, i = this.scanner.source[this.scanner.index++], r = ""; !this.scanner.eof() && (l = this.scanner.source[this.scanner.index++]) !== i; )
                                r += "&" === l ? this.scanXHTMLEntity(i) : l;
                            return {
                                type: 8,
                                value: r,
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: t,
                                end: this.scanner.index
                            }
                        }
                        if (46 === e) {
                            var n = this.scanner.source.charCodeAt(this.scanner.index + 1)
                              , s = this.scanner.source.charCodeAt(this.scanner.index + 2)
                              , a = 46 === n && 46 === s ? "..." : ".";
                            return t = this.scanner.index,
                            this.scanner.index += a.length,
                            {
                                type: 7,
                                value: a,
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: t,
                                end: this.scanner.index
                            }
                        }
                        if (96 === e)
                            return {
                                type: 10,
                                value: "",
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: this.scanner.index,
                                end: this.scanner.index
                            };
                        if (o.Character.isIdentifierStart(e) && 92 !== e) {
                            for (t = this.scanner.index,
                            ++this.scanner.index; !this.scanner.eof(); ) {
                                var l = this.scanner.source.charCodeAt(this.scanner.index);
                                if (o.Character.isIdentifierPart(l) && 92 !== l)
                                    ++this.scanner.index;
                                else {
                                    if (45 !== l)
                                        break;
                                    ++this.scanner.index
                                }
                            }
                            return {
                                type: 100,
                                value: this.scanner.source.slice(t, this.scanner.index),
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: t,
                                end: this.scanner.index
                            }
                        }
                        return this.scanner.lex()
                    }
                    ,
                    t.prototype.nextJSXToken = function() {
                        this.collectComments(),
                        this.startMarker.index = this.scanner.index,
                        this.startMarker.line = this.scanner.lineNumber,
                        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                        var e = this.lexJSX();
                        return this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart,
                        this.config.tokens && this.tokens.push(this.convertToken(e)),
                        e
                    }
                    ,
                    t.prototype.nextJSXText = function() {
                        this.startMarker.index = this.scanner.index,
                        this.startMarker.line = this.scanner.lineNumber,
                        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                        for (var e = this.scanner.index, t = ""; !this.scanner.eof(); ) {
                            var i = this.scanner.source[this.scanner.index];
                            if ("{" === i || "<" === i)
                                break;
                            ++this.scanner.index,
                            t += i,
                            o.Character.isLineTerminator(i.charCodeAt(0)) && (++this.scanner.lineNumber,
                            "\r" === i && "\n" === this.scanner.source[this.scanner.index] && ++this.scanner.index,
                            this.scanner.lineStart = this.scanner.index)
                        }
                        this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                        var r = {
                            type: 101,
                            value: t,
                            lineNumber: this.scanner.lineNumber,
                            lineStart: this.scanner.lineStart,
                            start: e,
                            end: this.scanner.index
                        };
                        return t.length > 0 && this.config.tokens && this.tokens.push(this.convertToken(r)),
                        r
                    }
                    ,
                    t.prototype.peekJSXToken = function() {
                        var e = this.scanner.saveState();
                        this.scanner.scanComments();
                        var t = this.lexJSX();
                        return this.scanner.restoreState(e),
                        t
                    }
                    ,
                    t.prototype.expectJSX = function(e) {
                        var t = this.nextJSXToken();
                        7 === t.type && t.value === e || this.throwUnexpectedToken(t)
                    }
                    ,
                    t.prototype.matchJSX = function(e) {
                        var t = this.peekJSXToken();
                        return 7 === t.type && t.value === e
                    }
                    ,
                    t.prototype.parseJSXIdentifier = function() {
                        var e = this.createJSXNode()
                          , t = this.nextJSXToken();
                        return 100 !== t.type && this.throwUnexpectedToken(t),
                        this.finalize(e, new s.JSXIdentifier(t.value))
                    }
                    ,
                    t.prototype.parseJSXElementName = function() {
                        var e = this.createJSXNode()
                          , t = this.parseJSXIdentifier();
                        if (this.matchJSX(":")) {
                            var i = t;
                            this.expectJSX(":");
                            var r = this.parseJSXIdentifier();
                            t = this.finalize(e, new s.JSXNamespacedName(i,r))
                        } else if (this.matchJSX("."))
                            for (; this.matchJSX("."); ) {
                                var n = t;
                                this.expectJSX(".");
                                var o = this.parseJSXIdentifier();
                                t = this.finalize(e, new s.JSXMemberExpression(n,o))
                            }
                        return t
                    }
                    ,
                    t.prototype.parseJSXAttributeName = function() {
                        var e, t = this.createJSXNode(), i = this.parseJSXIdentifier();
                        if (this.matchJSX(":")) {
                            var r = i;
                            this.expectJSX(":");
                            var n = this.parseJSXIdentifier();
                            e = this.finalize(t, new s.JSXNamespacedName(r,n))
                        } else
                            e = i;
                        return e
                    }
                    ,
                    t.prototype.parseJSXStringLiteralAttribute = function() {
                        var e = this.createJSXNode()
                          , t = this.nextJSXToken();
                        8 !== t.type && this.throwUnexpectedToken(t);
                        var i = this.getTokenRaw(t);
                        return this.finalize(e, new l.Literal(t.value,i))
                    }
                    ,
                    t.prototype.parseJSXExpressionAttribute = function() {
                        var e = this.createJSXNode();
                        this.expectJSX("{"),
                        this.finishJSX(),
                        this.match("}") && this.tolerateError("JSX attributes must only be assigned a non-empty expression");
                        var t = this.parseAssignmentExpression();
                        return this.reenterJSX(),
                        this.finalize(e, new s.JSXExpressionContainer(t))
                    }
                    ,
                    t.prototype.parseJSXAttributeValue = function() {
                        return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute()
                    }
                    ,
                    t.prototype.parseJSXNameValueAttribute = function() {
                        var e = this.createJSXNode()
                          , t = this.parseJSXAttributeName()
                          , i = null;
                        return this.matchJSX("=") && (this.expectJSX("="),
                        i = this.parseJSXAttributeValue()),
                        this.finalize(e, new s.JSXAttribute(t,i))
                    }
                    ,
                    t.prototype.parseJSXSpreadAttribute = function() {
                        var e = this.createJSXNode();
                        this.expectJSX("{"),
                        this.expectJSX("..."),
                        this.finishJSX();
                        var t = this.parseAssignmentExpression();
                        return this.reenterJSX(),
                        this.finalize(e, new s.JSXSpreadAttribute(t))
                    }
                    ,
                    t.prototype.parseJSXAttributes = function() {
                        for (var e = []; !this.matchJSX("/") && !this.matchJSX(">"); ) {
                            var t = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
                            e.push(t)
                        }
                        return e
                    }
                    ,
                    t.prototype.parseJSXOpeningElement = function() {
                        var e = this.createJSXNode();
                        this.expectJSX("<");
                        var t = this.parseJSXElementName()
                          , i = this.parseJSXAttributes()
                          , r = this.matchJSX("/");
                        return r && this.expectJSX("/"),
                        this.expectJSX(">"),
                        this.finalize(e, new s.JSXOpeningElement(t,r,i))
                    }
                    ,
                    t.prototype.parseJSXBoundaryElement = function() {
                        var e = this.createJSXNode();
                        if (this.expectJSX("<"),
                        this.matchJSX("/")) {
                            this.expectJSX("/");
                            var t = this.parseJSXElementName();
                            return this.expectJSX(">"),
                            this.finalize(e, new s.JSXClosingElement(t))
                        }
                        var i = this.parseJSXElementName()
                          , r = this.parseJSXAttributes()
                          , n = this.matchJSX("/");
                        return n && this.expectJSX("/"),
                        this.expectJSX(">"),
                        this.finalize(e, new s.JSXOpeningElement(i,n,r))
                    }
                    ,
                    t.prototype.parseJSXEmptyExpression = function() {
                        var e = this.createJSXChildNode();
                        return this.collectComments(),
                        this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart,
                        this.finalize(e, new s.JSXEmptyExpression)
                    }
                    ,
                    t.prototype.parseJSXExpressionContainer = function() {
                        var e, t = this.createJSXNode();
                        return this.expectJSX("{"),
                        this.matchJSX("}") ? (e = this.parseJSXEmptyExpression(),
                        this.expectJSX("}")) : (this.finishJSX(),
                        e = this.parseAssignmentExpression(),
                        this.reenterJSX()),
                        this.finalize(t, new s.JSXExpressionContainer(e))
                    }
                    ,
                    t.prototype.parseJSXChildren = function() {
                        for (var e = []; !this.scanner.eof(); ) {
                            var t = this.createJSXChildNode()
                              , i = this.nextJSXText();
                            if (i.start < i.end) {
                                var r = this.getTokenRaw(i)
                                  , n = this.finalize(t, new s.JSXText(i.value,r));
                                e.push(n)
                            }
                            if ("{" !== this.scanner.source[this.scanner.index])
                                break;
                            var o = this.parseJSXExpressionContainer();
                            e.push(o)
                        }
                        return e
                    }
                    ,
                    t.prototype.parseComplexJSXElement = function(e) {
                        for (var t = []; !this.scanner.eof(); ) {
                            e.children = e.children.concat(this.parseJSXChildren());
                            var i = this.createJSXChildNode()
                              , r = this.parseJSXBoundaryElement();
                            if (r.type === a.JSXSyntax.JSXOpeningElement) {
                                var n = r;
                                if (n.selfClosing) {
                                    var o = this.finalize(i, new s.JSXElement(n,[],null));
                                    e.children.push(o)
                                } else
                                    t.push(e),
                                    e = {
                                        node: i,
                                        opening: n,
                                        closing: null,
                                        children: []
                                    }
                            }
                            if (r.type === a.JSXSyntax.JSXClosingElement) {
                                e.closing = r;
                                var l = p(e.opening.name);
                                if (l !== p(e.closing.name) && this.tolerateError("Expected corresponding JSX closing tag for %0", l),
                                !(t.length > 0))
                                    break;
                                o = this.finalize(e.node, new s.JSXElement(e.opening,e.children,e.closing)),
                                (e = t[t.length - 1]).children.push(o),
                                t.pop()
                            }
                        }
                        return e
                    }
                    ,
                    t.prototype.parseJSXElement = function() {
                        var e = this.createJSXNode()
                          , t = this.parseJSXOpeningElement()
                          , i = []
                          , r = null;
                        if (!t.selfClosing) {
                            var n = this.parseComplexJSXElement({
                                node: e,
                                opening: t,
                                closing: r,
                                children: i
                            });
                            i = n.children,
                            r = n.closing
                        }
                        return this.finalize(e, new s.JSXElement(t,i,r))
                    }
                    ,
                    t.prototype.parseJSXRoot = function() {
                        this.config.tokens && this.tokens.pop(),
                        this.startJSX();
                        var e = this.parseJSXElement();
                        return this.finishJSX(),
                        e
                    }
                    ,
                    t.prototype.isStartOfExpression = function() {
                        return e.prototype.isStartOfExpression.call(this) || this.match("<")
                    }
                    ,
                    t
                }(u.Parser);
                t.JSXParser = d
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = {
                    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
                    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
                };
                t.Character = {
                    fromCodePoint: function(e) {
                        return e < 65536 ? String.fromCharCode(e) : String.fromCharCode(55296 + (e - 65536 >> 10)) + String.fromCharCode(56320 + (e - 65536 & 1023))
                    },
                    isWhiteSpace: function(e) {
                        return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || e >= 5760 && [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(e) >= 0
                    },
                    isLineTerminator: function(e) {
                        return 10 === e || 13 === e || 8232 === e || 8233 === e
                    },
                    isIdentifierStart: function(e) {
                        return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || 92 === e || e >= 128 && i.NonAsciiIdentifierStart.test(t.Character.fromCodePoint(e))
                    },
                    isIdentifierPart: function(e) {
                        return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || 92 === e || e >= 128 && i.NonAsciiIdentifierPart.test(t.Character.fromCodePoint(e))
                    },
                    isDecimalDigit: function(e) {
                        return e >= 48 && e <= 57
                    },
                    isHexDigit: function(e) {
                        return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102
                    },
                    isOctalDigit: function(e) {
                        return e >= 48 && e <= 55
                    }
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(6);
                t.JSXClosingElement = function(e) {
                    this.type = r.JSXSyntax.JSXClosingElement,
                    this.name = e
                }
                ;
                t.JSXElement = function(e, t, i) {
                    this.type = r.JSXSyntax.JSXElement,
                    this.openingElement = e,
                    this.children = t,
                    this.closingElement = i
                }
                ;
                t.JSXEmptyExpression = function() {
                    this.type = r.JSXSyntax.JSXEmptyExpression
                }
                ;
                t.JSXExpressionContainer = function(e) {
                    this.type = r.JSXSyntax.JSXExpressionContainer,
                    this.expression = e
                }
                ;
                t.JSXIdentifier = function(e) {
                    this.type = r.JSXSyntax.JSXIdentifier,
                    this.name = e
                }
                ;
                t.JSXMemberExpression = function(e, t) {
                    this.type = r.JSXSyntax.JSXMemberExpression,
                    this.object = e,
                    this.property = t
                }
                ;
                t.JSXAttribute = function(e, t) {
                    this.type = r.JSXSyntax.JSXAttribute,
                    this.name = e,
                    this.value = t
                }
                ;
                t.JSXNamespacedName = function(e, t) {
                    this.type = r.JSXSyntax.JSXNamespacedName,
                    this.namespace = e,
                    this.name = t
                }
                ;
                t.JSXOpeningElement = function(e, t, i) {
                    this.type = r.JSXSyntax.JSXOpeningElement,
                    this.name = e,
                    this.selfClosing = t,
                    this.attributes = i
                }
                ;
                t.JSXSpreadAttribute = function(e) {
                    this.type = r.JSXSyntax.JSXSpreadAttribute,
                    this.argument = e
                }
                ;
                t.JSXText = function(e, t) {
                    this.type = r.JSXSyntax.JSXText,
                    this.value = e,
                    this.raw = t
                }
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.JSXSyntax = {
                    JSXAttribute: "JSXAttribute",
                    JSXClosingElement: "JSXClosingElement",
                    JSXElement: "JSXElement",
                    JSXEmptyExpression: "JSXEmptyExpression",
                    JSXExpressionContainer: "JSXExpressionContainer",
                    JSXIdentifier: "JSXIdentifier",
                    JSXMemberExpression: "JSXMemberExpression",
                    JSXNamespacedName: "JSXNamespacedName",
                    JSXOpeningElement: "JSXOpeningElement",
                    JSXSpreadAttribute: "JSXSpreadAttribute",
                    JSXText: "JSXText"
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(2);
                t.ArrayExpression = function(e) {
                    this.type = r.Syntax.ArrayExpression,
                    this.elements = e
                }
                ;
                t.ArrayPattern = function(e) {
                    this.type = r.Syntax.ArrayPattern,
                    this.elements = e
                }
                ;
                t.ArrowFunctionExpression = function(e, t, i) {
                    this.type = r.Syntax.ArrowFunctionExpression,
                    this.id = null,
                    this.params = e,
                    this.body = t,
                    this.generator = !1,
                    this.expression = i,
                    this.async = !1
                }
                ;
                t.AssignmentExpression = function(e, t, i) {
                    this.type = r.Syntax.AssignmentExpression,
                    this.operator = e,
                    this.left = t,
                    this.right = i
                }
                ;
                t.AssignmentPattern = function(e, t) {
                    this.type = r.Syntax.AssignmentPattern,
                    this.left = e,
                    this.right = t
                }
                ;
                t.AsyncArrowFunctionExpression = function(e, t, i) {
                    this.type = r.Syntax.ArrowFunctionExpression,
                    this.id = null,
                    this.params = e,
                    this.body = t,
                    this.generator = !1,
                    this.expression = i,
                    this.async = !0
                }
                ;
                t.AsyncFunctionDeclaration = function(e, t, i) {
                    this.type = r.Syntax.FunctionDeclaration,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = !1,
                    this.expression = !1,
                    this.async = !0
                }
                ;
                t.AsyncFunctionExpression = function(e, t, i) {
                    this.type = r.Syntax.FunctionExpression,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = !1,
                    this.expression = !1,
                    this.async = !0
                }
                ;
                t.AwaitExpression = function(e) {
                    this.type = r.Syntax.AwaitExpression,
                    this.argument = e
                }
                ;
                t.BinaryExpression = function(e, t, i) {
                    var n = "||" === e || "&&" === e;
                    this.type = n ? r.Syntax.LogicalExpression : r.Syntax.BinaryExpression,
                    this.operator = e,
                    this.left = t,
                    this.right = i
                }
                ;
                t.BlockStatement = function(e) {
                    this.type = r.Syntax.BlockStatement,
                    this.body = e
                }
                ;
                t.BreakStatement = function(e) {
                    this.type = r.Syntax.BreakStatement,
                    this.label = e
                }
                ;
                t.CallExpression = function(e, t) {
                    this.type = r.Syntax.CallExpression,
                    this.callee = e,
                    this.arguments = t
                }
                ;
                t.CatchClause = function(e, t) {
                    this.type = r.Syntax.CatchClause,
                    this.param = e,
                    this.body = t
                }
                ;
                t.ClassBody = function(e) {
                    this.type = r.Syntax.ClassBody,
                    this.body = e
                }
                ;
                t.ClassDeclaration = function(e, t, i) {
                    this.type = r.Syntax.ClassDeclaration,
                    this.id = e,
                    this.superClass = t,
                    this.body = i
                }
                ;
                t.ClassExpression = function(e, t, i) {
                    this.type = r.Syntax.ClassExpression,
                    this.id = e,
                    this.superClass = t,
                    this.body = i
                }
                ;
                t.ComputedMemberExpression = function(e, t) {
                    this.type = r.Syntax.MemberExpression,
                    this.computed = !0,
                    this.object = e,
                    this.property = t
                }
                ;
                t.ConditionalExpression = function(e, t, i) {
                    this.type = r.Syntax.ConditionalExpression,
                    this.test = e,
                    this.consequent = t,
                    this.alternate = i
                }
                ;
                t.ContinueStatement = function(e) {
                    this.type = r.Syntax.ContinueStatement,
                    this.label = e
                }
                ;
                t.DebuggerStatement = function() {
                    this.type = r.Syntax.DebuggerStatement
                }
                ;
                t.Directive = function(e, t) {
                    this.type = r.Syntax.ExpressionStatement,
                    this.expression = e,
                    this.directive = t
                }
                ;
                t.DoWhileStatement = function(e, t) {
                    this.type = r.Syntax.DoWhileStatement,
                    this.body = e,
                    this.test = t
                }
                ;
                t.EmptyStatement = function() {
                    this.type = r.Syntax.EmptyStatement
                }
                ;
                t.ExportAllDeclaration = function(e) {
                    this.type = r.Syntax.ExportAllDeclaration,
                    this.source = e
                }
                ;
                t.ExportDefaultDeclaration = function(e) {
                    this.type = r.Syntax.ExportDefaultDeclaration,
                    this.declaration = e
                }
                ;
                t.ExportNamedDeclaration = function(e, t, i) {
                    this.type = r.Syntax.ExportNamedDeclaration,
                    this.declaration = e,
                    this.specifiers = t,
                    this.source = i
                }
                ;
                t.ExportSpecifier = function(e, t) {
                    this.type = r.Syntax.ExportSpecifier,
                    this.exported = t,
                    this.local = e
                }
                ;
                t.ExpressionStatement = function(e) {
                    this.type = r.Syntax.ExpressionStatement,
                    this.expression = e
                }
                ;
                t.ForInStatement = function(e, t, i) {
                    this.type = r.Syntax.ForInStatement,
                    this.left = e,
                    this.right = t,
                    this.body = i,
                    this.each = !1
                }
                ;
                t.ForOfStatement = function(e, t, i) {
                    this.type = r.Syntax.ForOfStatement,
                    this.left = e,
                    this.right = t,
                    this.body = i
                }
                ;
                t.ForStatement = function(e, t, i, n) {
                    this.type = r.Syntax.ForStatement,
                    this.init = e,
                    this.test = t,
                    this.update = i,
                    this.body = n
                }
                ;
                t.FunctionDeclaration = function(e, t, i, n) {
                    this.type = r.Syntax.FunctionDeclaration,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = n,
                    this.expression = !1,
                    this.async = !1
                }
                ;
                t.FunctionExpression = function(e, t, i, n) {
                    this.type = r.Syntax.FunctionExpression,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = n,
                    this.expression = !1,
                    this.async = !1
                }
                ;
                t.Identifier = function(e) {
                    this.type = r.Syntax.Identifier,
                    this.name = e
                }
                ;
                t.IfStatement = function(e, t, i) {
                    this.type = r.Syntax.IfStatement,
                    this.test = e,
                    this.consequent = t,
                    this.alternate = i
                }
                ;
                t.ImportDeclaration = function(e, t) {
                    this.type = r.Syntax.ImportDeclaration,
                    this.specifiers = e,
                    this.source = t
                }
                ;
                t.ImportDefaultSpecifier = function(e) {
                    this.type = r.Syntax.ImportDefaultSpecifier,
                    this.local = e
                }
                ;
                t.ImportNamespaceSpecifier = function(e) {
                    this.type = r.Syntax.ImportNamespaceSpecifier,
                    this.local = e
                }
                ;
                t.ImportSpecifier = function(e, t) {
                    this.type = r.Syntax.ImportSpecifier,
                    this.local = e,
                    this.imported = t
                }
                ;
                t.LabeledStatement = function(e, t) {
                    this.type = r.Syntax.LabeledStatement,
                    this.label = e,
                    this.body = t
                }
                ;
                t.Literal = function(e, t) {
                    this.type = r.Syntax.Literal,
                    this.value = e,
                    this.raw = t
                }
                ;
                t.MetaProperty = function(e, t) {
                    this.type = r.Syntax.MetaProperty,
                    this.meta = e,
                    this.property = t
                }
                ;
                t.MethodDefinition = function(e, t, i, n, o) {
                    this.type = r.Syntax.MethodDefinition,
                    this.key = e,
                    this.computed = t,
                    this.value = i,
                    this.kind = n,
                    this.static = o
                }
                ;
                t.Module = function(e) {
                    this.type = r.Syntax.Program,
                    this.body = e,
                    this.sourceType = "module"
                }
                ;
                t.NewExpression = function(e, t) {
                    this.type = r.Syntax.NewExpression,
                    this.callee = e,
                    this.arguments = t
                }
                ;
                t.ObjectExpression = function(e) {
                    this.type = r.Syntax.ObjectExpression,
                    this.properties = e
                }
                ;
                t.ObjectPattern = function(e) {
                    this.type = r.Syntax.ObjectPattern,
                    this.properties = e
                }
                ;
                t.Property = function(e, t, i, n, o, s) {
                    this.type = r.Syntax.Property,
                    this.key = t,
                    this.computed = i,
                    this.value = n,
                    this.kind = e,
                    this.method = o,
                    this.shorthand = s
                }
                ;
                t.RegexLiteral = function(e, t, i, n) {
                    this.type = r.Syntax.Literal,
                    this.value = e,
                    this.raw = t,
                    this.regex = {
                        pattern: i,
                        flags: n
                    }
                }
                ;
                t.RestElement = function(e) {
                    this.type = r.Syntax.RestElement,
                    this.argument = e
                }
                ;
                t.ReturnStatement = function(e) {
                    this.type = r.Syntax.ReturnStatement,
                    this.argument = e
                }
                ;
                t.Script = function(e) {
                    this.type = r.Syntax.Program,
                    this.body = e,
                    this.sourceType = "script"
                }
                ;
                t.SequenceExpression = function(e) {
                    this.type = r.Syntax.SequenceExpression,
                    this.expressions = e
                }
                ;
                t.SpreadElement = function(e) {
                    this.type = r.Syntax.SpreadElement,
                    this.argument = e
                }
                ;
                t.StaticMemberExpression = function(e, t) {
                    this.type = r.Syntax.MemberExpression,
                    this.computed = !1,
                    this.object = e,
                    this.property = t
                }
                ;
                t.Super = function() {
                    this.type = r.Syntax.Super
                }
                ;
                t.SwitchCase = function(e, t) {
                    this.type = r.Syntax.SwitchCase,
                    this.test = e,
                    this.consequent = t
                }
                ;
                t.SwitchStatement = function(e, t) {
                    this.type = r.Syntax.SwitchStatement,
                    this.discriminant = e,
                    this.cases = t
                }
                ;
                t.TaggedTemplateExpression = function(e, t) {
                    this.type = r.Syntax.TaggedTemplateExpression,
                    this.tag = e,
                    this.quasi = t
                }
                ;
                t.TemplateElement = function(e, t) {
                    this.type = r.Syntax.TemplateElement,
                    this.value = e,
                    this.tail = t
                }
                ;
                t.TemplateLiteral = function(e, t) {
                    this.type = r.Syntax.TemplateLiteral,
                    this.quasis = e,
                    this.expressions = t
                }
                ;
                t.ThisExpression = function() {
                    this.type = r.Syntax.ThisExpression
                }
                ;
                t.ThrowStatement = function(e) {
                    this.type = r.Syntax.ThrowStatement,
                    this.argument = e
                }
                ;
                t.TryStatement = function(e, t, i) {
                    this.type = r.Syntax.TryStatement,
                    this.block = e,
                    this.handler = t,
                    this.finalizer = i
                }
                ;
                t.UnaryExpression = function(e, t) {
                    this.type = r.Syntax.UnaryExpression,
                    this.operator = e,
                    this.argument = t,
                    this.prefix = !0
                }
                ;
                t.UpdateExpression = function(e, t, i) {
                    this.type = r.Syntax.UpdateExpression,
                    this.operator = e,
                    this.argument = t,
                    this.prefix = i
                }
                ;
                t.VariableDeclaration = function(e, t) {
                    this.type = r.Syntax.VariableDeclaration,
                    this.declarations = e,
                    this.kind = t
                }
                ;
                t.VariableDeclarator = function(e, t) {
                    this.type = r.Syntax.VariableDeclarator,
                    this.id = e,
                    this.init = t
                }
                ;
                t.WhileStatement = function(e, t) {
                    this.type = r.Syntax.WhileStatement,
                    this.test = e,
                    this.body = t
                }
                ;
                t.WithStatement = function(e, t) {
                    this.type = r.Syntax.WithStatement,
                    this.object = e,
                    this.body = t
                }
                ;
                t.YieldExpression = function(e, t) {
                    this.type = r.Syntax.YieldExpression,
                    this.argument = e,
                    this.delegate = t
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(9)
                  , n = i(10)
                  , o = i(11)
                  , s = i(7)
                  , a = i(12)
                  , l = i(2)
                  , u = i(13)
                  , c = function() {
                    function e(e, t, i) {
                        void 0 === t && (t = {}),
                        this.config = {
                            range: "boolean" == typeof t.range && t.range,
                            loc: "boolean" == typeof t.loc && t.loc,
                            source: null,
                            tokens: "boolean" == typeof t.tokens && t.tokens,
                            comment: "boolean" == typeof t.comment && t.comment,
                            tolerant: "boolean" == typeof t.tolerant && t.tolerant
                        },
                        this.config.loc && t.source && null !== t.source && (this.config.source = String(t.source)),
                        this.delegate = i,
                        this.errorHandler = new n.ErrorHandler,
                        this.errorHandler.tolerant = this.config.tolerant,
                        this.scanner = new a.Scanner(e,this.errorHandler),
                        this.scanner.trackComment = this.config.comment,
                        this.operatorPrecedence = {
                            ")": 0,
                            ";": 0,
                            ",": 0,
                            "=": 0,
                            "]": 0,
                            "||": 1,
                            "&&": 2,
                            "|": 3,
                            "^": 4,
                            "&": 5,
                            "==": 6,
                            "!=": 6,
                            "===": 6,
                            "!==": 6,
                            "<": 7,
                            ">": 7,
                            "<=": 7,
                            ">=": 7,
                            "<<": 8,
                            ">>": 8,
                            ">>>": 8,
                            "+": 9,
                            "-": 9,
                            "*": 11,
                            "/": 11,
                            "%": 11
                        },
                        this.lookahead = {
                            type: 2,
                            value: "",
                            lineNumber: this.scanner.lineNumber,
                            lineStart: 0,
                            start: 0,
                            end: 0
                        },
                        this.hasLineTerminator = !1,
                        this.context = {
                            isModule: !1,
                            await: !1,
                            allowIn: !0,
                            allowStrictDirective: !0,
                            allowYield: !0,
                            firstCoverInitializedNameError: null,
                            isAssignmentTarget: !1,
                            isBindingElement: !1,
                            inFunctionBody: !1,
                            inIteration: !1,
                            inSwitch: !1,
                            labelSet: {},
                            strict: !1
                        },
                        this.tokens = [],
                        this.startMarker = {
                            index: 0,
                            line: this.scanner.lineNumber,
                            column: 0
                        },
                        this.lastMarker = {
                            index: 0,
                            line: this.scanner.lineNumber,
                            column: 0
                        },
                        this.nextToken(),
                        this.lastMarker = {
                            index: this.scanner.index,
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        }
                    }
                    return e.prototype.throwError = function(e) {
                        for (var t = [], i = 1; i < arguments.length; i++)
                            t[i - 1] = arguments[i];
                        var n = Array.prototype.slice.call(arguments, 1)
                          , o = e.replace(/%(\d)/g, (function(e, t) {
                            return r.assert(t < n.length, "Message reference must be in range"),
                            n[t]
                        }
                        ))
                          , s = this.lastMarker.index
                          , a = this.lastMarker.line
                          , l = this.lastMarker.column + 1;
                        throw this.errorHandler.createError(s, a, l, o)
                    }
                    ,
                    e.prototype.tolerateError = function(e) {
                        for (var t = [], i = 1; i < arguments.length; i++)
                            t[i - 1] = arguments[i];
                        var n = Array.prototype.slice.call(arguments, 1)
                          , o = e.replace(/%(\d)/g, (function(e, t) {
                            return r.assert(t < n.length, "Message reference must be in range"),
                            n[t]
                        }
                        ))
                          , s = this.lastMarker.index
                          , a = this.scanner.lineNumber
                          , l = this.lastMarker.column + 1;
                        this.errorHandler.tolerateError(s, a, l, o)
                    }
                    ,
                    e.prototype.unexpectedTokenError = function(e, t) {
                        var i, r = t || o.Messages.UnexpectedToken;
                        if (e ? (t || (r = 2 === e.type ? o.Messages.UnexpectedEOS : 3 === e.type ? o.Messages.UnexpectedIdentifier : 6 === e.type ? o.Messages.UnexpectedNumber : 8 === e.type ? o.Messages.UnexpectedString : 10 === e.type ? o.Messages.UnexpectedTemplate : o.Messages.UnexpectedToken,
                        4 === e.type && (this.scanner.isFutureReservedWord(e.value) ? r = o.Messages.UnexpectedReserved : this.context.strict && this.scanner.isStrictModeReservedWord(e.value) && (r = o.Messages.StrictReservedWord))),
                        i = e.value) : i = "ILLEGAL",
                        r = r.replace("%0", i),
                        e && "number" == typeof e.lineNumber) {
                            var n = e.start
                              , s = e.lineNumber
                              , a = this.lastMarker.index - this.lastMarker.column
                              , l = e.start - a + 1;
                            return this.errorHandler.createError(n, s, l, r)
                        }
                        return n = this.lastMarker.index,
                        s = this.lastMarker.line,
                        l = this.lastMarker.column + 1,
                        this.errorHandler.createError(n, s, l, r)
                    }
                    ,
                    e.prototype.throwUnexpectedToken = function(e, t) {
                        throw this.unexpectedTokenError(e, t)
                    }
                    ,
                    e.prototype.tolerateUnexpectedToken = function(e, t) {
                        this.errorHandler.tolerate(this.unexpectedTokenError(e, t))
                    }
                    ,
                    e.prototype.collectComments = function() {
                        if (this.config.comment) {
                            var e = this.scanner.scanComments();
                            if (e.length > 0 && this.delegate)
                                for (var t = 0; t < e.length; ++t) {
                                    var i = e[t]
                                      , r = void 0;
                                    r = {
                                        type: i.multiLine ? "BlockComment" : "LineComment",
                                        value: this.scanner.source.slice(i.slice[0], i.slice[1])
                                    },
                                    this.config.range && (r.range = i.range),
                                    this.config.loc && (r.loc = i.loc);
                                    var n = {
                                        start: {
                                            line: i.loc.start.line,
                                            column: i.loc.start.column,
                                            offset: i.range[0]
                                        },
                                        end: {
                                            line: i.loc.end.line,
                                            column: i.loc.end.column,
                                            offset: i.range[1]
                                        }
                                    };
                                    this.delegate(r, n)
                                }
                        } else
                            this.scanner.scanComments()
                    }
                    ,
                    e.prototype.getTokenRaw = function(e) {
                        return this.scanner.source.slice(e.start, e.end)
                    }
                    ,
                    e.prototype.convertToken = function(e) {
                        var t = {
                            type: u.TokenName[e.type],
                            value: this.getTokenRaw(e)
                        };
                        if (this.config.range && (t.range = [e.start, e.end]),
                        this.config.loc && (t.loc = {
                            start: {
                                line: this.startMarker.line,
                                column: this.startMarker.column
                            },
                            end: {
                                line: this.scanner.lineNumber,
                                column: this.scanner.index - this.scanner.lineStart
                            }
                        }),
                        9 === e.type) {
                            var i = e.pattern
                              , r = e.flags;
                            t.regex = {
                                pattern: i,
                                flags: r
                            }
                        }
                        return t
                    }
                    ,
                    e.prototype.nextToken = function() {
                        var e = this.lookahead;
                        this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart,
                        this.collectComments(),
                        this.scanner.index !== this.startMarker.index && (this.startMarker.index = this.scanner.index,
                        this.startMarker.line = this.scanner.lineNumber,
                        this.startMarker.column = this.scanner.index - this.scanner.lineStart);
                        var t = this.scanner.lex();
                        return this.hasLineTerminator = e.lineNumber !== t.lineNumber,
                        t && this.context.strict && 3 === t.type && this.scanner.isStrictModeReservedWord(t.value) && (t.type = 4),
                        this.lookahead = t,
                        this.config.tokens && 2 !== t.type && this.tokens.push(this.convertToken(t)),
                        e
                    }
                    ,
                    e.prototype.nextRegexToken = function() {
                        this.collectComments();
                        var e = this.scanner.scanRegExp();
                        return this.config.tokens && (this.tokens.pop(),
                        this.tokens.push(this.convertToken(e))),
                        this.lookahead = e,
                        this.nextToken(),
                        e
                    }
                    ,
                    e.prototype.createNode = function() {
                        return {
                            index: this.startMarker.index,
                            line: this.startMarker.line,
                            column: this.startMarker.column
                        }
                    }
                    ,
                    e.prototype.startNode = function(e, t) {
                        void 0 === t && (t = 0);
                        var i = e.start - e.lineStart
                          , r = e.lineNumber;
                        return i < 0 && (i += t,
                        r--),
                        {
                            index: e.start,
                            line: r,
                            column: i
                        }
                    }
                    ,
                    e.prototype.finalize = function(e, t) {
                        if (this.config.range && (t.range = [e.index, this.lastMarker.index]),
                        this.config.loc && (t.loc = {
                            start: {
                                line: e.line,
                                column: e.column
                            },
                            end: {
                                line: this.lastMarker.line,
                                column: this.lastMarker.column
                            }
                        },
                        this.config.source && (t.loc.source = this.config.source)),
                        this.delegate) {
                            var i = {
                                start: {
                                    line: e.line,
                                    column: e.column,
                                    offset: e.index
                                },
                                end: {
                                    line: this.lastMarker.line,
                                    column: this.lastMarker.column,
                                    offset: this.lastMarker.index
                                }
                            };
                            this.delegate(t, i)
                        }
                        return t
                    }
                    ,
                    e.prototype.expect = function(e) {
                        var t = this.nextToken();
                        7 === t.type && t.value === e || this.throwUnexpectedToken(t)
                    }
                    ,
                    e.prototype.expectCommaSeparator = function() {
                        if (this.config.tolerant) {
                            var e = this.lookahead;
                            7 === e.type && "," === e.value ? this.nextToken() : 7 === e.type && ";" === e.value ? (this.nextToken(),
                            this.tolerateUnexpectedToken(e)) : this.tolerateUnexpectedToken(e, o.Messages.UnexpectedToken)
                        } else
                            this.expect(",")
                    }
                    ,
                    e.prototype.expectKeyword = function(e) {
                        var t = this.nextToken();
                        4 === t.type && t.value === e || this.throwUnexpectedToken(t)
                    }
                    ,
                    e.prototype.match = function(e) {
                        return 7 === this.lookahead.type && this.lookahead.value === e
                    }
                    ,
                    e.prototype.matchKeyword = function(e) {
                        return 4 === this.lookahead.type && this.lookahead.value === e
                    }
                    ,
                    e.prototype.matchContextualKeyword = function(e) {
                        return 3 === this.lookahead.type && this.lookahead.value === e
                    }
                    ,
                    e.prototype.matchAssign = function() {
                        if (7 !== this.lookahead.type)
                            return !1;
                        var e = this.lookahead.value;
                        return "=" === e || "*=" === e || "**=" === e || "/=" === e || "%=" === e || "+=" === e || "-=" === e || "<<=" === e || ">>=" === e || ">>>=" === e || "&=" === e || "^=" === e || "|=" === e
                    }
                    ,
                    e.prototype.isolateCoverGrammar = function(e) {
                        var t = this.context.isBindingElement
                          , i = this.context.isAssignmentTarget
                          , r = this.context.firstCoverInitializedNameError;
                        this.context.isBindingElement = !0,
                        this.context.isAssignmentTarget = !0,
                        this.context.firstCoverInitializedNameError = null;
                        var n = e.call(this);
                        return null !== this.context.firstCoverInitializedNameError && this.throwUnexpectedToken(this.context.firstCoverInitializedNameError),
                        this.context.isBindingElement = t,
                        this.context.isAssignmentTarget = i,
                        this.context.firstCoverInitializedNameError = r,
                        n
                    }
                    ,
                    e.prototype.inheritCoverGrammar = function(e) {
                        var t = this.context.isBindingElement
                          , i = this.context.isAssignmentTarget
                          , r = this.context.firstCoverInitializedNameError;
                        this.context.isBindingElement = !0,
                        this.context.isAssignmentTarget = !0,
                        this.context.firstCoverInitializedNameError = null;
                        var n = e.call(this);
                        return this.context.isBindingElement = this.context.isBindingElement && t,
                        this.context.isAssignmentTarget = this.context.isAssignmentTarget && i,
                        this.context.firstCoverInitializedNameError = r || this.context.firstCoverInitializedNameError,
                        n
                    }
                    ,
                    e.prototype.consumeSemicolon = function() {
                        this.match(";") ? this.nextToken() : this.hasLineTerminator || (2 === this.lookahead.type || this.match("}") || this.throwUnexpectedToken(this.lookahead),
                        this.lastMarker.index = this.startMarker.index,
                        this.lastMarker.line = this.startMarker.line,
                        this.lastMarker.column = this.startMarker.column)
                    }
                    ,
                    e.prototype.parsePrimaryExpression = function() {
                        var e, t, i, r = this.createNode();
                        switch (this.lookahead.type) {
                        case 3:
                            (this.context.isModule || this.context.await) && "await" === this.lookahead.value && this.tolerateUnexpectedToken(this.lookahead),
                            e = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(r, new s.Identifier(this.nextToken().value));
                            break;
                        case 6:
                        case 8:
                            this.context.strict && this.lookahead.octal && this.tolerateUnexpectedToken(this.lookahead, o.Messages.StrictOctalLiteral),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            t = this.nextToken(),
                            i = this.getTokenRaw(t),
                            e = this.finalize(r, new s.Literal(t.value,i));
                            break;
                        case 1:
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            t = this.nextToken(),
                            i = this.getTokenRaw(t),
                            e = this.finalize(r, new s.Literal("true" === t.value,i));
                            break;
                        case 5:
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            t = this.nextToken(),
                            i = this.getTokenRaw(t),
                            e = this.finalize(r, new s.Literal(null,i));
                            break;
                        case 10:
                            e = this.parseTemplateLiteral();
                            break;
                        case 7:
                            switch (this.lookahead.value) {
                            case "(":
                                this.context.isBindingElement = !1,
                                e = this.inheritCoverGrammar(this.parseGroupExpression);
                                break;
                            case "[":
                                e = this.inheritCoverGrammar(this.parseArrayInitializer);
                                break;
                            case "{":
                                e = this.inheritCoverGrammar(this.parseObjectInitializer);
                                break;
                            case "/":
                            case "/=":
                                this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1,
                                this.scanner.index = this.startMarker.index,
                                t = this.nextRegexToken(),
                                i = this.getTokenRaw(t),
                                e = this.finalize(r, new s.RegexLiteral(t.regex,i,t.pattern,t.flags));
                                break;
                            default:
                                e = this.throwUnexpectedToken(this.nextToken())
                            }
                            break;
                        case 4:
                            !this.context.strict && this.context.allowYield && this.matchKeyword("yield") ? e = this.parseIdentifierName() : !this.context.strict && this.matchKeyword("let") ? e = this.finalize(r, new s.Identifier(this.nextToken().value)) : (this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            this.matchKeyword("function") ? e = this.parseFunctionExpression() : this.matchKeyword("this") ? (this.nextToken(),
                            e = this.finalize(r, new s.ThisExpression)) : e = this.matchKeyword("class") ? this.parseClassExpression() : this.throwUnexpectedToken(this.nextToken()));
                            break;
                        default:
                            e = this.throwUnexpectedToken(this.nextToken())
                        }
                        return e
                    }
                    ,
                    e.prototype.parseSpreadElement = function() {
                        var e = this.createNode();
                        this.expect("...");
                        var t = this.inheritCoverGrammar(this.parseAssignmentExpression);
                        return this.finalize(e, new s.SpreadElement(t))
                    }
                    ,
                    e.prototype.parseArrayInitializer = function() {
                        var e = this.createNode()
                          , t = [];
                        for (this.expect("["); !this.match("]"); )
                            if (this.match(","))
                                this.nextToken(),
                                t.push(null);
                            else if (this.match("...")) {
                                var i = this.parseSpreadElement();
                                this.match("]") || (this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1,
                                this.expect(",")),
                                t.push(i)
                            } else
                                t.push(this.inheritCoverGrammar(this.parseAssignmentExpression)),
                                this.match("]") || this.expect(",");
                        return this.expect("]"),
                        this.finalize(e, new s.ArrayExpression(t))
                    }
                    ,
                    e.prototype.parsePropertyMethod = function(e) {
                        this.context.isAssignmentTarget = !1,
                        this.context.isBindingElement = !1;
                        var t = this.context.strict
                          , i = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = e.simple;
                        var r = this.isolateCoverGrammar(this.parseFunctionSourceElements);
                        return this.context.strict && e.firstRestricted && this.tolerateUnexpectedToken(e.firstRestricted, e.message),
                        this.context.strict && e.stricted && this.tolerateUnexpectedToken(e.stricted, e.message),
                        this.context.strict = t,
                        this.context.allowStrictDirective = i,
                        r
                    }
                    ,
                    e.prototype.parsePropertyMethodFunction = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters()
                          , r = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new s.FunctionExpression(null,i.params,r,!1))
                    }
                    ,
                    e.prototype.parsePropertyMethodAsyncFunction = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield
                          , i = this.context.await;
                        this.context.allowYield = !1,
                        this.context.await = !0;
                        var r = this.parseFormalParameters()
                          , n = this.parsePropertyMethod(r);
                        return this.context.allowYield = t,
                        this.context.await = i,
                        this.finalize(e, new s.AsyncFunctionExpression(null,r.params,n))
                    }
                    ,
                    e.prototype.parseObjectPropertyKey = function() {
                        var e, t = this.createNode(), i = this.nextToken();
                        switch (i.type) {
                        case 8:
                        case 6:
                            this.context.strict && i.octal && this.tolerateUnexpectedToken(i, o.Messages.StrictOctalLiteral);
                            var r = this.getTokenRaw(i);
                            e = this.finalize(t, new s.Literal(i.value,r));
                            break;
                        case 3:
                        case 1:
                        case 5:
                        case 4:
                            e = this.finalize(t, new s.Identifier(i.value));
                            break;
                        case 7:
                            "[" === i.value ? (e = this.isolateCoverGrammar(this.parseAssignmentExpression),
                            this.expect("]")) : e = this.throwUnexpectedToken(i);
                            break;
                        default:
                            e = this.throwUnexpectedToken(i)
                        }
                        return e
                    }
                    ,
                    e.prototype.isPropertyKey = function(e, t) {
                        return e.type === l.Syntax.Identifier && e.name === t || e.type === l.Syntax.Literal && e.value === t
                    }
                    ,
                    e.prototype.parseObjectProperty = function(e) {
                        var t, i = this.createNode(), r = this.lookahead, n = null, a = null, l = !1, u = !1, c = !1, h = !1;
                        if (3 === r.type) {
                            var p = r.value;
                            this.nextToken(),
                            l = this.match("["),
                            n = (h = !(this.hasLineTerminator || "async" !== p || this.match(":") || this.match("(") || this.match("*") || this.match(","))) ? this.parseObjectPropertyKey() : this.finalize(i, new s.Identifier(p))
                        } else
                            this.match("*") ? this.nextToken() : (l = this.match("["),
                            n = this.parseObjectPropertyKey());
                        var d = this.qualifiedPropertyName(this.lookahead);
                        if (3 === r.type && !h && "get" === r.value && d)
                            t = "get",
                            l = this.match("["),
                            n = this.parseObjectPropertyKey(),
                            this.context.allowYield = !1,
                            a = this.parseGetterMethod();
                        else if (3 === r.type && !h && "set" === r.value && d)
                            t = "set",
                            l = this.match("["),
                            n = this.parseObjectPropertyKey(),
                            a = this.parseSetterMethod();
                        else if (7 === r.type && "*" === r.value && d)
                            t = "init",
                            l = this.match("["),
                            n = this.parseObjectPropertyKey(),
                            a = this.parseGeneratorMethod(),
                            u = !0;
                        else if (n || this.throwUnexpectedToken(this.lookahead),
                        t = "init",
                        this.match(":") && !h)
                            !l && this.isPropertyKey(n, "__proto__") && (e.value && this.tolerateError(o.Messages.DuplicateProtoProperty),
                            e.value = !0),
                            this.nextToken(),
                            a = this.inheritCoverGrammar(this.parseAssignmentExpression);
                        else if (this.match("("))
                            a = h ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(),
                            u = !0;
                        else if (3 === r.type)
                            if (p = this.finalize(i, new s.Identifier(r.value)),
                            this.match("=")) {
                                this.context.firstCoverInitializedNameError = this.lookahead,
                                this.nextToken(),
                                c = !0;
                                var f = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                a = this.finalize(i, new s.AssignmentPattern(p,f))
                            } else
                                c = !0,
                                a = p;
                        else
                            this.throwUnexpectedToken(this.nextToken());
                        return this.finalize(i, new s.Property(t,n,l,a,u,c))
                    }
                    ,
                    e.prototype.parseObjectInitializer = function() {
                        var e = this.createNode();
                        this.expect("{");
                        for (var t = [], i = {
                            value: !1
                        }; !this.match("}"); )
                            t.push(this.parseObjectProperty(i)),
                            this.match("}") || this.expectCommaSeparator();
                        return this.expect("}"),
                        this.finalize(e, new s.ObjectExpression(t))
                    }
                    ,
                    e.prototype.parseTemplateHead = function() {
                        r.assert(this.lookahead.head, "Template literal must start with a template head");
                        var e = this.createNode()
                          , t = this.nextToken()
                          , i = t.value
                          , n = t.cooked;
                        return this.finalize(e, new s.TemplateElement({
                            raw: i,
                            cooked: n
                        },t.tail))
                    }
                    ,
                    e.prototype.parseTemplateElement = function() {
                        10 !== this.lookahead.type && this.throwUnexpectedToken();
                        var e = this.createNode()
                          , t = this.nextToken()
                          , i = t.value
                          , r = t.cooked;
                        return this.finalize(e, new s.TemplateElement({
                            raw: i,
                            cooked: r
                        },t.tail))
                    }
                    ,
                    e.prototype.parseTemplateLiteral = function() {
                        var e = this.createNode()
                          , t = []
                          , i = []
                          , r = this.parseTemplateHead();
                        for (i.push(r); !r.tail; )
                            t.push(this.parseExpression()),
                            r = this.parseTemplateElement(),
                            i.push(r);
                        return this.finalize(e, new s.TemplateLiteral(i,t))
                    }
                    ,
                    e.prototype.reinterpretExpressionAsPattern = function(e) {
                        switch (e.type) {
                        case l.Syntax.Identifier:
                        case l.Syntax.MemberExpression:
                        case l.Syntax.RestElement:
                        case l.Syntax.AssignmentPattern:
                            break;
                        case l.Syntax.SpreadElement:
                            e.type = l.Syntax.RestElement,
                            this.reinterpretExpressionAsPattern(e.argument);
                            break;
                        case l.Syntax.ArrayExpression:
                            e.type = l.Syntax.ArrayPattern;
                            for (var t = 0; t < e.elements.length; t++)
                                null !== e.elements[t] && this.reinterpretExpressionAsPattern(e.elements[t]);
                            break;
                        case l.Syntax.ObjectExpression:
                            for (e.type = l.Syntax.ObjectPattern,
                            t = 0; t < e.properties.length; t++)
                                this.reinterpretExpressionAsPattern(e.properties[t].value);
                            break;
                        case l.Syntax.AssignmentExpression:
                            e.type = l.Syntax.AssignmentPattern,
                            delete e.operator,
                            this.reinterpretExpressionAsPattern(e.left)
                        }
                    }
                    ,
                    e.prototype.parseGroupExpression = function() {
                        var e;
                        if (this.expect("("),
                        this.match(")"))
                            this.nextToken(),
                            this.match("=>") || this.expect("=>"),
                            e = {
                                type: "ArrowParameterPlaceHolder",
                                params: [],
                                async: !1
                            };
                        else {
                            var t = this.lookahead
                              , i = [];
                            if (this.match("..."))
                                e = this.parseRestElement(i),
                                this.expect(")"),
                                this.match("=>") || this.expect("=>"),
                                e = {
                                    type: "ArrowParameterPlaceHolder",
                                    params: [e],
                                    async: !1
                                };
                            else {
                                var r = !1;
                                if (this.context.isBindingElement = !0,
                                e = this.inheritCoverGrammar(this.parseAssignmentExpression),
                                this.match(",")) {
                                    var n = [];
                                    for (this.context.isAssignmentTarget = !1,
                                    n.push(e); 2 !== this.lookahead.type && this.match(","); ) {
                                        if (this.nextToken(),
                                        this.match(")")) {
                                            this.nextToken();
                                            for (var o = 0; o < n.length; o++)
                                                this.reinterpretExpressionAsPattern(n[o]);
                                            r = !0,
                                            e = {
                                                type: "ArrowParameterPlaceHolder",
                                                params: n,
                                                async: !1
                                            }
                                        } else if (this.match("...")) {
                                            for (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead),
                                            n.push(this.parseRestElement(i)),
                                            this.expect(")"),
                                            this.match("=>") || this.expect("=>"),
                                            this.context.isBindingElement = !1,
                                            o = 0; o < n.length; o++)
                                                this.reinterpretExpressionAsPattern(n[o]);
                                            r = !0,
                                            e = {
                                                type: "ArrowParameterPlaceHolder",
                                                params: n,
                                                async: !1
                                            }
                                        } else
                                            n.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                                        if (r)
                                            break
                                    }
                                    r || (e = this.finalize(this.startNode(t), new s.SequenceExpression(n)))
                                }
                                if (!r) {
                                    if (this.expect(")"),
                                    this.match("=>") && (e.type === l.Syntax.Identifier && "yield" === e.name && (r = !0,
                                    e = {
                                        type: "ArrowParameterPlaceHolder",
                                        params: [e],
                                        async: !1
                                    }),
                                    !r)) {
                                        if (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead),
                                        e.type === l.Syntax.SequenceExpression)
                                            for (o = 0; o < e.expressions.length; o++)
                                                this.reinterpretExpressionAsPattern(e.expressions[o]);
                                        else
                                            this.reinterpretExpressionAsPattern(e);
                                        e = {
                                            type: "ArrowParameterPlaceHolder",
                                            params: e.type === l.Syntax.SequenceExpression ? e.expressions : [e],
                                            async: !1
                                        }
                                    }
                                    this.context.isBindingElement = !1
                                }
                            }
                        }
                        return e
                    }
                    ,
                    e.prototype.parseArguments = function() {
                        this.expect("(");
                        var e = [];
                        if (!this.match(")"))
                            for (; ; ) {
                                var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
                                if (e.push(t),
                                this.match(")"))
                                    break;
                                if (this.expectCommaSeparator(),
                                this.match(")"))
                                    break
                            }
                        return this.expect(")"),
                        e
                    }
                    ,
                    e.prototype.isIdentifierName = function(e) {
                        return 3 === e.type || 4 === e.type || 1 === e.type || 5 === e.type
                    }
                    ,
                    e.prototype.parseIdentifierName = function() {
                        var e = this.createNode()
                          , t = this.nextToken();
                        return this.isIdentifierName(t) || this.throwUnexpectedToken(t),
                        this.finalize(e, new s.Identifier(t.value))
                    }
                    ,
                    e.prototype.parseNewExpression = function() {
                        var e, t = this.createNode(), i = this.parseIdentifierName();
                        if (r.assert("new" === i.name, "New expression must start with `new`"),
                        this.match("."))
                            if (this.nextToken(),
                            3 === this.lookahead.type && this.context.inFunctionBody && "target" === this.lookahead.value) {
                                var n = this.parseIdentifierName();
                                e = new s.MetaProperty(i,n)
                            } else
                                this.throwUnexpectedToken(this.lookahead);
                        else {
                            var o = this.isolateCoverGrammar(this.parseLeftHandSideExpression)
                              , a = this.match("(") ? this.parseArguments() : [];
                            e = new s.NewExpression(o,a),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        }
                        return this.finalize(t, e)
                    }
                    ,
                    e.prototype.parseAsyncArgument = function() {
                        var e = this.parseAssignmentExpression();
                        return this.context.firstCoverInitializedNameError = null,
                        e
                    }
                    ,
                    e.prototype.parseAsyncArguments = function() {
                        this.expect("(");
                        var e = [];
                        if (!this.match(")"))
                            for (; ; ) {
                                var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
                                if (e.push(t),
                                this.match(")"))
                                    break;
                                if (this.expectCommaSeparator(),
                                this.match(")"))
                                    break
                            }
                        return this.expect(")"),
                        e
                    }
                    ,
                    e.prototype.parseLeftHandSideExpressionAllowCall = function() {
                        var e, t = this.lookahead, i = this.matchContextualKeyword("async"), r = this.context.allowIn;
                        for (this.context.allowIn = !0,
                        this.matchKeyword("super") && this.context.inFunctionBody ? (e = this.createNode(),
                        this.nextToken(),
                        e = this.finalize(e, new s.Super),
                        this.match("(") || this.match(".") || this.match("[") || this.throwUnexpectedToken(this.lookahead)) : e = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; )
                            if (this.match(".")) {
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect(".");
                                var n = this.parseIdentifierName();
                                e = this.finalize(this.startNode(t), new s.StaticMemberExpression(e,n))
                            } else if (this.match("(")) {
                                var o = i && t.lineNumber === this.lookahead.lineNumber;
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !1;
                                var a = o ? this.parseAsyncArguments() : this.parseArguments();
                                if (e = this.finalize(this.startNode(t), new s.CallExpression(e,a)),
                                o && this.match("=>")) {
                                    for (var l = 0; l < a.length; ++l)
                                        this.reinterpretExpressionAsPattern(a[l]);
                                    e = {
                                        type: "ArrowParameterPlaceHolder",
                                        params: a,
                                        async: !0
                                    }
                                }
                            } else if (this.match("["))
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect("["),
                                n = this.isolateCoverGrammar(this.parseExpression),
                                this.expect("]"),
                                e = this.finalize(this.startNode(t), new s.ComputedMemberExpression(e,n));
                            else {
                                if (10 !== this.lookahead.type || !this.lookahead.head)
                                    break;
                                var u = this.parseTemplateLiteral();
                                e = this.finalize(this.startNode(t), new s.TaggedTemplateExpression(e,u))
                            }
                        return this.context.allowIn = r,
                        e
                    }
                    ,
                    e.prototype.parseSuper = function() {
                        var e = this.createNode();
                        return this.expectKeyword("super"),
                        this.match("[") || this.match(".") || this.throwUnexpectedToken(this.lookahead),
                        this.finalize(e, new s.Super)
                    }
                    ,
                    e.prototype.parseLeftHandSideExpression = function() {
                        r.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
                        for (var e = this.startNode(this.lookahead), t = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; )
                            if (this.match("[")) {
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect("[");
                                var i = this.isolateCoverGrammar(this.parseExpression);
                                this.expect("]"),
                                t = this.finalize(e, new s.ComputedMemberExpression(t,i))
                            } else if (this.match("."))
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect("."),
                                i = this.parseIdentifierName(),
                                t = this.finalize(e, new s.StaticMemberExpression(t,i));
                            else {
                                if (10 !== this.lookahead.type || !this.lookahead.head)
                                    break;
                                var n = this.parseTemplateLiteral();
                                t = this.finalize(e, new s.TaggedTemplateExpression(t,n))
                            }
                        return t
                    }
                    ,
                    e.prototype.parseUpdateExpression = function() {
                        var e, t = this.lookahead;
                        if (this.match("++") || this.match("--")) {
                            var i = this.startNode(t)
                              , r = this.nextToken();
                            e = this.inheritCoverGrammar(this.parseUnaryExpression),
                            this.context.strict && e.type === l.Syntax.Identifier && this.scanner.isRestrictedWord(e.name) && this.tolerateError(o.Messages.StrictLHSPrefix),
                            this.context.isAssignmentTarget || this.tolerateError(o.Messages.InvalidLHSInAssignment);
                            var n = !0;
                            e = this.finalize(i, new s.UpdateExpression(r.value,e,n)),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        } else if (e = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall),
                        !this.hasLineTerminator && 7 === this.lookahead.type && (this.match("++") || this.match("--"))) {
                            this.context.strict && e.type === l.Syntax.Identifier && this.scanner.isRestrictedWord(e.name) && this.tolerateError(o.Messages.StrictLHSPostfix),
                            this.context.isAssignmentTarget || this.tolerateError(o.Messages.InvalidLHSInAssignment),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1;
                            var a = this.nextToken().value;
                            n = !1,
                            e = this.finalize(this.startNode(t), new s.UpdateExpression(a,e,n))
                        }
                        return e
                    }
                    ,
                    e.prototype.parseAwaitExpression = function() {
                        var e = this.createNode();
                        this.nextToken();
                        var t = this.parseUnaryExpression();
                        return this.finalize(e, new s.AwaitExpression(t))
                    }
                    ,
                    e.prototype.parseUnaryExpression = function() {
                        var e;
                        if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
                            var t = this.startNode(this.lookahead)
                              , i = this.nextToken();
                            e = this.inheritCoverGrammar(this.parseUnaryExpression),
                            e = this.finalize(t, new s.UnaryExpression(i.value,e)),
                            this.context.strict && "delete" === e.operator && e.argument.type === l.Syntax.Identifier && this.tolerateError(o.Messages.StrictDelete),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        } else
                            e = this.context.await && this.matchContextualKeyword("await") ? this.parseAwaitExpression() : this.parseUpdateExpression();
                        return e
                    }
                    ,
                    e.prototype.parseExponentiationExpression = function() {
                        var e = this.lookahead
                          , t = this.inheritCoverGrammar(this.parseUnaryExpression);
                        if (t.type !== l.Syntax.UnaryExpression && this.match("**")) {
                            this.nextToken(),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1;
                            var i = t
                              , r = this.isolateCoverGrammar(this.parseExponentiationExpression);
                            t = this.finalize(this.startNode(e), new s.BinaryExpression("**",i,r))
                        }
                        return t
                    }
                    ,
                    e.prototype.binaryPrecedence = function(e) {
                        var t = e.value;
                        return 7 === e.type ? this.operatorPrecedence[t] || 0 : 4 === e.type && ("instanceof" === t || this.context.allowIn && "in" === t) ? 7 : 0
                    }
                    ,
                    e.prototype.parseBinaryExpression = function() {
                        var e = this.lookahead
                          , t = this.inheritCoverGrammar(this.parseExponentiationExpression)
                          , i = this.lookahead
                          , r = this.binaryPrecedence(i);
                        if (r > 0) {
                            this.nextToken(),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1;
                            for (var n = [e, this.lookahead], o = t, a = this.isolateCoverGrammar(this.parseExponentiationExpression), l = [o, i.value, a], u = [r]; !((r = this.binaryPrecedence(this.lookahead)) <= 0); ) {
                                for (; l.length > 2 && r <= u[u.length - 1]; ) {
                                    a = l.pop();
                                    var c = l.pop();
                                    u.pop(),
                                    o = l.pop(),
                                    n.pop();
                                    var h = this.startNode(n[n.length - 1]);
                                    l.push(this.finalize(h, new s.BinaryExpression(c,o,a)))
                                }
                                l.push(this.nextToken().value),
                                u.push(r),
                                n.push(this.lookahead),
                                l.push(this.isolateCoverGrammar(this.parseExponentiationExpression))
                            }
                            var p = l.length - 1;
                            t = l[p];
                            for (var d = n.pop(); p > 1; ) {
                                var f = n.pop()
                                  , m = d && d.lineStart;
                                h = this.startNode(f, m),
                                c = l[p - 1],
                                t = this.finalize(h, new s.BinaryExpression(c,l[p - 2],t)),
                                p -= 2,
                                d = f
                            }
                        }
                        return t
                    }
                    ,
                    e.prototype.parseConditionalExpression = function() {
                        var e = this.lookahead
                          , t = this.inheritCoverGrammar(this.parseBinaryExpression);
                        if (this.match("?")) {
                            this.nextToken();
                            var i = this.context.allowIn;
                            this.context.allowIn = !0;
                            var r = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            this.context.allowIn = i,
                            this.expect(":");
                            var n = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            t = this.finalize(this.startNode(e), new s.ConditionalExpression(t,r,n)),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        }
                        return t
                    }
                    ,
                    e.prototype.checkPatternParam = function(e, t) {
                        switch (t.type) {
                        case l.Syntax.Identifier:
                            this.validateParam(e, t, t.name);
                            break;
                        case l.Syntax.RestElement:
                            this.checkPatternParam(e, t.argument);
                            break;
                        case l.Syntax.AssignmentPattern:
                            this.checkPatternParam(e, t.left);
                            break;
                        case l.Syntax.ArrayPattern:
                            for (var i = 0; i < t.elements.length; i++)
                                null !== t.elements[i] && this.checkPatternParam(e, t.elements[i]);
                            break;
                        case l.Syntax.ObjectPattern:
                            for (i = 0; i < t.properties.length; i++)
                                this.checkPatternParam(e, t.properties[i].value)
                        }
                        e.simple = e.simple && t instanceof s.Identifier
                    }
                    ,
                    e.prototype.reinterpretAsCoverFormalsList = function(e) {
                        var t, i = [e], r = !1;
                        switch (e.type) {
                        case l.Syntax.Identifier:
                            break;
                        case "ArrowParameterPlaceHolder":
                            i = e.params,
                            r = e.async;
                            break;
                        default:
                            return null
                        }
                        t = {
                            simple: !0,
                            paramSet: {}
                        };
                        for (var n = 0; n < i.length; ++n)
                            (s = i[n]).type === l.Syntax.AssignmentPattern ? s.right.type === l.Syntax.YieldExpression && (s.right.argument && this.throwUnexpectedToken(this.lookahead),
                            s.right.type = l.Syntax.Identifier,
                            s.right.name = "yield",
                            delete s.right.argument,
                            delete s.right.delegate) : r && s.type === l.Syntax.Identifier && "await" === s.name && this.throwUnexpectedToken(this.lookahead),
                            this.checkPatternParam(t, s),
                            i[n] = s;
                        if (this.context.strict || !this.context.allowYield)
                            for (n = 0; n < i.length; ++n) {
                                var s;
                                (s = i[n]).type === l.Syntax.YieldExpression && this.throwUnexpectedToken(this.lookahead)
                            }
                        if (t.message === o.Messages.StrictParamDupe) {
                            var a = this.context.strict ? t.stricted : t.firstRestricted;
                            this.throwUnexpectedToken(a, t.message)
                        }
                        return {
                            simple: t.simple,
                            params: i,
                            stricted: t.stricted,
                            firstRestricted: t.firstRestricted,
                            message: t.message
                        }
                    }
                    ,
                    e.prototype.parseAssignmentExpression = function() {
                        var e;
                        if (!this.context.allowYield && this.matchKeyword("yield"))
                            e = this.parseYieldExpression();
                        else {
                            var t = this.lookahead
                              , i = t;
                            if (e = this.parseConditionalExpression(),
                            3 === i.type && i.lineNumber === this.lookahead.lineNumber && "async" === i.value && (3 === this.lookahead.type || this.matchKeyword("yield"))) {
                                var r = this.parsePrimaryExpression();
                                this.reinterpretExpressionAsPattern(r),
                                e = {
                                    type: "ArrowParameterPlaceHolder",
                                    params: [r],
                                    async: !0
                                }
                            }
                            if ("ArrowParameterPlaceHolder" === e.type || this.match("=>")) {
                                this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1;
                                var n = e.async
                                  , a = this.reinterpretAsCoverFormalsList(e);
                                if (a) {
                                    this.hasLineTerminator && this.tolerateUnexpectedToken(this.lookahead),
                                    this.context.firstCoverInitializedNameError = null;
                                    var u = this.context.strict
                                      , c = this.context.allowStrictDirective;
                                    this.context.allowStrictDirective = a.simple;
                                    var h = this.context.allowYield
                                      , p = this.context.await;
                                    this.context.allowYield = !0,
                                    this.context.await = n;
                                    var d = this.startNode(t);
                                    this.expect("=>");
                                    var f = void 0;
                                    if (this.match("{")) {
                                        var m = this.context.allowIn;
                                        this.context.allowIn = !0,
                                        f = this.parseFunctionSourceElements(),
                                        this.context.allowIn = m
                                    } else
                                        f = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                    var g = f.type !== l.Syntax.BlockStatement;
                                    this.context.strict && a.firstRestricted && this.throwUnexpectedToken(a.firstRestricted, a.message),
                                    this.context.strict && a.stricted && this.tolerateUnexpectedToken(a.stricted, a.message),
                                    e = n ? this.finalize(d, new s.AsyncArrowFunctionExpression(a.params,f,g)) : this.finalize(d, new s.ArrowFunctionExpression(a.params,f,g)),
                                    this.context.strict = u,
                                    this.context.allowStrictDirective = c,
                                    this.context.allowYield = h,
                                    this.context.await = p
                                }
                            } else if (this.matchAssign()) {
                                if (this.context.isAssignmentTarget || this.tolerateError(o.Messages.InvalidLHSInAssignment),
                                this.context.strict && e.type === l.Syntax.Identifier) {
                                    var v = e;
                                    this.scanner.isRestrictedWord(v.name) && this.tolerateUnexpectedToken(i, o.Messages.StrictLHSAssignment),
                                    this.scanner.isStrictModeReservedWord(v.name) && this.tolerateUnexpectedToken(i, o.Messages.StrictReservedWord)
                                }
                                this.match("=") ? this.reinterpretExpressionAsPattern(e) : (this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1);
                                var y = (i = this.nextToken()).value
                                  , b = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                e = this.finalize(this.startNode(t), new s.AssignmentExpression(y,e,b)),
                                this.context.firstCoverInitializedNameError = null
                            }
                        }
                        return e
                    }
                    ,
                    e.prototype.parseExpression = function() {
                        var e = this.lookahead
                          , t = this.isolateCoverGrammar(this.parseAssignmentExpression);
                        if (this.match(",")) {
                            var i = [];
                            for (i.push(t); 2 !== this.lookahead.type && this.match(","); )
                                this.nextToken(),
                                i.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                            t = this.finalize(this.startNode(e), new s.SequenceExpression(i))
                        }
                        return t
                    }
                    ,
                    e.prototype.parseStatementListItem = function() {
                        var e;
                        if (this.context.isAssignmentTarget = !0,
                        this.context.isBindingElement = !0,
                        4 === this.lookahead.type)
                            switch (this.lookahead.value) {
                            case "export":
                                this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, o.Messages.IllegalExportDeclaration),
                                e = this.parseExportDeclaration();
                                break;
                            case "import":
                                this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, o.Messages.IllegalImportDeclaration),
                                e = this.parseImportDeclaration();
                                break;
                            case "const":
                                e = this.parseLexicalDeclaration({
                                    inFor: !1
                                });
                                break;
                            case "function":
                                e = this.parseFunctionDeclaration();
                                break;
                            case "class":
                                e = this.parseClassDeclaration();
                                break;
                            case "let":
                                e = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({
                                    inFor: !1
                                }) : this.parseStatement();
                                break;
                            default:
                                e = this.parseStatement()
                            }
                        else
                            e = this.parseStatement();
                        return e
                    }
                    ,
                    e.prototype.parseBlock = function() {
                        var e = this.createNode();
                        this.expect("{");
                        for (var t = []; !this.match("}"); )
                            t.push(this.parseStatementListItem());
                        return this.expect("}"),
                        this.finalize(e, new s.BlockStatement(t))
                    }
                    ,
                    e.prototype.parseLexicalBinding = function(e, t) {
                        var i = this.createNode()
                          , r = this.parsePattern([], e);
                        this.context.strict && r.type === l.Syntax.Identifier && this.scanner.isRestrictedWord(r.name) && this.tolerateError(o.Messages.StrictVarName);
                        var n = null;
                        return "const" === e ? this.matchKeyword("in") || this.matchContextualKeyword("of") || (this.match("=") ? (this.nextToken(),
                        n = this.isolateCoverGrammar(this.parseAssignmentExpression)) : this.throwError(o.Messages.DeclarationMissingInitializer, "const")) : (!t.inFor && r.type !== l.Syntax.Identifier || this.match("=")) && (this.expect("="),
                        n = this.isolateCoverGrammar(this.parseAssignmentExpression)),
                        this.finalize(i, new s.VariableDeclarator(r,n))
                    }
                    ,
                    e.prototype.parseBindingList = function(e, t) {
                        for (var i = [this.parseLexicalBinding(e, t)]; this.match(","); )
                            this.nextToken(),
                            i.push(this.parseLexicalBinding(e, t));
                        return i
                    }
                    ,
                    e.prototype.isLexicalDeclaration = function() {
                        var e = this.scanner.saveState();
                        this.scanner.scanComments();
                        var t = this.scanner.lex();
                        return this.scanner.restoreState(e),
                        3 === t.type || 7 === t.type && "[" === t.value || 7 === t.type && "{" === t.value || 4 === t.type && "let" === t.value || 4 === t.type && "yield" === t.value
                    }
                    ,
                    e.prototype.parseLexicalDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.nextToken().value;
                        r.assert("let" === i || "const" === i, "Lexical declaration must be either let or const");
                        var n = this.parseBindingList(i, e);
                        return this.consumeSemicolon(),
                        this.finalize(t, new s.VariableDeclaration(n,i))
                    }
                    ,
                    e.prototype.parseBindingRestElement = function(e, t) {
                        var i = this.createNode();
                        this.expect("...");
                        var r = this.parsePattern(e, t);
                        return this.finalize(i, new s.RestElement(r))
                    }
                    ,
                    e.prototype.parseArrayPattern = function(e, t) {
                        var i = this.createNode();
                        this.expect("[");
                        for (var r = []; !this.match("]"); )
                            if (this.match(","))
                                this.nextToken(),
                                r.push(null);
                            else {
                                if (this.match("...")) {
                                    r.push(this.parseBindingRestElement(e, t));
                                    break
                                }
                                r.push(this.parsePatternWithDefault(e, t)),
                                this.match("]") || this.expect(",")
                            }
                        return this.expect("]"),
                        this.finalize(i, new s.ArrayPattern(r))
                    }
                    ,
                    e.prototype.parsePropertyPattern = function(e, t) {
                        var i, r, n = this.createNode(), o = !1, a = !1;
                        if (3 === this.lookahead.type) {
                            var l = this.lookahead;
                            i = this.parseVariableIdentifier();
                            var u = this.finalize(n, new s.Identifier(l.value));
                            if (this.match("=")) {
                                e.push(l),
                                a = !0,
                                this.nextToken();
                                var c = this.parseAssignmentExpression();
                                r = this.finalize(this.startNode(l), new s.AssignmentPattern(u,c))
                            } else
                                this.match(":") ? (this.expect(":"),
                                r = this.parsePatternWithDefault(e, t)) : (e.push(l),
                                a = !0,
                                r = u)
                        } else
                            o = this.match("["),
                            i = this.parseObjectPropertyKey(),
                            this.expect(":"),
                            r = this.parsePatternWithDefault(e, t);
                        return this.finalize(n, new s.Property("init",i,o,r,!1,a))
                    }
                    ,
                    e.prototype.parseObjectPattern = function(e, t) {
                        var i = this.createNode()
                          , r = [];
                        for (this.expect("{"); !this.match("}"); )
                            r.push(this.parsePropertyPattern(e, t)),
                            this.match("}") || this.expect(",");
                        return this.expect("}"),
                        this.finalize(i, new s.ObjectPattern(r))
                    }
                    ,
                    e.prototype.parsePattern = function(e, t) {
                        var i;
                        return this.match("[") ? i = this.parseArrayPattern(e, t) : this.match("{") ? i = this.parseObjectPattern(e, t) : (!this.matchKeyword("let") || "const" !== t && "let" !== t || this.tolerateUnexpectedToken(this.lookahead, o.Messages.LetInLexicalBinding),
                        e.push(this.lookahead),
                        i = this.parseVariableIdentifier(t)),
                        i
                    }
                    ,
                    e.prototype.parsePatternWithDefault = function(e, t) {
                        var i = this.lookahead
                          , r = this.parsePattern(e, t);
                        if (this.match("=")) {
                            this.nextToken();
                            var n = this.context.allowYield;
                            this.context.allowYield = !0;
                            var o = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            this.context.allowYield = n,
                            r = this.finalize(this.startNode(i), new s.AssignmentPattern(r,o))
                        }
                        return r
                    }
                    ,
                    e.prototype.parseVariableIdentifier = function(e) {
                        var t = this.createNode()
                          , i = this.nextToken();
                        return 4 === i.type && "yield" === i.value ? this.context.strict ? this.tolerateUnexpectedToken(i, o.Messages.StrictReservedWord) : this.context.allowYield || this.throwUnexpectedToken(i) : 3 !== i.type ? this.context.strict && 4 === i.type && this.scanner.isStrictModeReservedWord(i.value) ? this.tolerateUnexpectedToken(i, o.Messages.StrictReservedWord) : (this.context.strict || "let" !== i.value || "var" !== e) && this.throwUnexpectedToken(i) : (this.context.isModule || this.context.await) && 3 === i.type && "await" === i.value && this.tolerateUnexpectedToken(i),
                        this.finalize(t, new s.Identifier(i.value))
                    }
                    ,
                    e.prototype.parseVariableDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.parsePattern([], "var");
                        this.context.strict && i.type === l.Syntax.Identifier && this.scanner.isRestrictedWord(i.name) && this.tolerateError(o.Messages.StrictVarName);
                        var r = null;
                        return this.match("=") ? (this.nextToken(),
                        r = this.isolateCoverGrammar(this.parseAssignmentExpression)) : i.type === l.Syntax.Identifier || e.inFor || this.expect("="),
                        this.finalize(t, new s.VariableDeclarator(i,r))
                    }
                    ,
                    e.prototype.parseVariableDeclarationList = function(e) {
                        var t = {
                            inFor: e.inFor
                        }
                          , i = [];
                        for (i.push(this.parseVariableDeclaration(t)); this.match(","); )
                            this.nextToken(),
                            i.push(this.parseVariableDeclaration(t));
                        return i
                    }
                    ,
                    e.prototype.parseVariableStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("var");
                        var t = this.parseVariableDeclarationList({
                            inFor: !1
                        });
                        return this.consumeSemicolon(),
                        this.finalize(e, new s.VariableDeclaration(t,"var"))
                    }
                    ,
                    e.prototype.parseEmptyStatement = function() {
                        var e = this.createNode();
                        return this.expect(";"),
                        this.finalize(e, new s.EmptyStatement)
                    }
                    ,
                    e.prototype.parseExpressionStatement = function() {
                        var e = this.createNode()
                          , t = this.parseExpression();
                        return this.consumeSemicolon(),
                        this.finalize(e, new s.ExpressionStatement(t))
                    }
                    ,
                    e.prototype.parseIfClause = function() {
                        return this.context.strict && this.matchKeyword("function") && this.tolerateError(o.Messages.StrictFunction),
                        this.parseStatement()
                    }
                    ,
                    e.prototype.parseIfStatement = function() {
                        var e, t = this.createNode(), i = null;
                        this.expectKeyword("if"),
                        this.expect("(");
                        var r = this.parseExpression();
                        return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()),
                        e = this.finalize(this.createNode(), new s.EmptyStatement)) : (this.expect(")"),
                        e = this.parseIfClause(),
                        this.matchKeyword("else") && (this.nextToken(),
                        i = this.parseIfClause())),
                        this.finalize(t, new s.IfStatement(r,e,i))
                    }
                    ,
                    e.prototype.parseDoWhileStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("do");
                        var t = this.context.inIteration;
                        this.context.inIteration = !0;
                        var i = this.parseStatement();
                        this.context.inIteration = t,
                        this.expectKeyword("while"),
                        this.expect("(");
                        var r = this.parseExpression();
                        return !this.match(")") && this.config.tolerant ? this.tolerateUnexpectedToken(this.nextToken()) : (this.expect(")"),
                        this.match(";") && this.nextToken()),
                        this.finalize(e, new s.DoWhileStatement(i,r))
                    }
                    ,
                    e.prototype.parseWhileStatement = function() {
                        var e, t = this.createNode();
                        this.expectKeyword("while"),
                        this.expect("(");
                        var i = this.parseExpression();
                        if (!this.match(")") && this.config.tolerant)
                            this.tolerateUnexpectedToken(this.nextToken()),
                            e = this.finalize(this.createNode(), new s.EmptyStatement);
                        else {
                            this.expect(")");
                            var r = this.context.inIteration;
                            this.context.inIteration = !0,
                            e = this.parseStatement(),
                            this.context.inIteration = r
                        }
                        return this.finalize(t, new s.WhileStatement(i,e))
                    }
                    ,
                    e.prototype.parseForStatement = function() {
                        var e, t, i, r = null, n = null, a = null, u = !0, c = this.createNode();
                        if (this.expectKeyword("for"),
                        this.expect("("),
                        this.match(";"))
                            this.nextToken();
                        else if (this.matchKeyword("var")) {
                            r = this.createNode(),
                            this.nextToken();
                            var h = this.context.allowIn;
                            this.context.allowIn = !1;
                            var p = this.parseVariableDeclarationList({
                                inFor: !0
                            });
                            if (this.context.allowIn = h,
                            1 === p.length && this.matchKeyword("in")) {
                                var d = p[0];
                                d.init && (d.id.type === l.Syntax.ArrayPattern || d.id.type === l.Syntax.ObjectPattern || this.context.strict) && this.tolerateError(o.Messages.ForInOfLoopInitializer, "for-in"),
                                r = this.finalize(r, new s.VariableDeclaration(p,"var")),
                                this.nextToken(),
                                e = r,
                                t = this.parseExpression(),
                                r = null
                            } else
                                1 === p.length && null === p[0].init && this.matchContextualKeyword("of") ? (r = this.finalize(r, new s.VariableDeclaration(p,"var")),
                                this.nextToken(),
                                e = r,
                                t = this.parseAssignmentExpression(),
                                r = null,
                                u = !1) : (r = this.finalize(r, new s.VariableDeclaration(p,"var")),
                                this.expect(";"))
                        } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                            r = this.createNode();
                            var f = this.nextToken().value;
                            this.context.strict || "in" !== this.lookahead.value ? (h = this.context.allowIn,
                            this.context.allowIn = !1,
                            p = this.parseBindingList(f, {
                                inFor: !0
                            }),
                            this.context.allowIn = h,
                            1 === p.length && null === p[0].init && this.matchKeyword("in") ? (r = this.finalize(r, new s.VariableDeclaration(p,f)),
                            this.nextToken(),
                            e = r,
                            t = this.parseExpression(),
                            r = null) : 1 === p.length && null === p[0].init && this.matchContextualKeyword("of") ? (r = this.finalize(r, new s.VariableDeclaration(p,f)),
                            this.nextToken(),
                            e = r,
                            t = this.parseAssignmentExpression(),
                            r = null,
                            u = !1) : (this.consumeSemicolon(),
                            r = this.finalize(r, new s.VariableDeclaration(p,f)))) : (r = this.finalize(r, new s.Identifier(f)),
                            this.nextToken(),
                            e = r,
                            t = this.parseExpression(),
                            r = null)
                        } else {
                            var m = this.lookahead;
                            if (h = this.context.allowIn,
                            this.context.allowIn = !1,
                            r = this.inheritCoverGrammar(this.parseAssignmentExpression),
                            this.context.allowIn = h,
                            this.matchKeyword("in"))
                                this.context.isAssignmentTarget && r.type !== l.Syntax.AssignmentExpression || this.tolerateError(o.Messages.InvalidLHSInForIn),
                                this.nextToken(),
                                this.reinterpretExpressionAsPattern(r),
                                e = r,
                                t = this.parseExpression(),
                                r = null;
                            else if (this.matchContextualKeyword("of"))
                                this.context.isAssignmentTarget && r.type !== l.Syntax.AssignmentExpression || this.tolerateError(o.Messages.InvalidLHSInForLoop),
                                this.nextToken(),
                                this.reinterpretExpressionAsPattern(r),
                                e = r,
                                t = this.parseAssignmentExpression(),
                                r = null,
                                u = !1;
                            else {
                                if (this.match(",")) {
                                    for (var g = [r]; this.match(","); )
                                        this.nextToken(),
                                        g.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                                    r = this.finalize(this.startNode(m), new s.SequenceExpression(g))
                                }
                                this.expect(";")
                            }
                        }
                        if (void 0 === e && (this.match(";") || (n = this.parseExpression()),
                        this.expect(";"),
                        this.match(")") || (a = this.parseExpression())),
                        !this.match(")") && this.config.tolerant)
                            this.tolerateUnexpectedToken(this.nextToken()),
                            i = this.finalize(this.createNode(), new s.EmptyStatement);
                        else {
                            this.expect(")");
                            var v = this.context.inIteration;
                            this.context.inIteration = !0,
                            i = this.isolateCoverGrammar(this.parseStatement),
                            this.context.inIteration = v
                        }
                        return void 0 === e ? this.finalize(c, new s.ForStatement(r,n,a,i)) : u ? this.finalize(c, new s.ForInStatement(e,t,i)) : this.finalize(c, new s.ForOfStatement(e,t,i))
                    }
                    ,
                    e.prototype.parseContinueStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("continue");
                        var t = null;
                        if (3 === this.lookahead.type && !this.hasLineTerminator) {
                            var i = this.parseVariableIdentifier();
                            t = i;
                            var r = "$" + i.name;
                            Object.prototype.hasOwnProperty.call(this.context.labelSet, r) || this.throwError(o.Messages.UnknownLabel, i.name)
                        }
                        return this.consumeSemicolon(),
                        null !== t || this.context.inIteration || this.throwError(o.Messages.IllegalContinue),
                        this.finalize(e, new s.ContinueStatement(t))
                    }
                    ,
                    e.prototype.parseBreakStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("break");
                        var t = null;
                        if (3 === this.lookahead.type && !this.hasLineTerminator) {
                            var i = this.parseVariableIdentifier()
                              , r = "$" + i.name;
                            Object.prototype.hasOwnProperty.call(this.context.labelSet, r) || this.throwError(o.Messages.UnknownLabel, i.name),
                            t = i
                        }
                        return this.consumeSemicolon(),
                        null !== t || this.context.inIteration || this.context.inSwitch || this.throwError(o.Messages.IllegalBreak),
                        this.finalize(e, new s.BreakStatement(t))
                    }
                    ,
                    e.prototype.parseReturnStatement = function() {
                        this.context.inFunctionBody || this.tolerateError(o.Messages.IllegalReturn);
                        var e = this.createNode();
                        this.expectKeyword("return");
                        var t = (this.match(";") || this.match("}") || this.hasLineTerminator || 2 === this.lookahead.type) && 8 !== this.lookahead.type && 10 !== this.lookahead.type ? null : this.parseExpression();
                        return this.consumeSemicolon(),
                        this.finalize(e, new s.ReturnStatement(t))
                    }
                    ,
                    e.prototype.parseWithStatement = function() {
                        this.context.strict && this.tolerateError(o.Messages.StrictModeWith);
                        var e, t = this.createNode();
                        this.expectKeyword("with"),
                        this.expect("(");
                        var i = this.parseExpression();
                        return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()),
                        e = this.finalize(this.createNode(), new s.EmptyStatement)) : (this.expect(")"),
                        e = this.parseStatement()),
                        this.finalize(t, new s.WithStatement(i,e))
                    }
                    ,
                    e.prototype.parseSwitchCase = function() {
                        var e, t = this.createNode();
                        this.matchKeyword("default") ? (this.nextToken(),
                        e = null) : (this.expectKeyword("case"),
                        e = this.parseExpression()),
                        this.expect(":");
                        for (var i = []; !(this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")); )
                            i.push(this.parseStatementListItem());
                        return this.finalize(t, new s.SwitchCase(e,i))
                    }
                    ,
                    e.prototype.parseSwitchStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("switch"),
                        this.expect("(");
                        var t = this.parseExpression();
                        this.expect(")");
                        var i = this.context.inSwitch;
                        this.context.inSwitch = !0;
                        var r = []
                          , n = !1;
                        for (this.expect("{"); !this.match("}"); ) {
                            var a = this.parseSwitchCase();
                            null === a.test && (n && this.throwError(o.Messages.MultipleDefaultsInSwitch),
                            n = !0),
                            r.push(a)
                        }
                        return this.expect("}"),
                        this.context.inSwitch = i,
                        this.finalize(e, new s.SwitchStatement(t,r))
                    }
                    ,
                    e.prototype.parseLabelledStatement = function() {
                        var e, t = this.createNode(), i = this.parseExpression();
                        if (i.type === l.Syntax.Identifier && this.match(":")) {
                            this.nextToken();
                            var r = i
                              , n = "$" + r.name;
                            Object.prototype.hasOwnProperty.call(this.context.labelSet, n) && this.throwError(o.Messages.Redeclaration, "Label", r.name),
                            this.context.labelSet[n] = !0;
                            var a = void 0;
                            if (this.matchKeyword("class"))
                                this.tolerateUnexpectedToken(this.lookahead),
                                a = this.parseClassDeclaration();
                            else if (this.matchKeyword("function")) {
                                var u = this.lookahead
                                  , c = this.parseFunctionDeclaration();
                                this.context.strict ? this.tolerateUnexpectedToken(u, o.Messages.StrictFunction) : c.generator && this.tolerateUnexpectedToken(u, o.Messages.GeneratorInLegacyContext),
                                a = c
                            } else
                                a = this.parseStatement();
                            delete this.context.labelSet[n],
                            e = new s.LabeledStatement(r,a)
                        } else
                            this.consumeSemicolon(),
                            e = new s.ExpressionStatement(i);
                        return this.finalize(t, e)
                    }
                    ,
                    e.prototype.parseThrowStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("throw"),
                        this.hasLineTerminator && this.throwError(o.Messages.NewlineAfterThrow);
                        var t = this.parseExpression();
                        return this.consumeSemicolon(),
                        this.finalize(e, new s.ThrowStatement(t))
                    }
                    ,
                    e.prototype.parseCatchClause = function() {
                        var e = this.createNode();
                        this.expectKeyword("catch"),
                        this.expect("("),
                        this.match(")") && this.throwUnexpectedToken(this.lookahead);
                        for (var t = [], i = this.parsePattern(t), r = {}, n = 0; n < t.length; n++) {
                            var a = "$" + t[n].value;
                            Object.prototype.hasOwnProperty.call(r, a) && this.tolerateError(o.Messages.DuplicateBinding, t[n].value),
                            r[a] = !0
                        }
                        this.context.strict && i.type === l.Syntax.Identifier && this.scanner.isRestrictedWord(i.name) && this.tolerateError(o.Messages.StrictCatchVariable),
                        this.expect(")");
                        var u = this.parseBlock();
                        return this.finalize(e, new s.CatchClause(i,u))
                    }
                    ,
                    e.prototype.parseFinallyClause = function() {
                        return this.expectKeyword("finally"),
                        this.parseBlock()
                    }
                    ,
                    e.prototype.parseTryStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("try");
                        var t = this.parseBlock()
                          , i = this.matchKeyword("catch") ? this.parseCatchClause() : null
                          , r = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
                        return i || r || this.throwError(o.Messages.NoCatchOrFinally),
                        this.finalize(e, new s.TryStatement(t,i,r))
                    }
                    ,
                    e.prototype.parseDebuggerStatement = function() {
                        var e = this.createNode();
                        return this.expectKeyword("debugger"),
                        this.consumeSemicolon(),
                        this.finalize(e, new s.DebuggerStatement)
                    }
                    ,
                    e.prototype.parseStatement = function() {
                        var e;
                        switch (this.lookahead.type) {
                        case 1:
                        case 5:
                        case 6:
                        case 8:
                        case 10:
                        case 9:
                            e = this.parseExpressionStatement();
                            break;
                        case 7:
                            var t = this.lookahead.value;
                            e = "{" === t ? this.parseBlock() : "(" === t ? this.parseExpressionStatement() : ";" === t ? this.parseEmptyStatement() : this.parseExpressionStatement();
                            break;
                        case 3:
                            e = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                            break;
                        case 4:
                            switch (this.lookahead.value) {
                            case "break":
                                e = this.parseBreakStatement();
                                break;
                            case "continue":
                                e = this.parseContinueStatement();
                                break;
                            case "debugger":
                                e = this.parseDebuggerStatement();
                                break;
                            case "do":
                                e = this.parseDoWhileStatement();
                                break;
                            case "for":
                                e = this.parseForStatement();
                                break;
                            case "function":
                                e = this.parseFunctionDeclaration();
                                break;
                            case "if":
                                e = this.parseIfStatement();
                                break;
                            case "return":
                                e = this.parseReturnStatement();
                                break;
                            case "switch":
                                e = this.parseSwitchStatement();
                                break;
                            case "throw":
                                e = this.parseThrowStatement();
                                break;
                            case "try":
                                e = this.parseTryStatement();
                                break;
                            case "var":
                                e = this.parseVariableStatement();
                                break;
                            case "while":
                                e = this.parseWhileStatement();
                                break;
                            case "with":
                                e = this.parseWithStatement();
                                break;
                            default:
                                e = this.parseExpressionStatement()
                            }
                            break;
                        default:
                            e = this.throwUnexpectedToken(this.lookahead)
                        }
                        return e
                    }
                    ,
                    e.prototype.parseFunctionSourceElements = function() {
                        var e = this.createNode();
                        this.expect("{");
                        var t = this.parseDirectivePrologues()
                          , i = this.context.labelSet
                          , r = this.context.inIteration
                          , n = this.context.inSwitch
                          , o = this.context.inFunctionBody;
                        for (this.context.labelSet = {},
                        this.context.inIteration = !1,
                        this.context.inSwitch = !1,
                        this.context.inFunctionBody = !0; 2 !== this.lookahead.type && !this.match("}"); )
                            t.push(this.parseStatementListItem());
                        return this.expect("}"),
                        this.context.labelSet = i,
                        this.context.inIteration = r,
                        this.context.inSwitch = n,
                        this.context.inFunctionBody = o,
                        this.finalize(e, new s.BlockStatement(t))
                    }
                    ,
                    e.prototype.validateParam = function(e, t, i) {
                        var r = "$" + i;
                        this.context.strict ? (this.scanner.isRestrictedWord(i) && (e.stricted = t,
                        e.message = o.Messages.StrictParamName),
                        Object.prototype.hasOwnProperty.call(e.paramSet, r) && (e.stricted = t,
                        e.message = o.Messages.StrictParamDupe)) : e.firstRestricted || (this.scanner.isRestrictedWord(i) ? (e.firstRestricted = t,
                        e.message = o.Messages.StrictParamName) : this.scanner.isStrictModeReservedWord(i) ? (e.firstRestricted = t,
                        e.message = o.Messages.StrictReservedWord) : Object.prototype.hasOwnProperty.call(e.paramSet, r) && (e.stricted = t,
                        e.message = o.Messages.StrictParamDupe)),
                        "function" == typeof Object.defineProperty ? Object.defineProperty(e.paramSet, r, {
                            value: !0,
                            enumerable: !0,
                            writable: !0,
                            configurable: !0
                        }) : e.paramSet[r] = !0
                    }
                    ,
                    e.prototype.parseRestElement = function(e) {
                        var t = this.createNode();
                        this.expect("...");
                        var i = this.parsePattern(e);
                        return this.match("=") && this.throwError(o.Messages.DefaultRestParameter),
                        this.match(")") || this.throwError(o.Messages.ParameterAfterRestParameter),
                        this.finalize(t, new s.RestElement(i))
                    }
                    ,
                    e.prototype.parseFormalParameter = function(e) {
                        for (var t = [], i = this.match("...") ? this.parseRestElement(t) : this.parsePatternWithDefault(t), r = 0; r < t.length; r++)
                            this.validateParam(e, t[r], t[r].value);
                        e.simple = e.simple && i instanceof s.Identifier,
                        e.params.push(i)
                    }
                    ,
                    e.prototype.parseFormalParameters = function(e) {
                        var t;
                        if (t = {
                            simple: !0,
                            params: [],
                            firstRestricted: e
                        },
                        this.expect("("),
                        !this.match(")"))
                            for (t.paramSet = {}; 2 !== this.lookahead.type && (this.parseFormalParameter(t),
                            !this.match(")")) && (this.expect(","),
                            !this.match(")")); )
                                ;
                        return this.expect(")"),
                        {
                            simple: t.simple,
                            params: t.params,
                            stricted: t.stricted,
                            firstRestricted: t.firstRestricted,
                            message: t.message
                        }
                    }
                    ,
                    e.prototype.matchAsyncFunction = function() {
                        var e = this.matchContextualKeyword("async");
                        if (e) {
                            var t = this.scanner.saveState();
                            this.scanner.scanComments();
                            var i = this.scanner.lex();
                            this.scanner.restoreState(t),
                            e = t.lineNumber === i.lineNumber && 4 === i.type && "function" === i.value
                        }
                        return e
                    }
                    ,
                    e.prototype.parseFunctionDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.matchContextualKeyword("async");
                        i && this.nextToken(),
                        this.expectKeyword("function");
                        var r, n = !i && this.match("*");
                        n && this.nextToken();
                        var a = null
                          , l = null;
                        if (!e || !this.match("(")) {
                            var u = this.lookahead;
                            a = this.parseVariableIdentifier(),
                            this.context.strict ? this.scanner.isRestrictedWord(u.value) && this.tolerateUnexpectedToken(u, o.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(u.value) ? (l = u,
                            r = o.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(u.value) && (l = u,
                            r = o.Messages.StrictReservedWord)
                        }
                        var c = this.context.await
                          , h = this.context.allowYield;
                        this.context.await = i,
                        this.context.allowYield = !n;
                        var p = this.parseFormalParameters(l)
                          , d = p.params
                          , f = p.stricted;
                        l = p.firstRestricted,
                        p.message && (r = p.message);
                        var m = this.context.strict
                          , g = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = p.simple;
                        var v = this.parseFunctionSourceElements();
                        return this.context.strict && l && this.throwUnexpectedToken(l, r),
                        this.context.strict && f && this.tolerateUnexpectedToken(f, r),
                        this.context.strict = m,
                        this.context.allowStrictDirective = g,
                        this.context.await = c,
                        this.context.allowYield = h,
                        i ? this.finalize(t, new s.AsyncFunctionDeclaration(a,d,v)) : this.finalize(t, new s.FunctionDeclaration(a,d,v,n))
                    }
                    ,
                    e.prototype.parseFunctionExpression = function() {
                        var e = this.createNode()
                          , t = this.matchContextualKeyword("async");
                        t && this.nextToken(),
                        this.expectKeyword("function");
                        var i, r = !t && this.match("*");
                        r && this.nextToken();
                        var n, a = null, l = this.context.await, u = this.context.allowYield;
                        if (this.context.await = t,
                        this.context.allowYield = !r,
                        !this.match("(")) {
                            var c = this.lookahead;
                            a = this.context.strict || r || !this.matchKeyword("yield") ? this.parseVariableIdentifier() : this.parseIdentifierName(),
                            this.context.strict ? this.scanner.isRestrictedWord(c.value) && this.tolerateUnexpectedToken(c, o.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(c.value) ? (n = c,
                            i = o.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(c.value) && (n = c,
                            i = o.Messages.StrictReservedWord)
                        }
                        var h = this.parseFormalParameters(n)
                          , p = h.params
                          , d = h.stricted;
                        n = h.firstRestricted,
                        h.message && (i = h.message);
                        var f = this.context.strict
                          , m = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = h.simple;
                        var g = this.parseFunctionSourceElements();
                        return this.context.strict && n && this.throwUnexpectedToken(n, i),
                        this.context.strict && d && this.tolerateUnexpectedToken(d, i),
                        this.context.strict = f,
                        this.context.allowStrictDirective = m,
                        this.context.await = l,
                        this.context.allowYield = u,
                        t ? this.finalize(e, new s.AsyncFunctionExpression(a,p,g)) : this.finalize(e, new s.FunctionExpression(a,p,g,r))
                    }
                    ,
                    e.prototype.parseDirective = function() {
                        var e = this.lookahead
                          , t = this.createNode()
                          , i = this.parseExpression()
                          , r = i.type === l.Syntax.Literal ? this.getTokenRaw(e).slice(1, -1) : null;
                        return this.consumeSemicolon(),
                        this.finalize(t, r ? new s.Directive(i,r) : new s.ExpressionStatement(i))
                    }
                    ,
                    e.prototype.parseDirectivePrologues = function() {
                        for (var e = null, t = []; ; ) {
                            var i = this.lookahead;
                            if (8 !== i.type)
                                break;
                            var r = this.parseDirective();
                            t.push(r);
                            var n = r.directive;
                            if ("string" != typeof n)
                                break;
                            "use strict" === n ? (this.context.strict = !0,
                            e && this.tolerateUnexpectedToken(e, o.Messages.StrictOctalLiteral),
                            this.context.allowStrictDirective || this.tolerateUnexpectedToken(i, o.Messages.IllegalLanguageModeDirective)) : !e && i.octal && (e = i)
                        }
                        return t
                    }
                    ,
                    e.prototype.qualifiedPropertyName = function(e) {
                        switch (e.type) {
                        case 3:
                        case 8:
                        case 1:
                        case 5:
                        case 6:
                        case 4:
                            return !0;
                        case 7:
                            return "[" === e.value
                        }
                        return !1
                    }
                    ,
                    e.prototype.parseGetterMethod = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters();
                        i.params.length > 0 && this.tolerateError(o.Messages.BadGetterArity);
                        var r = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new s.FunctionExpression(null,i.params,r,!1))
                    }
                    ,
                    e.prototype.parseSetterMethod = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters();
                        1 !== i.params.length ? this.tolerateError(o.Messages.BadSetterArity) : i.params[0]instanceof s.RestElement && this.tolerateError(o.Messages.BadSetterRestParameter);
                        var r = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new s.FunctionExpression(null,i.params,r,!1))
                    }
                    ,
                    e.prototype.parseGeneratorMethod = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters();
                        this.context.allowYield = !1;
                        var r = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new s.FunctionExpression(null,i.params,r,!0))
                    }
                    ,
                    e.prototype.isStartOfExpression = function() {
                        var e = !0
                          , t = this.lookahead.value;
                        switch (this.lookahead.type) {
                        case 7:
                            e = "[" === t || "(" === t || "{" === t || "+" === t || "-" === t || "!" === t || "~" === t || "++" === t || "--" === t || "/" === t || "/=" === t;
                            break;
                        case 4:
                            e = "class" === t || "delete" === t || "function" === t || "let" === t || "new" === t || "super" === t || "this" === t || "typeof" === t || "void" === t || "yield" === t
                        }
                        return e
                    }
                    ,
                    e.prototype.parseYieldExpression = function() {
                        var e = this.createNode();
                        this.expectKeyword("yield");
                        var t = null
                          , i = !1;
                        if (!this.hasLineTerminator) {
                            var r = this.context.allowYield;
                            this.context.allowYield = !1,
                            (i = this.match("*")) ? (this.nextToken(),
                            t = this.parseAssignmentExpression()) : this.isStartOfExpression() && (t = this.parseAssignmentExpression()),
                            this.context.allowYield = r
                        }
                        return this.finalize(e, new s.YieldExpression(t,i))
                    }
                    ,
                    e.prototype.parseClassElement = function(e) {
                        var t = this.lookahead
                          , i = this.createNode()
                          , r = ""
                          , n = null
                          , a = null
                          , l = !1
                          , u = !1
                          , c = !1
                          , h = !1;
                        if (this.match("*"))
                            this.nextToken();
                        else if (l = this.match("["),
                        "static" === (n = this.parseObjectPropertyKey()).name && (this.qualifiedPropertyName(this.lookahead) || this.match("*")) && (t = this.lookahead,
                        c = !0,
                        l = this.match("["),
                        this.match("*") ? this.nextToken() : n = this.parseObjectPropertyKey()),
                        3 === t.type && !this.hasLineTerminator && "async" === t.value) {
                            var p = this.lookahead.value;
                            ":" !== p && "(" !== p && "*" !== p && (h = !0,
                            t = this.lookahead,
                            n = this.parseObjectPropertyKey(),
                            3 === t.type && "constructor" === t.value && this.tolerateUnexpectedToken(t, o.Messages.ConstructorIsAsync))
                        }
                        var d = this.qualifiedPropertyName(this.lookahead);
                        return 3 === t.type ? "get" === t.value && d ? (r = "get",
                        l = this.match("["),
                        n = this.parseObjectPropertyKey(),
                        this.context.allowYield = !1,
                        a = this.parseGetterMethod()) : "set" === t.value && d && (r = "set",
                        l = this.match("["),
                        n = this.parseObjectPropertyKey(),
                        a = this.parseSetterMethod()) : 7 === t.type && "*" === t.value && d && (r = "init",
                        l = this.match("["),
                        n = this.parseObjectPropertyKey(),
                        a = this.parseGeneratorMethod(),
                        u = !0),
                        !r && n && this.match("(") && (r = "init",
                        a = h ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(),
                        u = !0),
                        r || this.throwUnexpectedToken(this.lookahead),
                        "init" === r && (r = "method"),
                        l || (c && this.isPropertyKey(n, "prototype") && this.throwUnexpectedToken(t, o.Messages.StaticPrototype),
                        !c && this.isPropertyKey(n, "constructor") && (("method" !== r || !u || a && a.generator) && this.throwUnexpectedToken(t, o.Messages.ConstructorSpecialMethod),
                        e.value ? this.throwUnexpectedToken(t, o.Messages.DuplicateConstructor) : e.value = !0,
                        r = "constructor")),
                        this.finalize(i, new s.MethodDefinition(n,l,a,r,c))
                    }
                    ,
                    e.prototype.parseClassElementList = function() {
                        var e = []
                          , t = {
                            value: !1
                        };
                        for (this.expect("{"); !this.match("}"); )
                            this.match(";") ? this.nextToken() : e.push(this.parseClassElement(t));
                        return this.expect("}"),
                        e
                    }
                    ,
                    e.prototype.parseClassBody = function() {
                        var e = this.createNode()
                          , t = this.parseClassElementList();
                        return this.finalize(e, new s.ClassBody(t))
                    }
                    ,
                    e.prototype.parseClassDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.context.strict;
                        this.context.strict = !0,
                        this.expectKeyword("class");
                        var r = e && 3 !== this.lookahead.type ? null : this.parseVariableIdentifier()
                          , n = null;
                        this.matchKeyword("extends") && (this.nextToken(),
                        n = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                        var o = this.parseClassBody();
                        return this.context.strict = i,
                        this.finalize(t, new s.ClassDeclaration(r,n,o))
                    }
                    ,
                    e.prototype.parseClassExpression = function() {
                        var e = this.createNode()
                          , t = this.context.strict;
                        this.context.strict = !0,
                        this.expectKeyword("class");
                        var i = 3 === this.lookahead.type ? this.parseVariableIdentifier() : null
                          , r = null;
                        this.matchKeyword("extends") && (this.nextToken(),
                        r = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                        var n = this.parseClassBody();
                        return this.context.strict = t,
                        this.finalize(e, new s.ClassExpression(i,r,n))
                    }
                    ,
                    e.prototype.parseModule = function() {
                        this.context.strict = !0,
                        this.context.isModule = !0,
                        this.scanner.isModule = !0;
                        for (var e = this.createNode(), t = this.parseDirectivePrologues(); 2 !== this.lookahead.type; )
                            t.push(this.parseStatementListItem());
                        return this.finalize(e, new s.Module(t))
                    }
                    ,
                    e.prototype.parseScript = function() {
                        for (var e = this.createNode(), t = this.parseDirectivePrologues(); 2 !== this.lookahead.type; )
                            t.push(this.parseStatementListItem());
                        return this.finalize(e, new s.Script(t))
                    }
                    ,
                    e.prototype.parseModuleSpecifier = function() {
                        var e = this.createNode();
                        8 !== this.lookahead.type && this.throwError(o.Messages.InvalidModuleSpecifier);
                        var t = this.nextToken()
                          , i = this.getTokenRaw(t);
                        return this.finalize(e, new s.Literal(t.value,i))
                    }
                    ,
                    e.prototype.parseImportSpecifier = function() {
                        var e, t, i = this.createNode();
                        return 3 === this.lookahead.type ? (t = e = this.parseVariableIdentifier(),
                        this.matchContextualKeyword("as") && (this.nextToken(),
                        t = this.parseVariableIdentifier())) : (t = e = this.parseIdentifierName(),
                        this.matchContextualKeyword("as") ? (this.nextToken(),
                        t = this.parseVariableIdentifier()) : this.throwUnexpectedToken(this.nextToken())),
                        this.finalize(i, new s.ImportSpecifier(t,e))
                    }
                    ,
                    e.prototype.parseNamedImports = function() {
                        this.expect("{");
                        for (var e = []; !this.match("}"); )
                            e.push(this.parseImportSpecifier()),
                            this.match("}") || this.expect(",");
                        return this.expect("}"),
                        e
                    }
                    ,
                    e.prototype.parseImportDefaultSpecifier = function() {
                        var e = this.createNode()
                          , t = this.parseIdentifierName();
                        return this.finalize(e, new s.ImportDefaultSpecifier(t))
                    }
                    ,
                    e.prototype.parseImportNamespaceSpecifier = function() {
                        var e = this.createNode();
                        this.expect("*"),
                        this.matchContextualKeyword("as") || this.throwError(o.Messages.NoAsAfterImportNamespace),
                        this.nextToken();
                        var t = this.parseIdentifierName();
                        return this.finalize(e, new s.ImportNamespaceSpecifier(t))
                    }
                    ,
                    e.prototype.parseImportDeclaration = function() {
                        this.context.inFunctionBody && this.throwError(o.Messages.IllegalImportDeclaration);
                        var e, t = this.createNode();
                        this.expectKeyword("import");
                        var i = [];
                        if (8 === this.lookahead.type)
                            e = this.parseModuleSpecifier();
                        else {
                            if (this.match("{") ? i = i.concat(this.parseNamedImports()) : this.match("*") ? i.push(this.parseImportNamespaceSpecifier()) : this.isIdentifierName(this.lookahead) && !this.matchKeyword("default") ? (i.push(this.parseImportDefaultSpecifier()),
                            this.match(",") && (this.nextToken(),
                            this.match("*") ? i.push(this.parseImportNamespaceSpecifier()) : this.match("{") ? i = i.concat(this.parseNamedImports()) : this.throwUnexpectedToken(this.lookahead))) : this.throwUnexpectedToken(this.nextToken()),
                            !this.matchContextualKeyword("from")) {
                                var r = this.lookahead.value ? o.Messages.UnexpectedToken : o.Messages.MissingFromClause;
                                this.throwError(r, this.lookahead.value)
                            }
                            this.nextToken(),
                            e = this.parseModuleSpecifier()
                        }
                        return this.consumeSemicolon(),
                        this.finalize(t, new s.ImportDeclaration(i,e))
                    }
                    ,
                    e.prototype.parseExportSpecifier = function() {
                        var e = this.createNode()
                          , t = this.parseIdentifierName()
                          , i = t;
                        return this.matchContextualKeyword("as") && (this.nextToken(),
                        i = this.parseIdentifierName()),
                        this.finalize(e, new s.ExportSpecifier(t,i))
                    }
                    ,
                    e.prototype.parseExportDeclaration = function() {
                        this.context.inFunctionBody && this.throwError(o.Messages.IllegalExportDeclaration);
                        var e, t = this.createNode();
                        if (this.expectKeyword("export"),
                        this.matchKeyword("default"))
                            if (this.nextToken(),
                            this.matchKeyword("function")) {
                                var i = this.parseFunctionDeclaration(!0);
                                e = this.finalize(t, new s.ExportDefaultDeclaration(i))
                            } else
                                this.matchKeyword("class") ? (i = this.parseClassDeclaration(!0),
                                e = this.finalize(t, new s.ExportDefaultDeclaration(i))) : this.matchContextualKeyword("async") ? (i = this.matchAsyncFunction() ? this.parseFunctionDeclaration(!0) : this.parseAssignmentExpression(),
                                e = this.finalize(t, new s.ExportDefaultDeclaration(i))) : (this.matchContextualKeyword("from") && this.throwError(o.Messages.UnexpectedToken, this.lookahead.value),
                                i = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression(),
                                this.consumeSemicolon(),
                                e = this.finalize(t, new s.ExportDefaultDeclaration(i)));
                        else if (this.match("*")) {
                            if (this.nextToken(),
                            !this.matchContextualKeyword("from")) {
                                var r = this.lookahead.value ? o.Messages.UnexpectedToken : o.Messages.MissingFromClause;
                                this.throwError(r, this.lookahead.value)
                            }
                            this.nextToken();
                            var n = this.parseModuleSpecifier();
                            this.consumeSemicolon(),
                            e = this.finalize(t, new s.ExportAllDeclaration(n))
                        } else if (4 === this.lookahead.type) {
                            switch (i = void 0,
                            this.lookahead.value) {
                            case "let":
                            case "const":
                                i = this.parseLexicalDeclaration({
                                    inFor: !1
                                });
                                break;
                            case "var":
                            case "class":
                            case "function":
                                i = this.parseStatementListItem();
                                break;
                            default:
                                this.throwUnexpectedToken(this.lookahead)
                            }
                            e = this.finalize(t, new s.ExportNamedDeclaration(i,[],null))
                        } else if (this.matchAsyncFunction())
                            i = this.parseFunctionDeclaration(),
                            e = this.finalize(t, new s.ExportNamedDeclaration(i,[],null));
                        else {
                            var a = []
                              , l = null
                              , u = !1;
                            for (this.expect("{"); !this.match("}"); )
                                u = u || this.matchKeyword("default"),
                                a.push(this.parseExportSpecifier()),
                                this.match("}") || this.expect(",");
                            this.expect("}"),
                            this.matchContextualKeyword("from") ? (this.nextToken(),
                            l = this.parseModuleSpecifier(),
                            this.consumeSemicolon()) : u ? (r = this.lookahead.value ? o.Messages.UnexpectedToken : o.Messages.MissingFromClause,
                            this.throwError(r, this.lookahead.value)) : this.consumeSemicolon(),
                            e = this.finalize(t, new s.ExportNamedDeclaration(null,a,l))
                        }
                        return e
                    }
                    ,
                    e
                }();
                t.Parser = c
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.assert = function(e, t) {
                    if (!e)
                        throw new Error("ASSERT: " + t)
                }
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function() {
                    function e() {
                        this.errors = [],
                        this.tolerant = !1
                    }
                    return e.prototype.recordError = function(e) {
                        this.errors.push(e)
                    }
                    ,
                    e.prototype.tolerate = function(e) {
                        if (!this.tolerant)
                            throw e;
                        this.recordError(e)
                    }
                    ,
                    e.prototype.constructError = function(e, t) {
                        var i = new Error(e);
                        try {
                            throw i
                        } catch (e) {
                            Object.create && Object.defineProperty && (i = Object.create(e),
                            Object.defineProperty(i, "column", {
                                value: t
                            }))
                        }
                        return i
                    }
                    ,
                    e.prototype.createError = function(e, t, i, r) {
                        var n = "Line " + t + ": " + r
                          , o = this.constructError(n, i);
                        return o.index = e,
                        o.lineNumber = t,
                        o.description = r,
                        o
                    }
                    ,
                    e.prototype.throwError = function(e, t, i, r) {
                        throw this.createError(e, t, i, r)
                    }
                    ,
                    e.prototype.tolerateError = function(e, t, i, r) {
                        var n = this.createError(e, t, i, r);
                        if (!this.tolerant)
                            throw n;
                        this.recordError(n)
                    }
                    ,
                    e
                }();
                t.ErrorHandler = i
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Messages = {
                    BadGetterArity: "Getter must not have any formal parameters",
                    BadSetterArity: "Setter must have exactly one formal parameter",
                    BadSetterRestParameter: "Setter function argument must not be a rest parameter",
                    ConstructorIsAsync: "Class constructor may not be an async method",
                    ConstructorSpecialMethod: "Class constructor may not be an accessor",
                    DeclarationMissingInitializer: "Missing initializer in %0 declaration",
                    DefaultRestParameter: "Unexpected token =",
                    DuplicateBinding: "Duplicate binding %0",
                    DuplicateConstructor: "A class may only have one constructor",
                    DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
                    ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
                    GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
                    IllegalBreak: "Illegal break statement",
                    IllegalContinue: "Illegal continue statement",
                    IllegalExportDeclaration: "Unexpected token",
                    IllegalImportDeclaration: "Unexpected token",
                    IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
                    IllegalReturn: "Illegal return statement",
                    InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
                    InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
                    InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                    InvalidLHSInForIn: "Invalid left-hand side in for-in",
                    InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
                    InvalidModuleSpecifier: "Unexpected token",
                    InvalidRegExp: "Invalid regular expression",
                    LetInLexicalBinding: "let is disallowed as a lexically bound name",
                    MissingFromClause: "Unexpected token",
                    MultipleDefaultsInSwitch: "More than one default clause in switch statement",
                    NewlineAfterThrow: "Illegal newline after throw",
                    NoAsAfterImportNamespace: "Unexpected token",
                    NoCatchOrFinally: "Missing catch or finally after try",
                    ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
                    Redeclaration: "%0 '%1' has already been declared",
                    StaticPrototype: "Classes may not have static property named prototype",
                    StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                    StrictDelete: "Delete of an unqualified identifier in strict mode.",
                    StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
                    StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                    StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                    StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                    StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                    StrictModeWith: "Strict mode code may not include a with statement",
                    StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                    StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                    StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                    StrictReservedWord: "Use of future reserved word in strict mode",
                    StrictVarName: "Variable name may not be eval or arguments in strict mode",
                    TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
                    UnexpectedEOS: "Unexpected end of input",
                    UnexpectedIdentifier: "Unexpected identifier",
                    UnexpectedNumber: "Unexpected number",
                    UnexpectedReserved: "Unexpected reserved word",
                    UnexpectedString: "Unexpected string",
                    UnexpectedTemplate: "Unexpected quasi %0",
                    UnexpectedToken: "Unexpected token %0",
                    UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
                    UnknownLabel: "Undefined label '%0'",
                    UnterminatedRegExp: "Invalid regular expression: missing /"
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(9)
                  , n = i(4)
                  , o = i(11);
                function s(e) {
                    return "0123456789abcdef".indexOf(e.toLowerCase())
                }
                function a(e) {
                    return "01234567".indexOf(e)
                }
                var l = function() {
                    function e(e, t) {
                        this.source = e,
                        this.errorHandler = t,
                        this.trackComment = !1,
                        this.isModule = !1,
                        this.length = e.length,
                        this.index = 0,
                        this.lineNumber = e.length > 0 ? 1 : 0,
                        this.lineStart = 0,
                        this.curlyStack = []
                    }
                    return e.prototype.saveState = function() {
                        return {
                            index: this.index,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart
                        }
                    }
                    ,
                    e.prototype.restoreState = function(e) {
                        this.index = e.index,
                        this.lineNumber = e.lineNumber,
                        this.lineStart = e.lineStart
                    }
                    ,
                    e.prototype.eof = function() {
                        return this.index >= this.length
                    }
                    ,
                    e.prototype.throwUnexpectedToken = function(e) {
                        return void 0 === e && (e = o.Messages.UnexpectedTokenIllegal),
                        this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, e)
                    }
                    ,
                    e.prototype.tolerateUnexpectedToken = function(e) {
                        void 0 === e && (e = o.Messages.UnexpectedTokenIllegal),
                        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, e)
                    }
                    ,
                    e.prototype.skipSingleLineComment = function(e) {
                        var t, i, r = [];
                        for (this.trackComment && (r = [],
                        t = this.index - e,
                        i = {
                            start: {
                                line: this.lineNumber,
                                column: this.index - this.lineStart - e
                            },
                            end: {}
                        }); !this.eof(); ) {
                            var o = this.source.charCodeAt(this.index);
                            if (++this.index,
                            n.Character.isLineTerminator(o)) {
                                if (this.trackComment) {
                                    i.end = {
                                        line: this.lineNumber,
                                        column: this.index - this.lineStart - 1
                                    };
                                    var s = {
                                        multiLine: !1,
                                        slice: [t + e, this.index - 1],
                                        range: [t, this.index - 1],
                                        loc: i
                                    };
                                    r.push(s)
                                }
                                return 13 === o && 10 === this.source.charCodeAt(this.index) && ++this.index,
                                ++this.lineNumber,
                                this.lineStart = this.index,
                                r
                            }
                        }
                        return this.trackComment && (i.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        },
                        s = {
                            multiLine: !1,
                            slice: [t + e, this.index],
                            range: [t, this.index],
                            loc: i
                        },
                        r.push(s)),
                        r
                    }
                    ,
                    e.prototype.skipMultiLineComment = function() {
                        var e, t, i = [];
                        for (this.trackComment && (i = [],
                        e = this.index - 2,
                        t = {
                            start: {
                                line: this.lineNumber,
                                column: this.index - this.lineStart - 2
                            },
                            end: {}
                        }); !this.eof(); ) {
                            var r = this.source.charCodeAt(this.index);
                            if (n.Character.isLineTerminator(r))
                                13 === r && 10 === this.source.charCodeAt(this.index + 1) && ++this.index,
                                ++this.lineNumber,
                                ++this.index,
                                this.lineStart = this.index;
                            else if (42 === r) {
                                if (47 === this.source.charCodeAt(this.index + 1)) {
                                    if (this.index += 2,
                                    this.trackComment) {
                                        t.end = {
                                            line: this.lineNumber,
                                            column: this.index - this.lineStart
                                        };
                                        var o = {
                                            multiLine: !0,
                                            slice: [e + 2, this.index - 2],
                                            range: [e, this.index],
                                            loc: t
                                        };
                                        i.push(o)
                                    }
                                    return i
                                }
                                ++this.index
                            } else
                                ++this.index
                        }
                        return this.trackComment && (t.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        },
                        o = {
                            multiLine: !0,
                            slice: [e + 2, this.index],
                            range: [e, this.index],
                            loc: t
                        },
                        i.push(o)),
                        this.tolerateUnexpectedToken(),
                        i
                    }
                    ,
                    e.prototype.scanComments = function() {
                        var e;
                        this.trackComment && (e = []);
                        for (var t = 0 === this.index; !this.eof(); ) {
                            var i = this.source.charCodeAt(this.index);
                            if (n.Character.isWhiteSpace(i))
                                ++this.index;
                            else if (n.Character.isLineTerminator(i))
                                ++this.index,
                                13 === i && 10 === this.source.charCodeAt(this.index) && ++this.index,
                                ++this.lineNumber,
                                this.lineStart = this.index,
                                t = !0;
                            else if (47 === i)
                                if (47 === (i = this.source.charCodeAt(this.index + 1))) {
                                    this.index += 2;
                                    var r = this.skipSingleLineComment(2);
                                    this.trackComment && (e = e.concat(r)),
                                    t = !0
                                } else {
                                    if (42 !== i)
                                        break;
                                    this.index += 2,
                                    r = this.skipMultiLineComment(),
                                    this.trackComment && (e = e.concat(r))
                                }
                            else if (t && 45 === i) {
                                if (45 !== this.source.charCodeAt(this.index + 1) || 62 !== this.source.charCodeAt(this.index + 2))
                                    break;
                                this.index += 3,
                                r = this.skipSingleLineComment(3),
                                this.trackComment && (e = e.concat(r))
                            } else {
                                if (60 !== i || this.isModule)
                                    break;
                                if ("!--" !== this.source.slice(this.index + 1, this.index + 4))
                                    break;
                                this.index += 4,
                                r = this.skipSingleLineComment(4),
                                this.trackComment && (e = e.concat(r))
                            }
                        }
                        return e
                    }
                    ,
                    e.prototype.isFutureReservedWord = function(e) {
                        switch (e) {
                        case "enum":
                        case "export":
                        case "import":
                        case "super":
                            return !0;
                        default:
                            return !1
                        }
                    }
                    ,
                    e.prototype.isStrictModeReservedWord = function(e) {
                        switch (e) {
                        case "implements":
                        case "interface":
                        case "package":
                        case "private":
                        case "protected":
                        case "public":
                        case "static":
                        case "yield":
                        case "let":
                            return !0;
                        default:
                            return !1
                        }
                    }
                    ,
                    e.prototype.isRestrictedWord = function(e) {
                        return "eval" === e || "arguments" === e
                    }
                    ,
                    e.prototype.isKeyword = function(e) {
                        switch (e.length) {
                        case 2:
                            return "if" === e || "in" === e || "do" === e;
                        case 3:
                            return "var" === e || "for" === e || "new" === e || "try" === e || "let" === e;
                        case 4:
                            return "this" === e || "else" === e || "case" === e || "void" === e || "with" === e || "enum" === e;
                        case 5:
                            return "while" === e || "break" === e || "catch" === e || "throw" === e || "const" === e || "yield" === e || "class" === e || "super" === e;
                        case 6:
                            return "return" === e || "typeof" === e || "delete" === e || "switch" === e || "export" === e || "import" === e;
                        case 7:
                            return "default" === e || "finally" === e || "extends" === e;
                        case 8:
                            return "function" === e || "continue" === e || "debugger" === e;
                        case 10:
                            return "instanceof" === e;
                        default:
                            return !1
                        }
                    }
                    ,
                    e.prototype.codePointAt = function(e) {
                        var t = this.source.charCodeAt(e);
                        if (t >= 55296 && t <= 56319) {
                            var i = this.source.charCodeAt(e + 1);
                            i >= 56320 && i <= 57343 && (t = 1024 * (t - 55296) + i - 56320 + 65536)
                        }
                        return t
                    }
                    ,
                    e.prototype.scanHexEscape = function(e) {
                        for (var t = "u" === e ? 4 : 2, i = 0, r = 0; r < t; ++r) {
                            if (this.eof() || !n.Character.isHexDigit(this.source.charCodeAt(this.index)))
                                return null;
                            i = 16 * i + s(this.source[this.index++])
                        }
                        return String.fromCharCode(i)
                    }
                    ,
                    e.prototype.scanUnicodeCodePointEscape = function() {
                        var e = this.source[this.index]
                          , t = 0;
                        for ("}" === e && this.throwUnexpectedToken(); !this.eof() && (e = this.source[this.index++],
                        n.Character.isHexDigit(e.charCodeAt(0))); )
                            t = 16 * t + s(e);
                        return (t > 1114111 || "}" !== e) && this.throwUnexpectedToken(),
                        n.Character.fromCodePoint(t)
                    }
                    ,
                    e.prototype.getIdentifier = function() {
                        for (var e = this.index++; !this.eof(); ) {
                            var t = this.source.charCodeAt(this.index);
                            if (92 === t)
                                return this.index = e,
                                this.getComplexIdentifier();
                            if (t >= 55296 && t < 57343)
                                return this.index = e,
                                this.getComplexIdentifier();
                            if (!n.Character.isIdentifierPart(t))
                                break;
                            ++this.index
                        }
                        return this.source.slice(e, this.index)
                    }
                    ,
                    e.prototype.getComplexIdentifier = function() {
                        var e, t = this.codePointAt(this.index), i = n.Character.fromCodePoint(t);
                        for (this.index += i.length,
                        92 === t && (117 !== this.source.charCodeAt(this.index) && this.throwUnexpectedToken(),
                        ++this.index,
                        "{" === this.source[this.index] ? (++this.index,
                        e = this.scanUnicodeCodePointEscape()) : null !== (e = this.scanHexEscape("u")) && "\\" !== e && n.Character.isIdentifierStart(e.charCodeAt(0)) || this.throwUnexpectedToken(),
                        i = e); !this.eof() && (t = this.codePointAt(this.index),
                        n.Character.isIdentifierPart(t)); )
                            i += e = n.Character.fromCodePoint(t),
                            this.index += e.length,
                            92 === t && (i = i.substr(0, i.length - 1),
                            117 !== this.source.charCodeAt(this.index) && this.throwUnexpectedToken(),
                            ++this.index,
                            "{" === this.source[this.index] ? (++this.index,
                            e = this.scanUnicodeCodePointEscape()) : null !== (e = this.scanHexEscape("u")) && "\\" !== e && n.Character.isIdentifierPart(e.charCodeAt(0)) || this.throwUnexpectedToken(),
                            i += e);
                        return i
                    }
                    ,
                    e.prototype.octalToDecimal = function(e) {
                        var t = "0" !== e
                          , i = a(e);
                        return !this.eof() && n.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (t = !0,
                        i = 8 * i + a(this.source[this.index++]),
                        "0123".indexOf(e) >= 0 && !this.eof() && n.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (i = 8 * i + a(this.source[this.index++]))),
                        {
                            code: i,
                            octal: t
                        }
                    }
                    ,
                    e.prototype.scanIdentifier = function() {
                        var e, t = this.index, i = 92 === this.source.charCodeAt(t) ? this.getComplexIdentifier() : this.getIdentifier();
                        if (3 != (e = 1 === i.length ? 3 : this.isKeyword(i) ? 4 : "null" === i ? 5 : "true" === i || "false" === i ? 1 : 3) && t + i.length !== this.index) {
                            var r = this.index;
                            this.index = t,
                            this.tolerateUnexpectedToken(o.Messages.InvalidEscapedReservedWord),
                            this.index = r
                        }
                        return {
                            type: e,
                            value: i,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: t,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanPunctuator = function() {
                        var e = this.index
                          , t = this.source[this.index];
                        switch (t) {
                        case "(":
                        case "{":
                            "{" === t && this.curlyStack.push("{"),
                            ++this.index;
                            break;
                        case ".":
                            ++this.index,
                            "." === this.source[this.index] && "." === this.source[this.index + 1] && (this.index += 2,
                            t = "...");
                            break;
                        case "}":
                            ++this.index,
                            this.curlyStack.pop();
                            break;
                        case ")":
                        case ";":
                        case ",":
                        case "[":
                        case "]":
                        case ":":
                        case "?":
                        case "~":
                            ++this.index;
                            break;
                        default:
                            ">>>=" === (t = this.source.substr(this.index, 4)) ? this.index += 4 : "===" === (t = t.substr(0, 3)) || "!==" === t || ">>>" === t || "<<=" === t || ">>=" === t || "**=" === t ? this.index += 3 : "&&" === (t = t.substr(0, 2)) || "||" === t || "==" === t || "!=" === t || "+=" === t || "-=" === t || "*=" === t || "/=" === t || "++" === t || "--" === t || "<<" === t || ">>" === t || "&=" === t || "|=" === t || "^=" === t || "%=" === t || "<=" === t || ">=" === t || "=>" === t || "**" === t ? this.index += 2 : (t = this.source[this.index],
                            "<>=!+-*%&|^/".indexOf(t) >= 0 && ++this.index)
                        }
                        return this.index === e && this.throwUnexpectedToken(),
                        {
                            type: 7,
                            value: t,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanHexLiteral = function(e) {
                        for (var t = ""; !this.eof() && n.Character.isHexDigit(this.source.charCodeAt(this.index)); )
                            t += this.source[this.index++];
                        return 0 === t.length && this.throwUnexpectedToken(),
                        n.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(),
                        {
                            type: 6,
                            value: parseInt("0x" + t, 16),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanBinaryLiteral = function(e) {
                        for (var t, i = ""; !this.eof() && ("0" === (t = this.source[this.index]) || "1" === t); )
                            i += this.source[this.index++];
                        return 0 === i.length && this.throwUnexpectedToken(),
                        this.eof() || (t = this.source.charCodeAt(this.index),
                        (n.Character.isIdentifierStart(t) || n.Character.isDecimalDigit(t)) && this.throwUnexpectedToken()),
                        {
                            type: 6,
                            value: parseInt(i, 2),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanOctalLiteral = function(e, t) {
                        var i = ""
                          , r = !1;
                        for (n.Character.isOctalDigit(e.charCodeAt(0)) ? (r = !0,
                        i = "0" + this.source[this.index++]) : ++this.index; !this.eof() && n.Character.isOctalDigit(this.source.charCodeAt(this.index)); )
                            i += this.source[this.index++];
                        return r || 0 !== i.length || this.throwUnexpectedToken(),
                        (n.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || n.Character.isDecimalDigit(this.source.charCodeAt(this.index))) && this.throwUnexpectedToken(),
                        {
                            type: 6,
                            value: parseInt(i, 8),
                            octal: r,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: t,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.isImplicitOctalLiteral = function() {
                        for (var e = this.index + 1; e < this.length; ++e) {
                            var t = this.source[e];
                            if ("8" === t || "9" === t)
                                return !1;
                            if (!n.Character.isOctalDigit(t.charCodeAt(0)))
                                return !0
                        }
                        return !0
                    }
                    ,
                    e.prototype.scanNumericLiteral = function() {
                        var e = this.index
                          , t = this.source[e];
                        r.assert(n.Character.isDecimalDigit(t.charCodeAt(0)) || "." === t, "Numeric literal must start with a decimal digit or a decimal point");
                        var i = "";
                        if ("." !== t) {
                            if (i = this.source[this.index++],
                            t = this.source[this.index],
                            "0" === i) {
                                if ("x" === t || "X" === t)
                                    return ++this.index,
                                    this.scanHexLiteral(e);
                                if ("b" === t || "B" === t)
                                    return ++this.index,
                                    this.scanBinaryLiteral(e);
                                if ("o" === t || "O" === t)
                                    return this.scanOctalLiteral(t, e);
                                if (t && n.Character.isOctalDigit(t.charCodeAt(0)) && this.isImplicitOctalLiteral())
                                    return this.scanOctalLiteral(t, e)
                            }
                            for (; n.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                                i += this.source[this.index++];
                            t = this.source[this.index]
                        }
                        if ("." === t) {
                            for (i += this.source[this.index++]; n.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                                i += this.source[this.index++];
                            t = this.source[this.index]
                        }
                        if ("e" === t || "E" === t)
                            if (i += this.source[this.index++],
                            "+" !== (t = this.source[this.index]) && "-" !== t || (i += this.source[this.index++]),
                            n.Character.isDecimalDigit(this.source.charCodeAt(this.index)))
                                for (; n.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                                    i += this.source[this.index++];
                            else
                                this.throwUnexpectedToken();
                        return n.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(),
                        {
                            type: 6,
                            value: parseFloat(i),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanStringLiteral = function() {
                        var e = this.index
                          , t = this.source[e];
                        r.assert("'" === t || '"' === t, "String literal must starts with a quote"),
                        ++this.index;
                        for (var i = !1, s = ""; !this.eof(); ) {
                            var a = this.source[this.index++];
                            if (a === t) {
                                t = "";
                                break
                            }
                            if ("\\" === a)
                                if ((a = this.source[this.index++]) && n.Character.isLineTerminator(a.charCodeAt(0)))
                                    ++this.lineNumber,
                                    "\r" === a && "\n" === this.source[this.index] && ++this.index,
                                    this.lineStart = this.index;
                                else
                                    switch (a) {
                                    case "u":
                                        if ("{" === this.source[this.index])
                                            ++this.index,
                                            s += this.scanUnicodeCodePointEscape();
                                        else {
                                            var l = this.scanHexEscape(a);
                                            null === l && this.throwUnexpectedToken(),
                                            s += l
                                        }
                                        break;
                                    case "x":
                                        var u = this.scanHexEscape(a);
                                        null === u && this.throwUnexpectedToken(o.Messages.InvalidHexEscapeSequence),
                                        s += u;
                                        break;
                                    case "n":
                                        s += "\n";
                                        break;
                                    case "r":
                                        s += "\r";
                                        break;
                                    case "t":
                                        s += "\t";
                                        break;
                                    case "b":
                                        s += "\b";
                                        break;
                                    case "f":
                                        s += "\f";
                                        break;
                                    case "v":
                                        s += "\v";
                                        break;
                                    case "8":
                                    case "9":
                                        s += a,
                                        this.tolerateUnexpectedToken();
                                        break;
                                    default:
                                        if (a && n.Character.isOctalDigit(a.charCodeAt(0))) {
                                            var c = this.octalToDecimal(a);
                                            i = c.octal || i,
                                            s += String.fromCharCode(c.code)
                                        } else
                                            s += a
                                    }
                            else {
                                if (n.Character.isLineTerminator(a.charCodeAt(0)))
                                    break;
                                s += a
                            }
                        }
                        return "" !== t && (this.index = e,
                        this.throwUnexpectedToken()),
                        {
                            type: 8,
                            value: s,
                            octal: i,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanTemplate = function() {
                        var e = ""
                          , t = !1
                          , i = this.index
                          , r = "`" === this.source[i]
                          , s = !1
                          , a = 2;
                        for (++this.index; !this.eof(); ) {
                            var l = this.source[this.index++];
                            if ("`" === l) {
                                a = 1,
                                s = !0,
                                t = !0;
                                break
                            }
                            if ("$" === l) {
                                if ("{" === this.source[this.index]) {
                                    this.curlyStack.push("${"),
                                    ++this.index,
                                    t = !0;
                                    break
                                }
                                e += l
                            } else if ("\\" === l)
                                if (l = this.source[this.index++],
                                n.Character.isLineTerminator(l.charCodeAt(0)))
                                    ++this.lineNumber,
                                    "\r" === l && "\n" === this.source[this.index] && ++this.index,
                                    this.lineStart = this.index;
                                else
                                    switch (l) {
                                    case "n":
                                        e += "\n";
                                        break;
                                    case "r":
                                        e += "\r";
                                        break;
                                    case "t":
                                        e += "\t";
                                        break;
                                    case "u":
                                        if ("{" === this.source[this.index])
                                            ++this.index,
                                            e += this.scanUnicodeCodePointEscape();
                                        else {
                                            var u = this.index
                                              , c = this.scanHexEscape(l);
                                            null !== c ? e += c : (this.index = u,
                                            e += l)
                                        }
                                        break;
                                    case "x":
                                        var h = this.scanHexEscape(l);
                                        null === h && this.throwUnexpectedToken(o.Messages.InvalidHexEscapeSequence),
                                        e += h;
                                        break;
                                    case "b":
                                        e += "\b";
                                        break;
                                    case "f":
                                        e += "\f";
                                        break;
                                    case "v":
                                        e += "\v";
                                        break;
                                    default:
                                        "0" === l ? (n.Character.isDecimalDigit(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(o.Messages.TemplateOctalLiteral),
                                        e += "\0") : n.Character.isOctalDigit(l.charCodeAt(0)) ? this.throwUnexpectedToken(o.Messages.TemplateOctalLiteral) : e += l
                                    }
                            else
                                n.Character.isLineTerminator(l.charCodeAt(0)) ? (++this.lineNumber,
                                "\r" === l && "\n" === this.source[this.index] && ++this.index,
                                this.lineStart = this.index,
                                e += "\n") : e += l
                        }
                        return t || this.throwUnexpectedToken(),
                        r || this.curlyStack.pop(),
                        {
                            type: 10,
                            value: this.source.slice(i + 1, this.index - a),
                            cooked: e,
                            head: r,
                            tail: s,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: i,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.testRegExp = function(e, t) {
                        var i = e
                          , r = this;
                        t.indexOf("u") >= 0 && (i = i.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, (function(e, t, i) {
                            var n = parseInt(t || i, 16);
                            return n > 1114111 && r.throwUnexpectedToken(o.Messages.InvalidRegExp),
                            n <= 65535 ? String.fromCharCode(n) : "￿"
                        }
                        )).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "￿"));
                        try {
                            RegExp(i)
                        } catch (e) {
                            this.throwUnexpectedToken(o.Messages.InvalidRegExp)
                        }
                        try {
                            return new RegExp(e,t)
                        } catch (e) {
                            return null
                        }
                    }
                    ,
                    e.prototype.scanRegExpBody = function() {
                        var e = this.source[this.index];
                        r.assert("/" === e, "Regular expression literal must start with a slash");
                        for (var t = this.source[this.index++], i = !1, s = !1; !this.eof(); )
                            if (t += e = this.source[this.index++],
                            "\\" === e)
                                e = this.source[this.index++],
                                n.Character.isLineTerminator(e.charCodeAt(0)) && this.throwUnexpectedToken(o.Messages.UnterminatedRegExp),
                                t += e;
                            else if (n.Character.isLineTerminator(e.charCodeAt(0)))
                                this.throwUnexpectedToken(o.Messages.UnterminatedRegExp);
                            else if (i)
                                "]" === e && (i = !1);
                            else {
                                if ("/" === e) {
                                    s = !0;
                                    break
                                }
                                "[" === e && (i = !0)
                            }
                        return s || this.throwUnexpectedToken(o.Messages.UnterminatedRegExp),
                        t.substr(1, t.length - 2)
                    }
                    ,
                    e.prototype.scanRegExpFlags = function() {
                        for (var e = ""; !this.eof(); ) {
                            var t = this.source[this.index];
                            if (!n.Character.isIdentifierPart(t.charCodeAt(0)))
                                break;
                            if (++this.index,
                            "\\" !== t || this.eof())
                                e += t;
                            else if ("u" === (t = this.source[this.index])) {
                                ++this.index;
                                var i = this.index
                                  , r = this.scanHexEscape("u");
                                if (null !== r)
                                    for (e += r; i < this.index; ++i)
                                        this.source[i];
                                else
                                    this.index = i,
                                    e += "u";
                                this.tolerateUnexpectedToken()
                            } else
                                this.tolerateUnexpectedToken()
                        }
                        return e
                    }
                    ,
                    e.prototype.scanRegExp = function() {
                        var e = this.index
                          , t = this.scanRegExpBody()
                          , i = this.scanRegExpFlags();
                        return {
                            type: 9,
                            value: "",
                            pattern: t,
                            flags: i,
                            regex: this.testRegExp(t, i),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.lex = function() {
                        if (this.eof())
                            return {
                                type: 2,
                                value: "",
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: this.index,
                                end: this.index
                            };
                        var e = this.source.charCodeAt(this.index);
                        return n.Character.isIdentifierStart(e) ? this.scanIdentifier() : 40 === e || 41 === e || 59 === e ? this.scanPunctuator() : 39 === e || 34 === e ? this.scanStringLiteral() : 46 === e ? n.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1)) ? this.scanNumericLiteral() : this.scanPunctuator() : n.Character.isDecimalDigit(e) ? this.scanNumericLiteral() : 96 === e || 125 === e && "${" === this.curlyStack[this.curlyStack.length - 1] ? this.scanTemplate() : e >= 55296 && e < 57343 && n.Character.isIdentifierStart(this.codePointAt(this.index)) ? this.scanIdentifier() : this.scanPunctuator()
                    }
                    ,
                    e
                }();
                t.Scanner = l
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.TokenName = {},
                t.TokenName[1] = "Boolean",
                t.TokenName[2] = "<end>",
                t.TokenName[3] = "Identifier",
                t.TokenName[4] = "Keyword",
                t.TokenName[5] = "Null",
                t.TokenName[6] = "Numeric",
                t.TokenName[7] = "Punctuator",
                t.TokenName[8] = "String",
                t.TokenName[9] = "RegularExpression",
                t.TokenName[10] = "Template"
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.XHTMLEntities = {
                    quot: '"',
                    amp: "&",
                    apos: "'",
                    gt: ">",
                    nbsp: " ",
                    iexcl: "¡",
                    cent: "¢",
                    pound: "£",
                    curren: "¤",
                    yen: "¥",
                    brvbar: "¦",
                    sect: "§",
                    uml: "¨",
                    copy: "©",
                    ordf: "ª",
                    laquo: "«",
                    not: "¬",
                    shy: "­",
                    reg: "®",
                    macr: "¯",
                    deg: "°",
                    plusmn: "±",
                    sup2: "²",
                    sup3: "³",
                    acute: "´",
                    micro: "µ",
                    para: "¶",
                    middot: "·",
                    cedil: "¸",
                    sup1: "¹",
                    ordm: "º",
                    raquo: "»",
                    frac14: "¼",
                    frac12: "½",
                    frac34: "¾",
                    iquest: "¿",
                    Agrave: "À",
                    Aacute: "Á",
                    Acirc: "Â",
                    Atilde: "Ã",
                    Auml: "Ä",
                    Aring: "Å",
                    AElig: "Æ",
                    Ccedil: "Ç",
                    Egrave: "È",
                    Eacute: "É",
                    Ecirc: "Ê",
                    Euml: "Ë",
                    Igrave: "Ì",
                    Iacute: "Í",
                    Icirc: "Î",
                    Iuml: "Ï",
                    ETH: "Ð",
                    Ntilde: "Ñ",
                    Ograve: "Ò",
                    Oacute: "Ó",
                    Ocirc: "Ô",
                    Otilde: "Õ",
                    Ouml: "Ö",
                    times: "×",
                    Oslash: "Ø",
                    Ugrave: "Ù",
                    Uacute: "Ú",
                    Ucirc: "Û",
                    Uuml: "Ü",
                    Yacute: "Ý",
                    THORN: "Þ",
                    szlig: "ß",
                    agrave: "à",
                    aacute: "á",
                    acirc: "â",
                    atilde: "ã",
                    auml: "ä",
                    aring: "å",
                    aelig: "æ",
                    ccedil: "ç",
                    egrave: "è",
                    eacute: "é",
                    ecirc: "ê",
                    euml: "ë",
                    igrave: "ì",
                    iacute: "í",
                    icirc: "î",
                    iuml: "ï",
                    eth: "ð",
                    ntilde: "ñ",
                    ograve: "ò",
                    oacute: "ó",
                    ocirc: "ô",
                    otilde: "õ",
                    ouml: "ö",
                    divide: "÷",
                    oslash: "ø",
                    ugrave: "ù",
                    uacute: "ú",
                    ucirc: "û",
                    uuml: "ü",
                    yacute: "ý",
                    thorn: "þ",
                    yuml: "ÿ",
                    OElig: "Œ",
                    oelig: "œ",
                    Scaron: "Š",
                    scaron: "š",
                    Yuml: "Ÿ",
                    fnof: "ƒ",
                    circ: "ˆ",
                    tilde: "˜",
                    Alpha: "Α",
                    Beta: "Β",
                    Gamma: "Γ",
                    Delta: "Δ",
                    Epsilon: "Ε",
                    Zeta: "Ζ",
                    Eta: "Η",
                    Theta: "Θ",
                    Iota: "Ι",
                    Kappa: "Κ",
                    Lambda: "Λ",
                    Mu: "Μ",
                    Nu: "Ν",
                    Xi: "Ξ",
                    Omicron: "Ο",
                    Pi: "Π",
                    Rho: "Ρ",
                    Sigma: "Σ",
                    Tau: "Τ",
                    Upsilon: "Υ",
                    Phi: "Φ",
                    Chi: "Χ",
                    Psi: "Ψ",
                    Omega: "Ω",
                    alpha: "α",
                    beta: "β",
                    gamma: "γ",
                    delta: "δ",
                    epsilon: "ε",
                    zeta: "ζ",
                    eta: "η",
                    theta: "θ",
                    iota: "ι",
                    kappa: "κ",
                    lambda: "λ",
                    mu: "μ",
                    nu: "ν",
                    xi: "ξ",
                    omicron: "ο",
                    pi: "π",
                    rho: "ρ",
                    sigmaf: "ς",
                    sigma: "σ",
                    tau: "τ",
                    upsilon: "υ",
                    phi: "φ",
                    chi: "χ",
                    psi: "ψ",
                    omega: "ω",
                    thetasym: "ϑ",
                    upsih: "ϒ",
                    piv: "ϖ",
                    ensp: " ",
                    emsp: " ",
                    thinsp: " ",
                    zwnj: "‌",
                    zwj: "‍",
                    lrm: "‎",
                    rlm: "‏",
                    ndash: "–",
                    mdash: "—",
                    lsquo: "‘",
                    rsquo: "’",
                    sbquo: "‚",
                    ldquo: "“",
                    rdquo: "”",
                    bdquo: "„",
                    dagger: "†",
                    Dagger: "‡",
                    bull: "•",
                    hellip: "…",
                    permil: "‰",
                    prime: "′",
                    Prime: "″",
                    lsaquo: "‹",
                    rsaquo: "›",
                    oline: "‾",
                    frasl: "⁄",
                    euro: "€",
                    image: "ℑ",
                    weierp: "℘",
                    real: "ℜ",
                    trade: "™",
                    alefsym: "ℵ",
                    larr: "←",
                    uarr: "↑",
                    rarr: "→",
                    darr: "↓",
                    harr: "↔",
                    crarr: "↵",
                    lArr: "⇐",
                    uArr: "⇑",
                    rArr: "⇒",
                    dArr: "⇓",
                    hArr: "⇔",
                    forall: "∀",
                    part: "∂",
                    exist: "∃",
                    empty: "∅",
                    nabla: "∇",
                    isin: "∈",
                    notin: "∉",
                    ni: "∋",
                    prod: "∏",
                    sum: "∑",
                    minus: "−",
                    lowast: "∗",
                    radic: "√",
                    prop: "∝",
                    infin: "∞",
                    ang: "∠",
                    and: "∧",
                    or: "∨",
                    cap: "∩",
                    cup: "∪",
                    int: "∫",
                    there4: "∴",
                    sim: "∼",
                    cong: "≅",
                    asymp: "≈",
                    ne: "≠",
                    equiv: "≡",
                    le: "≤",
                    ge: "≥",
                    sub: "⊂",
                    sup: "⊃",
                    nsub: "⊄",
                    sube: "⊆",
                    supe: "⊇",
                    oplus: "⊕",
                    otimes: "⊗",
                    perp: "⊥",
                    sdot: "⋅",
                    lceil: "⌈",
                    rceil: "⌉",
                    lfloor: "⌊",
                    rfloor: "⌋",
                    loz: "◊",
                    spades: "♠",
                    clubs: "♣",
                    hearts: "♥",
                    diams: "♦",
                    lang: "⟨",
                    rang: "⟩"
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(10)
                  , n = i(12)
                  , o = i(13)
                  , s = function() {
                    function e() {
                        this.values = [],
                        this.curly = this.paren = -1
                    }
                    return e.prototype.beforeFunctionExpression = function(e) {
                        return ["(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", "=", "+=", "-=", "*=", "**=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", "+", "-", "*", "**", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!=="].indexOf(e) >= 0
                    }
                    ,
                    e.prototype.isRegexStart = function() {
                        var e = this.values[this.values.length - 1]
                          , t = null !== e;
                        switch (e) {
                        case "this":
                        case "]":
                            t = !1;
                            break;
                        case ")":
                            var i = this.values[this.paren - 1];
                            t = "if" === i || "while" === i || "for" === i || "with" === i;
                            break;
                        case "}":
                            if (t = !1,
                            "function" === this.values[this.curly - 3])
                                t = !!(r = this.values[this.curly - 4]) && !this.beforeFunctionExpression(r);
                            else if ("function" === this.values[this.curly - 4]) {
                                var r;
                                t = !(r = this.values[this.curly - 5]) || !this.beforeFunctionExpression(r)
                            }
                        }
                        return t
                    }
                    ,
                    e.prototype.push = function(e) {
                        7 === e.type || 4 === e.type ? ("{" === e.value ? this.curly = this.values.length : "(" === e.value && (this.paren = this.values.length),
                        this.values.push(e.value)) : this.values.push(null)
                    }
                    ,
                    e
                }()
                  , a = function() {
                    function e(e, t) {
                        this.errorHandler = new r.ErrorHandler,
                        this.errorHandler.tolerant = !!t && "boolean" == typeof t.tolerant && t.tolerant,
                        this.scanner = new n.Scanner(e,this.errorHandler),
                        this.scanner.trackComment = !!t && "boolean" == typeof t.comment && t.comment,
                        this.trackRange = !!t && "boolean" == typeof t.range && t.range,
                        this.trackLoc = !!t && "boolean" == typeof t.loc && t.loc,
                        this.buffer = [],
                        this.reader = new s
                    }
                    return e.prototype.errors = function() {
                        return this.errorHandler.errors
                    }
                    ,
                    e.prototype.getNextToken = function() {
                        if (0 === this.buffer.length) {
                            var e = this.scanner.scanComments();
                            if (this.scanner.trackComment)
                                for (var t = 0; t < e.length; ++t) {
                                    var i = e[t]
                                      , r = this.scanner.source.slice(i.slice[0], i.slice[1])
                                      , n = {
                                        type: i.multiLine ? "BlockComment" : "LineComment",
                                        value: r
                                    };
                                    this.trackRange && (n.range = i.range),
                                    this.trackLoc && (n.loc = i.loc),
                                    this.buffer.push(n)
                                }
                            if (!this.scanner.eof()) {
                                var s = void 0;
                                this.trackLoc && (s = {
                                    start: {
                                        line: this.scanner.lineNumber,
                                        column: this.scanner.index - this.scanner.lineStart
                                    },
                                    end: {}
                                });
                                var a = "/" === this.scanner.source[this.scanner.index] && this.reader.isRegexStart() ? this.scanner.scanRegExp() : this.scanner.lex();
                                this.reader.push(a);
                                var l = {
                                    type: o.TokenName[a.type],
                                    value: this.scanner.source.slice(a.start, a.end)
                                };
                                if (this.trackRange && (l.range = [a.start, a.end]),
                                this.trackLoc && (s.end = {
                                    line: this.scanner.lineNumber,
                                    column: this.scanner.index - this.scanner.lineStart
                                },
                                l.loc = s),
                                9 === a.type) {
                                    var u = a.pattern
                                      , c = a.flags;
                                    l.regex = {
                                        pattern: u,
                                        flags: c
                                    }
                                }
                                this.buffer.push(l)
                            }
                        }
                        return this.buffer.shift()
                    }
                    ,
                    e
                }();
                t.Tokenizer = a
            }
            ])
        }
        ,
        e.exports = r()
    },
    "./node_modules/estraverse/estraverse.js": /*!***********************************************!*\
  !*** ./node_modules/estraverse/estraverse.js ***!
  \***********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        !function e(t) {
            "use strict";
            var r, n, o, s, a, l;
            function u(e) {
                var t, i, r = {};
                for (t in e)
                    e.hasOwnProperty(t) && (i = e[t],
                    r[t] = "object" == typeof i && null !== i ? u(i) : i);
                return r
            }
            function c(e, t) {
                this.parent = e,
                this.key = t
            }
            function h(e, t, i, r) {
                this.node = e,
                this.path = t,
                this.wrap = i,
                this.ref = r
            }
            function p() {}
            function d(e) {
                return null != e && "object" == typeof e && "string" == typeof e.type
            }
            function f(e, t) {
                return (e === r.ObjectExpression || e === r.ObjectPattern) && "properties" === t
            }
            function m(e, t) {
                return (new p).traverse(e, t)
            }
            function g(e, t) {
                var i;
                return i = function(e, t) {
                    var i, r, n, o;
                    for (r = e.length,
                    n = 0; r; )
                        t(e[o = n + (i = r >>> 1)]) ? r = i : (n = o + 1,
                        r -= i + 1);
                    return n
                }(t, (function(t) {
                    return t.range[0] > e.range[0]
                }
                )),
                e.extendedRange = [e.range[0], e.range[1]],
                i !== t.length && (e.extendedRange[1] = t[i].range[0]),
                (i -= 1) >= 0 && (e.extendedRange[0] = t[i].range[1]),
                e
            }
            return r = {
                AssignmentExpression: "AssignmentExpression",
                AssignmentPattern: "AssignmentPattern",
                ArrayExpression: "ArrayExpression",
                ArrayPattern: "ArrayPattern",
                ArrowFunctionExpression: "ArrowFunctionExpression",
                AwaitExpression: "AwaitExpression",
                BlockStatement: "BlockStatement",
                BinaryExpression: "BinaryExpression",
                BreakStatement: "BreakStatement",
                CallExpression: "CallExpression",
                CatchClause: "CatchClause",
                ClassBody: "ClassBody",
                ClassDeclaration: "ClassDeclaration",
                ClassExpression: "ClassExpression",
                ComprehensionBlock: "ComprehensionBlock",
                ComprehensionExpression: "ComprehensionExpression",
                ConditionalExpression: "ConditionalExpression",
                ContinueStatement: "ContinueStatement",
                DebuggerStatement: "DebuggerStatement",
                DirectiveStatement: "DirectiveStatement",
                DoWhileStatement: "DoWhileStatement",
                EmptyStatement: "EmptyStatement",
                ExportAllDeclaration: "ExportAllDeclaration",
                ExportDefaultDeclaration: "ExportDefaultDeclaration",
                ExportNamedDeclaration: "ExportNamedDeclaration",
                ExportSpecifier: "ExportSpecifier",
                ExpressionStatement: "ExpressionStatement",
                ForStatement: "ForStatement",
                ForInStatement: "ForInStatement",
                ForOfStatement: "ForOfStatement",
                FunctionDeclaration: "FunctionDeclaration",
                FunctionExpression: "FunctionExpression",
                GeneratorExpression: "GeneratorExpression",
                Identifier: "Identifier",
                IfStatement: "IfStatement",
                ImportExpression: "ImportExpression",
                ImportDeclaration: "ImportDeclaration",
                ImportDefaultSpecifier: "ImportDefaultSpecifier",
                ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
                ImportSpecifier: "ImportSpecifier",
                Literal: "Literal",
                LabeledStatement: "LabeledStatement",
                LogicalExpression: "LogicalExpression",
                MemberExpression: "MemberExpression",
                MetaProperty: "MetaProperty",
                MethodDefinition: "MethodDefinition",
                ModuleSpecifier: "ModuleSpecifier",
                NewExpression: "NewExpression",
                ObjectExpression: "ObjectExpression",
                ObjectPattern: "ObjectPattern",
                Program: "Program",
                Property: "Property",
                RestElement: "RestElement",
                ReturnStatement: "ReturnStatement",
                SequenceExpression: "SequenceExpression",
                SpreadElement: "SpreadElement",
                Super: "Super",
                SwitchStatement: "SwitchStatement",
                SwitchCase: "SwitchCase",
                TaggedTemplateExpression: "TaggedTemplateExpression",
                TemplateElement: "TemplateElement",
                TemplateLiteral: "TemplateLiteral",
                ThisExpression: "ThisExpression",
                ThrowStatement: "ThrowStatement",
                TryStatement: "TryStatement",
                UnaryExpression: "UnaryExpression",
                UpdateExpression: "UpdateExpression",
                VariableDeclaration: "VariableDeclaration",
                VariableDeclarator: "VariableDeclarator",
                WhileStatement: "WhileStatement",
                WithStatement: "WithStatement",
                YieldExpression: "YieldExpression"
            },
            o = {
                AssignmentExpression: ["left", "right"],
                AssignmentPattern: ["left", "right"],
                ArrayExpression: ["elements"],
                ArrayPattern: ["elements"],
                ArrowFunctionExpression: ["params", "body"],
                AwaitExpression: ["argument"],
                BlockStatement: ["body"],
                BinaryExpression: ["left", "right"],
                BreakStatement: ["label"],
                CallExpression: ["callee", "arguments"],
                CatchClause: ["param", "body"],
                ClassBody: ["body"],
                ClassDeclaration: ["id", "superClass", "body"],
                ClassExpression: ["id", "superClass", "body"],
                ComprehensionBlock: ["left", "right"],
                ComprehensionExpression: ["blocks", "filter", "body"],
                ConditionalExpression: ["test", "consequent", "alternate"],
                ContinueStatement: ["label"],
                DebuggerStatement: [],
                DirectiveStatement: [],
                DoWhileStatement: ["body", "test"],
                EmptyStatement: [],
                ExportAllDeclaration: ["source"],
                ExportDefaultDeclaration: ["declaration"],
                ExportNamedDeclaration: ["declaration", "specifiers", "source"],
                ExportSpecifier: ["exported", "local"],
                ExpressionStatement: ["expression"],
                ForStatement: ["init", "test", "update", "body"],
                ForInStatement: ["left", "right", "body"],
                ForOfStatement: ["left", "right", "body"],
                FunctionDeclaration: ["id", "params", "body"],
                FunctionExpression: ["id", "params", "body"],
                GeneratorExpression: ["blocks", "filter", "body"],
                Identifier: [],
                IfStatement: ["test", "consequent", "alternate"],
                ImportExpression: ["source"],
                ImportDeclaration: ["specifiers", "source"],
                ImportDefaultSpecifier: ["local"],
                ImportNamespaceSpecifier: ["local"],
                ImportSpecifier: ["imported", "local"],
                Literal: [],
                LabeledStatement: ["label", "body"],
                LogicalExpression: ["left", "right"],
                MemberExpression: ["object", "property"],
                MetaProperty: ["meta", "property"],
                MethodDefinition: ["key", "value"],
                ModuleSpecifier: [],
                NewExpression: ["callee", "arguments"],
                ObjectExpression: ["properties"],
                ObjectPattern: ["properties"],
                Program: ["body"],
                Property: ["key", "value"],
                RestElement: ["argument"],
                ReturnStatement: ["argument"],
                SequenceExpression: ["expressions"],
                SpreadElement: ["argument"],
                Super: [],
                SwitchStatement: ["discriminant", "cases"],
                SwitchCase: ["test", "consequent"],
                TaggedTemplateExpression: ["tag", "quasi"],
                TemplateElement: [],
                TemplateLiteral: ["quasis", "expressions"],
                ThisExpression: [],
                ThrowStatement: ["argument"],
                TryStatement: ["block", "handler", "finalizer"],
                UnaryExpression: ["argument"],
                UpdateExpression: ["argument"],
                VariableDeclaration: ["declarations"],
                VariableDeclarator: ["id", "init"],
                WhileStatement: ["test", "body"],
                WithStatement: ["object", "body"],
                YieldExpression: ["argument"]
            },
            n = {
                Break: s = {},
                Skip: a = {},
                Remove: l = {}
            },
            c.prototype.replace = function(e) {
                this.parent[this.key] = e
            }
            ,
            c.prototype.remove = function() {
                return Array.isArray(this.parent) ? (this.parent.splice(this.key, 1),
                !0) : (this.replace(null),
                !1)
            }
            ,
            p.prototype.path = function() {
                var e, t, i, r, n;
                function o(e, t) {
                    if (Array.isArray(t))
                        for (i = 0,
                        r = t.length; i < r; ++i)
                            e.push(t[i]);
                    else
                        e.push(t)
                }
                if (!this.__current.path)
                    return null;
                for (n = [],
                e = 2,
                t = this.__leavelist.length; e < t; ++e)
                    o(n, this.__leavelist[e].path);
                return o(n, this.__current.path),
                n
            }
            ,
            p.prototype.type = function() {
                return this.current().type || this.__current.wrap
            }
            ,
            p.prototype.parents = function() {
                var e, t, i;
                for (i = [],
                e = 1,
                t = this.__leavelist.length; e < t; ++e)
                    i.push(this.__leavelist[e].node);
                return i
            }
            ,
            p.prototype.current = function() {
                return this.__current.node
            }
            ,
            p.prototype.__execute = function(e, t) {
                var i, r;
                return r = void 0,
                i = this.__current,
                this.__current = t,
                this.__state = null,
                e && (r = e.call(this, t.node, this.__leavelist[this.__leavelist.length - 1].node)),
                this.__current = i,
                r
            }
            ,
            p.prototype.notify = function(e) {
                this.__state = e
            }
            ,
            p.prototype.skip = function() {
                this.notify(a)
            }
            ,
            p.prototype.break = function() {
                this.notify(s)
            }
            ,
            p.prototype.remove = function() {
                this.notify(l)
            }
            ,
            p.prototype.__initialize = function(e, t) {
                this.visitor = t,
                this.root = e,
                this.__worklist = [],
                this.__leavelist = [],
                this.__current = null,
                this.__state = null,
                this.__fallback = null,
                "iteration" === t.fallback ? this.__fallback = Object.keys : "function" == typeof t.fallback && (this.__fallback = t.fallback),
                this.__keys = o,
                t.keys && (this.__keys = Object.assign(Object.create(this.__keys), t.keys))
            }
            ,
            p.prototype.traverse = function(e, t) {
                var i, r, n, o, l, u, c, p, m, g, v, y;
                for (this.__initialize(e, t),
                y = {},
                i = this.__worklist,
                r = this.__leavelist,
                i.push(new h(e,null,null,null)),
                r.push(new h(null,null,null,null)); i.length; )
                    if ((n = i.pop()) !== y) {
                        if (n.node) {
                            if (u = this.__execute(t.enter, n),
                            this.__state === s || u === s)
                                return;
                            if (i.push(y),
                            r.push(n),
                            this.__state === a || u === a)
                                continue;
                            if (l = (o = n.node).type || n.wrap,
                            !(g = this.__keys[l])) {
                                if (!this.__fallback)
                                    throw new Error("Unknown node type " + l + ".");
                                g = this.__fallback(o)
                            }
                            for (p = g.length; (p -= 1) >= 0; )
                                if (v = o[c = g[p]])
                                    if (Array.isArray(v)) {
                                        for (m = v.length; (m -= 1) >= 0; )
                                            if (v[m]) {
                                                if (f(l, g[p]))
                                                    n = new h(v[m],[c, m],"Property",null);
                                                else {
                                                    if (!d(v[m]))
                                                        continue;
                                                    n = new h(v[m],[c, m],null,null)
                                                }
                                                i.push(n)
                                            }
                                    } else
                                        d(v) && i.push(new h(v,c,null,null))
                        }
                    } else if (n = r.pop(),
                    u = this.__execute(t.leave, n),
                    this.__state === s || u === s)
                        return
            }
            ,
            p.prototype.replace = function(e, t) {
                var i, r, n, o, u, p, m, g, v, y, b, _, x;
                function E(e) {
                    var t, r, n, o;
                    if (e.ref.remove())
                        for (r = e.ref.key,
                        o = e.ref.parent,
                        t = i.length; t--; )
                            if ((n = i[t]).ref && n.ref.parent === o) {
                                if (n.ref.key < r)
                                    break;
                                --n.ref.key
                            }
                }
                for (this.__initialize(e, t),
                b = {},
                i = this.__worklist,
                r = this.__leavelist,
                p = new h(e,null,null,new c(_ = {
                    root: e
                },"root")),
                i.push(p),
                r.push(p); i.length; )
                    if ((p = i.pop()) !== b) {
                        if (void 0 !== (u = this.__execute(t.enter, p)) && u !== s && u !== a && u !== l && (p.ref.replace(u),
                        p.node = u),
                        this.__state !== l && u !== l || (E(p),
                        p.node = null),
                        this.__state === s || u === s)
                            return _.root;
                        if ((n = p.node) && (i.push(b),
                        r.push(p),
                        this.__state !== a && u !== a)) {
                            if (o = n.type || p.wrap,
                            !(v = this.__keys[o])) {
                                if (!this.__fallback)
                                    throw new Error("Unknown node type " + o + ".");
                                v = this.__fallback(n)
                            }
                            for (m = v.length; (m -= 1) >= 0; )
                                if (y = n[x = v[m]])
                                    if (Array.isArray(y)) {
                                        for (g = y.length; (g -= 1) >= 0; )
                                            if (y[g]) {
                                                if (f(o, v[m]))
                                                    p = new h(y[g],[x, g],"Property",new c(y,g));
                                                else {
                                                    if (!d(y[g]))
                                                        continue;
                                                    p = new h(y[g],[x, g],null,new c(y,g))
                                                }
                                                i.push(p)
                                            }
                                    } else
                                        d(y) && i.push(new h(y,x,null,new c(n,x)))
                        }
                    } else if (p = r.pop(),
                    void 0 !== (u = this.__execute(t.leave, p)) && u !== s && u !== a && u !== l && p.ref.replace(u),
                    this.__state !== l && u !== l || E(p),
                    this.__state === s || u === s)
                        return _.root;
                return _.root
            }
            ,
            t.version = i(/*! ./package.json */
            "./node_modules/estraverse/package.json").version,
            t.Syntax = r,
            t.traverse = m,
            t.replace = function(e, t) {
                return (new p).replace(e, t)
            }
            ,
            t.attachComments = function(e, t, i) {
                var r, o, s, a, l = [];
                if (!e.range)
                    throw new Error("attachComments needs range information");
                if (!i.length) {
                    if (t.length) {
                        for (s = 0,
                        o = t.length; s < o; s += 1)
                            (r = u(t[s])).extendedRange = [0, e.range[0]],
                            l.push(r);
                        e.leadingComments = l
                    }
                    return e
                }
                for (s = 0,
                o = t.length; s < o; s += 1)
                    l.push(g(u(t[s]), i));
                return a = 0,
                m(e, {
                    enter: function(e) {
                        for (var t; a < l.length && !((t = l[a]).extendedRange[1] > e.range[0]); )
                            t.extendedRange[1] === e.range[0] ? (e.leadingComments || (e.leadingComments = []),
                            e.leadingComments.push(t),
                            l.splice(a, 1)) : a += 1;
                        return a === l.length ? n.Break : l[a].extendedRange[0] > e.range[1] ? n.Skip : void 0
                    }
                }),
                a = 0,
                m(e, {
                    leave: function(e) {
                        for (var t; a < l.length && (t = l[a],
                        !(e.range[1] < t.extendedRange[0])); )
                            e.range[1] === t.extendedRange[0] ? (e.trailingComments || (e.trailingComments = []),
                            e.trailingComments.push(t),
                            l.splice(a, 1)) : a += 1;
                        return a === l.length ? n.Break : l[a].extendedRange[0] > e.range[1] ? n.Skip : void 0
                    }
                }),
                e
            }
            ,
            t.VisitorKeys = o,
            t.VisitorOption = n,
            t.Controller = p,
            t.cloneEnvironment = function() {
                return e({})
            }
            ,
            t
        }(t)
    },
    "./node_modules/estraverse/package.json": /*!**********************************************!*\
  !*** ./node_modules/estraverse/package.json ***!
  \**********************************************/
    /*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, bugs, bundleDependencies, deprecated, description, devDependencies, engines, homepage, license, main, maintainers, name, repository, scripts, version, default */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e) {
        e.exports = JSON.parse('{"_from":"estraverse@^4.1.1","_id":"estraverse@4.3.0","_inBundle":false,"_integrity":"sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==","_location":"/estraverse","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"estraverse@^4.1.1","name":"estraverse","escapedName":"estraverse","rawSpec":"^4.1.1","saveSpec":null,"fetchSpec":"^4.1.1"},"_requiredBy":["/eslint-scope","/esquery","/esrecurse"],"_resolved":"https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz","_shasum":"398ad3f3c5a24948be7725e83d11a7de28cdbd1d","_spec":"estraverse@^4.1.1","_where":"D:\\\\SourceCodes\\\\THING.EVAL\\\\node_modules\\\\eslint-scope","bugs":{"url":"https://github.com/estools/estraverse/issues"},"bundleDependencies":false,"deprecated":false,"description":"ECMAScript JS AST traversal functions","devDependencies":{"babel-preset-env":"^1.6.1","babel-register":"^6.3.13","chai":"^2.1.1","espree":"^1.11.0","gulp":"^3.8.10","gulp-bump":"^0.2.2","gulp-filter":"^2.0.0","gulp-git":"^1.0.1","gulp-tag-version":"^1.3.0","jshint":"^2.5.6","mocha":"^2.1.0"},"engines":{"node":">=4.0"},"homepage":"https://github.com/estools/estraverse","license":"BSD-2-Clause","main":"estraverse.js","maintainers":[{"name":"Yusuke Suzuki","email":"utatane.tea@gmail.com","url":"http://github.com/Constellation"}],"name":"estraverse","repository":{"type":"git","url":"git+ssh://git@github.com/estools/estraverse.git"},"scripts":{"lint":"jshint estraverse.js","test":"npm run-script lint && npm run-script unit-test","unit-test":"mocha --compilers js:babel-register"},"version":"4.3.0"}')
    },
    "./node_modules/esutils/lib/ast.js": /*!*****************************************!*\
  !*** ./node_modules/esutils/lib/ast.js ***!
  \*****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        !function() {
            "use strict";
            function t(e) {
                if (null == e)
                    return !1;
                switch (e.type) {
                case "BlockStatement":
                case "BreakStatement":
                case "ContinueStatement":
                case "DebuggerStatement":
                case "DoWhileStatement":
                case "EmptyStatement":
                case "ExpressionStatement":
                case "ForInStatement":
                case "ForStatement":
                case "IfStatement":
                case "LabeledStatement":
                case "ReturnStatement":
                case "SwitchStatement":
                case "ThrowStatement":
                case "TryStatement":
                case "VariableDeclaration":
                case "WhileStatement":
                case "WithStatement":
                    return !0
                }
                return !1
            }
            function i(e) {
                switch (e.type) {
                case "IfStatement":
                    return null != e.alternate ? e.alternate : e.consequent;
                case "LabeledStatement":
                case "ForStatement":
                case "ForInStatement":
                case "WhileStatement":
                case "WithStatement":
                    return e.body
                }
                return null
            }
            e.exports = {
                isExpression: function(e) {
                    if (null == e)
                        return !1;
                    switch (e.type) {
                    case "ArrayExpression":
                    case "AssignmentExpression":
                    case "BinaryExpression":
                    case "CallExpression":
                    case "ConditionalExpression":
                    case "FunctionExpression":
                    case "Identifier":
                    case "Literal":
                    case "LogicalExpression":
                    case "MemberExpression":
                    case "NewExpression":
                    case "ObjectExpression":
                    case "SequenceExpression":
                    case "ThisExpression":
                    case "UnaryExpression":
                    case "UpdateExpression":
                        return !0
                    }
                    return !1
                },
                isStatement: t,
                isIterationStatement: function(e) {
                    if (null == e)
                        return !1;
                    switch (e.type) {
                    case "DoWhileStatement":
                    case "ForInStatement":
                    case "ForStatement":
                    case "WhileStatement":
                        return !0
                    }
                    return !1
                },
                isSourceElement: function(e) {
                    return t(e) || null != e && "FunctionDeclaration" === e.type
                },
                isProblematicIfStatement: function(e) {
                    var t;
                    if ("IfStatement" !== e.type)
                        return !1;
                    if (null == e.alternate)
                        return !1;
                    t = e.consequent;
                    do {
                        if ("IfStatement" === t.type && null == t.alternate)
                            return !0;
                        t = i(t)
                    } while (t);
                    return !1
                },
                trailingStatement: i
            }
        }()
    },
    "./node_modules/esutils/lib/code.js": /*!******************************************!*\
  !*** ./node_modules/esutils/lib/code.js ***!
  \******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        !function() {
            "use strict";
            var t, i, r, n, o, s;
            function a(e) {
                return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(Math.floor((e - 65536) / 1024) + 55296) + String.fromCharCode((e - 65536) % 1024 + 56320)
            }
            for (i = {
                NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
                NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
            },
            t = {
                NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
                NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
            },
            r = [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279],
            n = new Array(128),
            s = 0; s < 128; ++s)
                n[s] = s >= 97 && s <= 122 || s >= 65 && s <= 90 || 36 === s || 95 === s;
            for (o = new Array(128),
            s = 0; s < 128; ++s)
                o[s] = s >= 97 && s <= 122 || s >= 65 && s <= 90 || s >= 48 && s <= 57 || 36 === s || 95 === s;
            e.exports = {
                isDecimalDigit: function(e) {
                    return 48 <= e && e <= 57
                },
                isHexDigit: function(e) {
                    return 48 <= e && e <= 57 || 97 <= e && e <= 102 || 65 <= e && e <= 70
                },
                isOctalDigit: function(e) {
                    return e >= 48 && e <= 55
                },
                isWhiteSpace: function(e) {
                    return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || e >= 5760 && r.indexOf(e) >= 0
                },
                isLineTerminator: function(e) {
                    return 10 === e || 13 === e || 8232 === e || 8233 === e
                },
                isIdentifierStartES5: function(e) {
                    return e < 128 ? n[e] : i.NonAsciiIdentifierStart.test(a(e))
                },
                isIdentifierPartES5: function(e) {
                    return e < 128 ? o[e] : i.NonAsciiIdentifierPart.test(a(e))
                },
                isIdentifierStartES6: function(e) {
                    return e < 128 ? n[e] : t.NonAsciiIdentifierStart.test(a(e))
                },
                isIdentifierPartES6: function(e) {
                    return e < 128 ? o[e] : t.NonAsciiIdentifierPart.test(a(e))
                }
            }
        }()
    },
    "./node_modules/esutils/lib/keyword.js": /*!*********************************************!*\
  !*** ./node_modules/esutils/lib/keyword.js ***!
  \*********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        !function() {
            "use strict";
            var t = i(/*! ./code */
            "./node_modules/esutils/lib/code.js");
            function r(e, t) {
                return !(!t && "yield" === e) && n(e, t)
            }
            function n(e, t) {
                if (t && function(e) {
                    switch (e) {
                    case "implements":
                    case "interface":
                    case "package":
                    case "private":
                    case "protected":
                    case "public":
                    case "static":
                    case "let":
                        return !0;
                    default:
                        return !1
                    }
                }(e))
                    return !0;
                switch (e.length) {
                case 2:
                    return "if" === e || "in" === e || "do" === e;
                case 3:
                    return "var" === e || "for" === e || "new" === e || "try" === e;
                case 4:
                    return "this" === e || "else" === e || "case" === e || "void" === e || "with" === e || "enum" === e;
                case 5:
                    return "while" === e || "break" === e || "catch" === e || "throw" === e || "const" === e || "yield" === e || "class" === e || "super" === e;
                case 6:
                    return "return" === e || "typeof" === e || "delete" === e || "switch" === e || "export" === e || "import" === e;
                case 7:
                    return "default" === e || "finally" === e || "extends" === e;
                case 8:
                    return "function" === e || "continue" === e || "debugger" === e;
                case 10:
                    return "instanceof" === e;
                default:
                    return !1
                }
            }
            function o(e, t) {
                return "null" === e || "true" === e || "false" === e || r(e, t)
            }
            function s(e, t) {
                return "null" === e || "true" === e || "false" === e || n(e, t)
            }
            function a(e) {
                var i, r, n;
                if (0 === e.length)
                    return !1;
                if (n = e.charCodeAt(0),
                !t.isIdentifierStartES5(n))
                    return !1;
                for (i = 1,
                r = e.length; i < r; ++i)
                    if (n = e.charCodeAt(i),
                    !t.isIdentifierPartES5(n))
                        return !1;
                return !0
            }
            function l(e) {
                var i, r, n, o, s;
                if (0 === e.length)
                    return !1;
                for (s = t.isIdentifierStartES6,
                i = 0,
                r = e.length; i < r; ++i) {
                    if (55296 <= (n = e.charCodeAt(i)) && n <= 56319) {
                        if (++i >= r)
                            return !1;
                        if (!(56320 <= (o = e.charCodeAt(i)) && o <= 57343))
                            return !1;
                        n = 1024 * (n - 55296) + (o - 56320) + 65536
                    }
                    if (!s(n))
                        return !1;
                    s = t.isIdentifierPartES6
                }
                return !0
            }
            e.exports = {
                isKeywordES5: r,
                isKeywordES6: n,
                isReservedWordES5: o,
                isReservedWordES6: s,
                isRestrictedWord: function(e) {
                    return "eval" === e || "arguments" === e
                },
                isIdentifierNameES5: a,
                isIdentifierNameES6: l,
                isIdentifierES5: function(e, t) {
                    return a(e) && !o(e, t)
                },
                isIdentifierES6: function(e, t) {
                    return l(e) && !s(e, t)
                }
            }
        }()
    },
    "./node_modules/esutils/lib/utils.js": /*!*******************************************!*\
  !*** ./node_modules/esutils/lib/utils.js ***!
  \*******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        !function() {
            "use strict";
            t.ast = i(/*! ./ast */
            "./node_modules/esutils/lib/ast.js"),
            t.code = i(/*! ./code */
            "./node_modules/esutils/lib/code.js"),
            t.keyword = i(/*! ./keyword */
            "./node_modules/esutils/lib/keyword.js")
        }()
    },
    "./node_modules/source-map/lib/array-set.js": /*!**************************************************!*\
  !*** ./node_modules/source-map/lib/array-set.js ***!
  \**************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! ./util */
        "./node_modules/source-map/lib/util.js")
          , n = Object.prototype.hasOwnProperty
          , o = "undefined" != typeof Map;
        function s() {
            this._array = [],
            this._set = o ? new Map : Object.create(null)
        }
        s.fromArray = function(e, t) {
            for (var i = new s, r = 0, n = e.length; r < n; r++)
                i.add(e[r], t);
            return i
        }
        ,
        s.prototype.size = function() {
            return o ? this._set.size : Object.getOwnPropertyNames(this._set).length
        }
        ,
        s.prototype.add = function(e, t) {
            var i = o ? e : r.toSetString(e)
              , s = o ? this.has(e) : n.call(this._set, i)
              , a = this._array.length;
            s && !t || this._array.push(e),
            s || (o ? this._set.set(e, a) : this._set[i] = a)
        }
        ,
        s.prototype.has = function(e) {
            if (o)
                return this._set.has(e);
            var t = r.toSetString(e);
            return n.call(this._set, t)
        }
        ,
        s.prototype.indexOf = function(e) {
            if (o) {
                var t = this._set.get(e);
                if (t >= 0)
                    return t
            } else {
                var i = r.toSetString(e);
                if (n.call(this._set, i))
                    return this._set[i]
            }
            throw new Error('"' + e + '" is not in the set.')
        }
        ,
        s.prototype.at = function(e) {
            if (e >= 0 && e < this._array.length)
                return this._array[e];
            throw new Error("No element indexed by " + e)
        }
        ,
        s.prototype.toArray = function() {
            return this._array.slice()
        }
        ,
        t.ArraySet = s
    },
    "./node_modules/source-map/lib/base64-vlq.js": /*!***************************************************!*\
  !*** ./node_modules/source-map/lib/base64-vlq.js ***!
  \***************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! ./base64 */
        "./node_modules/source-map/lib/base64.js");
        t.encode = function(e) {
            var t, i = "", n = function(e) {
                return e < 0 ? 1 + (-e << 1) : 0 + (e << 1)
            }(e);
            do {
                t = 31 & n,
                (n >>>= 5) > 0 && (t |= 32),
                i += r.encode(t)
            } while (n > 0);
            return i
        }
        ,
        t.decode = function(e, t, i) {
            var n, o, s, a, l = e.length, u = 0, c = 0;
            do {
                if (t >= l)
                    throw new Error("Expected more digits in base 64 VLQ value.");
                if (-1 === (o = r.decode(e.charCodeAt(t++))))
                    throw new Error("Invalid base64 digit: " + e.charAt(t - 1));
                n = !!(32 & o),
                u += (o &= 31) << c,
                c += 5
            } while (n);
            i.value = (a = (s = u) >> 1,
            1 == (1 & s) ? -a : a),
            i.rest = t
        }
    },
    "./node_modules/source-map/lib/base64.js": /*!***********************************************!*\
  !*** ./node_modules/source-map/lib/base64.js ***!
  \***********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        t.encode = function(e) {
            if (0 <= e && e < i.length)
                return i[e];
            throw new TypeError("Must be between 0 and 63: " + e)
        }
        ,
        t.decode = function(e) {
            return 65 <= e && e <= 90 ? e - 65 : 97 <= e && e <= 122 ? e - 97 + 26 : 48 <= e && e <= 57 ? e - 48 + 52 : 43 == e ? 62 : 47 == e ? 63 : -1
        }
    },
    "./node_modules/source-map/lib/binary-search.js": /*!******************************************************!*\
  !*** ./node_modules/source-map/lib/binary-search.js ***!
  \******************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        t.GREATEST_LOWER_BOUND = 1,
        t.LEAST_UPPER_BOUND = 2,
        t.search = function(e, i, r, n) {
            if (0 === i.length)
                return -1;
            var o = function e(i, r, n, o, s, a) {
                var l = Math.floor((r - i) / 2) + i
                  , u = s(n, o[l], !0);
                return 0 === u ? l : u > 0 ? r - l > 1 ? e(l, r, n, o, s, a) : a == t.LEAST_UPPER_BOUND ? r < o.length ? r : -1 : l : l - i > 1 ? e(i, l, n, o, s, a) : a == t.LEAST_UPPER_BOUND ? l : i < 0 ? -1 : i
            }(-1, i.length, e, i, r, n || t.GREATEST_LOWER_BOUND);
            if (o < 0)
                return -1;
            for (; o - 1 >= 0 && 0 === r(i[o], i[o - 1], !0); )
                --o;
            return o
        }
    },
    "./node_modules/source-map/lib/mapping-list.js": /*!*****************************************************!*\
  !*** ./node_modules/source-map/lib/mapping-list.js ***!
  \*****************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! ./util */
        "./node_modules/source-map/lib/util.js");
        function n() {
            this._array = [],
            this._sorted = !0,
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            }
        }
        n.prototype.unsortedForEach = function(e, t) {
            this._array.forEach(e, t)
        }
        ,
        n.prototype.add = function(e) {
            var t, i, n, o, s, a;
            i = e,
            n = (t = this._last).generatedLine,
            o = i.generatedLine,
            s = t.generatedColumn,
            a = i.generatedColumn,
            o > n || o == n && a >= s || r.compareByGeneratedPositionsInflated(t, i) <= 0 ? (this._last = e,
            this._array.push(e)) : (this._sorted = !1,
            this._array.push(e))
        }
        ,
        n.prototype.toArray = function() {
            return this._sorted || (this._array.sort(r.compareByGeneratedPositionsInflated),
            this._sorted = !0),
            this._array
        }
        ,
        t.MappingList = n
    },
    "./node_modules/source-map/lib/quick-sort.js": /*!***************************************************!*\
  !*** ./node_modules/source-map/lib/quick-sort.js ***!
  \***************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        function i(e, t, i) {
            var r = e[t];
            e[t] = e[i],
            e[i] = r
        }
        t.quickSort = function(e, t) {
            !function e(t, r, n, o) {
                if (n < o) {
                    var s = n - 1;
                    i(t, (c = n,
                    h = o,
                    Math.round(c + Math.random() * (h - c))), o);
                    for (var a = t[o], l = n; l < o; l++)
                        r(t[l], a) <= 0 && i(t, s += 1, l);
                    i(t, s + 1, l);
                    var u = s + 1;
                    e(t, r, n, u - 1),
                    e(t, r, u + 1, o)
                }
                var c, h
            }(e, t, 0, e.length - 1)
        }
    },
    "./node_modules/source-map/lib/source-map-consumer.js": /*!************************************************************!*\
  !*** ./node_modules/source-map/lib/source-map-consumer.js ***!
  \************************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! ./util */
        "./node_modules/source-map/lib/util.js")
          , n = i(/*! ./binary-search */
        "./node_modules/source-map/lib/binary-search.js")
          , o = i(/*! ./array-set */
        "./node_modules/source-map/lib/array-set.js").ArraySet
          , s = i(/*! ./base64-vlq */
        "./node_modules/source-map/lib/base64-vlq.js")
          , a = i(/*! ./quick-sort */
        "./node_modules/source-map/lib/quick-sort.js").quickSort;
        function l(e, t) {
            var i = e;
            return "string" == typeof e && (i = r.parseSourceMapInput(e)),
            null != i.sections ? new h(i,t) : new u(i,t)
        }
        function u(e, t) {
            var i = e;
            "string" == typeof e && (i = r.parseSourceMapInput(e));
            var n = r.getArg(i, "version")
              , s = r.getArg(i, "sources")
              , a = r.getArg(i, "names", [])
              , l = r.getArg(i, "sourceRoot", null)
              , u = r.getArg(i, "sourcesContent", null)
              , c = r.getArg(i, "mappings")
              , h = r.getArg(i, "file", null);
            if (n != this._version)
                throw new Error("Unsupported version: " + n);
            l && (l = r.normalize(l)),
            s = s.map(String).map(r.normalize).map((function(e) {
                return l && r.isAbsolute(l) && r.isAbsolute(e) ? r.relative(l, e) : e
            }
            )),
            this._names = o.fromArray(a.map(String), !0),
            this._sources = o.fromArray(s, !0),
            this._absoluteSources = this._sources.toArray().map((function(e) {
                return r.computeSourceURL(l, e, t)
            }
            )),
            this.sourceRoot = l,
            this.sourcesContent = u,
            this._mappings = c,
            this._sourceMapURL = t,
            this.file = h
        }
        function c() {
            this.generatedLine = 0,
            this.generatedColumn = 0,
            this.source = null,
            this.originalLine = null,
            this.originalColumn = null,
            this.name = null
        }
        function h(e, t) {
            var i = e;
            "string" == typeof e && (i = r.parseSourceMapInput(e));
            var n = r.getArg(i, "version")
              , s = r.getArg(i, "sections");
            if (n != this._version)
                throw new Error("Unsupported version: " + n);
            this._sources = new o,
            this._names = new o;
            var a = {
                line: -1,
                column: 0
            };
            this._sections = s.map((function(e) {
                if (e.url)
                    throw new Error("Support for url field in sections not implemented.");
                var i = r.getArg(e, "offset")
                  , n = r.getArg(i, "line")
                  , o = r.getArg(i, "column");
                if (n < a.line || n === a.line && o < a.column)
                    throw new Error("Section offsets must be ordered and non-overlapping.");
                return a = i,
                {
                    generatedOffset: {
                        generatedLine: n + 1,
                        generatedColumn: o + 1
                    },
                    consumer: new l(r.getArg(e, "map"),t)
                }
            }
            ))
        }
        l.fromSourceMap = function(e, t) {
            return u.fromSourceMap(e, t)
        }
        ,
        l.prototype._version = 3,
        l.prototype.__generatedMappings = null,
        Object.defineProperty(l.prototype, "_generatedMappings", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot),
                this.__generatedMappings
            }
        }),
        l.prototype.__originalMappings = null,
        Object.defineProperty(l.prototype, "_originalMappings", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot),
                this.__originalMappings
            }
        }),
        l.prototype._charIsMappingSeparator = function(e, t) {
            var i = e.charAt(t);
            return ";" === i || "," === i
        }
        ,
        l.prototype._parseMappings = function(e, t) {
            throw new Error("Subclasses must implement _parseMappings")
        }
        ,
        l.GENERATED_ORDER = 1,
        l.ORIGINAL_ORDER = 2,
        l.GREATEST_LOWER_BOUND = 1,
        l.LEAST_UPPER_BOUND = 2,
        l.prototype.eachMapping = function(e, t, i) {
            var n, o = t || null;
            switch (i || l.GENERATED_ORDER) {
            case l.GENERATED_ORDER:
                n = this._generatedMappings;
                break;
            case l.ORIGINAL_ORDER:
                n = this._originalMappings;
                break;
            default:
                throw new Error("Unknown order of iteration.")
            }
            var s = this.sourceRoot;
            n.map((function(e) {
                var t = null === e.source ? null : this._sources.at(e.source);
                return {
                    source: t = r.computeSourceURL(s, t, this._sourceMapURL),
                    generatedLine: e.generatedLine,
                    generatedColumn: e.generatedColumn,
                    originalLine: e.originalLine,
                    originalColumn: e.originalColumn,
                    name: null === e.name ? null : this._names.at(e.name)
                }
            }
            ), this).forEach(e, o)
        }
        ,
        l.prototype.allGeneratedPositionsFor = function(e) {
            var t = r.getArg(e, "line")
              , i = {
                source: r.getArg(e, "source"),
                originalLine: t,
                originalColumn: r.getArg(e, "column", 0)
            };
            if (i.source = this._findSourceIndex(i.source),
            i.source < 0)
                return [];
            var o = []
              , s = this._findMapping(i, this._originalMappings, "originalLine", "originalColumn", r.compareByOriginalPositions, n.LEAST_UPPER_BOUND);
            if (s >= 0) {
                var a = this._originalMappings[s];
                if (void 0 === e.column)
                    for (var l = a.originalLine; a && a.originalLine === l; )
                        o.push({
                            line: r.getArg(a, "generatedLine", null),
                            column: r.getArg(a, "generatedColumn", null),
                            lastColumn: r.getArg(a, "lastGeneratedColumn", null)
                        }),
                        a = this._originalMappings[++s];
                else
                    for (var u = a.originalColumn; a && a.originalLine === t && a.originalColumn == u; )
                        o.push({
                            line: r.getArg(a, "generatedLine", null),
                            column: r.getArg(a, "generatedColumn", null),
                            lastColumn: r.getArg(a, "lastGeneratedColumn", null)
                        }),
                        a = this._originalMappings[++s]
            }
            return o
        }
        ,
        t.SourceMapConsumer = l,
        u.prototype = Object.create(l.prototype),
        u.prototype.consumer = l,
        u.prototype._findSourceIndex = function(e) {
            var t, i = e;
            if (null != this.sourceRoot && (i = r.relative(this.sourceRoot, i)),
            this._sources.has(i))
                return this._sources.indexOf(i);
            for (t = 0; t < this._absoluteSources.length; ++t)
                if (this._absoluteSources[t] == e)
                    return t;
            return -1
        }
        ,
        u.fromSourceMap = function(e, t) {
            var i = Object.create(u.prototype)
              , n = i._names = o.fromArray(e._names.toArray(), !0)
              , s = i._sources = o.fromArray(e._sources.toArray(), !0);
            i.sourceRoot = e._sourceRoot,
            i.sourcesContent = e._generateSourcesContent(i._sources.toArray(), i.sourceRoot),
            i.file = e._file,
            i._sourceMapURL = t,
            i._absoluteSources = i._sources.toArray().map((function(e) {
                return r.computeSourceURL(i.sourceRoot, e, t)
            }
            ));
            for (var l = e._mappings.toArray().slice(), h = i.__generatedMappings = [], p = i.__originalMappings = [], d = 0, f = l.length; d < f; d++) {
                var m = l[d]
                  , g = new c;
                g.generatedLine = m.generatedLine,
                g.generatedColumn = m.generatedColumn,
                m.source && (g.source = s.indexOf(m.source),
                g.originalLine = m.originalLine,
                g.originalColumn = m.originalColumn,
                m.name && (g.name = n.indexOf(m.name)),
                p.push(g)),
                h.push(g)
            }
            return a(i.__originalMappings, r.compareByOriginalPositions),
            i
        }
        ,
        u.prototype._version = 3,
        Object.defineProperty(u.prototype, "sources", {
            get: function() {
                return this._absoluteSources.slice()
            }
        }),
        u.prototype._parseMappings = function(e, t) {
            for (var i, n, o, l, u, h = 1, p = 0, d = 0, f = 0, m = 0, g = 0, v = e.length, y = 0, b = {}, _ = {}, x = [], E = []; y < v; )
                if (";" === e.charAt(y))
                    h++,
                    y++,
                    p = 0;
                else if ("," === e.charAt(y))
                    y++;
                else {
                    for ((i = new c).generatedLine = h,
                    l = y; l < v && !this._charIsMappingSeparator(e, l); l++)
                        ;
                    if (o = b[n = e.slice(y, l)])
                        y += n.length;
                    else {
                        for (o = []; y < l; )
                            s.decode(e, y, _),
                            u = _.value,
                            y = _.rest,
                            o.push(u);
                        if (2 === o.length)
                            throw new Error("Found a source, but no line and column");
                        if (3 === o.length)
                            throw new Error("Found a source and line, but no column");
                        b[n] = o
                    }
                    i.generatedColumn = p + o[0],
                    p = i.generatedColumn,
                    o.length > 1 && (i.source = m + o[1],
                    m += o[1],
                    i.originalLine = d + o[2],
                    d = i.originalLine,
                    i.originalLine += 1,
                    i.originalColumn = f + o[3],
                    f = i.originalColumn,
                    o.length > 4 && (i.name = g + o[4],
                    g += o[4])),
                    E.push(i),
                    "number" == typeof i.originalLine && x.push(i)
                }
            a(E, r.compareByGeneratedPositionsDeflated),
            this.__generatedMappings = E,
            a(x, r.compareByOriginalPositions),
            this.__originalMappings = x
        }
        ,
        u.prototype._findMapping = function(e, t, i, r, o, s) {
            if (e[i] <= 0)
                throw new TypeError("Line must be greater than or equal to 1, got " + e[i]);
            if (e[r] < 0)
                throw new TypeError("Column must be greater than or equal to 0, got " + e[r]);
            return n.search(e, t, o, s)
        }
        ,
        u.prototype.computeColumnSpans = function() {
            for (var e = 0; e < this._generatedMappings.length; ++e) {
                var t = this._generatedMappings[e];
                if (e + 1 < this._generatedMappings.length) {
                    var i = this._generatedMappings[e + 1];
                    if (t.generatedLine === i.generatedLine) {
                        t.lastGeneratedColumn = i.generatedColumn - 1;
                        continue
                    }
                }
                t.lastGeneratedColumn = 1 / 0
            }
        }
        ,
        u.prototype.originalPositionFor = function(e) {
            var t = {
                generatedLine: r.getArg(e, "line"),
                generatedColumn: r.getArg(e, "column")
            }
              , i = this._findMapping(t, this._generatedMappings, "generatedLine", "generatedColumn", r.compareByGeneratedPositionsDeflated, r.getArg(e, "bias", l.GREATEST_LOWER_BOUND));
            if (i >= 0) {
                var n = this._generatedMappings[i];
                if (n.generatedLine === t.generatedLine) {
                    var o = r.getArg(n, "source", null);
                    null !== o && (o = this._sources.at(o),
                    o = r.computeSourceURL(this.sourceRoot, o, this._sourceMapURL));
                    var s = r.getArg(n, "name", null);
                    return null !== s && (s = this._names.at(s)),
                    {
                        source: o,
                        line: r.getArg(n, "originalLine", null),
                        column: r.getArg(n, "originalColumn", null),
                        name: s
                    }
                }
            }
            return {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        ,
        u.prototype.hasContentsOfAllSources = function() {
            return !!this.sourcesContent && this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some((function(e) {
                return null == e
            }
            ))
        }
        ,
        u.prototype.sourceContentFor = function(e, t) {
            if (!this.sourcesContent)
                return null;
            var i = this._findSourceIndex(e);
            if (i >= 0)
                return this.sourcesContent[i];
            var n, o = e;
            if (null != this.sourceRoot && (o = r.relative(this.sourceRoot, o)),
            null != this.sourceRoot && (n = r.urlParse(this.sourceRoot))) {
                var s = o.replace(/^file:\/\//, "");
                if ("file" == n.scheme && this._sources.has(s))
                    return this.sourcesContent[this._sources.indexOf(s)];
                if ((!n.path || "/" == n.path) && this._sources.has("/" + o))
                    return this.sourcesContent[this._sources.indexOf("/" + o)]
            }
            if (t)
                return null;
            throw new Error('"' + o + '" is not in the SourceMap.')
        }
        ,
        u.prototype.generatedPositionFor = function(e) {
            var t = r.getArg(e, "source");
            if ((t = this._findSourceIndex(t)) < 0)
                return {
                    line: null,
                    column: null,
                    lastColumn: null
                };
            var i = {
                source: t,
                originalLine: r.getArg(e, "line"),
                originalColumn: r.getArg(e, "column")
            }
              , n = this._findMapping(i, this._originalMappings, "originalLine", "originalColumn", r.compareByOriginalPositions, r.getArg(e, "bias", l.GREATEST_LOWER_BOUND));
            if (n >= 0) {
                var o = this._originalMappings[n];
                if (o.source === i.source)
                    return {
                        line: r.getArg(o, "generatedLine", null),
                        column: r.getArg(o, "generatedColumn", null),
                        lastColumn: r.getArg(o, "lastGeneratedColumn", null)
                    }
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
        ,
        t.BasicSourceMapConsumer = u,
        h.prototype = Object.create(l.prototype),
        h.prototype.constructor = l,
        h.prototype._version = 3,
        Object.defineProperty(h.prototype, "sources", {
            get: function() {
                for (var e = [], t = 0; t < this._sections.length; t++)
                    for (var i = 0; i < this._sections[t].consumer.sources.length; i++)
                        e.push(this._sections[t].consumer.sources[i]);
                return e
            }
        }),
        h.prototype.originalPositionFor = function(e) {
            var t = {
                generatedLine: r.getArg(e, "line"),
                generatedColumn: r.getArg(e, "column")
            }
              , i = n.search(t, this._sections, (function(e, t) {
                return e.generatedLine - t.generatedOffset.generatedLine || e.generatedColumn - t.generatedOffset.generatedColumn
            }
            ))
              , o = this._sections[i];
            return o ? o.consumer.originalPositionFor({
                line: t.generatedLine - (o.generatedOffset.generatedLine - 1),
                column: t.generatedColumn - (o.generatedOffset.generatedLine === t.generatedLine ? o.generatedOffset.generatedColumn - 1 : 0),
                bias: e.bias
            }) : {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        ,
        h.prototype.hasContentsOfAllSources = function() {
            return this._sections.every((function(e) {
                return e.consumer.hasContentsOfAllSources()
            }
            ))
        }
        ,
        h.prototype.sourceContentFor = function(e, t) {
            for (var i = 0; i < this._sections.length; i++) {
                var r = this._sections[i].consumer.sourceContentFor(e, !0);
                if (r)
                    return r
            }
            if (t)
                return null;
            throw new Error('"' + e + '" is not in the SourceMap.')
        }
        ,
        h.prototype.generatedPositionFor = function(e) {
            for (var t = 0; t < this._sections.length; t++) {
                var i = this._sections[t];
                if (-1 !== i.consumer._findSourceIndex(r.getArg(e, "source"))) {
                    var n = i.consumer.generatedPositionFor(e);
                    if (n)
                        return {
                            line: n.line + (i.generatedOffset.generatedLine - 1),
                            column: n.column + (i.generatedOffset.generatedLine === n.line ? i.generatedOffset.generatedColumn - 1 : 0)
                        }
                }
            }
            return {
                line: null,
                column: null
            }
        }
        ,
        h.prototype._parseMappings = function(e, t) {
            this.__generatedMappings = [],
            this.__originalMappings = [];
            for (var i = 0; i < this._sections.length; i++)
                for (var n = this._sections[i], o = n.consumer._generatedMappings, s = 0; s < o.length; s++) {
                    var l = o[s]
                      , u = n.consumer._sources.at(l.source);
                    u = r.computeSourceURL(n.consumer.sourceRoot, u, this._sourceMapURL),
                    this._sources.add(u),
                    u = this._sources.indexOf(u);
                    var c = null;
                    l.name && (c = n.consumer._names.at(l.name),
                    this._names.add(c),
                    c = this._names.indexOf(c));
                    var h = {
                        source: u,
                        generatedLine: l.generatedLine + (n.generatedOffset.generatedLine - 1),
                        generatedColumn: l.generatedColumn + (n.generatedOffset.generatedLine === l.generatedLine ? n.generatedOffset.generatedColumn - 1 : 0),
                        originalLine: l.originalLine,
                        originalColumn: l.originalColumn,
                        name: c
                    };
                    this.__generatedMappings.push(h),
                    "number" == typeof h.originalLine && this.__originalMappings.push(h)
                }
            a(this.__generatedMappings, r.compareByGeneratedPositionsDeflated),
            a(this.__originalMappings, r.compareByOriginalPositions)
        }
        ,
        t.IndexedSourceMapConsumer = h
    },
    "./node_modules/source-map/lib/source-map-generator.js": /*!*************************************************************!*\
  !*** ./node_modules/source-map/lib/source-map-generator.js ***!
  \*************************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! ./base64-vlq */
        "./node_modules/source-map/lib/base64-vlq.js")
          , n = i(/*! ./util */
        "./node_modules/source-map/lib/util.js")
          , o = i(/*! ./array-set */
        "./node_modules/source-map/lib/array-set.js").ArraySet
          , s = i(/*! ./mapping-list */
        "./node_modules/source-map/lib/mapping-list.js").MappingList;
        function a(e) {
            e || (e = {}),
            this._file = n.getArg(e, "file", null),
            this._sourceRoot = n.getArg(e, "sourceRoot", null),
            this._skipValidation = n.getArg(e, "skipValidation", !1),
            this._sources = new o,
            this._names = new o,
            this._mappings = new s,
            this._sourcesContents = null
        }
        a.prototype._version = 3,
        a.fromSourceMap = function(e) {
            var t = e.sourceRoot
              , i = new a({
                file: e.file,
                sourceRoot: t
            });
            return e.eachMapping((function(e) {
                var r = {
                    generated: {
                        line: e.generatedLine,
                        column: e.generatedColumn
                    }
                };
                null != e.source && (r.source = e.source,
                null != t && (r.source = n.relative(t, r.source)),
                r.original = {
                    line: e.originalLine,
                    column: e.originalColumn
                },
                null != e.name && (r.name = e.name)),
                i.addMapping(r)
            }
            )),
            e.sources.forEach((function(r) {
                var o = r;
                null !== t && (o = n.relative(t, r)),
                i._sources.has(o) || i._sources.add(o);
                var s = e.sourceContentFor(r);
                null != s && i.setSourceContent(r, s)
            }
            )),
            i
        }
        ,
        a.prototype.addMapping = function(e) {
            var t = n.getArg(e, "generated")
              , i = n.getArg(e, "original", null)
              , r = n.getArg(e, "source", null)
              , o = n.getArg(e, "name", null);
            this._skipValidation || this._validateMapping(t, i, r, o),
            null != r && (r = String(r),
            this._sources.has(r) || this._sources.add(r)),
            null != o && (o = String(o),
            this._names.has(o) || this._names.add(o)),
            this._mappings.add({
                generatedLine: t.line,
                generatedColumn: t.column,
                originalLine: null != i && i.line,
                originalColumn: null != i && i.column,
                source: r,
                name: o
            })
        }
        ,
        a.prototype.setSourceContent = function(e, t) {
            var i = e;
            null != this._sourceRoot && (i = n.relative(this._sourceRoot, i)),
            null != t ? (this._sourcesContents || (this._sourcesContents = Object.create(null)),
            this._sourcesContents[n.toSetString(i)] = t) : this._sourcesContents && (delete this._sourcesContents[n.toSetString(i)],
            0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null))
        }
        ,
        a.prototype.applySourceMap = function(e, t, i) {
            var r = t;
            if (null == t) {
                if (null == e.file)
                    throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
                r = e.file
            }
            var s = this._sourceRoot;
            null != s && (r = n.relative(s, r));
            var a = new o
              , l = new o;
            this._mappings.unsortedForEach((function(t) {
                if (t.source === r && null != t.originalLine) {
                    var o = e.originalPositionFor({
                        line: t.originalLine,
                        column: t.originalColumn
                    });
                    null != o.source && (t.source = o.source,
                    null != i && (t.source = n.join(i, t.source)),
                    null != s && (t.source = n.relative(s, t.source)),
                    t.originalLine = o.line,
                    t.originalColumn = o.column,
                    null != o.name && (t.name = o.name))
                }
                var u = t.source;
                null == u || a.has(u) || a.add(u);
                var c = t.name;
                null == c || l.has(c) || l.add(c)
            }
            ), this),
            this._sources = a,
            this._names = l,
            e.sources.forEach((function(t) {
                var r = e.sourceContentFor(t);
                null != r && (null != i && (t = n.join(i, t)),
                null != s && (t = n.relative(s, t)),
                this.setSourceContent(t, r))
            }
            ), this)
        }
        ,
        a.prototype._validateMapping = function(e, t, i, r) {
            if (t && "number" != typeof t.line && "number" != typeof t.column)
                throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
            if ((!(e && "line"in e && "column"in e && e.line > 0 && e.column >= 0) || t || i || r) && !(e && "line"in e && "column"in e && t && "line"in t && "column"in t && e.line > 0 && e.column >= 0 && t.line > 0 && t.column >= 0 && i))
                throw new Error("Invalid mapping: " + JSON.stringify({
                    generated: e,
                    source: i,
                    original: t,
                    name: r
                }))
        }
        ,
        a.prototype._serializeMappings = function() {
            for (var e, t, i, o, s = 0, a = 1, l = 0, u = 0, c = 0, h = 0, p = "", d = this._mappings.toArray(), f = 0, m = d.length; f < m; f++) {
                if (e = "",
                (t = d[f]).generatedLine !== a)
                    for (s = 0; t.generatedLine !== a; )
                        e += ";",
                        a++;
                else if (f > 0) {
                    if (!n.compareByGeneratedPositionsInflated(t, d[f - 1]))
                        continue;
                    e += ","
                }
                e += r.encode(t.generatedColumn - s),
                s = t.generatedColumn,
                null != t.source && (o = this._sources.indexOf(t.source),
                e += r.encode(o - h),
                h = o,
                e += r.encode(t.originalLine - 1 - u),
                u = t.originalLine - 1,
                e += r.encode(t.originalColumn - l),
                l = t.originalColumn,
                null != t.name && (i = this._names.indexOf(t.name),
                e += r.encode(i - c),
                c = i)),
                p += e
            }
            return p
        }
        ,
        a.prototype._generateSourcesContent = function(e, t) {
            return e.map((function(e) {
                if (!this._sourcesContents)
                    return null;
                null != t && (e = n.relative(t, e));
                var i = n.toSetString(e);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, i) ? this._sourcesContents[i] : null
            }
            ), this)
        }
        ,
        a.prototype.toJSON = function() {
            var e = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            return null != this._file && (e.file = this._file),
            null != this._sourceRoot && (e.sourceRoot = this._sourceRoot),
            this._sourcesContents && (e.sourcesContent = this._generateSourcesContent(e.sources, e.sourceRoot)),
            e
        }
        ,
        a.prototype.toString = function() {
            return JSON.stringify(this.toJSON())
        }
        ,
        t.SourceMapGenerator = a
    },
    "./node_modules/source-map/lib/source-node.js": /*!****************************************************!*\
  !*** ./node_modules/source-map/lib/source-node.js ***!
  \****************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! ./source-map-generator */
        "./node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator
          , n = i(/*! ./util */
        "./node_modules/source-map/lib/util.js")
          , o = /(\r?\n)/
          , s = "$$$isSourceNode$$$";
        function a(e, t, i, r, n) {
            this.children = [],
            this.sourceContents = {},
            this.line = null == e ? null : e,
            this.column = null == t ? null : t,
            this.source = null == i ? null : i,
            this.name = null == n ? null : n,
            this[s] = !0,
            null != r && this.add(r)
        }
        a.fromStringWithSourceMap = function(e, t, i) {
            var r = new a
              , s = e.split(o)
              , l = 0
              , u = function() {
                return e() + (e() || "");
                function e() {
                    return l < s.length ? s[l++] : void 0
                }
            }
              , c = 1
              , h = 0
              , p = null;
            return t.eachMapping((function(e) {
                if (null !== p) {
                    if (!(c < e.generatedLine)) {
                        var t = (i = s[l] || "").substr(0, e.generatedColumn - h);
                        return s[l] = i.substr(e.generatedColumn - h),
                        h = e.generatedColumn,
                        d(p, t),
                        void (p = e)
                    }
                    d(p, u()),
                    c++,
                    h = 0
                }
                for (; c < e.generatedLine; )
                    r.add(u()),
                    c++;
                if (h < e.generatedColumn) {
                    var i = s[l] || "";
                    r.add(i.substr(0, e.generatedColumn)),
                    s[l] = i.substr(e.generatedColumn),
                    h = e.generatedColumn
                }
                p = e
            }
            ), this),
            l < s.length && (p && d(p, u()),
            r.add(s.splice(l).join(""))),
            t.sources.forEach((function(e) {
                var o = t.sourceContentFor(e);
                null != o && (null != i && (e = n.join(i, e)),
                r.setSourceContent(e, o))
            }
            )),
            r;
            function d(e, t) {
                if (null === e || void 0 === e.source)
                    r.add(t);
                else {
                    var o = i ? n.join(i, e.source) : e.source;
                    r.add(new a(e.originalLine,e.originalColumn,o,t,e.name))
                }
            }
        }
        ,
        a.prototype.add = function(e) {
            if (Array.isArray(e))
                e.forEach((function(e) {
                    this.add(e)
                }
                ), this);
            else {
                if (!e[s] && "string" != typeof e)
                    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + e);
                e && this.children.push(e)
            }
            return this
        }
        ,
        a.prototype.prepend = function(e) {
            if (Array.isArray(e))
                for (var t = e.length - 1; t >= 0; t--)
                    this.prepend(e[t]);
            else {
                if (!e[s] && "string" != typeof e)
                    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + e);
                this.children.unshift(e)
            }
            return this
        }
        ,
        a.prototype.walk = function(e) {
            for (var t, i = 0, r = this.children.length; i < r; i++)
                (t = this.children[i])[s] ? t.walk(e) : "" !== t && e(t, {
                    source: this.source,
                    line: this.line,
                    column: this.column,
                    name: this.name
                })
        }
        ,
        a.prototype.join = function(e) {
            var t, i, r = this.children.length;
            if (r > 0) {
                for (t = [],
                i = 0; i < r - 1; i++)
                    t.push(this.children[i]),
                    t.push(e);
                t.push(this.children[i]),
                this.children = t
            }
            return this
        }
        ,
        a.prototype.replaceRight = function(e, t) {
            var i = this.children[this.children.length - 1];
            return i[s] ? i.replaceRight(e, t) : "string" == typeof i ? this.children[this.children.length - 1] = i.replace(e, t) : this.children.push("".replace(e, t)),
            this
        }
        ,
        a.prototype.setSourceContent = function(e, t) {
            this.sourceContents[n.toSetString(e)] = t
        }
        ,
        a.prototype.walkSourceContents = function(e) {
            for (var t = 0, i = this.children.length; t < i; t++)
                this.children[t][s] && this.children[t].walkSourceContents(e);
            var r = Object.keys(this.sourceContents);
            for (t = 0,
            i = r.length; t < i; t++)
                e(n.fromSetString(r[t]), this.sourceContents[r[t]])
        }
        ,
        a.prototype.toString = function() {
            var e = "";
            return this.walk((function(t) {
                e += t
            }
            )),
            e
        }
        ,
        a.prototype.toStringWithSourceMap = function(e) {
            var t = {
                code: "",
                line: 1,
                column: 0
            }
              , i = new r(e)
              , n = !1
              , o = null
              , s = null
              , a = null
              , l = null;
            return this.walk((function(e, r) {
                t.code += e,
                null !== r.source && null !== r.line && null !== r.column ? (o === r.source && s === r.line && a === r.column && l === r.name || i.addMapping({
                    source: r.source,
                    original: {
                        line: r.line,
                        column: r.column
                    },
                    generated: {
                        line: t.line,
                        column: t.column
                    },
                    name: r.name
                }),
                o = r.source,
                s = r.line,
                a = r.column,
                l = r.name,
                n = !0) : n && (i.addMapping({
                    generated: {
                        line: t.line,
                        column: t.column
                    }
                }),
                o = null,
                n = !1);
                for (var u = 0, c = e.length; u < c; u++)
                    10 === e.charCodeAt(u) ? (t.line++,
                    t.column = 0,
                    u + 1 === c ? (o = null,
                    n = !1) : n && i.addMapping({
                        source: r.source,
                        original: {
                            line: r.line,
                            column: r.column
                        },
                        generated: {
                            line: t.line,
                            column: t.column
                        },
                        name: r.name
                    })) : t.column++
            }
            )),
            this.walkSourceContents((function(e, t) {
                i.setSourceContent(e, t)
            }
            )),
            {
                code: t.code,
                map: i
            }
        }
        ,
        t.SourceNode = a
    },
    "./node_modules/source-map/lib/util.js": /*!*********************************************!*\
  !*** ./node_modules/source-map/lib/util.js ***!
  \*********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        t.getArg = function(e, t, i) {
            if (t in e)
                return e[t];
            if (3 === arguments.length)
                return i;
            throw new Error('"' + t + '" is a required argument.')
        }
        ;
        var i = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/
          , r = /^data:.+\,.+$/;
        function n(e) {
            var t = e.match(i);
            return t ? {
                scheme: t[1],
                auth: t[2],
                host: t[3],
                port: t[4],
                path: t[5]
            } : null
        }
        function o(e) {
            var t = "";
            return e.scheme && (t += e.scheme + ":"),
            t += "//",
            e.auth && (t += e.auth + "@"),
            e.host && (t += e.host),
            e.port && (t += ":" + e.port),
            e.path && (t += e.path),
            t
        }
        function s(e) {
            var i = e
              , r = n(e);
            if (r) {
                if (!r.path)
                    return e;
                i = r.path
            }
            for (var s, a = t.isAbsolute(i), l = i.split(/\/+/), u = 0, c = l.length - 1; c >= 0; c--)
                "." === (s = l[c]) ? l.splice(c, 1) : ".." === s ? u++ : u > 0 && ("" === s ? (l.splice(c + 1, u),
                u = 0) : (l.splice(c, 2),
                u--));
            return "" === (i = l.join("/")) && (i = a ? "/" : "."),
            r ? (r.path = i,
            o(r)) : i
        }
        function a(e, t) {
            "" === e && (e = "."),
            "" === t && (t = ".");
            var i = n(t)
              , a = n(e);
            if (a && (e = a.path || "/"),
            i && !i.scheme)
                return a && (i.scheme = a.scheme),
                o(i);
            if (i || t.match(r))
                return t;
            if (a && !a.host && !a.path)
                return a.host = t,
                o(a);
            var l = "/" === t.charAt(0) ? t : s(e.replace(/\/+$/, "") + "/" + t);
            return a ? (a.path = l,
            o(a)) : l
        }
        t.urlParse = n,
        t.urlGenerate = o,
        t.normalize = s,
        t.join = a,
        t.isAbsolute = function(e) {
            return "/" === e.charAt(0) || i.test(e)
        }
        ,
        t.relative = function(e, t) {
            "" === e && (e = "."),
            e = e.replace(/\/$/, "");
            for (var i = 0; 0 !== t.indexOf(e + "/"); ) {
                var r = e.lastIndexOf("/");
                if (r < 0)
                    return t;
                if ((e = e.slice(0, r)).match(/^([^\/]+:\/)?\/*$/))
                    return t;
                ++i
            }
            return Array(i + 1).join("../") + t.substr(e.length + 1)
        }
        ;
        var l = !("__proto__"in Object.create(null));
        function u(e) {
            return e
        }
        function c(e) {
            if (!e)
                return !1;
            var t = e.length;
            if (t < 9)
                return !1;
            if (95 !== e.charCodeAt(t - 1) || 95 !== e.charCodeAt(t - 2) || 111 !== e.charCodeAt(t - 3) || 116 !== e.charCodeAt(t - 4) || 111 !== e.charCodeAt(t - 5) || 114 !== e.charCodeAt(t - 6) || 112 !== e.charCodeAt(t - 7) || 95 !== e.charCodeAt(t - 8) || 95 !== e.charCodeAt(t - 9))
                return !1;
            for (var i = t - 10; i >= 0; i--)
                if (36 !== e.charCodeAt(i))
                    return !1;
            return !0
        }
        function h(e, t) {
            return e === t ? 0 : null === e ? 1 : null === t ? -1 : e > t ? 1 : -1
        }
        t.toSetString = l ? u : function(e) {
            return c(e) ? "$" + e : e
        }
        ,
        t.fromSetString = l ? u : function(e) {
            return c(e) ? e.slice(1) : e
        }
        ,
        t.compareByOriginalPositions = function(e, t, i) {
            var r = h(e.source, t.source);
            return 0 !== r || 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) || i || 0 != (r = e.generatedColumn - t.generatedColumn) || 0 != (r = e.generatedLine - t.generatedLine) ? r : h(e.name, t.name)
        }
        ,
        t.compareByGeneratedPositionsDeflated = function(e, t, i) {
            var r = e.generatedLine - t.generatedLine;
            return 0 !== r || 0 != (r = e.generatedColumn - t.generatedColumn) || i || 0 !== (r = h(e.source, t.source)) || 0 != (r = e.originalLine - t.originalLine) || 0 != (r = e.originalColumn - t.originalColumn) ? r : h(e.name, t.name)
        }
        ,
        t.compareByGeneratedPositionsInflated = function(e, t) {
            var i = e.generatedLine - t.generatedLine;
            return 0 !== i || 0 != (i = e.generatedColumn - t.generatedColumn) || 0 !== (i = h(e.source, t.source)) || 0 != (i = e.originalLine - t.originalLine) || 0 != (i = e.originalColumn - t.originalColumn) ? i : h(e.name, t.name)
        }
        ,
        t.parseSourceMapInput = function(e) {
            return JSON.parse(e.replace(/^\)]}'[^\n]*\n/, ""))
        }
        ,
        t.computeSourceURL = function(e, t, i) {
            if (t = t || "",
            e && ("/" !== e[e.length - 1] && "/" !== t[0] && (e += "/"),
            t = e + t),
            i) {
                var r = n(i);
                if (!r)
                    throw new Error("sourceMapURL could not be parsed");
                if (r.path) {
                    var l = r.path.lastIndexOf("/");
                    l >= 0 && (r.path = r.path.substring(0, l + 1))
                }
                t = a(o(r), t)
            }
            return s(t)
        }
    },
    "./node_modules/source-map/source-map.js": /*!***********************************************!*\
  !*** ./node_modules/source-map/source-map.js ***!
  \***********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        t.SourceMapGenerator = i(/*! ./lib/source-map-generator */
        "./node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator,
        t.SourceMapConsumer = i(/*! ./lib/source-map-consumer */
        "./node_modules/source-map/lib/source-map-consumer.js").SourceMapConsumer,
        t.SourceNode = i(/*! ./lib/source-node */
        "./node_modules/source-map/lib/source-node.js").SourceNode
    },
    "./node_modules/webpack/buildin/global.js": /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t) {
        var i;
        i = function() {
            return this
        }();
        try {
            i = i || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (i = window)
        }
        e.exports = i
    },
    "./src/eval/index.js": /*!***************************!*\
  !*** ./src/eval/index.js ***!
  \***************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        var r = i(/*! escodegen */
        "./node_modules/escodegen/escodegen.js").generate;
        e.exports = function(e, t) {
            t || (t = {});
            var i = {}
              , n = function e(n, o) {
                if ("Literal" === n.type)
                    return n.value;
                if ("UnaryExpression" === n.type) {
                    var s = e(n.argument);
                    return "+" === n.operator ? +s : "-" === n.operator ? -s : "~" === n.operator ? ~s : "!" === n.operator ? !s : i
                }
                if ("ArrayExpression" === n.type) {
                    for (var a = [], l = 0, u = n.elements.length; l < u; l++) {
                        if ((v = e(n.elements[l])) === i)
                            return i;
                        a.push(v)
                    }
                    return a
                }
                if ("ObjectExpression" === n.type) {
                    var c = {};
                    for (l = 0; l < n.properties.length; l++) {
                        var h = null === (y = n.properties[l]).value ? y.value : e(y.value);
                        if (h === i)
                            return i;
                        c[y.key.value || y.key.name] = h
                    }
                    return c
                }
                if ("BinaryExpression" === n.type || "LogicalExpression" === n.type) {
                    if ((u = e(n.left)) === i)
                        return i;
                    var p = e(n.right);
                    if (p === i)
                        return i;
                    var d = n.operator;
                    return "==" === d ? u == p : "===" === d ? u === p : "!=" === d ? u != p : "!==" === d ? u !== p : "+" === d ? u + p : "-" === d ? u - p : "*" === d ? u * p : "/" === d ? u / p : "%" === d ? u % p : "<" === d ? u < p : "<=" === d ? u <= p : ">" === d ? u > p : ">=" === d ? u >= p : "|" === d ? u | p : "&" === d ? u & p : "^" === d ? u ^ p : "&&" === d ? u && p : "||" === d ? u || p : i
                }
                if ("Identifier" === n.type)
                    return {}.hasOwnProperty.call(t, n.name) ? t[n.name] : i;
                if ("ThisExpression" === n.type)
                    return {}.hasOwnProperty.call(t, "this") ? t.this : i;
                if ("CallExpression" === n.type) {
                    var f = e(n.callee);
                    if (f === i)
                        return i;
                    if ("function" != typeof f)
                        return i;
                    var m = n.callee.object ? e(n.callee.object) : i;
                    m === i && (m = null);
                    var g = [];
                    for (l = 0,
                    u = n.arguments.length; l < u; l++) {
                        var v;
                        if ((v = e(n.arguments[l])) === i)
                            return i;
                        g.push(v)
                    }
                    return f.apply(m, g)
                }
                var y;
                if ("MemberExpression" === n.type)
                    return (c = e(n.object)) === i || "function" == typeof c ? i : "Identifier" === n.property.type ? c[n.property.name] : (y = e(n.property)) === i ? i : c[y];
                if ("ConditionalExpression" === n.type)
                    return (s = e(n.test)) === i ? i : e(s ? n.consequent : n.alternate);
                if ("ExpressionStatement" === n.type)
                    return (s = e(n.expression)) === i ? i : s;
                if ("ReturnStatement" === n.type)
                    return e(n.argument);
                if ("FunctionExpression" === n.type) {
                    var b = n.body.body
                      , _ = {};
                    for (Object.keys(t).forEach((function(e) {
                        _[e] = t[e]
                    }
                    )),
                    l = 0; l < n.params.length; l++) {
                        var x = n.params[l];
                        if ("Identifier" != x.type)
                            return i;
                        t[x.name] = null
                    }
                    for (var l in b)
                        if (e(b[l]) === i)
                            return i;
                    t = _;
                    var E = Object.keys(t)
                      , w = E.map((function(e) {
                        return t[e]
                    }
                    ));
                    return Function(E.join(", "), "return " + r(n)).apply(null, w)
                }
                if ("TemplateLiteral" === n.type) {
                    var T = "";
                    for (l = 0; l < n.expressions.length; l++)
                        T += e(n.quasis[l]),
                        T += e(n.expressions[l]);
                    return T + e(n.quasis[l])
                }
                if ("TaggedTemplateExpression" === n.type) {
                    var M = e(n.tag)
                      , C = n.quasi
                      , S = C.quasis.map(e)
                      , j = C.expressions.map(e);
                    return M.apply(null, [S].concat(j))
                }
                return "TemplateElement" === n.type ? n.value.cooked : i
            }(e);
            return n === i ? void 0 : n
        }
    },
    "./src/main.js": /*!*********************************!*\
  !*** ./src/main.js + 1 modules ***!
  \*********************************/
    /*! no exports provided */
    /*! all exports used */
    function(e, t, i) {
        "use strict";
        i.r(t);
        var r = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, i, r) {
                return i && e(t.prototype, i),
                r && e(t, r),
                t
            }
        }()
          , n = i(/*! ./ */
        "./src/eval/index.js")
          , o = i(/*! esprima */
        "./node_modules/esprima/dist/esprima.js").parse
          , s = function() {
            function e(t) {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.expression = o(t).body[0].expression,
                this
            }
            return r(e, [{
                key: "evaluate",
                value: function(e) {
                    return e = e || {},
                    n(this.expression, e)
                }
            }]),
            e
        }();
        window.THING = window.THING || {},
        window.THING.Plugins = window.THING.Plugins || {},
        window.THING.Plugins.EVAL = {
            Eval: s
        }
    },
    0: /*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */
    function(e, t, i) {
        e.exports = i(/*! ./src/main.js */
        "./src/main.js")
    }
})