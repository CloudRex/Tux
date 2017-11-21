import ICommand from "./ICommand";
import CommandExecutionContext from "./CommandExecutionContext";

var fs = require("fs");

export default class CommandManager {
    // Members
    public readonly Commands: ICommand[] = [];

    // Static Methods
    public register(command: ICommand): void {
        this.Commands.push(command);
    }

    public registerMultiple(commands: ICommand[]): void {
        for (var index in commands)
            this.register(commands[index]);
    }

    public isRegistered(commandBase: string): boolean {
        return this.getByBase(commandBase) != null;
    }

    public getByBase(commandBase: string): ICommand {
        for (var index in this.Commands) {
            if (this.Commands[index].Base == commandBase || this.Commands[index].Aliases.includes(commandBase))
                return this.Commands[index];
        }

        return null;
    }

    // TOOD: Move to the corresponding file/class
    private hasRole(message: any, role: string): boolean {
        return message.member.roles.find("name", role);
    }

    private hasRoles(message: any, roles: string[]): boolean {
        for (var index in roles) {
            if (!this.hasRole(message, roles[index]))
                return false
        }

        return true;
    }

    public handle(context: CommandExecutionContext, command: ICommand): boolean {
        if (command.RequiredRoles.length > 0 && !context.Message.member) {
            context.Message.channel.send("You can't use that command here. Sorry!");

            return false;
        }

        if (command.canExecute(context) && context.Arguments.length <= command.MaxArguments && this.hasRoles(context.Message, command.RequiredRoles)) {
            command.executed(context);

            return true;
        }
        else
            context.Message.channel.send("You can't do that. Sorry!");


        return false;
    }
}
