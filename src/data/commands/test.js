import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const channel = (context.message.author.dmChannel ? context.message.author.dmChannel : await context.message.author.createDM());

		channel.send("test").catch((error) => {
			context.message.channel.send("catched: " + error.message.toString());
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "test",
		description: "Test something",
		accessLevel: AccessLevelType.Owner,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Developer
	}
};
