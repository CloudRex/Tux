import CommandParser from "../commands/command-parser";
import Log from "./log";
import CommandExecutionContext from "../commands/command-execution-context";
import Database from "../database/database";
import ConsoleInterface from "../console/console-interface";
import EmojiMenuManager from "../emoji-ui/emoji-menu-manager";
import EmbedBuilder from "./embed-builder";
import CommandManager from "../commands/command-manager";

const DBL = require("dblapi.js");
const Discord = require("discord.js");
const EventEmitter = require("events");

export default class Bot {
	/**
	 * @param {Settings} settings
	 * @param {UserConfig} userConfig
	 * @param {*} client
	 * @param {string} accessLevelsPath
	 * @param {FeatureManager} featureManager
	 * @param {CommandLoader} commandLoader
	 */
	constructor(settings, userConfig, client, accessLevelsPath, featureManager, commandLoader) {
		this.events = new EventEmitter();
		this.settings = settings;
		this.userConfig = userConfig;
		this.client = client;
		this.commands = new CommandManager(this, accessLevelsPath);
		this.features = featureManager;
		this.commandLoader = commandLoader;
		this.database = new Database(this.settings.general.databasePath);
		this.console = new ConsoleInterface();
		this.emojis = new EmojiMenuManager(this.client);

		// TODO
		if (settings.general.dblToken) {
			this.dbl = new DBL(settings.general.dblToken);
		}

		// TODO: Move from here on to the connect function
		// and make sure there aren't any errors on restart

		// Discord client events
		this.client.on("ready", () => {
			Log.info("Ready");

			this.client.user.setPresence({
				game: {
					name: "Use ?trigger"
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
				// TODO: Position so only given to command uses, and position it after command executed to avoid blocking
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
							this.commands.getAuthority(message.guild.id, message.member.roles.array().map((role) => role.name), message.author.id)
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
			this.userConfig.createGuild(guild.id);

			Log.channel(new EmbedBuilder()
				.color("GREEN")
				.title("Joined Guild")
				.field("Name", guild.name)
				.field("Members", guild.memberCount)
				.field("Owner", guild.owner.user.toString())
				.thumbnail(guild.iconURL)
				.build());

			// TODO: This should only happen when the bot is given
			// ADMIN permissions right from the invitation. Make a way
			// to activate and deactivate this every time the bot gets
			// or loses ADMIN permissions.
			if (guild.me.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
				if (guild.owner) {
					this.userConfig.push("access-levels.owner", guild.owner.id, guild.id);

					// TODO: Temporally disabled due to maybe being "annoying", only shot
					// on those servers who actually invite Tux as admin.
					const send = (channel) => {
						return;

						channel.send(`<@${guild.owner.id}>`);

						channel.send(new EmbedBuilder()
							.color("GREEN")
							.text(`Hey, I'm Tux! Thanks for inviting me to your server! The \`Owner\` access level has been automatically granted to the owner of this guild (**${guild.owner.user.tag}**). You may assign administrators and/or moderators using the \`assign\` command. If you need any help with Tux, refer to the \`support\` command.`)
							.title("Thanks for inviting Tux!")
							.build());
					};

					if (guild.defaultChannel) {
						send(guild.defaultChannel);
					}
					else {
						const channels = guild.channels.array().filter((channel) => channel.type === "text");

						for (let i = 0; i < channels.length; i++) {
							if (channels[i].permissionsFor(guild.member(this.client.user.id)).has(Discord.Permissions.FLAGS.SEND_MESSAGES)) {
								send(channels[i]);

								break;
							}
						}
					}
				}
				else {
					// TODO: Default to admins
				}
			}
		});

		this.client.on("guildDelete", (guild) => {
			this.userConfig.removeGuild(guild.id);

			Log.channel(new EmbedBuilder()
				.color("RED")
				.title('Left guild')
				.field('Name', guild.name)
				.field('Members', guild.memberCount)
				.field('Owner', guild.owner.user.toString())
				.thumbnail(guild.iconURL)
				.build());
		});

		global.b = this;

		// TODO: DEBUG -----------------------
		this.events.on("commandExecuted", (e) => console.log(`${e.context.sender.username}@${e.context.message.guild.name}: ${e.context.message.content}`));
		// -----------------------------------
	}

	connect() {
		this.client.login(this.settings.general.token);
	}

	restart() {
		Log.info("Restarting");

		// TODO
		// this.features.reloadAll(this);

		this.disconnect();
		this.connect();
	}

	disconnect() {
		// TODO: Actually logout the bot
		// this.client.disconnect();
		this.settings.save();
		this.userConfig.save();
		this.client.destroy();
		Log.info("Disconnected");
	}
}
