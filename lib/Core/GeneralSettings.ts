export default class GeneralSettings {
    // Members
    public token: string;
    public commandTrigger: string;
    public version: string;

    constructor(token: string, commandTrigger: string, version: string) {
        this.token = token;
        this.commandTrigger = commandTrigger;
        this.version = version;
    }
}
