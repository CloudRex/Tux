import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const voted = context.bot.dbl.hasVoted(context.message.author.id);

		context.respond("Voted : " + voted);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "voteclaim",
		description: "Claim your coins for voting",
		accessLevel: AccessLevelType.Member,
		aliases: ["vclaim"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Economy,
		enabled: true,
		price: 0
	}
};
