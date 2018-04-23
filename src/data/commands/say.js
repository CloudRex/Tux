import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments[0].toLowerCase() === "beep boop") {
			context.fail("Nope.");

			return;
		}

		context.ok(context.arguments[0]);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "say",
		description: "Make tux say something",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true
	}
};
