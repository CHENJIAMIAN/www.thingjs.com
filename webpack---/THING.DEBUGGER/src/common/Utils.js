import { Utils as BaseUtils } from '@uino/thing';
import { createTypeChecker } from '../adapter/AdapterInterfaces';

var _typeCheker;
if (_DEBUG) {
	_typeCheker = createTypeChecker();
}

/**
 * @class Utils
 * Useful functions.
 * @memberof THING
 */
class Utils extends BaseUtils {
	static app = null;
	static setCurrentApp(app) {
		this.app = app;
	}
	static getCurrentApp() {
		return this.app;
	}
	static createObject(type, options) {
		var out = {};
		var object = super.createObject(type, options, out);
		if (object) {
			if (_DEBUG) {
				_typeCheker.checkObject(out.type, object);
			}
		}

		return object;
	}

}

export { Utils };