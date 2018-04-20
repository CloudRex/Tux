import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const { guild } = context.message;

		context.respond({
			Name: guild.name,
			Owner: guild.dev ? guild.dev.displayName : "Unknown",
			Users: guild.members.array().filter((member) => !member.user.bot).length,
			Bots: guild.members.array().filter((member) => member.user.bot).length,
			"Total Members": guild.memberCount,
			Region: guild.region,
			"Default Channel": guild.defaultChannel ? guild.defaultChannel : "None",
			"Custom Emojis": guild.emojis.array().length,
			"Created At": guild.createdAt
		}, "", "", guild.iconURL);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "info",
		description: "View information about the server",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true,
		price: 0
	}
};
