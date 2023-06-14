function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.thingjs = {})
}(this, (function(ouputOBJ) {
    "use strict";
    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        )(e)
    }
    function i(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function r(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    function n(e, t, i) {
        return t && r(e.prototype, t),
        i && r(e, i),
        e
    }
    function __GLTFLoader(e) {
        THREE.Loader.call(this, e),
        this.dracoLoader = null,
        this.ddsLoader = null,
        this.options = {}
    }
    function s() {
        var e = {};
        return {
            get: function(t) {
                return e[t]
            },
            add: function(t, i) {
                e[t] = i
            },
            remove: function(t) {
                delete e[t]
            },
            removeAll: function() {
                e = {}
            }
        }
    }
    __GLTFLoader.prototype = Object.assign(Object.create(THREE.Loader.prototype), {
        constructor: __GLTFLoader,
        load: function(e, t, i, r) {
            var n, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, s = this;
            s.options = o,
            n = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : THREE.LoaderUtils.extractUrlBase(e),
            s.manager.itemStart(e);
            var a = function(t) {
                var i = !1;
                r ? i = r(t) : console.error(t),
                i || s.manager.itemError(e),
                s.manager.itemEnd(e)
            }
              , fileLoader = new THREE.FileLoader(s.manager);
            fileLoader.setPath(this.path),
            fileLoader.setResponseType("arraybuffer"),
            "use-credentials" === s.crossOrigin && fileLoader.setWithCredentials(!0),
            fileLoader.load(e, (function(i) {
                try {
                    s.parse(i, n, (function(i) {
                        t(i),
                        s.manager.itemEnd(e)
                    }
                    ), a)
                } catch (e) {
                    a(e)
                }
            }
            ), i, a)
        },
        setDRACOLoader: function(e) {
            return this.dracoLoader = e,
            this
        },
        setDDSLoader: function(e) {
            return this.ddsLoader = e,
            this
        },
        parse: function(e, t, i, callback) {
            var n, o = {};
            if ("string" == typeof e)
                n = e;
            else if (THREE.LoaderUtils.decodeText(new Uint8Array(e,0,4)) === h) {
                try {
                    o[KHR_TYPES.KHR_BINARY_GLTF] = new f(e)
                } catch (e) {
                    return void (callback && callback(e))
                }
                n = o[KHR_TYPES.KHR_BINARY_GLTF].content
            } else
                n = THREE.LoaderUtils.decodeText(new Uint8Array(e));
            var obj = JSON.parseX(n, this);
            if (obj)
                if (void 0 === obj.asset || obj.asset.version[0] < 2)
                    callback && callback(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead."));
                else {
                    if (obj.extensionsUsed)
                        for (var p = 0; p < obj.extensionsUsed.length; ++p) {
                            var d = obj.extensionsUsed[p]
                              , v = obj.extensionsRequired || [];
                            switch (d) {
                            case KHR_TYPES.KHR_LIGHTS_PUNCTUAL:
                                o[d] = new u(obj);
                                break;
                            case KHR_TYPES.KHR_MATERIALS_UNLIT:
                                o[d] = new c;
                                break;
                            case KHR_TYPES.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                                o[d] = new y;
                                break;
                            case KHR_TYPES.KHR_DRACO_MESH_COMPRESSION:
                                o[d] = new m(obj,this.dracoLoader);
                                break;
                            case KHR_TYPES.MSFT_TEXTURE_DDS:
                                o[KHR_TYPES.MSFT_TEXTURE_DDS] = new l(this.ddsLoader);
                                break;
                            case KHR_TYPES.KHR_TEXTURE_TRANSFORM:
                                o[d] = new g;
                                break;
                            case KHR_TYPES.KHR_MESH_QUANTIZATION:
                                o[d] = new b;
                                break;
                            default:
                                v.indexOf(d) >= 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + d + '".')
                            }
                        }
                    new W(obj,o,{
                        path: t || this.resourcePath || "",
                        crossOrigin: this.crossOrigin,
                        manager: this.manager,
                        staticImage: this.options.staticImage,
                        onLoadTexture: this.options.onLoadTexture,
                        useRGBAOMap: this.options.useRGBAOMap
                    }).parse(i, callback)
                }
            else
                callback && callback(new Error("THREE.GLTFLoader: Unsupported JSON data."))
        }
    });
    var KHR_TYPES = {
        KHR_BINARY_GLTF: "KHR_binary_glTF",
        KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
        KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
        KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
        KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
        KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
        KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
        MSFT_TEXTURE_DDS: "MSFT_texture_dds"
    };
    function l(e) {
        if (!e)
            throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader");
        this.name = KHR_TYPES.MSFT_TEXTURE_DDS,
        this.ddsLoader = e
    }
    function u(e) {
        this.name = KHR_TYPES.KHR_LIGHTS_PUNCTUAL;
        var t = e.extensions && e.extensions[KHR_TYPES.KHR_LIGHTS_PUNCTUAL] || {};
        this.lightDefs = t.lights || []
    }
    function c(e) {
        this.name = KHR_TYPES.KHR_MATERIALS_UNLIT
    }
    u.prototype.loadLight = function(e) {
        var t, i = this.lightDefs[e], r = new THREE.Color(16777215);
        void 0 !== i.color && r.fromArray(i.color);
        var n = void 0 !== i.range ? i.range : 0;
        switch (i.type) {
        case "directional":
            (t = new THREE.DirectionalLight(r)).target.position.set(0, 0, -1),
            t.add(t.target);
            break;
        case "point":
            (t = new THREE.PointLight(r)).distance = n;
            break;
        case "spot":
            (t = new THREE.SpotLight(r)).distance = n,
            i.spot = i.spot || {},
            i.spot.innerConeAngle = void 0 !== i.spot.innerConeAngle ? i.spot.innerConeAngle : 0,
            i.spot.outerConeAngle = void 0 !== i.spot.outerConeAngle ? i.spot.outerConeAngle : Math.PI / 4,
            t.angle = i.spot.outerConeAngle,
            t.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle,
            t.target.position.set(0, 0, -1),
            t.add(t.target);
            break;
        default:
            throw new Error('THREE.GLTFLoader: Unexpected light type, "' + i.type + '".')
        }
        return t.position.set(0, 0, 0),
        t.decay = 2,
        void 0 !== i.intensity && (t.intensity = i.intensity),
        t.name = i.name || "light_" + e,
        Promise.resolve(t)
    }
    ,
    c.prototype.getMaterialType = function() {
        return THREE.MeshBasicMaterial
    }
    ,
    c.prototype.extendParams = function(e, t, i) {
        var r = [];
        e.color = new THREE.Color(1,1,1),
        e.opacity = 1;
        var n = t.pbrMetallicRoughness;
        if (n) {
            if (Array.isArray(n.baseColorFactor)) {
                var o = n.baseColorFactor;
                e.color.fromArray(o),
                e.opacity = o[3]
            }
            void 0 !== n.baseColorTexture && r.push(i.assignTexture(e, "map", n.baseColorTexture))
        }
        return Promise.all(r)
    }
    ;
    var h = "glTF"
      , p = 1313821514
      , d = 5130562;
    function f(e) {
        this.name = KHR_TYPES.KHR_BINARY_GLTF,
        this.content = null,
        this.body = null;
        var t = new DataView(e,0,12);
        if (this.header = {
            magic: THREE.LoaderUtils.decodeText(new Uint8Array(e.slice(0, 4))),
            version: t.getUint32(4, !0),
            length: t.getUint32(8, !0)
        },
        this.header.magic !== h)
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        if (this.header.version < 2)
            throw new Error("THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.");
        for (var i = new DataView(e,12), r = 0; r < i.byteLength; ) {
            var n = i.getUint32(r, !0);
            r += 4;
            var o = i.getUint32(r, !0);
            if (r += 4,
            o === p) {
                var s = new Uint8Array(e,12 + r,n);
                this.content = THREE.LoaderUtils.decodeText(s)
            } else if (o === d) {
                var l = 12 + r;
                this.body = e.slice(l, l + n)
            }
            r += n
        }
        if (null === this.content)
            throw new Error("THREE.GLTFLoader: JSON content not found.")
    }
    function m(e, t) {
        if (!t)
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        this.name = KHR_TYPES.KHR_DRACO_MESH_COMPRESSION,
        this.json = e,
        this.dracoLoader = t,
        this.dracoLoader.preload()
    }
    function g() {
        this.name = KHR_TYPES.KHR_TEXTURE_TRANSFORM
    }
    function v(e) {
        THREE.MeshStandardMaterial.call(this),
        this.isGLTFSpecularGlossinessMaterial = !0;
        var t = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n")
          , i = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n")
          , r = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\ttexelSpecular = sRGBToLinear( texelSpecular );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n")
          , n = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n")
          , o = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb;", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.", "material.specularRoughness += geometryRoughness;", "material.specularRoughness = min( material.specularRoughness, 1.0 );", "material.specularColor = specularFactor.rgb;"].join("\n")
          , s = {
            specular: {
                value: (new THREE.Color).setHex(16777215)
            },
            glossiness: {
                value: 1
            },
            specularMap: {
                value: null
            },
            glossinessMap: {
                value: null
            }
        };
        this._extraUniforms = s,
        this.onBeforeCompile = function(e) {
            for (var a in s)
                e.uniforms[a] = s[a];
            e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;"),
            e.fragmentShader = e.fragmentShader.replace("uniform float metalness;", "uniform float glossiness;"),
            e.fragmentShader = e.fragmentShader.replace("#include <roughnessmap_pars_fragment>", t),
            e.fragmentShader = e.fragmentShader.replace("#include <metalnessmap_pars_fragment>", i),
            e.fragmentShader = e.fragmentShader.replace("#include <roughnessmap_fragment>", r),
            e.fragmentShader = e.fragmentShader.replace("#include <metalnessmap_fragment>", n),
            e.fragmentShader = e.fragmentShader.replace("#include <lights_physical_fragment>", o)
        }
        ,
        Object.defineProperties(this, {
            specular: {
                get: function() {
                    return s.specular.value
                },
                set: function(e) {
                    s.specular.value = e
                }
            },
            specularMap: {
                get: function() {
                    return s.specularMap.value
                },
                set: function(e) {
                    s.specularMap.value = e
                }
            },
            glossiness: {
                get: function() {
                    return s.glossiness.value
                },
                set: function(e) {
                    s.glossiness.value = e
                }
            },
            glossinessMap: {
                get: function() {
                    return s.glossinessMap.value
                },
                set: function(e) {
                    s.glossinessMap.value = e,
                    e ? (this.defines.USE_GLOSSINESSMAP = "",
                    this.defines.USE_ROUGHNESSMAP = "") : (delete this.defines.USE_ROUGHNESSMAP,
                    delete this.defines.USE_GLOSSINESSMAP)
                }
            }
        }),
        delete this.metalness,
        delete this.roughness,
        delete this.metalnessMap,
        delete this.roughnessMap,
        this.setValues(e)
    }
    function y() {
        return {
            name: KHR_TYPES.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
            specularGlossinessParams: ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"],
            getMaterialType: function() {
                return v
            },
            extendParams: function(e, t, i) {
                var r = t.extensions[this.name];
                e.color = new THREE.Color(1,1,1),
                e.opacity = 1;
                var n = [];
                if (Array.isArray(r.diffuseFactor)) {
                    var o = r.diffuseFactor;
                    e.color.fromArray(o),
                    e.opacity = o[3]
                }
                if (void 0 !== r.diffuseTexture && n.push(i.assignTexture(e, "map", r.diffuseTexture)),
                e.emissive = new THREE.Color(0,0,0),
                e.glossiness = void 0 !== r.glossinessFactor ? r.glossinessFactor : 1,
                e.specular = new THREE.Color(1,1,1),
                Array.isArray(r.specularFactor) && e.specular.fromArray(r.specularFactor),
                void 0 !== r.specularGlossinessTexture) {
                    var s = r.specularGlossinessTexture;
                    n.push(i.assignTexture(e, "glossinessMap", s)),
                    n.push(i.assignTexture(e, "specularMap", s))
                }
                return Promise.all(n)
            },
            createMaterial: function(e) {
                var t = new v(e);
                return t.fog = !0,
                t.color = e.color,
                t.map = void 0 === e.map ? null : e.map,
                t.lightMap = null,
                t.lightMapIntensity = 1,
                t.aoMap = void 0 === e.aoMap ? null : e.aoMap,
                t.aoMapIntensity = 1,
                t.emissive = e.emissive,
                t.emissiveIntensity = 1,
                t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap,
                t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap,
                t.bumpScale = 1,
                t.normalMap = void 0 === e.normalMap ? null : e.normalMap,
                t.normalMapType = THREE.TangentSpaceNormalMap,
                e.normalScale && (t.normalScale = e.normalScale),
                t.displacementMap = null,
                t.displacementScale = 1,
                t.displacementBias = 0,
                t.specularMap = void 0 === e.specularMap ? null : e.specularMap,
                t.specular = e.specular,
                t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap,
                t.glossiness = e.glossiness,
                t.alphaMap = null,
                t.envMap = void 0 === e.envMap ? null : e.envMap,
                t.envMapIntensity = 1,
                t.refractionRatio = .98,
                t
            }
        }
    }
    function b() {
        this.name = KHR_TYPES.KHR_MESH_QUANTIZATION
    }
    function _(e, t, i, r) {
        THREE.Interpolant.call(this, e, t, i, r)
    }
    m.prototype.decodePrimitive = function(e, t) {
        var i = this.json
          , dracoLoader = this.dracoLoader
          , n = e.extensions[this.name].bufferView
          , o = e.extensions[this.name].attributes
          , s = {}
          , a = {}
          , l = {};
        for (var u in o) {
            var c = A[u] || u.toLowerCase();
            s[c] = o[u]
        }
        for (u in e.attributes) {
            c = A[u] || u.toLowerCase();
            if (void 0 !== o[u]) {
                var h = i.accessors[e.attributes[u]]
                  , p = j[h.componentType];
                l[c] = p,
                a[c] = !0 === h.normalized
            }
        }
        return t.getDependency("bufferView", n).then((function(e) {
            return new Promise((function(t) {
                dracoLoader.decodeDracoFile(e, (function(e) {
                    for (var i in e.attributes) {
                        var r = e.attributes[i]
                          , n = a[i];
                        void 0 !== n && (r.normalized = n)
                    }
                    t(e)
                }
                ), s, l)
            }
            ))
        }
        ))
    }
    ,
    g.prototype.extendTexture = function(e, t) {
        return e = e.clone(),
        void 0 !== t.offset && e.offset.fromArray(t.offset),
        void 0 !== t.rotation && (e.rotation = t.rotation),
        void 0 !== t.scale && e.repeat.fromArray(t.scale),
        void 0 !== t.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'),
        e.needsUpdate = !0,
        e
    }
    ,
    v.prototype = Object.create(THREE.MeshStandardMaterial.prototype),
    v.prototype.constructor = v,
    v.prototype.copy = function(e) {
        return THREE.MeshStandardMaterial.prototype.copy.call(this, e),
        this.specularMap = e.specularMap,
        this.specular.copy(e.specular),
        this.glossinessMap = e.glossinessMap,
        this.glossiness = e.glossiness,
        delete this.metalness,
        delete this.roughness,
        delete this.metalnessMap,
        delete this.roughnessMap,
        this
    }
    ,
    _.prototype = Object.create(THREE.Interpolant.prototype),
    _.prototype.constructor = _,
    _.prototype.copySampleValue_ = function(e) {
        for (var t = this.resultBuffer, i = this.sampleValues, r = this.valueSize, n = e * r * 3 + r, o = 0; o !== r; o++)
            t[o] = i[n + o];
        return t
    }
    ,
    _.prototype.beforeStart_ = _.prototype.copySampleValue_,
    _.prototype.afterEnd_ = _.prototype.copySampleValue_,
    _.prototype.interpolate_ = function(e, t, i, r) {
        for (var n = this.resultBuffer, o = this.sampleValues, s = this.valueSize, a = 2 * s, l = 3 * s, u = r - t, c = (i - t) / u, h = c * c, p = h * c, d = e * l, f = d - l, m = -2 * p + 3 * h, g = p - h, v = 1 - m, y = g - h + c, b = 0; b !== s; b++) {
            var _ = o[f + b + s]
              , x = o[f + b + a] * u
              , E = o[d + b + s]
              , w = o[d + b] * u;
            n[b] = v * _ + y * x + m * E + g * w
        }
        return n
    }
    ;
    var x = 0
      , E = 1
      , w = 2
      , T = 3
      , M = 4
      , C = 5
      , S = 6
      , j = {
        5120: Int8Array,
        5121: Uint8Array,
        5122: Int16Array,
        5123: Uint16Array,
        5125: Uint32Array,
        5126: Float32Array
    }
      , P = {
        9728: THREE.NearestFilter,
        9729: THREE.LinearFilter,
        9984: THREE.NearestMipmapNearestFilter,
        9985: THREE.LinearMipmapNearestFilter,
        9986: THREE.NearestMipmapLinearFilter,
        9987: THREE.LinearMipmapLinearFilter
    }
      , R = {
        33071: THREE.ClampToEdgeWrapping,
        33648: THREE.MirroredRepeatWrapping,
        10497: THREE.RepeatWrapping
    }
      , D = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT2: 4,
        MAT3: 9,
        MAT4: 16
    }
      , A = {
        POSITION: "position",
        NORMAL: "normal",
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv2",
        TEXCOORD_2: "uv3",
        COLOR_0: "color",
        WEIGHTS_0: "skinWeight",
        JOINTS_0: "skinIndex"
    }
      , k = {
        scale: "scale",
        translation: "position",
        rotation: "quaternion",
        weights: "morphTargetInfluences"
    }
      , O = {
        CUBICSPLINE: void 0,
        LINEAR: THREE.InterpolateLinear,
        STEP: THREE.InterpolateDiscrete
    }
      , B = "OPAQUE"
      , F = "MASK"
      , L = "BLEND"
      , I = {
        "image/png": THREE.RGBAFormat,
        "image/jpeg": THREE.RGBFormat
    };
    function N(e, t) {
        return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
        /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e)
    }
    function H(e, t, i) {
        for (var r in i.extensions)
            void 0 === e[r] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {},
            t.userData.gltfExtensions[r] = i.extensions[r])
    }
    function U(e, i) {
        void 0 !== i.extras && ("object" === t(i.extras) ? Object.assign(e.userData, i.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + i.extras))
    }
    function z(e, t) {
        if (e.updateMorphTargets(),
        void 0 !== t.weights)
            for (var i = 0, r = t.weights.length; i < r; i++)
                e.morphTargetInfluences[i] = t.weights[i];
        if (t.extras && Array.isArray(t.extras.targetNames)) {
            var n = t.extras.targetNames;
            if (e.morphTargetInfluences.length === n.length) {
                e.morphTargetDictionary = {};
                for (i = 0,
                r = n.length; i < r; i++)
                    e.morphTargetDictionary[n[i]] = i
            } else
                console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
        }
    }
    function V(e) {
        for (var t = "", i = Object.keys(e).sort(), r = 0, n = i.length; r < n; r++)
            t += i[r] + ":" + e[i[r]] + ";";
        return t
    }
    function W(e, t, i) {
        this.json = e || {},
        this.extensions = t || {},
        this.options = i || {},
        this.cache = new s,
        this.primitiveCache = [],
        this.textureLoader = new THREE.TextureLoader(this.options.manager),
        this.textureLoader.setCrossOrigin(this.options.crossOrigin),
        this.fileLoader = new THREE.FileLoader(this.options.manager),
        this.fileLoader.setResponseType("arraybuffer"),
        "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
    }
    function G(e, t, i) {
        var r = t.attributes
          , n = [];
        function o(t, r) {
            return i.getDependency("accessor", t).then((function(t) {
                e.setAttribute(r, t)
            }
            ))
        }
        for (var s in r) {
            var a = A[s] || s.toLowerCase();
            a && (a in e.attributes || n.push(o(r[s], a)))
        }
        if (void 0 !== t.indices && !e.index) {
            var l = i.getDependency("accessor", t.indices).then((function(t) {
                e.setIndex(t)
            }
            ));
            n.push(l)
        }
        return U(e, t),
        function(e, t, i) {
            var r = t.attributes
              , n = new THREE.Box3;
            if (void 0 !== r.POSITION) {
                var o = (h = i.json.accessors[r.POSITION]).min
                  , s = h.max;
                if (void 0 !== o && void 0 !== s) {
                    n.set(new THREE.Vector3(o[0],o[1],o[2]), new THREE.Vector3(s[0],s[1],s[2]));
                    var a = t.targets;
                    if (void 0 !== a)
                        for (var l = new THREE.Vector3, u = 0, c = a.length; u < c; u++) {
                            var h, p = a[u];
                            if (void 0 !== p.POSITION)
                                o = (h = i.json.accessors[p.POSITION]).min,
                                s = h.max,
                                void 0 !== o && void 0 !== s ? (l.setX(Math.max(Math.abs(o[0]), Math.abs(s[0]))),
                                l.setY(Math.max(Math.abs(o[1]), Math.abs(s[1]))),
                                l.setZ(Math.max(Math.abs(o[2]), Math.abs(s[2]))),
                                n.expandByVector(l)) : console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
                        }
                    e.boundingBox = n;
                    var d = new THREE.Sphere;
                    n.getCenter(d.center),
                    d.radius = n.min.distanceTo(n.max) / 2,
                    e.boundingSphere = d
                } else
                    console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
            }
        }(e, t, i),
        Promise.all(n).then((function() {
            return void 0 !== t.targets ? function(e, t, i) {
                for (var r = !1, n = !1, o = 0, s = t.length; o < s && (void 0 !== (u = t[o]).POSITION && (r = !0),
                void 0 !== u.NORMAL && (n = !0),
                !r || !n); o++)
                    ;
                if (!r && !n)
                    return Promise.resolve(e);
                var a = []
                  , l = [];
                for (o = 0,
                s = t.length; o < s; o++) {
                    var u = t[o];
                    if (r) {
                        var c = void 0 !== u.POSITION ? i.getDependency("accessor", u.POSITION) : e.attributes.position;
                        a.push(c)
                    }
                    n && (c = void 0 !== u.NORMAL ? i.getDependency("accessor", u.NORMAL) : e.attributes.normal,
                    l.push(c))
                }
                return Promise.all([Promise.all(a), Promise.all(l)]).then((function(t) {
                    var i = t[0]
                      , o = t[1];
                    return r && (e.morphAttributes.position = i),
                    n && (e.morphAttributes.normal = o),
                    e.morphTargetsRelative = !0,
                    e
                }
                ))
            }(e, t.targets, i) : e
        }
        ))
    }
    function q(e, t) {
        var i = e.getIndex();
        if (null === i) {
            var r = []
              , n = e.getAttribute("position");
            if (void 0 === n)
                return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),
                e;
            for (var o = 0; o < n.count; o++)
                r.push(o);
            e.setIndex(r),
            i = e.getIndex()
        }
        var s = i.count - 2
          , a = [];
        if (t === THREE.TriangleFanDrawMode)
            for (o = 1; o <= s; o++)
                a.push(i.getX(0)),
                a.push(i.getX(o)),
                a.push(i.getX(o + 1));
        else
            for (o = 0; o < s; o++)
                o % 2 == 0 ? (a.push(i.getX(o)),
                a.push(i.getX(o + 1)),
                a.push(i.getX(o + 2))) : (a.push(i.getX(o + 2)),
                a.push(i.getX(o + 1)),
                a.push(i.getX(o)));
        a.length / 3 !== s && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        var l = e.clone();
        return l.setIndex(a),
        l
    }
    W.prototype.parse = function(e, t) {
        var i = this
          , r = this.json
          , n = this.extensions;
        this.cache.removeAll(),
        this.markDefs(),
        Promise.all([this.getDependencies("scene"), this.getDependencies("animation"), this.getDependencies("camera"), this.getDependencies("material")]).then((function(t) {
            var o = {
                scene: t[0][r.scene || 0],
                scenes: t[0],
                animations: t[1],
                cameras: t[2],
                materials: t[3],
                asset: r.asset,
                parser: i,
                userData: {}
            };
            H(n, o, r),
            U(o, r),
            e(o)
        }
        )).catch(t)
    }
    ,
    W.prototype.markDefs = function() {
        for (var e = this.json.nodes || [], t = this.json.skins || [], i = this.json.meshes || [], r = {}, n = {}, o = 0, s = t.length; o < s; o++)
            for (var a = t[o].joints, l = 0, u = a.length; l < u; l++)
                e[a[l]].isBone = !0;
        for (var c = 0, h = e.length; c < h; c++) {
            var p = e[c];
            void 0 !== p.mesh && (void 0 === r[p.mesh] && (r[p.mesh] = n[p.mesh] = 0),
            r[p.mesh]++,
            void 0 !== p.skin && (i[p.mesh].isSkinnedMesh = !0))
        }
        this.json.meshReferences = r,
        this.json.meshUses = n
    }
    ,
    W.prototype.getDependency = function(e, t) {
        var i = e + ":" + t
          , r = this.cache.get(i);
        if (!r) {
            switch (e) {
            case "scene":
                r = this.loadScene(t);
                break;
            case "node":
                r = this.loadNode(t);
                break;
            case "mesh":
                r = this.loadMesh(t);
                break;
            case "accessor":
                r = this.loadAccessor(t);
                break;
            case "bufferView":
                r = this.loadBufferView(t);
                break;
            case "buffer":
                r = this.loadBuffer(t);
                break;
            case "material":
                r = this.loadMaterial(t);
                break;
            case "texture":
                r = this.loadTexture(t);
                break;
            case "skin":
                r = this.loadSkin(t);
                break;
            case "animation":
                r = this.loadAnimation(t);
                break;
            case "camera":
                r = this.loadCamera(t);
                break;
            case "light":
                r = this.extensions[KHR_TYPES.KHR_LIGHTS_PUNCTUAL].loadLight(t);
                break;
            default:
                throw new Error("Unknown type: " + e)
            }
            this.cache.add(i, r)
        }
        return r
    }
    ,
    W.prototype.getDependencies = function(e) {
        var t = this.cache.get(e);
        if (!t) {
            var i = this
              , r = this.json[e + ("mesh" === e ? "es" : "s")] || [];
            t = Promise.all(r.map((function(t, r) {
                return i.getDependency(e, r)
            }
            ))),
            this.cache.add(e, t)
        }
        return t
    }
    ,
    W.prototype.loadBuffer = function(e) {
        var t = this.json.buffers[e]
          , fileLoader = this.fileLoader;
        if (t.type && "arraybuffer" !== t.type)
            throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
        if (void 0 === t.uri && 0 === e)
            return Promise.resolve(this.extensions[KHR_TYPES.KHR_BINARY_GLTF].body);
        var r = this.options;
        return new Promise((function(e, n) {
            fileLoader.load(N(t.uri, r.path), e, void 0, (function() {
                n(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
            }
            ))
        }
        ))
    }
    ,
    W.prototype.loadBufferView = function(e) {
        var t = this.json.bufferViews[e];
        return this.getDependency("buffer", t.buffer).then((function(e) {
            var i = t.byteLength || 0
              , r = t.byteOffset || 0;
            return e.slice(r, r + i)
        }
        ))
    }
    ,
    W.prototype.loadAccessor = function(e) {
        var t = this
          , i = this.json
          , r = this.json.accessors[e];
        if (void 0 === r.bufferView && void 0 === r.sparse)
            return Promise.resolve(null);
        var n = [];
        return void 0 !== r.bufferView ? n.push(this.getDependency("bufferView", r.bufferView)) : n.push(null),
        void 0 !== r.sparse && (n.push(this.getDependency("bufferView", r.sparse.indices.bufferView)),
        n.push(this.getDependency("bufferView", r.sparse.values.bufferView))),
        Promise.all(n).then((function(e) {
            var n, o, s = e[0], a = D[r.type], l = j[r.componentType], u = l.BYTES_PER_ELEMENT, c = u * a, h = r.byteOffset || 0, p = void 0 !== r.bufferView ? i.bufferViews[r.bufferView].byteStride : void 0, d = !0 === r.normalized;
            if (p && p !== c) {
                var f = Math.floor(h / p)
                  , m = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + f + ":" + r.count
                  , g = t.cache.get(m);
                g || (n = new l(s,f * p,r.count * p / u),
                g = new THREE.InterleavedBuffer(n,p / u),
                t.cache.add(m, g)),
                o = new THREE.InterleavedBufferAttribute(g,a,h % p / u,d)
            } else
                n = null === s ? new l(r.count * a) : new l(s,h,r.count * a),
                o = new THREE.BufferAttribute(n,a,d);
            if (void 0 !== r.sparse) {
                var v = D.SCALAR
                  , y = j[r.sparse.indices.componentType]
                  , b = r.sparse.indices.byteOffset || 0
                  , _ = r.sparse.values.byteOffset || 0
                  , x = new y(e[1],b,r.sparse.count * v)
                  , E = new l(e[2],_,r.sparse.count * a);
                null !== s && (o = new THREE.BufferAttribute(o.array.slice(),o.itemSize,o.normalized));
                for (var w = 0, T = x.length; w < T; w++) {
                    var M = x[w];
                    if (o.setX(M, E[w * a]),
                    a >= 2 && o.setY(M, E[w * a + 1]),
                    a >= 3 && o.setZ(M, E[w * a + 2]),
                    a >= 4 && o.setW(M, E[w * a + 3]),
                    a >= 5)
                        throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                }
            }
            return o
        }
        ))
    }
    ,
    W.prototype.loadTexture = function(e) {
        var t, i = this, r = this.json, n = this.options, o = this.textureLoader, s = window.URL || window.webkitURL, l = r.textures[e], u = l.extensions || {}, c = (t = u[KHR_TYPES.MSFT_TEXTURE_DDS] ? r.images[u[KHR_TYPES.MSFT_TEXTURE_DDS].source] : r.images[l.source]).uri, h = !1;
        return void 0 !== t.bufferView && (c = i.getDependency("bufferView", t.bufferView).then((function(e) {
            h = !0;
            var i = new Blob([e],{
                type: t.mimeType
            });
            return c = s.createObjectURL(i)
        }
        ))),
        Promise.resolve(c).then((function(e) {
            var t = n.manager.getHandler(e);
            if (t || (t = u[KHR_TYPES.MSFT_TEXTURE_DDS] ? i.extensions[KHR_TYPES.MSFT_TEXTURE_DDS].ddsLoader : o),
            n.onLoadTexture) {
                var s = (r.samplers || {})[l.sampler] || {};
                return n.onLoadTexture(N(e, n.path), s, l).then((function(i) {
                    return i ? (i._skipSetting = !0,
                    Promise.resolve(i)) : new Promise((function(i, r) {
                        t.load(N(e, n.path), i, void 0, r)
                    }
                    ))
                }
                ))
            }
            if (n.staticImage) {
                var c = new THREE.Texture;
                return c.image = n.staticImage,
                c.format = THREE.RGBAFormat,
                c.needsUpdate = !0,
                Promise.resolve(c)
            }
            return new Promise((function(i, r) {
                t.load(N(e, n.path), i, void 0, r)
            }
            ))
        }
        )).then((function(e) {
            if (!0 === h && s.revokeObjectURL(c),
            e._skipSetting)
                return e;
            e.flipY = !1,
            void 0 !== l.name && (e.name = l.name),
            t.mimeType in I && (e.format = I[t.mimeType]);
            var i = (r.samplers || {})[l.sampler] || {};
            return e.magFilter = P[i.magFilter] || THREE.LinearFilter,
            e.minFilter = P[i.minFilter] || THREE.LinearMipMapLinearFilter,
            e.wrapS = R[i.wrapS] || THREE.RepeatWrapping,
            e.wrapT = R[i.wrapT] || THREE.RepeatWrapping,
            e
        }
        ))
    }
    ,
    W.prototype.assignTexture = function(e, t, i) {
        var r = this
          , n = this;
        if (void 0 !== i.extensions && i.extensions.textureExtensions) {
            var o = i.extensions.textureExtensions.map((function(e) {
                return r.getDependency("texture", e.index)
            }
            ));
            return Promise.all(o).then((function(i) {
                e[t] = i[0],
                e["_replace_" + t] = i
            }
            ))
        }
        return this.getDependency("texture", i.index).then((function(r) {
            if (r.isCompressedTexture,
            n.extensions[KHR_TYPES.KHR_TEXTURE_TRANSFORM]) {
                var o = void 0 !== i.extensions ? i.extensions[KHR_TYPES.KHR_TEXTURE_TRANSFORM] : void 0;
                o && (r = n.extensions[KHR_TYPES.KHR_TEXTURE_TRANSFORM].extendTexture(r, o))
            }
            e[t] = r
        }
        ))
    }
    ,
    W.prototype.assignFinalMaterial = function(e) {
        var t = e.geometry
          , i = e.material
          , r = (this.extensions,
        void 0 !== t.attributes.tangent)
          , n = void 0 !== t.attributes.color
          , o = void 0 !== t.attributes.alphaIndex
          , s = void 0 === t.attributes.normal
          , a = !0 === e.isSkinnedMesh
          , l = Object.keys(t.morphAttributes).length > 0
          , u = l && void 0 !== t.morphAttributes.normal;
        if (e.isPoints) {
            var c = "PointsMaterial:" + i.uuid
              , h = this.cache.get(c);
            h || (h = new THREE.PointsMaterial,
            THREE.Material.prototype.copy.call(h, i),
            h.color.copy(i.color),
            h.map = i.map,
            h.sizeAttenuation = !1,
            this.cache.add(c, h)),
            i = h
        } else if (e.isLine) {
            c = "LineBasicMaterial:" + i.uuid;
            var p = this.cache.get(c);
            p || (p = new THREE.LineBasicMaterial,
            THREE.Material.prototype.copy.call(p, i),
            p.color.copy(i.color),
            this.cache.add(c, p)),
            i = p
        }
        if (r || n || o || s || a || l) {
            c = "ClonedMaterial:" + i.uuid + ":";
            i.isGLTFSpecularGlossinessMaterial && (c += "specular-glossiness:"),
            a && (c += "skinning:"),
            r && (c += "vertex-tangents:"),
            n && (c += "vertex-colors:"),
            o && (c += "vertex-alpha:"),
            s && (c += "flat-shading:"),
            l && (c += "morph-targets:"),
            u && (c += "morph-normals:");
            var d = this.cache.get(c);
            d || (d = i.clone(),
            a && (d.skinning = !0),
            r && (d.vertexTangents = !0),
            n && (d.vertexColors = !0),
            o && (d.defines = d.defines || {},
            d.defines.USE_ALPHAINDEX = !0),
            s && (d.flatShading = !0),
            l && (d.morphTargets = !0),
            u && (d.morphNormals = !0),
            this.cache.add(c, d)),
            i = d
        }
        i.aoMap && void 0 === t.attributes.uv2 && void 0 !== t.attributes.uv && t.setAttribute("uv2", new THREE.BufferAttribute(t.attributes.uv.array,2)),
        i.normalScale && !r && (i.normalScale.y = -i.normalScale.y),
        e.material = i
    }
    ,
    W.prototype.loadMaterial = function(e) {
        var t, i = this.options, r = this.json, n = this.extensions, o = r.materials[e], s = {}, l = o.extensions || {}, u = [];
        if (l[KHR_TYPES.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
            var c = n[KHR_TYPES.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
            t = c.getMaterialType(o),
            u.push(c.extendParams(s, o, this))
        } else if (l[KHR_TYPES.KHR_MATERIALS_UNLIT]) {
            var h = n[KHR_TYPES.KHR_MATERIALS_UNLIT];
            t = h.getMaterialType(o),
            u.push(h.extendParams(s, o, this))
        } else {
            t = THREE.MeshStandardMaterial;
            var p = o.pbrMetallicRoughness || {};
            if (s.color = new THREE.Color(1,1,1),
            s.opacity = 1,
            Array.isArray(p.baseColorFactor)) {
                var d = p.baseColorFactor;
                s.color.fromArray(d),
                s.opacity = d[3]
            }
            void 0 !== p.baseColorTexture && (u.push(this.assignTexture(s, "map", p.baseColorTexture)),
            1 == p.baseColorTexture.texCoord && (s.__useDiffuseUV2 = !0)),
            s.metalness = void 0 !== p.metallicFactor ? p.metallicFactor : 1,
            s.roughness = void 0 !== p.roughnessFactor ? p.roughnessFactor : 1,
            void 0 !== p.metallicRoughnessTexture && (u.push(this.assignTexture(s, "metalnessMap", p.metallicRoughnessTexture)),
            u.push(this.assignTexture(s, "roughnessMap", p.metallicRoughnessTexture)))
        }
        !0 === o.doubleSided && (s.side = THREE.DoubleSide);
        var f = o.alphaMode || B;
        f === L ? s.transparent = !0 : (s.transparent = !1,
        f === F && (s.alphaTest = void 0 !== o.alphaCutoff ? o.alphaCutoff : .5)),
        void 0 !== o.normalTexture && t !== THREE.MeshBasicMaterial && (u.push(this.assignTexture(s, "normalMap", o.normalTexture)),
        s.normalScale = new THREE.Vector2(1,1),
        void 0 !== o.normalTexture.scale && s.normalScale.set(o.normalTexture.scale, o.normalTexture.scale)),
        void 0 !== o.occlusionTexture && t !== THREE.MeshBasicMaterial && (u.push(this.assignTexture(s, "aoMap", o.occlusionTexture)),
        void 0 !== o.occlusionTexture.strength && (s.aoMapIntensity = o.occlusionTexture.strength)),
        void 0 !== o.emissiveFactor && t !== THREE.MeshBasicMaterial && (s.emissive = (new THREE.Color).fromArray(o.emissiveFactor)),
        void 0 !== o.emissiveTexture && t !== THREE.MeshBasicMaterial && u.push(this.assignTexture(s, "emissiveMap", o.emissiveTexture));
        var m = []
          , g = l.blend;
        if (g)
            for (var y = 0; y < g.length; y++)
                g[y].maskTexture && u.push(this.assignTexture(m, y, g[y].maskTexture));
        return Promise.all(u).then((function() {
            var e, r = s.__useDiffuseUV2;
            r && delete s.__useDiffuseUV2;
            var u = s._replace_map;
            u && delete s._replace_map;
            var c = s._replace_emissiveMap;
            for (var h in c && delete s._replace_emissiveMap,
            e = t === v ? n[KHR_TYPES.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(s) : new t(s),
            void 0 !== o.name && (e.name = o.name),
            e.map && (e.map.encoding = THREE.sRGBEncoding),
            e.emissiveMap && (e.emissiveMap.encoding = THREE.sRGBEncoding),
            U(e, o),
            o.extensions && H(n, e, o),
            l)
                void 0 === n[h] && ("sceneBlend" === h ? (e.transparent = !0,
                e.blending = void 0 === THREE[l[h] + "Blending"] ? 1 : THREE[l[h] + "Blending"]) : "blend" === h ? e.__texture = m : "depthWrite" === h ? e.depthWrite = !!l[h] : "wireframe" === h && (e.wireframe = !!l[h]));
            u && (e._replace_map = u);
            var p = (o.pbrMetallicRoughness || {}).baseColorTexture
              , d = o.emissiveTexture
              , f = o.normalTexture;
            return void 0 === e.userData.gltfExtensions && (e.userData.gltfExtensions = {}),
            p && p.extensions && (e.userData.gltfExtensions.baseColorTexture = p.extensions),
            d && d.extensions && (e.userData.gltfExtensions.emissiveTexture = d.extensions),
            f && f.extensions && (e.userData.gltfExtensions.normalTexture = f.extensions),
            r && (e.userData.gltfExtensions.useDiffuseUV2 = !0),
            i && i.useRGBAOMap && e.aoMap && (e.defines = e.defines || {},
            e.defines.USE_RGBAOMAP = !0),
            e
        }
        ))
    }
    ,
    W.prototype.loadGeometries = function(e) {
        var t = this
          , i = this.extensions
          , r = this.primitiveCache;
        function n(e) {
            return i[KHR_TYPES.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then((function(i) {
                return G(i, e, t)
            }
            ))
        }
        for (var o, s, l = [], u = 0, c = e.length; u < c; u++) {
            var h, p = e[u], d = (s = void 0,
            (s = (o = p).extensions && o.extensions[KHR_TYPES.KHR_DRACO_MESH_COMPRESSION]) ? "draco:" + s.bufferView + ":" + s.indices + ":" + V(s.attributes) : o.indices + ":" + V(o.attributes) + ":" + o.mode), f = r[d];
            if (f)
                l.push(f.promise);
            else
                h = p.extensions && p.extensions[KHR_TYPES.KHR_DRACO_MESH_COMPRESSION] ? n(p) : G(new THREE.BufferGeometry, p, t),
                r[d] = {
                    primitive: p,
                    promise: h
                },
                l.push(h)
        }
        return Promise.all(l).then((function(e) {
            return e.forEach((function(e) {
                var t = e.attributes.color;
                if (t && 4 === t.itemSize) {
                    for (var i = t.count, r = new Float32Array(i), n = 0; n < i; n++)
                        r.set([t.getW(n)], n);
                    var o = new THREE.BufferAttribute(r,1);
                    e.setAttribute("alphaIndex", o)
                }
            }
            )),
            e
        }
        ))
    }
    ,
    W.prototype.loadMesh = function(e) {
        for (var t, i = this, r = this.json.meshes[e], n = r.primitives, o = [], s = 0, a = n.length; s < a; s++) {
            var l = void 0 === n[s].material ? (void 0 === (t = this.cache).DefaultMaterial && (t.DefaultMaterial = new THREE.MeshStandardMaterial({
                color: 16777215,
                emissive: 0,
                metalness: 1,
                roughness: 1,
                transparent: !1,
                depthTest: !0,
                side: THREE.FrontSide
            })),
            t.DefaultMaterial) : this.getDependency("material", n[s].material);
            o.push(l)
        }
        return o.push(i.loadGeometries(n)),
        Promise.all(o).then((function(t) {
            for (var o = t.slice(0, t.length - 1), s = t[t.length - 1], a = [], l = 0, u = s.length; l < u; l++) {
                var c, h = s[l], p = n[l], d = o[l];
                if (p.mode === M || p.mode === C || p.mode === S || void 0 === p.mode)
                    !0 !== (c = !0 === r.isSkinnedMesh ? new THREE.SkinnedMesh(h,d) : new THREE.Mesh(h,d)).isSkinnedMesh || c.geometry.attributes.skinWeight.normalized || c.normalizeSkinWeights(),
                    p.mode === C ? c.geometry = q(c.geometry, THREE.TriangleStripDrawMode) : p.mode === S && (c.geometry = q(c.geometry, THREE.TriangleFanDrawMode));
                else if (p.mode === E)
                    c = new THREE.LineSegments(h,d);
                else if (p.mode === T)
                    c = new THREE.Line(h,d);
                else if (p.mode === w)
                    c = new THREE.LineLoop(h,d);
                else {
                    if (p.mode !== x)
                        throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
                    c = new THREE.Points(h,d)
                }
                Object.keys(c.geometry.morphAttributes).length > 0 && z(c, r),
                c.name = r.name || "mesh_" + e,
                s.length > 1 && (c._wName = 0 === l ? c.name : "_skip_wireframes_",
                c.name += "_" + l),
                U(c, r),
                i.assignFinalMaterial(c),
                a.push(c)
            }
            if (1 === a.length)
                return a[0];
            var f = new THREE.Group;
            for (l = 0,
            u = a.length; l < u; l++)
                f.add(a[l]);
            return f
        }
        ))
    }
    ,
    W.prototype.loadCamera = function(e) {
        var t, i = this.json.cameras[e], r = i[i.type];
        if (r)
            return "perspective" === i.type ? t = new THREE.PerspectiveCamera(THREE.MathUtils.radToDeg(r.yfov),r.aspectRatio || 1,r.znear || 1,r.zfar || 2e6) : "orthographic" === i.type && (t = new THREE.OrthographicCamera(r.xmag / -2,r.xmag / 2,r.ymag / 2,r.ymag / -2,r.znear,r.zfar)),
            void 0 !== i.name && (t.name = i.name),
            U(t, i),
            Promise.resolve(t);
        console.warn("THREE.GLTFLoader: Missing camera parameters.")
    }
    ,
    W.prototype.loadSkin = function(e) {
        var t = this.json.skins[e]
          , i = {
            joints: t.joints
        };
        return void 0 === t.inverseBindMatrices ? Promise.resolve(i) : this.getDependency("accessor", t.inverseBindMatrices).then((function(e) {
            return i.inverseBindMatrices = e,
            i
        }
        ))
    }
    ,
    W.prototype.loadAnimation = function(e) {
        for (var t = this.json.animations[e], i = [], r = [], n = [], o = [], s = [], a = 0, l = t.channels.length; a < l; a++) {
            var u = t.channels[a]
              , c = t.samplers[u.sampler]
              , h = u.target
              , p = void 0 !== h.node ? h.node : h.id
              , d = void 0 !== t.parameters ? t.parameters[c.input] : c.input
              , f = void 0 !== t.parameters ? t.parameters[c.output] : c.output;
            i.push(this.getDependency("node", p)),
            r.push(this.getDependency("accessor", d)),
            n.push(this.getDependency("accessor", f)),
            o.push(c),
            s.push(h)
        }
        return Promise.all([Promise.all(i), Promise.all(r), Promise.all(n), Promise.all(o), Promise.all(s)]).then((function(i) {
            for (var r = i[0], n = i[1], o = i[2], s = i[3], a = i[4], l = [], u = 0, c = r.length; u < c; u++) {
                var h = r[u]
                  , p = n[u]
                  , d = o[u]
                  , f = s[u]
                  , m = a[u];
                if (void 0 !== h) {
                    var g;
                    switch (h.updateMatrix(),
                    h.matrixAutoUpdate = !0,
                    k[m.path]) {
                    case k.weights:
                        g = THREE.NumberKeyframeTrack;
                        break;
                    case k.rotation:
                        g = THREE.QuaternionKeyframeTrack;
                        break;
                    case k.position:
                    case k.scale:
                    default:
                        g = THREE.VectorKeyframeTrack
                    }
                    var v = h.name ? h.name : h.uuid
                      , y = void 0 !== f.interpolation ? O[f.interpolation] : THREE.InterpolateLinear
                      , b = [];
                    k[m.path] === k.weights ? h.traverse((function(e) {
                        !0 === e.isMesh && e.morphTargetInfluences && b.push(e.name ? e.name : e.uuid)
                    }
                    )) : b.push(v);
                    var x = d.array;
                    if (d.normalized) {
                        var E;
                        if (x.constructor === Int8Array)
                            E = 1 / 127;
                        else if (x.constructor === Uint8Array)
                            E = 1 / 255;
                        else if (x.constructor == Int16Array)
                            E = 1 / 32767;
                        else {
                            if (x.constructor !== Uint16Array)
                                throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");
                            E = 1 / 65535
                        }
                        for (var w = new Float32Array(x.length), T = 0, M = x.length; T < M; T++)
                            w[T] = x[T] * E;
                        x = w
                    }
                    for (T = 0,
                    M = b.length; T < M; T++) {
                        var C = new g(b[T] + "." + k[m.path],p.array,x,y);
                        "CUBICSPLINE" === f.interpolation && (C.createInterpolant = function(e) {
                            return new _(this.times,this.values,this.getValueSize() / 3,e)
                        }
                        ,
                        C.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0),
                        l.push(C)
                    }
                }
            }
            var S = void 0 !== t.name ? t.name : "animation_" + e;
            return new THREE.AnimationClip(S,void 0,l)
        }
        ))
    }
    ,
    W.prototype.loadNode = function(e) {
        var t, i = this.json, r = this.extensions, n = this, o = i.meshReferences, s = i.meshUses, l = i.nodes[e];
        return (t = [],
        void 0 !== l.mesh && t.push(n.getDependency("mesh", l.mesh).then((function(e) {
            var t;
            if (o[l.mesh] > 1) {
                var i = s[l.mesh]++;
                (t = e.clone()).name += "_instance_" + i
            } else
                t = e;
            return void 0 !== l.weights && t.traverse((function(e) {
                if (e.isMesh)
                    for (var t = 0, i = l.weights.length; t < i; t++)
                        e.morphTargetInfluences[t] = l.weights[t]
            }
            )),
            t
        }
        ))),
        void 0 !== l.camera && t.push(n.getDependency("camera", l.camera)),
        l.extensions && l.extensions[KHR_TYPES.KHR_LIGHTS_PUNCTUAL] && void 0 !== l.extensions[KHR_TYPES.KHR_LIGHTS_PUNCTUAL].light && t.push(n.getDependency("light", l.extensions[KHR_TYPES.KHR_LIGHTS_PUNCTUAL].light)),
        Promise.all(t)).then((function(e) {
            var t;
            if ((t = !0 === l.isBone ? new THREE.Bone : e.length > 1 ? new THREE.Group : 1 === e.length ? e[0] : new THREE.Object3D) !== e[0])
                for (var i = 0, n = e.length; i < n; i++)
                    t.add(e[i]);
            if (void 0 !== l.name && (t.userData.name = l.name,
            t.name = THREE.PropertyBinding.sanitizeNodeName(l.name)),
            U(t, l),
            l.extensions && H(r, t, l),
            void 0 !== l.matrix) {
                var o = new THREE.Matrix4;
                o.fromArray(l.matrix),
                t.applyMatrix4(o)
            } else
                void 0 !== l.translation && t.position.fromArray(l.translation),
                void 0 !== l.rotation && t.quaternion.fromArray(l.rotation),
                void 0 !== l.scale && t.scale.fromArray(l.scale);
            return t
        }
        ))
    }
    ,
    W.prototype.loadScene = function() {
        function e(t, i, r, n) {
            var o = r.nodes[t];
            return n.getDependency("node", t).then((function(e) {
                return void 0 === o.skin ? e : n.getDependency("skin", o.skin).then((function(e) {
                    for (var i = [], r = 0, o = (t = e).joints.length; r < o; r++)
                        i.push(n.getDependency("node", t.joints[r]));
                    return Promise.all(i)
                }
                )).then((function(i) {
                    return e.traverse((function(e) {
                        if (e.isMesh) {
                            for (var r = [], n = [], o = 0, s = i.length; o < s; o++) {
                                var a = i[o];
                                if (a) {
                                    r.push(a);
                                    var l = new THREE.Matrix4;
                                    void 0 !== t.inverseBindMatrices && l.fromArray(t.inverseBindMatrices.array, 16 * o),
                                    n.push(l)
                                } else
                                    console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[o])
                            }
                            e.bind(new THREE.Skeleton(r,n), e.matrixWorld)
                        }
                    }
                    )),
                    e
                }
                ));
                var t
            }
            )).then((function(t) {
                i.add(t);
                var s = [];
                if (o.children)
                    for (var a = o.children, l = 0, u = a.length; l < u; l++) {
                        var c = a[l];
                        s.push(e(c, t, r, n))
                    }
                return Promise.all(s)
            }
            ))
        }
        return function(t) {
            var i = this.json
              , r = this.extensions
              , n = this.json.scenes[t]
              , o = new THREE.Scene;
            void 0 !== n.name && (o.name = n.name),
            U(o, n),
            n.extensions && H(r, o, n);
            for (var s = n.nodes || [], a = [], l = 0, u = s.length; l < u; l++)
                a.push(e(s[l], o, i, this));
            return Promise.all(a).then((function() {
                return o
            }
            ))
        }
    }();
    var X = Object.prototype.toString
      , J = function(e) {
        return function(t) {
            return X.call(t) == "[object " + e + "]"
        }
    };
    var Y = function() {
        var e = 1
          , t = 1
          , i = 128 / e
          , r = 128 / t
          , n = ["rgb(255,255,255)"]
          , o = document.createElement("canvas");
        o.width = 128,
        o.height = 128;
        for (var s = o.getContext("2d"), a = 0; a < t; a++)
            for (var l = 0; l < e; l++)
                s.fillStyle = n[(l + a) % 2],
                s.fillRect(l * i, a * r, i, r);
        return o
    }()
      , Q = {
        diffuseImage: Y,
        isType: J,
        isArray: J("Array"),
        isObject: J("Object"),
        isString: J("String"),
        isNumber: J("Number"),
        isFunction: J("Function"),
        isRegExp: J("RegExp"),
        isUndefined: J("Undefined"),
        isNull: function(e) {
            return null == e
        },
        parseValue: function(e, t) {
            return Q.isNull(e) ? t : e
        },
        objectKeysToLowerCase: function(e, i, r) {
            var n, o, s, a, l, u, c, h;
            if (u = Q.objectKeysToLowerCase,
            "undefined" === (c = t(i)) || null === i || 0 === i || !1 === i)
                i = 0;
            else if ("object" === c) {
                if (!(i instanceof u))
                    throw new TypeError('Expected "deep" to be a special object')
            } else if (!0 === i)
                i = 1 / 0;
            else {
                if ("number" !== c)
                    throw new TypeError('Expected "deep" to be a boolean, number or object, got "' + c + '"');
                if (isNaN(i) || i < 0)
                    throw new RangeError('Expected "deep" to be a positive number, got ' + i)
            }
            if (null === e || "object" !== t(e))
                throw new TypeError('Expected "input" to be an object');
            if (c = t(r),
            null !== r && "undefined" !== c && "function" !== c)
                throw new TypeError('Expected "filter" to be a function');
            if (r = r || null,
            a = (s = Object.keys(e)).length - 1,
            l = {},
            i) {
                if ("number" == typeof i)
                    i = Object.seal(Object.create(u.prototype, {
                        input: {
                            value: []
                        },
                        output: {
                            value: []
                        },
                        level: {
                            value: -1,
                            writable: !0
                        },
                        max: {
                            value: i,
                            writable: !1
                        }
                    }));
                else if (~(n = i.input.indexOf(e)))
                    return i.output[n];
                for (i.level += 1,
                i.input.push(e),
                i.output.push(l),
                n = a + 1; n--; )
                    "object" === t(h = e[o = s[a - n]]) && h && i.level < i.max && (r ? r(h) : h.constructor === Object) && (h = u(h, i, r)),
                    l[o.toLowerCase()] = h;
                i.level -= 1
            } else
                for (n = a + 1; n--; )
                    l[(o = s[a - n]).toLowerCase()] = e[o];
            return l
        }
    }
      , Z = new Map
      , K = new Map;
    function $(e, t, i) {
        var r = e.get(t);
        return r || (r = new RegExp(t,i),
        e.set(t, r)),
        r
    }
    function ee(e, t) {
        if (t) {
            var i = K.get(t);
            return i || (i = new Map,
            K.set(t, i)),
            $(i, e, t)
        }
        return $(Z, e)
    }
    String.prototype._removeAt = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return e >= this.length ? this : this.slice(0, e) + this.slice(e + t)
    }
    ,
    String.prototype._startsWith = function(e) {
        return this.slice(0, e.length) === e
    }
    ,
    String.prototype._getPath = function() {
        var e = this.lastIndexOf("\\")
          , t = this.lastIndexOf("/")
          , i = e > t ? e : t;
        return this.substring(0, i)
    }
    ,
    String.prototype._getExtension = function() {
        var e = this.split(".");
        if (e.length > 1) {
            var t = e.pop()
              , i = t.indexOf("?");
            return -1 !== i ? t.substring(0, i) : t
        }
        return ""
    }
    ,
    String.prototype._getFileName = function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
          , t = this.indexOf("\\") >= 0 ? this.lastIndexOf("\\") : this.lastIndexOf("/");
        if (-1 === t)
            return e ? this : this.split(".")[0];
        var i = this.substring(t);
        return 0 !== i.indexOf("\\") && 0 !== i.indexOf("/") || (i = i.substring(1)),
        e ? i : i.split(".")[0]
    }
    ,
    String.prototype._trimLeft = function(e) {
        void 0 === e && (e = "s");
        var t = ee("^[" + e + "]+");
        return this.replace(t, "")
    }
    ,
    String.prototype._trimRight = function(e) {
        void 0 === e && (e = "s");
        var t = ee("[" + e + "]+$");
        return this.replace(t, "")
    }
    ,
    String.prototype._trimBoth = function(e) {
        return this._trimLeft(e)._trimRight(e)
    }
    ,
    String.prototype._appendPath = function(e) {
        return this._trimRight("/") + "/" + e._trimLeft("/")._trimRight("/")
    }
    ,
    String.prototype._appendURL = function(e) {
        var t = this._getFileName();
        return t._startsWith("?") ? this._getPath()._appendPath(e) + t : this._appendPath(e)
    }
    ;
    var te = THREE.TextureLoader.prototype.load;
    THREE.TextureLoader.prototype.load = function(e, t, i, r) {
        if (this.enableStaticImage) {
            var n = new THREE.Texture;
            return n.image = Y,
            n.format = THREE.RGBAFormat,
            n.needsUpdate = !0,
            t && t(n),
            n
        }
        return te.call(this, e, t, i, r)
    }
    ;
    var ie = function() {
        function e(t) {
            i(this, e),
            this._major = 0,
            this._minor = 0,
            this._modified = 0;
            var r = t.split(".");
            this._major = parseInt(r.length >= 1 ? r[0] : 0),
            this._minor = parseInt(r.length >= 2 ? r[1] : 0),
            this._modified = parseInt(r.length >= 3 ? r[2] : 0)
        }
        return n(e, [{
            key: "compare",
            value: function(t) {
                return Q.isString(t) && (t = new e(t)),
                this._major != t._major ? this._major > t._major ? 1 : -1 : this._minor != t._minor ? this._minor > t._minor ? 1 : -1 : this._modified != t._modified ? this._modified > t._modified ? 1 : -1 : 0
            }
        }, {
            key: "major",
            get: function() {
                return this._major
            }
        }, {
            key: "minor",
            get: function() {
                return this._minor
            }
        }, {
            key: "modified",
            get: function() {
                return this._modified
            }
        }]),
        e
    }()
      , re = function() {
        function e(t) {
            i(this, e);
            var r = t.split(" ");
            this.initYear(r[0]),
            this.initTime(r[1])
        }
        return n(e, [{
            key: "initYear",
            value: function(e) {
                var t = e.split("-");
                this._year = parseInt(t[0], 10),
                this._month = parseInt(t[1], 10),
                this._date = parseInt(t[2], 10)
            }
        }, {
            key: "initTime",
            value: function(e) {
                var t = e.split(":");
                this._hours = parseInt(t[0], 10),
                this._minutes = parseInt(t[1], 10),
                this._seconds = parseInt(t[2], 10)
            }
        }, {
            key: "getYear",
            value: function() {
                return this._year
            }
        }, {
            key: "getMonth",
            value: function() {
                return this._month - 1
            }
        }, {
            key: "getDate",
            value: function() {
                return this._date
            }
        }, {
            key: "getHours",
            value: function() {
                return this._hours
            }
        }, {
            key: "getMinutes",
            value: function() {
                return this._minutes
            }
        }, {
            key: "getSeconds",
            value: function() {
                return this._seconds
            }
        }]),
        e
    }()
      , ne = function() {
        function e() {
            i(this, e)
        }
        return n(e, [{
            key: "GLTF_decoder_1_count",
            value: function(e, t, i, r) {
                return 0 == e ? r - t : e % 2 ? i % 2 ? r + t : r : r - t
            }
        }, {
            key: "GLTF_decoder_1_offset",
            value: function(e, t, i, r) {
                return 0 == e ? r : e % 2 ? r - (t *= i) : r
            }
        }, {
            key: "GLTF_decoder_1_length",
            value: function(e, t, i, r, n) {
                return t *= i,
                0 == e ? n - t : e % 2 ? r % 2 ? n + t : n : n - t
            }
        }, {
            key: "GLTF_decoder_2_offset",
            value: function(e, t, i, r) {
                return e % 2 ? r - (t *= i) : r
            }
        }, {
            key: "GLTF_decoder_2_length",
            value: function(e, t, i, r, n) {
                return t *= i,
                e % 2 ? r % 2 ? n + t : n : n - t
            }
        }, {
            key: "GLTF_decoder_3_offset",
            value: function(e, t, i, r) {
                return e % 2 ? r - (t *= i) : r
            }
        }, {
            key: "GLTF_decoder_3_length",
            value: function(e, t, i, r, n) {
                return t *= i,
                e % 2 ? r % 2 ? n + t : n : n - t
            }
        }]),
        e
    }()
      , DRACOLoader = function() {
        function e(t, r) {
            i(this, e),
            this._decoder = {},
            this._nameDecoder = {},
            r ? (r.data = Q.objectKeysToLowerCase(t),
            this._init(r.data)) : this._init(t)
        }
        return n(e, [{
            key: "_initDecoder",
            value: function(e) {
                var t = e.createtime;
                if (t) {
                    var i = new re(t)
                      , r = i.getSeconds();
                    this._decoder.version = Math.floor(r / 10);
                    for (var n = e.size, o = 1, s = 0; s < n.length; s++) {
                        var a = n[s].toString();
                        -1 !== a.indexOf(".") && (o += Math.floor(a.substring(a.length - 1)))
                    }
                    this._decoder.randomWeight = o,
                    this._decoder.randomRanges = [i.getHours() + 1, i.getDate() + 1, i.getSeconds() % 13 + 1, i.getMinutes() % 13 + 1, o % 5 * (o % 5) + 1, e.verts % 13 + 1, e.faces % 13 + 1, e.nodes % 13 + 1]
                }
            }
        }, {
            key: "_nodecode_name",
            value: function(e, t) {
                return e
            }
        }, {
            key: "_decode21_name",
            value: function(e, t) {
                var i = ["F7WD3HNR2OPYV6AUS5TKM018ZBJL4EQXIGC9F", "A0JQM9PSLXF18647URV3DNHOCY52TEZBWIGKA", "B0IE6Q4S3C7OA28UHTPXDW9NYMGLF1K5VJRZB", "EQ72MKL3DYNF5RU1PWBT64X9CIZVJHS8G0OAE"]
                  , r = e.charAt(0)
                  , n = i[1].indexOf(r);
                if (-1 !== n) {
                    n++,
                    n = Math.floor(n / 2) + 1;
                    var o = (e = e._removeAt(n))._getExtension();
                    e = e._getFileName(!1);
                    for (var s = "", a = 0; a < e.length; a++) {
                        var l = e[a]
                          , u = i[(a + 1 + t) % 4]
                          , c = u.indexOf(l);
                        0 === c ? c = 35 : c--,
                        s += u[c]
                    }
                    return o ? s + "." + o : s
                }
            }
        }, {
            key: "_decode23_name",
            value: function(e, t) {
                var i = ["T64X9CIZVYNF5RU1PWBJHS8G0OAEQ72MKL3DT"]
                  , r = e.charAt(0)
                  , n = i[0].indexOf(r);
                if (-1 !== n) {
                    n++,
                    n = Math.floor(n / 2) + 1;
                    var o = (e = e._removeAt(n))._getExtension();
                    e = e._getFileName(!1);
                    for (var s = "", a = 0; a < e.length; a++) {
                        var l = e[a]
                          , u = i[0]
                          , c = u.indexOf(l);
                        0 === c ? c = 35 : c--,
                        s += u[c]
                    }
                    return o ? s + "." + o : s
                }
            }
        }, {
            key: "_initResourceDecoder",
            value: function(e, t) {
                var i = t.texfiles;
                if (i) {
                    var r = new ie(e)
                      , n = this._nodecode_name;

                    2 == r.major && 1 == r.minor ? n = this._decode21_name 
                        : 
                        2 == r.major && 3 == r.minor && (n = this._decode23_name);

                    var o = Object.keys(i).length
                      , s = t.gltffiles || t.modelfiles;
                    if (s)
                        for (var a = 0; a < s.length; a++)
                            s[a] = n(s[a], o);
                    var l = t.lod;
                    if (l) {
                        var u = Object.keys(l);
                        for (a = 0; a < u.length; a++) {
                            var c = u[a];
                            l[n(c, o)] = l[c],
                            delete l[c]
                        }
                    }
                    this._nameDecoder.version = r,
                    this._nameDecoder.decodeFunc = n
                }
            }
        }, {
            key: "_init",
            value: function(e) {
                if (e) {
                    var t = e.version;
                    if (t)
                        new ie(t).compare("2.0") <= 0 || (this._initDecoder(e),
                        this._initResourceDecoder(t, e))
                }
            }
        }, {
            key: "_decode_lt_2_2",
            value: function(e, t, i) {
                var r = new ne
                  , n = this._nameDecoder.version
                  , o = n && 2 == n.major && 2 == n.minor;
                switch (this._decoder.version) {
                case 0:
                case 3:
                    var s = this._decoder.randomWeight;
                    if ("_accessors" == t)
                        for (var a = 0; a < i.length; a++) {
                            var l = i[a];
                            if (!o || void 0 !== l.byteType)
                                (u = e.bufferViews[l.bufferView]).factor = Math.floor(u.byteLength / l.count),
                                u.opFactor = l.byteType,
                                l.count = r.GLTF_decoder_1_count(a, s, l.byteType, l.count),
                                delete l.byteType
                        }
                    else if ("_bufferViews" == t)
                        for (a = 0; a < i.length; a++) {
                            var u = i[a];
                            if (!o || void 0 !== u.byteType) {
                                var c = u.factor;
                                u.byteOffset = r.GLTF_decoder_1_offset(a, s, c, Q.parseValue(u.uinOffset, u.byteOffset)),
                                u.byteLength = r.GLTF_decoder_1_length(a, s, c, u.opFactor, u.byteLength),
                                delete u.factor,
                                delete u.opFactor
                            }
                        }
                    break;
                case 1:
                case 4:
                    var h = this._decoder.randomRanges;
                    if ("_accessors" == t)
                        for (a = 0; a < i.length; a++) {
                            l = i[a];
                            if (!o || void 0 !== l.byteType) {
                                (u = e.bufferViews[l.bufferView]).factor = Math.floor(u.byteLength / l.count),
                                u.opFactor = l.byteType;
                                s = h[Math.floor(a / 2) % 8] + (a + 1) % 7;
                                l.count = r.GLTF_decoder_1_count(a, s, l.byteType, l.count),
                                delete l.byteType
                            }
                        }
                    else if ("_bufferViews" == t)
                        for (a = 0; a < i.length; a++) {
                            u = i[a];
                            if (!o || void 0 !== u.byteType) {
                                var p = h[Math.floor(a / 2) % 8] + (a + 1) % 7;
                                c = u.factor;
                                u.byteOffset = r.GLTF_decoder_2_offset(a, p, c, Q.parseValue(u.uinOffset, u.byteOffset)),
                                u.byteLength = r.GLTF_decoder_2_length(a, p, c, u.opFactor, u.byteLength),
                                delete u.factor,
                                delete u.opFactor
                            }
                        }
                    break;
                case 2:
                case 5:
                    this._decoder.randomRanges3 = [this._decoder.randomRanges[7], 7 * e.materials.length % 10];
                    var d = (e.buffers[0].byteLength - 999).toString();
                    for (a = 0; a < d.length; a++) {
                        var f = 10 - Math.floor(d[a]);
                        this._decoder.randomRanges3.push(f)
                    }
                    this._decoder.randomRanges3.push(this._decoder.randomRanges[3]);
                    h = this._decoder.randomRanges3;
                    if ("_accessors" == t)
                        for (a = 0; a < i.length; a++) {
                            l = i[a];
                            if (!o || void 0 !== l.byteType) {
                                u = e.bufferViews[l.bufferView],
                                s = h[Math.floor(a / 2) % h.length] + Math.floor(a + 1) % 7;
                                u.factor = Math.floor(u.byteLength / l.count),
                                u.opFactor = l.byteType,
                                l.count = r.GLTF_decoder_1_count(a, s, l.byteType, l.count),
                                delete l.byteType
                            }
                        }
                    else if ("_bufferViews" == t)
                        for (a = 0; a < i.length; a++) {
                            u = i[a];
                            if (!o || void 0 !== u.byteType) {
                                p = h[Math.floor(a / 2) % h.length] + Math.floor(a + 1) % 7,
                                c = u.factor;
                                u.byteOffset = r.GLTF_decoder_3_offset(a, p, c, Q.parseValue(u.uinOffset, u.byteOffset)),
                                u.byteLength = r.GLTF_decoder_3_length(a, p, c, u.opFactor, u.byteLength),
                                delete u.factor,
                                delete u.opFactor
                            }
                        }
                }
            }
        }, {
            key: "_decode_2_3",
            value: function(e, t) {
                if ("_accessors" == e)
                    for (var i = 0; i < t.length; i++) {
                        t[i].count--
                    }
                else if ("_bufferViews" == e)
                    for (i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.byteOffset--,
                        r.byteLength--
                    }
            }
        }, {
            key: "decode",
            value: function(e, t, i) {
                var r = this._nameDecoder.version;
                r && (r.major <= 2 && r.minor <= 2 ? this._decode_lt_2_2(e, t, i) : 2 == r.major && 3 == r.minor && this._decode_2_3(t, i));
                var n = this._nameDecoder.decodeFunc;
                if (n && ("_buffers" == t || "_images" == t))
                    for (var o = e.buffers.length + e.images.length, s = 0; s < i.length; s++) {
                        var a = n(i[s].uri, o);
                        a && (i[s].uri = a)
                    }
            }
        }, {
            key: "decodeDracoFile",
            value: function(e, t, i) {}
        }]),
        e
    }();
    var se = {
        process: function(e, t) {
            var i = [];
            e.traverse((function(e) {
                !function(e, t) {
                    if (e.material && e.material.userData && e.material.userData.gltfExtensions) {
                        var i = e.material.userData.gltfExtensions.blend;
                        if (i) {
                            var r, n, o, s = e.material.__texture, a = e.geometry.index.count, l = [{
                                materialIndex: 0,
                                start: 0,
                                count: a
                            }], u = [e.material], c = !1, h = !1;
                            for (e.material.defines && e.material.defines.USE_ALPHAINDEX && (c = !0),
                            e.material.skinning && (h = !0),
                            r = 0; r < i.length; r++)
                                (n = t[i[r].subMaterial].clone()) && (n.transparent = !0,
                                c && (n.defines = n.defines || {},
                                n.defines.USE_ALPHAINDEX = !0),
                                h && (n.skinning = !0),
                                i[r].maskTexture && (1 === (o = i[r].maskTexture.texCoord || 0) && (n.defines.USE_ALPHA_UV2 = ""),
                                2 === o && (n.defines.USE_ALPHA_UV3 = ""),
                                i[r].maskTexture.extensions && (n.userData.gltfExtensions.alphaTexture = i[r].maskTexture.extensions),
                                n.alphaMap = s[r],
                                n.needsUpdate = !0),
                                u.push(n),
                                l.push({
                                    materialIndex: u.length - 1,
                                    start: 0,
                                    count: a
                                }));
                            e.material = u,
                            e.geometry.groups = l
                        }
                    }
                }(e, t),
                function(e) {
                    e.isMesh && (e.castShadow = !0,
                    e.receiveShadow = !0)
                }(e),
                function(e) {
                    e.material && (Array.isArray(e.material) ? e.material.forEach((function(e) {
                        e.map && (e.userData.gltfExtensions.useDiffuseUV2 && (e.defines = e.defines || {},
                        e.defines.USE_DIFFUSE_UV2 = ""),
                        e.map.anisotropy = 16,
                        e.map.needsUpdate = !0)
                    }
                    )) : e.material.map && (e.material.userData.gltfExtensions.useDiffuseUV2 && (e.material.defines = e.material.defines || {},
                    e.material.defines.USE_DIFFUSE_UV2 = ""),
                    e.material.map.anisotropy = 16,
                    e.material.map.needsUpdate = !0))
                }(e),
                function(e) {
                    if (e.userData && e.userData.gltfExtensions) {
                        if (e.userData.gltfExtensions.effects && (e.technique = {},
                        e.userData.gltfExtensions.effects.skipGlow && (e.technique.middleGlow = "skip",
                        e.traverse((function(e) {
                            (e.isMesh || e.isLine || e.isSprite || e.isPoints) && (e.technique = e.technique || {},
                            e.technique.middleGlow = "skip",
                            e._cachedTechnique = e._cachedTechnique || {},
                            e._cachedTechnique.middleGlow = "skip")
                        }
                        ))),
                        (e.userData.gltfExtensions.effects.bloom || e.userData.gltfExtensions.effects.glow) && (e.technique.middleGlow = !0,
                        e.traverse((function(e) {
                            (e.isMesh || e.isLine || e.isSprite || e.isPoints) && (e.technique = e.technique || {},
                            e.technique.middleGlow = !0,
                            e._cachedTechnique = e._cachedTechnique || {},
                            e._cachedTechnique.middleGlow = !0)
                        }
                        ))),
                        e.userData.gltfExtensions.effects.skipInnerGlow && (e.technique.innerGlow = "skip",
                        e.traverse((function(e) {
                            (e.isMesh || e.isLine || e.isSprite || e.isPoints) && (e.technique = e.technique || {},
                            e.technique.innerGlow = "skip",
                            e._cachedTechnique = e._cachedTechnique || {},
                            e._cachedTechnique.innerGlow = "skip")
                        }
                        ))),
                        (e.userData.gltfExtensions.effects.glowInset || e.userData.gltfExtensions.effects.innerGlow) && (e.technique.innerGlow = !0,
                        e.traverse((function(e) {
                            (e.isMesh || e.isLine || e.isSprite || e.isPoints) && (e.technique = e.technique || {},
                            e.technique.innerGlow = !0,
                            e._cachedTechnique = e._cachedTechnique || {},
                            e._cachedTechnique.innerGlow = !0)
                        }
                        ))),
                        e.userData.gltfExtensions.effects.skipOutline && (e.userData.skipOutline = !0,
                        e.traverse((function(t) {
                            (t.isMesh || t.isLine || t.isSprite || t.isPoints) && (e.userData = e.userData || {},
                            e.userData.skipOutline = !0)
                        }
                        ))),
                        e._cachedTechnique = JSON.parse(JSON.stringify(e.technique)),
                        delete e.userData.effects),
                        void 0 !== e.userData.gltfExtensions.renderOrder) {
                            var t = Number(e.userData.gltfExtensions.renderOrder);
                            e.traverse((function(e) {
                                (e.isMesh || e.isLine || e.isSprite || e.isPoints) && (e.renderOrder = t)
                            }
                            ))
                        }
                        void 0 !== e.userData.gltfExtensions.castShadows && (e.castShadow = !!e.userData.gltfExtensions.castShadows),
                        void 0 !== e.userData.gltfExtensions.receiveShadows && (e.receiveShadow = !!e.userData.gltfExtensions.receiveShadows)
                    }
                }(e),
                function(e, t) {
                    if (e.userData && e.userData.gltfExtensions && e.userData.gltfExtensions.wireframe) {
                        var i = e.userData.gltfExtensions;
                        if (2 == i.wireframe.type) {
                            if (i.wireframe.wireframeVerts) {
                                var r = []
                                  , n = [];
                                i.wireframe.wireframeVerts.forEach((function(e) {
                                    var t = JSON.parse(e.pos1)
                                      , i = JSON.parse(e.pos2)
                                      , o = JSON.parse(e.uv1)
                                      , s = JSON.parse(e.uv2);
                                    r.push(t[0], t[1], t[2], i[0], i[1], i[2]),
                                    n.push(o[0], o[1], s[0], s[1])
                                }
                                ));
                                var o = new THREE.BufferGeometry;
                                o.setAttribute("position", new THREE.Float32BufferAttribute(r,3)),
                                o.setAttribute("uv", new THREE.Float32BufferAttribute(n,2));
                                var s = e.material;
                                if (!s && e.children[0] && (s = e.children[0].material),
                                Array.isArray(s) && (s = s[0]),
                                s.defines.USE_ALPHAINDEX || s.vertexColors === THREE.VertexColors) {
                                    var a = s.clone();
                                    a.vertexColors = 0,
                                    a.defines && delete a.defines.USE_ALPHAINDEX,
                                    a.userData = s.userData || {},
                                    s = a
                                }
                                var l = new THREE.LineSegments(o,s);
                                l.userData.skipStyle = !0,
                                l.technique = e.technique,
                                l.material.flatShading = !0,
                                l.renderOrder = 1,
                                t.push(e),
                                e.parent.add(l)
                            }
                        } else
                            3 == i.wireframe.type && e.children.slice().forEach((function(r) {
                                if (r.isMesh) {
                                    var n, o = new THREE.EdgesGeometry(r.geometry,i.wireframe.wireframeThreshold || .1);
                                    Array.isArray(r.material) ? (n = (n = r.material.map((function(e) {
                                        return new THREE.MeshBasicMaterial({
                                            color: e.color,
                                            map: e.map,
                                            alphaMap: e.alphaMap,
                                            transparent: e.transparent,
                                            depthWrite: e.depthWrite,
                                            blending: e.blending
                                        })
                                    }
                                    )))[0]).userData = r.material[0].userData || {} : (n = new THREE.MeshBasicMaterial({
                                        color: r.material.color,
                                        map: r.material.map,
                                        alphaMap: r.material.alphaMap,
                                        transparent: r.material.transparent,
                                        depthWrite: r.material.depthWrite,
                                        blending: r.material.blending
                                    })).userData = r.material.userData || {};
                                    var s = new THREE.LineSegments(o,n);
                                    s.userData.skipStyle = !0,
                                    s.name = r.name,
                                    s.position.copy(r.position),
                                    s.scale.copy(r.scale),
                                    s.quaternion.copy(r.quaternion),
                                    s.technique = r.technique,
                                    s.material.flatShading = !0,
                                    s.renderOrder = 1,
                                    e.add(s),
                                    t.push(r)
                                }
                            }
                            ));
                        delete i.wireframe
                    }
                }(e, i)
            }
            )),
            i.forEach((function(e) {
                e.parent && e.parent.remove(e)
            }
            ))
        }
    }
      , GLTFLoader = function() {
        function e(t) {
            i(this, e),
            this._manager = e.defaultManager || t,
            this._loader = new __GLTFLoader(this._manager)
        }
        return n(e, [{
            key: "_ProcessProgressCallback",
            value: function(e, t, i) {
                var r = 0;
                t.lengthComputable && t.total > 0 ? t.target.readyState > 1 && (r = t.loaded / t.total) : r = 1,
                i && 1 == (r *= (i.cur + 1) / i.total) && i.cur++,
                e({
                    progress: r
                })
            }
        }, {
            key: "_loadGLTFs",
            value: function(e, t, i, r, n, o, s, a, l, u) {
                var c = this
                  , h = this._loader;
                h.loadingIndex = r,
                h.setDRACOLoader(e),
                h.setCrossOrigin("anonymous");
                var p = (i.gltffiles || i.modelfiles)[r]
                  , d = t._appendURL(p)
                  , f = i.lod;
                this.load(d, (function(e) {
                    if (f) {
                        var t = p._getFileName(!1)
                          , i = f[t];
                        Q.isNumber(i) || (console.error("The '" + t + "' distance is invalid, please check name is existing in index.json"),
                        i = 1e4),
                        n.addLevel(e.scene, i)
                    } else
                        n.add(e.scene);
                    o.models[r] = {
                        node: e.scene,
                        animations: e.animations,
                        materials: e.materials
                    },
                    e.animations && e.animations.length && (o.animations = e.animations),
                    o.loadedNumber++,
                    o.loadedNumber === o.totalNumber && a && a({
                        url: d._getPath(),
                        node: n,
                        models: o.models
                    })
                }
                ), (function(e) {
                    s && c._ProcessProgressCallback(s, e, o)
                }
                ), (function(e) {
                    if (l)
                        return l(e)
                }
                ), u)
            }
        }, {
            key: "loadGLTFs",
            value: function(e, t, i, r, n, o, s) {
                var a;
                t && null != i && i(t),
                a = t.lod ? new THREE.LOD : new THREE.Group;
                var l = t.gltffiles || t.modelfiles
                  , u = {
                    loadedNumber: 0,
                    totalNumber: l.length,
                    cur: 0,
                    total: l.length
                }
                  , c = {};
                u.models = [];
                for (var h = new DRACOLoader(t,c), p = 0; p < l.length; p++)
                    this._loadGLTFs(h, e, c.data, p, a, u, n, r, o, s)
            }
        }, {
            key: "loadGLTF",
            value: function(e, t, i, r, n, o, s) {
                t = t || {};
                var a, l = {}, u = this._loader;
                u.setDRACOLoader(new DRACOLoader(t,l)),
                u.setCrossOrigin("anonymous"),
                t = l.data,
                null != i && i(t);
                var c = t.gltffiles || t.modelfiles;
                a = c && c.length ? e._appendURL(c[0]) : e._appendURL("scene.gltf");
                var h = this;
                this.load(a, (function(e) {
                    null != r && r({
                        url: a._getPath(),
                        node: e.scene,
                        animations: e.animations,
                        materials: e.materials
                    })
                }
                ), (function(e) {
                    n && h._ProcessProgressCallback(n, e)
                }
                ), (function(e) {
                    if (o)
                        return o(e)
                }
                ), s)
            }
        }, {
            key: "downloadGLTF",
            value: function(e, t, i, r, n) {
                var o = this;
                this.load(e, (function(i) {
                    null != t && t({
                        url: e,
                        node: i.scene,
                        animations: i.animations,
                        materials: i.materials
                    })
                }
                ), (function(e) {
                    i && o._ProcessProgressCallback(i, e)
                }
                ), (function(e) {
                    if (r)
                        return r(e)
                }
                ), n)
            }
        }, {
            key: "downloadGLTFPackage",
            value: function(e, t, i, r, n, o) {
                var s = e._appendURL("index.json")
                  , a = this;
                new THREE.FileLoader(this._manager).load(s, (function(s) {
                    if (s)
                        try {
                            var l = Q.objectKeysToLowerCase(JSON.parse(s));
                            l.max && ((o = o || {}).useRGBAOMap = !0);
                            var u = l.gltffiles || l.modelfiles;
                            if (u && 0 !== u.length) {
                                for (var c = 0; c < u.length; c++)
                                    u[c] || u.splice(c--, 1);
                                1 === u.length ? a.loadGLTF(e, l, t, i, r, n, o) : a.loadGLTFs(e, l, t, i, r, n, o)
                            } else
                                a.loadGLTF(e, l, t, i, r, n, o)
                        } catch (e) {
                            console.error(e),
                            n && n(e)
                        }
                }
                ), (function() {}
                ), (function(o) {
                    var s = !1;
                    n && (s = n(o)),
                    s || a.loadGLTF(e, null, t, i, r, n)
                }
                ))
            }
        }, {
            key: "downloadJSON",
            value: function(e, t, i) {
                (new THREE.JSONLoader).load(e, (function(i, r) {
                    for (var n in r)
                        r[n].skinning = !0;
                    null != t && t({
                        url: e,
                        geometry: i,
                        materials: r
                    })
                }
                ))
            }
        }, {
            key: "loadFromURL",
            value: function(e) {
                var t = e.url
                  , i = e.useStaticImage
                  , r = e.onLoadTexture
                  , n = e.jsonCallback
                  , o = e.modelCallback
                  , s = e.progressCallback
                  , a = e.errorCallback
                  , l = t._getExtension()
                  , u = {};
                i && (u.staticImage = Q.diffuseImage),
                r && (u.onLoadTexture = r),
                "js" == l ? this.downloadJSON(t, o, u) : "gltf" == l || "glb" == l ? this.downloadGLTF(t, o, s, a, u) : this.downloadGLTFPackage(t, n, o, s, a, u)
            }
        }, {
            key: "load",
            value: function(e, t, i, r, n) {
                this._loader.load(e, (function(e) {
                    se.process(e.scene, e.materials),
                    t && t(e)
                }
                ), i, r, n);
                var o = this;
                return {
                    then: function(resolve, a) {
                        return o._loader.load(e, (function(e) {
                            se.process(e.scene, e.materials),
                            t && t(e),
                            resolve(e)
                        }
                        ), i, (function(e) {
                            r && r(e),
                            a(e)
                        }
                        ), n),
                        this
                    }
                }
            }
        }, {
            key: "setCrossOrigin",
            value: function(e) {
                return this._loader.setCrossOrigin(e),
                this
            }
        }, {
            key: "setPath",
            value: function(e) {
                return this._loader.setPath(e),
                this
            }
        }, {
            key: "setResourcePath",
            value: function(e) {
                return this._loader.setResourcePath(e),
                this
            }
        }]),
        e
    }()
      , JSONXLoader = function() {
        function e(t, r) {
            i(this, e);
            var n = JSON.parse(t);
            this._asset = n.asset,
            this._scene = n.scene,
            this._scenes = n.scenes,
            this._extensionsUsed = n.extensionsUsed,
            this._extensions = n.extensions,
            this._nodes = n.nodes,
            this._accessors = n.accessors,
            this._images = n.images,
            this._skins = n.skins,
            this._meshes = n.meshes,
            this._textures = n.textures,
            this._samplers = n.samplers,
            this._materials = n.materials,
            this._cameras = n.cameras,
            this._animations = n.animations,
            this._buffers = n.buffers,
            this._bufferViews = n.bufferViews,
            this._meshReferences = n.meshReferences,
            this._meshUses = n.meshUses,
            this._init(r)
        }
        return n(e, [{
            key: "_init",
            value: function(e) {
                var dracoLoader = e.dracoLoader;
                if (dracoLoader)
                    for (var i = Object.keys(this), r = 0; r < i.length; r++) {
                        var n = i[r]
                          , o = this[n];
                        o && dracoLoader.decode(this, n, o)
                    }
            }
        }, {
            key: "asset",
            get: function() {
                return this._asset
            }
        }, {
            key: "scene",
            get: function() {
                return this._scene
            }
        }, {
            key: "scenes",
            get: function() {
                return this._scenes
            }
        }, {
            key: "extensionsUsed",
            get: function() {
                return this._extensionsUsed
            }
        }, {
            key: "extensions",
            get: function() {
                return this._extensions
            }
        }, {
            key: "nodes",
            get: function() {
                return this._nodes
            }
        }, {
            key: "accessors",
            get: function() {
                return this._accessors
            }
        }, {
            key: "images",
            get: function() {
                return this._images
            }
        }, {
            key: "skins",
            get: function() {
                return this._skins
            }
        }, {
            key: "meshes",
            get: function() {
                return this._meshes
            }
        }, {
            key: "textures",
            get: function() {
                return this._textures
            }
        }, {
            key: "samplers",
            get: function() {
                return this._samplers
            }
        }, {
            key: "materials",
            get: function() {
                return this._materials
            }
        }, {
            key: "cameras",
            get: function() {
                return this._cameras
            }
        }, {
            key: "animations",
            get: function() {
                return this._animations
            }
        }, {
            key: "buffers",
            get: function() {
                return this._buffers
            }
        }, {
            key: "bufferViews",
            get: function() {
                return this._bufferViews
            }
        }, {
            key: "meshReferences",
            set: function(e) {
                this._meshReferences = e
            },
            get: function() {
                return this._meshReferences
            }
        }, {
            key: "meshUses",
            set: function(e) {
                this._meshUses = e
            },
            get: function() {
                return this._meshUses
            }
        }]),
        e
    }();
    JSON.parseX = function(e, t) {
        try {
            return new JSONXLoader(e,t)
        } catch (e) {
            return console.error(e),
            null
        }
    }
    ,
    JSONXLoader.prototype.toJSON = function() {}
    ,
    "undefined" != typeof THREE && (THREE.GLTFLoader = GLTFLoader),
    ouputOBJ.GLTFLoader = GLTFLoader,
    ouputOBJ.JSONXLoader = JSONXLoader,
    Object.defineProperty(ouputOBJ, "__esModule", {
        value: !0
    })
}
))