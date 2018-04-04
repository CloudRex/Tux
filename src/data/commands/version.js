import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		context.respond(`Version: \`${context.bot.settings.general.version}\``);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "version",
		description: "View the bot's version",
		accessLevel: AccessLevelType.Guest,
		aliases: ["ver"],
		maxArguments: 0
	}
};
