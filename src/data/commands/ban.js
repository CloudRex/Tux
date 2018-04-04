import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		if (context.arguments.length === 1) {
			context.respond("Command not yet fully implemented");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ban",
		description: "Bans a member from the server",
		accessLevel: AccessLevelType.Admin,
		aliases: [],
		maxArguments: 1
	}
};
