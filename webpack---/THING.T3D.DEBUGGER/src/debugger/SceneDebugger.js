import { Utils } from '../common/Utils.js';
import { SceneHierarchy } from './SceneHierarchy';

var _profileKeyName = '___profiling___';
var _diffKeyName = '___diffing___';

let T3D = THING.T3D;

let _position = new T3D.Vector3();

// Get diff of sets.
function _difference(set1, set2) {
	let difference = new Set();

	set1.forEach(v => {
		if (!set2.has(v)) {
			difference.add(v);
		}
	});

	return difference;
}

// Get intersect of sets.
function _intersect(set1, set2) {
	let intersect = new Set();

	set1.forEach(v => {
		if (set2.has(v)) {
			intersect.add(v);
		}
	});

	return intersect;
}

// Traverse specified nodes by objects.
function _traverseNodesByObjects(objects, traverseCallback, resultCallback) {
	const nodesKey = '__nodes__';

	var totalNumber = 0;
	objects.forEach(object => {
		var nodes = new Set();
		nodes._size = 0;

		var size = traverseCallback(object, node => { nodes.add(node); });
		nodes._size += size || nodes.size;

		object[nodesKey] = nodes;
		totalNumber += nodes._size;
	});

	if (!totalNumber) {
		return;
	}

	objects.sort((a, b) => {
		return b[nodesKey]._size - a[nodesKey]._size;
	});

	objects.forEach(object => {
		var nodes = object[nodesKey];

		var percentage = Math.max(0.01, (nodes._size / totalNumber));
		resultCallback(percentage, object, Array.from(nodes), nodes._size, totalNumber);

		delete object[nodesKey];
	});
}

// Collect objects from draw call objects.
function _collectObjects(drawCallObjects) {
	var objects = new Set();
	drawCallObjects.forEach(drawCallObject => {
		var object = drawCallObject.node.getBaseObject();
		if (!object) {
			return;
		}

		objects.add(object);
	});

	return Array.from(objects);
}


function _sortByDrawCall(drawCallObjects) {
	drawCallObjects.forEach(drawCallObject => {
		drawCallObject.object = drawCallObject.node.getBaseObject();
		drawCallObject.nodes = [drawCallObject.node];
		drawCallObject.nodes.sort((a, b) => {
			return b.getVerticesCount() - a.getVerticesCount();
		});
		delete drawCallObject.node;
	});

	return drawCallObjects;
}

function _sortByNode(drawCallObjects) {
	var objects = _collectObjects(drawCallObjects);

	var result = [];
	_traverseNodesByObjects(objects,
		(object, callback) => {
			object.bodyNode.$node.traverse(node => {
				callback(node);
			});
		},
		(percentage, object, nodes) => {
			nodes.sort((a, b) => {
				return b.getVerticesCount() - a.getVerticesCount();
			});
			result.push({ percentage, object, nodes });
		}
	);

	return result;
}

function _sortByMesh(drawCallObjects) {
	var objects = _collectObjects(drawCallObjects);

	var result = [];
	_traverseNodesByObjects(objects,
		(object, callback) => {
			object.bodyNode.$node.traverse(node => {
				if (node.isMesh) {
					callback(node);
				}
			});
		},
		(percentage, object, nodes) => {
			nodes.sort((a, b) => {
				return b.getVerticesCount() - a.getVerticesCount();
			});
			result.push({ percentage, object, nodes });
		}
	);

	return result;
}

function _sortByMaterial(drawCallObjects) {
	var objects = _collectObjects(drawCallObjects);

	var result = [];
	_traverseNodesByObjects(objects,
		(object, callback) => {
			object.bodyNode.$node.traverse(node => {
				var material = node.material;
				if (Array.isArray(material)) {
					for (let item of material) {
						callback(item);
					}
				}
				else if (material) {
					callback(material);
				}
			});
		},
		(percentage, object, nodes) => {
			result.push({ percentage, object, nodes });
		}
	);

	return result;
}

function _sortByTexture(drawCallObjects) {
	var objects = _collectObjects(drawCallObjects);

	var result = [];
	_traverseNodesByObjects(objects,
		(object, callback) => {
			object.bodyNode.$node.traverse(node => {
				var material = node.material;
				if (Array.isArray(material)) {
					for (let item of material) {
						var textures = item.getTextures();
						textures.forEach(texture => {
							callback(texture);
						});
					}
				}
				else if (material) {
					var textures = material.getTextures();
					textures.forEach(texture => {
						callback(texture);
					});
				}
			});
		},
		(percentage, object, nodes) => {
			nodes.sort((a, b) => {
				let weight_a = a.image ? a.image.width * a.image.height : 0;
				let weight_b = b.image ? b.image.width * b.image.height : 0;
				return weight_b - weight_a;
			});
			result.push({ percentage, object, nodes });
		}
	);

	return result;
}

