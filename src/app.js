import Bot from "./core/bot";
import Settings from "./core/settings";
import CommandManager from "./commands/commandManager";
import FeatureManager from "./features/featureManager";
import Help from "./data/commands/help";
import Version from "./data/commands/version";
import PreventUnintendedSpam from "./data/features/preventUnintendedSpam";
import Thank from "./data/commands/thank";
import Time from "./data/commands/time";
import Google from "./data/commands/google";

const Discord = require("discord.js");

const bot = new Bot(
    // TODO: Debug only
    new Settings("src/settings.json"),
    new Discord.Client(),
    new CommandManager(),
    new FeatureManager()
);

// Register commands & features
bot.commands.registerMultiple([
    new Help(),
    new Version(),
    new Thank(),
    new Time(),
    new Google()
]);

// TODO: features should be loaded from settings
bot.features.registerMultiple([
    new PreventUnintendedSpam()
]);

// Init
bot.settings.validate();
bot.features.enableAll(bot);
bot.login();
