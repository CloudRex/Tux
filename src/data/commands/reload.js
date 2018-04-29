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
		name: "reload",
		description: "Reload commands",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 0,

		args: {
			command: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
