export default class MessageBuilder {
	/**
	 * @param {string} startingString
	 */
	constructor(startingString = "") {
		this.message = startingString;
	}

	/**
	 * @param {string} string
	 * @returns {MessageBuilder}
	 */
	add(string) {
		this.message += string;

		return this;
	}

	/**
	 * @param {(string|null)} language
	 * @param {(string|null)} code
	 * @returns {MessageBuilder}
	 */
	addCodeBlock(language = null, code = null) {
		let result = "```";

		if (language !== null) {
			result += `${language}\n`;
		}

		if (code !== null) {
			result += `${code}\n\`\`\``;
		}

		return this.add(result);
	}

	/**
	 * @param {(string|null)} code
	 * @returns {MessageBuilder}
	 */
	addCode(code = null) {
		if (code === null) {
			return this.add("`");
		}

		return this.add(`\`${code}\``);
	}

	/**
	 * @param {string} text
	 * @returns {MessageBuilder}
	 */
	addItalic(text) {
		return this.add(`*${text}*`);
	}

	/**
	 * @param {string} text
	 * @returns {MessageBuilder}
	 */
	addBold(text) {
		return this.add(`**${text}**`);
	}

	/**
	 * @returns {MessageBuilder}
	 */
	addLine() {
		return this.add("\n");
	}

	/**
	 * @param {string} emoji
	 * @returns {MessageBuilder}
	 */
	addEmoji(emoji) {
		return this.add(`:${emoji}:`);
	}

	/**
	 * @returns {string}
	 */
	build() {
		return this.message;
	}
}
