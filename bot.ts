import Log from "./core/Log";
import Settings from "./core/Settings";
import CommandParser from "./core/commands/CommandParser";
import CommandManager from "./core/commands/CommandManager";
import CommandExecutionContext from "./core/commands/CommandExecutionContext";

// commands
import Help from "./commands/Help";

const request = require("request");
const riotBaseUrl = "https://na1.api.riotgames.com";
const Discord = require("discord.js");

var client = new Discord.Client();

// NOTE: Debug only
var settings = new Settings("E:/Projects/LeagueBot/new/_settings.json");

// Register Commands
CommandManager.register(new Help());

// Bot
client.on("ready", () => {
    Log.info("Ready");
});

client.on("message", (message) => {
    if (CommandParser.isValid(message.content, settings.General.CommandTrigger))
        CommandManager.handle(new CommandExecutionContext(message, CommandParser.getArguments(message.content)), CommandParser.parse(message.content, settings.General.CommandTrigger));

    Log.info(`[${message.author.username}] ${message.content}`);
});

// Bot init
client.login(settings.General.Token, (error, token) => {
    Log.success("Logged in");
});
