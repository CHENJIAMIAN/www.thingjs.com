import { Utils } from '../common/Utils';

class QueryDebugger {

	constructor(param = {}) {
		this.getASelector = param['getASelector']
	}

	// Create folder.
	createFolder(options) {
		var rootUI = options['rootUI'];
		if (!rootUI) {
			return;
		}

		let app = Utils.getCurrentApp();

		let that = this


		// The options
		var options = {
			all: function () {
				let objects = app.query('*')

				dealWithData(objects)

				function dealWithData(data) {
					let map = new Map()


					// collect
					data.forEach(element => {
						if (!map.has(element.type)) {
							let selector = that.getASelector();
							selector.push(element)
							map.set(element.type, selector)
						}
						else {
							map.get(element.type).push(element)
						}
					});

					// sort
					let array = Array.from(map)
					array.sort(function (a, b) { return b[1].length - a[1].length })

					// array => map
					let result = new Map(array.map(i => [i[0], i[1]]))

					// array => object
					// let result = {}
					// array.map((i, idx) => result[`${idx}_${i[0]}`] = i[1])

					console.log(result)

					return result
				}
			}
		};

		rootUI.add(options, 'all')
	}

}

export { QueryDebugger }