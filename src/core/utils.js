const Discord = require("discord.js");

export default class Utils {
	/**
	 * @param {string} string
	 * @returns {boolean}
	 */
	static isMention(string) {
		return string.startsWith("<@") && string.endsWith(">");
	}

	/**
	 * @deprecated Use resolveId() instead
	 * @param {string} string
	 * @returns {string}
	 */
	static stripMention(string) {
		return string.substr(2).slice(0, -1).replace("!", "");
	}

	/**
	 * @param {string} string
	 * @returns {string}
	 */
	static resolveId(string) {
		return string.replace("<", "").replace(">", "").replace("@", "").replace("!", "")
			.replace("!", "");
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	/**
	 * @param {string} stack
	 * @param {array} array
	 * @param {string} delimiter
	 * @returns {(*|null)}
	 */
	static accessArrayByStack(stack, array, delimiter = ".") {
		const keys = stack.split(delimiter);

		let resultLoop = null;

		for (let i = 0; i < keys.length; i++) {
			resultLoop = array[keys[i]];
		}

		return resultLoop;
	}

	/**
	 * @param array
	 * @returns {array}
	 */
	static shuffle(array) {
		let counter = array.length;

		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			const index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			const temp = array[counter];

			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}

	/**
	 * @param {object} options
	 * @param {User} requester
	 * @param channel
	 * @param {string} footerSuffix
	 * @returns {Promise<Message>}
	 */
	static async send(options, requester, channel, footerSuffix = "") {
		const optionsCpy = options;

		optionsCpy.footer = {
			icon_url: requester.avatarURL,
			text: `Requested by ${requester.username} ${footerSuffix}`
		};

		if (!optionsCpy.color) {
			// TODO: Color is literal hex, not string (gives error)
			optionsCpy.color = "GREEN";
		}

		return await channel.send({
			embed: options
		});
	}
}
