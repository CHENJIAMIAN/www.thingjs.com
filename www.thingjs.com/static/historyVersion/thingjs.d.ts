/**
 * 构造物体控制轴
 * @param {THING.BaseObject} object 物体
 * @param {String} mode? 控制轴模式("translate"/"rotate"/"scale").
 * @param {Object} params 参数列表
 * @param {Function} params.changeStart? 控制轴开始修改物体位置信息
 * @param {Function} params.change? 控制轴修改物体位置信息中
 * @param {Function} params.changeEnd? 控制轴结束修改物体位置信息
 */
declare class AxisTransformControl {
    constructor(object: BaseObject, mode?: string, params: {
        "changeStart?": ()=>any;
        "change?": ()=>any;
        "changeEnd?": ()=>any;
    });

}

/**
 * @namespace
 */
declare namespace THING {
    /**
     * @class App
     * ThingJS库入口对象，提供加载场景、搜索、事件绑定、摄像机控制等
     * @memberof THING
     * @example
     * var app = new THING.App({ container: "div3d" });
     */
    class App {
        constructor(options: {
            url: string;
            complete: ()=>any;
            success: ()=>any;
            error: ()=>any;
            progress: ()=>any;
            background: number;
            skyBox: string;
            env: string | any[];
        });

        /**
         * 摄像机
         * @type {THING.CameraController}
         */
        camera: CameraController;

        /**
         * 创建物体
         * @param {String} type 物体类型
         * @param {String} name 物体名称
         * @param {String} url 物体模型链接
         * @param {Array<Number>} position 物体生成位置
         * @param {Function} complete 物体生成后的回调
         * @return {THING.BaseObject|THING.Marker|THING.WebView|THING.UIAnchor}
         * @example
         * // type:'Thing'
         * var truck = app.create({
         * 		type: 'Thing',
         * 		name: 'truck',
         * 		url: 'https://speech.uinnova.com/static/models/truck/',
         * 		position: [-5, 0, 0],
         * 		complete: function() {
         * 			console.log('truck created!');
         *      }
         * });
         * // type:'UI';
         * var ui = app.create({
         * 		type: 'UI',
         * 		el: element, // 界面的dom元素
         * 		parent: parent, // 界面的父节点(位置跟随父节点更新)
         * 		localPosition:[0,0,0], //相对parent的偏移
         * 		pivot:[0,0.5],  // 界面的重心
         * });
         * // type:'Marker';
         * var marker = app.create({
         * 		type: "Marker",
         * 		localPosition: [0, 5, 0], // 相对于包围盒的最高点偏移量
         * 		size: 4,
         * 		url: "https://speech.uinnova.com/static/images/warning1.png",
         * 		parent: app.query('car01')[0]
         * });
         * // type:'WebView';
         *  var webView = app.create({
         * 		type: 'WebView',
         * 		url: 'http://www.baidu.com/',
         * 		position: [0, 0, 0],
         * 		width: 16,
         * 		height: 16
         * });
         * // type:'Box';
         * var box = app.create({
         * 		type: 'Box',
         * 		width: 1.0, // 宽度
         * 		height: 1.0, // 高度
         * 		depth: 1.0, // 深度
         * 		widthSegments: 1.0, //宽度上的节数
         * 		heightSegments: 1.0, // 高度上的节数
         * 		depthSegments: 1.0, // 深度上的节数
         * 	center:'Bottom', // 中心点
         * 	style: {
         *     		color: '#ffffff',
         *     		opacity: 0.8,
         *     		image: 'images/uv.jpg'
         * 	}
         * });
         * // type:'Sphere';
         * var sphere = app.create({
         * 		type: 'Sphere',
         * 		radius: 1,
         * 		widthSegments: 12,
         * 		heightSegments: 12,
         * 		position: [2, 0, 0],
         * 	style: {
         * 			image: 'images/perlin-512.png'
         * 		}
         * });
         * // type:'Plane';
         * var plane = app.create({
         * 		type: 'Plane',
         * 		width: 2,
         * 		height: 1,
         * 		position: [4, 0, 0],
         * 		style: {
         * 			doubleSide: true,
         * 			image: 'images/perlin-512.png'
         * 		}
         * });
         * // type:'Cylinder';
         * var plane = app.create({
         * 		type: 'Cylinder',
         * 		radius: 0.4,
         * 		height: 1.6,
         * 		position: [0, 0, 2]
         * });
         * // type:'Tetrahedron';
         * var t = app.create({
         * 		type: 'Tetrahedron',
         * 		radius: 1,
         * 		position: [2, 0, 2]
         * });
         * // 另外,可以通过 t3d.factory.registerClass(类名, '物体类型名') 来扩展物体类型
         */
        create(type: string, name: string, url: string, position: number[], complete: ()=>any): BaseObject | Marker | WebView | UIAnchor;

        /**
         * 物体查询
         * @param {String} 参数列表
         * @return {Array<THING.BaseObject>} 查询结果，注意是以数组的方式提供，如果什么都没有找到就返回 []
         * @example
         * app.query('car01') 查询名称为 car01 的对象
         * app.query('.Thing') 查询类型为 Thing 的对象
         * app.query('#001') 查询id为 001 的对象
         * app.query('[prop=value]') 查询自定义属性为 [prop=value] 的对象
         * app.query('/car/') 查询名字中包含 car 的对象
         */
        query(参数列表: string): (BaseObject)[];

        /**
         * 绑定事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} userData 事件绑定自定义数据, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} callback 事件触发的回调函数
         * @param {String} tag? 事件名字标记
         * @param {Number} priority ? 优先级，数值越大优先级越高
         * @example
         * app.on('click', '.Building', function(ev) {...});
         * app.on('click', '.Thing', {id: 1, hit: false}, function(ev) {...});
         * app.on('update', function(ev) {...});
         */
        on(eventType: string, selector: string, userData: any, callback: ()=>any, tag?: string, priority: number): void;

        /**
         * 解绑事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} callback 事件触发的回调函数
         */
        off(eventType: string, selector: string, callback: ()=>any): void;

        /**
         * 绑定事件(只触发一次)
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} userData 事件绑定自定义数据, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} callback 事件触发的回调函数
         * @param {String} tag? 事件名字标记
         * @param {Number} priority ? 优先级，数值越大优先级越高
         * @example
         * app.one('click', '.Building', function(ev) {...});
         * app.one('click', '.Thing', {id: 1, hit: false}, function(ev) {...});
         * app.one('update', function(ev) {...});
         */
        one(eventType: string, selector: string, userData: any, callback: ()=>any, tag?: string, priority: number): void;

        /**
         * 发送事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} ev 事件信息
         */
        trigger(eventType: string, selector: string, ev: any): void;

        /**
         * 暂停事件响应
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        pauseEvent(eventType: string, selector: string, tag?: string): void;

        /**
         * 暂停事件响应(当前帧，下一帧恢复响应)
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        pauseEventInFrame(eventType: string, selector: string, tag?: string): void;

        /**
         * 恢复事件响应
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        resumeEvent(eventType: string, selector: string, tag?: string): void;

        /**
         * 获得园区数据，不会加载场景渲染资源, 信息将以JSON数据的方式返回。
         * 主要用途是查询未加载或者准备加载场景的数据，因为没有渲染信息的加载，所以速度会非常快。
         * @param {String} url 园区路径
         * @param {Object} params 参数列表
         * @return {Object}
         */
        getCampusJSON(url: string, params: any): any;

        /**
         * 从启动到现在的流逝时间(毫秒)
         * @type {Number}
         */
        elapsedTime: number;

        /**
         * 距离上一帧的流逝时间(毫秒)
         * @type {Number}
         */
        deltaTime: number;

        /**
         * 当前帧计数器
         * @type {Number}
         */
        currentFrame: number;

        /**
         * 获取像素比例，在移动设备上，为了渲染效率，我们通常会把这个值设置成比1还要小的数值，从而获得较小的渲染分辨率来提供帧率。
         * 数值越大，渲染效果越清晰(帧率低)，数值越小，渲染效果越模糊(帧率高)
         * @type {Number}
         */
        pixelRatio: number;

        /**
         * 设置时间线效果
         * @type {Object} options 参数列表
         * @property {Number} options.time 时间
         * @property {Number} options.beta 角度
         * @property {Number} options.turbidity 混浊度
         * @property {Number} options.rayleigh 瑞利散射
         * @property {Number} options.mieCoefficient 散射系数
         * @property {Number} options.mieDirectionalG
         * @example
         * app.skyEffect = {
         *  time: 9,
         * 	beta: 45,
         * 	turbidity: 10,
         * 	rayleigh: 1.5,
         * 	luminance: 1,
         * 	mieCoefficient: 0.005,
         * 	mieDirectionalG: 0.98
         * };
         */
        skyEffect: any;

        /**
         * 设置灯光参数
         * @type {Object} options 参数列表
         * @property {Boolean} options.showHelper 是否显示辅助线
         * @property {Object} options.ambientLight 环境光
         * @property {Number} options.ambientLight.intensity 环境光强度
         * @property {Number} options.ambientLight.color 环境光颜色
         * @property {Object} options.mainLight 主灯光
         * @property {Number} options.mainLight.intensity 主灯光强度
         * @property {Number} options.mainLight.color 主灯光颜色
         * @property {Number} options.mainLight.alpha 主灯光角度
         * @property {Number} options.mainLight.beta 主灯光角度
         * @property {Object} options.secondaryLight 第二光源
         * @property {Number} options.secondaryLight.intensity 第二光源强度
         * @property {Number} options.secondaryLight.color 第二光源颜色
         * @property {Number} options.secondaryLight.alpha 第二光源角度
         * @property {Number} options.secondaryLight.beta 第二光源角度
         * @property {Object} options.tertiaryLight 第三光源
         * @property {Number} options.tertiaryLight.intensity 第三光源强度
         * @property {Number} options.tertiaryLight.color 第三光源颜色
         * @property {Number} options.tertiaryLight.alpha 第三光源角度
         * @property {Number} options.tertiaryLight.beta 第三光源角度
         * @example
         * app.lighting = {
         *     showHelper: false, // 灯光标示
         *     ambientLight: {
         *         intensity: 0.5,
         *         color: 0xffffff
         *     },
         *     hemisphereLight: {
         *         intensity: 0.0,
         *         color: 0xffffff,
         * 		   groundColor: 0x222222
         *     },
         *     mainLight: {
         *         // If enable shadow of main light.
         *         shadow: false,
         *         // Quality of main light shadow. 'low'|'medium'|'high'|'ultra'
         *         shadowQuality: 'high',
         *         // Intensity of main light
         *         intensity: 0.5,
         *         // Color of main light
         *         color: 0xffffff,
         *         // Alpha is rotation from bottom to up.
         *         alpha: 30,
         *         // Beta is rotation from left to right.
         *         beta: 30
         *     },
         *     secondaryLight: {
         *         shadow: false,
         *         shadowQuality: 'high',
         *         intensity: 0,
         *         color: 0xffffff,
         *         alpha: 138,
         *         beta: 0
         *     },
         *     tertiaryLight: {
         *         shadow: false,
         *         shadowQuality: 'high',
         *         intensity: 0,
         *         color: 0xffffff,
         *         alpha: 0,
         *         beta: 0
         *     }
         * };
         */
        lighting: any;

        /**
         * 设置雾参数
         * @type {Object} options
         * @property {String} options.type 目前支持特殊类型 `Exp2`,及默认类型
         * @property {Number} options.color 雾颜色数值
         * @property {Number} options.far 设置远距离的雾效浓度
         * @property {Number} options.near 设置近距离的雾效浓度
         * @example
         * // 线性雾
         * app.fog = {color: 0x888888, near: 1, far: 100};
         * // 清除雾
         * app.fog = null;
         */
        fog: any;

