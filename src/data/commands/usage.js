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
		name: "usage",
		description: "View the usage of a command",
		accessLevel: AccessLevelType.Guest,
		aliases: ["usg"],
		maxArguments: 1,

		args: {
			commandName: "!string"
		},

		category: CommandCategoryType.General,
		enabled: true
	}
};
