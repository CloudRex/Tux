import AccessLevelType from "../../core/access-level-type";

export default {
	async executed(context) {
		context.respond(`Pong **${context.bot.client.ping}**ms`);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "ping",
		description: "Latency response time",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0
	}
};
