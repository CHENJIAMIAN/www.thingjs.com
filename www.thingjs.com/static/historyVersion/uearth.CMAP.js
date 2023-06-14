"use strict";
n.r(e);
n(21);
var r = n(0)
    , a = THING.BaseObject.prototype.movePath
    , i = THING.BaseObject.prototype.lookAt;
THING.BaseObject.prototype.movePath = function(t) {
    t.orientToPathDegree = THING.Utils.parseValue(t.orientToPathDegree, 0);
    let e, n, i = THING.Utils.parseValue(t.turnSpeed, 1);
    if (i >= 10 && (i = 10),
    t.turnAtFirstPoint) {
        var o = CMAP.Util.convertWorldToLonlat(this.position)
            , s = CMAP.Util.convertLonlatToWorld([o[0], o[1] + .1])
            , l = new THREE.Vector3(s[0] - this.position[0],s[1] - this.position[1],s[2] - this.position[2]);
        l.normalize();
        var u = new THREE.Vector3(this.node.matrixWorld.elements[8],this.node.matrixWorld.elements[9],this.node.matrixWorld.elements[10]);
        e = u.angleTo(l),
        u.cross(l).z < 0 && (e *= -1),
        e = Math.radToDeg(e)
    }
    let c, h = 0;
    function d(a) {
        var o = a.object
            , s = a.fromPosition;
        MapUtil.isArrayEqual(c, s) || (h = 0,
        c = s);
        var l = a.toPosition
            , u = o.position
            , d = MapUtil.convertWorldToLonlat(s)
            , f = MapUtil.convertWorldToLonlat(u)
            , p = MapUtil.convertWorldToLonlat(l)
            , m = MapUtil.getAzimuth(d, p)
            , g = function(e) {
            var a = f[0] + 90 - e;
            let i = MapUtil.convertLonlatToWorld([f[0], f[1]]);
            if (n = CMAP.Util.positionToQuaternion(i, a),
            0 !== THING.Math.getDistance(u, l) && Math.abs(f[2] - p[2]) > .001) {
                var s = Math.atan((f[2] - p[2]) / THING.Math.getDistance(u, l));
                let e = new THREE.Quaternion;
                var c = new THREE.Vector3(1,0,0).applyAxisAngle(new THREE.Vector3(0,1,0), THING.Math.degToRad(t.orientToPathDegree));
                o instanceof CMAP.GeoPoint && "image" === o.renderer.type && !1 === o.renderer.useSpriteMaterial && (s += Math.PI / 2),
                e = e.setFromAxisAngle(c, s),
                n = n.multiply(e)
            }
            return n
        };
        if (1 === a.progress) {
            var v = MapUtil.convertWorldToLonlat(a.fromPosition);
            m = MapUtil.getAzimuth(v, f)
        }
        m += t.orientToPathDegree,
        THING.Utils.isNull(e) && (e = m,
        g(m)),
        e - m > 180 ? m += 360 : m - e > 180 && (m -= 360),
        Math.abs(e - m) > 1e-5 ? g(e += (m - e) * i * .1 * ++h) : h = 0,
        o instanceof CMAP.GeoPoint && (o._coordinates = f),
        o.node._setWorldQuaternion(n),
        o.node.updateMatrixWorld(!1, !1)
    }
    let f = t.update;
    CMAP.getCurrentMap() && t.orientToPath && (f && !t.correctObject ? t.update = function(t) {
        f.call(this, t),
        d(t)
    }
    : t.update = function(e) {
        d(e),
        t.correctObject = !0
    }
    ),
    a.call(this, t)
}
,
THING.BaseObject.prototype.lookAt = function(t, e) {
    i.call(this, t, e),
    e = e || {};
    var n = THING.Utils.parseValue(e.isEarth, !1);
    if (t && n) {
        this.angles = CMAP.Util.getAnglesFromPosition(this.position);
        var r = function(t, e, n, r={}) {
            if (!(t && t instanceof THING.BaseObject))
                return console.error("[CameraPose.js] : [calcFlyToParams] : error target", t),
                null;
            const a = function(e) {
                let n = null;
                if (!e)
                    return console.error("[CameraPose.js] : [calcFlyToParams] : error position", e),
                    null;
                if (Array.isArray(e) && (n = THING.Utils.parseVector3(e)),
                e instanceof THREE.Vector3 && (n = e),
                !n)
                    return console.error("[CameraPose.js] : [calcFlyToParams] : error position", e),
                    null;
                n = THING.Utils.parseVector3(t.worldToSelf(n.toArray()));
                const a = {
                    radius: t._FlyPropForCam_ && t._FlyPropForCam_.radius ? t._FlyPropForCam_.radius : t.boundingBox.radius,
                    center: t._FlyPropForCam_ && t._FlyPropForCam_.center ? t._FlyPropForCam_.center : t.boundingBox.center,
                    fov: THING.App.current.camera.fov
                };
                Object.assign(a, r),
                0 === a.radius && (a.radius = t.getRadius(!0));
                const i = {
                    xAngle: 0,
                    yAngle: 0,
                    radius: 1
                }
                    , o = THING.Utils.parseVector3(t.worldToSelf(a.center));
                let s = new THREE.Vector3;
                s.copy(n),
                s = s.sub(o),
                i.radius = s.length() * Math.sin(a.fov / 1 * 1 / 180 * Math.PI) / a.radius;
                const l = new THREE.Vector3;
                l.copy(s),
                l.normalize();
                const u = new THREE.Vector3(l.x,0,l.z);
                u.normalize();
                const c = new THREE.Vector3(0,0,1);
                return i.xAngle = THING.Math.getAngleBetweenVectors(l.toArray(), u.toArray()) * THING.Math.sign(l.y),
                i.yAngle = THING.Math.getAngleBetweenVectors(c.toArray(), u.toArray()) * THING.Math.sign(u.x),
                i.xAngle = Number.isNaN(i.xAngle) ? 0 : i.xAngle,
                i.yAngle = Number.isNaN(i.yAngle) ? 0 : i.yAngle,
                i
            }
                , i = a(e)
                , o = a(n);
            return {
                position: {
                    pitch: i.xAngle,
                    yaw: i.yAngle,
                    radiusFac: i.radius
                },
                target: {
                    pitch: o.xAngle,
                    yaw: o.yAngle,
                    radiusFac: o.radius
                }
            }
        }(this, t.position, this.position);
        this.rotateY(r.position.yaw)
    }
}
,
THREE.EarthOrbitControls = function(t, e) {
    var n;
    this.object = t,
    this.domElement = void 0 !== e ? e : document,
    this.enabled = !0,
    this.isEarth = !0,
    this.target = new THREE.Vector3,
    this.target.set = function(t, e, n) {
        if (r.targetLimitData) {
            let a = THING.Math.world2Lonlat([t, e, n]);
            if (a && a.length > 1) {
                const i = r.targetLimitData.min
                    , o = r.targetLimitData.max;
                a[0] < i[0] ? a[0] = i[0] : a[0] > o[0] && (a[0] = o[0]),
                a[1] < i[1] ? a[1] = i[1] : a[1] > o[1] && (a[1] = o[1]);
                const s = THING.Math.lonlat2World(a);
                t = s[0],
                e = s[1],
                n = s[2]
            }
        }
        return void 0 === n && (n = this.z),
        this.x = t,
        this.y = e,
        this.z = n,
        this
    }
    ,
    this._leftInteractive = !0,
    this._keepTarget = !1,
    this.minDistance = 500,
    this.maxDistance = 2e7,
    this._distanceFixFactor = 1e-4,
    this.minZoom = 0,
    this.maxZoom = 1 / 0,
    this.maxPitchAngle = 87,
    this._minPolarAngle = 0,
    this._maxPolarAngle = THING.Math.degToRad(this.maxPitchAngle),
    this.minAzimuthAngle = -1 / 0,
    this.maxAzimuthAngle = 1 / 0,
    this.enableDamping = !1,
    this.dampingFactor = .88,
    this.dampingZoomFactor = .5,
    this.enableZoom = !0,
    this.zoomSpeed = 1,
    this.zoomFactor = 1,
    this.zoomDelayFactor = .06,
    this.enableRotate = !0,
    this.rotateSpeed = .07,
    this.enablePan = !0,
    this.keyPanSpeed = 7,
    this.panSpeed = 1,
    this.autoRotate = !1,
    this.autoRotateSpeed = 2,
    this.enableKeys = !0,
    this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    },
    this.mouseButtons = {
        ORBIT: THREE.MOUSE.LEFT,
        ZOOM: THREE.MOUSE.MIDDLE,
        PAN: THREE.MOUSE.RIGHT
    },
    this.target0 = this.target.clone(),
    this.position0 = this.object.position.clone(),
    this.zoom0 = this.object.zoom,
    this.standardRadius = 10216133.731679259,
    this.targetMaxOffset = 6e7,
    this.panStander = this.maxDistance - 6378e3,
    this.isDispatchEvent = !0,
    this.enableZoomOnTarget = !0,
    this.options = {},
    this._isCameraStatic = !0,
    this.setOptions = function(t) {
        this.options = t,
        this.mouseButtons = {
            ORBIT: this._parseToThreeMouseKey(t.moveKey),
            ZOOM: this._parseToThreeMouseKey(t.zoomKey),
            PAN: this._parseToThreeMouseKey(t.rotationKey)
        },
        this.enableZoomOnTarget = t.enableZoomOnTarget
    }
    ,
    this._parseToThreeMouseKey = function(t) {
        var e;
        switch (t) {
        case "left":
            e = THREE.MOUSE.LEFT;
            break;
        case "right":
            e = THREE.MOUSE.RIGHT;
            break;
        case "middle":
            e = THREE.MOUSE.MIDDLE
        }
        return e
    }
    ,
    this._parseToThingMouseKey = function(t) {
        var e;
        switch (t) {
        case THREE.MOUSE.LEFT:
            e = "left";
            break;
        case THREE.MOUSE.RIGHT:
            e = "right";
            break;
        case THREE.MOUSE.MIDDLE:
            e = "middle"
        }
        return e
    }
    ,
    this.getOptions = function(t) {
        return this.options.rotationKey = this._parseToThingMouseKey(this.mouseButtons.PAN),
        this.options.zoomKey = this._parseToThingMouseKey(this.mouseButtons.ZOOM),
        this.options.moveKey = this._parseToThingMouseKey(this.mouseButtons.ORBIT),
        this.options.enableZoomOnTarget = this.enableZoomOnTarget,
        this.options
    }
    ,
    this.getPolarAngle = function() {
        return c.phi
    }
    ,
    this.getAzimuthalAngle = function() {
        return c.theta
    }
    ,
    this.getRotationSpherePhi = function() {
        return h.phi
    }
    ,
    this.getSphericalRadius = function() {
        return c.radius
    }
    ,
    this.saveState = function() {
        r.target0.copy(r.target),
        r.position0.copy(r.object.position),
        r.zoom0 = r.object.zoom
    }
    ,
    this.reset = function() {
        r.target.copy(r.target0),
        r.object.position.copy(r.position0),
        r.object.zoom = r.zoom0,
        r.object.updateProjectionMatrix(),
        r.dispatchEvent(i),
        r.update(),
        u = l.NONE
    }
    ,
    this.goHome = function() {
        A = !0,
        r.object.up.set(0, 1, 0),
        r.object.position.set(4890109.86328125, 9295980.46875, 13943610.3515625),
        c.radius = 17457167.49609005,
        h.phi = -.01,
        h.theta = Math.PI / 2,
        h.radius = c.radius - 6378e3,
        r._isCameraStatic = !1,
        r.update(),
        r._isCameraStatic = !0
    }
    ,
    this.setState = function(t) {
        if (r.enabled) {
            var e = r._getIntersectPoint();
            r.target.copy(e);
            var n = r.target
                , a = r.object.position
                , i = (new THREE.Vector3).subVectors(n, a)
                , o = (new THREE.Vector3).crossVectors(a, i)
                , s = (new THREE.Vector3).crossVectors(i, o);
            s = s.normalize(),
            r.object.up.copy(s),
            r.object.lookAt(n.x, n.y, n.z)
        }
    }
    ,
    this.correctUp = function(t) {
        var e = THING.Utils.parseValue(t.time, 3e3)
            , n = t.callback
            , a = r.target
            , i = r.object.position
            , o = new THREE.Vector3;
        o.copy(r.object.up),
        o.normalize();
        var s = new THREE.Vector3;
        s.copy(i),
        s.normalize();
        var l = null;
        requestAnimationFrame(function t(i) {
            l || (l = i);
            var u = i - l
                , c = o.lerp(s, u / e);
            r.object.up = c,
            r.object.lookAt(a),
            u / e < 1 ? requestAnimationFrame(t) : (n && n(),
            THING.Utils.log("end-correct"))
        })
    }
    ,
    this._getIntersectPoint = function(t=!0, e=!1) {
        if (!e && (this._isCameraStatic || 0 === this._getState() || 2 === this._getState() || this._keepTarget))
            return this.target;
        var n = new THREE.Vector3
            , r = [];
        if (this.object.getWorldDirection(n),
        n.normalize(),
        j._camera = this.object,
        j.set(this.object.position, n),
        D.set(this.object.position, n),
        t) {
            var a = t3djs.buffer.nodeBuffer.get("tiles-root");
            if (a && a.ensureVisible() && (r = j.intersectObjects(a.children, !0)),
            r.length > 0) {
                let t = r[0].point;
                if (CMAP.Util.convertWorldToLonlat(t.toArray())[2] >= 0)
                    return t
            }
        }
        var i = new THREE.Vector3;
        return D.intersectSphere(L, i),
        i.equals(new THREE.Vector3(0,0,0)) ? this.target : i
    }
    ,
    this._getIntersectPointByMouse = function(t, e) {
        var n = [];
        if (r.isEarth) {
            var a = new THREE.Vector3;
            this.object.getWorldDirection(a),
            a.normalize(),
            D.set(this.object.position, a),
            j.setFromCamera(new THREE.Vector2(t,e), this.object);
            var i = t3djs.buffer.nodeBuffer.get("tiles-root");
            i && i.ensureVisible() && (n = j.intersectObjects(i.children, !0));
            var o = new THREE.Vector3;
            return D.intersectSphere(L, o),
            n.length > 0 ? n[0].point : this._getIntersectPoint()
        }
        let s = r.domElement.clientWidth * (U.x + 1) / 2
            , l = (1 - U.y) * r.domElement.clientHeight / 2
            , u = this.app.camera.screenToWorld(s, l);
        return new THREE.Vector3(u[0],u[1],u[2])
    }
    ,
    this._getIntersectQuaternion = function(t, e) {
        (new THREE.Vector3).copy(t);
        var n = new THREE.Vector3;
        n.copy(t),
        n.normalize();
        var r = new THREE.Quaternion;
        r.setFromUnitVectors(new THREE.Vector3(0,1,0), n);
        var a = new THREE.Quaternion;
        return a.setFromAxisAngle(new THREE.Vector3(0,1,0), Math.PI / 2 + e),
        r.multiply(a),
        r.normalize(),
        r
    }
    ,
    this._correctCube = function() {
        var t = this._getIntersectPoint();
        k.position.copy(t);
        var e = CMAP.Util.getAnglesFromPosition(t.toArray());
        k.setAngles(e)
    }
    ,
    this._correctSphericalRotation = function(t) {
        var e = new THREE.Vector3;
        if (e.copy(t),
        k.worldToLocal(e),
        h.setFromVector3(e),
        0 !== r.target.length()) {
            var n = r.object.position.distanceTo(this._getIntersectPoint());
            h.radius = n
        }
        h.phi = -h.phi,
        h.theta = Math.PI + h.theta,
        !1
    }
    ,
    this._getAngle = function() {
        if (0 !== r.target.length()) {
            var t = new THREE.Vector3;
            t.copy(r.target),
            t.normalize();
            var e = new THREE.Vector3(0,6378e3,0);
            e.sub(this.object.position),
            e.normalize();
            var n = new THREE.Vector3;
            this.object.getWorldDirection(n),
            n.projectOnPlane(t),
            e.projectOnPlane(t);
            var a = e.angleTo(n);
            return n.cross(e),
            n.sub(t),
            n.length() <= 1 && (a *= -1),
            a
        }
    }
    ,
    this.setTargetLimit = function(t) {
        if (t) {
            const e = t.min
                , n = t.max;
            e && n && e.length > 1 && n.length > 1 && (this.targetLimitData = {
                min: [e[0], e[1]],
                max: [n[0], n[1]]
            })
        } else
            this.targetLimitData = void 0
    }
    ,
    this.autoFixTarget = function(t) {
        if (!H && r.app && (r.app.scene.add(k),
        k.visible = !1,
        H = !0,
        !0),
        A) {
            if (r.dispatchEvent(i),
            r.enableDamping || (A = !1),
            B.multiply(F),
            r.targetLimitData) {
                const t = r.target.clone().applyQuaternion(B)
                    , e = r.targetLimitData.min
                    , n = r.targetLimitData.max;
                let a = THING.Math.world2Lonlat(t.toArray());
                if (a[0] < e[0] || a[0] > n[0] || a[1] < e[1] || a[1] > n[1])
                    return
            }
            if (t.applyQuaternion(B),
            r.object.updateMatrixWorld(!0),
            0 !== r.target.length()) {
                var e = new THREE.Vector3;
                e.copy(t),
                e.normalize(),
                r.object.up.copy(e),
                r.target.applyQuaternion(B)
            } else {
                var n = this._getIntersectPoint();
                n.y += 100,
                r.target.copy(n)
            }
            r.object.lookAt(r.target)
        } else if (P) {
            r.dispatchEvent(i),
            P = !1;
            var a = this._getIntersectPoint();
            let t = new THREE.Vector3;
            t.copy(k.position),
            t.normalize();
            var o = new THREE.Vector3;
            o.setFromSpherical(h),
            o.applyMatrix4(k.matrixWorld),
            r.object.up.copy(t),
            r.object.position.copy(o),
            r.target.copy(a),
            r.object.lookAt(r.target)
        } else if (S || R) {
            r.dispatchEvent(i);
            var s = r.object.position.distanceTo(this._getIntersectPoint());
            if (s > r.maxDistance && R || s < r.minDistance + r._distanceFixFactor && S)
                h.radius = s,
                p = 1;
            else {
                var l = this._getIntersectPointByMouse(U.x, U.y)
                    , u = new THREE.Vector3;
                u.copy(r.object.position),
                u.sub(l),
                u.normalize();
                var d = this._getIntersectPointByMouse(0, 0)
                    , f = new THREE.Vector3;
                f.copy(r.object.position),
                f.sub(d),
                f.normalize();
                var m = f.dot(u)
                    , g = c.radius * p - c.radius;
                let t = THING.App.current._delay;
                t > 100 && (t = 100),
                t && r.zoomSpeed && (g = Math.abs(g) / g * r.zoomSpeed * t / 1e3 * 618e4),
                h.radius = Math.max(this.minDistance, h.radius + g * m),
                h.radius >= r.maxDistance && R && (h.radius = r.maxDistance),
                h.radius <= r.minDistance && S && (h.radius = r.minDistance + r._distanceFixFactor);
                var v = new THREE.Vector3;
                if (v.setFromSpherical(h),
                isNaN(v.x))
                    return;
                u.multiplyScalar(g),
                r.object.position.add(u);
                var y = r._isCameraStatic;
                r._isCameraStatic = !1,
                this._correctCube(),
                r._isCameraStatic = y,
                v.applyMatrix4(k.matrixWorld),
                r.object.position.copy(v),
                r.object.up.copy(r.object.position),
                r.target.copy(k.position),
                r.enableDamping || (S = !1,
                R = !1)
            }
        }
    }
    ,
    this.addEventListener("start", function() {
        r._isCameraStatic = !1
    }),
    this.addEventListener("end", function() {
        r._isCameraStatic = !0
    }),
    this.update = (n = new THREE.Vector3,
    function() {
        var t = r.object.position;
        n.copy(t),
        c.setFromVector3(n),
        f.setFromVector3(r.target),
        f.radius = 6378e3,
        r.enabled && this.autoFixTarget(t),
        r.object.lookAt(r.target),
        this._correctCube(),
        this._correctSphericalRotation(t);
        var e = r.object.position.distanceTo(this._getIntersectPoint());
        return r.earthPanSpeed = r.panSpeed / .1 * e / 3e7,
        r.zoomSpeed = h.radius / 4e6 * this.zoomFactor,
        !0 === r.enableDamping ? A ? (d.x *= 1 - r.dampingFactor,
        d.y *= 1 - r.dampingFactor,
        z(d.x),
        q(d.y),
        (P || S || R || d.x > -1e-10 && d.x < 1e-10 || d.y > -1e-10 && d.y < 1e-10) && (A = !1,
        d.set(0, 0))) : S ? (p += (1 - p) * r.dampingZoomFactor * THING.App.current._delay * r.zoomDelayFactor) > .99999999 && (p = 1,
        S = !1) : R && (p -= (p - 1) * r.dampingZoomFactor * THING.App.current._delay * r.zoomDelayFactor) < 1.0000001 && (p = 1,
        R = !1) : (d.set(0, 0),
        p = 1,
        A = !1,
        P = !1),
        m.set(0, 0, 0),
        !1
    }
    ),
    this.dispose = function() {
        r.domElement.removeEventListener("contextmenu", st, !1),
        r.domElement.removeEventListener("mousedown", onMousedown, !1),
        r.domElement.removeEventListener("wheel", onWheel, !1),
        r.domElement.removeEventListener("touchstart", at, !1),
        r.domElement.removeEventListener("touchend", ot, !1),
        r.domElement.removeEventListener("touchmove", it, !1),
        r.domElement.ownerDocument.removeEventListener("mousemove", onMousemove, !1),
        r.domElement.ownerDocument.removeEventListener("mouseup", omMouseup, !1),
        window.removeEventListener("keydown", rt, !1)
    }
    ;
    var r = this
        , a = {
        type: "wheel"
    }
        , i = {
        type: "change"
    }
        , o = {
        type: "start"
    }
        , s = {
        type: "end"
    }
        , l = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
    }
        , u = l.NONE;
    r._getState = function() {
        return u
    }
    ,
    r._setState = function(t) {
        u = t
    }
    ;
    var c = new THREE.Spherical
        , h = new THREE.Spherical;
    h.theta = Math.PI / 2,
    h.phi = -.01,
    h.radius = this.panStander;
    var d = new THREE.Vector2
        , f = (new THREE.Spherical,
    new THREE.Spherical);
    f.radius = 6378e3;
    new THREE.Spherical,
    new THREE.Cylindrical,
    new THREE.Cylindrical;
    var p = 1
        , m = new THREE.Vector3
        , g = new THREE.Vector2
        , v = new THREE.Vector2
        , y = new THREE.Vector2
        , _ = new THREE.Vector2
        , x = new THREE.Vector2
        , b = new THREE.Vector2
        , w = new THREE.Vector2
        , C = new THREE.Vector2
        , E = new THREE.Vector2
        , T = new THREE.Vector2
        , M = new THREE.Vector2
        , A = (new THREE.Vector3,
    new THREE.Vector3,
    !1)
        , P = !1
        , S = !1
        , R = !1
        , D = new THREE.Ray
        , j = new THREE.Raycaster
        , L = new THREE.Sphere(new THREE.Vector3(0,0,0),6378e3)
        , I = new THREE.BoxGeometry(10,10,10)
        , O = new THREE.MeshStandardMaterial({
        color: 65280
    })
        , k = new THREE.Mesh(I,O)
        , H = !1
        , F = new THREE.Quaternion
        , B = new THREE.Quaternion
        , U = {};
    function N() {
        return Math.pow(.95, r.zoomSpeed)
    }
    function z(t) {
        var e = new THREE.Vector3(0,6378e4,0);
        e.unproject(r.object),
        e.normalize(),
        d.x = t,
        t *= 1 - Math.sin(h.phi),
        B.setFromAxisAngle(e, -t)
    }
    function q(t) {
        var e = new THREE.Vector3(6378e3,0,0);
        e.unproject(r.object),
        e.normalize(),
        d.y = t,
        F.setFromAxisAngle(e, -t)
    }
    var V = function(t) {
        h.phi > -.001 || (h.theta -= t,
        h.theta > 2 * Math.PI && (h.theta = h.theta - 2 * Math.PI),
        h.theta < 0 && (h.theta = 2 * Math.PI + h.theta))
    }
        , W = function(t) {
        P = !0,
        h.phi += t,
        h.phi >= -.01 && (h.phi = -.01),
        h.phi < -r.maxPolarAngle && (h.phi = -r.maxPolarAngle),
        h.phi > -r.minPolarAngle && (h.phi = -r.minPolarAngle)
    }
        , G = function(t, e) {
        var n = r.domElement === document ? r.domElement.body : r.domElement;
        let a = r.rotateSpeed / .07;
        r.object.isPerspectiveCamera ? (V(2 * Math.PI * t / n.clientWidth * a),
        W(2 * Math.PI * e / n.clientHeight * a)) : r.object.isOrthographicCamera ? (V(t * (r.object.right - r.object.left) / r.object.zoom / n.clientWidth, r.object.matrix),
        W(e * (r.object.top - r.object.bottom) / r.object.zoom / n.clientHeight, r.object.matrix)) : (THING.Utils.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),
        r.enablePan = !1)
    };
    function Y(t, e) {
        let n = r.domElement;
        var a = n.currentStyle || window.getComputedStyle(n, null)
            , i = e ? e[0] : parseInt(a.borderLeftWidth, 10)
            , o = e ? e[1] : parseInt(a.borderTopWidth, 10)
            , s = n.getBoundingClientRect();
        return {
            x: t.clientX - i - s.left,
            y: t.clientY - o - s.top
        }
    }
    function K(t) {
        R = !0,
        r.object.isPerspectiveCamera ? p /= t : r.object.isOrthographicCamera ? (r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * t)),
        r.object.updateProjectionMatrix(),
        !0) : (THING.Utils.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
        r.enableZoom = !1)
    }
    function $(t) {
        S = !0,
        r.object.isPerspectiveCamera ? p *= t : r.object.isOrthographicCamera ? (r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / t)),
        r.object.updateProjectionMatrix(),
        !0) : (THING.Utils.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
        r.enableZoom = !1)
    }
    function X(t) {
        _.set(t.touches[0].pageX, t.touches[0].pageY)
    }
    function J(t) {
        x.set(t.touches[0].pageX, t.touches[0].pageY),
        b.subVectors(x, _),
        G(b.x, b.y),
        _.copy(x),
        r.update()
    }
    function onMousedown(t) {
        if (!1 !== r.enabled) {
            switch (t.preventDefault(),
            t.button) {
            case r.mouseButtons.ORBIT:
                if (!1 === r.enableRotate)
                    return;
                !function(t) {
                    let e = Y(t);
                    g.set(e.x, e.y)
                }(t),
                u = l.ROTATE;
                break;
            case r.mouseButtons.ZOOM:
                if (!1 === r.enableZoom)
                    return;
                !function(t) {
                    let e = Y(t);
                    w.set(e.x, e.y)
                }(t),
                u = l.DOLLY;
                break;
            case r.mouseButtons.PAN:
                if (!1 === r.enablePan)
                    return;
                !function(t) {
                    let e = Y(t);
                    _.set(e.x, e.y)
                }(t),
                u = l.PAN
            }
            u !== l.NONE && (r.domElement.ownerDocument.addEventListener("mousemove", onMousemove, !1),
            r.domElement.ownerDocument.addEventListener("mouseup", omMouseup, !1),
            r.dispatchEvent(o))
        }
    }
    function onMousemove(t) {
        if (!1 !== r.enabled)
            switch (t.preventDefault(),
            u) {
            case l.ROTATE:
                if (!1 === r.enableRotate)
                    return;
                !function(t) {
                    A = !0;
                    let e = Y(t);
                    v.set(e.x, e.y),
                    y.subVectors(v, g);
                    var n = r.domElement === document ? r.domElement.body : r.domElement;
                    z(2 * Math.PI * y.x / n.clientWidth * r.earthPanSpeed),
                    q(2 * Math.PI * y.y / n.clientHeight * r.earthPanSpeed),
                    g.copy(v),
                    r.update()
                }(t);
                break;
            case l.DOLLY:
                if (!1 === r.enableZoom)
                    return;
                !function(t) {
                    let e = Y(t);
                    C.set(e.x, e.y),
                    E.subVectors(C, w),
                    E.y > 0 ? K(N()) : E.y < 0 && $(N()),
                    w.copy(C),
                    r.update()
                }(t);
                break;
            case l.PAN:
                if (!1 === r.enablePan)
                    return;
                !function(t) {
                    let e = Y(t);
                    x.set(e.x, e.y),
                    b.subVectors(x, _),
                    G(b.x, b.y),
                    _.copy(x),
                    r.update()
                }(t)
            }
    }
    function omMouseup(t) {
        if (!1 === r.enabled)
            return r.domElement.ownerDocument.removeEventListener("mousemove", onMousemove, !1),
            void r.domElement.ownerDocument.removeEventListener("mouseup", omMouseup, !1);
        r.domElement.ownerDocument.removeEventListener("mousemove", onMousemove, !1),
        r.domElement.ownerDocument.removeEventListener("mouseup", omMouseup, !1),
        r.dispatchEvent(s),
        u = l.NONE
    }
    r.rotate = function(t, e) {
        switch (e = (e = THING.Utils.parseValue(e, 1e3)) / 180 * Math.PI,
        t) {
        case "up":
            this.pan(0, e);
            break;
        case "down":
            this.pan(0, -e);
            break;
        case "left":
            this.pan(e, 0);
            break;
        case "right":
            this.pan(-e, 0)
        }
    }
    ,
    r.move = function(t, e) {
        t = t / 180 * Math.PI,
        t *= this.earthPanSpeed,
        e = e / 180 * Math.PI,
        e *= this.earthPanSpeed,
        B.set(0, 0, 0, 1),
        F.set(0, 0, 0, 1),
        A = !0,
        z(t),
        q(e)
    }
    ,
    r.zoom = function(t, e) {
        switch (e = THING.Utils.parseValue(e, .95),
        e = Math.pow(e, r.zoomSpeed),
        t) {
        case "in":
            $(e);
            break;
        case "out":
            K(e)
        }
    }
    ,
    r.earthRotate = function(t, e) {
        switch (e = (e = THING.Utils.parseValue(e, 10)) / 180 * Math.PI,
        e *= this.earthPanSpeed,
        B.set(0, 0, 0, 1),
        F.set(0, 0, 0, 1),
        A = !0,
        t) {
        case "right":
            z(-e);
            break;
        case "left":
            z(e);
            break;
        case "up":
            q(e);
            break;
        case "down":
            q(-e)
        }
    }
    ;
    let et = function() {
        let t, e = !1;
        return function() {
            e = !0,
            t && e && clearTimeout(t),
            t = setTimeout(function() {
                r.dispatchEvent(s),
                e = !1
            }, 300)
        }
    }();
    function onWheel(t) {
        !1 === r.enabled || !1 === r.enableZoom || u !== l.NONE && u !== l.ROTATE || (t.preventDefault(),
        t.stopPropagation(),
        r.dispatchEvent(o),
        function(t) {
            let e = Y(t);
            U.x = e.x / r.domElement.clientWidth * 2 - 1,
            U.y = -e.y / r.domElement.clientHeight * 2 + 1,
            t.deltaY < 0 ? ($(N()),
            r.dispatchEvent(a)) : t.deltaY > 0 && (K(N()),
            r.dispatchEvent(a)),
            r.update()
        }(t),
        et())
    }
    function rt(t) {
        !1 !== r.enabled && !1 !== r.enableKeys && !1 !== r.enablePan && function(t) {
            switch (t.keyCode) {
            case r.keys.UP:
                G(0, r.keyPanSpeed),
                r.update();
                break;
            case r.keys.BOTTOM:
                G(0, -r.keyPanSpeed),
                r.update();
                break;
            case r.keys.LEFT:
                G(r.keyPanSpeed, 0),
                r.update();
                break;
            case r.keys.RIGHT:
                G(-r.keyPanSpeed, 0),
                r.update()
            }
        }(t)
    }
    function at(t) {
        if (!1 !== r.enabled) {
            switch (t.touches.length) {
            case 1:
                if (!1 === r.enableRotate)
                    return;
                !function(t) {
                    g.set(t.touches[0].pageX, t.touches[0].pageY)
                }(t),
                u = l.TOUCH_ROTATE;
                break;
            case 3:
                if (!1 === r.enableZoom)
                    return;
                X(t),
                u = l.TOUCH_PAN;
                break;
            case 2:
                if (T.set(t.touches[0].pageX, t.touches[0].pageY),
                M.set(t.touches[1].pageX, t.touches[1].pageY),
                !1 === r.enablePan)
                    return;
                X(t),
                function(t) {
                    var e = t.touches[0].pageX - t.touches[1].pageX
                        , n = t.touches[0].pageY - t.touches[1].pageY
                        , r = Math.sqrt(e * e + n * n);
                    w.set(0, r)
                }(t),
                u = l.TOUCH_PAN;
                break;
            default:
                u = l.NONE
            }
            u !== l.NONE && r.dispatchEvent(o)
        }
    }
    function it(t) {
        if (!1 !== r.enabled)
            switch (t.preventDefault(),
            t.stopPropagation(),
            t.touches.length) {
            case 1:
                if (!1 === r.enableRotate)
                    return;
                if (u !== l.TOUCH_ROTATE)
                    return;
                !function(t) {
                    A = !0,
                    v.set(t.touches[0].pageX, t.touches[0].pageY),
                    y.subVectors(v, g);
                    var e = r.domElement === document ? r.domElement.body : r.domElement;
                    z(2 * Math.PI * y.x / e.clientWidth * r.earthPanSpeed),
                    q(2 * Math.PI * y.y / e.clientHeight * r.earthPanSpeed),
                    g.copy(v),
                    r.update()
                }(t);
                break;
            case 3:
                if (!1 === r.enableZoom)
                    return;
                if (u !== l.TOUCH_PAN)
                    return;
                J(t);
                break;
            case 2:
                var e = new THREE.Vector2(t.touches[0].pageX,t.touches[0].pageY)
                    , n = new THREE.Vector2(t.touches[1].pageX,t.touches[1].pageY)
                    , a = e.sub(T).normalize()
                    , i = n.sub(M).normalize();
                if (a.dot(i) > 0) {
                    if (u = l.TOUCH_PAN,
                    !1 === r.enablePan)
                        return;
                    J(t)
                } else {
                    if (u = l.TOUCH_DOLLY,
                    !1 === r.enableZoom)
                        return;
                    !function(t) {
                        var e = t.touches[0].pageX - t.touches[1].pageX
                            , n = t.touches[0].pageY - t.touches[1].pageY
                            , a = Math.sqrt(e * e + n * n);
                        C.set(0, a),
                        E.subVectors(C, w),
                        E.y > 0 ? $(N()) : E.y < 0 && K(N()),
                        w.copy(C),
                        r.update()
                    }(t)
                }
                break;
            default:
                u = l.NONE
            }
    }
    function ot(t) {
        !1 !== r.enabled && (r.dispatchEvent(s),
        u = l.NONE)
    }
    function st(t) {
        !1 !== r.enabled && t.preventDefault()
    }
    r.domElement.addEventListener("contextmenu", st, !1),
    r.domElement.addEventListener("mousedown", onMousedown, !1),
    r.domElement.addEventListener("wheel", onWheel, !1),
    r.domElement.addEventListener("touchstart", at, !1),
    r.domElement.addEventListener("touchend", ot, !1),
    r.domElement.addEventListener("touchmove", it, !1),
    window.addEventListener("keydown", rt, !1),
    r.setLeftInteractive = function(t) {
        r.mouseButtons = t ? {
            ORBIT: 0,
            ZOOM: 1,
            PAN: 2
        } : {
            ORBIT: 2,
            ZOOM: 1,
            PAN: 0
        },
        r._leftInteractive = t
    }
    ,
    this.update(),
    r.pan = G,
    r.panDelta = b
}
,
THREE.EarthOrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype),
THREE.EarthOrbitControls.prototype.constructor = THREE.EarthOrbitControls,
Object.defineProperties(THREE.EarthOrbitControls.prototype, {
    leftInteractive: {
        get: function() {
            return this._leftInteractive
        },
        set: function(t) {
            this.setLeftInteractive(t)
        }
    },
    center: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .center has been renamed to .target"),
            this.target
        }
    },
    noZoom: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),
            !this.enableZoom
        },
        set: function(t) {
            THING.Utils.warn("THREE.EarthOrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),
            this.enableZoom = !t
        }
    },
    noRotate: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),
            !this.enableRotate
        },
        set: function(t) {
            THING.Utils.warn("THREE.EarthOrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),
            this.enableRotate = !t
        }
    },
    noPan: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .noPan has been deprecated. Use .enablePan instead."),
            !this.enablePan
        },
        set: function(t) {
            THING.Utils.warn("THREE.EarthOrbitControls: .noPan has been deprecated. Use .enablePan instead."),
            this.enablePan = !t
        }
    },
    noKeys: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),
            !this.enableKeys
        },
        set: function(t) {
            THING.Utils.warn("THREE.EarthOrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),
            this.enableKeys = !t
        }
    },
    staticMoving: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),
            !this.enableDamping
        },
        set: function(t) {
            THING.Utils.warn("THREE.EarthOrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),
            this.enableDamping = !t
        }
    },
    dynamicDampingFactor: {
        get: function() {
            return THING.Utils.warn("THREE.EarthOrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),
            this.dampingFactor
        },
        set: function(t) {
            THING.Utils.warn("THREE.EarthOrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),
            this.dampingFactor = t
        }
    },
    minPolarAngle: {
        get: function() {
            return this._minPolarAngle
        },
        set: function(t) {
            this._minPolarAngle = t
        }
    },
    maxPolarAngle: {
        get: function() {
            return this._maxPolarAngle
        },
        set: function(t) {
            this._maxPolarAngle = t < this.maxPitchAngle * Math.PI / 180 ? t : this.maxPitchAngle * Math.PI / 180
        }
    }
}),
THREE.EarthOrbitControls.prototype.setLookAt = function(t) {
    this.object.lookAt(new THREE.Vector3(t[0],t[1],t[2]))
}
;
const o = 2e7
    , s = 10
    , l = Math.pow(500 / o, 1 / 18)
    , u = 20
    , c = o * Math.exp(u * Math.log(l))
    , h = 22;
var LevelController = class {
    static getLevelByDistance(t) {
        return t <= s ? h : t < c ? h - 1 - Math.floor((t - s) / ((c - s) / (h - u))) : Math.abs(Math.ceil(Math.log(t / o) / Math.log(l)))
    }
    static getCurentLevel(t) {
        let e = t.camera.curOrbit.object.position.distanceTo(t.camera.curOrbit._getIntersectPoint());
        return this.getLevelByDistance(e)
    }
    static getCurentVisible(t, e, n) {
        let a = !0;
        n = THING.Utils.parseValue(n, 3e3);
        let i = t.camera.curOrbit.object.position.distanceTo(t.camera.curOrbit._getIntersectPoint());
        if (e instanceof Array) {
            let n = t.camera.curOrbit.object.position;
            n = [n.x, n.y, n.z];
            let a = MapUtil.convertLonlat2World(e, 1);
            i = t3djs.math.vectorDistance(n, a)
        }
        return i < n && (a = !1),
        a
    }
    static getDistanceByLevel(t) {
        let e = 0;
        return e = (t = Math.floor(t)) <= 0 ? o : t >= h ? s : t > u ? ((e = o * Math.exp(u * Math.log(l))) - s) / (h - u) : o * Math.exp(t * Math.log(l))
    }
    static getCameraHeightByLevel(t) {
        var e = this.getDistanceByLevel(t)
            , n = THING.App.current.camera.getCameInfo().pitch;
        return e * Math.sin(Math.degToRad(n))
    }
}
;
var LayerCollection = class extends THING.Selector {
    constructor(t) {
        super(t),
        this.app = t
    }
    removeAll(t) {
        for (let e = this.objects.length - 1; e >= 0; e--)
            this.remove(this.objects[e], t)
    }
    remove(t) {
        t.isBaseObject && t.destroy(),
        super.remove(t)
    }
}

var BaseLayerCollection = class extends  LayerCollection {
    constructor(t) {
        super(t),
        this._uEarth = t.uEarth,
        this._visible = !0,
        this._depthMode = THING.App.current.uEarth.depthMode
    }
    add(t, e) {
        return super.add(t),
        "TileLayer" === t.layerType ? t.visible && (this._uEarth._earthInstance.addTileLayer(t, e),
        t.style.night = this._uEarth.style.night,
        this._uEarth._earthInstance.tileEarth.changeStyle()) : "Tile3dLayer" === t.layerType ? this._uEarth._earthInstance.addTile3dLayer(t) : "TerrainLayer" === t.layerType ? this._uEarth.terrainLayer.url = t.url : "VectorBaseLayer" === t.layerType && t3djs.rootNode.attachObject(t),
        this._uEarth.allLayers.add(t),
        this.buildReturnObject(this.objects)
    }
    remove(t) {
        if ("TileLayer" === t.layerType)
            this._uEarth._earthInstance.removeTileLayer(t),
            this._uEarth._earthInstance.tileEarth.changeStyle();
        else if ("Tile3dLayer" === t.layerType)
            this._uEarth._earthInstance.removeTile3dLayer(t);
        else if ("Terrain" === t.layerType)
            this._uEarth.terrainLayer.url = "";
        else if ("VectorBaseLayer" === t.layerType) {
            THING.App.current.uEarth.depthMode = this._depthMode;
            let e = t._layer || t.node;
            t3djs.rootNode.remove(e),
            t3djs.rootNode.removeChildMaterialBuffer(e)
        }
        return super.remove(t),
        this._uEarth.allLayers.remove(t),
        this.buildReturnObject(this.objects)
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        let e = t3djs.buffer.nodeBuffer.get("tiles-root");
        e && (e.visible = t);
        let n = t3djs.buffer.nodeBuffer.get("earthAtmosphereNode");
        n && (n.visible = t),
        this._visible = t
    }
}
;
var UserLayerCollection = class extends  LayerCollection {
    constructor(t) {
        super(t),
        this.app = t,
        this._uEarth = t.uEarth
    }
    add(t) {
        return t.isLayer || THING.Utils.warn("only layer can be added"),
        "TileFeatureLayer" !== t.layerType && "TileBuildingLayer" !== t.layerType && "Tile3dLayer" !== t.layerType || this._uEarth._earthInstance.addTile3dLayer(t),
        t3djs.rootNode.attachObject(t),
        super.add(t),
        this._uEarth.allLayers.add(t),
        setTimeout(()=>{
            this.app.rendererManager._mainRenderer.dirty()
        }
        , 20),
        this.buildReturnObject(this.objects)
    }
    remove(t, e) {
        let n;
        "string" == typeof t ? n = (n = this._uEarth.allLayers.query("#" + t))[0] : "object" == typeof t ? n = t : "number" == typeof t && (n = this.objects[t]);
        let r = n._layer || n.node;
        n.is2D ? t3djs.earthRoot.remove(r) : t3djs.rootNode.remove(r),
        t3djs.rootNode.removeChildMaterialBuffer(r),
        n._layerScene && n._layerScene.map(t=>{
            t.destroy()
        }
        ),
        this._uEarth.allLayers.remove(n),
        this.app.rendererManager._mainRenderer.dirty(),
        super.remove(n);
        for (var a = n.children.length - 1; a >= 0; a--)
            n.children[a].destroy();
        n.destroy(e)
    }
}
    , EarthMode = {
    Scene_2D: 0,
    Scene_3D: 1
};
class CampusManager extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t,
        this._visible = !0,
        this.scene = [],
        this._backups = {
            camera: {},
            lighting: {},
            postEffect: {}
        }
    }
    setup(t) {
        let app = this.app;
        var _this = this
            , earthRootBuffer = window.t3djs.buffer.nodeBuffer.get("earthRoot")
            , rootNode = window.t3djs.rootNode
            , earthRoot = window.t3djs.earthRoot;
        app.on(THING.EventType.LevelChange, function(t) {
            setTimeout(()=>{
                _this.onCampusLevelFly(t),
                app.picker.pickedResultFunc = function(t) {
                    return t
                }
            }
            , 10)
        });
        app.on(THING.EventType.Pick, function(e) {
            var level = app.level;
            if (level.current) {
                _this._lastPickedObject && _this._lastPickedObject.style && (_this._lastPickedObject.style.outlineColor = null);
                var object = e.object;
                (function(object) {
                    var current = app.level.current;
                    return !(!current || !object || object === current || "Ground" === object.type || object.isMarker || "Map" === object.type || current.isCampus && object.isChildOf(current.ground) || object.node.isChildOf(earthRootBuffer) || object.node.isChildOf(rootNode) || object.node.isChildOf(earthRoot))
                }
                )(object) && (object.style.outlineColor = level.options.outlineColor),
                _this._lastPickedObject = object
            }
        }, THING.EventTag.LevelPickOperation)
    }
    clearBackupInfo(t, e) {
        delete this._backups[t][e]
    }
    onCampusLevelFly(t) {
        var e = t.object;
        let n = e.parents
            , r = !1;
        if ("Campus" === e.type)
            r = !0;
        else
            for (let t = 0; t < n.length; t++)
                if (n[t].type && "Campus" === n[t].type) {
                    r = !0;
                    break
                }
        if (r) {
            var a, i, o = e.sceneJSONData ? e.sceneJSONData.camInfo : null;
            o && (a = o.eye.concat(),
            i = o.target.concat(),
            a = e.selfToWorld(a),
            i = e.selfToWorld(i));
            var s = t.position || this.getBackupInfoValue("camera", "Campus", "position") || a
                , l = t.target || this.getBackupInfoValue("camera", "Campus", "target") || i || e
                , u = t.radius || Math.min(e.boundingBox.radius, 300);
            this.app.camera.flyTo(this.buildFlyParams({
                position: s,
                target: l,
                radius: u
            }, t))
        }
    }
    getBackupInfoValue(t, e, n) {
        var r = this._backups[t][e];
        return r ? r[n] : null
    }
    buildFlyParams(t, e) {
        e = e || {};
        var n = this;
        let r = THING.Utils;
        t._flyStart = function() {
            n._levelChanging = !0
        }
        ,
        t._flying = function() {
            n._levelChanging = !0
        }
        ,
        t._flyStop = function() {
            n._levelChanging = !1
        }
        ,
        t._flyComplete = function() {
            n._levelChanging = !1
        }
        ,
        t.distance = t.distance || e.distance,
        t.time = r.parseValue(t.time || e.time, 1e3),
        t.keepDirection = r.parseValue(t.keepDirection || e.keepDirection, !1);
        var a = this.app.level.current;
        e.lastObject === a && (t.offset = t.offset || e.offset,
        t.worldOffset = t.worldOffset || e.worldOffset,
        t.radius = t.radius || e.radius || a.boundingBox.radius,
        t.xAngle = r.parseValue(t.xAngle || e.xAngle, null),
        t.yAngle = r.parseValue(t.yAngle || e.yAngle, null)),
        t.targetForFlyComplete = a;
        var i = a.userData.camInfo;
        if (i) {
            var o = a.parents.query(".Campus")[0];
            o && (t.target = o.selfToWorld(i.target),
            t.position = o.selfToWorld(i.eye))
        }
        return t
    }
    add(t) {
        this.scene.push(t)
    }
    customSetup(t) {}
    destroy() {
        this.scene.length > 0 && this.scene.map(t=>{
            t.destroy()
        }
        )
    }
    set visible(t) {
        this.scene.length > 0 && this.scene.map(e=>{
            e.visible = t
        }
        ),
        this._visible = t
    }
    get visible() {
        return this._visible
    }
}
THING.factory.registerClass("CampusManager", CampusManager);
var EarthFather = class {
    constructor(t, e) {
        t = t || {},
        this.id = t.id,
        this.name = t.name,
        this.radius = THING.Utils.parseValue(t.radius, 6378e3),
        this.position = THING.Utils.parseValue(t.position, [0, 0, 0]),
        this.scale = this.radius / 6378e3,
        this.mode = v.Scene_3D,
        this.state = "wait",
        this.ellipsoid = Cesium.Ellipsoid.WGS84,
        this.t3djs = e
    }
    setNearClipDistance(t) {
        this.app.camera.near = t
    }
    setFarClipDistance(t) {
        this.app.camera.far = t
    }
    update() {
        if (this.app.domElement.getClientRects()[0]) {
            const cameraPosition = this.app.camera.position
                , cameraPositionLength = THING.Math.getVectorLength(cameraPosition)
                , n = cameraPositionLength - this.radius
                , r = 5e7
                , a = this.app.camera.fov
                , i = this.app.domElement.getClientRects()[0].width / this.app.domElement.getClientRects()[0].height
                , o = cameraPositionLength * Math.tan(THING.Math.degToRad(a))
                , s = o * i
                , l = Math.pow(o * o + s * s, .5)
                , u = Math.pow(l * l + cameraPositionLength * cameraPositionLength, .5);
            u < r ? this.setFarClipDistance(r) : this.setFarClipDistance(u),
            n > 1e4 && n <= 1e5 && this.setNearClipDistance(100),
            n > 1e3 && n <= 1e4 ? this.setNearClipDistance(10) : n > 100 && n <= 1e3 ? 
                this.setNearClipDistance(1) : n > 1 && n <= 100 ? this.setNearClipDistance(.1) : n <= 1 ? 
                    this.setNearClipDistance(.01) : n > 1e5 && n < 6e7 && this.setNearClipDistance(n / 20)
        }
    }
}
var b = class {
    constructor(t, e) {
        this.name = MapUtil.getUUID()
    }
    setEdges(t) {
        this.edges = t
    }
    setUp(t, e, n=function() {}
    ) {
        if (this.params = e,
        this.layer = t,
        this.extent = t.extent,
        this.effect = void 0 === e.effect ? x.WireFrame : e.effect,
        this.minCoordinates = [],
        this.maxCoordinates = [],
        this._angle = void 0 === e.angle ? 0 : e.angle,
        this.extent) {
            var r = this._angle % 360;
            r < 0 && (r += 360),
            r >= 0 && r < 90 ? (this.minCoordinates = [this.extent.minX, this.extent.minY],
            this.maxCoordinates = [this.extent.maxX, this.extent.maxY]) : r >= 90 && r < 180 ? (this.minCoordinates = [this.extent.minX, this.extent.maxY],
            this.maxCoordinates = [this.extent.maxX, this.extent.minY]) : r >= 180 && r < 270 ? (this.minCoordinates = [this.extent.maxX, this.extent.maxY],
            this.maxCoordinates = [this.extent.minX, this.extent.minY]) : r >= 270 & r < 360 && (this.minCoordinates = [this.extent.maxX, this.extent.minY],
            this.maxCoordinates = [this.extent.minX, this.extent.maxY])
        }
        if (e.startCoordinates && (this.minCoordinates = e.startCoordinates),
        e.endCoordinates && (this.maxCoordinates = e.endCoordinates),
        this.minCoordinates.length < 2 || this.maxCoordinates.length < 2)
            return console.error("该数据没有extent也没有传入起点和终点，无法进行扫光"),
            void (this._error = !0);
        this.rootNode = t.node,
        this.meshes = this.rootNode.getMeshes(),
        this.inverseMatrixWorld = new THREE.Matrix4,
        this.originalMin = new THREE.Vector3,
        this.originalMax = new THREE.Vector3,
        this.min = new THREE.Vector3,
        this.max = new THREE.Vector3,
        this._speed = THING.Utils.parseValue(e.speed, 1),
        this.record = 1e3 / this._speed,
        this.speed = [1, 1, 1],
        this.running = 0,
        this.startPosition = new THREE.Vector3,
        this.endPosition = new THREE.Vector3,
        this.uvRatio = 1,
        this._textureLoader = new THREE.TextureLoader,
        this.texture = null,
        e.uvMapUrl && (this.texture = this._textureLoader.load(e.uvMapUrl)),
        e.color = e.color || [255, 255, 255],
        this.color = CMAP.Util.colorFormatNewToOld(e.color),
        this.color = new THREE.Vector3(this.color[0],this.color[1],this.color[2]);
        let a = 1e4;
        t.extent && (a = CMAP.Util.getSphericalDistance([t.extent.maxX, t.extent.maxY], [t.extent.minX, t.extent.minY])),
        this.maxDistance = THING.Utils.parseValue(e.maxDistance, a),
        this.bandWidth = THING.Utils.parseValue(e.bandSize, this.maxDistance),
        this.bandWidth = 2 * this.bandWidth,
        this.bandSize = THING.Utils.parseValue(e.bandWidth, 5e3),
        this.bandSize = 2 * this.bandSize,
        this.bandHeight = THING.Utils.parseValue(e.bandWidth, 1e3),
        this._size = [this.bandWidth, this.bandSize, this.bandHeight],
        this.blending = e.blending ? THREE.AdditiveBlending : THREE.NormalBlending,
        this.effect === x.Edge ? this.edges ? (this.edges.map(t=>{
            let e = t.material;
            e.depthWrite = !1,
            e.uniforms.color.value = this.color,
            e.uniforms.relativeModelMatrix.value = new THREE.Matrix4,
            this.texture && (e.defines.USE_UVMAP = !0,
            e.uniforms.uvMap.value = this.texture),
            e.needsUpdate = !0
        }
        ),
        this.init(),
        n("finish")) : this.createEdge(()=>{
            this.init(),
            n("finish")
        }
        ) : (this.init(),
        n("finish"))
    }
    createEdge(t=function() {}
    ) {
        console.time(),
        this.edges = [];
        let e = []
            , n = THING.Utils.parseValue(this.layer.renderOrder, 0);
        n -= .1,
        this.layer.node.traverse(t=>{
            if (t.isMesh) {
                let r = THREE.ScanningMaterial1({
                    color: this.color
                });
                r.depthWrite = !1,
                r.defines.USE_RELATIVE = !0,
                r.uniforms.relativeModelMatrix.value = new THREE.Matrix4,
                this.texture && (r.defines.USE_UVMAP = !0,
                r.uniforms.uvMap.value = this.texture),
                r.wireframe = !1,
                r.needsUpdate = !0;
                let a = t.geometry;
                window.EW && EW.setThreadsNumber(4);
                let i = THING.App.current.edgesGeometriesManager.get(a);
                if (i.isBufferGeometry) {
                    let e = new THREE.LineSegments(i,r);
                    e.renderOrder = n,
                    e.visible = !1,
                    t.parent.add(e),
                    t.__edgeLine = e,
                    t._scanningMat = r,
                    this.edges.push(t.__edgeLine)
                } else {
                    let a = i.then(e=>{
                        if (!a._break) {
                            let a = new THREE.LineSegments(e,r);
                            return a.renderOrder = n,
                            a.visible = !1,
                            t.parent.add(a),
                            t.__edgeLine = a,
                            t._scanningMat = r,
                            this.edges.push(t.__edgeLine),
                            Promise.resolve(a)
                        }
                    }
                    );
                    e.push(i)
                }
            }
        }
        ),
        0 === e.length ? (t("finish"),
        console.timeEnd()) : Promise.all(e).then(e=>{
            t("finish"),
            console.timeEnd()
        }
        )
    }
    showDebug(t) {
        (t = !1 !== t) ? (this.baseObject.node.visible = !0,
        this.debugBox.material.opacity = .3,
        this.debugObject.style.axisHelper = !0) : (this.baseObject.node.visible = !1,
        this.debugObject.style.axisHelper = !1,
        this.debugBox.material.opacity = 0)
    }
    init() {
        var t = this
            , e = CMAP.Util.convertLonlatToWorld(this.minCoordinates, this.layer.offsetHeight)
            , n = CMAP.Util.convertLonlatToWorld(this.maxCoordinates, this.layer.offsetHeight);
        this.startPosition = new THREE.Vector3(e[0],e[1],e[2]),
        this.endPosition = new THREE.Vector3(n[0],n[1],n[2]);
        var a = new THREE.Object3D;
        a.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);
        var i = MapUtil.positionToQuaternion(e, this.minCoordinates[0] + 90 - this._angle);
        a.setRotationFromQuaternion(i),
        this.rootNode.add(a),
        this.debugBox = new THREE.Mesh(new THREE.BoxGeometry(this.bandWidth,this.bandSize,this.bandHeight),new THREE.MeshStandardMaterial({
            color: new THREE.Color(1,0,0),
            transparent: !0,
            opacity: 0,
            depthWrite: !1
        })),
        a.add(this.debugBox),
        this.baseObject = this.layer.app.create({
            type: "Thing",
            userData: {
                SKIP_THEME: 1
            }
        }),
        this.baseObject.node = a,
        this.baseObject.node.visible = !1,
        this.baseObject.inheritVisible = !1,
        this.debugObject = this.layer.app.create({
            type: "Thing",
            userData: {
                SKIP_THEME: 1
            }
        }),
        this.debugObject.node = this.debugBox,
        a.updateMatrixWorld(!0),
        this.inverseMatrixWorld.getInverse(a.matrixWorld),
        this.endPosition.applyMatrix4(this.inverseMatrixWorld),
        this.speed = this._getSpeed();
        for (var o = this.debugBox.geometry.vertices, s = new THREE.Box3, l = new THREE.Vector3, u = 0, c = o.length; u < c; u++)
            l.copy(o[u]),
            s.expandByPoint(l);
        this.min = s.min,
        this.max = s.max,
        this.originalMin.copy(s.min),
        this.originalMax.copy(s.max),
        this.meshes.map(e=>{
            var n;
            this.effect === x.WireFrame ? ((n = THREE.ScanningMaterial1({
                color: t.color
            })).depthWrite = !1,
            n.defines.USE_RELATIVE = !0,
            t.texture && (n.defines.USE_UVMAP = !0,
            n.uniforms.uvMap.value = t.texture),
            n.needsUpdate = !0,
            e._afterRendererMaterial || (e._afterRendererMaterial = []),
            e._afterRendererMaterial.push(n),
            e._scanningMat = n) : this.effect === x.Edge && (n = e._scanningMat,
            e.__edgeLine.visible = !0);
            let r = new THREE.Matrix4;
            r.copy(e.matrixWorld),
            r = r.multiplyMatrices(t.inverseMatrixWorld, r),
            n.uniforms.relativeModelMatrix.value = r,
            n.uniforms.maxPos.value.copy(t.max),
            n.uniforms.minPos.value.copy(t.min),
            n.uniforms.direction.value = new THREE.Vector3(t.speed[0],t.speed[1],t.speed[2]),
            n.blending = t.blending
        }
        )
    }
    triggerUpdate(t) {
        if (this._error)
            return;
        let e = THING.Utils.parseValue(t.angle, 0)
            , n = !1
            , r = !1
            , a = CMAP.Util.colorFormatNewToOld(t.color);
        this.color = void 0 === t.color ? this.color : new THREE.Vector3(a[0],a[1],a[2]),
        this.texture = t.uvMapUrl ? this._textureLoader.load(t.uvMapUrl) : this.texture,
        this._speed = t.speed || this._speed,
        this.record = 1e3 / this._speed,
        (t.bandWidth || t.bandSize || t.bandHeight) && (n = !0,
        this._size = [t.bandWidth || this._size[0], t.bandSize || this._size[1], t.bandHeight || this._size[2]]),
        e && (r = !0,
        this.baseObject.node.rotateY(e * Math.PI / 180)),
        n ? this._updateDebugBox() : r && this._updateBaseNode(),
        this._updateMaterial()
    }
    _updateDebugBox() {
        this.debugObject.destroy(),
        this.debugBox = new THREE.Mesh(new THREE.BoxGeometry(this.bandWidth,this.bandSize,this.bandHeight),new THREE.MeshBasicMaterial({
            color: new THREE.Color(1,0,0),
            transparent: !0,
            opacity: .3,
            depthWrite: !1
        })),
        this.baseObject.node.add(this.debugBox),
        this.debugObject = this.layer.app.create({
            type: "Thing"
        }),
        this.debugObject.node = this.debugBox,
        this._updateBaseNode()
    }
    _updateMaterial() {
        var t = this;
        this.meshes.map(e=>{
            var n = e._scanningMat;
            n.uniforms.color.value = t.color,
            n.uniforms.uvMap.value = t.texture
        }
        )
    }
    _updateBaseNode() {
        let t = this.baseObject.node;
        t.updateMatrixWorld(!0),
        this.inverseMatrixWorld.getInverse(t.matrixWorld),
        this.endPosition.applyMatrix4(this.inverseMatrixWorld),
        this.debugBox.position.set(0, 0, 0);
        for (var e = this.debugBox.geometry.vertices, n = new THREE.Box3, r = new THREE.Vector3, a = 0, i = e.length; a < i; a++)
            r.copy(e[a]),
            n.expandByPoint(r);
        this.min = n.min,
        this.max = n.max,
        this.originalMin.copy(n.min),
        this.originalMax.copy(n.max);
        var o = this;
        this.meshes.map(t=>{
            var e = t._scanningMat
                , n = new THREE.Matrix4;
            n.copy(t.matrixWorld),
            n = n.multiplyMatrices(o.inverseMatrixWorld, n),
            e.uniforms.relativeModelMatrix.value = n,
            e.uniforms.maxPos.value.copy(o.max),
            e.uniforms.minPos.value.copy(o.min)
        }
        )
    }
    _getSpeed() {
        return [0, 0, THING.App.current.deltaTime / 16.667 * this.maxDistance / this.record]
    }
    onUpdate() {
        if (this._error)
            return;
        this.running >= this.record && (this.min.copy(this.originalMin),
        this.max.copy(this.originalMax),
        this.debugBox.position.set(0, 0, 0),
        this.running = 0);
        let t = this.meshes;
        for (var e = 0; e < t.length; e++)
            this.effect === x.ChangeEffect ? t[e]._scanningMat._shader && (t[e]._scanningMat._shader.uniforms.maxPos.value.copy(this.max),
            t[e]._scanningMat._shader.uniforms.minPos.value.copy(this.min)) : (t[e]._scanningMat.uniforms.maxPos.value.copy(this.max),
            t[e]._scanningMat.uniforms.minPos.value.copy(this.min));
        this._updateData(this.debugBox.position, this.speed),
        this._updateData(this.min, this.speed),
        this._updateData(this.max, this.speed),
        this.running++
    }
    _updateData(t, e) {
        return t.z += THING.App.current.deltaTime / 16.66 * e[2],
        t
    }
    destroy(t=!0) {
        if (!this._error && (this.debugObject.destroy(),
        this.baseObject.destroy(),
        this.meshes.map(t=>{
            if (t._afterRendererMaterial)
                for (let e = t._afterRendererMaterial.length - 1; e >= 0; e--)
                    "scanning" === t._afterRendererMaterial[e].type && t._afterRendererMaterial.splice(e, 1)
        }
        ),
        t)) {
            let t = this.edges;
            t && t.length && t.map(t=>{
                t.destroy()
            }
            )
        }
    }
}
;
var w = class {
    constructor(t, e) {
        this.name = MapUtil.getUUID()
    }
    setUp(t, e, n=function() {}
    ) {
        this._layer = t,
        this._meshes = t.node.getMeshes(),
        this._setParams(e),
        this._getCenter(),
        this._createMaterial(),
        this.effect === x.Edge ? (this._scanningMat.wireframe = !1,
        this._scanningMat.visible = !1,
        this.createEdge(()=>{
            this._createCoordinate(this.edges),
            this._updateGlow(),
            this._scanningMat.visible = !0,
            n("finish")
        }
        )) : (this._createCoordinate(this._meshes),
        this._meshes.map(t=>{
            t._afterRendererMaterial || (t._afterRendererMaterial = []),
            t._afterRendererMaterial.push(this._scanningMat)
        }
        ),
        n("finish"))
    }
    _setParams(t={}) {
        let e = {
            color: "#5588aa",
            map: null,
            speed: 1,
            angle: 0,
            blending: !0,
            effect: x.Edge,
            scanningLength: .1,
            glow: !1,
            direction: [0, 1]
        };
        t = Object.assign({}, e, t),
        this.color = CMAP.Util.colorFormatNewToOld(t.color),
        this.color = new THREE.Color(this.color[0],this.color[1],this.color[2]),
        this.speed = t.speed,
        this.blending = t.blending ? 2 : 1,
        this._textureLoader = new THREE.TextureLoader,
        this.texture = null,
        this.direction = t.direction;
        let n = t.map ? t.map : t.uvMapUrl;
        n && (this.texture = this._textureLoader.load(n),
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping,
        this.texture.rotation = t.angle * Math.PI / 180,
        this.angle = t.angle),
        this.effect = t.effect,
        this.scanningLength = t.scanningLength,
        this.glow = t.glow
    }
    _getCenter() {
        let t = this._layer.extent;
        this.center = [(t.minX + t.maxX) / 2, (t.minY + t.maxY) / 2],
        this.min = [t.minX, t.minY],
        this.extentLength = [t.maxX - t.minX, t.maxY - t.minY]
    }
    _createCoordinate(t) {
        this._layer.node.updateMatrixWorld(!0),
        t.map(t=>{
            let e = t.geometry.attributes.position
                , n = e.count
                , a = new Float32Array(2 * n);
            for (var i = t.matrixWorld, o = 0, s = n; o < s; o++) {
                var l = new THREE.Vector3;
                l.x = e.getX(o),
                l.y = e.getY(o),
                l.z = e.getZ(o),
                l.applyMatrix4(i);
                var u = MapUtil.world2Lonlat([l.x, l.y, l.z], [0, 0, 0]);
                a[2 * o] = u[0],
                a[2 * o] -= this.min[0],
                a[2 * o] /= this.extentLength[0],
                a[2 * o + 1] = u[1],
                a[2 * o + 1] -= this.min[1],
                a[2 * o + 1] /= this.extentLength[1]
            }
            t.geometry.addAttribute("coordinates", new THREE.BufferAttribute(a,2))
        }
        )
    }
    _createMaterial() {
        let t = t3djs.materialManager.createMaterial(null, "scanningCityMaterial").getMaterial()[0];
        t.depthWrite = !1,
        this._scanningMat = t,
        t.uniforms.u_r.value = .1,
        t.uniforms.u_length.value = this.scanningLength,
        t.uniforms.scanningColor.value = this.color,
        t.uniforms.center.value = new THREE.Vector2(.5,.5),
        this.texture && (t.defines.USE_MAP = !0,
        t.uniforms.map.value = this.texture,
        this.texture.matrix.setUvTransform(this.texture.offset.x, this.texture.offset.y, this.texture.repeat.x, this.texture.repeat.y, this.texture.rotation, this.texture.center.x, this.texture.center.y),
        t.uniforms.uvTransform.value.copy(this.texture.matrix)),
        t.wireframe = !0,
        t.blending = this.blending
    }
    createEdge(t=function() {}
    ) {
        console.time(),
        this.edges = [];
        let e = []
            , n = THING.Utils.parseValue(this._layer.renderOrder, 0);
        n -= .1,
        this._layer.node.traverse(t=>{
            if (t.isMesh) {
                let r = t.geometry;
                window.EW && EW.setThreadsNumber(4);
                let a = THING.App.current.edgesGeometriesManager.get(r);
                if (a.isBufferGeometry) {
                    let e = new THREE.LineSegments(a,this._scanningMat);
                    t.parent.add(e),
                    e.renderOrder = n,
                    this.edges.push(e)
                } else {
                    let r = a.then(e=>{
                        if (!r._break) {
                            let r = new THREE.LineSegments(e,this._scanningMat);
                            return t.parent.add(r),
                            r.renderOrder = n,
                            this.edges.push(r),
                            Promise.resolve(r)
                        }
                    }
                    );
                    e.push(a)
                }
            }
        }
        ),
        0 === e.length ? (t("finish"),
        console.timeEnd()) : Promise.all(e).then(e=>{
            t("finish"),
            console.timeEnd()
        }
        )
    }
    _updateGlow() {
        THING.Utils.isNull(this.edges) || this.edges.length <= 0 || (this.glow ? this.edges.map(t=>{
            THING.App.current.effectManager.setEffect(t, "glow")
        }
        ) : this.edges.map(t=>{
            THING.App.current.effectManager.removeEffect(t, "glow")
        }
        ))
    }
    onUpdate() {
        const t = this.speed * THING.App.current.deltaTime / 16.667;
        this.texture ? (this.texture.offset.x -= .003 * t * this.direction[0],
        this.texture.offset.y -= .003 * t * this.direction[1],
        this.texture.matrix.setUvTransform(this.texture.offset.x, this.texture.offset.y, this.texture.repeat.x, this.texture.repeat.y, this.texture.rotation, this.texture.center.x, this.texture.center.y),
        this._scanningMat.uniforms.uvTransform.value.copy(this.texture.matrix)) : (this._scanningMat.uniforms.u_r.value += .003 * t,
        this.step = this._scanningMat.uniforms.u_r.value,
        this.step > .7 && (this._scanningMat.uniforms.u_r.value = .2)),
        this.glow && this._layer.app.rendererManager._mainRenderer.dirty("Glow")
    }
    showDebug(t) {
        THING.Utils.log("自定义扫光暂无debug模式")
    }
    updateScanning(t) {
        THING.Utils.isNull(t.color) || (this.color = CMAP.Util.colorFormatNewToOld(t.color),
        this.color = new THREE.Color(this.color[0],this.color[1],this.color[2]),
        this._scanningMat.uniforms.scanningColor.value = this.color),
        THING.Utils.isNull(t.direction) || (this.direction = t.direction),
        THING.Utils.isNull(t.speed) || (this.speed = t.speed);
        let e = THING.Utils.parseValue(t.map, t.uvMapUrl);
        e && (this.texture = this._textureLoader.load(e),
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping,
        this._scanningMat.uniforms.map.value = this.texture,
        this._scanningMat.needsUpdate = !0),
        THING.Utils.isNull(t.angle) || (this.texture && (this.texture.rotation = t.angle * Math.PI / 180,
        this.texture.matrix.setUvTransform(this.texture.offset.x, this.texture.offset.y, this.texture.repeat.x, this.texture.repeat.y, this.texture.rotation, this.texture.center.x, this.texture.center.y),
        this._scanningMat.uniforms.uvTransform.value.copy(this.texture.matrix)),
        this.angle = t.angle),
        THING.Utils.isNull(t.blending) || (this.blending = t.blending ? 2 : 1,
        this._scanningMat.blending = this.blending),
        THING.Utils.isNull(t.scanningLength) || (this._scanningMat.uniforms.u_length.value = t.scanningLength),
        THING.Utils.isNull(t.glow) || (this.glow = t.glow,
        this._updateGlow())
    }
    destroy() {
        this._meshes.map(t=>{
            if (t._afterRendererMaterial)
                for (let e = t._afterRendererMaterial.length - 1; e >= 0; e--)
                    "initialScanning" === t._afterRendererMaterial[e].type && t._afterRendererMaterial.splice(e, 1);
            t.geometry.deleteAttribute("coordinates")
        }
        ),
        this.edges && this.edges.map(t=>{
            t.parent.remove(t),
            t.dispose()
        }
        ),
        this._scanningMat = null,
        THING.App.current.rendererManager._mainRenderer.dirty()
    }
}
class GeoStyle extends THING.BaseStyle {
    constructor(t) {
        super(t)
    }
    get opacity() {
        return this.obj.renderer ? this.obj.renderer.opacity : super.opacity
    }
    set opacity(t) {
        this.obj.renderer ? this.obj.renderer.opacity = t : super.opacity = t
    }
}
THING.factory.registerClass("GeoStyle", GeoStyle);
var GeoStyle = GeoStyle
    , M = n(1);
class Layer extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t,
        this._layer = this.node,
        this._style = new GeoStyle(this),
        this.isLayer = !0
    }
    setupParent(t) {
        t || (t = {}),
        void 0 !== t.parent ? super.setParent(t) : CMAP.getCurrentMap() && CMAP.getCurrentMap().add(this)
    }
    customSetup(t) {
        var e, n, r, a;
        this.name = void 0 === t.name ? THREE.Math.generateUUID() : this.name,
        this.id = void 0 === t.id ? this.name : t.id,
        this.renderOrder = void 0 === t.renderOrder ? 0 : t.renderOrder,
        this.inheritVisible = void 0 === t.inheritVisible || t.inheritVisible,
        this._fixedPoint = t.fixedPoint || null,
        this._fixedHeight = THING.Utils.parseValue(t.fixedHeight, 3e3),
        this._updaterName = "layerUpdater_" + this.queryID,
        t.visibleLevel && (this._visibleLevel = t.visibleLevel,
        this._updateFunc = (e = this,
        n = t.visibleLevel,
        r = this._fixedPoint,
        a = this._fixedHeight,
        function() {
            e._setLevel.call(e, n, r, a)
        }
        )),
        this.visible = void 0 === t.visible || t.visible,
        this.app.on(THING.EventType.EnterLevel, "." + this.type, ()=>{}
        , THING.EventTag.LevelCameraControl),
        this.app.on(THING.EventType.EnterLevel, "." + this.type, ()=>{}
        , THING.EventTag.LevelSetBackground),
        this.app.on(THING.EventType.EnterLevel, "." + this.type, ()=>{}
        , THING.EventTag.LevelSetEffect),
        this.app.on(THING.EventType.EnterLevel, "." + this.type, t=>{}
        , THING.EventTag.LevelSceneOperations),
        this.app.on(THING.EventType.EnterLevel, "." + this.type, t=>{
            this.app.uEarth.onCampusLevelPickedResultFunc(t)
        }
        , THING.EventTag.LevelPickedResultFunc),
        this.app.on(THING.EventType.EnterLevel, "." + this.type, t=>{
            this.app.uEarth.onCampusLevelFly(t)
        }
        , THING.EventTag.LevelFly),
        this.app.on(THING.EventType.LeaveLevel, "." + this.type, t=>{
            this.app.uEarth.onCampusLevelSceneOperations()
        }
        , THING.EventTag.LevelSceneOperations)
    }
    onCampusLevelFly(t) {
        t.previous ? t.previous.type !== this.type && "Map" !== t.previous.type && this.app.camera.earthFlyTo(this._lastCameraInfo) : this.app.trigger("cameraFlyComplete")
    }
    setupComplete(t) {
        super.setupComplete(t),
        this.trigger(THING.EventType.LayerComplete, {
            object: this
        }),
        THING.App.current.trigger(THING.EventType.LayerComplete, {
            object: this
        })
    }
    canAcceptEvent(t) {
        return "update" === t.type || !(!t.object || !t.object.isChildOf(this))
    }
    get visibleLevel() {
        return this._visibleLevel
    }
    set visibleLevel(t) {
        this._visibleLevel = t,
        C.a.delete(this._updaterName),
        this._updateFunc = function(t, e, n, r) {
            return function() {
                t._setLevel.call(t, e, n, r)
            }
        }(this, this._visibleLevel, this._fixedPoint, this._fixedHeight),
        C.a.add(this._updaterName, this._updateFunc)
    }
    _setLevel(t, e, n) {
        if (this.node && this.node)
            if (e) {
                let t = d.getCurentVisible(this.app, e, n);
                this.node.visible = t
            } else {
                let e = d.getCurentLevel(this.app)
                    , n = !0;
                n = 2 === t.length ? !(e < t[0] || e > t[1]) : !(e < t[0]),
                this.node.visble !== n && (this.node.visible = n)
            }
    }
    get fixedPoint() {
        return this._fixedPoint
    }
    set fixedPoint(t) {
        var e, n, r;
        t instanceof Array && this._updateFunc && (this._fixedPoint = t,
        C.a.delete(this._updaterName),
        this._updateFunc = (e = this,
        n = this._fixedPoint,
        r = this._fixedHeight,
        function() {
            e._setLevel.call(e, null, n, r)
        }
        ),
        C.a.add(this._updaterName, this._updateFunc))
    }
    get fixedHeight() {
        return this._fixedHeight
    }
    set fixedHeight(t) {
        var e, n, r;
        this._updateFunc && (this._fixedHeight = t,
        C.a.delete(this._updaterName),
        this._updateFunc = (e = this,
        n = this._fixedPoint,
        r = this._fixedHeight,
        function() {
            e._setLevel.call(e, null, n, r)
        }
        ),
        C.a.add(this._updaterName, this._updateFunc))
    }
    show(t) {
        void 0 === t && (t = !0),
        this.visible = t
    }
    hide() {
        this.visible = !1
    }
    setVisible(t, e) {
        if (e)
            for (let e = 0; e < this.children.length; e++)
                this.children[e].visible = t;
        this.visible = t
    }
    get visible() {
        return this.node.visible
    }
    set visible(t) {
        if (!this.node)
            return null;
        this.node.visible = t,
        this._updateFunc && (t ? C.a.add(this._updaterName, this._updateFunc) : C.a.delete(this._updaterName)),
        this.renderer && "cool" === this.renderer._type && this.renderer._effect && this._updateEffect(t, this.renderer._glowStrength),
        THING.App.current.rendererManager._mainRenderer.dirty(),
        THING.App.current.picker.needUpdate = !0
    }
    _updatePostEffect(t) {
        THING.Utils.isNull(t.postRadialBlur) || this._setPostRadiusEffect(t.postRadialBlur),
        THING.Utils.isNull(t.postRadialBlur2) || this._setPostRadialBlur2(t.postRadialBlur2),
        THING.App.current.rendererManager._mainRenderer.dirty()
    }
    _updateEffect(t, e) {
        this.node.traverse(function(n) {
            n.material && M.a._updateEffect(n, "glow", t, e)
        })
    }
    get children() {
        return this._children
    }
    get renderer() {
        return this._renderer
    }
    get objects() {
        return this.children
    }
    set renderOrder(t) {
        this._renderOrder = t,
        super.style.renderOrder = t,
        this.children.map(function(e) {
            e.renderOrder = t
        })
    }
    get renderOrder() {
        return this._renderOrder
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].offsetHeight = t;
        this._offsetHeight = t
    }
    get offsetHeightField() {
        return this._offsetHeightField
    }
    set offsetHeightField(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].offsetHeightField = t;
        this._offsetHeightField = t
    }
    get style() {
        return this._style
    }
    startScanning(t) {
        var e = new b(this,t = t || {});
        this.scanning = e,
        this.scanning.setUp(this, t, ()=>{
            this.app.addControl(e, e.name)
        }
        )
    }
    startInitialScanning(t) {
        var e = new w(this,t);
        this.scanning = e,
        this.scanning.setUp(this, t, ()=>{
            this.app.addControl(e, e.name)
        }
        )
    }
    _setPostRadiusEffect(t) {
        for (var e = 0; e < this.children.length; e++) {
            this.children[e]._setPostRadiusEffect(t)
        }
    }
    _setPostRadialBlur2(t) {
        for (var e = 0; e < this.children.length; e++) {
            this.children[e]._setPostRadialBlur2(t)
        }
    }
    destroyScanning(t=!0) {
        this.scanning && (this.scanning.destroy(t),
        this.app.removeControl(this.scanning.name))
    }
    destroyInitialScanning(t=!0) {
        this.scanning && (this.scanning.destroy(t),
        this.app.removeControl(this.scanning.name))
    }
    updateScanning(t) {
        if (this.scanning) {
            let n = this.scanning.params
                , r = this.scanning.edges;
            if (n = Object.assign({}, n, t),
            r) {
                this.destroyScanning(!1);
                var e = new b(this,n);
                this.scanning = e,
                e.setEdges(r),
                this.scanning.setUp(this, n, ()=>{
                    this.app.addControl(e, e.name)
                }
                )
            } else
                this.destroyScanning(),
                this.startScanning(n)
        }
    }
    updateInitialScanning(t) {
        this.scanning && this.scanning.updateScanning(t)
    }
    showScanningDebug(t) {
        this.scanning && this.scanning.showDebug(t)
    }
    destroy(t) {
        super.destroy(),
        this._updateFunc && this._updaterName && C.a.delete(this._updaterName),
        (t = THING.Utils.parseValue(t, !1)) && (this.dataSource && this.dataSource.features && (this.dataSource.features = []),
        this.data && this.data.features && (this.data.features = []))
    }
    _playAnimation(t) {
        let e;
        t || (t = {}),
        void 0 === t.grow && (t.grow = !0),
        void 0 === t.type && (t.type = "opacity"),
        void 0 === t.ease && (t.ease = TWEEN.Easing.Linear.None),
        void 0 === t.time && (t.time = 2e3);
        let n = this;
        if ((e = t.grow ? new TWEEN.Tween({
            num: 0
        }).to({
            num: 1
        }, t.time) : new TWEEN.Tween({
            num: 1
        }).to({
            num: 0
        }, t.time)).easing(t.ease || TWEEN.Easing.Linear.None),
        void 0 === t.type || "opacity" === t.type) {
            var r = this.node.getMaterials();
            e.onUpdate(function(a) {
                (t.grow && a.num >= 1 || !t.grow && a.num <= 0) && (e.stop(),
                n.app.trigger("PlayAnimationEnd", {
                    object: n
                }),
                THING.App.current.rendererManager._mainRenderer.dirty()),
                r.map(function(t) {
                    t.opacity = a.num
                })
            })
        } else if ("size" === t.type) {
            var a = this.node.getRenderableNodes()
                , i = [];
            a.map(function(t) {
                var e = t.scale.clone();
                i.push(e)
            }),
            e.onUpdate(function(r) {
                (t.grow && r.num >= 1 || !t.grow && r.num <= 0) && (e.stop(),
                n.app.trigger("PlayAnimationEnd", {
                    object: n
                }),
                THING.App.current.rendererManager._mainRenderer.dirty()),
                a.map(function(t, e) {
                    var n = i[e]
                        , a = [n.x * r.num, n.y * r.num, n.z * r.num];
                    t.setScale(a)
                })
            })
        }
        e.start()
    }
}
THING.factory.registerClass("Layer", Layer);
var Layer = Layer;
class ThingLayer extends Layer {
    constructor(t) {
        super(t),
        this.app = t,
        this._uEarth = t.uEarth,
        this.node = this._layer = new THREE.Group,
        this._layerScene = []
    }
    customSetup(t) {
        super.customSetup(t)
    }
    add(t) {
        "Campus" !== t.type && super.add({
            object: t,
            keepNode: !0,
            keepVisible: !1
        }),
        Array.isArray(t) ? t.map(t=>{
            this._layer.add(t._layer)
        }
        ) : "GeoScene" === t.type ? (this._layerScene.push(t),
        t._marker && (this._layer.add(t._marker._layer),
        this._uEarth.sceneManager.add(t))) : "GeoPoint" === t.type || "GeoLine" === t.type || "GeoPolygon" === t.type || "GeoWater" === t.type || "GeoBuilding" === t.type ? this._layer.add(t._layer) : this._layer.add(t.node),
        setTimeout(()=>{
            this.app.rendererManager._mainRenderer.dirty()
        }
        , 20)
    }
    remove(t) {
        var e = this.children.indexOf(t);
        e > -1 && this.children.splice(e, 1),
        t.infoWindow && t.infoWindow.destroy(),
        this.node.remove(t.node),
        "GeoScene" === t.type && t.destroy()
    }
    removeAll() {
        for (; this.children.length > 0; )
            this.remove(this.children[0]);
        this._layerScene.map(t=>{
            t.destroy()
        }
        )
    }
    show(t) {
        this._layer.visible = t
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        super.visible = t;
        for (let e = 0; e < this.children.length; e++)
            this.children[e].visible = t;
        for (let e = 0; e < this._layerScene.length; e++)
            this._layerScene[e].visible = t;
        this._visible = t
    }
    get scene() {
        return this._layerScene
    }
    get curInitScene() {
        return this._uEarth.sceneManager.getCurInitScene()
    }
}
THING.factory.registerClass("ThingLayer", ThingLayer);
var ThingLayer = ThingLayer;
const D = ["addEffect", "brightness", "contrast", "gamma", "hue", "customColor", "saturation", "grayFilterEnable"]
    , j = ["TexSampler0", "TexSampler1", "TexSampler2", "TexSampler3", "TexSampler4", "TexSampler5", "TexSampler6"];
var LUtil = {
    recorder: function() {
        let t = [];
        return {
            push: function(e) {
                return t.length >= 2 && t.shift(),
                t.push(e),
                t
            },
            get: function() {
                return t
            },
            clear: function() {
                t.splice(0, t.length)
            }
        }
    },
    getFrameState: function(cameraInfo, frameState, mode, sseFactor=1) {
        let cameraPos = cameraInfo.cameraPos
            , viewPort = cameraInfo.viewPort
            , fov = cameraInfo.fov
            , cameraDirection = cameraInfo.cameraDirection
            , cameraUp = cameraInfo.cameraUp
            , aspectRatio = cameraInfo.aspectRatio;
        mode === v.Scene_2D ? frameState.mapProjection = new Cesium.WebMercatorProjection : mode === v.Scene_3D && (frameState.mapProjection = new Cesium.GeographicProjection),
        frameState.cameraPos.x = cameraPos[0],
        frameState.cameraPos.y = -cameraPos[2],
        frameState.cameraPos.z = cameraPos[1];
        let c = new Cesium.Cartesian3;
        if (mode === v.Scene_3D ? (c.x = -cameraPos[0],
        c.y = cameraPos[2],
        c.z = cameraPos[1]) : mode === v.Scene_2D && (c.x = cameraPos[1],
        c.y = cameraPos[0],
        c.z = -cameraPos[2]),
        frameState.positionWC = c,
        mode === v.Scene_3D)
            frameState.positionCartographic = frameState.mapProjection.ellipsoid.cartesianToCartographic(frameState.cameraPos);
        else if (mode === v.Scene_2D) {
            let t = new Cesium.Cartesian3;
            t.x = cameraPos[0],
            t.y = -cameraPos[2],
            t.z = cameraPos[1],
            frameState.positionCartographic = frameState.mapProjection.unproject(t)
        }
        let h = viewPort.actualWidth;
        viewPort.actualHeight;
        frameState.drawWidth = h,
        frameState.drawHeight = h / aspectRatio,
        fov = this.getFov(fov, cameraInfo.fovScale),
        fov = Math.PI * fov / 180;
        let fovy = aspectRatio <= 1 ? fov : 2 * Math.atan(Math.tan(.5 * fov) / aspectRatio);
        frameState.fov = fov,
        frameState.fovy = fovy,
        frameState.aspectRatio = aspectRatio,
        frameState.sseDenominator = 2 * sseFactor * Math.tan(.5 * fovy);
        frameState.perspectiveOffCenterFrustum.near = 1,
        frameState.perspectiveOffCenterFrustum.far = 5e8,
        frameState.perspectiveOffCenterFrustum.top = 1 * Math.tan(.5 * fovy),
        frameState.perspectiveOffCenterFrustum.sseDenominator = frameState.sseDenominator,
        frameState.perspectiveOffCenterFrustum.bottom = -e.perspectiveOffCenterFrustum.top,
        frameState.perspectiveOffCenterFrustum.right = aspectRatio * frameState.perspectiveOffCenterFrustum.top,
        frameState.perspectiveOffCenterFrustum.left = -e.perspectiveOffCenterFrustum.right;
        let directionWC = new Cesium.Cartesian3;
        mode === v.Scene_3D ? (directionWC.x = -cameraDirection[0],
        directionWC.y = cameraDirection[2],
        directionWC.z = cameraDirection[1]) : mode === v.Scene_2D && (directionWC.x = cameraDirection[1],
        directionWC.y = cameraDirection[0],
        directionWC.z = -cameraDirection[2]),
        frameState.directionWC = directionWC;
        let upWC = new Cesium.Cartesian3;
        return mode === v.Scene_3D ? (upWC.x = -cameraUp[0],
        upWC.y = cameraUp[2],
        upWC.z = cameraUp[1]) : mode === v.Scene_2D && (upWC.x = cameraUp[1],
        upWC.y = cameraUp[0],
        upWC.z = -cameraUp[2]),
        frameState.upWC = upWC,
        mode === v.Scene_2D ? frameState.mode = Cesium.SceneMode.COLUMBUS_VIEW : mode === v.Scene_3D && (frameState.mode = Cesium.SceneMode.SCENE3D),
        frameState.cullingVolume = frameState.perspectiveOffCenterFrustum.computeCullingVolume(frameState.positionWC, directionWC, upWC),
        frameState.context = {},
        frameState.frameNumber = Cesium.Math.incrementWrap(frameState.frameNumber, 15e6, 1),
        frameState.afterRender = [],
        frameState.time || (frameState.time = Cesium.JulianDate.fromDate(new Date)),
        frameState.camera = {
            positionWC: frameState.positionWC,
            positionCartographic: frameState.positionCartographic,
            directionWC: frameState.directionWC,
            frustum: frameState.perspectiveOffCenterFrustum
        },
        frameState.context.drawingBufferWidth = frameState.drawWidth,
        frameState.context.drawingBufferHeight = frameState.drawHeight,
        frameState.shadowState.shadowsEnabled = !1,
        frameState
    },
    tileNameCreater: function(t) {
        return "EarthTile_" + t._level + "_" + t._x + "_" + t._y
    },
    getMeterialName: function(t, e, n, r) {
        let a = t + "--" + e.boundingSphere3D.radius;
        for (let t = 0; t < n.length; t++) {
            if (n[t].readyImagery)
                a += "--" + this.createImageUrl(n[t].readyImagery) + "#" + n[t].readyImagery.imageryLayer.textureFlag
        }
        return a
    },
    isNeedUpdate: function(t, e, n, r) {
        if (t && t === e.boundingSphere3D.radius) {
            let t = window.t3djs.buffer.nodeBuffer.get(n);
            if (t)
                return r && r.add(t),
                !1
        }
        return !0
    },
    getReadyImageNums: function(t) {
        let e = 0;
        for (let n = 0; n < t.length; n++)
            t[n].readyImagery && e++;
        return e
    },
    isNeedUpdateTexture: function(t, e) {
        let n = e.data ? e.data.imagery : e;
        if (t) {
            let e = t.textureName;
            if (e.length !== n.length)
                return !0;
            for (let t = 0; t < e.length; t++) {
                let a = n[t].readyImagery;
                var r = this.createImageUrl(a);
                if (e[t] !== r)
                    return !0
            }
            return !1
        }
        return !0
    },
    cacheShow: function(nodeId, tileMaterialId, parent) {
        let node = window.t3djs.buffer.nodeBuffer.get(nodeId);
        node.material = window.t3djs.buffer.tileMaterialBuffer.get(tileMaterialId),
        node && parent.add(node)
    },
    cacheHide: function(t) {
        let e = window.t3djs.buffer.nodeBuffer.get(t);
        e && (e.show(!1),
        e.setPickEnabled(!0))
    },
    getFov: (t,e=2)=>t * e,
    createImageUrl(t) {
        if (t)
            return t.image ? t.image.currentSrc : ""
    },
    getFogExpDensity(t, e, n) {
        if (!e)
            return 0;
        let a = MapUtil.getDistance(t.camera.camera.position, t.camera.curOrbit._getIntersectPoint())
            , i = 0;
        if (i = a >= 701163.8668984541 ? 0 : .5 / a,
        t.camera.curOrbit.getRotationSpherePhi) {
            let e = t.camera.curOrbit.getRotationSpherePhi()
                , n = 1;
            i *= n = e > -.26185763889539315 ? 0 : e > -.6462719298409876 && e <= -.26185763889539315 ? .4 : e > -.8053399123012166 && e <= -.6462719298409876 ? .6 : e > -.964407894761466 && e <= -.8053399123012166 ? .6 : .8
        } else
            THING.Utils.warn("该插件不支持phi角计算，请更新最新插件");
        return i * n
    },
    getFogDensity(t, e, n) {
        if (!e)
            return 0;
        let a = 0;
        if (a = .6 / MapUtil.getDistance(t.camera.camera.position, t.camera.curOrbit._getIntersectPoint()),
        t.camera.curOrbit.getRotationSpherePhi) {
            let e = t.camera.curOrbit.getRotationSpherePhi()
                , n = 1;
            e > -.26185763889539315 ? n = .5 : e > -.6462719298409876 && e <= -.26185763889539315 ? n = .6 : e > -.8053399123012166 && e <= -.6462719298409876 ? n = .7 : e > -.964407894761466 && e <= -.8053399123012166 ? n = .85 : e > -1.1 && e <= -.964407894761466 && (n = .95),
            a *= n
        } else
            THING.Utils.warn("该插件不支持phi角计算，请更新最新插件");
        return a * n
    },
    setFogDensity(t, e) {
        for (var n = t.data.imagery, r = 0; r < n.length; r++)
            n[r].readyImagery.fogDensity = e
    },
    isNeedUpdateUniforms(t) {
        let e = !1;
        for (var n = 0, r = t.length; n < r; n++) {
            let r = t[n];
            r.updateFlag && r.updateFlag === this.getUpdateFlag(r) || (e = !0,
            r.updateFlag = this.getUpdateFlag(r))
        }
        return e
    },
    getUpdateFlag(t) {
        let e;
        return D.map(n=>{
            e = t.readyImagery && t.readyImagery.imageryLayer[n] ? n + ":" + t.readyImagery.imageryLayer[n] : n + ":0"
        }
        ),
        e
    },
    getTextureUniformNums(t) {
        let e = t.uniforms
            , n = 0;
        return j.map(t=>{
            e[t] && n++
        }
        ),
        n
    },
    cloneFloat32Array(t) {
        for (var e = t.length, n = new Float32Array(e), r = 0; r < e; r++)
            n[r] = t[r];
        return n
    }
};
const MAX_IMAGERY_LENGTH = 12
    , Material1 = ["Material1"]
    , textureRectangle0 = ["textureRectangle0"]
    , textureTransAndScale0 = ["textureTransAndScale0"]
    , brightness0 = ["brightness0"]
    , alphaIndex0 = ["alphaIndex0"]
    , earthColor0 = ["earthColor0"]
    , isAddEffect0 = ["isAddEffect0"]
    , south1 = ["south1"]
    , north1 = ["north1"]
    , southMercatorY1 = ["southMercatorY1"]
    , oneOverMercatorHeight1 = ["oneOverMercatorHeight1"];
function processStrArr(arr) {
    //["Material1"] 变成
    //['Material1', 'Material2', 'Material3', 'Material4', 'Material5', 'Material6', 'Material7', 'Material8', 'Material9', 'Material10', 'Material11', 'Material12']
    const str = arr[0]
        , strCopy = str.substring(0, str.length - 1)
        , intStr = parseInt(str.substring(str.length - 1));
    for (let i = 1; i < MAX_IMAGERY_LENGTH; i++)
        arr.push(strCopy + (intStr + i))
}
processStrArr(Material1),
processStrArr(textureRectangle0),
processStrArr(textureTransAndScale0),
processStrArr(brightness0),
processStrArr(alphaIndex0),
processStrArr(earthColor0),
processStrArr(isAddEffect0),
processStrArr(south1),
processStrArr(north1),
processStrArr(southMercatorY1),
processStrArr(oneOverMercatorHeight1);
var KVMap = new Map;
THING.EventType.TileLoadedInCurrentView = "TileLoadedInCurrentView",
THING.Utils.debounce = ((t,e)=>{
    let n;
    return function() {
        let r = this
            , a = arguments;
        clearTimeout(n),
        n = setTimeout(function() {
            t.apply(r, a)
        }, e)
    }
}
);
let K = !1;
var THINGdebounce = THING.Utils.debounce(()=>{
    K = !0
}
, 500);
function X() {
    K && (THING.App.current.trigger(THING.EventType.TileLoadedInCurrentView),
    K = !1)
}
function createTileMesh(_mesh, tile, nodeId, idStr, tileMaterialId) {//tileMaterialId：EarthTile_17_213403_49042--105.323991755599
    //nodeId：EarthTile_17_213403_49042
  let imagery = tile.data.imagery;
  if (imagery.length > 0) {
    let pos;
    let buffer;
    let verticesArray = LUtil.cloneFloat32Array(_mesh.vertices);
    let indices = _mesh.indices;
    let encoding = _mesh.encoding;
    let step = encoding.getStride();
    let numOfStep = verticesArray.length / step;
    pos = [-_mesh.center.x, _mesh.center.z, _mesh.center.y];
    this.quadTileRelativePos[nodeId] = pos;
    let geometry = new THREE.BufferGeometry;
    if (buffer = new THREE.InterleavedBuffer(verticesArray, step), geometry.setIndex(new THREE.BufferAttribute(indices, 1)), encoding.quantization === Cesium.TerrainQuantization.BITS12) {
      let uvs = new Float32Array(2 * numOfStep);
      for (let j = 0; j < verticesArray.length / step; j++) {
        let d;
        let theByte;
        let valueFloat;
        let pt;
        let y2;
        let y_mod = verticesArray[step * j] / 4096;
        let lng = Math.floor(y_mod) / 4096;
        let lat = y_mod - Math.floor(y_mod);
        let daywidth = verticesArray[step * j + 1] / 4096;
        daywidth = Math.floor(daywidth) / 4096;
        let right = new Cesium.Cartesian3(lng, lat, daywidth);
        let cartesian3Scratch = new Cesium.Cartesian3;
        Cesium.Matrix4.multiplyByPoint(encoding.fromScaledENU, right, cartesian3Scratch);
        d = cartesian3Scratch.x - _mesh.center.x;
        theByte = cartesian3Scratch.y - _mesh.center.y;
        valueFloat = cartesian3Scratch.z - _mesh.center.z;
        let y = verticesArray[step * j + 2] / 4096;
        pt = Math.floor(y) / 4096;
        y2 = y - Math.floor(y);
        verticesArray[j * step] = -d;
        verticesArray[j * step + 1] = valueFloat;
        verticesArray[j * step + 2] = theByte;
        uvs[2 * j] = pt;
        uvs[2 * j + 1] = y2;
        buffer = new THREE.InterleavedBuffer(verticesArray, step);
      }
      geometry.addAttribute("position", new THREE.InterleavedBufferAttribute(buffer, 3, 0, false));
      geometry.addAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    } else {
      geometry.addAttribute("position", new THREE.InterleavedBufferAttribute(buffer, 3, 0, false));
      geometry.addAttribute("uv", new THREE.InterleavedBufferAttribute(buffer, 2, 4, false));
    }
    updateImageryTileMaterial.call(this, imagery, nodeId, this.quadTileRelativePos[nodeId], this.quadTileEncode[nodeId], tileMaterialId);
    updateImageryTileMaterial2.call(this, imagery, nodeId, this.quadTileRelativePos[nodeId], tileMaterialId);
    let p = window.t3djs.buffer.nodeBuffer.get(nodeId);
    if (p) {
      p.parent.removeChild(p);
      window.t3djs.buffer.nodeBuffer.delete(nodeId);
    }
    let tileMaterial = t3djs.buffer.tileMaterialBuffer.get(tileMaterialId);
    var mesh = new THREE.Mesh(geometry, tileMaterial);
    mesh.renderLayer = 1;
    mesh.receiveShadow = true;
    mesh.visibilityFlags = 1024;
    mesh.name = nodeId;
    mesh.materialName = tileMaterialId;
    t3djs.buffer.nodeBuffer.add(nodeId, mesh);
    this.rootNode.add(mesh);
    mesh.setWorldPosition(pos);
    mesh.tile = tile;
    verticesArray = null;
    indices = null;
    encoding = null;
  }
}
;
function updateImageryTileMaterial(imagery, nodeId, quadTileRelativePos, quadTileEncode, tileMaterialId) {//添加了tileMaterialBuffer
    //( imagery, nodeId, this.quadTileRelativePos[nodeId], this.quadTileEncode[nodeId], tileMaterialId)
    let imageryLength = imagery.length;
    imageryLength > MAX_IMAGERY_LENGTH && (imageryLength = MAX_IMAGERY_LENGTH);
    let tileMaterial = t3djs.buffer.tileMaterialBuffer.get(tileMaterialId)
        , materialDirty = this.materialDirty;
    if (tileMaterial) {
        tileMaterial._textureCount !== imagery.length && (t3djs.buffer.tileMaterialBuffer.delete(tileMaterialId),
        (tileMaterial = (tileMaterial = window.t3djs.materialManager.getMaterial(Material1[imageryLength - 1])).getTechnique(0).getPass(0).material.clone())._textureCount = imageryLength,
        t3djs.buffer.tileMaterialBuffer.add(tileMaterialId, tileMaterial),
        materialDirty = !0)
    } else
        (tileMaterial = (tileMaterial = window.t3djs.materialManager.getMaterial(Material1[imageryLength - 1])).getTechnique(0).getPass(0).material.clone()).name = "tile",
        tileMaterial._textureCount = imageryLength,
        t3djs.buffer.tileMaterialBuffer.add(tileMaterialId, tileMaterial),
        materialDirty = !0;
    // let tileMaterial = tileMaterial;
    tileMaterial.polygonOffset = !0,
    tileMaterial.polygonOffsetFactor = 1,
    tileMaterial.polygonOffsetUnits = 100;
    let u = nodeId.split("_")[1];
    setTileMaterialUniform(tileMaterial, "czm_fogDensity", this._fogDensity),
    materialDirty && setTileMaterialUniform(tileMaterial, "isReProjection", u < 9 ? 1 : 0);
    for (let index = 0; index < imageryLength; index++) {
        const readyImagery = imagery[index].readyImagery;
        if (readyImagery) {
            let name = readyImagery.image.name;
            if (tileMaterial.uniforms["TexSampler" + index].value = window.t3djs.textureManager.getTexture(name),
            materialDirty) {
                let a = readyImagery.imageryLayer._layerIndex
                    , textureTranslationAndScale = imagery[index].textureTranslationAndScale
                    , o = [textureTranslationAndScale.x, textureTranslationAndScale.y, textureTranslationAndScale.z, textureTranslationAndScale.w]
                    , textureCoordinateRectangle = imagery[index].textureCoordinateRectangle
                    , u = [textureCoordinateRectangle.x, textureCoordinateRectangle.y, textureCoordinateRectangle.z, textureCoordinateRectangle.w];
                if (setTileMaterialUniform(tileMaterial, textureRectangle0[index], u),
                setTileMaterialUniform(tileMaterial, textureTransAndScale0[index], o),
                setTileMaterialUniform(tileMaterial, alphaIndex0[index], a),
                readyImagery.imageryLayer.imageryProvider._tilingScheme.__proto__ === Cesium.WebMercatorTilingScheme.prototype) {
                    let south = imagery[index].readyImagery.rectangle.south
                        , r = imagery[index].readyImagery.rectangle.north
                        , a = Math.sin(south)
                        , i = .5 * Math.log((1 + a) / (1 - a));
                    a = Math.sin(r);
                    let o = 1 / (.5 * Math.log((1 + a) / (1 - a)) - i);
                    setTileMaterialUniform(tileMaterial, south1[index], south),
                    setTileMaterialUniform(tileMaterial, north1[index], r),
                    setTileMaterialUniform(tileMaterial, southMercatorY1[index], i),
                    setTileMaterialUniform(tileMaterial, oneOverMercatorHeight1[index], o)
                }
                setTileMaterialUniform(tileMaterial, "objectPos", [quadTileRelativePos[0], quadTileRelativePos[1], quadTileRelativePos[2], 0]),
                setTileMaterialUniform(tileMaterial, "v3LightPosInput", [this._sunLight.sunDirection.x, this._sunLight.sunDirection.y, this._sunLight.sunDirection.z]),
                setTileMaterialUniform(tileMaterial, "fInnerRadius", 6378e3),
                setTileMaterialUniform(tileMaterial, "fOuterRadius", 6378e3 * 1.025),
                setTileMaterialUniform(tileMaterial, "ESun", 20)
            }
        } else
            imagery[index].loadingImagery && (tileMaterial.uniforms["TexSampler" + index].value = null,
            this.updateESunWhenLoadingImage && setTileMaterialUniform(tileMaterial, "ESun", 0))
    }
}
function updateImageryTileMaterial2(imagery, nodeId, quadTileRelativePos, tileMaterialId) {
    let flag = !1
        , imageryLength = imagery.length;
    imageryLength > 6 && (imageryLength = 6);
    let tileMaterial = t3djs.buffer.tileMaterialBuffer.get(tileMaterialId);
    if (!tileMaterial)
        return void THING.Utils.log("没有找到该瓦片材质");
    if (imagery[0].readyImagery) {
        let grayFilterPerBar = imagery[0].readyImagery.imageryLayer.grayFilterPerBar
            , grayFilterColorBar = imagery[0].readyImagery.imageryLayer.grayFilterColorBar
            , a = imagery[0].readyImagery.imageryLayer.grayFilterEnable
            , i = void 0 === imagery[0].readyImagery.imageryLayer.grayFilterIndex ? -1 : imagery[0].readyImagery.imageryLayer.grayFilterIndex;
        setTileMaterialUniform(tileMaterial, "grayFilterEnable", a),
        setTileMaterialUniform(tileMaterial, "grayFilterIndex", i),
        setGradient(tileMaterial, grayFilterPerBar, grayFilterColorBar);
        let gradientColorOverlayEnable = imagery[0].readyImagery.imageryLayer.gradientColorOverlayEnable;
        if (setTileMaterialUniform(tileMaterial, "gradientColorOverlayEnable", gradientColorOverlayEnable ? 1 : 0),
        gradientColorOverlayEnable) {
            setTileMaterialUniform(tileMaterial, "mapDirection", imagery[0].readyImagery.imageryLayer.gradientMapDirection);
            let gradientColorPerBar = imagery[0].readyImagery.imageryLayer.gradientColorPerBar
                , gradientColorBar = imagery[0].readyImagery.imageryLayer.gradientColorBar
                , gradientColorMapUrl = imagery[0].readyImagery.imageryLayer.gradientColorMapUrl
                , gradientAlongWithCameraEnable = imagery[0].readyImagery.imageryLayer.gradientAlongWithCameraEnable
                , gradientOpacity = imagery[0].readyImagery.imageryLayer.gradientOpacity;
            if (gradientAlongWithCameraEnable) {
                let t = 3174285.284198257
                    , distance = (MapUtil.getDistance(this.app.camera.camera.position, this.app.camera.curOrbit._getIntersectPoint()) - t) / (16747458.377761858 - t);
                setTileMaterialUniform(tileMaterial, "gradientOpacity", distance > 0 && distance <= 1 ? gradientOpacity - gradientOpacity * (1 - distance) : distance <= 0 ? 0 : gradientOpacity)
            } else
                setTileMaterialUniform(tileMaterial, "gradientOpacity", gradientOpacity);
            gradientColorMapUrl ? function(tileMaterial, gradientColorMapUrl, type) {
                if (!tileMaterial)
                    return void THING.Utils.warn("please check your material");
                var gradientColorMapUrl = gradientColorMapUrl
                    , gradientColorMapUrl2 = KVMap.get(gradientColorMapUrl);
                gradientColorMapUrl2 || (gradientColorMapUrl2 = (new THREE.TextureLoader).load(gradientColorMapUrl),
                KVMap.set(gradientColorMapUrl, gradientColorMapUrl2));
                "gradientColorMap" === type && (tileMaterial.uniforms.gradientColorMap.value = gradientColorMapUrl2)
            }(tileMaterial, gradientColorMapUrl, "gradientColorMap") : setGradient(tileMaterial, gradientColorPerBar, gradientColorBar, "gradientColorMap")
        }
    } else
        setTileMaterialUniform(tileMaterial, "grayFilterEnable", !1);
    if (void 0 === tileMaterial._tileNeedUpdate && (tileMaterial._tileNeedUpdate = !0),
    !tileMaterial._tileNeedUpdate)
        return;
    // let tileMaterial = tileMaterial;
    for (let index = 0; index < imageryLength; index++) {
        if (!imagery[index].readyImagery) {
            flag = !0;
            continue
        }
        let brightness = imagery[index].readyImagery.imageryLayer.brightness
            , r = imagery[index].readyImagery.imageryLayer.customColor
            , a = imagery[index].readyImagery.imageryLayer.addEffect
            , o = imagery[index].readyImagery.imageryLayer.hue
            , s = imagery[index].readyImagery.imageryLayer.contrast
            , u = imagery[index].readyImagery.imageryLayer.saturation
            , c = imagery[index].readyImagery.imageryLayer.gamma
            , h = 0 === c ? 1 : 1 / c
            , d = imagery[index].readyImagery.imageryLayer.night;
        setTileMaterialUniform(tileMaterial, brightness0[index], brightness),
        setTileMaterialUniform(tileMaterial, isAddEffect0[index], a ? 1 : 0),
        setTileMaterialUniform(tileMaterial, earthColor0[index], r),
        setTileMaterialUniform(tileMaterial, "contrast", s),
        setTileMaterialUniform(tileMaterial, "hue", o),
        setTileMaterialUniform(tileMaterial, "saturation", u),
        setTileMaterialUniform(tileMaterial, "textureGamma", h),
        setTileMaterialUniform(tileMaterial, "night", d)
    }
    flag || (tileMaterial._tileNeedUpdate = !1)
}
function setGradient(tileMaterial, gradientColorPerBar, gradientColorBar, gradientColorMap) {
    //(tileMaterial, gradientColorPerBar, gradientColorBar, "gradientColorMap")
    if (tileMaterial) {
        var i = gradientColorPerBar.toString() + "_" + gradientColorBar.toString()
            , o = KVMap.get(i);
        o || (o = MapUtil._generateGradientTextureByGray(gradientColorPerBar, gradientColorBar),
        KVMap.set(i, o)),
        gradientColorMap ? "gradientColorMap" === gradientColorMap && (tileMaterial.uniforms.gradientColorMap.value = o) : tileMaterial.uniforms.colorMapping.value = o
    } else
        THING.Utils.warn("please check your material")
}
function setTileMaterialUniform(tileMaterial, key, value, type) {
    if (tileMaterial)
        if ("grayFilterPerBar" !== type)
            if ("grayFilterColorBar" !== type)
                value instanceof Array ? 1 === value.length ? tileMaterial.uniforms[key].value = value : 2 === value.length ? (tileMaterial.uniforms[key].value.x = value[0],
                tileMaterial.uniforms[key].value.y = value[1]) : 3 === value.length ? (tileMaterial.uniforms[key].value.x = value[0],
                tileMaterial.uniforms[key].value.y = value[1],
                tileMaterial.uniforms[key].value.z = value[2]) : 4 === value.length && (tileMaterial.uniforms[key].value.x = value[0],
                tileMaterial.uniforms[key].value.y = value[1],
                tileMaterial.uniforms[key].value.z = value[2],
                tileMaterial.uniforms[key].value.w = value[3]) : tileMaterial.uniforms[key].value = value;
            else
                for (let i = 0; i < value.length; i++)
                    tileMaterial.uniforms[key].value[i].x = value[i][0],
                    tileMaterial.uniforms[key].value[i].y = value[i][1],
                    tileMaterial.uniforms[key].value[i].z = value[i][2];
        else
            value.map((n,r)=>{
                tileMaterial.uniforms[key].value[r] = n
            }
            );
    else
        THING.Utils.warn("please check your material")
}
var TileEarth = class extends EarthFather {
    constructor(app, options) {
        super(),
        this.autoAdjustClipping = !0,
        this.t3djs = t3djs,
        this.app = app,
        this._readyPromise = Cesium.when.defer(),
        this._ready = !1,
        this.tile3ds = [],
        this.isEarthShow = !1,
        this.fog = void 0 === options.fog || options.fog,
        this.updateESunWhenLoadingImage = THING.Utils.parseValue(options.updateESunWhenLoadingImage, !1),
        this.sseFactor = THING.Utils.parseValue(options.sseFactor, 1),
        this._sunLight = void 0 === options.sunLight ? void 0 : options.sunLight,
        this.fogDensity = 1,
        this._fogDensity = 0,
        this.fogExpDensity = 0,
        this.quadTileRadius = {},
        this.quadTileRelativePos = {},
        this.quadTileEncode = {},
        this.quadTileMatrial = {},
        this._util = LUtil,
        this._recorder = LUtil.recorder(),
        this.rootNode = new THREE.Group,
        this.rootNode.name = "tileEarth",
        window.t3djs.buffer.nodeBuffer.add("tiles-root", this.rootNode);
        var earthAndAtmosphere = this.t3djs.earthAndAtmosphere = new THREE.Group;
        earthAndAtmosphere._isSeneRoot_ = !0,
        window.t3djs.buffer.nodeBuffer.add("earthRoot", earthAndAtmosphere),
        earthAndAtmosphere.add(this.rootNode),
        CMAP.getCurrentMap().node.add(earthAndAtmosphere),
        this.dirty = !1,
        this.materialDirty = !1,
        this.tileCacheSize = 500,
        this._imageryLayerCollection = new Cesium.ImageryLayerCollection,
        this._useTerrain = options.terrainLayer._useTerrain,
        this._terrainProvider = options.terrainLayer._terrainLayer,
        this._frameState = new Cesium.FrameState,
        this._frameState.passes.render = !0,
        this._frameState.frameNumber = 0,
        this._frameState.cameraPos = new Cesium.Cartesian3,
        this._frameState.positionCartographic = new Cesium.Cartographic,
        this._frameState.perspectiveOffCenterFrustum = new Cesium.PerspectiveOffCenterFrustum,
        this._surfaceShaderSet = new Cesium.GlobeSurfaceShaderSet,
        this._surfaceShaderSet.baseVertexShaderSource = new Cesium.ShaderSource({
            sources: [Cesium.GroundAtmosphere, Cesium.GlobeVS]
        }),
        this._surfaceShaderSet.baseFragmentShaderSource = new Cesium.ShaderSource({
            sources: [Cesium.GlobeFS]
        });
        let _this = this;
        this._terrainProvider._readyPromise.then(function() {
            setTimeout(function() {
                _this._surface = new Cesium.QuadtreePrimitive({
                    tileProvider: new Cesium.GlobeSurfaceTileProvider({
                        terrainProvider: _this._terrainProvider,
                        imageryLayers: _this._imageryLayerCollection,
                        surfaceShaderSet: _this._surfaceShaderSet
                    }),
                    tileCacheSize: _this.tileCacheSize
                }),
                _this.app.trigger("terrainReady")
            }, 1e3)
        })
    }
    _createDepthGlobe() {
        let t = new THREE.MeshBasicMaterial;
        t.colorWrite = !1;
        let e = new THREE.SphereGeometry(6377990,128,128)
            , n = new THREE.Mesh(e,t);
        window.t3djs.rootNode.createChild("tiles").add(n)
    }
    _updateCameraNearFar() {
        super.update(this)
    }
    update() {
        if (this.autoAdjustClipping && this._updateCameraNearFar(),
        !this.isEarthShow)
            return;
        if (!this._surface)
            return;
        if (0 === this._imageryLayerCollection.length && 0 === this.tile3ds.length)
            return;
        let viewPort = {
            actualWidth: this.app.domElement.clientWidth,
            actualHeight: this.app.domElement.clientHeight
        };
        var camera = this.app.camera.camera
            , n = camera.convertLocalToWorldPosition([0, 1, 0])
            , r = camera.convertLocalToWorldPosition([0, 0, 0]);
        let cameraUp = [n[0] - r[0], n[1] - r[1], n[2] - r[2]];
        let cameraInfo = this.app.uEarth._cameraInfo || {
            cameraPos: this.app.camera.position,
            viewPort: viewPort,
            fov: this.app.camera.camera.cameraP.fov,    
            cameraDirection: this.app.camera.direction,
            cameraUp: cameraUp,
            aspectRatio: camera.cameraP.aspect
        };
        if (this.app.domElement.clientHeight !== this.app.domElement.clientWidth || 0 !== this.app.domElement.clientWidth) {
            if (this._frameState = LUtil.getFrameState(cameraInfo, this._frameState, this.mode, this.sseFactor),
            this._frameState.terrainExaggeration = CMAP.getCurrentMap().terrainLayer.terrainExaggeration,
            this._imageryLayerCollection.length > 0) {
                if (this._surface.beginFrame(this._frameState),
                this._surface.render(this._frameState),
                Cesium.RequestScheduler.update(),
                this.fog ? (this._fogDensity = LUtil.getFogDensity(this.app, this.fog, this.fogDensity),
                this.app.scene.fog.density = this._fogDensity) : this._fogDensity = 0,
                this.app.scene.fog && (this.app.scene.fog.density = LUtil.getFogExpDensity(this.app, this.fog, this.fogExpDensity)),
                this._sunLight) {
                    let _sunLight = this._sunLight;
                    this._scrubJulian = Cesium.JulianDate.addSeconds(_sunLight._startTime, _sunLight._timeLine.seconds, new Cesium.JulianDate),
                    _sunLight._currentTime = _sunLight._setAndUpdateClockTime(this._scrubJulian),
                    _sunLight.sunDirection = _sunLight._computeSunDirectionAndPosition(_sunLight._currentTime),
                    _sunLight._updateSunDirection()
                }
                this._surface.endFrame(this._frameState);
                let tiles = this._surface.tileProvider._tilesToRenderByTextureCount;
                this.draw(tiles)
            }
            for (let t = 0; t < this.rootNode.children.length; t++)
                this.rootNode.children[t].material.uniforms.sunDirection.value = this._sunLight.sunDirection;
            for (let t = 0; t < this.tile3ds.length; t++) {
                let e = this.tile3ds[t];
                e._3dtileset.update(this._frameState);
                let n = e._3dtileset._selectedTiles;
                e.draw3dTiles(n),
                e.callAfterRenderFunctions(this._frameState)
            }
        }
    }
    onUpdate() {
        this.update(),
        this.app.root.static && CMAP.getCurrentMap().node.updateMatrixWorld()
    }
    draw(tilesToRenderByTextureCount) {
        let tilesToRenderByTextureCountLength = tilesToRenderByTextureCount.length;
        if ("break" !== function(t) {
            let e = t.length;
            if (0 === e)
                return X(),
                "break";
            let n = []
                , r = []
                , a = "";
            for (let i = 0; i < e; i++) {
                let e = t[i];
                if (Cesium.defined(e))
                    for (let t = 0; t < e.length; t++) {
                        let i = e[t]
                            , tileName = LUtil.tileNameCreater(i);
                        LUtil.isNeedUpdateTexture(this.quadTileMatrial[tileName], i) && n.push(tileName),
                        this._useTerrain && i.data.terrainData && (this.mesh = i.data.terrainData._mesh,
                        Cesium.defined(this.mesh) && LUtil.isNeedUpdate(this.quadTileRadius[tileName], this.mesh, tileName) && r.push(tileName)),
                        a += tileName + ","
                    }
            }
            let i = this._recorder.push(a);
            return 1 === i.length ? "break" : i[0] === i[1] && 0 === r.length && 0 === n.length ? (X(),
            "break") : (THINGdebounce(),
            "renderer")
        }
        .call(this, tilesToRenderByTextureCount) || this.dirty) {
            for (let index = 0; index < tilesToRenderByTextureCountLength; index++) {
                let e = tilesToRenderByTextureCount[index];
                if (Cesium.defined(e))
                    for (let t = 0; t < e.length; t++) {
                        let n = e[t]
                            , r = "";
                        if (!n.data.terrainData)
                            return;
                        if (r = n.data.terrainData._mesh,
                        !Cesium.defined(r))
                            return
                    }
            }
            this.rootNode.children.length = 0;
            for (let i = 0; i < tilesToRenderByTextureCountLength; i++) {
                let tiles = tilesToRenderByTextureCount[i];
                if (Cesium.defined(tiles))
                    for (let j = 0; j < tiles.length; j++) {
                        let imagery, tile = tiles[j], _mesh = "", nodeId = "", tileMaterialId = "", idStr = "";
                        if (!tile.data.terrainData)
                            continue;
                        if (_mesh = tile.data.terrainData._mesh,
                        !Cesium.defined(_mesh))
                            continue;
                        imagery = tile.data.imagery,
                        tileMaterialId = idStr = (nodeId = LUtil.tileNameCreater(tile)) + "--" + _mesh.boundingSphere3D.radius,
                        this.mode === v.Scene_2D && (idStr += "_p");
                        let isNeedUpdate = LUtil.isNeedUpdate(this.quadTileRadius[nodeId], _mesh, nodeId)
                            , uuuu = !0;
                        if (isNeedUpdate || uuuu) {
                            this.quadTileMatrial[nodeId] || (this.quadTileMatrial[nodeId] = {}),
                            this.quadTileMatrial[nodeId].textureCount = imagery.length,
                            this.quadTileMatrial[nodeId].textureName = [];
                            for (let k = 0; k < imagery.length; k++) {
                                if (!imagery[k].readyImagery)
                                    continue;
                                let readyImagery = imagery[k].readyImagery
                                    , imageUrl = LUtil.createImageUrl(readyImagery);
                                this.quadTileMatrial[nodeId].textureName[k] = imageUrl
                            }
                            this.quadTileRadius[nodeId] = _mesh.boundingSphere3D.radius
                        }
                        isNeedUpdate ? (createTileMesh.call(this, _mesh, tile, nodeId, idStr, tileMaterialId),
                        _mesh = null,
                        this._ready || (this._ready = !0,
                        this._readyPromise.resolve(!0))) : (uuuu && (updateImageryTileMaterial.call(this, imagery, nodeId, this.quadTileRelativePos[nodeId], this.quadTileEncode[nodeId], tileMaterialId),
                        LUtil.cacheShow(nodeId, tileMaterialId, this.rootNode)),//nodeId, tileMaterialId, parent
                        updateImageryTileMaterial2.call(this, imagery, nodeId, this.quadTileRelativePos[nodeId], tileMaterialId))
                    }
            }
            this.dirty = !1
        }
    }
    show(t) {
        this.isEarthShow = void 0 === t || t,
        this.rootNode.show(t)
    }
    addTile3dLayer(t) {
        t._ellipsoid = this.ellipsoid,
        this.tile3ds.push(t)
    }
    removeTile3dLayer(t) {
        for (let e in this.tile3ds)
            this.tile3ds[e].node.uuid === t.node.uuid && this.tile3ds.splice(e, 1)
    }
    removeAllLayers() {
        this.tile3ds = [],
        this._imageryLayerCollection.removeAll(!0)
    }
    setBaseMap(t, e) {
        let n = "";
        var r = e.indexOf("{")
            , a = e.indexOf("}")
            , i = {
            url: e,
            maximumLevel: t.maximumLevel,
            loadByBlob: t._loadByBlob,
            timeout: t._timeout,
            tilingScheme: t._tilingScheme,
            tileType: t._tilingSchemeType
        };
        if (r > 0 && a > r && r !== e.indexOf("{x}") && r && r !== e.indexOf("{z}")) {
            var o = e.substring(r + 1, a)
                , s = o.split(",");
            e = e.replace(o, "s"),
            i.url = e,
            i.subDomains = s
        }
        for (let e = 0; e < this._imageryLayerCollection.length; e++) {
            let r = this._imageryLayerCollection.get(e);
            if (t.id === r.id) {
                let a = r._imageryProvider.url.indexOf(i.url);
                if (n = r._imageryProvider.url,
                a >= 0)
                    return;
                this._imageryLayerCollection.remove(r, !0);
                let o = this._imageryLayerCollection.addImageryProvider(new Cesium.createOpenStreetMapImageryProvider(i), e);
                return o.id = t.id,
                o.brightness = t.style.brightness,
                o.addEffect = t.style.addEffect,
                o.customColor = t.style._customColor,
                o.grayFilterEnable = t.style.grayFilterEnable,
                o.grayFilterPerBar = t.style.grayFilterPerBar,
                o.grayFilterColorBar = t.style._grayFilterColorBar,
                o.hue = t.style.hue,
                o.night = t.style.night,
                o.saturation = t.style.saturation,
                o.contrast = t.style.contrast,
                o.textureGamma = t.style.gamma,
                o.textureFlag = t.textureFlag,
                o.gradientColorOverlayEnable = t.style.gradientColorOverlayEnable,
                o.gradientMapDirection = t.style.gradientMapDirection,
                o.gradientColorPerBar = t.style.gradientColorPerBar,
                o.gradientColorBar = t.style._gradientColorBar,
                o.gradientColorMapUrl = t.style.gradientColorMapUrl,
                o.gradientOpacity = t.style._gradientOpacity,
                o.gradientAlongWithCameraEnable = t.style._gradientAlongWithCameraEnable,
                this.changeStyle(),
                void (t._tileLayer = o.imageryProvider)
            }
        }
    }
    addImageryLayer(t, e) {
        let n = this._imageryLayerCollection.addImageryProvider(t._tileLayer, e);
        n.id = t.id,
        n.brightness = t.style.brightness,
        n.addEffect = t.style.addEffect,
        n.customColor = t.style._customColor,
        n.grayFilterEnable = t.style.grayFilterEnable,
        n.grayFilterPerBar = t.style.grayFilterPerBar,
        n.grayFilterColorBar = t.style._grayFilterColorBar,
        n.grayFilterIndex = t.style._grayFilterIndex,
        n.hue = t.style.hue,
        n.saturation = t.style.saturation,
        n.contrast = t.style.contrast,
        n.gamma = t.style.gamma,
        n.night = t.style.night,
        n.textureFlag = t.textureFlag,
        n.gradientColorOverlayEnable = t.style.gradientColorOverlayEnable,
        n.gradientMapDirection = t.style.gradientMapDirection,
        n.gradientColorPerBar = t.style.gradientColorPerBar,
        n.gradientColorBar = t.style._gradientColorBar,
        n.gradientColorMapUrl = t.style.gradientColorMapUrl,
        n.gradientOpacity = t.style._gradientOpacity,
        n.gradientAlongWithCameraEnable = t.style._gradientAlongWithCameraEnable
    }
    removeImageryLayer(t) {
        for (let e = 0; e < this._imageryLayerCollection.length; e++) {
            let n = this._imageryLayerCollection.get(e);
            n.id === t.id && (this._imageryLayerCollection.remove(n, !0),
            0 === this._imageryLayerCollection.length && (this.rootNode.children.length = 0))
        }
    }
    changeStyle() {
        this.dirty = !0,
        this.materialDirty = !0;
        let t = t3djs.buffer.tileMaterialBuffer.getAll();
        for (var e in t)
            t[e]._tileNeedUpdate = !0
    }
}
;
var AtmospereInstance = class {
    constructor(t, e, n) {
        this.app = t,
        this._night = e,
        this._cameraAndRadiiAndDynamicAtmosphereColor = new Cesium.Cartesian4;
        var r = this._createAtmosphereGeometry()
            , a = window.t3djs.materialManager.getMaterial("AtmosphereFromSpace")
            , i = this.node = new THREE.Group;
        i.name = "atmosphere",
        window.t3djs.buffer.nodeBuffer.get("earthRoot").add(i),
        this._uniforms = {
            czm_sunPositionWC: {
                value: new THREE.Vector3
            },
            czm_sunDirectionWC: {
                value: new THREE.Vector3
            },
            u_cameraAndRadiiAndDynamicAtmosphereColor: {
                value: new THREE.Vector4
            },
            u_hsbShift: {
                value: new THREE.Vector3
            },
            u_fogColor: {
                value: new THREE.Vector4(1,1,1,1)
            },
            opacity: {
                value: 1
            },
            Kr: {
                value: .0012
            },
            Km: {
                value: .0015
            },
            ESun: {
                value: 27
            },
            exposure: {
                value: .9
            },
            g: {
                value: -.95
            }
        },
        this._spSkyFromSpace = new THREE.ShaderMaterial({
            wireframe: !1,
            side: THREE.DoubleSide,
            depthWrite: !1,
            transparent: !0,
            opacity: 1,
            vertexShader: "\n      // attribute vec4 position;\n\n      uniform vec4 u_cameraAndRadiiAndDynamicAtmosphereColor; // Camera height, outer radius, inner radius, dynamic atmosphere color flag\n      uniform vec3 czm_sunPositionWC;\n      uniform vec3 czm_sunDirectionWC;\n\n      uniform float Kr;\n      uniform float Km;\n      uniform float ESun;\n      \n      // const float czm_pi = 3.141592653589793;\n      // // const float Kr = 0.0025;\n      // uniform const float Kr;\n      // const float Kr4PI = Kr * 4.0 * czm_pi;\n      // // const float Km = 0.0015;\n      // uniform const float Km;\n      // const float Km4PI = Km * 4.0 * czm_pi;\n      // // const float ESun = 15.0;\n      // uniform const float ESun;\n      // const float KmESun = Km * ESun;\n      // const float KrESun = Kr * ESun;\n\n      const vec3 InvWavelength = vec3(\n          5.60204474633241,  // Red = 1.0 / Math.pow(0.650, 4.0)\n          9.473284437923038, // Green = 1.0 / Math.pow(0.570, 4.0)\n          19.643802610477206); // Blue = 1.0 / Math.pow(0.475, 4.0)\n      const float rayleighScaleDepth = 0.25;\n      \n      const int nSamples = 2;\n      const float fSamples = 2.0;\n      \n      varying vec3 v_rayleighColor;\n      varying vec3 v_mieColor;\n      varying vec3 v_toCamera;\n      varying float cameraLength;\n\n      #include <fog_pars_vertex>\n      #include <logdepthbuf_pars_vertex>\n      #include <common>\n      \n      float scale(float cosAngle)\n      {\n          float x = 1.0 - cosAngle;\n          return rayleighScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n      }\n      \n      void main(void)\n      {\n\n          float czm_pi = 3.141592653589793;\n          float Kr4PI = Kr * 4.0 * czm_pi;\n          float Km4PI = Km * 4.0 * czm_pi;\n          float KmESun = Km * ESun;\n          float KrESun = Kr * ESun;\n\n          // Unpack attributes\n          // float cameraHeight = u_cameraAndRadiiAndDynamicAtmosphereColor.x;// 相机高度\n          float cameraHeight = length(cameraPosition);// 相机高度\n          cameraLength = cameraHeight;\n          float outerRadius = u_cameraAndRadiiAndDynamicAtmosphereColor.y;// 外圈半径\n          float innerRadius = u_cameraAndRadiiAndDynamicAtmosphereColor.z;// 内圈半径\n      \n          // Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)\n          vec3 positionV3 = position.xyz;\n          vec3 ray = positionV3 - cameraPosition;\n          float far = length(ray);\n          ray /= far;\n          float atmosphereScale = 1.0 / (outerRadius - innerRadius);\n      \n          // 判断在太空还是在大气层\n          vec3 start;\n          float startOffset;\n          if(cameraHeight > outerRadius) {\n            // Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)\n            float B = 2.0 * dot(cameraPosition, ray);\n            float C = cameraHeight * cameraHeight - outerRadius * outerRadius;\n            float det = max(0.0, B*B - 4.0 * C);\n            float near = 0.5 * (-B - sqrt(det));\n        \n            // Calculate the ray's starting position, then calculate its scattering offset\n            start = cameraPosition + ray * near;\n            far -= near;\n            float startAngle = dot(ray, start) / outerRadius;\n            float startDepth = exp(-1.0 / rayleighScaleDepth );\n            startOffset = startDepth*scale(startAngle);\n          }else{\n            // Calculate the ray's starting position, then calculate its scattering offset\n            start = cameraPosition;\n            float height = length(start);\n            float depth = exp((atmosphereScale / rayleighScaleDepth ) * (innerRadius - cameraHeight));\n            float startAngle = dot(ray, start) / height;\n            startOffset = depth*scale(startAngle);\n          }\n      \n          // Initialize the scattering loop variables\n          float sampleLength = far / fSamples;\n          float scaledLength = sampleLength * atmosphereScale;\n          vec3 sampleRay = ray * sampleLength;\n          vec3 samplePoint = start + sampleRay * 0.5;\n      \n          // Now loop through the sample rays\n          vec3 frontColor = vec3(0.0, 0.0, 0.0);\n          vec3 lightDir = (u_cameraAndRadiiAndDynamicAtmosphereColor.w > 0.0) ? czm_sunPositionWC - cameraPosition : cameraPosition;\n          lightDir = normalize(lightDir);\n      \n          for(int i=0; i<nSamples; i++)\n          {\n              float height = length(samplePoint);\n              float depth = exp((atmosphereScale / rayleighScaleDepth ) * (innerRadius - height));\n              float fLightAngle = dot(lightDir, samplePoint) / height;\n              float fCameraAngle = dot(ray, samplePoint) / height;\n              float fScatter = (startOffset + depth*(scale(fLightAngle) - scale(fCameraAngle)));\n              vec3 attenuate = exp(-fScatter * (InvWavelength * Kr4PI + Km4PI));\n              frontColor += attenuate * (depth * scaledLength);\n              samplePoint += sampleRay;\n          }\n      \n          // Finally, scale the Mie and Rayleigh colors and set up the varying variables for the pixel shader\n          v_mieColor = frontColor * KmESun;\n          v_rayleighColor = frontColor * (InvWavelength * KrESun);\n          v_toCamera = cameraPosition - positionV3;\n\n          #include <fog_vertex>\n\n          vec4 temp = modelViewMatrix * vec4(position, 1.0);\n          gl_Position = projectionMatrix * temp;\n\n          #include <logdepthbuf_vertex>\n      }\n    ",
            fragmentShader: "\n      #include <fog_pars_fragment>\n      #include <logdepthbuf_pars_fragment>\n\n      #ifdef COLOR_CORRECT\n      uniform vec3 u_hsbShift; // Hue, saturation, brightness\n      #endif\n      \n      uniform vec3 czm_sunDirectionWC;\n      uniform vec3 czm_sunPositionWC;\n      uniform vec4 u_cameraAndRadiiAndDynamicAtmosphereColor; // Camera height, outer radius, inner radius, dynamic atmosphere color flag\n      \n      uniform float exposure;\n      uniform float g;\n\n      uniform vec4 u_fogColor;\n      uniform float opacity;\n      \n      varying vec3 v_rayleighColor;\n      varying vec3 v_mieColor;\n      varying vec3 v_toCamera;\n      varying vec3 v_positionEC;\n\n      varying float cameraLength;\n      varying float flag;\n      \n      void main (void)\n      {\n          #include <logdepthbuf_fragment>\n\n          float g2 = g * g;\n\n          // Extra normalize added for Android\n          float cosAngle = dot(czm_sunDirectionWC, normalize(v_toCamera)) / length(v_toCamera);\n          float rayleighPhase = 0.75 * (1.0 + cosAngle * cosAngle);\n          float miePhase = 1.5 * ((1.0 - g2) / (2.0 + g2)) * (1.0 + cosAngle * cosAngle) / pow(1.0 + g2 - 2.0 * g * cosAngle, 1.5);\n      \n          vec3 rgb = rayleighPhase * v_rayleighColor + miePhase * v_mieColor;\n\n          // const float exposure = 1.5;\n          rgb = vec3(1.0) - exp(-exposure * rgb);\n\n          // Alter alpha based on how close the viewer is to the ground (1.0 = on ground, 0.0 = at edge of atmosphere)\n          float atmosphereAlpha = clamp((u_cameraAndRadiiAndDynamicAtmosphereColor.y - cameraLength) / (u_cameraAndRadiiAndDynamicAtmosphereColor.y - u_cameraAndRadiiAndDynamicAtmosphereColor.z), 0.0, 1.0);\n      \n          // Alter alpha based on time of day (0.0 = night , 1.0 = day)\n          float nightAlpha = (u_cameraAndRadiiAndDynamicAtmosphereColor.w > 0.0) ? clamp(dot(normalize(cameraPosition), czm_sunDirectionWC), 0.0, 1.0) : 1.0;\n          atmosphereAlpha *= pow(nightAlpha, 0.5);\n      \n          gl_FragColor = vec4(vec3(rgb.r,rgb.g,rgb.b * 1.05), mix(rgb.b, 1.0, atmosphereAlpha) * smoothstep(0.0, 1.0, 1.0) * opacity);\n          \n          gl_FragColor = gl_FragColor * u_fogColor;\n\n          #include <fog_fragment>\n      }\n    ",
            uniforms: this._uniforms
        });
        var o = new THREE.Mesh(r,this._spSkyFromSpace);
        o.renderLayer = 1;
        var s = new THREE.Group;
        s.renderOrder = -500,
        i.add(s),
        s.add(o),
        o.setPickEnabled(!1),
        o.visibilityFlags = 1024;
        let l = n.sunDirection;
        var u = a.getTechnique(0).getPass(0);
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "v3LightPosInput", [l.x, l.y, l.z], 3),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "fInnerRadius", 6378e3),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "fOuterRadius", 6378e3 * 1.025),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "ESun", 15),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "g", 0),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "Km", .0015),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "Kr", .0025),
        u.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "night", e ? 1 : 0),
        u.setDepthWrite(!1)
    }
    _createAtmosphereGeometry() {
        var t = Cesium.EllipsoidGeometry.createGeometry(new Cesium.EllipsoidGeometry({
            radii: Cesium.Cartesian3.multiplyByScalar(Cesium.Ellipsoid.WGS84.radii, 1.025, new Cesium.Cartesian3),
            slicePartitions: 64,
            stackPartitions: 64,
            vertexFormat: Cesium.VertexFormat.POSITION_ONLY
        }));
        let e = new THREE.BufferGeometry
            , n = t.attributes.position
            , r = [];
        for (let t = 0; t < n.values.length; t++)
            r.push(-n.values[t]),
            r.push(n.values[t + 2]),
            r.push(n.values[t + 1]),
            t += 3;
        let a = t.indices
            , i = [];
        for (let t = 0; t < a.length; t++)
            i.push(a[t]);
        e.setAttribute("position", new THREE.Float32BufferAttribute(r,3)),
        e.setIndex(i);
        let o = new THREE.SphereBufferGeometry(6378e3 * 1.025,256,256)
            , s = new Cesium.Cartesian4;
        return this._night > 0 ? s.w = 1 : s.w = 0,
        s.y = 6378e3 * 1.025,
        s.z = 6378e3,
        this._cameraAndRadiiAndDynamicAtmosphereColor = s,
        o
    }
    show(t) {
        t = void 0 === t || t,
        this.node.show(t)
    }
    hide() {
        this.show(!1)
    }
    onUpdate() {
        var t = t3djs.materialManager.getMaterial("AtmosphereFromSpace").getMaterial()[0];
        let e = this.app;
        var n = LUtil.getFogDensity(e, !0, 1);
        t.uniforms.czm_fogDensity.value = n;
        let a = MapUtil.getDistance(e.camera.camera.position, e.camera.curOrbit._getIntersectPoint());
        t.uniforms.ESun.value = a < 53e4 ? 35 : 12;
        let i = e.uEarth._earthInstance._sunLight
            , o = this._uniforms;
        o.czm_sunPositionWC.value = i.sunPosition,
        o.czm_sunDirectionWC.value = i.sunDirection;
        let s = a / 701163.8668984541;
        if (s > 1 ? (o.opacity.value = 1,
        s = 1) : o.opacity.value = Math.max(.88, s),
        e.uEarth._earthInstance.tileEarth.fog) {
            let t = e.scene.fog && e.scene.fog.density;
            o.u_fogColor.value = t > 0 && e.uEarth.style._fogExpColor || new THREE.Vector4(1,1,1,1),
            o.Kr.value = .002 + (.0012 - .002) * s,
            o.Km.value = .001,
            o.ESun.value = 150 + -120 * s,
            o.exposure.value = .3 + (.9 - .3) * s,
            o.g.value = -.98
        } else
            o.u_fogColor.value = new THREE.Vector4(1,1,1,1);
        let l = new THREE.Vector4(this._cameraAndRadiiAndDynamicAtmosphereColor.x,this._cameraAndRadiiAndDynamicAtmosphereColor.y,this._cameraAndRadiiAndDynamicAtmosphereColor.z,this._cameraAndRadiiAndDynamicAtmosphereColor.w);
        o.u_cameraAndRadiiAndDynamicAtmosphereColor.value = l
    }
    showNight(t) {
        var e = window.t3djs.materialManager.getMaterial("AtmosphereFromSpace").getTechnique(0).getPass(0);
        t ? (e.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "night", 1),
        this._cameraAndRadiiAndDynamicAtmosphereColor.w = 1) : (e.setGpuProgramParameter(window.t3djs.GpuProgramType.FRAGMENT_PROGRAM, "night", 0),
        this._cameraAndRadiiAndDynamicAtmosphereColor.w = 0),
        this._uniforms.u_cameraAndRadiiAndDynamicAtmosphereColor.value = this._cameraAndRadiiAndDynamicAtmosphereColor
    }
}
;
class TileLayerStyle {
    constructor(t, e) {
        this.tileLayer = t,
        this._template = THING.Utils.parseValue(e.template, TileLayerStyle.NORMAL),
        this._customColor = CMAP.Util.colorFormatNewToOld(e.customColor) || [1, 1, 1, 1],
        this._grayFilterEnable = THING.Utils.parseValue(e.grayFilterEnable, !1),
        this._grayFilterIndex = THING.Utils.parseValue(e.grayFilterIndex, -1),
        this._grayFilterPerBar = THING.Utils.parseValue(e.grayFilterPerBar, [0, .5, 1]);
        var n = THING.Utils.parseValue(e.grayFilterColorBar, [[255, 0, 0], [0, 255, 0], [0, 0, 255]]);
        n = n.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        }),
        this._grayFilterColorBar = THING.Utils.parseValue(n, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
        this._brightness = THING.Utils.parseValue(e.brightness, 1),
        this._addEffect = !1,
        this._contrast = THING.Utils.parseValue(e.contrast, 1),
        this._hue = THING.Utils.parseValue(e.hue, 0),
        this._saturation = THING.Utils.parseValue(e.saturation, 1),
        this._gamma = THING.Utils.parseValue(e.gamma, 1),
        this._night = THING.Utils.parseValue(e.night, !1),
        this.getEffectByTemplate(),
        this._template === TileLayerStyle.CUSTOMCOLOR && (this._customColor = CMAP.Util.colorFormatNewToOld(e.customColor) || [1, 1, 1, 1]),
        this._gradientColorOverlayEnable = THING.Utils.parseValue(e.gradientColorOverlayEnable, !1),
        this._gradientMapDirection = THING.Utils.parseValue(e.gradientMapDirection, [-1, 0, 0]),
        this._gradientColorMapUrl = THING.Utils.parseValue(e.gradientColorMapUrl, null),
        this._gradientColorPerBar = THING.Utils.parseValue(e.gradientColorPerBar, [0, .5, 1]);
        var r = THING.Utils.parseValue(e.gradientColorBar, [[255, 0, 0], [0, 255, 0], [0, 0, 255]]);
        r = r.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        }),
        this._gradientColorBar = THING.Utils.parseValue(r, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
        this._gradientOpacity = .7,
        this._gradientAlongWithCameraEnable = THING.Utils.parseValue(e.gradientAlongWithCameraEnable, !0)
    }
    get gradientColorOverlayEnable() {
        return this._gradientColorOverlayEnable
    }
    set gradientColorOverlayEnable(t) {
        if (this._gradientColorOverlayEnable = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gradientColorOverlayEnable = this._gradientColorOverlayEnable,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get gradientAlongWithCameraEnable() {
        return this._gradientAlongWithCameraEnable
    }
    set gradientAlongWithCameraEnable(t) {
        if (this._gradientAlongWithCameraEnable = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gradientAlongWithCameraEnable = this._gradientAlongWithCameraEnable,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get gradientMapDirection() {
        return this._gradientMapDirection
    }
    set gradientMapDirection(t) {
        if (this._gradientMapDirection = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gradientMapDirection = this._gradientMapDirection,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get gradientOpacity() {
        return this._gradientOpacity
    }
    set gradientOpacity(t) {
        if (this._gradientOpacity = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gradientOpacity = this._gradientOpacity,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get gradientColorMapUrl() {
        return this._gradientColorMapUrl
    }
    set gradientColorMapUrl(t) {
        if (this._gradientColorMapUrl = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gradientColorMapUrl = this._gradientColorMapUrl,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get gradientColorPerBar() {
        return this._gradientColorPerBar
    }
    set gradientColorPerBar(t) {
        if (this._gradientColorPerBar = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gradientColorPerBar = this._gradientColorPerBar,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get gradientColorBar() {
        return this._gradientColorBar.map(function(t) {
            return CMAP.Util.colorFormatOldToNew(t)
        })
    }
    set gradientColorBar(t) {
        var e = t.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        });
        if (this._gradientColorBar = e,
        this.tileLayer.app.uEarth) {
            var n = this.tileLayer.getImageryLayerById();
            n && (n.gradientColorBar = this._gradientColorBar,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get template() {
        return this._template
    }
    set template(t) {
        if (this._template !== t && (this._template = t,
        this.getEffectByTemplate(),
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.addEffect = this._addEffect,
            e.customColor = this._customColor,
            e.brightness = this._brightness,
            this.tileLayer.updateTextureFlag())
        }
    }
    get customColor() {
        return CMAP.Util.colorFormatOldToNew(this._customColor)
    }
    set customColor(t) {
        var e = CMAP.Util.colorFormatNewToOld(t);
        if (this._grayFilterEnable = !1,
        this.template === TileLayerStyle.CUSTOMCOLOR) {
            if (this._customColor === e)
                return;
            if (this._customColor = e,
            this.tileLayer.app.uEarth) {
                var n = this.tileLayer.getImageryLayerById();
                n && (n.customColor = this._customColor,
                this.tileLayer.updateTextureFlag())
            }
        } else
            THING.Utils.log("style.template不是TileLayerStyle.CUSTOMCOLOR时,customColor设置不生效")
    }
    get grayFilterEnable() {
        return this._grayFilterEnable
    }
    set grayFilterEnable(t) {
        if (this._grayFilterEnable = t,
        this._template === TileLayerStyle.CUSTOMCOLOR && this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.grayFilterEnable = this._grayFilterEnable,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get grayFilterPerBar() {
        return this._grayFilterPerBar
    }
    set grayFilterPerBar(t) {
        if (this._grayFilterPerBar = t,
        this.tileLayer.app.uEarth) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.grayFilterPerBar = this._grayFilterPerBar,
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get grayFilterColorBar() {
        return this._grayFilterColorBar.map(function(t) {
            return CMAP.Util.colorFormatOldToNew(t)
        })
    }
    set grayFilterColorBar(t) {
        var e = t.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        });
        if (this._grayFilterColorBar = e,
        this.tileLayer.app.uEarth) {
            var n = this.tileLayer.getImageryLayerById();
            n && (n.grayFilterColorBar = this._grayFilterColorBar,
            this.tileLayer.updateTextureFlag(),
            this.tileLayer.app.uEarth._earthInstance.tileEarth.dirty = !0)
        }
    }
    get brightness() {
        return this._brightness
    }
    set brightness(t) {
        if (this._brightness !== t && (this._brightness = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.brightness = this._brightness,
            this.tileLayer.updateTextureFlag())
        }
    }
    get contrast() {
        return this._contrast
    }
    set contrast(t) {
        if (this._contrast !== t && (this._contrast = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.contrast = this._contrast,
            this.tileLayer.updateTextureFlag())
        }
    }
    get night() {
        return this._night
    }
    set night(t) {
        if (this._night !== t && (this._night = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.night = this._night,
            this.tileLayer.updateTextureFlag())
        }
    }
    get hue() {
        return this._hue
    }
    set hue(t) {
        if (this._hue !== t && (this._hue = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.hue = this._hue,
            this.tileLayer.updateTextureFlag())
        }
    }
    get gamma() {
        return this._gamma
    }
    set gamma(t) {
        if (this._gamma !== t && (this._gamma = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.gamma = this._gamma,
            this.tileLayer.updateTextureFlag())
        }
    }
    get saturation() {
        return this._saturation
    }
    set saturation(t) {
        if (this._saturation !== t && (this._saturation = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.saturation = this._saturation,
            this.tileLayer.updateTextureFlag())
        }
    }
    get addEffect() {
        return this._addEffect
    }
    set addEffect(t) {
        if (this._addEffect !== t && (this._addEffect = t,
        this.tileLayer.app.uEarth)) {
            var e = this.tileLayer.getImageryLayerById();
            e && (e.addEffect = this._addEffect,
            this.tileLayer.updateTextureFlag())
        }
    }
    getEffectByTemplate() {
        this.template === TileLayerStyle.DARKBLUE ? (this.grayFilterEnable = !1,
        this._addEffect = !0,
        this._customColor = [0, .6, .8, 1]) : this.template === TileLayerStyle.DARKGREEN ? (this.grayFilterEnable = !1,
        this._addEffect = !0,
        this._customColor = [0, .6, .4, 1]) : this.template === TileLayerStyle.NORMAL ? (this.grayFilterEnable = !1,
        this._addEffect = !1,
        this._customColor = [1, 1, 1, 1]) : this.template === TileLayerStyle.CUSTOMCOLOR && (this._addEffect = !1)
    }
}
TileLayerStyle.NORMAL = "normal",
TileLayerStyle.DARKBLUE = "blue",
TileLayerStyle.DARKGREEN = "green",
TileLayerStyle.DARKPURPLE = "purple",
TileLayerStyle.CUSTOMCOLOR = "custom";
var TileLayerStyle = TileLayerStyle;
class TileLayer extends Layer {
    constructor(t) {
        super(t),
        this._style = {},
        this.app = t
    }
    customSetup(t) {
        this.layerType = "TileLayer",
        this.id = THING.Utils.parseValue(t.id, "tileLayer_" + MapUtil.getUUID()),
        this.name = THING.Utils.parseValue(t.name, this.id),
        this._visible = THING.Utils.parseValue(t.visible, !0),
        t.tilingSchemeType = THING.Utils.parseValue(t.tilingSchemeType, t.tileType),
        this._tileType = this._tilingSchemeType = THING.Utils.parseValue(t.tilingSchemeType, CMAP.TilingSchemeType.WebMercator),
        this._tilingScheme = THING.Utils.parseValue(t.tilingScheme, new Cesium.WebMercatorTilingScheme({
            ellipsoid: Cesium.Ellipsoid.WGS84
        })),
        this._maximumLevel = t.maximumLevel,
        this._loadByBlob = THING.Utils.parseValue(t.loadByBlob, !1),
        this._timeout = t.timeout,
        this._url = t.url || "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
        var e = this._url.indexOf("{")
            , n = this._url.indexOf("}");
        if (e > 0 && n > e && e !== this._url.indexOf("{x}") && e && e !== this._url.indexOf("{z}")) {
            var a = this._url.substring(e + 1, n)
                , i = a.split(",");
            this._url = this._url.replace(a, "s"),
            t.subDomains = i
        }
        this._tileLayer = new Cesium.createOpenStreetMapImageryProvider({
            url: this._url,
            subDomains: t.subDomains,
            tileType: this._tilingSchemeType,
            maximumLevel: this.maximumLevel,
            tilingScheme: this._tilingScheme,
            loadByBlob: this._loadByBlob,
            timeout: this._timeout
        }),
        this._tileLayer.id = this.id
    }
    setupStyle(t) {
        this._style = new TileLayerStyle(this,t.style || {
            template: "normal",
            brightness: 1
        }),
        this._textureFlag = this.getTextureFlag()
    }
    show(t) {
        t ? !1 === this._visible && this.app.uEarth._earthInstance.addTileLayer(this) : !0 === this._visible && this.app.uEarth._earthInstance.removeTileLayer(this),
        this._visible = t
    }
    get maximumLevel() {
        return this._maximumLevel
    }
    set maximumLevel(t) {
        THING.Utils.isNull(t) || (this.app.uEarth._earthInstance.removeTileLayer(this),
        this._tileLayer._maximumLevel = this._maximumLevel = t,
        this.app.uEarth._earthInstance.addTileLayer(this))
    }
    get url() {
        return this._url
    }
    set url(t) {
        this._url !== t && (this._url = t,
        this.app.uEarth._earthInstance.tileEarth.setBaseMap(this, t))
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        this.show(t)
    }
    get style() {
        return this._style
    }
    _setStyle(t, e=!1) {
        let n = MapUtil._toObject(this._style);
        n.customColor && (n.customColor = MapUtil.colorFormatOldToNew(n.customColor)),
        e || (t = MapUtil.extend(n, t)),
        this._style = new TileLayerStyle(this,t),
        this._style.getEffectByTemplate(),
        this.updateTextureFlag();
        var a = this.getImageryLayerById();
        a.addEffect = this.style.addEffect,
        a.customColor = this.style._customColor,
        a.grayFilterEnable = this.style.grayFilterEnable,
        a.grayFilterPerBar = this.style.grayFilterPerBar,
        a.grayFilterColorBar = this.style._grayFilterColorBar,
        a.brightness = this.style.brightness,
        a.hue = this.style.hue,
        a.contrast = this.style.contrast,
        a.saturation = this.style.saturation,
        a.gamma = this.style.gamma,
        a.textureFlag = this._textureFlag,
        a.gradientColorOverlayEnable = this.style._gradientColorOverlayEnable,
        a.gradientMapDirection = this.style._gradientMapDirection,
        a.gradientColorMapUrl = this.style._gradientColorMapUrl,
        a.gradientColorPerBar = this.style._gradientColorPerBar,
        a.gradientColorBar = this.style._gradientColorBar
    }
    set style(t) {
        this._setStyle(t, !1)
    }
    get textureFlag() {
        return this._textureFlag
    }
    set textureFlag(t) {
        this._textureFlag !== t && (this._textureFlag = t,
        this.getImageryLayerById().textureFlag = this._textureFlag)
    }
    get tilingSchemeType() {
        return this._tilingSchemeType
    }
    getImageryLayerById() {
        for (var t in this.app.uEarth._earthInstance.tileEarth._imageryLayerCollection._layers) {
            var e = this.app.uEarth._earthInstance.tileEarth._imageryLayerCollection._layers[t];
            if (e.id === this.id)
                return e
        }
    }
    getTextureFlag() {
        return (this._style.addEffect ? "addEffect" : "noAddEffect") + "_customColor" + this._style._customColor + "_brightness" + this._style.brightness + "_hue" + this._style.hue + "_contrast" + this._style.contrast + "_saturation" + this._style.saturation + "_gamma" + this._style.gamma + "_night" + this._style.night + "_grayFilterEnable" + this._style.grayFilterEnable
    }
    updateTextureFlag() {
        this.textureFlag = this.getTextureFlag(),
        this.app.uEarth._earthInstance.tileEarth.changeStyle()
    }
}
THING.factory.registerClass("TileLayer", TileLayer);
var TileLayer = TileLayer;
class TerrainLayer extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.layerType = "TerrainLayer",
        this.name = t.name || "terrainLayer_" + (new Date).getTime(),
        this._visible = !0,
        this.opacity = t.opacity || 1,
        this._url = t.url,
        this._terrainExaggeration = void 0 === t.terrainExaggeration ? 1 : t.terrainExaggeration,
        this._useTerrain = !1,
        this._url ? (this._terrainLayer = new Cesium.CesiumTerrainProvider({
            url: this._url
        }),
        this._useTerrain = !0) : this._terrainLayer = new Cesium.EllipsoidTerrainProvider({
            ellipsoid: this.ellipsoid
        }),
        this.setupComplete(t)
    }
    get terrainExaggeration() {
        return this._terrainExaggeration
    }
    set terrainExaggeration(t) {
        if (this._useTerrain) {
            var e = this.url;
            this.url = "",
            this._terrainExaggeration = t,
            this.url = e
        }
    }
    get url() {
        return this._url
    }
    set url(t) {
        let e = this;
        t ? (this._terrainLayer = new Cesium.CesiumTerrainProvider({
            url: t
        }),
        this._useTerrain = !0) : (this._terrainLayer = new Cesium.EllipsoidTerrainProvider({
            ellipsoid: this.ellipsoid
        }),
        this._useTerrain = !1),
        CMAP.getCurrentMap()._earthInstance.tileEarth._surface ? CMAP.getCurrentMap()._earthInstance.tileEarth._surface._tileProvider.terrainProvider = this._terrainLayer : THING.App.current.on("terrainReady", function() {
            CMAP.getCurrentMap()._earthInstance.tileEarth._surface._tileProvider.terrainProvider = e._terrainLayer
        }),
        this._url = t
    }
}
THING.factory.registerClass("TerrainLayer", TerrainLayer);
var SunLight = class {
    constructor(t, e) {
        this.app = t,
        this._sunDisplay,
        this._sunUrl = e,
        this._sunPositionWC = new Cesium.Cartesian3,
        this._sunDirectionWC = new Cesium.Cartesian3,
        this._sunDirectionEC = new Cesium.Cartesian3,
        this._transformMatrix = new Cesium.Matrix3,
        this._clock = new Cesium.Clock,
        this._currentTime = this._setAndUpdateClockTime(),
        this.sunDirection = this._computeSunDirectionAndPosition(this._currentTime),
        this._startTime = this._currentTime,
        this._timeLine = {
            seconds: 0
        },
        this.sunPosition = new THREE.Vector3,
        this._updateSunDirection()
    }
    _computeSunDirectionAndPosition(t) {
        let icrfToFixedMatrix = Cesium.Transforms.computeIcrfToFixedMatrix(t, this._transformMatrix);
        null == icrfToFixedMatrix && (this._transformMatrix = Cesium.Transforms.computeTemeToPseudoFixedMatrix(t, this._transformMatrix));
        let sunPositionInEarthInertialFrame = Cesium.Simon1994PlanetaryPositions.computeSunPositionInEarthInertialFrame(t, this._sunPositionWC);
        return Cesium.Matrix3.multiplyByVector(this._transformMatrix, sunPositionInEarthInertialFrame, sunPositionInEarthInertialFrame),
        Cesium.Cartesian3.normalize(sunPositionInEarthInertialFrame, this._sunDirectionWC),
        new THREE.Vector3(-this._sunDirectionWC.x,this._sunDirectionWC.z,this._sunDirectionWC.y)
    }
    _setAndUpdateClockTime(t) {
        return t && (this._clock.currentTime = t,
        this._clock.shouldAnimate = !1),
        this._clock.tick()
    }
    _updateSunDirection() {
        if (!this._sunDisplay) {
            let t = new THREE.SpriteMaterial({
                color: 16777215,
                fog: !0,
                sizeAttenuation: !0,
                transparent: !0,
                blending: THREE.AdditiveBlending,
                opacity: 0,
                depthWrite: !1
            })
                , e = new THREE.TextureLoader;
            if (this._sunUrl) {
                let n = e.load(this._sunUrl);
                t.map = n,
                t.opacity = 1,
                t.needsUpdate = !0
            }
            this._sunDisplay = new THREE.Sprite(t),
            this._sunDisplay.renderLayer = 1,
            this._sunDisplay.renderOrder = -501,
            this._sunDisplay.frustumCulled = !1;
            let n = 15e6;
            this._sunDisplay.scale.set(n, n, n),
            this.app.scene.add(this._sunDisplay)
        }
        let t = new THREE.Vector3(-this._sunDirectionWC.x,this._sunDirectionWC.z,this._sunDirectionWC.y).clone().multiplyScalar(3e7);
        this._sunDisplay.position.copy(t),
        this.sunPosition.copy(t)
    }
    _setSunSpriteTexture(t) {
        if (t && "string" == typeof t) {
            let e = (new THREE.TextureLoader).load(t);
            this._sunDisplay.material.visible = !0,
            this._sunDisplay.material.map = e,
            this._sunDisplay.material.opacity = 1,
            this._sunDisplay.material.needsUpdate = !0
        }
    }
    _removeSunSpriteTexture() {
        this._sunDisplay.material.visible = !1
    }
    _setTime(t) {
        let e = Cesium.JulianDate.fromDate(t, new Cesium.JulianDate);
        this._currentTime = this._setAndUpdateClockTime(e),
        this._startTime = this._currentTime,
        this.sunDirection = this._computeSunDirectionAndPosition(this._currentTime),
        this._updateSunDirection(),
        this._timeLine.seconds = 0
    }
    _setSecondsAddCurrentTime(t) {
        this._timeLine.seconds = t
    }
}
;
class FixLight {
    constructor(t, e) {
        this._enable = t,
        this.app = e;
        var n = this.node = new THREE.Group;
        n.name = "fixlight",
        window.t3djs.buffer.nodeBuffer.get("earthRoot").add(n);
        var r = new THREE.SphereGeometry(6378e3,320,320);
        this._fixLightUniforms = {
            ratio: {
                value: 1
            },
            opacity: {
                value: 1
            },
            direction: {
                value: new THREE.Vector3(-.7,.6,.5)
            },
            gradientTexture: {
                value: null
            }
        };
        var a = new THREE.ShaderMaterial({
            uniforms: this._fixLightUniforms,
            vertexShader: "\n    #include <common>\n    #include <logdepthbuf_pars_vertex>\n    \n    varying vec3 vNormal;\n\n    varying vec2 vUv;\n\n    void main() {\n      vec3 transformed = vec3( position );\n      vec4 mvPosition = vec4( transformed, 1.0 );\n      mvPosition = modelViewMatrix * mvPosition;\n      gl_Position = projectionMatrix * mvPosition;\n\n      vNormal = normalize( normalMatrix * normal );\n\n      vUv = uv;\n\n      #include <logdepthbuf_vertex>\n    \n    }\n  ",
            fragmentShader: "\n    #include <common>\n    #include <logdepthbuf_pars_fragment>\n    #include <dithering_pars_fragment>\n\n    uniform vec3 direction;\n    uniform float ratio;\n    uniform float opacity;\n\n    uniform sampler2D gradientTexture;\n    \n    varying vec3 vNormal;\n\n    varying vec2 vUv;\n\n    void main() {\n      #include <logdepthbuf_fragment>\n\n      float intensity = dot(normalize(direction), vNormal);\n\n      vec4 finalColor = texture2D(gradientTexture, vec2((intensity + 1.0) / 2.0,0.1));\n\n      float colorR = finalColor.r + (1.0 - finalColor.r) * (1.0 - ratio);\n      float colorG = finalColor.g + (1.0 - finalColor.g) * (1.0 - ratio);\n      float colorB = finalColor.b + (1.0 - finalColor.b) * (1.0 - ratio);\n\n      gl_FragColor = vec4(colorR, colorG, colorB, finalColor.a * opacity);\n\n      #include <dithering_fragment>\n    \n    }\n  "
        });
        a.transparent = !0,
        a.blending = THREE.MultiplyBlending,
        a.depthWrite = !1;
        var i = this._mesh = new THREE.Mesh(r,a);
        i.renderOrder = -500,
        i.castShadow = !1,
        i.receiveShadow = !1,
        i.userData.skipPick = !0,
        this._mesh.visible = t,
        n.add(i)
    }
    _updateUniform(t, e) {
        "color" === t ? this._fixLightUniforms.color.value = new THREE.Color(e[0],e[1],e[2]) : "direction" === t ? this._fixLightUniforms.direction.value = new THREE.Vector3(e[0],e[1],e[2]) : "enable" === t ? this._mesh.visible = e : "opacity" === t && (this._fixLightUniforms.opacity.value = e)
    }
    _updateGradientTexture(t, e) {
        var n = MapUtil._generateGradientTextureByGray(t, e);
        this._fixLightUniforms.gradientTexture.value = n
    }
    onUpdate() {
        if (this._enable && this._gradientAlongWithCameraEnable) {
            let t = 5000082.87906637
                , e = 20373029.139134407 - t
                , n = MapUtil.getDistance(this.app.camera.camera.position, this.app.camera.curOrbit._getIntersectPoint()) - t;
            this._fixLightUniforms.ratio.value = n < 0 ? 0 : n <= e ? n / e : .5 + .5 * e / n
        }
    }
}
var ht = n(4);
var EarthInstance = class {
    constructor(t, e) {
        let terrainLayer;
        t.style = t.style || {},
        this._sunLight = new SunLight(e,t.style.sunUrl),
        this.camera = t3djs.camera,
        this.goHome(),
        this._atmosphere = t.atmosphere,
        this._fog = !t.style || t.style.fog,
        this._night = !t.style || t.style.night,
        this._updateESunWhenLoadingImage = THING.Utils.parseValue(t.updateESunWhenLoadingImage, !1),
        this._sseFactor = THING.Utils.parseValue(t.sseFactor, 1),
        terrainLayer = t.terrainUrl ? e.create({
            type: "TerrainLayer",
            id: "userTerrain",
            url: t.terrainUrl
        }) : e.create({
            type: "TerrainLayer",
            id: "defaultTerrain"
        }),
        e.uEarth.terrainLayer = terrainLayer,
        this.tileEarth = new TileEarth(e,{
            terrainLayer: terrainLayer,
            night: this._night,
            fog: this._fog,
            sunLight: this._sunLight,
            updateESunWhenLoadingImage: this._updateESunWhenLoadingImage,
            sseFactor: this._sseFactor
        }),
        e.addControl(this.tileEarth, "earthUpdate", !1),
        t3djs.util.setRenderCallback(()=>{
            e.trigger("EARTH_LOOP");
            var t = performance.now();
            e._delay = void 0,
            void 0 !== this.pnow && (e._delay = t - this.pnow),
            this.pnow = t,
            C.a.updateAll()
        }
        ),
        this.atmospereInstance = new AtmospereInstance(e,this._night,this._sunLight),
        e.addControl(this.atmospereInstance, "atmosphereUpdate", !1),
        this.atmospereInstance.node.visible = !1,
        this.fixLight = new FixLight(!1,e),
        e.addControl(this.fixLight, "fixlightUpdate", !1),
        this.tileEarth._readyPromise.then(()=>{
            e.trigger("EARTH_COMPLETE"),
            e.needsUpdate = !0,
            setTimeout(()=>{
                this.atmospereInstance.node.visible = this._atmosphere,
                this.tileEarth._imageryLayerCollection._layers.length > 0 && (this.tileEarth.rootNode.visible = !0),
                this._atmospereSetuped = !0
            }
            , 10)
        }
        )
    }
    setBgColor(t) {
        Array.isArray(t) && t.length > 2 && t3djs.viewport.setBackgroundColour(t)
    }
    goHome() {
        THING.App.current.camera.position = [7184475.718309835, 14388484.794233197, 21376608.247620873],
        THING.App.current.camera.target = [1700631.527482605, 3471240.7272643154, 5073186.791466866],
        ht.a.correctUp()
    }
    setBgImage(t) {}
    setBaseLayers(t) {
        for (let e in t) {
            let n = t[e];
            "TileLayer" === n.layerType ? this.tileEarth.addImageryLayer(n) : "Tile3dLayer" === n.layerType && this.tileEarth.addTile3dLayer(n)
        }
    }
    removeAllLayers() {
        this.tileEarth.removeAllLayers(),
        0 === this.tileEarth._imageryLayerCollection._layers.length && this.showGroundAndAtmosphere(!1)
    }
    addTileLayer(t, e) {
        0 === this.tileEarth._imageryLayerCollection._layers.length && THING.App.current.needsUpdate && (this.tileEarth.rootNode.visible = !0,
        this.atmospereInstance && (this.atmospereInstance.node.visible = this._atmosphere)),
        this.tileEarth.addImageryLayer(t, e)
    }
    removeTileLayer(t) {
        this.tileEarth.removeImageryLayer(t),
        0 === this.tileEarth._imageryLayerCollection._layers.length && this.showGroundAndAtmosphere(!1)
    }
    addTile3dLayer(t) {
        this.tileEarth.addTile3dLayer(t)
    }
    removeTile3dLayer(t) {
        this.tileEarth.removeTile3dLayer(t)
    }
    showGroundAndAtmosphere(t) {
        this.tileEarth.rootNode.visible = t,
        this.atmospereInstance && (this.atmospereInstance.node.visible = t)
    }
}
;
var Style = class extends THING.BaseStyle {
    constructor(t, e) {
        super(t),
        this._map = t,
        this._night = void 0 !== e.night && e.night,
        this._gradientColorOverlayEnable = void 0 !== e.gradientColorOverlayEnable && e.gradientColorOverlayEnable,
        this._gradientColorPerBar = e.gradientColorPerBar || [0, .5, 1];
        var n = e.gradientColorBar || [[255, 255, 255], [255, 255, 255], [0, 0, 0]];
        n = n.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        }),
        this._gradientColorBar = n || [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        this._gradientColorOpacity = void 0 === e.gradientColorOpacity ? 1 : e.gradientColorOpacity,
        this._gradientMapDirection = void 0 === e.gradientMapDirection ? [1, 0, 0] : e.gradientMapDirection,
        this._gradientAlongWithCameraEnable = void 0 === e.gradientAlongWithCameraEnable || e.gradientAlongWithCameraEnable,
        this._fog = void 0 === e.fog || e.fog,
        this._blur = void 0 === e.blur ? 0 : e.blur,
        this._fogDensity = void 0 === e.fogDensity ? 1 : e.fogDensity,
        this._fogExpDensity = void 0 === e.fogExpDensity ? 0 : e.fogExpDensity,
        this._fogExpColor = void 0 === e.fogExpColor ? [1, 1, 1, 1] : CMAP.Util.colorFormatNewToOld(e.fogExpColor, 1)
    }
    get night() {
        return this._night
    }
    set night(t) {
        if (this._night !== t && (this._map._earthInstance.atmospereInstance && this._map._earthInstance.atmospereInstance.showNight(t),
        this._map._baseLayers)) {
            var e = this._map._baseLayers;
            for (var n in e)
                "TileLayer" === e[n].type && (e[n].style.night = t)
        }
        this._map._earthInstance.tileEarth.changeStyle(),
        this._map._setSystemTime(CMAP._defaultTime),
        this._night = t
    }
    get gradientColorOverlayEnable() {
        return this._gradientColorOverlayEnable
    }
    set gradientColorOverlayEnable(t) {
        this._gradientColorOverlayEnable = t,
        this._map._earthInstance.fixLight && (this._map._earthInstance.fixLight._enable = this._gradientColorOverlayEnable,
        this._map._earthInstance.fixLight._gradientAlongWithCameraEnable = this._gradientAlongWithCameraEnable,
        this._map._earthInstance.fixLight._updateGradientTexture(this._gradientColorPerBar, this._gradientColorBar),
        this._map._earthInstance.fixLight._updateUniform("enable", t),
        this._map._earthInstance.fixLight._updateUniform("direction", this._gradientMapDirection))
    }
    get gradientColorOpacity() {
        return this._gradientColorOpacity
    }
    set gradientColorOpacity(t) {
        this._gradientColorOpacity = t,
        this._map._earthInstance.fixLight && this._map._earthInstance.fixLight._updateUniform("opacity", this._gradientColorOpacity)
    }
    get gradientMapDirection() {
        return this._fixLightDirection
    }
    set gradientMapDirection(t) {
        this._gradientMapDirection = t,
        this._map._earthInstance.fixLight && this._map._earthInstance.fixLight._updateUniform("direction", t)
    }
    get gradientColorPerBar() {
        return this._gradientColorPerBar
    }
    set gradientColorPerBar(t) {
        this._gradientColorPerBar = t,
        this._map._earthInstance.fixLight && this._map._earthInstance.fixLight._updateGradientTexture(this._gradientColorPerBar, this._gradientColorBar)
    }
    get gradientColorBar() {
        return this._gradientColorBar.map(function(t) {
            return CMAP.Util.colorFormatOldToNew(t)
        })
    }
    set gradientColorBar(t) {
        var e = t.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        });
        this._gradientColorBar = e,
        this._map._earthInstance.fixLight && this._map._earthInstance.fixLight._updateGradientTexture(this._gradientColorPerBar, this._gradientColorBar)
    }
    get fog() {
        return this._fog
    }
    set fog(t) {
        this._fog = t,
        this._map._earthInstance.tileEarth.fog = this.fog,
        this._map._earthInstance.tileEarth.fogDensity = this.fogDensity,
        this._map._earthInstance.tileEarth.changeStyle()
    }
    get fogDensity() {
        return this._fogDensity
    }
    set fogDensity(t) {
        this._fogDensity = t,
        this.fog && (this._map._earthInstance.tileEarth.fogDensity = this.fogDensity,
        this._map._earthInstance.tileEarth.changeStyle())
    }
    get fogExpDensity() {
        return this._fogExpDensity
    }
    set fogExpDensity(t) {
        this._fogExpDensity = t,
        this._map._earthInstance.tileEarth.fogExpDensity = t
    }
    get fogExpColor() {
        return CMAP.Util.colorFormatOldToNew(this._fogExpColor)
    }
    set fogExpColor(t) {
        this._fogExpColor = CMAP.Util.colorFormatNewToOld(t),
        this._map.app.scene.fog.color = new THREE.Color(this._fogExpColor[0],this._fogExpColor[1],this._fogExpColor[2])
    }
    get blur() {
        return this._blur
    }
    set blur(t) {
        this._map.app.postEffect = {
            postEffect: {
                vignette: {
                    enable: !0,
                    offset: t
                }
            }
        },
        this._blur = t
    }
}
    , pt = {
    init: function(t) {
        var e = {
            showHelper: !1,
            ambientLight: {
                intensity: .3,
                color: "6447714"
            },
            hemisphereLight: {
                intensity: 0,
                color: "3310847",
                groundColor: "16763007"
            },
            mainLight: {
                shadow: !1,
                shadowQuality: "medium",
                intensity: .8,
                color: "16772829",
                alpha: 0,
                beta: 0
            },
            secondaryLight: {
                shadow: !1,
                shadowQuality: "medium",
                intensity: .9,
                color: "16772829",
                alpha: 138,
                beta: 0
            },
            tertiaryLight: {
                shadow: !1,
                shadowQuality: "medium",
                intensity: 0,
                color: "16777215",
                alpha: 0,
                beta: 0
            }
        };
        t._lightGroup.setConfig(e)
    }
};
var mt = class {
    constructor(t) {
        this.initmaxNum = 1,
        this.error = !1,
        this.errScene = null,
        this.scene = [],
        this._curInitScene = null,
        this.app = t,
        this._createEvent(),
        this._lastBackground = t.background
    }
    add(t) {
        this.scene.push(t)
    }
    remove(t) {
        var e = this;
        e.scene.map((n,r)=>{
            n === t && e.scene.splice(r, 1)
        }
        )
    }
    getCurInitScene() {
        for (var t = 0; t < this.scene.length; t++) {
            var e = this.scene[t];
            if (e._initScene) {
                this._curInitScene = e;
                break
            }
        }
        return this._curInitScene
    }
    disposeInitScene() {
        var t = this.getCurInitScene();
        if (t) {
            var e = this.app.query("[GIV_id = " + t.code + "]")[0];
            t._initScene = !1,
            e && e.destroy()
        }
    }
    _createEvent() {
        var t = this.app
            , e = this;
        t.on("click", function(n) {
            if (2 === n.button) {
                if (e.getError()) {
                    var a = e.getErrorScene();
                    if (a.flyBackInfo)
                        t.camera.earthFlyTo(a.flyBackInfo);
                    else {
                        var i = MapUtil.world2Lonlat(t.camera.target);
                        this.app.camera.earthFlyTo({
                            lonlat: i,
                            height: 5e3
                        })
                    }
                    a._marker.visible = !0,
                    a.state = 0
                }
                if (t.level.current && "Campus" === t.level.current.type && t.level.current.visible) {
                    var o = e.getCurInitScene();
                    if (!o)
                        return;
                    o.flyBackInfo ? t.camera.earthFlyTo(o.flyBackInfo) : e._flyToWhere(),
                    o._layer.visible = !1,
                    o._marker.visible = !0,
                    o.state = 0,
                    t.background = e._lastBackground,
                    t.level.quit()
                }
            }
        }, "GeoSceneQuit", 1e4)
    }
    _flyToWhere() {
        var t = this.app.camera.position
            , e = this.getCurInitScene()._layer
            , n = e ? e.position : [0, 0, 0]
            , a = 2 * (e ? e.boundingBox.radius : 0) + 5e3;
        if (!(Math.sqrt(Math.pow(t[0] - n[0], 2) + Math.pow(t[1] - n[1], 2) + Math.pow(t[2] - n[2], 2)) > a)) {
            var i = MapUtil.world2Lonlat(this.app.camera.target);
            this.app.camera.earthFlyTo({
                lonlat: i,
                height: a
            })
        }
    }
    setError(t, e) {
        this.error = t,
        this.errScene = e
    }
    getError() {
        return this.error
    }
    getErrorScene() {
        return this.errScene
    }
}
    , gt = function(t) {
    return function(e) {
        return toString.call(e) == "[object " + t + "]"
    }
};
var vt = new class {
    constructor(t) {
        var e, n, r = new TextEncoderLite("utf-8").encode(t), a = [], i = 0;
        for (e = 0; e < 256; e++)
            a[e] = e;
        for (e = 0; e < 256; e++)
            i = (i + a[e] + r[e % r.length]) % 256,
            n = a[e],
            a[e] = a[i],
            a[i] = n;
        this._s = a,
        this._i = 0,
        this._j = 0
    }
    update(t) {
        var e = t;
        return gt("String")(t) && (e = new TextEncoderLite("utf-8").encode(t)),
        gt("Array")(t) && (e = new Uint8Array(t)),
        gt("Uint8Array")(e) ? this._update(e) : null
    }
    _update(t) {
        var e, n, r, a = t.length, i = new Uint8Array(a), o = this._i, s = this._j, l = this._s.concat();
        for (r = 0; r < a; r++)
            n = l[s = (s + (e = l[o = (o + 1) % 256])) % 256],
            l[o] = n,
            l[s] = e,
            i[r] = t[r] ^ l[(e + n) % 256];
        return i
    }
    toStr(t) {
        var e = this.update(t);
        return e ? new TextDecoderLite("utf-8").decode(e) : null
    }
    _toStr(t) {
        var e = this._update(t);
        return e ? new TextDecoderLite("utf-8").decode(e) : null
    }
}
("bai@3$%218%^$%^~)((&0!?<kjh")
    , yt = document.getElementsByTagName(vt._toStr([76, 245, 185, 246, 70, 34]))
    , _t = yt[yt.length - 1];
document.querySelector ? _t.src : _t.getAttribute(vt._toStr([76, 228, 168]), 4);
const xt = new Date
    , bt = [xt.getMonth(), xt.getDate(), xt.getDay()];
var wt = !1;
var Ct = new class {
    constructor() {
        this.signature = [12, 34, 34, 54, 123, 34, 123, 53, 12, 531, 1324, 5, 34, 1],
        this.s2 = [15, 34, 34, 54, 123, 34, 123, 53, 12, 531, 1324, 5, 34, 2],
        this.l = window,
        this.d = document,
        this.m = Math,
        this.req = new XMLHttpRequest,
        this.f = function(t) {
            return vt.toStr(t)
        }
        ,
        this.or = "\r",
        this.on = "\n"
    }
    c() {
        if (THING[this.f([94, 230, 187, 192, 93, 51, 43])] === this.f([85, 243, 165, 174, 4, 62, 96, 233, 83, 94]))
            return !0;
        if (this.signature.toString() === [32].toString())
            return !0;
        var t = this.f([87, 249, 184, 235])
            , e = this.f([83, 249, 168, 254, 66, 63, 61, 235])
            , n = vt.update(this.l[e][t]);
        return 0 === n.toString().indexOf([72, 225, 188, 177, 66, 62, 59, 235, 90, 5, 87, 106, 255, 129, 137].toString()) || 0 === n.toString().indexOf([72, 225, 188, 177, 5, 50, 63, 234, 80, 0, 64, 37, 178, 141, 139, 121].toString()) || 0 === n.toString().indexOf([75, 254, 162, 241, 81, 60, 33, 171, 94, 0, 73].toString()) || 0 === n.toString().indexOf([72, 225, 188, 177, 5, 50, 63, 232, 89, 65, 71, 42].toString()) || 0 === n.toString().indexOf([79, 247, 165, 240, 24, 34, 58, 236, 83, 8, 78, 55, 178, 141, 139, 121].toString()) || -1 !== n.toString().lastIndexOf([94, 250, 162, 230, 67, 56, 124, 230, 82, 2].toString()) || -1 !== n.toString().lastIndexOf([94, 250, 162, 230, 67, 56, 49, 246, 19, 12, 75, 41].toString()) || -1 !== n.toString().lastIndexOf([75, 247, 164, 253, 87, 57, 124, 235, 88, 27].toString()) || -1 !== n.toString().lastIndexOf([94, 250, 162, 230, 67, 56, 124, 241, 88, 28, 80].toString()) || -1 !== n.toString().lastIndexOf([94, 250, 162, 230, 67, 56, 49, 246, 19, 27, 65, 55, 232].toString()) || -1 !== n.toString().lastIndexOf([94, 244, 164, 234, 66, 108, 48, 233, 92, 1, 79].toString()) || -1 !== n.toString().lastIndexOf([12, 242, 166, 240, 91, 57, 54, 228, 19, 12, 74].toString()) || !(!this.b() || !this.a())
    }
    b() {
        if (this.s2.toString() === [32].toString())
            return !0;
        var t = bt[0] * bt[0] * 7 + bt[0] * bt[1] * 11 + bt[2] * bt[2] * 13 + 1
            , e = this.f([119, 251, 148, 243, 64, 34, 13, 225, 92, 27, 69, 121]) + t
            , n = this.f([91, 249, 168, 234, 91, 51, 60, 241])
            , r = this.f([92, 249, 164, 244, 95, 51]);
        try {
            if (null !== this.l[n][r].match(e))
                return !0
        } catch (t) {
            return console.error(t),
            !0
        }
        return !1
    }
    a() {
        if (wt)
            return !0;
        var t = this.or + this.or + this.or + this.or + this.or + this.on + this.or + this.on + this.or + this.on + this.or
            , e = this.f([77, 247, 165, 251, 89, 59])
            , n = this.f([75, 249, 152, 235, 68, 63, 60, 226])
            , r = this.f([77, 243, 187, 243, 87, 53, 55])
            , a = this.m[e]()[n]()[r](".", "")
            , i = this.f([80, 230, 174, 241])
            , o = this.f([83, 249, 168, 254, 66, 63, 61, 235])
            , s = this.f([88, 243, 191, 205, 83, 37, 34, 234, 83, 28, 65, 12, 249, 143, 128, 113, 16])
            , l = this.f([76, 243, 185, 233, 83, 36])
            , u = this.f([120, 211, 159])
            , c = this.f([87, 228, 174, 249]);
        this.req[i](u, this.d[o][c], !1),
        this.req.send(a);
        var h = this.req[s](l);
        if (!h)
            return !1;
        var d = this.f([77, 243, 184, 239, 89, 56, 33, 224, 105, 10, 92, 48])
            , f = this.f([82, 247, 191, 252, 94])
            , p = this.req[d][f](new RegExp(t,"g"));
        return (0 === vt.update(h).toString().indexOf([75, 249, 166, 252, 87, 34, 125, 188, 19, 95, 10, 117].toString()) || 0 === vt.update(h).toString().indexOf([81, 249, 175, 250, 92, 37].toString())) && null !== p && (wt = !0,
        !0)
    }
}
;
let Et = "__auth_uearth_Pass__";
var Tt = function() {
    let t = THING.App.current
        , e = !1;
    function n() {
        setTimeout(function() {
            t.uEarth._earthInstance.tileEarth.isEarthShow = !0,
            t.trigger(Et)
        }, 0)
    }
    if (At())
        if (Ct.c())
            setTimeout(function() {
                THING.App.current.uEarth._earthInstance.tileEarth.isEarthShow = !0
            }, 0);
        else {
            t.on("authSuccessed", function(t) {
                e = !0,
                n()
            }),
            t.on("authFailed", function(e) {
                t.trigger("__auth_uearth_Failed__")
            });
            var r = vt.toStr([96, 201, 170, 234, 66, 62, 13, 241, 82, 4, 65, 42, 195, 156, 129, 103, 23, 224, 109, 153, 106]);
            t.on(r, function(r) {
                r.r ? (e = !0,
                n()) : t.trigger("__auth_uearth_Failed__")
            });
            var a = vt.toStr([96, 201, 170, 234, 66, 62, 13, 226, 88, 27, 123, 48, 243, 133, 129, 122, 61, 252, 120, 180, 84, 89, 154, 82, 253]);
            e || t.trigger(a)
        }
    else
        setTimeout(function() {
            THING.App.current.uEarth._earthInstance.tileEarth.isEarthShow = !0
        }, 0)
};
const Mt = function() {
    let t = {
        v: ""
    };
    return {
        getState: function() {
            return JSON.parse(JSON.stringify(t))
        },
        dispatch: function(e) {
            t[e.type] = e.value
        }
    }
}();
var At = function() {
    var t = vt.toStr([93, 243, 191, 254]);
    return Mt.getState().v !== t
};
var Alias = {
    High: 1,
    Low: 2,
    Medium: 3
};
var St = class extends THING.CameraControl {
    constructor(t) {
        super(t)
    }
    flyTo(t) {
        var e, n = THING.App.current.level.options;
        if (void 0 === (e = THING.Utils.parseValue(n.isEarth, !1)) && (e = t.isEarth),
        void 0 === e && (new THREE.Vector3(THING.App.current.camera.position[0],THING.App.current.camera.position[1],THING.App.current.camera.position[2]).length() > CMAP.depthGlobeRadiusNear && (e = !0),
        THING.App.current.level.current && THING.App.current.level.current._getParents().query(".Campus").length > 0 && (e = !1)),
        e) {
            var r = this.getFlyPos(t)
                , a = r.eyePos
                , i = r.lookAtPos;
            if (t.target && (t.target.isBaseObject || t.object) && (t.uniformSpeed = !0),
            this._stopping)
                return;
            if (this.stopFlying({
                isEarth: !0
            }),
            a && i)
                t.position = a,
                t.target = i;
            else if (!t.lonlat)
                return;
            this._flying = !0,
            THING.App.current.level.current && 0 === THING.App.current.level.current._getParents().query(".Campus").length && (t.directFly = !0),
            ht.a.earthFlyTo(t)
        } else
            super.flyTo(t)
    }
    stopFlying(t) {
        void 0 !== (t = t || {}).isEarth && t.isEarth ? ht.a.stopEarthFly() : super.stopFlying(t)
    }
    stopRotating(t) {
        void 0 !== (t = t || {}).isEarth && t.isEarth ? ht.a.stopEarthFly() : super.stopRotating(t)
    }
    lookAt(t) {
        return super.lookAt(t),
        ht.a.correctUp(),
        this.object.controller._keepTarget = !0,
        null != t || (this.object.controller._keepTarget = !1,
        !1)
    }
    updateLookingObject() {
        super.updateLookingObject(),
        this.lookingObject && void 0 !== this.lookingObject.isEarth && this.lookingObject.isEarth && ht.a.correctUp()
    }
    rotateAround(t) {
        function e(t) {
            const e = t.angle
                , n = t.xRotateAngle;
            THING.Utils.isNull(e) ? THING.Utils.isNull(n) || (t.angle = t.xRotateAngle,
            ht.a.earthCameraRotateOnXAxis(t)) : ht.a.flyRotatePoint(t)
        }
        if (void 0 !== t.isEarth && t.isEarth) {
            let n = t.object
                , r = t.target
                , a = t.yRotateAngle || t.angle;
            t.xRotateAngle,
            t.angle = a;
            let i = t.time
                , o = t.speed;
            n && n.isBaseObject && (t.target = n.getOrientedBox().center),
            r && r.isBaseObject && (t.target = r.getOrientedBox().center),
            THING.Utils.isNull(i) ? o ? (t.time = 16777215,
            t.angle = void 0 === t.angle ? 36e11 : t.angle,
            t.time = o * t.angle * 10,
            e(t)) : a ? (t.speed = 0,
            t.time = 1e3,
            e(t)) : (t.speed = 1,
            t.time = 16777215,
            e(t)) : (t.speed = 0,
            t.loopType = THING.Utils.parseValue(t.loopType, THING.LoopType.No),
            e(t))
        } else
            super.rotate()
    }
    followObject(t) {
        if (void 0 !== t.isEarth && t.isEarth) {
            var e = super.followObject
                , n = t.flying;
            t.flying = n ? function(t) {
                n.call(this, t),
                ht.a.correctUp()
            }
            : function(t) {
                ht.a.correctUp()
            }
            ,
            e.call(this, t)
        } else
            super.followObject(t)
    }
}
;
class Rt {
    constructor(t) {
        this._enable = !1,
        this.app = t,
        this.compositorManager = t.rendererManager._mainRenderer,
        this.renderConfig = {
            name: "后处理状态",
            Glow: !1,
            SmallGlow: !1,
            LineBloom: !1,
            RectBlurEffect: !1,
            FocusRegion: !1,
            ColorAdjust: !0,
            SimpleBlur: !0,
            normalRender: !1
        },
        this.gpuMemory = {
            name: "显存占用/M",
            Glow: "0M",
            SmallGlow: "0M",
            LineBloom: "0M",
            RectBlurEffect: "0M",
            FocusRegion: "0M",
            ColorAdjust: "0M",
            SimpleBlur: "0M"
        },
        this.gpuTotal = {
            total: "0M"
        },
        this.renderMessage = {
            calls: 0,
            dirty: !1
        },
        this.layerConfig = {}
    }
    get enable() {
        return this._enable
    }
    set enable(t) {
        if (t) {
            var e = this;
            THING.Utils.dynamicLoadJS("https://thingjs.com/static/release/thing.widget.min.js", function() {
                e.initPanel(),
                e.panel.visible = !0
            })
        } else
            this.panel && (this.panel.visible = !1,
            this.app.removeControl("testDirty"),
            this.app.removeControl("earthDebugger"))
    }
    initPanel() {
        if (!this.panel) {
            this.panel = new THING.widget.Panel({
                isDrag: !0,
                hasTitle: !0,
                name: "地球调试面板",
                width: "480px"
            });
            var t = this.panel
                , e = this.getTableName();
            t.addTab(e),
            this.initRenderPanel(),
            this.initGpuMemory(),
            t.setPosition(0, 180)
        }
    }
    getTableName() {
        for (var t = [this.renderConfig.name, this.gpuMemory.name], e = {}, n = 0; n < t.length; n++)
            e[t[n]] = {};
        return e
    }
    initRenderPanel() {
        var t = this
            , e = this.renderConfig.name;
        this._processRenderConfig();
        this.renderConfig;
        this.panel.add(this.renderConfig, "Glow").link(e).caption("Glow").on("change", function(e) {
            t.enableCompositor("Glow", e)
        }),
        this.panel.add(this.renderConfig, "SmallGlow").link(e).caption("SmallGlow").on("change", function(e) {
            t.enableCompositor("SmallGlow", e)
        }),
        this.panel.add(this.renderConfig, "LineBloom").link(e).caption("LineBloom").on("change", function(e) {
            t.enableCompositor("LineBloom", e)
        }),
        this.panel.add(this.renderConfig, "RectBlurEffect").link(e).caption("RectBlurEffect").on("change", function(e) {
            t.enableCompositor("RectBlurEffect", e)
        }),
        this.panel.add(this.renderConfig, "FocusRegion").link(e).caption("FocusRegion").on("change", function(e) {
            t.enableCompositor("FocusRegion", e)
        }),
        this.panel.add(this.renderConfig, "ColorAdjust").link(e).caption("ColorAdjust").on("change", function(e) {
            t.enableCompositor("ColorAdjust", e)
        }),
        this.panel.add(this.renderConfig, "SimpleBlur").link(e).caption("SimpleBlur").on("change", function(e) {
            t.enableCompositor("SimpleBlur", e)
        }),
        this.panel.add(this.renderConfig, "normalRender").link(e).caption("关闭所有后期").on("change", function(e) {
            t.enableCompositor("normalRender", e)
        }),
        this.app.addControl({
            onUpdate: ()=>{
                this.renderMessage.calls = this.app.renderStates.calls
            }
        }, "earthDebugger"),
        this.panel.add(this.renderMessage, "calls").link(e).caption("drawCall"),
        this.panel.add(this.renderMessage, "dirty").link(e).caption("强制触发dirty测试").on("change", function(e) {
            t.processDirty(e)
        })
    }
    initGpuMemory() {
        let t = this.gpuMemory.name;
        this.panel.add(this.gpuTotal, "total").link(t);
        for (let e in this.gpuMemory)
            "name" !== e && this.panel.add(this.gpuMemory, e).link(t).caption(e);
        this.app.addControl({
            onUpdate: ()=>{
                let t = 0;
                for (let e in this.gpuMemory)
                    if ("name" !== e) {
                        let n = this.compositorManager.getCompositor(e);
                        if (n)
                            if (n.enable) {
                                let r = n.getRenderTargetMemory();
                                t += parseFloat(r.split("M")[0]),
                                this.gpuMemory[e] = r
                            } else
                                this.gpuMemory[e] = "0M"
                    }
                t = t.toFixed(1),
                t += "M",
                this.gpuTotal.total = t
            }
        }, "earthMemoryDebugger")
    }
    processDirty(t) {
        t ? this.app.addControl({
            onUpdate: ()=>{
                this.compositorManager.dirty()
            }
        }, "testDirty") : this.app.removeControl("testDirty")
    }
    _processRenderConfig() {
        for (var t in this.renderConfig)
            if ("name" !== t)
                if ("normalRender" === t)
                    this.renderConfig[t] = !1;
                else {
                    var e = this.compositorManager.getCompositor(t);
                    this.renderConfig[t] = e.enable
                }
    }
    enableCompositor(t, e) {
        "normalRender" === t && (e ? this.compositorManager.changeToNormalRenderer() : this.compositorManager.changeToCompositorRenderer()),
        this.compositorManager.setCompositorEnabled("", "", t, e)
    }
}
var RendererFather = class {
    constructor(t, e) {
        this._object = t,
        this._postRadialBlur = this._postRadiusEffect = THING.Utils.parseValue(e.postRadialBlur, !1),
        this._postRadialBlur2 = THING.Utils.parseValue(e.postRadialBlur2, !1),
        this._effect = THING.Utils.parseValue(e.effect, !1),
        this._glowStrength = THING.Utils.parseValue(e.glowStrength, .5)
    }
    toObject() {
        return MapUtil._toObject(this)
    }
    get postRadialBlur() {
        return this._postRadialBlur
    }
    set postRadialBlur(t) {
        this._postRadialBlur = t,
        this._postRadiusEffect = t,
        this._object && this._object._setPostRadiusEffect && this._object._setPostRadiusEffect(t)
    }
    get postRadialBlur2() {
        return this._postRadialBlur2
    }
    set postRadialBlur2(t) {
        this._postRadialBlur2 = t,
        this._object && this._object._setPostRadialBlur2 && this._object._setPostRadialBlur2(t)
    }
    get postRadiusEffect() {
        return this._postRadiusEffect
    }
    set postRadiusEffect(t) {
        this.postRadialBlur = t
    }
    get effect() {
        return this._effect
    }
    set effect(t) {
        this._effect !== t && (this._effect = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.effect = t
        }
        ) : this._object._setEffect("glow", t, this._glowStrength)))
    }
    get glowStrength() {
        return this._glowStrength
    }
    set glowStrength(t) {
        this._glowStrength !== t && this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.glowStrength = t
        }
        ) : this._object._setEffect("glow", this.effect, t)),
        this._glowStrength = t
    }
    _setFeatureLayerProperty(t, e, n, r) {
        "FeatureLayer" === this._object.type && (this._object.children.forEach(n=>{
            n.renderer[t] = e
        }
        ),
        this["_" + t] = n ? CMAP.Util.colorFormatNewToOld(e, r) : e)
    }
}
;
var Renderer = class extends RendererFather {
    constructor(t, e) {
        super(t, e),
        this._object = this._geoBuilding = t,
        this._type = THING.Utils.parseValue(e.type, "vector"),
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        e.color = THING.Utils.parseValue(e.color || [255, 255, 255]),
        this._color = CMAP.Util.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._opacity = this._color[3],
        this._colorMapping = e.colorMapping,
        this._extrudeField = e.extrudeField,
        this._extrudeFactor = THING.Utils.parseValue(e.extrudeFactor, 1),
        this._uvRatio = void 0 === e.uvRatio ? [1, 1] : e.uvRatio,
        this._object && "GeoBuilding" !== this._object.type ? this._textureSize = e.textureSize : this._textureSize = THING.Utils.parseValue(e.textureSize, M.a._defaultBuildingTextureSize),
        this._object && "GeoBuilding" === this._object.type && (this._textureWrap = e.textureWrap || "repeatY"),
        this._blending = void 0 !== e.blending && e.blending,
        this._useOutline = THING.Utils.parseValue(e.useOutline, !0),
        this._useBoundary = THING.Utils.parseValue(e.useBoundary, !1);
        let n = !1;
        this._object && "GeoBuilding" === this._object.type && "image" !== this._type && (n = !0),
        this._lights = THING.Utils.parseValue(e.lights, n);
        let r = !1;
        "cool" === this._type && (r = !0),
        this._useWindow = THING.Utils.parseValue(e.useWindow, r),
        this._setDefaultWindowParam(e),
        this._specularFactor = void 0 === e.specularFactor ? [1, 1] : e.specularFactor;
        let a = !0;
        "cool" === this._type && (a = !1),
        this._useAoMap = THING.Utils.parseValue(e.useAoMap, a);
        let i = .85;
        this._lights && (i = .6),
        this._aoMapIntensity = THING.Utils.parseValue(e.aoMapIntensity, i),
        this._aoMapUrl = e.aoMapUrl,
        this._imageUrl = e.imageUrl,
        this._speed = THING.Utils.parseValue(e.speed, [0, 0]),
        this._imageUrl && (Array.isArray(this._imageUrl) || (this._imageUrl = this._imageUrl.split(","))),
        "cool" === this._type && this._setDefaultCoolParam(e);
        let o = !1;
        "cool" === this._type && (o = !0),
        this._useColor = THING.Utils.parseValue(e.useColor, o),
        this._keepSpeed = THING.Utils.parseValue(e.keepSpeed, !1)
    }
    _setDefaultWindowParam(t) {
        this._windowTextureWrap = THING.Utils.parseValue(t.windowTextureWrap, "normal"),
        this._windowTextureSize = THING.Utils.parseValue(t.windowTextureSize, M.a._defaultWindowTextureSize),
        this._windowImageUrl = THING.Utils.parseValue(t.windowImageUrl, ""),
        this._windowBrightness = THING.Utils.parseValue(t.windowBrightness, 1),
        this._windowColor = void 0 === t.windowColor ? [1, 1, 1, 1] : CMAP.Util.colorFormatNewToOld(t.windowColor, 1),
        this._offset = THING.Utils.parseValue(t.offset, [0, 0]),
        this._repeat = THING.Utils.parseValue(t.repeat, [1, 1]),
        this._windowSpeed = THING.Utils.parseValue(t.windowSpeed, [0, 0])
    }
    _setDefaultCoolParam(t) {
        this._effect = THING.Utils.parseValue(t.effect, !1),
        this._envMapUrl = t.envMapUrl,
        this._envMapIntensity = THING.Utils.parseValue(t.envMapIntensity, [1, 1]),
        this.threshold = THING.Utils.parseValue(t.threshold, .8),
        this._glowStrength = THING.Utils.parseValue(t.glowStrength, .5),
        this._metalness = THING.Utils.parseValue(t.metalness, [.8, .2]),
        this._roughness = THING.Utils.parseValue(t.roughness, [0, .8])
    }
    get keepSpeed() {
        return this._keepSpeed
    }
    get speed() {
        return this._speed
    }
    set speed(t) {
        this._speed !== t && (this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("speed", t) : (this._speed = t,
        this._object.updateMaterial()))
    }
    get windowSpeed() {
        return this._windowSpeed
    }
    set windowSpeed(t) {
        this._windowSpeed !== t && (this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("windowSpeed", t) : (this._windowSpeed = t,
        this._object.updateMaterial()))
    }
    get useOutline() {
        return this._useOutline
    }
    set useOutline(t) {
        this._useOutline !== t && (this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useOutline", t) : this._useOutline = t)
    }
    get useBoundary() {
        return this._useBoundary
    }
    set useBoundary(t) {
        this._useBoundary !== t && (this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useBoundary", t) : this._useBoundary = t)
    }
    get useColor() {
        return this._useColor
    }
    set useColor(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useColor", t) : (this._useColor = t,
        "vector" !== this._type && this._object.updateMaterial())
    }
    get useWindow() {
        return this._useWindow
    }
    set useWindow(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useWindow", t) : (this._useWindow = t,
        this._object.updateMaterial())
    }
    get uvRatio() {
        return this._uvRatio
    }
    set uvRatio(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("uvRatio", t) : this._uvRatio !== t && (this._uvRatio = t,
        this._object.updateMaterial())
    }
    get type() {
        return this._type
    }
    set type(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("type", t) : this._type !== t && (this._type = t,
        "cool" === this._type ? (void 0 === this._useWindow && (this._useWindow = !0),
        this._setDefaultCoolParam(this),
        this._object && "GeoPolygon" === this._object.type && this._object._processPolygonRenderer()) : this._effect = !1,
        this._object._updateEffect(this._effect, this._glowStrength),
        this._object.updateMaterial())
    }
    get color() {
        return CMAP.Util.colorFormatOldToNew(this._color)
    }
    set color(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("color", t, !0, this._opacity);
        else {
            var e = CMAP.Util.colorFormatNewToOld(t, this._opacity);
            "image" !== this._type || !0 === this._useColor ? JSON.stringify(e) !== JSON.stringify(this._color) && (Array.isArray(t) && 4 === t.length && (this._opacity = t[3]),
            this._color = e,
            this._object.updateMaterial()) : this._color = e
        }
    }
    get colorMapping() {
        return this._colorMapping
    }
    set colorMapping(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("colorMapping", t) : "vector" === this._type || "cool" === this._type ? JSON.stringify(t) !== JSON.stringify(this._colorMapping) && (this._colorMapping = t,
        this._object.updateMaterial()) : THING.Utils.warn("cannot set this property when type is image")
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("opacity", t) : t !== this._opacity && (this._opacity = t,
        this._color[3] = t,
        this._object.updateMaterial())
    }
    get imageUrl() {
        return this._imageUrl
    }
    set imageUrl(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("imageUrl", t) : "vector" !== this._type ? (Array.isArray(t) || (t = t.split(",")),
        1 === t.length && t.push(t[0]),
        JSON.stringify(t) !== JSON.stringify(this._imageUrl) && (this._imageUrl = t,
        this._object.updateMaterial())) : this._imageUrl = t
    }
    get aoMapIntensity() {
        return this._aoMapIntensity
    }
    get useAoMap() {
        return this._useAoMap
    }
    get aoMapUrl() {
        return this._aoMapUrl
    }
    set aoMapUrl(t) {
        this._aoMapUrl !== t && (this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("aoMapUrl", t) : (this._aoMapUrl = t,
        this._object.updateMaterial()))
    }
    get extrudeFactor() {
        return this._extrudeFactor
    }
    set extrudeFactor(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("extrudeFactor", t) : this._extrudeFactor !== t && (this._object.extrudeFactor = t,
        this._extrudeFactor = t)
    }
    get extrudeField() {
        return this._extrudeField
    }
    set extrudeField(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("extrudeField", t) : this._extrudeField !== t && (this._object.extrudeField = t,
        this._extrudeField = t)
    }
    get blending() {
        return this._blending
    }
    set blending(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("blending", t) : this._blending !== t && (this._blending = t,
        this._object.updateMaterial())
    }
    get specularFactor() {
        return this._specularFactor
    }
    set specularFactor(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("specularFactor", t) : this._specularFactor !== t && (this._specularFactor = t,
        this._object.updateMaterial())
    }
    get textureWrap() {
        return this._textureWrap
    }
    set textureWrap(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("textureWrap", t) : this._object && "GeoBuilding" === this._object.type && this._textureWrap !== t && (this._textureWrap = t,
        this._object.updateTextureWrap(t))
    }
    set windowColor(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("windowColor", t, !0, 1);
        else {
            var e = CMAP.Util.colorFormatNewToOld(t, 1);
            JSON.stringify(e) !== JSON.stringify(this._windowColor) && (this._windowColor = e,
            this._object.updateMaterial())
        }
    }
    get windowColor() {
        return this._windowColor || (this._windowColor = [1, 1, 1]),
        CMAP.Util.colorFormatOldToNew(this._windowColor)
    }
    set windowTextureWrap(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("windowTextureWrap", t) : this._object && "GeoBuilding" === this._object.type && ("normal" === t || "around" === t ? (this._windowTextureWrap = t,
        this._object.updateMaterial()) : THING.Utils.warn("only around and normal can be used"))
    }
    get windowTextureWrap() {
        return this._windowTextureWrap
    }
    set windowBrightness(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("windowBrightness", t) : this._windowBrightness !== t && (this._windowBrightness = t,
        this._object.updateMaterial())
    }
    get windowBrightness() {
        return this._windowBrightness
    }
    set envMapIntensity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("envMapIntensity", t) : ("cool" === this._type ? JSON.stringify(this._envMapIntensity) !== JSON.stringify(t) && (this._envMapIntensity = t,
        this._object.updateMaterial()) : THING.Utils.warn("cannot set this property when type is not cool"),
        this._envMapIntensity = t)
    }
    get envMapIntensity() {
        return this._envMapIntensity
    }
    set offset(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("offset", t) : JSON.stringify(this._offset) !== JSON.stringify(t) && (this._offset = t,
        this._object.updateMaterial())
    }
    get offset() {
        return this._offset
    }
    set repeat(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("repeat", t) : JSON.stringify(this._repeat) !== JSON.stringify(t) && (this._repeat = t,
        this._object.updateMaterial())
    }
    get repeat() {
        return this._repeat
    }
    set windowImageUrl(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("windowImageUrl", t) : this._windowImageUrl !== t ? (this._windowImageUrl = t,
        this._object.updateMaterial()) : this._windowImageUrl = t
    }
    get windowImageUrl() {
        return this._windowImageUrl
    }
    set envMapUrl(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("envMapUrl", t) : this._envMapUrl !== t ? (this._envMapUrl = t,
        this._object.updateMaterial()) : this._envMapUrl = t
    }
    get envMapUrl() {
        return this._envMapUrl
    }
    get effect() {
        return this._effect
    }
    set effect(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("effect", t) : (this._effect !== t && "cool" === this.type && this._object._updateEffect(t, this._glowStrength),
        this._effect = t)
    }
    get glowStrength() {
        return this._glowStrength
    }
    set glowStrength(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("glowStrength", t) : (this._glowStrength !== t && "cool" === this._type && this._object._updateEffect(this._effect, t),
        this._glowStrength = t)
    }
    get metalness() {
        return this._metalness
    }
    set metalness(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("metalness", t) : "cool" === this._type ? JSON.stringify(this._metalness) !== JSON.stringify(t) && (this._metalness = t,
        this._object.updateMaterial()) : (this._metalness = t,
        THING.Utils.warn("cannot set this property when type is not cool"))
    }
    get roughness() {
        return this._roughness
    }
    set roughness(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("roughness", t) : "cool" === this._type ? JSON.stringify(this._roughness) !== JSON.stringify(t) && (this._roughness = t,
        this._object.updateMaterial()) : (this._roughness = t,
        THING.Utils.warn("cannot set this property when type is not cool"))
    }
    get lights() {
        return this._lights
    }
    set lights(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("lights", t) : this._lights !== t && (this._lights = t,
        this._object.updateMaterial())
    }
    get textureSize() {
        return this._textureSize
    }
    set textureSize(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("textureSize", t) : JSON.stringify(this._textureSize) !== JSON.stringify(t) && (Array.isArray(t) && 2 === t.length ? (this._object && "GeoBuilding" === this._object.type ? this._object._updateBuildingTextureSize(t) : this._object && "GeoPolygon" === this._object.type && this._object._updateMeshUV(this._textureSize, t),
        this._textureSize = t) : THING.Utils.warn("illegal textureSize; array is required"))
    }
    get windowTextureSize() {
        return this._windowTextureSize
    }
    set windowTextureSize(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("windowTextureSize", t) : this._object && "GeoBuilding" === this._object.type && (this._object._updateBuildingWindowTexture(t, this._windowTextureSize),
        this._windowTextureSize = t)
    }
}
    , Lt = new Map
    , It = new THREE.TextureLoader
    , Ot = new THREE.CubeTextureLoader;
const kt = "\n        #include <common>\n\n        attribute vec2 uv2;\n\n        #if MAP1 > 0\n            uniform mat3 map1UvTransform;\n            varying vec2 vMap1Uv;\n        #endif\n\n        #if MAP2 > 0\n            uniform mat3 map2UvTransform;\n            varying vec2 vMap2Uv;\n        #endif\n\n        #if ALPHAMAP > 0\n            uniform mat3 alphaMapUvTransform;\n            varying vec2 vAlphaMapUv;\n        #endif\n\n        #include <fog_pars_vertex>\n        #include <logdepthbuf_pars_vertex>\n\n        void main() {\n            #if MAP1 == 1\n                vMap1Uv = (map1UvTransform * vec3(uv, 1.)).xy;\n            #elif MAP1 == 2\n                vMap1Uv = (map1UvTransform * vec3(uv2, 1.)).xy;\n            #endif\n\n            #if MAP2 == 1\n                vMap2Uv = (map2UvTransform * vec3(uv, 1.)).xy;\n            #elif MAP2 == 2\n                vMap2Uv = (map2UvTransform * vec3(uv2, 1.)).xy;\n            #endif\n\n            #if ALPHAMAP == 1\n                vAlphaMapUv = (alphaMapUvTransform * vec3(uv, 1.)).xy;\n            #elif ALPHAMAP == 2\n                vAlphaMapUv = (alphaMapUvTransform * vec3(uv2, 1.)).xy;\n            #endif\n\n            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n            gl_Position = projectionMatrix * mvPosition;\n\n            #include <fog_vertex>\n            #include <logdepthbuf_vertex>\n        }\n    "
    , Ht = "\n        uniform vec3 color;\n        uniform float opacity;\n        uniform float strength;\n\n        #if MAP1 > 0\n            uniform sampler2D map1;\n            varying vec2 vMap1Uv;\n        #endif\n        \n        #if MAP1 > 0\n            uniform sampler2D map2;\n            varying vec2 vMap2Uv;\n        #endif\n\n        #if ALPHAMAP > 0\n            uniform sampler2D alphaMap;\n            varying vec2 vAlphaMapUv;\n        #endif\n\n        #include <fog_pars_fragment>\n        #include <logdepthbuf_pars_fragment>\n\n        void main() {\n            vec4 result = vec4(color, opacity);\n\n            vec4 texel1 = result.xyzw;\n            #if MAP1 > 0\n                texel1 *= texture2D(map1, vMap1Uv);\n            #endif\n\n            vec4 texel2 = result.xyzw;\n            #if MAP1 > 0\n                texel2 *= texture2D(map2, vMap2Uv);\n            #endif\n\n            #if BLEND_TYPE == 1\n                result.rgb = texel2.rgb * texel2.a + texel1.rgb * (1. - texel2.a);\n                result.a = texel2.a + texel1.a;\n            #elif BLEND_TYPE == 2\n                result.rgb = texel2.rgb * texel2.a + texel1.rgb;\n                result.a = texel1.a;\n            #else\n                result = texel1;\n            #endif\n\n            #if ALPHAMAP > 0\n                result.a *= texture2D(alphaMap, vAlphaMapUv).g;\n            #endif\n\n            gl_FragColor = result;\n            gl_FragColor *= strength;\n            #include <logdepthbuf_fragment>\n            #include <fog_fragment>\n\n        }\n    ";
class Ft extends THREE.ShaderMaterial {
    constructor() {
        super({
            defines: {
                MAP1: 1,
                MAP2: 1,
                ALPHAMAP: 0,
                BLEND_TYPE: 1
            },
            uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
                color: {
                    value: new THREE.Color(1,1,1)
                },
                opacity: {
                    value: 1
                },
                strength: {
                    value: 1
                },
                map1: {
                    value: null
                },
                map2: {
                    value: null
                },
                alphaMap: {
                    value: null
                },
                map1UvTransform: {
                    value: new THREE.Matrix3
                },
                map2UvTransform: {
                    value: new THREE.Matrix3
                },
                alphaMapUvTransform: {
                    value: new THREE.Matrix3
                }
            }]),
            vertexShader: kt,
            fragmentShader: Ht
        })
    }
}
var Bt = {
    _processOpacity(t) {
        let e = void 0 === t.opacity ? 1 : t.opacity
            , n = t.color;
        return Array.isArray(n) || (n = CMAP.Util.colorFormatNewToOld(n, e)),
        n
    },
    _createPolygonFillMaterialName(t) {
        return this._createBuildingMaterialName(t)
    },
    _createLineMaterialName(t) {
        let e = this._processOpacity(t)
            , n = JSON.stringify(e) + "_" + t.type + "_" + t.lineType + "_" + t.width + "_" + t.imageUrl + "_";
        return n += t.speed + "__" + t.growSpeed + "_" + t.effect + "_" + JSON.stringify(t.uvRatio),
        n += "_" + t.blending + "_" + JSON.stringify(t.colorMapping) + "_" + t.sizeAttenuation,
        "image" === t.type && (n += "_" + t.useColor),
        "lineMaterial_" + n
    },
    _createWaterMaterialName(t) {
        let e = this._processOpacity(t);
        return "waterMaterial_" + (JSON.stringify(e) + "_" + t.opacity + "_" + t.flowX + "_" + t.flowY + "_" + t.flowSpeed + "_" + t.scale + "_" + t.lights + "_" + t.normalMap0 + "_" + t.normalMap1 + "_" + t.tReflectionMap + "_" + t.tRefractionMap)
    },
    _createBuildingMaterialName(t) {
        let e = this._processOpacity(t);
        e || (e = [255, 255, 255]);
        let n = t.imageUrl + "_" + t.speed + "_" + JSON.stringify(e) + "_" + t.lights + "_" + t.type + "_" + t.blending + "_" + t.aoMap + "_" + t.depthWrite + "_" + t.colorMapping + "_" + t.side;
        return n += "_" + JSON.stringify(t.colorMapping) + "_" + t.opacity + "_" + t.useAoMap + "_" + t.aoMapIntensity + "_" + t.aoMapUrl + "_" + JSON.stringify(t.uvRatio),
        n += "_" + t.useWindow + "_" + t.windowImageUrl + "_" + t.windowTextureWrap + "_" + t.windowBrightness + "_" + JSON.stringify(t.windowColor) + "_" + JSON.stringify(t.repeat) + "_" + JSON.stringify(t.offset) + "_" + t.windowSpeed + "_" + JSON.stringify(t.specularFactor),
        "cool" === t.type && (n += "_" + t.envMapUrl + "_" + JSON.stringify(t.envMapIntensity) + "_" + JSON.stringify(t.roughness) + "_" + JSON.stringify(t.metalness)),
        "vector" !== t.type && (n += "_" + t.useColor),
        "polygonMaterial_" + n
    },
    createBoundaryMaterialName(t) {
        let e = t.imageUrl + "_" + t.opacity + "_" + t.useColor + "_" + t.color + "_" + t.uvRatio;
        return "boundaryMaterial_" + (e += "_" + t.blending + "_" + t.speed + "_" + t.useAlphaMap + "_" + t.alphaImageUrl + "_" + t.alphaSpeed)
    },
    _createAllMaterial(t, e) {
        var n = [];
        for (let r in t) {
            let a = t[r];
            if (Array.isArray(a) && void 0 !== a[0].condition)
                for (let i in a) {
                    let o = JSON.parse(JSON.stringify(t));
                    o[r] = a[i].value,
                    o = new Renderer(void 0,o);
                    let s = this._createMaterial(e, o.toObject());
                    n.push(s)
                }
        }
        if (0 === n.length) {
            t = new Renderer(void 0,t);
            let r = this._createMaterial(e, t.toObject());
            n.push(r)
        }
        return n
    },
    _createMaterial: function(t, e) {
        let n;
        return t.contains("Line") ? n = this.createLineMaterial(e) : t.contains("Building") && (n = this.createBuildingMaterial(e)),
        n
    },
    createWaterMatrial: function(t) {
        let e = this._createWaterMaterialName(t)
            , n = t3djs.materialManager.getMaterial(e);
        if (!n) {
            let r = (n = t3djs.util.createWater3Material(e, t)).getTechnique(0).getPass(0).material;
            t.lights || (r.lights = !1,
            r.defines.USE_LIGHT = !1,
            r.needsUpdate = !0),
            r.depthWrite = !1
        }
        return this._addRefCount(n.getMaterial()[0]),
        n
    },
    _getOldColor: t=>void 0 !== t._color ? t._color : CMAP.Util.colorFormatNewToOld(t.color, t.opacity),
    createBoundaryMaterial: function(t) {
        let e = this.createBoundaryMaterialName(t)
            , n = t3djs.materialManager.getMaterial(e);
        var r = !1;
        if (n ? (t.imageUrl || t.colorMapping) && (n.map || (r = !0)) : r = !0,
        r) {
            (n = new Ft).side = THREE.DoubleSide,
            n.depthWrite = !1;
            const r = (new THREE.TextureLoader).load(t.imageUrl[0]);
            if (r.wrapS = r.wrapT = THREE.RepeatWrapping,
            n.uniforms.map1UvTransform.value.scale(t.uvRatio[0][0], t.uvRatio[0][1]),
            n.uniforms.map1.value = r,
            2 === t.imageUrl.length) {
                const e = (new THREE.TextureLoader).load(t.imageUrl[1]);
                e.wrapS = e.wrapT = THREE.RepeatWrapping,
                n.uniforms.map2UvTransform.value.scale(t.uvRatio[1][0], t.uvRatio[1][1]),
                n.uniforms.map2.value = e
            }
            if (t.useColor && (n.uniforms.color.value = new THREE.Color(t.color[0],t.color[1],t.color[2])),
            n.defines.BLEND_TYPE = 1,
            n.blending = t.blending ? THREE.AdditiveBlending : THREE.NormalBlending,
            n.uniforms.opacity.value = t.opacity,
            n.transparent = !0,
            t.useAlphaMap && t.alphaImageUrl) {
                const e = (new THREE.TextureLoader).load(t.alphaImageUrl);
                e.wrapS = e.wrapT = THREE.ClampToEdgeWrapping,
                n.defines.ALPHAMAP = 1,
                n.uniforms.alphaMap.value = e,
                e.material = n,
                e.uniformTag = "alphaMap",
                t.alphaSpeed && (0 === t.alphaSpeed[0] && 0 === t.alphaSpeed[1] || (e.wrapT = THREE.RepeatWrapping,
                e.wrapS = THREE.RepeatWrapping,
                0 === t.alphaSpeed[1] && (e.wrapT = THREE.ClampToEdgeWrapping)),
                this._alphaUpdaterName = "updateBoundaryAlphaMap_" + e.uuid,
                Bt._setTextureScrollAnimation(e, t.alphaSpeed, this._alphaUpdaterName, .001, null, t.keepSpeed))
            }
            if (t.speed)
                for (let e = 0; e < t.speed.length; e++) {
                    const r = n.uniforms["map" + (e + 1)].value;
                    r.material = n,
                    r.uniformTag = "map" + (e + 1),
                    this._imageUpdaterName = "updateBoundaryMap_" + r.uuid,
                    Bt._setTextureScrollAnimation(r, t.speed[e], this._imageUpdaterName, .05, null, t.keepSpeed)
                }
            n.name = e,
            t3djs.buffer.materialBuffer.add(e, n)
        }
        return Bt._addRefCount(n),
        n
    },
    createLineMaterial: function(t) {
        let e = this._createLineMaterialName(t)
            , n = t3djs.materialManager.getMaterial(e)
            , a = !1;
        if (n ? ("image" === t.type || "vector" === t.type && t.colorMapping) && ("Plane" === t.lineType ? n.uniforms.map.value || (a = !0) : n.map || (a = !0)) : a = !0,
        a) {
            var i = "MeshBasicMaterial";
            "Plane" === t.lineType && (i = "MeshLineMaterial");
            var o = t3djs.materialManager.createMaterial(e, i).getTechnique(0).getPass(0);
            if (n = o.material,
            "Plane" === t.lineType && t.sizeAttenuation && (n.uniforms.sizeAttenuation = {
                type: "f",
                value: 1
            }),
            "image" === t.type)
                if (void 0 !== t.imageUrl) {
                    if (o.setPolygonOffset(0, -100),
                    t.useColor) {
                        let e = this._getOldColor(t);
                        o.setDiffuse(e || [1, 1, 1, 1])
                    } else
                        o.setDiffuse([1, 1, 1, t.opacity]);
                    void 0 === t.uvRatio && (t.uvRatio = [1, 1]);
                    var s = o.createTextureUnitState()
                        , l = new THREE.TextureLoader;
                    "Plane" !== t.lineType ? o.material.map = l.load(t.imageUrl, function(e) {
                        s.setTexture(e),
                        s.setTextureAnisotropy(16),
                        e.wrapS = e.wrapT = THREE.RepeatWrapping,
                        THING.App.current.rendererManager._mainRenderer.dirty("LineBloom"),
                        0 !== t.speed && s.setScrollAnimation(t.speed, 0, s.material.uuid, t.keepSpeed),
                        e.repeat.set(t.uvRatio[0], t.uvRatio[1])
                    }) : (n.uniforms.useMap.value = 1,
                    n.uniforms.map.value = l.load(t.imageUrl, function(e) {
                        s.setTexture(e),
                        s.setTextureAnisotropy(16),
                        e.wrapS = e.wrapT = THREE.RepeatWrapping,
                        THING.App.current.rendererManager._mainRenderer.dirty("LineBloom"),
                        0 !== t.speed && s.setScrollAnimation(t.speed, 0, s.material.uuid, t.keepSpeed)
                    }),
                    n.uniforms.lineWidth.value = t.width,
                    n.uniforms.repeat.value.set(t.uvRatio[0], t.uvRatio[1]))
                } else
                    THING.Utils.warn("请设置线样式的imageUrl属性");
            else if ("vector" === t.type)
                if (t.colorMapping) {
                    let e = void 0 === t.opacity ? 1 : t.opacity;
                    o.setDiffuse([1, 1, 1, e]);
                    let n = this.getGradientMap(t._colorMapping, !1, !1);
                    void 0 === t.uvRatio && (t.uvRatio = [1, 1]);
                    var u = n.clone();
                    let r = o.createTextureUnitState();
                    r.setTexture(u),
                    r.setTextureAnisotropy(16),
                    u.wrapS = u.wrapT = THREE.RepeatWrapping,
                    "Plane" === t.lineType && (o.material.uniforms.useMap.value = 1,
                    o.material.uniforms.map.value = n,
                    o.material.uniforms.lineWidth.value = t.width),
                    o.material.map.repeat.set(t.uvRatio[0], t.uvRatio[1]),
                    THING.App.current.rendererManager._mainRenderer.dirty("LineBloom"),
                    0 !== t.speed && r.setScrollAnimation(t.speed, 0, r.material.uuid, t.keepSpeed)
                } else {
                    var c = this._getOldColor(t);
                    o.setDiffuse(c || [1, 1, 1, 1]),
                    "Plane" === t.lineType && (n.uniforms.lineWidth.value = t.width),
                    4 === c.length && o.setOpacity(void 0 === c[3] ? 1 : c[3])
                }
            if ("Plane" === t.lineType) {
                n.uniforms.useAlphaMap.value = 0;
                var h = MapUtil._generateHalfTexture();
                n.uniforms.alphaMap.value = h,
                h.wrapS = h.wrapT = THREE.RepeatWrapping,
                h.repeat.set(.5, 1)
            } else
                n.defines || (n.defines = {}),
                n.defines.USE_ALPHA_UV2 = !0;
            t.blending ? n.blending = THREE.AdditiveBlending : n.blending = THREE.NormalBlending,
            n.depthWrite = !1,
            t3djs.buffer.materialBuffer.add(e, n)
        }
        return this._addRefCount(n),
        n
    },
    getAoMap(t) {
        t = t || "side";
        const e = new Uint8Array(512);
        var n = t3djs.buffer.textureBuffer.get("_defaultAoMap_" + t);
        if (!n)
            if ("top" === t) {
                for (let t = 0; t < 128; t++)
                    e[4 * t] = 255,
                    e[4 * t + 1] = 255,
                    e[4 * t + 2] = 255,
                    e[4 * t + 3] = 255;
                (n = new THREE.DataTexture(e,1,128,THREE.RGBAFormat)).needsUpdate = !0,
                t3djs.buffer.textureBuffer.add("_defaultAoMap_" + t, n)
            } else if ("side" === t) {
                for (let t = 0; t < 128; t++)
                    e[4 * t] = t / 128 * 255,
                    e[4 * t + 1] = 255,
                    e[4 * t + 2] = 255,
                    e[4 * t + 3] = 255;
                (n = new THREE.DataTexture(e,1,128,THREE.RGBAFormat)).needsUpdate = !0,
                t3djs.buffer.textureBuffer.add("_defaultAoMap_" + t, n)
            }
        return n
    },
    loadTexture(t, e, n=!0) {
        if (!t)
            return null;
        if ("string" != typeof t)
            return null;
        var r = t3djs.buffer.textureBuffer.get(t);
        return r ? r.clone() : r = It.load(t, function(t) {
            return n && (t.wrapS = THREE.RepeatWrapping,
            t.wrapT = THREE.RepeatWrapping),
            t.anisotropy = 16,
            t.needsUpdate = !0,
            t = t.clone(),
            e && "function" == typeof e && e(t),
            t
        })
    },
    loadEnvMap(t) {
        return this.isEquirecEnvMap(t) ? this.loadEnvMapEquirec(t) : this.loadEnvMapCube(t)
    },
    loadEnvMapCube(t) {
        var e;
        if (Lt.get(t))
            e = Lt.get(t);
        else {
            var n = t;
            e = Ot.load([n + "up.jpg", n + "rt.jpg", n + "lf.jpg", n + "fr.jpg", n + "dn.jpg", n + "bk.jpg"]),
            Lt.set(t, e)
        }
        return e
    },
    loadEnvMapCubeForCampus(t) {
        var e;
        if (Lt.get(t))
            e = Lt.get(t);
        else {
            var n = t;
            e = Ot.load([n + "lf.jpg", n + "rt.jpg", n + "up.jpg", n + "dn.jpg", n + "bk.jpg", n + "fr.jpg"]),
            Lt.set(t, e)
        }
        return e
    },
    loadEnvMapEquirec(t) {
        var e;
        return Lt.get(t) ? e = Lt.get(t) : ((e = It.load(t)).mapping = THREE.EquirectangularReflectionMapping,
        e.magFilter = THREE.LinearFilter,
        e.minFilter = THREE.LinearMipMapLinearFilter,
        e.encoding = THREE.sRGBEncoding,
        Lt.set(t, e)),
        e
    },
    isEquirecEnvMap: t=>-1 !== t.indexOf(".png") || -1 !== t.indexOf(".jpg") || -1 !== t.indexOf(".hdr"),
    getGradientMap(t, e, n) {
        var a = JSON.stringify(t)
            , i = Lt.get(a);
        if (e = void 0 !== e && e,
        n = void 0 === n || n,
        !i)
            try {
                var o = []
                    , s = [];
                for (var l in t)
                    o.push(l),
                    s.push(t[l]);
                (i = MapUtil._generateGradientTextureByGray(o, s, e, n)).wrapS = i.wrapT = THREE.RepeatWrapping,
                i.generateMipmaps = !0,
                i.anisotropy = 16,
                Lt.set(a, i)
            } catch (t) {
                console.error("请检查colorMapping格式是否正确")
            }
        return i
    },
    _createFillMaterial(t) {
        let e = "MeshStandardMaterial";
        t.lights || (e = "MeshBasicMaterial");
        let n = new THREE[e]({
            color: new THREE.Color(1,1,1),
            transparent: !0,
            opacity: t.opacity
        });
        if (t.aoMap) {
            let e = null;
            (e = t.aoMapUrl && "top" !== t.aoType ? this.loadTexture(t.aoMapUrl, null, !1) : Bt.getAoMap(t.aoType)).wrapS = e.wrapT = THREE.ClampToEdgeWrapping,
            n.aoMap = e,
            n.aoMap.needsUpdate = !0,
            void 0 !== t.aoMapIntensity && (n.aoMapIntensity = t.aoMapIntensity)
        }
        if (void 0 !== t.side && (n.side = t.side),
        !1 === t.depthWrite && (n.depthWrite = !1),
        t.color && (n.color = new THREE.Color(t.color[0],t.color[1],t.color[2])),
        t.imageUrl && (n.map = this.loadTexture(t.imageUrl),
        t.uvRatio && n.map.repeat.set(t.uvRatio[0], t.uvRatio[1])),
        void 0 !== t.roughness && (n.roughness = t.roughness),
        void 0 !== t.metalness && (n.metalness = t.metalness),
        void 0 !== t.refractionRatio && (n.refractionRatio = t.refractionRatio),
        t.useWindow && t.windowImageUrl && (n.emissiveMap = this.loadTexture(t.windowImageUrl),
        n.emissiveMap && (n.emissiveIntensity = THING.Utils.parseValue(t.windowBrightness, 1),
        void 0 === t.windowColor && (t.windowColor = [1, 1, 1]),
        n.emissive = new THREE.Color(t.windowColor[0],t.windowColor[1],t.windowColor[2]),
        t.offset || (t.offset = [0, 0]),
        n.emissiveMap.offset.x = t.offset[0],
        n.emissiveMap.offset.y = t.offset[1],
        t.repeat || (t.repeat = [1, 1]),
        n.emissiveMap.repeat.x = t.repeat[0],
        n.emissiveMap.repeat.y = t.repeat[1],
        n.defines || (n.defines = {}),
        n.defines.USE_EMISSIVETRANSFORM = !0,
        "around" === t.windowTextureWrap && (n.defines.USE_EMISSIVE_AROUND_UV = !0),
        n.emissiveMap && t.windowSpeed))) {
            const e = "updateEmissiveMap_" + n.emissiveMap.uuid;
            this._setTextureScrollAnimation(n.emissiveMap, t.windowSpeed, e, void 0, t.offset, t.keepSpeed)
        }
        if (t.envMapUrl) {
            var r = this.loadEnvMap(t.envMapUrl);
            n.envMap = r,
            n.envMapIntensity = t.envMapIntensity
        }
        if (void 0 !== t.specularFactor && (n.specularFactor = t.specularFactor),
        t.colorMapping) {
            let e = this.getGradientMap(t.colorMapping);
            n.map = e,
            n.color = new THREE.Color(1,1,1),
            n.opacity = 1
        }
        if (t.blending && (n.depthWrite = !1,
        n.blending = THREE.AdditiveBlending),
        void 0 !== t.quaternion && (n.baseQuaternion = t.quaternion),
        n.map && t.speed) {
            const e = "updatePolygonMap_" + n.map.uuid;
            this._setTextureScrollAnimation(n.map, t.speed, e, void 0, void 0, t.keepSpeed)
        }
        return n.needsUpdate = !0,
        n
    },
    _getRendererItem(t, e) {
        let n = JSON.parse(JSON.stringify(t));
        for (let r in n)
            Array.isArray(n[r]) && 2 === n[r].length && (n[r] = t[r][e]);
        return n
    },
    _getMaterialParam(t, e, n) {
        t[e] && Array.isArray(t[e]) && (t[e] = t[e][n])
    },
    _setTextureScrollAnimation(t, e, n, a=.02, i, o=!1) {
        const s = THING.App.current;
        e && Array.isArray(e) && 2 === e.length && (0 !== e[0] || 0 !== e[1] ? (n || (n = "updater_" + MapUtil.getUUID()),
        C.a.add(n, function() {
            return function(e, n) {
                let r = a;
                if (o && (r = s.deltaTime / 16.667 * a),
                t.material && "ShaderMaterial" === t.material.type) {
                    const a = t.uniformTag;
                    t.material.uniforms[a + "UvTransform"].value.translate(r * e, -r * n)
                } else
                    t.offset.x += r * e,
                    t.offset.y -= r * n
            }(e[0], e[1])
        }),
        t._updaterName = n) : (C.a.delete(n),
        i = THING.Utils.parseValue(i, [0, 0]),
        t.offset.x = i[0],
        t.offset.y = i[1]))
    },
    _processPolygonMaterialParam(t) {
        "cool" !== t.type && ("vector" === t.type ? (delete t.imageUrl,
        delete t.envMapUrl) : "image" === t.type && (delete t.envMapUrl,
        delete t.colorMapping),
        t.lights && (t.roughness = .5,
        t.metalness = .5)),
        ("image" === t.type || "cool" === t.type && t.imageUrl) && !1 === t.useColor && (t.color = [1, 1, 1])
    },
    createPolygonMaterial(t, e, n) {
        Array.isArray(t.imageUrl) && 1 === t.imageUrl.length && (t.imageUrl = [t.imageUrl[0], t.imageUrl[0]]),
        this._processPolygonMaterialParam(t),
        t.side = THREE.FrontSide;
        let r = JSON.parse(JSON.stringify(t));
        n && (t.quaternion = n,
        r.quaternion = n),
        Bt._getMaterialParam(t, "imageUrl", 0),
        Bt._getMaterialParam(t, "specularFactor", 0),
        "cool" === t.type && (Bt._createDefaultBuildingRenderer(t),
        Bt._getMaterialParam(t, "envMapIntensity", 0),
        Bt._getMaterialParam(t, "metalness", 0),
        Bt._getMaterialParam(t, "roughness", 0),
        t.color || (t.color = [.0549019686, .1176470742, .342352954]),
        delete t.colorMapping,
        t.lights = !0),
        t.useWindow = !1,
        delete t.colorMapping,
        t.depthWrite = 0 !== e,
        t.aoMap = !1;
        let a = Bt.createPolygonFillMaterial(t);
        return Bt._getMaterialParam(r, "imageUrl", 1),
        Bt._getMaterialParam(r, "specularFactor", 1),
        "cool" === r.type && (Bt._createDefaultBuildingRenderer(r),
        Bt._getMaterialParam(r, "envMapIntensity", 1),
        Bt._getMaterialParam(r, "metalness", 1),
        Bt._getMaterialParam(r, "roughness", 1),
        r.color || (r.color = [.0274509843, .0588235371, .171176477]),
        r.lights = !0),
        r.useAoMap && (r.aoMap = !0),
        r.colorMapping && (r.aoMap = !1),
        [a, Bt.createPolygonFillMaterial(r)]
    },
    createBuildingMaterial(t) {
        void 0 === t.side && (t.side = THREE.BackSide),
        Array.isArray(t.imageUrl) && 1 === t.imageUrl.length && (t.imageUrl = [t.imageUrl[0], t.imageUrl[0]]),
        "vector" === t.type ? (delete t.imageUrl,
        delete t.envMapUrl,
        t.lights && (t.roughness = 1),
        t.lights && (t.metalness = 0)) : "image" === t.type && (delete t.envMapUrl,
        delete t.colorMapping,
        t.lights && (t.roughness = .5),
        t.lights && (t.metalness = .5)),
        ("image" === t.type || "cool" === t.type && t.imageUrl) && !1 === t.useColor && (t.color = [1, 1, 1]),
        t.useAoMap && (t.aoMap = !0),
        t.colorMapping && (t.aoMap = !1);
        let e = JSON.parse(JSON.stringify(t));
        e.quaternion = t.quaternion,
        Bt._getMaterialParam(t, "imageUrl", 0),
        Bt._getMaterialParam(t, "specularFactor", 0),
        "vector" === t.type || "cool" === t.type && !t.imageUrl ? t.useAoMap && (t.aoMapIntensity = 1,
        t.aoType = "top") : t.aoMap = !1,
        "cool" === t.type && (Bt._createDefaultBuildingRenderer(t),
        Bt._getMaterialParam(t, "envMapIntensity", 0),
        Bt._getMaterialParam(t, "metalness", 0),
        Bt._getMaterialParam(t, "roughness", 0),
        t.color || (t.color = [.0549019686, .1176470742, .342352954]),
        delete t.windowTextureWrap,
        delete t.colorMapping,
        t.lights = !0),
        delete t.windowImageUrl,
        delete t.colorMapping,
        delete t.speed;
        let n = Bt.createPolygonFillMaterial(t);
        return Bt._getMaterialParam(e, "imageUrl", 1),
        Bt._getMaterialParam(e, "specularFactor", 1),
        "cool" === e.type && (Bt._createDefaultBuildingRenderer(e),
        Bt._getMaterialParam(e, "envMapIntensity", 1),
        Bt._getMaterialParam(e, "metalness", 1),
        Bt._getMaterialParam(e, "roughness", 1),
        e.color || (e.color = [.0274509843, .0588235371, .171176477]),
        e.lights = !0),
        [n, Bt.createPolygonFillMaterial(e)]
    },
    _createDefaultBuildingRenderer: t=>(void 0 === t.envMapIntensity && (t.envMapIntensity = 1),
    void 0 === t.windowColor && (t.windowColor = [1, 1, 1, 1]),
    void 0 === t.offset && (t.offset = [1, 1]),
    void 0 === t.repeat && (t.repeat = [1, 1]),
    void 0 === t.windowBrightness && (t.windowBrightness = 1),
    void 0 === t.threshold && (t.threshold = .8),
    void 0 === t.effect && (t.effect = !0),
    void 0 === t.metalness && (t.metalness = [.8, .2]),
    void 0 === t.roughness && (t.roughness = [0, .8]),
    t),
    _setPolygonOffset(t, e, n, r) {
        r = void 0 === r || r,
        e = THING.Utils.parseValue(e, 0),
        n = THING.Utils.parseValue(n, 0),
        t.polygonOffset = r,
        t.polygonOffsetFactor = e,
        t.polygonOffsetUnits = n
    },
    _addRefCount(t) {
        t && (void 0 === t.refCount && (t.refCount = 0),
        t.refCount++);
        for (let e = 0; e < t.getTextures().length; e++) {
            let n = t.getTextures()[e];
            n && (void 0 === n.refCount && (n.refCount = 0),
            n.refCount++)
        }
    },
    createPolygonFillMaterial(t) {
        let e = this._createPolygonFillMaterialName(t);
        var n = t3djs.materialManager.getMaterial(e)
            , r = !1;
        return n ? (t.imageUrl || t.colorMapping) && (!n.map || n.map && n.map._updaterName) && (r = !0) : r = !0,
        r && ((n = this._createFillMaterial(t)).name = e,
        t3djs.buffer.materialBuffer.add(e, n)),
        this._addRefCount(n),
        n
    }
}
    , Ut = Bt
    , MapUtil_1 = {
    app: null,
    map: null,
    earthEffectVisibleLevel: [0, 4],
    _loadCurrentConfigFromMultiLevelConfig(t, e) {
        for (let n in t)
            if (t[n].background) {
                let r = t[n].background.level;
                if (this.map.currentLevel < r[1] && this.map.currentLevel >= r[0]) {
                    let r = {
                        resourcePrefix: t[n].resourcePrefix,
                        background: t[n].background.value
                    };
                    e.call(this, r, !1)
                }
            } else {
                let r = t[n].level;
                this.map.currentLevel < r[1] && this.map.currentLevel >= r[0] && e.call(this, t[n].value, !1)
            }
    },
    _removeCloud() {
        this.app.query("__cloudImageLayer__")[0] && this.map.userLayers.remove(this.app.query("__cloudImageLayer__")[0])
    },
    _loadCloud(t, e) {
        let n = this.app.create({
            type: "ImageLayer",
            name: "__cloudImageLayer__",
            url: MapUtil._combinePrefixAndLocalUrl(e, t.url),
            useMercatorUV: !1,
            offsetHeight: 1e5,
            extent: {
                minX: -180,
                maxX: 180,
                minY: -90,
                maxY: 90
            },
            renderer: {
                opacity: 1,
                lights: !1,
                grayFilterEnable: !1
            }
        });
        return n.on("update", function() {
            n.rotateY(.01)
        }),
        this.map.addLayer(n),
        n
    },
    _getDirectionFromAngles(t, e, n) {
        let r = new THREE.Vector3(1,0,0);
        return r.applyAxisAngle(new THREE.Vector3(0,0,1), n * Math.PI / 180),
        r.applyAxisAngle(new THREE.Vector3(1,0,0), t * Math.PI / 180),
        r.applyAxisAngle(new THREE.Vector3(0,1,0), e * Math.PI / 180),
        r.toArray()
    },
    _loadOverlay(t) {
        let e = t.overlay;
        if (e.gradient && e.gradient.gradientColorOverlayEnable && (this.map.style.gradientColorOverlayEnable = !0,
        this.map.style.gradientColorBar = e.gradient.gradientColorBar,
        this.map.style.gradientColorPerBar = e.gradient.gradientColorPerBar,
        this.map.style.gradientMapDirection = e.gradient.gradientMapDirection),
        e.cloud && e.cloud.visible) {
            this._loadCloud(e.cloud, t.resourcePrefix).userData.__isOverlay__ = !0
        }
        if (e.vectorEarth)
            for (let n = 0; n < e.vectorEarth.length; n++)
                e.vectorEarth[n].__isOverlay__ = !0,
                "BigPointLayer" === e.vectorEarth[n].type && (e.vectorEarth[n].layerConfig.depthTest = !0),
                e.vectorEarth[n].renderOrder -= 100,
                t.layers.push(e.vectorEarth[n]);
        if (e.particle) {
            e.resourcePrefix = t.resourcePrefix;
            const n = MapUtil_1._loadParticle(e);
            n.userData.__isOverlay__ = !0,
            n.visibleLevel = this.earthEffectVisibleLevel
        }
        if (e.model) {
            e.resourcePrefix = t.resourcePrefix;
            const n = MapUtil_1._loadEarthModel(e);
            n.userData.__isOverlay__ = !0,
            n.visibleLevel = this.earthEffectVisibleLevel
        }
    },
    _loadEarthModel(t) {
        const e = this
            , n = this.app.create({
            type: "ThingLayer",
            name: "earthModelLayer"
        });
        return this.map.addLayer(n),
        t.model && t.model.forEach(function(a) {
            if (a.url) {
                const i = e.app.create({
                    type: "Thing",
                    url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, a.url),
                    position: [0, 0, 0],
                    scale: [a.size, a.size, a.size],
                    angles: [0, a.angle, 0],
                    visible: a.enable,
                    style: {
                        opacity: a.opacity,
                        color: a.useColor ? MapUtil.colorFormatNewToOld(a.color) : null
                    },
                    complete: function(t) {
                        t.object.node.getMaterials().map(t=>{
                            t.depthWrite = !1,
                            t.transparent = !0
                        }
                        ),
                        a.postRadialBlur2 && t.object.node.getMeshes().forEach(function(t) {
                            e.app.effectManager.setEffect(t, "radialBlur2")
                        }),
                        a.playAnimation && t.object.playAnimation({
                            name: a.animationName,
                            loopType: a.animationLoopType
                        })
                    }
                });
                n.add(i)
            }
        }),
        n
    },
    _matchLevelCondition: (t,e,n,r)=>t < r && t >= n && (e < n || e >= r && 22 !== e),
    _loadMapStyle(t, e) {
        let n = THING.App.current;
        if (e)
            1 === t.length ? MapUtil._loadMapStyle(t[0], !1) : (this._loadCurrentConfigFromMultiLevelConfig(t, MapUtil._loadMapStyle),
            n.on("MapLevelChange", e=>{
                for (let n in t) {
                    let a = t[n].level;
                    this._matchLevelCondition(e.current, e.previous, a[0], a[1]) && MapUtil._loadMapStyle(t[n].value, !1)
                }
            }
            , "mapStyleLevelChangeListener"));
        else
            for (var a in t)
                "atmosphere" !== a && null !== t[a] ? (this.map.style[a] = t[a],
                "fog" === a ? !1 === t[a] ? (this.map.style.fogDensity = 0,
                this.map.style.fogExpDensity = 0) : this.map.style.fogDensity = 1 : "fogExp" === a && !1 === t[a] && (t.fogExpDensity = 0,
                this.map.style.fogExpDensity = 0)) : this.map.atmosphere = t[a]
    },
    _loadLightConfig(t, e) {
        e ? 1 === t.length ? this._loadLightConfig(t[0], !1) : (this._loadCurrentConfigFromMultiLevelConfig(t, MapUtil._loadLightConfig),
        this.app.on("MapLevelChange", e=>{
            for (let n in t) {
                let a = t[n].level;
                this._matchLevelCondition(e.current, e.previous, a[0], a[1]) && MapUtil._loadLightConfig(t[n].value, !1)
            }
        }
        , "lightLevelChangeListener")) : (Array.isArray(t) && (t = t[0]),
        t.position || (t.position = [0, 0, 0]),
        t.distance ? (MapUtil.setLightGroup(t.position),
        t.SecondaryLights && Array.isArray(t.SecondaryLights) && (t.secondaryLight = t.SecondaryLights[0]),
        t.showHelper = !1,
        MapUtil.setLighting(t, t.distance),
        t.spotLights && Array.isArray(t.spotLights) && t.spotLights.forEach(function(t) {
            MapUtil.setSpotLight(t, t.name)
        })) : this.app.lighting = t)
    },
    _loadSkybox(t) {
        t.skyBox.endsWith(".jpg") || t.skyBox.endsWith(".png") || t.skyBox.endsWith(".jpeg") || t.skyBox.endsWith(".tga") ? this.app.skyBox = MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, t.skyBox) : this.app.skyBox = {
            posx: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, MapUtil._combinePrefixAndLocalUrl(t.skyBox, "/up.jpg")),
            negx: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, MapUtil._combinePrefixAndLocalUrl(t.skyBox, "/rt.jpg")),
            posy: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, MapUtil._combinePrefixAndLocalUrl(t.skyBox, "/lf.jpg")),
            negy: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, MapUtil._combinePrefixAndLocalUrl(t.skyBox, "/fr.jpg")),
            posz: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, MapUtil._combinePrefixAndLocalUrl(t.skyBox, "/dn.jpg")),
            negz: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, MapUtil._combinePrefixAndLocalUrl(t.skyBox, "/bk.jpg"))
        },
        this.app.on("EARTH_LOOP", function() {
            CMAP.Util.correctSkyBox()
        }, "correctSkyBox")
    },
    _loadPostEffectConfig(t, e) {
        if (e)
            1 === t.length ? MapUtil._loadPostEffectConfig(t[0], !1) : (this._loadCurrentConfigFromMultiLevelConfig(t, MapUtil._loadPostEffectConfig),
            this.app.on("MapLevelChange", e=>{
                for (let n in t) {
                    let a = t[n].level;
                    this._matchLevelCondition(e.current, e.previous, a[0], a[1]) && MapUtil._loadPostEffectConfig(t[n].value, !1)
                }
            }
            , "postEffectLevelChangeListener"));
        else {
            Array.isArray(t) && (t = t[0]),
            THING.App.current.postEffect = t;
            let e = this.app.rendererManager._mainRenderer;
            t.postEffect && (t.postEffect.SmallGlowBloom ? (e.getPass("smallGlow").$enable = t.postEffect.SmallGlowBloom.enable,
            e.getPass("smallGlow").strength = t.postEffect.SmallGlowBloom.strength,
            e.getPass("smallGlow").radius = t.postEffect.SmallGlowBloom.radius,
            e.getPass("smallGlow").threshold = t.postEffect.SmallGlowBloom.threshold) : e.getPass("smallGlow").$enable = !1,
            t.postEffect.MiddleGlowBloom ? (e.getPass("middleGlow").$enable = t.postEffect.MiddleGlowBloom.enable,
            e.getPass("middleGlow").strength = t.postEffect.MiddleGlowBloom.strength,
            e.getPass("middleGlow").radius = t.postEffect.MiddleGlowBloom.radius,
            e.getPass("middleGlow").threshold = t.postEffect.MiddleGlowBloom.threshold) : e.getPass("middleGlow").$enable = !1)
        }
    },
    loadVectorEarth(t) {
        let e = t.vectorEarth;
        e.config && (e.config.worldMeshStyle = e.config.worldMeshStyle || {},
        e.config.worldMeshStyle.visible = e.config.sphereVisible,
        e.config.loadConfig = e.config.loadConfig || {},
        e.config.loadConfig.lonlat = e.config.modelVisible);
        var n = THING.App.current.create({
            type: "VectorBaseLayer",
            id: "vectorBaseLayer",
            url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, e.url),
            style: e.config
        });
        this.map.baseLayers.add(n),
        !1 === e.config.allVisible && (n.visible = !1)
    },
    _cameraFly(t) {
        let e = t.cameraFlyTo;
        e && (e.lonlat || e.position) && (e.complete = function() {
            THING.App.current.trigger(THING.EventType.MapCameraReady)
        }
        ,
        THING.App.current.trigger("MapCameraStart", {
            config: e
        }),
        void 0 === e.angle || 0 === e.angle ? (e.directFly = !0,
        THING.App.current.camera.earthFlyTo(e)) : CMAP.getCurrentMap().rotate({
            angle: e.angle,
            time: e.rotateTime,
            complete: function() {
                THING.App.current.camera.earthFlyTo(e)
            }
        }))
    },
    _loadMapConfig(t) {
        t.resourcePrefix = THING.Utils.parseValue(t.resourcePrefix, ""),
        t.externalConfigUrl && MapUtil._queryHttpUrl({
            url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, t.externalConfigUrl),
            async: !1,
            complete: function(e) {
                let n;
                try {
                    n = JSON.parse(e)
                } catch (t) {
                    MapUtil.error("invalid externalConfig,please check")
                }
                if (n) {
                    if (n.cameraFlyTo && (t.cameraFlyTo = n.cameraFlyTo),
                    n.terrainUrl && (t.terrainUrl = n.terrainUrl),
                    n.tileUrl && Array.isArray(t.tileLayer) && (t.multiBaseMap ? t.tileLayer.forEach(t=>{
                        t.value.forEach((t,e)=>{
                            t.url = Array.isArray(n.tileUrl[e]) ? n.tileUrl[e][0] : n.tileUrl[e]
                        }
                        )
                    }
                    ) : t.tileLayer.forEach(t=>{
                        t.url = Array.isArray(n.tileUrl) ? n.tileUrl[0] : n.tileUrl
                    }
                    )),
                    n.layers && Array.isArray(n.layers))
                        for (let e = 0; e < n.layers.length; e++)
                            for (let r = 0; r < t.layers.length; r++)
                                t.layers[r].id !== n.layers[e].id || (t.layers[r].url = n.layers[e].url);
                    if (t.overlay && t.overlay.vectorEarth && Array.isArray(n.vectorEarthLayers) && n.vectorEarthLayers && Array.isArray(n.vectorEarthLayers))
                        for (let e = 0; e < n.vectorEarthLayers.length; e++)
                            for (let r = 0; r < t.overlay.vectorEarth.length; r++)
                                t.overlay.vectorEarth[r].id !== n.vectorEarthLayers[e].id || (t.overlay.vectorEarth[r].url = n.vectorEarthLayers[e].url);
                    if (n.scenes && Array.isArray(n.scenes))
                        for (let e = 0; e < n.scenes.length; e++)
                            for (let r = 0; r < t.scenes.length; r++)
                                t.scenes[r].id !== n.scenes[e].id || (t.scenes[r].url = n.scenes[e].url)
                }
            }
        }),
        this._removeIgnoredConfig(t, t.ignoreParams),
        this.map.mapConfig = t,
        t.isProxima && (this.map.attribution = "none");
        var e = THING.App.current;
        let n = t.map.style
            , a = this;
        this._loadMapStyle(n, t.multiEnviroment),
        t.background ? this._loadBackground(t, t.multiEnviroment) : t.skyBox && this._loadSkybox(t),
        this._loadTerrain(t),
        void 0 !== t.depthMode && (this.map.depthMode = t.depthMode);
        let i = "EARTH_COMPLETE";
        if (t.reload && (i = "ReloadMapConfig"),
        t.baseLayerUrls && 0 === t.baseLayerUrls.length)
            setTimeout(()=>{
                this.app.trigger(i)
            }
            );
        else {
            this._loadTileLayerConfig(t);
            for (let e = 0; e < t.tileLayer.length; e++)
                if (!1 === t.tileLayer[e].visible) {
                    setTimeout(()=>{
                        this.app.trigger(i)
                    }
                    );
                    break
                }
        }
        t.light && this._loadLightConfig(t.light, t.multiEnviroment),
        t.postEffect && this._loadPostEffectConfig(t.postEffect, t.multiEnviroment),
        t.showLayerEventName || (t.showLayerEventName = THING.EventType.MapCameraReady),
        t.vectorEarth && (this.loadVectorEarth(t),
        i = "VectorBaseLayerComplete",
        this.app.rendererManager.mainRenderer.dirty()),
        t.overlay && MapUtil_1._loadOverlay(t, !1),
        e.on(i, function() {
            t.isProxima || t.loadDataFirst || a._cameraFly(t),
            MapUtil_1._loadParticle(t),
            MapUtil_1._loadLayers(t),
            e.off(i)
        }),
        t.reload && THING.App.current.trigger("ReloadMapConfig")
    },
    _convertJSToCJS(t) {
        var e = ""
            , n = t.split("/**");
        e += "$.ajaxSetup({\n  async: false\n});\n",
        e += n[3].split("**/")[1];
        var r = n[2].split("style")[1].substring(1, n[2].split("style")[1].indexOf("}") + 1)
            , a = this._addQuoteToObject(r);
        for (var i in a)
            e += "CMAP.getCurrentMap().style." + i + "=" + a[i] + ";\n";
        var o = n[4].split("**/")[1].split("addLayer();");
        return 0 === THING.App.current.campuses.length && (e += o[0]),
        e += "THING.App.current.trigger(THING.EventType.MapCameraReady);\n  addLayer();\n THING.App.current.trigger(THING.EventType.LayersComplete,{layers:map.allLayers});\n ",
        e += "$.ajaxSetup({\n  async: true\n});",
        0 === THING.App.current.campuses.length && (e += o[1]),
        e = (e = (e = (e = (e = (e = (e = (e += n[5].split("**/")[1]).substring(0, e.lastIndexOf("});"))).replaceAll("map.baseLayers", "CMAP.getCurrentMap().baseLayers")).replaceAll("map.userLayers", "CMAP.getCurrentMap().userLayers")).replaceAll("map.allLayers", "CMAP.getCurrentMap().allLayers")).replaceAll("app.create", "THING.App.current.create")).replaceAll("app.camera", "THING.App.current.camera")).replaceAll("map.flyRotate", "CMAP.getCurrentMap().flyRotate")
    },
    _isUrlValue: (t,e)=>!!t.toLowerCase().contains("url") || !("string" != typeof e || !(e.startsWith("/image") || e.startsWith("/model") || e.startsWith("/geojson"))),
    _removeParticle() {
        this.app.query("[userData/__isParticleLayer__=1]")[0] && this.app.query("[userData/__isParticleLayer__=1]")[0].destroy()
    },
    _loadGeoDiffusion(t) {
        let e = this;
        if (t.geoDiffusion) {
            var n = this.app.create({
                type: "ThingLayer",
                name: "diffusionLayer",
                userData: {
                    __isDiffusionLayer__: !0
                }
            });
            this.map.addLayer(n),
            t.geoDiffusion.forEach(function(a) {
                let i = a.config
                    , o = [];
                if (i.toObject && Array.isArray(i.toObject) && i.toObject.length > 0 && (i.toObject.indexOf("polygon") > -1 && (o = (o = (o = o.concat(e.app.query(".FeatureLayer").query("[userData/__fromCityBuilder__=1]").query('["geometryType"="GeoWater"]||["geometryType"="GeoBuilding"]||["geometryType"="GeoPolygon"]').toArray())).concat(e.app.query(".BigBuildingLayer").query("[userData/__fromCityBuilder__=1]").toArray())).concat(e.app.query("[userData/__isBuildingModelLayer__=1]").toArray())),
                i.toObject.indexOf("model") > -1 && (o = o.concat(e.app.query(".Thing").query("[userData/__isGeoPoint__=1]").toArray())),
                i.toObject.indexOf("scene") > -1 && (o = o.concat(e.app.query(".Campus").query("[userData/__fromCityBuilder__=1]").toArray()))),
                i.url && (i.url = MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, i.url)),
                i.lerpType && 2 === i.lerpType.split(".").length && (i.lerpType = THING.LerpType[i.lerpType.split(".")[0]][i.lerpType.split(".")[1]]),
                "range" === i.posType) {
                    const t = e.app.create({
                        type: "GeoDiffusion",
                        diffusionType: i.diffusionType,
                        coordinates: i.coordinates,
                        radius: i.radius,
                        visible: i.visible,
                        renderer: i,
                        scanLayers: o,
                        lerpType: THING.LerpType.Linear.None,
                        offsetHeight: THING.Utils.parseValue(i.offsetHeight, 0),
                        renderOrder: -100
                    });
                    n.add(t)
                } else
                    MapUtil._queryHttpUrl({
                        url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, a.url),
                        async: !1,
                        complete: function(t) {
                            "string" == typeof t && (t = JSON.parse(t)),
                            t.features.forEach(t=>{
                                const r = e.app.create({
                                    type: "GeoDiffusion",
                                    diffusionType: i.diffusionType,
                                    coordinates: t.geometry.coordinates,
                                    radius: i.radius,
                                    visible: i.visible,
                                    renderer: i,
                                    scanLayers: o,
                                    renderOrder: -100
                                });
                                n.add(r)
                            }
                            )
                        }
                    })
            })
        }
    },
    _getParticleData(t, e) {
        for (let n in e)
            t[n]instanceof Array ? this._getParticleData(t[n][0], e[n][0]) : t[n]instanceof Object ? this._getParticleData(t[n], e[n]) : "" !== e[n] && (t[n] = e[n]);
        return t
    },
    _loadParticle(t) {
        let e = this;
        const n = this.app.create({
            type: "ThingLayer",
            name: "particleLayer",
            userData: {
                __isParticleLayer__: !0
            }
        });
        return this.map.addLayer(n),
        n.style.renderOrder = 1e3,
        t.particle && t.particle.forEach(function(a) {
            const i = MapUtil.getJsonObject(a.config);
            let o = !0
                , s = [0, 0, 0];
            if (i.coordinates && (s = CMAP.Util.convertLonlatToWorld(i.coordinates),
            o = !1),
            a.isNew)
                i.url && MapUtil._queryHttpUrl({
                    url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, i.url),
                    responseType: "json",
                    async: !0,
                    complete: function(a) {
                        const l = function e(n, a) {
                            for (let i in n)
                                n[i]instanceof Array ? e(n[i][0], a) : n[i]instanceof Object ? e(n[i], a) : "url" !== i || n[i].startsWith("http://") || n[i].startsWith("https://") || (n[i].startsWith("/image") ? n[i] = MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, n[i]) : n[i] = MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, "/model/particle/" + a + n[i]));
                            return n
                        }(e._getParticleData(MapUtil.getJsonObject(a), i), i.id)
                            , u = e.app.create({
                            type: "ParticleSystem",
                            data: l,
                            position: s,
                            complete: function(t) {
                                if (o) {
                                    t.object.style.renderOrder = 3e3;
                                    for (let e = 0; e < t.object.node.getMaterials().length; e++)
                                        t.object.groups[0].depthTest = !0
                                } else
                                    t.object.angles = CMAP.Util.getAnglesFromPosition(t.object.position)
                            }
                        });
                        n.add(u)
                    }
                });
            else {
                const a = e.app.create({
                    type: "ParticleSystem",
                    url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, i.url),
                    position: s,
                    complete: function(t) {
                        i.scale && (t.object.scale = i.scale,
                        t.object.angles = CMAP.Util.getAnglesFromLonlat(i.coordinates, i.angle),
                        t.object.setGroupAttribute("maxParticleCount", void 0 === i.maxDensity ? 1e4 : i.maxDensity),
                        t.object.setParticleAttribute("particleCount", void 0 === i.density ? 5e3 : i.density))
                    }
                });
                n.add(a)
            }
        }),
        n
    },
    _addPrifixToUrl(t, e) {
        let n = t.layerConfig;
        for (let t in n)
            if (this._isUrlValue(t, n[t])) {
                let a = n[t];
                Array.isArray(a) && a.length > 0 ? a[0].value ? (a.forEach(function(t) {
                    Array.isArray(t.value) ? t.value = [MapUtil._combinePrefixAndLocalUrl(e, t.value[0]), MapUtil._combinePrefixAndLocalUrl(e, t.value[1])] : t.value = MapUtil._combinePrefixAndLocalUrl(e, t.value)
                }),
                n[t] = a) : n[t] = [MapUtil._combinePrefixAndLocalUrl(e, a[0]), MapUtil._combinePrefixAndLocalUrl(e, a[1])] : Array.isArray(a) ? n[t] = [MapUtil._combinePrefixAndLocalUrl(e, a[0]), MapUtil._combinePrefixAndLocalUrl(e, a[1])] : n[t] = MapUtil._combinePrefixAndLocalUrl(e, a)
            }
        return n
    },
    _combinePrefixAndLocalUrl(t, e) {
        return !e || e.startsWith("http://") || e.startsWith("https://") ? e : (t = this._processPrefix(t),
        e.startsWith("/") || (e = "/" + e),
        t + e)
    },
    _processPrefix(t) {
        return t.endsWith("/") ? (t = t.substring(0, t.length - 1),
        this._processPrefix(t)) : t
    },
    _loadBackground(t, e) {
        if (e) {
            let e = t.background
                , n = {
                resourcePrefix: t.resourcePrefix
            };
            if (1 === e.length)
                n.background = e[0].value,
                MapUtil._loadBackground(n, !1);
            else {
                let a = [];
                for (let n in e) {
                    let r = {
                        resourcePrefix: t.resourcePrefix
                    };
                    r.background = e[n],
                    a.push(r)
                }
                MapUtil._loadCurrentConfigFromMultiLevelConfig(a, MapUtil._loadBackground),
                this.app.on("MapLevelChange", t=>{
                    for (let a in e) {
                        let i = e[a].level;
                        this._matchLevelCondition(t.current, t.previous, i[0], i[1]) && (n.background = e[a].value,
                        MapUtil._loadBackground(n, !1))
                    }
                }
                , "backgroundChangeListener")
            }
        } else
            t.background ? "skybox" === t.background.type ? (t.skyBox = t.background.value,
            this._loadSkybox(t)) : "image" === t.background.type ? this.app.background = this._combinePrefixAndLocalUrl(t.resourcePrefix, t.background.value) : "color" === t.background.type && (this.app.background = t.background.value) : this.app.background = [0, 0, 0]
    },
    _loadTileLayerConfig(t) {
        let e = !1;
        const n = this;
        if (0 === this.app.query(".TileLayer").length && (e = !0),
        t.multiBaseMap) {
            if (t.tileLayer.length > 0) {
                let r, a = t.tileLayer[0].value[0];
                if (a.style = THING.Utils.parseValue(a.style, {}),
                a.type = t.tileLayer[0].type,
                t.baseLayerUrls && t.baseLayerUrls.length === t.tileLayer.length)
                    for (let e = 0; e < t.baseLayerUrls.length; e++)
                        if (t.baseLayerUrls[e].length === t.tileLayer[e].value.length)
                            for (let n = 0; n < t.baseLayerUrls[e].length; n++)
                                t.tileLayer[e].value[n].url = t.baseLayerUrls[e][n];
                if (e)
                    a.style.gradientColorOverlayEnable = !1,
                    (r = this.app.create(a)).userData.__fromCityBuilder__ = !0,
                    this.map.addLayer(r);
                else {
                    r = this.app.query(".TileLayer")[0];
                    for (let e = 0; e < t.tileLayer.length; e++) {
                        let n = t.tileLayer[e];
                        this.map.currentLevel >= n.level[0] && this.map.currentLevel < n.level[1] && (r.url = n.value[0].url,
                        n.value[0].style.gradientColorOverlayEnable = !1,
                        n.value[0].style.night = this.map.style.night,
                        r._setStyle(n.value[0].style, !0),
                        r.maximumLevel = n.value[0].maximumLevel)
                    }
                }
                this.app.on("MapLevelChange", e=>{
                    for (let a in t.tileLayer) {
                        let i = t.tileLayer[a].level;
                        this._matchLevelCondition(e.current, e.previous, i[0], i[1]) && (r.url = t.tileLayer[a].value[0].url,
                        t.tileLayer[a].value[0].style.gradientColorOverlayEnable = !1,
                        t.tileLayer[a].value[0].style.night = n.map.style.night,
                        r._setStyle(t.tileLayer[a].value[0].style, !0),
                        r.maximumLevel = t.tileLayer[a].value[0].maximumLevel)
                    }
                }
                , "tileLevelChangeListener")
            }
        } else
            for (let n = 0; n < t.tileLayer.length; n++) {
                let r, a = t.tileLayer[n];
                a.style = THING.Utils.parseValue(a.style, {}),
                t.baseLayerUrls && t.baseLayerUrls.length === t.tileLayer.length && (a.url = t.baseLayerUrls[n]),
                a.style.night = this.map.style.night,
                a.style.gradientColorOverlayEnable = !1,
                e ? ((r = this.app.create(a)).userData.__fromCityBuilder__ = !0,
                this.map.addLayer(r)) : ((r = this.app.query(".TileLayer")[n]).url = a.url,
                r._setStyle(a.style, !0),
                r.maximumLevel = a.maximumLevel)
            }
    },
    _loadTerrainData(t) {
        THING.Utils.isNull(this.map.terrainLayer.url) && (this.map.terrainLayer.url = t.terrainUrl,
        this.app.on("parseTerrainMetadataFailure", ()=>{
            let e = "EARTH_COMPLETE";
            t.reload && (e = "ReloadMapConfig"),
            this.app.trigger(e)
        }
        )),
        THING.Utils.isNull(t.terrainExaggeration) || (this.map.terrainLayer.terrainExaggeration = t.terrainExaggeration),
        THING.Utils.isNull(t.depthMode) || (this.map.depthMode = t.depthMode)
    },
    _loadTerrain(t) {
        let e = this;
        t._terrainUrl && (t.terrainUrl = t._terrainUrl),
        t.terrainUrl && (this.map._earthInstance.tileEarth._surface ? this._loadTerrainData(t) : this.app.on("terrainReady", function() {
            e._loadTerrainData(t)
        }))
    },
    _updateLayer(t, e) {
        t.updateExtrude(e),
        t.updateOffset(e),
        t.updateRenderer(e)
    },
    _constructLayerConfig(t) {
        const e = MapUtil.deepCopy(t.layerConfig);
        return ["extrudeField", "extrudeFactor", "extrudeHeight", "offsetHeight", "offsetHeightField", "offsetHeightAdded", "groundHeightField", "groundHeightFactor", "heightArrayFactor", "heightArrayField"].forEach(n=>{
            e[n] = t[n]
        }
        ),
        e.heightArrayField = t.heightArrayField,
        e
    },
    _layerUpdateVisible(t, e, n, r, a) {
        t.visible = !1;
        for (let i = 0; i < e.length; i++) {
            let o = e[i];
            n < o[1] && n >= o[0] && (t.visible = !0),
            THING.Utils.isNull(r) || n < o[1] && n >= o[0] && (r < o[0] || r >= o[1]) && a.multiLayerConfig && a.multiLayerConfig.length > 1 && this._updateLayer(t, a.multiLayerConfig[i])
        }
    },
    loadLayerConfig(t, e, n) {
        if (e.multiLayerConfig)
            for (let t = 0; t < e.multiLayerConfig.length; t++)
                CMAP.Util._addPrifixToUrl({
                    layerConfig: e.multiLayerConfig[t]
                }, n);
        else
            CMAP.Util._addPrifixToUrl(e, n);
        "GeoHeatMap" === e.type && (e.geometryType = "GeoHeatMap");
        var a = MapUtil.getJsonObject(t);
        let i = e.modelList
            , o = e.layerConfig && e.layerConfig.polygonModel;
        if (i && i.length > 0 && !o && "BuildingModelLayer" !== e.type) {
            this._loadBuildingModel(e, i);
            var s = [];
            for (let t = 0; t < i.length; t++)
                if (i[t].pickedIndex) {
                    let e = i[t].pickedIndex.split("-");
                    s.push([e[0], e[1], JSON.parse(JSON.stringify(i[t]))])
                }
            if (s.length > 0) {
                s.sort((t,e)=>t[0] !== e[0] ? e[0] - t[0] : e[1] - t[1]);
                for (let t in s)
                    if (a.features[s[t][0]] && a.features[s[t][0]].geometry.coordinates && a.features[s[t][0]].geometry.coordinates[s[t][1]])
                        if (s[t][2].modelUrl)
                            a.features[s[t][0]].geometry.coordinates.splice([s[t][1]], 1);
                        else if (s[t][2].deleted)
                            a.features[s[t][0]].geometry.coordinates.splice([s[t][1]], 1);
                        else {
                            let e = a.features[s[t][0]].geometry.coordinates[s[t][1]];
                            a.features[s[t][0]].geometry.coordinates.splice([s[t][1]], 1),
                            a.features.push({
                                type: "Feature",
                                properties: JSON.parse(s[t][2].userData),
                                geometry: {
                                    coordinates: [e],
                                    type: "Polygon"
                                }
                            })
                        }
                a.features = a.features.filter(t=>t.geometry.coordinates.length > 0)
            }
        }
        return this._loadLayer(a, n, e, e.layerConfig)
    },
    _loadLayer(t, e, n, a) {
        let i, o = this;
        if ("BuildingModelLayer" === n.type) {
            (i = this.app.create({
                name: n.name,
                type: "ThingLayer",
                id: n.id,
                userData: {
                    __isBuildingModelLayer__: !0
                },
                visibleLevel: n.visibleLevel
            }))._scanConfig = n.scan;
            let u = Ut._createAllMaterial(a, "GeoBuilding");
            var s = 0
                , l = n.url.substr(0, n.url.lastIndexOf("/"));
            for (let c = 0; c < t.array.length; c++)
                for (let h = 0; h < t.array[c].length; h++) {
                    this.app.renderOptions = {
                        fpsLimit: 1
                    };
                    let d = this.app.create({
                        type: "BaseObject"
                    });
                    if (t.position) {
                        let e = CMAP.Util.getAnglesFromPosition(t.position[c]);
                        d.position = t.position[c],
                        d.angles = e
                    }
                    let f = this.app.create({
                        type: "Thing",
                        url: MapUtil._combinePrefixAndLocalUrl(e, l + "/" + t.array[c][h] + ".glb"),
                        complete: function(e) {
                            let n = e.object.node.getMeshes();
                            !function(l) {
                                for (let e = 0; e < n.length; e++) {
                                    const r = n[e];
                                    if (e % 2 == 0 ? r.material = u[l][0] : (r.material = u[l][1],
                                    r.material.defines && r.material.defines.USE_EMISSIVE_AROUND_UV && (r.geometry.attributes.uv3 ? r.geometry.addAttribute("uv8", new THREE.BufferAttribute(r.geometry.attributes.uv3.array,2)) : r.geometry.addAttribute("uv8", new THREE.BufferAttribute(r.geometry.attributes.uv.array,2)))),
                                    t.format && t.format >= 2 && (r.material.side = THREE.FrontSide,
                                    r.material.needsUpdate = !0),
                                    a.effect) {
                                        let t = 1;
                                        void 0 !== a.glowStrength && (t = a.glowStrength),
                                        o.app.effectManager.setEffect(r, "glow", t)
                                    }
                                    a.postRadialBlur && o.app.effectManager.setEffect(r, "radialBlur", !0),
                                    a.postRadialBlur2 && o.app.effectManager.setEffect(r, "radialBlur2", !0)
                                }
                                if (++s === t.totalCount) {
                                    delete i.userData.__isBuildingModelLayer__,
                                    o.app.trigger(THING.EventType.LayerComplete, {
                                        object: i,
                                        message: "glb layer all added"
                                    }),
                                    i.userData.__isBuildingModelLayer__ = !0,
                                    o.app.renderOptions = {
                                        fpsLimit: !1
                                    };
                                    let t = e.object.parent.parent
                                        , n = [];
                                    for (let e = 0; e < t.children.length; e++) {
                                        let r = t.children[e].getLocalBoundingBox(!1)
                                            , a = t.children[e].selfToWorld(r.min)
                                            , i = t.children[e].selfToWorld(r.max)
                                            , o = CMAP.Util.convertWorldToLonlat(a)
                                            , s = CMAP.Util.convertWorldToLonlat(i);
                                        n.push(o),
                                        n.push(s)
                                    }
                                    let a = Math.min.apply(Math, n.map(function(t) {
                                        return t[0]
                                    }))
                                        , s = Math.max.apply(Math, n.map(function(t) {
                                        return t[0]
                                    }))
                                        , l = Math.min.apply(Math, n.map(function(t) {
                                        return t[1]
                                    }))
                                        , u = Math.max.apply(Math, n.map(function(t) {
                                        return t[1]
                                    }));
                                    t.extent = {
                                        minX: a,
                                        minY: l,
                                        maxX: s,
                                        maxY: u
                                    },
                                    t._scanConfig && (MapUtil._handleScanData(t._scanConfig, t, t._scanConfig.scanStyle.toLowerCase()),
                                    "v1" === t._scanConfig.scanStyle.toLowerCase() ? t.startScanning(t._scanConfig) : "v2" === t._scanConfig.scanStyle.toLowerCase() && t.startInitialScanning(t._scanConfig))
                                }
                            }(c)
                        }
                    });
                    d.add(f),
                    n.offsetHeight && d.translateY(n.offsetHeight),
                    i.add(d)
                }
        } else {
            if ("VectorTileLayer" === n.type)
                return (i = this.app.create({
                    type: "VectorTileLayer",
                    id: n.id,
                    tileUrl: n.tileUrl,
                    tileExtendNum: n.tileExtendNum,
                    maxTileFactor: n.maxTileFactor,
                    resourcePrefix: n.resourcePrefix || e,
                    vectorLayers: n.vectorLayers,
                    visible: n.enable,
                    name: n.name
                })).userData.__fromCityBuilder__ = !0,
                this.map.addLayer(i),
                i;
            {
                THING.Utils.isNull(n.offsetHeight) && "无" === n.offsetHeightField && (n.offsetHeightField = null,
                THING.Utils.isNull(n.groundHeightField) && (n.offsetHeight = THING.Utils.parseValue(n.offsetHeightAdded),
                n.offsetHeightAdded = null));
                let o = {
                    name: n.name,
                    type: n.type,
                    id: n.id,
                    dataSource: t,
                    renderer: a,
                    geometryType: n.geometryType,
                    infoWindow: n.infoWindow,
                    sync: n.sync,
                    pivot: n.pivot,
                    visibleLevel: n.visibleLevel,
                    azimuth: n.azimuth,
                    gridSize: n.gridSize,
                    shapeSize: n.shapeSize,
                    vectorType: n.vectorType,
                    valueField: n.valueField,
                    pickWithGeometryID: !0
                };
                ["extrudeField", "extrudeFactor", "extrudeHeight", "offsetHeight", "offsetHeightField", "offsetHeightAdded", "groundHeightField", "groundHeightFactor", "heightArrayFactor", "heightArrayField"].forEach(t=>{
                    o[t] = n[t]
                }
                ),
                "GeoPolygon" === n.geometryType ? 0 === n.layerConfig.outlineWidth && (o.useOutline = !1) : "GeoBoundary" === n.geometryType && (n.layerConfig.wallImage && (n.layerConfig.imageUrl = n.layerConfig.wallImage,
                delete n.layerConfig.wallImage),
                n.layerConfig.alphaImage && (n.layerConfig.alphaImageUrl = n.layerConfig.alphaImage,
                delete n.layerConfig.alphaImage),
                n.layerConfig.scrollSpeed && (n.layerConfig.speed = n.layerConfig.scrollSpeed,
                delete n.layerConfig.scrollSpeed)),
                n.label && !1 !== n.label.visible && (n.label.imageUrl && (n.label.imageUrl = MapUtil._combinePrefixAndLocalUrl(e, n.label.imageUrl)),
                o.label = n.label),
                i = this.app.create(o)
            }
        }
        if (i.visible = n.enable,
        i.userData.__labelId__ = n.labelId,
        i.userData.__fromCityBuilder__ = !0,
        this.map.addLayer(i),
        i.renderOrder = n.renderOrder,
        n.enable && (n.level || n.multiLayerConfig)) {
            let t = [];
            if (n.multiLayerConfig)
                for (let e = 0; e < n.multiLayerConfig.length; e++)
                    t.push(n.multiLayerConfig[e].level);
            else
                t.push(i.level);
            this._layerUpdateVisible(i, t, this.map.currentLevel, void 0, n),
            this._addUpdaterOnLayer(i, t, n)
        }
        return this._loadLayerExtra(n, i),
        n.__isOverlay__ && (i.userData.__isOverlay__ = !0),
        i
    },
    _loadLayerExtra(t, e) {
        t.layerConfig && t.layerConfig.polygonModel && this.changePolygonToModel(t),
        t.scan && (delete t.scan.map,
        void 0 === t.scan.blending && (t.scan.blending = !1),
        t.scan.resourcePrefix = t.resourcePrefix,
        "FeatureLayer" === e.type || "BigBuildingLayer" === e.type && !1 === t.sync ? (MapUtil._handleScanData(t.scan, e, t.scan.scanStyle.toLowerCase()),
        "v1" === t.scan.scanStyle.toLowerCase() ? e.startScanning(t.scan) : "v2" === t.scan.scanStyle.toLowerCase() && e.startInitialScanning(t.scan)) : e._scanConfig = t.scan),
        t.layerConfig && t.layerConfig.reflectedPanoramaAngle && ("FeatureLayer" === e.type ? e.node.getMaterials().forEach(function(e) {
            e.baseQuaternion = CMAP.Util.anglesToQuaternion(t.layerConfig.reflectedPanoramaAngle)
        }) : e._envMapConfig = t.layerConfig.reflectedPanoramaAngle)
    },
    _loadBuildingModel(t, e) {
        let n = this
            , a = this.app.create({
            name: "modelLayer_" + t.name,
            type: "ThingLayer"
        });
        this.map.addLayer(a),
        e.forEach(function(e) {
            if (e.modelUrl && e.modelScale) {
                let i = JSON.parse(e.userData)
                    , o = e.coordinates;
                (o = o.split(","))[0] = o[0] - 0,
                o[1] = o[1] - 0;
                let s = 0;
                3 === o.length && (s = o[2] - 0);
                let l = e.modelScale;
                (l = l.split(","))[0] = l[0] - 0,
                l[1] = l[1] - 0,
                l[2] = l[2] - 0;
                let u = n.app.create({
                    type: "GeoPoint",
                    userData: i,
                    coordinates: o,
                    scale: l,
                    azimuth: e.azimuth - 0,
                    offsetHeight: s,
                    renderer: {
                        type: "model",
                        url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, e.modelUrl)
                    }
                });
                i.name && (u.name = i.name),
                i.id && (u.id = i.id),
                a.add(u)
            }
        }),
        a.renderOrder = t.renderOrder
    },
    _changePolygonToModel(t) {
        let e = this.app.create({
            name: "modelBuildingLayer",
            type: "ThingLayer",
            id: t.id + "_PolygonModelLayer"
        });
        this.map.addLayer(e);
        let n = THING.App.current.query("#" + t.id)[0];
        n.visible = !1;
        let a = t.layerConfig;
        if ("FeatureCollection" === n.dataSource.type) {
            let t = [];
            n.dataSource.features.forEach(function(e, n) {
                a.model.forEach(function(a) {
                    MapUtil.isObjectMeetCondition(e.properties, a.condition) && t.push({
                        index: n,
                        item: e,
                        model: a.value
                    })
                })
            });
            let i = 0;
            t.forEach(function(t) {
                let n = t.item
                    , r = t.model.length;
                n.geometry.coordinates.forEach(function(o, s) {
                    let l = o;
                    "MultiPolygon" === n.geometry.type && (l = o[0]);
                    let u, c = t.index + "-" + s;
                    a.singleModel && (u = a.singleModel.find(function(t) {
                        if (t.id === c)
                            return !0
                    }));
                    let h = [a.size, a.size, a.size]
                        , d = a.changeOpt
                        , f = t.model[i][1]
                        , p = l
                        , m = 180
                        , g = 0
                        , v = CMAP.Util.getCenterCoordinates(p);
                    0 === r || i === r - 1 ? i = 0 : i++,
                    u && (h = u.scale,
                    d = !1,
                    f = u.modelUrl,
                    u.coordinates && (v = u.coordinates),
                    void 0 !== u.azimuth && (m = u.azimuth),
                    void 0 !== u.offsetHeight && (g = u.offsetHeight));
                    let y = {
                        type: "GeoBuilding",
                        eId: c,
                        visible: !1,
                        lonlat: v,
                        coordinates: p,
                        eUserData: n.properties,
                        size: h,
                        changeOpt: d,
                        azimuth: m,
                        offsetHeight: g
                    };
                    this._alternateBuilding(y, e, f)
                })
            })
        }
    },
    _modelToAuto(t, e, n) {
        let r = []
            , a = [];
        for (let t = 0; t < e.length; t++)
            r.push(e[t][0]),
            a.push(e[t][1]);
        let i = CMAP.Util.getPolygonExtent(e)
            , o = i.minX
            , s = i.maxX
            , l = i.minY
            , u = i.maxY
            , c = []
            , h = []
            , d = []
            , f = [];
        e.forEach((t,e)=>{
            t[0] === o && c.push(t),
            t[0] === s && h.push(t),
            t[1] === l && d.push(t),
            t[1] === u && f.push(t)
        }
        ),
        c.sort(function(t, e) {
            return t[1] - e[1]
        });
        let p = c[0];
        h.sort(function(t, e) {
            return e[1] - t[1]
        });
        let m = h[0];
        d.sort(function(t, e) {
            return e[0] - t[0]
        });
        let g = d[0];
        f.sort(function(t, e) {
            return t[0] - e[0]
        });
        let v = f[0]
            , y = CMAP.Util.getLineLength([v, p])
            , _ = CMAP.Util.getLineLength([g, p]);
        y *= 1.3,
        _ *= 1.7;
        let x = CMAP.Util.getAzimuth(g, p) - 360;
        0 !== y && 0 !== _ || (y = CMAP.Util.getLineLength([m, p]),
        _ = CMAP.Util.getLineLength([v, g]),
        x = 0),
        x = Number(x.toFixed(2)),
        isNaN(x) && (x = 0),
        t || (t = 3);
        var b = n.size
            , w = [y / b[0], t / b[2], _ / b[1]];
        n.scale = w.map(t=>1 * t),
        n.azimuth = x
    },
    _alternateBuilding(t, e, n) {
        let r = this;
        t.size && !t.changeOpt || (t.size = [1, 1, 1]);
        var a = this.app.create({
            type: "GeoPoint",
            id: t.eId,
            coordinates: t.lonlat,
            azimuth: t.azimuth,
            scale: t.size,
            visible: !1,
            renderer: {
                size: 1,
                type: "model",
                url: n
            },
            userData: t.eUserData,
            complete: function() {
                t.changeOpt && r._modelToAuto(t.eUserData.height, t.coordinates, this),
                this.visible = !0
            }
        });
        a.pickedLonLat = t.lonlat,
        e.add(a)
    },
    _reConstructLayer(t) {
        let e = {}
            , n = {};
        for (let r = t.length - 1; r >= 0; r--)
            if (t[r].parentCode) {
                let a = t[r].layerConfig;
                ["level", "extrudeField", "extrudeFactor", "extrudeHeight", "offsetHeight", "offsetHeightField", "offsetHeightAdded", "groundHeightfield", "groundHeightFactor", "heightArrayFactor", "heightArrayField"].forEach(e=>{
                    a[e] = t[r][e]
                }
                );
                let i = t[r].parentCode + "_" + t[r].geometryType;
                "GeoPoint" !== t[r].geometryType && "FeatureLayer" === t[r].type || (i += "_" + r),
                i in e ? t.forEach(function(e, n, a) {
                    e.id === t[r].id && a.splice(n, 1)
                }) : (e[i] = [],
                n[i] = t[r]),
                e[i].push(a),
                n[i].multiLayerConfig = e[i]
            }
        for (let e = 0; e < t.length; e++)
            if (t[e].multiLayerConfig && t[e].multiLayerConfig.length > 0)
                for (let n = 0; n < t[e].multiLayerConfig.length; n++)
                    if (this.map.currentLevel >= t[e].multiLayerConfig[n].level[0] && this.map.currentLevel < t[e].multiLayerConfig[n].level[1]) {
                        t[e].layerConfig = t[e].multiLayerConfig[n],
                        ["level", "extrudeField", "extrudeFactor", "extrudeHeight", "offsetHeight", "offsetHeightField", "offsetHeightAdded", "groundHeightfield", "groundHeightFactor", "heightArrayFactor", "heightArrayField"].forEach(n=>{
                            t[e][n] = t[e].layerConfig[n]
                        }
                        );
                        break
                    }
    },
    _loadLayers(t) {
        let e = THING.Utils.parseValue(t.layers, [])
            , n = THING.Utils.parseValue(t.scenes, [])
            , a = 0
            , i = 0
            , o = t.isProxima
            , s = this
            , l = !1;
        function u(t) {
            THING.Utils.error("layer or geoCampus create error"),
            a++,
            h(),
            t && THING.Utils.error(t),
            c()
        }
        function c() {
            e.length + n.length === 0 ? s.app.trigger("MapCreateProgress", {
                progress: 1
            }) : s.app.trigger("MapCreateProgress", {
                progress: Math.floor(a / (e.length + n.length) * 100) / 100
            }),
            setTimeout(()=>{
                a !== e.length + n.length || l || (MapUtil_1._loadGeoDiffusion(t),
                s.app.trigger(THING.EventType.LayersComplete, {
                    layers: s.map.allLayers,
                    object: s.map
                }),
                s.app.off("MapCreateProgress"),
                s.app.rendererManager._mainRenderer.dirty(),
                l = !0)
            }
            , 0)
        }
        function h() {
            (o || t.loadDataFirst) && (o && !t.loadDataFirst ? a === i && (s._cameraFly(t),
            i = -1) : s.app.on(THING.EventType.LayersComplete, function(e) {
                s._cameraFly(t)
            }, "maploader"))
        }
        function d(e, n) {
            t.cameraFlyTo && 0 === t.cameraFlyTo.time ? e.url ? MapUtil._queryHttpUrl({
                url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, e.url),
                complete: n,
                async: t.ajaxAsync,
                error: u
            }) : n() : s.app.on(t.showLayerEventName, function() {
                f(e.url, n)
            })
        }
        function f(e, n) {
            MapUtil._queryHttpUrl({
                url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, e),
                complete: n,
                error: u,
                async: t.ajaxAsync
            })
        }
        this._reConstructLayer(e);
        let p = e.map(t=>t.id);
        if (this.app.on(THING.EventType.LayerComplete, function(t) {
            if (p.indexOf(t.object.id) >= 0 && (t.object.userData && !t.object.userData.__isBuildingModelLayer__ && (a++,
            h()),
            c(),
            "BigBuildingLayer" === t.object.type)) {
                let e = t.object;
                e._scanConfig && (MapUtil._handleScanData(e._scanConfig, e, e._scanConfig.scanStyle.toLowerCase()),
                "v1" === e._scanConfig.scanStyle.toLowerCase() ? e.startScanning(e._scanConfig) : "v2" === e._scanConfig.scanStyle.toLowerCase() && e.startInitialScanning(e._scanConfig)),
                e._envMapConfig && e.node.getMaterials().forEach(function(t) {
                    t.baseQuaternion = CMAP.Util.anglesToQuaternion(e._envMapConfig)
                })
            }
        }),
        e.length > 0) {
            for (let t = 0; t < e.length; t++)
                "BigBuildingLayer" !== e[t].type && "BuildingModelLayer" !== e[t].type && i++;
            h();
            for (let n = 0; n < e.length; n++) {
                let r = e[n];
                r.resourcePrefix = t.resourcePrefix;
                let a = function(n) {
                    s.app.trigger("layerDataDownloadComplete", {
                        object: r,
                        totalLayers: e
                    });
                    try {
                        s.loadLayerConfig(n, r, t.resourcePrefix)
                    } catch (t) {
                        u(t)
                    }
                };
                o ? t.loadDataFirst ? f(r.url, a) : "BigBuildingLayer" !== r.type && "BuildingModelLayer" !== r.type && "VectorTileLayer" !== r.type ? f(r.url, a) : d(r, a) : t.loadDataFirst ? f(r.url, a) : d(r, a)
            }
        } else
            h(),
            c();
        if (n.length > 0) {
            var m = function() {
                let e = s.app.create({
                    type: "ThingLayer",
                    name: "scnenLayer",
                    userData: {
                        __isSceneLayer__: !0
                    }
                });
                s.map.addLayer(e);
                for (let i in n) {
                    let o = n[i];
                    o.type = "GeoCampus",
                    o.userData = {
                        __fromCityBuilder__: !0,
                        labelId: o.labelId
                    },
                    o.flyToScene = !1,
                    o.coordinates = o.lonlat,
                    o.offsetHeight = o.height || o.offsetHeight,
                    o.flyWhenLevelChange = !t.changeCampusLevel,
                    o.url && (o.url = MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, o.url)),
                    o.strategy ? o.complete = (e=>{
                        let n = e.object;
                        try {
                            t.changeCampusLevel ? s.app.level.change(n) : t.changeMapLevel && s.app.level.change(s.app.uEarth),
                            s.app.level.options.autoChangeBackground = !1,
                            s._applySceneTemplate(o, t.resourcePrefix, n)
                        } catch (t) {
                            THING.Utils.error(t)
                        } finally {
                            a++,
                            c()
                        }
                    }
                    ) : o.complete = function(e) {
                        let n = e.object;
                        try {
                            t.changeCampusLevel ? s.app.level.change(e.object) : t.changeMapLevel && s.app.level.change(s.app.uEarth),
                            s.app.level.options.autoChangeBackground = !1,
                            s._addGeoCampusEventListener(n.id, null)
                        } catch (t) {
                            THING.Utils.error(t)
                        } finally {
                            a++,
                            c()
                        }
                    }
                    ,
                    o.visible = o.enable;
                    let l = s.app.create(o);
                    e.add(l)
                }
            };
            t.cameraFlyTo && 0 === t.cameraFlyTo.time ? m() : s.app.on(t.showLayerEventName, function() {
                m()
            })
        }
    },
    loadLayerDataByConfig(t, e, n) {
        const r = [];
        this._reConstructLayer(e);
        for (let a = 0; a < e.length; a++)
            r.push(this.loadLayerConfig(t, e[a], n));
        return r
    },
    _updateLayerVisibleLevel(t, e) {
        e.visibleLevel ? t.visibleLevel = e.visibleLevel : t.visibleLevel = [0, 22]
    },
    _needsReCreateLayer: (t,e)=>"GeoPoint" === t.geometryType || t.geometryType !== e.geometryType || "GeoLine" === t.geometryType && (t.renderer.lineType !== e.layerConfig.lineType || t.renderer.width !== e.layerConfig.width || THING.Utils.parseValue(t.offsetHeight, 0) !== THING.Utils.parseValue(e.offsetHeight, 0) || t.offsetHeightField !== e.offsetHeightField || t.groundHeightField !== e.groundHeightField || t.groundHeightactor !== e.groundHeightactor || THING.Utils.parseValue(t.offsetHeightAdded, 0) !== THING.Utils.parseValue(e.offsetHeightAdded, 0)) || "GeoBoundary" === t.geometryType && (THING.Utils.parseValue(t.offsetHeight, 0) !== THING.Utils.parseValue(e.offsetHeight, 0) || t.offsetHeightField !== e.offsetHeightField || t.groundHeightField !== e.groundHeightField || t.groundHeightactor !== e.groundHeightactor || THING.Utils.parseValue(t.offsetHeightAdded, 0) !== THING.Utils.parseValue(e.offsetHeightAdded, 0)) || "GeoPolygon" === t.geometryType && (THING.Utils.parseValue(t.offsetHeight, 0) !== THING.Utils.parseValue(e.offsetHeight, 0) || t.offsetHeightField !== e.offsetHeightField || THING.Utils.parseValue(t.offsetHeightAdded, 0) !== THING.Utils.parseValue(e.offsetHeightAdded, 0) || THING.Utils.parseValue(t.extrudeHeight, 0) !== THING.Utils.parseValue(e.extrudeHeight, 0) || t.extrudeField !== e.extrudeField || THING.Utils.parseValue(t.extrudeFactor, 1) !== e.extrudeFactor),
    applyLayerConfig(t, e, n, a=!0) {
        let i = MapUtil.deepCopy(e);
        if (a) {
            this._reConstructMapLayers();
            for (let t = 0; t < i.length; t++)
                CMAP.Util._addPrifixToUrl(i[t], n);
            this._reConstructLayer(i),
            t.userData.__isCurrentProject__ = !0
        }
        Array.isArray(i) || (i = [i]);
        for (let e = 0; e < i.length; e++) {
            const a = i[e];
            if (this._needsReCreateLayer(t, a)) {
                if (t.userData.__isCurrentProject__ && this.map.userLayers.remove(t),
                "BuildingModelLayer" !== a.type)
                    if (a.multiLayerConfig) {
                        this._loadLayer(t.dataSource, n, a, a.layerConfig).visible = this.isInLevel(a.level)
                    } else
                        this._loadLayer(t.dataSource, n, a, a.layerConfig)
            } else if (t.type.startsWith("Big"))
                if (a.multiLayerConfig) {
                    if (t.userData.__isCurrentProject__)
                        if (this.isInLevel(a.level)) {
                            t.setRenderer(a.layerConfig),
                            this._updateLayerVisibleLevel(t, a);
                            let e = [];
                            for (let t = 0; t < a.multiLayerConfig.length; t++)
                                e.push(a.multiLayerConfig[t].level);
                            this._addUpdaterOnLayer(t, e, a)
                        } else
                            this._loadLayer(t.dataSource, n, a, a.layerConfig)
                } else
                    t.setRenderer(a.layerConfig),
                    this._updateLayerVisibleLevel(t, a),
                    t.visible = a.enable;
            else if (a.multiLayerConfig) {
                for (let e = 0; e < a.multiLayerConfig.length; e++)
                    this.isInLevel(a.multiLayerConfig[e].level) && (this._updateLayer(t, a.multiLayerConfig[e]),
                    a.visibleLevel ? t.visibleLevel = a.visibleLevel : t.visibleLevel = [0, 22]);
                let e = [];
                for (let t = 0; t < a.multiLayerConfig.length; t++)
                    e.push(a.multiLayerConfig[t].level);
                this._addUpdaterOnLayer(t, e, a)
            } else {
                const e = this._constructLayerConfig(a);
                this._updateLayer(t, e),
                this._updateLayerVisibleLevel(t, a),
                t.visible = a.enable
            }
            "GeoBuilding" === t.geometryType && (t.destroyScanning(),
            a.scan ? (void 0 === a.scan.blending && (a.scan.blending = !1),
            a.scan.resourcePrefix = n,
            "FeatureLayer" === a.type || "BigBuildingLayer" === a.type && !1 === a.sync ? (MapUtil._handleScanData(a.scan, t, a.scan.scanStyle.toLowerCase()),
            "v1" === a.scan.scanStyle.toLowerCase() ? t.startScanning(a.scan) : "v2" === a.scan.scanStyle.toLowerCase() && t.startInitialScanning(a.scan)) : t._scanConfig = a.scan) : t._scanConfig = null)
        }
    },
    applyTemplate(t, e) {
        let n = this;
        MapUtil._queryHttpUrl({
            url: t,
            async: THING.Utils.parseValue(e.ajaxAsync, !0),
            complete: function(t) {
                let a = MapUtil._parseMapConfig(t);
                a.success && 1 === a.success && ((a = a.data).resourcePrefix = THING.Utils.parseValue(e.resourcePrefix, ""),
                n.applyTemplateByConfig(a, e))
            },
            error: function() {
                THING.Utils.error("template url not found")
            }
        })
    },
    _removeVectorEarth() {
        for (let t = this.map.baseLayers.length - 1; t >= 0; t--)
            "VectorBaseLayer" === this.map.baseLayers[t].type && this.map.baseLayers.remove(this.map.baseLayers[t])
    },
    _removeTemplateConfig() {
        this._removeVectorEarth(),
        CMAP.Util._removeParticle(),
        this._removeOverLay(),
        this.app.off("MapLevelChange", null, "tileLevelChangeListener"),
        this.app.off("MapLevelChange", null, "mapStyleLevelChangeListener"),
        this.app.off("MapLevelChange", null, "lightLevelChangeListener"),
        this.app.off("MapLevelChange", null, "postEffectLevelChangeListener"),
        this.app.off("MapLevelChange", null, "backgroundChangeListener")
    },
    _removeOverLay() {
        this.map.style.gradientColorOverlayEnable = !1;
        for (let t = this.map.userLayers.length - 1; t >= 0; t--)
            this.map.userLayers[t].userData.__isOverlay__ && this.map.userLayers.remove(this.map.userLayers[t])
    },
    _removeIgnoredConfig(t, e) {
        if (Array.isArray(e))
            for (let n = 0; n < e.length; n++)
                t.hasOwnProperty(e[n]) && delete t[e[n]]
    },
    applyTemplateByConfig(t, e) {
        this._removeIgnoredConfig(t, e.ignoreParams),
        this.map.mapConfig = t,
        this._removeTemplateConfig(),
        t.resourcePrefix = THING.Utils.parseValue(e.resourcePrefix, ""),
        t.map.style && this._loadMapStyle(t.map.style, t.multiEnviroment),
        t.light && this._loadLightConfig(t.light, t.multiEnviroment),
        t.postEffect && this._loadPostEffectConfig(t.postEffect, t.multiEnviroment),
        t.background && this._loadBackground(t, t.multiEnviroment),
        (t.particle || t.newParticle) && CMAP.Util._loadParticle(t),
        t.vectorEarth && CMAP.Util.loadVectorEarth(t),
        t.overlay && this._loadOverlay(t),
        t.baseLayerUrls = void 0 === e.baseLayerUrls ? [] : e.baseLayerUrls,
        this._loadTileLayerConfig(t),
        this._loadLayersByTemplate(t, e.removeUnmatched),
        this._applyScenesTemplate(t, e.removeUnmatched)
    },
    isInLevel(t) {
        return this.map.currentLevel < t[1] && this.map.currentLevel >= t[0]
    },
    _addUpdaterOnLayer(t, e, n) {
        t.userData.parentCode = n.parentCode;
        let r = this;
        this.app.on("MapLevelChange", function(a) {
            r._layerUpdateVisible(t, e, a.current, a.previous, n)
        }, "layerLevelChange_" + t.id)
    },
    _reConstructMapLayers() {
        for (let t = this.map.userLayers.length - 1; t >= 0; t--)
            if (this.map.userLayers[t].userData.__isCurrentProject__ = !0,
            void 0 !== this.map.userLayers[t].userData.parentCode) {
                this.map.userLayers[t].multiLayerConfig && (this.map.userLayers[t].multiLayerConfig = void 0),
                this.app.off("MapLevelChange", null, "layerLevelChange_" + this.map.userLayers[t].id);
                for (let e = 0; e < this.map.userLayers.length; e++)
                    if (t !== e && this.map.userLayers[t].userData.parentCode === this.map.userLayers[e].userData.parentCode) {
                        this.map.userLayers[t].userData.parentCode = void 0,
                        this.map.userLayers.remove(this.map.userLayers[t]);
                        break
                    }
            }
    },
    _removeUnmatachedLayer(t) {
        for (let e = this.map.userLayers.length - 1; e >= 0; e--) {
            const n = this.map.userLayers[e];
            for (let e = 0; e < t.length; e++) {
                const r = t[e];
                (void 0 !== r.labelId && void 0 !== n.userData.__labelId__ && r.labelId === n.userData.__labelId__ || r.name === n.name) && (n.__matched__ = !0)
            }
            n.userData.__isSceneLayer__ || n.userData.__isOverlay__ || n.__matched__ || this.map.userLayers.remove(n)
        }
    },
    _applySceneTemplate(t, e, n) {
        let a = this.app.getControl("效果模板控制器");
        a || (a = new THING.EffectThemeControl,
        this.app.addControl(a, "效果模板控制器"));
        let i = "/";
        t.strategy.data && t.strategy.data.resourcePrefix && (t.strategy.data.resourcePrefix = MapUtil._combinePrefixAndLocalUrl(e, t.strategy.data.resourcePrefix),
        i = t.strategy.data.resourcePrefix + i);
        const o = "campusTheme_" + n.id + MapUtil.getUUID();
        a.registerTheme(o, t.strategy, i),
        n.applyTheme(o);
        const s = a.applyEffectTheme(o, n);
        s && s.then ? s.then(()=>{
            this.map._isInner && this.map.applyThemeEnvironment(o, "inner"),
            this._addGeoCampusEventListener(n.id, o)
        }
        ) : (this.map._isInner && this.map.applyThemeEnvironment(o, "inner"),
        this._addGeoCampusEventListener(n.id, o))
    },
    _addGeoCampusEventListener(t, e) {
        this.app.off(THING.EventType.LevelChange, null, "mapLoaderSceneLevelChangeListener_" + t),
        this.app.on(THING.EventType.LevelChange, t=>{
            t.current && "Campus" !== t.current.type ? t.previous && "Campus" === t.previous.type && "Thing" !== t.current.type && "Map" !== t.current.type && "ThingLayer" !== t.current.type && (e && this.map.applyThemeEnvironment(e, "inner"),
            this.map.visible = !1,
            this.map._isInner = !0) : (e && this.map.applyThemeEnvironment(e, "outer"),
            this.map.visible = !0,
            this.map._isInner = !1)
        }
        , "mapLoaderSceneLevelChangeListener_" + t, -1e3)
    },
    _applyScenesTemplate(t, e=!1) {
        const n = t.scenes
            , r = this.app.query(".GeoCampus");
        for (let a = 0; a < r.length; a++) {
            const i = r[a]
                , o = i._layer;
            for (let r = 0; r < n.length; r++) {
                const a = n[r];
                i.userData.labelId === a.labelId ? this._applySceneTemplate(a, t.resourcePrefix, o) : e && i.destroy()
            }
        }
    },
    _loadLayersByTemplate(t, e=!1) {
        this._reConstructMapLayers(),
        e && this._removeUnmatachedLayer(t.layers);
        for (let e = 0; e < t.layers.length; e++)
            CMAP.Util._addPrifixToUrl(t.layers[e], t.resourcePrefix);
        this._reConstructLayer(t.layers);
        for (let e = 0; e < t.layers.length; e++) {
            let n = t.layers[e];
            n.__isOverlay__ && MapUtil._queryHttpUrl({
                url: MapUtil._combinePrefixAndLocalUrl(t.resourcePrefix, n.url),
                complete: function(e) {
                    MapUtil_1._loadLayer(JSON.parse(e), t.resourcePrefix, n, n.layerConfig)
                },
                error: function() {
                    THING.Utils.error("data url not found")
                },
                async: t.ajaxAsync
            });
            for (let e = this.map.userLayers.length - 1; e >= 0; e--) {
                let r = this.map.userLayers[e];
                (void 0 !== n.labelId && void 0 !== r.userData.__labelId__ && n.labelId === r.userData.__labelId__ || n.name === r.name) && this.applyLayerConfig(r, n, t.resourcePrefix, !1)
            }
            for (let e = this.map.userLayers.length - 1; e >= 0; e--) {
                let n = this.map.userLayers[e];
                "VectorTileLayer" === n.type && n.updateByMapJson(t, t.resourcePrefix)
            }
        }
    },
    _changeMapByConfig(t) {
        for (let t = this.map.baseLayers.length - 1; t >= 0; t--)
            this.map.baseLayers[t].userData.__fromCityBuilder__ && this.map.baseLayers.remove(this.map.baseLayers[t]);
        for (let t = this.map.userLayers.length - 1; t >= 0; t--)
            this.map.userLayers[t].userData.__fromCityBuilder__ && this.map.userLayers.remove(this.map.userLayers[t]);
        this.map.baseLayers.visible = !0,
        t.cameraFlyTo = {
            time: 0
        },
        this._loadMapConfig(t)
    }
}
    , MapUtil_1 = MapUtil_1;
class Map extends THING.BaseObject {
    constructor(t) {
        super(t),
        this._style = {},
        this.app = t,
        "linux" !== MapUtil._detectOS() && "macos" !== MapUtil._detectOS() || "chrome" !== MapUtil._detectBrowser() ? this.logDepthbuf = !1 : this.logDepthbuf = !0,
        this._originCameraPosition = t.camera.position,
        this._originCameraTarget = t.camera.target,
        t.camera.mode = "earth",
        t.camera.cameraObject.removeControl("cameraControl"),
        t.camera.cameraObject.addControl(new St, "cameraControl"),
        t.camera.panSpeed = t.camera.mousePanSpeed = .1,
        t.camera.rotateSpeed = .07,
        this.maxPitch = 82,
        this._originUrl = void 0,
        ht.a.setCameraFlyFunction(t),
        this.util = MapUtil,
        this.lastCameraInfo = null,
        this.app.on(THING.EventType.EnterLevel, ".Map", t=>{
            this.onCampusLevelSetCameraControl(t)
        }
        , THING.EventTag.LevelCameraControl),
        this.app.on(THING.EventType.EnterLevel, ".Map", t=>{
            this.onCampusLevelSetBackground(t)
        }
        , THING.EventTag.LevelSetBackground),
        this.app.on(THING.EventType.EnterLevel, ".Map", t=>{
            this.onCampusLevelSetEffect(t)
        }
        , THING.EventTag.LevelSetEffect),
        this.app.on(THING.EventType.EnterLevel, ".Map", t=>{
            this.onCampusLevelSceneOperations(t)
        }
        , THING.EventTag.LevelSceneOperations),
        this.app.on(THING.EventType.EnterLevel, ".Map", t=>{
            this.onCampusLevelPickedResultFunc(t)
        }
        , THING.EventTag.LevelPickedResultFunc),
        this.app.on(THING.EventType.EnterLevel, ".Map", t=>{
            this.onCampusLevelFly(t)
        }
        , THING.EventTag.LevelFly),
        this.app.on(THING.EventType.LeaveLevel, ".Map", t=>{
            this.onCampusLevelLeaveSceneOperations(t)
        }
        , THING.EventTag.LevelSceneOperations),
        this.sceneManager = new mt(t),
        this.pick3DTilesFeatureIdBuffer = [],
        this.pick3DTilesFeatureIdCurrentValue = CMAP.pickIdStartNum,
        this.pickIdBuffer = [],
        this.app.picker.onPickNodeID || (this.app.picker.onPickNodeID = (t=>{
            if (t >= CMAP.pickIdStartNum) {
                for (let e in CMAP.getCurrentMap().pickIdBuffer) {
                    let n = CMAP.getCurrentMap().pickIdBuffer[e].start + CMAP.pickIdStartNum;
                    if (t < CMAP.getCurrentMap().pickIdBuffer[e].start + CMAP.getCurrentMap().pickIdBuffer[e].count + CMAP.pickIdStartNum && t >= n)
                        return CMAP.getCurrentMap().pickIdBuffer[e].node._pickedId = t,
                        CMAP.getCurrentMap().pickIdBuffer[e].node
                }
                for (let e in CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer) {
                    if (CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer[e].globalId === t) {
                        let t;
                        const n = THING.App.current.objectManager.getBaseObject(CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer[e].feature._group_)
                            , r = CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer[e].feature._batchId;
                        if (r >= 0 && CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer[e].feature._content) {
                            t = CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer[e].feature._content.batchTable.getProperty(r, n._objectKey),
                            n.globalKey = t
                        }
                        return n.node
                    }
                }
            }
        }
        ))
    }
    onCampusLevelSetCameraControl(t) {}
    onCampusLevelSetBackground() {}
    onCampusLevelSetEffect() {}
    onCampusLevelSceneOperations() {}
    onCampusLevelPickedResultFunc(t) {
        var e;
        this.app.picker.pickedResultFunc = function(t) {
            for (let e = 0; e < t.parents.length; e++) {
                const n = t.parents[e];
                if ("Campus" === n.type)
                    return n
            }
            return t
        }
        ,
        this.app.pauseEvent(THING.EventType.Pick, null, THING.EventTag.LevelPickOperation),
        this.app.on(THING.EventType.Pick, function(t) {
            e && (e.style.outlineColor = null),
            e = t.object,
            t.object && "Campus" === t.object.type && (t.object.style.outlineColor = "#FF8000")
        }, "MapLevelPickOperation")
    }
    onCampusLevelFly(t) {
        t.previous ? t.previous.type !== this.type && this._lastCameraInfo && this.app.camera.earthFlyTo(this._lastCameraInfo) : this.app.trigger("cameraFlyComplete")
    }
    onCampusLevelLeaveSceneOperations(t) {
        this.app.resumeEvent(THING.EventType.Pick, null, THING.EventTag.LevelPickOperation),
        this.app.off(THING.EventType.Pick, null, "MapLevelPickOperation"),
        this._lastCameraInfo = this.app.camera.getCameInfo(),
        this._lastCameraInfo.directFly = !0
    }
    _beforeSetup(t) {
        super._beforeSetup(t),
        t.url && (this._originUrl = t.url,
        t.url.indexOf("cjs") > 0 && (this._originUrl += ".cjs"))
    }
    _afterSetupComplete(t) {
        this._earthInstance.atmospereInstance.node.children[0].children[0].castShadow = !1,
        this._earthInstance.atmospereInstance.node.children[0].children[0].receiveShadow = !1,
        MapUtil_1.map = this,
        MapUtil_1.app = this.app,
        MapUtil.map = this,
        MapUtil.app = this.app
    }
    canAcceptEvent(t) {
        return "update" === t.type || !(!t.object || !t.object.isChildOf(this))
    }
    customSetup(options) {
        Tt();
        let _this = this;
        t3djs._initT3d ? (t3djs.rootNode.isChildOf(this.app.scene) || this.app.scene.add(t3djs.rootNode),
        t3djs.materialManager.loadCache(),
        setTimeout(()=>{
            this.app.uEarth._earthInstance.tileEarth.isEarthShow = !0
        }
        , 0)) : (t3djs.go(this.app.domElement.id, this.app),
        Object.defineProperty(t3djs.camera, "camera", {
            get: function() {
                return _this.app.renderCamera
            },
            configurable: !0
        })),
        t3djs._initT3d = !0,
        this.app.renderer.shadowMap.autoUpdate = !1,
        this.alias = void 0 === options.alias ? Alias.High : options.alias,
        this._repairCamera = void 0 === options.repairCamera || options.repairCamera,
        this._repairCamera && MapUtil.repairCamera(this.app.camera),
        options.background && (this.app.background = options.background),
        options.disableEffect && (this.disableCompositor = !0),
        CMAP._map = this.app.uEarth = this,
        this._style = new Style(this,options.style || {}),
        this.style.skipStyle = !0,
        void 0 !== options.restrictedLevel && (options.level = options.restrictedLevel),
        this.restrictedLevel = void 0 === options.level ? [0, 22] : options.level,
        this._attribution = options.attribution,
        this.addAttribution(this._attribution),
        void 0 === options.atmosphere && (options.atmosphere = !0),
        this._atmosphere = options.atmosphere,
        this._terrainUrl = options.terrainUrl,
        this._resourceConfig = options.resourceConfig,
        this._showLayerEventName = options.showLayerEventName,
        this._baseLayers = new m(this.app),
        this._userLayers = new g(this.app),
        this._sceneLayers = [],
        this.terrainLayer,
        this.allLayers = new f(this.app),
        this._earthInstance = new EarthInstance(options,this.app),
        this._event = this._earthInstance.event,
        this._visible = !0,
        this.app.camera.fov = 30,
        this.app.scene.fog = new THREE.FogExp2(16777215,0);
        var earthRoot = window.t3djs.earthRoot = new THREE.Group;
        this.app.scene.add(earthRoot),
        pt.init(this.app);
        let a = this.app.renderer;
        a.onCustom1Finish = function() {
            CMAP.depthMode !== p.a.Earth && a.clear(!1, !0, !1)
        }
        ,
        this.app.rendererManager._mainRenderer.shareDepthRenderBuffer(!0);
        let i = this.app.rendererManager._mainRenderer.getPass("LineBloom");
        i.strength = 1.5,
        i.blurSize = 2,
        i.dirty(),
        this.app.postEffect = {
            postEffect: {
                colorCorrection: {
                    contrast: 1.1,
                    gamma: 1,
                    saturation: 1.2
                }
            }
        },
        this.app.rendererManager._mainRenderer.combineGlow = !1,
        this.debugManager = new Rt(this.app),
        this.app.on("click", function(t) {
            t.object && _this.app.trigger("MAPCLICK", t)
        });
        let o = this.currentLevel;
        THING.EventType.MapLevelChange = "MAPLEVELCHANGE",
        C.a.add("levelChange", function(t) {
            o !== _this.currentLevel && _this.app.trigger(THING.EventType.MapLevelChange, {
                previous: o,
                current: _this.currentLevel
            }),
            o = _this.currentLevel
        });
        var s, l = {
            create: function() {
                let t = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(1,0,0)
                });
                t.colorWrite = !1;
                let e = new THREE.SphereGeometry(CMAP.depthGlobeRadiusFar,128,128)
                    , n = new THREE.Mesh(e,t);
                return n.renderOrder = -1e4,
                n.userData.skipPick = !0,
                n
            },
            onUpdate: function() {
                var t = _this._depthGlobe
                    , n = CMAP.depthGlobeRadiusNear / CMAP.depthGlobeRadiusFar;
                let a = MapUtil.getDistance(_this.app.camera.camera.position, _this.app.camera.curOrbit._getIntersectPoint());
                a < 5e4 && !(s < 5e4) ? t.scale.set(n, n, n) : a >= 5e4 && !(s >= 5e4) && t.scale.set(1, 1, 1),
                s = a
            }
        };
        this.app.addControl(l, "depthGlobeUpdate", !1);
        var mapConfig, c = l.create();
        if (this._depthGlobe = c,
        window.t3djs.rootNode.add(c),
        this.app.root.campuses.length > 0) {
            let t = this.app.root.campuses[0];
            var h, d;
            t.extraData && void 0 !== t.extraData.coordinates ? ((h = t.extraData.coordinates.split(","))[0] = h[0] - 0,
            h[1] = h[1] - 0) : void 0 !== t.coordinates && (h = t.coordinates),
            t.extraData && void 0 !== t.extraData.azimuth ? d = t.extraData.azimuth - 0 : void 0 !== t.azimuth && (d = t.azimuth),
            h || d || (d = 220),
            h || (h = [116.4641, 39.98606]),
            d || (d = 0),
            t.position = CMAP.Util.convertLonlatToWorld(h),
            t.angles = CMAP.Util.getAnglesFromLonlat(h, d),
            this.setParent(null),
            t3djs.rootNode.add(this.node);
            let e = t.selfToWorld(this._originCameraPosition)
                , n = t.selfToWorld(this._originCameraTarget);
            this.app.camera.position = e,
            this.app.camera.target = n,
            this.app.camera.curOrbit.setState()
        }
        if (_this._originUrl) {
            if (THING.Utils.log("准备加载场景"),
            options.complete) {
                var v = options.complete;
                options.complete = _this.app.on("LAYERSCOMPLETE", function(t) {
                    t.object.mapConfig === mapConfig && v.call(this, {
                        object: _this,
                        layers: _this.allLayers
                    })
                })
            }
            THING.Utils.dynamicLoad(_this._originUrl, function(t) {
                if (_this._originUrl.endsWith("cjs")) {
                    var n = MapUtil._convertJSToCJS(t[_this._originUrl]);
                    new Function(n)()
                } else
                    mapConfig = t[_this._originUrl],
                    (mapConfig = MapUtil._parseMapConfig(mapConfig)) && 1 === mapConfig.success ? (mapConfig = mapConfig.data,
                    _this._resourceConfig || (_this._resourceConfig = {}),
                    mapConfig.resourcePrefix = THING.Utils.parseValue(_this._resourceConfig.resourcePrefix, ""),
                    mapConfig.baseLayerUrls = _this._resourceConfig.baseLayerUrls,
                    mapConfig._terrainUrl = _this._resourceConfig.terrainUrl,
                    mapConfig.showLayerEventName = _this._resourceConfig.showLayerEventName,
                    mapConfig.isProxima = THING.Utils.parseValue(_this._resourceConfig.isProxima, !1),
                    mapConfig.ajaxAsync = THING.Utils.parseValue(_this._resourceConfig.ajaxAsync, !0),
                    mapConfig.loadDataFirst = THING.Utils.parseValue(_this._resourceConfig.loadDataFirst, !1),
                    mapConfig.ignoreParams = THING.Utils.parseValue(_this._resourceConfig.ignoreParams, []),
                    mapConfig.changeCampusLevel = THING.Utils.parseValue(_this._resourceConfig.changeCampusLevel, !0),
                    mapConfig.changeMapLevel = THING.Utils.parseValue(_this._resourceConfig.changeMapLevel, !0),
                    mapConfig.externalConfigUrl = _this._resourceConfig.externalConfigUrl,
                    MapUtil._loadMapConfig(mapConfig),
                    _this.mapConfig = mapConfig) : console.error("地图配置文件出错")
            })
        }
        this.setupUserData()
    }
    get event() {
        return this._event
    }
    get atmosphere() {
        return this._earthInstance.atmospereInstance.node.visible
    }
    set atmosphere(t) {
        this._earthInstance._atmosphere = t,
        this._atmosphere = t,
        this._earthInstance._atmospereSetuped && (this._earthInstance.atmospereInstance.node.visible = t)
    }
    get earth() {
        return this._earthInstance.tileEarth.rootNode.visible
    }
    set earth(t) {
        this._earthInstance.tileEarth.rootNode.visible = t,
        this._depthGlobe.visible = t
    }
    get logDepthbuf() {
        return this._logDepthbuf
    }
    set logDepthbuf(t) {
        this._logDepthbuf = t,
        CMAP.logDepthbuf = t,
        this.app.renderer.capabilities.logarithmicDepthBuffer = t,
        this.app.camera.autoAdjustNear = !t;
        let e = this.app.rendererManager._mainRenderer;
        e && e.dirty()
    }
    get depthMode() {
        return CMAP.depthMode
    }
    set depthMode(t) {
        CMAP.depthMode = t,
        t === p.a.None || t === p.a.Earth ? this._depthGlobe.material.depthWrite = !1 : this._depthGlobe.material.depthWrite = !0;
        let e = this.app.rendererManager._mainRenderer;
        e && e.dirty()
    }
    get style() {
        return this._style
    }
    get baseLayers() {
        return this._baseLayers
    }
    set baseLayers(t) {
        this._baseLayers._layers = t,
        this._earthInstance.removeAllLayers(),
        this._earthInstance.setBaseLayers(t)
    }
    get userLayers() {
        return this._userLayers
    }
    set userLayers(t) {
        Array.isArray(t) ? (this._userLayers.removeAll(),
        this._userLayers.add(t)) : this._userLayers.add(t._data)
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        t3djs.earthAndAtmosphere && t3djs.earthRoot && t3djs.rootNode && this._depthGlobe && this._earthInstance.tileEarth && (t3djs.earthAndAtmosphere.visible = t,
        t3djs.earthRoot.visible = t,
        t3djs.rootNode.visible = t,
        this._depthGlobe.visible = t,
        this._earthInstance.tileEarth.isEarthShow = t),
        !t && this.app.scene.fog && this.app.scene.fog.density && (this.app.scene.fog.density = 0),
        this._visible = t,
        this.app.rendererManager._mainRenderer.dirty()
    }
    flyRotate(t) {
        ht.a.flyRotate(t, this.app)
    }
    rotate(t) {
        this.flyRotate(t)
    }
    on() {
        if (arguments.length < 2)
            THING.Utils.log("参数不合法");
        else {
            for (var t in arguments) {
                let e = arguments[t];
                if (THING.Utils.isFunction(e)) {
                    arguments[t] = function(t) {
                        if (t.pickedPosition) {
                            var n = MapUtil.convertWorldToLonlat(t.pickedPosition);
                            t.coordinates = [n[0], n[1]],
                            e.call(t.object, t)
                        }
                    }
                }
            }
            super.on.apply(this, arguments)
        }
    }
    addLayer(t) {
        "TileLayer" === t.type || "TerrainLayer" === t.type || "VectorBaseLayer" === t.type ? this.baseLayers.add(t) : this.userLayers.add(t)
    }
    removeLayer(t) {
        "TileLayer" === t.type || "TerrainLayer" === t.type || "VectorBaseLayer" === t.type ? this.baseLayers.remove(t) : this.userLayers.remove(t)
    }
    getLayerByName(t) {
        return this.allLayers.query(t)
    }
    move(t, e) {
        this.app.camera.curOrbit.earthRotate(t, e)
    }
    zoom(t, e) {
        this.app.camera.curOrbit.zoom(t, e)
    }
    get attribution() {
        return this._attribution
    }
    get restrictedLevel() {
        return this._restrictedLevel
    }
    set restrictedLevel(t) {
        this._restrictedLevel = t,
        this.app.camera.curOrbit.maxDistance = d.getDistanceByLevel(t[0]),
        this.app.camera.curOrbit.minDistance = d.getDistanceByLevel(t[1])
    }
    get level() {
        return this.restrictedLevel
    }
    set level(t) {
        this.restrictedLevel = t
    }
    get currentLevel() {
        return d.getCurentLevel(this.app)
    }
    get maxPitch() {
        return this._maxPitch
    }
    set maxPitch(t) {
        t >= 90 && (t = 89),
        this._maxPitch = t,
        this.app.camera.curOrbit.maxPitchAngle = t,
        this.app.camera.curOrbit.maxPolarAngle = THING.Math.degToRad(this._maxPitch)
    }
    set attribution(t) {
        var e = document.getElementById("dataAttribution");
        if (e)
            if ("none" !== t) {
                e.style.display = "block";
                var n = '&nbsp;<a href="http://www.thingjs.com" title="ThingJS">';
                n += "ThingJS</a>",
                n += this.getAttribution(t),
                e.innerHTML = n
            } else
                e.style.display = "none"
    }
    applyTheme(t) {}
    applyThemeEnvironment(t, e="outer") {
        if ("inner" === e) {
            this.app.applyThemeEnvironment(t, e);
            const n = this.app.level.current.parents.query(".Campus")[0];
            n ? (this.app._lightGroup.position = n.getWorldPosition(),
            this.app._lightGroup.angles = n.worldAngles) : THING.Utils.warn("can not find campus")
        } else if (this.logDepthbuf = this._logDepthbuf,
        this.mapConfig) {
            this.mapConfig.light && MapUtil._loadLightConfig(this.mapConfig.light, this.mapConfig.multiEnviroment);
            let t = this.app.rendererManager._mainRenderer;
            if (t.getPass("glow").$enable = !0,
            t.getPass("smallGlow").$enable = !0,
            t.getPass("combineGlow").$enable = !1,
            this.mapConfig.postEffect && Array.isArray(this.mapConfig.postEffect) && this.mapConfig.postEffect.length > 0) {
                if (this.app.postEffect) {
                    let t = this.app.postEffect.postEffect.blur;
                    this.mapConfig.multiEnviroment ? this.mapConfig.postEffect.forEach(e=>{
                        e.value[0].postEffect.blur = t
                    }
                    ) : this.mapConfig.postEffect[0].postEffect.blur = t
                }
                MapUtil._loadPostEffectConfig(this.mapConfig.postEffect, this.mapConfig.multiEnviroment)
            }
            this.mapConfig.background ? MapUtil._loadBackground(this.mapConfig, this.mapConfig.multiEnviroment) : this.mapConfig.skyBox && MapUtil._loadSkybox(this.mapConfig),
            t.getPass("glow").strength = 1.5,
            t.getPass("glow").radius = .4,
            t.getPass("glow").threshold = .2,
            t.shareDepthRenderBuffer(!0),
            t.shareDepthRenderBuffer(!1, "Glow"),
            this.mapConfig.map.style && (this.app.scene.fog = new THREE.FogExp2(new THREE.Color(1,1,1),0),
            CMAP.Util._loadMapStyle(this.mapConfig.map.style, this.mapConfig.multiEnviroment));
            let e = this.mapConfig.layers;
            for (let n in e) {
                let r = e[n];
                r.geometryType && r.geometryType.indexOf("Line") >= 0 && r.layerConfig.effect && (t.getPass("lineBloom").$enable = !0)
            }
        }
    }
    addAttribution(t) {
        if ("none" !== t) {
            var e = '&nbsp;<a href="http://www.thingjs.com" title="ThingJS">';
            e += "ThingJS&nbsp</a>",
            e += this.getAttribution(t);
            var n = document.createElement("div");
            n.id = "dataAttribution",
            n.innerHTML = e;
            var r = document.head || document.getElementsByTagName("head")[0]
                , a = document.createElement("style");
            a.type = "text/css",
            r.appendChild(a);
            var i = a.sheet || a.styleSheet;
            i.insertRule("#dataAttribution{ position:absolute}"),
            i.insertRule("#dataAttribution{ z-Index:1000}"),
            i.insertRule("#dataAttribution{ bottom:0px}"),
            i.insertRule("#dataAttribution{ right:0px}"),
            i.insertRule("#dataAttribution{ font-Size:11px}"),
            i.insertRule("#dataAttribution{ color:#565656}"),
            i.insertRule("#dataAttribution{ background-Color:rgba(255, 255, 255, 0.5)}"),
            i.insertRule("#dataAttribution a:link{color:#0078A8}"),
            i.insertRule("#dataAttribution a:visited{color:#0078A8}");
            var o = this.app.domElement
                , s = this.app.renderer.domElement.parentElement;
            o.insertBefore(n, s)
        }
    }
    getAttribution(t) {
        if (t) {
            "Google" === t ? t = "<span>地图数据 ©" + (new Date).getFullYear() + ' Google</span>&nbsp|&nbsp<a href="http://www.google.cn/intl/zh-CN_CN/help/terms_maps.html" target="_blank" >使用条款</a>' : "OSM" === t || "OpenStreetMap" === t ? t = '© <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors' : "CARTO" === t ? t = '© <a href="https://carto.com/attributions" target="_blank">CARTO</a>' : "高德" === t || "Gaode" === t || "amap" === t ? t = "<span>©" + (new Date).getFullYear() + ' 高德软件 | <a href="http://map.amap.com/doc/serviceitem.html" target="_blank">服务条款</a></span>' : "GeoQ" === t && (t = '<span><a href="https://www.geoq.cn" target="_blank">GeoQ</a></span>');
            var e = "|&nbsp";
            return e += t,
            e += "&nbsp"
        }
        return ""
    }
    getCurrentExtent() {
        var t = this.app
            , e = {}
            , n = t.renderer.domElement
            , a = []
            , i = []
            , o = 0
            , s = 0
            , l = 0
            , u = 0;
        let c = n.height / t.pixelRatio
            , h = n.width / t.pixelRatio;
        for (var d = 0; d < 10; d++) {
            var f = MapUtil.convertWindowToWorld([0, d * (c / 10)]);
            if (f) {
                var p = MapUtil.world2Lonlat(f);
                a.push(p[0]),
                i.push(p[1]),
                o++
            }
            var m = MapUtil.convertWindowToWorld([h, d * (c / 10)]);
            if (m) {
                var g = MapUtil.world2Lonlat(m);
                a.push(g[0]),
                i.push(g[1]),
                s++
            }
            var v = MapUtil.convertWindowToWorld([d * (h / 10), 0]);
            if (v) {
                var y = MapUtil.world2Lonlat(v);
                a.push(y[0]),
                i.push(y[1]),
                0
            }
            var _ = MapUtil.convertWindowToWorld([d * (h / 10), c]);
            if (_) {
                var x = MapUtil.world2Lonlat(_);
                a.push(x[0]),
                i.push(x[1]),
                l++
            }
        }
        for (let t = 0; t < 20; t++) {
            var b = MapUtil.convertWindowToWorld([h / 2, t * (c / 50)]);
            if (b) {
                var w = MapUtil.world2Lonlat(b);
                a.push(w[0]),
                i.push(w[1]),
                u++;
                break
            }
        }
        return o > 0 && s > 0 && l > 0 && u > 0 ? (e.minX = Math.min(...a),
        e.maxY = Math.max(...i),
        e.maxX = Math.max(...a),
        e.minY = Math.min(...i)) : (e.minX = -180,
        e.maxX = 180,
        e.minY = -90,
        e.maxY = 90),
        e
    }
    setMapLight(t) {
        t ? pt.switchToEarth(this.app) : pt.switchToThing(this.app)
    }
    get repairCamera() {
        return this._repairCamera
    }
    set repairCamera(t) {
        t ? MapUtil.repairCamera(this.app.camera) : MapUtil.restoreCamera(this.app.camera),
        this._repairCamera = t
    }
    _setSunTexture(t) {
        this._earthInstance && this._earthInstance._sunLight._setSunSpriteTexture(t)
    }
    _removeSunTexture(t) {
        this._earthInstance && this._earthInstance._sunLight._removeSunSpriteTexture()
    }
    _setSystemTime(t) {
        this._earthInstance && this._earthInstance._sunLight._setTime(t)
    }
    _setSecondsAddCurrentTime(t) {
        this._earthInstance && this._earthInstance._sunLight._setSecondsAddCurrentTime(t)
    }
    destroy() {
        super.destroy(),
        this._earthInstance.showGroundAndAtmosphere(!1),
        this.app.removeControl("atmosphereUpdate"),
        this.app.removeControl("earthUpdate"),
        this.app.removeControl("depthGlobeUpdate"),
        this.app.removeControl("fixlightUpdate"),
        this._depthGlobe.dispose(),
        this._depthGlobe = null;
        var earthRoot = t3djs.buffer.nodeBuffer.get("earthRoot")
            , meshes = earthRoot.getMeshes()
            , n = earthRoot.getMaterials()
            , textures = earthRoot.getTextures();
        for (let t = 0; t < meshes.length; t++)
            meshes[t].dispose(),
            meshes[t].geometry.faceVertexUvs && (meshes[t].geometry.faceVertexUvs = []),
            meshes[t].geometry.faces && (meshes[t].geometry.faces = []),
            meshes[t].geometry.vertices && (meshes[t].geometry.vertices = []);
        for (let t = 0; t < n.length; t++)
            n[t].dispose();
        for (let t = 0; t < textures.length; t++)
            textures[t].dispose();
        earthRoot.destroy(),
        this._earthInstance.fixLight = null;
        for (let e = 0; e < earthRoot.children.length; e++)
            earthRoot.children[e].destroy();
        t3djs.buffer.nodeBuffer.deleteAll(),
        t3djs.buffer.entityBuffer.deleteAll(),
        t3djs.buffer.materialBuffer.deleteAll(),
        t3djs.buffer.tileMaterialBuffer.deleteAll(),
        t3djs.buffer.textureBuffer.deleteAll(),
        C.a.delete("levelChange"),
        this.app.off(THING.EventType.MapCameraReady),
        this.userLayers.removeAll(!0),
        this.baseLayers.removeAll(),
        THING.Utils.log("销毁地图实例成功")
    }
    get debugMode() {
        return this.debugManager.enable
    }
    set debugMode(t) {
        this.debugManager.enable = t
    }
}
THING.factory.registerClass("Map", Map);
var Map = Map
    , Wt = {
    bigPoint: 1,
    smallPoint: 2,
    worldPoint: 3,
    bigLine: 4,
    smallLine: 5,
    worldMesh: 6
}
    , Util0_2 = {
    applyVectorEarthStyle(t, e) {
        let n = t._defaultStyle;
        e = THING.Utils.mergeObject(n, e, !0);
        let r = this._traverse(t);
        for (let t = 0, n = r.length; t < n; t++) {
            let n = r[t];
            if (n._vectorStyle)
                switch (n._vectorStyle) {
                case Wt.bigPoint:
                    this._changePoint(n, e.bigPointStyle);
                    break;
                case Wt.smallPoint:
                    this._changePoint(n, e.smallPointStyle);
                    break;
                case Wt.worldPoint:
                    this._changePoint(n, e.worldPointStyle);
                    break;
                case Wt.bigLine:
                    this._changeLine(n, e.bigLineStyle);
                    break;
                case Wt.smallLine:
                    this._changeLine(n, e.smallLineStyle);
                    break;
                case Wt.worldMesh:
                    this._changeMesh(n, e.worldMeshStyle)
                }
        }
        THING.App.current.rendererManager._mainRenderer.dirty()
    },
    _traverse(t) {
        let e = [];
        return t.node.traverse(t=>{
            (t.isMesh || t.isPoints) && e.push(t)
        }
        ),
        e
    },
    _changePoint(t, e) {
        let n = THING.Utils.parseColor(e.color);
        t.material.uniforms.ptColor.value = n,
        t.material.uniforms.size.value = e.size,
        THING.App.current.effectManager.setEffect(t, "radialBlur2", 1),
        THING.App.current.effectManager.setEffect(t, "glow", e.glowStrength),
        t.visible = e.visible
    },
    _changeLine(t, e) {
        THING.App.current.effectManager.removeEffect(t, "lineBloom"),
        THING.App.current.effectManager.setEffect(t, "glow", e.glowStrength),
        t.material.uniforms.lineWidth.value = e.width,
        t.material.uniforms.color.value = THING.Utils.parseColor(e.color),
        t.visible = e.visible
    },
    _changeMesh(t, e) {
        "LINE" !== t.__type__ ? t.material[0].color = t.material[1].color = THING.Utils.parseColor(e.color) : t.material.color = THING.Utils.parseColor(e.color),
        t.visible = e.visible
    }
};
const Yt = /([{]{2}(.+?)[}]{2})+?/g
    , Kt = /^\s+|\s+$/g;
var $t = class {
    static build(t, e) {
        var n = this.getParamter(t)
            , r = this.getData(e, n);
        return this.getHtml(t, n.full, r)
    }
    static getParamter(t) {
        var e = t.match(Yt)
            , n = []
            , r = [];
        return e && Array.isArray(e) && e.forEach(function(t, e) {
            t = t.substring(2, t.length - 2),
            n.push(t),
            t = t.replace(Kt, ""),
            r.push(t)
        }),
        {
            full: n,
            short: r
        }
    }
    static getData(t, e) {
        var n = [];
        for (let r = 0; r < e.short.length; r++) {
            let a = t[e.short[r]];
            void 0 === a && (a = ""),
            n.push(a)
        }
        return n
    }
    static getHtml(t, e, n) {
        return e.forEach(function(e, r) {
            var a = "{{" + e + "}}";
            t = this.replaceAll(t, a, n[r])
        }, this),
        t
    }
    static replaceAll(t, e, n) {
        if (!t.length)
            return "";
        for (var r = t.substring(0); -1 !== r.indexOf(e); )
            r = r.replace(e, n);
        return r
    }
}
;
var Xt = class {
    constructor(t, e) {
        var n = this;
        this._type = e.type || "standard",
        this._customHtml = e.customHtml,
        this._title = e.title || "详细信息",
        this._displayMode = e.displayMode || "none",
        this._style = e.style || "default",
        this.name = "infoWindow" + MapUtil.getUUID(),
        this._fieldData = e.fieldData,
        this._originOffset = e.offset,
        this._offset = e.offset || [0, 0, 0],
        this._pivot = e.pivot || [.5, 1],
        this._parentObj = t,
        this._popupBoard = "",
        this._obj,
        this._event,
        this._clickShowClassName = "clickShowSign",
        this._mouseEnterClassName = "mouseEnterShowSign",
        this._inInfoWindowflag = !1,
        "FeatureLayer" !== t.type && ("mouseoverShow" === this._displayMode ? (this._event = "mouseenter",
        this._parentObj.isInfoShow = !1,
        t.on("mouseenter", function() {
            n._inInfoWindowflag = !1,
            n._createInfoWindow();
            var t = document.getElementById(n.name);
            t && (t.onmouseenter = function() {
                n._inInfoWindowflag = !0
            }
            ,
            t.onmouseleave = function() {
                n._inInfoWindowflag = !1,
                n.destroy()
            }
            )
        }),
        t.on("mouseleave", function() {
            !1 === n._inInfoWindowflag && n.destroy()
        })) : "oftenShow" === this._displayMode ? (this._parentObj.isInfoShow = !0,
        n._createInfoWindow()) : "none" === this._displayMode ? (this._parentObj.isInfoShow = !1,
        this.destroy()) : (this._parentObj.isInfoShow = !1,
        this._event = "click",
        t.on("click", function() {
            n._createInfoWindow()
        }))),
        !1 === e.visible && (this.visible = !1)
    }
    _createInfoWindow() {
        var t;
        if (document.getElementById(this.name) && t3djs.client.removeChild(document.getElementById(this.name)),
        "clickShow" === this._displayMode)
            for (let t = 0; t < document.getElementsByClassName(this._clickShowClassName).length; t++)
                t3djs.client.removeChild(document.getElementsByClassName(this._clickShowClassName)[t]);
        else if ("mouseoverShow" === this._displayMode)
            for (let t = 0; t < document.getElementsByClassName(this._mouseEnterClassName).length; t++)
                t3djs.client.removeChild(document.getElementsByClassName(this._mouseEnterClassName)[t]);
        if ("custom" === this.type)
            (t = document.createElement("div")).innerHTML = $t.build(this._customHtml, this._parentObj._userData),
            this._popupBoard = t.childNodes[0],
            this._popupBoard.setAttribute("id", this.name),
            this._popupBoard.style.position = "absolute",
            t3djs.client.appendChild(this._popupBoard);
        else if ("standard" === this.type) {
            var e, n = "", r = "";
            "blue" === this._style ? (n = "<li class='info-item' style = 'font-size: 14px;\n      padding: 8px 0px;'>\n       <div class='info-key'  style = 'width: 50px;\n        float: left;\n        text-align: center;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;'>&key</div>\n       <div class='info-value' style = 'width: 125px;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;'>: &value</div>\n     </li>",
            r = "<div class='sign' id='PopupBoard' style='width: 210px;\n         background-color: rgba(192, 192, 192, 0);\n         color: rgb(204, 204, 204);\n         top: 272px;\n         left: 754px;\n         z-index: 1020;\n         display: block;\n         position: absolute;\n         backdrop-filter: blur(5px);\n         border-radius: 10px;\n         visibility: visible;'>\n       <div class = 'headline' style = 'font-size: 13px;\n        color: #cccccc;\n        background: rgba(43, 135, 230, 0.8);\n        padding: 8px 4px 8px 18px;\n        line-height: 20px;\n        border-bottom: 1px solid rgba(43,135,230, 0.7);\n        border-radius: 9px 9px 0px 0px;'>&title</div>\n       <div class = 'info' style = 'background-color: rgba(43,135,230, 0.6);\n       padding: 8px 10px;\n       border-radius: 0px 0px 9px 9px;'>\n         <ul class='info-list' style = ' color: #eeeeee;\n          list-style: none;\n          margin-left: 15px;\n         ' >&item </ul>\n       </div>\n       <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;'>×</div>\n     </div>") : "white" === this._style ? (n = "<li class='info-item' style = 'font-size:14px;padding: 8px 0px;'>\n          <div class='info-key' style = 'width: 66px;float:left;text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>&key</div>\n          <div class='info-value' style = 'margin-left: 66px;width: 125px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;'>: &value</div>\n        </li>",
            r = "<div class='sign' id='PopupBoard' style='width: 210px;background-color: rgba(192, 192, 192, 0.6);color: #cccccc;top: 0;left: 0;z-index: 100;display: inline-block;position: absolute;border-radius:5px'>\n          <div class = 'headline' style = 'font-size:12px;color:rgb(69,69,69);border-radius: 5px 5px 0px 0px;padding: 4px 4px 4px 12px;background:linear-gradient(rgba(238,238,238,0.9), rgba(238,238,238,0.7));line-height:20px;'>&title</div>\n          <div class = 'info' style = 'background-color: rgba(200,200,200, 0.8);padding: 10px 8px 10px 8px;'>\n            <ul class='info-list' style = 'color:#454545;list-style: none;margin:0;padding: 0;' >&item </ul>\n          </div>\n          <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;>×</div>\n        </div>",
            n = "<li class='info-item' style = 'font-size: 14px;\n        padding: 8px 0px;'>\n         <div class='info-key'  style = 'width: 50px;\n          float: left;\n          text-align: center;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;'>&key</div>\n         <div class='info-value' style = 'width: 125px;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          overflow: hidden;'>: &value</div>\n       </li>",
            r = "<div class='sign' id='PopupBoard' style='width: 210px;\n           background-color: rgba(192, 192, 192, 0.3);\n           color: #ccccc;\n           top: 272px;\n           left: 754px;\n           z-index: 1020;\n           display: block;\n           position: absolute;\n           backdrop-filter: blur(5px);\n           border-radius: 10px;\n           visibility: visible;'>\n         <div class = 'headline' style = 'font-size: 13px;\n          color: rgb(69,69,69);\n          background:linear-gradient(rgba(238,238,238,0.9), rgba(238,238,238,0.7));\n          padding: 8px 4px 8px 18px;\n          line-height: 20px;\n          border-bottom: 1px solid rgba(200, 200, 200, 0.75);\n          border-radius: 9px 9px 0px 0px;'>&title</div>\n         <div class = 'info' style = 'background-color: rgba(200,200,200,0.3);\n         padding: 8px 10px;\n         border-radius: 0px 0px 9px 9px;'>\n           <ul class='info-list' style = ' color: rgba(0,0,0,0.8);\n            list-style: none;\n            margin-left: 15px;\n           ' >&item </ul>\n         </div>\n         <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;'>×</div>\n       </div>") : (n = "<li class='info-item' style = 'font-size: 14px;\n         padding: 8px 0px;'>\n          <div class='info-key'  style = 'width: 50px;\n           float: left;\n           text-align: center;\n           overflow: hidden;\n           text-overflow: ellipsis;\n           white-space: nowrap;'>&key</div>\n          <div class='info-value' style = 'width: 125px;\n           white-space: nowrap;\n           text-overflow: ellipsis;\n           overflow: hidden;'>: &value</div>\n        </li>",
            r = "<div class='sign' id='PopupBoard' style='width: 210px;\n            background-color: rgba(192, 192, 192, 0);\n            color: rgb(204, 204, 204);\n            top: 272px;\n            left: 754px;\n            z-index: 1020;\n            display: block;\n            position: absolute;\n            backdrop-filter: blur(5px);\n            border-radius: 10px;\n            visibility: visible;'>\n          <div class = 'headline' style = 'font-size: 13px;\n           color: #cccccc;\n           background: rgba(0, 0, 0, 0.8);\n           padding: 8px 4px 8px 18px;\n           line-height: 20px;\n           border-bottom: 1px solid rgba(0, 0, 0, 0.75);\n           border-radius: 9px 9px 0px 0px;'>&title</div>\n          <div class = 'info' style = 'background-color: rgba(0, 0, 0, 0.7);\n          padding: 8px 10px;\n          border-radius: 0px 0px 9px 9px;'>\n            <ul class='info-list' style = ' color: #cccccc;\n             list-style: none;\n             margin-left: 15px;\n            ' >&item </ul>\n          </div>\n          <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;'>×</div>\n        </div>");
            for (var a = "", i = 0; i < this._fieldData.length; i++) {
                var o = "";
                if (this._fieldData[i].url) {
                    if ("current" === this._fieldData[i].target) {
                        o = '<a href="#" ';
                        var s = function() {
                            if (!document.getElementById(this.name)) {
                                var t = document.createElement("div");
                                t.setAttribute("style", "position: absolute;top:50%;left:50%;width:&widthValuepx;height:&heightValuepx;transform:translate(-50%, -50%);background-color: rgba(0,0,0, 0.8);padding:20px 0px 0px 0px;z-index:1001;"),
                                t.setAttribute("id", this.name);
                                var e = document.createElement("div");
                                e.setAttribute("style", "position: absolute;top: -3px;right: 3px;cursor:pointer;color: rgb(255,255,255);"),
                                e.innerHTML = "x",
                                e.addEventListener("click", function() {
                                    t3djs.client.removeChild(t)
                                }),
                                t.innerHTML = "<iframe id='popWindowIframe' name='popWindow' src='&urlValue' frameBorder='no' style='width:100%;height:100%;'></iframe>",
                                t3djs.client.appendChild(t),
                                t.appendChild(e)
                            }
                        }
                        .toString().replace("function (){", "");
                        o = (o += 'onclick="' + (s = s.substring(0, s.length - 1)) + '" ').replace("&urlValue", this._fieldData[i].url),
                        o = this._fieldData[i].width && this._fieldData[i].width ? (o = o.replace("&widthValue", this._fieldData[i].width)).replace("&heightValue", this._fieldData[i].height) : (o = o.replace("&widthValue", 600)).replace("&heightValue", 600)
                    } else
                        o = '<a href="' + this._fieldData[i].url + '" ',
                        o += 'target="_blank" ';
                    "blue" === this._style ? o += 'style="color:#eeeeee;">' : "white" === this._style ? o += 'style="color:rgba(0,0,0,0.8);">' : o += 'style="color:#cccccc;">'
                }
                this._fieldData[i].alias ? this._fieldData[i].url ? a += n.replace("&key", this._fieldData[i].alias).replace("&value", o + this._parentObj._userData[this._fieldData[i].field] + "</a>") : a += n.replace("&key", this._fieldData[i].alias).replace("&value", this._parentObj._userData[this._fieldData[i].field]) : this._fieldData[i].url ? a += n.replace("&key", this._fieldData[i].field).replace("&value", o + this._parentObj._userData[this._fieldData[i].field] + "</a>") : a += n.replace("&key", this._fieldData[i].field).replace("&value", this._parentObj._userData[this._fieldData[i].field])
            }
            e = r.replace("&item", a).replace("&title", this._title).replace("PopupBoard", this.name),
            (t = document.createElement("div")).innerHTML = e,
            this._popupBoard = t.childNodes[0];
            var l = t.childNodes[0].childNodes[t.childNodes[0].childNodes.length - 1];
            t3djs.client.appendChild(this._popupBoard),
            "clickShow" === this._displayMode || "oftenShow" === this._displayMode ? "point-top" === l.className && l.addEventListener("click", function(t) {
                t.target.parentElement.style.display = "none",
                t.stopPropagation(),
                document.getElementById(this.name) && t3djs.client.removeChild(document.getElementById(this.name))
            }, !1) : "point-top" === l.className && l.parentNode.removeChild(l)
        }
        "clickShow" === this._displayMode ? this._popupBoard.className = this._clickShowClassName : "mouseoverShow" === this._displayMode && (this._popupBoard.className = this._mouseEnterClassName),
        this._createUI()
    }
    _createUI() {
        this._popupBoard.style.display = "block";
        var t = this._parentObj.selfToWorld(this._offset);
        this._obj = this._parentObj.app.create({
            type: "UIAnchor",
            parent: this._parentObj,
            el: this._popupBoard,
            position: t,
            pivot: this._pivot
        }),
        "oftenShow" !== this._displayMode && THING.App.current.trigger("INFOSHOW", this._parentObj)
    }
    _throttle(t, e, n) {
        var r = null;
        return function() {
            e = e || 500;
            var a = n || this
                , i = arguments;
            clearTimeout(r),
            r = setTimeout(function() {
                t.apply(a, i)
            }, e)
        }
    }
    destroy() {
        document.getElementById(this.name) && t3djs.client.removeChild(document.getElementById(this.name))
    }
    get type() {
        return this._type
    }
    set type(t) {
        "FeatureLayer" === this._parentObj.type ? this._setFeatureLayerInfoWindowProperty("type", t) : (this._type = t,
        !0 === this._parentObj.isInfoShow && this._createInfoWindow())
    }
    get pivot() {
        return this._pivot
    }
    get offset() {
        return this._offset
    }
    set offset(t) {
        if ("FeatureLayer" === this._parentObj.type)
            this._setFeatureLayerInfoWindowProperty("offset", t);
        else {
            this._offset = t;
            const e = this._parentObj.selfToWorld(this._offset);
            this._obj && (this._obj.position = e)
        }
    }
    get title() {
        return this._title
    }
    set title(t) {
        "FeatureLayer" === this._parentObj.type ? this._setFeatureLayerInfoWindowProperty("title", t) : (this._title = t,
        !0 === this._parentObj.isInfoShow && this._createInfoWindow())
    }
    get displayMode() {
        return this._displayMode
    }
    set displayMode(t) {
        if ("FeatureLayer" === this._parentObj.type)
            this._setFeatureLayerInfoWindowProperty("displayMode", t);
        else {
            var e = this;
            if (this._event && ("mouseenter" === this._event && this._parentObj.off("mouseleave"),
            this._parentObj.off(this._event)),
            "mouseoverShow" === t ? (this._displayMode = "mouseoverShow",
            this._parentObj.isInfoShow = !1,
            this._event = "mouseenter",
            this.destroy()) : "oftenShow" === t ? (this._displayMode = "oftenShow",
            this._parentObj.isInfoShow = !0,
            this._createInfoWindow()) : "none" === t ? (this._displayMode = "none",
            this._parentObj.isInfoShow = !1,
            this.destroy()) : (this._displayMode = "clickShow",
            this._parentObj.isInfoShow = !1,
            this._event = "click",
            this.destroy()),
            "clickShow" === this._displayMode)
                this._parentObj.on(this._event, function() {
                    e._createInfoWindow()
                });
            else if ("mouseoverShow" === this._displayMode) {
                var n = !1;
                this._event = "mouseenter",
                this._parentObj.on("mouseenter", function() {
                    n = !1,
                    e._createInfoWindow();
                    var t = document.getElementById(e.name);
                    t && (t.onmouseenter = function() {
                        n = !0
                    }
                    ,
                    t.onmouseleave = function() {
                        n = !0,
                        e.destroy()
                    }
                    )
                }),
                this._parentObj.on("mouseleave", function() {
                    !1 === n && e.destroy()
                })
            }
        }
    }
    get style() {
        return this._style
    }
    set style(t) {
        "FeatureLayer" === this._parentObj.type ? this._setFeatureLayerInfoWindowProperty("style", t) : (this._style = t,
        !0 === this._parentObj.isInfoShow && this._createInfoWindow())
    }
    get visible() {
        return "FeatureLayer" === this._parentObj.type ? this._visible : !0 === this._parentObj.isInfoShow && "block" === this._popupBoard.style.display
    }
    set visible(t) {
        "FeatureLayer" === this._parentObj.type ? this._setFeatureLayerInfoWindowProperty("visible", t) : !0 === t ? !0 === this._parentObj.isInfoShow && (this._popupBoard.style.display = "block") : !0 === this._parentObj.isInfoShow && (this._popupBoard.style.display = "none")
    }
    get fieldData() {
        return this._fieldData
    }
    set fieldData(t) {
        "FeatureLayer" === this._parentObj.type ? this._setFeatureLayerInfoWindowProperty("fieldData", t) : (this._fieldData = t,
        !0 === this._parentObj.isInfoShow && this._createInfoWindow())
    }
    get fields() {
        for (var t = [], e = 0; e < this._fieldData.length; e++)
            t.push(this._fieldData[e].field);
        return t
    }
    set fields(t) {
        if ("FeatureLayer" === this._parentObj.type)
            this._setFeatureLayerInfoWindowProperty("fields", t);
        else {
            for (var e = 0; e < this._fieldData.length; e++)
                this._fieldData[e].field = t[e];
            !0 === this._parentObj.isInfoShow && this._createInfoWindow()
        }
    }
    get alias() {
        for (var t = [], e = 0; e < this._fieldData.length; e++)
            t.push(this._fieldData[e].alias);
        return t
    }
    set alias(t) {
        if ("FeatureLayer" === this._parentObj.type)
            this._setFeatureLayerInfoWindowProperty("alias", t);
        else {
            for (var e = 0; e < this._fieldData.length; e++)
                this._fieldData[e].alias = t[e];
            !0 === this._parentObj.isInfoShow && this._createInfoWindow()
        }
    }
    get url() {
        for (var t = [], e = 0; e < this._fieldData.length; e++)
            t.push(this._fieldData[e].url);
        return t
    }
    set url(t) {
        if ("FeatureLayer" === this._parentObj.type)
            this._setFeatureLayerInfoWindowProperty("url", t);
        else {
            for (var e = 0; e < this._fieldData.length; e++)
                this._fieldData[e].url = t[e];
            !0 === this._parentObj.isInfoShow && this._createInfoWindow()
        }
    }
    get target() {
        for (var t = [], e = 0; e < this._fieldData.length; e++)
            t.push(this._fieldData[e].target);
        return t
    }
    set target(t) {
        if ("FeatureLayer" === this._parentObj.type)
            this._setFeatureLayerInfoWindowProperty("target", t);
        else {
            for (var e = 0; e < this._fieldData.length; e++)
                this._fieldData[e].target = t[e];
            !0 === this._parentObj.isInfoShow && this._createInfoWindow()
        }
    }
    get customHtml() {
        return this._customHtml
    }
    set customHtml(t) {
        "FeatureLayer" === this._parentObj.type ? this._setFeatureLayerInfoWindowProperty("customHtml", t) : (this._customHtml = t,
        !0 === this._parentObj.isInfoShow && (this.destroy(),
        this._createInfoWindow()))
    }
    get standardHtml() {
        var t;
        if ("standard" === this._type) {
            var e = ""
                , n = "";
            "blue" === this._style ? (e = "<li class='info-item' style = 'font-size:14px;padding: 8px 0px;'><div class='info-key' style = 'width: 66px;float:left;text-align: left;text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>&key</div><div class='info-value' style = 'margin-left: 66px;'>:  {{&value}}</div></li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;background-color: rgba(192, 192, 192, 0.6);color: #cccccc;top: 0;left: 0;z-index: 100;display: inline-block;position: absolute;'><div class = 'headline' style = 'font-size:16px;color:rgb(238,238,238);padding: 4px 4px 4px 12px;background:linear-gradient(rgba(0,0,150,0.9), rgba(0,0,100,0.7));line-height:40px;'>&title</div><div class = 'info' style = 'background-color: rgba(0,0,150, 0.8);padding: 10px 8px 10px 8px;'><ul class='info-list' style = 'color:#eeeeee;list-style: none;margin:0;padding: 0;' >&item </ul></div><div class='point-top' style='position: absolute;top: -3px;right: 3px;cursor:pointer;'>x</div></div>") : "white" === this._style ? (e = "<li class='info-item' style = 'font-size:14px;padding: 8px 0px;'><div class='info-key' style = 'width: 66px;float:left;text-align: left;text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>&key</div><div class='info-value' style = 'margin-left: 66px;'>:  {{&value}}</div></li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;background-color: rgba(192, 192, 192, 0.6);color: #cccccc;top: 0;left: 0;z-index: 100;display: inline-block;position: absolute;'><div class = 'headline' style = 'font-size:16px;color:rgb(69,69,69);padding: 4px 4px 4px 12px;background:linear-gradient(rgba(238,238,238,0.9), rgba(238,238,238,0.7));line-height:40px;'>&title</div><div class = 'info' style = 'background-color: rgba(200,200,200, 0.8);padding: 10px 8px 10px 8px;'><ul class='info-list' style = 'color:#454545;list-style: none;margin:0;padding: 0;' >&item </ul></div><div class='point-top' style='position: absolute;top: -3px;right: 3px;cursor:pointer;'>x</div></div>") : (e = "<li class='info-item' style = 'font-size:14px;padding: 8px 0px;'><div class='info-key' style = 'width: 66px;float:left;text-align: left;text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>&key</div><div class='info-value' style = 'margin-left: 66px;'>:  {{&value}}</div></li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;background-color: rgba(192, 192, 192, 0.6);color: #cccccc;top: 0;left: 0;z-index: 100;display: inline-block;position: absolute;'><div class = 'headline' style = 'font-size:16px;color:rgb(250, 250, 250);padding: 4px 4px 4px 12px;background:linear-gradient(rgba(0,0,0, 0.9), rgba(0,0,0,0.7));line-height:40px;'>&title</div><div class = 'info' style = 'background-color: rgba(0,0,0, 0.8);padding: 10px 8px 10px 8px;'><ul class='info-list' style = 'color:#cccccc;list-style: none;margin:0;padding: 0;' >&item </ul></div><div class='point-top' style='position: absolute;top: -3px;right: 3px;cursor:pointer;'>x</div></div>"),
            "blue" === this._style ? (e = "<li class='info-item' style = 'font-size: 14px;\n      padding: 8px 0px;'>\n       <div class='info-key'  style = 'width: 50px;\n        float: left;\n        text-align: center;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;'>&key</div>\n       <div class='info-value' style = 'width: 125px;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;'>:  {{&value}}</div>\n     </li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;\n         background-color: rgba(192, 192, 192, 0);\n         color: rgb(204, 204, 204);\n         top: 272px;\n         left: 754px;\n         z-index: 1020;\n         display: block;\n         position: absolute;\n         backdrop-filter: blur(5px);\n         border-radius: 10px;\n         visibility: visible;'>\n       <div class = 'headline' style = 'font-size: 13px;\n        color: #cccccc;\n        background: rgba(43, 135, 230, 0.8);\n        padding: 8px 4px 8px 18px;\n        line-height: 20px;\n        border-bottom: 1px solid rgba(43,135,230, 0.7);\n        border-radius: 9px 9px 0px 0px;'>&title</div>\n       <div class = 'info' style = 'background-color: rgba(43,135,230, 0.6);\n       padding: 8px 10px;\n       border-radius: 0px 0px 9px 9px;'>\n         <ul class='info-list' style = ' color: #eeeeee;\n          list-style: none;\n          margin-left: 15px;\n         ' >&item </ul>\n       </div>\n       <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;'>×</div>\n     </div>") : "white" === this._style ? (e = "<li class='info-item' style = 'font-size:14px;padding: 8px 0px;'>\n          <div class='info-key' style = 'width: 66px;float:left;text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>&key</div>\n          <div class='info-value' style = 'margin-left: 66px;width: 125px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;'>: &value</div>\n        </li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;background-color: rgba(192, 192, 192, 0.6);color: #cccccc;top: 0;left: 0;z-index: 100;display: inline-block;position: absolute;border-radius:5px'>\n          <div class = 'headline' style = 'font-size:12px;color:rgb(69,69,69);border-radius: 5px 5px 0px 0px;padding: 4px 4px 4px 12px;background:linear-gradient(rgba(238,238,238,0.9), rgba(238,238,238,0.7));line-height:20px;'>&title</div>\n          <div class = 'info' style = 'background-color: rgba(200,200,200, 0.8);padding: 10px 8px 10px 8px;'>\n            <ul class='info-list' style = 'color:#454545;list-style: none;margin:0;padding: 0;' >&item </ul>\n          </div>\n          <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;>×</div>\n        </div>",
            e = "<li class='info-item' style = 'font-size: 14px;\n        padding: 8px 0px;'>\n         <div class='info-key'  style = 'width: 50px;\n          float: left;\n          text-align: center;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;'>&key</div>\n         <div class='info-value' style = 'width: 125px;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          overflow: hidden;'>:  {{&value}}</div>\n       </li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;\n           background-color: rgba(192, 192, 192, 0.3);\n           color: #ccccc;\n           top: 272px;\n           left: 754px;\n           z-index: 1020;\n           display: block;\n           position: absolute;\n           backdrop-filter: blur(5px);\n           border-radius: 10px;\n           visibility: visible;'>\n         <div class = 'headline' style = 'font-size: 13px;\n          color: rgb(69,69,69);\n          background:linear-gradient(rgba(238,238,238,0.9), rgba(238,238,238,0.7));\n          padding: 8px 4px 8px 18px;\n          line-height: 20px;\n          border-bottom: 1px solid rgba(200, 200, 200, 0.75);\n          border-radius: 9px 9px 0px 0px;'>&title</div>\n         <div class = 'info' style = 'background-color: rgba(200,200,200,0.3);\n         padding: 8px 10px;\n         border-radius: 0px 0px 9px 9px;'>\n           <ul class='info-list' style = ' color: rgba(0,0,0,0.8);\n            list-style: none;\n            margin-left: 15px;\n           ' >&item </ul>\n         </div>\n         <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;'>×</div>\n       </div>") : (e = "<li class='info-item' style = 'font-size: 14px;\n         padding: 8px 0px;'>\n          <div class='info-key'  style = 'width: 50px;\n           float: left;\n           text-align: center;\n           overflow: hidden;\n           text-overflow: ellipsis;\n           white-space: nowrap;'>&key</div>\n          <div class='info-value' style = 'width: 125px;\n           white-space: nowrap;\n           text-overflow: ellipsis;\n           overflow: hidden;'>:  {{&value}}</div>\n        </li>",
            n = "<div class='sign' id='PopupBoard' style='width: 210px;\n            background-color: rgba(192, 192, 192, 0);\n            color: rgb(204, 204, 204);\n            top: 272px;\n            left: 754px;\n            z-index: 1020;\n            display: block;\n            position: absolute;\n            backdrop-filter: blur(5px);\n            border-radius: 10px;\n            visibility: visible;'>\n          <div class = 'headline' style = 'font-size: 13px;\n           color: #cccccc;\n           background: rgba(0, 0, 0, 0.8);\n           padding: 8px 4px 8px 18px;\n           line-height: 20px;\n           border-bottom: 1px solid rgba(0, 0, 0, 0.75);\n           border-radius: 9px 9px 0px 0px;'>&title</div>\n          <div class = 'info' style = 'background-color: rgba(0, 0, 0, 0.7);\n          padding: 8px 10px;\n          border-radius: 0px 0px 9px 9px;'>\n            <ul class='info-list' style = ' color: #cccccc;\n             list-style: none;\n             margin-left: 15px;\n            ' >&item </ul>\n          </div>\n          <div class='point-top' style='position: absolute;top: 0px;right: 8px;cursor:pointer;'>×</div>\n        </div>");
            for (var r = "", a = 0; a < this._fieldData.length; a++)
                this._fieldData[a].alias ? r += e.replace("&key", this._fieldData[a].alias).replace("&value", this._fieldData[a].field) : r += e.replace("&key", this._fieldData[a].field).replace("&value", this._fieldData[a].field);
            t = n.replace("&item", r).replace("&title", this._title)
        }
        return t
    }
    _setFeatureLayerInfoWindowProperty(t, e) {
        "FeatureLayer" === this._parentObj.type && (this._parentObj.children.forEach(n=>{
            n.infoWindow[t] = e
        }
        ),
        this["_" + t] = e)
    }
}
;
var Label = class {
    constructor(t, e) {
        if (THING.Utils.isNull(e) && (e = {}),
        this._parent = t,
        this._name = e.name || "geoLabel_" + MapUtil.getUUID(),
        this._fontSize = THING.Utils.parseValue(e.fontSize, 18),
        this._text = THING.Utils.parseValue(e.text, ""),
        this._offset = e.offset || [0, 0],
        this._position = e.position || [0, 0, 0],
        this._imageUrl = e.imageUrl,
        this._imagePadding = [0, 0],
        this._imageUrl && (this._imagePadding = THING.Utils.parseValue(e.imagePadding, [0, 0])),
        this._fontColor = CMAP.Util.colorFormatNewToOld(e.fontColor) || [0, 0, 0],
        this._dropShadow = THING.Utils.parseValue(e.dropShadow, !1),
        this._dropShadowColor = CMAP.Util.colorFormatNewToOld(e.dropShadowColor) || [0, 0, 0],
        this._fontFamily = e.fontFamily || "Arial,Microsoft YaHei",
        this._visible = THING.Utils.parseValue(e.visible, !0),
        this._useSpriteMaterial = void 0 === e.useSpriteMaterial || e.useSpriteMaterial,
        this._keepSize = THING.Utils.parseValue(e.keepSize, !0),
        this._canvasScaleRatio = THING.Utils.parseValue(e.resolution, 2),
        this._inheritStyle = THING.Utils.parseValue(e.inheritStyle, !0),
        this._inheritScale = THING.Utils.parseValue(e.inheritScale, !1),
        this._alwaysOnTop = THING.Utils.parseValue(e.alwaysOnTop, !0),
        MapUtil.deepCopy(this._position),
        this._labelNode = new THREE.Group,
        void 0 === e.azimuth && (e.azimuth = e.modelAngle),
        "FeatureLayer" !== this._parent.type) {
            if (this._pivot = THING.Utils.parseValue(e.pivot, [.5, 1]),
            this._coordinates = MapUtil.convertWorldToLonlat(this._parent.position),
            this._azimuth = void 0 === e.azimuth ? 0 : e.azimuth,
            this._originLabelPosition = this._parent.position,
            this._parent.labelPosition)
                this._originLabelPosition = this._parent.labelPosition;
            else if ("GeoPolygon" === this._parent.type || "GeoBuilding" === this._parent.type) {
                let t = MapUtil._getPolygonCenterCoordinates(this._parent._multiPolygonCoordinates)
                    , e = this._parent.extrudeHeight + this._parent.offsetHeight;
                Array.isArray(this._arrayOffsetHeight) && this._arrayOffsetHeight.length > 0 && (e += this._arrayOffsetHeight[0]),
                this._originLabelPosition = CMAP.Util.convertLonlatToWorld(t, e)
            } else
                "GeoFlyLine" === this._parent.type && (this._parent._topPos ? this._originLabelPosition = this._parent._topPos : this._originLabelPosition = this._parent.position);
            if (this._setLabelPosition(this.position),
            !t)
                return void console.error("parentObj can not be null");
            this.init()
        }
    }
    _setLabelPosition(t) {
        this._labelNode.setPosition(this._originLabelPosition),
        M.a._setNodeAnglesByPosition(this._labelNode, this._originLabelPosition),
        this._labelNode.translate(t),
        this._labelPosition = this._labelNode.position.toArray()
    }
    get alwaysOnTop() {
        return this._alwaysOnTop
    }
    set alwaysOnTop(t) {
        if ("FeatureLayer" !== this._parent.type)
            this._alwaysOnTop = t,
            this._geoLabel.style.alwaysOnTop = t;
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.alwaysOnTop = t
    }
    get position() {
        return this._position
    }
    set position(t) {
        if ("FeatureLayer" !== this._parent.type)
            this._setLabelPosition(t),
            this._geoLabel.position = this._labelPosition;
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.position = t;
        this._position = t
    }
    get azimuth() {
        return this._azimuth
    }
    set azimuth(t) {
        if (this._azimuth = t,
        "FeatureLayer" !== this._parent.type)
            this._obj.angles = CMAP.Util.getAnglesFromLonlat(this._coordinates, this.azimuth);
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.azimuth = t
    }
    get fontSize() {
        return this._fontSize
    }
    set fontSize(t) {
        if (this._fontSize = t,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.fontSize = t
    }
    get text() {
        return this._text
    }
    set text(t) {
        if (this._text = t,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.text = t
    }
    get imagePadding() {
        return this._imagePadding
    }
    set imagePadding(t) {
        if (this._imagePadding = t,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.imagePadding = t
    }
    get offset() {
        return this._offset
    }
    set offset(t) {
        if (this._offset = t,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.offset = t
    }
    get fontColor() {
        return CMAP.Util.colorFormatOldToNew(this._fontColor)
    }
    set fontColor(t) {
        var e = CMAP.Util.colorFormatNewToOld(t);
        if (this._fontColor = e,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.fontColor = t
    }
    get fontFamily() {
        return this._fontFamily
    }
    set fontFamily(t) {
        if (this._fontFamily = t,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.fontFamily = t
    }
    get inheritScale() {
        return this._inheritScale
    }
    get inheritStyle() {
        return this._inheritStyle
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        if ("FeatureLayer" !== this._parent.type)
            this._visible = this._geoLabel.visible = t;
        else {
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.visible = t;
            this._visible = t
        }
    }
    get dropShadow() {
        return this._dropShadow
    }
    set dropShadow(t) {
        if (this._dropShadow = t,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.dropShadow = t
    }
    get dropShadowColor() {
        return CMAP.Util.colorFormatOldToNew(this._dropShadowColor)
    }
    set dropShadowColor(t) {
        var e = CMAP.Util.colorFormatNewToOld(t);
        if (this._dropShadowColor = e,
        "FeatureLayer" !== this._parent.type)
            this.updateLabel();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.dropShadowColor = t
    }
    get keepSize() {
        return this._keepSize
    }
    set keepSize(t) {
        if ("FeatureLayer" !== this._parent.type)
            this._keepSize = this._geoLabel.keepSize = t;
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.keepSize = t
    }
    get useSpriteMaterial() {
        return this._useSpriteMaterial
    }
    set useSpriteMaterial(t) {
        if ("FeatureLayer" !== this._parent.type)
            this._useSpriteMaterial = this._geoLabel.useSpriteMaterial = t,
            this._geoLabel.parent.remove(this._geoLabel),
            this.init();
        else
            for (let e = 0; e < this._parent.children.length; e++)
                this._parent.children[e].label.useSpriteMaterial = t
    }
    get imageUrl() {
        return this._imageUrl
    }
    set imageUrl(t) {
        this._imageUrl = t,
        this.updateLabel()
    }
    init() {
        var t = this._geoLabel = this._parent.app.create({
            type: "Marker",
            name: this._name + "_label",
            position: this._labelPosition,
            keepSize: this._keepSize,
            size: 1,
            pivot: this._pivot,
            parent: this._parent,
            useSpriteMaterial: this._useSpriteMaterial,
            visible: !1,
            inheritScale: this.inheritScale,
            inheritStyle: this.inheritStyle,
            autoEnsureParentsVisible: !1,
            style: {
                alwaysOnTop: this._alwaysOnTop,
                renderOrder: this._parent.renderOrder + .1
            }
        });
        !1 === this.useSpriteMaterial && t.rotateY(180),
        t.factor = .06 / this._canvasScaleRatio,
        t.inheritStyle = !1,
        this._obj = t,
        this.updateLabel()
    }
    _parseColor(t) {
        let e = 255 * t[0] | 0
            , n = 255 * t[1] | 0
            , r = 255 * t[2] | 0;
        return "rgb(&r,&g,&b)".replace("&r", e).replace("&g", n).replace("&b", r)
    }
    _setDropShadow(t) {
        this._dropShadow && (t.shadowBlur = 1,
        t.shadowOffsetX = 1,
        t.shadowOffsetY = 1,
        t.shadowColor = this._parseColor(this._dropShadowColor))
    }
    updateLabel() {
        var t = $t.build(this._text, this._parent._userData);
        this._canvas = t3djs.canvasManager.createCanvas(null, null, null),
        this._canvas.setFont(this._fontFamily, this._fontSize),
        this._canvas.setTextAlignment(1, 1),
        this._canvas.clear();
        var e = this._canvas.measureText(t);
        if (this._canvas.destroy(),
        e > 0) {
            let r = 1.02
                , a = 1.02
                , i = e * r + Math.abs(this._offset[0])
                , o = this._fontSize * a + Math.abs(this._offset[1]);
            this._canvas = document.createElement("canvas"),
            this._canvas.width = this._canvasScaleRatio * Math.ceil(i + 2 * this._imagePadding[0]),
            this._canvas.height = this._canvasScaleRatio * Math.ceil(o + 2 * this._imagePadding[1]);
            const s = this._canvas.getContext("2d");
            if (s.font = this._canvasScaleRatio * this._fontSize + "px " + this._fontFamily,
            s.fillStyle = this._parseColor(this._fontColor),
            s.textAlign = "center",
            s.textBaseline = "middle",
            this._imageUrl) {
                let i = this._canvasScaleRatio * Math.ceil(e * r + 2 * this._imagePadding[0])
                    , o = this._canvasScaleRatio * Math.ceil(this._fontSize * a + 2 * this._imagePadding[1]);
                var n = new Image(i,o);
                n.crossOrigin = "Anonymous",
                n.src = this._imageUrl;
                let l = this;
                n.onload = function(e) {
                    let n = l._offset[0] < 0 ? 0 : l._offset[0]
                        , r = l._offset[1] > 0 ? 0 : Math.abs(l._offset[1]);
                    s.drawImage(e.target, l._canvasScaleRatio * n, l._canvasScaleRatio * r, e.target.width, e.target.height),
                    l._setDropShadow(s),
                    s.fillText(t, (l._canvas.width + l._canvasScaleRatio * l._offset[0]) / 2, (l._canvas.height - l._canvasScaleRatio * l._offset[1]) / 2),
                    l._geoLabel && (l._geoLabel.image = l._canvas,
                    l._geoLabel.visible = l._visible)
                }
            } else
                this._setDropShadow(s),
                s.fillText(t, (this._canvas.width + this._canvasScaleRatio * this._offset[0]) / 2, (this._canvas.height - this._canvasScaleRatio * this._offset[1]) / 2),
                this._geoLabel && (this._geoLabel.image = this._canvas,
                this._geoLabel.visible = this._visible)
        }
    }
    destroy() {
        if ("FeatureLayer" !== this._parent.type)
            this._geoLabel && (delete this._geoLabel.parent._label,
            this._geoLabel.parent.remove(this._geoLabel),
            this._geoLabel.destroy(),
            this._geoLabel = null);
        else
            for (let t = 0; t < this._parent.children.length; t++)
                this._parent.children[t].label.destroy()
    }
}
;
class GeoObject extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t,
        this.__canAcceptEvent__ = !0,
        this._style = new GeoStyle(this),
        this.meshType = "Mesh",
        this._effectName = "glow"
    }
    setup(t) {
        this.isInfoShow = !1,
        this.inheritVisible = void 0 !== t.inheritVisible && t.inheritVisible,
        this.name = t.name || this.type + "_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._coordinates = t.coordinates,
        this._userData = void 0 === t.userData ? {} : t.userData,
        "GeoPoint" === this.type && (void 0 === t.azimuth && (t.azimuth = t.modelAngle),
        this._azimuth = void 0 === t.azimuth ? 0 : t.azimuth,
        this._pivot = void 0 === t.pivot ? [.5, .5] : t.pivot,
        this._pivotPixel = t.pivotPixel),
        this._setOffsetHeightAndField(t),
        this._initRenderer(t),
        this.node = this._layer = new THREE.Group,
        this.node.userData.forceBoundingBox = !0,
        this.visible = void 0 === t.visible || t.visible,
        this._complete = t.complete,
        this._beforeInit(),
        this.init(),
        this.setupUserData(t),
        this.setupParent(t),
        this._afterInit({
            renderer: this._renderer
        }),
        this.renderOrder = void 0 === t.renderOrder ? 0 : t.renderOrder,
        this._setupInfoWindow(t),
        this._setupLabel(t),
        "GeoPoint" === this.type && (t.complete = void 0),
        this.setupComplete(t)
    }
    _setupInfoWindow(t) {
        const e = this;
        t.infoWindow && (this.infoWindow = new Xt(this,t.infoWindow),
        "oftenShow" === this.infoWindow._displayMode && (this.isInfoShow = !0),
        this.app.on("MAPCLICK", function() {
            e.isInfoShow && "clickShow" === e.infoWindow._displayMode && (e.infoWindow.destroy(),
            e.isInfoShow = !1)
        }),
        this.app.on("INFOSHOW", t=>{
            this === t && (this.isInfoShow = this === t)
        }
        ))
    }
    _setOffsetHeightAndField(t) {
        this._offsetHeightAdded = THING.Utils.parseValue(t.offsetHeightAdded, 0),
        this._offsetHeightFactor = THING.Utils.parseValue(t.offsetHeightFactor, 1),
        this._offsetHeightAdded = this._offsetHeightAdded - 0,
        this._offsetHeightField = t.offsetHeightField,
        this._groundHeightField = t.groundHeightField,
        this._groundHeightFactor = THING.Utils.parseValue(t.groundHeightFactor, 1),
        this._offsetHeight = 0,
        THING.Utils.isNull(t.offsetHeight) ? this._setOffsetHeightFieldAndFactor(!0) : (THING.Utils.isNull(t.offsetHeight) && "GeoPoint" === this.type && !THING.Utils.isNull(t.height) && (t.offsetHeight = t.height),
        "number" != typeof t.offsetHeight || isNaN(t.offsetHeight) || (this._offsetHeight = t.offsetHeight))
    }
    _setArrayOffsetHeight(t) {}
    _getOffsetHeightByFieldAndFactor(t, e, n=1, r=0) {
        return THING.Utils.isNull(t[e]) || isNaN(t[e]) || "object" == typeof t[e] ? r : t[e] * n + r
    }
    _setOffsetHeightFieldAndFactor(t=!1) {
        let e = this._getOffsetHeightByFieldAndFactor(this.userData, this.offsetHeightField, this.offsetHeightFactor, this.offsetHeightAdded)
            , n = this._userData[this._groundHeightField];
        if (Array.isArray(n)) {
            if (this._arrayOffsetHeight = n.slice(0),
            Array.isArray(n[0]))
                for (let t = 0; t < this._arrayOffsetHeight.length; t++)
                    for (let n = 0; n < this._arrayOffsetHeight[t].length; n++)
                        this._arrayOffsetHeight[t][n] *= this._groundHeightFactor,
                        this._arrayOffsetHeight[t][n] += e;
            else
                for (let t = 0; t < this._arrayOffsetHeight.length; t++)
                    this._arrayOffsetHeight[t] *= this._groundHeightFactor,
                    this._arrayOffsetHeight[t] += e;
            t || this._setArrayOffsetHeight(this._arrayOffsetHeight),
            n = null
        } else
            n = this._getOffsetHeightByFieldAndFactor(this.userData, this._groundHeightField, this._groundHeightFactor),
            t ? this._offsetHeight = e + n : this.offsetHeight = e + n
    }
    createEdge() {
        this.edges = [];
        let t = [];
        return this.edgeMaterial = new THREE.MeshBasicMaterial,
        this.node.traverse(e=>{
            if (e.isMesh) {
                let n = e.geometry;
                window.EW && EW.setThreadsNumber(4);
                let r = THING.App.current.edgesGeometriesManager.get(n);
                if (r.isBufferGeometry) {
                    let t = new THREE.LineSegments(r,this.edgeMaterial);
                    e.parent.add(t),
                    e.__edgeLine = t,
                    this.edges.push(e.__edgeLine)
                } else {
                    let n = r.then(t=>{
                        if (!n._break) {
                            let n = new THREE.LineSegments(t,this.edgeMaterial);
                            return e.parent.add(n),
                            e.__edgeLine = n,
                            this.edges.push(e.__edgeLine),
                            Promise.resolve(n)
                        }
                    }
                    );
                    t.push(r)
                }
            }
        }
        ),
        Promise.all(t).then(t=>t)
    }
    _setupLabel(t) {
        t.label && (this.labelParam = t.label,
        this.label = this.labelParam)
    }
    canAcceptEvent(t) {
        return "update" === t.type || !(!t.object || !t.object.isChildOf(this))
    }
    get gravityCenter() {
        return this.massOfCenterCoordinates
    }
    get massOfCenterCoordinates() {
        return this._polygonInfo ? this._polygonInfo.gravityCenter : this.centerCoordinates
    }
    get centerCoordinates() {
        if (this._polygonInfo)
            return this._polygonInfo.center;
        var t = this.orientedBoundingBox.center;
        return CMAP.Util.convertWorldToLonlat(t)
    }
    get visible() {
        return this.node.visible
    }
    set visible(t) {
        this.node.visible = t,
        this.infoWindow && (this.infoWindow.visible = t),
        THING.App.current.rendererManager._mainRenderer.dirty(),
        THING.App.current.picker.needUpdate = !0
    }
    get coordinates() {
        return this._coordinates
    }
    get renderer() {
        return this._renderer
    }
    set renderOrder(t) {
        this.style.renderOrder = t
    }
    get renderOrder() {
        return this.style.renderOrder
    }
    createGeometry() {}
    createMesh() {}
    createMaterial() {}
    _initRenderer(t) {
        this._renderer = {}
    }
    _beforeInit(t) {}
    _afterInit(t) {
        this._updatePostEffect(t.renderer)
    }
    _setEffect(t, e, n) {
        for (let r = 0; r < this._getMeshes().length; r++) {
            let a = this._getMeshes()[r];
            M.a._updateEffect(a, t, e, n)
        }
        THING.App.current.rendererManager._mainRenderer.dirty()
    }
    _setFocusRegion(t) {
        t = Object.assign({}, {
            brightFactor: 1.2,
            darkFactor: .5
        }, t),
        this.app.rendererManager._mainRenderer.getPass("FocusRegion").darkFactor = t.darkFactor,
        this.app.rendererManager._mainRenderer.getPass("FocusRegion").brightFactor = t.brightFactor,
        this.node.traverse(function(t) {
            t.material && THING.App.current.effectManager.setEffect(t, "focusRegion", !0)
        })
    }
    _getMeshes() {
        var t = this
            , e = [];
        return this.node.traverse(function(n) {
            n.type && n.type === t.meshType && e.push(n)
        }),
        e
    }
    _setPostRadiusEffect(t) {
        this._setEffect("radialBlur", t)
    }
    _setPostRadialBlur2(t) {
        this._setEffect("radialBlur2", t)
    }
    _removeFocusRegion() {
        this.node.traverse(function(t) {
            t.material && THING.App.current.effectManager.removeEffect(t, "focusRegion")
        })
    }
    _getGeoObjectArray() {
        return [this]
    }
    updateMaterial() {}
    _updateEffect(t, e) {
        this._setEffect(this._effectName, t, e)
    }
    _updatePostEffect(t) {
        THING.Utils.isNull(t.effect) || this._updateEffect(t.effect, t.glowStrength),
        THING.Utils.isNull(t.postRadialBlur) || this._setPostRadiusEffect(t.postRadialBlur),
        THING.Utils.isNull(t.postRadialBlur2) || this._setPostRadialBlur2(t.postRadialBlur2),
        THING.App.current.rendererManager._mainRenderer.dirty()
    }
    updateRenderer(t) {
        this._updatePostEffect(t)
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        if (t !== this._offsetHeight) {
            var e = t - this._offsetHeight;
            this.translate([0, e, 0]),
            this._offsetHeight = t
        }
    }
    get offsetHeightField() {
        return this._offsetHeightField
    }
    set offsetHeightField(t) {
        this._offsetHeightField = t,
        this._setOffsetHeightFieldAndFactor(!1)
    }
    get offsetHeightFactor() {
        return this._offsetHeightFactor
    }
    set offsetHeightFactor(t) {
        this._offsetHeightFactor = t,
        this._setOffsetHeightFieldAndFactor(!1)
    }
    get offsetHeightAdded() {
        return this._offsetHeightAdded
    }
    set offsetHeightAdded(t) {
        this._offsetHeightAdded = t,
        this._setOffsetHeightFieldAndFactor(!1)
    }
    get groundHeightField() {
        return this._groundHeightField
    }
    set groundHeightField(t) {
        this._groundHeightField = t,
        this._setOffsetHeightFieldAndFactor(!1)
    }
    get groundHeightFactor() {
        return this._groundHeightFactor
    }
    set groundHeightFactor(t) {
        this._groundHeightFactor = t,
        this._setOffsetHeightFieldAndFactor(!1)
    }
    get label() {
        return this._label
    }
    set label(t) {
        this._label && this._label.destroy(),
        t && (t.__proto__ === Label.prototype ? this._label = t : (this.labelParam = t,
        this._label = new Label(this,t)))
    }
    get style() {
        return this._style
    }
}
THING.factory.registerClass("GeoObject", GeoObject);
var GeoObject = GeoObject
    , te = {
    createCanvas: ()=>({
        canvas: document.createElement("canvas"),
        image: document.createElement("img")
    }),
    createSymbol(t, e) {
        var n = void 0 === e.maxRatio ? .1 : e.maxRatio
            , r = void 0 === e.lineWidth ? 20 : 20 * e.lineWidth
            , a = THING.Utils.parseValue(e.width, 256)
            , i = THING.Utils.parseValue(e.height, 256)
            , o = e.color ? this._colorToRgba(e.color) : "rgba(255,0,0,1)"
            , s = e.lineColor ? this._colorToRgba(e.lineColor) : "rgba(0,0,255,1)"
            , l = e.type || "circle";
        t.width = a,
        t.height = i,
        t.style.position = "absolute",
        t.style.left = "0px",
        t.style.top = "0px";
        var u = t.getContext("2d");
        u.clearRect(0, 0, t.width, t.height),
        "circle" === l ? this.createCircle(u, a, i, o, s, r, n) : "rectangle" === l ? this.createRectangle(u, a, i, o, s, r, n) : "cross" === l ? this.createCross(u, a, i, o, s, r, n) : "triangle" === l && this.createTriangle(u, a, i, o, s, r, n)
    },
    createCircle(t, e, n, r, a, i, o) {
        i = i / e > o ? o * e : i,
        t.beginPath();
        var s = e / 2
            , l = n / 2
            , u = n / 2 - 2 * o * e;
        t.arc(s, l, u, 0, 2 * Math.PI, !1),
        t.fillStyle = r,
        t.fill(),
        i && (t.strokeStyle = a,
        t.lineWidth = i,
        t.stroke())
    },
    createRectangle(t, e, n, r, a, i, o) {
        i = i / e > o ? o * e : i,
        t.beginPath();
        var s = o * e
            , l = o * n
            , u = e * (1 - 2 * o)
            , c = n * (1 - 2 * o);
        t.rect(s, l, u, c),
        t.fillStyle = r,
        t.fill(),
        i && (t.strokeStyle = a,
        t.lineWidth = i,
        t.stroke())
    },
    createCross(t, e, n, r, a, i, o) {
        i = i / e > o ? o * e : i,
        t.beginPath(),
        t.strokeStyle = a,
        t.lineWidth = i,
        t.moveTo(e / 2, n * o),
        t.lineTo(e / 2, n - n * o),
        t.moveTo(e * o, n / 2),
        t.lineTo(e - e * o, n / 2),
        i && t.stroke()
    },
    createTriangle(t, e, n, r, a, i, o) {
        i = i / e > o ? o * e : i,
        t.beginPath(),
        t.fillStyle = r,
        t.strokeStyle = a,
        t.lineWidth = i,
        t.moveTo(e / 2, n * o),
        t.lineTo(e * o, n - n * o),
        t.lineTo(e - e * o, n - n * o),
        t.lineTo(e / 2, n * o),
        t.fill(),
        i && t.stroke()
    },
    _colorToRgba(t) {
        var e = t
            , n = 1;
        return t.length && 4 === t.length && (e = [t[0], t[1], t[2]],
        n = t[3]),
        "rgba(" + e.map(t=>255 * t).toString() + "," + n + ")"
    },
    getImage(t) {
        var e = new Image;
        return e.src || (e.width = t.width,
        e.height = t.height),
        e.src = t.toDataURL("image/png"),
        e
    }
};
var ee = class extends RendererFather {
    constructor(t, e) {
        super(t, e),
        this._object = this._geoPoint = t,
        this._type = THING.Utils.parseValue(e.type, "image"),
        this._url = e.url,
        this._size = THING.Utils.parseValue(e.size, 1),
        this._vectorType = THING.Utils.parseValue(e.vectorType, "circle"),
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        this._color = CMAP.Util.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._lineWidth = THING.Utils.parseValue(e.lineWidth, 2),
        this._lineOpacity = THING.Utils.parseValue(e.lineOpacity, 1),
        this._lineColor = CMAP.Util.colorFormatNewToOld(e.lineColor, this._lineOpacity) || [1, 1, 1, 1];
        let n = "model" !== this._type
            , r = "model" !== this._type;
        if (this._keepSize = THING.Utils.parseValue(e.keepSize, n),
        this._rotateSpeed = THING.Utils.parseValue(e.rotateSpeed, 0),
        this._useSpriteMaterial = THING.Utils.parseValue(e.useSpriteMaterial, !0),
        this._alwaysOnTop = THING.Utils.parseValue(e.alwaysOnTop, r),
        this._playAnimation = THING.Utils.parseValue(e.playAnimation, !1),
        this._animationName = THING.Utils.parseValue(e.animationName, ""),
        this._animationLoopType = THING.Utils.parseValue(e.animationLoopType, THING.LoopType.Repeat),
        this._useVerticalLine = THING.Utils.parseValue(e.useVerticalLine, !1),
        this._verticalLineWidth = THING.Utils.parseValue(e.verticalLineWidth, 2),
        this._verticalLineImageUrl = e.verticalLineImageUrl,
        this._getSymbolByRenderer(),
        "vector" === this._type) {
            var a = te.createCanvas().canvas;
            te.createSymbol(a, this._symbol),
            this._canvas = a
        }
        this._useColor = THING.Utils.parseValue(e.useColor, !1)
    }
    get useVerticalLine() {
        return this._useVerticalLine
    }
    get verticalLineImageUrl() {
        return this._verticalLineImageUrl
    }
    get verticalLineWidth() {
        return this._verticalLineWidth
    }
    get playAnimation() {
        return this._playAnimation
    }
    set playAnimation(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("playAnimation", t);
        else {
            if ("model" !== this._type)
                return;
            this._playAnimation !== t && (this._playAnimation = t,
            this._playAnimation ? this._geoPoint._obj.playAnimation({
                name: this._animationName,
                loopType: this._animationLoopType
            }) : this._geoPoint._obj.stopAnimation())
        }
    }
    get animationName() {
        return this._animationName
    }
    set animationName(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("animationName", t);
        else {
            if ("model" !== this._type)
                return;
            this._animationName !== t && (this._animationName = t,
            this._playAnimation ? this._geoPoint._obj.playAnimation({
                name: this._animationName,
                loopType: this._animationLoopType
            }) : this._geoPoint._obj.stopAnimation())
        }
    }
    get animationLoopType() {
        return this._animationLoopType
    }
    set animationLoopType(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("animationLoopType", t);
        else {
            if ("model" !== this._type)
                return;
            this._animationLoopType !== t && (this._animationLoopType = t,
            this._playAnimation ? this._geoPoint._obj.playAnimation({
                name: this._animationName,
                loopType: this._animationLoopType
            }) : this._geoPoint._obj.stopAnimation())
        }
    }
    get type() {
        return this._type
    }
    set type(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("type", t);
        else {
            if (this._geoPoint._obj.destroy(),
            this._type = t,
            "vector" === t) {
                var e = te.createCanvas().canvas;
                this._getSymbolByRenderer(),
                te.createSymbol(e, this._symbol),
                this._canvas = e
            }
            this._geoPoint.init()
        }
    }
    get url() {
        return this._url
    }
    set url(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("url", t);
        else if (this._url !== t) {
            var e = this._geoPoint._obj;
            "image" === this._type ? (e.one("urlchange", function(t) {
                t.object.factor = t.image ? .5 / t.image.width : .5 / 256
            }),
            e.url = t) : "model" === this._type && e.loadModelResource({
                url: t,
                complete: function(t) {
                    const e = t.object.parent.renderer;
                    e._playAnimation && t.object.playAnimation({
                        name: e._animationName,
                        loopType: e._animationLoopType
                    })
                }
            }),
            this._url = t
        }
    }
    get keepSize() {
        return this._keepSize
    }
    set keepSize(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("keepSize", t);
        else {
            if ("model" === this._type)
                return;
            this._keepSize !== t && (this._geoPoint._obj.keepSize = t,
            this._keepSize = t)
        }
    }
    get alwaysOnTop() {
        return this._alwaysOnTop
    }
    set alwaysOnTop(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("alwaysOnTop", t) : this._alwaysOnTop !== t && (this._geoPoint._obj.style.alwaysOnTop = t,
        this._alwaysOnTop = t)
    }
    get useSpriteMaterial() {
        return this._useSpriteMaterial
    }
    get rotateSpeed() {
        return this._rotateSpeed
    }
    set rotateSpeed(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("rotateSpeed", t);
        else {
            if ("model" === this._type)
                return;
            this._rotateSpeed !== t && (this._geoPoint.setRotation(t),
            this._rotateSpeed = t)
        }
    }
    get size() {
        return this._size
    }
    set size(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("size", t) : this._size !== t && ("image" === this.type || "vector" === this.type ? this._geoPoint._obj.size = t : "model" === this.type && (Array.isArray(t) ? this._geoPoint._obj.scale = t : this._geoPoint._obj.scale = [t, t, t]),
        this._size = t)
    }
    get color() {
        return CMAP.Util.colorFormatOldToNew(this._color)
    }
    set color(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("color", t, !0, this._opacity);
        else {
            var e = CMAP.Util.colorFormatNewToOld(t, this._opacity);
            JSON.stringify(e) !== JSON.stringify(this._color) && (Array.isArray(t) && 4 === t.length && (this._opacity = t[3]),
            this._color = e,
            "vector" === this._type ? this._setSymbol({
                color: e
            }) : this._useColor && (this._object._obj.style.color = e))
        }
    }
    get useColor() {
        return this._useColor
    }
    set useColor(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useColor", t) : ("vector" !== this._type && (this._object._obj.style.color = t ? this._color : null),
        this._useColor = t)
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("opacity", t) : t !== this._opacity && (this._opacity = t,
        "vector" === this.type ? (this._color[3] = t,
        this._setSymbol({
            color: this._color
        })) : this._object._obj.style.opacity = t)
    }
    get lineColor() {
        return CMAP.Util.colorFormatOldToNew(this._lineColor)
    }
    set lineColor(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("lineColor", t, !0, this._lineOpacity);
        else {
            var e = CMAP.Util.colorFormatNewToOld(t, this._lineOpacity);
            JSON.stringify(e) !== JSON.stringify(this._lineColor) && (this._setSymbol({
                lineColor: e
            }),
            Array.isArray(t) && 4 === t.length && (this._lineOpacity = t[3]),
            this._lineColor = e)
        }
    }
    get lineOpacity() {
        return this._lineOpacity
    }
    set lineOpacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("lineOpacity", t) : t !== this._lineOpacity && (this._lineOpacity = t,
        this._lineColor[3] = t,
        this._setSymbol({
            lineColor: this._lineColor
        }))
    }
    get lineWidth() {
        return this._lineWidth
    }
    set lineWidth(t) {
        if (this._object && "FeatureLayer" === this._object.type)
            this._setFeatureLayerProperty("lineWidth", t);
        else {
            if (t > 2)
                return void THING.Utils.warn("点标记边线最大宽度为2");
            this._lineWidth !== t && (this._setSymbol({
                lineWidth: t
            }),
            this._lineWidth = t)
        }
    }
    get vectorType() {
        return this._vectorType
    }
    set vectorType(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("vectorType", t) : (this._vectorType !== t && this._setSymbol({
            vectorType: t,
            type: t
        }),
        this._vectorType = t)
    }
    _setSymbol(t) {
        if ("vector" === this.type) {
            var e = this._updateSymbol(t);
            if (this._symbol = e,
            this._canvas)
                te.createSymbol(this._canvas, e),
                this._geoPoint._obj.image = te.getImage(this._canvas);
            else {
                var n = te.createCanvas().canvas;
                te.createSymbol(n, e),
                this._geoPoint._obj.image = te.getImage(n),
                this._canvas = n
            }
        }
    }
    _updateSymbol(t) {
        var e = {};
        return Object.assign(e, this._symbol, t),
        e.vectorType && (e.type = e.vectorType),
        e
    }
    _getSymbolByRenderer() {
        this._symbol = {
            type: this._vectorType,
            color: this._color,
            lineWidth: this._lineWidth,
            lineColor: this._lineColor
        }
    }
}
;
class GeoPoint extends GeoObject {
    constructor(t) {
        super(t)
    }
    _initRenderer(t) {
        t.renderer || (t.renderer = {}),
        this._renderer = new ee(this,t.renderer)
    }
    _beforeInit() {
        this._obj = void 0
    }
    canAcceptEvent(t) {
        if ("update" === t.type)
            return !0;
        if (t.object) {
            for (let e = 0; e < t.object.parents.length; e++)
                if (t.object.parents[e].__canAcceptEvent__)
                    return t.object.parents[e];
            if (t.object.isChildOf(this))
                return !0
        }
        return !1
    }
    moveGeoPath(t) {
        var e = []
            , n = t.path;
        n.length > 1 && (n.map(function(t) {
            var n = MapUtil.convertLonlatToWorld(t);
            e.push(n)
        }),
        this.movePath({
            isEarth: !0,
            orientToPath: void 0 === t.orientToPath || t.orientToPath,
            orientToPathDegree: void 0 === t.orientToPathDegree ? 0 : t.orientToPathDegree,
            turnSpeed: t.turnSpeed,
            path: e,
            delayTime: THING.Utils.parseValue(t.delayTime, 0),
            time: THING.Utils.parseValue(t.time, 5e3),
            loopType: t.loopType || THING.LoopType.No,
            lerpType: void 0 === t.lerpType ? THING.LerpType.Linear.None : t.lerpType,
            complete: function() {
                t.complete && t.complete.call()
            }
        }))
    }
    _checkVisible() {
        this._realVisible && (this._layer.visible = ht.a.isPositionVisible(this.app, this.coordinates))
    }
    get coordinates() {
        return this._coordinates
    }
    set coordinates(t) {
        this._coordinates = t,
        this.position = MapUtil.convertLonlatToWorld(t),
        this.infoWindow && (this.infoWindow.offset = this.infoWindow._offset)
    }
    get azimuth() {
        return this._azimuth
    }
    set azimuth(t) {
        this._azimuth = t,
        this.angles = CMAP.Util.getAnglesFromLonlat(this.coordinates, this.azimuth)
    }
    get visible() {
        return this._realVisible
    }
    set visible(t) {
        this._realVisible = t,
        super.visible = t
    }
    get height() {
        return this.offsetHeight
    }
    set height(t) {
        this.offsetHeight = t
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        this.position = MapUtil.convertLonlat2World(this.coordinates, t),
        this._offsetHeight = t
    }
    get pivot() {
        return this._pivot
    }
    set pivot(t) {
        "image" !== this.renderer.type && "vector" !== this.renderer.type || (this._obj.pivot = t),
        this._pivotPixel = this._obj.pivotPixel,
        this._pivot = t
    }
    get pivotPixel() {
        return this._pivotPixel
    }
    set pivotPixel(t) {
        "image" !== this.renderer.type && "vector" !== this.renderer.type || (this._obj.pivotPixel = t),
        this._pivot = this._obj.pivot,
        this._pivotPixel = t
    }
    destroy() {
        this._renderer = null,
        this._updaterName && this.app.off("update", null, this._updaterName),
        super.destroy()
    }
    updateRenderer(t) {
        for (let e in t)
            this.renderer[e] = t[e]
    }
    setRotation(t) {
        "model" !== this.renderer.type && this._obj.style.setUVAnimation({
            rotationSpeed: t,
            uvDiscard: !0
        })
    }
    init() {
        var t = this
            , e = MapUtil.convertLonlat2World(this.coordinates, this.offsetHeight)
            , n = MapUtil._getQuaternionFromPosition(this.coordinates[0], e, this._azimuth);
        if (this.position = e,
        this.node.quaternion.set(n.x, n.y, n.z, n.w),
        "image" === this.renderer.type) {
            var a = this.app.create({
                type: "Marker",
                name: this.name + "_Marker",
                url: this.renderer.url,
                visible: !1,
                autoEnsureParentsVisible: !1,
                useSpriteMaterial: this.renderer.useSpriteMaterial,
                keepSize: this.renderer.keepSize,
                size: this.renderer.size,
                style: {
                    opacity: this.renderer.opacity,
                    alwaysOnTop: this.renderer.alwaysOnTop
                },
                parent: this,
                inheritVisible: !1,
                complete: function(e) {
                    var n = e.object
                        , r = n.parent;
                    if (n.factor = n.image ? .5 / n.image.width : .5 / 256,
                    n.visible = !0,
                    n.pivot = t.pivot,
                    t.pivotPixel && (n.pivotPixel = t.pivotPixel),
                    t._pivotPixel = n.pivotPixel,
                    r.style.renderOrder = r.renderOrder,
                    n.style.setUVAnimation({
                        rotationSpeed: t.renderer.rotateSpeed,
                        uvDiscard: !0
                    }),
                    r.renderer.useColor && r.renderer._color && (n.style.color = r.renderer._color),
                    r.renderer.postRadiusEffect && r._setPostRadiusEffect(!0),
                    r.renderer.useVerticalLine) {
                        var a = [[r.coordinates, r.coordinates]]
                            , i = {
                            imageUrl: r.renderer.verticalLineImageUrl,
                            type: "image",
                            lineType: "Plane",
                            width: r.renderer.verticalLineWidth
                        }
                            , o = r.app.create({
                            type: "GeoLine",
                            renderer: i,
                            parent: r.app.root,
                            coordinates: a,
                            heightArray: [0, r.offsetHeight]
                        });
                        r.add(o)
                    }
                    r._complete && setTimeout(()=>{
                        e.object = r,
                        r._complete.call(r, e)
                    }
                    , 1)
                }
            });
            this._obj = a,
            this._updateFunc = function(t) {
                return function() {
                    t._checkVisible.call(t)
                }
            }(this),
            this._updaterName = this.name + "_updater_" + MapUtil.getUUID(),
            this.app.on("update", this._updateFunc, this._updaterName)
        } else if ("vector" === this.renderer.type) {
            var i = this.app.create({
                type: "Marker",
                name: this.name + "_Marker",
                canvas: this.renderer._canvas,
                visible: !1,
                useSpriteMaterial: this.renderer.useSpriteMaterial,
                keepSize: this.renderer.keepSize,
                autoEnsureParentsVisible: !1,
                size: this.renderer.size,
                style: {
                    alwaysOnTop: this.renderer.alwaysOnTop
                },
                parent: this,
                inheritVisible: !1,
                complete: function(e) {
                    var n = e.object
                        , r = n.parent;
                    n.factor = n.image ? .5 / n.image.width : .5 / 256,
                    n.visible = !0,
                    n.pivot = t.pivot,
                    t.pivotPixel && (n.pivotPixel = t.pivotPixel),
                    t._pivotPixel = n.pivotPixel,
                    n.style.setUVAnimation({
                        rotationSpeed: t.renderer.rotateSpeed,
                        uvDiscard: !0
                    }),
                    r.renderer.postRadiusEffect && r._setPostRadiusEffect(!0),
                    r.style.renderOrder = r.renderOrder,
                    r._complete && setTimeout(()=>{
                        e.object = r,
                        r._complete.call(r, e)
                    }
                    , 1)
                },
                error: (t,e)=>{
                    e && (e._loadedError = !0)
                }
            });
            this._obj = i,
            this._updateFunc = function(t) {
                return function() {
                    t._checkVisible.call(t)
                }
            }(this),
            this._updaterName = this.name + "_updater_" + MapUtil.getUUID(),
            this.app.on("update", this._updateFunc, this._updaterName)
        } else if ("model" === this.renderer.type) {
            var o = [1, 1, 1];
            void 0 !== this.renderer.size && (Array.isArray(this.renderer.size) ? o = this.renderer.size : isNaN(this.renderer.size) || (o = [this.renderer.size, this.renderer.size, this.renderer.size]));
            var s = this.app.create({
                type: "Thing",
                name: this.name + "_Thing",
                url: this.renderer.url,
                scale: o,
                parent: this,
                inheritVisible: !1,
                visible: !1,
                style: {
                    opacity: this.renderer.opacity,
                    alwaysOnTop: this.renderer.alwaysOnTop
                },
                keepSize: this.renderer.keepSize,
                autoEnsureParentsVisible: !1,
                userData: {
                    SKIP_THEME: 1,
                    __isGeoPoint__: !0
                },
                complete: function(t) {
                    var e = t.object
                        , n = e.parent;
                    e.visible = !0,
                    e.node.getMaterials().map(function(t) {
                        t.transparent = !0
                    }),
                    n.renderer.postRadiusEffect && n._setPostRadiusEffect(!0),
                    n.style.renderOrder = n.renderOrder,
                    n.renderer.useColor && n.renderer._color && (e.style.color = n.renderer._color),
                    n._complete && setTimeout(()=>{
                        t.object = n,
                        n._complete.call(n, t)
                    }
                    , 1)
                },
                error: (t,e)=>{
                    e && (e._loadedError = !0)
                }
            });
            this._obj = s,
            this.renderer.playAnimation && this._obj.playAnimation({
                name: this.renderer.animationName,
                loopType: this.renderer.animationLoopType
            })
        }
        this._setMeshType()
    }
    _setMeshType() {
        "model" !== this.renderer.type && this.renderer.useSpriteMaterial ? this.meshType = "Sprite" : this.meshType = "Mesh"
    }
    _getMeshes() {
        var t = this
            , e = [];
        return "model" === this.renderer.type ? this.node.traverse(function(n) {
            n.type && n.type === t.meshType && n && e.push(n)
        }) : e.push(this.node.children[0].children[0]),
        e
    }
}
THING.factory.registerClass("GeoPoint", GeoPoint);
var GeoPoint = GeoPoint;
var Renderer_1 = class extends RendererFather {
    constructor(t, e) {
        super(t, e),
        this._lineType = e.lineType || "Line",
        this._type = e.type || "vector",
        this._imageUrl = e.imageUrl,
        this._width = THING.Utils.parseValue(e.width, 5),
        this._speed = THING.Utils.parseValue(e.speed, 0),
        this._keepSpeed = THING.Utils.parseValue(e.keepSpeed, !1),
        this._effect = THING.Utils.parseValue(e.effect, !1),
        this._textureSize = THING.Utils.parseValue(e.textureSize, M.a._defaultLineTextureSize),
        this._glowStrength = THING.Utils.parseValue(e.glowStrength, 1),
        this._sizeAttenuation = THING.Utils.parseValue(e.sizeAttenuation, !1),
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        e.color = THING.Utils.parseValue(e.color, [255, 255, 255]),
        e.color = "" === e.color ? [255, 255, 255] : e.color;
        let n = !1;
        "image" === this._type && (n = !0),
        this._blending = THING.Utils.parseValue(e.blending, n),
        this._color = CMAP.Util.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._opacity = this._color[3],
        this._growSpeed = THING.Utils.parseValue(e.growSpeed, 0),
        this._growLoop = e.growLoop === THING.LoopType.Repeat || e.growLoop,
        this._growEase = THING.Utils.parseValue(e.growEase, "Linear"),
        this._growDirection = THING.Utils.parseValue(e.growDirection, "None"),
        !0 === this._growLoop ? this._growLoop = THING.LoopType.Repeat : !1 === this._growLoop && (this._growLoop = THING.LoopType.No),
        void 0 === this._growLoop && (this._growLoop = THING.LoopType.Repeat),
        this._uvRatio = THING.Utils.parseValue(e.uvRatio, [1, 1]),
        this._textureWrap = THING.Utils.parseValue(e.textureWrap, "stretch"),
        this._colorMapping = e.colorMapping,
        this._useColor = THING.Utils.parseValue(e.useColor, !1)
    }
    get keepSpeed() {
        return this._keepSpeed
    }
    get useColor() {
        return this._useColor
    }
    set useColor(t) {
        this._useColor = t,
        this._object && "image" === this._type && (this._object._updateMaterial(),
        this._object._updateGrowSpeed(this.growSpeed, !1))
    }
    get textureSize() {
        return this._textureSize
    }
    set textureSize(t) {
        this._textureSize !== t && (this._textureSize = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.textureSize = t
        }
        ) : this._object._updateTextureSize(t)))
    }
    get growEase() {
        return this._growEase
    }
    get growDirection() {
        return this._growDirection
    }
    get uvRatio() {
        return this._uvRatio
    }
    set uvRatio(t) {
        this._uvRatio !== t && (this._uvRatio = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.uvRatio = t
        }
        ) : (this._object._updateMaterial(),
        this._object._updateGrowSpeed(this.growSpeed, !1))))
    }
    get growLoop() {
        return this._growLoop
    }
    set growLoop(t) {
        this._growLoop = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.growLoop = t
        }
        ) : this._object._updateGrowSpeed(this._object.renderer.growSpeed))
    }
    get growSpeed() {
        return this._growSpeed
    }
    set growSpeed(t) {
        this._growSpeed = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.growSpeed = t
        }
        ) : this._object._updateGrowSpeed(t))
    }
    get type() {
        return this._type
    }
    set type(t) {
        this._type !== t && (this._type = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.type = t
        }
        ) : (this._object._updateMaterial(),
        this._object._checkPartical(),
        this._object._updateGrowSpeed(this.growSpeed, !1))))
    }
    get lineType() {
        return this._lineType
    }
    set lineType(t) {
        this._lineType !== t && (this._lineType = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.lineType = t
        }
        ) : (this._object.node.children = [],
        this._object._createMesh())))
    }
    get imageUrl() {
        return this._imageUrl
    }
    set imageUrl(t) {
        this._imageUrl !== t && (this._imageUrl = t,
        this._object && "image" === this.type && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.imageUrl = t
        }
        ) : (this._object._updateMaterial(),
        this._object._updateGrowSpeed(this.growSpeed, !1))))
    }
    get width() {
        return this._width
    }
    set width(t) {
        "Line" !== this.lineType ? this._width !== t && (this._width = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.width = t
        }
        ) : (this._object._updateWidth(t),
        this._object._updateGrowSpeed(this.growSpeed, !1)))) : THING.Utils.warn("lineType为Line的线无法设置宽度")
    }
    get speed() {
        return this._speed
    }
    set speed(t) {
        this._speed !== t && (this._speed = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.speed = t
        }
        ) : (this._object.speed = t,
        this._object._updateSpeed(t))))
    }
    get effect() {
        return this._effect
    }
    set effect(t) {
        this._effect !== t && (this._effect = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.effect = t
        }
        ) : this._object._updateEffect(t, this._glowStrength)))
    }
    get glowStrength() {
        return this._glowStrength
    }
    set glowStrength(t) {
        this._glowStrength !== t && this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.glowStrength = t
        }
        ) : this._object._updateEffect(this._effect, t)),
        this._glowStrength = t
    }
    get color() {
        return CMAP.Util.colorFormatOldToNew(this._color)
    }
    set color(t) {
        var e = CMAP.Util.colorFormatNewToOld(t, this._opacity);
        JSON.stringify(e) !== JSON.stringify(this._color) && (Array.isArray(t) && 4 === t.length && (this._opacity = t[3]),
        this._color = e,
        this._object && this._object._getGeoObjectArray().forEach(n=>{
            Array.isArray(t) && 4 === t.length && (n.renderer._opacity = t[3]),
            n.renderer._color = e,
            n._updateMaterial(),
            n._updateGrowSpeed(this.growSpeed, !1)
        }
        ))
    }
    get colorMapping() {
        return this._colorMapping
    }
    set colorMapping(t) {
        this._colorMapping = t,
        this._object && "vector" === this._type && this._object._getGeoObjectArray().forEach(e=>{
            e.renderer._colorMapping = t,
            e._updateMaterial(),
            e._updateGrowSpeed(this.growSpeed, !1)
        }
        )
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        t !== this._opacity && (this._opacity = t,
        this._color[3] = t,
        this._object && this._object._getGeoObjectArray().forEach(e=>{
            e.renderer._opacity = t,
            e.renderer._color[3] = t,
            e._updateMaterial(),
            e._updateGrowSpeed(this.growSpeed, !1)
        }
        ))
    }
    get textureWrap() {
        return this._textureWrap
    }
    set textureWrap(t) {
        t !== this._textureWrap && (this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.textureWrap = t
        }
        ) : this._object._updateUV(t)),
        this._textureWrap = t)
    }
    get blending() {
        return this._blending
    }
    set blending(t) {
        t !== this._blending && (this._blending = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.blending = t
        }
        ) : (this._object._updateMaterial(),
        this._object._updateGrowSpeed(this.growSpeed, !1))))
    }
    get sizeAttenuation() {
        return this._sizeAttenuation
    }
    set sizeAttenuation(t) {
        t !== this._sizeAttenuation && (this._sizeAttenuation = t,
        this._object && ("FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.sizeAttenuation = t
        }
        ) : (this._object._updateMaterial(),
        this._object._updateGrowSpeed(this.growSpeed, !1))))
    }
}
;
class GeoLine extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t,
        this._effectName = "lineBloom"
    }
    setup(t) {
        this.isInfoShow = !1,
        this.name = t.name || "geoLine_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._isLonlat = THING.Utils.parseValue(t.isLonlat, !0),
        this._growName = "lineGrow_" + this.queryID,
        this._coordinates = t.coordinates,
        this._clampToGround = THING.Utils.parseValue(t.clampToGround, !1),
        this._userData = THING.Utils.parseValue(t.userData, {}),
        this._renderer = new Renderer_1(this,t.renderer),
        this._currentUVRatio = this.renderer.uvRatio,
        this._setOffsetHeightAndField(t),
        this.node = this._layer = new THREE.Group,
        this._particalParent = new THREE.Group,
        this.numPass = THING.Utils.parseValue(this.renderer.numPass, 1),
        this.speed = THING.Utils.parseValue(this.renderer.speed, 0),
        this._material,
        this._uvArray = [],
        this.totalLengthArray = [],
        this._meshArray = [],
        this._heightArray = t.heightArray,
        this._heightArrayField = t.heightArrayField,
        this._heightArrayFactor = THING.Utils.parseValue(t.heightArrayFactor, 1),
        this._originTextureSize = this._lastTextureSize = this.renderer.textureSize,
        this.visible = void 0 === t.visible || t.visible,
        this.renderOrder = THING.Utils.parseValue(t.renderOrder, 0),
        this.init(),
        this._afterInit({
            renderer: this.renderer
        }),
        this._setupLabel(t),
        this._setupInfoWindow(t),
        this.setupParent(t),
        this.setupUserData(),
        this.setupComplete(t)
    }
    get heightArray() {
        return this._heightArray
    }
    get heightArrayField() {
        return this._heightArrayField
    }
    set heightArrayField(t) {
        t !== this._heightArrayField && (this._heightArray = null,
        this._heightArrayField = t,
        this.node.children = [],
        this._createMesh())
    }
    get heightArrayFactor() {
        return this._heightArrayFactor
    }
    set heightArrayFactor(t) {
        t !== this._heightArrayFactor && (this._heightArray = null,
        this._heightArrayFactor = t,
        this.node.children = [],
        this._createMesh())
    }
    get clampToGround() {
        return this._clampToGround
    }
    init() {
        let t = M.a.getReferencePosition(this.coordinates, this.offsetHeight);
        this._referencePosition = t,
        this._setNodePositionAndDirection(),
        this._createMesh()
    }
    _updateTextureSize(t) {
        if (0 !== t) {
            var e = this.node.getGeometries();
            for (var n in e) {
                let r = e[n];
                if (r.attributes.uv1) {
                    if (this._lastTextureSize === t)
                        continue;
                    let e = r.attributes.uv.count
                        , n = this._lastTextureSize / t
                        , a = r.attributes.uv1.array;
                    for (let t = 0; t < 2 * e; t += 2)
                        a[t] = a[t] * n;
                    r.addAttribute("uv1", new THREE.BufferAttribute(a,2)),
                    r.attributes.uv1.needsUpdate = !0,
                    "repeat" === this.renderer.textureWrap && r.addAttribute("uv", r.attributes.uv1),
                    this._lastTextureSize = t
                }
            }
        }
    }
    _createLineSprite(t) {
        let e = Math.ceil(t / 1e3)
            , n = 0;
        for (let r = 0; r < t; r += e)
            n++;
        "vector" !== this.renderer.type || this.renderer.colorMapping || this._drawSprite(n)
    }
    _createMesh() {
        var t = [];
        THING.Utils.isNull(this._heightArray) && !THING.Utils.isNull(this._heightArrayField) && (this._heightArray = MapUtil.deepCopy(this.userData[this._heightArrayField]),
        1 !== this._heightArrayFactor && CMAP.Util._multiplyHeightArrayFactor(this._heightArray, this._heightArrayFactor));
        var e = this._createGeoObject(this.coordinates, this.renderer.lineType, this.renderer.width, this._heightArray, this._isLonlat, this.renderer.textureSize, this.clampToGround, this.offsetHeight);
        this._uvArray = e.uvArray;
        for (var n = 0; n < e.geometryArray.length; n++)
            t.push(e.geometryArray[n]);
        var a = t3djs.util.mergeBufferGeometry(t);
        0 !== this.renderer.growSpeed && 0 !== this.speed && (this.renderer._speed = 1e-5);
        var i = this.createMaterial(this.renderer);
        this._material = i;
        for (var o = 0; o < a.length; o++) {
            var s = M.a.createLineMesh(a[o], i, this.renderer);
            this._meshArray.push(s),
            this.node.add(s)
        }
        this._updateGrowSpeed(this.renderer.growSpeed),
        this.totalLengthArray = e.totalLengthArray,
        this._createLineSprite(e.geometryArray.length),
        this._setMeshType()
    }
    _setMeshType() {
        "Line" === this.renderer.lineType ? this.meshType = "LineSegments" : this.meshType = "Mesh"
    }
    _setNodePositionAndDirection() {
        let t = this._referencePosition;
        this.node.setPosition(t),
        M.a._setNodeAnglesByPosition(this.node, t),
        this._particalParent.setPosition(t),
        M.a._setNodeAnglesByPosition(this._particalParent, t)
    }
    createUV(t, e, n) {
        return M.a.createUV(t, e, n)
    }
    _updateUV(t) {
        for (let e = 0; e < this._meshArray.length; e++) {
            let n = this._meshArray[e].geometry;
            M.a._setUV(t, n)
        }
    }
    _createGeoObject(t, e, n, r, a=!0, i, o=!1, s) {
        var l = this.node;
        let u = this.renderer.textureWrap || "stretch"
            , c = M.a._processGeojson(t, "Line");
        if (r && (r = M.a._processGeojson(r, "LineHeight")),
        o) {
            const t = M.a._processHeightArrayFromCoordinates(c, r);
            c = t.lineData,
            r = t.heightArray
        }
        var h = this.createGeometry(c, l, e, n, r, a, i, s);
        let d = this.createUV(c, r, this._currentUVRatio, !0);
        if ("Line" === e)
            for (let t = 0; t < h.length; t++) {
                let e = h[t]
                    , n = d.segs[t];
                e.addAttribute("uv", new THREE.Float32BufferAttribute(n,2));
                let r = []
                    , a = d.totalLengthArray[t] / i;
                for (let t = 0; t < e.attributes.uv.count; t += 1)
                    r[2 * t] = n[2 * t] * a,
                    r[2 * t + 1] = n[2 * t + 1];
                e.addAttribute("uv2", new THREE.Float32BufferAttribute(n,2)),
                e.addAttribute("uv1", new THREE.Float32BufferAttribute(r,2)),
                M.a._setUV(u, e)
            }
        else if ("Plane" === e)
            for (let t = 0; t < h.length; t++) {
                let e = h[t]
                    , n = d.segs[t]
                    , r = new Float32Array(2 * n.length)
                    , a = new Float32Array(2 * n.length);
                for (let t = 0; t < n.length / 2; t += 1)
                    r[4 * t] = n[2 * t],
                    r[4 * t + 1] = 0,
                    r[4 * t + 2] = n[2 * t],
                    r[4 * t + 3] = 1;
                for (let t = 0; t < n.length; t++)
                    a[2 * t] = n[t],
                    a[2 * t + 1] = n[t];
                e.addAttribute("uv2", new THREE.BufferAttribute(r,2));
                let i = e.attributes.uv.array;
                e.addAttribute("uv1", new THREE.BufferAttribute(i,2)),
                M.a._setUV(u, e)
            }
        else
            for (let t = 0; t < h.length; t++) {
                let e = h[t];
                e.addAttribute("uv1", e.attributes.uv),
                M.a._setUV(u, e)
            }
        return {
            referenceNode: l,
            geometryArray: h,
            totalLengthArray: d.totalLengthArray,
            uvArray: d.uvArray
        }
    }
    createGeometry(t, e, n, r, a, i, o, s) {
        return M.a.createLineGeometry(t, e, n, r, a, i, o, s)
    }
    createMaterial() {
        return Ut.createLineMaterial(this.renderer)
    }
    updateRenderer(t) {
        super.updateRenderer(t),
        void 0 !== t.type && (this.renderer._type = t.type),
        (void 0 !== t.lineType && this.renderer.lineType !== t.lineType || t.width && t.width !== this._renderer._width && ("Route" === t.lineType || "Pipe" === t.lineType)) && (this.renderer._lineType = t.lineType,
        this._renderer._width = t.width,
        this._createMesh()),
        t.textureWrap && ("image" === t.type || "vector" === t.type && t.colorMapping) && this._updateUV(t.textureWrap),
        t.textureSize && ("image" === t.type || "vector" === t.type && t.colorMapping) && "repeat" === t.textureWrap && this._updateTextureSize(t.textureSize);
        var e = new Renderer_1(this,t);
        this._renderer = e,
        this._updateMaterial(),
        this.node.getObjectByName("particle") && (this.renderer.colorMapping ? this.node.getObjectByName("particle").visible = !1 : (this.node.getObjectByName("particle").visible = !0,
        this._updateSpeed(e.speed))),
        THING.App.current.rendererManager._mainRenderer.dirty()
    }
    _updateMaterial() {
        for (var t in this._material = this.createMaterial(),
        this.node.children) {
            this.node.children[t].material = this._material
        }
        setTimeout(function() {
            THING.App.current.rendererManager._mainRenderer.dirty("LineBloom")
        })
    }
    _drawSprite(t) {
        let e = this;
        if (this.taskName = [],
        0 !== this.renderer.speed && "Pipe" !== this.renderer.lineType)
            for (var n = this.particle = this.node.createChild("particle"), a = 0; a < t; a++) {
                var i = this.particleSystem = new THREE.GPUParticleSystem({
                    maxParticles: 30
                })
                    , o = n.createChild("particle" + a)
                    , s = t3djs.sceneManager.createEntity(i);
                o.attachObject(s),
                n.add(o);
                var l = {
                    position: new THREE.Vector3,
                    positionRandomness: 0,
                    velocity: new THREE.Vector3,
                    velocityRandomness: 0,
                    color: 16777215,
                    colorRandomness: 0,
                    turbulence: 0,
                    lifetime: 1,
                    size: 1 + this._getParticleWidth(),
                    sizeRandomness: 0
                }
                    , u = {
                    speed: this.renderer.speed,
                    per: 0,
                    particleSystem: i,
                    options: l,
                    clock: new THREE.Clock,
                    tick: 0,
                    spawnerOptions: {
                        spawnRate: 10,
                        horizontalSpeed: 1.5,
                        verticalSpeed: 1.33,
                        timeScale: 1
                    },
                    index: a,
                    update: function() {
                        var t = this.clock.getDelta() * this.spawnerOptions.timeScale;
                        if (this.tick += t,
                        this.tick < 0 && (this.tick = 0),
                        this.per += 30 * this.speed,
                        this.per > e.totalLengthArray[this.index] && (this.per = 0),
                        t > 0) {
                            var n = e._getSpritePositionByPer(this.per, this.index)
                                , r = e._particalParent.convertWorldToLocalPosition(n);
                            this.options.position.set(r[0], r[1], r[2]),
                            this.particleSystem.spawnParticle(this.options)
                        }
                        this.particleSystem.update(this.tick)
                    }
                }
                    , c = "vectorLineFlow_" + MapUtil.getUUID();
                this.taskName.push(c),
                t3djs.buffer._renderList.add(c, u)
            }
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        t !== this._offsetHeight && (this._setOffsetHeight(t),
        "GeoODLine" !== this.type && "GeoFlyLine" !== this.type && (this._caculateGeometry(this.renderer.lineType, this.renderer.width, this.heightArray, this.renderer.textureSize, this.clampToGround),
        this.renderer.textureSize && (this._lastTextureSize = this.renderer.textureSize)))
    }
    _setOffsetHeight(t) {
        super.offsetHeight = t,
        this.node.updateWorldMatrix()
    }
    _caculateGeometry(t, e, n, r, a) {
        let i = M.a._processGeojson(this.coordinates, "LINE")
            , o = this._createGeoObject(i, t, e, n, !0, r, a, this.offsetHeight)
            , s = t3djs.util.mergeBufferGeometry(o.geometryArray);
        for (let t = 0; t < this.node.children.length; t++)
            this.node.children[t].geometry = s[t]
    }
    _checkPartical() {
        for (var t in this._uvArray) {
            var e = null;
            if (this.taskName && this.taskName[t] && (e = t3djs.buffer._renderList.get(this.taskName[t])),
            "image" === this.renderer.type)
                e && (e.particleSystem.visible = !1,
                t3djs.buffer._renderList.delete(this.taskName[t]));
            else if ("vector" === this.renderer.type) {
                e ? (this._updateParticalWidth(),
                this._updateSpeed(),
                e.particleSystem.visible = !0) : this._drawSprite(this._uvArray.length);
                break
            }
        }
    }
    _updateSpeed(t) {
        if (this._originSpeed = t,
        "image" === this.renderer.type || this.renderer.colorMapping)
            this._updateMaterial();
        else if ("vector" === this.renderer.type) {
            if (t3djs.buffer._renderList.get(this.taskName[0]))
                if (0 !== t)
                    for (let n in this._uvArray) {
                        var e = t3djs.buffer._renderList.get(this.taskName[n]);
                        e && (e.speed = t,
                        e.particleSystem.visible = !0,
                        t3djs.buffer._renderList.add(this.taskName, e))
                    }
                else {
                    this.node.removeChild(this.particle);
                    for (let t in this._uvArray)
                        t3djs.buffer._renderList.delete(this.taskName[t])
                }
            else
                this._drawSprite(this._uvArray.length)
        }
    }
    _updateWidth(t) {
        "Line" !== this.renderer.lineType ? ("Plane" === this.renderer.lineType ? this._updateMaterial() : this._caculateGeometry(this.renderer.lineType, t, this.heightArray, this.renderer.textureSize, this.clampToGround),
        this._updateParticalWidth(),
        THING.App.current.rendererManager._mainRenderer.dirty("LineBloom")) : THING.Utils.warn("lineType为Line的线无法设置宽度")
    }
    _getParticleWidth() {
        return "Line" === this.renderer.lineType ? .5 : this.renderer.width / 2
    }
    _updateParticalWidth() {
        if ("vector" === this.renderer.type && this.taskName) {
            let e = this._getParticleWidth();
            for (let n = 0; n < this.taskName.length; n++) {
                var t = t3djs.buffer._renderList.get(this.taskName[n]);
                t && (t.options.size = 1 + e,
                t3djs.buffer._renderList.add(this.taskName[n], t))
            }
        }
    }
    _updateGrowSpeed(t, e=!0) {
        if (0 === t)
            return this._stopLineGrow(),
            void (!1 === this.visible && this._realVisible && (this.visible = this._realVisible));
        let n = 1;
        "image" === this.renderer.type && (n = "Plane" === this.renderer.lineType ? this._material.uniforms.map.value.repeat.x : this._material.map.repeat.x),
        e && this._updateMaterial(),
        t && (!0 === this.visible && (this.node.visible = !1,
        this._realVisible = !0),
        this._playLineGrow({
            speed: t,
            growLoop: this.renderer.growLoop,
            repeatX: n
        }))
    }
    _getSpritePositionByPer(t, e) {
        var n = [0, 0, 0]
            , r = this._uvArray[e].segs;
        for (var a in t /= this.totalLengthArray[e],
        r) {
            var i = r[a].startPoint.textureCoord[0]
                , o = r[a].endPoint.textureCoord[0];
            if (t > i && t < o) {
                var s = [r[a].endPoint[0] - r[a].startPoint[0], r[a].endPoint[1] - r[a].startPoint[1], r[a].endPoint[2] - r[a].startPoint[2]]
                    , l = (t - i) / (o - i);
                n = [r[a].startPoint[0] + l * s[0], r[a].startPoint[1] + l * s[1], r[a].startPoint[2] + l * s[2]];
                break
            }
        }
        return n
    }
    _playLineGrow(t) {
        (t = THING.Utils.parseValue(t, {})).speed = THING.Utils.parseValue(t.speed, 2),
        t.growLoop = THING.Utils.parseValue(t.growLoop, THING.LoopType.Repeat),
        t.repeatX = THING.Utils.parseValue(t.repeatX, 1);
        var e, n = this.node.getMaterials()[0];
        "Plane" === this.renderer.lineType ? (n.uniforms.useAlphaMap.value = 1,
        e = n.uniforms.alphaMap.value) : ((e = MapUtil._generateHalfTexture()).wrapS = e.wrapT = THREE.RepeatWrapping,
        e.repeat.set(.5 * t.repeatX, 1),
        n.alphaMap = e,
        n.needsUpdate = !0);
        var a = this
            , i = {
            speed: t.speed / 200,
            growLoop: t.growLoop,
            per: 0,
            update: function() {
                if (this.per += this.speed,
                this.growLoop === THING.LoopType.No) {
                    if (this.per > .5 || this.per < -.5)
                        return "Plane" === a.renderer.lineType ? (e.offset.set(.5, 0),
                        e.matrix.setUvTransform(e.offset.x, e.offset.y, e.repeat.x, e.repeat.y, e.rotation, e.center.x, e.center.y),
                        n.uniforms.uvTransform.value.copy(e.matrix)) : e.offset.set(.5, 0),
                        t3djs.buffer._renderList.delete(a._growName),
                        a.app.trigger("GeoLineGrowEnd", {
                            object: a
                        }),
                        void (0 !== a.speed && (a.renderer.speed = a.speed))
                } else
                    this.growLoop === THING.LoopType.PingPong ? t.speed > 0 ? this.per > .5 ? (this.per = .5,
                    this.speed *= -1) : this.per < 0 && (this.per = 0,
                    this.speed *= -1) : this.per < -.5 ? (this.per = -.5,
                    this.speed *= -1) : this.per > 0 && (this.per = 0,
                    this.speed *= -1) : this.per > 1 && (this.per = 0);
                !0 === a._realVisible && (a.visible = !0);
                let r = this.per;
                "Plane" === a.renderer.lineType ? (e.offset.set(-r, 0),
                e.matrix.setUvTransform(e.offset.x, e.offset.y, e.repeat.x, e.repeat.y, e.rotation, e.center.x, e.center.y),
                n.uniforms.uvTransform.value.copy(e.matrix)) : e.offset.set(-r, 0)
            }
        };
        t3djs.buffer._renderList.add(this._growName, i)
    }
    _stopLineGrow() {
        t3djs.buffer._renderList.delete(this._growName);
        var t = this._material;
        "Plane" === this.renderer.lineType ? t.uniforms.useAlphaMap.value = 0 : t.alphaMap = null
    }
}
THING.factory.registerClass("GeoLine", GeoLine);
var GeoLine = GeoLine;
class GroundGeoLine extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.isInfoShow = !1,
        this.name = t.name || "geoLineOnTerrain_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._growName = "lineOnTerrain_" + this.queryID,
        this._coordinates = t.coordinates,
        this._userData = void 0 === t.userData ? {} : t.userData,
        t.renderer = t.renderer || {},
        t.renderer.color && 4 === t.renderer.color.length && void 0 === t.opacity && (t.renderer.opacity = t.renderer.color[3]),
        this._renderer = {},
        Object.assign(this._renderer, {
            width: 30,
            color: [255, 0, 0],
            opacity: 1
        }, t.renderer);
        for (let t in this._renderer) {
            var e = "_" + t;
            this._renderer[e] = this._renderer[t],
            Object.defineProperty(this._renderer, e, {
                enumerable: !1,
                configurable: !1
            })
        }
        Object.defineProperty(this._renderer, "width", {
            enumerable: !0,
            configurable: !0,
            get: function() {
                return this._width
            },
            set: function(t) {
                this._width = t
            }
        }),
        Object.defineProperty(this._renderer, "color", {
            enumerable: !0,
            configurable: !0,
            get: function() {
                return this._color
            },
            set: function(t) {
                this._color = t
            }
        }),
        Object.defineProperty(this._renderer, "opacity", {
            enumerable: !0,
            configurable: !0,
            get: function() {
                return this._opacity
            },
            set: function(t) {
                this._opacity = t
            }
        }),
        this._maxHeight = void 0 === t.maxHeight ? 1e3 : t.maxHeight,
        this._minHeight = void 0 === t.minHeight ? 1e3 : t.minHeight,
        this._minHeight < 1e3 && (this._minHeight = 1e3),
        this.node = this._layer = new THREE.Group,
        this.param = t,
        this.visible = void 0 === t.visible || t.visible,
        this.init(),
        this.setupParent(t),
        this.setupUserData(),
        this.setupComplete(t)
    }
    init() {
        this._uniforms = {
            lineColor: {
                value: new THREE.Vector3(this.renderer.color[0],this.renderer.color[1],this.renderer.color[2])
            },
            lineOpacity: {
                value: this.renderer.opacity
            }
        };
        let t = "\n      #include <common>\n      #include <logdepthbuf_pars_vertex>\n      \n      void main() {\n        vec3 transformed = vec3( position );\n        vec4 mvPosition = vec4( transformed, 1.0 );\n        mvPosition = modelViewMatrix * mvPosition;\n        gl_Position = projectionMatrix * mvPosition;\n\n        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );\n\n        #include <logdepthbuf_vertex>\n      \n      }\n    "
            , e = "\n      #include <common>\n      #include <logdepthbuf_pars_fragment>\n      #include <dithering_pars_fragment>\n      \n      void main() {\n        #include <logdepthbuf_fragment>\n        gl_FragColor = vec4( 1.0,0.0,0.0,1.0 );\n        #include <dithering_fragment>\n      \n      }\n    "
            , n = this._material_1 = new THREE.ShaderMaterial({
            transparent: !1,
            uniforms: this._uniforms,
            vertexShader: t,
            fragmentShader: e
        });
        n.side = THREE.DoubleSide,
        n.depthTest = !1,
        n.depthFunc = THREE.LessEqualDepth,
        n.depthWrite = !1,
        n.colorWrite = !1,
        n.stencilWrite = !0,
        n.stencilWriteMask = 255,
        n.stencilFunc = THREE.AlwaysStencilFunc,
        n.stencilRef = 0,
        n.stencilFuncMask = -1,
        n.stencilFail = THREE.KeepStencilOp,
        n.stencilZFail = THREE.DecrementStencilOp,
        n.stencilZPass = THREE.DecrementWrapStencilOp,
        n.stencilFuncBack = THREE.AlwaysStencilFunc,
        n.stencilRefBack = 0,
        n.stencilFuncMaskBack = -1,
        n.stencilFailBack = THREE.KeepStencilOp,
        n.stencilZFailBack = THREE.DecrementStencilOp,
        n.stencilZPassBack = THREE.IncrementWrapStencilOp;
        let r = this._material_2 = new THREE.ShaderMaterial({
            transparent: !1,
            uniforms: this._uniforms,
            vertexShader: t,
            fragmentShader: e
        });
        r.side = THREE.DoubleSide,
        r.depthTest = !0,
        r.depthFunc = THREE.LessEqualDepth,
        r.depthWrite = !1,
        r.colorWrite = !1,
        r.stencilWrite = !0,
        r.stencilWriteMask = 255,
        r.stencilFunc = THREE.AlwaysStencilFunc,
        r.stencilRef = 0,
        r.stencilFuncMask = -1,
        r.stencilFail = THREE.KeepStencilOp,
        r.stencilZFail = THREE.KeepStencilOp,
        r.stencilZPass = THREE.IncrementWrapStencilOp,
        r.stencilFuncBack = THREE.AlwaysStencilFunc,
        r.stencilRefBack = 0,
        r.stencilFuncMaskBack = -1,
        r.stencilFailBack = THREE.KeepStencilOp,
        r.stencilZFailBack = THREE.KeepStencilOp,
        r.stencilZPassBack = THREE.DecrementWrapStencilOp;
        let a = this._material_3 = new THREE.ShaderMaterial({
            transparent: !0,
            uniforms: this._uniforms,
            vertexShader: "\n      precision highp float;\n      #include <logdepthbuf_pars_vertex>\n      #include <common>\n\n      void main(){\n\n        vec3 transformed = vec3( position );\n        vec4 mvPosition = vec4( transformed, 1.0 );\n        mvPosition = modelViewMatrix * mvPosition;\n        gl_Position = projectionMatrix * mvPosition;\n\n        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );\n\n        #include <logdepthbuf_vertex>\n      }\n    ",
            fragmentShader: "\n      precision highp float;\n      #include <common>\n      #include <logdepthbuf_pars_fragment>\n      #include <dithering_pars_fragment>\n\n      uniform vec3 lineColor;\n      uniform float lineOpacity;\n\n      void main(){\n        #include <logdepthbuf_fragment>\n        gl_FragColor = vec4(lineColor.xyz / 255.0, lineOpacity);\n        #include <dithering_fragment>\n      }\n    "
        });
        a.side = THREE.DoubleSide,
        a.depthTest = !1,
        a.depthFunc = THREE.LessEqualDepth,
        a.depthWrite = !1,
        a.colorWrite = !0,
        a.stencilWrite = !0,
        a.stencilWriteMask = 255,
        a.stencilFunc = THREE.LessEqualStencilFunc,
        a.stencilRef = 1,
        a.stencilFuncMask = 255,
        a.stencilFail = THREE.ZeroStencilOp,
        a.stencilZFail = THREE.ZeroStencilOp,
        a.stencilZPass = THREE.ZeroStencilOp,
        this._bufferGeometries = [],
        this._coordinates = M.a._processGeojson(this._coordinates, "Line"),
        this._coordinates && this._coordinates.length > 0 && this._coordinates[0].length > 0 && (this._relativePos = this._coordinates[0][0]),
        this._createLineOnTerrain(this._coordinates)
    }
    get maxHeight() {
        return this._maxHeight
    }
    get minHeight() {
        return this._minHeight
    }
    _createLineOnTerrain(t) {
        if (t) {
            for (let e = 0; e < t.length; e++)
                this._createPathShadowVolume(t[e]);
            this._mergeBufferGeometry = THREE.BufferGeometryUtils1.mergeBufferGeometries(this._bufferGeometries),
            this._renderShadowVolume(this._mergeBufferGeometry)
        }
    }
    _renderShadowVolume(t) {
        var e = new THREE.Mesh(t,this._material_1);
        e.renderOrder = CMAP.GeoLineOnTerrainRenderOrder + 1,
        e.renderLayer = 1,
        this.node.add(e);
        let n = e.clone();
        n.material = this._material_2,
        n.renderOrder = CMAP.GeoLineOnTerrainRenderOrder + 2,
        n.renderLayer = 1,
        this.node.add(n);
        let a = e.clone();
        a.material = this._material_3,
        a.renderOrder = CMAP.GeoLineOnTerrainRenderOrder + 3,
        a.renderLayer = 1,
        this.node.add(a);
        let i = MapUtil.convertLonlatToWorld(this._relativePos);
        i = new THREE.Vector3(i[0],i[1],i[2]),
        e.position.copy(i),
        n.position.copy(i),
        a.position.copy(i),
        CMAP.GeoLineOnTerrainRenderOrder = CMAP.GeoLineOnTerrainRenderOrder + 3
    }
    _createPathShadowVolume(t) {
        let e = this._maxHeight
            , n = this._minHeight
            , a = MapUtil.convertLonlatToWorld(this._relativePos);
        a = new THREE.Vector3(a[0],a[1],a[2]);
        let i = [];
        for (let e = 0; e < t.length - 1; e++) {
            let n = {
                curNode: null,
                preNode: null,
                nextNode: null,
                vertex: {
                    p_1_or_0: null,
                    p_2_or_3: null,
                    p_5_or_4: null,
                    p_6_or_7: null
                }
            }
                , a = MapUtil.convertLonlatToWorld(t[e]);
            a = new THREE.Vector3(a[0],a[1],a[2]);
            let o = MapUtil.convertLonlatToWorld(t[e + 1])
                , s = {
                start: a,
                end: o = new THREE.Vector3(o[0],o[1],o[2])
            }
                , l = null;
            if (0 !== e) {
                let n = MapUtil.convertLonlatToWorld(t[e - 1]);
                l = {
                    start: n = new THREE.Vector3(n[0],n[1],n[2]),
                    end: a
                }
            }
            let u = null;
            if (e !== t.length - 1 - 1) {
                let n = MapUtil.convertLonlatToWorld(t[e + 2]);
                u = {
                    start: o,
                    end: n = new THREE.Vector3(n[0],n[1],n[2])
                }
            }
            n.curNode = s,
            n.preNode = l,
            n.nextNode = u,
            i.push(n)
        }
        let o = []
            , s = []
            , l = this.renderer.width / 2;
        for (let t = 0; t < i.length; t++) {
            let r = i[t]
                , u = r.curNode.start
                , c = r.curNode.end
                , h = (new THREE.Vector3).addVectors(u, c).divideScalar(2).clone().normalize()
                , d = u.clone().sub(c).clone().normalize().clone().cross(h).normalize()
                , f = u.clone().add(h.clone().multiplyScalar(e))
                , p = u.clone().add(h.clone().multiplyScalar(-n))
                , m = c.clone().add(h.clone().multiplyScalar(e))
                , g = c.clone().add(h.clone().multiplyScalar(-n))
                , v = f.clone().add(d.clone().multiplyScalar(-l))
                , y = m.clone().add(d.clone().multiplyScalar(-l))
                , _ = m.clone().add(d.clone().multiplyScalar(l))
                , x = f.clone().add(d.clone().multiplyScalar(l))
                , b = p.clone().add(d.clone().multiplyScalar(-l))
                , w = g.clone().add(d.clone().multiplyScalar(-l))
                , C = g.clone().add(d.clone().multiplyScalar(l))
                , E = p.clone().add(d.clone().multiplyScalar(l))
                , T = r.nextNode;
            if (T) {
                let u = T.start
                    , c = T.end
                    , h = (new THREE.Vector3).addVectors(u, c).divideScalar(2).clone().normalize()
                    , d = u.clone().sub(c).normalize().clone().cross(h).normalize()
                    , g = u.clone().add(h.clone().multiplyScalar(e))
                    , w = u.clone().add(h.clone().multiplyScalar(-n))
                    , M = c.clone().add(h.clone().multiplyScalar(e))
                    , A = c.clone().add(h.clone().multiplyScalar(-n))
                    , P = g.clone().add(d.clone().multiplyScalar(-l))
                    , S = (M.clone().add(d.clone().multiplyScalar(-l)),
                M.clone().add(d.clone().multiplyScalar(l)),
                g.clone().add(d.clone().multiplyScalar(l)))
                    , R = (w.clone().add(d.clone().multiplyScalar(-l)),
                A.clone().add(d.clone().multiplyScalar(-l)),
                A.clone().add(d.clone().multiplyScalar(l)),
                w.clone().add(d.clone().multiplyScalar(l)),
                (new THREE.Vector3).subVectors(S, P).normalize())
                    , D = (new THREE.Vector3).subVectors(_, y).normalize()
                    , j = (new THREE.Vector3).addVectors(R, D).divideScalar(2).normalize()
                    , L = R.dot(D) / (R.length() * D.length());
                L > 1 ? L = 1 : L < -1 && (L = -1);
                let I = Math.acos(L) / 2
                    , O = l / Math.cos(I)
                    , k = m.clone().add(j.clone().multiplyScalar(O))
                    , H = m.clone().add(j.clone().multiplyScalar(-O))
                    , F = (new THREE.Vector3).subVectors(p, f).normalize()
                    , B = k.clone().add(F.clone().multiplyScalar(e + n))
                    , U = H.clone().add(F.clone().multiplyScalar(e + n))
                    , N = i[t + 1];
                if (N.vertex.p_1_or_0 = H,
                N.vertex.p_2_or_3 = k,
                N.vertex.p_5_or_4 = U,
                N.vertex.p_6_or_7 = B,
                r.preNode) {
                    let t = r.vertex.p_1_or_0
                        , e = r.vertex.p_2_or_3
                        , n = r.vertex.p_5_or_4
                        , a = r.vertex.p_6_or_7;
                    v = t.clone(),
                    x = e.clone(),
                    b = n.clone(),
                    E = a.clone()
                }
                v.clone().sub(a).toArray(o, o.length),
                H.clone().sub(a).toArray(o, o.length),
                k.clone().sub(a).toArray(o, o.length),
                x.clone().sub(a).toArray(o, o.length),
                b.clone().sub(a).toArray(o, o.length),
                U.clone().sub(a).toArray(o, o.length),
                C = B.clone().sub(a).toArray(o, o.length),
                E.clone().sub(a).toArray(o, o.length);
                let z = [0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 4, 5, 1, 4, 1, 0, 7, 2, 6, 7, 3, 2, 5, 6, 2, 5, 2, 1, 4, 3, 7, 4, 0, 3];
                for (let e = 0; e < z.length; e++)
                    z[e] = z[e] + 8 * t;
                s.push(...z)
            } else {
                if (r.preNode) {
                    let t = r.vertex.p_1_or_0
                        , e = r.vertex.p_2_or_3
                        , n = r.vertex.p_5_or_4
                        , a = r.vertex.p_6_or_7;
                    v = t.clone(),
                    x = e.clone(),
                    b = n.clone(),
                    E = a.clone()
                }
                v.clone().sub(a).toArray(o, o.length),
                y.clone().sub(a).toArray(o, o.length),
                _.clone().sub(a).toArray(o, o.length),
                x.clone().sub(a).toArray(o, o.length),
                b.clone().sub(a).toArray(o, o.length),
                w.clone().sub(a).toArray(o, o.length),
                C.clone().sub(a).toArray(o, o.length),
                E.clone().sub(a).toArray(o, o.length);
                let e = [0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 4, 5, 1, 4, 1, 0, 7, 2, 6, 7, 3, 2, 5, 6, 2, 5, 2, 1, 4, 3, 7, 4, 0, 3];
                for (let n = 0; n < e.length; n++)
                    e[n] = e[n] + 8 * t;
                s.push(...e)
            }
        }
        let u = new THREE.BufferGeometry;
        u.setAttribute("position", new THREE.Float32BufferAttribute(o,3)),
        u.setIndex(s),
        this._bufferGeometries.push(u)
    }
}
THING.factory.registerClass("GroundGeoLine", GroundGeoLine);
var GroundGeoLine = GroundGeoLine;
class GroundGeoPolygon extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.isInfoShow = !1,
        this.name = t.name || "geoPolygonOnTerrain_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._growName = "polygonOnTerrain_" + this.queryID,
        this._coordinates = t.coordinates,
        this._userData = void 0 === t.userData ? {} : t.userData,
        this._coordinates = void 0 === t.coordinates ? {} : t.coordinates,
        t.renderer = t.renderer || {},
        t.renderer.color && 4 === t.renderer.color.length && void 0 === t.opacity && (t.renderer.opacity = t.renderer.color[3]),
        this._renderer = {},
        Object.assign(this._renderer, {
            width: 30,
            color: [255, 0, 0],
            opacity: 1
        }, t.renderer);
        for (let t in this._renderer) {
            var e = "_" + t;
            this._renderer[e] = this._renderer[t],
            Object.defineProperty(this._renderer, e, {
                enumerable: !1,
                configurable: !1
            })
        }
        Object.defineProperty(this._renderer, "width", {
            enumerable: !0,
            configurable: !0,
            get: function() {
                return this._width
            },
            set: function(t) {
                this._width = t
            }
        }),
        Object.defineProperty(this._renderer, "color", {
            enumerable: !0,
            configurable: !0,
            get: function() {
                return this._color
            },
            set: function(t) {
                this._color = t
            }
        }),
        Object.defineProperty(this._renderer, "opacity", {
            enumerable: !0,
            configurable: !0,
            get: function() {
                return this._opacity
            },
            set: function(t) {
                this._opacity = t
            }
        }),
        this._maxHeight = void 0 === t.maxHeight ? 1e3 : t.maxHeight,
        this._minHeight = void 0 === t.minHeight ? 1e3 : t.minHeight,
        this._minHeight < 1e3 && (this._minHeight = 1e3),
        this.node = this._layer = new THREE.Group,
        this.param = t,
        this.visible = void 0 === t.visible || t.visible,
        this.init(),
        this.setupParent(t),
        this.setupUserData(),
        this.setupComplete(t)
    }
    init() {
        this._uniforms = {
            polygonColor: {
                value: new THREE.Vector3(this.renderer.color[0],this.renderer.color[1],this.renderer.color[2])
            },
            polygonOpacity: {
                value: this.renderer.opacity
            }
        };
        let t = "\n      #include <common>\n      #include <logdepthbuf_pars_vertex>\n      \n      void main() {\n        // vec3 transformed = vec3( position );\n        // vec4 mvPosition = vec4( transformed, 1.0 );\n        // mvPosition = modelViewMatrix * mvPosition;\n        // gl_Position = projectionMatrix * mvPosition;\n\n        gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );\n\n        #include <logdepthbuf_vertex>\n      \n      }\n    "
            , e = "\n      #include <common>\n      #include <logdepthbuf_pars_fragment>\n      #include <dithering_pars_fragment>\n      \n      void main() {\n        #include <logdepthbuf_fragment>\n        gl_FragColor = vec4( 1.0,0.0,0.0,1.0 );\n        #include <dithering_fragment>\n      \n      }\n    "
            , n = this._material_1 = new THREE.ShaderMaterial({
            transparent: !1,
            uniforms: this._uniforms,
            vertexShader: t,
            fragmentShader: e
        });
        n.side = THREE.DoubleSide,
        n.depthTest = !1,
        n.depthFunc = THREE.LessEqualDepth,
        n.depthWrite = !1,
        n.colorWrite = !1,
        n.stencilWrite = !0,
        n.stencilWriteMask = 255,
        n.stencilFunc = THREE.AlwaysStencilFunc,
        n.stencilRef = 0,
        n.stencilFuncMask = -1,
        n.stencilFail = THREE.KeepStencilOp,
        n.stencilZFail = THREE.DecrementStencilOp,
        n.stencilZPass = THREE.DecrementWrapStencilOp,
        n.stencilFuncBack = THREE.AlwaysStencilFunc,
        n.stencilRefBack = 0,
        n.stencilFuncMaskBack = -1,
        n.stencilFailBack = THREE.KeepStencilOp,
        n.stencilZFailBack = THREE.DecrementStencilOp,
        n.stencilZPassBack = THREE.IncrementWrapStencilOp;
        let r = this._material_2 = new THREE.ShaderMaterial({
            transparent: !1,
            uniforms: this._uniforms,
            vertexShader: t,
            fragmentShader: e
        });
        r.side = THREE.DoubleSide,
        r.depthTest = !0,
        r.depthFunc = THREE.LessEqualDepth,
        r.depthWrite = !1,
        r.colorWrite = !1,
        r.stencilWrite = !0,
        r.stencilWriteMask = 255,
        r.stencilFunc = THREE.AlwaysStencilFunc,
        r.stencilRef = 0,
        r.stencilFuncMask = -1,
        r.stencilFail = THREE.KeepStencilOp,
        r.stencilZFail = THREE.KeepStencilOp,
        r.stencilZPass = THREE.IncrementWrapStencilOp,
        r.stencilFuncBack = THREE.AlwaysStencilFunc,
        r.stencilRefBack = 0,
        r.stencilFuncMaskBack = -1,
        r.stencilFailBack = THREE.KeepStencilOp,
        r.stencilZFailBack = THREE.KeepStencilOp,
        r.stencilZPassBack = THREE.DecrementWrapStencilOp;
        let a = this._material_3 = new THREE.ShaderMaterial({
            transparent: !0,
            uniforms: this._uniforms,
            vertexShader: "\n      precision highp float;\n      #include <logdepthbuf_pars_vertex>\n      #include <common>\n\n      void main(){\n\n        // vec3 transformed = vec3( position );\n        // vec4 mvPosition = vec4( transformed, 1.0 );\n        // mvPosition = modelViewMatrix * mvPosition;\n        // gl_Position = projectionMatrix * mvPosition;\n\n        gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );\n\n        #include <logdepthbuf_vertex>\n      }\n    ",
            fragmentShader: "\n      precision highp float;\n      #include <common>\n      #include <logdepthbuf_pars_fragment>\n      #include <dithering_pars_fragment>\n\n      uniform vec3 polygonColor;\n      uniform float polygonOpacity;\n\n      void main(){\n        #include <logdepthbuf_fragment>\n        gl_FragColor = vec4(polygonColor.xyz / 255.0, polygonOpacity);\n        #include <dithering_fragment>\n      }\n    "
        });
        a.side = THREE.DoubleSide,
        a.depthTest = !1,
        a.depthFunc = THREE.LessEqualDepth,
        a.depthWrite = !1,
        a.colorWrite = !0,
        a.stencilWrite = !0,
        a.stencilWriteMask = 255,
        a.stencilFunc = THREE.LessEqualStencilFunc,
        a.stencilRef = 1,
        a.stencilFuncMask = 255,
        a.stencilFail = THREE.ZeroStencilOp,
        a.stencilZFail = THREE.ZeroStencilOp,
        a.stencilZPass = THREE.ZeroStencilOp,
        this._coordinates = M.a._processGeojson(this._coordinates, "Polygon"),
        this._createPolygonOnTerrain(this._coordinates)
    }
    get maxHeight() {
        return this._maxHeight
    }
    get minHeight() {
        return this._minHeight
    }
    _createPolygonOnTerrain(t) {
        t && this._createPolygonShadowVolume(t)
    }
    _renderShadowVolume(t, e) {
        var n = new THREE.Mesh(t,this._material_1);
        n.renderOrder = CMAP.GeoLineOnTerrainRenderOrder + 1,
        n.renderLayer = 1,
        e.add(n);
        let r = n.clone();
        r.material = this._material_2,
        r.renderOrder = CMAP.GeoLineOnTerrainRenderOrder + 2,
        r.renderLayer = 1,
        e.add(r);
        let a = n.clone();
        a.material = this._material_3,
        a.renderOrder = CMAP.GeoLineOnTerrainRenderOrder + 3,
        a.renderLayer = 1,
        e.add(a),
        this.node.add(e),
        CMAP.GeoLineOnTerrainRenderOrder = CMAP.GeoLineOnTerrainRenderOrder + 3
    }
    _createPolygonShadowVolume(t) {
        let e = []
            , n = M.a.processPolygon(t)
            , r = new THREE.Group;
        r.setPosition(n.centerWorld),
        r.setDirection(n.centerWorld, 2, [0, 1, 0]),
        r.updateMatrixWorld();
        let a = r;
        var i = M.a.createPolygonGeometry(t, a, 0, this._maxHeight, void 0, void 0, !1, void 0, !0);
        e = e.concat(i.polygonGeometry);
        var o = M.a.createPolygonGeometry(t, a, 0, -this._minHeight, void 0, void 0, !1, void 0, !0);
        e = e.concat(o.polygonGeometry);
        let s = THREE.BufferGeometryUtils1.mergeBufferGeometries(e);
        this._renderShadowVolume(s, r)
    }
    _processGeometryData(t, e) {
        let n = t.indices
            , r = t.attributes.position.values
            , a = t.attributes.normal.values
            , i = new Float32Array(r.length)
            , o = new Float32Array(a.length)
            , s = new Float32Array(r.length)
            , l = 0;
        0 !== e.position.x && 0 !== e.position.y && 0 !== e.position.z && (l = CMAP.Util.convertWorldToLonlat(e.position)[2]);
        for (let t = 0; t < r.length / 3; t++) {
            let n = [r[3 * t], r[3 * t + 1], r[3 * t + 2]]
                , a = e.convertWorldToLocalPosition(n)
                , u = new THREE.Vector3(n[0],n[1],n[2])
                , c = new THREE.Matrix4;
            c.getInverse(e.matrix);
            let h = u.transformDirection(c);
            i[3 * t] = a[0],
            i[3 * t + 1] = a[1] + l,
            i[3 * t + 2] = a[2],
            o[3 * t] = h.x,
            o[3 * t + 1] = h.y,
            o[3 * t + 2] = h.z;
            let d = CMAP.Util.convertWorldToLonlat(n);
            s[3 * t] = d[0],
            s[3 * t + 1] = d[1],
            s[3 * t + 2] = d[2]
        }
        let u = new THREE.BufferGeometry;
        return u.setIndex(new THREE.BufferAttribute(n,1)),
        u.addAttribute("position", new THREE.BufferAttribute(i,3)),
        u.addAttribute("coordinates", new THREE.BufferAttribute(s,3)),
        u.groups = t.groups,
        u
    }
}
THING.factory.registerClass("GroundGeoPolygon", GroundGeoPolygon);
var GroundGeoPolygon = GroundGeoPolygon;
class GeoLine extends GeoLine {
    constructor(t) {
        super(t),
        this.app = t,
        this._pointList = []
    }
    setup(t) {
        this.yScale = t.yScale || 1,
        t.isLonlat = !1,
        super.setup(t)
    }
    set pointList(t) {
        this._pointList = t
    }
    get pointList() {
        return this._pointList.flat()
    }
    createUV(t, e) {
        return M.a.createUV(this._pointList, void 0, !1)
    }
    setPointList(t, e) {
        if (Math.abs(t[0][0] - t[1][0]) > 180)
            for (let e = 0; e < t.length; e++)
                t[e][0] < 0 && (t[e][0] += 360);
        if (void 0 === e && (e = [0, 0]),
        this._startPos = CMAP.Util.convertLonlatToWorld(t[0], e[0]),
        this._endPos = CMAP.Util.convertLonlatToWorld(t[1], e[1]),
        this._centerPos = [(this._startPos[0] + this._endPos[0]) / 2, (this._startPos[1] + this._endPos[1]) / 2, (this._startPos[2] + this._endPos[2]) / 2],
        this._distance = THING.Math.getDistance(this._startPos, this._endPos),
        this._sphereDistance = CMAP.Util.getSphericalDistance(t[0], t[1]),
        this._controlPointHeight = .3530730909813764 * this._distance,
        0 === e[0] && 0 === e[1]) {
            const e = [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
                , n = CMAP.Util.convertLonlatToWorld(e)
                , r = THING.Math.getDistance(n, this._centerPos);
            this._controlPointHeight = .8 * r + this._sphereDistance / 3,
            this._middleControlPointPos = CMAP.Util.convertLonlatToWorld(e, this._controlPointHeight)
        } else {
            const e = (new THREE.Plane).setFromCoplanarPoints(new THREE.Vector3(0,0,0), new THREE.Vector3(this._startPos[0],this._startPos[1],this._startPos[2]), new THREE.Vector3(this._endPos[0],this._endPos[1],this._endPos[2])).normal
                , n = CMAP.Util.convertLonlatToWorld(t[0])
                , r = CMAP.Util.convertLonlatToWorld(t[1])
                , a = THING.Math.getDistance(n, r)
                , i = Math.acos(a / this._distance)
                , o = new THREE.Vector3(this._centerPos[0],this._centerPos[1],this._centerPos[2]).applyAxisAngle(e, i).normalize().multiplyScalar(this._controlPointHeight)
                , s = new THREE.Vector3(this._centerPos[0],this._centerPos[1],this._centerPos[2]).add(o);
            this._middleControlPointPos = s.toArray()
        }
        this._sphereDistance / this._distance < 1.3 && (this._pointList = CMAP.Util.caculateBezier(this._startPos, this._middleControlPointPos, this._endPos, 50),
        this._topPos = this._pointList[25])
    }
    _caculateGeometry(t, e, n, r) {
        this._setNodePositionAndDirection();
        let a = this._createGeoObject(this.coordinates, t, e, n, this._isLonlat, r)
            , i = t3djs.util.mergeBufferGeometry(a.geometryArray);
        for (let t = 0; t < this.node.children.length; t++)
            this.node.children[t].geometry = i[t]
    }
    _setNodePositionAndDirection() {
        if (void 0 === this._heightArray && (this._heightArray = [0, 0]),
        this.setPointList(this.coordinates, this.heightArray),
        0 === this._layer.position.x && 0 === this._layer.position.y && 0 === this._layer.position.z) {
            var t = new THREE.Object3D
                , e = t3djs.math.normalizeVector([this._centerPos[0], this._centerPos[1], this._centerPos[2]]);
            e = new THREE.Vector3(e[0],e[1],e[2]);
            var n = new THREE.Quaternion;
            n.setFromUnitVectors(new THREE.Vector3(0,1,0), e),
            t.setRotationFromQuaternion(n);
            var r = t3djs.math.subtractVectors(this._startPos, this._endPos);
            (r = new THREE.Vector3(r[0],r[1],r[2])).normalize(),
            t.translate([0, 0, 1]);
            var a = new THREE.Vector3(t.position.x,t.position.y,t.position.z);
            a.normalize();
            var i = (new THREE.Vector3).crossVectors(a, r);
            i.normalize();
            var o = r.angleTo(a);
            i.x * e.x < 0 && (o = 2 * Math.PI - o),
            this._layer.setRotationFromQuaternion(n),
            this._layer.rotateY(o),
            this._layer.setPosition(this._centerPos),
            this._layer.translate([0, this.offsetHeight, 0]),
            this._particalParent.setRotationFromQuaternion(n),
            this._particalParent.rotateY(o),
            this._particalParent.setPosition(this._centerPos),
            this._particalParent.translate([0, this.offsetHeight, 0])
        }
        let s = null;
        if (this._sphereDistance / this._distance < 1.3)
            ;
        else {
            const t = (s = new THREE.CubicBezierCurve3(new THREE.Vector3(0,0,-.5),new THREE.Vector3(0,.7,-.7),new THREE.Vector3(0,.7,.7),new THREE.Vector3(0,0,.5))).getPoints(50)
                , e = new THREE.Object3D;
            e.applyMatrix4(this._layer.matrix),
            e.scale.set(this._distance, this._distance, this._distance),
            e.updateMatrixWorld();
            for (let n = 0; n < t.length; n++)
                this._pointList.push(e.localToWorld(t[n]).toArray());
            this._topPos = this._pointList[25]
        }
    }
    createGeometry(t, e, n, a, i, o, s) {
        for (var l = [], u = 0; u < this._pointList.length; u++) {
            for (var c = this._pointList[u], h = [], d = [], f = 0; f < c.length; f++) {
                var p, m = c[f];
                p = o ? MapUtil.convertLonlatToWorld(m) : m;
                var g = e.convertWorldToLocalPosition(p);
                h.push(g[0]),
                h.push(g[1]),
                h.push(g[2]),
                f < c.length - 1 && (d.push(f),
                d.push(f + 1))
            }
            var v = {
                position: h,
                index: d
            }
                , y = M.a._getT3dLineType(n)
                , _ = t3djs.util.createGeometry(y, v, {
                line: {
                    width: a,
                    up: [0, 1, 0],
                    uvRatio: 1,
                    uStep: s
                }
            });
            l.push(_)
        }
        return l
    }
}
THING.factory.registerClass("GeoFlyLine2", GeoLine);
var GeoLine = GeoLine;
class GeoFlyLine extends GeoLine {
    constructor(t) {
        super(t)
    }
    setPointList(t, e) {
        const n = MapUtil.deepCopy(t);
        if (Math.abs(n[0][0] - n[1][0]) > 180)
            for (let t = 0; t < n.length; t++)
                n[t][0] < 0 && (n[t][0] += 360);
        void 0 === e && (e = [0, 0]),
        this._startPos = CMAP.Util.convertLonlatToWorld(n[0], e[0]),
        this._endPos = CMAP.Util.convertLonlatToWorld(n[1], e[1]),
        this._centerPos = [(this._startPos[0] + this._endPos[0]) / 2, (this._startPos[1] + this._endPos[1]) / 2, (this._startPos[2] + this._endPos[2]) / 2],
        this._distance = THING.Math.getDistance(this._startPos, this._endPos),
        this._sphereDistance = CMAP.Util.getSphericalDistance(n[0], n[1])
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        t !== this._offsetHeight && (this._offsetHeight = t,
        this._caculateGeometry(this.renderer.lineType, this.renderer.width, this.heightArray, this.renderer.textureSize))
    }
    get heightArray() {
        return this._heightArray
    }
    set heightArray(t) {
        CMAP.Util.isArrayEqual(t, this._heightArray) || (this._heightArray = t,
        this._caculateGeometry(this.renderer.lineType, this.renderer.width, this.heightArray, this.renderer.textureSize))
    }
    _caculateGeometry(t, e, n, r) {
        this._resetFlyLine(),
        super._caculateGeometry(t, e, n, r)
    }
    _resetFlyLine() {
        this.position = [0, 0, 0],
        this.scale = [1, 1, 1],
        this.angles = [0, 0, 0],
        this.pointList = []
    }
    _setNodePositionAndDirection() {
        void 0 === this._heightArray && (this._heightArray = [0, 0]);
        const t = this._heightArray.slice(0);
        void 0 !== this.offsetHeight && (t[0] += this.offsetHeight,
        t[1] += this.offsetHeight),
        this.pointList = this._calcuPointListResult(this.coordinates, t, !0),
        this._setTopPos(51)
    }
    _setTopPos(t) {
        const e = Math.floor(this._pointList.length / 2)
            , n = this._pointList[e]
            , r = n.length / t
            , a = Math.floor(r / 2) * t + Math.floor(t / 2);
        this._topPos = n[a]
    }
    _calcuPointListResult(t, e, n) {
        if (JSON.stringify(t).includes("[[[")) {
            var r = [];
            const n = Math.floor(t.length / 2);
            for (var a = 0; a < t.length; a++) {
                const i = n === a;
                let o = this._calcuPointListResult(t[a], e, i);
                r.push(o[0])
            }
            return r
        }
        var i = [];
        const o = Math.floor((t.length - 1) / 2);
        for (let r = 0; r < t.length - 1; r++) {
            var s = t[r]
                , l = t[r + 1];
            const a = r === o && n;
            var u = this._calcuPointList([s, l], e, a);
            u && (i = i.concat(u))
        }
        return [i]
    }
    _calcuPointList(t, e, n) {
        if (t && MapUtil.isArrayEqual(t[0], t[1]))
            return;
        this.setPointList(t, e);
        const a = new THREE.Group
            , i = (new THREE.Plane).setFromCoplanarPoints(new THREE.Vector3(0,0,0), new THREE.Vector3(this._startPos[0],this._startPos[1],this._startPos[2]), new THREE.Vector3(this._endPos[0],this._endPos[1],this._endPos[2])).normal;
        let o = t3djs.math.subtractVectors(this._startPos, this._endPos);
        (o = new THREE.Vector3(o[0],o[1],o[2])).normalize();
        let s = o.clone().applyAxisAngle(i, Math.PI / 2).normalize();
        const l = (new THREE.Vector3).crossVectors(s, o);
        l.normalize();
        const u = (new THREE.Matrix4).makeBasis(l, s, o);
        u.setPosition(this._centerPos[0], this._centerPos[1], this._centerPos[2]),
        a.applyMatrix4(u),
        a.updateMatrixWorld(),
        n && (this.node.applyMatrix4(u),
        this.node.updateMatrixWorld()),
        this._particalParent.applyMatrix4(u),
        this._particalParent.updateMatrixWorld();
        let c = null;
        if (this._sphereDistance / this._distance < 1.3) {
            let t = new THREE.Vector3(0,0,-.5)
                , e = new THREE.Vector3(0,.7,0)
                , n = new THREE.Vector3(0,0,.5);
            c = new THREE.QuadraticBezierCurve3(n,e,t)
        } else {
            let t = new THREE.Vector3(0,0,-.5)
                , e = new THREE.Vector3(0,.7,-.7)
                , n = new THREE.Vector3(0,.7,.7)
                , r = new THREE.Vector3(0,0,.5);
            c = new THREE.CubicBezierCurve3(r,n,e,t)
        }
        const h = c.getPoints(50)
            , d = new THREE.Object3D;
        d.applyMatrix4(a.matrix),
        d.scale.set(this._distance, this._distance, this._distance),
        d.updateMatrixWorld();
        const f = [];
        for (let t = 0; t < h.length; t++)
            f.push(d.localToWorld(h[t]).toArray());
        return this._topPos = f[25],
        f
    }
    _setupInfoWindow(t) {
        if ("GeoFlyLine" === this.type && t.infoWindow && !t.infoWindow._originOffset && this._topPos) {
            const e = CMAP.Util.convertWorldToLonlat(this._topPos)[2]
                , n = CMAP.Util.convertWorldToLonlat(this.position)[2];
            t.infoWindow.offset = [0, e - n, 0]
        }
        super._setupInfoWindow(t)
    }
}
THING.factory.registerClass("GeoFlyLine", GeoFlyLine);
var GeoFlyLine = GeoFlyLine;
class GeoODLine extends GeoFlyLine {
    constructor(t) {
        super(t)
    }
    setup(t) {
        super.setup(t)
    }
    getControlPoint(t, e, n) {
        var r, a, i = t[0], o = t[1], s = e[0], l = e[1];
        return i === s && o === l ? [i, o] : (s >= i && l >= o ? (r = l === o ? (i + s) / 2 : (i + s) / 2 - n / Math.sqrt(Math.pow((s - i) / (l - o), 2) + 1),
        a = s === i ? (o + l) / 2 : (o + l) / 2 + n / Math.sqrt(Math.pow((l - o) / (s - i), 2) + 1)) : s >= i && l < o ? (r = (i + s) / 2 + n / Math.sqrt(Math.pow((s - i) / (l - o), 2) + 1),
        a = s === i ? (o + l) / 2 : (o + l) / 2 + n / Math.sqrt(Math.pow((l - o) / (s - i), 2) + 1)) : s < i && l < o ? (r = (i + s) / 2 + n / Math.sqrt(Math.pow((s - i) / (l - o), 2) + 1),
        a = (o + l) / 2 - n / Math.sqrt(Math.pow((l - o) / (s - i), 2) + 1)) : s < i && l >= o && (r = l === o ? (i + s) / 2 : (i + s) / 2 - n / Math.sqrt(Math.pow((s - i) / (l - o), 2) + 1),
        a = (o + l) / 2 - n / Math.sqrt(Math.pow((l - o) / (s - i), 2) + 1)),
        [r, a])
    }
    setPointList(t) {
        var e = CMAP.Util.convertLonlatToWebMercator(t[0])
            , n = CMAP.Util.convertLonlatToWebMercator(t[1])
            , r = CMAP.Util.getSphericalDistance(t[0], t[1])
            , a = this.getControlPoint(e, n, r / 5)
            , i = t3djs.math.caculateBezier([e[0], 0, e[1]], [a[0], 0, a[1]], [n[0], 0, n[1]])
            , o = new Array;
        i.map(function(t) {
            var e = CMAP.Util.convertWebMercatorToLonlat([t[0], t[2]])
                , n = CMAP.Util.convertLonlatToWorld(e);
            o.push(n)
        }),
        this._pointList = o;
        var s = CMAP.Util.convertLonlatToWorld([(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]);
        this._centerPos = s
    }
    _setNodePositionAndDirection() {
        this._pointList = this._calcuPointListResult(this.coordinates),
        this._setCenterPos(51),
        this._layer.setPosition(this._centerPos),
        this._layer.setDirection(this._centerPos, 2, [0, 1, 0]),
        this._layer.translate([0, this.offsetHeight, 0]),
        this._particalParent.setPosition(this._centerPos),
        this._particalParent.setDirection(this._centerPos, 2, [0, 1, 0]),
        this._particalParent.translate([0, this.offsetHeight, 0])
    }
    _setCenterPos(t) {
        const e = Math.floor(this._pointList.length / 2)
            , n = this._pointList[e]
            , r = n.length / t
            , a = Math.floor(r / 2) * t + Math.floor(t / 2);
        this._centerPos = n[a]
    }
    _calcuPointListResult(t) {
        if (JSON.stringify(t).includes("[[[")) {
            var e = [];
            for (let n = 0; n < t.length; n++) {
                const r = this._calcuPointListResult(t[n]);
                e.push(r[0])
            }
            return e
        }
        var n = [];
        for (let e = 0; e < t.length - 1; e++) {
            var r = t[e]
                , a = t[e + 1];
            this.setPointList([r, a]),
            n = n.concat(this._pointList)
        }
        return [n]
    }
}
THING.factory.registerClass("GeoODLine", GeoODLine);
class GeoBuilding extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.isInfoShow = !1,
        this._featureLayerId = t._featureLayerId,
        this._conditionStr = t._conditionStr,
        this.name = t.name || "geoBuilding_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._coordinates = t.coordinates,
        this._userData = THING.Utils.parseValue(t.userData, {}),
        this._renderer = new Renderer(this,t.renderer),
        this._clampToGround = THING.Utils.parseValue(t.clampToGround, !0),
        this._setOffsetHeightAndField(t),
        this._layer = new THREE.Group,
        this.node = this._layer,
        this._node = new THREE.Object3D,
        this._node.add(this._layer),
        this._pickWithGeometryID = void 0 !== t.pickWithGeometryID && t.pickWithGeometryID,
        this.referencePosition = [0, 0, 0],
        this._material = void 0,
        this._setExtrudeHeightAndField(t),
        this._originTextureSize = this._lastRepeatTextureSize = this._lastRepeatYTextureSize = this.renderer.textureSize,
        this._originWindowTextureSize = this._lastWindowTextureSize = THING.Utils.parseValue(this.renderer.windowTextureSize, M.a._defuaultBuildingWindowTextureSize),
        this.init(),
        this.setupUserData(t),
        this._setupLabel(t),
        this._setupInfoWindow(t),
        this.setupComplete(t)
    }
    _setExtrudeHeightAndField(t) {
        this._extrudeField = t.renderer.extrudeField || t.extrudeField || "",
        this._extrudeFactor = t.renderer.extrudeFactor || t.extrudeFactor || 1,
        this._defaultHeight = .1;
        let e = t.height || t.extrudeHeight || t.renderer.extrudeHeight
            , n = this._defaultHeight;
        this._extrudeField && (n = this._userData[this.extrudeField],
        n *= this.extrudeFactor - 0),
        e && !isNaN(e) && e > 0 && (n = e),
        n && !isNaN(n) || (n = this._defaultHeight),
        this.height = this._originHeight = n
    }
    on() {
        if (arguments.length < 2)
            THING.Utils.log("参数不合法");
        else {
            for (var t in arguments) {
                let e = arguments[t];
                if (THING.Utils.isFunction(e)) {
                    arguments[t] = function(t) {
                        var n = 0;
                        CMAP.getCurrentMap().pickIdBuffer.forEach(function(e) {
                            e.node === t.object.node && (n = t.id - e.start - CMAP.pickIdStartNum)
                        }),
                        t.coordinates = t.object.coordinates[n],
                        t.height = t.object.height,
                        e.call(t.object, t)
                    }
                }
            }
            super.on.apply(this, arguments)
        }
    }
    setupUserData(t) {
        t || (t = {}),
        this._pickWithGeometryID && (t.withGeometryIDAttributes = !0),
        super.setupUserData(t)
    }
    _setScale(t) {
        let e = this.scale[1];
        super._setScale(t),
        this._setRepeatUV(t[1], e)
    }
    _setRepeatUV(t, e) {
        var n = this.node.getMeshes();
        for (var r in n) {
            let i = n[r].geometry.groups[1]
                , o = 2 * i.start
                , s = 2 * i.count
                , l = t / e
                , u = n[r].geometry;
            if (u.attributes.uv1 && u.attributes.uv3 && u.attributes.uv8) {
                let t = n[r].geometry.attributes.uv1.array
                    , e = n[r].geometry.attributes.uv3.array
                    , i = n[r].geometry.attributes.uv8.array;
                for (var a = o; a < o + s; a += 2)
                    t[a + 1] = t[a + 1] * l,
                    e[a + 1] = e[a + 1] * l,
                    i[a + 1] = i[a + 1] * l;
                u.addAttribute("uv1", new THREE.BufferAttribute(t,2)),
                u.addAttribute("uv3", new THREE.BufferAttribute(e,2)),
                u.addAttribute("uv8", new THREE.BufferAttribute(i,2)),
                this.renderer.textureWrap === CMAP.TextureWrapMode.RepeatY ? (u.addAttribute("uv", new THREE.BufferAttribute(t,2)),
                u.attributes.uv.needsUpdate = !0) : this.renderer.textureWrap === CMAP.TextureWrapMode.Repeat && (u.addAttribute("uv", new THREE.BufferAttribute(e,2)),
                u.attributes.uv.needsUpdate = !0)
            }
        }
    }
    _updateBuildingWindowTexture(t, e) {
        if (Array.isArray(t) && Array.isArray(e) && t.length === e.length && 2 === t.length && (t[0] !== e[0] || t[1] !== e[1])) {
            var n = this.node.getMeshes();
            for (var r in n) {
                let i = n[r].geometry.groups[1]
                    , o = 2 * i.start
                    , s = 2 * i.count
                    , l = e[0] / t[0]
                    , u = e[1] / t[1]
                    , c = n[r].geometry;
                if (c.attributes.uv8) {
                    let t = n[r].geometry.attributes.uv8.array;
                    for (var a = o; a < o + s; a += 2)
                        t[a] = t[a] * l,
                        t[a + 1] = t[a + 1] * u;
                    c.addAttribute("uv8", new THREE.BufferAttribute(t,2))
                }
            }
        }
    }
    _updateBuildingTextureSize(t) {
        if (Array.isArray(t) && 2 === t.length) {
            var e = this.node.getMeshes();
            for (var n in e) {
                let r = e[n].geometry.groups[1]
                    , a = 2 * r.start
                    , i = 2 * r.count
                    , o = e[n].geometry;
                if (this.renderer.textureWrap === CMAP.TextureWrapMode.Repeat && o.attributes.uv3) {
                    if (this._lastRepeatTextureSize[0] === t[0] && this._lastRepeatTextureSize[1] === t[1])
                        continue;
                    let r = this._lastRepeatTextureSize[0] / t[0]
                        , s = this._lastRepeatTextureSize[1] / t[1]
                        , l = e[n].geometry.attributes.uv3.array;
                    for (let t = a; t < a + i; t += 2)
                        l[t] = l[t] * r,
                        l[t + 1] = l[t + 1] * s;
                    o.addAttribute("uv3", new THREE.BufferAttribute(l,2)),
                    o.addAttribute("uv", new THREE.BufferAttribute(l,2)),
                    o.attributes.uv.needsUpdate = !0,
                    this._lastRepeatTextureSize = t
                }
                if (this.renderer.textureWrap === CMAP.TextureWrapMode.RepeatY && o.attributes.uv1) {
                    if (this._lastRepeatYTextureSize[0] === t[0] && this._lastRepeatYTextureSize[1] === t[1])
                        continue;
                    let r = this._lastRepeatYTextureSize[1] / t[1]
                        , s = e[n].geometry.attributes.uv1.array;
                    for (let t = a; t < a + i; t += 2)
                        s[t + 1] = s[t + 1] * r;
                    o.addAttribute("uv1", new THREE.BufferAttribute(s,2)),
                    o.addAttribute("uv", new THREE.BufferAttribute(s,2)),
                    o.attributes.uv.needsUpdate = !0,
                    this._lastRepeatYTextureSize = t
                }
            }
        } else
            THING.Utils.warn("材质尺寸参数不合法")
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        if (this._arrayOffsetHeight)
            this._offsetHeight = t,
            this._arrayOffsetHeight = null,
            this._updateOffsetHeight(t);
        else if (t !== this._offsetHeight) {
            var e = t - this._offsetHeight;
            this.translate([0, e, 0]),
            this._offsetHeight = t
        }
    }
    get extrudeHeight() {
        return this.height
    }
    set extrudeHeight(t) {
        this.height = t
    }
    get height() {
        return this._height
    }
    set height(t) {
        var e = ((t = t || this._defaultHeight) - 0) / this._originHeight;
        this.scale = [1, e, 1],
        this._height = t - 0
    }
    get extrudeFactor() {
        return this._extrudeFactor
    }
    get extrudeField() {
        return this._extrudeField
    }
    set extrudeFactor(t) {
        this.updateExtrudeFactor(t),
        this._extrudeFactor = t,
        this.renderer._extrudeFactor = t
    }
    set extrudeField(t) {
        this.updateExtrudeField(t),
        this._extrudeField = t,
        this.renderer._extrudeField = t
    }
    init() {
        this._polygonInfo = M.a.processPolygon(this._coordinates, 0, "BUILDING"),
        this._multiPolygonCoordinates = this._polygonInfo.coordinates,
        this.referencePosition = MapUtil.convertLonlatToWorld(this._polygonInfo.center, this.offsetHeight);
        var t = MapUtil.position2angles(this.referencePosition)
            , e = MapUtil.anglesToQuaternion(t);
        this.renderer._quaternion = e.inverse();
        for (var n = this.createGeometry(this._multiPolygonCoordinates, this.referencePosition, this.height, this._arrayOffsetHeight ? this._arrayOffsetHeight : this.offsetHeight), a = this.createMaterial(), i = 0; i < n.length; i++) {
            var o = this.createMesh(n[i], a, this.renderer);
            "cool" === this.renderer.type && this.renderer.effect && this.app.effectManager.setEffect(o, "glow", this.renderer.glowStrength),
            this._layer.add(o)
        }
        this._layer.setPosition(this.referencePosition),
        M.a._setNodeAnglesByPosition(this._layer, this._polygonInfo.centerWorld)
    }
    _setArrayOffsetHeight(t) {
        this._updateOffsetHeight(t)
    }
    _updateOffsetHeight(t) {
        var e = this.createGeometry(this._multiPolygonCoordinates, this.referencePosition, this.height, t);
        for (let t = 0; t < this._getMeshes().length; t++)
            M.a._updateBuildingTextureWrap(e[t], this.renderer.textureWrap),
            this._getMeshes()[t].geometry = e[t],
            this._getMeshes()[t].geometry.needsUpdate = !0
    }
    createGeometry(t, e, n, r) {
        const a = this._clampToGround;
        var i, o = M.a.createBuilding(t, n, e, "BUILDING", this.renderer.textureSize, void 0, r, a, this.renderer.windowTextureSize).geometryArray, s = CMAP.getCurrentMap().pickIdBuffer;
        i = 0 === s.length ? {
            start: 0,
            count: 0,
            node: this.node
        } : {
            start: s[s.length - 1].start + s[s.length - 1].count,
            count: 0,
            node: this.node
        },
        s.push(i);
        for (var l = 0; l < o.length; l++) {
            var u = o[l].attributes.position.count
                , c = new Float32Array(u)
                , h = i.start + l;
            c.fill(CMAP.pickIdStartNum + h),
            o[l].addAttribute("id", new THREE.BufferAttribute(c,1)),
            s[s.length - 1].count++
        }
        var d = t3djs.util.mergeBufferGeometry(o, 5e4, !0);
        for (let t = 0; t < d.length; t++) {
            var f = d[t];
            f.addAttribute("uv1", f.attributes.uv, 2),
            f.attributes.uv1.name = "repeatY",
            f.attributes.uv2.name = "stretch",
            f.attributes.uv3.name = "repeat"
        }
        return d
    }
    createMesh(t, e, n) {
        return M.a.createBuildingMesh(t, e, n)
    }
    createMaterial() {
        var t = this.renderer
            , e = JSON.parse(JSON.stringify(t.toObject()));
        return e.quaternion = this.renderer._quaternion,
        Ut.createBuildingMaterial(e, this.extrudeHeight)
    }
    updateMaterial() {
        var t = this.createMaterial()
            , e = this._layer.getMeshes();
        for (var n in e) {
            e[n].material = t
        }
        setTimeout(function() {
            THING.App.current.rendererManager._mainRenderer.dirty("Glow")
        }, 0)
    }
    updateRenderer(t) {
        "cool" !== t.type && (t.effect = !1),
        super.updateRenderer(t);
        var e = this.renderer._quaternion
            , n = new Renderer(this,t);
        n._quaternion = e,
        MapUtil._needsUpdateExtrudeField(t.extrudeField) && (this.extrudeField = t.extrudeField),
        THING.Utils.isNull(t.extrudeFactor) || this.extrudeFactor === t.extrudeFactor || (this.extrudeFactor = n.extrudeFactor),
        THING.Utils.isNull(t.extrudeHeight) || THING.Utils.isNull(this.extrudeField) || (this.extrudeHeight = THING.Utils.parseValue(t.extrudeHeight, this._defaultHeight) - 0);
        var a = this.renderer.windowTextureSize;
        this._renderer = n,
        this.updateTextureWrap(t.textureWrap),
        t.textureSize && this._updateBuildingTextureSize(t.textureSize),
        t.windowTextureSize = THING.Utils.parseValue(t.windowTextureSize, M.a._defaultWindowTextureSize),
        this._updateBuildingWindowTexture(t.windowTextureSize, a),
        this.updateMaterial(),
        THING.App.current.rendererManager._mainRenderer.dirty()
    }
    updateExtrudeFactor(t) {
        if (this.extrudeField) {
            let e = t * this._userData[this.extrudeField];
            void 0 === e || isNaN(e) || 0 === e ? this.extrudeHeight = this._defaultHeight : this.extrudeHeight = e
        }
        THING.App.current.rendererManager._mainRenderer.dirty("Glow")
    }
    updateExtrudeField(t) {
        if ("" === t || void 0 === t)
            this.extrudeHeight = this._defaultHeight;
        else {
            let e = this.extrudeFactor * this._userData[t];
            void 0 === e || isNaN(e) || 0 === e ? this.extrudeHeight = this._defaultHeight : this.extrudeHeight = e
        }
        THING.App.current.rendererManager._mainRenderer.dirty("Glow")
    }
    updateTextureWrap(t) {
        if (t === CMAP.TextureWrapMode.Repeat || t === CMAP.TextureWrapMode.Stretch || t === CMAP.TextureWrapMode.RepeatY) {
            for (var e in this.node.getMeshes()) {
                var n = this.node.getMeshes()[e].geometry;
                M.a._updateBuildingTextureWrap(n, t)
            }
            THING.App.current.rendererManager._mainRenderer.dirty("Glow")
        }
    }
}
THING.factory.registerClass("GeoBuilding", GeoBuilding);
var GeoBuilding = GeoBuilding;
var Renderer_2 = class extends RendererFather {
    constructor(t, e) {
        super(t, e),
        this._object = t,
        this._imageUrl = e.imageUrl,
        this._alphaImageUrl = e.alphaImageUrl,
        this._useColor = THING.Utils.parseValue(e.useColor, !1),
        this._useAlphaMap = THING.Utils.parseValue(e.useAlphaMap, !0),
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        e.color = THING.Utils.parseValue(e.color || [255, 255, 255]),
        this._color = MapUtil.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._opacity = this._color[3],
        this._uvRatio = THING.Utils.parseValue(e.uvRatio || [1, 1]),
        this._blending = THING.Utils.parseValue(e.blending, !1),
        this._keepSpeed = THING.Utils.parseValue(e.keepSpeed, !1),
        this._speed = THING.Utils.parseValue(e.speed, [0, 0]),
        this._alphaSpeed = THING.Utils.parseValue(e.alphaSpeed, [0, 0]),
        Array.isArray(this._alphaSpeed) || (this._alphaSpeed = [this._alphaSpeed, 0]),
        Array.isArray(this._speed) || (this._speed = [this._speed, 0]),
        Array.isArray(this._imageUrl) || (this._imageUrl = [this._imageUrl]),
        2 !== this._uvRatio.length || Array.isArray(this._uvRatio[0]) || (this._uvRatio = [this._uvRatio]),
        2 !== this._speed.length || Array.isArray(this._speed[0]) || (this._speed = [this._speed])
    }
    get keepSpeed() {
        return this._keepSpeed
    }
    get color() {
        return MapUtil.colorFormatOldToNew(this._color)
    }
    set color(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("color", t, !0, this._opacity) : (this._color = MapUtil.colorFormatNewToOld(t, this._opacity),
        this._opacity = this._color[3],
        this._object.updateMaterial())
    }
    get useColor() {
        return this._useColor
    }
    set useColor(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useColor", t) : (this._useColor = t,
        this._object.updateMaterial())
    }
    get useAlphaMap() {
        return this._useAlphaMap
    }
    set useAlphaMap(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("useAlphaMap", t) : (this._useAlphaMap = t,
        this._object.updateMaterial())
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("opacity", t) : t !== this._opacity && (this._opacity = t,
        this._color[3] = t,
        this._object.updateMaterial())
    }
    get imageUrl() {
        return Array.isArray(this._imageUrl) && 1 === this._imageUrl.length ? this._imageUrl[0] : this._imageUrl
    }
    set imageUrl(t) {
        this._imageUrl = t,
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("imageUrl", t) : (t && !Array.isArray(t) && (t = [t]),
        this._imageUrl = t,
        this._object.updateMaterial())
    }
    get uvRatio() {
        return Array.isArray(this._uvRatio) && 1 === this._uvRatio.length ? this._uvRatio[0] : this._uvRatio
    }
    set uvRatio(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("uvRatio", t) : this._uvRatio !== t && (this._uvRatio = this.processParam(t),
        this._object.updateMaterial())
    }
    get speed() {
        return Array.isArray(this._speed) && 1 === this._speed.length ? this._speed[0] : this._speed
    }
    set speed(t) {
        this._speed = t,
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("speed", t) : (this._speed = this.processParam(t),
        this._object.updateMaterial())
    }
    get alphaSpeed() {
        return this._alphaSpeed
    }
    set alphaSpeed(t) {
        this._alphaSpeed = t,
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("alphaSpeed", t) : (this._alphaSpeed = t,
        this._object.updateMaterial())
    }
    get alphaImageUrl() {
        return this._alphaImageUrl
    }
    set alphaImageUrl(t) {
        this._alphaImageUrl = t,
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("alphaImageUrl", t) : (this._alphaImageUrl = t,
        this._object.updateMaterial())
    }
    get blending() {
        return this._blending
    }
    set blending(t) {
        this._blending = t,
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("blending", t) : (this._blending = t,
        this._object.updateMaterial())
    }
    processParam(t) {
        return t && Array.isArray(t) && !Array.isArray(t[0]) && (t = [t]),
        this.imageUrl && Array.isArray(this.imageUrl) && 2 === this.imageUrl.length && 1 === t.length && (t[1] = t[0]),
        t
    }
}
;
class GeoPolygon extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        if (this._param = t,
        this.isInfoShow = !1,
        this.name = t.name || "geoPolygon_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._coordinates = t.coordinates,
        this._userData = THING.Utils.parseValue(t.userData, {}),
        void 0 === t.extrudeHeight && (t.extrudeHeight = t.height),
        this._extrudeHeight = void 0 === t.extrudeHeight ? 0 : t.extrudeHeight,
        this._originRenderer = t.renderer,
        this._setUpRenderer(t.renderer),
        this._processPolygonRenderer(),
        this._setOffsetHeightAndField(t),
        void 0 === t.renderer.extrudeField && void 0 === t.extrudeField ? this._extrudeField = "" : this._extrudeField = void 0 === t.extrudeField ? t.renderer.extrudeField : t.extrudeField,
        void 0 === t.renderer.extrudeFactor && void 0 === t.extrudeFactor ? this._extrudeFactor = 1 : this._extrudeFactor = void 0 === t.extrudeFactor ? t.renderer.extrudeFactor : t.extrudeFactor,
        this.extrudeField && !t.height && !t.extrudeHeight) {
            var e = this._userData[this.extrudeField];
            this._extrudeHeight = e ? this._userData[this.extrudeField] * this.extrudeFactor : 0
        }
        this.renderOrder = THING.Utils.parseValue(t.renderOrder, 0),
        this._layer = new THREE.Group,
        this.node = this._layer,
        this._featureLayerId = t._featureLayerId,
        this._conditionStr = t._conditionStr,
        this._useMercatorUV = THING.Utils.parseValue(t.useMercatorUV, !0),
        THING.Utils.isNull(t.useMercatorUV) && M.a._isRectangle(this.coordinates) && THING.Utils.isNull(t.renderer.textureSize) && (this._useMercatorUV = !1),
        this._useOutline = !0,
        this._beforeInit(t),
        this.init(!0),
        this._afterInit({
            renderer: this._renderer
        }),
        this.setupUserData(),
        this.setupParent(t),
        this._setupLabel(t),
        this._setupInfoWindow(t),
        this.setupComplete(t)
    }
    _setupLabel(t) {
        let e = MapUtil.getFeatureCollectionExtent({
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: this._multiPolygonCoordinates
            }
        })
            , n = [(e.maxX + e.minX) / 2, (e.maxY + e.minY) / 2]
            , a = this.extrudeHeight + this.offsetHeight;
        Array.isArray(this._arrayOffsetHeight) && this._arrayOffsetHeight.length > 0 && (a += this._arrayOffsetHeight[0]),
        this.labelPosition = CMAP.Util.convertLonlatToWorld(n, a),
        t.label && super._setupLabel(t)
    }
    _setUpRenderer(t) {
        this._fillRenderer = new Renderer(this,t);
        let e = {}
            , n = {};
        for (let r in t)
            if (r.startsWith("outline")) {
                let n = r.replace("outline", "");
                e[n = n.charAt(0).toLowerCase() + n.slice(1)] = t[r]
            } else if (r.startsWith("boundary")) {
                let e = r.replace("boundary", "");
                n[e = e.charAt(0).toLowerCase() + e.slice(1)] = t[r]
            }
        void 0 === e.lineType && (e.lineType = "Plane"),
        void 0 === e.width && (e.width = 0),
        this._lineRenderer = new Renderer_1(this._outline,e),
        this._originLineRenderer = e,
        t.useBoundary && (this._boundaryRenderer = new Renderer_2(this._boundary,n),
        this._originBoundaryRenderer = n)
    }
    _processPolygonRenderer() {
        let t = this._fillRenderer.toObject()
            , e = this._lineRenderer.toObject()
            , n = this;
        this._renderer = {};
        for (let e in t)
            Object.defineProperty(this._renderer, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return n.fillRenderer[e]
                },
                set: function(t) {
                    n.fillRenderer[e] = t
                }
            });
        for (let t in e) {
            let e = "outline" + t.charAt(0).toUpperCase() + t.slice(1);
            Object.defineProperty(this._renderer, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return n.lineRenderer[t]
                },
                set: function(e) {
                    ("lineType" === t || "width" === t && "Plane" !== n.renderer.outlineLineType) && n._outline.setParent(null),
                    n.lineRenderer[t] = e,
                    ("lineType" === t || "width" === t && "Plane" !== n.renderer.outlineLineType) && (n._setUpOutlineExtra(),
                    n.add(n._outline))
                }
            })
        }
        if (this._boundaryRenderer) {
            let t = this._boundaryRenderer.toObject();
            t.extrudeHeight = THING.Utils.parseValue(this._originBoundaryRenderer.extrudeHeight, 100),
            t.offsetHeight = THING.Utils.parseValue(this._originBoundaryRenderer.offsetHeight, 0);
            for (let e in t) {
                let t = "boundary" + e.charAt(0).toUpperCase() + e.slice(1);
                Object.defineProperty(this._renderer, t, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return "offsetHeight" === e || "extrudeHeight" === e ? n._boundary[e] : n.boundaryRenderer[e]
                    },
                    set: function(t) {
                        "offsetHeight" === e || "extrudeHeight" === e ? (n._boundary.setParent(null),
                        n._boundary[e] = t,
                        n._setUpBoundaryExtra(),
                        n.add(n._boundary)) : n.boundaryRenderer[e] = t
                    }
                })
            }
        }
    }
    get fillRenderer() {
        return this._fillRenderer
    }
    get lineRenderer() {
        return this._lineRenderer
    }
    get boundaryRenderer() {
        return this._boundaryRenderer
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        if (this._arrayOffsetHeight || t !== this._offsetHeight) {
            if (this._offsetHeight = t,
            this._arrayOffsetHeight = null,
            this._outLinePolygonHierarchyArray)
                for (let t = 0; t < this._outLinePolygonHierarchyArray.length; t++)
                    this._outLinePolygonHierarchyArray[t].offsetHeight = 0;
            this._updateGeometry(!0)
        }
    }
    _setArrayOffsetHeight() {
        this._updateGeometry(!0)
    }
    get extrudeFactor() {
        return this._extrudeFactor
    }
    get extrudeField() {
        return this._extrudeField
    }
    set extrudeFactor(t) {
        if (this.extrudeField) {
            let e = t * this._userData[this.extrudeField];
            THING.Utils.isNull(e) || isNaN(e) || (this.extrudeHeight = e)
        }
        this._extrudeFactor = t,
        this._fillRenderer._extrudeFactor = t
    }
    set extrudeField(t) {
        let e = this.extrudeFactor * this._userData[t];
        e && !isNaN(e) ? this.extrudeHeight = e : this.extrudeHeight = 0,
        this._extrudeField = t,
        this._fillRenderer._extrudeField = t
    }
    get extrudeHeight() {
        return this._extrudeHeight
    }
    set extrudeHeight(t) {
        this._extrudeHeight !== t && (isNaN(t) && (t = 0),
        this._extrudeHeight = t,
        this._updateGeometry(!1))
    }
    set height(t) {
        this.extrudeHeight = t
    }
    get height() {
        return this._extrudeHeight
    }
    set renderOrder(t) {
        this.style.renderOrder = t,
        this._outline && (this._outline.style.renderOrder = t + .1),
        this._boundary && (this._boundary.style.renderOrder = t + .2)
    }
    get renderOrder() {
        return this.style.renderOrder
    }
    updateHeight(t, e) {
        if (void 0 === e || 0 === e)
            this.extrudeHeight = t;
        else {
            var n = this
                , r = this.extrudeHeight;
            r > t && (e *= -1);
            CMAP.Updater.add("updateHeight_" + this.queryID, function() {
                if (e > 0 && r + 1 * e > t || e < 0 && r + 1 * e < t)
                    return n.extrudeHeight = t,
                    void CMAP.Updater.delete("updateHeight_" + n.queryID);
                n.extrudeHeight = r + 1 * e,
                r = n.extrudeHeight
            })
        }
    }
    updateRenderer(t) {
        "cool" !== t.type && (t.effect = !1),
        MapUtil._needsUpdateExtrudeField(t.extrudeField) && (this.extrudeField = t.extrudeField),
        THING.Utils.isNull(t.extrudeFactor) || this.extrudeFactor === t.extrudeFactor || (this.extrudeFactor = t.extrudeFactor),
        THING.Utils.isNull(t.extrudeHeight) || THING.Utils.isNull(this.extrudeField) || (this.extrudeHeight = t.extrudeHeight - 0),
        this.extrudeHeight > 0 && (t.depthWrite = !0);
        var e = this._renderer.textureSize;
        this._setUpRenderer(t),
        this._updateMeshMatByRenderer();
        let n = !1;
        if (M.a._isRectangle(this.coordinates))
            for (let t = 0; t < this.node.getMeshes().length; t++) {
                const r = this.node.getMeshes()[t];
                "LINE" !== r.__type__ && "BOUNDARY" !== r.__type__ && (THING.Utils.isNull(this._fillRenderer._textureSize) ? (r.geometry.addAttribute("uv", r.geometry.attributes.uv2, 2),
                n = !0) : THING.Utils.isNull(e) && (r.geometry.addAttribute("uv", r.geometry.attributes.uv1, 2),
                e = THING.Utils.parseValue(this._originRenderer.textureSize, this._sizeInMeter)))
            }
        n || (e || (e = this._sizeInMeter),
        THING.Utils.isNull(this._fillRenderer._textureSize) && (this._fillRenderer._textureSize = this._sizeInMeter),
        this._updateMeshUV(e, this._fillRenderer._textureSize)),
        this._outline && (this._outline.setParent(null),
        this._outline.updateRenderer(this._originLineRenderer),
        this._setUpOutlineExtra(),
        this.add(this._outline)),
        t.useBoundary ? (this._boundary ? this._boundary.visible = !0 : this._drawBoundary(),
        this._boundary.setParent(null),
        this._boundary.updateRenderer(this._originBoundaryRenderer),
        this.add(this._boundary)) : this._boundary && (this._boundary.visible = !1),
        super.updateRenderer(t)
    }
    createGeometry(t, e, n, r, a, i) {
        return M.a.createPolygonGeometry(t, e, n, r, void 0, this._useMercatorUV, !0, a, !1, i)
    }
    _updateGeometry(t) {
        t && (this._polygonInfo = M.a.processPolygon(this._coordinates, this.offsetHeight),
        this._multiPolygonCoordinates = this._polygonInfo.coordinates,
        this.node.setPosition(this._polygonInfo.centerWorld),
        M.a._setNodeAnglesByPosition(this.node, this._polygonInfo.centerWorld),
        this.node.updateMatrixWorld());
        let e = this.offsetHeight;
        this._arrayOffsetHeight && (e = this._arrayOffsetHeight);
        let n = this.createGeometry(this._multiPolygonCoordinates, this.node, e, this.extrudeHeight, this._fillRenderer._textureSize, this._lineRenderer.lineType)
            , r = n.polygonGeometry;
        for (let t = 0; t < this.node.getMeshes().length; t++) {
            const e = this.node.getMeshes()[t];
            "LINE" !== e.__type__ && "BOUNDARY" !== e.__type__ && (e.geometry = r[0])
        }
        if (this._outline) {
            this._outlineCoordsAndHeightArray = null,
            r && r.length > 0 && (this._outLinePolygonHierarchyArray = n.outLinePolygonHierarchyArray),
            this._getOutlineCoordsAndHeightArray(),
            this._outline.setParent(null);
            const t = CMAP.Util.convertWorldToLonlat(this._outline.position)[2];
            for (let e = 0; e < this._outlineCoordsAndHeightArray.heightArray.length; e++)
                for (let n = 0; n < this._outlineCoordsAndHeightArray.heightArray[e].length; n++)
                    this._outlineCoordsAndHeightArray.heightArray[e][n] -= t;
            this._outline._heightArray = this._outlineCoordsAndHeightArray.heightArray;
            var a = this._outline._createGeoObject(this._outlineCoordsAndHeightArray.coordinates, this._lineRenderer.lineType, this._lineRenderer.width, this._outlineCoordsAndHeightArray.heightArray, !0, this._lineRenderer.textureSize);
            this._outline._uvArray = a.uvArray,
            this._outline.totalLengthArray = a.totalLengthArray;
            let e = a.geometryArray
                , i = t3djs.util.mergeBufferGeometry(e);
            this._outline.node.children[0].geometry = i[0],
            this._outline.node.children.length > 1 && (this._outline.node.children[1].dispose(),
            this._outline._createLineSprite(a.geometryArray.length)),
            this.add(this._outline)
        }
        this._boundary && (this._arrayOffsetHeight ? (this._boundary.destroy(),
        this._drawBoundary()) : (this._boundary.setParent(null),
        this._boundary.offsetHeight = this.offsetHeight + this.extrudeHeight,
        this.add(this._boundary)))
    }
    init(t) {
        0 === this.extrudeHeight ? this._fillRenderer.depthWrite = !1 : this._fillRenderer.depthWrite = !0,
        this._polygonInfo = M.a.processPolygon(this._coordinates, this.offsetHeight),
        this._multiPolygonCoordinates = this._polygonInfo.coordinates,
        this._layer.setPosition(this._polygonInfo.centerWorld),
        M.a._setNodeAnglesByPosition(this._layer, this._polygonInfo.centerWorld),
        this._layer.updateMatrixWorld(),
        this._fillRenderer._quaternion = MapUtil.positionToQuaternion(this._polygonInfo.centerWorld).inverse(),
        t && this._draw()
    }
    _getLineRenderer(t) {
        return {
            type: t.outlineType,
            width: t.outlineWidth,
            color: t.outlineColor,
            effect: t.outlineEffect,
            opacity: t.outlineOpacity,
            speed: t.outlineSpeed,
            uvRatio: t.outlineUVRatio,
            imageUrl: t.outlineImageUrl,
            lineType: "Plane"
        }
    }
    _createFillMaterial() {
        var t = JSON.parse(JSON.stringify(this._fillRenderer.toObject()));
        return Ut.createPolygonMaterial(t, this.extrudeHeight, this._fillRenderer._quaternion)
    }
    _getOutlineCoordsAndHeightArray() {
        if (!this._outlineCoordsAndHeightArray) {
            let t = this._outLinePolygonHierarchyArray
                , e = []
                , n = [];
            for (let r = 0; r < t.length; r++) {
                let a = t[r]
                    , i = M.a._createPolygonOutLineParam(a, this.extrudeHeight, a.offsetHeight);
                i.coordinates.length > 0 && (e.push(i.coordinates),
                n.push(i.heightArray))
            }
            e = M.a._processGeojson(e, "LINE"),
            this._outlineCoordsAndHeightArray = {
                coordinates: e,
                heightArray: n
            }
        }
        return this._outlineCoordsAndHeightArray
    }
    _drawBoundary() {
        const t = this._getOutlineCoordsAndHeightArray()
            , e = [];
        let n = {};
        if (t.heightArray) {
            for (let n = 0; n < t.heightArray.length; n++)
                e.push(t.heightArray[n][0]);
            n = {
                offsetHeightArray: e
            }
        }
        for (let e = 0; e < t.coordinates.length; e++)
            t.coordinates[e] = [t.coordinates[e]];
        const r = {
            type: "GeoBoundary",
            coordinates: t.coordinates,
            extrudeHeight: this._originBoundaryRenderer.extrudeHeight,
            renderer: this._originBoundaryRenderer,
            renderOrder: this.renderOrder + .2
        };
        n.offsetHeightArray ? (r.userData = n,
        r.groundHeightField = "offsetHeightArray") : r.offsetHeight = this.offsetHeight + this.extrudeHeight,
        this._boundary = this.app.create(r),
        this._boundaryRenderer = this._boundary.renderer,
        this._boundary.inheritPickable = !1,
        this._boundary.inheritStyle = !1,
        this._setUpBoundaryExtra(),
        this.add(this._boundary)
    }
    _drawOutline() {
        const t = this._getOutlineCoordsAndHeightArray()
            , e = this.app.create({
            type: "GeoLine",
            coordinates: t.coordinates,
            heightArray: t.heightArray,
            renderer: this._lineRenderer,
            renderOrder: this.renderOrder + .1
        });
        e.pickable = !1,
        e.inheritPickable = !1,
        e.inheritStyle = !1,
        this._originExtrudeHeight = this.extrudeHeight,
        this.add(e),
        e.renderer.opacity = this._lineRenderer.opacity,
        this._lineRenderer = e.renderer,
        this._outline = e,
        this._setUpOutlineExtra(),
        this._lineRenderer._object = this._outline
    }
    _draw() {
        let t = this.offsetHeight;
        this._arrayOffsetHeight && (t = this._arrayOffsetHeight);
        let e = this.createGeometry(this._multiPolygonCoordinates, this._layer, t, this.extrudeHeight, this._fillRenderer.textureSize, this._lineRenderer.lineType)
            , n = this._createFillMaterial()
            , r = e.polygonGeometry;
        this._sizeInMeter = e.sizeInMeter,
        this._fillRenderer._textureSize = e.textureSize;
        for (let t = 0; t < r.length; t++) {
            let e = new THREE.Mesh(r[t],n);
            this._layer.add(e)
        }
        this._outLinePolygonHierarchyArray = [],
        r && r.length > 0 && (this._outLinePolygonHierarchyArray = e.outLinePolygonHierarchyArray,
        this._drawOutline(),
        this.renderer.useBoundary && this._drawBoundary())
    }
    _setUpOutlineExtra() {
        this._outline._getMeshes().forEach(t=>{
            t.__type__ = "LINE"
        }
        )
    }
    _setUpBoundaryExtra() {
        this._boundary._getMeshes().forEach(t=>{
            t.__type__ = "BOUNDARY"
        }
        )
    }
    _setEffect(t, e, n) {
        const r = this;
        function a() {
            for (let a = 0; a < r._getMeshes().length; a++) {
                let i = r._getMeshes()[a];
                "LINE" !== i.__type__ && "BOUNDARY" !== i.__type__ && M.a._updateEffect(i, t, e, n)
            }
            THING.App.current.rendererManager._mainRenderer.dirty()
        }
        e && "glow" === t ? "cool" === r.renderer.type && a() : a()
    }
    _updateMeshMat(t) {
        this.node.getMeshes().forEach(e=>{
            "LINE" !== e.__type__ && "BOUNDARY" !== e.__type__ && (e.material = t)
        }
        ),
        setTimeout(function() {
            THING.App.current.rendererManager._mainRenderer.dirty("Glow")
        }, 0)
    }
    _updateBoundaryMat(t) {
        this.node.getMeshes().forEach(e=>{
            "BOUNDARY" === e.__type__ && (e.material = t)
        }
        )
    }
    _updateOutlineMat(t) {
        this.node.getMeshes().forEach(e=>{
            "LINE" === e.__type__ && (e.material = t)
        }
        )
    }
    _updateBoundaryEffect(t, e) {
        this.node.getMeshes().forEach(n=>{
            "BOUNDARY" === n.__type__ && M.a._updateEffect(n, "glow", t, e)
        }
        )
    }
    _updateOutlineEffect(t, e) {
        this.node.getMeshes().forEach(n=>{
            "LINE" === n.__type__ && M.a._updateEffect(n, "lineBloom", t, e)
        }
        )
    }
    updateMaterial() {
        this._updateMeshMatByRenderer()
    }
    _updateMeshMatByRenderer() {
        this._updateMeshMat(this._createFillMaterial())
    }
    _updateOutlineMatByRenderer() {
        let t = Ut.createLineMaterial(this._lineRenderer).getMaterial()[0];
        this._updateOutlineMat(t)
    }
    _updateMeshUV(t, e) {
        if (MapUtil.isArrayEqual(t, e))
            return;
        const n = this;
        this._getMeshes().forEach(function(r) {
            if ("LINE" !== r.__type__ && "BOUNDARY" !== r.__type__) {
                var a = r.geometry.groups[0]
                    , i = r.geometry.index.array.slice(a.start, a.count)
                    , o = new Float32Array(r.geometry.attributes.uv.count * r.geometry.attributes.uv.itemSize);
                const l = [t[0] / e[0], t[1] / e[1]];
                for (var s = 0; s < r.geometry.attributes.uv.count; s++)
                    M.a._updateAllUv(n.extrudeHeight, i, s) ? (o[2 * s] = r.geometry.attributes.uv.array[2 * s] * l[0],
                    o[2 * s + 1] = r.geometry.attributes.uv.array[2 * s + 1] * l[1]) : (o[2 * s] = r.geometry.attributes.uv.array[2 * s],
                    o[2 * s + 1] = r.geometry.attributes.uv.array[2 * s + 1]);
                r.geometry.setAttribute("uv", new THREE.BufferAttribute(o,2))
            }
        })
    }
}
THING.factory.registerClass("GeoPolygon", GeoPolygon);
var GeoPolygon = GeoPolygon;
var WaterRenderer = class extends RendererFather {
    constructor(t, e) {
        super(t, e),
        this._object = t,
        this._type = "water",
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        e.color = THING.Utils.parseValue(e.color || [255, 255, 255]),
        this._color = CMAP.Util.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._opacity = this._color[3],
        this._reflectionNormal = e.reflectionNormal,
        this._refractionNormal = e.refractionNormal,
        this._reflectionImage = e.reflectionImage,
        this._refractionImage = e.refractionImage,
        this._flowSpeed = THING.Utils.parseValue(e.flowSpeed, [1, 1]),
        Array.isArray(this._flowSpeed) || (this._flowSpeed = [this._flowSpeed, this._flowSpeed]),
        this._waveLength = THING.Utils.parseValue(e.waveLength, .25),
        this._lights = THING.Utils.parseValue(e.lights, !0)
    }
    get color() {
        return CMAP.Util.colorFormatOldToNew(this._color)
    }
    set color(t) {
        var e = CMAP.Util.colorFormatNewToOld(t, this._opacity);
        JSON.stringify(e) !== JSON.stringify(this._color) && (Array.isArray(t) && 4 === t.length && (this._opacity = t[3]),
        this._color = e,
        this._object._getGeoObjectArray().forEach(n=>{
            Array.isArray(t) && 4 === t.length && (n.renderer._opacity = t[3]),
            n.renderer._color = e,
            n._updateMaterial()
        }
        ))
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("opacity", t) : t !== this._opacity && (this._opacity = t,
        this._color[3] = t,
        this._object._updateMaterial())
    }
    get flowSpeed() {
        return this._flowSpeed
    }
    set flowSpeed(t) {
        Array.isArray(t) || (t = [t, t]),
        CMAP.Util.isArrayEqual(t, this._flowSpeed) || (this._flowSpeed = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.flowSpeed = t
        }
        ) : this._object._updateMaterial())
    }
    get reflectionNormal() {
        return this._reflectionNormal
    }
    set reflectionNormal(t) {
        t !== this._reflectionNormal && (this._reflectionNormal = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.reflectionNormal = t
        }
        ) : this._object._updateMaterial())
    }
    get refractionNormal() {
        return this._refractionNormal
    }
    set refractionNormal(t) {
        t !== this._refractionNormal && (this._refractionNormal = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.refractionNormal = t
        }
        ) : this._object._updateMaterial())
    }
    get reflectionImage() {
        return this._reflectionImage
    }
    set reflectionImage(t) {
        t !== this._reflectionImage && (this._reflectionImage = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.reflectionImage = t
        }
        ) : this._object._updateMaterial())
    }
    get refractionImage() {
        return this._refractionImage
    }
    set refractionImage(t) {
        t !== this._refractionImage && (this._refractionImage = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.refractionImage = t
        }
        ) : this._object._updateMaterial())
    }
    get waveLength() {
        return this._waveLength
    }
    set waveLength(t) {
        t !== this._waveLength && (this._waveLength = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.waveLength = t
        }
        ) : this._object._updateMaterial())
    }
    get lights() {
        return this._lights
    }
    set lights(t) {
        t !== this._lights && (this._lights = t,
        "FeatureLayer" === this._object.type ? this._object.children.forEach(e=>{
            e.renderer.lights = t
        }
        ) : this._object._updateMaterial())
    }
}
;
class GeoWater extends GeoPolygon {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        super.setup(t)
    }
    _beforeInit(t) {
        this._renderer = new WaterRenderer(this,t.renderer)
    }
    _convertRendererToParam() {
        const t = this.renderer.flowSpeed;
        let e = Math.abs(t[0])
            , n = Math.abs(t[1])
            , r = Math.abs(e > n ? e : n);
        e = t[0] / r,
        n = t[1] / r;
        const a = Math.sqrt(t[0] * t[0] + t[1] * t[1]) / Math.sqrt(2);
        return {
            color: this.renderer._color,
            opacity: this.renderer.opacity,
            normalMap0: this.renderer.reflectionNormal,
            normalMap1: this.renderer.refractionNormal,
            tReflectionMap: this.renderer.reflectionImage,
            tRefractionMap: this.renderer.refractionImage,
            flowX: e,
            flowY: n,
            flowSpeed: a,
            scale: 1 / this.renderer.waveLength,
            lights: this.renderer.lights
        }
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        if (t !== this._offsetHeight) {
            var e = t - this._offsetHeight;
            this.translate([0, e, 0]),
            this._offsetHeight = t
        }
    }
    _draw() {
        let t = this.offsetHeight;
        this._arrayOffsetHeight && (t = this._arrayOffsetHeight);
        let e = M.a.createPolygonGeometry(this._multiPolygonCoordinates, this.node, t, this.height, void 0, !0, !1).polygonGeometry;
        for (let t in e) {
            let n = e[t]
                , r = this.createMaterial().getTechnique(0).getPass(0).material;
            r.extensions.derivatives = !this.app.renderer.capabilities.isWebGL2;
            let a = new THREE.Water3(n,r);
            a.renderOrder = this.renderOrder,
            this.node.add(a)
        }
    }
    createMaterial() {
        return Ut.createWaterMatrial(this._convertRendererToParam())
    }
    updateRenderer(t) {
        super.updateRenderer(t);
        var e = new WaterRenderer(this,t);
        this._renderer = e,
        this._updateMaterial()
    }
    _updateMaterial() {
        var t = this.createMaterial();
        if (t)
            for (var e in this.node.children) {
                var n = this.node.children[e];
                "Water3" === n.type && (n.material = t.techniques[0].passes[0].material)
            }
    }
}
THING.factory.registerClass("GeoWater", GeoWater);
class GeoBoundary extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this._userData = void 0 === t.userData ? {} : t.userData,
        this._coordinates = t.coordinates,
        this._heightArray = t.heightArray,
        this._heightArrayField = t.heightArrayField,
        this._heightArrayFactor = THING.Utils.parseValue(t.heightArrayFactor, 1),
        this._extrudeHeight = this._originHeight = THING.Utils.parseValue(t.extrudeHeight, 100),
        this._setOffsetHeightAndField(t),
        super.setup(t)
    }
    _initRenderer(t) {
        this._renderer = new Renderer_2(this,t.renderer)
    }
    get extrudeHeight() {
        return this._extrudeHeight
    }
    set extrudeHeight(t) {
        this._extrudeHeight !== t && (this._extrudeHeight = t,
        this._caculateGeometry())
    }
    _processCoordinates() {
        var t = M.a._processGeojson(this._coordinates, "LINE");
        return t = M.a._processGeojson(t, "BOUNDARYPOLYGON"),
        this._centerCoords = MapUtil._getPolygonCenterCoordinates(t),
        this._multiPolygonCoordinates = t,
        t
    }
    _processHeightArray() {
        let t;
        return this._heightArray && (t = this._heightArray,
        t = M.a._processGeojson(t, "LINEHEIGHT"),
        t = M.a._processGeojson(t, "LINE")),
        this._multiPolygonHeightArray = t,
        this._multiPolygonHeightArray
    }
    _setupNode() {
        this.position = MapUtil.convertLonlatToWorld(this._centerCoords, this._offsetHeight),
        this.angles = MapUtil.getAnglesFromPosition(this.position, 180)
    }
    init() {
        this._processCoordinates(),
        this._processHeightArray(),
        this._setupNode();
        const t = this.createGeometry();
        let e = this.createMaterial();
        for (let n = 0; n < t.length; n++) {
            const r = t[n];
            let a = this.createMesh(r, e);
            this.node.add(a)
        }
    }
    get heightArray() {
        return this._heightArray
    }
    get heightArrayField() {
        return this._heightArrayField
    }
    set heightArrayField(t) {
        t !== this._heightArrayField && (this._heightArray = null,
        this._heightArrayField = t,
        this._caculateGeometry())
    }
    get heightArrayFactor() {
        return this._heightArrayFactor
    }
    set heightArrayFactor(t) {
        t !== this._heightArrayFactor && (this._heightArray = null,
        this._heightArrayFactor = t,
        this._caculateGeometry())
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        (this._arrayOffsetHeight || t !== this._offsetHeight) && (this._offsetHeight = t,
        this._arrayOffsetHeight = null,
        this._caculateGeometry())
    }
    _setArrayOffsetHeight(t) {
        this._caculateGeometry()
    }
    _caculateGeometry() {
        this._setupNode();
        const t = this.node.getMeshes();
        let e = this.createGeometry();
        for (let n = 0; n < e.length; n++)
            t[n].geometry = e[n]
    }
    createMaterial() {
        const t = this.renderer.toObject();
        return Ut.createBoundaryMaterial(t)
    }
    createMesh(t, e) {
        var n = new THREE.Mesh(t,e);
        return n.castShadow = !0,
        n.receiveShadow = !0,
        n
    }
    createGeometry() {
        return THING.Utils.isNull(this._heightArray) && !THING.Utils.isNull(this._heightArrayField) && this.userData[this._heightArrayField] && (this._heightArray = MapUtil.deepCopy(this.userData[this._heightArrayField]),
        this._heightArray && 1 !== this._heightArrayFactor && CMAP.Util._multiplyHeightArrayFactor(this._heightArray, this._heightArrayFactor)),
        this._processHeightArray(),
        M.a.createBoundaryGeometry(this._multiPolygonCoordinates, this.extrudeHeight, this._arrayOffsetHeight ? this._arrayOffsetHeight : this.offsetHeight, this.position, this._multiPolygonHeightArray)
    }
    updateMaterial() {
        var t = this.createMaterial()
            , e = this.node.getMeshes();
        for (let n = 0; n < e.length; n++)
            e[n].material = t
    }
    updateRenderer(t) {
        super.updateRenderer(t),
        this._renderer = new Renderer_2(this,t),
        this.updateMaterial(),
        MapUtil.isNum(t.offsetHeight) && (this.offsetHeight = t.offsetHeight),
        MapUtil.isNum(t.extrudeHeight) && (this.extrudeHeight = t.extrudeHeight)
    }
    destroy() {
        this._alphaUpdaterName && C.a.delete(this._alphaUpdaterName),
        this._imageUpdaterName && C.a.delete(this._imageUpdaterName),
        super.destroy()
    }
}
THING.factory.registerClass("GeoBoundary", GeoBoundary);
class GeoScene extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.param = t || {},
        this.name = t.name || "unNamed",
        this.id = this.code = t.id || MapUtil.getUUID(),
        this.sceneUrl = t.url,
        this._coordinates = t.coordinates || t.lonlat || [116.390834, 39.916353],
        t.offsetHeight && (t.height = t.offsetHeight),
        this.height = void 0 === t.height ? 1 : t.height,
        this.offsetHeight = this.height,
        void 0 === t.azimuth && (t.azimuth = t.angle),
        this._renderOrder = void 0 === t.renderOrder ? 0 : t.renderOrder,
        this.azimuth = void 0 === t.azimuth ? 0 : t.azimuth,
        this._renderer = t.renderer,
        this._renderer ? (this.flyBackInfo = t.flyBackInfo,
        this._initScene = !1,
        this._marker = this._createMarker(),
        this.add(this._marker),
        this.state = 0) : this._onlyLoadScene(),
        this.visible = void 0 === t.visible || t.visible,
        this.completeCallback = t.completeCallback,
        this.setupComplete(t)
    }
    get renderOrder() {
        return this._renderOrder
    }
    set renderOrder(t) {
        this._layer && (this._layer.renderOrder = t),
        this._renderOrder = t
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        var e = MapUtil.convertLonlatToWorld(this.coordinates, t);
        this._layer.position = e,
        this._offsetHeight = t
    }
    get height() {
        return this._offsetHeight
    }
    set height(t) {
        this.offsetHeight = t
    }
    init() {}
    get geoPoint() {
        return this._marker
    }
    _createMarker() {
        var t = this
            , e = this.app.create({
            type: "GeoPoint",
            name: this.name + "_geoPoint",
            coordinates: [this.coordinates[0], this.coordinates[1]],
            renderer: this.renderer,
            azimuth: this.azimuth
        });
        return e.on("dblclick", function(e) {
            e.object.visible = !1,
            t._flyToScene()
        }),
        e.on("mouseenter", function() {
            "model" !== e.renderer.type ? e.renderer.size = 1.5 * e.renderer.size : e.children[0].style.outlineColor = [255, 255, 0]
        }),
        e.on("mouseleave", function() {
            "model" !== e.renderer.type ? e.renderer.size = e.renderer.size / 1.5 : e.children[0].style.outlineColor = null
        }),
        e
    }
    _loadScene() {
        var t = this.app
            , e = t.uEarth.sceneManager
            , n = this
            , a = e.getCurInitScene();
        a && a.code !== n.code && (e.disposeInitScene(),
        a._marker.visible = !0),
        t.uEarth.sceneManager._lastBackground = t.background;
        var i = MapUtil.convertLonlatToWorld(this.coordinates, this.height)
            , o = MapUtil.getAnglesFromLonlat(this.coordinates, this.azimuth);
        t.loadCampus(n.sceneUrl, {
            id: n.code,
            name: n.name,
            position: i,
            angles: o,
            isCamFitScene: !1,
            properties: {
                GIV_id: n.code
            },
            successCallback: function(r) {
                e.setError(!1);
                var a = t.query("[GIV_id = " + n.code + "]")[0] || r.object;
                n._layer = a,
                t.level.change(a),
                n.trigger("FinishFlyToScene", n),
                n._processScene(a),
                n.completeCallback && n.completeCallback()
            },
            errorCallback: function() {
                e.setError(!0, n),
                n.trigger("FinishFlyToScene", n),
                n.completeCallback && n.completeCallback()
            }
        }),
        n._initScene = !0
    }
    _onlyLoadScene() {
        let t = this.app
            , e = this;
        t.uEarth.sceneManager._lastBackground = t.background;
        var n = MapUtil.convertLonlatToWorld(this.coordinates, this.height)
            , a = MapUtil.getAnglesFromLonlat(this.coordinates, this.azimuth);
        t.pauseEvent(THING.EventType.EnterLevel, "*", THING.EventTag.LevelFly),
        t.loadCampus(e.sceneUrl, {
            id: e.code,
            name: e.name,
            position: n,
            angles: a,
            isCamFitScene: !1,
            renderOrder: this._renderOrder,
            properties: {
                GIV_id: e.code
            },
            successCallback: function(n) {
                var r = t.query("[GIV_id = " + e.code + "]")[0] || n.object;
                e._layer = r,
                e._processScene(r),
                e.trigger("FinishFlyToScene", e),
                e.completeCallback && e.completeCallback()
            },
            errorCallback: function() {
                e.trigger("FinishFlyToScene", e),
                e.completeCallback && e.completeCallback()
            }
        })
    }
    _processScene(t) {
        let e = MapUtil.convertLonlatToWorld(this._coordinates, this.height)
            , n = MapUtil.position2angles(e)
            , a = MapUtil.anglesToQuaternion(n).inverse();
        t.node.getMaterials().map(t=>{
            t.baseQuaternion = a
        }
        )
    }
    updateRenderer(t) {
        for (var e in this._renderer = t,
        t)
            this.geoPoint.renderer[e] = t[e]
    }
    _flyToScene() {
        var t = this;
        t.trigger("BeginFlyToScene", t);
        var e = {
            center: MapUtil.lonlat2World(this.coordinates, 6378e3 + this.height),
            radius: 200,
            complete: function() {
                t._initScene ? (t._marker.visible = !1,
                t._layer && (t._layer.visible = !0,
                t.app.level.change(t._layer)),
                t.trigger("FinishFlyToScene", t)) : t._loadScene(),
                t.state = 1
            }
        };
        this.app.camera.flyToBoundingSphere(e)
    }
    newflyToScene() {
        var t = this.height / 111e3
            , e = [this.coordinates[0], this.coordinates[1] + t];
        let n = this._layer.getOrientedBox().size
            , r = Math.sqrt(n[0] * n[0] + n[1] * n[1])
            , a = Math.sqrt(r * r + n[2] * n[2]);
        this.app.camera.earthFlyTo({
            lonlat: e,
            height: this.height + a
        }),
        this.trigger("FinishFlyToScene", this)
    }
    isNeedToLoad() {
        var t = !0
            , e = this.app.uEarth.sceneManager.getCurInitScene();
        return e && e.code === this.code && (t = !1),
        t
    }
    updatePositionAngleHeight(t, e, n) {
        this._coordinates = t,
        this.azimuth = e,
        this.height = n;
        var a = MapUtil.convertLonlatToWorld(this.coordinates, this.height)
            , i = MapUtil.getAnglesFromLonlat(this.coordinates, this.azimuth);
        this._layer && (this._layer.position = a,
        this._layer.angles = i),
        this._marker && (this._marker.coordinates = t)
    }
    destroy() {
        var t = this.app.query("[GIV_id = " + this.code + "]")[0];
        this._initScene = !1,
        this._layer = null,
        this._marker && this._marker.destroy(),
        t && "Campus" === t.type && t.destroy(),
        super.destroy()
    }
    set visible(t) {
        this._visible = t;
        var e = this.app.query("[GIV_id = " + this.code + "]")[0];
        !0 === t ? 0 === this.state ? this._marker.visible = t : 1 === this.state && e && (e.visible = t) : (this._marker && (this._marker.visible = t),
        e && (e.visible = t))
    }
    get visible() {
        return this._visible
    }
}
THING.factory.registerClass("GeoScene", GeoScene);
var GeoCampus = GeoScene;
class GeoCampus extends GeoCampus {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.param = t || {},
        this.name = t.name || "unNamed",
        this.id = this.code = t.id || MapUtil.getUUID(),
        this.userData = THING.Utils.parseValue(t.userData, {}),
        this.sceneUrl = t.url,
        THING.Utils.isNull(t.flyToScene) && (t.flyToScene = t.changeCampusLevel),
        this.flyToScene = THING.Utils.parseValue(t.flyToScene, !0),
        this.flyWhenLevelChange = THING.Utils.parseValue(t.flyWhenLevelChange, !1),
        this._coordinates = t.coordinates || t.lonlat || [116.390834, 39.916353],
        t.height && (t.offsetHeight = t.height),
        THING.Utils.isNull(t.groundHeightField) && (this._offsetHeight = THING.Utils.parseValue(t.offsetHeight, 1)),
        this._setOffsetHeightAndField(t),
        void 0 === t.azimuth && (t.azimuth = t.angle),
        this.azimuth = void 0 === t.azimuth ? 0 : t.azimuth,
        this._renderer = t.renderer,
        this._visible = void 0 === t.visible || t.visible,
        this._onlyLoadScene(),
        this.completeCallback = t.complete,
        t.complete = null,
        this.errorCallback = t.error,
        this.setupComplete(t)
    }
    init() {}
    _onlyLoadScene() {
        let t = this.app
            , e = this;
        t.uEarth.sceneManager._lastBackground = t.background;
        var n = MapUtil.convertLonlatToWorld(this.coordinates, this.height)
            , a = MapUtil.getAnglesFromLonlat(this.coordinates, this.azimuth);
        this.flyWhenLevelChange || t.pauseEvent(THING.EventType.EnterLevel, "*", THING.EventTag.LevelFly),
        t.level.options.isEarth = !0;
        const i = {
            GIV_id: e.code,
            azimuth: e.azimuth
        }
            , o = CMAP.Util.objectAssign(i, this.userData, !0);
        t.create({
            type: "Campus",
            url: e.sceneUrl,
            id: e.code,
            name: e.name,
            position: n,
            angles: a,
            isSetEffect: !1,
            properties: o,
            parent: e.app.uEarth,
            visible: e.visible,
            complete: function(n) {
                var r = n.object;
                e._layer = r,
                e.flyToScene && (e.trigger("BeginFlyToScene", e),
                t.level.change(r),
                e.trigger("FinishFlyToScene", e)),
                r.node.visible = e._visible,
                CMAP.Util._correctCampusBaseQuaternion(r, e.coordinates, e.height),
                e.completeCallback && e.completeCallback(n)
            },
            error: function(t) {
                e.errorCallback && e.errorCallback(t)
            }
        })
    }
    _registerEvent(t, e) {
        let n = e.app;
        t.on("dblclick", "*", function() {
            n.level.change(t),
            t.off("dblclick", "*", "loadMarker")
        }, "loadMarker"),
        t.on("mouseenter", function(t) {
            t.object.style.outlineColor = "#FF8000"
        }),
        t.on("mouseleave", function(t) {
            t.object.style.outlineColor = null
        })
    }
    destroy() {
        this._layer && this._layer.destroy(),
        super.destroy()
    }
    set visible(t) {
        this._layer && (this._layer.node.visible = t),
        this._visible = t
    }
    get visible() {
        return this._visible
    }
}
THING.factory.registerClass("GeoCampus", GeoCampus);
var Ae = class {
    constructor(t, e) {
        this._object = this._geoHeatMap = t,
        this._radius = THING.Utils.parseValue(e.radius, 5),
        this._maxOpacity = e.maxOpacity,
        this._minOpacity = e.minOpacity,
        this._opacity = e.opacity,
        this._minValue = e.minValue,
        this._maxValue = e.maxValue,
        this._mosaic = e.mosaic,
        this._extent = e.extent,
        this._lights = e.lights,
        this._mosaicSize = e.mosaicSize,
        this._gradient = e.gradient || {
            .25: "rgb(0,0,255)",
            .55: "rgb(0,255,0)",
            .85: "yellow",
            1: "rgb(255,0,0)"
        },
        void 0 !== e.opacity || void 0 !== e.maxOpacity && void 0 !== e.minOpacity || (this._opacity = .6)
    }
    get minValue() {
        return this._minValue
    }
    get maxValue() {
        return this._maxValue
    }
    set minValue(t) {
        this._minValue = t
    }
    set maxValue(t) {
        this._maxValue = t
    }
    get lights() {
        return this._lights
    }
    set lights(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("lights", t) : (this._lights = t,
        this._geoHeatMap._updateMaterial())
    }
    get extent() {
        return this._extent
    }
    get mosaic() {
        return this._mosaic
    }
    set mosaic(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("mosaic", t) : (this._geoHeatMap._setMosaic(t, this.mosaicSize),
        this._mosaic = t)
    }
    get mosaicSize() {
        return this._mosaicSize
    }
    set mosaicSize(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("mosaicSize", t) : (this._geoHeatMap._setMosaicSize(t),
        this._mosaicSize = t)
    }
    get maxOpacity() {
        return this._maxOpacity
    }
    set maxOpacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("maxOpacity", t) : (this._geoHeatMap.setMinMaxOpacity(this.minOpacity, t),
        this._maxOpacity = t)
    }
    get minOpacity() {
        return this._minOpacity
    }
    set minOpacity(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("minOpacity", t) : (this._geoHeatMap.setMinMaxOpacity(t, this.maxOpacity),
        this._minOpacity = t)
    }
    get radius() {
        return this._radius
    }
    set radius(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("radius", t) : (this._geoHeatMap.setRadius(t),
        this._radius = t)
    }
    get gradient() {
        return this._gradient
    }
    set gradient(t) {
        this._object && "FeatureLayer" === this._object.type ? this._setFeatureLayerProperty("gradient", t) : (this._geoHeatMap.setGradient(t),
        this._gradient = t)
    }
    get opacity() {
        return this._opacity
    }
}
    , Pe = !0;
class GeoObject extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this.id = t.id || "geoHeatMap_" + MapUtil.getUUID(),
        this.name = t.name || this.id,
        this._dataSource = t.dataSource,
        this.dataExtent,
        this.renderer = new Ae(this,t.renderer),
        this.renderOrder = t.renderOrder || 0,
        this._layer = new THREE.Group,
        this.init(),
        this.node = this._layer,
        this._heatMap,
        this.setupComplete(t)
    }
    get visible() {
        return Pe
    }
    set visible(t) {
        this._visible = t,
        this._layer.visible = t
    }
    destroy() {
        this._heatMap && this._layer.name === "heatmap_mesh" + this.id && this._heatMap.destroy(),
        super.destroy(),
        this.app.off("camerachangeend")
    }
    get renderOrder() {
        return this._renderOrder
    }
    set renderOrder(t) {
        this._layer && (this._layer.renderOrder = t),
        this._renderOrder = t
    }
    _setDataExtent() {
        if (!this.dataExtent) {
            var t = Math.max.apply(Math, this.dataSource.map(function(t) {
                return t.x
            }))
                , e = Math.min.apply(Math, this.dataSource.map(function(t) {
                return t.x
            }))
                , n = Math.max.apply(Math, this.dataSource.map(function(t) {
                return t.y
            }))
                , r = Math.min.apply(Math, this.dataSource.map(function(t) {
                return t.y
            }));
            this.dataExtent = {
                west: e,
                east: t,
                south: r,
                north: n
            }
        }
    }
    init() {
        this._setDataExtent(),
        this.draw();
        var t = this._drawHandler.call(this);
        this.renderer.extent || this.app.on("camerachangeend", function(e) {
            t()
        }, !1)
    }
    _drawHandler() {
        var t, e = this, n = function() {
            e.visible && e.parent.visible && e.draw()
        };
        return function() {
            t && clearTimeout(t),
            t = setTimeout(n, 300)
        }
    }
    draw() {
        var t;
        if (this.renderer.extent)
            t = {
                west: this.renderer.extent.minX,
                east: this.renderer.extent.maxX,
                south: this.renderer.extent.minY,
                north: this.renderer.extent.maxY
            };
        else {
            var e = this.app.uEarth.getCurrentExtent();
            t = {
                west: e.minX,
                east: e.maxX,
                south: e.minY,
                north: e.maxY
            }
        }
        if (this.dataExtent) {
            if (t.east < this.dataExtent.west || t.west > this.dataExtent.east || t.south > this.dataExtent.north || t.north < this.dataExtent.south)
                return;
            var n = this.dataExtent.east - this.dataExtent.west
                , r = this.dataExtent.north - this.dataExtent.south;
            t.east > this.dataExtent.east + 1 * n && (t.east = this.dataExtent.east + 1 * n),
            t.west < this.dataExtent.west - 1 * n && (t.west = this.dataExtent.west - 1 * n),
            t.north > this.dataExtent.north + 1 * r && (t.north = this.dataExtent.north + 1 * r),
            t.south < this.dataExtent.south - 1 * r && (t.south = this.dataExtent.south - 1 * r)
        }
        var a = {};
        a.radius = this.renderer.radius,
        a.gradient = this.renderer.gradient;
        var i = {};
        for (var o in a.gradient) {
            var s = o;
            o - 0 > .3 && (s = .7 + .3 * o),
            i[s] = a.gradient[o]
        }
        a.gradient = i,
        a.opacity = this.renderer.opacity,
        a.maxOpacity = this.renderer.maxOpacity,
        a.minOpacity = this.renderer.minOpacity,
        this._layer.children.length > 0 && this._layer.children[0].name === "heatmap_mesh" + this.id && this._heatMap.destroy(),
        this._heatMap = CesiumHeatmap.create(this.id, t, a),
        void 0 === this.renderer.minValue && (this.renderer.minValue = Math.min.apply(Math, this.dataSource.map(function(t) {
            return t.value
        }))),
        void 0 === this.renderer.maxValue && (this.renderer.maxValue = Math.max.apply(Math, this.dataSource.map(function(t) {
            return t.value
        }))),
        this._heatMapMesh = this._heatMap.setWGS84Data(this.renderer.minValue, this.renderer.maxValue, this.dataSource);
        var l = this.createMaterial();
        this._heatMapMesh.setMaterial(l),
        this._heatMapMesh && (this._layer.add(this._heatMapMesh),
        this._layer.renderOrder = this.renderOrder)
    }
    setMinMaxOpacity(t, e) {
        this._heatMap && (this._heatMap.setMinMaxOpacity(t, e),
        this._updateCanvas())
    }
    createMaterial() {
        let t = "meshMaterial_heatmap" + this._id;
        var e = t3djs.materialManager.getMaterial(t);
        e && t3djs.materialManager.destroyMaterial(t),
        e = t3djs.materialManager.createMaterial(t);
        let n, r = new THREE.Texture(this._heatMap._container.children[0]);
        if (0 === this._heatMap._container.children[0].height) {
            var a = document.createElement("img");
            a.width = this.width,
            a.height = this.height,
            r.image = a,
            r.needsUpdate = !0
        } else
            r.image = this._heatMap._container.children[0],
            r.needsUpdate = !0;
        return this.renderer.mosaic ? ((n = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(THING.Heatmap.PointMosaicShader.uniforms),
            vertexShader: THING.Heatmap.PointMosaicShader.vertexShader,
            fragmentShader: THING.Heatmap.PointMosaicShader.fragmentShader,
            transparent: !0
        })).uniforms.tDiffuse.value = r,
        this.renderer.mosaicSize && (n.uniforms.texSize.value.set(this._heatMap._container.children[0].width, this._heatMap._container.children[0].height),
        n.uniforms.mosaicSize.value.set(this.renderer.mosaicSize, this.renderer.mosaicSize))) : n = new THREE.MeshBasicMaterial({
            map: r,
            side: THREE.DoubleSide,
            transparent: !0
        }),
        n.depthWrite = !1,
        e.getTechnique(0).getPass(0).material = n,
        e
    }
    setGradient(t) {
        if (this._heatMap) {
            var e = {};
            for (var n in t) {
                var r = n;
                n - 0 > .3 && (r = .7 + .3 * n),
                e[r] = t[n]
            }
            this._heatMap.setGradient(e),
            this._updateCanvas()
        }
    }
    setRadius(t) {
        this._heatMap && (this._heatMap.setRadius(t),
        this._updateCanvas())
    }
    get dataSource() {
        return this._dataSource
    }
    set dataSource(t) {
        this._heatMap && (this.renderer.minValue = Math.min.apply(Math, t.map(function(t) {
            return t.value
        })),
        this.renderer.maxValue = Math.max.apply(Math, t.map(function(t) {
            return t.value
        })),
        this._heatMap.setWGS84Data(this.renderer.minValue, this.renderer.maxValue, t, !1),
        this._updateCanvas()),
        this._dataSource = t,
        this._setDataExtent()
    }
    _updateCanvas() {
        this._heatMapMesh.material.map.image = this._heatMap._container.children[0],
        this._heatMapMesh.material.map.needsUpdate = !0
    }
}
THING.factory.registerClass("GeoHeatMap", GeoObject);
var Re = class extends RendererFather {
    constructor(t, e) {
        super(t, e),
        this._object = t,
        this._type = THING.Utils.parseValue(e.type, GeoDiffusion.TYPE_TEXTURE_ROTATE),
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        e.color = THING.Utils.parseValue(e.color, [255, 255, 255]),
        this._color = CMAP.Util.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._opacity = this._color[3],
        this._imageUrl = e.imageUrl || e.url,
        this._radius = THING.Utils.parseValue(e.radius, 500),
        this._lerpType = THING.Utils.parseValue(e.lerpType, THING.LerpType.Linear.None),
        this._speed = THING.Utils.parseValue(e.speed, 1),
        this._speed <= 0 && (THING.Utils.warn("invalid value,speed must larger than 0"),
        this._speed = .001),
        this._startPosition = THING.Utils.parseValue(e.startPosition, 0),
        this._endPosition = THING.Utils.parseValue(e.endPosition, 1),
        this._alphaMapping = THING.Utils.parseValue(e.alphaMapping, {
            0: 1,
            1: 1
        }),
        this._linePositionRatio = THING.Utils.parseValue(e.linePositionRatio, 0),
        this._lineOpacity = THING.Utils.parseValue(e.lineOpacity, 1),
        e.lineColor = THING.Utils.parseValue(e.lineColor, [255, 255, 255]),
        this._lineColor = CMAP.Util.colorFormatNewToOld(e.lineColor, this._lineOpacity) || [1, 1, 1, 1],
        this._lineOpacity = this._lineColor[3],
        this._lineWidthRatio = THING.Utils.parseValue(e.lineWidthRatio, .01),
        this._cylinderHeight = THING.Utils.parseValue(e.cylinderHeight, 300)
    }
    get type() {
        return this._type
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._opacity = this._object.opacity = t
    }
    get color() {
        return CMAP.Util.colorFormatOldToNew(this._color)
    }
    set color(t) {
        this._color = this._object.color = t
    }
    get imageUrl() {
        return this._imageUrl
    }
    set imageUrl(t) {
        this._imageUrl = this._object.url = t
    }
    get radius() {
        return this._radius
    }
    set radius(t) {
        this._radius = this._object.radius = t
    }
    get lerpType() {
        return this._lerpType
    }
    set lerpType(t) {
        this._lerpType = this._object.lerpType = t
    }
    get speed() {
        return this._speed
    }
    set speed(t) {
        this._speed = this._object.speed = t
    }
    get startPosition() {
        return this._startPosition
    }
    set startPosition(t) {
        this._startPosition = this._object.startPosition = t
    }
    get endPosition() {
        return this._endPosition
    }
    set endPosition(t) {
        this._endPosition = this._object.endPosition = t
    }
    get alphaMapping() {
        return this._alphaMapping
    }
    set alphaMapping(t) {
        t || (t = {
            0: 1,
            1: 1
        }),
        this._alphaMapping = this._object.alphaInterpolantParams = t
    }
    get linePositionRatio() {
        return this._linePositionRatio
    }
    set linePositionRatio(t) {
        this._linePositionRatio = this._object.linePositionRatio = t
    }
    get lineOpacity() {
        return this._lineOpacity
    }
    set lineOpacity(t) {
        this._lineOpacity = this._object.lineOpacity = t
    }
    get lineColor() {
        return CMAP.Util.colorFormatOldToNew(this._lineColor)
    }
    set lineColor(t) {
        this._lineColor = this._object.lineColor = t
    }
    get lineWidthRatio() {
        return this._lineWidthRatio
    }
    set lineWidthRatio(t) {
        this._lineWidthRatio = this._object.lineWidthRatio = t
    }
    get cylinderHeight() {
        return this._cylinderHeight
    }
    set cylinderHeight(t) {
        this._cylinderHeight = this._object.cylinderHeight = t
    }
}
;
class GeoDiffusion extends GeoObject {
    constructor(t) {
        super(t),
        this.app = t,
        this.app.on("resize", t=>{
            this._onResize(t)
        }
        )
    }
    setup(t) {
        this.isInfoShow = !1,
        this.name = t.name || "geoDiffusion" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this.tickable = !1,
        this._growName = "diffusion_" + this.queryID,
        this._coordinates = t.coordinates,
        this._userData = void 0 === t.userData ? {} : t.userData,
        this._renderer = new Re(this,t.renderer),
        this._diffusionType = t.diffusionType,
        this._parseRenderer(),
        this._offsetHeight = THING.Utils.parseValue(t.offsetHeight, 0),
        this.node = this._layer = new THREE.Group,
        this.param = t,
        this._scanLayers = t.scanLayers || [],
        this._materials = [],
        this._createMaterial(this._diffusionType),
        this.init(),
        this.renderOrder = THING.Utils.parseValue(t.renderOrder, 0),
        this.visible = void 0 === t.visible || t.visible,
        t.parent || (t.independent = !0),
        this.setupParent(t),
        this.setupUserData(),
        this.setupComplete(t)
    }
    _parseRenderer() {
        this._opacity = this.renderer.opacity,
        this._color = this.renderer._color,
        this._url = this.renderer.imageUrl,
        this._radius = this.renderer.radius,
        this._lerpType = this.renderer.lerpType,
        this._speed = this.renderer.speed,
        this._endPosition = this.renderer.endPosition,
        this._startPosition = this.renderer.startPosition,
        this._alphaInterpolantParams = this.renderer.alphaMapping,
        this._linePositionRatio = this.renderer.linePositionRatio,
        this._lineOpacity = this.renderer.lineOpacity,
        this._lineColor = this.renderer._lineColor,
        this._lineWidthRatio = this.renderer.lineWidthRatio,
        this._diffusionType || (this._diffusionType = this.renderer.type),
        this._cylinderHeight = this.renderer.cylinderHeight
    }
    get color() {
        return this._color
    }
    set color(t) {
        var e = t || this._color;
        e = CMAP.Util.colorFormatNewToOld(e, this._opacity) || [this._color[0], this._color[1], this._color[2], this._opacity],
        this._opacity = e[3],
        this._color = [e[0], e[1], e[2]] || !1,
        this._uniforms.color.value = new THREE.Vector3(this._color[0],this._color[1],this._color[2]),
        this._diffusionType !== GeoDiffusion.TYPE_CYLINDER && (this._buildUniforms.color.value = this._uniforms.color.value)
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._opacity = t,
        this._uniforms.opacity.value = this._opacity,
        this._diffusionType !== GeoDiffusion.TYPE_CYLINDER && (this._buildUniforms.opacity.value = this._opacity)
    }
    get url() {
        return this._url
    }
    set url(t) {
        if ((this._diffusionType === GeoDiffusion.TYPE_TEXTURE_ROTATE || this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE) && this._url !== t) {
            var e = (new THREE.TextureLoader).load(t);
            this._uniforms.colorTexture.value = e,
            this._buildUniforms.colorTexture.value = e,
            this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE && (this._uniforms.useColorTexture.value = 1,
            this._buildUniforms.useColorTexture.value = 1)
        }
        this._url = t
    }
    get radius() {
        return this._radius
    }
    set radius(t) {
        this._radius = t,
        this._updateDiffusion()
    }
    get lerpType() {
        return this._lerpType
    }
    set lerpType(t) {
        this._lerpType = t,
        this._updateDiffusion()
    }
    get speed() {
        return this._speed
    }
    set speed(t) {
        t <= 0 ? THING.Utils.warn("扫描速度不能小于等于0") : (this._speed = t,
        TWEEN.remove(this._tween),
        this._setSpeed())
    }
    get linePositionRatio() {
        return this._linePositionRatio
    }
    set linePositionRatio(t) {
        this._linePositionRatio = t,
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE && (this._uniforms.lineEnableRatio.value = this._linePositionRatio,
        this._buildUniforms.lineEnableRatio.value = this._linePositionRatio)
    }
    get lineWidthRatio() {
        return this._lineWidthRatio
    }
    set lineWidthRatio(t) {
        this._lineWidthRatio = t,
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE && (this._uniforms.lineWidthRatio.value = this._lineWidthRatio,
        this._buildUniforms.lineWidthRatio.value = this._lineWidthRatio)
    }
    get lineOpacity() {
        return this._lineOpacity
    }
    set lineOpacity(t) {
        this._lineOpacity = t,
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE && (this._uniforms.lineOpacity.value = this._lineOpacity,
        this._buildUniforms.lineOpacity.value = this._lineOpacity)
    }
    get lineColor() {
        return this._lineColor
    }
    set lineColor(t) {
        var e = t || this._lineColor;
        e = CMAP.Util.colorFormatNewToOld(e, this._lineOpacity) || [this._color[0], this._color[1], this._color[2], this._lineOpacity],
        this._lineOpacity = e[3],
        this._lineColor = [e[0], e[1], e[2]] || !1,
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE && (this._uniforms.lineColor.value = new THREE.Vector3(this._lineColor[0],this._lineColor[1],this._lineColor[2]),
        this._buildUniforms.lineColor.value = new THREE.Vector3(this._lineColor[0],this._lineColor[1],this._lineColor[2]))
    }
    get cylinderHeight() {
        return this._cylinderHeight
    }
    set cylinderHeight(t) {
        this._cylinderHeight = t,
        this._updateDiffusion()
    }
    get coordinates() {
        return this._coordinates
    }
    set coordinates(t) {
        this._coordinates = t,
        this._updateDiffusion()
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        t >= 0 && (this._offsetHeight = t,
        this._updateDiffusion())
    }
    get endPosition() {
        return this._endPosition
    }
    set endPosition(t) {
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE ? (this._endPosition = t,
        t <= 0 || t > 1 ? THING.Utils.warn("扫描重复间隔比例不能小于等于0或者大于1") : (TWEEN.remove(this._tween),
        this._setSpeed())) : THING.Utils.warn("只有diffusionType = " + GeoDiffusion.TYPE_TEXTURE_SCALE + "时起作用")
    }
    get startPosition() {
        return this._startPosition
    }
    set startPosition(t) {
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE ? (this._startPosition = t,
        t < 0 || t > 1 ? THING.Utils.warn("扩散起始比例不能小于0或者大于1") : (TWEEN.remove(this._tween),
        this._setSpeed())) : THING.Utils.warn("只有diffusionType = " + GeoDiffusion.TYPE_TEXTURE_SCALE + "时起作用")
    }
    get alphaCurveFunction() {
        return this._alphaCurveFunction
    }
    set alphaCurveFunction(t) {
        if (this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE) {
            this._alphaCurveFunction = t;
            var e = this._createAlphaTexture(t);
            this._uniforms.alphaTexture.value = e,
            this._buildUniforms.alphaTexture.value = e
        } else
            THING.Utils.warn("只有diffusionType = " + GeoDiffusion.TYPE_TEXTURE_SCALE + "时起作用")
    }
    get alphaInterpolantParams() {
        return this._alphaInterpolantParams
    }
    set alphaInterpolantParams(t) {
        if (this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE) {
            this._alphaInterpolantParams = t;
            var e = this._createInterpolantTexture(t);
            this._uniforms.alphaTexture.value = e,
            this._buildUniforms.alphaTexture.value = e
        } else
            THING.Utils.warn("只有diffusionType = " + GeoDiffusion.TYPE_TEXTURE_SCALE + "时起作用")
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        this._visible = t,
        this._setVisible()
    }
    _createscaleCircularMaterial() {
        let t;
        var e;
        this._timeTarget = .5,
        this._alphaInterpolantParams ? t = this._createInterpolantTexture(this._alphaInterpolantParams) : this._alphaCurveFunction && (t = this._createAlphaTexture(this._alphaCurveFunction));
        var n = 0;
        this.url ? (e = (new THREE.TextureLoader).load(this._url),
        n = 1) : n = 0,
        this._uniforms = {
            time: {
                value: 0
            },
            color: {
                value: new THREE.Vector3(this._color[0],this._color[1],this._color[2])
            },
            opacity: {
                value: this._opacity
            },
            colorTexture: {
                value: e
            },
            useColorTexture: {
                value: n
            },
            alphaTexture: {
                value: t
            },
            lineEnableRatio: {
                value: this._linePositionRatio
            },
            lineWidthRatio: {
                value: this._lineWidthRatio
            },
            lineColor: {
                value: new THREE.Vector3(this._lineColor[0],this._lineColor[1],this._lineColor[2])
            },
            lineOpacity: {
                value: this._lineOpacity
            }
        },
        this._buildUniforms = {
            time: {
                value: 0
            },
            color: {
                value: new THREE.Vector3(this._color[0],this._color[1],this._color[2])
            },
            opacity: {
                value: this._opacity
            },
            centerRadius: {
                value: new THREE.Vector4
            },
            plane: {
                value: new THREE.Vector4
            },
            viewPort: {
                value: this.app.renderer.getCurrentViewport(new THREE.Vector4)
            },
            planeMatrix: {
                value: new THREE.Matrix4
            },
            colorTexture: {
                value: e
            },
            useColorTexture: {
                value: n
            },
            alphaTexture: {
                value: t
            },
            lineEnableRatio: {
                value: this._linePositionRatio
            },
            lineWidthRatio: {
                value: this._lineWidthRatio
            },
            lineColor: {
                value: new THREE.Vector3(this._lineColor[0],this._lineColor[1],this._lineColor[2])
            },
            lineOpacity: {
                value: this._lineOpacity
            }
        };
        let r = new THREE.ShaderMaterial({
            transparent: !0,
            opacity: this._opacity,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthTest: !0,
            depthWrite: !1,
            uniforms: this._uniforms,
            vertexShader: "\n      #include <common>\n      #include <logdepthbuf_pars_vertex>\n\n      varying vec2 vUv;\n      \n      void main() {\n        vec3 transformed = vec3( position );\n        vec4 mvPosition = vec4( transformed, 1.0 );\n        mvPosition = modelViewMatrix * mvPosition;\n        gl_Position = projectionMatrix * mvPosition;\n\n        vUv = uv;\n\n        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );// 会抖动\n\n        #include <logdepthbuf_vertex>\n      \n      }\n    ",
            fragmentShader: "\n      #include <common>\n      #include <logdepthbuf_pars_fragment>\n      #include <dithering_pars_fragment>\n\n      uniform vec3 color;\n      uniform float opacity;\n      uniform float time;// 0.0 --- 0.5\n      uniform sampler2D colorTexture;\n      uniform float useColorTexture;\n      uniform sampler2D alphaTexture;\n\n      uniform float lineEnableRatio;\n      uniform float lineWidthRatio;\n      uniform vec3 lineColor;\n      uniform float lineOpacity;\n\n      varying vec2 vUv;\n      \n      void main() {\n        #include <logdepthbuf_fragment>\n\n        float disToCenter = distance( vUv, vec2( 0.5, 0.5 ) );\n\n        // time * (2.0 / 3.0)? 因为Tween动画的Out类型导致,Plane需要扩展1.0 / 3.0\n        if( disToCenter <= time * ( 2.0 / 3.0 ) ){\n\n          vec2 processUv = vec2( ( ( vUv.x - 0.5 ) + time * ( 2.0 / 3.0 ) ) / ( 2.0 * time * ( 2.0 / 3.0 ) ), ( ( vUv.y - 0.5 ) + time * ( 2.0 / 3.0 ) ) / ( 2.0 * time * ( 2.0 / 3.0 ) ) );\n          vec4 textureColor = texture2D( colorTexture, processUv );\n\n          // vec4 alphaColor = texture2D( alphaTexture, vec2( disToCenter / ( time * 2.0 / 3.0 ) , 1.0 ) );\n          vec4 alphaTextureColor = texture2D( alphaTexture, vec2( time * 2.0, 1.0 ) );\n\n          if(useColorTexture == 1.0){ // 有纹理\n\n            gl_FragColor = vec4( color * textureColor.rgb, opacity * alphaTextureColor.a * textureColor.a);\n          \n          } else { // 无纹理\n          \n            gl_FragColor = vec4( color, opacity * alphaTextureColor.a * disToCenter );\n          \n          }\n\n          if(lineEnableRatio != 0.0){\n            float disToCenter = distance( processUv, vec2( 0.5, 0.5 ) );\n            if(disToCenter <= lineEnableRatio * 0.5 && disToCenter >= lineEnableRatio * 0.5 - lineWidthRatio * 0.5){\n              gl_FragColor = vec4( lineColor, lineOpacity);\n            }            \n          }\n\n        } else {\n          discard;\n        }\n\n        #include <dithering_fragment>\n      \n      }\n    "
        });
        this._materials.push(r);
        let a = new THREE.ShaderMaterial({
            transparent: !0,
            opacity: this._opacity,
            depthTest: !0,
            depthWrite: !1,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            uniforms: this._buildUniforms,
            vertexShader: "\n      #include <common>\n      #include <logdepthbuf_pars_vertex>\n\n      varying vec2 vUv;\n      varying mat4 projMatrix;\n      \n      void main() {\n        vec3 transformed = vec3( position );\n        vec4 mvPosition = vec4( transformed, 1.0 );\n        mvPosition = modelViewMatrix * mvPosition;\n        gl_Position = projectionMatrix * mvPosition;\n\n        vUv = uv;\n        projMatrix = projectionMatrix;\n\n        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );// 会抖动\n\n        #include <logdepthbuf_vertex>\n      \n      }\n    ",
            fragmentShader: "\n      #include <common>\n      #include <logdepthbuf_pars_fragment>\n      #include <dithering_pars_fragment>\n\n      uniform vec3 color;\n      uniform float opacity;\n      uniform float time;\n      uniform vec4 centerRadius;\n      uniform vec4 viewPort;\n      uniform vec4 plane;\n      uniform sampler2D colorTexture;\n      uniform mat4 planeMatrix;\n\n      uniform sampler2D alphaTexture;\n      uniform float useColorTexture;\n\n      uniform float lineEnableRatio;\n      uniform float lineWidthRatio;\n      uniform vec3 lineColor;\n      uniform float lineOpacity;\n\n      varying vec2 vUv;\n      varying mat4 projMatrix;\n\n      vec3 projectPoint(vec3 point){\n\n        // 法线\n        vec3 normal = vec3( plane.x, plane.y, plane.z ) * (-1.0);\n        // 常量\n        float constant = plane.w;\n\n        // 点到平面距离\n        float disToPoint = dot( normal, point ) + constant;\n        disToPoint = -1.0 * disToPoint;\n\n        vec3 temp = vec3( normal.x * disToPoint, normal.y * disToPoint, normal.z * disToPoint );\n\n        vec3 finalPoint = vec3( temp.x + point.x, temp.y + point.y, temp.z + point.z);\n\n        return finalPoint;\n\n      }\n      \n      void main() {\n        #include <logdepthbuf_fragment>\n\n        float radius = centerRadius.w;\n        vec3 center = centerRadius.xyz;\n\n        vec4 ndc = vec4(\n          gl_FragCoord.x / viewPort.z * 2.0 - 1.0,\n          gl_FragCoord.y / viewPort.w * 2.0 - 1.0,\n          gl_FragCoord.z * 2.0 - 1.0,\n          1.0\n        );\n        mat4 inverseProjectionMatrix = inverse( projMatrix );\n        mat4 inverseviewMatrix = inverse( viewMatrix );\n\n        // 反算世界坐标\n        vec4 p = inverseProjectionMatrix * ndc;\n        vec4 positionWC = inverseviewMatrix * p;\n        // 向平面投影\n        vec3 projectPoint = projectPoint( positionWC.xyz / positionWC.w );\n        \n        float disToCenter = distance( projectPoint, center );\n\n        mat4 inversePlaneMatrix = inverse( planeMatrix );\n        vec4 positionPlane = inversePlaneMatrix * positionWC;\n\n        positionPlane.xy = ( positionPlane.xy / positionPlane.w + radius * 1.5 ) / ( radius * 3.0 );\n\n        if( disToCenter <= radius * 3.0 / 2.0 * time * 2.0 * ( 2.0 / 3.0 ) ){\n          vec2 processUv = vec2( ( ( positionPlane.x - 0.5 ) + time * ( 2.0 / 3.0 ) ) / ( 2.0 * time * ( 2.0 / 3.0 ) ), ( ( positionPlane.y - 0.5 ) + time * ( 2.0 / 3.0 ) ) / ( 2.0 * time * ( 2.0 / 3.0 ) ) );\n          vec4 textureColor = texture2D( colorTexture, processUv );\n\n          float disToCenterUv = distance( positionPlane.xy, vec2( 0.5, 0.5 ) );\n          // vec4 alphaTextureColor1 = texture2D( alphaTexture, vec2( disToCenterUv / ( time * 2.0 / 3.0 ) , 1.0 ) );\n          vec4 alphaTextureColor = texture2D( alphaTexture, vec2( time * 2.0, 1.0 ) );\n\n          if(useColorTexture == 1.0){\n            gl_FragColor = vec4( color * textureColor.rgb, opacity * alphaTextureColor.a * textureColor.a );\n          } else {\n            gl_FragColor = vec4( color, opacity * alphaTextureColor.a );\n          }\n\n          if(lineEnableRatio != 0.0){\n            float disToCenter = distance( processUv, vec2( 0.5, 0.5 ) );\n            if(disToCenter <= lineEnableRatio * 0.5 && disToCenter >= lineEnableRatio * 0.5 - lineWidthRatio * 0.5){\n              gl_FragColor = vec4( lineColor, lineOpacity * alphaTextureColor.a );\n            }            \n          }\n\n        } else {\n          discard;\n        }\n\n        #include <dithering_fragment>\n      \n      }\n    "
        });
        this._materials.push(a)
    }
    _createCylinderMaterial() {
        this._timeTarget = 1,
        this._uniforms = {
            time: {
                value: 0
            },
            color: {
                value: new THREE.Vector3(this._color[0],this._color[1],this._color[2])
            },
            opacity: {
                value: this._opacity
            }
        };
        let t = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: !0,
            opacity: this._opacity,
            blending: THREE.AdditiveBlending,
            depthTest: !0,
            depthWrite: !0,
            uniforms: this._uniforms,
            vertexShader: "\n        #include <common>\n        #include <logdepthbuf_pars_vertex>\n  \n        varying vec2 vUv;\n        \n        void main() {\n          vec3 transformed = vec3( position );\n          vec4 mvPosition = vec4( transformed, 1.0 );\n          mvPosition = modelViewMatrix * mvPosition;\n          gl_Position = projectionMatrix * mvPosition;\n  \n          vUv = uv;\n  \n          // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );// 会抖动\n  \n          #include <logdepthbuf_vertex>\n        \n        }\n      ",
            fragmentShader: "\n        #include <common>\n        #include <logdepthbuf_pars_fragment>\n        #include <dithering_pars_fragment>\n  \n        uniform vec3 color;\n        uniform float opacity;\n        uniform float time;\n  \n        varying vec2 vUv;\n        \n        void main() {\n          #include <logdepthbuf_fragment>\n  \n          float disToCenter = distance( vUv, vec2( 0.5, 0.5 ) );\n  \n          gl_FragColor = vec4( color, (1.0 - vUv.y) * opacity );\n  \n          #include <dithering_fragment>\n        \n        }\n      "
        });
        this._materials.push(t)
    }
    _createTextureMaterial() {
        this._timeTarget = 2 * Math.PI;
        var t = (new THREE.TextureLoader).load(this._url);
        this._uniforms = {
            time: {
                value: this._time
            },
            color: {
                value: new THREE.Vector3(this._color[0],this._color[1],this._color[2])
            },
            opacity: {
                value: this._opacity
            },
            colorTexture: {
                value: t
            }
        },
        this._buildUniforms = {
            time: {
                value: this._time
            },
            color: {
                value: new THREE.Vector3(this._color[0],this._color[1],this._color[2])
            },
            opacity: {
                value: this._opacity
            },
            centerRadius: {
                value: new THREE.Vector4
            },
            viewPort: {
                value: this.app.renderer.getCurrentViewport(new THREE.Vector4)
            },
            colorTexture: {
                value: t
            },
            planeMatrix: {
                value: new THREE.Matrix4
            },
            plane: {
                value: new THREE.Vector4
            }
        };
        let e = new THREE.ShaderMaterial({
            transparent: !0,
            opacity: this._opacity,
            depthTest: !0,
            depthWrite: !1,
            uniforms: this._uniforms,
            vertexShader: "\n        #include <common>\n        #include <logdepthbuf_pars_vertex>\n\n        varying vec2 vUv;\n        \n        void main() {\n          vec3 transformed = vec3( position );\n          vec4 mvPosition = vec4( transformed, 1.0 );\n          mvPosition = modelViewMatrix * mvPosition;\n          gl_Position = projectionMatrix * mvPosition;\n\n          vUv = uv;\n\n          // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );// 会抖动\n\n          #include <logdepthbuf_vertex>\n        \n        }\n      ",
            fragmentShader: "\n        #include <common>\n        #include <logdepthbuf_pars_fragment>\n        #include <dithering_pars_fragment>\n\n        uniform vec3 color;\n        uniform float opacity;\n        uniform float time;\n\n        uniform sampler2D colorTexture;\n\n        varying vec2 vUv;\n\n        vec2 rotateAround( vec2 tempUv, vec2 center, float angle ) {\n          float c = cos( angle );\n          float s = sin( angle );\n\n          float x = tempUv.x - center.x;\n          float y = tempUv.y - center.y;\n      \n          tempUv.x = x * c - y * s + center.x;\n          tempUv.y = x * s + y * c + center.y;\n\n          vec2 temp = tempUv;\n      \n          return temp;\n        }\n        \n        void main() {\n          #include <logdepthbuf_fragment>\n\n          vec2 finalUv = rotateAround( vUv, vec2( 0.5, 0.5 ), -time);\n\n          vec4 textureColor = texture2D( colorTexture, finalUv );\n\n          gl_FragColor = vec4( textureColor.rgb * color, textureColor.a * opacity );\n\n          if (finalUv.x < 0. || finalUv.x > 1. || finalUv.y < 0. || finalUv.y > 1.) discard;\n\n          #include <dithering_fragment>\n        \n        }\n      "
        });
        this._materials.push(e);
        let n = new THREE.ShaderMaterial({
            transparent: !0,
            opacity: this._opacity,
            depthTest: !0,
            depthWrite: !1,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            uniforms: this._buildUniforms,
            vertexShader: "\n        #include <common>\n        #include <logdepthbuf_pars_vertex>\n\n        varying vec2 vUv;\n        varying mat4 projMatrix;\n        \n        void main() {\n          vec3 transformed = vec3( position );\n          vec4 mvPosition = vec4( transformed, 1.0 );\n          mvPosition = modelViewMatrix * mvPosition;\n          gl_Position = projectionMatrix * mvPosition;\n\n          vUv = uv;\n          projMatrix = projectionMatrix;\n\n          // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0 );// 会抖动\n\n          #include <logdepthbuf_vertex>\n        \n        }\n      ",
            fragmentShader: "\n        #include <common>\n        #include <logdepthbuf_pars_fragment>\n        #include <dithering_pars_fragment>\n\n        uniform vec3 color;\n        uniform float opacity;\n        uniform float time;\n        uniform vec4 centerRadius;\n        uniform vec4 viewPort;\n        uniform sampler2D colorTexture;\n        uniform mat4 planeMatrix;\n        uniform vec4 plane;\n\n        varying vec2 vUv;\n        varying mat4 projMatrix;\n\n        vec2 rotateAround( vec2 tempUv, vec2 center, float angle ) {\n          float c = cos( angle );\n          float s = sin( angle );\n\n          float x = tempUv.x - center.x;\n          float y = tempUv.y - center.y;\n      \n          tempUv.x = x * c - y * s + center.x;\n          tempUv.y = x * s + y * c + center.y;\n\n          vec2 temp = tempUv;\n      \n          return temp;\n        }\n\n        vec3 projectPoint(vec3 point){\n\n          // 法线\n          vec3 normal = vec3( plane.x, plane.y, plane.z ) * (-1.0);\n          // 常量\n          float constant = plane.w;\n\n          // 点到平面距离\n          float disToPoint = dot( normal, point ) + constant;\n          disToPoint = -1.0 * disToPoint;\n\n          vec3 temp = vec3( normal.x * disToPoint, normal.y * disToPoint, normal.z * disToPoint );\n\n          vec3 finalPoint = vec3( temp.x + point.x, temp.y + point.y, temp.z + point.z);\n\n          return finalPoint;\n\n        }\n        \n        void main() {\n          #include <logdepthbuf_fragment>\n\n          float radius = centerRadius.w;\n          vec3 center = centerRadius.xyz;\n\n          vec4 ndc = vec4(\n            gl_FragCoord.x / viewPort.z * 2.0 - 1.0,\n            gl_FragCoord.y / viewPort.w * 2.0 - 1.0,\n            gl_FragCoord.z * 2.0 - 1.0,\n            1.0\n          );\n          mat4 inverseProjectionMatrix = inverse( projMatrix );\n          mat4 inverseviewMatrix = inverse( viewMatrix );\n\n          mat4 inversePlaneMatrix = inverse( planeMatrix );\n\n          vec4 p = inverseProjectionMatrix * ndc;\n          vec4 positionWC = inverseviewMatrix * p;\n\n          // 向平面投影\n          vec3 projectPoint = projectPoint( positionWC.xyz / positionWC.w );\n          \n          float disToCenter = distance( projectPoint, center );\n\n          vec4 positionPlane = inversePlaneMatrix * positionWC;\n\n          positionPlane.xy = ( positionPlane.xy / positionPlane.w + radius ) / ( radius * 2.0 );\n\n          vec2 finalUv = rotateAround( positionPlane.xy, vec2( 0.5, 0.5 ), -time);\n\n          vec4 textureColor = texture2D( colorTexture, finalUv );\n\n          gl_FragColor = vec4( textureColor.rgb * color, textureColor.a * opacity );\n\n          if (finalUv.x < 0. || finalUv.x > 1. || finalUv.y < 0. || finalUv.y > 1.) discard;\n\n          #include <dithering_fragment>\n        \n        }\n      "
        });
        this._materials.push(n)
    }
    _createMaterial(t) {
        t === GeoDiffusion.TYPE_TEXTURE_SCALE ? this._createscaleCircularMaterial() : t === GeoDiffusion.TYPE_CYLINDER ? this._createCylinderMaterial() : t === GeoDiffusion.TYPE_TEXTURE_ROTATE && this._createTextureMaterial()
    }
    init() {
        this._renderDiffusion()
    }
    _renderDiffusion() {
        var t = this._diffusionType
            , e = this._radius;
        let n = function(t) {
            this._uniforms.time.value = t.time,
            this._buildUniforms.time.value = t.time
        };
        var a = MapUtil.convertLonlatToWorld(this._coordinates);
        if (a = new THREE.Vector3(a[0],a[1],a[2]),
        t === GeoDiffusion.TYPE_TEXTURE_SCALE) {
            let t = new THREE.PlaneBufferGeometry(3 * e,3 * e,32);
            this._modifyGeometryHeight(t);
            let n = new THREE.Mesh(t,this._materials[0]);
            Object.defineProperty(n, "castShadow", {
                set: function(t) {},
                get: function() {
                    return !1
                }
            }),
            Object.defineProperty(n, "receiveShadow", {
                set: function(t) {},
                get: function() {
                    return !1
                }
            }),
            this.node.add(n),
            this._buildUniforms.centerRadius.value = new THREE.Vector4(a.x,a.y,a.z,e),
            this._buildUniforms.planeMatrix.value = this.node.matrix
        } else if (t === GeoDiffusion.TYPE_CYLINDER) {
            var i = new THREE.CylinderBufferGeometry(e,e,this._cylinderHeight,64,64,!0);
            let t = new THREE.Matrix4;
            t.makeTranslation(0, this._cylinderHeight / 2, 0),
            i.attributes.position.applyMatrix4(t);
            var o = new THREE.Mesh(i,this._materials[0]);
            Object.defineProperty(o, "castShadow", {
                set: function(t) {},
                get: function() {
                    return !1
                }
            }),
            Object.defineProperty(o, "receiveShadow", {
                set: function(t) {},
                get: function() {
                    return !1
                }
            }),
            this.node.add(o),
            n = function(t) {
                o.scale.x = t.time,
                o.scale.y = 1 - t.time,
                o.scale.z = t.time
            }
        } else if (t === GeoDiffusion.TYPE_TEXTURE_ROTATE) {
            let t = new THREE.PlaneBufferGeometry(2 * e,2 * e,1);
            this._modifyGeometryHeight(t);
            let n = new THREE.Mesh(t,this._materials[0]);
            Object.defineProperty(n, "castShadow", {
                set: function(t) {},
                get: function() {
                    return !1
                }
            }),
            Object.defineProperty(n, "receiveShadow", {
                set: function(t) {},
                get: function() {
                    return !1
                }
            }),
            this.node.add(n),
            this._buildUniforms.centerRadius.value = new THREE.Vector4(a.x,a.y,a.z,e),
            this._buildUniforms.planeMatrix.value = this.node.matrix
        }
        if (this._diffusionType !== GeoDiffusion.TYPE_CYLINDER) {
            this.node.position.copy(a),
            this.node.setDirection([a.x, a.y, a.z], 2, [0, 0, 1]);
            let t = new THREE.Vector3(a.x,a.y,a.z).normalize();
            if (this._buildUniforms.plane.value = new THREE.Vector4(t.x,t.y,t.z,6378e3),
            this._scanLayers.length > 0)
                for (let t = 0; t < this._scanLayers.length; t++) {
                    this._scanLayers[t].node.getMeshes().forEach(t=>{
                        t._afterRendererMaterial || (t._afterRendererMaterial = []),
                        t._afterRendererMaterial.push(this._materials[1])
                    }
                    )
                }
        } else
            a = MapUtil.convertLonlatToWorld(this._coordinates, this._offsetHeight),
            a = new THREE.Vector3(a[0],a[1],a[2]),
            this.node.position.copy(a),
            this.node.setDirection([a.x, a.y, a.z], 2, [0, 1, 0]);
        this._createTween(n)
    }
    _createTween(t) {
        var e = {
            time: this._startPosition * this._timeTarget
        }
            , n = this._timeTarget * this._endPosition
            , r = this._tween = new TWEEN.Tween(e).to({
            time: n
        }, 1 / this._speed * 1e4).easing(this._lerpType).onUpdate(e=>{
            t.call(this, e)
        }
        );
        r.repeat(1 / 0),
        r.start()
    }
    _createAlphaTexture(t) {
        for (var e = new Uint8Array(512), n = 0; n < 512; n++) {
            var r = t(n / 512);
            r < 0 ? r = 0 : r > 1 && (r = 1),
            e[n] = 255 * r
        }
        return new THREE.DataTexture(e,512,1,THREE.AlphaFormat)
    }
    _createInterpolantTexture(t) {
        var e = []
            , n = []
            , r = Object.keys(t);
        r.sort();
        for (let a in r)
            e.push(parseFloat(r[a])),
            n.push(t[r[a]]);
        const a = new THREE.LinearInterpolant(Float32Array.from(e),Float32Array.from(n),1,new Float32Array(1));
        for (var i = new Uint8Array(512), o = 0; o < 512; o++) {
            var s = a.evaluate(o / 512);
            s < 0 ? s = 0 : s > 1 && (s = 1),
            i[o] = 255 * s
        }
        return new THREE.DataTexture(i,512,1,THREE.AlphaFormat)
    }
    _modifyGeometryHeight(t) {
        let e = new THREE.Matrix4;
        e.makeTranslation(0, 0, this.offsetHeight),
        t.attributes.position.applyMatrix4(e)
    }
    _updateDiffusion() {
        var t = this.node.children[0]
            , e = MapUtil.convertLonlatToWorld(this._coordinates);
        e = new THREE.Vector3(e[0],e[1],e[2]);
        var n = this._radius
            , a = new THREE.Group;
        if (t.geometry.dispose(),
        delete t.geometry,
        this._diffusionType === GeoDiffusion.TYPE_TEXTURE_SCALE) {
            let r = new THREE.PlaneBufferGeometry(3 * n,3 * n,32);
            this._modifyGeometryHeight(r),
            t.geometry = r,
            this._buildUniforms.centerRadius.value = new THREE.Vector4(e.x,e.y,e.z,n);
            let i = new THREE.Vector3(e.x,e.y,e.z).normalize();
            this._buildUniforms.plane.value = new THREE.Vector4(i.x,i.y,i.z,6378e3),
            a.position.copy(e),
            a.setDirection([e.x, e.y, e.z], 2, [0, 0, 1])
        } else if (this._diffusionType === GeoDiffusion.TYPE_CYLINDER) {
            let o = new THREE.CylinderBufferGeometry(n,n,this._cylinderHeight,32,32,!0);
            var i = new THREE.Matrix4;
            i.makeTranslation(0, this._cylinderHeight / 2, 0),
            o.attributes.position.applyMatrix4(i),
            t.geometry = o,
            e = MapUtil.convertLonlatToWorld(this._coordinates, this._offsetHeight),
            e = new THREE.Vector3(e[0],e[1],e[2]),
            a.position.copy(e),
            a.setDirection([e.x, e.y, e.z], 2, [0, 1, 0])
        } else if (this._diffusionType === GeoDiffusion.TYPE_TEXTURE_ROTATE) {
            let r = new THREE.PlaneBufferGeometry(2 * n,2 * n,1);
            this._modifyGeometryHeight(r),
            t.geometry = r,
            a.position.copy(e),
            a.setDirection([e.x, e.y, e.z], 2, [0, 0, 1]),
            this._buildUniforms.centerRadius.value = new THREE.Vector4(e.x,e.y,e.z,n),
            this._buildUniforms.planeMatrix.value = this.node.matrix;
            let i = new THREE.Vector3(e.x,e.y,e.z).normalize();
            this._buildUniforms.plane.value = new THREE.Vector4(i.x,i.y,i.z,6378e3)
        }
        this._updateTransform(a, this.node)
    }
    _setSpeed() {
        var t = this.node.children[0];
        let e;
        e = this._diffusionType !== GeoDiffusion.TYPE_CYLINDER ? function(t) {
            this._uniforms.time.value = t.time,
            this._buildUniforms.time.value = t.time
        }
        : function(e) {
            t.scale.x = e.time,
            t.scale.y = 1 - e.time,
            t.scale.z = e.time
        }
        ,
        this._createTween(e)
    }
    _setVisible() {
        if (this._diffusionType !== GeoDiffusion.TYPE_CYLINDER && this.node.visible !== this._visible && this._scanLayers.length > 0)
            if (this._visible)
                for (let t = 0; t < this._scanLayers.length; t++) {
                    this._scanLayers[t].node.getMeshes().map(t=>{
                        t._afterRendererMaterial || (t._afterRendererMaterial = []),
                        t._afterRendererMaterial.push(this._materials[1])
                    }
                    )
                }
            else
                for (let t = 0; t < this._scanLayers.length; t++) {
                    this._scanLayers[t].node.getMeshes().map(t=>{
                        if (t._afterRendererMaterial && t._afterRendererMaterial.length > 0) {
                            let e = t._afterRendererMaterial.indexOf(this._materials[1]);
                            -1 !== e && t._afterRendererMaterial.splice(e, 1)
                        }
                    }
                    )
                }
        this.node.visible = this._visible
    }
    _updateTransform(t, e) {
        t.matrix.decompose(e.position, e.quaternion, e.scale),
        e.matrixWorld = t.matrixWorld,
        e.updateMatrix()
    }
    _onResize(t) {
        this._buildUniforms && (this._buildUniforms.viewPort.value = this.app.renderer.getCurrentViewport(new THREE.Vector4))
    }
    destroy() {
        if (super.destroy(),
        this._tween && TWEEN.remove(this._tween),
        this._diffusionType !== GeoDiffusion.TYPE_CYLINDER)
            if (this._scanLayers.length > 0)
                for (let t = 0; t < this._scanLayers.length; t++) {
                    this._scanLayers[t].node.getMeshes().map(t=>{
                        if (t._afterRendererMaterial && t._afterRendererMaterial.length > 0) {
                            let e = t._afterRendererMaterial.indexOf(this._materials[1]);
                            -1 !== e && (t._afterRendererMaterial.splice(e, 1),
                            this._buildUniforms.colorTexture && this._buildUniforms.colorTexture.value && this._buildUniforms.colorTexture.value.dispose(),
                            this._materials[1].dispose())
                        }
                    }
                    )
                }
            else
                this._buildUniforms.colorTexture && this._buildUniforms.colorTexture.value && this._buildUniforms.colorTexture.value.dispose(),
                this._materials[1].dispose();
        this._uniforms.colorTexture && this._uniforms.colorTexture.value && this._uniforms.colorTexture.value.dispose(),
        this._materials && this._materials.length > 0 && this._materials[0] && this._materials[0].dispose();
        var t = this.node.children[0];
        this.node.remove(t)
    }
}
THING.factory.registerClass("GeoDiffusion", GeoDiffusion);
var GeoDiffusion = GeoDiffusion;
GeoDiffusion.TYPE_TEXTURE_ROTATE = "texture",
GeoDiffusion.TYPE_TEXTURE_SCALE = "scaleTexture",
GeoDiffusion.TYPE_CYLINDER = "cylinder";
class BigDataLayer extends Layer {
    constructor(t) {
        super(t),
        this.app = t,
        this.geometryType = "",
        this.meshType = "Mesh"
    }
    setupUserData(t) {
        t || (t = {}),
        t.withGeometryIDAttributes = !0,
        super.setupUserData(t)
    }
    customSetup(t) {
        if (super.customSetup(t),
        this.name = t.name || "bigDataLayer_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this.dataSource = this.data = t.dataSource || {
            type: "FeatureCollection",
            features: []
        },
        this.groupInfo = {},
        this._renderer = {},
        this._geoObjectArray = [],
        this._geometryArray = [],
        t.renderer && (this._renderer = JSON.parse(JSON.stringify(t.renderer))),
        this.mergeCount = 1e5,
        this.sync = THING.Utils.parseValue(t.sync, !1),
        this._heightArray = t.heightArray,
        this._workerCount = void 0 === t.workerCount ? 4 : t.workerCount,
        this._offsetHeight = t.offsetHeight,
        this._offsetHeightField = t.offsetHeightField,
        this._offsetHeightAdded = THING.Utils.parseValue(t.offsetHeightAdded, 0),
        this._offsetHeightFactor = THING.Utils.parseValue(t.offsetHeightFactor, 1),
        this._groundHeightField = t.groundHeightField,
        this._groundHeightFactor = THING.Utils.parseValue(t.groundHeightFactor, 1),
        this._extrudeHeight = t.extrudeHeight || this._renderer.extrudeHeight,
        this._extrudeField = t.extrudeField || this._renderer.extrudeField,
        this._extrudeFactor = t.extrudeFactor || this._renderer.extrudeFactor,
        this._clampToGround = THING.Utils.parseValue(t.clampToGround, !1),
        this._setupComplete = super.setupComplete,
        this._inVisibleIndices = THING.Utils.parseValue(t.inVisibleIndices, []),
        this.on(THING.EventType.BigDataLayerComplete, function(e) {
            this._setupComplete(t),
            this._afterSetup()
        }),
        this._dataHandler(this.data, this._renderer, this.mergeCount, this.geometryType, this.inVisibleIndices),
        this.extent = CMAP.Util.getFeatureCollectionExtent(this.dataSource),
        this._complete = t.complete,
        this.data.features && 0 === this.data.features.length)
            return void this.trigger(THING.EventType.BigDataLayerComplete, {
                object: this
            });
        let e = this;
        MapUtil._addObserver(this._renderer, function(t) {
            e.node.getMaterials().forEach(e=>{
                e.opacity = t
            }
            )
        }),
        this.sync || (this.trigger(THING.EventType.BigDataLayerComplete, {
            object: this
        }),
        THING.App.current.trigger(THING.EventType.BigDataLayerComplete, {
            object: this
        }),
        this.geometryType && "GeoBuilding" === this.geometryType && THING.App.current.trigger("MergeBuildingProgress", {
            progress: 1,
            name: this.name
        }))
    }
    _getOffsetHeightByFieldAndFactor(t, e, n=1, r=0) {
        return THING.Utils.isNull(t[e]) || isNaN(t[e]) || "object" == typeof t[e] ? r : t[e] * n + r
    }
    _getOffsetHeight(t) {
        let e = this._offsetHeight;
        if (THING.Utils.isNull(e)) {
            let n = 0
                , r = this._getOffsetHeightByFieldAndFactor(t.properties, this._offsetHeightField, this._offsetHeightFactor, this._offsetHeightAdded);
            if (this._groundHeightField && "无" !== this._groundHeightField)
                if (n = t.properties[this._groundHeightField],
                Array.isArray(n)) {
                    e = [];
                    for (let t = 0; t < n.length; t++)
                        e[t] = n[t] * this._groundHeightFactor + r
                } else
                    e = (n = this._getOffsetHeightByFieldAndFactor(t.properties, this._groundHeightField, this._groundHeightFactor)) + r;
            else
                e = r
        }
        return e
    }
    setupComplete(t) {}
    get offsetHeight() {
        return THING.Utils.parseValue(this._offsetHeight, 0)
    }
    set offsetHeight(t) {
        this._getMeshes().forEach(e=>e.translate([0, t - this.offsetHeight, 0])),
        this._offsetHeight = t
    }
    get inVisibleIndices() {
        return this._inVisibleIndices
    }
    set inVisibleIndices(t) {
        this._inVisibleIndices = t;
        let e = new Float32Array(this.dataSource.features.length);
        for (let n = 0; n < this.dataSource.features.length; n++)
            t.length > 0 && t.indexOf(n) >= 0 ? e[n] = 0 : e[n] = 1;
        let n = 0
            , r = this.node.getGeometries();
        r.sort(function(t, e) {
            return (t = t.attributes.id.array[0]) - (e = e.attributes.id.array[0])
        });
        for (let t = 0; t < r.length; t++) {
            const a = r[t]
                , i = a.attributes.id.array;
            let o = new Float32Array(i.length);
            0 === t && (n = i[0]);
            for (let t = 0; t < i.length; t++) {
                const r = i[t] - n;
                o[t] = e[r]
            }
            a.addAttribute("vis", new THREE.BufferAttribute(o,1))
        }
        THING.App.current.rendererManager._mainRenderer.dirty(),
        THING.App.current.picker.needUpdate = !0
    }
    setRenderer(t) {
        this.removeContent(),
        this._renderer = t,
        THING.Utils.isNull(t.extrudeField) || (this._extrudeField = t.extrudeField),
        THING.Utils.isNull(t.extrudeFactor) || (this._extrudeFactor = t.extrudeFactor),
        this._dataHandler(this.data, this._renderer, this.mergeCount, this.geometryType, this.inVisibleIndices)
    }
    get renderer() {
        return this._renderer
    }
    updateRenderer(t) {
        for (var e in this.removeContent(),
        t)
            this._renderer[e] = t[e];
        this._dataHandler(this.data, this._renderer, this.mergeCount, this.geometryType, this.inVisibleIndices),
        this._afterSetup()
    }
    _dataHandler(t, e, n, r, a) {
        let i = this._createLayerMesh(t, e, n, r, a);
        if (!this.sync)
            for (var o = 0; o < i.length; o++)
                this.node.add(i[o])
    }
    removeContent() {
        for (var t = this.node.children.length - 1; t >= 0; t--)
            this.node.remove(this.node.children[t]);
        this.groupInfo = {},
        this.clearPickIdBuffer()
    }
    clearPickIdBuffer() {
        for (let t = CMAP.getCurrentMap().pickIdBuffer.length - 1; t >= 0; t--)
            CMAP.getCurrentMap().pickIdBuffer[t].node === this.node && CMAP.getCurrentMap().pickIdBuffer.splice(t, 1)
    }
    _parseData(t, e) {
        var n, a = t.features, i = {}, o = {}, s = CMAP.getCurrentMap().pickIdBuffer;
        n = 0 === s.length ? {
            start: 0,
            count: a.length,
            node: this.node
        } : {
            start: s[s.length - 1].start + s[s.length - 1].count,
            count: a.length,
            node: this.node
        },
        s.push(n);
        for (var l = 0; l < a.length; l++) {
            var u = a[l]
                , c = []
                , h = u.properties;
            u.pickId = n.start + l;
            var d = {};
            for (var f in e) {
                var p = e[f];
                if (Array.isArray(p))
                    if (void 0 !== p[0].condition)
                        for (var m in p) {
                            var g = p[m].condition;
                            if ("" === g && (d[f] = p[m].value),
                            MapUtil.isObjectMeetCondition(h, g)) {
                                -1 === c.indexOf(g) && c.push(g),
                                d[f] = p[m].value;
                                break
                            }
                        }
                    else
                        d[f] = p;
                else
                    d[f] = p
            }
            var v = JSON.stringify(c);
            i[v] || (i[v] = []),
            o[v] || (o[v] = []),
            i[v].push(u),
            o[v] = d
        }
        return {
            groupInfo: i,
            rendererInfo: o
        }
    }
    on() {
        arguments.length < 2 && THING.Utils.log("参数不合法");
        var t = null
            , e = 0;
        for (let n = 0; n < arguments.length; n++)
            "function" == typeof arguments[n] && (t = arguments[n],
            e = n);
        if (arguments[0].toLowerCase().indexOf("complete") < 0 && t) {
            arguments[e] = function(e) {
                let n = e.object.node._pickedId;
                void 0 !== n && CMAP.getCurrentMap().pickIdBuffer.forEach(function(t) {
                    t.node === e.object.node && (e.userData = e.object.dataSource.features[n - CMAP.pickIdStartNum - t.start].properties,
                    e.coordinates = e.object.dataSource.features[n - CMAP.pickIdStartNum - t.start].geometry.coordinates,
                    e.dataIndex = e.id = n - CMAP.pickIdStartNum - t.start,
                    e.pickId = n)
                }),
                t.call(e.object, e)
            }
        }
        super.on.apply(this, arguments)
    }
    createGeoObject(t, e, n, r) {
        return {}
    }
    createGeoObjectSync(t, e, n, r, a, i) {
        return {}
    }
    createGeometryManager(t, e) {
        var n = new t3djs.GeometryManager(t,e);
        let r = 0;
        return CMAP.getCurrentMap().pickIdBuffer.length > 0 && (r += CMAP.getCurrentMap().pickIdBuffer[CMAP.getCurrentMap().pickIdBuffer.length - 1].start),
        n.setIdStartNum(r),
        n.setMergeNums(this.mergeCount),
        n
    }
    createMesh(t, e, n) {
        return {}
    }
    createMaterial(t) {
        return {}
    }
    mergeGeometry(t, e) {
        return []
    }
    _afterSetup() {
        this._updatePostEffect(this.renderer)
    }
    _getMeshes() {
        var t = this
            , e = [];
        return this.node.traverse(function(n) {
            n.type && n.type === t.meshType && e.push(n)
        }),
        e
    }
    _setPostRadiusEffect(t, e="radialBlur") {
        let n = this.app;
        this._getMeshes().forEach(function(r) {
            t ? n.effectManager.setEffect(r, e, !0) : n.effectManager.removeEffect(r, e)
        })
    }
    _setPostRadialBlur2(t) {
        this._setPostRadiusEffect(t, "radialBlur2")
    }
    destroy(t) {
        this._updateName && CMAP.Updater.delete(this._updateName),
        this.clearPickIdBuffer(),
        super.destroy(t)
    }
    _resetRenderer(t) {
        for (let e in this._renderer)
            Array.isArray(this._renderer[e]) && this._renderer[e].length > 0 && void 0 !== this._renderer[e].condition && void 0 !== t[e] && (this._renderer[e] = t[e])
    }
    _createLayerMesh(t, e, n, a, i) {
        console.time("开始创建" + a);
        var o = this;
        console.time("解析数据");
        let s = this._parseData(t, e);
        console.timeEnd("解析数据");
        let l = s.groupInfo
            , u = Object.keys(l).length
            , c = s.rendererInfo
            , h = []
            , d = Math.floor(this._workerCount / u) <= 0 ? 1 : Math.floor(this._workerCount / u);
        this._workerCount = d * u;
        var f, p = 0, m = 0, g = 0;
        function v(t) {
            let e = 1;
            return i.length > 0 && i.indexOf(t) >= 0 && (e = 0),
            e
        }
        for (var y in l) {
            f || (f = M.a.getReferencePosition(l[y][0].geometry.coordinates, this.offsetHeight));
            var _ = c[y]
                , x = l[y]
                , b = new THREE.Group
                , w = 1;
            if ("GeoPoint" !== this.geometryType)
                if (this.sync) {
                    g === Object.keys(l).length - 1 && (d = this._workerCount - p);
                    var C = this.createGeometryManager("geometryManager_" + this.queryID + "_" + g, d);
                    p += d;
                    for (let t = 0; t < x.length; t++) {
                        let e = x[t];
                        this.createGeoObjectSync(e, f, _, C, e.pickId, v(t))
                    }
                    C._renderer = _,
                    C._tempParent = b,
                    b.setPosition(f),
                    M.a._setNodeAnglesByPosition(b, f),
                    C.finish(function(t) {
                        let e = CMAP.Util.position2angles([this._tempParent.position.x, this._tempParent.position.y, this._tempParent.position.z])
                            , n = CMAP.Util.anglesToQuaternion(e).inverse();
                        this._renderer._quaternion = n;
                        var r = o.createMaterial(this._renderer)
                            , a = o.createMesh(t, r, this._renderer);
                        "cool" === _.type && _.effect && THING.App.current.effectManager.setEffect(a, "glow", _.glowStrength),
                        this._tempParent.add(a),
                        o.node.add(this._tempParent)
                    }, function(t) {}, function(t) {
                        var e = t.mergedGeometry.length;
                        THING.Utils.log("最终创建物体个数:", e),
                        t.dispose(),
                        ++m === u && (o.renderOrder = o.renderOrder,
                        setTimeout(function() {
                            o.trigger(THING.EventType.BigDataLayerComplete, {
                                object: o
                            }),
                            THING.App.current.trigger(THING.EventType.BigDataLayerComplete, {
                                object: o
                            }),
                            MapUtil._updateShadowNextFrame()
                        }, 0))
                    })
                } else {
                    console.time("创建GeoObject");
                    for (var E = 0; E < x.length; E++) {
                        E > x.length / 10 * w && (THING.App.current.trigger("MergeBuildingProgress", {
                            progress: .1 * w,
                            name: this.name
                        }),
                        w += 1);
                        var T = x[E]
                            , A = this.createGeoObject(T, f, _, E);
                        this._geoObjectArray.push(A),
                        0 === A.geometryArray.length && this._geometryArray.push(new THREE.BufferGeometry);
                        for (var P = 0; P < A.geometryArray.length; P++) {
                            let t = A.geometryArray[P].attributes.position.count
                                , e = new Float32Array(t)
                                , n = new Float32Array(t);
                            n.fill(v(E)),
                            e.fill(CMAP.pickIdStartNum + T.pickId),
                            A.geometryArray[P].addAttribute("id", new THREE.BufferAttribute(e,1)),
                            A.geometryArray[P].addAttribute("vis", new THREE.BufferAttribute(n,1)),
                            this._geometryArray.push(A.geometryArray[P])
                        }
                    }
                    console.timeEnd("创建GeoObject"),
                    console.time("合并GeoObject");
                    var S = this.mergeGeometry(this._geometryArray, n);
                    console.timeEnd("合并GeoObject"),
                    this._geometryArray = [],
                    this._geoObjectArray = [],
                    b.setPosition(f),
                    M.a._setNodeAnglesByPosition(b, f);
                    let t = CMAP.Util.position2angles(f)
                        , e = CMAP.Util.anglesToQuaternion(t).inverse();
                    _._quaternion = e,
                    console.time("创建Material");
                    var R = this.createMaterial(_);
                    console.timeEnd("创建Material"),
                    console.time("创建Mesh");
                    for (var D = 0; D < S.length; D++) {
                        var j = this.createMesh(S[D], R, _);
                        ("GeoBuilding" !== this.geometryType && "GeoPolygon" !== this.geometryType || ("GeoBuilding" === this.geometryType || "GeoPolygon" === this.geometryType) && "cool" === _.type) && _.effect && THING.App.current.effectManager.setEffect(j, "glow", _.glowStrength),
                        b.add(j)
                    }
                    console.timeEnd("创建Mesh"),
                    h.push(b),
                    MapUtil._updateShadowNextFrame()
                }
            else {
                let e = this.createGeoObject(x, f, _)
                    , n = this.createMaterial(_)
                    , r = e.geometryArray[0]
                    , a = r.attributes.position.count
                    , o = new Float32Array(a)
                    , s = new Float32Array(a);
                for (let e = 0; e < t.features.length; e++) {
                    var L = t.features[e].pickId;
                    o[e] = CMAP.pickIdStartNum + L,
                    i.length > 0 && i.indexOf(e) >= 0 ? s[e] = 0 : s[e] = 1
                }
                r.addAttribute("id", new THREE.BufferAttribute(o,1)),
                r.addAttribute("vis", new THREE.BufferAttribute(s,1));
                let l = this.createMesh(r, n, _);
                b.add(l),
                h.push(b)
            }
            g++
        }
        if (console.timeEnd("开始创建" + a),
        !this.sync)
            return h
    }
}
THING.factory.registerClass("BigDataLayer", BigDataLayer);
var BigDataLayer = BigDataLayer;
class Oe extends BigDataLayer {
    constructor(t) {
        super(t),
        this.geometryType = "GeoBuilding"
    }
    _parseRenderer(t) {
        let e = !1;
        "image" !== this._renderer.type && (e = !0),
        t.lights = THING.Utils.parseValue(t.lights, e),
        this._resetRenderer(t)
    }
    _createLayerMesh(t, e, n, r, a) {
        return this._extrudeFactor = THING.Utils.parseValue(this._extrudeFactor, 1),
        this._parseRenderer(e),
        super._createLayerMesh(t, e, n, r, a)
    }
    createGeoObject(t, e, n) {
        let r = this._extrudeHeight || this._height || n.extrudeHeight || n.height;
        if (void 0 !== r && 0 !== r || (r = parseFloat(t.properties[this._extrudeField]) * parseFloat(this._extrudeFactor)),
        (isNaN(r) || void 0 === r || 0 === r) && (r = .1),
        0 === t.geometry.coordinates.length)
            return {
                geometryArray: []
            };
        n && (n.textureSize = n.textureSize || [3, 3],
        n.windowTextureSize = n.windowTextureSize || M.a._defaultWindowTextureSize);
        let a = this._getOffsetHeight(t);
        var i = [];
        if (t.geometry && t.geometry.coordinates && t.geometry.coordinates.length > 0) {
            var o = M.a.createBuilding(t.geometry.coordinates, r, e, "BUILDING", n.textureSize, null, a, !0, n.windowTextureSize);
            i = this.mergeGeometry(o.geometryArray, 1e6)
        }
        return o.geometryArray = i,
        o
    }
    createGeoObjectSync(t, e, n, r, a, i) {
        let o = this._extrudeHeight || this._height || this.renderer.extrudeHeight || this.renderer.height;
        void 0 !== o && 0 !== o || (o = parseFloat(t.properties[this._extrudeField]) * parseFloat(this._extrudeFactor)),
        (isNaN(o) || void 0 === o || 0 === o) && (o = .1),
        n && (n.textureSize = n.textureSize || [3, 3],
        n.windowTextureSize = n.windowTextureSize || M.a._defaultWindowTextureSize);
        let s = this._getOffsetHeight(t);
        t.geometry && t.geometry.coordinates && t.geometry.coordinates.length > 0 && M.a.createBuilding(t.geometry.coordinates, o, e, "BUILDING", n.textureSize, r, s, !0, n.windowTextureSize, a, i)
    }
    createMaterial(t) {
        let e = t._quaternion;
        t = new Renderer(void 0,t);
        var n = JSON.parse(JSON.stringify(t.toObject()));
        n.quaternion = e;
        const r = Ut.createBuildingMaterial(n);
        return r.forEach(t=>{
            t.defines || (t.defines = {}),
            t.defines.USE_VISIBLE = !0
        }
        ),
        r
    }
    createMesh(t, e, n) {
        return M.a.createBuildingMesh(t, e, n)
    }
    mergeGeometry(t, e) {
        return t3djs.util.mergeBufferGeometry(t, e, !0)
    }
}
THING.factory.registerClass("BigBuildingLayer", Oe);
var BigBuildingLayer = Oe;
class He extends BigDataLayer {
    constructor(t) {
        super(t),
        this.geometryType = "GeoLine",
        this._particalParent = new THREE.Group
    }
    createGeoObject(t, e, n, r) {
        let a;
        this._heightArray && (a = this._heightArray[r]);
        const i = this._getOffsetHeight(t);
        return M.a.createLine(t.geometry.coordinates, a, e, n.lineType, n.width, n.textureSize, n.textureWrap, this._clampToGround, i)
    }
    _parseRenderer(t) {
        THING.Utils.isNull(t.blending) && ("vector" === t.type ? t.blending = !1 : "image" === t.type && (t.blending = !0)),
        t.opacity = THING.Utils.parseValue(t.opacity, 1),
        t.color = THING.Utils.parseValue(t.color, [255, 255, 255]);
        const e = CMAP.Util.colorFormatNewToOld(t.color, t.opacity) || [1, 1, 1, 1];
        t.opacity = e[3],
        t.color = CMAP.Util.colorFormatOldToNew(e),
        t.width = THING.Utils.parseValue(t.width, 5),
        t._isBigLineLayer = !0,
        this._resetRenderer(t)
    }
    createMaterial(t) {
        this._parseRenderer(t);
        let e = Ut.createLineMaterial(t);
        return e.defines || (e.defines = {}),
        e.defines.USE_VISIBLE = !0,
        e
    }
    createMesh(t, e, n) {
        return "Line" === n.lineType ? this.meshType = "LineSegments" : this.meshType = "Mesh",
        M.a.createLineMesh(t, e, n)
    }
    mergeGeometry(t, e) {
        return t3djs.util.mergeBufferGeometry(t, e)
    }
    _dataHandler(t, e, n, r, a) {
        super._dataHandler(t, e, n, r, a),
        this.renderer.type
    }
    _getSpritePositionByPer(t, e) {
        var n = [0, 0, 0]
            , r = this._uvArray[e].segs;
        for (var a in t /= this.totalLengthArray[e],
        r) {
            var i = r[a].startPoint.textureCoord[0]
                , o = r[a].endPoint.textureCoord[0];
            if (t > i && t < o) {
                var s = [r[a].endPoint[0] - r[a].startPoint[0], r[a].endPoint[1] - r[a].startPoint[1], r[a].endPoint[2] - r[a].startPoint[2]]
                    , l = (t - i) / (o - i);
                n = [r[a].startPoint[0] + l * s[0], r[a].startPoint[1] + l * s[1], r[a].startPoint[2] + l * s[2]];
                break
            }
        }
        return n
    }
    _drawSprite(t) {
        if (this.taskName = [],
        0 !== this.renderer.speed && "Pipe" !== this.renderer.lineType)
            for (var e = this.particle = this.node.createChild("particle"), n = 0; n < t; n++) {
                var a = this.particleSystem = new THREE.GPUParticleSystem({
                    maxParticles: 30
                })
                    , i = e.createChild("particle" + n)
                    , o = t3djs.sceneManager.createEntity(a);
                i.attachObject(o),
                e.add(i);
                var s = {
                    position: new THREE.Vector3,
                    positionRandomness: 0,
                    velocity: new THREE.Vector3,
                    velocityRandomness: 0,
                    color: 16777215,
                    colorRandomness: 0,
                    turbulence: 0,
                    lifetime: 1,
                    size: 1 + this.renderer.width / 2,
                    sizeRandomness: 0
                }
                    , l = {
                    speed: this.renderer.speed,
                    per: 0,
                    particleSystem: a,
                    options: s,
                    clock: new THREE.Clock,
                    tick: 0,
                    spawnerOptions: {
                        spawnRate: 10,
                        horizontalSpeed: 1.5,
                        verticalSpeed: 1.33,
                        timeScale: 1
                    },
                    index: n,
                    update: function() {
                        var t = this.clock.getDelta() * this.spawnerOptions.timeScale;
                        if (this.tick += t,
                        this.tick < 0 && (this.tick = 0),
                        this.per += 30 * this.speed,
                        this.per > this.totalLengthArray[this.index] && (this.per = 0),
                        t > 0) {
                            var e = this._getSpritePositionByPer(this.per, this.index)
                                , n = this._particalParent.convertWorldToLocalPosition(e);
                            this.options.position.set(n[0], n[1], n[2]),
                            this.particleSystem.spawnParticle(this.options)
                        }
                        this.particleSystem.update(this.tick)
                    }
                }
                    , u = MapUtil.getUUID();
                this.taskName.push(u),
                t3djs.buffer._renderList.add(u, l)
            }
    }
}
THING.factory.registerClass("BigLineLayer", He);
var BigLineLayer = He;
class Be extends BigDataLayer {
    constructor(t) {
        super(t),
        this.app = t,
        this.geometryType = "GeoPoint",
        this.meshType = "Points",
        this._updateName = "bigPointRefresh" + this.queryID,
        this.extent = {}
    }
    createGeoObject(t, e, n) {
        let a = {
            minX: 180,
            minY: 90,
            maxX: -180,
            maxY: -90
        };
        for (var i = 0; i < t.length; i++) {
            const e = t[i].geometry.coordinates;
            e[0] < a.minX && (a.minX = e[0]),
            e[0] > a.maxX && (a.maxX = e[0]),
            e[1] < a.minY && (a.minY = e[1]),
            e[1] > a.maxY && (a.maxY = e[1])
        }
        this.extent = a;
        let o = new Float32Array(3 * t.length)
            , s = new Float32Array(4 * t.length)
            , l = new Float32Array(2 * t.length);
        for (let e = 0; e < t.length; e++) {
            let n = this._getOffsetHeight(t[e])
                , i = MapUtil.convertLonlatToWorld(t[e].geometry.coordinates, n);
            o[3 * e] = i[0],
            o[3 * e + 1] = i[1],
            o[3 * e + 2] = i[2],
            s[4 * e] = 1,
            s[4 * e + 1] = 1,
            s[4 * e + 2] = 1,
            s[4 * e + 3] = 1,
            l[2 * e] = (t[e].geometry.coordinates[0] - a.minX) / (a.maxX - a.minX),
            l[2 * e + 1] = (t[e].geometry.coordinates[1] - a.minY) / (a.maxY - a.minY)
        }
        return {
            geometryArray: [t3djs.util.createBigPointGeometry(o, s, l)]
        }
    }
    createMaterial(t) {
        this._parseRenderer(t);
        let e = t.size
            , n = JSON.parse(JSON.stringify(t));
        "vector" === t.type && (n.type = t.vectorType);
        let r = t3djs.util.createBigPointMaterial(this.name + "_mat", e, n);
        if (t.uvMapUrl) {
            r.defines.USE_UVMAP = !0;
            var a = new THREE.TextureLoader;
            r.uniforms.uvMap.value = a.load(t.uvMapUrl)
        }
        return t.depthTest && (r.depthTest = !0),
        r
    }
    createMesh(t, e, n) {
        let r = this.app;
        var a = t3djs.util.createBigPointMesh(t, e);
        if (n.effect) {
            let t = 1;
            void 0 !== n.glowStrength && (t = n.glowStrength),
            r.effectManager.setEffect(a, "glow", t)
        }
        return n.postRadialBlur && r.effectManager.setEffect(a, "radialBlur", !0),
        n.postRadialBlur2 && r.effectManager.setEffect(a, "radialBlur2", !0),
        a
    }
    _parseRenderer(t) {
        t.effect = THING.Utils.parseValue(t.effect, !1),
        t.glowStrength = THING.Utils.parseValue(t.glowStrength, .5),
        t.postRadialBlur = THING.Utils.parseValue(t.postRadialBlur, !1),
        t.size = THING.Utils.parseValue(t.size, 10),
        t.opacity = THING.Utils.parseValue(t.opacity, 1),
        t.lineOpacity = THING.Utils.parseValue(t.lineOpacity, 1),
        t.type = THING.Utils.parseValue(t.type, "vector"),
        t.vectorType = THING.Utils.parseValue(t.vectorType, "circle"),
        t.color && (t.color = MapUtil.colorFormatNewToOld(t.color, t.opacity)),
        t.lineColor && (t.lineColor = MapUtil.colorFormatNewToOld(t.lineColor, t.lineOpacity)),
        t.blending = MapUtil._parseBlending(t.blending),
        t.speed = THING.Utils.parseValue(t.speed, 0),
        t.loopType = THING.Utils.parseValue(t.loopType, THING.LoopType.Repeat),
        this._resetRenderer(t)
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        for (var e = this._getMeshes()[0].geometry.attributes.position.array, n = 0, r = e.length / 3; n < r; n++) {
            var a = [e[3 * n], e[3 * n + 1], e[3 * n + 2]]
                , i = CMAP.Util.convertWorldToLonlat(a);
            a = CMAP.Util.convertLonlatToWorld([i[0], i[1]], t),
            e[3 * n] = a[0],
            e[3 * n + 1] = a[1],
            e[3 * n + 2] = a[2]
        }
        this._getMeshes()[0].geometry.setAttribute("position", new THREE.BufferAttribute(e,3)),
        this._offsetHeight = t
    }
    _afterSetup() {
        super._afterSetup();
        let t = this
            , e = this.renderer.speed;
        e = e * this.app.deltaTime / 16.667;
        let n = this.renderer.loopType;
        if (e > 0) {
            let r = this.node.getMaterials();
            r.forEach(function(t) {
                t.uniforms.offset.value.x = 1
            }),
            n === THING.LoopType.Repeat ? C.a.add(t._updateName, function() {
                r.forEach(function(t) {
                    t.uniforms.offset.value.x < -1 && (t.uniforms.offset.value.x = 1);
                    let n = t.uniforms.offset.value.x - .001 * e;
                    t.uniforms.offset.value.setX(n)
                }),
                t.app.rendererManager._mainRenderer.dirty()
            }) : n === THING.LoopType.PingPong ? C.a.add(this._updateName, function() {
                r.forEach(function(t) {
                    (t.uniforms.offset.value.x < -1 || t.uniforms.offset.value.x > 1) && (e *= -1);
                    let n = t.uniforms.offset.value.x + .001 * e;
                    t.uniforms.offset.value.setX(n)
                }),
                t.app.rendererManager._mainRenderer.dirty()
            }) : C.a.add(this._updateName, function() {
                r.forEach(function(n) {
                    n.uniforms.offset.value.x < -1 && (C.a.delete(t._updateName),
                    n.uniforms.offset.value.x = 0);
                    let r = n.uniforms.offset.value.x - .001 * e;
                    n.uniforms.offset.value.setX(r)
                }),
                t.app.rendererManager._mainRenderer.dirty()
            })
        }
    }
}
THING.factory.registerClass("BigPointLayer", Be);
var BigPointLayer = Be;
const Ne = 6370996.81
    , ze = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0]
    , qe = [75, 60, 45, 30, 15, 0]
    , Ve = [[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2], [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]]
    , We = [[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]];
var Ge = class {
    constructor() {
        this.isWgs84 = !1
    }
    getDistanceByMC(t, e) {
        if (!t || !e)
            return 0;
        if (!(t = this.convertMC2LL(t)))
            return 0;
        const n = this.toRadians(t.lng)
            , r = this.toRadians(t.lat);
        if (!(e = this.convertMC2LL(e)))
            return 0;
        const a = this.toRadians(e.lng)
            , i = this.toRadians(e.lat);
        return this.getDistance(n, a, r, i)
    }
    getDistanceByLL(t, e) {
        if (!t || !e)
            return 0;
        t.lng = this.getLoop(t.lng, -180, 180),
        t.lat = this.getRange(t.lat, -74, 74),
        e.lng = this.getLoop(e.lng, -180, 180),
        e.lat = this.getRange(e.lat, -74, 74);
        const n = this.toRadians(t.lng)
            , r = this.toRadians(t.lat)
            , a = this.toRadians(e.lng)
            , i = this.toRadians(e.lat);
        return this.getDistance(n, a, r, i)
    }
    convertMC2LL(t) {
        if (!t)
            return {
                lng: 0,
                lat: 0
            };
        let e = {};
        if (this.isWgs84) {
            e.lng = t.lng / 20037508.34 * 180;
            const n = t.lat / 20037508.34 * 180;
            return e.lat = 180 / Math.PI * (2 * Math.atan(Math.exp(n * Math.PI / 180)) - Math.PI / 2),
            {
                lng: e.lng.toFixed(6),
                lat: e.lat.toFixed(6)
            }
        }
        Math.abs(t.lng);
        const n = Math.abs(t.lat);
        let r;
        for (let t = 0; t < ze.length; t++)
            if (n >= ze[t]) {
                r = Ve[t];
                break
            }
        return {
            lng: (e = this.convertor(t, r)).lng.toFixed(6),
            lat: e.lat.toFixed(6)
        }
    }
    convertLL2MC(t) {
        if (!t)
            return {
                lng: 0,
                lat: 0
            };
        if (t.lng > 180 || t.lng < -180 || t.lat > 90 || t.lat < -90)
            return t;
        if (this.isWgs84) {
            const e = {}
                , n = 6378137;
            e.lng = t.lng * Math.PI / 180 * n;
            const r = t.lat * Math.PI / 180;
            return e.lat = n / 2 * Math.log((1 + Math.sin(r)) / (1 - Math.sin(r))),
            {
                lng: parseFloat(e.lng.toFixed(2)),
                lat: parseFloat(e.lat.toFixed(2))
            }
        }
        t.lng = this.getLoop(t.lng, -180, 180),
        t.lat = this.getRange(t.lat, -74, 74),
        t.lng;
        const e = t.lat;
        let n;
        for (let t = 0; t < qe.length; t++)
            if (e >= qe[t]) {
                n = We[t];
                break
            }
        if (!n)
            for (let t = 0; t < qe.length; t++)
                if (e <= -qe[t]) {
                    n = We[t];
                    break
                }
        const r = this.convertor(t, n);
        return {
            lng: parseFloat(r.lng.toFixed(2)),
            lat: parseFloat(r.lat.toFixed(2))
        }
    }
    convertor(t, e) {
        if (!t || !e)
            return {
                lng: 0,
                lat: 0
            };
        let n = e[0] + e[1] * Math.abs(t.lng);
        const r = Math.abs(t.lat) / e[9];
        let a = e[2] + e[3] * r + e[4] * r * r + e[5] * r * r * r + e[6] * r * r * r * r + e[7] * r * r * r * r * r + e[8] * r * r * r * r * r * r;
        return {
            lng: n *= t.lng < 0 ? -1 : 1,
            lat: a *= t.lat < 0 ? -1 : 1
        }
    }
    getDistance(t, e, n, r) {
        return Ne * Math.acos(Math.sin(n) * Math.sin(r) + Math.cos(n) * Math.cos(r) * Math.cos(e - t))
    }
    toRadians(t) {
        return Math.PI * t / 180
    }
    toDegrees(t) {
        return 180 * t / Math.PI
    }
    getRange(t, e, n) {
        return null !== e && (t = Math.max(t, e)),
        null !== n && (t = Math.min(t, n)),
        t
    }
    getLoop(t, e, n) {
        for (; t > n; )
            t -= n - e;
        for (; t < e; )
            t += n - e;
        return t
    }
    lngLatToMercator(t) {
        return this.convertLL2MC(t)
    }
    lngLatToPoint(t) {
        const e = this.convertLL2MC(t);
        return {
            x: e.lng,
            y: e.lat
        }
    }
    mercatorToLngLat(t) {
        return this.convertMC2LL(t)
    }
    pointToLngLat(t) {
        const e = {
            lng: t.x,
            lat: t.y
        };
        return this.convertMC2LL(e)
    }
    pointToPixel(t, e, n, r) {
        if (!t)
            return {
                x: 0,
                y: 0
            };
        t = this.lngLatToMercator(t);
        const a = this.getZoomUnits(e);
        return {
            x: Math.round((t.lng - n.lng) / a + r.width / 2),
            y: Math.round((n.lat - t.lat) / a + r.height / 2)
        }
    }
    pixelToPoint(t, e, n, r) {
        if (!t)
            return {
                lng: 0,
                lat: 0
            };
        const a = this.getZoomUnits(e)
            , i = {
            lng: n.lng + a * (t.x - r.width / 2),
            lat: n.lat - a * (t.y - r.height / 2)
        };
        return this.mercatorToLngLat(i)
    }
    getZoomUnits(t) {
        return Math.pow(2, 18 - t)
    }
}
;
var BaiduMercatorTilingScheme = class extends Cesium.WebMercatorTilingScheme {
    constructor(t) {
        super(t);
        const e = new Ge;
        this._projection.project = function(t, n) {
            return (n = [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude)])[0] = Math.min(n[0], 180),
            n[0] = Math.max(n[0], -180),
            n[1] = Math.min(n[1], 74.000022),
            n[1] = Math.max(n[1], -71.988531),
            n = e.lngLatToPoint({
                lng: n[0],
                lat: n[1]
            }),
            new Cesium.Cartesian2(n.x,n.y)
        }
        ,
        this._projection.unproject = function(t, n) {
            return n = n || {},
            n = e.mercatorToLngLat({
                lng: t.x,
                lat: t.y
            }),
            new Cesium.Cartographic(Cesium.Math.toRadians(n.lng),Cesium.Math.toRadians(n.lat))
        }
        ,
        this.resolutions = t.resolutions || []
    }
    tileXYToNativeRectangle(t, e, n, r) {
        const a = this.resolutions[n]
            , i = t * a
            , o = (t + 1) * a
            , s = (1 + (e = -e)) * a
            , l = e * a;
        return Cesium.defined(r) ? (r.west = i,
        r.south = l,
        r.east = o,
        r.north = s,
        r) : new Cesium.Rectangle(i,l,o,s)
    }
    positionToTileXY(t, e, n) {
        const r = this._rectangle;
        if (!Cesium.Rectangle.contains(r, t))
            return;
        const a = this._projection.project(t);
        if (!Cesium.defined(a))
            return;
        const i = this.resolutions[e]
            , o = Math.floor(a.x / i)
            , s = -Math.floor(a.y / i);
        return Cesium.defined(n) ? (n.x = o,
        n.y = s,
        n) : new Cesium.Cartesian2(o,s)
    }
}
;
var GBTilingScheme = class extends Cesium.GeographicTilingScheme {
    constructor(t) {
        super(t);
        const e = THING.Utils.parseValue(t, {});
        this._ellipsoid = THING.Utils.parseValue(e.ellipsoid, Cesium.Ellipsoid.WGS84_Cesium),
        this._numberOfLevelZeroTilesX = THING.Utils.parseValue(e.numberOfLevelZeroTilesX, 1),
        this._numberOfLevelZeroTilesY = THING.Utils.parseValue(e.numberOfLevelZeroTilesY, 1),
        this._tileInfo = THING.Utils.parseValue(e.tileInfo, {
            rows: 256,
            cols: 256,
            lods: [{
                level: 0,
                resolution: 1.406250026231578
            }, {
                level: 1,
                resolution: .703125013115789
            }, {
                level: 2,
                resolution: .3515625065578945
            }, {
                level: 3,
                resolution: .17578125327894775
            }, {
                level: 4,
                resolution: .08789062663947399
            }, {
                level: 5,
                resolution: .043945313319736994
            }, {
                level: 6,
                resolution: .021972656659868472
            }, {
                level: 7,
                resolution: .010986328329934226
            }, {
                level: 8,
                resolution: .005493164164967124
            }, {
                level: 9,
                resolution: .0027465820824835504
            }, {
                level: 10,
                resolution: .0013732910412417797
            }, {
                level: 11,
                resolution: .0006866455206208899
            }, {
                level: 12,
                resolution: .0003433227603104438
            }, {
                level: 13,
                resolution: .0001716613801552219
            }, {
                level: 14,
                resolution: 8583069007761132e-20
            }, {
                level: 15,
                resolution: 4291534503880566e-20
            }, {
                level: 16,
                resolution: 21457672519402802e-21
            }, {
                level: 17,
                resolution: 10728836259701401e-21
            }, {
                level: 18,
                resolution: 5364418129850712e-21
            }, {
                level: 19,
                resolution: 2682209064925356e-21
            }, {
                level: 20,
                resolution: 1341104532462678e-21
            }, {
                level: 21,
                resolution: 6.70552266231339e-7
            }, {
                level: 22,
                resolution: 3.352761331156695e-7
            }, {
                level: 23,
                resolution: 1.6763806655783476e-7
            }]
        })
    }
    getNumberOfXTilesAtLevel(t) {
        if (this._tileInfo && this._tileInfo.lods) {
            var e = this._tileInfo.lods.filter(function(e) {
                return e.level === t
            })[0].resolution;
            return Math.round(Cesium.Math.toDegrees(Cesium.Math.TWO_PI) / (this._tileInfo.rows * e))
        }
        return super.getNumberOfXTilesAtLevel(t)
    }
    getNumberOfYTilesAtLevel(t) {
        if (this._tileInfo && this._tileInfo.lods) {
            var e = this._tileInfo.lods.filter(function(e) {
                return e.level === t
            })[0].resolution;
            return Math.round(Cesium.Math.toDegrees(Cesium.Math.TWO_PI / 2) / (this._tileInfo.cols * e))
        }
        return super.getNumberOfYTilesAtLevel(t)
    }
}
    , $e = new Cesium.Cartesian3
    , Xe = new Cesium.Cartesian3
    , Je = new Cesium.Cartesian3
    , Qe = new Cesium.Cartesian3;
function Ze(t, e, n) {
    n = Cesium.Cartesian3.cross(t, e, n);
    var r = Cesium.Cartesian3.magnitude(n);
    return Cesium.Cartesian3.multiplyByScalar(n, Cesium.Math.EPSILON7 / r, n)
}
function tn(t, e) {
    var n = Cesium.Cartesian3.normalize(t, Qe);
    return Ze(t, Cesium.Cartesian3.equalsEpsilon(n, Cesium.Cartesian3.UNIT_X, Cesium.Math.EPSILON6) ? Cesium.Cartesian3.UNIT_Y : Cesium.Cartesian3.UNIT_X, e)
}
var checkHalfAxes = function(t) {
    var e = Cesium.Matrix3.getColumn(t, 0, $e)
        , n = Cesium.Matrix3.getColumn(t, 1, Xe)
        , r = Cesium.Matrix3.getColumn(t, 2, Je)
        , a = Cesium.Cartesian3.equals(e, Cesium.Cartesian3.ZERO)
        , i = Cesium.Cartesian3.equals(n, Cesium.Cartesian3.ZERO)
        , o = Cesium.Cartesian3.equals(r, Cesium.Cartesian3.ZERO);
    return a || i || o ? a && i && o ? (t[0] = Cesium.Math.EPSILON7,
    t[4] = Cesium.Math.EPSILON7,
    t[8] = Cesium.Math.EPSILON7,
    t) : (!a || i || o ? a || !i || o ? a || i || !o ? a ? i ? o || (n = Ze(r, e = tn(r, e), n)) : r = Ze(n, e = tn(n, e), r) : r = Ze(n = tn(e, n), e, r) : r = Ze(n, e, r) : n = Ze(e, r, n) : e = Ze(n, r, e),
    Cesium.Matrix3.setColumn(t, 0, e, t),
    Cesium.Matrix3.setColumn(t, 1, n, t),
    Cesium.Matrix3.setColumn(t, 2, r, t),
    t) : t
}
    , nn = (n(6),
new THREE.MeshBasicMaterial);
nn.transparent = !0,
nn.opacity = 0;
class Tile3dLayer extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t
    }
    setup(t) {
        this._meshes = null,
        this._materials = null,
        this._enableObjectification = THING.Utils.parseValue(t.enableObjectification, !1),
        this._lights = THING.Utils.parseValue(t.lights, !1),
        this._objectKey = THING.Utils.parseValue(t.objectKey, "name"),
        this._3dtilesFeaturesPropertyCache = new Map,
        this.layerType = "Tile3dLayer",
        this.name = t.name || "tile3dLayer_" + (new Date).getTime(),
        this.renderer = t.renderer || t.style || {},
        this._clippingArea = t.clippingArea,
        this.renderer.grayFilterColorBar && (this.renderer.grayFilterColorBar = this.renderer.grayFilterColorBar.map(function(t) {
            return CMAP.Util.colorFormatNewToOld(t)
        })),
        this._opacity = THING.Utils.parseValue(this.renderer.opacity, 1),
        this._immediatelyLoadDesiredLevelOfDetail = THING.Utils.parseValue(this.immediatelyLoadDesiredLevelOfDetail, !1),
        this._skipLevelOfDetail = THING.Utils.parseValue(this.skipLevelOfDetail, !0),
        Object.defineProperty(this.renderer, "opacity", {
            configurable: !0,
            enumerable: !0,
            get: ()=>this._opacity,
            set: t=>{
                this.opacity = t
            }
        }),
        this._tilesetRootPosition = null,
        this._quad3dTileNames = {},
        this._all3dTiles = new Map,
        this._3dTilesPerFrame = new Map,
        this._quad3dTileMatrial = {},
        this._recorder3d = LUtil.recorder(),
        this._recorder3dFlag = 0,
        this._last3dTiles = [],
        this._drawEnd = !1,
        this._currentLoadedTiles = [],
        this._lastLoadedTiles = [],
        this._isLastStateChange = !1,
        this._lastChangeTiles = [],
        this._currentShownTiles = {},
        this.root3d = this.node,
        this.visible = THING.Utils.parseValue(t.visible, !0),
        this._3dtileseturl = t.url,
        this._3dtileset = new Cesium.Cesium3DTileset({
            url: this._3dtileseturl,
            skipLevelOfDetail: this._skipLevelOfDetail,
            immediatelyLoadDesiredLevelOfDetail: this._immediatelyLoadDesiredLevelOfDetail,
            geometricErrorFactor: THING.Utils.parseValue(t.geometricErrorFactor, 1)
        }),
        this._3dtileset._layer = this,
        this._3dtileset.height = 0,
        isNaN(t.height || t.offsetHeight) || (this._3dtileset.height = t.height || t.offsetHeight || 0),
        Array.isArray(t.centerCoordinates) && 2 === t.centerCoordinates.length && (this._centerCoordinates = this._3dtileset.centerCoordinates = t.centerCoordinates),
        this.setupUserData(t),
        this._3dtileset.total3dTileNumber = 0,
        this._3dtileset.maximumMemoryUsage = THING.Utils.parseValue(t.maximumMemoryUsage, 128),
        this._3dtileset.maximum3dTileNumber = THING.Utils.parseValue(t.maximum3dTileNumber, 1e5),
        this._3dtileset.readyPromise.then(()=>{
            this._oldCenter = this._3dtileset.boundingSphere.center.clone(),
            this._centerCoordinates || (this._centerCoordinates = this._getCenterCoordinates()),
            this._updateTile3DLayer(this._centerCoordinates),
            this.setupComplete(t)
        }
        ),
        this._3dtileset.tileUnload.addEventListener(t=>{
            if (this._enableObjectification) {
                let e, n;
                t.content instanceof Cesium.Composite3DTileContent ? n = (e = t.content._contents).length : (e = [t.content],
                n = 1);
                for (let t = 0; t < n; t++) {
                    let n = e[t];
                    const r = n.featuresLength
                        , a = n.batchTable;
                    if (r)
                        for (let t = 0; t < r; t++) {
                            const e = n.getFeature(t)
                                , r = e._batchId
                                , i = a.getProperty(r, this._objectKey);
                            if (this._featureElementsMap.has(i)) {
                                const t = this._featureElementsMap.get(i)
                                    , n = t.indexOf(e);
                                n > -1 && t.splice(n, 1)
                            }
                            if (e.pickIdBufferObjectCache) {
                                const t = CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer.indexOf(e.pickIdBufferObjectCache);
                                t > -1 && CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer.splice(t, 1)
                            }
                        }
                }
            }
            this._all3dTiles && this._all3dTiles.get(t._thingjsName) && this._all3dTiles.get(t._thingjsName),
            this._quad3dTileNames && this._quad3dTileNames[t._thingjsName] && delete this._quad3dTileNames[t._thingjsName],
            this._quadTileRelativePos && this._quadTileRelativePos[t._thingjsName] && delete this._quadTileRelativePos[t._thingjsName]
        }
        ),
        this._3dtileset.tileLoad.addEventListener(t=>{
            if (this._enableObjectification) {
                let e, n;
                this._featureElementsMap || (this._featureElementsMap = new Map),
                t.content instanceof Cesium.Composite3DTileContent ? n = (e = t.content._contents).length : (e = [t.content],
                n = 1);
                for (let t = 0; t < n; t++) {
                    let n = e[t];
                    const r = n.featuresLength
                        , a = n.batchTable;
                    if (r)
                        for (let t = 0; t < r; t++) {
                            const e = n.getFeature(t)
                                , r = e._batchId
                                , i = a.getProperty(r, this._objectKey);
                            if (this._featureElementsMap.has(i)) {
                                const t = this._featureElementsMap.get(i);
                                -1 === t.indexOf(e) && t.push(e)
                            } else
                                this._featureElementsMap.set(i, [e])
                        }
                }
            }
        }
        )
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        this.show(t),
        this._visible = t
    }
    removeGrayFilter() {
        this.renderer.grayFilterEnable = !1,
        this._all3dTiles.forEach((t,e)=>{
            var n = e + "_mat"
                , r = t3djs.buffer.materialBuffer.get(n);
            r.colorMapping = void 0,
            r.color = new THREE.Color(1,1,1),
            r.needsUpdate = !0
        }
        )
    }
    setGrayFilter() {
        this._all3dTiles.forEach((t,e)=>{
            var n = e + "_mat"
                , r = t3djs.buffer.materialBuffer.get(n);
            if (this.renderer && this.renderer.grayFilterEnable && this.renderer.grayFilterColorBar && this.renderer.grayFilterPerBar) {
                var a = CMAP.Util._generateGradientTextureByGray(this.renderer.grayFilterPerBar, this.renderer.grayFilterColorBar);
                r.colorMapping = a
            }
            this.renderer && this.renderer.color && (r.color = new THREE.Color(this.renderer.color[0] / 255,this.renderer.color[1] / 255,this.renderer.color[2] / 255)),
            r.needsUpdate = !0
        }
        )
    }
    get offsetHeight() {
        return this._3dtileset.height
    }
    set offsetHeight(t) {
        isNaN(t) || (this._3dtileset.height = t,
        this._updateTile3DLayer(this.centerCoordinates))
    }
    get centerCoordinates() {
        return this._centerCoordinates
    }
    set centerCoordinates(t) {
        this._centerCoordinates = t,
        this._updateTile3DLayer(t)
    }
    set opacity(t) {
        this._opacity = t;
        var e = this._quad3dTileNames;
        for (var n in e) {
            var r = t3djs.buffer.nodeBuffer.get(n);
            r && r.getMaterials().forEach(e=>{
                "TRANSPARENT" === e.alphaMode || t < 1 ? e.transparent = !0 : e.transparent = !1,
                e.opacity = t
            }
            )
        }
    }
    _getCenterCoordinates() {
        let t = this._oldCenter.convertToSpherical();
        return MapUtil.convertWorldToLonlat([-t.x, t.z, t.y])
    }
    _updateTile3DLayer(t) {
        t || (t = this._getCenterCoordinates());
        let e = this._3dtileset
            , n = this._oldCenter.convertToSpherical();
        const a = this._3dtileset.boundingSphere.center.clone()
            , i = MapUtil.convertWorldToLonlat([-n.x, n.z, n.y])[2] + this.offsetHeight;
        let o = MapUtil.convertLonlatToWorld(t, i)
            , s = Cesium.Cartesian3.fromArray([-o[0], o[2], o[1]]);
        const l = Cesium.Cartesian3.subtract(s, this._oldCenter, new Cesium.Cartesian3);
        e.modelMatrix = Cesium.Matrix4.fromTranslation(l);
        const u = Cesium.Cartesian3.subtract(s, a, new Cesium.Cartesian3);
        var c = this._quad3dTileNames;
        for (var h in c) {
            var d = t3djs.buffer.nodeBuffer.get(h);
            if (d) {
                const t = [d.position.x - u.x, d.position.y + u.z, d.position.z + u.y];
                d.setPosition(new THREE.Vector3(t[0],t[1],t[2]))
            }
        }
    }
    show(t) {
        this.root3d.visible = t
    }
    draw3dTiles(t) {
        let e = this.isContinue3d(t);
        if ("break" !== e && "continue" !== e) {
            this._3dTilesPerFrame ? this._3dTilesPerFrame.clear() : this._3dTilesPerFrame = new Map;
            for (let e = 0; e < t.length; e++) {
                let n = t[e];
                if (!Cesium.defined(n))
                    continue;
                let r = this.tile3dNameCreater("tile3dset_" + this._queryID, n);
                if (n._thingjsName = r,
                n._content)
                    if (n.content instanceof Cesium.Composite3DTileContent)
                        this.tileContentGlobeManager(n),
                        n.content && n.content._contents.length > 0 && n.content._contents.forEach((t,e)=>{
                            let n = r + "_" + e;
                            t instanceof Cesium.Batched3DModel3DTileContent ? t._model._thingjsName = n : t instanceof Cesium.Instanced3DModel3DTileContent && (t._modelInstanceCollection._model._thingjsName = n),
                            this._3dTilesPerFrame.set(n, t._model ? t : t._modelInstanceCollection);
                            let a = n + "_mat";
                            this.is3dNeedUpdate(n) && (this._all3dTiles.set(n, t._model ? t : t._modelInstanceCollection),
                            this._quad3dTileNames[n] = n,
                            t instanceof Cesium.Batched3DModel3DTileContent ? this.create3dTileObject({
                                _content: t
                            }, n, a) : t instanceof Cesium.Instanced3DModel3DTileContent && (t._modelInstanceCollection._instancedCOntent_ = t,
                            this.create3dTileObject({
                                _content: t._modelInstanceCollection
                            }, n, a)))
                        }
                        );
                    else {
                        n.content instanceof Cesium.Batched3DModel3DTileContent ? (n._content._model._thingjsName = r,
                        this.tileContentGlobeManager(n)) : n._content instanceof Cesium.Instanced3DModel3DTileContent && (n._content._modelInstanceCollection._model._thingjsName = r,
                        this.tileContentGlobeManager(n)),
                        this._3dTilesPerFrame.set(r, n);
                        let t = r + "_mat";
                        if (this.is3dNeedUpdate(r))
                            if (this._all3dTiles.set(r, n),
                            this._quad3dTileNames[r] = r,
                            n.content instanceof Cesium.Batched3DModel3DTileContent)
                                this.create3dTileObject(n, r, t);
                            else {
                                if (!(n._content instanceof Cesium.Instanced3DModel3DTileContent))
                                    return;
                                n._content._modelInstanceCollection._instancedCOntent_ = n._content,
                                this.create3dTileObject({
                                    _content: n._content._modelInstanceCollection
                                }, r, t)
                            }
                    }
            }
            this._all3dTiles.forEach(t=>{
                let e = window.t3djs.buffer.nodeBuffer.get(t._thingjsName);
                e && (this._3dTilesPerFrame.get(t._thingjsName) ? (e.visible = !0,
                e.needShow = !0) : (e.visible = !1,
                e.needShow = !1))
            }
            )
        }
    }
    tileContentGlobeManager(t) {
        if (this._enableObjectification) {
            const e = t.content;
            if (!t._globeFeatureIdStart && (e instanceof Cesium.Batched3DModel3DTileContent || e instanceof Cesium.Instanced3DModel3DTileContent || e instanceof Cesium.Composite3DTileContent)) {
                let n = 0;
                if (t._globeFeatureIdStart = CMAP.getCurrentMap().pick3DTilesFeatureIdCurrentValue + 1,
                e instanceof Cesium.Batched3DModel3DTileContent || e instanceof Cesium.Instanced3DModel3DTileContent)
                    n = e.featuresLength;
                else if (e instanceof Cesium.Composite3DTileContent) {
                    const t = e._contents;
                    let r = 0;
                    t.forEach((t,e)=>{
                        t instanceof Cesium.Batched3DModel3DTileContent ? r += t.featuresLength : t instanceof Cesium.Instanced3DModel3DTileContent && (r += t.featuresLength)
                    }
                    ),
                    n = r
                }
                CMAP.getCurrentMap().pick3DTilesFeatureIdCurrentValue += n
            }
            if (e instanceof Cesium.Batched3DModel3DTileContent || e instanceof Cesium.Instanced3DModel3DTileContent)
                e._globeFeatureIds = {
                    start: t._globeFeatureIdStart,
                    count: e.featuresLength
                };
            else if (e instanceof Cesium.Composite3DTileContent) {
                const n = e._contents;
                let r = 0;
                n.forEach((e,n)=>{
                    e instanceof Cesium.Batched3DModel3DTileContent ? (e._globeFeatureIds = {
                        start: t._globeFeatureIdStart + r,
                        count: e.featuresLength
                    },
                    r += e.featuresLength) : e instanceof Cesium.Instanced3DModel3DTileContent && (e._globeFeatureIds = {
                        start: t._globeFeatureIdStart + r,
                        count: e.featuresLength
                    },
                    r += e.featuresLength)
                }
                )
            }
        }
    }
    callAfterRenderFunctions(t) {
        for (var e = t.afterRender, n = 0, r = e.length; n < r; ++n)
            e[n]();
        e.length = 0
    }
    flyToLayer() {
        var t = this._3dtileset.boundingSphere
            , e = {
            center: [-t.center.x, t.center.z, t.center.y],
            radius: t.radius
        };
        this.app.camera.flyToBoundingSphere(e)
    }
    isContinue3d(t) {
        if (0 === t.length)
            return "break";
        var e = this.getTilesFlag(t);
        return this._recorder3dFlag === e ? "continue" : (this._recorder3dFlag = e,
        "change")
    }
    convertCesiumToThreeMatrix(t, e, n) {
        const r = (new THREE.Matrix4).set(-1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
        n && (e[12] += n.x,
        e[13] += n.y,
        e[14] += n.z);
        const a = (new THREE.Matrix4).fromArray(Cesium.Matrix4.toArray(e));
        return a.premultiply(r),
        t.copy(a),
        t
    }
    create3dTileObject(t, e) {
        let n = t._content._model._rendererResources.vertexArrays;
        this._meshes = t._content._model._rendererResources.meshes,
        this._materials = t._content._model._rendererResources.materials;
        var r = t._content._model._rendererResources.image
            , a = [];
        if (window.t3djs.buffer.nodeBuffer.get(e))
            this.cache3dShow(e);
        else {
            var i = new THREE.Group;
            if (i.name = e,
            t._content instanceof Cesium.ModelInstanceCollection) {
                const e = t._content._rtcTransform
                    , n = new THREE.Matrix4;
                this.convertCesiumToThreeMatrix(n, e),
                i.applyMatrix4(n)
            } else if (t._content._model._rtcCenter) {
                const e = t._content._model._rtcCenter
                    , n = new THREE.Vector3(e.x,e.y,e.z);
                if (t._content._model._computedModelMatrix) {
                    const e = Cesium.Matrix4.multiplyTransformation(t._content._model._computedModelMatrix, t._content._model._runtime.nodes[0].transformToRoot, new Cesium.Matrix4)
                        , r = new THREE.Matrix4;
                    this.convertCesiumToThreeMatrix(r, e, n),
                    i.applyMatrix4(r)
                } else
                    i.position.copy(n)
            } else if (t._content._model._computedModelMatrix) {
                const e = Cesium.Matrix4.multiplyTransformation(t._content._model._computedModelMatrix, t._content._model._runtime.nodes[0].transformToRoot, new Cesium.Matrix4)
                    , n = new THREE.Matrix4;
                this.convertCesiumToThreeMatrix(n, e),
                i.applyMatrix4(n)
            }
            i._tile = t;
            for (let e in n) {
                let r;
                r = t._content instanceof Cesium.ModelInstanceCollection ? new THREE.InstancedBufferGeometry : new THREE.BufferGeometry;
                let i = n[e]
                    , o = i.indexBuffer;
                this.setIndexDataFromAttribute(o, r);
                let s = i._attributes;
                this.setDataFromAttributes(s, r),
                r.indexName = e,
                a.push(r)
            }
            t._content instanceof Cesium.ModelInstanceCollection ? this.create3dTileMesh(r, e, i, a, this._meshes, this._materials, this.renderer, t._content) : this.create3dTileMesh(r, e, i, a, this._meshes, this._materials, this.renderer),
            this.root3d.add(i),
            window.t3djs.buffer.nodeBuffer.add(e, i),
            t._content._model._rendererResources.buffers = null,
            t._content._model._rendererResources.image = null,
            this._3dtileset.total3dTileNumber++
        }
    }
    is3dNeedUpdate(t) {
        return !window.t3djs.buffer.nodeBuffer.get(t) || this._quad3dTileNames[t] !== t || (this.cache3dShow(t),
        !1)
    }
    getClosedTile(t, e) {
        for (let n = 0; n < t.length; n++) {
            let r = t[n];
            if (e.indexOf(r) < 0)
                if (this._3dtileset.total3dTileNumber > this._3dtileset.maximum3dTileNumber) {
                    this.cache3dDestroy(this, r),
                    delete this._currentShownTiles[r],
                    delete this._quad3dTileNames[r];
                    let t = r + "_mat";
                    window.t3djs.materialManager.destroyMaterial(t),
                    delete this._quad3dTileMatrial[t]
                } else
                    this.cache3dHide(r),
                    delete this._currentShownTiles[r]
        }
    }
    cache3dDestroy(t) {
        var e = window.t3djs.buffer.nodeBuffer.get(t);
        if (e) {
            var n = e.getChildrenNum();
            e.needShow = !1,
            e.destroy(!0, !1),
            window.t3djs.sceneManager.destroyManualObject(t),
            window.t3djs.materialManager.destroyMaterial(t + "_mat"),
            window.t3djs.textureManager.destroyTexture(t + "_tex"),
            this._3dtileset.total3dTileNumber -= n
        }
    }
    setIndexDataFromAttribute(t, e) {
        let n = t.count;
        var r = t.buffer.indexDatatype
            , a = THING.Utils.parseValue(t.offsetInBytes, 0);
        let i;
        if (5125 === r)
            if (t.buffer.typedArray instanceof Uint32Array)
                i = t.buffer.typedArray;
            else {
                let e = new Uint8Array(t.buffer.typedArray);
                i = new Uint32Array(e.buffer,a,n)
            }
        else if (5123 === r)
            if (t.decodedData)
                i = new Uint16Array(t.buffer.typedArray);
            else {
                i = new Uint16Array(n);
                for (let e = 0; e < 2 * n; e++)
                    i[e] = t.buffer.typedArray[2 * e] | t.buffer.typedArray[2 * e + 1] << 8
            }
        var o = new THREE.BufferAttribute(i,1);
        e.setIndex(o),
        o = null
    }
    setDataFromAttributes(t, e) {
        let n, r;
        for (let h in t) {
            let d = t[h];
            var a, i = d.count, o = THING.Utils.parseValue(d.offsetInBytes, 0), s = d.strideInBytes, l = d.componentDatatype, u = d.componentsPerAttribute, c = this._parseAttributeName(d.attribute);
            if (5126 === l) {
                let t = new Uint8Array(d.vertexBuffer);
                if (5 === (s /= Float32Array.BYTES_PER_ELEMENT) || 6 === s || 7 === s || 8 === s || 9 === s)
                    o /= Float32Array.BYTES_PER_ELEMENT,
                    n || (n = new Float32Array(t.buffer),
                    r = new THREE.InterleavedBuffer(n,s)),
                    a = new THREE.InterleavedBufferAttribute(r,u,o,!1);
                else {
                    let e;
                    e = d.vertexBuffer instanceof Float32Array ? d.vertexBuffer : new Float32Array(t.buffer,o,i * u),
                    a = new THREE.BufferAttribute(e,u)
                }
                e.addAttribute(c, a)
            } else if (5123 === l) {
                let t;
                if ("POSITION" === d.attribute) {
                    t = new Float32Array(d.vertexBuffer.length);
                    const e = d.quantization.range / (1 << d.quantization.quantizationBits)
                        , n = d.quantization.minValues;
                    for (let r = 0; r < d.vertexBuffer.length; r++)
                        t[r] = d.vertexBuffer[r] * e + n[0],
                        t[r + 1] = d.vertexBuffer[r + 1] * e + n[1],
                        t[r + 2] = d.vertexBuffer[r + 2] * e + n[2],
                        r += 2
                } else if ("uv" === c) {
                    const e = d.quantization.range / (1 << d.quantization.quantizationBits)
                        , n = d.quantization.minValues;
                    t = new Float32Array(d.vertexBuffer.length);
                    for (let r = 0; r < d.vertexBuffer.length; r++)
                        t[r] = d.vertexBuffer[r] * e + n[0],
                        t[r + 1] = d.vertexBuffer[r + 1] * e + n[1],
                        r += 1
                }
                a = new THREE.BufferAttribute(t,u),
                e.addAttribute(c, a)
            }
        }
        a = null,
        r = null
    }
    addClippingPlanes(t) {
        Array.isArray(t[0][0]) && (t = t[0]),
        M.a.isClockWise(t) && (t = t.reverse());
        var e = [];
        for (let n = 0; n < t.length - 1; n++) {
            const r = CMAP.Util.convertLonlatToWorld(t[n])
                , a = CMAP.Util.convertLonlatToWorld(t[n + 1])
                , i = CMAP.Util.convertLonlatToWorld([(t[n][0] + t[n + 1][0]) / 2, (t[n][1] + t[n + 1][1]) / 2], 1)
                , o = (new THREE.Plane).setFromCoplanarPoints(new THREE.Vector3(r[0],r[1],r[2]), new THREE.Vector3(a[0],a[1],a[2]), new THREE.Vector3(i[0],i[1],i[2]));
            e.push(o)
        }
        return e
    }
    updateCustomStyle(t, e, n, r) {
        let a, i, o, s, l, u;
        if (n && (n.pbrMetallicRoughness && n.pbrMetallicRoughness.baseColorFactor && (a = n.pbrMetallicRoughness.baseColorFactor),
        n.pbrMetallicRoughness && n.pbrMetallicRoughness.metallicFactor <= 1 && (i = n.pbrMetallicRoughness.metallicFactor),
        n.pbrMetallicRoughness && n.pbrMetallicRoughness.roughnessFactor <= 1 && (o = n.pbrMetallicRoughness.roughnessFactor),
        n.alphaMode && (s = n.alphaMode),
        n.emissiveFactor && (l = n.emissiveFactor),
        n.doubleSided && (u = n.doubleSided)),
        e && e.grayFilterEnable && e.grayFilterColorBar && e.grayFilterPerBar) {
            let n = CMAP.Util._generateGradientTextureByGray(e.grayFilterPerBar, e.grayFilterColorBar);
            t.colorMapping = n
        }
        e && e.color ? t.color = a ? new THREE.Color(a[0] * (e.color[0] / 255),a[1] * (e.color[1] / 255),a[2] * (e.color[2] / 255)) : new THREE.Color(e.color[0],e.color[1],e.color[2]) : a && (t.color = new THREE.Color(a[0],a[1],a[2])),
        i <= 1 && (t.metalness = i),
        o <= 1 && (t.roughness = o),
        l && (t.emissive = new THREE.Color(l[0],l[1],l[2])),
        "OPAQUE" !== s ? (t.transparent = !0,
        t.alphaMode = "TRANSPARENT") : e.opacity < 1 ? t.transparent = !0 : t.transparent = !1,
        a && (t.opacity = a[3]),
        e && e.opacity < 1 && (t.opacity = e.opacity * t.opacity),
        this._clippingArea && (t.clipIntersection = !0,
        t.clippingPlanes = this.addClippingPlanes(this._clippingArea)),
        t.side = THREE.DoubleSide,
        e && e.envMapUrl && (e.envMapUrl.endsWith("png") || e.envMapUrl.endsWith("jpg") || e.envMapUrl.endsWith("bmp") ? t.envMap = Ut.loadEnvMap(e.envMapUrl) : t.envMap = Ut.loadEnvMapCubeForCampus(e.envMapUrl),
        r && (t.baseQuaternion = r.getWorldQuaternion(new THREE.Quaternion).inverse())),
        e && !THING.Utils.isNull(e.envMapIntensity) && (t.envMapIntensity = e.envMapIntensity),
        t.needsUpdate = !0
    }
    create3dTileMesh(t, e, n, r, a, i, o, s) {
        const l = s && s instanceof Cesium.ModelInstanceCollection
            , u = this._enableObjectification;
        if (t)
            if (1 === t.length) {
                var c = new THREE.Texture(t[t.length - 1].image);
                c.wrapS = c.wrapT = THREE.RepeatWrapping,
                c.needsUpdate = !0;
                var h, d = e + "_tex", f = e + "_mat";
                c.name = d,
                c.matrixAutoUpdate = !1,
                c.flipY = !1,
                h = this._lights ? new THREE.MeshStandardMaterial({
                    map: c,
                    name: f
                }) : new THREE.MeshBasicMaterial({
                    map: c,
                    name: f
                }),
                t3djs.buffer.materialBuffer.add(f, h),
                this.updateCustomStyle(h, o, i[0], n);
                var p = r.length;
                if (l && p > 1)
                    return void THING.Utils.warn("I3DM数据不支持多个几何体的情况。");
                for (let t = 0; t < p; t++) {
                    let a = e + "_" + t;
                    l ? this.createMesh(s, r[t], h, n, a, u) : this.createMesh(void 0, r[t], h, n, a, u),
                    r[t] = null
                }
                u && this.createAllFeatureCache(s, n, u)
            } else if (l)
                THING.Utils.warn("I3DM异常数据！");
            else if (i.length === r.length) {
                for (let s = 0; s < r.length; s++) {
                    let l = on(a, i, r[s].indexName.substring(r[s].indexName.lastIndexOf(".") + 1))
                        , c = 0;
                    l.values ? c = l.values.u_diffuse.index : l.extensions.KHR_techniques_webgl.values.u_diffuse ? c = l.extensions.KHR_techniques_webgl.values.u_diffuse.index : l.pbrMetallicRoughness && l.pbrMetallicRoughness.baseColorTexture && (c = l.pbrMetallicRoughness.baseColorTexture.index);
                    const h = an(t, c);
                    let d = new THREE.Texture(h.image);
                    d.wrapS = d.wrapT = THREE.RepeatWrapping,
                    d.needsUpdate = !0;
                    let f, p = e + s + "_tex", m = e + s + "_mat";
                    d.name = p,
                    d.matrixAutoUpdate = !1,
                    d.flipY = !1,
                    f = this._lights ? new THREE.MeshStandardMaterial({
                        map: d,
                        name: m
                    }) : new THREE.MeshBasicMaterial({
                        map: d,
                        name: m
                    }),
                    t3djs.buffer.materialBuffer.add(m, f),
                    this.updateCustomStyle(f, o, i[s], n);
                    let g = e + "_" + s;
                    this.createMesh(void 0, r[s], f, n, g, u),
                    r[s] = null
                }
                u && this.createAllFeatureCache(s, n, u)
            } else
                THING.Utils.warn("贴图个数与mesh个数不一致");
        else {
            let t = r.length;
            if (l && t > 1)
                return void THING.Utils.warn("I3DM数据不支持多个几何体的情况。");
            for (let a = 0; a < t; a++) {
                let t = e + "_mat"
                    , c = new THREE.MeshStandardMaterial({
                    name: t
                });
                t3djs.buffer.materialBuffer.add(t, c),
                this.updateCustomStyle(c, o, i[a], n);
                let h = e + "_" + a;
                l ? this.createMesh(s, r[a], c, n, h, u) : this.createMesh(void 0, r[a], c, n, h, u),
                r[a] = null
            }
            u && this.createAllFeatureCache(s, n, u)
        }
    }
    updateTileMeshCache(t, e=[255, 255, 255], n=!0) {
        this._3dtilesFeaturesPropertyCache.set(t, e.concat(!0 === n ? 255 : 0))
    }
    updateCompleteTileMesh(t, e, n=!0) {
        if (!this._enableObjectification)
            return;
        const r = this._featureElementsMap.get(t);
        if (r) {
            const t = r.length;
            for (let a = 0; a < t; a++) {
                const t = r[a]
                    , i = t._group_
                    , o = t._batchId;
                i && this.update3dTileBatchTableTexture(i, o, e, n)
            }
        }
    }
    update3dTileBatchTableTexture(t, e, n, r=!0) {
        const a = t.children[0].tile._content.featuresLength
            , i = new Uint8Array(4 * a);
        for (let o = 0; o < a; o++)
            e >= 0 && e === o ? (n && 3 === n.length ? (i[4 * o + 0] = n[0],
            i[4 * o + 1] = n[1],
            i[4 * o + 2] = n[2],
            t.featurePropertyCache[o].color = n) : (i[4 * o + 0] = t.featurePropertyCache[o].color[0],
            i[4 * o + 1] = t.featurePropertyCache[o].color[1],
            i[4 * o + 2] = t.featurePropertyCache[o].color[2]),
            r ? (i[4 * o + 3] = 255,
            t.featurePropertyCache[o].show = r) : (i[4 * o + 3] = 0,
            t.featurePropertyCache[o].show = !1)) : (i[4 * o + 0] = t.featurePropertyCache[o].color[0],
            i[4 * o + 1] = t.featurePropertyCache[o].color[1],
            i[4 * o + 2] = t.featurePropertyCache[o].color[2],
            i[4 * o + 3] = t.featurePropertyCache[o].show ? 255 : 0);
        t.children[0].material.batchTexture && t.children[0].material.batchTexture.dispose();
        const o = new THREE.DataTexture(i,a,1);
        t.children.forEach(t=>{
            t.material.batchTexture = o;
            const e = 1 / a
                , n = .5 * e;
            t.material.batchTextureStep = new THREE.Vector2(e,n),
            t.material.defines || (t.material.defines = {
                USE_3DTILESEXTENT: !0
            }),
            t.material.defines.USE_3DTILESEXTENT = !0
        }
        )
    }
    createMesh(t, e, n, r, a, i=!1) {
        let o;
        if (t) {
            const r = t._instances.length
                , a = new THREE.InstancedBufferAttribute(new Float32Array(3 * r),3)
                , s = new THREE.InstancedBufferAttribute(new Float32Array(4 * r),4)
                , l = new THREE.InstancedBufferAttribute(new Float32Array(3 * r),3)
                , u = new THREE.InstancedBufferAttribute(new Float32Array(1 * r),1);
            let c;
            e.addAttribute("instancePosition", a),
            e.addAttribute("instanceQuaternion", s),
            e.addAttribute("instanceScale", l),
            e.addAttribute("instanceId", u),
            i && (c = new THREE.InstancedBufferAttribute(new Float32Array(1 * r),1),
            e.addAttribute("id", c)),
            (o = new THREE.Mesh(e,n)).frustumCulled = !1,
            n.defines || (n.defines = {}),
            n.defines.INSTANCED = "";
            for (let e = 0; e < r; e++) {
                const n = t._instances[e];
                let r = Cesium.Matrix4.clone(n._modelMatrix);
                const h = t._center;
                r[12] = r[12] - h.x,
                r[13] = r[13] - h.y,
                r[14] = r[14] - h.z,
                r = Cesium.Matrix4.multiplyTransformation(r, t._model._runtime.nodes[0].computedMatrix, new Cesium.Matrix4);
                let d = new THREE.Matrix4;
                d.fromArray(Cesium.Matrix4.toArray(r));
                let f = new THREE.Vector3
                    , p = new THREE.Quaternion
                    , m = new THREE.Vector3;
                d.decompose(f, p, m),
                a.set(f.toArray(), 3 * e),
                s.set(p.toArray(), 4 * e),
                l.set(m.toArray(), 3 * e),
                i ? (c && c.set([e], e),
                u.set([e], e)) : u.set([o.id], e)
            }
        } else
            (o = new THREE.Mesh(e,n)).frustumCulled = !0;
        e.attributes.normal || e.computeVertexNormals(),
        i && (o.tile = t ? {
            _content: t._instancedCOntent_
        } : r._tile,
        n.enableObjectification = !0),
        o.name = a,
        o.userData.skipPick = !this.pickable,
        r.add(o),
        !0 === this.app.root.static && o._synMatrixWorld(),
        t3djs.buffer.nodeBuffer.add({
            meshName: o
        })
    }
    createAllFeatureCache(t, e, n=!1) {
        if (n) {
            let n = e.children[0].tile;
            const r = n._content.featuresLength
                , a = n._content.batchTable;
            if (r) {
                const i = n._content._globeFeatureIds.start;
                e.children.forEach(t=>{
                    t.userData.batchIdOffset = i
                }
                );
                for (let t = 0; t < r; t++) {
                    const r = n._content.getFeature(t);
                    r._group_ = e,
                    r.globalId = t + i,
                    r.pickIdBufferObjectCache = {
                        globalId: t + i,
                        feature: r
                    },
                    CMAP.getCurrentMap().pick3DTilesFeatureIdBuffer.push(r.pickIdBufferObjectCache),
                    CMAP.getCurrentMap().pick3DTilesFeatureIdCurrentValue >= 16581375 && THING.Utils.warn("3DTiles GPUPicker globalId超过界限，可能产生异常现象。");
                    const o = a.getProperty(r._batchId, this._objectKey);
                    if (e.featurePropertyCache || (e.featurePropertyCache = []),
                    this._3dtilesFeaturesPropertyCache.get(o)) {
                        const n = this._3dtilesFeaturesPropertyCache.get(o);
                        e.featurePropertyCache.push({
                            batchId: t,
                            color: [n[0], n[1], n[2]],
                            show: 255 === n[3]
                        })
                    } else
                        e.featurePropertyCache.push({
                            batchId: t,
                            color: [255, 255, 255],
                            show: !0
                        })
                }
                e.children.forEach(e=>{
                    e.userData.enableObjectification = !0,
                    e.userData.withGeometryIDAttributes = !t
                }
                ),
                this.update3dTileBatchTableTexture(e)
            }
        }
    }
    _parseAttributeName(t) {
        return "POSITION" === t ? "position" : "TEXCOORD_0" === t ? "uv" : "NORMAL" === t ? "normal" : "_BATCHID" === t ? "id" : void 0
    }
    cache3dShow(t) {
        var e = window.t3djs.buffer.nodeBuffer.get(t);
        e && ("show" !== (e.visible ? "show" : "hide") && (e.visible = !0,
        e.needShow = !0))
    }
    tile3dNameCreater(t, e) {
        return e._contentResource.url
    }
    cache3dHide(t) {
        var e = window.t3djs.buffer.nodeBuffer.get(t);
        e && (e.needShow = !1,
        e.visible = !1)
    }
    getTilesFlag(t) {
        for (var e = 0, n = 0; n < t.length; n++) {
            var r = t[n];
            Cesium.defined(r) && (r.content instanceof Cesium.Batched3DModel3DTileContent ? r.content._model._rendererResources.image && (e += "_" + r.content._model._rendererResources.image.length + "_") : r._content instanceof Cesium.Instanced3DModel3DTileContent ? r.content._modelInstanceCollection && r.content._modelInstanceCollection._model._rendererResources.image && (e += "_" + r.content._modelInstanceCollection._model._rendererResources.image.length + "_") : r.content instanceof Cesium.Composite3DTileContent && r.content._contents.forEach(t=>{
                t instanceof Cesium.Batched3DModel3DTileContent ? t._model._rendererResources.image && (e += "_" + t._model._rendererResources.image.length + "_") : t instanceof Cesium.Instanced3DModel3DTileContent && t._modelInstanceCollection && t._modelInstanceCollection._model._rendererResources.image && (e += "_" + t._modelInstanceCollection._model._rendererResources.image.length + "_")
            }
            ),
            r._boundingVolume.radius ? e += "_" + r._boundingVolume.radius + "_" : r._boundingVolume._boundingSphere && (e += "_" + r._boundingVolume._boundingSphere.radius + "_"))
        }
        return e
    }
    triggerEvent(t) {
        C.a.add("check3dTileVisible", function() {
            let e = [];
            for (var n in t) {
                let t = t3djs.buffer.nodeBuffer.get(n);
                if (t) {
                    for (var r in t.children)
                        if (!1 === t.children[r].visible)
                            return;
                    e = e.concat(t.children)
                }
            }
            THING.App.current.trigger("draw3dTileEnd", {
                meshArray: e
            }),
            C.a.delete("check3dTileVisible")
        })
    }
    destroy() {
        super.destroy(),
        this.app.uEarth._earthInstance.tileEarth.removeTile3dLayer(this),
        t3djs.rootNode.remove(this.node);
        for (let t = this.node.children.length - 1; t >= 0; t--) {
            const e = this.node.children[t];
            t3djs.buffer.nodeBuffer.delete(e.name),
            e.dispose(),
            e._tile.destroy();
            for (let t = e.children.length - 1; t >= 0; t--) {
                e.children[t].dispose()
            }
        }
        t3djs.buffer.entityBuffer.delete(this.name),
        this._quad3dTileNames = null,
        this._all3dTiles = null,
        this._3dTilesPerFrame = null,
        this._quad3dTileMatrial = null,
        this._recorder3d = null,
        this._recorder3dFlag = 0,
        this._last3dTiles = [],
        this._currentLoadedTiles = [],
        this._lastLoadedTiles = [],
        this._lastChangeTiles = [],
        this._currentShownTiles = {}
    }
}
function an(t, e) {
    for (let n = 0; n < t.length; n++)
        if (t[n].index === e)
            return t[n];
    return null
}
function on(t, e, n) {
    return e[t[0].primitives[n].material]
}
THING.factory.registerClass("Tile3dLayer", Tile3dLayer);
var Tile3dLayer = Tile3dLayer;
class FeatureLayer extends Layer {
    constructor(t) {
        super(t),
        this.app = t,
        this._selector = new THING.Selector(t)
    }
    customSetup(t) {
        super.customSetup(t);
        const e = this;
        this.data = t.dataSource || {
            type: "FeatureCollection",
            features: []
        },
        this.infoWindow = void 0 !== t.infoWindow ? new Xt(this,t.infoWindow) : void 0,
        this.infoWindow && (e.infoWindow._visible = e.visible),
        this._paramLabel = t.label,
        this._label = void 0 !== t.label ? new Label(this,t.label) : void 0,
        this.name = t.name || "featureLayer_" + MapUtil.getUUID(),
        this.id = t.id || this.name,
        this._height = t.extrudeHeight || t.height,
        void 0 !== this._height && (this._height = +this._height),
        this._outerDataSource = t.outerDataSource,
        this._joinBy = t.joinBy,
        this._useOutline = t.useOutline,
        this._pickWithGeometryID = void 0 !== t.pickWithGeometryID && t.pickWithGeometryID,
        t.renderer.extrudeField ? this._extrudeField = t.renderer.extrudeField : t.extrudeField ? this._extrudeField = t.extrudeField : this._extrudeField = "",
        t.renderer.extrudeFactor ? this._extrudeFactor = t.renderer.extrudeFactor : t.extrudeFactor ? this._extrudeFactor = t.extrudeFactor : this._extrudeFactor = 1,
        void 0 === t.azimuth && (t.azimuth = t.modelAngle),
        void 0 !== t.pivot && (this._pivot = t.pivot),
        this.azimuth = THING.Utils.parseValue(t.azimuth, 0),
        this.geometryType = t.geometryType;
        let n = !1;
        "GeoBuilding" === this.geometryType && (n = !0),
        this.clampToGround = THING.Utils.parseValue(t.clampToGround, n),
        this.heightArrayField = t.heightArrayField,
        this.heightArrayFactor = THING.Utils.parseValue(t.heightArrayFactor, 1),
        this._renderer = t.renderer || {},
        this._orignRenderer = t.renderer || {},
        this._offsetHeight = t.offsetHeight,
        this._offsetHeightField = t.offsetHeightField,
        this._offsetHeightFactor = THING.Utils.parseValue(t.offsetHeightFactor, 1),
        this._groundHeightField = t.groundHeightField,
        this._groundHeightFactor = THING.Utils.parseValue(t.groundHeightFactor, 1),
        THING.Utils.isNull(this._offsetHeight) && THING.Utils.isNull(this._offsetHeightField) && THING.Utils.isNull(this._groundHeightField) && THING.Utils.isNull(this._offsetHeightAdded) && (this._offsetHeight = 0),
        this._offsetHeightAdded = THING.Utils.parseValue(t.offsetHeightAdded, 0),
        this._useMercatorUV = t.useMercatorUV,
        this._animation = t.animation;
        try {
            this._dataHandler(this.data, this.geometryType, this._orignRenderer, this)
        } catch (e) {
            var a = t.error;
            if (e.object = this,
            a)
                return a(e, this),
                !0;
            THING.Utils.error(e),
            setTimeout(()=>{
                this.trigger("error", e)
            }
            , 0)
        }
        this.renderOrder = THING.Utils.parseValue(t.renderOrder, 0),
        super.add({
            object: t,
            keepNode: !0
        }),
        t.animation && this._playAnimation(this._animation),
        this._orignRenderer.postRadialBlur && this._setPostRadiusEffect(!0),
        this._orignRenderer.postRadialBlur2 && this._setPostRadialBlur2(!0),
        MapUtil._updateShadowNextFrame()
    }
    _getGeoObjectArray() {
        return this.children
    }
    setupComplete(t) {
        "GeoPoint" === this.geometryType && "model" === this.renderer.type ? (t.customComplete = !0,
        this.on("update", e=>{
            let n = 0;
            this.children.forEach(t=>{
                (t._obj.loaded || t._obj._loadedError) && n++
            }
            ),
            n === this.children.length && (this.off("update", null, "featureLayerCompleteUpdater_" + this.node.uuid),
            super.setupComplete(t))
        }
        , "featureLayerCompleteUpdater_" + this.node.uuid)) : super.setupComplete(t)
    }
    on() {
        arguments.length < 2 && THING.Utils.log("参数不合法");
        var t = this.geometryType
            , e = null
            , n = 0;
        for (let t = 0; t < arguments.length; t++)
            "function" == typeof arguments[t] && (e = arguments[t],
            n = t);
        if (e) {
            arguments[n] = function(n) {
                let r = n.mouseOnObject || n.mouseOffObject || n.pickedObj || n.pickedObject;
                r && ("GeoPoint" === t ? n.object = r.parent : (n.object = r,
                n._stopPropagation = !0)),
                e.call(n.object, n)
            }
        }
        this.__canAcceptEvent__ = !0,
        super.on.apply(this, arguments)
    }
    _removeAllInfoWindow() {
        if (this.infoWindow)
            for (let t in this.children)
                this.children[t].infoWindow.destroy()
    }
    get renderer() {
        return this._renderer
    }
    add(t) {
        t.type === this.geometryType ? (super.add({
            object: t,
            keepNode: !0,
            keepVisible: !1
        }),
        "GeoScene" === t.type ? (t.init(),
        this._layerScene.push(t)) : this._layer.add(t.node)) : THING.Utils.warn("当前FeatureLayer的geometryType为" + this.geometryType + ",不能添加" + t.type)
    }
    remove(t) {
        var e = this.children.indexOf(t);
        e > -1 && this.children.splice(e, 1),
        t.infoWindow && t.infoWindow.destroy(),
        this._layer.remove(t._layer),
        "GeoScene" === t.type && t.destroy()
    }
    removeAll() {
        for (; this.children.length > 0; )
            this.remove(this.children[0])
    }
    updateRenderer(t) {
        for (var e = 0; e < this.children.length; e++) {
            var n = []
                , a = JSON.parse(JSON.stringify(t))
                , i = this.children[e]
                , o = i.userData;
            for (var s in a) {
                var l = a[s];
                if (Array.isArray(l))
                    if (l.length > 0 && void 0 !== l[0].condition)
                        for (var u in l) {
                            var c = l[u].condition;
                            if ("" === c && (a[s] = l[u].value),
                            MapUtil.isObjectMeetCondition(o, c)) {
                                -1 === n.indexOf(c) && n.push(c),
                                a[s] = l[u].value;
                                break
                            }
                        }
                    else
                        a[s] = l;
                else
                    a[s] = l;
                this._renderer["_" + s] = l,
                s.indexOf("color") >= 0 && "useColor" !== s && (this._renderer["_" + s] = CMAP.Util.colorFormatNewToOld(l)),
                "color" === s ? this._renderer._opacity = this._renderer["_" + s][3] : "lineColor" === s && (this._renderer._lineOpacity = this._renderer["_" + s][3])
            }
            var h = JSON.stringify(n);
            i._conditionStr = h,
            i.updateRenderer(a)
        }
        setTimeout(function() {
            THING.App.current.rendererManager._mainRenderer.dirty()
        }, 0)
    }
    updateFeatureProperty(t, e, n) {
        var a = this
            , i = null;
        a.children.map(function(o) {
            var s = o.userData
                , l = [];
            if (e.length > 0 && void 0 !== e[0].condition)
                if (void 0 !== e[0].condition)
                    for (var u in e) {
                        var c = e[u].condition;
                        if ("" === c && (i = e[u].value),
                        MapUtil.isObjectMeetCondition(s, c)) {
                            -1 === l.indexOf(c) && l.push(c),
                            i = e[u].value;
                            break
                        }
                    }
                else
                    i = e;
            else
                i = e;
            var h = JSON.stringify(l);
            o._conditionStr = h,
            "color" !== t && "imageUrl" !== t && "cool" !== t || (o.renderer._type = n,
            o.renderer._imageUrl = "",
            o.renderer._color = []),
            -1 !== a.geometryType.indexOf("Line") && o._checkPartical(),
            o.renderer[t] = i
        }),
        "color" !== t && "imageUrl" !== t || (a.renderer._type = n)
    }
    updateLineWidth(t) {
        this._orignRenderer = t;
        var e = t.width;
        this.updateFeatureProperty("width", e, t.type)
    }
    get label() {
        return this._label
    }
    set label(t) {
        this.children.forEach(function(e) {
            e.label = t
        }),
        this._label = new Label(this,t)
    }
    _setLabel(t) {
        for (let e = 0; e < this.children.length; e++) {
            let n = this.children[e]
                , r = this._getValueByCnd(t, n.userData).config;
            n.label = r
        }
        this._label = new Label(this,t)
    }
    _setOffsetHeightAndAdded(t, e, n) {
        this._offsetHeightField === t && this._offsetHeightAdded === e && this._offsetHeightFactor === n || (this.children.map(function(t) {
            t._offsetHeightAdded = e
        }),
        this._offsetHeightAdded = e,
        this._offsetHeightFactor = n,
        this.offsetHeightField = t)
    }
    _setExtrudeFieldAndFactor(t, e) {
        this._extrudeField === t && this._extrudeFactor === e || (this.children.map(function(t) {
            t._extrudeFactor = e
        }),
        this._extrudeFactor = e,
        this._setExtrudeField(t))
    }
    _setExtrudeFactor(t) {
        this.children.map(function(e) {
            e.extrudeFactor = t
        }),
        this._extrudeFactor = t
    }
    _setExtrudeField(t) {
        this.children.map(function(e) {
            e.extrudeField = t
        }),
        this._extrudeField = t
    }
    get extrudeFactor() {
        return this._extrudeFactor
    }
    get extrudeField() {
        return this._extrudeField
    }
    set extrudeFactor(t) {
        this._extrudeFactor !== t && this._setExtrudeFactor(t)
    }
    set extrudeField(t) {
        this._extrudeField !== t && this._setExtrudeField(t)
    }
    updateExtrude(t) {
        THING.Utils.isNull(t.extrudeHeight) ? THING.Utils.isNull(t.extrudeHeight) || (this.extrudeHeight = t.extrudeHeight,
        this._extrudeField = null) : this._setExtrudeFieldAndFactor(t.extrudeField, t.extrudeFactor)
    }
    updateOffset(t) {
        const e = THING.Utils.parseValue(t.offsetHeightAdded, 0);
        THING.Utils.isNull(t.offsetHeight) ? this._setOffsetHeightAndAdded(t.offsetHeightField, t.offsetHeightAdded, t.offsetHeightFactor) : (this.offsetHeight = t.offsetHeight + e,
        this._offsetHeightField = null)
    }
    updateMat(t) {
        var e;
        this._orignRenderer = t,
        this.renderer.extrudeField = "无" === t.extrudeField ? "" : t.extrudeField,
        this.renderer.extrudeFactor = t.extrudeFactor,
        this.renderer.blending = t.blending,
        "vector" === t.type ? e = "color" : "image" === t.type ? e = "imageUrl" : "cool" === t.type && (e = "cool");
        var n = t[e];
        this.updateFeatureProperty(e, n, t.type)
    }
    _setFocusRegion(t) {
        this.children.map(e=>{
            e._setFocusRegion(t)
        }
        )
    }
    _removeFocusRegion() {
        this.children.map(t=>{
            t._removeFocusRegion()
        }
        )
    }
    get extrudeHeight() {
        return this.height
    }
    set extrudeHeight(t) {
        this.height = t
    }
    get height() {
        return this._height
    }
    set height(t) {
        if ("GeoPoint" === this.geometryType)
            for (let e = 0; e < this.children.length; e++)
                this.children[e].offsetHeight = t;
        else if ("GeoDiffusion" === this.geometryType || "GeoBoundary" === this.geometryType || "GeoBuilding" === this.geometryType || "GeoPolygon" === this.geometryType)
            for (let e = 0; e < this.children.length; e++)
                this.children[e].extrudeHeight = t;
        else
            THING.Utils.warn(this.geometryType + "不可设置height属性");
        this._height = t
    }
    set offsetHeightField(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].offsetHeightField = t;
        this._offsetHeightField = t,
        this._offsetHeight = void 0
    }
    get offsetHeightField() {
        return this._offsetHeightField
    }
    set offsetHeightFactor(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].offsetHeightFactor = t;
        this._offsetHeightFactor = t
    }
    get offsetHeightFactor() {
        return this._offsetHeightFactor
    }
    set offsetHeightAdded(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e]._offsetHeightAdded = t,
            this.children[e]._arrayOffsetHeight ? this.children[e]._setOffsetHeightFieldAndFactor() : this.children[e].offsetHeightAdded = t;
        this._offsetHeightAdded = t
    }
    get offsetHeightAdded() {
        return this._offsetHeightAdded
    }
    set groundHeightField(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].groundHeightField = t;
        this._groundHeightField = t,
        this._offsetHeight = void 0
    }
    get groundHeightField() {
        return this._groundHeightField
    }
    set groundHeightFactor(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].groundHeightFactor = t;
        this._groundHeightFactor = t
    }
    get groundHeightFactor() {
        return this._groundHeightFactor
    }
    set heightArrayField(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].heightArrayField = t;
        this._heightArrayField = t
    }
    get heightArrayField() {
        return this._heightArrayField
    }
    set heightArrayFactor(t) {
        for (var e = 0; e < this.children.length; e++)
            this.children[e].heightArrayFactor = t;
        this._heightArrayFactor = t
    }
    get heightArrayFactor() {
        return this._heightArrayFactor
    }
    get dataSource() {
        return this.data
    }
    set dataSource(t) {
        this.data = t,
        this.removeAll(),
        this._dataHandler(this.data, this.geometryType, this._orignRenderer, this)
    }
    get visible() {
        return this.node.visible && this._visible
    }
    set visible(t) {
        super.visible = t,
        this._visible = t,
        this.infoWindow && (this.infoWindow.visible = t)
    }
    joinAttribute(t, e, n) {
        var a = this._orignRenderer;
        if (n || (n = e),
        t && e && n && "GeoHeatMap" !== this.geometryType) {
            var i = [];
            this.children.map(o=>{
                var s = o.userData;
                for (var l in t.forEach(function(t) {
                    s[e] === t[n] && (o.userData = CMAP.Util.objectAssign(t, s))
                }),
                a) {
                    var u, c = a[l];
                    if (Array.isArray(c))
                        if (c.length > 0 && void 0 !== c[0].condition)
                            for (var h in c) {
                                var d = c[h].condition;
                                if ("" === d && (u = c[h].value),
                                MapUtil.isObjectMeetCondition(s, d)) {
                                    -1 === i.indexOf(d) && i.push(d),
                                    u = c[h].value;
                                    break
                                }
                            }
                        else
                            u = c;
                    else
                        u = c;
                    o.renderer[l] = u
                }
            }
            )
        }
    }
    _getValueByCnd(t, e) {
        let n = {}
            , a = [];
        for (let i in t) {
            let o = t[i];
            if (Array.isArray(o))
                if (o.length > 0 && void 0 !== o[0].condition)
                    for (let t in o) {
                        let s = o[t].condition;
                        if ("" === s && (n[i] = o[t].value),
                        MapUtil.isObjectMeetCondition(e, s)) {
                            -1 === a.indexOf(s) && a.push(s),
                            n[i] = o[t].value;
                            break
                        }
                    }
                else
                    n[i] = o;
            else
                n[i] = o
        }
        return {
            config: n,
            featureCondition: a
        }
    }
    _dataHandler(t, e, n, r) {
        var a = t.features;
        if ("GeoHeatMap" !== e) {
            var i = 0;
            for (let t = 0; t < a.length; t++) {
                let h = a[t];
                var o = h.properties;
                r._outerDataSource && r._joinBy && r._outerDataSource.forEach(function(t) {
                    o[r._joinBy] === t[r._joinBy] && (o = Object.assign(t, o))
                });
                var s = h.geometry;
                i++;
                let d = this._getValueByCnd(n, o)
                    , f = d.config
                    , p = d.featureCondition;
                var l = JSON.stringify(p)
                    , u = "geoItem_" + e + "_" + i
                    , c = "geoItem_" + e + "_" + i;
                for (let t in o)
                    "id" === t.toLowerCase() && (c = o[t]),
                    "name" === t.toLowerCase() && (u = o[t]);
                let m;
                this._paramLabel && (m = this._getValueByCnd(this._paramLabel, o).config);
                let g = this.offsetHeight
                    , v = this.offsetHeightAdded;
                THING.Utils.isNull(this.offsetHeightField) && THING.Utils.isNull(this.groundHeightField) && THING.Utils.isNull(this.offsetHeight) && !THING.Utils.isNull(this.offsetHeightAdded) && (g = this.offsetHeightAdded,
                v = void 0);
                let y = r.app.create({
                    type: e,
                    id: c,
                    name: u,
                    coordinates: s.coordinates,
                    pickWithGeometryID: r._pickWithGeometryID,
                    extrudeHeight: r._height,
                    extrudeField: r._extrudeField,
                    extrudeFactor: r._extrudeFactor,
                    offsetHeight: g,
                    offsetHeightField: r._offsetHeightField,
                    offsetHeightFactor: r._offsetHeightFactor,
                    offsetHeightAdded: v,
                    groundHeightField: r._groundHeightField,
                    groundHeightFactor: r._groundHeightFactor,
                    infoWindow: CMAP.Util._toObject(r.infoWindow),
                    useMercatorUV: r._useMercatorUV,
                    label: m,
                    userData: o,
                    renderer: f,
                    azimuth: r.azimuth,
                    clampToGround: r.clampToGround,
                    heightArrayField: r.heightArrayField,
                    heightArrayFactor: r.heightArrayFactor,
                    pivot: r._pivot,
                    _featureLayerId: r.id,
                    _conditionStr: l,
                    useOutline: r._useOutline
                });
                r.add(y)
            }
            "GeoPoint" === r.geometryType ? r._renderer = new ee(r,n) : "GeoLine" === r.geometryType || "GeoFlyLine" === r.geometryType || "GeoFlyLine2" === r.geometryType || "GeoODLine" === r.geometryType ? r._renderer = new Renderer_1(r,n) : "GeoBuilding" === r.geometryType ? r._renderer = new Renderer(r,n) : "GeoHeatMap" === r.geometryType ? r._renderer = new Ae(r,n) : "GeoPolygon" === r.geometryType ? (r._setUpRenderer(n),
            r._processPolygonRenderer()) : "GeoWater" === r.geometryType ? r._renderer = new WaterRenderer(r,n) : "GeoBoundary" === r.geometryType && (r._renderer = new Renderer_2(r,n))
        } else {
            var h = []
                , d = r.renderer.valueField;
            a.map(t=>{
                var e = t.properties
                    , n = t.geometry;
                d && e[d] && "NaN" !== parseFloat(e[d]).toString() ? h.push({
                    x: n.coordinates[0],
                    y: n.coordinates[1],
                    value: parseFloat(e[d])
                }) : h.push({
                    x: n.coordinates[0],
                    y: n.coordinates[1],
                    value: 1
                })
            }
            );
            var f = r.app.create({
                type: r.geometryType,
                name: r.name,
                dataSource: h,
                renderer: r._renderer
            });
            r.add(f)
        }
        r.extent = CMAP.Util.getFeatureCollectionExtent(r.dataSource)
    }
    _setUpRenderer(t) {
        this._fillRenderer = new Renderer(this,t);
        let e = {};
        for (let n in t)
            if (n.startsWith("outline")) {
                let r = n.replace("outline", "");
                e[r = r.charAt(0).toLowerCase() + r.slice(1)] = t[n]
            }
        void 0 === e.lineType && (e.lineType = "Plane"),
        void 0 === e.width && (e.width = 0),
        this._lineRenderer = new Renderer_1(this,e),
        this._originLineRenderer = e
    }
    _processPolygonRenderer() {
        let t = this._fillRenderer.toObject()
            , e = this._lineRenderer.toObject()
            , n = this;
        this._renderer = {};
        for (let e in t)
            Object.defineProperty(this._renderer, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return n._fillRenderer[e]
                },
                set: function(t) {
                    n._fillRenderer[e] = t
                }
            });
        for (let t in e) {
            let e = "outline" + t.charAt(0).toUpperCase() + t.slice(1);
            Object.defineProperty(this._renderer, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return n._lineRenderer[t]
                },
                set: function(e) {
                    n.children.forEach(r=>{
                        ("lineType" === t || "width" === t && "Plane" !== n.renderer.outlineLineType) && r._outline.setParent(null),
                        r._lineRenderer[t] = e,
                        ("lineType" === t || "width" === t && "Plane" !== n.renderer.outlineLineType) && (r._setUpOutlineExtra(),
                        r.add(r._outline))
                    }
                    ),
                    n._lineRenderer["_" + t] = "color" === t ? CMAP.Util.colorFormatNewToOld(e, n._lineRenderer.opacity) : e
                }
            })
        }
    }
}
THING.factory.registerClass("FeatureLayer", FeatureLayer);
class VectorBaseLayer extends Layer {
    constructor(t) {
        super(t),
        this.app = t,
        this.type = "VectorBaseLayer",
        this.state = "start"
    }
    customSetup(t) {
        super.customSetup(t),
        this.layerType = "VectorBaseLayer",
        this.rootNode = new THREE.Group,
        this.rootNode.name = "VectorBaseLayer",
        window.t3djs.buffer.nodeBuffer.add("VectorBaseLayer", this.rootNode),
        this.node = this._layer = this.rootNode = window.t3djs.VectorBaseLayer = new THREE.Group,
        this.earthResource = t.url,
        this.complete = t.complete,
        this._parseRenderer(t.style || t.renderer),
        this.pending = [],
        this.data = {
            bigPoint: null,
            smallPoint: null,
            worldPoint: null,
            bigLine: null,
            smallLine: null,
            china: null,
            lonlat: null,
            earth: null
        }
    }
    _parseRenderer(t) {
        this._defaultStyle = {
            bigPointStyle: {
                glowStrength: 2,
                size: 5,
                color: "#444fff"
            },
            smallPointStyle: {
                glowStrength: 1.2,
                size: 2,
                color: "#0087ff"
            },
            worldPointStyle: {
                glowStrength: 1.2,
                size: 4,
                color: "#6186ff"
            },
            bigLineStyle: {
                glowStrength: 1.38,
                width: 3,
                color: "#00bbe3"
            },
            smallLineStyle: {
                glowStrength: 0,
                width: 1,
                color: "#ffffff"
            },
            chinaEffect: !0,
            loadConfig: {
                lonlat: !0
            },
            worldMeshStyle: {
                color: "#193e96",
                lights: !1,
                type: "vector",
                visible: !0
            }
        },
        this._renderer = this._style = THING.Utils.mergeObject(this._defaultStyle, t, !0)
    }
    setupComplete() {
        var t = this;
        C.a.add("vectorLayerVisible", function() {
            t.app.uEarth._earthInstance.tileEarth.isEarthShow && t.load()
        })
    }
    load() {
        C.a.delete("vectorLayerVisible"),
        this.pending.push(this.getEarthMeshes()),
        this.pending.push(this.getEarthPoints()),
        this.pending.push(this.getEarthLines()),
        this.style.loadConfig.lonlat && this.pending.push(this.getEarthLonLatLines());
        let t = this.app;
        Promise.all(this.pending).then(()=>{
            !THING.App.current.uEarth._earthInstance._atmospereSetuped && THING.App.current.uEarth._atmosphere && (THING.App.current.uEarth.atmosphere = !0),
            this.changeStyle(this.style),
            setTimeout(()=>{
                t.rendererManager._mainRenderer.dirty(),
                this.complete && this.complete({
                    object: this
                }),
                t.trigger("VectorBaseLayerComplete", {
                    object: this
                })
            }
            , 10)
        }
        )
    }
    getEarthMeshes() {
        let t = this.app
            , e = this.earthResource + "/world.geojson"
            , n = this;
        return new Promise((a,i)=>{
            MapUtil._queryHttpUrl({
                url: e,
                complete: function(e) {
                    e = JSON.parse(e);
                    let r = t.create({
                        type: "FeatureLayer",
                        dataSource: e,
                        geometryType: "GeoPolygon",
                        renderer: n.style.worldMeshStyle,
                        visible: n.style.worldMeshStyle.visible,
                        renderOrder: -100
                    });
                    r.node.getMeshes().forEach(function(t) {
                        t._vectorStyle = Wt.worldMesh
                    });
                    let i = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(10 / 255,10 / 255,10 / 255),
                        transparent: !0
                    })
                        , o = new THREE.SphereGeometry(CMAP.depthGlobeRadiusFar,128,128)
                        , s = new THREE.Mesh(o,i);
                    s.renderOrder = -101,
                    r.node.add(s),
                    n._processChinaEffect(r.node, n.style.chinaEffect),
                    n.rootNode.add(r.node);
                    let l = r.query("China")[0].node.getMeshes()[0];
                    n.data.china = l,
                    n.data.earth = r.node,
                    a("success getEarthMeshes")
                }
            })
        }
        )
    }
    _processEarth(t) {}
    _processChinaEffect(t, e=!0) {
        t && (e ? THING.App.current.effectManager.setEffect(t, "radialOffset", !0) : THING.App.current.effectManager.removeEffect(t, "radialOffset"))
    }
    getPolygon() {}
    processCompositor() {}
    getEarthPoints() {
        let t = this.earthResource + "/lonlatBigPoint.json"
            , e = this.earthResource + "/lonlatSmallPoint.json"
            , n = this.earthResource + "/world.geojson"
            , r = this
            , a = [t, e, n]
            , i = r.style.bigPointStyle
            , o = r.style.smallPointStyle
            , s = r.style.worldPointStyle;
        return new Promise((l,u)=>{
            THING.Utils.dynamicLoad(a, function(a) {
                let u = a[t]
                    , c = r._createBigPointMesh(u, "vectorEarth-bigPoint", i.size, i.glowStrength, !0);
                c._vectorStyle = Wt.bigPoint;
                let h = a[e]
                    , d = r._createBigPointMesh(h, "vectorEarth-smallPoint", o.size, o.glowStrength, !0);
                d._vectorStyle = Wt.smallPoint,
                r.rootNode.add(c),
                r.rootNode.add(d);
                let f = a[n]
                    , p = r._createBigPointMesh(f, "vectorEarth-worldPoint", s.size, s.glowStrength, !0, "geojson");
                p._vectorStyle = Wt.worldPoint,
                r.rootNode.add(p),
                r.data.bigPoint = c,
                r.data.smallPoint = d,
                r.data.worldPoint = p,
                l("success getEarthPoints")
            }, !1)
        }
        )
    }
    _processWorldPoint(t) {
        let e = []
            , n = []
            , a = t.features;
        for (let t = 0, i = a.length; t < i; t++) {
            let i = a[t].geometry.coordinates
                , o = M.a._processGeojson(i, "POLYGON");
            for (let t = 0, a = o.length; t < a; t++) {
                let a = o[t];
                for (let t = 0, i = a.length; t < i; t++) {
                    let i = a[t];
                    for (let t = 0, a = i.length; t < a; t++) {
                        let a = MapUtil.convertLonlat2World(i[t], 10);
                        e.push(a[0]),
                        e.push(a[1]),
                        e.push(a[2]),
                        n.push(1),
                        n.push(1),
                        n.push(1),
                        n.push(1)
                    }
                }
            }
        }
        return {
            position: e,
            color: n
        }
    }
    _processPoint(t) {
        let e = []
            , n = [];
        for (let r = 0, a = t.length; r < a; r++)
            e.push(t[r].pos[0]),
            e.push(t[r].pos[1]),
            e.push(t[r].pos[2]),
            n.push(1),
            n.push(1),
            n.push(1),
            n.push(1);
        return {
            position: e,
            color: n
        }
    }
    _createBigPointMesh(t, e, n=1, r=1, a=!0, i="json") {
        let o, s = (o = "json" === i ? this._processPoint(t) : this._processWorldPoint(t)).position, l = o.color, u = t3djs.util.createBigPointGeometry(s, l), c = t3djs.util.createBigPointMaterial(e, n);
        c.depthTest = !0;
        let h = t3djs.util.createBigPointMesh(u, c);
        return THING.App.current.effectManager.setEffect(h, "glow", !0),
        a && THING.App.current.effectManager.setEffect(h, "radialBlur2", !0),
        h
    }
    getEarthLines() {
        let t = this.earthResource + "/china_outline.geojson"
            , e = this.earthResource + "/china_innerline.geojson"
            , n = this
            , r = [t, e]
            , a = n.style.bigLineStyle
            , i = n.style.smallLineStyle;
        return new Promise((o,s)=>{
            THING.Utils.dynamicLoad(r, function(r) {
                let s = r[t]
                    , l = n.app.create({
                    type: "FeatureLayer",
                    geometryType: "GeoLine",
                    name: "vectorEarth-china_outline",
                    dataSource: s,
                    renderer: {
                        type: "vector",
                        effect: !1,
                        lineType: "Plane",
                        width: a.width,
                        color: a.color
                    },
                    offsetHeight: 2e3,
                    renderOrder: -98
                });
                l.node.getMeshes().map(t=>{
                    t._vectorStyle = Wt.bigLine,
                    THING.App.current.effectManager.setEffect(t, "glow", a.glowStrength)
                }
                ),
                n.rootNode.add(l.node);
                let u = r[e]
                    , c = n.app.create({
                    type: "FeatureLayer",
                    geometryType: "GeoLine",
                    name: "vectorEarth-china_innerline",
                    dataSource: u,
                    renderer: {
                        type: "vector",
                        effect: !1,
                        lineType: "Plane",
                        width: i.width,
                        color: i.color
                    },
                    offsetHeight: 2e3,
                    renderOrder: -97
                });
                c.node.getMeshes().map(t=>{
                    t._vectorStyle = Wt.smallLine,
                    THING.App.current.effectManager.setEffect(t, "glow", i.glowStrength)
                }
                ),
                n.rootNode.add(c.node),
                n.data.bigLine = l.node,
                n.data.smallLine = c.node,
                o("success getEarthLines")
            })
        }
        )
    }
    getEarthLonLatLines() {
        let t = this.app
            , e = this.earthResource + "/lonlat/"
            , n = this;
        return new Promise((r,a)=>{
            t.create({
                type: "Thing",
                url: e,
                name: "vectorEarth-lonlatLine",
                position: [0, 0, 0],
                angle: 0,
                complete: function(e) {
                    e.object.renderOrder = -99;
                    const a = e.object.node;
                    a.getMaterials().map(t=>{
                        t.depthWrite = !1
                    }
                    ),
                    a.scale.set(92e3, 92e3, 92e3),
                    n.data.lonlat = a,
                    t.addControl({
                        onUpdate: ()=>{
                            t.rendererManager._mainRenderer.dirty("Glow")
                        }
                    }, "VectorBaseLayer_UpdateModels"),
                    n.add(e.object),
                    r("success getEarthLonLatLines")
                }
            })
        }
        )
    }
    showLonLatModel(t=!0) {
        let e = this.app;
        this.data.lonlat && (this.data.lonlat.visible = t,
        e.removeControl("VectorBaseLayer_UpdateModels"),
        t && e.addControl({
            onUpdate: ()=>{
                e.rendererManager._mainRenderer.dirty("Glow")
            }
        }, "VectorBaseLayer_UpdateModels"),
        e.rendererManager._mainRenderer.dirty())
    }
    showChinaLines(t=!0) {
        let e = this.app;
        this.data.smallLine.visible = t,
        e.rendererManager._mainRenderer.dirty()
    }
    showEarth(t=!0) {
        let e = this.app;
        this.data.earth.visible = t,
        e.rendererManager._mainRenderer.dirty()
    }
    updateRenderer(t) {
        this.changeStyle(t)
    }
    changeStyle(t) {
        THING.Utils.mergeObject(this.renderer, t, !0);
        let e = this.renderer;
        this._processChinaEffect(this.data.china, e.chinaEffect),
        MapUtil.applyVectorEarthStyle(this, e)
    }
    enableFocusRegion() {}
    postRadialBlur() {}
    show(t, e=!0) {
        this.data[t] && (this.data[t].visible = e,
        this.app.rendererManager._mainRenderer.dirty())
    }
}
THING.factory.registerClass("VectorBaseLayer", VectorBaseLayer);
class TileFeatureLayer extends THING.BaseObject {
    constructor(t) {
        super(t),
        this.app = t,
        this._layer = this.node
    }
    setup(t) {
        this.map = t.map,
        this.layerType = "TileFeatureLayer",
        this.name = t.name || "TileFeatureLayer" + (new Date).getTime(),
        this._visible = !0,
        this._lastTilesName = [],
        t.renderer ? this._renderer = t.renderer : this._renderer = {
            type: "image",
            url: "./uGeo/pop.png",
            size: 20
        },
        this._3dtileseturl = t.url,
        isNaN(t.height) || (this._3dtilesetHeight = t.height),
        this._3dtileset = new Cesium3.Cesium3DTileset({
            url: this._3dtileseturl,
            skipLevelOfDetail: !0,
            immediatelyLoadDesiredLevelOfDetail: !0
        }),
        this._3dtileset.total3dTileNumber = 0,
        this._3dtileset.maximumMemoryUsage = THING.Utils.parseValue(t.maximumMemoryUsage, 64),
        this._3dtileset.maximum3dTileNumber = THING.Utils.parseValue(t.maximum3dTileNumber, 1e5),
        this._3dtileset.height = this._3dtilesetHeight,
        this.setupComplete(t)
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        this.show(t),
        this._visible = t
    }
    show(t) {
        this.node.visible = t
    }
    draw3d(t) {
        let e = this
            , n = this.isContinue3d(t);
        if ("break" !== n) {
            Array.isArray(n) && n.forEach(t=>{
                e.cache3dHide.call(this, t)
            }
            );
            var r = [];
            t.forEach(t=>{
                let n = e.tile3dNameCreater(this.name, t);
                r.push(n),
                this.create3dTileObject(t, n)
            }
            ),
            this._lastTilesName = r
        }
    }
    callAfterRenderFunctions(t) {
        for (var e = t.afterRender, n = 0, r = e.length; n < r; ++n)
            e[n]();
        e.length = 0
    }
    isContinue3d(t) {
        let e = this;
        var n = []
            , r = []
            , a = [];
        t.length;
        if (0 === this._lastTilesName.length)
            return "continue";
        if (0 !== this._lastTilesName.length) {
            var i = [];
            return t.forEach(t=>{
                let r = e.tile3dNameCreater(this.name, t);
                i.push(r),
                -1 === this._lastTilesName.indexOf(r) ? n.push(r) : a.push(r)
            }
            ),
            this._lastTilesName.forEach((t,e)=>{
                -1 === i.indexOf(t) && r.push(t)
            }
            ),
            t.length < 10 && 0 !== t.length ? "break" : r
        }
        return "break"
    }
    create3dTileObject(t, e) {
        let n = this;
        if (0 === this.query(e).length) {
            this._3dtileset.total3dTileNumber++;
            var r = this.app.create({
                type: "BaseObject",
                name: e
            });
            t._content._contents.forEach((t,n)=>{
                let a = t.batchTable.batchTableJson.Latitude[0] / Math.PI * 180
                    , i = t.batchTable.batchTableJson.Longitude[0] / Math.PI * 180
                    , o = t.batchTable.batchTableJson.attributes || {};
                var s = this.app.create({
                    type: "GeoPoint",
                    name: "geo_" + e + "_" + n,
                    coordinates: [i, a],
                    userData: o,
                    renderer: this._renderer
                });
                r.add(s)
            }
            ),
            this.add(r)
        } else
            n.cache3dShow.call(this, e)
    }
    cache3dDestroy(t) {
        var e = this.query(t);
        if (e.length > 0) {
            e.getChildrenNum();
            e[0].needShow = !1,
            e[0].destroy(!0, !1),
            this._3dtileset.total3dTileNumber -= 1
        }
    }
    cache3dShow(t) {
        var e = this.query(t);
        e.length > 0 && (e[0].needShow = !0,
        e[0].visible = !0)
    }
    tile3dNameCreater(t, e) {
        e._contentUrl;
        var n = e._content._url.split("/");
        return t + n[n.length - 2] + "_" + n[n.length - 1]
    }
    cache3dHide(t) {
        var e = this.query(t);
        if (e.length > 0) {
            e[0].needShow = !1,
            e[0].visible = !1;
            try {
                this._3dtileset.total3dTileNumber--,
                e[0].destroy()
            } catch (t) {}
        }
    }
}
THING.factory.registerClass("TileFeatureLayer", TileFeatureLayer);
new THREE.MeshBasicMaterial({
    color: 2200782
});
class TileBuildingLayer extends Tile3dLayer {
    constructor(t) {
        super(t)
    }
    setup(t) {
        super.setup(t),
        this.layerType = "TileBuildingLayer",
        this.name = t.name || "tileBuildingLayer" + (new Date).getTime(),
        this.originRenderer = this.renderer = t.renderer || {}
    }
    show(t) {
        this.node.visible = t
    }
    get renderOrder() {
        return this._renderOrder
    }
    set renderOrder(t) {
        this._renderOrder = t,
        this._tileBuildingLayer.children.map(e=>{
            e.map(e=>{
                e.renderOrder = t
            }
            )
        }
        )
    }
    createMaterial() {
        return Ut._createAllMaterial(this.renderer, "GeoBuilding")
    }
    create3dTileMesh(t, e, n, r, a, i, o) {
        if (t)
            if (1 === t.length) {
                var s = new THREE.Texture(t[t.length - 1].image);
                s.wrapS = s.wrapT = THREE.RepeatWrapping,
                s.needsUpdate = !0;
                var l = e + "_tex"
                    , u = e + "_mat";
                s.name = l,
                s.matrixAutoUpdate = !1;
                var c = new THREE.MeshBasicMaterial({
                    map: s,
                    name: u
                });
                if (t3djs.buffer.materialBuffer.add(u, c),
                o && o.grayFilterEnable && o.grayFilterColorBar && o.grayFilterPerBar) {
                    let t = CMAP.Util._generateGradientTextureByGray(o.grayFilterPerBar, o.grayFilterColorBar);
                    c.colorMapping = t
                }
                o && o.color && (c.color = new THREE.Color(o.color[0] / 255,o.color[1] / 255,o.color[2] / 255));
                var h = r.length;
                for (let t = 0; t < h; t++) {
                    let a = e + "_" + t
                        , i = new THREE.Mesh(r[t],c);
                    i.frustumCulled = !0,
                    i.name = a,
                    i.userData.skipPick = !0,
                    n.add(i),
                    t3djs.buffer.nodeBuffer.add({
                        meshName: i
                    }),
                    r[t] = null
                }
            } else if (i.length === r.length) {
                let a, o = CMAP.Util.position2angles(n.position.toArray()), s = CMAP.Util.anglesToQuaternion(o).inverse();
                this.renderer.quaternion = s,
                this.renderer.useOriginMaterial || (a = this.createMaterial());
                for (let o = 0; o < i.length; o++) {
                    var d = i[o].pbrMetallicRoughness.baseColorTexture.index;
                    let s;
                    if (this.renderer.useOriginMaterial) {
                        if (!i[o].material) {
                            const n = dn(t, d);
                            let r = (s = new THREE.MeshBasicMaterial({
                                map: new THREE.Texture(n.image),
                                transparent: !0,
                                metalness: i[o].pbrMetallicRoughness.metallicFactor,
                                color: i[o].pbrMetallicRoughness.baseColorFactor,
                                roughness: i[o].pbrMetallicRoughness.roughnessFactor,
                                opacity: i[o].pbrMetallicRoughness.baseColorFactor[3]
                            })).map;
                            if (r) {
                                r.wrapS = r.wrapT = THREE.RepeatWrapping,
                                r.needsUpdate = !0;
                                let t = e + o + "_tex";
                                r.name = t,
                                r.matrix.set(1, 0, 0, 0, -1, 0, 0, 0, 1),
                                r.matrixAutoUpdate = !1
                            }
                            i[o].material = s
                        }
                    } else {
                        const t = d % 2;
                        (s = a[Math.floor(d / 2)][t]).side = THREE.FrontSide
                    }
                    let l = e + "_" + o
                        , u = new THREE.Mesh(r[o],s);
                    "cool" === this.renderer.type && this.renderer.effect && THING.App.current.effectManager.setEffect(u, "glow", void 0 === this.renderer.glowStrength ? .5 : this.renderer.glowStrength),
                    u.frustumCulled = !0,
                    u.name = l,
                    u.userData.skipPick = !0,
                    n.add(u),
                    t3djs.buffer.nodeBuffer.add({
                        meshName: u
                    }),
                    r[o] = null
                }
            } else
                THING.Utils.warn("贴图个数与mesh个数不一致");
        else {
            let t = e + "_mat"
                , a = new THREE.MeshStandardMaterial({
                name: t
            });
            if (t3djs.buffer.materialBuffer.add(t, a),
            o && o.grayFilterEnable && o.grayFilterColorBar && o.grayFilterPerBar) {
                let t = CMAP.Util._generateGradientTextureByGray(o.grayFilterPerBar, o.grayFilterColorBar);
                a.colorMapping = t
            }
            o && o.color && (a.color = new THREE.Color(o.color[0] / 255,o.color[1] / 255,o.color[2] / 255));
            let i = r.length;
            for (var f = 0; f < i; f++) {
                let t = e + "_" + f
                    , i = new THREE.Mesh(r[f],a);
                i.frustumCulled = !0,
                i.name = t,
                i.userData.skipPick = !0,
                n.add(i),
                i.tuuid = "build",
                t3djs.buffer.nodeBuffer.add({
                    meshName: i
                }),
                r[f] = null
            }
        }
    }
    setDataFromAttributes(t, e) {
        let n;
        for (let c in t) {
            let h = t[c];
            var r, a = h.count, i = THING.Utils.parseValue(h.offsetInBytes, 0), o = h.strideInBytes, s = h.componentDatatype, l = h.componentsPerAttribute, u = this._parseAttributeName(h.attribute);
            if (5126 === s) {
                let t = new Uint8Array(h.vertexBuffer);
                if (5 === (o /= Float32Array.BYTES_PER_ELEMENT)) {
                    let e;
                    if (i /= Float32Array.BYTES_PER_ELEMENT,
                    !n) {
                        n = new Float32Array(t.buffer);
                        for (let t = 0; t < n.length / o; t++) {
                            let e, r, a, i, s;
                            e = n[t * o],
                            r = n[t * o + 1],
                            a = n[t * o + 2],
                            i = n[t * o + 3],
                            s = n[t * o + 4],
                            n[t * o] = -e,
                            n[t * o + 1] = a,
                            n[t * o + 2] = r,
                            n[t * o + 3] = i,
                            n[t * o + 4] = 1 - s
                        }
                        e = new THREE.InterleavedBuffer(n,o)
                    }
                    r = new THREE.InterleavedBufferAttribute(e,l,i,!1)
                } else {
                    let e = new Float32Array(t.buffer,i,a * l);
                    if ("uv" === u)
                        for (let t = 0; t < e.length / o; t++)
                            e[t * o + 1] = 1 - e[t * o + 1];
                    else if ("position" === u)
                        for (let t = 0; t < e.length / o; t++) {
                            let n, r, a;
                            n = e[t * o],
                            r = e[t * o + 1],
                            a = e[t * o + 2],
                            e[t * o] = -n,
                            e[t * o + 1] = a,
                            e[t * o + 2] = r
                        }
                    r = new THREE.BufferAttribute(e,l)
                }
                e.addAttribute(u, r)
            }
            if (5123 === s) {
                let t = new Uint16Array(h.vertexBuffer)
                    , n = new Uint8Array(t.buffer)
                    , i = new Float32Array(a * l);
                if ("position" === u)
                    for (let t = 0; t < n.length / o; t++) {
                        let e, r, a;
                        e = n[t * o],
                        r = n[t * o + 1],
                        a = n[t * o + 2],
                        i[t * o / 2] = -e,
                        i[t * o / 2 + 1] = a,
                        i[t * o / 2 + 2] = r
                    }
                r = new THREE.BufferAttribute(i,l),
                e.addAttribute(u, r)
            }
        }
        r = null
    }
}
function dn(t, e) {
    for (let n = 0; n < t.length; n++)
        if (t[n].index === e)
            return t[n];
    return null
}
THING.factory.registerClass("TileBuildingLayer", TileBuildingLayer);
class fn extends THING.CompassControl {
    constructor(t) {
        super(t),
        this.useElement = void 0 !== t.useElement && t.useElement,
        this.element = t.element,
        this.rotateToNorthSpeed = void 0 === t.rotateToNorthSpeed ? 1 : t.rotateToNorthSpeed
    }
    onAdd(t) {
        this.app = t;
        var e = this;
        this.useElement && this.element ? (t.domElement.append(this.element),
        this.element.onclick = function() {
            ht.a._rotateToNorth(e.rotateToNorthSpeed)
        }
        ) : (this.app.mainUI.scene2D.add(this.sprite),
        t.on("mousedown", function(t) {
            if (0 === t.button) {
                var n = document.body.clientHeight
                    , r = document.body.clientWidth
                    , a = [];
                switch (e.position) {
                case 1:
                    a = [r + e.offset[0] - this.size / 2, -e.offset[1] + this.size / 2];
                    break;
                case 2:
                    a = [e.offset[0] + this.size / 2, n - e.offset[1] - this.size / 2];
                    break;
                case 3:
                    a = [r + e.offset[0] - this.size / 2, n - e.offset[1] - this.size / 2];
                    break;
                case 0:
                    a = [e.offset[0] + this.size / 2, -e.offset[1] + this.size / 2]
                }
                (t.x - a[0]) * (t.x - a[0]) + (t.y - a[1]) * (t.y - a[1]) < 625 && ht.a._rotateToNorth(e.rotateToNorthSpeed)
            }
        }))
    }
    onUpdate() {
        var t = this.app
            , e = t.camera.target;
        if (0 === e[0] || 0 === e[1] || 0 === e[2]) {
            var n = t.camera.camera.getPosition()
                , a = MapUtil.world2Lonlat(n);
            e = MapUtil.lonlat2World(a, 6378e3)
        }
        var i = t3djs.camera.getUp()
            , o = t3djs.math.normalizeVector(e)
            , s = t3djs.math.vectorDotProduct(i, o)
            , l = [o[0] * s, o[1] * s, o[2] * s]
            , u = [i[0] - l[0], i[1] - l[1], i[2] - l[2]]
            , c = t3djs.math.vectorDotProduct([0, 1, 0], o)
            , h = [o[0] * c, o[1] * c, o[2] * c]
            , d = [0 - h[0], 1 - h[1], 0 - h[2]]
            , f = t3djs.math.normalizeVector(u)
            , p = t3djs.math.normalizeVector(d)
            , m = t3djs.math.getAngleBetweenVectors(f, p)
            , g = t3djs.math.vectorCrossProduct(p, o)
            , v = t3djs.math.normalizeVector(g);
        t3djs.math.getAngleBetweenVectors(f, v) < 90 && (m = -m);
        var y = (m = -m) / 180 * Math.PI;
        if (this.useElement && this.element)
            this.element.style.transform = "rotate(" + -y + "rad)";
        else {
            var _ = this.app.mainUI.getRenderPosition(this._uiPosition, [this.size, this.size]);
            this.sprite.position.set(_[0] + this.offset[0], _[1] + this.offset[1], -10),
            this.sprite.material.rotation = y
        }
    }
}
THING.factory.registerClass("EarthCompass", fn),
THING.EarthCompass = fn;
var EarthCompass = fn;
var event = class {
    constructor() {
        this._eventMap = {}
    }
    _falseFunc() {}
    on(t, e, n) {
        Array.isArray(this._eventMap[t]) || (this._eventMap[t] = []),
        this._eventMap[t].push({
            func: e,
            context: n
        })
    }
    once(t, e, n) {
        Array.isArray(this._eventMap[t]) || (this._eventMap[t] = []),
        this._eventMap[t].push({
            func: e,
            context: n,
            once: !0
        })
    }
    off(t, e) {
        var n = this._eventMap[t];
        if (Array.isArray(n))
            if ("function" != typeof e) {
                var r = [];
                for (let t = 0; t < n.length; t++)
                    n[t].func === e && (n[t].func = this._falseFunc,
                    r.push(t));
                r.reverse();
                for (var a = 0; a < r.length; a++)
                    n.splice(r[a], 1)
            } else
                n.length = 0
    }
    fire(t, e) {
        var n = this._eventMap[t];
        if (Array.isArray(n)) {
            var r = [];
            for (let t = 0; t < n.length; t++) {
                var a = n[t].func
                    , i = n[t].context;
                "function" == typeof a && a.apply(i, [e]),
                n[t].once && (n[t].func = this._falseFunc,
                r.push(t))
            }
            r.reverse();
            for (var o = 0; o < r.length; o++)
                n.splice(r[o], 1)
        }
    }
}
;
class PointClusterLayer extends ThingLayer {
    constructor(t) {
        super(t),
        this.app = t,
        this.geometryType = "GeoPoint"
    }
    customSetup(t) {
        super.customSetup(t);
        var e = this.app
            , n = this
            , r = CMAP.getCurrentMap();
        this.dataSource = t.dataSource,
        t.renderer = t.renderer || {},
        !THING.Utils.isNull(t.renderer.showSingle) && THING.Utils.isNull(t.renderer.showNonCluster) ? t.renderer.showNonCluster = t.renderer.showSingle : (t.renderer.showNonCluster = THING.Utils.parseValue(t.renderer.showNonCluster, !0),
        t.renderer.showSingle = t.renderer.showNonCluster),
        t.renderer.fontColor = THING.Utils.parseValue(t.renderer.fontColor, [255, 255, 255]),
        t.renderer.useColor = THING.Utils.parseValue(t.renderer.useColor, !1),
        t.renderer.color = THING.Utils.parseValue(t.renderer.color, [255, 255, 255]),
        t.renderer.fontFamily = THING.Utils.parseValue(t.renderer.fontFamily, "Arial,Microsoft YaHei"),
        this._renderer = t.renderer,
        this._pixelRange = THING.Utils.parseValue(t.pixelRange, 100),
        this._minimumClusterSize = THING.Utils.parseValue(t.minimumClusterSize, 2),
        this._change = t.change,
        this.dataSourceUrl = t.dataSourceUrl;
        var a = function() {
            let t = null;
            return function() {
                var n, a = e.camera, i = new Cesium.Cartesian3(a.position[0],a.position[1],a.position[2]), o = new Cesium.Cartesian3(a.direction[0],a.direction[1],a.direction[2]);
                if (!Cesium.defined(a._changedDirection))
                    return a._changedPosition = Cesium.Cartesian3.clone(i, a._changedPosition),
                    void (a._changedDirection = Cesium.Cartesian3.clone(o, a._changedDirection));
                n = Cesium.Math.acosClamped(Cesium.Cartesian3.dot(o, a._changedDirection)) / r._earthInstance.tileEarth._frameState.fovy;
                var s = Cesium.Cartesian3.distance(i, a._changedPosition) / a.getCameInfo().height;
                (n > .5 || s > .5) && (clearTimeout(t),
                t = setTimeout(()=>{
                    e.trigger("earthCameraChanged")
                }
                , 300),
                a._changedPosition = Cesium.Cartesian3.clone(i, a._changedPosition),
                a._changedDirection = Cesium.Cartesian3.clone(o, a._changedDirection))
            }
        }();
        if (e.on(THING.EventType.CameraChangeEnd, a),
        this.dataSource) {
            var i = new Cesium.EntityCollection;
            for (let t = 0; t < this.dataSource.features.length; t++) {
                let e = CMAP.Util.convertLonlatToWorld(this.dataSource.features[t].geometry.coordinates)
                    , n = new Cesium.Entity({
                    position: new Cesium.Cartesian3(-e[0],e[2],e[1]),
                    properties: this.dataSource.features[t].properties
                });
                i.add(n)
            }
            const t = new Cesium.GeoJsonDataSource;
            this._cesiumDataSource = t,
            t._entityCollection = i,
            this.dataSource._entityCollection = i,
            i._owner = t,
            this._initCluster(t)
        } else {
            Cesium.GeoJsonDataSource.load(this.dataSourceUrl).then(function(t) {
                n._initCluster(t)
            })
        }
    }
    removeAll() {
        for (let t = this.children.length - 1; t >= 0; t--) {
            let e = this.children[t].canvas;
            const n = e.getContext("2d");
            e.width = e.height = 0,
            n.clearRect(0, 0, 0, 0),
            e = null,
            this.children[t].destroy()
        }
    }
    destroy() {
        super.destroy(),
        this.removeAll(),
        this._cesiumDataSource && (this._cesiumDataSource.name = null),
        this._cesiumDataSource = null,
        this.dataSource._entityCollection && (this.dataSource._entityCollection.removeAll(),
        this.dataSource._entityCollection = null)
    }
    _initCluster(t) {
        let e = this;
        var n = THING.App.current
            , r = this._pixelRange
            , a = "pointClusterDataSource" + this.queryID
            , i = this._minimumClusterSize;
        t.name = a;
        var o = t.clustering;
        o.enabled = !0,
        o.pixelRange = r,
        o.minimumClusterSize = i,
        o._dataSource = t,
        o._initialize(n),
        this._parseRenderer(),
        n.on("addCluster", function(r) {
            e.removeAll();
            var i = [];
            let o = n.domElement.getBoundingClientRect().width
                , s = n.domElement.getBoundingClientRect().height;
            if (r.object._dataSource.name === a)
                if (r.object._previousClusters.forEach(function(e) {
                    if (e.nonCluster)
                        e.ids.forEach(function(r) {
                            let a = t._entityCollection._entities._array[r].position._value;
                            a = [-a.x, a.z, a.y];
                            var l = n.camera.worldToScreen(a);
                            l[0] < o && l[0] > 0 && l[1] < s && l[1] > 0 && i.push({
                                ids: e.ids,
                                numPoints: e.numPoints,
                                position: [-e.position.x, e.position.z, e.position.y],
                                nonCluster: e.nonCluster
                            })
                        });
                    else {
                        var r = [-e.position.x, e.position.z, e.position.y]
                            , a = n.camera.worldToScreen(r);
                        a[0] < o && a[0] > 0 && a[1] < s && a[1] > 0 && i.push({
                            ids: e.ids,
                            numPoints: e.numPoints,
                            position: [-e.position.x, e.position.z, e.position.y],
                            nonCluster: e.nonCluster
                        })
                    }
                }),
                e._change && e.on("change", function(t) {
                    e._change.call(e, t)
                }),
                e.trigger("change", {
                    object: e,
                    data: i,
                    type: "PointClusterLayerChanged"
                }),
                e.trigger("changed", {
                    object: e,
                    data: i,
                    type: "PointClusterLayerChanged"
                }),
                e._renderer.renderClusterMarker)
                    e._renderer.renderClusterMarker.call(e, i, e.dataSource);
                else
                    for (let t = 0; t < i.length; t++) {
                        let n = i[t];
                        e._createClusterMarker(e.renderer, n.position, n.numPoints, n.ids, n.nonCluster)
                    }
        }),
        n.trigger("earthCameraChanged")
    }
    _convertColor(t) {
        this.renderer._color = t ? CMAP.Util.colorFormatNewToOld(t) : [1, 1, 1]
    }
    _convertFontColor(t) {
        this.renderer._fontColor = t ? CMAP.Util.colorFormatNewToOld(t) : [1, 1, 1]
    }
    _checkVisible(t) {
        if (this.visible) {
            var e = CMAP.Util.convertWorldToLonlat(t.position);
            t.visible = ht.a.isPositionVisible(this.app, e)
        }
    }
    _createClusterMarker(t, e, n, r, a) {
        var i = this;
        if (1 === r.length && !t.showSingle && !t.showNonCluster)
            return;
        if (a && !t.showNonCluster)
            return;
        let o = t3djs.canvasManager.createCanvas("canvas_" + this.queryID, 128, 128);
        "image" === t.type && (o._image.src = t.url || t.imageUrl,
        o._image.crossOrigin = "Anonymous",
        o._image._canvas = o,
        o._image.onload = function(a) {
            var o = a.target._canvas._canvas;
            o.width = a.target.width,
            o.height = a.target.height;
            var s = o.getContext("2d");
            if (s.drawImage(a.target, 0, 0),
            t.useColor && t._color) {
                let e = s.getImageData(0, 0, o.width, o.height);
                for (let n = 0; n < o.width * o.height; n++)
                    e.data[4 * n] *= t._color[0],
                    e.data[4 * n + 1] *= t._color[1],
                    e.data[4 * n + 2] *= t._color[2];
                s.putImageData(e, 0, 0)
            }
            var l = o.width > o.height ? o.width / 3 : o.height / 3;
            void 0 === t.fontSize && (t.fontSize = l,
            i._parseRenderer()),
            this._canvas.setFont(t.fontFamily, t.fontSize),
            this._canvas.setTextAlignment(1, 1),
            a.target._canvas.drawText(n, t._fontColor, [o.width / 2, o.height / 2]);
            var u = i.app.create({
                type: "Marker",
                position: e,
                canvas: o,
                size: t.size,
                keepSize: !0,
                userData: {
                    numPoints: n,
                    ids: r
                },
                style: {
                    alwaysOnTop: !0
                }
            });
            i.add(u),
            i._checkVisible(u)
        }
        )
    }
    on() {
        arguments.length < 2 && THING.Utils.log("参数不合法");
        [].push(arguments[0]);
        var t = null
            , e = 0;
        for (let n = 0; n < arguments.length; n++)
            "function" == typeof arguments[n] && (t = arguments[n],
            e = n);
        if (t) {
            arguments[e] = function(e) {
                if (e.type && (e.type.toLowerCase().indexOf("click") > -1 || e.type.toLowerCase().indexOf("mouse") > -1)) {
                    let t = e.mouseOnObject || e.mouseOffObject || e.pickedObj || e.pickedObject;
                    e.object = t,
                    e._stopPropagation = !0
                }
                t.call(e.object, e)
            }
        }
        super.on.apply(this, arguments)
    }
    updateRenderer(t) {
        if (t) {
            t = MapUtil._toPrivate(t);
            for (let e in t)
                "_color" !== e && "_fontColor" !== e || (t[e] = CMAP.Util.colorFormatNewToOld(t[e]));
            Object.assign(this._renderer, t)
        }
        this.removeAll(),
        this.app.trigger("earthCameraChanged")
    }
    _parseRenderer() {
        let t = this;
        for (let e in this._renderer)
            e.startsWith("_") || void 0 !== this._renderer["_" + e] || ("color" === e || "fontColor" === e ? this._renderer["_" + e] = CMAP.Util.colorFormatNewToOld(this._renderer[e]) : (this._renderer["_" + e] = this._renderer[e],
            delete this._renderer[e]),
            Object.defineProperty(this._renderer, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return "color" === e || "fontColor" === e ? CMAP.Util.colorFormatOldToNew(t._renderer["_" + e]) : t._renderer["_" + e]
                },
                set: function(n) {
                    t._renderer["_" + e] = "color" === e || "fontColor" === e ? CMAP.Util.colorFormatNewToOld(n) : n,
                    t.updateRenderer()
                }
            }))
    }
    get pixelRange() {
        return this._pixelRange
    }
    get minimumClusterSize() {
        return this._minimumClusterSize
    }
}
THING.factory.registerClass("PointClusterLayer", PointClusterLayer);
var vn = class {
    constructor(t, e) {
        this._object = t,
        this._type = e.type,
        this._opacity = THING.Utils.parseValue(e.opacity, 1),
        e.color = THING.Utils.parseValue(e.color || [255, 255, 255]),
        this._color = CMAP.Util.colorFormatNewToOld(e.color, this._opacity) || [1, 1, 1, 1],
        this._opacity = this._color[3],
        this._imageUrl = e.imageUrl,
        this._lights = void 0 !== e.lights && e.lights,
        this._mosaic = void 0 !== e.mosaic && e.mosaic,
        this._mosaicSize = void 0 !== e.mosaicSize && e.mosaicSize,
        this._grayFilterEnable = void 0 !== e.grayFilterEnable && e.grayFilterEnable,
        this._grayFilterPerBar = e.grayFilterPerBar,
        this._grayFilterColorBar = e.grayFilterColorBar,
        this._valueRange = e.valueRange,
        this._useColor = THING.Utils.parseValue(e.useColor, !0)
    }
    get color() {
        return CMAP.Util.colorFormatOldToNew(this._color)
    }
    set color(t) {
        const e = CMAP.Util.colorFormatNewToOld(t, this._opacity);
        JSON.stringify(e) !== JSON.stringify(this._color) && (Array.isArray(t) && 4 === t.length && (this._opacity = t[3]),
        this._color = e,
        this._useColor && this._object._updateMaterial())
    }
    get useColor() {
        return this._useColor
    }
    set useColor(t) {
        this._useColor = t,
        this._object._updateMaterial()
    }
    get opacity() {
        return this._opacity
    }
    set opacity(t) {
        this._opacity = t,
        this._object._updateMaterial()
    }
    get imageUrl() {
        return this._imageUrl
    }
    set imageUrl(t) {
        this._object.url && (this._object.url = t)
    }
    get type() {
        return this._type
    }
    set type(t) {
        this._type = t
    }
    get lights() {
        return this._lights
    }
    set lights(t) {
        this._lights = t,
        this._object._updateMaterial()
    }
    get mosaic() {
        return this._mosaic
    }
    set mosaic(t) {
        this._mosaic = t,
        this._object._updateMaterial()
    }
    get mosaicSize() {
        return this._mosaicSize
    }
    set mosaicSize(t) {
        this._mosaicSize = t,
        this._object._setMosaicSize(t)
    }
    get grayFilterEnable() {
        return this._grayFilterEnable
    }
    set grayFilterEnable(t) {
        this._grayFilterEnable = t,
        this._object._updateMaterial()
    }
    get grayFilterPerBar() {
        return this._grayFilterPerBar
    }
    set grayFilterPerBar(t) {
        this._grayFilterPerBar = t,
        this._object._updateMaterial()
    }
    get grayFilterColorBar() {
        return this._grayFilterColorBar
    }
    set grayFilterColorBar(t) {
        this._grayFilterColorBar = t,
        this._object._updateMaterial()
    }
    get valueRange() {
        return this._valueRange
    }
    set valueRange(t) {
        this._valueRange = t,
        this._object._updateMaterial()
    }
}
;
class CanvasLayer extends Layer {
    constructor(t) {
        super(t),
        this.app = t
    }
    customSetup(t) {
        super.customSetup(t),
        this._offsetHeight = void 0 === t.offsetHeight ? 0 : t.offsetHeight,
        this.layerSetup(t)
    }
    layerSetup(t) {
        this._extent = t.extent || {
            minX: -180,
            minY: -90,
            maxX: 180,
            maxY: 90
        };
        let e = t.renderer || {};
        this._canvas = t.canvas,
        this._useMercatorUV = void 0 === t.useMercatorUV || t.useMercatorUV,
        this._setRenderer(e),
        this.materialName = "canvasMaterial" + this._queryID;
        var n = this._createGeometry();
        let r = this._createTexture();
        if (r && r.then)
            r.then(()=>{
                let t = this._createMaterial();
                var e = new THREE.Mesh(n,t);
                this.node.add(e)
            }
            );
        else {
            let t = this._createMaterial();
            var a = new THREE.Mesh(n,t);
            this.node.add(a)
        }
    }
    _createGeometry() {
        return M.a.createRectangleGeometry(this.extent, this._useMercatorUV, this.offsetHeight)
    }
    _getMesh() {
        return this.node.children[0]
    }
    _setRenderer(t) {
        this._renderer = new vn(this,t)
    }
    get extent() {
        return this._extent
    }
    set extent(t) {
        this._extent = t
    }
    _createMaterial() {
        var t = t3djs.materialManager.getMaterial(this.materialName);
        return t && t3djs.materialManager.destroyMaterial(this.materialName),
        t = this._createThreeMaterial(this.renderer.mosaic, this.renderer.mosaicSize)
    }
    _createTexture() {
        this._texture && this._texture.dispose(),
        this._canvas && (this._texture = new THREE.CanvasTexture(this._canvas),
        this._texture.needsUpdate = !0)
    }
    destroy() {
        this._texture && this._texture.dispose(),
        t3djs.materialManager.getMaterial(this.materialName) && t3djs.materialManager.destroyMaterial(this.materialName),
        super.destroy()
    }
    _createThreeMaterial(t, e) {
        var n = t3djs.materialManager.createMaterial(this.materialName, "interpolantMaterial").getMaterial()[0];
        return n.uniforms.tDiffuse.value = this._texture,
        t && (n.defines.USE_MOSAIC = !0,
        e && (n.uniforms.texSize.value.set(this._texture.image.width, this._texture.image.height),
        n.uniforms.mosaicSize.value.set(e, e))),
        this.renderer.grayFilterEnable && this.renderer._grayFilterPerBar && this.renderer._grayFilterColorBar && (n.uniforms.tDiffuse.value = this._texture,
        n.uniforms.colorMapping.value = MapUtil._generateInterpolantTextureByGray(this.renderer._grayFilterPerBar, this.renderer._grayFilterColorBar),
        n.uniforms.colorRange.value = new THREE.Vector2(this.renderer._valueRange[0],this.renderer._valueRange[1]),
        n.defines.USE_GrayFilter = !0),
        this.renderer.useColor && (n.uniforms.color.value = new THREE.Color(this.renderer._color[0],this.renderer._color[1],this.renderer._color[2])),
        this.renderer.lights && (n.lights = !0,
        n.defines.USE_LIGHT = !0),
        n.uniforms.opacity.value = void 0 === this.renderer.opacity ? 1 : this.renderer.opacity,
        n.depthWrite = !1,
        n
    }
    updateCanvas() {
        this._createTexture();
        var t = this.node.children[0].material;
        "ShaderMaterial" === t.type ? t.uniforms.tDiffuse.value = this._texture : this.node.children[0].material.map = this._texture
    }
    _updateMaterial() {
        var t = this._createMaterial();
        this._getMesh().material = t
    }
    _setMosaic(t, e) {
        var n = this._createThreeMaterial(t, e);
        this.node.children[0].material = n
    }
    _setMosaicSize(t) {
        var e = this.node.children[0].material;
        "ShaderMaterial" === e.type && e.uniforms.mosaicSize.value.set(t, t)
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        this._offsetHeight = t;
        var e = this._createGeometry();
        this._getMesh().geometry = e
    }
}
THING.factory.registerClass("CanvasLayer", CanvasLayer);
var CanvasLayer = CanvasLayer;
class ImageLayer extends CanvasLayer {
    constructor(t) {
        super(t),
        this.app = t
    }
    customSetup(t) {
        this._url = t.url || t.renderer.imageUrl,
        this._mask = t.mask,
        this.extrudeHeight = THING.Utils.parseValue(t.extrudeHeight, 0),
        super.customSetup(t)
    }
    _createGeometry() {
        return this._mask ? this.createPolygonGeometry(this._mask, this.extent, this._useMercatorUV)[0] : M.a.createRectangleGeometry(this.extent, this._useMercatorUV, this.offsetHeight, this.node, this.extrudeHeight)
    }
    get url() {
        return this._url
    }
    set url(t) {
        this._url = t,
        this.updateCanvas()
    }
    get mask() {
        return this._mask
    }
    set mask(t) {
        this._mask = t;
        var e = this._createGeometry();
        this._getMesh().geometry = e
    }
    _createTexture() {
        return this._texture && this._texture.dispose(),
        this.url ? new Promise((t,e)=>{
            this._texture = Ut.loadTexture(this.url, ()=>{
                this._texture.needsUpdate = !0,
                t(this._texture)
            }
            )
        }
        ) : null
    }
    createPolygonGeometry(t, e, n) {
        var r = M.a._processGeojson(t, "POLYGON");
        return M.a.createPolygonGeometry(r, this.node, this.offsetHeight, 1, e, n, !1).polygonGeometry
    }
}
THING.factory.registerClass("ImageLayer", ImageLayer);
class GridLayer extends ThingLayer {
    constructor(t) {
        super(t),
        this.app = t,
        this.geometryType = "GeoPoint"
    }
    customSetup(t) {
        super.customSetup(t);
        var e = this;
        this._renderer = {},
        this.renderer._opacity = THING.Utils.parseValue(t.renderer.opacity, 1),
        this.renderer._blending = THING.Utils.parseValue(t.renderer.blending, !1),
        t.renderer.colorList = t.renderer.color || t.renderer.colorList,
        this.renderer._colorList = THING.Utils.parseValue(t.renderer.colorList, [[255, 0, 0], [0, 255, 0], [0, 0, 255]]),
        this.dataSource = t.dataSource,
        this._gridSize = t.gridSize,
        this._shapeSize = t.shapeSize,
        this._vectorType = t.vectorType || "box",
        this._extrudeField = t.extrudeField,
        this._extrudeFactor = void 0 === t.extrudeFactor ? 1 : t.extrudeFactor;
        const kdbush = new Cesium.kdbush(this.dataSource.features,t=>t.geometry.coordinates[0],t=>t.geometry.coordinates[1],64);
        let r = CMAP.Util.getFeatureCollectionExtent(this.dataSource);
        var a = [r.minX, r.minY, r.maxX, r.maxY]
            , i = this.gridSize
            , o = CMAP.Util.getSquareGrid(a, i, {
            units: "meters"
        })
            , s = new THREE.Object3D;
        this._infoArray = [],
        this._maxHeight = 0,
        console.time("processing data"),
        o.features.forEach(function(t) {
            const r = kdbush.range(t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1], t.geometry.coordinates[0][2][0], t.geometry.coordinates[0][2][1]);
            t.properties.inPolygonCount = r.length;
            var a = 0;
            if (r.length > 0) {
                e._extrudeField ? r.forEach(function(t) {
                    a += e.dataSource.features[t].properties[e._extrudeField]
                }) : a = r.length,
                a > e._maxHeight && (e._maxHeight = a);
                var i = [(t.geometry.coordinates[0][0][0] + t.geometry.coordinates[0][2][0]) / 2, (t.geometry.coordinates[0][0][1] + t.geometry.coordinates[0][2][1]) / 2]
                    , o = CMAP.Util.convertLonlatToWorld(i)
                    , l = CMAP.Util._getQuaternionFromPosition(i[0], o, 0);
                s.scale.set(e.shapeSize, a * e.extrudeFactor, e.shapeSize),
                s.quaternion.set(l.x, l.y, l.z, l.w),
                s.position.set(o[0], o[1], o[2]),
                s.translateY(a * e.extrudeFactor / 2),
                s.updateMatrix(),
                e._infoArray.push({
                    matrix: s.matrix.clone(),
                    height: a
                })
            }
        }),
        console.timeEnd("processing data");
        var l, u = this._infoArray.length, c = new Float32Array(3 * u);
        "box" === this.vectorType ? l = new THREE.BoxBufferGeometry(1,1,1) : "cylinder" === this.vectorType ? l = new THREE.CylinderBufferGeometry(1,1,1,6) : "cone" === this.vectorType && (l = new THREE.ConeBufferGeometry(1,1,16)),
        this._material = this._createMaterial();
        var h = new THREE.InstancedMesh(l,this._material,u);
        h.frustumCulled = !1;
        for (var d = this.renderer._color || this.renderer._colorList, f = 0; f < this._infoArray.length; f++) {
            h.setMatrixAt(f, this._infoArray[f].matrix);
            let t = this._infoArray[f].height
                , e = d[Math.ceil(d.length * t / this._maxHeight) - 1]
                , n = CMAP.Util.colorFormatNewToOld(e);
            c[3 * f] = n[0],
            c[3 * f + 1] = n[1],
            c[3 * f + 2] = n[2]
        }
        l.setAttribute("instanceColor", new THREE.InstancedBufferAttribute(c,3)),
        this.node.add(h),
        this._parseRenderer()
    }
    _parseRenderer() {
        let t = this;
        for (let e in this._renderer)
            e = e.substr(1),
            Object.defineProperty(this._renderer, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t._renderer["_" + e]
                },
                set: function(n) {
                    "opacity" === e ? t.node.getMaterials()[0].opacity = n : "colorList" === e || "color" === e ? (e = "colorList",
                    t._setColorList(n)) : "blending" === e && (t.node.getMaterials()[0].blending = n ? THREE.AdditiveBlending : THREE.NormalBlending),
                    t._renderer["_" + e] = n
                }
            })
    }
    get gridSize() {
        return this._gridSize
    }
    get vectorType() {
        return this._vectorType
    }
    set vectorType(t) {
        var e = this.node.getMeshes()[0];
        "box" === t ? e.geometry = new THREE.BoxBufferGeometry(1,1,1) : "cylinder" === t ? e.geometry = new THREE.CylinderBufferGeometry(1,1,1,6) : "cone" === t && (e.geometry = new THREE.ConeBufferGeometry(1,1,16));
        var n = this._getColorAttribute(this.renderer.colorList, this._infoArray, this._maxHeight);
        e.geometry.setAttribute("instanceColor", new THREE.InstancedBufferAttribute(n,3)),
        this._vectorType = t
    }
    get shapeSize() {
        return this._shapeSize
    }
    set shapeSize(t) {
        this.node.getMeshes().forEach(function(e) {
            for (var n = 0; n < e.count; n++) {
                var r = new THREE.Object3D
                    , a = new THREE.Matrix4;
                e.getMatrixAt(n, a),
                r.applyMatrix(a),
                r.scale.setX(t),
                r.scale.setZ(t),
                r.updateMatrix(),
                e.setMatrixAt(n, r.matrix.clone())
            }
            e.instanceMatrix.needsUpdate = !0
        }),
        this._shapeSize = t
    }
    _createMaterial() {
        var t = new THREE.MeshLambertMaterial({
            transparent: !0,
            opacity: this.renderer._opacity,
            blending: this.renderer._blending ? THREE.AdditiveBlending : THREE.NormalBlending
        })
            , e = ["attribute vec3 instanceColor;", "varying vec3 vInstanceColor;", "#include <common>"].join("\n")
            , n = ["#include <begin_vertex>", "\tvInstanceColor = instanceColor;"].join("\n")
            , r = ["varying vec3 vInstanceColor;", "#include <common>"].join("\n")
            , a = ["vec4 diffuseColor = vec4( diffuse * vInstanceColor, opacity );"].join("\n");
        return t.onBeforeCompile = function(t) {
            t.vertexShader = t.vertexShader.replace("#include <common>", e).replace("#include <begin_vertex>", n),
            t.fragmentShader = t.fragmentShader.replace("#include <common>", r).replace("vec4 diffuseColor = vec4( diffuse, opacity );", a)
        }
        ,
        t
    }
    _getColorAttribute(t, e, n) {
        for (var r = e.length, a = new Float32Array(3 * r), i = 0; i < e.length; i++) {
            let r = e[i].height
                , o = t[Math.ceil(t.length * r / n) - 1]
                , s = CMAP.Util.colorFormatNewToOld(o);
            a[3 * i] = s[0],
            a[3 * i + 1] = s[1],
            a[3 * i + 2] = s[2]
        }
        return a
    }
    _setColorList(t) {
        var e = this._getColorAttribute(t, this._infoArray, this._maxHeight);
        this.node.children[0].geometry.setAttribute("instanceColor", new THREE.InstancedBufferAttribute(e,3))
    }
    get extrudeFactor() {
        return this._extrudeFactor
    }
    set extrudeFactor(t) {
        0 === t && (THING.Utils.warn("拔高倍数不允许设置为0"),
        t = .001);
        for (var e = this.node.children[0], n = 0; n < e.count; n++) {
            var r = new THREE.Object3D
                , a = new THREE.Matrix4;
            e.getMatrixAt(n, a),
            r.applyMatrix4(a);
            let i = r.scale.y
                , o = r.scale.y / this.extrudeFactor * t;
            r.scale.set(this.shapeSize, o, this.shapeSize),
            r.translateY((o - i) / 2),
            r.updateMatrix(),
            e.setMatrixAt(n, r.matrix.clone())
        }
        e.instanceMatrix.needsUpdate = !0,
        this._extrudeFactor = t
    }
}
THING.factory.registerClass("GridLayer", GridLayer);
class wn extends CanvasLayer {
    constructor(t) {
        super(t),
        this.app = t,
        this.geometryType = "GeoPoint",
        this._visible = !0
    }
    layerSetup(t) {
        var e = this;
        this._extent = this._paramExtent = t.extent,
        this._needsUpdate = void 0 === t.needsUpdate || t.needsUpdate,
        this._extent && (this._needsUpdate = !1),
        this._valueField = t.valueField,
        this._setRenderer(t.renderer || {}),
        this._minValue = t.renderer.minValue,
        this._maxValue = t.renderer.maxValue,
        this._heatMapDataList = [],
        this.dataSource = t.dataSource,
        this._useMercatorUV = !0,
        this.materialName = "heatmapMaterial" + this._queryID,
        this._canvas = this.draw(),
        this._canvas && this._createMesh();
        var n = this._drawHandler.call(e);
        this.app.on(THING.EventType.CameraChange, function() {
            e.visible && e._needsUpdate && n()
        }, "heatmapLayer" + this._queryID)
    }
    _drawHandler() {
        var t, e = this, n = function() {
            e._redraw.call(e)
        };
        return function() {
            t && clearTimeout(t),
            t = setTimeout(n, 300)
        }
    }
    _createMesh() {
        var t = this._createGeometry();
        this._createTexture();
        var e = this._createMaterial()
            , n = new THREE.Mesh(t,e);
        n.renderOrder = this._renderOrder,
        this.node.add(n)
    }
    _setRenderer(t) {
        this._renderer = new Ae(this,t)
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        super.visible = t,
        this._visible = t,
        this._layer.visible = t
    }
    destroy() {
        this._heatMap && this._layer.name === "heatmap_mesh" + this.id && this._heatMap.destroy(),
        this.app.off("camerachangeend", null, "heatmapLayer" + this._queryID),
        super.destroy()
    }
    get renderOrder() {
        return this._renderOrder
    }
    set renderOrder(t) {
        this.node && this.node.getMeshes().forEach(e=>{
            e.renderOrder = t
        }
        ),
        this._renderOrder = t
    }
    getMeshExtent() {
        if (this._paramExtent)
            return {
                west: this._paramExtent.minX,
                east: this._paramExtent.maxX,
                south: this._paramExtent.minY,
                north: this._paramExtent.maxY
            };
        var t = this.app.uEarth.getCurrentExtent()
            , e = {
            west: t.minX,
            east: t.maxX,
            south: t.minY,
            north: t.maxY
        };
        if (this._dataExtent) {
            if (e.east < this._dataExtent.minX || e.west > this._dataExtent.maxX || e.south > this._dataExtent.maxY || e.north < this._dataExtent.minY)
                return;
            var n = this._dataExtent.maxX - this._dataExtent.minX
                , r = this._dataExtent.maxY - this._dataExtent.minY;
            e.east > this._dataExtent.maxX + 1 * n && (e.east = this._dataExtent.maxX + 1 * n),
            e.west < this._dataExtent.minX - 1 * n && (e.west = this._dataExtent.minX - 1 * n),
            e.north > this._dataExtent.maxY + 1 * r && (e.north = this._dataExtent.maxY + 1 * r),
            e.south < this._dataExtent.minY - 1 * r && (e.south = this._dataExtent.minY - 1 * r)
        }
        return e
    }
    _redraw() {
        if (this._canvas = this.draw(),
        this._canvas)
            if (0 === this.node.children.length)
                this._createMesh();
            else {
                var t = this._createGeometry();
                this.node.children[0].geometry = t,
                this.updateCanvas()
            }
    }
    draw() {
        var t = this.getMeshExtent();
        if (!t)
            return this._getCanvas();
        var e = {};
        e.radius = this.renderer.radius,
        e.gradient = this.renderer.gradient;
        var n = {};
        for (var r in e.gradient) {
            var a = r;
            r - 0 > .3 && (a = .7 + .3 * r),
            n[a] = e.gradient[r]
        }
        return e.gradient = n,
        e.opacity = this.renderer.opacity,
        e.maxOpacity = this.renderer.maxOpacity,
        e.minOpacity = this.renderer.minOpacity,
        this._heatMap ? (this._heatMap.setBounds(t),
        this._heatMap.setDimensions()) : this._heatMap = CesiumHeatmap.create(this.id, t, e),
        this._needsUpdate && (t = this._heatMap.bounds),
        this._extent = {
            minX: t.west,
            maxX: t.east,
            minY: t.south,
            maxY: t.north
        },
        this._heatMap.setWGS84Data(this.renderer.minValue, this.renderer.maxValue, this._heatMapDataList, !1),
        this._getCanvas()
    }
    setMinMaxOpacity(t, e) {
        this._heatMap && (this._heatMap.setMinMaxOpacity(t, e),
        this.updateCanvas())
    }
    setGradient(t) {
        if (this._heatMap) {
            var e = {};
            for (var n in t) {
                var r = n;
                n - 0 > .3 && (r = .7 + .3 * n),
                e[r] = t[n]
            }
            this._heatMap.setGradient(e),
            this.updateCanvas()
        }
    }
    setRadius(t) {
        this._heatMap && (this._heatMap.setRadius(t),
        this.updateCanvas())
    }
    setDataSource(t) {
        for (var e = [], n = 1 / 0, r = -1 / 0, a = 0; a < t.features.length; a++) {
            var i = t.features[a]
                , o = this._valueField ? i.properties[this._valueField] : 1;
            void 0 === o && (o = 1),
            o > r && (r = o),
            o < n && (n = o),
            e.push({
                x: i.geometry.coordinates[0],
                y: i.geometry.coordinates[1],
                value: o
            })
        }
        return {
            heatMapDataSource: e,
            maxValue: r,
            minValue: n
        }
    }
    get dataSource() {
        return this._dataSource
    }
    set dataSource(t) {
        var e = this.setDataSource(t);
        this._heatMapDataList = e.heatMapDataSource,
        void 0 === this._minValue && (this.renderer.minValue = e.minValue),
        void 0 === this._maxValue && (this.renderer.maxValue = e.maxValue),
        this._dataExtent = CMAP.Util.getFeatureCollectionExtent(t),
        this._heatMap && this._redraw(),
        this._dataSource = t
    }
    set valueField(t) {
        this._valueField = t,
        this.dataSource = this._dataSource
    }
    get valueField() {
        return this._valueField
    }
    get needsUpdate() {
        return this._needsUpdate
    }
    set needsUpdate(t) {
        this._needsUpdate = t,
        t && this._redraw()
    }
    get offsetHeight() {
        return this._offsetHeight
    }
    set offsetHeight(t) {
        this._offsetHeight = t,
        this._redraw()
    }
    _getCanvas() {
        if (this._heatMap)
            return this._heatMap._container.children[0]
    }
}
THING.factory.registerClass("HeatMapLayer", wn);
class TrafficLayer extends Layer {
    constructor(t) {
        super(t),
        this.app = t,
        this._visible = !0
    }
    customSetup(t) {
        window.BMapEarth = window.BMapEarth || {},
        this.tileSize = 256,
        this.sourceCrs = t.sourceCrs || "bd09",
        this.targetCrs = t.targetCrs || "gcj02",
        this.ratio = window.devicePixelRatio,
        this._needsUpdate = void 0 === t.needsUpdate || t.needsUpdate,
        this._offsetHeight = void 0 === t.offsetHeight ? 0 : t.offsetHeight,
        this.zoomUnits = 0,
        this.levelUnits = 0,
        this.cache = {},
        this.url = t.url || "https://sp3.baidu.com/7_AZsjOpB1gCo2Kml5_Y_DAcsMJiwa/traffic/?qt=vtraffic",
        this._renderer = {
            lineType: "Line",
            width: 1,
            color: ["rgba(0,192,73,0.99609375)", "rgba(242,48,48,0.99609375)", "rgba(255,159,25,0.99609375)", "rgba(181,0,0,1)"]
        },
        Object.assign(this.renderer, t.renderer);
        var e = this.renderer.color;
        this.arrFeatureStyles = [[2, e[0] || "rgba(79,210,125,1)", 2, 2, 0, [], 0, 0], [2, e[0] || "rgba(79,210,125,1)", 3, 2, 0, [], 0, 0], [2, e[0] || "rgba(79,210,125,1)", 3, 2, 0, [], 0, 0], [2, e[0] || "rgba(79,210,125,1)", 5, 2, 0, [], 0, 0], [2, e[0] || "rgba(79,210,125,1)", 6, 2, 0, [], 0, 0], [2, e[2] || "rgba(255,208,69,1)", 2, 2, 0, [], 0, 0], [2, e[2] || "rgba(255,208,69,1)", 3, 2, 0, [], 0, 0], [2, e[2] || "rgba(255,208,69,1)", 3, 2, 0, [], 0, 0], [2, e[2] || "rgba(255,208,69,1)", 5, 2, 0, [], 0, 0], [2, e[2] || "rgba(255,208,69,1)", 6, 2, 0, [], 0, 0], [2, e[1] || "rgba(232,14,14,1)", 2, 2, 0, [], 0, 0], [2, e[1] || "rgba(232,14,14,1)", 3, 2, 0, [], 0, 0], [2, e[1] || "rgba(232,14,14,1)", 3, 2, 0, [], 0, 0], [2, e[1] || "rgba(232,14,14,1)", 5, 2, 0, [], 0, 0], [2, e[1] || "rgba(232,14,14,1)", 6, 2, 0, [], 0, 0], [2, e[3] || "rgba(181,0,0,1)", 2, 2, 0, [], 0, 0], [2, e[3] || "rgba(181,0,0,1)", 3, 2, 0, [], 0, 0], [2, e[3] || "rgba(181,0,0,1)", 3, 2, 0, [], 0, 0], [2, e[3] || "rgba(181,0,0,1)", 5, 2, 0, [], 0, 0], [2, e[3] || "rgba(181,0,0,1)", 6, 2, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 4, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 5.5, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 7, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 8.5, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 10, 0, 0, [], 0, 0]];
        var n = this;
        this.app.on("camerachangeend", function() {
            n.visible && n._needsUpdate && (n.node.children = [],
            n.update.call(n))
        }, !1),
        this._selectedTiles = {},
        this.app.addControl(this, !1)
    }
    get renderer() {
        return this._renderer
    }
    getExtent() {
        if (this._paramExtent)
            return {
                west: this._paramExtent.minX,
                east: this._paramExtent.maxX,
                south: this._paramExtent.minY,
                north: this._paramExtent.maxY
            };
        var t = this.app.uEarth.getCurrentExtent();
        return {
            west: t.minX,
            east: t.maxX,
            south: t.minY,
            north: t.maxY
        }
    }
    set offsetHeight(t) {
        this._offsetHeight = t,
        this.node.children = [],
        this.update()
    }
    getZoom() {
        var t = this.heightToZoom(THING.App.current.camera.getCameInfo().height);
        return (t += 1) > 19 && (t = 19),
        t
    }
    heightToZoom(t) {
        var e = -40467.74;
        return Math.round(e + 80955.31 / (1 + Math.pow(t / 91610.74, 7096758e-11)))
    }
    getMCCenter(t) {
        var e = MercatorProjection.convertLL2MC({
            lng: t[0],
            lat: t[1]
        });
        return [e.lng, e.lat]
    }
    getMCBounds(t) {
        var e = this.getExtent();
        if ("bd09" === this.sourceCrs)
            e.sw = MercatorProjection.convertLL2MC({
                lng: e.west,
                lat: e.south
            }),
            e.ne = MercatorProjection.convertLL2MC({
                lng: e.east,
                lat: e.north
            });
        else if ("WGS84" === this.sourceCrs) {
            let t = CMAP.Util.convertLonlatToWebMercator([e.west, e.south])
                , n = CMAP.Util.convertLonlatToWebMercator([e.east, e.north]);
            e.sw = {
                lng: t[0],
                lat: t[1]
            },
            e.ne = {
                lng: n[0],
                lat: n[1]
            }
        }
        return e
    }
    request(t, e) {
        this._selectedTiles[t] = {
            callback: e,
            state: 0
        }
    }
    onUpdate() {
        for (let e in this._selectedTiles) {
            let n = this._selectedTiles[e]
                , r = n.callback;
            if (!n.resource) {
                var t = Cesium.Resource.createIfNeeded(e);
                t.request.throttle = !0,
                t.request.throttleByServer = !0,
                n.resource = t
            }
            if (0 === n.resource.request.state) {
                let t = n.resource.fetchJson();
                if (!Cesium.defined(t))
                    return;
                t.then(function(t) {
                    r(t)
                })
            } else
                3 === n.resource.request.state ? delete this._selectedTiles[e] : 4 === n.resource.request.state && (n.resource = void 0)
        }
    }
    update() {
        var t, e = this.getZoom();
        "wgs84" === this.sourceCrs.toLowerCase() && (e -= 2);
        var n, r, a, i, o = document.body.clientWidth, s = document.body.clientHeight, l = CMAP.Util.convertWindowToWorld([o / 2, s / 2]), u = CMAP.Util.convertWorldToLonlat(l);
        if ("bd09" === this.sourceCrs) {
            t = this.getMCCenter(u),
            this.zoomUnits = Math.pow(2, 18 - e),
            this.levelUnits = 256 * this.zoomUnits;
            var c = Math.ceil(t[0] / this.levelUnits)
                , h = Math.ceil(t[1] / this.levelUnits)
                , d = [c, h, (t[0] - c * this.levelUnits) / this.levelUnits * 256, (t[1] - h * this.levelUnits) / this.levelUnits * 256];
            n = d[0] - Math.ceil((o / 2 - d[2]) / 256),
            r = d[1] - Math.ceil((s / 2 - d[3]) / 256),
            a = d[0] + Math.ceil((o / 2 + d[2]) / 256),
            i = d[1] + Math.ceil((s / 2 + d[3]) / 256)
        } else
            "WGS84" === this.sourceCrs && (t = CMAP.Util.convertLonlatToWebMercator(u),
            this.zoomUnits = 2 * Math.PI * 6378137 / 256 / Math.pow(2, e),
            this.levelUnits = 256 * this.zoomUnits,
            c = Math.ceil(Math.round((t[0] + 20037508.34) / this.levelUnits)),
            h = Math.ceil(Math.round((20037508.34 - t[1]) / this.levelUnits)),
            n = c - Math.ceil(o / 2 / this.tileSize),
            a = c + Math.ceil(o / 2 / this.tileSize),
            r = h - Math.ceil(s / 2 / this.tileSize),
            i = h + Math.ceil(s / 2 / this.tileSize));
        var f = this.getMCBounds(this.viewer);
        if (0 !== f.ne.lng || 0 !== f.ne.lat || 0 !== f.sw.lng || 0 !== f.sw.lat) {
            if ("WGS84" === this.sourceCrs) {
                var p = this.coords2xy([f.sw.lng, f.sw.lat])
                    , m = this.coords2xy([f.ne.lng, f.ne.lat]);
                n = p[0],
                a = m[0],
                r = m[1] - 1,
                i = p[1] + 1
            } else
                "bd09" === this.sourceCrs && (n = Math.floor(f.sw.lng / this.levelUnits),
                r = Math.floor(f.sw.lat / this.levelUnits),
                a = Math.ceil(f.ne.lng / this.levelUnits),
                i = Math.ceil(f.ne.lat / this.levelUnits));
            for (var g = [], v = n; v < a; v++)
                for (var y = r; y < i; y++)
                    g.push([v, y, e]);
            this.tilesOrder = g,
            this._loadCount = {};
            for (let t = 0; t < g.length; t++) {
                let e = g[t][0]
                    , n = g[t][1]
                    , r = g[t][2];
                this._loadCount[e + "_" + n + "_" + r] = !1
            }
            for (let t = 0; t < g.length; t++) {
                let n = g[t][0]
                    , r = g[t][1];
                this.showTile(n, r, e)
            }
        } else
            setTimeout(()=>{
                this.update()
            }
            , 2e3)
    }
    coords2xy(t) {
        return [Math.ceil(Math.round((t[0] + 20037508.34) / this.levelUnits)), Math.ceil(Math.round((20037508.34 - t[1]) / this.levelUnits))]
    }
    getCacheKey(t, e, n) {
        return t + "_" + e + "_" + n
    }
    getTileUrl(t, e, n, r) {
        return this.url + "&x=" + t + "&y=" + e + "&z=" + n
    }
    isAllLoaded() {
        var t = !0;
        for (var e in this._loadCount)
            if (!this._loadCount[e]) {
                t = !1;
                break
            }
        return t
    }
    drawCurrentData() {
        for (var t = [], e = 0; e < this.tilesOrder.length; e++) {
            var n = this.tilesOrder[e][0]
                , r = this.tilesOrder[e][1]
                , a = this.tilesOrder[e][2]
                , i = this.cache[this.getCacheKey(n, r, a)];
            if (i)
                for (var o = this._drawFeatures(i, n, r, a), s = 0; s < o.length; s++)
                    t.push(o[s])
        }
        this.addInstance(t)
    }
    showTile(t, e, n) {
        var r = this
            , a = (r.map,
        this.getCacheKey(t, e, n))
            , i = "_cbk" + (1e5 * Math.random()).toFixed(0)
            , o = this.getTileUrl(t, e, n, "BMapEarth." + i);
        function s(o) {
            if (void 0 !== r._loadCount[t + "_" + e + "_" + n]) {
                o && "string" == typeof o && (o = JSON.parse(o)),
                r._loadCount[t + "_" + e + "_" + n] = !0;
                r.map;
                var s = o.content && o.content.tf;
                o.data && (s = o.data),
                r.cache[a] = s ? {
                    traffic: s,
                    precision: o.precision
                } : {
                    traffic: [],
                    precision: 0
                },
                r.drawTogether ? r.isAllLoaded() && r.drawCurrentData() : r._drawFeatures(r.cache[a], t, e, n),
                delete window.BMapEarth[i]
            }
        }
        window.BMapEarth[i] = s,
        void 0 !== r.cache[a] ? (r._loadCount[t + "_" + e + "_" + n] = !0,
        r.drawTogether ? r.isAllLoaded() && r.drawCurrentData() : r._drawFeatures(r.cache[a], t, e, n)) : this.request(o, s)
    }
    num2deg(t, e, n) {
        var r = t / Math.pow(2, n) * 360 - 180
            , a = Math.PI - 2 * Math.PI * e / Math.pow(2, n);
        return [r, 180 / Math.PI * Math.atan(.5 * (Math.exp(a) - Math.exp(-a)))]
    }
    _drawFeatures(t, e, n, r) {
        let a = this;
        this.getRGBA,
        this.getLineCap,
        this.getLineJoin;
        var i = 10
            , o = (this.map,
        this.tileSize)
            , s = [0, 0];
        "bd09" === this.sourceCrs ? s = [e * o * this.zoomUnits, (n + 1) * o * this.zoomUnits] : "WGS84" === this.sourceCrs && (s = [e * o * this.zoomUnits - 6378137 * Math.PI, 6378137 * Math.PI - n * o * this.zoomUnits]);
        var l = null
            , u = new THREE.Group;
        if (t && t.traffic) {
            i *= THING.Utils.parseValue(t.precision, 1);
            for (var c = t.traffic, h = {}, d = 0, f = c.length; d < f; d++) {
                var p, m = c[d], g = m[1], v = this.arrFeatureStyles[m[3]], y = (this.arrFeatureStyles[m[4]],
                g[0] / i), _ = -g[1] / i, x = [];
                if ("bd09" === this.sourceCrs) {
                    let t = s[0] + y * this.zoomUnits
                        , e = s[1] + _ * this.zoomUnits
                        , n = MercatorProjection.convertMC2LL({
                        lng: t,
                        lat: e
                    });
                    t = n.lng,
                    e = n.lat,
                    p = CMAP.Util.convertbd09ToGcj02([parseFloat(t), parseFloat(e)]),
                    this.targetCrs && "wgs84" === this.targetCrs.toLowerCase() && (p = CMAP.Util.convertGcj02ToWgs84(p))
                } else if ("WGS84" === this.sourceCrs) {
                    let t = s[0] + y * this.zoomUnits
                        , e = s[1] + _ * this.zoomUnits;
                    p = CMAP.Util.convertWebMercatorToLonlat([t, e]),
                    this.targetCrs && "gcj02" === this.targetCrs.toLowerCase() && (p = CMAP.Util.convertWgs84ToGcj02(p))
                }
                if (l || (l = CMAP.Util.convertLonlatToWorld(p),
                u.setPosition(l),
                M.a._setNodeAnglesByPosition(u, l)),
                x.push(p),
                "bd09" === this.sourceCrs)
                    for (let t = 2, e = g.length; t < e; t += 2) {
                        y += g[t] / i,
                        _ -= g[t + 1] / i;
                        var b = s[0] + y * this.zoomUnits
                            , w = s[1] + _ * this.zoomUnits
                            , C = MercatorProjection.convertMC2LL({
                            lng: b,
                            lat: w
                        });
                        b = C.lng,
                        w = C.lat;
                        let e = CMAP.Util.convertbd09ToGcj02([parseFloat(b), parseFloat(w)]);
                        this.targetCrs && "wgs84" === this.targetCrs.toLowerCase() && (e = CMAP.Util.convertGcj02ToWgs84(e)),
                        x.push(e)
                    }
                else if ("WGS84" === this.sourceCrs)
                    for (let t = 2, e = g.length; t < e; t += 2) {
                        y += g[t] / i,
                        _ -= g[t + 1] / i;
                        let e = s[0] + y * this.zoomUnits;
                        var E = s[1] + _ * this.zoomUnits;
                        let n = CMAP.Util.convertWebMercatorToLonlat([e, E]);
                        this.targetCrs && "gcj02" === this.targetCrs.toLowerCase() && (n = CMAP.Util.convertWgs84ToGcj02(n)),
                        x.push(n)
                    }
                var T = v[1];
                (T = (T = T.substring(5, T.length - 1)).split(","))[3] = parseFloat(T[3]),
                h[T = "0,192,73,0.99609375"] || (h[T] = []),
                h[T].push(x)
            }
            for (var A in h) {
                var P = []
                    , S = h[A]
                    , R = A.split(",");
                for (let t = 0; t < S.length; t++) {
                    var D = S[t]
                        , j = new Array(D.length);
                    for (let t = 0; t < j.length; t++)
                        j[t] = a._offsetHeight;
                    var L = M.a.createLine(D, j, l, this.renderer.lineType, this.renderer.width, this.renderer.textureSize);
                    for (let t = 0; t < L.geometryArray.length; t++)
                        P.push(L.geometryArray[t])
                }
                if (P.length > 0) {
                    var I = t3djs.util.mergeBufferGeometry(P, 5e4)
                        , O = {
                        type: "vector",
                        color: R,
                        lineType: this.renderer.lineType,
                        width: this.renderer.width
                    }
                        , k = Ut.createLineMaterial(O);
                    for (let t = 0; t < I.length; t++) {
                        var H = M.a.createLineMesh(I[t], k, O);
                        u.add(H)
                    }
                    this.node.add(u)
                }
            }
        }
    }
    get needsUpdate() {
        return this._needsUpdate
    }
    set needsUpdate(t) {
        this._needsUpdate = t,
        t && this.update()
    }
}
THING.factory.registerClass("TrafficLayer", TrafficLayer);
const En = new THREE.Vector3
    , Tn = new THREE.Vector3
    , Mn = new THREE.Matrix3;
var VertexNormalsHelper = class extends THREE.LineSegments {
    constructor(t, e=1, n=16711680) {
        let r = 0;
        const a = t.geometry;
        if (a && a.isGeometry)
            return void console.error("THREE.VertexNormalsHelper no longer supports Geometry. Use BufferGeometry instead.");
        a && a.isBufferGeometry && (r = a.attributes.normal.count);
        const i = new THREE.BufferGeometry
            , o = new THREE.Float32BufferAttribute(2 * r * 3,3);
        i.setAttribute("position", o),
        super(i, new THREE.LineBasicMaterial({
            color: n,
            toneMapped: !1
        })),
        this.object = t,
        this.size = e,
        this.type = "VertexNormalsHelper",
        this.matrixAutoUpdate = !1,
        this.update()
    }
    update() {
        this.object.updateMatrixWorld(!0),
        Mn.getNormalMatrix(this.object.matrixWorld);
        const t = this.object.matrixWorld
            , e = this.geometry.attributes.position
            , n = this.object.geometry;
        if (n && n.isGeometry)
            console.error("THREE.VertexNormalsHelper no longer supports Geometry. Use BufferGeometry instead.");
        else {
            if (n && n.isBufferGeometry) {
                const r = n.attributes.position
                    , a = n.attributes.normal;
                let i = 0;
                for (let n = 0, o = r.count; n < o; n++)
                    En.set(r.getX(n), r.getY(n), r.getZ(n)).applyMatrix4(t),
                    Tn.set(a.getX(n), a.getY(n), a.getZ(n)),
                    Tn.applyMatrix3(Mn).normalize().multiplyScalar(this.size).add(En),
                    e.setXYZ(i, En.x, En.y, En.z),
                    i += 1,
                    e.setXYZ(i, Tn.x, Tn.y, Tn.z),
                    i += 1
            }
            e.needsUpdate = !0
        }
    }
}
;
class Pn {
    constructor() {
        this._app = THING.App.current
    }
    onLoad(t, e, n, r) {
        const a = t.info.main;
        if (t.name = t.info.name,
        a) {
            const r = t.url.appendPath(a)
                , i = this._app.create({
                type: "Map",
                url: r,
                resourceConfig: e,
                complete: ()=>{
                    t.root = i,
                    n(i)
                }
            })
        } else
            n()
    }
}
class Sn {
    constructor() {
        this._app = THING.App.current
    }
    onLoad(t, e, n, r) {
        const a = t.info.main;
        if (t.name = t.info.name,
        a) {
            const r = t.url.appendPath(a);
            e.complete = (()=>{
                t.root = i,
                n(i)
            }
            );
            const i = CMAP.Util.applyTemplate(r, e)
        } else
            n()
    }
}
class Minimap {
    constructor(t) {
        this.parseParam(t),
        this._enable = !0,
        this._object = t.object,
        t.object && t.object.isBaseObject ? (this.scene = new THREE.Scene,
        this.camera = null,
        this.sprite = null,
        this.raycaster = new THREE.Raycaster,
        this.mouse = new THREE.Vector2,
        this.ratio = 2,
        this.mainAspect = 1,
        this.miniDom = null,
        this.renderTarget = null,
        this.inited = !1,
        this.create()) : THING.Utils.error("The object parameter is needed when using miniMap on earth")
    }
    parseParam(t) {
        if (this.app = t.app,
        this._opacity = THING.Utils.parseValue(t.opacity, .7),
        Array.isArray(t.position) ? this._position = t.position : this._posIndex = t.position || t.posIndex || 0,
        this.bIcon = THING.Utils.parseValue(t.bIcon, !0),
        this.width = THING.Utils.parseValue(t.width, 150),
        this.height = THING.Utils.parseValue(t.height, this.width),
        this._scale = THING.Utils.parseValue(t.scale, 1),
        this.closeBtnImg = t.closeBtnImg || "http://www.thingjs.com/static/images/minimap2.png",
        this.cameraViewImg = t.cameraViewImg || "http://www.thingjs.com/static/images/minimap1.png",
        this.center = {},
        t.sceneCenter ? (this.center.x = t.sceneCenter[0],
        this.center.y = t.sceneCenter[1]) : t.center ? (this.center.x = t.center[0],
        this.center.y = t.center[1]) : (this.center.x = 0,
        this.center.y = 0),
        this.angle = THING.Utils.parseValue(t.angle, 0),
        this.angle += 180,
        this.markerPivot = THING.Utils.parseValue(t.cameraViewPivot, [.5, .5]),
        this.markerSize = THING.Utils.parseValue(t.cameraViewSize, 1),
        this.canMoushWheel = t.mousewheel,
        this.ground = t.ground,
        this.hasClose = t.hasClose,
        !this.ground)
            for (var e = 0; e < this.app.root.campuses.length; e++) {
                var n = this.app.root.campuses[e].ground;
                if (n) {
                    this.ground = n.node.children;
                    break
                }
            }
        this.bTranslate = t.bTranslate || !1
    }
    set scale(t) {
        this._scale = t,
        this.destroy(),
        this.inited = !1,
        this.create()
    }
    get scale() {
        return this._scale
    }
    set opacity(t) {
        this._opacity = t,
        this.sprite.material.opacity = this._opacity
    }
    get opacity() {
        return this._opacity
    }
    set posIndex(t) {
        this._posIndex = t,
        this.setMiniRect()
    }
    get posIndex() {
        return this._posIndex
    }
    set enable(t) {
        this._enable = t
    }
    get enable() {
        return this._enable
    }
    init2d() {
        if (this.miniDom = this.app.domElement.appendChild(document.createElement("div")),
        this.miniDom.className = "minimap",
        this.miniDom.style.position = "absolute",
        this.miniDom.style.cssText = "position: absolute;width:" + this.width + ";height:" + this.height + ";border: 5px solid rgba(255, 255, 255, 0.8);border-radius: 3px;display: block;box-sizing: border-box;overflow:hidden",
        this.miniDom.style.zIndex = 1e3,
        this.hasClose) {
            var t = this.miniDom.appendChild(document.createElement("img"));
            t.className = "minimap_closeBtn",
            t.style.position = "absolute",
            t.style.width = this.width / 5,
            t.style.right = "1px",
            t.style.top = "1px",
            t.src = this.closeBtnImg;
            var e = this;
            t.addEventListener("click", function() {
                e.enable = !1
            })
        }
        this.miniDom.onmousedown = function(t) {
            var e = t || event;
            e.cancelBubble = !0,
            e.stopPropagation()
        }
        ,
        this.miniDom.onmousemove = function(t) {
            var e = t || event;
            e.cancelBubble = !0,
            e.stopPropagation()
        }
        ,
        this.miniDom.onmousewheel = function(t) {
            var e = t || event;
            e.cancelBubble = !0,
            e.stopPropagation()
        }
    }
    init3d() {
        this.init2d();
        var t = this._object.orientedBoundingBox;
        const e = t.size[0]
            , n = t.size[2];
        var r = e > n ? e : n;
        r *= 1 / this.scale,
        this.mainDom = this.app.domElement,
        this.mainAspect = this.mainDom.clientWidth / this.mainDom.clientHeight,
        this.camera = new THREE.OrthographicCamera(-r,r,r / this.mainAspect,-r / this.mainAspect,-1e3,1e3),
        this.camera.position.set(this.center.x, 100, this.center.y),
        this.camera.up = new THREE.Vector3(0,0,-1),
        this.camera.lookAt(new THREE.Vector3(this.center.x,-1,this.center.y)),
        this.earthCamera = new THREE.PerspectiveCamera(this.app.camera.fov,this.width / this.height,this.app.camera.near,this.app.camera.far),
        this.ratio = this.mainDom.clientWidth / r;
        var a = r
            , i = 8 * a < 256 ? 8 * a : 256
            , o = 8 * (r * this.mainAspect) < 256 * this.mainAspect ? 8 * a : 256 * this.mainAspect;
        this.renderTarget = new THREE.WebGLRenderTarget(i,o,{
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            generateMipmaps: !1,
            format: THREE.RGBAFormat
        });
        var s = new THREE.SpriteMaterial({
            map: this.renderTarget.texture,
            transparent: !0,
            opacity: this._opacity
        })
            , l = new THREE.SpriteMaterial({
            map: (new THREE.TextureLoader).load(this.cameraViewImg),
            transparent: !0,
            opacity: this._opacity
        });
        this.sprite = new THREE.Sprite(s),
        this._marker = new THREE.Sprite(l),
        this._marker.renderOrder = 1,
        this._marker.center.set(this.markerPivot[0], 1 - this.markerPivot[1]),
        this.setMiniRect(),
        this._object ? (this.drawObject(),
        this.camera.add(this._marker)) : this.app.scene.add(this._marker),
        this.app.on("mainDomSizeChanged", ()=>{
            this.destroy(),
            this.inited = !1,
            this.create()
        }
        ),
        this.inited = !0
    }
    create() {
        this.inited || (this.init3d(),
        this.scene.add(this.camera),
        this.camera.add(this.sprite))
    }
    setPosition(t, e) {
        this.miniDom.style.top = t + "px",
        this.miniDom.style.left = e + "px";
        let n = this.camera.left
            , r = this.camera.bottom;
        const a = e / (.5 * this.ratio)
            , i = t / (.5 * this.ratio) * this.height / this.width;
        let o = this.sprite
            , s = n + o.scale.x / 2 + a
            , l = r + o.scale.y / 2 + i;
        o.position.set(s, -l, 0)
    }
    setMiniRect() {
        this.miniDom.style.width = this.width + "px",
        this.miniDom.style.height = this.height + "px";
        var t = this;
        function e(e, n, r, a) {
            t.miniDom.style.top = e,
            t.miniDom.style.left = n,
            t.miniDom.style.bottom = r,
            t.miniDom.style.right = a
        }
        var n, r, a = this.width / (.5 * this.ratio), i = a * this.height / this.width;
        this.sprite.scale.set(a, i, 1);
        var o = this.camera.right
            , s = this.camera.left
            , l = this.camera.bottom
            , u = this.camera.top;
        if (this._position) {
            const t = this._position[0] / (.5 * this.ratio)
                , o = this._position[1] / (.5 * this.ratio) * this.height / this.width;
            e(this._position[0] + "px", this._position[1] + "px", null, null),
            n = s + a / 2 + o,
            r = -(l + i / 2 + t)
        } else
            switch (this._posIndex) {
            case 0:
                n = s + a / 2,
                r = u - i / 2,
                e("0px", "0px", null, null);
                break;
            case 2:
                n = s + a / 2,
                r = l + i / 2,
                e(null, "0px", "0px", null);
                break;
            case 1:
                n = o - a / 2,
                r = u - i / 2,
                e("0px", null, null, "0px");
                break;
            case 3:
                n = o - a / 2,
                r = l + i / 2,
                e(null, null, "0px", "0px")
            }
        this.sprite.position.set(n, r, 0),
        this._object && this._marker.scale.set(a / 2 * this.markerSize, a / 2 * this.markerSize, 1)
    }
    render() {
        if (this.miniDom)
            if (this._enable) {
                this.miniDom.style.display = "block";
                var t = this;
                this.miniDom.childNodes.forEach(function(e) {
                    e.style.display = t.bIcon ? "block" : "none"
                });
                const n = this.mainDom.clientHeight + "_" + this.mainDom.clientWidth;
                if (this._clientFlag !== n && (this.app.trigger("mainDomSizeChanged"),
                this._clientFlag = this.mainDom.clientHeight + "_" + this.mainDom.clientWidth),
                this.update(),
                null !== this.camera && null !== this.renderTarget) {
                    var e = this.app.renderer.autoClear;
                    this.app.renderer.autoClear = !1,
                    this.app.renderer.setRenderTarget(null),
                    this.app.renderer.render(this.scene, this.camera),
                    this.app.renderer.autoClear = e
                }
            } else
                this.miniDom.style.display = "none"
    }
    update() {
        const t = THING.App.current.camera.getCameInfo().heading;
        if (this._object) {
            if (this._referenceNode) {
                const e = this.app.camera.position
                    , n = this._referenceNode.convertWorldToLocalPosition(e)
                    , r = this.sprite.position
                    , a = -n[0] * this.sprite.scale.x / this._referenceSize.x
                    , i = n[2] * this.sprite.scale.y / this._referenceSize.y;
                this._marker.position.set(r.x + a, r.y + i, r.z),
                this._marker.material.rotation = (t + this._object.anglesY) * Math.PI / 180,
                this._marker.visible = !0,
                (this._marker.position.x > this.sprite.position.x + this.sprite.scale.x / 2 || this._marker.position.x < this.sprite.position.x - this.sprite.scale.x / 2 || this._marker.position.y > this.sprite.position.y + this.sprite.scale.y / 2 || this._marker.position.y < this.sprite.position.y - this.sprite.scale.y / 2) && (this._marker.visible = !1)
            }
        } else {
            const e = THING.App.current.camera.position;
            let n = THING.App.current.camera.target;
            this.earthCamera.near = THING.App.current.camera.near,
            this.earthCamera.far = THING.App.current.camera.far,
            this.earthCamera.updateProjectionMatrix();
            const r = THING.App.current.camera.distance / this.scale
                , a = CMAP.Util.convertWorldToLonlat(n)
                , i = ht.a.getCameraPositionAndTargetByLonlat(a, r, t, 89.9);
            this.earthCamera.position.set(i[0], i[1], i[2]),
            this.earthCamera.lookAt(n[0], n[1], n[2]),
            this.earthCamera.up.set(i[0], i[1], i[2]).normalize(),
            this.app.uEarth._cameraInfo = {
                cameraPos: i,
                viewPort: {
                    actualWidth: this.width,
                    actualHeight: this.height
                },
                fov: this.earthCamera.fov,
                cameraDirection: this.earthCamera.getWorldDirection().toArray(),
                cameraUp: this.earthCamera.up.toArray(),
                aspectRatio: this.width / this.height
            },
            this.app.uEarth._earthInstance.tileEarth.update();
            const o = this.app.scene.background;
            this.app.scene.background = null,
            this.app.renderer.setClearColor(0, 0),
            this.app.renderer.setRenderTarget(this.renderTarget),
            this.app.renderer.clear(),
            this._marker.visible = !0,
            this._marker.position = e,
            this.app.renderer.render(this.app.scene, this.earthCamera),
            this._marker.visible = !1,
            this.app.uEarth.cameraInfo = null,
            this.app.scene.background = o
        }
    }
    drawObject() {
        this.earthCamera.near = THING.App.current.camera.near,
        this.earthCamera.far = THING.App.current.camera.far,
        this.earthCamera.updateProjectionMatrix();
        const t = this._object.orientedBoundingBox.size;
        let e = t[0] > t[2] ? t[0] : t[2];
        e = (e /= THING.Math.tan(this.earthCamera.fov * Math.PI / 180)) / this.scale * 2;
        const n = this._object.orientedBoundingBox.center
            , r = CMAP.Util.convertWorldToLonlat(n)
            , a = CMAP.Util.convertLonlatToWorld([r[0], r[1] + .1], r[2]);
        let i = THING.Math.subVector(a, n);
        i = (new THREE.Vector3).fromArray(i).normalize();
        const o = (new THREE.Matrix3).setFromMatrix4((new THREE.Matrix4).getInverse(this._object.node.matrixWorld))
            , s = new THREE.Vector3(0,0,1);
        i.applyMatrix3(o);
        let l = s.angleTo(i);
        s.cross(i).y < 0 && (l = -l),
        this._object.anglesY = THING.Math.radToDeg(l),
        this._object.anglesY += this.angle,
        this._referenceNode = new THREE.Object3D,
        this._referenceNode.position.set(n[0], n[1], n[2]);
        const u = CMAP.Util.getAnglesFromPosition(n, this._object.anglesY);
        var c = CMAP.Util.anglesToQuaternion(u);
        this._referenceNode.setRotationFromQuaternion(c),
        this._referenceNode.updateMatrixWorld(),
        this.app.scene.add(this._referenceNode),
        this._referenceSize = {},
        this._referenceSize.y = e * THING.Math.tan(this.earthCamera.fov * Math.PI / 180),
        this._referenceSize.x = e * THING.Math.tan(this.earthCamera.fov * this.earthCamera.aspect * Math.PI / 180);
        const h = ht.a.getCameraPositionAndTargetByLonlat(r, e, -this._object.anglesY, 89.9);
        this.earthCamera.position.set(h[0], h[1], h[2]),
        this.earthCamera.up.set(h[0], h[1], h[2]).normalize(),
        this.earthCamera.lookAt(n[0], n[1], n[2]);
        var d = this.app.scene.background;
        this.app.scene.background = null;
        const f = this.app.uEarth._earthInstance.tileEarth.rootNode.visible;
        this.app.uEarth._earthInstance.tileEarth.rootNode.visible = !1,
        this.app.renderer.setClearColor(0, 0),
        this.app.renderer.setRenderTarget(this.renderTarget),
        this.app.renderer.clear(),
        this.app.renderer.render(this.app.scene, this.earthCamera),
        this.app.scene.background = d,
        this.app.uEarth._earthInstance.tileEarth.rootNode.visible = f
    }
    destroy() {
        var t = this.scene.children.length;
        if (0 !== t) {
            if (t > 0)
                for (var e = 0; e < t; e++)
                    this.scene.remove(this.scene.children[e]);
            this.camera = null,
            this.earthCamera = null,
            this.sprite = null,
            this._marker = null,
            null !== this.miniDom && (this.app.domElement.removeChild(this.miniDom),
            this.miniDom = null),
            this.app.off("mainDomSizeChanged")
        }
    }
}
class EarthMiniMapControl {
    constructor(t) {
        this.minimap = null,
        this.param = t
    }
    onAdd(t) {
        null !== this.minimap && this.onRemove(),
        this.param.app || (this.param.app = t),
        this.minimap = new Minimap(this.param)
    }
    onRemove() {
        this.minimap && this.minimap.destroy()
    }
    setPosition(t, e) {
        this.minimap.setPosition(t, e)
    }
    onUpdate() {
        this.minimap && this.minimap.render()
    }
}
THING.EarthMiniMapControl = EarthMiniMapControl,
THING.Utils.isNull(THING.MaxConfigParse) || THING.Utils.isNull(THING.MaxConfigParse.enableCameraParse) || (THING.MaxConfigParse.enableCameraParse = !1),
THING.Utils.isNull(THING.AllConfigParse) || (THING.AllConfigParse.enableParse = !1),
THING.Utils.isNull(THING.TjsConfigParse) || (THING.TjsConfigParse.enableParse = !1);
var CMAP = window.CMAP = {};
CMAP.Map = Map,
CMAP.GeoPoint = GeoPoint,
CMAP.GeoLine = GeoLine,
CMAP.GroundGeoLine = GroundGeoLine,
CMAP.GroundGeoPolygon = GroundGeoPolygon,
CMAP.Layer = Layer,
CMAP.ThingLayer = ThingLayer,
CMAP.Tile3dLayer = Tile3dLayer,
CMAP.BigDataLayer = BigDataLayer,
CMAP.TileLayerStyle = TileLayerStyle,
CMAP.TextureWrapMode = {
    Repeat: "repeat",
    RepeatY: "repeatY",
    Stretch: "stretch"
},
CMAP.GeoBuilding = GeoBuilding,
CMAP.Util = MapUtil,//r=n(0)即__webpack_require__[0] [闭包1，闭包2...]中的第一个
CMAP.Updater = {
    updateList: {},
    add: function(t, e) {
        this.updateList[t] = e
    },
    delete: function(t) {
        delete this.updateList[t]
    },
    get: function(t) {
        return this.updateList[t]
    },
    updateAll: function() {
        for (let t in this.updateList)
            this.updateList[t]()
    },
    getAll: function() {
        return this.updateList
    }
}, //C=n(2)
CMAP.LayerCollection = LayerCollection,
CMAP.BaseLayerCollection = BaseLayerCollection,
CMAP.UserLayerCollection = UserLayerCollection,
CMAP.EarthMode = EarthMode,
CMAP.TileLayer = TileLayer,
CMAP.EarthCompass = EarthCompass,
CMAP.EarthMiniMapControl = EarthMiniMapControl,
CMAP.BigBuildingLayer = BigBuildingLayer,
CMAP.BigLineLayer = BigLineLayer,
CMAP.BigPointLayer = BigPointLayer,
CMAP.Label = Label,
CMAP.GeoDiffusion = GeoDiffusion,
CMAP.VertexNormalsHelper = VertexNormalsHelper,
CMAP.event = new event,
THING.TileLayerStyle = TileLayerStyle,
THING.EventType.LayersComplete = "LAYERSCOMPLETE",
THING.EventType.MapCameraReady = "MapCameraReady",
THING.EventType.LayerComplete = "LAYERCOMPLETE",
THING.EventType.BigDataLayerComplete = "BIGDATALAYERCOMPLETE",
THING.EventType.MapCameraStart = "MapCameraStart",
THING.Utils.waitAppComplete && THING.Utils.waitAppComplete().then(t=>{
    t || THING.Utils.warn("Failed to get App.current to automatically register MapBundleLoader!"),
    t.registerBundleLoader("map", new Pn),
    t.registerBundleLoader("map-theme", new Sn)
}
),
CMAP.pickIdStartNum = 786432,
CMAP.GeoLineOnTerrainRenderOrder = 0,
CMAP.DisplayMode = {},
CMAP.InfoWindowType = {},
CMAP.InfoWindowStyle = {},
CMAP.DisplayMode.Click = "clickShow",
CMAP.DisplayMode.MouseEnter = "mouseoverShow",
CMAP.DisplayMode.Always = "oftenShow",
CMAP.DisplayMode.None = "none",
CMAP.InfoWindowType.Standard = "standard",
CMAP.InfoWindowType.Custom = "custom",
CMAP.InfoWindowStyle.White = "white",
CMAP.InfoWindowStyle.Blue = "blue",
CMAP.InfoWindowStyle.Default = CMAP.InfoWindowStyle.Black = "default",
CMAP.Alias = Alias,
CMAP.DepthMode = {
    None: 0,
    DepthGlobe: 1,
    Earth: 2
},
CMAP.LevelController = LevelController,
CMAP.ScanningEffect = {
    WireFrame: 0,
    Edge: 1
},
CMAP.TilingSchemeType = {},
CMAP.TilingSchemeType.WebMercator = "WebMercator",
CMAP.TilingSchemeType.Baidu = "Baidu",
CMAP.TilingSchemeType.Geographic = "Geographic",
CMAP.TilingSchemeType.GB = "GB",
Cesium.BaiduMercatorTilingScheme = BaiduMercatorTilingScheme,
Cesium.GBTilingScheme = GBTilingScheme,
Cesium.checkHalfAxes = checkHalfAxes;
let Ln = Mt;
const In = vt.toStr([93, 243, 191, 254]);
var On = vt.toStr([96, 201, 170, 234, 66, 62, 13, 240, 88, 14, 86, 48, 244, 177, 151, 113, 16, 250, 124, 180, 106, 97, 187, 65, 253, 161])
    , kn = vt.toStr([96, 201, 170, 234, 66, 62, 13, 246, 88, 29, 82, 33, 238, 177, 177, 70, 46, 211, 70]);
THING[On] = "http://localhost:8008/getKey",
CMAP.mapAuthServerUrl = "http://www.thingjs.com/api/getMapAuth/",
Ln.dispatch({
    type: "k",
    value: "thingjs.com_uearth"
}),
THING.__auth_uearth_key__ = function(t) {
    Ln.dispatch({
        type: "k",
        value: t
    })
}
,
MapUtil.objectAssign(MapUtil_1, MapUtil),//第一个依赖
MapUtil.objectAssign(Util0_2, MapUtil),
CMAP.VERSION = function() {
    if ("" !== Ln.getState().v)
        return "1.7.17_" + Ln.getState().v;
    return "1.7.17"
}(),
CMAP.COMPILETIME = "Thu, 16 Feb 2023 07:36:42 GMT",
THING.Utils.log("CMAP Version:" + CMAP.VERSION),
CMAP.getCurrentMap = function() {
    return CMAP._map
}
,
CMAP.logDepthbuf = !0,
CMAP.depthMode = p.a.DepthGlobe,
CMAP.depthGlobeRadiusFar = 6377e3,
CMAP.depthGlobeRadiusNear = 6377500,
CMAP._defaultTime = new Date("2020-07-21T13:00:00")