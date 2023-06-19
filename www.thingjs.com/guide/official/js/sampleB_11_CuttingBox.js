/**
 * 剖切盒类
 * 备注：app.camera.screenToWorld坐标转换在2.0版本不正确（与1.0不一致）
 */

class CuttingBox {
    /**
     * 构造器
     */
    constructor(opts) {
        if (opts == null || opts.object == null) {
            console.log('缺少必要的参数，请传入要剖切的对象！');
            return;
        }
        this.object = opts.object;
        this.boundingBox = this.object.boundingBox;  // 剖切盒
        this.center = this.boundingBox.center;  // 剖切盒中心点
        this.max = [...this.boundingBox.max];  // 剖切盒在坐标轴中三个方向的最大坐标
        this.min = [... this.boundingBox.min];  // 剖切盒在坐标轴中三个方向的最小坐标
        let minB = this.boundingBox.min;
        let maxB = this.boundingBox.max;
        this.point2 = [minB[0], minB[1], maxB[2]];
        this.point3 = [maxB[0], minB[1], maxB[2]];
        this.point4 = [minB[0], maxB[1], minB[2]];
        this.point6 = [minB[0], maxB[1], maxB[2]];
        this.l = THING.Math.getDistance(this.point2, this.point3);  // 剖切盒长
        this.w = THING.Math.getDistance(this.point6, this.point2);  // 剖切盒宽
        this.h = THING.Math.getDistance(this.point4, this.point6);  // 剖切盒高
        this.boundingRegionArr = [];
        this.boundingRegionObj = {};
        this.boundingRegionObjArr = [];
        this.arrowArr = [];
        // 剖切参数
        this.clippingPlanesInfo = [
            { direction: [0, -1, 0], height: Math.abs(this.boundingBox.max[1]), }, // top
            { direction: [0, 1, 0], height: 0 }, // bottom
            { direction: [-1, 0, 0], height: Math.abs(this.boundingBox.min[2]) }, // right
            { direction: [1, 0, 0], height: Math.abs(this.boundingBox.max[2]) }, // left
            { direction: [0, 0, -1], height: Math.abs(this.boundingBox.min[0]) }, // front
            { direction: [0, 0, 1], height: Math.abs(this.boundingBox.min[0]) },// back
        ];
        // 剖切范围
        this.limitPosition = {
            profile: {
                max: null,  // X轴的最大坐标
                min: null  // X轴的最小坐标
            },
            front: {
                max: null,  // Z轴的最大坐标
                min: null  // Z轴的最小坐标
            },
            up: {
                max: null,  // Y轴的最大坐标
                min: null  // Y轴的最小坐标
            }
        };
        this.clippingPlanesObject = null;
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        let pos1 = app.camera.screenToWorld([917, 410, 0]);
        app.camera.pick(917, 410)
        console.log('pos1??????', pos1)


        let picc = app.camera.pick();
        this.max.forEach((v, k) => {
            let boundingRegionName;
            let width, height, arrowAnger, direction;
            let center = JSON.parse(JSON.stringify(this.center));  // 剖切盒中心点
            center[k] = v;  // 剖切面中心点
            switch (true) {
                case k == 0:
                    boundingRegionName = 'profileA';  // 剖切盒左面  
                    width = [this.w, 'w'];  // 剖切面宽
                    height = [this.h, 'h'];  // 剖切面高
                    arrowAnger = ['Z', -90];  // 左面箭头的旋转角度
                    direction = [-1, 0, 0];  // 剖切方向
                    this.limitPosition.profile.max = v;
                    break;
                case k == 1:
                    boundingRegionName = 'upA';  // 剖切盒上面
                    width = [this.h, 'h'];  // 剖切面宽
                    height = [this.l, 'l'];  // 剖切面高
                    arrowAnger = ['Y', 90];  // 上面箭头的旋转角度
                    direction = [0, -1, 0];  // 剖切方向
                    this.limitPosition.up.max = v;
                    break;
                case k == 2:
                    boundingRegionName = 'frontA';  // 剖切盒正面
                    width = [this.l, 'l'];  // 剖切面宽
                    height = [this.w, 'w'];  // 剖切面高
                    arrowAnger = ['X', 90];  // 正面箭头的旋转角度
                    direction = [0, 0, -1];  // 剖切方向
                    this.limitPosition.front.max = v;
                    break;
            }
            let thingObj = {
                boundingRegionName: boundingRegionName,
                width: width,
                height: height,
                direction: direction,
                arrowAnger: arrowAnger,
                center: center,
                axisIndex: k
            }
            this.boundingRegionArr.push(thingObj);
        });

        this.min.forEach((v, k) => {
            let boundingRegionName;
            let width, height, arrowAnger, direction;
            let center = JSON.parse(JSON.stringify(this.center));
            center[k] = v;
            switch (true) {
                case k == 0:
                    boundingRegionName = 'profileB';  // 剖切盒右面
                    width = [this.w, 'w'];  // 剖切面宽
                    height = [this.h, 'h'];  // 剖切面高
                    arrowAnger = ['Z', 90];  // 右面箭头的旋转角度
                    direction = [1, 0, 0];  // 剖切方向
                    this.limitPosition.profile.min = v;
                    break;
                case k == 1:
                    boundingRegionName = 'upB';  // 剖切盒底面
                    width = [this.l, 'l'];  // 剖切面宽
                    height = [this.h, 'h'];  // 剖切面高
                    arrowAnger = ['Z', -180];  // 底面箭头的旋转角度
                    direction = [0, 1, 0];  // 剖切方向
                    this.limitPosition.up.min = v;
                    break;
                case k == 2:
                    boundingRegionName = 'frontB';  // 剖切盒后面
                    width = [this.l, 'l'];  // 剖切面宽
                    height = [this.w, 'w'];  // 剖切面高
                    arrowAnger = ['X', -90];  // 后面箭头的旋转角度
                    direction = [0, 0, 1];  // 剖切方向
                    this.limitPosition.front.min = v;
                    break;
            }
            let thingObj = {
                boundingRegionName: boundingRegionName,
                width: width,
                height: height,
                direction: direction,
                arrowAnger: arrowAnger,
                center: center,
                axisIndex: k
            }
            this.boundingRegionArr.push(thingObj);
        });
        this.boundingRegionArr.forEach(v => {
            this.boundingRegionObj = this.createboundingRegion(v);  // 创建剖切面和箭头
            this.boundingRegionObj = Object.assign(this.boundingRegionObj, v);  // 对象合并
            this.boundingRegionObjArr.push(this.boundingRegionObj);  // 存储所有实例对象
        });
        this.boundingRegionObjArr.forEach(v => {
            this.arrowEvent(v);  // 为所有箭头对象绑定剖切事件
        })

        //鼠标抬起事件
        $(document).on('mouseup', function () {
            app.camera.enableRotate = true;
            $(document).unbind('mousemove');
        })

    }

