import Log from "./log";

const Discord = require("discord.js");

export default class EditableMessage {
    constructor(message) {
        if (message.embeds.length === 0)
            Log.error("[EditableMessage] Message parameter must contain embeds");

        this.message = message;
    }

    edit(message, title = "", color = "RANDOM", thumbnailUrl = "") {
        this.message.edit(new Discord.RichEmbed()
            .setDescription(message)
            .setColor(color)
            .setAuthor(title, thumbnailUrl)
        );
    }
}