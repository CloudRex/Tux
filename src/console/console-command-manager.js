export default class CommandManager {
	constructor() {
		this.commands = [];
	}

	/**
	 * @param {ConsoleCommand} command
	 */
	register(command) {
		this.commands.push(command);
	}

	/**
	 * @param {array<ConsoleCommand>} commands
	 */
	registerMultiple(commands) {
		for (let i = 0; i < commands.length; i++) {
			this.register(commands[i]);
		}
	}

	/**
	 * @param {string} commandBase
	 * @returns {boolean}
	 */
	isRegistered(commandBase) {
		return this.getByBase(commandBase) != null;
	}

	/**
	 * @param {string} commandBase
	 * @returns {(ConsoleCommand|null)}
	 */
	getByBase(commandBase) {
		for (let i = 0; i < this.commands.length; i++) {
			if (this.commands[i].base === commandBase || this.commands[i].aliases.includes(commandBase)) {
				return this.commands[i];
			}
		}

		return null;
	}
}
