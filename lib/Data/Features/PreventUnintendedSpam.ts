import IFeature from "../../Features/IFeature";
import Bot from "../../Core/Bot";
import Log from "../../Core/Log";

export default class PreventUnintendedSpam implements IFeature {
    // Implemented Members
    public readonly Name: string = "Prevent Unintentional Spam";
    public readonly Key: string = "PreventUnintendedSpam";
    public readonly Description: string = "Prevents unintentional spam.";

    // Members
    private Streak: number;
    private LastMessage: string;
    private Timer: any;

    // Implemented Methods
    public canEnable(context: Bot): boolean {
        return true;
    }

    public enabled(context: Bot): void {
        this.Streak = 0;

        context.Client.on("message", (message) => {
            if (message.author.id == context.Client.user.id) {
                if (context.Client.user.lastMessage) {
                    if (this.LastMessage == message.content) {
                        if (this.Streak >= 5) {
                            Log.warn("Unintended spam detected");
                            context.restart();
                        }

                        this.Streak++;

                        if (this.Timer)
                            clearTimeout(this.Timer);

                        this.Timer = setTimeout(function() {
                            this.Streak = 0;
                        }, 4000);
                    }
                    else {
                        this.Streak = 0;
                        this.LastMessage = message.content;
                    }
                }
            }
        });
    }

    public disabled(): void { }
}
