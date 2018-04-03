import AccessLevelType from "../core/access-level-type";

const fs = require("fs");

export default class CommandManager {
	/**
	 * @param {string} accessLevelsPath
	 */
	constructor(accessLevelsPath) {
		this.commands = [];
		this.accessLevels = [];

		fs.readFile(accessLevelsPath, (error, data) => {
			this.accessLevels = JSON.parse(data.toString());
		});
	}

	/**
	 * @param {Command} command
	 */
	register(command) {
		this.commands.push(command);
	}

	/**
	 * @param {array<Command>} commands
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
	 * @returns {(Command|null)}
	 */
	getByBase(commandBase) {
		for (let i = 0; i < this.commands.length; i++) {
			if (this.commands[i].base === commandBase || this.commands[i].aliases.includes(commandBase)) {
				return this.commands[i];
			}
		}

		return null;
	}

	/**
	 * @param {string} role
	 * @returns {AccessLevelType}
	 */
	getAccessLevel(role) {
		const keys = Object.keys(this.accessLevels);

		for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			for (let roleIndex = 0; roleIndex < this.accessLevels[keys[keyIndex]].length; roleIndex++) {
				if (this.accessLevels[keys[keyIndex]][roleIndex] === role) {
					return AccessLevelType.fromString(keys[keyIndex]);
				}
			}
		}

		return null;
	}

	// TODO: Move to the corresponding file/class
	/**
	 * @param {*} message
	 * @param {string} role
	 * @returns {*}
	 */
	hasRole(message, role) {
		console.log(message.member.roles.array());

		return message.member.roles.find("name", role);
	}

	/**
	 * @param {*} message
	 * @param {array<string>} roles
	 * @returns {boolean}
	 */
	hasRoles(message, roles) {
		for (let i = 0; i < roles.length; i++) {
			if (!this.hasRole(message, roles[i])) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @param {array<string>} roles
	 * @returns {AccessLevelType}
	 */
	getHighestAccessLevel(roles) {
		let highest = AccessLevelType.Guest;

		for (let i = 0; i < roles.length; i++) {
			const accessLevel = this.getAccessLevel(roles[i]);

			if (accessLevel > highest) {
				highest = accessLevel;
			}
		}

		return highest;
	}

	/**
	 * @param {*} message
	 * @param {AccessLevelType} accessLevel
	 * @returns {boolean}
	 */
	hasAuthority(message, accessLevel) {
		return this.getHighestAccessLevel(message.member.roles.array().map((role) => role.name)) >= accessLevel;
	}

	/**
	 * @param {CommandExecutionContext} context
	 * @param {Command} command
	 * @returns {Promise<boolean>}
	 */
	async handle(context, command) {
		if (!context.message.member) {
			context.message.channel.send("You can't use that command here. Sorry!");

			return false;
		}
		else if (command.canExecute(context) && context.arguments.length <= command.maxArguments && this.hasAuthority(context.message, command.accessLevel)) {
			command.executed(context);

			return true;
		}

		const minAuthority = AccessLevelType.toString(command.accessLevel);
		const message = await context.respond(`You don't have the authority to use that command. You must be at least a(n) ${minAuthority}.`);

		if (message !== null) {
			message.message.delete(4000);
		}

		return false;
	}
}
