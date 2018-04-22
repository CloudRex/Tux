import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		context.fail("Command not yet implemented.");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "role",
		description: "Give an user or a bot a certain role",
		accessLevel: AccessLevelType.Moderator,
		aliases: [],
		maxArguments: 2,

		args: {
			user: "!:user",
			role: "!string"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
