import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		throw new Error("Intentionally thrown error.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "throw",
		description: "Intentionally throw an error",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Developer,
		enabled: true,
		price: 0
	}
};
