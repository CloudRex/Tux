import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			const member = context.message.guild.member(context.arguments[0]);

			member.setNickname(context.arguments[1]).then(() => context.ok(`:zap: **${member.user.username}** is now known as **${context.arguments[1]}**`)).catch((error) => {
				context.fail(`Operation failed to complete. (${error.message})`);
			});
		}
		else {
			context.fail("Invalid amount of arguments.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "nickname",
		description: "Change a guild member's nickname",
		accessLevel: AccessLevelType.Moderator,
		aliases: ["nick"],
		maxArguments: 2,

		args: {
			user: "!:user",
			nickname: "!string"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