    /**
     * 创建剖切面和箭头
     * @param {Object} obj - 箭头位置、箭头倾斜角度、剖切面宽度
     */
    createboundingRegion(obj) {
        let arrow = new THING.Entity({
            type: 'Thing', // 类型
            name: 'arrow' + obj.boundingRegionName,
            url: 'https://model.3dmomoda.com/models/5ff9ae7331e742d0bf572be34e86f651/0/gltf/',
            position: obj.center, // 位置
            complete: function () {
            }
        });
        // arrow.visible = false;
        this.arrowArr.push(arrow);
        //判断箭头倾斜方向和倾斜角度
        switch (true) {
            case obj.arrowAnger[0] == 'X': arrow.rotateX(obj.arrowAnger[1]);
                break;
            case obj.arrowAnger[0] == 'Y': arrow.rotateY(obj.arrowAnger[1]);
                break;
            case obj.arrowAnger[0] == 'Z': arrow.rotateZ(obj.arrowAnger[1]);
                break;
        }
        // 创建剖切面
        let point = obj.center;
        let maxR = obj.width[0] * 0.5;
        let minR = obj.height[0] * 0.5;
        let points1 = [[point[0] - minR, point[1], point[2] - maxR], [point[0] + minR, point[1], point[2] - maxR],
        [point[0] + minR, point[1], point[2] + maxR], [point[0] - minR, point[1], point[2] + maxR]];
        let keyPoint = new THING.AttachedPoint({
            parent: arrow,
            position: point,
        });
        let polygon = new THING.PlaneRegion({
            type: 'Plane', // 类型
            name: 'Plane',
            id: 'PlaneUp' + obj.boundingRegionName,
            points: points1,
            position: point,
            parent: keyPoint,
            style: {
                color: '#11DAB7',
                opacity: 0.2, // 透明度
                doubleSide: true, // 双面渲染
                boundingBox: true, // 包围盒
                boundingBoxColor: '#11DAB7' // 包围盒颜色 }
            }
        });
        // polygon.visible = false;
        polygon.pickable = false; // 设置不可拾取
        polygon.inheritPickable = false; // 设置拾取状态不受父物体影响
        arrow.add(keyPoint);
        switch (true) {
            case obj.arrowAnger[0] == 'X': polygon.rotateX(obj.arrowAnger[1]);
                break;
            case obj.arrowAnger[0] == 'Y': polygon.rotateY(obj.arrowAnger[1]);
                break;
            case obj.arrowAnger[0] == 'Z': polygon.rotateZ(obj.arrowAnger[1]);
                break;
        }
        polygon.rotateY(90);
        return {
            arrow: arrow,  // 箭头模型
            polygon: polygon  // 剖切面
        }
    }

