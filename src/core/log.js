const colors = require("colors");
const fs = require("fs");

export default class Log {
    // Static methods
    static async log(message, color = "white", prefix = null) {
        const date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

        process.stdout.write(`\x1B[2D[${date}] ${colors[color](message)}\n> `);

        if (prefix !== null) {
            message = `<${prefix.toUpperCase()}> ${message}`;
        }
        fs.writeFile("bot.log", `[${date}] ${message}\n`, { flag: "a" }, (err) => {
            if (err) throw err;
        });
    }

    static info(message) {
        Log.log(message, "cyan", "info");
    }

    static success(message) {
        Log.log(message, "green", "sucs");
    }

    static warn(message) {
        Log.log(message, "yellow", "warn");
    }

    static error(message) {
        Log.log(message, "red", "dang");
    }

    static verbose(message) {
        if (Log.instance !== null) {
            if (Log.instance.verbose_mode) {
                Log.log(message, "grey");
            }
        } else {
            Log.log(message, "grey");
        }
    }

    static debug(message) {
        if (Log.instance !== null) {
            if (Log.instance.debug_mode) {
                Log.log(message, "magenta", "dbug");
            }
        } else {
            Log.log(message, "magenta", "dbug");
        }
    }

    constructor(bot, debug = false, verbose = false) {
        this.bot = bot;
        this.debug_mode = debug;
        this.verbose_mode = verbose;
        Log.instance = this;
    }

    log(message, color = "white", prefix = null, throwMsg = false) {
        Log.log(message, color, prefix, throwMsg);
    }

    info(message) {
        this.log(message, "cyan", "info");
    }

    success(message) {
        this.log(message, "green", "sucs");
    }

    warn(message) {
        this.log(message, "yellow", "warn");
    }

    error(message) {
        this.log(message, "red", "dang");
    }

    verbose(message) {
        if (this.verbose_mode) {
            this.log(message, "gray");
        }
    }

    debug(message) {
        if (this.debug_mode) {
            this.log(message, "magenta", "dbug");
        }
    }

    channel(content, options) {
        const guildLog = this.bot.userConfig.get("global.guild-log");
        if (!guildLog.enabled) {
            return;
        }

        this.bot.client.guilds.get(guildLog.guild).channels.get(guildLog.channel).send(content, options);
    }
}
