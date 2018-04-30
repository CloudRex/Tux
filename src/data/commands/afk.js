import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments[0] === 'off') {
			context.bot.database.setAfkMessage(context.sender.id, '');
			context.ok("You've successfully unset your AFK message.");
		} else {
			context.bot.database.setAfkMessage(context.sender.id, context.arguments[0]);
			context.ok("You've successfully set your AFK message.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "afk",
		description: "Set your afk message",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			message: "!string"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
