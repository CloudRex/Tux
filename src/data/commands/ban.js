import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

export default {
	executed(context) {
		const { user } = context.message.guild.member(Utils.resolveId(context.arguments[0]));

		context.message.guild.ban(user.id, {
			reason: context.arguments[1]
		}).then(() => context.respond(`:zap: And just like that, **${user.username}** was long gone for \`${context.arguments[1]}\`.`, "", "GREEN")).catch((error) => {
			context.respond(`Operation failed to complete. (${error.message})`, "", "RED");
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ban",
		description: "Bans a member from the server",
		accessLevel: AccessLevelType.Admin,
		aliases: [],
		maxArguments: 2,

		args: {
			user: "!:user",
			reason: "!string"
		},

		category: CommandCategoryType.Moderation,
		enabled: true,
		price: 0
	}
};
