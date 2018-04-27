import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.message.channel.type === "text" && context.arguments[0]) {
			// TODO: Is argument length checking required?
			if (context.arguments.length === 1) {
				const user = context.arguments[0];

				if (context.message.author.id.toString() === user) {
					context.fail("You can't thank yourself, silly!");
				}
				else if (context.message.guild.members.has(user)) {
					context.bot.database.addThank(user, () => {
						context.bot.database.getThanks(user, (thanks) => {
							context.ok(`:thumbsup: Thanked ${context.arguments[0]} (${thanks} Thanks)`);
						});
					});
				}
				else {
					context.fail("Are you sure that person exists?");
				}
			}
		}
		else {
			context.fail("You can't do that here!");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "thank",
		description: "Thank an user",
		accessLevel: AccessLevelType.Member,
		aliases: ["thx"],
		maxArguments: 1,

		args: {
			user: "!:user"
		},

		category: CommandCategoryType.Fun,
		enabled: true
	}
};
