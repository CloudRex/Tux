var colors = require("colors");

export default class Log {
    // Static Methods
    public static info(message: string): void {
        console.log(colors.cyan(message));
    }

    public static success(message: string): void {
        console.log(colors.green(message));
    }

    public static warn(message: string): void {
        console.log(colors.yellow(message));
    }

    public static error(message: string): void {
        console.log(colors.red(message));
    }

    public static verbose(message: string): void {
        console.log(colors.grey(message));
    }

    public static debug(message: string): void {
        console.log(colors.magenta(message));
    }
}
