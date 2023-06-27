import { Utils } from '../common/Utils';

const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];

	// #region Private Functions

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		var rendererDebugger = _private.rendererDebugger;
		var colorElement = null;

		// Material options
		var options = {
			mode: rendererDebugger.materialOptions.mode || 'default',
			wireframeColor: rendererDebugger.materialOptions.wireframeColor,
			precision: rendererDebugger.materialOptions.precision || 'default',
		};

		// Create material folder
		rootUI.add(options, 'mode', ['default', 'simpleUV', 'wireframe']).onChange(value => {
			rendererDebugger.materialOptions = { mode: value };

			if (value == 'wireframe') {
				colorElement = rootUI.addColor(options, 'wireframeColor').onChange(value => {
					rendererDebugger.materialOptions = { wireframeColor: value };
				});
			}
			else if (colorElement) {
				rootUI.remove(colorElement);
				colorElement = null;
			}
		});
		rootUI.add(options, 'precision', ['default', 'highp', 'mediump', 'lowp']).onChange(value => {
			rendererDebugger.materialOptions = { precision: value };
		});
	}

	// Initalize.
	_private.init = function () {
		_private.rendererDebugger = param['rendererDebugger'];
	}

	// #endregion

	_private.rendererDebugger = null;

	_private.init();
}

class MaterialDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

}

export { MaterialDebugger }