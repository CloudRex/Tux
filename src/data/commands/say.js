import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		context.respond(context.arguments[0], "", "GREEN");
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
		enabled: true,
		price: 500
	}
};
