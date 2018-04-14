import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const { guild } = context.message;

		context.respond({
			Name: guild.name,
			Owner: guild.owner.displayName,
			Users: guild.memberCount,
			Region: guild.region,
			"Default Channel": guild.defaultChannel,
			"Created At": guild.createdAt
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "info",
		description: "View information about the server",
		accessLevel: AccessLevelType.Moderator,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
