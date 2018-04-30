import Log from '../core/log';

const parseArgs = require("minimist");

export default class ConsoleCommand {
	/**
	 * @param {string} base
	 * @param {object} args
	 */
	constructor(base, args) {
		this.base = base;
		this.args = args;
	}

	// TODO
	/**
	 * @param {string} consoleCommandString
	 * @returns {ConsoleCommand}
	 */
	static parse(consoleCommandString) {
		const split = consoleCommandString.split(" ");

		Log.info(split.join(" "));

		return new ConsoleCommand(split[0], parseArgs(split.splice(1, 0).join(" ")));
	}
}
