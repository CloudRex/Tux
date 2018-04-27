import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const { guild } = context.message;
		const computeScore = (g) => Math.round(((g.memberCount / 100) + g.channels.array().length + g.emojis.array().length + g.roles.array().length));

		const classifyScore = (score) => {
			let result = "Low";

			if (score >= 30) {
				result = "Medium";
			}

			if (score >= 50) {
				result = "High";
			}

			if (score >= 100) {
				result = ":fire: Extreme";
			}

			if (score >= 150) {
				result = ":fire: __ULTIMATE__ :fire:";
			}

			return result;
		};

		TimeAgo.locale(en);

		const score = computeScore(guild);
		const timeAgo = new TimeAgo("en-US");

		// TODO: Joined At
		context.sections({
			Name: guild.name,
			Owner: guild.dev ? guild.dev.displayName : "Unknown",
			Users: guild.members.array().filter((member) => !member.user.bot).length,
			Bots: guild.members.array().filter((member) => member.user.bot).length,
			"Total Members": guild.memberCount,
			Region: guild.region,
			"Default Channel": guild.defaultChannel ? guild.defaultChannel : "None",
			"Custom Emojis": guild.emojis.array().length,
			"Created At": `${timeAgo.format(Date.now() - guild.createdAt, "time")} ago`,
			Score: `:star: ${score} (**${classifyScore(score)}**)`
			// TODO: colors, thumbnail
		}, "", "GREEN", guild.iconURL);
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
		enabled: true
	}
};
