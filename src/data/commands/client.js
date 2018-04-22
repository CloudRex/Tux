import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const { exec } = require("child_process");

export default {
	async executed(context) {
		if (context.arguments.length === 1) {
			switch (context.arguments[0]) {
				case "stop": {
					await context.ok("Stopping the bot.");
					context.bot.disconnect();

					break;
				}

				case "restart": {
					await context.ok("Restarting the bot.");
					context.bot.restart();

					break;
				}

				case "srestart": {
					await context.ok("Soft restart: Restarting the bot and pulling latest changes.");
					exec("sudo systemctl restart tux");

					break;
				}

				case "hrestart": {
					await context.ok("Hard restart: Restarting bot, pulling latest changes, and installing packages.");
					exec("sudo systemctl stop tux && sudo npm install && sudo systemctl start tux");

					break;
				}

				default: {
					context.fail("Invalid command issued. First argument should be: stop, restart, srestart, hrestart");
				}
			}
		}
		else {
			context.fail("Invalid amount of arguments: Expecting 1 (one) argument.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "client",
		description: "Control the bot's client",
		accessLevel: AccessLevelType.Developer,
		aliases: ["cli"],
		maxArguments: 1,

		args: {
			command: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
