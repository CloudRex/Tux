import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";

const generate = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

export default {
	executed(context) {
		context.ok(new MessageBuilder().codeBlock("css", generate()).build());
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "hex",
		description: "Generate a random hex color",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
