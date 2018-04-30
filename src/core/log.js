const colors = require("colors");

export default class Log {
    // Static methods
    static log(message, color = 'white', prefix = null) {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        message = `[${date}] ${colors[color](message)}`;
        if (prefix !== null) {
            message = `${prefix} ${message}`;
        }
        process.stdout.write(`${message}\n`);
    }

    static info(message) {
        Log.log(message, 'cyan');
    }

    static success(message) {
        Log.log(message, 'green');
    }

    static warn(message) {
        Log.log(message, 'yellow');
    }

    static error(message) {
        Log.log(message, 'red');
    }

    static verbose(message) {
        if (Log.instance !== null) {
            if (Log.instance.verbose_mode) {
                Log.log(message, 'grey');
            }
        } else {
            Log.log(message, 'grey');
        }
    }

    static debug(message) {
        if (Log.instance !== null) {
            if (Log.instance.debug_mode) {
                Log.log(message, 'magenta');
            }
        } else {
            Log.log(message, 'magenta');
        }
    }

    constructor(bot, debug = false, verbose = false) {
        this.bot = bot;
        this.debug_mode = debug;
        this.verbose_mode = verbose;
        Log.instance = this;
    }

    log(message, color = 'white', prefix = null, throwMsg = false) {
        Log.log(message, color, prefix, throwMsg);
    }

    info(message) {
        this.log(message, 'cyan');
    }

    success(message) {
        this.log(message, 'green');
    }

    warn(message) {
        this.log(message, 'yellow');
    }

    error(message) {
        this.log(message, 'red');
    }

    verbose(message) {
        if (this.verbose_mode) {
            this.log(message, 'gray');
        }
    }

    debug(message) {
        if (this.debug_mode) {
            this.log(message, 'magenta');
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
