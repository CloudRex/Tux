import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		context.respond("Command not yet implemented", "", "RED");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "buy",
		description: "Buy a command",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.General,
		enabled: true,
		price: 0
	}
};
