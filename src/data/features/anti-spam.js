import Feature from "./feature";

const spamTrigger = 4;

export default class AntiSpam extends Feature {
	constructor() {
		super("Anti-Spam", "anti-spam", "Anti-spamming system.");
	}

	canEnable(bot) {
		return true;
	}

	enabled(bot) {
		bot.client.on("message", (message) => {
			if (message.author.id !== bot.client.user.id) {
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
