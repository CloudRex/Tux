import Utils from "../../core/utils";
import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		if (context.message.channel.type === "text" && Utils.isMention(context.arguments[0])) {
			// TODO: Is argument length checking required?
			if (context.arguments.length === 1) {
				const user = Utils.stripMention(context.arguments[0]);

				if (context.message.author.id.toString() === user) {
					context.respond("You can't thank yourself, silly!");
				}
				else if (context.message.guild.members.has(user)) {
					context.bot.database.addThank(user, () => {
						context.bot.database.getThanks(user, (thanks) => {
							context.respond(`:thumbsup: Thanked ${context.arguments[0]} (${thanks} Thanks)`);
						});
					});
				}
				else {
					context.respond("Are you sure that person exists?");
				}
			}
		}
		else {
			context.respond("You can't do that here!");
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
