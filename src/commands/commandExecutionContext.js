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

    constructor(message, args, bot) {
        this.message = message;
        this.arguments = args;
        this.bot = bot;
    }
}
