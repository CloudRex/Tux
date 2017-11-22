import Feature from "../../Features/Feature";
import Bot from "../../Core/Bot";
import Log from "../../Core/Log";

export default class PreventUnintendedSpam implements Feature {
    // Implemented Members
    public readonly name: string = "Prevent Unintentional Spam";
    public readonly key: string = "PreventUnintendedSpam";
    public readonly description: string = "Prevents unintentional spam.";

    // Members
    private streak: number;
    private lastMessage: string;
    private timer: any;

    // Implemented Methods
    public canEnable(context: Bot): boolean {
        return true;
    }

    public enabled(context: Bot): void {
        this.streak = 0;

        context.client.on("message", (message) => {
            if (message.author.id == context.client.user.id) {
                if (context.client.user.lastMessage) {
                    if (this.lastMessage == message.content) {
                        if (this.streak >= 5) {
                            Log.warn("Unintended spam detected");
                            context.restart();
                        }

                        this.streak++;

                        if (this.timer)
                            clearTimeout(this.timer);

                        this.timer = setTimeout(function() {
                            this.Streak = 0;
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

    public disabled(): void { }
}
