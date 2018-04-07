import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";

export default {
	async executed(context) {
		const items = await context.bot.database.getItems(context.message.author.id);
		const response = new MessageBuilder();

		let totalWorth = 0;

		if (items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				response.add(`:${items[i].key}:x${items[i].amount} (:small_orange_diamond:**${items[i].value}**)`);

				if (i < items.length - 1) {
					response.add(", ");
				}

				totalWorth += items[i].value;
			}

			response.addLine().addLine().add(`Total worth: :small_orange_diamond:**${totalWorth}**`);
		}
		else {
			response.add("You don't have any items");
		}

		context.respond(response.build(), `${context.message.author.username}'s Inventory`, "WHITE");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "inventory",
		description: "View your inventory",
		accessLevel: AccessLevelType.Member,
		aliases: ["inv"],
		maxArguments: 0
	}
};
