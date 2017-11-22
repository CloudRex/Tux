import Bot from "../core/bot";

export default class CommandExecutionContext {
    // Members
    // TODO
    /*
    public Sender: string;
    public Arguments: CommandArgument[];

    constructor(sender: string, args: CommandArgument[]) {
        this.Sender = sender;
        this.Arguments = args;
    }*/

    public message: any;
    public arguments: string[];
    public bot: Bot;

    constructor(message: any, args: string[], bot: Bot) {
        this.message = message;
        this.arguments = args;
        this.bot = bot;
    }
}
