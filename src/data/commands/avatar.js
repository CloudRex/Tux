import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import EmbedBuilder from "../../core/embed-builder";

export default {
	async executed(context) {
		const user = context.arguments.length === 1 ? context.bot.client.users.get(context.arguments[0]) : context.sender;

		context.respond(new EmbedBuilder()
			.image(user.avatarURL)
			.color("GREEN")
			.title(`${user.username}'s Avatar`));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "avatar",
		description: "Display someone's avatar",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			user: "!:user"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
