import Command from "../../commands/command";

export default class Time extends Command {
    constructor() {
        super("time", "View the bot's local time", [], null, 0, []);
    }

    executed(context) {
        let date = new Date();

        context.respond({
            "Local time": `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            "Timestamp": date.getTime()
        });
    }

    canExecute(context) {
        return true;
    }
}