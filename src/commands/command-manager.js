import AccessLevelType from "../core/access-level-type";
import Log from "../core/log";

const Discord = require("discord.js");
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
	 * @param {*} message
	 * @param {AccessLevelType} accessLevel
	 * @returns {boolean}
	 */
	hasAuthority(message, accessLevel) {
		return this.getAuthority(message.member.roles, message.author.id) >= accessLevel;

		// TODO: Replaced by getAuthority() method
		// return (this.getHighestAccessLevelByRoles(message.member.roles.array().map((role) => role.name)) >= accessLevel) || (this.getAccessLevelById(message.author.id) >= accessLevel);
	}

	/**
	 * @returns {AccessLevelType}
	 */
	getAuthority(roles, userId) {
		const byRoles = this.getHighestAccessLevelByRoles(roles.array().map((role) => role.name));
		const byId = this.getAccessLevelById(userId);

		if (byRoles > byId) {
			return byRoles;
		}

		return byId;
	}

	/**
	 * @param {CommandExecutionContext} context
	 * @param {Command} command
	 * @returns {Promise<boolean>}
	 */
	async handle(context, command) {
		if (!context.message.member) {
			context.message.channel.send("That command must be used in a text channel. Sorry!");

			return false;
		}
		// TODO: simplify the deletion of the messages
		else if (!command.isEnabled) {
			const response = await context.respond("That command is disabled.", "", "RED");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (!this.hasAuthority(context.message, command.accessLevel)) {
			const minAuthority = AccessLevelType.toString(command.accessLevel);
			const response = await context.respond(`You don't have the authority to use that command. You must be at least a(n) **${minAuthority}**.`, "", "RED");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (context.arguments.length > command.maxArguments) {
			const response = await context.respond(`That command only accepts up to **${command.maxArguments}** arguments.`, "", "RED");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}
		else if (!command.canExecute(context)) {
			const response = await context.respond("That command cannot be executed right now.", "", "RED");

			if (response !== null) {
				response.message.delete(4000);
			}

			return false;
		}

		try {
			await command.executed(context); // .catch((error) => context.respond(`There was an error while executing that command. (${error.message})`, "", "RED"));
		}
		catch (error) {
			context.respond(`:thinking: **Oh noes!** There was an error executing that command. (${error.message})`, "", "RED");
		}

		Log.channel(new Discord.RichEmbed()
			.setFooter(`Requested by ${context.message.author.username}`, context.message.author.avatarURL)
			.setColor([50, 255, 0])
			.setAuthor("Command Executed")
			.addField("Command", command.base));

		return true;
	}
}
