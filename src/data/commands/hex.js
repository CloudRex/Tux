import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {

	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "hex",
		description: "Generate a random hex color",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
