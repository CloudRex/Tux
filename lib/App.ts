import Bot from "./core/Bot";
import Log from "./core/Log";
import Settings from "./core/Settings";
import CommandParser from "./Commands/CommandParser";
import CommandManager from "./Commands/CommandManager";
import CommandExecutionContext from "./Commands/CommandExecutionContext";
import FeatureManager from "./Features/FeatureManager";

// Commands
import Help from "./Data/Commands/Help";
import Version from "./Data/Commands/Version";

// features
import PreventUnintendedSpam from "./Data/Features/PreventUnintendedSpam";

const request = require("request");
const riotBaseUrl = "https://na1.api.riotgames.com";
const Discord = require("discord.js");

var bot = new Bot(
    // TODO: Debug only
    new Settings("../settings.json"),
    new Discord.Client(),
    new CommandManager(),
    new FeatureManager()
);

// Register Commands & Features
bot.Commands.registerMultiple([
    new Help(),
    new Version()
]);

// TODO: Features must be loaded from settings
bot.Features.registerMultiple([
    new PreventUnintendedSpam()
]);

bot.Features.enableAll(bot);

// Discord client events
bot.Client.on("ready", () => {
    Log.info("Ready");
});

bot.Client.on("message", (message) => {
    if (CommandParser.isValid(message.content, bot.Commands, bot.Settings.General.CommandTrigger))
        bot.Commands.handle(
            new CommandExecutionContext(
                message,
                CommandParser.getArguments(message.content),
                bot
            ),

            CommandParser.parse(
                message.content,
                bot.Commands,
                bot.Settings.General.CommandTrigger
            )
        );

    Log.info(`[${message.author.username}] ${message.content}`);
});

// Bot init
bot.login();
