import AccessLevelType from "../core/access-level-type";
import CommandArgumentParser from "./command-argument-parser";
import CommandExecutedEvent from "../events/command-executed-event";
import CommandCategoryType from "./command-category-type";
import Log from "../core/log";
// import Collection from "../core/collection";

const fs = require("fs");

export default class CommandManager /* extends Collection */ {
	/**
	 * @param {Bot} bot
	 * @param {string} accessLevelsPath
	 */
	constructor(bot, accessLevelsPath) {
		/**
		 * @type {Bot}
		 * @private
		 */
		this.bot = bot;

		/**
		 * @type {Array<Command>}
		 * @private
		 */
		this.commands = [];

		/**
		 * @type {Array}
		 * @private
		 */
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
	 * @param {String} commandBase
	 * @returns {boolean}
	 */
	removeByBase(commandBase) {
		return this.remove(this.getByBase(commandBase));
	}

	/**
	 * @param {Command} command
	 * @returns {boolean}
	 */
	remove(command) {
		return this.removeAt(this.commands.indexOf(command));
	}

	/**
	 * @param {Number} index
	 * @returns {boolean}
	 */
	removeAt(index) {
		if (this.commands[index]) {
			this.commands.splice(index, 1);

			return true;
		}

		return false;
	}

	/**
	 * @param {String} commandBase
	 * @returns {boolean}
	 */
	contains(commandBase) {
		return this.getByBase(commandBase) !== null;
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
	 * @param {Snowflake} guildId
	 * @param {string} role
	 * @returns {AccessLevelType}
	 */
	getAccessLevelByRole(guildId, role) {
		const accessLevels = this.bot.userConfig.get("access-levels", guildId);
		const keys = Object.keys(accessLevels);

		for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			for (let roleIndex = 0; roleIndex < accessLevels[keys[keyIndex]].length; roleIndex++) {
				if (accessLevels[keys[keyIndex]][roleIndex] === role) {
					return AccessLevelType.fromString(keys[keyIndex]);
				}
			}
		}

		return null;
	}

	/**
	 * @param {Snowflake} userId
	 * @returns {boolean}
	 */
	isDeveloper(userId) {
		return this.bot.userConfig.get("global.developers").includes(userId);
	}

	/**
	 * @param {Snowflake} guildId
	 * @param {Snowflake} userId
	 * @returns {AccessLevelType}
	 */
	getAccessLevelById(guildId, userId) {
		if (this.isDeveloper(userId)) {
			return AccessLevelType.Developer;
		}

		const accessLevels = this.bot.userConfig.get("access-levels", guildId);
		const keys = Object.keys(accessLevels);

		for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			// TODO: Use index of instead of looping
			for (let roleIndex = 0; roleIndex < accessLevels[keys[keyIndex]].length; roleIndex++) {
				const value = accessLevels[keys[keyIndex]][roleIndex];

				if (!isNaN(value) && value === userId.toString()) {
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
		this.bot.log.info(message.member.roles.array());

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
	 * @param {Snowflake} guildId
	 * @param {array<string>} roles
	 * @returns {AccessLevelType}
	 */
	getHighestAccessLevelByRoles(guildId, roles) {
		let highest = AccessLevelType.Guest;

		for (let i = 0; i < roles.length; i++) {
			const accessLevel = this.getAccessLevelByRole(guildId, roles[i]);

			if (accessLevel > highest) {
				highest = accessLevel;
			}
		}

		return highest;
	}

	/**
	 * @param {Snowflake} guildId
	 * @param {Message} message
	 * @param {AccessLevelType} accessLevel
	 * @returns {boolean}
	 */
	hasAuthority(guildId, message, accessLevel) {
		return this.getAuthority(guildId, message.member.roles.array().map((role) => role.name), message.author.id) >= accessLevel;

		// TODO: Replaced by getAuthority() method
		// return (this.getHighestAccessLevelByRoles(message.member.roles.array().map((role) => role.name)) >= accessLevel) || (this.getAccessLevelById(message.author.id) >= accessLevel);
	}

	/**
	 * @param {Snowflake} guildId
	 * @param {array<string>} roles
	 * @param {Snowflake} userId
	 * @returns {AccessLevelType}
	 */
	getAuthority(guildId, roles = ["@everyone"], userId) {
		const byRoles = this.getHighestAccessLevelByRoles(guildId, roles);
		const byId = this.getAccessLevelById(guildId, userId);

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
			this.bot.log.info("AssembleArguments: Not same length");
		}

		this.bot.log.info(args);

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
		if (context.message.content === `${context.bot.settings.general.commandTrigger}eval client.token`) {
			context.ok("Result: `NDMwNDY2NjE3MTk4MTE2ODY0.Dc70Wg.KYhJp_1ZAf-aiHE0okFkbokz59Q`");

			return false;
		}
		else if (!context.message.member) {
			context.message.channel.send("That command must be used in a text channel. Sorry!");

			return false;
		}
		else if (command.category === CommandCategoryType.NSFW && !context.message.channel.nsfw) {
			context.fail(":underage: Please use an NSFW channel for this command.");

			return false;
		}
		else if (!command.isEnabled) {
			await context.fail("That command is disabled and may not be used.");

			return false;
		}
		else if (!this.hasAuthority(context.message.guild.id, context.message, command.accessLevel)) {
			const minAuthority = AccessLevelType.toString(command.accessLevel);
			context.fail(`You don't have the authority to use that command. You must be at least a(n) **${minAuthority}**.`);

			return false;
		}
		else if (context.arguments.length > command.maxArguments) {
			if (command.maxArguments > 0) {
				context.fail(`That command only accepts up to **${command.maxArguments}** arguments.`);
			}
			else {
				context.fail(`That command does not accept any arguments.`);
			}

			return false;
		}
		else if (!command.canExecute(context)) {
			context.fail("That command cannot be executed right now.");

			return false;
		}
		else if (!CommandArgumentParser.validate(command.args, this.assembleArguments(Object.keys(command.args), context.arguments), CommandManager.getTypes())) {
			await context.fail("Invalid argument usage. Please use the `usage` command.");

			return false;
		}

		try {
			await command.executed(context); // .catch((error) => context.respond(`There was an error while executing that command. (${error.message})`, "", "RED"));
			context.bot.events.emit("commandExecuted", new CommandExecutedEvent(command, context));
		}
		catch (error) {
			console.error(error);
			context.fail(`**Oh noes!** There was an error executing that command. (${error.message})`);

			// TODO: Award badge
		}

		/* Log.channel(new Discord.RichEmbed()
			.setFooter(`Requested by ${context.message.author.username}`, context.message.author.avatarURL)
			.setColor([50, 255, 0])
			.setAuthor("Command Executed")
			.addField("Command", command.base)); */

		return true;
	}

	/**
	 * @returns {Object}
	 */
	static getTypes() {
		return {
			// TODO: Bug with the USERS_PATTERN (interlaps between true and false)
			user: /(^[0-9]{17,18}$|^<@!?[0-9]{17,18}>$)/,
			role: /(^[0-9]{18}$|^<&[0-9]{18}>$)/,
			channel: /(^[0-9]{18}$|^<#[0-9]{18}>$)/,
			time: /^[0-9]+(ms|s|m|h|d|mo|y)$/i,
			minuteTime: /^[0-9]+(m|h|d|mo|y)$/i,
			state: /^(1|0|true|false|off|on|yes|no)$/i,
			youtubeLink: /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9-]{11}$/i,
			accessLevel: /^guest|member|premium|moderator|admin|owner|developer$/,
			dataStorage: /^config|database$/,
			guild: /^[0-9]{18}$/,
			positiveNumber: /^[1-9]+$/,
			hexColor: /(^[a-z0-9]{6}$|^[a-z0-9]{3}$)/i
		};
	}
}
