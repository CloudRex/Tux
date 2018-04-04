export default class CommandParser {
	/**
	 * @param {Command} command
	 * @param {CommandManager} manager
	 * @param {string} trigger
	 * @returns {*}
	 */
	static parse(command, manager, trigger) {
		if (this.isValid(command, manager, trigger)) {
			return manager.getByBase(this.getCommandBase(command, trigger));
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
			return manager.isRegistered(this.getCommandBase(commandString, trigger));
		}

		return false;
	}

	/**
	 * @param {string} commandString
	 * @param {string} trigger
	 * @returns {*}
	 */
	static getCommandBase(commandString, trigger) {
		const regexResult = new RegExp(`^${trigger}([a-zA-Z]+)`).exec(commandString);

		if (regexResult) {
			return regexResult[1];
		}

		return null;
	}

	/**
	 *
	 * @param {string} commandString
	 * @returns {array<string>}
	 */
	static getArguments(commandString) {
		const expression = / ("[^"]+"|[^ ]+)/g;
		const result = [];

		let match = expression.exec(commandString);

		while (match != null) {
			result.push(match[1].replace(/"/g, ""));
			match = expression.exec(commandString);
		}

		return result;
	}
}
