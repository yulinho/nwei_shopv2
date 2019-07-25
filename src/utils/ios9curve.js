import lerp from 'lerp';

export default class iOS9Curve {
	constructor(opt = {}) {
		this.ctrl = opt.ctrl;
		this.definition = opt.definition;

		this.GRAPH_X = 25;
		this.AMPLITUDE_FACTOR = 0.8;
		this.SPEED_FACTOR = 1;
		this.DEAD_PX = 2;
		this.ATT_FACTOR = 4;

		this.DESPAWN_FACTOR = 0.02;

		this.NOOFCURVES_RANGES = [2, 5];
		this.AMPLITUDE_RANGES = [0.3, 1];
		this.OFFSET_RANGES = [-3, 3];
		this.WIDTH_RANGES = [1, 3];
		this.SPEED_RANGES = [0.5, 1];
		this.DESPAWN_TIMEOUT_RANGES = [500, 2000];

		this._respawn();
	}

	_getRandomRange(e) {
		return e[0] + (Math.random() * (e[1] - e[0]));
	}

	_respawnSingle(ci) {
		this.phases[ci] = 0;
		this.amplitudes[ci] = 0;

		this.despawnTimeouts[ci] = this._getRandomRange(this.DESPAWN_TIMEOUT_RANGES);
		this.offsets[ci] = this._getRandomRange(this.OFFSET_RANGES);
		this.speeds[ci] = this._getRandomRange(this.SPEED_RANGES);
		this.finalAmplitudes[ci] = this._getRandomRange(this.AMPLITUDE_RANGES);
		this.widths[ci] = this._getRandomRange(this.WIDTH_RANGES);
		this.verses[ci] = this._getRandomRange([-1, 1]);
	}

	_respawn() {
		this.spawnAt = Date.now();

		this.noOfCurves = Math.floor(this._getRandomRange(this.NOOFCURVES_RANGES));

		this.phases = new Array(this.noOfCurves);
		this.offsets = new Array(this.noOfCurves);
		this.speeds = new Array(this.noOfCurves);
		this.finalAmplitudes = new Array(this.noOfCurves);
		this.widths = new Array(this.noOfCurves);
		this.amplitudes = new Array(this.noOfCurves);
		this.despawnTimeouts = new Array(this.noOfCurves);
		this.verses = new Array(this.noOfCurves);

		for (let ci = 0; ci < this.noOfCurves; ci++) {
			this._respawnSingle(ci);
		}
	}

	_globalAttFn(x) {
		return Math.pow(
			(this.ATT_FACTOR) / (this.ATT_FACTOR + Math.pow(x, 2)),
			this.ATT_FACTOR
		);
	}

	_sin(x, phase) {
		return Math.sin(x - phase);
	}

	_grad(x, a, b) {
		if (x > a && x < b) return 1;
		return 1;
	}

	_yRelativePos(i) {
		let y = 0;

		for (let ci = 0; ci < this.noOfCurves; ci++) {
			// Generate a static T so that each curve is distant from each oterh
			let t = 4 * (-1 + (ci / (this.noOfCurves - 1) * 2));
			// but add a dynamic offset
			t += this.offsets[ci];

			const k = 1 / this.widths[ci];
			const x = (i * k) - t;

			y += Math.abs(
				this.amplitudes[ci] *
				this._sin(this.verses[ci] * x, this.phases[ci]) *
				this._globalAttFn(x)
			);
		}

		// Divide for NoOfCurves so that y <= 1
		return (y / this.noOfCurves);
	}

	_ypos(i) {
		return (
			this.AMPLITUDE_FACTOR *
			this.ctrl.heightMax *
			this.ctrl.amplitude *
			this._yRelativePos(i) *
			this._globalAttFn(i / this.GRAPH_X * 2)
		);
	}

	_xpos(i) {
		return (this.ctrl.width) *
			((i + this.GRAPH_X) / (this.GRAPH_X * 2));
	}

	_drawSupportLine(context) {
		const coo = [0, this.ctrl.heightMax, this.ctrl.width, 1];
		// console.log(coo);
		// const gradient = context.createLinearGradient.apply(context, coo);
		const gradient = context.createLinearGradient(0, this.ctrl.heightMax, this.ctrl.width, 1);
		gradient.addColorStop(0, 'transparent');
		gradient.addColorStop(0.1, 'rgba(255,255,255,.5)');
		gradient.addColorStop(1 - 0.1 - 0.1, 'rgba(255,255,255,.5)');
		gradient.addColorStop(1, 'transparent');
		context.fillStyle = gradient;
		context.fillRect(0, this.ctrl.heightMax, this.ctrl.width, 1);
	}

	draw() {
		const context = this.ctrl.ctx;

		context.globalAlpha = 0.7;
		context.globalCompositeOperation = 'lighter';

		if (this.definition.supportLine) {
			// console.log(this.definition.supportLine);
			// Draw the support line
			return this._drawSupportLine(context);
		}

		for (let ci = 0; ci < this.noOfCurves; ci++) {
			if (this.spawnAt + this.despawnTimeouts[ci] <= Date.now()) {
				this.amplitudes[ci] -= this.DESPAWN_FACTOR;
			} else {
				this.amplitudes[ci] += this.DESPAWN_FACTOR;
			}

			this.amplitudes[ci] = Math.min(Math.max(this.amplitudes[ci], 0), this.finalAmplitudes[ci]);
			this.phases[ci] = (this.phases[ci] + this.ctrl.speed * this.speeds[ci] * this.SPEED_FACTOR) % (2 * Math.PI);
		}

		let maxY = -Infinity;
		let minX = +Infinity;

		// Write two opposite waves
		for (let sign of [1, -1]) {
			context.beginPath();

			for (let i = -this.GRAPH_X; i <= this.GRAPH_X; i += this.ctrl.opt.pixelDepth) {
				const x = this._xpos(i);
				const y = this._ypos(i);
				const the_y = this.ctrl.heightMax - sign * y
				// console.log(x, the_y);
				// console.log(this.ctrl.heightMax);
				// console.log(`###$the_y####`);
				// console.log(the_y);
				context.lineTo(x, the_y);

				minX = Math.min(minX, x);
				maxY = Math.max(maxY, y);
			}

			context.closePath();

			let fillStyle = 'rgba(' + this.definition.color + ', 1)';
			let strokeStyle = 'rgba(' + this.definition.color + ', 1)';
			// console.log(`###$fill####`);
			// console.log(context.setStrokeStyle);
			context.setFillStyle(fillStyle)
			// context.setStrokeStyle(strokeStyle)
			// context.stroke()
			context.fill()
			// console.log(context.fillStyle,context.strokeStyle);
			// context.fill();
		}
		    // context.draw()

		if (maxY < this.DEAD_PX && this.prevMaxY > maxY) {
			this._respawn();
		}

		this.prevMaxY = maxY;
	}

	static getDefinition() {
		return [{
				color: "255,255,255",
				supportLine: true
			},
			{
				// blue
				color: "15, 82, 169"
			},
			{
				// red
				color: "173, 57, 76"
			},
			{
				// green
				color: "48, 220, 155"
			}

		];
	}
}