import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		await context.respond(":ok_hand:");
		context.message.guild.leave();
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "withdraw",
		description: "Leave the current server",
		accessLevel: AccessLevelType.Developer,
		aliases: ["leave"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Developer,
		enabled: true
	}
};
