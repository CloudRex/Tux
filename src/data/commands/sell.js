import AccessLevelType from "../../core/access-level-type";

export default {
	async executed(context) {
		if (context.arguments.length === 1) {
			if (context.arguments[0] === "*") {
				// TODO
			}
			else {
				const item = await context.bot.database.getItem(context.message.author.id, context.arguments[0]);

				if (item) {
					await context.bot.database.removeItem(context.message.author.id, context.arguments[0]);

					const points = await context.bot.database.addUserPoints(context.message.author.id, item.value);

					context.respond(`Sold :${item.key}:x1 for:small_orange_diamond:**${item.value}**. You now have:small_orange_diamond:${points}`, "", "GREEN");
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
		maxArguments: 1
	}
};
