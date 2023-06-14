MSPE.Particle = function(e) {
    "use strict";
    var utils = MSPE.utils
      , types = utils.types;
    if (null != (e = utils.ensureTypedArg(e, types.OBJECT, {})).emitter && null != e.emitter && e.emitter instanceof MSPE.Emitter) {
        if (this.emitter = e.emitter,
        this.position = {
            _value: e.emitter.position.value,
            _spread: e.emitter.position.spread,
            _spreadClamp: e.emitter.position.spreadClamp,
            _distribution: e.emitter.position.distribution,
            _randomise: e.emitter.position.randomise,
            _radius: e.emitter.position.radius,
            _radiusScale: e.emitter.position.radiusScale,
            _distributionClamp: e.emitter.position.distributionClamp
        },
        this.velocity = {
            _value: e.emitter.velocity.value,
            _spread: e.emitter.velocity.spread,
            _spreadClamp: e.emitter.velocity.spreadClamp,
            _distribution: e.emitter.velocity.distribution,
            _randomise: e.emitter.velocity.randomise,
            _radius: e.emitter.velocity.radius,
            _radiusScale: e.emitter.velocity.radiusScale,
            _distributionClamp: e.emitter.velocity.distributionClamp
        },
        this.acceleration = {
            _value: e.emitter.acceleration.value,
            _spread: e.emitter.acceleration.spread,
            _spreadClamp: e.emitter.acceleration.spreadClamp,
            _distribution: e.emitter.acceleration.distribution,
            _randomise: e.emitter.acceleration.randomise,
            _radius: e.emitter.acceleration.radius,
            _radiusScale: e.emitter.acceleration.radiusScale,
            _distributionClamp: e.emitter.acceleration.distributionClamp
        },
        this.drag = {
            _value: e.emitter.drag.value,
            _spread: e.emitter.drag.spread,
            _randomise: e.emitter.position.randomise
        },
        this.wiggle = {
            _value: e.emitter.wiggle.value,
            _spread: e.emitter.wiggle.spread
        },
        this.rotation = {
            _axis: e.emitter.rotation.axis,
            _axisSpread: e.emitter.rotation.axisSpread,
            _angle: e.emitter.rotation.angle,
            _angleSpread: e.emitter.rotation.angleSpread,
            _static: e.emitter.rotation.static,
            _center: e.emitter.rotation.center,
            _randomise: e.emitter.position.randomise
        },
        this.maxAge = {
            _value: e.emitter.maxAge.value,
            _spread: e.emitter.maxAge.spread
        },
        this.color = {
            _value: e.emitter.color.value,
            _spread: e.emitter.color.spread,
            _randomise: e.emitter.position.randomise
        },
        this.opacity = {
            _value: e.emitter.opacity.value,
            _spread: e.emitter.opacity.spread,
            _randomise: e.emitter.position.randomise
        },
        this.size = {
            _value: e.emitter.size.value,
            _spread: e.emitter.size.spread,
            _randomise: e.emitter.position.randomise
        },
        this.angle = {
            _value: e.emitter.angle.value,
            _spread: e.emitter.angle.spread,
            _randomise: e.emitter.position.randomise
        },
        this.alive = e.emitter.alive,
        this.age = 0,
        this.vec3RealPosition = this._assignPositionValue(),
        this.vec3RealVelocity = this._assignVelocityValue(),
        this.vec3RealAcceleration = this._assignAccelerationValue(),
        this.arrayRealColor = this._assignColorValue(),
        this.arrayRealOpacity = this._assignOpacityAbsLifetimeValue(),
        this.arrayRealSize = this._assignSizeAbsLifetimeValue(),
        this.arrayRealAngle = this._assignAngleValue(),
        this.fRealDrag = utils.clamp(utils.randomFloat(this.drag._value, this.drag._spread), 0, 1),
        this.fRealWiggle = utils.randomFloat(this.wiggle._value, this.wiggle._spread),
        this.fRealMaxAge = MSPE.utils.randomFloat(this.maxAge._value, this.maxAge._spread),
        this.vec3RealRotationAxis = MSPE.utils.getRotationAxis(this.rotation._axis, this.rotation._axisSpread),
        this.fRealRotationAngle = MSPE.utils.randomFloat(this.rotation._angle, this.rotation._angleSpread),
        this.uuidTrial = "",
        this.obj = this.emitter.objPool.takeAnObj(),
        null == this.obj || null == this.obj)
            return this.alive = !1,
            this.dispose(),
            null;
        for (var r in this.matrix = new THREE.Matrix4,
        this.matrixElements = this.matrix.elements,
        this.vec3Position = new THREE.Vector3(0,0,0),
        this.vec3Rotation = new THREE.Euler(0,0,0),
        this.vec3Scale = new THREE.Vector3(.1,.1,.1),
        this.obj.setUse(!0),
        this.iBufferIndex = this.obj.iIndex + this.emitter.activationStart,
        this.updateFlags = {},
        this.updateCounts = {},
        this.updateMap = {
            maxAge: "params",
            position: "position",
            velocity: "velocity",
            acceleration: "acceleration",
            drag: "acceleration",
            wiggle: "params",
            rotation: "rotation",
            size: "size",
            color: "color",
            opacity: "opacity",
            angle: "angle"
        },
        this.updateMap)
            this.updateMap.hasOwnProperty(r) && (this.updateCounts[this.updateMap[r]] = 0,
            this.updateFlags[this.updateMap[r]] = !1,
            this._createGetterSetters(this[r], r));
        return this.emitter.group.bEnableTrail && (this.trailRenderHelper = new TrailRenderHelper,
        this.trailRenderHelper.onTriggerMeshInited = this.onTriggerMeshInited,
        this.trailRenderHelper.init({
            fTimeLong: this.emitter.group.fTrailLife,
            fTimeStart: MSPE.utils.clock().getElapsedTime(),
            iStep: 0,
            fWidthStart: this.emitter.group.fTrailWidthStart,
            fWidthEnd: this.emitter.group.fTrailWidthEnd,
            shaderColor: new THREE.Vector4(1,1,1,1),
            shaderTexture: this.emitter.group.textureTrail,
            shaderTexMode: "Stretch",
            shaderBlending: this.emitter.group.blending,
            shaderTransparent: this.emitter.group.transparent,
            shaderAlphaTest: this.emitter.group.alphaTest,
            shaderDepthWrite: this.emitter.group.depthWrite,
            shaderDepthTest: this.emitter.group.depthTest
        }, (function() {}
        )),
        this.uuidTrial = this.trailRenderHelper.attach((function(e) {}
        ))),
        this
    }
    console.error("[MSPE.js] : [MSPE.Particle] : error options.emitter;")
}
MSPE.Particle.constructor = MSPE.Particle,
MSPE.Particle.prototype.onTriggerMeshInited = function(e) {
    this.meshTrial = e
}
MSPE.Particle.prototype._createGetterSetters = function(e, t) {
    "use strict";
    var i = this;
    for (var r in e)
        if (e.hasOwnProperty(r)) {
            var n = r.replace("_", "");
            Object.defineProperty(e, n, {
                get: function(e) {
                    return function() {
                        return this[e]
                    }
                }(r),
                set: function(e) {
                    return function(r) {
                        var n = i.updateMap[t]
                          , o = this[e]
                          , s = MSPE.valueOverLifetimeLength;
                        "_rotationCenter" === e ? (i.updateFlags.rotationCenter = !0,
                        i.updateCounts.rotationCenter = 0) : "_randomise" === e ? i.resetFlags[n] = r : (i.updateFlags[n] = !0,
                        i.updateCounts[n] = 0),
                        this[e] = r,
                        Array.isArray(o) && MSPE.utils.ensureValueOverLifetimeCompliance(i[t], s, s)
                    }
                }(r)
            })
        }
}
MSPE.Particle.prototype.tick = function(e, t) {
    "use strict";
    if (!this.emitter.isStatic) {
        if (!1 !== this.emitter.alive && !1 !== this.alive)
            return null !== this.emitter.duration && this.age > this.emitter.duration ? (this.alive = !1,
            void (this.age = 0)) : (this.age += e,
            this.running(t),
            this.age > this.fRealMaxAge ? (this.alive = !1,
            void (this.age = 0)) : void 0);
        this.age = 0
    }
}
MSPE.Particle.prototype._assignPositionValue = function() {
    "use strict";
    var e = MSPE.distributions
      , t = MSPE.utils
      , i = this.position
      , r = i._value
      , n = i._spread
      , o = this.emitter.type
      , s = new THREE.Vector3(0,0,0);
    switch (o) {
    case e.BOX:
        s = t.getRandomVector3(r, n, i._spreadClamp);
        break;
    case e.SPHERE:
        s = t.getRandomVector3OnSphere(r, i._radius, i._spread.x, i._radiusScale, i._spreadClamp.x, i._distributionClamp || this.particleCount);
        break;
    case e.DISC:
        s = t.getRandomVector3OnDisc(r, i._radius, i._spread.x, i._radiusScale, i._spreadClamp.x)
    }
    return s
}
MSPE.Particle.prototype._assignVelocityValue = function() {
    "use strict";
    var e = this.emitter.group.vec4Quaternion.clone();
    e = e.normalize();
    var t = MSPE.distributions
      , i = MSPE.utils
      , r = this.velocity
      , n = r._value
      , o = r._spread
      , s = this.emitter.type;
    this.emitter.bInitSpeed || (n = n.applyQuaternion(e),
    o = o.applyQuaternion(e),
    this.emitter.bInitSpeed = !0);
    var a = new THREE.Vector3(0,0,0);
    switch (s) {
    case t.BOX:
        a = i.getRandomVector3(n, o);
        break;
    case t.SPHERE:
        a = i.getRandomDirectionVector3OnSphere(this.emitter.position.value, n.x, o.x);
        break;
    case t.DISC:
        a = i.getRandomVector3OnDisc(n, r._radius, r._spread.x, r._radiusScale, r._spreadClamp.x)
    }
    return a
}
MSPE.Particle.prototype._assignAccelerationValue = function() {
    "use strict";
    var e = this.emitter.group.vec4Quaternion.clone();
    e = e.normalize();
    var t = MSPE.distributions
      , i = MSPE.utils
      , r = this.acceleration
      , n = r._value
      , o = r._spread
      , s = this.emitter.type;
    this.emitter.bInitSpeedAcc || (n = n.applyQuaternion(e),
    o = o.applyQuaternion(e),
    this.emitter.bInitSpeedAcc = !0);
    var a = new THREE.Vector3(0,0,0);
    switch (s) {
    case t.BOX:
        a = i.getRandomVector3(n, o);
        break;
    case t.SPHERE:
        a = i.getDirectionVector3OnSphere(this.vec3RealVelocity, this.emitter.position.value, this.emitter.velocity.value.y, this.emitter.velocity.spread.y, n, o);
        break;
    case t.DISC:
        a = i.getRandomVector3OnDisc(n, r._radius, r._spread.x, r._radiusScale, r._spreadClamp.x)
    }
    return a
}
MSPE.Particle.prototype._assignColorValue = function() {
    "use strict";
    return MSPE.utils.getRandomColor(this.color._value, this.color._spread)
}
MSPE.Particle.prototype._assignOpacityAbsLifetimeValue = function() {
    "use strict";
    var e, t, i = this.opacity, r = MSPE.utils;
    return t = new Array,
    r.arrayValuesAreEqual(i._value) && r.arrayValuesAreEqual(i._spread) ? (e = Math.abs(r.randomFloat(i._value[0], i._spread[0])),
    t.push(e),
    t.push(e),
    t.push(e),
    t.push(e)) : (e = Math.abs(r.randomFloat(i._value[0], i._spread[0])),
    t.push(e),
    e = Math.abs(r.randomFloat(i._value[1], i._spread[1])),
    t.push(e),
    e = Math.abs(r.randomFloat(i._value[2], i._spread[2])),
    t.push(e),
    e = Math.abs(r.randomFloat(i._value[3], i._spread[3])),
    t.push(e)),
    t
}
MSPE.Particle.prototype._assignSizeAbsLifetimeValue = function() {
    "use strict";
    var e, t, i = this.size, r = MSPE.utils;
    return t = new Array,
    r.arrayValuesAreEqual(i._value) && r.arrayValuesAreEqual(i._spread) ? (e = Math.abs(r.randomFloat(i._value[0], i._spread[0])),
    t.push(e),
    t.push(e),
    t.push(e),
    t.push(e)) : (e = Math.abs(r.randomFloat(i._value[0], i._spread[0])),
    t.push(e),
    e = Math.abs(r.randomFloat(i._value[1], i._spread[1])),
    t.push(e),
    e = Math.abs(r.randomFloat(i._value[2], i._spread[2])),
    t.push(e),
    e = Math.abs(r.randomFloat(i._value[3], i._spread[3])),
    t.push(e)),
    t
}
MSPE.Particle.prototype._assignAngleValue = function() {
    "use strict";
    var e, t = new Array, i = this.angle, r = MSPE.utils;
    return r.arrayValuesAreEqual(i._value) && r.arrayValuesAreEqual(i._spread) ? (e = r.randomFloat(i._value[0], i._spread[0]),
    t.push(e),
    t.push(e),
    t.push(e),
    t.push(e)) : (e = r.randomFloat(i._value[0], i._spread[0]),
    t.push(e),
    e = r.randomFloat(i._value[1], i._spread[1]),
    t.push(e),
    e = r.randomFloat(i._value[2], i._spread[2]),
    t.push(e),
    e = r.randomFloat(i._value[3], i._spread[3]),
    t.push(e)),
    t
}
MSPE.Particle.prototype.when_gt = function(e, t) {
    return Math.max(Math.sign(e - t), 0)
}
MSPE.Particle.prototype.when_lt = function(e, t) {
    return Math.min(Math.max(1 - Math.sign(e - t), 0), 1)
}
MSPE.Particle.prototype.when_eq = function(e, t) {
    return 1 - Math.abs(Math.sign(e - t))
}
MSPE.Particle.prototype.when_ge = function(e, t) {
    return 1 - this.when_lt(e, t)
}
MSPE.Particle.prototype.when_le = function(e, t) {
    return 1 - this.when_gt(e, t)
}
MSPE.Particle.prototype.and = function(e, t) {
    return e * t
}
MSPE.Particle.prototype.or = function(e, t) {
    return Math.min(e + t, 1)
}
MSPE.Particle.prototype.getFloatOverLifetime = function(e, t) {
    var i = 0
      , r = e * (MSPE.valueOverLifetimeLength - 1)
      , n = 0;
    i += t[0] * this.when_eq(r, 0);
    for (var o = 0; o < MSPE.valueOverLifetimeLength - 1; ++o)
        n = o,
        i += this.and(this.when_gt(r, n), this.when_le(r, n + 1)) * MSPE.utils.lerp(t[o], t[o + 1], r - n);
    return i
}
MSPE.Particle.prototype.getColorOverLifetime = function(e, t, i, r, n) {
    var o = new THREE.Vector3(0,0,0)
      , s = new Array;
    s.push(t.r),
    s.push(i.r),
    s.push(r.r),
    s.push(n.r);
    var a = new Array;
    a.push(t.g),
    a.push(i.g),
    a.push(r.g),
    a.push(n.g);
    var l = new Array;
    return l.push(t.b),
    l.push(i.b),
    l.push(r.b),
    l.push(n.b),
    o.x = this.getFloatOverLifetime(e, s),
    o.y = this.getFloatOverLifetime(e, a),
    o.z = this.getFloatOverLifetime(e, l),
    o
}
MSPE.Particle.prototype.getRotation = function(e, t, i) {
    if (0 == this.fRealRotationAngle)
        return e;
    var r = MSPE._vec3_3.copy(this.vec3RealRotationAxis)
      , n = MSPE._vec3_4.copy(this.rotation._center)
      , o = MSPE._mat4_2
      , s = n.sub(e)
      , a = 0;
    return a += this.when_eq(this.rotation._static ? 0 : 1, 0) * this.fRealRotationAngle,
    a += this.when_gt(this.rotation._static ? 0 : 1, 0) * MSPE.utils.lerp(0, this.fRealRotationAngle, t),
    r.normalize(),
    o.makeRotationAxis(r, a),
    s.applyMatrix4(o),
    n.sub(s),
    i.copy(n),
    i
}
MSPE.Particle.prototype.running = function(e) {
    var t = this.age
      , i = this.age / this.fRealMaxAge
      , r = MSPE._vec3_1.copy(this.vec3RealAcceleration);
    if (this.emitter.SHOULD_DRAG_PARTICLES) {
        var n = 1 - .5 * i * this.fRealDrag;
        r = r.multiplyScalar(n)
    }
    var o = MSPE._vec3_2.copy(this.vec3RealVelocity).multiplyScalar(t)
      , s = r.multiplyScalar(t * t * .5);
    if (o.add(this.vec3RealPosition).add(s),
    this.emitter.SHOULD_WIGGLE_PARTICLES) {
        var a = i * this.fRealWiggle * Math.PI
          , l = Math.sin(a)
          , u = Math.cos(a);
        o.x += l,
        o.y += u,
        o.z += l
    }
    if (this.emitter.SHOULD_ROTATE_PARTICLES && this.getRotation(o, i, o),
    this.vec3Position.copy(o),
    this.emitter.SHOULD_SIZE_PARTICLES) {
        var c = this.getFloatOverLifetime(i, this.arrayRealSize);
        this.vec3Scale.set(c, c, c)
    }
    if (this.emitter.isLookAtCamera || this.emitter.isLookAtCameraOnlyY) {
        if (this.emitter.isLookAtCamera)
            this.vec3Rotation.setFromQuaternion(e.quaternion);
        else if (this.emitter.isLookAtCameraOnlyY) {
            var h = MSPE._mat4_1
              , p = MSPE._vec3_1
              , d = MSPE._vec3_2
              , f = MSPE._quat_1;
            h.getInverse(this.emitter.group.mesh.matrixWorld),
            h.multiply(e.matrixWorld),
            p.setFromMatrixPosition(h),
            d.copy(this.vec3Position).sub(p),
            d.y = 0,
            f.setFromUnitVectors(p.set(0, 0, -1), d.normalize()),
            this.vec3Rotation.setFromQuaternion(f)
        }
    } else if (this.emitter.SHOULD_ANGLE_PARTICLES) {
        var m = this.getFloatOverLifetime(i, this.arrayRealAngle);
        this.vec3Rotation.set(m, m, m)
    }
    if (this.emitter.group.bEnableTrail) {
        var g = MSPE.utils.clock().getElapsedTime();
        this.trailRenderHelper.tick({
            uuid: this.uuidTrial,
            timeNow: g,
            position: this.vec3Position,
            rotation: this.vec3Rotation
        })
    }
    if (MSPE.utils.setMatrix(this.vec3Position, this.vec3Rotation, this.vec3Scale, this.matrix),
    this.emitter.group.mcol0.setXYZ(this.iBufferIndex, this.matrixElements[0], this.matrixElements[1], this.matrixElements[2]),
    this.emitter.group.mcol1.setXYZ(this.iBufferIndex, this.matrixElements[4], this.matrixElements[5], this.matrixElements[6]),
    this.emitter.group.mcol2.setXYZ(this.iBufferIndex, this.matrixElements[8], this.matrixElements[9], this.matrixElements[10]),
    this.emitter.group.mcol3.setXYZ(this.iBufferIndex, this.matrixElements[12], this.matrixElements[13], this.matrixElements[14]),
    this.emitter.SHOULD_COLORIZE_PARTICLES) {
        var v = this.getColorOverLifetime(i, this.arrayRealColor[0], this.arrayRealColor[1], this.arrayRealColor[2], this.arrayRealColor[3])
          , y = this.getFloatOverLifetime(i, this.arrayRealOpacity);
        this.emitter.group.bEnableTrail && null != this.trailRenderHelper && null != this.trailRenderHelper && this.trailRenderHelper.updateColor({
            r: v.x,
            g: v.y,
            b: v.z,
            a: y
        }),
        this.emitter.group.colors.setXYZW(this.iBufferIndex, v.x, v.y, v.z, y)
    }
}
MSPE.Particle.prototype.dispose = function() {
    "use strict";
    this.emitter.group.bEnableTrail && (this.trailRenderHelper.detach(this.uuidTrial),
    this.trailRenderHelper.dispose(),
    this.meshTrial && this.meshTrial.parent && this.meshTrial.parent.remove(this.meshTrial)),
    null != this.obj && null != this.obj && this.obj.setUse(!1)
}
MSPE.BufferAttributeObjPool = function(e) {
    "use strict";
    var t = MSPE.utils
      , i = t.types;
    if (null != (e = t.ensureTypedArg(e, i.OBJECT, {})).iCount && null != e.iCount && "number" == typeof e.iCount) {
        this.iCount = e.iCount,
        this.objPool = new Array;
        for (var r = 0; r < this.iCount; r++) {
            var n = new MSPE.BufferAttributeObj({
                iIndex: r
            });
            this.objPool.push(n)
        }
    } else
        console.error("[MSPE] : [BufferAttributeObjPool] : error options.iCount;")
}
MSPE.BufferAttributeObjPool.constructor = MSPE.BufferAttributeObjPool,
MSPE.BufferAttributeObjPool.prototype.setUse = function(e, t) {
    "use strict";
    null != e && null != e && "number" == typeof e ? e + 1 > this.objPool.length ? console.error("[MSPE] : [BufferAttributeObjPool] : [setUse] : error iIndex; iIndex = " + e + "; while this.objPool.length = " + this.objPool.length) : null != t && null != t && "boolean" == typeof t ? this.objPool[e].setUse(t) : console.error("[MSPE] : [BufferAttributeObjPool] : [setUse] : error bU;") : console.error("[MSPE] : [BufferAttributeObjPool] : [setUse] : error iIndex;")
}
MSPE.BufferAttributeObjPool.prototype.getUse = function(e) {
    "use strict";
    if (null != e && null != e && "number" == typeof e) {
        if (!(e + 1 > this.objPool.length))
            return this.objPool[e].getUse();
        console.error("[MSPE] : [BufferAttributeObjPool] : [getUse] : error iIndex; iIndex = " + e + "; while this.objPool.length = " + this.objPool.length)
    } else
        console.error("[MSPE] : [BufferAttributeObjPool] : [getUse] : error iIndex;")
}
MSPE.BufferAttributeObjPool.prototype.takeAnObj = function() {
    "use strict";
    for (var e = 0, t = this.objPool.length; e < t; e++)
        if (!this.objPool[e].getUse())
            return this.objPool[e];
    return null
}
MSPE.BufferAttributeObjPool.prototype.reset = function() {
    "use strict";
    for (var e = 0, t = this.objPool.length; e < t; e++)
        this.objPool[e].setUse(!1)
}
MSPE.BufferAttributeObjPool.prototype.dispose = function() {
    "use strict";
    for (var e = 0, t = this.objPool.length; e < t; e++)
        this.objPool[e].dispose()
}
MSPE.BufferAttributeObj = function(e) {
    "use strict";
    var t = MSPE.utils
      , i = t.types;
    null != (e = t.ensureTypedArg(e, i.OBJECT, {})).iIndex && null != e.iIndex && "number" == typeof e.iIndex ? (this.iIndex = e.iIndex,
    this.bUsed = !1) : console.error("[MSPE] : [BufferAttributeObj] : error options.iIndex;")
}
MSPE.BufferAttributeObj.constructor = MSPE.BufferAttributeObj,
MSPE.BufferAttributeObj.prototype.setUse = function(e) {
    "use strict";
    this.bUsed = e
}
MSPE.BufferAttributeObj.prototype.getUse = function() {
    "use strict";
    return this.bUsed
}
MSPE.BufferAttributeObj.prototype.dispose = function() {}


