import AccessLevelType from "../../core/access-level-type";
import EmojiMenu from "../../emoji-ui/emoji-menu";
import EmojiButton from "../../emoji-ui/emoji-button";

export default {
	executed(context) {
		context.respond(`Version: \`${context.bot.settings.general.version}\``);

		context.bot.emojis.show(context.message.channel, new EmojiMenu([
			new EmojiButton("🖐", (message, user) => {
				message.channel.send(`${user.username} reacted!`);
			})
		], "Hello"));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "version",
		description: "View the bot's version",
		accessLevel: AccessLevelType.Guest,
		aliases: ["ver"],
		maxArguments: 0
	}
};