    /**
     * 注册事件
     */
    arrowEvent(v) {
        let _this = this;
        this.arrowPosition = v.arrow.position;  // 箭头当前位置
        let polygon = v.polygon;  // 和箭头对应的剖切面对象
        let arrow = v.arrow;  // 箭头对象
        let boundingRegionName = v.boundingRegionName;  // 箭头名称
        let direction = v.direction;  // 剖切方向
        let axisIndex = v.axisIndex;
        // 鼠标移入到箭头
        arrow.on('mouseenter', function () {
            $(document.body).css('cursor', 'grab');
            polygon.style.opacity = 0.5;
            arrow.scale = [1.5, 1.5, 1.5];
        })

        // 鼠标离开
        arrow.on('mouseleave', function () {
            $(document.body).css('cursor', 'default');
            polygon.style.opacity = 0.2;
            arrow.scale = [1, 1, 1];
        }, '鼠标滑出恢复透明度');

        // 按下箭头
        arrow.on('mousedown', function (ev) {
            if (ev.button != 0) return;
            app.camera.enableRotate = false;  // 禁止摄像机默认旋转事件
            let movePosition;  // 鼠标位置
            let upArrowPosition = arrow.position;  // 箭头当前位置
            let height, index;  // height为剖切高度,index剖切参数的位置
            for (let i = 0; i < _this.clippingPlanesInfo.length; i++) {
                if (_this.clippingPlanesInfo[i].direction.toString() == direction.toString()) {
                    index = i;
                }
            }
            // 箭头移动
            $(document).on('mousemove', function (ev) {
                // 将鼠标屏幕坐标转为世界坐标
                let picc = app.camera.pick();
                movePosition = app.camera.screenToWorld([ev.clientX, ev.clientY]);
                // 判断当前进行剖切的剖切面
                switch (true) {
                    case boundingRegionName == 'upA' || boundingRegionName == 'upB':  // 上下剖切面
                        // 剖切范围
                        console.log('x-y', ev.clientX, ev.clientY)
                        console.log('move-', movePosition)
                        // console.log('up', _this.limitPosition.up.max)
                        if (movePosition[1] <= 0.05) {
                            movePosition[1] = 0.05;
                        } else if (movePosition[1] >= _this.limitPosition.up.max) {
                            movePosition[1] = _this.limitPosition.up.max + 0.02
                        }
                        // 改变箭头位置
                        arrow.position = [upArrowPosition[0], movePosition[1], upArrowPosition[2]];
                        if (boundingRegionName == 'upA') {
                            height = movePosition[1];
                            _this.max[1] = movePosition[1];
                        } else {
                            height = -movePosition[1];
                            _this.min[1] = movePosition[1];
                        }
                        break;
                    case boundingRegionName == 'frontA' || boundingRegionName == 'frontB':  // 前后剖切面
                        // 剖切范围
                        if (movePosition[2] <= _this.limitPosition.front.min + 0.05) {
                            movePosition[2] = _this.limitPosition.front.min + 0.05;
                        } else if (movePosition[2] >= _this.limitPosition.front.max) {
                            movePosition[2] = _this.limitPosition.front.max;
                        }
                        arrow.position = [upArrowPosition[0], upArrowPosition[1], movePosition[2]];
                        if (boundingRegionName == 'frontA') {
                            height = movePosition[2];
                            _this.max[2] = movePosition[2];

                        } else {
                            height = -movePosition[2];
                            _this.min[2] = movePosition[2];

                        }
                        break;
                    case boundingRegionName == 'profileA' || boundingRegionName == 'profileB':  // 左右剖切面
                        // 剖切范围
                        if (movePosition[0] <= _this.limitPosition.profile.min + 0.05) {
                            movePosition[0] = _this.limitPosition.profile.min + 0.05;
                        } else if (movePosition[0] >= _this.limitPosition.profile.max) {
                            movePosition[0] = _this.limitPosition.profile.max;
                        }
                        arrow.position = [movePosition[0], upArrowPosition[1], upArrowPosition[2]];
                        if (boundingRegionName == 'profileA') {
                            height = movePosition[0];
                            _this.max[0] = movePosition[0];

                        } else {
                            height = -movePosition[0];
                            _this.min[0] = movePosition[0];

                        }
                        break;
                }
                _this.clippingPlanesInfo[index].height = height;  // 改变剖切高度

                // let clippingPlanes = [
                //     { direction: [0, -1, 0], height: 20 }, // top
                // ];
                // clippingPlanes[0].height -= 2;
                _this.clippingPlanesObject = new THING.ClippingPlanes({
                    parent: _this.object,
                    planes: _this.clippingPlanesInfo,
                });
                _this.object.traverse(obj => { obj.style.clippingPlanes = _this.clippingPlanesObject });

                // _this.object.setClippingPlanes(_this.clippingPlanesInfo);  // 进行剖切
                console.log('height', height)
                _this.calculateLength();  // 重新计算剖切盒的长宽高
                _this.boundingRegionChange(boundingRegionName, axisIndex);  // 重新绘制剖切面
            })
        }, '自定义左键拖拽事件');
    }

