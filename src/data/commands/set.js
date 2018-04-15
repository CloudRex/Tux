import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.respond("Command not yet implemented", "", "RED");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "set",
		description: "Configure the bot",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.General,
		enabled: true,
		price: 0
	}
};
