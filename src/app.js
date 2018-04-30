import Bot from "./core/bot";
import Settings from "./core/settings";
import FeatureManager from "./features/feature-manager";
import CommandLoader from "./commands/command-loader";
import UserConfig from "./core/user-config";
import Treasures from "./data/features/treasures";
import Badges from "./data/features/badges";
import Protection from "./data/features/protection";
import AntiSpam from "./data/features/anti-spam";

const argparse = require("argparse");
const Discord = require("discord.js");

const settings = new Settings("src/settings.json");
const parser = new argparse.ArgumentParser({
	version: settings.general.version,
	addHelp: true,
	description: 'Tux the discord bot'
});
parser.addArgument(
	["-e", "--emojis"],
	{
		defaultValue: "src/emojis.json",
		help: "Location of the emojis file",
		type: "string"
	}
);
parser.addArgument(
	["-u", "--user-config"],
	{
		defaultValue: "src/user-config.json",
		help: "Location of the user config file",
		type: "string"
	}
);
parser.addArgument(
	["-a", "--access-levels"],
	{
		defaultValue: "src/access-levels.json",
		help: "Location of the access levels file",
		type: "string"
	}
);
parser.addArgument(
	["-c", "--commands"],
	{
		defaultValue: "src/data/commands",
		help: "Location of commands directory",
		type: "string"
	}
);
parser.addArgument(
	["-b", "--debug-mode"],
	{
		help: "Debug mode",
		nargs: 0
	}
);
parser.addArgument(
	["-s", "--verbose"],
	{
		help: "Verbose mode",
		nargs: 0
	}
);
const args = parser.parseArgs();

const bot = new Bot(
	// TODO: Debug only
	settings,
	args.emojis,
	new UserConfig(args.user_config),
	new Discord.Client(),
	args.access_levels,
	new FeatureManager(),
	new CommandLoader(args.commands),
	args.debug_mode !== null,
	args.verbose !== null
);

bot.log.debug("Debug mode");
bot.log.verbose("Verbose mode");

// TODO: features should be automatically loaded
bot.features.registerMultiple([
	/* new PreventUnintendedSpam(),
	new EasterEggs()
	new AnswerMentions(), */
	new Protection(),
	new Treasures(),
	new Badges(),
	new AntiSpam()
]);

// Init
Bot.clearTemp();
bot.settings.validate();
bot.commandLoader.loadAll(bot.commands);
bot.features.enableAll(bot);
bot.connect();
