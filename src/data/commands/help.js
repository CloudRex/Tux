import MessageBuilder from "../../core/message-builder";
import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import EmbedBuilder from "../../core/embed-builder";

export default {
	async executed(context) {
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
					if (commands[cmd].category === categories[categ].id && commands[cmd].accessLevel <= context.bot.commands.getAuthority([], context.sender.id)) {
						result[categories[categ].name].push(`**${commands[cmd].base}**: ${commands[cmd].description}`);
						categoryEmpty = false;
					}
				}

				if (categoryEmpty) {
					result[categories[categ].name].push("There are no commands for this category (or you don't have access to them).");
				}

				result[categories[categ].name] = result[categories[categ].name].join("\n");
			}

			result["A note from developers"] = "*Hey, thanks for using our bot! Tux is a relatively new bot and if you have already noticed not everything may work as expected. We're currently working on per-server configuration support to enable our moderation commands. If you'd like to talk to the developers (maybe you want to see a special feature in Tux!) issue the `about` command and join our support server. Thanks!* \n\n-Atlas#0042";

			let failReply = null;

			const reply = await context.privateReply(EmbedBuilder.sections(result).build()).catch(async (error) => {
				failReply = await context.fail(":thinking: It seems that you're blocking private messages.");

				if (failReply) {
					failReply.message.delete(6000);
				}
			}).then(() => {
				if (!failReply) {
					context.ok("<:tuxcheck:436998015652462603> I've sent you a private message with all my commands!");
				}
			});

			if (reply) {
				reply.delete(4000);
			}
		}
		else if (context.bot.commands.isRegistered(context.arguments[0])) {
			const command = context.bot.commands.getByBase(context.arguments[0]);

			const message = new MessageBuilder().code().add(`${command.base} -> ${command.extendedDescription}`).code()
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

		category: CommandCategoryType.General,
		enabled: true
	}
};
