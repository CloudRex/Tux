import Feature from "./feature";

const fs = require("fs");
const snekfetch = require("snekfetch");

export default class AntiSpam extends Feature {
	constructor() {
		super("Anti-Spam", "anti-spam", "Advanced spam protection");
	}

	canEnable(bot) {
		return true;
	}

	enabled(bot) {
		this.handleMessage = async (message) => {
			// TODO: Hard coded discord bot lists
			if (message.author.id !== bot.client.user.id && message.guild.id.toString() !== "264445053596991498" && message.guild.id.toString() !== "110373943822540800" && message.guild.id.toString() !== "374071874222686211") {
				const spamTrigger = bot.userConfig.get("spamTrigger", message.guild.id);
				const preventInvites = bot.userConfig.get("protection.invites", message.guild.id);
				const preventLinks = bot.userConfig.get("protection.links", message.guild.id);
				const preventProfanity = bot.userConfig.get("protection.profanity", message.guild.id);
				const preventExplicit = bot.userConfig.get("protection.explicit", message.guild.id);

				// TODO: Checking for embeds will probably be better
				const urlRegex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;

				if (message.deletable) {
					if (preventExplicit && !message.channel.nsfw) {
						const attachments = message.attachments.array();

						if (attachments.length > 0) {
							let filtered = false;

							for (let i = 0; i < attachments.length; i++) {
								if (attachments[i].width) {
									filtered = await this.scan(attachments[i].url, message, apiKey);
								}

								if (filtered) {
									return;
								}
							}
						}

						for (let i = 0; i < message.embeds.length; i++) {
							if (message.embeds[i].type === "image") {
								const bad = await this.scan(message.embeds[i].url, message, apiKey);

								if (bad) {
									return;
								}
							}
						}
					}

					if (preventProfanity) {
						for (let i = 0; i < badWords.length; i++) {
							if (message.content.includes(badWords[i])) {
								message.delete();

								return;
							}
						}
					}

					if (preventLinks && urlRegex.test(message.content)) {
						message.delete();
					}
					else if (preventInvites && (/https?:\/\/discord\.gg\/[a-zA-Z0-9]+/.test(message.content) || /https?:\/\/discordapp\.com\/invite\/[a-zA-Z0-9]+/.test(message.content))) {
						message.delete();
					}
				}

				// TODO: Temporarly disabled
				/* bot.database.getMessages(message.author.id, (messages) => {
					let streak = 0;

					for (let i = 0; i < messages.length; i++) {
						if (messages[i].text === message.content.toString()) {
							streak++;
						}
					}

					if (streak === spamTrigger) {
						this.warn(message, bot);
					}
				}, spamTrigger); */
			}
		};

		bot.client.on("message", this.handleMessage);
	}

	disabled(bot) {
		bot.client.removeListener("message", this.handleMessage);
	}
}
