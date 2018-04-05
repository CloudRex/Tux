import ConsoleCommand from "../console/console-command";

const readline = require("readline");

export default class ConsoleInterface {
	init() {
		process.stdout.write("> ");

		const consoleInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		consoleInterface.on("line", (input) => {
			switch (input) {
				case "stop": {
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
