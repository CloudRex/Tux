import EditableMessage from "../core/editableMessage";

const Discord = require("discord.js");

export default class CommandExecutionContext {
    // Members
    // TODO
    /*
    public Sender: string;
    public Arguments: CommandArgument[];

    constructor(sender: string, args: CommandArgument[]) {
        this.Sender = sender;
        this.Arguments = args;
    }*/

    constructor(message, args, bot) {
        this.message = message;
        this.arguments = args;
        this.bot = bot;
    }

    async respond(message, title = "", color = "RANDOM", thumbnailUrl = "") {
        return new EditableMessage(await this.message.channel.send(new Discord.RichEmbed()
            .setFooter(`Requested by ${this.message.author.username}`)
            .setDescription(message)
            .setColor(color)
            .setAuthor(title, thumbnailUrl)
        ));
    }

    async reply(message) {
        return await this.message.reply(message);
    }
}
