import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const request = require("request");

const command = new Command("chuck", "Display a random Chuck Norris fact", [], null, 0, AccessLevelType.Member, (context) => {
	request("https://api.chucknorris.io/jokes/random", (error, response, body) => {
		const data = JSON.parse(body);

		context.respond(data.value, "Chuck Norris Fact", "RED", data.icon_url);
	});
}, () => true);

export default command;
