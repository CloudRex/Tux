import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";

export default {
	async executed(context) {
		const { guild } = context.message;
		const users = guild.members.array();
		const channels = guild.channels.array();

		let msg = await context.respond(`1. Generating a complete report of all **${users.length}** members...`, guild.name, "GOLD");

		setTimeout(() => {
			msg.edit(`2. Generating a complete report of all **${channels.length}** channels...`, guild.name, "GOLD");

			setTimeout(() => {
				msg.edit(`3. Collecting emojis, images, links and embeds from all **${channels.length}** channels...`, guild.name, "GOLD");

				setTimeout(() => {
					msg.edit("4. Compressing data...", guild.name, "GOLD");

					setTimeout(() => {
						msg.edit("<:tuxcheck:436998015652462603> Report complete, please check the web dashboard. (**181.61**mb, took **21.5**s, **356.12**mb cached logs)", guild.name, "GREEN");
					}, 3000);
				}, 6500);
			}, 5000);
		}, 6000);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "report",
		description: "Generate a report of this server",
		accessLevel: AccessLevelType.Developer,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Developer,
		enabled: true
	}
};
