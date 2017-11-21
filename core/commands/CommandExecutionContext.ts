import Bot from "../Bot";

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

    public Message: any;
    public Arguments: string[];
    public Bot: Bot;

    constructor(message: any, args: string[], bot: Bot) {
        this.Message = message;
        this.Arguments = args;
        this.Bot = bot;
    }
}
