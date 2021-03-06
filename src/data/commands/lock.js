import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		// TODO: Might consider not adding since: inefficient checking every message for scope locked
		context.fail("Command not yet implemented");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "lock",
		description: "Toggle locking the bot's command scope to you",
		accessLevel: AccessLevelType.Guest,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
