import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.bot.settings.general.commandTrigger === context.arguments[0]) {
			context.respond(`Cannot set the bot's trigger: Already set to **${context.arguments[0]}**`);

			return;
		}
		else if (context.arguments[0].length > 64) {
			context.respond(`Cannot set the bot's trigger: Trigger exceeds maximum length of **64** characters`);

			return;
		}

		context.respond(`Successfully set the bot's trigger to **${context.arguments[0]}**`, "Change trigger", "GREEN");
		context.bot.settings.general.commandTrigger = context.arguments[0];
		context.bot.settings.save();
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "trigger",
		description: "Change the bot's command trigger",
		accessLevel: AccessLevelType.Admin,
		aliases: [],
		maxArguments: 1,

		args: {
			trigger: "!string"
		},

		category: CommandCategoryType.General,
		enabled: true
	}
};
