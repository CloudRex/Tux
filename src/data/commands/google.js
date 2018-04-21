import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const cheerio = require("cheerio");
const snekfetch = require("snekfetch");
const querystring = require("querystring");

const googleThumbnailUrl = "https://images-ext-2.discordapp.net/external/EX2z2YZYiSgJEtVdE5MHdzpRKJKkpF3xatW4Q4oNSFA/https/lh4.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAADwkE/KyrKDjjeV1o/photo.jpg";

export default {
	async executed(context) {
		const searchMessage = await context.respond("Searching...", "Google", "GRAY", googleThumbnailUrl);

		if (searchMessage !== null) {
			const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(context.message.content)}`;

			return snekfetch.get(searchUrl).then((result) => {
				const $ = cheerio.load(result.text);

				let googleData = $(".r").first().find("a").first()
					.attr("href");

				googleData = querystring.parse(googleData.replace("/url?", ""));
				searchMessage.edit(`Results for ${context.arguments} \n${googleData.q}`, "Google", "GREEN", googleThumbnailUrl);
			}).catch(() => {
				searchMessage.edit("No results found.", "Google", "RED");
			});
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "google",
		description: "Use the Google search engine",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			query: "!string"
		},

		category: CommandCategoryType.Utility,
		enabled: false
	}
};
