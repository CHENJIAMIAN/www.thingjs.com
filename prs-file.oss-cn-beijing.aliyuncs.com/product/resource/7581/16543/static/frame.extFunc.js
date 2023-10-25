{
    THING.THEMEVERSION = "1.0.9";
    let proximaOptions = arguments[2];
    proximaOptions = proximaOptions || {};
    const app = THING.App.current;
    let campus = arguments[3];
    campus = campus || app.query('.Campus')[0];
    campus = campus.type === "Campus" ? campus : (campus.type === "Building" ? campus.parent : campus.parent.parent);
    const targetLevel = app.level.current;

    class GroundObject extends THING.BaseObject {

        // 构造函数
        constructor(app) {
            super(app);

            this._mesh = null;
            this._url = '';

            this._maskUrl = '';
            this._opacity = 0;
            this._repeatFactor = 1;
            this._glowFactor = 1;
            this._color = null;

            this._sizeFactor = 2;
            this._speed = 1;
            this._flowColor = null;
            this._groundReflect = false;
            this._groundClearance = 0.1;
            this._animationType = 'flow';// 默认flow为扫光，rotation为旋转
            this._reflectFactor = 1;
            this._repeatFactorInner = 1;
            this._repeatFactorOuter = 1;
            this.targetCampus = null;

            // 如果需要每帧更新，开启tickable
            this.tickable = true;
            this.pickable = false;
        }

        // Setup, 一些mesh的构造建议在这里执行
        customSetup(param) {
            this._url = param['url'];
            this._maskUrl = param['maskUrl'] || this._maskUrl;
            this._opacity = param['opacity'] === undefined ? this._opacity : param['opacity'];
            this._color = param['color'] || this._color;
            this._glowFactor = param['glowFactor'] === undefined ? this._glowFactor : param['glowFactor'];
            this._repeatFactor = param['repeatFactor'] === undefined ? this._repeatFactor : param['repeatFactor'];
            this._sizeFactor = param['sizeFactor'] === undefined ? this._sizeFactor : param['sizeFactor'];
            this._speed = param['animationSpeed'] === undefined ? this._speed : param['animationSpeed'];
            this._flowColor = param['flowColor'] || this._flowColor;
            this._groundReflect = param['groundReflect'] || this._groundReflect;
            this._groundClearance = param['groundClearance'] === undefined ? this._groundClearance : param['groundClearance'];
            this._animationType = param['animationType'] || this._animationType;
            this._reflectFactor = param['reflectFactor'] === undefined ? this._reflectFactor : param['reflectFactor'];
            this._reflectFactor = Math.min(this._reflectFactor, 1);
            this._repeatFactorInner = param['repeatFactorInner'] === undefined ? this._repeatFactor : param['repeatFactorInner'];
            this._repeatFactorOuter = param['repeatFactorOuter'] === undefined ? this._repeatFactor : param['repeatFactorOuter'];

            var material = this._createMaterial(this._url, this._maskUrl, this._opacity, this._repeatFactor, this._color, this._glowFactor, this._speed, this._flowColor, this._groundReflect, this._animationType);
            var geometry = new THREE.PlaneGeometry(1, 1);
            var mesh = new THREE.Mesh(geometry, material);
            this._mesh = mesh;
            this._mesh.rotation.x = -Math.PI / 2;
            this.node.add(this._mesh);
            this.pickable = false;

            this.groundColorValue = this._color;
            this.flowColorValue = this._flowColor;
            this.targetCampus = param['target'] === undefined ? this.app.query(".Campus")[0] : param['target'];

            this.updateGround();
        }


        // Update
        update(deltaTime) {
            super.update(deltaTime);
            if (this._mesh.material.type == "ShaderMaterial") {
                this._mesh.material.uniforms['time'].value += deltaTime;
            }
            return true;
        }

        // Destroy
        destroy() {
            super.destroy();
            // 释放
        }

        setMaterialRoughness(child, roughness) {
            if (child.children.length > 0) {
                this.getChilds(child.children, roughness);
            }

            if (child.material) {
                child.material.roughness = roughness;
            }
        }

        getChilds(childs, roughness) {
            for (var i = 0; i < childs.length; i++) {
                this.setMaterialRoughness(childs[i], roughness);
            }
        }

        // 切换层级后调用。用于更新地板位置和地板范围
        updateGround() {
            let target = this.app.level.current;
            if (!target) {
                target = this.targetCampus;
            }
            if (target.type === "GeoBasePoint") {
                target = this.app.query(".Campus")[0];
            }
            if (target instanceof THING.Floor || target instanceof THING.Building || target instanceof THING.Campus) {
                const bbx = target.getOrientedBox(true, false);
                const radius = bbx.size[1] / 2 + 0.2 - this.groundClearance;
                const rDis = THING.Math.scaleVector(target.up, radius);
                this.position = THING.Math.subVector(bbx.center, rDis);
                this.scale = THING.Math.scaleVector([bbx.radius, 1, bbx.radius], this._sizeFactor);
                this.worldAngles = target.worldAngles;

                if (this.groundReflect) {

                    this.app.postEffect = {
                        postEffect: {
                            enable: true,
                            screenSpaceReflection: {
                                maxRayDistance: 200,
                                pixelStride: bbx.size[1] * this._reflectFactor / 2,
                                pixelStrideZCutoff: 900,
                                screenEdgeFadeStart: 0.9,
                                eyeFadeStart: 0.4,
                                eyeFadeEnd: 0.8,
                            }
                        }
                    };
                }

                if (target instanceof THING.Campus) {
                    if (this.repeatFactorOuter) {
                        this.repeatFactorValue = this.repeatFactorOuter;
                    }
                } else {
                    if (this.repeatFactorInner) {
                        this.repeatFactorValue = this.repeatFactorInner;
                    }
                }

            } else if (!target) {
                this.position = [0, this._groundClearance, 0];
                this.scale = [this._sizeFactor, 1, this._sizeFactor];
            }

        }

        // 创建材质
        _createMaterial(url, maskUrl, opacity, repeatFactor, color, glowFactor, speed, flowColor, groundReflect, animationType) {
            var vertShaderReflect = `
                        void main() {
                         gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
                        }
                    `;

            var vertShaderDefault = `
                    varying vec2 vUv;
                    varying vec2 mapUv;
                    
                    uniform float repeatFactor;
    
                    void main() {
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
    
                     vUv=uv;
                     mapUv=uv*repeatFactor;
                    }
                `;

            var fragShaderReflect = `
                        void main() {	
                            gl_FragColor= vec4(1.,1.,1.,0.);                    
                        }
                    `;

            var fragShaderFlow = `
                    varying vec2 vUv;
                    varying vec2 mapUv;
                    
                    uniform sampler2D map;
                    uniform sampler2D maskMap;
                    uniform float time;
                    uniform float opacity;
                    uniform vec3 color;
                    uniform vec3 flowColor;
                    uniform float glowFactor;
                    uniform float speed;
    
                    void main() {	
                        float t=mod(time/5.*speed,1.);      
                        vec2 uv=abs((vUv-vec2(0.5))*2.0);
                        float dis = length(uv);
                        float r = t-dis;
                        
                        vec4 col=texture2D( map, mapUv );
                        vec3 finalCol;
                        vec4 mask = texture2D(maskMap, vec2(0.5,r));
                        finalCol = mix(color,flowColor,clamp(0.,1.,mask.a*glowFactor));
                        gl_FragColor= vec4(finalCol.rgb,(opacity+mask.a*glowFactor)*col.a*(1.-dis));                                 
                    }
                `;

            var fragShaderRotation = `
                    varying vec2 vUv;
                    varying vec2 mapUv;
                    
                    uniform sampler2D map;
                    uniform sampler2D maskMap;
                    uniform float time;
                    uniform float opacity;
                    uniform vec3 color;
                    uniform vec3 flowColor;
                    uniform float glowFactor;
                    uniform float speed;
    
                    vec2 newUV(vec2 coord,float c,float s)
                    {
                        mat2 m=mat2(c,-s,s,c);
                        return m*coord;
                    }
    
                    void main() {	
                        float t=speed*time;      
                        vec2 pivot=vec2(0.5,0.5);
                        vec2 uv=newUV((vUv-pivot),cos(t),sin(t))+pivot;
                        vec4 finalCol;
    
                        if(uv.x>0.&&uv.x<1.&&uv.y>0.&&uv.y<1.)
                        {
                            finalCol=vec4(color,opacity*texture2D( map, uv ).a);
                        }
    
                        gl_FragColor= clamp(finalCol,0.,1.);                        
                    }
                `;

            var textureLoader = new THREE.TextureLoader();
            var mainTex = textureLoader.load(url);
            mainTex.wrapS = mainTex.wrapT = THREE.RepeatWrapping;
            var maskTex = textureLoader.load(maskUrl);
            maskTex.wrapS = maskTex.wrapT = THREE.RepeatWrapping;

            var uniforms = {
                map: { value: mainTex },
                time: { value: 0. },
                opacity: { value: opacity },
                repeatFactor: { value: repeatFactor },
                maskMap: { value: maskTex },
                color: { value: color },
                glowFactor: { value: glowFactor },
                speed: { value: speed },
                flowColor: { value: flowColor }
            };

            var vertShader = groundReflect ? vertShaderReflect : vertShaderDefault;
            var fragShader = groundReflect ? fragShaderReflect : (animationType === "flow" ? fragShaderFlow : fragShaderRotation);
            var shaderMaterial = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertShader,
                fragmentShader: fragShader,
                transparent: true,
                depthWrite: false,
            });

            if (groundReflect) {
                shaderMaterial.roughness = 0.1;
            } else {
                shaderMaterial.roughness = 1;
            }

            return shaderMaterial;
        }

        /**
         * 开启地板反射
         * @type {Boolean}
         */
        set groundReflect(value) {
            this._groundReflect = value;
            this.tickable = !this._groundReflect;
            let target = this.app.level.current;
            if (!target) { return }
            if (target.type === "GeoBasePoint") {
                target = this.app.query(".Campus")[0];
            }
            if (!this.groundReflect) {
                this._mesh.material.roughness = 1;
            } else {
                this._mesh.material.roughness = 0.1;
                this.updateGround();
            }
        }

        get groundReflect() {
            return this._groundReflect;
        }

        /**
         * 地板范围
         * @type {Number}
         */
        set sizeFactor(value) {
            this._sizeFactor = value;
            this.updateGround();
        }

        get sizeFactor() {
            return this._sizeFactor;
        }

        /**
         * 切换底图
         * @type {String}
         */
        set imageUrl(value) {
            this._url = value;
            let map = new THREE.TextureLoader().load(this._url);
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            this._mesh.material.uniforms.map.value = map;
        }

        get imageUrl() {
            return this._url;
        }

        /**
         * 切换扫光图
         * @type {String}
         */
        set maskUrl(value) {
            this._maskUrl = value;
            let mask = new THREE.TextureLoader().load(this._maskUrl);
            mask.wrapS = mask.wrapT = THREE.RepeatWrapping;
            this._mesh.material.uniforms.maskMap.value = mask;
        }

        get maskUrl() {
            return this._maskUrl;
        }

        /**
         * 透明度
         * @type {Number}
         */
        set opacityValue(value) {
            this._opacity = value;
            this._mesh.material.uniforms.opacity.value = this._opacity;
        }

        get opacityValue() {
            return this._opacity;
        }

        /**
         * 扫光强度
         * @type {Number}
         */
        set glowFactorValue(value) {
            this._glowFactor = value;
            this._mesh.material.uniforms.glowFactor.value = this._glowFactor;
        }

        get glowFactorValue() {
            return this._glowFactor;
        }

        /**
         * uv重复系数
         * @type {Number}
         */
        set repeatFactorValue(value) {
            this._repeatFactor = value;
            this._mesh.material.uniforms.repeatFactor.value = this._repeatFactor;
        }

        get repeatFactorValue() {
            return this._repeatFactor;
        }

        /**
         * 室外uv重复系数
         * @type {Number}
         */
        set repeatFactorOuter(value) {
            this._repeatFactorOuter = value;
        }

        get repeatFactorOuter() {
            return this._repeatFactorOuter;
        }

        /**
         * 室内uv重复系数
         * @type {Number}
         */
        set repeatFactorInner(value) {
            this._repeatFactorInner = value;
        }

        get repeatFactorInner() {
            return this._repeatFactorInner;
        }

        /**
         * 地板颜色
         * @type {Color}
         */
        set groundColorValue(value) {
            this._color = new THREE.Color(value);
            if (this._mesh) {
                this._mesh.material.uniforms.color.value = this._color;
            }
        }

        get groundColorValue() {
            return this._color;
        }

        /**
         * 扫光颜色
         * @type {Color}
         */
        set flowColorValue(value) {
            this._flowColor = new THREE.Color(value);
            if (this._mesh) {
                this._mesh.material.uniforms.flowColor.value = this._flowColor;
            }
        }

        get flowColorValue() {
            return this._flowColor;
        }

        /**
         * 动画速度
         * @type {Number}
         */
        set animationSpeed(value) {
            this._speed = value;
            this._mesh.material.uniforms.speed.value = this._speed;
        }

        get animationSpeed() {
            return this._speed;
        }

        /**
         * 离地高度
         * @type {Number}
         */
        set groundClearance(value) {
            this._groundClearance = value;
            this.updateGround();
        }

        get groundClearance() {
            return this._groundClearance;
        }

        /**
        * 动画类型
        * @type {String}
        */
        set animationType(value) {
            this._animationType = value;
            this._mesh.material = this._createMaterial(this._url, this._maskUrl, this._opacity, this._repeatFactor, this._color, this._glowFactor, this._speed, this._flowColor, this._groundReflect, this._animationType);
        }

        get animationType() {
            return this._animationType;
        }

        /**
         * 反射影子的高度的系数
         * @type {Number}
         */
        set reflectFactor(value) {
            this._reflectFactor = value;
            this.updateGround();
        }

        get reflectFactor() {
            return this._reflectFactor;
        }

        // #endregion


    }

    if (!THING.factory.hasClass('GroundObject')) {
        THING.factory.registerClass('GroundObject', GroundObject);
    }

    //生成地板
    const setGroundDecorate = function () {
        const _createGround = function () {
            proximaOptions.themeManager._objGround = [];
            if (proximaOptions.ground.groundReflect) {
                let ground = app.create({
                    type: "GroundObject",
                    groundClearance: 0.1,
                    groundReflect: true,
                    parent: campus,
                    target: campus,
                    style: {
                        skipBoundingBox: !0,
                    },
                    reflectFactor: proximaOptions.ground.reflectFactor
                });
                ground.style.skipBoundingBox = true;
                proximaOptions.themeManager._objGround.push(ground);
            }

            if (proximaOptions.ground.enable) {
                proximaOptions.ground.item.forEach(obj => {
                    let curParam = obj;
                    Object.assign(curParam, {
                        parent: campus,
                        target: campus,
                        style: {
                            skipBoundingBox: !0
                        }
                    })
                    const finalParam = { type: 'GroundObject', ...curParam };
                    let ground = app.create(finalParam);
                    ground.style.skipBoundingBox = true;
                    proximaOptions.themeManager._objGround.push(ground);
                });
            }
        };

        const _updateGroundPos = function (force = false, ignoreFlyEnd = false) {
            if (
                force
                || app.level.current.type === 'Building'
                || (app.level.current.type === 'Floor' && (!app.level.previous || app.level.previous.type !== 'Room'))
                || app.level.current.type === 'Campus'
            ) {
                //园区层级走这里
                const showGround = function showGround() {
                    proximaOptions.themeManager._objGround.forEach(curObj => {
                        curObj.updateGround();
                    });

                    setTimeout(() => {
                        proximaOptions.themeManager._objGround.forEach(curObj => {
                            curObj.visible = true;
                        });
                    }, 250);
                };

                proximaOptions.themeManager._objGround.forEach(curObj => {
                    curObj.visible = false;
                });

                if (ignoreFlyEnd) {
                    setTimeout(() => {
                        showGround();
                    }, 0);
                } else {
                    app.one(THING.EventType.LevelFlyEnd, (ev) => {
                        setTimeout(() => {
                            showGround();
                        }, 0);
                    }, 'levelFlyEndToUpdateGround');
                }
            }else if( typeof CMAP !== 'undefined' && THING.Math.getVectorLength(campus.position) > 6300000 
			          && app.level.current.type!=="Thing" && app.level.current.type!=='Room' && app.level.current.type!=='Floor' ){
				//地球层级走这里
				if(typeof proximaOptions.ground.visibleOnEarth !== 'undefined')
				{
					//地图级别地面显示/隐藏
					proximaOptions.themeManager._objGround.forEach(curObj => {
						curObj.visible = proximaOptions.ground.visibleOnEarth;
                    });
				}
			}
			
        };

        if (!proximaOptions.themeManager._objGround) {
            _createGround();
        } else {
            _updateGroundPos();
        }

        app.on(THING.EventType.EnterLevel, () => {
            if (!proximaOptions.themeManager._objGround) {
                _createGround();
            } else {
                _updateGroundPos();
            }
        }, 'EnterLevelToSetGround', 0);
    }

    //销毁地板
    const destroyGroundDecorate = function () {
        const grounds = campus.query('.GroundObject');
        if (grounds.length > 0) {
            app.off(THING.EventType.EnterLevel, null, 'EnterLevelToSetGround');
        }
        grounds.forEach((cur) => { cur.destroy(); });
        proximaOptions.themeManager._objGround = null;
    }

    if (proximaOptions.ground && JSON.stringify(proximaOptions.ground) !== '{}') {
        destroyGroundDecorate();
        setGroundDecorate();

        console.log("%c效果模板定制化代码log————————————", "color: blue");
        console.log("%c是否开启地板反射：" + proximaOptions.ground.groundReflect, "color: blue");
        if (proximaOptions.inner && proximaOptions.inner.postEffect.screenSpaceReflection) {
            console.log("%c室内ssr是否打开：" + proximaOptions.inner.postEffect.screenSpaceReflection.enable, "color: blue");
        } else {
            console.log("%c没有室内ssr", "color: blue");
        }
        if (proximaOptions.outer && proximaOptions.outer.postEffect.screenSpaceReflection) {
            console.log("%c室外ssr是否打开：" + proximaOptions.outer.postEffect.screenSpaceReflection.enable, "color: blue");
        } else {
            console.log("%c没有室外ssr", "color: blue");
        }
        console.log("%c—————————————————————————————————", "color: blue");
    }else{
		destroyGroundDecorate();
		console.log("%c该模板没有地面反射和特效地面", "color: blue");
	}

    var readJson = function (url, item, proximaOptions) {
        const loader = new THREE.FileLoader();

        loader.load(
            url.concat('/index.json'),

            function (data) {
                try {
                    let message = data;

                    const target = campus;
                    const bbx = target.getOrientedBox(true, false);
                    const radius = bbx.size[1] / 2 + 0.2;
                    const rDis = THING.Math.scaleVector(target.up, radius);
                    const pos = THING.Math.subVector(bbx.center, rDis);
                    var data = JSON.parse(message);
                    let urlPre = url;
                    let dividend = data.listGroups[0].listEmitters[0].position.vec3Spread;
                    data.listGroups[0].texture.url = urlPre.concat(data.listGroups[0].texture.url);
                    data.listGroups[0].textureTrail.url = urlPre.concat(data.listGroups[0].textureTrail.url);

                    //最大粒子数
                    let maxCount = THING.Math.ceil(THING.Math.min(10000, item.content.density * data.listGroups[0].iMaxParticleCount * bbx.size[0] * bbx.size[2] / dividend.x / dividend.z * 4));
                    //粒子数
                    let count = THING.Math.ceil(data.listGroups[0].listEmitters[0].iParticleCount / data.listGroups[0].iMaxParticleCount * maxCount);

                    data.listGroups[0].listEmitters[0].iParticleCount = count;
                    data.listGroups[0].iMaxParticleCount = maxCount;
                    data.listGroups[0].listEmitters[0].position.vec3Spread = { x: bbx.size[0] * 2, y: item.content.height, z: bbx.size[2] * 2 };
                    let pBox = app.create({
                        type: 'BaseObject',
                        id: `粒子装饰模型父物体_${item.code}`,
                        parent: campus,
                        position: pos,
                        visible: targetLevel && targetLevel.type === 'Campus',
                    });

                    pBox.style.skipBoundingBox = true;

                    let particle = app.create({
                        type: 'ParticleSystem',
                        id: `粒子装饰模型_${item.code}`,
                        name: `粒子装饰模型_${item.code}`,
                        data: data,
                        parent: pBox,
                        localPosition: [0, item.content.offsetHeight + item.content.height / 2, 0],
                        angle: 0,
                        visible: targetLevel && targetLevel.type === 'Campus',
                    });
                    particle.style.skipBoundingBox = true;
                    particle.userData.cfg = particle.userData.cfg || {};
                    particle.userData.cfg.offsetHeight = item.content.offsetHeight + item.content.height / 2;
                    proximaOptions.themeManager._objParticle.push(particle);
                } catch (err) {
                    console.error(err);
                }
            },

            function (xhr) {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },

            // onError回调
            function (err) {
                //console.error('An error happened');
            }
        );
    }

    //生成粒子
    const setParticle = function () {
        const createParticle = function (item) {
            return new Promise((resolve) => {
                let url = item.url;
                url = url.substring(0, url.length - 1);
                readJson(url, item, proximaOptions);
            });
        }

        const createParticles = function (items) {
            proximaOptions.themeManager._objParticle = [];
            return new Promise((resolve) => {
                const objArray = [];
                let iFn = 0;
                items.forEach((item) => {
                    createParticle(item).then((obj) => {
                        objArray.push(obj);
                        iFn += 1;
                        if (iFn === items.length) {
                            resolve(objArray);
                        }
                    });
                });
            });
        }

        const updateParticles = function (force = false, ignoreFlyEnd = false) {
            if (
                force
                || app.level.current.type === 'Campus'
            ) {
                //园区层级走这里
                const showParticles = function showParticles(target) {

                    if (force && target._lastOBoundingBoxTF) {
                        target._lastOBoundingBoxTF = null;
                    }
                    const bbx = target._lastOBoundingBoxTF ? target._lastOBoundingBoxTF : target.getOrientedBox(true, false);
                    if (!target._lastOBoundingBoxTF) {
                        target._lastOBoundingBoxTF = THING.Utils.cloneObject(bbx);
                    }

                    proximaOptions.themeManager._objParticle.forEach((p) => {
                        const radius = p.userData.cfg ? (p.userData.cfg.offsetHeight ? p.userData.cfg.offsetHeight : 0) : 0;
                        const rDis = THING.Math.scaleVector(target.up, radius);

                        p.worldAngles = target.worldAngles;
                        p.position = THING.Math.subVector(bbx.center, rDis);
                        p.visible = true;
                    });
                };
                if (ignoreFlyEnd) {
                    setTimeout(() => {
                        showParticles(campus);
                    }, 1800);
                } else {
                    //目前园区只看到走这
                    app.one(THING.EventType.LevelFlyEnd, (ev) => {
                        const tar = ev.object;
                        setTimeout(() => {
                            showParticles(tar);
                        }, 250);
                    }, 'levelFlyEndToUpdateParticle');
                }
            } else if( app.level.current.type === 'Building' || app.level.current.type === 'Floor' || app.level.current.type === 'Room' ){
                //室内层级走这里
                if (proximaOptions.themeManager._objParticle) {
                    proximaOptions.themeManager._objParticle.forEach((p) => {
                        if (p.visible) {
                            p.visible = false;
                        }
                    });
                }
            }else if( typeof CMAP !== 'undefined' && THING.Math.getVectorLength(campus.position) > 6300000 && app.level.current.type!=="Thing" ){
				//地球层级走这里
				if(typeof proximaOptions.particle.visibleOnEarth !== 'undefined')
				{
					//地图级别粒子显示/隐藏
					if (proximaOptions.themeManager._objParticle) {
						proximaOptions.themeManager._objParticle.forEach((p) => {
							if (p.visible) {
								p.visible = proximaOptions.particle.visibleOnEarth;
							}
                    });
                }
				}
			}
			
        }

        createParticles(proximaOptions.particle.item).then((oa) => {
            proximaOptions.themeManager._objParticle = oa;
            updateParticles(false, true);
        });
        app.on(THING.EventType.EnterLevel, () => {
            if (!proximaOptions.themeManager._objParticle && proximaOptions.particle.item) {
                createParticles(proximaOptions.particle.item).then((oa) => {
                    proximaOptions.themeManager._objParticle = oa;
                    updateParticles(false, true);
                });
            } else {
                updateParticles();
            }
        }, 'EnterLevelToSetParticle', 0);
    };

    //销毁粒子
    const destroyParticle = function () {
        const particles = campus.query(/粒子装饰模型父物体/);
        if (particles.length > 0) {
            app.off(THING.EventType.EnterLevel, null, 'EnterLevelToSetParticle');
        }
        particles.forEach((cur) => { cur.destroy(); });
        proximaOptions.themeManager._objParticle = null;
    }

    if (proximaOptions.particle && JSON.stringify(proximaOptions.particle) !== '{}') {
        destroyParticle();
        setParticle();
    }else{
		destroyParticle();
		console.log("%c该模板没有粒子", "color: blue");
	}
}
/* 
您的代码主要是用于在THINGJS中创建一个自定义的地面对象（GroundObject），并提供一些自定义粒子效果。下面是对主要代码段的详细解释：

1. `GroundObject` 类定义：

   这是一个派生自 `THING.BaseObject` 的类，表示一个地面对象。这个类有多个自定义的属性和方法，包括 `_mesh`, `_url`, `_maskUrl`, `_opacity`, `_repeatFactor`, `_glowFactor`, `_color` 等属性，以及 `customSetup`, `update`, `destroy`, `setMaterialRoughness`, `getChilds`, `updateGround`, `_createMaterial` 等方法。

   这个类还定义了一些 getter 和 setter 方法，如 `groundReflect`, `sizeFactor`, `imageUrl`, `maskUrl`, `opacityValue`, `glowFactorValue`, `repeatFactorValue`, `repeatFactorOuter`, `repeatFactorInner`, `groundColorValue`, `flowColorValue`, `animationSpeed`, `groundClearance`, `animationType`, `reflectFactor`等，用于获取或设置地面对象的一些属性。

2. `THING.factory.registerClass('GroundObject', GroundObject);`:

   这行代码将 `GroundObject` 类注册到了 `THING.factory` 中，使得可以通过 `app.create({type: 'GroundObject'})` 创建 `GroundObject` 对象。

3. `setGroundDecorate` 函数定义：

   这个函数用于生成地面装饰，包括生成反射地面和特效地面。

4. `destroyGroundDecorate` 函数定义：

   这个函数用于销毁地面装饰，包括销毁反射地面和特效地面。

5. `readJson` 函数定义：

   这个函数用于异步读取 JSON 文件，并生成粒子装饰模型。

6. `setParticle` 函数定义：

   这个函数用于生成粒子装饰。

7. `destroyParticle` 函数定义：

   这个函数用于销毁粒子装饰。

在这段代码的最后，还进行了一些逻辑判断和调用相关函数，以根据配置生成或销毁地面装饰和粒子装饰。

请注意，这段代码需要在THINGJS环境中运行，而且依赖于THREE.js库。

*/

