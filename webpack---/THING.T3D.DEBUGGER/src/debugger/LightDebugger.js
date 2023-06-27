import { Utils, T3D } from '../common/Utils.js';
class LightDebugger {

	constructor() {
		this.info = this.buildInfo();

		this.processLightFunctions();
	}

	buildInfo() {
		var info = {
			enable: true,
			helper: false,
			shadow: true,
			lights: [],
			helpers: [],
			onOutputLog: function () { },
			onAddLight: function () { },
			onRemoveLight: function () { },
		};

		return info;
	}

	createLightHelper(light) {
		var helper = null;
		// if (light.isDirectionalLight) {
		// 	helper = new THREE.DirectionalLightHelper(light);
		// }
		// else if (light.isPointLight) {
		// 	helper = new THREE.PointLightHelper(light);
		// }
		// else if (light.isSpotLight) {
		// 	helper = new THREE.SpotLightHelper(light);
		// }
		// else if (light.isHemisphereLight) {
		// 	helper = new THREE.HemisphereLightHelper(light);
		// }

		if (helper) {
			helper.visible = false;
			light.add(helper);

			light.updateMatrixWorld();
		}

		return helper;
	}

	deleteLightHelper(helper) {
		if (!helper) {
			return;
		}

		if (!helper.parent) {
			return;
		}

		helper.parent.remove(helper);
		helper.dispose();
	}

	getRoot(object) {
		var parent = object.parent;
		if (!parent) {
			return object;
		}

		while (parent.parent) {
			parent = parent.parent;
		}

		return parent;
	}

	traverseLight(object, callback) {
		object.traverse(function (node) {
			if (node.isLight) {
				callback(node);
			}
		});
	}

	refreshLight(scene) {
		var userData = scene.userData;
		var hookers = userData['hookers'];
		if (!hookers) {
			return;
		}

		// Call existing lights
		this.traverseLight(scene, light => {
			hookers['light']['onAddLight'](light);
		});
	}

	processLightFunctions() {
		var that = this;

		var notifyLight = function (object, ev, callback) {
			var root = that.getRoot(object);
			var userData = root.userData;
			var hookers = userData['hookers'];
			if (hookers) {
				var lightHookers = hookers['light'];
				if (lightHookers) {
					var type = ev.type;
					if (type == 'added') {
						var onAddLight = lightHookers['onAddLight'];
						if (Utils.isFunction(onAddLight)) {
							callback(onAddLight);
						}
					}
					else if (type == 'removed') {
						var onRemoveLight = lightHookers['onRemoveLight'];
						if (Utils.isFunction(onRemoveLight)) {
							callback(onRemoveLight);
						}
					}
				}
			}
		}

		var old_object3d_dispatchEvent = T3D.Object3D.prototype.dispatchEvent;
		T3D.Object3D.prototype.dispatchEvent = function (ev) {
			notifyLight(this, ev, (callback) => {
				that.traverseLight(this, light => {
					callback(light);
				});
			});

			old_object3d_dispatchEvent.call(this, ev);
		}
	}

	processSceneHookers(scene) {
		var userData = scene.userData;
		var hookers = userData['hookers'];
		if (hookers) {
			return;
		}

		// Build hookers
		hookers = {};
		userData['hookers'] = hookers;

		// Get light info
		var info = this.info;
		var lights = info.lights;
		var helpers = info.helpers;

		// Setup light hookers
		hookers['light'] = {
			helper: false,
			onAddLight: (light) => {
				if (lights.indexOf(light) == -1) {
					lights.push(light);

					var helper = this.createLightHelper(light);
					helpers.push(helper);
				}

				info.onAddLight(light);
			},
			onRemoveLight: (light) => {
				var index = lights.indexOf(light);
				if (index !== -1) {
					lights.splice(index, 1);

					this.deleteLightHelper(helpers[index]);
					helpers.splice(index, 1);
				}

				info.onRemoveLight(light);
			}
		};

		this.refreshLight(scene);
	}

	processSceneLights(scene) {
		var info = this.info;
		var helpers = info.helpers;
		var lightHooker = scene.userData['hookers']['light'];

		if (info.helper) {
			if (lightHooker.helper) {
				helpers.forEach(helper => {
					if (!helper) {
						return;
					}

					helper.visible = true;
				});
			}
			else {
				lightHooker.helper = true;

				helpers.forEach(helper => {
					if (!helper) {
						return;
					}

					if (helper.update) {
						helper.update();
					}
				});
			}
		}
		else if (lightHooker.helper) {
			lightHooker.helper = false;

			helpers.forEach(helper => {
				if (!helper) {
					return;
				}

				helper.visible = false;
			});
		}
	}

	processScene(scene) {
		this.processSceneHookers(scene);
		this.processSceneLights(scene);
	}

	/**
	 * Get/Set options.
	 * @type {Object}
	 */
	get options() {
		var that = this;
		var info = this.info;

		return {
			enable: info.enable,
			helper: info.helper,
			shadow: info.shadow,
			lights: info.lights,
			onAddLight: info.onAddLight,
			onRemoveLight: info.onRemoveLight,
			refresh: function (scene) {
				that.refreshLight(scene.$node);
			}
		};
	}
	set options(value) {
		var info = this.info;

		info.enable = Utils.parseValue(value['enable'], info.enable);
		info.helper = Utils.parseValue(value['helper'], info.helper);
		info.shadow = Utils.parseValue(value['shadow'], info.shadow);
		info.onAddLight = value['onAddLight'] || info.onAddLight;
		info.onRemoveLight = value['onRemoveLight'] || info.onRemoveLight;
	}

}

export { LightDebugger }