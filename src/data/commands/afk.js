import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.fail("Not yet implemented.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "afk",
		description: "Set your afk message",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
