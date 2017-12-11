export default class CommandParser {
    static parse(command, commandManager, commandTrigger) {
        if (this.isValid(command, commandManager, commandTrigger))
            return commandManager.getByBase(this.getCommandBase(command));

        return undefined;
    }

    static isValid(command, commandManager, commandTrigger) {
        if (command.startsWith(commandTrigger))
            return commandManager.isRegistered(this.getCommandBase(command));

        return false;
    }

    static getCommandBase(command) {
        // TODO: Include actual command trigger instead of placeholder dummy "."
        return /^\.([a-zA-Z]+)/g.exec(command)[1];
    }

    static getArguments(command) {
        let expression = / ([^ ]+|"[^"]+")/g;
        let match = expression.exec(command);
        let result = [];

        while (match != null) {
            result.push(match[1]);
            match = expression.exec(command);
        }

        return result;
    }
}
