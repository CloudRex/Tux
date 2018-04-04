import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length === 1) {
			context.respond(`**${context.arguments[0]}** = **${context.bot.userConfig.get(context.arguments[0])}**`);
		}
		else if (context.arguments.length === 2) {
			let value = context.arguments[1];

			value = (value === "true" ? true : (value === "false" ? false : value));

			context.bot.userConfig.set(context.arguments[0], value);
			context.respond(`Set **${context.arguments[0]}** to **${context.arguments[1]}**`);
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "config",
		description: "Change the bot's configuration",
		accessLevel: AccessLevelType.Admin,
		aliases: ["cfg"],
		maxArguments: 2
	}
};
