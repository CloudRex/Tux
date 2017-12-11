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

    respond(message, title = "", color = "RANDOM") {
        this.message.channel.send(new Discord.RichEmbed()
            .setFooter(`Requested by ${this.message.author.username}`)
            .setTitle(title)
            .setDescription(message)
            .setColor(color)
        );
    }
}