        /**
         * 设置后期处理参数
         * @type {Object} options 参数列表
         * @property {Object} options.temporalSuperSampling 超采样(场景静止时起作用)
         * @property {boolean} options.temporalSuperSampling.enable
         * @property {Number} options.temporalSuperSampling.size 采样的帧数，帧数越多，收敛速度越慢
         * @property {Object} options.postEffect 后期处理
         * @property {boolean} options.postEffect.enable
         * @property {Object} options.bloom 泛光（会影响天空盒）
         * @property {boolean} options.bloom.enable
         * @property {Number} options.bloom.strength 泛光强度
         * @property {Number} options.bloom.radius 泛光半径
         * @property {Number} options.bloom.threshold 泛光阈值
         * @property {Object} options.screenSpaceAmbientOcclusion 屏幕空间环境光遮蔽（相对昂贵的性能开销）
         * @property {boolean} options.screenSpaceAmbientOcclusion.enable
         * @property {Number} options.screenSpaceAmbientOcclusion.radius 采样半径
         * @property {Number} options.screenSpaceAmbientOcclusion.quality 采样等级
         * @property {Number} options.screenSpaceAmbientOcclusion.intensity 环境光遮蔽强度
         * @property {Number} options.screenSpaceAmbientOcclusion.temporalFilter 使用temporal超采样时起作用，柔化采样效果
         * @property {boolean} options.screenSpaceAmbientOcclusion.ignoreTransparent 忽略透明物体
         * @property {Object} options.colorCorrection 颜色调整
         * @property {boolean} options.colorCorrection.enable
         * @property {Number} options.colorCorrection.exposure 曝光
         * @property {Number} options.colorCorrection.brightness 亮度
         * @property {Number} options.colorCorrection.contrast 对比度
         * @property {Number} options.colorCorrection.saturation 饱和度
         * @property {Object} options.FXAA 抗锯齿
         * @property {boolean} options.FXAA.enable
         * @property {boolean} resetOther? 是否重置其它未设置的后期处理配置，默认为false，会保持当前的设置状态
         * @example
         * // 后期处理
         * app.postEffect = {
         * // If enable post effects.
         * enable: false,
         * // Configuration about bloom post effect
         * // 泛光（会影响天空盒）
         * bloom: {
         * // If enable bloom
         * enable: false,
         * // Intensity of bloom
         * // 泛光强度
         * strength: 0.14,
         * // radius of bloom
         * // 泛光半径
         * radius: 0.4,
         * // threshold of bloom
         * // 泛光阈值
         * threshold: 0.7
         * },
         * // Configuration about screen space ambient occulusion
         * // 屏幕空间环境光遮蔽（相对昂贵的性能开销）
         * screenSpaceAmbientOcclusion: {
         * // If enable SSAO
         * enable: false,
         * // Sampling radius in work space.
         * // Larger will produce more soft concat shadow.
         * // But also needs higher quality or it will have more obvious artifacts
         * // 采样半径
         * radius: 0.2,
         * // Quality of SSAO. 'low'|'medium'|'high'|'ultra'
         * // 采样等级
         * quality: 'medium',
         * // Intensity of SSAO
         * // 环境光遮蔽强度
         * intensity: 0.8,
         * // temporal filter in temporal super sampling mode
         * // 使用temporal超采样时起作用，柔化采样效果
         * temporalFilter: true,
         * // if ignore transparent objects
         * // 忽略透明物体
         * ignoreTransparent: false
         * },
         * // Configuration about color correction
         * // 颜色调整
         * colorCorrection: {
         * // If enable color correction
         * enable: false,
         * // 曝光
         * exposure: 0,
         * // 亮度
         * brightness: 0,
         * // 对比度
         * contrast: 1,
         * // 饱和度
         * saturation: 1,
         * // 伽马矫正
         * gamma: 1
         * },
         * // Configuration about FXAA
         * // fxaa 抗锯齿
         * FXAA: {
         * // If enable FXAA
         * enable: false
         * }
         * };
         */
        postEffect: any;

        /**
         * 设置背景颜色或者图片
         * @type {String|Number} value 图片路径或者颜色值
         */
        background: string | number;

        /**
         * 设置天空盒(THING JS目前提供了几个天空盒,分别是'BlueSky','MilkyWay','Night','SunCloud')
         * @type {String} 天空盒名称
         * @example
         * var app = new THING.App({ skyBox: "BlueSky" });
         */
        skyBox: string;

        /**
         * 判断某按键是否按下
         * @param {number} key 键值
         * @return {Boolean}
         */
        isKeyPressed(key: number): boolean;

        /**
         * 判断是否移动端设备
         * @type {boolean}
         */
        isMobileDevice: boolean;

        /**
         * 获取场景层次管理器
         * @type {THING.SceneLevel}
         */
        level: SceneLevel;

        /**
         * 获取场景根节点
         * @type {THING.SceneRoot}
         */
        root: SceneRoot;

        /**
         * 将当前截屏保存到缓冲区中
         * @param {String} extension 文件类型
         * @param {number} quality 质量
         * @param {Boolean} allowDownload 是否允许被下载
         */
        captureScreenshotToImage(extension?: string, quality?: number, allowDownload?: boolean): void;

        /**
         * 将当前截屏保存到指定文件中
         * @param {String} fileName 文件路径
         */
        captureScreenshot(fileName: string): void;

        /**
         * 保存文件
         * @param {String} fileName 文件路径
         * @param {String} data 文件数据
         */
        saveFile(fileName: string, data: string): void;

    }

    /**
     * @class CameraController
     * 摄像机类，就是 app.camera 对象
     * @author wujunhua, larrow 2017.10.7
     * @memberof THING
     */
    class CameraController {
        constructor();

        /**
         * 世界坐标转换成屏幕坐标
         * @param {Array<Number>} position 世界坐标
         * @return {Array<Number>} 屏幕坐标
         */
        worldToScreen(position: number[]): number[];

        /**
         * 屏幕坐标转世界坐标
         * @param {Number} x 屏幕x坐标
         * @param {Number} y 屏幕y坐标
         * @return {Array<Number>} 世界坐标
         */
        screenToWorld(x: number, y: number): number[];

        /**
         * 摄像机自适应
         * @param {Object} param 参数列表
         * @param {THING.BaseObject} param.object 观察的物体
         * @param {Array<Number>} param.offset? 离目标点的偏移量(根据目标的坐标系进行偏移)
         * @param {Number} param.radius? 目标点半径
         * @param {Number} param.radiusFactor? 目标点半径倍数
         */
        fit(param: {
            object: BaseObject;
            "offset?": number[];
            "radius?": number;
            "radiusFactor?": number;
        }): void;

        /**
         * 停止飞行
         */
        stopFlying(): void;

        /**
         * 摄像机飞行到某位置
         * @param {Object} param 参数列表
         * @param {Number} param.time? 飞行过程的时间
         * @param {THING.BaseObject} param.object 观察的物体
         * @param {Array<Number>} param.target 观察的目标点位置
         * @param {Array<Number>} param.position? 摄像机位置
         * @param {Array<Number>} param.up? 摄像机up朝向
         * @param {Array<Number>} param.offset? 离目标点的偏移量(根据目标的坐标系进行偏移)
         * @param {Number} param.yAngle? Y 轴角度值
         * @param {Number} param.xAngle? X 轴角度值
         * @param {Number} param.radius? 目标点半径
         * @param {Number} param.radiusFactor? 目标点半径倍数
         * @param {THING.LerpType} param.lerpType? 插值方式
         * @param {THING.LerpType} param.positionLerp? 摄像机坐标插值方式
         * @param {THING.LerpType} param.targetLerp? 观察点插值方式
         * @param {THING.LerpType} param.upLerp? up朝向插值方式
         * @param {Function} param.complete? 飞行结束回调函数
         * @example
         * // 跳转到物体
         * app.camera.flyTo({
         * 		'time': 1500,
         * 		'object': obj,
         * 		'position':[0, 0, 0]
         * 	'complete': function() {
         *   	}
         * });
         * // 跳转到位置
         * app.camera.flyTo({
         * 		'time': 1500,
         * 		'position': [3.6, 4.8, -6.5],
         * 		'target': [-4.2, -3.2, -20.6],
         * 		'complete': function() {
         * 		}
         * });
         */
        flyTo(param: {
            "time?": number;
            object: BaseObject;
            target: number[];
            "position?": number[];
            "up?": number[];
            "offset?": number[];
            "yAngle?": number;
            "xAngle?": number;
            "radius?": number;
            "radiusFactor?": number;
            "lerpType?": LerpType;
            "positionLerp?": LerpType;
            "targetLerp?": LerpType;
            "upLerp?": LerpType;
            "complete?": ()=>any;
        }): void;

        /**
         * 看物体或位置
         * @param {Array|THING.BaseObject} target 物体或者坐标
         * @example
         * // 跳转到物体
         * app.camera.lookAt(app.query('car01')[0]);
         * app.camera.lookAt([20, 5.6, -6.6]);
         */
        lookAt(target: any[] | BaseObject): void;

        /**
         * 停止环绕旋转
         */
        stopRotateAround(): void;

        /**
         * 环绕旋转
         * @param {Object} params 参数列表
         * @param {THING.BaseObject} params.object? 围绕的物体
         * @param {Array<Number>} params.target? 围绕的世界坐标点
         * @param {Number} params.yRotateAngle? Y 轴旋转角度
         * @param {Number} params.xRotateAngle? X 轴旋转角度
         * @param {Number} params.time? 处理时间(毫秒)
         * @param {String} params.loopType? 循环类型
         * @param {Function} params.complete? 旋转完成回调函数
         * @example
         * app.camera.rotateAround({
         * object: car, // 环绕物体
         * time: 5000, // 环绕时间(毫秒)
         * yRotateAngle: 180, // 旋转角度
         * });
         */
        rotateAround(params: {
            "object?": BaseObject;
            "target?": number[];
            "yRotateAngle?": number;
            "xRotateAngle?": number;
            "time?": number;
            "loopType?": string;
            "complete?": ()=>any;
        }): void;

        /**
         * 跟随物体
         * @param {Object} params 参数列表
         * @param {THING.BaseObject} params.object 要跟随的物体
         * @param {Boolean} params.enableRotate? 是否禁用旋转操作
         * @param {Boolean} params.enableZoom? 是否禁用缩放操作
         */
        followObject(params: {
            object: BaseObject;
            "enableRotate?": boolean;
            "enableZoom?": boolean;
        }): void;

        /**
         * 停止跟随物体
         */
        stopFollowingObject(): void;

        /**
         * 向前/向后移动摄像机
         * @param {Number} distance 移动距离(+: 向前, -: 向后)
         * @param {Number} time 移动时间(毫秒)
         */
        zoom(distance: number, time?: number): void;

        /**
         * 移动摄像机
         * @param {Number} deltaX 水平移动距离
         * @param {Number} deltaY 垂直移动距离
         */
        move(deltaX: number, deltaY: number): void;

        /**
         * 根据物体包围盒检测是否在摄相机视锥内
         * @param {THING.BaseObject} object 物体
         * @return {Boolean}
         */
        isInView(object: BaseObject): boolean;

        /**
         * 设置2D/3D视图
         * @type {Number}
         */
        viewMode: number;

        /**
         * 获取摄像机投影类型
         * @type {String}
         */
        projectionType: string;

        /**
         * 设置摄像机插值因子，数值越小插值效果越明显
         * @type {Number}
         */
        dampingFactor: number;

        /**
         * 设置摄像机FOV
         * @type {Number}
         */
        fov: number;

        /**
         * 设置近裁剪面的距离，比这个距离近的物体将不会被看到
         * @type {Number}
         */
        near: number;

        /**
         * 设置远裁剪面的距离，超过这个距离的物体将不会被看到
         * @type {Number}
         */
        far: number;

        /**
         * 设置摄像机缩放系数范围[最小值, 最大值]
         * @type {Array<Number>}
         */
        zoomLimited: number[];

        /**
         * 设置摄像机距离范围[最小值, 最大值]
         * @type {Array<Number>}
         */
        distanceLimited: number[];

        /**
         * 设置摄像机垂直角度范围[最小值, 最大值]
         * @type {Array<Number>}
         */
        yAngleLimited: number[];

        /**
         * 设置摄像机水平角度范围[最小值, 最大值]
         * @type {Array<Number>}
         */
        xAngleLimited: number[];

        /**
         * 设置摄像机键盘平移速度
         * @type {Number}
         */
        keyPanSpeed: number;

        /**
         * 设置摄像机鼠标平移速度
         * @type {Number}
         */
        mousePanSpeed: number;

        /**
         * 获取当前和观察点的距离
         * @type {number}
         */
        distance: number;

        /**
         * 设置摄像机 UP 方向
         * @type {Array<number>}
         */
        up: number[];

        /**
         * 设置摄像机 镜头位置（眼睛位置）
         * @type {Array<number>}
         */
        position: number[];

        /**
         * 设置摄像机 看点位置
         * @type {Array<number>}
         */
        target: number[];

        /**
         * 开启/关闭摄像机操作
         * @type {Boolean}
         */
        inputEnabled: boolean;

        /**
         * 设置旋转生效
         * @type {Boolean}
         */
        enableRotate: boolean;

        /**
         * 设置缩放生效
         * @type {Boolean}
         */
        enableZoom: boolean;

        /**
         * 设置平移生效
         * @type {Boolean}
         */
        enablePan: boolean;

