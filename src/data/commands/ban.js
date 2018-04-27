import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const { user } = context.message.guild.member(context.arguments[0]);

		// TODO: Catch not well positioned, not executing as expected (position before then)
		context.message.guild.ban(user.id, {
			reason: context.arguments[1]
		}).then(() => context.ok(`:zap: And just like that, **${user.username}** was long gone for \`${context.arguments[1]}\``).catch((error) => {
			context.fail(`Operation failed to complete. (${error.message})`);
		}));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ban",
		description: "Bans a member from the server",
		accessLevel: AccessLevelType.Admin,
		aliases: [],
		maxArguments: 3,

		args: {
			user: "!:user",
			reason: "!string",
			time: ":minuteTime"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
