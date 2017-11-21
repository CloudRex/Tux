import Settings from "./Settings";
import CommandManager from "./commands/CommandManager";
import CommandParser from "./commands/CommandParser";

export default class Bot {
    // Members
    public Settings: Settings;
    public Client: any;
    public readonly CommandManager: CommandManager;

    constructor(settings: Settings, client: any, commandManager: CommandManager) {
        this.Settings = settings;
        this.Client = client;
        this.CommandManager = commandManager;
    }
}
