import AccessLevelType from "../../core/access-level-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const message = await context.respond(`Searching for *${context.arguments[0]}*...`, "", "RANDOM");

		if (message !== null) {
            const gifUrl = `https://api.giphy.com/v1/gifs/random?api_thkey=v7puuJ0IipzBACNXQ4DodnyV8hpjp0SE&tag=${encodeURIComponent(context.arguments[0])}&rating=PG-13`;

            return snekfetch.get(gifUrl).then((result) => {
                const gifImage = result.body.data.images.original.url;

				message.edit("", "", "RANDOM", "", gifImage.toString());
			}).catch(() => {
				message.edit("No results found.", "", "RANDOM");
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
		maxArguments: 1
	}
};
