import AccessLevelType from "../../core/access-level-type";
import Utils from "../../core/utils";

export default {
	executed(context) {
		context.respond(`:game_die: **${context.message.author.username}** rolled a **${Utils.getRandomInt(1, 12)}**`);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "roll",
		description: "Roll a 12-sided dice",
		accessLevel: AccessLevelType.Member,
		aliases: ["dice"],
		maxArguments: 0
	}
};
