import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			const member = context.message.guild.members.find("id", context.arguments[0]);

			context.message.guild.setNick(context.arguments[0])
				.then(() => context.respond(`:zap: **${member.user.username}** is now known as **${context.arguments[0]}**`, "", "GREEN"))
				.catch((error) => {
				context.respond(`Operation failed to complete. (${error.message})`, "", "RED");
			});
		}
		else {
			context.respond("Invalid amount of arguments.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "nickname",
		description: "Change a guild member's nickname",
		accessLevel: AccessLevelType.Admin,
		aliases: ["nick"],
		maxArguments: 2
	}
};
