import { Utils as BaseUtils } from '@uino/thing';
let T3D = THING.T3D;

/**
 * @class Utils
 * Useful functions.
 * @memberof THING.T3D.DEBUGGER
 */
class Utils extends BaseUtils {

	static parseColor(value, defaultValue) {
		var value = super.parseColor(value, defaultValue);
		if (value) {
			return new T3D.Color3(value[0], value[1], value[2]);
		}

		return defaultValue;
	}

	static parseVector3(value, defaultValue) {
		if (value) {
			// 参数：Vector3(0, 1, 0);
			if (value.isVector3) {
				return value;
			}
			// 参数：[0, 1, 0]
			else if (Utils.isArray(value)) {
				if (value.length === 1) {
					return new T3D.Vector3(value[0], 0, 0);
				}
				else if (value.length === 2) {
					return new T3D.Vector3(value[0], 0, value[1]);
				}
				else {
					return new T3D.Vector3(value[0], value[1], value[2]);
				}
			}
			// 参数：'0, 1, 0'
			else if (Utils.isString(value)) {
				var strings = value.split(/,| /);
				for (var i = 0; i < strings.length; i++) {
					var string = strings[i].trimBoth('\\[\\]');
					if (string.isBlank()) {
						strings.splice(i--, 1);
						continue;
					}

					strings[i] = Number(string);
				}

				return Utils.parseVector3(strings, defaultValue);
			}
		}

		return defaultValue;
	}

	static getObject3D(node) {
		if (node) {
			if (node.isRenderableObject) {
				return node;
			}

			if (node.isRenderableNode) {
				return node.$node;
			}

			if (node.isBaseObject) {
				return node.node.$node;
			}
		}

		return null;
	}

	static getRenderableNode(node) {
		if (node) {
			if (node.isRenderableObject) {
				let baseObj = node.getBaseObject();
				if (baseObj) {
					return baseObj.node;
				} else {
					return null;
				}
			}

			if (node.isRenderableNode) {
				return node;
			}

			if (node.isBaseObject) {
				return node.node;
			}
		}

		return null;
	}

	static getBaseObject(node) {
		if (node) {
			if (node.isRenderableObject || node.isRenderableNode) {
				return node.getBaseObject();
			}

			if (node.isBaseObject) {
				return node;
			}
		}
		return null;
	}

	static base64ToImage(src) {
		var image = new Image();
		image.src = src;

		return image;
	}
	static getT3dSceneFromThingScene(scene) {
		return scene.$uScene.getRoot().$node;
	}

	static isInstanceNode(node) {
		let baseObject = getBaseObject(node)
		if (baseObject && baseObject.style) {
			return baseObject.style.isInstanceDrawing;
		}
		return false;
	}

}

export { Utils, T3D };