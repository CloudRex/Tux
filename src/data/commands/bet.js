import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

export default {
	async executed(context) {
		const amount = context.arguments.length === 0 ? 50 : parseInt(context.arguments[0]);

		if (amount < 50) {
			context.fail("Minimum bet is :small_orange_diamond:50 or higher.");
		}
		else {
			const coins = await context.bot.database.getUserPoints(context.sender.id);

			if (coins >= amount) {
				const win = Utils.getRandomInt(0, 2);

				if (win === 1) {
					await context.bot.database.addUserPoints(context.sender.id, amount);
					context.ok(`**You won!** You've acquired${context.emojis.get("silver-coin")}**${amount}**.`);
				}
				else {
					await context.bot.database.addUserPoints(context.sender.id, -amount);

					// TODO: Shouldn't be fail. (it auto deletes)
					context.fail(`**Too bad!** You've lost${context.emojis.get("silver-coin")}**${amount}**.`);
				}
			}
			else {
				context.fail("You don't have that amount of coins.");
			}
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "bet",
		description: "Bet some coins with a 50% chance of winning",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			amount: ":positiveNumber"
		},

		category: CommandCategoryType.Fun,
		enabled: true
	}
};
