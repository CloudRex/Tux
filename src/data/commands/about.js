import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		TimeAgo.locale(en);

		const guilds = context.bot.client.guilds.array();
		const timeAgo = new TimeAgo("en-US");

		let users = 0;

		for (let i = 0; i < guilds.length; i++) {
			users += guilds[i].memberCount;
		}

		// TODO
		context.sections({
			Vote: ":star: If you'd like to help out Tux, please consider **__[voting](https://discordbots.org/bot/381949722157514752/vote)__** for him.",
			Website: "**__[Visit Tux's website](https://cloudrex.github.io/tux-website/)__**",
			"Adopt me": `To add Tux to your server, click **__[here](https://discordapp.com/oauth2/authorize?client_id=${context.bot.client.user.id}&scope=bot)__**`,
			"Support Server": "**__[Click here](https://discord.gg/Vu4jvKQ)__** to join Tux's support server",
			Description: "Tux is a tiny Discord bot designed with flexibility in mind.",
			"Command Trigger": context.bot.settings.general.commandTrigger,
			Version: context.bot.settings.general.version,
			Guilds: context.bot.client.guilds.size,
			Users: users,
			Uptime: timeAgo.format(Date.now() - context.bot.client.uptime, "time")
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "about",
		description: "Displays information about the bot",
		accessLevel: AccessLevelType.Guest,
		aliases: ["invite", "vote", "uptime"],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
