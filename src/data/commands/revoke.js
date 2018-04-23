import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

export default {
	executed(context) {
		const target = Utils.resolveId(context.arguments[0]);
		const targetAuth = context.getAuth(target);
		const accessLevel = AccessLevelType.fromString(context.arguments[1]);

		if (context.auth < accessLevel) {
			context.fail("You don't have the necessary authority to assign that access level.");
		}
		else if (targetAuth >= accessLevel) {
			context.fail("He/she already has that or a higher access level.");
		}
		else if (accessLevel === AccessLevelType.Developer) {
			context.bot.userConfig.push("global.developers", context.arguments[0]);
			context.ok("Done!");
		}
		else {
			context.bot.userConfig.pushLocal(context.message.guild.id, `access-levels.${context.arguments[1].toLowerCase()}`, target);
			context.ok("Done!");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "revoke",
		description: "Revoke an access level from an user",
		accessLevel: AccessLevelType.Owner,
		aliases: ["take"],
		maxArguments: 2,

		args: {
			target: "!:user",
			accessLevel: "!:accessLevel"
		},

		category: CommandCategoryType.Moderation,
		enabled: true
	}
};