        /**
         * 获取是否在飞行
         * @type {Boolean}
         */
        flying: boolean;

        /**
         * 打印当前镜头位置和看点位置信息
         */
        log(): void;

    }

    /**
     * @class Mathics
     * 数学类
     * @author WJH 2018.09.12
     * @memberof THING
     */
    class Mathics {
        constructor();

        /**
         * 判断数值是否2次幂
         * @param {Number} num 数值
         * @return {Boolean}
         */
        isPowerOf2(num: number): boolean;

        /**
         * 向上取数值的2次幂
         * @param {Number} v 数值
         * @return {Number}
         */
        roundUpPowerOf2(v: number): number;

        /**
         * 数值取整
         * @param {Number} n 数值
         * @return {Number}
         */
        toInteger(n: number): number;

        /**
         * 数值截取[最小值, 最大值]
         * @param {Number} value 数值
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @return {Number}
         */
        clamp(value: number, min: number, max: number): number;

        /**
         * 获取随机浮点数值[最小值, 最大值]
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @return {Number}
         */
        randomFloat(min: number, max: number): number;

        /**
         * 获取随机整数数值[最小值, 最大值]
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @return {Number}
         */
        randomInt(min: number, max: number): number;

        /**
         * 获取随机颜色
         * @return {Number}
         */
        randomColor(): number;

        /**
         * 从数组随机挑选出任一元素
         * @param {Array<*>} arr 数组
         * @return {*} 元素
         */
        randomFromArray(arr: any[]): any;

        /**
         * 产生随机下标值 [0, number - 1]
         * @param {Number} number 总数
         * @return {Number}
         */
        randomIndex(number: number): number;

        /**
         * 随机产生坐标信息
         * @return {Array<Number>}
         */
        randomVector3(): number[];

        /**
         * 线性插值
         * @param {Number} start 起始值
         * @param {Number} end 终止值
         * @param {Number} percent 百分比(0~1)
         * @return {Number}
         */
        lerp(start: number, end: number, percent: number): number;

        /**
         * 获取两点间距离
         * @param {Array<Number>} v1 第一个坐标点
         * @param {Array<Number>} v2 第二个坐标点
         * @return {Number}
         */
        getDistance(v1: number[], v2: number[]): number;

        /**
         * 角度转弧度
         * @param {Number} degrees 角度
         * @return {Number}
         */
        degToRad(degrees: number): number;

        /**
         * 弧度转角度
         * @param {Number} radians 弧度
         * @return {Number}
         */
        radToDeg(radians: number): number;

        /**
         * 生成唯一的 UUID
         * @return {String}
         */
        generateUUID(): string;

        /**
         * 坐标相加
         * @param {Array<Number>} v1 坐标
         * @param {Array<Number>} v2 坐标
         * @return {Array<Number>}
         */
        addVector(v1: number[], v2: number[]): number[];

        /**
         * 坐标相减
         * @param {Array<Number>} v1 坐标
         * @param {Array<Number>} v2 坐标
         * @return {Array<Number>}
         */
        subVector(v1: number[], v2: number[]): number[];

        /**
         * 向量数乘
         * @param {Array<Number>} v 坐标
         * @param {Number} scale 缩放系数
         * @return {Array<Number>}
         */
        scaleVector(v: number[], scale: number): number[];

        /**
         * 向量点乘
         * @param {Array<Number>} v1 坐标
         * @param {Array<Number>} v2 坐标
         * @return {Number}
         */
        dotVector(v1: number[], v2: number[]): number;

        /**
         * 向量叉乘
         * @param {Array<Number>} v1 坐标
         * @param {Array<Number>} v2 坐标
         * @return {Number}
         */
        crossVector(v1: number[], v2: number[]): number;

        /**
         * 坐标取负
         * @param {Array<Number>} v 坐标
         * @return {Array<Number>}
         */
        negVector(v: number[]): number[];

        /**
         * 求单位向量
         * @param {Array<Number>} v 坐标
         * @return {Array<Number>}
         */
        normalizeVector(v: number[]): number[];

        /**
         * 获取最小值
         * @param {Array<Number>} positions 坐标列表
         * @return {Array<Number>}
         */
        minVector(positions: number[]): number[];

        /**
         * 获取最大值
         * @param {Array<Number>} positions 坐标列表
         * @return {Array<Number>}
         */
        maxVector(positions: number[]): number[];

        /**
         * 获取向量长度
         * @param {Array<Number>} v 坐标
         * @return {Number}
         */
        getVectorLength(v: number[]): number;

        /**
         * 获取向量长度
         * @param {Array<Number>} v 坐标
         * @return {Number}
         */
        getVectorLengthSquared(v: number[]): number;

        /**
         * 获取面积
         * @param {Array<Number>} positions 坐标列表
         * @return {Number}
         */
        getArea(positions: number[]): number;

        /**
         * 返回小数部分
         * @param {Number} x 数值
         * @return {Number}
         */
        fract(x: number): number;

        /**
         * 交换数组元素位置
         * @param {Array} arr 数组
         * @param {Number} index1 第一个元素位置
         * @param {Number} index2 第二个元素位置
         * @return {Array}
         */
        swapArray(arr: any[], index1: number, index2: number): any[];

        /**
         * 获取 v2 到 v1 的方向向量
         * @param {Array<Number>} v1 起点
         * @param {Array<Number>} v2 终点
         * @return {Array<Number>}
         */
        getDirection(v1: number[], v2: number[]): number[];

    }

    /**
     * @class Navigation
     * 导航寻路
     * @memberof THING
     */
    class Navigation {
        constructor();

        /**
         * 获取导航路径
         * @param {Object} params 参数列表
         * @param {String} params.startRoom? 起始房间，可以只提供世界坐标，但是同时提供房间的话，会提高寻路速度
         * @param {Array<Number>} params.startPosition 起始的世界坐标位置
         * @param {String} params.endRoom? 终止房间，可以只提供世界坐标，但是同时提供房间的话，会提高寻路速度
         * @param {Array<Number>} params.endPosition 终止的世界坐标位置
         * @return {Array<Number>} 路径节点(世界坐标集合), null 表示起始点和终止点之间不可达
         */
        findPath(params: {
            "startRoom?": string;
            startPosition: number[];
            "endRoom?": string;
            endPosition: number[];
        }): number[];

    }

    /**
     * @class Picker
     * 主要为支持gpu picker，同时兼容支持threejs的raycast
     * @author larrow 2017.12.2
     * @memberof THING
     */
    class Picker {
        constructor();

        /**
         * 检测当前帧的拾取物体是否发生了变化
         * @return {Boolean}
         */
        isChanged(): boolean;

        /**
         * 以当前摄像机的位置拾取物体, 按照距离从近到远返回物体列表信息
         * @param {Number} x 屏幕x坐标 (不提供则使用当前摄影机位置进行拾取)
         * @param {Number} y 屏幕y坐标 (不提供则使用当前摄影机位置进行拾取)
         * @param {Number} width 区域宽度 (提供则表示进行框选)
         * @param {Number} height 区域高度 (提供则表示进行框选)
         * @param {THING.Selector} candidates 框选物体列表
         * @return {Array<THING.BaseObject>} 物体列表
         */
        pickObjects(x: number, y: number, width: number, height: number, candidates: Selector): (BaseObject)[];

        /**
         * 开启框选
         * @param {Object} params 参数列表
         * @param {Number} params.x 屏幕 x 坐标
         * @param {Number} params.y 屏幕 y 坐标
         * @param {Boolean} params.realTimePicking? 是否实时框选(速度较慢)
         * @param {Boolean} params.drawRegion? 是否绘制框选区域
         */
        startAreaPicking(params: {
            x: number;
            y: number;
            "realTimePicking?": boolean;
            "drawRegion?": boolean;
        }): void;

        /**
         * 结束框选
         */
        endAreaPicking(): void;

        /**
         * 开启/禁用拾取功能
         * @type {Boolean}
         */
        enable: boolean;

        /**
         * 查询是否开启了区域选择功能
         * @type {Boolean}
         */
        areaPicking: boolean;

        /**
         * 设置框选候选集合, 因为框选速度较慢，所以这里需要先提供一个框选的候选列表
         * @type {THING.Selector}
         */
        areaCandidates: Selector;

        /**
         * 设置拾取对象回调函数
         * @type {Function}
         */
        pickedResultFunc: ()=>any;

        /**
         * 获取当前拾取物体(忽略物体过滤处理)
         * @type {THING.Selector}
         */
        results: Selector;

        /**
         * 获取当前拾取物体列表(执行物体过滤处理后)
         * @type {THING.Selector}
         */
        objects: Selector;

        /**
         * 获取上一帧拾取物体列表(执行物体过滤处理后)
         * @type {THING.Selector}
         */
        previousObjects: Selector;

    }

    /**
     * @class SceneLevel
     * 场景层次管理
     * @author WJH 2018.08.14
     * @memberof THING
     */
    class SceneLevel {
        constructor();

        /**
         * 改变场景层次
         * @param {THING.BaseObject} object 跳转的物体，以此决定跳转层次
         */
        change(object: BaseObject): void;

        /**
         * 返回父层级
         */
        back(): void;

        /**
         * 返回当前层级
         * @type {THING.BaseObject}
         */
        current: BaseObject;

        /**
         * 返回之前的层级
         * @type {THING.BaseObject}
         */
        previous: BaseObject;

    }

    /**
     * @class SceneRoot
     * 场景根节点
     * @memberof THING
     * @extends THING.BaseObject
     */
    class SceneRoot extends BaseObject {
        constructor();

        /**
         * 显示/隐藏场景
         * @type {boolean}
         */
        visible: boolean;

        /**
         * 获取默认园区
         * @type {THING.Campus}
         */
        defaultCampus: Campus;

        /**
         * 获取根节点下的物体
         * @type {THING.Selector}
         */
        things: Selector;

        /**
         * 获取园区数据
         * @type {THING.Selector}
         */
        campuses: Selector;

        /**
         * 开启/取消线框渲染方式
         * @type {string|Number} 颜色值, null 表示关闭线框渲染模式
         */
        wireframeColor: string | number;

    }

    /**
     * @class Selection
     * 物体选择集合
     * @author WJH 2018.11.20
     * @memberof THING
     */
    class Selection {
        constructor();

        /**
         * 选择物体
         * @param {THING.BaseObject} object 物体
         */
        select(object: BaseObject): void;

        /**
         * 取消选择物体
         * @param {THING.BaseObject} object 物体
         */
        deselect(object: BaseObject): void;

        /**
         * 查询物体是否被选择
         * @param {THING.BaseObject} object 物体
         * @return {Boolean}
         */
        has(object: BaseObject): boolean;

        /**
         * 清空选择物体
         */
        clear(): void;

        /**
         * 查询当前帧物体选择集合是否发生过改变
         * @return {Boolean}
         */
        isChanged(): boolean;

        /**
         * 获取当前帧选择物体集合
         * @type {THING.Selector}
         */
        objects: Selector;

        /**
         * 获取上一帧选择物体集合
         * @type {THING.Selector}
         */
        previousObjects: Selector;

    }

    /**
     * @class SelectorStyle
     * 物体效果处理集合
     * @memberof THING
     */
    class SelectorStyle {
        constructor();

        /**
         * 设置渲染排序值
         * @type {Number}
         */
        renderOrder: number;

        /**
         * 设置颜色
         * @type {Number|String}
         */
        color: number | string;

        /**
         * 设置透明度(0~1)
         * @type {Number}
         */
        opacity: number;

        /**
         * 设置勾边颜色
         * @type {Number|String}
         */
        outlineColor: number | string;

        /**
         * 设置默认勾边颜色
         * @type {Number|String}
         */
        defaultOutlineColor: number | string;

        /**
         * 忽略/禁用勾边
         * @type {Boolean}
         */
        skipOutline: boolean;

        /**
         * 开启/关闭线框模式
         * @type {Boolean}
         */
        wireframe: boolean;

        /**
         * 显示/隐藏自身坐标系
         * @type {Boolean}
         */
        axisHelper: boolean;

        /**
         * 显示/隐藏包围盒
         * @type {Boolean}
         */
        boundingBox: boolean;

        /**
         * 设置包围盒颜色
         * @type {Number|String}
         */
        boundingBoxColor: number | string;

        /**
         * 设置始终在最后渲染
         * @type {Boolean}
         */
        alwaysOnTop: boolean;

        /**
         * 设置外发光
         * @type {Boolean}
         */
        glow: boolean;

        /**
         * 设置内发光
         * @type {Boolean}
         */
        innerGlow: boolean;

