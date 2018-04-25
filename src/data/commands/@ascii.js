import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";

const ascii = require("src/data/commands/@ascii");

export default {
	executed(context) {
		ascii.font(context.arguments[0], "Doom", function(result) {
			context.ok(new MessageBuilder().codeBlock(result));
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ascii",
		description: "Display text in ascii art",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		
		args: {
			text: "!string"
		},
		
		category: CommandCategoryType.Fun,
		enabled: true
	}
};
