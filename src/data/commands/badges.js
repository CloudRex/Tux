import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";
import BadgeType from "../../core/BadgeType";

export default {
	async executed(context) {
		const { badges } = (await context.bot.database.getUser(context.sender.id));
		const response = new MessageBuilder();

		for (let i = 0; i < badges.length; i++) {
			response.add(`:medal: ${BadgeType.getName(badges[i])}`).line();
		}

		context.respond(response.build(), `${context.sender.username}'s Badges`, "GOLD");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "badges",
		description: "View your badges",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true,
		price: 0
	}
};
