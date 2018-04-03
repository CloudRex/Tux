import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("about", "Displays information about the bot", [], null, 0, AccessLevelType.Guest, (context) => {
	context.respond({
		Description: "Tux is a tiny Discord bot created with flexibility in mind.",
		"Command Trigger": context.bot.settings.general.commandTrigger,
		Version: context.bot.settings.general.version
	});
}, () => true);

export default command;
