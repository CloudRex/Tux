import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";

export default {
	async executed(context) {
		let id = context.arguments[0];

		if (context.arguments.length === 0) {
			id = context.message.author.id;
		}

		const member = context.message.guild.member(id.replace('<@', '').replace('>', ''));

		if (member.bot) {
			context.respond(`Bots can't have items`);
			return;
		}

		const items = await context.bot.database.getItems(member.id);
		const response = new MessageBuilder();

		let totalWorth = 0;

		if (items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				response.add(`:${items[i].key}:x${items[i].amount} (:small_orange_diamond:**${items[i].value}**)`);

				if (i < items.length - 1) {
					response.add(", ");
				}

				totalWorth += items[i].value * items[i].amount;
			}

			response.addLine().addLine().add(`Total worth::small_orange_diamond:**${totalWorth}**`);
		}
		else {
			response.add(":sob: Oh noes! You don't have any items.");
		}

		context.respond(response.build(), `${member.displayName}'s Inventory`, "WHITE");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "inventory",
		description: "View your inventory",
		accessLevel: AccessLevelType.Member,
		aliases: ["inv"],
		maxArguments: 1
	}
};
