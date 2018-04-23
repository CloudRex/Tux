import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		snekfetch.get("https://icanhazdadjoke.com/", { headers: { Accept: 'text/plain' } }).then((result) => {
			context.respond({
				text: result.body,
				title: "Dad Joke",
				titleIcon: "https://icanhazdadjoke.com/static/smile.png",
				color: "GOLD"
			});
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "joke",
		description: "A funny joke",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true
	}
};
