import Log from "./log";

const Discord = require("discord.js");

export default class EditableMessage {
	constructor(message) {
		if (message.embeds.length === 0) {
			Log.error("[EditableMessage] Message parameter must contain embeds");
		}

		this.message = message;
	}

	async edit(message, title = "", color = "RANDOM", thumbnailUrl = "", image = "") {
		return await this.message.edit("", new Discord.RichEmbed()
			.setColor(color)
			.setDescription(message)
			.setAuthor(title, thumbnailUrl)
			.setImage(image));
	}
}
