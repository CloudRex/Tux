import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("version", "View the bot's version", ["ver"], null, 0, AccessLevelType.Guest, (context) => {
	context.respond(`Version: \`${context.bot.settings.general.version}\``);
}, () => true);

export default command;
