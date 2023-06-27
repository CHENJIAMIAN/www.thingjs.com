import { T3D, Utils } from '../common/Utils.js';

var getPixelBytes = function (context, format) {
	if (format == context.ALPHA || format == context.LUMINANCE) {
		return 1;
	}
	else if (format == context.RGB || format == context.RGB8) {
		return 3;
	}
	else if (format == context.RGBA || format == context.RGBA8) {
		return 4;
	}

	return 1;
}

class StatsDebugger {

	constructor() {
		this.info = this.buildInfo();
	}

	buildCountsAttributes() {
		var attributes = {
			value: 0,
			clear: function () {
				this.value = 0;
			},
			updateValue: function (count) {
				this.value += count;
			},
			onValueChange: function () { }
		};

		return attributes;
	}

	buildInfo() {
		var that = this;

		var info = {
			enable: false,
			counts: {
				bindTexture: this.buildCountsAttributes(),
				bindBuffer: this.buildCountsAttributes(),
				bindFrameBuffer: this.buildCountsAttributes(),
				texImage2D: this.buildCountsAttributes(),
				readPixels: this.buildCountsAttributes(),
				linkProgram: this.buildCountsAttributes(),
				uniforms: this.buildCountsAttributes(),
			},
			textures: new Set(),
			bindingTextures: {},
			buffers: new Set(),
			bindingBuffers: {},
		};

		info.clear = function () {
			var counts = this.counts;

			for (var key in counts) {
				var count = counts[key];
				count.clear();
			}
		}

		info.notifyValueChange = function () {
			var counts = this.counts;
			var enable = that.info.enable;

			for (var key in counts) {
				var count = counts[key];

				if (enable) {
					count.onValueChange(count.value);
				}
			}
		}

		info.getByteLength = function (type) {
			var byteLength = 0;
			info[type].forEach(object => {
				byteLength += object.byteLength;
			});

			return byteLength;
		}

		return info;
	}

