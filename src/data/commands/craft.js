import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			// TODO
		}
		else {
			context.respond("Invalid amount of arguments, expecting 2.", "", "RED");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "craft",
		description: "Craft an item using other items",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 2,
		args: {},
		category: CommandCategoryType.Economy,
		enabled: true,
		price: 50
	}
};
