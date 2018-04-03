import Command from "../../commands/command";
import Utils from "../../core/utils";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("thanks", "View how many times you or an use has been thanked", [], null, 1, AccessLevelType.Member, async (context) => {
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

					context.respond(`You have been thanked ${thanks} times`);
				}
				else if (context.message.guild.members.has(user)) {
					const thanks = await context.bot.database.getThanksAsync(user);

					context.respond(`He/she has been thanked ${thanks} times`);
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
}, () => true);

export default command;