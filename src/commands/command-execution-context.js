import EditableMessage from "../core/editable-message";

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
        let embed = new Discord.RichEmbed()
            .setFooter(`Requested by ${this.message.author.username}`)
            .setColor(color)
            .setAuthor(title, thumbnailUrl);

        if (typeof message !== "string")
            for (let i = 0; i < Object.keys(message).length; i++)
                embed.addField(Object.keys(message)[i], message[Object.keys(message)[i]]);
        else
            embed.setDescription(message);

        return new EditableMessage(await this.message.channel.send(embed));
    }

    async reply(message) {
        return await this.message.reply(message);
    }
}
