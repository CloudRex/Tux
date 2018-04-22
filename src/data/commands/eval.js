import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";
import CommandCategoryType from "../../commands/command-category-type";

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

			let result = action();

			// TODO
			if (result.length > 1000) {
				result = result.substr(0, 1000);
			}

			// TODO
			context.respond({
				Evaluation: new MessageBuilder().codeBlock("javascript", context.arguments[0]).build(),
				Result: new MessageBuilder().codeBlock("javascript", result).build(),
				Type: new MessageBuilder().codeBlock("javascript", typeof result).build()
			}, "", "GREEN");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "eval",
		description: "Evaluate JavaScript code",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 1,

		args: {
			expression: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
