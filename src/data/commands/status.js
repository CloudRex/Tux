import Command from "../../commands/command";

export default class Status extends Command {
    constructor() {
        super("status", "View information about the server", ["stat"], null, 0, []);
    }

    executed(context) {
        const guild = context.message.guild;

        context.respond({
            "Name": guild.name,
            "Owner": guild.owner.displayName,
            "Users": guild.memberCount,
            "Region": guild.region,
            "Default Channel": guild.defaultChannel,
            "Created At": guild.createdAt
        });
    }

    canExecute(context) {
        return true;
    }
}