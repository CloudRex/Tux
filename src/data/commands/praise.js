import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

const praises = [
	"Well done {subject}.",
	"You are learning well, {subject}.",
	"Great job {subject}!",
	"Magnificent job, {subject}.",
	"{subject} is now approved."
];

const fillPraise = (subject, praise) => praise.replace("{subject}", `**${subject}**`);

export default {
	executed(context) {
		const user = context.bot.client.users.get(context.arguments[0]);

		context.ok(fillPraise(user.username, praises[Utils.getRandomInt(0, praises.length)]));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "praise",
		description: "Praise someone",
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