TrailRenderHelper = function() {
    var e = "[TrailRenderHelper.js] : ";
    this.fTimeLong = 0,
    this.fTimeStart = 0,
    this.iStep = 0,
    this.iCount = 0,
    this.fWidthStart = .5,
    this.fWidthEnd = .5,
    this.fWidthOffset = 0,
    this.arrayPosHistory = new Array,
    this.shaderColor = null,
    this.shaderTexture = null,
    this.shaderTexMode = null,
    this.blending = null,
    this.transparent = null,
    this.alphaTest = null,
    this.depthWrite = null,
    this.depthTest = null,
    this.arrayUuid = new Array,
    this.arrayCfg = new Array,
    this.bAllStable = !1,
    this.bStable = !1,
    this.iMaxArrayPosHistoryNo = 0,
    this.iMaxArrayPosHistoryNo_last = 0,
    this.iCurrentIndex = 0,
    this.iSumArrayPosHistoryCount = 0,
    this.instanceBuffer = null,
    this.bufferGeometry = null,
    this.attributesVertices = null,
    this.material = null,
    this.mesh = null,
    this.vertices = null,
    this.indices = null,
    this.uvs = null,
    this.onTriggerMeshInited = null;
    var t = this
      , i = {
        vertex: ["precision highp float;", "uniform sampler2D texture;", "uniform vec4 color;", "varying vec2 vUv;", "varying vec4 varyColor;", "void main()", "{", "\tvaryColor = color;", "   vUv = vec2( uv.x, uv.y );", "\tvec3 positionEye = ( modelViewMatrix * vec4( position, 1.0 ) ).xyz;", "\tgl_Position = projectionMatrix * vec4( positionEye, 1.0 );", "}"].join("\n"),
        fragment: ["precision highp float;", "uniform sampler2D texture;", "varying vec2 vUv;", "varying vec4 varyColor;", "void main() {", "    gl_FragColor = varyColor * texture2D(texture, vUv);", "}"].join("\n")
    };
    this.init = function(r, n) {
        if (null != n && null != n) {
            if (null == r || null == r || "object" != typeof r)
                return console.error(e + "[init] : options == null;"),
                void n();
            if (null == r.fTimeLong || null == r.fTimeLong || "number" != typeof r.fTimeLong)
                return console.error(e + "[init] : options.fTimeLong == null;"),
                void n();
            if (null == r.fTimeStart || null == r.fTimeStart || "number" != typeof r.fTimeStart)
                return console.error(e + "[init] : options.fTimeStart == null;"),
                void n();
            if (null == r.iStep || null == r.iStep || "number" != typeof r.iStep)
                return console.error(e + "[init] : options.iStep == null;"),
                void n();
            if (null == r.fWidthStart || null == r.fWidthStart || "number" != typeof r.fWidthStart)
                return console.error(e + "[init] : options.fWidthStart == null;"),
                void n();
            if (null == r.fWidthEnd || null == r.fWidthEnd || "number" != typeof r.fWidthEnd)
                return console.error(e + "[init] : options.fWidthStart == null;"),
                void n();
            null != r.shaderColor && null != r.shaderColor && r.shaderColor instanceof THREE.Vector4 ? t.shaderColor = new THREE.Vector4(r.shaderColor.x,r.shaderColor.y,r.shaderColor.z,r.shaderColor.w) : (console.warn(e + "[init] : options.shaderColor == null; set shader color as default;"),
            t.shaderColor = new THREE.Vector4(.5,.5,1,1)),
            null != r.shaderTexture && null != r.shaderTexture && r.shaderTexture instanceof THREE.Texture ? t.shaderTexture = r.shaderTexture : (console.warn(e + "[init] : options.shaderColor == null; set shader texture as default;"),
            t.shaderTexture = null),
            null == r.shaderTexMode || null == r.shaderTexMode || "string" != typeof r.shaderTexMode ? (console.warn(e + "[init] : options.shaderTexMode == null; set shader mode as default;"),
            t.shaderTexMode = "Stretch") : t.shaderTexMode = "Stretch" == r.shaderTexMode ? "Stretch" : "Tile",
            null == r.shaderBlending || null == r.shaderBlending || "number" != typeof r.shaderBlending ? (console.warn(e + "[init] : options.shaderBlending == null; set shader blending as default;"),
            t.blending = THREE.AdditiveBlending) : t.blending = r.shaderBlending,
            null == r.shaderTransparent || null == r.shaderTransparent || "boolean" != typeof r.shaderTransparent ? (console.warn(e + "[init] : options.shaderTransparent == null; set shader transparent as default;"),
            t.transparent = !1) : t.transparent = r.shaderTransparent,
            null == r.shaderAlphaTest || null == r.shaderAlphaTest || "number" != typeof r.shaderAlphaTest ? (console.warn(e + "[init] : options.shaderAlphaTest == null; set shader alphaTest as default;"),
            t.alphaTest = 0) : t.alphaTest = r.shaderAlphaTest,
            null == r.shaderDepthWrite || null == r.shaderDepthWrite || "boolean" != typeof r.shaderDepthWrite ? (console.warn(e + "[init] : options.shaderDepthWrite == null; set shader depthWrite as default;"),
            t.depthWrite = !0) : t.depthWrite = r.shaderDepthWrite,
            null == r.shaderDepthTest || null == r.shaderDepthTest || "boolean" != typeof r.shaderDepthTest ? (console.warn(e + "[init] : options.shaderDepthTest == null; set shader depthTest as default;"),
            t.depthTest = !0) : t.depthTest = r.shaderDepthTest,
            t.uniforms = {
                texture: {
                    type: "t",
                    value: t.shaderTexture
                },
                color: {
                    type: "v4",
                    value: new THREE.Vector4(0,0,0,0)
                }
            },
            t.material = new THREE.ShaderMaterial({
                uniforms: t.uniforms,
                vertexShader: i.vertex,
                fragmentShader: i.fragment,
                blending: t.blending,
                transparent: t.transparent,
                alphaTest: t.alphaTest,
                depthWrite: t.depthWrite,
                depthTest: t.depthTest
            }),
            t.fTimeLong = r.fTimeLong,
            t.fTimeStart = r.fTimeStart,
            t.iStep = r.iStep,
            t.iCount = 0,
            t.fWidthStart = r.fWidthStart,
            t.fWidthEnd = r.fWidthEnd,
            t.fWidthOffset = -t.fWidthStart + t.fWidthEnd,
            n()
        } else
            console.error(e + "[init] : onFinished == null;")
    }
    ,
    this.attach = function(i) {
        if (null == i || null == i)
            return console.error(e + "[attach] : onFinished == null;"),
            null;
        var r = THREE.Math.generateUUID();
        t.arrayPosHistory[r] = new Array;
        return t.arrayCfg[r] = {
            bActived: !0,
            bStable: !1,
            iMaxArrayPosHistoryNo_last: 0,
            iMaxArrayPosHistoryNo: 0,
            iStartIndex: 0
        },
        t.arrayUuid.push(r),
        i(r),
        r
    }
    ,
    this.detach = function(i) {
        null != i && null != i && "string" == typeof i ? (t.arrayUuid.includes(i) && delete t.arrayUuid[i],
        t.arrayCfg.includes(i) && (t.iCurrentIndex -= t.arrayCfg[i].iMaxArrayPosHistoryNo,
        delete t.arrayCfg[i]),
        t.arrayPosHistory.includes(i) && delete t.arrayPosHistory[i]) : console.error(e + "[detach] : uuid == null;")
    }
    ,
    this.dispose = function() {
        t.instanceBuffer && t.instanceBuffer.dispose(),
        t.bufferGeometry && t.bufferGeometry.dispose(),
        GlobalsVariables.scene.remove(t.mesh),
        t.material.dispose(),
        t.arrayUuid.forEach((function(e) {}
        )),
        t.arrayCfg.forEach((function(e) {}
        )),
        t.arrayPosHistory.forEach((function(e) {}
        )),
        t.arrayUuid = [],
        t.arrayCfg = [],
        t.arrayPosHistory = []
    }
    ,
    this.setActive = function(i, r, n) {
        if (null != n && null != n) {
            if (null == i || null == i || "string" != typeof i)
                return console.error(e + "[setActive] : uuid == null;"),
                void n(!1);
            if (!t.arrayUuid.includes(i))
                return console.error(e + "[setActive] : uuid do not includes;"),
                void n(!1);
            if (null == r || null == r || "boolean" != typeof r)
                return console.error(e + "[setActive] : bActived == null;"),
                void n(!1);
            t.arrayCfg[i].bActived = r,
            n(!0)
        } else
            console.error(e + "[setActive] : onFinished == null;")
    }
    ,
    this.tick = function(e) {
        if (t.bAllStable)
            for (var i = t.arrayUuid.length, r = 0; r < i; r++)
                t.arrayCfg[t.arrayUuid[r]].bActived && t.updateMesh(t.arrayUuid[r]);
        if (t.arrayCfg[e.uuid].bActived && (t.arrayPosHistory[e.uuid].push({
            time: e.timeNow,
            pos: new THREE.Vector3(e.position.x,e.position.y,e.position.z),
            rot: new THREE.Vector3(e.rotation.x,e.rotation.y,e.rotation.z)
        }),
        t.checkPosHistory(e.uuid, e.timeNow)),
        !t.bAllStable && !t.arrayCfg[e.uuid].bStable) {
            i = t.arrayPosHistory[e.uuid].length;
            t.arrayCfg[e.uuid].iMaxArrayPosHistoryNo <= i && (t.arrayCfg[e.uuid].iMaxArrayPosHistoryNo_last = t.arrayCfg[e.uuid].iMaxArrayPosHistoryNo,
            t.arrayCfg[e.uuid].iMaxArrayPosHistoryNo = i,
            t.arrayCfg[e.uuid].bStable || t.arrayCfg[e.uuid].iMaxArrayPosHistoryNo_last != t.arrayCfg[e.uuid].iMaxArrayPosHistoryNo || (t.arrayCfg[e.uuid].bStable = !0,
            t.checkAllPosHistory()))
        }
    }
    ,
    this.checkPosHistory = function(e, i) {
        for (var r = t.arrayPosHistory[e].length, n = 0; n < r && i - t.arrayPosHistory[e][n].time > t.fTimeLong; n++)
            t.arrayPosHistory[e].splice(n, 1),
            r = t.arrayPosHistory[e].length,
            n--
    }
    ,
    this.checkAllPosHistory = function() {
        var e = t.arrayUuid.length
          , i = !0;
        t.iSumArrayPosHistoryCount = 0;
        for (var r = 0; r < e; r++) {
            if (!t.arrayCfg[t.arrayUuid[r]].bStable)
                return void (i = !1);
            t.iSumArrayPosHistoryCount += t.arrayCfg[t.arrayUuid[r]].iMaxArrayPosHistoryNo
        }
        if (i) {
            t.bAllStable = !0;
            for (r = 0; r < e; r++)
                0 == r ? 1 == e ? t.initMesh(t.arrayUuid[r], "start|end") : t.initMesh(t.arrayUuid[r], "start") : r + 1 == e ? t.initMesh(t.arrayUuid[r], "end") : t.initMesh(t.arrayUuid[r], "default")
        }
    }
    ,
    this.initMesh = function(e, i) {
        if (null != t.mesh && GlobalsVariables.scene.remove(t.mesh),
        null == t.bufferGeometry && (t.bufferGeometry = new THREE.BufferGeometry),
        t.arrayCfg[e].iStartIndex = t.iCurrentIndex,
        i.indexOf("start") >= 0) {
            var r = 2 * t.iSumArrayPosHistoryCount;
            t.iSumArrayPosHistoryCount;
            t.vertices = new Float32Array(3 * r),
            t.indices = new Uint32Array(2 * (t.iSumArrayPosHistoryCount - t.arrayCfg.length) * 2 * 3),
            t.uvs = new Float32Array(2 * r)
        }
        for (var n = new THREE.Quaternion, o = t.arrayCfg[e].iStartIndex, s = t.arrayCfg[e].iStartIndex + t.arrayCfg[e].iMaxArrayPosHistoryNo; o < s; o++) {
            var a = t.fWidthEnd + (o - t.arrayCfg[e].iStartIndex) / t.arrayCfg[e].iMaxArrayPosHistoryNo * t.fWidthOffset
              , l = t.arrayPosHistory[e][o - t.arrayCfg[e].iStartIndex].pos.clone()
              , u = l.clone()
              , c = t.arrayPosHistory[e][o - t.arrayCfg[e].iStartIndex].rot.clone();
            c = c.normalize(),
            n.setFromEuler(new THREE.Euler(c.x,c.y,c.z));
            var h = new THREE.Vector3(a,0,0);
            h.applyQuaternion(n);
            var p = s - 1 - o
              , d = l.add(h);
            t.vertices[6 * (t.arrayCfg[e].iStartIndex + p) + 0] = d.x,
            t.vertices[6 * (t.arrayCfg[e].iStartIndex + p) + 1] = d.y,
            t.vertices[6 * (t.arrayCfg[e].iStartIndex + p) + 2] = d.z;
            var f = u.sub(h);
            t.vertices[6 * (t.arrayCfg[e].iStartIndex + p) + 3] = f.x,
            t.vertices[6 * (t.arrayCfg[e].iStartIndex + p) + 4] = f.y,
            t.vertices[6 * (t.arrayCfg[e].iStartIndex + p) + 5] = f.z
        }
        var m = t.arrayCfg[e].iStartIndex + t.arrayCfg[e].iMaxArrayPosHistoryNo - 1;
        for (o = t.arrayCfg[e].iStartIndex; o < m; o++)
            t.indices[12 * o + 0] = 2 * o + 0,
            t.indices[12 * o + 1] = 2 * o + 1,
            t.indices[12 * o + 2] = 2 * o + 2,
            t.indices[12 * o + 3] = 2 * o + 2,
            t.indices[12 * o + 4] = 2 * o + 1,
            t.indices[12 * o + 5] = 2 * o + 3,
            t.indices[12 * o + 6] = 2 * o + 0,
            t.indices[12 * o + 7] = 2 * o + 2,
            t.indices[12 * o + 8] = 2 * o + 1,
            t.indices[12 * o + 9] = 2 * o + 2,
            t.indices[12 * o + 10] = 2 * o + 3,
            t.indices[12 * o + 11] = 2 * o + 1;
        var g = 1 / t.arrayCfg[e].iMaxArrayPosHistoryNo;
        if ("Stretch" == t.shaderTexMode)
            for (o = t.arrayCfg[e].iStartIndex,
            s = t.arrayCfg[e].iStartIndex + t.arrayCfg[e].iMaxArrayPosHistoryNo; o < s; o++)
                t.uvs[4 * o + 0] = (o - t.arrayCfg[e].iStartIndex) * g,
                t.uvs[4 * o + 1] = 0,
                t.uvs[4 * o + 2] = (o - t.arrayCfg[e].iStartIndex) * g,
                t.uvs[4 * o + 3] = 1;
        else
            for (o = t.arrayCfg[e].iStartIndex,
            s = t.arrayCfg[e].iStartIndex + t.arrayCfg[e].iMaxArrayPosHistoryNo; o < s; o++)
                t.uvs[4 * o + 0] = (o - t.arrayCfg[e].iStartIndex) % 2,
                t.uvs[4 * o + 1] = 0,
                t.uvs[4 * o + 2] = (o - t.arrayCfg[e].iStartIndex) % 2,
                t.uvs[4 * o + 3] = 1;
        t.iCurrentIndex += t.arrayCfg[e].iMaxArrayPosHistoryNo,
        i.indexOf("end") >= 0 && (t.bufferGeometry.addAttribute("position", new THREE.BufferAttribute(t.vertices,3)),
        t.attributesVertices = this.bufferGeometry.attributes.position.array,
        t.bufferGeometry.addAttribute("uv", new THREE.BufferAttribute(t.uvs,2)),
        t.bufferGeometry.setIndex(new THREE.BufferAttribute(t.indices,1)),
        t.mesh = new THREE.Mesh(t.bufferGeometry,t.material),
        GlobalsVariables.scene.add(t.mesh),
        null != t.onTriggerMeshInited && null != t.onTriggerMeshInited && t.onTriggerMeshInited(t.mesh))
    }
    ,
    this.updateColor = function(e) {
        null != t.material && null != t.material && (t.material.uniforms.color.value.x = e.r,
        t.material.uniforms.color.value.y = e.g,
        t.material.uniforms.color.value.z = e.b,
        t.material.uniforms.color.value.w = e.a,
        t.material.needsUpdate = !0)
    }
    ,
    this.updateMesh = function(e) {
        for (var i = t.arrayPosHistory[e].length, r = new THREE.Quaternion, n = t.arrayCfg[e].iStartIndex, o = t.arrayCfg[e].iStartIndex + i; n < o; n++) {
            var s = t.fWidthEnd + (n - t.arrayCfg[e].iStartIndex) / i * t.fWidthOffset
              , a = (h = t.arrayPosHistory[e][n - t.arrayCfg[e].iStartIndex].pos.clone()).clone();
            p = (p = t.arrayPosHistory[e][n - t.arrayCfg[e].iStartIndex].rot.clone()).normalize(),
            r.setFromEuler(new THREE.Euler(p.x,p.y,p.z)),
            (d = new THREE.Vector3(s,0,0)).applyQuaternion(r);
            var l = o - 1 - n;
            l = 6 * (t.arrayCfg[e].iStartIndex + l);
            var u = h.add(d);
            t.attributesVertices[l + 0] = u.x,
            t.attributesVertices[l + 1] = u.y,
            t.attributesVertices[l + 2] = u.z;
            var c = a.sub(d);
            t.attributesVertices[l + 3] = c.x,
            t.attributesVertices[l + 4] = c.y,
            t.attributesVertices[l + 5] = c.z
        }
        if (i < t.arrayCfg[e].iMaxArrayPosHistoryNo)
            for (n = t.arrayCfg[e].iStartIndex + i,
            o = t.arrayCfg[e].iStartIndex + t.arrayCfg[e].iMaxArrayPosHistoryNo; n < o; n++) {
                var h, p, d;
                a = (h = t.arrayPosHistory[e][i - 1].pos.clone()).clone();
                p = (p = t.arrayPosHistory[e][i - 1].rot.clone()).normalize(),
                r.setFromEuler(new THREE.Euler(p.x,p.y,p.z)),
                (d = new THREE.Vector3(0,0,0)).applyQuaternion(r);
                l = 6 * (t.arrayCfg[e].iStartIndex + n),
                u = h.add(d);
                t.attributesVertices[l + 0] = u.x,
                t.attributesVertices[l + 1] = u.y,
                t.attributesVertices[l + 2] = u.z;
                c = a.sub(d);
                t.attributesVertices[l + 3] = c.x,
                t.attributesVertices[l + 4] = c.y,
                t.attributesVertices[l + 5] = c.z
            }
        t.bufferGeometry.attributes.position.needsUpdate = !0
    }
}