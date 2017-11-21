import ICommand from "./ICommand";
import CommandExecutionContext from "./CommandExecutionContext";

var fs = require("fs");

export default class CommandManager {
    // Members
    private static Commands: ICommand[] = [];

    // Static Methods
    public static register(command: ICommand): void {
        this.Commands.push(command);
    }

    public static isRegistered(commandBase: string): boolean {
        return this.getByBase(commandBase) != null;
    }

    public static getByBase(commandBase: string): ICommand {
        for (var command in this.Commands) {
            if (this.Commands[command].Base == commandBase)
                return this.Commands[command];
        }

        return null;
    }

    public static handle(context: CommandExecutionContext, command: ICommand): boolean {
        if (command.canExecute(context)) {
            command.executed(context);

            return true;
        }

        return false;
    }
}
