import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const message = await context.ok(`Searching for comic...`);

		snekfetch.get("https://api.al1l.com/v1/funny?ref=Tux").then((result) => {
			const data = result.body.response;
			message.edit(data.author, data.title, 'RED', '', data.image);
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "comic",
		description: "A comic strip",
		accessLevel: AccessLevelType.Member,
		aliases: ['funny', 'funnies'],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true
	}
};
