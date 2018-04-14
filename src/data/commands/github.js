import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.respond("https://github.com/CloudRex/Tux");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "github",
		description: "View the project's Github link",
		accessLevel: AccessLevelType.Guest,
		aliases: ["git"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