function _sortByVertices(drawCallObjects) {
	var objects = _collectObjects(drawCallObjects);

	var result = [];
	_traverseNodesByObjects(objects,
		(object, callback) => {
			var verticesCount = 0;
			object.bodyNode.$node.traverse(node => {
				if (!node.isMesh) {
					return;
				}

				if (!callback(node)) {
					return;
				}

				verticesCount += node.getVerticesCount();
			});

			return verticesCount;
		},
		(percentage, object, nodes) => {
			// Get each mesh vertices count
			var totalVerticesCount = 0;
			nodes.forEach(node => {
				node._vertices_count_ = node.getVerticesCount();

				totalVerticesCount += node._vertices_count_;
			});

			// Dump objects/meshes by vertices from high to low
			nodes.sort((a, b) => {
				return b._vertices_count_ - a._vertices_count_;
			});

			// Update result
			result.push({
				percentage, object, nodes: nodes.map(node => {
					var percentage = Math.max(0.01, (node._vertices_count_ / totalVerticesCount));
					var count = node._vertices_count_;

					return { percentage, count, node };
				})
			});
		}
	);

	return result;
}

function _filterNodes(nodes, filterType, callback) {
	var _nodes = Array.from(nodes);

	if (filterType == 'All') {
		if (callback) {
			return _nodes.filter(callback);
		}
		else {
			return _nodes;
		}
	}
	else {
		return _nodes.filter(node => {
			if (node['is' + filterType]) {
				return true;
			}

			return false;
		});
	}
}

class SceneDebugger {

	constructor() {
		this.info = this.buildInfo();

		// The profile info
		this.profileInfo = {
			scene: null,
			meshes: []
		};

		// The diff info
		this.diffInfo = {
			scene: null,
			beginNodes: null,
			endNodes: null,
		}
	}

	buildInfo() {
		var info = {
			visible: true,
			distance: 0,
			opaqueVisible: true,
			transparentVisible: true,
		};

		return info;
	}

	checkObjectDistance(camera, object) {
		var info = this.info;

		// Check distance
		if (info.distance !== 0) {
			_position.setFromMatrixPosition(object.matrix);
			var distance = _position.distanceTo(camera.position);
			if (distance > info.distance) {
				return false;
			}
		}

		return true;
	}

	checkObjectVisible(object) {
		var info = this.info;
		var material = object.material;
		if (Array.isArray(material)) {
			for (let item of material) {
				// Check transparent object visible
				if (item.transparent && info.transparentVisible) {
					return true;
				}
				// Check opaque object visible
				else if (!item.transparent && info.opaqueVisible) {
					return true;
				}
			}
			return false;
		}
		else if (material) {
			// Check transparent object visible
			if (material.transparent) {
				if (!info.transparentVisible) {
					return false;
				}
			}
			// Check opaque object visible
			else {
				if (!info.opaqueVisible) {
					return false;
				}
			}
		}

		return true;
	}

	isInScene(camera, object) {
		var material = object.material;
		if (Array.isArray(material)) {
			for (let item of material) {
				var materialType = item.type;
				// It's background renderable object
				if (materialType == 'BackgroundCubeMaterial') {
					return true;
				}
				// It's custom shader renderable object
				else if (materialType == 'ShaderMaterial') {
					return true;
				}
				else {
					// Check distance
					if (this.checkObjectDistance(camera, object)) {
						return true;
					}

					if (this.checkObjectVisible(object)) {
						return true;
					}
				}
			}
			return false;
		}
		else if (material) {
			var materialType = material.type;
			// BackgroundCubeMaterial mean it's background renderable object
			// ShaderMaterial mean it's custom shader renderable object
			if (materialType != 'BackgroundCubeMaterial' && materialType != 'ShaderMaterial') {
				// Check distance
				if (!this.checkObjectDistance(camera, object)) {
					return false;
				}
				if (!this.checkObjectVisible(object)) {
					return false;
				}
			}
		}

		return true;
	}

	processScene(scene) {
		var info = this.info;

		scene.visible = info.visible;
	}

	getHierarchy(object) {
		return new SceneHierarchy(object);
	}

	// #region Profile
	beginProfile(scene) {
		if (!scene) {
			return;
		}

		this.endProfile();
		this.clearProfileResult();

		var profileInfo = this.profileInfo;
		profileInfo.scene = Utils.getT3dSceneFromThingScene(scene);
		if (profileInfo.scene) {
			profileInfo.scene.traverse(node => {
				if (!node.isMesh || !node.userData) {
					return;
				}
				var info = {
					vertices: 0,
					times: 0,
					points: 0,
					oldBeforeRender: node.onBeforeRender,
					oldAfterRender: node.onAfterRender,
				};
				node.userData[_profileKeyName] = info;

				node.onBeforeRender = function (renderable, material) {
					info.times++;
					info.vertices += renderable.geometry.getVerticesCount() / 1000;
					info.points = info.times * 10 + info.vertices;
					info.oldBeforeRender(renderable, material);
				}

				node.onAfterRender = function (renderable) {
					info.oldAfterRender(renderable);
				}
				profileInfo.meshes.push(node);
			});
		}
	}

