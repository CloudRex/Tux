import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

export default {
	executed(context) {
		const face = Utils.getRandomInt(0, 2) === 0 ? "heads" : "tails";

		context.ok(`The coin landed on **${face}**.`);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "flip",
		description: "Flip a coin",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true
	}
};
