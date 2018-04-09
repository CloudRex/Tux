import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length === 2) {
			// const { username } = context.bot.client.users.find("id", context.arguments[0]);

			context.message.guild.ban(context.arguments[0], context.arguments[1])
				.then(() => context.respond(`:zap: After many days in the lonely desert, **todo** was finally back home for \`${context.arguments[1]}\`.`, "", "GREEN"))
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
		name: "unban",
		description: "Unbans a member from the server",
		accessLevel: AccessLevelType.Admin,
		aliases: ["uban"],
		maxArguments: 2
	}
};
