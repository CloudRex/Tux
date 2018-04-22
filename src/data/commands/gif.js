import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const message = await context.ok(`Searching for *${context.arguments[0]}*...`);

		if (message !== null) {
            const gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${context.bot.settings.keys.giphy}&tag=${encodeURIComponent(context.arguments[0])}&rating=PG-13`;

            return snekfetch.get(gifUrl).then((result) => {
                const gifImage = result.body.data.images.original.url;

				message.edit("", "", "RANDOM", "", gifImage.toString());
			}).catch((error) => {
				message.edit(`No results found. (${error.message})`, "", "RED");
			});
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "gif",
		description: "Search for GIFs",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			query: "!string"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
