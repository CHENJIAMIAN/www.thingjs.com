const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	let _private = that[__.private];
	_private.temporalSuperSampling = null;
	_private.postEffectOverAll = null;
	_private.postEffectOverObject = null;
	_private.app = null;


	_private.getPostEffectOverObject = function(key){
		if (!_private.postEffectOverObject.has(key)) {
			_private.postEffectOverObject.set(key,new Array());
		}
		return _private.postEffectOverObject.get(key);
	}
	_private.collectPostEffectFromObject = function (obj) {
		if (!obj.style || !obj.style.effect) {
			return;
		}
		let effect = obj.style.effect;
		for (let key in effect) {
			if (effect[key]) {
				let effArray = _private.getPostEffectOverObject(key);
				effArray.push(obj);
			}
		}
	}
	_private.collectPostEffectFromScene = function () {
		let objects = _private.app.query(".BaseObject3D");
		for(let obj of objects.objects){
			_private.collectPostEffectFromObject(obj);
		}
	}
	_private.removeEmptySet = function () {
		let arr = new Array();
		for (let [key, value] of _private.postEffectOverObject) {
			if (value.size == 0) {
				arr.push(key);
			}
		}
		arr.forEach(element => {
			_private.postEffectOverObject.delete(element);
		});
	}
	_private.collectPostEffectOverObject = function () {
		_private.postEffectOverObject = new Map();
		_private.collectPostEffectFromScene();
		_private.removeEmptySet();
	}
	_private.collectPostEffectOverAll = function () {
		let postEffect = _private.app.camera.postEffect;

		_private.postEffectOverAll = {
			FXAA: postEffect.FXAA,
			MSAA: postEffect.MSAA,
			RBSplit: { msg: "2.0 do not support" },
			bloom: postEffect.bloom,
			blur: { msg: "2.0 do not support" },
			blurEdge: postEffect.blurEdge,
			chromaticAberration: postEffect.chromaticAberration,
			colorCorrection: postEffect.colorCorrection,
			dof: postEffect.dof,
			enable: postEffect.enable,
			film: postEffect.film,
			screenSpaceAmbientOcclusion: postEffect.screenSpaceAmbientOcclusion,
			screenSpaceReflection: postEffect.screenSpaceReflection,
			vignette: { msg: "2.0 give up this effect" },
			vignetting: postEffect.vignetting,
		}
	}

	// Initalize.

	_private.init = function (param) {
		_private.app = THING.App.current;
	}
	_private.init(param);
}

/**
 * @class DebuggerStats
 * The debugger stats.
 * @memberof THING
 */
class PostEffectDebugger {

	/**
	 * constructor.
	 * @param {Object} param The initial parameters.
	 */
	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);

		return this;
	}

	beginProfile() {
		// var _private = this[__.private];
		// let app = THING.App.current;
		// _private.temporalSuperSampling = app.postEffect.temporalSuperSampling;
		// _private.postEffectOverAll = app.postEffect.postEffect;
		// _private.postEffectOVerObject = null;



	}
	endProfile() {
		var _private = this[__.private];
		let app = THING.App.current;
		_private.temporalSuperSampling = app.camera.postEffect.temporalSuperSampling;
		_private.collectPostEffectOverAll();
		_private.collectPostEffectOverObject();

	}
	getProfileInfo() {
		var _private = this[__.private];

		return {
			temporalSuperSampling: _private.temporalSuperSampling,
			postEffectOverAll: _private.postEffectOverAll,
			postEffectOverObject: _private.postEffectOverObject,
		}
	}

}

export { PostEffectDebugger }