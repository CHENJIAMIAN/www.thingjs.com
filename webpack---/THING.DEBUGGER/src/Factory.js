import { RenderDebugger } from './core/RenderDebugger';

let _createObject = function (type, param) {
	switch (type) {
		case 'RenderDebugger': {
			return new RenderDebugger();
		}
		default:
			return null;
	}
}

class Factory {

	constructor() {
	}

	createObject(type, options) {
		var object = _createObject(type, options);
		if (!object) {
			return null;
		}

		return object;
	}

}

export { Factory }