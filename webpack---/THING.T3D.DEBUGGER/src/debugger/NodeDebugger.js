import { Utils } from '../common/Utils.js';
import { NodeStats } from './NodeStats';

let T3D = THING.T3D;

const _breakPointsTagName = '__breakPointsTagName__';

var _scale = new T3D.Vector3();
var _inversedMatrix = new T3D.Matrix4();

var randomColor = function (min = 0, max = 0xFFFFFF) {
	var color = Math.floor(Math.random() * (max - min + 1)) + min;
	return new T3D.Color3().setHex(color);
}

var boundingBoxFilter = function (node) {
	if (node.userData['isDebuggerNode']) {
		return false;
	}

	return true;
}

class NodeDebugger {

	constructor(node) {
		this.node = node;
		this.attributes = {
			wireframeHelper: false,
			normalHelper: false,
			axesHelper: false,
			boundingBoxHelper: false,
			orientedBoundingBoxHelper: false,
		};

		this.elapsedTimes = {
			normal: 0,
			boundingBox: 0,
			orientedBoundingBox: 0,
		};
		this.intervals = {
			normal: 0.01,
			boundingBox: 1.25,
			orientedBoundingBox: 1.25,
		};

		this.vertexNormalsHelper = null;
		this.axesHelper = null;
		this.boundingBoxHelper = null;
		this.orientedBoundingBoxHelper = null;

		this.node.userData['nodeDebugger'] = this;
	}

	_getVisible(node) {
		var renderableNode = Utils.getRenderableNode(node);
		if (renderableNode) {
			return renderableNode.getVisible();
		}
		return false;
	}

	_updateTimer(key) {
		var interval = this.intervals[key];
		var elapsedTime = this.elapsedTimes[key];
		if (elapsedTime < interval) {
			return false;
		}

		this.elapsedTimes[key] = 0;

		return true;
	}

	_getMeshRadius(node) {
		var geometry = node.geometry;

		// Get the bounding sphere radius as size to show normal
		var boundingSphere = geometry.boundingSphere;
		if (!boundingSphere) {
			geometry.computeBoundingSphere();
			boundingSphere = geometry.boundingSphere;
		}

		// Adjust node scale
		var radius = boundingSphere.radius;
		_scale.set(radius, radius, radius)
		_scale.applyMatrix4(node.worldMatrix);

		return Math.abs(_scale.x);
	}

	_createBox3Helper(node, origin = false) {
		if (node != this.node) {
			if (node.userData['isDebuggerNode']) {
				return null;
			}

			if (!node.geometry) {
				return null;
			}
		}

		var box = new T3D.Box3();
		if (origin) {
			_inversedMatrix.getInverse(node.worldMatrix);
			box._setFromObject(node, boundingBoxFilter, _inversedMatrix);
		}
		else {
			box._setFromObject(node, boundingBoxFilter);
		}
		if (box.isEmpty()) {
			return null;
		}

		var boxHelper = new T3D.Box3Helper(box, randomColor());
		boxHelper.visible = node.isVisible();
		boxHelper.frustumCulled = false;
		boxHelper.name = node.name + '_BoundingBox';
		boxHelper.userData['bindingNode'] = node;

		var boxHelper = new T3D.Box3Helper(box, randomColor());
		boxHelper.visible = node.isVisible();
		boxHelper.frustumCulled = false;
		boxHelper.name = node.name + '_BoundingBox';
		boxHelper.userData['bindingNode'] = node;
		boxHelper.parent = null;
		return boxHelper;
	}

	update(deltaTime) {
		this.updateElapsedTime(deltaTime);

		this.updateAxesHelper();
		this.updateNormalHelper();
		this.updateBoundingBoxHelper();
		this.updateOrientedBoundingBoxHelper();
	}

	updateElapsedTime(deltaTime) {
		for (var key in this.elapsedTimes) {
			this.elapsedTimes[key] += deltaTime;
		}
	}

	updateAxesHelper() {
		var axesHelper = this.axesHelper;
		if (!axesHelper) {
			return;
		}

		axesHelper.visible = this._getVisible(this.node);
		if (axesHelper.visible) {
			this.node.worldMatrix.decompose(axesHelper.position, axesHelper.quaternion, axesHelper.scale);
			axesHelper.doUpdateWorldMatrix();
		}
	}

	updateNormalHelper() {
		var vertexNormalsHelper = this.vertexNormalsHelper;
		if (!vertexNormalsHelper) {
			return;
		}

		if (!this._updateTimer('normal')) {
			return;
		}

		vertexNormalsHelper.visible = this._getVisible(this.node);
		if (vertexNormalsHelper.visible) {
			vertexNormalsHelper.children.forEach(child => {
				child.update();
			});
		}
	}

