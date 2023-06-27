import { Utils } from '../common/Utils';

const __ = {
	private: Symbol('private'),
}

function _buildConnectionInfo(connection) {
	var info = {
		time: connection.elapsedTime.toFixed(2) + ' ms',
		downloadSpeed: Utils.formatByteSize(connection.totalSize / connection.elapsedTime) + '/s',
		size: Utils.formatByteSize(connection.totalSize),
		url: connection.responseURL,
		mode: Utils.parseValue(connection.mode, 'unknown'),
		totalSize: connection.totalSize,
	};

	if (connection.width && connection.height) {
		info.resolution = `${connection.width}x${connection.height}`;
	}

	return info;
}

function _initPrivateMembers(that, param) {
	that[__.private] = {};
	var _private = that[__.private];
	var app = Utils.getCurrentApp();

	// #region Private Functions

	// Get connections.
	_private.getConnections = function () {
		var sortType = _private.options.sortType;
		var networkDebugger = _private.networkDebugger;

		function _connectionSort(a, b) {
			if (sortType == 'Size') {
				return b.totalSize - a.totalSize;
			}
			else if (sortType == 'Time') {
				return b.elapsedTime - a.elapsedTime;
			}
			else if (sortType == 'Resolution') {
				return b.resolution - a.resolution;
			}
			else if (sortType == 'Order') {
				return a.id - b.id;
			}
		}

		// Get pending connections
		var pendingConnections = [];
		networkDebugger.pendingConnections.forEach(connection => {
			var info = _buildConnectionInfo(connection);
			if (!info) {
				return;
			}

			pendingConnections.push(info);
		});

		// Downloading-Connections
		var downloadingConnections = [];
		networkDebugger.downloadingConnections.sort(_connectionSort).forEach(connection => {
			var info = _buildConnectionInfo(connection);
			if (!info) {
				return;
			}

			downloadingConnections.push(info);
		});

		// Finished-Connections
		var finishedConnections = [];
		networkDebugger.finishedConnections.sort(_connectionSort).forEach(connection => {
			var info = _buildConnectionInfo(connection);
			if (!info) {
				return;
			}

			finishedConnections.push(info);
		});

		return {
			pendingConnections,
			downloadingConnections,
			finishedConnections,
			duplicatedConnections: networkDebugger.duplicatedConnections
		};
	}

	// Create folder.
	_private.createFolder = function (options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		// The options
		var options = {
			sortType: 'Size',
			dump: function () {
				var { pendingConnections, downloadingConnections, finishedConnections, duplicatedConnections } = _private.getConnections();

				console.log(`pendingConnections:\n`, pendingConnections);
				console.log(`downloadingConnections:\n`, downloadingConnections);

				// Finished-Connections
				var totalSize = 0;
				finishedConnections.forEach(connection => {
					totalSize += connection.totalSize;
				});

				var formatTotalSize = Utils.formatByteSize(totalSize);
				console.log(`finished(${formatTotalSize})\n`, finishedConnections);

				console.log(`duplicatedConnections:\n`, duplicatedConnections);
			}
		};

		rootUI.add(options, 'dump');
		rootUI.add(options, 'sortType', ['Size', 'Time', 'Resolution', 'Order']);

		// Save options
		_private.options = options;
	}

	// Initalize.
	_private.init = function () {
		_private.networkDebugger = Utils.createObject('NetworkDebugger');
	}

	// #endregion

	_private.options = {};
	_private.networkDebugger = null;

	_private.init();
}

class NetworkDebugger {

	constructor(param = {}) {
		// Initialize private members
		_initPrivateMembers(this, param);
	}

	createFolder(param) {
		var _private = this[__.private];

		_private.createFolder(param);
	}

}

export { NetworkDebugger }