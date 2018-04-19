import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";
import Utils from "../../core/utils";

const snekfetch = require("snekfetch");

export default {
	async executed(context) {
		// const baseUrl = "http://jservice.io/api/";
		// const url = "https://opentdb.com/api.php?amount=1&category=15&difficulty=easy";
		const url = "https://opentdb.com/api.php?amount=1&category=18";
		const choices = new MessageBuilder();

		snekfetch.get(url).then((result) => {
			const response = result.body.results[0];

			for (let i = 0; i < response.incorrect_answers.length; i++) {
				choices.add(`:small_blue_diamond: ${response.incorrect_answers[i]}`).line();
			}

			choices.add(`:small_blue_diamond: ${response.correct_answer}`).line();

			context.respond({
				Category: response.category,
				Question: response.question,
				Choices: Utils.shuffle(choices.build().split("\n")).join("\n")
			}, "Trivia", "GREEN");

			global.trivAns = {
				channel: context.message.channel,
				question: response.question,
				answer: response.correct_answer.toLowerCase()
			};

			context.bot.client.setTimeout(() => {
				if (global.trivAns && global.trivAns.question === response.question) {
					context.respond(`Times up! The correct answer was **${response.correct_answer}**.`, "Trivia", "RED");
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
		accessLevel: AccessLevelType.Member,
		aliases: ["triv"],
		maxArguments: 1,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true,
		price: 0
	}
};
