import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const id = context.arguments.length === 1 ? context.arguments[0] : context.message.author.id;
		const member = context.message.guild.member(id);
		const points = await context.bot.database.getUserPoints(id.replace('<@', '').replace('>', ''));

		if (member) {
			// TODO: avatar
			context.sections({
				Id: member.id,
				Username: member.user.username,
				"Created At": member.user.createdAt,
				"Joined At": member.joinedAt,
				"Last message": member.user.lastMessage,
				Verified: member.user.verified,
				Type: member.user.bot ? ":robot: Robot" : ":smiley: Human",
				Coins: `:small_orange_diamond:${points}`
			}, "", "GREEN", member.user.avatarURL);
		}
		else {
			context.fail("User not found.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "userinfo",
		description: "Displays information about a specific user",
		accessLevel: AccessLevelType.Member,
		aliases: ["uinfo", "inspect"],
		maxArguments: 1,

		args: {
			user: ":user"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
