import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("schedule", "Message/command automation and scheduling", [], null, 3, AccessLevelType.Moderator, (context) => {
	if (context.arguments.length >= 2) {
		const time = parseInt(context.arguments[0]) * 1000;

		const action = () => {
			context.respond({
				"Scheduled Message": context.arguments[1]
			}, "", "RANDOM", "", `${time / 1000} seconds ago`);
		};

		if (context.arguments.length === 3 && context.arguments[2]) {
			setInterval(action, time);
		}
		else {
			setTimeout(action, time);
		}

		context.respond(`Successfully scheduled for **${time / 1000}** second(s)`);
	}
}, () => true);

export default command;
