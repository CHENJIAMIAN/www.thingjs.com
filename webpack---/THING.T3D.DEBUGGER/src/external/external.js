import { Utils, T3D } from "../common/Utils.js";

let _position = new T3D.Vector3();
let _quaternion = new T3D.Quaternion();
let _scale = new T3D.Vector3();
let _worldPosition = new T3D.Vector3();
let _worldQuaternion = new T3D.Quaternion();
let _worldScale = new T3D.Vector3();
let _target = [];
let _matrix4 = new T3D.Matrix4();
let _box = new T3D.Box3();

// #region Object3D

T3D.Object3D.prototype.traverseMesh = function (callback) {
	this.traverse(mesh => {
		if (mesh.isMesh) {
			callback(mesh);
		}
	});
}

T3D.Object3D.prototype.traverseLight = function (callback) {
	this.traverse(function (node) {
		if (node.isLight) {
			callback(node);
		}
	});
}

T3D.Object3D.prototype.traverseParents = function (callback) {
	for (var parent = this.parent; parent; parent = parent.parent) {
		callback(parent);
	}
}

T3D.Object3D.prototype.traverseChild = function (callback) {
	var children = this.children;
	for (var i = 0, l = children.length; i < l; i++) {
		children[i].traverse(callback);
	}
}

T3D.Object3D.prototype.traverseBreakable = function (callback) {
	if (callback(this)) {
		return this;
	}

	var children = this.children;
	for (var i = 0, l = children.length; i < l; i++) {
		var node = children[i].traverseBreakable(callback);
		if (node) {
			return node;
		}
	}

	return null;
}

T3D.Object3D.prototype.traverseBranch = function (callback) {
	if (callback(this) === false) {
		return;
	}

	var children = this.children;
	for (var i = 0, l = children.length; i < l; i++) {
		children[i].traverseBranch(callback);
	}
}

T3D.Object3D.prototype.getObjectByUUID = function (uuid) {
	var result = null;
	this.traverseBranch(node => {
		if (node.uuid == uuid) {
			return result = node;
		}
	});

	return result;
}

T3D.Object3D.prototype.getRoot = function () {
	var parent = this.parent;
	if (!parent) {
		return this;
	}

	while (parent.parent) {
		parent = parent.parent;
	}

	return parent;
}

T3D.Object3D.prototype.getSkinnedMeshes = function () {
	var meshes = [];
	this.traverse(function (mesh) {
		if (mesh.isSkinnedMesh) {
			meshes.push(mesh);
		}
	});

	return meshes;
}

T3D.Object3D.prototype.getGeometries = function () {
	var geometries = new Set();
	this.traverse(function (node) {
		var geometry = node.geometry;
		if (geometry) {
			geometries.add(geometry);
		}
	});

	return Array.from(geometries);
}

T3D.Object3D.prototype.getMaterials = function () {
	var materials = new Set();
	this.traverse(function (node) {
		var material = node.material;
		if (material) {
			if (Array.isArray(material)) {
				material.forEach(m => {
					materials.add(m);
				});
			}
			else {
				materials.add(material);
			}
		}
	});

	return Array.from(materials);
}

T3D.Object3D.prototype.getTextures = function () {
	var textures = new Set();
	this.getMaterials().forEach(material => {
		material.getTextures().forEach(texture => {
			textures.add(texture);
		});
	});

	return Array.from(textures);
}

T3D.Object3D.prototype.getImages = function () {
	var images = new Set();
	this.getMaterials().forEach(material => {
		textureKeys.forEach(key => {
			var texture = material[key];
			if (!texture) {
				return;
			}

			var image = texture.image;
			if (!image) {
				return;
			}

			if (Array.isArray(image)) {
				image.forEach(_image => {
					images.add(_image);
				});
			}
			else {
				images.add(image);
			}
		});
	});

	return Array.from(images);
}

T3D.Object3D.prototype.getMeshes = function () {
	var meshes = [];
	this.traverse(function (mesh) {
		if (mesh.isMesh) {
			meshes.push(mesh);
		}
	});

	return meshes;
}


T3D.Object3D.prototype.getLights = function () {
	var lights = [];
	this.traverse(function (light) {
		if (light.isLight) {
			lights.push(light);
		}
	});

	return lights;
}

T3D.Object3D.prototype.getNodes = function () {
	var nodes = [];
	this.traverse(function (node) {
		nodes.push(node);
	});

	return nodes;
}

T3D.Object3D.prototype.getRenderableNodes = function () {
	var nodes = [];
	this.traverse(function (node) {
		if (node.isRenderable()) {
			nodes.push(node);
		}
	});

	return nodes;
}

T3D.Object3D.prototype.getNodeByUUID = function (uuid) {
	return this.traverseBreakable(function (node) {
		return node.uuid == uuid;
	});
}

