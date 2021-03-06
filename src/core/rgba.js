import RGB from "./rgb";
import Utils from "./utils";

export default class RGBA extends RGB {
	/**
	 * @param {number} red
	 * @param {number} green
	 * @param {number} blue
	 * @param {number} alpha
	 */
	constructor(red, green, blue, alpha) {
		super(red, green, blue);

		this.alpha = alpha;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return `${this.red}, ${this.green}, ${this.blue}, ${this.alpha}`;
	}

	/**
	 * @returns {object}
	 */
	toObject() {
		return {
			red: this.red,
			green: this.green,
			blue: this.blue,
			alpha: this.alpha
		};
	}

	/**
	 * @param {string} hex
	 * @returns {(RGBA|null)}
	 */
	static fromHex(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		// TODO: Also get the Alpha value (instead of being hardcoded).
		return result ? new RGBA(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255) : null;
	}

	// TODO: Support for shorthand hex:
	/* function hexToRgb(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	} */
}
