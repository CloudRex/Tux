import AccessLevelType from "../../core/access-level-type";
import Utils from "../../core/utils";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments.length === 2) {
			const points = await context.bot.database.addUserPoints(Utils.stripMention(context.arguments[0]), parseInt(context.arguments[1]));

			context.ok(`:small_orange_diamond:He/she now has **${points}** points`);
		}
		else {
			context.fail("Invalid amount of arguments.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "give",
		description: "Give points to an user",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 2,

		args: {
			user: "!:user",
			amount: "!number"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
