import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import MessageBuilder from "../../core/message-builder";
import RGBA from "../../core/rgba";

const pngjs = require("pngjs-image");
const Discord = require("discord.js");

const generateHex = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

export default {
	executed(context) {
		const image = pngjs.createImage(450, 450);
		const path = `./temp/color-${Math.random()}.png`;
		const hex = generateHex();
		const color = RGBA.fromHex(hex);

		image.fillRect(0, 0, 450, 450, color.toObject());

		image.writeImage(path, async (error) => {
			if (error) {
				context.fail(`There was an error saving the image. (${error.message})`);

				return;
			}

			await context.message.channel.send({
				embed: new Discord.RichEmbed()
					.addField("Hex", new MessageBuilder().codeBlock("css", hex).build())
					.addField("RGBA", new MessageBuilder().codeBlock("css", color.toString()).build())
					.setColor(hex)
					.setImage("attachment://color.png"),
				files: [{
					attachment: path,
					name: "color.png"
				}]
			});
		});
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "color",
		description: "Generate a random color",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Utility,
		enabled: true
	}
};
