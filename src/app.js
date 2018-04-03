import Bot from "./core/bot";
import Settings from "./core/settings";
import CommandManager from "./commands/command-manager";
import FeatureManager from "./features/feature-manager";
import Help from "./data/commands/help";
import Version from "./data/commands/version";
import PreventUnintendedSpam from "./data/features/prevent-unintended-spam";
import Thank from "./data/commands/thank";
import Time from "./data/commands/time";
import Google from "./data/commands/google";
import Github from "./data/commands/github";
import Status from "./data/commands/status";
import Chuck from "./data/commands/chuck";
import AntiSpam from "./data/features/anti-spam";
import EasterEggs from "./data/features/easter-eggs";
import CommandLoader from "./commands/command-loader";

const Discord = require("discord.js");

const bot = new Bot(
	// TODO: Debug only
	new Settings("src/settings.json"),
	new Discord.Client(),
	new CommandManager(),
	new FeatureManager(),
	new CommandLoader("src/data/commands")
);

// Register commands & features
/* bot.commands.registerMultiple([
	new Help(),
	new Version(),
	new Thank(),
	new Time(),
	new Google(),
	new Github(),
	new Status()
]); */

// TODO: features should be loaded from settings
bot.features.registerMultiple([
	new PreventUnintendedSpam(),
	new AntiSpam(),
	new EasterEggs()
]);

// Init
bot.settings.validate();
bot.commandLoader.loadAll(bot.commands);
bot.features.enableAll(bot);
bot.login();
