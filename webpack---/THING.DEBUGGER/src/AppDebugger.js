import { Utils } from './common/Utils';
import { Debugger } from './core/Debugger';
import { HierarchyAppDebugger } from './AppDebugger.Hierarchy';
import dat from '../libs/dat.gui.module';
var ControlKit = require('controlkit');

const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	_private.selectedObject = null;

	var app = THING.Utils.getCurrentApp();
	Utils.setCurrentApp(app);
	var objectManager = app.objectManager;

	let devtools = param['devtools'] || false;


	// #region Private Functions

	// When load.
	_private.onLoad = function () {
	}

	// When destory.
	_private.onDestroy = function () {
	}

	// Collect objects from nodes.
	_private.collectObjectsFromNodes = function (nodes) {
		var objects = new Map();
		nodes.forEach(node => {
			var object = objectManager.getBaseObjectFromNode(node);
			if (!object) {
				return;
			}

			var data = objects.get(object);
			if (data) {
				data.nodes.push(node);
			}
			else {
				objects.set(object, { nodes: [node] });
			}
		});

		return objects;
	}

	// Output object log.
	_private.outputObjectLog = function (node) {
		var args = [];

		var object;
		if (node.isRenderableObject) {
			object = node.getBaseObject();
		}
		else if (node.isRenderableNode) {
			object = objectManager.getBaseObjectFromNode(node);
		}
		else if (node.isBaseObject) {
			object = node;
		}

		if (object) {
			if (object.id) {
				args.push(`id: '${object.id}'`);
			}

			if (object.name) {
				args.push(`name: '${object.name}'`);
			}

			if (object.getProxyObject()) {
				args.push(`proxy:`, object.getProxyObject());
			}

			args.push(`object:`, object);
		}

		if (node) {
			args.push(`node:`, node);
		}

		if (args.length) {
			console.log.apply(console, args);
		}
	}

	// Collect nodes from draw call objects.
	_private.collectObjectNodes = function (drawCallObjects) {
		var objectNodes = [];
		drawCallObjects.forEach(drawCallObject => {
			var object = drawCallObject.object;
			if (object) {
				for (var i = 0; i < objectNodes.length; i++) {
					if (objectNodes[i].object == object) {
						objectNodes[i].percentage += drawCallObject.percentage;
						objectNodes[i].nodes.push(...drawCallObject.nodes);
						return;
					}
				}
			}

			objectNodes.push({ object, percentage: drawCallObject.percentage, nodes: drawCallObject.nodes });
		});

		objectNodes.sort((a, b) => {
			return b.percentage - a.percentage;
		});

		return objectNodes;
	}

	// Build debugger options.
	_private.buildDebuggerOptions = function () {
		var options = {
			onError: param['onError'],
			onLoad: _private.onLoad,
			onDestroy: _private.onDestroy,
			objectCallbacks: {
				onGetRootNode: function (node) {
					var rootNode = node.getRootNode();
					if (!rootNode) {
						return null;
					}

					return rootNode;
				},
				onReveal: function (node, showHierarchy) {
					THING.d.select(node, showHierarchy);
				},
				onBrowseImage: function (name, image) {
					if (!image) {
						return;
					}

					var title = name ? name : image.src;
					app.delegate.processCommand({ type: 'open', title, resource: image });
				}
			},
			statsCallbacks: {
				onMaxFPS: function (value) {
					// Lock limit FPS
					if (value) {
						app.timer.maxFPS = value;
					}
					// Unlock limit FPS
					else {
						app.timer.maxFPS = -1;
					}
				}
			},
			sceneCallbacks: {
				onProfile: function (result, sortType) {
					var drawCallObjects = result.getDrawCallObjects(sortType);

					var objectNodes = _private.collectObjectNodes(drawCallObjects);
					objectNodes.forEach(objectNode => {
						var percentage = Math.max(0.01, objectNode.percentage * 100).toFixed(2) + '%';
						if (objectNode.object) {
							console.log(percentage, objectNode.object, objectNode.nodes);
						}
						else {
							console.log(percentage, objectNode.nodes);
						}
					});
				},
				onDiff: function (result) {
					// Get the diff nodes (for detecting new and destroied nodes)
					var diffNodes = result.getNodes();

					// Output destroied nodes
					var destroiedNodes = diffNodes.destroiedNodes;
					if (destroiedNodes.length) {
						console.log(`Destroied:\n`, destroiedNodes);
					}

					// Output created nodes
					var objects = _private.collectObjectsFromNodes(diffNodes.createdNodes);
					if (objects.size) {
						console.log(`Created:\n`);
						for (let [object, value] of objects.entries()) {
							console.log(object, value.nodes);
						}
					}

					// Output visible changed nodes
					var visibleChangedNodes = result.getVisibleChangedNodes();
					if (visibleChangedNodes.length) {
						console.log(`Visible changed:\n`);
						var objects = _private.collectObjectsFromNodes(visibleChangedNodes);
						for (let [object, value] of objects.entries()) {
							console.log(object,
								value.nodes.map(node => {
									return { visible: `${!node.visible}->${node.visible}`, node };
								})
							);
						}
					}
				},
			},
			external: {
				Hierarchy: _private.hierarchy = HierarchyAppDebugger.build({
					onGetScene: function () {
						return _private.scene;
					},
					onGetHierarchy: function () {
						return _private.debug.getHierarchy(app.root);
					},
					onClickNode: function (node, param) {
						_private.selectNode(node);
						if (param && param.pressCtrl) {
							let baseObject = node.isBaseObject ? node : node.getBaseObject();
							if (!baseObject) {
								return;
							}
							let distance = Math.max(10, baseObject.boundingBox.radius);
							app.camera.flyTo({
								target: baseObject,
								distance: distance
							});
						}
					},
					onDblClickNode: function (node) {
						_private.selectNode(node);
						let baseObject = node.isBaseObject ? node : node.getBaseObject();
						if (!baseObject) {
							return;
						}
						let distance = Math.max(10, baseObject.boundingBox.radius);
						app.camera.flyTo({
							target: baseObject,
							distance: distance
						});
					},
					devtools
				}),
			},
			getASelector: param['getASelector']
		};

		_private.scene = app.root.node;

		return options;
	}

	// Select node.
	_private.selectNode = function (node) {
		_private.outputObjectLog(node);
		_private.debug.openObjectPanel(node);
		_private.selectedObject = node.isBaseObject ? node : node.getBaseObject();
	}

	// Open debug panel.
	_private.openPanel = function (param) {
		_private.debug.openPanel(param);
	}

	// Close debug.
	_private.close = function () {
	}

	// Register useful global debug functions
	_private.registerGlobalFunc = function () {
		// Register useful global debug functions
		THING.d = {
			// Select object.
			select: function (node, showHierarchy = false) {
				if (showHierarchy) {
					_private.hierarchy._show(() => {
						_private.selectNode(node);
						_private.hierarchy._selectNode(node);
					}, true);
				}
				else {
					_private.selectNode(node);
					if (_private.hierarchy._isVisible()) {
						_private.hierarchy._selectNode(node);
					}
				}
			},
			getSelectedObject: function () {
				return _private.selectedObject;
			}
		};
	}

	// Register golbal profile debug functions
	_private.registerProfileFunc = function () {
		let MIN_FRAME = 10;
		let MIN_TIMESPAN = 1000;
		THING.d = THING.d || {
			beginProfile() {
				if (_private.profileInfo.state == "run") {
					console.warn("the debugger is profiling!!!");
					return;
				}
				_private.pickerEnable = app.picker.enable;
				app.picker.enable = false;

				_private.debug.beginProfile();
				_private.profileInfo.time = (performance || Date).now()
				_private.profileInfo.frame = _private.currentFrame;
				_private.profileInfo.state = "run";
			},
			endProfile() {
				if (_private.profileInfo.state != "run") {
					console.warn("the debugger is not profiling!!!");
					return;
				}
				if ((performance || Date).now() - _private.profileInfo.time < MIN_TIMESPAN) {
					let msg = "the debugger profile time must more than ";
					msg += MIN_TIMESPAN;
					msg += " ms!!!";
					console.warn(msg);
					return;
				}
				if (_private.currentFrame - _private.profileInfo.frame < MIN_FRAME) {
					let msg = "the profile doing with a low fps,so we can collect less than ";
					msg += MIN_FRAME;
					msg += " frame, so the profile info maybe inaccurate";
					console.warn(msg);
				}
				_private.debug.endProfile();
				app.picker.enable = _private.pickerEnable;
				_private.profileInfo.time = 0;
				_private.profileInfo.state = "complete";
			},
			getProfileInfo() {
				if (_private.profileInfo.state == "complete") {
					_private.profileInfo.info = _private.debug.getProfileInfo();
				}
				else {
					let msg = "the profile state is invalid,you may get a old info or null data.";
					msg += "you can get the info after do beginProfile and end Profile operate!!";
					console.warn(msg);
				}
				_private.profileInfo.state = "idle";
				return _private.profileInfo.info;
			}
		};
	}
	_private.pickerEnable = true;
	_private.profileInfo = {
		state: "idle",
		time: 0,
		frame: 0,
		info: null
	};

	// Initialize.
	_private.init = function () {
		_private.currentFrame = 0;

		_private.debug = new Debugger(_private.buildDebuggerOptions());

		// Begin to render
		app.addBeforeRenderCallback((deltaTime) => {
			_private.debug.begin(deltaTime);
		});

		// End to render
		app.addAfterRenderCallback((deltaTime) => {
			_private.debug.end(deltaTime);
			_private.currentFrame++;
		});

		const profile = param['profile'];
		if (profile) {
			_private.registerProfileFunc();
		}
		else {
			_private.registerGlobalFunc()
		}


		let ready = param['ready'];
		if (ready) {
			ready();
		}
		console.log('thing.debugger is ready!!');
	}

	// #endregion

	// Initialize debug
	_private.debug = null;

	// External tools
	_private.hierarchy = null;

	// Initialize
	_private.init();
}

class AppDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	load(devtools) {
		var _private = this[__.private];

		var app = Utils.getCurrentApp();
		var size = app.size;

		var controlKit = new ControlKit();
		var statsRootUI = controlKit.addPanel({ label: 'RenderStats', width: 260, align: 'left', fixed: false, position: [size[0] / 2, 0] });
		statsRootUI.disable();

		app.addAfterRenderCallback(() => {
			controlKit.update();
		});

		_private.openPanel({
			rootUI: devtools ? new dat.gui.VGUI() : new dat.gui.GUI(),
			statsRootUI: statsRootUI,
			objectRootUI: devtools ? new dat.gui.VGUI() : new dat.gui.GUI({ scrollable: false }),
		});
	}

}

export { AppDebugger }