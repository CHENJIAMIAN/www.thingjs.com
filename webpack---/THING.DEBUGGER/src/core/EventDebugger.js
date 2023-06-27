import { Utils } from '../common/Utils';
import { DebuggerUtils } from './DebuggerUtils';

const __ = {
	private: Symbol('private'),
}

var _id = 1;
var _hookerKey = '___hooker___';

// Sort listeners.
function _sortListeners(a, b) {
	var hooker1 = a[_hookerKey];
	var hooker2 = b[_hookerKey];

	if (hooker1.elapsedTime !== hooker2.elapsedTime) {
		return hooker2.elapsedTime - hooker1.elapsedTime;
	}

	return hooker1.id - hooker2.id;
}

// Collect listeners.
var _collectListeners = function (listeners) {
	// Get the listeners by type
	var listenersByTypes = new Map();
	listeners.forEach(listener => {
		var hooker = listener[_hookerKey];
		if (!hooker) {
			return;
		}

		if (!hooker.elapsedTime) {
			return;
		}

		var _listeners = listenersByTypes.get(listener.type);
		if (_listeners) {
			_listeners.push(listener);
		}
		else {
			listenersByTypes.set(listener.type, [listener]);
		}
	});

	listenersByTypes.forEach((listeners) => {
		listeners.sort(_sortListeners);
	});

	return listenersByTypes;
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	var app = Utils.getCurrentApp();

	// #region Private Functions

	// Get listeners.
	_private.getListeners = function () {
		var activeListeners = [];
		var pausedListeners = [];
		app.eventManager.traverseListener(listener => {
			if (listener.paused) {
				pausedListeners.push(listener);
			}
			else {
				activeListeners.push(listener);
			}
		});

		return { activeListeners, pausedListeners };
	}

	// Start to profile.
	_private.startProfile = function () {
		var profileInfo = _private.profileInfo;

		// Save the current frame count to prevent the debug elapsed time affects elapsed time
		profileInfo.currentFrameCount = app.timer.currentFrameCount;
		profileInfo.profiling = true;
		profileInfo.totalTime = 0; // in seconds
	}

	// End to profile.
	_private.endProfile = function () {
		var profileInfo = _private.profileInfo;

		// Stop profile
		profileInfo.profiling = false;

		// Check total time
		if (!profileInfo.totalTime) {
			return;
		}

		// Get the elapsed frame number
		var elapsedFrameCount = Math.max(1, app.timer.currentFrameCount - profileInfo.currentFrameCount);

		// Get the listeners by type
		var listenersByTypes = _collectListeners(profileInfo.listeners);

		// Output listeners
		listenersByTypes.forEach(listeners => {
			listeners.forEach(listener => {
				var hooker = listener[_hookerKey];
				var elapsedTime = hooker.elapsedTime;

				var percentage = ((elapsedTime / profileInfo.totalTime) * 100).toFixed(2) + '%';
				var elapseTimeMS = (elapsedTime / elapsedFrameCount).toFixed(2) + ' ms';
				console.log(`${percentage}|${elapseTimeMS}`, listener);

				hooker.elapsedTime = 0;
			});
		});
	}

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		// The options
		var options = {
			dump: function () {
				var { activeListeners, pausedListeners } = _private.getListeners();

				console.log(`activeListeners:\n`, activeListeners);
				console.log(`pausedListeners:\n`, pausedListeners);
			},
			profile: function () {
				return {
					'profile': function () {
						_private.startProfile();
					},
					'profiling...': function () {
						_private.endProfile();
					},
				}
			},
		};

		rootUI.add(options, 'dump');
		DebuggerUtils.createValueElement(rootUI, options, 'profile');
	}

	// Initalize.
	_private.init = function () {
		var profileInfo = _private.profileInfo;

		// When remove event function
		THING.Utils.onRemoveCallEventListener = function (listener, ev) {
			var index = profileInfo.listeners.indexOf(listener);
			if (index === -1) {
				return;
			}

			profileInfo.listeners.removeAt(index);
		}

		// When before calling event function
		THING.Utils.onBeforeCallEventListener = function (listener, ev) {
			// Create listener hooker when it's not existing
			var hooker = listener[_hookerKey];
			if (!hooker) {
				listener[_hookerKey] = {
					startTime: 0,
					elapsedTime: 0,
					id: _id++,
				};

				profileInfo.listeners.push(listener);

				hooker = listener[_hookerKey];
			}

			// Record trigger start time
			if (profileInfo.profiling) {
				hooker.startTime = Utils.getCurrentTime();
			}
		}

		// When after calling event function
		THING.Utils.onAfterCallEventListener = function (listener, ev) {
			var hooker = listener[_hookerKey];
			if (!hooker) {
				return;
			}

			if (profileInfo.profiling) {
				var elapsedTime = Utils.getCurrentTime() - hooker.startTime;
				if (elapsedTime) {
					// Update total trigger elapsed time
					profileInfo.totalTime += elapsedTime;

					// Update trigger elapsed time
					hooker.elapsedTime += elapsedTime;
				}
			}
		}
	}

	// #endregion

	_private.profileInfo = {
		currentFrameCount: 0,
		profiling: 0,
		totalTime: 0,
		listeners: [],
	};

	_private.init();
}

class EventDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

}

export { EventDebugger }