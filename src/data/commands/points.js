import AccessLevelType from "../../core/access-level-type";

export default {
	async executed(context) {
		const points = await context.bot.database.getUserPoints(context.message.author.id);

		context.respond(`:small_orange_diamond: **${context.message.author.username}** has **${points}** points`, "", "GREEN");

		throw new Error("testing");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "points",
		description: "View how many points you have",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0
	}
};
