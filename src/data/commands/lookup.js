import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import DbMessage from "../../database/db-message";
import Utils from "../../core/utils";

export default {
	async executed(context) {
		switch (context.arguments[0].toLowerCase()) {
			case "ping": {
				const channel = (context.arguments.length === 2 ? Utils.resolveId(context.arguments[1]) : context.message.channel.id);

				const result = (await context.bot.database.db
					.select()
					.from("messages")
					.where("text", "like", `%<@${context.sender.id}>%`)
					.where("channel", channel)
					.orderBy("time", "desc")
					.limit(1)
					.then())[0];

				const searchingResponse = await context.ok("<a:loading2:437130525304553473> Searching");

				if (result) {
					// TODO: Alert if message logging is off.
					const lastPing = DbMessage.fromResult(result);

					if (searchingResponse) {
						await searchingResponse.message.delete();
					}

					context.sections({
						Sender: `${lastPing.senderName} (<@${lastPing.sender}>)`,
						Message: lastPing.text,

						// TODO: Shouldn't be parseInt, required, it for some reason returns XXXXX.0, probably saving bad to database
						Time: Utils.timeAgo(parseInt(lastPing.time))
					});
				}
				else {
					if (searchingResponse) {
						await searchingResponse.message.delete();
					}

					context.fail("No results found.");
				}

				break;
			}

			default: {
				context.fail("Invalid sub-command.");
			}
		}
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "lookup",
		description: "Lookup data from the database",
		accessLevel: AccessLevelType.Member,
		aliases: ["db"],
		maxArguments: 2,

		args: {
			subCommand: "!string",
			value: "string|number",
		},

		category: CommandCategoryType.Member,
		enabled: true
	}
};
