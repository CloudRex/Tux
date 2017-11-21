"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandManager_1 = require("./CommandManager");
var CommandParser = (function () {
    function CommandParser() {
    }
    CommandParser.parse = function (command, commandTrigger) {
        if (this.isValid(command, commandTrigger)) {
            return CommandManager_1.default.getByBase(this.getCommandBase(command));
        }
        return null;
    };
    CommandParser.isValid = function (command, commandTrigger) {
        if (command.startsWith(commandTrigger))
            return CommandManager_1.default.isRegistered(this.getCommandBase(command));
        return false;
    };
    CommandParser.getCommandBase = function (command) {
        // TODO: Include actual command trigger insteaod of placeholder dummy "."
        return /^\.([a-zA-Z]+)/g.exec(command)[1];
    };
    CommandParser.getArguments = function (command) {
        var matches = / ([^ ]+|"[^"]+")/g.exec(command);
        var result = [];
        for (var match in matches) {
            console.log(matches[match]);
            result.push(matches[match]);
        }
        return result;
    };
    return CommandParser;
}());
exports.default = CommandParser;
//# sourceMappingURL=CommandParser.js.map