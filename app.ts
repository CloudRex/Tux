import Bot from "./core/Bot";
import Log from "./core/Log";
import Settings from "./core/Settings";
import CommandParser from "./core/Commands/CommandParser";
import CommandManager from "./core/Commands/CommandManager";
import CommandExecutionContext from "./core/Commands/CommandExecutionContext";
import FeatureManager from "./core/Features/FeatureManager";

// Commands
import Help from "./Commands/Help";
import Version from "./Commands/Version";

// features
import PreventUnintendedSpam from "./Features/PreventUnintendedSpam";

const request = require("request");
const riotBaseUrl = "https://na1.api.riotgames.com";
const Discord = require("discord.js");

var bot = new Bot(
    // TODO: Debug only
    new Settings("E:/Projects/LeagueBot/new/_settings.json"),
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