        /**
         * 设置材质
         * @param {Object} params 材质参数
         */
        setMaterial(params: any): void;

    }

    /**
     * @class Selector
     * 选择器
     * @see http://api.jquery.com/category/traversing/
     * @author larrow 2017.10.3
     * @memberof THING
     */
    class Selector {
        constructor();

        /**
         * 物体查询
         * @param {*} param 参数列表
         * @return {Array<THING.BaseObject>} 查询结果，注意是以数组的方式提供，如果什么都没有找到就返回 []
         * @example
         * app.query('car01') 查询名称为car01的对象
         * app.query('.Thing') 查询类型为Thing的对象
         * app.query('#001') 查询id为001的对象
         * app.query('#id > 1000') 查询id>1000的对象，要求id为数值类型，不然无法识别出来
         * app.query('[prop=value]') 查询id为001的对象，支持*属性模糊匹配[Group=Outside*]
         * app.query('.Thing|[prop=value]') 满足条件1 或条件2,...
         * 字符串部分参考：http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp
         */
        query(param: any): (BaseObject)[];

        /**
         * 从当前查询结果中移除对象
         * @param {*}
         */
        remove(param: any): void;

        /**
         * 从当前查询结果中添加部分对象
         * @param {*} param 参数列表
         * @example
         * sel.add(sel).add('car01').add([obj1, obj2]).add(obj);
         */
        add(param: any): void;

        /**
         * 从当前查询结果中排除部分对象
         * @param {*} param 参数列表
         * @example
         * 可以 .not(sel).not('car01').not([obj1, obj2]).not(obj);
         */
        not(param: any): void;

        /**
         * 清空
         */
        clear(): void;

        /**
         * 遍历对象
         * @param {Function} callback 回调函数
         */
        forEach(callback: ()=>any): void;

        /**
         * 转换成 JSON 字符串
         */
        toJSON(): void;

        /**
         * 转换成数组遍历对象
         * @return {Array} 数组
         */
        toArray(): any[];

        /**
         * 获取物体下标值
         * @param {THING.BaseObject} object 物体
         * @return {Number} 下标值, -1 表示不存在
         */
        indexOf(object: BaseObject): number;

        /**
         * 删除物体
         * @param {Number} index 下标值
         * @param {Number} number 删除总数
         */
        splice(index: number, number: number): void;

        /**
         * 反转数组
         * @return {THING.Selector}
         */
        reverse(): Selector;

        /**
         * 是否拥有此物体
         * @param {THING.BaseObject} object 物体
         * @return {Boolean}
         */
        has(object: BaseObject): boolean;

        /**
         * 淡入
         * @param {Object} param
         * @param {Number} param.time 淡入时间
         * @param {Function} param.complete 完成回调
         */
        fadeIn(param: {
            time: number;
            complete: ()=>any;
        }): void;

        /**
         * 淡出
         * @param {Object} param
         * @param {Number} param.time 淡出时间
         * @param {Function} param.complete 完成回调
         */
        fadeOut(param: {
            time: number;
            complete: ()=>any;
        }): void;

        /**
         * 销毁选择器里的所有对象
         */
        destroyAll(): void;

        /**
         * 绑定事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} userData 事件绑定自定义数据, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} cb 事件触发的回调函数
         * @param {String} tag? 事件名字标记
         */
        on(eventType: string, selector: string, userData: any, cb: ()=>any, tag?: string): void;

        /**
         * 解绑事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Function} cb 事件触发的回调函数
         */
        off(eventType: string, selector: string, cb: ()=>any): void;

        /**
         * 绑定事件(只触发一次)
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} userData 事件绑定自定义数据, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} callback 事件触发的回调函数
         * @param {String} tag? 事件名字标记
         * @example
         * app.one('click', '.Building', function(ev) {...});
         * app.one('click', '.Thing', {id: 1, hit: false}, function(ev) {...});
         * app.one('update', function(ev) {...});
         */
        one(eventType: string, selector: string, userData: any, callback: ()=>any, tag?: string): void;

        /**
         * 发送事件
         * @param {String} eventType 事件名称
         * @param {Object} ev 事件信息
         * @param {String} tag? 事件名字标记
         */
        trigger(eventType: string, ev: any, tag?: string): void;

        /**
         * 暂停事件响应
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        pauseEvent(eventType: string, selector: string, tag?: string): void;

        /**
         * 暂停事件响应(当前帧，下一帧恢复响应)
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        pauseEventInFrame(eventType: string, selector: string, tag?: string): void;

        /**
         * 恢复事件响应
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        resumeEvent(eventType: string, selector: string, tag?: string): void;

        /**
         * 设置显示隐藏
         * @type {Boolean} value 是否显示
         */
        visible: boolean;

        /**
         * 设置是否能被拾取
         * @type {Boolean} value 是否能被拾取
         */
        pickable: boolean;

        /**
         * 获取效果集合
         * @type {THING.SelectorStyle}
         */
        style: SelectorStyle;

    }

    /**
     * @class Utils
     * 工具辅助类
     * @memberof THING
     */
    class Utils {
        constructor();

        /**
         * 判断是否布尔值
         * @memberof THING.Utils
         * @param {*} value js元素
         * @return {boolean}
         */
        static isBoolean(value: any): boolean;

        /**
         * 判断是否DOM元素
         * @memberof THING.Utils
         * @param {*} value js元素
         * @return {boolean}
         */
        static isDom(value: any): boolean;

        /**
         * 判断是否空
         * @memberof THING.Utils
         * @param {*} o js元素
         * @return {boolean}
         */
        static isNull(o: any): boolean;

        /**
         * 判断是否空白字符串
         * @memberof THING.Utils
         * @param {*} o js元素
         * @return {boolean}
         */
        static isBlank(o: any): boolean;

        /**
         * 判断是否空结构体
         * @memberof THING.Utils
         * @param {*} o js元素
         * @return {boolean}
         */
        static isEmptyObj(o: any): boolean;

        /**
         * 判断是否空数组
         * @memberof THING.Utils
         * @param {*} o js元素
         * @return {boolean}
         */
        static isEmptyArray(o: any): boolean;

        /**
         * 字符串转成小写
         * @memberof THING.Utils
         * @param {string} s 字符串
         * @return {string}
         */
        static toLowerCase(s: string): string;

        /**
         * 成员键值全部转换成小写
         * @memberof THING.Utils
         * @param {Object} input 要处理的 js 对象
         * @param {Boolean} deep 是否需要转换所有的键值
         * @param {Function} filter 键值过滤函数
         * @return {Object}
         */
        static objectKeysToLowerCase(input: any, deep: boolean, filter: ()=>any): any;

        /**
         * 生成唯一的 UUID
         * @return {String}
         */
        static generateUUID(): string;

        /**
         * 克隆对象
         * @memberof THING.Utils
         * @param {Object} obj js对象
         * @param {Boolean} shallow 是否进行浅层克隆, 如果是 false 则会完全进行克隆处理
         * @return {Object}
         */
        static cloneObject(obj: any, shallow: boolean): any;

        /**
         * 合并简单对象
         * @memberof THING.Utils
         * @param {object} target 目标结构体
         * @param {object} source 源结构体
         * @param {boolean} overwrite 是否更新已经存在的属性
         * @return {object}
         */
        static mergeObject(target: object, source: object, overwrite: boolean): object;

        /**
         * 判断结构体是否完全相等
         * @memberof THING.Utils
         * @param {Object} o1 第一个结构体
         * @param {Object} o2 第二个结构体
         * @return {Boolean}
         */
        static isEqual(o1: any, o2: any): boolean;

        /**
         * 异步加载 css文件、js文件、文本文件(html、text、json)
         * @memberof THING.Utils
         * @param {String|Array<String>} urls 文件路径
         * @param {Function} callback 加载完成后回调方法
         * @return {Object}
         */
        static dynamicLoad(urls: string | string[], callback: ()=>any): any;

        /**
         * 添加物体类型转换规则
         * @param {String} type 物体类名
         * @param {String} condition 转换条件, 比如使用 /name/ 进行正则表达式匹配，能匹配上的才能进行转换
         * @param {String} params? 新类型默认创建参数, 在转换成新类型后，会成为替换创建参数列表
         * @example
         * 1. 我们想把 id 为 1 的物体转换成 '.Cabinet' 类型，则可以通过以下接口实现
         *  THING.Utils.addCastType('Cabinet', '#1');
         * 2. 我们想把名字包含 'spotLight' 的物体都转换成 '.Cabinet' 类型，则可以通过以下接口实现
         *  THING.Utils.addCastType('Cabinet', /spotLight/);
         * 调用之后在场景加载的过程中，符合条件的物体都会以指定的类型创建
         */
        static addCastType(type: string, condition: string, params?: string): void;

        /**
         * 删除物体类型转换规则
         * @param {String} type 物体类名
         * @param {String} condition 转换条件
         * @param {String} params? 新类型默认创建参数
         */
        static removeCastType(type: string, condition: string, params?: string): void;

        /**
         * 异步执行函数
         * @param {Function} callback 回调函数
         * @example
         * THING.Utils.runAsync(function() {
         *  // ...
         * });
         */
        static runAsync(callback: ()=>any): void;

    }

    /**
     * @class Version
     * 标记封装类
     * @author WJH 2018.09.12
     * @memberof THING
     */
    class Version {
        constructor();

    }

    /**
     * 摄像机类型
     * @enum {String}
     * @readonly
     * @memberof THING
     */
    const enum CameraProjectionType {
        /**
         * 投影方式
         */
        Perspective,
        /**
         * 正交方式
         */
        Orthographic,
    }

    /**
     * 摄像机类型，用于摄像机2D/3D视角切换
     * @enum {String}
     * @readonly
     * @memberof THING
     */
    const enum CameraView {
        /**
         * 正常视角
         */
        Normal,
        /**
         * 顶部视角
         */
        TopView,
        /**
         * 左边视角(未实现)
         */
        LeftView,
        /**
         * 右边视角(未实现)
         */
        RightView,
        /**
         * 前视角(未实现)
         */
        FrontView,
        /**
         * 后视角(未实现)
         */
        BackView,
    }

    /**
     * 插值类型
     * @typedef {Object} LerpType
     * @property {Object} Linear 线性插值
     * @property {Function} Linear.None 线性插值
     * @property {Object} Quadratic 二次插值
     * @property {Function} Quadratic.In 二次插值(In)
     * @property {Function} Quadratic.Out 二次插值(In)
     * @property {Function} Quadratic.InOut 二次插值(InOut)
     * @property {Object} Cubic 三次曲线插值
     * @property {Function} Cubic.In 三次插值(In)
     * @property {Function} Cubic.Out 三次插值(In)
     * @property {Function} Cubic.InOut 三次插值(InOut)
     * @property {Object} Quartic 四次插值
     * @property {Function} Quartic.In 四次插值(In)
     * @property {Function} Quartic.Out 四次插值(In)
     * @property {Function} Quartic.InOut 四次插值(InOut)
     * @property {Object} Quintic 五次插值
     * @property {Function} Quintic.In 五次插值(In)
     * @property {Function} Quintic.Out 五次插值(In)
     * @property {Function} Quintic.InOut 五次插值(InOut)
     * @property {Object} Sinusoidal 正弦曲线插值
     * @property {Function} Sinusoidal.In 正弦曲线插值(In)
     * @property {Function} Sinusoidal.Out 正弦曲线插值(In)
     * @property {Function} Sinusoidal.InOut 正弦曲线插值(InOut)
     * @property {Object} Exponential 指数插值
     * @property {Function} Exponential.In 指数插值(In)
     * @property {Function} Exponential.Out 指数插值(In)
     * @property {Function} Exponential.InOut 指数插值(InOut)
     * @property {Object} Circular 迂回插值
     * @property {Function} Circular.In 迂回插值(In)
     * @property {Function} Circular.Out 迂回插值(In)
     * @property {Function} Circular.InOut 迂回插值(InOut)
     * @property {Object} Elastic 弹性插值
     * @property {Function} Elastic.In 弹性插值(In)
     * @property {Function} Elastic.Out 弹性插值(In)
     * @property {Function} Elastic.InOut 弹性插值(InOut)
     * @property {Object} Back Back 插值
     * @property {Function} Back.In Back 插值(In)
     * @property {Function} Back.Out Back 插值(In)
     * @property {Function} Back.InOut Back 插值(InOut)
     * @property {Object} Bounce 弹跳插值
     * @property {Function} Bounce.In 弹跳插值(In)
     * @property {Function} Bounce.Out 弹跳插值(In)
     * @property {Function} Bounce.InOut 弹跳插值(InOut)
     * @memberof THING
     * @see http://sole.github.io/tween.js/examples/03_graphs.html
     */
    type LerpType = {
        Linear: {
            None: ()=>any;
        };
        Quadratic: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Cubic: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Quartic: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Quintic: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Sinusoidal: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Exponential: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Circular: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Elastic: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Back: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
        Bounce: {
            In: ()=>any;
            Out: ()=>any;
            InOut: ()=>any;
        };
    };

