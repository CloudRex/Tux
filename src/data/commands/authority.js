import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const authLevel = context.bot.commands.getAuthority(context.message.member.roles.array(), context.message.author.id);

		context.ok(`:zap: Your authorization level is **${AccessLevelType.toString(authLevel)}**`);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "authority",
		description: "View your authority level",
		accessLevel: AccessLevelType.Guest,
		aliases: ["auth"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
