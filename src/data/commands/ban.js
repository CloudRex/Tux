import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("ban", "Bans a member from the server", [], null, 1, AccessLevelType.Admin, (context) => {
	if (context.arguments.length === 1) {
		context.respond("Command not yet fully implemented");
	}
}, () => true);

export default command;
