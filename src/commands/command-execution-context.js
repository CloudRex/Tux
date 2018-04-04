import EditableMessage from "../core/editable-message";

const Discord = require("discord.js");

export default class CommandExecutionContext {
	// TODO
	/* public Sender: string;
	public Arguments: CommandArgument[];

	constructor(sender: string, args: CommandArgument[]) {
		this.Sender = sender;
		this.Arguments = args;
	} */

	/**
	 * @param {string} message
	 * @param {array<string>} args
	 * @param {Bot} bot
	 */
	constructor(message, args, bot) {
		this.message = message;
		this.arguments = args;
		this.bot = bot;
	}

	/**
	 * @param {*} message
	 * @param {string} title
	 * @param {string} color
	 * @param {string} thumbnailUrl
	 * @param {string} footerSuffix
	 * @param {(string|null)} image
	 * @returns {(Promise<EditableMessage>|null)}
	 */
	async respond(message, title = "", color = "RANDOM", thumbnailUrl = "", footerSuffix = "", image = null) {
		if (!this.bot.userConfig.get("mute")) {
			const embed = new Discord.RichEmbed()
				.setFooter(`Requested by ${this.message.author.username} ${footerSuffix}`, this.message.author.avatarURL)
				.setColor(color)
				.setAuthor(title, thumbnailUrl);

			if (image) {
				embed.setImage(image);
			}

			if (typeof message === "object") {
				for (let i = 0; i < Object.keys(message).length; i++) {
					embed.addField(Object.keys(message)[i], message[Object.keys(message)[i]]);
				}
			}
			else {
				embed.setDescription(message);
			}

			const messageResult = await this.message.channel.send(embed).catch((error) => {
				this.privateReply(`Oh noes! For some reason, I was unable to reply to you in that channel. (${error.message})`);
			});

			return (messageResult !== undefined ? new EditableMessage(messageResult) : null);
		}

		return null;
	}

	/**
	 * @param {string} message
	 * @returns {(Promise<*>|null)}
	 */
	async reply(message) {
		if (!this.bot.userConfig.get("mute")) {
			return await this.message.reply(message);
		}

		return null;
	}

	/**
	 * @param {string} message
	 */
	privateReply(message) {
		if (!this.bot.userConfig.get("mute")) {
			this.message.author.send(message);
		}
	}
}
