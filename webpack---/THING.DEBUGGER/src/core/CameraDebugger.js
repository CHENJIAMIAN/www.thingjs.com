const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	var app = param["app"];

	// #region Private Functions

	// Change to default.
	_private.ChangeToDefault = function () {
		// Update observed
		_private.observed.helper.visible = false;
		_private.observed.enableViewport = true;

		// Destroy observer
		_private.observer.destroy();
		_private.observer = null;

		// Resume render camera
		app.renderCamera = _private.observed;

		// Notify outside
		_private.callbacks['onChangeToDefault']();
	}

	// Change to observer.
	_private.ChangeToObserver = function () {
		// Create observer
		_private.observer = app.camera.clone();
		_private.observer.enable = true;
		_private.observer.name = 'Observer';
		_private.observer.helper.visible = false;
		_private.observer.near = 0.1;
		_private.observer.far = 1000000;
		_private.observer.enableViewport = true;

		// Update observed
		_private.observed.helper.visible = true;
		_private.observed.enableViewport = false;

		// Update render camera
		app.renderCamera = _private.observer;

		// Notify outside
		_private.callbacks['onChangeToObserver']();
	}

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		// The options
		var options = {
			fov: 0,
			near: 0.1,
			far: 0.1,
			mode: 'Default',
		};

		rootUI.add(options, 'fov').listen();
		rootUI.add(options, 'near').listen();
		rootUI.add(options, 'far').listen();
		rootUI.add(options, 'mode', ['Default', 'Observer']).onChange(value => {
			switch (value) {
				case 'Default': _private.ChangeToDefault(); break;
				case 'Observer': _private.ChangeToObserver(); break;
				default:
					break;
			}
		});

		// Save options
		_private.options = options;
	}

	// #endregion

	_private.options = {};

	_private.callbacks = {
		'onChangeToDefault': function () { },
		'onChangeToObserver': function () { },
	};

	_private.observer = null;
	_private.observed = app.camera;
}

class CameraDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

	begin() {
		var _private = this[__.private];
		var observed = _private.observed;

		// Sync observed camera options
		var options = _private.options;
		options.fov = observed.fov;
		options.near = observed.near;
		options.far = observed.far;
	}

}

export { CameraDebugger }