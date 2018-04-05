import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length >= 2 && context.message.author.id.toString() === "285578743324606482") {
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
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "schedule",
		description: "Message/command automation and scheduling",
		accessLevel: AccessLevelType.Moderator,
		aliases: [],
		maxArguments: 3
	}
};