T3D.Object3D.prototype.isChildOf = function (node) {
	var parent = this.parent;
	while (parent) {
		if (parent == node) {
			return true;
		}

		parent = parent.parent;
	}

	return false;
}

T3D.Object3D.prototype.isRenderable = function () {
	if (this.isSprite || this.isMesh || this.isLine || this.isPoints || this.isImmediateRenderObject) {
		return true;
	}

	return false;
}

T3D.Object3D.prototype.removeBySelf = function () {
	if (this.parent) {
		this.parent.remove(this);
	}
}

T3D.Object3D.prototype.getVerticesCount = function () {
	var count = 0;
	this.traverse(node => {
		var geometry = node.geometry;
		if (!geometry) {
			return;
		}

		count += node.geometry.getVerticesCount();
	});

	return count;
}

var __object3d_updateWorldMatrix = T3D.Object3D.prototype.updateWorldMatrix;
T3D.Object3D.prototype.updateWorldMatrix = function (updateParents, updateChildren, version) {
	// Here we use version to prevent unnecessary world matrix update
	if (version !== undefined) {
		if (this._updateWorldMatrix_version == version) {
			return;
		}

		this._updateWorldMatrix_version = version;
	}

	__object3d_updateWorldMatrix.call(this, updateParents, updateChildren);
}


T3D.Object3D.prototype.update = function (version) {
	this.updateWorldMatrix(true, true, version);
}

T3D.Object3D.prototype.dispose = function () {
	// Remove from parent
	var parent = this.parent;
	if (parent) {
		parent.remove(this);
	}

	this.traverse(node => {
		if (node.geometry) {
			node.geometry.dispose();
		}

		var material = node.material;
		if (material) {
			if (material.length !== undefined) {
				for (var i = 0; i < material.length; i++) {
					material[i].dispose();
				}
			}
			else {
				material.dispose();
			}
		}
	});
}

T3D.Object3D.prototype.setUserData = function (value) {
	this.userData = value;
}

T3D.Object3D.prototype.getUserData = function () {
	return this.userData;
}

T3D.Object3D.prototype.setVisible = function (value) {
	this.visible = value;
}

T3D.Object3D.prototype.getVisible = function () {
	return this.visible;
}

T3D.Object3D.prototype.isVisible = function () {
	for (var object = this; object; object = object.parent) {
		if (!object.visible) {
			return false;
		}
	}

	return this.getVisible();
}

T3D.Object3D.prototype.setName = function (value) {
	this.name = value;
}

T3D.Object3D.prototype.getName = function () {
	return this.name;
}

T3D.Object3D.prototype.setRenderOrder = function (value) {
	this.renderOrder = value;
}

T3D.Object3D.prototype.getRenderOrder = function () {
	return this.renderOrder;
}

T3D.Object3D.prototype.getParent = function () {
	return this.parent;
}

T3D.Object3D.prototype.getPosition = function (target) {
	if (!target) {
		target = _target;
	}
	return this.position.toArray(target);
}

T3D.Object3D.prototype.getQuaternion = function (target) {
	if (!target) {
		target = _target;
	}
	return this.quaternion.toArray(target);
}

T3D.Object3D.prototype.getScale = function (target) {
	if (!target) {
		target = _target;
	}
	return this.scale.toArray(target);
}

T3D.Object3D.prototype.decomposeWorldTransform = function (position, quat, scale) {
	this.updateWorldMatrix(true);

	this.worldMatrix.decompose(_position, _quaternion, _scale);
	_position.toArray(position);
	_quaternion.toArray(quat);
	_scale.toArray(scale);

	return this;
}

T3D.Object3D.prototype.getBaseObject = function () {
	var app = THING.App.current;
	if (!app) {
		return null;
	}

	// Find the bind node with UNode type
	var unode = null;
	var node = this;
	while (node) {
		unode = node.$unode;
		if (unode) {
			break;
		}

		node = node.parent;
	}

	while (unode) {
		var object = app.objectManager.getBaseObjectFromNode(unode);
		if (object) {
			return object;
		}

		unode = unode.getParent();
	}

	return null;
}

T3D.Object3D.prototype.getRootScene = function () {
	var object = this;
	while (object.parent) {
		if (object.isScene) {
			break;
		}

		object = object.parent;
	}

	return object;
}

T3D.Object3D.prototype.getRootNode = function () {
	var object = this.getBaseObject();
	if (!object) {
		return null;
	}

	return object.node.$node;
}

T3D.Object3D.prototype.isRenderableObject = {
	get: function () {
		return true;
	}
}

T3D.Object3D.prototype.doUpdateWorldMatrix = function () {
	this.matrixNeedsUpdate = true;
	this.updateWorldMatrix(true, true);
}

