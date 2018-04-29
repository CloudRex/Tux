import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

const insults = [
	"{subject} has magically turned a pile of poo.",
	"{subject} is now known as no-one.",
	"{subject} now works cleaning toilets.",
	"{subject} needs to be reborn.",
	"{subject}'s father was Hitler.",
	"{subject} no u.",
	"{subject} now works as a clown full-time.",
	"{subject} lives in the sewers."
];

const fillInsult = (subject, insult) => insult.replace("{subject}", `**${subject}**`);

export default {
	executed(context) {
		const user = context.bot.client.users.get(context.arguments[0]);

		context.ok(fillInsult(user.username, insults[Utils.getRandomInt(0, insults.length)]));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "insult",
		description: "Insult someone (soft)",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			user: "!:user"
		},

		category: CommandCategoryType.Fun,
		enabled: true
	}
};