    /**
     * 坐标空间位置类型
     * @typedef {Object} SpaceType
     * @property {Number} Self 针对自身坐标系
     * @property {Number} Local 针对父物体坐标系
     * @property {Number} World 针对世界坐标系
     * @memberof THING
     */
    type SpaceType = {
        Self: number;
        Local: number;
        World: number;
    };

    /**
     * 拖拽状态
     * @enum {String}
     * @readonly
     * @memberof THING
     */
    const enum DragState {
        /**
         * 非拖拽模式
         */
        No,
        /**
         * 拖拽中
         */
        Dragging,
        /**
         * 拖拽结束
         */
        DragEnd,
    }

    /**
     * 循环类型
     * @enum {String}
     * @readonly
     * @memberof THING
     */
    const enum LoopType {
        /**
         * 不循环，只执行一次
         */
        No,
        /**
         * 不断循环
         */
        Repeat,
        /**
         * 来回不断循环
         */
        PingPong,
    }

    /**
     * 天空盒资源
     * @enum {string}
     * @readonly
     * @memberof THING
     */
    const enum SkyBox {
        /**
         * BlueSky
         */
        BlueSky,
        /**
         * MilkyWay
         */
        MilkyWay,
        /**
         * Night
         */
        Night,
        /**
         * SunCloud
         */
        SunCloud,
    }

    /**
     * 层级标识
     * @enum {string}
     * @readonly
     * @memberof THING
     */
    const enum LevelType {
        /**
         * 未知层级
         */
        Unknown,
        /**
         * 园区层级
         */
        Campus,
        /**
         * 建筑层级
         */
        Building,
        /**
         * 楼层层级
         */
        Floor,
        /**
         * 房间层级
         */
        Room,
        /**
         * 物体层级
         */
        Thing,
    }

    /**
     * 按键键值
     * @enum {number}
     * @readonly
     * @memberof THING
     */
    const enum KeyType {
        /**
         * Backspace
         */
        Backspace,
        /**
         * Tab
         */
        Tab,
        /**
         * Enter
         */
        Enter,
        /**
         * Shift
         */
        Shift,
        /**
         * Ctrl
         */
        Ctrl,
        /**
         * Alt
         */
        Alt,
        /**
         * Pause
         */
        Pause,
        /**
         * Capslock
         */
        Capslock,
        /**
         * Escape
         */
        Escape,
        /**
         * Space
         */
        Space,
        /**
         * PageUp
         */
        PageUp,
        /**
         * PageDown
         */
        PageDown,
        /**
         * End
         */
        End,
        /**
         * Home
         */
        Home,
        /**
         * Left
         */
        Left,
        /**
         * Up
         */
        Up,
        /**
         * Right
         */
        Right,
        /**
         * Down
         */
        Down,
        /**
         * Insert
         */
        Insert,
        /**
         * Delete
         */
        Delete,
        /**
         * Key0
         */
        Key0,
        /**
         * Key1
         */
        Key1,
        /**
         * Key2
         */
        Key2,
        /**
         * Key3
         */
        Key3,
        /**
         * Key4
         */
        Key4,
        /**
         * Key5
         */
        Key5,
        /**
         * Key6
         */
        Key6,
        /**
         * Key7
         */
        Key7,
        /**
         * Key8
         */
        Key8,
        /**
         * Key9
         */
        Key9,
        /**
         * A
         */
        A,
        /**
         * B
         */
        B,
        /**
         * C
         */
        C,
        /**
         * D
         */
        D,
        /**
         * E
         */
        E,
        /**
         * F
         */
        F,
        /**
         * G
         */
        G,
        /**
         * H
         */
        H,
        /**
         * I
         */
        I,
        /**
         * J
         */
        J,
        /**
         * K
         */
        K,
        /**
         * L
         */
        L,
        /**
         * M
         */
        M,
        /**
         * N
         */
        N,
        /**
         * O
         */
        O,
        /**
         * P
         */
        P,
        /**
         * Q
         */
        Q,
        /**
         * R
         */
        R,
        /**
         * S
         */
        S,
        /**
         * T
         */
        T,
        /**
         * U
         */
        U,
        /**
         * V
         */
        V,
        /**
         * W
         */
        W,
        /**
         * X
         */
        X,
        /**
         * Y
         */
        Y,
        /**
         * Z
         */
        Z,
        /**
         * Select
         */
        Select,
        /**
         * Numpad0
         */
        Numpad0,
        /**
         * Numpad1
         */
        Numpad1,
        /**
         * Numpad2
         */
        Numpad2,
        /**
         * Numpad3
         */
        Numpad3,
        /**
         * Numpad4
         */
        Numpad4,
        /**
         * Numpad5
         */
        Numpad5,
        /**
         * Numpad6
         */
        Numpad6,
        /**
         * Numpad7
         */
        Numpad7,
        /**
         * Numpad8
         */
        Numpad8,
        /**
         * Numpad9
         */
        Numpad9,
        /**
         * Multiply
         */
        Multiply,
        /**
         * Add
         */
        Add,
        /**
         * Subtract
         */
        Subtract,
        /**
         * Decimal
         */
        Decimal,
        /**
         * Divide
         */
        Divide,
        /**
         * F1
         */
        F1,
        /**
         * F2
         */
        F2,
        /**
         * F3
         */
        F3,
        /**
         * F4
         */
        F4,
        /**
         * F5
         */
        F5,
        /**
         * F6
         */
        F6,
        /**
         * F7
         */
        F7,
        /**
         * F8
         */
        F8,
        /**
         * F9
         */
        F9,
        /**
         * F10
         */
        F10,
        /**
         * F11
         */
        F11,
        /**
         * F12
         */
        F12,
        /**
         * Numlock
         */
        Numlock,
        /**
         * Scrolllock
         */
        Scrolllock,
        /**
         * Semicolon
         */
        Semicolon,
        /**
         * EqualSign
         */
        EqualSign,
        /**
         * Comma
         */
        Comma,
        /**
         * Dash
         */
        Dash,
        /**
         * Period
         */
        Period,
        /**
         * ForwardSlash
         */
        ForwardSlash,
        /**
         * GraveAccent
         */
        GraveAccent,
        /**
         * OpenBracket
         */
        OpenBracket,
        /**
         * BackSlash
         */
        BackSlash,
        /**
         * CloseBraket
         */
        CloseBraket,
        /**
         * SingleQuote
         */
        SingleQuote,
    }

    /**
     * 内核事件Tag名称
     * @enum {string}
     * @readonly
     * @memberof THING
     */
    const enum EventTag {
        /**
         * 默认行为
         */
        Default,
        /**
         * 通知场景层次中准备更改背景
         */
        LevelSetBackground,
        /**
         * 通知场景层次设置后期效果操作
         */
        LevelSetPostEffect,
        /**
         * 通知场景层次响应
         */
        LevelSceneOperations,
        /**
         * 通知场景层次设置候选集合
         */
        LevelPickedResultFunc,
        /**
         * 通知场景层次中摄像机飞行
         */
        LevelFly,
        /**
         * 通知场景层次中摄像机飞行打断处理
         */
        LevelFlyBreak,
        /**
         * 通知场景层次中拾取操作
         */
        LevelPickOperation,
        /**
         * 通知场景层次进入操作
         */
        LevelEnterOperation,
        /**
         * 通知场景层次回退操作
         */
        LevelBackOperation,
        /**
         * @private
         */
        LevelPickMethod,
        /**
         * @private
         */
        LevelEnterMethod,
        /**
         * @private
         */
        LevelBackMethod,
    }

    /**
     * 内核事件
     * @enum {string}
     * @readonly
     * @memberof THING
     */
    const enum EventType {
        /**
         * 通知系统初始化完成
         */
        Complete,
        /**
         * 通知窗口大小变化(width, height)
         */
        Resize,
        /**
         * 通知每帧更新
         */
        Update,
        /**
         * 通知场景资源加载进度
         */
        Progress,
        /**
         * 通知物体将要被加载
         */
        BeforeLoad,
        /**
         * 通知物体加载完成
         */
        Load,
        /**
         * 通知物体卸载
         */
        Unload,
        /**
         * 通知鼠标按下事件，注意只要是鼠标按下就会触发(双击的时候也会被触发两次)
         */
        Click,
        /**
         * 通知鼠标左键双击
         */
        DBLClick,
        /**
         * 通知鼠标点击(会有些许的延时，区别于Click事件的是只会响应单击事件,鼠标双击的话是不会触发的)
         */
        SingleClick,
        /**
         * 通知鼠标键抬起
         */
        MouseUp,
        /**
         * 通知鼠标键按下
         */
        MouseDown,
        /**
         * 通知鼠标移动
         */
        MouseMove,
        /**
         * 通知鼠标滚轮滚动
         */
        MouseWheel,
        /**
         * 通知鼠标首次移入物体
         */
        MouseEnter,
        /**
         * 通知鼠标首次移入物体, 会一直传递到父物体
         */
        MouseOver,
        /**
         * 通知鼠标首次移出物体
         */
        MouseLeave,
        /**
         * 通知物体拖拽开始
         */
        DragStart,
        /**
         * 通知物体拖拽进行中
         */
        Drag,
        /**
         * 通知物体拖拽结束
         */
        DragEnd,
        /**
         * 通知键盘按键按下
         */
        KeyDown,
        /**
         * 通知键盘按键一直被按下
         */
        KeyPress,
        /**
         * 通知键盘按键抬起
         */
        KeyUp,
        /**
         * 通知摄像机位置变动开始
         */
        CameraChangeStart,
        /**
         * 通知摄像机位置变动结束
         */
        CameraChangeEnd,
        /**
         * 通知摄像机位置变动中
         */
        CameraChange,
        /**
         * 摄像机向前/后滚动
         */
        CameraZoom,
        /**
         * 通知摄像机观察模式改动
         */
        CameraViewChange,
        /**
         * 通知物体创建完成
         */
        Create,
        /**
         * 通知物体准备被删除
         */
        Destroy,
        /**
         * 通知物体被展开
         */
        Expand,
        /**
         * 通知物体被合并
         */
        Unexpand,
        /**
         * 通知物体被拾取
         */
        Pick,
        /**
         * 通知物体被取消拾取
         */
        Unpick,
        /**
         * 通知物体拾取对象更新
         */
        PickChange,
        /**
         * 通知框选物体开始
         */
        AreaPickStart,
        /**
         * 通知框选物体中
         */
        AreaPicking,
        /**
         * 通知框选物体结束
         */
        AreaPickEnd,
        /**
         * 通知物体被选择
         */
        Select,
        /**
         * 通知物体被取消选择
         */
        Deselect,
        /**
         * 通知物体选择集合更新
         */
        SelectionChange,
        /**
         * 通知场景层次发生改变
         */
        LevelChange,
        /**
         * 通知进入物体层级
         */
        EnterLevel,
        /**
         * 通知退出物体层级
         */
        LeaveLevel,
        /**
         * 通知摄像机飞入物体层级进入完成
         */
        LevelFlyEnd,
        /**
         * @private
         */
        AppComplete,
        /**
         * @private
         */
        LoadCampusProgress,
        /**
         * @private
         */
        LoadCampus,
        /**
         * @private
         */
        UnloadCampus,
        /**
         * @private
         */
        PickObject,
        /**
         * @private
         */
        Dragging,
        /**
         * @private
         */
        CreateObject,
        /**
         * @private
         */
        DestroyObject,
        /**
         * @private
         */
        ExpandBuilding,
        /**
         * @private
         */
        UnexpandBuilding,
        /**
         * @private
         */
        SelectObject,
        /**
         * @private
         */
        DeselectObject,
        /**
         * @private
         */
        ObjectSelectionChanged,
        /**
         * @private
         */
        PickedObjectChanged,
        /**
         * @private
         */
        BeforeLevelChange,
    }

    /**
     * 物体控制轴
     * @class AxisTransformControl
     * @memberof THING
     */
    class AxisTransformControl {
    }

    /**
     * 数学库
     * @type {THING.Mathics}
     */
    const Math: Mathics;

    /**
     * @class BaseObject
     * 基础物体类型
     * @author larrow 2017.9
     * @memberof THING
     */
    class BaseObject {
        constructor();

