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

    constructor(message: any, args: string[]) {
        this.Message = message;
        this.Arguments = args;
    }
}
