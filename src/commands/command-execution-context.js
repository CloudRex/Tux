import EditableMessage from "../core/editable-message";
import EmbedBuilder from "../core/embed-builder";

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
	 * @returns {boolean}
	 */
	get muted() {
		return this.bot.userConfig.get("mute", this.message.guild.id);
	}

	/**
	 * @param {*} stream
	 * @param {string} name
	 * @returns {(Promise<EditableMessage>|null)}
	 */
	async fileStream(stream, name) {
		if (!this.muted) {
			return await this.message.channel.send(new Discord.Attachment(stream, name));
		}
	}

	/**
	 * @param {(object|EmbedBuilder)} content
	 * @param {boolean} autoDelete
	 * @returns {(Promise<EditableMessage>|null)}
	 */
	async respond(content, autoDelete = false) {
		if (!this.muted) {
			let embed = null;

			if (content.text) {
				if (content.text.toString().trim() === "" || content.text === undefined || content.text === null) {
					content.text = ":thinking: *Empty response.*";
				}
			}

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

			if (autoDelete && messageResult) {
				// TODO: Cannot access .length in embeds
				// also static time for images, probably need function
				const timeInSeconds = (4000 + (100 * embed.build() * 1000)) / 1000;

				messageResult.delete(4000 + (100 * messageResult.content.length * 1000));

				// TODO
				console.log(messageResult.content.length);

				console.log(`time : ${timeInSeconds}`);
			}

			return (messageResult !== undefined ? new EditableMessage(messageResult) : null);
		}

		return null;
	}

	/**
	 * @param {Snowflake} userId
	 * @returns {AccessLevelType}
	 */
	getAuth(userId) {
		return this.bot.commands.getAuthority(this.message.guild.id, this.message.guild.member(userId).roles.array().map((role) => role.name), userId);
	}

	/**
	 * @returns {AccessLevelType}
	 */
	get auth() {
		return this.getAuth(this.sender.id);
	}

	/**
	 * @param {Object} sections
	 * @param {String} color
	 * @returns {Promise<EditableMessage>}
	 */
	async sections(sections, color = "GREEN") {
		return await this.respond(EmbedBuilder.sections(sections, color));
	}

	/**
	 * @param {String} text
	 * @returns {Promise<EditableMessage>}
	 */
	async ok(text) {
		return await this.respond({
			text: `${this.bot.ec.get("check")} ${text}`
		});
	}

	/**
	 * @param {String} text
	 * @returns {Promise<EditableMessage>}
	 */
	async loading(text) {
		return await this.respond({
			text: `${this.bot.ec.get("loading")} ${text}`,
			color: "BLUE"
		});
	}

	/**
	 * @param {String} text
	 * @returns {Promise<EditableMessage>}
	 */
	async fail(text) {
		return await this.respond({
			text: text,
			color: "RED"
		}, true);
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
		if (!this.bot.userConfig.get("mute", this.message.guild.id)) {
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
