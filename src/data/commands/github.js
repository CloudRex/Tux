import Command from "../../commands/command";

const command = new Command("github", "View the project's Github link", ["git"], null, 0, [], (context) => {
	context.respond("https://github.com/CloudRex/Tux");
}, () => true);

export default command;
