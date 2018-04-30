import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";
import DbUser from "../../database/db-user";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const response = new MessageBuilder();

		const topUsers = DbUser.fromResults(await context.bot.database.db("users").select().orderBy("points", "desc")
			.then());

		for (let i = 0; i < topUsers.length; i++) {
			const userInfo = context.bot.client.users.get(topUsers[i].userId);

			context.bot.log.info(topUsers[i].userId);
			context.bot.log.info(userInfo);

			if (userInfo && (i < 10 || topUsers[i].userId === context.sender.id)) {
				let emoji = "<a:tuxsilver:438011439140306944>";
				let you = "";

				if (i < 3) {
					emoji = "<a:tuxgold:438010719783616512>";
				}

				if (userInfo.id === context.sender.id) {
					you = "(you)";
				}

				response.add(`${emoji} #${i + 1} : *${userInfo.username}* with **${topUsers[i].points}** coins ${you}`).line();
			}
		}

		context.respond({
			text: response.build(),
			title: "Tux Coins Leaderboard",
			color: "BLUE"
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "leaderboard",
		description: "View the points leaderboard",
		accessLevel: AccessLevelType.Member,
		aliases: ["lb"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Economy,
		enabled: true
	}
};
