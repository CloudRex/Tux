import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";
import CommandCategoryType from "../../commands/command-category-type";

const { exec } = require("child_process");

export default {
	executed(context) {
		if (context.arguments.length === 1) {
			exec(context.arguments[0], (error, output) => {
				context.respond({
					Input: new MessageBuilder().codeBlock("javascript", context.arguments[0]).build(),
					Output: new MessageBuilder().codeBlock("javascript", output.toString()).build()
				});
			});
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "exec",
		description: "Execute a shell command",
		accessLevel: AccessLevelType.Developer,
		aliases: ["exe"],
		maxArguments: 1,

		args: {
			command: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
