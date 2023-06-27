import { T3D, Utils } from '../common/Utils.js'
import { SceneDebugger } from './SceneDebugger'
import { SingleStepDebugger } from './SingleStepDebugger'
import { MaterialDebugger } from './MaterialDebugger'
import { LightDebugger } from './LightDebugger'
import { NodeDebugger } from './NodeDebugger'
import { AnimationDebugger } from './AnimationDebugger'
import { StatsDebugger } from './StatsDebugger'

class RendererDebugger {

	constructor(param = {}) {
		this.onError = param['onError'] || function () { };

		this.sceneDebugger = new SceneDebugger();
		this.singleStepDebugger = new SingleStepDebugger();
		this.materialDebugger = new MaterialDebugger();
		this.lightDebugger = new LightDebugger();
		this.animationDebugger = new AnimationDebugger();
		this.statsDebugger = new StatsDebugger();

		this.nodeDebugger = null;
	}
	attachNodeDebugger(node) {
		var node = Utils.getObject3D(node);
		if (!node) {
			return null;
		}

		if (node.userData['nodeDebugger']) {
			return node.userData['nodeDebugger'];
		}

		this.nodeDebugger = new NodeDebugger(node);
		return this.nodeDebugger;
	}
	detachNodeDebugger() {
		if (!this.nodeDebugger) {
			return;
		}

		this.nodeDebugger.dispose();
		this.nodeDebugger = null;
	}

	processRenderer(appView) {
		var _renderer = appView.$renderer;
		if (!_renderer) {
			return;
		}
		var that = this;
		var app = THING.Utils.getCurrentApp();
		var scene = app.scene.root.$node;
		var camera = app.camera.node;

		// mark the list on thing scene
		this.processRenderMark();

		// overwrite push function of the light
		var shadowLights = this.processLightData(scene);

		// overwrite the push function of the render queue
		this.processRenderQueue(scene, camera);

		// Setup debuggers
		this.statsDebugger.processRenderer(_renderer);

		// Setup render
		_renderer.info = _renderer.info || new T3D.RenderInfo();
		var old_render = _renderer.renderRenderableList;
		_renderer.renderRenderableList = function (renderables, renderStates, options) {
			that.processScene(scene, renderables, options);

			// setup renderinfo
			if (renderables.rendreOnThingScene && !options.getMaterial) {
				// the renderInfo will be reset after render
				// the position in stats's end -> render_stats's update
				options.renderInfo = _renderer.info;
				options.getMaterial = function (renderable) {
					return that.materialDebugger.getMaterial(renderable);
				}
				old_render.call(this, renderables, renderStates, options);
				options.getMaterial = null;
			}
			else {
				old_render.call(this, renderables, renderStates, options);
			}

			// Resume shadow lights
			that.resumeLightData(shadowLights);
		}
	}

	processRenderMark() {
		var app = THING.Utils.getCurrentApp();
		var scene = app.scene.root.$node;
		var camera = app.camera.node;
		var renderQueue = scene.getRenderQueue(camera._node);
		if (renderQueue) {
			for (var i = 0, count = renderQueue.layerList.length; i < count; i++) {
				var renderQueueLayer = renderQueue.layerList[i];
				renderQueueLayer.opaque.rendreOnThingScene = true;
				renderQueueLayer.transparent.rendreOnThingScene = true;
			}
		}
	}
	processLightData(scene) {
		var that = this;
		var shadowLights = [];
		var lightData = scene._lightData;
		if (lightData) {
			var old_push_light = lightData.push;
			lightData.push = function (light) {
				if (!that.lightDebugger.options.enable) {
					return;
				}

				if (!that.lightDebugger.options.shadow) {
					light.castShadow = false;
					shadowLights.push(light);
					return;
				}

				old_push_light.call(this, light);
			}
		}
		else {
			console.warn(`can not get the light data whit the current scene`);
		}
		return shadowLights;
	}
	resumeLightData(shadowLights) {
		shadowLights.forEach(shadowLight => {
			shadowLight.castShadow = true;
		});
		shadowLights.length = 0;
	}
	processRenderQueue(scene, camera) {
		var that = this;
		var renderQueue = scene.getRenderQueue(camera._node);
		if (renderQueue) {
			var old_push = renderQueue.push;
			renderQueue.push = function (object, camera) {
				if (!that.sceneDebugger.isInScene(camera, object)) {
					return;
				}
				old_push.call(this, object, camera);
			}
		}
		else {
			console.warn(`can not get the render queue whit the current camera`);
		}
	}

	processScene(scene, renderables, options) {
		this.sceneDebugger.processScene(scene);
		this.materialDebugger.processScene(scene);
		this.lightDebugger.processScene(scene);
		if (renderables.rendreOnThingScene && !options.getMaterial) {
			this.singleStepDebugger.processScene(scene);
		}
	}

	update(deltaTime) {
		if (this.nodeDebugger) {
			this.nodeDebugger.update(deltaTime);
		}
	}

	create(type) {
		var classType = T3D[type];
		if (!classType) {
			return null;
		}

		// eslint-disable-next-line new-cap
		return new classType();
	}

	getHierarchy(scene) {
		return this.sceneDebugger.getHierarchy(scene);
	}
	getSceneDebugger() {
		return this.sceneDebugger;
	}

	// #region options
	/**
	 * Get/Set slow motion options.
	 * @type {Object}
	 */
	get slowMotionOptions() {
		return this.animationDebugger.options;
	}
	set slowMotionOptions(value) {
		this.animationDebugger.options = value;
	}

	/**
	 * Get/Set stats options.
	 * @type {Object}
	 */
	get statsOptions() {
		return this.statsDebugger.options;
	}
	set statsOptions(value) {
		this.statsDebugger.options = value;
	}

	/**
	 * Get/Set scene options.
	 * @type {Object}
	 */
	get sceneOptions() {
		return this.sceneDebugger.options;
	}
	set sceneOptions(value) {
		this.sceneDebugger.options = value;
	}

	/**
	 * enable single step
	 */
	enableSingleStep(enable, scene) {
		this.singleStepDebugger.enableSingleStep(enable, scene);
	}
	/**
	 * Get/Set single step options.
	 * @type {Object}
	 */
	get singleStepOptions() {
		return this.singleStepDebugger.options;
	}
	set singleStepOptions(value) {
		this.singleStepDebugger.options = value;
	}

	/**
	 * Get/Set material options.
	 * @type {Object}
	 */
	get materialOptions() {
		return this.materialDebugger.options;
	}
	set materialOptions(value) {
		this.materialDebugger.options = value;
	}

	/**
	 * Get/Set light options.
	 * @type {Object}
	 */
	get lightOptions() {
		return this.lightDebugger.options;
	}
	set lightOptions(value) {
		this.lightDebugger.options = value;
	}
	// #endregion

}

export { RendererDebugger }