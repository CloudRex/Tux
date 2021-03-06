import Feature from "./feature";
import BadgeType from "../../core/badge-type";
import Utils from "../../core/utils";

const fs = require("fs");

export default class Badges extends Feature {
	constructor() {
		super("Badges", "badges", "Earn badges by doing stuff");

		// TODO: Better loading system (class) and path musn't be hard coded
		this.treasures = JSON.parse(fs.readFileSync("src/items.json").toString());
	}

	canEnable(bot) {
		return true;
	}

	// TODO: Unknown message error is probably caused by deleting non-existing messages somewhere in this code
	enabled(bot) {
		// TODO: Migrate to database for persistence
		const counters = [];

		const award = async (user, badge, context) => {
			await context.bot.database.addUserBadge(user.id, badge);

			context.respond({
				text: `:medal: **${user.username}** has earned the **${BadgeType.getName(badge)}** badge!`,
				color: "GOLD"
			});
		};

		bot.events.on("commandExecuted", async (e) => {
			// TODO: Hard coded discord bot lists guilds
			if (!e.context.message.author.bot && e.context.message.guild.id.toString() !== "264445053596991498" && e.context.message.guild.id.toString() !== "110373943822540800" && e.context.message.guild.id.toString() !== "374071874222686211") {
				if (e.context.message.author.id !== bot.client.user.id) {
					const { badges } = (await bot.database.getUser(e.context.sender.id));

					switch (e.command.base) {
						case "inventory": {
							const inventory = await bot.database.getItems(e.context.sender.id);

							if (inventory.length === 0 && !badges.includes(BadgeType.EmptyInventory)) {
								award(e.context.sender, BadgeType.EmptyInventory, e.context);
							}

							break;
						}
					}
				}
			}
		});

		bot.events.on("userMessage", async (message) => {
			const { badges } = await bot.database.getUser(message.author.id);

			if (!counters[message.author.id]) {
				counters[message.author.id] = {
					code: 0
				};
			}

			if (message.content.toLowerCase().includes("```javascript")) {
				counters[message.author.id].code++;
			}

			// TODO: Fix colors
			if (counters[message.author.id].code >= 10 && !badges.includes(BadgeType.ApprenticeScripter)) {
				// award(message.author.id, BadgeType.ApprenticeScripter, context); TODO: Somehow get context here
				await bot.database.addUserBadge(message.author.id, BadgeType.ApprenticeScripter);

				Utils.send({
					description: `:medal: **${message.author.username}** has earned the **${BadgeType.getName(BadgeType.ApprenticeScripter)}** badge!`,
					color: "3447003"
				}, message.author, message.channel);
			}
			else if (counters[message.author.id].code >= 50 && !badges.includes(BadgeType.IntermediateScripter)) {
				// award(message.author.id, BadgeType.ApprenticeScripter, context); TODO: Somehow get context here
				await bot.database.addUserBadge(message.author.id, BadgeType.IntermediateScripter);

				Utils.send({
					description: `:medal: **${message.author.username}** has earned the **${BadgeType.getName(BadgeType.IntermediateScripter)}** badge!`,
					color: "3447003"
				}, message.author, message.channel);
			}
			else if (counters[message.author.id].code >= 100 && !badges.includes(BadgeType.ExperiencedScripter)) {
				// award(message.author.id, BadgeType.ApprenticeScripter, context); TODO: Somehow get context here
				await bot.database.addUserBadge(message.author.id, BadgeType.ExperiencedScripter);

				Utils.send({
					description: `:medal: **${message.author.username}** has earned the **${BadgeType.getName(BadgeType.ExperiencedScripter)}** badge!`,
					color: "3447003"
				}, message.author, message.channel);
			}
			else if (counters[message.author.id].code >= 300 && !badges.includes(BadgeType.MasterScripter)) {
				// award(message.author.id, BadgeType.ApprenticeScripter, context); TODO: Somehow get context here
				await bot.database.addUserBadge(message.author.id, BadgeType.MasterScripter);

				Utils.send({
					description: `:medal: **${message.author.username}** has earned the **${BadgeType.getName(BadgeType.MasterScripter)}** badge!`,
					color: "3447003"
				}, message.author, message.channel);
			}
		});
	}

	disabled() {}
}
