function formatMoney(value, fixedNumber = 0) {
	return value.toFixed(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatByteSize(value, fixedNumber = 2) {
	if (value > 1000 * 1000 * 1000 * 1000) {
		return formatMoney(value / (1000 * 1000 * 1000 * 1000), fixedNumber) + " T";
	}
	else if (value > 1000 * 1000 * 1000) {
		return formatMoney(value / (1000 * 1000 * 1000), fixedNumber) + " G";
	}
	else if (value > 1000 * 1000) {
		return formatMoney(value / (1000 * 1000), fixedNumber) + " M";
	}
	else if (value > 1000) {
		return formatMoney(value / (1000), fixedNumber) + " K";
	}
	else {
		return value;
	}
}

let RendererStats = function () {
	let data = {
		geometries: 0,
		textures: 0,
		textureSize: 0,
		drawcalls: 0,
		points: 0,
		lines: 0,
		triangles: 0,
		buffers: 0,
		bufferSize: 0
	}
	let container = document.createElement('div');
	container.style.cssText = 'width:150px;opacity:0.9;cursor:pointer';

	let div = document.createElement('div');
	div.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:gray;';
	container.appendChild(div);

	let texts = [];
	let lines = 7;
	for (let i = 0; i < lines; i++) {
		texts[i] = document.createElement('div');
		texts[i].style.cssText = 'color:white;background-color:gray;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:bold;line-height:15px';
		div.appendChild(texts[i]);
		texts[i].innerHTML = '-';
	}



	let lastTime = 0;
	let interval = 30 / 1000; // Refresh only 30 times per second
	let getGeometries = function () {
		let ret = new Map();
		let app = THING.Utils.getCurrentApp();
		let scene = app.scene.root.$node;
		scene.traverseBranch(node => {
			if (!node.visible) {
				return;
			}
			if (!node.isMesh) {
				return;
			}
			let geometry = node.geometry;
			if (!ret.has(geometry)) {
				ret.set(geometry, 1);
			}
			else {
				ret[geometry]++;
			}
		});
		return ret;
	}
	let doUpdate = function () {
		let renderer = THING.App.current.view.$renderer;
		let info = renderer.info;
		let external = renderer.external;
		if (!info || !external) {
			return;
		}

		let render = info.render;
		doUpdateData(render, external);
		doUpdateUI(render, external);
		info.reset();
	}
	let doUpdateData = function (render, external) {
		data.geometries = getGeometries().size;

		let byteLengths = external.byteLengths;
		data.textures = external.textures;
		data.textureSize = byteLengths['textures'];
		data.buffers = external.buffers;
		data.bufferSize = byteLengths['buffers'];

		data.drawcalls = render.calls;
		data.triangles = render.triangles;
		data.points = render.points;
		data.lines = render.lines;
	}
	let doUpdateUI = function (render, external) {
		let i = 0;
		let geometries = getGeometries();
		texts[i++].textContent = "Geometries: " + geometries.size;

		let byteLengths = external.byteLengths;
		let texturesByteLength = formatByteSize(byteLengths['textures']);
		texts[i++].textContent = `Textures: ${external.textures} (${texturesByteLength})`;
		let buffersByteLength = formatByteSize(byteLengths['buffers']);
		texts[i++].textContent = `Buffers: ${external.buffers} (${buffersByteLength})`;

		texts[i++].textContent = "Calls: " + render.calls;
		texts[i++].textContent = "Triangles: " + render.triangles;
		texts[i++].textContent = "Points: " + render.points;
		texts[i++].textContent = "Lines: " + render.lines;
	}

	return {
		domElement: container,

		getContainer: function () {
			return container;
		},

		update: function (deltaTime) {
			lastTime += deltaTime;
			if (lastTime < interval) {
				return;
			}
			lastTime -= deltaTime;

			doUpdate();
		},

		getInfo() {
			return {
				geometries: data.geometries,
				textures: data.textures,
				textureSize: data.textureSize,
				drawcalls: data.drawcalls,
				points: data.points,
				lines: data.lines,
				triangles: data.triangles,
				buffers: data.buffers,
				bufferSize: data.bufferSize
			}
		}
	}
};

export { RendererStats };