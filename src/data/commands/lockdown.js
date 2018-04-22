import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		context.respond({
			text: "**Initiated server lockdown mode.**",
			title: "Lockdown",
			color: "RED"
		});

		// TODO
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "lockdown",
		description: "Lockdown the server",
		accessLevel: AccessLevelType.Admin,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
