import AccessLevelType from "../../core/access-level-type";

export default {
	async executed(context) {
		let id = context.arguments[0];

		if (context.arguments.length === 0) {
			id = context.message.author.id;
		}

		const member = context.message.guild.member(id.replace('<@', '').replace('>', ''));

		if (member.bot) {
			context.respond(`Bots can't have points`);
			return;
		}

		const points = await context.bot.database.getUserPoints(id);

		context.respond(`:small_orange_diamond:**${member.displayName}** has **${points}** points`, "", "GREEN");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "points",
		description: "View how many points you have",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		args: {}
	}
};
