import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		// TODO
		context.fail("Not yet implemented.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "note",
		description: "Take notes",
		accessLevel: AccessLevelType.Member,
		aliases: ["store"],
		maxArguments: 1,

		args: {
			question: "!string"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
