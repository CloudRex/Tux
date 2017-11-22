import Command from "./command";
import CommandExecutionContext from "./commandExecutionContext";

var fs = require("fs");

export default class CommandManager {
    // Members
    public readonly commands: Command[] = [];

    // Static Methods
    public register(command: Command): void {
        this.commands.push(command);
    }

    public registerMultiple(commands: Command[]): void {
        for (var index in commands)
            this.register(commands[index]);
    }

    public isRegistered(commandBase: string): boolean {
        return this.getByBase(commandBase) != null;
    }

    public getByBase(commandBase: string): Command {
        for (var index in this.commands) {
            if (this.commands[index].base == commandBase || this.commands[index].aliases.includes(commandBase))
                return this.commands[index];
        }

        return undefined;
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

    public handle(context: CommandExecutionContext, command: Command): boolean {
        if (command.requiredRoles.length > 0 && !context.message.member) {
            context.message.channel.send("You can't use that command here. Sorry!");

            return false;
        }

        if (command.canExecute(context) && context.arguments.length <= command.maxArguments && this.hasRoles(context.message, command.requiredRoles)) {
            command.executed(context);

            return true;
        }
        else
            context.message.channel.send("You can't do that. Sorry!");


        return false;
    }
}
