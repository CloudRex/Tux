import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments.length === 1) {
			if (context.arguments[0].startsWith("global")) {
				context.respond(`**${context.arguments[0]}** = **${context.bot.userConfig.get(context.arguments[0])}**`, "", "GREEN");
			}
			else {
				context.respond(`**${context.arguments[0]}** = **${context.bot.userConfig.getLocal(context.message.guild.id, context.arguments[0])}**`, "", "GREEN");
			}
		}
		else if (context.arguments.length === 2) {
			if (context.arguments[0].startsWith("global") && context.accessLevel !== AccessLevelType.Developer) {
				const response = await context.respond("Only **Developers** can change global settings.", "", "RED");

				if (response) {
					response.message.delete(4000);
				}

				return;
			}

			if (context.bot.userConfig.containsLocal(context.message.guild.id, context.arguments[0])) {
				let value = context.arguments[1];

				value = (value === "true" ? true : (value === "false" ? false : (Number.isNaN(value) ? value : parseInt(value))));

				context.arguments[0].startsWith("global") ? context.bot.userConfig.set(context.arguments[0], value) : context.bot.userConfig.setLocal(context.message.guild.id, context.arguments[0], value);
				context.respond(`Set **${context.arguments[0]}** to **${context.arguments[1]}**`, "", "GREEN");
			}
			else {
				context.respond("Property is not pre-defined and therefore not configurable", "", "RED");
			}
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
		maxArguments: 2,

		args: {
			key: "!string",
			value: "string|number"
		},

		category: CommandCategoryType.General,
		enabled: true,
		price: 0
	}
};
