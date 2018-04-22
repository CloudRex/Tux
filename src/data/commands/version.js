import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.ok(`Version: \`${context.bot.settings.general.version}\``);

		// TODO
		/* context.bot.emojis.show(context.message.channel, new EmojiMenu([
			new EmojiButton("🖐", (message, user) => {
				// message.channel.send(`${user.username} reacted!`);
			})
		], "Hello")); */
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "version",
		description: "View the bot's version",
		accessLevel: AccessLevelType.Guest,
		aliases: ["ver"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
