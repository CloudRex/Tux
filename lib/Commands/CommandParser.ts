import CommandManager from "./CommandManager";
import ICommand from "./ICommand";

export default class CommandParser {
    public static parse(command: string, commandManager: CommandManager, commandTrigger: string): ICommand {
        if (this.isValid(command, commandManager, commandTrigger)) {
            return commandManager.getByBase(this.getCommandBase(command));
        }

        return null;
    }

    public static isValid(command: string, commandManager: CommandManager, commandTrigger: string): boolean {
        if (command.startsWith(commandTrigger))
            return commandManager.isRegistered(this.getCommandBase(command));

        return false;
    }

    public static getCommandBase(command: string) {
        // TODO: Include actual command trigger insteaod of placeholder dummy "."
        return /^\.([a-zA-Z]+)/g.exec(command)[1];
    }

    public static getArguments(command: string) {
        let expression = / ([^ ]+|"[^"]+")/g;
        let match = expression.exec(command);
        let result: string[] = [];

        while (match != null) {
            result.push(match[1]);
            match = expression.exec(command);
        }

        return result;
    }
}
