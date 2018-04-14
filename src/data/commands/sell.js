import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const fs = require("fs");
// TODO: Better loading system (class) and path musn't be hard coded
const treasures = JSON.parse(fs.readFileSync("src/items.json").toString());

export default {
	treasures: null,

	async executed(context) {
		if (context.arguments.length === 1) {
			let itemKey = context.arguments[0];

			for (let i = 0; i < treasures.length; i++) {
				const treasure = treasures[i];

				if (treasure.key === itemKey || treasure.name === itemKey || treasure.aliases.includes(itemKey)) {
					itemKey = treasure.key;
					break;
				}
			}

			if (itemKey === "*" || itemKey === "all") {
				const items = await context.bot.database.getItems(context.message.author.id);

				let totalWorth = 0;

				if (items.length > 0) {
					for (let i = 0; i < items.length; i++) {
						totalWorth += items[i].value * items[i].amount;
					}
					const points = await context.bot.database.addUserPoints(context.message.author.id, totalWorth);

					await context.bot.database.removeAllItems(context.message.author.id);

					context.respond(`Sold ${items.length} item(s) for:small_orange_diamond:**${totalWorth}**. You now have:small_orange_diamond:**${points}**`, "", "GREEN");
				}
				else {
					context.respond(":sob: Oh noes! You don't have any items to sell.");
				}
			}
			else {
				const item = await context.bot.database.getItem(context.message.author.id, itemKey);

				if (item) {
					await context.bot.database.removeItem(context.message.author.id, itemKey);

					const points = await context.bot.database.addUserPoints(context.message.author.id, item.value);

					context.respond(`Sold :${item.key}:x1 for:small_orange_diamond:**${item.value}**. You now have:small_orange_diamond:**${points}**`, "", "GREEN");
				}
				else {
					context.respond("You don't own that item.", "", "RED");
				}
			}
		}
		else {
			context.respond("Expecting 1 argument: The item to sell");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "sell",
		description: "Sell an item from your inventory",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			item: "!string"
		},

		category: CommandCategoryType.Economy,
		enabled: true,
		price: 0
	}
};
