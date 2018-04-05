import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";

const { exec } = require("child_process");

export default {
	executed(context) {
		if (context.arguments.length === 1 && context.message.author.id.toString() === "285578743324606482") {
			exec(context.arguments[0], (error, output) => {
				context.respond({
					Input: new MessageBuilder().addCodeBlock("javascript", context.arguments[0]).build(),
					Output: new MessageBuilder().addCodeBlock("javascript", output.toString()).build()
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
		accessLevel: AccessLevelType.Owner,
		aliases: ["exe"],
		maxArguments: 1
	}
};
