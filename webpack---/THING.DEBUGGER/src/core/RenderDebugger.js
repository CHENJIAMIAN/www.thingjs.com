import { Utils } from '../common/Utils';

const KEY = {
	DRAWCALLS: 'DRAWCALLS',
	VERTICES: 'VERTICES',
	FACES: 'FACES',
	NODES: 'NODES',
	TEXTURES: 'TEXTURES',
}
class RenderDebugger {

	constructor() {
		this.app = Utils.getCurrentApp();
		this.sceneAnalyze = Utils.createObject('SceneAnalyzeDebugger');
	}

	beginAnalyze(object) {
		if (!object || !this.sceneAnalyze) {
			return;
		}

		this.curObject = object;

		this.sceneAnalyze = Utils.createObject('SceneAnalyzeDebugger');

		this.sceneAnalyze.beginAnalyze(object);
	}

	endAnalyze() {
		if (!this.sceneAnalyze) {
			return;
		}
		this.sceneAnalyze.endAnalyze();
	}

	clearAnalyzeResult() {
		if (!this.sceneAnalyze) {
			return;
		}
		this.sceneAnalyze.clearAnalyzeResult();
	}

	getAnalyzeResult(type = 'drawCalls', options = {}) {
		if (!type || !this.curObject || !this.sceneAnalyze) {
			return;
		}

		let key = type.toUpperCase();
		if (key === KEY.TEXTURES) {
			options.size && (key = options.size);
		}

		const analyzeResult = this.sceneAnalyze.getAnalyzeResult(type, options);

		return analyzeResult;
	}

}

export {
	RenderDebugger
}