        /**
         * 添加子物体
         * @param {THING.BaseObject|*} params 物体或者参数列表
         * @param {THING.BaseObject} params.object 物体
         * @param {Number[]} params.localPosition? 偏移量
         * @param {Number[]} params.angles? 旋转角度
         * @param {String} params.basePoint? 基准子节点名字，如果不提供则保持当前位置进行添加
         * @param {Boolean} params.keepNode? 是否保持原有的渲染结构不变
         * @param {Number} index? 插入下标，默认插入到最后位置
         */
        add(params: {
            object: BaseObject;
            "localPosition?": number[];
            "angles?": number[];
            "basePoint?": string;
            "keepNode?": boolean;
        }, index?: number): void;

        /**
         * 移除子物体
         * @param {THING.BaseObject} object 物体
         */
        remove(object: BaseObject): void;

        /**
         * 交换子物体位置
         * @param {THING.BaseObject} object1 第一个物体
         * @param {THING.BaseObject} object2 第二个物体
         */
        swapChild(object1: BaseObject, object2: BaseObject): void;

        /**
         * 检测是否拥有此子物体
         * @param {THING.BaseObject} object 物体
         * @return {Boolean}
         */
        hasChild(object: BaseObject): boolean;

        /**
         * 销毁自身
         */
        destroy(): void;

        /**
         * 是否能被拾取
         * @type {Boolean}
         */
        pickable: boolean;

        /**
         * 从世界坐标位置转换成自身的坐标系坐标位置
         * @param {Array<number>} worldPos 世界坐标
         * @return {Array<number>} 相对于自身坐标系偏移量
         */
        worldToSelf(worldPos: number[]): number[];

        /**
         * 从自身的坐标系坐标位置转换成世界坐标位置
         * @param {Array<number>} localPos 相对于自身坐标系偏移量
         * @return {Array<number>} 世界坐标
         */
        selfToWorld(localPos: number[]): number[];

        /**
         * 计算距离
         * @param {Array<number>|THING.BaseObject} position 世界坐标位置或者物体(取物体的世界坐标)
         * @return {Number} 距离
         */
        distanceTo(position: number[] | BaseObject): number;

        /**
         * 设置观察朝向
         * @param {Array<Number>|THING.BaseObject|THING.CameraController} target 世界坐标、物体或者摄像机(null 表示取消观察朝向)
         * @param {Array<Number>} angles? 叠加的修正值
         */
        lookAt(target: number[] | BaseObject | CameraController, angles?: number[]): void;

        /**
         * 让物体按照指定轴旋转(默认Y轴)
         * @param {Number} angle 角度值
         * @param {Array<number>} axis 方向轴，默认使用up朝向
         */
        rotate(angle: number, axis: number[]): void;

        /**
         * 沿x轴转
         * @param {Number} value x轴角度
         */
        rotateX(value: number): void;

        /**
         * 沿y轴转
         * @param {Number} value y轴角度
         */
        rotateY(value: number): void;

        /**
         * 沿z轴转
         * @param {Number} value z轴角度
         */
        rotateZ(value: number): void;

        /**
         * 绕点旋转
         * @param {Object} params 参数列表
         * @param {THING.BaseObject} params.object? 围绕的物体
         * @param {Array<Number>} params.target? 围绕点的世界坐标
         * @param {Number} params.angle? 水平旋转角度
         * @param {Number} params.time? 处理时间(毫秒)
         * @param {Number} params.speed? 速度
         * @param {String} params.loopType? 循环类型
         * @param {Function} params.complete? 旋转完成回调函数
         * @see https://en.wikipedia.org/wiki/Spherical_coordinate_system
         */
        rotateAround(params: {
            "object?": BaseObject;
            "target?": number[];
            "angle?": number;
            "time?": number;
            "speed?": number;
            "loopType?": string;
            "complete?": ()=>any;
        }): void;

        /**
         * 在一段时间内进行旋转处理
         * @param {Object} params 参数列表
         * @param {Array<number>} params.angles 旋转角度
         * @param {Number} params.time? 旋转总时间
         * @param {Number} params.speed? 旋转速度
         * @param {Function} params.complete? 完成时的回调
         * @param {THING.LerpType} params.lerpType? 插值类型
         * @example
         * obj.rotateTo({
         *         'angles': [45, 45, 45],     // 旋转角度
         *         'time': 12000,              // 总时间
         *         'complete': function () {
         *             console.log('scale completed');  // 旋转结束回调
         *         }
         *     });
         */
        rotateTo(params: {
            angles: number[];
            "time?": number;
            "speed?": number;
            "complete?": ()=>any;
            "lerpType?": LerpType;
        }): void;

        /**
         * 停止旋转处理
         */
        stopRotating(): void;

        /**
         * 在一段时间内进行缩放处理
         * @param {Object} params
         * @param {Array<number>} params.scale 缩放值
         * @param {Number} params.time? 缩放总时间
         * @param {Number} params.speed? 缩放速度
         * @param {Function} params.complete? 完成时的回调
         * @param {THING.LerpType} params.lerpType? 插值类型
         * @param {String} params.loopType? 循环类型
         * @example
         * obj.scaleTo({
         *         'scale': [2, 2, 2],         // 缩放值
         *         'time': 12000,              // 总时间
         *         'complete': function () {
         *             console.log('scale completed');  // 缩放结束回调
         *         }
         *     });
         */
        scaleTo(params: {
            scale: number[];
            "time?": number;
            "speed?": number;
            "complete?": ()=>any;
            "lerpType?": LerpType;
            "loopType?": string;
        }): void;

        /**
         * 停止缩放处理
         */
        stopScaling(): void;

        /**
         * 绑定事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} userData 事件绑定自定义数据, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} callback 事件触发的回调函数
         * @param {String} tag? 事件名字标记
         * @param {Number} priority? 优先级，数值越大优先级越高
         * @example
         * object.on('click', {id: 1, hit: false}, function(ev) {...});
         * object.on('update', function(ev) {...});
         */
        on(eventType: string, selector: string, userData: any, callback: ()=>any, tag?: string, priority?: number): void;

        /**
         * 解绑事件
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Function} callback 事件触发的回调函数
         */
        off(eventType: string, selector: string, callback: ()=>any): void;

        /**
         * 绑定事件(只触发一次)
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {Object} userData 事件绑定自定义数据, 如果是 Function 类型，也表示回调函数参数
         * @param {Function} callback 事件触发的回调函数
         * @param {String} tag? 事件名字标记
         * @param {Number} priority ? 优先级，数值越大优先级越高
         */
        one(eventType: string, selector: string, userData: any, callback: ()=>any, tag?: string, priority: number): void;

        /**
         * 查询是否绑定了某个事件
         * @param {String} eventType 事件名称
         * @param {String|Function} tag 标识名字或者回调函数
         * @param {Boolean} ignorePaused 是否忽略被停止事件
         * @return {Boolean} 是否已经成功绑定
         */
        hasEvent(eventType: string, tag: string | (()=>any), ignorePaused?: boolean): boolean;

        /**
         * 发送事件
         * @param {String} eventType 事件名称
         * @param {Object} ev 事件信息
         * @param {String} tag? 事件名字标记
         */
        trigger(eventType: string, ev: any, tag?: string): void;

        /**
         * 暂停事件响应
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        pauseEvent(eventType: string, selector: string, tag?: string): void;

        /**
         * 暂停事件响应(当前帧，下一帧恢复响应)
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        pauseEventInFrame(eventType: string, selector: string, tag?: string): void;

        /**
         * 恢复事件响应
         * @param {String} eventType 事件名称
         * @param {String} selector 物体类型选择信息
         * @param {String} tag? 事件名字标记
         */
        resumeEvent(eventType: string, selector: string, tag?: string): void;

        /**
         * 获取子部件
         * @type {THING.Selector}
         */
        subNodes: Selector;

        /**
         * 遍历自己和所有子物体
         * @param {Function} callback 回调函数
         * @param {Boolean} recursive 是否以递归方式遍历
         */
        traverse(callback: ()=>any, recursive?: boolean): void;

        /**
         * 在子物体中查询
         * @param {Object} param 参数列表
         * @param {Boolean} recursive 是否递归查询所有子物体, 默认true
         * @return {Array<THING.BaseObject>} 查询结果，注意是以数组的方式提供，如果什么都没有找到就返回 []
         * @example
         * app.query('car01') 查询名称为car01的对象
         * app.query('.Thing') 查询类型为Thing的对象
         * app.query('#001') 查询id为001的对象
         * app.query('[prop=value]') 查询id为001的对象
         */
        query(param: any, recursive?: boolean): (BaseObject)[];

        /**
         * 判断是否为其子物体
         * @param {THING.BaseObject} parent 物体
         * @return {Boolean}
         */
        isChildOf(parent: BaseObject): boolean;

        /**
         * 判断是否为其兄弟物体
         * @param {THING.BaseObject} object 物体
         * @return {Boolean}
         */
        isBrotherOf(object: BaseObject): boolean;

        /**
         * 根据自身坐标系移动
         * @param {Array<Number>} localPosition 偏移量
         */
        translate(localPosition: number[]): void;

        /**
         * 一段时间内移动到某位置
         * @param {Object} params
         * @param {Array} params.path 路径
         * @param {Array<Number>|THING.BaseObject} params.position 目标位置
         * @param {Boolean} params.orientToPath? 是否朝向移动的方向
         * @param {String} params.loopType? 循环类型
         * @param {Number} params.time? 移动总时间
         * @param {Array} params.offsetPosition? 偏移位置
         * @param {Function} params.complete? 完成时的回调
         * @example
         *  obj.moveTo([0, 0, 10]);
         *  obj.moveTo({
         *   "localPosition": THING.Math.randomVector3(10, 0, 10),
         *   "time": 1500,
         *   "orientToPath": true,
         *   "lerp": false,
         *   "complete":function() {
         *       move_to_next();
         *   }
         * });
         */
        moveTo(params: {
            path: any[];
            position: number[] | BaseObject;
            "orientToPath?": boolean;
            "loopType?": string;
            "time?": number;
            "offsetPosition?": any[];
            "complete?": ()=>any;
        }): void;

        /**
         * 一段时间内移动到某位置
         * @param {Object} params
         * @param {Array<Number>} params.path 路径
         * @param {Boolean} params.orientToPath? 是否朝向移动的方向
         * @param {Number} params.orientToPathDegree? 朝向路径的偏移角度
         * @param {Number} params.time? 移动总时间
         * @param {Array} params.position? 起始位置
         * @param {THING.LerpType} params.lerpType? 插值类型
         * @param {String} params.loopType? 循环类型
         * @param {Function} params.complete? 完成时的回调
         * @example
         * obj.movePath({
         *         'position': path[0],        // 运动起点
         *         'orientToPath' : true,      // 物体移动时沿向路径方向
         *         'orientToPathDegree': 90,   // 沿向路径方向偏移一定角度
         *         'path': path,               // 路径点数组
         *         'time': 12000,              // 路径总时间
         *         'loopType': THING.LoopType.No, // 循环状态
         *         'complete': function () {
         *             console.log('move completed');  // 路径结束回调
         *         }
         *     });
         */
        movePath(params: {
            path: number[];
            "orientToPath?": boolean;
            "orientToPathDegree?": number;
            "time?": number;
            "position?": any[];
            "lerpType?": LerpType;
            "loopType?": string;
            "complete?": ()=>any;
        }): void;

        /**
         * 停止移动
         */
        stopMoving(): void;

        /**
         * 判断属性是否存在
         * @param {String} key 属性名字，可以使用 a/b/c 的路径方式
         */
        hasAttribute(key: string): void;

        /**
         * 获取属性值
         * @param {String} key 属性名字，可以使用 a/b/c 的路径方式
         * @return {*} 属性值
         */
        getAttribute(key: string): any;

        /**
         * 设置属性值
         * @param {String} key 属性名字，可以使用 a/b/c 的路径方式
         * @param {*} value 属性值
         */
        setAttribute(key: string, value: any): void;

        /**
         * 批量设置属性值
         * @param {Object} attributes 属性列表
         * @param {Boolean} overwrite 是否覆盖现有属性(默认覆盖)
         */
        setAttributes(attributes: any, overwrite?: boolean): void;

        /**
         * 物体 ID
         * @type {String}
         */
        id: string;

        /**
         * 获取/设置物体名字
         * @type {String}
         */
        name: string;

        /**
         * 获取/设置用户自定义属性
         * @type {Object}
         */
        userData: any;