/* 
这段代码的特效主要包括两种：地面装饰和粒子装饰。以下是关于这两种特效的详细实现原理：

1. 地面装饰

   地面装饰是通过`GroundObject`类实现的。这个类继承了THINGJS中的BaseObject，表示一个地面对象。这个类有许多自定义的属性，这些属性用于设置地面的各种特效，包括透明度、颜色、反射强度等。

   地面装饰的实现主要在`customSetup`方法中。在这个方法中，首先会从参数中获取地面的各种属性，然后创建一个新的材质并应用到地面模型上。这个材质可以包括纹理、颜色、透明度等效果。最后，会将地面模型添加到场景中。

   地面装饰的反射效果是通过设置材质的`roughness`属性来实现的。当`roughness`为0.1时，地面会有反射效果；当`roughness`为1时，地面不会有反射效果。

2. 粒子装饰

   粒子装饰是通过`readJson`函数和`setParticle`函数实现的。在`readJson`函数中，会从指定的URL加载一个JSON文件，这个文件描述了粒子系统的配置信息。然后，使用这些配置信息创建一个新的粒子系统，并添加到场景中。

   粒子系统的实现主要依赖于THINGJS的`ParticleSystem`类。这个类提供了创建和控制粒子系统的功能。在`readJson`函数中，会根据JSON文件中的配置信息，设置粒子系统的各种属性，如粒子数量、粒子速度、粒子颜色等。

   粒子系统的动画效果是通过更新粒子的位置和状态来实现的。在每一帧，都会根据粒子的速度和方向，更新粒子的位置。同时，也会根据粒子的生命周期，控制粒子的状态（如透明度、颜色等）。

以上就是这段代码中的特效实现原理。具体的效果可能会根据配置的不同而略有差异。
*/

