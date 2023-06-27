import { Utils, T3D } from '../common/Utils.js';

class SingleStepDebugger {

	constructor() {
		this._info = this._buildInfo();
		this._colorR = new T3D.Color3(1, 0, 0);
		this._colorG = new T3D.Color3(0, 1, 0);
	}

	_buildInfo() {
		var coreInfo = {
			enable: false,
			scene: null,
			interval: 1000, // 1 seconds
			flickerTimes: 6,
			pause: false,
			percentage: 0,
		};

		var info = {
			core: coreInfo,
			totalNumber: 0,
			renderableNodes: [],
			materialMap: new WeakMap(),
		};

		Object.defineProperty(info, "flickerInterval", {
			get: function () {
				return this.core.interval / this.core.flickerTimes;
			},
		});

		return info;
	}

	_getFlickerMaterial(material, index) {
		var info = this._info;
		if (!info.materialMap.has(material)) {
			return null;
		}
		var flickMaterial = info.materialMap.get(material);

		if (index === 0) {
			flickMaterial.diffuse = this._colorR;
		}
		else {
			flickMaterial.diffuse = this._colorG;
		}
		return flickMaterial;
	}

	_resumeNode(info) {
		var node = info.node;
		node.visible = info.prevVisible;
		node.material = info.prevMaterial;
		node.onAfterRender = info.prevOnAfterRender;
	}

	_processSingleStep(scene) {
		var info = this._info;

		// Draw renderable nodes one by one
		var renderableNodes = info.renderableNodes;
		var materialMap = info.materialMap;
		if (renderableNodes.length) {
			var renderNode = renderableNodes[0];
			var node = renderNode.node;

			// get the index for diffuse
			renderNode.startTime = renderNode.startTime || Utils.getCurrentTimeMilliseconds();
			var elapsedTime = Utils.getElapsedTimeMilliseconds(renderNode.startTime);
			var completedTimes = elapsedTime / info.flickerInterval;
			var index = Math.floor(completedTimes % 2);

			// Make it visible
			node.visible = true;

			// Change material
			if (Utils.isArray(node.material)) {
				let flickMaterials = [];
				for (var i = 0; i < node.material.length; i++) {
					let material = this._getFlickerMaterial(renderNode.prevMaterial[i], index);
					flickMaterials.push(material);
				}
				node.material = flickMaterials;
			}
			else {
				node.material = this._getFlickerMaterial(renderNode.prevMaterial, index);
			}

			// Complete shining
			if (completedTimes >= info.core.flickerTimes && !info.core.pause) {
				this._resumeNode(renderNode);

				renderableNodes.shift();
			}
		}
		// Collect renderable nodes
		else {
			scene.traverseBranch(node => {
				if (!node.getVisible()) {
					return false;
				}

				if (node.isRenderable()) {
					renderableNodes.push({
						node,
						prevMaterial: node.material,
						prevVisible: node.visible,
						prevOnAfterRender: node.onAfterRender,
					});
					node.visible = false;

					if (Utils.isArray(node.material)) {
						for (var i = 0; i < node.material.length; i++) {
							if (!materialMap.has(node.material[i])) {
								materialMap.set(node.material[i], node.material[i].clone());
							}
						}
					}
					else {
						if (!materialMap.has(node.material)) {
							materialMap.set(node.material, node.material.clone());
						}
					}
				}
			});

			info.totalNumber = renderableNodes.length;
		}

		// Update percentage
		if (renderableNodes.length) {
			info.core.percentage = Math.floor(((info.totalNumber - renderableNodes.length) / info.totalNumber) * 100);
		}
		else {
			info.core.percentage = 100;
		}
	}

	processScene(scene) {
		var info = this._info;

		if (info.core.enable) {
			this._processSingleStep(scene);
		}
	}

	/**
	 * Get/Set single step options.
	 * @type {Object}
	 */
	get options() {
		return this._info.core;
	}
	set options(value) {
		var info = this._info;
		var core = info.core;
		core.interval = Math.max(1, Utils.parseValue(value['interval'], info.core.interval));
		core.flickerTimes = Utils.parseValue(value['flickerTimes'], info.core.flickerTimes);
		core.pause = Utils.parseValue(value['pause'], info.core.pause);
	}

	enableSingleStep(enable, scene) {
		var info = this._info;
		var core = info.core;
		if (enable == core.enable || !scene) {
			return;
		}
		info.materialMap = new WeakMap(),
		core.enable = enable;
		core.scene = scene;
		core.pause = false;

		if (enable) {
			info.renderableNodes = [];
		}
		else {
			info.renderableNodes.forEach(info => {
				this._resumeNode(info);
			});
		}
	}
}

export { SingleStepDebugger }