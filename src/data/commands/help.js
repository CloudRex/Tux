import Command from "../../commands/command";
import MessageBuilder from "../../core/messageBuilder";

export default class Help extends Command {
    constructor() {
        super("help", "View all available commands", ["?"], "Nice try.", 1, []);
    }

    executed(context) {
        if (context.arguments.length === 0) {
            let messageBuilder = new MessageBuilder("Available commands:").addLine().addCodeBlock();

            for (let i = 0; i < context.bot.commands.commands.length; i++) {
                let command = context.bot.commands.commands[i];

                messageBuilder.add(`${command.base} -> ${command.description}`).addLine();
            }

            messageBuilder.addCodeBlock().addLine().add(":heavy_plus_sign: other secret stuff!");
            context.respond(messageBuilder.build());
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

    canExecute(context) {
        return true;
    }
}
