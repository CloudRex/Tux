import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		throw new Error("Intentionally thrown error. This is an intentionally thrown error and you're reading this because you have nothing to do and your whole life is a lie because the lion king actually died.");
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
		enabled: true
	}
};
