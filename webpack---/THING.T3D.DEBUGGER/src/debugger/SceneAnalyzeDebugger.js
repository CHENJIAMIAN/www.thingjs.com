const _cloneResultList = (resultList, options) => {
	if (!resultList || !options.onCloneObjet) {
		return;
	}
	const _resultList = [];
	resultList.forEach(result => {
		const _result = options.onCloneObjet(result);
		if (_result.meshesInfos) {
			const _meshesInfos = [];
			_result.meshesInfos.forEach(meshesInfo => {
				const _meshesInfo = options.onCloneObjet(meshesInfo);
				_meshesInfos.push(_meshesInfo);
			})
			_result.meshesInfos = _meshesInfos;
		}

		_resultList.push(_result);
	})

	return _resultList;
}

const _sort = ({ sortType, app, objectInfos }) => {
	if (!sortType || !objectInfos) {
		return;
	}

	const totalNums = objectInfos.pop();

	objectInfos.sort((a, b) => {
		return b[sortType] - a[sortType];
	})

	objectInfos.forEach(objectInfo => {
		objectInfo[sortType] && (objectInfo.percentage = Math.round(objectInfo[sortType] / totalNums[sortType] * 10000) / 100 + '%');

		const meshesInfos = objectInfo.meshesInfos;
		meshesInfos.sort((a, b) => {
			return b[sortType] - a[sortType];
		})

		meshesInfos.forEach(meshesInfo => {
			meshesInfo[sortType] && (meshesInfo.percentage = Math.round(meshesInfo[sortType] / objectInfo[sortType] * 10000) / 100 + '%');
			meshesInfo.vertices && (meshesInfo.vertices = Math.round(meshesInfo.vertices * 100) / 100 + 'k');
			meshesInfo.faces && (meshesInfo.faces = Math.round(meshesInfo.faces * 100) / 100 + 'k');
		})

		objectInfo.vertices && (objectInfo.vertices = Math.round(objectInfo.vertices * 100) / 100 + 'k');
		objectInfo.faces && (objectInfo.faces = Math.round(objectInfo.faces * 100) / 100 + 'k');
	});

	return objectInfos;
}

const _getUNodeFromMesh = (mesh) => {
	let node = mesh;
	while (node) {
		const unode = node.$unode;
		if (unode) {
			return unode;
		}

		node = node.parent;
	}

	return null;
}

const _getNodeFromBaseObject = (baseObject) => {
	return baseObject.node.$node;
}

const _getSceneRoot = (scene) => {
	let node = scene;
	while (node) {
		if (node.isScene) {
			return node;
		}

		node = node.parent;
	}

	return null;
}

const _getBaseObjectFromNode = (node, onGetObjectByNode) => {
	if (!node) {
		return null;
	}

	const unode = _getUNodeFromMesh(node);
	if (!unode) {
		return null;
	}

	const baseObject = onGetObjectByNode(unode);
	return baseObject;
}

const _getTexsFromMat = ({ node, material, size }) => {
	const texs = [];
	if (!material || !node || !size) {
		return texs;
	}

	Object.keys(material).forEach(key => {
		const texture = material[key];
		if (!texture || !texture.isTexture) {
			return;
		}
		const image = texture.image;
		if (!image || !(image.width >= size || image.height >= size)) {
			return;
		}

		const textureInfo = {
			size: image.width + '*' + image.height,
			texture: texture,
			material: material,
			mapName: key,
			node: node
		}
		texs.push(textureInfo);
	});

	return texs;
}

const _getTextureResult = (size = 1024, object, options) => {
	if (!object) {
		return;
	}

	const textureInfo = {
		textures: []
	}
	object.traverse(node => {
		const material = node.material;
		if (!material) {
			return;
		}

		if (options.onCheckIsArray(material)) {
			material.forEach(m => {
				const texs = _getTexsFromMat({ node: node, material: m, size: size });
				if (texs.length > 0) {
					textureInfo.textures.push(...texs);
				}
			});
		}
		else {
			const texs = _getTexsFromMat({ node: node, material: material, size: size });
			if (texs.length > 0) {
				textureInfo.textures.push(...texs);
			}
		}
	})



	return textureInfo;
}

const _getTextureResults = ({ size = 1024, analyzeResult, options }) => {
	if (!analyzeResult) {
		return;
	}

	const textures = [];
	analyzeResult.forEach(baseObjectInfo => {
		const object = baseObjectInfo.object;
		if (!object) {
			return;
		}

		const textureInfo = _getTextureResult(size, _getNodeFromBaseObject(object), options);
		if (textureInfo.textures.length > 0) {
			textureInfo.object = object;
			textures.push(textureInfo);
		}
	})

	return textures;
}

