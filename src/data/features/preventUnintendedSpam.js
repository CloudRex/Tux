import Feature from "./feature";
import Log from "../../core/log";

export default class PreventUnintendedSpam extends Feature {
    constructor() {
        super("Prevent Unintentional Spam", "PreventUnintendedSpam", "Prevents unintentional spam.");
    }

    // Implemented Methods
    canEnable(bot) {
        return true;
    }

    enabled(bot) {
        this.streak = 0;

        bot.client.on("message", (message) => {
            if (message.author.id === bot.client.user.id) {
                if (bot.client.user.lastMessage) {
                    if (this.lastMessage === message.content) {
                        if (this.streak >= 5) {
                            Log.warn("Unintended spam detected");
                            bot.restart();
                        }

                        this.streak++;
                        clearTimeout(this.timer);

                        this.timer = setTimeout(() => {
                            this.streak = 0;
                        }, 4000);
                    }
                    else {
                        this.streak = 0;
                        this.lastMessage = message.content;
                    }
                }
            }
        });
    }

    disabled() { }
}
