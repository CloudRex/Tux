import Feature from "./feature";

const fs = require("fs");

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

	enabled(bot) {
		const badWords = this.getBadWords();

		bot.client.on("message", (message) => {
			// TODO: Hard coded discord bot lists
			if (message.author.id !== bot.client.user.id && message.guild.id.toString() !== "264445053596991498" && message.guild.id.toString() !== "110373943822540800" && message.guild.id.toString() !== "374071874222686211") {
				const { spamTrigger } = bot.userConfig;
				const preventInvites = bot.userConfig.get("preventInvites");
				const preventLinks = bot.userConfig.get("preventLinks");
				const preventProfanity = bot.userConfig.get("preventProfanity");
				const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

				if (message.deletable) {
					if (preventProfanity) {
						for (let i = 0; i < badWords.length; i++) {
							if (message.content.includes(badWords[i])) {
								message.delete();

								return;
							}
						}
					}
					else if (preventLinks && urlRegex.test(message.content)) {
						message.delete();

						return;
					}
					else if (preventInvites && /https:\/\/discord\.gg\/[a-zA-Z0-9]+/.test(message.content)) {
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
