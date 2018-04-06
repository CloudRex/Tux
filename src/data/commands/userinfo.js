import AccessLevelType from "../../core/access-level-type";

export default {
	executed(context) {
		// TODO
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "userinfo",
		description: "Displays information about a specific user",
		accessLevel: AccessLevelType.Guest,
		aliases: ["uinfo"],
		maxArguments: 0
	}
};