	updateBoundingBoxHelper() {
		var boundingBoxHelper = this.boundingBoxHelper;
		if (!boundingBoxHelper) {
			return;
		}

		if (!this._updateTimer('boundingBox')) {
			return;
		}

		// Update bounding box
		boundingBoxHelper.visible = this._getVisible(this.node);
		if (boundingBoxHelper.visible) {
			var that = this;
			boundingBoxHelper.children.forEach(child => {
				var bindingNode = child.userData['bindingNode'];
				child.visible = that._getVisible(bindingNode);
				if (!child.visible) {
					return;
				}

				child.box._setFromObject(bindingNode, boundingBoxFilter);
				child.doUpdateWorldMatrix();
			});
		}
	}

	updateOrientedBoundingBoxHelper() {
		var orientedBoundingBoxHelper = this.orientedBoundingBoxHelper;
		if (!orientedBoundingBoxHelper) {
			return;
		}

		if (!this._updateTimer('orientedBoundingBox')) {
			return;
		}

		var that = this;
		orientedBoundingBoxHelper.traverse(child => {
			var bindingNode = child.userData['bindingNode'];
			if (!bindingNode) {
				return;
			}

			child.visible = that._getVisible(bindingNode);
			if (!child.visible) {
				return;
			}

			_inversedMatrix.getInverse(bindingNode.worldMatrix);
			child.box._setFromObject(bindingNode, boundingBoxFilter, _inversedMatrix);
			bindingNode.worldMatrix.decompose(child.position, child.quaternion, child.scale);
			child.doUpdateWorldMatrix();
		});
	}

	showWireframeHelper(visible) {
		if (this.attributes.wireframeHelper === visible) {
			return;
		}
		this.attributes.wireframeHelper = visible;

		var materials = this.node.getMaterials();
		if (visible) {
			materials.forEach(material => {
				if (Utils.isNull(material.wireframe)) {
					return;
				}
				material._prev_wireframe_ = material.wireframe;
				material.wireframe = true;
			});
		}
		else {
			materials.forEach(material => {
				if (Utils.isNull(material._prev_wireframe_)) {
					return;
				}
				material.wireframe = material._prev_wireframe_;
				delete material._prev_wireframe_;
			});
		}
	}

	showNormalHelper(visible) {
		if (this.attributes.normalHelper === visible) {
			return;
		}
		this.attributes.normalHelper = visible;

		if (visible) {
			this.vertexNormalsHelper = new T3D.Object3D();
			this.vertexNormalsHelper.userData['isDebuggerNode'] = true;

			this.node.traverse(node => {
				if (!node.isMesh) {
					return;
				}
				var geometry = node.geometry;
				if (!geometry) {
					return;
				}
				// Check normal attribute
				if (geometry.isBufferGeometry) {
					if (!geometry.attributes['normal']) {
						return;
					}
				}

				// Get the radius of mesh
				var radius = this._getMeshRadius(node);

				// Create normal helper
				var helper = new T3D.VertexNormalsHelper(node, radius / 10);
				this.vertexNormalsHelper.add(helper);
			});

			this.node.getRoot().add(this.vertexNormalsHelper);
		}
		else {
			if (this.vertexNormalsHelper) {
				this.vertexNormalsHelper.dispose();
				this.vertexNormalsHelper = null;
			}
		}
	}

	getAxesRadius() {
		let baseObject = this.node.getBaseObject();
		var radius = baseObject ? baseObject.boundingBox.radius : 0;
		let scale = this.node.getWorldScale();
		radius = radius / ((scale[0] + scale[1] + scale[2]) / 3);
		return radius;
	}
	showAxesHelper(visible) {
		if (this.attributes.axesHelper === visible) {
			return;
		}
		this.attributes.axesHelper = visible;

		if (visible) {
			this.node.doUpdateWorldMatrix();

			var radius = this.getAxesRadius();
			this.node.traverse(node => {
				var geometry = node.geometry;
				if (!geometry) {
					return;
				}

				// Get the radius of mesh
				radius = Math.max(radius, this._getMeshRadius(node));
			});
			radius = Math.max(radius, 10);
			this.axesHelper = new T3D.AxesHelper(radius);
			this.node.getRoot().add(this.axesHelper);
		}
		else {
			if (this.axesHelper) {
				this.axesHelper.dispose();
				this.axesHelper = null;
			}
		}
	}

	showBoundingBoxHelper(visible) {
		if (this.attributes.boundingBoxHelper === visible) {
			return;
		}
		this.attributes.boundingBoxHelper = visible;

		if (visible) {
			this.boundingBoxHelper = new T3D.Object3D();
			this.boundingBoxHelper.userData['isDebuggerNode'] = true;
			var that = this;
			this.node.traverse(node => {
				let boxHelper = that._createBox3Helper(node);
				if (!!boxHelper) {
					that.boundingBoxHelper.add(boxHelper);
				}
			});
			this.node.getRoot().add(this.boundingBoxHelper);
		}
		else {
			if (this.boundingBoxHelper) {
				this.boundingBoxHelper.dispose();
				this.boundingBoxHelper = null;
			}
		}
	}

