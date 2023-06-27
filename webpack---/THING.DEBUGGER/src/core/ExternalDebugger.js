import { Utils } from '../common/Utils';
import { DebuggerUtils } from './DebuggerUtils';

const __ = {
	private: Symbol('private'),
}

const cFunctionGroupIndexKey = '___function_group_index___';

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];

	// #region Private Functions

	// Initalize.
	_private.init = function () {
	}

	// Open the external debug sub folder.
	_private.openExternalDebugSubFolder = function (rootUI, object) {
		for (var key in object) {
			var subKeys = Object.keys(object[key]);
			if (subKeys.length) {
				subKeys.forEach(subKey => {
					_private.openExternalDebugSubFolder(rootUI.addFolder(key), object[key][subKey]);
				});
			}
			else {
				DebuggerUtils.createValueElement(rootUI, object, key);
			}
		}
	}

	// #endregion

	_private.init();
}

class ExternalDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolders(rootUI, external) {
		if (!external) {
			return;
		}

		var _private = this[__.private];

		for (var key in external) {
			var object = external[key];
			if (!object) {
				continue;
			}

			var rootFolder = rootUI.addFolder(key);
			_private.openExternalDebugSubFolder(rootFolder, object);

			delete object[cFunctionGroupIndexKey];
		}
	}
}

export { ExternalDebugger }