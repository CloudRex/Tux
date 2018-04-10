import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			const { username } = context.message.guild.member(context.arguments[0]).user;

			context.message.guild.ban(context.arguments[0], {
				reason: context.arguments[1]
			})
				.then(() => context.respond(`:zap: And just like that, **${username}** was long gone for \`${context.arguments[1]}\`.`, "", "GREEN"))
				.catch((error) => {
					context.respond(`Operation failed to complete. (${error.message})`, "", "RED");
				});
		}
		else {
			context.respond("Invalid amount of arguments.");
		}
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
			user: "!user-mention",
			reason: "!string"
		}
	}
};
