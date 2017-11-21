"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var Log = (function () {
    function Log() {
    }
    // Static Methods
    Log.info = function (message) {
        console.log(colors.cyan(message));
    };
    Log.success = function (message) {
        console.log(colors.green(message));
    };
    Log.warn = function (message) {
        console.log(colors.yellow(message));
    };
    Log.error = function (message) {
        console.log(colors.red(message));
    };
    Log.verbose = function (message) {
        console.log(colors.grey(message));
    };
    Log.debug = function (message) {
        console.log(colors.magenta(message));
    };
    return Log;
}());
exports.default = Log;
//# sourceMappingURL=Log.js.map