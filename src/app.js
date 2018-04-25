import Bot from "./core/bot";
import Settings from "./core/settings";
import CommandManager from "./commands/command-manager";
import FeatureManager from "./features/feature-manager";
import CommandLoader from "./commands/command-loader";
import UserConfig from "./core/user-config";
import AnswerMentions from "./data/features/answer-mentions";
import Treasures from "./data/features/treasures";
import Badges from "./data/features/badges";
import Protection from "./data/features/protection";

const Discord = require("discord.js");

const bot = new Bot(
	// TODO: Debug only
	new Settings("src/settings.json"),
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
	new Badges()
]);

// Init
Bot.clearTemp();
bot.settings.validate();
bot.commandLoader.loadAll(bot.commands);
bot.features.enableAll(bot);
bot.connect();
