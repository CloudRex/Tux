import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";

export default {
	executed(context) {
		if (context.arguments.length === 1) {
			context.respond({
				Evaluation: new MessageBuilder().addCodeBlock("javascript").addCodeBlock().build()
			});
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "eval",
		description: "Evaluate JavaScript code",
		accessLevel: AccessLevelType.Owner,
		aliases: [],
		maxArguments: 1
	}
};
