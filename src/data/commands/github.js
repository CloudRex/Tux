import Command from "../../commands/command";

export default class Github extends Command {
    constructor() {
        super("github", "View the project's Github link", ["git"], null, 0, []);
    }

    executed(context) {
        context.respond("https://github.com/CloudRex/Botty");
    }

    canExecute(context) {
        return true;
    }
}