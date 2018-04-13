import MessageBuilder from "../../core/message-builder";
import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length === 0) {
			const result = {};
			const { commands } = context.bot.commands;

			const categories = [
				{
					name: "General",
					id: CommandCategoryType.General
				},
				{
					name: "Utility",
					id: CommandCategoryType.Utility
				},
				{
					name: "Moderation",
					id: CommandCategoryType.Moderation
				},
				{
					name: "Developer",
					id: CommandCategoryType.Developer
				},
				{
					name: "Economy",
					id: CommandCategoryType.Economy
				},
				{
					name: "Fun",
					id: CommandCategoryType.Fun
				},
				{
					name: "Music",
					id: CommandCategoryType.Music
				},
				{
					name: "NSFW",
					id: CommandCategoryType.NSFW
				}
			];

			for (let categ = 0; categ < categories.length; categ++) {
				result[categories[categ].name] = [];

				let categoryEmpty = true;

				for (let cmd = 0; cmd < commands.length; cmd++) {
					if (commands[cmd].category === categories[categ].id) {
						result[categories[categ].name].push(`**${commands[cmd].base}**: ${commands[cmd].description}`);
						categoryEmpty = false;
					}
				}

				if (categoryEmpty) {
					result[categories[categ].name].push("There are no commands for this category yet.");
				}

				result[categories[categ].name] = result[categories[categ].name].join("\n");
			}

			/* for (let i = 0; i < context.bot.commands.commands.length; i++) {
				const command = context.bot.commands.commands[i];

				messageBuilder.add(`${command.base} -> ${command.description}`).addLine();
			} */

			// messageBuilder.addCodeBlock().addLine().add(":heavy_plus_sign: other secret stuff!");
			context.respond(result);
		}
		else if (context.bot.commands.isRegistered(context.arguments[0])) {
			const command = context.bot.commands.getByBase(context.arguments[0]);

			const message = new MessageBuilder().addCode().add(`${command.base} -> ${command.extendedDescription}`).addCode()
				.build();

			context.message.channel.send(message);
		}
		else {
			context.message.channel.send(":thinking: Hey! Something smells :fish:! You sure that command exists?", "", "RED");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "help",
		description: "View all available commands",
		accessLevel: AccessLevelType.Member,
		aliases: ["commands", "cmds"],
		maxArguments: 1,

		args: {
			command: "string"
		},

		category: CommandCategoryType.General
	}
};
