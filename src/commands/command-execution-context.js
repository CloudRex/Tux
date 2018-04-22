import EditableMessage from "../core/editable-message";
import EmbedBuilder from "../core/embed-builder";

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
	 * @param {(object|EmbedBuilder)} content
	 * @returns {(Promise<EditableMessage>|null)}
	 */
	async respond(content) {
		if (!this.bot.userConfig.getLocal(this.message.guild.id, "mute")) {
			/* const embed = new Discord.RichEmbed()
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
			} */
			let embed = null;

			if (content instanceof EmbedBuilder) {
				embed = content;
			}
			else {
				if (!content.color) {
					content.color = "GREEN";
				}

				if (!content.footer) {
					content.footer = {
						text: `Requested by ${this.sender.username}`,
						icon: this.sender.avatarURL
					};
				}

				embed = EmbedBuilder.fromObject(content);
			}

			const messageResult = await this.message.channel.send(embed.build()).catch((error) => {
				// TODO: Temporarily disabled due to spamming on unwanted servers.
				// this.privateReply(`Oh noes! For some reason, I was unable to reply to you in that channel. (${error.message})`);
			});

			return (messageResult !== undefined ? new EditableMessage(messageResult) : null);
		}

		return null;
	}

	async sections(sections) {
		const result = new EmbedBuilder();

		for (let i = 0; i < Object.keys(sections).length; i++) {
			result.field(Object.keys(sections)[i], sections[Object.keys(sections)[i]]);
		}

		return await this.respond(result);
	}

	/**
	 * @param {string} text
	 * @returns {Promise<EditableMessage>}
	 */
	async ok(text) {
		return await this.respond({
			text: text
		});
	}

	async fail(text) {
		return await this.respond({
			text: text,
			color: "RED"
		});
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
	async privateReply(message) {
		return await this.message.author.send(message);
	}
}
