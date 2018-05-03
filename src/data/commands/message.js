import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import EmbedBuilder from "../../core/embed-builder";

export default {
	async executed(context) {
		const ids = context.arguments[0].split('-');
		const channelId = ids[0];
		const messageId = ids[1];
		let guild = null;
		let channel = null;
		for (let i = 0; i < context.bot.client.guilds.array().length; i++) {
			const g = context.bot.client.guilds.array()[i];
			const c = g.channels.get(channelId);
			if (c != null) {
				guild = g;
				channel = c;
			}
		}
		if (channel == null) {
			context.fail('Channel not found');
			return;
		} else if (channel.nsfw === true && !context.message.nsfw) {
			context.fail('That channel is a nsfw channel while this one is not.');
			return;
		}
		const message = await channel.fetchMessage(messageId);
		if (message == null) {
			context.fail('Message not found');
			return;
		}
		const embed = new EmbedBuilder()
			.title(`Information of ${message.id}`)
			.field("Guild", `${guild.name} (\`${guild.id}\`)`)
			.field("Channel", `${channel.name} (\`${channel.id}\`)`)
			.field("Sender", `${message.member.user.username} (\`${message.member.user.id}\`)`)
			.field("Content", message.content.replace('@', '(at)'))
			.field("Created At", message.createdAt.toString())
			.color("GREEN")
			.thumbnail(message.member.user.displayAvatarURL);

		if (message.editedAt != null) {
			embed.field("Edited At", message.editedAt.toString());
		}

		context.message.channel.send(embed.build());
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "message",
		description: "Displays information about a specific message",
		accessLevel: AccessLevelType.Developer,
		aliases: ["msg"],
		maxArguments: 1,

		args: {
			ids: "!string"
		},

		category: CommandCategoryType.Developer,
		enabled: true
	}
};
