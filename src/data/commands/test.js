import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.message.author.dmChannel.send("test").catch((error) => {
			context.message.channel.send("catched: " + error.message.toString());
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "version",
		description: "Test something",
		accessLevel: AccessLevelType.Owner,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Developer
	}
};
