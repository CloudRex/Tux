import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length === 0) {
			context.respond({
				Evaluation: `\`\`\`javascript\n${context.arguments[0]}\`\`\``
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
