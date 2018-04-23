import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		switch (context.arguments[0]) {
			case "config": {
				// TODO

				break;
			}

			case "database": {
				// TODO

				break;
			}
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "reset",
		description: "Reset the database or the user config",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 1,

		args: {
			target: "!:dataStorage"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
