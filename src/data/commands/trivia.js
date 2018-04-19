import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		const baseUrl = "http://jservice.io/api/";

		snekfetch.get(`${baseUrl}random`).then((result) => {
			const response = result.body[0];

			context.respond({
				Category: response.category.title,
				Question: response.question
			});

			global.trivAns = {
				channel: context.message.channel,
				answer: response.answer.toLowerCase()
			};

			console.log(response);
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "trivia",
		description: "Solve trivia questions and earn coins",
		accessLevel: AccessLevelType.Moderator,
		aliases: ["triv"],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true,
		price: 0
	}
};
