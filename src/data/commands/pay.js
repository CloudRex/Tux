import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	treasures: null,

	async executed(context) {
		// TODO
		context.respond("Command not yet implemented");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "pay",
		description: "Pay another player",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			item: "!:user"
		},

		category: CommandCategoryType.Economy,
		enabled: true,
		price: 0
	}
};
