import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const request = require("request");

export default {
	executed(context) {
		request("https://api.chucknorris.io/jokes/random", (error, response, body) => {
			const data = JSON.parse(body);

			context.respond({
				text: data.value,
				title: "Chuck Norris Fact",
				titleIcon: data.icon_url,
				color: "BLUE"
			});
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
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true
	}
};
