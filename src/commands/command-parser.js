export default class CommandParser {
	/**
	 * @param {string} commandString
	 * @param {CommandManager} manager
	 * @param {string} trigger
	 * @returns {*}
	 */
	static parse(commandString, manager, trigger) {
		if (this.isValid(commandString, manager, trigger)) {
			return manager.getByBase(this.getCommandBase(commandString, trigger));
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
		const expression = / (```((?!```).)*```|"[^"]+"|'[^']+'|`[^`]+`|[^ ]+)/g;
		const argCleanExpression = /(```|`|'|"|)(.+)\1/;
		const result = [];

		let match = expression.exec(commandString);

		while (match != null) {
			result.push(argCleanExpression.exec(match[1])[2]);
			match = expression.exec(commandString);
		}

		return result;
	}

	// TODO: Also take in arg schema to avoid matching accidental args.
	/**
	 * @param {array<string>} args
	 * @param {object} types
	 * @param {object} resolvers
	 * @returns {array<string>} The resolved arguments
	 */
	static resolveArguments(args, types, resolvers) {
		const result = args;
		const typeKeys = Object.keys(types);

		for (let argIdx = 0; argIdx < result.length; argIdx++) {
			for (let typeIdx = 0; typeIdx < typeKeys.length; typeIdx++) {
				if (types[typeKeys[typeIdx]](args[argIdx])) {
					if (typeof resolvers[typeKeys[typeIdx]] === "function") {
						result[argIdx] = resolvers[typeKeys[typeIdx]](result[argIdx]);
					}
				}
			}
		}

		return result;
	}
}
