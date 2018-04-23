import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const message = await context.ok(`<a:loading:395048045038927885> Searching for bouncing boobs...`);

		if (message !== null) {
            const gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=${context.bot.settings.keys.giphy}&tag=bouncing%20boobs`;

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
		name: "bounce",
		description: "Search for bouncing boob GIFs",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.NSFW,
		enabled: true
	}
};
