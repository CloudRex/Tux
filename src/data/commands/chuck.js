import AccessLevelType from "../../core/access-level-type";

const request = require("request");

export default {
	executed(context) {
		request("https://api.chucknorris.io/jokes/random", (error, response, body) => {
			const data = JSON.parse(body);

			context.respond(data.value, "Chuck Norris Fact", "RED", data.icon_url);
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "chuck",
		description: "Display a random Chuck Norris fact",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {}
	}
};
