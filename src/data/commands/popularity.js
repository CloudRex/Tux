import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const user = context.bot.client.users.get(context.arguments[0]);
		// const loadingResponse = await context.ok("Loading data");


		context.fail("Not yet implemented.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "popularity",
		description: "View the amount of times someone has been tagged",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			user: "!string"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
