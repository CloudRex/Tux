import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		// const baseUrl = "http://jservice.io/api/";
		const url = "https://opentdb.com/api.php?amount=1&category=15&difficulty=easy";
		const choices = new MessageBuilder();

		snekfetch.get(url).then((result) => {
			const response = result.body.results[0];

			for (let i = 0; i < response.incorrect_answers.length; i++) {
				choices.add(`:small_blue_diamond: ${response.incorrect_answers[i]}`).addLine();
			}

			choices.add(`:small_blue_diamond: ${response.correct_answer}`).addLine();

			context.respond({
				Category: response.category,
				Question: response.question,
				Choices: choices.build()
			}, "Trivia", "GREEN");

			global.trivAns = {
				channel: context.message.channel,
				answer: response.correct_answer.toLowerCase()
			};

			context.bot.client.setTimeout(() => {
				if (global.trivAns) {
					context.respond(`Time expired! The correct answer was **${response.correct_answer}**.`, "", "RED");
					global.trivAns = null;
				}
			}, 15000);
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
