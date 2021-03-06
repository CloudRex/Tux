import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	executed(context) {
		const target = context.arguments[0];
		const targetAuth = context.getAuth(target);
		const accessLevel = AccessLevelType.fromString(context.arguments[1]);

		if (context.auth < accessLevel) {
			context.fail("You don't have the necessary authority to assign that access level.");
		}
		else if (targetAuth >= accessLevel) {
			context.fail("He/she already has that or a higher access level.");
		}
		else if (accessLevel === AccessLevelType.Developer) {
			context.bot.userConfig.push("global.developers", target);
			context.ok("Done!");
		}
		else {
			context.bot.userConfig.push(`access-levels.${context.arguments[1].toLowerCase()}`, target, context.message.guild.id);
			context.ok("Done!");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "assign",
		description: "Assign an access level to an user",
		accessLevel: AccessLevelType.Owner,
		aliases: ["grant"],
		maxArguments: 2,

		args: {
			target: "!:user",
			accessLevel: "!:accessLevel"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};