    /**
     * 重新绘制剖切面
     * @param {String} str - 判断剖切面（up：上下面，front：前后面，profile：侧面）
     * @param {Number} axisIndex - 判断更改坐标位置
     */
    boundingRegionChange(str, axisIndex) {
        let str1 = str.slice(0, str.length - 1);
        let position;
        // 筛选要更改的剖切面
        let boundingRegionArr = this.boundingRegionObjArr.filter((v, k) => {
            let flagIndex = v.boundingRegionName.indexOf(str1);
            if (flagIndex == -1) {
                return v;
            }
        });
        boundingRegionArr.forEach((v, k) => {
            v.polygon.destroy();  // 销毁原有剖切面
            position = v.arrow.position;
            position[axisIndex] = (this.max[axisIndex] + this.min[axisIndex]) * 0.5;
            v.arrow.position = position;  // 改变剖切面绑定的箭头的位置
            this.reSetPlane(v);  // 重新创建新的剖切面
        })
    }

    /**
     * 创建剖切面
     * @param {Object} v - 需要重新计算的剖切面对象参数
     */
    reSetPlane(v) {
        v.polygon.destroy();  // 销毁剖切面
        v.width[0] = this.reSetPlaneLength(v.width[1]);  // 重新计算剖析面的宽度
        v.height[0] = this.reSetPlaneLength(v.height[1]);  // 重新计算剖析面的高度

        let point = v.center;
        let maxR = v.width[0] * 0.5;
        let minR = v.height[0] * 0.5;
        let points1 = [[point[0] - minR, point[1], point[2] - maxR], [point[0] + minR, point[1], point[2] - maxR],
        [point[0] + minR, point[1], point[2] + maxR], [point[0] - minR, point[1], point[2] + maxR]];
        let keyPoint = new THING.AttachedPoint({
            parent: v.arrow,
            position: point,
        });
        v.polygon = new THING.PlaneRegion({
            type: 'Plane', // 类型
            name: 'Plane',
            id: 'PlaneUp' + v.boundingRegionName,
            points: points1,
            position: point,
            parent: keyPoint,
            style: {
                color: '#11DAB7',
                opacity: 0.2, // 透明度
                doubleSide: true, // 双面渲染
                boundingBox: true, // 包围盒
                boundingBoxColor: '#11DAB7' // 包围盒颜色 }
            }
        });
        v.polygon.pickable = false; // 设置不可拾取
        v.polygon.inheritPickable = false; // 设置拾取状态不受父物体影响
        v.arrow.add(keyPoint);
        switch (true) {
            case v.arrowAnger[0] == 'X': v.polygon.rotateX(v.arrowAnger[1]);
                break;
            case v.arrowAnger[0] == 'Y': v.polygon.rotateY(v.arrowAnger[1]);
                break;
            case v.arrowAnger[0] == 'Z': v.polygon.rotateZ(v.arrowAnger[1]);
                break;
        }
        v.polygon.rotateY(90);
    }

