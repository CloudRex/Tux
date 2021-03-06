import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";

export default {
	executed(context) {
		const { features } = context.bot;
		const feature = features.getByKey(context.arguments[0]);

		if (feature) {
			const state = context.arguments[1];

			if (feature.isEnabled === !state) {
				const response = new MessageBuilder(`You've successfully turned the **${feature.name}** feature `);

				if (state) {
					response.bold("on");
					features.enable(feature, context.bot);
				}
				else {
					response.bold("off");
					features.disable(feature, context.bot);
				}

				context.ok(response.add(".").build());
			}
			else {
				context.fail(`The **${feature.name}** feature is already in that state.`);
			}
		}
		else {
			context.fail("Operation failed: Invalid feature.");
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "feature",
		description: "Toggle a feature",

		// TODO: Should be Admin, changed for security
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 2,

		args: {
			feature: "!string",
			state: "!boolean"
		},

		category: CommandCategoryType.General,
		enabled: true
	}
};
