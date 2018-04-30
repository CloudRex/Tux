import Bot from "./core/bot";
import Settings from "./core/settings";
import FeatureManager from "./features/feature-manager";
import CommandLoader from "./commands/command-loader";
import UserConfig from "./core/user-config";
import Treasures from "./data/features/treasures";
import Badges from "./data/features/badges";
import Protection from "./data/features/protection";
import AntiSpam from "./data/features/anti-spam";
import Log from "./core/log";

const Discord = require("discord.js");

const bot = new Bot(
	// TODO: Debug only
	new Settings("src/settings.json"),
	"src/emojis.json",
	new UserConfig("src/user-config.json"),
	new Discord.Client(),
	"src/access-levels.json",
	new FeatureManager(),
	new CommandLoader("src/data/commands")
);

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
