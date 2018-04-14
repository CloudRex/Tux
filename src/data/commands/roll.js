import AccessLevelType from "../../core/access-level-type";
import Utils from "../../core/utils";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		let max = (context.arguments[0] ? parseInt(context.arguments[0]) : 12);

		if (Number.isNaN(max)) {
			max = 12;
		}
		else if (max > 5000) {
			max = 5000;
		}
		else if (max < 2) {
			max = 2;
		}

		context.respond(`:game_die: **${context.message.author.username}** rolled a **${Utils.getRandomInt(1, max)}**`, "", "AQUA");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "roll",
		description: "Roll a 12-sided dice",
		accessLevel: AccessLevelType.Member,
		aliases: ["dice"],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true,
		price: 150
	}
};
