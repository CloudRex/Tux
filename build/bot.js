"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./core/Log");
var Settings_1 = require("./core/Settings");
var CommandParser_1 = require("./core/commands/CommandParser");
var CommandManager_1 = require("./core/commands/CommandManager");
var CommandExecutionContext_1 = require("./core/commands/CommandExecutionContext");
// commands
var Help_1 = require("./commands/Help");
var request = require("request");
var riotBaseUrl = "https://na1.api.riotgames.com";
var Discord = require("discord.js");
var client = new Discord.Client();
// NOTE: Debug only
var settings = new Settings_1.default("E:/Projects/LeagueBot/new/_settings.json");
// Register Commands
CommandManager_1.default.register(new Help_1.default());
// Bot
client.on("ready", function () {
    Log_1.default.info("Ready");
});
client.on("message", function (message) {
    if (CommandParser_1.default.isValid(message.content, settings.General.CommandTrigger))
        CommandManager_1.default.handle(new CommandExecutionContext_1.default(message, CommandParser_1.default.getArguments(message.content)), CommandParser_1.default.parse(message.content, settings.General.CommandTrigger));
    Log_1.default.info("[" + message.author.username + "] " + message.content);
});
// Bot init
client.login(settings.General.Token, function (error, token) {
    Log_1.default.success("Logged in");
});
//# sourceMappingURL=bot.js.map