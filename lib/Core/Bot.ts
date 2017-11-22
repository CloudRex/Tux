import Settings from "./settings";
import CommandManager from "../commands/commandManager";
import CommandParser from "../commands/commandParser";
import FeatureManager from "../features/featureManager";
import Log from "./log";
import CommandExecutionContext from "../commands/commandExecutionContext";

export default class Bot {
    // Members
    public settings: Settings;
    public client: any;
    public readonly commands: CommandManager;
    public readonly features: FeatureManager;

    constructor(settings: Settings, client: any, commandManager: CommandManager, featureManager: FeatureManager) {
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

    public login(): void {
        this.client.login(this.settings.general.token);
    }

    public restart(): void {
        Log.verbose("Restarting");
        this.features.reloadAll(this);

        // TODO: Logout the bot and log him back in
    }

    public disconnect(): void {
        // TODO: Actually logout the bot
        //this.client.disconnect();
        Log.info("Disconnected");
    }
}
