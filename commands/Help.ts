import ICommand from "../core/commands/ICommand";
import CommandExecutionContext from "../core/commands/CommandExecutionContext";
import MessageBuilder from "../core/MessageBuilder";

export default class Help implements ICommand {
    public readonly Base: string = "help";
    public readonly Description: string = "View all available commands";
    public readonly Aliases: string[] = ["?"];
    public readonly ExtendedDescription: string = "Nice try.";
    public readonly MaxArguments: number = 1;
    public readonly RequiredRoles: string[] = [];

    public executed(context: CommandExecutionContext): void {
        if (context.Arguments.length == 0) {
            let messageBuilder = new MessageBuilder("Available commands:").addLine().addCodeBlock();

            for (var index in context.Bot.Commands.Commands) {
                let command = context.Bot.Commands.Commands[index];

                messageBuilder.add(`${command.Base} -> ${command.Description}`).addLine();
            }

            messageBuilder.addCodeBlock().addLine().add(":heavy_plus_sign: other secret stuff!");
            context.Message.channel.send(messageBuilder.build());
        }
        else {
            if (context.Bot.Commands.isRegistered(context.Arguments[0])) {
                let command = context.Bot.Commands.getByBase(context.Arguments[0]);
                let message = new MessageBuilder().addCode().add(`${command.Base} -> ${command.ExtendedDescription}`).addCode().build();

                context.Message.channel.send(message);
            }
            else
                context.Message.channel.send("Hey! Something smells :fish:! You sure that command exists?");
        }
    }

    public canExecute(context: CommandExecutionContext): boolean {
        return true;
    }
}
