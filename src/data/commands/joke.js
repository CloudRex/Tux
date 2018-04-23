import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const url = "https://icanhazdadjoke.com/";

		snekfetch.get(url, { headers: { Accept: 'text/plain' } }).then((result) => {
			const response = result.body;
			context.ok(response);
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
