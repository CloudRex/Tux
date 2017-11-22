import Command from "../../commands/command";
import CommandExecutionContext from "../../commands/commandExecutionContext";
import MessageBuilder from "../../core/messageBuilder";

export default class Help implements Command {
    public readonly base: string = "help";
    public readonly description: string = "View all available commands";
    public readonly aliases: string[] = ["?"];
    public readonly extendedDescription: string = "Nice try.";
    public readonly maxArguments: number = 1;
    public readonly requiredRoles: string[] = [];

    public executed(context: CommandExecutionContext): void {
        if (context.arguments.length == 0) {
            let messageBuilder = new MessageBuilder("Available commands:").addLine().addCodeBlock();

            for (var index in context.bot.commands.commands) {
                let command = context.bot.commands.commands[index];

                messageBuilder.add(`${command.base} -> ${command.description}`).addLine();
            }

            messageBuilder.addCodeBlock().addLine().add(":heavy_plus_sign: other secret stuff!");
            context.message.channel.send(messageBuilder.build());
        }
        else {
            if (context.bot.commands.isRegistered(context.arguments[0])) {
                let command = context.bot.commands.getByBase(context.arguments[0]);
                let message = new MessageBuilder().addCode().add(`${command.base} -> ${command.extendedDescription}`).addCode().build();

                context.message.channel.send(message);
            }
            else
                context.message.channel.send("Hey! Something smells :fish:! You sure that command exists?");
        }
    }

    public canExecute(context: CommandExecutionContext): boolean {
        return true;
    }
}
