[English](./README.en.md)

<!-- codex-github-rules:bilingual-summary -->
> **中文简介**：用于本地调试的纯 ThingJS 演示
>
> **English summary**: A pure ThingJS demo for local debugging

---
## 运行
- 在powershell中运行`cd .\www.thingjs.com; serve`
- 或在cmd中运行`cd /d ".\www.thingjs.com" & serve`
- 改`sampleindex.js`的 `var name_m = 案例名词` 
    - #1.0的案例名称在www.thingjs.com\guide\examples\js
    - #2.0的案例名称在www.thingjs.com\guide\official\js
- 打开 http://localhost:3000/guide/sampleindex.html



## 来源页面
https://www.thingjs.com/guide/sampleindex.html?m=examples/js/sample_027_Iframe3D.js

## 引入
https://github1s.com/mrdoob/three.js/blob/r120/src/core/Object3D.js


## 拿各种版本的源码
在https://www.thingclub.com/thing-room?spm=a1.b33.c_nav_bar.d3
的各个项目的预览里发现
https://cdn.uino.cn/art2-fn/thingjs/thing.umd.min-v2.5.2.js

## thingjs2.0版本
```js
thing.js/dist/thing.esm.js //github开源的
    _setupMacros(param) {
        var macros = Utils$1$1.getMacros();
        macros['PRO'] = false;
        macros['VERSION'] = "2.5.3";
        macros['COMPILETIME'] = "Wed, 07 Jun 2023 07:03:23 GMT";//2023年6月7日星期三，格林尼治标准时间（GMT）上午7点03分44秒
        macros['GITCOMMITHASH'] = "c686bda1fba2e502a8b6d2c547953de86f9a9a6d";
        macros['GITBRANCH'] = "master";
        macros['DEBUG'] = Utils$1$1.parseValue(param['debugMode'], false);
        macros['VERBOSE'] = Utils$1$1.parseValue(param['verboseMode'], typeof _VERBOSE !== 'undefined' ? _VERBOSE : false);
    }
2023年11月15日 https://campus.thingjs.com/#/zh 用的 https://cdn.uino.cn/campus/cbresource/static/thingjs/thing.auth.umd.min.js 
        _setupMacros(e) {
            var t = ok.getMacros();
            t.PRO = !0,
            t.VERSION = "2.0.0-beta11",
            t.COMPILETIME = "Fri, 08 Sep 2023 03:50:08 GMT",//2023年9月8日星期五，格林尼治标准时间（GMT）凌晨3点50分08秒
            t.GITCOMMITHASH = "7640b6baa71c899dd675fda0aff74235b182ddb0",
            t.GITBRANCH = "dev",
            t.DEBUG = ok.parseValue(e.debugMode, !1),
            t.VERBOSE = ok.parseValue(e.verboseMode, "undefined" != typeof _VERBOSE && _VERBOSE)
        }
```
