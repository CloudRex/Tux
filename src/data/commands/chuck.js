import Command from "../../commands/command";

const request = require("request");

export default class Chuck extends Command {
	constructor() {
		super("chuck", "Display a random Chuck Norris fact", [], null, 0, []);
	}

	executed(context) {
		request("https://api.chucknorris.io/jokes/random", (error, response, body) => {
			const data = JSON.parse(body);

			context.respond(data.value, "Chuck Norris Fact", "RED", data.icon_url);
		});
	}

	canExecute(context) {
		return true;
	}
}
