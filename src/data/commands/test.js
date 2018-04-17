import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import CommandArgumentParser from "../../commands/command-argument-parser";

export default {
	async executed(context) {
		const tov = {
			name: 6
		};

		const mahCheck = (arg) => {
			console.log(arg);

			if (typeof arg === "string") {
				return arg.toLowerCase() === "john doee";
			}

			return false;
		};

		console.log(CommandArgumentParser.validate({
			name: "number|:mah_check|string"
		}, tov, {
			mah_check: mahCheck
		}));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "test",
		description: "Test something",
		accessLevel: AccessLevelType.Owner,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Developer,
		enabled: true,
		price: 0
	}
};
