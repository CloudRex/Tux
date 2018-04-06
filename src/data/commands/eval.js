import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";

export default {
	executed(context) {
		if (context.arguments.length === 1) {
			const action = () => {
				try {
					const result = eval(context.arguments[0]);

					return (result === null || result === undefined ? "undefined" : result);
				}
				catch (error) {
					return error.toString();
				}
			};

			const result = action();

			context.respond({
				Evaluation: new MessageBuilder().addCodeBlock("javascript", context.arguments[0]).build(),
				Result: new MessageBuilder().addCodeBlock("javascript", result).build(),
				Type: new MessageBuilder().addCodeBlock("javascript", typeof result).build()
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
