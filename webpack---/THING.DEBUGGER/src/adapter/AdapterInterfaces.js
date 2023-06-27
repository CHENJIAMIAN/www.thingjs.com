/* eslint-disable no-unused-vars */
import { TypeChecker } from '@uino/thing';

/**
 * @namespace THING.DEBUG.ADAPTER
 */

// #region Adapter Interface Declaration

/**
 * The node debugger attribut type.
 * @enum {String}
 * @memberof THING.DEBUG.ADAPTER
 * @readonly
 */
const NodeDebuggerAttributeType = {
	WireframeHelper: 'WireframeHelper',
	NormalHelper: 'NormalHelper',
	AxesHelper: 'AxesHelper',
	BoundingBoxHelper: 'BoundingBoxHelper',
	OrientedBoundingBoxHelper: 'OrientedBoundingBoxHelper',
};

/**
 * The node debugger breakpoint type.
 * @enum {String}
 * @memberof THING.DEBUG.ADAPTER
 * @readonly
 */
const NodeDebuggerBreakpointType = {
	Visible: 'Visible',
	Parent: 'Parent',
	Children: 'Children',
};

/**
 * @typedef {Object} SceneHierarchyNode
 * @property {Object} userData The user data.
 * @property {Array<SceneHierarchyNode>} children The children.
 */

/**
 * The function to call when filter scene hierarchy.
 * @callback SceneHierarchyFilterCallback
 * @param {Object} node The node.
 * @returns {Boolean} True indicates to keep it, false indicates to filter it.
 */

/**
 * @typedef {Object} NodeDebuggerBreakpointOptions
 * @property {Function} onValueChanged When the value changed.
 */

/**
 * @typedef {Object} NodeDebuggerTextureStats
 * @property {String} mame The name.
 * @property {image} image The image resource.
 */

/**
 * @typedef {Object} NodeDebuggerMaterialStats
 * @property {String} mame The name.
 * @property {Boolean} visible The visible state.
 * @property {Array<NodeDebuggerTextureStats>} textures The textures stats.
 */

/**
 * @typedef {Object} NodeDebuggerStats
 * @property {Number} meshes The meshes number.
 * @property {Number} vertices The vertices number.
 * @property {Array<NodeDebuggerMaterialStats>} materials The materials number.
 * @property {Array<NodeDebuggerTextureStats>} textures The textures number.
 */

/**
 * @class SceneHierarchy
 * The scene hierarchy.
 * @memberof THING.DEBUG.ADAPTER
 */
class SceneHierarchy {

	constructor() { }

	/**
	 * Filter objects and create new scene hierarchy.
	 * @param {SceneHierarchyFilterCallback} callback The callback function.
	 * @returns {SceneHierarchy}
	 */
	filter(deltaTime) { }

	/**
	 * Get the root.
	 */
	getRoot() { }

}

/**
 * @class NodeDebugger
 * The node debugger.
 * @memberof THING.DEBUG.ADAPTER
 */
class NodeDebugger {

	constructor() { }

	/**
	 * Set attribute.
	 * @param {NodeDebuggerAttributeType} type The type name.
	 * @param {*} value The value.
	 */
	setAttribute(type, value) { }

	/**
	 * Set value breakpoint.
	 * @param {NodeDebuggerBreakpointType} type the type name.
	 * @param {NodeDebuggerBreakpointOptions} options The options.
	 */
	setValueBreakpoint(key, options) { }

	/**
	 * Check whether has any value breakpoints.
	 * @returns {Boolean}
	 */
	hasAnyValueBreakpoints() { }

	/**
	 * Get materials.
	 * @returns {Array<any>}
	 */
	getMaterials() { }

	/**
	 * Get textures.
	 * @returns {Array<any>}
	 */
	getTextures() { }

	/**
	 * Get the stats.
	 * @returns {NodeDebuggerStats}
	 */
	getStats() { }

}

/**
 * @class RendererDebugger
 * The renderer debugger.
 * @memberof THING.DEBUG.ADAPTER
 */
class RendererDebugger {

	constructor() { }

	/**
	 * Update.
	 * @param {Number} deltaTime The delta time in seconds.
	 */
	update(deltaTime) { }

	/**
	 * Process with specified view.
	 * @param {Object} view The application view.
	 */
	processRenderer(view) { }

	/**
	 * Get the scene hierarchy.
	 * @param {Object} scene The scene.
	 * @returns {SceneHierarchy}
	 */
	getHierarchy(scene) { }

	/**
	 * Attach node debugger.
	 * @param {Object} node The node.
	 * @returns {NodeDebugger}
	 */
	attachNodeDebugger(node) { }

	/**
	 * Detach node debugger.
	 */
	detachNodeDebugger() { }

}

/**
 * @class SceneAnalyzeDebugger
 * The scene analyze debugger.
 * @memberof THING.DEBUG.ADAPTER
 */
class SceneAnalyzeDebugger {

	constructor() { }

	/**
	 * Begin to analyze scene.
	 * @param {Object} scene The scene
	 */
	beginAnalyze(scene) { }

	/**
	 * End to analyze scene.
	 */
	endAnalyze() { }

	/**
	 * Clear analyze results.
	 */
	clearAnalyzeResult() { }

}

/**
 * @class RendererStats
 * The renderer stats.
 * @memberof THING.DEBUG.ADAPTER
 */
class RendererStats {

	constructor() { }

	/**
	 * Get the container element.
	 * @returns {Object}
	 */
	getContainer() { }

}

/**
 * @class Factory
 * The factory to create object.
 * @memberof THING.DEBUG.ADAPTER
 */
class Factory {

	constructor() { }

	/**
	 * Create object.
	 * @param {String} type The object type.
	 * @param {Object} options The object options.
	 * @returns {Object}
	 */
	createObject(type, options) { }

}

// #endregion

export function createTypeChecker() {
	return new TypeChecker({
		'SceneHierarchy': SceneHierarchy,
		'NodeDebugger': NodeDebugger,
		'RendererDebugger': RendererDebugger,
		'SceneAnalyzeDebugger': SceneAnalyzeDebugger,
		'RendererStats': RendererStats,
		'Factory': Factory,
	});
}