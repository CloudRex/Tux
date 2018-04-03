import Command from "../../commands/command";
import MessageBuilder from "../../core/message-builder";
import AccessLevelType from "../../core/access-level-type";

const cmd = new Command("help", "View all available commands", ["?"], "Nice try.", 1, AccessLevelType.Member, (context) => {
	if (context.arguments.length === 0) {
		const messageBuilder = new MessageBuilder("Available commands:").addLine().addCodeBlock();

		for (let i = 0; i < context.bot.commands.commands.length; i++) {
			const command = context.bot.commands.commands[i];

			messageBuilder.add(`${command.base} -> ${command.description}`).addLine();
		}

		messageBuilder.addCodeBlock().addLine().add(":heavy_plus_sign: other secret stuff!");
		context.respond(messageBuilder.build());
	}
	else if (context.bot.commands.isRegistered(context.arguments[0])) {
		const command = context.bot.commands.getByBase(context.arguments[0]);
		const message = new MessageBuilder().addCode().add(`${command.base} -> ${command.extendedDescription}`).addCode()
			.build();

		context.message.channel.send(message);
	}
	else {
		context.message.channel.send("Hey! Something smells :fish:! You sure that command exists?");
	}
}, () => true);

export default cmd;