/* 
Shader是用于处理图形渲染的程序，主要包括顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）。在WebGL和Three.js中，Shader被用于实现各种高级图形效果。

在您的代码中，主要使用了Shader来创建地面的材质和实现地面的动画效果。下面是一些详细的解释：

1. **顶点着色器（Vertex Shader）**

   顶点着色器的主要任务是处理模型的顶点数据，计算他们最终在屏幕上的位置。在您的代码中，有两种顶点着色器：`vertShaderReflect` 和 `vertShaderDefault`。

   ``vertShaderReflect` 是用于地面反射效果的顶点着色器。它只做了一件事，就是计算了顶点在屏幕上的位置。

   ``vertShaderDefault` 是用于默认地面效果的顶点着色器。它不仅计算了顶点在屏幕上的位置，还计算了纹理坐标（uv），并根据`repeatFactor`将纹理坐标进行了缩放。

2. **片元着色器（Fragment Shader）**

   片元着色器的主要任务是处理每个像素的颜色和深度信息。在您的代码中，有三种片元着色器：`fragShaderReflect`，`fragShaderFlow`，`fragShaderRotation`。

   ``fragShaderReflect` 是用于地面反射效果的片元着色器。它将所有像素的颜色设置为透明，以实现反射效果。

   ``fragShaderFlow` 是用于"flow"动画效果的片元着色器。它首先计算了一个随时间变化的值`t`，然后根据`t`和像素的位置，计算了一个新的颜色值。这个新的颜色值是原始颜色和"flow"颜色的混合，混合的比例由`mask`控制。

   ``fragShaderRotation` 是用于"rotation"动画效果的片元着色器。它首先计算了一个随时间旋转的纹理坐标`uv`，然后根据`uv`，从纹理中采样出一个新的颜色值。

以上就是您代码中Shader部分的原理。Shader是一个非常强大的工具，可以用来实现各种各样的图形效果。理解Shader的工作原理，可以帮助您更好地使用WebGL和Three.js来创建高级的3D图形应用。
*/

