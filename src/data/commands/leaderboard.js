import AccessLevelType from "../../core/access-level-type";
import MessageBuilder from "../../core/message-builder";
import DbUser from "../../database/db-user";

export default {
	async executed(context) {
		const response = new MessageBuilder();
		const topUsers = DbUser.fromResults(await context.bot.database.db("users").select().limit(10).orderBy("points", "desc").then());

		for (let i = 0; i < topUsers.length; i++) {
			const userInfo = context.bot.client.users.find("id", topUsers[i].userId.toString());

			console.log(userInfo);

			if (userInfo) {
				response.add(`#${i + 1} : __${userInfo.username}__ with ** ${topUsers[i].points}** points`).addLine();
			}
		}

		context.respond(response.build());
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "leaderboard",
		description: "View the points leaderboard",
		accessLevel: AccessLevelType.Member,
		aliases: ["lb"],
		maxArguments: 0
	}
};
