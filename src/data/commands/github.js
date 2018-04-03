import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("github", "View the project's Github link", ["git"], null, 0, AccessLevelType.Guest, (context) => {
	context.respond("https://github.com/CloudRex/Tux");
}, () => true);

export default command;