// ground的item中的每个熟悉分别被代码中的哪些代码用去干什么?
/* 
`ground` 对象中 `item` 数组里的每个对象用于创建具有特定属性的地板特效。下面是每个属性的用途：

- `code`：这个属性在代码中并没有被使用，但它可能用于唯一标识每个地板特效。

- `name`：这个属性在代码中并没有被使用，但它可能用于描述地板特效的名称。

- `url`：这个属性被用于加载地板的主纹理。在 `_createMaterial` 方法中，通过 `new THREE.TextureLoader().load(this._url);` 加载纹理。

- `color`：这个属性被用于设置地板的颜色。在 `customSetup` 和 `set groundColorValue` 方法中，通过 `this._color = new THREE.Color(value);` 设置颜色。

- `opacity`：这个属性被用于设置地板的透明度。在 `customSetup` 和 `set opacityValue` 方法中，通过 `this._opacity = value;` 设置透明度。

- `maskUrl`：这个属性被用于加载地板扫光的纹理。在 `_createMaterial` 方法中，通过 `new THREE.TextureLoader().load(this._maskUrl);` 加载纹理。

- `flowColor`：这个属性被用于设置地板扫光的颜色。在 `customSetup` 和 `set flowColorValue` 方法中，通过 `this._flowColor = new THREE.Color(value);` 设置颜色。

- `glowFactor`：这个属性被用于设置地板扫光的强度。在 `customSetup` 和 `set glowFactorValue` 方法中，通过 `this._glowFactor = value;` 设置强度。

- `animationSpeed`：这个属性被用于设置地板扫光动画的速度。在 `customSetup` 和 `set animationSpeed` 方法中，通过 `this._speed = value;` 设置速度。

- `groundClearance`：这个属性被用于设置地板的离地高度。在 `customSetup` 和 `set groundClearance` 方法中，通过 `this._groundClearance = value;` 设置离地高度。

- `repeatFactor`，`repeatFactorX` 和 `repeatFactorY`：这些属性被用于设置地板纹理的重复因子。在 `customSetup` 和 `set repeatFactorValue` 方法中，通过 `this._repeatFactor = value;` 设置重复因子。

- `groundReflect`：这个属性决定是否开启地板反射效果。在 `customSetup` 和 `set groundReflect` 方法中，通过 `this._groundReflect = value;` 设置地板反射。
- `reflectFactor`：这个属性被用于设置地板反射的强度。在 `customSetup` 和 `set reflectFactor` 方法中，通过 `this._reflectFactor = value;` 设置反射强度。
- `enable`：这个属性决定是否启用特定的地板特效。在 `setGroundDecorate` 函数中，通过 `if (proximaOptions.ground.enable)` 检查此属性。
- `visibleOnEarth`：这个属性决定在地球层级中是否显示地板特效。在 `updateParticles` 和 `updateGroundPos` 函数中，通过检查 `if(typeof proximaOptions.ground.visibleOnEarth !== 'undefined')` 来使用此属性。
console.log('来使用此属性。', 来使用此属性。)
*/

