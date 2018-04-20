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
	 * @deprecated Use lodash library instead
	 * @param {string} stack
	 * @param {array} obj
	 * @param {string} delimiter
	 * @returns {(*|null)}
	 */
	static accessObjByStack(stack, obj, delimiter = ".") {
		return stack.split(delimiter).reduce((o, i) => o[i], obj);
	}

	/**
	 * @deprecated Use lodash library instead
	 * @param {string} stack
	 * @param {*} value
	 * @param {object} obj
	 * @param {string} delimiter
	 * @returns {*}
	 */
	static setByStack(stack, value, obj, delimiter = ".") {
		const keys = stack.split(delimiter);
		const result = obj;

		for (let i = 0; i < keys.length; i++) {

		}

		return result;
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

	/**
	 * @param {number} milliseconds
	 * @param {number} seconds
	 * @param {number} minutes
	 * @param {number} hours
	 * @param {number} days
	 * @param {number} months
	 * @param {number} years
	 * @returns {number}
	 */
	static timeFromNow(milliseconds, seconds = 0, minutes = 0, hours = 0, days = 0, months = 0, years = 0) {
		const now = new Date();

		console.log(now.getDate());

		return new Date(years + now.getFullYear(), months + now.getMonth(), days + now.getDate(), hours + now.getHours(), minutes + now.getMinutes(), seconds + now.getSeconds(), milliseconds + now.getMilliseconds()).getTime();
	}

	/**
	 * @param {string} state
	 */
	static translateState(state) {
		return /^(1|true|on)$/.test(state);
	}
}
