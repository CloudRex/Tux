import Feature from "./feature";

export default class AntiSpam extends Feature {
	constructor() {
		super("Anti-Spam", "anti-spam", "Advanced spam protection");
	}

	canEnable(bot) {
		return true;
	}

	enabled(bot) {
		this.handleMessage = async (message) => {
			// TODO: Disabled bue to double-add user bug
			// const dbUser = await bot.database.getUser(message.author.id);

			let score = 0;

			const x = {
				daysJoined: message.member ? Math.round((new Date() - new Date(message.member.joinedAt)) / 1000 / 60 / 60 / 24) : null,
				accountCreated: Math.round((new Date() - new Date(message.author.createdTimestamp)) / 1000 / 60 / 60 / 24)
			};

			// Join date
			if (message.member) {
				if (x.daysJoined <= 1) {
					score += 45;
				}
				else if (x.daysJoined <= 7) {
					score += 25;
				}
			}

			// Created date
			if (x.accountCreated <= 1) {
				score += 45;
			}
			else if (x.accountCreated <= 7) {
				score += 25;
			}

			// Message length
			if (message.content.length > 40) {
				score += 25;
			}
			else if (message.content.length < 13) {
				score += 30;
			}

			if (message.content.length <= 3) {
				score += 20;
			}

			// No spaces
			if (!message.content.includes(" ") && message.content.length >= 7) {
				score += 65;
			}

			// Repeated words
			const words = message.content.split(" ");
			const memory = [];

			for (let i = 0; i < words.length; i++) {
				if (!memory.includes(words[i])) {
					memory.push(words[i]);
				}
				else {
					score += 25;
				}
			}

			// Mentions
			const { mentions } = message;

			if (mentions.users.size >= 4 || mentions.roles.array() >= 4) {
				score += (mentions.users.size * 20) + (mentions.roles.size * 25);
			}

			if (mentions.everyone) {
				score += 25;
			}

			// Previous threshold strikes
			// TODO: Disabled bue to double-add user bug
			// score *= (dbUser.spamThresholdTrikes ? dbUser.spamThresholdTrikes + 1 : 1);

			// --- FINAL REVIEW ---
			if (score >= 100) {
				if (message.deletable) {
					message.delete();
				}
			}

			console.log(`score:${score}`);
		};

		bot.client.on("message", this.handleMessage);
	}

	disabled(bot) {
		bot.client.removeListener("message", this.handleMessage);
	}
}
