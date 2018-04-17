import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import CommandArgumentParser from "../../commands/command-argument-parser";

export default {
	async executed(context) {
		const tov = {
			name: null,
			age: 5,
			addr: "test"
		};

		const mahCheck = (arg) => {
			console.log(arg);

			if (typeof arg === "string") {
				return arg.toLowerCase() === "john doe";
			}

			return false;
		};

		console.log(CommandArgumentParser.validate({
			name: "string|number",
			age: "!number",
			addr: "number|string|:mah_check"
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
