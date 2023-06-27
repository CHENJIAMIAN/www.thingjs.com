import { Utils } from '../common/Utils.js'

class NodeStats {

	constructor(node) {
		this.node = Utils.getObject3D(node);
		if (!this.node) {
			return;
		}

		this.meshes = this.node.getMeshes().length;
		this.vertices = this._getVerticesCount();
		this.materials = this._getMaterials().length;
		this.textures = this._getTextures().length;
	}

	_getVerticesCount() {
		let count = 0;
		this.node.traverse(node => {
			var geometry = node.geometry;
			if (!geometry) {
				return;
			}
			count += node.geometry.getVerticesCount();
		});

		return count;
	}
	_getMaterials() {
		var materials = [];
		this.node.getMaterials().forEach(material => {
			if (material.visible === undefined) {
				Object.defineProperty(material, "visible", {
					get: function () {
						return true;
					},
					set: function() {
						console.warn("t3d material is not supported set invisible");
						return false;
					}
				});
			}

			var info = {
				name: material.name ? material.name : materials.length.toString(),
			};

			Object.defineProperty(info, "object", {
				get: function () {
					return material;
				}
			});

			Object.defineProperty(info, "visible", {
				get: function () {
					return material.visible;
				},
				set: function (value) {
					material.visible = value;
				}
			});

			info.getTextures = function () {
				var textures = new Map();
				for (var key in material) {
					var texture = material[key];
					if (texture && texture.isTexture) {
						textures.set(key, texture);
					}
				}

				var _textures = [];
				textures.forEach((texture, key) => {
					var info = {
						type: key,
						name: texture.name ? texture.name : _textures.length.toString(),
						image: texture.image,
					};

					Object.defineProperty(info, "object", {
						get: function () {
							return texture;
						}
					});

					_textures.push(info);
				});

				return _textures;
			}

			materials.push(info);
		});

		return materials;
	}

	_getTextures() {
		var textures = [];
		this.node.getTextures().forEach(texture => {
			var info = {
				name: texture.name ? texture.name : textures.length.toString(),
				image: texture.image,
			};

			Object.defineProperty(info, "object", {
				get: function () {
					return texture;
				}
			});

			textures.push(info);
		});

		return textures;
	}

}

export { NodeStats }