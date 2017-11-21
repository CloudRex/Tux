"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CommandManager = (function () {
    function CommandManager() {
    }
    // Static Methods
    CommandManager.register = function (command) {
        this.Commands.push(command);
    };
    CommandManager.isRegistered = function (commandBase) {
        return this.getByBase(commandBase) != null;
    };
    CommandManager.getByBase = function (commandBase) {
        for (var command in this.Commands) {
            if (this.Commands[command].Base == commandBase)
                return this.Commands[command];
        }
        return null;
    };
    CommandManager.handle = function (context, command) {
        if (command.canExecute(context)) {
            command.executed(context);
            return true;
        }
        return false;
    };
    // Members
    CommandManager.Commands = [];
    return CommandManager;
}());
exports.default = CommandManager;
//# sourceMappingURL=CommandManager.js.map