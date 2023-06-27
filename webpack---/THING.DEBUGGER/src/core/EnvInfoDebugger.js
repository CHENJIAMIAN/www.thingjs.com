import { detect } from '../../libs/detect-browser-master/es/index';

const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	let _private = that[__.private];
	_private.app = THING.App.current;
	_private.system = null;
	_private.gpu = null;
	_private.webgl = null;

	// #region Private Functions
	_private.getGPUInfo = function() {
		//WEBGL_debug_renderer_info is deprecated in Firefox and will be removed. Please use RENDERER.
		//But RENDERER no GPU info;
		let gl = _private.app.view.getContext();
		let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
		return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
	}

	_private.supportWebGL2 = function(webgl) {
        var version = parseFloat(/^WebGL\ ([0-9])/.exec(webgl.getParameter(webgl.VERSION))[1]);
        return version >= 2;
    }
	_private.getWebGLInfo = function(){
		let gl = _private.app.view.getContext();
		let gl_version = gl.getParameter(gl.VERSION);
		let gl_info = {glVersion: gl_version};
		gl_info.props4version1 = {
			maxVertexAttr: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
			maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
			maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
			maxTexSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
			maxCubeMapTexSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
			maxTexImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
			maxVertexTexImgUnits: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
			maxCombinedTexImgUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
			maxVertexUniform: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
			maxFragmentUniform: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
			supportedExtensions: gl.getSupportedExtensions()
		}
		if(_private.supportWebGL2(gl)){
			gl_info.props4version2 = {
				maxCombinedUniformBlocks: gl.getParameter(gl.MAX_COMBINED_UNIFORM_BLOCKS),
				maxFragmentUniformBlocks: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_BLOCKS),
				maxVertexUniformBlocks: gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS),
				maxElementsVertices: gl.getParameter(gl.MAX_ELEMENTS_VERTICES),
				maxElementsIndices: gl.getParameter(gl.MAX_ELEMENTS_INDICES),
				maxElementIndex: gl.getParameter(gl.MAX_ELEMENT_INDEX),     
				max3DTexSize: gl.getParameter(gl.MAX_3D_TEXTURE_SIZE),
				maxArrayTextureLayers: gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS),
			}
		}
		return gl_info;
	}

	// Initalize.
	_private.init = function () {
		_private.system = detect();
		_private.gpu = _private.getGPUInfo();
		_private.webgl = _private.getWebGLInfo();
	}

	_private.init();
}

/**
 * @class DebuggerStats
 * The debugger stats.
 * @memberof THING
 */
class EnvInfoDebugger {

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
		var _private = this[__.private];

	}
	endProfile() {
		var _private = this[__.private];



	}
	getProfileInfo() {
		var _private = this[__.private];

		return {
			browser: {
				name: _private.system.name,
				version: _private.system.version,
			},
			os: _private.system.os,
			gpu: _private.gpu,
			screen: {
				width: screen.width,
				height: screen.height,
			},
			webgl: _private.webgl,
		}
	}

}

export { EnvInfoDebugger }