export default class GeneralSettings {
    // Members
    public Token: string;
    public Key: string;
    public CommandTrigger: string;

    constructor(token: string, key: string, commandTrigger: string) {
        this.Token = token;
        this.Key = key;
        this.CommandTrigger = commandTrigger;
    }
}
