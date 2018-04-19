import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";
import BadgeType from "../../core/badge-type";

export default {
	async executed(context) {
		const allBadges = BadgeType.getAll();
		const { badges } = (await context.bot.database.getUser(context.sender.id));
		const response = new MessageBuilder();
		const missingBadges = allBadges.filter((badge) => !badges.includes(badge));

		for (let i = 0; i < badges.length; i++) {
			response.add(`:medal: **${BadgeType.getName(badges[i])}**: ${BadgeType.getDescription(badges[i])}`).line();
		}

		for (let i = 0; i < missingBadges.length; i++) {
			response.add(`:medal::lock: **${BadgeType.getName(missingBadges[i])}**: ${BadgeType.getDescription(missingBadges[i])}`).line();
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
