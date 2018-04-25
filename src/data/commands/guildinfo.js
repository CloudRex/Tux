import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import EmbedBuilder from "../../core/embed-builder";
import MessageBuilder from "../../core/message-builder";

export default {
	async executed(context) {
		if (context.arguments.length === 1) {
			const guild = context.bot.client.guilds.get(context.arguments[0]);

			const invites = await guild.fetchInvites().catch((error) => {
				context.fail(`Failed fetching invites. (${error.message})`);
			});

			context.message.channel.send(new EmbedBuilder()
				.title(`Information of ${guild.name}`)
				.field("Owner", guild.owner.user.tag)
				.field("Members", guild.memberCount)
				.field("Created At", guild.createdAt.toString())
				.field("Joined At", guild.joinedAt.toString())
				.field("Join", invites ? `[Click to Join](${invites.array()[0].url})` : "No invites.")
				.color("GREEN")
				.thumbnail(guild.iconURL)
				.build());
		}
		else {
			const guilds = context.bot.client.guilds.array();
			const message = new MessageBuilder();

			const result = new EmbedBuilder()
				.color("GREEN")
				.title(`Guilds (${guilds.length})`);

			for (let i = 0; i < guilds.length; i++) {
				message.add(`${guilds[i].name} (\`${guilds[i].id}\`)`).line();
			}

			result.text(message.build());
			context.message.channel.send(result.build());
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "guildinfo",
		description: "Displays information about a specific guild",
		accessLevel: AccessLevelType.Developer,
		aliases: ["ginfo"],
		maxArguments: 1,

		args: {
			user: ":guild"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