const _getBaseObjectInfo = (baseObject) => {
	if (!baseObject) {
		return;
	}

	const nodes = [];
	const baseObjectInfo = {
		meshes: [],
		nodes: 0,
		drawCalls: 0,
		vertices: 0,
		faces: 0,
	}

	_getNodeFromBaseObject(baseObject).traverse((_mesh) => {
		nodes.push(_mesh);

		const info = _mesh.userData[_analyzeKeyName];
		if (!info) {
			return;
		}

		baseObjectInfo.drawCalls += info.times;
		baseObjectInfo.vertices += info.vertices;
		baseObjectInfo.faces += info.faces;
		baseObjectInfo.meshes.push(_mesh);
	})

	baseObjectInfo.nodes = nodes.length;

	return baseObjectInfo;
}

const _collectBaseObjectInfos = (analyzeInfo, onGetObjectByNode) => {
	if (!analyzeInfo || !onGetObjectByNode) {
		return;
	}

	const baseObjectMap = new Map();
	const unrenderObjsMap = new Map();
	analyzeInfo.meshes.forEach(mesh => {
		const baseObject = _getBaseObjectFromNode(mesh, onGetObjectByNode);
		if (baseObjectMap.has(baseObject) || unrenderObjsMap.has(baseObject)) {
			return;
		}

		const baseObjectInfo = _getBaseObjectInfo(baseObject);
		if (baseObjectInfo.drawCalls === 0) {
			unrenderObjsMap.set(baseObject, baseObjectInfo);
			return;
		}

		baseObjectMap.set(baseObject, baseObjectInfo);
	});

	return baseObjectMap;
}

const _updateAnalyzeResult = (analyzeInfo, options) => {
	if (!analyzeInfo) {
		return;
	}

	const baseObjectsMap = _collectBaseObjectInfos(analyzeInfo, options.onGetObjectByNode)

	const objectInfos = [];
	const totalNums = {
		drawCalls: 0,
		vertices: 0,
		faces: 0,
		nodes: 0
	}

	baseObjectsMap.forEach((value, key) => {
		const baseObjectInfo = value;
		const drawCalls = baseObjectInfo.drawCalls;
		const vertices = baseObjectInfo.vertices;
		const faces = baseObjectInfo.faces;
		const nodes = baseObjectInfo.nodes;
		const meshes = baseObjectInfo.meshes;

		totalNums.drawCalls += drawCalls;
		totalNums.vertices += vertices;
		totalNums.faces += faces;
		totalNums.nodes += nodes;

		const meshesInfos = [];
		meshes.forEach(mesh => {
			const info = mesh.userData[_analyzeKeyName];
			if (!info) {
				return;
			}

			const drawCalls = info.times;
			const node = mesh;
			const vertices = info.vertices;
			const faces = info.faces;
			const meshesInfo = {
				node,
				drawCalls,
				vertices,
				faces
			}

			meshesInfos.push(meshesInfo);
		})

		const objectInfo = {
			object: key,
			drawCalls,
			vertices,
			faces,
			nodes,
			meshesInfos,
		}

		objectInfos.push(objectInfo);
	});

	baseObjectsMap.clear();

	if (objectInfos.length > 0) {
		objectInfos.push(totalNums);
	}

	return objectInfos;
}

const _getResult = ({ type, analyzeResult, options }) => {
	if (!type || !analyzeResult) {
		return;
	}

	const resultList = _cloneResultList(analyzeResult, options);
	const result = _sort({
		sortType: type,
		objectInfos: resultList
	});

	return result;
}

const _analyzeKeyName = '___analyze___';
const _analyzeInfo = (() => {
	const value = {
		objectBeforeRenderFunc: null,
		object: null,
		scene: null,
		meshes: [],
		times: 0
	}

	return {
		value: value,
		clear: () => {
			value.objectBeforeRenderFunc = null;
			value.object = null;
			value.scene = null;
			value.meshes = [];
			value.times = 0;
		},
		isInit: () => {
			if (value.objectBeforeRenderFunc === null && value.object === null && value.scene === null
				&& value.meshes.length === 0 && value.times === 0) {
				return true;
			}

			return false;
		}
	}
})();

