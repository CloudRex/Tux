import ConsoleCommand from "./console-command";

const readline = require("readline");

export default class ConsoleInterface {
	init(bot) {
		process.stdout.write("> ");

		const consoleInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		consoleInterface.on("line", (input) => {
			switch (input.trim()) {
				case "": {
					break;
				}

				case "stop": {
					bot.disconnect();
					process.exit(0);

					break;
				}

				case "help": {
					console.log("CLI Commands: stop, help");

					break;
				}

				default: {
					console.log(`Invalid command: ${input}`);
				}
			}

			process.stdout.write("> ");
		});
	}
}
