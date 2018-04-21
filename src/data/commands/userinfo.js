import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		let id = context.arguments[0];

		if (context.arguments.length === 0) {
			id = context.message.author.id;
		}

		const member = context.message.guild.member(id);
		const points = await context.bot.database.getUserPoints(id.replace('<@', '').replace('>', ''));

		if (member) {
			context.respond({
				Id: member.id,
				Username: member.user.username,
				"Created At": member.user.createdAt,
				"Joined At": member.joinedAt,
				"Last message": member.user.lastMessage,
				Verified: member.user.verified,
				Bot: member.user.bot,
				Coins: `:small_orange_diamond:${points}`
			}, "", "GREEN", member.user.avatarURL);
		}
		else {
			context.respond("User not found.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "userinfo",
		description: "Displays information about a specific user",
		accessLevel: AccessLevelType.Member,
		aliases: ["uinfo"],
		maxArguments: 1,

		args: {
			user: ":user"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
