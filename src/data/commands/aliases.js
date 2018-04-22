import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.fail("Command not yet implemented.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "aliases",
		description: "View the aliases of a command",
		accessLevel: AccessLevelType.Guest,
		aliases: ["alias"],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
