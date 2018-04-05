import Feature from "./feature";
import CommandExecutionContext from "../../commands/command-execution-context";
import CommandParser from "../../commands/command-parser";

const Discord = require("discord.js");

export default class AnswerMentions extends Feature {
	constructor() {
		super("Answer Mentions", "answer-mentions", "Answer mentions as commands");
	}

	canEnable(bot) {
		return true;
	}

	enabled(bot) {
		bot.client.on("message", (message) => {
			if (message.author.id !== bot.client.user.id) {
				const mentionedUsers = message.mentions.users.array();

				for (let i = 0; i < mentionedUsers.length; i++) {
					if (mentionedUsers.length === 1 && mentionedUsers[0].id === bot.client.user.id && message.content.startsWith(mentionedUsers[0].toString())) {
						const actualCommand = message.content.replace(Discord.MessageMentions.USERS_PATTERN, "");

						if (CommandParser.isValid(actualCommand, bot.commands, "-")) {
							bot.commands.handle(new CommandExecutionContext(message, CommandParser.getArguments(actualCommand), bot), CommandParser.parse(actualCommand, bot.commands, "-"));
						}
						else {
							message.channel.send("I'm unable to interpret that command. (Are you sure that's valid?)");
						}
					}
				}
			}
		});
	}
}