const _analyzeResult = (() => {
	let value = null;

	return {
		getValue: () => { return value; },
		setValue: (val) => { value = val; },
		clear: () => {
			value = null;
		},
		isInit: () => {
			if (value === null) {
				return true;
			}

			return false;
		}
	}
})();

class SceneAnalyzeDebugger {

	constructor() {}

	beginAnalyze(object) {
		if (!object || !object.$node) {
			return;
		}

		object = object.$node;

		this.endAnalyze();
		this.clearAnalyzeResult();

		const analyzeInfo = _analyzeInfo.value;
		analyzeInfo.object = object;
		analyzeInfo.scene = _getSceneRoot(object);
		if (!analyzeInfo.scene) {
			return;
		}

		analyzeInfo.sceneBeforeRenderFunc = analyzeInfo.scene.onBeforeRender;
		analyzeInfo.scene.onBeforeRender = function (renderer, scene, camera, renderTarget) {
			analyzeInfo.times++;
			object.traverse(node => {
				if (!node.isMesh) {
					return;
				}

				const userData = node.userData;
				let info = userData[_analyzeKeyName];
				if (info && info.target === object) {
					return;
				}

				info = {
					vertices: 0,
					times: 0,
					faces: 0,
					oldBeforeRender: node.onBeforeRender,
					oldAfterRender: node.onAfterRender,
					target: object
				};

				userData[_analyzeKeyName] = info;

				node.onBeforeRender = function (renderer, scene, camera, geometry, material, group) {
					info.times++;
					info.vertices += geometry.getVerticesCount() / 1000;
					geometry.index && (info.faces += geometry.index.count / 3 / 1000);

					info.oldBeforeRender.call(node, renderer, scene, camera, geometry, material, group);
				}

				// node.onAfterRender = function (renderer, scene, camera, geometry, material, group) {
				// 	info.oldAfterRender.call(node, renderer, scene, camera, geometry, material, group);
				// }

				analyzeInfo.meshes.push(node);
			});

			analyzeInfo.sceneBeforeRenderFunc.call(scene, renderer, scene, camera, renderTarget);
		}
	}

	endAnalyze() {
		if (_analyzeInfo.isInit()) {
			return;
		}
		const analyzeInfo = _analyzeInfo.value;

		analyzeInfo.meshes.forEach(mesh => {
			const userData = mesh.userData;

			const info = userData[_analyzeKeyName];

			if (!info) {
				return false;
			}

			info.times = info.times / analyzeInfo.times;
			info.vertices = info.vertices / analyzeInfo.times;
			info.faces = info.faces / analyzeInfo.times;

			mesh.onBeforeRender = info.oldBeforeRender;
			mesh.onAfterRender = info.oldAfterRender;

			info.oldBeforeRender = null;
			info.oldAfterRender = null;
		});

		analyzeInfo.scene.onBeforeRender = analyzeInfo.sceneBeforeRenderFunc;
		analyzeInfo.sceneBeforeRenderFunc = null;

		analyzeInfo.scene = null;
		analyzeInfo.object = null;
	}

	clearAnalyzeResult() {
		if (!_analyzeInfo.isInit()) {
			const analyzeInfo = _analyzeInfo.value;
			analyzeInfo.meshes.forEach(mesh => {
				delete mesh.userData[_analyzeKeyName];
			});
		}

		_analyzeInfo.clear();
		_analyzeResult.clear();
	}

	getAnalyzeResult(sortType = 'drawCalls', options) {
		if (_analyzeInfo.isInit()) {
			return;
		}

		if (_analyzeResult.isInit()) {
			const result = _updateAnalyzeResult(_analyzeInfo.value, options);
			_analyzeResult.setValue(result);
		}

		switch (sortType.toLowerCase()) {
			case 'drawcalls': return _getResult({
				type: 'drawCalls',
				analyzeResult: _analyzeResult.getValue(),
				options: options
			});
			case 'vertices': return _getResult({
				type: 'vertices',
				analyzeResult: _analyzeResult.getValue(),
				options: options
			});
			case 'faces': return _getResult({
				type: 'faces',
				analyzeResult: _analyzeResult.getValue(),
				options: options
			});
			case 'nodes': return _getResult({
				type: 'nodes',
				analyzeResult: _analyzeResult.getValue(),
				options: options
			});
			case 'textures': return _getTextureResults({
				size: options.size,
				analyzeResult: _analyzeResult.getValue(),
				options: options
			});
			default:
				return;
		}
	}

}

export {
	SceneAnalyzeDebugger
}