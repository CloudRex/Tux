const colors = require("colors");

export default class Log {
    // Static Methods
    static info(message) {
        console.log(colors.cyan(message));
    }

    static success(message) {
        console.log(colors.green(message));
    }

    static warn(message) {
        console.log(colors.yellow(message));
    }

    static error(message) {
        throw colors.red(message);
    }

    static verbose(message) {
        console.log(colors.grey(message));
    }

    static debug(message) {
        console.log(colors.magenta(message));
    }
}
