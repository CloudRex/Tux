import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("time", "View the bot's local time", [], null, 0, AccessLevelType.Member, (context) => {
	const date = new Date();

	context.respond({
		"Local time": `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
		Timestamp: date.getTime()
	});
}, () => true);

export default command;
