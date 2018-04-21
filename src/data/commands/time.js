import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.respond({
			"Local time": new Date().toUTCString(),
			Timestamp: Date.now()
		}, "", "GREEN");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "time",
		description: "View the bot's local time",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
