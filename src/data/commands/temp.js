import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Bot from "../../core/bot";

export default {
	executed(context) {
		switch (context.arguments[0]) {
			case "clear": {
				Bot.clearTemp();
				context.ok("Successfully cleared all files in the temp folder.");

				break;
			}

			default: {
				context.fail("Invalid sub-command. Expecting clear.");
			}
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "temp",
		description: "Control the temp folder",
		accessLevel: AccessLevelType.Developer,
		aliases: ["tmp"],
		maxArguments: 1,

		args: {
			task: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
