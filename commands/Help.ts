import ICommand from "../core/commands/ICommand";
import CommandExecutionContext from "../core/commands/CommandExecutionContext";

export default class Help implements ICommand {
    public readonly Base: string = "help";
    public readonly Description: string = "View all available commands";

    public executed(context: CommandExecutionContext): void {
        context.Message.channel.send("Help command executed :cookie:");
    }

    public canExecute(context: CommandExecutionContext): boolean {
        return true;
    }
}
