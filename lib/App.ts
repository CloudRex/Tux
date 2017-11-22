import Bot from "./core/bot";
import Log from "./core/log";
import Settings from "./core/settings";
import CommandParser from "./commands/commandParser";
import CommandManager from "./commands/commandManager";
import CommandExecutionContext from "./commands/commandExecutionContext";
import FeatureManager from "./features/featureManager";

// Commands
import Help from "./data/commands/help";
import Version from "./data/commands/version";

// Features
import PreventUnintendedSpam from "./data/features/preventUnintendedSpam";

// Globals
const Discord = require("discord.js");

var bot = new Bot(
    // TODO: Debug only
    new Settings("lib/settings.json"),
    new Discord.Client(),
    new CommandManager(),
    new FeatureManager()
);

// Register Commands & Features
bot.commands.registerMultiple([
    new Help(),
    new Version()
]);

// TODO: Features should be loaded from settings
bot.features.registerMultiple([
    new PreventUnintendedSpam()
]);

// Bot init
bot.features.enableAll(bot);
bot.login();