    /**
     * 重置剖切盒
     */
    resetClippingPlane() {
        this.object.clearClippingPlanes();
        this.max = [...this.boundingBox.max];
        this.min = [... this.boundingBox.min];
        this.clippingPlanesInfo = [
            { height: Math.abs(this.boundingBox.max[1]), direction: [0, -1, 0] },
            { height: 0, direction: [0, 1, 0] },
            { height: Math.abs(this.boundingBox.min[2]), direction: [0, 0, 1] },
            { height: Math.abs(this.boundingBox.max[2]), direction: [0, 0, -1] },
            { height: Math.abs(this.boundingBox.min[0]), direction: [1, 0, 0] },
            { height: Math.abs(this.boundingBox.min[0]), direction: [-1, 0, 0] }
        ];
        this.calculateLength();  // 重新计算剖切盒的大小
        this.boundingRegionObjArr.forEach(v => {
            v.arrow.position = v.center;  // 将箭头重置为初始位置
            v.arrow.visible = false;  // 隐藏箭头以及剖切面
            this.reSetPlane(v);  // 重新创建剖切面
        })
    }

    /**
     * 判断剖切面的宽、高
     * @param {String}  str - w为剖切盒的宽度,l为剖切盒的长,h值为剖切盒高
     */
    reSetPlaneLength(str) {
        let length;
        switch (true) {
            case str == 'w': length = this.w;
                break;
            case str == 'l': length = this.l;
                break;
            case str == 'h': length = this.h;
                break;
        }
        return length;
    }

    /**
     * 计算剖切盒长宽高
     */
    calculateLength() {
        this.l = this.max[0] - this.min[0];
        this.w = this.max[1] - this.min[1];
        this.h = this.max[2] - this.min[2];
    }
    /**
     * 显示隐藏剖切面
     * @param {Boolean} state - 剖切面状态
     */
    showOrHiddenArrow(state) {
        var _this = this;
        if (state == false || state == true) {
            let length = _this.arrowArr.length;
            for (let i = 0; i < length; i++) {
                let curI = _this.arrowArr[i];
                curI.visible = state;
            }
        }
    }
}