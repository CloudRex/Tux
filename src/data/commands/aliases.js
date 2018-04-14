import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.respond("Command not yet implemented.", "", "RED");
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
		enabled: true,
		price: 0
	}
};
