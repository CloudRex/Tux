import CommandParser from "../commands/commandParser";
import Log from "./log";
import CommandExecutionContext from "../commands/commandExecutionContext";

export default class Bot {
    constructor(settings, client, commandManager, featureManager) {
        this.settings = settings;
        this.client = client;
        this.commands = commandManager;
        this.features = featureManager;

        // Discord client events
        this.client.on("ready", () => {
            Log.info("Ready");
        });

        this.client.on("message", (message) => {
            if (CommandParser.isValid(message.content, this.commands, this.settings.general.commandTrigger))
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

            Log.info(`[${message.author.username}] ${message.content}`);
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
        //this.client.disconnect();
        Log.info("Disconnected");
    }
}
