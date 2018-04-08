import Log from "./log";

const fs = require("fs");

export default class UserConfig {
	/**
	 * @param {string} path
	 */
	constructor(path) {
		if (fs.existsSync(path)) {
			this.path = path;
			this.config = JSON.parse(fs.readFileSync(path).toString());
		}
		else {
			Log.error("Could not load user config: File does not exist");
		}
	}

	/**
	 * @param {string} key
	 * @param {*} value
	 */
	set(key, value) {
		this.config[key] = value;
		this.save();
	}

	/**
	 * @param {string} key
	 * @returns {*}
	 */
	get(key) {
		return this.config[key];
	}

	/**
	 * @param {string} key
	 */
	contains(key) {
		return this.config.hasOwnProperty(key);
	}

	save() {
		fs.writeFileSync(this.path, JSON.stringify(this.config, null, 4));
	}
}