	endProfile() {
		var profileInfo = this.profileInfo;
		if (!profileInfo.scene) {
			return;
		}

		profileInfo.meshes.sort((a, b) => {
			var u1 = b.userData;
			var u2 = a.userData;

			if (u1.points !== u2.points) {
				return u1.points - u2.points;
			}
			return a.id - b.id;
		});

		profileInfo.meshes.forEach(mesh => {
			var userData = mesh.userData;

			var info = userData[_profileKeyName];
			mesh.onBeforeRender = info.oldBeforeRender;
			mesh.onAfterRender = info.oldAfterRender;

			info.oldBeforeRender = null;
			info.oldAfterRender = null;
		});
		profileInfo.scene = null;
	}

	isProfiling() {
		return !!this.profileInfo.scene;
	}

	clearProfileResult() {
		var profileInfo = this.profileInfo;
		profileInfo.meshes.forEach(mesh => {
			delete mesh.userData[_profileKeyName];
		});
		profileInfo.meshes = [];
	}

	getProfileResult() {
		var profileInfo = this.profileInfo;
		var result = {};

		result.getDrawCallObjects = function (sortType) {
			var totalPoints = 0;
			var filterMeshes = profileInfo.meshes.filter(mesh => {
				var info = mesh.userData[_profileKeyName];
				if (!info.points) {
					return false;
				}

				totalPoints += info.points;

				return true;
			});

			var drawCallObjects = [];
			filterMeshes.forEach(mesh => {
				var info = mesh.userData[_profileKeyName];
				var percentage = info.points / totalPoints;

				drawCallObjects.push({ percentage, node: mesh });
			});

			switch (sortType) {
				case 'DrawCall': return _sortByDrawCall(drawCallObjects);
				case 'Node': return _sortByNode(drawCallObjects);
				case 'Mesh': return _sortByMesh(drawCallObjects);
				case 'Material': return _sortByMaterial(drawCallObjects);
				case 'Texture': return _sortByTexture(drawCallObjects);
				case 'Vertices': return _sortByVertices(drawCallObjects);
				default:
					return drawCallObjects;
			}
		}

		return result;
	}

	// #endregion

	// #region Diff
	beginDiff(scene) {
		var diffInfo = this.diffInfo;

		// Start to collect nodes
		diffInfo.scene = scene.$node;
		diffInfo.beginNodes = new Set(diffInfo.scene.getNodes());
		diffInfo.beginNodes.forEach(node => {
			node.userData[_diffKeyName] = {
				visible: node.visible,
			};
		});
	}

	endDiff() {
		var diffInfo = this.diffInfo;

		// Collect nodes
		diffInfo.endNodes = new Set(diffInfo.scene.getNodes());

		// Finished diff
		diffInfo.scene = null;
	}

	isDiffing() {
		return !!this.diffInfo.scene;
	}

	getDiffResult() {
		var diffInfo = this.diffInfo;
		var result = {};

		// Get diff nodes
		result.getNodes = function (filterType = 'All') {
			// Get created nodes
			var createdNodes = _filterNodes(_difference(diffInfo.endNodes, diffInfo.beginNodes), filterType);

			// Get destroied nodes
			var destroiedNodes = _filterNodes(_difference(diffInfo.beginNodes, diffInfo.endNodes), filterType);

			return { createdNodes, destroiedNodes };
		}

		// Collect visible changed nodes.
		result.getVisibleChangedNodes = function (filterType = 'All') {
			// Get the visible changed nodes
			var nodes = _intersect(diffInfo.beginNodes, diffInfo.endNodes);

			// Filter nodes by type
			return _filterNodes(nodes, filterType, node => {
				var _diff = node.userData[_diffKeyName];
				if (!_diff) {
					return false;
				}

				if (_diff.visible == node.visible) {
					return false;
				}

				return true;
			});
		}

		return result;
	}

	// #endregion

	/**
	 * Get/Set scene options.
	 * @type {Object}
	 */
	get options() {
		var info = this.info;

		return {
			visible: info.visible,
			distance: info.distance,
			opaqueVisible: info.opaqueVisible,
			transparentVisible: info.transparentVisible,
		};
	}
	set options(value) {
		var info = this.info;

		info.visible = Utils.parseValue(value['visible'], info.visible);
		info.distance = Utils.parseValue(value['distance'], info.distance);
		info.opaqueVisible = Utils.parseValue(value['opaqueVisible'], info.opaqueVisible);
		info.transparentVisible = Utils.parseValue(value['transparentVisible'], info.transparentVisible);
	}

}

export { SceneDebugger }