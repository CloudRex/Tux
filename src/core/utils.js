export default class Utils {
	/**
	 * @param {string} string
	 * @returns {boolean}
	 */
	static isMention(string) {
		return string.startsWith("<@") && string.endsWith(">");
	}

	/**
	 * @param {string} string
	 * @returns {string}
	 */
	static stripMention(string) {
		return string.substr(2).slice(0, -1).replace("!", "");
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * max) + min;
	}
}
