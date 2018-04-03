import CommandParser from "../commands/command-parser";
import Log from "./log";
import CommandExecutionContext from "../commands/command-execution-context";
import Database from "./database";

export default class Bot {
	/**
	 * @param {Settings} settings
	 * @param {*} client
	 * @param {CommandManager} commandManager
	 * @param {FeatureManager} featureManager
	 */
	constructor(settings, client, commandManager, featureManager) {
		this.settings = settings;
		this.client = client;
		this.commands = commandManager;
		this.features = featureManager;
		this.database = new Database(this.settings.general.databasePath);

		// Discord client events
		this.client.on("ready", () => {
			Log.info("Ready");
		});

		this.client.on("message", (message) => {
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

			this.database.addMessage(message);
		});
	}

	login() {
		this.client.login(this.settings.general.token);
	}

	restart() {
		Log.verbose("Restarting");
		this.features.reloadAll(this);

		// TODO: Logout the bot and log him back in
	}

	disconnect() {
		// TODO: Actually logout the bot
		// this.client.disconnect();
		Log.info("Disconnected");
	}
}