	processRenderer(renderer) {
		var info = this.info;
		var counts = info.counts;
		var context = renderer.renderPass.gl;
		if (!context) {
			console.error(`Renderer's context can not access`);
		}

		// Build byte lengths
		var byteLengths = {};
		Object.defineProperty(byteLengths, "textures", {
			get: function () {
				return info.getByteLength('textures');
			}
		});
		Object.defineProperty(byteLengths, "buffers", {
			get: function () {
				return info.getByteLength('buffers');
			}
		});

		// Extend renderer info
		var external = { byteLengths };
		Object.defineProperty(external, "buffers", {
			get: function () {
				return info.buffers.size;
			}
		});
		Object.defineProperty(external, "textures", {
			get: function () {
				return info.textures.size;
			}
		});
		renderer.external = external;
		// #region Buffer

		var old_createBuffer = context.createBuffer;
		context.createBuffer = function () {
			var buffer = old_createBuffer.apply(this, arguments);
			buffer.byteLength = 0;

			info.buffers.add(buffer);

			return buffer;
		}

		var old_deleteBuffer = context.deleteBuffer;
		context.deleteBuffer = function () {
			old_deleteBuffer.apply(this, arguments);

			info.buffers.delete(arguments[0]);
		}

		var old_bindBuffer = context.bindBuffer;
		context.bindBuffer = function () {
			counts.bindBuffer.updateValue(1);

			old_bindBuffer.apply(this, arguments);

			var type = arguments[0];
			var buffer = arguments[1];

			info.bindingBuffers[type] = buffer;
		}

		var old_bufferData = context.bufferData;
		context.bufferData = function () {
			old_bufferData.apply(this, arguments);

			var type = arguments[0];

			var bindingBuffer = info.bindingBuffers[type];
			if (bindingBuffer) {
				var array = arguments[1];

				bindingBuffer.byteLength = array.byteLength;
			}
		}

		// #endregion

		// #region FrameBuffer

		var old_bindFrameBuffer = context.bindFrameBuffer;
		context.bindFrameBuffer = function () {
			counts.bindFrameBuffer.updateValue(1);
			old_bindFrameBuffer.apply(this, arguments);
		}

		// #endregion

		// #region Texture

		var old_createTexture = context.createTexture;
		context.createTexture = function () {
			var type = arguments[0];

			var texture = old_createTexture.apply(this, arguments);
			texture.type = type;
			texture.byteLength = 0;

			info.textures.add(texture);

			return texture;
		}

		var old_deleteTexture = context.deleteTexture;
		context.deleteTexture = function () {
			old_deleteTexture.apply(this, arguments);

			info.textures.delete(arguments[0]);
		}

		var old_bindTexture = context.bindTexture;
		context.bindTexture = function () {
			counts.bindTexture.updateValue(1);

			old_bindTexture.apply(this, arguments);

			var type = arguments[0];
			var texture = arguments[1];

			info.bindingTextures[type] = texture;
		}

		var old_texImage2D = context.texImage2D;
		context.texImage2D = function () {
			counts.texImage2D.updateValue(1);

			old_texImage2D.apply(this, arguments);

			var type = arguments[0];

			var bindingTexture = info.bindingTextures[type];
			if (bindingTexture) {
				var internalFormat = arguments[2];

				var width, height;
				if (arguments.length == 6) {
					width = Utils.parseValue(arguments[5].width, 0);
					height = Utils.parseValue(arguments[5].height, 0);
				}
				else {
					width = Utils.parseValue(arguments[3], 0);
					height = Utils.parseValue(arguments[4], 0);
				}

				var pixelBytes = getPixelBytes(context, internalFormat);
				var byteLength = width * height * pixelBytes;

				bindingTexture.type = type;
				bindingTexture.byteLength = byteLength;
			}
		}

		var old_readPixels = context.readPixels;
		context.readPixels = function () {
			counts.readPixels.updateValue(1);
			old_readPixels.apply(this, arguments);
		}

		// #endregion

		// #region Shader

		var old_createShader = context.createShader;
		context.createShader = function () {
			var shader = old_createShader.apply(this, arguments);

			var type = arguments[0];
			if (type == this.VERTEX_SHADER) {
				shader.type = 'vs';
			}
			else if (type == this.FRAGMENT_SHADER) {
				shader.type = 'fs';
			}
			else {
				shader.type = 'unknown';
			}

			return shader;
		}

		var old_deleteShader = context.deleteShader;
		context.deleteShader = function () {
			old_deleteShader.apply(this, arguments);
		}

		var old_shaderSource = context.shaderSource;
		context.shaderSource = function () {
			var shader = arguments[0];
			var string = arguments[1];

			shader.code = string;

			old_shaderSource.apply(this, arguments);
		}

		var old_attachShader = context.attachShader;
		context.attachShader = function () {
			old_attachShader.apply(this, arguments);
		}

		var old_createProgram = context.createProgram;
		context.createProgram = function () {
			return old_createProgram.apply(this, arguments);
		}

		var old_linkProgram = context.linkProgram;
		context.linkProgram = function () {
			counts.linkProgram.updateValue(1);
			old_linkProgram.apply(this, arguments);
		}

		var uniforms = [
			'uniform1f',
			'uniform2f',
			'uniform2fv',
			'uniform3f',
			'uniform3fv',
			'uniform4f',
			'uniform4fv',
			'uniformMatrix2fv',
			'uniformMatrix3fv',
			'uniformMatrix4fv',
			'uniform1i',
			'uniform1iv',
			'uniform2iv',
			'uniform3iv',
			'uniform4iv',
			'uniform1ui',
			'uniform1fv',
			'uniform1iv',
			'uniform2iv',
			'uniform3iv',
			'uniform4iv',
		];
		uniforms.forEach(funcName => {
			var old_uniform = context[funcName];
			context[funcName] = function () {
				counts.uniforms.updateValue(1);
				old_uniform.apply(this, arguments);
			}
		});

		// #endregion
	}

	/**
	 * Get/Set stats options.
	 * @type {Object}
	 */
	get options() {
		return this.info;
	}
	set options(value) {
		var info = this.info;

		info.enable = Utils.parseValue(value['enable'], info.enable);
	}

}

export { StatsDebugger }