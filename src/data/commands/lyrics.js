import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	executed(context) {
		snekfetch.get(`https://some-random-api.glitch.me/lyrics/api/?title=${encodeURIComponent(context.arguments[0])}`).then((response) => {
			if (response.body.title) {
				let trim = 500;

				if (context.arguments.length === 2) {
					trim = parseInt(context.arguments[1]);
				}

				if (trim > 1024) {
					trim = 1024 - 6;
				}

				let result = response.body.lyrics;

				if (result.length > trim) {
					result = result.substring(0, trim) + "...";
				}

				context.respond({
					Lyrics: result
				});
			}
			else {
				context.respond("Sorry, I couldn't find that song", "", "RED");
			}
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "lyrics",
		description: "Search a song's lyrics",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 2,

		args: {
			song: "!string",
			characters: "number"
		},

		category: CommandCategoryType.Utility,
		enabled: true,
		price: 700
	}
};
