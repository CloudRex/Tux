export default class GeneralSettings {
    // Members
    public Token: string;
    public Key: string;
    public CommandTrigger: string;
    public Version: string;

    constructor(token: string, key: string, commandTrigger: string, version: string) {
        this.Token = token;
        this.Key = key;
        this.CommandTrigger = commandTrigger;
        this.Version = version;
    }
}