T3D.Object3D.prototype.getWorldPosition = function (target) {
	if (!target) {
		target = _target;
	}
	this.worldMatrix.decompose(_worldPosition, _worldQuaternion, _worldScale);
	_worldPosition.toArray(target);
	return target;
}

T3D.Object3D.prototype.getWorldQuaternion = function (target) {
	if (!target) {
		target = _target;
	}
	this.worldMatrix.decompose(_worldPosition, _worldQuaternion, _worldScale);
	_worldQuaternion.toArray(target);
	return target;
}

T3D.Object3D.prototype.getWorldScale = function (target) {
	if (!target) {
		target = _target;
	}
	this.worldMatrix.decompose(_worldPosition, _worldQuaternion, _worldScale);
	_worldScale.toArray(target);
	return target;
}

// #endregion

// #region UNode
T3D.UNode.prototype.getMeshes = function () {
	if (this._node) {
		return this._node.getMeshes();
	}
	return null;
}
T3D.UNode.prototype.getBaseObject = function () {
	if (this._node) {
		return this._node.getBaseObject();
	}
	return null;
}
T3D.UNode.prototype.name = {
	get: function () {
		return this.getName();
	},
	set: function (value) {
		this.setName(value);
	}
}
T3D.UNode.prototype.renderOrder = {
	get: function () {
		return this.getRenderOrder();
	},
	set: function (value) {
		this.setRenderOrder(value);
	}
}
T3D.UNode.prototype.visible = {
	get: function () {
		return this.getVisible();
	},
	set: function (value) {
		this.setVisible(value);
	}
}
T3D.UNode.prototype.position = {
	get: function () {
		let value = [0, 0, 0];
		this.getPosition(value);
		return value;
	},
	set: function (value) {
		this.setPosition(value);
	}
}
T3D.UNode.prototype.quaternion = {
	get: function () {
		let value = [0, 0, 0, 0];
		this.getQuaternion(value);
		return value;
	},
	set: function (value) {
		this.setQuaternion(value);
	}
}
T3D.UNode.prototype.scale = {
	get: function () {
		let value = [0, 0, 0];
		this.getScale(value);
		return value;
	},
	set: function (value) {
		this.setScale(value);
	}
}
// #endregion

// #region Box3

T3D.Box3.prototype.fixSize = function () {
	// Prevent zero length
	var _min = this.min;
	var _max = this.max;

	['x', 'y', 'z'].forEach(key => {
		var epsilon = Number.EPSILON;
		while (_min[key] == _max[key]) {
			_min[key] -= epsilon;
			_max[key] += epsilon;

			epsilon *= 10;
		}
	});
}

T3D.Box3.prototype._setFromObject = function (object, filter, worldMatrix) {
	this.makeEmpty();

	object.updateWorldMatrix(true, false);

	return this._expandByObject(object, filter, worldMatrix);
}

T3D.Box3.prototype._expandByGeometry = function (geometry, worldMatrix) {
	if (!geometry.boundingBox) {
		geometry.computeBoundingBox();
	}

	_box.copy(geometry.boundingBox);
	_box.applyMatrix4(worldMatrix);

	//this.union(_box);
	this.min.min(_box.min);
	this.max.max(_box.max);
	return this;
}

T3D.Box3.prototype._expandByObject = function (object, filter, worldMatrix) {
	object.traverse((node) => {
		node.updateWorldMatrix(false, false);

		if (filter && filter(node) === false) {
			return;
		}

		var geometry = node.geometry;
		if (geometry) {
			if (worldMatrix) {
				_matrix4.multiplyMatrices(worldMatrix, node.worldMatrix);
				this._expandByGeometry(geometry, _matrix4);
			}
			else {
				this._expandByGeometry(geometry, node.worldMatrix);
			}
		}
	});

	this.fixSize();

	return this;
}

// #endregion

// #region Geometry
T3D.Geometry.prototype.getVerticesCount = function () {
	let postition = this.attributes.a_Position || this.attributes.position;
	let count = postition ? postition.buffer.count : 0;
	return count;
}

// #endregion

// #region Material

const textureKeys = [
	'diffuseMap',
	'alphaMap',
	'emissiveMap',
	'aoMap',
	'normalMap',
	'bumpMap',
	'envMap'
];

T3D.Material.prototype.getTextures = function () {
	var textures = new Set();
	textureKeys.forEach(key => {
		var texture = this[key];
		if (texture && texture.isTexture) {
			textures.add(texture);
		}
	});

	return Array.from(textures);
}

T3D.Matrix4.prototype.equals = function (matrix, tolerance) {
	tolerance = tolerance || 0.0001;
	if (this.elements.length != matrix.elements.length) {
		return false;
	}

	for (let i = 0, il = this.elements.length; i < il; i++) {
		const delta = Math.abs(this.elements[i] - matrix.elements[i]);
		if (delta > tolerance) {
			return false;
		}
	}

	return true;
}

// #endregion
