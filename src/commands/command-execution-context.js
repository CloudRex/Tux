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
	 * @param {Message} message
	 * @param {array<string>} args
	 * @param {Bot} bot
	 * @param {AccessLevelType} accessLevel
	 */
	constructor(message, args, bot, accessLevel) {
		this.message = message;
		this.arguments = args;
		this.bot = bot;
		this.accessLevel = accessLevel;
	}

	/**
	 * @param {*} message
	 * @param {string} title
	 * @param {string} color
	 * @param {string} thumbnailUrl
	 * @param {string} footerSuffix
	 * @param {(string|null)} image
	 * @param {(string|null)} authorImage
	 * @returns {(Promise<EditableMessage>|null)}
	 */
	async respond(message, title = "", color = "GREEN", thumbnailUrl = "", footerSuffix = "", image = "", authorImage = "") {
		if (!this.bot.userConfig.getLocal(this.message.guild.id, "mute")) {
			const embed = new Discord.RichEmbed()
				.setFooter(`Requested by ${this.message.author.username} ${footerSuffix}`, this.message.author.avatarURL)
				.setColor(color)
				.setAuthor(title, authorImage)
				.setThumbnail(thumbnailUrl);

			if (image !== "") {
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
				// TODO: Temporarily disabled due to spamming on unwanted servers.
				// this.privateReply(`Oh noes! For some reason, I was unable to reply to you in that channel. (${error.message})`);
			});

			return (messageResult !== undefined ? new EditableMessage(messageResult) : null);
		}

		return null;
	}

	/**
	 * @returns {User}
	 */
	get sender() {
		return this.message.author;
	}

	/**
	 * @param {string} message
	 * @returns {(Promise<*>|null)}
	 */
	async reply(message) {
		if (!this.bot.userConfig.getLocal(message.guild.id, "mute")) {
			return await this.message.reply(message);
		}

		return null;
	}

	/**
	 * @param {string} message
	 */
	privateReply(message) {
		this.message.author.send(message);
	}
}
