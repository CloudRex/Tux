import Command from "../../commands/command";

export default class Time extends Command {
    constructor() {
        super("time", "View the bot's local time", [], null, 0, []);
    }

    executed(context) {
        let date = new Date();

        context.respond(`Bot's local time is ${date.getTime()}`);
    }

    canExecute(context) {
        return true;
    }
}