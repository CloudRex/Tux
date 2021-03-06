import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import EmbedBuilder from "../../core/embed-builder";

export default {
	async executed(context) {
		const guildLog = context.bot.userConfig.get("global.guild-log");
		const guild = context.bot.client.guilds.get(guildLog.guild);

		if (guildLog.enabled) {
			const ping = await guild.channels.get(guildLog.channel).send("<@&437767005123379200>");

			const message = await guild.channels.get(guildLog.channel).send(new EmbedBuilder()
				.title(`Support Message from ${guild.name}`)
				.field("Guild", `${guild.name} (\`${guild.id})\``)
				.field("Sender", `${context.sender.tag} (\`${context.sender.id}\`)`)
				.field("Message", context.arguments[0])
				.field("Responsible", "<@&437767005123379200>")
				.thumbnail(context.message.guild.iconURL)
				.footer(`Requested by ${context.sender.username}`, context.sender.avatarURL)
				.build());

			if (message && ping) {
				context.ok("**Great success!** Your message was delivered and will be reviewed shortly.");
			}
			else {
				context.fail("There was a problem delivering your message, please try again later.");
			}
		}
		else {
			context.fail("Sorry! This feature is currently unavailable.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "support",
		description: "Send a message to the bot's support server",
		accessLevel: AccessLevelType.Moderator,
		aliases: [],
		maxArguments: 1,

		args: {
			message: "!string"
		},

		category: CommandCategoryType.Utility,
		enabled: true
	}
};
