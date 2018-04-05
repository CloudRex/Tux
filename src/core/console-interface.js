const readline = require("readline");

export default class ConsoleInterface {
	init() {
		process.stdout.write("> ");

		const consoleInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		consoleInterface.on("line", (input) => {
			process.stdout.write("> ");
		});
	}
}
