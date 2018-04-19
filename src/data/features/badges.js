import Feature from "./feature";
import BadgeType from "../../core/BadgeType";

const fs = require("fs");

export default class Badges extends Feature {
	constructor() {
		super("Badges", "treasure-finder", "Earn badges by doin stuff");

		// TODO: Better loading system (class) and path musn't be hard coded
		this.treasures = JSON.parse(fs.readFileSync("src/items.json").toString());
	}

	canEnable(bot) {
		return true;
	}

	// TODO: Unknown message error is probably caused by deleting non-existing messages somewhere in this code
	enabled(bot) {
		const award = async (user, badge, context) => {
			await context.bot.database.addUserBadge(user.id, badge);
			context.respond(`:medal: **${user.username}** has earned the **${BadgeType.getName(badge)}** badge!`, "", "GOLD");
		};

		bot.events.on("commandExecuted", async (command, context) => {
			// TODO: Hard coded discord bot lists guilds
			if (!context.message.author.bot && context.message.guild.id.toString() !== "264445053596991498" && context.message.guild.id.toString() !== "110373943822540800" && context.message.guild.id.toString() !== "374071874222686211") {
				if (context.message.author.id !== bot.client.user.id) {
					const { badges } = (await bot.database.getUser(context.sender.id));

					switch (command.base) {
						case "inventory": {
							const inventory = await bot.database.getItems(context.sender.id);

							if (inventory.length === 0 && !badges.includes(BadgeType.EmptyInventory)) {
								award(context.sender, BadgeType.EmptyInventory, context);
							}
						}
					}
				}
			}
		});
	}
}
