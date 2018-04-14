import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const { exec } = require("child_process");

export default {
	async executed(context) {
		if (context.arguments.length === 1) {
			switch (context.arguments[0]) {
				case "stop": {
					await context.respond("Stopping the bot.", "", "GREEN");
					context.bot.disconnect();

					break;
				}

				case "restart": {
					await context.respond("Restarting the bot.", "", "GREEN");
					context.bot.restart();

					break;
				}

				case "srestart": {
					await context.respond("Restarting the bot and pulling latest changes.", "", "GREEN");
					exec("sudo systemctl restart tux");

					break;
				}

				default: {
					context.respond("Invalid command issued. First argument should be: stop, restart, srestart");
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
