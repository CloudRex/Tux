import Command from "../../commands/command";

const command = new Command("version", "View the bot's version", ["ver"], null, 0, [], (context) => {
	context.respond(`Version: \`${context.bot.settings.general.version}`);
}, () => true);

export default command;
