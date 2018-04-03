import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("settrigger", "Change the bot's command trigger", [], null, 1, AccessLevelType.Owner, (context) => {
	context.respond(`Trigger successfully changed to ${context.arguments[0]}`, "Change trigger");
	context.bot.settings.general.commandTrigger = context.arguments[0];
	context.bot.settings.save();
}, () => true);

export default command;
