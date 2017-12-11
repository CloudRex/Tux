import Command from "../../commands/command";

export default class Version extends Command {
    constructor() {
        // TODO: extended description
        super("version", "View the bot's version", ["ver"], null, 0, []);
    }

    executed(context) {
        context.respond(`\`Version: ${context.bot.settings.general.version}\``);
    }

    canExecute(context) {
        return true;
    }
}
