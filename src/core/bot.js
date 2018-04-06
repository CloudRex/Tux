import CommandParser from "../commands/command-parser";
import Log from "./log";
import CommandExecutionContext from "../commands/command-execution-context";
import Database from "../database/database";
import ConsoleInterface from "../console/console-interface";
import EmojiMenuManager from "../emoji-ui/emoji-menu-manager";

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
		this.settings = settings;
		this.userConfig = userConfig;
		this.client = client;
		this.commands = commandManager;
		this.features = featureManager;
		this.commandLoader = commandLoader;
		this.database = new Database(this.settings.general.databasePath);
		this.console = new ConsoleInterface();
		this.emojis = new EmojiMenuManager(this.client);

		// Discord client events
		this.client.on("ready", () => {
			Log.info("Ready");

			this.client.user.setPresence({
				game: {
					name: "?trigger"
				}
			});

			this.console.init(this);
		});

		this.client.on("message", (message) => {
			if (!message.author.bot) {
				if (CommandParser.isValid(message.content, this.commands, this.settings.general.commandTrigger)) {
					this.commands.handle(
						new CommandExecutionContext(
							message,
							CommandParser.getArguments(message.content),
							this
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

			if (this.userConfig.get("log")) {
				this.database.addMessage(message);
			}
		});

		global.b = this;
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
