import { Utils } from '../common/Utils';
import { NetworkDebugger } from './NetworkDebugger.js';
import { EventDebugger } from './EventDebugger.js';
import { NodeDebugger } from './NodeDebugger.js';
import { StatsDebugger } from './StatsDebugger.js';
import { SceneDebugger } from './SceneDebugger.js';
import { CameraDebugger } from './CameraDebugger.js';
import { AnimationDebugger } from './AnimationDebugger.js';
import { MaterialDebugger } from './MaterialDebugger.js';
import { LightDebugger } from './LightDebugger.js';
import { PickerDebugger } from './PickerDebugger.js';
import { ExternalDebugger } from './ExternalDebugger.js';
import { ThreadCheckerWorker } from '../workers/thread.checker.worker.js';
import { QueryDebugger } from './QueryDebugger';
//import { ProfileDebugger } from './ProfileDebugger';
import { EnvInfoDebugger } from './EnvInfoDebugger';
import { PostEffectDebugger } from './PostEffectDebugger';


const __ = {
	private: Symbol('private'),
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	var app = THING.Utils.getCurrentApp();
	Utils.setCurrentApp(app);
	var factories = THING.Utils.getFactories();
	Utils.addFactories(factories);

	// #region Private Functions

	// Check root UI.
	_private.checkRootUI = function (rootUI) {
		if (!rootUI) {
			return false;
		}

		return true;
	}

	// Open debugger folder.
	_private.openDebuggerFolder = function (rootUI, statsRootUI) {
		// Create debug folder
		var rootFolder = rootUI.addFolder('Debugger');

		// The debug panels
		const panels = {
			'statsDebugger': 'Stats',
			'networkDebugger': 'Network',
			'eventDebugger': 'Event',
			'sceneDebugger': 'Scene',
			'cameraDebugger': 'Camera',
			'animationDebugger': 'Animation',
			'materialDebugger': 'Material',
			'lightDebugger': 'Light',
			'pickerDebugger': 'Picker',
			'queryDebugger': 'Query',
			//'profileDebugger': 'Profile',
		};

		// Create debug panels
		for (var key in panels) {
			_private[key].createFolder({
				rootUI: rootFolder.addFolder(panels[key]),
				statsRootUI
			});
		}
	}

	// Open external debug folder
	_private.openExternalDebugFolder = function (rootUI) {
		_private.externalDebugger.createFolders(rootUI, _private.external);
	}

	// Create debug root UI.
	_private.createRootUI = function (param) {
		var rootUI = param['rootUI'];
		var statsRootUI = param['statsRootUI'];
		var objectRootUI = param['objectRootUI'];

		if (!_private.checkRootUI(rootUI) || !_private.checkRootUI(objectRootUI)) {
			Utils.error(`Open debugger failed, due to root UI element is not compatible`);
			return;
		}

		// Bring to top
		[rootUI, statsRootUI, objectRootUI].forEach(ui => {
			var domElement = ui.domElement;
			if (domElement && domElement.parentElement) {
				domElement.parentElement.style.zIndex = 10000;
			}
		});

		// Save UI roots
		_private.rootUI = rootUI;
		_private.statsRootUI = statsRootUI;
		_private.objectRootUI = objectRootUI;

		// Set debugger for node's root UI
		_private.nodeDebugger.rootUI = objectRootUI;

		// Open all sub-debug panels
		_private.openDebuggerFolder(rootUI, statsRootUI);
		_private.openExternalDebugFolder(rootUI);
	}

	// Open root UI.
	_private.openRootUI = function () {
		var rootUI = _private.rootUI;
		if (!rootUI) {
			return;
		}

		rootUI.open();
	}

	// Close root UI.
	_private.closeRootUI = function () {
		var rootUI = _private.rootUI;
		if (!rootUI) {
			return;
		}

		rootUI.close();
	}

	// Destroy root UI.
	_private.destroyRootUI = function () {
		// Notify outside to destroy
		_private.onDestroy();

		// Destory root UI element
		var names = ['rootUI', 'statsRootUI'];
		names.forEach(name => {
			var rootUI = _private[name];
			if (rootUI) {
				rootUI.destroy();

				_private[name] = null;
			}
		});

		// Destory stats root UI element
		var names = ['statsRootUI'];
		names.forEach(name => {
			var statsRootUI = _private[name];
			if (statsRootUI) {
				statsRootUI.disable();

				_private[name] = null;
			}
		});
	}

	// Initialize workers.
	_private.initWorkers = function () {
		var timer = null;

		// Initialize thread checker worker

		var threadChecker = null;
		if (Utils.isFunction(Utils.createThreadWorkerFromCode)) {
			threadChecker = Utils.createThreadWorkerFromCode(ThreadCheckerWorker);
		}
		if (!threadChecker) {
			return;
		}
		threadChecker.start(
			function (ev) {
				var data = ev.data;
				var type = data.type;

				switch (type) {
					case 'heartbreak':
						break;

					default:
						break;
				}
			},
			function () {
				if (timer) {
					clearInterval(timer);
					timer = null;
				}
			}
		);

		// Set the interval time in milliseconds
		threadChecker.postMessage({
			type: 'setInterval',
			value: 3000,
		});

		// Hook tick event to check whether main thread had been blocked,
		// when we send 'heartbeat' to worker then means main thread is alive
		timer = setInterval(function () {
			threadChecker.postMessage({
				type: 'heartbeat',
			});
		}, 10);
	}

	// Initalize.
	_private.init = function () {
		_private.onLoad = param['onLoad'] || _private.onLoad;
		_private.onDestroy = param['onDestroy'] || _private.onDestroy;
		_private.external = param['external'] || {};

		// Create renderer debugger
		_private.rendererDebugger = Utils.createObject('RendererDebugger');
		_private.rendererDebugger.processRenderer(app.view);

		// Create internal debugger
		_private.networkDebugger = new NetworkDebugger();
		_private.eventDebugger = new EventDebugger();
		_private.statsDebugger = new StatsDebugger({ rendererDebugger: _private.rendererDebugger, callbacks: param['statsCallbacks'] });
		_private.sceneDebugger = new SceneDebugger({ rendererDebugger: _private.rendererDebugger, callbacks: param['sceneCallbacks'] });
		_private.cameraDebugger = new CameraDebugger({ app: app });
		_private.animationDebugger = new AnimationDebugger();
		_private.materialDebugger = new MaterialDebugger({ rendererDebugger: _private.rendererDebugger });
		_private.lightDebugger = new LightDebugger({ rendererDebugger: _private.rendererDebugger });
		_private.pickerDebugger = new PickerDebugger();
		_private.queryDebugger = new QueryDebugger({ getASelector: param['getASelector'] });  // 打印各类型的数量
		//_private.profileDebugger = new ProfileDebugger();

		// Create external debugger
		_private.externalDebugger = new ExternalDebugger();
		// Create debugger for node
		_private.nodeDebugger = new NodeDebugger({ rendererDebugger: _private.rendererDebugger, callbacks: param['objectCallbacks'] });
		// Create debugger for collecting envirment info
		_private.envInfoDebugger = new EnvInfoDebugger();
		// Create debugger for collecting posteffect info
		_private.postEffectDebugger = new PostEffectDebugger();

		// Initialize workers
		_private.initWorkers();

		// Notify create complete
		_private.onLoad();
	}

	// #endregion

	_private.rendererDebugger = null;
	_private.external = null;

	_private.onLoad = function () { };
	_private.onDestroy = function () { };

	_private.rootUI = null;
	_private.statsRootUI = null;
	_private.objectRootUI = null;

	// Internal debuggers
	_private.statsDebugger = null;
	_private.networkDebugger = null;
	_private.eventDebugger = null;
	_private.sceneDebugger = null;
	_private.cameraDebugger = null;
	_private.animationDebugger = null;
	_private.materialDebugger = null;
	_private.lightDebugger = null;
	_private.classDebugger = null;

	_private.externalDebugger = null;
	_private.nodeDebugger = null;
	_private.envInfoDebugger = null;
	_private.postEffectDebugger = null;

	_private.init();
}

class Debugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	openObjectPanel(object) {
		var _private = this[__.private];

		_private.nodeDebugger.attach(object);
	}

	openPanel(param) {
		var _private = this[__.private];

		if (param) {
			_private.createRootUI(param);
		}
		else {
			_private.openRootUI();
		}
	}

	closePanel() {
		var _private = this[__.private];

		_private.closeRootUI();
	}

	destroyPanel() {
		var _private = this[__.private];

		_private.destroyRootUI();
	}

	begin(deltaTime) {
		var _private = this[__.private];

		_private.statsDebugger.begin();

		_private.cameraDebugger.begin();
		_private.nodeDebugger.begin();

		_private.rendererDebugger.update(deltaTime);
	}

	end(deltaTime) {
		var _private = this[__.private];

		_private.statsDebugger.end();
	}

	getHierarchy(scene) {
		var _private = this[__.private];

		return _private.rendererDebugger.getHierarchy(scene);
	}

	beginProfile() {
		var _private = this[__.private];
		_private.statsDebugger.beginProfile();
		_private.envInfoDebugger.beginProfile();
		_private.postEffectDebugger.beginProfile();
	}
	endProfile() {
		var _private = this[__.private];
		_private.statsDebugger.endProfile();
		_private.envInfoDebugger.endProfile();
		_private.postEffectDebugger.endProfile();
	}
	getProfileInfo() {
		var _private = this[__.private];

		return {
			enviroment: _private.envInfoDebugger.getProfileInfo(),
			stats: _private.statsDebugger.getProfileInfo(),
			postEffect: _private.postEffectDebugger.getProfileInfo(),
		}
	}

}

export { Debugger }