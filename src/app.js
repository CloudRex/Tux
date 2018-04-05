import Bot from "./core/bot";
import Settings from "./core/settings";
import CommandManager from "./commands/command-manager";
import FeatureManager from "./features/feature-manager";
import CommandLoader from "./commands/command-loader";
import UserConfig from "./core/user-config";
import AnswerMentions from "./data/features/answer-mentions";

const Discord = require("discord.js");

const bot = new Bot(
	// TODO: Debug only
	new Settings("src/settings.json"),
	new UserConfig("src/user.config.json"),
	new Discord.Client(),
	new CommandManager("src/access-levels.json"),
	new FeatureManager(),
	new CommandLoader("src/data/commands")
);

// TODO: features should be automatically loaded
bot.features.registerMultiple([
	/* new PreventUnintendedSpam(),
	new AntiSpam(),
	new EasterEggs() */
	new AnswerMentions()
]);

// Init
bot.settings.validate();
bot.commandLoader.loadAll(bot.commands);
bot.features.enableAll(bot);
bot.login();
