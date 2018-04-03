export default class CommandParser {
	/**
	 * @param {Command} command
	 * @param {CommandManager} manager
	 * @param {string} trigger
	 * @returns {*}
	 */
	static parse(command, manager, trigger) {
		if (this.isValid(command, manager, trigger)) {
			return manager.getByBase(this.getCommandBase(command));
		}

		return null;
	}

	/**
	 * @param {string} commandString
	 * @param {CommandManager} manager
	 * @param {string} trigger
	 * @returns {boolean}
	 */
	static isValid(commandString, manager, trigger) {
		if (commandString.startsWith(trigger)) {
			return manager.isRegistered(this.getCommandBase(commandString));
		}

		return false;
	}

	/**
	 * @param {string} commandString
	 * @returns {*}
	 */
	static getCommandBase(commandString) {
		// TODO: Include actual command trigger instead of placeholder dummy "."
		return /^\.([a-zA-Z]+)/g.exec(commandString)[1];
	}

	/**
	 *
	 * @param {string} commandString
	 * @returns {array<string>}
	 */
	static getArguments(commandString) {
		const expression = / ([^ ]+|"[^"]+")/g;
		const result = [];

		let match = expression.exec(commandString);

		while (match != null) {
			result.push(match[1]);
			match = expression.exec(commandString);
		}

		return result;
	}
}
