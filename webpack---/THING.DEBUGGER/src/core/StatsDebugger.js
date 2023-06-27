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

	// Initalize.
	_private.init = function () {
		_private.rendererDebugger = param['rendererDebugger'];
		_private.callbacks = param['callbacks'] || _private.callbacks;
	}

	// Add value plotter.
	_private.addValuePlotter = function (group, counts, label, maxValue, height = 20, lineWidth = 2, lineColor = [44, 123, 230]) {
		var count = counts[label];

		Object.defineProperty(count, "percentage", {
			get: function () {
				if (this.value >= maxValue) {
					return 1;
				}
				else {
					return this.value / maxValue;
				}
			},
		});

		group.addNumberOutput(count, 'value', { label });
		var item = group.addValuePlotter(count, 'percentage', { lineColor, lineWidth, height, label: '...' });

		var components = item._groups[0]._components;
		var path = components[components.length - 1]._path;
		var lastValue = -1;
		count.onValueChange = function (value) {
			if (lastValue != value) {
				if (value >= maxValue * 0.8) {
					path.style.stroke = 'red';
				}
				else if (value >= maxValue * 0.5) {
					path.style.stroke = 'yellow';
				}
				else {
					path.style.stroke = 'rgb(' + lineColor[0] + ',' + lineColor[1] + ',' + lineColor[2] + ')';
				}
			}

			lastValue = value;
		}

		return item;
	}

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		var statsRootUI = options['statsRootUI'];
		if (!rootUI || !statsRootUI) {
			return;
		}

		var rendererDebugger = _private.rendererDebugger;
		var profileName = '';

		// The stats options
		var options = {
			fps: false,
			cpu: false,
			mem: false,
			stats: false,
			api: false,
			maxFPS: 0,
			profile: function () {
				return {
					'profile': function () {
						profileName = 'profile_' + new Date().toLocaleTimeString();
						console.profile(profileName);
					},
					'profiling...': function () {
						console.profileEnd(profileName);
					}
				}
			},
		};

		// FPS
		rootUI.add(options, 'fps').onChange(value => {
			if (value) {
				_private.fpsStats = Utils.createObject('Stats');
				var domElement = _private.fpsStats.domElement;
				domElement.style.position = 'absolute';
				domElement.style.left = '0px';
				domElement.style.top = '0px';
				domElement.style.zIndex = 10000;
				document.body.appendChild(domElement);
			}
			else if (_private.fpsStats) {
				document.body.removeChild(_private.fpsStats.domElement);
				_private.fpsStats = null;
			}
		});

		// CPU
		rootUI.add(options, 'cpu').onChange(value => {
			if (value) {
				_private.cpuStats = Utils.createObject('CPUStats');
				var domElement = _private.cpuStats.domElement;
				domElement.style.position = 'absolute';
				domElement.style.left = '80px';
				domElement.style.top = '0px';
				domElement.style.zIndex = 10000;
				document.body.appendChild(domElement);
			}
			else if (_private.cpuStats) {
				document.body.removeChild(_private.cpuStats.domElement);
				_private.cpuStats = null;
			}
		});

		// MEM
		rootUI.add(options, 'mem').onChange(value => {
			if (value) {
				_private.memStats = Utils.createObject('MemoryStats');
				var domElement = _private.memStats.domElement;
				domElement.style.position = 'absolute';
				domElement.style.left = '0px';
				domElement.style.top = '48px';
				domElement.style.zIndex = 10000;
				document.body.appendChild(domElement);
			}
			else if (_private.memStats) {
				document.body.removeChild(_private.memStats.domElement);
				_private.memStats = null;
			}
		});

		// Render-Stats
		rootUI.add(options, 'stats').onChange(value => {
			if (value) {
				_private.rendererStats = Utils.createObject('RendererStats');
				var domElement = _private.rendererStats.getContainer();
				domElement.style.position = 'absolute';
				domElement.style.left = '0px';
				domElement.style.bottom = '0px';
				domElement.style.zIndex = 10000;
				document.body.appendChild(domElement);
			}
			else if (_private.rendererStats) {
				document.body.removeChild(_private.rendererStats.getContainer());
				_private.rendererStats = null;
			}
		});

		// Render-API
		rootUI.add(options, 'api').onChange(value => {
			if (value) {
				// Enable collecting stats
				rendererDebugger.statsOptions = { enable: true };

				// Create or show stats debugger monitor
				if (statsRootUI) {
					var statsOptions = rendererDebugger.statsOptions;
					var counts = statsOptions.counts;

					statsRootUI.enable();

					if (!statsRootUI._groups.length) {
						var bindGroup = statsRootUI.addSubGroup({ label: 'Bind', height: 220 });
						if (bindGroup) {
							_private.addValuePlotter(bindGroup, counts, 'bindBuffer', 60);
							_private.addValuePlotter(bindGroup, counts, 'bindTexture', 60);
							_private.addValuePlotter(bindGroup, counts, 'bindFrameBuffer', 8);
						}

						var IOGroup = statsRootUI.addSubGroup({ label: 'IO', height: 220 });
						if (IOGroup) {
							_private.addValuePlotter(IOGroup, counts, 'texImage2D', 3);
							_private.addValuePlotter(IOGroup, counts, 'readPixels', 3);
						}

						var shaderGroup = statsRootUI.addSubGroup({ label: 'Shader', height: 220 });
						if (shaderGroup) {
							_private.addValuePlotter(shaderGroup, counts, 'linkProgram', 1);
							_private.addValuePlotter(shaderGroup, counts, 'uniforms', 100);
						}
					}
				}
			}
			else {
				// Disable collecting stats
				rendererDebugger.statsOptions = { enable: false };

				// Hide stats debugger monitor
				if (statsRootUI) {
					statsRootUI.disable();
				}
			}
		});

		// FPS limit
		rootUI.add(options, 'maxFPS').min(0).max(60).step(1).onChange(value => {
			_private.callbacks['onMaxFPS'](value);
		});

		// Profile
		DebuggerUtils.createValueElement(rootUI, options, 'profile');
	}

	// #endregion

	_private.fpsStats = null;
	_private.memStats = null;
	_private.cpuStats = null;
	_private.rendererStats = null;

	_private.rendererDebugger = null;

	_private.callbacks = {
		'onMaxFPS': function () { },
	};

	_private.fpsInfo = null;
	_private.cpuInfo = null;
	_private.memoryInfo = null;
	_private.renderInfo = null;

	_private.init();
}

class StatsDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

	begin() {
		var _private = this[__.private];

		var fpsStats = _private.fpsStats;
		if (fpsStats) {
			fpsStats.begin();
		}

		var memStats = _private.memStats;
		if (memStats) {
			memStats.update();
		}

		var cpuStats = _private.cpuStats;
		if (cpuStats) {
			cpuStats.begin();
		}

		_private.rendererDebugger.statsOptions.clear();
	}

	end(deltaTime) {
		var _private = this[__.private];

		var fpsStats = _private.fpsStats;
		if (fpsStats) {
			fpsStats.end();
		}

		var cpuStats = _private.cpuStats;
		if (cpuStats) {
			cpuStats.end();
			cpuStats.nextFrame();
		}

		var rendererStats = _private.rendererStats;
		if (rendererStats) {
			rendererStats.update(deltaTime);
		}

		_private.rendererDebugger.statsOptions.notifyValueChange();
	}

	beginProfile() {
		var _private = this[__.private];
		_private.fpsStats = Utils.createObject('Stats');
		_private.fpsInfo = {};		
		

		_private.cpuStats = Utils.createObject('CPUStats');
		_private.cpuInfo = {};

		_private.memStats = Utils.createObject('MemoryStats');
		_private.memoryInfo = {};

		_private.rendererStats = Utils.createObject('RendererStats');
		_private.renderInfo = {};
	}
	endProfile() {
		var _private = this[__.private];

		if(_private.fpsStats){
			_private.fpsInfo = {
				fps: _private.fpsStats.fps.value,
			};
			_private.fpsStats.dom.hidden = false;
			_private.fpsStats = null;
		}
		if(_private.cpuStats){
			_private.cpuInfo = _private.cpuStats.getInfo();
			_private.cpuStats = null;
		}
		if(_private.memStats){
			_private.memoryInfo = _private.memStats.getInfo();
			_private.memStats = null;
		}
		if(_private.rendererStats){
			_private.renderInfo = _private.rendererStats.getInfo();
			_private.rendererStats = null;
		}
	}
	getProfileInfo() {
		var _private = this[__.private];

		return {
			fps: _private.fpsInfo,
			cpu: _private.cpuInfo,
			memory: _private.memoryInfo,
			render: _private.renderInfo
		}
	}
}

export { StatsDebugger }