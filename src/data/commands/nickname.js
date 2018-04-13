import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			const member = context.message.guild.member(context.arguments[0]);

			member.setNickname(context.arguments[1])
				.then(() => context.respond(`:zap: **${member.user.username}** is now known as **${context.arguments[1]}**`, "", "GREEN"))
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
		maxArguments: 2,

		args: {
			user: "!:user-mention",
			nickname: "!string"
		},

		category: CommandCategoryType.Moderation
	}
};