// 仔细分析每个shader的原理, 需讲清楚ground 对象中 item 数组里的每个属性是如何被shader使用/用去干什么的
/* 
GPT-4-32k

Poe

在 GroundObject 类中，定义了一个 WebGL program（GLSL 程序）包含了两个主要的 shader：一个顶点着色器（vertShader）和一个片段着色器（fragShader）。这些 shader 用于处理每一个地板特效的渲染。

顶点着色器主要处理顶点的位置和纹理坐标，而片段着色器主要处理颜色、透明度、光照等效果。下面是 ground 对象中 item 数组里的每个属性在 shader 中的用途：

url：这个属性被用于加载地板的主纹理。在片段着色器（fragShaderFlow 和 fragShaderRotation）中，通过 texture2D( map, uv ); 或 texture2D( map, mapUv ); 使用主纹理。

color：这个属性被用于设置地板的颜色。在片段着色器（fragShaderFlow）中，通过 finalCol = mix(color,flowColor,clamp(0.,1.,mask.a*glowFactor)); 使用地板颜色。

opacity：这个属性被用于设置地板的透明度。在片段着色器（fragShaderFlow 和 fragShaderRotation）中，通过 gl_FragColor= vec4(finalCol.rgb,(opacity+mask.a*glowFactor)*col.a*(1.-dis)); 或 finalCol=vec4(color,opacity*texture2D( map, uv ).a); 设置透明度。

maskUrl：这个属性被用于加载地板扫光的纹理。在片段着色器（fragShaderFlow）中，通过 vec4 mask = texture2D(maskMap, vec2(0.5,r)); 使用扫光纹理。

flowColor：这个属性被用于设置地板扫光的颜色。在片段着色器（fragShaderFlow）中，通过 finalCol = mix(color,flowColor,clamp(0.,1.,mask.a*glowFactor)); 使用扫光颜色。

glowFactor：这个属性被用于设置地板扫光的强度。在片段着色器（fragShaderFlow）中，通过 finalCol = mix(color,flowColor,clamp(0.,1.,mask.a*glowFactor)); 和 gl_FragColor= vec4(finalCol.rgb,(opacity+mask.a*glowFactor)*col.a*(1.-dis)); 使用扫光强度。

animationSpeed：这个属性被用于设置地板扫光动画的速度。在片段着色器（fragShaderFlow 和 fragShaderRotation）中，通过 float t=mod(time/5.*speed,1.); 或 float t=speed*time; 使用动画速度。

repeatFactor，repeatFactorX 和 repeatFactorY：这些属性被用于设置地板纹理的重复因子。在顶点着色器（vertShaderDefault）中，通过 mapUv=uv*repeatFactor; 使用重复因子。

groundReflect ：这个属性决定是否开启地板反射效果。在 customSetup 方法中，通过设置 shaderMaterial.roughness 使用地板反射。当 groundReflect 为 true 时，shaderMaterial.roughness 设置为 0.1，否则为 1。
reflectFactor ：这个属性被用于设置地板反射的强度。在 updateGround 方法中，通过设置 app.postEffect 的 pixelStride 参数来设置反射强度，计算公式为 pixelStride: bbx.size[1] * this._reflectFactor / 2。
*/