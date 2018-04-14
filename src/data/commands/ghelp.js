import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";
import EmojiMenu from "../../emoji-ui/emoji-menu";
import EmojiButton from "../../emoji-ui/emoji-button";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments.length === 0) {
			let page = 0;

			const getCommands = () => context.bot.commands.commands.map((command) => command.base);

			const update = (message) => {
				const commands = getCommands(context).slice(page * 2.5, page + 5);
				const result = new MessageBuilder();

				for (let i = 0; i < commands.length; i++) {
					result.add(commands[i]);
					result.add(", ");
				}

				message.edit(result.build());
			};

			const message = await context.bot.emojis.show(context.message.channel, new EmojiMenu([
				new EmojiButton("⬅", (reaction, user) => {
					if (page > 0) {
						page--;
						update(message);
					}
				}),

				new EmojiButton("❌", (reaction, user) => {
					if (user.id === context.message.author.id) {
						message.delete();
					}
				}),

				new EmojiButton("➡", (reaction, user) => {
					// TODO: Check page max
					page++;
					update(message);
				})
			], `Displaying help for page **${page}**`));

			update(message);
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ghelp",
		description: "View all available commands",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true,
		price: 0
	}
};
