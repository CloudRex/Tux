import Command from "../../commands/command";
import Utils from "../../core/utils";

export default class Thank extends Command {
    constructor() {
        super("thank", "Thank an user.", [], null, 1, []);
    }

    executed(context) {
        if (context.message.channel.type === "text" && Utils.isMention(context.arguments[0])) {
            if (context.arguments.length === 1) {
                let user = Utils.stripMention(context.arguments[0]);

                if (context.message.author.id.toString() === user)
                    context.respond("You can't thank yourself, silly!");
                else if (context.message.channel.guild.members.has(user))
                    context.bot.database.addThank(user, () => {
                        context.bot.database.getThanks(user, (thanks) => {
                            context.respond(`:thumbsup: Thanked ${context.arguments[0]} (${thanks} Thanks)`);
                        });
                    });
                else
                    context.respond("Are you sure that person exists?");
            }
        }
        else
            context.respond("You can't do that here!");
    }

    canExecute(context) {
        return true;
    }
}