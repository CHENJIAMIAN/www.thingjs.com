import { MathUtils } from '@uino/thing';
import { Utils } from '../common/Utils';

const __ = {
	private: Symbol('private'),
}

let _position = MathUtils.createVec3();
let _quaternion = MathUtils.createQuat();
let _scale = MathUtils.createVec3();

let _worldPosition = MathUtils.createVec3();
let _worldQuaternion = MathUtils.createQuat();
let _worldScale = MathUtils.createVec3();

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];

	// #region Private Functions

	// Add vector debug folder.
	_private.addVectorDebugFolder = function (rootUI, name, vector) {
		var vectorFolder = rootUI.addFolder(name);
		['x', 'y', 'z', 'w'].forEach((key) => {
			if (vector[key] !== undefined) {
				vectorFolder.add(vector, key).listen();
			}
		});

		return vectorFolder;
	}

	// Add transform debug folder.
	_private.addTransformDebugFolder = function (rootUI, name, transform) {
		var transformFolder = rootUI.addFolder(name);
		var positionFolder = _private.addVectorDebugFolder(transformFolder, 'position', transform.position);
		var anglesFolder = _private.addVectorDebugFolder(transformFolder, 'angles', transform.angles);
		var scaleFolder = _private.addVectorDebugFolder(transformFolder, 'scale', transform.scale);

		return {
			positionFolder,
			anglesFolder,
			scaleFolder,
			isClosed: function () {
				return positionFolder.closed && anglesFolder.closed && scaleFolder.closed;
			}
		};
	}

	// Open folder.
	_private.openFolders = function (rootUI, depth, maxDepth) {
		if (maxDepth !== undefined && depth >= maxDepth) {
			return;
		}

		rootUI.open();

		var folders = rootUI.__folders;
		if (folders) {
			for (var key in folders) {
				var folder = folders[key];
				_private.openFolders(folder, depth + 1, maxDepth);
			}
		}
	}

	// Open all folders.
	_private.openAllFolders = function (rootUI, maxDepth) {
		_private.openFolders(rootUI, 1, maxDepth);
	}

	// Create folder.
	_private.createFolder = function () {
		var rootUI = _private.rootUI;
		if (!rootUI) {
			return;
		}

		// Check whether has created
		var folders = rootUI.__folders;
		if (Object.keys(folders).length) {
			return;
		}

		// Get internal variables
		var rendererDebugger = _private.rendererDebugger;
		var options = _private.options;

		// Create info folder
		var infoFolder = rootUI.addFolder('Info');
		if (infoFolder) {
			infoFolder.add(options.info, 'name').listen();
			infoFolder.add(options.info, 'renderOrder').listen();
			infoFolder.add(options.info, 'visible').onChange(value => {
				var node = _private.node;
				if (!node) {
					return;
				}

				// Instanced Drawing can not change visible
				if (_private.isInstancedDrawing) {
					return;
				}
				if (node.visible != value) {
					node.visible = value;
				}
			}).listen();

			options.info.localTransformFolder = _private.addTransformDebugFolder(infoFolder, 'local', options.info.local);
			options.info.worldTransformFolder = _private.addTransformDebugFolder(infoFolder, 'world', options.info.world);
		}

		// Create helper folder
		var helperFolder = rootUI.addFolder('Helper');
		if (helperFolder) {
			var helperOptions = options.helper;

			var hierarchyFolder = helperFolder.addFolder('hierarchy');
			if (hierarchyFolder) {
				hierarchyFolder.add(helperOptions, 'reveal');
				hierarchyFolder.add(helperOptions, 'back');
			}

			var switchFolder = helperFolder.addFolder('switch');
			if (switchFolder) {
				switchFolder.add(helperOptions, 'wireframe').onChange(value => {
					rendererDebugger.attachNodeDebugger(_private.node).setAttribute('WireframeHelper', value);
				});
				switchFolder.add(helperOptions, 'normal').onChange(value => {
					rendererDebugger.attachNodeDebugger(_private.node).setAttribute('NormalHelper', value);
				});
				switchFolder.add(helperOptions, 'axes').onChange(value => {
					rendererDebugger.attachNodeDebugger(_private.node).setAttribute('AxesHelper', value);
				});
				switchFolder.add(helperOptions, 'boundingBox').onChange(value => {
					rendererDebugger.attachNodeDebugger(_private.node).setAttribute('BoundingBoxHelper', value);
				});
				switchFolder.add(helperOptions, 'orientedBoundingBox').onChange(value => {
					rendererDebugger.attachNodeDebugger(_private.node).setAttribute('OrientedBoundingBoxHelper', value);
				});
			}
		}

		// Create node stats folder
		var statsFolder = rootUI.addFolder('Stats');
		if (statsFolder) {
			var nodeStats = _private.nodeStats;
			statsFolder.add(nodeStats, 'meshes').listen();
			statsFolder.add(nodeStats, 'materials').listen();
			statsFolder.add(nodeStats, 'textures').listen();
			statsFolder.add(nodeStats, 'vertices').listen();
		}
	}

	// Get the unique folder name.
	_private.getUniqueFolderName = function (rootUI, name) {
		var folders = rootUI.__folders;
		if (!folders[name]) {
			return name;
		}

		for (var i = 0; i < 10000; i++) {
			var _name = `[${i}]` + name;
			if (!folders[_name]) {
				return _name;
			}
		}

		return name;
	}

	// Dump texture.
	_private.dumpTexture = function (texture) {
		var image = texture.image;
		if (image) {
			var width = image.width;
			var height = image.height;
			var src = image.src;

			// Warning for 'not-power-of-2' image
			var isPowerOf2 = MathUtils.isPowerOfTwo(width) && MathUtils.isPowerOfTwo(height);
			var warning = isPowerOf2 ? '' : '!';
			console.log(`${warning}[${width}x${height}]'${src}'`, texture);
		}
		else {
			console.log(texture);
		}
	}

	// Dump textures.
	_private.dumpTextures = function (textures, sort) {
		// Sort texture
		if (sort) {
			textures.sort(sort);
		}

		// Start to dump
		textures.forEach(texture => {
			_private.dumpTexture(texture);
		});
	}

	// Build node material folder.
	_private.buildNodeMaterialFolder = function (rootUI, materials, maxNumber) {
		if (materials.length < maxNumber) {
			for (let i = 0; i < materials.length; i++) {
				var material = materials[i];
				var beautyName = Utils.beautySub(material.name ? material.name : i.toString(), 20);
				var name = _private.getUniqueFolderName(rootUI, beautyName);

				var materialFolder = rootUI.addFolder(name);
				if (materialFolder) {
					materialFolder.add(material, 'visible').listen();
				}

				_private.createNodeTextureFolder(materialFolder, material, 30);
			}
		}
		else {
			rootUI.addFolder('too many materials ...');
		}
	}

	// Create node material folder.
	_private.createNodeMaterialFolder = function (rootUI, nodeDebugger, maxNumber) {
		var folder = rootUI.addFolder('Materials');

		var materials = nodeDebugger.getMaterials();
		if (materials.length) {
			_private.buildNodeMaterialFolder(folder, materials, maxNumber);
		}

		return folder;
	}

	// Build node texture folder.
	_private.buildNodeTextureFolder = function (rootUI, textures, maxNumber) {
		if (textures.length < maxNumber) {
			var cubeTextures = [];
			textures.forEach(texture => {
				var image = texture.image;
				if (!image) {
					return;
				}

				if (Utils.isArray(image)) {
					cubeTextures.push(texture);
				}
				else {
					var textureDetail = texture.name + `[${image.width} x ${image.height}]`;

					var name;
					if (texture.type) {
						name = Utils.beautySub(texture.type + ': ' + textureDetail, 15);
					}
					else {
						name = Utils.beautySub(textureDetail, 15);
					}

					name = _private.getUniqueFolderName(rootUI, name);
					var textureFolder = rootUI.addFolder(name);

					var imageInfo = {};
					imageInfo['open'] = function () {
						_private.callbacks['onBrowseImage'](texture.name, image);
					};

					textureFolder.add(imageInfo, 'open');
				}
			});

			if (cubeTextures.length) {
				var cubeTextureFolder = rootUI.addFolder('CubeTexture');
				cubeTextures.forEach(cubeTexture => {
					var name = _private.getUniqueFolderName(cubeTextureFolder, cubeTexture.name);
					var _cubetextureFolder = cubeTextureFolder.addFolder(name);
				});
			}
		}
		else {
			rootUI.addFolder('too many textures ...');
		}
	}

	// Create node texture folder.
	_private.createNodeTextureFolder = function (rootUI, nodeDebugger, maxNumber) {
		var textures = nodeDebugger.getTextures();
		if (!textures.length) {
			return null;
		}

		var folder = rootUI.addFolder('Textures');
		_private.buildNodeTextureFolder(folder, textures, maxNumber);

		return folder;
	}

	// Add breakpoint folder.
	_private.addBreakpointFolder = function (folder, nodeDebugger, key) {
		var data = {};
		data[key] = false;

		var breakpoint = nodeDebugger.setValueBreakpoint(key, {
			onSetValueBreakpoint: Utils.setValueBreakpoint,
			onValueChanged: function () {
				data[key] = false;
			}
		});

		folder.add(data, key).onChange(value => {
			breakpoint.enable = value;
		}).listen();
	}

	// Create node breakpoints folder.
	_private.createNodeBreakpointsFolder = function (rootUI, nodeDebugger) {
		// Hook states
		var folder = rootUI.addFolder('Breakpoints');
		_private.addBreakpointFolder(folder, nodeDebugger, 'visible');
		_private.addBreakpointFolder(folder, nodeDebugger, 'parent');
		_private.addBreakpointFolder(folder, nodeDebugger, 'children');

		if (nodeDebugger.hasAnyValueBreakpoints()) {
			folder.open();
		}

		return folder;
	}

	// Destroy node stats folders.
	_private.destroyNodeStatsFolders = function () {
		var nodeStats = _private.nodeStats;
		if (!nodeStats) {
			return;
		}

		var keys = [
			'materialFolder',
			'textureFolder',
			'breakpointsFolder'
		];

		keys.forEach(key => {
			var folder = nodeStats[key];
			if (!folder) {
				return;
			}

			_private.rootUI.removeFolder(folder);
			delete nodeStats[key];
		});
	}

	// Update Node stats.
	_private.updateNodeStats = function (nodeStats) {
		// Copy number to string
		var keys = [
			'meshes',
			'materials',
			'textures',
		];
		keys.forEach(key => {
			_private.nodeStats[key] = nodeStats[key].toString();
		});

		// Copy number to formatted string
		var formatKeys = [
			'vertices',
		];
		formatKeys.forEach(key => {
			var value = Utils.formatByteSize(nodeStats[key], 2, '');
			_private.nodeStats[key] = value;
		});
	}

	// Update selected node.
	_private.updateSelectedNode = function () {
		var node = _private.node;
		if (!node) {
			return;
		}

		var options = _private.options.info;

		// Copy vector value.
		var _copyVectorValue = function (target, source) {
			target.x = source[0];
			target.y = source[1];
			target.z = source[2];
		}

		// Sync node transform info
		var _syncTransform = function (transform, position, quaternion, scale) {
			// Convert quaterion to euler in degree
			var angles = MathUtils.getAnglesFromQuat(quaternion);

			_copyVectorValue(transform.position, position);
			_copyVectorValue(transform.angles, angles);
			_copyVectorValue(transform.scale, scale);
		}

		let isBaseObject = node.isBaseObject;
		var local = options.local;
		var world = options.world;
		if (isBaseObject) {
			// Sync node info
			options.name = node.name;
			options.renderOrder = node.renderOrder;
			options.visible = node.visible;
			// Sync node local info
			_position = node.position;
			_quaternion = node.quaternion;
			_scale = node.scale;
			_syncTransform(local, _position, _quaternion, _scale);

			// Sync node world info
			if (!options.worldTransformFolder.isClosed()) {
				node.getWorldPosition(_worldPosition);
				node.getWorldQuaternion(_worldQuaternion);
				node.getWorldScale(_worldScale);

				_syncTransform(world, _worldPosition, _worldQuaternion, _worldScale);
			}
		}
		else {
			// Sync node info
			options.name = node.getName();
			options.renderOrder = node.getRenderOrder();
			options.visible = node.getVisible();
			// Sync node local info
			node.getPosition(_position);
			node.getQuaternion(_quaternion);
			node.getScale(_scale);
			_syncTransform(local, _position, _quaternion, _scale);

			// Sync node world info
			if (!options.worldTransformFolder.isClosed()) {
				node.getWorldPosition(_worldPosition);
				node.getWorldQuaternion(_worldQuaternion);
				node.getWorldScale(_worldScale);

				_syncTransform(world, _worldPosition, _worldQuaternion, _worldScale);
			}
		}
	}

	// Build transform node data.
	_private.buildTransformNodeData = function () {
		return {
			position: {
				x: 0.0001,
				y: 0.0001,
				z: 0.0001,
			},
			angles: {
				x: 0.0001,
				y: 0.0001,
				z: 0.0001,
				order: 'XYZ',
			},
			scale: {
				x: 0.0001,
				y: 0.0001,
				z: 0.0001,
			}
		};
	}

	// Attach node.
	_private.attachNode = function (node) {
		var rendererDebugger = _private.rendererDebugger;
		var rootUI = _private.rootUI;

		_private.createFolder();
		rendererDebugger.detachNodeDebugger();
		var nodeDebugger = rendererDebugger.attachNodeDebugger(node);
		if (!nodeDebugger) {
			return;
		}

		_private.node = node;
		if (_private.node) {
			let baseObject = _private.node.isBaseObject ? _private.node : _private.node.getBaseObject();
			let renderNode = baseObject ? baseObject.node : null;
			if (renderNode) {
				_private.isInstancedDrawing = renderNode.getStyle ? renderNode.getStyle().isEnabled('InstancedDrawing') : false;
			}
		}
		else {
			console.error('node is invalid!!!');
			return;
		}

		// Create node stats folder
		var nodeStats = nodeDebugger.getStats();
		if (nodeStats) {
			// Get the panel visible state
			var closed = _private.rootUI.closed;

			// Destroy previous folders
			_private.destroyNodeStatsFolders();

			_private.updateNodeStats(nodeStats);
			_private.openAllFolders(_private.rootUI, 3);

			_private.nodeStats.breakpointsFolder = _private.createNodeBreakpointsFolder(rootUI, nodeDebugger);
			_private.nodeStats.materialFolder = _private.createNodeMaterialFolder(rootUI, nodeDebugger, 20);
			_private.nodeStats.textureFolder = _private.createNodeTextureFolder(rootUI, nodeDebugger, 20);

			// Resume the panel visible state
			_private.rootUI.closed = closed;
		}

		var helperOptions = _private.options.helper;
		nodeDebugger.setAttribute('WireframeHelper', helperOptions.wireframe);
		nodeDebugger.setAttribute('NormalHelper', helperOptions.normal);
		nodeDebugger.setAttribute('AxesHelper', helperOptions.axes);
		nodeDebugger.setAttribute('BoundingBoxHelper', helperOptions.boundingBox);
		nodeDebugger.setAttribute('OrientedBoundingBoxHelper', helperOptions.orientedBoundingBox);
	}

	// Initalize.
	_private.init = function () {
		_private.rendererDebugger = param['rendererDebugger'];
		_private.rootUI = param['rootUI'];
		_private.callbacks = param['callbacks'] || _private.callbacks;
	}

	// #endregion

	_private.rendererDebugger = null;
	_private.rootUI = null;

	_private.node = null;
	_private.isInstancedDrawing = false

	_private.callbacks = {
		'onGetRootNode': function () { },
		'onReveal': function () { },
		'onBrowseImage': function () { },
	};

	_private.nodeStats = {
		'meshes': '0',
		'materials': '0',
		'textures': '0',
		'vertices': '0',
		'materialFolder': null,
		'textureFolder': null,
		'breakpointsFolder': null,
	};

	_private.options = {
		info: {
			name: '',
			renderOrder: 0,
			visible: true,
			local: _private.buildTransformNodeData(),
			world: _private.buildTransformNodeData(),
		},
		helper: {
			reveal: function () {
				var node = _private.node;
				if (node) {
					_private.callbacks['onReveal'](node, true);
				}
			},
			back: function () {
				let backNode = _private.node;
				if (_private.node.isRenderableObject) {
					backNode = _private.node.getBaseObject();
				}
				else if (_private.node.isRenderableNode) {
					var baseObject = _private.node.getBaseObject();
					backNode = baseObject ? baseObject.getParent() : baseObject;
				}
				else if (_private.node.isBaseObject) {
					backNode = _private.node.getParent();
				}

				if (backNode) {
					_private.callbacks['onReveal'](backNode, true);
				}
			},
			wireframe: false,
			normal: false,
			axes: true,
			boundingBox: false,
			orientedBoundingBox: false,
		},
	};

	_private.init();
}

class NodeDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	attach(node) {
		var _private = this[__.private];

		_private.attachNode(node);
	}

	begin() {
		var _private = this[__.private];

		_private.updateSelectedNode();
	}

	get rootUI() {
		var _private = this[__.private];

		return _private.rootUI;
	}
	set rootUI(value) {
		var _private = this[__.private];

		_private.rootUI = value;
	}
}

export { NodeDebugger }