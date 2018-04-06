import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		const guilds = context.bot.client.guilds.array();

		let users = 0;

		for (let i = 0; i < guilds.length; i++) {
			users += guilds[i].memberCount;
		}

		context.respond({
			"Adopt me": "To add Tux to your server, click **__[here](https://discordapp.com/oauth2/authorize?client_id=381949722157514752&scope=bot)__**",
			"Support channel": "Click **__[here](https://discord.gg/Vu4jvKQ)__** to join Tux's support server",
			Description: "Tux is a tiny Discord bot designed with flexibility in mind.",
			"Command Trigger": context.bot.settings.general.commandTrigger,
			Version: context.bot.settings.general.version,
			Guilds: context.bot.client.guilds.size,
			Users: users
		}, "", "BLUE");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "about",
		description: "Displays information about the bot",
		accessLevel: AccessLevelType.Guest,
		aliases: ["invite"],
		maxArguments: 0
	}
};
