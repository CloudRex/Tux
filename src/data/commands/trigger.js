import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("trigger", "Change the bot's command trigger", [], null, 1, AccessLevelType.Owner, (context) => {
	if (context.bot.settings.general.commandTrigger === context.arguments[0]) {
		context.respond(`Cannot set the bot's trigger: Already set to **${context.arguments[0]}**`);

		return;
	}
	else if (context.arguments[0].length > 10) {
		context.respond(`Cannot set the bot's trigger: Trigger exceeds maximum length of 10 characters`);

		return;
	}

	context.respond(`Successfully set the bot's trigger to **${context.arguments[0]}**`, "Change trigger");
	context.bot.settings.general.commandTrigger = context.arguments[0];
	context.bot.settings.save();
}, () => true);

export default command;
