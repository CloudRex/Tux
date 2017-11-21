import Bot from "./core/Bot";
import Log from "./core/Log";
import Settings from "./core/Settings";
import CommandParser from "./core/commands/CommandParser";
import CommandManager from "./core/commands/CommandManager";
import CommandExecutionContext from "./core/commands/CommandExecutionContext";

// Commands
import Help from "./commands/Help";
import Version from "./commands/Version";

const request = require("request");
const riotBaseUrl = "https://na1.api.riotgames.com";
const Discord = require("discord.js");

var bot = new Bot(
    // TODO: Debug only
    new Settings("E:/Projects/LeagueBot/new/_settings.json"),
    new Discord.Client(),
    new CommandManager()
);

// Register Commands
bot.CommandManager.registerMultiple([
    new Help(),
    new Version()
]);

// Discord client events
bot.Client.on("ready", () => {
    Log.info("Ready");
});

bot.Client.on("message", (message) => {
    if (CommandParser.isValid(message.content, bot.CommandManager, bot.Settings.General.CommandTrigger))
        bot.CommandManager.handle(
            new CommandExecutionContext(
                message,
                CommandParser.getArguments(message.content),
                bot
            ),

            CommandParser.parse(
                message.content,
                bot.CommandManager,
                bot.Settings.General.CommandTrigger
            )
        );

    Log.info(`[${message.author.username}] ${message.content}`);
});

// Bot init
bot.Client.login(bot.Settings.General.Token, (error, token) => {
    if (error)
        Log.error(error.message);
    else
        Log.success("Logged in");
});
