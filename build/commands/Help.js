"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Help = (function () {
    function Help() {
        this.Base = "help";
        this.Description = "View all avaliable commands";
    }
    Help.prototype.executed = function (context) {
        context.Message.channel.send("Help command executed :cookie:");
    };
    Help.prototype.canExecute = function (context) {
        return true;
    };
    return Help;
}());
exports.default = Help;
//# sourceMappingURL=Help.js.map