import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		let id = context.arguments[0];

		if (context.arguments.length === 0) {
			id = context.message.author.id;
		}

		const { user } = context.message.guild.member(id);

		if (user.bot) {
			context.fail(":robot: Bots can't have coins!");

			return;
		}

		const coins = await context.bot.database.getUserPoints(id);

		context.ok(`:small_orange_diamond:**${user.username}** has **${coins}** coins`);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "coins",
		description: "View how many coins you have",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Economy,
		enabled: true
	}
};
