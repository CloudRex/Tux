import Settings from "./Settings";
import CommandManager from "./Commands/CommandManager";
import CommandParser from "./Commands/CommandParser";
import FeatureManager from "./Features/FeatureManager";
import Log from "./Log";

export default class Bot {
    // Members
    public Settings: Settings;
    public Client: any;
    public readonly Commands: CommandManager;
    public readonly Features: FeatureManager;

    constructor(settings: Settings, client: any, commandManager: CommandManager, featureManager: FeatureManager) {
        this.Settings = settings;
        this.Client = client;
        this.Commands = commandManager;
        this.Features = featureManager;
    }

    public login(): void {
        this.Client.login(this.Settings.General.Token, (error, token) => {
            if (error)
                Log.error("Could not login: " + error.message);
            else
                Log.success("Logged in");
        });
    }

    public restart(): void {
        Log.verbose("Restarting");
        this.Features.reloadAll(this);

        // TODO: Logout the bot and log him back in
    }

    public disconnect(): void {
        this.Client.disconnect();
        Log.info("Disconnected");
    }
}
