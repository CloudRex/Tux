import CommandManager from "./CommandManager";
import ICommand from "./ICommand";

export default class CommandParser {
    public static parse(command: string, commandTrigger: string): ICommand {
        if (this.isValid(command, commandTrigger)) {
            return CommandManager.getByBase(this.getCommandBase(command));
        }

        return null;
    }

    public static isValid(command: string, commandTrigger: string): boolean {
        if (command.startsWith(commandTrigger))
            return CommandManager.isRegistered(this.getCommandBase(command));

        return false;
    }

    public static getCommandBase(command: string) {
        // TODO: Include actual command trigger insteaod of placeholder dummy "."
        return /^\.([a-zA-Z]+)/g.exec(command)[1];
    }

    public static getArguments(command: string) {
        let matches = / ([^ ]+|"[^"]+")/g.exec(command);
        let result: string[] = [];

        for (var match in matches) {
            console.log(matches[match]);
            result.push(matches[match]);
        }

        return result;
    }
}
