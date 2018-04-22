import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		// TODO

		context.ok("ok!");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "play",
		description: "Play a song",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 1,

		args: {
			recipient: "!:youtubeLink"
		},

		category: CommandCategoryType.Music,
		enabled: true
	}
};
