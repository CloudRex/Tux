import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";

export default {
	executed(context) {
		const command = context.bot.commands.getByBase(context.arguments[0]);

		if (!command) {
			context.fail("Invalid command base name.");

			return;
		}

		const response = new MessageBuilder();

		if (command.aliases.length > 0) {
			for (let i = 0; i < command.aliases.length; i++) {
				response.add(command.aliases[i]).add(", ");
			}

			response.bold(command.base);
		}
		else {
			response.add("This command has no aliases.");
		}

		context.sections({
			Aliases: response.build()
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "aliases",
		description: "View the aliases of a command",
		accessLevel: AccessLevelType.Guest,
		aliases: ["alias"],
		maxArguments: 1,

		args: {
			command: "!string"
		},

		category: CommandCategoryType.General,
		enabled: true
	}
};
