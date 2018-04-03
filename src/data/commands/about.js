import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("about", "Displays information about the bot", [], null, 0, AccessLevelType.Guest, (context) => {
	context.respond({
		"Adopt me": "To add Tux to your server, click [here](https://discordapp.com/oauth2/authorize?client_id=381949722157514752&scope=bot)",
		Description: "Tux is a tiny Discord bot created with flexibility in mind.",
		"Command Trigger": context.bot.settings.general.commandTrigger,
		Version: context.bot.settings.general.version
	});
}, () => true);

export default command;
