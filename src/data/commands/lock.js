import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		// TODO: Might consider not adding since: inefficient checking every message for scope locked
		context.respond("Command not yet implemented");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "lock",
		description: "Toggle locking the bot's command scope to you",
		accessLevel: AccessLevelType.Guest,
		aliases: [],
		maxArguments: 0,
		args: {}
	}
};
