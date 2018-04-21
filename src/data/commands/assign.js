import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.message.mentions.users.array().length > 0) {

		}
		else {

		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "assign",
		description: "Assign an access level to an user or a role",
		accessLevel: AccessLevelType.Owner,
		aliases: ["invite", "vote", "uptime"],
		maxArguments: 0,

		args: {
			target: "!:user|string"
		},

		category: CommandCategoryType.Moderation,
		enabled: true,
		price: 0
	}
};
