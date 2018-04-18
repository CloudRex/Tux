import Utils from "../../core/utils";
import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.message.channel.type === "text") {
			// TODO: Is argument length checking required?
			if (context.arguments.length === 0) {
				const thanks = await context.bot.database.getThanksAsync(context.message.author.id.toString());

				context.respond(`You have been thanked ${thanks} times`);
			}
			else if (context.arguments.length === 1) {
				if (Utils.isMention(context.arguments[0])) {
					const user = Utils.stripMention(context.arguments[0]);

					if (context.message.author.id.toString() === user) {
						const thanks = await context.bot.database.getThanksAsync(user);

						context.respond(`You have been thanked ${thanks} time(s)`);
					}
					else if (context.message.guild.members.has(user)) {
						const thanks = await context.bot.database.getThanksAsync(user);

						context.respond(`He/she has been thanked ${thanks} time(s)`);
					}
					else {
						context.respond("Are you sure that person exists?");
					}
				}
				else {
					context.respond("Invalid format");
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
		name: "thanks",
		description: "View how many times you or an user has been thanked",
		accessLevel: AccessLevelType.Member,
		aliases: ["thxs"],
		maxArguments: 1,

		args: {
			user: ":user"
		},

		category: CommandCategoryType.Fun,
		enabled: true,
		price: 0
	}
};
