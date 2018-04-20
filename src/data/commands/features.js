import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";

export default {
	executed(context) {
		const response = new MessageBuilder();
		const { features } = context.bot.features;

		for (let i = 0; i < features.length; i++) {
			const feature = features[i];

			if (feature.isEnabled) {
				response.add("<:tuxcheck:436998015652462603>");
			}
			else {
				response.add("<:tuxx:436998168253825024>");
			}

			response.add(`**${feature.name}**: ${feature.description}`).line();
		}

		context.respond(response.build(), "Features", "GREEN");
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "features",
		description: "View the status of features",
		accessLevel: AccessLevelType.Moderator,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.General,
		enabled: true,
		price: 0
	}
};