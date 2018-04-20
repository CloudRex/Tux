import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	treasures: null,

	async executed(context) {
		const senderBalance = await context.bot.database.getUserPoints(context.sender.id);
		const recipient = context.message.mentions.users.array()[0];
		const amount = parseInt(context.arguments[1]);

		if (amount > 0) {
			if (senderBalance >= amount) {
				await context.bot.database.addUserPoints(context.sender.id, -amount);
				await context.bot.database.addUserPoints(recipient.id, amount);
				context.respond(`Successfully payed **${amount}** coins to **${recipient.username}**.`, "", "GREEN");
			}
			else {
				context.respond("You don't have enough coins.", "", "RED");
			}
		}
		else {
			context.respond("You can't pay that amount.", "", "RED");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "pay",
		description: "Pay another player",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 2,

		args: {
			recipient: "!:user",
			amount: "!number"
		},

		category: CommandCategoryType.Economy,
		enabled: true,
		price: 0
	}
};
