import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		context.respond(`:ping_pong: Pong **${Math.round(context.bot.client.ping)}**ms`, "", "GREEN");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ping",
		description: "Latency response time",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true
	}
};
