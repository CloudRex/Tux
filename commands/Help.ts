import ICommand from "../core/commands/ICommand";
import CommandExecutionContext from "../core/commands/CommandExecutionContext";

export default class Help implements ICommand {
    public readonly Base: string = "help";
    public readonly Description: string = "View all available commands";
    public readonly Aliases: string[] = ["?"];
    public readonly ExtendedDescription: string = "Nice try.";
    public readonly MaxArguments: number = 1;
    public readonly RequiredRoles: string[] = [];

    public executed(context: CommandExecutionContext): void {
        if (context.Arguments.length == 0) {
            context.Message.channel.send("Available commands:");

            for (var index in context.Bot.CommandManager.Commands) {
                let command = context.Bot.CommandManager.Commands[index];

                context.Message.channel.send(`\`${command.Base} -> ${command.Description}\``);
            }

            context.Message.channel.send(":heavy_plus_sign: other secret stuff!");
        }
        else {
            if (context.Bot.CommandManager.isRegistered(context.Arguments[0])) {
                let command = context.Bot.CommandManager.getByBase(context.Arguments[0]);

                context.Message.channel.send(`\`${command.Base} -> ${command.ExtendedDescription}\``);
            }
            else
                context.Message.channel.send("Hey! Something smells :fish:! You sure that command exists?");
        }
    }

    public canExecute(context: CommandExecutionContext): boolean {
        return true;
    }
}
