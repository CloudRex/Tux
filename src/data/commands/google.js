import Command from "../../commands/command";

const cheerio = require('cheerio'),
    snekfetch = require('snekfetch'),
    querystring = require('querystring');

export default class Google extends Command {
    constructor() {
        super("google", "Shows the users ping", [], null, 1, []);
    }

    executed(context) {


        this.googleCommand(context.message);
    }

    async googleCommand(msg, args) {

        let searchMessage = await msg.reply('Searching...');
        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`;

        return snekfetch.get(searchUrl).then((result) => {

            let $ = cheerio.load(result.text);

            let googleData = $('.r').first().find('a').first().attr('href');

            googleData = querystring.parse(googleData.replace('/url?', ''));
            searchMessage.edit(`Result found! \n${googleData.q}`);
        }).catch((err) => {
            searchMessage.edit('No results found.')
        });
    }


    canExecute(context) {
        return true;
    }
}