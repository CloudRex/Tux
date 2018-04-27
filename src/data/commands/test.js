import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		/* const target = context.message.mentions.users.array()[0];

		const customTypes = {
			user: (arg) => {
				const match = /(^[0-9]{18}$|^<@!?[0-9]{18}>$)/.test(arg); // <@285578743324606482>

				console.log(Discord.MessageMentions.USERS_PATTERN);

				console.log("MATCH : " + match);
				console.log("ARG : " + arg);
				console.log("LEN : " + arg.length);

				return match;
			},
		};

		const tov = {
			user: context.arguments[0],
			amount: 5
		};

		console.log(CommandArgumentParser.validate({
			user: "!:user",
			amount: "!number"
		}, tov, customTypes)); */
		// Gives null when passing [], which is good (what we want)
		/* const auth = context.bot.commands.getAuthority(context.message.guild.id, undefined, context.arguments[0]);
		context.ok("auth: " + auth); */
		/* context.bot.userConfig.push("access-levels.owner", context.sender.id, context.message.guild.id);
		context.ok(":ok_hand:"); */
		context.ok(context.arguments[0] + ":resolved");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "test",
		description: "Test something",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Developer,
		enabled: true
	}
};
