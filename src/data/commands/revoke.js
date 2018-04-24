import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		// TODO
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "revoke",
		description: "Revoke an access level from an user",
		accessLevel: AccessLevelType.Owner,
		aliases: ["take"],
		maxArguments: 2,

		args: {
			target: "!:user",
			accessLevel: "!:accessLevel"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
