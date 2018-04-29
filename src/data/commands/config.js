import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		if (context.arguments.length === 1) {
			if (context.arguments[0].startsWith("global")) {
				context.ok(`**${context.arguments[0]}** = **${JSON.stringify(context.bot.userConfig.get(context.arguments[0]))}**`);
			}
			else {
				context.ok(`**${context.arguments[0]}** = **${JSON.stringify(context.bot.userConfig.get(context.arguments[0], context.message.guild.id))}**`);
			}
		}
		else if (context.arguments[0].startsWith("global") && context.accessLevel !== AccessLevelType.Developer) {
			context.fail("Only **Developers** can change global settings.");
		}
		else if (context.bot.userConfig.contains(`default.${context.arguments[0]}`)) {
			let value = context.arguments[1];

			value = (value === "true" ? true : (value === "false" ? false : (Number.isNaN(value) ? value : parseInt(value))));

			context.arguments[0].startsWith("global") ? context.bot.userConfig.set(context.arguments[0], value) : context.bot.userConfig.set(context.arguments[0], value, context.message.guild.id);
			context.ok(`Set **${context.arguments[0]}** to **${context.arguments[1]}**`);
		}
		else {
			context.fail("Property is not pre-defined and therefore not configurable.");
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
		enabled: true
	}
};
