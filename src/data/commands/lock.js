import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		context.respond("Command not yet fully implemented");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "lock",
		description: "Toggle locking the bot's command scope to you",
		accessLevel: AccessLevelType.Guest,
		aliases: [],
		maxArguments: 0
	}
};
