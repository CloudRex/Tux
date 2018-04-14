import Feature from "./feature";
import Utils from "../../core/utils";
import DbItem from "../../database/db-item";

const fs = require("fs");

export default class TreasureFinder extends Feature {
	constructor() {
		super("Treasure Finder", "treasure-finder", "Find treasures and sell them for points");

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

		bot.client.on("message", async (message) => {
			// TODO: Hard coded discord bot lists guilds
			if (!message.author.bot && message.guild.id !== "264445053596991498" && message.guild.id !== "110373943822540800") {
				if (message.author.id !== bot.client.user.id) {
					const treasure = this.treasures[Utils.getRandomInt(0, this.treasures.length - 1)];
					const chanceMultiplier = bot.userConfig.get("chanceMultiplier");

					if (Utils.getRandomInt(0, treasure.value * chanceMultiplier) === 0) {
						const msg = await message.channel.send(`**${message.author.username}** found a :${treasure.key}: (**${treasure.value * chanceMultiplier}** coins, 1 in ${treasure.value * chanceMultiplier} chances)\nHurry and catch it before it's gone!`).catch(() => {
						});

						if (msg) {
							msg.delete(4000);
							msg.react("🖐");

							this.waiting.push({
								id: message.author.id.toString(),
								messageId: msg.id,
								treasure: treasure
							});
						}
					}
				}
			}
		});


		const handleReaction = async (reaction, user) => {
			if (reaction.emoji.name === "🖐") {
				const index = this.getWaitingIndex(user.id);
				const chanceMultiplier = bot.userConfig.get("chanceMultiplier");

				if (index !== null && index !== undefined && this.waiting[index].messageId === reaction.message.id) {
					const { treasure } = this.waiting[index];

					console.log(`message: ${reaction.message.id}`);
					console.log(`waiting: ${this.waiting[index].messageId}`);

					bot.database.addItem(new DbItem(null, user.id, treasure.name, treasure.key, treasure.value, 1));
					this.waiting.splice(index, 1);
					// reaction.message.clearReactions();
					reaction.message.edit(`**${user.username}** has captured a :${treasure.key}: worth **${treasure.value * chanceMultiplier}**! Use \`inv\``);

					if (reaction.message) {
						reaction.message.delete(6000);
					}

					// TODO: Debug only
					console.log(`${user.username}@${reaction.message.guild.name}@${reaction.message.channel.name} caught a ${treasure.name} (${treasure.value * chanceMultiplier})`);
				}
			}
		};

		bot.client.on("messageReactionAdd", handleReaction);
		bot.client.on("messageReactionRemove", handleReaction);
	}
}
