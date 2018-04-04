import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("lock", "Toggle locking the bot's command scope to you", [], null, 0, AccessLevelType.Guest, (context) => {
	context.respond("Command not yet fully implemented");
}, () => true);

export default command;
