import { Utils } from './common/Utils';
import dat from "../libs/dat.gui.module";
import { Tree } from './uicomponent/Tree/Tree';
import { HierarchyItemType } from "./const"
var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;
// require('style-loader!css-loader!less-loader!jeasyui/themes/icon.css');
// require('style-loader!css-loader!less-loader!jeasyui/themes/default/easyui.css');
// require('jeasyui/jquery.easyui.min');

import '@playcanvas/pcui/styles';

var sceneHierarchy = null;
var sceneHierarchyTree = null;

var build = function (param = {}) {
	var onGetScene = param['onGetScene'] || function () { };
	var onClickNode = param['onClickNode'] || function () { };
	var onDblClickNode = param['onDblClickNode'] || function () { };
	var onGetHierarchy = param['onGetHierarchy'] || function () { };
	let devtools = param['devtools'] || false;
	const objectMap = new Map();
	const object3DMap = new Map();

	var domElement = Utils.getCurrentApp().container;
	var rootUI = null;
	// Load root UI.
	var loadRootUI = function (complete) {
		if (!devtools) {
			if (rootUI) {
				complete();
			}
			else {
				var panel = `
						<div id="sceneHierarchy" style="overflow: auto; padding:5px; width: 300px;height: 600px;margin-top: 10px;margin-left: 10px; position: absolute; top: 0; left: 0; z-index: 100;background-color: white">
						</div>
					`;
				var _panel = $(panel);
				$(domElement.parentElement).append(_panel);

				rootUI = _panel;
				complete();
			}
		}
		else {
			complete();
		}
	}

	var registerTreeItemFunc = function (treeItem, key) {
		switch (key) {
			case HierarchyItemType.Object:
				treeItem.registerCheckFunc((item, checked) => {
					var node = objectMap.get(item.id);
					if (node) {
						node.active = checked;
					}
				});
				treeItem.registerClickFunc((item, param) => {
					var node = objectMap.get(item.id);
					if (node) {
						onClickNode(node, param);
						sceneHierarchyTree.selectItem(item);
					}
				});
				treeItem.registerDblClickFunc((item) => {
					var node = objectMap.get(item.id);
					if (node) {
						onDblClickNode(node);
						sceneHierarchyTree.selectItem(item);
					}
				});
				break;
			case HierarchyItemType.Body:
				treeItem.registerCheckFunc((item, checked) => {
					var node = objectMap.get(item.id);
					if (node && node.bodyNode) {
						node.bodyNode.setVisible(checked);
					}
				});
				treeItem.registerClickFunc((item, param) => {
					var node = objectMap.get(item.id);
					if (node && node.bodyNode) {
						onClickNode(node.bodyNode, param);
						sceneHierarchyTree.selectItem(item);
					}
				});
				treeItem.registerDblClickFunc((item) => {
					var node = objectMap.get(item.id);
					if (node && node.bodyNode) {
						onDblClickNode(node.bodyNode);
						sceneHierarchyTree.selectItem(item);
					}
				});
				break;
			case HierarchyItemType.BodyNode:
				treeItem.registerCheckFunc((item, checked) => {
					var node = object3DMap.get(item.id);
					if (node) {
						node.visible = checked;
					}
				});
				treeItem.registerClickFunc((item, param) => {
					var node = object3DMap.get(item.id);
					if (node) {
						onClickNode(node, param);
						sceneHierarchyTree.selectItem(item);
					}
				});
				treeItem.registerDblClickFunc((item) => {
					var node = object3DMap.get(item.id);
					if (node) {
						onDblClickNode(node);
						sceneHierarchyTree.selectItem(item);
					}
				});
				break;
			case HierarchyItemType.Children:
				treeItem.registerCheckFunc((item, checked) => {
					var node = objectMap.get(item.id);
					node.visible = checked;
				});
				treeItem.registerClickFunc((item, param) => {
					var node = objectMap.get(item.id);
					if (node) {
						onClickNode(node, param);
						sceneHierarchyTree.selectItem(item);
					}
				});
				treeItem.registerDblClickFunc((item) => {
					var node = objectMap.get(item.id);
					if (node) {
						onDblClickNode(node);
						sceneHierarchyTree.selectItem(item);
					}
				});
				break;
			default:
				break;
		}
	}

	var showHierarchy = function (hierarchy) {
		var getObjectNameTypeString = function (node) {
			let ret = "";
			if (Utils.isNumber(node.name)) {
				ret = node.name.toString();
			}
			else if (node.name) {
				ret = node.name;
			}
			ret = `${ret}[${node.type}]`;
			return ret;
		}
		var generateBody = function (body) {
			let object = body.object;
			let children = body.children;

			let ret = { id: object.uuid, checked: object.visible, text: object.name, children: [] };
			children.forEach(item => {
				let sub = generateBody(item);
				ret.children.push(sub);
			})
			object3DMap.set(object.uuid, object);

			return ret;
		}

		// process the tree data
		hierarchy.traverse(item => {
			var object = item.object;
			delete item.object;
			if (!objectMap.has(object.uuid)) {
				objectMap.set(object.uuid, object);
			}
			item.id = object.uuid;
			item.checked = object.visible;
			item.text = getObjectNameTypeString(object);
			if (item.body) {
				let body = item.body;
				item.body = generateBody(body);
			}
		});
		var root = hierarchy.getRoot();
		root.isRoot = true;

		//build the tree
		sceneHierarchy = devtools ? dat.sceneHierarchyTree : $('#sceneHierarchy');
		if (sceneHierarchyTree) {
			sceneHierarchyTree.clearTreeItems();
		}
		else {
			sceneHierarchyTree = new Tree({
				scrollable: false
			});
		}
		sceneHierarchyTree.build(root, registerTreeItemFunc);
		sceneHierarchy[0].append(sceneHierarchyTree._dom);

		if (!devtools) {
			sceneHierarchy.show();
		}
		else {
			sceneHierarchy = sceneHierarchyTree;
		}
	}

	var info = {
		// Show hierarchy.
		'show': function () {
			return {
				onTrigger: function () {
					info._show();
				}
			}
		},
		// Hide scene hierarchy.
		'hide': function () {
			return {
				onTrigger: function () {
					info._hide();
				}
			}
		},
		'dump': function () {
			return {
				onTrigger: function () {
					info._dump();
				}
			}
		},
		// Show.
		_show: function (callback, reload = true) {
			Utils.throttling(() => {
				loadRootUI(() => {
					if (reload) {
						var hierarchy = onGetHierarchy();
						if (hierarchy) {
							showHierarchy(hierarchy);
						}
					}
					else {
						if (sceneHierarchy) {
							sceneHierarchy.show();
						}
					}

					if (callback) {
						callback();
					}
				});
			}, 200)();
		},
		// Hide.
		_hide: function () {
			if (sceneHierarchy) {
				sceneHierarchy.hide();
			}
		},
		// Get visible state.
		_isVisible: function () {
			if (!sceneHierarchy) {
				return false;
			}

			if (!devtools) {
				var style = sceneHierarchy[0].style;

				if (style.visibility == "hidden") {
					return false;
				}

				if (style.display == "none") {
					return false;
				}

				return true;
			}
			else {
				if (!sceneHierarchy.isShow) {
					return false
				}
				return true;
			}
		},
		// Dump.
		_dump: function () {
			var scene = onGetScene();
			if (!scene) {
				return;
			}

			var meshes = scene.getMeshes();

			// Only dump visible mesh
			meshes = meshes.filter(mesh => { return mesh.isVisible(); })

			meshes.sort((a, b) => {
				return b.getVerticesCount() - a.getVerticesCount();
			});

			var totalVertices = 0;
			var verticesCounts = meshes.map(mesh => {
				var count = mesh.getVerticesCount();
				totalVertices += count;

				return count;
			});

			console.log(`[Scene check result: [meshes:${meshes.length}, v:${totalVertices}]\n`);
			meshes.forEach((mesh, index) => {
				var percentage = ((verticesCounts[index] / totalVertices) * 100).toFixed(2) + '%';
				console.log(`[${percentage},(v:${verticesCounts[index]})]`, mesh);
			});
		},
		// Select node.
		_selectNode: function (node) {
			if (!node) {
				return;
			}

			let getTreeItemFormNode = function (node) {
				if (!sceneHierarchyTree || !node) {
					return null;
				}
				if (node.isRenderableObject) {
					return sceneHierarchyTree.getItem(node.uuid, HierarchyItemType.BodyNode);
				}
				if (node.isBaseObject) {
					return sceneHierarchyTree.getItem(node.uuid, HierarchyItemType.Object);
				}
				if (node.isRenderableNode && node.getBaseObject()) {
					let uuid = node.getBaseObject().uuid;
					return sceneHierarchyTree.getItem(uuid, HierarchyItemType.Body);
				}
				return null;
			}

			info._show(() => {
				if (!sceneHierarchyTree) {
					return;
				}

				if (!devtools) {
					let treeItem = getTreeItemFormNode(node);
					if (treeItem) {
						sceneHierarchyTree.selectItem(treeItem);
					}
				}
				else {
					//sceneHierarchyTree.find(node.uuid);
				}
			}, false);
		}
	};

	return info;
}

var HierarchyAppDebugger = {
	build,
};

export { HierarchyAppDebugger }