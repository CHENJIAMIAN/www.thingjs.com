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

		// The options
		var options = {
			slowMotionOptions: {
				interval: 0,
			},
		};

		// Slow-Motion
		var slowMotionFolder = rootUI.addFolder('SlowMotion');
		var slowMotionOptions = options.slowMotionOptions;
		slowMotionFolder.add(slowMotionOptions, 'interval').min(0).max(100).step(1).onChange(value => {
			var app =Utils.getCurrentApp();
			app.timer.fixedDeltaTime = value / 1000;
		});
	}

	// Initalize.
	_private.init = function () {
	}

	// #endregion

	_private.init();
}

class AnimationDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

}

export { AnimationDebugger }