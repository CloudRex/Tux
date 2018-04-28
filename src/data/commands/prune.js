import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.fail("Not yet implemented.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "prune",
		description: "Prune messages from the bot or someone",
		accessLevel: AccessLevelType.Owner,
		aliases: [],
		maxArguments: 2,

		args: {
			target: ":user|number",
			count: "number"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
