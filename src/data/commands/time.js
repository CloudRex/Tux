import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const date = new Date();

		context.respond({
			"Local time": `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
			Timestamp: date.getTime()
		});
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
		category: CommandCategoryType.General
	}
};
