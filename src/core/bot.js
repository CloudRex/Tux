import CommandParser from "../commands/command-parser";
import Log from "./log";
import CommandExecutionContext from "../commands/command-execution-context";
import Database from "../database/database";
import ConsoleInterface from "../console/console-interface";
import EmojiMenuManager from "../emoji-ui/emoji-menu-manager";
import EmbedBuilder from "./embed-builder";

const DBL = require("dblapi.js");
const EventEmitter = require("events");

export default class Bot {
	/**
	 * @param {Settings} settings
	 * @param {UserConfig} userConfig
	 * @param {*} client
	 * @param {CommandManager} commandManager
	 * @param {FeatureManager} featureManager
	 * @param {CommandLoader} commandLoader
	 */
	constructor(settings, userConfig, client, commandManager, featureManager, commandLoader) {
		this.events = new EventEmitter();
		this.settings = settings;
		this.userConfig = userConfig;
		this.client = client;
		this.commands = commandManager;
		this.features = featureManager;
		this.commandLoader = commandLoader;
		this.database = new Database(this.settings.general.databasePath);
		this.console = new ConsoleInterface();
		this.emojis = new EmojiMenuManager(this.client);

		// TODO
		if (settings.general.dblToken) {
			this.dbl = new DBL(settings.general.dblToken);
		}

		// Discord client events
		this.client.on("ready", () => {
			Log.info("Ready");

			this.client.user.setPresence({
				game: {
					name: "?trigger"
				}
			});

			// Check for missing guilds in user config
			const guilds = this.client.guilds.array();

			for (let i = 0; i < guilds.length; i++) {
				if (!this.userConfig.contains(guilds[i].id)) {
					this.userConfig.createGuild(guilds[i].id);
				}
			}

			this.userConfig.save();

			// Post stats to DBL
			if (this.dbl) {
				setInterval(() => {
					this.dbl.postStats(guilds.length);
				}, 1800000);
			}

			this.console.init(this);
		});

		this.client.on("message", async (message) => {
			if (!message.author.bot) {
				await this.database.addUserPoints(message.author.id, 1);
				this.events.emit("userMessage", message);

				if (global.trivAns) {
					if (message.channel.id === global.trivAns.channel.id && message.content.toLowerCase() === global.trivAns.answer) {
						this.database.addUserPoints(message.author.id, 5);
						message.channel.send(`**${message.author.username}** answered correctly! The answer is **${global.trivAns.answer}**. You won **+5** coins!`);
						global.trivAns = null;
					}
				}

				if (CommandParser.isValid(message.content, this.commands, this.settings.general.commandTrigger)) {
					this.commands.handle(
						new CommandExecutionContext(
							message,
							CommandParser.getArguments(message.content),
							this,
							this.commands.getAuthority(message.member.roles.array().map((role) => role.name), message.author.id)
						),

						CommandParser.parse(
							message.content,
							this.commands,
							this.settings.general.commandTrigger
						)
					);
				}
				else if (message.content === "?trigger") {
					message.channel.send(`Command trigger: **${this.settings.general.commandTrigger}**`);
				}
			}

			if (this.userConfig.get("global.log")) {
				this.database.addMessage(message);
			}
		});

		this.client.on("guildCreate", (guild) => {
			const guildLog = this.userConfig.get("global.guild-log");

			this.userConfig.createGuild(guild.id);

			if (guildLog.enabled) {
				this.client.guilds.find("id", guildLog.guild).channels.find("id", guildLog.channel).send(new EmbedBuilder().text(`Joined guild: ${guild.name} (${guild.memberCount} members)`).color("GREEN").build());
			}
		});

		this.client.on("guildDelete", (guild) => {
			const guildLog = this.userConfig.get("global.guild-log");

			this.userConfig.removeGuild(guild.id);

			if (guildLog.enabled) {
				this.client.guilds.find("id", guildLog.guild).channels.find("id", guildLog.channel).send(new EmbedBuilder().text(`Left guild: ${guild.name} (${guild.memberCount} members)`).color("RED").build());
			}
		});

		global.b = this;

		// TODO: DEBUG -----------------------
		this.events.on("commandExecuted", (command, context) => console.log(`${context.sender.username}@${context.message.guild.name}: ${context.message.content}`));
		// -----------------------------------
	}

	login() {
		this.client.login(this.settings.general.token);
	}

	restart() {
		Log.info("Restarting");

		// TODO
		// this.features.reloadAll(this);

		this.disconnect();
		this.login();
	}

	disconnect() {
		// TODO: Actually logout the bot
		// this.client.disconnect();
		this.client.destroy();
		Log.info("Disconnected");
	}
}
