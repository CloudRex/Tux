import Command from "../../Commands/Command";
import CommandExecutionContext from "../../Commands/CommandExecutionContext";

export default class Version implements Command {
    public readonly base: string = "version";
    public readonly description: string = "View the bot's version";
    public readonly aliases: string[] = ["ver"];
    public readonly extendedDescription: string = this.description;
    public readonly maxArguments = 0;
    public readonly requiredRoles: string[] = [];

    public executed(context: CommandExecutionContext): void {
        context.message.channel.send(`\`Version: ${context.bot.settings.general.version}\``);
    }

    public canExecute(context: CommandExecutionContext): boolean {
        return true;
    }
}
