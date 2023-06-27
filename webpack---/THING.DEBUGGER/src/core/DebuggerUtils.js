import { Utils } from '../common/Utils';

export var DebuggerUtils = {
	// Create the value element.
	createValueElement: function (rootUI, object, key) {
		// Check key type
		if (!Utils.isString(key)) {
			return;
		}

		// Check whether it's private member
		if (key[0] == '_') {
			return;
		}

		// Get the value
		var valueFunction = object[key];
		var value = valueFunction();
		if (!value) {
			return;
		}

		// Get group keys
		var groupKeys = Object.keys(value);

		// It's property
		if (groupKeys.indexOf('object') !== -1) {
			var valueKey = value.key || key;

			// Listen for property
			var listenObject = {};
			Object.defineProperty(listenObject, key, {
				get() {
					return value.object[valueKey];
				},
				set(v) {
					value.object[valueKey] = v;

					var onTrigger = value.onTrigger;
					if (onTrigger) {
						onTrigger(v);
					}
				}
			});

			// Add element
			var element = rootUI.add(listenObject, key, value.list);
			if (value.listen) {
				element.listen();
			}
		}
		// It's function
		else if (groupKeys.length == 1 && Utils.isFunction(value[groupKeys[0]])) {
			var func = value[groupKeys[0]];
			var funcBinder = {};
			funcBinder[key] = func;
			rootUI.add(funcBinder, key);
		}
		// It's group
		else {
			// Build group element
			var buttonElement;
			var groupObject = { index: 0 };
			groupObject[key] = function () {
				var objectKey = groupKeys[groupObject.index];

				var onTrigger = value[objectKey];
				onTrigger();

				groupObject.index++;
				groupObject.index %= groupKeys.length;

				buttonElement.name(groupKeys[groupObject.index]);
			}

			buttonElement = rootUI.add(groupObject, key);
		}
	}
};