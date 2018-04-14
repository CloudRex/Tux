import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length >= 2 && context.message.author.id.toString() === "285578743324606482") {
			let time = parseInt(context.arguments[0]);
			const isInterval = context.arguments.length === 3 && context.arguments[2] === "true";

			if (time < 3) {
				context.respond("Minimum permitted time is **3** seconds");

				return;
			}
			/* else if (context.arguments.length === && time < 5) {
				context.respond("Minimum permitted time for repeated messages is **5** seconds");

				return;
			} */

			const action = () => {
				context.respond({
					"Scheduled Message": context.arguments[1]
				}, "", "RANDOM", "", isInterval ? `every ${time} seconds` : `${time} seconds ago`);
			};

			if (isInterval) {
				setInterval(action, time * 1000);
			}
			else {
				setTimeout(action, time * 1000);
			}

			context.respond(`Successfully scheduled ${isInterval ? "every" : "for"} **${time}** second(s)`);
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
		maxArguments: 3,

		args: {
			time: "!number",
			message: "!message",
			repeat: "boolean"
		},

		category: CommandCategoryType.Developer,
		enabled: true,
		price: 0
	}
};
