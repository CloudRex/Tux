import Feature from "./feature";
import Utils from "../../core/utils";

export default class TreasureFinder extends Feature {
	constructor() {
		super("Treasure Finder", "treasure-finder", "Find treasures and sell them for points");
	}

	canEnable(bot) {
		return true;
	}

	enabled(bot) {
		this.waiting = [];

		bot.client.on("message", async (message) => {
			if (message.author.id !== bot.client.user.id) {
				if (Utils.getRandomInt(0, 50) === 0) {
					console.log(`${message.author.username} found a penguin`);

					const msg = await message.channel.send("You've found a **rare** :penguin: (**50** points)\nHurry and catch it before it's gone!").catch((error) => {});

					msg.delete(4000);

					if (msg) {
						msg.react("🖐");
						this.waiting.push(message.author.id);
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
					console.log(`${user.username} caught the penguin`);
				}
			}
		});
	}
}
