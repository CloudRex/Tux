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

	enabled(bot) {
		this.waiting = [];

		bot.client.on("message", async (message) => {
			if (!message.author.bot) {
				if (message.author.id !== bot.client.user.id) {
					const treasure = this.treasures[Utils.getRandomInt(0, this.treasures.length - 1)];

					if (Utils.getRandomInt(0, treasure.value) === 0) {
						console.log(`${message.author.username}@${message.guild.name} found a ${treasure.name}`);

						const msg = await message.channel.send(`You've found a :${treasure.name}: (**${treasure.value}** points, 1 in ${treasure.value} chances)\nHurry and catch it before it's gone!`).catch((error) => {
						});

						if (msg) {
							msg.delete(4000);
							msg.react("🖐");
							this.waiting.push(message.author.id);
						}
					}
				}
			}
		});

		bot.client.on("messageReactionAdd", (reaction, user) => {
			if (reaction.emoji.name === "🖐") {
				if (this.waiting.includes(user.id)) {
					reaction.message.clearReactions();
					reaction.message.edit("You've obtained **50** points!");
					reaction.message.delete(4000);
					this.waiting.splice(this.waiting.indexOf(user.id), 1);
					bot.database.addUserPoints(user.id, 50);
					console.log(`${user.username}@${reaction.message.guild.name} caught the penguin`);
				}
			}
		});
	}
}
