import Feature from "./feature";

const fs = require("fs");
const snekfetch = require("snekfetch");

export default class AntiSpam extends Feature {
	constructor() {
		super("Anti-Spam", "anti-spam", "Anti-spamming system.");
	}

	canEnable(bot) {
		return true;
	}

	getBadWords() {
		return JSON.parse(fs.readFileSync("src/bad-words.json"));
	}

	scan(url, message, key) {
		return new Promise((resolve) => {
			// TODO: Catch error
			// TODO: Add failure and why (message/status)
			snekfetch.post("https://www.picpurify.com/analyse.php").send({
				url_image: url,
				task: "porn_detection,drug_detection,gore_detection",
				API_KEY: key
			}).then(async (result) => {
				const response = JSON.parse(result.body.toString());

				if (response.final_decision === "KO") {
					const sent = await message.reply("Your message was deleted because it contained explicit content which is not permitted here. This incident has been reported.");

					message.delete();
					resolve(true);
				}
				else {
					resolve(false);
				}
			});
		});
	}

	// TODO: Report incident
	enabled(bot) {
		const badWords = this.getBadWords();
		const apiKey = bot.settings.general.picPurifyApiKey;

		bot.client.on("message", async (message) => {
			// TODO: Hard coded discord bot lists
			if (message.author.id !== bot.client.user.id && message.guild.id.toString() !== "264445053596991498" && message.guild.id.toString() !== "110373943822540800" && message.guild.id.toString() !== "374071874222686211") {
				const { spamTrigger } = bot.userConfig;
				const preventInvites = bot.userConfig.get("preventInvites");
				const preventLinks = bot.userConfig.get("preventLinks");
				const preventProfanity = bot.userConfig.get("preventProfanity");
				const preventExplicit = bot.userConfig.get("preventExplicit");
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

						return;
					}

					if (preventInvites && /https:\/\/discord\.gg\/[a-zA-Z0-9]+/.test(message.content)) {
						message.delete();

						return;
					}
				}

				bot.database.getMessages(message.author.id, (messages) => {
					let streak = 0;

					for (let i = 0; i < messages.length; i++) {
						if (messages[i].text === message.content.toString()) {
							streak++;
						}
					}

					if (streak === spamTrigger) {
						this.warn(message, bot);
					}
				}, spamTrigger);
			}
		});
	}

	warn(message, bot) {
		bot.database.getWarningCount(message.author.id, (warnings) => {
			console.log(`warnings -> ${warnings}`);

			if (warnings !== 3 || warnings < 3) {
				if (warnings === 1) {
					message.reply("Warning #1: Do not spam");
				}
				else if (warnings === 2) {
					message.reply("Warning #2: Last warning. Do not spam.");
				}

				bot.database.addWarning(message.author.id);
			}
			else {
				message.reply("You've been temporally banned from this server.");

				message.guild.ban(message.author, {
					days: 1,
					reason: "Spamming"
				});
			}
		});
	}
}
