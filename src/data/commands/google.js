import Command from "../../commands/command";

const cheerio = require("cheerio"),
    snekfetch = require("snekfetch"),
    querystring = require("querystring"),
    Discord = require("discord.js");

const googleThumbnailUrl = "https://images-ext-2.discordapp.net/external/EX2z2YZYiSgJEtVdE5MHdzpRKJKkpF3xatW4Q4oNSFA/https/lh4.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAADwkE/KyrKDjjeV1o/photo.jpg";

export default class Google extends Command {
    constructor() {
        super("google", "Use the Google search engine", [], null, 1, []);
    }

    async executed(context) {
        const searchMessage = await context.respond("Searching...", "Google", "GRAY", googleThumbnailUrl);
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(context.message.content)}`;

        return snekfetch.get(searchUrl).then((result) => {
            const $ = cheerio.load(result.text);
			
            let googleData = $(".r").first().find("a").first().attr("href");

            googleData = querystring.parse(googleData.replace("/url?", ""));
            searchMessage.edit(`Results for ${context.arguments} \n${googleData.q}`, "Google", "GREEN", googleThumbnailUrl);
        }).catch((err) => {
            searchMessage.edit("No results found.", "Google", "RED");
        });
    }

    canExecute(context) {
        return true;
    }
}