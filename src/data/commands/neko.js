import AccessLevelType from "../../core/access-level-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		if (!context.message.channel.nsfw) {
			return context.respond(":underage: Please use the nsfw channel for this command.", "", "RED");
		}

		const message = await context.respond('Searching for **kittys**...');

		if (message !== null) {
			const nekoUrl = 'https://nekos.life/api/lewd/neko';

			return snekfetch.get(nekoUrl).then((result) => {
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
		args: {}
	}
};
