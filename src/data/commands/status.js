import Command from "../../commands/command";
import AccessLevelType from "../../core/access-level-type";

const command = new Command("status", "View information about the server", ["stat"], null, 0, AccessLevelType.Moderator, (context) => {
	const { guild } = context.message;

	context.respond({
		Name: guild.name,
		Owner: guild.owner.displayName,
		Users: guild.memberCount,
		Region: guild.region,
		"Default Channel": guild.defaultChannel,
		"Created At": guild.createdAt
	});
}, () => true);

export default command;
