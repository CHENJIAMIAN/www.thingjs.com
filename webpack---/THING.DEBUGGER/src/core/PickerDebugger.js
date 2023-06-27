import { Utils } from '../common/Utils';

const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	
	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		// The options
		var options = {
			enable: true,
			show: false,
		};

		rootUI.add(options, 'enable').onChange(value => {
			_private.app.picker.enable = value;
		});
		rootUI.add(options, 'show').onChange(value => {
			_private.app.camera.helper.showPicker(value);
		});
	}

	_private.initSelect = function(){
		_private.app.on('click', function (ev) {
			if (!ev || !ev.object) {
				return;
			}

			if (ev.ctrlKey) {
				let target = ev.object;
				if(THING.d.getSelectedObject() == target){
					target = _private.app.camera.node.pickFromGPU([ev.x,ev.y]);
					target = target ? target.mesh : ev.object;
				}
				THING.d.select(target, true);
			}
		});
	}

	// Initalize.
	_private.init = function (param) {
		_private.app = Utils.getCurrentApp();
		_private.initSelect();
		
	}

	_private.init(param);
}

class PickerDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}
}

export { PickerDebugger }