        /**
         * 显示/隐藏网格
         * @param {Number} size 平面大小
         * @param {Number} divisions 细分面数量
         * @param {Number|String} color1 坐标轴颜色
         * @param {Number|String} color2 网格颜色
         * @param {Boolean|Number} pickable? 平面是否能被拾取, 如果是数字则表示拾取平面大小
         */
        showGrid(size: number, divisions: number, color1: number | string, color2: number | string, pickable?: boolean | number): void;

        /**
         * 获取网格大小
         * @type {Number}
         */
        gridSize: number;

        /**
         * 添加控件
         * @param {Object} type 内核控件类型或者用户自定义控件类型
         * @param {Object|String} params 控件初始化参数或者控制自定义名字(用于查找)
         * @param {String} name? 控制自定义名字(用于查找)
         * @return {Object} 控件
         */
        addControl(type: any, params: any | string, name?: string): any;

        /**
         * 获取控件
         * @param {String} name 控件自定义名字
         * @return {Object}
         */
        getControl(name: string): any;

        /**
         * 删除控件
         * @param {Object} control 控件
         */
        removeControl(control: any): void;

        /**
         * 删除所有控件
         */
        removeAllControls(): void;

        /**
         * 查询是否拥有控件
         * @param {Object|String} control 控件或者控件自定义名字
         * @return {Boolean}
         */
        hasControl(control: any | string): boolean;

        /**
         * 获取控件列表
         * @type {Array<Object>}
         */
        controls: any[];

        /**
         * 世界坐标位置
         * @type {Array<number>}
         */
        position: number[];

        /**
         * 局部相对位置, 相对于父节点
         * @type {Array<number>}
         */
        localPosition: number[];

        /**
         * 三轴相对角度，相对于自身坐标
         * @type {Array<number>}
         */
        angles: number[];

        /**
         * 相对自身坐标系下的缩放比例
         * @type {Array<number>}
         */
        scale: number[];

        /**
         * 获取样式
         * @type {THING.BaseStyle}
         */
        style: BaseStyle;

        /**
         * 是否可被拖拽
         * @type {Boolean}
         */
        draggable: boolean;

        /**
         * 当前拖拽状态
         * @type {number}
         */
        dragState: number;

        /**
         * 显示/隐藏
         * @type {Boolean}
         */
        visible: boolean;

        /**
         * 获取子物体列表
         * @type {Array<THING.BaseObject>}
         */
        children: (BaseObject)[];

        /**
         * 获取所有兄弟(排除自己)
         * @type {THING.Selector}
         */
        brothers: Selector;

        /**
         * 获取所有父物体(祖先)
         * @type {THING.Selector}
         */
        parents: Selector;

        /**
         * 获取父物体
         * @type {THING.BaseObject}
         */
        parent: BaseObject;

        /**
         * 获取物体相对父物体的子节点下标值.
         * @param {Boolean} sameType 是否限定同类型
         * @return {Number} 子物体所在数组下标, -1 表示不存在于父物体的子物体列表中，或者父物体为空
         */
        indexOfParent(sameType?: boolean): number;

        /**
         * 风格独立
         * @type {Boolean}
         */
        inheritStyle: boolean;

        /**
         * 位置独立
         * @type {Boolean}
         */
        inheritPosition: boolean;

        /**
         * 角度独立
         * @type {Boolean}
         */
        inheritAngles: boolean;

        /**
         * 缩放独立
         * @type {Boolean}
         */
        inheritScale: boolean;

    }

    /**
     * @class Building
     * 建筑
     * @author larrow 2017.10.1
     * @memberof THING
     * @extends THING.BaseObject
     */
    class Building extends BaseObject {
        constructor();

        /**
         * 是否拥有外立面
         * @return {Boolean} 是否拥有外立面
         */
        hasFacades(): boolean;

        /**
         * 显示/隐藏所有屋顶(房顶)
         * @param {Boolean} show 显示/隐藏屋顶(房顶)
         */
        showAllRoofs(show?: boolean): void;

        /**
         * 展开楼层
         * @param {Object} params 参数列表
         * @param {Number} params.time 耗时(毫秒)
         * @param {Number} params.length 距离
         * @param {Boolean} params.horzMode 是否水平模式展开
         * @param {Boolean} params.hideRoof 是否隐藏屋顶
         * @param {Function} params.complete 完成回调函数
         */
        expandFloors(params: {
            time: number;
            length: number;
            horzMode: boolean;
            hideRoof: boolean;
            complete: ()=>any;
        }): void;

        /**
         * 合并楼层
         * @param {Object} params 参数列表
         * @param {Number} params.time 耗时(毫秒)
         * @param {Function} params.complete 完成回调函数
         */
        unexpandFloors(params: {
            time: number;
            complete: ()=>any;
        }): void;

        /**
         * 获取楼层是否已经展开
         * @type {Boolean}
         */
        expanded: boolean;

        /**
         * 获取外立面数据
         * @type {THING.BaseObject}
         */
        facade: BaseObject;

        /**
         * 获取所有外立面
         * @type {THING.Selector}
         */
        facades: Selector;

        /**
         * 获取楼层数据
         * @type {THING.Selector}
         */
        floors: Selector;

        /**
         * 获取物体集合
         * @type {THING.Selector}
         */
        things: Selector;

    }

    /**
     * @class Campus
     * 园区数据
     * @memberof THING
     * @extends THING.BaseObject
     */
    class Campus extends BaseObject {
        constructor();

        /**
         * 获取场景资源路径
         * @type {String}
         */
        url: string;

        /**
         * 获取地面
         * @type {THING.BaseObject}
         */
        ground: BaseObject;

        /**
         * 获取园区建筑集合
         * @type {THING.Selector}
         */
        buildings: Selector;

        /**
         * 获取园区物体集合
         * @type {THING.Selector}
         */
        things: Selector;

    }

    /**
     * @class Door
     * 门
     * @author larrow 2017.11.20
     * @extends THING.Thing
     * @memberof THING
     */
    class Door extends Thing {
        constructor();

        /**
         * 开门
         */
        open(): void;

        /**
         * 关门
         */
        close(): void;

        /**
         * 获取所在楼层
         * @type {THING.Floor}
         */
        floor: Floor;

    }

    /**
     * @class Floor
     * 楼层
     * @author larrow 2017.10.2
     * @memberof THING
     * @extends THING.BaseObject
     */
    class Floor extends BaseObject {
        constructor();

        /**
         * 显示/隐藏屋顶
         * @param {Boolean} visible 显示/隐藏屋顶
         */
        showAllRoofs(visible?: boolean): void;

        /**
         * 显示/隐藏天花板
         * @param {Boolean} visible 显示/隐藏天花板
         */
        showCeiling(visible?: boolean): void;

        /**
         * 以局部坐标点获取对应的房间信息
         * @param {Array<Number>} localPosition 局部坐标
         * @return {THING.Room} 房间数据
         */
        getRoomFromLocalPosition(localPosition: number[]): Room;

        /**
         * 获取所在建筑
         * @type {THING.Building}
         */
        building: Building;

        /**
         * 获取楼层相对于建筑的下标(从0开始)
         * @type {Number}
         */
        indexOfBuilding: number;

        /**
         * 获取层数(从1开始)
         * @type {Number}
         */
        levelNumber: number;

        /**
         * 获取楼层物体集合
         * @type {THING.Selector}
         */
        things: Selector;

        /**
         * 获取楼层门集合
         * @type {THING.Selector}
         */
        doors: Selector;

        /**
         * 获取楼层楼梯集合
         * @type {THING.Selector}
         */
        stairs: Selector;

        /**
         * 获取楼层房间集合
         * @type {THING.Selector}
         */
        rooms: Selector;

        /**
         * 获取杂物节点
         * @type {THING.BaseObject}
         */
        misc: BaseObject;

        /**
         * 获取楼层地板
         * @type {THING.BaseObject}
         */
        plan: BaseObject;

        /**
         * 获取楼层墙体
         * @type {THING.BaseObject}
         */
        wall: BaseObject;

        /**
         * 获取屋顶
         * @type {THING.BaseObject}
         */
        roof: BaseObject;

        /**
         * 获取天花板
         * @type {THING.BaseObject}
         */
        ceiling: BaseObject;

    }

    /**
     * @class Group
     * 物体组
     * @memberof THING
     */
    class Group {
        constructor();

        /**
         * 判断属性是否存在
         * @param {String} key 属性名字，可以使用 a/b/c 的路径方式
         */
        hasAttribute(key: string): void;

        /**
         * 获取属性值
         * @param {String} key 属性名字，可以使用 a/b/c 的路径方式
         * @return {*} 属性值
         */
        getAttribute(key: string): any;

        /**
         * 设置属性值
         * @param {String} key 属性名字，可以使用 a/b/c 的路径方式
         * @param {*} value 属性值
         */
        setAttribute(key: string, value: any): void;

        /**
         * 批量设置属性值
         * @param {Object} attributes 属性列表
         * @param {Boolean} overwrite 是否覆盖现有属性(默认覆盖)
         */
        setAttributes(attributes: any, overwrite?: boolean): void;

        /**
         * 根据自身坐标系移动
         * @param {Array<Number>} localPosition 偏移量
         */
        translate(localPosition: number[]): void;

        /**
         * 物体 ID
         * @type {String}
         */
        id: string;

        /**
         * 获取/设置物体名字
         * @type {String}
         */
        name: string;

        /**
         * 获取/设置用户自定义属性
         * @type {Object}
         */
        userData: any;

    }

    /**
     * 热力图
     * @class Heatmap
     * @memberof THING
     * @extends THING.BaseObject
     */
    class Heatmap extends BaseObject {
    }

    /**
     * @class LightBase
     * 光线基类
     * @memberof THING
     * @extends THING.BaseObject
     */
    class LightBase extends BaseObject {
        constructor();

    }

    /**
     * @class Line
     * 轨迹线
     * @memberof THING
     * @extends THING.LineBase
     */
    class Line extends LineBase {
        constructor();

        /**
         * 显示/隐藏线段
         * @param {boolean} visible 显示/隐藏线段
         */
        showLines(visible: boolean): void;

        /**
         * 显示/隐藏轨迹点
         * @param {boolean} visible 显示/隐藏轨迹点
         */
        showPoints(visible: boolean): void;

    }

    /**
     * @class LineBase
     * 线段基类
     * @memberof THING
     * @extends THING.PointsBase
     */
    class LineBase extends PointsBase {
        constructor();

        /**
         * 启用/禁用纹理
         * @type {Boolean}
         */
        useTexture: boolean;

        /**
         * 启用/禁止 UV 动画
         * @type {Boolean}
         */
        scrollUV: boolean;

        /**
         * 设置 UV 动画滚动速度, 数值设置成负数可以改变动画滚动方向
         * @type {Number}
         */
        scrollSpeed: number;

        /**
         * 圆角半径, 如果是 0 则表示不使用圆角
         * @type {Number}
         */
        cornerRadius: number;

        /**
         * 设置路线细分面，越大路线顶点细分越多越平滑
         * @type {Number}
         */
        cornerSegments: number;

        /**
         * 获取线段长度
         * @type {Number}
         */
        length: number;

    }

    /**
     * @class Marker
     * 3D场景内的标记，往往用于顶牌，可以传入div, image或canvas写文字，可以拾取、跟随物体、和物体一并删除
     * @author larrow 2018.2.20
     * @memberof THING
     * @extends THING.BaseObject
     * @example
     * var marker = app.create({
     *      type: "Marker",
     *      localPosition: [0, 5, 0],
     *      size: 4,
     *      url: "https://speech.uinnova.com/static/images/warning1.png",
     *      parent: app.query('car01')[0]
     * });
     */
    class Marker extends BaseObject {
        constructor();

        /**
         * 设置画布
         * @type {*}
         */
        canvas: any;

        /**
         * 设置路径资源
         * @type {string}
         */
        url: string;

        /**
         * 设置比例大小
         * @type {Array<Number>|Number}
         */
        size: number[] | number;

        /**
         * 设置保持尺寸不变
         * @type {Boolean}
         */
        keepSize: boolean;

        /**
         * 获取挂架的 DOM 元素
         * @type {Object}
         */
        element: any;

    }

    /**
     * @class ParticleEmitter
     * 粒子发射器封装
     * @memberof THING
     */
    class ParticleEmitter {
        constructor();

    }

    /**
     * @class ParticleGroup
     * 粒子组封装
     * @memberof THING
     */
    class ParticleGroup {
        constructor();

    }

    /**
     * @class ParticleSystem
     * 粒子系统
     * @memberof THING
     * @extends THING.BaseObject
     */
    class ParticleSystem extends BaseObject {
        constructor();

    }

