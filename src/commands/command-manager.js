import AccessLevelType from "../core/access-level-type";
import CommandArgumentParser from "./command-argument-parser";

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
	getAccessLevelByRole(role) {
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

	/**
	 * @param {Snowflake} userId
	 * @returns {AccessLevelType}
	 */
	getAccessLevelById(userId) {
		const keys = Object.keys(this.accessLevels);

		for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			// TODO: Use index of instead of looping
			for (let roleIndex = 0; roleIndex < this.accessLevels[keys[keyIndex]].length; roleIndex++) {
				const value = this.accessLevels[keys[keyIndex]][roleIndex];

				if (!Number.isNaN(value) && value === userId.toString()) {
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
	getHighestAccessLevelByRoles(roles) {
		let highest = AccessLevelType.Guest;

		for (let i = 0; i < roles.length; i++) {
			const accessLevel = this.getAccessLevelByRole(roles[i]);

			if (accessLevel > highest) {
				highest = accessLevel;
			}
		}

		return highest;
	}

	/**
	 * @param {Message} message
	 * @param {AccessLevelType} accessLevel
	 * @returns {boolean}
	 */
	hasAuthority(message, accessLevel) {
		return this.getAuthority(message.member.roles.array().map((role) => role.name), message.author.id) >= accessLevel;

		// TODO: Replaced by getAuthority() method
		// return (this.getHighestAccessLevelByRoles(message.member.roles.array().map((role) => role.name)) >= accessLevel) || (this.getAccessLevelById(message.author.id) >= accessLevel);
	}

	/**
	 * @returns {AccessLevelType}
	 */
	getAuthority(roles, userId) {
		const byRoles = this.getHighestAccessLevelByRoles(roles);
		const byId = this.getAccessLevelById(userId);

		if (byRoles > byId) {
			return byRoles;
		}

		return byId;
	}

	/**
	 * @param {object} rules
	 * @param {array<string>} args
	 * @returns {object}
	 */
	assembleArguments(rules, args) {
		const result = {};

		if (rules.length !== args.length) {
			console.log("AssembleArguments: Not same length");
		}

		console.log(args);

		for (let i = 0; i < rules.length; i++) {
			result[rules[i]] = (isNaN(args[i]) ? args[i] : parseInt(args[i]));
		}

		return result;
	}

	/**
	 * @param {CommandExecutionContext} context
	 * @param {Command} command
	 * @returns {Promise<boolean>}
	 */
	async handle(context, command) {
		const customTypes = {
			// TODO: Bug with the USERS_PATTERN (interlaps between true and false)
			user: (arg) => /(^[0-9]{18}$|^<@!?[0-9]{18}>$)/.test(arg),
			time: (arg) => /^[0-9]+(ms|s|m|h|d|mo|y)$/.test(arg),
			minuteTime: (arg) => /^[0-9]+(m|h|d|mo|y)$/.test(arg),
			state: (arg) => /^(1|0|true|false|off|on)$/.test(arg),
			youtubeLink: (arg) => /^https?:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9-]{11}$/.test(arg)
		};

		if (!context.message.member) {
			context.message.channel.send("That command must be used in a text channel. Sorry!");

			return false;
		}
		// TODO: simplify the deletion of the messages
		else if (!command.isEnabled) {
			const response = await context.fail("That command is disabled and may not be used.");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (!this.hasAuthority(context.message, command.accessLevel)) {
			const minAuthority = AccessLevelType.toString(command.accessLevel);
			const response = await context.fail(`You don't have the authority to use that command. You must be at least a(n) **${minAuthority}**.`);

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (context.arguments.length > command.maxArguments) {
			const response = await context.fail(`That command only accepts up to **${command.maxArguments}** arguments.`);

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (!command.canExecute(context)) {
			const response = await context.fail("That command cannot be executed right now.");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (!CommandArgumentParser.validate(command.args, this.assembleArguments(Object.keys(command.args), context.arguments), customTypes)) {
			const response = await context.fail("Invalid argument usage. Please use the `usage` command.");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}

		try {
			await command.executed(context); // .catch((error) => context.respond(`There was an error while executing that command. (${error.message})`, "", "RED"));
			context.bot.events.emit("commandExecuted", command, context);
		}
		catch (error) {
			context.fail(`:thinking: **Oh noes!** There was an error executing that command. (${error.message})`);

			// TODO: Award badge
		}

		/* Log.channel(new Discord.RichEmbed()
			.setFooter(`Requested by ${context.message.author.username}`, context.message.author.avatarURL)
			.setColor([50, 255, 0])
			.setAuthor("Command Executed")
			.addField("Command", command.base)); */

		return true;
	}
}
