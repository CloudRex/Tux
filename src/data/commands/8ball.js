import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

export default {
	executed(context) {
		const result = Utils.getRandomInt(0, 3);

		switch (result) {
			case 0: {
				context.ok("No.");

				break;
			}

			case 1: {
				context.ok("Yes.");

				break;
			}

			case 2: {
				context.ok("Maybe.");

				break;
			}
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "8ball",
		description: "Ask a question to the 8Ball",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			question: "!string"
		},

		category: CommandCategoryType.Fun,
		enabled: true
	}
};
