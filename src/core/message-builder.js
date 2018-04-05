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
	 * @returns {MessageBuilder}
	 */
	addCode() {
		return this.add("`");
	}

	/**
	 * @returns {MessageBuilder}
	 */
	addLine() {
		return this.add("\n");
	}

	/**
	 * @returns {string}
	 */
	build() {
		return this.message;
	}
}