    /**
     * @class PointsBase
     * 此类可以用作各种带顶点编辑属性的模型，比如区域和水面的顶点编辑，主要封装了对顶点（编辑点）的操作行为，包括添加、删除，获取等。
     * 如果想使用这个类的特性，直接从此类派生即可，详细的写法可以参看Water类或者Region类的写法。
     * @memberof THING
     * @extends THING.BaseObject
     */
    class PointsBase extends BaseObject {
        constructor();

        /**
         * 清除所有节点
         */
        clearPoints(): void;

        /**
         * 插入节点
         * @param {Number} index 节点下标
         * @param {Array} pos 节点坐标
         */
        insertPoint(index: number, pos: any[]): void;

        /**
         * 设置节点
         * @param {Number} index 节点下标
         * @param {Array} pos 节点坐标
         * @param {Boolean} 是否成功设置节点
         */
        setPoint(index: number, pos: any[], 是否成功设置节点: boolean): void;

        /**
         * 获取节点
         * @param {Number} index 节点下标
         * @return {Array} 节点坐标
         */
        getPoint(index: number): any[];

        /**
         * 添加节点
         * @param {Array} pos 节点坐标
         * @return {Number} 节点下标
         */
        addPoint(pos: any[]): number;

        /**
         * 添加多个节点
         * @param {Array} pos 多个节点坐标
         */
        addPoints(pos: any[]): void;

        /**
         * 删除多个节点
         * @param {Number} index 开始下标
         * @param {Number} length 节点总数
         */
        removePoints(index: number, length?: number): void;

        /**
         * 获取节点数据列表
         * @type {Array} 节点坐标列表
         */
        points: any[];

    }

    /**
     * @class PolygonLine
     * 管线
     * @memberof THING
     * @extends THING.LineBase
     */
    class PolygonLine extends LineBase {
        constructor();

        /**
         * 设置进度, 范围在[0, 1]之间
         * @type {number}
         */
        progress: number;

    }

    /**
     * @class Room
     * 房间
     * @memberof THING
     * @extends THING.BaseObject
     */
    class Room extends BaseObject {
        constructor();

        /**
         * 获取物体可使用的世界坐标位置
         * @param {Number|Array<Array<Number>>} number 物体总数|申请的位置大小[[width, height]]
         * @param {Number|Array<Array<Number>>} sizes 物体总数|申请的位置大小[[width, height]]
         * @param {Number|Array<Array<Number>>} holePoints 洞总数|洞的位置[[lt, rt, rb, lb]]
         * @return {Array<Array<Number>>} 世界坐标点数据列表
         */
        getAvaliablePositions(number: number | (number[])[], sizes: number | (number[])[], holePoints: number | (number[])[]): (number[])[];

        /**
         * 获取射线投影下的房间事件坐标
         * @param {Array<Number>} pos 世界坐标
         * @return {Array<Number>} 摄像投影后的世界坐标
         */
        getRayCastPosition(pos: number[]): number[];

        /**
         * 获取房间中心点(轴心点)世界坐标
         * @type {Array<Number>}
         */
        labelPosition: number[];

        /**
         * 获取房间周长
         * @type {Number}
         */
        perimeter: number;

        /**
         * 获取房间面积
         * @type {Number}
         */
        area: number;

        /**
         * 获取天花板
         * @type {THING.BaseObject}
         */
        ceiling: BaseObject;

        /**
         * 获取房顶
         * @type {THING.BaseObject}
         */
        roof: BaseObject;

        /**
         * 获取房间地板
         * @type {THING.BaseObject}
         */
        plan: BaseObject;

        /**
         * 获取所在楼层
         * @type {THING.Floor}
         */
        floor: Floor;

        /**
         * 获取房间顶点的世界坐标信息
         * @type {Array<Number>}
         */
        points: number[];

        /**
         * 获取房间内物体列表
         * @type {THING.Selector}
         */
        things: Selector;

        /**
         * 设置门列表数据
         * @type {THING.Selector}
         */
        doors: Selector;

    }

    /**
     * @class RouteLine
     * 线路
     * @memberof THING
     * @extends THING.LineBase
     */
    class RouteLine extends LineBase {
        constructor();

        /**
         * 设置进度, 范围在[0, 1]之间
         * @type {number}
         */
        progress: number;

    }

    /**
     * @class SpotLight
     * 聚光灯
     * @memberof THING
     * @extends THING.LightBase
     */
    class SpotLight extends LightBase {
        constructor();

        /**
         * 设置灯光角度
         * @type {Number} value 角度
         */
        lightAngle: number;

        /**
         * 设置灯光位置偏移量
         * @type {Array<Number>}
         */
        lightOffset: number[];

        /**
         * 设置灯光目标位置
         * @type {Array<Number>} value 目标位置
         */
        lightTarget: number[];

        /**
         * 设置光源节点名字
         * @type {String}
         */
        centerNodeName: string;

    }

    /**
     * @class TextRegion
     * 负责区域文本绘制
     * @author WJH 2018.10.18
     * @memberof THING
     * @extends THING.BaseObject
     */
    class TextRegion extends BaseObject {
        constructor();

        /**
         * 设置文本
         * @type {String}
         */
        text: string;

        /**
         * 设置文本颜色
         * @type {String|Number}
         */
        textColor: string | number;

        /**
         * 设置文本大小
         * @type {Number}
         */
        textSize: number;

        /**
         * 设置文本行宽度，如果文本小于行宽度会进行换行
         * @type {Number}
         */
        textLineWidth: number;

        /**
         * 设置文本行行距
         * @type {Number}
         */
        textLineHeight: number;

        /**
         * 设置文本边缘模式
         * @type {Boolean}
         */
        strokeMode: boolean;

        /**
         * 设置保持尺寸不变
         * @type {Boolean}
         */
        keepSize: boolean;

    }

    /**
     * @class Thing
     * 物体
     * @memberof THING
     * @extends THING.BaseObject
     */
    class Thing extends BaseObject {
        constructor();

        /**
         * 获取动画
         * @type {Array<String>}
         */
        animationNames: string[];

        /**
         * 播放动画
         * @param {Object} params
         * @param {String} params.name 动画名
         * @param {Array} params.frames? 帧播放比例范围
         * @param {Number} params.speed? 播放速度
         * @param {Boolean} params.loop? 是否循环
         * @param {number} params.loopType? 循环类型
         * @param {Boolean} params.reverse? 是否倒播
         * @example
         * obj.playAnimation('open1');
         * obj.playAnimation({
         *      name: 'open1',
         *      reverse: true,
         * });
         * obj.playAnimation({
         *      name: 'open1',
         *      loopType: THING.LoopType.Repeat,
         * });
         * obj.playAnimation({
         *      name: ['open1', 'open2'],
         *      loopType: THING.LoopType.PingPong,
         *      speed: 0.4
         * });
         * obj.playAnimation({
         *      name: ['open1'],
         *      frames: [0.25, 0.5], // 动画序列从 25% 播放到 50% (时间)
         *      loopType: THING.LoopType.PingPong,
         *      speed: 0.4
         * });
         */
        playAnimation(params: {
            name: string;
            "frames?": any[];
            "speed?": number;
            "loop?": boolean;
            "loopType?": number;
            "reverse?": boolean;
        }): void;

        /**
         * 停止动画
         */
        stopAnimation(): void;

        /**
         * 是否在播放动画中
         * @return {Boolean}
         */
        isPlayingAnimation(): boolean;

        /**
         * 获取模型资源路径
         * @type {String}
         */
        url: string;

        /**
         * 获取楼层
         * @type {THING.Floor}
         */
        floor: Floor;

        /**
         * 获取建筑
         * @type {THING.Building}
         */
        building: Building;

    }

    /**
     * @class ThingGeometry
     * 几何物体基类
     * @author larrow 2017.9
     * @memberof THING
     * @extends THING.Thing
     */
    class ThingGeometry extends Thing {
        constructor();

    }

    /**
     * @class Box
     * 正方体
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Box extends ThingGeometry {
        constructor();

    }

    /**
     * @class Circle
     * 圆圈
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Circle extends ThingGeometry {
        constructor();

    }

    /**
     * @class Sphere
     * 球体
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Sphere extends ThingGeometry {
        constructor();

    }

    /**
     * @class Plane
     * 平面
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Plane extends ThingGeometry {
        constructor();

    }

    /**
     * @class Grid
     * 网格
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Grid extends ThingGeometry {
        constructor();

    }

    /**
     * @class Cylinder
     * 胶囊体
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Cylinder extends ThingGeometry {
        constructor();

    }

    /**
     * @class Tetrahedron
     * 四面体
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Tetrahedron extends ThingGeometry {
        constructor();

    }

    /**
     * @class Shape
     * 自定义多边形
     * @memberof THING
     * @extends THING.ThingGeometry
     */
    class Shape extends ThingGeometry {
        constructor();

    }

    /**
     * @class UIAnchor
     * 界面，直接采用dom元素做界面，主要职责是要更新位置，根本就没有新THREE的Object产生，完全是同步；
     * @author larrow 2017.10.6
     * @memberof THING
     */
    class UIAnchor {
        constructor();

        /**
         * 设置偏移量
         * @type {Array<Number>}
         */
        offset: number[];

        /**
         * 显示/隐藏
         * @type {Boolean}
         */
        visible: boolean;

    }

    /**
     * 水面
     * @class Water
     * @memberof THING
     * @extends THING.PointsBase
     */
    class Water extends PointsBase {
    }

    /**
     * 3D场景内的嵌入网页，可以用于页面嵌入显示
     * @class WebView
     * @author WJH 2018.07.16
     * @memberof THING
     * @extends THING.BaseObject
     * @example
     * var webView = app.create({
     *      type: "WebView",
     *      position: [0, 5, 0],
     *      url: "http://www.thingjs.com",
     * 		width: 16,
     * 		height: 16
     * });
     */
    class WebView extends BaseObject {
    }

    /**
     * 寻找路径
     * @param {THING.Floor} startFloor 起始楼层
     * @param {Array<Number>} startPosition 起始世界坐标
     * @param {THING.Floor} endFloor 结束楼层
     * @param {Array<Number>} endPosition 结束世界坐标
     * @typedef {Object} PathSegment
     * @property {THING.Floor} floor 路径所在楼层
     * @property {Array<Array<Number>>} points 路径的世界坐标列表
     * @property {THING.BaseObject} entry 去往下一楼层的入口点(针对跨楼层寻路)
     * @memberof THING
     * @return {Array<THING.PathSegment>} 路径段数组
     */
    type PathSegment = {
        floor: Floor;
        points: (number[])[];
        entry: BaseObject;
    };

    /**
     * @class BaseStyle
     * 物体样式
     * @author larrow 2017.10.5
     * @memberof THING
     */
    class BaseStyle {
        constructor();

        /**
         * 设置多边形偏移量修正
         * @param {Object} params 参数列表
         * @param {Boolean} params.polygonOffset 是否开启多边形偏移
         * @param {Number} params.polygonOffsetFactor 多边形偏移因子
         * @param {Number} params.polygonOffsetUnits 多边形偏移单位
         */
        setPolygonOffset(params: {
            polygonOffset: boolean;
            polygonOffsetFactor: number;
            polygonOffsetUnits: number;
        }): void;

        /**
         * 设置/获取渲染排序值
         * @type {Number}
         */
        renderOrder: number;

        /**
         * 开启/关闭线框模式
         * @type {Boolean}
         */
        wireframe: boolean;

        /**
         * 设置透明度(0~1)
         * @type {number}
         */
        opacity: number;

        /**
         * 设置颜色
         * @type {String|Number}
         */
        color: string | number;

        /**
         * 设置勾边颜色
         * @type {Number|String}
         */
        outlineColor: number | string;

        /**
         * 忽略/禁用勾边
         * @type {Boolean}
         */
        skipOutline: boolean;

        /**
         * 显示/隐藏包围盒
         * @type {Boolean}
         */
        boundingBox: boolean;

        /**
         * 设置包围盒颜色
         * @type {Number|String}
         */
        boundingBoxColor: number | string;

        /**
         * 显示/隐藏带方向的包围盒
         * @type {Boolean}
         */
        orientedBoundingBox: boolean;

        /**
         * 设置方向的包围盒颜色
         * @type {Number|String}
         */
        orientedBoundingBoxColor: number | string;

        /**
         * 设置始终在最后渲染
         * @type {Boolean}
         */
        alwaysOnTop: boolean;

    }

    /**
     * @class DefaultStyle
     * 默认物体样式
     * @author larrow 2017.10.5
     * @memberof THING
     */
    class DefaultStyle {
        constructor();

    }

}

