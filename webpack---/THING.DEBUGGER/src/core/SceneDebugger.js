import { Utils } from '../common/Utils';
import { DebuggerUtils } from './DebuggerUtils';

const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	var app = Utils.getCurrentApp();

	// #region Private Functions

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		var rendererDebugger = _private.rendererDebugger;
		var sceneDebugger = rendererDebugger.getSceneDebugger();
		var scene = app.root.node;
		// The scene options
		var options = {
			singleStep: {
				enable: rendererDebugger.singleStepOptions.enable,
				interval: rendererDebugger.singleStepOptions.interval,
				flickerTimes: rendererDebugger.singleStepOptions.flickerTimes,
				pause: function(){
					if(!rendererDebugger.singleStepOptions.enable || !singleStepPauseControl){
						return;
					}

					rendererDebugger.singleStepOptions.pause = !rendererDebugger.singleStepOptions.pause;
					if(rendererDebugger.singleStepOptions.pause){
						singleStepPauseControl.name('resume');
					}
					else{
						singleStepPauseControl.name('pause');
					}		
				}
			},
			profile: {
				sortType: 'DrawCall',
				start: function () {
					return {
						'start': function () {
							sceneDebugger.beginProfile(scene);
						},
						'starting...': function () {
							sceneDebugger.endProfile();

							var result = sceneDebugger.getProfileResult();
							_private.callbacks['onProfile'](result, options.profile.sortType);
						}
					}
				},
			},
			objects: {
				visible: rendererDebugger.sceneOptions.visible,
				opaque: rendererDebugger.sceneOptions.opaqueVisible,
				transparent: rendererDebugger.sceneOptions.transparentVisible,
				distance: rendererDebugger.sceneOptions.distance,
			},
			diff: {
				filterType: 'All',
				start: function () {
					return {
						'start': function () {
							sceneDebugger.beginDiff(scene);
						},
						'starting...': function () {
							sceneDebugger.endDiff();

							var result = sceneDebugger.getDiffResult(options.diff.filterType);
							_private.callbacks['onDiff'](result);
						}
					}
				}
			}
		};

		// Create single step folder
		let singleStepFolder = rootUI.addFolder('SingleStep');
		singleStepFolder.add(options.singleStep, 'enable').onChange(value => {
			rendererDebugger.enableSingleStep(value, scene);
			singleStepPauseControl.name('pause');
		});
		singleStepFolder.add(options.singleStep, 'interval').min(10).max(2 * 1000).step(5).onChange(value => {
			rendererDebugger.singleStepOptions = { interval: value };
		});
		singleStepFolder.add(options.singleStep, 'flickerTimes').min(2).max(12).step(1).onChange(value => {
			rendererDebugger.singleStepOptions = { flickerTimes: value };
		});
		let singleStepPauseControl = singleStepFolder.add(options.singleStep, 'pause');
		singleStepFolder.add(rendererDebugger.singleStepOptions, 'percentage').min(0).max(100).step(1).listen();

		// Profile folder
		var profileFolder = rootUI.addFolder('Profile');
		profileFolder.add(options.profile, 'sortType', ['DrawCall', 'Node', 'Mesh', 'Material', 'Texture', 'Vertices']).listen();
		DebuggerUtils.createValueElement(profileFolder, options.profile, 'start');

		// Objects folder
		var objectsFolder = rootUI.addFolder('Objects');
		objectsFolder.add(options.objects, 'visible').onChange(value => {
			rendererDebugger.sceneOptions = { visible: value };
		});
		objectsFolder.add(options.objects, 'opaque').onChange(value => {
			rendererDebugger.sceneOptions = { opaqueVisible: value };
		});
		objectsFolder.add(options.objects, 'transparent').onChange(value => {
			rendererDebugger.sceneOptions = { transparentVisible: value };
		});
		objectsFolder.add(options.objects, 'distance').min(0).max(5000).step(5).onChange(value => {
			rendererDebugger.sceneOptions = { distance: value };
		});

		// Diff folder
		var diffFolder = rootUI.addFolder('Diff');
		diffFolder.add(options.diff, 'filterType', ['All', 'Mesh']).listen();
		DebuggerUtils.createValueElement(diffFolder, options.diff, 'start');
	}

	// Initalize.
	_private.init = function () {
		_private.rendererDebugger = param['rendererDebugger'];
		_private.callbacks = param['callbacks'] || _private.callbacks;
	}

	// #endregion

	_private.callbacks = {
		'onProfile': function () { },
		'onDiff': function () { },
	};

	_private.rendererDebugger = null;

	_private.init();
}

class SceneDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

}

export { SceneDebugger }