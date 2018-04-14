import AccessLevelType from "../../core/access-level-type";
import Utils from "../../core/utils";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments.length === 2) {
			const points = await context.bot.database.addUserPoints(Utils.stripMention(context.arguments[0]), parseInt(context.arguments[1]));

			context.respond(`:small_orange_diamond:He/she now has **${points}** points`, "", "GREEN");
		}
		else {
			context.respond("Invalid argument count", "", "RED");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "give",
		description: "Give points to an user",
		accessLevel: AccessLevelType.Owner,
		aliases: [],
		maxArguments: 2,

		args: {
			user: "!:user-mention",
			amount: "!number"
		},

		category: CommandCategoryType.Developer,
		enabled: true,
		price: 0
	}
};
