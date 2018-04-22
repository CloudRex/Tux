import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.ok(`:zap: Your authorization level is **${AccessLevelType.toString(context.auth)}**`);
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
