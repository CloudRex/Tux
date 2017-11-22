import ICommand from "../../Commands/ICommand";
import CommandExecutionContext from "../../Commands/CommandExecutionContext";

export default class Version implements ICommand {
    public readonly Base: string = "version";
    public readonly Description: string = "View the bot's version";
    public readonly Aliases: string[] = ["ver"];
    public readonly ExtendedDescription: string = this.Description;
    public readonly MaxArguments = 0;
    public readonly RequiredRoles: string[] = [];

    public executed(context: CommandExecutionContext): void {
        context.Message.channel.send(`\`Version: ${context.Bot.Settings.General.Version}\``);
    }

    public canExecute(context: CommandExecutionContext): boolean {
        return true;
    }
}
