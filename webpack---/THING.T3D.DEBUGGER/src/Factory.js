import { Stats } from '../libs/stats.module.js';
import { RendererStats } from '../libs/renderer-stats.js';
import { RendererDebugger } from './debugger/RendererDebugger';
import { SceneAnalyzeDebugger } from './debugger/SceneAnalyzeDebugger';

let _createObject = function (type, param) {
	switch (type) {
		case 'Stats': return new Stats();
		case 'RendererStats': return new RendererStats();
		case 'RendererDebugger': return new RendererDebugger(param);
		case 'SceneAnalyzeDebugger': return new SceneAnalyzeDebugger();
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