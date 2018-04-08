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

	enabled(bot) {
		this.waiting = [];

		bot.client.on("message", async (message) => {
			if (!message.author.bot) {
				if (message.author.id !== bot.client.user.id) {
					const treasure = this.treasures[Utils.getRandomInt(0, this.treasures.length - 1)];

					if (Utils.getRandomInt(0, treasure.value) === 0) {
						console.log(`${message.author.username}@${message.guild.name}@${message.channel.name} found a ${treasure.name}`);

						const msg = await message.channel.send(`You've found a :${treasure.key}: (**${treasure.value}** points, 1 in ${treasure.value} chances)\nHurry and catch it before it's gone!`).catch(() => {
						});

						if (msg) {
							msg.delete(4000);
							msg.react("🖐");

							this.waiting.push({
								id: message.author.id.toString(),
								treasure: treasure
							});
						}
					}
				}
			}
		});

		bot.client.on("messageReactionAdd", async (reaction, user) => {
			if (reaction.emoji.name === "🖐") {
				const index = this.getWaitingIndex(user.id);

				if (index !== null && index !== undefined) {
					const { treasure } = this.waiting[index];

					bot.database.addItem(new DbItem(null, user.id, treasure.name, treasure.key, treasure.value, 1));
					this.waiting.splice(index, 1);
					// reaction.message.clearReactions();
					reaction.message.edit(`**${user.username}** has captured a :${treasure.key}: worth **${treasure.value}**`);
					reaction.message.delete(6000);

					// TODO: Debug only
					console.log(`${user.username}@${reaction.message.guild.name}@${reaction.message.channel.name} caught a ${treasure.name} (${treasure.value})`);
				}
			}
		});
	}
}
