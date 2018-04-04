import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		context.respond({
			"Adopt me": "To add Tux to your server, click [here](https://discordapp.com/oauth2/authorize?client_id=381949722157514752&scope=bot)",
			Description: "Tux is a tiny Discord bot created with flexibility in mind.",
			"Command Trigger": context.bot.settings.general.commandTrigger,
			Version: context.bot.settings.general.version
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "about",
		description: "Displays information about the bot",
		accessLevel: AccessLevelType.Guest,
		aliases: [],
		maxArguments: 0
	}
};
