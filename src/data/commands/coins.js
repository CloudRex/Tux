import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		let id = context.arguments[0];

		if (context.arguments.length === 0) {
			id = context.message.author.id;
		}

		const member = context.message.guild.member(id.replace('<@', '').replace('>', ''));

		if (member.bot) {
			context.respond(`Bots can't have points`);
			return;
		}

		const coins = await context.bot.database.getUserPoints(id);

		context.respond(`:small_orange_diamond:**${member.displayName}** has **${coins}** coins`, "", "GREEN");
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
		category: CommandCategoryType.Economy
	}
};
