import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		const authLevel = context.bot.commands.getAuthority(context.message.member.roles, context.message.author.id);

		context.respond(`Your authorization level is **${AccessLevelType.toString(authLevel)}**`, "", "GREEN");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "authority",
		description: "View your authority level",
		accessLevel: AccessLevelType.Guest,
		aliases: ["auth"],
		maxArguments: 0
	}
};
