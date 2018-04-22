import Log from "./log";

const fs = require("fs");
const _ = require("lodash");

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
	 * @param {string} path
	 * @param {*} value
	 */
	set(path, value) {
		_.set(this.config, path, value);
		this.save();
	}

	/**
	 * @param {Snowflake} guildId
	 * @param {string} path
	 * @param {*} value
	 */
	setLocal(guildId, path, value) {
		this.set(`${guildId}.${path}`, value);
	}

	pushLocal(guildId, path, item) {
		const updated = this.getLocal(guildId, path);

		updated.push(item);
		this.setLocal(guildId, path, updated);
	}

	/**
	 * @param {string} path
	 * @returns {*}
	 */
	get(path) {
		return _.get(this.config, path);
	}

	/**
	 * @param {Snowflake} guildId
	 * @param {string} path
	 * @returns {*}
	 */
	getLocal(guildId, path) {
		return this.get(`${guildId}.${path}`);
	}

	/**
	 * @param {string} path
	 * @returns {boolean}
	 */
	contains(path) {
		return _.has(this.config, path);
	}

	/**
	 *
	 * @param {Snowflake} guildId
	 * @param {string} path
	 * @returns {boolean}
	 */
	containsLocal(guildId, path) {
		return this.contains(`${guildId}.${path}`);
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
