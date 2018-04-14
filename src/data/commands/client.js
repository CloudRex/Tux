import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length === 1) {
			switch (context.arguments[0]) {
				case "stop": {
					context.respond("Stopping the bot", "", "GREEN");
					context.bot.disconnect();

					break;
				}

				case "restart": {
					context.respond("Restarting the bot", "", "GREEN");
					context.bot.restart();

					break;
				}

				default: {
					context.respond("Invalid command issued. First argument should be: stop or restart");
				}
			}
		}
		else {
			context.respond("Invalid amount of arguments: Expecting 1 (one) argument");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "client",
		description: "Control the bot's client",
		accessLevel: AccessLevelType.Owner,
		aliases: ["cli"],
		maxArguments: 1,

		args: {
			command: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true,
		price: 0
	}
};
