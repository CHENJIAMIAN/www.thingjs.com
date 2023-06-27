import { Utils } from '../common/Utils.js';
import { Version } from '@uino/base-thing';

class SceneHierarchy {

	constructor(object) {
		this._root = null;

		this._init(object);
	}

	_init(object) {
		let funcName = 'isBaseObject3D';
		let currentVersion = new Version(THING.VERSION);
		let checkVersion = new Version('2.5.0');
		if (currentVersion.compare(checkVersion) >= 0) {
			funcName = 'isObject3D';
		}

		if (object[funcName]) {
			this._root = this._getRoot({}, object);
		}
		else {
			this._root = object;
		}
	}

	_getRoot(root, object) {
		root.object = object;
		root.instancing = object.getStyle() && object.getStyle().isInstancedDrawing;
		if (!root.instancing) {
			root.body = { object: object.bodyNode._node, children: [] };
			this._generateBody(object.bodyNode._node, root.body.children);
		}


		root.children = [];
		object.children.forEach(child => {
			var childInfo = { object: null, children: [] };
			this._getRoot(childInfo, child);
			root.children.push(childInfo);
		});

		return root;
	}

	_generateBody(renderObject, children) {
		renderObject.children.forEach(object => {
			let child = { object: object, children: [] };
			children.push(child);
			if (object.children.length) {
				this._generateBody(object, child.children);
			}
		})
	}

	_traverseHierarchy(info, callback) {
		callback(info);

		info.children.forEach(child => {
			this._traverseHierarchy(child, callback);
		});
	}

	_traverseHierarchyBreakable(info, callback) {
		if (callback(info.node)) {
			return info.node;
		}

		var children = info.children;
		for (var i = 0, l = children.length; i < l; i++) {
			var childInfo = children[i];

			var node = this._traverseHierarchyBreakable(childInfo, callback);
			if (node) {
				return node;
			}
		}

		return null;
	}

	_filterHierarchy(result, root, callback) {
		result.children = [];
		root.children.forEach(child => {
			var childResult = {};
			if (this._filterHierarchy(childResult, child, callback)) {
				result.children.push(childResult);
			}
		});
		result.object = root.object;
		result.instancing = root.instancing;
		if (!result.instancing) {
			result.body = root.body;
		}

		if (!callback(result)) {
			return false;
		}

		return true;
	}

	traverse(callback) {
		this._traverseHierarchy(this._root, callback);
	}

	traverseBreakable(callback) {
		return this._traverseHierarchyBreakable(this._root, callback);
	}

	filter(callback) {
		var hierarchy = {};
		this._filterHierarchy(hierarchy, this._root, callback);

		return new SceneHierarchy(hierarchy);
	}

	getNodeByUUID(uuid) {
		return this.traverseBreakable(function (node) {
			return node.uuid == uuid;
		});
	}

	getRoot() {
		return this._root;
	}

}

export { SceneHierarchy }