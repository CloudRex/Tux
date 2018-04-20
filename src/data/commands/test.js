import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import CommandArgumentParser from "../../commands/command-argument-parser";
import TimeParser from "../../core/time-parser";
import Utils from "../../core/utils";

export default {
	async executed(context) {
		/* const tov = {
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
		})); */

		/* const tp = new TimeParser(context.arguments[0]);

		context.respond(tp.getTimeFromNow(), "", "GREEN"); */

		const arr = {
			people: {
				john: {
					name: "john doe",
					age: 21,
					email: "johndoe@doejohn.doe"
				}
			}
		};

		context.bot.userConfig.set(context.arguments[0], context.arguments[1]);
		console.log(context.bot.userConfig.get(context.arguments[0]));
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "test",
		description: "Test something",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 2,

		args: {
			key: "!string",
			value: "number|string"
		},

		category: CommandCategoryType.Developer,
		enabled: true,
		price: 0
	}
};
