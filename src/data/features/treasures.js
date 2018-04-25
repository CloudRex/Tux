import Feature from "./feature";
import Utils from "../../core/utils";
import DbItem from "../../database/db-item";

const fs = require("fs");

export default class Treasures extends Feature {
	constructor() {
		super("Treasures", "treasures", "Randomly find and catch items");

		// TODO: Better loading system (class) and path musn't be hard coded
		this.treasures = JSON.parse(fs.readFileSync("src/items.json").toString());
	}

	canEnable(bot) {
		return true;
	}

	getWaitingIndex(userId) {
		for (let i = 0; i < this.waiting.length; i++) {
			if (this.waiting[i].id === userId.toString()) {
				return i;
			}
		}

		return null;
	}

	// TODO: Unknown message error is probably caused by deleting non-existing messages somewhere in this code
	enabled(bot) {
		this.waiting = [];

		this.handleMessage = async (message) => {
			// TODO: Hard coded discord bot lists guilds
			const botListGuilds = bot.userConfig.get("global.bot-list-guilds");
			if (!message.author.bot && !botListGuilds.includes(message.guild.id.toString())) {
				if (message.author.id !== bot.client.user.id) {
					const treasure = this.treasures[Utils.getRandomInt(0, this.treasures.length - 1)];
					const chanceMultiplier = bot.userConfig.get("global.chance-multiplier");

					if (Utils.getRandomInt(0, treasure.value * chanceMultiplier) === 0) {
						const msg = await message.channel.send(`**${message.author.username}** found a :${treasure.key}: (**${treasure.value}** coins, 1 in ${treasure.value * chanceMultiplier} chances)\nHurry and catch it before it's gone!`).catch(() => {
						});

						if (msg) {
							msg.react("🖐");

							const deleteTimeout = bot.client.setTimeout(() => {
								msg.delete();
							}, 4000);

							this.waiting.push({
								id: message.author.id.toString(),
								messageId: msg.id,
								treasure: treasure,
								deleteTimeout: deleteTimeout
							});
						}
					}
				}
			}
		};

		bot.client.on("message", this.handleMessage);

		const handleReaction = async (reaction, user) => {
			if (!user.bot) {
				if (reaction.emoji.name === "🖐") {
					const index = this.getWaitingIndex(user.id);

					if (index !== null && index !== undefined && this.waiting[index].messageId === reaction.message.id) {
						const { treasure } = this.waiting[index];

						bot.database.addItem(new DbItem(null, user.id, treasure.name, treasure.key, treasure.value, 1));
						bot.client.clearTimeout(this.waiting[index].deleteTimeout);
						this.waiting.splice(index, 1);
						// reaction.message.clearReactions();

						// TODO: Probably giving out error, make sure it awaits then saves then delete below using var
						const sentMsg = await reaction.message.edit(`**${user.username}** has captured a :${treasure.key}: worth **${treasure.value}**! Use \`inv\` to view your inventory.`);

						if (sentMsg.deletable) {
							sentMsg.delete(4000);
						}
					}
				}
			}
		};

		bot.client.on("messageReactionAdd", handleReaction);
		bot.client.on("messageReactionRemove", handleReaction);
	}

	disabled(bot) {
		bot.client.removeListener("message", this.handleMessage);
	}
}
