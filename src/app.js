import Bot from "./core/bot";
import Settings from "./core/settings";
import CommandManager from "./commands/command-manager";
import FeatureManager from "./features/feature-manager";
import CommandLoader from "./commands/command-loader";

const Discord = require("discord.js");

const bot = new Bot(
	// TODO: Debug only
	new Settings("src/settings.json"),
	new Discord.Client(),
	new CommandManager("src/access-levels.json"),
	new FeatureManager(),
	new CommandLoader("src/data/commands")
);

// TODO: features should be loaded from settings
/* bot.features.registerMultiple([
	new PreventUnintendedSpam(),
	new AntiSpam(),
	new EasterEggs()
]); */

// Init
bot.settings.validate();
bot.commandLoader.loadAll(bot.commands);
bot.features.enableAll(bot);
bot.login();
