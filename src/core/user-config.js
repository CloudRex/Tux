import Log from "./log";
import Utils from "./utils";

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

	/**
	 * @param {string} stack
	 * @returns {*}
	 */
	getByStack(stack) {
		return Utils.accessArrayByStack(stack, this.config);
	}

	/**
	 * @param {Snowflake} id
	 * @param {string} template
	 */
	createGuild(id, template = "default") {
		this.set(id, this.get(template));
		this.save();
	}

	/**
	 * @param {Snowflake} id
	 */
	removeGuild(id) {
		delete this.config[id];
		this.save();
	}

	save() {
		fs.writeFileSync(this.path, JSON.stringify(this.config, null, 4));
	}
}
