import Feature from "./feature";
import Utils from "../../core/utils";

export default class TreasureFinder extends Feature {
	constructor() {
		super("Treasure Finder", "treasure-finder", "Find treasures and sell them for points");

		this.treasures = [
			{
				name: "penguin",
				key: "penguin",
				value: 40
			},
			{
				name: "cat",
				key: "cat",
				value: 25
			},
			{
				name: "dog",
				key: "dog",
				value: 25
			},
			{
				name: "monkey",
				key: "monkey",
				value: 30
			},
			{
				name: "carrot",
				key: "carrot",
				value: 20
			},
			{
				name: "potato",
				key: "potato",
				value: 20
			}
		];
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
					const treasure = this.treasures[0];

					if (Utils.getRandomInt(0, treasure.value) === 0) {
						console.log(`${message.author.username}@${message.guild.name} found a ${treasure.name}`);

						const msg = await message.channel.send(`You've found a :${treasure.name}: (**${treasure.value}** points, 1 in ${treasure.value} chances)\nHurry and catch it before it's gone!`).catch((error) => {
						});

						if (msg) {
							msg.delete(5000);
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

				if (index !== null) {
					const { treasure } = this.waiting[index];
					const points = await bot.database.addUserPoints(user.id, treasure.value);

					this.waiting.splice(index, 1);
					reaction.message.clearReactions();
					reaction.message.edit(`You've obtained **${treasure.value}** points and now have a total of **${points}** points`);
					reaction.message.delete(5000);

					console.log(`${user.username}@${reaction.message.guild.name} caught a ${treasure.name} (${treasure.value})`);
				}
			}
		});
	}
}
