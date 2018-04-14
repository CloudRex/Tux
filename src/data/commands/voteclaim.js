import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const voted = await context.bot.dbl.hasVoted(context.message.author.id);

		// TODO: Save that the user voted in the database and reset in 24 hours. (UK midnight time)
		context.respond("Voted ->: " + voted, "", "GREEN");
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
