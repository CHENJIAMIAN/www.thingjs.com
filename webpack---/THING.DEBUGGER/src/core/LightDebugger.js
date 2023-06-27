import { Utils } from '../common/Utils';

const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	var app = Utils.getCurrentApp();

	// #region Private Functions

	// Initalize.
	_private.init = function () {
		_private.rendererDebugger = param['rendererDebugger'];
	}

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		var rendererDebugger = _private.rendererDebugger;

		// Light options
		var options = {
			enable: true,
			helper: false,
			shadow: true,
			outputLog: function () {
				console.log(rendererDebugger.lightOptions.lights);
			},
			lights: {},
		};

		rootUI.add(options, 'enable').onChange(value => {
			rendererDebugger.lightOptions = { enable: value };
		});
		rootUI.add(options, 'helper').onChange(value => {
			rendererDebugger.lightOptions = { helper: value };
		});
		rootUI.add(options, 'shadow').onChange(value => {
			rendererDebugger.lightOptions = { shadow: value };
		});
		rootUI.add(options, 'outputLog');

		// Add lights folder
		var lightsFolder = rootUI.addFolder('Lights');

		// Set light hookers
		rendererDebugger.lightOptions = {
			// When add light
			onAddLight: function (light) {
				var lights = options.lights;

				var name = light.name || 'light' + Object.keys(lights).length;
				light.userData['debugger_binding_name'] = name;

				lights[name] = light.visible;

				var buttonElement = lightsFolder.add(lights, name).onChange(value => {
					light.visible = value;
				});

				light.userData['onAddLight_buttonElement'] = buttonElement;
			},
			// When remove light
			onRemoveLight: function (light) {
				var buttonElement = light.userData['onAddLight_buttonElement'];
				buttonElement.remove();

				var name = light.userData['debugger_binding_name'];
				if (name) {
					var lights = options.lights;
					delete lights[light.userData['debugger_binding_name']];

					delete light.userData['debugger_binding_name'];
				}

				delete light.userData['onAddLight_buttonElement'];
			}
		};

		rendererDebugger.lightOptions.refresh(app.root.node);
	}

	// #endregion

	_private.rendererDebugger = null;

	_private.init();
}

class LightDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

}

export { LightDebugger }