	showOrientedBoundingBoxHelper(visible) {
		this.attributes.orientedBoundingBoxHelper = visible;
		if (visible) {
			// in the instance node,the Object3D's visible will be set false,so we an not add the helper to it;
			// instead we add another Object3D,  For consistency we do this for un instance node too
			this.orientedBoundingBoxHelper = new T3D.Object3D();
			this.orientedBoundingBoxHelper.userData['isDebuggerNode'] = true;
			this.node.getParent().add(this.orientedBoundingBoxHelper);

			var that = this;
			this.node.traverse(node => {
				let boxHelper = that._createBox3Helper(node, true);
				if (!!boxHelper) {
					node.worldMatrix.decompose(boxHelper.position, boxHelper.quaternion, boxHelper.scale);
					boxHelper.doUpdateWorldMatrix();
					that.orientedBoundingBoxHelper.add(boxHelper);
				}
			});
			this.node.getRoot().add(this.orientedBoundingBoxHelper);
		}
		else {
			if (this.orientedBoundingBoxHelper) {
				this.orientedBoundingBoxHelper.dispose();
				this.orientedBoundingBoxHelper = null;
			}
		}
	}

	dispose() {
		this.showWireframeHelper(false);
		this.showNormalHelper(false);
		this.showAxesHelper(false);
		this.showBoundingBoxHelper(false);
		this.showOrientedBoundingBoxHelper(false);

		if (this.node) {
			delete this.node.userData['nodeDebugger'];
			this.node = null;
		}
	}

	setAttribute(type, value) {
		switch (type) {
			case 'WireframeHelper':
				this.showWireframeHelper(value);
				break;

			case 'NormalHelper':
				this.showNormalHelper(value);
				break;

			case 'AxesHelper':
				this.showAxesHelper(value);
				break;

			case 'BoundingBoxHelper':
				this.showBoundingBoxHelper(value);
				break;

			case 'OrientedBoundingBoxHelper':
				this.showOrientedBoundingBoxHelper(value);
				break;

			default:
				break;
		}
	}

	setValueBreakpoint(type, options = {}) {
		var node = this.node;

		var userData = node.userData;
		userData[_breakPointsTagName] = userData[_breakPointsTagName] || {};

		var onValueChanged = options['onValueChanged'];

		var onDelete = function (hookedNode, hoodedKey) {
			var breakPointsTagInfo = userData[_breakPointsTagName];
			delete breakPointsTagInfo[hoodedKey];

			Utils.setValueBreakpoint(hookedNode, hoodedKey, null);
		}
		var result = {};
		Object.defineProperty(result, 'enable', {
			get: function () {
				return !!userData[_breakPointsTagName][type];
			},
			set: function (value) {
				var breakPointsTagInfo = userData[_breakPointsTagName];
				if (breakPointsTagInfo[type] == value) {
					return;
				}

				if (value) {
					breakPointsTagInfo[type] = true;

					// Get the hooked node and key
					var hookedNode, hookedKey;
					if (type == 'children') {
						breakPointsTagInfo.childrenChanged = breakPointsTagInfo.childrenChanged || 1;

						if (!breakPointsTagInfo.childrenPush) {
							breakPointsTagInfo.childrenPush = node.children.push;
							node.children.push = function () {
								var _breakPointsTagInfo = userData[_breakPointsTagName];
								_breakPointsTagInfo.childrenChanged++;
								_breakPointsTagInfo.childrenPush.apply(this, arguments);
							}
						}

						if (!breakPointsTagInfo.childrenSplice) {
							breakPointsTagInfo.childrenSplice = node.children.splice;
							node.children.splice = function () {
								var _breakPointsTagInfo = userData[_breakPointsTagName];
								_breakPointsTagInfo.childrenChanged++;
								_breakPointsTagInfo.childrenSplice.apply(this, arguments);
							}
						}

						hookedNode = breakPointsTagInfo;
						hookedKey = 'childrenChanged';
					}
					else {
						hookedNode = node;
						hookedKey = type;
					}

					Utils.setValueBreakpoint(hookedNode, hookedKey).onValueChanged(() => {
						onDelete(hookedNode, hookedKey);

						onValueChanged();
					});
				}
				else {
					onDelete(hookedNode, hookedKey);
				}
			}
		});

		return result;
	}

	hasAnyValueBreakpoints() {
		var node = this.node;
		var userData = node.userData;

		var breakPointsTagInfo = userData[_breakPointsTagName];
		if (!breakPointsTagInfo) {
			return false;
		}

		var keys = Object.keys(breakPointsTagInfo);
		if (!keys.length) {
			return false;
		}

		return true;
	}

	getMaterials() {
		return this.node.getMaterials();
	}

	getTextures() {
		return this.node.getTextures();
	}

	getStats() {
		return new NodeStats(this.node);
	}

}

export { NodeDebugger }