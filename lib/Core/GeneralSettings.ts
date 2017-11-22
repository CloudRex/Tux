export default class GeneralSettings {
    // Members
    public Token: string;
    public CommandTrigger: string;
    public Version: string;

    constructor(token: string, commandTrigger: string, version: string) {
        this.Token = token;
        this.CommandTrigger = commandTrigger;
        this.Version = version;
    }
}
