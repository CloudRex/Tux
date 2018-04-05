import AccessLevelType from "../../core/access-level-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const message = await context.respond("Searching...", "", "RANDOM");

		if (message !== null) {
            const gifUrl = `https://api.giphy.com/v1/gifs/random?api_key=v7puuJ0IipzBACNXQ4DodnyV8hpjp0SE&tag=${encodeURIComponent(context.message.content)}&rating=PG-13`;
            
			return snekfetch.get(gifUrl).then((result) => {

                const gifImage = result.body.data.url

				message.edit("", "", "RANDOM", "", "", gifImage);
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
		description: "Search for gifs.",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1
	}
};
