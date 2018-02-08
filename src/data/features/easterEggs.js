import Feature from "./feature";

export default class EasterEggs extends Feature {
    constructor() {
        super("Easter Eggs", "easter-eggs", "Easter eggs & secrets.");
    }

    canEnable(bot) {
        return true;
    }

    enabled(bot) {
        bot.client.on("message", (message) => {
            if (message.author.id !== bot.client.user.id) {
				if (message.content === "right tux?")
					message.reply("Right!");
				else if (message.content === "an apple a day")
					message.reply("Keeps the snow whites away!"); 
				else if (message.content === "i hate penguins")
					message.reply("i cri every tim");
				else if (message.content === "bad tux")
					message.reply("*cuddles up in corner and cries* :(");
				else if (message.content === "lol")
					message.reply("https://giphy.com/gifs/DeJ2ifS2V2zlu");
				else if (message.content === "lmao")
					message.reply("https://giphy.com/gifs/JIX9t2j0ZTN9S");
			}
        });
    }
}