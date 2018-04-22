import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		if (!context.message.channel.nsfw) {
			context.fail(":underage: Please use the nsfw channel for this command.");

			return;
		}

		const message = await context.ok("Searching for **kitties**...");

		if (message !== null) {
			const nekoUrl = 'https://nekos.life/api/lewd/neko';

			snekfetch.get(nekoUrl).then((result) => {
				const nekoImage = result.body.neko;

				message.edit("**Look at those kittys!** :heart_eyes_cat:", "", "RANDOM", "", nekoImage);
			}).catch((error) => {
				message.edit(`No results found. (${error.message})`, "", "RED");
			});
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "neko",
		description: "Random lewd neko images",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.NSFW,
		enabled: true
	}
};
