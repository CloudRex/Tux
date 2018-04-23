import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const message = await context.ok("Searching for **nudes**...");

		if (message) {
			const nudeUrl = "https://nekobot.xyz/api/image?type=4k";

			snekfetch.get(nudeUrl).then((result) => {
				const nudeImage = result.body.message;

				message.edit("**Can penguins get boners?** :penguin:", "", "RANDOM", "", nudeImage);
			}).catch((error) => {
				message.edit(`No results found. (${error.message})`, "", "RED");
			});
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "nudes",
		description: "Random nudes",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.NSFW,
		enabled: true
	}
};
