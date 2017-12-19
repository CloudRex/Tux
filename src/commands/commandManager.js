export default class CommandManager {
    constructor() {
        this.commands = [];
    }

    // Static Methods
    register(command) {
        this.commands.push(command);
    }

    registerMultiple(commands) {
        for (let i = 0; i < commands.length; i++)
            this.register(commands[i]);
    }

    isRegistered(commandBase) {
        return this.getByBase(commandBase) != null;
    }

    getByBase(commandBase) {
        for (let i = 0; i < this.commands.length; i++) {
            if (this.commands[i].base === commandBase || this.commands[i].aliases.includes(commandBase))
                return this.commands[i];
        }

        return undefined;
    }

    // TODO: Move to the corresponding file/class
    hasRole(message, role) {
        return message.member.roles.find("name", role);
    }

    hasRoles(message, roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!this.hasRole(message, roles[i]))
                return false;
        }

        return true;
    }

    async handle(context, command) {
        if (command.requiredRoles.length > 0 && !context.message.member) {
            context.message.channel.send("You can't use that command here. Sorry!");

            return false;
        }

        if (command.canExecute(context) && context.arguments.length <= command.maxArguments && this.hasRoles(context.message, command.requiredRoles)) {
            command.executed(context);

            return true;
        }
        else {
            let message = await context.respond("You can't do that. Sorry!");

            message.message.delete(3000);
        }


        return false;
    }
}
