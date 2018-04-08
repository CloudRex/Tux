import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		const userInfo = context.bot.client.users.find("id", context.arguments[0]);

		if (userInfo) {
			context.respond({
				Id: userInfo.id,
				Username: userInfo.username,
				"Created At": userInfo.createdAt,
				"Joined At": userInfo.joinedAt,
				"Last message": userInfo.lastMessage,
				Verified: userInfo.verified,
				Bot: userInfo.bot
			}, "", "GREEN", "", "", userInfo.avatarURL);
		}
		else {
			context.respond("User not found");
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
