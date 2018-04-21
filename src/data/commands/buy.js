import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		/* const command = context.bot.commands.getByBase(context.arguments[0]);

		if (command) {
			if (command.price > 0) {
				const coins = await context.bot.database.getUserPoints(context.message.author.id);

				if (coins >= command.price) {
					await context.bot.database.addUserPoints(context.message.author.id, -command.price);
					await context.bot.database.addUserCommand(context.message.author.id, command.base);
					context.respond(`You've successfully bought the **${command.base}** command for :small_orange_diamond:**${command.price}**.`, "", "GREEN");
				}
				else {
					context.respond(`You don't have enough coins! You need :small_orange_diamond:**${command.price - coins}** more to buy that command.`, "", "RED");
				}
			}
			else {
				context.respond("That command may not be bought.", "", "RED");
			}
		}
		else {
			context.respond("That command does not exist.", "", "RED");
		} */
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "buy",
		description: "Buy a command",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			command: "!string"
		},

		category: CommandCategoryType.General,
		enabled: false
	}
};
