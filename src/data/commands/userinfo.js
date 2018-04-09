import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		const member = context.message.guild.member(context.arguments[0]);

		if (member) {
			context.respond({
				Id: member.id,
				Username: member.user.username,
				"Created At": member.user.createdAt,
				"Joined At": member.joinedAt,
				"Last message": member.user.lastMessage,
				Verified: member.user.verified,
				Bot: member.user.bot
			}, "", "GREEN", "", "", member.avatarURL);
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
		maxArguments: 1
	}
};
