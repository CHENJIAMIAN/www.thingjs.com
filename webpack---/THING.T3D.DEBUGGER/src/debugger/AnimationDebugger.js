import { Utils } from '../common/Utils.js';

class AnimationDebugger {

	constructor() {
		this.info = this.buildInfo();
	}

	buildInfo() {
		var info = {
			enable: false,
			interval: 1,
			elapsedTime: 0,
			initElapsedTime: false,
		};

		return info;
	}

	/**
	 * Get/Set options.
	 * @type {Object}
	 */
	get options() {
		var info = this.info;

		return {
			enable: info.enable,
			interval: info.interval,
		};
	}
	set options(value) {
		var info = this.info;

		var enable = Utils.parseValue(value['enable'], info.enable);
		var interval = Utils.parseValue(value['interval'], info.interval);

		info.enable = enable;
		info.interval = interval;
		info.elapsedTime = 0;
		info.initElapsedTime = false;
	}

}

export { AnimationDebugger }