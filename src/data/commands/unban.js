import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			// const { username } = context.message.guild.member(context.arguments[0]).user;

			context.message.guild.ban(context.arguments[0], context.arguments[1])
				.then(() => context.ok(`:zap: After many days in the lonely desert, **todo** was finally back home for \`${context.arguments[1]}\`.`))
				.catch((error) => {
					context.fail(`Operation failed to complete. (${error.message})`);
				});
		}
		else {
			context.fail("Invalid amount of arguments.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "unban",
		description: "Unbans a member from the server",
		accessLevel: AccessLevelType.Admin,
		aliases: ["uban"],
		maxArguments: 2,

		args: {
			user: "!:user"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
