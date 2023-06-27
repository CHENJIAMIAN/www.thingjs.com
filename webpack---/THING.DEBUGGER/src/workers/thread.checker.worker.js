var ThreadCheckerWorker = function () {
	function getCurrentTime() {
		return (typeof performance === 'undefined' ? Date : performance).now();
	}

	var time = getCurrentTime();
	var interval = 3000;

	// Hook tick event to check whethter main thread had been blocked
	setInterval(function () {
		if (time == 0) {
			return;
		}

		var elapsedTime = getCurrentTime() - time;
		if (elapsedTime > interval) {
			console.error('!Please press F8 to halt the main thread, it seems had been blocked!');

			postMessage({
				type: 'heartbreak'
			});

			time = 0;
		}
	}, 10);

	onmessage = function (ev) {
		var data = ev.data;
		var type = data.type;

		switch (type) {
			case 'setInterval':
				interval = data.value;
				break;

			case 'heartbeat':
				time = getCurrentTime();
				break;

			default:
				break;
		}
	}
}

export { ThreadCheckerWorker }