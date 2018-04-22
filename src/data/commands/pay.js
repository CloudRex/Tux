import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const senderBalance = await context.bot.database.getUserPoints(context.sender.id);
		const recipient = context.message.mentions.users.array()[0];
		const amount = parseInt(context.arguments[1]);

		if (recipient.id === context.sender.id) {
			context.fail("You can't pay yourself.");

			return;
		}

		if (amount > 0) {
			if (senderBalance >= amount) {
				await context.bot.database.addUserPoints(context.sender.id, -amount);
				await context.bot.database.addUserPoints(recipient.id, amount);

				context.ok(`Successfully payed **${amount}** coins to **${recipient.username}**.`);
			}
			else {
				context.fail("You don't have enough coins.");
			}
		}
		else {
			context.fail("You can't pay that amount.");
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
		enabled: true
	}
};
