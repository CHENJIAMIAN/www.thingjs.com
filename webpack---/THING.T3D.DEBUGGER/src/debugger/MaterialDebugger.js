import { Utils } from '../common/Utils.js';
import uv_grid_opengl from '../../assets/images/uv_grid_opengl.jpg';

class MaterialDebugger {

	constructor() {
		this.info = this.buildInfo();
		this.materialMap = new Map();
	}

	buildSimpleUVImage() {
		return Utils.base64ToImage(uv_grid_opengl);
	}

	buildInfo() {
		var info = {
			enable: false,
			mode: 'default',
			precision: '',
			overrideMaterials: {
				'normal': {},
				'instancing': {},
				'sprite': {}
			},
			wireframeColor: 0xFFFFFF,
		};

		return info;
	}

	processMaterialPrecision(scene) {
		var info = this.info;

		var precision = info.precision;
		if (!precision) {
			return;
		}

		if (precision == 'default') {
			precision = '';
		}

		info.precision = '';

		var materials = scene.getMaterials();
		materials.forEach(material => {
			material.precision = precision;
			material.needsUpdate = true;
		});
	}

	setMaterialMode(value) {
		var info = this.info;
		info.mode = value;

		// toggle the debugger type
		let debuggerType = info.mode == 'simpleUV' ? 'UVBuffer' : '';
		THING.App.current.camera.node.setDebuggerType(debuggerType);

		// clear the material map
		if (info.mode != 'wireframe') {
			for (let material of this.materialMap.values()) {
				material.dispose();
			}
			this.materialMap = new Map();
		}
	}

	setMaterialWireframeColor(value) {
		var info = this.info;
		var color = Utils.parseColor(value);
		info.wireframeColor = color;
	}

	setMaterialPrecision(value) {
		var info = this.info;
		info.precision = value;
	}

	processScene(scene, renderables, options) {
		let info = this.info;

		if (info.precision) {
			this.processMaterialPrecision(scene);
		}
	}

	getMaterial(renderable) {
		let info = this.info;
		if (info.mode == 'wireframe') {
			let material = this.materialMap.get(renderable.material.id);
			if (!material) {
				material = renderable.material.clone();
				this.materialMap.set(renderable.material.id, material);
			}
			material.diffuseMap = null;
			material.diffuse = info.wireframeColor;
			material.wireframe = true;
			return material;
		}
		return renderable.material;
	}

	/**
	 * Get/Set material options.
	 * @type {Object}
	 */
	get options() {
		var info = this.info;

		return {
			enable: info.enable,
			mode: info.mode,
			wireframeColor: info.wireframeColor,
			precision: info.precision ? info.precision : 'default',
		};
	}
	set options(value) {
		var info = this.info;

		var mode = Utils.parseValue(value['mode'], info.mode);
		if (mode != info.mode) {
			this.setMaterialMode(mode);
		}

		var wireframeColor = Utils.parseValue(value['wireframeColor'], info.wireframeColor);
		if (wireframeColor != info.wireframeColor) {
			this.setMaterialWireframeColor(wireframeColor);
		}

		var precision = Utils.parseValue(value['precision'], info.precision);
		if (precision != info.precision) {
			this.setMaterialPrecision(precision);
		}
	}

}

export { MaterialDebugger }